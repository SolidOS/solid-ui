"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thread = thread;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _iconBase = require("../iconBase");

var _solidLogic = require("solid-logic");

var _index = require("../media/index");

var ns = _interopRequireWildcard(require("../ns"));

var login = _interopRequireWildcard(require("../login/login"));

var pad = _interopRequireWildcard(require("../pad"));

var $rdf = _interopRequireWildcard(require("rdflib"));

var style = _interopRequireWildcard(require("../style"));

var utils = _interopRequireWildcard(require("../utils"));

var widgets = _interopRequireWildcard(require("../widgets"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

var UI = {
  icons: _iconBase.icons,
  ns: ns,
  media: _index.media,
  pad: pad,
  style: style,
  utils: utils,
  widgets: widgets
};
/**
 * HTML component for a chat thread
 */

function thread(dom, kb, subject, messageStore, options) {
  kb = kb || _solidLogic.store;
  messageStore = messageStore.doc(); // No hash

  var ns = UI.ns;
  var WF = $rdf.Namespace('http://www.w3.org/2005/01/wf/flow#');
  var DCT = $rdf.Namespace('http://purl.org/dc/terms/');
  options = options || {};
  var newestFirst = !!options.newestFirst;
  var messageBodyStyle = 'white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;'; // 'font-size: 100%; margin: 0.1em 1em 0.1em 1em;  background-color: white; white-space: pre-wrap; padding: 0.1em;'

  var div = dom.createElement('div'); // eslint-disable-next-line prefer-const

  var messageTable; // Shared by initial build and addMessageFromBindings

  var me;
  var updater = _solidLogic.store.updater;

  var anchor = function anchor(text, term) {
    // If there is no link return an element anyway
    var a = dom.createElement('a');

    if (term && term.uri) {
      a.setAttribute('href', term.uri);
      a.addEventListener('click', UI.widgets.openHrefInOutlineMode, true);
      a.setAttribute('style', 'color: #3B5998; text-decoration: none; '); // font-weight: bold
    }

    a.textContent = text;
    return a;
  };

  var mention = function mention(message, style) {
    var pre = dom.createElement('pre');
    pre.setAttribute('style', style || 'color: grey');
    div.appendChild(pre);
    pre.appendChild(dom.createTextNode(message));
    return pre;
  };

  var announce = {
    log: function log(message) {
      mention(message, 'color: #111;');
    },
    warn: function warn(message) {
      mention(message, 'color: #880;');
    },
    error: function error(message) {
      mention(message, 'color: #800;');
    }
  };
  /**
   * Form for a new message
   */

  var newMessageForm = function newMessageForm() {
    var form = dom.createElement('tr');
    var lhs = dom.createElement('td');
    var middle = dom.createElement('td');
    var rhs = dom.createElement('td');
    form.appendChild(lhs);
    form.appendChild(middle);
    form.appendChild(rhs);
    form.AJAR_date = '9999-01-01T00:00:00Z'; // ISO format for field sort

    var sendMessage = function sendMessage() {
      // titlefield.setAttribute('class','pendingedit')
      // titlefield.disabled = true
      field.setAttribute('class', 'pendingedit');
      field.disabled = true;

      var _appendMsg = appendMsg(field.value),
          message = _appendMsg.message,
          dateStamp = _appendMsg.dateStamp,
          sts = _appendMsg.sts;

      var sendComplete = function sendComplete(uri, success, body) {
        if (!success) {
          form.appendChild(UI.widgets.errorMessageBlock(dom, 'Error writing message: ' + body));
        } else {
          var bindings = {
            '?msg': message,
            '?content': _solidLogic.store.literal(field.value),
            '?date': dateStamp,
            '?creator': me
          };
          renderMessage(bindings, false); // not green

          field.value = ''; // clear from out for reuse

          field.setAttribute('class', '');
          field.disabled = false;
        }
      };

      updater.update([], sts, sendComplete);
    };

    form.appendChild(dom.createElement('br'));
    var field, sendButton;

    var turnOnInput = function turnOnInput() {
      creatorAndDate(lhs, me, '', null);
      field = dom.createElement('textarea');
      middle.innerHTML = '';
      middle.appendChild(field);
      field.rows = 3; // field.cols = 40

      field.setAttribute('style', messageBodyStyle + 'background-color: #eef;');
      field.addEventListener('keyup', function (e) {
        // User preference?
        if (e.keyCode === 13) {
          if (!e.altKey) {
            // Alt-Enter just adds a new line
            sendMessage();
          }
        }
      }, false);
      rhs.innerHTML = '';
      sendButton = UI.widgets.button(dom, UI.icons.iconBase + 'noun_383448.svg', 'Send');
      sendButton.setAttribute('style', UI.style.buttonStyle + 'float: right;');
      sendButton.addEventListener('click', sendMessage, false);
      rhs.appendChild(sendButton);
    };

    var context = {
      div: middle,
      dom: dom
    };
    login.ensureLoggedIn(context).then(function (context) {
      me = context.me;
      turnOnInput();
    });
    return form;
  };
  /* const sendMessage = function (oldMsg, options) { // alain
    // titlefield.setAttribute('class','pendingedit')
    // titlefield.disabled = true
    field.setAttribute('class', 'pendingedit')
    field.disabled = true
    const sts = []
    const now = new Date()
    const timestamp = '' + now.getTime()
    const dateStamp = $rdf.term(now)
    // http://www.w3schools.com/jsref/jsref_obj_date.asp
    const message = store.sym(messageStore.uri + '#' + 'Msg' + timestamp)
     if (options === 'edit' || options === 'delete') {
      sts.push(
        new $rdf.Statement(mostRecentVersion(oldMsg), DCT('isReplacedBy'), message, messageStore)
      )
    } else {
      sts.push(
        new $rdf.Statement(subject, ns.wf('message'), message, messageStore)
      )
    }
    // sts.push(new $rdf.Statement(message, ns.dc('title'), store.literal(titlefield.value), messageStore))
    const msgBody = options !== 'delete' ? field.value : `message deleted\nby ${nick(me)}`
    sts.push(
      new $rdf.Statement(
        message,
        ns.sioc('content'),
        store.literal(msgBody),
        messageStore
      )
    )
    sts.push(
      new $rdf.Statement(message, DCT('created'), dateStamp, messageStore)
    )
    if (me) {
      sts.push(
        new $rdf.Statement(message, ns.foaf('maker'), me, messageStore)
      )
    }
     const sendComplete = function (uri, success, body) {
      if (!success) {
        form.appendChild(
          UI.widgets.errorMessageBlock(dom, 'Error writing message: ' + body)
        )
      } else {
        const bindings = {
          '?msg': message,
          '?content': store.literal(field.value),
          '?date': dateStamp,
          '?creator': me
        }
        renderMessage(bindings, false) // not green
         field.value = '' // clear from out for reuse
        field.setAttribute('class', '')
        field.disabled = false
      }
    }
    updater.update([], sts, sendComplete)
  } */


  var appendMsg = function appendMsg(fieldValue) {
    var oldMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    // alain
    var sts = [];
    var now = new Date();
    var timestamp = '' + now.getTime();
    var dateStamp = $rdf.term(now); // http://www.w3schools.com/jsref/jsref_obj_date.asp

    var message = _solidLogic.store.sym(messageStore.uri + '#' + 'Msg' + timestamp);

    if (options === 'edit' || options === 'delete') {
      sts.push(new $rdf.Statement(mostRecentVersion(oldMsg), DCT('isReplacedBy'), message, messageStore));
    } else {
      sts.push(new $rdf.Statement(subject, ns.wf('message'), message, messageStore));
    } // sts.push(new $rdf.Statement(message, ns.dc('title'), store.literal(titlefield.value), messageStore))


    var msgBody = options !== 'delete' ? fieldValue : "message deleted\nby ".concat(nick(me));
    sts.push(new $rdf.Statement(message, ns.sioc('content'), _solidLogic.store.literal(msgBody), messageStore));
    sts.push(new $rdf.Statement(message, DCT('created'), dateStamp, messageStore));

    if (me) {
      sts.push(new $rdf.Statement(message, ns.foaf('maker'), me, messageStore));
    }

    return {
      message: message,
      dateStamp: dateStamp,
      sts: sts
    };
  };

  function nick(person) {
    var s = _solidLogic.store.any(person, UI.ns.foaf('nick'));

    if (s) return '' + s.value;
    return '' + utils.label(person);
  }

  function creatorAndDate(td1, creator, date, message) {
    var nickAnchor = td1.appendChild(anchor(nick(creator), creator));

    if (creator.uri) {
      _solidLogic.store.fetcher.nowOrWhenFetched(creator.doc(), undefined, function (_ok, _body) {
        nickAnchor.textContent = nick(creator);
      });
    }

    td1.appendChild(dom.createElement('br'));
    td1.appendChild(anchor(date, message));
  } // ///////////////////////////////////////////////////////////////////////


  function syncMessages(about, messageTable) {
    var displayed = {};
    var ele, ele2;

    for (ele = messageTable.firstChild; ele; ele = ele.nextSibling) {
      if (ele.AJAR_subject) {
        displayed[ele.AJAR_subject.uri] = true;
      }
    }

    var messages = _solidLogic.store.each(about, ns.wf('message'));

    var stored = {};
    messages.forEach(function (m) {
      stored[m.uri] = true;

      if (!displayed[m.uri]) {
        addMessage(m);
      }
    }); // eslint-disable-next-line space-in-parens

    for (ele = messageTable.firstChild; ele;) {
      ele2 = ele.nextSibling;

      if (ele.AJAR_subject && !stored[ele.AJAR_subject.uri]) {
        messageTable.removeChild(ele);
      }

      ele = ele2;
    }
  }

  var mostRecentVersion = function mostRecentVersion(message) {
    var msg = message; // const listMsg = []

    while (msg) {
      // listMsg.push(msg)
      msg = _solidLogic.store.statementsMatching(message, DCT('isReplacedBy'));
    }

    return msg;
  };

  var _deleteMessage = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(message) {
      var deletions;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _solidLogic.store.connectedStatements(message, messageStore);

            case 2:
              deletions = _context.sent;
              updater.update(deletions, [], function (uri, ok, body) {
                if (!ok) {
                  announce.error('Cant delete messages:' + body);
                } else {
                  syncMessages(subject, messageTable);
                }
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function _deleteMessage(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var addMessage = function addMessage(message) {
    var bindings = {
      '?msg': message,
      '?creator': _solidLogic.store.any(message, ns.foaf('maker')),
      '?date': _solidLogic.store.any(message, DCT('created')),
      '?content': _solidLogic.store.any(message, ns.sioc('content'))
    };
    renderMessage(bindings, true); // fresh from elsewhere
  };

  var renderMessage = function renderMessage(bindings, fresh) {
    var creator = bindings['?creator'];
    var message = bindings['?msg'];
    var date = bindings['?date'];
    var content = bindings['?content'];
    var dateString = date.value;
    var tr = dom.createElement('tr');
    tr.AJAR_date = dateString;
    tr.AJAR_subject = message;
    var done = false;

    for (var ele = messageTable.firstChild;; ele = ele.nextSibling) {
      if (!ele) {
        // empty
        break;
      }

      if (dateString > ele.AJAR_date && newestFirst || dateString < ele.AJAR_date && !newestFirst) {
        messageTable.insertBefore(tr, ele);
        done = true;
        break;
      }
    }

    if (!done) {
      messageTable.appendChild(tr);
    }

    var td1 = dom.createElement('td');
    tr.appendChild(td1);
    creatorAndDate(td1, creator, UI.widgets.shortDate(dateString), message);
    var td2 = dom.createElement('td');
    tr.appendChild(td2);
    var pre = dom.createElement('p');
    pre.setAttribute('style', messageBodyStyle + (fresh ? 'background-color: #e8ffe8;' : 'background-color: #white;'));
    td2.appendChild(pre);
    pre.textContent = content.value;
    var td3 = dom.createElement('td');
    tr.appendChild(td3);
    var delButton = dom.createElement('button');
    td3.appendChild(delButton);
    delButton.textContent = '-';
    tr.setAttribute('class', 'hoverControl'); // See tabbedtab.css (sigh global CSS)

    delButton.setAttribute('class', 'hoverControlHide');
    delButton.setAttribute('style', 'color: red;');
    delButton.addEventListener('click', function (_event) {
      td3.removeChild(delButton); // Ask -- are you sure?

      var cancelButton = dom.createElement('button');
      cancelButton.textContent = 'cancel';
      td3.appendChild(cancelButton).addEventListener('click', function (_event) {
        td3.removeChild(sureButton);
        td3.removeChild(cancelButton);
        td3.appendChild(delButton);
      }, false);
      var sureButton = dom.createElement('button');
      sureButton.textContent = 'Delete message';
      td3.appendChild(sureButton).addEventListener('click', function (_event) {
        // alain test for delete or edit depending on me = maker
        td3.removeChild(sureButton);
        td3.removeChild(cancelButton); // deleteMessage(message) // alain or sendMessage(message, 'delete' or 'edit') //alain

        if (me.value === _solidLogic.store.any(message, ns.foaf('maker')).value) {
          var _appendMsg2 = appendMsg(),
              sts = _appendMsg2.sts; // alain


          updater.update([], sts);
        }
      }, false);
    }, false);
  }; // Messages with date, author etc


  messageTable = dom.createElement('table');
  messageTable.fresh = false;
  div.appendChild(messageTable);
  messageTable.setAttribute('style', 'width: 100%;'); // fill that div!

  var tr = newMessageForm();

  if (newestFirst) {
    messageTable.insertBefore(tr, messageTable.firstChild); // If newestFirst
  } else {
    messageTable.appendChild(tr); // not newestFirst
  }

  var query; // Do this with a live query to pull in messages from web

  if (options.query) {
    query = options.query;
  } else {
    query = new $rdf.Query('Messages');
    var v = {}; // semicolon needed

    var vs = ['msg', 'date', 'creator', 'content'];
    vs.forEach(function (x) {
      query.vars.push(v[x] = $rdf.variable(x));
    });
    query.pat.add(subject, WF('message'), v.msg);
    query.pat.add(v.msg, ns.dct('created'), v.date);
    query.pat.add(v.msg, ns.foaf('maker'), v.creator);
    query.pat.add(v.msg, ns.sioc('content'), v.content);
  }

  function doneQuery() {
    messageTable.fresh = true; // any new are fresh and so will be greenish
  }

  _solidLogic.store.query(query, renderMessage, undefined, doneQuery);

  div.refresh = function () {
    syncMessages(subject, messageTable);
  }; // syncMessages(subject, messageTable) // no the query will do this async


  return div;
}
//# sourceMappingURL=thread.js.map