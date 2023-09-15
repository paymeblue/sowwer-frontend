/** @type {import('tailwindcss').Config} */

module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#3466FF",
        primary: "#FFC629",
        "light-yellow": "#FFF8D9",
        "light-blue": "#EBEFFF",
        "dark-grey": "#273444",
        "bluish-grey": "#7D8FA5",
        grey: "#F7F8FA",
        "secondary-black": "#030621",
        "body-1": "#333333",
        "body-2": "#555555",
      },
      fontFamily: {
        title: ["var(--font-baskerville)"],
        "sub-title": ["var(--font-libre-baskerville)"],
        body: ["var(--font-plus-jakarta)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        grad: "linear-gradient(to right, #FDFBF2 -2.86%, #EAF4FF 36.28%, #F4F7F6 59.68%, #FFF4FE 83.52%)",
      },
      screens: {
        "mobile-md": "375px",
        "mobile-lg": "425px",
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
      },
    },
  },
  plugins: [],
};
