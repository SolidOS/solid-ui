import { resolve } from 'node:path'
import type { UserConfig } from 'vite'

export default {
    tsconfigPaths: true,
    alias: {
        '@': resolve(import.meta.dirname, '../src'),
    },
} as const satisfies UserConfig['resolve']
