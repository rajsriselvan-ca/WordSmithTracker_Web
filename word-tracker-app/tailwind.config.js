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
        menubar: "rgb(56 67 65)"
      }
    },
  },
  plugins: [],
}

