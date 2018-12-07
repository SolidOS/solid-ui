// Namespaces we commonly use and have common prefixes for around Solid
//

const solidNamespace = require('solid-namespace') // Delegate to this which takes RDFlib as param.
const $rdf = require('rdflib')

module.exports = solidNamespace($rdf)

// ends
