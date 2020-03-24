"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commentField = commentField;

var _store = _interopRequireDefault(require("../../store"));

var _ns = _interopRequireDefault(require("../../ns"));

var _fieldFunction = require("./fieldFunction");

var _fieldParams = require("./fieldParams");

function commentField(dom, container, already, subject, form, _doc, _callbackFunction) {
  var kb = _store["default"];
  var contents = kb.any(form, _ns["default"].ui('contents'));
  if (!contents) contents = 'Error: No contents in comment field.';
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