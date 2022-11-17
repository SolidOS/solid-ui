"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AJARImage = AJARImage;
exports.RDFComparePredicateObject = RDFComparePredicateObject;
exports.RDFComparePredicateSubject = RDFComparePredicateSubject;
exports.addLoadEvent = addLoadEvent;
exports.ancestor = ancestor;
exports.beep = beep;
exports.clearVariableNames = clearVariableNames;
exports.emptyNode = emptyNode;
exports.escapeForXML = escapeForXML;
exports.findPos = findPos;
exports.genUuid = genUuid;
exports.getAbout = getAbout;
exports.getEyeFocus = getEyeFocus;
exports.getTarget = getTarget;
exports.getTerm = getTerm;
exports.hashColor = hashColor;
exports.include = include;
Object.defineProperty(exports, "label", {
  enumerable: true,
  get: function get() {
    return _label.label;
  }
});
exports.labelForXML = labelForXML;
exports.labelWithOntology = labelWithOntology;
exports.newVariableName = newVariableName;
exports.ontologyLabel = ontologyLabel;
exports.predParentOf = predParentOf;
exports.predicateLabel = predicateLabel;
exports.predicateLabelForXML = predicateLabelForXML;
exports.shortName = shortName;
exports.stackString = stackString;
exports.syncTableToArray = syncTableToArray;
exports.syncTableToArrayReOrdered = syncTableToArrayReOrdered;
var log = _interopRequireWildcard(require("../log"));
var _solidLogic = require("solid-logic");
var ns = _interopRequireWildcard(require("../ns"));
var rdf = _interopRequireWildcard(require("rdflib"));
var _label = require("./label");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
//                  Solid-UI general Utilities
//                  ==========================
//
// This must load AFTER the rdflib.js and log-ext.js (or log.js).
//

// pull in first avoid cross-refs

var UI = {
  log: log,
  ns: ns,
  rdf: rdf
};
var nextVariable = 0;
function newVariableName() {
  return 'v' + nextVariable++;
}
function clearVariableNames() {
  nextVariable = 0;
}

// http://stackoverflow.com/questions/879152/how-do-i-make-javascript-beep
// http://www.tsheffler.com/blog/2013/05/14/audiocontext-noteonnoteoff-and-time-units/

var audioContext;
if (typeof AudioContext !== 'undefined') {
  audioContext = AudioContext;
} else if (typeof window !== 'undefined') {
  audioContext = window.AudioContext || window.webkitAudioContext;
}
function beep() {
  if (!audioContext) {
    return;
  } // Safari 2015

  var ContextClass = audioContext;
  var ctx = new ContextClass();
  return function (duration, frequency, type, finishedCallback) {
    duration = +(duration || 0.3);

    // Only 0-4 are valid types.
    type = type || 'sine'; // sine, square, sawtooth, triangle

    if (typeof finishedCallback !== 'function') {
      finishedCallback = function finishedCallback() {};
    }
    var osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = frequency || 256;
    osc.connect(ctx.destination);
    osc.start(0);
    osc.stop(duration);
  };
}

// Make pseudorandom color from a uri
// NOT USED ANYWHERE
function hashColor(who) {
  who = who.uri || who;
  var hash = function hash(x) {
    return x.split('').reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  };
  return '#' + (hash(who) & 0xffffff | 0xc0c0c0).toString(16); // c0c0c0 or 808080 forces pale
}

function genUuid() {
  // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

/** Sync a DOM table with an array of things
 *
 * @param {DomElement} table - will have a tr for each thing
 * @param {Array<NamedNode>} things - ORDERED array of NamedNode objects
 * @param {function({NamedNode})} createNewRow(thing) returns a TR table row for a new thing
 *
 * Tolerates out of order elements but puts new ones in order.
 * Can be used for any element type; does not have to be a table and tr.
 */
function syncTableToArray(table, things, createNewRow) {
  var foundOne;
  var row;
  var i;
  for (i = 0; i < table.children.length; i++) {
    row = table.children[i];
    row.trashMe = true;
  }
  for (var g = 0; g < things.length; g++) {
    var thing = things[g];
    foundOne = false;
    for (i = 0; i < table.children.length; i++) {
      row = table.children[i];
      if (row.subject && row.subject.sameTerm(thing)) {
        row.trashMe = false;
        foundOne = true;
        break;
      }
    }
    if (!foundOne) {
      var newRow = createNewRow(thing);
      // Insert new row in position g in the table to match array
      if (g >= table.children.length) {
        table.appendChild(newRow);
      } else {
        var ele = table.children[g];
        table.insertBefore(newRow, ele);
      }
      newRow.subject = thing;
    } // if not foundOne
  } // loop g

  for (i = 0; i < table.children.length; i++) {
    row = table.children[i];
    if (row.trashMe) {
      table.removeChild(row);
    }
  }
} // syncTableToArray

/** Sync a DOM table with an array of things
 *
 * @param {DomElement} table - will have a tr for each thing
 * @param {Array<NamedNode>} things - ORDERED array of UNIQUE NamedNode objects. No duplicates
 * @param {function({NamedNode})} createNewRow(thing) returns a rendering of a new thing
 *
 * Ensures order matches exacly.  We will re-rder existing elements if necessary
 * Can be used for any element type; does not have to be a table and tr.
 * Any RDF node value can only appear ONCE in the array
 */
function syncTableToArrayReOrdered(table, things, createNewRow) {
  var elementMap = {};
  for (var i = 0; i < table.children.length; i++) {
    var row = table.children[i];
    elementMap[row.subject.toNT()] = row; // More sophisticaed would be to have a bag of duplicates
  }

  for (var g = 0; g < things.length; g++) {
    var thing = things[g];
    if (g >= table.children.length) {
      // table needs extending
      var newRow = createNewRow(thing);
      newRow.subject = thing;
      table.appendChild(newRow);
    } else {
      var _row = table.children[g];
      if (_row.subject.sameTerm(thing)) {
        // ...
      } else {
        var existingRow = elementMap[thing.toNT()];
        if (existingRow) {
          table.removeChild(existingRow);
          table.insertBefore(existingRow, _row); // Insert existing row in place of this one
        } else {
          var _newRow = createNewRow(thing);
          _row.before(_newRow); // Insert existing row in place of this one
          _newRow.subject = thing;
        }
      }
    }
  } // loop g
  // Lop off any we don't need any more:
  while (table.children.length > things.length) {
    table.removeChild(table.children[table.children.length - 1]);
  }
} // syncTableToArrayReOrdered

/* Error stack to string for better diagnotsics
 **
 ** See  http://snippets.dzone.com/posts/show/6632
 */
function stackString(e) {
  var str = '' + e + '\n';
  var i;
  if (!e.stack) {
    return str + 'No stack available.\n';
  }
  var lines = e.stack.toString().split('\n');
  var toPrint = [];
  for (i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.indexOf('ecmaunit.js') > -1) {
      // remove useless bit of traceback
      break;
    }
    if (line.charAt(0) === '(') {
      line = 'function' + line;
    }
    var chunks = line.split('@');
    toPrint.push(chunks);
  }
  // toPrint.reverse();  No - I prefer the latest at the top by the error message -tbl

  for (i = 0; i < toPrint.length; i++) {
    str += '  ' + toPrint[i][1] + '\n    ' + toPrint[i][0];
  }
  return str;
}
function emptyNode(node) {
  var nodes = node.childNodes;
  var len = nodes.length;
  for (var i = len - 1; i >= 0; i--) {
    node.removeChild(nodes[i]);
  }
  return node;
}
function getTarget(e) {
  var target;
  e = e || window.event;
  if (e.target) target = e.target;else if (e.srcElement) target = e.srcElement;
  if (target.nodeType === 3) {
    // defeat Safari bug [sic]
    target = target.parentNode;
  }
  // UI.log.debug("Click on: " + target.tagName)
  return target;
}
function ancestor(target, tagName) {
  var level;
  for (level = target; level; level = level.parentNode) {
    // UI.log.debug("looking for "+tagName+" Level: "+level+" "+level.tagName)
    try {
      if (level.tagName === tagName) return level;
    } catch (e) {
      // can hit "TypeError: can't access dead object" in ffox
      return undefined;
    }
  }
  return undefined;
}
function getAbout(kb, target) {
  var level, aa;
  for (level = target; level && level.nodeType === 1; level = level.parentNode) {
    // UI.log.debug("Level "+level + ' '+level.nodeType + ': '+level.tagName)
    aa = level.getAttribute('about');
    if (aa) {
      // UI.log.debug("kb.fromNT(aa) = " + kb.fromNT(aa))
      return kb.fromNT(aa);
      //        } else {
      //            if (level.tagName=='TR') return undefined//this is to prevent literals passing through
    }
  }

  UI.log.debug('getAbout: No about found');
  return undefined;
}
function getTerm(target) {
  var statementTr = target.parentNode;
  var st = statementTr ? statementTr.AJAR_statement : undefined;
  var className = st ? target.className : ''; // if no st then it's necessary to use getAbout
  switch (className) {
    case 'pred':
    case 'pred selected':
      return st.predicate;
    case 'obj':
    case 'obj selected':
      if (!statementTr.AJAR_inverse) {
        return st.object;
      } else {
        return st.subject;
      }
    case '':
    case 'selected':
      // header TD
      return getAbout(_solidLogic.store, target);
    // kb to be changed
    case 'undetermined selected':
      return target.nextSibling ? st.predicate : !statementTr.AJAR_inverse ? st.object : st.subject;
  }
}
function include(document, linkstr) {
  var lnk = document.createElement('script');
  lnk.setAttribute('type', 'text/javascript');
  lnk.setAttribute('src', linkstr);
  // TODO:This needs to be fixed or no longer used.
  // document.getElementsByTagName('head')[0].appendChild(lnk)
  return lnk;
}
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload !== 'function') {
    window.onload = func;
  } else {
    window.onload = function () {
      oldonload();
      func();
    };
  }
} // addLoadEvent

// Find the position of an object relative to the window
function findPos(obj) {
  // C&P from http://www.quirksmode.org/js/findpos.html
  var myDocument = obj.ownerDocument;
  var DocBox = myDocument.documentElement.getBoundingClientRect();
  var box = obj.getBoundingClientRect();
  return [box.left - DocBox.left, box.top - DocBox.top];
}
function getEyeFocus(element, instantly, isBottom, myWindow) {
  if (!myWindow) myWindow = window;
  var elementPosY = findPos(element)[1];
  var appContext = window.SolidAppContext || {};
  var scrollDiff = appContext && appContext.scroll || 52; // 52 = magic number for web-based version
  var totalScroll = elementPosY - scrollDiff - myWindow.scrollY;
  if (instantly) {
    if (isBottom) {
      myWindow.scrollBy(0, elementPosY + element.clientHeight - (myWindow.scrollY + myWindow.innerHeight));
      return;
    }
    myWindow.scrollBy(0, totalScroll);
    return;
  }
  var id = myWindow.setInterval(scrollAmount, 50);
  var times = 0;
  function scrollAmount() {
    myWindow.scrollBy(0, totalScroll / 10);
    times++;
    if (times === 10) {
      myWindow.clearInterval(id);
    }
  }
}
function AJARImage(src, alt, tt, doc) {
  if (!doc) {
    doc = document;
  }
  var image = doc.createElement('img');
  image.setAttribute('src', src);
  image.addEventListener('copy', function (e) {
    e.clipboardData.setData('text/plain', '');
    e.clipboardData.setData('text/html', '');
    e.preventDefault(); // We want no title data to be written to the clipboard
  });
  //    if (typeof alt != 'undefined')      // Messes up cut-and-paste of text
  //        image.setAttribute('alt', alt)
  if (typeof tt !== 'undefined') {
    image.setAttribute('title', tt);
  }
  return image;
}

//  Make short name for ontology

function shortName(uri) {
  var p = uri;
  if ('#/'.indexOf(p[p.length - 1]) >= 0) p = p.slice(0, -1);
  var namespaces = [];
  for (var _ns in this.prefixes) {
    namespaces[this.prefixes[_ns]] = _ns; // reverse index
  }

  var pok;
  var canUse = function canUse(pp) {
    // if (!__Serializer.prototype.validPrefix.test(pp)) return false; // bad format
    if (pp === 'ns') return false; // boring
    // if (pp in this.namespaces) return false; // already used
    // this.prefixes[uri] = pp;
    // this.namespaces[pp] = uri;
    pok = pp;
    return true;
  };
  var i;
  var hash = p.lastIndexOf('#');
  if (hash >= 0) p = p.slice(hash - 1); // lop off localid
  // eslint-disable-next-line no-unreachable-loop
  for (;;) {
    var slash = p.lastIndexOf('/');
    if (slash >= 0) p = p.slice(slash + 1);
    i = 0;
    while (i < p.length) {
      if (this.prefixchars.indexOf(p[i])) i++;else break;
    }
    p = p.slice(0, i);
    if (p.length < 6 && canUse(p)) return pok; // exact i sbest
    if (canUse(p.slice(0, 3))) return pok;
    if (canUse(p.slice(0, 2))) return pok;
    if (canUse(p.slice(0, 4))) return pok;
    if (canUse(p.slice(0, 1))) return pok;
    if (canUse(p.slice(0, 5))) return pok;
    for (i = 0;; i++) {
      if (canUse(p.slice(0, 3) + i)) return pok;
    }
  }
}

// Short name for an ontology
function ontologyLabel(term) {
  if (term.uri === undefined) return '??';
  var s = term.uri;
  var namespaces = [];
  var i = s.lastIndexOf('#');
  var part;
  if (i >= 0) {
    s = s.slice(0, i + 1);
  } else {
    i = s.lastIndexOf('/');
    if (i >= 0) {
      s = s.slice(0, i + 1);
    } else {
      return term.uri + '?!'; // strange should have # or /
    }
  }

  for (var _ns2 in UI.ns) {
    namespaces[UI.ns[_ns2]] = _ns2; // reverse index
  }

  try {
    return namespaces[s];
  } catch (e) {}
  s = s.slice(0, -1); // Chop off delimiter ... now have just

  while (s) {
    i = s.lastIndexOf('/');
    if (i >= 0) {
      part = s.slice(i + 1);
      s = s.slice(0, i);
      if (part !== 'ns' && '0123456789'.indexOf(part[0]) < 0) {
        return part;
      }
    } else {
      return term.uri + '!?'; // strange should have a nice part
    }
  }
}

function labelWithOntology(x, initialCap) {
  var t = _solidLogic.store.findTypeURIs(x);
  if (t[UI.ns.rdf('Predicate').uri] || t[UI.ns.rdfs('Class').uri]) {
    return (0, _label.label)(x, initialCap) + ' (' + ontologyLabel(x) + ')';
  }
  return (0, _label.label)(x, initialCap);
}
function escapeForXML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

//  As above but escaped for XML and chopped of contains a slash
function labelForXML(x) {
  return escapeForXML((0, _label.label)(x));
}
function predicateLabelForXML(p, inverse) {
  return escapeForXML(predicateLabel(p, inverse));
}
// As above but for predicate, possibly inverse
function predicateLabel(p, inverse) {
  var lab = (0, _label.label)(p);
  if (inverse) {
    // If we know an inverse predicate, use its label
    var ip = _solidLogic.store.any(p, UI.ns.owl('inverseOf')) || _solidLogic.store.any(undefined, UI.ns.owl('inverseOf'), p);
    if (ip) return (0, _label.label)(ip);
    if (lab === 'type') return '...'; // Not "is type of"
    return 'is ' + lab + ' of';
  }
  return lab;
}

// Not a method. For use in sorts
function RDFComparePredicateObject(self, other) {
  var x = self.predicate.compareTerm(other.predicate);
  if (x !== 0) return x;
  return self.object.compareTerm(other.object);
}
function RDFComparePredicateSubject(self, other) {
  var x = self.predicate.compareTerm(other.predicate);
  if (x !== 0) return x;
  return self.subject.compareTerm(other.subject);
}
// ends

function predParentOf(node) {
  var n = node;
  while (true) {
    if (n.getAttribute('predTR')) {
      return n;
    } else if (n.previousSibling && n.previousSibling.nodeName === 'TR') {
      n = n.previousSibling;
    } else {
      UI.log.error('Could not find predParent');
      return node;
    }
  }
}

// makeQueryRow moved to outline mode
//# sourceMappingURL=index.js.map