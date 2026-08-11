'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Loader2 } from 'lucide-react';
import { RetroWindow } from '../RetroWindow';
import { sound } from '@/lib/sound';

interface SealModalProps {
  onNext: () => void;
}

export const SealModal: React.FC<SealModalProps> = ({ onNext }) => {
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [holdProgress, setHoldProgress] = useState<number>(0); // 0 to 100
  const [countdown, setCountdown] = useState<number>(3); // 3, 2, 1
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadPercent, setLoadPercent] = useState<number>(0);

  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartHold = () => {
    if (isLoading) return;
    setIsHolding(true);
    sound.startBgMusic();
    sound.playClick();
  };

  const handleEndHold = () => {
    if (isLoading) return;
    setIsHolding(false);
    setHoldProgress(0);
    setCountdown(3);
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
  };

  useEffect(() => {
    if (isHolding && !isLoading) {
      const startTime = Date.now();
      const duration = 3000; // 3 seconds

      holdIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        setHoldProgress(progress);

        // Update countdown number
        const remainingSeconds = Math.max(Math.ceil((duration - elapsed) / 1000), 1);
        setCountdown(remainingSeconds);

        if (elapsed % 300 < 50) {
          sound.playTick(600 + progress * 5);
        }

        if (progress >= 100) {
          if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
          setIsHolding(false);
          setIsLoading(true);
          sound.playSuccess();
        }
      }, 30);
    } else {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    }

    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, [isHolding, isLoading]);

  // Loading animation effect
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadPercent((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onNext();
            }, 600);
            return 100;
          }
          return prev + 5;
        });
      }, 60);

      return () => clearInterval(interval);
    }
  }, [isLoading, onNext]);

  return (
    <RetroWindow title="SEAL.EXE" stepNumber={1} totalSteps={6}>
      {/* Pink Curtain Backdrop */}
      <div className="relative rounded-lg p-6 sm:p-8 bg-gradient-to-b from-[#ffb6c1] via-[#ffa6c9] to-[#ff9ebb] border-2 border-white shadow-inner text-center overflow-hidden">
        {/* Decorative Pink Curtain Folds */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#e75480]/30 to-transparent pointer-events-none" />

        {/* Floating sparkles */}
        <Sparkles className="absolute top-3 left-4 text-white/80 w-6 h-6 animate-pulse" />
        <Sparkles className="absolute bottom-4 right-5 text-white/80 w-6 h-6 animate-pulse delay-100" />

        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-[0_2px_4px_rgba(139,58,98,0.6)]">
              Ruxshona uchun Maxsus Kirish 🌸
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#6b2148] bg-white/70 px-3 py-1.5 rounded-full inline-block border border-white">
              OCHILMAGUNCHA TUGMANI O'TIB YUBORMA!
            </p>
          </div>

          {!isLoading ? (
            <div className="py-6 flex flex-col items-center justify-center">
              {/* Interactive Hold Button Container */}
              <div className="relative flex items-center justify-center">
                {/* SVG Progress Ring */}
                <svg className="w-44 h-44 transform -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r="80"
                    stroke="rgba(255, 255, 255, 0.4)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="88"
                    cy="88"
                    r="80"
                    stroke="#db2777"
                    strokeWidth="8"
                    strokeDasharray={502}
                    strokeDashoffset={502 - (502 * holdProgress) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-75"
                  />
                </svg>

                {/* Central Heart Button */}
                <button
                  onMouseDown={handleStartHold}
                  onMouseUp={handleEndHold}
                  onMouseLeave={handleEndHold}
                  onTouchStart={handleStartHold}
                  onTouchEnd={handleEndHold}
                  className={`absolute w-32 h-32 rounded-full bg-gradient-to-tr from-[#ff4d6d] via-[#ff758c] to-[#ff85a2] text-white flex flex-col items-center justify-center shadow-2xl transition transform active:scale-95 border-4 border-white select-none cursor-pointer ${
                    isHolding ? 'scale-105 shadow-pink-400/50' : 'animate-heart-pulse'
                  }`}
                >
                  <Heart className="w-10 h-10 fill-white drop-shadow" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider mt-1">
                    {isHolding ? `${countdown}...` : 'BOSIB TUR'}
                  </span>
                </button>
              </div>

              {/* Status Hint */}
              <p className="mt-4 text-xs font-mono text-[#8b3a62] font-bold h-6">
                {isHolding
                  ? `Ushlab turing... ${Math.round(holdProgress)}%`
                  : "Tugmani bossangiz va ushlab tursangiz, syurpriz ochiladi! ✨"}
              </p>
            </div>
          ) : (
            /* Loading State Animation */
            <div className="py-8 flex flex-col items-center justify-center space-y-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center space-x-2 text-[#db2777] font-bold text-lg"
              >
                <Loader2 className="w-6 h-6 animate-spin text-pink-600" />
                <span>Syurpriz yuklanmoqda...</span>
              </motion.div>

              {/* Y2K Progress Bar */}
              <div className="w-full bg-white/80 rounded-full h-5 p-1 border-2 border-[#db2777] shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full transition-all duration-100 flex items-center justify-end pr-1 text-[10px] text-white font-mono font-bold"
                  style={{ width: `${loadPercent}%` }}
                >
                  {loadPercent > 15 ? `${loadPercent}%` : ''}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </RetroWindow>
  );
};
