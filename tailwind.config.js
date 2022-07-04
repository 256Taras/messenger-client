/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  //prefix: 'tw',
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  darkMode: "media", // or 'media' or 'class'
  variants: {
    extend: {
      height: ["hover"],
    },
  },
  plugins: [],
  fontFamily: {
    // TTNorms: ['"TTNorms"', "sans-serif"],
  },
  corePlugins: {
    fontFamily: false,
    preflight: false,
  },
}
