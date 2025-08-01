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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
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
    return _regenerator["default"].wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 1;
          return _solidLogic.store.fetcher.load(leafDocument);
        case 1:
          return _context5.abrupt("return", !(_solidLogic.store.statementsMatching(null, ns.dct('created'), null, leafDocument).length > 0));
        case 2:
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
        return _regenerator["default"].wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _previousPeriod = function _previousPeriod3() {
                _previousPeriod = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(file, level) {
                  var younger, suitable, lastOrFirst, parent, siblings, _folder, uncle, cousins, result, _t;
                  return _regenerator["default"].wrap(function (_context) {
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
                        _context.prev = 1;
                        _context.next = 2;
                        return _solidLogic.store.fetcher.load(parent);
                      case 2:
                        siblings = _solidLogic.store.each(parent, ns.ldp('contains'));
                        siblings = siblings.filter(younger);
                        _folder = lastOrFirst(siblings);
                        if (!_folder) {
                          _context.next = 3;
                          break;
                        }
                        return _context.abrupt("return", _folder);
                      case 3:
                        _context.next = 6;
                        break;
                      case 4:
                        _context.prev = 4;
                        _t = _context["catch"](1);
                        if (!(_t.response && _t.response.status && _t.response.status === 404)) {
                          _context.next = 5;
                          break;
                        }
                        debug.log('Error 404 for chat parent file ' + parent);
                        _context.next = 6;
                        break;
                      case 5:
                        debug.log('*** Error NON 404 for chat parent file ' + parent);
                        // statusTR.appendChild(widgets.errorMessageBlock(dom, err, 'pink'))
                        throw new Error("*** ".concat(_t.message, " for chat folder ").concat(parent));
                      case 6:
                        if (!(level === 0)) {
                          _context.next = 7;
                          break;
                        }
                        return _context.abrupt("return", null);
                      case 7:
                        _context.next = 8;
                        return previousPeriod(parent, level - 1);
                      case 8:
                        uncle = _context.sent;
                        if (uncle) {
                          _context.next = 9;
                          break;
                        }
                        return _context.abrupt("return", null);
                      case 9:
                        _context.next = 10;
                        return _solidLogic.store.fetcher.load(uncle);
                      case 10:
                        cousins = _solidLogic.store.each(uncle, ns.ldp('contains'));
                        result = lastOrFirst(cousins); // debug.log('   previousPeriod: returning cousins at level ' + level, cousins)
                        // debug.log('   previousPeriod: returning result at level ' + level, result)
                        return _context.abrupt("return", result);
                      case 11:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee, null, [[1, 4]]);
                }));
                return _previousPeriod.apply(this, arguments);
              };
              previousPeriod = function _previousPeriod2(_x4, _x5) {
                return _previousPeriod.apply(this, arguments);
              }; // previousPeriod
              folder = this.leafDocumentFromDate(date).dir();
            case 1:
              if (!true) {
                _context2.next = 8;
                break;
              }
              _context2.next = 2;
              return previousPeriod(folder, 3);
            case 2:
              found = _context2.sent;
              if (!found) {
                _context2.next = 6;
                break;
              }
              leafDocument = _solidLogic.store.sym(found.uri + this.leafFileName);
              nextDate = this.dateFromLeafDocument(leafDocument);
              _context2.next = 3;
              return emptyLeaf(leafDocument);
            case 3:
              if (_context2.sent) {
                _context2.next = 4;
                break;
              }
              return _context2.abrupt("return", nextDate);
            case 4:
              // debug.log('  loadPrevious: skipping empty ' + leafDocument)
              date = nextDate;
              folder = this.leafDocumentFromDate(date).dir();
              // debug.log('    loadPrevious: moved back to ' + folder)
            case 5:
              _context2.next = 7;
              break;
            case 6:
              return _context2.abrupt("return", null);
            case 7:
              _context2.next = 1;
              break;
            case 8:
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
        return _regenerator["default"].wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _earliestSubfolder = function _earliestSubfolder3() {
                _earliestSubfolder = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(parent) {
                  var suitable, kids;
                  return _regenerator["default"].wrap(function (_context3) {
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
                        _context3.next = 1;
                        return folderFetcher.load(parent, {
                          force: true
                        });
                      case 1:
                        // Force fetch as will have changed
                        // }catch (err) {
                        // }
                        kids = folderStore.each(parent, ns.ldp('contains'));
                        kids = kids.filter(suitable);
                        if (!(kids.length === 0)) {
                          _context3.next = 2;
                          break;
                        }
                        throw new Error(' @@@  No children to         parent2 ' + parent);
                      case 2:
                        kids.sort();
                        if (backwards) kids.reverse();
                        return _context3.abrupt("return", kids[0]);
                      case 3:
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
              _context4.next = 1;
              return earliestSubfolder(this.root.dir());
            case 1:
              y = _context4.sent;
              _context4.next = 2;
              return earliestSubfolder(y);
            case 2:
              month = _context4.sent;
              _context4.next = 3;
              return earliestSubfolder(month);
            case 3:
              d = _context4.sent;
              leafDocument = $rdf.sym(d.uri + 'chat.ttl');
              _context4.next = 4;
              return folderFetcher.load(leafDocument);
            case 4:
              leafObjects = folderStore.each(this.root, this.membershipProperty, null, leafDocument);
              if (!(leafObjects.length === 0)) {
                _context4.next = 5;
                break;
              }
              msg = '  INCONSISTENCY -- no chat leafObject in file ' + leafDocument;
              debug.trace(msg);
              throw new Error(msg);
            case 5:
              sortMe = leafObjects.map(function (leafObject) {
                return [folderStore.any(leafObject, ns.dct('created')), leafObject];
              });
              sortMe.sort();
              if (backwards) sortMe.reverse();
              /* debug.log(
                (backwards ? 'Latest' : 'Earliest') + ' leafObject is ' + sortMe[0][1]
              ) */
              return _context4.abrupt("return", sortMe[0][1]);
            case 6:
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