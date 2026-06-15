import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import type { UserConfig } from 'vite'

const projectRoot = resolve(import.meta.dirname, '..')

export function stylesConfig(): UserConfig {
    return {
        build: {
            outDir: 'dist',
            emptyOutDir: false,
            cssMinify: true,
            rolldownOptions: {
                input: resolve(projectRoot, 'src/styles.css'),
                output: {
                    assetFileNames: 'styles.css',
                },
            },
        },
        plugins: [tailwindcss()],
    }
}
