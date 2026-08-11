'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RetroWindow } from '../RetroWindow';
import { sound } from '@/lib/sound';

interface CakeModalProps {
  onNext: () => void;
}

export const CakeModal: React.FC<CakeModalProps> = ({ onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCut, setIsCut] = useState<boolean>(false);
  const [cutProgress, setCutProgress] = useState<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const startPointRef = useRef<{ x: number; y: number } | null>(null);

  // Trigger Confetti Fireworks
  const triggerConfetti = useCallback(() => {
    sound.playPop();
    sound.playSuccess();
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#ff85a2', '#ffd1dc', '#fde047', '#e9d5ff', '#ffffff'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  // Draw Cake on Canvas
  const drawCake = useCallback((progress: number, cutLine?: { x1: number; y1: number; x2: number; y2: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2 + 20;

    ctx.clearRect(0, 0, width, height);

    // Draw Cake Shadow
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 50, 140, 40, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fill();

    // Draw Cake Bottom Layer
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 30, 130, 35, 0, 0, Math.PI);
    ctx.fillStyle = '#f472b6'; // Pink
    ctx.fill();

    ctx.beginPath();
    ctx.rect(centerX - 130, centerY - 20, 260, 50);
    ctx.fillStyle = '#f472b6';
    ctx.fill();

    // Cake Middle Frosting Line
    ctx.beginPath();
    ctx.rect(centerX - 130, centerY, 260, 8);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Cake Top Base
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - 20, 130, 35, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#fbcfe8';
    ctx.fill();
    ctx.strokeStyle = '#db2777';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Decorative Cream Drips
    ctx.fillStyle = '#ffffff';
    for (let i = -120; i <= 120; i += 30) {
      ctx.beginPath();
      ctx.arc(centerX + i, centerY - 15, 12, 0, Math.PI);
      ctx.fill();
    }

    // 19th Birthday Text on Cake
    ctx.font = 'bold 18px VT323, monospace';
    ctx.fillStyle = '#db2777';
    ctx.textAlign = 'center';
    ctx.fillText('🌸 RUXSHONA 19 🌸', centerX, centerY + 15);

    // Draw Candles on Top (19 Candles represented by glowing candles)
    const candlePositions = [-80, -40, 0, 40, 80];
    candlePositions.forEach((pos, idx) => {
      const cx = centerX + pos;
      const cy = centerY - 45;

      // Candle Body
      ctx.fillStyle = idx % 2 === 0 ? '#fde047' : '#c084fc';
      ctx.fillRect(cx - 3, cy - 25, 6, 25);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.strokeRect(cx - 3, cy - 25, 6, 25);

      // Flame (Extinguished if cut)
      if (progress < 100) {
        ctx.beginPath();
        ctx.ellipse(cx, cy - 30, 4, 8, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(cx, cy - 31, 2, 4, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      } else {
        // Smoke effect when blown out
        ctx.font = '12px sans-serif';
        ctx.fillText('💨', cx, cy - 32);
      }
    });

    // Draw Slice Cut opening if progress > 0
    if (progress > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 20);
      ctx.lineTo(centerX - 40, centerY + 40);
      ctx.lineTo(centerX + 40, centerY + 40);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();
      ctx.restore();
    }

    // Draw active user slice drag line
    if (cutLine) {
      ctx.beginPath();
      ctx.moveTo(cutLine.x1, cutLine.y1);
      ctx.lineTo(cutLine.x2, cutLine.y2);
      ctx.strokeStyle = '#db2777';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.setLineDash([8, 8]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, []);

  useEffect(() => {
    drawCake(cutProgress);
  }, [cutProgress, drawCake]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isCut) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    isDraggingRef.current = true;
    startPointRef.current = { x, y };
    sound.playSlice();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !startPointRef.current || isCut) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const startX = startPointRef.current.x;
    const startY = startPointRef.current.y;

    const dist = Math.hypot(currentX - startX, currentY - startY);
    const newProgress = Math.min(Math.round((dist / 160) * 100), 100);

    setCutProgress(newProgress);
    drawCake(newProgress, { x1: startX, y1: startY, x2: currentX, y2: currentY });

    if (newProgress >= 100) {
      isDraggingRef.current = false;
      setIsCut(true);
      triggerConfetti();
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    startPointRef.current = null;
    if (!isCut && cutProgress < 100) {
      setCutProgress(0);
      drawCake(0);
    }
  };

  return (
    <RetroWindow title="CAKE.EXE" stepNumber={3} totalSteps={6}>
      <div className="text-center space-y-4 max-w-xl mx-auto">
        {/* Title Instructions */}
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#4a154b]">
            Tortni kesish uchun barmog'ingizni suring! 🎂
          </h2>
          <p className="text-xs font-semibold text-[#8b3a62]">
            {isCut
              ? "Ajoyib! Shamlar o'chirildi va tort kesildi! 🎉"
              : "Tort ustidan sichqoncha yoki barmog'ingiz bilan chiziq torting ✨"}
          </p>
        </div>

        {/* Canvas Cake Container */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="retro-box-inset bg-gradient-to-b from-[#fff0f5] to-[#ffeef4] rounded-xl p-3 border-2 border-white shadow-md relative overflow-hidden select-none">
            <canvas
              ref={canvasRef}
              width={340}
              height={220}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="touch-none cursor-crosshair max-w-full h-auto"
            />

            {!isCut && (
              <div className="absolute top-3 right-3 bg-white/80 px-2 py-1 rounded text-[11px] font-mono font-bold text-pink-600 border border-pink-200 animate-pulse pointer-events-none">
                ✂️ Suring! {cutProgress}%
              </div>
            )}
          </div>
        </div>

        {/* Animated Celebration Banner */}
        {isCut && (
          <div className="py-2 animate-bounce space-y-1">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-extrabold px-5 py-2 rounded-full shadow-lg text-sm sm:text-base border-2 border-white">
              <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
              <span>Tug'ilgan kuning bilan, Ruxshona! ❤️</span>
              <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
            </div>
          </div>
        )}

        {/* Next Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              sound.playClick();
              if (!isCut) {
                setIsCut(true);
                setCutProgress(100);
                triggerConfetti();
              }
              onNext();
            }}
            className="retro-button px-6 py-2.5 font-mono font-bold text-xs sm:text-sm text-[#db2777] hover:text-pink-700 flex items-center space-x-2 mx-auto"
          >
            <span>KEYINGISI</span>
            <ArrowRight className="w-4 h-4 text-pink-600" />
          </button>
        </div>
      </div>
    </RetroWindow>
  );
};
