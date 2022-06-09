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

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = require("../index");

var _solidLogic = require("solid-logic");

var _login = require("../login/login");

var widgets = _interopRequireWildcard(require("../widgets"));

var _emptyProfile = require("./empty-profile");

var _headerFooterHelpers = require("../utils/headerFooterHelpers");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

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
  _initHeader = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(store, userMenuList, options) {
    var header, pod;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
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
            pod = (0, _headerFooterHelpers.getPod)();
            rebuildHeader(header, store, pod, userMenuList, options)();

            _solidLogic.authSession.onLogout(rebuildHeader(header, store, pod, userMenuList, options));

            _solidLogic.authSession.onLogin(rebuildHeader(header, store, pod, userMenuList, options));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _initHeader.apply(this, arguments);
}

function rebuildHeader(header, store, pod, userMenuList, options) {
  return /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var user;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
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
  _createBanner = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(store, pod, user, userMenuList, options) {
    var podLink, image, userMenu, banner, leftSideOfHeader, helpMenu;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
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
  _createUserMenu = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(store, user, userMenuList) {
    var fetcher, loggedInMenuList, loggedInMenu, loggedInMenuTrigger, profileImg, loggedInMenuContainer, throttledMenuToggle, timer;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
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