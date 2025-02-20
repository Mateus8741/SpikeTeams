const { $COLORS } = require('./styles/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        app: {
          base: $COLORS.appColorBase,
          dark: $COLORS.appColorDark,
          light: $COLORS.appColorLight,
          bg: $COLORS.appColorBg,
          text: $COLORS.appColorText,
        },
      },
    },
  },
  plugins: [],
};
