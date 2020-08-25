module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    'jest/globals': true
  },
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: false,
      jsx: true
    },
    sourceType: 'module'
  },
  parser: ['babel-eslint', '@typescript-eslint/parser'],
  plugins: ['react', 'jest', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  rules: {
    'react/prop-types': 0,
    'no-console': 'off',
    indent: ['off', 2],
    'linebreak-style': ['off', 'unix'],
    quotes: ['off', 'single'],
    semi: ['off', 'never'],
    'react/display-name': [
      'off',
      {
        ignoreTranspilerName: false
      }
    ]
  }
}
