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

var _solidLogic = require("solid-logic");

var _signup = _interopRequireDefault(require("./signup"));

var _widgets = _interopRequireDefault(require("../widgets"));

var _ns = _interopRequireDefault(require("../ns.js"));

var _store = _interopRequireDefault(require("../store.js"));

var _utils = _interopRequireDefault(require("../utils.js"));

var _log = require("../log");

var debug = _interopRequireWildcard(require("../debug"));

var _style = require("../style");

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


function logInLoadProfile(context) {
  if (context.publicProfile) {
    return Promise.resolve(context);
  } // already done


  var fetcher = _store["default"].fetcher;
  var profileDocument;
  return new Promise(function (resolve, reject) {
    return logIn(context).then(function (context) {
      var webID = context.me;

      if (!webID) {
        return reject(new Error('Could not log in'));
      }

      profileDocument = webID.doc(); // Load the profile into the knowledge base (fetcher.store)
      //   withCredentials: Web arch should let us just load by turning off creds helps CORS
      //   reload: Gets around a specific old Chrome bug caching/origin/cors

      fetcher.load(profileDocument, {
        withCredentials: false,
        cache: 'reload'
      }).then(function (_response) {
        context.publicProfile = profileDocument;
        resolve(context);
      })["catch"](function (err) {
        var message = "Logged in but cannot load profile ".concat(profileDocument, " : ").concat(err);

        if (context.div && context.dom) {
          context.div.appendChild(_widgets["default"].errorMessageBlock(context.dom, message));
        }

        reject(message);
      });
    })["catch"](function (err) {
      reject(new Error("Can't log in: ".concat(err)));
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


function logInLoadPreferences(context) {
  if (context.preferencesFile) return Promise.resolve(context); // already done

  var statusArea = context.statusArea || context.div || null;
  var progressDisplay;
  return new Promise(function (resolve, reject) {
    return logInLoadProfile(context).then(function (context) {
      var preferencesFile = _store["default"].any(context.me, _ns["default"].space('preferencesFile'));

      function complain(message) {
        message = "logInLoadPreferences: ".concat(message);

        if (statusArea) {
          // statusArea.innerHTML = ''
          statusArea.appendChild(_widgets["default"].errorMessageBlock(context.dom, message));
        }

        debug.log(message);
        reject(new Error(message));
      }
      /**
       * Are we working cross-origin?
       * Returns True if we are in a webapp at an origin, and the file origin is different
       */


      function differentOrigin() {
        return "".concat(window.location.origin, "/") !== preferencesFile.site().uri;
      }

      if (!preferencesFile) {
        return reject(new Error("Can't find a preference file pointer in profile ".concat(context.publicProfile)));
      } // //// Load preference file


      return _store["default"].fetcher.load(preferencesFile, {
        withCredentials: true
      }).then(function () {
        if (progressDisplay) {
          progressDisplay.parentNode.removeChild(progressDisplay);
        }

        context.preferencesFile = preferencesFile;
        return resolve(context);
      })["catch"](function (err) {
        // Really important to look at why
        var status = err.status;
        var message = err.message;
        debug.log("HTTP status ".concat(status, " for preference file ").concat(preferencesFile));
        var m2;

        if (status === 401) {
          m2 = 'Strange - you are not authenticated (properly logged in) to read preference file.';
          (0, _log.alert)(m2);
        } else if (status === 403) {
          if (differentOrigin()) {
            m2 = "Unauthorized: Assuming preference file blocked for origin ".concat(window.location.origin);
            context.preferencesFileError = m2;
            return resolve(context);
          }

          m2 = 'You are not authorized to read your preference file. This may be because you are using an untrusted web app.';
          debug.warn(m2);
        } else if (status === 404) {
          if (confirm("You do not currently have a preference file. OK for me to create an empty one? ".concat(preferencesFile))) {
            // @@@ code me  ... weird to have a name of the file but no file
            (0, _log.alert)("Sorry; I am not prepared to do this. Please create an empty file at ".concat(preferencesFile));
            return complain(new Error('Sorry; no code yet to create a preference file at '));
          } else {
            reject(new Error("User declined to create a preference file at ".concat(preferencesFile)));
          }
        } else {
          m2 = "Strange: Error ".concat(status, " trying to read your preference file.").concat(message);
          (0, _log.alert)(m2);
        }
      }); // load preference file then
    })["catch"](function (err) {
      // Fail initial login load preferences
      reject(new Error("(via loadPrefs) ".concat(err)));
    });
  });
}
/**
 * Resolves with the same context, outputting
 * output: index.public, index.private
 *
 * @see https://github.com/solid/solid/blob/master/proposals/data-discovery.md#discoverability
 */


function loadTypeIndexes(_x2) {
  return _loadTypeIndexes.apply(this, arguments);
}

function _loadTypeIndexes() {
  _loadTypeIndexes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(context) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return loadPublicTypeIndex(context);

          case 2:
            _context2.next = 4;
            return loadPrivateTypeIndex(context);

          case 4:
            return _context2.abrupt("return", context);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadTypeIndexes.apply(this, arguments);
}

function loadPublicTypeIndex(_x3) {
  return _loadPublicTypeIndex.apply(this, arguments);
}

function _loadPublicTypeIndex() {
  _loadPublicTypeIndex = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(context) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", loadIndex(context, _ns["default"].solid('publicTypeIndex'), true));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _loadPublicTypeIndex.apply(this, arguments);
}

function loadPrivateTypeIndex(_x4) {
  return _loadPrivateTypeIndex.apply(this, arguments);
}

function _loadPrivateTypeIndex() {
  _loadPrivateTypeIndex = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(context) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", loadIndex(context, _ns["default"].solid('privateTypeIndex'), false));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _loadPrivateTypeIndex.apply(this, arguments);
}

function loadOneTypeIndex(_x5, _x6) {
  return _loadOneTypeIndex.apply(this, arguments);
}

function _loadOneTypeIndex() {
  _loadOneTypeIndex = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(context, isPublic) {
    var predicate;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            predicate = isPublic ? _ns["default"].solid('publicTypeIndex') : _ns["default"].solid('privateTypeIndex');
            return _context5.abrupt("return", loadIndex(context, predicate, isPublic));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _loadOneTypeIndex.apply(this, arguments);
}

function loadIndex(_x7, _x8, _x9) {
  return _loadIndex.apply(this, arguments);
}
/**
 * Resolves with the same context, outputting
 * @see https://github.com/solid/solid/blob/master/proposals/data-discovery.md#discoverability
 */


function _loadIndex() {
  _loadIndex = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(context, predicate, isPublic) {
    var me, ixs;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return isPublic ? logInLoadProfile(context) : logInLoadPreferences(context);

          case 3:
            _context6.next = 8;
            break;

          case 5:
            _context6.prev = 5;
            _context6.t0 = _context6["catch"](0);

            _widgets["default"].complain(context, "loadPublicIndex: login and load problem ".concat(_context6.t0));

          case 8:
            me = context.me;
            context.index = context.index || {};

            if (!isPublic) {
              _context6.next = 15;
              break;
            }

            ixs = _store["default"].each(me, predicate, undefined, context.publicProfile);
            context.index["public"] = ixs;
            _context6.next = 24;
            break;

          case 15:
            if (context.preferencesFileError) {
              _context6.next = 23;
              break;
            }

            ixs = _store["default"].each(me, _ns["default"].solid('privateTypeIndex'), undefined, context.preferencesFile);
            context.index["private"] = ixs;

            if (!(ixs.length === 0)) {
              _context6.next = 21;
              break;
            }

            _widgets["default"].complain("Your preference file ".concat(context.preferencesFile, " does not point to a private type index."));

            return _context6.abrupt("return", context);

          case 21:
            _context6.next = 24;
            break;

          case 23:
            debug.log('We know your preference file is not available, so we are not bothering with private type indexes.');

          case 24:
            _context6.prev = 24;
            _context6.next = 27;
            return _store["default"].fetcher.load(ixs);

          case 27:
            _context6.next = 32;
            break;

          case 29:
            _context6.prev = 29;
            _context6.t1 = _context6["catch"](24);

            _widgets["default"].complain(context, "loadPublicIndex: loading public type index ".concat(_context6.t1));

          case 32:
            return _context6.abrupt("return", context);

          case 33:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 5], [24, 29]]);
  }));
  return _loadIndex.apply(this, arguments);
}

function ensureTypeIndexes(_x10) {
  return _ensureTypeIndexes.apply(this, arguments);
}
/**
 * Load or create ONE type index
 * Find one or make one or fail
 * Many reasons for failing including script not having permission etc
 *
 * Adds its output to the context
 * @see https://github.com/solid/solid/blob/master/proposals/data-discovery.md#discoverability
 */


function _ensureTypeIndexes() {
  _ensureTypeIndexes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(context) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return ensureOneTypeIndex(context, true);

          case 2:
            _context7.next = 4;
            return ensureOneTypeIndex(context, false);

          case 4:
            return _context7.abrupt("return", context);

          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _ensureTypeIndexes.apply(this, arguments);
}

function ensureOneTypeIndex(_x11, _x12) {
  return _ensureOneTypeIndex.apply(this, arguments);
}
/**
 * Returns promise of context with arrays of symbols
 *
 * 2016-12-11 change to include forClass arc a la
 * https://github.com/solid/solid/blob/master/proposals/data-discovery.md
 */


function _ensureOneTypeIndex() {
  _ensureOneTypeIndex = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(context, isPublic) {
    var makeIndexIfNecessary, _makeIndexIfNecessary;

    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _makeIndexIfNecessary = function _makeIndexIfNecessary3() {
              _makeIndexIfNecessary = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(context, isPublic) {
                var relevant, visibility, putIndex, _putIndex, newIndex, addMe, msg, ixs;

                return _regenerator["default"].wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _putIndex = function _putIndex3() {
                          _putIndex = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(newIndex) {
                            var _msg;

                            return _regenerator["default"].wrap(function _callee8$(_context8) {
                              while (1) {
                                switch (_context8.prev = _context8.next) {
                                  case 0:
                                    _context8.prev = 0;
                                    _context8.next = 3;
                                    return _store["default"].fetcher.webOperation('PUT', newIndex.uri, {
                                      data: "# ".concat(new Date(), " Blank initial Type index\n"),
                                      contentType: 'text/turtle'
                                    });

                                  case 3:
                                    return _context8.abrupt("return", context);

                                  case 6:
                                    _context8.prev = 6;
                                    _context8.t0 = _context8["catch"](0);
                                    _msg = "Error creating new index ".concat(_context8.t0);

                                    _widgets["default"].complain(context, _msg);

                                  case 10:
                                  case "end":
                                    return _context8.stop();
                                }
                              }
                            }, _callee8, null, [[0, 6]]);
                          }));
                          return _putIndex.apply(this, arguments);
                        };

                        putIndex = function _putIndex2(_x24) {
                          return _putIndex.apply(this, arguments);
                        };

                        relevant = isPublic ? context.publicProfile : context.preferencesFile;
                        visibility = isPublic ? 'public' : 'private';
                        // putIndex
                        context.index = context.index || {};
                        context.index[visibility] = context.index[visibility] || [];

                        if (!(context.index[visibility].length === 0)) {
                          _context9.next = 29;
                          break;
                        }

                        newIndex = (0, _rdflib.sym)("".concat(relevant.dir().uri + visibility, "TypeIndex.ttl"));
                        debug.log("Linking to new fresh type index ".concat(newIndex));

                        if (confirm("OK to create a new empty index file at ".concat(newIndex, ", overwriting anything that is now there?"))) {
                          _context9.next = 11;
                          break;
                        }

                        throw new Error('cancelled by user');

                      case 11:
                        debug.log("Linking to new fresh type index ".concat(newIndex));
                        addMe = [(0, _rdflib.st)(context.me, _ns["default"].solid("".concat(visibility, "TypeIndex")), newIndex, relevant)];
                        _context9.prev = 13;
                        _context9.next = 16;
                        return updatePromise(_store["default"].updater, [], addMe);

                      case 16:
                        _context9.next = 23;
                        break;

                      case 18:
                        _context9.prev = 18;
                        _context9.t0 = _context9["catch"](13);
                        msg = "Error saving type index link saving back ".concat(newIndex, ": ").concat(_context9.t0);

                        _widgets["default"].complain(context, msg);

                        return _context9.abrupt("return", context);

                      case 23:
                        debug.log("Creating new fresh type index file".concat(newIndex));
                        _context9.next = 26;
                        return putIndex(newIndex);

                      case 26:
                        context.index[visibility].push(newIndex); // @@ wait

                        _context9.next = 38;
                        break;

                      case 29:
                        // officially exists
                        ixs = context.index[visibility];
                        _context9.prev = 30;
                        _context9.next = 33;
                        return _store["default"].fetcher.load(ixs);

                      case 33:
                        _context9.next = 38;
                        break;

                      case 35:
                        _context9.prev = 35;
                        _context9.t1 = _context9["catch"](30);

                        _widgets["default"].complain(context, "ensureOneTypeIndex: loading indexes ".concat(_context9.t1));

                      case 38:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9, null, [[13, 18], [30, 35]]);
              }));
              return _makeIndexIfNecessary.apply(this, arguments);
            };

            makeIndexIfNecessary = function _makeIndexIfNecessary2(_x22, _x23) {
              return _makeIndexIfNecessary.apply(this, arguments);
            };

            _context10.prev = 2;
            _context10.next = 5;
            return loadOneTypeIndex(context, isPublic);

          case 5:
            if (context.index) {
              debug.log("ensureOneTypeIndex: Type index exists already ".concat(isPublic ? context.index["public"][0] : context.index["private"][0]));
            }

            return _context10.abrupt("return", context);

          case 9:
            _context10.prev = 9;
            _context10.t0 = _context10["catch"](2);
            _context10.next = 13;
            return makeIndexIfNecessary(context, isPublic);

          case 13:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[2, 9]]);
  }));
  return _ensureOneTypeIndex.apply(this, arguments);
}

function findAppInstances(_x13, _x14, _x15) {
  return _findAppInstances.apply(this, arguments);
} // @@@@ use the one in rdflib.js when it is available and delete this


function _findAppInstances() {
  _findAppInstances = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(context, theClass, isPublic) {
    var fetcher, visibility, index, thisIndex, registrations, instances, containers, unique, e, i, cont;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            unique = function _unique(arr) {
              return Array.from(new Set(arr));
            };

            fetcher = _store["default"].fetcher;

            if (!(isPublic === undefined)) {
              _context11.next = 8;
              break;
            }

            _context11.next = 5;
            return findAppInstances(context, theClass, true);

          case 5:
            _context11.next = 7;
            return findAppInstances(context, theClass, false);

          case 7:
            return _context11.abrupt("return", context);

          case 8:
            visibility = isPublic ? 'public' : 'private';
            _context11.prev = 9;
            _context11.next = 12;
            return loadOneTypeIndex(context, isPublic);

          case 12:
            _context11.next = 16;
            break;

          case 14:
            _context11.prev = 14;
            _context11.t0 = _context11["catch"](9);

          case 16:
            index = context.index;
            thisIndex = index[visibility];
            registrations = thisIndex.map(function (ix) {
              return _store["default"].each(undefined, _ns["default"].solid('forClass'), theClass, ix);
            }).flat();
            instances = registrations.map(function (reg) {
              return _store["default"].each(reg, _ns["default"].solid('instance'));
            }).flat();
            containers = registrations.map(function (reg) {
              return _store["default"].each(reg, _ns["default"].solid('instanceContainer'));
            }).flat();
            context.instances = context.instances || [];
            context.instances = unique(context.instances.concat(instances));
            context.containers = context.containers || [];
            context.containers = unique(context.containers.concat(containers));

            if (containers.length) {
              _context11.next = 27;
              break;
            }

            return _context11.abrupt("return", context);

          case 27:
            _context11.prev = 27;
            _context11.next = 30;
            return fetcher.load(containers);

          case 30:
            _context11.next = 37;
            break;

          case 32:
            _context11.prev = 32;
            _context11.t1 = _context11["catch"](27);
            e = new Error("[FAI] Unable to load containers".concat(_context11.t1));
            debug.log(e); // complain

            _widgets["default"].complain(context, "Error looking for ".concat(_utils["default"].label(theClass), ":  ").concat(_context11.t1)); // but then ignore it
            // throw new Error(e)


          case 37:
            for (i = 0; i < containers.length; i++) {
              cont = containers[i];
              context.instances = context.instances.concat(_store["default"].each(cont, _ns["default"].ldp('contains')));
            }

            return _context11.abrupt("return", context);

          case 39:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[9, 14], [27, 32]]);
  }));
  return _findAppInstances.apply(this, arguments);
}

function updatePromise(updater, del) {
  var ins = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return new Promise(function (resolve, reject) {
    updater.update(del, ins, function (uri, ok, errorBody) {
      if (!ok) {
        reject(new Error(errorBody));
      } else {
        resolve();
      }
    }); // callback
  }); // promise
}
/**
 * Register a new app in a type index
 */


function registerInTypeIndex(_x16, _x17, _x18, _x19) {
  return _registerInTypeIndex.apply(this, arguments);
}
/**
 * UI to control registration of instance
 */


function _registerInTypeIndex() {
  _registerInTypeIndex = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(context, instance, theClass, isPublic) {
    var indexes, index, registration, ins;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return ensureOneTypeIndex(context, isPublic);

          case 2:
            if (context.index) {
              _context12.next = 4;
              break;
            }

            throw new Error('registerInTypeIndex: No type index found');

          case 4:
            indexes = isPublic ? context.index["public"] : context.index["private"];

            if (indexes.length) {
              _context12.next = 7;
              break;
            }

            throw new Error('registerInTypeIndex: What no type index?');

          case 7:
            index = indexes[0];
            registration = _widgets["default"].newThing(index);
            ins = [// See https://github.com/solid/solid/blob/master/proposals/data-discovery.md
            (0, _rdflib.st)(registration, _ns["default"].rdf('type'), _ns["default"].solid('TypeRegistration'), index), (0, _rdflib.st)(registration, _ns["default"].solid('forClass'), theClass, index), (0, _rdflib.st)(registration, _ns["default"].solid('instance'), instance, index)];
            _context12.prev = 10;
            _context12.next = 13;
            return updatePromise(_store["default"].updater, [], ins);

          case 13:
            _context12.next = 19;
            break;

          case 15:
            _context12.prev = 15;
            _context12.t0 = _context12["catch"](10);
            debug.log(_context12.t0);
            (0, _log.alert)(_context12.t0);

          case 19:
            return _context12.abrupt("return", context);

          case 20:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[10, 15]]);
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

    var form = _store["default"].bnode(); // @@ say for now


    var registrationStatements = function registrationStatements(index) {
      var registrations = _store["default"].each(undefined, _ns["default"].solid('instance'), instance).filter(function (r) {
        return _store["default"].holds(r, _ns["default"].solid('forClass'), theClass);
      });

      var reg = registrations.length ? registrations[0] : _widgets["default"].newThing(index);
      return [(0, _rdflib.st)(reg, _ns["default"].solid('instance'), instance, index), (0, _rdflib.st)(reg, _ns["default"].solid('forClass'), theClass, index)];
    };

    var index, statements;

    if (context.index && context.index["public"] && context.index["public"].length > 0) {
      index = context.index["public"][0];
      statements = registrationStatements(index);
      tbody.children[0].appendChild(_widgets["default"].buildCheckboxForm(context.dom, _store["default"], "Public link to this ".concat(context.noun), null, statements, form, index));
    }

    if (context.index && context.index["private"] && context.index["private"].length > 0) {
      index = context.index["private"][0];
      statements = registrationStatements(index);
      tbody.children[1].appendChild(_widgets["default"].buildCheckboxForm(context.dom, _store["default"], "Personal note of this ".concat(context.noun), null, statements, form, index));
    }

    return context;
  }, function (e) {
    var msg;

    if (context.div && context.preferencesFileError) {
      msg = '(Preferences not available)';
      context.div.appendChild(dom.createElement('p')).textContent = msg;
    } else if (context.div) {
      msg = "registrationControl: Type indexes not available: ".concat(e);
      context.div.appendChild(_widgets["default"].errorMessageBlock(context.dom, e));
    }

    debug.log(msg);
  })["catch"](function (e) {
    var msg = "registrationControl: Error making panel: ".concat(e);

    if (context.div) {
      context.div.appendChild(_widgets["default"].errorMessageBlock(context.dom, e));
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
        sts = sts.concat(_store["default"].statementsMatching(undefined, _ns["default"].solid('instance'), undefined, context.index[visibility][0]));
      }
    });

    var _loop = function _loop(i) {
      var statement = sts[i];

      if (options.type) {
        // now check  terms:forClass
        if (!_store["default"].holds(statement.subject, _ns["default"].solid('forClass'), options.type, statement.why)) {
          return "continue"; // skip irrelevant ones
        }
      } // const cla = statement.subject


      var inst = statement.object;
      table.appendChild(_widgets["default"].personTR(dom, _ns["default"].solid('instance'), inst, {
        deleteFunction: function deleteFunction(_x) {
          _store["default"].updater.update([statement], [], function (uri, ok, errorBody) {
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
       //const containers = kb.each(theClass, ns.solid('instanceContainer'));
       if (containers.length) {
       fetcher.load(containers).then(function(xhrs){
       for (const i=0; i<containers.length; i++) {
       const cont = containers[i];
       instances = instances.concat(kb.each(cont, ns.ldp('contains')));
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
  var aclDoc = _store["default"].any(_store["default"].sym(docURI), _store["default"].sym(_solidLogic.ACL_LINK));

  return Promise.resolve().then(function () {
    if (aclDoc) {
      return aclDoc;
    }

    return fetchACLRel(docURI)["catch"](function (err) {
      throw new Error("Error fetching rel=ACL header for ".concat(docURI, ": ").concat(err));
    });
  }).then(function (aclDoc) {
    var aclText = genACLText(docURI, me, aclDoc.uri, options);
    return _store["default"].fetcher.webOperation('PUT', aclDoc.uri, {
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
  var fetcher = _store["default"].fetcher;
  return fetcher.load(docURI).then(function (result) {
    if (!result.ok) {
      throw new Error('fetchACLRel: While loading:' + result.error);
    }

    var aclDoc = _store["default"].any(_store["default"].sym(docURI), _store["default"].sym(_solidLogic.ACL_LINK));

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
  g.add(a, _ns["default"].rdf('type'), auth('Authorization'), acl);
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
    g.add(a, _ns["default"].rdf('type'), auth('Authorization'), acl);
    g.add(a, auth('accessTo'), doc, acl);
    g.add(a, auth('agentClass'), _ns["default"].foaf('Agent'), acl);

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
    /* me = kb.any(subject, ns.acl('owner')); // when testing on plane with no WebID
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
            div.appendChild(_widgets["default"].errorMessageBlock(dom, e));
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
    var signupMgr = new _signup["default"]();
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
  } // doc = kb.any(doc, ns.link('userMirror')) || doc


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
      var nick = _store["default"].any(me, _ns["default"].foaf('nick')) || _store["default"].any(me, _ns["default"].foaf('name'));

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
        me = (0, _rdflib.sym)(session.webId);
      } else {
        me = null;
      }

      if (me && box.me !== me.uri || !me && box.me) {
        _widgets["default"].clearElement(box);

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
    box.appendChild(_widgets["default"].errorMessageBlock(dom, s));
  }

  function figureOutBase(ws) {
    var newBase = _store["default"].any(ws, _ns["default"].space('uriPrefix'));

    if (!newBase) {
      newBase = ws.uri.split('#')[0];
    } else {
      newBase = newBase.value;
    }

    if (newBase.slice(-1) !== '/') {
      debug.log("".concat(appPathSegment, ": No / at end of uriPrefix ").concat(newBase)); // @@ paramater?

      newBase = "".concat(newBase, "/");
    }

    var now = new Date();
    newBase += "".concat(appPathSegment, "/id").concat(now.getTime(), "/"); // unique id

    return newBase;
  }

  function displayOptions(context) {
    function makeNewWorkspace(_x20) {
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
                return _widgets["default"].askName(dom, _store["default"], cell, _ns["default"].solid('URL'), _ns["default"].space('Workspace'), 'Workspace');

              case 7:
                _context.t1 = _context.sent;
                newBase = (0, _context.t0)(_context.t1);
                newWs = _widgets["default"].newThing(context.preferencesFile);
                newData = [(0, _rdflib.st)(context.me, _ns["default"].space('workspace'), newWs, context.preferencesFile), // eslint-disable-next-line camelcase
                (0, _rdflib.st)(newWs, _ns["default"].space('uriPrefix'), newBase, context.preferencesFile)];
                _context.next = 13;
                return _store["default"].updater.update([], newData);

              case 13:
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

    var w = _store["default"].each(id, _ns["default"].space('workspace'), undefined, preferencesFile); // Only trust preference file here
    // A workspace in a storage in the public profile:


    var storages = _store["default"].each(id, _ns["default"].space('storage')); // @@ No provenance requirement at the moment


    if (w.length === 0 && storages) {
      say("You don't seem to have any workspaces. You have ".concat(storages.length, " storage spaces."));
      storages.map(function (s) {
        w = w.concat(_store["default"].each(s, _ns["default"].ldp('contains')));
      }).filter(function (file) {
        return ['public', 'private'].includes(file.id().toLowerCase());
      });
    }

    if (w.length === 1) {
      say("Workspace used: ".concat(w[0].uri)); // @@ allow user to see URI

      newBase = figureOutBase(w[0]); // callbackWS(w[0], newBase)
    } else if (w.length === 0) {} // Prompt for ws selection or creation
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
      return !_store["default"].holds(x, _ns["default"].rdf('type'), // Ignore master workspaces
      _ns["default"].space('MasterWorkspace'));
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
      style = _store["default"].anyValue(ws, _ns["default"].ui('style'));

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

      var label = _store["default"].any(ws, _ns["default"].rdfs('label'));

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
      comment = _store["default"].any(ws, _ns["default"].rdfs('comment'));
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


  logInLoadPreferences(context) // kick off async operation
  .then(displayOptions)["catch"](function (err) {
    box.appendChild(_widgets["default"].errorMessageBlock(context.dom, err));
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
  _getUserRoles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
    var _yield$logInLoadPrefe, me, preferencesFile, preferencesFileError;

    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return logInLoadPreferences({});

          case 3:
            _yield$logInLoadPrefe = _context13.sent;
            me = _yield$logInLoadPrefe.me;
            preferencesFile = _yield$logInLoadPrefe.preferencesFile;
            preferencesFileError = _yield$logInLoadPrefe.preferencesFileError;

            if (!(!preferencesFile || preferencesFileError)) {
              _context13.next = 9;
              break;
            }

            throw new Error(preferencesFileError);

          case 9:
            return _context13.abrupt("return", _store["default"].each(me, _ns["default"].rdf('type'), null, preferencesFile.doc()));

          case 12:
            _context13.prev = 12;
            _context13.t0 = _context13["catch"](0);
            debug.warn('Unable to fetch your preferences - this was the error: ', _context13.t0);

          case 15:
            return _context13.abrupt("return", []);

          case 16:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 12]]);
  }));
  return _getUserRoles.apply(this, arguments);
}

function filterAvailablePanes(_x21) {
  return _filterAvailablePanes.apply(this, arguments);
}

function _filterAvailablePanes() {
  _filterAvailablePanes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(panes) {
    var userRoles;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return getUserRoles();

          case 2:
            userRoles = _context14.sent;
            return _context14.abrupt("return", panes.filter(function (pane) {
              return isMatchingAudience(pane, userRoles);
            }));

          case 4:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
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