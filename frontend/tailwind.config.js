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
    screens: {
      xs: "490px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
