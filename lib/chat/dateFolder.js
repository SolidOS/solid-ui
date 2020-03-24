"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var debug = _interopRequireWildcard(require("../debug"));

/**
 * Contains the [[DateFolder]] class
 * @packageDocumentation
 */
var kb = require('../store.js');

var ns = require('../ns.js');

var $rdf = require('rdflib');
/**
 * Track back through the YYYY/MM/DD tree to find the previous/next day
 */


module.exports =
/*#__PURE__*/
function () {
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


  (0, _createClass2["default"])(DateFolder, [{
    key: "leafDocumentFromDate",
    value: function leafDocumentFromDate(date) {
      // debug.log('incoming date: ' + date)
      var isoDate = date.toISOString(); // Like "2018-05-07T17:42:46.576Z"

      var path = isoDate.split('T')[0].replace(/-/g, '/'); //  Like "2018/05/07"

      path = this.root.dir().uri + path + '/' + this.leafFileName;
      return kb.sym(path);
    }
    /* Generate a date object from the leaf file name
     */

  }, {
    key: "dateFromLeafDocument",
    value: function dateFromLeafDocument(doc) {
      var head = this.rootFolder.uri.length;
      var str = doc.uri.slice(head, head + 10).replace(/\//g, '-'); // let date = new Date(str + 'Z') // GMT - but fails in FF - invalid format :-(

      var date = new Date(str); // not explicitly UTC but is assumed so in spec
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse

      debug.log('Date for ' + doc + ':' + date.toISOString());
      return date;
    }
  }, {
    key: "loadPrevious",
    value: function () {
      var _loadPrevious = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(date, backwards) {
        var thisDateFolder, previousPeriod, _previousPeriod, folder, found, doc;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _previousPeriod = function _ref6() {
                  _previousPeriod = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee2(file, level) {
                    var younger, suitable, lastNonEmpty, _lastNonEmpty, parent, siblings, folder, uncle, cousins, result;

                    return _regenerator["default"].wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _lastNonEmpty = function _ref4() {
                              _lastNonEmpty = (0, _asyncToGenerator2["default"])(
                              /*#__PURE__*/
                              _regenerator["default"].mark(function _callee(siblings) {
                                var _folder, leafDocument;

                                return _regenerator["default"].wrap(function _callee$(_context) {
                                  while (1) {
                                    switch (_context.prev = _context.next) {
                                      case 0:
                                        siblings = siblings.filter(suitable);
                                        siblings.sort(); // chronological order

                                        if (!backwards) siblings.reverse();

                                        if (!(level !== 3)) {
                                          _context.next = 5;
                                          break;
                                        }

                                        return _context.abrupt("return", siblings.pop());

                                      case 5:
                                        if (!siblings.length) {
                                          _context.next = 14;
                                          break;
                                        }

                                        _folder = siblings.pop();
                                        leafDocument = kb.sym(_folder.uri + thisDateFolder.leafFileName);
                                        _context.next = 10;
                                        return kb.fetcher.load(leafDocument);

                                      case 10:
                                        if (!(kb.statementsMatching(null, ns.dct('created'), null, leafDocument).length > 0)) {
                                          _context.next = 12;
                                          break;
                                        }

                                        return _context.abrupt("return", _folder);

                                      case 12:
                                        _context.next = 5;
                                        break;

                                      case 14:
                                        return _context.abrupt("return", null);

                                      case 15:
                                      case "end":
                                        return _context.stop();
                                    }
                                  }
                                }, _callee);
                              }));
                              return _lastNonEmpty.apply(this, arguments);
                            };

                            lastNonEmpty = function _ref3(_x5) {
                              return _lastNonEmpty.apply(this, arguments);
                            };

                            suitable = function _ref2(x) {
                              var tail = x.uri.slice(0, -1).split('/').slice(-1)[0];
                              if (!'0123456789'.includes(tail[0])) return false; // not numeric

                              return true;
                            };

                            younger = function _ref(x) {
                              if (backwards ? x.uri >= file.uri : x.uri <= file.uri) return false; // later than we want or same -- looking for different

                              return true;
                            };

                            // debug.log('  previousPeriod level' + level + ' file ' + file)
                            parent = file.dir();
                            _context2.next = 7;
                            return kb.fetcher.load(parent);

                          case 7:
                            siblings = kb.each(parent, ns.ldp('contains'));
                            siblings = siblings.filter(younger);
                            _context2.next = 11;
                            return lastNonEmpty(siblings);

                          case 11:
                            folder = _context2.sent;

                            if (!folder) {
                              _context2.next = 14;
                              break;
                            }

                            return _context2.abrupt("return", folder);

                          case 14:
                            if (!(level === 0)) {
                              _context2.next = 16;
                              break;
                            }

                            return _context2.abrupt("return", null);

                          case 16:
                            _context2.next = 18;
                            return previousPeriod(parent, level - 1);

                          case 18:
                            uncle = _context2.sent;

                            if (uncle) {
                              _context2.next = 21;
                              break;
                            }

                            return _context2.abrupt("return", null);

                          case 21:
                            _context2.next = 23;
                            return kb.fetcher.load(uncle);

                          case 23:
                            cousins = kb.each(uncle, ns.ldp('contains'));
                            _context2.next = 26;
                            return lastNonEmpty(cousins);

                          case 26:
                            result = _context2.sent;
                            return _context2.abrupt("return", result);

                          case 28:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));
                  return _previousPeriod.apply(this, arguments);
                };

                previousPeriod = function _ref5(_x3, _x4) {
                  return _previousPeriod.apply(this, arguments);
                };

                thisDateFolder = this;
                // previousPeriod
                folder = this.leafDocumentFromDate(date).dir();
                _context3.next = 6;
                return previousPeriod(folder, 3);

              case 6:
                found = _context3.sent;

                if (!found) {
                  _context3.next = 10;
                  break;
                }

                doc = kb.sym(found.uri + this.leafFileName);
                return _context3.abrupt("return", this.dateFromLeafDocument(doc));

              case 10:
                return _context3.abrupt("return", null);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadPrevious(_x, _x2) {
        return _loadPrevious.apply(this, arguments);
      }

      return loadPrevious;
    }() // loadPrevious

  }, {
    key: "firstLeaf",
    value: function () {
      var _firstLeaf = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(backwards) {
        var folderStore, folderFetcher, earliestSubfolder, _earliestSubfolder, y, month, d, leafDocument, leafObjects, msg, sortMe;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _earliestSubfolder = function _ref9() {
                  _earliestSubfolder = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee4(parent) {
                    var suitable, kids;
                    return _regenerator["default"].wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            suitable = function _ref7(x) {
                              var tail = x.uri.slice(0, -1).split('/').slice(-1)[0];
                              if (!'0123456789'.includes(tail[0])) return false; // not numeric

                              return true;
                            };

                            debug.log('            parent ' + parent);
                            delete folderFetcher.requested[parent.uri]; // try {

                            _context4.next = 5;
                            return folderFetcher.load(parent, {
                              force: true
                            });

                          case 5:
                            // Force fetch as will have changed
                            // }catch (err) {
                            // }
                            kids = folderStore.each(parent, ns.ldp('contains'));
                            kids = kids.filter(suitable);

                            if (!(kids.length === 0)) {
                              _context4.next = 9;
                              break;
                            }

                            throw new Error(' @@@  No children to         parent2 ' + parent);

                          case 9:
                            kids.sort();
                            if (backwards) kids.reverse();
                            return _context4.abrupt("return", kids[0]);

                          case 12:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));
                  return _earliestSubfolder.apply(this, arguments);
                };

                earliestSubfolder = function _ref8(_x7) {
                  return _earliestSubfolder.apply(this, arguments);
                };

                // backwards -> last leafObject
                folderStore = $rdf.graph();
                folderFetcher = new $rdf.Fetcher(folderStore);
                _context5.next = 6;
                return earliestSubfolder(this.root.dir());

              case 6:
                y = _context5.sent;
                _context5.next = 9;
                return earliestSubfolder(y);

              case 9:
                month = _context5.sent;
                _context5.next = 12;
                return earliestSubfolder(month);

              case 12:
                d = _context5.sent;
                leafDocument = $rdf.sym(d.uri + 'chat.ttl');
                _context5.next = 16;
                return folderFetcher.load(leafDocument);

              case 16:
                leafObjects = folderStore.each(this.root, this.membershipProperty, null, leafDocument);

                if (!(leafObjects.length === 0)) {
                  _context5.next = 21;
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
                debug.log((backwards ? 'Latest' : 'Earliest') + ' leafObject is ' + sortMe[0][1]);
                return _context5.abrupt("return", sortMe[0][1]);

              case 26:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function firstLeaf(_x6) {
        return _firstLeaf.apply(this, arguments);
      }

      return firstLeaf;
    }() // firstleafObject

  }]);
  return DateFolder;
}(); // class
//# sourceMappingURL=dateFolder.js.map