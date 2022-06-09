"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageToolbar = messageToolbar;
exports.sentimentStrip = sentimentStrip;
exports.sentimentStripLinked = sentimentStripLinked;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var debug = _interopRequireWildcard(require("../debug"));

var _iconBase = require("../iconBase");

var ns = _interopRequireWildcard(require("../ns"));

var rdf = _interopRequireWildcard(require("rdflib"));

var utils = _interopRequireWildcard(require("../utils"));

var widgets = _interopRequireWildcard(require("../widgets"));

var _bookmarks = require("./bookmarks");

var _solidLogic = require("solid-logic");

var _chatLogic = require("./chatLogic");

var _message = require("./message");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

var dom = window.document; // THE UNUSED ICONS are here as reminders for possible future functionality
// const BOOKMARK_ICON = 'noun_45961.svg'
// const HEART_ICON = 'noun_130259.svg' -> Add this to my (private) favorites
// const MENU_ICON = 'noun_897914.svg'
// const PAPERCLIP_ICON = 'noun_25830.svg' -> add attachments to this message
// const PIN_ICON = 'noun_562340.svg'  -> pin this message permanently in the chat UI

var PENCIL_ICON = 'noun_253504.svg'; // edit a message
// const SPANNER_ICON = 'noun_344563.svg' -> settings

var THUMBS_UP_ICON = 'noun_1384132.svg';
var THUMBS_DOWN_ICON = 'noun_1384135.svg';
/**
 * Emoji in Unicode
 */

var emoji = {};
emoji[ns.schema('AgreeAction')] = '👍';
emoji[ns.schema('DisagreeAction')] = '👎';
emoji[ns.schema('EndorseAction')] = '⭐️';
emoji[ns.schema('LikeAction')] = '❤️';
/**
 * Create strip of sentiments expressed
 */

function sentimentStrip(target, doc) {
  // alain seems not used
  var latest = (0, _chatLogic.mostRecentVersion)(target);
  var actions = _solidLogic.store.holds(latest, ns.schema('dateDeleted').value, null, latest.doc()) ? _solidLogic.store.each(null, ns.schema('target'), target, doc) : [];
  var sentiments = actions.map(function (a) {
    return _solidLogic.store.any(a, ns.rdf('type'), null, doc);
  });
  sentiments.sort();
  var strings = sentiments.map(function (x) {
    return emoji[x] || '';
  });
  return dom.createTextNode(strings.join(' '));
}
/**
 * Create strip of sentiments expressed, with hyperlinks
 *
 * @param target {NamedNode} - The thing about which they are expressed
 * @param doc {NamedNode} - The document in which they are expressed
 */


function sentimentStripLinked(target, doc) {
  var strip = dom.createElement('span');

  function refresh() {
    strip.innerHTML = '';
    var actions = (0, _chatLogic.mostRecentVersion)(target).uri !== ns.schema('dateDeleted').uri ? _solidLogic.store.each(null, ns.schema('target'), target, doc) : [];
    var sentiments = actions.map(function (a) {
      return [_solidLogic.store.any(a, ns.rdf('type'), null, doc), _solidLogic.store.any(a, ns.schema('agent'), null, doc)];
    });
    sentiments.sort();
    sentiments.forEach(function (ss) {
      var _ss = (0, _slicedToArray2["default"])(ss, 2),
          theClass = _ss[0],
          agent = _ss[1];

      var res;

      if (agent) {
        res = dom.createElement('a');
        res.setAttribute('href', agent.uri);
      } else {
        res = dom.createTextNode('');
      }

      res.textContent = emoji[theClass] || '*';
      strip.appendChild(res);
    });
  }

  refresh();
  strip.refresh = refresh;
  return strip;
}
/**
 * Creates a message toolbar component
 */


function messageToolbar(message, messageRow, userContext, channelObject) {
  function deleteMessage() {
    return _deleteMessage.apply(this, arguments);
  }

  function _deleteMessage() {
    _deleteMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var author, msg, area;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              author = _solidLogic.store.any(message, ns.foaf('maker'));

              if (me) {
                _context2.next = 5;
                break;
              }

              alert('You can\'t delete the message, you are not logged in.');
              _context2.next = 22;
              break;

            case 5:
              if (!me.sameTerm(author)) {
                _context2.next = 21;
                break;
              }

              _context2.prev = 6;
              _context2.next = 9;
              return channelObject.deleteMessage(message);

            case 9:
              _context2.next = 18;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](6);
              msg = 'Error deleting messaage ' + _context2.t0;
              debug.warn(msg);
              alert(msg);
              area = userContext.statusArea || messageRow.parentNode;
              area.appendChild(widgets.errorMessageBlock(dom, msg));

            case 18:
              messageRow.parentNode.removeChild(messageRow);
              _context2.next = 22;
              break;

            case 21:
              alert('You can\'t delete the message, you are not logged in as the author, ' + author);

            case 22:
              closeToolbar();

            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[6, 11]]);
    }));
    return _deleteMessage.apply(this, arguments);
  }

  function editMessage(_x) {
    return _editMessage.apply(this, arguments);
  } // alain TODO allow chat owner to fully delete message + sentiments and replacing messages


  function _editMessage() {
    _editMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(messageRow) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (me.value === _solidLogic.store.any(message, ns.foaf('maker')).value) {
                closeToolbar(); // edit is a one-off action

                (0, _message.switchToEditor)(messageRow, message, channelObject, userContext);
              }

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _editMessage.apply(this, arguments);
  }

  var div = dom.createElement('div'); // is message deleted ?

  if ((0, _chatLogic.mostRecentVersion)(message).value === ns.schema('dateDeleted').value) return div;

  function closeToolbar() {
    div.parentElement.parentElement.removeChild(div.parentElement); // remive the TR
  }

  function deleteThingThen(_x2) {
    return _deleteThingThen.apply(this, arguments);
  } // Things only the original author can do


  function _deleteThingThen() {
    _deleteThingThen = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(x) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _solidLogic.store.updater.update(_solidLogic.store.connectedStatements(x), []);

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _deleteThingThen.apply(this, arguments);
  }

  var me = _solidLogic.authn.currentUser(); // If already logged on


  if (me && _solidLogic.store.holds(message, ns.foaf('maker'), me)) {
    // button to delete the message
    div.appendChild(widgets.deleteButtonWithCheck(dom, div, 'message', deleteMessage)); // button to edit the message

    div.appendChild(widgets.button(dom, _iconBase.icons.iconBase + PENCIL_ICON, 'edit', function () {
      return editMessage(messageRow);
    }));
  } // if mine
  // Things anyone can do if they have a bookmark list async

  /*
  var bookmarkButton = await bookmarks.renderBookmarksButton(userContext)
  if (bookmarkButton) {
   div.appendChild(bookmarkButton)
  }
  */
  // Things anyone can do if they have a bookmark list


  (0, _bookmarks.renderBookmarksButton)(userContext).then(function (bookmarkButton) {
    if (bookmarkButton) div.appendChild(bookmarkButton);
  });
  /**   Button to allow user to express a sentiment (like, endorse, etc) about a target
   *
   * @param context {Object} - Provide dom and me
   * @param target {NamedNode} - The thing the user expresses an opnion about
   * @param icon {uristring} - The icon to be used for the button
   * @param actionClass {NamedNode} - The RDF class  - typically a subclass of schema:Action
   * @param doc - {NamedNode} - the Solid document iunto which the data should be written
   * @param mutuallyExclusive {Array<NamedNode>} - Any RDF classes of sentimentswhich are mutiually exclusive
   */

  function sentimentButton(context, target, icon, actionClass, doc, mutuallyExclusive) {
    function setColor() {
      button.style.backgroundColor = action ? 'yellow' : 'white';
    }

    var button = widgets.button(dom, icon, utils.label(actionClass), /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_event) {
        var insertMe, dirty, i, a;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!action) {
                  _context.next = 7;
                  break;
                }

                _context.next = 3;
                return deleteThingThen(action);

              case 3:
                action = null;
                setColor();
                _context.next = 25;
                break;

              case 7:
                // no action
                action = widgets.newThing(doc);
                insertMe = [rdf.st(action, ns.schema('agent'), context.me, doc), rdf.st(action, ns.rdf('type'), actionClass, doc), rdf.st(action, ns.schema('target'), target, doc)];
                _context.next = 11;
                return _solidLogic.store.updater.update([], insertMe);

              case 11:
                setColor();

                if (!mutuallyExclusive) {
                  _context.next = 25;
                  break;
                }

                // Delete incompative sentiments
                dirty = false;
                i = 0;

              case 15:
                if (!(i < mutuallyExclusive.length)) {
                  _context.next = 24;
                  break;
                }

                a = existingAction(mutuallyExclusive[i]);

                if (!a) {
                  _context.next = 21;
                  break;
                }

                _context.next = 20;
                return deleteThingThen(a);

              case 20:
                // but how refresh? refreshTree the parent?
                dirty = true;

              case 21:
                i++;
                _context.next = 15;
                break;

              case 24:
                if (dirty) {
                  // widgets.refreshTree(button.parentNode) // requires them all to be immediate siblings
                  widgets.refreshTree(messageRow); // requires them all to be immediate siblings
                }

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x3) {
        return _ref.apply(this, arguments);
      };
    }());

    function existingAction(actionClass) {
      var actions = _solidLogic.store.each(null, ns.schema('agent'), context.me, doc).filter(function (x) {
        return _solidLogic.store.holds(x, ns.rdf('type'), actionClass, doc);
      }).filter(function (x) {
        return _solidLogic.store.holds(x, ns.schema('target'), target, doc);
      });

      return actions.length ? actions[0] : null;
    }

    function refresh() {
      action = existingAction(actionClass);
      setColor();
    }

    var action;
    button.refresh = refresh; // If the file changes, refresh live

    refresh();
    return button;
  } // THUMBS_UP_ICON
  // https://schema.org/AgreeAction


  me = _solidLogic.authn.currentUser(); // If already logged on
  // debug.log('Actions 3' + mostRecentVersion(message).value + ' ' + ns.schema('dateDeleted').value + ' ' + (mostRecentVersion(message).value !== ns.schema('dateDeleted').value))

  if (me && (0, _chatLogic.mostRecentVersion)(message).value !== ns.schema('dateDeleted').value) {
    var context1 = {
      me: me,
      dom: dom,
      div: div
    };
    div.appendChild(sentimentButton(context1, message, // @@ TODO use widgets.sentimentButton
    _iconBase.icons.iconBase + THUMBS_UP_ICON, ns.schema('AgreeAction'), message.doc(), [ns.schema('DisagreeAction')])); // Thumbs down

    div.appendChild(sentimentButton(context1, message, _iconBase.icons.iconBase + THUMBS_DOWN_ICON, ns.schema('DisagreeAction'), message.doc(), [ns.schema('AgreeAction')]));
  } // X button to remove the tool UI itself


  var cancelButton = div.appendChild(widgets.cancelButton(dom));
  cancelButton.style["float"] = 'right';
  cancelButton.firstChild.style.opacity = '0.3';
  cancelButton.addEventListener('click', closeToolbar);
  return div;
}
//# sourceMappingURL=messageTools.js.map