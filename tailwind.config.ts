import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep red accent — main brand color
        red: {
          50:  "#fff0f0",
          100: "#ffd5d5",
          200: "#ffaaaa",
          300: "#ff6666",
          400: "#ff2222",
          500: "#CC0000",
          600: "#B30000",
          700: "#9B0000",
          800: "#8B0000",
          900: "#5C0000",
          950: "#3A0000",
        },
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "'Arial Black'", "sans-serif"],
        sans:    ["var(--font-noto)", "'Hiragino Sans'", "Meiryo", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.35em",
      },
    },
  },
  plugins: [],
};

export default config;
