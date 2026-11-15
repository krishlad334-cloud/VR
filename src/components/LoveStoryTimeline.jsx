import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Edit3, Check, Bookmark, Heart } from 'lucide-react';

const INITIAL_MILESTONES = [
  {
    id: 1,
    title: "The Day Our Story Began",
    subtitle: "When the universe whispered your name into my world",
    defaultNote: "From the quietest spark, the most magnificent love story of my life was set in motion.",
    iconType: "star",
    badge: "The Beginning",
  },
  {
    id: 2,
    title: "The First Time We Met",
    subtitle: "A moment etched forever into my memory",
    defaultNote: "Seeing you for the first time, little did I know that I was looking at my entire future, my home, and my soulmate.",
    iconType: "sparkle",
    badge: "First Sight",
  },
  {
    id: 3,
    title: "Our First Special Memory",
    subtitle: "Laughter, conversations, and butterflies",
    defaultNote: "Every word we exchanged, every shared laugh, built the unbreakable foundation of who we are today.",
    iconType: "rose",
    badge: "Precious Moments",
  },
  {
    id: 4,
    title: "The Moment We Became Closer",
    subtitle: "Two souls finding home in each other",
    defaultNote: "When I realized that no matter where life leads, as long as my hand is in yours, I am safe and complete.",
    iconType: "heart",
    badge: "Growing Love",
  },
  {
    id: 5,
    title: "Our Wedding Day",
    subtitle: "Vows before God, family, and eternity",
    defaultNote: "The sacred day I became yours and you became mine. Ruchi & Viren together forever.",
    iconType: "rings",
    badge: "Sacred Vows",
    highlight: true,
  },
  {
    id: 6,
    title: "Our Favourite Journey Together",
    subtitle: "Every adventure by your side",
    defaultNote: "Exploring new horizons, quiet drives, and peaceful evenings together. The journey is paradise because you are my companion.",
    iconType: "journey",
    badge: "Adventures Together",
  },
  {
    id: 7,
    title: "14 December 2026 – Celebrating My King",
    subtitle: "Today, tomorrow, and every lifetime with you",
    defaultNote: "Happy Birthday, Viren! Today your Ruchi celebrates the greatest gift God ever blessed this earth and my life with.",
    iconType: "crown",
    badge: "Today's Celebration",
    highlight: true,
  },
];

export default function LoveStoryTimeline() {
  const [milestones, setMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem('viren_timeline_notes');
      return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
    } catch {
      return INITIAL_MILESTONES;
    }
  });

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleStartEdit = (m) => {
    setEditingId(m.id);
    setEditText(m.defaultNote);
  };

  const handleSaveEdit = (id) => {
    const updated = milestones.map((m) => (m.id === id ? { ...m, defaultNote: editText } : m));
    setMilestones(updated);
    try {
      localStorage.setItem('viren_timeline_notes', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    setEditingId(null);
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'rings':
        return (
          <svg className="w-6 h-6 text-[#FDE68A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="8" cy="12" r="5" stroke="#FDE68A" />
            <circle cx="16" cy="12" r="5" stroke="#EC4899" />
            <path d="M12 9l1-2 1 2" stroke="#E11D48" />
          </svg>
        );
      case 'rose':
        return (
          <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.2.5 2.3 1.3 3.1-.8.8-1.3 1.9-1.3 3.1 0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5c0-1.2-.5-2.3-1.3-3.1.8-.8 1.3-1.9 1.3-3.1C16.5 4 14.5 2 12 2zm0 16c-1.1 0-2 .9-2 2v2h4v-2c0-1.1-.9-2-2-2z" />
          </svg>
        );
      case 'crown':
        return (
          <svg className="w-6 h-6 text-[#FDE68A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 18h18v2H3zM5 18l2-9 5 4 5-4 2 9z" />
            <circle cx="12" cy="7" r="1.5" fill="#FDE68A" />
          </svg>
        );
      case 'heart':
        return <Heart className="w-6 h-6 fill-red-500 text-red-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-pink-400" />;
    }
  };

  return (
    <section id="our-story" className="py-24 px-4 sm:px-8 bg-purple-red-gradient text-[#FFF1F2] relative overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-xs sm:text-sm tracking-widest uppercase text-[#FDE68A] mb-3 shadow-md">
          <Bookmark size={14} className="text-[#FDE68A]" />
          <span>Ruchi & Viren's Journey Through Time</span>
        </div>

        {/* Heading */}
        <h2 className="font-playfair text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white text-center max-w-3xl leading-snug mb-3 text-pink-glow">
          EVERY LOVE STORY IS BEAUTIFUL, BUT OURS IS MY FAVOURITE.
        </h2>

        <p className="font-cormorant text-lg sm:text-xl italic text-pink-200 text-center max-w-lg mb-16">
          "A vertical reflection of the milestones that brought us to this magical birthday celebration, curated with endless love by Ruchi."
        </p>

        {/* Vertical Timeline */}
        <div className="relative w-full max-w-3xl">
          {/* Central Vertical Glowing Line in Pink & Red */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-pink-400 via-red-500 to-purple-600 -translate-x-1/2 shadow-[0_0_12px_#EC4899]" />

          {milestones.map((m, index) => {
            const isEven = index % 2 === 0;
            const isEditing = editingId === m.id;

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-start mb-12 sm:mb-16 ${
                  isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-xl transition-transform hover:scale-110 ${
                    m.highlight
                      ? 'bg-gradient-to-br from-red-600 to-purple-800 border-[#FDE68A] text-white shadow-[0_0_20px_rgba(244,63,94,0.6)]'
                      : 'glass-royal border-pink-400 text-white shadow-md'
                  }`}>
                    {renderIcon(m.iconType)}
                  </div>
                </div>

                {/* Milestone Content Card */}
                <div className={`w-full pl-16 sm:pl-0 sm:w-1/2 ${
                  isEven ? 'sm:pr-12' : 'sm:pl-12'
                }`}>
                  <div className={`p-6 sm:p-7 rounded-3xl transition-all shadow-xl border ${
                    m.highlight
                      ? 'glass-royal border-pink-400/60 shadow-[0_0_25px_rgba(236,72,153,0.3)]'
                      : 'glass-card border-pink-400/20 hover:border-pink-400/40'
                  }`}>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-pink-500/20 text-xs font-bold uppercase tracking-wider text-[#FDE68A] border border-pink-400/30">
                        {m.badge}
                      </span>
                      <span className="font-mono text-xs text-pink-300">
                        Step 0{m.id}
                      </span>
                    </div>

                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white mb-1">
                      {m.title}
                    </h3>

                    <p className="font-cormorant text-base italic text-pink-200 mb-3">
                      "{m.subtitle}"
                    </p>

                    <div className="pt-3 border-t border-pink-400/20">
                      {isEditing ? (
                        <div className="flex flex-col gap-2">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            rows={3}
                            className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-pink-400 focus:outline-none bg-purple-950/60 text-white"
                            placeholder="Write your personal memory here..."
                          />
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1 text-xs rounded-lg border border-pink-400/30 text-pink-300"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveEdit(m.id)}
                              className="px-3 py-1 text-xs rounded-lg bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold flex items-center gap-1"
                            >
                              <Check size={12} />
                              <span>Save Note</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="group relative">
                          <p className="font-inter text-xs sm:text-sm text-pink-100 leading-relaxed font-light">
                            {m.defaultNote}
                          </p>
                          <button
                            onClick={() => handleStartEdit(m)}
                            className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-pink-300 hover:text-white transition-colors cursor-pointer"
                          >
                            <Edit3 size={11} />
                            <span>Personalize this memory</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline Footer Dedication */}
        <div className="mt-8 flex flex-col items-center text-center">
          <div className="font-cormorant text-base sm:text-lg italic text-pink-300">
            Every chapter of our story is written with endless love,
          </div>
          <div className="font-playfair text-xl sm:text-2xl font-bold text-white mt-1 flex items-center gap-2 text-pink-glow">
            <span>Your Forever Person, Ruchi</span>
            <Heart size={20} className="fill-red-500 text-red-500 inline-block animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
