"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autocompleteField = autocompleteField;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var ns = _interopRequireWildcard(require("../../../ns"));
var _solidLogic = require("solid-logic");
var widgets = _interopRequireWildcard(require("../../../widgets"));
var style = _interopRequireWildcard(require("../../../style"));
var _autocompleteBar = require("./autocompleteBar");
var _rdflib = require("rdflib");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
/* Form field for doing autocompleete
 */

/**
  * Render a autocomplete form field
  *
  * The autocomplete form searches for an object in a definitive public database,
  * and allows the user to search for it by name, displaying a list of objects whose names match
  * the input to date, and letting  the user either click on one of the list,
  * or just go on untill there is only one.  The process then returns two values,
  * the URiI of the object and its name.
  *
  * @param dom The HTML Document object aka Document Object Model
  * @param container  If present, the created widget will be appended to this
  * @param already A hash table of (form, subject) kept to prevent recursive forms looping
  * @param subject The thing about which the form displays/edits data
  * @param form The form or field to be rendered
  * @param doc The web document in which the data is
  * @param callbackFunction Called when data is changed so other parts can be refreshed.
  *
  * Form properties:
  * @param ui:property  The property to store the object itself
  * @param ui:labelProperty The property used to store the name of the object
  * @param ui:category The class of objects to be searched, if fixed (else dep on class of subject)
  *
  * @returns The HTML widget created
 */

function autocompleteField(dom, container, already, subject, form, doc, callbackFunction) {
  var _kb$updater;
  function addOneIdAndRefresh(_x, _x2) {
    return _addOneIdAndRefresh.apply(this, arguments);
  }
  function _addOneIdAndRefresh() {
    _addOneIdAndRefresh = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(result, name) {
      var oldValue, oldName, deletables, insertables, _kb$updater2, _t;
      return _regenerator["default"].wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (name) {
              _context.next = 1;
              break;
            }
            throw new Error('autocompleteField:  No name set.');
          case 1:
            oldValue = kb.the(subject, property, null, doc);
            if (!oldValue) {
              _context.next = 2;
              break;
            }
            oldName = kb.any(oldValue, labelProperty, null, doc);
            if (!(oldValue.equals(result) && oldName && oldName.sameTerm(name))) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            deletables = oldValue ? kb.statementsMatching(subject, property, oldValue, doc).concat(kb.statementsMatching(oldValue, labelProperty, null, doc)) : []; // console.log('autocompleteField Deletables ' + deletables.map(st => st.toNT()))
            insertables = [(0, _rdflib.st)(subject, property, result, doc), (0, _rdflib.st)(result, labelProperty, name, doc)]; // @@ track the language of the  name too!
            // console.log(`AC form: ${deletables.length} to delete and ${insertables.length} to insert`)
            _context.prev = 3;
            _context.next = 4;
            return (_kb$updater2 = kb.updater) === null || _kb$updater2 === void 0 ? void 0 : _kb$updater2.updateMany(deletables, insertables);
          case 4:
            _context.next = 6;
            break;
          case 5:
            _context.prev = 5;
            _t = _context["catch"](3);
            callbackFunction(false, _t);
            box.appendChild(widgets.errorMessageBlock(dom, 'Autocomplete form data update error:' + _t, null, _t));
            return _context.abrupt("return");
          case 6:
            callbackFunction(true, '');
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[3, 5]]);
    }));
    return _addOneIdAndRefresh.apply(this, arguments);
  }
  function deleteOne(_x3, _x4) {
    return _deleteOne.apply(this, arguments);
  }
  function _deleteOne() {
    _deleteOne = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(_result, _name) {
      var oldValue, deletables, insertables, _kb$updater3, e2, _t2;
      return _regenerator["default"].wrap(function (_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            oldValue = kb.the(subject, property, null, doc);
            if (oldValue) {
              _context2.next = 1;
              break;
            }
            callbackFunction(false, 'NO data to elete');
            box.appendChild(widgets.errorMessageBlock(dom, 'Autocomplete delete: no old data!'));
            return _context2.abrupt("return");
          case 1:
            // const oldName = kb.any(oldValue as any, labelProperty as any, null, doc)
            deletables = kb.statementsMatching(subject, property, oldValue, doc).concat(kb.statementsMatching(oldValue, labelProperty, null, doc)); // console.log('autocompleteField Deletables ' + deletables.map(st => st.toNT()))
            insertables = []; // console.log(`AC form delete: ${deletables.length} to delete and ${insertables.length} to insert`)
            _context2.prev = 2;
            _context2.next = 3;
            return (_kb$updater3 = kb.updater) === null || _kb$updater3 === void 0 ? void 0 : _kb$updater3.updateMany(deletables, insertables);
          case 3:
            _context2.next = 5;
            break;
          case 4:
            _context2.prev = 4;
            _t2 = _context2["catch"](2);
            e2 = new Error('Autocomplete form data delete error:' + _t2);
            callbackFunction(false, _t2);
            box.appendChild(widgets.errorMessageBlock(dom, e2, null, _t2));
            return _context2.abrupt("return");
          case 5:
            callbackFunction(true, ''); // changed
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[2, 4]]);
    }));
    return _deleteOne.apply(this, arguments);
  }
  if (subject.termType !== 'NamedNode') {
    throw new Error('Sorry this field only works on NamedNode subjects (for editable)');
  }
  var kb = _solidLogic.store;
  var formDoc = form.doc ? form.doc() : null; // @@ if blank no way to know

  var box = dom.createElement('div');
  if (container) container.appendChild(box);
  var lhs = dom.createElement('div');
  lhs.setAttribute('class', 'formFieldName');
  lhs.setAttribute('style', style.formFieldNameBoxStyle);
  box.appendChild(lhs);
  var rhs = dom.createElement('div');
  rhs.setAttribute('class', 'formFieldValue');
  box.appendChild(rhs);
  var property = kb.any(form, ns.ui('property'));
  if (!property) {
    return box.appendChild(widgets.errorMessageBlock(dom, 'Error: No property given for autocomplete field: ' + form));
  }
  var labelProperty = kb.any(form, ns.ui('labelProperty')) || ns.schema('name');

  // Parse the data source into query options

  var dataSource = kb.any(form, ns.ui('dataSource'));
  if (!dataSource) {
    // console.log('@@ connectedStatements ACF ', kb.connectedStatements(form).map(x => x.toNT()).join('\n'))
    return box.appendChild(widgets.errorMessageBlock(dom, 'Error: No data source given for autocomplete field: ' + form));
  }
  var queryParams = {
    // targetClass: kb.any(dataSource, ns.ui('targetClass'), null, dataSource.doc()) as NamedNode | undefined,
    label: kb.anyJS(dataSource, ns.schema('name'), null, dataSource.doc()),
    logo: kb.any(dataSource, ns.schema('logo'), null, dataSource.doc())
  };

  // @@ Should we pass the target class in from the data source definition or use a current type of the subject
  var targetClass = kb.any(form, ns.ui('targetClass'), null, form.doc()) ||
  // class in form takes pecedence
  kb.any(dataSource, ns.ui('targetClass'), null, dataSource.doc());
  if (targetClass) {
    queryParams.targetClass = targetClass;
  }
  queryParams.objectURIBase = kb.any(dataSource, ns.ui('objectURIBase'), null, dataSource.doc()) || undefined;

  /*
  if (!queryParams.targetClass) {
    const klass = kb.any(subject, ns.rdf('type')) as NamedNode | undefined
    // @@ be more selective of which class if many
    // @@ todo: Take ALL classes,  and compare them with those the data source knows about
    // with translation where necessary.  Find most specific of the classes for the search.
    if (!klass) throw new Error('Autocomplete: No class specified or is current type of' + subject)
    queryParams.targetClass = klass
  }
  */
  var endpoint = kb.anyJS(dataSource, ns.ui('endpoint'), null, dataSource.doc());
  if (endpoint) {
    // SPARQL
    queryParams.endpoint = endpoint;
    queryParams.searchByNameQuery = kb.anyJS(dataSource, ns.ui('searchByNameQuery'), null, dataSource.doc());
    if (!queryParams.searchByNameQuery) {
      return box.appendChild(widgets.errorMessageBlock(dom, 'Error: No searchByNameQuery given for endpoint data Source: ' + form));
    }
    queryParams.insitituteDetailsQuery = kb.anyJS(dataSource, ns.ui('insitituteDetailsQuery'), null, dataSource.doc());
  } else {
    // return box.appendChild(
    //  widgets.errorMessageBlock(dom, 'Error: No SPARQL endpoint given for autocomplete field: ' + form))
    var searchByNameURI = kb.anyJS(dataSource, ns.ui('searchByNameURI'));
    if (!searchByNameURI) {
      return box.appendChild(widgets.errorMessageBlock(dom, 'Error: No searchByNameURI OR sparql endpoint given for dataSource: ' + dataSource));
    }
    queryParams.searchByNameURI = searchByNameURI;
  }
  // It can be cleaner to just remove empty fields if you can't edit them anyway
  var suppressEmptyUneditable = kb.anyJS(form, ns.ui('suppressEmptyUneditable'), null, formDoc);
  var editable = (_kb$updater = kb.updater) === null || _kb$updater === void 0 ? void 0 : _kb$updater.editable(doc.uri);
  var autocompleteOptions = {
    // cancelButton?: HTMLElement,
    permanent: true,
    targetClass: queryParams.targetClass,
    // @@ simplify?
    queryParams: queryParams
  };
  autocompleteOptions.size = kb.anyJS(form, ns.ui('size'), null, formDoc) || undefined;
  var obj = kb.any(subject, property, undefined, doc);
  if (!obj) {
    obj = kb.any(form, ns.ui('default'));
    if (obj) {
      autocompleteOptions.currentObject = obj;
      autocompleteOptions.currentName = kb.any(autocompleteOptions.currentObject, labelProperty, null, doc);
    } else {
      // No data or default. Should we suprress the whole field?
      if (suppressEmptyUneditable && !editable) {
        box.style.display = 'none'; // clutter removal
        return box;
      }
    }
  } else {
    // get object and name from target data:
    autocompleteOptions.currentObject = obj;
    autocompleteOptions.currentName = kb.any(autocompleteOptions.currentObject, labelProperty, null, doc);
  }
  lhs.appendChild(widgets.fieldLabel(dom, property, form));
  var barOptions = {
    editable: editable,
    dbLookup: true
  };
  (0, _autocompleteBar.renderAutocompleteControl)(dom, subject, barOptions, autocompleteOptions, addOneIdAndRefresh, deleteOne).then(function (control) {
    rhs.appendChild(control);
  }, function (err) {
    rhs.appendChild(widgets.errorMessageBlock(dom, "Error rendering autocomplete ".concat(form, ": ").concat(err), '#fee', err)); //
  });
  return box;
}

// ends
//# sourceMappingURL=autocompleteField.js.map