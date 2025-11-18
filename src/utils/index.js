//                  Solid-UI general Utilities
//                  ==========================
//
// This must load AFTER the rdflib.js and log-ext.js (or log.js).
//
import * as log from '../log'
import { store } from 'solid-logic'
import ns from '../ns'
import * as rdf from 'rdflib' // pull in first avoid cross-refs
import { label } from './label'

const UI = { log, ns, rdf }

export {
  addLoadEvent, // not used anywhere
  AJARImage,
  ancestor,
  beep,
  clearVariableNames,
  emptyNode,
  escapeForXML,
  findPos,
  genUuid,
  getAbout,
  getEyeFocus,
  getTarget,
  getTerm,
  hashColor,
  include,
  label,
  labelForXML,
  labelWithOntology,
  newVariableName,
  ontologyLabel,
  predicateLabel,
  predicateLabelForXML,
  predParentOf,
  RDFComparePredicateObject,
  RDFComparePredicateSubject,
  shortName,
  stackString,
  syncTableToArray,
  syncTableToArrayReOrdered
}

let nextVariable = 0

function newVariableName () {
  return 'v' + nextVariable++
}

function clearVariableNames () {
  nextVariable = 0
}

// http://stackoverflow.com/questions/879152/how-do-i-make-javascript-beep
// http://www.tsheffler.com/blog/2013/05/14/audiocontext-noteonnoteoff-and-time-units/

let audioContext

if (typeof AudioContext !== 'undefined') {
  audioContext = AudioContext
} else if (typeof window !== 'undefined') {
  audioContext = window.AudioContext || window.webkitAudioContext
}

function beep () {
  if (!audioContext) {
    return
  } // Safari 2015

  const ContextClass = audioContext
  const ctx = new ContextClass()

  return function (duration, frequency, type, finishedCallback) {
    duration = +(duration || 0.3)

    // Only 0-4 are valid types.
    type = type || 'sine' // sine, square, sawtooth, triangle

    if (typeof finishedCallback !== 'function') {
      finishedCallback = function () {}
    }

    const osc = ctx.createOscillator()

    osc.type = type
    osc.frequency.value = frequency || 256

    osc.connect(ctx.destination)
    osc.start(0)
    osc.stop(duration)
  }
}

// Make pseudorandom color from a uri
// NOT USED ANYWHERE
function hashColor (who) {
  who = who.uri || who
  const hash = function (x) {
    return x.split('').reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)
  }
  return '#' + ((hash(who) & 0xffffff) | 0xc0c0c0).toString(16) // c0c0c0 or 808080 forces pale
}

function genUuid () {
  // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/** Sync a DOM table with an array of things
 *
 * @param {DomElement} table - will have a tr for each thing
 * @param {Array<NamedNode>} things - ORDERED array of NamedNode objects
 * @param {function({NamedNode})} createNewRow(thing) returns a TR table row for a new thing
 *
 * Tolerates out of order elements but puts new ones in order.
 * Can be used for any element type; does not have to be a table and tr.
 */
function syncTableToArray (table, things, createNewRow) {
  let foundOne
  let row
  let i

  for (i = 0; i < table.children.length; i++) {
    row = table.children[i]
    row.trashMe = true
  }

  for (let g = 0; g < things.length; g++) {
    const thing = things[g]
    foundOne = false

    for (i = 0; i < table.children.length; i++) {
      row = table.children[i]
      if (row.subject && row.subject.sameTerm(thing)) {
        row.trashMe = false
        foundOne = true
        break
      }
    }
    if (!foundOne) {
      const newRow = createNewRow(thing)
      // Insert new row in position g in the table to match array
      if (g >= table.children.length) {
        table.appendChild(newRow)
      } else {
        const ele = table.children[g]
        table.insertBefore(newRow, ele)
      }
      newRow.subject = thing
    } // if not foundOne
  } // loop g

  for (i = 0; i < table.children.length; i++) {
    row = table.children[i]
    if (row.trashMe) {
      table.removeChild(row)
    }
  }
} // syncTableToArray

/** Sync a DOM table with an array of things
 *
 * @param {DomElement} table - will have a tr for each thing
 * @param {Array<NamedNode>} things - ORDERED array of UNIQUE NamedNode objects. No duplicates
 * @param {function({NamedNode})} createNewRow(thing) returns a rendering of a new thing
 *
 * Ensures order matches exacly.  We will re-rder existing elements if necessary
 * Can be used for any element type; does not have to be a table and tr.
 * Any RDF node value can only appear ONCE in the array
 */
function syncTableToArrayReOrdered (table, things, createNewRow) {
  const elementMap = {}

  for (let i = 0; i < table.children.length; i++) {
    const row = table.children[i]
    elementMap[row.subject.toNT()] = row // More sophisticaed would be to have a bag of duplicates
  }

  for (let g = 0; g < things.length; g++) {
    const thing = things[g]
    if (g >= table.children.length) { // table needs extending
      const newRow = createNewRow(thing)
      newRow.subject = thing
      table.appendChild(newRow)
    } else {
      const row = table.children[g]
      if (row.subject.sameTerm(thing)) {
        // ...
      } else {
        const existingRow = elementMap[thing.toNT()]
        if (existingRow) {
          table.removeChild(existingRow)
          table.insertBefore(existingRow, row) // Insert existing row in place of this one
        } else {
          const newRow = createNewRow(thing)
          row.before(newRow) // Insert existing row in place of this one
          newRow.subject = thing
        }
      }
    }
  } // loop g
  // Lop off any we don't need any more:
  while (table.children.length > things.length) {
    table.removeChild(table.children[table.children.length - 1])
  }
} // syncTableToArrayReOrdered

/* Error stack to string for better diagnotsics
 **
 ** See  http://snippets.dzone.com/posts/show/6632
 */
function stackString (e) {
  let str = '' + e + '\n'
  let i
  if (!e.stack) {
    return str + 'No stack available.\n'
  }
  const lines = e.stack.toString().split('\n')
  const toPrint = []
  for (i = 0; i < lines.length; i++) {
    let line = lines[i]
    if (line.indexOf('ecmaunit.js') > -1) {
      // remove useless bit of traceback
      break
    }
    if (line.charAt(0) === '(') {
      line = 'function' + line
    }
    const chunks = line.split('@')
    toPrint.push(chunks)
  }
  // toPrint.reverse();  No - I prefer the latest at the top by the error message -tbl

  for (i = 0; i < toPrint.length; i++) {
    str += '  ' + toPrint[i][1] + '\n    ' + toPrint[i][0]
  }
  return str
}

function emptyNode (node) {
  const nodes = node.childNodes
  const len = nodes.length
  for (let i = len - 1; i >= 0; i--) node.removeChild(nodes[i])
  return node
}

function getTarget (e) {
  let target
  e = e || window.event
  if (e.target) target = e.target
  else if (e.srcElement) target = e.srcElement
  if (target.nodeType === 3) {
    // defeat Safari bug [sic]
    target = target.parentNode
  }
  // UI.log.debug("Click on: " + target.tagName)
  return target
}

function ancestor (target, tagName) {
  let level
  for (level = target; level; level = level.parentNode) {
    // UI.log.debug("looking for "+tagName+" Level: "+level+" "+level.tagName)
    try {
      if (level.tagName === tagName) return level
    } catch (e) {
      // can hit "TypeError: can't access dead object" in ffox
      return undefined
    }
  }
  return undefined
}

function getAbout (kb, target) {
  let level, aa
  for (
    level = target;
    level && level.nodeType === 1;
    level = level.parentNode
  ) {
    // UI.log.debug("Level "+level + ' '+level.nodeType + ': '+level.tagName)
    aa = level.getAttribute('about')
    if (aa) {
      // UI.log.debug("kb.fromNT(aa) = " + kb.fromNT(aa))
      return kb.fromNT(aa)
      //        } else {
      //            if (level.tagName=='TR') return undefined//this is to prevent literals passing through
    }
  }
  UI.log.debug('getAbout: No about found')
  return undefined
}

function getTerm (target) {
  const statementTr = target.parentNode
  const st = statementTr ? statementTr.AJAR_statement : undefined

  const className = st ? target.className : '' // if no st then it's necessary to use getAbout
  switch (className) {
    case 'pred':
    case 'pred selected':
      return st.predicate
    case 'obj':
    case 'obj selected':
      if (!statementTr.AJAR_inverse) {
        return st.object
      } else {
        return st.subject
      }
    case '':
    case 'selected': // header TD
      return getAbout(store, target) // kb to be changed
    case 'undetermined selected':
      return target.nextSibling
        ? st.predicate
        : !statementTr.AJAR_inverse
            ? st.object
            : st.subject
  }
}

function include (document, linkstr) {
  const lnk = document.createElement('script')
  lnk.setAttribute('type', 'text/javascript')
  lnk.setAttribute('src', linkstr)
  // TODO:This needs to be fixed or no longer used.
  // document.getElementsByTagName('head')[0].appendChild(lnk)
  return lnk
}

function addLoadEvent (func) {
  const oldonload = window.onload
  if (typeof window.onload !== 'function') {
    window.onload = func
  } else {
    window.onload = function () {
      oldonload()
      func()
    }
  }
} // addLoadEvent

// Find the position of an object relative to the window
function findPos (obj) {
  // C&P from http://www.quirksmode.org/js/findpos.html
  const myDocument = obj.ownerDocument
  const DocBox = myDocument.documentElement.getBoundingClientRect()
  const box = obj.getBoundingClientRect()
  return [box.left - DocBox.left, box.top - DocBox.top]
}

function getEyeFocus (element, instantly, isBottom, myWindow) {
  if (!myWindow) myWindow = window
  const elementPosY = findPos(element)[1]
  const appContext = window.SolidAppContext || {}
  const scrollDiff = (appContext && appContext.scroll) || 52 // 52 = magic number for web-based version
  const totalScroll = elementPosY - scrollDiff - myWindow.scrollY

  if (instantly) {
    if (isBottom) {
      myWindow.scrollBy(
        0,
        elementPosY +
        element.clientHeight -
        (myWindow.scrollY + myWindow.innerHeight)
      )
      return
    }
    myWindow.scrollBy(0, totalScroll)
    return
  }
  const id = myWindow.setInterval(scrollAmount, 50)
  let times = 0
  function scrollAmount () {
    myWindow.scrollBy(0, totalScroll / 10)
    times++
    if (times === 10) {
      myWindow.clearInterval(id)
    }
  }
}

function AJARImage (src, alt, tt, doc) {
  if (!doc) {
    doc = document
  }
  const image = doc.createElement('img')
  image.setAttribute('src', src)
  image.addEventListener('copy', function (e) {
    e.clipboardData.setData('text/plain', '')
    e.clipboardData.setData('text/html', '')
    e.preventDefault() // We want no title data to be written to the clipboard
  })
  //    if (typeof alt != 'undefined')      // Messes up cut-and-paste of text
  //        image.setAttribute('alt', alt)
  if (typeof tt !== 'undefined') {
    image.setAttribute('title', tt)
  }
  return image
}

//  Make short name for ontology

function shortName (uri) {
  let p = uri
  if ('#/'.indexOf(p[p.length - 1]) >= 0) p = p.slice(0, -1)
  const namespaces = []
  for (const ns in this.prefixes) {
    namespaces[this.prefixes[ns]] = ns // reverse index
  }
  let pok
  const canUse = function canUse (pp) {
    // if (!__Serializer.prototype.validPrefix.test(pp)) return false; // bad format
    if (pp === 'ns') return false // boring
    // if (pp in this.namespaces) return false; // already used
    // this.prefixes[uri] = pp;
    // this.namespaces[pp] = uri;
    pok = pp
    return true
  }

  let i
  const hash = p.lastIndexOf('#')
  if (hash >= 0) p = p.slice(hash - 1) // lop off localid
  // eslint-disable-next-line no-unreachable-loop
  for (;;) {
    const slash = p.lastIndexOf('/')
    if (slash >= 0) p = p.slice(slash + 1)
    i = 0
    while (i < p.length) {
      if (this.prefixchars.indexOf(p[i])) i++
      else break
    }
    p = p.slice(0, i)
    if (p.length < 6 && canUse(p)) return pok // exact i sbest
    if (canUse(p.slice(0, 3))) return pok
    if (canUse(p.slice(0, 2))) return pok
    if (canUse(p.slice(0, 4))) return pok
    if (canUse(p.slice(0, 1))) return pok
    if (canUse(p.slice(0, 5))) return pok
    for (i = 0; ; i++) if (canUse(p.slice(0, 3) + i)) return pok
  }
}

// Short name for an ontology
function ontologyLabel (term) {
  if (term.uri === undefined) return '??'
  let s = term.uri
  const namespaces = []
  let i = s.lastIndexOf('#')
  let part
  if (i >= 0) {
    s = s.slice(0, i + 1)
  } else {
    i = s.lastIndexOf('/')
    if (i >= 0) {
      s = s.slice(0, i + 1)
    } else {
      return term.uri + '?!' // strange should have # or /
    }
  }
  for (const ns in UI.ns) {
    namespaces[UI.ns[ns]] = ns // reverse index
  }
  try {
    return namespaces[s]
  } catch (e) {}

  s = s.slice(0, -1) // Chop off delimiter ... now have just

  while (s) {
    i = s.lastIndexOf('/')
    if (i >= 0) {
      part = s.slice(i + 1)
      s = s.slice(0, i)
      if (part !== 'ns' && '0123456789'.indexOf(part[0]) < 0) {
        return part
      }
    } else {
      return term.uri + '!?' // strange should have a nice part
    }
  }
}

function labelWithOntology (x, initialCap) {
  const t = store.findTypeURIs(x)
  if (t[UI.ns.rdf('Predicate').uri] || t[UI.ns.rdfs('Class').uri]) {
    return label(x, initialCap) + ' (' + ontologyLabel(x) + ')'
  }
  return label(x, initialCap)
}

function escapeForXML (str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;')
}

//  As above but escaped for XML and chopped of contains a slash
function labelForXML (x) {
  return escapeForXML(label(x))
}

function predicateLabelForXML (p, inverse) {
  return escapeForXML(predicateLabel(p, inverse))
}
// As above but for predicate, possibly inverse
function predicateLabel (p, inverse) {
  const lab = label(p)
  if (inverse) {
    // If we know an inverse predicate, use its label
    const ip = store.any(p, UI.ns.owl('inverseOf')) || store.any(undefined, UI.ns.owl('inverseOf'), p)
    if (ip) return label(ip)
    if (lab === 'type') return '...' // Not "is type of"
    return 'is ' + lab + ' of'
  }
  return lab
}

// Not a method. For use in sorts
function RDFComparePredicateObject (self, other) {
  const x = self.predicate.compareTerm(other.predicate)
  if (x !== 0) return x
  return self.object.compareTerm(other.object)
}

function RDFComparePredicateSubject (self, other) {
  const x = self.predicate.compareTerm(other.predicate)
  if (x !== 0) return x
  return self.subject.compareTerm(other.subject)
}
// ends

function predParentOf (node) {
  let n = node
  while (true) {
    if (n.getAttribute('predTR')) {
      return n
    } else if (n.previousSibling && n.previousSibling.nodeName === 'TR') {
      n = n.previousSibling
    } else {
      UI.log.error('Could not find predParent')
      return node
    }
  }
}

// makeQueryRow moved to outline mode
