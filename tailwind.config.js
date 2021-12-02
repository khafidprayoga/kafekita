const daisyui = require("daisyui");

module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.jsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        brand: ["Open Sans", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
};
