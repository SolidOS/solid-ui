"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
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
var widgets = _interopRequireWildcard(require("../widgets"));
var ns = _interopRequireWildcard(require("../ns"));
var _addAgentButtons = require("./add-agent-buttons");
var debug = _interopRequireWildcard(require("../debug"));
var style = _interopRequireWildcard(require("../style"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * Contains the [[AccessGroups]]
 * and [[AccessGroupsOptions]] classes
 * @packageDocumentation
 */

var ACL = ns.acl;
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
 * for https://github.com/solidos/userguide/blob/main/views/sharing/userguide.md
 */
var AccessGroups = exports.AccessGroups = /*#__PURE__*/function () {
  // @@ was LiveStore but does not need to be connected to web

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
    this._store = store;
    this.aclMap = (0, _acl.readACL)(doc, aclDoc, store, this.defaults);
    this.byCombo = (0, _acl.ACLbyCombination)(this.aclMap);
    this.addAgentButton = new _addAgentButtons.AddAgentButtons(this);
    this.rootElement = this.controller.dom.createElement('div');
    this.rootElement.setAttribute('style', style.accessGroupList);
  }
  return (0, _createClass2["default"])(AccessGroups, [{
    key: "store",
    get: function get() {
      return this._store;
    },
    set: function set(store) {
      this._store = store;
      this.aclMap = (0, _acl.readACL)(this.doc, this.aclDoc, store, this.defaults);
      this.byCombo = (0, _acl.ACLbyCombination)(this.aclMap);
    }
  }, {
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
      groupRow.setAttribute('style', style.accessGroupListItem);
      widgets.makeDropTarget(groupRow, function (uris) {
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
      groupNameColumn.setAttribute('style', style.group);
      if (this.controller.isEditable) {
        switch (comboIndex) {
          case 1:
            groupNameColumn.setAttribute('style', style.group1);
            break;
          case 2:
            groupNameColumn.setAttribute('style', style.group2);
            break;
          case 3:
            groupNameColumn.setAttribute('style', style.group3);
            break;
          case 5:
            groupNameColumn.setAttribute('style', style.group5);
            break;
          case 9:
            groupNameColumn.setAttribute('style', style.group9);
            break;
          case 13:
            groupNameColumn.setAttribute('style', style.group13);
            break;
          default:
            groupNameColumn.setAttribute('style', style.group);
        }
      }
      groupNameColumn.innerText = COLLOQUIAL[comboIndex] || ktToList(comboIndex);
      var groupAgentsColumn = this.controller.dom.createElement('div');
      groupAgentsColumn.setAttribute('style', style.group);
      if (this.controller.isEditable) {
        switch (comboIndex) {
          case 1:
            groupAgentsColumn.setAttribute('style', style.group1);
            break;
          case 2:
            groupAgentsColumn.setAttribute('style', style.group2);
            break;
          case 3:
            groupAgentsColumn.setAttribute('style', style.group3);
            break;
          case 5:
            groupAgentsColumn.setAttribute('style', style.group5);
            break;
          case 9:
            groupAgentsColumn.setAttribute('style', style.group9);
            break;
          case 13:
            groupAgentsColumn.setAttribute('style', style.group13);
            break;
          default:
            groupAgentsColumn.setAttribute('style', style.group);
        }
      }
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
      groupDescriptionElement.setAttribute('style', style.group);
      if (this.controller.isEditable) {
        switch (comboIndex) {
          case 1:
            groupDescriptionElement.setAttribute('style', style.group1);
            break;
          case 2:
            groupDescriptionElement.setAttribute('style', style.group2);
            break;
          case 3:
            groupDescriptionElement.setAttribute('style', style.group3);
            break;
          case 5:
            groupDescriptionElement.setAttribute('style', style.group5);
            break;
          case 9:
            groupDescriptionElement.setAttribute('style', style.group9);
            break;
          case 13:
            groupDescriptionElement.setAttribute('style', style.group13);
            break;
          default:
            groupDescriptionElement.setAttribute('style', style.group);
        }
      }
      groupDescriptionElement.innerText = EXPLANATION[comboIndex] || 'Unusual combination';
      return [groupNameColumn, groupAgentsColumn, groupDescriptionElement];
    }
  }, {
    key: "renderAgent",
    value: function renderAgent(groupAgentsTable, combo, pred, obj) {
      var _this4 = this;
      var personRow = widgets.personTR(this.controller.dom, ACL(pred), (0, _rdflib.sym)(obj), this.controller.isEditable ? {
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
      var _deleteAgent = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(combo, pred, obj) {
        var combos, comboToRemove;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
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
      var _addNewURI = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(uri) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
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
      var _handleDroppedUris = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(uris, combo) {
        var _this5 = this;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
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
      var _handleDroppedUri = (0, _asyncToGenerator2["default"])(function (uri, combo) {
        var _this6 = this;
        var secondAttempt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        return /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
          var agent, thing, _this6$_store, _this6$_store$fetcher, message, error;
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                agent = findAgent(uri, _this6.store); // eg 'agent', 'origin', agentClass'
                thing = (0, _rdflib.sym)(uri);
                if (!(!agent && !secondAttempt)) {
                  _context4.next = 17;
                  break;
                }
                debug.log("   Not obvious: looking up dropped thing ".concat(thing));
                _context4.prev = 4;
                _context4.next = 7;
                return (_this6$_store = _this6._store) === null || _this6$_store === void 0 ? void 0 : (_this6$_store$fetcher = _this6$_store.fetcher) === null || _this6$_store$fetcher === void 0 ? void 0 : _this6$_store$fetcher.load(thing.doc());
              case 7:
                _context4.next = 14;
                break;
              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](4);
                message = "Ignore error looking up dropped thing: ".concat(_context4.t0);
                debug.error(message);
                return _context4.abrupt("return", Promise.reject(new Error(message)));
              case 14:
                return _context4.abrupt("return", _this6.handleDroppedUri(uri, combo, true));
              case 17:
                if (agent) {
                  _context4.next = 21;
                  break;
                }
                error = "   Error: Drop fails to drop appropriate thing! ".concat(uri);
                debug.error(error);
                return _context4.abrupt("return", Promise.reject(new Error(error)));
              case 21:
                _this6.setACLCombo(combo, uri, agent, _this6.controller.subject);
              case 22:
              case "end":
                return _context4.stop();
            }
          }, _callee4, null, [[4, 9]]);
        })();
      });
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
  }]);
}();
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
  }
  // An Origin URI is one like https://fred.github.io eith no trailing slash
  if (uri.startsWith('http') && uri.split('/').length === 3) {
    // there is no third slash
    return {
      pred: 'origin',
      obj: obj
    }; // The only way to know an origin alas
  }
  // @@ This is an almighty kludge needed because drag and drop adds extra slashes to origins
  if (uri.startsWith('http') && uri.split('/').length === 4 && uri.endsWith('/')) {
    // there  IS third slash
    debug.log('Assuming final slash on dragged origin URI was unintended!');
    return {
      pred: 'origin',
      obj: (0, _rdflib.sym)(uri.slice(0, -1))
    }; // Fix a URI where the drag and drop system has added a spurious slash
  }
  if (ns.vcard('WebID').uri in types) return {
    pred: 'agent',
    obj: obj
  };
  if (ns.vcard('Group').uri in types) {
    return {
      pred: 'agentGroup',
      obj: obj
    }; // @@ note vcard membership not RDFs
  }
  if (obj.sameTerm(ns.foaf('Agent')) || obj.sameTerm(ns.acl('AuthenticatedAgent')) ||
  // AuthenticatedAgent
  obj.sameTerm(ns.rdf('Resource')) || obj.sameTerm(ns.owl('Thing'))) {
    return {
      pred: 'agentClass',
      obj: obj
    };
  }
  if (ns.vcard('Individual').uri in types || ns.foaf('Person').uri in types || ns.foaf('Agent').uri in types) {
    var pref = kb.any(obj, ns.foaf('preferredURI'));
    if (pref) return {
      pred: 'agent',
      obj: (0, _rdflib.sym)(pref)
    };
    return {
      pred: 'agent',
      obj: obj
    };
  }
  if (ns.solid('AppProvider').uri in types) {
    return {
      pred: 'origin',
      obj: obj
    };
  }
  if (ns.solid('AppProviderClass').uri in types) {
    return {
      pred: 'originClass',
      obj: obj
    };
  }
  debug.log('    Triage fails for ' + uri);
  return null;
}
//# sourceMappingURL=access-groups.js.map