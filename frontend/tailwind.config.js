/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBlue: "#6893E5",
        mainHoverBlue: "#FFFFFF",
        mainGray: "#BDBDBD",
        mainLightGray: "#F6F6F6",
        "blue-400": "#6893E5",
        "slate-100": "#F6F6F6",
        mainBlack: "#202020",
        mainDarkGray: "#6B7280",
      },
      fontFamily: {
        poppins: ["Poppins", "serif"],
        inter: ["Inter", "serif"],
      },
    },
  },
  plugins: [],
};
