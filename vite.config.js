const { defineConfig } = require("vite");
// vite.config.js
module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
});
