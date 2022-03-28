module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    project: `${__dirname}/tsconfig.json`
  },
  plugins: [
    "react",
    "@typescript-eslint"
  ],
  rules: {
    "import/prefer-default-export": 0,
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
  },
  ignorePatterns: ["build/", "node_modules/", ".eslintrc.js"],
}