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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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