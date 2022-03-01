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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var WEBID_NOUN = 'Solid ID';
var GREEN_PLUS = _iconBase.icons.iconBase + 'noun_34653_green.svg';
var SEARCH_ICON = _iconBase.icons.iconBase + 'noun_Search_875351.svg';
var EDIT_ICON = _iconBase.icons.iconBase + 'noun_253504.svg'; // const DELETE_ICON = icons.iconBase + 'noun_2188_red.svg'

function renderAutocompleteControl(_x, _x2, _x3, _x4, _x5, _x6) {
  return _renderAutocompleteControl.apply(this, arguments);
} // renderAutocompleteControl
// ends


function _renderAutocompleteControl() {
  _renderAutocompleteControl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(dom, person, barOptions, acOptions, addOneIdAndRefresh, deleteOne) {
    var autoCompleteDone, _autoCompleteDone, greenButtonHandler, _greenButtonHandler, removeDecorated, displayAutocomplete, _displayAutocomplete, searchButtonHandler, _searchButtonHandler, droppedURIHandler, _droppedURIHandler, acceptButton, cancelButton, deleteButtonContainer, noun, deleteButton, editButton, editing, syncEditingStatus, decoration, decoratedAutocomplete, creationArea, plus;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
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
              _droppedURIHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(uris) {
                var _iterator, _step, webid;

                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _iterator = _createForOfIteratorHelper(uris);
                        _context5.prev = 1;

                        _iterator.s();

                      case 3:
                        if ((_step = _iterator.n()).done) {
                          _context5.next = 9;
                          break;
                        }

                        webid = _step.value;
                        _context5.next = 7;
                        return addOneIdAndRefresh(person, webid);

                      case 7:
                        _context5.next = 3;
                        break;

                      case 9:
                        _context5.next = 14;
                        break;

                      case 11:
                        _context5.prev = 11;
                        _context5.t0 = _context5["catch"](1);

                        _iterator.e(_context5.t0);

                      case 14:
                        _context5.prev = 14;

                        _iterator.f();

                        return _context5.finish(14);

                      case 17:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5, null, [[1, 11, 14, 17]]);
              }));
              return _droppedURIHandler.apply(this, arguments);
            };

            droppedURIHandler = function _droppedURIHandler2(_x11) {
              return _droppedURIHandler.apply(this, arguments);
            };

            _searchButtonHandler = function _searchButtonHandler3() {
              _searchButtonHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_event) {
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (!decoratedAutocomplete) {
                          _context4.next = 5;
                          break;
                        }

                        creationArea.removeChild(decoratedAutocomplete);
                        decoratedAutocomplete = undefined;
                        _context4.next = 7;
                        break;

                      case 5:
                        _context4.next = 7;
                        return displayAutocomplete();

                      case 7:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));
              return _searchButtonHandler.apply(this, arguments);
            };

            searchButtonHandler = function _searchButtonHandler2(_x10) {
              return _searchButtonHandler.apply(this, arguments);
            };

            _displayAutocomplete = function _displayAutocomplete3() {
              _displayAutocomplete = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        decoratedAutocomplete = dom.createElement('div');
                        decoratedAutocomplete.setAttribute('style', 'display: flex; flex-flow: wrap;');
                        _context3.t0 = decoratedAutocomplete;
                        _context3.next = 5;
                        return (0, _autocompletePicker.renderAutoComplete)(dom, acOptions, decoration, autoCompleteDone);

                      case 5:
                        _context3.t1 = _context3.sent;

                        _context3.t0.appendChild.call(_context3.t0, _context3.t1);

                        // console.log('@@ acceptButton', acceptButton)
                        decoratedAutocomplete.appendChild(acceptButton); // console.log('@@ cancelButton', cancelButton)

                        decoratedAutocomplete.appendChild(cancelButton); // console.log('@@ editButton', editButton)

                        decoratedAutocomplete.appendChild(editButton); // console.log('@@ deleteButtonContainer', deleteButtonContainer)

                        decoratedAutocomplete.appendChild(deleteButtonContainer);
                        creationArea.appendChild(decoratedAutocomplete);

                      case 12:
                      case "end":
                        return _context3.stop();
                    }
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
              _greenButtonHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_event) {
                var webid;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return widgets.askName(dom, _solidLogic.store, creationArea, ns.vcard('url'), undefined, WEBID_NOUN);

                      case 2:
                        webid = _context2.sent;

                        if (webid) {
                          _context2.next = 5;
                          break;
                        }

                        return _context2.abrupt("return");

                      case 5:
                        return _context2.abrupt("return", addOneIdAndRefresh(person, webid));

                      case 6:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));
              return _greenButtonHandler.apply(this, arguments);
            };

            greenButtonHandler = function _greenButtonHandler2(_x9) {
              return _greenButtonHandler.apply(this, arguments);
            };

            _autoCompleteDone = function _autoCompleteDone3() {
              _autoCompleteDone = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(object, name) {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
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

                      case 2:
                      case "end":
                        return _context.stop();
                    }
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
              _context6.next = 31;
              break;
            }

            _context6.next = 31;
            return displayAutocomplete();

          case 31:
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

          case 34:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _renderAutocompleteControl.apply(this, arguments);
}
//# sourceMappingURL=autocompleteBar.js.map