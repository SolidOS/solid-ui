import tseslintPlugin from '@typescript-eslint/eslint-plugin'
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
      'node_modules/**',
      'coverage/**',
      'dist/**',
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
      }
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-console': 'error',
      'no-unused-vars': 'off'
    },
  },
  {
    files: ['src/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslintPlugin,
    },

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
      'no-console': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      // '@typescript-eslint/no-explicit-any': 'warn', - codebase not ready for this
    },
  },
  {
    files: ['test/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslintPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.test.json'],
      },
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-console': 'off', // Allow console in tests
      'no-undef': 'off', // Tests may define globals
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
