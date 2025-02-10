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
        // ... other colors
      },
    },
  },
} satisfies Config;
