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
 */


function getPodOwner(_x, _x2) {
  return _getPodOwner.apply(this, arguments);
}
/**
 * @ignore exporting this only for the unit test
 */


function _getPodOwner() {
  _getPodOwner = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(pod, store) {
    var podOwner, guess;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // @ts-ignore  LiveStore always has fetcher
            store.fetcher.load(pod);
            _context.next = 8;
            break;

          case 4:
            _context.prev = 4;
            _context.t0 = _context["catch"](0);
            console.error('Error loading pod ' + pod + ': ' + _context.t0);
            return _context.abrupt("return", null);

          case 8:
            if (store.holds(pod, _.ns.rdf('type'), _.ns.space('Storage'), pod)) {
              _context.next = 11;
              break;
            }

            console.warn('Pod  ' + pod + ' does not declare itself as a space:Storage');
            return _context.abrupt("return", null);

          case 11:
            podOwner = store.any(pod, _.ns.solid('owner'), null, pod) || store.any(null, _.ns.space('storage'), pod, pod);

            if (!podOwner) {
              _context.next = 25;
              break;
            }

            _context.prev = 13;
            // @ts-ignore  LiveStore always has fetcher
            store.fetcher.load(podOwner.doc());
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t1 = _context["catch"](13);
            console.warn('Unable to load profile of pod owner ' + podOwner);
            return _context.abrupt("return", null);

          case 21:
            if (!store.holds(podOwner, _.ns.space('storage'), pod, podOwner.doc())) {
              console.warn("Pod owner ".concat(podOwner, " does NOT list pod ").concat(pod, " as their storage"));
            }

            return _context.abrupt("return", podOwner);

          case 25:
            // pod owner not declared in pod
            // @@ TODO: This is given the structure that NSS provides
            // This is a massive guess.  For old pods which don't have owner link
            guess = (0, _rdflib.sym)("".concat(pod.uri, "profile/card#me"));
            _context.prev = 26;
            // @ts-ignore  LiveStore always has fetcher
            store.fetcher.load(guess);
            _context.next = 34;
            break;

          case 30:
            _context.prev = 30;
            _context.t2 = _context["catch"](26);
            console.error('Ooops. Guessed wrong pod owner webid {$guess} : can\'t load it.');
            return _context.abrupt("return", null);

          case 34:
            if (!store.holds(guess, _.ns.space('storage'), pod, guess.doc())) {
              _context.next = 37;
              break;
            }

            console.warn('Using guessed pod owner webid but it links back.');
            return _context.abrupt("return", guess);

          case 37:
            return _context.abrupt("return", null);

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 4], [13, 17], [26, 30]]);
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