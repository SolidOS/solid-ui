"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldLabel = fieldLabel;
exports.fieldStore = fieldStore;
exports.basicField = basicField;

var _rdflib = require("rdflib");

var _store = _interopRequireDefault(require("../../store"));

var _ns = _interopRequireDefault(require("../../ns"));

var _style = require("../../style");

var _utils = require("../../utils");

var _error = require("../error");

var _fieldFunction = require("./fieldFunction");

var _fieldParams = require("./fieldParams");

function fieldLabel(dom, property, fieldInQuestion) {
  var lab = _store["default"].any(fieldInQuestion, _ns["default"].ui('label'));

  if (!lab) lab = (0, _utils.label)(property, true); // Init capital

  if (property === undefined) {
    return dom.createTextNode('@@Internal error: undefined property');
  }

  var anchor = dom.createElement('a');
  /* istanbul ignore next */

  if (property.uri) anchor.setAttribute('href', property.uri);
  anchor.setAttribute('style', 'color: #3B5998; text-decoration: none;'); // Not too blue and no underline

  anchor.textContent = lab;
  return anchor;
}
/**
 * Returns the document for the first quad that matches
 * the subject and predicate provided, or default if that
 * store is not editable.
 *
 * @param subject Subject about which we want to find an editable RDF document
 * @param predicate Predicate about which we want to find an editable RDF document
 * @param def default RDF document to return if none found
 *
 * @internal exporting this only for unit tests
 */


function fieldStore(subject, predicate, def) {
  var sts = _store["default"].statementsMatching(subject, predicate);

  if (sts.length === 0) return def; // can used default as no data yet

  if (sts.length > 0 && sts[0].why.uri && _store["default"].updater.editable(sts[0].why.uri, _store["default"])) {
    return _store["default"].sym(sts[0].why.uri);
  }

  return def;
}
/**
 * Render a basic form field
 *
 * The same function is used for many similar one-value fields, with different
 * regexps used to validate.
 *
 * @param dom The HTML Document object aka Document Object Model
 * @param container  If present, the created widget will be appended to this
 * @param already A hash table of (form, subject) kept to prevent recursive forms looping
 * @param subject The thing about which the form displays/edits data
 * @param form The form or field to be rendered
 * @param doc The web document in which the data is
 * @param callbackFunction Called when data is changed?
 *
 * @returns The HTML widget created
 */
// eslint-disable-next-line complexity


function basicField(dom, container, already, subject, form, doc, callbackFunction) {
  var kb = _store["default"];
  var box = dom.createElement('tr');
  if (container) container.appendChild(box);
  var lhs = dom.createElement('td');
  lhs.setAttribute('class', 'formFieldName');
  lhs.setAttribute('style', '  vertical-align: middle;');
  box.appendChild(lhs);
  var rhs = dom.createElement('td');
  rhs.setAttribute('class', 'formFieldValue');
  box.appendChild(rhs);
  var property = kb.any(form, _ns["default"].ui('property'));

  if (!property) {
    box.appendChild(dom.createTextNode('Error: No property given for text field: ' + form));
    return box;
  }

  lhs.appendChild(fieldLabel(dom, property, form));
  var uri = (0, _fieldFunction.mostSpecificClassURI)(form);
  var params = _fieldParams.fieldParams[uri];
  if (params === undefined) params = {}; // non-bottom field types can do this

  var style = params.style || _style.textInputStyle; // box.appendChild(dom.createTextNode(' uri='+uri+', pattern='+ params.pattern))

  var field = dom.createElement('input');
  field.style = _style.textInputStyle; // Do we have to override length etc?

  rhs.appendChild(field);
  field.setAttribute('type', params.type ? params.type : 'text');
  var size = kb.any(form, _ns["default"].ui('size')); // Form has precedence

  field.setAttribute('size', size ? '' + size : params.size ? '' + params.size : '20');
  var maxLength = kb.any(form, _ns["default"].ui('maxLength'));
  field.setAttribute('maxLength', maxLength ? '' + maxLength : '4096');
  doc = doc || fieldStore(subject, property, doc);
  var obj = kb.any(subject, property, undefined, doc);

  if (!obj) {
    obj = kb.any(form, _ns["default"].ui('default'));
  }

  if (obj && obj.uri && params.uriPrefix) {
    // eg tel: or mailto:
    field.value = decodeURIComponent(obj.uri.replace(params.uriPrefix, '')) // should have no spaces but in case
    .replace(/ /g, '');
  } else if (obj) {
    /* istanbul ignore next */
    field.value = obj.value || obj.uri || '';
  }

  field.setAttribute('style', style);

  if (!kb.updater.editable(doc.uri)) {
    field.readOnly = true; // was: disabled. readOnly is better

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
        result = new _rdflib.Literal(field.value.trim(), undefined, _ns["default"].xsd(params.dt));
      } else {
        result = new _rdflib.Literal(field.value);
      }
    }

    var is = ds.map(function (statement) {
      return (0, _rdflib.st)(statement.subject, statement.predicate, result, statement.why);
    }); // can include >1 doc

    if (is.length === 0) {
      // or none
      is = [(0, _rdflib.st)(subject, property, result, doc)];
    }

    function updateMany(ds, is, callback) {
      var docs = [];
      is.forEach(function (st) {
        if (!docs.includes(st.why.uri)) docs.push(st.why.uri);
      });
      ds.forEach(function (st) {
        /* istanbul ignore next */
        if (!docs.includes(st.why.uri)) docs.push(st.why.uri);
      });
      /* istanbul ignore next */

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
        box.appendChild((0, _error.errorMessageBlock)(dom, body));
      }

      callbackFunction(ok, body);
    });
  }, true);
  return box;
}
//# sourceMappingURL=basic.js.map