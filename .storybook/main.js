export default {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-essentials',
    '@storybook/addon-mdx-gfm'
  ],

  framework: {
    name: '@storybook/html-webpack5',
    options: {}
  },

  docs: {
    autodocs: true
  }
}
