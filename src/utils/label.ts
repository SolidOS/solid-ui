import * as log from '../log'
import { store } from 'solid-logic'
import * as ns from '../ns'
import * as rdf from 'rdflib' // pull in first avoid cross-refs

const UI = { log, ns, rdf }

// This ubiquitous function returns the best label for a thing
//
// The hacks in this code make a major difference to the usability
export function label (thing, initialCap = false): string {
  function doCap (label: string) {
    if (initialCap) {
      return label.slice(0, 1).toUpperCase() + label.slice(1)
    }
    return label
  }
  function cleanUp (label: string) {
    let result = ''
    if (label.slice(-1) === '/') label = label.slice(0, -1) // chop trailing slash
    for (let i = 0; i < label.length; i++) {
      if (label[i] === '_' || label[i] === '-') {
        result += ' '
        continue
      }
      result += label[i]
      if (
        i + 1 < label.length &&
        label[i].toUpperCase() !== label[i] &&
        label[i + 1].toLowerCase() !== label[i + 1]
      ) {
        result += ' '
      }
    }
    if (result.slice(0, 4) === 'has ') result = result.slice(4)
    return doCap(result)
  }

  const label = getWellKnownLabel(thing)

  if (label) {
    return doCap(label.value)
  }

  // Default to label just generated from the URI

  if (thing.termType === 'BlankNode') {
    return '...'
  }
  if (thing.termType === 'Collection') {
    return '(' + thing.elements.length + ')'
  }
  let s = thing.uri
  if (typeof s === 'undefined') return thing.toString() // can't be a symbol
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

  s = slice(s, '/profile/card#me')
  s = slice(s, '#this')
  s = slice(s, '#me')

  const hash = s.indexOf('#')
  if (hash >= 0) return cleanUp(s.slice(hash + 1))

  // Eh? Why not do this? e.g. dc:title needs it only trim URIs, not rdfs:labels
  const slash = s.lastIndexOf('/', s.length - 2) // (len-2) excludes trailing slash
  if (slash >= 0 && slash < thing.uri.length) return cleanUp(s.slice(slash + 1))

  return doCap(decodeURIComponent(thing.uri))
}

function slice (s: string, suffix: string) {
  const length = suffix.length * -1
  if (s.slice(length) === suffix) {
    return s.slice(0, length)
  }
  return s
}

// Hard coded known label predicates
//  @@ TBD: Add subproperties of rdfs:label
function getWellKnownLabel (thing) {
  return store.any(thing, UI.ns.ui('label')) || // Prioritize ui:label
      store.any(thing, UI.ns.link('message')) ||
      store.any(thing, UI.ns.vcard('fn')) ||
      store.any(thing, UI.ns.foaf('name')) ||
      store.any(thing, UI.ns.dct('title')) ||
      store.any(thing, UI.ns.dc('title')) ||
      store.any(thing, UI.ns.rss('title')) ||
      store.any(thing, UI.ns.contact('fullName')) ||
      store.any(thing, store.sym('http://www.w3.org/2001/04/roadmap/org#name')) ||
      store.any(thing, UI.ns.cal('summary')) ||
      store.any(thing, UI.ns.foaf('nick')) ||
      store.any(thing, UI.ns.as('name')) ||
      store.any(thing, UI.ns.schema('name')) ||
      store.any(thing, UI.ns.rdfs('label'))
}
