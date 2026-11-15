import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Feather, RotateCcw } from 'lucide-react';
import { triggerGentleHeartShower } from '../utils/confetti';
import { audioEngine } from '../utils/audioSynth';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
    audioEngine.playEnvelopeOpen();
    triggerGentleHeartShower();
  };

  return (
    <section id="love-letter" className="relative py-24 px-4 sm:px-8 bg-purple-red-gradient text-[#FFF1F2] overflow-hidden">
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-pink-600/15 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-xs sm:text-sm tracking-widest uppercase text-[#FDE68A] mb-3 shadow-md">
          <Feather size={14} className="text-[#FDE68A]" />
          <span>Written With All My Heart</span>
        </div>

        <h2 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2 text-pink-glow">
          A Letter From My Heart
        </h2>

        <p className="font-cormorant text-lg sm:text-xl italic text-pink-200 max-w-lg mb-12">
          "Every word here is a reflection of how deeply you are loved."
        </p>

        {/* Envelope Interaction Container */}
        <div className="w-full flex justify-center perspective-1000">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Closed Luxury Envelope with Royal Red Wax Seal */
              <motion.div
                key="closed-envelope"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md sm:max-w-lg"
              >
                <div className="relative glass-royal rounded-3xl p-8 sm:p-14 shadow-2xl border-2 border-pink-400/40 pink-border-glow overflow-hidden">
                  {/* Subtle envelope lines */}
                  <div className="absolute inset-0 pointer-events-none opacity-25">
                    <svg className="w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="none">
                      <line x1="0" y1="0" x2="200" y2="130" stroke="#F472B6" strokeWidth="1.5" />
                      <line x1="400" y1="0" x2="200" y2="130" stroke="#F472B6" strokeWidth="1.5" />
                      <line x1="0" y1="250" x2="160" y2="110" stroke="#FB7185" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="400" y1="250" x2="240" y2="110" stroke="#FB7185" strokeWidth="1" strokeDasharray="4 4" />
                    </svg>
                  </div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="text-xs uppercase tracking-[0.3em] text-pink-300 font-bold mb-2">
                      To My Beloved Husband VIREN • From Ruchi
                    </div>

                    <h3 className="font-playfair text-3xl sm:text-4xl text-white font-bold mb-8 text-pink-glow">
                      VIREN
                    </h3>

                    {/* Royal Red/Pink Wax Seal Button */}
                    <button
                      onClick={handleOpenLetter}
                      className="group relative flex flex-col items-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
                    >
                      {/* Wax Seal Circle */}
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#9F1239] via-[#E11D48] to-[#F43F5E] flex items-center justify-center shadow-[0_0_35px_rgba(225,29,72,0.6)] border-4 border-pink-200">
                        <div className="w-18 h-18 rounded-full border border-white/60 flex flex-col items-center justify-center p-2 text-white">
                          <Heart size={26} className="fill-white text-white mb-0.5 group-hover:scale-110 transition-transform animate-pulse" />
                          <span className="font-playfair text-[10px] tracking-wider uppercase font-bold text-[#FDE68A]">R & V</span>
                        </div>
                      </div>

                      {/* Button Label: OPEN MY HEART ❤️ */}
                      <div className="mt-5 px-7 py-3 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-inter text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(236,72,153,0.5)] flex items-center gap-2">
                        <span>OPEN MY HEART</span>
                        <Heart size={14} className="fill-white text-white" />
                      </div>
                    </button>

                    <p className="mt-4 text-xs text-pink-300/80 tracking-wider">
                      Tap the royal seal to unfold your birthday love letter
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Unfolded Handwritten-Style Love Letter */
              <motion.div
                key="open-letter"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-2xl text-left"
              >
                {/* Luxury Letter Card in Deep Velvet Purple with Pink Borders */}
                <div className="relative glass-royal rounded-3xl p-8 sm:p-14 shadow-2xl border-2 border-pink-400/50 pink-border-glow">
                  {/* Subtle stationery border decoration */}
                  <div className="absolute inset-3 border border-pink-300/20 rounded-2xl pointer-events-none" />

                  {/* Header stamp */}
                  <div className="flex items-center justify-between border-b border-pink-400/20 pb-4 mb-6">
                    <div>
                      <div className="font-playfair text-2xl font-bold text-white text-pink-glow">
                        Dearest Viren
                      </div>
                      <div className="font-inter text-xs text-[#FDE68A] tracking-widest uppercase mt-0.5 font-semibold">
                        A Birthday Letter From Your Wife, Ruchi • 14 Dec 2026
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 border border-pink-400/50 flex items-center justify-center text-pink-400">
                      <Heart size={18} className="fill-red-500 text-red-500" />
                    </div>
                  </div>

                  {/* Love Letter Body in Cormorant Garamond */}
                  <div className="font-cormorant text-lg sm:text-2xl text-pink-100 leading-relaxed space-y-5 font-normal">
                    <p className="font-bold text-xl sm:text-2xl text-[#FDE68A]">
                      My Dearest Viren,
                    </p>

                    <p>
                      Happy Birthday to the man who means everything to me.
                    </p>

                    <p>
                      Sometimes, I wonder how I got so lucky to have someone like you in my life.
                    </p>

                    <p>
                      You are not just my husband. You are my happiness, my comfort, my strength, my safe place, and my favourite person in this entire world.
                    </p>

                    <p>
                      Your smile makes my difficult days easier. Your presence makes ordinary moments special, and your love gives me a feeling that words can never fully explain.
                    </p>

                    <p>
                      I don't need a perfect world because I have you in mine.
                    </p>

                    <p>
                      I want to grow old with you, celebrate every little happiness with you, stand beside you through every difficult moment, and create a million beautiful memories together.
                    </p>

                    <p>
                      No matter how many birthdays come and go, I will always wish to be the person standing beside you, holding your hand, loving you, and choosing you every single day.
                    </p>

                    <p className="font-bold text-white text-pink-glow">
                      You are my today, my tomorrow, and my forever.
                    </p>

                    <p className="font-playfair text-2xl sm:text-3xl font-bold text-[#FDE68A] pt-2">
                      Happy Birthday, My King!
                    </p>
                  </div>

                  {/* Letter Sign-off */}
                  <div className="mt-8 pt-6 border-t border-pink-400/20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <div className="font-cormorant text-lg italic text-pink-300">
                        With endless love and my whole heart,
                      </div>
                      <div className="font-playfair text-xl sm:text-3xl font-bold text-white mt-1 flex items-center gap-2 text-pink-glow">
                        <span>Your Forever Person, Ruchi</span>
                        <Heart size={22} className="fill-red-500 text-red-500 inline-block animate-pulse" />
                      </div>
                    </div>

                    <button
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-2 text-xs text-pink-300 hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      <RotateCcw size={13} />
                      <span>Fold Envelope Back</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
