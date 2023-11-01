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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
  _initFooter = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(store, options) {
    var footer, pod, podOwner;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          footer = document.getElementById('PageFooter');
          if (footer) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return");
        case 3:
          pod = (0, _headerFooterHelpers.getPod)();
          _context2.next = 6;
          return (0, _headerFooterHelpers.getPodOwner)(pod, store);
        case 6:
          podOwner = _context2.sent;
          rebuildFooter(footer, store, pod, podOwner, options)();
          _solidLogic.authSession.onLogin(rebuildFooter(footer, store, pod, podOwner, options));
          _solidLogic.authSession.onLogout(rebuildFooter(footer, store, pod, podOwner, options));
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _initFooter.apply(this, arguments);
}
function rebuildFooter(footer, store, pod, podOwner, options) {
  return /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          user = _solidLogic.authn.currentUser();
          footer.innerHTML = '';
          _context.t0 = footer;
          _context.next = 5;
          return createControllerInfoBlock(store, user, pod, podOwner, options);
        case 5:
          _context.t1 = _context.sent;
          _context.t0.appendChild.call(_context.t0, _context.t1);
        case 7:
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