import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import neostandard from 'neostandard'

export default [
  ...neostandard(),
  {
    ignores: [
      '**/*.html',
      '**/*.md',
      '**/*.json',
      'docs/**',
      'Documentation/**',
      'node_modules/**',
      'coverage/**',
      'dist/**',
      'lib/**',
      'examples/**',
      '*.js'
    ],
  },
  {
    files: ['src/**/*.js', 'src/**/*.cjs', 'src/**/*.mjs'],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      ecmaVersion: 2022, // Support class fields and other modern syntax
      sourceType: 'module' // Match TypeScript module: ESNext
    },
    rules: {
      // Code style - match TypeScript settings
      semi: ['error', 'never'],
      quotes: ['error', 'single'],

      // Strict checking - match TypeScript strictness
      'no-console': 'error',
      'no-unused-vars': 'error', // Match TypeScript noUnusedLocals: true
      'no-undef': 'error',
      strict: ['error', 'global'], // Match TypeScript alwaysStrict: true

      // Additional strictness to match TypeScript behavior
      'no-implicit-globals': 'error',
      'prefer-const': 'error', // Encourage immutability
      'no-var': 'error', // Use let/const only
      'no-redeclare': 'error'
    },
  },
  {
    files: ['src/**/*.ts'],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json']
      },
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      // Disable ESLint rules that TypeScript handles better
      'no-unused-vars': 'off', // TypeScript handles this via noUnusedLocals
      'no-undef': 'off', // TypeScript handles undefined variables
    },
  },
  {
    files: ['test/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.test.json'],
      },
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      // Disable ESLint rules that TypeScript handles better
      'no-unused-vars': 'off', // TypeScript handles this via noUnusedLocals
      'no-undef': 'off', // TypeScript handles undefined variables
    }
  },
  {
    files: ['test/**/**/*.js', 'test/**/*.js'],
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-console': 'off', // Allow console in tests
      'no-undef': 'off', // Tests may define globals
    }
  }
]
