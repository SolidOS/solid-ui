"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initHeader = initHeader;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _rdflib = require("rdflib");

var _authn = require("../authn/authn");

var _widgets = require("../widgets");

var _icon = require("./icon");

var _emptyProfile = require("./empty-profile");

var _headerHelpers = require("./headerHelpers");

/*
    This file was copied from mashlib/src/global/header.ts file. It is modified to
    work in solid-ui by adjusting where imported functions are found.
 */
function initHeader(_x, _x2) {
  return _initHeader.apply(this, arguments);
}

function _initHeader() {
  _initHeader = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(store, options) {
    var header, pod;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            header = document.getElementById('PageHeader');

            if (header) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return");

          case 3:
            pod = (0, _headerHelpers.getPod)();

            _authn.solidAuthClient.trackSession(rebuildHeader(header, store, pod, options));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _initHeader.apply(this, arguments);
}

function rebuildHeader(header, store, pod, options) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(session) {
      var user;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              user = session ? (0, _rdflib.sym)(session.webId) : null;
              header.innerHTML = '';
              _context.t0 = header;
              _context.next = 5;
              return createBanner(store, pod, user, options);

            case 5:
              _context.t1 = _context.sent;

              _context.t0.appendChild.call(_context.t0, _context.t1);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x3) {
      return _ref.apply(this, arguments);
    };
  }();
}

function createBanner(_x4, _x5, _x6, _x7) {
  return _createBanner.apply(this, arguments);
}

function _createBanner() {
  _createBanner = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(store, pod, user, options) {
    var podLink, menu, banner;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            podLink = document.createElement('a');
            podLink.href = pod.uri;
            podLink.classList.add('header-banner__link');
            podLink.innerHTML = _icon.icon;

            if (!user) {
              _context3.next = 10;
              break;
            }

            _context3.next = 7;
            return createUserMenu(store, user, options);

          case 7:
            _context3.t0 = _context3.sent;
            _context3.next = 11;
            break;

          case 10:
            _context3.t0 = createLoginSignUpButtons();

          case 11:
            menu = _context3.t0;
            banner = document.createElement('div');
            banner.classList.add('header-banner');
            banner.appendChild(podLink);
            banner.appendChild(menu);
            return _context3.abrupt("return", banner);

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _createBanner.apply(this, arguments);
}

function createLoginSignUpButtons() {
  var profileLoginButtonPre = document.createElement('div');
  profileLoginButtonPre.classList.add('header-banner__login');
  profileLoginButtonPre.appendChild((0, _authn.loginStatusBox)(document, null, {}));
  return profileLoginButtonPre;
}

function createUserMenuButton(label, onClick) {
  var button = document.createElement('button');
  button.classList.add('header-user-menu__button');
  button.addEventListener('click', onClick);
  button.innerText = label;
  return button;
}

function createUserMenuLink(label, href) {
  var link = document.createElement('a');
  link.classList.add('header-user-menu__link');
  link.href = href;
  link.innerText = label;
  return link;
}

function createUserMenu(_x8, _x9, _x10) {
  return _createUserMenu.apply(this, arguments);
}

function _createUserMenu() {
  _createUserMenu = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(store, user, options) {
    var fetcher, loggedInMenuList, loggedInMenu, loggedInMenuTrigger, profileImg, loggedInMenuContainer, throttledMenuToggle, timer;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
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
            loggedInMenuList.classList.add('header-user-menu__list');
            loggedInMenuList.appendChild(createUserMenuItem(createUserMenuLink('Show your profile', user.uri)));
            loggedInMenuList.appendChild(createUserMenuItem(createUserMenuButton('Log out', function () {
              return _authn.solidAuthClient.logout();
            })));
            loggedInMenu = document.createElement('nav');
            loggedInMenu.classList.add('header-user-menu__navigation-menu');
            loggedInMenu.setAttribute('aria-hidden', 'true');
            loggedInMenu.appendChild(loggedInMenuList);
            loggedInMenuTrigger = document.createElement('button');
            loggedInMenuTrigger.classList.add('header-user-menu__trigger');
            loggedInMenuTrigger.type = 'button';
            profileImg = getProfileImg(store, user);

            if (typeof profileImg === 'string') {
              loggedInMenuTrigger.innerHTML = profileImg;
            } else {
              loggedInMenuTrigger.appendChild(profileImg);
            }

            loggedInMenuContainer = document.createElement('div');
            loggedInMenuContainer.classList.add('header-banner__user-menu', 'header-user-menu');
            loggedInMenuContainer.appendChild(loggedInMenuTrigger);
            loggedInMenuContainer.appendChild(loggedInMenu);
            throttledMenuToggle = (0, _headerHelpers.throttle)(function (event) {
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
      }
    }, _callee4);
  }));
  return _createUserMenu.apply(this, arguments);
}

function createUserMenuItem(child) {
  var menuProfileItem = document.createElement('li');
  menuProfileItem.classList.add('header-user-menu__list-item');
  menuProfileItem.appendChild(child);
  return menuProfileItem;
}

function getProfileImg(store, user) {
  var profileUrl = null;

  try {
    var _profileUrl = _widgets.widgets.findImage(user);

    if (!_profileUrl) {
      return _emptyProfile.emptyProfile;
    }
  } catch (_unused) {
    return _emptyProfile.emptyProfile;
  }

  var profileImage = document.createElement('div');
  profileImage.classList.add('header-user-menu__photo');
  profileImage.style.backgroundImage = "url(\"".concat(profileUrl, "\")");
  return profileImage;
}

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