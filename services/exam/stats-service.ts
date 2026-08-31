import { prisma } from '@/lib/db';

export class StatsService {
  /**
   * Retrieves overall teacher analytics
   */
  static async getTeacherStats(teacherId: string) {
    const totalExams = await prisma.exam.count({
      where: { teacherId },
    });

    const activeExams = await prisma.exam.count({
      where: { teacherId, status: 'PUBLISHED' },
    });

    const attempts = await prisma.examAttempt.findMany({
      where: {
        exam: { teacherId },
        status: { in: ['SUBMITTED', 'GRADED'] },
      },
      select: {
        id: true,
        studentName: true,
        studentPhone: true,
        percentage: true,
        totalScore: true,
        maxScore: true,
        isPassed: true,
        timeSpentSeconds: true,
        createdAt: true,
        examId: true,
      },
    });

    const totalAttempts = attempts.length;

    // Unique students by phone or name
    const uniqueStudents = new Set(attempts.map((a) => a.studentPhone || a.studentName)).size;

    const avgScore = totalAttempts > 0
      ? Math.round((attempts.reduce((sum, a) => sum + a.percentage, 0) / totalAttempts) * 10) / 10
      : 0;

    const highestScore = totalAttempts > 0
      ? Math.max(...attempts.map((a) => a.percentage))
      : 0;

    const lowestScore = totalAttempts > 0
      ? Math.min(...attempts.map((a) => a.percentage))
      : 0;

    const passedCount = attempts.filter((a) => a.isPassed).length;
    const passRate = totalAttempts > 0
      ? Math.round((passedCount / totalAttempts) * 100)
      : 0;

    const avgTimeSpent = totalAttempts > 0
      ? Math.round(attempts.reduce((sum, a) => sum + a.timeSpentSeconds, 0) / totalAttempts)
      : 0;

    // Score distribution brackets (0-49, 50-69, 70-84, 85-100)
    const scoreDistribution = [
      { range: 'أقل من 50%', count: attempts.filter((a) => a.percentage < 50).length },
      { range: '50% - 69%', count: attempts.filter((a) => a.percentage >= 50 && a.percentage < 70).length },
      { range: '70% - 84%', count: attempts.filter((a) => a.percentage >= 70 && a.percentage < 85).length },
      { range: '85% - 100%', count: attempts.filter((a) => a.percentage >= 85).length },
    ];

    // Find hardest questions (most incorrect answers)
    const incorrectAnswers = await prisma.studentAnswer.findMany({
      where: {
        attempt: {
          exam: { teacherId },
          status: { in: ['SUBMITTED', 'GRADED'] },
        },
        question: { type: 'mcq' },
      },
      include: {
        question: {
          select: {
            id: true,
            questionText: true,
            questionNumber: true,
            exam: { select: { title: true } },
          },
        },
      },
    });

    const questionStatsMap = new Map<string, { text: string; examTitle: string; total: number; incorrect: number }>();

    for (const ans of incorrectAnswers) {
      const qId = ans.questionId;
      if (!questionStatsMap.has(qId)) {
        questionStatsMap.set(qId, {
          text: ans.question.questionText.slice(0, 60) + '...',
          examTitle: ans.question.exam.title,
          total: 0,
          incorrect: 0,
        });
      }
      const item = questionStatsMap.get(qId)!;
      item.total += 1;
      if (ans.isCorrect === false) {
        item.incorrect += 1;
      }
    }

    const hardestQuestions = Array.from(questionStatsMap.values())
      .filter((q) => q.total >= 1)
      .map((q) => ({
        question: q.text,
        exam: q.examTitle,
        failRate: Math.round((q.incorrect / q.total) * 100),
        incorrectCount: q.incorrect,
        totalAttempts: q.total,
      }))
      .sort((a, b) => b.failRate - a.failRate)
      .slice(0, 5);

    return {
      totalExams,
      activeExams,
      totalAttempts,
      uniqueStudents,
      avgScore,
      highestScore,
      lowestScore,
      passRate,
      avgTimeSpent,
      scoreDistribution,
      hardestQuestions,
    };
  }
}
