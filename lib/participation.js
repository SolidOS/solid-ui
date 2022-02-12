"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.manageParticipation = manageParticipation;
exports.participationObject = participationObject;
exports.recordParticipation = recordParticipation;
exports.renderPartipants = renderPartipants;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var debug = _interopRequireWildcard(require("./debug"));

var _authn = require("./authn/authn");

var _rdflib = require("rdflib");

var ns = _interopRequireWildcard(require("./ns"));

var _widgets = require("./widgets");

var _utils = require("./utils");

var _pad = require("./pad");

var _logic = require("./logic");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ParticipationTableElement = /*#__PURE__*/function (_HTMLTableElement) {
  (0, _inherits2["default"])(ParticipationTableElement, _HTMLTableElement);

  var _super = _createSuper(ParticipationTableElement);

  function ParticipationTableElement() {
    var _this;

    (0, _classCallCheck2["default"])(this, ParticipationTableElement);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "refresh", void 0);
    return _this;
  }

  return (0, _createClass2["default"])(ParticipationTableElement);
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(HTMLTableElement));

var store = _logic.solidLogicSingleton.store;
/**  Manage participation in this session
*
*  @param {Document} dom - the web page loaded into the browser
*  @param {HTMLTableElement} table - the table element
*  @param {NamedNode} unused1/document - the document to render (this argument is no longer used, but left in for backwards compatibility)
*  @param {NamedNode} subject - the thing in which the participation is happening
*  @param {NamedNode} unused2/me - user that is logged into the pod (this argument is no longer used, but left in for backwards compatibility)
*  @param {ParticipationOptions} options - the options that can be passed in are deleteFunction, link, and draggable these are used by the personTR button
*/

function renderPartipants(dom, table, unused1, subject, unused2, options) {
  table.setAttribute('style', 'margin: 0.8em;');

  var newRowForParticpation = function newRowForParticpation(parp) {
    var person = store.any(parp, ns.wf('participant'));
    var tr;

    if (!person) {
      tr = dom.createElement('tr');
      tr.textContent = '???'; // Don't crash - invalid part'n entry

      return tr;
    }

    var bg = store.anyValue(parp, ns.ui('backgroundColor')) || 'white';
    var block = dom.createElement('div');
    block.setAttribute('style', 'height: 1.5em; width: 1.5em; margin: 0.3em; border 0.01em solid #888; background-color: ' + bg);
    tr = (0, _widgets.personTR)(dom, null, person, options);
    table.appendChild(tr);
    var td = dom.createElement('td');
    td.setAttribute('style', 'vertical-align: middle;');
    td.appendChild(block);
    tr.insertBefore(td, tr.firstChild);
    return tr;
  };

  var syncTable = function syncTable() {
    var parps = store.each(subject, ns.wf('participation')).map(function (parp) {
      (0, debug.log)('in participants');
      return [store.anyValue(parp, ns.cal('dtstart')) || '9999-12-31', parp];
    });
    parps.sort(); // List in order of joining

    var participations = parps.map(function (p) {
      return p[1];
    });
    (0, _utils.syncTableToArray)(table, participations, newRowForParticpation);
  };

  table.refresh = syncTable;
  syncTable();
  return table;
}
/** Record, or find old, Particpation object
 *
 * A particpaption object is a place to record things specifically about
 * subject and the user, such as preferences, start of membership, etc
 * @param {NamedNode} subject - the thing in which the participation is happening
 * @param {NamedNode} document -  where to record the data
 * @param {NamedNode} me - the logged in user
 *
 */


function participationObject(subject, padDoc, me) {
  return new Promise(function (resolve, reject) {
    if (!me) {
      throw new Error('No user id');
    }

    var parps = store.each(subject, ns.wf('participation')).filter(function (pn) {
      return store.holds(pn, ns.wf('participant'), me);
    });

    if (parps.length > 1) {
      // This can happen. https://github.com/solid/chat-pane/issues/71
      var candidates = [];

      var _iterator = _createForOfIteratorHelper(parps),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var participation = _step.value;
          var date = store.anyValue(participation, ns.cal('dtstart'));

          if (date) {
            candidates.push([date, participation]);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      candidates.sort(); // Pick the earliest
      // @@ Possibly, for extra credit, delete the others, if we have write access

      debug.warn('Multiple particpation objects, picking earliest, in ' + padDoc);
      resolve(candidates[0][1]); // throw new Error('Multiple records of your participation')
    }

    if (parps.length) {
      // If I am not already recorded
      resolve(parps[0]); // returns the particpation object
    } else {
      var _participation2 = (0, _widgets.newThing)(padDoc);

      var ins = [(0, _rdflib.st)(subject, ns.wf('participation'), _participation2, padDoc), (0, _rdflib.st)(_participation2, ns.wf('participant'), me, padDoc), (0, _rdflib.st)(_participation2, ns.cal('dtstart'), new Date(), padDoc), (0, _rdflib.st)(_participation2, ns.ui('backgroundColor'), (0, _pad.lightColorHash)(me), padDoc)];
      store.updater.update([], ins, function (uri, ok, errorMessage) {
        if (!ok) {
          reject(new Error('Error recording your partipation: ' + errorMessage));
        } else {
          resolve(_participation2);
        }
      });
      resolve(_participation2);
    }
  });
}
/** Record my participation and display participants
 *
 * @param {NamedNode} subject - the thing in which participation is happening
 * @param {NamedNode} padDoc - the document into which the particpation should be recorded
 * @param {DOMNode} refreshable - a DOM element whose refresh() is to be called if the change works
 *
 */


function recordParticipation(subject, padDoc, refreshable) {
  var me = (0, _authn.currentUser)();
  if (!me) return; // Not logged in

  var parps = store.each(subject, ns.wf('participation')).filter(function (pn) {
    return store.holds(pn, ns.wf('participant'), me);
  });

  if (parps.length > 1) {
    throw new Error('Multiple records of your participation');
  }

  if (parps.length) {
    // If I am not already recorded
    return parps[0]; // returns the particpation object
  } else {
    if (!store.updater.editable(padDoc)) {
      debug.log('Not recording participation, as no write acesss as ' + me + ' to ' + padDoc);
      return null;
    }

    var participation = (0, _widgets.newThing)(padDoc);
    var ins = [(0, _rdflib.st)(subject, ns.wf('participation'), participation, padDoc), (0, _rdflib.st)(participation, ns.wf('participant'), me, padDoc), (0, _rdflib.st)(participation, ns.cal('dtstart'), new Date(), padDoc), (0, _rdflib.st)(participation, ns.ui('backgroundColor'), (0, _pad.lightColorHash)(me), padDoc)];
    store.updater.update([], ins, function (uri, ok, errorMessage) {
      if (!ok) {
        throw new Error('Error recording your partipation: ' + errorMessage);
      }

      if (refreshable && refreshable.refresh) {
        refreshable.refresh();
      } // UI.pad.renderPartipants(dom, table, padDoc, subject, me, options)

    });
    return participation;
  }
}
/**  Record my participation and display participants
*
*   @param {Document} dom  - the web page loaded into the browser
*   @param {HTMLDivElement} container - the container element where the participants should be displayed
*   @param {NamedNode} document - the document into which the particpation should be shown
*   @param {NamedNode} subject - the thing in which participation is happening
*   @param {NamedNode} me - the logged in user
*   @param {ParticipationOptions} options - the options that can be passed in are deleteFunction, link, and draggable these are used by the personTR button
*
*/


function manageParticipation(dom, container, padDoc, subject, me, options) {
  var table = dom.createElement('table');
  container.appendChild(table);
  renderPartipants(dom, table, padDoc, subject, me, options);

  var _participation;

  try {
    _participation = recordParticipation(subject, padDoc, table);
  } catch (e) {
    container.appendChild((0, _widgets.errorMessageBlock)(dom, 'Error recording your partipation: ' + e)); // Clean up?
  }

  return table;
}
//# sourceMappingURL=participation.js.map