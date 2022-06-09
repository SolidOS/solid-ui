"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof3 = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACLToString = ACLToString;
exports.ACLbyCombination = ACLbyCombination;
exports.ACLunion = ACLunion;
exports.adoptACLDefault = adoptACLDefault;
exports.comboToString = comboToString;
exports.fixIndividualACL = fixIndividualACL;
exports.fixIndividualCardACL = fixIndividualCardACL;
exports.getACL = getACL;
exports.getACLorDefault = getACLorDefault;
exports.getProspectiveHolder = getProspectiveHolder;
exports.loadUnionACL = loadUnionACL;
exports.makeACLGraph = makeACLGraph;
exports.makeACLGraphbyCombo = makeACLGraphbyCombo;
exports.makeACLString = makeACLString;
exports.putACLObject = putACLObject;
exports.putACLbyCombo = putACLbyCombo;
exports.readACL = readACL;
exports.sameACL = sameACL;
exports.setACL = setACL;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var ns = _interopRequireWildcard(require("../ns"));

var _solidLogic = require("solid-logic");

var utils = _interopRequireWildcard(require("../utils"));

var debug = _interopRequireWildcard(require("../debug"));

var _rdflib = require("rdflib");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == (0, _typeof2["default"])(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

var kb = _solidLogic.solidLogicSingleton.store;
/**
 * Take the "default" ACL and convert it into the equivlent ACL
 * which the resource would have had. Return it as a new separate store.
 * The "defaultForNew" predicate is also accepted, as a deprecated
 * synonym for "default".
 */

function adoptACLDefault(doc, aclDoc, defaultResource, defaultACLDoc) {
  var ACL = ns.acl;
  var isContainer = doc.uri.slice(-1) === '/'; // Give default for all directories

  var defaults = kb.each(undefined, ACL('default'), defaultResource, defaultACLDoc).concat(kb.each(undefined, ACL('defaultForNew'), defaultResource, defaultACLDoc));
  var proposed = defaults.reduce(function (accumulatedStatements, da) {
    return accumulatedStatements.concat(kb.statementsMatching(da, ns.rdf('type'), ACL('Authorization'), defaultACLDoc)).concat(kb.statementsMatching(da, ACL('agent'), undefined, defaultACLDoc)).concat(kb.statementsMatching(da, ACL('agentClass'), undefined, defaultACLDoc)).concat(kb.statementsMatching(da, ACL('agentGroup'), undefined, defaultACLDoc)).concat(kb.statementsMatching(da, ACL('origin'), undefined, defaultACLDoc)).concat(kb.statementsMatching(da, ACL('originClass'), undefined, defaultACLDoc)).concat(kb.statementsMatching(da, ACL('mode'), undefined, defaultACLDoc)).concat((0, _rdflib.st)(da, ACL('accessTo'), doc, defaultACLDoc)).concat(isContainer ? (0, _rdflib.st)(da, ACL('default'), doc, defaultACLDoc) : []);
  }, []);
  var kb2 = (0, _rdflib.graph)(); // Potential - derived is kept apart

  proposed.forEach(function (st) {
    return kb2.add(move(st.subject), move(st.predicate), move(st.object), (0, _rdflib.sym)(aclDoc.uri));
  });
  return kb2;

  function move(symbol) {
    var y = defaultACLDoc.uri.length; // The default ACL file

    return (0, _rdflib.sym)(symbol.uri.slice(0, y) === defaultACLDoc.uri ? aclDoc.uri + symbol.uri.slice(y) : symbol.uri);
  }
}
/**
 * Read and canonicalize the ACL for x in aclDoc
 *
 * Accumulate the access rights which each agent or class has
 */


function readACL(doc, aclDoc) {
  var kb2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : kb;
  var getDefaults = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var auths = getDefaults ? getDefaultsFallback(kb2, ns) : kb2.each(undefined, ns.acl('accessTo'), doc);
  var ACL = ns.acl;
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
    return kb.each(undefined, ns.acl('default'), doc).concat(kb.each(undefined, ns.acl('defaultForNew'), doc));
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
    ['agent', 'agentClass', 'agentGroup', 'origin', 'originClass'].forEach(function (pred) {
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
  ['agent', 'agentClass', 'agentGroup', 'origin', 'originClass'].forEach(function (pred) {
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
  var ACL = ns.acl;

  for (var combo in byCombo) {
    var pairs = byCombo[combo];
    if (!pairs.length) continue; // do not add to store when no agent

    var modeURIs = combo.split('\n');

    var _short = modeURIs.map(function (u) {
      return u.split('#')[1];
    }).join('');

    if (defa && !main) _short += 'Default'; // don't muddle authorizations

    var _a = kb.sym(aclDoc.uri + '#' + _short);

    kb.add(_a, ns.rdf('type'), ACL('Authorization'), aclDoc);

    if (main) {
      kb.add(_a, ACL('accessTo'), x, aclDoc);
    }

    if (defa) {
      kb.add(_a, ACL('default'), x, aclDoc);
    }

    for (var i = 0; i < modeURIs.length; i++) {
      kb.add(_a, ACL('mode'), kb.sym(modeURIs[i]), aclDoc);
    }

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
      var ag = (0, _rdflib.sym)(pairs[i][1]);
      str += pred === 'agent' ? '@' : '';
      str += ag.sameTerm(ns.foaf('Agent')) ? '*' : utils.label(ag);
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
  var kb2 = (0, _rdflib.graph)();
  makeACLGraph(kb2, x, ac, aclDoc);
  return (0, _rdflib.serialize)(aclDoc, kb2, aclDoc.uri, 'text/turtle') || '';
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
  var _kb$updater;

  var kb2 = (0, _rdflib.graph)();
  makeACLGraphbyCombo(kb2, x, byCombo, aclDoc, true); // const str = makeACLString = function(x, ac, aclDoc)

  (_kb$updater = kb.updater) === null || _kb$updater === void 0 ? void 0 : _kb$updater.put(aclDoc, kb2.statementsMatching(undefined, undefined, undefined, aclDoc), 'text/turtle', function (uri, ok, message) {
    if (!ok) {
      callbackFunction(ok, message);
    } else {
      var _kb$fetcher;

      (_kb$fetcher = kb.fetcher) === null || _kb$fetcher === void 0 ? void 0 : _kb$fetcher.unload(aclDoc);
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
  var groups = kb.each(undefined, ns.vcard('hasMember'), person); // const doc = person.doc()

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
  log = log || debug.log;
  var doc = item.doc();
  getACLorDefault(doc, function (ok, exists, targetDoc, targetACLDoc, defaultHolder, defaultACLDoc) {
    if (!ok || !defaultHolder || !defaultACLDoc) return callbackFunction(false, targetACLDoc); // ie message

    var ac = exists ? readACL(targetDoc, targetACLDoc) : readACL(defaultHolder, defaultACLDoc);
    loadUnionACL(subjects, function (ok, union) {
      if (!ok) return callbackFunction(false, union);

      if (sameACL(union, ac)) {
        log('Nice - same ACL. no change ' + utils.label(item) + ' ' + doc);
      } else {
        log('Group ACLs differ for ' + utils.label(item) + ' ' + doc); // log("Group ACLs: " + makeACLString(targetDoc, union, targetACLDoc))
        // log((exists ? "Previous set" : "Default") + " ACLs: " +
        // makeACLString(targetDoc, ac, targetACLDoc))

        putACLObject(kb, targetDoc, union, targetACLDoc, callbackFunction);
      }
    });
  });
}
/**
 * Set an ACL
 */


function setACL(docURI, aclText, callbackFunction) {
  var aclDoc = kb.any(docURI, _solidLogic.ACL_LINK); // @@ check that this get set by web.js

  if (!kb.fetcher) {
    throw new Error('Store has no fetcher');
  }

  if (aclDoc) {
    // Great we already know where it is
    kb.fetcher.webOperation('PUT', aclDoc.value, {
      data: aclText,
      contentType: 'text/turtle'
    }).then(function (res) {
      callbackFunction(res.ok, res.error || '');
    }); // @@@ check params
  } else {
    kb.fetcher.nowOrWhenFetched(docURI, undefined, function (ok, body) {
      if (!ok) return callbackFunction(ok, 'Gettting headers for ACL: ' + body);
      var aclDoc = kb.any(docURI, _solidLogic.ACL_LINK); // @@ check that this get set by web.js

      if (!aclDoc) {
        // complainIfBad(false, "No Link rel=ACL header for " + docURI)
        callbackFunction(false, 'No Link rel=ACL header for ' + docURI);
      } else {
        if (!kb.fetcher) {
          throw new Error('Store has no fetcher');
        }

        kb.fetcher.webOperation('PUT', aclDoc.value, {
          data: aclText,
          contentType: 'text/turtle'
        }).then(function (res) {
          callbackFunction(res.ok, res.error || '');
        });
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
    var ACL = ns.acl;
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
      var doc2 = (0, _rdflib.sym)(uri);
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


        var defaults = kb.each(undefined, ACL('default'), kb.sym(uri), defaultACLDoc).concat(kb.each(undefined, ACL('defaultForNew'), kb.sym(uri), defaultACLDoc));

        if (!defaults.length) {
          return tryParent(uri); // Keep searching
        }

        var defaultHolder = kb.sym(uri);
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
  if (!kb.fetcher) {
    throw new Error('kb has no fetcher');
  }

  kb.fetcher.nowOrWhenFetched(doc, undefined, function (ok, body) {
    if (!ok) {
      return callbackFunction(ok, "Can't get headers to find ACL for ".concat(doc, ": ").concat(body));
    }

    var aclDoc = kb.any(doc, _solidLogic.ACL_LINK); // @@ check that this get set by web.js

    if (!aclDoc) {
      callbackFunction(false, 900, "No Link rel=ACL header for ".concat(doc));
    } else {
      if (!kb.fetcher) {
        throw new Error('kb has no fetcher');
      }

      if (kb.fetcher.nonexistent[aclDoc.value]) {
        return callbackFunction(true, 404, aclDoc, "ACL file ".concat(aclDoc, " does not exist."));
      }

      kb.fetcher.nowOrWhenFetched(aclDoc, undefined, function (ok, message, response) {
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
  _getProspectiveHolder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(targetDirectory) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              return getACLorDefault((0, _rdflib.sym)(targetDirectory), function (ok, isDirectACL, targetDoc, targetACLDoc, defaultHolder) {
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