import path from 'path'

/**
 * This file contains config options for babel using Lit decorators.
 *
 * @see https://lit.dev/docs/components/decorators/#using-decorators-with-babel
 */

const pathsUsingDecorators = ['src/design-system']

export const litDecoratorsLoaderOptions = {
  cacheDirectory: true,
  assumptions: {
    setPublicClassFields: false
  },
  plugins: [
    '@babel/plugin-transform-class-static-block',
    ['@babel/plugin-transform-typescript', { allowDeclareFields: true }],
    ['@babel/plugin-proposal-decorators', { version: '2023-05' }],
    ['@babel/plugin-transform-class-properties', { loose: true }]
  ]
}

export function resolvePathsUsingDecorators (projectRoot) {
  return pathsUsingDecorators.map((_path) => path.resolve(projectRoot, _path))
}
