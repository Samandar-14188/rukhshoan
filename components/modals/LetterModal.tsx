'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Heart, Sparkles, RotateCcw, FileText } from 'lucide-react';
import { RetroWindow } from '../RetroWindow';
import { sound } from '@/lib/sound';

interface LetterModalProps {
  onRestart: () => void;
}

export const LetterModal: React.FC<LetterModalProps> = ({ onRestart }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    sound.playUnseal();
    sound.playSuccess();
    setIsOpen(true);

    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ff85a2', '#ffd1dc', '#fde047', '#e9d5ff', '#ffffff'],
    });
  };

  return (
    <RetroWindow title="LETTER.EXE" stepNumber={6} totalSteps={6}>
      <div className="text-center space-y-4 max-w-xl mx-auto py-1">
        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#4a154b] flex items-center justify-center space-x-2">
            <Mail className="w-5 h-5 text-pink-500" />
            <span>Siz Uchun Maxsus Xat 💖</span>
          </h2>
          <p className="text-xs font-semibold text-[#8b3a62]">
            {!isOpen
              ? "Konvert ustidagi sham muhrini bosib xatni oching!"
              : "Ruxshona uchun yurakdan yozilgan samimiy tabrik xati ✨"}
          </p>
        </div>

        {!isOpen ? (
          /* Closed Wax Seal Envelope View */
          <div className="py-6 flex flex-col items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenEnvelope}
              className="relative w-72 sm:w-80 h-48 bg-gradient-to-b from-[#ffd1dc] to-[#ffb6c1] border-4 border-white rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer select-none overflow-hidden group"
            >
              {/* Envelope Flap Triangles */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#ff85a2] to-[#ff9ebb] border-b-2 border-white rounded-b-[100px] shadow-sm transform transition duration-500 origin-top group-hover:scale-y-95" />

              {/* Gold Heart Wax Seal Stamp */}
              <div className="relative z-20 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-2 border-white shadow-xl flex flex-col items-center justify-center text-white animate-pulse">
                <Heart className="w-8 h-8 fill-white text-white drop-shadow" />
              </div>

              {/* Interactive Label Badge */}
              <div className="absolute bottom-3 z-20 bg-white/90 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-[#db2777] shadow-xs border border-pink-200">
                OCHISH UCHUN BOSING ✨
              </div>
            </motion.div>
          </div>
        ) : (
          /* Opened Scrollable Retro Notepad Window ("MESSAGE.TXT") */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Notepad Window Frame */}
              <div className="retro-box-inset bg-white rounded-xl border-2 border-pink-300 shadow-inner overflow-hidden text-left">
                {/* Notepad Titlebar */}
                <div className="bg-[#ffe4ed] border-b border-pink-200 px-3 py-1.5 font-mono text-xs font-bold text-[#8b3a62] flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <FileText className="w-4 h-4 text-pink-500" />
                    <span>MESSAGE.TXT - Ruxshona 19th Birthday</span>
                  </div>
                  <span className="text-[10px] text-pink-400">FAYL: MAXSUS</span>
                </div>

                {/* Notepad Body Text */}
                <div className="p-4 sm:p-6 font-sans text-xs sm:text-sm leading-relaxed text-[#4a154b] max-h-72 overflow-y-auto space-y-3 bg-[#fffafc]">
                  <p className="font-bold text-sm sm:text-base text-[#db2777]">
                    Qadrli va suyukli Ruxshona! 🌸✨
                  </p>

                  <p>
                    Bugun sizning hayotingizdagi eng yorqin va sehrli kunlardan biri — <strong>19 yoshga</strong> to'lgan kuningiz! 🎂
                  </p>

                  <p>
                    Siz mening hayotimdagi eng qadrli, eng samimiy va chiroyli insonimsiz. Sizning shirin kulgularingiz, mehribon qalbingiz va har bir so'zingiz atrofga doimo iliqlik va quvonch ulashadi.
                  </p>

                  <p>
                    Ushbu yangi yoshingizda sizga cheksiz baxt, mustahkam salomatlik, o'qish va ishlaringizda ulkan zafarlar tilayman. Niyat qilgan barcha orzuleringiz va maqsadlaringiz ro'yobga chiqsin!
                  </p>

                  <p>
                    Har bir kuningiz quvonchli lahzalarga, unutilmas xotiralarga va samimiy tabassumlarga boy bo'lsin. Har doim shunday go'zal, samimiy va betakror bo'lib qoling!
                  </p>

                  <div className="pt-3 border-t border-pink-100 flex flex-col items-end">
                    <p className="font-bold text-xs text-[#db2777]">
                      Cheksiz mehr va hurmat bilan, ❤️
                    </p>
                    <p className="font-mono text-[11px] text-pink-400">
                      Sizni juda ham yaxshi ko'ruvchi insoningiz ✨
                    </p>
                  </div>
                </div>
              </div>

              {/* Replay/Restart Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    onRestart();
                  }}
                  className="retro-button px-6 py-2.5 font-mono font-bold text-xs sm:text-sm text-[#db2777] hover:text-pink-700 flex items-center space-x-2 mx-auto"
                >
                  <RotateCcw className="w-4 h-4 text-pink-600" />
                  <span>BOSHIDAN KO'RISH 🔄</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </RetroWindow>
  );
};
