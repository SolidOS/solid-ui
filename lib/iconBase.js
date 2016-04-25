
// Works in FF extension - what about browserify??

if (module.scriptURI) {
  module.exports  = '' +
    module.scriptURI.slice(0, module.scriptURI.lastIndexOf('/')) + '/icons/'
    dump('Icon base is: ' + module.exports + '\n')
} else {
  module.exports = __dirname + 'icons/'
}
