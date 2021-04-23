// Namespaces we commonly use and have common prefixes for around Solid
//

import solidNamespace from 'solid-namespace' // Delegate to this which takes RDFlib as param.
import * as $rdf from 'rdflib'

module.exports = solidNamespace($rdf)
// export * from ns2

// ends
