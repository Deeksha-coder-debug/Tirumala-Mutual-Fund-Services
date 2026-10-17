/**
 * TMFS Investor Education Knowledge Base & System Guardrails
 * Enhanced with Multi-Language support (EN, HI, OR, TE)
 * and Interactive In-Chat SIP / Goal Calculations.
 */

export const TMFS_AI_SYSTEM_INSTRUCTION = `
You are "TMFS Investor Mitra", an empathetic, highly knowledgeable, and friendly AI financial education assistant for "Tirumala Mutual Fund Services" (TMFS) founded by Sri Tirumala Talabaktula (AMFI-Registered Mutual Fund Distributor, ARN-144270, Jeypore, Odisha, India).

YOUR MISSION:
Educate retail and beginner investors in India about mutual funds, wealth building, financial planning, and disciplined investing in the simplest possible language.

LANGUAGE RULES:
- If user requests or is set to English ("en"): reply in clear, friendly English.
- If user requests or is set to Hindi ("hi"): reply in natural Hindi (Devanagari script or conversational Hindi).
- If user requests or is set to Odia ("or"): reply in natural Odia (ଓଡ଼ିଆ script) or conversational Odia with English financial terms.
- If user requests or is set to Telugu ("te"): reply in natural Telugu (తెలుగు script) or conversational Telugu with English financial terms.
- If the user writes in a specific language (Hindi, Odia, Telugu, English), automatically match their language.

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

export interface CuratedTopic {
  keywords: string[];
  title: string;
  answer: string;
}

export const CURATED_INVESTOR_TOPICS: CuratedTopic[] = [
  {
    keywords: ['what is sip', 'sip', 'systematic investment plan', 'how does sip work'],
    title: 'What is a SIP (Systematic Investment Plan)?',
    answer: `**SIP (Systematic Investment Plan)** is a smart, disciplined way of investing a fixed sum of money at regular intervals (usually monthly) into a mutual fund scheme.

### 💡 Think of it like this:
Just like a recurring deposit (RD), you set aside a small amount (as low as ₹500/month), but instead of a fixed bank interest, it gets invested in the market to help beat inflation!

### 🌟 Key Benefits of SIP:
1. **Rupee Cost Averaging:** When the market is down, you get more units; when the market is up, you get fewer units. Over time, your purchase cost averages out!
2. **Power of Compounding:** Reinvested earnings generate their own earnings over 5, 10, or 20 years.
3. **No Market Timing Needed:** You don't have to guess whether the stock market will rise or fall tomorrow.
4. **Convenient Auto-Debit:** Automatically invested every month directly from your bank account.

<!--SIP_CALC:{"type":"SIP","monthly":3000,"years":10,"rate":12,"invested":360000,"returns":337017,"total":697017,"goalTitle":"Sample ₹3,000/mo SIP Growth"}-->`,
  },
  {
    keywords: ['sip vs lumpsum', 'lumpsum or sip', 'lump sum', 'one time investment'],
    title: 'SIP vs Lump Sum: Which is Better?',
    answer: `Both are popular ways to invest in mutual funds, but they suit different situations:

### 🔄 1. SIP (Systematic Investment Plan):
- **Best for:** Salaried individuals or anyone with regular monthly income.
- **Advantage:** Spreads your investment across market ups and downs (**Rupee Cost Averaging**), reducing volatility risk.
- **Minimum:** Often starts from as low as **₹500/month**.

### 💰 2. Lump Sum (One-Time Investment):
- **Best for:** When you have a bulk amount ready (e.g., annual bonus, sale of property, or retirement corpus).
- **Strategy:** If the market is volatile, investors often park the lump sum in a low-risk **Liquid/Debt fund** and do an **STP (Systematic Transfer Plan)** into Equity funds over 6–12 months.

*Unsure which suits your current cashflow? Contact our TMFS advisor for a free portfolio consultation!*`,
  },
  {
    keywords: ['what is mutual fund', 'mutual fund', 'how do mutual funds work', 'mf'],
    title: 'What is a Mutual Fund?',
    answer: `A **Mutual Fund** pools money from thousands of investors to invest in a diversified basket of stocks, government bonds, or money market instruments.

### 🍎 The Simple Analogy:
Instead of buying a single apple tree yourself, you and a group of friends hire an experienced farmer (a **Fund Manager**) who buys an entire fruit orchard. You all share the harvest proportionately!

### 🎯 Why Invest in Mutual Funds?
- **Professional Management:** Experienced fund managers and research teams make buy/sell decisions.
- **Diversification:** Even with ₹1,000, your money is spread across 40–60 leading companies, reducing risk.
- **High Liquidity:** You can redeem your money into your bank account in 1 to 3 working days (except ELSS lock-in).
- **Strictly Regulated:** Governed by SEBI (Securities and Exchange Board of India) and AMFI.`,
  },
  {
    keywords: ['elss', 'tax saving', 'save tax', '80c', 'tax fund'],
    title: 'What is ELSS (Equity Linked Savings Scheme)?',
    answer: `**ELSS** is a special category of mutual funds that provides tax deduction under **Section 80C** of the Indian Income Tax Act.

### 🏆 Why ELSS stands out:
1. **Tax Deduction:** Claim deductions up to **₹1.5 Lakh** every financial year (under the Old Tax Regime).
2. **Shortest Lock-in Period:** Only **3 years**! (Compared to 5 years in Tax-saving FDs and 15 years in PPF).
3. **Wealth Creation:** Because ELSS invests primarily in equities, it offers higher long-term growth potential than traditional fixed-income tax instruments.

*Note: You can invest in ELSS either via monthly SIP or lump sum.*`,
  },
  {
    keywords: ['nav', 'net asset value', 'what is nav'],
    title: 'What is NAV (Net Asset Value)?',
    answer: `**NAV (Net Asset Value)** is the price of **one unit** of a mutual fund scheme.

### 📊 How it is calculated:
$$\\text{NAV} = \\frac{\\text{Total Market Value of Fund's Assets} - \\text{Expenses & Liabilities}}{\\text{Total Outstanding Units}}$$

### ⚠️ Common Myth Busted:
- *Myth:* "A fund with NAV of ₹20 is cheaper and better than a fund with NAV of ₹200."
- *Reality:* **False!** NAV does not indicate whether a fund is cheap or expensive. What matters is the **percentage return** generated by the fund's underlying portfolio, not the absolute NAV figure.`,
  },
  {
    keywords: ['swp', 'systematic withdrawal', 'regular income', 'monthly pension'],
    title: 'What is an SWP (Systematic Withdrawal Plan)?',
    answer: `**SWP (Systematic Withdrawal Plan)** allows you to withdraw a fixed amount of money from your mutual fund investment at regular intervals (monthly or quarterly).

### 🏖️ Ideal For:
- **Retirees** looking for regular monthly cash flows (like a self-made pension).
- Generating second income without liquidating your whole investment at once.

### 💡 Tax Advantage:
Unlike bank FD interest (where the entire interest is taxed), in an SWP, tax is applied only on the capital gains portion of the withdrawn amount, making it significantly more tax-efficient!`,
  },
  {
    keywords: ['stp', 'systematic transfer', 'transfer fund'],
    title: 'What is an STP (Systematic Transfer Plan)?',
    answer: `**STP (Systematic Transfer Plan)** lets you automatically transfer a fixed amount from one mutual fund scheme to another scheme (within the same fund house) on a pre-decided date.

### 🛡️ Smart Strategy:
If you receive a lump sum of ₹5 Lakhs:
1. Deposit the entire ₹5 Lakhs into a safe, liquid/debt fund.
2. Setup an STP to transfer ₹25,000 every month into an equity fund.
3. This protects you from market highs while your money earns liquid returns until deployed!`,
  },
  {
    keywords: ['compounding', 'power of compounding', 'returns growth'],
    title: 'The Magic of Compounding in Wealth Building',
    answer: `Albert Einstein famously called **Compounding** the *"Eighth Wonder of the World"*.

### 📈 How it Works:
You earn returns not just on your original investment (principal), but also on the returns accumulated from previous years!

### ⏳ Time is Your Superpower:
The longer you stay invested, the steeper the wealth curve grows. For example, staying invested for 20 years instead of 10 years can multiply your final wealth by 4x to 5x even with the same monthly SIP!

<!--SIP_CALC:{"type":"SIP","monthly":5000,"years":15,"rate":12,"invested":900000,"returns":1597880,"total":2497880,"goalTitle":"15-Year Compounding Power"}-->`,
  },
  {
    keywords: ['safe', 'risk', 'is mutual fund safe', 'can i lose money'],
    title: 'Are Mutual Funds Safe? Understanding Risk',
    answer: `Mutual funds are **not guaranteed bank deposits**, but they are managed with high safety standards and transparency:

1. **Strictly Regulated by SEBI & AMFI:** Fund houses must follow rigorous compliance, audit, and valuation guidelines.
2. **Diversification:** Your money is not tied to one company; if one company falls, others balance it out.
3. **Choosing the Right Risk Category:**
   - **Low Risk:** Liquid Funds & Overnight Funds (for days to months).
   - **Moderate Risk:** Short-term Debt & Conservative Hybrid Funds (for 1–3 years).
   - **Higher Risk / High Growth:** Large-cap, Multi-cap, Mid-cap & Small-cap Equity Funds (for 5+ years).

*Mutual Fund investments are subject to market risks. Reading scheme documents and doing proper risk profiling is recommended!*`,
  },
  {
    keywords: ['kyc', 'start investing', 'how to begin', 'documents'],
    title: 'How to Start Investing with TMFS? (KYC Process)',
    answer: `Starting your mutual fund journey with **Tirumala Mutual Fund Services** is simple, 100% paperless or guided:

### 📋 Documents Needed (KYC):
1. **PAN Card** (Mandatory)
2. **Aadhaar Card** (For address verification)
3. **Bank Account Details** (Cancelled cheque or passbook copy)
4. **Passport-size Photograph & Signature**

### 🚀 Next Steps:
You can click **"Book Free Consultation"** on our website or message us on WhatsApp (**+91 8763732389**). Our AMFI-registered advisor will help you complete KYC and pick the right funds for your financial goals!`,
  },
];

export function findFallbackAnswer(query: string, language = 'en'): string | null {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return null;

  // 1. Check if user asked for a calculation in fallback mode
  const sipCalc = detectAndComputeSip(query);
  if (sipCalc) {
    const calcTag = `<!--SIP_CALC:${JSON.stringify(sipCalc)}-->`;
    if (sipCalc.type === 'TARGET_GOAL') {
      return `To achieve your goal of **₹${sipCalc.total.toLocaleString('en-IN')}** in **${sipCalc.years} years** at an assumed 12% annual return:

- **Required Monthly SIP:** ₹${sipCalc.monthly.toLocaleString('en-IN')}/month
- **Your Total Investment:** ₹${sipCalc.invested.toLocaleString('en-IN')}
- **Estimated Wealth Gained:** ₹${sipCalc.returns.toLocaleString('en-IN')}
- **Expected Total Corpus:** ₹${sipCalc.total.toLocaleString('en-IN')}

${calcTag}`;
    } else {
      return `Here is your SIP growth calculation for **₹${sipCalc.monthly.toLocaleString('en-IN')}/month** for **${sipCalc.years} years** at an assumed 12% annual return:

- **Monthly SIP:** ₹${sipCalc.monthly.toLocaleString('en-IN')}
- **Your Total Investment:** ₹${sipCalc.invested.toLocaleString('en-IN')}
- **Estimated Wealth Gained:** ₹${sipCalc.returns.toLocaleString('en-IN')}
- **Expected Final Corpus:** ₹${sipCalc.total.toLocaleString('en-IN')}

${calcTag}`;
    }
  }

  // 2. Curated topic lookup
  for (const item of CURATED_INVESTOR_TOPICS) {
    if (item.keywords.some((kw) => normalized.includes(kw))) {
      return item.answer;
    }
  }

  // 3. Greetings in multiple languages
  if (normalized.includes('hello') || normalized.includes('hi') || normalized.includes('namaste') || normalized.includes('namaskar')) {
    if (language === 'hi') {
      return `नमस्ते! 🙏 मैं हूँ **TMFS इन्वेस्टर मित्र**, तिरुमला म्युचुअल फंड सर्विसेज की ओर से आपका वित्तीय शिक्षा सहायक।

आप मुझसे इन विषयों पर पूछ सकते हैं:
- **SIP क्या है और कैसे काम करता है?**
- **SIP बनाम एकमुश्त निवेश (Lump Sum)**
- **ELSS द्वारा टैक्स बचत**
- **कम्पाउंडिंग की शक्ति**
- **निवेश शुरू करने की प्रक्रिया (KYC)**

आज मैं आपकी क्या सहायता कर सकता हूँ?`;
    }

    if (language === 'or') {
      return `ନମସ୍କାର! 🙏 ମୁଁ **TMFS ଇନଭେଷ୍ଟର ମିତ୍ର**, ତିରୁମଲା ମ୍ୟୁଚୁଆଲ ଫଣ୍ଡ ସର୍ଭିସେସ୍‌ରୁ ଆପଣଙ୍କର ଆର୍ଥିକ ଶିକ୍ଷା ସହାୟକ।

ଆପଣ ମୋତେ ନିମ୍ନଲିଖିତ ବିଷୟରେ ପଚାରିପାରିବେ:
- **SIP କ'ଣ ଏବଂ ଏହା କିପରି କାମ କରେ?**
- **SIP ଏବଂ Lump Sum ମଧ୍ୟରେ କ'ଣ ପାର୍ଥକ୍ୟ?**
- **ELSS ରେ ଟ୍ୟାକ୍ସ କିପରି ବଞ୍ଚାଇବେ?**
- **ଚକ୍ରବୃଦ୍ଧି (Compounding) ର ଶକ୍ତି**
- **ନିବେଶ କିପରି ଆରମ୍ଭ କରିବେ (KYC)**

ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?`;
    }

    if (language === 'te') {
      return `నమస్కారం! 🙏 నేను **TMFS ఇన్వెస్టర్ మిత్ర**, తిరుమల మ్యూచువల్ ఫండ్ సర్వీసెస్ నుండి మీ ఆర్థిక విద్యా సహాయకుడిని.

మీరు నన్ను వీటి గురించి అడగవచ్చు:
- **SIP అంటే ఏమిటి మరియు ఇది ఎలా పనిచేస్తుంది?**
- **SIP వర్సెస్ లంప్సమ్ (Lump Sum)**
- **ELSS ద్వారా పన్ను ఆదా చేయడం**
- **కాంపౌండింగ్ పవర్ (Compounding Power)**
- **పెట్టుబడిని ఎలా ప్రారంభించాలి (KYC)**

ఈ రోజు మీ ఆర్థిక ప్రయాణానికి నేను ఎలా సహాయపడగలను?`;
    }

    return `Namaste! 🙏 I am **TMFS Investor Mitra**, your personal investor education assistant from **Tirumala Mutual Fund Services**. 

You can ask me anything about:
- **SIP** (What it is, how it works, benefits)
- **SIP vs Lump Sum**
- **Tax Saving with ELSS**
- **What is NAV, SWP, or STP**
- **Power of Compounding**
- **How to start investing & KYC**
- **Calculate your SIP** (e.g. "Calculate 5000 for 10 years")

How can I help guide your financial journey today?`;
  }

  return null;
}
