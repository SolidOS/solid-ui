"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adoptACLDefault = adoptACLDefault;
exports.readACL = readACL;
exports.sameACL = sameACL;
exports.ACLunion = ACLunion;
exports.loadUnionACL = loadUnionACL;
exports.ACLbyCombination = ACLbyCombination;
exports.makeACLGraph = makeACLGraph;
exports.makeACLGraphbyCombo = makeACLGraphbyCombo;
exports.ACLToString = ACLToString;
exports.comboToString = comboToString;
exports.makeACLString = makeACLString;
exports.putACLObject = putACLObject;
exports.putACLbyCombo = putACLbyCombo;
exports.fixIndividualCardACL = fixIndividualCardACL;
exports.fixIndividualACL = fixIndividualACL;
exports.setACL = setACL;
exports.getACLorDefault = getACLorDefault;
exports.getACL = getACL;
exports.getProspectiveHolder = getProspectiveHolder;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var $rdf = _interopRequireWildcard(require("rdflib"));

var _ns = _interopRequireDefault(require("../ns"));

var _store = _interopRequireDefault(require("../store.js"));

var _utils = _interopRequireDefault(require("../utils"));

/**
 * Non-UI functions for access control.
 * See https://github.com/solid/web-access-control-spec
 * for the spec that defines how ACL documents work.
 * @packageDocumentation
 */
function adoptACLDefault(doc, aclDoc, defaultResource, defaultACLdoc) {
  var ACL = _ns["default"].acl;
  var isContainer = doc.uri.slice(-1) === '/'; // Give default for all directories

  var defaults = _store["default"].each(undefined, ACL('default'), defaultResource, defaultACLdoc).concat(_store["default"].each(undefined, ACL('defaultForNew'), defaultResource, defaultACLdoc));

  var proposed = [];
  defaults.map(function (da) {
    proposed = proposed.concat(_store["default"].statementsMatching(da, ACL('agent'), undefined, defaultACLdoc)).concat(_store["default"].statementsMatching(da, ACL('agentClass'), undefined, defaultACLdoc)).concat(_store["default"].statementsMatching(da, ACL('agentGroup'), undefined, defaultACLdoc)).concat(_store["default"].statementsMatching(da, ACL('origin'), undefined, defaultACLdoc)).concat(_store["default"].statementsMatching(da, ACL('originClass'), undefined, defaultACLdoc)).concat(_store["default"].statementsMatching(da, ACL('mode'), undefined, defaultACLdoc));
    proposed.push($rdf.st(da, ACL('accessTo'), doc, defaultACLdoc)); // Suppose

    if (isContainer) {
      // By default, make this apply to folder contents too
      proposed.push($rdf.st(da, ACL('default'), doc, defaultACLdoc));
    }
  });
  var kb2 = $rdf.graph(); // Potential - derived is kept apart

  proposed.map(function (st) {
    var move = function move(sym) {
      var y = defaultACLdoc.uri.length; // The default ACL file

      return $rdf.sym(sym.uri.slice(0, y) === defaultACLdoc.uri ? aclDoc.uri + sym.uri.slice(y) : sym.uri);
    };

    kb2.add(move(st.subject), move(st.predicate), move(st.object), $rdf.sym(aclDoc.uri));
  });
  return kb2;
}
/**
 * Read and canonicalize the ACL for x in aclDoc
 *
 * Accumulate the access rights which each agent or class has
 */


function readACL(x, aclDoc) {
  var kb2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _store["default"];
  var getDefaults = arguments.length > 3 ? arguments[3] : undefined;
  var auths = getDefaults ? getDefaultsFallback(kb2, _ns["default"]) : kb2.each(undefined, _ns["default"].acl('accessTo'), x);
  var ACL = _ns["default"].acl;
  var ac = {
    agent: {},
    agentClass: {},
    agentGroup: {},
    origin: {},
    originClass: {}
  };
  Object.keys(ac).forEach(function (pred) {
    auths.forEach(function (a) {
      kb2.each(a, ACL('mode')).forEach(function (mode) {
        kb2.each(a, ACL(pred)).forEach(function (agent) {
          ac[pred][agent.uri] = ac[pred][agent.uri] || {};
          ac[pred][agent.uri][mode.uri] = a; // could be "true" but leave pointer just in case
        });
      });
    });
  });
  return ac;

  function getDefaultsFallback(kb, ns) {
    return kb.each(undefined, ns.acl('default'), x).concat(kb.each(undefined, ns.acl('defaultForNew'), x));
  }
}
/**
 * Compare two ACLs
 */


function sameACL(a, b) {
  var contains = function contains(a, b) {
    for (var pred in {
      agent: true,
      agentClass: true,
      agentGroup: true,
      origin: true,
      originClass: true
    }) {
      if (a[pred]) {
        for (var agent in a[pred]) {
          for (var mode in a[pred][agent]) {
            if (!b[pred][agent] || !b[pred][agent][mode]) {
              return false;
            }
          }
        }
      }
    }

    return true;
  };

  return contains(a, b) && contains(b, a);
}
/**
 * Union N ACLs
 */


function ACLunion(list) {
  var b = list[0];
  var a, ag;

  var _loop = function _loop(k) {
    ;
    ['agent', 'agentClass', 'agentGroup', 'origin', 'originClass'].map(function (pred) {
      a = list[k];

      if (a[pred]) {
        for (ag in a[pred]) {
          for (var mode in a[pred][ag]) {
            if (!b[pred][ag]) b[pred][ag] = [];
            b[pred][ag][mode] = true;
          }
        }
      }
    });
  };

  for (var k = 1; k < list.length; k++) {
    _loop(k);
  }

  return b;
}
/**
 * Merge ACLs lists from things to form union
 */


function loadUnionACL(subjectList, callbackFunction) {
  var aclList = [];

  var doList = function doList(list) {
    if (list.length) {
      var doc = list.shift().doc();
      getACLorDefault(doc, function (ok, p2, targetDoc, targetACLDoc, defaultHolder, defaultACLDoc) {
        var defa = !p2;
        if (!ok || !defaultHolder || !defaultACLDoc) return callbackFunction(ok, targetACLDoc);
        var acl = defa ? readACL(defaultHolder, defaultACLDoc) : readACL(targetDoc, targetACLDoc);
        aclList.push(acl);
        doList(list.slice(1));
      });
    } else {
      // all gone
      callbackFunction(true, ACLunion(aclList));
    }
  };

  doList(subjectList);
}
/**
 * Represents these as an RDF graph by combination of modes
 *
 * Each agent can only be in one place in this model, one combination of modes.
 * Combos are like full control, read append, read only etc.
 */


function ACLbyCombination(ac) {
  var byCombo = {};
  ['agent', 'agentClass', 'agentGroup', 'origin', 'originClass'].map(function (pred) {
    for (var agent in ac[pred]) {
      var combo = [];

      for (var mode in ac[pred][agent]) {
        combo.push(mode);
      }

      combo.sort();
      var combo2 = combo.join('\n');
      if (!byCombo[combo2]) byCombo[combo2] = [];
      byCombo[combo2].push([pred, agent]);
    }
  });
  return byCombo;
}
/**
 * Write ACL graph to store from AC
 */


function makeACLGraph(kb, x, ac, aclDoc) {
  var byCombo = ACLbyCombination(ac);
  return makeACLGraphbyCombo(kb, x, byCombo, aclDoc);
}
/**
 * Write ACL graph to store from combo
 */


function makeACLGraphbyCombo(kb, x, byCombo, aclDoc, main, defa) {
  var ACL = _ns["default"].acl;

  for (var combo in byCombo) {
    var modeURIs = combo.split('\n');

    var _short = modeURIs.map(function (u) {
      return u.split('#')[1];
    }).join('');

    if (defa && !main) _short += 'Default'; // don't muddle authorizations

    var _a = kb.sym(aclDoc.uri + '#' + _short);

    kb.add(_a, _ns["default"].rdf('type'), ACL('Authorization'), aclDoc);

    if (main) {
      kb.add(_a, ACL('accessTo'), x, aclDoc);
    }

    if (defa) {
      kb.add(_a, ACL('default'), x, aclDoc);
    }

    for (var i = 0; i < modeURIs.length; i++) {
      kb.add(_a, ACL('mode'), kb.sym(modeURIs[i]), aclDoc);
    }

    var pairs = byCombo[combo];

    for (var _i = 0; _i < pairs.length; _i++) {
      var pred = pairs[_i][0];
      var ag = pairs[_i][1];
      kb.add(_a, ACL(pred), kb.sym(ag), aclDoc);
    }
  }
}
/**
 * Debugging short strings for dumping ACL
 * and possibly in the UI
 */


function ACLToString(ac) {
  return comboToString(ACLbyCombination(ac));
}
/**
 * Convert a [[ComboList]] to a string
 */


function comboToString(byCombo) {
  var str = '';

  for (var combo in byCombo) {
    var modeURIs = combo.split('\n');
    var initials = modeURIs.map(function (u) {
      return u.split('#')[1][0];
    }).join('');
    str += initials + ':';
    var pairs = byCombo[combo];

    for (var i = 0; i < pairs.length; i++) {
      var pred = pairs[i][0];
      var ag = $rdf.sym(pairs[i][1]);
      str += pred === 'agent' ? '@' : '';
      str += ag.sameTerm(_ns["default"].foaf('Agent')) ? '*' : _utils["default"].label(ag);
      if (i < pairs.length - 1) str += ',';
    }

    str += ';';
  }

  return '{' + str.slice(0, -1) + '}'; // drop extra semicolon
}
/**
 * Write ACL graph as Turtle
 */


function makeACLString(x, ac, aclDoc) {
  var kb2 = $rdf.graph();
  makeACLGraph(kb2, x, ac, aclDoc); // @@ TODO Remove casting

  return $rdf.serialize(aclDoc, kb2, aclDoc.uri, 'text/turtle');
}
/**
 * Write ACL graph to web
 */


function putACLObject(kb, x, ac, aclDoc, callbackFunction) {
  var byCombo = ACLbyCombination(ac);
  return putACLbyCombo(kb, x, byCombo, aclDoc, callbackFunction);
}
/**
 * Write ACL graph to web from a [[ComboList]]
 */


function putACLbyCombo(kb, x, byCombo, aclDoc, callbackFunction) {
  var kb2 = $rdf.graph();
  makeACLGraphbyCombo(kb2, x, byCombo, aclDoc, true) // const str = makeACLString = function(x, ac, aclDoc)
  // @@ TODO Remove casting of kb.updater and kb.fetcher
  ;
  kb.updater.put(aclDoc, kb2.statementsMatching(undefined, undefined, undefined, aclDoc), 'text/turtle', function (uri, ok, message) {
    if (!ok) {
      callbackFunction(ok, message);
    } else {
      ;
      kb.fetcher.unload(aclDoc);
      makeACLGraphbyCombo(kb, x, byCombo, aclDoc, true);
      kb.fetcher.requested[aclDoc.uri] = 'done'; // missing: save headers

      callbackFunction(ok);
    }
  });
}
/**
 * Fix the ACl for an individual card as a function of the groups it is in
 *
 * All group files must be loaded first
 */


function fixIndividualCardACL(person, log, callbackFunction) {
  var groups = _store["default"].each(undefined, _ns["default"].vcard('hasMember'), person); // const doc = person.doc()


  if (groups) {
    fixIndividualACL(person, groups, log, callbackFunction);
  } else {
    log('This card is in no groups');
    callbackFunction(true); // fine, no requirements to access. default should be ok
  } // @@ if no groups, then use default for People container or the book top container.?

}
/**
 * This function is used by [[fixIndividualCardACL]]
 */


function fixIndividualACL(item, subjects, log, callbackFunction) {
  log = log || console.log;
  var doc = item.doc();
  getACLorDefault(doc, function (ok, exists, targetDoc, targetACLDoc, defaultHolder, defaultACLDoc) {
    if (!ok || !defaultHolder || !defaultACLDoc) return callbackFunction(false, targetACLDoc); // ie message

    var ac = exists ? readACL(targetDoc, targetACLDoc) : readACL(defaultHolder, defaultACLDoc);
    loadUnionACL(subjects, function (ok, union) {
      if (!ok) return callbackFunction(false, union);

      if (sameACL(union, ac)) {
        log('Nice - same ACL. no change ' + _utils["default"].label(item) + ' ' + doc);
      } else {
        log('Group ACLs differ for ' + _utils["default"].label(item) + ' ' + doc); // log("Group ACLs: " + makeACLString(targetDoc, union, targetACLDoc))
        // log((exists ? "Previous set" : "Default") + " ACLs: " +
        // makeACLString(targetDoc, ac, targetACLDoc))

        putACLObject(_store["default"], targetDoc, union, targetACLDoc, callbackFunction);
      }
    });
  });
}
/**
 * Set an ACL
 */


function setACL(docURI, aclText, callbackFunction) {
  var aclDoc = _store["default"].any(_store["default"].sym(docURI), _store["default"].sym('http://www.iana.org/assignments/link-relations/acl')); // @@ check that this get set by web.js


  if (aclDoc) {
    // Great we already know where it is
    _store["default"].fetcher.webOperation('PUT', aclDoc.uri, {
      data: aclText,
      contentType: 'text/turtle'
    }).then(callbackFunction); // @@@ check params

  } else {
    _store["default"].fetcher.nowOrWhenFetched(docURI, undefined, function (ok, body) {
      if (!ok) return callbackFunction(ok, 'Gettting headers for ACL: ' + body);

      var aclDoc = _store["default"].any(_store["default"].sym(docURI), _store["default"].sym('http://www.iana.org/assignments/link-relations/acl')); // @@ check that this get set by web.js


      if (!aclDoc) {
        // complainIfBad(false, "No Link rel=ACL header for " + docURI)
        callbackFunction(false, 'No Link rel=ACL header for ' + docURI);
      } else {
        _store["default"].fetcher.webOperation('PUT', aclDoc.uri, {
          data: aclText,
          contentType: 'text/turtle'
        }).then(callbackFunction);
      }
    });
  }
}
/**
 * Get ACL file or default if necessary
 *
 * @param callbackFunction  Will be called in the following ways, in the following cases:
 * * `callbackFunction(true, true, doc, aclDoc)` if the ACL did exist
 * * `callbackFunction(true, false, doc, aclDoc, defaultHolder, defaultACLDoc)` if the ACL file did not exist but a default did
 * * `callbackFunction(false, false, status, message)` when there was an error getting the original
 * * `callbackFunction(false, true, status, message)` when there was an error getting the default
 */


function getACLorDefault(doc, callbackFunction) {
  getACL(doc, function (ok, status, aclDoc, message) {
    var ACL = _ns["default"].acl;
    if (!ok) return callbackFunction(false, false, status, message); // Recursively search for the ACL file which gives default access

    var tryParent = function tryParent(uri) {
      if (uri.slice(-1) === '/') {
        uri = uri.slice(0, -1);
      }

      var right = uri.lastIndexOf('/');
      var left = uri.indexOf('/', uri.indexOf('//') + 2);

      if (left > right) {
        return callbackFunction(false, true, 404, 'Found no ACL resource');
      }

      uri = uri.slice(0, right + 1);
      var doc2 = $rdf.sym(uri);
      getACL(doc2, function (ok, status, defaultACLDoc) {
        if (!ok) {
          return callbackFunction(false, true, status, "( No ACL pointer ".concat(uri, " ").concat(status, ")").concat(defaultACLDoc));
        } else if (status === 403) {
          return callbackFunction(false, true, status, "( default ACL file FORBIDDEN. Stop.".concat(uri, ")"));
        } else if (status === 404) {
          return tryParent(uri);
        } else if (status !== 200) {
          return callbackFunction(false, true, status, "Error status '".concat(status, "' searching for default for ").concat(doc2));
        } // 200
        // statusBlock.textContent += (" ACCESS set at " + uri + ". End search.")


        var defaults = _store["default"].each(undefined, ACL('default'), _store["default"].sym(uri), defaultACLDoc).concat(_store["default"].each(undefined, ACL('defaultForNew'), _store["default"].sym(uri), defaultACLDoc));

        if (!defaults.length) {
          return tryParent(uri); // Keep searching
        }

        var defaultHolder = _store["default"].sym(uri);

        return callbackFunction(true, false, doc, aclDoc, defaultHolder, defaultACLDoc);
      });
    }; // tryParent


    if (!ok) {
      return callbackFunction(false, false, status, "Error accessing Access Control information for ".concat(doc, ") ").concat(message));
    } else if (status === 404) {
      tryParent(doc.uri); //  @@ construct default one - the server should do that
    } else if (status === 403) {
      return callbackFunction(false, false, status, "(Sharing not available to you)".concat(message));
    } else if (status !== 200) {
      return callbackFunction(false, false, status, "Error ".concat(status, " accessing Access Control information for ").concat(doc, ": ").concat(message));
    } else {
      // 200
      return callbackFunction(true, true, doc, aclDoc);
    }
  }); // Call to getACL
}
/**
 * Calls back `(ok, status, acldoc, message)` as follows
 *
 * * `(false, 900, errormessage)` if no link header
 * * `(true, 403, documentSymbol, fileaccesserror)` if not authorized
 * * `(true, 404, documentSymbol, fileaccesserror)` if does not exist
 * * `(true, 200, documentSymbol)` if file exists and read OK
 */


function getACL(doc, callbackFunction) {
  _store["default"].fetcher.nowOrWhenFetched(doc, undefined, function (ok, body) {
    if (!ok) {
      return callbackFunction(ok, "Can't get headers to find ACL for ".concat(doc, ": ").concat(body));
    }

    var aclDoc = _store["default"].any(doc, _store["default"].sym('http://www.iana.org/assignments/link-relations/acl')); // @@ check that this get set by web.js


    if (!aclDoc) {
      callbackFunction(false, 900, "No Link rel=ACL header for ".concat(doc));
    } else {
      if (_store["default"].fetcher.nonexistent[aclDoc.uri]) {
        return callbackFunction(true, 404, aclDoc, "ACL file ".concat(aclDoc, " does not exist."));
      }

      _store["default"].fetcher.nowOrWhenFetched(aclDoc, undefined, function (ok, message, response) {
        if (!ok) {
          callbackFunction(true, response.status, aclDoc, "Can't read Access Control File ".concat(aclDoc, ": ").concat(message));
        } else {
          callbackFunction(true, 200, aclDoc);
        }
      });
    }
  });
}
/**
 * Calls [[getACLorDefault]] and then (?)
 */


function getProspectiveHolder(_x) {
  return _getProspectiveHolder.apply(this, arguments);
}

function _getProspectiveHolder() {
  _getProspectiveHolder = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(targetDirectory) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              return getACLorDefault($rdf.sym(targetDirectory), function (ok, isDirectACL, targetDoc, targetACLDoc, defaultHolder) {
                if (ok) {
                  return resolve(isDirectACL ? targetDoc : defaultHolder);
                }

                return reject(new Error("Error loading ".concat(targetDirectory)));
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getProspectiveHolder.apply(this, arguments);
}
//# sourceMappingURL=acl.js.map