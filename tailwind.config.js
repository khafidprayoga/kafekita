const daisyui = require("daisyui");

module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        brand: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
};
