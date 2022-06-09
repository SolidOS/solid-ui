"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof3 = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderAutocompleteControl = renderAutocompleteControl;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var ns = _interopRequireWildcard(require("../../../ns"));

var _iconBase = require("../../../iconBase");

var _solidLogic = require("solid-logic");

var widgets = _interopRequireWildcard(require("../../../widgets"));

var utils = _interopRequireWildcard(require("../../../utils"));

var _autocompletePicker = require("./autocompletePicker");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == (0, _typeof2["default"])(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

var WEBID_NOUN = 'Solid ID';
var GREEN_PLUS = _iconBase.icons.iconBase + 'noun_34653_green.svg';
var SEARCH_ICON = _iconBase.icons.iconBase + 'noun_Search_875351.svg';
var EDIT_ICON = _iconBase.icons.iconBase + 'noun_253504.svg'; // const DELETE_ICON = icons.iconBase + 'noun_2188_red.svg'

function renderAutocompleteControl(_x, _x2, _x3, _x4, _x5, _x6) {
  return _renderAutocompleteControl.apply(this, arguments);
} // renderAutocompleteControl
// ends


function _renderAutocompleteControl() {
  _renderAutocompleteControl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(dom, person, barOptions, acOptions, addOneIdAndRefresh, deleteOne) {
    var autoCompleteDone, _autoCompleteDone, greenButtonHandler, _greenButtonHandler, removeDecorated, displayAutocomplete, _displayAutocomplete, searchButtonHandler, _searchButtonHandler, droppedURIHandler, _droppedURIHandler, acceptButton, cancelButton, deleteButtonContainer, noun, deleteButton, editButton, editing, syncEditingStatus, decoration, decoratedAutocomplete, creationArea, plus;

    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            syncEditingStatus = function _syncEditingStatus() {
              if (editing) {
                (0, _autocompletePicker.setVisible)(editButton, false);
                (0, _autocompletePicker.setVisible)(acceptButton, false); // not till got it

                (0, _autocompletePicker.setVisible)(cancelButton, false);
              } else {
                (0, _autocompletePicker.setVisible)(editButton, true);
                (0, _autocompletePicker.setVisible)(acceptButton, false);
                (0, _autocompletePicker.setVisible)(cancelButton, false);
              }
            };

            _droppedURIHandler = function _droppedURIHandler3() {
              _droppedURIHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(uris) {
                var _iterator, _step, webid;

                return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _iterator = _createForOfIteratorHelper(uris);
                        _context5.prev = 1;

                        _iterator.s();

                      case 3:
                        if ((_step = _iterator.n()).done) {
                          _context5.next = 9;
                          break;
                        }

                        webid = _step.value;
                        _context5.next = 7;
                        return addOneIdAndRefresh(person, webid);

                      case 7:
                        _context5.next = 3;
                        break;

                      case 9:
                        _context5.next = 14;
                        break;

                      case 11:
                        _context5.prev = 11;
                        _context5.t0 = _context5["catch"](1);

                        _iterator.e(_context5.t0);

                      case 14:
                        _context5.prev = 14;

                        _iterator.f();

                        return _context5.finish(14);

                      case 17:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, null, [[1, 11, 14, 17]]);
              }));
              return _droppedURIHandler.apply(this, arguments);
            };

            droppedURIHandler = function _droppedURIHandler2(_x11) {
              return _droppedURIHandler.apply(this, arguments);
            };

            _searchButtonHandler = function _searchButtonHandler3() {
              _searchButtonHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_event) {
                return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (!decoratedAutocomplete) {
                          _context4.next = 5;
                          break;
                        }

                        creationArea.removeChild(decoratedAutocomplete);
                        decoratedAutocomplete = undefined;
                        _context4.next = 7;
                        break;

                      case 5:
                        _context4.next = 7;
                        return displayAutocomplete();

                      case 7:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));
              return _searchButtonHandler.apply(this, arguments);
            };

            searchButtonHandler = function _searchButtonHandler2(_x10) {
              return _searchButtonHandler.apply(this, arguments);
            };

            _displayAutocomplete = function _displayAutocomplete3() {
              _displayAutocomplete = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        decoratedAutocomplete = dom.createElement('div');
                        decoratedAutocomplete.setAttribute('style', 'display: flex; flex-flow: wrap;');
                        _context3.t0 = decoratedAutocomplete;
                        _context3.next = 5;
                        return (0, _autocompletePicker.renderAutoComplete)(dom, acOptions, decoration, autoCompleteDone);

                      case 5:
                        _context3.t1 = _context3.sent;

                        _context3.t0.appendChild.call(_context3.t0, _context3.t1);

                        // console.log('@@ acceptButton', acceptButton)
                        decoratedAutocomplete.appendChild(acceptButton); // console.log('@@ cancelButton', cancelButton)

                        decoratedAutocomplete.appendChild(cancelButton); // console.log('@@ editButton', editButton)

                        decoratedAutocomplete.appendChild(editButton); // console.log('@@ deleteButtonContainer', deleteButtonContainer)

                        decoratedAutocomplete.appendChild(deleteButtonContainer);
                        creationArea.appendChild(decoratedAutocomplete);

                      case 12:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));
              return _displayAutocomplete.apply(this, arguments);
            };

            displayAutocomplete = function _displayAutocomplete2() {
              return _displayAutocomplete.apply(this, arguments);
            };

            removeDecorated = function _removeDecorated() {
              if (decoratedAutocomplete) {
                creationArea.removeChild(decoratedAutocomplete);
                decoratedAutocomplete = undefined;
              }
            };

            _greenButtonHandler = function _greenButtonHandler3() {
              _greenButtonHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_event) {
                var webid;
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return widgets.askName(dom, _solidLogic.store, creationArea, ns.vcard('url'), undefined, WEBID_NOUN);

                      case 2:
                        webid = _context2.sent;

                        if (webid) {
                          _context2.next = 5;
                          break;
                        }

                        return _context2.abrupt("return");

                      case 5:
                        return _context2.abrupt("return", addOneIdAndRefresh(person, webid));

                      case 6:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));
              return _greenButtonHandler.apply(this, arguments);
            };

            greenButtonHandler = function _greenButtonHandler2(_x9) {
              return _greenButtonHandler.apply(this, arguments);
            };

            _autoCompleteDone = function _autoCompleteDone3() {
              _autoCompleteDone = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(object, name) {
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (acOptions.permanent) {
                          // remember to set this in publicid panel
                          (0, _autocompletePicker.setVisible)(editButton, true);
                          (0, _autocompletePicker.setVisible)(acceptButton, false);
                          (0, _autocompletePicker.setVisible)(cancelButton, false);
                        } else {
                          // console.log('temporary - removed decoratiion')
                          removeDecorated();
                        }

                        return _context.abrupt("return", addOneIdAndRefresh(object, name));

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return _autoCompleteDone.apply(this, arguments);
            };

            autoCompleteDone = function _autoCompleteDone2(_x7, _x8) {
              return _autoCompleteDone.apply(this, arguments);
            };

            acceptButton = widgets.continueButton(dom);
            acceptButton.setAttribute('data-testid', 'accept-button');
            cancelButton = widgets.cancelButton(dom);
            cancelButton.setAttribute('data-testid', 'cancel-button');
            deleteButtonContainer = dom.createElement('div');
            noun = acOptions.targetClass ? utils.label(acOptions.targetClass) : 'item';
            deleteButton = widgets.deleteButtonWithCheck(dom, deleteButtonContainer, noun, deleteOne); // need to knock out this UI or caller does that

            deleteButton.setAttribute('data-testid', 'delete-button');
            editButton = widgets.button(dom, EDIT_ICON, 'Edit', function (_event) {
              editing = !editing;
              syncEditingStatus();
            });
            editButton.setAttribute('data-testid', 'edit-button');
            editing = true;
            decoration = {
              acceptButton: acceptButton,
              cancelButton: cancelButton,
              editButton: editButton,
              deleteButton: deleteButton
            };
            decoratedAutocomplete = undefined;
            creationArea = dom.createElement('div');
            creationArea.style.display = 'flex';
            creationArea.style.flexDirection = 'row';

            if (!(acOptions.permanent || acOptions.currentObject)) {
              _context6.next = 31;
              break;
            }

            _context6.next = 31;
            return displayAutocomplete();

          case 31:
            if (barOptions.editable) {
              // creationArea.appendChild(await renderAutoComplete(dom, barOptions, autoCompleteDone)) wait for searchButton
              creationArea.style.width = '100%';

              if (barOptions.manualURIEntry) {
                plus = creationArea.appendChild(widgets.button(dom, GREEN_PLUS, barOptions.idNoun, greenButtonHandler));
                widgets.makeDropTarget(plus, droppedURIHandler, undefined);
              }

              if (barOptions.dbLookup && !acOptions.currentObject && !acOptions.permanent) {
                creationArea.appendChild(widgets.button(dom, SEARCH_ICON, barOptions.idNoun, searchButtonHandler));
              }
            }

            syncEditingStatus();
            return _context6.abrupt("return", creationArea);

          case 34:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _renderAutocompleteControl.apply(this, arguments);
}
//# sourceMappingURL=autocompleteBar.js.map