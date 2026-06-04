import type { StorybookConfig } from '@storybook/web-components-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.ts'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/web-components-vite',

  async viteFinal (config) {
    return mergeConfig(config, {
      resolve: {
        dedupe: ['lit', 'lit-html', 'lit-element', '@lit/reactive-element'],
      },
      optimizeDeps: {
        include: ['lit/directive-helpers.js'],
      },
    })
  },
}

export default config
