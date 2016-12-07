
// Works in FF extension - what about browserify??

if (module.scriptURI) { // FF extension
  module.exports.iconBase  = '' +
    module.scriptURI.slice(0, module.scriptURI.lastIndexOf('/')) + '/icons/'
    module.exports.originalIconBase  = '' +
      module.scriptURI.slice(0, module.scriptURI.lastIndexOf('/')) + '/originalIcons/'
} else { // Node or browserify
  var iconsOnGithub = 'https://melvincarvalho.github.io/solid-ui/static'

  if (typeof $SolidTestEnvironment !== 'undefined' && $SolidTestEnvironment.iconBase ){
    module.exports.iconBase = $SolidTestEnvironment.iconBase
    module.exports.originalIconBase = $SolidTestEnvironment.originalIconBase
  } else {
    module.exports.iconBase = iconsOnGithub + '/icons/'
    module.exports.originalIconBase = iconsOnGithub + '/originalIcons/'
  }
}
console.log('   Icon base is: ' + module.exports.iconBase)
