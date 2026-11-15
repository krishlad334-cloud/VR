import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Heart } from 'lucide-react';

const WISHES = [
  "I wish you endless happiness.",
  "I wish you success in everything you dream of achieving.",
  "I wish you good health and peaceful days.",
  "I wish you strength to overcome every challenge.",
  "I wish you beautiful opportunities and unforgettable adventures.",
  "I wish you a life filled with laughter, love, and everything your heart desires.",
  "And above all, I wish that we always keep choosing each other, no matter what life brings.",
];

export default function BirthdayWishes() {
  return (
    <section id="wishes" className="py-24 px-4 sm:px-8 bg-purple-red-gradient text-[#FFF1F2] relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-pink-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-purple-600/15 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-xs sm:text-sm tracking-widest uppercase text-[#FDE68A] mb-3 shadow-md">
          <Crown size={14} className="text-[#FDE68A]" />
          <span>Heartfelt Prayers</span>
        </div>

        {/* Heading */}
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2 text-pink-glow">
          MY WISHES FOR MY KING
        </h2>

        <p className="font-cormorant text-lg sm:text-xl italic text-pink-200 max-w-lg mb-12">
          "Prayers whispered from the depths of my soul for your birthday and all the days to come."
        </p>

        {/* Luxury Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full glass-royal rounded-3xl p-8 sm:p-14 shadow-2xl border-2 border-pink-400/40 pink-border-glow relative"
        >
          {/* Top Salutation */}
          <div className="font-playfair text-2xl sm:text-3xl font-bold text-[#FDE68A] mb-8 pb-4 border-b border-pink-400/20">
            My Dear Viren,
          </div>

          {/* Animated Wishes List */}
          <div className="space-y-6 sm:space-y-7 text-left max-w-2xl mx-auto">
            {WISHES.map((wish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex items-start gap-4 group"
              >
                <div className="w-7 h-7 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <Sparkles size={13} className="text-[#FDE68A]" />
                </div>
                <p className="font-cormorant text-xl sm:text-2xl text-pink-100 leading-snug font-normal">
                  {wish}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Closing Blessing */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-12 pt-8 border-t border-pink-400/20 text-center"
          >
            <p className="font-cormorant text-2xl sm:text-3xl italic font-bold text-white leading-relaxed text-pink-glow">
              "May life give you every happiness that you deserve. You are my greatest blessing."
            </p>

            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="h-px w-10 bg-pink-400/40" />
              <Heart size={18} className="fill-red-500 text-red-500 animate-pulse" />
              <span className="h-px w-10 bg-pink-400/40" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
