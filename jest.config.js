module.exports = {
  verbose: true,
  // https://github.com/paralleldrive/cuid2/issues/44#issuecomment-1531731695
  testEnvironment: './jest-environment-jsdom.js', // had to extend; see https://github.com/jsdom/jsdom/issues/2524
  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)'  ],
  setupFilesAfterEnv: [
    './test/helpers/setup.ts'
  ],
  transformIgnorePatterns: ["/node_modules/(?!lit-html).+\\.js"],
  moduleNameMapper: {
    '^solid-ui-core/(.+)$': '<rootDir>/node_modules/solid-ui-core/lib/$1',
    '^solid-ui-core$': '<rootDir>/node_modules/solid-ui-core/lib/index.js',
    '^solid-logic$': '<rootDir>/node_modules/solid-logic',
    '^rdflib$': '<rootDir>/node_modules/rdflib'
  },
  testEnvironmentOptions: {
      customExportConditions: ['node']
  }

}
