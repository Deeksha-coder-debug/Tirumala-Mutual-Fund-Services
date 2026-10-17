import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { 
  TMFS_AI_SYSTEM_INSTRUCTION, 
  findFallbackAnswer, 
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

    // 1. Primary: Use Gemini LLM with ultra-fast gemini-3.5-flash-lite (2-3 second latency)
    if (apiKey) {
      try {
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

        // Use gemini-3.5-flash-lite for instant, high-speed responses (2-3s) without thinking hang
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
        if (replyText) {
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
        }
      } catch (geminiError: any) {
        console.error('[TMFS AI Chat Gemini Execution Error]:', geminiError?.message || geminiError);
      }
    }

    // 2. Fallback: Curated investor education knowledge base
    const fallbackAnswer = findFallbackAnswer(userMessage, language);
    if (fallbackAnswer) {
      return NextResponse.json({
        reply: fallbackAnswer,
        source: 'curated-knowledge',
      });
    }

    // 3. Fallback calculation if query has numbers
    const calc = detectAndComputeSip(userMessage);
    if (calc) {
      const calcTag = `<!--SIP_CALC:${JSON.stringify(calc)}-->`;
      const fallbackReply = `Here is your SIP projection for **₹${calc.monthly.toLocaleString('en-IN')}/month** over **${calc.years} years** at an assumed 12% return:\n\n- **Total Investment:** ₹${calc.invested.toLocaleString('en-IN')}\n- **Estimated Wealth Gained:** ₹${calc.returns.toLocaleString('en-IN')}\n- **Expected Future Value:** ₹${calc.total.toLocaleString('en-IN')}\n\n${calcTag}`;
      return NextResponse.json({
        reply: fallbackReply,
        source: 'calculated-fallback',
      });
    }

    return NextResponse.json({
      reply: 'I am here to guide you on mutual funds and SIP. Please ask your question or select one of the suggested topics!',
      source: 'general-fallback',
    });
  } catch (error) {
    console.error('[TMFS AI Chat API Error]:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
