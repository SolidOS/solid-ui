export default {
  presets: [
    ['@babel/preset-env', { 
      targets: { 
        browsers: ['> 1%', 'last 3 versions', 'not dead']
      }
    }],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
}
