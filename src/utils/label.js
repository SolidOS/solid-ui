import * as log from '../log'
import { store } from '../logic'
import * as ns from '../ns'
import * as rdf from 'rdflib' // pull in first avoid cross-refs

const UI = { log, ns, rdf, store }

// This ubiquitous function returns the best label for a thing
//
//  The hacks in this code make a major difference to the usability
//
// @returns string
//
export function label (x, initialCap) {
  // x is an object
  function doCap (s) {
    // s = s.toString()
    if (initialCap) return s.slice(0, 1).toUpperCase() + s.slice(1)
    return s
  }
  function cleanUp (s1) {
    let s2 = ''
    if (s1.slice(-1) === '/') s1 = s1.slice(0, -1) // chop trailing slash
    for (let i = 0; i < s1.length; i++) {
      if (s1[i] === '_' || s1[i] === '-') {
        s2 += ' '
        continue
      }
      s2 += s1[i]
      if (
        i + 1 < s1.length &&
        s1[i].toUpperCase() !== s1[i] &&
        s1[i + 1].toLowerCase() !== s1[i + 1]
      ) {
        s2 += ' '
      }
    }
    if (s2.slice(0, 4) === 'has ') s2 = s2.slice(4)
    return doCap(s2)
  }

  // Hard coded known label predicates
  //  @@ TBD: Add subproperties of rdfs:label

  const kb = UI.store
  const lab1 =
    kb.any(x, UI.ns.ui('label')) || // Prioritize ui:label
    kb.any(x, UI.ns.link('message')) ||
    kb.any(x, UI.ns.vcard('fn')) ||
    kb.any(x, UI.ns.foaf('name')) ||
    kb.any(x, UI.ns.dct('title')) ||
    kb.any(x, UI.ns.dc('title')) ||
    kb.any(x, UI.ns.rss('title')) ||
    kb.any(x, UI.ns.contact('fullName')) ||
    kb.any(x, kb.sym('http://www.w3.org/2001/04/roadmap/org#name')) ||
    kb.any(x, UI.ns.cal('summary')) ||
    kb.any(x, UI.ns.foaf('nick')) ||
    kb.any(x, UI.ns.as('name')) ||
    kb.any(x, UI.ns.schema('name')) ||
    kb.any(x, UI.ns.rdfs('label'))

  if (lab1) {
    return doCap(lab1.value)
  }

  // Default to label just generated from the URI

  if (x.termType === 'BlankNode') {
    return '...'
  }
  if (x.termType === 'Collection') {
    return '(' + x.elements.length + ')'
  }
  let s = x.uri
  if (typeof s === 'undefined') return x.toString() // can't be a symbol
  // s = decodeURI(s) // This can crash is random valid @ signs are presentation
  // The idea was to clean up eg URIs encoded in query strings
  // Also encoded character in what was filenames like @ [] {}
  try {
    s = s
      .split('/')
      .map(decodeURIComponent)
      .join('/') // If it is properly encoded
  } catch (e) {
    // try individual decoding of ASCII code points
    for (let i = s.length - 3; i > 0; i--) {
      const hex = '0123456789abcefABCDEF' // The while upacks multiple layers of encoding
      while (
        s[i] === '%' &&
        hex.indexOf(s[i + 1]) >= 0 &&
        hex.indexOf(s[i + 2]) >= 0
      ) {
        s =
          s.slice(0, i) +
          String.fromCharCode(parseInt(s.slice(i + 1, i + 3), 16)) +
          s.slice(i + 3)
      }
    }
  }
  if (s.slice(-5) === '#this') s = s.slice(0, -5)
  else if (s.slice(-3) === '#me') s = s.slice(0, -3)

  const hash = s.indexOf('#')
  if (hash >= 0) return cleanUp(s.slice(hash + 1))

  if (s.slice(-9) === '/foaf.rdf') s = s.slice(0, -9)
  else if (s.slice(-5) === '/foaf') s = s.slice(0, -5)

  // Eh? Why not do this? e.g. dc:title needs it only trim URIs, not rdfs:labels
  const slash = s.lastIndexOf('/', s.length - 2) // (len-2) excludes trailing slash
  if (slash >= 0 && slash < x.uri.length) return cleanUp(s.slice(slash + 1))

  return doCap(decodeURIComponent(x.uri))
}
