import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, RotateCcw, Heart, PartyPopper } from 'lucide-react';
import { triggerBirthdayConfetti, triggerSilverStarsConfetti } from '../utils/confetti';
import { audioEngine } from '../utils/audioSynth';

export default function BirthdayCake() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [flameFlicker, setFlameFlicker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlameFlicker((prev) => (prev + 1) % 4);
    }, 180);
    return () => clearInterval(interval);
  }, []);

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
    audioEngine.playChime();
  };

  return (
    <div className="flex flex-col items-center justify-center my-8 p-2 select-none w-full max-w-2xl mx-auto">
      {/* Interactive Floating Prompt Button */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-6 text-center"
      >
        <button
          onClick={handleBlowCandles}
          disabled={candlesBlown}
          className={`inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl cursor-pointer ${
            candlesBlown
              ? 'bg-purple-950/70 text-pink-300 border border-pink-500/30'
              : 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-2 border-pink-300/80 hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(236,72,153,0.6)]'
          }`}
        >
          <Wind size={18} className={candlesBlown ? 'text-pink-300' : 'text-white animate-pulse'} />
          <span>
            {candlesBlown
              ? 'Your Birthday Wish Has Been Sealed ✨'
              : 'Make a Wish & Tap to Blow the Candles 🕯️💨'}
          </span>
        </button>
      </motion.div>

      {/* GOURMET 3D ISOMETRIC VECTOR CAKE (SVG SCULPTED) */}
      <div
        onClick={handleBlowCandles}
        className="relative cursor-pointer group flex flex-col items-center w-full max-w-[440px] px-2"
        title={candlesBlown ? 'Candles are blown out' : 'Click to blow out candles!'}
      >
        <svg
          viewBox="0 0 500 460"
          className="w-full h-auto drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] filter overflow-visible"
        >
          <defs>
            {/* Cake Base Gradients */}
            <radialGradient id="standGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F472B6" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#7E22CE" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="pedestalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A044E" />
              <stop offset="30%" stopColor="#A21CAF" />
              <stop offset="50%" stopColor="#F472B6" />
              <stop offset="70%" stopColor="#A21CAF" />
              <stop offset="100%" stopColor="#4A044E" />
            </linearGradient>

            <linearGradient id="tier3Body" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B0728" />
              <stop offset="25%" stopColor="#881337" />
              <stop offset="50%" stopColor="#BE123C" />
              <stop offset="75%" stopColor="#9F1239" />
              <stop offset="100%" stopColor="#3B0728" />
            </linearGradient>

            <linearGradient id="tier3Top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF1F2" />
              <stop offset="60%" stopColor="#FCE7F3" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>

            <linearGradient id="tier2Body" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E0424" />
              <stop offset="25%" stopColor="#581169" />
              <stop offset="50%" stopColor="#7E22CE" />
              <stop offset="75%" stopColor="#581169" />
              <stop offset="100%" stopColor="#1E0424" />
            </linearGradient>

            <linearGradient id="tier2Top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#FBCFE8" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>

            <linearGradient id="tier1Body" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#701A75" />
              <stop offset="25%" stopColor="#DB2777" />
              <stop offset="50%" stopColor="#F43F5E" />
              <stop offset="75%" stopColor="#DB2777" />
              <stop offset="100%" stopColor="#701A75" />
            </linearGradient>

            <linearGradient id="tier1Top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FFF1F2" />
              <stop offset="100%" stopColor="#FBCFE8" />
            </linearGradient>

            <linearGradient id="goldScript" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>

            <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FF1E56" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="80%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* STAND GLOW & PEDESTAL */}
          <ellipse cx="250" cy="425" rx="210" ry="24" fill="url(#standGlow)" opacity="0.6" />
          <path d="M 215 410 L 210 435 L 290 435 L 285 410 Z" fill="url(#pedestalGrad)" />
          <ellipse cx="250" cy="435" rx="45" ry="8" fill="#3B0764" />

          {/* STAND PLATTER */}
          <ellipse cx="250" cy="408" rx="220" ry="26" fill="url(#pedestalGrad)" stroke="#FFF1F2" strokeWidth="2.5" />
          <ellipse cx="250" cy="405" rx="214" ry="23" fill="#1C0422" opacity="0.8" />

          {/* ================= TIER 3 (BOTTOM - RED VELVET) ================= */}
          {/* Tier 3 Body */}
          <path
            d="M 65 315 
               A 185 36 0 0 0 435 315 
               L 435 385 
               A 185 36 0 0 1 65 385 Z"
            fill="url(#tier3Body)"
            stroke="#581169"
            strokeWidth="1.5"
          />
          {/* Tier 3 Top Ellipse */}
          <ellipse cx="250" cy="315" rx="185" ry="36" fill="url(#tier3Top)" stroke="#FB7185" strokeWidth="1.5" />

          {/* Tier 3 Strawberry Ganache Drips */}
          <path
            d="M 65 315 
               Q 95 350 120 325 
               Q 145 360 170 325 
               Q 200 370 230 330 
               Q 260 365 290 328 
               Q 320 375 350 330 
               Q 380 355 405 328 
               Q 425 345 435 315 
               A 185 36 0 0 1 65 315 Z"
            fill="#BE123C"
            opacity="0.9"
          />

          {/* Tier 3 Date Plaque */}
          <g transform="translate(180, 345)">
            <rect x="0" y="0" width="140" height="22" rx="11" fill="#1E0424" stroke="#FDE68A" strokeWidth="1.5" />
            <text x="70" y="15" fill="#FDE68A" fontSize="11" fontFamily="'Inter', sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="2">
              14 DEC 2026
            </text>
          </g>

          {/* Tier 3 Pearl Garlands */}
          {[...Array(14)].map((_, i) => (
            <circle
              key={`pearl-t3-${i}`}
              cx={85 + i * 25}
              cy={383 - Math.sin((i / 13) * Math.PI) * 14}
              r="3"
              fill="#FFF1F2"
              stroke="#F472B6"
              strokeWidth="0.8"
            />
          ))}

          {/* ================= TIER 2 (MIDDLE - ROYAL PURPLE & PINK) ================= */}
          {/* Tier 2 Body */}
          <path
            d="M 115 220 
               A 135 28 0 0 0 385 220 
               L 385 295 
               A 135 28 0 0 1 115 295 Z"
            fill="url(#tier2Body)"
            stroke="#3B0764"
            strokeWidth="1.5"
          />
          {/* Tier 2 Top Ellipse */}
          <ellipse cx="250" cy="220" rx="135" ry="28" fill="url(#tier2Top)" stroke="#F472B6" strokeWidth="1.5" />

          {/* Tier 2 Dripping Frosting */}
          <path
            d="M 115 220 
               Q 140 255 160 232 
               Q 185 262 210 230 
               Q 240 268 270 234 
               Q 300 260 330 232 
               Q 360 255 385 220 
               A 135 28 0 0 1 115 220 Z"
            fill="#EC4899"
            opacity="0.85"
          />

          {/* Tier 2 Ribbon with VIREN Name */}
          <g transform="translate(150, 252)">
            <rect x="0" y="0" width="200" height="26" rx="13" fill="#2E0836" stroke="#FDE68A" strokeWidth="1.8" />
            <text x="100" y="18" fill="#FDE68A" fontSize="13" fontFamily="'Playfair Display', serif" fontWeight="bold" textAnchor="middle" letterSpacing="3">
              VIREN • FOREVER
            </text>
          </g>

          {/* Whipped Cream Rosettes around Tier 2 rim */}
          {[...Array(9)].map((_, i) => (
            <circle
              key={`cream-${i}`}
              cx={135 + i * 28}
              cy={222 - Math.sin((i / 8) * Math.PI) * 10}
              r="4.5"
              fill="#FFFFFF"
              stroke="#FBCFE8"
              strokeWidth="1"
            />
          ))}

          {/* ================= TIER 1 (TOP - STRAWBERRY BLUSH) ================= */}
          {/* Tier 1 Body */}
          <path
            d="M 165 135 
               A 85 20 0 0 0 335 135 
               L 335 200 
               A 85 20 0 0 1 165 200 Z"
            fill="url(#tier1Body)"
            stroke="#9F1239"
            strokeWidth="1.5"
          />
          {/* Tier 1 Top Ellipse */}
          <ellipse cx="250" cy="135" rx="85" ry="20" fill="url(#tier1Top)" stroke="#FDA4AF" strokeWidth="1.5" />

          {/* Tier 1 Dripping Glaze */}
          <path
            d="M 165 135 
               Q 185 160 205 142 
               Q 230 170 255 144 
               Q 280 168 305 142 
               Q 325 158 335 135 
               A 85 20 0 0 1 165 135 Z"
            fill="#E11D48"
            opacity="0.9"
          />

          {/* Ruby Strawberries / Cherries on Top */}
          <circle cx="195" cy="132" r="6" fill="#BE123C" stroke="#FFF1F2" strokeWidth="1" />
          <circle cx="250" cy="144" r="7" fill="#BE123C" stroke="#FFF1F2" strokeWidth="1" />
          <circle cx="305" cy="132" r="6" fill="#BE123C" stroke="#FFF1F2" strokeWidth="1" />

          {/* ================= GOLDEN CAKE TOPPER (HEART MONOGRAM) ================= */}
          <g transform="translate(250, 78)">
            {/* Heart Topper Stem */}
            <line x1="0" y1="12" x2="0" y2="45" stroke="#FDE68A" strokeWidth="2.5" />
            {/* Golden Heart Monogram */}
            <path
              d="M 0 -18 
                 C -12 -32 -32 -22 -32 -6 
                 C -32 10 0 24 0 24 
                 C 0 24 32 10 32 -6 
                 C 32 -22 12 -32 0 -18 Z"
              fill="url(#goldScript)"
              stroke="#FFF"
              strokeWidth="1.5"
              filter="url(#flameGlow)"
            />
            <text x="0" y="3" fill="#3B0764" fontSize="12" fontFamily="'Playfair Display', serif" fontWeight="bold" textAnchor="middle">
              V❤️
            </text>
          </g>

          {/* ================= CANDLES & ANIMATED FLAMES ================= */}
          {[
            { x: 215, y: 125, height: 42, color1: "#F472B6", color2: "#BE123C" },
            { x: 285, y: 125, height: 42, color1: "#F472B6", color2: "#BE123C" },
            { x: 250, y: 110, height: 46, color1: "#FDE68A", color2: "#EA580C" },
          ].map((c, idx) => {
            const candleTopY = c.y - c.height;

            return (
              <g key={`candle-${idx}`}>
                {/* Candle Stick */}
                <rect
                  x={c.x - 3}
                  y={candleTopY}
                  width="6"
                  height={c.height}
                  rx="2"
                  fill={c.color1}
                  stroke="#FFF"
                  strokeWidth="0.8"
                />
                {/* Spiral Stripes on Candle */}
                <line x1={c.x - 3} y1={candleTopY + 8} x2={c.x + 3} y2={candleTopY + 14} stroke={c.color2} strokeWidth="1.5" />
                <line x1={c.x - 3} y1={candleTopY + 18} x2={c.x + 3} y2={candleTopY + 24} stroke={c.color2} strokeWidth="1.5" />
                <line x1={c.x - 3} y1={candleTopY + 28} x2={c.x + 3} y2={candleTopY + 34} stroke={c.color2} strokeWidth="1.5" />

                {/* Candle Wick */}
                <line x1={c.x} y1={candleTopY} x2={c.x} y2={candleTopY - 6} stroke="#333" strokeWidth="1.2" />

                {/* EXTINCTION SMOKE (When Candles are Blown) */}
                {candlesBlown && (
                  <g className="animate-pulse">
                    <path
                      d={`M ${c.x} ${candleTopY - 6} 
                          Q ${c.x - 12} ${candleTopY - 26} ${c.x + 8} ${candleTopY - 44} 
                          T ${c.x - 4} ${candleTopY - 65}`}
                      fill="none"
                      stroke="#FFF1F2"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                    <circle cx={c.x - 4} cy={candleTopY - 65} r="5" fill="#FBCFE8" opacity="0.6" />
                  </g>
                )}

                {/* REALISTIC GLOWING CANDLE FLAME */}
                {!candlesBlown && (
                  <g filter="url(#flameGlow)">
                    {/* Outer Radiant Aura */}
                    <circle
                      cx={c.x}
                      cy={candleTopY - 14}
                      r={15 + (flameFlicker % 2) * 2}
                      fill="#F59E0B"
                      opacity="0.35"
                    />
                    {/* Teardrop Fire Flame */}
                    <path
                      d={`M ${c.x} ${candleTopY - 6}
                          C ${c.x - 6 - (flameFlicker === idx ? 1.5 : 0)} ${candleTopY - 14} 
                            ${c.x - 4} ${candleTopY - 24} 
                            ${c.x} ${candleTopY - 30}
                          C ${c.x + 4} ${candleTopY - 24} 
                            ${c.x + 6 + (flameFlicker === idx ? 1.5 : 0)} ${candleTopY - 14} 
                            ${c.x} ${candleTopY - 6} Z`}
                      fill="url(#flameGrad)"
                    />
                    {/* Inner White-Hot Core */}
                    <ellipse
                      cx={c.x}
                      cy={candleTopY - 14}
                      rx="2.2"
                      ry="5"
                      fill="#FFFFFF"
                    />
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Wish Reveal / Feedback Card */}
      <AnimatePresence>
        {wishMade && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-6 text-center max-w-md glass-royal p-7 rounded-3xl border-2 border-pink-400/50 shadow-[0_0_35px_rgba(236,72,153,0.35)]"
          >
            <div className="inline-flex items-center gap-1.5 text-xs text-[#FDE68A] font-bold uppercase tracking-wider mb-2">
              <Sparkles size={14} className="text-[#FDE68A]" />
              Birthday Wish Sealed to the Universe
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
