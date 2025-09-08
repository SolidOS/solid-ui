const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// module.exports = [{
module.exports = (env, args) => {
  const production = args.mode === 'production'
  return {
    mode: args.mode || 'development',
    entry: './src/index.ts',
    output: {
      path: path.join(__dirname, '/dist/'),
      publicPath: '',
      filename: production ? 'solid-ui.min.js' : 'solid-ui.js',
      library: 'solid-ui',
      libraryTarget: 'umd'
    },
    plugins: [
      new HtmlWebpackPlugin() // plugin that creates in /lib the index.html that contains the webpack-bundle.js
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
}
