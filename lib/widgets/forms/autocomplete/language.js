"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPreferredLanagugesFor = getPreferredLanagugesFor;
exports.getPreferredLanguages = getPreferredLanguages;
exports.filterByLanguage = filterByLanguage;
exports.defaultPreferedLangages = exports.languageCodeURIBase = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var debug = _interopRequireWildcard(require("../../../debug"));

var _index = require("../../../authn/index");

var ns = _interopRequireWildcard(require("../../../ns"));

var _logic = require("../../../logic");

/* Logic to access public data stores
*
* including filtering resut by natural language etc
* See https://solidos.solidcommunity.net/public/2021/01%20Building%20Solid%20Apps%20which%20use%20Public%20Data.html
*/

/* eslint-disable no-console */
// import * as logic from '../index'
// import { Binding } from '../widgets/forms/autocomplete/publicData'
// import { nativeNameForLanguageCode, englishNameForLanguageCode } from './nativeNameForLanguageCode'
var languageCodeURIBase = 'https://www.w3.org/ns/iana/language-code/'; /// @@ unsupported on the web (2021)

exports.languageCodeURIBase = languageCodeURIBase;
var defaultPreferedLangages = ['en', 'fr', 'de', 'it'];
exports.defaultPreferedLangages = defaultPreferedLangages;

function getPreferredLanagugesFor(_x) {
  return _getPreferredLanagugesFor.apply(this, arguments);
}
/* Get the preferred langauges for the user
 *
 *  Either from solid preferences or browser preferences or default
 */


function _getPreferredLanagugesFor() {
  _getPreferredLanagugesFor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(person) {
    var list, languageCodeArray;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _logic.kb.fetcher.load(person.doc());

          case 2:
            list = _logic.kb.any(person, ns.schema('knowsLanguage'), null, person.doc());

            if (list) {
              _context.next = 6;
              break;
            }

            console.log("User ".concat(person, " has not set their languages in their profile."));
            return _context.abrupt("return", null);

          case 6:
            languageCodeArray = [];
            list.elements.forEach(function (item) {
              var lang = _logic.kb.any(item, ns.solid('publicId'), null, item.doc());

              if (!lang) {
                console.warn('getPreferredLanguages: No publiID of language.');
                return;
              }

              if (!lang.value.startsWith(languageCodeURIBase)) {
                console.error("What should be a language code ".concat(lang.value, " does not start with ").concat(languageCodeURIBase));
                return;
              }

              var code = lang.value.slice(languageCodeURIBase.length);
              languageCodeArray.push(code);
            });

            if (!(languageCodeArray.length > 0)) {
              _context.next = 11;
              break;
            }

            console.log("     User knows languages with codes: \"".concat(languageCodeArray.join(','), "\""));
            return _context.abrupt("return", languageCodeArray);

          case 11:
            return _context.abrupt("return", null);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getPreferredLanagugesFor.apply(this, arguments);
}

function getPreferredLanguages() {
  return _getPreferredLanguages.apply(this, arguments);
}
/* From an array of bindings with a names for each row,
 * remove dupliacte names for the same thing, leaving the user's
 * preferred language version
*/


function _getPreferredLanguages() {
  _getPreferredLanguages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var me, solidLanguagePrefs;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _index.authn.currentUser();

          case 2:
            me = _context2.sent;

            if (!me) {
              _context2.next = 9;
              break;
            }

            _context2.next = 6;
            return getPreferredLanagugesFor(me);

          case 6:
            solidLanguagePrefs = _context2.sent;

            if (!solidLanguagePrefs) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", solidLanguagePrefs);

          case 9:
            if (!(typeof navigator !== 'undefined')) {
              _context2.next = 14;
              break;
            }

            if (!navigator.languages) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", navigator.languages.map(function (longForm) {
              return longForm.split('-')[0];
            }));

          case 12:
            if (!navigator.language) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", [navigator.language.split('-')[0]]);

          case 14:
            return _context2.abrupt("return", defaultPreferedLangages);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getPreferredLanguages.apply(this, arguments);
}

function filterByLanguage(bindings, languagePrefs) {
  var uris = {};
  bindings.forEach(function (binding) {
    // Organize names by their subject
    var uri = binding.subject.value;
    uris[uri] = uris[uri] || [];
    uris[uri].push(binding);
  });
  var languagePrefs2 = languagePrefs || defaultPreferedLangages;
  languagePrefs2.reverse(); // prefered last

  var slimmed = [];

  for (var u in uris) {
    // needs hasOwnProperty ?
    var _bindings = uris[u];

    var sortMe = _bindings.map(function (binding) {
      return [languagePrefs2.indexOf(binding.name['xml:lang']), binding];
    });

    sortMe.sort(); // best at th ebottom

    sortMe.reverse(); // best at the top

    slimmed.push(sortMe[0][1]);
  } // map u


  debug.log(" Filter by language: ".concat(bindings.length, " -> ").concat(slimmed.length));
  return slimmed;
}
//# sourceMappingURL=language.js.map