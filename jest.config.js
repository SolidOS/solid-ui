module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)'  ],
  setupFilesAfterEnv: [
    './test/helpers/setup.ts'
  ],
  transformIgnorePatterns: ["/node_modules/(?!lit-html).+\\.js"],
  testEnvironmentOptions: {
      customExportConditions: ['node']
}
}
