"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChunks = getChunks;
exports.lightColorHash = lightColorHash;
Object.defineProperty(exports, "manageParticipation", {
  enumerable: true,
  get: function get() {
    return _participation.manageParticipation;
  }
});
exports.notepad = notepad;
exports.notepadToHTML = notepadToHTML;
Object.defineProperty(exports, "participationObject", {
  enumerable: true,
  get: function get() {
    return _participation.participationObject;
  }
});
Object.defineProperty(exports, "recordParticipation", {
  enumerable: true,
  get: function get() {
    return _participation.recordParticipation;
  }
});
Object.defineProperty(exports, "renderPartipants", {
  enumerable: true,
  get: function get() {
    return _participation.renderPartipants;
  }
});
exports.xmlEncode = xmlEncode;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var ns = _interopRequireWildcard(require("./ns"));
var _rdflib = require("rdflib");
var _widgets = require("./widgets");
var _utils = require("./utils");
var _debug = require("./debug");
var _solidLogic = require("solid-logic");
var _participation = require("./participation");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } } /** **************
                                                                                                                                                                                                                                                                                                                                           *   Notepad Widget
                                                                                                                                                                                                                                                                                                                                           */ /** @module pad
                                                                                                                                                                                                                                                                                                                                               */
var store = _solidLogic.solidLogicSingleton.store;
var PAD = (0, _rdflib.Namespace)('http://www.w3.org/ns/pim/pad#');
/**
 * @ignore
 */
var NotepadElement = /*#__PURE__*/function (_HTMLElement) {
  (0, _inherits2["default"])(NotepadElement, _HTMLElement);
  var _super = _createSuper(NotepadElement);
  function NotepadElement() {
    var _this;
    (0, _classCallCheck2["default"])(this, NotepadElement);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "subject", void 0);
    return _this;
  }
  return (0, _createClass2["default"])(NotepadElement);
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(HTMLElement));
/**
 * @ignore
 */
var NotepadPart = /*#__PURE__*/function (_HTMLElement2) {
  (0, _inherits2["default"])(NotepadPart, _HTMLElement2);
  var _super2 = _createSuper(NotepadPart);
  function NotepadPart() {
    var _this2;
    (0, _classCallCheck2["default"])(this, NotepadPart);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this2 = _super2.call.apply(_super2, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "subject", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "value", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "state", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this2), "lastSent", void 0);
    return _this2;
  }
  return (0, _createClass2["default"])(NotepadPart);
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(HTMLElement));
/** Figure out a random color from my webid
 *
 * @param {NamedNode} author - The author of text being displayed
 * @returns {String} The CSS color generated, constrained to be light for a background color
 */
function lightColorHash(author) {
  var hash = function hash(x) {
    return x.split('').reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  };
  return author && author.uri ? '#' + (hash(author.uri) & 0xffffff | 0xc0c0c0).toString(16) : '#ffffff'; // c0c0c0  forces pale
} // no id -> white

/**  notepad
 *
 * @param {HTMLDocument} dom - the web page of the browser
 * @param {NamedNode} padDoc - the document into which the particpation should be shown
 * @param {NamedNode} subject - the thing in which participation is happening
 * @param {NamedNode} me - person who is logged into the pod
 * @param {notepadOptions} options - the options that can be passed in consist of statusArea, exists
 */
function notepad(dom, padDoc, subject, me, options) {
  options = options || {};
  var exists = options.exists;
  var table = dom.createElement('table');
  var kb = store;
  if (me && !me.uri) throw new Error('UI.pad.notepad:  Invalid userid');
  var updater = store.updater;
  var PAD = (0, _rdflib.Namespace)('http://www.w3.org/ns/pim/pad#');
  table.setAttribute('style', 'padding: 1em; overflow: auto; resize: horizontal; min-width: 40em;');
  var upstreamStatus = null;
  var downstreamStatus = null;
  if (options.statusArea) {
    var t = options.statusArea.appendChild(dom.createElement('table'));
    var tr = t.appendChild(dom.createElement('tr'));
    upstreamStatus = tr.appendChild(dom.createElement('td'));
    downstreamStatus = tr.appendChild(dom.createElement('td'));
    if (upstreamStatus) {
      upstreamStatus.setAttribute('style', 'width:50%');
    }
    if (downstreamStatus) {
      downstreamStatus.setAttribute('style', 'width:50%');
    }
  }
  /* @@ TODO want to look into this, it seems upstream should be a boolean and default to false ?
  *
  */
  var complain = function complain(message) {
    var upstream = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    (0, _debug.log)(message);
    if (options.statusArea) {
      ;
      (upstream ? upstreamStatus : downstreamStatus).appendChild((0, _widgets.errorMessageBlock)(dom, message, 'pink'));
    }
  };
  // @@ TODO need to refactor so that we don't have to type cast
  var clearStatus = function clearStatus(_upsteam) {
    if (options.statusArea) {
      options.statusArea.innerHTML = '';
    }
  };
  var setPartStyle = function setPartStyle(part, colors, pending) {
    var chunk = part.subject;
    colors = colors || '';
    var baseStyle = 'font-size: 100%; font-family: monospace; width: 100%; border: none; white-space: pre-wrap;';
    var headingCore = 'font-family: sans-serif; font-weight: bold;  border: none;';
    var headingStyle = ['font-size: 110%;  padding-top: 0.5em; padding-bottom: 0.5em; width: 100%;', 'font-size: 120%; padding-top: 1em; padding-bottom: 1em; width: 100%;', 'font-size: 150%; padding-top: 1em; padding-bottom: 1em; width: 100%;'];
    var author = kb.any(chunk, ns.dc('author'));
    if (!colors && author) {
      // Hash the user webid for now -- later allow user selection!
      var bgcolor = lightColorHash(author);
      colors = 'color: ' + (pending ? '#888' : 'black') + '; background-color: ' + bgcolor + ';';
    }

    // @@ TODO Need to research when this can be an object with the indent stored in value
    // and when the indent is stored as a Number itself, not in an object.
    var indent = kb.any(chunk, PAD('indent'));
    indent = indent ? indent.value : 0;
    var style = indent >= 0 ? baseStyle + 'text-indent: ' + indent * 3 + 'em;' : headingCore + headingStyle[-1 - indent];
    // ? baseStyle + 'padding-left: ' + (indent * 3) + 'em;'
    part.setAttribute('style', style + colors);
  };
  var removePart = function removePart(part) {
    var chunk = part.subject;
    if (!chunk) throw new Error('No chunk for line to be deleted!'); // just in case
    var prev = kb.any(undefined, PAD('next'), chunk);
    var next = kb.any(chunk, PAD('next'));
    if (prev.sameTerm(subject) && next.sameTerm(subject)) {
      // Last one
      (0, _debug.log)("You can't delete the only line.");
      return;
    }
    var del = kb.statementsMatching(chunk, undefined, undefined, padDoc).concat(kb.statementsMatching(undefined, undefined, chunk, padDoc));
    var ins = [(0, _rdflib.st)(prev, PAD('next'), next, padDoc)];

    // @@ TODO what should we do if chunk is not a NamedNode should we
    // assume then it is a string?
    if (chunk instanceof _rdflib.NamedNode) {
      var label = chunk.uri.slice(-4);
      (0, _debug.log)('Deleting line ' + label);
    }
    if (!updater) {
      throw new Error('have no updater');
    }
    // @@ TODO below you can see that before is redefined and not a boolean
    updater.update(del, ins, function (uri, ok, errorMessage, response) {
      if (ok) {
        var row = part.parentNode;
        if (row) {
          var before = row.previousSibling;
          if (row.parentNode) {
            row.parentNode.removeChild(row);
          }
          // console.log('    deleted line ' + label + ' ok ' + part.value)
          if (before && before.firstChild) {
            // @@ TODO IMPORTANT FOCUS ISN'T A PROPERTY ON A CHILDNODE
            before.firstChild.focus();
          }
        }
      } else if (response && response.status === 409) {
        // Conflict
        setPartStyle(part, 'color: black;  background-color: #ffd;'); // yellow
        part.state = 0; // Needs downstream refresh
        (0, _utils.beep)(0.5, 512); // Ooops clash with other person
        setTimeout(function () {
          // Ideally, beep! @@
          reloadAndSync(); // Throw away our changes and
          // updater.requestDownstreamAction(padDoc, reloadAndSync)
        }, 1000);
      } else {
        (0, _debug.log)('    removePart FAILED ' + chunk + ': ' + errorMessage);
        (0, _debug.log)("    removePart was deleteing :'" + del);
        setPartStyle(part, 'color: black;  background-color: #fdd;'); // failed
        var res = response ? response.status : ' [no response field] ';
        complain('Error ' + res + ' saving changes: ' + errorMessage["true"]); // upstream,
        // updater.requestDownstreamAction(padDoc, reloadAndSync);
      }
    });
  }; // removePart

  var changeIndent = function changeIndent(part, chunk, delta) {
    var del = kb.statementsMatching(chunk, PAD('indent'));
    var current = del.length ? Number(del[0].object.value) : 0;
    if (current + delta < -3) return; //  limit negative indent
    var newIndent = current + delta;
    var ins = (0, _rdflib.st)(chunk, PAD('indent'), newIndent, padDoc);
    if (!updater) {
      throw new Error('no updater');
    }
    updater.update(del, ins, function (uri, ok, errorBody) {
      if (!ok) {
        (0, _debug.log)("Indent change FAILED '" + newIndent + "' for " + padDoc + ': ' + errorBody);
        setPartStyle(part, 'color: black;  background-color: #fdd;'); // failed
        updater.requestDownstreamAction(padDoc, reloadAndSync);
      } else {
        setPartStyle(part); // Implement the indent
      }
    });
  };

  // Use this sort of code to split the line when return pressed in the middle @@
  /*
  function doGetCaretPosition doGetCaretPosition (oField) {
    var iCaretPos = 0
        // IE Support
    if (document.selection) {
            // Set focus on the element to avoid IE bug
      oField.focus()
            // To get cursor position, get empty selection range
      var oSel = document.selection.createRange()
            // Move selection start to 0 position
      oSel.moveStart('character', -oField.value.length)
            // The caret position is selection length
      iCaretPos = oSel.text.length
        // Firefox suppor
    } else if (oField.selectionStart || oField.selectionStart === '0') {
      iCaretPos = oField.selectionStart
    }
        // Return results
    return (iCaretPos)
  }
  */
  var addListeners = function addListeners(part, chunk) {
    part.addEventListener('keydown', function (event) {
      if (!updater) {
        throw new Error('no updater');
      }
      var queueProperty, queue;
      //  up 38; down 40; left 37; right 39     tab 9; shift 16; escape 27
      switch (event.keyCode) {
        case 13:
          // Return
          {
            var before = event.shiftKey;
            (0, _debug.log)('enter'); // Shift-return inserts before -- only way to add to top of pad.
            if (before) {
              queue = kb.any(undefined, PAD('next'), chunk);
              queueProperty = 'newlinesAfter';
            } else {
              queue = kb.any(chunk, PAD('next'));
              queueProperty = 'newlinesBefore';
            }
            queue[queueProperty] = queue[queueProperty] || 0;
            queue[queueProperty] += 1;
            if (queue[queueProperty] > 1) {
              (0, _debug.log)('    queueing newline queue = ' + queue[queueProperty]);
              return;
            }
            (0, _debug.log)('    go ahead line before ' + queue[queueProperty]);
            newChunk(part, before); // was document.activeElement
            break;
          }
        case 8:
          // Delete
          if (part.value.length === 0) {
            (0, _debug.log)('Delete key line ' + chunk.uri.slice(-4) + ' state ' + part.state);
            switch (part.state) {
              case 1: // contents being sent
              case 2:
                // contents need to be sent again
                part.state = 4; // delete me
                return;
              case 3: // being deleted already
              case 4:
                // already deleme state
                return;
              case undefined:
              case 0:
                part.state = 3; // being deleted
                removePart(part);
                event.preventDefault();
                break;
              // continue
              default:
                throw new Error('pad: Unexpected state ' + part);
            }
          }
          break;
        case 9:
          // Tab
          {
            var delta = event.shiftKey ? -1 : 1;
            changeIndent(part, chunk, delta);
            event.preventDefault(); // default is to highlight next field
            break;
          }
        case 27:
          // ESC
          (0, _debug.log)('escape');
          updater.requestDownstreamAction(padDoc, reloadAndSync);
          event.preventDefault();
          break;
        case 38:
          // Up
          if (part.parentNode.previousSibling) {
            part.parentNode.previousSibling.firstChild.focus();
            event.preventDefault();
          }
          break;
        case 40:
          // Down
          if (part.parentNode.nextSibling) {
            part.parentNode.nextSibling.firstChild.focus();
            event.preventDefault();
          }
          break;
        default:
      }
    });
    var updateStore = function updateStore(part) {
      var chunk = part.subject;
      setPartStyle(part, undefined, true);
      var old = kb.any(chunk, ns.sioc('content')).value;
      var del = [(0, _rdflib.st)(chunk, ns.sioc('content'), old, padDoc)];
      var ins;
      if (part.value) {
        ins = [(0, _rdflib.st)(chunk, ns.sioc('content'), part.value, padDoc)];
      }
      var newOne = part.value;

      // DEBUGGING ONLY
      if (part.lastSent) {
        if (old !== part.lastSent) {
          throw new Error("Out of order, last sent expected '" + old + "' but found '" + part.lastSent + "'");
        }
      }
      part.lastSent = newOne;

      /* console.log(
        ' Patch proposed to ' +
        chunk.uri.slice(-4) +
        " '" +
        old +
        "' -> '" +
        newOne +
        "' "
      ) */
      if (!updater) {
        throw new Error('no updater');
      }
      updater.update(del, ins, function (uri, ok, errorBody, xhr) {
        if (!ok) {
          // alert("clash " + errorBody);
          (0, _debug.log)('    patch FAILED ' + xhr.status + " for '" + old + "' -> '" + newOne + "': " + errorBody);
          if (xhr.status === 409) {
            // Conflict -  @@ we assume someone else
            setPartStyle(part, 'color: black;  background-color: #fdd;');
            part.state = 0; // Needs downstream refresh
            (0, _utils.beep)(0.5, 512); // Ooops clash with other person
            setTimeout(function () {
              updater.requestDownstreamAction(padDoc, reloadAndSync);
            }, 1000);
          } else {
            setPartStyle(part, 'color: black;  background-color: #fdd;'); // failed pink
            part.state = 0;
            complain('    Error ' + xhr.status + ' sending data: ' + errorBody, true);
            (0, _utils.beep)(1.0, 128); // Other
            // @@@   Do soemthing more serious with other errors eg auth, etc
          }
        } else {
          clearStatus(true); // upstream
          setPartStyle(part); // synced
          (0, _debug.log)("    Patch ok '" + old + "' -> '" + newOne + "' ");
          if (part.state === 4) {
            //  delete me
            part.state = 3;
            removePart(part);
          } else if (part.state === 3) {
            // being deleted
            // pass
          } else if (part.state === 2) {
            part.state = 1; // pending: lock
            updateStore(part);
          } else {
            part.state = 0; // clear lock
          }
        }
      });
    };

    part.addEventListener('input', function inputChangeListener(_event) {
      // debug.log("input changed "+part.value);
      setPartStyle(part, undefined, true); // grey out - not synced
      (0, _debug.log)('Input event state ' + part.state + " value '" + part.value + "'");
      switch (part.state) {
        case 3:
          // being deleted
          return;
        case 4:
          // needs to be deleted
          return;
        case 2:
          // needs content updating, we know
          return;
        case 1:
          part.state = 2; // lag we need another patch
          return;
        case 0:
        case undefined:
          part.state = 1; // being upadted
          updateStore(part);
      }
    }); // listener
  }; // addlisteners

  // @@ TODO Need to research before as it appears to be used as an Element and a boolean
  var newPartAfter = function newPartAfter(tr1, chunk, before) {
    // @@ take chunk and add listeners
    var text = kb.any(chunk, ns.sioc('content'));
    text = text ? text.value : '';
    var tr = dom.createElement('tr');
    if (before) {
      table.insertBefore(tr, tr1);
    } else {
      // after
      if (tr1 && tr1.nextSibling) {
        table.insertBefore(tr, tr1.nextSibling);
      } else {
        table.appendChild(tr);
      }
    }
    var part = tr.appendChild(dom.createElement('input'));
    part.subject = chunk;
    part.setAttribute('type', 'text');
    part.value = text;
    if (me) {
      setPartStyle(part, '');
      addListeners(part, chunk);
    } else {
      setPartStyle(part, 'color: #222; background-color: #fff');
      (0, _debug.log)("Note can't add listeners - not logged in");
    }
    return part;
  };

  /* @@ TODO we need to look at indent, it can be a Number or an Object this doesn't seem correct.
  */
  var newChunk = function newChunk(ele, before) {
    // element of chunk being split
    var kb = store;
    var indent = 0;
    var queueProperty = null;
    var here, prev, next, queue, tr1;
    if (ele) {
      if (ele.tagName.toLowerCase() !== 'input') {
        (0, _debug.log)('return pressed when current document is: ' + ele.tagName);
      }
      here = ele.subject;
      indent = kb.any(here, PAD('indent'));
      indent = indent ? Number(indent.value) : 0;
      if (before) {
        prev = kb.any(undefined, PAD('next'), here);
        next = here;
        queue = prev;
        queueProperty = 'newlinesAfter';
      } else {
        prev = here;
        next = kb.any(here, PAD('next'));
        queue = next;
        queueProperty = 'newlinesBefore';
      }
      tr1 = ele.parentNode;
    } else {
      prev = subject;
      next = subject;
      tr1 = undefined;
    }
    var chunk = (0, _widgets.newThing)(padDoc);
    var label = chunk.uri.slice(-4);
    var del = [(0, _rdflib.st)(prev, PAD('next'), next, padDoc)];
    var ins = [(0, _rdflib.st)(prev, PAD('next'), chunk, padDoc), (0, _rdflib.st)(chunk, PAD('next'), next, padDoc), (0, _rdflib.st)(chunk, ns.dc('author'), me, padDoc), (0, _rdflib.st)(chunk, ns.sioc('content'), '', padDoc)];
    if (indent > 0) {
      // Do not inherit
      ins.push((0, _rdflib.st)(chunk, PAD('indent'), indent, padDoc));
    }
    (0, _debug.log)('    Fresh chunk ' + label + ' proposed');
    if (!updater) {
      throw new Error('no updater');
    }
    updater.update(del, ins, function (uri, ok, errorBody, _xhr) {
      if (!ok) {
        // alert("Error writing new line " + label + ": " + errorBody);
        (0, _debug.log)('    ERROR writing new line ' + label + ': ' + errorBody);
      } else {
        var newPart = newPartAfter(tr1, chunk, before);
        setPartStyle(newPart);
        newPart.focus(); // Note this is delayed
        if (queueProperty) {
          (0, _debug.log)('    Fresh chunk ' + label + ' updated, queue = ' + queue[queueProperty]);
          queue[queueProperty] -= 1;
          if (queue[queueProperty] > 0) {
            (0, _debug.log)('    Implementing queued newlines = ' + next.newLinesBefore);
            newChunk(newPart, before);
          }
        }
      }
    });
  };
  var consistencyCheck = function consistencyCheck() {
    var found = {};
    var failed = 0;
    function complain2(msg) {
      complain(msg);
      failed++;
    }
    if (!kb.the(subject, PAD('next'))) {
      complain2('No initial next pointer');
      return false; // can't do linked list
    }
    // var chunk = kb.the(subject, PAD('next'))
    var prev = subject;
    var chunk;
    for (;;) {
      chunk = kb.the(prev, PAD('next'));
      if (!chunk) {
        complain2('No next pointer from ' + prev);
      }
      if (chunk.sameTerm(subject)) {
        break;
      }
      prev = chunk;
      var label = chunk.uri.split('#')[1];
      if (found[chunk.uri]) {
        complain2('Loop!');
        return false;
      }
      found[chunk.uri] = true;
      var k = kb.each(chunk, PAD('next')).length;
      if (k !== 1) {
        complain2('Should be 1 not ' + k + ' next pointer for ' + label);
      }
      k = kb.each(chunk, PAD('indent')).length;
      if (k > 1) {
        complain2('Should be 0 or 1 not ' + k + ' indent for ' + label);
      }
      k = kb.each(chunk, ns.sioc('content')).length;
      if (k !== 1) {
        complain2('Should be 1 not ' + k + ' contents for ' + label);
      }
      k = kb.each(chunk, ns.dc('author')).length;
      if (k !== 1) {
        complain2('Should be 1 not ' + k + ' author for ' + label);
      }
      var sts = kb.statementsMatching(undefined, ns.sioc('contents'));
      sts.forEach(function (st) {
        if (!found[st.subject.value]) {
          complain2('Loose chunk! ' + st.subject.value);
        }
      });
    }
    return !failed;
  };

  // Ensure that the display matches the current state of the
  // @@ TODO really need to refactor this so that we don't need to cast types
  var sync = function sync() {
    // var first = kb.the(subject, PAD('next'))
    if (kb.each(subject, PAD('next')).length !== 1) {
      var msg = 'Pad: Inconsistent data - NEXT pointers: ' + kb.each(subject, PAD('next')).length;
      (0, _debug.log)(msg);
      if (options.statusArea) {
        options.statusArea.textContent += msg;
      }
      return;
    }
    // var last = kb.the(undefined, PAD('previous'), subject)
    // var chunk = first //  = kb.the(subject, PAD('next'));
    var row;

    // First see which of the logical chunks have existing physical manifestations
    var manif = [];
    // Find which lines correspond to existing chunks

    for (var chunk = kb.the(subject, PAD('next')); !chunk.sameTerm(subject); chunk = kb.the(chunk, PAD('next'))) {
      for (var i = 0; i < table.children.length; i++) {
        var _tr = table.children[i];
        if (_tr.firstChild) {
          if (_tr.firstChild.subject.sameTerm(chunk)) {
            manif[chunk.uri] = _tr.firstChild;
          }
        }
      }
    }

    // Remove any deleted lines
    for (var _i = table.children.length - 1; _i >= 0; _i--) {
      row = table.children[_i];
      if (!manif[row.firstChild.subject.uri]) {
        table.removeChild(row);
      }
    }
    // Insert any new lines and update old ones
    row = table.firstChild; // might be null
    for (var _chunk = kb.the(subject, PAD('next')); !_chunk.sameTerm(subject); _chunk = kb.the(_chunk, PAD('next'))) {
      var text = kb.any(_chunk, ns.sioc('content')).value;
      // superstitious -- don't mess with unchanged input fields
      // which may be selected by the user
      if (row && manif[_chunk.uri]) {
        var part = row.firstChild;
        if (text !== part.value) {
          part.value = text;
        }
        setPartStyle(part);
        part.state = 0; // Clear the state machine
        delete part.lastSent; // DEBUG ONLY
        row = row.nextSibling;
      } else {
        newPartAfter(row, _chunk, true); // actually before
      }
    }
  };

  // Refresh the DOM tree

  var refreshTree = function refreshTree(root) {
    if (root.refresh) {
      root.refresh();
      return;
    }
    for (var i = 0; i < root.children.length; i++) {
      refreshTree(root.children[i]);
    }
  };
  var reloading = false;
  var checkAndSync = function checkAndSync() {
    (0, _debug.log)('    reloaded OK');
    clearStatus();
    if (!consistencyCheck()) {
      complain('CONSITENCY CHECK FAILED');
    } else {
      refreshTree(table);
    }
  };
  var reloadAndSync = function reloadAndSync() {
    if (reloading) {
      (0, _debug.log)('   Already reloading - stop');
      return; // once only needed
    }

    reloading = true;
    var retryTimeout = 1000; // ms
    var tryReload = function tryReload() {
      (0, _debug.log)('try reload - timeout = ' + retryTimeout);
      if (!updater) {
        throw new Error('no updater');
      }
      updater.reload(updater.store, padDoc, function (ok, message, xhr) {
        reloading = false;
        if (ok) {
          checkAndSync();
        } else {
          if (xhr.status === 0) {
            complain('Network error refreshing the pad. Retrying in ' + retryTimeout / 1000);
            reloading = true;
            retryTimeout = retryTimeout * 2;
            setTimeout(tryReload, retryTimeout);
          } else {
            complain('Error ' + xhr.status + 'refreshing the pad:' + message + '. Stopped. ' + padDoc);
          }
        }
      });
    };
    tryReload();
  };
  table.refresh = sync; // Catch downward propagating refresh events
  table.reloadAndSync = reloadAndSync;
  if (!me) (0, _debug.log)('Warning: must be logged in for pad to be edited');
  if (exists) {
    (0, _debug.log)('Existing pad.');
    if (consistencyCheck()) {
      sync();
      if (kb.holds(subject, PAD('next'), subject)) {
        // Empty list untenable
        newChunk(); // require at least one line
      }
    } else {
      (0, _debug.log)(table.textContent = 'Inconsistent data. Abort');
    }
  } else {
    // Make new pad
    (0, _debug.log)('No pad exists - making new one.');
    var insertables = [(0, _rdflib.st)(subject, ns.rdf('type'), PAD('Notepad'), padDoc), (0, _rdflib.st)(subject, ns.dc('author'), me, padDoc), (0, _rdflib.st)(subject, ns.dc('created'), new Date(), padDoc), (0, _rdflib.st)(subject, PAD('next'), subject, padDoc)];
    if (!updater) {
      throw new Error('no updater');
    }
    updater.update([], insertables, function (uri, ok, errorBody) {
      if (!ok) {
        complain(errorBody || '');
      } else {
        (0, _debug.log)('Initial pad created');
        newChunk(); // Add a first chunck
        // getResults();
      }
    });
  }

  return table;
}

/**
 * Get the chunks of the notepad
 * They are stored in a RDF linked list
 */

// @ignore exporting this only for the unit test
function getChunks(subject, kb) {
  var chunks = [];
  for (var chunk = kb.the(subject, PAD('next')); !chunk.sameTerm(subject); chunk = kb.the(chunk, PAD('next'))) {
    chunks.push(chunk);
  }
  return chunks;
}

/**
 *  Encode content to be put in XML or HTML elements
 */
// @ignore exporting this only for the unit test
function xmlEncode(str) {
  return str.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
}

/**
 * Convert a notepad to HTML
 *   @param { } pad - the notepad
 *   @param {store} pad - the data store
 */
function notepadToHTML(pad, kb) {
  var chunks = getChunks(pad, kb);
  var html = '<html>\n  <head>\n';
  var title = kb.anyValue(pad, ns.dct('title'));
  if (title) {
    html += "    <title>".concat(xmlEncode(title), "</title>\n");
  }
  html += '  </head>\n  <body>\n';
  var level = 0;
  function increaseLevel(indent) {
    for (; level < indent; level++) {
      html += '<ul>\n';
    }
  }
  function decreaseLevel(indent) {
    for (; level > indent; level--) {
      html += '</ul>\n';
    }
  }
  chunks.forEach(function (chunk) {
    var indent = kb.anyJS(chunk, PAD('indent'));
    var rawContent = kb.anyJS(chunk, ns.sioc('content'));
    if (!rawContent) return; // seed chunk is dummy
    var content = xmlEncode(rawContent);
    if (indent < 0) {
      // negative indent levels represent heading levels
      decreaseLevel(0);
      var h = indent >= -3 ? 4 + indent : 1; // -1 -> h4, -2 -> h3
      html += "\n<h".concat(h, ">").concat(content, "</h").concat(h, ">\n");
    } else {
      // >= 0
      if (indent > 0) {
        // Lists
        decreaseLevel(indent);
        increaseLevel(indent);
        html += "<li>".concat(content, "</li>\n");
      } else {
        // indent 0
        decreaseLevel(indent);
        html += "<p>".concat(content, "</p>\n");
      }
    }
  }); // foreach chunk
  // At the end decreaseLevel any open ULs
  decreaseLevel(0);
  html += '  </body>\n</html>\n';
  return html;
}
//# sourceMappingURL=pad.js.map