/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        1: "8px",
        2: "12px",
        3: "16px",
        4: "24px",
        5: "32px",
        6: "48px",
      },
      colors: {
        primary: colors.indigo,
      },
      backgroundImage: {
        sunset: "url(/src/assets/img/auth.webp)",
        hero: "url(/src/assets/img/hero-bg.svg)",
      },
    },
  },
  plugins: [],
};
