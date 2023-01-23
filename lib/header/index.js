"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBanner = createBanner;
exports.createHelpMenu = createHelpMenu;
exports.createLoginSignUpButtons = createLoginSignUpButtons;
exports.createUserMenu = createUserMenu;
exports.createUserMenuButton = createUserMenuButton;
exports.createUserMenuItem = createUserMenuItem;
exports.createUserMenuLink = createUserMenuLink;
exports.getProfileImg = getProfileImg;
exports.initHeader = initHeader;
exports.rebuildHeader = rebuildHeader;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _index = require("../index");
var _solidLogic = require("solid-logic");
var _login = require("../login/login");
var widgets = _interopRequireWildcard(require("../widgets"));
var _emptyProfile = require("./empty-profile");
var _headerFooterHelpers = require("../utils/headerFooterHelpers");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* global EventListenerOrEventListenerObject */
/*
    This file was copied from mashlib/src/global/header.ts file. It is modified to
    work in solid-ui by adjusting where imported functions are found.
 */

// import { loginStatusBox, authSession, currentUser } from '../authn/authn'

/**
 * menu icons
*/
var DEFAULT_HELP_MENU_ICON = _index.icons.iconBase + 'noun_help.svg';
var DEFAUL_SOLID_ICON_URL = 'https://solidproject.org/assets/img/solid-emblem.svg';
/**
 * Initialize header component, the header object returned depends on whether the user is authenticated.
 * @param store the data store
 * @param userMenuList a list of menu items when the user is logged in
 * @param options allow the header to be customized with a personalized logo, help icon and a help menu list of links or buttons.
 * @returns a header for an authenticated user with menu items given or a login screen
 */
function initHeader(_x, _x2, _x3) {
  return _initHeader.apply(this, arguments);
}
/**
 * @ignore exporting this only for the unit test
 */
function _initHeader() {
  _initHeader = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(store, userMenuList, options) {
    var header, pod;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          header = document.getElementById('PageHeader');
          if (header) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return");
        case 3:
          pod = (0, _headerFooterHelpers.getPod)();
          rebuildHeader(header, store, pod, userMenuList, options)();
          _solidLogic.authSession.onLogout(rebuildHeader(header, store, pod, userMenuList, options));
          _solidLogic.authSession.onLogin(rebuildHeader(header, store, pod, userMenuList, options));
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _initHeader.apply(this, arguments);
}
function rebuildHeader(header, store, pod, userMenuList, options) {
  return /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          user = _solidLogic.authn.currentUser();
          header.innerHTML = '';
          _context.t0 = header;
          _context.next = 5;
          return createBanner(store, pod, user, userMenuList, options);
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
function createBanner(_x4, _x5, _x6, _x7, _x8) {
  return _createBanner.apply(this, arguments);
}
/**
 * @ignore exporting this only for the unit test
 */
function _createBanner() {
  _createBanner = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(store, pod, user, userMenuList, options) {
    var podLink, image, userMenu, banner, leftSideOfHeader, helpMenu;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          podLink = document.createElement('a');
          podLink.href = pod.uri;
          (0, _headerFooterHelpers.addStyleClassToElement)(podLink, ['header-banner__link']);
          image = document.createElement('img');
          if (options) {
            image.src = options.logo ? options.logo : DEFAUL_SOLID_ICON_URL;
          }
          (0, _headerFooterHelpers.addStyleClassToElement)(image, ['header-banner__icon']);
          podLink.appendChild(image);
          if (!user) {
            _context3.next = 13;
            break;
          }
          _context3.next = 10;
          return createUserMenu(store, user, userMenuList);
        case 10:
          _context3.t0 = _context3.sent;
          _context3.next = 14;
          break;
        case 13:
          _context3.t0 = createLoginSignUpButtons();
        case 14:
          userMenu = _context3.t0;
          banner = document.createElement('div');
          (0, _headerFooterHelpers.addStyleClassToElement)(banner, ['header-banner']);
          banner.appendChild(podLink);
          leftSideOfHeader = document.createElement('div');
          (0, _headerFooterHelpers.addStyleClassToElement)(leftSideOfHeader, ['header-banner__right-menu']);
          leftSideOfHeader.appendChild(userMenu);
          if (options && options.helpMenuList) {
            helpMenu = createHelpMenu(options, options.helpMenuList);
            leftSideOfHeader.appendChild(helpMenu);
          }
          banner.appendChild(leftSideOfHeader);
          return _context3.abrupt("return", banner);
        case 24:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _createBanner.apply(this, arguments);
}
function createHelpMenu(options, helpMenuItems) {
  if (!helpMenuItems) return;
  var helpMenuList = document.createElement('ul');
  (0, _headerFooterHelpers.addStyleClassToElement)(helpMenuList, ['header-user-menu__list']);
  helpMenuItems.forEach(function (menuItem) {
    var menuItemType = menuItem.url ? 'url' : 'onclick';
    if (menuItemType === 'url') {
      helpMenuList.appendChild(createUserMenuItem(createUserMenuLink(menuItem.label, menuItem.url, menuItem.target)));
    } else {
      helpMenuList.appendChild(createUserMenuItem(createUserMenuButton(menuItem.label, menuItem.onclick)));
    }
  });
  var helpMenu = document.createElement('nav');
  (0, _headerFooterHelpers.addStyleClassToElement)(helpMenu, ['header-user-menu__navigation-menu']);
  helpMenu.setAttribute('aria-hidden', 'true');
  helpMenu.appendChild(helpMenuList);
  var helpMenuContainer = document.createElement('div');
  (0, _headerFooterHelpers.addStyleClassToElement)(helpMenuContainer, ['header-banner__user-menu']);
  (0, _headerFooterHelpers.addStyleClassToElement)(helpMenuContainer, ['header-user-menu']);
  helpMenuContainer.appendChild(helpMenu);
  var helpMenuTrigger = document.createElement('button');
  (0, _headerFooterHelpers.addStyleClassToElement)(helpMenuTrigger, ['header-user-menu__trigger']);
  helpMenuTrigger.type = 'button';
  var helpMenuIcon = document.createElement('img');
  helpMenuIcon.src = options && options.helpIcon ? options.helpIcon : _index.icons.iconBase + DEFAULT_HELP_MENU_ICON;
  (0, _headerFooterHelpers.addStyleClassToElement)(helpMenuIcon, ['header-banner__help-icon']);
  helpMenuContainer.appendChild(helpMenuTrigger);
  helpMenuTrigger.appendChild(helpMenuIcon);
  var throttledMenuToggle = (0, _headerFooterHelpers.throttle)(function (event) {
    return toggleMenu(event, helpMenuTrigger, helpMenu);
  }, 50);
  helpMenuTrigger.addEventListener('click', throttledMenuToggle);
  var timer = setTimeout(function () {
    return null;
  }, 0);
  helpMenuContainer.addEventListener('mouseover', function (event) {
    clearTimeout(timer);
    throttledMenuToggle(event);
  });
  helpMenuContainer.addEventListener('mouseout', function (event) {
    timer = setTimeout(function () {
      return throttledMenuToggle(event);
    }, 200);
  });
  return helpMenuContainer;
}
/**
 * @ignore exporting this only for the unit test
 */
function createLoginSignUpButtons() {
  var profileLoginButtonPre = document.createElement('div');
  (0, _headerFooterHelpers.addStyleClassToElement)(profileLoginButtonPre, ['header-banner__login']);
  profileLoginButtonPre.appendChild((0, _login.loginStatusBox)(document, null, {}));
  return profileLoginButtonPre;
}
/**
 * @ignore exporting this only for the unit test
 */
function createUserMenuButton(label, onClick) {
  var button = document.createElement('button');
  (0, _headerFooterHelpers.addStyleClassToElement)(button, ['header-user-menu__button']);
  button.addEventListener('click', onClick);
  button.innerText = label;
  return button;
}
/**
 * @ignore exporting this only for the unit test
 */
function createUserMenuLink(label, href, target) {
  var link = document.createElement('a');
  (0, _headerFooterHelpers.addStyleClassToElement)(link, ['header-user-menu__link']);
  link.href = href;
  link.innerText = label;
  if (target) link.target = target;
  return link;
}

/**
 * @ignore exporting this only for the unit test
 */
function createUserMenu(_x9, _x10, _x11) {
  return _createUserMenu.apply(this, arguments);
}
/**
 * @ignore exporting this only for the unit test
 */
function _createUserMenu() {
  _createUserMenu = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(store, user, userMenuList) {
    var fetcher, loggedInMenuList, loggedInMenu, loggedInMenuTrigger, profileImg, loggedInMenuContainer, throttledMenuToggle, timer;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          fetcher = store.fetcher;
          if (!fetcher) {
            _context4.next = 4;
            break;
          }
          _context4.next = 4;
          return fetcher.load(user);
        case 4:
          loggedInMenuList = document.createElement('ul');
          (0, _headerFooterHelpers.addStyleClassToElement)(loggedInMenuList, ['header-user-menu__list']);
          if (userMenuList) {
            userMenuList.forEach(function (menuItem) {
              var menuItemType = menuItem.url ? 'url' : 'onclick';
              if (menuItemType === 'url') {
                loggedInMenuList.appendChild(createUserMenuItem(createUserMenuLink(menuItem.label, menuItem.url, menuItem.target)));
              } else {
                loggedInMenuList.appendChild(createUserMenuItem(createUserMenuButton(menuItem.label, menuItem.onclick)));
              }
            });
          }
          loggedInMenu = document.createElement('nav');
          (0, _headerFooterHelpers.addStyleClassToElement)(loggedInMenu, ['header-user-menu__navigation-menu']);
          loggedInMenu.setAttribute('aria-hidden', 'true');
          loggedInMenu.appendChild(loggedInMenuList);
          loggedInMenuTrigger = document.createElement('button');
          (0, _headerFooterHelpers.addStyleClassToElement)(loggedInMenuTrigger, ['header-user-menu__trigger']);
          loggedInMenuTrigger.type = 'button';
          profileImg = getProfileImg(store, user);
          if (typeof profileImg === 'string') {
            loggedInMenuTrigger.innerHTML = profileImg;
          } else {
            loggedInMenuTrigger.appendChild(profileImg);
          }
          loggedInMenuContainer = document.createElement('div');
          (0, _headerFooterHelpers.addStyleClassToElement)(loggedInMenuContainer, ['header-banner__user-menu']);
          (0, _headerFooterHelpers.addStyleClassToElement)(loggedInMenuContainer, ['header-user-menu']);
          loggedInMenuContainer.appendChild(loggedInMenuTrigger);
          loggedInMenuContainer.appendChild(loggedInMenu);
          throttledMenuToggle = (0, _headerFooterHelpers.throttle)(function (event) {
            return toggleMenu(event, loggedInMenuTrigger, loggedInMenu);
          }, 50);
          loggedInMenuTrigger.addEventListener('click', throttledMenuToggle);
          timer = setTimeout(function () {
            return null;
          }, 0);
          loggedInMenuContainer.addEventListener('mouseover', function (event) {
            clearTimeout(timer);
            throttledMenuToggle(event);
          });
          loggedInMenuContainer.addEventListener('mouseout', function (event) {
            timer = setTimeout(function () {
              return throttledMenuToggle(event);
            }, 200);
          });
          return _context4.abrupt("return", loggedInMenuContainer);
        case 27:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _createUserMenu.apply(this, arguments);
}
function createUserMenuItem(child) {
  var menuProfileItem = document.createElement('li');
  (0, _headerFooterHelpers.addStyleClassToElement)(menuProfileItem, ['header-user-menu__list-item']);
  menuProfileItem.appendChild(child);
  return menuProfileItem;
}
/**
 * @ignore exporting this only for the unit test
 */
function getProfileImg(store, user) {
  var profileUrl = null;
  try {
    profileUrl = widgets.findImage(user);
    if (!profileUrl) {
      return _emptyProfile.emptyProfile;
    }
  } catch (_unused) {
    return _emptyProfile.emptyProfile;
  }
  var profileImage = document.createElement('div');
  (0, _headerFooterHelpers.addStyleClassToElement)(profileImage, ['header-user-menu__photo']);
  profileImage.style.backgroundImage = "url(".concat(profileUrl, ")");
  return profileImage;
}

/**
 * @internal
 */
function toggleMenu(event, trigger, menu) {
  var isExpanded = trigger.getAttribute('aria-expanded') === 'true';
  var expand = event.type === 'mouseover';
  var close = event.type === 'mouseout';
  if (isExpanded && expand || !isExpanded && close) {
    return;
  }
  trigger.setAttribute('aria-expanded', (!isExpanded).toString());
  menu.setAttribute('aria-hidden', isExpanded.toString());
}
//# sourceMappingURL=index.js.map