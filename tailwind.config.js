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
        // Paleta de la edición Halloween (octubre 2026, ver data/campaign.js):
        // dorado #C9A45C / dorado claro #E8C77A, crema #EDE5D5, negro profundo
        // #080808 / carbón #151515, naranja Halloween #FF6A00 / ámbar #C85A00 y
        // borgoña #4A0D16. El naranja es acento (luces, brillos, CTA clave),
        // nunca el fondo.
        gold: {
          DEFAULT: '#c9a45c',
          50: '#fbf6ea',
          100: '#f6ead0',
          200: '#f0dba6',
          300: '#e8c77a',
          400: '#d7b56a',
          500: '#c9a45c',
          600: '#a8843f',
          700: '#7f6230',
          800: '#574222',
          900: '#382a15',
        },
        cream: {
          DEFAULT: '#ede5d5',
          50: '#fbf8f2',
          100: '#f4eee3',
          200: '#ede5d5',
          300: '#dfd2bb',
        },
        night: {
          950: '#080808',
          900: '#0c0b0b',
          850: '#101010',
          800: '#151515',
          700: '#1d1b1a',
          600: '#272423',
          500: '#34302d',
        },
        ember: {
          100: '#ffe7d3',
          200: '#ffcfa6',
          300: '#ffa65e',
          400: '#ff8a2e',
          500: '#ff6a00',
          600: '#c85a00',
          700: '#984300',
          800: '#5c2a04',
          900: '#331702',
        },
        wine: {
          DEFAULT: '#4a0d16',
          300: '#b4525f',
          400: '#8a2433',
          500: '#6b1522',
          600: '#57101b',
          700: '#4a0d16',
          800: '#33080f',
          900: '#1f0509',
        },
        // Color de marca de Addi (muestreado del banner oficial que mandó el
        // cliente) — solo para el distintivo "Addi" de la opción de pago.
        addi: '#0060fd',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Jost', 'system-ui', 'sans-serif'],
        // Gótica sutil SOLO para rótulos de temporada ("Halloween Edition").
        gothic: ['"Grenze Gotisch"', '"Playfair Display"', 'Georgia', 'serif'],
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
        twinkle: {
          '0%, 100%': { opacity: 0.35, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.25)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        fadeIn: 'fadeIn 0.6s ease forwards',
        pulseRing: 'pulseRing 2.4s cubic-bezier(0.4,0,0.6,1) infinite',
        bump: 'bump 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        twinkle: 'twinkle 2.4s ease-in-out infinite',
        marquee: 'marquee 16s linear infinite',
      },
    },
  },
  plugins: [],
}
