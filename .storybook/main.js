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
    // For Storybook, we want to bundle rdflib and solid-logic from devDependencies
    // instead of externalizing them, so we DON'T add them to externals

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

    // Add module name mapping to resolve the external references
    config.resolve.alias = {
      ...config.resolve.alias,
      $rdf: require.resolve('rdflib'),
      SolidLogic: require.resolve('solid-logic')
    }

    // Ensure solid-logic is not treated as external for Storybook
    if (config.externals) {
      if (Array.isArray(config.externals)) {
        config.externals = config.externals.filter(external => {
          if (typeof external === 'string') return !['rdflib', 'solid-logic', '$rdf', 'SolidLogic'].includes(external)
          if (typeof external === 'object') {
            delete external['rdflib']
            delete external['solid-logic']
            delete external['$rdf']
            delete external['SolidLogic']
          }
          return true
        })
      } else if (typeof config.externals === 'object') {
        delete config.externals['rdflib']
        delete config.externals['solid-logic']
        delete config.externals['$rdf']
        delete config.externals['SolidLogic']
      }
    }

    return config
  }
}
