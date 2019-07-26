// Access control logic

var acl = module.exports = {}

var UI = {
  acl: acl,
  icons: require('./iconBase'),
  log: require('./log'),
  ns: require('./ns'),
  store: require('./store'),
  widgets: require('./widgets')
}

const utils = require('./utils')
const kb = UI.store

// //////////////////////////////////// Solid ACL non-UI functions
//

// Take the "defaltForNew" ACL and convert it into the equivlent ACL
// which the resource would have had.  Return it as a new separate store.

UI.acl.adoptACLDefault = function (doc, aclDoc, defaultResource, defaultACLdoc) {
  var kb = UI.store
  var ACL = UI.ns.acl
  var isContainer = doc.uri.slice(-1) === '/' // Give default for all directories
  var defaults = kb.each(undefined, ACL('default'), defaultResource, defaultACLdoc)
    .concat(kb.each(undefined, ACL('defaultForNew'), defaultResource, defaultACLdoc))
  var proposed = []
  defaults.map(function (da) {
    proposed = proposed.concat(kb.statementsMatching(da, ACL('agent'), undefined, defaultACLdoc))
      .concat(kb.statementsMatching(da, ACL('agentClass'), undefined, defaultACLdoc))
      .concat(kb.statementsMatching(da, ACL('agentGroup'), undefined, defaultACLdoc))
      .concat(kb.statementsMatching(da, ACL('origin'), undefined, defaultACLdoc))
      .concat(kb.statementsMatching(da, ACL('originClass'), undefined, defaultACLdoc))
      .concat(kb.statementsMatching(da, ACL('mode'), undefined, defaultACLdoc))
    proposed.push($rdf.st(da, ACL('accessTo'), doc, defaultACLdoc)) // Suppose
    if (isContainer) { // By default, make this apply to folder contents too
      proposed.push($rdf.st(da, ACL('default'), doc, defaultACLdoc))
    }
  })
  var kb2 = $rdf.graph() // Potential - derived is kept apart
  proposed.map(function (st) {
    var move = function (sym) {
      var y = defaultACLdoc.uri.length // The default ACL file
      return $rdf.sym((sym.uri.slice(0, y) === defaultACLdoc.uri)
        ? aclDoc.uri + sym.uri.slice(y) : sym.uri)
    }
    kb2.add(move(st.subject), move(st.predicate), move(st.object), $rdf.sym(aclDoc.uri))
  })

  return kb2
}

// Read and canonicalize the ACL for x in aclDoc
//
// Accumulate the access rights which each agent or class has
//
UI.acl.readACL = function (x, aclDoc, kb, getDefaults) {
  kb = kb || UI.store
  var ns = UI.ns
  var auths = getDefaults ? kb.each(undefined, ns.acl('default'), x)
         .concat(kb.each(undefined, ns.acl('defaultForNew'), x))
      : kb.each(undefined, ns.acl('accessTo'), x)

  var ACL = UI.ns.acl
  var ac = {'agent': [], 'agentClass': [], 'agentGroup': [], 'origin': [], 'originClass': []}
  for (var pred in {'agent': true, 'agentClass': true, 'agentGroup': true, 'origin': true, 'originClass': true}) {
    auths.map(function (a) {
      kb.each(a, ACL('mode')).map(function (mode) {
        kb.each(a, ACL(pred)).map(function (agent) {
          if (!ac[pred][agent.uri]) ac[pred][agent.uri] = []
          ac[pred][agent.uri][mode.uri] = a // could be "true" but leave pointer just in case
        })
      })
    })
  }
  return ac
}

// Compare two ACLs
UI.acl.sameACL = function (a, b) {
  var contains = function (a, b) {
    for (var pred in {'agent': true, 'agentClass': true, 'agentGroup': true, 'origin': true, 'originClass': true}) {
      if (a[pred]) {
        for (var agent in a[pred]) {
          for (var mode in a[pred][agent]) {
            if (!b[pred][agent] || !b[pred][agent][mode]) {
              return false
            }
          }
        }
      }
    }
    return true
  }
  return contains(a, b) && contains(b, a)
}

// Union N ACLs
UI.acl.ACLunion = function (list) {
  var b = list[0]
  var a, ag
  for (var k = 1; k < list.length; k++) {
    ['agent', 'agentClass', 'agentGroup', 'origin', 'originClass'].map(function (pred) {
      a = list[k]
      if (a[pred]) {
        for (ag in a[pred]) {
          for (var mode in a[pred][ag]) {
            if (!b[pred][ag]) b[pred][ag] = []
            b[pred][ag][mode] = true
          }
        }
      }
    })
  }
  return b
}

// Merge ACLs lists from things to form union

UI.acl.loadUnionACL = function (subjectList, callbackFunction) {
  var aclList = []
  var doList = function (list) {
    if (list.length) {
      var doc = list.shift().doc()
      UI.acl.getACLorDefault(doc, function (ok, p2, targetDoc, targetACLDoc, defaultHolder, defaultACLDoc) {
        var defa = !p2
        if (!ok) return callbackFunction(ok, targetACLDoc)
        aclList.push((defa) ? UI.widgets.readACL(defaultHolder, defaultACLDoc)
          : UI.widgets.readACL(targetDoc, targetACLDoc))
        doList(list.slice(1))
      })
    } else { // all gone
      callbackFunction(true, UI.widgets.ACLunion(aclList))
    }
  }
  doList(subjectList)
}

// Represents these as a RDF graph by combination of modes
//
// Each agent can only be in one place in this model, one combination of modes.
// Combos are like full control, read append, read only etc.
//
UI.acl.ACLbyCombination = function (ac) {
  var byCombo = [];
  ['agent', 'agentClass', 'agentGroup', 'origin', 'originClass'].map(function (pred) {
    for (var agent in ac[pred]) {
      var combo = []
      for (var mode in ac[pred][agent]) {
        combo.push(mode)
      }
      combo.sort()
      combo = combo.join('\n')
      if (!byCombo[combo]) byCombo[combo] = []
      byCombo[combo].push([pred, agent])
    }
  })
  return byCombo
}

//    Write ACL graph to store from AC
//
UI.acl.makeACLGraph = function (kb, x, ac, aclDoc) {
  var byCombo = UI.acl.ACLbyCombination(ac)
  return UI.acl.makeACLGraphbyCombo(kb, x, byCombo, aclDoc)
}

//    Write ACL graph to store from combo
//
UI.acl.makeACLGraphbyCombo = function (kb, x, byCombo, aclDoc, main, defa) {
  var ACL = UI.ns.acl
  for (var combo in byCombo) {
    var modeURIs = combo.split('\n')
    var short = modeURIs.map(function (u) { return u.split('#')[1] }).join('')
    if (defa && !main) short += 'Default' // don't muddle authorizations
    var a = kb.sym(aclDoc.uri + '#' + short)
    kb.add(a, UI.ns.rdf('type'), ACL('Authorization'), aclDoc)
    if (main) {
      kb.add(a, ACL('accessTo'), x, aclDoc)
    }
    if (defa) {
      kb.add(a, ACL('default'), x, aclDoc)
    }
    for (var i = 0; i < modeURIs.length; i++) {
      kb.add(a, ACL('mode'), kb.sym(modeURIs[i]), aclDoc)
    }
    var pairs = byCombo[combo]
    for (i = 0; i < pairs.length; i++) {
      var pred = pairs[i][0]
      var ag = pairs[i][1]
      kb.add(a, ACL(pred), kb.sym(ag), aclDoc)
    }
  }
}

//    Debugguing short strings for dumping ACL
//  and who knows maybe in the UI
//
UI.acl.ACLToString = function (ac) {
  return UI.widgets.comboToString(
    UI.widgets.ACLbyCombination(ac))
}
UI.acl.comboToString = function (byCombo) {
  var str = ''
  for (var combo in byCombo) {
    var modeURIs = combo.split('\n')
    var initials = modeURIs.map(function (u) { return u.split('#')[1][0] }).join('')
    str += initials + ':'
    var pairs = byCombo[combo]
    for (var i = 0; i < pairs.length; i++) {
      var pred = pairs[i][0]
      var ag = $rdf.sym(pairs[i][1])
      str += (pred === 'agent') ? '@' : ''
      str += (ag.sameTerm(UI.ns.foaf('Agent')) ? '*'
        : utils.label(ag))
      if (i < pairs.length - 1) str += ','
    }
    str += ';'
  }
  return '{' + str.slice(0, -1) + '}' // drop extra semicolon
}

//    Write ACL graph to string
//
UI.acl.makeACLString = function (x, ac, aclDoc) {
  var kb = $rdf.graph()
  UI.widgets.makeACLGraph(kb, x, ac, aclDoc)
  return $rdf.serialize(aclDoc, kb, aclDoc.uri, 'text/turtle')
}

//    Write ACL graph to web
//
UI.acl.putACLObject = function (kb, x, ac, aclDoc, callbackFunction) {
  var byCombo = UI.widgets.ACLbyCombination(ac)
  return UI.widgets.putACLbyCombo(kb, x, byCombo, aclDoc, callbackFunction)
}

//    Write ACL graph to web from combo
//
UI.acl.putACLbyCombo = function (kb, x, byCombo, aclDoc, callbackFunction) {
  var kb2 = $rdf.graph()
  UI.widgets.makeACLGraphbyCombo(kb2, x, byCombo, aclDoc, true)

  // var str = UI.widgets.makeACLString = function(x, ac, aclDoc)
  kb.updater.put(aclDoc, kb2.statementsMatching(undefined, undefined, undefined, aclDoc),
    'text/turtle', function (uri, ok, message) {
      if (!ok) {
        callbackFunction(ok, message)
      } else {
        kb.fetcher.unload(aclDoc)
        UI.widgets.makeACLGraphbyCombo(kb, x, byCombo, aclDoc, true)
        kb.fetcher.requested[aclDoc.uri] = 'done' // missing: save headers
        callbackFunction(ok)
      }
    })
}

// Fix the ACl for an individual card as a function of the groups it is in
//
// All group files must be loaded first
//

UI.acl.fixIndividualCardACL = function (person, log, callbackFunction) {
  var groups = UI.store.each(undefined, UI.ns.vcard('hasMember'), person)
  // var doc = person.doc()
  if (groups) {
    UI.widgets.fixIndividualACL(person, groups, log, callbackFunction)
  } else {
    log('This card is in no groups')
    callbackFunction(true) // fine, no requirements to access. default should be ok
  }
// @@ if no groups, then use default for People container or the book top container.?
}

UI.acl.fixIndividualACL = function (item, subjects, log, callbackFunction) {
  log = log || console.log
  var doc = item.doc()
  UI.acl.getACLorDefault(doc, function (ok, exists, targetDoc, targetACLDoc, defaultHolder, defaultACLDoc) {
    if (!ok) return callbackFunction(false, targetACLDoc) // ie message
    var ac = (exists) ? UI.widgets.readACL(targetDoc, targetACLDoc) : UI.widgets.readACL(defaultHolder, defaultACLDoc)
    UI.widgets.loadUnionACL(subjects, function (ok, union) {
      if (!ok) return callbackFunction(false, union)
      if (UI.widgets.sameACL(union, ac)) {
        log('Nice - same ACL. no change ' + utils.label(item) + ' ' + doc)
      } else {
        log('Group ACLs differ for ' + utils.label(item) + ' ' + doc)

        // log("Group ACLs: " + UI.widgets.makeACLString(targetDoc, union, targetACLDoc))
        // log((exists ? "Previous set" : "Default") + " ACLs: " +
        // UI.widgets.makeACLString(targetDoc, ac, targetACLDoc))

        UI.widgets.putACLObject(UI.store, targetDoc, union, targetACLDoc, callbackFunction)
      }
    })
  })
}

UI.acl.setACL = function (docURI, aclText, callbackFunction) {
  var aclDoc = kb.any(kb.sym(docURI),
    kb.sym('http://www.iana.org/assignments/link-relations/acl')) // @@ check that this get set by web.js
  if (aclDoc) { // Great we already know where it is
    kb.fetcher.webOperation('PUT', aclDoc.uri, {data: aclText, contentType: 'text/turtle'}).then(callbackFunction) // @@@ check params
  } else {
    kb.fetcher.nowOrWhenFetched(docURI, undefined, function (ok, body) {
      if (!ok) return callbackFunction(ok, 'Gettting headers for ACL: ' + body)
      var aclDoc = kb.any(kb.sym(docURI),
        kb.sym('http://www.iana.org/assignments/link-relations/acl')) // @@ check that this get set by web.js
      if (!aclDoc) {
        // complainIfBad(false, "No Link rel=ACL header for " + docURI)
        callbackFunction(false, 'No Link rel=ACL header for ' + docURI)
      } else {
        kb.fetcher.webOperation('PUT', aclDoc.uri, {data: aclText, contentType: 'text/turtle'}).then(callbackFunction)
      }
    })
  }
}

//  Get ACL file or default if necessary
//
// callbackFunction(true, true, doc, aclDoc)   The ACL did exist
// callbackFunction(true, false, doc, aclDoc, defaultHolder, defaultACLDoc)   ACL file did not exist but a default did
// callbackFunction(false, false, status, message)  error getting original
// callbackFunction(false, true, status, message)  error getting defualt

UI.acl.getACLorDefault = function (doc, callbackFunction) {
  UI.acl.getACL(doc, function (ok, status, aclDoc, message) {
    var kb = UI.store
    var ACL = UI.ns.acl
    if (!ok) return callbackFunction(false, false, status, message)

    // Recursively search for the ACL file which gives default access
    var tryParent = function (uri) {
      if (uri.slice(-1) === '/') {
        uri = uri.slice(0, -1)
      }
      var right = uri.lastIndexOf('/')
      var left = uri.indexOf('/', uri.indexOf('//') + 2)
      uri = uri.slice(0, right + 1)
      var doc2 = $rdf.sym(uri)
      UI.acl.getACL(doc2, function (ok, status, defaultACLDoc) {
        if (!ok) {
          return callbackFunction(false, true, status, '( No ACL pointer ' + uri + ' ' + status + ')' + defaultACLDoc)
        } else if (status === 403) {
          return callbackFunction(false, true, status, '( default ACL file FORBIDDEN. Stop.' + uri + ')')
        } else if (status === 404) {
          if (left >= right) {
            return callbackFunction(false, true, 499, 'Nothing to hold a default')
          } else {
            tryParent(uri)
          }
        } else if (status !== 200) {
          return callbackFunction(false, true, status, "Error status '" + status + "' searching for default for " + doc2)
        } else { // 200
          // statusBlock.textContent += (" ACCESS set at " + uri + ". End search.")
          var defaults = kb.each(undefined, ACL('default'), kb.sym(uri), defaultACLDoc)
              .concat(kb.each(undefined, ACL('defaultForNew'), kb.sym(uri), defaultACLDoc))
          if (!defaults.length) {
            tryParent(uri) // Keep searching
          } else {
            var defaultHolder = kb.sym(uri)
            callbackFunction(true, false, doc, aclDoc, defaultHolder, defaultACLDoc)
          }
        }
      })
    } // tryParent

    if (!ok) {
      return callbackFunction(false, false, status,
        'Error accessing Access Control information for ' + doc + ') ' + message)
    } else if (status === 404) {
      tryParent(doc.uri) //  @@ construct default one - the server should do that
    } else if (status === 403) {
      return callbackFunction(false, false, status, '(Sharing not available to you)' + message)
    } else if (status !== 200) {
      return callbackFunction(false, false, status, 'Error ' + status +
        ' accessing Access Control information for ' + doc + ': ' + message)
    } else { // 200
      return callbackFunction(true, true, doc, aclDoc)
    }
  }) // Call to getACL
} // getACLorDefault

//    Calls back (ok, status, acldoc, message)
//
//   (false, 900, errormessage)        no link header
//   (true, 403, documentSymbol, fileaccesserror) not authorized
//   (true, 404, documentSymbol, fileaccesserror) if does not exist
//   (true, 200, documentSymbol)   if file exitss and read OK
//
UI.acl.getACL = function (doc, callbackFunction) {
  UI.store.fetcher.nowOrWhenFetched(doc, undefined, function (ok, body) {
    if (!ok) return callbackFunction(ok, "Can't get headers to find ACL for " + doc + ': ' + body)
    var kb = UI.store
    var aclDoc = kb.any(doc,
      kb.sym('http://www.iana.org/assignments/link-relations/acl')) // @@ check that this get set by web.js
    if (!aclDoc) {
      callbackFunction(false, 900, 'No Link rel=ACL header for ' + doc)
    } else {
      if (UI.store.fetcher.nonexistent[aclDoc.uri]) {
        return callbackFunction(true, 404, aclDoc, 'ACL file ' + aclDoc + ' does not exist.')
      }
      UI.store.fetcher.nowOrWhenFetched(aclDoc, undefined, function (ok, message, response) {
        if (!ok) {
          callbackFunction(true, response.status, aclDoc, "Can't read Access Control File " + aclDoc + ': ' + message)
        } else {
          callbackFunction(true, 200, aclDoc)
        }
      })
    }
  })
}

// /////////////////////////////////////////  End of ACL stuff
