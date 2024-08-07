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
  }
};
