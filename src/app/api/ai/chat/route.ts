import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { 
  TMFS_AI_SYSTEM_INSTRUCTION, 
  detectAndComputeSip 
} from '@/lib/ai-knowledge';

export const runtime = 'nodejs';

interface ChatRequest {
  message: string;
  language?: 'en' | 'hi' | 'or' | 'te';
  history?: {
    role: 'user' | 'model';
    text: string;
  }[];
}

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  hi: 'Hindi (हिंदी, Devanagari script)',
  or: 'Odia (ଓଡ଼ିଆ, Odia script)',
  te: 'Telugu (తెలుగు, Telugu script)',
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequest;
    const userMessage = (body.message || '').trim();
    const language = body.language || 'en';

    if (!userMessage) {
      return NextResponse.json(
        { error: 'Message cannot be empty.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Verify API key is present
    if (!apiKey) {
      const errorMsg = language === 'hi'
        ? '⚠️ सर्वर पर GEMINI_API_KEY सेट नहीं है। कृपया अपने होस्टिंग डैशबोर्ड (जैसे Vercel Settings -> Environment Variables) में GEMINI_API_KEY जोड़ें।'
        : language === 'or'
        ? '⚠️ ସର୍ଭରରେ GEMINI_API_KEY ସେଟ୍ ହୋଇନାହିଁ। ଦୟାକରି ଆପଣଙ୍କର ହୋଷ୍ଟିଂ ଡ୍ୟାସବୋର୍ଡ (ଯଥା Vercel Settings -> Environment Variables) ରେ GEMINI_API_KEY ଯୋଡନ୍ତୁ।'
        : language === 'te'
        ? '⚠️ సర్వర్‌లో GEMINI_API_KEY సెట్ చేయబడలేదు. దయచేసి మీ హోస్టింగ్ డాష్‌బోర్డ్ (ఉదా. Vercel Settings -> Environment Variables) లో GEMINI_API_KEY ని జోడించండి.'
        : '⚠️ GEMINI_API_KEY is not configured in server environment variables. Please add GEMINI_API_KEY to your deployment platform (e.g. Vercel Settings -> Environment Variables).';

      return NextResponse.json({
        reply: errorMsg,
        source: 'missing-api-key',
      });
    }

    // Direct Gemini LLM Generation
    const ai = new GoogleGenAI({ apiKey });
    
    // Build strictly validated conversation history (must alternate user -> model)
    const contents: any[] = [];
    if (body.history && Array.isArray(body.history)) {
      let expectedRole: 'user' | 'model' = 'user';
      for (const item of body.history.slice(-6)) {
        if (item && item.text && item.text.trim()) {
          const itemRole = item.role === 'user' ? 'user' : 'model';
          if (itemRole === expectedRole) {
            contents.push({
              role: itemRole,
              parts: [{ text: item.text.trim() }],
            });
            expectedRole = expectedRole === 'user' ? 'model' : 'user';
          }
        }
      }
    }

    // If the last history turn is 'user', remove it so current user turn can be added cleanly
    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      contents.pop();
    }

    // Add current user turn
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }],
    });

    // Strict multi-language requirement prompt
    const langPrompt = `

CRITICAL LANGUAGE INSTRUCTION:
The user selected language is: ${LANGUAGE_NAMES[language] || 'English'}.
You MUST generate your entire answer in ${LANGUAGE_NAMES[language] || 'English'}.
- If language is Hindi: write fluently in Hindi (हिंदी) using Devanagari script.
- If language is Odia: write fluently in Odia (ଓଡ଼ିଆ) using Odia script.
- If language is Telugu: write fluently in Telugu (తెలుగు) using Telugu script.
- If language is English: write in English.
Do NOT reply in English when Hindi, Odia, or Telugu is chosen! Keep technical terms like SIP, NAV, SWP, Mutual Fund clear with their native explanation. Keep responses concise, clear, and direct.`;

    // Use gemini-3.5-flash-lite for instant responses (2-3s) without thinking latency
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents,
      config: {
        systemInstruction: `${TMFS_AI_SYSTEM_INSTRUCTION}${langPrompt}`,
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    let replyText = response?.text?.trim();
    if (!replyText) {
      throw new Error('Gemini returned an empty response.');
    }

    // If query asked for calculation but LLM omitted calculation tag, append computed tag
    if (!replyText.includes('<!--SIP_CALC:')) {
      const detectedCalc = detectAndComputeSip(userMessage);
      if (detectedCalc) {
        replyText += `\n\n<!--SIP_CALC:${JSON.stringify(detectedCalc)}-->`;
      }
    }

    return NextResponse.json({
      reply: replyText,
      source: 'gemini-ai',
    });
  } catch (error: any) {
    console.error('[TMFS AI Chat API Error]:', error);
    return NextResponse.json(
      { 
        reply: `Error communicating with Gemini AI: ${error?.message || 'Unknown error'}. Please check your API key or network connection.`,
        source: 'error' 
      },
      { status: 500 }
    );
  }
}
