"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderAutoComplete = renderAutoComplete;
exports.setVisible = setVisible;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var debug = _interopRequireWildcard(require("../../../debug"));
var style = _interopRequireWildcard(require("../../../style"));
var _styleConstants = _interopRequireDefault(require("../../../styleConstants"));
var widgets = _interopRequireWildcard(require("../../../widgets"));
var _solidLogic = require("solid-logic");
var _publicData = require("./publicData");
var _language = require("./language");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /* Autocomplete Picker: Create and edit data using public data
**
** As the data source is passed as a parameter, all kinds of APIa and query services can be used
**
*/
var AUTOCOMPLETE_THRESHOLD = 4; // don't check until this many characters typed
var AUTOCOMPLETE_ROWS = 20; // 20?
var AUTOCOMPLETE_ROWS_STRETCH = 40;

/*
Autocomplete happens in 6 phases:
  1. The search string is too small to bother
  2. The search string is big enough, and we have not loaded the array
  3. The search string is big enough, and we have loaded array up to the limit
       Display them and wait for more user input
  4. The search string is big enough, and we have loaded array NOT to the limit
     but including all matches.   No more fetches.
     If user gets more precise, wait for them to select one - or reduce to a single
  5. Single one selected. Optionally waiting for accept button to be pressed, OR can change string and go to 5 or 2
  6. Locked with a value. Press 'edit' button to return to 5
*/

function setVisible(element, visible) {
  element.style.display = visible ? '' : 'none'; // Do not use visibility, it holds the real estate
}

// The core of the autocomplete UI
function renderAutoComplete(_x, _x2, _x3, _x4) {
  return _renderAutoComplete.apply(this, arguments);
} // renderAutoComplete
// ENDS
function _renderAutoComplete() {
  _renderAutoComplete = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(dom, acOptions, decoration, callback) {
    var complain, finish, gotIt, _gotIt, acceptButtonHandler, _acceptButtonHandler, cancelButtonHandler, _cancelButtonHandler, nameMatch, clearList, inputEventHHandler, _inputEventHHandler, loadBindingsAndFilterByLanguage, _loadBindingsAndFilterByLanguage, filterByName, refreshList, _refreshList, initialize, targetClass, lastBindings, loadedEnough, inputEventHandlerLock, allDisplayed, lastFilter, numberOfRows, div, foundName, foundObject, table, head, cell, searchInput, size, searchInputStyle;
    return _regenerator["default"].wrap(function (_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          initialize = function _initialize() {
            if (acOptions.currentObject) {
              // If have existing value then jump into the endgame of the autocomplete
              searchInput.value = acOptions.currentName ? acOptions.currentName.value : '??? wot no name for ' + acOptions.currentObject;
              foundName = acOptions.currentName;
              lastFilter = acOptions.currentName ? acOptions.currentName.value : undefined;
              foundObject = acOptions.currentObject;
            } else {
              searchInput.value = '';
              lastFilter = undefined;
              foundObject = undefined;
            }
            if (decoration.deleteButton) {
              setVisible(decoration.deleteButton, !!acOptions.currentObject);
            }
            if (decoration.acceptButton) {
              setVisible(decoration.acceptButton, false); // hide until input complete
            }
            if (decoration.editButton) {
              setVisible(decoration.editButton, true);
            }
            if (decoration.cancelButton) {
              setVisible(decoration.cancelButton, false); // only allow cancel when there is something to cancel
            }
            inputEventHandlerLock = false;
            clearList();
          };
          _refreshList = function _refreshList3() {
            _refreshList = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7() {
              var rowForBinding, compareBindingsByName, languagePrefs, filter, slimmed, displayable, _iterator, _step, binding;
              return _regenerator["default"].wrap(function (_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    compareBindingsByName = function _compareBindingsByNam(self, other) {
                      return other.name.value > self.name.value ? 1 : other.name.name < self.name.value ? -1 : 0;
                    };
                    rowForBinding = function _rowForBinding(binding) {
                      var row = dom.createElement('tr');
                      style.setStyle(row, 'autocompleteRowStyle');
                      row.setAttribute('style', 'padding: 0.3em;');
                      row.style.color = allDisplayed ? '#080' : '#088'; // green means 'you should find it here'
                      row.textContent = binding.name.value;
                      var object = (0, _publicData.bindingToTerm)(binding.subject);
                      var nameTerm = (0, _publicData.bindingToTerm)(binding.name);
                      row.addEventListener('click', /*#__PURE__*/function () {
                        var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(_event) {
                          return _regenerator["default"].wrap(function (_context6) {
                            while (1) switch (_context6.prev = _context6.next) {
                              case 0:
                                debug.log('       click row textContent: ' + row.textContent);
                                debug.log('       click name: ' + nameTerm.value);
                                if (object && nameTerm) {
                                  gotIt(object, nameTerm);
                                }
                              case 1:
                              case "end":
                                return _context6.stop();
                            }
                          }, _callee6);
                        }));
                        return function (_x10) {
                          return _ref.apply(this, arguments);
                        };
                      }());
                      return row;
                    }; // console.log('@@ refreshList called')
                    // rowForBinding
                    if (!inputEventHandlerLock) {
                      _context7.next = 1;
                      break;
                    }
                    debug.log("Ignoring \"".concat(searchInput.value, "\" because of lock "));
                    return _context7.abrupt("return");
                  case 1:
                    debug.log("Setting lock at \"".concat(searchInput.value, "\""));
                    inputEventHandlerLock = true;
                    _context7.next = 2;
                    return (0, _language.getPreferredLanguages)();
                  case 2:
                    languagePrefs = _context7.sent;
                    filter = searchInput.value.trim().toLowerCase();
                    if (!(filter.length < AUTOCOMPLETE_THRESHOLD)) {
                      _context7.next = 3;
                      break;
                    }
                    // too small
                    clearList();
                    // candidatesLoaded = false
                    numberOfRows = AUTOCOMPLETE_ROWS;
                    _context7.next = 6;
                    break;
                  case 3:
                    if (!(!allDisplayed || !lastFilter || !filter.startsWith(lastFilter))) {
                      _context7.next = 5;
                      break;
                    }
                    debug.log("   Querying database at \"".concat(filter, "\" cf last \"").concat(lastFilter, "\"."));
                    _context7.next = 4;
                    return loadBindingsAndFilterByLanguage(filter, languagePrefs);
                  case 4:
                    lastBindings = _context7.sent;
                  case 5:
                    // Trim table as search gets tighter:
                    slimmed = filterByName(filter, lastBindings);
                    if (loadedEnough && slimmed.length <= AUTOCOMPLETE_ROWS_STRETCH) {
                      numberOfRows = slimmed.length; // stretch if it means we get all items
                    }
                    allDisplayed = loadedEnough && slimmed.length <= numberOfRows;
                    debug.log(" Filter:\"".concat(filter, "\" lastBindings: ").concat(lastBindings.length, ", slimmed to ").concat(slimmed.length, "; rows: ").concat(numberOfRows, ", Enough? ").concat(loadedEnough, ", All displayed? ").concat(allDisplayed));
                    displayable = slimmed.slice(0, numberOfRows);
                    displayable.sort(compareBindingsByName);
                    clearList();
                    _iterator = _createForOfIteratorHelper(displayable);
                    try {
                      for (_iterator.s(); !(_step = _iterator.n()).done;) {
                        binding = _step.value;
                        table.appendChild(rowForBinding(binding));
                      }
                    } catch (err) {
                      _iterator.e(err);
                    } finally {
                      _iterator.f();
                    }
                    if (slimmed.length === 1) {
                      gotIt((0, _publicData.bindingToTerm)(slimmed[0].subject), (0, _publicData.bindingToTerm)(slimmed[0].name));
                    }
                  case 6:
                    // else
                    inputEventHandlerLock = false;
                  case 7:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7);
            }));
            return _refreshList.apply(this, arguments);
          };
          refreshList = function _refreshList2() {
            return _refreshList.apply(this, arguments);
          };
          filterByName = function _filterByName(filter, bindings) {
            return bindings.filter(function (binding) {
              return nameMatch(filter, binding.name.value);
            });
          };
          _loadBindingsAndFilterByLanguage = function _loadBindingsAndFilte2() {
            _loadBindingsAndFilterByLanguage = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(filter, languagePrefs) {
              var bindings, slimmed, _t;
              return _regenerator["default"].wrap(function (_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.prev = 0;
                    _context5.next = 1;
                    return (0, _publicData.queryPublicDataByName)(filter, targetClass, languagePrefs || _language.defaultPreferredLanguages, acOptions.queryParams);
                  case 1:
                    bindings = _context5.sent;
                    _context5.next = 3;
                    break;
                  case 2:
                    _context5.prev = 2;
                    _t = _context5["catch"](0);
                    complain('Error querying db of organizations: ' + _t);
                    inputEventHandlerLock = false;
                    return _context5.abrupt("return");
                  case 3:
                    loadedEnough = bindings.length < _publicData.AUTOCOMPLETE_LIMIT;
                    if (loadedEnough) {
                      lastFilter = filter;
                    } else {
                      lastFilter = undefined;
                    }
                    clearList();
                    slimmed = (0, _language.filterByLanguage)(bindings, languagePrefs);
                    return _context5.abrupt("return", slimmed);
                  case 4:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5, null, [[0, 2]]);
            }));
            return _loadBindingsAndFilterByLanguage.apply(this, arguments);
          };
          loadBindingsAndFilterByLanguage = function _loadBindingsAndFilte(_x0, _x1) {
            return _loadBindingsAndFilterByLanguage.apply(this, arguments);
          };
          _inputEventHHandler = function _inputEventHHandler3() {
            _inputEventHHandler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(_event) {
              return _regenerator["default"].wrap(function (_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    // console.log('@@ AC inputEventHHandler called')
                    setVisible(decoration.cancelButton, true); // only allow cancel when there is something to cancel
                    refreshList(); /// @@  debounqce does not work with jest
                    /*
                    if (runningTimeout) {
                      clearTimeout(runningTimeout)
                    }
                    runningTimeout = setTimeout(refreshList, AUTOCOMPLETE_DEBOUNCE_MS)
                    */
                  case 1:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return _inputEventHHandler.apply(this, arguments);
          };
          inputEventHHandler = function _inputEventHHandler2(_x9) {
            return _inputEventHHandler.apply(this, arguments);
          };
          clearList = function _clearList() {
            while (table.children.length > 1) {
              table.removeChild(table.lastChild);
            }
          };
          nameMatch = function _nameMatch(filter, candidate) {
            var parts = filter.split(' '); // Each name part must be somewhere
            for (var j = 0; j < parts.length; j++) {
              var word = parts[j];
              if (candidate.toLowerCase().indexOf(word) < 0) return false;
            }
            return true;
          };
          _cancelButtonHandler = function _cancelButtonHandler3() {
            _cancelButtonHandler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(_event) {
              return _regenerator["default"].wrap(function (_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    debug.log('Auto complete: Canceled by user! ');
                    if (acOptions.permanent) {
                      initialize();
                    } else {
                      if (div.parentNode) {
                        div.parentNode.removeChild(div);
                      }
                    }
                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return _cancelButtonHandler.apply(this, arguments);
          };
          cancelButtonHandler = function _cancelButtonHandler2(_x8) {
            return _cancelButtonHandler.apply(this, arguments);
          };
          _acceptButtonHandler = function _acceptButtonHandler3() {
            _acceptButtonHandler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(_event) {
              return _regenerator["default"].wrap(function (_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    if (foundName && searchInput.value === foundName.value) {
                      // still
                      finish(foundObject, foundName);
                    }
                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return _acceptButtonHandler.apply(this, arguments);
          };
          acceptButtonHandler = function _acceptButtonHandler2(_x7) {
            return _acceptButtonHandler.apply(this, arguments);
          };
          _gotIt = function _gotIt3() {
            _gotIt = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(object, name) {
              return _regenerator["default"].wrap(function (_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (!decoration.acceptButton) {
                      _context.next = 1;
                      break;
                    }
                    decoration.acceptButton.disbaled = false;
                    setVisible(decoration.acceptButton, true); // now wait for confirmation
                    searchInput.value = name.value; // complete it
                    foundName = name;
                    foundObject = object;
                    debug.log('Auto complete: name: ' + name);
                    debug.log('Auto complete: waiting for accept ' + object);
                    clearList(); // This may be an option - nice and clean but does not allow change of mind
                    return _context.abrupt("return");
                  case 1:
                    setVisible(decoration.cancelButton, true);
                    finish(object, name);
                  case 2:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return _gotIt.apply(this, arguments);
          };
          gotIt = function _gotIt2(_x5, _x6) {
            return _gotIt.apply(this, arguments);
          };
          finish = function _finish(object, name) {
            debug.log('Auto complete: finish! ' + object);
            if (object.termType === 'Literal' && acOptions.queryParams.objectURIBase) {
              object = _solidLogic.store.sym(acOptions.queryParams.objectURIBase.value + object.value);
            }
            // remove(decoration.cancelButton)
            // remove(decoration.acceptButton)
            // remove(div)
            clearList();
            callback(object, name);
          };
          complain = function _complain(message) {
            var errorRow = table.appendChild(dom.createElement('tr'));
            debug.log(message);
            var err = new Error(message);
            errorRow.appendChild(widgets.errorMessageBlock(dom, err, 'pink'));
            // errorMessageBlock will log the stack to the console
            style.setStyle(errorRow, 'autocompleteRowStyle');
            errorRow.style.padding = '1em';
          }; // refreshList
          // initialiize
          // const queryParams: QueryParameters = acOptions.queryParams
          targetClass = acOptions.targetClass;
          if (targetClass) {
            _context8.next = 1;
            break;
          }
          throw new Error('renderAutoComplete: missing targetClass');
        case 1:
          // console.log(`renderAutoComplete: targetClass=${targetClass}` )
          if (decoration.acceptButton) {
            decoration.acceptButton.addEventListener('click', acceptButtonHandler, false);
          }
          if (decoration.cancelButton) {
            decoration.cancelButton.addEventListener('click', cancelButtonHandler, false);
          }

          // var candidatesLoaded = false
          loadedEnough = false;
          inputEventHandlerLock = false;
          allDisplayed = false;
          lastFilter = undefined;
          numberOfRows = AUTOCOMPLETE_ROWS; // this gets slimmed down
          div = dom.createElement('div');
          foundName = undefined; // once found accepted string must match this
          foundObject = undefined;
          table = div.appendChild(dom.createElement('table'));
          table.setAttribute('data-testid', 'autocomplete-table');
          table.setAttribute('style', 'max-width: 30em; margin: 0.5em;');
          head = table.appendChild(dom.createElement('tr'));
          style.setStyle(head, 'autocompleteRowStyle'); // textInputStyle or
          cell = head.appendChild(dom.createElement('td'));
          searchInput = cell.appendChild(dom.createElement('input'));
          searchInput.setAttribute('type', 'text');
          initialize();
          size = acOptions.size || _styleConstants["default"].textInputSize || 20;
          searchInput.setAttribute('size', size);
          searchInput.setAttribute('data-testid', 'autocomplete-input');
          searchInputStyle = style.textInputStyle ||
          // searchInputStyle ?
          'border: 0.1em solid #444; border-radius: 0.5em; width: 100%; font-size: 100%; padding: 0.1em 0.6em'; // @
          searchInput.setAttribute('style', searchInputStyle);
          searchInput.addEventListener('keyup', function (event) {
            if (event.keyCode === 13) {
              acceptButtonHandler(event);
            }
          }, false);
          searchInput.addEventListener('input', inputEventHHandler);
          // console.log('@@ renderAutoComplete returns ' + div.innerHTML)
          return _context8.abrupt("return", div);
        case 2:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _renderAutoComplete.apply(this, arguments);
}
//# sourceMappingURL=autocompletePicker.js.map