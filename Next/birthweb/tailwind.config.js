module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      inset: {
        c: "118px",
      },
    },
    textColor: (theme) => theme("colors"),
    textColor: {
      red: "#FF0000",
      primary: "#3490dc",
      secondary: "#ffed4a",
      mycolor: "#c672ed",
      white: "#FFFFFF",
      black: "#000000",
    },
    colors: {
      mycolor: "#c672ed",
      pink: "#fdf1fa",
    },
    extend: {},
  },
  plugins: [],
};
