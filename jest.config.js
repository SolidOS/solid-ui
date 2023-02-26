module.exports = {
  verbose: true,
  maxWorkers: '50%',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    './test/helpers/setup.ts'
  ]
}
