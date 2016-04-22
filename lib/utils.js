//                  Tabulator Utilities
//                  ===================
//
// This must load AFTER the rdflib.js and log-ext.js (or log.js).
//

var utilsModule = module.exports = {}

if (typeof utilsModule.nextVariable == 'undefined') utilsModule.nextVariable = 0
utilsModule.newVariableName = function () {
  return 'v' + utilsModule.nextVariable++
}
utilsModule.clearVariableNames = function () {
  utilsModule.nextVariable = 0
}

/* Error stack to string for better diagnotsics
**
** See  http://snippets.dzone.com/posts/show/6632
*/

utilsModule.stackString = function (e) {
  var str = '' + e + '\n'
  if (!e.stack) {
    return str + 'No stack available.\n'
  }
  var lines = e.stack.toString().split('\n')
  var toprint = []
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i]
    if (line.indexOf('ecmaunit.js') > -1) {
      // remove useless bit of traceback
      break
    }
    if (line.charAt(0) == '(') {
      line = 'function' + line
    }
    var chunks = line.split('@')
    toprint.push(chunks)
  }
  // toprint.reverse();  No - I prefer the latest at the top by the error message -tbl

  for (var i = 0; i < toprint.length; i++) {
    str += '  ' + toprint[i][1] + '\n    ' + toprint[i][0]
  }
  return str
}

// @@ This shoud be in rdf.uri (?)

utilsModule.getURIQueryParameters = function (uri) {
  var results = []
  var getDataString = uri ? uri.toString() : new String(window.location)
  var questionMarkLocation = getDataString.indexOf('?')
  if (questionMarkLocation != -1) {
    getDataString = getDataString.substr(questionMarkLocation + 1)
    var getDataArray = getDataString.split(/&/g)
    for (var i = 0;i < getDataArray.length;i++) {
      var nameValuePair = getDataArray[i].split(/=/)
      results[decodeURIComponent(nameValuePair[0])] = decodeURIComponent(nameValuePair[1])
    }
  }
  return results
}

utilsModule.emptyNode = function (node) {
  var nodes = node.childNodes, len = nodes.length, i
  for (i = len - 1; i >= 0; i--) node.removeChild(nodes[i])
  return node
}

utilsModule.getTarget = function (e) {
  var target
  if (!e) var e = window.event
  if (e.target) target = e.target
  else if (e.srcElement) target = e.srcElement
  if (target.nodeType == 3) // defeat Safari bug [sic]
    target = target.parentNode
  // tabulator.log.debug("Click on: " + target.tagName)
  return target
}

utilsModule.ancestor = function (target, tagName) {
  var level
  for (level = target; level; level = level.parentNode) {
    // tabulator.log.debug("looking for "+tagName+" Level: "+level+" "+level.tagName)
    try {
      if (level.tagName == tagName) return level
    } catch(e) { // can hit "TypeError: can't access dead object" in ffox
      return undefined
    }
  }
  return undefined
}

utilsModule.getAbout = function (kb, target) {
  var level, aa
  for (level = target; level && (level.nodeType == 1); level = level.parentNode) {
    // tabulator.log.debug("Level "+level + ' '+level.nodeType + ': '+level.tagName)
    aa = level.getAttribute('about')
    if (aa) {
      // tabulator.log.debug("kb.fromNT(aa) = " + kb.fromNT(aa))
      return kb.fromNT(aa)
      //        } else {
      //            if (level.tagName=='TR') return undefined//this is to prevent literals passing through

    }
  }
  tabulator.log.debug('getAbout: No about found')
  return undefined
}

utilsModule.getTerm = function (target) {
  var statementTr = target.parentNode
  var st = statementTr ? statementTr.AJAR_statement : undefined

  var className = st ? target.className : ''; // if no st then it's necessary to use getAbout
  switch (className) {
    case 'pred':
    case 'pred selected':
      return st.predicate
      break
    case 'obj':
    case 'obj selected':
      if (!statementTr.AJAR_inverse)
        return st.object
      else
        return st.subject
      break
    case '':
    case 'selected': // header TD
      return utilsModule.getAbout(tabulator.kb, target) // kb to be changed
    case 'undetermined selected':
      return (target.nextSibling) ? st.predicate : ((!statementTr.AJAR_inverse) ? st.object : st.subject)
  }
}

utilsModule.include = function (document, linkstr) {
  var lnk = document.createElement('script')
  lnk.setAttribute('type', 'text/javascript')
  lnk.setAttribute('src', linkstr)
  // TODO:This needs to be fixed or no longer used.
  // document.getElementsByTagName('head')[0].appendChild(lnk)
  return lnk
}

utilsModule.addLoadEvent = function (func) {
  var oldonload = window.onload
  if (typeof window.onload != 'function') {
    window.onload = func
  } else {
    window.onload = function () {
      oldonload()
      func()
    }
  }
} // addLoadEvent

// Find the position of an object relative to the window
//
utilsModule.findPos = function (obj) { // C&P from http://www.quirksmode.org/js/findpos.html
  var myDocument = obj.ownerDocument
  var DocBox = myDocument.documentElement.getBoundingClientRect()
  var box = obj.getBoundingClientRect()
  return [box.left - DocBox.left, box.top - DocBox.top]
}

utilsModule.getEyeFocus = function (element, instantly, isBottom, myWindow) {
  if (!myWindow) myWindow = window
  var elementPosY = utilsModule.findPos(element)[1]
  var totalScroll = elementPosY - 52 - myWindow.scrollY; // magic number 52 for web-based version
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
    if (times == 10)
      myWindow.clearInterval(id)
  }
}

utilsModule.AJARImage = function (src, alt, tt, doc) {
  if (!doc) {
    doc = document
  }
  if (!tt && tabulator.Icon.tooltips[src])
    tt = tabulator.Icon.tooltips[src]
  var image = doc.createElement('img')
  image.setAttribute('src', src)
  //    if (typeof alt != 'undefined')      // Messes up cut-and-paste of text
  //        image.setAttribute('alt', alt)
  if (typeof tt != 'undefined')
    image.setAttribute('title', tt)
  return image
}

utilsModule.parse_headers = function (headers) {
  var lines = headers.split('\n')
  var headers = {}
  for (var i = 0; i < lines.length; i++) {
    var line = webdav._strip(lines[i])
    if (line.length == 0) {
      continue
    }
    var chunks = line.split(':')
    var hkey = webdav._strip(chunks.shift()).toLowerCase()
    var hval = webdav._strip(chunks.join(':'))
    if (headers[hkey] !== undefined) {
      headers[hkey].push(hval)
    } else {
      headers[hkey] = [hval]
    }
  }
  return headers
}

//  Make short name for ontology

utilsModule.shortName = function (uri) {
  var p = uri
  if ('#/'.indexOf(p[p.length - 1]) >= 0) p = p.slice(0, -1)
  var namespaces = []
  for (var ns in this.prefixes) {
    namespaces[this.prefixes[ns]] = ns // reverse index
  }
  var pok
  var hash = p.lastIndexOf('#')
  if (hash >= 0) p = p.slice(hash - 1) // lop off localid
  for (;;) {
    var slash = p.lastIndexOf('/')
    if (slash >= 0) p = p.slice(slash + 1)
    var i = 0
    while (i < p.length)
    if (this.prefixchars.indexOf(p[i])) i++; else break
    p = p.slice(0, i)
    if (p.length < 6 && canUse(p)) return pok // exact i sbest
    if (canUse(p.slice(0, 3))) return pok
    if (canUse(p.slice(0, 2))) return pok
    if (canUse(p.slice(0, 4))) return pok
    if (canUse(p.slice(0, 1))) return pok
    if (canUse(p.slice(0, 5))) return pok
    for (var i = 0;; i++) if (canUse(p.slice(0, 3) + i)) return pok
  }
}

// Short name for an ontology
//
utilsModule.ontologyLabel = function (term) {
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
      return term.uri + '?!'; // strange should have # or /
    }
  }
  for (var ns in nsModule) {
    namespaces[nsModule[ns]] = ns // reverse index
  }
  try {
    return namespaces[s]
  } catch (e) {}

  s = s.slice(0, -1); // Chop off delimiter ... now have just

  while(s) {
    i = s.lastIndexOf('/')
    if (i >= 0) {
      part = s.slice(i + 1)
      s = s.slice(0, i)
      if ((part !== 'ns') && ('0123456789'.indexOf(part[0]) < 0))
        return part
    } else {
      return term.uri + '!?' // strange should have a nice part
    }
  }
}

utilsModule.labelWithOntology = function (x, initialCap) {
  var t = tabulator.kb.findTypeURIs(x)
  if (t[nsModule.rdf('Predicate').uri] ||
    t[nsModule.rdfs('Class').uri]) {
    return utilsModule.label(x, initialCap) +
    ' (' + utilsModule.ontologyLabel(x) + ')'
  }
  return utilsModule.label(x, initialCap)
}

// This ubiquitous function returns the best label for a thing
//
//  The hacks in this code make a major difference to the usability
// of the tabulator.
//
// @returns string
//
utilsModule.label = function (x, initialCap) { // x is an object
  function doCap (s) {
    // s = s.toString()
    if (initialCap) return s.slice(0, 1).toUpperCase() + s.slice(1)
    return s
  }
  function cleanUp (s1) {
    var s2 = ''
    if (s1.slice(-1) === '/') s1 = s1.slice(0, -1) // chop trailing slash
    for (var i = 0; i < s1.length; i++) {
      if (s1[i] == '_' || s1[i] == '-') {
        s2 += ' '
        continue
      }
      s2 += s1[i]
      if (i + 1 < s1.length &&
        s1[i].toUpperCase() != s1[i] &&
        s1[i + 1].toLowerCase() != s1[i + 1]) {
        s2 += ' '
      }
    }
    if (s2.slice(0, 4) == 'has ') s2 = s2.slice(4)
    return doCap(s2)
  }

  var lab = tabulator.lb.label(x)
  if (lab) return doCap(lab.value)
  // load #foo to Labeler?

  if (x.termType == 'bnode') {
    return '...'
  }
  if (x.termType == 'collection') {
    return '(' + x.elements.length + ')'
  }
  var s = x.uri
  if (typeof s == 'undefined') return x.toString(); // can't be a symbol
  if (s.slice(-5) == '#this') s = s.slice(0, -5)
  else if (s.slice(-3) == '#me') s = s.slice(0, -3)

  var hash = s.indexOf('#')
  if (hash >= 0) return cleanUp(s.slice(hash + 1))

  if (s.slice(-9) == '/foaf.rdf') s = s.slice(0, -9)
  else if (s.slice(-5) == '/foaf') s = s.slice(0, -5)

  if (1) { //   Eh? Why not do this? e.g. dc:title needs it only trim URIs, not rdfs:labels
    var slash = s.lastIndexOf('/', s.length - 2); // (len-2) excludes trailing slash
    if ((slash >= 0) && (slash < x.uri.length)) return cleanUp(s.slice(slash + 1))
  }
  return doCap(decodeURIComponent(x.uri))
}

utilsModule.escapeForXML = function (str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;')
}

//  As above but escaped for XML and chopped of contains a slash
utilsModule.labelForXML = function (x) {
  return utilsModule.escapeForXML(utilsModule.label(x))
}

// As above but for predicate, possibly inverse
utilsModule.predicateLabelForXML = function (p, inverse) {
  var lab
  if (inverse) { // If we know an inverse predicate, use its label
    var ip = tabulator.kb.any(p, nsModule.owl('inverseOf'))
    if (!ip) ip = tabulator.kb.any(undefined, nsModule.owl('inverseOf'), p)
    if (ip) return utilsModule.labelForXML(ip)
  }

  lab = utilsModule.labelForXML(p)
  if (inverse) {
    if (lab == 'type') return '...'; // Not "is type of"
    return 'is ' + lab + ' of'
  }
  return lab
}

// Not a method. For use in sorts
utilsModule.RDFComparePredicateObject = function (self, other) {
  var x = self.predicate.compareTerm(other.predicate)
  if (x != 0) return x
  return self.object.compareTerm(other.object)
}
utilsModule.RDFComparePredicateSubject = function (self, other) {
  var x = self.predicate.compareTerm(other.predicate)
  if (x != 0) return x
  return self.subject.compareTerm(other.subject)
}
// ends

utilsModule.predParentOf = function (node) {
  var n = node
  while (true){
    if (n.getAttribute('predTR'))
      return n
    else if (n.previousSibling && n.previousSibling.nodeName == 'TR') {
      n = n.previousSibling
    } else {
      tabulator.log.error('Could not find predParent'); return node }
  }
}

var optionalSubqueriesIndex = []

// TODO: Move to outline code !
utilsModule.makeQueryRow = function (q, tr, constraint) {
  var kb = tabulator.kb
  // predtr = predParentOf(tr)
  var nodes = tr.childNodes, n = tr.childNodes.length, inverse = tr.AJAR_inverse,
    i, hasVar = 0, pattern, v, c, parentVar = null, level, pat

  function makeRDFStatement (freeVar, parent) {
    if (inverse)
      return new tabulator.rdf.Statement(freeVar, st.predicate, parent)
    else
      return new tabulator.rdf.Statement(parent, st.predicate, freeVar)
  }

  var optionalSubqueryIndex = null

  for (level = tr.parentNode; level; level = level.parentNode) {
    if (typeof level.AJAR_statement != 'undefined') { // level.AJAR_statement
      level.setAttribute('bla', level.AJAR_statement) // @@? -timbl
      // tabulator.log.debug("Parent TR statement="+level.AJAR_statement + ", var=" + level.AJAR_variable)
      /*for(c=0;c<level.parentNode.childNodes.length;c++) //This makes sure the same variable is used for a subject
      	if(level.parentNode.childNodes[c].AJAR_variable)
      		level.AJAR_variable = level.parentNode.childNodes[c].AJAR_variable;*/
      if (!level.AJAR_variable)
        utilsModule.makeQueryRow(q, level)
      parentVar = level.AJAR_variable
      var predLevel = utilsModule.predParentOf(level)
      if (predLevel.getAttribute('optionalSubqueriesIndex')) {
        optionalSubqueryIndex = predLevel.getAttribute('optionalSubqueriesIndex')
        pat = optionalSubqueriesIndex[optionalSubqueryIndex]
      }
      break
    }
  }

  if (!pat)
    var pat = q.pat

  var predtr = utilsModule.predParentOf(tr)
  // /////OPTIONAL KLUDGE///////////
  var opt = (predtr.getAttribute('optional'))
  if (!opt) {
    if (optionalSubqueryIndex)
      predtr.setAttribute('optionalSubqueriesIndex', optionalSubqueryIndex)
    else
      predtr.removeAttribute('optionalSubqueriesIndex')}
  if (opt) {
    var optForm = kb.formula()
    optionalSubqueriesIndex.push(optForm)
    predtr.setAttribute('optionalSubqueriesIndex', optionalSubqueriesIndex.length - 1)
    pat.optional.push(optForm)
    pat = optForm
  }

  // //////////////////////////////

  var st = tr.AJAR_statement

  var constraintVar = tr.AJAR_inverse ? st.subject : st.object // this is only used for constraints
  var hasParent = true
  if (constraintVar.isBlank && constraint)
    alert('You cannot constrain a query with a blank node. No constraint will be added.')
  if (!parentVar) {
    hasParent = false
    parentVar = inverse ? st.object : st.subject; // if there is no parents, uses the sub/obj
  }
  // tabulator.log.debug('Initial variable: '+tr.AJAR_variable)
  v = tr.AJAR_variable ? tr.AJAR_variable : kb.variable(utilsModule.newVariableName())
  q.vars.push(v)
  v.label = hasParent ? parentVar.label : utilsModule.label(parentVar)
  v.label += ' ' + utilsModule.predicateLabelForXML(st.predicate, inverse)
  pattern = makeRDFStatement(v, parentVar)
  // alert(pattern)
  v.label = v.label.slice(0, 1).toUpperCase() + v.label.slice(1) // init cap

  // See ../rdf/sparql.js
  function ConstraintEqualTo (value) // This should only work on literals but doesn't.
  {
    this.describe = function (varstr) { return varstr + ' = ' + value.toNT() }
    this.test = function (term) {
      return value.sameTerm(term)
    }
    return this
  }

  if (constraint) { // binds the constrained variable to its selected value
    pat.constraints[v] = new ConstraintEqualTo(constraintVar)
  }
  tabulator.log.info('Pattern: ' + pattern)
  pattern.tr = tr
  tr.AJAR_pattern = pattern // Cross-link UI and query line
  tr.AJAR_variable = v
  // tabulator.log.debug('Final variable: '+tr.AJAR_variable)
  tabulator.log.debug('Query pattern: ' + pattern)
  pat.statements.push(pattern)
  return v
} // makeQueryRow
