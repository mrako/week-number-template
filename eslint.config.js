const react = require('eslint-plugin-react');

module.exports = [
  {
    files: ["**/*.js", "**/*.jsx"], // Match both JavaScript and JSX files
    languageOptions: {
      ecmaVersion: "latest", // Enable modern ECMAScript features
      sourceType: "module", // Enable ES modules
      parser: require('@babel/eslint-parser'), // Use Babel to parse modern JavaScript/JSX
      parserOptions: {
        requireConfigFile: false, // Allow ESLint to run without a Babel config file
        babelOptions: {
          presets: ["@babel/preset-react"], // Enable React JSX parsing
        },
      },
    },
    plugins: {
      react, // Add React plugin
    },
    rules: {
      semi: ["error", "always"], // Enforce semicolons
      "comma-dangle": ["error", "always-multiline"], // Enforce dangling commas
      "react/jsx-uses-react": "error", // Prevent React being incorrectly marked as unused
      "react/jsx-uses-vars": "error", // Prevent variables used in JSX from being incorrectly marked as unused
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },
];
