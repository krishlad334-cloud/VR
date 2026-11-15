import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Smartphone, Download, Copy, Check, Scan, LockOpen, ArrowRight } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';
import { triggerBirthdayConfetti } from '../utils/confetti';

export default function QRCodeLoginScreen({ onUnlock }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanVerified, setScanVerified] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://viren-forever.love';

  const handleScanAndEnter = () => {
    if (isScanning || scanVerified) return;
    setIsScanning(true);

    setTimeout(() => {
      audioEngine.playScanSuccessSound();
      setScanVerified(true);
      triggerBirthdayConfetti();

      setTimeout(() => {
        onUnlock();
      }, 1200);
    }, 900);
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    const svg = document.getElementById('login-qr-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 1000;
    canvas.height = 1000;

    img.onload = () => {
      ctx.fillStyle = '#1A0320';
      ctx.fillRect(0, 0, 1000, 1000);

      ctx.strokeStyle = '#EC4899';
      ctx.lineWidth = 12;
      ctx.strokeRect(40, 40, 920, 920);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 42px "Playfair Display", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('MY UNIVERSE, MY HUSBAND, MY FOREVER', 500, 120);

      ctx.fillStyle = '#F472B6';
      ctx.font = '30px "Inter", sans-serif';
      ctx.fillText('VIP Private Invitation for VIREN ❤️', 500, 180);

      ctx.font = '22px "Inter", sans-serif';
      ctx.fillStyle = '#FDE68A';
      ctx.fillText('14 December 2026', 500, 220);

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(240, 280, 520, 520, 24);
      ctx.fill();

      ctx.drawImage(img, 280, 320, 440, 440);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'italic 26px "Cormorant Garamond", Georgia, serif';
      ctx.fillText('Scan with iPhone or Android camera to open', 500, 860);

      ctx.font = '20px "Inter", sans-serif';
      ctx.fillStyle = '#FDE68A';
      ctx.fillText('Your Forever Person ❤️', 500, 910);

      const link = document.createElement('a');
      link.download = `Viren-Invitation-QR.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-8 bg-purple-red-gradient text-[#FFF1F2] overflow-hidden select-none">
      {/* Decorative ambient glowing fields */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(236,72,153,0.18),transparent_75%)] pointer-events-none" />

      {/* Main VIP QR Invitation Pass */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md sm:max-w-lg glass-royal rounded-3xl p-6 sm:p-10 text-center pink-border-glow shadow-2xl flex flex-col items-center"
      >
        {/* Luxury corner flourishes in Pink & Gold */}
        <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-pink-400 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-pink-400 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-pink-400 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-pink-400 rounded-br-lg pointer-events-none" />

        {/* Top VIP Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-400/40 text-[11px] tracking-widest uppercase text-[#FDE68A] mb-4 shadow-sm">
          <Sparkles size={13} className="text-[#FDE68A]" />
          <span>Exclusive VIP Invitation</span>
        </div>

        {/* Heading */}
        <h1 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-white text-pink-glow leading-snug">
          MY UNIVERSE, MY HUSBAND, MY FOREVER
        </h1>

        {/* Subtitle */}
        <div className="my-2 flex items-center justify-center gap-2">
          <span className="font-playfair text-xl sm:text-2xl font-bold text-[#FDE68A]">
            VIREN
          </span>
          <Heart size={20} className="fill-red-500 text-red-500 animate-pulse" />
        </div>

        <p className="text-xs uppercase tracking-[0.25em] text-pink-300 font-bold mb-6">
          14 DECEMBER 2026
        </p>

        {/* THE ROYAL QR CODE PASS CARD */}
        <div
          onClick={handleScanAndEnter}
          className="relative group cursor-pointer p-5 sm:p-6 rounded-3xl bg-white shadow-2xl border-4 border-pink-500 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {/* Laser Scanning Beam Animation in Vibrant Pink */}
          <motion.div
            animate={{
              top: ['0%', '100%', '0%'],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute left-2 right-2 h-1 bg-gradient-to-r from-transparent via-[#EC4899] to-transparent shadow-[0_0_15px_#EC4899] pointer-events-none z-30"
          />

          {/* Verification Overlay on Click / Scan */}
          <AnimatePresence>
            {scanVerified && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-[#2E0836]/95 rounded-2xl z-40 flex flex-col items-center justify-center text-white p-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 mb-2">
                  <Check size={32} />
                </div>
                <p className="font-playfair text-lg font-bold text-white">
                  Access Granted
                </p>
                <p className="font-cormorant text-sm italic text-[#FDE68A]">
                  Welcome, My King VIREN ❤️
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* QR Code SVG */}
          <div ref={qrRef} className="flex justify-center items-center">
            <QRCodeSVG
              id="login-qr-svg"
              value={currentUrl}
              size={210}
              level="H"
              includeMargin={false}
              fgColor="#2E0836"
              bgColor="#FFFFFF"
              imageSettings={{
                src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23BE123C'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>",
                x: undefined,
                y: undefined,
                height: 38,
                width: 38,
                excavate: true,
              }}
            />
          </div>

          <div className="mt-2 text-[10px] text-purple-950 font-extrabold tracking-wider uppercase">
            VIP PASS • PRIVATE ACCESS
          </div>
        </div>

        {/* Scan Instructions */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm text-pink-200">
          <Smartphone size={16} className="text-pink-400" />
          <span>Point iPhone or Android camera to scan</span>
        </div>

        {/* Primary Interactive Button: SCAN & OPEN WEBSITE */}
        <button
          onClick={handleScanAndEnter}
          disabled={isScanning || scanVerified}
          className="mt-6 w-full py-4 px-6 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-inter font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isScanning ? (
            <>
              <Scan size={18} className="animate-spin text-white" />
              <span>Scanning Invitation...</span>
            </>
          ) : (
            <>
              <LockOpen size={18} className="text-white" />
              <span>SCAN & OPEN WEBSITE</span>
              <ArrowRight size={16} className="text-white" />
            </>
          )}
        </button>

        {/* Card Footer Options: Download & Copy Link */}
        <div className="mt-5 pt-4 border-t border-pink-400/20 w-full flex items-center justify-between text-xs text-pink-300">
          <button
            onClick={handleDownload}
            className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download size={14} className="text-[#FDE68A]" />
            <span>Download Pass</span>
          </button>

          <button
            onClick={handleCopy}
            className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-[#FDE68A]" />}
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
