import { writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import type { Plugin, UserConfig } from 'vite'

const projectRoot = resolve(import.meta.dirname, '..')

function styleDeclarations(): Plugin {
    return {
        name: 'style-declarations',
        closeBundle() {
            writeFileSync(
                join(projectRoot, 'dist/theme.css.d.ts'),
                'export {}\n',
            )
        },
    }
}

export function stylesConfig(): UserConfig {
    return {
        build: {
            outDir: 'dist',
            emptyOutDir: false,
            cssMinify: true,
            rolldownOptions: {
                input: resolve(projectRoot, 'src/styles/theme.css'),
                output: {
                    assetFileNames: 'theme.css',
                },
            },
        },
        plugins: [tailwindcss(), styleDeclarations()],
    }
}
