const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, '/dist/'),
    publicPath: '',
    library: 'solid-ui',
    libraryTarget: 'umd'
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  externals: {
    fs: 'null',
    'node-fetch': 'fetch',
    'isomorphic-fetch': 'fetch',
    xmldom: 'window',
    'text-encoding': 'TextEncoder',
    'whatwg-url': 'window',
    '@trust/webcrypto': 'crypto'
  },
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

const minified = {
  ...common,
  mode: 'production',
  output: {
    ...common.output,
    filename: 'solid-ui.min.js'
  },
  optimization: {
    minimize: true
  }
}

const unminified = {
  ...common,
  mode: 'development',
  output: {
    ...common.output,
    filename: 'solid-ui.js'
  },
  optimization: {
    minimize: false
  }
}

module.exports = [minified, unminified]
