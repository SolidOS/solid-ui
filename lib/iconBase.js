
// Works in FF extension - what about browserify??

if (module.scriptURI) { // FF extension
  module.exports.iconBase  = '' +
    module.scriptURI.slice(0, module.scriptURI.lastIndexOf('/')) + '/icons/'
    module.exports.originalIconBase  = '' +
      module.scriptURI.slice(0, module.scriptURI.lastIndexOf('/')) + '/originalIcons/'
} else { // Node or browserify
  var iconsOnGithub  = 'https://linkeddata.github.io/solid-ui/lib'
  module.exports.iconBase = iconsOnGithub + '/icons/'
  module.exports.originalIconBase = iconsOnGithub + '/originalIcons/'
  // module.exports.iconBase = __dirname + '/icons/'
  // module.exports.originalIconBase = __dirname + '/originalIcons/'
}
console.log('   Icon base is: ' + module.exports.iconBase)
