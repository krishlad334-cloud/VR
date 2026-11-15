import confetti from 'canvas-confetti';

const ROSEGOLD_COLORS = [
  '#FFF8EE', // Champagne Light
  '#F7D794', // Warm Champagne Gold
  '#F3E5AB', // Soft Gold
  '#E5989B', // Rose Gold
  '#E8B4B8', // Soft Rose
  '#FFF0F5', // Pearl Blush
  '#D4A373', // Amber Gold
];

export const triggerBirthdayConfetti = () => {
  const count = 180;
  const defaults = {
    origin: { y: 0.7 },
    colors: ROSEGOLD_COLORS,
    disableForReducedMotion: true,
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const triggerSilverStarsConfetti = () => {
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: ROSEGOLD_COLORS,
    shapes: ['star', 'circle'],
  });
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: ROSEGOLD_COLORS,
    shapes: ['star', 'circle'],
  });
};

export const triggerGentleHeartShower = () => {
  const end = Date.now() + 2000;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.3 },
      colors: ROSEGOLD_COLORS,
      scalar: 1.1,
      drift: 0.5,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.3 },
      colors: ROSEGOLD_COLORS,
      scalar: 1.1,
      drift: -0.5,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
