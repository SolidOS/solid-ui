"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findBookmarkDocument = findBookmarkDocument;
exports.renderBookmarksButton = renderBookmarksButton;
exports.toggleBookmark = toggleBookmark;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t4 in e) "default" !== _t4 && {}.hasOwnProperty.call(e, _t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t4)) && (i.get || i.set) ? o(f, _t4, i) : f[_t4] = e[_t4]); return f; })(e, t); }
/**
 * Functions related to chat and bookmarks
 * @packageDocumentation
 */

// pull in first avoid cross-refs

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

// @@@@ use the one in rdflib.js when it is avaiable and delete this
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
}

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
  _findBookmarkDocument = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(userContext) {
    var theClass, fileTail, isPublic, newBookmarkFile, _t;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          theClass = BOOK('Bookmark');
          fileTail = 'bookmarks.ttl';
          isPublic = true;
          _context.next = 1;
          return (0, _login.findAppInstances)(userContext, theClass, isPublic);
        case 1:
          if (!(userContext.instances && userContext.instances.length > 0)) {
            _context.next = 2;
            break;
          }
          userContext.bookmarkDocument = userContext.instances[0];
          if (userContext.instances.length > 1) {
            debug.warn('More than one bookmark file! ' + userContext.instances); // @@ todo - deal with > 1
            // Note: should pick up community bookmarks as well
          }
          _context.next = 9;
          break;
        case 2:
          if (!userContext.publicProfile) {
            _context.next = 8;
            break;
          }
          // publicProfile or preferencesFile
          newBookmarkFile = $rdf.sym(userContext.publicProfile.dir().uri + fileTail);
          _context.prev = 3;
          debug.log('Creating new bookmark file ' + newBookmarkFile);
          _context.next = 4;
          return _solidLogic.store.fetcher.createIfNotExists(newBookmarkFile);
        case 4:
          _context.next = 6;
          break;
        case 5:
          _context.prev = 5;
          _t = _context["catch"](3);
          debug.warn("Can't make fresh bookmark file:" + _t);
          return _context.abrupt("return", userContext);
        case 6:
          _context.next = 7;
          return (0, _solidLogic.registerInTypeIndex)(newBookmarkFile, userContext.index, theClass);
        case 7:
          userContext.bookmarkDocument = newBookmarkFile;
          _context.next = 9;
          break;
        case 8:
          debug.warn('You seem to have no bookmark file, nor even a profile file!');
        case 9:
          return _context.abrupt("return", userContext);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 5]]);
  }));
  return _findBookmarkDocument.apply(this, arguments);
}
function addBookmark(_x2, _x3) {
  return _addBookmark.apply(this, arguments);
}
function _addBookmark() {
  _addBookmark = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(context, target) {
    var title, me, author, bookmarkDoc, bookmark, ins, msg, _t2;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
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
            _context2.next = 1;
            break;
          }
          throw new Error('Must be logged on to add Bookmark');
        case 1:
          author = _solidLogic.store.any(target, ns.foaf('maker'));
          title = label(author) + ': ' + _solidLogic.store.anyValue(target, ns.sioc('content')).slice(0, 80); // @@ add chat title too?
          bookmarkDoc = context.bookmarkDocument;
          bookmark = UI.widgets.newThing(bookmarkDoc, title);
          ins = [$rdf.st(bookmarkDoc, UI.ns.dct('references'), bookmark, bookmarkDoc), $rdf.st(bookmark, UI.ns.rdf('type'), BOOK('Bookmark'), bookmarkDoc), $rdf.st(bookmark, UI.ns.dct('created'), new Date(), bookmarkDoc), $rdf.st(bookmark, BOOK('recalls'), target, bookmarkDoc), $rdf.st(bookmark, UI.ns.foaf('maker'), me, bookmarkDoc), $rdf.st(bookmark, UI.ns.dct('title'), title, bookmarkDoc)];
          _context2.prev = 2;
          _context2.next = 3;
          return updatePromise([], ins);
        case 3:
          _context2.next = 5;
          break;
        case 4:
          _context2.prev = 4;
          _t2 = _context2["catch"](2);
          msg = 'Making bookmark: ' + _t2;
          debug.warn(msg);
          return _context2.abrupt("return", null);
        case 5:
          return _context2.abrupt("return", bookmark);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 4]]);
  }));
  return _addBookmark.apply(this, arguments);
}
function toggleBookmark(_x4, _x5, _x6) {
  return _toggleBookmark.apply(this, arguments);
}
function _toggleBookmark() {
  _toggleBookmark = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(userContext, target, bookmarkButton) {
    var bookmarks, i, bookmark, _t3;
    return _regenerator["default"].wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 1;
          return _solidLogic.store.fetcher.load(userContext.bookmarkDocument);
        case 1:
          bookmarks = _solidLogic.store.each(null, BOOK('recalls'), target, userContext.bookmarkDocument);
          if (!bookmarks.length) {
            _context3.next = 9;
            break;
          }
          if (confirm('Delete bookmark on this?' + bookmarks.length)) {
            _context3.next = 2;
            break;
          }
          return _context3.abrupt("return");
        case 2:
          i = 0;
        case 3:
          if (!(i < bookmarks.length)) {
            _context3.next = 8;
            break;
          }
          _context3.prev = 4;
          _context3.next = 5;
          return updatePromise(_solidLogic.store.connectedStatements(bookmarks[i]), []);
        case 5:
          bookmarkButton.style.backgroundColor = 'white';
          debug.log('Bookmark deleted: ' + bookmarks[i]);
          _context3.next = 7;
          break;
        case 6:
          _context3.prev = 6;
          _t3 = _context3["catch"](4);
          debug.error('Cant delete bookmark:' + _t3);
          debug.warn('Cannot delete bookmark:' + _t3);
        case 7:
          i++;
          _context3.next = 3;
          break;
        case 8:
          _context3.next = 11;
          break;
        case 9:
          _context3.next = 10;
          return addBookmark(userContext, target);
        case 10:
          bookmark = _context3.sent;
          bookmarkButton.style.backgroundColor = 'yellow';
          debug.log('Bookmark added: ' + bookmark);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[4, 6]]);
  }));
  return _toggleBookmark.apply(this, arguments);
}
function renderBookmarksButton(_x7, _x8) {
  return _renderBookmarksButton.apply(this, arguments);
}
function _renderBookmarksButton() {
  _renderBookmarksButton = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(userContext, target) {
    var setBookmarkButtonColor, _setBookmarkButtonColor, bookmarkButton;
    return _regenerator["default"].wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _setBookmarkButtonColor = function _setBookmarkButtonCol2() {
            _setBookmarkButtonColor = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(bookmarkButton) {
              var bookmarked;
              return _regenerator["default"].wrap(function (_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 1;
                    return _solidLogic.store.fetcher.load(userContext.bookmarkDocument);
                  case 1:
                    bookmarked = _solidLogic.store.any(null, BOOK('recalls'), bookmarkButton.target, userContext.bookmarkDocument);
                    bookmarkButton.style = UI.style.buttonStyle;
                    if (bookmarked) bookmarkButton.style.backgroundColor = 'yellow';
                  case 2:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return _setBookmarkButtonColor.apply(this, arguments);
          };
          setBookmarkButtonColor = function _setBookmarkButtonCol(_x9) {
            return _setBookmarkButtonColor.apply(this, arguments);
          };
          if (!userContext.bookmarkDocument) {
            _context5.next = 2;
            break;
          }
          bookmarkButton = UI.widgets.button(dom, UI.icons.iconBase + BOOKMARK_ICON, label(BOOK('Bookmark')), function () {
            toggleBookmark(userContext, target, bookmarkButton);
          });
          bookmarkButton.target = target;
          _context5.next = 1;
          return setBookmarkButtonColor(bookmarkButton);
        case 1:
          return _context5.abrupt("return", bookmarkButton);
        case 2:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _renderBookmarksButton.apply(this, arguments);
}
//# sourceMappingURL=bookmarks.js.map