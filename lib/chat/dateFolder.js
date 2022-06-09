"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateFolder = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var debug = _interopRequireWildcard(require("../debug"));

var _solidLogic = require("solid-logic");

var ns = _interopRequireWildcard(require("../ns"));

var $rdf = _interopRequireWildcard(require("rdflib"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

// pull in first avoid cross-refs

/**
 * Track back through the YYYY/MM/DD tree to find the previous/next day
 */
var DateFolder = /*#__PURE__*/function () {
  function DateFolder(rootThing, leafFileName, membershipProperty) {
    (0, _classCallCheck2["default"])(this, DateFolder);
    this.root = rootThing;
    this.rootFolder = rootThing.dir();
    this.leafFileName = leafFileName || 'index.ttl'; // typically chat.ttl

    this.membershipProperty = membershipProperty || ns.wf('leafObject');
  }
  /* Generate the leaf document (rdf object) from date
   * @returns: <NamedNode> - document
   */


  (0, _createClass2["default"])(DateFolder, [{
    key: "leafDocumentFromDate",
    value: function leafDocumentFromDate(date) {
      // debug.log('incoming date: ' + date)
      var isoDate = date.toISOString(); // Like "2018-05-07T17:42:46.576Z"

      var path = isoDate.split('T')[0].replace(/-/g, '/'); //  Like "2018/05/07"

      path = this.root.dir().uri + path + '/' + this.leafFileName;
      return _solidLogic.store.sym(path);
    }
    /* Generate a date object from the leaf file name
     */

  }, {
    key: "dateFromLeafDocument",
    value: function dateFromLeafDocument(doc) {
      var head = this.rootFolder.uri.length;
      var str = doc.uri.slice(head, head + 10).replace(/\//g, '-'); // let date = new Date(str + 'Z') // GMT - but fails in FF - invalid format :-(

      var date = new Date(str); // not explicitly UTC but is assumed so in spec
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse

      debug.log('Date for ' + doc + ':' + date.toISOString());
      return date;
    }
  }, {
    key: "loadPrevious",
    value: function () {
      var _loadPrevious = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(date, backwards) {
        var thisDateFolder, previousPeriod, _previousPeriod, folder, found, doc;

        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _previousPeriod = function _previousPeriod3() {
                  _previousPeriod = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(file, level) {
                    var younger, suitable, lastNonEmpty, _lastNonEmpty, parent, siblings, folder, uncle, cousins, result;

                    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _lastNonEmpty = function _lastNonEmpty3() {
                              _lastNonEmpty = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(siblings) {
                                var _folder, leafDocument;

                                return _regeneratorRuntime().wrap(function _callee$(_context) {
                                  while (1) {
                                    switch (_context.prev = _context.next) {
                                      case 0:
                                        siblings = siblings.filter(suitable);
                                        siblings.sort(); // chronological order

                                        if (!backwards) siblings.reverse();

                                        if (!(level !== 3)) {
                                          _context.next = 5;
                                          break;
                                        }

                                        return _context.abrupt("return", siblings.pop());

                                      case 5:
                                        if (!siblings.length) {
                                          _context.next = 14;
                                          break;
                                        }

                                        _folder = siblings.pop();
                                        leafDocument = _solidLogic.store.sym(_folder.uri + thisDateFolder.leafFileName);
                                        _context.next = 10;
                                        return _solidLogic.store.fetcher.load(leafDocument);

                                      case 10:
                                        if (!(_solidLogic.store.statementsMatching(null, ns.dct('created'), null, leafDocument).length > 0)) {
                                          _context.next = 12;
                                          break;
                                        }

                                        return _context.abrupt("return", _folder);

                                      case 12:
                                        _context.next = 5;
                                        break;

                                      case 14:
                                        return _context.abrupt("return", null);

                                      case 15:
                                      case "end":
                                        return _context.stop();
                                    }
                                  }
                                }, _callee);
                              }));
                              return _lastNonEmpty.apply(this, arguments);
                            };

                            lastNonEmpty = function _lastNonEmpty2(_x5) {
                              return _lastNonEmpty.apply(this, arguments);
                            };

                            suitable = function _suitable(x) {
                              var tail = x.uri.slice(0, -1).split('/').slice(-1)[0];
                              if (!'0123456789'.includes(tail[0])) return false; // not numeric

                              return true;
                            };

                            younger = function _younger(x) {
                              if (backwards ? x.uri >= file.uri : x.uri <= file.uri) return false; // later than we want or same -- looking for different

                              return true;
                            };

                            // debug.log('  previousPeriod level' + level + ' file ' + file)
                            parent = file.dir();
                            _context2.next = 7;
                            return _solidLogic.store.fetcher.load(parent);

                          case 7:
                            siblings = _solidLogic.store.each(parent, ns.ldp('contains'));
                            siblings = siblings.filter(younger);
                            _context2.next = 11;
                            return lastNonEmpty(siblings);

                          case 11:
                            folder = _context2.sent;

                            if (!folder) {
                              _context2.next = 14;
                              break;
                            }

                            return _context2.abrupt("return", folder);

                          case 14:
                            if (!(level === 0)) {
                              _context2.next = 16;
                              break;
                            }

                            return _context2.abrupt("return", null);

                          case 16:
                            _context2.next = 18;
                            return previousPeriod(parent, level - 1);

                          case 18:
                            uncle = _context2.sent;

                            if (uncle) {
                              _context2.next = 21;
                              break;
                            }

                            return _context2.abrupt("return", null);

                          case 21:
                            _context2.next = 23;
                            return _solidLogic.store.fetcher.load(uncle);

                          case 23:
                            cousins = _solidLogic.store.each(uncle, ns.ldp('contains'));
                            _context2.next = 26;
                            return lastNonEmpty(cousins);

                          case 26:
                            result = _context2.sent;
                            return _context2.abrupt("return", result);

                          case 28:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));
                  return _previousPeriod.apply(this, arguments);
                };

                previousPeriod = function _previousPeriod2(_x3, _x4) {
                  return _previousPeriod.apply(this, arguments);
                };

                thisDateFolder = this;
                // previousPeriod
                folder = this.leafDocumentFromDate(date).dir();
                _context3.next = 6;
                return previousPeriod(folder, 3);

              case 6:
                found = _context3.sent;

                if (!found) {
                  _context3.next = 10;
                  break;
                }

                doc = _solidLogic.store.sym(found.uri + this.leafFileName);
                return _context3.abrupt("return", this.dateFromLeafDocument(doc));

              case 10:
                return _context3.abrupt("return", null);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadPrevious(_x, _x2) {
        return _loadPrevious.apply(this, arguments);
      }

      return loadPrevious;
    }() // loadPrevious

  }, {
    key: "firstLeaf",
    value: function () {
      var _firstLeaf = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(backwards) {
        var folderStore, folderFetcher, earliestSubfolder, _earliestSubfolder, y, month, d, leafDocument, leafObjects, msg, sortMe;

        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _earliestSubfolder = function _earliestSubfolder3() {
                  _earliestSubfolder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(parent) {
                    var suitable, kids;
                    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            suitable = function _suitable2(x) {
                              var tail = x.uri.slice(0, -1).split('/').slice(-1)[0];
                              if (!'0123456789'.includes(tail[0])) return false; // not numeric

                              return true;
                            };

                            debug.log('            parent ' + parent);
                            delete folderFetcher.requested[parent.uri]; // try {

                            _context4.next = 5;
                            return folderFetcher.load(parent, {
                              force: true
                            });

                          case 5:
                            // Force fetch as will have changed
                            // }catch (err) {
                            // }
                            kids = folderStore.each(parent, ns.ldp('contains'));
                            kids = kids.filter(suitable);

                            if (!(kids.length === 0)) {
                              _context4.next = 9;
                              break;
                            }

                            throw new Error(' @@@  No children to         parent2 ' + parent);

                          case 9:
                            kids.sort();
                            if (backwards) kids.reverse();
                            return _context4.abrupt("return", kids[0]);

                          case 12:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));
                  return _earliestSubfolder.apply(this, arguments);
                };

                earliestSubfolder = function _earliestSubfolder2(_x7) {
                  return _earliestSubfolder.apply(this, arguments);
                };

                // backwards -> last leafObject
                folderStore = $rdf.graph();
                folderFetcher = new $rdf.Fetcher(folderStore);
                _context5.next = 6;
                return earliestSubfolder(this.root.dir());

              case 6:
                y = _context5.sent;
                _context5.next = 9;
                return earliestSubfolder(y);

              case 9:
                month = _context5.sent;
                _context5.next = 12;
                return earliestSubfolder(month);

              case 12:
                d = _context5.sent;
                leafDocument = $rdf.sym(d.uri + 'chat.ttl');
                _context5.next = 16;
                return folderFetcher.load(leafDocument);

              case 16:
                leafObjects = folderStore.each(this.root, this.membershipProperty, null, leafDocument);

                if (!(leafObjects.length === 0)) {
                  _context5.next = 21;
                  break;
                }

                msg = '  INCONSISTENCY -- no chat leafObject in file ' + leafDocument;
                debug.trace(msg);
                throw new Error(msg);

              case 21:
                sortMe = leafObjects.map(function (leafObject) {
                  return [folderStore.any(leafObject, ns.dct('created')), leafObject];
                });
                sortMe.sort();
                if (backwards) sortMe.reverse();
                debug.log((backwards ? 'Latest' : 'Earliest') + ' leafObject is ' + sortMe[0][1]);
                return _context5.abrupt("return", sortMe[0][1]);

              case 26:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function firstLeaf(_x6) {
        return _firstLeaf.apply(this, arguments);
      }

      return firstLeaf;
    }() // firstleafObject

  }]);
  return DateFolder;
}(); // class


exports.DateFolder = DateFolder;
//# sourceMappingURL=dateFolder.js.map