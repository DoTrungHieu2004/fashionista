const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const { fixupPluginRules } = require('@eslint/compat');
const prettierConfig = require('eslint-config-prettier');
const reactNative = require('eslint-plugin-react-native');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = defineConfig([
  expoConfig,

  // Turns OFF all ESLint rules that conflict with Prettier.
  // Must come after expoConfig.
  prettierConfig,

  {
    ignores: [
      'node_modules/',
      'dist/',
      'web-build/',
      'build/',
      'coverage/',
      '.expo/',
      'ios/',
      'android/',
      'expo-env.d.ts',
    ],
  },

  // TS/TSX overrides
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-native': fixupPluginRules(reactNative),
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      // ---- Imports ----
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // React first
            ['^react$', '^react-native$', '^expo'],
            // External packages
            ['^@?\\w'],
            // Internal alias imports
            ['^@/'],
            // Relative
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports
            ['^.+\\.s?css$'],
            // Side-effect imports
            ['^\\u0000'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // ---- TypeScript ----
      '@typescript-eslint/no-unused-vars': 'off', // handled by unused-imports
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
          minimumDescriptionLength: 5,
        },
      ],

      // ---- React ----
      'react/jsx-boolean-value': ['warn', 'never'],
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'react/self-closing-comp': 'warn',
      'react-hooks/exhaustive-deps': 'warn',

      // ---- React Native ----
      'react-native/no-inline-styles': 'warn',
      'react-native/no-unused-styles': 'warn',
      'react-native/no-color-literals': 'off', // too noisy with theming libs

      // ---- General ----
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': ['warn', 'always'],
    },
    settings: {
      react: {
        version: '19.2.3',
      },
    },
  },

  // JS config files (no TS rules)
  {
    files: ['*.config.js', '*.config.cjs', 'metro.config.js', 'babel.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
    rules: {
      'no-undef': 'off',
    },
  },
]).map((config) => {
  if (config.plugins && config.plugins.react) {
    config.plugins.react = fixupPluginRules(config.plugins.react);
  }
  return config;
});
