//                  Solid-UI general Utilities
//                  ==========================
//
// This must load AFTER the rdflib.js and log-ext.js (or log.js).
//

module.exports = {
  addLoadEvent,  // not used anywhere
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
  makeQueryRow,
  newVariableName,
  ontologyLabel,
  predicateLabelForXML,
  predParentOf,
  RDFComparePredicateObject,
  RDFComparePredicateSubject,
  shortName,
  stackString,
  syncTableToArray
}

var UI = {
  log: require('./log'),
  ns: require('./ns'),
  rdf: require('rdflib'),
  store: require('./store')
}

var nextVariable = 0

function newVariableName () {
  return 'v' + nextVariable++
}

function clearVariableNames () {
  nextVariable = 0
}

// http://stackoverflow.com/questions/879152/how-do-i-make-javascript-beep
// http://www.tsheffler.com/blog/2013/05/14/audiocontext-noteonnoteoff-and-time-units/

var audioContext

if (typeof AudioContext !== 'undefined') {
  audioContext = AudioContext
} else if (typeof window !== 'undefined') {
  audioContext = window.AudioContext || window.webkitAudioContext
}

function beep () {
  if (!audioContext) { return }  // Safari 2015

  let ContextClass = audioContext
  let ctx = new ContextClass()

  return function (duration, frequency, type, finishedCallback) {
    duration = +(duration || 0.3)

    // Only 0-4 are valid types.
    type = type || 'sine' // sine, square, sawtooth, triangle

    if (typeof finishedCallback !== 'function') {
      finishedCallback = function () {}
    }

    var osc = ctx.createOscillator()

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
  var hash = function (x) { return x.split('').reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0) }
  return '#' + ((hash(who) & 0xffffff) | 0xc0c0c0).toString(16) // c0c0c0 or 808080 forces pale
}

function genUuid () { // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0
    var v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Sync a DOM table with an array of things
//
// table - will have a tr for each thing
// things - ORDERED array of NamedNode objects
// createNewRow(thing) returns a TR table row for that thing
//
// Tolerates out of order elements but puts new ones in order.
//
function syncTableToArray (table, things, createNewRow) {
  let foundOne
  let row
  let i

  for (i = 0; i < table.children.length; i++) {
    row = table.children[i]
    row.trashMe = true
  }

  for (let g = 0; g < things.length; g++) {
    var thing = things[g]
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
      let newRow = createNewRow(thing)
      // Insert new row in position g in the table to match array
      if (g >= things.length) {
        table.appendChild(newRow)
      } else {
        let ele = table.children[g]
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
  let lines = e.stack.toString().split('\n')
  let toPrint = []
  for (i = 0; i < lines.length; i++) {
    let line = lines[i]
    if (line.indexOf('ecmaunit.js') > -1) {
      // remove useless bit of traceback
      break
    }
    if (line.charAt(0) === '(') {
      line = 'function' + line
    }
    let chunks = line.split('@')
    toPrint.push(chunks)
  }
  // toPrint.reverse();  No - I prefer the latest at the top by the error message -tbl

  for (i = 0; i < toPrint.length; i++) {
    str += '  ' + toPrint[i][1] + '\n    ' + toPrint[i][0]
  }
  return str
}

function emptyNode (node) {
  let nodes = node.childNodes
  let len = nodes.length
  let i
  for (i = len - 1; i >= 0; i--) node.removeChild(nodes[i])
  return node
}

function getTarget (e) {
  var target
  e = e || window.event
  if (e.target) target = e.target
  else if (e.srcElement) target = e.srcElement
  if (target.nodeType === 3) { // defeat Safari bug [sic]
    target = target.parentNode
  }
  // UI.log.debug("Click on: " + target.tagName)
  return target
}

function ancestor (target, tagName) {
  var level
  for (level = target; level; level = level.parentNode) {
    // UI.log.debug("looking for "+tagName+" Level: "+level+" "+level.tagName)
    try {
      if (level.tagName === tagName) return level
    } catch (e) { // can hit "TypeError: can't access dead object" in ffox
      return undefined
    }
  }
  return undefined
}

function getAbout (kb, target) {
  var level, aa
  for (level = target; level && (level.nodeType === 1); level = level.parentNode) {
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
  var statementTr = target.parentNode
  var st = statementTr ? statementTr.AJAR_statement : undefined

  var className = st ? target.className : '' // if no st then it's necessary to use getAbout
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
      return getAbout(UI.store, target) // kb to be changed
    case 'undetermined selected':
      return (target.nextSibling) ? st.predicate : ((!statementTr.AJAR_inverse) ? st.object : st.subject)
  }
}

function include (document, linkstr) {
  var lnk = document.createElement('script')
  lnk.setAttribute('type', 'text/javascript')
  lnk.setAttribute('src', linkstr)
  // TODO:This needs to be fixed or no longer used.
  // document.getElementsByTagName('head')[0].appendChild(lnk)
  return lnk
}

function addLoadEvent (func) {
  var oldonload = window.onload
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
function findPos (obj) { // C&P from http://www.quirksmode.org/js/findpos.html
  var myDocument = obj.ownerDocument
  var DocBox = myDocument.documentElement.getBoundingClientRect()
  var box = obj.getBoundingClientRect()
  return [box.left - DocBox.left, box.top - DocBox.top]
}

function getEyeFocus (element, instantly, isBottom, myWindow) {
  if (!myWindow) myWindow = window
  var elementPosY = findPos(element)[1]
  var totalScroll = elementPosY - 52 - myWindow.scrollY // magic number 52 for web-based version
  if (instantly) {
    if (isBottom) {
      myWindow.scrollBy(0, elementPosY + element.clientHeight - (myWindow.scrollY + myWindow.innerHeight))
      return
    }
    myWindow.scrollBy(0, totalScroll)
    return
  }
  var id = myWindow.setInterval(scrollAmount, 50)
  var times = 0
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
  // if (!tt && tabulator.Icon.tooltips[src])    tooltip system discontinued 2016
  //  tt = tabulator.Icon.tooltips[src]
  var image = doc.createElement('img')
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
  let namespaces = []
  for (let ns in this.prefixes) {
    namespaces[this.prefixes[ns]] = ns // reverse index
  }
  let pok
  let canUse = function canUse (pp) {
    // if (!__Serializer.prototype.validPrefix.test(pp)) return false; // bad format
    if (pp === 'ns') return false // boring
    // if (pp in this.namespaces) return false; // already used
    // this.prefixes[uri] = pp;
    // this.namespaces[pp] = uri;
    pok = pp
    return true
  }

  let i
  let hash = p.lastIndexOf('#')
  if (hash >= 0) p = p.slice(hash - 1) // lop off localid
  for (;;) {
    let slash = p.lastIndexOf('/')
    if (slash >= 0) p = p.slice(slash + 1)
    i = 0
    while (i < p.length) {
      if (this.prefixchars.indexOf(p[i])) i++; else break
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
  var s = term.uri
  var namespaces = []
  var i = s.lastIndexOf('#')
  var part
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
  for (let ns in UI.ns) {
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
      if ((part !== 'ns') && ('0123456789'.indexOf(part[0]) < 0)) {
        return part
      }
    } else {
      return term.uri + '!?' // strange should have a nice part
    }
  }
}

function labelWithOntology (x, initialCap) {
  let t = UI.store.findTypeURIs(x)
  if (t[UI.ns.rdf('Predicate').uri] ||
    t[UI.ns.rdfs('Class').uri]) {
    return label(x, initialCap) +
      ' (' + ontologyLabel(x) + ')'
  }
  return label(x, initialCap)
}

// This ubiquitous function returns the best label for a thing
//
//  The hacks in this code make a major difference to the usability
//
// @returns string
//
function label (x, initialCap) { // x is an object
  function doCap (s) {
    // s = s.toString()
    if (initialCap) return s.slice(0, 1).toUpperCase() + s.slice(1)
    return s
  }
  function cleanUp (s1) {
    var s2 = ''
    if (s1.slice(-1) === '/') s1 = s1.slice(0, -1) // chop trailing slash
    for (var i = 0; i < s1.length; i++) {
      if (s1[i] === '_' || s1[i] === '-') {
        s2 += ' '
        continue
      }
      s2 += s1[i]
      if (i + 1 < s1.length &&
        s1[i].toUpperCase() !== s1[i] &&
        s1[i + 1].toLowerCase() !== s1[i + 1]) {
        s2 += ' '
      }
    }
    if (s2.slice(0, 4) === 'has ') s2 = s2.slice(4)
    return doCap(s2)
  }

  // The tabulator labeler is more sophisticated if it exists
  // Todo: move it to a solid-ui option.
  var lab
  if (typeof tabulator !== 'undefined' && tabulator.lb) {
    lab = tabulator.lb.label(x)
    if (lab) {
      return doCap(lab.value)
    }
  }

  // Hard coded known label predicates
  //  @@ TBD: Add subproperties of rdfs:label

  var kb = UI.store
  var lab1 = kb.any(x, UI.ns.link('message')) ||
    kb.any(x, UI.ns.vcard('fn')) ||
    kb.any(x, UI.ns.foaf('name')) ||
    kb.any(x, UI.ns.dct('title')) ||
    kb.any(x, UI.ns.dc('title')) ||
    kb.any(x, UI.ns.rss('title')) ||
    kb.any(x, UI.ns.contact('fullName')) ||
    kb.any(x, kb.sym('http://www.w3.org/2001/04/roadmap/org#name')) ||
    kb.any(x, UI.ns.cal('summary')) ||
    kb.any(x, UI.ns.foaf('nick')) ||
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
  var s = x.uri
  if (typeof s === 'undefined') return x.toString() // can't be a symbol
  // s = decodeURI(s) // This can crash is random valid @ signs are presentation
  // The idea was to clean up eg URIs encoded in query strings
  // Also encoded character in what was filenames like @ [] {}
  try {
    s = s.split('/').map(decodeURIComponent).join('/') // If it is properly encoded
  } catch (e) { // try individual decoding of ASCII code points
    for (var i = s.length - 3; i > 0; i--) {
      const hex = '0123456789abcefABCDEF' // The while upacks multiple layers of encoding
      while (s[i] === '%' && hex.indexOf(s[i + 1]) >= 0 && hex.indexOf(s[i + 2]) >= 0) {
        s = s.slice(0, i) + String.fromCharCode(parseInt(s.slice(i + 1, i + 3), 16)) + s.slice(i + 3)
      }
    }
  }
  if (s.slice(-5) === '#this') s = s.slice(0, -5)
  else if (s.slice(-3) === '#me') s = s.slice(0, -3)

  var hash = s.indexOf('#')
  if (hash >= 0) return cleanUp(s.slice(hash + 1))

  if (s.slice(-9) === '/foaf.rdf') s = s.slice(0, -9)
  else if (s.slice(-5) === '/foaf') s = s.slice(0, -5)

  // Eh? Why not do this? e.g. dc:title needs it only trim URIs, not rdfs:labels
  var slash = s.lastIndexOf('/', s.length - 2) // (len-2) excludes trailing slash
  if ((slash >= 0) && (slash < x.uri.length)) return cleanUp(s.slice(slash + 1))

  return doCap(decodeURIComponent(x.uri))
}

function escapeForXML (str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;')
}

//  As above but escaped for XML and chopped of contains a slash
function labelForXML (x) {
  return escapeForXML(label(x))
}

// As above but for predicate, possibly inverse
function predicateLabelForXML (p, inverse) {
  var lab
  if (inverse) { // If we know an inverse predicate, use its label
    var ip = UI.store.any(p, UI.ns.owl('inverseOf'))
    if (!ip) ip = UI.store.any(undefined, UI.ns.owl('inverseOf'), p)
    if (ip) return labelForXML(ip)
  }

  lab = labelForXML(p)
  if (inverse) {
    if (lab === 'type') return '...' // Not "is type of"
    return 'is ' + lab + ' of'
  }
  return lab
}

// Not a method. For use in sorts
function RDFComparePredicateObject (self, other) {
  var x = self.predicate.compareTerm(other.predicate)
  if (x !== 0) return x
  return self.object.compareTerm(other.object)
}

function RDFComparePredicateSubject (self, other) {
  var x = self.predicate.compareTerm(other.predicate)
  if (x !== 0) return x
  return self.subject.compareTerm(other.subject)
}
// ends

function predParentOf (node) {
  var n = node
  while (true) {
    if (n.getAttribute('predTR')) {
      return n
    } else if (n.previousSibling && n.previousSibling.nodeName === 'TR') {
      n = n.previousSibling
    } else {
      UI.log.error('Could not find predParent'); return node
    }
  }
}

// makeQueryRow moved to outline mode
