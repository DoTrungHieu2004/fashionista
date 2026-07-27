import expoConfig from 'eslint-config-expo';

export default [
  ...expoConfig,
  {
    rules: {
      'import/order': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    ignores: ['android/', 'ios/', 'dist/', 'web-build/'],
  },
];
