'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Heart, RotateCcw, FileText, FastForward } from 'lucide-react';
import { RetroWindow } from '../RetroWindow';
import { sound } from '@/lib/sound';

interface LetterModalProps {
  onRestart: () => void;
}

const LETTER_TEXT = `Qadrli va yagona Ruxshona... 🌸✨

Bugun sening hayotingdagi eng go'zal va sehrli kunlardan biri — 19 yoshga to'lgan kuning! 🎂

Siz mening hayotimga kirib kelganingizdan beri har bir kunim quvonch va mazmunga to'ldi. Shirin tabassumingiz, mehribon va begubor qalbingiz atrofga doimo iliqlik ulashadi.

Ushbu yangi yoshingizda sizga dunyodagi eng cheksiz baxt, mustahkam salomatlik va barcha ezgu orzularingiz ushalishini tilayman. Har doim shunday quvnoq, samimiy va jozibali bo'lib qoling!

Tug'ilgan kuning muborak bo'lsin, mening eng qadrli insonim! ❤️✨`;

export const LetterModal: React.FC<LetterModalProps> = ({ onRestart }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [typedIndex, setTypedIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

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

  // Typewriter text effect
  useEffect(() => {
    if (!isOpen) return;

    if (typedIndex < LETTER_TEXT.length) {
      const timer = setTimeout(() => {
        setTypedIndex((prev) => prev + 1);

        // Sound effect on typing
        if (typedIndex % 4 === 0) {
          sound.playTick(900);
        }
      }, 35);

      return () => clearTimeout(timer);
    }
  }, [isOpen, typedIndex]);

  // Smooth auto-scroll to bottom as text types
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [typedIndex]);

  const handleSkipTypewriter = () => {
    sound.playClick();
    setTypedIndex(LETTER_TEXT.length);
  };

  const isTypingComplete = typedIndex >= LETTER_TEXT.length;

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
                  <div className="flex items-center space-x-2">
                    {!isTypingComplete && (
                      <button
                        onClick={handleSkipTypewriter}
                        className="text-[10px] bg-pink-200 hover:bg-pink-300 text-pink-800 px-2 py-0.5 rounded font-mono font-bold flex items-center space-x-1"
                        title="Tezlashtirish"
                      >
                        <FastForward className="w-3 h-3" />
                        <span>TEZLASHTIRISH</span>
                      </button>
                    )}
                    <span className="text-[10px] text-pink-400">FAYL: MAXSUS</span>
                  </div>
                </div>

                {/* Notepad Body Text with Typewriter Animation */}
                <div
                  ref={scrollRef}
                  className="p-4 sm:p-6 font-sans text-xs sm:text-sm leading-relaxed text-[#4a154b] h-64 sm:h-72 overflow-y-auto whitespace-pre-wrap bg-[#fffafc] font-medium border-t border-pink-100"
                >
                  {LETTER_TEXT.slice(0, typedIndex)}
                  <span className="inline-block w-2 h-4 bg-pink-500 ml-0.5 animate-pulse align-middle" />
                </div>
              </div>

              {/* Replay/Restart Button */}
              <div className="pt-2 flex justify-center space-x-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    onRestart();
                  }}
                  className="retro-button px-6 py-2.5 font-mono font-bold text-xs sm:text-sm text-[#db2777] hover:text-pink-700 flex items-center space-x-2"
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
