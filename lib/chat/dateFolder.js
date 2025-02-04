"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateFolder = void 0;
exports.emptyLeaf = emptyLeaf;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var debug = _interopRequireWildcard(require("../debug"));
var _solidLogic = require("solid-logic");
var ns = _interopRequireWildcard(require("../ns"));
var $rdf = _interopRequireWildcard(require("rdflib"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * Contains the [[DateFolder]] class
 * This tracks data stored in dated folders and sub-folders
 *
 */
// pull in first avoid cross-refs
function emptyLeaf(_x) {
  return _emptyLeaf.apply(this, arguments);
}
/**
 * Track back through the YYYY/MM/DD tree to find the previous/next day
 */
function _emptyLeaf() {
  _emptyLeaf = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(leafDocument) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _solidLogic.store.fetcher.load(leafDocument);
        case 2:
          return _context5.abrupt("return", !(_solidLogic.store.statementsMatching(null, ns.dct('created'), null, leafDocument).length > 0));
        case 3:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _emptyLeaf.apply(this, arguments);
}
var DateFolder = exports.DateFolder = /*#__PURE__*/function () {
  function DateFolder(rootThing, leafFileName, membershipProperty) {
    (0, _classCallCheck2["default"])(this, DateFolder);
    this.root = rootThing;
    this.rootFolder = rootThing.dir();
    this.leafFileName = leafFileName || 'index.ttl'; // typically chat.ttl
    this.membershipProperty = membershipProperty || ns.wf('leafObject');
  }

  /* Generate the leaf document (rdf object) from date
   * @returns: <NamedNode> - document
   */
  return (0, _createClass2["default"])(DateFolder, [{
    key: "leafDocumentFromDate",
    value: function leafDocumentFromDate(date) {
      // debug.log('incoming date: ' + date)
      var isoDate = date.toISOString(); // Like "2018-05-07T17:42:46.576Z"
      var path = isoDate.split('T')[0].replace(/-/g, '/'); //  Like "2018/05/07"
      path = this.root.dir().uri + path + '/' + this.leafFileName;
      return _solidLogic.store.sym(path);
    }

    /* Generate a date object from the leaf file name
     */
  }, {
    key: "dateFromLeafDocument",
    value: function dateFromLeafDocument(doc) {
      var head = this.rootFolder.uri.length;
      var str = doc.uri.slice(head, head + 10).replace(/\//g, '-');
      // let date = new Date(str + 'Z') // GMT - but fails in FF - invalid format :-(
      var date = new Date(str); // not explicitly UTC but is assumed so in spec
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
      // debug.log('Date for ' + doc + ':' + date.toISOString())
      return date;
    }
  }, {
    key: "loadPrevious",
    value: function () {
      var _loadPrevious = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(date, backwards) {
        var previousPeriod, _previousPeriod, folder, found, leafDocument, nextDate;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _previousPeriod = function _previousPeriod3() {
                _previousPeriod = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(file, level) {
                  var younger, suitable, lastOrFirst, parent, siblings, _folder, uncle, cousins, result;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        lastOrFirst = function _lastOrFirst(siblings) {
                          siblings = siblings.filter(suitable);
                          siblings.sort(); // chronological order
                          if (!backwards) siblings.reverse();
                          return siblings.pop(); // date folder
                        };
                        suitable = function _suitable(x) {
                          var tail = x.uri.slice(0, -1).split('/').slice(-1)[0];
                          if (!'0123456789'.includes(tail[0])) return false; // not numeric
                          return true;
                        };
                        younger = function _younger(x) {
                          if (backwards ? x.uri >= file.uri : x.uri <= file.uri) return false; // later than we want or same -- looking for different
                          return true;
                        };
                        // debug.log('  previousPeriod level' + level + ' file ' + file)
                        parent = file.dir();
                        _context.prev = 4;
                        _context.next = 7;
                        return _solidLogic.store.fetcher.load(parent);
                      case 7:
                        siblings = _solidLogic.store.each(parent, ns.ldp('contains'));
                        siblings = siblings.filter(younger);
                        _folder = lastOrFirst(siblings);
                        if (!_folder) {
                          _context.next = 12;
                          break;
                        }
                        return _context.abrupt("return", _folder);
                      case 12:
                        _context.next = 22;
                        break;
                      case 14:
                        _context.prev = 14;
                        _context.t0 = _context["catch"](4);
                        if (!(_context.t0.response && _context.t0.response.status && _context.t0.response.status === 404)) {
                          _context.next = 20;
                          break;
                        }
                        debug.log('Error 404 for chat parent file ' + parent);
                        _context.next = 22;
                        break;
                      case 20:
                        debug.log('*** Error NON 404 for chat parent file ' + parent);
                        // statusTR.appendChild(widgets.errorMessageBlock(dom, err, 'pink'))
                        throw new Error("*** ".concat(_context.t0.message, " for chat folder ").concat(parent));
                      case 22:
                        if (!(level === 0)) {
                          _context.next = 24;
                          break;
                        }
                        return _context.abrupt("return", null);
                      case 24:
                        _context.next = 26;
                        return previousPeriod(parent, level - 1);
                      case 26:
                        uncle = _context.sent;
                        if (uncle) {
                          _context.next = 29;
                          break;
                        }
                        return _context.abrupt("return", null);
                      case 29:
                        _context.next = 31;
                        return _solidLogic.store.fetcher.load(uncle);
                      case 31:
                        cousins = _solidLogic.store.each(uncle, ns.ldp('contains'));
                        result = lastOrFirst(cousins); // debug.log('   previousPeriod: returning cousins at level ' + level, cousins)
                        // debug.log('   previousPeriod: returning result at level ' + level, result)
                        return _context.abrupt("return", result);
                      case 34:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee, null, [[4, 14]]);
                }));
                return _previousPeriod.apply(this, arguments);
              };
              previousPeriod = function _previousPeriod2(_x4, _x5) {
                return _previousPeriod.apply(this, arguments);
              }; // previousPeriod
              folder = this.leafDocumentFromDate(date).dir();
            case 3:
              if (!true) {
                _context2.next = 23;
                break;
              }
              _context2.next = 6;
              return previousPeriod(folder, 3);
            case 6:
              found = _context2.sent;
              if (!found) {
                _context2.next = 20;
                break;
              }
              leafDocument = _solidLogic.store.sym(found.uri + this.leafFileName);
              nextDate = this.dateFromLeafDocument(leafDocument);
              _context2.next = 12;
              return emptyLeaf(leafDocument);
            case 12:
              if (_context2.sent) {
                _context2.next = 16;
                break;
              }
              return _context2.abrupt("return", nextDate);
            case 16:
              // debug.log('  loadPrevious: skipping empty ' + leafDocument)
              date = nextDate;
              folder = this.leafDocumentFromDate(date).dir();
              // debug.log('    loadPrevious: moved back to ' + folder)
            case 18:
              _context2.next = 21;
              break;
            case 20:
              return _context2.abrupt("return", null);
            case 21:
              _context2.next = 3;
              break;
            case 23:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function loadPrevious(_x2, _x3) {
        return _loadPrevious.apply(this, arguments);
      }
      return loadPrevious;
    }() // loadPrevious
  }, {
    key: "firstLeaf",
    value: function () {
      var _firstLeaf = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(backwards) {
        var folderStore, folderFetcher, earliestSubfolder, _earliestSubfolder, y, month, d, leafDocument, leafObjects, msg, sortMe;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _earliestSubfolder = function _earliestSubfolder3() {
                _earliestSubfolder = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(parent) {
                  var suitable, kids;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        suitable = function _suitable2(x) {
                          var tail = x.uri.slice(0, -1).split('/').slice(-1)[0];
                          if (!'0123456789'.includes(tail[0])) return false; // not numeric
                          return true;
                        };
                        // debug.log('            parent ' + parent)
                        delete folderFetcher.requested[parent.uri];
                        // try {
                        _context3.next = 4;
                        return folderFetcher.load(parent, {
                          force: true
                        });
                      case 4:
                        // Force fetch as will have changed
                        // }catch (err) {
                        // }
                        kids = folderStore.each(parent, ns.ldp('contains'));
                        kids = kids.filter(suitable);
                        if (!(kids.length === 0)) {
                          _context3.next = 8;
                          break;
                        }
                        throw new Error(' @@@  No children to         parent2 ' + parent);
                      case 8:
                        kids.sort();
                        if (backwards) kids.reverse();
                        return _context3.abrupt("return", kids[0]);
                      case 11:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee3);
                }));
                return _earliestSubfolder.apply(this, arguments);
              };
              earliestSubfolder = function _earliestSubfolder2(_x7) {
                return _earliestSubfolder.apply(this, arguments);
              };
              // backwards -> last leafObject
              folderStore = $rdf.graph();
              folderFetcher = new $rdf.Fetcher(folderStore);
              _context4.next = 6;
              return earliestSubfolder(this.root.dir());
            case 6:
              y = _context4.sent;
              _context4.next = 9;
              return earliestSubfolder(y);
            case 9:
              month = _context4.sent;
              _context4.next = 12;
              return earliestSubfolder(month);
            case 12:
              d = _context4.sent;
              leafDocument = $rdf.sym(d.uri + 'chat.ttl');
              _context4.next = 16;
              return folderFetcher.load(leafDocument);
            case 16:
              leafObjects = folderStore.each(this.root, this.membershipProperty, null, leafDocument);
              if (!(leafObjects.length === 0)) {
                _context4.next = 21;
                break;
              }
              msg = '  INCONSISTENCY -- no chat leafObject in file ' + leafDocument;
              debug.trace(msg);
              throw new Error(msg);
            case 21:
              sortMe = leafObjects.map(function (leafObject) {
                return [folderStore.any(leafObject, ns.dct('created')), leafObject];
              });
              sortMe.sort();
              if (backwards) sortMe.reverse();
              /* debug.log(
                (backwards ? 'Latest' : 'Earliest') + ' leafObject is ' + sortMe[0][1]
              ) */
              return _context4.abrupt("return", sortMe[0][1]);
            case 25:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function firstLeaf(_x6) {
        return _firstLeaf.apply(this, arguments);
      }
      return firstLeaf;
    }() // firstleafObject
  }]);
}(); // class
//# sourceMappingURL=dateFolder.js.map