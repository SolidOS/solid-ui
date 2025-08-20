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
var style = _interopRequireWildcard(require("../style"));
var _emptyProfile = require("./empty-profile");
var _headerFooterHelpers = require("../utils/headerFooterHelpers");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
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

/*
  HeaderOptions allow for customizing the logo and menu list.  If a logo is not provided the default
  is solid. Menulist will always show a link to logout and to the users profile.
  */
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
  _initHeader = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(store, userMenuList, options) {
    var header, pod;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          header = document.getElementById('PageHeader');
          if (header) {
            _context2.next = 1;
            break;
          }
          return _context2.abrupt("return");
        case 1:
          pod = (0, _headerFooterHelpers.getPod)();
          rebuildHeader(header, store, pod, userMenuList, options)();
          _solidLogic.authSession.onLogout(rebuildHeader(header, store, pod, userMenuList, options));
          _solidLogic.authSession.onLogin(rebuildHeader(header, store, pod, userMenuList, options));
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _initHeader.apply(this, arguments);
}
function rebuildHeader(header, store, pod, userMenuList, options) {
  return /*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var user, _t;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          user = _solidLogic.authn.currentUser();
          header.innerHTML = '';
          _t = header;
          _context.next = 1;
          return createBanner(store, pod, user, userMenuList, options);
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
function createBanner(_x4, _x5, _x6, _x7, _x8) {
  return _createBanner.apply(this, arguments);
}
/**
 * @ignore exporting this only for the unit test
 */
function _createBanner() {
  _createBanner = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(store, pod, user, userMenuList, options) {
    var podLink, image, userMenu, banner, leftSideOfHeader, helpMenu, _t2;
    return _regenerator["default"].wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          podLink = document.createElement('a');
          podLink.href = pod.uri;
          podLink.setAttribute('style', style.headerBannerLink);
          image = document.createElement('img');
          if (options) {
            image.src = options.logo ? options.logo : DEFAUL_SOLID_ICON_URL;
          }
          image.setAttribute('style', style.headerBannerIcon);
          podLink.appendChild(image);
          if (!user) {
            _context3.next = 2;
            break;
          }
          _context3.next = 1;
          return createUserMenu(store, user, userMenuList);
        case 1:
          _t2 = _context3.sent;
          _context3.next = 3;
          break;
        case 2:
          _t2 = createLoginSignUpButtons();
        case 3:
          userMenu = _t2;
          banner = document.createElement('div');
          banner.setAttribute('style', style.headerBanner);
          banner.appendChild(podLink);
          leftSideOfHeader = document.createElement('div');
          leftSideOfHeader.setAttribute('style', style.headerBannerRightMenu);
          leftSideOfHeader.appendChild(userMenu);
          if (options && options.helpMenuList) {
            helpMenu = createHelpMenu(options, options.helpMenuList);
            leftSideOfHeader.appendChild(helpMenu);
          }
          banner.appendChild(leftSideOfHeader);
          return _context3.abrupt("return", banner);
        case 4:
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
  helpMenuList.setAttribute('style', style.headerUserMenuList);
  helpMenuItems.forEach(function (menuItem) {
    var menuItemType = menuItem.url ? 'url' : 'onclick';
    if (menuItemType === 'url') {
      helpMenuList.appendChild(createUserMenuItem(createUserMenuLink(menuItem.label, menuItem.url, menuItem.target)));
    } else {
      helpMenuList.appendChild(createUserMenuItem(createUserMenuButton(menuItem.label, menuItem.onclick)));
    }
  });
  var helpMenu = document.createElement('nav');
  helpMenu.setAttribute('style', style.headerUserMenuNavigationMenuNotDisplayed);
  helpMenu.setAttribute('aria-hidden', 'true');
  helpMenu.setAttribute('id', 'helperNav');
  helpMenu.appendChild(helpMenuList);
  var helpMenuContainer = document.createElement('div');
  helpMenuContainer.setAttribute('style', style.headerBannerUserMenu);
  helpMenuContainer.appendChild(helpMenu);
  var helpMenuTrigger = document.createElement('button');
  helpMenuTrigger.setAttribute('style', style.headerUserMenuTrigger);
  helpMenuTrigger.type = 'button';
  var helpMenuIcon = document.createElement('img');
  helpMenuIcon.src = options && options.helpIcon ? options.helpIcon : _index.icons.iconBase + DEFAULT_HELP_MENU_ICON;
  helpMenuIcon.setAttribute('style', style.headerUserMenuTriggerImg);
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
    var nav = document.getElementById('helperNav');
    nav === null || nav === void 0 || nav.setAttribute('style', style.headerUserMenuNavigationMenu);
  });
  helpMenuContainer.addEventListener('mouseout', function (event) {
    timer = setTimeout(function () {
      return throttledMenuToggle(event);
    }, 200);
    var nav = document.getElementById('helperNav');
    nav === null || nav === void 0 || nav.setAttribute('style', style.headerUserMenuNavigationMenuNotDisplayed);
  });
  return helpMenuContainer;
}
/**
 * @ignore exporting this only for the unit test
 */
function createLoginSignUpButtons() {
  var profileLoginButtonPre = document.createElement('div');
  profileLoginButtonPre.setAttribute('style', style.headerBannerLogin);
  profileLoginButtonPre.appendChild((0, _login.loginStatusBox)(document, null, {}));
  return profileLoginButtonPre;
}
/**
 * @ignore exporting this only for the unit test
 */
function createUserMenuButton(label, onClick) {
  var button = document.createElement('button');
  button.setAttribute('style', style.headerUserMenuButton);
  button.onmouseover = function () {
    button.setAttribute('style', style.headerUserMenuButtonHover);
  };
  button.onmouseout = function () {
    button.setAttribute('style', style.headerUserMenuButton);
  };
  button.addEventListener('click', onClick);
  button.innerText = label;
  return button;
}
/**
 * @ignore exporting this only for the unit test
 */
function createUserMenuLink(label, href, target) {
  var link = document.createElement('a');
  link.setAttribute('style', style.headerUserMenuLink);
  link.onmouseover = function () {
    link.setAttribute('style', style.headerUserMenuLinkHover);
  };
  link.onmouseout = function () {
    link.setAttribute('style', style.headerUserMenuLink);
  };
  link.href = href;
  link.innerText = label;
  if (target) link.target = target;
  return link;
}

/**
 * @ignore exporting this only for the unit test
 */
function createUserMenu(_x9, _x0, _x1) {
  return _createUserMenu.apply(this, arguments);
}
/**
 * @ignore exporting this only for the unit test
 */
function _createUserMenu() {
  _createUserMenu = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(store, user, userMenuList) {
    var fetcher, loggedInMenuList, loggedInMenu, loggedInMenuTrigger, profileImg, loggedInMenuContainer, throttledMenuToggle, timer;
    return _regenerator["default"].wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          fetcher = store.fetcher;
          if (!fetcher) {
            _context4.next = 1;
            break;
          }
          _context4.next = 1;
          return fetcher.load(user);
        case 1:
          loggedInMenuList = document.createElement('ul');
          loggedInMenuList.setAttribute('style', style.headerUserMenuList);
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
          loggedInMenu.setAttribute('style', style.headerUserMenuNavigationMenuNotDisplayed);
          loggedInMenu.setAttribute('aria-hidden', 'true');
          loggedInMenu.setAttribute('id', 'loggedInNav');
          loggedInMenu.appendChild(loggedInMenuList);
          loggedInMenuTrigger = document.createElement('button');
          loggedInMenuTrigger.setAttribute('style', style.headerUserMenuTrigger);
          loggedInMenuTrigger.type = 'button';
          profileImg = getProfileImg(store, user);
          if (typeof profileImg === 'string') {
            loggedInMenuTrigger.innerHTML = profileImg;
          } else {
            loggedInMenuTrigger.appendChild(profileImg);
          }
          loggedInMenuContainer = document.createElement('div');
          loggedInMenuContainer.setAttribute('style', style.headerBannerUserMenuNotDisplayed);
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
            var nav = document.getElementById('loggedInNav');
            nav === null || nav === void 0 || nav.setAttribute('style', style.headerUserMenuNavigationMenu);
          });
          loggedInMenuContainer.addEventListener('mouseout', function (event) {
            timer = setTimeout(function () {
              return throttledMenuToggle(event);
            }, 200);
            var nav = document.getElementById('loggedInNav');
            nav === null || nav === void 0 || nav.setAttribute('style', style.headerUserMenuNavigationMenuNotDisplayed);
          });
          return _context4.abrupt("return", loggedInMenuContainer);
        case 2:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _createUserMenu.apply(this, arguments);
}
function createUserMenuItem(child) {
  var menuProfileItem = document.createElement('li');
  menuProfileItem.setAttribute('style', style.headerUserMenuListItem);
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
  profileImage.setAttribute('style', style.headerUserMenuPhoto);
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