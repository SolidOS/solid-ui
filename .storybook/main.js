export default {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-essentials'
  ],

  framework: {
    name: '@storybook/html-webpack5',
    options: {}
  },

  docs: {
    autodocs: true
  },
  webpackFinal: async (config) => {
    // For Storybook, we DON'T externalize rdflib and solid-logic
    // Instead, we let webpack bundle them from node_modules

    // Handle Node.js modules for browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      path: false,
      fs: false,
      crypto: false,
      stream: false,
      util: false,
      buffer: false
    }

    // Alias $rdf to rdflib for solid-logic compatibility
    config.resolve.alias = {
      ...config.resolve.alias,
      $rdf: 'rdflib'
    }

    return config
  }
}
