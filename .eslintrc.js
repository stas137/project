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
    'prettier',
    // 'standard-with-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    // project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'react-hooks',
    'project-path-checker-plugin',
    'unused-imports',
  ],
  rules: {
    'linebreak-style': 0,
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
    'no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-undef': 'warn',
    'i18next/no-literal-string': [
      'warn',
      {
        markupOnly: true,
        ignoreAttribute: [
          'data-testid',
          'to',
          'name',
          'target',
          'direction',
          'justify',
          'align',
          'gap',
          'role',
          'as',
          'border',
          'feature',
          'color',
          'variant',
          'borderRadius',
          'alt',
          'size',
          'wrap',
        ],
      },
    ],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'no-param-reassign': 'warn',
    'react/no-array-index-key': 'warn',
    'arrow-body-style': 'off',
    'project-path-checker-plugin/path-checker': ['error', { alias: '@' }],
    'project-path-checker-plugin/public-api-imports': [
      'error',
      {
        alias: '@',
        testFilesPatterns: [
          '**/*.test.*',
          '**/*.stories.*',
          '**/StoreDecorator.tsx',
        ],
      },
    ],
    'project-path-checker-plugin/layer-imports': [
      'error',
      {
        alias: '@',
        ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'react/no-unstable-nested-components': 'warn',
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
  overrides: [
    {
      files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
        'max-len': 'off',
      },
    },
  ],
};
