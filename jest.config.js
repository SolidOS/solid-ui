module.exports = {
  verbose: true,
  setupFilesAfterEnv: [
    './test/helpers/setup.ts'
  ],
  testEnvironment: 'jsdom'
}
