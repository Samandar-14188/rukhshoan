'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { RetroWindow } from '../RetroWindow';
import { sound } from '@/lib/sound';

interface PartyModalProps {
  onNext: () => void;
}

export const PartyModal: React.FC<PartyModalProps> = ({ onNext }) => {
  return (
    <RetroWindow title="PARTY.EXE" stepNumber={2} totalSteps={6}>
      <div className="text-center space-y-6 max-w-xl mx-auto py-2">
        {/* Header Title */}
        <div className="space-y-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-300 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#8b3a62] shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
            <span>BUGUN MAXSUS KUN! 🎂</span>
          </motion.div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-[#4a154b] leading-relaxed">
            Mening eng qadrli insonim <span className="text-[#db2777]">Ruxshona</span> bugun 19 yoshga to'ldi! 🌸
          </h1>
          <p className="text-xs sm:text-sm text-[#8b3a62] max-w-md mx-auto leading-relaxed">
            Ha, bu SIZ! Siz uchun kichik bayramona syurpriz tayyorladik... ✨
          </p>
        </div>

        {/* Animated Pixel Art Cat Holding a Cake with 19 Candles */}
        <div className="relative py-4 flex justify-center items-center">
          <div className="retro-box-inset p-6 bg-gradient-to-b from-[#fff0f5] to-[#ffe4ed] rounded-xl shadow-md border-2 border-white flex flex-col items-center justify-center relative overflow-hidden w-full max-w-sm">
            
            {/* Cute Pixel Cat Graphic */}
            <div className="relative w-44 h-44 flex flex-col items-center justify-end">
              {/* Floating Sparkles & Hearts around cat */}
              <Sparkles className="absolute -top-1 left-2 text-amber-400 w-5 h-5 animate-pulse" />
              <Heart className="absolute top-2 right-4 text-pink-500 w-5 h-5 animate-bounce" />
              <Sparkles className="absolute bottom-12 right-0 text-pink-400 w-4 h-4 animate-ping" />

              {/* Cat Ears */}
              <div className="flex justify-between w-28 -mb-3 z-0">
                <div className="w-6 h-6 bg-[#fbcfe8] border-2 border-[#db2777] rotate-45 rounded-tl-md" />
                <div className="w-6 h-6 bg-[#fbcfe8] border-2 border-[#db2777] rotate-45 rounded-tr-md" />
              </div>

              {/* Cat Head */}
              <div className="w-32 h-24 bg-white border-4 border-[#db2777] rounded-3xl relative z-10 flex flex-col items-center justify-center shadow-sm">
                {/* Cat Eyes */}
                <div className="flex space-x-8 mt-1">
                  <div className="w-3 h-3 bg-[#4a154b] rounded-full relative">
                    <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 right-0.5" />
                  </div>
                  <div className="w-3 h-3 bg-[#4a154b] rounded-full relative">
                    <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 right-0.5" />
                  </div>
                </div>

                {/* Pink Cheeks */}
                <div className="flex space-x-12 -mt-1">
                  <div className="w-3 h-1.5 bg-pink-300 rounded-full" />
                  <div className="w-3 h-1.5 bg-pink-300 rounded-full" />
                </div>

                {/* Cat Nose & Mouth */}
                <div className="w-2 h-1.5 bg-pink-400 rounded-full -mt-0.5" />
                <div className="text-[10px] text-[#db2777] font-bold -mt-1">w</div>
              </div>

              {/* Party Hat */}
              <div className="absolute -top-4 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-[#fde047] drop-shadow-md z-20 flex justify-center">
                <div className="w-2 h-2 bg-pink-500 rounded-full -top-6 absolute" />
              </div>

              {/* Cake held by cat */}
              <div className="relative -mt-6 z-20 flex flex-col items-center">
                {/* 19 Candle Flames */}
                <div className="flex space-x-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
                      className="w-1.5 h-3 bg-gradient-to-t from-amber-400 to-amber-200 rounded-full shadow-[0_0_6px_rgba(251,191,36,1)]"
                    />
                  ))}
                </div>

                {/* Cake Base */}
                <div className="w-36 h-12 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 border-2 border-[#db2777] rounded-xl flex items-center justify-center shadow-md relative">
                  <span className="text-[11px] font-mono font-extrabold text-[#8b3a62] bg-white/80 px-2 py-0.5 rounded-full border border-pink-300">
                    🌸 19 YOSH 🌸
                  </span>
                </div>
              </div>
            </div>

            {/* Cute Description Badge */}
            <div className="mt-3 text-xs font-mono font-semibold text-[#8b3a62]">
              "Siz eng shirin bayramga loyiqsiz! ✨"
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              sound.playClick();
              sound.playSuccess();
              onNext();
            }}
            className="retro-button px-6 py-3 font-mono font-bold text-sm text-[#db2777] hover:text-pink-700 tracking-wider flex items-center space-x-2 mx-auto"
          >
            <span>SYURPRIZNI BOSHLASH</span>
            <Sparkles className="w-4 h-4 text-pink-500" />
          </button>
        </div>
      </div>
    </RetroWindow>
  );
};
