const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  purge: {
    mode: "all",
    enabled: true,
    content: [
      "./src/**/*.js",
      "./src/pages/*.js",
      "./src/**/*.jsx",
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "public/**/*.html",
    ],
  },
};
