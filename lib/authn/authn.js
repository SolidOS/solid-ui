"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findOriginOwner = findOriginOwner;
exports.saveUser = saveUser;
exports.defaultTestUser = defaultTestUser;
exports.currentUser = currentUser;
exports.logIn = logIn;
exports.logInLoadProfile = logInLoadProfile;
exports.logInLoadPreferences = logInLoadPreferences;
exports.loadTypeIndexes = loadTypeIndexes;
exports.findAppInstances = findAppInstances;
exports.registerInTypeIndex = registerInTypeIndex;
exports.registrationControl = registrationControl;
exports.registrationList = registrationList;
exports.setACLUserPublic = setACLUserPublic;
exports.offlineTestID = offlineTestID;
exports.checkUser = checkUser;
exports.loginStatusBox = loginStatusBox;
exports.selectWorkspace = selectWorkspace;
exports.newAppInstance = newAppInstance;
exports.getUserRoles = getUserRoles;
exports.filterAvailablePanes = filterAvailablePanes;
Object.defineProperty(exports, "solidAuthClient", {
  enumerable: true,
  get: function get() {
    return _solidAuthClient["default"];
  }
});

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _rdflib = require("rdflib");

var _solidAuthClient = _interopRequireDefault(require("solid-auth-client"));

var _signup = require("./signup");

var widgets = _interopRequireWildcard(require("../widgets"));

var ns = _interopRequireWildcard(require("../ns.js"));

var utils = _interopRequireWildcard(require("../utils.js"));

var _log = require("../log");

var debug = _interopRequireWildcard(require("../debug"));

var _style = require("../style");

var _logic = require("../logic");

var _solidLogic = require("solid-logic");

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
 * @packageDocumentation
 */
// const userCheckSite = 'https://databox.me/'

/**
 * Look for and load the User who has control over it
 */
function findOriginOwner(doc) {
  var uri = typeof doc === 'string' ? doc : doc.uri;
  var i = uri.indexOf('://');
  if (i < 0) return false;
  var j = uri.indexOf('/', i + 3);
  if (j < 0) return false;
  var origin = uri.slice(0, j + 1); // @@ TBC

  return origin;
}
/**
 * Saves `webId` in `context.me`
 * @param webId
 * @param context
 *
 * @returns Returns the WebID, after setting it
 */


function saveUser(webId, context) {
  // @@ TODO Remove the need for having context as output argument
  var webIdUri;

  if (webId) {
    webIdUri = typeof webId === 'string' ? webId : webId.uri;
    var me = (0, _rdflib.namedNode)(webIdUri);

    if (context) {
      context.me = me;
    }

    return me;
  }

  return null;
}
/**
 * Wrapper around [[offlineTestID]]
 * @returns {NamedNode|null}
 */


function defaultTestUser() {
  // Check for offline override
  var offlineId = offlineTestID();

  if (offlineId) {
    return offlineId;
  }

  return null;
}
/**
 * Checks synchronously whether user is logged in
 *
 * @returns Named Node or null
 */


function currentUser() {
  var str = localStorage['solid-auth-client'];

  if (str) {
    var da = JSON.parse(str);

    if (da.session && da.session.webId) {
      // @@ TODO check has not expired
      return (0, _rdflib.sym)(da.session.webId);
    }
  }

  return offlineTestID(); // null unless testing
  // JSON.parse(localStorage['solid-auth-client']).session.webId
}
/**
 * Resolves with the logged in user's WebID
 *
 * @param context
 */


function logIn(context) {
  var me = defaultTestUser(); // me is a NamedNode or null

  if (me) {
    context.me = me;
    return Promise.resolve(context);
  }

  return new Promise(function (resolve) {
    checkUser().then(function (webId) {
      // Already logged in?
      if (webId) {
        context.me = (0, _rdflib.sym)(webId);
        debug.log("logIn: Already logged in as ".concat(context.me));
        return resolve(context);
      }

      if (!context.div || !context.dom) {
        return resolve(context);
      }

      var box = loginStatusBox(context.dom, function (webIdUri) {
        saveUser(webIdUri, context);
        resolve(context); // always pass growing context
      });
      context.div.appendChild(box);
    });
  });
}
/**
 * Logs the user in and loads their WebID profile document into the store
 *
 * @param context
 *
 * @returns Resolves with the context after login / fetch
 */


function logInLoadProfile(_x2) {
  return _logInLoadProfile.apply(this, arguments);
}
/**
 * Loads preference file
 * Do this after having done log in and load profile
 *
 * @private
 *
 * @param context
 */


function _logInLoadProfile() {
  _logInLoadProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(context) {
    var loggedInContext;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!context.publicProfile) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", context);

          case 2:
            _context2.prev = 2;
            _context2.next = 5;
            return logIn(context);

          case 5:
            loggedInContext = _context2.sent;

            if (loggedInContext.me) {
              _context2.next = 8;
              break;
            }

            throw new Error('Could not log in');

          case 8:
            _context2.next = 10;
            return _logic.solidLogicSingleton.loadProfile(loggedInContext.me);

          case 10:
            context.publicProfile = _context2.sent;
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](2);

            if (context.div && context.dom) {
              context.div.appendChild(widgets.errorMessageBlock(context.dom, _context2.t0.message));
            }

            throw new Error("Can't log in: ".concat(_context2.t0));

          case 17:
            return _context2.abrupt("return", context);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return _logInLoadProfile.apply(this, arguments);
}

function logInLoadPreferences(_x3) {
  return _logInLoadPreferences.apply(this, arguments);
}
/**
 * Resolves with the same context, outputting
 * output: index.public, index.private
 *
 * @see https://github.com/solid/solid/blob/main/proposals/data-discovery.md#discoverability
 */


function _logInLoadPreferences() {
  _logInLoadPreferences = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(context) {
    var statusArea, progressDisplay, complain, preferencesFile, m2;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            complain = function _complain(message) {
              message = "logInLoadPreferences: ".concat(message);

              if (statusArea) {
                // statusArea.innerHTML = ''
                statusArea.appendChild(widgets.errorMessageBlock(context.dom, message));
              }

              debug.log(message); // reject(new Error(message))
            };

            if (!context.preferencesFile) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", Promise.resolve(context));

          case 3:
            // already done
            statusArea = context.statusArea || context.div || null;
            _context3.prev = 4;
            _context3.next = 7;
            return logInLoadProfile(context);

          case 7:
            context = _context3.sent;
            _context3.next = 10;
            return _logic.solidLogicSingleton.loadPreferences(context.me);

          case 10:
            preferencesFile = _context3.sent;

            if (progressDisplay) {
              progressDisplay.parentNode.removeChild(progressDisplay);
            }

            context.preferencesFile = preferencesFile;
            _context3.next = 48;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](4);

            if (!(_context3.t0 instanceof _solidLogic.UnauthorizedError)) {
              _context3.next = 22;
              break;
            }

            m2 = 'Ooops - you are not authenticated (properly logged in) to for me to read your preference file.  Try loggin out and logging in?';
            (0, _log.alert)(m2);
            _context3.next = 48;
            break;

          case 22:
            if (!(_context3.t0 instanceof _solidLogic.CrossOriginForbiddenError)) {
              _context3.next = 28;
              break;
            }

            m2 = "Unauthorized: Assuming preference file blocked for origin ".concat(window.location.origin);
            context.preferencesFileError = m2;
            return _context3.abrupt("return", context);

          case 28:
            if (!(_context3.t0 instanceof _solidLogic.SameOriginForbiddenError)) {
              _context3.next = 33;
              break;
            }

            m2 = 'You are not authorized to read your preference file. This may be because you are using an untrusted web app.';
            debug.warn(m2);
            _context3.next = 48;
            break;

          case 33:
            if (!(_context3.t0 instanceof _solidLogic.NotFoundError)) {
              _context3.next = 42;
              break;
            }

            if (!confirm("You do not currently have a preference file. OK for me to create an empty one? ".concat(_context3.t0.preferencesFile || ''))) {
              _context3.next = 39;
              break;
            }

            // @@@ code me  ... weird to have a name of the file but no file
            (0, _log.alert)("Sorry; I am not prepared to do this. Please create an empty file at ".concat(_context3.t0.preferencesFile || '(?)'));
            complain(new Error('Sorry; no code yet to create a preference file at '));
            _context3.next = 40;
            break;

          case 39:
            throw new Error("User declined to create a preference file at ".concat(_context3.t0.preferencesFile || '(?)'));

          case 40:
            _context3.next = 48;
            break;

          case 42:
            if (!(_context3.t0 instanceof _solidLogic.FetchError)) {
              _context3.next = 47;
              break;
            }

            m2 = "Strange: Error ".concat(_context3.t0.status, " trying to read your preference file.").concat(_context3.t0.message);
            (0, _log.alert)(m2);
            _context3.next = 48;
            break;

          case 47:
            throw new Error("(via loadPrefs) ".concat(_context3.t0));

          case 48:
            return _context3.abrupt("return", context);

          case 49:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 15]]);
  }));
  return _logInLoadPreferences.apply(this, arguments);
}

function loadIndex(_x4, _x5) {
  return _loadIndex.apply(this, arguments);
}

function _loadIndex() {
  _loadIndex = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(context, isPublic) {
    var indexes;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _logic.solidLogicSingleton.loadIndexes(context.me, isPublic ? context.publicProfile || null : null, isPublic ? null : context.preferencesFile || null, /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(err) {
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        return _context4.abrupt("return", widgets.complain(context, err.message));

                      case 1:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x19) {
                return _ref.apply(this, arguments);
              };
            }());

          case 2:
            indexes = _context5.sent;
            context.index = context.index || {};
            context.index["private"] = indexes["private"] || context.index["private"];
            context.index["public"] = indexes["public"] || context.index["public"];
            return _context5.abrupt("return", context);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _loadIndex.apply(this, arguments);
}

function loadTypeIndexes(_x6) {
  return _loadTypeIndexes.apply(this, arguments);
}
/**
 * Resolves with the same context, outputting
 * @see https://github.com/solid/solid/blob/main/proposals/data-discovery.md#discoverability
 */


function _loadTypeIndexes() {
  _loadTypeIndexes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(context) {
    var indexes;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _logic.solidLogicSingleton.loadIndexes(context.me, context.publicProfile || null, context.preferencesFile || null, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(err) {
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        return _context6.abrupt("return", widgets.complain(context, err.message));

                      case 1:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x20) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 2:
            indexes = _context7.sent;
            context.index = context.index || {};
            context.index["private"] = indexes["private"] || context.index["private"];
            context.index["public"] = indexes["public"] || context.index["public"];
            return _context7.abrupt("return", context);

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _loadTypeIndexes.apply(this, arguments);
}

function ensureTypeIndexes(_x7) {
  return _ensureTypeIndexes.apply(this, arguments);
}
/**
 * Load or create ONE type index
 * Find one or make one or fail
 * Many reasons for failing including script not having permission etc
 *
 * Adds its output to the context
 * @see https://github.com/solid/solid/blob/main/proposals/data-discovery.md#discoverability
 */


function _ensureTypeIndexes() {
  _ensureTypeIndexes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(context) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return ensureOneTypeIndex(context, true);

          case 2:
            _context8.next = 4;
            return ensureOneTypeIndex(context, false);

          case 4:
            return _context8.abrupt("return", context);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _ensureTypeIndexes.apply(this, arguments);
}

function ensureOneTypeIndex(_x8, _x9) {
  return _ensureOneTypeIndex.apply(this, arguments);
}
/**
 * Returns promise of context with arrays of symbols
 *
 * 2016-12-11 change to include forClass arc a la
 * https://github.com/solid/solid/blob/main/proposals/data-discovery.md
 */


function _ensureOneTypeIndex() {
  _ensureOneTypeIndex = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(context, isPublic) {
    var makeIndexIfNecessary, _makeIndexIfNecessary;

    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _makeIndexIfNecessary = function _makeIndexIfNecessary3() {
              _makeIndexIfNecessary = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(context, isPublic) {
                var relevant, visibility, putIndex, _putIndex, newIndex, addMe, msg, ixs;

                return _regenerator["default"].wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        _putIndex = function _putIndex3() {
                          _putIndex = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(newIndex) {
                            var _msg;

                            return _regenerator["default"].wrap(function _callee9$(_context9) {
                              while (1) {
                                switch (_context9.prev = _context9.next) {
                                  case 0:
                                    _context9.prev = 0;
                                    _context9.next = 3;
                                    return _logic.solidLogicSingleton.createEmptyRdfDoc(newIndex, 'Blank initial Type index');

                                  case 3:
                                    return _context9.abrupt("return", context);

                                  case 6:
                                    _context9.prev = 6;
                                    _context9.t0 = _context9["catch"](0);
                                    _msg = "Error creating new index ".concat(_context9.t0);
                                    widgets.complain(context, _msg);

                                  case 10:
                                  case "end":
                                    return _context9.stop();
                                }
                              }
                            }, _callee9, null, [[0, 6]]);
                          }));
                          return _putIndex.apply(this, arguments);
                        };

                        putIndex = function _putIndex2(_x23) {
                          return _putIndex.apply(this, arguments);
                        };

                        relevant = isPublic ? context.publicProfile : context.preferencesFile;
                        visibility = isPublic ? 'public' : 'private';
                        // putIndex
                        context.index = context.index || {};
                        context.index[visibility] = context.index[visibility] || [];

                        if (!(context.index[visibility].length === 0)) {
                          _context10.next = 29;
                          break;
                        }

                        newIndex = (0, _rdflib.sym)("".concat(relevant.dir().uri + visibility, "TypeIndex.ttl"));
                        debug.log("Linking to new fresh type index ".concat(newIndex));

                        if (confirm("OK to create a new empty index file at ".concat(newIndex, ", overwriting anything that is now there?"))) {
                          _context10.next = 11;
                          break;
                        }

                        throw new Error('cancelled by user');

                      case 11:
                        debug.log("Linking to new fresh type index ".concat(newIndex));
                        addMe = [(0, _rdflib.st)(context.me, ns.solid("".concat(visibility, "TypeIndex")), newIndex, relevant)];
                        _context10.prev = 13;
                        _context10.next = 16;
                        return _logic.solidLogicSingleton.updatePromise([], addMe);

                      case 16:
                        _context10.next = 23;
                        break;

                      case 18:
                        _context10.prev = 18;
                        _context10.t0 = _context10["catch"](13);
                        msg = "Error saving type index link saving back ".concat(newIndex, ": ").concat(_context10.t0);
                        widgets.complain(context, msg);
                        return _context10.abrupt("return", context);

                      case 23:
                        debug.log("Creating new fresh type index file".concat(newIndex));
                        _context10.next = 26;
                        return putIndex(newIndex);

                      case 26:
                        context.index[visibility].push(newIndex); // @@ wait

                        _context10.next = 38;
                        break;

                      case 29:
                        // officially exists
                        ixs = context.index[visibility];
                        _context10.prev = 30;
                        _context10.next = 33;
                        return _logic.solidLogicSingleton.load(ixs);

                      case 33:
                        _context10.next = 38;
                        break;

                      case 35:
                        _context10.prev = 35;
                        _context10.t1 = _context10["catch"](30);
                        widgets.complain(context, "ensureOneTypeIndex: loading indexes ".concat(_context10.t1));

                      case 38:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee10, null, [[13, 18], [30, 35]]);
              }));
              return _makeIndexIfNecessary.apply(this, arguments);
            };

            makeIndexIfNecessary = function _makeIndexIfNecessary2(_x21, _x22) {
              return _makeIndexIfNecessary.apply(this, arguments);
            };

            _context11.prev = 2;
            _context11.next = 5;
            return loadIndex(context, isPublic);

          case 5:
            if (context.index) {
              debug.log("ensureOneTypeIndex: Type index exists already ".concat(isPublic ? context.index["public"][0] : context.index["private"][0]));
            }

            return _context11.abrupt("return", context);

          case 9:
            _context11.prev = 9;
            _context11.t0 = _context11["catch"](2);
            _context11.next = 13;
            return makeIndexIfNecessary(context, isPublic);

          case 13:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[2, 9]]);
  }));
  return _ensureOneTypeIndex.apply(this, arguments);
}

function findAppInstances(_x10, _x11, _x12) {
  return _findAppInstances.apply(this, arguments);
}
/**
 * Register a new app in a type index
 */


function _findAppInstances() {
  _findAppInstances = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(context, theClass, isPublic) {
    var visibility, index, thisIndex, registrations, instances, containers, unique, e, i, cont;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            unique = function _unique(arr) {
              return Array.from(new Set(arr));
            };

            if (!(isPublic === undefined)) {
              _context12.next = 7;
              break;
            }

            _context12.next = 4;
            return findAppInstances(context, theClass, true);

          case 4:
            _context12.next = 6;
            return findAppInstances(context, theClass, false);

          case 6:
            return _context12.abrupt("return", context);

          case 7:
            _context12.prev = 7;
            _context12.next = 10;
            return isPublic ? logInLoadProfile(context) : logInLoadPreferences(context);

          case 10:
            _context12.next = 15;
            break;

          case 12:
            _context12.prev = 12;
            _context12.t0 = _context12["catch"](7);
            widgets.complain(context, "loadIndex: login and load problem ".concat(_context12.t0));

          case 15:
            // console.log('awaited LogInLoad!', context)
            visibility = isPublic ? 'public' : 'private';
            _context12.prev = 16;
            _context12.next = 19;
            return loadIndex(context, isPublic);

          case 19:
            _context12.next = 23;
            break;

          case 21:
            _context12.prev = 21;
            _context12.t1 = _context12["catch"](16);

          case 23:
            index = context.index; // eslint-disable-next-line no-console

            console.log({
              index: index,
              visibility: visibility
            });
            thisIndex = index[visibility]; // eslint-disable-next-line no-console

            console.log('Failing test?', thisIndex.map(function (ix) {
              return _logic.solidLogicSingleton.store.each(undefined, ns.solid('forClass'), theClass, ix);
            }));
            registrations = thisIndex.map(function (ix) {
              return _logic.solidLogicSingleton.store.each(undefined, ns.solid('forClass'), theClass, ix);
            }).flat();
            instances = registrations.map(function (reg) {
              return _logic.solidLogicSingleton.store.each(reg, ns.solid('instance'));
            }).flat();
            containers = registrations.map(function (reg) {
              return _logic.solidLogicSingleton.store.each(reg, ns.solid('instanceContainer'));
            }).flat();
            context.instances = context.instances || [];
            context.instances = unique(context.instances.concat(instances));
            context.containers = context.containers || [];
            context.containers = unique(context.containers.concat(containers));

            if (containers.length) {
              _context12.next = 36;
              break;
            }

            return _context12.abrupt("return", context);

          case 36:
            _context12.prev = 36;
            _context12.next = 39;
            return _logic.solidLogicSingleton.load(containers);

          case 39:
            _context12.next = 46;
            break;

          case 41:
            _context12.prev = 41;
            _context12.t2 = _context12["catch"](36);
            e = new Error("[FAI] Unable to load containers".concat(_context12.t2));
            debug.log(e); // complain

            widgets.complain(context, "Error looking for ".concat(utils.label(theClass), ":  ").concat(_context12.t2)); // but then ignore it
            // throw new Error(e)

          case 46:
            i = 0;

          case 47:
            if (!(i < containers.length)) {
              _context12.next = 57;
              break;
            }

            cont = containers[i];
            _context12.t3 = context.instances;
            _context12.next = 52;
            return _logic.solidLogicSingleton.getContainerMembers(cont.value);

          case 52:
            _context12.t4 = _context12.sent.map(function (uri) {
              return _logic.solidLogicSingleton.store.sym(uri);
            });
            context.instances = _context12.t3.concat.call(_context12.t3, _context12.t4);

          case 54:
            i++;
            _context12.next = 47;
            break;

          case 57:
            return _context12.abrupt("return", context);

          case 58:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[7, 12], [16, 21], [36, 41]]);
  }));
  return _findAppInstances.apply(this, arguments);
}

function registerInTypeIndex(_x13, _x14, _x15, _x16) {
  return _registerInTypeIndex.apply(this, arguments);
}
/**
 * UI to control registration of instance
 */


function _registerInTypeIndex() {
  _registerInTypeIndex = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(context, instance, theClass, isPublic) {
    var indexes, index, registration, ins;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return ensureOneTypeIndex(context, isPublic);

          case 2:
            if (context.index) {
              _context13.next = 4;
              break;
            }

            throw new Error('registerInTypeIndex: No type index found');

          case 4:
            indexes = isPublic ? context.index["public"] : context.index["private"];

            if (indexes.length) {
              _context13.next = 7;
              break;
            }

            throw new Error('registerInTypeIndex: What no type index?');

          case 7:
            index = indexes[0];
            registration = widgets.newThing(index);
            ins = [// See https://github.com/solid/solid/blob/main/proposals/data-discovery.md
            (0, _rdflib.st)(registration, ns.rdf('type'), ns.solid('TypeRegistration'), index), (0, _rdflib.st)(registration, ns.solid('forClass'), theClass, index), (0, _rdflib.st)(registration, ns.solid('instance'), instance, index)];
            _context13.prev = 10;
            _context13.next = 13;
            return _logic.solidLogicSingleton.updatePromise([], ins);

          case 13:
            _context13.next = 19;
            break;

          case 15:
            _context13.prev = 15;
            _context13.t0 = _context13["catch"](10);
            debug.log(_context13.t0);
            (0, _log.alert)(_context13.t0);

          case 19:
            return _context13.abrupt("return", context);

          case 20:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[10, 15]]);
  }));
  return _registerInTypeIndex.apply(this, arguments);
}

function registrationControl(context, instance, theClass) {
  var dom = context.dom;

  if (!dom || !context.div) {
    return Promise.resolve();
  }

  var box = dom.createElement('div');
  context.div.appendChild(box);
  return ensureTypeIndexes(context).then(function () {
    box.innerHTML = '<table><tbody><tr></tr><tr></tr></tbody></table>'; // tbody will be inserted anyway

    box.setAttribute('style', 'font-size: 120%; text-align: right; padding: 1em; border: solid gray 0.05em;');
    var tbody = box.children[0].children[0];
    var form = new _rdflib.BlankNode(); // @@ say for now

    var registrationStatements = function registrationStatements(index) {
      var registrations = _logic.solidLogicSingleton.getRegistrations(instance, theClass);

      var reg = registrations.length ? registrations[0] : widgets.newThing(index);
      return [(0, _rdflib.st)(reg, ns.solid('instance'), instance, index), (0, _rdflib.st)(reg, ns.solid('forClass'), theClass, index)];
    };

    var index, statements;

    if (context.index && context.index["public"] && context.index["public"].length > 0) {
      index = context.index["public"][0];
      statements = registrationStatements(index);
      tbody.children[0].appendChild(widgets.buildCheckBoxForm(context.dom, _logic.solidLogicSingleton.store, "Public link to this ".concat(context.noun), null, statements, form, index));
    }

    if (context.index && context.index["private"] && context.index["private"].length > 0) {
      index = context.index["private"][0];
      statements = registrationStatements(index);
      tbody.children[1].appendChild(widgets.buildCheckBoxForm(context.dom, _logic.solidLogicSingleton.store, "Personal note of this ".concat(context.noun), null, statements, form, index));
    }

    return context;
  }, function (e) {
    var msg;

    if (context.div && context.preferencesFileError) {
      msg = '(Preferences not available)';
      context.div.appendChild(dom.createElement('p')).textContent = msg;
    } else if (context.div) {
      msg = "registrationControl: Type indexes not available: ".concat(e);
      context.div.appendChild(widgets.errorMessageBlock(context.dom, e));
    }

    debug.log(msg);
  })["catch"](function (e) {
    var msg = "registrationControl: Error making panel: ".concat(e);

    if (context.div) {
      context.div.appendChild(widgets.errorMessageBlock(context.dom, e));
    }

    debug.log(msg);
  });
}
/**
 * UI to List at all registered things
 */


function registrationList(context, options) {
  var dom = context.dom;
  var div = context.div;
  var box = dom.createElement('div');
  div.appendChild(box);
  return ensureTypeIndexes(context).then(function (_indexes) {
    box.innerHTML = '<table><tbody></tbody></table>'; // tbody will be inserted anyway

    box.setAttribute('style', 'font-size: 120%; text-align: right; padding: 1em; border: solid #eee 0.5em;');
    var table = box.firstChild;
    var ix = [];
    var sts = [];
    var vs = ['private', 'public'];
    vs.forEach(function (visibility) {
      if (context.index && options[visibility]) {
        ix = ix.concat(context.index[visibility][0]);
        sts = sts.concat(_logic.solidLogicSingleton.store.statementsMatching(undefined, ns.solid('instance'), undefined, context.index[visibility][0]));
      }
    });

    var _loop = function _loop(i) {
      var statement = sts[i];

      if (options.type) {
        // now check  terms:forClass
        if (!_logic.solidLogicSingleton.store.holds(statement.subject, ns.solid('forClass'), options.type, statement.why)) {
          return "continue"; // skip irrelevant ones
        }
      } // const cla = statement.subject


      var inst = statement.object;
      table.appendChild(widgets.personTR(dom, ns.solid('instance'), inst, {
        deleteFunction: function deleteFunction(_x) {
          if (!_logic.solidLogicSingleton.store.updater) {
            throw new Error('Cannot delete this, store has no updater');
          }

          _logic.solidLogicSingleton.store.updater.update([statement], [], function (uri, ok, errorBody) {
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


    return context;
  });
}
/**
 * Simple Access Control
 *
 * This function sets up a simple default ACL for a resource, with
 * RWC for the owner, and a specified access (default none) for the public.
 * In all cases owner has read write control.
 * Parameter lists modes allowed to public
 *
 * @param options
 * @param options.public eg ['Read', 'Write']
 *
 * @returns Resolves with aclDoc uri on successful write
 */


function setACLUserPublic(docURI, me, options) {
  var aclDoc = _logic.solidLogicSingleton.store.any(_logic.solidLogicSingleton.store.sym(docURI), _solidLogic.ACL_LINK);

  return Promise.resolve().then(function () {
    if (aclDoc) {
      return aclDoc;
    }

    return fetchACLRel(docURI)["catch"](function (err) {
      throw new Error("Error fetching rel=ACL header for ".concat(docURI, ": ").concat(err));
    });
  }).then(function (aclDoc) {
    var aclText = genACLText(docURI, me, aclDoc.uri, options);

    if (!_logic.solidLogicSingleton.store.fetcher) {
      throw new Error('Cannot PUT this, store has no fetcher');
    }

    return _logic.solidLogicSingleton.store.fetcher.webOperation('PUT', aclDoc.uri, {
      data: aclText,
      contentType: 'text/turtle'
    }).then(function (result) {
      if (!result.ok) {
        throw new Error('Error writing ACL text: ' + result.error);
      }

      return aclDoc;
    });
  });
}
/**
 * @param docURI
 * @returns
 */


function fetchACLRel(docURI) {
  var fetcher = _logic.solidLogicSingleton.store.fetcher;

  if (!fetcher) {
    throw new Error('Cannot fetch ACL rel, store has no fetcher');
  }

  return fetcher.load(docURI).then(function (result) {
    if (!result.ok) {
      throw new Error('fetchACLRel: While loading:' + result.error);
    }

    var aclDoc = _logic.solidLogicSingleton.store.any(_logic.solidLogicSingleton.store.sym(docURI), _solidLogic.ACL_LINK);

    if (!aclDoc) {
      throw new Error('fetchACLRel: No Link rel=ACL header for ' + docURI);
    }

    return aclDoc;
  });
}
/**
 * @param docURI
 * @param me
 * @param aclURI
 * @param options
 *
 * @returns Serialized ACL
 */


function genACLText(docURI, me, aclURI) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var optPublic = options["public"] || [];
  var g = (0, _rdflib.graph)();
  var auth = (0, _rdflib.Namespace)('http://www.w3.org/ns/auth/acl#');
  var a = g.sym("".concat(aclURI, "#a1"));
  var acl = g.sym(aclURI);
  var doc = g.sym(docURI);
  g.add(a, ns.rdf('type'), auth('Authorization'), acl);
  g.add(a, auth('accessTo'), doc, acl);

  if (options.defaultForNew) {
    // TODO: Should this be auth('default') instead?
    g.add(a, auth('defaultForNew'), doc, acl);
  }

  g.add(a, auth('agent'), me, acl);
  g.add(a, auth('mode'), auth('Read'), acl);
  g.add(a, auth('mode'), auth('Write'), acl);
  g.add(a, auth('mode'), auth('Control'), acl);

  if (optPublic.length) {
    a = g.sym("".concat(aclURI, "#a2"));
    g.add(a, ns.rdf('type'), auth('Authorization'), acl);
    g.add(a, auth('accessTo'), doc, acl);
    g.add(a, auth('agentClass'), ns.foaf('Agent'), acl);

    for (var p = 0; p < optPublic.length; p++) {
      g.add(a, auth('mode'), auth(optPublic[p]), acl); // Like 'Read' etc
    }
  }

  return (0, _rdflib.serialize)(acl, g, aclURI);
}
/**
 * Returns `sym($SolidTestEnvironment.username)` if
 * `$SolidTestEnvironment.username` is defined as a global
 * @returns {NamedNode|null}
 */


function offlineTestID() {
  var _window = window,
      $SolidTestEnvironment = _window.$SolidTestEnvironment;

  if (typeof $SolidTestEnvironment !== 'undefined' && $SolidTestEnvironment.username) {
    // Test setup
    debug.log('Assuming the user is ' + $SolidTestEnvironment.username);
    return (0, _rdflib.sym)($SolidTestEnvironment.username);
  }

  if (typeof document !== 'undefined' && document.location && ('' + document.location).slice(0, 16) === 'http://localhost') {
    var div = document.getElementById('appTarget');
    if (!div) return null;
    var id = div.getAttribute('testID');
    if (!id) return null;
    /* me = solidLogicSingleton.store.any(subject, ns.acl('owner')); // when testing on plane with no WebID
     */

    debug.log('Assuming user is ' + id);
    return (0, _rdflib.sym)(id);
  }

  return null;
}

function getDefaultSignInButtonStyle() {
  return 'padding: 1em; border-radius:0.5em; margin: 2em; font-size: 100%;';
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
  signInPopUpButton.addEventListener('click', function () {
    var offline = offlineTestID();
    if (offline) return setUserCallback(offline.uri);
    return _solidAuthClient["default"].popupLogin().then(function (session) {
      var webIdURI = session.webId; // setUserCallback(webIdURI)

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
    });
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
/**
 * @returns {Promise<string|null>} Resolves with WebID URI or null
 */


function webIdFromSession(session) {
  var webId = session ? session.webId : null;

  if (webId) {
    saveUser(webId);
  }

  return webId;
}
/**
 * @returns {Promise<string|null>} Resolves with WebID URI or null
 */

/*
function checkCurrentUser () {
  return checkUser()
}
*/

/**
 * Retrieves currently logged in webId from either
 * defaultTestUser or SolidAuthClient
 * @param [setUserCallback] Optional callback
 *
 * @returns Resolves with webId uri, if no callback provided
 */


function checkUser(setUserCallback) {
  // Check to see if already logged in / have the WebID
  var me = defaultTestUser();

  if (me) {
    return Promise.resolve(setUserCallback ? setUserCallback(me) : me);
  } // doc = solidLogicSingleton.store.any(doc, ns.link('userMirror')) || doc


  return _solidAuthClient["default"].currentSession().then(webIdFromSession)["catch"](function (err) {
    debug.log('Error fetching currentSession:', err);
  }).then(function (webId) {
    // if (webId.startsWith('dns:')) {  // legacy rww.io pseudo-users
    //   webId = null
    // }
    var me = saveUser(webId);

    if (me) {
      debug.log("(Logged in as ".concat(me, " by authentication)"));
    }

    return setUserCallback ? setUserCallback(me) : me;
  });
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
  var me = defaultTestUser(); // @@ TODO Remove the need to cast HTML element to any

  var box = dom.createElement('div');

  function setIt(newidURI) {
    if (!newidURI) {
      return;
    }

    var uri = newidURI.uri || newidURI; //    UI.preferences.set('me', uri)

    me = (0, _rdflib.sym)(uri);
    box.refresh();
    if (listener) listener(me.uri);
  }

  function logoutButtonHandler(_event) {
    // UI.preferences.set('me', '')
    _solidAuthClient["default"].logout().then(function () {
      var message = "Your WebID was ".concat(me, ". It has been forgotten.");
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
      var nick = _logic.solidLogicSingleton.store.any(me, ns.foaf('nick')) || _logic.solidLogicSingleton.store.any(me, ns.foaf('name'));

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
    _solidAuthClient["default"].currentSession().then(function (session) {
      if (session && session.webId) {
        // offline
        me = (0, _rdflib.sym)(session.webId);
      } else {
        me = offlineTestID(); // null unless testing
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
    }, function (err) {
      (0, _log.alert)("loginStatusBox: ".concat(err));
    });
  };

  if (_solidAuthClient["default"].trackSession) {
    _solidAuthClient["default"].trackSession(function (session) {
      if (session && session.webId) {
        me = (0, _rdflib.sym)(session.webId);
      } else {
        me = null;
      }

      box.refresh();
    });
  }

  box.me = '99999'; // Force refresh

  box.refresh();
  return box;
}
/**
 * Workspace selection etc
 * See https://github.com/solid/userguide/issues/16
 */

/**
 * Returns a UI object which, if it selects a workspace,
 * will callback(workspace, newBase).
 * See https://github.com/solid/userguide/issues/16 for more info on workspaces.
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
  var me = defaultTestUser();
  var box = dom.createElement('div');
  var context = {
    me: me,
    dom: dom,
    div: box
  };

  function say(s) {
    box.appendChild(widgets.errorMessageBlock(dom, s));
  }

  function figureOutBase(ws) {
    var newBaseNode = _logic.solidLogicSingleton.store.any(ws, ns.space('uriPrefix'));

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
    function makeNewWorkspace(_x17) {
      return _makeNewWorkspace.apply(this, arguments);
    } // const status = ''


    function _makeNewWorkspace() {
      _makeNewWorkspace = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_event) {
        var row, cell, newBase, newWs, newData;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                row = table.appendChild(dom.createElement('tr'));
                cell = row.appendChild(dom.createElement('td'));
                cell.setAttribute('colspan', '3');
                cell.style.padding = '0.5em';
                _context.t0 = encodeURI;
                _context.next = 7;
                return widgets.askName(dom, _logic.solidLogicSingleton.store, cell, ns.solid('URL'), ns.space('Workspace'), 'Workspace');

              case 7:
                _context.t1 = _context.sent;
                newBase = (0, _context.t0)(_context.t1);
                newWs = widgets.newThing(context.preferencesFile);
                newData = [(0, _rdflib.st)(context.me, ns.space('workspace'), newWs, context.preferencesFile), // eslint-disable-next-line camelcase
                (0, _rdflib.st)(newWs, ns.space('uriPrefix'), newBase, context.preferencesFile)];

                if (_logic.solidLogicSingleton.store.updater) {
                  _context.next = 13;
                  break;
                }

                throw new Error('store has no updater');

              case 13:
                _context.next = 15;
                return _logic.solidLogicSingleton.store.updater.update([], newData);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _makeNewWorkspace.apply(this, arguments);
    }

    var id = context.me;
    var preferencesFile = context.preferencesFile;
    var newBase = null; // A workspace specifically defined in the private preference file:

    var w = _logic.solidLogicSingleton.store.each(id, ns.space('workspace'), undefined, preferencesFile); // Only trust preference file here
    // A workspace in a storage in the public profile:


    var storages = _logic.solidLogicSingleton.store.each(id, ns.space('storage')); // @@ No provenance requirement at the moment


    if (w.length === 0 && storages) {
      say("You don't seem to have any workspaces. You have ".concat(storages.length, " storage spaces."));
      storages.map(function (s) {
        w = w.concat(_logic.solidLogicSingleton.store.each(s, ns.ldp('contains')));
        return w;
      }).filter(function (file) {
        return ['public', 'private'].includes(file.id().toLowerCase());
      });
    }

    if (w.length === 1) {
      say("Workspace used: ".concat(w[0].uri)); // @@ allow user to see URI

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
      return !_logic.solidLogicSingleton.store.holds(x, ns.rdf('type'), // Ignore master workspaces
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
      style = _logic.solidLogicSingleton.store.anyValue(ws, ns.ui('style'));

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

      var label = _logic.solidLogicSingleton.store.any(ws, ns.rdfs('label'));

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
      comment = _logic.solidLogicSingleton.store.any(ws, ns.rdfs('comment'));
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


  logInLoadPreferences(context) // kick off async operation
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
  _getUserRoles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
    var _yield$logInLoadPrefe, me, preferencesFile, preferencesFileError;

    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return logInLoadPreferences({});

          case 3:
            _yield$logInLoadPrefe = _context14.sent;
            me = _yield$logInLoadPrefe.me;
            preferencesFile = _yield$logInLoadPrefe.preferencesFile;
            preferencesFileError = _yield$logInLoadPrefe.preferencesFileError;

            if (!(!preferencesFile || preferencesFileError)) {
              _context14.next = 9;
              break;
            }

            throw new Error(preferencesFileError);

          case 9:
            return _context14.abrupt("return", _logic.solidLogicSingleton.store.each(me, ns.rdf('type'), null, preferencesFile.doc()));

          case 12:
            _context14.prev = 12;
            _context14.t0 = _context14["catch"](0);
            debug.warn('Unable to fetch your preferences - this was the error: ', _context14.t0);

          case 15:
            return _context14.abrupt("return", []);

          case 16:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 12]]);
  }));
  return _getUserRoles.apply(this, arguments);
}

function filterAvailablePanes(_x18) {
  return _filterAvailablePanes.apply(this, arguments);
}

function _filterAvailablePanes() {
  _filterAvailablePanes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(panes) {
    var userRoles;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return getUserRoles();

          case 2:
            userRoles = _context15.sent;
            return _context15.abrupt("return", panes.filter(function (pane) {
              return isMatchingAudience(pane, userRoles);
            }));

          case 4:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
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
//# sourceMappingURL=authn.js.map