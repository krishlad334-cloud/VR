import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function ForeverPromise() {
  return (
    <section id="promise" className="relative py-28 px-4 sm:px-8 bg-purple-red-gradient text-[#FFF1F2] overflow-hidden">
      {/* Flowing background light effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(236,72,153,0.18),transparent_70%)] pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-purple-700/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Animated Pink & Gold Infinity Symbol */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mb-8"
        >
          <div className="absolute -inset-4 bg-pink-500/25 rounded-full blur-xl animate-pulse" />

          {/* SVG Infinity */}
          <svg
            className="w-24 h-16 sm:w-32 sm:h-20 text-pink-300 filter drop-shadow-[0_0_20px_rgba(236,72,153,0.9)]"
            viewBox="0 0 100 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          >
            <path
              d="M 25,25 
                 C 25,12.5 12.5,12.5 12.5,25 
                 C 12.5,37.5 25,37.5 25,25 
                 L 75,25 
                 C 75,12.5 87.5,12.5 87.5,25 
                 C 87.5,37.5 75,37.5 75,25 
                 Z"
            />
            <circle cx="25" cy="25" r="2.5" fill="#FDE68A" />
            <circle cx="75" cy="25" r="2.5" fill="#FDE68A" />
          </svg>
        </motion.div>

        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-xs sm:text-sm tracking-widest uppercase text-[#FDE68A] mb-4 shadow-md">
          <Sparkles size={14} className="text-[#FDE68A]" />
          <span>An Eternal Vow</span>
          <Sparkles size={14} className="text-[#FDE68A]" />
        </div>

        {/* Heading */}
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight text-white text-pink-glow mb-8">
          MY FOREVER PROMISE
        </h2>

        {/* Cinematic Promise Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full glass-royal rounded-3xl p-8 sm:p-14 border border-pink-400/40 pink-border-glow shadow-2xl text-left sm:text-center"
        >
          <div className="font-playfair text-2xl sm:text-3xl font-bold text-[#FDE68A] mb-6">
            Viren,
          </div>

          <div className="font-cormorant text-xl sm:text-3xl text-pink-100 font-normal leading-relaxed space-y-6 max-w-2xl mx-auto">
            <p>
              I cannot promise that every day will be perfect, but I promise that you will never have to face life alone.
            </p>

            <p>
              I will celebrate your victories, support your dreams, listen to your silence, and stand beside you through every storm.
            </p>

            <p className="text-pink-300 font-medium">
              I don't just want to celebrate your birthday.
            </p>

            <p className="text-white font-bold text-2xl sm:text-4xl text-pink-glow">
              I want to celebrate every birthday of yours for the rest of our lives.
            </p>

            <div className="pt-4">
              <span className="font-playfair text-xl sm:text-2xl font-bold text-[#FDE68A]">
                Today, tomorrow, and forever, I choose you.
              </span>
            </div>
          </div>

          {/* Decorative Signature */}
          <div className="mt-10 pt-6 border-t border-pink-400/20 flex items-center justify-center gap-3">
            <Heart size={20} className="fill-red-500 text-red-500 animate-pulse" />
            <span className="font-playfair text-base sm:text-lg text-white tracking-widest uppercase">
              Always & In Every Lifetime
            </span>
            <Heart size={20} className="fill-red-500 text-red-500 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
