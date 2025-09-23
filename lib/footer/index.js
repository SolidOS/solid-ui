"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createControllerInfoBlock = createControllerInfoBlock;
exports.initFooter = initFooter;
exports.rebuildFooter = rebuildFooter;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _solidLogic = require("solid-logic");
var style = _interopRequireWildcard(require("../style"));
var _headerFooterHelpers = require("../utils/headerFooterHelpers");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
/*
    This file was copied from mashlib/src/global/footer.ts file. It is modified to
    work in solid-ui by adjusting where imported functions are found.
 */

var DEFAULT_SOLID_PROJECT_URL = 'https://solidproject.org';
var DEFAULT_SOLID_PROJECT_NAME = 'solidproject.org';

/*
  FooterOptions allow for customizing the link and name of the link part of the footer.
  */
/**
 * Initialize footer component, the footer object returned depends on whether the user is authenticated.
 * @param store the data store
 * @returns the footer
 */
function initFooter(_x, _x2) {
  return _initFooter.apply(this, arguments);
}
/**
 * @ignore exporting this only for the unit test
 */
function _initFooter() {
  _initFooter = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(store, options) {
    var footer, pod, podOwner;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          footer = document.getElementById('PageFooter');
          if (footer) {
            _context2.next = 1;
            break;
          }
          return _context2.abrupt("return");
        case 1:
          pod = (0, _headerFooterHelpers.getPod)();
          _context2.next = 2;
          return (0, _headerFooterHelpers.getPodOwner)(pod, store);
        case 2:
          podOwner = _context2.sent;
          rebuildFooter(footer, store, pod, podOwner, options)();
          _solidLogic.authSession.events.on('login', rebuildFooter(footer, store, pod, podOwner, options));
          _solidLogic.authSession.events.on('logout', rebuildFooter(footer, store, pod, podOwner, options));
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _initFooter.apply(this, arguments);
}
function rebuildFooter(footer, store, pod, podOwner, options) {
  return /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var user, _t;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          user = _solidLogic.authn.currentUser();
          footer.innerHTML = '';
          _t = footer;
          _context.next = 1;
          return createControllerInfoBlock(store, user, pod, podOwner, options);
        case 1:
          _t.appendChild.call(_t, _context.sent);
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
}
/**
 * @ignore exporting this only for the unit test
 */
function createControllerInfoBlock(store, user, pod, podOwner, options) {
  var profileLinkContainer = document.createElement('div');
  if (!pod || !podOwner || user && user.equals(podOwner)) {
    return profileLinkContainer;
  }
  profileLinkContainer.setAttribute('style', style.footer);
  var podLinkPre = document.createElement('span');
  podLinkPre.innerText = "You're visiting ";
  var podLink = document.createElement('a');
  podLink.href = pod.uri;
  podLink.innerText = 'the Pod';
  var profileLinkPre = document.createElement('span');
  profileLinkPre.innerText = ' controlled by ';
  var profileLink = document.createElement('a');
  profileLink.href = podOwner.uri;
  profileLink.innerText = (0, _headerFooterHelpers.getName)(store, podOwner);
  var solidProjectLinkPre = document.createElement('span');
  solidProjectLinkPre.innerText = '. For more info, check out ';
  var solidProjectLink = document.createElement('a');
  solidProjectLink.href = options && options.solidProjectUrl ? options.solidProjectUrl : DEFAULT_SOLID_PROJECT_URL;
  solidProjectLink.innerText = options && options.solidProjectName ? options.solidProjectName : DEFAULT_SOLID_PROJECT_NAME;
  var solidProjectLinkPost = document.createElement('span');
  solidProjectLinkPost.innerText = '.';
  profileLinkContainer.appendChild(podLinkPre);
  profileLinkContainer.appendChild(podLink);
  profileLinkContainer.appendChild(profileLinkPre);
  profileLinkContainer.appendChild(profileLink);
  profileLinkContainer.appendChild(solidProjectLinkPre);
  profileLinkContainer.appendChild(solidProjectLink);
  profileLinkContainer.appendChild(solidProjectLinkPost);
  return profileLinkContainer;
}
//# sourceMappingURL=index.js.map