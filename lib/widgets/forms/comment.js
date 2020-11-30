"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commentField = commentField;

var _logic = require("../../logic");

var _ns = _interopRequireDefault(require("../../ns"));

var _fieldFunction = require("./fieldFunction");

var _fieldParams = require("./fieldParams");

var store = _logic.solidLogicSingleton.store;
/**
 * A [[FieldFunction]] for a simple comment box. It will look for
 * the first (form, ns.ui('contents'), ?) triple it can find in
 * UI.store and use the value of the object of that triple as
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
  var contents = kb.any(form, _ns["default"].ui('contents'));

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
  var style = kb.any(form, _ns["default"].ui('style'));

  if (style === undefined) {
    style = params.style ? params.style : '';
  }

  if (style) p.setAttribute('style', style);
  return box;
}
//# sourceMappingURL=comment.js.map