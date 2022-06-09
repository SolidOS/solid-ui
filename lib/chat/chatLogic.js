"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatChannel = void 0;
exports._createIfNotExists = _createIfNotExists;
exports.isDeleted = isDeleted;
exports.isHidden = isHidden;
exports.isReplaced = isReplaced;
exports.mostRecentVersion = mostRecentVersion;
exports.nick = nick;
exports.originalVersion = originalVersion;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var debug = _interopRequireWildcard(require("../debug"));

var _dateFolder = require("./dateFolder");

var _solidLogic = require("solid-logic");

var ns = _interopRequireWildcard(require("../ns"));

var $rdf = _interopRequireWildcard(require("rdflib"));

var utils = _interopRequireWildcard(require("../utils"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

/* The Solid logic for a 'LongChat'
*/

/**
 * Common code for a chat (discussion area of messages about something)
 * This version runs over a series of files for different time periods
 *
 * Parameters for the whole chat like its title are stored on
 * index.ttl#this and the chats messages are stored in YYYY/MM/DD/chat.ttl
 *
 */
var ChatChannel = /*#__PURE__*/function () {
  function ChatChannel(channel, options) {
    (0, _classCallCheck2["default"])(this, ChatChannel);
    this.channel = channel;
    this.channelRoot = channel.doc();
    this.options = options;
    this.dateFolder = new _dateFolder.DateFolder(this.channelRoot, 'chat.ttl');
    this.div = null; // : HTMLElement
  }
  /* Store a new message in the web,
  */


  (0, _createClass2["default"])(ChatChannel, [{
    key: "createMessage",
    value: function () {
      var _createMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(text) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.updateMessage(text));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createMessage(_x) {
        return _createMessage.apply(this, arguments);
      }

      return createMessage;
    }()
    /* Store a new message in the web,
      as a replacement for an existing one.
      The old one iis left, and the two are linked
    */

  }, {
    key: "updateMessage",
    value: function () {
      var _updateMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(text) {
        var oldMsg,
            deleteIt,
            sts,
            now,
            timestamp,
            dateStamp,
            chatDocument,
            message,
            me,
            msg,
            _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                oldMsg = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
                deleteIt = _args2.length > 2 ? _args2[2] : undefined;
                sts = [];
                now = new Date();
                timestamp = '' + now.getTime();
                dateStamp = $rdf.term(now);
                chatDocument = oldMsg ? oldMsg.doc() : this.dateFolder.leafDocumentFromDate(now);
                message = _solidLogic.store.sym(chatDocument.uri + '#' + 'Msg' + timestamp); // const content = store.literal(text)

                me = _solidLogic.authn.currentUser(); // If already logged on

                if (oldMsg) {
                  // edit message replaces old one
                  sts.push($rdf.st(mostRecentVersion(oldMsg), ns.dct('isReplacedBy'), message, chatDocument));

                  if (deleteIt) {
                    sts.push($rdf.st(message, ns.schema('dateDeleted'), dateStamp, chatDocument));
                  }
                } else {
                  // link new message to channel
                  sts.push($rdf.st(this.channel, ns.wf('message'), message, chatDocument));
                }

                sts.push($rdf.st(message, ns.sioc('content'), _solidLogic.store.literal(text), chatDocument));
                sts.push($rdf.st(message, ns.dct('created'), dateStamp, chatDocument));

                if (me) {
                  sts.push($rdf.st(message, ns.foaf('maker'), me, chatDocument));
                }

                _context2.prev = 13;
                _context2.next = 16;
                return _solidLogic.store.updater.update([], sts);

              case 16:
                _context2.next = 24;
                break;

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](13);
                msg = 'Error saving chat message: ' + _context2.t0;
                debug.warn(msg);
                alert(msg);
                throw new Error(msg);

              case 24:
                return _context2.abrupt("return", message);

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[13, 18]]);
      }));

      function updateMessage(_x2) {
        return _updateMessage.apply(this, arguments);
      }

      return updateMessage;
    }()
    /* Mark a message as deleted
    * Wee add a new version of the message,m witha deletion flag (deletion date)
    * so that the deletion can be revoked by adding another non-deleted update
    */

  }, {
    key: "deleteMessage",
    value: function () {
      var _deleteMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(message) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.updateMessage('(message deleted)', message, true));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deleteMessage(_x3) {
        return _deleteMessage.apply(this, arguments);
      }

      return deleteMessage;
    }()
  }]);
  return ChatChannel;
}(); // class ChatChannel


exports.ChatChannel = ChatChannel;

function originalVersion(message) {
  var msg = message;

  while (msg) {
    message = msg;
    msg = _solidLogic.store.any(null, ns.dct('isReplacedBy'), message, message.doc());
  }

  return message;
}

function mostRecentVersion(message) {
  var msg = message;

  while (msg) {
    message = msg;
    msg = _solidLogic.store.any(message, ns.dct('isReplacedBy'), null, message.doc());
  }

  return message;
}

function isDeleted(message) {
  return _solidLogic.store.holds(message, ns.schema('dateDeleted'), null, message.doc());
}

function isReplaced(message) {
  return _solidLogic.store.holds(message, ns.dct('isReplacedBy'), null, message.doc());
}

function isHidden(message) {
  return this.isDeleted(message) || this.isReplaced(message);
} // A Nickname for a person


function nick(person) {
  var s = _solidLogic.store.any(person, ns.foaf('nick'));

  if (s) return '' + s.value;
  return '' + utils.label(person);
}

function _createIfNotExists(_x4) {
  return _createIfNotExists2.apply(this, arguments);
} // ends


function _createIfNotExists2() {
  _createIfNotExists2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(doc) {
    var contentType,
        data,
        response,
        _args4 = arguments;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            contentType = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 'text/turtle';
            data = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : '';
            _context4.prev = 2;
            _context4.next = 5;
            return _solidLogic.store.fetcher.load(doc);

          case 5:
            response = _context4.sent;
            _context4.next = 28;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](2);

            if (!(_context4.t0.response.status === 404)) {
              _context4.next = 26;
              break;
            }

            debug.log('createIfNotExists: doc does NOT exist, will create... ' + doc);
            _context4.prev = 12;
            _context4.next = 15;
            return _solidLogic.store.fetcher.webOperation('PUT', doc.uri, {
              data: data,
              contentType: contentType
            });

          case 15:
            response = _context4.sent;
            _context4.next = 22;
            break;

          case 18:
            _context4.prev = 18;
            _context4.t1 = _context4["catch"](12);
            debug.log('createIfNotExists doc FAILED: ' + doc + ': ' + _context4.t1);
            throw _context4.t1;

          case 22:
            delete _solidLogic.store.fetcher.requested[doc.uri]; // delete cached 404 error
            // debug.log('createIfNotExists doc created ok ' + doc)

            return _context4.abrupt("return", response);

          case 26:
            debug.log('createIfNotExists doc load error NOT 404:  ' + doc + ': ' + _context4.t0);
            throw _context4.t0;

          case 28:
            return _context4.abrupt("return", response);

          case 29:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 8], [12, 18]]);
  }));
  return _createIfNotExists2.apply(this, arguments);
}
//# sourceMappingURL=chatLogic.js.map