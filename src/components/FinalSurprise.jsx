import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, QrCode } from 'lucide-react';
import { triggerBirthdayConfetti, triggerSilverStarsConfetti } from '../utils/confetti';
import SilverFireworks from './SilverFireworks';

export default function FinalSurprise({ onReplay, onOpenQR }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [fireworksActive, setFireworksActive] = useState(false);

  const handleRevealLastThing = () => {
    setIsRevealed(true);
    setFireworksActive(true);
    triggerBirthdayConfetti();
    setTimeout(triggerSilverStarsConfetti, 600);
    setTimeout(() => setFireworksActive(false), 9000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="final-surprise" className="relative min-h-screen py-24 px-4 sm:px-8 bg-purple-red-gradient text-[#FFF1F2] overflow-hidden flex flex-col items-center justify-center">
      <SilverFireworks active={fireworksActive} />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.18),transparent_75%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center relative z-10">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* First Step: "VIREN, BEFORE YOU LEAVE, THERE IS ONE LAST THING..." */
            <motion.div
              key="teaser"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.8 }}
              className="glass-royal rounded-3xl p-8 sm:p-16 border-2 border-pink-400/40 pink-border-glow shadow-2xl max-w-2xl flex flex-col items-center"
            >
              {/* Glowing Heart */}
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 rounded-full bg-pink-500/20 border-2 border-pink-400 flex items-center justify-center mb-6 shadow-[0_0_35px_rgba(236,72,153,0.8)]"
              >
                <Heart size={38} className="fill-red-500 text-red-500 animate-pulse" />
              </motion.div>

              <h2 className="font-playfair text-2xl sm:text-4xl font-bold text-white text-pink-glow leading-snug mb-3">
                VIREN, BEFORE YOU LEAVE, THERE IS ONE LAST THING...
              </h2>
              <p className="font-cormorant text-base sm:text-lg italic text-pink-200 mb-8">
                A final whisper from Ruchi's heart to yours.
              </p>

              <button
                onClick={handleRevealLastThing}
                className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-inter font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Read My Final Secret</span>
                <Sparkles size={16} className="text-[#FDE68A] animate-pulse" />
              </button>
            </motion.div>
          ) : (
            /* Final Message Revealed */
            <motion.div
              key="revealed-final"
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center"
            >
              <div className="glass-royal rounded-3xl p-8 sm:p-14 border-2 border-pink-400/50 pink-border-glow shadow-2xl w-full mb-12">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-400 flex items-center justify-center text-red-500 shadow-[0_0_25px_rgba(236,72,153,0.6)]">
                    <Heart size={30} className="fill-red-500 animate-pulse" />
                  </div>
                </div>

                <div className="font-cormorant text-xl sm:text-3xl text-white font-normal leading-relaxed space-y-4 max-w-2xl mx-auto">
                  <p className="font-playfair text-2xl sm:text-4xl font-bold text-[#FDE68A] mb-6">
                    If I could ask for just one gift from life, I would ask for more time with you.
                  </p>

                  <div className="space-y-1.5 text-lg sm:text-2xl text-pink-100">
                    <p>More birthdays.</p>
                    <p>More laughter.</p>
                    <p>More journeys.</p>
                    <p>More little moments.</p>
                    <p>More memories.</p>
                    <p className="font-bold text-white">More years of holding your hand.</p>
                  </div>

                  <div className="py-5">
                    <p className="text-xl sm:text-2xl text-pink-200">
                      Because my greatest gift is not something I receive.
                    </p>
                    <p className="font-playfair text-3xl sm:text-5xl font-extrabold text-white text-pink-glow my-3">
                      It is YOU.
                    </p>
                  </div>

                  <div className="font-playfair text-xl sm:text-3xl font-bold space-y-1 text-white">
                    <p>Happy Birthday, My Husband.</p>
                    <p>My Love.</p>
                    <p>My Best Friend.</p>
                    <p>My Everything.</p>
                  </div>

                  <p className="font-playfair text-2xl sm:text-4xl font-extrabold text-[#FDE68A] text-gold-glow pt-4">
                    I LOVE YOU, FOREVER AND ALWAYS.
                  </p>
                </div>

                {/* Final Closing Screen Elements */}
                <div className="mt-12 pt-8 border-t border-pink-400/20 flex flex-col items-center text-center">
                  <div className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#FDE68A] font-bold mb-2">
                    MY UNIVERSE, MY HUSBAND, MY FOREVER
                  </div>

                  <h3 className="font-playfair text-2xl sm:text-4xl font-bold text-white mb-2 text-pink-glow">
                    HAPPY BIRTHDAY, VIREN ❤️
                  </h3>

                  <p className="font-cormorant text-xl sm:text-2xl italic text-pink-200 mb-2">
                    "YOURS, TODAY, TOMORROW & FOREVER."
                  </p>

                  <div className="mt-3 flex flex-col items-center gap-1">
                    <span className="font-cormorant text-base sm:text-lg italic text-pink-300">
                      With all my love & whole heart,
                    </span>
                    <span className="font-playfair text-xl sm:text-3xl font-bold text-white tracking-wide text-pink-glow flex items-center gap-2">
                      <span>Your Forever Person, Ruchi</span>
                      <Heart size={22} className="fill-red-500 text-red-500 inline-block animate-pulse" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Viren */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={onReplay}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-600/30 hover:from-pink-500/50 hover:to-purple-600/50 border border-pink-400/60 text-white font-inter text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer font-bold"
                >
                  <RotateCcw size={15} />
                  <span>Replay Birthday Surprise</span>
                </button>

                <button
                  onClick={onOpenQR}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold font-inter text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <QrCode size={15} className="text-[#FDE68A]" />
                  <span>VIP Invitation Pass</span>
                </button>

                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 hover:text-white font-inter text-xs sm:text-sm transition-all cursor-pointer font-semibold"
                >
                  <span>Back to Top ↑</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
