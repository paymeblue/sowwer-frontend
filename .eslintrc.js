module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "next/core-web-vitals",
    "next",
    "google",
    "prettier",
  ],

  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "tsconfig.json",
  },
  plugins: ["react"],
  rules: {
    "react/jsx-props-no-spreading": "off",
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
    "require-jsdoc": "off",
    "new-cap": ["error", { capIsNew: false }],
    camelcase: "off",
  },
};
