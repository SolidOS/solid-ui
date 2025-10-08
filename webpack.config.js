import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

const externalsBase = {
  'fs': 'null',
  'node-fetch': 'fetch',
  'isomorphic-fetch': 'fetch',
  '@xmldom/xmldom': 'window',
  'text-encoding': 'TextEncoder',
  'whatwg-url': 'window',
  '@trust/webcrypto': 'crypto'
}

// rdflib externalized
const externalsWithoutRdflib = {
  ...externalsBase,
  rdflib: '$rdf'
}

// rdflib bundled
const externalsWithRdflib = {
  ...externalsBase
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
    iife: true,
    clean: false
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    extensionAlias: {
    '.js': ['.js', '.ts'], 
    '.mjs': ['.mjs', '.mts'],
    },
    fallback: { path: false }
  },
  devServer: {
    static: './dist'
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

// UMD Minified, rdflib bundled
const minified = {
  ...common,
  mode: 'production',
  output: {
    ...common.output,
    filename: 'solid-ui.min.js'
  },
  externals: externalsWithRdflib,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })]
  }
}

// UMD Unminified, rdflib bundled
const unminified = {
  ...common,
  mode: 'production',
  output: {
    ...common.output,
    filename: 'solid-ui.js'
  },
  externals: externalsWithRdflib,
  optimization: {
    minimize: false
  }
}

// UMD Minified, rdflib external
const minifiedWithRdflib = {
  ...common,
  mode: 'production',
  output: {
    ...common.output,
    filename: 'solid-ui.external.min.js'
  },
  externals: externalsWithoutRdflib,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })]
  }
}

// UMD Unminified, rdflib external
const unminifiedWithRdflib = {
  ...common,
  mode: 'production',
  output: {
    ...common.output,
    filename: 'solid-ui.external.js'
  },
  externals: externalsWithoutRdflib,
  optimization: {
    minimize: false
  }
}

// ESM minified, rdflib external
const esmMinified = {
  ...common,
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'solid-ui.esm.external.min.js',
    library: {
      type: 'module'
    },
    environment: { module: true },
    clean: false
  },
  externals: externalsWithoutRdflib,
  experiments: {
    outputModule: true
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })]
  }
}

// ESM unminified, rdflib external
const esmUnminified = {
  ...common,
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'solid-ui.esm.external.js',
    library: {
      type: 'module'
    },
    environment: { module: true },
    clean: false
  },
  externals: externalsWithoutRdflib,
  experiments: {
    outputModule: true
  },
  mode: 'production',
  optimization: {
    minimize: false
  }
}

export default [
  minified,
  unminified,
  minifiedWithRdflib,
  unminifiedWithRdflib,
  esmMinified,
  esmUnminified
]
