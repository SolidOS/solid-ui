import dts from 'unplugin-dts/vite'
import { isAbsolute } from 'node:path'
import { defineConfig } from 'vitest/config'
import type { UserConfig } from 'vite'
import babel from './vite-config/babel'
import css from './vite-config/css'
import icons from './vite-config/icons'
import { cdnLegacyConfig, cdnConfig } from './vite-config/cdn'
import { discoverComponents } from './vite-config/components'
import { stylesConfig } from './vite-config/styles'

const basePlugins = [
    css(),
    icons(),
]

function defaultConfig(): UserConfig {
    return {
        plugins: [
            ...basePlugins,
            babel(),
            dts({
                tsconfigPath: 'tsconfig.json',
                entryRoot: 'src',
                outDirs: ['dist'],
                insertTypesEntry: true,
            }),
        ],
        build: {
            emptyOutDir: false,
            sourcemap: true,
            lib: {
                entry: {
                    index: 'src/index.ts',
                    'components/index': 'src/components/index.ts',
                    ...Object.fromEntries(
                        discoverComponents().map((name) => [
                            `components/${name}/index`,
                            `src/components/${name}/index.ts`,
                        ])
                    ),
                },
            },
            rolldownOptions: {
                output: [
                    {
                        format: 'es',
                        preserveModules: true,
                        preserveModulesRoot: 'src',
                        entryFileNames: '[name].esm.js',
                    },
                    {
                        format: 'cjs',
                        preserveModules: true,
                        preserveModulesRoot: 'src',
                        entryFileNames: '[name].cjs.js',
                    },
                ],
                external: (id) => {
                    return !id.startsWith('~icons/')
                        && !id.startsWith('.')
                        && !isAbsolute(id)
                },
            },
        },
        test: {
            environment: 'jsdom',
            setupFiles: ['test/helpers/setup.ts'],
            coverage: {
                include: ['src/**/*.[jt]s'],
            },
        },
    }
}

export default defineConfig(({ mode }) => {
    switch (mode) {
        case 'cdn-legacy':
            return cdnLegacyConfig(basePlugins)
        case 'cdn':
            return cdnConfig(basePlugins)
        case 'styles':
            return stylesConfig()
        default:
            return defaultConfig()
    }
})
