import { defineConfig, globalIgnores } from 'eslint/config'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import neostandard from 'neostandard'

export default defineConfig([
  ...neostandard(),
  globalIgnores([
    'lib/*',
    '**/*.html',
    '**/*.md',
    '**/*.json',
    'Documentation/*',
    'node_modules/*',
    'coverage/*',
    'dist/*',
    'test/*',
    'examples/*'
  ]),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
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

    files: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.cjs', 'src/**/*.mjs'],

    rules: {
      'no-console': 'error',
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
    },
  },
])
