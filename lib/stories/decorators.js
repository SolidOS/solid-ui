"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rawJsonDecorator = void 0;

var rawJsonDecorator = function rawJsonDecorator(Story) {
  return "<pre>".concat(JSON.stringify(Story(), null, 2), "</pre>");
};

exports.rawJsonDecorator = rawJsonDecorator;
//# sourceMappingURL=decorators.js.map