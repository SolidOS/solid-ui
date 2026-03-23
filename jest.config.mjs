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
    '^.+\\.(mjs|[tj]sx?)$': ['babel-jest', { configFile: './babel.config.mjs' }],
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(lit-html|@noble/curves|@noble/hashes|@exodus/bytes|uuid|jsdom|parse5|@asamuzakjp/css-color|@csstools|@solid-data-modules/contacts-rdflib)/)',
  ],
  moduleNameMapper: {
    '^@solid-data-modules/contacts-rdflib$': '<rootDir>/__mocks__/contacts-rdflib.ts',
  },
  setupFilesAfterEnv: ['./test/helpers/setup.ts'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  roots: ['<rootDir>/src', '<rootDir>/test', '<rootDir>/__mocks__'],
}
