module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:i18next/recommended',
    // 'standard-with-typescript'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    // project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'i18next'],
  rules: {
    'linebreak-style': 0,
    indent: ['error', 2],
    'react/jsx-indent': [
      'error',
      2,
      { checkAttributes: true, indentLogicalExpressions: true },
    ],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', 'tsx'] },
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'no-shadow': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'no-unused-vars': 'warn',
    'import/no-extraneous-dependencies': 'warn',
    'no-undef': 'warn',
    'i18next/no-literal-string': ['warn', { markupOnly: true }],
    'max-len': ['warn', { ignoreComments: true }],
  },
  globals: {
    __IS_DEV__: true,
  },
};
