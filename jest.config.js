module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  maxWorkers: 2,
  testMatch: [
    //**/?(*.)+(spec|test).[tj]s?(x)'  ],
  setupFilesAfterEnv: [
    './test/helpers/setup.ts'
  ]
}
