"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _acl = require("./acl");
var _rdflib = require("rdflib");
var _accessGroups = require("./access-groups");
var _aclControl = require("./acl-control");
var utils = _interopRequireWildcard(require("../utils"));
var debug = _interopRequireWildcard(require("../debug"));
var style = _interopRequireWildcard(require("../style"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t5 in e) "default" !== _t5 && {}.hasOwnProperty.call(e, _t5) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t5)) && (i.get || i.set) ? o(f, _t5, i) : f[_t5] = e[_t5]); return f; })(e, t); }
/**
 * Contains the [[AccessController]] class
 * @packageDocumentation
 */
/**
 * Rendered HTML component used in the databrowser's Sharing pane.
 */
var AccessController = exports.AccessController = /*#__PURE__*/function () {
  function AccessController(subject, noun, context, statusElement, targetIsProtected, targetDoc, targetACLDoc, defaultHolder, defaultACLDoc, prospectiveDefaultHolder, store, dom) {
    (0, _classCallCheck2["default"])(this, AccessController);
    this.subject = subject;
    this.noun = noun;
    this.context = context;
    this.statusElement = statusElement;
    this.targetIsProtected = targetIsProtected;
    this.targetDoc = targetDoc;
    this.targetACLDoc = targetACLDoc;
    this.defaultHolder = defaultHolder;
    this.defaultACLDoc = defaultACLDoc;
    this.prospectiveDefaultHolder = prospectiveDefaultHolder;
    this.store = store;
    this.dom = dom;
    (0, _defineProperty2["default"])(this, "mainCombo", void 0);
    (0, _defineProperty2["default"])(this, "defaultsCombo", void 0);
    (0, _defineProperty2["default"])(this, "isContainer", void 0);
    (0, _defineProperty2["default"])(this, "defaultsDiffer", void 0);
    (0, _defineProperty2["default"])(this, "rootElement", void 0);
    (0, _defineProperty2["default"])(this, "isUsingDefaults", void 0);
    this.rootElement = dom.createElement('div');
    this.rootElement.setAttribute('style', style.aclGroupContent);
    this.isContainer = targetDoc.uri.slice(-1) === '/'; // Give default for all directories
    if (defaultHolder && defaultACLDoc) {
      this.isUsingDefaults = true;
      var aclDefaultStore = (0, _acl.adoptACLDefault)(this.targetDoc, targetACLDoc, defaultHolder, defaultACLDoc);
      this.mainCombo = new _accessGroups.AccessGroups(targetDoc, targetACLDoc, this, aclDefaultStore, {
        defaults: this.isContainer
      });
      this.defaultsCombo = null;
      this.defaultsDiffer = false;
    } else {
      this.isUsingDefaults = false;
      this.mainCombo = new _accessGroups.AccessGroups(targetDoc, targetACLDoc, this, store);
      this.defaultsCombo = new _accessGroups.AccessGroups(targetDoc, targetACLDoc, this, store, {
        defaults: this.isContainer
      });
      this.defaultsDiffer = !(0, _acl.sameACL)(this.mainCombo.aclMap, this.defaultsCombo.aclMap);
    }
  }
  return (0, _createClass2["default"])(AccessController, [{
    key: "isEditable",
    get: function get() {
      return !this.isUsingDefaults;
    }
  }, {
    key: "render",
    value: function render() {
      this.rootElement.innerHTML = '';
      if (this.isUsingDefaults) {
        this.renderStatus("The sharing for this ".concat(this.noun, " is the default for folder "));
        if (this.defaultHolder) {
          var defaultHolderLink = this.statusElement.appendChild(this.dom.createElement('a'));
          defaultHolderLink.href = this.defaultHolder.uri;
          defaultHolderLink.innerText = (0, _aclControl.shortNameForFolder)(this.defaultHolder);
        }
      } else if (!this.defaultsDiffer && this.isContainer) {
        this.renderStatus('This is also the default for things in this folder.');
      } else {
        this.renderStatus('');
      }
      this.rootElement.appendChild(this.mainCombo.render());
      if (this.defaultsCombo && this.defaultsDiffer) {
        this.rootElement.appendChild(this.renderRemoveDefaultsController());
        this.rootElement.appendChild(this.defaultsCombo.render());
      } else if (this.isEditable && this.isContainer) {
        this.rootElement.appendChild(this.renderAddDefaultsController());
      }
      if (!this.targetIsProtected && this.isUsingDefaults) {
        this.rootElement.appendChild(this.renderAddAclsController());
      } else if (!this.targetIsProtected) {
        this.rootElement.appendChild(this.renderRemoveAclsController());
      }
      return this.rootElement;
    }
  }, {
    key: "renderRemoveAclsController",
    value: function renderRemoveAclsController() {
      var _this = this;
      var useDefaultButton = this.dom.createElement('button');
      useDefaultButton.innerText = "Remove custom sharing settings for this ".concat(this.noun, " -- just use default").concat(this.prospectiveDefaultHolder ? " for ".concat(utils.label(this.prospectiveDefaultHolder)) : '');
      useDefaultButton.setAttribute('style', style.bigButton);
      useDefaultButton.addEventListener('click', function () {
        return _this.removeAcls().then(function () {
          return _this.render();
        })["catch"](function (error) {
          return _this.renderStatus(error);
        });
      });
      return useDefaultButton;
    }
  }, {
    key: "renderAddAclsController",
    value: function renderAddAclsController() {
      var _this2 = this;
      var addAclButton = this.dom.createElement('button');
      addAclButton.innerText = "Set specific sharing for this ".concat(this.noun);
      addAclButton.setAttribute('style', style.bigButton);
      addAclButton.addEventListener('click', function () {
        return _this2.addAcls().then(function () {
          return _this2.render();
        })["catch"](function (error) {
          return _this2.renderStatus(error);
        });
      });
      return addAclButton;
    }
  }, {
    key: "renderAddDefaultsController",
    value: function renderAddDefaultsController() {
      var _this3 = this;
      var containerElement = this.dom.createElement('div');
      containerElement.setAttribute('style', style.defaultsController);
      var noticeElement = containerElement.appendChild(this.dom.createElement('div'));
      noticeElement.innerText = 'Sharing for things within the folder currently tracks sharing for the folder.';
      noticeElement.setAttribute('style', style.defaultsControllerNotice);
      var button = containerElement.appendChild(this.dom.createElement('button'));
      button.innerText = 'Set the sharing of folder contents separately from the sharing for the folder';
      button.setAttribute('style', style.bigButton);
      button.addEventListener('click', function () {
        return _this3.addDefaults().then(function () {
          return _this3.render();
        });
      });
      return containerElement;
    }
  }, {
    key: "renderRemoveDefaultsController",
    value: function renderRemoveDefaultsController() {
      var _this4 = this;
      var containerElement = this.dom.createElement('div');
      containerElement.setAttribute('style', style.defaultsController);
      var noticeElement = containerElement.appendChild(this.dom.createElement('div'));
      noticeElement.innerText = 'Access to things within this folder:';
      noticeElement.setAttribute('style', style.defaultsControllerNotice);
      var button = containerElement.appendChild(this.dom.createElement('button'));
      button.innerText = 'Set default for folder contents to just track the sharing for the folder';
      button.setAttribute('style', style.bigButton);
      button.addEventListener('click', function () {
        return _this4.removeDefaults().then(function () {
          return _this4.render();
        })["catch"](function (error) {
          return _this4.renderStatus(error);
        });
      });
      return containerElement;
    }
  }, {
    key: "renderTemporaryStatus",
    value: function renderTemporaryStatus(message) {
      var _this5 = this;
      // @@ TODO Introduce better system for error notification to user https://github.com/solidos/mashlib/issues/87
      this.statusElement.setAttribute('style', style.aclControlBoxStatusRevealed);
      this.statusElement.innerText = message;
      this.statusElement.setAttribute('style', style.temporaryStatusInit);
      setTimeout(function () {
        _this5.statusElement.setAttribute('style', style.temporaryStatusEnd);
      });
      setTimeout(function () {
        _this5.statusElement.innerText = '';
      }, 5000);
    }
  }, {
    key: "renderStatus",
    value: function renderStatus(message) {
      // @@ TODO Introduce better system for error notification to user https://github.com/solidos/mashlib/issues/87
      if (!message) {
        this.statusElement.setAttribute('style', style.aclControlBoxStatusRevealed);
      }
      this.statusElement.innerText = message;
    }
  }, {
    key: "addAcls",
    value: function () {
      var _addAcls = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var _this6 = this;
        var message, aclGraph, _message, _t;
        return _regenerator["default"].wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.defaultHolder || !this.defaultACLDoc)) {
                _context.next = 1;
                break;
              }
              message = 'Unable to find defaults to copy';
              debug.error(message);
              return _context.abrupt("return", Promise.reject(message));
            case 1:
              aclGraph = (0, _acl.adoptACLDefault)(this.targetDoc, this.targetACLDoc, this.defaultHolder, this.defaultACLDoc);
              aclGraph.statements.forEach(function (st) {
                return _this6.store.add(st.subject, st.predicate, st.object, _this6.targetACLDoc);
              });
              _context.prev = 2;
              _context.next = 3;
              return this.store.fetcher.putBack(this.targetACLDoc);
            case 3:
              this.isUsingDefaults = false;
              return _context.abrupt("return", Promise.resolve());
            case 4:
              _context.prev = 4;
              _t = _context["catch"](2);
              _message = " Error writing back access control file! ".concat(_t);
              debug.error(_message);
              return _context.abrupt("return", Promise.reject(_message));
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[2, 4]]);
      }));
      function addAcls() {
        return _addAcls.apply(this, arguments);
      }
      return addAcls;
    }()
  }, {
    key: "addDefaults",
    value: function () {
      var _addDefaults = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              this.defaultsCombo = new _accessGroups.AccessGroups(this.targetDoc, this.targetACLDoc, this, this.store, {
                defaults: true
              });
              this.defaultsDiffer = true;
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function addDefaults() {
        return _addDefaults.apply(this, arguments);
      }
      return addDefaults;
    }()
  }, {
    key: "removeAcls",
    value: function () {
      var _removeAcls = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var message, _t2, _t3;
        return _regenerator["default"].wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 1;
              return this.store.fetcher["delete"](this.targetACLDoc.uri, {});
            case 1:
              this.isUsingDefaults = true;
              _context3.prev = 2;
              _context3.next = 3;
              return (0, _acl.getProspectiveHolder)(this.targetDoc.uri);
            case 3:
              this.prospectiveDefaultHolder = _context3.sent;
              _context3.next = 5;
              break;
            case 4:
              _context3.prev = 4;
              _t2 = _context3["catch"](2);
              // No need to show this error in status, but good to warn about it in console
              debug.warn(_t2);
            case 5:
              _context3.next = 7;
              break;
            case 6:
              _context3.prev = 6;
              _t3 = _context3["catch"](0);
              message = "Error deleting access control file: ".concat(this.targetACLDoc, ": ").concat(_t3);
              debug.error(message);
              return _context3.abrupt("return", Promise.reject(message));
            case 7:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 6], [2, 4]]);
      }));
      function removeAcls() {
        return _removeAcls.apply(this, arguments);
      }
      return removeAcls;
    }()
  }, {
    key: "removeDefaults",
    value: function () {
      var _removeDefaults = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var fallbackCombo, _t4;
        return _regenerator["default"].wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              fallbackCombo = this.defaultsCombo;
              _context4.prev = 1;
              this.defaultsCombo = null;
              this.defaultsDiffer = false;
              _context4.next = 2;
              return this.save();
            case 2:
              _context4.next = 4;
              break;
            case 3:
              _context4.prev = 3;
              _t4 = _context4["catch"](1);
              this.defaultsCombo = fallbackCombo;
              this.defaultsDiffer = true;
              debug.error(_t4);
              return _context4.abrupt("return", Promise.reject(_t4));
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function removeDefaults() {
        return _removeDefaults.apply(this, arguments);
      }
      return removeDefaults;
    }()
  }, {
    key: "save",
    value: function save() {
      var _this7 = this;
      // build graph
      var newAClGraph = (0, _rdflib.graph)();
      if (!this.isContainer) {
        (0, _acl.makeACLGraphbyCombo)(newAClGraph, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, true);
      } else if (this.defaultsCombo && this.defaultsDiffer) {
        // Pair of controls
        (0, _acl.makeACLGraphbyCombo)(newAClGraph, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, true);
        (0, _acl.makeACLGraphbyCombo)(newAClGraph, this.targetDoc, this.defaultsCombo.byCombo, this.targetACLDoc, false, true);
      } else {
        // Linked controls
        (0, _acl.makeACLGraphbyCombo)(newAClGraph, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, true, true);
      }

      // add authenticated fetcher
      newAClGraph.fetcher = (0, _rdflib.fetcher)(newAClGraph, {
        fetch: this.store.fetcher._fetch
      });
      var updater = newAClGraph.updater || new _rdflib.UpdateManager(newAClGraph);

      // save ACL resource
      return new Promise(function (resolve, reject) {
        updater.put(_this7.targetACLDoc, newAClGraph.statementsMatching(undefined, undefined, undefined, _this7.targetACLDoc), 'text/turtle', function (uri, ok, message) {
          if (!ok) {
            return reject(new Error("ACL file save failed: ".concat(message)));
          }
          _this7.store.fetcher.unload(_this7.targetACLDoc);
          _this7.store.add(newAClGraph.statements);
          _this7.store.fetcher.requested[_this7.targetACLDoc.uri] = 'done'; // missing: save headers
          _this7.mainCombo.store = _this7.store;
          if (_this7.defaultsCombo) {
            _this7.defaultsCombo.store = _this7.store;
          }
          _this7.defaultsDiffer = !!_this7.defaultsCombo && !(0, _acl.sameACL)(_this7.mainCombo.aclMap, _this7.defaultsCombo.aclMap);
          debug.log('ACL modification: success!');
          resolve();
        });
      });
    }
  }]);
}();
//# sourceMappingURL=access-controller.js.map