const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [{
  mode: 'development',
  entry: './lib/index.js',
  plugins: [
    new HtmlWebpackPlugin() // plugin that creats in /lib the index.html that contains the webpack-bundle.js
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
    fallback: { path: false }
  },
  devServer: {
    static: './dist'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.sparql$/i,
      type: 'asset/source'
    },
    {
      test: /\.ttl$/i,
      type: 'asset/source'
    }
    ]
  }
}]
