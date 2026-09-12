const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier');
const reactNative = require('eslint-plugin-react-native');
const unusedImports = require('eslint-plugin-unused-imports');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const tseslint = require('typescript-eslint');

module.exports = [
  // Expo's recommended base (React, RN, hooks, import, TS)
  ...expoConfig,

  // Must come last among "disable" configs - turns off rules Prettier owns
  prettierConfig,

  // Global ignores
  {
    ignores: [
      'node_modules/**',
      '.expo/**',
      'dist/**',
      'web-build/**',
      'coverage/**',
      'android/**',
      'ios/**',
      'expo-env.d.ts',
      'babel.config.js',
      'metro.config.js',
    ],
  },

  // -------------------------------------------------------------------------
  // App sources rules
  // -------------------------------------------------------------------------
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-native': reactNative,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      /* ---------------- Correctness ---------------- */
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'no-throw-literal': 'error',
      'no-return-await': 'error',
      'no-self-compare': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-constant-binary-expression': 'error',
      'no-implicit-coercion': ['warn', { boolean: false }],
      'default-case-last': 'error',
      'no-fallthrough': 'error',
      'consistent-return': 'warn',
      'no-duplicate-imports': 'error',
      'prefer-template': 'error',
      'object-shorthand': ['error', 'always'],

      /* ---------------- Imports ---------------- */
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      /* ---------------- TypeScript ---------------- */
      '@typescript-eslint/no-unused-vars': 'off', // handled by unused-imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-ignore': 'allow-with-description', minimumDescriptionLength: 10 },
      ],

      /* ---------------- React ---------------- */
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary', 'coerce'] }],
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /* ---------------- React Native ---------------- */
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-unused-styles': 'error',
      'react-native/no-single-element-style-arrays': 'error',

      /* ---------------- Hygiene ---------------- */
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'error',
    },
  },

  // -------------------------------------------------------------------------
  // Expo Router: screens & layouts MUST use default exports
  // -------------------------------------------------------------------------
  {
    files: ['app/**/*.{ts,tsx}', 'src/app/**/*.{ts,tsx}'],
    rules: {
      'import/no-default-export': 'off',
      'import/prefer-default-export': 'off',
    },
  },

  // -------------------------------------------------------------------------
  // Config / tooling files — allow CommonJS + console
  // -------------------------------------------------------------------------
  {
    files: ['**/*.config.{js,cjs,ts}', 'scripts/**/*.{js,ts}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
