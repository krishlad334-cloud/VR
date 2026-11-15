import React, { useEffect, useRef } from 'react';

export default function SilverFireworks({ active = true, duration = null }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Pink, Red, Purple, and Gold Colors
    const colors = [
      '#FF1E56', // Passionate Red
      '#E11D48', // Ruby
      '#EC4899', // Hot Pink
      '#F472B6', // Soft Pink
      '#A855F7', // Royal Purple
      '#C084FC', // Glow Lavender
      '#FDE68A', // Golden Starlight
      '#FFFFFF', // Diamond White
    ];

    class FireworkParticle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5.5 + 1.8;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.012;
        this.radius = Math.random() * 2.5 + 1.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.04; // gravity
        this.alpha -= this.decay;
      }

      draw(c) {
        c.save();
        c.globalAlpha = Math.max(0, this.alpha);
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.shadowBlur = 10;
        c.shadowColor = this.color;
        c.fill();
        c.restore();
      }
    }

    const launchFirework = () => {
      const x = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
      const y = Math.random() * (canvas.height * 0.45) + canvas.height * 0.1;
      const count = Math.floor(Math.random() * 45) + 50;
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];

      for (let i = 0; i < count; i++) {
        const particleColor = Math.random() > 0.35 ? chosenColor : colors[Math.floor(Math.random() * colors.length)];
        particles.push(new FireworkParticle(x, y, particleColor));
      }
    };

    let launchInterval = setInterval(launchFirework, 650);
    launchFirework();
    setTimeout(launchFirework, 200);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    let stopTimeout;
    if (duration) {
      stopTimeout = setTimeout(() => {
        clearInterval(launchInterval);
      }, duration);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(launchInterval);
      if (stopTimeout) clearTimeout(stopTimeout);
      window.removeEventListener('resize', resize);
    };
  }, [active, duration]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40 w-full h-full"
    />
  );
}
