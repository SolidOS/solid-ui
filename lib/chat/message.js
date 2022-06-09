"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.creatorAndDate = creatorAndDate;
exports.creatorAndDateHorizontal = creatorAndDateHorizontal;
exports.elementForImageURI = elementForImageURI;
exports.renderMessageEditor = renderMessageEditor;
exports.renderMessageRow = renderMessageRow;
exports.switchToEditor = switchToEditor;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _infinite = require("./infinite");

var _messageTools = require("./messageTools");

var _bookmarks = require("./bookmarks");

var _chatLogic = require("./chatLogic");

var debug = _interopRequireWildcard(require("../debug"));

var _iconBase = require("../iconBase");

var _solidLogic = require("solid-logic");

var _login = require("../login/login");

var _index = require("../media/index");

var ns = _interopRequireWildcard(require("../ns"));

var pad = _interopRequireWildcard(require("../pad"));

var style = _interopRequireWildcard(require("../style"));

var utils = _interopRequireWildcard(require("../utils"));

var widgets = _interopRequireWildcard(require("../widgets"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

var dom = window.document;
var messageBodyStyle = style.messageBodyStyle;
var label = utils.label;
/**
 * HTML component for an image
 */

function elementForImageURI(imageUri, options) {
  var img = dom.createElement('img');
  var height = '10';

  if (options.inlineImageHeightEms) {
    height = ('' + options.inlineImageHeightEms).trim();
  }

  img.setAttribute('style', 'max-height: ' + height + 'em; border-radius: 1em; margin: 0.7em;'); // widgets.makeDropTarget(img, handleURIsDroppedOnMugshot, droppedFileHandler)

  if (imageUri) img.setAttribute('src', imageUri);
  var anchor = dom.createElement('a');
  anchor.setAttribute('href', imageUri);
  anchor.setAttribute('target', 'images');
  anchor.appendChild(img);
  widgets.makeDraggable(img, $rdf.sym(imageUri));
  return anchor;
}

var anchor = function anchor(text, term) {
  // If there is no link return an element anyway
  var a = dom.createElement('a');

  if (term && term.uri) {
    a.setAttribute('href', term.uri);
    a.addEventListener('click', widgets.openHrefInOutlineMode, true);
    a.setAttribute('style', 'color: #3B5998; text-decoration: none; '); // font-weight: bold
  }

  a.textContent = text;
  return a;
};

function nick(person) {
  var s = _solidLogic.store.any(person, ns.foaf('nick'));

  if (s) return '' + s.value;
  return '' + label(person);
}
/**
 * Displays creator and date for a chat message
 * inside the `td1` element
 */


function creatorAndDate(td1, creator, date, message) {
  var nickAnchor = td1.appendChild(anchor(nick(creator), creator));

  if (creator.uri) {
    _solidLogic.store.fetcher.nowOrWhenFetched(creator.doc(), undefined, function (_ok, _body) {
      nickAnchor.textContent = nick(creator);
    });
  }

  td1.appendChild(dom.createElement('br'));
  td1.appendChild(anchor(date, message));
}
/**
 * Horizontally displays creator and date for a chat message
 * inside the `td1` element
 */


function creatorAndDateHorizontal(td1, creator, date, message) {
  var nickAnchor = td1.appendChild(anchor(label(creator), creator));

  if (creator.uri) {
    _solidLogic.store.fetcher.nowOrWhenFetched(creator.doc(), undefined, function (_ok, _body) {
      nickAnchor.textContent = nick(creator);
    });
  }

  var dateBit = td1.appendChild(anchor(date, message));
  dateBit.style.fontSize = '80%';
  dateBit.style.marginLeft = '1em';
  td1.appendChild(dom.createElement('br'));
}
/**
 * Renders a chat message, read-only mode
 */


function renderMessageRow(channelObject, message, fresh, options, userContext) {
  var colorizeByAuthor = options.colorizeByAuthor === '1' || options.colorizeByAuthor === true;

  var creator = _solidLogic.store.any(message, ns.foaf('maker'));

  var date = _solidLogic.store.any(message, ns.dct('created'));

  var latestVersion = (0, _chatLogic.mostRecentVersion)(message);

  var content = _solidLogic.store.any(latestVersion, ns.sioc('content'));

  var originalMessage = (0, _chatLogic.originalVersion)(message);
  var edited = !message.sameTerm(originalMessage);

  var sortDate = _solidLogic.store.the(originalMessage, ns.dct('created'), null, originalMessage.doc()); // In message


  var messageRow = dom.createElement('tr');
  messageRow.AJAR_date = sortDate.value;
  messageRow.AJAR_subject = message;
  var td1 = dom.createElement('td');
  messageRow.appendChild(td1);

  if (!options.authorDateOnLeft) {
    var img = dom.createElement('img');
    img.setAttribute('style', 'max-height: 2.5em; max-width: 2.5em; border-radius: 0.5em; margin: auto;');
    widgets.setImage(img, creator);
    td1.appendChild(img);
  } else {
    creatorAndDate(td1, creator, widgets.shortDate(sortDate.value), message);
  }

  var bothDates = widgets.shortDate(sortDate.value);

  if (edited) {
    bothDates += ' ... ' + widgets.shortDate(date.value);
  } // Render the content ot the message itself


  var td2 = messageRow.appendChild(dom.createElement('td'));

  if (!options.authorDateOnLeft) {
    creatorAndDateHorizontal(td2, creator, bothDates, // widgets.shortDate(dateString)
    message);
  }

  var text = content.value.trim();
  var isURI = /^https?:\/[^ <>]*$/i.test(text);
  var para = null;

  if (isURI) {
    var isImage = /\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(text); // @@ Should use content-type not URI

    if (isImage && options.expandImagesInline) {
      var _img = elementForImageURI(text, options);

      td2.appendChild(_img);
    } else {
      // Link but not Image
      var anc = td2.appendChild(dom.createElement('a'));
      para = anc.appendChild(dom.createElement('p'));
      anc.href = text;
      para.textContent = text;
      td2.appendChild(anc);
    }
  } else {
    // text
    para = dom.createElement('p');
    td2.appendChild(para);
    para.textContent = text;
  }

  if (para) {
    var bgcolor = colorizeByAuthor ? pad.lightColorHash(creator) : getBgColor(fresh);
    para.setAttribute('style', messageBodyStyle + 'background-color: ' + bgcolor + ';');
  }

  function getBgColor(fresh) {
    return fresh ? '#e8ffe8' : 'white';
  } // Sentiment strip


  var strip = (0, _messageTools.sentimentStripLinked)(message, message.doc());

  if (strip.children.length) {
    td2.appendChild(dom.createElement('br'));
    td2.appendChild(strip);
  } // Message tool bar button


  var td3 = dom.createElement('td');
  messageRow.appendChild(td3);
  var toolsButton = widgets.button(dom, _iconBase.icons.iconBase + 'noun_243787.svg', '...');
  td3.appendChild(toolsButton);
  toolsButton.addEventListener('click', function (_event) {
    if (messageRow.toolTR) {
      // already got a toolbar? Toogle
      messageRow.parentNode.removeChild(messageRow.toolTR);
      delete messageRow.toolTR;
      return;
    }

    var toolsTR = dom.createElement('tr');
    var tools = (0, _messageTools.messageToolbar)(message, messageRow, userContext, channelObject);
    tools.style = 'border: 0.05em solid #888; border-radius: 0 0 0.7em 0.7em;  border-top: 0; height:3.5em; background-color: #fff;'; // @@ fix

    if (messageRow.nextSibling) {
      messageRow.parentElement.insertBefore(toolsTR, messageRow.nextSibling);
    } else {
      messageRow.parentElement.appendChild(toolsTR);
    }

    messageRow.toolTR = toolsTR;
    toolsTR.appendChild(dom.createElement('td')); // left

    var toolsTD = toolsTR.appendChild(dom.createElement('td'));
    toolsTR.appendChild(dom.createElement('td')); // right

    toolsTD.appendChild(tools);
  });
  return messageRow;
}

function switchToEditor(messageRow, message, channelObject, userContext) {
  var messageTable = messageRow.parentNode;
  var editRow = renderMessageEditor(channelObject, messageTable, userContext, channelObject.options, (0, _chatLogic.mostRecentVersion)(message));
  messageTable.insertBefore(editRow, messageRow);
  editRow.originalRow = messageRow;
  messageRow.style.visibility = 'hidden'; // Hide the original message. unhide if user cancels edit
}
/*       Control for a new message -- or editing an old message ***************
 *
 */


function renderMessageEditor(channelObject, messageTable, userContext, options, originalMessage) {
  function revertEditing(messageEditor) {
    messageEditor.originalRow.style.visibility = 'visible'; // restore read-only version

    messageEditor.parentNode.removeChild(messageEditor);
  }

  function handleFieldInput(_x) {
    return _handleFieldInput.apply(this, arguments);
  }

  function _handleFieldInput() {
    _handleFieldInput = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_event) {
      return _regeneratorRuntime().wrap(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return sendMessage(field.value, true);

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee5);
    }));
    return _handleFieldInput.apply(this, arguments);
  }

  function sendMessage(_x2, _x3) {
    return _sendMessage.apply(this, arguments);
  } // sendMessage
  //    DRAG AND DROP


  function _sendMessage() {
    _sendMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(text, fromMainField) {
      var sendComplete, message, statusArea;
      return _regeneratorRuntime().wrap(function _callee6$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              sendComplete = function _sendComplete(message, _text2) {
                // const dateStamp = store.any(message, ns.dct('created'), null, message.doc())
                // const content = $rdf.literal(text2)
                (0, _infinite.insertMessageIntoTable)(channelObject, messageTable, message, false, options, userContext); // not green

                if (originalMessage) {
                  // editing another message
                  var oldRow = messageEditor.originalRow; // oldRow.style.display = '' // restore read-only version, re-attack

                  if (oldRow.parentNode) {
                    oldRow.parentNode.removeChild(oldRow); // No longer needed old version
                  } else {
                    debug.warn('No parentNode on old message ' + oldRow.textContent);
                    oldRow.style.backgroundColor = '#fee';
                    oldRow.style.visibility = 'hidden'; // @@ FIX THIS AND REMOVE FROM DOM INSTEAD
                  }

                  messageEditor.parentNode.removeChild(messageEditor); // no longer need editor
                } else {
                  if (fromMainField) {
                    field.value = ''; // clear from out for reuse

                    field.setAttribute('style', messageBodyStyle);
                    field.disabled = false;
                    field.scrollIntoView(options.newestFirst); // allign bottom (top)

                    field.focus(); // Start typing next line immediately

                    field.select();
                  }
                } // await channelObject.div.refresh() // Add new day if nec  @@ add back

              };

              // const me = authn.currentUser() // Must be logged on or wuld have got login button
              if (fromMainField) {
                field.setAttribute('style', messageBodyStyle + 'color: #bbb;'); // pendingedit

                field.disabled = true;
              }

              _context7.prev = 2;
              _context7.next = 5;
              return channelObject.updateMessage(text, originalMessage);

            case 5:
              message = _context7.sent;
              _context7.next = 13;
              break;

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](2);
              statusArea = userContext.statusArea || messageEditor;
              statusArea.appendChild(widgets.errorMessageBlock(dom, 'Error writing message: ' + _context7.t0));
              return _context7.abrupt("return");

            case 13:
              sendComplete(message, text);

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee6, null, [[2, 8]]);
    }));
    return _sendMessage.apply(this, arguments);
  }

  function droppedFileHandler(files) {
    var base = messageTable.chatDocument.dir().uri;
    widgets.uploadFiles(_solidLogic.store.fetcher, files, base + 'Files', base + 'Pictures', /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(theFile, destURI) {
        return _regeneratorRuntime().wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return sendMessage(destURI);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee);
      }));

      return function (_x4, _x5) {
        return _ref.apply(this, arguments);
      };
    }());
  } // When a set of URIs are dropped on the field


  var droppedURIHandler = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(uris) {
      var _iterator, _step, uri;

      return _regeneratorRuntime().wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _iterator = _createForOfIteratorHelper(uris);
              _context3.prev = 1;

              _iterator.s();

            case 3:
              if ((_step = _iterator.n()).done) {
                _context3.next = 9;
                break;
              }

              uri = _step.value;
              _context3.next = 7;
              return sendMessage(uri);

            case 7:
              _context3.next = 3;
              break;

            case 9:
              _context3.next = 14;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](1);

              _iterator.e(_context3.t0);

            case 14:
              _context3.prev = 14;

              _iterator.f();

              return _context3.finish(14);

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2, null, [[1, 11, 14, 17]]);
    }));

    return function droppedURIHandler(_x6) {
      return _ref2.apply(this, arguments);
    };
  }(); // When we are actually logged on


  function turnOnInput() {
    function getImageDoc() {
      imageDoc = $rdf.sym(chatDocument.dir().uri + 'Image_' + Date.now() + '.png');
      return imageDoc;
    }

    function tookPicture(_x7) {
      return _tookPicture.apply(this, arguments);
    } // Body of turnOnInput


    function _tookPicture() {
      _tookPicture = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(imageDoc) {
        return _regeneratorRuntime().wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!imageDoc) {
                  _context5.next = 3;
                  break;
                }

                _context5.next = 3;
                return sendMessage(imageDoc.uri);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4);
      }));
      return _tookPicture.apply(this, arguments);
    }

    var menuButton;

    if (options.menuHandler) {
      var _menuButton = widgets.button(dom, _iconBase.icons.iconBase + 'noun_243787.svg', 'More');

      _menuButton.setAttribute('style', style.buttonStyle + 'float: right;'); // menuButton.addEventListener('click', _event => sendMessage(), false) (done in turnoninput)


      rhs.appendChild(_menuButton);
    }

    if (options.menuHandler && menuButton) {
      var _me = _solidLogic.authn.currentUser();

      var menuOptions = {
        me: _me,
        dom: dom,
        div: null,
        // @@ was: div
        newBase: messageTable.chatDocument.dir().uri
      };
      menuButton.addEventListener('click', function (event) {
        options.menuHandler(event, channelObject.chatChannel, menuOptions);
      }, false);
    }

    var me = _solidLogic.authn.currentUser(); // If already logged on


    creatorAndDate(lhs, me, '', null);
    field = dom.createElement('textarea');
    middle.innerHTML = '';
    middle.appendChild(field);
    field.rows = 3;

    if (originalMessage) {
      field.value = _solidLogic.store.anyValue(originalMessage, ns.sioc('content'), null, originalMessage.doc());
    } // field.cols = 40


    field.setAttribute('style', messageBodyStyle + 'background-color: #eef;'); // Trap the Enter BEFORE it is used ti make a newline

    field.addEventListener('keydown', /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(e) {
        return _regeneratorRuntime().wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(e.code === 'Enter')) {
                  _context4.next = 4;
                  break;
                }

                if (!(!e.shiftKey && !options.shiftEnterSendsMessage || e.shiftKey && options.shiftEnterSendsMessage)) {
                  _context4.next = 4;
                  break;
                }

                _context4.next = 4;
                return handleFieldInput(e);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x8) {
        return _ref3.apply(this, arguments);
      };
    }(), false);
    widgets.makeDropTarget(field, droppedURIHandler, droppedFileHandler);
    rhs.innerHTML = '';
    sendButton = widgets.button(dom, sendIcon, 'Send');
    sendButton.style["float"] = 'right';
    sendButton.addEventListener('click', function (_event) {
      return handleFieldInput();
    }, false);
    rhs.appendChild(sendButton);

    if (originalMessage) {
      // Are we editing another message?
      var cancelButton = rhs.appendChild(widgets.cancelButton(dom));
      cancelButton.style["float"] = 'left'; // cancelButton.firstChild.style.opacity = '0.3' // moved to buttons

      cancelButton.addEventListener('click', function (_event) {
        return revertEditing(messageEditor);
      }, false);
      rhs.appendChild(cancelButton);
    }

    var chatDocument = channelObject.dateFolder.leafDocumentFromDate(new Date());
    var imageDoc;
    middle.appendChild(_index.media.cameraButton(dom, _solidLogic.store, getImageDoc, tookPicture));
    pad.recordParticipation(channelObject.channel, channelObject.channel.doc()); // participation =
  } // turn on inpuut
  // Body of renderMessageEditor


  var sortDate, sendIcon;

  if (originalMessage) {
    sortDate = _solidLogic.store.anyValue(originalMessage, ns.dct('created'), null, originalMessage.doc()); // text = store.anyValue(originalMessage, ns.sioc('content'), null, originalMessage.doc())

    sendIcon = _iconBase.icons.iconBase + 'noun_1180158.svg'; // Green check
    // cancelIcon = icons.iconBase + 'noun_1180156.svg' // Black cross
  } else {
    sendIcon = _iconBase.icons.iconBase + 'noun_383448.svg';
    sortDate = '9999-01-01T00:00:00Z'; // ISO format for field sort
    // text = ''
  }

  var messageEditor = dom.createElement('tr');
  var lhs = dom.createElement('td');
  var middle = dom.createElement('td');
  var rhs = dom.createElement('td');
  messageEditor.appendChild(lhs);
  messageEditor.appendChild(middle);
  messageEditor.appendChild(rhs);
  messageEditor.AJAR_date = sortDate; // messageEditor.appendChild(dom.createElement('br'))

  var field, sendButton;
  var context = {
    div: middle,
    dom: dom
  };
  (0, _login.ensureLoggedIn)(context).then(function (context) {
    // me = context.me
    turnOnInput();
    Object.assign(context, userContext);
    (0, _bookmarks.findBookmarkDocument)(context).then(function (_context) {// console.log('Bookmark file: ' + context.bookmarkDocument)
    });
  });
  return messageEditor;
} // renderMessageEditor
//# sourceMappingURL=message.js.map