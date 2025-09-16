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
        primary: colors.sky,
        secondary: colors.slate,
        accent: colors.fuchsia,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}