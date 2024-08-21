/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.ts?$': [
      'ts-jest',
      {
        useESM: true
      }
    ]
  },
  setupFiles: ['<rootDir>/.jest/setEnvVars.ts']
};
