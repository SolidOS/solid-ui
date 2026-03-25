import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'

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
  entry: './src/index.ts',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    library: {
      name: 'UI',
      type: 'umd'
    },
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
  module: {
    rules: [
      {
        test: /\.(mjs|js|ts)$/,
        exclude: /(node_modules|bower_components|dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                modules: false // Preserve ES modules for webpack
              }],
              '@babel/preset-typescript'
            ]
          }
        }
      }, {
        test: /\.sparql$/i,
        type: 'asset/source'
      }, {
        test: /\.ttl$/i,
        type: 'asset/source'
      }]
  }
}

// UMD Minified, rdflib external
const minified = {
  ...common,
  mode: 'production',
  output: {
    ...common.output,
    filename: 'solid-ui.min.js'
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
    filename: 'solid-ui.js'
  },
  externals: externalsBase,
  optimization: {
    minimize: false
  }
}

// ESM minified, rdflib external
const esmMinified = {
  ...common,
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'solid-ui.esm.min.js',
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
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'solid-ui.esm.js',
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

export default [
  minified,
  unminified,
  esmMinified,
  esmUnminified
]
