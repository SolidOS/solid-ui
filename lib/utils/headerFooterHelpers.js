"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getName = getName;
exports.getPod = getPod;
exports.getPodOwner = getPodOwner;
exports.throttle = throttle;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _rdflib = require("rdflib");
var _ = require("..");
/*
    Copied from mashlib/src/global/metadata.ts
 */

/* @ts-ignore  no-console */

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
  _getPodOwner = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(pod, store) {
    var response, containerTurtle, podOwner, guess, _t, _t2, _t3;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          if (store.any(pod, null, _.ns.ldp('Container'), pod)) {
            _context.next = 2;
            break;
          }
          _context.next = 1;
          return store.fetcher.webOperation('GET', pod.uri, store.fetcher.initFetchOptions(pod.uri, {
            headers: {
              accept: 'text/turtle'
            }
          }));
        case 1:
          response = _context.sent;
          containerTurtle = response.responseText;
          (0, _rdflib.parse)(containerTurtle, store, pod.uri, 'text/turtle');
        case 2:
          _context.next = 4;
          break;
        case 3:
          _context.prev = 3;
          _t = _context["catch"](0);
          console.error('Error loading pod ' + pod + ': ' + _t);
          return _context.abrupt("return", null);
        case 4:
          if (store.holds(pod, _.ns.rdf('type'), _.ns.space('Storage'), pod)) {
            _context.next = 5;
            break;
          }
          console.warn('Pod  ' + pod + ' does not declare itself as a space:Storage');
          return _context.abrupt("return", null);
        case 5:
          podOwner = store.any(pod, _.ns.solid('owner'), null, pod) || store.any(null, _.ns.space('storage'), pod, pod);
          if (!podOwner) {
            _context.next = 10;
            break;
          }
          _context.prev = 6;
          _context.next = 7;
          return store.fetcher.load(podOwner.doc());
        case 7:
          _context.next = 9;
          break;
        case 8:
          _context.prev = 8;
          _t2 = _context["catch"](6);
          console.warn('Unable to load profile of pod owner ' + podOwner);
          return _context.abrupt("return", null);
        case 9:
          if (!store.holds(podOwner, _.ns.space('storage'), pod, podOwner.doc())) {
            console.warn("Pod owner ".concat(podOwner, " does NOT list pod ").concat(pod, " as their storage"));
          }
          return _context.abrupt("return", podOwner);
        case 10:
          // pod owner not declared in pod
          // @@ TODO: This is given the structure that NSS provides
          // This is a massive guess.  For old pods which don't have owner link
          guess = (0, _rdflib.sym)("".concat(pod.uri, "profile/card#me"));
          _context.prev = 11;
          _context.next = 12;
          return store.fetcher.load(guess);
        case 12:
          _context.next = 14;
          break;
        case 13:
          _context.prev = 13;
          _t3 = _context["catch"](11);
          console.error('Ooops. Guessed wrong pod owner webid {$guess} : can\'t load it.');
          return _context.abrupt("return", null);
        case 14:
          if (!store.holds(guess, _.ns.space('storage'), pod, guess.doc())) {
            _context.next = 15;
            break;
          }
          console.warn('Using guessed pod owner webid but it links back.');
          return _context.abrupt("return", guess);
        case 15:
          return _context.abrupt("return", null);
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 3], [6, 8], [11, 13]]);
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
    var remaining = wait - (now - previous);
    // @ts-ignore
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