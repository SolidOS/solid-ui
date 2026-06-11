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
    '<rootDir>/node_modules/(?!(lit|lit-html|lit-element|@lit|@lit-labs|@lit-labs/ssr-dom-shim|@lit/reactive-element|@noble/curves|@noble/hashes|@exodus/bytes|uuid|jsdom|parse5|entities|@asamuzakjp/css-color|@asamuzakjp/generational-cache|@csstools)/)',
  ],
  setupFilesAfterEnv: ['./test/helpers/setup.ts'],
  moduleNameMapper: {
    '^~icons/(.*)$': '<rootDir>/__mocks__/iconsMock.js',
    '^.+\\.css$': '<rootDir>/__mocks__/styleMock.js',
    '^solid-logic$': '<rootDir>/../solid-logic/src',
    '^@uvdsl/solid-oidc-client-browser$': '<rootDir>/test/mocks/solid-oidc-client-browser.ts'
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  roots: ['<rootDir>/src', '<rootDir>/test', '<rootDir>/__mocks__'],
}
