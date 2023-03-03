module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)'  ],
  setupFilesAfterEnv: [
    './test/helpers/setup.ts'
  ]
}
