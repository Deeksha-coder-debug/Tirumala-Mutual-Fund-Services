'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  RotateCcw, 
  Calendar, 
  ExternalLink, 
  HelpCircle,
  ChevronDown,
  Mic,
  MicOff,
  Calculator,
  TrendingUp,
  Coins,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/constants';
import { SipCalculationData } from '@/lib/ai-knowledge';

type LanguageCode = 'en' | 'hi' | 'or' | 'te';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  calcData?: SipCalculationData | null;
}

const LANGUAGES: { code: LanguageCode; label: string; nativeName: string; speechLocale: string }[] = [
  { code: 'en', label: 'English', nativeName: 'English', speechLocale: 'en-IN' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिंदी', speechLocale: 'hi-IN' },
  { code: 'or', label: 'Odia', nativeName: 'ଓଡ଼ିଆ', speechLocale: 'or-IN' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు', speechLocale: 'te-IN' },
];

const PRESET_QUESTIONS_BY_LANG: Record<LanguageCode, string[]> = {
  en: [
    'What is SIP and how does it work?',
    'Calculate ₹5000 for 10 years at 12%',
    'I need ₹50 Lakhs in 15 years, how much SIP?',
    'SIP vs Lump Sum: Which is better?',
    'How does ELSS save income tax?',
    'What is NAV in mutual funds?',
  ],
  hi: [
    'SIP क्या है और कैसे काम करता है?',
    '₹5000 प्रति माह 10 साल के लिए कैलकुलेट करें',
    'मुझे 15 साल में 50 लाख चाहिए, कितना SIP करें?',
    'SIP बनाम एकमुश्त (Lump sum) निवेश',
    'ELSS द्वारा इनकम टैक्स कैसे बचाएं?',
    'म्युचुअल फंड में NAV क्या है?',
  ],
  or: [
    'SIP କ’ଣ ଏବଂ ଏହା କିପରି କାମ କରେ?',
    'ପ୍ରତି ମାସ ₹5000 କଲେ 10 ବର୍ଷରେ କେତେ ହେବ?',
    'ମୋତେ 15 ବର୍ଷରେ 50 ଲକ୍ଷ ଦରକାର, କେତେ SIP କରିବି?',
    'SIP ଏବଂ Lump Sum ମଧ୍ୟରେ ପାର୍ଥକ୍ୟ କ’ଣ?',
    'ELSS ରେ ଟ୍ୟାକ୍ସ କିପରି ବଞ୍ଚାଇବେ?',
    'ମ୍ୟୁଚୁଆଲ ଫଣ୍ଡରେ NAV କ’ଣ?',
  ],
  te: [
    'SIP అంటే ఏమిటి మరియు ఇది ఎలా పనిచేస్తుంది?',
    'నెలకు ₹5000 చొప్పున 10 ఏళ్లు పెడితే ఎంత వస్తుంది?',
    'నాకు 15 ఏళ్లలో 50 లక్షలు కావాలి, ఎంత SIP చేయాలి?',
    'SIP వర్సెస్ లంప్సమ్ (Lump Sum)',
    'ELSS ద్వారా పన్ను ఎలా ఆదా చేయాలి?',
    'మ్యూచువల్ ఫండ్స్‌లో NAV అంటే ఏమిటి?',
  ],
};

const WELCOME_MESSAGES: Record<LanguageCode, string> = {
  en: `Namaste! 🙏 I am **TMFS Investor Mitra**, your personal AI wealth educator from **Tirumala Mutual Fund Services**.\n\nAsk me anything about **SIPs**, **Mutual Funds**, **Tax-Saving ELSS**, or ask me to **calculate your SIP goal**!`,
  hi: `नमस्ते! 🙏 मैं हूँ **TMFS इन्वेस्टर मित्र**, तिरुमला म्युचुअल फंड सर्विसेज की ओर से आपका वित्तीय सलाहकार मित्र।\n\nमुझसे **SIP**, **म्युचुअल फंड**, **ELSS टैक्स बचत**, या अपने **SIP कैलकुलेशन** के बारे में कुछ भी पूछें!`,
  or: `ନମସ୍କାର! 🙏 ମୁଁ **TMFS ଇନଭେଷ୍ଟର ମିତ୍ର**, ତିରୁମଲା ମ୍ୟୁଚୁଆଲ ଫଣ୍ଡ ସର୍ଭିସେସ୍‌ରୁ ଆପଣଙ୍କର ଆର୍ଥିକ ଶିକ୍ଷା ସହାୟକ।\n\nମୋତେ **SIP**, **ମ୍ୟୁଚୁଆଲ ଫଣ୍ଡ**, **ଟ୍ୟାକ୍ସ ସେଭିଙ୍ଗ ELSS**, କିମ୍ବା ଆପଣଙ୍କର **SIP ହିସାବ** ବିଷୟରେ ପଚାରନ୍ତୁ!`,
  te: `నమస్కారం! 🙏 నేను **TMFS ఇన్వెస్టర్ మిత్ర**, తిరుమల మ్యూచువల్ ఫండ్ సర్వీసెస్ నుండి మీ AI ఆర్థిక విద్యా సహాయకుడిని.\n\nమీరు **SIP**, **మ్యూచువల్ ఫండ్స్**, **ELSS పన్ను ఆదా**, లేదా మీ **SIP కాలిక్యులేషన్** గురించి ఏదైనా అడగవచ్చు!`,
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: WELCOME_MESSAGES['en'],
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Parse SIP calculation JSON tag from message if present
  const extractCalculationData = (content: string): { cleanContent: string; calcData: SipCalculationData | null } => {
    const calcRegex = /<!--SIP_CALC:([\s\S]*?)-->/;
    const match = content.match(calcRegex);
    if (match) {
      try {
        const parsed = JSON.parse(match[1]) as SipCalculationData;
        const cleanContent = content.replace(calcRegex, '').trim();
        return { cleanContent, calcData: parsed };
      } catch (e) {
        console.error('Failed to parse SIP calc tag', e);
      }
    }
    return { cleanContent: content, calcData: null };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages]);

  // Update welcome message when language changes if only welcome is present
  const handleLanguageChange = (newLang: LanguageCode) => {
    setLanguage(newLang);
    if (messages.length === 1 && messages[0].id.startsWith('welcome')) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          role: 'assistant',
          content: WELCOME_MESSAGES[newLang],
          timestamp: 'Just now',
        },
      ]);
    }
  };

  // Speech to Text (Voice Input)
  const toggleSpeechRecognition = () => {
    setSpeechError(null);

    // If currently listening, stop it
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    // Check browser support
    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError('Voice input is not supported in this browser. Please use Chrome or Edge.');
      setTimeout(() => setSpeechError(null), 4000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;

      // Select locale based on active language
      const currentLangConfig = LANGUAGES.find((l) => l.code === language);
      recognition.lang = currentLangConfig?.speechLocale || 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone access was denied. Please allow microphone permission.');
        } else if (event.error === 'network') {
          setSpeechError('Voice recognition network error. Please check your connection.');
        } else {
          setSpeechError(`Voice error: ${event.error}`);
        }
        setTimeout(() => setSpeechError(null), 4000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('Speech recognition start failed:', err);
      setIsListening(false);
      setSpeechError('Could not start voice recognition.');
      setTimeout(() => setSpeechError(null), 3000);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const history = messages
        .filter((m) => !m.id.startsWith('welcome'))
        .map((m) => ({
          role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
          text: m.content,
        }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, language, history }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      const rawReply = data.reply || data.error || 'Sorry, I could not process your query. Please try again.';
      const { cleanContent, calcData } = extractCalculationData(rawReply);

      const assistantMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: cleanContent,
        calcData,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error('[Chatbot Error]:', err);
      const isTimeout = err?.name === 'AbortError';
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: isTimeout 
            ? 'The response took longer than expected due to network latency. Please try again or chat directly with our advisor on WhatsApp (+91 8763732389)!'
            : 'Sorry, there was a temporary connection error. Please try again or chat with our advisor directly on WhatsApp (+91 8763732389).',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: WELCOME_MESSAGES[language],
        timestamp: 'Just now',
      },
    ]);
  };

  // Helper to format basic markdown (bold text, lists, headers)
  const formatContent = (text: string) => {
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-bold text-sm text-primary-900 dark:text-gold-300 mt-2 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const itemContent = line.replace(/^[-*]\s+/, '');
        return (
          <li key={idx} className="ml-4 list-disc text-xs leading-relaxed my-0.5">
            <span dangerouslySetInnerHTML={{ __html: parseBold(itemContent) }} />
          </li>
        );
      }
      if (/^\d+\.\s+/.test(line)) {
        const itemContent = line.replace(/^\d+\.\s+/, '');
        return (
          <li key={idx} className="ml-4 list-decimal text-xs leading-relaxed my-0.5">
            <span dangerouslySetInnerHTML={{ __html: parseBold(itemContent) }} />
          </li>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      return (
        <p key={idx} className="text-xs leading-relaxed my-1">
          <span dangerouslySetInnerHTML={{ __html: parseBold(line) }} />
        </p>
      );
    });
  };

  const parseBold = (str: string) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="mb-2"
            >
              <button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-950 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-gold-500/30 flex items-center gap-1.5 hover:shadow-gold-500/20 hover:scale-105 transition-all group"
              >
                <Sparkles size={12} className="text-gold-400 group-hover:rotate-12 transition-transform" />
                <span>Ask AI Advisor</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-primary-900 via-primary-800 to-amber-600 text-white flex items-center justify-center shadow-xl shadow-primary-900/40 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-gold-400/50"
          aria-label={isOpen ? 'Close AI Chat' : 'Open AI Investor Education Chatbot'}
          whileHover={{ y: -2 }}
        >
          {isOpen ? (
            <ChevronDown size={28} className="text-white" />
          ) : (
            <>
              <Bot size={26} className="text-gold-300" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border border-white text-[9px] font-bold items-center justify-center text-white">
                    1
                  </span>
                </span>
              )}
            </>
          )}
        </motion.button>
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[85vh] h-[610px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-850 p-3.5 text-white border-b border-gold-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-gold-500 to-amber-400 p-0.5 flex items-center justify-center shadow-md">
                    <div className="w-full h-full bg-primary-950 rounded-full flex items-center justify-center">
                      <Bot size={18} className="text-gold-400" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-primary-950 rounded-full" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm tracking-wide text-white">TMFS Investor Mitra</h3>
                      <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-gold-500/20 text-gold-300 border border-gold-400/30">
                        AI
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-300">Investor Education & SIP Planning</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleReset}
                    title="Clear Conversation"
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <RotateCcw size={15} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close Chat"
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* Language Switcher Bar */}
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-gold-300 font-medium">
                  <Globe size={12} />
                  <span>Language:</span>
                </div>
                <div className="flex items-center gap-1 bg-black/20 p-0.5 rounded-lg">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLanguageChange(l.code)}
                      className={`px-2 py-0.5 text-[10px] rounded-md font-medium transition-all ${
                        language === l.code
                          ? 'bg-gold-500 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {l.nativeName}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sub-header Quick Link */}
            <div className="bg-primary-50 dark:bg-primary-950/40 px-3.5 py-1.5 text-[11px] text-primary-900 dark:text-slate-300 border-b border-primary-100 dark:border-primary-900/50 flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 truncate">
                <Sparkles size={11} className="text-gold-600 dark:text-gold-400 shrink-0" />
                Ask questions or calculate your SIP
              </span>
              <Link
                href="/calculators"
                onClick={() => setIsOpen(false)}
                className="text-primary-700 dark:text-gold-400 font-semibold hover:underline flex items-center gap-0.5 shrink-0"
              >
                Calculators <ExternalLink size={10} />
              </Link>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70 dark:bg-slate-900/50">
              {messages.map((m) => {
                const isUser = m.role === 'user';
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {!isUser && (
                      <div className="w-7 h-7 rounded-full bg-primary-900 text-gold-400 flex items-center justify-center shrink-0 mt-0.5 border border-gold-400/30">
                        <Bot size={14} />
                      </div>
                    )}
                    <div
                      className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs shadow-sm ${
                        isUser
                          ? 'bg-gradient-to-r from-primary-900 to-primary-850 text-white rounded-tr-none'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 rounded-tl-none'
                      }`}
                    >
                      {formatContent(m.content)}

                      {/* Interactive In-Chat SIP & Goal Calculator Card */}
                      {m.calcData && (
                        <div className="mt-3 p-3 rounded-xl bg-gradient-to-br from-slate-900 to-primary-950 text-white border border-gold-400/30 shadow-md">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5 text-gold-400 font-bold text-xs">
                              <Calculator size={14} />
                              <span>{m.calcData.goalTitle || 'SIP Projection'}</span>
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/20">
                              @{m.calcData.rate}% p.a.
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 my-2.5 text-[11px]">
                            <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                              <div className="text-slate-400 text-[10px]">Monthly SIP</div>
                              <div className="font-bold text-white text-xs mt-0.5">
                                ₹{m.calcData.monthly.toLocaleString('en-IN')}
                              </div>
                            </div>
                            <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                              <div className="text-slate-400 text-[10px]">Time Horizon</div>
                              <div className="font-bold text-white text-xs mt-0.5">
                                {m.calcData.years} Years
                              </div>
                            </div>
                            <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                              <div className="text-slate-400 text-[10px]">Total Invested</div>
                              <div className="font-bold text-amber-300 text-xs mt-0.5">
                                ₹{m.calcData.invested.toLocaleString('en-IN')}
                              </div>
                            </div>
                            <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                              <div className="text-slate-400 text-[10px]">Estimated Wealth Gain</div>
                              <div className="font-bold text-emerald-400 text-xs mt-0.5 flex items-center gap-0.5">
                                <TrendingUp size={11} />
                                ₹{m.calcData.returns.toLocaleString('en-IN')}
                              </div>
                            </div>
                          </div>

                          {/* Progress Breakdown Bar */}
                          <div className="my-2">
                            <div className="flex justify-between text-[9px] text-slate-300 mb-1">
                              <span>Invested ({Math.round((m.calcData.invested / m.calcData.total) * 100)}%)</span>
                              <span>Wealth Gained ({Math.round((m.calcData.returns / m.calcData.total) * 100)}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
                              <div 
                                className="h-full bg-amber-400" 
                                style={{ width: `${(m.calcData.invested / m.calcData.total) * 100}%` }} 
                              />
                              <div 
                                className="h-full bg-emerald-400" 
                                style={{ width: `${(m.calcData.returns / m.calcData.total) * 100}%` }} 
                              />
                            </div>
                          </div>

                          {/* Total Corpus */}
                          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                            <span className="text-[10px] text-slate-300">Expected Future Corpus:</span>
                            <span className="text-sm font-extrabold text-gold-300">
                              ₹{m.calcData.total.toLocaleString('en-IN')}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-2">
                            <Link
                              href="/calculators"
                              onClick={() => setIsOpen(false)}
                              className="flex-1 py-1 px-2 rounded-lg bg-white/10 hover:bg-white/20 text-center text-[10px] font-semibold text-white transition-colors"
                            >
                              Explore in Full Calculator
                            </Link>
                            <a
                              href={`${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent(
                                `Hello TMFS! I used the AI SIP Calculator and want to start a monthly SIP of ₹${m.calcData.monthly.toLocaleString('en-IN')} for ${m.calcData.years} years. Please guide me.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-1 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-center text-[10px] font-semibold text-white transition-colors"
                            >
                              Start this SIP
                            </a>
                          </div>
                        </div>
                      )}

                      <div
                        className={`text-[9px] mt-1.5 font-medium ${
                          isUser ? 'text-primary-200 text-right' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {m.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-slate-500 text-xs py-1">
                  <div className="w-7 h-7 rounded-full bg-primary-900 text-gold-400 flex items-center justify-center shrink-0 border border-gold-400/30">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] text-slate-500 ml-1 font-medium">Mitra is thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggested Topic Chips (Localized) */}
            <div className="px-3 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                <HelpCircle size={11} />
                <span>Suggested Questions:</span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {PRESET_QUESTIONS_BY_LANG[language].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    disabled={isLoading}
                    className="shrink-0 text-[10px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gold-50 dark:hover:bg-gold-950/40 hover:text-gold-700 dark:hover:text-gold-300 border border-slate-200 dark:border-slate-700 transition-colors whitespace-nowrap disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Consultation CTAs */}
            <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200/50 dark:border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 dark:text-slate-400 text-[10px]">Need personalized guidance?</span>
              <div className="flex items-center gap-2">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="font-semibold text-primary-700 dark:text-gold-400 hover:underline flex items-center gap-1 text-[10px]"
                >
                  <Calendar size={10} /> Book Call
                </Link>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <a
                  href={`${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent('Hello! I was using TMFS AI and would like personalized financial advice.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline text-[10px]"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Listening Indicator / Speech Error Banner */}
            {isListening && (
              <div className="px-3 py-1.5 bg-amber-500/10 border-t border-amber-500/30 text-amber-700 dark:text-amber-400 text-[11px] flex items-center justify-between animate-pulse">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  Listening in {LANGUAGES.find((l) => l.code === language)?.nativeName}... Speak your question!
                </span>
                <button 
                  onClick={toggleSpeechRecognition}
                  className="text-[10px] font-bold underline ml-2"
                >
                  Stop
                </button>
              </div>
            )}

            {speechError && (
              <div className="px-3 py-1 bg-red-500/10 border-t border-red-500/20 text-red-600 dark:text-red-400 text-[10px]">
                {speechError}
              </div>
            )}

            {/* Input Bar with Voice (Mic) Button */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isListening
                    ? 'Listening... speak now'
                    : language === 'hi'
                    ? 'SIP, NAV या कैलकुलेशन के बारे में पूछें...'
                    : language === 'or'
                    ? 'SIP, NAV କିମ୍ବା ହିସାବ ବିଷୟରେ ପଚାରନ୍ତୁ...'
                    : language === 'te'
                    ? 'SIP, NAV లేదా కాలిక్యులేషన్ గురించి అడగండి...'
                    : 'Ask about SIP, NAV, or "Calculate 5000 for 10 yrs"...'
                }
                disabled={isLoading}
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-gold-500 border border-transparent disabled:opacity-50"
              />

              {/* Voice Microphone Button */}
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                title={isListening ? 'Stop listening' : 'Speak your question (Voice Input)'}
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                  isListening
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/40 animate-bounce'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary-800 dark:hover:text-gold-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {isListening ? <MicOff size={15} /> : <Mic size={15} />}
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-8 h-8 rounded-xl bg-gradient-to-r from-primary-900 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-md hover:opacity-90 disabled:opacity-40 transition-all"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </form>

            {/* Footer Regulatory Disclaimer */}
            <div className="bg-slate-100 dark:bg-slate-950 px-3 py-0.5 text-[8.5px] text-center text-slate-500 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800">
              For investor education only. Mutual Fund investments are subject to market risks.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
