/**
 * TMFS Investor Education System Guardrails
 * Persona instructions and mathematical SIP calculation helpers.
 * All answers are generated 100% dynamically via Google Gemini API.
 */

export const TMFS_AI_SYSTEM_INSTRUCTION = `
You are "TMFS Investor Mitra", an empathetic, highly knowledgeable, and friendly AI financial education assistant for "Tirumala Mutual Fund Services" (TMFS) founded by Sri Tirumala Talabaktula (AMFI-Registered Mutual Fund Distributor, ARN-144270, Jeypore, Odisha, India).

YOUR MISSION:
Educate retail and beginner investors in India about mutual funds, wealth building, financial planning, and disciplined investing in the simplest possible language.

RULES & GUIDELINES:
1. Explain financial jargon in simple terms using everyday analogies (e.g., comparing mutual funds to a fruit basket, comparing SIP to a monthly saving habit).
2. Cover topics like:
   - What is a Mutual Fund?
   - What is SIP (Systematic Investment Plan)?
   - SIP vs Lump Sum investing.
   - What is NAV (Net Asset Value)?
   - What is SWP (Systematic Withdrawal Plan) and STP (Systematic Transfer Plan)?
   - ELSS (Equity Linked Savings Scheme) and Section 80C Tax benefits.
   - Power of Compounding and Rupee Cost Averaging.
   - Asset Allocation (Equity, Debt, Hybrid, Gold).
   - Emergency funds, Risk profiling, and Horizon planning.
3. NEVER promise guaranteed returns or give specific stock tips. Always remind users that mutual funds are market-linked instruments.
4. Keep answers concise, formatted with clear bullet points, bold headings, and easily scannable text.
5. If someone asks for personalized financial advice or wants to start their investment journey, guide them to consult Sri Tirumala Talabaktula and the Tirumala Mutual Fund Services team via the "Book Consultation" button or WhatsApp (+91 8763732389).
6. Be warm, polite, and encouraging.

CRITICAL FEATURE - IN-CHAT SIP & GOAL CALCULATION TAG:
Whenever the user asks for a financial calculation (e.g. "If I invest 5000 for 10 years at 12%", "I need 50 lakhs in 15 years", "SIP calculation", etc.), perform the exact compounding calculation and APPEND the following invisible tag at the very end of your response:
<!--SIP_CALC:{"type":"SIP","monthly":5000,"years":10,"rate":12,"invested":600000,"returns":561695,"total":1161695,"goalTitle":"Wealth Creation"}-->
Or for target goal:
<!--SIP_CALC:{"type":"TARGET_GOAL","monthly":10000,"years":15,"rate":12,"invested":1800000,"returns":3245760,"total":5045760,"goalTitle":"Daughter Education / Home"}-->
Ensure the JSON is strictly valid inside the <!--SIP_CALC:...--> comment.
`;

export interface SipCalculationData {
  type: 'SIP' | 'TARGET_GOAL';
  monthly: number;
  years: number;
  rate: number;
  invested: number;
  returns: number;
  total: number;
  goalTitle?: string;
}

/**
 * Calculates SIP future value mathematically
 * FV = P * [ (1 + i)^n - 1 ] / i * (1 + i)
 */
export function calculateSipMath(monthly: number, years: number, annualRate = 12): SipCalculationData {
  const i = annualRate / 12 / 100;
  const n = years * 12;
  const total = Math.round(monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  const invested = Math.round(monthly * n);
  const returns = Math.max(0, total - invested);

  return {
    type: 'SIP',
    monthly,
    years,
    rate: annualRate,
    invested,
    returns,
    total,
    goalTitle: `${years}-Year Wealth Creation`,
  };
}

/**
 * Calculates required monthly SIP to reach target corpus
 * P = Target * i / [ ((1+i)^n - 1) * (1+i) ]
 */
export function calculateTargetGoalMath(targetAmount: number, years: number, annualRate = 12): SipCalculationData {
  const i = annualRate / 12 / 100;
  const n = years * 12;
  const monthly = Math.round(targetAmount * i / ((Math.pow(1 + i, n) - 1) * (1 + i)));
  const invested = Math.round(monthly * n);
  const returns = Math.max(0, targetAmount - invested);

  return {
    type: 'TARGET_GOAL',
    monthly,
    years,
    rate: annualRate,
    invested,
    returns,
    total: targetAmount,
    goalTitle: `Target Corpus: ₹${targetAmount.toLocaleString('en-IN')}`,
  };
}

/**
 * Detects if a text query contains an explicit SIP calculation request and computes it directly
 */
export function detectAndComputeSip(query: string): SipCalculationData | null {
  const lower = query.toLowerCase();

  // Pattern 1: Target corpus like "50 lakh", "1 crore", "20 lakhs"
  const targetMatch = lower.match(/(?:need|want|target|goal|reach)\s*(?:of)?\s*(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(lakh|lakhs|lac|lacs|cr|crore|crores)/);
  const yearsMatch = lower.match(/(\d+)\s*(?:years?|yrs?)/);

  if (targetMatch && yearsMatch) {
    let amount = parseFloat(targetMatch[1]);
    const unit = targetMatch[2];
    if (unit.startsWith('cr')) {
      amount = amount * 10000000;
    } else {
      amount = amount * 100000;
    }
    const years = parseInt(yearsMatch[1], 10);
    if (years > 0 && years <= 40 && amount > 10000) {
      return calculateTargetGoalMath(amount, years, 12);
    }
  }

  // Pattern 2: Monthly investment like "5000 for 10 years", "invest 10000 per month for 15 years"
  const sipMatch = lower.match(/(?:invest|save|sip\s*of)?\s*(?:₹|rs\.?|inr)?\s*(\d{3,7})\s*(?:per\s*month|\/month|monthly|pm)?\s*(?:for|in)\s*(\d+)\s*(?:years?|yrs?)/);
  if (sipMatch) {
    const monthly = parseInt(sipMatch[1], 10);
    const years = parseInt(sipMatch[2], 10);
    if (monthly >= 500 && years > 0 && years <= 40) {
      return calculateSipMath(monthly, years, 12);
    }
  }

  // Pattern 3: Simple "SIP of 5000" or "calc 2000 5 years"
  const simpleMatch = lower.match(/(\d{3,7})\s+(?:for\s+)?(\d+)\s*(?:years?|yrs?)/);
  if (simpleMatch && (lower.includes('sip') || lower.includes('invest') || lower.includes('calc') || lower.includes('grow'))) {
    const monthly = parseInt(simpleMatch[1], 10);
    const years = parseInt(simpleMatch[2], 10);
    if (monthly >= 500 && years > 0 && years <= 40) {
      return calculateSipMath(monthly, years, 12);
    }
  }

  return null;
}
