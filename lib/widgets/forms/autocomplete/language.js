"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDefaults = addDefaults;
exports.getPreferredLanguagesFor = getPreferredLanguagesFor;
exports.getPreferredLanguages = getPreferredLanguages;
exports.filterByLanguage = filterByLanguage;
exports.defaultPreferredLanguages = exports.languageCodeURIBase = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var debug = _interopRequireWildcard(require("../../../debug"));

var _index = require("../../../authn/index");

var ns = _interopRequireWildcard(require("../../../ns"));

var _logic = require("../../../logic");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
var defaultPreferredLanguages = ['en', 'fr', 'de', 'it', 'ar'];
exports.defaultPreferredLanguages = defaultPreferredLanguages;

function addDefaults(array) {
  if (!array) array = [];
  return array.concat(defaultPreferredLanguages.filter(function (code) {
    return !array.includes(code);
  }));
}

function getPreferredLanguagesFor(_x) {
  return _getPreferredLanguagesFor.apply(this, arguments);
}
/* Get the preferred langauges for the user
 *
 *  Either from solid preferences or browser preferences or default
 */


function _getPreferredLanguagesFor() {
  _getPreferredLanguagesFor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(person) {
    var doc, list, languageCodeArray;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            doc = person.doc();
            _context.next = 3;
            return _logic.kb.fetcher.load(doc);

          case 3:
            list = _logic.kb.any(person, ns.schema('knowsLanguage'), null, doc);

            if (list) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", defaultPreferredLanguages);

          case 6:
            languageCodeArray = [];
            list.elements.forEach(function (item) {
              // console.log('@@ item ' + item)
              var lang = _logic.kb.any(item, ns.solid('publicId'), null, doc);

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
            return _context.abrupt("return", addDefaults(languageCodeArray));

          case 11:
            return _context.abrupt("return", null);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getPreferredLanguagesFor.apply(this, arguments);
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
            return getPreferredLanguagesFor(me);

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

            return _context2.abrupt("return", addDefaults(navigator.languages.map(function (longForm) {
              return longForm.split('-')[0];
            })));

          case 12:
            if (!navigator.language) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", addDefaults([navigator.language.split('-')[0]]));

          case 14:
            return _context2.abrupt("return", defaultPreferredLanguages);

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
  var languagePrefs2 = languagePrefs || defaultPreferredLanguages;
  languagePrefs2.reverse(); // Preferred last

  var slimmed = []; // console.log(` @@ {languagePrefs2 ${languagePrefs2}`)

  for (var u in uris) {
    // needs hasOwnProperty ?
    var _bindings = uris[u];

    var sortMe = _bindings.map(function (binding) {
      var lang = binding.name['xml:lang'];
      var index = languagePrefs2.indexOf(lang);
      var pair = [index, binding]; // console.log(`   @@ lang: ${lang}, index: ${index}`)

      return pair;
    });

    sortMe.sort(); // best at th ebottom

    sortMe.reverse(); // best at the top
    // console.debug('@@ sortMe:', sortMe)

    slimmed.push(sortMe[0][1]);
  } // map u


  debug.log(" Filter by language: ".concat(bindings.length, " -> ").concat(slimmed.length));
  return slimmed;
}
//# sourceMappingURL=language.js.map