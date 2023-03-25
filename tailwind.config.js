/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        coraBlue: {
          1: "#0084AC",
          2: "#6DB5CB",
          3: "#B7D8DF",
        },
        coraWhite: "#FCF5EF",
        coraOrange: "#FE7235",
      },
    },
    plugins: [require("tw-elements/dist/plugin")],
  },
};
