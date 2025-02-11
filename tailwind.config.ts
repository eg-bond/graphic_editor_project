import type { Config } from 'tailwindcss';
import { Styles } from './src/types/themeTypes';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        cBlue: Styles.Blue,
        cBlueDark: Styles.BlueDark,
        cRed: Styles.Red,
        cRedDark: Styles.RedDark,
        cSlate: Styles.Slate,
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
