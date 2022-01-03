"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addStyleClassToElement = addStyleClassToElement;
exports.getName = getName;
exports.getPod = getPod;
exports.getPodOwner = getPodOwner;
exports.throttle = throttle;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _rdflib = require("rdflib");

var _ = require("..");

var _styleMap = require("../header/styleMap");

var _styleMap2 = require("../footer/styleMap");

var _jss = require("../jss");

/*
    Copied from mashlib/src/global/metadata.ts
 */

/**
 * @internal
 */
function getStyle(styleClass, type) {
  if (type && type === 'footer') {
    return _styleMap2.styleMap[styleClass];
  } else {
    return _styleMap.styleMap[styleClass];
  }
}
/**
 * @ignore exporting this only for the unit test
 */


function addStyleClassToElement(element, styleClasses, type) {
  styleClasses.forEach(function (styleClass) {
    var style = getStyle(styleClass, type);

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


function getPodOwner(_x, _x2) {
  return _getPodOwner.apply(this, arguments);
}
/**
 * @ignore exporting this only for the unit test
 */


function _getPodOwner() {
  _getPodOwner = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(pod, store) {
    var podOwner, storageIsListedInPodOwnersProfile;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // @@ TODO: This is given the structure that NSS provides - might need to change for other Pod servers
            podOwner = (0, _rdflib.sym)("".concat(pod.uri, "profile/card#me"));
            _context.prev = 1;

            if (!store.fetcher) {
              _context.next = 7;
              break;
            }

            _context.next = 5;
            return store.fetcher.load(podOwner.doc());

          case 5:
            _context.next = 8;
            break;

          case 7:
            throw new Error('There was a problem loading the Fetcher');

          case 8:
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            throw new Error('Did NOT find pod owners profile at ' + podOwner);

          case 13:
            if (!podOwner) {
              _context.next = 17;
              break;
            }

            storageIsListedInPodOwnersProfile = store.holds(podOwner, _.ns.space('storage'), pod, podOwner.doc());

            if (storageIsListedInPodOwnersProfile) {
              _context.next = 17;
              break;
            }

            throw new Error("** Pod owner ".concat(podOwner, " does NOT list pod ").concat(pod, " as storage"));

          case 17:
            return _context.abrupt("return", podOwner);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));
  return _getPodOwner.apply(this, arguments);
}

function getName(store, user) {
  return store.anyValue(user, _.ns.vcard('fn'), null, user.doc()) || store.anyValue(user, _.ns.foaf('name'), null, user.doc()) || user.uri;
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
//# sourceMappingURL=headerFooterHelpers.js.map