module.exports = {
  extends: ['../../.eslintrc.cjs'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      settings: {
        'import/resolver': {
          typescript: {}
        }
      }
    }
  ]
};
