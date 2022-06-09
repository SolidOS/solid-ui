"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof3 = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findBookmarkDocument = findBookmarkDocument;
exports.renderBookmarksButton = renderBookmarksButton;
exports.toggleBookmark = toggleBookmark;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var debug = _interopRequireWildcard(require("../debug"));

var _iconBase = require("../iconBase");

var _index = require("../media/index");

var ns = _interopRequireWildcard(require("../ns"));

var pad = _interopRequireWildcard(require("../pad"));

var rdf = _interopRequireWildcard(require("rdflib"));

var style = _interopRequireWildcard(require("../style"));

var utils = _interopRequireWildcard(require("../utils"));

var widgets = _interopRequireWildcard(require("../widgets"));

var _solidLogic = require("solid-logic");

var _login = require("../login/login");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == (0, _typeof2["default"])(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

var UI = {
  icons: _iconBase.icons,
  ns: ns,
  media: _index.media,
  pad: pad,
  rdf: rdf,
  style: style,
  utils: utils,
  widgets: widgets
};
var $rdf = UI.rdf;
var BOOK = $rdf.Namespace('http://www.w3.org/2002/01/bookmark#');
var BOOKMARK_ICON = 'noun_45961.svg';
var label = utils.label;
var dom = window.document || null;
/** Create a resource if it really does not exist
 *  Be absolutely sure something does not exist before creating a new empty file
 * as otherwise existing could  be deleted.
 * @param doc {NamedNode} - The resource
 */

function createIfNotExists(doc) {
  return new Promise(function (resolve, reject) {
    _solidLogic.store.fetcher.load(doc).then(function (response) {
      debug.log('createIfNotExists doc exists, all good ' + doc); // store.fetcher.webOperation('HEAD', doc.uri).then(response => {

      resolve(response);
    }, function (err) {
      if (err.response.status === 404) {
        debug.log('createIfNotExists doc does NOT exist, will create... ' + doc);

        _solidLogic.store.fetcher.webOperation('PUT', doc.uri, {
          data: '',
          contentType: 'text/turtle'
        }).then(function (response) {
          // fetcher.requested[doc.uri] = 'done' // do not need to read ??  but no headers
          delete _solidLogic.store.fetcher.requested[doc.uri]; // delete cached 404 error

          debug.log('createIfNotExists doc created ok ' + doc);
          resolve(response);
        }, function (err) {
          debug.log('createIfNotExists doc FAILED: ' + doc + ': ' + err);
          reject(err);
        });
      } else {
        debug.log('createIfNotExists doc load error NOT 404:  ' + doc + ': ' + err);
        reject(err);
      }
    });
  });
} // @@@@ use the one in rdflib.js when it is avaiable and delete this


function updatePromise(del, ins) {
  return new Promise(function (resolve, reject) {
    _solidLogic.store.updater.update(del, ins, function (uri, ok, errorBody) {
      if (!ok) {
        reject(new Error(errorBody));
      } else {
        resolve();
      }
    }); // callback

  }); // promise
} // export findBookmarkDocument,

/*         Bookmarking
 */

/** Find a user's bookmarks
 */


function findBookmarkDocument(_x) {
  return _findBookmarkDocument.apply(this, arguments);
}
/** Add a bookmark
 */


function _findBookmarkDocument() {
  _findBookmarkDocument = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(userContext) {
    var theClass, fileTail, isPublic, newBookmarkFile;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            theClass = BOOK('Bookmark');
            fileTail = 'bookmarks.ttl';
            isPublic = true;
            _context.next = 5;
            return (0, _login.findAppInstances)(userContext, theClass, isPublic);

          case 5:
            if (!(userContext.instances && userContext.instances.length > 0)) {
              _context.next = 10;
              break;
            }

            userContext.bookmarkDocument = userContext.instances[0];

            if (userContext.instances.length > 1) {
              alert('More than one bookmark file! ' + userContext.instances);
            }

            _context.next = 28;
            break;

          case 10:
            if (!userContext.publicProfile) {
              _context.next = 27;
              break;
            }

            // publicProfile or preferencesFile
            newBookmarkFile = $rdf.sym(userContext.publicProfile.dir().uri + fileTail);
            _context.prev = 12;
            debug.log('Creating new bookmark file ' + newBookmarkFile);
            _context.next = 16;
            return createIfNotExists(newBookmarkFile);

          case 16:
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](12);
            alert.error("Can't make fresh bookmark file:" + _context.t0);
            return _context.abrupt("return", userContext);

          case 22:
            _context.next = 24;
            return (0, _solidLogic.registerInTypeIndex)(userContext, newBookmarkFile, theClass, true);

          case 24:
            // public
            userContext.bookmarkDocument = newBookmarkFile;
            _context.next = 28;
            break;

          case 27:
            alert('You seem to have no bookmark file and not even a profile file.');

          case 28:
            return _context.abrupt("return", userContext);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[12, 18]]);
  }));
  return _findBookmarkDocument.apply(this, arguments);
}

function addBookmark(_x2, _x3) {
  return _addBookmark.apply(this, arguments);
}

function _addBookmark() {
  _addBookmark = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(context, target) {
    var title, me, author, bookmarkDoc, bookmark, ins, msg;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            /* like
            @prefix terms: <http://purl.org/dc/terms/>.
            @prefix bookm: <http://www.w3.org/2002/01/bookmark#>.
            @prefix n0: <http://xmlns.com/foaf/0.1/>.
            <> terms:references <#0.5534145389246576>.
            <#0.5534145389246576>
             a bookm:Bookmark;
             terms:created "2019-01-26T20:26:44.374Z"^^XML:dateTime;
             terms:title "Herons";
             bookm:recalls wiki:Heron;
             n0:maker c:me.
            */
            title = '';
            me = _solidLogic.authn.currentUser(); // If already logged on

            if (me) {
              _context2.next = 4;
              break;
            }

            throw new Error('Must be logged on to add Bookmark');

          case 4:
            author = _solidLogic.store.any(target, ns.foaf('maker'));
            title = label(author) + ': ' + _solidLogic.store.anyValue(target, ns.sioc('content')).slice(0, 80); // @@ add chat title too?

            bookmarkDoc = context.bookmarkDocument;
            bookmark = UI.widgets.newThing(bookmarkDoc, title);
            ins = [$rdf.st(bookmarkDoc, UI.ns.dct('references'), bookmark, bookmarkDoc), $rdf.st(bookmark, UI.ns.rdf('type'), BOOK('Bookmark'), bookmarkDoc), $rdf.st(bookmark, UI.ns.dct('created'), new Date(), bookmarkDoc), $rdf.st(bookmark, BOOK('recalls'), target, bookmarkDoc), $rdf.st(bookmark, UI.ns.foaf('maker'), me, bookmarkDoc), $rdf.st(bookmark, UI.ns.dct('title'), title, bookmarkDoc)];
            _context2.prev = 9;
            _context2.next = 12;
            return updatePromise([], ins);

          case 12:
            _context2.next = 19;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](9);
            msg = 'Making bookmark: ' + _context2.t0;
            alert.error(msg);
            return _context2.abrupt("return", null);

          case 19:
            return _context2.abrupt("return", bookmark);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[9, 14]]);
  }));
  return _addBookmark.apply(this, arguments);
}

function toggleBookmark(_x4, _x5, _x6) {
  return _toggleBookmark.apply(this, arguments);
}

function _toggleBookmark() {
  _toggleBookmark = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(userContext, target, bookmarkButton) {
    var bookmarks, i, bookmark;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _solidLogic.store.fetcher.load(userContext.bookmarkDocument);

          case 2:
            bookmarks = _solidLogic.store.each(null, BOOK('recalls'), target, userContext.bookmarkDocument);

            if (!bookmarks.length) {
              _context3.next = 24;
              break;
            }

            if (confirm('Delete bookmark on this?' + bookmarks.length)) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return");

          case 6:
            i = 0;

          case 7:
            if (!(i < bookmarks.length)) {
              _context3.next = 22;
              break;
            }

            _context3.prev = 8;
            _context3.next = 11;
            return updatePromise(_solidLogic.store.connectedStatements(bookmarks[i]), []);

          case 11:
            bookmarkButton.style.backgroundColor = 'white';
            debug.log('Bookmark deleted: ' + bookmarks[i]);
            _context3.next = 19;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](8);
            debug.error('Cant delete bookmark:' + _context3.t0);
            alert('Cant delete bookmark:' + _context3.t0);

          case 19:
            i++;
            _context3.next = 7;
            break;

          case 22:
            _context3.next = 29;
            break;

          case 24:
            _context3.next = 26;
            return addBookmark(userContext, target);

          case 26:
            bookmark = _context3.sent;
            bookmarkButton.style.backgroundColor = 'yellow';
            debug.log('Bookmark added: ' + bookmark);

          case 29:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[8, 15]]);
  }));
  return _toggleBookmark.apply(this, arguments);
}

function renderBookmarksButton(_x7, _x8) {
  return _renderBookmarksButton.apply(this, arguments);
}

function _renderBookmarksButton() {
  _renderBookmarksButton = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(userContext, target) {
    var setBookmarkButtonColor, _setBookmarkButtonColor, bookmarkButton;

    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _setBookmarkButtonColor = function _setBookmarkButtonCol2() {
              _setBookmarkButtonColor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(bookmarkButton) {
                var bookmarked;
                return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return _solidLogic.store.fetcher.load(userContext.bookmarkDocument);

                      case 2:
                        bookmarked = _solidLogic.store.any(null, BOOK('recalls'), bookmarkButton.target, userContext.bookmarkDocument);
                        bookmarkButton.style = UI.style.buttonStyle;
                        if (bookmarked) bookmarkButton.style.backgroundColor = 'yellow';

                      case 5:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));
              return _setBookmarkButtonColor.apply(this, arguments);
            };

            setBookmarkButtonColor = function _setBookmarkButtonCol(_x9) {
              return _setBookmarkButtonColor.apply(this, arguments);
            };

            if (!userContext.bookmarkDocument) {
              _context5.next = 8;
              break;
            }

            bookmarkButton = UI.widgets.button(dom, UI.icons.iconBase + BOOKMARK_ICON, label(BOOK('Bookmark')), function () {
              toggleBookmark(userContext, target, bookmarkButton);
            });
            bookmarkButton.target = target;
            _context5.next = 7;
            return setBookmarkButtonColor(bookmarkButton);

          case 7:
            return _context5.abrupt("return", bookmarkButton);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _renderBookmarksButton.apply(this, arguments);
}
//# sourceMappingURL=bookmarks.js.map