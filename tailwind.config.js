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
      },
      animation: {
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        fadeIn: 'fadeIn 0.6s ease forwards',
        pulseRing: 'pulseRing 2.4s cubic-bezier(0.4,0,0.6,1) infinite',
        bump: 'bump 0.4s cubic-bezier(0.34,1.56,0.64,1)',
      },
    },
  },
  plugins: [],
}
