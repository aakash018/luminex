/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        "theme-dark-bg": "#011627",
        "theme-dark-prm": "#F71735",
        "theme-light-bg": "#FDF7E4",
        "theme-light-prm": "#BBAB8C",
      },
      fontFamily: {
        lato: "Lato",
        sacramento: "Sacramento",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
};
