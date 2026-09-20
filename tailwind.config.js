/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#0b0a08',
          900: '#131110',
          800: '#1d1a17',
          700: '#2a2622',
        },
        cream: {
          100: '#f7f3ea',
          200: '#eee6d6',
          400: '#a89c86',
        },
        gold: {
          DEFAULT: '#b8925a',
          400: '#c9a06b',
          600: '#96754a',
        },
        rust: {
          400: '#d98a72',
          500: '#c1584a',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['clamp(3.5rem, 9vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        'display-2': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.01em' }],
        'display-3': ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.05' }],
        marquee: ['clamp(3rem, 12vw, 11rem)', { lineHeight: '1' }],
        label: ['0.75rem', { letterSpacing: '0.18em', lineHeight: '1' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        34: '8.5rem',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
