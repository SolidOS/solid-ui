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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Functions related to chat and bookmarks
 * @packageDocumentation
 */

/* global alert confirm */
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
  _findBookmarkDocument = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userContext) {
    var theClass, fileTail, isPublic, newBookmarkFile;
    return _regenerator["default"].wrap(function _callee$(_context) {
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
  _addBookmark = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(context, target) {
    var title, me, author, bookmarkDoc, bookmark, ins, msg;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
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
  _toggleBookmark = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userContext, target, bookmarkButton) {
    var bookmarks, i, bookmark;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
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
  _renderBookmarksButton = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(userContext, target) {
    var setBookmarkButtonColor, _setBookmarkButtonColor, bookmarkButton;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _setBookmarkButtonColor = function _setBookmarkButtonCol2() {
              _setBookmarkButtonColor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(bookmarkButton) {
                var bookmarked;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
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