import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

const externalsBase = {
  fs: 'null',
  'node-fetch': 'fetch',
  'isomorphic-fetch': 'fetch',
  xmldom: 'window',
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
    extensions: ['.ts', '.js'],
    fallback: { path: false }
  },
  devServer: {
    static: './dist'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.sparql$/i,
      type: 'asset/source'
    }, {
      test: /\.ttl$/i,
      type: 'asset/source'
    }]
  }
}

// Minified, rdflib external
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

// Unminified, rdflib external
const unminified = {
  ...common,
  mode: 'development',
  output: {
    ...common.output,
    filename: 'solid-ui.js'
  },
  externals: externalsWithRdflib,
  optimization: {
    minimize: false
  }
}

// Minified, rdflib bundled
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

// Unminified, rdflib bundled
const unminifiedWithRdflib = {
  ...common,
  mode: 'development',
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
    filename: 'solid-ui.esm..external.min.js',
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
  mode: 'development',
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
