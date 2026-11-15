/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          darkest: '#120216',
          deep: '#1E0424',
          night: '#2B0734',
          royal: '#430A51',
          plum: '#5E1072',
          vivid: '#9333EA',
          glow: '#C084FC',
          light: '#E9D5FF',
        },
        pink: {
          blush: '#FFF1F2',
          light: '#FBCFE8',
          soft: '#F472B6',
          vivid: '#EC4899',
          hot: '#DB2777',
          rose: '#BE185D',
        },
        red: {
          ruby: '#E11D48',
          crimson: '#BE123C',
          deep: '#9F1239',
          passionate: '#FF1E56',
        },
        champagne: {
          gold: '#FDE68A',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Garamond', 'serif'],
        inter: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'petal-fall': 'petalFall 10s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'candle-flicker': 'flicker 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg) translateX(0px)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(110vh) rotate(360deg) translateX(80px)', opacity: '0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        flicker: {
          '0%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.92' },
          '50%': { transform: 'scale(1.08, 0.95) rotate(1deg)', opacity: '1' },
          '100%': { transform: 'scale(0.96, 1.05) rotate(-0.5deg)', opacity: '0.95' },
        }
      },
      backgroundImage: {
        'romantic-gradient': 'linear-gradient(135deg, #1A0320 0%, #30073B 50%, #430C52 100%)',
        'purple-red-gradient': 'linear-gradient(180deg, #14021A 0%, #280533 50%, #1F0328 100%)',
        'pink-red-card': 'linear-gradient(145deg, rgba(236, 72, 153, 0.12) 0%, rgba(225, 29, 72, 0.08) 100%)',
      }
    },
  },
  plugins: [],
}
