"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddAgentButtons = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var debug = _interopRequireWildcard(require("../debug"));

var _iconBase = require("../iconBase");

var _login = require("../login/login");

var ns = _interopRequireWildcard(require("../ns"));

var utils = _interopRequireWildcard(require("../utils"));

var widgets = _interopRequireWildcard(require("../widgets"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Contains the [[AddAgentButtons]] class
 * @packageDocumentation
 */

/**
 * Renders the Sharing pane's "+" button and the menus behind it,
 * see https://github.com/solid/userguide/blob/main/views/sharing/userguide.md#add
 */
var AddAgentButtons = /*#__PURE__*/function () {
  function AddAgentButtons(groupList) {
    (0, _classCallCheck2["default"])(this, AddAgentButtons);
    this.groupList = groupList;
    (0, _defineProperty2["default"])(this, "rootElement", void 0);
    (0, _defineProperty2["default"])(this, "barElement", void 0);
    (0, _defineProperty2["default"])(this, "isExpanded", false);
    this.rootElement = groupList.controller.dom.createElement('div');
    this.barElement = groupList.controller.dom.createElement('div');
  }

  (0, _createClass2["default"])(AddAgentButtons, [{
    key: "render",
    value: function render() {
      this.rootElement.innerHTML = '';
      this.rootElement.appendChild(this.renderAddButton());
      this.rootElement.appendChild(this.barElement);
      return this.rootElement;
    }
  }, {
    key: "renderAddButton",
    value: function renderAddButton() {
      var _this = this;

      return widgets.button(this.groupList.controller.dom, "".concat(_iconBase.icons.iconBase, "noun_34653_green.svg"), 'Add ...', function () {
        _this.toggleBar();

        _this.renderBar();
      });
    }
  }, {
    key: "renderBar",
    value: function renderBar() {
      this.barElement.innerHTML = '';

      if (!this.isExpanded) {
        return;
      }

      this.barElement.appendChild(this.renderPersonButton());
      this.barElement.appendChild(this.renderGroupButton());
      this.barElement.appendChild(this.renderPublicButton());
      this.barElement.appendChild(this.renderAuthenticatedAgentButton());
      this.barElement.appendChild(this.renderBotButton());
      this.barElement.appendChild(this.renderAppsButton());
    }
  }, {
    key: "renderSimplifiedBar",
    value: function renderSimplifiedBar(button) {
      var _this2 = this;

      Array.from(this.barElement.children).filter(function (element) {
        return element !== button;
      }).forEach(function (element) {
        return _this2.barElement.removeChild(element);
      });
    }
  }, {
    key: "renderPersonButton",
    value: function renderPersonButton() {
      var _this3 = this;

      return widgets.button(this.groupList.controller.dom, _iconBase.icons.iconBase + widgets.iconForClass['vcard:Individual'], 'Add Person', function (event) {
        _this3.renderSimplifiedBar(event.target);

        _this3.renderNameForm(ns.vcard('Individual'), 'person').then(function (name) {
          return _this3.addPerson(name);
        }).then(function () {
          return _this3.renderCleanup();
        })["catch"](function (error) {
          return _this3.groupList.controller.renderStatus(error);
        });
      });
    }
  }, {
    key: "renderGroupButton",
    value: function renderGroupButton() {
      var _this4 = this;

      return widgets.button(this.groupList.controller.dom, _iconBase.icons.iconBase + widgets.iconForClass['vcard:Group'], 'Add Group', function (event) {
        _this4.renderSimplifiedBar(event.target);

        _this4.renderNameForm(ns.vcard('Group'), 'group').then(function (name) {
          return _this4.addGroup(name);
        }).then(function () {
          return _this4.renderCleanup();
        })["catch"](function (error) {
          return _this4.groupList.controller.renderStatus(error);
        });
      });
    }
  }, {
    key: "renderNameForm",
    value: function renderNameForm(type, noun) {
      return widgets.askName(this.groupList.controller.dom, this.groupList.store, this.barElement, ns.vcard('URI'), type, noun);
    }
  }, {
    key: "renderPublicButton",
    value: function renderPublicButton() {
      var _this5 = this;

      return widgets.button(this.groupList.controller.dom, _iconBase.icons.iconBase + widgets.iconForClass['foaf:Agent'], 'Add Everyone', function () {
        return _this5.addAgent(ns.foaf('Agent').uri).then(function () {
          return _this5.groupList.controller.renderTemporaryStatus('Adding the general public to those who can read. Drag the globe to a different level to give them more access.');
        }).then(function () {
          return _this5.renderCleanup();
        });
      });
    }
  }, {
    key: "renderAuthenticatedAgentButton",
    value: function renderAuthenticatedAgentButton() {
      var _this6 = this;

      return widgets.button(this.groupList.controller.dom, "".concat(_iconBase.icons.iconBase, "noun_99101.svg"), 'Anyone logged In', function () {
        return _this6.addAgent(ns.acl('AuthenticatedAgent').uri).then(function () {
          return _this6.groupList.controller.renderTemporaryStatus('Adding anyone logged in to those who can read. Drag the ID icon to a different level to give them more access.');
        }).then(function () {
          return _this6.renderCleanup();
        });
      });
    }
  }, {
    key: "renderBotButton",
    value: function renderBotButton() {
      var _this7 = this;

      return widgets.button(this.groupList.controller.dom, _iconBase.icons.iconBase + 'noun_Robot_849764.svg', 'A Software Agent (bot)', function (event) {
        _this7.renderSimplifiedBar(event.target);

        _this7.renderNameForm(ns.schema('Application'), 'bot').then(function (name) {
          return _this7.addBot(name);
        }).then(function () {
          return _this7.renderCleanup();
        });
      });
    }
  }, {
    key: "renderAppsButton",
    value: function renderAppsButton() {
      var _this8 = this;

      return widgets.button(this.groupList.controller.dom, "".concat(_iconBase.icons.iconBase, "noun_15177.svg"), 'A Web App (origin)', function (event) {
        _this8.renderSimplifiedBar(event.target);

        var eventContext = {
          div: _this8.barElement,
          dom: _this8.groupList.controller.dom
        };

        var existingApps = _this8.renderAppsTable(eventContext)["catch"](function (error) {
          return _this8.groupList.controller.renderStatus(error);
        });

        _this8.renderAppsView();

        var newApp = _this8.renderNameForm(ns.schema('WebApplication'), 'webapp domain').then(function (name) {
          return _this8.getOriginFromName(name);
        });

        Promise.race([existingApps, newApp]).then(function (origin) {
          if (origin) {
            _this8.groupList.addNewURI(origin);
          }
        }).then(function () {
          return _this8.renderCleanup();
        });
      });
    }
  }, {
    key: "renderAppsView",
    value: function renderAppsView() {
      var _this9 = this;

      var trustedApplications = this.groupList.controller.context.session.paneRegistry.byName('trustedApplications');

      if (trustedApplications) {
        var trustedApplicationsElement = trustedApplications.render(null, this.groupList.controller.context);
        trustedApplicationsElement.classList.add(this.groupList.controller.classes.trustedAppController);
        var cancelButton = widgets.cancelButton(this.groupList.controller.dom, function () {
          return _this9.renderCleanup();
        });
        cancelButton.classList.add(this.groupList.controller.classes.trustedAppCancelButton);
        trustedApplicationsElement.insertBefore(cancelButton, trustedApplicationsElement.firstChild);
        this.barElement.appendChild(trustedApplicationsElement);
      }
    }
  }, {
    key: "renderAppsTable",
    value: function () {
      var _renderAppsTable = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(eventContext) {
        var _this10 = this;

        var trustedApps, trustedOrigins;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _login.ensureLoadedProfile)(eventContext);

              case 2:
                trustedApps = this.groupList.store.each(eventContext.me, ns.acl('trustedApp')); // @@ TODO fix as

                trustedOrigins = trustedApps.flatMap(function (app) {
                  return _this10.groupList.store.each(app, ns.acl('origin'));
                }); // @@ TODO fix as

                this.barElement.appendChild(this.groupList.controller.dom.createElement('p')).textContent = "You have ".concat(trustedOrigins.length, " selected web apps.");
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  var appsTable = _this10.barElement.appendChild(_this10.groupList.controller.dom.createElement('table'));

                  appsTable.classList.add(_this10.groupList.controller.classes.trustedAppAddApplicationsTable);
                  trustedApps.forEach(function (app) {
                    var origin = _this10.groupList.store.any(app, ns.acl('origin')); // @@ TODO fix as


                    // @@ TODO fix as
                    if (!origin) {
                      reject(new Error("Unable to pick app: ".concat(app.value)));
                    }

                    var thingTR = widgets.personTR(_this10.groupList.controller.dom, ns.acl('origin'), origin, {});

                    var innerTable = _this10.groupList.controller.dom.createElement('table');

                    var innerRow = innerTable.appendChild(_this10.groupList.controller.dom.createElement('tr'));
                    var innerLeftColumn = innerRow.appendChild(_this10.groupList.controller.dom.createElement('td'));
                    innerLeftColumn.appendChild(thingTR);
                    var innerMiddleColumn = innerRow.appendChild(_this10.groupList.controller.dom.createElement('td'));
                    innerMiddleColumn.textContent = "Give access to ".concat(_this10.groupList.controller.noun, " ").concat(utils.label(_this10.groupList.controller.subject), "?");
                    var innerRightColumn = innerRow.appendChild(_this10.groupList.controller.dom.createElement('td'));
                    innerRightColumn.appendChild(widgets.continueButton(_this10.groupList.controller.dom, function () {
                      return resolve(origin.value);
                    }));
                    appsTable.appendChild(innerTable);
                  });
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function renderAppsTable(_x) {
        return _renderAppsTable.apply(this, arguments);
      }

      return renderAppsTable;
    }()
  }, {
    key: "renderCleanup",
    value: function renderCleanup() {
      this.renderBar();
      this.groupList.render();
    }
  }, {
    key: "addPerson",
    value: function () {
      var _addPerson = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(name) {
        var domainNameRegexp;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (name) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", this.toggleBar());

              case 2:
                // user cancelled
                domainNameRegexp = /^https?:/i;

                if (name.match(domainNameRegexp)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", Promise.reject(new Error('Not a http URI')));

              case 5:
                // @@ check it actually is a person and has an owner who agrees they own it
                debug.log("Adding to ACL person: ".concat(name));
                _context2.next = 8;
                return this.groupList.addNewURI(name);

              case 8:
                this.toggleBar();

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addPerson(_x2) {
        return _addPerson.apply(this, arguments);
      }

      return addPerson;
    }()
  }, {
    key: "addGroup",
    value: function () {
      var _addGroup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(name) {
        var domainNameRegexp;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (name) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", this.toggleBar());

              case 2:
                // user cancelled
                domainNameRegexp = /^https?:/i;

                if (name.match(domainNameRegexp)) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", Promise.reject(new Error('Not a http URI')));

              case 5:
                // @@ check it actually is a group and has an owner who agrees they own it
                debug.log('Adding to ACL group: ' + name);
                _context3.next = 8;
                return this.groupList.addNewURI(name);

              case 8:
                this.toggleBar();

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addGroup(_x3) {
        return _addGroup.apply(this, arguments);
      }

      return addGroup;
    }()
  }, {
    key: "addAgent",
    value: function () {
      var _addAgent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(agentUri) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.groupList.addNewURI(agentUri);

              case 2:
                this.toggleBar();

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function addAgent(_x4) {
        return _addAgent.apply(this, arguments);
      }

      return addAgent;
    }()
  }, {
    key: "addBot",
    value: function () {
      var _addBot = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(name) {
        var domainNameRegexp;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (name) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", this.toggleBar());

              case 2:
                // user cancelled
                domainNameRegexp = /^https?:/i;

                if (name.match(domainNameRegexp)) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return", Promise.reject(new Error('Not a http URI')));

              case 5:
                // @@ check it actually is a bot and has an owner who agrees they own it
                debug.log('Adding to ACL bot: ' + name);
                _context5.next = 8;
                return this.groupList.addNewURI(name);

              case 8:
                this.toggleBar();

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addBot(_x5) {
        return _addBot.apply(this, arguments);
      }

      return addBot;
    }()
  }, {
    key: "getOriginFromName",
    value: function () {
      var _getOriginFromName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(name) {
        var domainNameRegexp, origin;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (name) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", Promise.resolve());

              case 2:
                // user cancelled
                domainNameRegexp = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i; // https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch08s15.html

                if (name.match(domainNameRegexp)) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt("return", Promise.reject(new Error('Not a domain name')));

              case 5:
                origin = 'https://' + name;
                debug.log('Adding to ACL origin: ' + origin);
                this.toggleBar();
                return _context6.abrupt("return", origin);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getOriginFromName(_x6) {
        return _getOriginFromName.apply(this, arguments);
      }

      return getOriginFromName;
    }()
  }, {
    key: "toggleBar",
    value: function toggleBar() {
      this.isExpanded = !this.isExpanded;
    }
  }]);
  return AddAgentButtons;
}();

exports.AddAgentButtons = AddAgentButtons;
//# sourceMappingURL=add-agent-buttons.js.map