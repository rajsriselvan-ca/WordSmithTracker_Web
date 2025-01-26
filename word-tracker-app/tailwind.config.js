/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8744E0",
        lavender: {
          light: "#9C80EA",
        },
        theme: "rgb(56 67 65)",
        highlighter: "#e83a57",
        highlighterLite: "#FA5F55"
      }
    },
  },
  plugins: [],
}

