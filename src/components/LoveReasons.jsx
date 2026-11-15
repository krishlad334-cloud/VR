import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, CheckCircle2, Eye } from 'lucide-react';
import { triggerGentleHeartShower } from '../utils/confetti';
import { audioEngine } from '../utils/audioSynth';

const REASONS = [
  {
    id: 1,
    title: "Reason 01",
    subtitle: "Your Radiant Smile",
    text: "Because your smile is my favourite happiness.",
    icon: "✨",
  },
  {
    id: 2,
    title: "Reason 02",
    subtitle: "My Safe Haven",
    text: "Because you make me feel loved and safe.",
    icon: "🕊️",
  },
  {
    id: 3,
    title: "Reason 03",
    subtitle: "Silent Connection",
    text: "Because you understand me even without words.",
    icon: "🤍",
  },
  {
    id: 4,
    title: "Reason 04",
    subtitle: "My Anchor & Strength",
    text: "Because you are my strength when life gets difficult.",
    icon: "⚓",
  },
  {
    id: 5,
    title: "Reason 05",
    subtitle: "Timeless Moments",
    text: "Because every moment with you becomes a beautiful memory.",
    icon: "⏳",
  },
  {
    id: 6,
    title: "Reason 06",
    subtitle: "True Authenticity",
    text: "Because I can be completely myself with you.",
    icon: "🌸",
  },
  {
    id: 7,
    title: "Reason 07",
    subtitle: "My Greatest Joy",
    text: "Because your happiness matters to me more than anything.",
    icon: "💎",
  },
  {
    id: 8,
    title: "Reason 08",
    subtitle: "Everyday Magic",
    text: "Because you make ordinary days extraordinary.",
    icon: "🌙",
  },
  {
    id: 9,
    title: "Reason 09",
    subtitle: "My Soul Confidant",
    text: "Because you are my favourite person to share everything with.",
    icon: "💌",
  },
  {
    id: 10,
    title: "Reason 10",
    subtitle: "My Infinite Choice",
    text: "Because if I had to choose again, I would still choose YOU, VIREN.",
    icon: "💍",
    highlight: true,
  },
];

export default function LoveReasons() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    audioEngine.playCardFlip();
    setFlippedCards((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      const count = Object.values(updated).filter(Boolean).length;
      if (count === REASONS.length) {
        triggerGentleHeartShower();
      }
      return updated;
    });
  };

  const handleRevealAll = () => {
    audioEngine.playChime();
    const all = {};
    REASONS.forEach((r) => {
      all[r.id] = true;
    });
    setFlippedCards(all);
    triggerGentleHeartShower();
  };

  const discoveredCount = Object.values(flippedCards).filter(Boolean).length;

  return (
    <section id="reasons" className="py-24 px-4 sm:px-8 bg-purple-red-gradient text-[#FFF1F2] relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-xs sm:text-sm tracking-widest uppercase text-[#FDE68A] mb-3 shadow-md">
          <Heart size={14} className="fill-red-500 text-red-500" />
          <span>Treasured Thoughts</span>
        </div>

        <h2 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-white text-center mb-2 text-pink-glow">
          10 Reasons Why I Love You
        </h2>

        <p className="font-cormorant text-lg sm:text-xl italic text-pink-200 text-center max-w-lg mb-8">
          "Tap each card to reveal the special reasons why my heart beats only for you."
        </p>

        {/* Counter and Reveal All */}
        <div className="flex items-center justify-between w-full max-w-md glass-card px-6 py-3 rounded-2xl border border-pink-400/30 shadow-md mb-12 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-pink-100 font-medium">
            <CheckCircle2 size={16} className="text-pink-400" />
            <span>
              Discovered: <strong className="font-bold text-white">{discoveredCount} / 10</strong>
            </span>
          </div>

          <button
            onClick={handleRevealAll}
            className="text-xs font-bold text-[#FDE68A] hover:text-white underline underline-offset-4 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye size={13} />
            <span>Reveal All</span>
          </button>
        </div>

        {/* 10 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 w-full">
          {REASONS.map((reason, index) => {
            const isFlipped = !!flippedCards[reason.id];
            return (
              <div
                key={reason.id}
                onClick={() => toggleFlip(reason.id)}
                className="perspective-1000 h-64 cursor-pointer select-none group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  className="w-full h-full relative transform-style-3d transition-transform duration-500 rounded-3xl"
                >
                  {/* FRONT SIDE (Pink & Purple Glass) */}
                  <div className="absolute inset-0 backface-hidden rounded-3xl glass-royal border border-pink-400/30 group-hover:border-pink-400 p-6 flex flex-col items-center justify-between shadow-xl group-hover:shadow-[0_0_25px_rgba(236,72,153,0.35)] transition-all">
                    <div className="w-full flex items-center justify-between text-xs text-pink-300">
                      <span className="font-mono font-bold tracking-wider text-pink-400">{reason.title}</span>
                      <span className="text-base">{reason.icon}</span>
                    </div>

                    <div className="flex flex-col items-center text-center my-auto">
                      <div className="w-14 h-14 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-[#FDE68A] mb-3 group-hover:scale-110 transition-transform shadow-inner">
                        <Heart size={22} className="fill-red-500 text-red-500" />
                      </div>
                      <h3 className="font-playfair text-base sm:text-lg font-bold text-white">
                        {reason.subtitle}
                      </h3>
                    </div>

                    <div className="text-[11px] font-bold tracking-wider uppercase text-pink-300 flex items-center gap-1">
                      <Sparkles size={11} className="text-[#FDE68A]" />
                      <span>Tap to reveal</span>
                    </div>
                  </div>

                  {/* BACK SIDE (Revealed Love Reason in Crimson Red & Gold) */}
                  <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 flex flex-col items-center justify-between shadow-2xl transition-all ${
                    reason.highlight
                      ? 'bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#4C0519] text-white border-2 border-[#FDE68A]'
                      : 'bg-gradient-to-br from-[#430A51] via-[#2B0734] to-[#120216] text-white border-2 border-pink-400'
                  }`}>
                    <div className="w-full flex items-center justify-between text-xs opacity-90">
                      <span className="font-mono font-bold text-[#FDE68A]">{reason.title}</span>
                      <Heart size={14} className="fill-red-400 text-red-400" />
                    </div>

                    <div className="text-center my-auto px-1">
                      <p className={`font-cormorant text-xl sm:text-2xl leading-snug italic font-bold ${
                        reason.highlight ? 'text-[#FDE68A] text-gold-glow' : 'text-white'
                      }`}>
                        "{reason.text}"
                      </p>
                    </div>

                    <div className="text-[10px] tracking-widest uppercase text-pink-300">
                      Tap to flip back
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
