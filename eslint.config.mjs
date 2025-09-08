import tseslintPlugin from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import neostandard from 'neostandard'

export default [
  ...neostandard(),
  {
    ignores: [
      'lib/**',
      '**/*.html',
      '**/*.md',
      '**/*.json',
      'docs/**',
      'node_modules/**',
      'coverage/**',
      'dist/**',
      'test/**',
      'examples/**'
    ],
  },
  {
    files: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.cjs', 'src/**/*.mjs'],
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
]
