if (typeof process !== 'undefined') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

// Schema for an MCQ Option
export const OptionSchema = z.object({
  id: z.string(), // "a", "b", "c", "d", etc.
  text: z.string().min(1, 'نص الاختيار مطلوب'),
});

// Schema for a Question
export const QuestionSchema = z.object({
  id: z.string().optional(),
  question_number: z.number(),
  type: z.enum(['mcq', 'essay']),
  question_text: z.string().min(1, 'نص السؤال مطلوب'),
  passage: z.string().optional().nullable().default(null), // Reading comprehension passage / poetry piece / context text
  options: z.array(OptionSchema).optional().default([]),
  correct_answer: z.string().nullable().optional(), // "a", "b", "c", "d" or null
  points: z.number().default(1),
  needs_review: z.boolean().optional().default(false),
});

// Schema for the Full Exam JSON
export const ExamSchema = z.object({
  exam_title: z.string().min(1, 'عنوان الامتحان مطلوب'),
  description: z.string().optional().default(''),
  duration_minutes: z.number().nullable().optional().default(60),
  questions: z.array(QuestionSchema).min(1, 'يجب استخراج سؤال واحد على الأقل من ملف الامتحان'),
});

export type ParsedOption = z.infer<typeof OptionSchema>;
export type ParsedQuestion = z.infer<typeof QuestionSchema>;
export type ParsedExam = z.infer<typeof ExamSchema>;

const waitMs = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class GeminiExamParser {
  private apiKey: string;
  private modelName: string;

  constructor(apiKey?: string, modelName?: string) {
    this.apiKey = apiKey || process.env.GOOGLE_GEMINI_API_KEY || '';
    this.modelName = modelName || process.env.DEFAULT_GEMINI_MODEL || 'gemini-2.5-flash';
  }

  /**
   * Tests whether the API key is valid
   */
  async testConnection(): Promise<{ success: boolean; message: string }> {
    if (!this.apiKey) {
      return { success: false, message: 'مفتاح Google Gemini API غير موجود أو غير مدخل' };
    }

    const genAI = new GoogleGenerativeAI(this.apiKey);
    const modelsToTry = [
      this.modelName,
      'gemini-2.5-flash',
      'gemini-3.6-flash',
      'gemini-3.5-flash-lite',
    ].filter((v, i, a) => a.indexOf(v) === i);

    let lastErrorMsg = '';

    for (const modelId of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelId });
        const result = await model.generateContent('Say "OK" in Arabic');
        const response = await result.response;
        const text = response.text();
        if (text) {
          return { success: true, message: `تم الاتصال بنجاح بـ Google Gemini API باستخدام نموذج (${modelId})!` };
        }
      } catch (error: any) {
        lastErrorMsg = error.message || String(error);
        console.warn(`Connection test failed on model ${modelId}:`, lastErrorMsg);
      }
    }

    if (lastErrorMsg.includes('API_KEY_INVALID') || lastErrorMsg.includes('403') || lastErrorMsg.includes('unauthorized')) {
      return { success: false, message: 'مفتاح API غير صالح أو منتهي الصلاحية' };
    }
    if (lastErrorMsg.includes('QUOTA_EXCEEDED') || lastErrorMsg.includes('429')) {
      return { success: false, message: 'تم تجاوز الحد الأقصى للاستخدام (Quota exceeded)' };
    }
    if (lastErrorMsg.includes('503') || lastErrorMsg.includes('high demand') || lastErrorMsg.includes('Service Unavailable')) {
      return { success: false, message: 'سيرفرات الذكاء الاصطناعي تشهد ضغطاً مؤقتاً (503)، يرجى إعادة المحاولة بعد ثوانٍ قليلة' };
    }
    return { success: false, message: `فشل الاتصال: ${lastErrorMsg}` };
  }

  /**
   * Parses a PDF file (base64) into structured exam questions with optional Answer Key file / text attachment
   */
  async parsePDFToExam(
    pdfBuffer: Buffer,
    mimeType: string = 'application/pdf',
    answersBuffer?: Buffer | null,
    answersMimeType: string = 'application/pdf',
    answersTextPrompt?: string | null
  ): Promise<ParsedExam> {
    if (!this.apiKey) {
      throw new Error('مفتاح Google Gemini API غير محدد. يرجى إدخاله في صفحة الإعدادات أو ملف البيئة.');
    }

    const genAI = new GoogleGenerativeAI(this.apiKey);

    const systemPrompt = `
You are an expert Arabic language exam parser and educational AI auditor.
Your mission is to extract exam questions with 100% VERBATIM ACCURACY (استخراج حرفي تام) and COMPLETE SENTENCE CONTEXT (الجمل وسياق النحو كاملاً).

CRITICAL EXTRACTION RULES (قواعد الاستخراج الدقيق والإلزامي):

1. COMPLETE QUESTION & GRAMMAR CONTEXT (عدم بتر الجمل والنصوص):
   - NEVER truncate, shorten, or omit context sentences in grammar (النحو) or literary questions.
   - If a grammar question asks for the parsing (إعراب) or function of a word in a sentence (e.g. "أعرب كلمة 'نور' في قول الشاعر... / في الجملة التالية: ..."), you MUST include the ENTIRE sentence, verse, or context paragraph in "question_text" or "passage".
   - Example: "أعرب ما تحته خط في قول الشاعر: إذا غامَرْتَ في شَرَفٍ مَرُومِ ... <u>فَلا تَقْنَعْ</u> بِما دُونَ النُّجُومِ".

2. 100% VERBATIM EXTRACTION — NO TASHKEEL EVER (النقل الحرفي التام — ممنوع إضافة أي تشكيل):
   - ABSOLUTE RULE: You MUST NEVER add, generate, invent, insert, or hallucinate any tashkeel (تشكيل) or Arabic diacritics (حركات) of your own.
   - Extract ALL text EXACTLY character-for-character as it appears printed in the PDF — nothing more, nothing less.
   - If the original PDF text has NO tashkeel on a word, output that word with NO tashkeel. Do NOT vocalize it.
   - If the original PDF text happens to have tashkeel on specific characters, copy those exact characters verbatim — but NEVER add extra diacritics that are not already in the source.
   - This rule is ABSOLUTE and overrides everything else. Even if you "know" the correct vocalization, DO NOT ADD IT.

3. RICH FORMATTING:
   - Use HTML <u>word</u> tags around words that have underlines in the document (underlined for grammar/analysis).
   - Use <b>word</b> for bold keywords.
   - Use quotation marks («...» or "...") exactly as in the original text.

4. PASSAGES & POETRY:
   - For reading passages or multiple questions sharing a single text, put the shared text in "passage".
   - For standalone questions with their own sentence, put the full sentence in "question_text" with "passage": null.

5. ANSWER KEY MATCHING (مطابقة نموذج الإجابة إن وُجد):
   - If an Answer Key (نموذج إجابة) is provided in the document or attached files/text:
     * Carefully match each question with its verified correct answer option ("a", "b", "c", "d").
     * Set "correct_answer" to the matching option ID and "needs_review": false.
   - If no answer key is provided and an answer is uncertain, set "correct_answer": null and "needs_review": true.

6. STRICT JSON OUTPUT FORMAT:
Conform strictly to this JSON format:
{
  "exam_title": "String",
  "description": "String",
  "duration_minutes": 60,
  "questions": [
    {
      "id": "q1",
      "question_number": 1,
      "type": "mcq",
      "passage": "String or null",
      \"question_text\": \"نص السؤال كاملاً مع الجملة والخطوط السفلية <u>إن وجدت</u> — حرفياً كما في الملف\",
      \"options\": [
        { \"id\": \"a\", \"text\": \"الاختيار الأول حرفياً\" },
        { \"id\": \"b\", \"text\": \"الاختيار الثاني\" },
        { \"id\": \"c\", \"text\": \"الاختيار الثالث\" },
        { \"id\": \"d\", \"text\": \"الاختيار الرابع\" }
      ],
      "correct_answer": "a",
      "points": 1,
      "needs_review": false
    }
  ]
}
`;

    const contents: any[] = [{ text: systemPrompt }];

    // Primary Exam File
    contents.push({
      inlineData: {
        data: pdfBuffer.toString('base64'),
        mimeType: mimeType,
      },
    });
    contents.push({ text: 'هذا هو ملف الامتحان الأساسي المراد استخراج جميع أسئلته حرفياً مع التشكيل والجمل الكاملة.' });

    // Optional Answer Key File Attachment
    if (answersBuffer && answersBuffer.length > 0) {
      contents.push({
        inlineData: {
          data: answersBuffer.toString('base64'),
          mimeType: answersMimeType,
        },
      });
      contents.push({ text: 'هذا هو ملف نموذج الإجابات الرسمي الملحق. استخدمه لمطابقة الإجابة الصحيحة لكل سؤال بدقة.' });
    }

    // Optional Answer Key Text
    if (answersTextPrompt && answersTextPrompt.trim().length > 0) {
      contents.push({
        text: `نموذج الإجابات المكتوب: \n${answersTextPrompt.trim()}\nيرجى مطابقة هذه الإجابات مع الأسئلة المستخرجة وتعيين الاختيار الصحيح.`,
      });
    }

    // Stable fallback sequence prioritized for maximum reliability and uptime
    const modelsToTry = [
      this.modelName,
      'gemini-2.5-flash',
      'gemini-3.6-flash',
      'gemini-3.5-flash-lite',
    ].filter((v, i, a) => !!v && a.indexOf(v) === i);

    let lastError: any = null;

    for (const modelToUse of modelsToTry) {
      // Retry each model up to 2 attempts with a short backoff on 503 / 429 errors
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          console.log(`[Gemini Parser] Attempting model ${modelToUse} (try ${attempt})...`);

          const model = genAI.getGenerativeModel({
            model: modelToUse,
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.1,
            },
          });

          const result = await model.generateContent(contents);
          const response = await result.response;
          const jsonText = response.text();

          if (!jsonText) {
            throw new Error('لم يتم استلام أي رد من نموذج Gemini');
          }

          // Clean up markdown code fences if present
          let cleanedJson = jsonText.trim();
          if (cleanedJson.startsWith('```json')) {
            cleanedJson = cleanedJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
          } else if (cleanedJson.startsWith('```')) {
            cleanedJson = cleanedJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
          }

          const parsedRaw = JSON.parse(cleanedJson);
          const validatedExam = ExamSchema.parse(parsedRaw);

          console.log(`[Gemini Parser] Successfully extracted ${validatedExam.questions.length} questions using ${modelToUse}.`);
          return validatedExam;
        } catch (err: any) {
          lastError = err;
          const errMsg = err?.message || String(err);
          console.warn(`[Gemini Parser] Model ${modelToUse} (try ${attempt}) failed:`, errMsg);

          // If 503 or 429 or high demand, wait a moment and retry or fallback
          if (errMsg.includes('503') || errMsg.includes('high demand') || errMsg.includes('429')) {
            if (attempt === 1) {
              await waitMs(1500);
              continue;
            }
          }
          break; // break to next model in list
        }
      }
    }

    // If all models and retries failed
    console.error('All models failed in Gemini PDF Parsing:', lastError);
    if (lastError instanceof z.ZodError) {
      throw new Error(`خطأ في التحقق من بنية البيانات المستخرجة من الذكاء الاصطناعي: ${lastError.errors.map(e => e.message).join(', ')}`);
    }
    if (lastError instanceof SyntaxError) {
      throw new Error('فشل قراءة الـ JSON المستخرج من النموذج. يرجى إعادة المحاولة.');
    }
    
    const errMessage = lastError?.message || '';
    if (errMessage.includes('503') || errMessage.includes('high demand') || errMessage.includes('Service Unavailable')) {
      throw new Error('سيرفرات الذكاء الاصطناعي تشهد ضغطاً مؤقتاً حالياً (503 Service Unavailable). يرجى إعادة المحاولة بعد ثوانٍ قليلة.');
    }

    throw new Error(lastError?.message || 'حدث خطأ أثناء معالجة ملف الـ PDF عبر الذكاء الاصطناعي');
  }
}
