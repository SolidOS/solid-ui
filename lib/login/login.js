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
exports.renderSignInPopup = renderSignInPopup;
exports.selectWorkspace = selectWorkspace;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _rdflib = require("rdflib");

var _solidLogic = require("solid-logic");

var debug = _interopRequireWildcard(require("../debug"));

var _log = require("../log");

var ns = _interopRequireWildcard(require("../ns.js"));

var _signup = require("../signup/signup.js");

var _style = require("../style");

var _index = require("../utils/index");

var widgets = _interopRequireWildcard(require("../widgets"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable camelcase */

/**
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
 */

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


function ensureLoadedPreferences(_x2) {
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
  _ensureLoadedPreferences = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(context) {
    var statusArea, progressDisplay, complain, preferencesFile, m2;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            complain = function _complain(message) {
              message = "ensureLoadedPreferences: ".concat(message);

              if (statusArea) {
                // statusArea.innerHTML = ''
                statusArea.appendChild(widgets.errorMessageBlock(context.dom, message));
              }

              debug.log(message); // reject(new Error(message))
            };

            if (!context.preferencesFile) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", Promise.resolve(context));

          case 3:
            // already done
            statusArea = context.statusArea || context.div || null;
            _context4.prev = 4;
            _context4.next = 7;
            return ensureLoadedProfile(context);

          case 7:
            context = _context4.sent;
            _context4.next = 10;
            return _solidLogic.solidLogicSingleton.loadPreferences(context.me);

          case 10:
            preferencesFile = _context4.sent;

            if (progressDisplay) {
              progressDisplay.parentNode.removeChild(progressDisplay);
            }

            context.preferencesFile = preferencesFile;
            _context4.next = 48;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](4);

            if (!(_context4.t0 instanceof _solidLogic.UnauthorizedError)) {
              _context4.next = 22;
              break;
            }

            m2 = 'Ooops - you are not authenticated (properly logged in) to for me to read your preference file.  Try loggin out and logging in?';
            (0, _log.alert)(m2);
            _context4.next = 48;
            break;

          case 22:
            if (!(_context4.t0 instanceof _solidLogic.CrossOriginForbiddenError)) {
              _context4.next = 28;
              break;
            }

            m2 = "Unauthorized: Assuming preference file blocked for origin ".concat(window.location.origin);
            context.preferencesFileError = m2;
            return _context4.abrupt("return", context);

          case 28:
            if (!(_context4.t0 instanceof _solidLogic.SameOriginForbiddenError)) {
              _context4.next = 33;
              break;
            }

            m2 = 'You are not authorized to read your preference file. This may be because you are using an untrusted web app.';
            debug.warn(m2);
            _context4.next = 48;
            break;

          case 33:
            if (!(_context4.t0 instanceof _solidLogic.NotFoundError)) {
              _context4.next = 42;
              break;
            }

            if (!confirm("You do not currently have a preference file. OK for me to create an empty one? ".concat(_context4.t0.preferencesFile || ''))) {
              _context4.next = 39;
              break;
            }

            // @@@ code me  ... weird to have a name of the file but no file
            (0, _log.alert)("Sorry; I am not prepared to do this. Please create an empty file at ".concat(_context4.t0.preferencesFile || '(?)'));
            complain(new Error('Sorry; no code yet to create a preference file at '));
            _context4.next = 40;
            break;

          case 39:
            throw new Error("User declined to create a preference file at ".concat(_context4.t0.preferencesFile || '(?)'));

          case 40:
            _context4.next = 48;
            break;

          case 42:
            if (!(_context4.t0 instanceof _solidLogic.FetchError)) {
              _context4.next = 47;
              break;
            }

            m2 = "Strange: Error ".concat(_context4.t0.status, " trying to read your preference file.").concat(_context4.t0.message);
            (0, _log.alert)(m2);
            _context4.next = 48;
            break;

          case 47:
            throw new Error("(via loadPrefs) ".concat(_context4.t0));

          case 48:
            return _context4.abrupt("return", context);

          case 49:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[4, 15]]);
  }));
  return _ensureLoadedPreferences.apply(this, arguments);
}

function ensureLoadedProfile(_x3) {
  return _ensureLoadedProfile.apply(this, arguments);
}
/**
 * Returns promise of context with arrays of symbols
 *
 * 2016-12-11 change to include forClass arc a la
 * https://github.com/solid/solid/blob/main/proposals/data-discovery.md
 */


function _ensureLoadedProfile() {
  _ensureLoadedProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(context) {
    var logInContext;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!context.publicProfile) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt("return", context);

          case 2:
            _context5.prev = 2;
            _context5.next = 5;
            return ensureLoggedIn(context);

          case 5:
            logInContext = _context5.sent;

            if (logInContext.me) {
              _context5.next = 8;
              break;
            }

            throw new Error('Could not log in');

          case 8:
            _context5.next = 10;
            return _solidLogic.solidLogicSingleton.loadProfile(logInContext.me);

          case 10:
            context.publicProfile = _context5.sent;
            _context5.next = 17;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](2);

            if (context.div && context.dom) {
              context.div.appendChild(widgets.errorMessageBlock(context.dom, _context5.t0.message));
            }

            throw new Error("Can't log in: ".concat(_context5.t0));

          case 17:
            return _context5.abrupt("return", context);

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 13]]);
  }));
  return _ensureLoadedProfile.apply(this, arguments);
}

function findAppInstances(_x4, _x5, _x6) {
  return _findAppInstances.apply(this, arguments);
}
/**
 * UI to control registration of instance
 */


function _findAppInstances() {
  _findAppInstances = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(context, theClass, isPublic) {
    var visibility, index, thisIndex, registrations, instances, containers, unique, e, i, cont;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            unique = function _unique(arr) {
              return Array.from(new Set(arr));
            };

            if (!(isPublic === undefined)) {
              _context6.next = 7;
              break;
            }

            _context6.next = 4;
            return findAppInstances(context, theClass, true);

          case 4:
            _context6.next = 6;
            return findAppInstances(context, theClass, false);

          case 6:
            return _context6.abrupt("return", context);

          case 7:
            _context6.prev = 7;
            _context6.next = 10;
            return isPublic ? ensureLoadedProfile(context) : ensureLoadedPreferences(context);

          case 10:
            _context6.next = 15;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](7);
            widgets.complain(context, "loadIndex: login and load problem ".concat(_context6.t0));

          case 15:
            // console.log('awaited LogInLoad!', context)
            visibility = isPublic ? 'public' : 'private';
            _context6.prev = 16;
            _context6.next = 19;
            return (0, _solidLogic.loadIndex)(context, isPublic);

          case 19:
            _context6.next = 24;
            break;

          case 21:
            _context6.prev = 21;
            _context6.t1 = _context6["catch"](16);
            debug.error(_context6.t1);

          case 24:
            index = context.index;
            thisIndex = index[visibility];
            registrations = thisIndex.map(function (ix) {
              return _solidLogic.solidLogicSingleton.store.each(undefined, ns.solid('forClass'), theClass, ix);
            }).reduce(function (acc, curr) {
              return acc.concat(curr);
            }, []);
            instances = registrations.map(function (reg) {
              return _solidLogic.solidLogicSingleton.store.each(reg, ns.solid('instance'));
            }).reduce(function (acc, curr) {
              return acc.concat(curr);
            }, []);
            containers = registrations.map(function (reg) {
              return _solidLogic.solidLogicSingleton.store.each(reg, ns.solid('instanceContainer'));
            }).reduce(function (acc, curr) {
              return acc.concat(curr);
            }, []);
            context.instances = context.instances || [];
            context.instances = unique(context.instances.concat(instances));
            context.containers = context.containers || [];
            context.containers = unique(context.containers.concat(containers));

            if (containers.length) {
              _context6.next = 35;
              break;
            }

            return _context6.abrupt("return", context);

          case 35:
            _context6.prev = 35;
            _context6.next = 38;
            return _solidLogic.solidLogicSingleton.load(containers);

          case 38:
            _context6.next = 45;
            break;

          case 40:
            _context6.prev = 40;
            _context6.t2 = _context6["catch"](35);
            e = new Error("[FAI] Unable to load containers".concat(_context6.t2));
            debug.log(e); // complain

            widgets.complain(context, "Error looking for ".concat(_index.utils.label(theClass), ":  ").concat(_context6.t2)); // but then ignore it
            // throw new Error(e)

          case 45:
            i = 0;

          case 46:
            if (!(i < containers.length)) {
              _context6.next = 56;
              break;
            }

            cont = containers[i];
            _context6.t3 = context.instances;
            _context6.next = 51;
            return _solidLogic.solidLogicSingleton.getContainerMembers(cont.value);

          case 51:
            _context6.t4 = _context6.sent.map(function (uri) {
              return _solidLogic.solidLogicSingleton.store.sym(uri);
            });
            context.instances = _context6.t3.concat.call(_context6.t3, _context6.t4);

          case 53:
            i++;
            _context6.next = 46;
            break;

          case 56:
            return _context6.abrupt("return", context);

          case 57:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[7, 12], [16, 21], [35, 40]]);
  }));
  return _findAppInstances.apply(this, arguments);
}

function registrationControl(_x7, _x8, _x9) {
  return _registrationControl.apply(this, arguments);
}
/**
 * UI to List at all registered things
 */


function _registrationControl() {
  _registrationControl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(context, instance, theClass) {
    var dom, box, context2, msg, tbody, form, registrationStatements, index, statements, _msg;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            dom = context.dom;

            if (!(!dom || !context.div)) {
              _context7.next = 3;
              break;
            }

            return _context7.abrupt("return", context);

          case 3:
            box = dom.createElement('div');
            context.div.appendChild(box);
            context.me = _solidLogic.authn.currentUser(); // @@

            if (context.me) {
              _context7.next = 9;
              break;
            }

            box.innerHTML = '<p style="margin:2em;">(Log in to save a link to this)</p>';
            return _context7.abrupt("return", context);

          case 9:
            _context7.prev = 9;
            _context7.next = 12;
            return (0, _solidLogic.ensureTypeIndexes)(context);

          case 12:
            context2 = _context7.sent;
            _context7.next = 19;
            break;

          case 15:
            _context7.prev = 15;
            _context7.t0 = _context7["catch"](9);

            if (context.div && context.preferencesFileError) {
              msg = '(Preferences not available)';
              context.div.appendChild(dom.createElement('p')).textContent = msg;
            } else if (context.div) {
              msg = "registrationControl: Type indexes not available: ".concat(_context7.t0);
              context.div.appendChild(widgets.errorMessageBlock(context.dom, _context7.t0));
            }

            debug.log(msg);

          case 19:
            box.innerHTML = '<table><tbody><tr></tr><tr></tr></tbody></table>'; // tbody will be inserted anyway

            box.setAttribute('style', 'font-size: 120%; text-align: right; padding: 1em; border: solid gray 0.05em;');
            tbody = box.children[0].children[0];
            form = new _rdflib.BlankNode(); // @@ say for now

            registrationStatements = function registrationStatements(index) {
              var registrations = _solidLogic.solidLogicSingleton.getRegistrations(instance, theClass);

              var reg = registrations.length ? registrations[0] : widgets.newThing(index);
              return [(0, _rdflib.st)(reg, ns.solid('instance'), instance, index), (0, _rdflib.st)(reg, ns.solid('forClass'), theClass, index)];
            };

            try {
              if (context2.index && context2.index["public"] && context2.index["public"].length > 0) {
                index = context2.index["public"][0];
                statements = registrationStatements(index);
                tbody.children[0].appendChild(widgets.buildCheckboxForm(context2.dom, _solidLogic.solidLogicSingleton.store, "Public link to this ".concat(context2.noun), null, statements, form, index));
              }

              if (context2.index && context2.index["private"] && context2.index["private"].length > 0) {
                index = context2.index["private"][0];
                statements = registrationStatements(index);
                tbody.children[1].appendChild(widgets.buildCheckboxForm(context2.dom, _solidLogic.solidLogicSingleton.store, "Personal note of this ".concat(context2.noun), null, statements, form, index));
              }
            } catch (e) {
              _msg = "registrationControl: Error making panel: ".concat(e);

              if (context.div) {
                context.div.appendChild(widgets.errorMessageBlock(context.dom, e));
              }

              debug.log(_msg);
            }

            return _context7.abrupt("return", context2);

          case 26:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[9, 15]]);
  }));
  return _registrationControl.apply(this, arguments);
}

function registrationList(_x10, _x11) {
  return _registrationList.apply(this, arguments);
}

function _registrationList() {
  _registrationList = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(context0, options) {
    var dom, div, box;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            dom = context0.dom;
            div = context0.div;
            box = dom.createElement('div');
            div.appendChild(box);
            context0.me = _solidLogic.authn.currentUser(); // @@

            if (context0.me) {
              _context8.next = 8;
              break;
            }

            box.innerHTML = '<p style="margin:2em;">(Log in list your stuff)</p>';
            return _context8.abrupt("return", context0);

          case 8:
            return _context8.abrupt("return", (0, _solidLogic.ensureTypeIndexes)(context0).then(function (context) {
              box.innerHTML = '<table><tbody></tbody></table>'; // tbody will be inserted anyway

              // tbody will be inserted anyway
              box.setAttribute('style', 'font-size: 120%; text-align: right; padding: 1em; border: solid #eee 0.5em;');
              var table = box.firstChild;
              var ix = [];
              var sts = [];
              var vs = ['private', 'public'];
              vs.forEach(function (visibility) {
                if (context.index && context.index[visibility].length > 0 && options[visibility]) {
                  ix = ix.concat(context.index[visibility][0]);
                  sts = sts.concat(_solidLogic.solidLogicSingleton.store.statementsMatching(undefined, ns.solid('instance'), undefined, context.index[visibility][0]));
                }
              });

              var _loop = function _loop(i) {
                var statement = sts[i];

                if (options.type) {
                  // now check  terms:forClass
                  if (!_solidLogic.solidLogicSingleton.store.holds(statement.subject, ns.solid('forClass'), options.type, statement.why)) {
                    return "continue"; // skip irrelevant ones
                  }
                } // const cla = statement.subject


                // const cla = statement.subject
                var inst = statement.object;
                table.appendChild(widgets.personTR(dom, ns.solid('instance'), inst, {
                  deleteFunction: function deleteFunction(_x) {
                    if (!_solidLogic.solidLogicSingleton.store.updater) {
                      throw new Error('Cannot delete this, store has no updater');
                    }

                    _solidLogic.solidLogicSingleton.store.updater.update([statement], [], function (uri, ok, errorBody) {
                      if (ok) {
                        debug.log("Removed from index: ".concat(statement.subject));
                      } else {
                        debug.log("Error: Cannot delete ".concat(statement, ": ").concat(errorBody));
                      }
                    });
                  }
                }));
              };

              for (var i = 0; i < sts.length; i++) {
                var _ret = _loop(i);

                if (_ret === "continue") continue;
              } // registrationList

              /*
                  //const containers = solidLogicSingleton.store.each(theClass, ns.solid('instanceContainer'));
                  if (containers.length) {
                  fetcher.load(containers).then(function(xhrs){
                  for (const i=0; i<containers.length; i++) {
                  const cont = containers[i];
                  instances = instances.concat(solidLogicSingleton.store.each(cont, ns.ldp('contains')));
                  }
                  });
                  }
                  */


              // registrationList

              /*
                  //const containers = solidLogicSingleton.store.each(theClass, ns.solid('instanceContainer'));
                  if (containers.length) {
                  fetcher.load(containers).then(function(xhrs){
                  for (const i=0; i<containers.length; i++) {
                  const cont = containers[i];
                  instances = instances.concat(solidLogicSingleton.store.each(cont, ns.ldp('contains')));
                  }
                  });
                  }
                  */
              return context;
            }));

          case 9:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _registrationList.apply(this, arguments);
}

function getDefaultSignInButtonStyle() {
  return 'padding: 1em; border-radius:0.5em; font-size: 100%;';
}
/**
 * Bootstrapping identity
 * (Called by `loginStatusBox()`)
 *
 * @param dom
 * @param setUserCallback
 *
 * @returns
 */


function signInOrSignUpBox(dom, setUserCallback) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  options = options || {};
  var signInButtonStyle = options.buttonStyle || getDefaultSignInButtonStyle(); // @@ TODO Remove the need to cast HTML element to any

  var box = dom.createElement('div');
  var magicClassName = 'SolidSignInOrSignUpBox';
  debug.log('widgets.signInOrSignUpBox');
  box.setUserCallback = setUserCallback;
  box.setAttribute('class', magicClassName);
  box.style = 'display:flex;'; // @@ fix all typecasts like this
  // Sign in button with PopUP

  var signInPopUpButton = dom.createElement('input'); // multi

  box.appendChild(signInPopUpButton);
  signInPopUpButton.setAttribute('type', 'button');
  signInPopUpButton.setAttribute('value', 'Log in');
  signInPopUpButton.setAttribute('style', "".concat(signInButtonStyle, "background-color: #eef;"));

  _solidLogic.authSession.onLogin(function () {
    var me = _solidLogic.authn.currentUser(); // const sessionInfo = authSession.info
    // if (sessionInfo && sessionInfo.isLoggedIn) {


    if (me) {
      // const webIdURI = sessionInfo.webId
      var webIdURI = me.uri; // setUserCallback(webIdURI)

      var divs = dom.getElementsByClassName(magicClassName);
      debug.log("Logged in, ".concat(divs.length, " panels to be serviced")); // At the same time, satisfy all the other login boxes

      for (var i = 0; i < divs.length; i++) {
        var div = divs[i]; // @@ TODO Remove the need to manipulate HTML elements

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
  }, false); // Sign up button

  var signupButton = dom.createElement('input');
  box.appendChild(signupButton);
  signupButton.setAttribute('type', 'button');
  signupButton.setAttribute('value', 'Sign Up for Solid');
  signupButton.setAttribute('style', "".concat(signInButtonStyle, "background-color: #efe;"));
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
  issuerPopupBox.setAttribute('style', "\n      background-color: white;\n      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      -webkit-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      -moz-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      -o-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      border-radius: 4px;\n      min-width: 400px;\n      padding: 10px;\n    ");
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
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(issuerUri) {
      var preLoginRedirectHash;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              // Save hash
              preLoginRedirectHash = new URL(window.location.href).hash;

              if (preLoginRedirectHash) {
                window.localStorage.setItem('preLoginRedirectHash', preLoginRedirectHash);
              }

              window.localStorage.setItem('loginIssuer', issuerUri); // Login

              _context.next = 6;
              return _solidLogic.authSession.login({
                redirectUrl: window.location.href,
                oidcIssuer: issuerUri
              });

            case 6:
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              (0, _log.alert)(_context.t0.message);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    return function loginToIssuer(_x12) {
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
  var me = (0, _solidLogic.offlineTestID)(); // @@ TODO Remove the need to cast HTML element to any

  var box = dom.createElement('div');

  function setIt(newidURI) {
    if (!newidURI) {
      return;
    } // const uri = newidURI.uri || newidURI
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
    var signInButtonStyle = options.buttonStyle || getDefaultSignInButtonStyle();
    var logoutLabel = 'WebID logout';

    if (me) {
      var nick = _solidLogic.solidLogicSingleton.store.any(me, ns.foaf('nick')) || _solidLogic.solidLogicSingleton.store.any(me, ns.foaf('name'));

      if (nick) {
        logoutLabel = 'Logout ' + nick.value;
      }
    }

    var signOutButton = dom.createElement('input'); // signOutButton.className = 'WebIDCancelButton'

    signOutButton.setAttribute('type', 'button');
    signOutButton.setAttribute('value', logoutLabel);
    signOutButton.setAttribute('style', "".concat(signInButtonStyle, "background-color: #eee;"));
    signOutButton.addEventListener('click', logoutButtonHandler, false);
    return signOutButton;
  }

  box.refresh = function () {
    me = _solidLogic.authn.currentUser();

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

_solidLogic.authSession.onLogout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  var issuer, wellKnownUri, wellKnownResult, openidConfiguration;
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          issuer = window.localStorage.getItem('loginIssuer');

          if (!issuer) {
            _context2.next = 19;
            break;
          }

          _context2.prev = 2;
          wellKnownUri = new URL(issuer);
          wellKnownUri.pathname = '/.well-known/openid-configuration';
          _context2.next = 7;
          return fetch(wellKnownUri.toString());

        case 7:
          wellKnownResult = _context2.sent;

          if (!(wellKnownResult.status === 200)) {
            _context2.next = 15;
            break;
          }

          _context2.next = 11;
          return wellKnownResult.json();

        case 11:
          openidConfiguration = _context2.sent;

          if (!(openidConfiguration && openidConfiguration.end_session_endpoint)) {
            _context2.next = 15;
            break;
          }

          _context2.next = 15;
          return fetch(openidConfiguration.end_session_endpoint, {
            credentials: 'include'
          });

        case 15:
          _context2.next = 19;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](2);

        case 19:
          window.location.reload();

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, null, [[2, 17]]);
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
    function makeNewWorkspace(_x13) {
      return _makeNewWorkspace.apply(this, arguments);
    } // const status = ''


    function _makeNewWorkspace() {
      _makeNewWorkspace = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_event) {
        var row, cell, newBase, newWs, newData;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                row = table.appendChild(dom.createElement('tr'));
                cell = row.appendChild(dom.createElement('td'));
                cell.setAttribute('colspan', '3');
                cell.style.padding = '0.5em';
                _context3.t0 = encodeURI;
                _context3.next = 7;
                return widgets.askName(dom, _solidLogic.solidLogicSingleton.store, cell, ns.solid('URL'), ns.space('Workspace'), 'Workspace');

              case 7:
                _context3.t1 = _context3.sent;
                newBase = (0, _context3.t0)(_context3.t1);
                newWs = widgets.newThing(context.preferencesFile);
                newData = [(0, _rdflib.st)(context.me, ns.space('workspace'), newWs, context.preferencesFile), // eslint-disable-next-line camelcase
                (0, _rdflib.st)(newWs, ns.space('uriPrefix'), newBase, context.preferencesFile)];

                if (_solidLogic.solidLogicSingleton.store.updater) {
                  _context3.next = 13;
                  break;
                }

                throw new Error('store has no updater');

              case 13:
                _context3.next = 15;
                return _solidLogic.solidLogicSingleton.store.updater.update([], newData);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      return _makeNewWorkspace.apply(this, arguments);
    }

    var id = context.me;
    var preferencesFile = context.preferencesFile;
    var newBase = null; // A workspace specifically defined in the private preference file:

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

      newBase = figureOutBase(w[0]); // callbackWS(w[0], newBase)
      // } else if (w.length === 0) {
    } // Prompt for ws selection or creation
    // say( w.length + " workspaces for " + id + "Choose one.");


    var table = dom.createElement('table');
    table.setAttribute('style', 'border-collapse:separate; border-spacing: 0.5em;'); // const popup = window.open(undefined, '_blank', { height: 300, width:400 }, false)

    box.appendChild(table); //  Add a field for directly adding the URI yourself
    // const hr = box.appendChild(dom.createElement('hr')) // @@

    box.appendChild(dom.createElement('hr')); // @@

    var p = box.appendChild(dom.createElement('p'));
    p.style = _style.commentStyle;
    p.textContent = "Where would you like to store the data for the ".concat(noun, "?\n    Give the URL of the folder where you would like the data stored.\n    It can be anywhere in solid world - this URI is just an idea."); // @@ TODO Remove the need to cast baseField to any

    var baseField = box.appendChild(dom.createElement('input'));
    baseField.setAttribute('type', 'text');
    baseField.style = _style.textInputStyle;
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
    button.style = _style.buttonStyle;
    button.textContent = "Start new ".concat(noun, " at this URI");
    button.addEventListener('click', function (_event) {
      var newBase = baseField.value.replace(' ', '%20'); // do not re-encode in general, as % encodings may exist

      if (newBase.slice(-1) !== '/') {
        newBase += '/';
      }

      callbackWS(null, newBase);
    }); // Now go set up the table of spaces
    // const row = 0

    w = w.filter(function (x) {
      return !_solidLogic.solidLogicSingleton.store.holds(x, ns.rdf('type'), // Ignore master workspaces
      ns.space('MasterWorkspace'));
    });
    var col1, col2, col3, tr, ws, style, comment;
    var cellStyle = 'height: 3em; margin: 1em; padding: 1em white; border-radius: 0.3em;';
    var deselectedStyle = "".concat(cellStyle, "border: 0px;"); // const selectedStyle = cellStyle + 'border: 1px solid black;'

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
      style = _solidLogic.solidLogicSingleton.store.anyValue(ws, ns.ui('style'));

      if (!style) {
        // Otherwise make up arbitrary colour
        var hash = function hash(x) {
          return x.split('').reduce(function (a, b) {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
          }, 0);
        };

        var bgcolor = "#".concat((hash(ws.uri) & 0xffffff | 0xc0c0c0).toString(16)); // c0c0c0  forces pale

        style = "color: black ; background-color: ".concat(bgcolor, ";");
      }

      col2.setAttribute('style', deselectedStyle + style);
      tr.target = ws.uri;

      var label = _solidLogic.solidLogicSingleton.store.any(ws, ns.rdfs('label'));

      if (!label) {
        label = ws.uri.split('/').slice(-1)[0] || ws.uri.split('/').slice(-2)[0];
      }

      col2.textContent = label || '???';
      tr.appendChild(col2);

      if (i === 0) {
        col3 = dom.createElement('td');
        col3.setAttribute('rowspan', "".concat(w.length, "1")); // col3.textContent = '@@@@@ remove';

        col3.setAttribute('style', 'width:50%;');
        tr.appendChild(col3);
      }

      table.appendChild(tr);
      comment = _solidLogic.solidLogicSingleton.store.any(ws, ns.rdfs('comment'));
      comment = comment ? comment.value : 'Use this workspace';
      col2.addEventListener('click', function (_event) {
        col3.textContent = comment ? comment.value : '';
        col3.setAttribute('style', deselectedStyle + style);
        var button = dom.createElement('button');
        button.textContent = 'Continue'; // button.setAttribute('style', style);

        var newBase = figureOutBase(ws);
        baseField.value = newBase; // show user proposed URI

        button.addEventListener('click', function (_event) {
          button.disabled = true;
          callbackWS(ws, newBase);
          button.textContent = '---->';
        }, true); // capture vs bubble

        col3.appendChild(button);
      }, true); // capture vs bubble
    } // last line with "Make new workspace"


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
  _getUserRoles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    var _yield$ensureLoadedPr, me, preferencesFile, preferencesFileError;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return ensureLoadedPreferences({});

          case 3:
            _yield$ensureLoadedPr = _context9.sent;
            me = _yield$ensureLoadedPr.me;
            preferencesFile = _yield$ensureLoadedPr.preferencesFile;
            preferencesFileError = _yield$ensureLoadedPr.preferencesFileError;

            if (!(!preferencesFile || preferencesFileError)) {
              _context9.next = 9;
              break;
            }

            throw new Error(preferencesFileError);

          case 9:
            return _context9.abrupt("return", _solidLogic.solidLogicSingleton.store.each(me, ns.rdf('type'), null, preferencesFile.doc()));

          case 12:
            _context9.prev = 12;
            _context9.t0 = _context9["catch"](0);
            debug.warn('Unable to fetch your preferences - this was the error: ', _context9.t0);

          case 15:
            return _context9.abrupt("return", []);

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 12]]);
  }));
  return _getUserRoles.apply(this, arguments);
}

function filterAvailablePanes(_x14) {
  return _filterAvailablePanes.apply(this, arguments);
}

function _filterAvailablePanes() {
  _filterAvailablePanes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(panes) {
    var userRoles;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return getUserRoles();

          case 2:
            userRoles = _context10.sent;
            return _context10.abrupt("return", panes.filter(function (pane) {
              return isMatchingAudience(pane, userRoles);
            }));

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
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