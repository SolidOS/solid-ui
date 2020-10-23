"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPartipants = renderPartipants;
exports.participationObject = participationObject;
exports.recordParticipation = recordParticipation;
exports.manageParticipation = manageParticipation;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _store = _interopRequireDefault(require("./store"));

var _authn = require("./authn/authn");

var _rdflib = require("rdflib");

var _ns = _interopRequireDefault(require("./ns"));

var _widgets = require("./widgets");

var _utils = require("./utils");

var _pad = require("./pad");

var _debug = require("./debug");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

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

  return ParticipationTableElement;
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(HTMLTableElement));

var kb = _store["default"];
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
    var person = kb.any(parp, _ns["default"].wf('participant'));
    var tr;

    if (!person) {
      tr = dom.createElement('tr');
      tr.textContent = '???'; // Don't crash - invalid part'n entry

      return tr;
    }

    var bg = kb.anyValue(parp, _ns["default"].ui('backgroundColor')) || 'white';
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
    var parps = kb.each(subject, _ns["default"].wf('participation')).map(function (parp) {
      (0, _debug.log)('in participants');
      return [kb.anyValue(parp, _ns["default"].cal('dtstart')) || '9999-12-31', parp];
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
      throw new Error('Not user id');
    }

    var parps = kb.each(subject, _ns["default"].wf('participation')).filter(function (pn) {
      return kb.holds(pn, _ns["default"].wf('participant'), me);
    });

    if (parps.length > 1) {
      throw new Error('Multiple records of your participation');
    }

    if (parps.length) {
      // If I am not already recorded
      resolve(parps[0]); // returns the particpation object
    } else {
      var participation = (0, _widgets.newThing)(padDoc);
      var ins = [(0, _rdflib.st)(subject, _ns["default"].wf('participation'), participation, padDoc), (0, _rdflib.st)(participation, _ns["default"].wf('participant'), me, padDoc), (0, _rdflib.st)(participation, _ns["default"].cal('dtstart'), new Date(), padDoc), (0, _rdflib.st)(participation, _ns["default"].ui('backgroundColor'), (0, _pad.lightColorHash)(me), padDoc)];
      kb.updater.update([], ins, function (uri, ok, errorMessage) {
        if (!ok) {
          reject(new Error('Error recording your partipation: ' + errorMessage));
        } else {
          resolve(participation);
        }
      });
      resolve(participation);
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

  var parps = kb.each(subject, _ns["default"].wf('participation')).filter(function (pn) {
    return kb.holds(pn, _ns["default"].wf('participant'), me);
  });

  if (parps.length > 1) {
    throw new Error('Multiple records of your participation');
  }

  if (parps.length) {
    // If I am not already recorded
    return parps[0]; // returns the particpation object
  } else {
    var participation = (0, _widgets.newThing)(padDoc);
    var ins = [(0, _rdflib.st)(subject, _ns["default"].wf('participation'), participation, padDoc), (0, _rdflib.st)(participation, _ns["default"].wf('participant'), me, padDoc), (0, _rdflib.st)(participation, _ns["default"].cal('dtstart'), new Date(), padDoc), (0, _rdflib.st)(participation, _ns["default"].ui('backgroundColor'), (0, _pad.lightColorHash)(me), padDoc)];
    kb.updater.update([], ins, function (uri, ok, errorMessage) {
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

  try {
    recordParticipation(subject, padDoc, table);
  } catch (e) {
    container.appendChild((0, _widgets.errorMessageBlock)(dom, 'Error recording your partipation: ' + e)); // Clean up?
  }

  return table;
}
//# sourceMappingURL=participation.js.map