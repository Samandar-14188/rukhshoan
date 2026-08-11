'use client';

import React from 'react';
import { Minus, Square, X, Heart } from 'lucide-react';
import { sound } from '@/lib/sound';

interface RetroWindowProps {
  title: string;
  stepNumber?: number;
  totalSteps?: number;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const RetroWindow: React.FC<RetroWindowProps> = ({
  title,
  stepNumber = 1,
  totalSteps = 6,
  children,
  onClose,
  className = '',
}) => {
  return (
    <div className={`retro-box-outset bg-[#fff5f8] rounded-t-sm shadow-2xl overflow-hidden max-w-2xl w-full mx-auto my-auto ${className}`}>
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-[#ff758c] via-[#ff7eb3] to-[#ffb199] text-white px-3 py-1.5 flex items-center justify-between font-mono text-sm font-bold shadow-sm border-b-2 border-[#e8aeb7] select-none">
        <div className="flex items-center space-x-2">
          <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
          <span className="tracking-wide uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            {title}
          </span>
        </div>
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => sound.playClick()}
            className="w-5 h-5 bg-[#ffe4ed] text-[#db2777] border border-white hover:bg-white flex items-center justify-center text-xs font-bold shadow-xs active:translate-y-0.5"
            title="Minimize"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            onClick={() => sound.playClick()}
            className="w-5 h-5 bg-[#ffe4ed] text-[#db2777] border border-white hover:bg-white flex items-center justify-center text-xs font-bold shadow-xs active:translate-y-0.5"
            title="Maximize"
          >
            <Square className="w-2.5 h-2.5" />
          </button>
          <button
            onClick={() => {
              sound.playClick();
              if (onClose) onClose();
            }}
            className="w-5 h-5 bg-[#ff4d6d] text-white border border-white hover:bg-[#c9184a] flex items-center justify-center text-xs font-bold shadow-xs active:translate-y-0.5"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Window Content */}
      <div className="p-4 md:p-6 text-[#4a154b] relative bg-gradient-to-b from-[#fff5f8] to-[#ffeef4]">
        {children}
      </div>

      {/* Retro Status Bar */}
      <div className="bg-[#ffe4ed] border-t-2 border-[#ffd1dc] px-3 py-1 text-xs font-mono flex items-center justify-between text-[#8b3a62]">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold uppercase">HOLAT: FAOL</span>
        </div>
        <div className="font-bold">
          QADAM: {stepNumber} / {totalSteps}
        </div>
        <div className="hidden sm:block text-[11px] opacity-80">
          🌸 RUXSHONA 19 YOSH
        </div>
      </div>
    </div>
  );
};
