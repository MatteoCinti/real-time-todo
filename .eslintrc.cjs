module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'airbnb/base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      './tsconfig.json',
      './@app/server/tsconfig.json',
      './@app/client/tsconfig.json',
      './@app/client/tsconfig.node.json'
    ],
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },

  settings: {
    'import/resolver': {
      node: {
        paths: ['src']
      },
      alias: {
        map: [
          ['@/typography', './src/components/typography'],
          ['@/ui', './src/components/ui'],

          ['@', './src']
        ],
        extensions: ['.ts', '.tsx', '.js']
      }
    }
  },

  plugins: ['react-refresh', 'check-file'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    // this next line is a deprecated behaviour
    'react/require-default-props': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ],
    'check-file/filename-naming-convention': [
      'error',
      {
        '**/*.{ts,tsx}': 'KEBAB_CASE'
      },
      {
        // ignore the middle extensions of the filename to support filename like bable.config.js or smoke.spec.ts
        ignoreMiddleExtensions: true
      }
    ]
  }
};
