module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff444f",
        text: {
          light: "#f5f5f5",
          dark: "#1e1e1d",
        },
        fill: {
          green: "#caec7f",
          pink: "#ffcddd",
          blue: "#0a66c2",
        },
        surface: {
          base: "#ffffff",
          alt1: "#f6f1ea",
          alt2: "#fcebfb",
          alt3: "#8f83f0",
        },
        border: "#e5e5e5",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
