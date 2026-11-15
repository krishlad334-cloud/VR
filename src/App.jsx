import React, { useState } from 'react';
import BackgroundParticles from './components/BackgroundParticles';
import QRCodeLoginScreen from './components/QRCodeLoginScreen';
import CinematicReveal from './components/CinematicReveal';
import LoveLetter from './components/LoveLetter';
import LoveReasons from './components/LoveReasons';
import GiftSurprises from './components/GiftSurprises';
import LoveStoryTimeline from './components/LoveStoryTimeline';
import BirthdayWishes from './components/BirthdayWishes';
import ForeverPromise from './components/ForeverPromise';
import FinalSurprise from './components/FinalSurprise';
import QRCodeModal from './components/QRCodeModal';
import RoyalMusicPlayer from './components/RoyalMusicPlayer';
import { audioEngine } from './utils/audioSynth';

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [autoPlayPrompt, setAutoPlayPrompt] = useState(false);

  const handleUnlockSurprise = async () => {
    setUnlocked(true);
    try {
      await audioEngine.start();
    } catch {
      setAutoPlayPrompt(true);
    }
    setTimeout(() => {
      const el = document.getElementById('birthday-reveal');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleReplayCelebration = () => {
    setUnlocked(true);
    const el = document.getElementById('birthday-reveal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreNext = () => {
    const el = document.getElementById('love-letter');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#120216] text-[#FFF1F2] selection:bg-[#EC4899] selection:text-white font-inter overflow-x-hidden">
      {/* Falling Flowers/Petals & Floating Glowing Hearts */}
      <BackgroundParticles />

      {/* Main Experience */}
      <main className="relative z-10 w-full">
        {/* LOGIN SCREEN: PURE ROYAL QR CODE INVITATION */}
        {!unlocked ? (
          <QRCodeLoginScreen onUnlock={handleUnlockSurprise} />
        ) : (
          /* UNLOCKED FULL CINEMATIC EXPERIENCE */
          <>
            {/* Grand Cinematic Birthday Reveal with interactive 3D cake & candle blowing */}
            <CinematicReveal onExploreNext={handleExploreNext} />

            {/* Section: A Letter From My Heart */}
            <LoveLetter />

            {/* Section: 10 Reasons Why I Love You */}
            <LoveReasons />

            {/* Section: Five Little Surprises for My King (3D Velvet Gift Boxes) */}
            <GiftSurprises />

            {/* Section: Our Beautiful Love Story (Relationship Timeline) */}
            <LoveStoryTimeline />

            {/* Section: My Birthday Wishes For You */}
            <BirthdayWishes />

            {/* Section: My Forever Promise */}
            <ForeverPromise />

            {/* Section: Final Surprise – One Last Message & Fireworks */}
            <FinalSurprise
              onReplay={handleReplayCelebration}
              onOpenQR={() => setQrModalOpen(true)}
            />

            {/* Elegant Signature Footer */}
            <footer className="py-12 px-4 border-t border-pink-500/20 bg-[#16021B] text-center relative z-20">
              <div className="max-w-2xl mx-auto flex flex-col items-center gap-2">
                <div className="font-playfair text-lg sm:text-xl font-bold text-white text-pink-glow">
                  MY UNIVERSE, MY HUSBAND, MY FOREVER
                </div>
                <div className="font-cormorant text-base sm:text-lg italic text-pink-200">
                  A Birthday Universe Created with All My Heart for Viren • 14 December 2026
                </div>
                <div className="font-playfair text-sm sm:text-base font-bold text-[#FDE68A] mt-1 flex items-center gap-2">
                  <span>Forever & Always Yours, Ruchi</span>
                  <span className="text-red-500 text-lg">❤️</span>
                </div>
              </div>
            </footer>

            {/* Luxury Romantic Vinyl Music Player ("Tum Se Hi") */}
            <RoyalMusicPlayer
              autoStartPrompt={autoPlayPrompt}
              onPromptDismiss={() => setAutoPlayPrompt(false)}
            />
          </>
        )}
      </main>

      {/* Working QR Code Modal for Sharing & Printing */}
      <QRCodeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
      />
    </div>
  );
}
