'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONTACT_INFO } from '@/lib/constants';

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent('Hello! I am interested in mutual fund investment. Please guide me.')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 hover:bg-green-600 hover:scale-110 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
    >
      <MessageCircle size={26} className="text-white" fill="white" />
      
      {/* Pulse Ring */}
      <span className="absolute w-full h-full rounded-full bg-green-500 animate-ping opacity-20" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with us
      </span>
    </motion.a>
  );
}
