module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
      "@storybook/addon-links",
      // {
      //   name: '@storybook/addon-docs', 
      //   options: {
      //     //configureJSX: true,
      //     //sourceLoaderOptions: null,
      //     mdxBabelOptions: { babelrc: true, configFile: true }
      //   },
      // },
      '@storybook/addon-essentials',
  ],
  core: {
    builder: "webpack5"
  }
}