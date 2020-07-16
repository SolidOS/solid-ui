"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessGroups = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _rdflib = require("rdflib");

var _acl = require("./acl");

var _widgets = _interopRequireDefault(require("../widgets"));

var _ns = _interopRequireDefault(require("../ns"));

var _addAgentButtons = require("./add-agent-buttons");

var debug = _interopRequireWildcard(require("../debug"));

/**
 * Contains the [[AccessGroups]]
 * and [[AccessGroupsOptions]] classes
 * @packageDocumentation
 */
var ACL = _ns["default"].acl;
var COLLOQUIAL = {
  13: 'Owners',
  9: 'Owners (write locked)',
  5: 'Editors',
  3: 'Posters',
  2: 'Submitters',
  1: 'Viewers'
};
var RECOMMENDED = {
  13: true,
  5: true,
  3: true,
  2: true,
  1: true
};
var EXPLANATION = {
  13: 'can read, write, and control sharing.',
  9: 'can read and control sharing, currently write-locked.',
  5: 'can read and change information',
  3: 'can add new information, and read but not change existing information',
  2: 'can add new information but not read any',
  1: 'can read but not change information'
};
/**
 * Type for the options parameter of [[AccessGroups]]
 */

/**
 * Renders the table of Owners, Editors, Posters, Submitters, Viewers
 * for https://github.com/solid/userguide/blob/master/views/sharing/userguide.md
 */
var AccessGroups = /*#__PURE__*/function () {
  function AccessGroups(doc, aclDoc, controller, store) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    (0, _classCallCheck2["default"])(this, AccessGroups);
    this.doc = doc;
    this.aclDoc = aclDoc;
    this.controller = controller;
    this.options = options;
    (0, _defineProperty2["default"])(this, "defaults", void 0);
    (0, _defineProperty2["default"])(this, "byCombo", void 0);
    (0, _defineProperty2["default"])(this, "aclMap", void 0);
    (0, _defineProperty2["default"])(this, "addAgentButton", void 0);
    (0, _defineProperty2["default"])(this, "rootElement", void 0);
    (0, _defineProperty2["default"])(this, "_store", void 0);
    this.defaults = options.defaults || false;
    (0, _rdflib.fetcher)(store, {}); // The store will already have an updater at this point:
    // store.updater = new UpdateManager(store)

    this._store = store; // TODO hacky, find a better solution

    this.aclMap = (0, _acl.readACL)(doc, aclDoc, store, this.defaults);
    this.byCombo = (0, _acl.ACLbyCombination)(this.aclMap);
    this.addAgentButton = new _addAgentButtons.AddAgentButtons(this);
    this.rootElement = this.controller.dom.createElement('div');
    this.rootElement.classList.add(this.controller.classes.accessGroupList);
  }

  (0, _createClass2["default"])(AccessGroups, [{
    key: "render",
    value: function render() {
      var _this = this;

      this.rootElement.innerHTML = '';
      this.renderGroups().forEach(function (group) {
        return _this.rootElement.appendChild(group);
      });

      if (this.controller.isEditable) {
        this.rootElement.appendChild(this.addAgentButton.render());
      }

      return this.rootElement;
    }
  }, {
    key: "renderGroups",
    value: function renderGroups() {
      var groupElements = [];

      for (var comboIndex = 15; comboIndex > 0; comboIndex--) {
        var combo = kToCombo(comboIndex);

        if (this.controller.isEditable && RECOMMENDED[comboIndex] || this.byCombo[combo]) {
          groupElements.push(this.renderGroup(comboIndex, combo));
        }
      }

      return groupElements;
    }
  }, {
    key: "renderGroup",
    value: function renderGroup(comboIndex, combo) {
      var _this2 = this;

      var groupRow = this.controller.dom.createElement('div');
      groupRow.classList.add(this.controller.classes.accessGroupListItem);

      _widgets["default"].makeDropTarget(groupRow, function (uris) {
        return _this2.handleDroppedUris(uris, combo).then(function () {
          return _this2.controller.render();
        })["catch"](function (error) {
          return _this2.controller.renderStatus(error);
        });
      });

      var groupColumns = this.renderGroupElements(comboIndex, combo);
      groupColumns.forEach(function (column) {
        return groupRow.appendChild(column);
      });
      return groupRow;
    }
  }, {
    key: "renderGroupElements",
    value: function renderGroupElements(comboIndex, combo) {
      var _this3 = this;

      var groupNameColumn = this.controller.dom.createElement('div');
      groupNameColumn.classList.add(this.controller.classes.group);
      groupNameColumn.classList.toggle(this.controller.classes["group-".concat(comboIndex)], this.controller.isEditable);
      groupNameColumn.innerText = COLLOQUIAL[comboIndex] || ktToList(comboIndex);
      var groupAgentsColumn = this.controller.dom.createElement('div');
      groupAgentsColumn.classList.add(this.controller.classes.group);
      groupAgentsColumn.classList.toggle(this.controller.classes["group-".concat(comboIndex)], this.controller.isEditable);
      var groupAgentsTable = groupAgentsColumn.appendChild(this.controller.dom.createElement('table'));
      var combos = this.byCombo[combo] || [];
      combos.map(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            pred = _ref2[0],
            obj = _ref2[1];

        return _this3.renderAgent(groupAgentsTable, combo, pred, obj);
      }).forEach(function (agentElement) {
        return groupAgentsTable.appendChild(agentElement);
      });
      var groupDescriptionElement = this.controller.dom.createElement('div');
      groupDescriptionElement.classList.add(this.controller.classes.group);
      groupDescriptionElement.classList.toggle(this.controller.classes["group-".concat(comboIndex)], this.controller.isEditable);
      groupDescriptionElement.innerText = EXPLANATION[comboIndex] || 'Unusual combination';
      return [groupNameColumn, groupAgentsColumn, groupDescriptionElement];
    }
  }, {
    key: "renderAgent",
    value: function renderAgent(groupAgentsTable, combo, pred, obj) {
      var _this4 = this;

      var personRow = _widgets["default"].personTR(this.controller.dom, ACL(pred), (0, _rdflib.sym)(obj), this.controller.isEditable ? {
        deleteFunction: function deleteFunction() {
          return _this4.deleteAgent(combo, pred, obj).then(function () {
            return groupAgentsTable.removeChild(personRow);
          })["catch"](function (error) {
            return _this4.controller.renderStatus(error);
          });
        }
      } : {});

      return personRow;
    }
  }, {
    key: "deleteAgent",
    value: function () {
      var _deleteAgent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(combo, pred, obj) {
        var combos, comboToRemove;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                combos = this.byCombo[combo] || [];
                comboToRemove = combos.find(function (_ref3) {
                  var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
                      comboPred = _ref4[0],
                      comboObj = _ref4[1];

                  return comboPred === pred && comboObj === obj;
                });

                if (comboToRemove) {
                  combos.splice(combos.indexOf(comboToRemove), 1);
                }

                _context.next = 5;
                return this.controller.save();

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function deleteAgent(_x, _x2, _x3) {
        return _deleteAgent.apply(this, arguments);
      }

      return deleteAgent;
    }()
  }, {
    key: "addNewURI",
    value: function () {
      var _addNewURI = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(uri) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.handleDroppedUri(uri, kToCombo(1));

              case 2:
                _context2.next = 4;
                return this.controller.save();

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addNewURI(_x4) {
        return _addNewURI.apply(this, arguments);
      }

      return addNewURI;
    }()
  }, {
    key: "handleDroppedUris",
    value: function () {
      var _handleDroppedUris = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(uris, combo) {
        var _this5 = this;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return Promise.all(uris.map(function (uri) {
                  return _this5.handleDroppedUri(uri, combo);
                }));

              case 3:
                _context3.next = 5;
                return this.controller.save();

              case 5:
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", Promise.reject(_context3.t0));

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function handleDroppedUris(_x5, _x6) {
        return _handleDroppedUris.apply(this, arguments);
      }

      return handleDroppedUris;
    }()
  }, {
    key: "handleDroppedUri",
    value: function () {
      var _handleDroppedUri = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(uri, combo) {
        var secondAttempt,
            agent,
            thing,
            message,
            error,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                secondAttempt = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : false;
                agent = findAgent(uri, this.store); // eg 'agent', 'origin', agentClass'

                thing = (0, _rdflib.sym)(uri);

                if (!(!agent && !secondAttempt)) {
                  _context4.next = 18;
                  break;
                }

                debug.log("   Not obvious: looking up dropped thing ".concat(thing));
                _context4.prev = 5;
                _context4.next = 8;
                return this._store.fetcher.load(thing.doc());

              case 8:
                _context4.next = 15;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](5);
                message = "Ignore error looking up dropped thing: ".concat(_context4.t0);
                debug.error(message);
                return _context4.abrupt("return", Promise.reject(new Error(message)));

              case 15:
                return _context4.abrupt("return", this.handleDroppedUri(uri, combo, true));

              case 18:
                if (agent) {
                  _context4.next = 22;
                  break;
                }

                error = "   Error: Drop fails to drop appropriate thing! ".concat(uri);
                debug.error(error);
                return _context4.abrupt("return", Promise.reject(new Error(error)));

              case 22:
                this.setACLCombo(combo, uri, agent, this.controller.subject);

              case 23:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[5, 10]]);
      }));

      function handleDroppedUri(_x7, _x8) {
        return _handleDroppedUri.apply(this, arguments);
      }

      return handleDroppedUri;
    }()
  }, {
    key: "setACLCombo",
    value: function setACLCombo(combo, uri, res, subject) {
      if (!(combo in this.byCombo)) {
        this.byCombo[combo] = [];
      }

      this.removeAgentFromCombos(uri); // Combos are mutually distinct

      this.byCombo[combo].push([res.pred, res.obj.uri]);
      debug.log("ACL: setting access to ".concat(subject, " by ").concat(res.pred, ": ").concat(res.obj));
    }
  }, {
    key: "removeAgentFromCombos",
    value: function removeAgentFromCombos(uri) {
      for (var k = 0; k < 16; k++) {
        var combos = this.byCombo[kToCombo(k)];

        if (combos) {
          for (var i = 0; i < combos.length; i++) {
            while (i < combos.length && combos[i][1] === uri) {
              combos.splice(i, 1);
            }
          }
        }
      }
    }
  }, {
    key: "store",
    get: function get() {
      return this._store;
    },
    set: function set(store) {
      this._store = store;
      this.aclMap = (0, _acl.readACL)(this.doc, this.aclDoc, store, this.defaults);
      this.byCombo = (0, _acl.ACLbyCombination)(this.aclMap);
    }
  }]);
  return AccessGroups;
}();

exports.AccessGroups = AccessGroups;

function kToCombo(k) {
  var y = ['Read', 'Append', 'Write', 'Control'];
  var combo = [];

  for (var i = 0; i < 4; i++) {
    if (k & 1 << i) {
      combo.push('http://www.w3.org/ns/auth/acl#' + y[i]);
    }
  }

  combo.sort();
  return combo.join('\n');
}

function ktToList(k) {
  var list = '';
  var y = ['Read', 'Append', 'Write', 'Control'];

  for (var i = 0; i < 4; i++) {
    if (k & 1 << i) {
      list += y[i];
    }
  }

  return list;
}

function findAgent(uri, kb) {
  var obj = (0, _rdflib.sym)(uri);
  var types = kb.findTypeURIs(obj);

  for (var ty in types) {
    debug.log('    drop object type includes: ' + ty);
  } // An Origin URI is one like https://fred.github.io eith no trailing slash


  if (uri.startsWith('http') && uri.split('/').length === 3) {
    // there is no third slash
    return {
      pred: 'origin',
      obj: obj
    }; // The only way to know an origin alas
  } // @@ This is an almighty kludge needed because drag and drop adds extra slashes to origins


  if (uri.startsWith('http') && uri.split('/').length === 4 && uri.endsWith('/')) {
    // there  IS third slash
    debug.log('Assuming final slash on dragged origin URI was unintended!');
    return {
      pred: 'origin',
      obj: (0, _rdflib.sym)(uri.slice(0, -1))
    }; // Fix a URI where the drag and drop system has added a spurious slash
  }

  if (_ns["default"].vcard('WebID').uri in types) return {
    pred: 'agent',
    obj: obj
  };

  if (_ns["default"].vcard('Group').uri in types) {
    return {
      pred: 'agentGroup',
      obj: obj
    }; // @@ note vcard membership not RDFs
  }

  if (obj.sameTerm(_ns["default"].foaf('Agent')) || obj.sameTerm(_ns["default"].acl('AuthenticatedAgent')) || // AuthenticatedAgent
  obj.sameTerm(_ns["default"].rdf('Resource')) || obj.sameTerm(_ns["default"].owl('Thing'))) {
    return {
      pred: 'agentClass',
      obj: obj
    };
  }

  if (_ns["default"].vcard('Individual').uri in types || _ns["default"].foaf('Person').uri in types || _ns["default"].foaf('Agent').uri in types) {
    var pref = kb.any(obj, _ns["default"].foaf('preferredURI'));
    if (pref) return {
      pred: 'agent',
      obj: (0, _rdflib.sym)(pref)
    };
    return {
      pred: 'agent',
      obj: obj
    };
  }

  if (_ns["default"].solid('AppProvider').uri in types) {
    return {
      pred: 'origin',
      obj: obj
    };
  }

  if (_ns["default"].solid('AppProviderClass').uri in types) {
    return {
      pred: 'originClass',
      obj: obj
    };
  }

  debug.log('    Triage fails for ' + uri);
  return null;
}
//# sourceMappingURL=access-groups.js.map