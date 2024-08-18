module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks', // check
    '../../.eslintrc.cjs',
    'plugin:jsx-a11y/recommended', // check,
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
  ],
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: { version: 'detect' },
        'import/resolver': {
          typescript: {}
        }
      },
      rules: {
        '@typescript-eslint/no-shadow': [
          'error',
          {
            builtinGlobals: true,
            ignoreOnInitialization: true
          }
        ],
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true }
        ],
        'react/require-default-props': 'off',
        'react/prop-types': 'off'
      }
    }
  ]
};
