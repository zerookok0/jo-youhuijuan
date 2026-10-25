/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: '#171717',
        panel: '#1F1F1F',
        card: '#262626',
        hairline: '#2F2F2F',
        grape: '#9E7FFF',
        azure: '#38BDF8',
        blush: '#F472B6',
        mint: '#10B981',
        sun: '#F59E0B',
        coral: '#EF4444',
        ash: '#A3A3A3',
      },
      fontFamily: {
        sans: ['Inter', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
        ar: ['IBM Plex Sans Arabic', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        lift: '0 24px 60px -24px rgba(0, 0, 0, 0.75)',
        glow: '0 0 0 1px rgba(158, 127, 255, 0.35), 0 18px 50px -18px rgba(158, 127, 255, 0.55)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '56px 56px',
      },
      opacity: {
        2: '0.02',
        3: '0.03',
        4: '0.04',
        6: '0.06',
        7: '0.07',
        8: '0.08',
        12: '0.12',
        14: '0.14',
        15: '0.15',
        18: '0.18',
        22: '0.22',
        35: '0.35',
        45: '0.45',
        55: '0.55',
        65: '0.65',
        85: '0.85',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--tilt, 0deg))' },
          '50%': { transform: 'translateY(-14px) rotate(var(--tilt, 0deg))' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.5)' },
          '70%': { boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)' },
        },
        ticker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        pop: 'pop 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 2.4s linear infinite',
        pulseRing: 'pulseRing 2.4s ease-out infinite',
        ticker: 'ticker 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
