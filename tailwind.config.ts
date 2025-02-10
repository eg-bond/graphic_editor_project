import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        cBlue: '#658aba',
        cBlueHov: '#536ea8',
        cRed: '#ba6565',
        cRedHov: '#a85353',
      },
      keyframes: {
        fadeInDown: {
          from: {
            opacity: '0',
            transform: 'translate3d(0, -20%, 0)',
          },
          to: {
            opacity: '1',
            transform: 'none',
          },
        },
      },
      animation: {
        fadeInDown: 'fadeInDown 0.7s ease forwards',
      },
    },
  },
} satisfies Config;
