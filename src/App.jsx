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
