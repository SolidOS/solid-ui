import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin, UserConfig } from 'vite'

const projectRoot = resolve(import.meta.dirname, '..')
const breakpointsCss = readFileSync(
    resolve(projectRoot, 'src/styles/breakpoints.css'),
    'utf8',
)

function styleDeclarations(): Plugin {
    return {
        name: 'style-declarations',
        generateBundle() {
            this.emitFile({
                type: 'asset',
                fileName: 'breakpoints.css',
                source: breakpointsCss,
            })

            for (const name of ['breakpoints', 'theme']) {
                this.emitFile({
                    type: 'asset',
                    fileName: `${name}.css.d.ts`,
                    source: `export {}\n`,
                })
            }
        },
    }
}

export default function(): UserConfig {
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
        plugins: [styleDeclarations()],
    }
}
