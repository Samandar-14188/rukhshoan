'use client';

import React, { useState } from 'react';
import { RetroDesktop } from '@/components/RetroDesktop';
import { SealModal } from '@/components/modals/SealModal';
import { PartyModal } from '@/components/modals/PartyModal';
import { CakeModal } from '@/components/modals/CakeModal';
import { PrizeModal } from '@/components/modals/PrizeModal';
import { GalleryModal } from '@/components/modals/GalleryModal';
import { LetterModal } from '@/components/modals/LetterModal';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const handleRestart = () => {
    setCurrentStep(1);
  };

  return (
    <RetroDesktop currentStep={currentStep} onSetStep={setCurrentStep}>
      {currentStep === 1 && <SealModal onNext={handleNextStep} />}
      {currentStep === 2 && <PartyModal onNext={handleNextStep} />}
      {currentStep === 3 && <CakeModal onNext={handleNextStep} />}
      {currentStep === 4 && <PrizeModal onNext={handleNextStep} />}
      {currentStep === 5 && <GalleryModal onNext={handleNextStep} />}
      {currentStep === 6 && <LetterModal onRestart={handleRestart} />}
    </RetroDesktop>
  );
}
