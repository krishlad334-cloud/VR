import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, ChevronDown } from 'lucide-react';
import BirthdayCake from './BirthdayCake';
import { triggerBirthdayConfetti, triggerSilverStarsConfetti } from '../utils/confetti';

const REVEAL_SENTENCES = [
  "Today is not just another day...",
  "Today, the universe gave me the most beautiful gift.",
  "Today is the birthday of the person who means everything to me.",
];

export default function CinematicReveal({ onExploreNext }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 2200);
    const timer2 = setTimeout(() => setCurrentStep(2), 4600);
    const timer3 = setTimeout(() => {
      setIsRevealed(true);
      triggerBirthdayConfetti();
      setTimeout(triggerSilverStarsConfetti, 500);
    }, 7200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleSkipIntro = () => {
    setIsRevealed(true);
    triggerBirthdayConfetti();
  };

  return (
    <section id="birthday-reveal" className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 bg-purple-red-gradient text-[#FFF1F2] overflow-hidden">
      {/* Background radial glows & animated stars */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.18),transparent_75%)] pointer-events-none" />

      {/* Intro Sentence Sequence */}
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <div className="flex flex-col items-center justify-center text-center px-4 max-w-3xl min-h-[50vh]">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="font-playfair text-2xl sm:text-4xl md:text-5xl font-light text-white text-pink-glow leading-relaxed"
            >
              "{REVEAL_SENTENCES[currentStep]}"
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
              onClick={handleSkipIntro}
              className="mt-12 text-xs uppercase tracking-widest text-pink-300 hover:text-white transition-opacity cursor-pointer"
            >
              Skip to Celebration →
            </motion.button>
          </div>
        ) : (
          /* Grand Birthday Celebration Reveal */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-4xl w-full z-10 py-10"
          >
            {/* Top Celebratory Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-xs sm:text-sm tracking-widest uppercase text-[#FDE68A] mb-4 shadow-sm"
            >
              <Sparkles size={14} className="text-[#FDE68A]" />
              <span>The Most Special Day in the Universe</span>
              <Sparkles size={14} className="text-[#FDE68A]" />
            </motion.div>

            {/* Glowing Big Title: HAPPY BIRTHDAY, VIREN! */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.9 }}
              className="font-playfair text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white text-pink-glow leading-tight"
            >
              HAPPY BIRTHDAY, VIREN!
            </motion.h1>

            {/* Birthday Date Display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-3 mb-6 flex items-center gap-3 text-pink-200"
            >
              <span className="h-px w-8 bg-pink-400/60" />
              <span className="font-inter text-xs sm:text-sm tracking-[0.3em] font-bold uppercase text-[#FDE68A]">
                14 DECEMBER 2026
              </span>
              <span className="h-px w-8 bg-pink-400/60" />
            </motion.div>

            {/* Interactive Birthday Cake with Candle Blowing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="w-full"
            >
              <BirthdayCake />
            </motion.div>

            {/* Emotional Birthday Dedication */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="max-w-2xl px-4 mt-2"
            >
              <p className="font-cormorant text-xl sm:text-3xl italic text-[#FFF1F2] font-normal leading-relaxed text-pink-glow">
                "To my wonderful husband, you are my greatest blessing, my favourite person, and the most beautiful part of my life."
              </p>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-pink-300">
                <span>With endless devotion,</span>
                <span className="font-bold text-[#FDE68A]">Your Forever Person ❤️</span>
              </div>
            </motion.div>

            {/* Scroll Down / Continue Exploring Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="mt-10"
            >
              <button
                onClick={onExploreNext}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-600/30 hover:from-pink-500/50 hover:to-purple-600/50 border border-pink-400/50 text-white font-inter text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Read My Love Letter & Surprises</span>
                <ChevronDown size={18} className="animate-bounce" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
