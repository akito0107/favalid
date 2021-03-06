module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["@typescript-eslint"],
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "./esm/tsconfig.json"
  },
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": false
    }],
    "@typescript-eslint/no-floating-promises": 2,
    "@typescript-eslint/adjacent-overload-signatures": "error"
  }
};
