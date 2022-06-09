"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessGroups = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _rdflib = require("rdflib");

var _acl = require("./acl");

var widgets = _interopRequireWildcard(require("../widgets"));

var ns = _interopRequireWildcard(require("../ns"));

var _addAgentButtons = require("./add-agent-buttons");

var debug = _interopRequireWildcard(require("../debug"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

var ACL = ns.acl;
var COLLOQUIAL = {
  13: 'Owners',
  9: 'Owners (write locked)',
  5: 'Editors',
  3: 'Posters',
  2: 'Submitters',
  1: 'Viewers'
};
var RECOMMENDED = {
  13: true,
  5: true,
  3: true,
  2: true,
  1: true
};
var EXPLANATION = {
  13: 'can read, write, and control sharing.',
  9: 'can read and control sharing, currently write-locked.',
  5: 'can read and change information',
  3: 'can add new information, and read but not change existing information',
  2: 'can add new information but not read any',
  1: 'can read but not change information'
};
/**
 * Type for the options parameter of [[AccessGroups]]
 */

/**
 * Renders the table of Owners, Editors, Posters, Submitters, Viewers
 * for https://github.com/solidos/userguide/blob/main/views/sharing/userguide.md
 */
var AccessGroups = /*#__PURE__*/function () {
  // @@ was LiveStore but does not need to be connected to web
  function AccessGroups(doc, aclDoc, controller, store) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    (0, _classCallCheck2["default"])(this, AccessGroups);
    this.doc = doc;
    this.aclDoc = aclDoc;
    this.controller = controller;
    this.options = options;
    (0, _defineProperty2["default"])(this, "defaults", void 0);
    (0, _defineProperty2["default"])(this, "byCombo", void 0);
    (0, _defineProperty2["default"])(this, "aclMap", void 0);
    (0, _defineProperty2["default"])(this, "addAgentButton", void 0);
    (0, _defineProperty2["default"])(this, "rootElement", void 0);
    (0, _defineProperty2["default"])(this, "_store", void 0);
    this.defaults = options.defaults || false;
    this._store = store;
    this.aclMap = (0, _acl.readACL)(doc, aclDoc, store, this.defaults);
    this.byCombo = (0, _acl.ACLbyCombination)(this.aclMap);
    this.addAgentButton = new _addAgentButtons.AddAgentButtons(this);
    this.rootElement = this.controller.dom.createElement('div');
    this.rootElement.classList.add(this.controller.classes.accessGroupList);
  }

  (0, _createClass2["default"])(AccessGroups, [{
    key: "store",
    get: function get() {
      return this._store;
    },
    set: function set(store) {
      this._store = store;
      this.aclMap = (0, _acl.readACL)(this.doc, this.aclDoc, store, this.defaults);
      this.byCombo = (0, _acl.ACLbyCombination)(this.aclMap);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      this.rootElement.innerHTML = '';
      this.renderGroups().forEach(function (group) {
        return _this.rootElement.appendChild(group);
      });

      if (this.controller.isEditable) {
        this.rootElement.appendChild(this.addAgentButton.render());
      }

      return this.rootElement;
    }
  }, {
    key: "renderGroups",
    value: function renderGroups() {
      var groupElements = [];

      for (var comboIndex = 15; comboIndex > 0; comboIndex--) {
        var combo = kToCombo(comboIndex);

        if (this.controller.isEditable && RECOMMENDED[comboIndex] || this.byCombo[combo]) {
          groupElements.push(this.renderGroup(comboIndex, combo));
        }
      }

      return groupElements;
    }
  }, {
    key: "renderGroup",
    value: function renderGroup(comboIndex, combo) {
      var _this2 = this;

      var groupRow = this.controller.dom.createElement('div');
      groupRow.classList.add(this.controller.classes.accessGroupListItem);
      widgets.makeDropTarget(groupRow, function (uris) {
        return _this2.handleDroppedUris(uris, combo).then(function () {
          return _this2.controller.render();
        })["catch"](function (error) {
          return _this2.controller.renderStatus(error);
        });
      });
      var groupColumns = this.renderGroupElements(comboIndex, combo);
      groupColumns.forEach(function (column) {
        return groupRow.appendChild(column);
      });
      return groupRow;
    }
  }, {
    key: "renderGroupElements",
    value: function renderGroupElements(comboIndex, combo) {
      var _this3 = this;

      var groupNameColumn = this.controller.dom.createElement('div');
      groupNameColumn.classList.add(this.controller.classes.group);
      groupNameColumn.classList.toggle(this.controller.classes["group-".concat(comboIndex)], this.controller.isEditable);
      groupNameColumn.innerText = COLLOQUIAL[comboIndex] || ktToList(comboIndex);
      var groupAgentsColumn = this.controller.dom.createElement('div');
      groupAgentsColumn.classList.add(this.controller.classes.group);
      groupAgentsColumn.classList.toggle(this.controller.classes["group-".concat(comboIndex)], this.controller.isEditable);
      var groupAgentsTable = groupAgentsColumn.appendChild(this.controller.dom.createElement('table'));
      var combos = this.byCombo[combo] || [];
      combos.map(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            pred = _ref2[0],
            obj = _ref2[1];

        return _this3.renderAgent(groupAgentsTable, combo, pred, obj);
      }).forEach(function (agentElement) {
        return groupAgentsTable.appendChild(agentElement);
      });
      var groupDescriptionElement = this.controller.dom.createElement('div');
      groupDescriptionElement.classList.add(this.controller.classes.group);
      groupDescriptionElement.classList.toggle(this.controller.classes["group-".concat(comboIndex)], this.controller.isEditable);
      groupDescriptionElement.innerText = EXPLANATION[comboIndex] || 'Unusual combination';
      return [groupNameColumn, groupAgentsColumn, groupDescriptionElement];
    }
  }, {
    key: "renderAgent",
    value: function renderAgent(groupAgentsTable, combo, pred, obj) {
      var _this4 = this;

      var personRow = widgets.personTR(this.controller.dom, ACL(pred), (0, _rdflib.sym)(obj), this.controller.isEditable ? {
        deleteFunction: function deleteFunction() {
          return _this4.deleteAgent(combo, pred, obj).then(function () {
            return groupAgentsTable.removeChild(personRow);
          })["catch"](function (error) {
            return _this4.controller.renderStatus(error);
          });
        }
      } : {});
      return personRow;
    }
  }, {
    key: "deleteAgent",
    value: function () {
      var _deleteAgent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(combo, pred, obj) {
        var combos, comboToRemove;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                combos = this.byCombo[combo] || [];
                comboToRemove = combos.find(function (_ref3) {
                  var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
                      comboPred = _ref4[0],
                      comboObj = _ref4[1];

                  return comboPred === pred && comboObj === obj;
                });

                if (comboToRemove) {
                  combos.splice(combos.indexOf(comboToRemove), 1);
                }

                _context.next = 5;
                return this.controller.save();

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function deleteAgent(_x, _x2, _x3) {
        return _deleteAgent.apply(this, arguments);
      }

      return deleteAgent;
    }()
  }, {
    key: "addNewURI",
    value: function () {
      var _addNewURI = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(uri) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.handleDroppedUri(uri, kToCombo(1));

              case 2:
                _context2.next = 4;
                return this.controller.save();

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addNewURI(_x4) {
        return _addNewURI.apply(this, arguments);
      }

      return addNewURI;
    }()
  }, {
    key: "handleDroppedUris",
    value: function () {
      var _handleDroppedUris = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(uris, combo) {
        var _this5 = this;

        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return Promise.all(uris.map(function (uri) {
                  return _this5.handleDroppedUri(uri, combo);
                }));

              case 3:
                _context3.next = 5;
                return this.controller.save();

              case 5:
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", Promise.reject(_context3.t0));

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function handleDroppedUris(_x5, _x6) {
        return _handleDroppedUris.apply(this, arguments);
      }

      return handleDroppedUris;
    }()
  }, {
    key: "handleDroppedUri",
    value: function () {
      var _handleDroppedUri = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(uri, combo) {
        var secondAttempt,
            agent,
            thing,
            _this$_store,
            _this$_store$fetcher,
            message,
            error,
            _args4 = arguments;

        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                secondAttempt = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : false;
                agent = findAgent(uri, this.store); // eg 'agent', 'origin', agentClass'

                thing = (0, _rdflib.sym)(uri);

                if (!(!agent && !secondAttempt)) {
                  _context4.next = 18;
                  break;
                }

                debug.log("   Not obvious: looking up dropped thing ".concat(thing));
                _context4.prev = 5;
                _context4.next = 8;
                return (_this$_store = this._store) === null || _this$_store === void 0 ? void 0 : (_this$_store$fetcher = _this$_store.fetcher) === null || _this$_store$fetcher === void 0 ? void 0 : _this$_store$fetcher.load(thing.doc());

              case 8:
                _context4.next = 15;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](5);
                message = "Ignore error looking up dropped thing: ".concat(_context4.t0);
                debug.error(message);
                return _context4.abrupt("return", Promise.reject(new Error(message)));

              case 15:
                return _context4.abrupt("return", this.handleDroppedUri(uri, combo, true));

              case 18:
                if (agent) {
                  _context4.next = 22;
                  break;
                }

                error = "   Error: Drop fails to drop appropriate thing! ".concat(uri);
                debug.error(error);
                return _context4.abrupt("return", Promise.reject(new Error(error)));

              case 22:
                this.setACLCombo(combo, uri, agent, this.controller.subject);

              case 23:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[5, 10]]);
      }));

      function handleDroppedUri(_x7, _x8) {
        return _handleDroppedUri.apply(this, arguments);
      }

      return handleDroppedUri;
    }()
  }, {
    key: "setACLCombo",
    value: function setACLCombo(combo, uri, res, subject) {
      if (!(combo in this.byCombo)) {
        this.byCombo[combo] = [];
      }

      this.removeAgentFromCombos(uri); // Combos are mutually distinct

      this.byCombo[combo].push([res.pred, res.obj.uri]);
      debug.log("ACL: setting access to ".concat(subject, " by ").concat(res.pred, ": ").concat(res.obj));
    }
  }, {
    key: "removeAgentFromCombos",
    value: function removeAgentFromCombos(uri) {
      for (var k = 0; k < 16; k++) {
        var combos = this.byCombo[kToCombo(k)];

        if (combos) {
          for (var i = 0; i < combos.length; i++) {
            while (i < combos.length && combos[i][1] === uri) {
              combos.splice(i, 1);
            }
          }
        }
      }
    }
  }]);
  return AccessGroups;
}();

exports.AccessGroups = AccessGroups;

function kToCombo(k) {
  var y = ['Read', 'Append', 'Write', 'Control'];
  var combo = [];

  for (var i = 0; i < 4; i++) {
    if (k & 1 << i) {
      combo.push('http://www.w3.org/ns/auth/acl#' + y[i]);
    }
  }

  combo.sort();
  return combo.join('\n');
}

function ktToList(k) {
  var list = '';
  var y = ['Read', 'Append', 'Write', 'Control'];

  for (var i = 0; i < 4; i++) {
    if (k & 1 << i) {
      list += y[i];
    }
  }

  return list;
}

function findAgent(uri, kb) {
  var obj = (0, _rdflib.sym)(uri);
  var types = kb.findTypeURIs(obj);

  for (var ty in types) {
    debug.log('    drop object type includes: ' + ty);
  } // An Origin URI is one like https://fred.github.io eith no trailing slash


  if (uri.startsWith('http') && uri.split('/').length === 3) {
    // there is no third slash
    return {
      pred: 'origin',
      obj: obj
    }; // The only way to know an origin alas
  } // @@ This is an almighty kludge needed because drag and drop adds extra slashes to origins


  if (uri.startsWith('http') && uri.split('/').length === 4 && uri.endsWith('/')) {
    // there  IS third slash
    debug.log('Assuming final slash on dragged origin URI was unintended!');
    return {
      pred: 'origin',
      obj: (0, _rdflib.sym)(uri.slice(0, -1))
    }; // Fix a URI where the drag and drop system has added a spurious slash
  }

  if (ns.vcard('WebID').uri in types) return {
    pred: 'agent',
    obj: obj
  };

  if (ns.vcard('Group').uri in types) {
    return {
      pred: 'agentGroup',
      obj: obj
    }; // @@ note vcard membership not RDFs
  }

  if (obj.sameTerm(ns.foaf('Agent')) || obj.sameTerm(ns.acl('AuthenticatedAgent')) || // AuthenticatedAgent
  obj.sameTerm(ns.rdf('Resource')) || obj.sameTerm(ns.owl('Thing'))) {
    return {
      pred: 'agentClass',
      obj: obj
    };
  }

  if (ns.vcard('Individual').uri in types || ns.foaf('Person').uri in types || ns.foaf('Agent').uri in types) {
    var pref = kb.any(obj, ns.foaf('preferredURI'));
    if (pref) return {
      pred: 'agent',
      obj: (0, _rdflib.sym)(pref)
    };
    return {
      pred: 'agent',
      obj: obj
    };
  }

  if (ns.solid('AppProvider').uri in types) {
    return {
      pred: 'origin',
      obj: obj
    };
  }

  if (ns.solid('AppProviderClass').uri in types) {
    return {
      pred: 'originClass',
      obj: obj
    };
  }

  debug.log('    Triage fails for ' + uri);
  return null;
}
//# sourceMappingURL=access-groups.js.map