'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Mail, Sparkles, Heart, Star, Cloud, Moon, Sun } from 'lucide-react';
import { RetroWindow } from '../RetroWindow';
import { sound } from '@/lib/sound';

interface GalleryModalProps {
  onNext: () => void;
}

const POLAROID_DATA = [
  {
    id: 1,
    title: 'Eng shirin kulgu ✨',
    color: 'from-pink-200 to-rose-200',
    icon: Heart,
    rotate: -6,
    xOffset: 0,
    yOffset: 0,
  },
  {
    id: 2,
    title: 'Unutilmas lahzalar 🌸',
    color: 'from-purple-200 to-pink-200',
    icon: Sparkles,
    rotate: 4,
    xOffset: 20,
    yOffset: 10,
  },
  {
    id: 3,
    title: "Sehrli daqiqalar 💖",
    color: 'from-amber-100 to-pink-200',
    icon: Star,
    rotate: -3,
    xOffset: -15,
    yOffset: 5,
  },
  {
    id: 4,
    title: 'Har doim kulib yur! 😊',
    color: 'from-rose-200 to-purple-200',
    icon: Sun,
    rotate: 5,
    xOffset: 10,
    yOffset: -10,
  },
];

export const GalleryModal: React.FC<GalleryModalProps> = ({ onNext }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <RetroWindow title="GALLERY.EXE" stepNumber={5} totalSteps={6}>
      <div className="text-center space-y-4 max-w-2xl mx-auto py-1">
        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#4a154b] flex items-center justify-center space-x-2">
            <Camera className="w-5 h-5 text-pink-500" />
            <span>Bizning Chiroyli Xotiralarimiz 📸</span>
          </h2>
          <p className="text-xs font-semibold text-[#8b3a62]">
            Fotosuratlarni barmog'ingiz bilan surib ko'rishingiz mumkin! 👆
          </p>
        </div>

        {/* Draggable Polaroids Canvas Area */}
        <div
          ref={containerRef}
          className="retro-box-inset bg-gradient-to-b from-[#fff0f5] via-[#ffe4ed] to-[#fff5f8] rounded-xl p-4 sm:p-6 min-h-[300px] border-2 border-white shadow-inner relative flex items-center justify-center overflow-hidden"
        >
          {/* Decorative Sparkles */}
          <Sparkles className="absolute top-3 left-4 text-pink-300 w-5 h-5 pointer-events-none" />
          <Heart className="absolute bottom-3 right-4 text-purple-300 w-5 h-5 pointer-events-none" />

          {/* Draggable Polaroid Cards */}
          <div className="relative w-full max-w-md h-64 flex items-center justify-center">
            {POLAROID_DATA.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={card.id}
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.2}
                  whileDrag={{ scale: 1.08, zIndex: 50 }}
                  onClick={() => sound.playClick()}
                  initial={{ opacity: 0, scale: 0.8, rotate: card.rotate }}
                  animate={{ opacity: 1, scale: 1, rotate: card.rotate }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="absolute cursor-grab active:cursor-grabbing select-none"
                  style={{
                    top: `${10 + idx * 8}%`,
                    left: `${15 + idx * 10}%`,
                    zIndex: 10 + idx,
                  }}
                >
                  {/* Polaroid Frame */}
                  <div className="w-48 sm:w-56 bg-white p-3 pt-4 rounded shadow-xl border border-pink-200 transform transition hover:shadow-2xl">
                    {/* Washi Tape Sticker on Top */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-5 bg-pink-200/80 border border-white rotate-[-2deg] shadow-xs backdrop-blur-xs" />

                    {/* Photo Illustration Area */}
                    <div className={`w-full h-32 sm:h-36 bg-gradient-to-tr ${card.color} rounded border border-pink-100 flex flex-col items-center justify-center p-2 relative overflow-hidden`}>
                      <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center shadow-xs border border-white">
                        <IconComp className="w-7 h-7 text-pink-600" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#8b3a62] mt-2 bg-white/80 px-2 py-0.5 rounded-full border border-pink-200">
                        Ruxshona & Xotiralar 💖
                      </span>
                    </div>

                    {/* Uzbek Caption */}
                    <div className="pt-2 text-center">
                      <p className="font-mono text-xs font-bold text-[#6b2148]">
                        {card.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              sound.playClick();
              onNext();
            }}
            className="retro-button px-6 py-2.5 font-mono font-bold text-xs sm:text-sm text-[#db2777] hover:text-pink-700 flex items-center space-x-2 mx-auto"
          >
            <span>XATNI O'QISH</span>
            <Mail className="w-4 h-4 text-pink-600" />
          </button>
        </div>
      </div>
    </RetroWindow>
  );
};
