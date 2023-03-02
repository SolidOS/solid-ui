module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  maxWorkers: 2,
  testMatch: [
    '<rootDir>/test/unit*/*.test.ts' ], //**/?(*.)+(spec|test).[tj]s?(x)'  ],
  setupFilesAfterEnv: [
    './test/helpers/setup.ts'
  ]
}
