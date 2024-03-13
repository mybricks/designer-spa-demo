module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
  env: {
    node: true
  },
  ignorePatterns: ['.eslintrc.js'],
}
