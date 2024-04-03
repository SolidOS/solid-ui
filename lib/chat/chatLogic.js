"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatChannel = void 0;
exports.allVersions = allVersions;
exports.isDeleted = isDeleted;
exports.isHidden = isHidden;
exports.isReplaced = isReplaced;
exports.mostRecentVersion = mostRecentVersion;
exports.nick = nick;
exports.originalVersion = originalVersion;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var debug = _interopRequireWildcard(require("../debug"));
var _dateFolder = require("./dateFolder");
var _solidLogic = require("solid-logic");
var ns = _interopRequireWildcard(require("../ns"));
var $rdf = _interopRequireWildcard(require("rdflib"));
var utils = _interopRequireWildcard(require("../utils"));
var _signature = require("./signature");
var _keys = require("./keys");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * Contains the [[ChatChannel]] class and logic for Solid Chat
 * @packageDocumentation
 */
// pull in first avoid cross-refs
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
var ChatChannel = exports.ChatChannel = /*#__PURE__*/function () {
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
  return (0, _createClass2["default"])(ChatChannel, [{
    key: "createMessage",
    value: (function () {
      var _createMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(text) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.updateMessage(text));
            case 1:
            case "end":
              return _context.stop();
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
    )
  }, {
    key: "updateMessage",
    value: (function () {
      var _updateMessage = (0, _asyncToGenerator2["default"])(function (text) {
        var _this = this;
        var oldMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var deleteIt = arguments.length > 2 ? arguments[2] : undefined;
        var thread = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        return /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
          var sts, now, timestamp, dateStamp, chatDocument, message, me, msg, oldMsgMaker, oldMsgMostRecentVersion, oldMsgThread, errMsg, privateKey, sig, _errMsg;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                sts = [];
                now = new Date();
                timestamp = '' + now.getTime();
                dateStamp = $rdf.term(now);
                chatDocument = oldMsg ? oldMsg.doc() : _this.dateFolder.leafDocumentFromDate(now);
                message = _solidLogic.store.sym(chatDocument.uri + '#' + 'Msg' + timestamp); // const content = store.literal(text)
                me = _solidLogic.authn.currentUser(); // If already logged on
                msg = (0, _signature.getBlankMsg)();
                msg.id = message.uri;
                if (!oldMsg) {
                  _context2.next = 27;
                  break;
                }
                // edit message replaces old one
                oldMsgMaker = _solidLogic.store.any(oldMsg, ns.foaf('maker')); // may not be needed here, but needed on READ
                if (!(oldMsgMaker.uri === me.uri)) {
                  _context2.next = 21;
                  break;
                }
                _context2.next = 14;
                return mostRecentVersion(oldMsg);
              case 14:
                oldMsgMostRecentVersion = _context2.sent;
                sts.push($rdf.st(oldMsgMostRecentVersion, ns.dct('isReplacedBy'), message, chatDocument));
                // if oldMsg has_reply => add has_reply to message
                oldMsgThread = _solidLogic.store.any(oldMsgMostRecentVersion, ns.sioc('has_reply'));
                if (oldMsgThread) {
                  sts.push($rdf.st(message, ns.sioc('has_reply'), oldMsgThread, chatDocument));
                }
                if (deleteIt) {
                  // we need to add a specific signature, else anyone can delete a msg ?
                  sts.push($rdf.st(message, ns.schema('dateDeleted'), dateStamp, chatDocument));
                }
                _context2.next = 25;
                break;
              case 21:
                errMsg = 'Error you cannot delete/edit a message from someone else : \n' + oldMsgMaker.uri;
                debug.warn(errMsg);
                alert(errMsg);
                throw new Error(errMsg);
              case 25:
                _context2.next = 28;
                break;
              case 27:
                // link new message to channel
                sts.push($rdf.st(_this.channel, ns.wf('message'), message, chatDocument));
              case 28:
                sts.push($rdf.st(message, ns.sioc('content'), _solidLogic.store.literal(text), chatDocument));
                msg.content = text;
                sts.push($rdf.st(message, ns.dct('created'), dateStamp, chatDocument));
                msg.created = dateStamp.value;
                if (!me) {
                  _context2.next = 40;
                  break;
                }
                sts.push($rdf.st(message, ns.foaf('maker'), me, chatDocument));
                msg.maker = me.uri;
                // privateKey the cached private key of me, cached in store
                _context2.next = 37;
                return (0, _keys.getPrivateKey)(me);
              case 37:
                privateKey = _context2.sent;
                // me.uri)
                sig = (0, _signature.signMsg)(msg, privateKey);
                sts.push($rdf.st(message, $rdf.sym("".concat(_signature.SEC, "proofValue")), $rdf.lit(sig), chatDocument));
              case 40:
                if (thread) {
                  sts.push($rdf.st(thread, ns.sioc('has_member'), message, chatDocument));
                  if (!thread.doc().sameTerm(message.doc())) {
                    sts.push($rdf.st(thread, ns.sioc('has_member'), message, thread.doc()));
                  }
                }
                _context2.prev = 41;
                _context2.next = 44;
                return _solidLogic.store.updater.updateMany([], sts);
              case 44:
                _context2.next = 52;
                break;
              case 46:
                _context2.prev = 46;
                _context2.t0 = _context2["catch"](41);
                _errMsg = 'Error saving chat message: ' + _context2.t0;
                debug.warn(_errMsg);
                alert(_errMsg);
                throw new Error(_errMsg);
              case 52:
                return _context2.abrupt("return", message);
              case 53:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[41, 46]]);
        })();
      });
      function updateMessage(_x2) {
        return _updateMessage.apply(this, arguments);
      }
      return updateMessage;
    }()
    /* Mark a message as deleted
    * Wee add a new version of the message,m witha deletion flag (deletion date)
    * so that the deletion can be revoked by adding another non-deleted update
    */
    )
  }, {
    key: "deleteMessage",
    value: (function () {
      var _deleteMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(message) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", this.updateMessage('(message deleted)', message, true));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function deleteMessage(_x3) {
        return _deleteMessage.apply(this, arguments);
      }
      return deleteMessage;
    }() // Create a new thread of replies to the thread root message
    //  or return one which already exists
    )
  }, {
    key: "createThread",
    value: function () {
      var _createThread = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(threadRoot) {
        var already, thread, insert;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              already = _solidLogic.store.each(threadRoot, ns.sioc('has_reply'), null, threadRoot.doc()).filter(function (thread) {
                return _solidLogic.store.holds(thread, ns.rdf('type'), ns.sioc('Thread'), thread.doc());
              });
              if (!(already.length > 0)) {
                _context4.next = 3;
                break;
              }
              return _context4.abrupt("return", already[0]);
            case 3:
              thread = $rdf.sym(threadRoot.uri + '-thread');
              insert = [$rdf.st(thread, ns.rdf('type'), ns.sioc('Thread'), thread.doc()), $rdf.st(threadRoot, ns.sioc('has_reply'), thread, thread.doc())];
              _context4.next = 7;
              return _solidLogic.store.updater.update([], insert);
            case 7:
              return _context4.abrupt("return", thread);
            case 8:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function createThread(_x4) {
        return _createThread.apply(this, arguments);
      }
      return createThread;
    }()
  }]);
}(); // class ChatChannel
// ////////// Utility functions
// Have to not loop forever if fed loops
function allVersions(_x5) {
  return _allVersions.apply(this, arguments);
}
function _allVersions() {
  _allVersions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(message) {
    var versions, done, m, prev, next;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          versions = [message];
          done = {};
          done[message.uri] = true;
          m = message;
        case 4:
          if (!true) {
            _context5.next = 15;
            break;
          }
          // earlier?
          prev = _solidLogic.store.any(null, ns.dct('isReplacedBy'), m, m.doc());
          if (!(!prev || done[prev.uri])) {
            _context5.next = 8;
            break;
          }
          return _context5.abrupt("break", 15);
        case 8:
          _context5.next = 10;
          return _solidLogic.store.fetcher.load(prev);
        case 10:
          versions.unshift(prev);
          done[prev.uri] = true;
          m = prev;
          _context5.next = 4;
          break;
        case 15:
          m = message;
        case 16:
          if (!true) {
            _context5.next = 25;
            break;
          }
          // later?
          next = _solidLogic.store.any(m, ns.dct('isReplacedBy'), null, m.doc());
          if (!(!next || done[next.uri])) {
            _context5.next = 20;
            break;
          }
          return _context5.abrupt("break", 25);
        case 20:
          versions.push(next);
          done[next.uri] = true;
          m = next;
          _context5.next = 16;
          break;
        case 25:
          return _context5.abrupt("return", versions);
        case 26:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _allVersions.apply(this, arguments);
}
function originalVersion(_x6) {
  return _originalVersion.apply(this, arguments);
}
function _originalVersion() {
  _originalVersion = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(message) {
    var msg, done;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          msg = message;
          done = {}; // done[message.uri] = true
        case 2:
          if (!msg) {
            _context6.next = 13;
            break;
          }
          if (!done[msg.uri]) {
            _context6.next = 6;
            break;
          }
          debug.error('originalVersion: verion loop' + message);
          return _context6.abrupt("return", message);
        case 6:
          done[msg.uri] = true;
          message = msg;
          _context6.next = 10;
          return _solidLogic.store.fetcher.load(message);
        case 10:
          msg = _solidLogic.store.any(null, ns.dct('isReplacedBy'), message, message.doc());
          _context6.next = 2;
          break;
        case 13:
          return _context6.abrupt("return", message);
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _originalVersion.apply(this, arguments);
}
function mostRecentVersion(_x7) {
  return _mostRecentVersion.apply(this, arguments);
}
function _mostRecentVersion() {
  _mostRecentVersion = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(message) {
    var msg, done;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          msg = message;
          done = {};
        case 2:
          if (!msg) {
            _context7.next = 13;
            break;
          }
          if (!done[msg.uri]) {
            _context7.next = 6;
            break;
          }
          debug.error('mostRecentVersion: verion loop' + message);
          return _context7.abrupt("return", message);
        case 6:
          done[msg.uri] = true;
          message = msg;
          _context7.next = 10;
          return _solidLogic.store.fetcher.load(message);
        case 10:
          msg = _solidLogic.store.any(message, ns.dct('isReplacedBy'), null, message.doc());
          _context7.next = 2;
          break;
        case 13:
          return _context7.abrupt("return", message);
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _mostRecentVersion.apply(this, arguments);
}
function isDeleted(message) {
  return _solidLogic.store.holds(message, ns.schema('dateDeleted'), null, message.doc());
}
function isReplaced(message) {
  return _solidLogic.store.holds(message, ns.dct('isReplacedBy'), null, message.doc());
}
function isHidden(message) {
  return this.isDeleted(message) || this.isReplaced(message);
}

// A Nickname for a person

function nick(person) {
  var s = _solidLogic.store.any(person, ns.foaf('nick'));
  if (s) return '' + s.value;
  return '' + utils.label(person);
}
// ends
//# sourceMappingURL=chatLogic.js.map