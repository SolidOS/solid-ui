module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    './test/helpers/setup.ts'
  ]
}
