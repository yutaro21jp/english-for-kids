/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.rose,
        secondary: colors.gray,
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/aspect-ratio")],
}