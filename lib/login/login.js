"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureLoadedPreferences = ensureLoadedPreferences;
exports.ensureLoadedProfile = ensureLoadedProfile;
exports.ensureLoggedIn = ensureLoggedIn;
exports.filterAvailablePanes = filterAvailablePanes;
exports.findAppInstances = findAppInstances;
exports.getUserRoles = getUserRoles;
exports.loginStatusBox = loginStatusBox;
exports.newAppInstance = newAppInstance;
exports.registrationControl = registrationControl;
exports.registrationList = registrationList;
exports.renderScopeHeadingRow = renderScopeHeadingRow;
exports.renderSignInPopup = renderSignInPopup;
exports.scopeLabel = scopeLabel;
exports.selectWorkspace = selectWorkspace;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _rdflib = require("rdflib");
var _solidLogic = require("solid-logic");
var debug = _interopRequireWildcard(require("../debug"));
var style = _interopRequireWildcard(require("../style"));
var _log = require("../log");
var ns = _interopRequireWildcard(require("../ns.js"));
var _signup = require("../signup/signup.js");
var utils = _interopRequireWildcard(require("../utils"));
var widgets = _interopRequireWildcard(require("../widgets"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t10 in e) "default" !== _t10 && {}.hasOwnProperty.call(e, _t10) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t10)) && (i.get || i.set) ? o(f, _t10, i) : f[_t10] = e[_t10]); return f; })(e, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /* eslint-disable camelcase */ /**
 * Signing in, signing up, profile and preferences reloading
 * Type index management
 *
 * Many functions in this module take a context object which
 * holds various RDF symbols, add to it, and return a promise of it.
 *
 * * `me`                RDF symbol for the user's WebID
 * * `publicProfile`     The user's public profile, iff loaded
 * * `preferencesFile`   The user's personal preference file, iff loaded
 * * `index.public`      The user's public type index file
 * * `index.private`     The user's private type index file
 *
 * Not RDF symbols:
 * * `noun`            A string in english for the type of thing -- like "address book"
 * * `instance`        An array of nodes which are existing instances
 * * `containers`      An array of nodes of containers of instances
 * * `div`             A DOM element where UI can be displayed
 * * `statusArea`      A DOM element (opt) progress stuff can be displayed, or error messages
 * *
 * * Vocabulary:  "load" loads a file if it exists;
 * *  'Ensure" CREATES the file if it does not exist (if it can) and then loads it.
 * @packageDocumentation
 */ // eslint-disable-next-line camelcase
var store = _solidLogic.solidLogicSingleton.store;
var _solidLogicSingleton$ = _solidLogic.solidLogicSingleton.profile,
  loadPreferences = _solidLogicSingleton$.loadPreferences,
  loadProfile = _solidLogicSingleton$.loadProfile;
var _solidLogicSingleton$2 = _solidLogic.solidLogicSingleton.typeIndex,
  getScopedAppInstances = _solidLogicSingleton$2.getScopedAppInstances,
  getRegistrations = _solidLogicSingleton$2.getRegistrations,
  loadAllTypeIndexes = _solidLogicSingleton$2.loadAllTypeIndexes,
  getScopedAppsFromIndex = _solidLogicSingleton$2.getScopedAppsFromIndex,
  deleteTypeIndexRegistration = _solidLogicSingleton$2.deleteTypeIndexRegistration;

/**
 * Resolves with the logged in user's WebID
 *
 * @param context
 */
// used to be logIn
function ensureLoggedIn(context) {
  var me = _solidLogic.authn.currentUser();
  if (me) {
    _solidLogic.authn.saveUser(me, context);
    return Promise.resolve(context);
  }
  return new Promise(function (resolve) {
    _solidLogic.authn.checkUser().then(function (webId) {
      // Already logged in?
      if (webId) {
        debug.log("logIn: Already logged in as ".concat(webId));
        return resolve(context);
      }
      if (!context.div || !context.dom) {
        return resolve(context);
      }
      var box = loginStatusBox(context.dom, function (webIdUri) {
        _solidLogic.authn.saveUser(webIdUri, context);
        resolve(context); // always pass growing context
      });
      context.div.appendChild(box);
    });
  });
}

/**
 * Loads preference file
 * Do this after having done log in and load profile
 *
 * @private
 *
 * @param context
 */
// used to be logInLoadPreferences
function ensureLoadedPreferences(_x) {
  return _ensureLoadedPreferences.apply(this, arguments);
}
/**
 * Logs the user in and loads their WebID profile document into the store
 *
 * @param context
 *
 * @returns Resolves with the context after login / fetch
 */
// used to be logInLoadProfile
function _ensureLoadedPreferences() {
  _ensureLoadedPreferences = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(context) {
    var progressDisplay, preferencesFile, m2, _t5;
    return _regenerator["default"].wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!context.preferencesFile) {
            _context4.next = 1;
            break;
          }
          return _context4.abrupt("return", Promise.resolve(context));
        case 1:
          _context4.prev = 1;
          _context4.next = 2;
          return ensureLoadedProfile(context);
        case 2:
          context = _context4.sent;
          _context4.next = 3;
          return loadPreferences(context.me);
        case 3:
          preferencesFile = _context4.sent;
          if (progressDisplay) {
            progressDisplay.parentNode.removeChild(progressDisplay);
          }
          context.preferencesFile = preferencesFile;
          _context4.next = 11;
          break;
        case 4:
          _context4.prev = 4;
          _t5 = _context4["catch"](1);
          if (!(_t5 instanceof _solidLogic.UnauthorizedError)) {
            _context4.next = 5;
            break;
          }
          m2 = 'Ooops - you are not authenticated (properly logged in) to for me to read your preference file.  Try loggin out and logging in?';
          (0, _log.alert)(m2);
          _context4.next = 11;
          break;
        case 5:
          if (!(_t5 instanceof _solidLogic.CrossOriginForbiddenError)) {
            _context4.next = 6;
            break;
          }
          m2 = "Unauthorized: Assuming preference file blocked for origin ".concat(window.location.origin);
          context.preferencesFileError = m2;
          return _context4.abrupt("return", context);
        case 6:
          if (!(_t5 instanceof _solidLogic.SameOriginForbiddenError)) {
            _context4.next = 7;
            break;
          }
          m2 = 'You are not authorized to read your preference file. This may be because you are using an untrusted web app.';
          debug.warn(m2);
          return _context4.abrupt("return", context);
        case 7:
          if (!(_t5 instanceof _solidLogic.NotEditableError)) {
            _context4.next = 8;
            break;
          }
          m2 = 'You are not authorized to edit your preference file. This may be because you are using an untrusted web app.';
          debug.warn(m2);
          return _context4.abrupt("return", context);
        case 8:
          if (!(_t5 instanceof _solidLogic.WebOperationError)) {
            _context4.next = 9;
            break;
          }
          m2 = 'You are not authorized to edit your preference file. This may be because you are using an untrusted web app.';
          debug.warn(m2);
          _context4.next = 11;
          break;
        case 9:
          if (!(_t5 instanceof _solidLogic.FetchError)) {
            _context4.next = 10;
            break;
          }
          m2 = "Strange: Error ".concat(_t5.status, " trying to read your preference file.").concat(_t5.message);
          (0, _log.alert)(m2);
          _context4.next = 11;
          break;
        case 10:
          throw new Error("(via loadPrefs) ".concat(_t5));
        case 11:
          return _context4.abrupt("return", context);
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 4]]);
  }));
  return _ensureLoadedPreferences.apply(this, arguments);
}
function ensureLoadedProfile(_x2) {
  return _ensureLoadedProfile.apply(this, arguments);
}
/**
  * Returns promise of context with arrays of symbols
  *
  * leaving the `isPublic` param undefined will bring in community index things, too
  */
function _ensureLoadedProfile() {
  _ensureLoadedProfile = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(context) {
    var logInContext, _t6;
    return _regenerator["default"].wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!context.publicProfile) {
            _context5.next = 1;
            break;
          }
          return _context5.abrupt("return", context);
        case 1:
          _context5.prev = 1;
          _context5.next = 2;
          return ensureLoggedIn(context);
        case 2:
          logInContext = _context5.sent;
          if (logInContext.me) {
            _context5.next = 3;
            break;
          }
          throw new Error('Could not log in');
        case 3:
          _context5.next = 4;
          return loadProfile(logInContext.me);
        case 4:
          context.publicProfile = _context5.sent;
          _context5.next = 6;
          break;
        case 5:
          _context5.prev = 5;
          _t6 = _context5["catch"](1);
          if (context.div && context.dom) {
            context.div.appendChild(widgets.errorMessageBlock(context.dom, _t6.message));
          }
          throw new Error("Can't log in: ".concat(_t6));
        case 6:
          return _context5.abrupt("return", context);
        case 7:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 5]]);
  }));
  return _ensureLoadedProfile.apply(this, arguments);
}
function findAppInstances(_x3, _x4, _x5) {
  return _findAppInstances.apply(this, arguments);
}
function _findAppInstances() {
  _findAppInstances = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(context, theClass, isPublic) {
    var items, _t7;
    return _regenerator["default"].wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (!context.me) {
            _context6.next = 2;
            break;
          }
          _context6.next = 1;
          return getScopedAppInstances(theClass, context.me);
        case 1:
          _t7 = _context6.sent;
          _context6.next = 3;
          break;
        case 2:
          _t7 = [];
        case 3:
          items = _t7;
          if (isPublic === true) {
            // old API - not recommended!
            items = items.filter(function (item) {
              return item.scope.label === 'public';
            });
          } else if (isPublic === false) {
            items = items.filter(function (item) {
              return item.scope.label === 'private';
            });
          }
          context.instances = items.map(function (item) {
            return item.instance;
          });
          return _context6.abrupt("return", context);
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _findAppInstances.apply(this, arguments);
}
function scopeLabel(context, scope) {
  var mine = context.me && context.me.sameTerm(scope.agent);
  var name = mine ? '' : utils.label(scope.agent) + ' ';
  return "".concat(name).concat(scope.label);
}
/**
 * UI to control registration of instance
 */
function registrationControl(_x6, _x7, _x8) {
  return _registrationControl.apply(this, arguments);
}
function _registrationControl() {
  _registrationControl = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(context, instance, theClass) {
    var registrationStatements, renderScopeCheckbox, dom, box, me, scopes, msg, tbody, form, _iterator, _step, scope, row, _t8;
    return _regenerator["default"].wrap(function (_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          renderScopeCheckbox = function _renderScopeCheckbox(scope) {
            var statements = registrationStatements(scope.index);
            var name = scopeLabel(context, scope);
            var label = "".concat(name, " link to this ").concat(context.noun);
            return widgets.buildCheckboxForm(context.dom, _solidLogic.solidLogicSingleton.store, label, null, statements, form, scope.index);
          };
          registrationStatements = function _registrationStatemen(index) {
            var registrations = getRegistrations(instance, theClass);
            var reg = registrations.length ? registrations[0] : widgets.newThing(index);
            return [(0, _rdflib.st)(reg, ns.solid('instance'), instance, index), (0, _rdflib.st)(reg, ns.solid('forClass'), theClass, index)];
          };
          /// / body of registrationControl
          dom = context.dom;
          if (!(!dom || !context.div)) {
            _context7.next = 1;
            break;
          }
          throw new Error('registrationControl: need dom and div');
        case 1:
          box = dom.createElement('div');
          context.div.appendChild(box);
          context.me = _solidLogic.authn.currentUser(); // @@
          me = context.me;
          if (me) {
            _context7.next = 2;
            break;
          }
          box.innerHTML = '<p style="margin:2em;">(Log in to save a link to this)</p>';
          return _context7.abrupt("return", context);
        case 2:
          _context7.prev = 2;
          _context7.next = 3;
          return loadAllTypeIndexes(me);
        case 3:
          scopes = _context7.sent;
          _context7.next = 5;
          break;
        case 4:
          _context7.prev = 4;
          _t8 = _context7["catch"](2);
          if (context.div && context.preferencesFileError) {
            msg = '(Lists of stuff not available)';
            context.div.appendChild(dom.createElement('p')).textContent = msg;
          } else if (context.div) {
            msg = "registrationControl: Type indexes not available: ".concat(_t8);
            context.div.appendChild(widgets.errorMessageBlock(context.dom, _t8));
          }
          debug.log(msg);
          return _context7.abrupt("return", context);
        case 5:
          box.innerHTML = '<table><tbody></tbody></table>'; // tbody will be inserted anyway
          box.setAttribute('style', 'font-size: 120%; text-align: right; padding: 1em; border: solid gray 0.05em;');
          tbody = box.children[0].children[0];
          form = new _rdflib.BlankNode(); // @@ say for now
          _iterator = _createForOfIteratorHelper(scopes);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              scope = _step.value;
              row = tbody.appendChild(dom.createElement('tr'));
              row.appendChild(renderScopeCheckbox(scope)); // @@ index
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return _context7.abrupt("return", context);
        case 6:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[2, 4]]);
  }));
  return _registrationControl.apply(this, arguments);
}
function renderScopeHeadingRow(context, store, scope) {
  var backgroundColor = {
    "private": '#fee',
    "public": '#efe'
  };
  var dom = context.dom;
  var name = scopeLabel(context, scope);
  var row = dom.createElement('tr');
  var cell = row.appendChild(dom.createElement('td'));
  cell.setAttribute('colspan', '3');
  cell.style.backgoundColor = backgroundColor[scope.label] || 'white';
  var header = cell.appendChild(dom.createElement('h3'));
  header.textContent = name + ' links';
  header.style.textAlign = 'left';
  return row;
}
/**
  * UI to List at all registered things
  */
function registrationList(_x9, _x0) {
  return _registrationList.apply(this, arguments);
} // registrationList
/**
 * Bootstrapping identity
 * (Called by `loginStatusBox()`)
 *
 * @param dom
 * @param setUserCallback
 *
 * @returns
 */
function _registrationList() {
  _registrationList = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(context, options) {
    var dom, div, box, scopes, table, tbody, _iterator2, _step2, scope, headingRow, items, _iterator3, _step3, _loop, _t9, _t0;
    return _regenerator["default"].wrap(function (_context0) {
      while (1) switch (_context0.prev = _context0.next) {
        case 0:
          dom = context.dom;
          div = context.div;
          box = dom.createElement('div');
          div.appendChild(box);
          context.me = _solidLogic.authn.currentUser(); // @@
          if (context.me) {
            _context0.next = 1;
            break;
          }
          box.innerHTML = '<p style="margin:2em;">(Log in list your stuff)</p>';
          return _context0.abrupt("return", context);
        case 1:
          _context0.next = 2;
          return loadAllTypeIndexes(context.me);
        case 2:
          scopes = _context0.sent;
          // includes community indexes

          // console.log('@@ registrationList ', scopes)
          box.innerHTML = '<table><tbody></tbody></table>'; // tbody will be inserted anyway
          box.setAttribute('style', 'font-size: 120%; text-align: right; padding: 1em; border: solid #eee 0.5em;');
          table = box.firstChild;
          tbody = table.firstChild;
          _iterator2 = _createForOfIteratorHelper(scopes);
          _context0.prev = 3;
          _iterator2.s();
        case 4:
          if ((_step2 = _iterator2.n()).done) {
            _context0.next = 13;
            break;
          }
          scope = _step2.value;
          // need some predicate for listing/adding agents
          headingRow = renderScopeHeadingRow(context, store, scope);
          tbody.appendChild(headingRow);
          _context0.next = 5;
          return getScopedAppsFromIndex(scope, options.type || null);
        case 5:
          items = _context0.sent;
          // any class
          if (items.length === 0) headingRow.style.display = 'none';
          // console.log(`registrationList: @@ instance items for class ${options.type || 'undefined' }:`, items)
          _iterator3 = _createForOfIteratorHelper(items);
          _context0.prev = 6;
          _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
            var item, row;
            return _regenerator["default"].wrap(function (_context9) {
              while (1) switch (_context9.prev = _context9.next) {
                case 0:
                  item = _step3.value;
                  row = widgets.personTR(dom, ns.solid('instance'), item.instance, {
                    deleteFunction: function () {
                      var _deleteFunction = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8() {
                        return _regenerator["default"].wrap(function (_context8) {
                          while (1) switch (_context8.prev = _context8.next) {
                            case 0:
                              _context8.next = 1;
                              return deleteTypeIndexRegistration(item);
                            case 1:
                              tbody.removeChild(row);
                            case 2:
                            case "end":
                              return _context8.stop();
                          }
                        }, _callee8);
                      }));
                      function deleteFunction() {
                        return _deleteFunction.apply(this, arguments);
                      }
                      return deleteFunction;
                    }()
                  });
                  row.children[0].style.paddingLeft = '3em';
                  tbody.appendChild(row);
                case 1:
                case "end":
                  return _context9.stop();
              }
            }, _loop);
          });
          _iterator3.s();
        case 7:
          if ((_step3 = _iterator3.n()).done) {
            _context0.next = 9;
            break;
          }
          return _context0.delegateYield(_loop(), "t0", 8);
        case 8:
          _context0.next = 7;
          break;
        case 9:
          _context0.next = 11;
          break;
        case 10:
          _context0.prev = 10;
          _t9 = _context0["catch"](6);
          _iterator3.e(_t9);
        case 11:
          _context0.prev = 11;
          _iterator3.f();
          return _context0.finish(11);
        case 12:
          _context0.next = 4;
          break;
        case 13:
          _context0.next = 15;
          break;
        case 14:
          _context0.prev = 14;
          _t0 = _context0["catch"](3);
          _iterator2.e(_t0);
        case 15:
          _context0.prev = 15;
          _iterator2.f();
          return _context0.finish(15);
        case 16:
          return _context0.abrupt("return", context);
        case 17:
        case "end":
          return _context0.stop();
      }
    }, _callee9, null, [[3, 14, 15, 16], [6, 10, 11, 12]]);
  }));
  return _registrationList.apply(this, arguments);
}
function signInOrSignUpBox(dom, setUserCallback) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  options = options || {};
  var signInButtonStyle = options.buttonStyle || style.signInAndUpButtonStyle;
  var box = dom.createElement('div');
  var magicClassName = 'SolidSignInOrSignUpBox';
  debug.log('widgets.signInOrSignUpBox');
  box.setUserCallback = setUserCallback;
  box.setAttribute('class', magicClassName);
  box.setAttribute('style', 'display:flex;');

  // Sign in button with PopUP
  var signInPopUpButton = dom.createElement('input'); // multi
  box.appendChild(signInPopUpButton);
  signInPopUpButton.setAttribute('type', 'button');
  signInPopUpButton.setAttribute('value', 'Log in');
  signInPopUpButton.setAttribute('style', "".concat(signInButtonStyle).concat(style.headerBannerLoginInput) + style.signUpBackground);
  _solidLogic.authSession.onLogin(function () {
    var me = _solidLogic.authn.currentUser();
    // const sessionInfo = authSession.info
    // if (sessionInfo && sessionInfo.isLoggedIn) {
    if (me) {
      // const webIdURI = sessionInfo.webId
      var webIdURI = me.uri;
      // setUserCallback(webIdURI)
      var divs = dom.getElementsByClassName(magicClassName);
      debug.log("Logged in, ".concat(divs.length, " panels to be serviced"));
      // At the same time, satisfy all the other login boxes
      for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
        // @@ TODO Remove the need to manipulate HTML elements
        if (div.setUserCallback) {
          try {
            div.setUserCallback(webIdURI);
            var parent = div.parentNode;
            if (parent) {
              parent.removeChild(div);
            }
          } catch (e) {
            debug.log("## Error satisfying login box: ".concat(e));
            div.appendChild(widgets.errorMessageBlock(dom, e));
          }
        }
      }
    }
  });
  signInPopUpButton.addEventListener('click', function () {
    var offline = (0, _solidLogic.offlineTestID)();
    if (offline) return setUserCallback(offline.uri);
    renderSignInPopup(dom);
  }, false);

  // Sign up button
  var signupButton = dom.createElement('input');
  box.appendChild(signupButton);
  signupButton.setAttribute('type', 'button');
  signupButton.setAttribute('value', 'Sign Up for Solid');
  signupButton.setAttribute('style', "".concat(signInButtonStyle).concat(style.headerBannerLoginInput) + style.signInBackground);
  signupButton.addEventListener('click', function (_event) {
    var signupMgr = new _signup.Signup();
    signupMgr.signup().then(function (uri) {
      debug.log('signInOrSignUpBox signed up ' + uri);
      setUserCallback(uri);
    });
  }, false);
  return box;
}
function renderSignInPopup(dom) {
  /**
   * Issuer Menu
   */
  var issuerPopup = dom.createElement('div');
  issuerPopup.setAttribute('style', 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center;');
  dom.body.appendChild(issuerPopup);
  var issuerPopupBox = dom.createElement('div');
  issuerPopupBox.setAttribute('style', "\n      background-color: white;\n      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      -webkit-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      -moz-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      -o-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      border-radius: 4px;\n      min-width: 400px;\n      padding: 10px;\n      z-index : 10;\n    ");
  issuerPopup.appendChild(issuerPopupBox);
  var issuerPopupBoxTopMenu = dom.createElement('div');
  issuerPopupBoxTopMenu.setAttribute('style', "\n      border-bottom: 1px solid #DDD;\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      justify-content: space-between;\n    ");
  issuerPopupBox.appendChild(issuerPopupBoxTopMenu);
  var issuerPopupBoxLabel = dom.createElement('label');
  issuerPopupBoxLabel.setAttribute('style', 'margin-right: 5px; font-weight: 800');
  issuerPopupBoxLabel.innerText = 'Select an identity provider';
  var issuerPopupBoxCloseButton = dom.createElement('button');
  issuerPopupBoxCloseButton.innerHTML = '<img src="https://solidos.github.io/solid-ui/src/icons/noun_1180156.svg" style="width: 2em; height: 2em;" title="Cancel">';
  issuerPopupBoxCloseButton.setAttribute('style', 'background-color: transparent; border: none;');
  issuerPopupBoxCloseButton.addEventListener('click', function () {
    issuerPopup.remove();
  });
  issuerPopupBoxTopMenu.appendChild(issuerPopupBoxLabel);
  issuerPopupBoxTopMenu.appendChild(issuerPopupBoxCloseButton);
  var loginToIssuer = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(issuerUri) {
      var preLoginRedirectHash, locationUrl, _t;
      return _regenerator["default"].wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // clear authorization metadata from store
            _solidLogic.solidLogicSingleton.store.updater.flagAuthorizationMetadata();
            // Save hash
            preLoginRedirectHash = new URL(window.location.href).hash;
            if (preLoginRedirectHash) {
              window.localStorage.setItem('preLoginRedirectHash', preLoginRedirectHash);
            }
            window.localStorage.setItem('loginIssuer', issuerUri);
            // Login
            locationUrl = new URL(window.location.href);
            locationUrl.hash = ''; // remove hash part
            _context.next = 1;
            return _solidLogic.authSession.login({
              redirectUrl: locationUrl.href,
              oidcIssuer: issuerUri
            });
          case 1:
            _context.next = 3;
            break;
          case 2:
            _context.prev = 2;
            _t = _context["catch"](0);
            (0, _log.alert)(_t.message);
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 2]]);
    }));
    return function loginToIssuer(_x1) {
      return _ref.apply(this, arguments);
    };
  }();

  /**
   * Text-based idp selection
   */
  var issuerTextContainer = dom.createElement('div');
  issuerTextContainer.setAttribute('style', "\n      border-bottom: 1px solid #DDD;\n      display: flex;\n      flex-direction: column;\n      padding-top: 10px;\n    ");
  var issuerTextInputContainer = dom.createElement('div');
  issuerTextInputContainer.setAttribute('style', "\n      display: flex;\n      flex-direction: row;\n    ");
  var issuerTextLabel = dom.createElement('label');
  issuerTextLabel.innerText = 'Enter the URL of your identity provider:';
  issuerTextLabel.setAttribute('style', 'color: #888');
  var issuerTextInput = dom.createElement('input');
  issuerTextInput.setAttribute('type', 'text');
  issuerTextInput.setAttribute('style', 'margin-left: 0 !important; flex: 1; margin-right: 5px !important');
  issuerTextInput.setAttribute('placeholder', 'https://example.com');
  issuerTextInput.value = localStorage.getItem('loginIssuer') || '';
  var issuerTextGoButton = dom.createElement('button');
  issuerTextGoButton.innerText = 'Go';
  issuerTextGoButton.setAttribute('style', 'margin-top: 12px; margin-bottom: 12px;');
  issuerTextGoButton.addEventListener('click', function () {
    loginToIssuer(issuerTextInput.value);
  });
  issuerTextContainer.appendChild(issuerTextLabel);
  issuerTextInputContainer.appendChild(issuerTextInput);
  issuerTextInputContainer.appendChild(issuerTextGoButton);
  issuerTextContainer.appendChild(issuerTextInputContainer);
  issuerPopupBox.appendChild(issuerTextContainer);

  /**
   * Button-based idp selection
   */
  var issuerButtonContainer = dom.createElement('div');
  issuerButtonContainer.setAttribute('style', "\n      display: flex;\n      flex-direction: column;\n      padding-top: 10px;\n    ");
  var issuerBottonLabel = dom.createElement('label');
  issuerBottonLabel.innerText = 'Or pick an identity provider from the list below:';
  issuerBottonLabel.setAttribute('style', 'color: #888');
  issuerButtonContainer.appendChild(issuerBottonLabel);
  (0, _solidLogic.getSuggestedIssuers)().forEach(function (issuerInfo) {
    var issuerButton = dom.createElement('button');
    issuerButton.innerText = issuerInfo.name;
    issuerButton.setAttribute('style', 'height: 38px; margin-top: 10px');
    issuerButton.addEventListener('click', function () {
      loginToIssuer(issuerInfo.uri);
    });
    issuerButtonContainer.appendChild(issuerButton);
  });
  issuerPopupBox.appendChild(issuerButtonContainer);
}

/**
 * Login status box
 *
 * A big sign-up/sign in box or a logout box depending on the state
 *
 * @param dom
 * @param listener
 *
 * @returns
 */
function loginStatusBox(dom) {
  var listener = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // 20190630
  var me = (0, _solidLogic.offlineTestID)();
  // @@ TODO Remove the need to cast HTML element to any
  var box = dom.createElement('div');
  function setIt(newidURI) {
    if (!newidURI) {
      return;
    }

    // const uri = newidURI.uri || newidURI
    // me = sym(uri)
    me = _solidLogic.authn.saveUser(newidURI);
    box.refresh();
    if (listener) listener(me.uri);
  }
  function logoutButtonHandler(_event) {
    var oldMe = me;
    _solidLogic.authSession.logout().then(function () {
      var message = "Your WebID was ".concat(oldMe, ". It has been forgotten.");
      me = null;
      try {
        (0, _log.alert)(message);
      } catch (e) {
        window.alert(message);
      }
      box.refresh();
      if (listener) listener(null);
    }, function (err) {
      (0, _log.alert)('Fail to log out:' + err);
    });
  }
  function logoutButton(me, options) {
    var signInButtonStyle = options.buttonStyle || style.signInAndUpButtonStyle;
    var logoutLabel = 'WebID logout';
    if (me) {
      var nick = _solidLogic.solidLogicSingleton.store.any(me, ns.foaf('nick')) || _solidLogic.solidLogicSingleton.store.any(me, ns.foaf('name'));
      if (nick) {
        logoutLabel = 'Logout ' + nick.value;
      }
    }
    var signOutButton = dom.createElement('input');
    // signOutButton.className = 'WebIDCancelButton'
    signOutButton.setAttribute('type', 'button');
    signOutButton.setAttribute('value', logoutLabel);
    signOutButton.setAttribute('style', "".concat(signInButtonStyle));
    signOutButton.addEventListener('click', logoutButtonHandler, false);
    return signOutButton;
  }
  box.refresh = function () {
    var sessionInfo = _solidLogic.authSession.info;
    if (sessionInfo && sessionInfo.webId && sessionInfo.isLoggedIn) {
      me = _solidLogic.solidLogicSingleton.store.sym(sessionInfo.webId);
    } else {
      me = null;
    }
    if (me && box.me !== me.uri || !me && box.me) {
      widgets.clearElement(box);
      if (me) {
        box.appendChild(logoutButton(me, options));
      } else {
        box.appendChild(signInOrSignUpBox(dom, setIt, options));
      }
    }
    box.me = me ? me.uri : null;
  };
  box.refresh();
  function trackSession() {
    me = _solidLogic.authn.currentUser();
    box.refresh();
  }
  trackSession();
  _solidLogic.authSession.onLogin(trackSession);
  _solidLogic.authSession.onLogout(trackSession);
  box.me = '99999'; // Force refresh
  box.refresh();
  return box;
}
_solidLogic.authSession.onLogout(/*#__PURE__*/(0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  var issuer, wellKnownUri, wellKnownResult, openidConfiguration, _t2;
  return _regenerator["default"].wrap(function (_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        issuer = window.localStorage.getItem('loginIssuer');
        if (!issuer) {
          _context2.next = 6;
          break;
        }
        _context2.prev = 1;
        // clear authorization metadata from store
        _solidLogic.solidLogicSingleton.store.updater.flagAuthorizationMetadata();
        wellKnownUri = new URL(issuer);
        wellKnownUri.pathname = '/.well-known/openid-configuration';
        _context2.next = 2;
        return fetch(wellKnownUri.toString());
      case 2:
        wellKnownResult = _context2.sent;
        if (!(wellKnownResult.status === 200)) {
          _context2.next = 4;
          break;
        }
        _context2.next = 3;
        return wellKnownResult.json();
      case 3:
        openidConfiguration = _context2.sent;
        if (!(openidConfiguration && openidConfiguration.end_session_endpoint)) {
          _context2.next = 4;
          break;
        }
        _context2.next = 4;
        return fetch(openidConfiguration.end_session_endpoint, {
          credentials: 'include'
        });
      case 4:
        _context2.next = 6;
        break;
      case 5:
        _context2.prev = 5;
        _t2 = _context2["catch"](1);
      case 6:
        window.location.reload();
      case 7:
      case "end":
        return _context2.stop();
    }
  }, _callee2, null, [[1, 5]]);
})));

/**
 * Workspace selection etc
 * See https://github.com/solidos/userguide/issues/16
 */

/**
 * Returns a UI object which, if it selects a workspace,
 * will callback(workspace, newBase).
 * See https://github.com/solidos/userguide/issues/16 for more info on workspaces.
 *
 * If necessary, will get an account, preference file, etc. In sequence:
 *
 *   - If not logged in, log in.
 *   - Load preference file
 *   - Prompt user for workspaces
 *   - Allows the user to just type in a URI by hand
 *
 * Calls back with the workspace and the base URI
 *
 * @param dom
 * @param appDetails
 * @param callbackWS
 */
function selectWorkspace(dom, appDetails, callbackWS) {
  var noun = appDetails.noun;
  var appPathSegment = appDetails.appPathSegment;
  var me = (0, _solidLogic.offlineTestID)();
  var box = dom.createElement('div');
  var context = {
    me: me,
    dom: dom,
    div: box
  };
  function say(s, background) {
    box.appendChild(widgets.errorMessageBlock(dom, s, background));
  }
  function figureOutBase(ws) {
    var newBaseNode = _solidLogic.solidLogicSingleton.store.any(ws, ns.space('uriPrefix'));
    var newBaseString;
    if (!newBaseNode) {
      newBaseString = ws.uri.split('#')[0];
    } else {
      newBaseString = newBaseNode.value;
    }
    if (newBaseString.slice(-1) !== '/') {
      debug.log("".concat(appPathSegment, ": No / at end of uriPrefix ").concat(newBaseString)); // @@ paramater?
      newBaseString = "".concat(newBaseString, "/");
    }
    var now = new Date();
    newBaseString += "".concat(appPathSegment, "/id").concat(now.getTime(), "/"); // unique id
    return newBaseString;
  }
  function displayOptions(context) {
    // console.log('displayOptions!', context)
    function makeNewWorkspace(_x10) {
      return _makeNewWorkspace.apply(this, arguments);
    } // const status = ''
    function _makeNewWorkspace() {
      _makeNewWorkspace = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(_event) {
        var row, cell, newBase, newWs, newData, _t3, _t4;
        return _regenerator["default"].wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              row = table.appendChild(dom.createElement('tr'));
              cell = row.appendChild(dom.createElement('td'));
              cell.setAttribute('colspan', '3');
              cell.style.padding = '0.5em';
              _t3 = encodeURI;
              _context3.next = 1;
              return widgets.askName(dom, _solidLogic.solidLogicSingleton.store, cell, ns.solid('URL'), ns.space('Workspace'), 'Workspace');
            case 1:
              _t4 = _context3.sent;
              newBase = _t3(_t4);
              newWs = widgets.newThing(context.preferencesFile);
              newData = [(0, _rdflib.st)(context.me, ns.space('workspace'), newWs, context.preferencesFile),
              // eslint-disable-next-line camelcase
              (0, _rdflib.st)(newWs, ns.space('uriPrefix'), newBase, context.preferencesFile)];
              if (_solidLogic.solidLogicSingleton.store.updater) {
                _context3.next = 2;
                break;
              }
              throw new Error('store has no updater');
            case 2:
              _context3.next = 3;
              return _solidLogic.solidLogicSingleton.store.updater.update([], newData);
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return _makeNewWorkspace.apply(this, arguments);
    }
    var id = context.me;
    var preferencesFile = context.preferencesFile;
    var newBase = null;

    // A workspace specifically defined in the private preference file:
    var w = _solidLogic.solidLogicSingleton.store.each(id, ns.space('workspace'), undefined, preferencesFile); // Only trust preference file here

    // A workspace in a storage in the public profile:
    var storages = _solidLogic.solidLogicSingleton.store.each(id, ns.space('storage')); // @@ No provenance requirement at the moment
    if (w.length === 0 && storages) {
      say("You don't seem to have any workspaces. You have ".concat(storages.length, " storage spaces."), 'white');
      storages.map(function (s) {
        w = w.concat(_solidLogic.solidLogicSingleton.store.each(s, ns.ldp('contains')));
        return w;
      }).filter(function (file) {
        return file.id ? ['public', 'private'].includes(file.id().toLowerCase()) : '';
      });
    }
    if (w.length === 1) {
      say("Workspace used: ".concat(w[0].uri), 'white'); // @@ allow user to see URI
      newBase = figureOutBase(w[0]);
      // callbackWS(w[0], newBase)
      // } else if (w.length === 0) {
    }

    // Prompt for ws selection or creation
    // say( w.length + " workspaces for " + id + "Choose one.");
    var table = dom.createElement('table');
    table.setAttribute('style', 'border-collapse:separate; border-spacing: 0.5em;');

    // const popup = window.open(undefined, '_blank', { height: 300, width:400 }, false)
    box.appendChild(table);

    //  Add a field for directly adding the URI yourself

    // const hr = box.appendChild(dom.createElement('hr')) // @@
    box.appendChild(dom.createElement('hr')); // @@

    var p = box.appendChild(dom.createElement('p'));
    p.setAttribute('style', style.commentStyle);
    p.textContent = "Where would you like to store the data for the ".concat(noun, "?\n    Give the URL of the folder where you would like the data stored.\n    It can be anywhere in solid world - this URI is just an idea.");
    // @@ TODO Remove the need to cast baseField to any
    var baseField = box.appendChild(dom.createElement('input'));
    baseField.setAttribute('type', 'text');
    baseField.setAttribute('style', style.textInputStyle);
    baseField.size = 80; // really a string
    baseField.label = 'base URL';
    baseField.autocomplete = 'on';
    if (newBase) {
      // set to default
      baseField.value = newBase;
    }
    context.baseField = baseField;
    box.appendChild(dom.createElement('br')); // @@

    var button = box.appendChild(dom.createElement('button'));
    button.setAttribute('style', style.buttonStyle);
    button.textContent = "Start new ".concat(noun, " at this URI");
    button.addEventListener('click', function (_event) {
      var newBase = baseField.value.replace(' ', '%20'); // do not re-encode in general, as % encodings may exist
      if (newBase.slice(-1) !== '/') {
        newBase += '/';
      }
      callbackWS(null, newBase);
    });

    // Now go set up the table of spaces

    // const row = 0
    w = w.filter(function (x) {
      return !_solidLogic.solidLogicSingleton.store.holds(x, ns.rdf('type'),
      // Ignore master workspaces
      ns.space('MasterWorkspace'));
    });
    var col1, col2, col3, tr, ws, localStyle, comment;
    var cellStyle = 'height: 3em; margin: 1em; padding: 1em white; border-radius: 0.3em;';
    var deselectedStyle = "".concat(cellStyle, "border: 0px;");
    // const selectedStyle = cellStyle + 'border: 1px solid black;'
    for (var i = 0; i < w.length; i++) {
      ws = w[i];
      tr = dom.createElement('tr');
      if (i === 0) {
        col1 = dom.createElement('td');
        col1.setAttribute('rowspan', "".concat(w.length));
        col1.textContent = 'Choose a workspace for this:';
        col1.setAttribute('style', 'vertical-align:middle;');
        tr.appendChild(col1);
      }
      col2 = dom.createElement('td');
      localStyle = _solidLogic.solidLogicSingleton.store.anyValue(ws, ns.ui('style'));
      if (!localStyle) {
        // Otherwise make up arbitrary colour
        var hash = function hash(x) {
          return x.split('').reduce(function (a, b) {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
          }, 0);
        };
        var bgcolor = "#".concat((hash(ws.uri) & 0xffffff | 0xc0c0c0).toString(16)); // c0c0c0  forces pale
        localStyle = "color: black ; background-color: ".concat(bgcolor, ";");
      }
      col2.setAttribute('style', deselectedStyle + localStyle);
      tr.target = ws.uri;
      var label = _solidLogic.solidLogicSingleton.store.any(ws, ns.rdfs('label'));
      if (!label) {
        label = ws.uri.split('/').slice(-1)[0] || ws.uri.split('/').slice(-2)[0];
      }
      col2.textContent = label || '???';
      tr.appendChild(col2);
      if (i === 0) {
        col3 = dom.createElement('td');
        col3.setAttribute('rowspan', "".concat(w.length, "1"));
        // col3.textContent = '@@@@@ remove';
        col3.setAttribute('style', 'width:50%;');
        tr.appendChild(col3);
      }
      table.appendChild(tr);
      comment = _solidLogic.solidLogicSingleton.store.any(ws, ns.rdfs('comment'));
      comment = comment ? comment.value : 'Use this workspace';
      col2.addEventListener('click', function (_event) {
        col3.textContent = comment ? comment.value : '';
        col3.setAttribute('style', deselectedStyle + localStyle);
        var button = dom.createElement('button');
        button.textContent = 'Continue';
        // button.setAttribute('style', style);
        var newBase = figureOutBase(ws);
        baseField.value = newBase; // show user proposed URI

        button.addEventListener('click', function (_event) {
          button.disabled = true;
          callbackWS(ws, newBase);
          button.textContent = '---->';
        }, true); // capture vs bubble
        col3.appendChild(button);
      }, true); // capture vs bubble
    }

    // last line with "Make new workspace"
    var trLast = dom.createElement('tr');
    col2 = dom.createElement('td');
    col2.setAttribute('style', cellStyle);
    col2.textContent = '+ Make a new workspace';
    col2.addEventListener('click', makeNewWorkspace);
    trLast.appendChild(col2);
    table.appendChild(trLast);
  } // displayOptions

  // console.log('kicking off async operation')
  ensureLoadedPreferences(context) // kick off async operation
  .then(displayOptions)["catch"](function (err) {
    // console.log("err from async op")
    box.appendChild(widgets.errorMessageBlock(context.dom, err));
  });
  return box; // return the box element, while login proceeds
} // selectWorkspace

/**
 * Creates a new instance of an app.
 *
 * An instance of an app could be e.g. an issue tracker for a given project,
 * or a chess game, or calendar, or a health/fitness record for a person.
 *
 * Note that this use of the term 'app' refers more to entries in the user's
 * type index than to actual software applications that use the personal data
 * to which these entries point.
 *
 * @param dom
 * @param appDetails
 * @param callback
 *
 * @returns A div with a button in it for making a new app instance
 */
function newAppInstance(dom, appDetails, callback) {
  var gotWS = function gotWS(ws, base) {
    // log.debug("newAppInstance: Selected workspace = " + (ws? ws.uri : 'none'))
    callback(ws, base);
  };
  var div = dom.createElement('div');
  var b = dom.createElement('button');
  b.setAttribute('type', 'button');
  div.appendChild(b);
  b.innerHTML = "Make new ".concat(appDetails.noun);
  b.addEventListener('click', function (_event) {
    div.appendChild(selectWorkspace(dom, appDetails, gotWS));
  }, false);
  div.appendChild(b);
  return div;
}
/**
 * Retrieves whether the currently logged in user is a power user
 * and/or a developer
 */
function getUserRoles() {
  return _getUserRoles.apply(this, arguments);
}
/**
 * Filters which panes should be available, based on the result of [[getUserRoles]]
 */
function _getUserRoles() {
  _getUserRoles = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee0() {
    var _yield$ensureLoadedPr, me, preferencesFile, preferencesFileError, _t1;
    return _regenerator["default"].wrap(function (_context1) {
      while (1) switch (_context1.prev = _context1.next) {
        case 0:
          _context1.prev = 0;
          _context1.next = 1;
          return ensureLoadedPreferences({});
        case 1:
          _yield$ensureLoadedPr = _context1.sent;
          me = _yield$ensureLoadedPr.me;
          preferencesFile = _yield$ensureLoadedPr.preferencesFile;
          preferencesFileError = _yield$ensureLoadedPr.preferencesFileError;
          if (!(!preferencesFile || preferencesFileError)) {
            _context1.next = 2;
            break;
          }
          throw new Error(preferencesFileError);
        case 2:
          return _context1.abrupt("return", _solidLogic.solidLogicSingleton.store.each(me, ns.rdf('type'), null, preferencesFile.doc()));
        case 3:
          _context1.prev = 3;
          _t1 = _context1["catch"](0);
          debug.warn('Unable to fetch your preferences - this was the error: ', _t1);
          return _context1.abrupt("return", []);
        case 4:
        case "end":
          return _context1.stop();
      }
    }, _callee0, null, [[0, 3]]);
  }));
  return _getUserRoles.apply(this, arguments);
}
function filterAvailablePanes(_x11) {
  return _filterAvailablePanes.apply(this, arguments);
}
function _filterAvailablePanes() {
  _filterAvailablePanes = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee1(panes) {
    var userRoles;
    return _regenerator["default"].wrap(function (_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 1;
          return getUserRoles();
        case 1:
          userRoles = _context10.sent;
          return _context10.abrupt("return", panes.filter(function (pane) {
            return isMatchingAudience(pane, userRoles);
          }));
        case 2:
        case "end":
          return _context10.stop();
      }
    }, _callee1);
  }));
  return _filterAvailablePanes.apply(this, arguments);
}
function isMatchingAudience(pane, userRoles) {
  var audience = pane.audience || [];
  return audience.reduce(function (isMatch, audienceRole) {
    return isMatch && !!userRoles.find(function (role) {
      return role.equals(audienceRole);
    });
  }, true);
}
//# sourceMappingURL=login.js.map