/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./compon1ents/**/*.{js,jsx,ts,tsx}",
        "./node_modules/tw-elements/dist/js/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                mainColor0: "#0084AC",
                mainColor1: "#6DB5CB",
                mainColor2: "#B7D8DF",
                mainColor3: "#FCF5EF",
                mainColor4: "#FE7235",
            },
        },
    },
    plugins: [require("tw-elements/dist/plugin")],
};