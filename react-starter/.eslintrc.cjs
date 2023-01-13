module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always',
      },
    ],

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    'import/prefer-default-export': ['off'],

    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/{__tests__,__mocks__}/**',
          '**/*.{stories,test}.{ts,tsx,js,jsx}',
          'src/testing/**',
        ],
        optionalDependencies: false,
      },
    ],

    'no-void': [
      'error',
      {
        allowAsStatement: true,
      },
    ],

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],

    'react/react-in-jsx-scope': ['off'],

    'react/prop-types': ['off'],

    'react/require-default-props': ['off'],

    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],

    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['arrow-function'],
        unnamedComponents: ['arrow-function'],
      },
    ],

    'react/jsx-props-no-spreading': ['off'],

    'react/jsx-no-useless-fragment': [
      'error',
      {
        allowExpressions: true,
      },
    ],
  },
}
