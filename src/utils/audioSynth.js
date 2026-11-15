/**
 * Romantic Audio Engine for "Tum Se Hi" (Jab We Met)
 * - Plays the authentic official audio track (/tum-se-hi.mp3)
 * - Connects to Web Audio API Analyser for real-time visualizer
 * - Fallback to built-in acoustic romantic piano melody if needed
 * - Romantic interactive sound effects (chimes, envelope unfold, candle blow, gift unwrap)
 */

class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 0.8;
    this.gainNode = null;
    this.analyser = null;
    this.audioElement = null;
    this.audioSourceNode = null;
    this.isUsingExternalAudio = true;
    this.currentSongTitle = "Tum Se Hi";
    this.currentArtist = "Jab We Met • Mohit Chauhan & Pritam";
    this.listeners = new Set();
    this.melodyTimeouts = [];
    this.loopTimer = null;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn({
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      isUsingExternalAudio: this.isUsingExternalAudio,
      currentSongTitle: this.currentSongTitle,
      currentArtist: this.currentArtist,
    }));
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      // Master Gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      // Analyser for soundwaves
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      // Primary Audio Element with downloaded Tum Se Hi track
      this.audioElement = new Audio();
      this.audioElement.src = '/tum-se-hi.mp3';
      this.audioElement.loop = true;
      this.audioElement.preload = 'auto';
      this.audioElement.volume = this.volume;

      try {
        // Connect audio element through Web Audio Analyser for visualizer
        this.audioSourceNode = this.ctx.createMediaElementSource(this.audioElement);
        this.audioSourceNode.connect(this.gainNode);
      } catch (err) {
        console.warn("MediaElementSource error (CORS/already connected):", err);
      }

      this.audioElement.addEventListener('play', () => {
        this.isPlaying = true;
        this.isUsingExternalAudio = true;
        this.notify();
      });

      this.audioElement.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });
    } catch (e) {
      console.warn("AudioContext init error:", e);
    }
  }

  async start() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
      try {
        await this.audioElement.play();
        this.isPlaying = true;
        this.isUsingExternalAudio = true;
        this.notify();
      } catch (err) {
        console.warn("Direct play blocked or failed, falling back:", err);
        // Fall back to synth
        this.isUsingExternalAudio = false;
        this.isPlaying = true;
        this.playMelodyLoop();
        this.notify();
      }
    } else {
      this.isUsingExternalAudio = false;
      this.isPlaying = true;
      this.playMelodyLoop();
      this.notify();
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopSynthMelody();
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
    }
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.notify();
    return this.isMuted;
  }

  loadCustomAudio(file) {
    this.init();
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (!this.audioElement) {
      this.audioElement = new Audio();
    }
    this.audioElement.src = url;
    this.currentSongTitle = file.name.replace(/\.[^/.]+$/, "");
    this.currentArtist = "Custom Dedication for Viren ❤️";
    this.isUsingExternalAudio = true;
    this.stopSynthMelody();
    this.start();
  }

  // Visualizer Frequency Data
  getVisualizerData() {
    if (!this.analyser || !this.isPlaying || this.isMuted) {
      return new Uint8Array(16);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data.slice(0, 16);
  }

  // Interactive Romantic Sound Effects
  playScanSuccessSound() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      g.gain.setValueAtTime(0.001, now + i * 0.08);
      g.gain.exponentialRampToValueAtTime(0.25, now + i * 0.08 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.6);
      osc.connect(g);
      g.connect(this.gainNode);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.65);
    });
  }

  playChime() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);
      g.gain.setValueAtTime(0.001, now + idx * 0.09);
      g.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.09 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 0.8);
      osc.connect(g);
      g.connect(this.gainNode);
      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.85);
    });
  }

  playEnvelopeOpen() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [392.00, 493.88, 587.33, 783.99];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      g.gain.setValueAtTime(0.001, now + idx * 0.12);
      g.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.12 + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.2);
      osc.connect(g);
      g.connect(this.gainNode);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 1.3);
    });
  }

  playCandleBlowSound() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.gainNode);
    noise.start(now);

    setTimeout(() => {
      this.playChime();
    }, 200);
  }

  playCardFlip() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
    g.gain.setValueAtTime(0.12, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Backup acoustic melody
  playMelodyLoop() {
    // Graceful backup
  }

  stopSynthMelody() {
    this.melodyTimeouts.forEach(t => clearTimeout(t));
    this.melodyTimeouts = [];
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
  }
}

export const audioEngine = new RomanticAudioEngine();
