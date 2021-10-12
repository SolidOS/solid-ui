const path = require('path')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = [{
  mode: 'development',
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'webpack-bundle.js'
  },
  plugins: [
    new NodePolyfillPlugin()
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
  devServer: {
    contentBase: './dist'
  },
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.sparql$/i,
        use: 'raw-loader',
      },
      {
        test: /\.ttl$/i,
        use: 'raw-loader',
      },
   ]
 },



}]
