"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.manageParticipation = manageParticipation;
exports.participationObject = participationObject;
exports.recordParticipation = recordParticipation;
exports.renderParticipants = renderParticipants;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _debug = _interopRequireWildcard(require("./debug"));
var debug = _debug;
var _rdflib = require("rdflib");
var ns = _interopRequireWildcard(require("./ns"));
var _widgets = require("./widgets");
var _utils = require("./utils");
var _pad = require("./pad");
var style = _interopRequireWildcard(require("./style"));
var _styleConstants = _interopRequireDefault(require("./styleConstants"));
var _solidLogic = require("solid-logic");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* Manage a UI for the participation of a person in any thing
*/ // import { currentUser } from './authn/authn'
var ParticipationTableElement = /*#__PURE__*/function (_HTMLTableElement) {
  function ParticipationTableElement() {
    var _this;
    (0, _classCallCheck2["default"])(this, ParticipationTableElement);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, ParticipationTableElement, [].concat(args));
    (0, _defineProperty2["default"])(_this, "refresh", void 0);
    return _this;
  }
  (0, _inherits2["default"])(ParticipationTableElement, _HTMLTableElement);
  return (0, _createClass2["default"])(ParticipationTableElement);
}(/*#__PURE__*/(0, _wrapNativeSuper2["default"])(HTMLTableElement));
var store = _solidLogic.solidLogicSingleton.store;

/**  Manage participation in this session
*
*  @param {Document} dom - the web page loaded into the browser
*  @param {HTMLTableElement} table - the table element
*  @param {NamedNode} unused1/document - the document to render (this argument is no longer used, but left in for backwards compatibility)
*  @param {NamedNode} subject - the thing in which the participation is happening
*  @param {NamedNode} unused2/me - user that is logged into the pod (this argument is no longer used, but left in for backwards compatibility)
*  @param {ParticipationOptions} options - the options that can be passed in are deleteFunction, link, and draggable; these are used by the personTR button
*/
function renderParticipants(dom, table, unused1, subject, unused2, options) {
  table.setAttribute('style', style.participantsStyle);
  var newRowForParticipation = function newRowForParticipation(parp) {
    var person = store.any(parp, ns.wf('participant'));
    var tr;
    if (!person) {
      tr = dom.createElement('tr');
      tr.textContent = '???'; // Don't crash - invalid part'n entry
      return tr;
    }
    var bg = store.anyValue(parp, ns.ui('backgroundColor')) || _styleConstants["default"].participationDefaultBackground;
    var block = dom.createElement('div');
    block.setAttribute('style', style.participantsBlock);
    block.style.backgroundColor = bg;
    tr = (0, _widgets.personTR)(dom, null, person, options);
    table.appendChild(tr);
    var td = dom.createElement('td');
    td.setAttribute('style', style.personTableTD);
    td.appendChild(block);
    tr.insertBefore(td, tr.firstChild);
    return tr;
  };
  var syncTable = function syncTable() {
    var parps = store.each(subject, ns.wf('participation')).map(function (parp) {
      (0, _debug.log)('in participants');
      return [store.anyValue(parp, ns.cal('dtstart')) || '9999-12-31', parp];
    });
    parps.sort(); // List in order of joining
    var participations = parps.map(function (p) {
      return p[1];
    });
    (0, _utils.syncTableToArray)(table, participations, newRowForParticipation);
  };
  table.refresh = syncTable;
  syncTable();
  return table;
}

/** Record, or find old, Participation object
 *
 * A participation object is a place to record things specifically about
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
      // This can happen. https://github.com/solidos/chat-pane/issues/71
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
      debug.warn('Multiple participation objects, picking earliest, in ' + padDoc);
      resolve(candidates[0][1]);
      // throw new Error('Multiple records of your participation')
    }
    if (parps.length) {
      // If I am not already recorded
      resolve(parps[0]); // returns the participation object
    } else {
      var _participation2 = (0, _widgets.newThing)(padDoc);
      var ins = [(0, _rdflib.st)(subject, ns.wf('participation'), _participation2, padDoc), (0, _rdflib.st)(_participation2, ns.wf('participant'), me, padDoc), (0, _rdflib.st)(_participation2, ns.cal('dtstart'), new Date(), padDoc), (0, _rdflib.st)(_participation2, ns.ui('backgroundColor'), (0, _pad.lightColorHash)(me), padDoc)];
      store.updater.update([], ins, function (uri, ok, errorMessage) {
        if (!ok) {
          reject(new Error('Error recording your participation: ' + errorMessage));
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
 * @param {NamedNode} padDoc - the document into which the participation should be recorded
 * @param {DOMNode} refreshable - a DOM element whose refresh() is to be called if the change works
 *
 */
function recordParticipation(subject, padDoc, refreshable) {
  var me = _solidLogic.authn.currentUser();
  if (!me) return; // Not logged in

  var parps = store.each(subject, ns.wf('participation')).filter(function (pn) {
    return store.holds(pn, ns.wf('participant'), me);
  });
  if (parps.length > 1) {
    throw new Error('Multiple records of your participation');
  }
  if (parps.length) {
    // If I am not already recorded
    return parps[0]; // returns the participation object
  } else {
    if (!store.updater.editable(padDoc)) {
      debug.log('Not recording participation, as no write access as ' + me + ' to ' + padDoc);
      return null;
    }
    var participation = (0, _widgets.newThing)(padDoc);
    var ins = [(0, _rdflib.st)(subject, ns.wf('participation'), participation, padDoc), (0, _rdflib.st)(participation, ns.wf('participant'), me, padDoc), (0, _rdflib.st)(participation, ns.cal('dtstart'), new Date(), padDoc), (0, _rdflib.st)(participation, ns.ui('backgroundColor'), (0, _pad.lightColorHash)(me), padDoc)];
    store.updater.update([], ins, function (uri, ok, errorMessage) {
      if (!ok) {
        throw new Error('Error recording your participation: ' + errorMessage);
      }
      if (refreshable && refreshable.refresh) {
        refreshable.refresh();
      }
    });
    return participation;
  }
}

/**  Record my participation and display participants
*
*   @param {Document} dom  - the web page loaded into the browser
*   @param {HTMLDivElement} container - the container element where the participants should be displayed
*   @param {NamedNode} document - the document into which the participation should be shown
*   @param {NamedNode} subject - the thing in which participation is happening
*   @param {NamedNode} me - the logged in user
*   @param {ParticipationOptions} options - the options that can be passed in are deleteFunction, link, and draggable; these are used by the personTR button
*
*/
function manageParticipation(dom, container, padDoc, subject, me, options) {
  var table = dom.createElement('table');
  container.appendChild(table);
  renderParticipants(dom, table, padDoc, subject, me, options);
  var _participation;
  try {
    _participation = recordParticipation(subject, padDoc, table);
  } catch (e) {
    container.appendChild((0, _widgets.errorMessageBlock)(dom, 'Error recording your participation: ' + e)); // Clean up?
  }
  return table;
}
//# sourceMappingURL=participation.js.map