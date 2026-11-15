import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Crown, Compass, Star, Infinity as InfinityIcon } from 'lucide-react';
import { triggerSilverStarsConfetti } from '../utils/confetti';
import { audioEngine } from '../utils/audioSynth';

const SURPRISES = [
  {
    id: 1,
    boxLabel: "Box 01",
    tag: "A SECRET MESSAGE",
    icon: Sparkles,
    content: "You are the most beautiful chapter of my life.",
    boxGradient: "from-[#BE123C] via-[#9F1239] to-[#4C0519]", // Crimson Ruby
    ribbonColor: "#F472B6", // Soft Pink
    bowColor: "#FBCFE8",
  },
  {
    id: 2,
    boxLabel: "Box 02",
    tag: "A PROMISE",
    icon: Compass,
    content: "I promise to hold your hand through every season of life, through every happiness and every challenge.",
    boxGradient: "from-[#581169] via-[#3B0847] to-[#1E0424]", // Deep Royal Purple
    ribbonColor: "#E11D48", // Crimson
    bowColor: "#FDA4AF",
  },
  {
    id: 3,
    boxLabel: "Box 03",
    tag: "A WISH",
    icon: Star,
    content: "May every dream in your heart become a beautiful reality. You deserve all the happiness in this world.",
    boxGradient: "from-[#DB2777] via-[#BE185D] to-[#831843]", // Magenta Rose
    ribbonColor: "#FDE68A", // Golden Ribbon
    bowColor: "#FEF08A",
  },
  {
    id: 4,
    boxLabel: "Box 04",
    tag: "A CONFESSION",
    icon: Heart,
    content: "I fall in love with you again in all the little moments we share.",
    boxGradient: "from-[#9333EA] via-[#6B21A8] to-[#3B0764]", // Vivid Purple
    ribbonColor: "#FB7185", // Rose Pink
    bowColor: "#FECDD3",
  },
  {
    id: 5,
    boxLabel: "Box 05",
    tag: "FOREVER",
    icon: InfinityIcon,
    content: "Even in another lifetime, I would search for you and choose you again.",
    boxGradient: "from-[#BE123C] via-[#701A75] to-[#3B0764]", // Passionate Wine
    ribbonColor: "#FDE68A", // Royal Gold
    bowColor: "#FEF08A",
    special: true,
  },
];

export default function GiftSurprises() {
  const [openedBoxes, setOpenedBoxes] = useState({});

  const handleToggleBox = (id) => {
    setOpenedBoxes((prev) => {
      const isNowOpen = !prev[id];
      if (isNowOpen) {
        audioEngine.playChime();
        triggerSilverStarsConfetti();
      }
      return { ...prev, [id]: isNowOpen };
    });
  };

  const handleOpenAll = () => {
    audioEngine.playChime();
    const all = {};
    SURPRISES.forEach((s) => (all[s.id] = true));
    setOpenedBoxes(all);
    triggerSilverStarsConfetti();
  };

  return (
    <section id="surprises" className="py-24 px-4 sm:px-8 bg-purple-red-gradient text-[#FFF1F2] relative overflow-hidden select-none">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-xs sm:text-sm tracking-widest uppercase text-[#FDE68A] mb-3 shadow-md">
          <Crown size={15} className="text-[#FDE68A]" />
          <span>Royal Tokens of Love</span>
        </div>

        <h2 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-white text-center mb-2 text-pink-glow">
          Five Little Surprises for My King
        </h2>

        <p className="font-cormorant text-lg sm:text-xl italic text-pink-200 text-center max-w-lg mb-14">
          "Each 3D velvet gift box holds an intimate treasure dedicated only to you. Tap to unwrap."
        </p>

        {/* 5 REAL 3D LUXURY GIFT BOXES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-7 w-full">
          {SURPRISES.map((surprise, index) => {
            const isOpen = !!openedBoxes[surprise.id];
            const Icon = surprise.icon;

            return (
              <motion.div
                key={surprise.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => handleToggleBox(surprise.id)}
                className="cursor-pointer select-none group flex flex-col items-center"
              >
                {/* 3D GIFT BOX CONTAINER */}
                <div className="w-full relative min-h-[320px] flex flex-col items-center justify-end">
                  
                  {/* FLOATING REVEALED MESSAGE SCROLL (Lifts upward out of the box when opened) */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.85 }}
                        animate={{ opacity: 1, y: -20, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.85 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 220 }}
                        className="relative z-30 w-[94%] bg-gradient-to-b from-[#FFF1F2] to-[#FCE7F3] text-[#1E0424] rounded-2xl p-5 shadow-[0_15px_35px_rgba(0,0,0,0.8)] border-2 border-pink-400 mb-[-10px]"
                      >
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-mono font-bold text-pink-600">{surprise.boxLabel}</span>
                          <span className="px-2 py-0.5 rounded-full bg-pink-100 text-[10px] font-bold text-purple-900 uppercase">
                            {surprise.tag}
                          </span>
                        </div>

                        <div className="flex items-center justify-center my-2 text-pink-600">
                          <Icon size={22} className="fill-current" />
                        </div>

                        <p className="font-cormorant text-lg leading-snug italic font-bold text-purple-950 text-center">
                          "{surprise.content}"
                        </p>

                        <div className="text-[10px] text-pink-700/80 font-semibold tracking-wider text-center mt-3 uppercase">
                          Tap box to close
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 3D GIFT BOX LID WITH SILKY BOW */}
                  <motion.div
                    animate={
                      isOpen
                        ? { y: -35, rotate: -12, opacity: 0.95 }
                        : { y: 0, rotate: 0, opacity: 1 }
                    }
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className={`relative z-20 w-full h-16 rounded-t-3xl bg-gradient-to-r ${surprise.boxGradient} shadow-2xl border-t-2 border-x-2 border-pink-300/60 flex items-center justify-center overflow-visible`}
                  >
                    {/* Horizontal Ribbon on Lid */}
                    <div
                      className="absolute inset-y-0 w-10 shadow-md flex items-center justify-center"
                      style={{ backgroundColor: surprise.ribbonColor }}
                    >
                      <span className="w-1 h-full bg-white/60" />
                    </div>

                    {/* 3D SILKY SATIN BOW ON TOP */}
                    <div className="relative -top-5 flex items-center justify-center z-30">
                      {/* Left Loop */}
                      <div
                        className="w-8 h-6 rounded-full -rotate-25 shadow-lg border-2 border-white/60"
                        style={{ backgroundColor: surprise.ribbonColor }}
                      />
                      {/* Center Knot */}
                      <div
                        className="w-5 h-5 rounded-full shadow-md border border-white/80 -mx-2 z-10"
                        style={{ backgroundColor: surprise.bowColor }}
                      />
                      {/* Right Loop */}
                      <div
                        className="w-8 h-6 rounded-full rotate-25 shadow-lg border-2 border-white/60"
                        style={{ backgroundColor: surprise.ribbonColor }}
                      />
                    </div>
                  </motion.div>

                  {/* 3D GIFT BOX BODY */}
                  <div className={`relative z-10 w-full h-48 rounded-b-3xl p-5 bg-gradient-to-b ${surprise.boxGradient} shadow-2xl border-2 border-t-0 border-pink-400/50 flex flex-col justify-between overflow-hidden group-hover:shadow-[0_0_35px_rgba(236,72,153,0.4)] transition-all`}>
                    {/* Vertical Center Ribbon */}
                    <div
                      className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 pointer-events-none flex justify-center shadow-inner"
                      style={{ backgroundColor: surprise.ribbonColor }}
                    >
                      <span className="w-1 h-full bg-white/50" />
                    </div>

                    {/* Horizontal Ribbon Band across Middle */}
                    <div
                      className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 pointer-events-none flex items-center shadow-inner"
                      style={{ backgroundColor: surprise.ribbonColor }}
                    >
                      <span className="w-full h-1 bg-white/50" />
                    </div>

                    {/* Golden Center Seal Monogram */}
                    <div className="relative z-10 my-auto flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#FDE68A] via-white to-[#FDE68A] text-[#1E0424] flex items-center justify-center shadow-[0_0_20px_rgba(253,230,138,0.7)] border-2 border-white group-hover:scale-110 transition-transform">
                        <Heart size={24} className="fill-red-600 text-red-600 animate-pulse" />
                      </div>
                      <span className="mt-2 font-playfair text-xs sm:text-sm font-bold tracking-wider text-white text-center text-pink-glow">
                        {surprise.tag}
                      </span>
                    </div>

                    {/* Footer Prompt */}
                    <div className="relative z-10 text-center text-[11px] font-bold tracking-wider uppercase text-pink-200">
                      {isOpen ? 'Open ✨' : 'Tap to Unwrap 🎁'}
                    </div>
                  </div>

                  {/* Box Drop Shadow Base */}
                  <div className="w-[85%] h-4 bg-black/60 rounded-full blur-md -mt-2" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Action: Unwrap All */}
        <div className="mt-12">
          <button
            onClick={handleOpenAll}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles size={16} className="text-[#FDE68A]" />
            <span>Unwrap All Surprises</span>
          </button>
        </div>
      </div>
    </section>
  );
}
