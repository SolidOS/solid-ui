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
import { log } from './debug';
// Do not export. Always us this module to find the icons, as they vary
const iconsOnGithub = 'https://solidos.github.io/solid-ui/src'; // changed org 2022-05
export const icons = module.scriptURI // Firefox extension
    ? {
        iconBase: module.scriptURI.slice(0, module.scriptURI.lastIndexOf('/')) + '/icons/',
        originalIconBase: module.scriptURI.slice(0, module.scriptURI.lastIndexOf('/')) +
            '/originalIcons/'
    }
    : typeof $SolidTestEnvironment !== 'undefined' && $SolidTestEnvironment.iconBase // Test environemnt
        ? {
            iconBase: $SolidTestEnvironment.iconBase,
            originalIconBase: $SolidTestEnvironment.originalIconBase
        }
        : {
            // Normal case:
            iconBase: iconsOnGithub + '/icons/',
            originalIconBase: iconsOnGithub + '/originalIcons/'
        };
log('   icons.iconBase is set to : ' + icons.iconBase);
// allow tests etc  named-import this directly from this module
export const iconBase = icons.iconBase;
export const originalIconBase = icons.originalIconBase;
//# sourceMappingURL=iconBase.js.map