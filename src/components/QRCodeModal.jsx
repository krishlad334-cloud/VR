import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, Copy, Check, Smartphone, Sparkles } from 'lucide-react';

export default function QRCodeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://viren-forever.love';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const svg = document.getElementById('invitation-qr-code');
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
      ctx.lineWidth = 14;
      ctx.strokeRect(40, 40, 920, 920);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 44px "Playfair Display", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('MY UNIVERSE, MY HUSBAND, MY FOREVER', 500, 120);

      ctx.fillStyle = '#F472B6';
      ctx.font = '32px "Inter", sans-serif';
      ctx.fillText('Private Birthday Invitation for VIREN ❤️', 500, 180);

      ctx.font = '24px "Inter", sans-serif';
      ctx.fillStyle = '#FDE68A';
      ctx.fillText('14 December 2026', 500, 220);

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(240, 280, 520, 520, 24);
      ctx.fill();

      ctx.drawImage(img, 280, 320, 440, 440);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'italic 28px "Cormorant Garamond", Georgia, serif';
      ctx.fillText('Scan with iPhone or Android camera to unlock', 500, 860);

      ctx.font = '22px "Inter", sans-serif';
      ctx.fillStyle = '#FDE68A';
      ctx.fillText('Your Forever Person ❤️', 500, 910);

      const link = document.createElement('a');
      link.download = `Viren-Birthday-Invitation-QR.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg glass-royal text-[#FFF1F2] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-pink-400/50"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Printable & Visible Invitation Card */}
            <div id="printable-invitation" className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-xs tracking-wider uppercase text-[#FDE68A] mb-3">
                <Sparkles size={13} className="text-[#FDE68A]" />
                VIP Royal Invitation Pass
              </div>

              <h2 className="font-playfair text-2xl sm:text-3xl font-bold tracking-wide text-white mb-1 text-pink-glow">
                MY UNIVERSE, MY HUSBAND, MY FOREVER
              </h2>

              <p className="font-playfair text-xl text-[#FDE68A] font-bold mb-1">
                VIREN ❤️
              </p>

              <p className="text-xs sm:text-sm text-pink-300 tracking-widest uppercase font-semibold mb-6">
                14 DECEMBER 2026
              </p>

              {/* QR Code Frame */}
              <div className="relative p-5 sm:p-6 rounded-3xl bg-white shadow-2xl border-4 border-pink-500">
                <div ref={qrRef} className="flex justify-center items-center">
                  <QRCodeSVG
                    id="invitation-qr-code"
                    value={currentUrl}
                    size={200}
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
              </div>

              {/* Camera Scanning Instructions */}
              <div className="mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm text-pink-200">
                <Smartphone size={16} className="text-pink-400" />
                <span>Open your iPhone or Android camera & point at this QR</span>
              </div>

              <p className="mt-2 font-cormorant text-base sm:text-lg italic text-[#FDE68A]">
                "A little world of love, created only for you."
              </p>

              <div className="mt-1 text-xs text-pink-300">
                Your Forever Person ❤️
              </div>
            </div>

            {/* URL Fallback & Copy */}
            <div className="mt-6 pt-5 border-t border-pink-400/20 flex flex-col gap-3">
              <div className="flex items-center gap-2 bg-black/40 p-2.5 rounded-xl border border-pink-400/20 text-xs">
                <span className="text-pink-300 truncate flex-1 font-mono text-left pl-1">
                  {currentUrl}
                </span>
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white font-bold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-white" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>

              {/* Action Buttons: Download & Print */}
              <div className="grid grid-cols-2 gap-3 mt-1">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/40 text-white font-bold text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Download size={16} className="text-[#FDE68A]" />
                  <span>Download Pass</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white font-bold border border-pink-400/50 text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Printer size={16} className="text-white" />
                  <span>Print Pass</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
