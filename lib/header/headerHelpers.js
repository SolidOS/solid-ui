"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addStyleClassToElement = addStyleClassToElement;
exports.getPod = getPod;
exports.throttle = throttle;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _rdflib = require("rdflib");

var _styleMap = require("./styleMap");

var _jss = require("../jss");

/*
    Copied from mashlib/src/global/metadata.ts
 */

/**
 * @internal
 */
function getStyle(styleClass) {
  return _styleMap.styleMap[styleClass];
}
/**
 * @ignore exporting this only for the unit test
 */


function addStyleClassToElement(element, styleClasses) {
  styleClasses.map(function (styleClass) {
    var style = getStyle(styleClass);

    var _getClasses = (0, _jss.getClasses)(document.head, (0, _defineProperty2["default"])({}, styleClass, style)),
        classes = _getClasses.classes;

    element.classList.add(classes[styleClass]);
  });
}
/**
 * @ignore exporting this only for the unit test
 */


function getPod() {
  // @@ TODO: This is given that mashlib runs on NSS - might need to change when we want it to run on other Pod servers
  return (0, _rdflib.sym)(document.location.origin).site();
}
/**
 * @ignore exporting this only for the unit test
 */


function throttle(func, wait) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var context, args, result;
  var timeout = null;
  var previous = 0;

  var later = function later() {
    previous = !options.leading ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  return function () {
    var now = Date.now();
    if (!previous && !options.leading) previous = now;
    var remaining = wait - (now - previous); // @ts-ignore

    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
}
//# sourceMappingURL=headerHelpers.js.map