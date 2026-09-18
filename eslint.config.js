const eslintConfigExpo = require('eslint-config-expo/flat');
const tseslint = require('typescript-eslint');
const reactHooks = require('eslint-plugin-react-hooks');
const reactNative = require('eslint-plugin-react-native');
const prettierConfig = require('eslint-config-prettier');

module.exports = tseslint.config(
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'android/**',
      'ios/**',
      '*.config.js',
      '*.config.cjs',
      '*.config.mjs',
    ],
  },

  ...eslintConfigExpo,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    plugins: {
      'react-hooks': reactHooks,
      'react-native': reactNative,
    },

    rules: {
      /*
       * JavaScript / TypeScript
       */
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',

      'no-var': 'error',
      'prefer-const': 'error',

      'no-unused-vars': 'off',

      /*
       * TypeScript
       */
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],

      '@typescript-eslint/no-non-null-assertion': 'warn',

      /*
       * React Hooks
       */
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /*
       * React Native
       */
      'react-native/no-color-literals': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-raw-text': 'off',
      'react-native/no-single-element-style-arrays': 'error',

      /*
       * Imports / exports
       */
      'sort-imports': 'off',

      /*
       * Code quality
       */
      eqeqeq: ['error', 'always'],
      curly: ['error', 'multi-line'],
      'no-duplicate-imports': 'error',
      'no-constant-condition': 'warn',
      'no-unreachable': 'error',

      /*
       * Prettier handles formatting.
       */
    },
  },

  prettierConfig,
);
