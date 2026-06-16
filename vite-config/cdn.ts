import { copyFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import type { PluginOption, UserConfig } from 'vite'

import babel from './babel'
import { componentsSrcDir, discoverComponents } from './components'

const projectRoot = resolve(import.meta.dirname, '..')

function cdnSharedConfig(options: { basePlugins: PluginOption[]; globals?: Record<string, string> }) {
    const globals = {
        fs: 'null',
        'node-fetch': 'fetch',
        'isomorphic-fetch': 'fetch',
        'text-encoding': 'TextEncoder',
        '@trust/webcrypto': 'crypto',
        ...options.globals
    };

    const externals = Object.keys(globals)

    return {
        resolve: {
            tsconfigPaths: true,
            alias: {
                path: 'path-browserify',
            },
        },
        build: {
            target: 'esnext',
            emptyOutDir: false,
            minify: true,
            sourcemap: true,
            rolldownOptions: {
                output: { globals },
                external: (id) => {
                    return externals.includes(id)
                        || externals.some((pkg) => id.startsWith(`${pkg}/`));
                },
            },
        },
        plugins: [
            ...options.basePlugins,
            babel({
                preserveModules: true,
                transpileTargets: {
                    browsers: ['> 1%', 'last 3 versions', 'not dead'],
                },
            }),
        ],
    } satisfies UserConfig
}

export function cdnLegacyConfig(basePlugins: PluginOption[]): UserConfig {
    const shared = cdnSharedConfig({
        basePlugins,
        globals: {
            rdflib: '$rdf',
            'solid-logic': 'SolidLogic',
        }
    })

    return {
        ...shared,
        plugins: [
            ...shared.plugins,
            {
                name: 'copy-legacy-aliases',
                closeBundle() {
                    const distDir = join(projectRoot, 'dist')

                    copyFileSync(join(distDir, 'solid-ui.min.js'), join(distDir, 'solid-ui.js'))
                    copyFileSync(join(distDir, 'solid-ui.min.js.map'), join(distDir, 'solid-ui.js.map'))
                },
            },
        ],
        build: {
            ...shared.build,
            lib: {
                entry: join(projectRoot, 'src/cdn/legacy.ts'),
                name: 'UI',
                formats: ['umd'],
                fileName: () => 'solid-ui.min.js',
            },
        },
    }
}

export function cdnConfig(basePlugins: PluginOption[]): UserConfig {
    const shared = cdnSharedConfig({ basePlugins })

    return {
        ...shared,
        build: {
            ...shared.build,
            lib: {
                entry: {
                    index: join(projectRoot, 'src/index.ts'),
                    loader: join(projectRoot, 'src/cdn/loader.ts'),
                    components: join(projectRoot, 'src/components/index.ts'),
                    ...Object.fromEntries(
                        discoverComponents().map((name) => [
                            name,
                            join(componentsSrcDir, name, 'index.ts'),
                        ])
                    )
                },
                formats: ['es'],
                fileName: (_, entryName) => {
                    if (['index', 'loader', 'components'].includes(entryName)) {
                        return `${entryName}.js`
                    }

                    return `components/${entryName}.js`
                },
            },
            rolldownOptions: {
                ...shared.build.rolldownOptions,
                output: {
                    ...shared.build.rolldownOptions.output,
                    chunkFileNames: 'chunks/[name]-[hash].js',
                },
            },
        },
    }
}
