"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

var _utils = _interopRequireDefault(require("../utils.js"));

/**
 * Contains the [[AccessController]] class
 * @packageDocumentation
 */

/**
 * Rendered HTML component used in the databrowser's Sharing pane.
 */
var AccessController =
/*#__PURE__*/
function () {
  function AccessController(subject, noun, context, statusElement, classes, targetIsProtected, targetDoc, targetACLDoc, defaultHolder, defaultACLDoc, prospectiveDefaultHolder, store, dom) {
    (0, _classCallCheck2["default"])(this, AccessController);
    this.subject = subject;
    this.noun = noun;
    this.context = context;
    this.statusElement = statusElement;
    this.classes = classes;
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
    this.rootElement.classList.add(classes.aclGroupContent);
    this.isContainer = targetDoc.uri.slice(-1) === '/'; // Give default for all directories

    if (defaultHolder && defaultACLDoc) {
      this.isUsingDefaults = true;
      var aclDefaultStore = (0, _acl.adoptACLDefault)(this.targetDoc, targetACLDoc, defaultHolder, defaultACLDoc);
      this.mainCombo = new _accessGroups.AccessGroups(targetDoc, targetACLDoc, this, aclDefaultStore, {
        defaults: true
      });
      this.defaultsCombo = null;
      this.defaultsDiffer = false;
    } else {
      this.isUsingDefaults = false;
      this.mainCombo = new _accessGroups.AccessGroups(targetDoc, targetACLDoc, this, store);
      this.defaultsCombo = new _accessGroups.AccessGroups(targetDoc, targetACLDoc, this, store, {
        defaults: true
      });
      this.defaultsDiffer = !(0, _acl.sameACL)(this.mainCombo.aclMap, this.defaultsCombo.aclMap);
    }
  }

  (0, _createClass2["default"])(AccessController, [{
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
      } else if (!this.defaultsDiffer) {
        this.renderStatus('This is also the default for things in this folder.');
      } else {
        this.renderStatus('');
      }

      this.rootElement.appendChild(this.mainCombo.render());

      if (this.defaultsCombo && this.defaultsDiffer) {
        this.rootElement.appendChild(this.renderRemoveDefaultsController());
        this.rootElement.appendChild(this.defaultsCombo.render());
      } else if (this.isEditable) {
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
      useDefaultButton.innerText = "Remove custom sharing settings for this ".concat(this.noun, " -- just use default").concat(this.prospectiveDefaultHolder ? " for ".concat(_utils["default"].label(this.prospectiveDefaultHolder)) : '');
      useDefaultButton.classList.add(this.classes.bigButton);
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
      addAclButton.classList.add(this.classes.bigButton);
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
      containerElement.classList.add(this.classes.defaultsController);
      var noticeElement = containerElement.appendChild(this.dom.createElement('div'));
      noticeElement.innerText = 'Sharing for things within the folder currently tracks sharing for the folder.';
      noticeElement.classList.add(this.classes.defaultsControllerNotice);
      var button = containerElement.appendChild(this.dom.createElement('button'));
      button.innerText = 'Set the sharing of folder contents separately from the sharing for the folder';
      button.classList.add(this.classes.bigButton);
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
      containerElement.classList.add(this.classes.defaultsController);
      var noticeElement = containerElement.appendChild(this.dom.createElement('div'));
      noticeElement.innerText = 'Access to things within this folder:';
      noticeElement.classList.add(this.classes.defaultsControllerNotice);
      var button = containerElement.appendChild(this.dom.createElement('button'));
      button.innerText = 'Set default for folder contents to just track the sharing for the folder';
      button.classList.add(this.classes.bigButton);
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

      // @@ TODO Introduce better system for error notification to user https://github.com/solid/mashlib/issues/87
      this.statusElement.classList.add(this.classes.aclControlBoxStatusRevealed);
      this.statusElement.innerText = message;
      this.statusElement.classList.add(this.classes.temporaryStatusInit);
      setTimeout(function () {
        _this5.statusElement.classList.add(_this5.classes.temporaryStatusEnd);
      });
      setTimeout(function () {
        _this5.statusElement.innerText = '';
      }, 5000);
    }
  }, {
    key: "renderStatus",
    value: function renderStatus(message) {
      // @@ TODO Introduce better system for error notification to user https://github.com/solid/mashlib/issues/87
      this.statusElement.classList.toggle(this.classes.aclControlBoxStatusRevealed, !!message);
      this.statusElement.innerText = message;
    }
  }, {
    key: "addAcls",
    value: function () {
      var _addAcls = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var _this6 = this;

        var message, aclGraph, _message;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this.defaultHolder || !this.defaultACLDoc)) {
                  _context.next = 4;
                  break;
                }

                message = 'Unable to find defaults to copy';
                console.error(message);
                return _context.abrupt("return", Promise.reject(message));

              case 4:
                aclGraph = (0, _acl.adoptACLDefault)(this.targetDoc, this.targetACLDoc, this.defaultHolder, this.defaultACLDoc);
                aclGraph.statements.forEach(function (st) {
                  return _this6.store.add(st.subject, st.predicate, st.object, _this6.targetACLDoc);
                });
                _context.prev = 6;
                _context.next = 9;
                return this.store.fetcher.putBack(this.targetACLDoc);

              case 9:
                this.isUsingDefaults = false;
                return _context.abrupt("return", Promise.resolve());

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](6);
                _message = " Error writing back access control file! ".concat(_context.t0);
                console.error(_message);
                return _context.abrupt("return", Promise.reject(_message));

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 13]]);
      }));

      function addAcls() {
        return _addAcls.apply(this, arguments);
      }

      return addAcls;
    }()
  }, {
    key: "addDefaults",
    value: function () {
      var _addDefaults = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.defaultsCombo = new _accessGroups.AccessGroups(this.targetDoc, this.targetACLDoc, this, this.store, {
                  defaults: true
                });
                this.defaultsDiffer = true;

              case 2:
              case "end":
                return _context2.stop();
            }
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
      var _removeAcls = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        var message;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.store.fetcher["delete"](this.targetACLDoc.uri, {});

              case 3:
                this.isUsingDefaults = true;
                _context3.prev = 4;
                _context3.next = 7;
                return (0, _acl.getProspectiveHolder)(this.targetDoc.uri);

              case 7:
                this.prospectiveDefaultHolder = _context3.sent;
                _context3.next = 13;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](4);
                // No need to show this error in status, but good to warn about it in console
                console.warn(_context3.t0);

              case 13:
                _context3.next = 20;
                break;

              case 15:
                _context3.prev = 15;
                _context3.t1 = _context3["catch"](0);
                message = "Error deleting access control file: ".concat(this.targetACLDoc, ": ").concat(_context3.t1);
                console.error(message);
                return _context3.abrupt("return", Promise.reject(message));

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 15], [4, 10]]);
      }));

      function removeAcls() {
        return _removeAcls.apply(this, arguments);
      }

      return removeAcls;
    }()
  }, {
    key: "removeDefaults",
    value: function () {
      var _removeDefaults = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4() {
        var fallbackCombo;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                fallbackCombo = this.defaultsCombo;
                _context4.prev = 1;
                this.defaultsCombo = null;
                this.defaultsDiffer = false;
                _context4.next = 6;
                return this.save();

              case 6:
                _context4.next = 14;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                this.defaultsCombo = fallbackCombo;
                this.defaultsDiffer = true;
                console.error(_context4.t0);
                return _context4.abrupt("return", Promise.reject(_context4.t0));

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 8]]);
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

      var updater = newAClGraph.updater || new _rdflib.UpdateManager(newAClGraph);
      return new Promise(function (resolve, reject) {
        return updater.put(_this7.targetACLDoc, newAClGraph.statementsMatching(undefined, undefined, undefined, _this7.targetACLDoc), 'text/turtle', function (uri, ok, message) {
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
          console.log('ACL modification: success!');
          resolve();
        });
      });
    }
  }, {
    key: "isEditable",
    get: function get() {
      return !this.isUsingDefaults;
    }
  }]);
  return AccessController;
}();

exports.AccessController = AccessController;
//# sourceMappingURL=access-controller.js.map