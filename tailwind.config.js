/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#0FCFEC",

          "secondary": "#19D3AE",

          "accent": "#3A4256",

          "neutral": "#332735",

          "base-100": "#edecf4",

          "info": "#4da4db",

          "success": "#59dea7",

          "warning": "#ebae05",

          "error": "#ef766b",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}