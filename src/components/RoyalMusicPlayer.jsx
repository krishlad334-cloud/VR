import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Heart, ChevronDown, ChevronUp, Sparkles, Upload } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function RoyalMusicPlayer({ autoStartPrompt = false, onPromptDismiss }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isExpanded, setIsExpanded] = useState(false);
  const [visualizerHeights, setVisualizerHeights] = useState(new Array(14).fill(4));
  const [showAutoplayNotice, setShowAutoplayNotice] = useState(false);
  const [songInfo, setSongInfo] = useState({
    title: "Tum Se Hi",
    artist: "Jab We Met • Mohit Chauhan & Pritam",
    isExternal: true,
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setIsMuted(state.isMuted);
      setVolume(state.volume);
      setSongInfo({
        title: state.currentSongTitle,
        artist: state.currentArtist,
        isExternal: state.isUsingExternalAudio,
      });
    });

    if (autoStartPrompt && !isPlaying) {
      setShowAutoplayNotice(true);
    }

    return () => unsubscribe();
  }, [autoStartPrompt, isPlaying]);

  // Real-time soundwave visualizer
  useEffect(() => {
    let animId;
    const updateVisualizer = () => {
      if (isPlaying && !isMuted) {
        const raw = audioEngine.getVisualizerData();
        const heights = [];
        for (let i = 0; i < 14; i++) {
          const val = raw[i % raw.length] || 0;
          const h = Math.max(4, Math.min(32, (val / 255) * 28 + (Math.random() * 6)));
          heights.push(h);
        }
        setVisualizerHeights(heights);
      } else {
        setVisualizerHeights(new Array(14).fill(3));
      }
      animId = requestAnimationFrame(updateVisualizer);
    };

    animId = requestAnimationFrame(updateVisualizer);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isMuted]);

  const handleTogglePlay = async () => {
    audioEngine.toggle();
    setShowAutoplayNotice(false);
  };

  const handleToggleMute = () => {
    audioEngine.toggleMute();
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setVolume(val);
  };

  const handleCustomFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      audioEngine.loadCustomAudio(file);
    }
  };

  return (
    <>
      {/* Autoplay prompt banner if initial playback blocked */}
      <AnimatePresence>
        {showAutoplayNotice && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 max-w-sm"
          >
            <div className="bg-[#2E0836] text-white p-4 rounded-3xl border-2 border-pink-500 shadow-2xl flex items-center gap-3.5 pink-border-glow">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 to-red-600 flex items-center justify-center shrink-0 shadow-md">
                <Music size={20} className="text-[#FDE68A] animate-bounce" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs font-bold text-[#FDE68A] uppercase tracking-wider">
                  Our Special Song
                </p>
                <p className="text-xs text-pink-200 line-clamp-1">
                  Tum Se Hi – Jab We Met
                </p>
              </div>
              <button
                onClick={handleTogglePlay}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>PLAY OUR SONG</span>
                <Heart size={12} className="fill-white text-white animate-pulse" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Luxury Song Player Widget (Floating Bottom-Right) */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-40">
        <motion.div
          layout
          className="relative glass-royal text-white rounded-3xl shadow-2xl border-2 border-pink-400/50 backdrop-blur-2xl overflow-hidden transition-all duration-300"
          style={{ width: isExpanded ? '340px' : 'auto' }}
        >
          {/* EXPANDED FULL VINYL PLAYER VIEW */}
          {isExpanded ? (
            <div className="p-5 flex flex-col items-center">
              {/* Header Row */}
              <div className="w-full flex items-center justify-between pb-3 border-b border-pink-400/20 mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-red-400 animate-ping' : 'bg-pink-400/40'}`} />
                  <span className="text-[11px] font-bold tracking-wider text-[#FDE68A] uppercase">
                    Romantic Vinyl Player
                  </span>
                </div>

                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-pink-200 transition-colors cursor-pointer"
                  title="Minimize Player"
                >
                  <ChevronDown size={18} />
                </button>
              </div>

              {/* ROTATING PINK, RED & PURPLE VINYL RECORD */}
              <div className="relative w-44 h-44 my-2 flex items-center justify-center">
                {/* Vinyl Disc Body */}
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#1E0424] via-[#430C52] to-[#1E0424] p-1 shadow-2xl border-2 border-pink-400 flex items-center justify-center relative overflow-hidden"
                >
                  {/* Concentric Grooves */}
                  <div className="absolute inset-2 rounded-full border border-pink-500/10 pointer-events-none" />
                  <div className="absolute inset-5 rounded-full border border-pink-500/10 pointer-events-none" />
                  <div className="absolute inset-8 rounded-full border border-pink-500/10 pointer-events-none" />
                  <div className="absolute inset-11 rounded-full border border-pink-500/10 pointer-events-none" />

                  {/* Center Label in Red & Gold */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#881337] border-2 border-[#FDE68A] flex flex-col items-center justify-center text-center p-1 shadow-inner">
                    <Heart size={10} className="fill-[#FDE68A] text-[#FDE68A] mb-0.5 animate-pulse" />
                    <span className="text-[7px] font-bold text-white uppercase tracking-wider leading-tight">
                      Tum Se Hi
                    </span>
                    <span className="text-[6px] text-[#FDE68A] uppercase tracking-tight font-semibold">
                      Viren ❤️
                    </span>
                  </div>
                </motion.div>

                {/* Golden Tone-Arm / Needle */}
                <motion.div
                  animate={{ rotate: isPlaying ? 22 : 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ transformOrigin: 'top right' }}
                  className="absolute -top-1 right-2 w-16 h-28 pointer-events-none z-10"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FDE68A] border border-pink-600 absolute top-0 right-0 shadow-sm" />
                  <div className="w-1.5 h-20 bg-gradient-to-b from-[#FDE68A] via-pink-300 to-[#FDE68A] absolute top-2 right-1 rounded-full shadow-md" />
                  <div className="w-3.5 h-4 bg-red-600 border border-white/60 absolute top-20 right-0 rounded-sm shadow-xs" />
                </motion.div>
              </div>

              {/* Romantic Lyric Snippet */}
              <div className="my-2 px-4 py-1.5 rounded-2xl bg-pink-500/15 border border-pink-400/30 text-center max-w-xs shadow-inner">
                <p className="font-cormorant text-sm italic font-bold text-[#FDE68A]">
                  "Tum se hi din hota hai, surmayee shaam aati hai..."
                </p>
              </div>

              {/* Song Information */}
              <div className="text-center my-1 w-full">
                <h4 className="font-playfair text-base font-bold text-white truncate px-2">
                  {songInfo.title}
                </h4>
                <p className="text-xs text-pink-300 truncate px-2">
                  {songInfo.artist}
                </p>
              </div>

              {/* 14-Bar Soundwave Visualizer in Pink & Red */}
              <div className="flex items-end justify-center gap-1 h-8 my-2 px-4 py-1 rounded-2xl bg-black/25 border border-pink-500/20 w-full">
                {visualizerHeights.map((h, idx) => (
                  <span
                    key={idx}
                    className="w-1.5 rounded-full bg-gradient-to-t from-purple-500 via-pink-400 to-red-400 transition-all duration-100 shadow-[0_0_8px_rgba(236,72,153,0.8)]"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>

              {/* Playback Controls */}
              <div className="w-full flex items-center justify-between gap-4 mt-2 pt-3 border-t border-pink-400/20">
                {/* Custom Audio Upload Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 hover:text-white transition-all text-xs flex items-center gap-1 cursor-pointer border border-pink-400/30"
                  title="Choose Audio File (.mp3) from Device"
                >
                  <Upload size={14} className="text-[#FDE68A]" />
                  <span className="text-[10px] font-bold">Audio</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleCustomFileSelect}
                  className="hidden"
                />

                {/* Big Glowing Play/Pause Button */}
                <button
                  onClick={handleTogglePlay}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white flex items-center justify-center hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(236,72,153,0.7)] transition-all cursor-pointer border-2 border-white/60"
                  title={isPlaying ? "Pause Music" : "Play Music"}
                >
                  {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-1" />}
                </button>

                {/* Volume & Mute Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleMute}
                    className="text-pink-300 hover:text-white transition-colors cursor-pointer"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 bg-pink-500/30 rounded-lg appearance-none cursor-pointer accent-pink-400"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* COMPACT FLOATING CAPSULE VIEW */
            <div className="px-3.5 py-2.5 flex items-center gap-3">
              {/* Mini Disc / Play button */}
              <button
                onClick={handleTogglePlay}
                className="relative w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-red-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 shadow-md transition-all cursor-pointer shrink-0 border border-white/40"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </button>

              {/* Title & Mini Visualizer - Clicking expands */}
              <div
                onClick={() => setIsExpanded(true)}
                className="flex items-center gap-3 cursor-pointer select-none text-left"
              >
                <div className="max-w-[130px] sm:max-w-[170px]">
                  <div className="flex items-center gap-1.5">
                    <Music size={12} className="text-[#FDE68A]" />
                    <p className="font-playfair text-xs font-bold text-white truncate">
                      {songInfo.title}
                    </p>
                  </div>
                  <p className="text-[10px] text-pink-300 truncate">
                    {songInfo.artist}
                  </p>
                </div>

                {/* Mini 6-bar visualizer */}
                <div className="flex items-end gap-0.5 h-5 px-1 py-0.5 rounded-lg bg-pink-950/40 border border-pink-500/20 shrink-0">
                  {visualizerHeights.slice(0, 6).map((h, idx) => (
                    <span
                      key={idx}
                      className="w-1 rounded-full bg-gradient-to-t from-pink-400 to-red-400"
                      style={{ height: `${Math.min(18, h * 0.6)}px` }}
                    />
                  ))}
                </div>
              </div>

              {/* Expand Button */}
              <button
                onClick={() => setIsExpanded(true)}
                className="p-1.5 rounded-full hover:bg-white/10 text-pink-300 transition-colors ml-1 cursor-pointer"
                title="Expand Music Player"
              >
                <ChevronUp size={16} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
