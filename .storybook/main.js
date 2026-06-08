import path from 'path'
import Icons from 'unplugin-icons/webpack'
import { fileURLToPath } from 'url'

import iconsConfig from '../config/icons.mjs'
import postCSSConfig from '../config/postcss.mjs'
import { litDecoratorsLoaderOptions, resolvePathsUsingDecorators } from '../config/babel.mjs'
import { excludePathsFromRules } from '../config/webpack.mjs'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export default {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-webpack5-compiler-swc'
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

    // Configure Lit decorators
    const pathsUsingDecorators = resolvePathsUsingDecorators(projectRoot)

    config.module.rules.unshift({
      test: /\.(mjs|js|ts|tsx)$/,
      include: pathsUsingDecorators,
      use: {
        loader: 'babel-loader',
        options: litDecoratorsLoaderOptions,
      }
    })

    excludePathsFromRules(config.module?.rules, pathsUsingDecorators)

    // Configure icons
    config.plugins.push(Icons(iconsConfig))

    // Configure component styles
    const litCssPattern = /\.styles\.css$/

    config.module.rules = config.module.rules.map(rule => {
      if (rule?.test?.test?.('component.css')) {
        return {
          ...rule,
          exclude: [
            ...(Array.isArray(rule.exclude) ? rule.exclude : rule.exclude ? [rule.exclude] : []),
            litCssPattern
          ]
        }
      }

      return rule
    })

    config.module.rules.push({
      test: litCssPattern,
      loader: 'lit-css-loader',
      options: postCSSConfig
    })

    return config
  }
}
