module.exports = {
  extends: ['../../.eslintrc.cjs'],
  overrides: [
    {
      files: ['./src/lib/database/migrations/*'],
      rules: {
        'check-file/filename-naming-convention': 0
      }
    }
  ],
  rules: {
    '@typescript-eslint/lines-between-class-members': 0
  }
};
