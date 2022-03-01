// needed for storybook 7. see: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-default-postcss-plugins
module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      flexbox: 'no-2009'
    })
  ]
}
