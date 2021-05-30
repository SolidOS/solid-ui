"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editFormButton = editFormButton;
exports.appendForm = appendForm;
exports.propertiesForClass = propertiesForClass;
exports.findClosest = findClosest;
exports.formsFor = formsFor;
exports.sortBySequence = sortBySequence;
exports.sortByLabel = sortByLabel;
exports.newButton = newButton;
exports.promptForNew = promptForNew;
exports.makeDescription = makeDescription;
exports.makeSelectForOptions = makeSelectForOptions;
exports.makeSelectForCategory = makeSelectForCategory;
exports.makeSelectForNestedCategory = makeSelectForNestedCategory;
exports.buildCheckboxForm = buildCheckboxForm;
exports.fieldLabel = fieldLabel;
exports.fieldStore = fieldStore;
exports.newThing = newThing;
Object.defineProperty(exports, "fieldParams", {
  enumerable: true,
  get: function get() {
    return _fieldParams.fieldParams;
  }
});
Object.defineProperty(exports, "field", {
  enumerable: true,
  get: function get() {
    return _fieldFunction.field;
  }
});

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var buttons = _interopRequireWildcard(require("./buttons"));

var _fieldParams = require("./forms/fieldParams");

var _fieldFunction = require("./forms/fieldFunction");

var _formStyle = require("./forms/formStyle");

var debug = _interopRequireWildcard(require("../debug"));

var _error = require("./error");

var _basic = require("./forms/basic");

var _autocompleteField = require("./forms/autocomplete/autocompleteField");

var style = _interopRequireWildcard(require("../style"));

var _iconBase = require("../iconBase");

var log = _interopRequireWildcard(require("../log"));

var ns = _interopRequireWildcard(require("../ns"));

var $rdf = _interopRequireWildcard(require("rdflib"));

var _logic = require("../logic");

var utils = _interopRequireWildcard(require("../utils"));

var widgets = _interopRequireWildcard(require("../widgets"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*       F O R M S
 *
 *      A Vanilla Dom implementation of the form language
 */

/* eslint-disable multiline-ternary */

/* global alert */
// Note default export
var checkMarkCharacter = "\u2713";
var cancelCharacter = "\u2715";
var dashCharacter = '-';
var kb = _logic.store;
_fieldFunction.field[ns.ui('AutocompleteField').uri] = _autocompleteField.autocompleteField; // ///////////////////////////////////////////////////////////////////////

/*                                  Form Field implementations
 **
 */

/**          Group of different fields
 **
 **  One type of form field is an ordered Group of other fields.
 **  A Form is actually just the same as a group.
 **
 ** @param {Document} dom The HTML Document object aka Document Object Model
 ** @param {Element?} container  If present, the created widget will be appended to this
 ** @param {Map} already A hash table of (form, subject) kept to prevent recursive forms looping
 ** @param {Node} subject The thing about which the form displays/edits data
 ** @param {Node} form The form or field to be rendered
 ** @param {Node} dataDoc The web document in which the data is
 ** @param {function(ok, errorMessage)} callbackFunction Called when data is changed?
 **
 ** @returns {Element} The HTML widget created
 */

function refreshOpionsSubfieldinGroup(dom, already, subject, dataDoc, callbackFunction, groupDiv, subfields) {
  var eles = groupDiv.children;

  for (var j = 0; j < subfields.length; j++) {
    // This is really messy.
    var _field = subfields[j];
    var t = (0, _fieldFunction.mostSpecificClassURI)(_field); // Field type

    if (t === ns.ui('Options').uri) {
      // const dep = kb.any(field, ui('dependingOn'))
      var optionsRender = (0, _fieldFunction.fieldFunction)(dom, _field);
      var newOne = optionsRender(dom, null, already, subject, _field, dataDoc, callbackFunction); // box.removeChild(newOne) // don't have to put it on a container any more

      debug.log('Refreshing Options field by replacing it.'); // better to support actual refresh

      groupDiv.insertBefore(newOne, eles[j]);
      groupDiv.removeChild(eles[j + 1]); // Remove the old one
      // original[j] = kb.any(subject, dep).toNT()
      // eles[j] = newOne
    }
  }
}

_fieldFunction.field[ns.ui('Form').uri] = _fieldFunction.field[ns.ui('Group').uri] = function (dom, container, already, subject, form, dataDoc, callbackFunction) {
  var box = dom.createElement('div');
  box.setAttribute('style', "padding-left: 2em; border: 0.05em solid ".concat(style.formBorderColor, ";")); // Indent a group

  var ui = ns.ui;
  if (container) container.appendChild(box); // Prevent loops

  var key = subject.toNT() + '|' + form.toNT();

  if (already[key]) {
    // been there done that
    box.appendChild(dom.createTextNode('Group: see above ' + key));
    var plist = [$rdf.st(subject, ns.owl('sameAs'), subject)]; // @@ need prev subject

    dom.outlineManager.appendPropertyTRs(box, plist);
    return box;
  } // box.appendChild(dom.createTextNode('Group: first time, key: '+key))


  var already2 = {};

  for (var x in already) {
    already2[x] = 1;
  }

  already2[key] = 1;
  var formDoc = form.doc ? form.doc() : null; // @@ if blank no way to know

  var parts = kb.any(form, ui('parts'), null, formDoc);
  var subfields;

  if (parts) {
    subfields = parts.elements;
  } else {
    parts = kb.each(form, ui('part'), null, formDoc); //  Warning: unordered

    subfields = sortBySequence(parts);
  }

  if (!parts) {
    box.appendChild((0, _error.errorMessageBlock)(dom, 'No parts to form! '));
    return dom;
  }

  for (var i = 0; i < subfields.length; i++) {
    var _field2 = subfields[i]; // const t = mostSpecificClassURI(field) // Field type

    var subFieldFunction = (0, _fieldFunction.fieldFunction)(dom, _field2); //

    var itemChanged = function itemChanged(ok, body) {
      if (ok && body && body.widget && body.widget === 'select') {
        refreshOpionsSubfieldinGroup(dom, already, subject, dataDoc, callbackFunction, box, subfields);
      }

      callbackFunction(ok, {
        widget: 'group',
        change: body
      });
    };

    box.appendChild(subFieldFunction(dom, null, already2, subject, _field2, dataDoc, itemChanged));
  }

  return box;
};
/**          Options field: Select one or more cases
 **
 ** @param {Document} dom The HTML Document object aka Document Object Model
 ** @param {Element?} container  If present, the created widget will be appended to this
 ** @param {Map} already A hash table of (form, subject) kept to prevent recursive forms looping
 ** @param {Node} subject The thing about which the form displays/edits data
 ** @param {Node} form The form or field to be rendered
 ** @param {Node} dataDoc The web document in which the data is
 ** @param {function(ok, errorMessage)} callbackFunction Called when data is changed?
 **
 ** @returns {Element} The HTML widget created
 */


_fieldFunction.field[ns.ui('Options').uri] = function (dom, container, already, subject, form, dataDoc, callbackFunction) {
  var kb = _logic.store;
  var box = dom.createElement('div');
  var formDoc = form.doc ? form.doc() : null; // @@ if blank no way to know
  // box.setAttribute('style', 'padding-left: 2em; border: 0.05em dotted purple;')  // Indent Options

  var ui = ns.ui;
  if (container) container.appendChild(box);
  var dependingOn = kb.any(form, ui('dependingOn'));

  if (!dependingOn) {
    dependingOn = ns.rdf('type');
  } // @@ default to type (do we want defaults?)


  var cases = kb.each(form, ui('case'), null, formDoc);

  if (!cases) {
    box.appendChild((0, _error.errorMessageBlock)(dom, 'No cases to Options form. '));
  }

  var values;

  if (dependingOn.sameTerm(ns.rdf('type'))) {
    values = kb.findTypeURIs(subject);
  } else {
    var value = kb.any(subject, dependingOn);

    if (value === undefined) {
      box.appendChild((0, _error.errorMessageBlock)(dom, "Can't select subform as no value of: " + dependingOn));
    } else {
      values = {};
      values[value.uri] = true;
    }
  } // @@ Add box.refresh() to sync fields with values


  for (var i = 0; i < cases.length; i++) {
    var c = cases[i];
    var tests = kb.each(c, ui('for'), null, formDoc); // There can be multiple 'for'

    for (var j = 0; j < tests.length; j++) {
      if (values[tests[j].uri]) {
        var _field3 = kb.the(c, ui('use'));

        if (!_field3) {
          box.appendChild((0, _error.errorMessageBlock)(dom, 'No "use" part for case in form ' + form));
          return box;
        } else {
          appendForm(dom, box, already, subject, _field3, dataDoc, callbackFunction);
        }

        break;
      }
    }
  }

  return box;
};
/**          Multiple field: zero or more similar subFields
 **
 ** @param {Document} dom The HTML Document object aka Document Object Model
 ** @param {Element?} container  If present, the created widget will be appended to this
 ** @param {Map} already A hash table of (form, subject) kept to prevent recursive forms looping
 ** @param {Node} subject The thing about which the form displays/edits data
 ** @param {Node} form The form or field to be rendered
 ** @param {Node} dataDoc The web document in which the data is
 ** @param {function(ok, errorMessage)} callbackFunction Called when data is changed?
 **
 ** @returns {Element} The HTML widget created
 **
 ** Form properties:
 **      @param {Boolean} reverse Make e reverse arc in the data OPS not SPO
 **      @param {NamedNode} property The property to be written in the data
 **      @param {Boolean} ordered Is the list an ordered one where the user defined the order
 */


_fieldFunction.field[ns.ui('Multiple').uri] = function (dom, container, already, subject, form, dataDoc, callbackFunction) {
  /** Diagnostic function
  */
  function debugString(values) {
    return values.map(function (x) {
      return x.toString().slice(-7);
    }).join(', ');
  }
  /** Add an item to the local quadstore not the UI or the web
  *
   * @param {Node} object The RDF object to be represented by this item.
   */


  function addItem() {
    return _addItem.apply(this, arguments);
  }
  /** Make a dom representation for an item
   * @param {Event} anyEvent if used as an event handler
   * @param {Node} object The RDF object to be represented by this item.
   */


  function _addItem() {
    _addItem = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var object, toBeInserted, msg;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              object = newThing(dataDoc); // by default just add new nodes

              if (!ordered) {
                _context6.next = 8;
                break;
              }

              createListIfNecessary(); // Sets list and unsavedList

              list.elements.push(object);
              _context6.next = 6;
              return saveListThenRefresh();

            case 6:
              _context6.next = 20;
              break;

            case 8:
              // eslint-disable-next-line multiline-ternary
              toBeInserted = reverse ? [$rdf.st(object, property, subject, dataDoc)] : [$rdf.st(subject, property, object, dataDoc)];
              _context6.prev = 9;
              _context6.next = 12;
              return kb.updater.update([], toBeInserted);

            case 12:
              _context6.next = 19;
              break;

            case 14:
              _context6.prev = 14;
              _context6.t0 = _context6["catch"](9);
              msg = 'Error adding to unordered multiple: ' + _context6.t0;
              box.appendChild((0, _error.errorMessageBlock)(dom, msg));
              debug.error(msg);

            case 19:
              refresh();

            case 20:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[9, 14]]);
    }));
    return _addItem.apply(this, arguments);
  }

  function renderItem(object) {
    function deleteThisItem() {
      return _deleteThisItem.apply(this, arguments);
    }
    /** Move the object up or down in the ordered list
     * @param {Event} anyEvent if used as an event handler
     * @param {Boolean} upwards Move this up (true) or down (false).
     */


    function _deleteThisItem() {
      _deleteThisItem = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var i, del;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!ordered) {
                  _context3.next = 14;
                  break;
                }

                debug.log('pre delete: ' + debugString(list.elements));
                i = 0;

              case 3:
                if (!(i < list.elements.length)) {
                  _context3.next = 12;
                  break;
                }

                if (!list.elements[i].sameTerm(object)) {
                  _context3.next = 9;
                  break;
                }

                list.elements.splice(i, 1);
                _context3.next = 8;
                return saveListThenRefresh();

              case 8:
                return _context3.abrupt("return");

              case 9:
                i++;
                _context3.next = 3;
                break;

              case 12:
                _context3.next = 15;
                break;

              case 14:
                // unordered
                if (kb.holds(subject, property, object, dataDoc)) {
                  del = [$rdf.st(subject, property, object, dataDoc)];
                  kb.updater.update(del, [], function (uri, ok, message) {
                    if (ok) {
                      body.removeChild(subField);
                    } else {
                      body.appendChild((0, _error.errorMessageBlock)(dom, 'Multiple: delete failed: ' + message));
                    }
                  });
                }

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      return _deleteThisItem.apply(this, arguments);
    }

    function moveThisItem(_x, _x2) {
      return _moveThisItem.apply(this, arguments);
    }
    /* A subField has been filled in
    *
    * One possibility is to not actually make the link to the thing until
    * this callback happens to avoid widow links
     */


    function _moveThisItem() {
      _moveThisItem = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(event, upwards) {
        var i;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // @@ possibly, allow shift+click to do move to top or bottom?
                debug.log('pre move: ' + debugString(list.elements));
                i = 0;

              case 2:
                if (!(i < list.elements.length)) {
                  _context4.next = 8;
                  break;
                }

                if (!list.elements[i].sameTerm(object)) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("break", 8);

              case 5:
                i++;
                _context4.next = 2;
                break;

              case 8:
                if (i === list.elements.length) {
                  alert('list move: not found element for ' + object);
                }

                if (!upwards) {
                  _context4.next = 16;
                  break;
                }

                if (!(i === 0)) {
                  _context4.next = 13;
                  break;
                }

                alert('@@ boop - already at top   -temp message'); // @@ make boop sound

                return _context4.abrupt("return");

              case 13:
                list.elements.splice(i - 1, 2, list.elements[i], list.elements[i - 1]);
                _context4.next = 20;
                break;

              case 16:
                if (!(i === list.elements.length - 1)) {
                  _context4.next = 19;
                  break;
                }

                alert('@@ boop - already at bottom   -temp message'); // @@ make boop sound

                return _context4.abrupt("return");

              case 19:
                list.elements.splice(i, 2, list.elements[i + 1], list.elements[i]);

              case 20:
                _context4.next = 22;
                return saveListThenRefresh();

              case 22:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
      return _moveThisItem.apply(this, arguments);
    }

    function itemDone(ok, message) {
      debug.log("Item done callback for item ".concat(object.uri.slice(-7)));

      if (!ok) {
        // when does this happen? errors typically deal with upstream
        debug.error('  Item done callback: Error: ' + message);
      }

      callbackFunction(ok, message);
    }

    log.debug('Multiple: render object: ' + object);
    var fn = (0, _fieldFunction.fieldFunction)(dom, element);
    var subField = fn(dom, null, already, object, element, dataDoc, itemDone); // subfields was: body.  moving to not passing that

    subField.subject = object; // Keep a back pointer between the DOM array and the RDF objects
    // delete button and move buttons

    if (kb.updater.editable(dataDoc.uri)) {
      buttons.deleteButtonWithCheck(dom, subField, utils.label(property), deleteThisItem);

      if (ordered) {
        subField.appendChild(buttons.button(dom, _iconBase.icons.iconBase + 'noun_1369237.svg', 'Move Up', /*#__PURE__*/function () {
          var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(event) {
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    return _context.abrupt("return", moveThisItem(event, true));

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x3) {
            return _ref.apply(this, arguments);
          };
        }()));
        subField.appendChild(buttons.button(dom, _iconBase.icons.iconBase + 'noun_1369241.svg', 'Move Down', /*#__PURE__*/function () {
          var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(event) {
            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    return _context2.abrupt("return", moveThisItem(event, false));

                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x4) {
            return _ref2.apply(this, arguments);
          };
        }()));
      }
    }

    return subField; // unused
  } // renderItem
  /// ///////// Body of Multiple form field implementation


  var plusIconURI = _iconBase.icons.iconBase + 'noun_19460_green.svg'; // white plus in green circle

  var kb = _logic.store;
  var formDoc = form.doc ? form.doc() : null; // @@ if blank no way to know

  var box = dom.createElement('table'); // We don't indent multiple as it is a sort of a prefix of the next field and has contents of one.
  // box.setAttribute('style', 'padding-left: 2em; border: 0.05em solid green;')  // Indent a multiple

  var ui = ns.ui;
  if (container) container.appendChild(box);
  var orderedNode = kb.any(form, ui('ordered'));
  var ordered = orderedNode ? $rdf.Node.toJS(orderedNode) : false;
  var property = kb.any(form, ui('property'));
  var reverse = kb.anyJS(form, ui('reverse'), null, formDoc);

  if (!property) {
    box.appendChild((0, _error.errorMessageBlock)(dom, 'No property to multiple: ' + form)); // used for arcs in the data

    return box;
  }

  var min = kb.any(form, ui('min')); // This is the minimum number -- default 0

  min = min ? 0 + min.value : 0; // var max = kb.any(form, ui('max')) // This is the minimum number
  // max = max ? max.value : 99999999

  var element = kb.any(form, ui('part')); // This is the form to use for each one

  if (!element) {
    box.appendChild((0, _error.errorMessageBlock)(dom, 'No part to multiple: ' + form));
    return box;
  }

  var body = box.appendChild(dom.createElement('tr')); // 20191207

  var list; // The RDF collection which keeps the ordered version or null

  var values; // Initial values - always an array.  Even when no list yet.

  values = reverse ? kb.any(null, property, subject, dataDoc) : kb.any(subject, property, null, dataDoc);

  if (ordered) {
    list = reverse ? kb.any(null, property, subject, dataDoc) : kb.any(subject, property, null, dataDoc);

    if (list) {
      values = list.elements;
    } else {
      values = [];
    }
  } else {
    values = reverse ? kb.each(null, property, subject, dataDoc) : kb.each(subject, property, null, dataDoc);
    list = null;
  } // Add control on the bottom for adding more items


  if (kb.updater.editable(dataDoc.uri)) {
    var tail = box.appendChild(dom.createElement('tr'));
    tail.style.padding = '0.5em';
    var img = tail.appendChild(dom.createElement('img'));
    img.setAttribute('src', plusIconURI); //  plus sign

    img.setAttribute('style', 'margin: 0.2em; width: 1.5em; height:1.5em');
    img.title = 'Click to add one or more ' + utils.predicateLabel(property, reverse);
    var prompt = tail.appendChild(dom.createElement('span'));
    prompt.textContent = (values.length === 0 ? 'Add one or more ' : 'Add more ') + utils.predicateLabel(property, reverse); // utils.label(property)

    tail.addEventListener('click', /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_eventNotUsed) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return addItem();

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x5) {
        return _ref3.apply(this, arguments);
      };
    }(), true);
  }

  function createListIfNecessary() {
    if (!list) {
      list = new $rdf.Collection();

      if (reverse) {
        kb.add(list, property, subject, dataDoc);
      } else {
        kb.add(subject, property, list, dataDoc);
      }
    }
  }

  function saveListThenRefresh() {
    return _saveListThenRefresh.apply(this, arguments);
  }

  function _saveListThenRefresh() {
    _saveListThenRefresh = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              debug.log('save list: ' + debugString(list.elements)); // 20191214

              createListIfNecessary();
              _context7.prev = 2;
              _context7.next = 5;
              return kb.fetcher.putBack(dataDoc);

            case 5:
              _context7.next = 11;
              break;

            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](2);
              box.appendChild((0, _error.errorMessageBlock)(dom, 'Error trying to put back a list: ' + _context7.t0));
              return _context7.abrupt("return");

            case 11:
              refresh();

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[2, 7]]);
    }));
    return _saveListThenRefresh.apply(this, arguments);
  }

  function refresh() {
    var vals;

    if (ordered) {
      var li = reverse ? kb.the(null, property, subject, dataDoc) : kb.the(subject, property, null, dataDoc);
      vals = li ? li.elements : [];
    } else {
      vals = reverse ? kb.each(null, property, subject, dataDoc) : kb.each(subject, property, null, dataDoc);
      vals.sort(); // achieve consistency on each refresh
    }

    utils.syncTableToArrayReOrdered(body, vals, renderItem);
  }

  body.refresh = refresh; // Allow live update

  refresh();

  function asyncStuff() {
    return _asyncStuff.apply(this, arguments);
  }

  function _asyncStuff() {
    _asyncStuff = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var extra, j;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              extra = min - values.length;

              if (!(extra > 0)) {
                _context8.next = 12;
                break;
              }

              j = 0;

            case 3:
              if (!(j < extra)) {
                _context8.next = 10;
                break;
              }

              debug.log('Adding extra: min ' + min);
              _context8.next = 7;
              return addItem();

            case 7:
              j++;
              _context8.next = 3;
              break;

            case 10:
              _context8.next = 12;
              return saveListThenRefresh();

            case 12:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));
    return _asyncStuff.apply(this, arguments);
  }

  asyncStuff().then(function () {
    debug.log(' Multiple render: async stuff ok');
  }, function (err) {
    debug.error(' Multiple render: async stuff fails. #### ', err);
  }); // async

  return box;
}; // Multiple

/*          Text field
 **
 */
// For possible date popups see e.g. http://www.dynamicdrive.com/dynamicindex7/jasoncalendar.htm
// or use HTML5: http://www.w3.org/TR/2011/WD-html-markup-20110113/input.date.html
//


_fieldFunction.field[ns.ui('PhoneField').uri] = _basic.basicField;
_fieldFunction.field[ns.ui('EmailField').uri] = _basic.basicField;
_fieldFunction.field[ns.ui('ColorField').uri] = _basic.basicField;
_fieldFunction.field[ns.ui('DateField').uri] = _basic.basicField;
_fieldFunction.field[ns.ui('DateTimeField').uri] = _basic.basicField;
_fieldFunction.field[ns.ui('TimeField').uri] = _basic.basicField;
_fieldFunction.field[ns.ui('NumericField').uri] = _basic.basicField;
_fieldFunction.field[ns.ui('IntegerField').uri] = _basic.basicField;
_fieldFunction.field[ns.ui('DecimalField').uri] = _basic.basicField;
_fieldFunction.field[ns.ui('FloatField').uri] = _basic.basicField;
_fieldFunction.field[ns.ui('TextField').uri] = _basic.basicField;
_fieldFunction.field[ns.ui('SingleLineTextField').uri] = _basic.basicField;
_fieldFunction.field[ns.ui('NamedNodeURIField').uri] = _basic.basicField;
/*          Multiline Text field
 **
 */

_fieldFunction.field[ns.ui('MultiLineTextField').uri] = function (dom, container, already, subject, form, dataDoc, callbackFunction) {
  var ui = ns.ui;
  var kb = _logic.store;
  var formDoc = form.doc ? form.doc() : null; // @@ if blank no way to know

  var property = kb.any(form, ui('property'));

  if (!property) {
    return (0, _error.errorMessageBlock)(dom, 'No property to text field: ' + form);
  }

  var box = dom.createElement('div');
  box.appendChild(fieldLabel(dom, property, form));
  dataDoc = fieldStore(subject, property, dataDoc);
  var text = kb.anyJS(subject, property, null, dataDoc) || '';
  var editable = kb.updater.editable(dataDoc.uri);
  var suppressEmptyUneditable = form && kb.anyJS(form, ns.ui('suppressEmptyUneditable'), null, formDoc);

  if (!editable && suppressEmptyUneditable && text === '') {
    box.style.display = 'none';
  }

  var field = makeDescription(dom, kb, subject, property, dataDoc, callbackFunction); // box.appendChild(dom.createTextNode('<-@@ subj:'+subject+', prop:'+property))

  box.appendChild(field);
  if (container) container.appendChild(box);
  return box;
};
/*          Boolean field  and Tri-state version (true/false/null)
 **
 ** @@ todo: remove tristate param
 */


function booleanField(dom, container, already, subject, form, dataDoc, callbackFunction, tristate) {
  var ui = ns.ui;
  var kb = _logic.store;
  var property = kb.any(form, ui('property'));

  if (!property) {
    var errorBlock = (0, _error.errorMessageBlock)(dom, 'No property to boolean field: ' + form);
    if (container) container.appendChild(errorBlock);
    return errorBlock;
  }

  var lab = kb.any(form, ui('label'));
  if (!lab) lab = utils.label(property, true); // Init capital

  dataDoc = fieldStore(subject, property, dataDoc);
  var state = kb.any(subject, property);

  if (state === undefined) {
    state = false;
  } // @@ sure we want that -- or three-state?
  // log.debug('dataDoc is '+dataDoc)


  var ins = $rdf.st(subject, property, true, dataDoc);
  var del = $rdf.st(subject, property, false, dataDoc);
  var box = buildCheckboxForm(dom, kb, lab, del, ins, form, dataDoc, tristate);
  if (container) container.appendChild(box);
  return box;
}

_fieldFunction.field[ns.ui('BooleanField').uri] = function (dom, container, already, subject, form, dataDoc, callbackFunction) {
  return booleanField(dom, container, already, subject, form, dataDoc, callbackFunction, false);
};

_fieldFunction.field[ns.ui('TristateField').uri] = function (dom, container, already, subject, form, dataDoc, callbackFunction) {
  return booleanField(dom, container, already, subject, form, dataDoc, callbackFunction, true);
};
/*          Classifier field
 **
 **  Nested categories
 **
 ** @@ To do: If a classification changes, then change any dependent Options fields.
 */


_fieldFunction.field[ns.ui('Classifier').uri] = function (dom, container, already, subject, form, dataDoc, callbackFunction) {
  var kb = _logic.store;
  var ui = ns.ui;
  var category = kb.any(form, ui('category'));

  if (!category) {
    return (0, _error.errorMessageBlock)(dom, 'No category for classifier: ' + form);
  }

  log.debug('Classifier: dataDoc=' + dataDoc);

  var checkOptions = function checkOptions(ok, body) {
    if (!ok) return callbackFunction(ok, body);
    /*
    var parent = kb.any(undefined, ui('part'), form)
    if (!parent) return callbackFunction(ok, body)
    var kids = kb.each(parent, ui('part')); // @@@@@@@@@ Garbage
    kids = kids.filter(function(k){return kb.any(k, ns.rdf('type'), ui('Options'))})
    if (kids.length) log.debug('Yes, found related options: '+kids[0])
    */

    return callbackFunction(ok, body);
  };

  var box = makeSelectForNestedCategory(dom, kb, subject, category, dataDoc, checkOptions);
  if (container) container.appendChild(box);
  return box;
};
/**         Choice field
 **
 **  Not nested.  Generates a link to something from a given class.
 **  Optional subform for the thing selected.
 **  Alternative implementatons caould be:
 ** -- pop-up menu (as here)
 ** -- radio buttons
 ** -- auto-complete typing
 **
 ** Todo: Deal with multiple.  Maybe merge with multiple code.
 */


_fieldFunction.field[ns.ui('Choice').uri] = function (dom, container, already, subject, form, dataDoc, callbackFunction) {
  var ui = ns.ui;
  var kb = _logic.store;
  var multiple = false;
  var formDoc = form.doc ? form.doc() : null; // @@ if blank no way to know

  var p;
  var box = dom.createElement('tr');
  if (container) container.appendChild(box);
  var lhs = dom.createElement('td');
  box.appendChild(lhs);
  var rhs = dom.createElement('td');
  box.appendChild(rhs);
  var property = kb.any(form, ui('property'));

  if (!property) {
    return box.appendChild((0, _error.errorMessageBlock)(dom, 'No property for Choice: ' + form));
  }

  lhs.appendChild(fieldLabel(dom, property, form));
  var from = kb.any(form, ui('from'));

  if (!from) {
    return (0, _error.errorMessageBlock)(dom, "No 'from' for Choice: " + form);
  }

  var subForm = kb.any(form, ui('use')); // Optional

  var follow = kb.anyJS(form, ui('follow'), null, formDoc); // data doc moves to new subject?

  var possible = [];
  var possibleProperties;
  var nullLabel = '--' + utils.label(property) + '-?';
  var opts = {
    form: form,
    multiple: multiple,
    nullLabel: nullLabel,
    disambiguate: false
  };
  possible = kb.each(undefined, ns.rdf('type'), from, formDoc);

  for (var x in kb.findMembersNT(from)) {
    possible.push(kb.fromNT(x)); // box.appendChild(dom.createTextNode("RDFS: adding "+x))
  } // Use rdfs
  // log.debug("%%% Choice field: possible.length 1 = "+possible.length)


  if (from.sameTerm(ns.rdfs('Class'))) {
    for (p in buttons.allClassURIs()) {
      possible.push(kb.sym(p));
    } // log.debug("%%% Choice field: possible.length 2 = "+possible.length)

  } else if (from.sameTerm(ns.rdf('Property'))) {
    possibleProperties = buttons.propertyTriage(kb);

    for (p in possibleProperties.op) {
      possible.push(kb.fromNT(p));
    }

    for (p in possibleProperties.dp) {
      possible.push(kb.fromNT(p));
    }

    opts.disambiguate = true; // This is a big class, and the labels won't be enough.
  } else if (from.sameTerm(ns.owl('ObjectProperty'))) {
    possibleProperties = buttons.propertyTriage(kb);

    for (p in possibleProperties.op) {
      possible.push(kb.fromNT(p));
    }

    opts.disambiguate = true;
  } else if (from.sameTerm(ns.owl('DatatypeProperty'))) {
    possibleProperties = buttons.propertyTriage(kb);

    for (p in possibleProperties.dp) {
      possible.push(kb.fromNT(p));
    }

    opts.disambiguate = true;
  }

  var object = kb.any(subject, property);

  function addSubForm() {
    object = kb.any(subject, property);
    (0, _fieldFunction.fieldFunction)(dom, subForm)(dom, rhs, already, object, subForm, follow ? object.doc() : dataDoc, callbackFunction);
  }

  var possible2 = sortByLabel(possible);

  if (kb.any(form, ui('canMintNew'))) {
    opts.mint = '* New *'; // @@ could be better

    opts.subForm = subForm;
  }

  var selector = makeSelectForOptions(dom, kb, subject, property, possible2, opts, dataDoc, callbackFunction);
  rhs.appendChild(selector);
  if (object && subForm) addSubForm();
  return box;
}; //          Documentation - non-interactive fields
//


_fieldFunction.field[ns.ui('Comment').uri] = _fieldFunction.field[ns.ui('Heading').uri] = function (dom, container, already, subject, form, dataDoc, _callbackFunction) {
  var ui = ns.ui;
  var kb = _logic.store;
  var contents = kb.any(form, ui('contents'));
  if (!contents) contents = 'Error: No contents in comment field.';
  var formDoc = form.doc ? form.doc() : null; // @@ if blank no way to know

  var uri = (0, _fieldFunction.mostSpecificClassURI)(form);
  var params = _fieldParams.fieldParams[uri] || {};
  var box = dom.createElement('div');
  if (container) container.appendChild(box);
  var p = box.appendChild(dom.createElement(params.element));
  p.textContent = contents; // const style = kb.anyValue(form, ui('style'), null, form.doc()) || params.style || ''
  // if (style) p.setAttribute('style', style) // @@ Hey later allow JCSS and RCSS

  (0, _formStyle.setFieldStyle)(p, form); // Some headings and prompts are only useful to guide user input

  var suppressIfUneditable = kb.anyJS(form, ns.ui('suppressIfUneditable'), null, formDoc);
  var editable = kb.updater.editable(dataDoc.uri);

  if (suppressIfUneditable && !editable) {
    box.style.display = 'none';
  }

  return box;
}; // A button for editing a form (in place, at the moment)
//
//  When editing forms, make it yellow, when editing thr form form, pink
// Help people understand how many levels down they are.
//


function editFormButton(dom, container, form, dataDoc, callbackFunction) {
  var b = dom.createElement('button');
  b.setAttribute('type', 'button');
  b.innerHTML = 'Edit ' + utils.label(ns.ui('Form'));
  b.addEventListener('click', function (_e) {
    var ff = appendForm(dom, container, {}, form, ns.ui('FormForm'), dataDoc, callbackFunction);
    ff.setAttribute('style', ns.ui('FormForm').sameTerm(form) ? 'background-color: #fee;' : 'background-color: #ffffe7;');
    b.parentNode.removeChild(b);
  }, true);
  return b;
}

function appendForm(dom, container, already, subject, form, dataDoc, itemDone) {
  return (0, _fieldFunction.fieldFunction)(dom, form)(dom, container, already, subject, form, dataDoc, itemDone);
}
/**          Find list of properties for class
//
// Three possible sources: Those mentioned in schemas, which exludes many
// those which occur in the data we already have, and those predicates we
// have come across anywhere and which are not explicitly excluded from
// being used with this class.
*/


function propertiesForClass(kb, c) {
  var explicit = kb.each(undefined, ns.rdf('range'), c);
  [ns.rdfs('comment'), ns.dc('title'), // Generic things
  ns.foaf('name'), ns.foaf('homepage')].forEach(function (x) {
    explicit.push(x);
  });
  var members = kb.each(undefined, ns.rdf('type'), c);
  if (members.length > 60) members = members.slice(0, 60); // Array supports slice?

  var used = {};

  for (var i = 0; i < (members.length > 60 ? 60 : members.length); i++) {
    kb.statementsMatching(members[i], undefined, undefined).forEach(function (st) {
      used[st.predicate.uri] = true;
    });
  }

  explicit.forEach(function (p) {
    used[p.uri] = true;
  });
  var result = [];

  for (var uri in used) {
    result.push(kb.sym(uri));
  }

  return result;
}
/** Find the closest class
* @param kb The quad store
* @param cla - the URI of the class
* @param prop
*/


function findClosest(kb, cla, prop) {
  var agenda = [kb.sym(cla)]; // ordered - this is breadth first search

  while (agenda.length > 0) {
    var c = agenda.shift(); // first
    // if (c.uri && (c.uri == ns.owl('Thing').uri || c.uri == ns.rdf('Resource').uri )) continue

    var lists = kb.each(c, prop);
    log.debug('Lists for ' + c + ', ' + prop + ': ' + lists.length);
    if (lists.length !== 0) return lists;
    var supers = kb.each(c, ns.rdfs('subClassOf'));

    for (var i = 0; i < supers.length; i++) {
      agenda.push(supers[i]);
      log.debug('findClosest: add super: ' + supers[i]);
    }
  }

  return [];
} // Which forms apply to a given existing subject?


function formsFor(subject) {
  var kb = _logic.store;
  log.debug('formsFor: subject=' + subject);
  var t = kb.findTypeURIs(subject);
  var t1;

  for (t1 in t) {
    log.debug('   type: ' + t1);
  }

  var bottom = kb.bottomTypeURIs(t); // most specific

  var candidates = [];

  for (var b in bottom) {
    // Find the most specific
    log.debug('candidatesFor: trying bottom type =' + b);
    candidates = candidates.concat(findClosest(kb, b, ns.ui('creationForm')));
    candidates = candidates.concat(findClosest(kb, b, ns.ui('annotationForm')));
  }

  return candidates;
}

function sortBySequence(list) {
  var subfields = list.map(function (p) {
    var k = kb.any(p, ns.ui('sequence'));
    return [k || 9999, p];
  });
  subfields.sort(function (a, b) {
    return a[0] - b[0];
  });
  return subfields.map(function (pair) {
    return pair[1];
  });
}

function sortByLabel(list) {
  var subfields = list.map(function (p) {
    return [utils.label(p).toLowerCase(), p];
  });
  subfields.sort();
  return subfields.map(function (pair) {
    return pair[1];
  });
}
/** Button to add a new whatever using a form
//
// @param form - optional form , else will look for one
// @param dataDoc - optional dataDoc else will prompt for one (unimplemented)
*/


function newButton(dom, kb, subject, predicate, theClass, form, dataDoc, callbackFunction) {
  var b = dom.createElement('button');
  b.setAttribute('type', 'button');
  b.innerHTML = 'New ' + utils.label(theClass);
  b.addEventListener('click', function (_e) {
    b.parentNode.appendChild(promptForNew(dom, kb, subject, predicate, theClass, form, dataDoc, callbackFunction));
  }, false);
  return b;
}
/**      Prompt for new object of a given class
//
// @param dom - the document DOM for the user interface
// @param kb - the graph which is the knowledge base we are working with
// @param subject - a term, Thing this should be linked to when made. Optional.
// @param predicate - a term, the relationship for the subject link. Optional.
// @param theClass - an RDFS class containng the object about which the new information is.
// @param form  - the form to be used when a new one. null means please find one.
// @param dataDoc - The web document being edited
// @param callbackFunction - takes (boolean ok, string errorBody)
// @returns a dom object with the form DOM
*/


function promptForNew(dom, kb, subject, predicate, theClass, form, dataDoc, callbackFunction) {
  var box = dom.createElement('form');

  if (!form) {
    var lists = findClosest(kb, theClass.uri, ns.ui('creationForm'));

    if (lists.length === 0) {
      var p = box.appendChild(dom.createElement('p'));
      p.textContent = 'I am sorry, you need to provide information about a ' + utils.label(theClass) + " but I don't know enough information about those to ask you.";
      var b = box.appendChild(dom.createElement('button'));
      b.setAttribute('type', 'button');
      b.setAttribute('style', 'float: right;');
      b.innerHTML = 'Goto ' + utils.label(theClass);
      b.addEventListener('click', function (_e) {
        dom.outlineManager.GotoSubject(theClass, true, undefined, true, undefined);
      }, false);
      return box;
    }

    log.debug('lists[0] is ' + lists[0]);
    form = lists[0]; // Pick any one
  }

  log.debug('form is ' + form);
  box.setAttribute('style', "border: 0.05em solid ".concat(style.formBorderColor, "; color: ").concat(style.formBorderColor)); // @@color?

  box.innerHTML = '<h3>New ' + utils.label(theClass) + '</h3>';
  var formFunction = (0, _fieldFunction.fieldFunction)(dom, form);
  var object = newThing(dataDoc);
  var gotButton = false;

  var itemDone = function itemDone(ok, body) {
    if (!ok) return callbackFunction(ok, body);
    var insertMe = [];

    if (subject && !kb.holds(subject, predicate, object, dataDoc)) {
      insertMe.push($rdf.st(subject, predicate, object, dataDoc));
    }

    if (subject && !kb.holds(object, ns.rdf('type'), theClass, dataDoc)) {
      insertMe.push($rdf.st(object, ns.rdf('type'), theClass, dataDoc));
    }

    if (insertMe.length) {
      kb.updater.update([], insertMe, linkDone);
    } else {
      callbackFunction(true, body);
    }

    if (!gotButton) {
      gotButton = box.appendChild(buttons.linkButton(dom, object));
    } // tabulator.outline.GotoSubject(object, true, undefined, true, undefined)

  };

  function linkDone(uri, ok, body) {
    return callbackFunction(ok, body);
  }

  log.info('paneUtils Object is ' + object);
  var f = formFunction(dom, box, {}, object, form, dataDoc, itemDone);
  var rb = buttons.removeButton(dom, f);
  rb.setAttribute('style', 'float: right;');
  box.AJAR_subject = object;
  return box;
}

function makeDescription(dom, kb, subject, predicate, dataDoc, callbackFunction) {
  var group = dom.createElement('div');
  var desc = kb.anyJS(subject, predicate, null, dataDoc) || '';
  var field = dom.createElement('textarea');
  group.appendChild(field);
  field.rows = desc ? desc.split('\n').length + 2 : 2;
  field.cols = 80;
  field.setAttribute('style', style.multilineTextInputStyle);

  if (desc !== null) {
    field.value = desc;
  } else {
    // Unless you can make the predicate label disappear with the first click then this is over-cute
    // field.value = utils.label(predicate); // Was"enter a description here"
    field.select(); // Select it ready for user input -- doesn't work
  }

  group.refresh = function () {
    var v = kb.any(subject, predicate, null, dataDoc);

    if (v && v.value !== field.value) {
      field.value = v.value; // don't touch widget if no change
      // @@ this is the place to color the field from the user who chanaged it
    }
  };

  function saveChange(_e) {
    submit.disabled = true;
    submit.setAttribute('style', 'visibility: hidden; float: right;'); // Keep UI clean

    field.disabled = true;
    field.setAttribute('style', style + 'color: gray;'); // pending

    var ds = kb.statementsMatching(subject, predicate, null, dataDoc);
    var is = $rdf.st(subject, predicate, field.value, dataDoc);
    kb.updater.update(ds, is, function (uri, ok, body) {
      if (ok) {
        field.setAttribute('style', style + 'color: black;');
        field.disabled = false;
      } else {
        group.appendChild((0, _error.errorMessageBlock)(dom, 'Error (while saving change to ' + dataDoc.uri + '): ' + body));
      }

      if (callbackFunction) {
        callbackFunction(ok, body);
      }
    });
  }

  var br = dom.createElement('br');
  group.appendChild(br);
  var editable = kb.updater.editable(dataDoc.uri);

  if (editable) {
    var submit = dom.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.disabled = true; // until the filled has been modified

    submit.setAttribute('style', 'visibility: hidden; float: right;'); // Keep UI clean

    submit.value = 'Save ' + utils.label(predicate); // @@ I18n

    group.appendChild(submit);
    field.addEventListener('keyup', function (_e) {
      // Green means has been changed, not saved yet
      field.setAttribute('style', style + 'color: green;');

      if (submit) {
        submit.disabled = false;
        submit.setAttribute('style', 'float: right;'); // Remove visibility: hidden
      }
    }, true);
    field.addEventListener('change', saveChange, true);
    submit.addEventListener('click', saveChange, false);
  } else {
    field.disabled = true; // @@ change color too

    field.style.backgroundColor = style.textInputBackgroundColorUneditable;
  }

  return group;
}
/** Make SELECT element to select options
//
// @param subject - a term, the subject of the statement(s) being edited.
// @param predicate - a term, the predicate of the statement(s) being edited
// @param possible - a list of terms, the possible value the object can take
// @param options.multiple - Boolean - Whether more than one at a time is allowed
// @param options.nullLabel - a string to be displayed as the
//                        option for none selected (for non multiple)
// @param options.mint - User may create thing if this sent to the prompt string eg "New foo"
// @param options.subForm - If mint, then the form to be used for minting the new thing
// @param dataDoc - The web document being edited
// @param callbackFunction - takes (boolean ok, string errorBody)
*/


function makeSelectForOptions(dom, kb, subject, predicate, possible, options, dataDoc, callbackFunction) {
  log.debug('Select list length now ' + possible.length);
  var n = 0;
  var uris = {}; // Count them

  var editable = kb.updater.editable(dataDoc.uri);

  for (var i = 0; i < possible.length; i++) {
    var sub = possible[i]; // @@ Maybe; make this so it works with blank nodes too

    if (!sub.uri) debug.warn("makeSelectForOptions: option does not have an uri: ".concat(sub, ", with predicate: ").concat(predicate));
    if (!sub.uri || sub.uri in uris) continue;
    uris[sub.uri] = true;
    n++;
  } // uris is now the set of possible options


  if (n === 0 && !options.mint) {
    return (0, _error.errorMessageBlock)(dom, "Can't do selector with no options, subject= " + subject + ' property = ' + predicate + '.');
  }

  if (options.mint && !options.subForm) {
    return (0, _error.errorMessageBlock)(dom, "Selector: can't mint new with no subform.");
  }

  log.debug('makeSelectForOptions: dataDoc=' + dataDoc);

  var getActual = function getActual() {
    actual = {};

    if (predicate.sameTerm(ns.rdf('type'))) {
      actual = kb.findTypeURIs(subject);
    } else {
      kb.each(subject, predicate, null, dataDoc).forEach(function (x) {
        actual[x.uri] = true;
      });
    }

    return actual;
  };

  var actual = getActual(); // var newObject = null

  var onChange = function onChange(_e) {
    select.disabled = true; // until data written back - gives user feedback too

    var ds = [];
    var is = [];

    var removeValue = function removeValue(t) {
      if (kb.holds(subject, predicate, t, dataDoc)) {
        ds.push($rdf.st(subject, predicate, t, dataDoc));
      }
    };

    for (var _i = 0; _i < select.options.length; _i++) {
      var opt = select.options[_i];

      if (opt.selected && opt.AJAR_mint) {
        var newObject;

        if (options.mintClass) {
          var thisForm = promptForNew(dom, kb, subject, predicate, options.mintClass, null, dataDoc, function (ok, body) {
            if (!ok) {
              callbackFunction(ok, body, {
                change: 'new'
              }); // @@ if ok, need some form of refresh of the select for the new thing
            }
          });
          select.parentNode.appendChild(thisForm);
          newObject = thisForm.AJAR_subject;
        } else {
          newObject = newThing(dataDoc);
        }

        is.push($rdf.st(subject, predicate, newObject, dataDoc));

        if (options.mintStatementsFun) {
          is = is.concat(options.mintStatementsFun(newObject));
        }
      }

      if (!opt.AJAR_uri) continue; // a prompt or mint

      if (opt.selected && !(opt.AJAR_uri in actual)) {
        // new class
        is.push($rdf.st(subject, predicate, kb.sym(opt.AJAR_uri), dataDoc));
      }

      if (!opt.selected && opt.AJAR_uri in actual) {
        // old class
        removeValue(kb.sym(opt.AJAR_uri)); // ds.push($rdf.st(subject, predicate, kb.sym(opt.AJAR_uri), dataDoc ))
      }

      if (opt.selected) select.currentURI = opt.AJAR_uri;
    }

    var sel = select.subSelect; // All subclasses must also go

    while (sel && sel.currentURI) {
      removeValue(kb.sym(sel.currentURI));
      sel = sel.subSelect;
    }

    sel = select.superSelect; // All superclasses are redundant

    while (sel && sel.currentURI) {
      removeValue(kb.sym(sel.currentURI));
      sel = sel.superSelect;
    }

    function doneNew(ok, _body) {
      callbackFunction(ok, {
        widget: 'select',
        event: 'new'
      });
    }

    log.info('selectForOptions: data doc = ' + dataDoc);
    kb.updater.update(ds, is, function (uri, ok, body) {
      actual = getActual(); // refresh
      // kb.each(subject, predicate, null, dataDoc).map(function(x){actual[x.uri] = true})

      if (ok) {
        select.disabled = false; // data written back

        if (newObject) {
          var fn = (0, _fieldFunction.fieldFunction)(dom, options.subForm);
          fn(dom, select.parentNode, {}, newObject, options.subForm, dataDoc, doneNew);
        }
      } else {
        return select.parentNode.appendChild((0, _error.errorMessageBlock)(dom, 'Error updating data in select: ' + body));
      }

      if (callbackFunction) callbackFunction(ok, {
        widget: 'select',
        event: 'change'
      });
    });
  };

  var select = dom.createElement('select');
  select.setAttribute('style', 'margin: 0.6em 1.5em;');
  if (options.multiple) select.setAttribute('multiple', 'true');
  select.currentURI = null;

  select.refresh = function () {
    actual = getActual(); // refresh

    for (var _i2 = 0; _i2 < select.children.length; _i2++) {
      var option = select.children[_i2];

      if (option.AJAR_uri) {
        option.selected = option.AJAR_uri in actual;
      }
    }

    select.disabled = false; // unlocked any conflict we had got into
  };

  for (var uri in uris) {
    var c = kb.sym(uri);
    var option = dom.createElement('option');

    if (options.disambiguate) {
      option.appendChild(dom.createTextNode(utils.labelWithOntology(c, true))); // Init. cap
    } else {
      option.appendChild(dom.createTextNode(utils.label(c, true))); // Init.
    }

    var backgroundColor = kb.any(c, kb.sym('http://www.w3.org/ns/ui#backgroundColor'));

    if (backgroundColor) {
      option.setAttribute('style', 'background-color: ' + backgroundColor.value + '; ');
    }

    option.AJAR_uri = uri;

    if (uri in actual) {
      option.setAttribute('selected', 'true');
      select.currentURI = uri; // dump("Already in class: "+ uri+"\n")
    }

    select.appendChild(option);
  }

  if (editable && options.mint) {
    var mint = dom.createElement('option');
    mint.appendChild(dom.createTextNode(options.mint));
    mint.AJAR_mint = true; // Flag it

    select.insertBefore(mint, select.firstChild);
  }

  if (select.currentURI == null && !options.multiple) {
    var prompt = dom.createElement('option');
    prompt.appendChild(dom.createTextNode(options.nullLabel));
    select.insertBefore(prompt, select.firstChild);
    prompt.selected = true;
  }

  if (editable) {
    select.addEventListener('change', onChange, false);
  }

  return select;
} // makeSelectForOptions
// Make SELECT element to select subclasses
//
// If there is any disjoint union it will so a mutually exclusive dropdown
// Failing that it will do a multiple selection of subclasses.
// Callback takes (boolean ok, string errorBody)


function makeSelectForCategory(dom, kb, subject, category, dataDoc, callbackFunction) {
  var du = kb.any(category, ns.owl('disjointUnionOf'));
  var subs;
  var multiple = false;

  if (!du) {
    subs = kb.each(undefined, ns.rdfs('subClassOf'), category);
    multiple = true;
  } else {
    subs = du.elements;
  }

  log.debug('Select list length ' + subs.length);

  if (subs.length === 0) {
    return (0, _error.errorMessageBlock)(dom, "Can't do " + (multiple ? 'multiple ' : '') + 'selector with no subclasses of category: ' + category);
  }

  if (subs.length === 1) {
    return (0, _error.errorMessageBlock)(dom, "Can't do " + (multiple ? 'multiple ' : '') + 'selector with only 1 subclass of category: ' + category + ':' + subs[1]);
  }

  return makeSelectForOptions(dom, kb, subject, ns.rdf('type'), subs, {
    multiple: multiple,
    nullPrompt: '--classify--'
  }, dataDoc, callbackFunction);
}
/** Make SELECT element to select subclasses recurively
//
// It will so a mutually exclusive dropdown, with another if there are nested
// disjoint unions.
//
// @param  callbackFunction takes (boolean ok, string errorBody)
*/


function makeSelectForNestedCategory(dom, kb, subject, category, dataDoc, callbackFunction) {
  function update() {
    // log.info("Selected is now: "+select.currentURI)
    if (child) {
      container.removeChild(child);
      child = null;
    }

    if (select.currentURI && kb.any(kb.sym(select.currentURI), ns.owl('disjointUnionOf'))) {
      child = makeSelectForNestedCategory(dom, kb, subject, kb.sym(select.currentURI), dataDoc, callbackFunction);
      select.subSelect = child.firstChild;
      select.subSelect.superSelect = select;
      container.appendChild(child);
    }
  }

  var container = dom.createElement('span'); // Container

  var child = null;

  function onChange(ok, body) {
    if (ok) update();
    callbackFunction(ok, body);
  } // eslint-disable-next-line prefer-const


  var select = makeSelectForCategory(dom, kb, subject, category, dataDoc, onChange);
  container.appendChild(select);
  update();
  return container;
}
/*  Build a checkbox from a given statement(s)
 **
 **  If the source document is editable, make the checkbox editable
 **
 **  ins and sel are either statements *or arrays of statements* which should be
 **  made if the checkbox is checed and unchecked respectively.
 **  tristate: Allow ins, or del, or neither
 */


function buildCheckboxForm(dom, kb, lab, del, ins, form, dataDoc, tristate) {
  // 20190115
  var box = dom.createElement('div');
  var tx = dom.createTextNode(lab);
  var editable = kb.updater.editable(dataDoc.uri);
  tx.style = style.checkboxStyle;
  box.appendChild(tx);
  var input; // eslint-disable-next-line prefer-const

  input = dom.createElement('button');
  input.setAttribute('style', 'font-size: 150%; height: 1.2em; width: 1.2em; background-color: #eef; margin: 0.1em');
  box.appendChild(input);

  function fix(x) {
    if (!x) return []; // no statements

    if (x.object) {
      if (!x.why) {
        x.why = dataDoc; // be back-compaitible  with old code
      }

      return [x]; // one statements
    }

    if (x instanceof Array) return x;
    throw new Error('buildCheckboxForm: bad param ' + x);
  }

  ins = fix(ins);
  del = fix(del);

  function holdsAll(a) {
    var missing = a.filter(function (st) {
      return !kb.holds(st.subject, st.predicate, st.object, st.why);
    });
    return missing.length === 0;
  }

  function refresh() {
    var state = holdsAll(ins);
    var displayState = state;

    if (del.length) {
      var negation = holdsAll(del);

      if (state && negation) {
        box.appendChild(widgets.errorMessageBlock(dom, 'Inconsistent data in dataDoc!\n' + ins + ' and\n' + del));
        return box;
      }

      if (!state && !negation) {
        state = null;
        var defa = kb.any(form, ns.ui('default'));
        displayState = defa ? defa.value === '1' : tristate ? null : false;
      }
    }

    input.state = state;
    input.textContent = {
      "true": checkMarkCharacter,
      "false": tristate ? cancelCharacter : ' ',
      // Just use blank when not tristate
      "null": dashCharacter
    }[displayState];
  }

  refresh();
  if (!editable) return box;

  var boxHandler = function boxHandler(_e) {
    tx.style = 'color: #bbb;'; // grey -- not saved yet

    var toDelete = input.state === true ? ins : input.state === false ? del : [];
    input.newState = input.state === null ? true : input.state === true ? false : tristate ? null : true;
    var toInsert = input.newState === true ? ins : input.newState === false ? del : [];
    debug.log("  Deleting  ".concat(toDelete));
    debug.log("  Inserting ".concat(toInsert));
    kb.updater.update(toDelete, toInsert, function (uri, success, errorBody) {
      if (!success) {
        if (toDelete.why) {
          var hmmm = kb.holds(toDelete.subject, toDelete.predicate, toDelete.object, toDelete.why);

          if (hmmm) {
            debug.log(' @@@@@ weird if 409 - does hold statement');
          }
        }

        tx.style = 'color: #black; background-color: #fee;';
        box.appendChild((0, _error.errorMessageBlock)(dom, "Checkbox: Error updating dataDoc from ".concat(input.state, " to ").concat(input.newState, ":\n\n").concat(errorBody)));
      } else {
        tx.style = 'color: #black;';
        input.state = input.newState;
        input.textContent = {
          "true": checkMarkCharacter,
          "false": cancelCharacter,
          "null": dashCharacter
        }[input.state]; // @@
      }
    });
  };

  input.addEventListener('click', boxHandler, false);
  return box;
}

function fieldLabel(dom, property, form) {
  var lab = kb.any(form, ns.ui('label'));
  if (!lab) lab = utils.label(property, true); // Init capital

  if (property === undefined) {
    return dom.createTextNode('@@Internal error: undefined property');
  }

  var anchor = dom.createElement('a');
  if (property.uri) anchor.setAttribute('href', property.uri);
  anchor.setAttribute('style', 'color: #3B5998; text-decoration: none;'); // Not too blue and no underline

  anchor.textContent = lab;
  return anchor;
}

function fieldStore(subject, predicate, def) {
  var sts = kb.statementsMatching(subject, predicate);
  if (sts.length === 0) return def; // can used default as no data yet

  if (sts.length > 0 && sts[0].why.uri && kb.updater.editable(sts[0].why.uri)) {
    return kb.sym(sts[0].why.uri);
  }

  return def;
}
/** Mint local ID using timestamp
 * @param {NamedNode} doc - the document in which the ID is to be generated
 */


function newThing(doc) {
  var now = new Date();
  return $rdf.sym(doc.uri + '#' + 'id' + ('' + now.getTime()));
}
//# sourceMappingURL=forms.js.map