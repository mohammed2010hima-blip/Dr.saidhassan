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
   * Parses a PDF file (base64) into structured exam questions with automatic fallback and retry
   */
  async parsePDFToExam(pdfBuffer: Buffer, mimeType: string = 'application/pdf'): Promise<ParsedExam> {
    if (!this.apiKey) {
      throw new Error('مفتاح Google Gemini API غير محدد. يرجى إدخاله في صفحة الإعدادات أو ملف البيئة.');
    }

    const genAI = new GoogleGenerativeAI(this.apiKey);

    const systemPrompt = `
You are a world-class AI exam parser specialized in Arabic educational documents, exams, and curricula.
Your task is to extract exam questions with 100% VERBATIM ACCURACY (استخراج حرفي تام) and RICH TEXT PARSING (تنسيق متقدم) from the provided PDF document.

CRITICAL INSTRUCTIONS FOR ARABIC EXAMS & FORMATTING:
1. VERBATIM EXTRACTION (استخراج حرفي تام):
   - Extract every word, sentence, poetry verse (بيت شعر), and punctuation mark EXACTLY as written in the original document.
   - NEVER alter, paraphrase, summarize, omit, or invent questions or options.

2. READING COMPREHENSION PASSAGES & POETRY PARAGRAPHS (قطع القراءة والفقرات والنصوص):
   - If a question or a set of questions refers to a reading passage, literary text, poetry piece, Quranic excerpt, or paragraph (e.g., 'اقرأ الفقرة التالية ثم أجب...', 'قال الشاعر:...'):
   - You MUST extract the full passage text into the "passage" field for all questions related to that passage.
   - The "question_text" should contain the specific question itself.
   - If a question does not belong to a separate passage, set "passage": null.

3. ARABIC DIACRITICS & TASHKEEL PRESERVATION (الحفاظ التام على التشكيل):
   - You MUST preserve every Arabic Tashkeel mark present in the document:
     * الفتحة ( َ ), الضمة ( ُ ), الكسرة ( ِ ), السكون ( ْ ), الشدة ( ّ )
     * تنوين الفتح ( ً ), تنوين الضم ( ٌ ), تنوين الكسر ( ٍ )
   - This is of supreme importance in Arabic grammar (النحو) and phonetics. Do NOT strip or modify any diacritics.

4. RICH TEXT PARSING (قراءة التنسيقات المتقدمة):
   - Preserve text underlines (الخطوط السفلية تحت الكلمات المراد إعرابها أو استخراجها) using HTML <u>word</u> tags (e.g. "أعرب ما تحته خط: قرأتُ <u>الكتابَ</u> المفيدَ").
   - Preserve bold text using **word** or <b>word</b>.
   - Preserve quotation marks («...» or "...") and brackets.
   - Preserve stanza line breaks for poetry verses.

5. QUESTION CLASSIFICATION:
   - "mcq": Multiple Choice Questions with choices (أ, ب, ج, د or 1, 2, 3, 4 or A, B, C, D).
   - "essay": Open-ended, essay, explanation, grammar parsing (إعراب), or free-response questions without fixed choices.

6. MCQ OPTIONS MAPPING:
   - Map options sequentially to lowercase keys: "a", "b", "c", "d" (and "e" if 5 options exist).
   - Preserve the exact text and diacritics of each option.

7. ACCURATE SCORING & REVIEW FLAGS:
   - If the correct answer is explicitly marked in the document (answer key or checkmark), specify it ("a", "b", etc.).
   - If uncertain or not explicitly provided, set "correct_answer": null and "needs_review": true.

8. OUTPUT SPECIFICATION:
   - Output MUST be strictly valid JSON conforming to this schema without any outer explanation:

{
  "exam_title": "String (Title of the exam, e.g. 'امتحان شامل في اللغة العربية')",
  "description": "String (Instructions, header, subject information)",
  "duration_minutes": 60,
  "questions": [
    {
      "id": "q1",
      "question_number": 1,
      "type": "mcq",
      "passage": "نص الفقرة أو القطعة أو الأبيات الشعرية كاملة التي يدور حولها السؤال إن وُجدت، أو null إن لم توجد.",
      "question_text": "ما الفكرة الرئيسة في الفقرة السابقة؟",
      "options": [
        { "id": "a", "text": "الاختيار الأول مع التشكيل" },
        { "id": "b", "text": "الاختيار الثاني" },
        { "id": "c", "text": "الاختيار الثالث" },
        { "id": "d", "text": "الاختيار الرابع" }
      ],
      "correct_answer": "a",
      "points": 1,
      "needs_review": false
    },
    {
      "id": "q2",
      "question_number": 2,
      "type": "essay",
      "passage": null,
      "question_text": "أعرب ما تحته خط في جملة: «العلمُ <u>نورٌ</u>»",
      "options": [],
      "correct_answer": null,
      "points": 2,
      "needs_review": true
    }
  ]
}
`;

    const filePart = {
      inlineData: {
        data: pdfBuffer.toString('base64'),
        mimeType: mimeType,
      },
    };

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

          const result = await model.generateContent([
            { text: systemPrompt },
            filePart,
            { text: 'Analyze this PDF exam and extract all questions into the specified JSON structure.' },
          ]);

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
