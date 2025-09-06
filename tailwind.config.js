/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        isans: ["Instrument Sans", "sans-serif"],
      },
      colors: {
        // Primary theme palette based on #3a5a40
        primary: {
          50: "#f0f4f1",
          100: "#dbe8de",
          200: "#b8d1bf",
          300: "#90b89a",
          400: "#6a9d75",
          500: "#3a5a40", // Base color
          600: "#335139",
          700: "#2b4431",
          800: "#243729",
          900: "#1e2e23",
          950: "#0f1912",
        },
        // Secondary complementary colors
        secondary: {
          50: "#f9f7f4",
          100: "#f1ede6",
          200: "#e2d9cc",
          300: "#cfc0a8",
          400: "#b8a082",
          500: "#a68865",
          600: "#987a59",
          700: "#7f644c",
          800: "#685241",
          900: "#544336",
        },
        // Accent colors for highlights
        accent: {
          50: "#fdf4f3",
          100: "#fce7e6",
          200: "#f9d4d2",
          300: "#f4b5b1",
          400: "#ec8983",
          500: "#e06259",
          600: "#cc4539",
          700: "#ab352b",
          800: "#8d2f28",
          900: "#752c27",
        },
      },
    },
  },
  plugins: [],
};
