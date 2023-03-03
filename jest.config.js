module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/test/**/*.test.ts' ], //**/?(*.)+(spec|test).[tj]s?(x)'  ],
  setupFilesAfterEnv: [
    './test/helpers/setup.ts'
  ]
}
