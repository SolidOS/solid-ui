"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageToolbar = messageToolbar;
exports.sentimentStrip = sentimentStrip;
exports.sentimentStripLinked = sentimentStripLinked;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var debug = _interopRequireWildcard(require("../debug"));
var _iconBase = require("../iconBase");
var ns = _interopRequireWildcard(require("../ns"));
var rdf = _interopRequireWildcard(require("rdflib"));
var utils = _interopRequireWildcard(require("../utils"));
var widgets = _interopRequireWildcard(require("../widgets"));
var _bookmarks = require("./bookmarks");
var _solidLogic = require("solid-logic");
var _chatLogic = require("./chatLogic");
var _message = require("./message");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Tools for doing things with a message
 * Let us be creative here.  Allow all sorts of things to
 * be done to a message - linking to new or old objects in an open way
 *
 * Ideas: Bookmark, Like, star, pin at top of chat, reply as new thread,
 * If you made it originally: edit, delete, attach
 * @packageDocumentation
 */

// import { media } from '../media/index'

// import * as pad from '../pad'
// pull in first avoid cross-refs
// import * as style from '../style'

var dom = window.document;

// THE UNUSED ICONS are here as reminders for possible future functionality
// const BOOKMARK_ICON = 'noun_45961.svg'
// const HEART_ICON = 'noun_130259.svg' -> Add this to my (private) favorites
// const MENU_ICON = 'noun_897914.svg'
// const PAPERCLIP_ICON = 'noun_25830.svg' -> add attachments to this message
// const PIN_ICON = 'noun_562340.svg'  -> pin this message permanently in the chat UI
var PENCIL_ICON = 'noun_253504.svg'; // edit a message
// const SPANNER_ICON = 'noun_344563.svg' -> settings
var THUMBS_UP_ICON = 'noun_1384132.svg';
var THUMBS_DOWN_ICON = 'noun_1384135.svg';
/**
 * Emoji in Unicode
 */
var emoji = {};
emoji[ns.schema('AgreeAction')] = '👍';
emoji[ns.schema('DisagreeAction')] = '👎';
emoji[ns.schema('EndorseAction')] = '⭐️';
emoji[ns.schema('LikeAction')] = '❤️';

/**
 * Create strip of sentiments expressed
 */
function sentimentStrip(target, doc) {
  // alain seems not used
  var latest = (0, _chatLogic.mostRecentVersion)(target);
  var actions = _solidLogic.store.holds(latest, ns.schema('dateDeleted').value, null, latest.doc()) ? _solidLogic.store.each(null, ns.schema('target'), target, doc) : [];
  var sentiments = actions.map(function (a) {
    return _solidLogic.store.any(a, ns.rdf('type'), null, doc);
  });
  sentiments.sort();
  var strings = sentiments.map(function (x) {
    return emoji[x] || '';
  });
  return dom.createTextNode(strings.join(' '));
}
/**
 * Create strip of sentiments expressed, with hyperlinks
 *
 * @param target {NamedNode} - The thing about which they are expressed
 * @param doc {NamedNode} - The document in which they are expressed
 */
function sentimentStripLinked(target, doc) {
  var strip = dom.createElement('span');
  function refresh() {
    strip.innerHTML = '';
    var actions = (0, _chatLogic.mostRecentVersion)(target).uri !== ns.schema('dateDeleted').uri ? _solidLogic.store.each(null, ns.schema('target'), target, doc) : [];
    var sentiments = actions.map(function (a) {
      return [_solidLogic.store.any(a, ns.rdf('type'), null, doc), _solidLogic.store.any(a, ns.schema('agent'), null, doc)];
    });
    sentiments.sort();
    sentiments.forEach(function (ss) {
      var _ss = (0, _slicedToArray2["default"])(ss, 2),
        theClass = _ss[0],
        agent = _ss[1];
      var res;
      if (agent) {
        res = dom.createElement('a');
        res.setAttribute('href', agent.uri);
      } else {
        res = dom.createTextNode('');
      }
      res.textContent = emoji[theClass] || '*';
      strip.appendChild(res);
    });
  }
  refresh();
  strip.refresh = refresh;
  return strip;
}
/**
 * Creates a message toolbar component
 */
function messageToolbar(message, messageRow, userContext, channelObject) {
  function deleteMessage() {
    return _deleteMessage.apply(this, arguments);
  }
  function _deleteMessage() {
    _deleteMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var author, msg, area;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              author = _solidLogic.store.any(message, ns.foaf('maker'));
              if (me) {
                _context2.next = 5;
                break;
              }
              alert('You can\'t delete the message, you are not logged in.');
              _context2.next = 22;
              break;
            case 5:
              if (!me.sameTerm(author)) {
                _context2.next = 21;
                break;
              }
              _context2.prev = 6;
              _context2.next = 9;
              return channelObject.deleteMessage(message);
            case 9:
              _context2.next = 18;
              break;
            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](6);
              msg = 'Error deleting messaage ' + _context2.t0;
              debug.warn(msg);
              alert(msg);
              area = userContext.statusArea || messageRow.parentNode;
              area.appendChild(widgets.errorMessageBlock(dom, msg));
            case 18:
              messageRow.parentNode.removeChild(messageRow);
              _context2.next = 22;
              break;
            case 21:
              alert('You can\'t delete the message, you are not logged in as the author, ' + author);
            case 22:
              closeToolbar();
            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[6, 11]]);
    }));
    return _deleteMessage.apply(this, arguments);
  }
  function editMessage(_x) {
    return _editMessage.apply(this, arguments);
  } // alain TODO allow chat owner to fully delete message + sentiments and replacing messages
  function _editMessage() {
    _editMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(messageRow) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (me.value === _solidLogic.store.any(message, ns.foaf('maker')).value) {
                closeToolbar(); // edit is a one-off action
                (0, _message.switchToEditor)(messageRow, message, channelObject, userContext);
              }
            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _editMessage.apply(this, arguments);
  }
  var div = dom.createElement('div');
  // is message deleted ?
  if ((0, _chatLogic.mostRecentVersion)(message).value === ns.schema('dateDeleted').value) return div;
  function closeToolbar() {
    div.parentElement.parentElement.removeChild(div.parentElement); // remive the TR
  }
  function deleteThingThen(_x2) {
    return _deleteThingThen.apply(this, arguments);
  } // Things only the original author can do
  function _deleteThingThen() {
    _deleteThingThen = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(x) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _solidLogic.store.updater.update(_solidLogic.store.connectedStatements(x), []);
            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _deleteThingThen.apply(this, arguments);
  }
  var me = _solidLogic.authn.currentUser(); // If already logged on
  if (me && _solidLogic.store.holds(message, ns.foaf('maker'), me)) {
    // button to delete the message
    div.appendChild(widgets.deleteButtonWithCheck(dom, div, 'message', deleteMessage));
    // button to edit the message
    div.appendChild(widgets.button(dom, _iconBase.icons.iconBase + PENCIL_ICON, 'edit', function () {
      return editMessage(messageRow);
    }));
  } // if mine
  // Things anyone can do if they have a bookmark list async
  /*
  var bookmarkButton = await bookmarks.renderBookmarksButton(userContext)
  if (bookmarkButton) {
   div.appendChild(bookmarkButton)
  }
  */
  // Things anyone can do if they have a bookmark list

  (0, _bookmarks.renderBookmarksButton)(userContext).then(function (bookmarkButton) {
    if (bookmarkButton) div.appendChild(bookmarkButton);
  });

  /**   Button to allow user to express a sentiment (like, endorse, etc) about a target
   *
   * @param context {Object} - Provide dom and me
   * @param target {NamedNode} - The thing the user expresses an opnion about
   * @param icon {uristring} - The icon to be used for the button
   * @param actionClass {NamedNode} - The RDF class  - typically a subclass of schema:Action
   * @param doc - {NamedNode} - the Solid document iunto which the data should be written
   * @param mutuallyExclusive {Array<NamedNode>} - Any RDF classes of sentimentswhich are mutiually exclusive
   */
  function sentimentButton(context, target, icon, actionClass, doc, mutuallyExclusive) {
    function setColor() {
      button.style.backgroundColor = action ? 'yellow' : 'white';
    }
    var button = widgets.button(dom, icon, utils.label(actionClass), /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_event) {
        var insertMe, dirty, i, a;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!action) {
                  _context.next = 7;
                  break;
                }
                _context.next = 3;
                return deleteThingThen(action);
              case 3:
                action = null;
                setColor();
                _context.next = 25;
                break;
              case 7:
                // no action
                action = widgets.newThing(doc);
                insertMe = [rdf.st(action, ns.schema('agent'), context.me, doc), rdf.st(action, ns.rdf('type'), actionClass, doc), rdf.st(action, ns.schema('target'), target, doc)];
                _context.next = 11;
                return _solidLogic.store.updater.update([], insertMe);
              case 11:
                setColor();
                if (!mutuallyExclusive) {
                  _context.next = 25;
                  break;
                }
                // Delete incompative sentiments
                dirty = false;
                i = 0;
              case 15:
                if (!(i < mutuallyExclusive.length)) {
                  _context.next = 24;
                  break;
                }
                a = existingAction(mutuallyExclusive[i]);
                if (!a) {
                  _context.next = 21;
                  break;
                }
                _context.next = 20;
                return deleteThingThen(a);
              case 20:
                // but how refresh? refreshTree the parent?
                dirty = true;
              case 21:
                i++;
                _context.next = 15;
                break;
              case 24:
                if (dirty) {
                  // widgets.refreshTree(button.parentNode) // requires them all to be immediate siblings
                  widgets.refreshTree(messageRow); // requires them all to be immediate siblings
                }
              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function (_x3) {
        return _ref.apply(this, arguments);
      };
    }());
    function existingAction(actionClass) {
      var actions = _solidLogic.store.each(null, ns.schema('agent'), context.me, doc).filter(function (x) {
        return _solidLogic.store.holds(x, ns.rdf('type'), actionClass, doc);
      }).filter(function (x) {
        return _solidLogic.store.holds(x, ns.schema('target'), target, doc);
      });
      return actions.length ? actions[0] : null;
    }
    function refresh() {
      action = existingAction(actionClass);
      setColor();
    }
    var action;
    button.refresh = refresh; // If the file changes, refresh live
    refresh();
    return button;
  }

  // THUMBS_UP_ICON
  // https://schema.org/AgreeAction
  me = _solidLogic.authn.currentUser(); // If already logged on
  // debug.log('Actions 3' + mostRecentVersion(message).value + ' ' + ns.schema('dateDeleted').value + ' ' + (mostRecentVersion(message).value !== ns.schema('dateDeleted').value))

  if (me && (0, _chatLogic.mostRecentVersion)(message).value !== ns.schema('dateDeleted').value) {
    var context1 = {
      me: me,
      dom: dom,
      div: div
    };
    div.appendChild(sentimentButton(context1, message,
    // @@ TODO use widgets.sentimentButton
    _iconBase.icons.iconBase + THUMBS_UP_ICON, ns.schema('AgreeAction'), message.doc(), [ns.schema('DisagreeAction')]));
    // Thumbs down
    div.appendChild(sentimentButton(context1, message, _iconBase.icons.iconBase + THUMBS_DOWN_ICON, ns.schema('DisagreeAction'), message.doc(), [ns.schema('AgreeAction')]));
  }
  // X button to remove the tool UI itself
  var cancelButton = div.appendChild(widgets.cancelButton(dom));
  cancelButton.style["float"] = 'right';
  cancelButton.firstChild.style.opacity = '0.3';
  cancelButton.addEventListener('click', closeToolbar);
  return div;
}
//# sourceMappingURL=messageTools.js.map