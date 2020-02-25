"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/*       F O R M S
 *
 *      A Vanilla Dom implementation of the form language
 */

/* global alert */
module.exports = {};
var forms = {};
forms.field = {}; // Form field functions by URI of field type.

var UI = {
  icons: require('../iconBase'),
  log: require('../log'),
  ns: require('../ns'),
  store: require('../store'),
  style: require('../style'),
  widgets: forms
};

var $rdf = require('rdflib');

var error = require('./error');

var buttons = require('./buttons');

var ns = require('../ns');

var utils = require('../utils');

var checkMarkCharacter = "\u2713";
var cancelCharacter = "\u2715";
var dashCharacter = '-'; // ///////////////////////////////////////////////////////////////////////

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
 ** @param {Node} store The web document in which the data is
 ** @param {function(ok, errorMessage)} callbackFunction Called when data is changed?
 **
 ** @returns {Element} The HTML widget created
 */

forms.field[ns.ui('Form').uri] = forms.field[ns.ui('Group').uri] = function (dom, container, already, subject, form, store, callbackFunction) {
  var kb = UI.store;
  var box = dom.createElement('div');
  box.setAttribute('style', "padding-left: 2em; border: 0.05em solid ".concat(UI.style.formBorderColor, ";")); // Indent a group

  var ui = UI.ns.ui;
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
  var parts = kb.any(form, ui('parts'));
  var p2;

  if (parts) {
    p2 = parts.elements;
  } else {
    parts = kb.each(form, ui('part')); //  Warning: unordered

    p2 = forms.sortBySequence(parts);
  }

  if (!parts) {
    box.appendChild(error.errorMessageBlock(dom, 'No parts to form! '));
    return dom;
  }

  var eles = [];
  var original = [];

  for (var i = 0; i < p2.length; i++) {
    var field = p2[i];
    var t = forms.mostSpecificClassURI(field); // Field type

    if (t === ui('Options').uri) {
      var dep = kb.any(field, ui('dependingOn'));
      if (dep && kb.any(subject, dep)) original[i] = kb.any(subject, dep).toNT();
    }

    var fn = forms.fieldFunction(dom, field);

    var itemChanged = function itemChanged(ok, body) {
      if (ok) {
        for (var j = 0; j < p2.length; j++) {
          // This is really messy.
          var field = p2[j];
          var t = forms.mostSpecificClassURI(field); // Field type

          if (t === ui('Options').uri) {
            var dep = kb.any(field, ui('dependingOn'));
            var newOne = fn(dom, box, already, subject, field, store, callbackFunction);
            box.removeChild(newOne);
            box.insertBefore(newOne, eles[j]);
            box.removeChild(eles[j]);
            original[j] = kb.any(subject, dep).toNT();
            eles[j] = newOne;
          }
        }
      }

      callbackFunction(ok, body);
    };

    eles.push(fn(dom, box, already2, subject, field, store, itemChanged));
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
 ** @param {Node} store The web document in which the data is
 ** @param {function(ok, errorMessage)} callbackFunction Called when data is changed?
 **
 ** @returns {Element} The HTML widget created
 */


forms.field[ns.ui('Options').uri] = function (dom, container, already, subject, form, store, callbackFunction) {
  var kb = UI.store;
  var box = dom.createElement('div'); // box.setAttribute('style', 'padding-left: 2em; border: 0.05em dotted purple;')  // Indent Options

  var ui = UI.ns.ui;
  if (container) container.appendChild(box);
  var dependingOn = kb.any(form, ui('dependingOn'));

  if (!dependingOn) {
    dependingOn = ns.rdf('type');
  } // @@ default to type (do we want defaults?)


  var cases = kb.each(form, ui('case'));

  if (!cases) {
    box.appendChild(error.errorMessageBlock(dom, 'No cases to Options form. '));
  }

  var values;

  if (dependingOn.sameTerm(ns.rdf('type'))) {
    values = kb.findTypeURIs(subject);
  } else {
    var value = kb.any(subject, dependingOn);

    if (value === undefined) {
      box.appendChild(error.errorMessageBlock(dom, "Can't select subform as no value of: " + dependingOn));
    } else {
      values = {};
      values[value.uri] = true;
    }
  } // @@ Add box.refresh() to sync fields with values


  for (var i = 0; i < cases.length; i++) {
    var c = cases[i];
    var tests = kb.each(c, ui('for')); // There can be multiple 'for'

    for (var j = 0; j < tests.length; j++) {
      if (values[tests[j].uri]) {
        var field = kb.the(c, ui('use'));

        if (!field) {
          box.appendChild(error.errorMessageBlock(dom, 'No "use" part for case in form ' + form));
          return box;
        } else {
          forms.appendForm(dom, box, already, subject, field, store, callbackFunction);
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
 ** @param {Node} store The web document in which the data is
 ** @param {function(ok, errorMessage)} callbackFunction Called when data is changed?
 **
 ** @returns {Element} The HTML widget created
 */


forms.field[ns.ui('Multiple').uri] = function (dom, container, already, subject, form, store, callbackFunction) {
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


  function addItem(_x) {
    return _addItem.apply(this, arguments);
  }
  /** Make a dom representation for an item
   * @param {Event} anyEvent if used as an event handler
   * @param {Node} object The RDF object to be represented by this item.
   */


  function _addItem() {
    _addItem = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6(object) {
      var toBeInserted, msg;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!object) object = forms.newThing(store); // by default just add new nodes

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
              toBeInserted = [$rdf.st(subject, property, object, store)];
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
              box.appendChild(error.errorMessageBlock(dom, msg));
              console.error(msg);

            case 19:
              refresh(); // 20191213

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
      _deleteThisItem = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        var i, del;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!ordered) {
                  _context3.next = 14;
                  break;
                }

                console.log('pre delete: ' + debugString(list.elements));
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
                if (kb.holds(subject, property, object)) {
                  del = [$rdf.st(subject, property, object, store)];
                  kb.updater.update(del, [], function (uri, ok, message) {
                    if (ok) {
                      body.removeChild(subField);
                    } else {
                      body.appendChild(error.errorMessageBlock(dom, 'Multiple: delete failed: ' + message));
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

    function moveThisItem(_x2, _x3) {
      return _moveThisItem.apply(this, arguments);
    }
    /* A subField has been filled in
    *
    * One possibility is to not actually make the link to the thing until
    * this callback happens to avoid widow links
     */


    function _moveThisItem() {
      _moveThisItem = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(event, upwards) {
        var i;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // @@ possibly, allow shift+click to do move to top or bottom?
                console.log('pre move: ' + debugString(list.elements));
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

    function itemDone(uri, ok, message) {
      console.log("Item ".concat(uri, " done callback for item ").concat(object.uri.slice(-7)));

      if (!ok) {
        // when does this happen? errors typically deal with upstream
        console.error('  Item done callback: Error: ' + message);
      } else {
        linkDone(uri, ok, message);
      }
      /*  Put this as a function and call it from only one place
      var ins, del
      // alert('Multiple: item calklback.' + uri)
      if (ok) {
        // @@@ Check IT hasnt alreday been written in
        if (ordered) {
          list = kb.any(subject, property, null, store)
          if (!list) {
            list = new $rdf.Collection([object])
            ins = [$rdf.st(subject, property, list)] // Will this work?
          } else {
            const oldList = new $rdf.Collection(list.elments)
            list.append(object)
            del = [$rdf.st(subject, property, oldList)] // If this doesn't work, kb.saveBack(store)
            ins = [$rdf.st(subject, property, list)]
          }
        } else {
          if (!kb.holds(subject, property, object, store)) {
            ins = [$rdf.st(subject, property, object, store)]
          }
          kb.updater.update(del, ins, linkDone)
        }
      } else {
        box.appendChild(
          error.errorMessageBlock(dom, 'Multiple: item failed: ' + body)
        )
        callbackFunction(ok, message)
      }
      */

    }

    var linkDone = function linkDone(uri, ok, message) {
      return callbackFunction(ok, message);
    }; // if (!object) object = forms.newThing(store)


    UI.log.debug('Multiple: render object: ' + object); // var tr = box.insertBefore(dom.createElement('tr'), tail)
    // var ins = []
    // var del = []

    var fn = forms.fieldFunction(dom, element);
    var subField = fn(dom, null, already, object, element, store, itemDone); // p2 was: body.  moving to not passing that

    subField.subject = object; // Keep a back pointer between the DOM array and the RDF objects
    // delete button and move buttons

    if (kb.updater.editable(store.uri)) {
      buttons.deleteButtonWithCheck(dom, subField, utils.label(property), deleteThisItem);

      if (ordered) {
        subField.appendChild(buttons.button(dom, UI.icons.iconBase + 'noun_1369237.svg', 'Move Up',
        /*#__PURE__*/
        function () {
          var _ref = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/
          _regenerator["default"].mark(function _callee(event) {
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

          return function (_x4) {
            return _ref.apply(this, arguments);
          };
        }()));
        subField.appendChild(buttons.button(dom, UI.icons.iconBase + 'noun_1369241.svg', 'Move Down',
        /*#__PURE__*/
        function () {
          var _ref2 = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/
          _regenerator["default"].mark(function _callee2(event) {
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

          return function (_x5) {
            return _ref2.apply(this, arguments);
          };
        }()));
      }
    }

    return subField; // unused
  } // renderItem
  /// ///////// Body of form field implementation


  var plusIconURI = UI.icons.iconBase + 'noun_19460_green.svg'; // white plus in green circle

  var kb = UI.store;
  kb.updater = kb.updater || new $rdf.UpdateManager(kb);
  var box = dom.createElement('table'); // We don't indent multiple as it is a sort of a prefix of the next field and has contents of one.
  // box.setAttribute('style', 'padding-left: 2em; border: 0.05em solid green;')  // Indent a multiple

  var ui = UI.ns.ui;
  if (container) container.appendChild(box);
  var orderedNode = kb.any(form, ui('ordered'));
  var ordered = orderedNode ? $rdf.Node.toJS(orderedNode) : false;
  var property = kb.any(form, ui('property'));

  if (!property) {
    box.appendChild(error.errorMessageBlock(dom, 'No property to multiple: ' + form)); // used for arcs in the data

    return box;
  }

  var min = kb.any(form, ui('min')); // This is the minimum number -- default 0

  min = min ? 0 + min.value : 0; // var max = kb.any(form, ui('max')) // This is the minimum number
  // max = max ? max.value : 99999999

  var element = kb.any(form, ui('part')); // This is the form to use for each one

  if (!element) {
    box.appendChild(error.errorMessageBlock(dom, 'No part to multiple: ' + form));
    return box;
  }

  var body = box.appendChild(dom.createElement('tr')); // 20191207

  var list; // The RDF collection which keeps the ordered version

  var values; // Initial values - an array.  Even when no list yet.
  // var unsavedList = false // Flag that

  if (ordered) {
    list = kb.any(subject, property);

    if (list) {
      values = list.elements;
    } else {
      // unsavedList = true
      values = [];
    }
  } else {
    values = kb.each(subject, property);
    list = null;
  } // Add control on the bottom for adding more items


  if (kb.updater.editable(store.uri)) {
    var tail = box.appendChild(dom.createElement('tr'));
    tail.style.padding = '0.5em';
    var img = tail.appendChild(dom.createElement('img'));
    img.setAttribute('src', plusIconURI); //  plus sign

    img.setAttribute('style', 'margin: 0.2em; width: 1.5em; height:1.5em');
    img.title = 'Click to add one or more ' + utils.label(property);
    var prompt = tail.appendChild(dom.createElement('span'));
    prompt.textContent = (values.length === 0 ? 'Add one or more ' : 'Add more ') + utils.label(property);
    tail.addEventListener('click',
    /*#__PURE__*/
    function () {
      var _ref3 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(_eventNotUsed) {
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

      return function (_x6) {
        return _ref3.apply(this, arguments);
      };
    }(), true);
  }

  function createListIfNecessary() {
    if (!list) {
      list = new $rdf.Collection();
      kb.add(subject, property, list, store);
    }
  }

  function saveListThenRefresh() {
    return _saveListThenRefresh.apply(this, arguments);
  }

  function _saveListThenRefresh() {
    _saveListThenRefresh = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7() {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              console.log('save list: ' + debugString(list.elements)); // 20191214

              createListIfNecessary();
              _context7.prev = 2;
              _context7.next = 5;
              return kb.fetcher.putBack(store);

            case 5:
              _context7.next = 11;
              break;

            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](2);
              box.appendChild(error.errorMessageBlock(dom, 'Error trying to put back a list: ' + _context7.t0));
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
      var li = kb.the(subject, property);
      vals = li ? li.elements : [];
    } else {
      vals = kb.each(subject, property);
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
    _asyncStuff = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee8() {
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

              console.log('Adding extra: min ' + min);
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
    console.log(' Multiple render: async stuff ok');
  }, function (err) {
    console.error(' Multiple render: async stuff fails. #### ', err);
  }); // async

  return box;
}; // Multiple

/*          Text field
 **
 */
// For possible date popups see e.g. http://www.dynamicdrive.com/dynamicindex7/jasoncalendar.htm
// or use HTML5: http://www.w3.org/TR/2011/WD-html-markup-20110113/input.date.html
//


forms.fieldParams = {};
forms.fieldParams[ns.ui('ColorField').uri] = {
  size: 9,
  type: 'color',
  dt: 'color'
}; // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color

forms.fieldParams[ns.ui('ColorField').uri].pattern = /^\s*#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]([0-9a-f][0-9a-f])?\s*$/;
forms.fieldParams[ns.ui('DateField').uri] = {
  size: 20,
  type: 'date',
  dt: 'date'
};
forms.fieldParams[ns.ui('DateField').uri].pattern = /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?Z?\s*$/;
forms.fieldParams[ns.ui('DateTimeField').uri] = {
  size: 20,
  type: 'date',
  dt: 'dateTime'
};
forms.fieldParams[ns.ui('DateTimeField').uri].pattern = /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?(T[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?)?Z?\s*$/;
forms.fieldParams[ns.ui('TimeField').uri] = {
  size: 10,
  type: 'time',
  dt: 'time'
};
forms.fieldParams[ns.ui('TimeField').uri].pattern = /^\s*([0-2]?[0-9]:[0-5][0-9](:[0-5][0-9])?)\s*$/;
forms.fieldParams[ns.ui('IntegerField').uri] = {
  size: 12,
  style: 'text-align: right',
  dt: 'integer'
};
forms.fieldParams[ns.ui('IntegerField').uri].pattern = /^\s*-?[0-9]+\s*$/;
forms.fieldParams[ns.ui('DecimalField').uri] = {
  size: 12,
  style: 'text-align: right',
  dt: 'decimal'
};
forms.fieldParams[ns.ui('DecimalField').uri].pattern = /^\s*-?[0-9]*(\.[0-9]*)?\s*$/;
forms.fieldParams[ns.ui('FloatField').uri] = {
  size: 12,
  style: 'text-align: right',
  dt: 'float'
};
forms.fieldParams[ns.ui('FloatField').uri].pattern = /^\s*-?[0-9]*(\.[0-9]*)?((e|E)-?[0-9]*)?\s*$/;
forms.fieldParams[ns.ui('SingleLineTextField').uri] = {};
forms.fieldParams[ns.ui('NamedNodeURIField').uri] = {
  namedNode: true
};
forms.fieldParams[ns.ui('TextField').uri] = {};
forms.fieldParams[ns.ui('PhoneField').uri] = {
  size: 20,
  uriPrefix: 'tel:'
};
forms.fieldParams[ns.ui('PhoneField').uri].pattern = /^\+?[\d-]+[\d]*$/;
forms.fieldParams[ns.ui('EmailField').uri] = {
  size: 30,
  uriPrefix: 'mailto:'
};
forms.fieldParams[ns.ui('EmailField').uri].pattern = /^\s*.*@.*\..*\s*$/; // @@ Get the right regexp here

/** Render a basic form field
 *
 ** @param {Document} dom The HTML Document object aka Document Object Model
 ** @param {Element?} container  If present, the created widget will be appended to this
 ** @param {Map} already A hash table of (form, subject) kept to prevent recursive forms looping
 ** @param {Node} subject The thing about which the form displays/edits data
 ** @param {Node} form The form or field to be rendered
 ** @param {Node} store The web document in which the data is
 ** @param {function(ok, errorMessage)} callbackFunction Called when data is changed?
 **
 ** @returns {Element} The HTML widget created
 **
 ** The same function is used for many similar one-value fields, with different
 ** regexps used to validate.
 */

function basicField(dom, container, already, subject, form, store, callbackFunction) {
  var ui = UI.ns.ui;
  var kb = UI.store;
  var box = dom.createElement('tr');
  if (container) container.appendChild(box);
  var lhs = dom.createElement('td');
  lhs.setAttribute('class', 'formFieldName');
  lhs.setAttribute('style', '  vertical-align: middle;');
  box.appendChild(lhs);
  var rhs = dom.createElement('td');
  rhs.setAttribute('class', 'formFieldValue');
  box.appendChild(rhs);
  var property = kb.any(form, ui('property'));

  if (!property) {
    box.appendChild(dom.createTextNode('Error: No property given for text field: ' + form));
    return box;
  }

  lhs.appendChild(forms.fieldLabel(dom, property, form));
  var uri = forms.mostSpecificClassURI(form);
  var params = forms.fieldParams[uri];
  if (params === undefined) params = {}; // non-bottom field types can do this

  var style = params.style || UI.style.textInputStyle || 'font-size: 100%; margin: 0.1em; padding: 0.1em;'; // box.appendChild(dom.createTextNode(' uri='+uri+', pattern='+ params.pattern))

  var field = dom.createElement('input');
  field.style = UI.style.textInputStyle; // Do we have to override length etc?

  rhs.appendChild(field);
  field.setAttribute('type', params.type ? params.type : 'text');
  var size = kb.any(form, ui('size')); // Form has precedence

  field.setAttribute('size', size ? '' + size : params.size ? '' + params.size : '20');
  var maxLength = kb.any(form, ui('maxLength'));
  field.setAttribute('maxLength', maxLength ? '' + maxLength : '4096');
  store = store || forms.fieldStore(subject, property, store);
  var obj = kb.any(subject, property, undefined, store);

  if (!obj) {
    obj = kb.any(form, ui('default'));
  }

  if (obj && obj.uri && params.uriPrefix) {
    // eg tel: or mailto:
    field.value = decodeURIComponent(obj.uri.replace(params.uriPrefix, '')) // should have no spaces but in case
    .replace(/ /g, '');
  } else if (obj) {
    field.value = obj.value || obj.uri || '';
  }

  field.setAttribute('style', style);

  if (!kb.updater.editable(store.uri)) {
    field.readonly = true; // was: disabled. readonly is better

    return box;
  } // read-write:


  field.addEventListener('keyup', function (_e) {
    if (params.pattern) {
      field.setAttribute('style', style + (field.value.match(params.pattern) ? 'color: green;' : 'color: red;'));
    }
  }, true);
  field.addEventListener('change', function (_e) {
    // i.e. lose focus with changed data
    if (params.pattern && !field.value.match(params.pattern)) return;
    field.disabled = true; // See if this stops getting two dates from fumbling e.g the chrome datepicker.

    field.setAttribute('style', style + 'color: gray;'); // pending

    var ds = kb.statementsMatching(subject, property); // remove any multiple values

    var result;

    if (params.namedNode) {
      result = kb.sym(field.value);
    } else if (params.uriPrefix) {
      result = encodeURIComponent(field.value.replace(/ /g, ''));
      result = kb.sym(params.uriPrefix + field.value);
    } else {
      if (params.dt) {
        result = new $rdf.Literal(field.value.trim(), undefined, ns.xsd(params.dt));
      } else {
        result = new $rdf.Literal(field.value);
      }
    }

    var is = ds.map(function (st) {
      return $rdf.st(st.subject, st.predicate, result, st.why);
    }); // can include >1 doc

    if (is.length === 0) {
      // or none
      is = [$rdf.st(subject, property, result, store)];
    }

    function updateMany(ds, is, callback) {
      var docs = [];
      is.forEach(function (st) {
        if (!docs.includes(st.why.uri)) docs.push(st.why.uri);
      });
      ds.forEach(function (st) {
        if (!docs.includes(st.why.uri)) docs.push(st.why.uri);
      });

      if (docs.length === 0) {
        throw new Error('updateMany has no docs to patch');
      }

      if (docs.length === 1) {
        return kb.updater.update(ds, is, callback);
      } // return kb.updater.update(ds, is, callback)


      var doc = docs.pop();
      var is1 = is.filter(function (st) {
        return st.why.uri === doc;
      });
      var is2 = is.filter(function (st) {
        return st.why.uri !== doc;
      });
      var ds1 = ds.filter(function (st) {
        return st.why.uri === doc;
      });
      var ds2 = ds.filter(function (st) {
        return st.why.uri !== doc;
      });
      kb.updater.update(ds1, is1, function (uri, ok, body) {
        if (ok) {
          updateMany(ds2, is2, callback);
        } else {
          console.log('Update many failed on: ' + doc);
          callback(uri, ok, body);
        }
      });
    }

    updateMany(ds, is, function (uri, ok, body) {
      // kb.updater.update(ds, is, function (uri, ok, body) {
      if (ok) {
        field.disabled = false;
        field.setAttribute('style', style);
      } else {
        box.appendChild(error.errorMessageBlock(dom, body));
      }

      callbackFunction(ok, body);
    });
  }, true);
  return box;
}

forms.field[ns.ui('PhoneField').uri] = basicField;
forms.field[ns.ui('EmailField').uri] = basicField;
forms.field[ns.ui('ColorField').uri] = basicField;
forms.field[ns.ui('DateField').uri] = basicField;
forms.field[ns.ui('DateTimeField').uri] = basicField;
forms.field[ns.ui('TimeField').uri] = basicField;
forms.field[ns.ui('NumericField').uri] = basicField;
forms.field[ns.ui('IntegerField').uri] = basicField;
forms.field[ns.ui('DecimalField').uri] = basicField;
forms.field[ns.ui('FloatField').uri] = basicField;
forms.field[ns.ui('TextField').uri] = basicField;
forms.field[ns.ui('SingleLineTextField').uri] = basicField;
forms.field[ns.ui('NamedNodeURIField').uri] = basicField;
/*          Multiline Text field
 **
 */

forms.field[ns.ui('MultiLineTextField').uri] = function (dom, container, already, subject, form, store, callbackFunction) {
  var ui = UI.ns.ui;
  var kb = UI.store;
  var property = kb.any(form, ui('property'));

  if (!property) {
    return error.errorMessageBlock(dom, 'No property to text field: ' + form);
  }

  var box = dom.createElement('div');
  box.appendChild(forms.fieldLabel(dom, property, form));
  store = forms.fieldStore(subject, property, store);
  var field = forms.makeDescription(dom, kb, subject, property, store, callbackFunction); // box.appendChild(dom.createTextNode('<-@@ subj:'+subject+', prop:'+property))

  box.appendChild(field);
  if (container) container.appendChild(box);
  return box;
};
/*          Boolean field  and Tri-state version (true/false/null)
 **
 ** @@ todo: remove tristate param
 */


function booleanField(dom, container, already, subject, form, store, callbackFunction, tristate) {
  var ui = UI.ns.ui;
  var kb = UI.store;
  var property = kb.any(form, ui('property'));

  if (!property) {
    var errorBlock = error.errorMessageBlock(dom, 'No property to boolean field: ' + form);
    if (container) container.appendChild(errorBlock);
    return errorBlock;
  }

  var lab = kb.any(form, ui('label'));
  if (!lab) lab = utils.label(property, true); // Init capital

  store = forms.fieldStore(subject, property, store);
  var state = kb.any(subject, property);

  if (state === undefined) {
    state = false;
  } // @@ sure we want that -- or three-state?
  // UI.log.debug('store is '+store)


  var ins = $rdf.st(subject, property, true, store);
  var del = $rdf.st(subject, property, false, store);
  var box = buildCheckboxForm(dom, kb, lab, del, ins, form, store, tristate);
  if (container) container.appendChild(box);
  return box;
}

forms.field[ns.ui('BooleanField').uri] = function (dom, container, already, subject, form, store, callbackFunction) {
  return booleanField(dom, container, already, subject, form, store, callbackFunction, false);
};

forms.field[ns.ui('TristateField').uri] = function (dom, container, already, subject, form, store, callbackFunction) {
  return booleanField(dom, container, already, subject, form, store, callbackFunction, true);
};
/*          Classifier field
 **
 **  Nested categories
 **
 ** @@ To do: If a classification changes, then change any dependent Options fields.
 */


forms.field[ns.ui('Classifier').uri] = function (dom, container, already, subject, form, store, callbackFunction) {
  var kb = UI.store;
  var ui = UI.ns.ui;
  var category = kb.any(form, ui('category'));

  if (!category) {
    return error.errorMessageBlock(dom, 'No category for classifier: ' + form);
  }

  UI.log.debug('Classifier: store=' + store);

  var checkOptions = function checkOptions(ok, body) {
    if (!ok) return callbackFunction(ok, body);
    /*
    var parent = kb.any(undefined, ui('part'), form)
    if (!parent) return callbackFunction(ok, body)
    var kids = kb.each(parent, ui('part')); // @@@@@@@@@ Garbage
    kids = kids.filter(function(k){return kb.any(k, ns.rdf('type'), ui('Options'))})
    if (kids.length) UI.log.debug('Yes, found related options: '+kids[0])
    */

    return callbackFunction(ok, body);
  };

  var box = forms.makeSelectForNestedCategory(dom, kb, subject, category, store, checkOptions);
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


forms.field[ns.ui('Choice').uri] = function (dom, container, already, subject, form, store, callbackFunction) {
  var ns = UI.ns;
  var ui = UI.ns.ui;
  var kb = UI.store;
  var multiple = false;
  var p;
  var box = dom.createElement('tr');
  if (container) container.appendChild(box);
  var lhs = dom.createElement('td');
  box.appendChild(lhs);
  var rhs = dom.createElement('td');
  box.appendChild(rhs);
  var property = kb.any(form, ui('property'));

  if (!property) {
    return error.errorMessageBlock(dom, 'No property for Choice: ' + form);
  }

  lhs.appendChild(forms.fieldLabel(dom, property, form));
  var from = kb.any(form, ui('from'));

  if (!from) {
    return error.errorMessageBlock(dom, "No 'from' for Choice: " + form);
  }

  var subForm = kb.any(form, ui('use')); // Optional

  var possible = [];
  var possibleProperties;
  var np = '--' + utils.label(property) + '-?';
  var opts = {
    multiple: multiple,
    nullLabel: np,
    disambiguate: false
  };
  possible = kb.each(undefined, ns.rdf('type'), from);

  for (var x in kb.findMembersNT(from)) {
    possible.push(kb.fromNT(x)); // box.appendChild(dom.createTextNode("RDFS: adding "+x))
  } // Use rdfs
  // UI.log.debug("%%% Choice field: possible.length 1 = "+possible.length)


  if (from.sameTerm(ns.rdfs('Class'))) {
    for (p in buttons.allClassURIs()) {
      possible.push(kb.sym(p));
    } // UI.log.debug("%%% Choice field: possible.length 2 = "+possible.length)

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
    forms.fieldFunction(dom, subForm)(dom, rhs, already, object, subForm, store, callbackFunction);
  } // box.appendChild(dom.createTextNode('Choice: subForm='+subForm))


  var possible2 = forms.sortByLabel(possible);

  if (kb.any(form, ui('canMintNew'))) {
    opts.mint = '* New *'; // @@ could be better

    opts.subForm = subForm;
  }

  var selector = forms.makeSelectForOptions(dom, kb, subject, property, possible2, opts, store, callbackFunction);
  rhs.appendChild(selector);
  if (object && subForm) addSubForm();
  return box;
}; //          Documentation - non-interactive fields
//


forms.fieldParams[ns.ui('Comment').uri] = {
  element: 'p',
  style: "padding: 0.1em 1.5em; color: ".concat(UI.style.formHeadingColor, "; white-space: pre-wrap;")
};
forms.fieldParams[ns.ui('Heading').uri] = {
  element: 'h3',
  style: "font-size: 110%; color: ".concat(UI.style.formHeadingColor, ";")
};

forms.field[ns.ui('Comment').uri] = forms.field[ns.ui('Heading').uri] = function (dom, container, already, subject, form, _store, _callbackFunction) {
  var ui = UI.ns.ui;
  var kb = UI.store;
  var contents = kb.any(form, ui('contents'));
  if (!contents) contents = 'Error: No contents in comment field.';
  var uri = forms.mostSpecificClassURI(form);
  var params = forms.fieldParams[uri];

  if (params === undefined) {
    params = {};
  } // non-bottom field types can do this


  var box = dom.createElement('div');
  if (container) container.appendChild(box);
  var p = box.appendChild(dom.createElement(params.element));
  p.textContent = contents;
  var style = kb.any(form, ui('style'));

  if (style === undefined) {
    style = params.style ? params.style : '';
  }

  if (style) p.setAttribute('style', style);
  return box;
}; /// ////////////// Form-related functions

/** Which class of field is this?
 * @param x a field
 * @returns the URI of the most specific class
 */


forms.mostSpecificClassURI = function (x) {
  var kb = UI.store;
  var ft = kb.findTypeURIs(x);
  var bot = kb.bottomTypeURIs(ft); // most specific

  var bots = [];

  for (var b in bot) {
    bots.push(b);
  } // if (bots.length > 1) throw "Didn't expect "+x+" to have multiple bottom types: "+bots


  return bots[0];
};

forms.fieldFunction = function (dom, field) {
  var uri = forms.mostSpecificClassURI(field); // What type
  // const uri = field.uri

  var fun = forms.field[uri];
  UI.log.debug('paneUtils: Going to implement field ' + field + ' of type ' + uri);

  if (!fun) {
    return function () {
      return error.errorMessageBlock(dom, 'No handler for field ' + field + ' of type ' + uri);
    };
  }

  return fun;
}; // A button for editing a form (in place, at the moment)
//
//  When editing forms, make it yellow, when editing thr form form, pink
// Help people understand how many levels down they are.
//


forms.editFormButton = function (dom, container, form, store, callbackFunction) {
  var b = dom.createElement('button');
  b.setAttribute('type', 'button');
  b.innerHTML = 'Edit ' + utils.label(ns.ui('Form'));
  b.addEventListener('click', function (_e) {
    var ff = forms.appendForm(dom, container, {}, form, ns.ui('FormForm'), store, callbackFunction);
    ff.setAttribute('style', ns.ui('FormForm').sameTerm(form) ? 'background-color: #fee;' : 'background-color: #ffffe7;');
    b.parentNode.removeChild(b);
  }, true);
  return b;
};

forms.appendForm = function (dom, container, already, subject, form, store, itemDone) {
  return forms.fieldFunction(dom, form)(dom, container, already, subject, form, store, itemDone);
};
/**          Find list of properties for class
//
// Three possible sources: Those mentioned in schemas, which exludes many
// those which occur in the data we already have, and those predicates we
// have come across anywhere and which are not explicitly excluded from
// being used with this class.
*/


forms.propertiesForClass = function (kb, c) {
  var ns = UI.ns;
  var explicit = kb.each(undefined, ns.rdf('range'), c);
  [ns.rdfs('comment'), ns.dc('title'), // Generic things
  ns.foaf('name'), ns.foaf('homepage')].map(function (x) {
    explicit.push(x);
  });
  var members = kb.each(undefined, ns.rdf('type'), c);
  if (members.length > 60) members = members.slice(0, 60); // Array supports slice?

  var used = {};

  for (var i = 0; i < (members.length > 60 ? 60 : members.length); i++) {
    kb.statementsMatching(members[i], undefined, undefined).map(function (st) {
      used[st.predicate.uri] = true;
    });
  }

  explicit.map(function (p) {
    used[p.uri] = true;
  });
  var result = [];

  for (var uri in used) {
    result.push(kb.sym(uri));
  }

  return result;
};
/** Find the closest class
* @param kb The store
* @param cla - the URI of the class
* @param prop
*/


forms.findClosest = function findClosest(kb, cla, prop) {
  var agenda = [kb.sym(cla)]; // ordered - this is breadth first search

  while (agenda.length > 0) {
    var c = agenda.shift(); // first
    // if (c.uri && (c.uri == ns.owl('Thing').uri || c.uri == ns.rdf('Resource').uri )) continue

    var lists = kb.each(c, prop);
    UI.log.debug('Lists for ' + c + ', ' + prop + ': ' + lists.length);
    if (lists.length !== 0) return lists;
    var supers = kb.each(c, ns.rdfs('subClassOf'));

    for (var i = 0; i < supers.length; i++) {
      agenda.push(supers[i]);
      UI.log.debug('findClosest: add super: ' + supers[i]);
    }
  }

  return [];
}; // Which forms apply to a given existing subject?


forms.formsFor = function (subject) {
  var ns = UI.ns;
  var kb = UI.store;
  UI.log.debug('formsFor: subject=' + subject);
  var t = kb.findTypeURIs(subject);
  var t1;

  for (t1 in t) {
    UI.log.debug('   type: ' + t1);
  }

  var bottom = kb.bottomTypeURIs(t); // most specific

  var candidates = [];

  for (var b in bottom) {
    // Find the most specific
    UI.log.debug('candidatesFor: trying bottom type =' + b);
    candidates = candidates.concat(forms.findClosest(kb, b, ns.ui('creationForm')));
    candidates = candidates.concat(forms.findClosest(kb, b, ns.ui('annotationForm')));
  }

  return candidates;
};

forms.sortBySequence = function (list) {
  var p2 = list.map(function (p) {
    var k = UI.store.any(p, ns.ui('sequence'));
    return [k || 9999, p];
  });
  p2.sort(function (a, b) {
    return a[0] - b[0];
  });
  return p2.map(function (pair) {
    return pair[1];
  });
};

forms.sortByLabel = function (list) {
  var p2 = list.map(function (p) {
    return [utils.label(p).toLowerCase(), p];
  });
  p2.sort();
  return p2.map(function (pair) {
    return pair[1];
  });
};
/** Button to add a new whatever using a form
//
// @param form - optional form , else will look for one
// @param store - optional store else will prompt for one (unimplemented)
*/


forms.newButton = function (dom, kb, subject, predicate, theClass, form, store, callbackFunction) {
  var b = dom.createElement('button');
  b.setAttribute('type', 'button');
  b.innerHTML = 'New ' + utils.label(theClass);
  b.addEventListener('click', function (_e) {
    b.parentNode.appendChild(forms.promptForNew(dom, kb, subject, predicate, theClass, form, store, callbackFunction));
  }, false);
  return b;
};
/**      Prompt for new object of a given class
//
// @param dom - the document DOM for the user interface
// @param kb - the graph which is the knowledge base we are working with
// @param subject - a term, Thing this should be linked to when made. Optional.
// @param predicate - a term, the relationship for the subject link. Optional.
// @param theClass - an RDFS class containng the object about which the new information is.
// @param form  - the form to be used when a new one. null means please find one.
// @param store - The web document being edited
// @param callbackFunction - takes (boolean ok, string errorBody)
// @returns a dom object with the form DOM
*/


forms.promptForNew = function (dom, kb, subject, predicate, theClass, form, store, callbackFunction) {
  var ns = UI.ns;
  var box = dom.createElement('form');

  if (!form) {
    var lists = forms.findClosest(kb, theClass.uri, UI.ns.ui('creationForm'));

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

    UI.log.debug('lists[0] is ' + lists[0]);
    form = lists[0]; // Pick any one
  }

  UI.log.debug('form is ' + form);
  box.setAttribute('style', "border: 0.05em solid ".concat(UI.style.formBorderColor, "; color: ").concat(UI.style.formBorderColor)); // @@color?

  box.innerHTML = '<h3>New ' + utils.label(theClass) + '</h3>';
  var formFunction = forms.fieldFunction(dom, form);
  var object = forms.newThing(store);
  var gotButton = false;

  var itemDone = function itemDone(ok, body) {
    if (!ok) return callbackFunction(ok, body);
    var insertMe = [];

    if (subject && !kb.holds(subject, predicate, object, store)) {
      insertMe.push($rdf.st(subject, predicate, object, store));
    }

    if (subject && !kb.holds(object, ns.rdf('type'), theClass, store)) {
      insertMe.push($rdf.st(object, ns.rdf('type'), theClass, store));
    }

    if (insertMe.length) {
      UI.store.updater.update([], insertMe, linkDone);
    } else {
      callbackFunction(true, body);
    }

    if (!gotButton) {
      gotButton = box.appendChild(forms.linkButton(dom, object));
    } // tabulator.outline.GotoSubject(object, true, undefined, true, undefined)

  };

  function linkDone(uri, ok, body) {
    return callbackFunction(ok, body);
  }

  UI.log.info('paneUtils Object is ' + object);
  var f = formFunction(dom, box, {}, object, form, store, itemDone);
  var rb = forms.removeButton(dom, f);
  rb.setAttribute('style', 'float: right;');
  box.AJAR_subject = object;
  return box;
};

forms.makeDescription = function (dom, kb, subject, predicate, store, callbackFunction) {
  var group = dom.createElement('div');
  var sts = kb.statementsMatching(subject, predicate, null, store); // Only one please

  if (sts.length > 1) {
    return error.errorMessageBlock(dom, 'Should not be ' + sts.length + ' i.e. >1 ' + predicate + ' of ' + subject);
  }

  var desc = sts.length ? sts[0].object.value : undefined;
  var field = dom.createElement('textarea');
  group.appendChild(field);
  field.rows = desc ? desc.split('\n').length + 2 : 2;
  field.cols = 80;
  var style = UI.style.multilineTextInputStyle || 'font-size:100%; white-space: pre-wrap; background-color: white;' + ' border: 0.07em solid gray; padding: 1em 0.5em; margin: 1em 1em;';
  field.setAttribute('style', style);

  if (sts.length) {
    field.value = desc;
  } else {
    // Unless you can make the predicate label disappear with the first click then this is over-cute
    // field.value = utils.label(predicate); // Was"enter a description here"
    field.select(); // Select it ready for user input -- doesn't work
  }

  group.refresh = function () {
    var v = kb.any(subject, predicate, null, store);

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

    var ds = kb.statementsMatching(subject, predicate, null, store);
    var is = $rdf.st(subject, predicate, field.value, store);
    UI.store.updater.update(ds, is, function (uri, ok, body) {
      if (ok) {
        field.setAttribute('style', style + 'color: black;');
        field.disabled = false;
      } else {
        group.appendChild(error.errorMessageBlock(dom, 'Error (while saving change to ' + store.uri + '): ' + body));
      }

      if (callbackFunction) {
        callbackFunction(ok, body);
      }
    });
  }

  var br = dom.createElement('br');
  group.appendChild(br);
  var editable = UI.store.updater.editable(store.uri);

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
    field.disabled = true;
  }

  return group;
};
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
// @param store - The web document being edited
// @param callbackFunction - takes (boolean ok, string errorBody)
*/


forms.makeSelectForOptions = function (dom, kb, subject, predicate, possible, options, store, callbackFunction) {
  UI.log.debug('Select list length now ' + possible.length);
  var n = 0;
  var uris = {}; // Count them

  var editable = UI.store.updater.editable(store.uri);

  for (var i = 0; i < possible.length; i++) {
    var sub = possible[i]; // @@ Maybe; make this so it works with blank nodes too

    if (!sub.uri) console.warn("makeSelectForOptions: option does not have an uri: ".concat(sub, ", with predicate: ").concat(predicate));
    if (!sub.uri || sub.uri in uris) continue;
    uris[sub.uri] = true;
    n++;
  } // uris is now the set of possible options


  if (n === 0 && !options.mint) {
    return error.errorMessageBlock(dom, "Can't do selector with no options, subject= " + subject + ' property = ' + predicate + '.');
  }

  UI.log.debug('makeSelectForOptions: store=' + store);

  var getActual = function getActual() {
    actual = {};

    if (predicate.sameTerm(ns.rdf('type'))) {
      actual = kb.findTypeURIs(subject);
    } else {
      kb.each(subject, predicate, null, store).map(function (x) {
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
      if (kb.holds(subject, predicate, t, store)) {
        ds.push($rdf.st(subject, predicate, t, store));
      }
    };

    for (var i = 0; i < select.options.length; i++) {
      var opt = select.options[i];

      if (opt.selected && opt.AJAR_mint) {
        var newObject;

        if (options.mintClass) {
          var thisForm = forms.promptForNew(dom, kb, subject, predicate, options.mintClass, null, store, function (ok, body) {
            if (!ok) {
              callbackFunction(ok, body); // @@ if ok, need some form of refresh of the select for the new thing
            }
          });
          select.parentNode.appendChild(thisForm);
          newObject = thisForm.AJAR_subject;
        } else {
          newObject = forms.newThing(store);
        }

        is.push($rdf.st(subject, predicate, newObject, store));

        if (options.mintStatementsFun) {
          is = is.concat(options.mintStatementsFun(newObject));
        }
      }

      if (!opt.AJAR_uri) continue; // a prompt or mint

      if (opt.selected && !(opt.AJAR_uri in actual)) {
        // new class
        is.push($rdf.st(subject, predicate, kb.sym(opt.AJAR_uri), store));
      }

      if (!opt.selected && opt.AJAR_uri in actual) {
        // old class
        removeValue(kb.sym(opt.AJAR_uri)); // ds.push($rdf.st(subject, predicate, kb.sym(opt.AJAR_uri), store ))
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

    function doneNew(ok, body) {
      callbackFunction(ok, body);
    }

    UI.log.info('selectForOptions: stote = ' + store);
    UI.store.updater.update(ds, is, function (uri, ok, body) {
      actual = getActual(); // refresh
      // kb.each(subject, predicate, null, store).map(function(x){actual[x.uri] = true})

      if (ok) {
        select.disabled = false; // data written back

        if (newObject) {
          var fn = forms.fieldFunction(dom, options.subForm);
          fn(dom, select.parentNode, {}, newObject, options.subForm, store, doneNew);
        }
      }

      if (callbackFunction) callbackFunction(ok, body);
    });
  };

  var select = dom.createElement('select');
  select.setAttribute('style', 'margin: 0.6em 1.5em;');
  if (options.multiple) select.setAttribute('multiple', 'true');
  select.currentURI = null;

  select.refresh = function () {
    actual = getActual(); // refresh

    for (var i = 0; i < select.children.length; i++) {
      var option = select.children[i];

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
}; // makeSelectForOptions
// Make SELECT element to select subclasses
//
// If there is any disjoint union it will so a mutually exclusive dropdown
// Failing that it will do a multiple selection of subclasses.
// Callback takes (boolean ok, string errorBody)


forms.makeSelectForCategory = function (dom, kb, subject, category, store, callbackFunction) {
  var log = UI.log;
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
    return error.errorMessageBlock(dom, "Can't do " + (multiple ? 'multiple ' : '') + 'selector with no subclasses of category: ' + category);
  }

  if (subs.length === 1) {
    return error.errorMessageBlock(dom, "Can't do " + (multiple ? 'multiple ' : '') + 'selector with only 1 subclass of category: ' + category + ':' + subs[1]);
  }

  return forms.makeSelectForOptions(dom, kb, subject, ns.rdf('type'), subs, {
    multiple: multiple,
    nullPrompt: '--classify--'
  }, store, callbackFunction);
};
/** Make SELECT element to select subclasses recurively
//
// It will so a mutually exclusive dropdown, with another if there are nested
// disjoint unions.
//
// @param  callbackFunction takes (boolean ok, string errorBody)
*/


forms.makeSelectForNestedCategory = function (dom, kb, subject, category, store, callbackFunction) {
  var container = dom.createElement('span'); // Container

  var child = null;
  var select;

  var onChange = function onChange(ok, body) {
    if (ok) update();
    callbackFunction(ok, body);
  };

  select = forms.makeSelectForCategory(dom, kb, subject, category, store, onChange);
  container.appendChild(select);

  var update = function update() {
    // UI.log.info("Selected is now: "+select.currentURI)
    if (child) {
      container.removeChild(child);
      child = null;
    }

    if (select.currentURI && kb.any(kb.sym(select.currentURI), ns.owl('disjointUnionOf'))) {
      child = forms.makeSelectForNestedCategory(dom, kb, subject, kb.sym(select.currentURI), store, callbackFunction);
      select.subSelect = child.firstChild;
      select.subSelect.superSelect = select;
      container.appendChild(child);
    }
  };

  update();
  return container;
};
/*  Build a checkbox from a given statement(s)
 **
 **  If the source document is editable, make the checkbox editable
 **
 **  ins and sel are either statements *or arrays of statements* which should be
 **  made if the checkbox is checed and unchecked respectively.
 **  tristate: Allow ins, or del, or neither
 */


function buildCheckboxForm(dom, kb, lab, del, ins, form, store, tristate) {
  // 20190115
  var box = dom.createElement('div');
  var tx = dom.createTextNode(lab);
  var editable = UI.store.updater.editable(store.uri);
  tx.style = 'colour: black; font-size: 100%; padding-left: 0.5 em; padding-right: 0.5 em;';
  box.appendChild(tx);
  var input;
  input = dom.createElement('button');
  input.setAttribute('style', 'font-size: 150%; height: 1.2em; width: 1.2em; background-color: #eef; margin: 0.1em');
  box.appendChild(input);

  function fix(x) {
    if (!x) return []; // no statements

    if (x.object) {
      if (!x.why) {
        x.why = store; // be back-compaitible  with old code
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
        box.appendChild(UI.widgets.errorMessageBlock(dom, 'Inconsistent data in store!\n' + ins + ' and\n' + del));
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
      "false": cancelCharacter,
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
    console.log("  Deleting  ".concat(toDelete));
    console.log("  Inserting ".concat(toInsert));
    UI.store.updater.update(toDelete, toInsert, function (uri, success, errorBody) {
      if (!success) {
        if (toDelete.why) {
          var hmmm = kb.holds(toDelete.subject, toDelete.predicate, toDelete.object, toDelete.why);

          if (hmmm) {
            console.log(' @@@@@ weird if 409 - does hold statement');
          }
        }

        tx.style = 'color: #black; background-color: #fee;';
        box.appendChild(error.errorMessageBlock(dom, "Checkbox: Error updating store from ".concat(input.state, " to ").concat(input.newState, ":\n\n").concat(errorBody)));
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

forms.buildCheckboxForm = buildCheckboxForm;

forms.fieldLabel = function (dom, property, form) {
  var lab = UI.store.any(form, ns.ui('label'));
  if (!lab) lab = utils.label(property, true); // Init capital

  if (property === undefined) {
    return dom.createTextNode('@@Internal error: undefined property');
  }

  var anchor = dom.createElement('a');
  if (property.uri) anchor.setAttribute('href', property.uri);
  anchor.setAttribute('style', 'color: #3B5998; text-decoration: none;'); // Not too blue and no underline

  anchor.textContent = lab;
  return anchor;
};

forms.fieldStore = function (subject, predicate, def) {
  var sts = UI.store.statementsMatching(subject, predicate);
  if (sts.length === 0) return def; // can used default as no data yet

  if (sts.length > 0 && sts[0].why.uri && UI.store.updater.editable(sts[0].why.uri, UI.store)) {
    return UI.store.sym(sts[0].why.uri);
  }

  return def;
};
/** Mint local ID using timestamp
 * @param {NamedNode} doc - the document in which the ID is to be generated
 */


forms.newThing = function (doc) {
  var now = new Date();
  return $rdf.sym(doc.uri + '#' + 'id' + ('' + now.getTime()));
};

module.exports = forms;
//# sourceMappingURL=forms.js.map