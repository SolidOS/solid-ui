
// Works in FF extension - what about browserify??

if (module.scriptURI) { // FF extension
  module.exports.iconBase  = '' +
    module.scriptURI.slice(0, module.scriptURI.lastIndexOf('/')) + '/icons/'
    module.exports.originalIconBase  = '' +
      module.scriptURI.slice(0, module.scriptURI.lastIndexOf('/')) + '/originalIcons/'
} else { // Node or browserify
  module.exports.iconBase = __dirname + 'icons/'
  module.exports.originalIconBase = __dirname + 'originalIcons/'
}
dump('   Icon base is: ' + module.exports.iconBase + '\n')
