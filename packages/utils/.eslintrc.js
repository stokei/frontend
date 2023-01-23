module.exports = {
  ...require("@stokei/config/eslint-preset.js"),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
};
