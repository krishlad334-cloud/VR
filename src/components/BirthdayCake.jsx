import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, RotateCcw, Heart } from 'lucide-react';
import { triggerBirthdayConfetti, triggerSilverStarsConfetti } from '../utils/confetti';
import { audioEngine } from '../utils/audioSynth';

export default function BirthdayCake() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    setWishMade(true);
    audioEngine.playCandleBlowSound();
    triggerBirthdayConfetti();
    setTimeout(() => {
      triggerSilverStarsConfetti();
    }, 400);
  };

  const handleRelight = () => {
    setCandlesBlown(false);
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 p-4 select-none">
      {/* Interactive Prompt Banner */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-8 text-center"
      >
        <button
          onClick={handleBlowCandles}
          disabled={candlesBlown}
          className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl ${
            candlesBlown
              ? 'bg-purple-950/60 text-pink-300 border border-pink-500/30 cursor-default'
              : 'bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-2 border-pink-300/80 cursor-pointer hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(236,72,153,0.5)]'
          }`}
        >
          <Wind size={18} className={candlesBlown ? 'text-pink-300' : 'text-white animate-pulse'} />
          <span>
            {candlesBlown
              ? 'Your Wish Has Been Whispered to the Stars ✨'
              : 'Tap to Blow Out Your Birthday Candles 🕯️💨'}
          </span>
        </button>
      </motion.div>

      {/* GORGEOUS 3D ILLUSTRATED ROMANTIC BIRTHDAY CAKE */}
      <div
        onClick={handleBlowCandles}
        className="relative cursor-pointer select-none group flex flex-col items-center"
        title={candlesBlown ? 'Candles are blown out' : 'Click to blow out candles!'}
      >
        {/* CANDLES ON TOP */}
        <div className="flex justify-center items-end gap-6 sm:gap-9 mb-[-8px] relative z-30">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center relative">
              {/* Rising Smoke when blown out */}
              <AnimatePresence>
                {candlesBlown && (
                  <motion.div
                    initial={{ opacity: 0.9, y: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -50, scale: 2.2 }}
                    transition={{ duration: 2.2, ease: 'easeOut' }}
                    className="absolute -top-10 w-5 h-10 bg-pink-100/70 rounded-full blur-[2px] pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Realistic Glowing Candle Flame */}
              <AnimatePresence>
                {!candlesBlown && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="relative -top-2"
                  >
                    {/* Outer Warm Glow */}
                    <div className="absolute -inset-3 bg-amber-400/40 rounded-full blur-md animate-pulse-subtle" />
                    <div className="absolute -inset-1 bg-pink-500/40 rounded-full blur-sm" />
                    {/* Inner Flame */}
                    <div className="w-4 h-7 bg-gradient-to-t from-red-500 via-amber-300 to-white rounded-full shadow-[0_0_20px_#FDE68A] animate-candle-flicker relative z-10" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candle Stick (Pink & Gold Spiral) */}
              <div className="w-3.5 h-12 bg-gradient-to-b from-pink-200 via-pink-400 to-purple-500 rounded-t-sm shadow-md border-x border-t border-white/60 relative overflow-hidden">
                {/* Spiral stripe */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.7)_4px,rgba(255,255,255,0.7)_8px)]" />
              </div>
            </div>
          ))}
        </div>

        {/* TOP LAYER (Strawberry Pink Cream with Dripping Ganache & Strawberries) */}
        <div className="relative z-20 w-48 sm:w-56 h-16 bg-gradient-to-b from-[#FFF1F2] via-[#FBCFE8] to-[#F472B6] rounded-t-3xl shadow-xl border-t-2 border-x-2 border-white/80 flex items-center justify-center">
          {/* Dripping Chocolate/Strawberry Ganache */}
          <div className="absolute top-0 inset-x-0 h-4 flex justify-around pointer-events-none">
            <span className="w-4 h-5 bg-[#BE123C] rounded-b-full shadow-sm" />
            <span className="w-5 h-7 bg-[#BE123C] rounded-b-full shadow-sm" />
            <span className="w-4 h-4 bg-[#BE123C] rounded-b-full shadow-sm" />
            <span className="w-5 h-6 bg-[#BE123C] rounded-b-full shadow-sm" />
            <span className="w-4 h-5 bg-[#BE123C] rounded-b-full shadow-sm" />
          </div>

          {/* Strawberry Cherries on Top */}
          <div className="flex gap-4 items-center -mt-2">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-700 shadow-md border border-white/40 flex items-center justify-center">
                <span className="w-0.5 h-0.5 bg-white rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE LAYER (Deep Velvet Purple & Ruby Red with Golden Name Banner) */}
        <div className="relative z-10 w-64 sm:w-76 h-20 bg-gradient-to-b from-[#4A0E4E] via-[#2B0734] to-[#1E0424] rounded-t-2xl shadow-2xl border-x-2 border-t-2 border-pink-400/50 flex flex-col items-center justify-center p-2 overflow-hidden">
          {/* Whipped Cream Swirl Border */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-pink-300 via-white to-pink-300 opacity-90 shadow-sm" />

          {/* Golden Name Ribbon */}
          <div className="px-5 py-1 rounded-full bg-gradient-to-r from-pink-500/30 via-red-500/40 to-purple-600/30 border border-pink-300/60 shadow-inner flex items-center gap-2">
            <Heart size={12} className="fill-pink-400 text-pink-400 animate-pulse" />
            <span className="font-playfair text-xs sm:text-sm font-bold tracking-widest text-[#FDE68A] uppercase">
              Viren • Forever Loved
            </span>
            <Heart size={12} className="fill-pink-400 text-pink-400 animate-pulse" />
          </div>

          {/* Delicate Pearl Dots */}
          <div className="flex gap-2 mt-2">
            {[...Array(9)].map((_, idx) => (
              <span key={idx} className="w-1.5 h-1.5 rounded-full bg-pink-200 shadow-[0_0_6px_rgba(236,72,153,0.8)]" />
            ))}
          </div>
        </div>

        {/* BASE LAYER (Rich Red Velvet Cake with Cream Rosettes & Birthday Date) */}
        <div className="relative z-0 w-80 sm:w-96 max-w-[88vw] h-22 bg-gradient-to-b from-[#BE123C] via-[#9F1239] to-[#4C0519] rounded-t-3xl shadow-2xl border-x-2 border-t-2 border-pink-400/60 flex flex-col items-center justify-between p-3">
          {/* Frosting Swirls on Tier Edge */}
          <div className="w-full flex justify-around">
            {[...Array(12)].map((_, idx) => (
              <span key={idx} className="w-3 h-2 bg-gradient-to-b from-white to-pink-200 rounded-full shadow-xs" />
            ))}
          </div>

          {/* Birthday Date Tag */}
          <div className="my-auto px-4 py-0.5 rounded-full bg-black/40 border border-pink-300/40">
            <span className="text-[11px] font-mono tracking-widest text-pink-200 font-bold">14 DECEMBER 2026</span>
          </div>

          {/* Bottom Sugar Pearl Garland */}
          <div className="w-full h-1.5 bg-gradient-to-r from-pink-400 via-[#FDE68A] to-pink-400 rounded-full shadow-sm" />
        </div>

        {/* CAKE STAND (Rose-Gold & Purple Platter) */}
        <div className="w-88 sm:w-[420px] max-w-[94vw] h-6 bg-gradient-to-r from-[#5E1072] via-[#F472B6] to-[#5E1072] rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.9)] border-2 border-white/70" />
        <div className="w-32 sm:w-40 h-5 bg-gradient-to-b from-[#380642] to-[#16021A] rounded-b-xl shadow-inner -mt-1 border-b border-pink-500/40" />
      </div>

      {/* Wish Reveal / Feedback Card */}
      <AnimatePresence>
        {wishMade && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-8 text-center max-w-md glass-royal p-7 rounded-3xl border-2 border-pink-400/50 shadow-[0_0_35px_rgba(236,72,153,0.3)]"
          >
            <div className="inline-flex items-center gap-1.5 text-xs text-[#FDE68A] font-bold uppercase tracking-wider mb-2">
              <Sparkles size={14} className="text-[#FDE68A]" />
              Birthday Wish Sealed
            </div>
            <p className="font-playfair text-xl sm:text-2xl text-white font-bold leading-snug">
              May every prayer of your heart turn into reality, Viren.
            </p>
            <p className="font-cormorant text-lg sm:text-xl italic text-pink-200 mt-2">
              "You are my greatest blessing, my favourite person, and the most beautiful part of my life."
            </p>

            <button
              onClick={handleRelight}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-pink-300 hover:text-white underline underline-offset-4 font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Relight Candles 🕯️</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
