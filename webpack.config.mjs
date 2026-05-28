import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import Icons from 'unplugin-icons/webpack'
import { componentEntries } from './scripts/component-manifest.mjs'

import iconsConfig from './config/icons.mjs'
import postCSSConfig from './config/postcss.mjs'
import { resolvePathsUsingDecorators, litDecoratorsLoaderOptions } from './config/babel.mjs'

const pathsUsingDecorators = resolvePathsUsingDecorators(process.cwd())

const externalsBase = {
  fs: 'null',
  'node-fetch': 'fetch',
  'isomorphic-fetch': 'fetch',
  'text-encoding': 'TextEncoder',
  '@trust/webcrypto': 'crypto',
  // Removed @xmldom/xmldom and whatwg-url - use native browser APIs
  rdflib: '$rdf',
  'solid-logic': 'SolidLogic'
}

// ESM externals: keep imports
const esmExternals = {
  rdflib: 'rdflib',
  'solid-logic': 'solid-logic'
}

const common = {
  entry: {
    // Keep the legacy UMD global export for the main bundle only.
    // Component entrypoints should build as standalone scripts without assigning
    // a shared global like window.UI, so they do not clobber the main bundle
    // or each other when loaded via script tags.
    main: {
      import: './src/index.ts',
      library: {
        name: 'UI',
        type: 'umd'
      }
    },
    ...componentEntries
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    globalObject: 'this',
    publicPath: '',
    iife: true,
    clean: false
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
      '.mjs': ['.mjs', '.mts'],
    },
    fallback: { path: false }
  },
  devtool: 'source-map',
  cache: {
    type: 'filesystem'
  },
  module: {
    rules: [
      {
        test: /\.(mjs|js|ts)$/,
        include: pathsUsingDecorators,
        use: {
          loader: 'babel-loader',
          options: litDecoratorsLoaderOptions
        }
      }, {
        test: /\.(mjs|js|ts)$/,
        exclude: [
          /(node_modules|bower_components|dist)/,
          ...pathsUsingDecorators
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }, {
        test: /\.styles\.css$/,
        loader: 'lit-css-loader',
        options: postCSSConfig
      }, {
        test: /\.sparql$/i,
        type: 'asset/source'
      }, {
        test: /\.ttl$/i,
        type: 'asset/source'
      }]
  },
  plugins: [
    Icons(iconsConfig)
  ]
}

// UMD Minified, rdflib external
const minified = {
  ...common,
  mode: 'production',
  output: {
    ...common.output,
    filename: pathData => pathData.chunk.name === 'main'
      ? 'solid-ui.min.js'
      : 'components/[name]/index.min.js'
  },
  externals: externalsBase,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })]
  }
}

// UMD Unminified, rdflib external
const unminified = {
  ...common,
  mode: 'production',
  output: {
    ...common.output,
    filename: pathData => pathData.chunk.name === 'main'
      ? 'solid-ui.js'
      : 'components/[name]/index.js'
  },
  externals: externalsBase,
  optimization: {
    minimize: false
  }
}

// ESM minified, rdflib external
const esmMinified = {
  ...common,
  entry: {
    ...common.entry,
    main: './src/index.ts'
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: pathData => pathData.chunk.name === 'main'
      ? 'solid-ui.esm.min.js'
      : 'components/[name]/index.esm.min.js',
    library: {
      type: 'module'
    },
    environment: { module: true },
    clean: false
  },
  externals: esmExternals,
  experiments: {
    outputModule: true
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })],
    concatenateModules: false
  }
}

// ESM unminified, rdflib external
const esmUnminified = {
  ...common,
  entry: {
    ...common.entry,
    main: './src/index.ts'
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: pathData => pathData.chunk.name === 'main'
      ? 'solid-ui.esm.js'
      : 'components/[name]/index.esm.js',
    library: {
      type: 'module'
    },
    environment: { module: true },
    clean: false
  },
  externals: esmExternals,
  experiments: {
    outputModule: true
  },
  mode: 'production',
  optimization: {
    minimize: false,
    concatenateModules: false
  }
}

export default (env, argv) => {
  const isDev = argv?.mode === 'development'
  const devtool = isDev ? 'eval-cheap-module-source-map' : 'source-map'
  return [minified, unminified, esmMinified, esmUnminified].map(config => ({
    ...config,
    devtool
  }))
}
