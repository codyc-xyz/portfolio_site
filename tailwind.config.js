/** @type {import('tailwindcss').Config} */
const colors = require(`tailwindcss/colors`);

module.exports = {
  mode: `jit`,
  content: [`./src/**/*.{js,jsx,ts,tsx}`, `./public/index.html`],
  theme: {
    spacing: {
      0: `0px`,
      0.5: `4px`,
      1: `8px`,
      2: `12px`,
      3: `16px`,
      4: `24px`,
      5: `32px`,
      6: `48px`,
    },
    screens: {
      sm: `480px`,
      md: `768px`,
      lg: `976px`,
      xl: `1440px`,
    },
    colors: {
      background: `#F4F4F4`,
      text: `#333333`,
      primary: `#0088CC`,
      secondary: `#B7E4C7`,
    },
    fontFamily: {
      sans: [`Merriweather`, `sans-serif`],
    },
    extend: {
      colors: {
        transparent: `transparent`,
        current: `currentColor`,
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        blue: colors.blue,
      },
    },
  },
  plugins: [],
};
