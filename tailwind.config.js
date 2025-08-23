export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        primary: "#EC2C21",
        red: {
          custom: "#EC2C21",
          50: "#FEF2F2",
          100: "#FEE2E2", 
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
          950: "#450A0A",
        },
        accent: {
          50: "#FEF7F7",
          100: "#FDEEEE",
          200: "#FBDDDD", 
          300: "#F7BABA",
          400: "#F18B8B",
          500: "#EC2C21",
          600: "#D4251C",
          700: "#B01E17",
          800: "#931C16",
          900: "#7A1C17",
        }
      },
    },
  },
  plugins: [],
};
