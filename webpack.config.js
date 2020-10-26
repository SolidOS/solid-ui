const path = require('path')

module.exports = [{
  mode: 'development',
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'webpack-bundle.js'
  },
  plugins: [
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
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify")
    }
  }
}]
