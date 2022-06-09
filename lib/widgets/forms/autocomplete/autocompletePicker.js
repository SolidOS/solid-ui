"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof3 = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderAutoComplete = renderAutoComplete;
exports.setVisible = setVisible;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var debug = _interopRequireWildcard(require("../../../debug"));

var style = _interopRequireWildcard(require("../../../style"));

var widgets = _interopRequireWildcard(require("../../../widgets"));

var _solidLogic = require("solid-logic");

var _publicData = require("./publicData");

var _language = require("./language");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == (0, _typeof2["default"])(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

var AUTOCOMPLETE_THRESHOLD = 4; // don't check until this many characters typed

var AUTOCOMPLETE_ROWS = 20; // 20?

var AUTOCOMPLETE_ROWS_STRETCH = 40;
/*
Autocomplete happens in 6 phases:
  1. The search string is too small to bother
  2. The search string is big enough, and we have not loaded the array
  3. The search string is big enough, and we have loaded array up to the limit
       Display them and wait for more user input
  4. The search string is big enough, and we have loaded array NOT to the limit
     but including all matches.   No more fetches.
     If user gets more precise, wait for them to select one - or reduce to a single
  5. Single one selected. Optionally waiting for accept button to be pressed, OR can change string and go to 5 or 2
  6. Locked with a value. Press 'edit' button to return to 5
*/

function setVisible(element, visible) {
  element.style.display = visible ? '' : 'none'; // Do not use visibility, it holds the real estate
} // The core of the autocomplete UI


function renderAutoComplete(_x, _x2, _x3, _x4) {
  return _renderAutoComplete.apply(this, arguments);
} // renderAutoComplete
// ENDS


function _renderAutoComplete() {
  _renderAutoComplete = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(dom, acOptions, decoration, callback) {
    var complain, finish, gotIt, _gotIt, acceptButtonHandler, _acceptButtonHandler, cancelButtonHandler, _cancelButtonHandler, nameMatch, clearList, inputEventHHandler, _inputEventHHandler, loadBindingsAndFilterByLanguage, _loadBindingsAndFilterByLanguage, filterByName, refreshList, _refreshList, initialize, targetClass, lastBindings, loadedEnough, inputEventHandlerLock, allDisplayed, lastFilter, numberOfRows, div, foundName, foundObject, table, head, cell, searchInput, size, searchInputStyle;

    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            initialize = function _initialize() {
              if (acOptions.currentObject) {
                // If have existing value then jump into the endgame of the autocomplete
                searchInput.value = acOptions.currentName ? acOptions.currentName.value : '??? wot no name for ' + acOptions.currentObject;
                foundName = acOptions.currentName;
                lastFilter = acOptions.currentName ? acOptions.currentName.value : undefined;
                foundObject = acOptions.currentObject;
              } else {
                searchInput.value = '';
                lastFilter = undefined;
                foundObject = undefined;
              }

              if (decoration.deleteButton) {
                setVisible(decoration.deleteButton, !!acOptions.currentObject);
              }

              if (decoration.acceptButton) {
                setVisible(decoration.acceptButton, false); // hide until input complete
              }

              if (decoration.editButton) {
                setVisible(decoration.editButton, true);
              }

              if (decoration.cancelButton) {
                setVisible(decoration.cancelButton, false); // only allow cancel when there is something to cancel
              }

              inputEventHandlerLock = false;
              clearList();
            };

            _refreshList = function _refreshList3() {
              _refreshList = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
                var rowForBinding, compareBindingsByName, languagePrefs, filter, slimmed, displayable, _iterator, _step, binding;

                return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        compareBindingsByName = function _compareBindingsByNam(self, other) {
                          return other.name.value > self.name.value ? 1 : other.name.name < self.name.value ? -1 : 0;
                        };

                        rowForBinding = function _rowForBinding(binding) {
                          var row = dom.createElement('tr');
                          style.setStyle(row, 'autocompleteRowStyle');
                          row.setAttribute('style', 'padding: 0.3em;');
                          row.style.color = allDisplayed ? '#080' : '#088'; // green means 'you should find it here'

                          row.textContent = binding.name.value;
                          var object = (0, _publicData.bindingToTerm)(binding.subject);
                          var nameTerm = (0, _publicData.bindingToTerm)(binding.name);
                          row.addEventListener('click', /*#__PURE__*/function () {
                            var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_event) {
                              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                                while (1) {
                                  switch (_context6.prev = _context6.next) {
                                    case 0:
                                      debug.log('       click row textContent: ' + row.textContent);
                                      debug.log('       click name: ' + nameTerm.value);

                                      if (object && nameTerm) {
                                        gotIt(object, nameTerm);
                                      }

                                    case 3:
                                    case "end":
                                      return _context6.stop();
                                  }
                                }
                              }, _callee6);
                            }));

                            return function (_x12) {
                              return _ref.apply(this, arguments);
                            };
                          }());
                          return row;
                        };

                        if (!inputEventHandlerLock) {
                          _context7.next = 5;
                          break;
                        }

                        debug.log("Ignoring \"".concat(searchInput.value, "\" because of lock "));
                        return _context7.abrupt("return");

                      case 5:
                        debug.log("Setting lock at \"".concat(searchInput.value, "\""));
                        inputEventHandlerLock = true;
                        _context7.next = 9;
                        return (0, _language.getPreferredLanguages)();

                      case 9:
                        languagePrefs = _context7.sent;
                        filter = searchInput.value.trim().toLowerCase();

                        if (!(filter.length < AUTOCOMPLETE_THRESHOLD)) {
                          _context7.next = 16;
                          break;
                        }

                        // too small
                        clearList(); // candidatesLoaded = false

                        numberOfRows = AUTOCOMPLETE_ROWS;
                        _context7.next = 31;
                        break;

                      case 16:
                        if (!(!allDisplayed || !lastFilter || !filter.startsWith(lastFilter))) {
                          _context7.next = 21;
                          break;
                        }

                        debug.log("   Querying database at \"".concat(filter, "\" cf last \"").concat(lastFilter, "\"."));
                        _context7.next = 20;
                        return loadBindingsAndFilterByLanguage(filter, languagePrefs);

                      case 20:
                        lastBindings = _context7.sent;

                      case 21:
                        // Trim table as search gets tighter:
                        slimmed = filterByName(filter, lastBindings);

                        if (loadedEnough && slimmed.length <= AUTOCOMPLETE_ROWS_STRETCH) {
                          numberOfRows = slimmed.length; // stretch if it means we get all items
                        }

                        allDisplayed = loadedEnough && slimmed.length <= numberOfRows;
                        debug.log(" Filter:\"".concat(filter, "\" lastBindings: ").concat(lastBindings.length, ", slimmed to ").concat(slimmed.length, "; rows: ").concat(numberOfRows, ", Enough? ").concat(loadedEnough, ", All displayed? ").concat(allDisplayed));
                        displayable = slimmed.slice(0, numberOfRows);
                        displayable.sort(compareBindingsByName);
                        clearList();
                        _iterator = _createForOfIteratorHelper(displayable);

                        try {
                          for (_iterator.s(); !(_step = _iterator.n()).done;) {
                            binding = _step.value;
                            table.appendChild(rowForBinding(binding));
                          }
                        } catch (err) {
                          _iterator.e(err);
                        } finally {
                          _iterator.f();
                        }

                        if (slimmed.length === 1) {
                          gotIt((0, _publicData.bindingToTerm)(slimmed[0].subject), (0, _publicData.bindingToTerm)(slimmed[0].name));
                        }

                      case 31:
                        // else
                        inputEventHandlerLock = false;

                      case 32:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));
              return _refreshList.apply(this, arguments);
            };

            refreshList = function _refreshList2() {
              return _refreshList.apply(this, arguments);
            };

            filterByName = function _filterByName(filter, bindings) {
              return bindings.filter(function (binding) {
                return nameMatch(filter, binding.name.value);
              });
            };

            _loadBindingsAndFilterByLanguage = function _loadBindingsAndFilte2() {
              _loadBindingsAndFilterByLanguage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(filter, languagePrefs) {
                var bindings, slimmed;
                return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return (0, _publicData.queryPublicDataByName)(filter, targetClass, languagePrefs || _language.defaultPreferredLanguages, acOptions.queryParams);

                      case 3:
                        bindings = _context5.sent;
                        _context5.next = 11;
                        break;

                      case 6:
                        _context5.prev = 6;
                        _context5.t0 = _context5["catch"](0);
                        complain('Error querying db of organizations: ' + _context5.t0);
                        inputEventHandlerLock = false;
                        return _context5.abrupt("return");

                      case 11:
                        loadedEnough = bindings.length < _publicData.AUTOCOMPLETE_LIMIT;

                        if (loadedEnough) {
                          lastFilter = filter;
                        } else {
                          lastFilter = undefined;
                        }

                        clearList();
                        slimmed = (0, _language.filterByLanguage)(bindings, languagePrefs);
                        return _context5.abrupt("return", slimmed);

                      case 16:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, null, [[0, 6]]);
              }));
              return _loadBindingsAndFilterByLanguage.apply(this, arguments);
            };

            loadBindingsAndFilterByLanguage = function _loadBindingsAndFilte(_x10, _x11) {
              return _loadBindingsAndFilterByLanguage.apply(this, arguments);
            };

            _inputEventHHandler = function _inputEventHHandler3() {
              _inputEventHHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_event) {
                return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        // console.log('@@ AC inputEventHHandler called')
                        setVisible(decoration.cancelButton, true); // only allow cancel when there is something to cancel

                        refreshList(); /// @@  debounqce does not work with jest

                        /*
                        if (runningTimeout) {
                          clearTimeout(runningTimeout)
                        }
                        runningTimeout = setTimeout(refreshList, AUTOCOMPLETE_DEBOUNCE_MS)
                        */

                      case 2:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));
              return _inputEventHHandler.apply(this, arguments);
            };

            inputEventHHandler = function _inputEventHHandler2(_x9) {
              return _inputEventHHandler.apply(this, arguments);
            };

            clearList = function _clearList() {
              while (table.children.length > 1) {
                table.removeChild(table.lastChild);
              }
            };

            nameMatch = function _nameMatch(filter, candidate) {
              var parts = filter.split(' '); // Each name part must be somewhere

              for (var j = 0; j < parts.length; j++) {
                var word = parts[j];
                if (candidate.toLowerCase().indexOf(word) < 0) return false;
              }

              return true;
            };

            _cancelButtonHandler = function _cancelButtonHandler3() {
              _cancelButtonHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_event) {
                return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        debug.log('Auto complete: Canceled by user! ');

                        if (acOptions.permanent) {
                          initialize();
                        } else {
                          if (div.parentNode) {
                            div.parentNode.removeChild(div);
                          }
                        }

                      case 2:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));
              return _cancelButtonHandler.apply(this, arguments);
            };

            cancelButtonHandler = function _cancelButtonHandler2(_x8) {
              return _cancelButtonHandler.apply(this, arguments);
            };

            _acceptButtonHandler = function _acceptButtonHandler3() {
              _acceptButtonHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_event) {
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (foundName && searchInput.value === foundName.value) {
                          // still
                          finish(foundObject, foundName);
                        }

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));
              return _acceptButtonHandler.apply(this, arguments);
            };

            acceptButtonHandler = function _acceptButtonHandler2(_x7) {
              return _acceptButtonHandler.apply(this, arguments);
            };

            _gotIt = function _gotIt3() {
              _gotIt = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(object, name) {
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!decoration.acceptButton) {
                          _context.next = 10;
                          break;
                        }

                        decoration.acceptButton.disbaled = false;
                        setVisible(decoration.acceptButton, true); // now wait for confirmation

                        searchInput.value = name.value; // complete it

                        foundName = name;
                        foundObject = object;
                        debug.log('Auto complete: name: ' + name);
                        debug.log('Auto complete: waiting for accept ' + object);
                        clearList(); // This may be an option - nice and clean but does not allow change of mind

                        return _context.abrupt("return");

                      case 10:
                        setVisible(decoration.cancelButton, true);
                        finish(object, name);

                      case 12:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return _gotIt.apply(this, arguments);
            };

            gotIt = function _gotIt2(_x5, _x6) {
              return _gotIt.apply(this, arguments);
            };

            finish = function _finish(object, name) {
              debug.log('Auto complete: finish! ' + object);

              if (object.termType === 'Literal' && acOptions.queryParams.objectURIBase) {
                object = _solidLogic.store.sym(acOptions.queryParams.objectURIBase.value + object.value);
              } // remove(decoration.cancelButton)
              // remove(decoration.acceptButton)
              // remove(div)


              clearList();
              callback(object, name);
            };

            complain = function _complain(message) {
              var errorRow = table.appendChild(dom.createElement('tr'));
              debug.log(message);
              var err = new Error(message);
              errorRow.appendChild(widgets.errorMessageBlock(dom, err, 'pink')); // errorMessageBlock will log the stack to the console

              style.setStyle(errorRow, 'autocompleteRowStyle');
              errorRow.style.padding = '1em';
            };

            // initialiize
            // const queryParams: QueryParameters = acOptions.queryParams
            targetClass = acOptions.targetClass;

            if (targetClass) {
              _context8.next = 21;
              break;
            }

            throw new Error('renderAutoComplete: missing targetClass');

          case 21:
            // console.log(`renderAutoComplete: targetClass=${targetClass}` )
            if (decoration.acceptButton) {
              decoration.acceptButton.addEventListener('click', acceptButtonHandler, false);
            }

            if (decoration.cancelButton) {
              decoration.cancelButton.addEventListener('click', cancelButtonHandler, false);
            } // var candidatesLoaded = false


            loadedEnough = false;
            inputEventHandlerLock = false;
            allDisplayed = false;
            lastFilter = undefined;
            numberOfRows = AUTOCOMPLETE_ROWS; // this gets slimmed down

            div = dom.createElement('div');
            foundName = undefined; // once found accepted string must match this

            foundObject = undefined;
            table = div.appendChild(dom.createElement('table'));
            table.setAttribute('data-testid', 'autocomplete-table');
            table.setAttribute('style', 'max-width: 30em; margin: 0.5em;');
            head = table.appendChild(dom.createElement('tr'));
            style.setStyle(head, 'autocompleteRowStyle'); // textInputStyle or

            cell = head.appendChild(dom.createElement('td'));
            searchInput = cell.appendChild(dom.createElement('input'));
            searchInput.setAttribute('type', 'text');
            initialize();
            size = acOptions.size || style.textInputSize || 20;
            searchInput.setAttribute('size', size);
            searchInput.setAttribute('data-testid', 'autocomplete-input');
            searchInputStyle = style.textInputStyle || // searchInputStyle ?
            'border: 0.1em solid #444; border-radius: 0.5em; width: 100%; font-size: 100%; padding: 0.1em 0.6em'; // @

            searchInput.setAttribute('style', searchInputStyle);
            searchInput.addEventListener('keyup', function (event) {
              if (event.keyCode === 13) {
                acceptButtonHandler(event);
              }
            }, false);
            searchInput.addEventListener('input', inputEventHHandler); // console.log('@@ renderAutoComplete returns ' + div.innerHTML)

            return _context8.abrupt("return", div);

          case 48:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _renderAutoComplete.apply(this, arguments);
}
//# sourceMappingURL=autocompletePicker.js.map