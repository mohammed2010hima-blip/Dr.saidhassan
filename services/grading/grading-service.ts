import { prisma } from '@/lib/db';

export interface AnswerSubmissionItem {
  questionId: string;
  selectedOption?: string; // "a", "b", "c", "d"
  essayAnswer?: string;
}

export class GradingService {
  /**
   * Automatically grades an entire exam attempt upon submission
   */
  static async gradeAttemptOnSubmission(
    attemptId: string,
    answers: AnswerSubmissionItem[],
    timeSpentSeconds: number
  ) {
    const attempt = await prisma.examAttempt.findUnique({
      where: { id: attemptId },
      include: {
        exam: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!attempt) {
      throw new Error('محاولة الاختبار غير موجودة');
    }

    const questionsMap = new Map(attempt.exam.questions.map((q) => [q.id, q]));

    let mcqScore = 0;
    let essayScore = 0;
    let maxScore = 0;
    let hasUngradedEssays = false;

    // Delete any existing answers for this attempt before re-inserting
    await prisma.studentAnswer.deleteMany({
      where: { attemptId },
    });

    for (const q of attempt.exam.questions) {
      maxScore += q.points;
      const submitted = answers.find((a) => a.questionId === q.id);

      if (q.type === 'mcq') {
        const isCorrect = submitted?.selectedOption && q.correctOptionId
          ? submitted.selectedOption.toLowerCase() === q.correctOptionId.toLowerCase()
          : false;

        const pointsAwarded = isCorrect ? q.points : 0;
        mcqScore += pointsAwarded;

        await prisma.studentAnswer.create({
          data: {
            attemptId,
            questionId: q.id,
            selectedOption: submitted?.selectedOption || null,
            essayAnswer: null,
            isCorrect,
            pointsAwarded,
          },
        });
      } else {
        // Essay question
        hasUngradedEssays = true;
        await prisma.studentAnswer.create({
          data: {
            attemptId,
            questionId: q.id,
            selectedOption: null,
            essayAnswer: submitted?.essayAnswer || '',
            isCorrect: null, // Pending teacher grading
            pointsAwarded: 0,
          },
        });
      }
    }

    const totalScore = mcqScore + essayScore;
    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    const isPassed = percentage >= (attempt.exam.passingPercentage || 50);
    const status = hasUngradedEssays ? 'SUBMITTED' : 'GRADED';

    const updatedAttempt = await prisma.examAttempt.update({
      where: { id: attemptId },
      data: {
        submittedAt: new Date(),
        timeSpentSeconds,
        status,
        mcqScore,
        essayScore,
        totalScore,
        maxScore,
        percentage: Math.round(percentage * 10) / 10,
        isPassed,
      },
      include: {
        answers: true,
      },
    });

    return updatedAttempt;
  }

  /**
   * Grades a single essay question by teacher and recalculates attempt total score
   */
  static async gradeEssayAnswer(
    answerId: string,
    pointsAwarded: number,
    feedback?: string
  ) {
    const answer = await prisma.studentAnswer.findUnique({
      where: { id: answerId },
      include: {
        question: true,
        attempt: {
          include: {
            exam: true,
            answers: {
              include: { question: true },
            },
          },
        },
      },
    });

    if (!answer) {
      throw new Error('الإجابة غير موجودة');
    }

    const maxQuestionPoints = answer.question.points;
    const finalPoints = Math.min(Math.max(0, pointsAwarded), maxQuestionPoints);
    const isCorrect = finalPoints >= (maxQuestionPoints * 0.5);

    // Update the individual answer
    await prisma.studentAnswer.update({
      where: { id: answerId },
      data: {
        pointsAwarded: finalPoints,
        isCorrect,
        teacherFeedback: feedback || null,
      },
    });

    // Recalculate full attempt scores
    const allAnswers = await prisma.studentAnswer.findMany({
      where: { attemptId: answer.attemptId },
      include: { question: true },
    });

    let mcqScore = 0;
    let essayScore = 0;
    let maxScore = 0;
    let anyUngradedEssays = false;

    for (const ans of allAnswers) {
      maxScore += ans.question.points;
      if (ans.question.type === 'mcq') {
        mcqScore += ans.pointsAwarded;
      } else {
        essayScore += ans.pointsAwarded;
        if (ans.isCorrect === null) {
          anyUngradedEssays = true;
        }
      }
    }

    const totalScore = mcqScore + essayScore;
    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    const isPassed = percentage >= (answer.attempt.exam.passingPercentage || 50);
    const status = anyUngradedEssays ? 'SUBMITTED' : 'GRADED';

    const updatedAttempt = await prisma.examAttempt.update({
      where: { id: answer.attemptId },
      data: {
        essayScore,
        totalScore,
        maxScore,
        percentage: Math.round(percentage * 10) / 10,
        isPassed,
        status,
      },
      include: {
        answers: {
          include: {
            question: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    });

    return updatedAttempt;
  }
}
