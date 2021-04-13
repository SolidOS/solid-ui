
// Works in FF extension - what about browserify??
// 2021-04-08 Convert to TS

/* The Firefox case is left for historical record, as we don't currenly
 * have a FF extension for mashlib, but we could.  This is sthepoint to
 * hack the place it can find its icons internally
 *
 * The $SolidTestEnvironment is important and is used for
 * example when testing on localhost to specify a place the icons be found
 * in your test set up.
 *
 * You can also use it if you want to just run a mashlib whhich takes its
 * icons seved by other than github.
*/
/* eslint-disable multiline-ternary */

import { log } from './debug'

declare let $SolidTestEnvironment

// Do not export. lways us this module to find the icons, as it varies
const iconsOnGithub = 'https://solid.github.io/solid-ui/src'

export const icons =
  (module as any).scriptURI // Firefox extension
    ? {
        iconBase: (module as any).scriptURI.slice(0, (module as any).scriptURI.lastIndexOf('/')) +
       '/icons/',
        originalIconBase: (module as any).scriptURI.slice(0, (module as any).scriptURI.lastIndexOf('/')) +
       '/originalIcons/'
      }
    : (typeof $SolidTestEnvironment !== 'undefined' &&
  $SolidTestEnvironment.iconBase) // Test environemnt
        ? {
            iconBase: $SolidTestEnvironment.iconBase,
            originalIconBase: $SolidTestEnvironment.originalIconBase

          } : { // Normal case:
            iconBase: iconsOnGithub + '/icons/',
            originalIconBase: iconsOnGithub + '/originalIcons/'
          }

log('   icons.iconBase is set to : ' + icons.iconBase)
export const testIconBase = icons.iconBase
