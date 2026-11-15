import React, { useMemo } from 'react';

export default function BackgroundParticles() {
  // Falling romantic flower petals (Roses / Blossoms)
  const flowerPetals = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: `${(i * 3.6 + Math.random() * 2) % 100}%`,
      size: Math.random() * 12 + 10,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 7,
      color: i % 3 === 0 ? '#E11D48' : i % 3 === 1 ? '#EC4899' : '#C084FC',
      rotation: Math.random() * 360,
    }));
  }, []);

  // Floating Romantic Hearts (Ascending)
  const floatingHearts = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.7 + 2) % 96}%`,
      size: Math.random() * 16 + 12,
      duration: Math.random() * 14 + 10,
      delay: Math.random() * 8,
      color: i % 3 === 0 ? 'rgba(225, 29, 72, 0.5)' : i % 3 === 1 ? 'rgba(236, 72, 153, 0.5)' : 'rgba(192, 132, 252, 0.45)',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Romantic Ambient Nebulae (Pink, Red, Purple) */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-purple-700/20 blur-[130px]" />
      <div className="absolute top-1/3 -right-32 w-[700px] h-[700px] rounded-full bg-pink-600/20 blur-[140px]" />
      <div className="absolute -bottom-32 left-1/3 w-[800px] h-[800px] rounded-full bg-red-600/20 blur-[150px]" />

      {/* Falling Romantic Flower Petals */}
      {flowerPetals.map((p) => (
        <div
          key={`petal-${p.id}`}
          className="absolute -top-10 animate-petal-fall"
          style={{
            left: p.left,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <svg
            width={p.size}
            height={p.size * 1.3}
            viewBox="0 0 24 32"
            fill={p.color}
            className="filter drop-shadow-[0_2px_8px_rgba(236,72,153,0.4)] opacity-85"
            style={{ transform: `rotate(${p.rotation}deg)` }}
          >
            {/* Elegant curved rose petal silhouette */}
            <path d="M12 2 C6 6 2 14 4 22 C6 28 12 30 14 28 C18 24 22 16 18 8 C16 4 14 2 12 2 Z" />
          </svg>
        </div>
      ))}

      {/* Floating Glowing Hearts */}
      {floatingHearts.map((h) => (
        <div
          key={`heart-${h.id}`}
          className="absolute bottom-[-40px] animate-float-slow"
          style={{
            left: h.left,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill={h.color}
            stroke="none"
            className="filter drop-shadow-[0_0_12px_rgba(236,72,153,0.7)]"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
