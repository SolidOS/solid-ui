"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addStyleSheet = addStyleSheet;
exports.allClassURIs = allClassURIs;
exports.askName = askName;
exports.attachmentList = attachmentList;
exports.button = button;
exports.cancelButton = cancelButton;
exports.clearElement = clearElement;
exports.complain = complain;
exports.continueButton = continueButton;
exports.createLinkDiv = createLinkDiv;
exports.createNameDiv = createNameDiv;
exports.defaultAnnotationStore = defaultAnnotationStore;
exports.deleteButtonWithCheck = deleteButtonWithCheck;
exports.extractLogURI = extractLogURI;
exports.faviconOrDefault = faviconOrDefault;
exports.fileUploadButtonDiv = fileUploadButtonDiv;
exports.findImage = findImage;
exports.findImageFromURI = findImageFromURI;
exports.formatDateTime = formatDateTime;
exports.iconForClass = void 0;
exports.imagesOf = imagesOf;
exports.index = void 0;
exports.isAudio = isAudio;
exports.isImage = isImage;
exports.isVideo = isVideo;
exports.linkButton = linkButton;
exports.openHrefInOutlineMode = openHrefInOutlineMode;
exports.personTR = void 0;
exports.propertyTriage = propertyTriage;
exports.refreshTree = refreshTree;
exports.removeButton = removeButton;
exports.renderAsDiv = renderAsDiv;
exports.renderAsRow = renderAsRow;
exports.selectorPanel = selectorPanel;
exports.selectorPanelRefresh = selectorPanelRefresh;
exports.setImage = setImage;
exports.setName = setName;
exports.shortDate = shortDate;
exports.shortTime = shortTime;
exports.timestamp = timestamp;
var _rdflib = require("rdflib");
var _iconBase = require("../iconBase");
var ns = _interopRequireWildcard(require("../ns"));
var style = _interopRequireWildcard(require("../style"));
var debug = _interopRequireWildcard(require("../debug"));
var _log = require("../log");
var _dragAndDrop = require("./dragAndDrop");
var _solidLogic = require("solid-logic");
var utils = _interopRequireWildcard(require("../utils"));
var _error = require("./error");
var _widgetHelpers = require("./widgetHelpers");
var _iconLinks = require("./buttons/iconLinks");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
/*  Buttons
*/

/**
 * UI Widgets such as buttons
 * @packageDocumentation
 */

/* global alert */

var iconBase = _iconBase.icons.iconBase;
var cancelIconURI = iconBase + 'noun_1180156.svg'; // black X
var checkIconURI = iconBase + 'noun_1180158.svg'; // green checkmark; Continue

function getStatusArea(context) {
  var box = context && context.statusArea || context && context.div || null;
  if (box) return box;
  var dom = context && context.dom;
  if (!dom && typeof document !== 'undefined') {
    dom = document;
  }
  if (dom) {
    var body = dom.getElementsByTagName('body')[0];
    box = dom.createElement('div');
    body.insertBefore(box, body.firstElementChild);
    if (context) {
      context.statusArea = box;
    }
    return box;
  }
  return null;
}

/**
 * Display an error message block
 */
function complain(context, err) {
  if (!err) return; // only if error
  var ele = getStatusArea(context);
  debug.log('Complaint: ' + err);
  if (ele) ele.appendChild((0, _error.errorMessageBlock)(context && context.dom || document, err));else alert(err);
}

/**
 * Remove all the children of an HTML element
 */
function clearElement(ele) {
  while (ele.firstChild) {
    ele.removeChild(ele.firstChild);
  }
  return ele;
}

/**
 * To figure out the log URI from the full URI used to invoke the reasoner
 */
function extractLogURI(fullURI) {
  var logPos = fullURI.search(/logFile=/);
  var rulPos = fullURI.search(/&rulesFile=/);
  return fullURI.substring(logPos + 8, rulPos);
}

/**
 * By default, converts e.g. '2020-02-19T19:35:28.557Z' to '19:35'
 * if today is 19 Feb 2020, and to 'Feb 19' if not.
 * @@@ TODO This needs to be changed to local time
 * @param noTime Return a string like 'Feb 19' even if it's today.
 */
function shortDate(str, noTime) {
  if (!str) return '???';
  var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  try {
    var nowZ = new Date().toISOString();
    // var nowZ = $rdf.term(now).value
    // var n = now.getTimezoneOffset() // Minutes
    if (str.slice(0, 10) === nowZ.slice(0, 10) && !noTime) {
      return str.slice(11, 16);
    }
    if (str.slice(0, 4) === nowZ.slice(0, 4)) {
      return month[parseInt(str.slice(5, 7), 10) - 1] + ' ' + parseInt(str.slice(8, 10), 10);
    }
    return str.slice(0, 10);
  } catch (e) {
    return 'shortdate:' + e;
  }
}

/**
 * Format a date and time
 * @param date for instance `new Date()`
 * @param format  for instance '{FullYear}-{Month}-{Date}T{Hours}:{Minutes}:{Seconds}.{Milliseconds}'
 * @returns for instance '2000-01-15T23:14:23.002'
 */
function formatDateTime(date, format) {
  return format.split('{').map(function (s) {
    var k = s.split('}')[0];
    var width = {
      Milliseconds: 3,
      FullYear: 4
    };
    var d = {
      Month: 1
    };
    return s ? ('000' + (date['get' + k]() + (d[k] || 0))).slice(-(width[k] || 2)) + s.split('}')[1] : '';
  }).join('');
}

/**
 * Get a string representation of the current time
 * @returns for instance '2000-01-15T23:14:23.002'
 */
function timestamp() {
  return formatDateTime(new Date(), '{FullYear}-{Month}-{Date}T{Hours}:{Minutes}:{Seconds}.{Milliseconds}');
}

/**
 * Get a short string representation of the current time
 * @returns for instance '23:14:23.002'
 */
function shortTime() {
  return formatDateTime(new Date(), '{Hours}:{Minutes}:{Seconds}.{Milliseconds}');
}

// ///////////////////// Handy UX widgets

/**
 * Sets the best name we have and looks up a better one
 */
function setName(element, x) {
  var kb = _solidLogic.store;
  var findName = function findName(x) {
    var name = kb.any(x, ns.vcard('fn')) || kb.any(x, ns.foaf('name')) || kb.any(x, ns.vcard('organization-name'));
    return name ? name.value : null;
  };
  var name = x.sameTerm(ns.foaf('Agent')) ? 'Everyone' : findName(x);
  element.textContent = name || utils.label(x);
  if (!name && x.uri) {
    if (!kb.fetcher) {
      throw new Error('kb has no fetcher');
    }
    // Note this is only a fetch, not a lookUP of all sameAs etc
    kb.fetcher.nowOrWhenFetched(x.doc(), undefined, function (_ok) {
      element.textContent = findName(x) || utils.label(x); // had: (ok ? '' : '? ') +
    });
  }
}

/**
 * Set of suitable images
 * See also [[findImage]]
 * @param x The thing for which we want to find an image
 * @param kb The RDF store to look in
 * @returns It goes looking for triples in `kb`,
 *          `(subject: x), (predicate: see list below) (object: image-url)`
 *          to find any image linked from the thing with one of the following
 *          predicates (in order):
 *          * ns.sioc('avatar')
 *          * ns.foaf('img')
 *          * ns.vcard('logo')
 *          * ns.vcard('hasPhoto')
 *          * ns.vcard('photo')
 *          * ns.foaf('depiction')

 */
function imagesOf(x, kb) {
  return kb.each(x, ns.sioc('avatar')).concat(kb.each(x, ns.foaf('img'))).concat(kb.each(x, ns.vcard('logo'))).concat(kb.each(x, ns.vcard('hasPhoto'))).concat(kb.each(x, ns.vcard('photo'))).concat(kb.each(x, ns.foaf('depiction')));
}

/**
 * Best logo or avatar or photo etc to represent someone or some group etc
 */
var iconForClass = exports.iconForClass = {
  // Potentially extendable by other apps, panes, etc
  // Relative URIs to the iconBase
  'solid:AppProviderClass': 'noun_144.svg',
  //  @@ classs name should not contain 'Class'
  'solid:AppProvider': 'noun_15177.svg',
  // @@
  'solid:Pod': 'noun_Cabinet_1434380.svg',
  'vcard:Group': 'noun_339237.svg',
  'vcard:Organization': 'noun_143899.svg',
  'vcard:Individual': 'noun_15059.svg',
  'schema:Person': 'noun_15059.svg',
  'foaf:Person': 'noun_15059.svg',
  'foaf:Agent': 'noun_98053.svg',
  'acl:AuthenticatedAgent': 'noun_99101.svg',
  'prov:SoftwareAgent': 'noun_Robot_849764.svg',
  // Bot
  'vcard:AddressBook': 'noun_15695.svg',
  'trip:Trip': 'noun_581629.svg',
  'meeting:LongChat': 'noun_1689339.svg',
  'meeting:Meeting': 'noun_66617.svg',
  'meeting:Project': 'noun_1036577.svg',
  'ui:Form': 'noun_122196.svg',
  'rdfs:Class': 'class-rectangle.svg',
  // For RDF developers
  'rdf:Property': 'property-diamond.svg',
  'owl:Ontology': 'noun_classification_1479198.svg',
  'wf:Tracker': 'noun_122196.svg',
  'wf:Task': 'noun_17020_gray-tick.svg',
  'wf:Open': 'noun_17020_sans-tick.svg',
  'wf:Closed': 'noun_17020.svg'
};

/**
 * Returns the origin of the URI of a NamedNode
 */
function tempSite(x) {
  // use only while one in rdflib fails with origins 2019
  var str = x.uri.split('#')[0];
  var p = str.indexOf('//');
  if (p < 0) throw new Error('This URI does not have a web site part (origin)');
  var q = str.indexOf('/', p + 2);
  if (q < 0) {
    // no third slash?
    return str.slice(0) + '/'; // Add slash to a bare origin
  } else {
    return str.slice(0, q + 1);
  }
}

/**
 * Find an image for this thing as a class
 */
function findImageFromURI(x) {
  var iconDir = iconBase;

  // Special cases from URI scheme:
  if (typeof x !== 'string' && x.uri) {
    if (x.uri.split('/').length === 4 && !x.uri.split('/')[1] && !x.uri.split('/')[3]) {
      return iconDir + 'noun_15177.svg'; // App -- this is an origin
    }
    // Non-HTTP URI types imply types
    if (x.uri.startsWith('message:') || x.uri.startsWith('mid:')) {
      // message: is apple bug-- should be mid:
      return iconDir + 'noun_480183.svg'; // envelope  noun_567486
    }
    if (x.uri.startsWith('mailto:')) {
      return iconDir + 'noun_567486.svg'; // mailbox - an email desitination
    }
    // For HTTP(s) documents, we could look at the MIME type if we know it.
    if (x.uri.startsWith('https:') && x.uri.indexOf('#') < 0) {
      return tempSite(x) + 'favicon.ico'; // was x.site().uri + ...
      // Todo: make the document icon a fallback for if the favicon does not exist
      // todo: pick up a possible favicon for the web page itself from a link
      // was: return iconDir + 'noun_681601.svg' // document - under solid assumptions
    }
    return null;
  }
  return iconDir + 'noun_10636_grey.svg'; // Grey Circle -  some thing
}

/**
 * Find something we have as explicit image data for the thing
 * See also [[imagesOf]]
 * @param thing The thing for which we want to find an image
 * @returns The URL of a globe icon if thing equals `ns.foaf('Agent')`
 *          or `ns.rdf('Resource')`. Otherwise, it goes looking for
 *          triples in `store`,
 *          `(subject: thing), (predicate: see list below) (object: image-url)`
 *          to find any image linked from the thing with one of the following
 *          predicates (in order):
 *          * ns.sioc('avatar')
 *          * ns.foaf('img')
 *          * ns.vcard('logo')
 *          * ns.vcard('hasPhoto')
 *          * ns.vcard('photo')
 *          * ns.foaf('depiction')
 */
function findImage(thing) {
  var kb = _solidLogic.store;
  var iconDir = iconBase;
  if (thing.sameTerm(ns.foaf('Agent')) || thing.sameTerm(ns.rdf('Resource'))) {
    return iconDir + 'noun_98053.svg'; // Globe
  }
  var image = kb.any(thing, ns.sioc('avatar')) || kb.any(thing, ns.foaf('img')) || kb.any(thing, ns.vcard('logo')) || kb.any(thing, ns.vcard('hasPhoto')) || kb.any(thing, ns.vcard('photo')) || kb.any(thing, ns.foaf('depiction'));
  return image ? image.uri : null;
}

/**
 * Do the best you can with the data available
 *
 * @return {Boolean} Are we happy with this icon?
 * Sets src AND STYLE of the image.
 */
function trySetImage(element, thing, iconForClassMap) {
  var kb = _solidLogic.store;
  var explitImage = findImage(thing);
  if (explitImage) {
    element.setAttribute('src', explitImage);
    return true;
  }
  // This is one of the classes we know about - the class itself?
  var typeIcon = iconForClassMap[thing.uri];
  if (typeIcon) {
    element.setAttribute('src', typeIcon);
    element.style = style.classIconStyle;
    // element.style.border = '0.1em solid green;'
    // element.style.backgroundColor = '#eeffee' // pale green
    return true;
  }
  var schemeIcon = findImageFromURI(thing);
  if (schemeIcon) {
    element.setAttribute('src', schemeIcon);
    return true; // happy with this -- don't look it up
  }

  // Do we have a generic icon for something in any class its in?
  var types = kb.findTypeURIs(thing);
  for (var typeURI in types) {
    if (iconForClassMap[typeURI]) {
      element.setAttribute('src', iconForClassMap[typeURI]);
      return false; // maybe we can do better
    }
  }
  element.setAttribute('src', iconBase + 'noun_10636_grey.svg'); // Grey Circle -  some thing
  return false; // we can do better
}

/**
 * ToDo: Also add icons for *properties* like  home, work, email, range, domain, comment,
 */
function setImage(element, thing) {
  // 20191230a
  var kb = _solidLogic.store;
  var iconForClassMap = {};
  for (var k in iconForClass) {
    var pref = k.split(':')[0];
    var id = k.split(':')[1];
    var theClass = ns[pref](id);
    iconForClassMap[theClass.uri] = _rdflib.uri.join(iconForClass[k], iconBase);
  }
  var happy = trySetImage(element, thing, iconForClassMap);
  if (!happy && thing.uri) {
    if (!kb.fetcher) {
      throw new Error('kb has no fetcher');
    }
    kb.fetcher.nowOrWhenFetched(thing.doc(), undefined, function (ok) {
      if (ok) {
        trySetImage(element, thing, iconForClassMap);
      }
    });
  }
}

// If a web page, then a favicon, with a fallback to ???
// See, e.g., http://stackoverflow.com/questions/980855/inputting-a-default-image
function faviconOrDefault(dom, x) {
  var image = dom.createElement('img');
  image.style = style.iconStyle;
  var isOrigin = function isOrigin(x) {
    if (!x.uri) return false;
    var parts = x.uri.split('/');
    return parts.length === 3 || parts.length === 4 && parts[3] === '';
  };
  image.setAttribute('src', iconBase + (isOrigin(x) ? 'noun_15177.svg' : 'noun_681601.svg') // App symbol vs document
  );
  if (x.uri && x.uri.startsWith('https:') && x.uri.indexOf('#') < 0) {
    var res = dom.createElement('object'); // favico with a fallback of a default image if no favicon
    res.setAttribute('data', tempSite(x) + 'favicon.ico');
    res.setAttribute('type', 'image/x-icon');
    res.appendChild(image); // fallback
    return res;
  } else {
    setImage(image, x);
    return image;
  }
}

/* Two-option dialog pop-up
*/

function renderDeleteConfirmPopup(dom, refererenceElement, prompt, deleteFunction) {
  function removePopup() {
    refererenceElement.parentElement.removeChild(refererenceElement);
  }
  function removePopupAndDoDeletion() {
    removePopup();
    deleteFunction();
  }
  var popup = dom.createElement('div');
  popup.style = style.confirmPopupStyle;
  popup.style.position = 'absolute';
  popup.style.top = '-1em'; // try leaving original button clear

  popup.style.display = 'grid';
  popup.style.gridTemplateColumns = 'auto auto';
  var affirm = dom.createElement('div');
  affirm.style.gridColumn = '1/2';
  affirm.style.gridRow = '1'; // @@ sigh; TS. could pass number in fact
  var cancel = dom.createElement('div');
  cancel.style.gridColumn = '1/2';
  cancel.style.gridRow = '2';
  var xButton = cancelButton(dom, removePopup);
  popup.appendChild(xButton);
  xButton.style.gridColumn = '1';
  xButton.style.gridRow = '2';
  var cancelPrompt = popup.appendChild(dom.createElement('button'));
  cancelPrompt.style = style.buttonStyle;
  cancelPrompt.style.gridRow = '2';
  cancelPrompt.style.gridColumn = '2';
  cancelPrompt.textContent = 'Cancel'; // @@ I18n

  var affirmIcon = button(dom, _iconBase.icons.iconBase + 'noun_925021.svg', 'Delete it'); // trashcan
  popup.appendChild(affirmIcon);
  affirmIcon.style.gridRow = '1';
  affirmIcon.style.gridColumn = '1';
  var sureButtonElt = popup.appendChild(dom.createElement('button'));
  sureButtonElt.style = style.buttonStyle;
  sureButtonElt.style.gridRow = '1';
  sureButtonElt.style.gridColumn = '2';
  sureButtonElt.textContent = prompt;
  popup.appendChild(sureButtonElt);
  affirmIcon.addEventListener('click', removePopupAndDoDeletion);
  sureButtonElt.addEventListener('click', removePopupAndDoDeletion);

  // xButton.addEventListener('click', removePopup)
  cancelPrompt.addEventListener('click', removePopup);
  return popup;
}
/**
 * Delete button with a check you really mean it
 * @@ Supress check if command key held down?
 */
function deleteButtonWithCheck(dom, container, noun, deleteFunction) {
  function createPopup() {
    var refererenceElement = dom.createElement('div');
    container.insertBefore(refererenceElement, deleteButton);
    refererenceElement.style.position = 'relative'; // Needed as reference for popup
    refererenceElement.appendChild(renderDeleteConfirmPopup(dom, refererenceElement, prompt, deleteFunction));
  }
  var minusIconURI = iconBase + 'noun_2188_red.svg'; // white minus in red #cc0000 circle
  var deleteButton = dom.createElement('img');
  deleteButton.setAttribute('src', minusIconURI);
  deleteButton.setAttribute('style', style.smallButtonStyle); // @@tsc - would set deleteButton.style
  deleteButton.style["float"] = 'right'; // Historically this has alwaus floated right

  var prompt = 'Remove this ' + noun;
  deleteButton.title = prompt;
  // @@ In an ideal world, make use of hover an accessibility option
  deleteButton.classList.add('hoverControlHide');
  deleteButton.addEventListener('click', createPopup);
  container.classList.add('hoverControl');
  container.appendChild(deleteButton);
  deleteButton.setAttribute('data-testid', 'deleteButtonWithCheck');
  return deleteButton; // or button div?  caller may change size of image
}

/*  Make a button
 *
 * @param dom - the DOM document object
 * @Param iconURI - the URI of the icon to use (if any)
 * @param text - the tooltip text or possibly button contents text
 * @param handler <function> - A handler to called when button is clicked
 *
 * @returns <dDomElement> - the button
 */
function button(dom, iconURI, text, handler) {
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
    buttonColor: 'Primary',
    needsBorder: false
  };
  var button = dom.createElement('button');
  button.setAttribute('type', 'button');
  // button.innerHTML = text  // later, user preferences may make text preferred for some
  if (iconURI) {
    var img = button.appendChild(dom.createElement('img'));
    img.setAttribute('src', iconURI);
    img.setAttribute('style', 'width: 2em; height: 2em;'); // trial and error. 2em disappears
    img.title = text;
    button.setAttribute('style', style.buttonStyle);
  } else {
    button.textContent = text.toLocaleUpperCase();
    button.onmouseover = function () {
      if (options.buttonColor === 'Secondary') {
        if (options.needsBorder) {
          button.setAttribute('style', style.secondaryButtonNoBorderHover);
        } else {
          button.setAttribute('style', style.secondaryButtonHover);
        }
      } else {
        if (options.needsBorder) {
          button.setAttribute('style', style.primaryButtonNoBorderHover);
        } else {
          button.setAttribute('style', style.primaryButtonHover);
        }
      }
    };
    button.onmouseout = function () {
      if (options.buttonColor === 'Secondary') {
        if (options.needsBorder) {
          button.setAttribute('style', style.secondaryButtonNoBorder);
        } else {
          button.setAttribute('style', style.secondaryButton);
        }
      } else {
        if (options.needsBorder) {
          button.setAttribute('style', style.primaryButtonNoBorder);
        } else {
          button.setAttribute('style', style.primaryButton);
        }
      }
    };
    if (options.buttonColor === 'Secondary') {
      if (options.needsBorder) {
        button.setAttribute('style', style.secondaryButtonNoBorder);
      } else {
        button.setAttribute('style', style.secondaryButton);
      }
    } else {
      if (options.needsBorder) {
        button.setAttribute('style', style.primaryButtonNoBorder);
      } else {
        button.setAttribute('style', style.primaryButton);
      }
    }
  }
  if (handler) {
    button.addEventListener('click', handler, false);
  }
  return button;
}

/*  Make a cancel button
 *
 * @param dom - the DOM document object
 * @param handler <function> - A handler to called when button is clicked
 *
 * @returns <dDomElement> - the button
 */
function cancelButton(dom, handler) {
  var b = button(dom, cancelIconURI, 'Cancel', handler);
  if (b.firstChild) {
    // sigh for tsc
    b.firstChild.style.opacity = '0.3'; // Black X is too harsh: current language is grey X
  }
  return b;
}

/*  Make a continue button
 *
 * @param dom - the DOM document object
 * @param handler <function> - A handler to called when button is clicked
 *
 * @returns <dDomElement> - the button
 */
function continueButton(dom, handler) {
  return button(dom, checkIconURI, 'Continue', handler);
}

/* Grab a name for a new thing
 *
 * Form to get the name of a new thing before we create it
 * @params theClass  Misspelt to avoid clashing with the JavaScript keyword
 * @returns: a promise of (a name or null if cancelled)
 */
function askName(dom, kb, container, predicate, theClass, noun) {
  // eslint-disable-next-line promise/param-names
  return new Promise(function (resolve, _reject) {
    var form = dom.createElement('div'); // form is broken as HTML behaviour can resurface on js error
    // classLabel = utils.label(ns.vcard('Individual'))
    predicate = predicate || ns.foaf('name'); // eg 'name' in user's language
    noun = noun || (theClass ? utils.label(theClass) : '  '); // eg 'folder' in users's language
    var prompt = noun + ' ' + utils.label(predicate) + ': ';
    form.appendChild(dom.createElement('p')).textContent = prompt;
    var namefield = dom.createElement('input');
    namefield.setAttribute('type', 'text');
    namefield.setAttribute('size', '100');
    namefield.setAttribute('maxLength', '2048'); // No arbitrary limits
    namefield.setAttribute('style', style.textInputStyle);
    namefield.select(); // focus next user input
    form.appendChild(namefield);
    container.appendChild(form);

    // namefield.focus()

    function gotName() {
      form.parentNode.removeChild(form);
      resolve(namefield.value.trim());
    }
    namefield.addEventListener('keyup', function (e) {
      if (e.keyCode === 13) {
        gotName();
      }
    }, false);
    form.appendChild(dom.createElement('br'));
    form.appendChild(cancelButton(dom, function (_event) {
      form.parentNode.removeChild(form);
      resolve(null);
    }));
    form.appendChild(continueButton(dom, function (_event) {
      gotName();
    }));
    namefield.focus();
  }); // Promise
}

/**
 * A TR to represent a draggable person, etc in a list
 *
 * pred is unused param at the moment
 */
var personTR = exports.personTR = renderAsRow; // The legacy name is used in a lot of places

function renderAsRow(dom, pred, obj, options) {
  var tr = dom.createElement('tr');
  options = options || {};
  // tr.predObj = [pred.uri, obj.uri]   moved to acl-control
  var td1 = tr.appendChild(dom.createElement('td'));
  var td2 = tr.appendChild(dom.createElement('td'));
  var td3 = tr.appendChild(dom.createElement('td'));

  // const image = td1.appendChild(dom.createElement('img'))
  var image = options.image || faviconOrDefault(dom, obj);
  td1.setAttribute('style', 'vertical-align: middle; width:2.5em; padding:0.5em; height: 2.5em;');
  td2.setAttribute('style', 'vertical-align: middle; text-align:left;');
  td3.setAttribute('style', 'vertical-align: middle; width:2em; padding:0.5em; height: 4em;');
  td1.appendChild(image);
  if (options.title) {
    td2.textContent = options.title;
  } else {
    setName(td2, obj); // This is async
  }
  if (options.deleteFunction) {
    deleteButtonWithCheck(dom, td3, options.noun || 'one', options.deleteFunction);
  }
  if (obj.uri) {
    // blank nodes need not apply
    if (options.link !== false) {
      var anchor = td3.appendChild((0, _iconLinks.linkIcon)(dom, obj));
      anchor.classList.add('HoverControlHide');
      td3.appendChild(dom.createElement('br'));
    }
    if (options.draggable !== false) {
      // default is on
      image.setAttribute('draggable', 'false'); // Stop the image being dragged instead - just the TR
      (0, _dragAndDrop.makeDraggable)(tr, obj);
    }
  }
  ;
  tr.subject = obj;
  return tr;
}

/* A helper function for renderAsDiv
*  creates the NameDiv for the person
*  Note: could not move it to the helper file because they call exported functions
*  from buttons
*  @internal exporting this only for unit tests
*/
function createNameDiv(dom, div, title, obj) {
  var nameDiv = div.appendChild(dom.createElement('div'));
  if (title) {
    nameDiv.textContent = title;
  } else {
    setName(nameDiv, obj); // This is async
  }
}
/* A helper function for renderAsDiv
*  creates the linkDiv for the person
*  Note: could not move it to the helper file because they call exported functions
*  from buttons
* @internal exporting this only for unit tests
*/
function createLinkDiv(dom, div, obj, options) {
  var linkDiv = div.appendChild(dom.createElement('div'));
  linkDiv.setAttribute('style', style.linkDivStyle);
  if (options.deleteFunction) {
    deleteButtonWithCheck(dom, linkDiv, options.noun || 'one', options.deleteFunction);
  }
  if (obj.uri) {
    // blank nodes need not apply
    if (options.link !== false) {
      (0, _iconLinks.createLinkForURI)(dom, linkDiv, obj);
    }
    (0, _dragAndDrop.makeDraggable)(div, obj);
  }
}
/**
 * A Div to represent a draggable person, etc in a list
 * configurable to add an onClick listener
 */
function renderAsDiv(dom, obj, options) {
  var div = dom.createElement('div');
  div.setAttribute('style', style.renderAsDivStyle);
  options = options || {};
  var image = options.image || faviconOrDefault(dom, obj);
  (0, _widgetHelpers.createImageDiv)(dom, div, image);
  createNameDiv(dom, div, options.title, obj);
  createLinkDiv(dom, div, obj, options);
  if (options.clickable && options.onClickFunction) {
    (0, _widgetHelpers.addClickListenerToElement)(div, options.onClickFunction);
  }

  // to be compatible with the SolidOS table layout
  if (options.wrapInATR) {
    var tr = (0, _widgetHelpers.wrapDivInATR)(dom, div, obj);
    return tr;
  }
  return div;
}

/**
 * Refresh a DOM tree recursively
 */
function refreshTree(root) {
  if (root.refresh) {
    root.refresh();
    return;
  }
  for (var i = 0; i < root.children.length; i++) {
    refreshTree(root.children[i]);
  }
}

/**
 * Options argument for [[attachmentList]] function
 */

/**
 * Component that displays a list of resources, for instance
 * the attachments of a message, or the various documents related
 * to a meeting.
 * Accepts dropping URLs onto it to add attachments to it.
 */
function attachmentList(dom, subject, div) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  // options = options || {}

  var deleteAttachment = function deleteAttachment(target) {
    if (!kb.updater) {
      throw new Error('kb has no updater');
    }
    kb.updater.update((0, _rdflib.st)(subject, predicate, target, doc), [], function (uri, ok, errorBody, _xhr) {
      if (ok) {
        refresh();
      } else {
        complain(undefined, 'Error deleting one: ' + errorBody);
      }
    });
  };
  function createNewRow(target) {
    var theTarget = target;
    var opt = {
      noun: noun
    };
    if (modify) {
      opt.deleteFunction = function () {
        deleteAttachment(theTarget);
      };
    }
    return personTR(dom, predicate, target, opt);
  }
  var refresh = function refresh() {
    var things = kb.each(subject, predicate);
    things.sort();
    utils.syncTableToArray(attachmentTable, things, createNewRow);
  };
  function droppedURIHandler(uris) {
    var ins = [];
    uris.forEach(function (u) {
      var target = (0, _rdflib.sym)(u); // Attachment needs text label to disinguish I think not icon.
      debug.log('Dropped on attachemnt ' + u); // icon was: iconBase + 'noun_25830.svg'
      ins.push((0, _rdflib.st)(subject, predicate, target, doc));
    });
    if (!kb.updater) {
      throw new Error('kb has no updater');
    }
    kb.updater.update([], ins, function (uri, ok, errorBody, _xhr) {
      if (ok) {
        refresh();
      } else {
        complain(undefined, 'Error adding one: ' + errorBody);
      }
    });
  }
  function droppedFileHandler(files) {
    var _options$uploadFolder, _options$uploadFolder2;
    (0, _dragAndDrop.uploadFiles)(kb.fetcher, files, (_options$uploadFolder = options.uploadFolder) === null || _options$uploadFolder === void 0 ? void 0 : _options$uploadFolder.uri, // Files
    (_options$uploadFolder2 = options.uploadFolder) === null || _options$uploadFolder2 === void 0 ? void 0 : _options$uploadFolder2.uri,
    // Pictures
    function (theFile, destURI) {
      var ins = [(0, _rdflib.st)(subject, predicate, kb.sym(destURI), doc)];
      if (!kb.updater) {
        throw new Error('kb has no updater');
      }
      kb.updater.update([], ins, function (uri, ok, errorBody, _xhr) {
        if (ok) {
          refresh();
        } else {
          complain(undefined, 'Error adding link to uploaded file: ' + errorBody);
        }
      });
    });
  }
  var doc = options.doc || subject.doc();
  if (options.modify === undefined) options.modify = true;
  var modify = options.modify;
  var promptIcon = options.promptIcon || iconBase + 'noun_748003.svg'; //    target
  // const promptIcon = options.promptIcon || (iconBase + 'noun_25830.svg') //  paperclip
  var predicate = options.predicate || ns.wf('attachment');
  var noun = options.noun || 'attachment';
  var kb = _solidLogic.store;
  var attachmentOuter = div.appendChild(dom.createElement('table'));
  attachmentOuter.setAttribute('style', 'margin-top: 1em; margin-bottom: 1em;');
  var attachmentOne = attachmentOuter.appendChild(dom.createElement('tr'));
  var attachmentLeft = attachmentOne.appendChild(dom.createElement('td'));
  var attachmentRight = attachmentOne.appendChild(dom.createElement('td'));
  var attachmentTable = attachmentRight.appendChild(dom.createElement('table'));
  attachmentTable.appendChild(dom.createElement('tr')) // attachmentTableTop
  ;
  attachmentOuter.refresh = refresh; // Participate in downstream changes
  // ;(attachmentTable as any).refresh = refresh   <- outer should be best?

  refresh();
  if (modify) {
    // const buttonStyle = 'width; 2em; height: 2em; margin: 0.5em; padding: 0.1em;'
    var paperclip = button(dom, promptIcon, 'Drop attachments here');
    // paperclip.style = buttonStyle // @@ needed?  default has white background
    attachmentLeft.appendChild(paperclip);
    var fhandler = options.uploadFolder ? droppedFileHandler : null;
    (0, _dragAndDrop.makeDropTarget)(paperclip, droppedURIHandler, fhandler); // beware missing the wire of the paparclip!
    (0, _dragAndDrop.makeDropTarget)(attachmentLeft, droppedURIHandler, fhandler); // just the outer won't do it

    if (options.uploadFolder) {
      // Addd an explicit file upload button as well
      var buttonDiv = fileUploadButtonDiv(dom, droppedFileHandler);
      attachmentLeft.appendChild(buttonDiv);
      // buttonDiv.children[1].style =  buttonStyle
    }
  }
  return attachmentOuter;
}

// /////////////////////////////////////////////////////////////////////////////

/**
 * Event Handler for links within solid apps.
 *
 * Note that native links have constraints in Firefox, they
 * don't work with local files for instance (2011)
 */
function openHrefInOutlineMode(e) {
  e.preventDefault();
  e.stopPropagation();
  var target = utils.getTarget(e);
  var uri = target.getAttribute('href');
  if (!uri) return debug.log('openHrefInOutlineMode: No href found!\n');
  var dom = window.document;
  if (dom.outlineManager) {
    // @@ TODO Remove the use of document as a global object
    // TODO fix dependency cycle to solid-panes by calling outlineManager
    ;
    dom.outlineManager.GotoSubject(_solidLogic.store.sym(uri), true, undefined, true, undefined);
  } else if (window && window.panes && window.panes.getOutliner) {
    // @@ TODO Remove the use of window as a global object
    ;
    window.panes.getOutliner().GotoSubject(_solidLogic.store.sym(uri), true, undefined, true, undefined);
  } else {
    debug.log('ERROR: Can\'t access outline manager in this config');
  }
  // dom.outlineManager.GotoSubject(store.sym(uri), true, undefined, true, undefined)
}

/**
 * Make a URI in the Tabulator.org annotation store out of the URI of the thing to be annotated.
 *
 * @@ Todo: make it a personal preference.
 */
function defaultAnnotationStore(subject) {
  if (subject.uri === undefined) return undefined;
  var s = subject.uri;
  if (s.slice(0, 7) !== 'http://') return undefined;
  s = s.slice(7); // Remove
  var hash = s.indexOf('#');
  if (hash >= 0) s = s.slice(0, hash);
  // Strip trailing
  else {
    var slash = s.lastIndexOf('/');
    if (slash < 0) return undefined;
    s = s.slice(0, slash);
  }
  return _solidLogic.store.sym('http://tabulator.org/wiki/annnotation/' + s);
}

/**
 * Retrieve all RDF class URIs from solid-ui's RDF store
 * @returns an object `ret` such that `Object.keys(ret)` is
 * the list of all class URIs.
 */
function allClassURIs() {
  var set = {};
  _solidLogic.store.statementsMatching(undefined, ns.rdf('type'), undefined).forEach(function (st) {
    if (st.object.value) set[st.object.value] = true;
  });
  _solidLogic.store.statementsMatching(undefined, ns.rdfs('subClassOf'), undefined).forEach(function (st) {
    if (st.object.value) set[st.object.value] = true;
    if (st.subject.value) set[st.subject.value] = true;
  });
  _solidLogic.store.each(undefined, ns.rdf('type'), ns.rdfs('Class')).forEach(function (c) {
    if (c.value) set[c.value] = true;
  });
  return set;
}

/**
 * Figuring which properties we know about
 *
 * When the user inputs an RDF property, like for a form field
 * or when specifying the relationship between two arbitrary things,
 * then er can prompt them with properties the session knows about
 *
 * TODO: Look again by catching this somewhere. (On the kb?)
 * TODO: move to diff module? Not really a button.
 * @param {Store} kb The quadstore to be searched.
 */

function propertyTriage(kb) {
  var possibleProperties = {};
  // if (possibleProperties === undefined) possibleProperties = {}
  // const kb = store
  var dp = {};
  var op = {};
  var no = 0;
  var nd = 0;
  var nu = 0;
  var pi = kb.predicateIndex; // One entry for each pred
  for (var p in pi) {
    var object = pi[p][0].object;
    if (object.termType === 'Literal') {
      dp[p] = true;
      nd++;
    } else {
      op[p] = true;
      no++;
    }
  } // If nothing discovered, then could be either:
  var ps = kb.each(undefined, ns.rdf('type'), ns.rdf('Property'));
  for (var i = 0; i < ps.length; i++) {
    var _p = ps[i].toNT();
    if (!op[_p] && !dp[_p]) {
      dp[_p] = true;
      op[_p] = true;
      nu++;
    }
  }
  possibleProperties.op = op;
  possibleProperties.dp = dp;
  (0, _log.info)("propertyTriage: ".concat(no, " non-lit, ").concat(nd, " literal. ").concat(nu, " unknown."));
  return possibleProperties;
}

/**
 * General purpose widgets
 */

/**
 * A button for jumping
 */
function linkButton(dom, object) {
  var b = dom.createElement('button');
  b.setAttribute('type', 'button');
  b.textContent = 'Goto ' + utils.label(object);
  b.addEventListener('click', function (_event) {
    // b.parentNode.removeChild(b)
    // TODO fix dependency cycle to solid-panes by calling outlineManager
    ;
    dom.outlineManager.GotoSubject(object, true, undefined, true, undefined);
  }, true);
  return b;
}

/**
 * A button to remove some other element from the page
 */
function removeButton(dom, element) {
  var b = dom.createElement('button');
  b.setAttribute('type', 'button');
  b.textContent = '✕'; // MULTIPLICATION X
  b.addEventListener('click', function (_event) {
    ;
    element.parentNode.removeChild(element);
  }, true);
  return b;
}

//      Description text area
//
// Make a box to demand a description or display existing one
//
// @param dom - the document DOM for the user interface
// @param kb - the graph which is the knowledge base we are working with
// @param subject - a term, the subject of the statement(s) being edited.
// @param predicate - a term, the predicate of the statement(s) being edited
// @param store - The web document being edited
// @param callbackFunction - takes (boolean ok, string errorBody)

// /////////////////////////////////////// Random I/O widgets /////////////

// ////              Column Header Buttons
//
//  These are for selecting different modes, sources,styles, etc.
//
/*
buttons.headerButtons = function (dom, kb, name, words) {
    const box = dom.createElement('table')
    var i, word, s = '<tr>'
    box.setAttribute('style', 'width: 90%; height: 1.5em')
    for (i=0; i<words.length; i++) {
        s += '<td><input type="radio" name="' + name + '" id="' + words[i] + '" value='
    }
    box.innerHTML = s + '</tr>'

}
*/
// ////////////////////////////////////////////////////////////
//
//     selectorPanel
//
//  A vertical panel for selecting connections to left or right.
//
//   @param inverse means this is the object rather than the subject
//
function selectorPanel(dom, kb, type, predicate, inverse, possible, options, callbackFunction, linkCallback) {
  return selectorPanelRefresh(dom.createElement('div'), dom, kb, type, predicate, inverse, possible, options, callbackFunction, linkCallback);
}
function selectorPanelRefresh(list, dom, kb, type, predicate, inverse, possible, options, callbackFunction, linkCallback) {
  var style0 = 'border: 0.1em solid #ddd; border-bottom: none; width: 95%; height: 2em; padding: 0.5em;';
  var selected = null;
  list.innerHTML = '';
  var refreshItem = function refreshItem(box, x) {
    // Scope to hold item and x
    var item;
    // eslint-disable-next-line prefer-const
    var image;
    var setStyle = function setStyle() {
      var already = inverse ? kb.each(undefined, predicate, x) : kb.each(x, predicate);
      iconDiv.setAttribute('class', already.length === 0 ? 'hideTillHover' : ''); // See tabbedtab.css
      image.setAttribute('src', options.connectIcon || iconBase + 'noun_25830.svg');
      image.setAttribute('title', already.length ? already.length : 'attach');
    };
    var f = index.twoLine.widgetForClass(type);
    // eslint-disable-next-line prefer-const
    item = f(dom, x);
    item.setAttribute('style', style0);
    var nav = dom.createElement('div');
    nav.setAttribute('class', 'hideTillHover'); // See tabbedtab.css
    nav.setAttribute('style', 'float:right; width:10%');
    var a = dom.createElement('a');
    a.setAttribute('href', x.uri);
    a.setAttribute('style', 'float:right');
    nav.appendChild(a).textContent = '>';
    box.appendChild(nav);
    var iconDiv = dom.createElement('div');
    iconDiv.setAttribute('style', (inverse ? 'float:left;' : 'float:right;') + ' width:30px;');
    image = dom.createElement('img');
    setStyle();
    iconDiv.appendChild(image);
    box.appendChild(iconDiv);
    item.addEventListener('click', function (event) {
      if (selected === item) {
        // deselect
        item.setAttribute('style', style0);
        selected = null;
      } else {
        if (selected) selected.setAttribute('style', style0);
        item.setAttribute('style', style0 + 'background-color: #ccc; color:black;');
        selected = item;
      }
      callbackFunction(x, event, selected === item);
      setStyle();
    }, false);
    image.addEventListener('click', function (event) {
      linkCallback(x, event, inverse, setStyle);
    }, false);
    box.appendChild(item);
    return box;
  };
  for (var i = 0; i < possible.length; i++) {
    var box = dom.createElement('div');
    list.appendChild(box);
    refreshItem(box, possible[i]);
  }
  return list;
}

// ###########################################################################
//
//      Small compact views of things
//
var index = exports.index = {};
// ///////////////////////////////////////////////////////////////////////////
// We need these for anything which is a subject of an attachment.
//
// These should be moved to type-dependeent UI code. Related panes maybe

function twoLineDefault(dom, x) {
  // Default
  var box = dom.createElement('div');
  box.textContent = utils.label(x);
  return box;
}

/**
 * Find a function that can create a widget for a given class
 * @param c The RDF class for which we want a widget generator function
 */
function twoLineWidgetForClass(c) {
  var widget = index.twoLine[c.uri];
  var kb = _solidLogic.store;
  if (widget) return widget;
  var sup = kb.findSuperClassesNT(c);
  for (var cl in sup) {
    widget = index.twoLine[kb.fromNT(cl).uri];
    if (widget) return widget;
  }
  return index.twoLine[''];
}

/**
 * Display a transaction
 * @param x Should have attributes through triples in store:
 *          * ns.qu('payee') -> a named node
 *          * ns.qu('date) -> a literal
 *          * ns.qu('amount') -> a literal
 */
function twoLineTransaction(dom, x) {
  var failed = '';
  var enc = function enc(p) {
    var y = _solidLogic.store.any(x, ns.qu(p));
    if (!y) failed += '@@ No value for ' + p + '! ';
    return y ? utils.escapeForXML(y.value) : '?'; // @@@@
  };
  var box = dom.createElement('table');
  box.innerHTML = "\n      <tr>\n      <td colspan=\"2\"> ".concat(enc('payee'), "</td>\n      < /tr>\n      < tr >\n      <td>").concat(enc('date').slice(0, 10), "</td>\n      <td style = \"text-align: right;\">").concat(enc('amount'), "</td>\n      </tr>");
  if (failed) {
    box.innerHTML = "\n      <tr>\n        <td><a href=\"".concat(utils.escapeForXML(x.uri), "\">").concat(utils.escapeForXML(failed), "</a></td>\n      </tr>");
  }
  return box;
}

/**
 * Display a trip
 * @param x Should have attributes through triples in store:
 *          * ns.dc('title') -> a literal
 *          * ns.cal('dtstart') -> a literal
 *          * ns.cal('dtend') -> a literal
 */
function twoLineTrip(dom, x) {
  var enc = function enc(p) {
    var y = _solidLogic.store.any(x, p);
    return y ? utils.escapeForXML(y.value) : '?';
  };
  var box = dom.createElement('table');
  box.innerHTML = "\n    <tr>\n      <td colspan=\"2\">".concat(enc(ns.dc('title')), "</td>\n    </tr>\n    <tr style=\"color: #777\">\n      <td>").concat(enc(ns.cal('dtstart')), "</td>\n      <td>").concat(enc(ns.cal('dtend')), "</td>\n    </tr>");
  return box;
}

/**
 * Stick a stylesheet link the document if not already there
 */
function addStyleSheet(dom, href) {
  var links = dom.querySelectorAll('link');
  for (var i = 0; i < links.length; i++) {
    if ((links[i].getAttribute('rel') || '') === 'stylesheet' && (links[i].getAttribute('href') || '') === href) {
      return;
    }
  }
  var link = dom.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', href);
  dom.getElementsByTagName('head')[0].appendChild(link);
}

// Figure (or guess) whether this is an image, etc
//
function isAudio(file) {
  return isImage(file, 'audio');
}
function isVideo(file) {
  return isImage(file, 'video');
}
/**
 *
 */
function isImage(file, kind) {
  var dcCLasses = {
    audio: 'http://purl.org/dc/dcmitype/Sound',
    image: 'http://purl.org/dc/dcmitype/Image',
    video: 'http://purl.org/dc/dcmitype/MovingImage'
  };
  var what = kind || 'image';
  // See https://github.com/linkeddata/rdflib.js/blob/e367d5088c/src/formula.ts#L554
  //
  var typeURIs = _solidLogic.store.findTypeURIs(file);
  // See https://github.com/linkeddata/rdflib.js/blob/d5000f/src/utils-js.js#L14
  // e.g.'http://www.w3.org/ns/iana/media-types/audio'
  var prefix = _rdflib.Util.mediaTypeClass(what + '/*').uri.split('*')[0];
  for (var t in typeURIs) {
    if (t.startsWith(prefix)) return true;
  }
  if (dcCLasses[what] in typeURIs) return true;
  return false;
}

/**
 * File upload button
 * @param dom The DOM aka document
 * @param  droppedFileHandler Same handler function as drop, takes array of file objects
 * @returns {Element} - a div with a button and a inout in it
 * The input is hidden, as it is uglky - the user clicks on the nice icons and fires the input.
 */
// See https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
function fileUploadButtonDiv(dom, droppedFileHandler) {
  var div = dom.createElement('div');
  var input = div.appendChild(dom.createElement('input'));
  input.setAttribute('type', 'file');
  input.setAttribute('multiple', 'true');
  input.addEventListener('change', function (event) {
    debug.log('File drop event: ', event);
    if (event.files) {
      droppedFileHandler(event.files);
    } else if (event.target && event.target.files) {
      droppedFileHandler(event.target.files);
    } else {
      alert('Sorry no files .. internal error?');
    }
  }, false);
  input.style = 'display:none';
  var buttonElt = div.appendChild(button(dom, iconBase + 'noun_Upload_76574_000000.svg', 'Upload files', function (_event) {
    input.click();
  }));
  (0, _dragAndDrop.makeDropTarget)(buttonElt, null, droppedFileHandler); // Can also just drop on button
  return div;
}
exports.index = index = {
  line: {// Approx 80em
  },
  twoLine: {
    // Approx 40em * 2.4em
    '': twoLineDefault,
    'http://www.w3.org/2000/10/swap/pim/qif#Transaction': twoLineTransaction,
    'http://www.w3.org/ns/pim/trip#Trip': twoLineTrip,
    widgetForClass: twoLineWidgetForClass
  }
};
//# sourceMappingURL=buttons.js.map