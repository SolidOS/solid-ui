"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sentimentStrip = sentimentStrip;
exports.sentimentStripLinked = sentimentStripLinked;
exports.messageToolbar = messageToolbar;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

/**
 * Tools for doing things with a message
 * Let us be creative here.  Allow all sorts of things to
 * be done to a message - linking to new or old objects in an open way
 *
 * Ideas: Bookmark, Like, star, pin at top of chat, reply as new thread,
 * If you made it originally: edit, delete, attach
 * @packageDocumentation
 */

/* global $rdf */
var UI = {
  authn: require('../authn/authn'),
  icons: require('../iconBase'),
  ns: require('../ns'),
  media: require('../media/media-capture'),
  pad: require('../pad'),
  rdf: require('rdflib'),
  store: require('../logic').solidLogicSingleton.store,
  style: require('../style'),
  utils: require('../utils'),
  widgets: require('../widgets')
};

var bookmarks = require('./bookmarks');

var dom = window.document;
var kb = UI.store;
var ns = UI.ns; // const label = UI.utils.label
// THE UNUSED ICONS are here as reminders for possible future functionality
// const BOOKMARK_ICON = 'noun_45961.svg'
// const HEART_ICON = 'noun_130259.svg' -> Add this to my (private) favorites
// const MENU_ICON = 'noun_897914.svg'
// const PAPERCLIP_ICON = 'noun_25830.svg' -> add attachments to this message
// const PIN_ICON = 'noun_562340.svg'  -> pin this message permanently in the chat UI
// const PENCIL_ICON = 'noun_253504.svg'
// const SPANNER_ICON = 'noun_344563.svg' -> settings

var THUMBS_UP_ICON = 'noun_1384132.svg';
var THUMBS_DOWN_ICON = 'noun_1384135.svg'; // module.export = { messageTools, sentimentStripLinked, sentimentStrip }
// @@@@ use the one in rdflib.js when it is avaiable and delete this

function updatePromise(del, ins) {
  return new Promise(function (resolve, reject) {
    kb.updater.update(del, ins, function (uri, ok, errorBody) {
      if (!ok) {
        reject(new Error(errorBody));
      } else {
        resolve();
      }
    }); // callback
  }); // promise
}
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
  var actions = kb.each(null, ns.schema('target'), target, doc);
  var sentiments = actions.map(function (a) {
    return kb.any(a, ns.rdf('type'), null, doc);
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
    var actions = kb.each(null, ns.schema('target'), target, doc);
    var sentiments = actions.map(function (a) {
      return [kb.any(a, ns.rdf('type'), null, doc), kb.any(a, ns.schema('agent'), null, doc)];
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


function messageToolbar(message, messageRow, userContext) {
  var div = dom.createElement('div');

  function closeToolbar() {
    div.parentElement.parentElement.removeChild(div.parentElement); // remive the TR
  }

  function deleteThingThen(_x) {
    return _deleteThingThen.apply(this, arguments);
  } // Things only the original author can do


  function _deleteThingThen() {
    _deleteThingThen = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(x) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return updatePromise(kb.connectedStatements(x), []);

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _deleteThingThen.apply(this, arguments);
  }

  var me = UI.authn.currentUser(); // If already logged on

  if (me && kb.holds(message, ns.foaf('maker'), me)) {
    // button to delete the message
    var deleteButton = UI.widgets.deleteButtonWithCheck(dom, div, 'message', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return kb.updater.update(kb.connectedStatements[message], []);

            case 2:
              closeToolbar();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    div.appendChild(deleteButton);
  } // if mine
  // Things anyone can do if they have a bookmark list async

  /*
  var bookmarkButton = await bookmarks.renderBookmarksButton(userContext)
  if (bookmarkButton) {
   div.appendChild(bookmarkButton)
  }
  */
  // Things anyone can do if they have a bookmark list


  bookmarks.renderBookmarksButton(userContext).then(function (bookmarkButton) {
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

    var button = UI.widgets.button(dom, icon, UI.utils.label(actionClass), /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_event) {
        var insertMe, dirty, i, a;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!action) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 3;
                return deleteThingThen(action);

              case 3:
                action = null;
                setColor();
                _context2.next = 25;
                break;

              case 7:
                // no action
                action = UI.widgets.newThing(doc);
                insertMe = [$rdf.st(action, ns.schema('agent'), context.me, doc), $rdf.st(action, ns.rdf('type'), actionClass, doc), $rdf.st(action, ns.schema('target'), target, doc)];
                _context2.next = 11;
                return updatePromise([], insertMe);

              case 11:
                setColor();

                if (!mutuallyExclusive) {
                  _context2.next = 25;
                  break;
                }

                // Delete incompative sentiments
                dirty = false;
                i = 0;

              case 15:
                if (!(i < mutuallyExclusive.length)) {
                  _context2.next = 24;
                  break;
                }

                a = existingAction(mutuallyExclusive[i]);

                if (!a) {
                  _context2.next = 21;
                  break;
                }

                _context2.next = 20;
                return deleteThingThen(a);

              case 20:
                // but how refresh? refreshTree the parent?
                dirty = true;

              case 21:
                i++;
                _context2.next = 15;
                break;

              case 24:
                if (dirty) {
                  // UI.widgets.refreshTree(button.parentNode) // requires them all to be immediate siblings
                  UI.widgets.refreshTree(messageRow); // requires them all to be immediate siblings
                }

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    function existingAction(actionClass) {
      var actions = kb.each(null, ns.schema('agent'), context.me, doc).filter(function (x) {
        return kb.holds(x, ns.rdf('type'), actionClass, doc);
      }).filter(function (x) {
        return kb.holds(x, ns.schema('target'), target, doc);
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
  } // THUMBS_UP_ICON
  // https://schema.org/AgreeAction


  me = UI.authn.currentUser(); // If already logged on

  if (me) {
    // Things you mnust be logged in for
    var context1 = {
      me: me,
      dom: dom,
      div: div
    };
    div.appendChild(sentimentButton(context1, message, // @@ TODO use UI.widgets.sentimentButton
    UI.icons.iconBase + THUMBS_UP_ICON, ns.schema('AgreeAction'), message.doc(), [ns.schema('DisagreeAction')])); // Thumbs down

    div.appendChild(sentimentButton(context1, message, UI.icons.iconBase + THUMBS_DOWN_ICON, ns.schema('DisagreeAction'), message.doc(), [ns.schema('AgreeAction')]));
  } // X button to remove the tool UI itself


  var cancelButton = div.appendChild(UI.widgets.cancelButton(dom));
  cancelButton.style["float"] = 'right';
  cancelButton.firstChild.style.opacity = '0.3';
  cancelButton.addEventListener('click', closeToolbar);
  return div;
}
//# sourceMappingURL=messageTools.js.map