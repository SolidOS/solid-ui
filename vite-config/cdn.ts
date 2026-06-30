import { join, resolve } from 'node:path'
import { babel } from 'solidos-toolkit/vite'
import type { PluginOption, UserConfig } from 'vite'

import { componentsSrcDir, discoverComponents, litDecoratorPaths } from './components'

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
                litDecoratorPaths,
                preserveModules: true,
                transpileTargets: {
                    browsers: ['> 1%', 'last 3 versions', 'not dead'],
                },
            }),
        ],
    } satisfies UserConfig
}

export function cdnLegacyConfig(basePlugins: PluginOption[]): UserConfig {
    const baseName = 'solid-ui'
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
                generateBundle(_, bundle) {
                    const minifiedBundle = bundle[`${baseName}.min.js`]

                    if (minifiedBundle?.type !== 'chunk') {
                        return;
                    }

                    this.emitFile({
                        type: 'asset',
                        fileName: `${baseName}.js`,
                        source: minifiedBundle.code,
                    })
                },
            },
        ],
        build: {
            ...shared.build,
            lib: {
                entry: join(projectRoot, 'src/cdn/legacy.ts'),
                name: 'UI',
                formats: ['umd'],
                fileName: () => `${baseName}.min.js`,
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
