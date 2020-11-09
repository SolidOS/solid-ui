"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FetchError = exports.NotFoundError = exports.SameOriginForbiddenError = exports.CrossOriginForbiddenError = exports.UnauthorizedError = exports.SolidLogic = exports.ACL_LINK = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var rdf = _interopRequireWildcard(require("rdflib"));

var _solidNamespace = _interopRequireDefault(require("solid-namespace"));

var debug = _interopRequireWildcard(require("./debug"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ACL_LINK = rdf.sym('http://www.iana.org/assignments/link-relations/acl');
exports.ACL_LINK = ACL_LINK;
var ns = (0, _solidNamespace["default"])(rdf);

var SolidLogic = /*#__PURE__*/function () {
  function SolidLogic(fetcher) {
    (0, _classCallCheck2["default"])(this, SolidLogic);
    (0, _defineProperty2["default"])(this, "store", void 0);
    this.store = rdf.graph(); // Make a Quad store

    rdf.fetcher(this.store, fetcher); // Attach a web I/O module, store.fetcher

    this.store.updater = new rdf.UpdateManager(this.store); // Add real-time live updates store.updater
  }

  (0, _createClass2["default"])(SolidLogic, [{
    key: "findAclDocUrl",
    value: function () {
      var _findAclDocUrl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url) {
        var doc, docNode;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                doc = this.store.sym(url);
                _context.next = 3;
                return this.store.fetcher.load(doc);

              case 3:
                docNode = this.store.any(doc, ACL_LINK);

                if (docNode) {
                  _context.next = 6;
                  break;
                }

                throw new Error("No ACL link discovered for ".concat(url));

              case 6:
                return _context.abrupt("return", docNode.value);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function findAclDocUrl(_x) {
        return _findAclDocUrl.apply(this, arguments);
      }

      return findAclDocUrl;
    }()
  }, {
    key: "loadDoc",
    value: function () {
      var _loadDoc = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(profileDocument) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.store.fetcher.load(profileDocument, {
                  withCredentials: false,
                  cache: 'reload'
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadDoc(_x2) {
        return _loadDoc.apply(this, arguments);
      }

      return loadDoc;
    }()
  }, {
    key: "loadPreferences",
    value: function () {
      var _loadPreferences = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(me) {
        var preferencesFile, differentOrigin, status;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                differentOrigin = function _differentOrigin() {
                  return "".concat(window.location.origin, "/") !== preferencesFile.site().uri;
                };

                preferencesFile = this.store.any(me, ns.space('preferencesFile'));
                /**
                 * Are we working cross-origin?
                 * Returns True if we are in a webapp at an origin, and the file origin is different
                 */

                if (preferencesFile) {
                  _context3.next = 4;
                  break;
                }

                throw new Error("Can't find a preference file pointer in profile ".concat(me.doc()));

              case 4:
                _context3.prev = 4;
                this.store.fetcher.load(preferencesFile, {
                  withCredentials: true
                });
                _context3.next = 21;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](4);
                // Really important to look at why
                status = _context3.t0.status;
                debug.log("HTTP status ".concat(status, " for preference file ").concat(preferencesFile));

                if (!(status === 401)) {
                  _context3.next = 14;
                  break;
                }

                throw new UnauthorizedError();

              case 14:
                if (!(status === 403)) {
                  _context3.next = 18;
                  break;
                }

                if (!differentOrigin()) {
                  _context3.next = 17;
                  break;
                }

                throw new CrossOriginForbiddenError();

              case 17:
                throw new SameOriginForbiddenError();

              case 18:
                if (!(status === 404)) {
                  _context3.next = 20;
                  break;
                }

                throw new NotFoundError(preferencesFile);

              case 20:
                throw new FetchError(_context3.t0.status, _context3.t0.message);

              case 21:
                return _context3.abrupt("return", preferencesFile);

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 8]]);
      }));

      function loadPreferences(_x3) {
        return _loadPreferences.apply(this, arguments);
      }

      return loadPreferences;
    }()
  }, {
    key: "getTypeIndex",
    value: function getTypeIndex(me, preferencesFile, isPublic) {
      return this.store.each(me, isPublic ? ns.solid('publicTypeIndex') : ns.solid('privateTypeIndex'), undefined, preferencesFile);
    }
  }, {
    key: "getContainerElements",
    value: function getContainerElements(cont) {
      return this.store.each(cont, ns.ldp('contains'));
    }
  }, {
    key: "getRegistrations",
    value: function getRegistrations(instance, theClass) {
      var _this = this;

      return this.store.each(undefined, ns.solid('instance'), instance).filter(function (r) {
        return _this.store.holds(r, ns.solid('forClass'), theClass);
      });
    }
  }, {
    key: "load",
    value: function load(doc) {
      return this.store.fetcher.load(doc);
    }
  }, {
    key: "createEmptyRdfDoc",
    value: function () {
      var _createEmptyRdfDoc = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(doc, comment) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.store.fetcher.webOperation('PUT', doc.uri, {
                  data: "# ".concat(new Date(), " ").concat(comment, "\n"),
                  contentType: 'text/turtle'
                });

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function createEmptyRdfDoc(_x4, _x5) {
        return _createEmptyRdfDoc.apply(this, arguments);
      }

      return createEmptyRdfDoc;
    }() // @@@@ use the one in rdflib.js when it is available and delete this

  }, {
    key: "updatePromise",
    value: function updatePromise(del) {
      var _this2 = this;

      var ins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return new Promise(function (resolve, reject) {
        _this2.store.updater.update(del, ins, function (uri, ok, errorBody) {
          if (!ok) {
            reject(new Error(errorBody));
          } else {
            resolve();
          }
        }); // callback

      }); // promise
    }
  }, {
    key: "clearStore",
    value: function clearStore() {
      this.store.statements.slice().forEach(this.store.remove.bind(this.store));
    }
  }]);
  return SolidLogic;
}();

exports.SolidLogic = SolidLogic;

var UnauthorizedError = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(UnauthorizedError, _Error);

  var _super = _createSuper(UnauthorizedError);

  function UnauthorizedError(message) {
    var _this3;

    (0, _classCallCheck2["default"])(this, UnauthorizedError);
    _this3 = _super.call(this, message); // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html

    Object.setPrototypeOf((0, _assertThisInitialized2["default"])(_this3), (this instanceof UnauthorizedError ? this.constructor : void 0).prototype); // restore prototype chain

    _this3.name = UnauthorizedError.name; // stack traces display correctly now

    return _this3;
  }

  return UnauthorizedError;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

exports.UnauthorizedError = UnauthorizedError;

var CrossOriginForbiddenError = /*#__PURE__*/function (_Error2) {
  (0, _inherits2["default"])(CrossOriginForbiddenError, _Error2);

  var _super2 = _createSuper(CrossOriginForbiddenError);

  function CrossOriginForbiddenError(message) {
    var _this4;

    (0, _classCallCheck2["default"])(this, CrossOriginForbiddenError);
    _this4 = _super2.call(this, message); // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html

    Object.setPrototypeOf((0, _assertThisInitialized2["default"])(_this4), (this instanceof CrossOriginForbiddenError ? this.constructor : void 0).prototype); // restore prototype chain

    _this4.name = CrossOriginForbiddenError.name; // stack traces display correctly now

    return _this4;
  }

  return CrossOriginForbiddenError;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

exports.CrossOriginForbiddenError = CrossOriginForbiddenError;

var SameOriginForbiddenError = /*#__PURE__*/function (_Error3) {
  (0, _inherits2["default"])(SameOriginForbiddenError, _Error3);

  var _super3 = _createSuper(SameOriginForbiddenError);

  function SameOriginForbiddenError(message) {
    var _this5;

    (0, _classCallCheck2["default"])(this, SameOriginForbiddenError);
    _this5 = _super3.call(this, message); // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html

    Object.setPrototypeOf((0, _assertThisInitialized2["default"])(_this5), (this instanceof SameOriginForbiddenError ? this.constructor : void 0).prototype); // restore prototype chain

    _this5.name = SameOriginForbiddenError.name; // stack traces display correctly now

    return _this5;
  }

  return SameOriginForbiddenError;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

exports.SameOriginForbiddenError = SameOriginForbiddenError;

var NotFoundError = /*#__PURE__*/function (_Error4) {
  (0, _inherits2["default"])(NotFoundError, _Error4);

  var _super4 = _createSuper(NotFoundError);

  function NotFoundError(preferencesFile, message) {
    var _this6;

    (0, _classCallCheck2["default"])(this, NotFoundError);
    _this6 = _super4.call(this, message); // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html

    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this6), "preferencesFile", void 0);
    Object.setPrototypeOf((0, _assertThisInitialized2["default"])(_this6), (this instanceof NotFoundError ? this.constructor : void 0).prototype); // restore prototype chain

    _this6.name = NotFoundError.name; // stack traces display correctly now

    _this6.preferencesFile = preferencesFile;
    return _this6;
  }

  return NotFoundError;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

exports.NotFoundError = NotFoundError;

var FetchError = /*#__PURE__*/function (_Error5) {
  (0, _inherits2["default"])(FetchError, _Error5);

  var _super5 = _createSuper(FetchError);

  function FetchError(status, message) {
    var _this7;

    (0, _classCallCheck2["default"])(this, FetchError);
    _this7 = _super5.call(this, message); // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html

    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this7), "status", void 0);
    Object.setPrototypeOf((0, _assertThisInitialized2["default"])(_this7), (this instanceof FetchError ? this.constructor : void 0).prototype); // restore prototype chain

    _this7.name = FetchError.name; // stack traces display correctly now

    _this7.status = status;
    return _this7;
  }

  return FetchError;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));

exports.FetchError = FetchError;
//# sourceMappingURL=solid-logic-move-me.js.map