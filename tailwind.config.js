/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0e0c0a',
          50: '#f6f5f3',
          100: '#e7e3dd',
          200: '#cfc7ba',
          300: '#a89b85',
          400: '#7c6f5a',
          500: '#544a3c',
          600: '#3a3228',
          700: '#28221b',
          800: '#18140f',
          900: '#0e0c0a',
        },
        gold: {
          DEFAULT: '#b4863a',
          50: '#fbf6ea',
          100: '#f3e6c4',
          200: '#e6cd93',
          300: '#d8b264',
          400: '#c9a24b',
          500: '#b4863a',
          600: '#93692c',
          700: '#725023',
          800: '#523a1a',
          900: '#382710',
        },
        cream: {
          DEFAULT: '#f8f3ea',
          50: '#fefdfb',
          100: '#f8f3ea',
          200: '#f0e8d9',
          300: '#e4d5ba',
        },
        // Paleta de la campaña San Valentín (borgoña/vino) — capa estacional
        // encima de ink/gold/cream, nunca los reemplaza.
        wine: {
          DEFAULT: '#7c2430',
          50: '#fbeef0',
          100: '#f3d9dc',
          200: '#e3aab0',
          300: '#c97b83',
          400: '#a8535d',
          500: '#7c2430',
          600: '#671c26',
          700: '#4f151d',
          800: '#3a0f15',
          900: '#26090d',
        },
        blush: {
          50: '#fdf3f2',
          100: '#f9e4e1',
          200: '#f1c7c1',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(18px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: 0.6 },
          '80%': { transform: 'scale(1.6)', opacity: 0 },
          '100%': { transform: 'scale(1.6)', opacity: 0 },
        },
        bump: {
          '0%': { transform: 'scale(0.6)' },
          '60%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1)' },
        },
        heartFloat: {
          '0%': { transform: 'translateY(10px) scale(0.8)', opacity: 0 },
          '15%': { opacity: 1 },
          '50%': { transform: 'translateY(-16px) scale(1.05)' },
          '85%': { opacity: 1 },
          '100%': { transform: 'translateY(-32px) scale(0.9)', opacity: 0 },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.35, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.25)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.25)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.2)' },
          '60%': { transform: 'scale(1)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        fadeIn: 'fadeIn 0.6s ease forwards',
        pulseRing: 'pulseRing 2.4s cubic-bezier(0.4,0,0.6,1) infinite',
        bump: 'bump 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        heartFloat: 'heartFloat 4.5s ease-in-out infinite',
        twinkle: 'twinkle 2.4s ease-in-out infinite',
        marquee: 'marquee 16s linear infinite',
        heartBeat: 'heartBeat 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
