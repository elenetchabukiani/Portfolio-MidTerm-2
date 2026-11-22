/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans Georgian"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#060A14',
          900: '#0B1120',
          850: '#0F182E',
          800: '#14213D',
          700: '#1E2F54',
        },
        cyanaccent: {
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#06B6D4',
          600: '#0284C7',
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -3px rgba(6, 182, 212, 0.4)',
        'glow-lg': '0 0 45px -10px rgba(56, 189, 248, 0.3)',
        'card-dark': '0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(56, 189, 248, 0.12)',
        'card-hover': '0 20px 40px -10px rgba(6, 182, 212, 0.25), 0 0 0 1px rgba(56, 189, 248, 0.35)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.25s ease-out forwards',
      }
    },
  },
  plugins: [],
}
