export default {
  // verbose: true, // Uncomment for detailed test output
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node'],
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { configFile: './babel.config.mjs' }],
  },
  transformIgnorePatterns: ['/node_modules/(?!lit-html).+\\.js'],
  setupFilesAfterEnv: ['./test/helpers/setup.ts'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  roots: ['<rootDir>/src', '<rootDir>/test', '<rootDir>/__mocks__'],
}
