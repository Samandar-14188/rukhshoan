'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Gift, Mail, Image as ImageIcon, Music } from 'lucide-react';
import { sound } from '@/lib/sound';

interface RetroDesktopProps {
  children: React.ReactNode;
  currentStep: number;
  onSetStep: (step: number) => void;
}

export const RetroDesktop: React.FC<RetroDesktopProps> = ({
  children,
  currentStep,
  onSetStep,
}) => {
  const [timeString, setTimeString] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showStartMenu, setShowStartMenu] = useState<boolean>(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMute = () => {
    sound.muted = !isMuted;
    setIsMuted(!isMuted);
    sound.playClick();
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#ffd6e8] via-[#fbcfe8] to-[#e9d5ff] font-sans">
      {/* Background Pixel Sparkles & Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#db2777_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Floating Animated Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Sparkles className="absolute top-12 left-10 text-pink-400 w-8 h-8 animate-float-sparkle" />
        <Heart className="absolute top-20 right-16 text-pink-300 w-6 h-6 animate-pulse" />
        <Sparkles className="absolute bottom-28 left-20 text-purple-400 w-7 h-7 animate-float-sparkle delay-75" />
        <Heart className="absolute bottom-36 right-28 text-pink-400 w-8 h-8 animate-pulse delay-100" />
      </div>

      {/* Desktop Top Bar / Header */}
      <header className="relative z-10 bg-white/40 backdrop-blur-md border-b border-white/60 px-4 py-2 flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-2 font-mono text-sm font-bold text-[#8b3a62]">
          <span className="bg-[#ff85a2] text-white px-2 py-0.5 rounded-full text-xs animate-bounce">
            19 YOSH
          </span>
          <span className="tracking-wide hidden sm:inline">RUXSHONA BIRTHDAY OS v19.0</span>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono text-[#8b3a62]">
          <button
            onClick={toggleMute}
            className="flex items-center space-x-1 bg-white/70 hover:bg-white px-2.5 py-1 rounded border border-pink-200 shadow-xs transition active:scale-95"
            title="Ovozni yoqish/o'chirish"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-red-400" />
                <span className="hidden sm:inline">Ovoz: O'chirilgan</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Ovoz: Yoqilgan</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Desktop Icons (Left side on desktop view) */}
      <div className="absolute top-16 left-4 z-10 flex flex-col space-y-4 pointer-events-auto">
        <button
          onClick={() => {
            sound.playClick();
            onSetStep(1);
          }}
          className="flex flex-col items-center p-2 rounded hover:bg-white/40 group transition w-20 text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-tr from-pink-400 to-pink-200 rounded-lg p-2.5 shadow-md group-hover:scale-110 transition flex items-center justify-center border-2 border-white">
            <Heart className="w-7 h-7 text-white fill-white" />
          </div>
          <span className="text-[11px] font-mono font-bold text-[#6b2148] mt-1 drop-shadow-xs bg-white/70 px-1 rounded">
            SEAL.EXE
          </span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSetStep(3);
          }}
          className="flex flex-col items-center p-2 rounded hover:bg-white/40 group transition w-20 text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-tr from-yellow-300 to-amber-400 rounded-lg p-2.5 shadow-md group-hover:scale-110 transition flex items-center justify-center border-2 border-white">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <span className="text-[11px] font-mono font-bold text-[#6b2148] mt-1 drop-shadow-xs bg-white/70 px-1 rounded">
            CAKE.EXE
          </span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSetStep(4);
          }}
          className="flex flex-col items-center p-2 rounded hover:bg-white/40 group transition w-20 text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-tr from-purple-400 to-pink-300 rounded-lg p-2.5 shadow-md group-hover:scale-110 transition flex items-center justify-center border-2 border-white">
            <Gift className="w-7 h-7 text-white" />
          </div>
          <span className="text-[11px] font-mono font-bold text-[#6b2148] mt-1 drop-shadow-xs bg-white/70 px-1 rounded">
            PRIZE.EXE
          </span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSetStep(5);
          }}
          className="flex flex-col items-center p-2 rounded hover:bg-white/40 group transition w-20 text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-tr from-rose-300 to-pink-400 rounded-lg p-2.5 shadow-md group-hover:scale-110 transition flex items-center justify-center border-2 border-white">
            <ImageIcon className="w-7 h-7 text-white" />
          </div>
          <span className="text-[11px] font-mono font-bold text-[#6b2148] mt-1 drop-shadow-xs bg-white/70 px-1 rounded">
            GALLERY.EXE
          </span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onSetStep(6);
          }}
          className="flex flex-col items-center p-2 rounded hover:bg-white/40 group transition w-20 text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-tr from-fuchsia-400 to-pink-500 rounded-lg p-2.5 shadow-md group-hover:scale-110 transition flex items-center justify-center border-2 border-white">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <span className="text-[11px] font-mono font-bold text-[#6b2148] mt-1 drop-shadow-xs bg-white/70 px-1 rounded">
            LETTER.EXE
          </span>
        </button>
      </div>

      {/* Main Center Modal Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      {/* Y2K Windows Taskbar at the bottom */}
      <footer className="relative z-20 bg-[#ffe4ed] border-t-2 border-white px-2 py-1.5 flex items-center justify-between font-mono text-xs shadow-lg select-none">
        <div className="flex items-center space-x-2">
          {/* Start Menu Button */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playClick();
                setShowStartMenu(!showStartMenu);
              }}
              className="retro-button px-3 py-1 flex items-center space-x-1.5 font-bold text-[#db2777]"
            >
              <span className="text-sm">🌸</span>
              <span>START</span>
            </button>

            {/* Start Menu Dropdown */}
            {showStartMenu && (
              <div className="absolute bottom-10 left-0 w-56 retro-box-outset bg-[#fff5f8] p-2 shadow-2xl space-y-1 z-50">
                <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold px-3 py-1.5 rounded-t text-sm flex items-center justify-between">
                  <span>Ruxshona Birthday</span>
                  <Heart className="w-4 h-4 fill-white" />
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    onSetStep(1);
                    setShowStartMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-pink-100 rounded flex items-center space-x-2 text-[#4a154b]"
                >
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span>1. SEAL.EXE</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onSetStep(2);
                    setShowStartMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-pink-100 rounded flex items-center space-x-2 text-[#4a154b]"
                >
                  <Music className="w-4 h-4 text-purple-500" />
                  <span>2. PARTY.EXE</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onSetStep(3);
                    setShowStartMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-pink-100 rounded flex items-center space-x-2 text-[#4a154b]"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>3. CAKE.EXE</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onSetStep(4);
                    setShowStartMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-pink-100 rounded flex items-center space-x-2 text-[#4a154b]"
                >
                  <Gift className="w-4 h-4 text-pink-600" />
                  <span>4. PRIZE.EXE</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onSetStep(5);
                    setShowStartMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-pink-100 rounded flex items-center space-x-2 text-[#4a154b]"
                >
                  <ImageIcon className="w-4 h-4 text-rose-500" />
                  <span>5. GALLERY.EXE</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onSetStep(6);
                    setShowStartMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-pink-100 rounded flex items-center space-x-2 text-[#4a154b]"
                >
                  <Mail className="w-4 h-4 text-fuchsia-600" />
                  <span>6. LETTER.EXE</span>
                </button>
              </div>
            )}
          </div>

          {/* Active Window Button on Taskbar */}
          <div className="retro-box-inset px-3 py-1 text-xs font-bold text-[#8b3a62] bg-white hidden sm:flex items-center space-x-1.5">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>
              {currentStep === 1 && 'SEAL.EXE'}
              {currentStep === 2 && 'PARTY.EXE'}
              {currentStep === 3 && 'CAKE.EXE'}
              {currentStep === 4 && 'PRIZE.EXE'}
              {currentStep === 5 && 'GALLERY.EXE'}
              {currentStep === 6 && 'MESSAGE.TXT'}
            </span>
          </div>
        </div>

        {/* System Tray (Clock & Status) */}
        <div className="retro-box-inset px-3 py-1 flex items-center space-x-3 text-xs text-[#8b3a62]">
          <span>🌸 19 YOSH</span>
          <span className="font-bold">{timeString || '12:00'}</span>
        </div>
      </footer>
    </div>
  );
};
