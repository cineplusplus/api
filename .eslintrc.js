module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "standard-with-typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    // Aquí puedes añadir reglas personalizadas o modificar las existentes
  },
  overrides: [
    {
      files: [".eslintrc.js", ".eslintrc.cjs"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
};
