// For backward compatibility, provide rdflib and solid-logic as globals
import * as rdflib from 'rdflib'
import * as solidLogic from 'solid-logic'

// Some legacy code might expect these as globals
if (typeof window !== 'undefined') {
  window.$rdf = rdflib
  window.SolidLogic = solidLogic
}

export const parameters = {}
