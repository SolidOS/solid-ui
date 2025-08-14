import { defineConfig, globalIgnores } from 'eslint/config'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import neostandard from 'neostandard'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

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
    
    files: ["src/**/*.js", "src/**/*.ts", "src/**/*.cjs", "src/**/*.mjs"],

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
