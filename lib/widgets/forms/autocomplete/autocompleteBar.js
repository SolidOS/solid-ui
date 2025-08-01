"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderAutocompleteControl = renderAutocompleteControl;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var ns = _interopRequireWildcard(require("../../../ns"));
var _iconBase = require("../../../iconBase");
var _solidLogic = require("solid-logic");
var widgets = _interopRequireWildcard(require("../../../widgets"));
var utils = _interopRequireWildcard(require("../../../utils"));
var _autocompletePicker = require("./autocompletePicker");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t4 in e) "default" !== _t4 && {}.hasOwnProperty.call(e, _t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t4)) && (i.get || i.set) ? o(f, _t4, i) : f[_t4] = e[_t4]); return f; })(e, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /* The Autocomplete Control with decorations

This control has the buttons which control the state between editing, viewing, searching, accepting
and so on.  See the state diagram in the documentation.  The AUtocomplete Picker does the main work.

*/
// dbpediaParameters

var WEBID_NOUN = 'Solid ID';
var GREEN_PLUS = _iconBase.icons.iconBase + 'noun_34653_green.svg';
var SEARCH_ICON = _iconBase.icons.iconBase + 'noun_Search_875351.svg';
var EDIT_ICON = _iconBase.icons.iconBase + 'noun_253504.svg';
// const DELETE_ICON = icons.iconBase + 'noun_2188_red.svg'
function renderAutocompleteControl(_x, _x2, _x3, _x4, _x5, _x6) {
  return _renderAutocompleteControl.apply(this, arguments);
} // renderAutocompleteControl
// ends
function _renderAutocompleteControl() {
  _renderAutocompleteControl = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(dom, person, barOptions, acOptions, addOneIdAndRefresh, deleteOne) {
    var autoCompleteDone, _autoCompleteDone, greenButtonHandler, _greenButtonHandler, removeDecorated, displayAutocomplete, _displayAutocomplete, searchButtonHandler, _searchButtonHandler, droppedURIHandler, _droppedURIHandler, acceptButton, cancelButton, deleteButtonContainer, noun, deleteButton, editButton, editing, syncEditingStatus, decoration, decoratedAutocomplete, creationArea, plus;
    return _regenerator["default"].wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          syncEditingStatus = function _syncEditingStatus() {
            if (editing) {
              (0, _autocompletePicker.setVisible)(editButton, false);
              (0, _autocompletePicker.setVisible)(acceptButton, false); // not till got it
              (0, _autocompletePicker.setVisible)(cancelButton, false);
            } else {
              (0, _autocompletePicker.setVisible)(editButton, true);
              (0, _autocompletePicker.setVisible)(acceptButton, false);
              (0, _autocompletePicker.setVisible)(cancelButton, false);
            }
          };
          _droppedURIHandler = function _droppedURIHandler3() {
            _droppedURIHandler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(uris) {
              var _iterator, _step, webid, _t3;
              return _regenerator["default"].wrap(function (_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _iterator = _createForOfIteratorHelper(uris);
                    _context5.prev = 1;
                    _iterator.s();
                  case 2:
                    if ((_step = _iterator.n()).done) {
                      _context5.next = 4;
                      break;
                    }
                    webid = _step.value;
                    _context5.next = 3;
                    return addOneIdAndRefresh(person, webid);
                  case 3:
                    _context5.next = 2;
                    break;
                  case 4:
                    _context5.next = 6;
                    break;
                  case 5:
                    _context5.prev = 5;
                    _t3 = _context5["catch"](1);
                    _iterator.e(_t3);
                  case 6:
                    _context5.prev = 6;
                    _iterator.f();
                    return _context5.finish(6);
                  case 7:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5, null, [[1, 5, 6, 7]]);
            }));
            return _droppedURIHandler.apply(this, arguments);
          };
          droppedURIHandler = function _droppedURIHandler2(_x1) {
            return _droppedURIHandler.apply(this, arguments);
          };
          _searchButtonHandler = function _searchButtonHandler3() {
            _searchButtonHandler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(_event) {
              return _regenerator["default"].wrap(function (_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!decoratedAutocomplete) {
                      _context4.next = 1;
                      break;
                    }
                    creationArea.removeChild(decoratedAutocomplete);
                    decoratedAutocomplete = undefined;
                    _context4.next = 2;
                    break;
                  case 1:
                    _context4.next = 2;
                    return displayAutocomplete();
                  case 2:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return _searchButtonHandler.apply(this, arguments);
          };
          searchButtonHandler = function _searchButtonHandler2(_x0) {
            return _searchButtonHandler.apply(this, arguments);
          };
          _displayAutocomplete = function _displayAutocomplete3() {
            _displayAutocomplete = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3() {
              var _t, _t2;
              return _regenerator["default"].wrap(function (_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    decoratedAutocomplete = dom.createElement('div');
                    decoratedAutocomplete.setAttribute('style', 'display: flex; flex-flow: wrap;');
                    _t = decoratedAutocomplete;
                    _context3.next = 1;
                    return (0, _autocompletePicker.renderAutoComplete)(dom, acOptions, decoration, autoCompleteDone);
                  case 1:
                    _t2 = _context3.sent;
                    _t.appendChild.call(_t, _t2);
                    // console.log('@@ acceptButton', acceptButton)
                    decoratedAutocomplete.appendChild(acceptButton);
                    // console.log('@@ cancelButton', cancelButton)

                    decoratedAutocomplete.appendChild(cancelButton);
                    // console.log('@@ editButton', editButton)

                    decoratedAutocomplete.appendChild(editButton);
                    // console.log('@@ deleteButtonContainer', deleteButtonContainer)

                    decoratedAutocomplete.appendChild(deleteButtonContainer);
                    creationArea.appendChild(decoratedAutocomplete);
                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return _displayAutocomplete.apply(this, arguments);
          };
          displayAutocomplete = function _displayAutocomplete2() {
            return _displayAutocomplete.apply(this, arguments);
          };
          removeDecorated = function _removeDecorated() {
            if (decoratedAutocomplete) {
              creationArea.removeChild(decoratedAutocomplete);
              decoratedAutocomplete = undefined;
            }
          };
          _greenButtonHandler = function _greenButtonHandler3() {
            _greenButtonHandler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(_event) {
              var webid;
              return _regenerator["default"].wrap(function (_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 1;
                    return widgets.askName(dom, _solidLogic.store, creationArea, ns.vcard('url'), undefined, WEBID_NOUN);
                  case 1:
                    webid = _context2.sent;
                    if (webid) {
                      _context2.next = 2;
                      break;
                    }
                    return _context2.abrupt("return");
                  case 2:
                    return _context2.abrupt("return", addOneIdAndRefresh(person, webid));
                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return _greenButtonHandler.apply(this, arguments);
          };
          greenButtonHandler = function _greenButtonHandler2(_x9) {
            return _greenButtonHandler.apply(this, arguments);
          };
          _autoCompleteDone = function _autoCompleteDone3() {
            _autoCompleteDone = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(object, name) {
              return _regenerator["default"].wrap(function (_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (acOptions.permanent) {
                      // remember to set this in publicid panel
                      (0, _autocompletePicker.setVisible)(editButton, true);
                      (0, _autocompletePicker.setVisible)(acceptButton, false);
                      (0, _autocompletePicker.setVisible)(cancelButton, false);
                    } else {
                      // console.log('temporary - removed decoratiion')
                      removeDecorated();
                    }
                    return _context.abrupt("return", addOneIdAndRefresh(object, name));
                  case 1:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return _autoCompleteDone.apply(this, arguments);
          };
          autoCompleteDone = function _autoCompleteDone2(_x7, _x8) {
            return _autoCompleteDone.apply(this, arguments);
          };
          acceptButton = widgets.continueButton(dom);
          acceptButton.setAttribute('data-testid', 'accept-button');
          cancelButton = widgets.cancelButton(dom);
          cancelButton.setAttribute('data-testid', 'cancel-button');
          deleteButtonContainer = dom.createElement('div');
          noun = acOptions.targetClass ? utils.label(acOptions.targetClass) : 'item';
          deleteButton = widgets.deleteButtonWithCheck(dom, deleteButtonContainer, noun, deleteOne); // need to knock out this UI or caller does that
          deleteButton.setAttribute('data-testid', 'delete-button');
          editButton = widgets.button(dom, EDIT_ICON, 'Edit', function (_event) {
            editing = !editing;
            syncEditingStatus();
          });
          editButton.setAttribute('data-testid', 'edit-button');
          editing = true;
          decoration = {
            acceptButton: acceptButton,
            cancelButton: cancelButton,
            editButton: editButton,
            deleteButton: deleteButton
          };
          decoratedAutocomplete = undefined;
          creationArea = dom.createElement('div');
          creationArea.style.display = 'flex';
          creationArea.style.flexDirection = 'row';
          if (!(acOptions.permanent || acOptions.currentObject)) {
            _context6.next = 1;
            break;
          }
          _context6.next = 1;
          return displayAutocomplete();
        case 1:
          if (barOptions.editable) {
            // creationArea.appendChild(await renderAutoComplete(dom, barOptions, autoCompleteDone)) wait for searchButton
            creationArea.style.width = '100%';
            if (barOptions.manualURIEntry) {
              plus = creationArea.appendChild(widgets.button(dom, GREEN_PLUS, barOptions.idNoun, greenButtonHandler));
              widgets.makeDropTarget(plus, droppedURIHandler, undefined);
            }
            if (barOptions.dbLookup && !acOptions.currentObject && !acOptions.permanent) {
              creationArea.appendChild(widgets.button(dom, SEARCH_ICON, barOptions.idNoun, searchButtonHandler));
            }
          }
          syncEditingStatus();
          return _context6.abrupt("return", creationArea);
        case 2:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _renderAutocompleteControl.apply(this, arguments);
}
//# sourceMappingURL=autocompleteBar.js.map