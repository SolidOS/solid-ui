"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commentField = commentField;
var _solidLogic = require("solid-logic");
var ns = _interopRequireWildcard(require("../../ns"));
var _fieldFunction = require("./fieldFunction");
var _fieldParams = require("./fieldParams");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var store = _solidLogic.solidLogicSingleton.store;

/**
 * A [[FieldFunction]] for a simple comment box. It will look for
 * the first (form, ns.ui('contents'), ?) triple it can find in
 * store and use the value of the object of that triple as
 * the comment text.
 *
 * @param dom The DOM
 * @param container If set, the result will be appended to it as a child
 * @param already Unused
 * @param subject Unused
 * @param form RDF node with `ns.ui('contents')` attribute
 * @param _doc Unused
 * @param _callbackFunction Unused
 *
 * @returns a DOM element containing the comment.
 */
function commentField(dom, container, already, subject, form, _doc, _callbackFunction) {
  var kb = store;
  var contents = kb.any(form, ns.ui('contents'));
  if (!contents) {
    contents = 'Error: No contents in comment field.';
  }
  var uri = (0, _fieldFunction.mostSpecificClassURI)(form);
  var params = _fieldParams.fieldParams[uri];
  if (params === undefined) {
    params = {};
  } // non-bottom field types can do this

  var box = dom.createElement('div');
  if (container) container.appendChild(box);
  var p = box.appendChild(dom.createElement(params.element || 'p'));
  p.textContent = contents;
  var style = kb.any(form, ns.ui('style'));
  if (style === undefined) {
    style = params.style ? params.style : '';
  }
  if (style) p.setAttribute('style', style);
  return box;
}
//# sourceMappingURL=comment.js.map