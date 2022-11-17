"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLinkForURI = void 0;
exports.linkIcon = linkIcon;
var _iconBase = require("../../iconBase");
/**
 * Creates an anchor tag for a NamedNode
 *
 * Takes a NamedNode and creates an anchor tag for it
 *
 * @param dom The HTML Document object aka Document Object Model
 * @param subject NamedNode the anchor tag is created for
 * @param iconURI? Optional if you have your own icon link
 *
 * @returns The anchor tag for the subject
 *
 */
// eslint-disable-next-line complexity
function linkIcon(dom, subject, iconURI) {
  var anchor = dom.createElement('a');
  anchor.setAttribute('href', subject.uri);
  if (subject.uri.startsWith('http')) {
    // If diff web page
    anchor.setAttribute('target', '_blank'); // open in a new tab or window
  } // as mailboxes and mail messages do not need new browser window
  var img = anchor.appendChild(dom.createElement('img'));
  img.setAttribute('src', iconURI || _iconBase.originalIconBase + 'go-to-this.png');
  img.setAttribute('style', 'margin: 0.3em;');
  return anchor;
}
/**
 * Creates a Link for a URI
 *
 * Takes a div element for a link and attaches the provided linkIcon
 *
 * @param dom The HTML Document object aka Document Object Model
 * @param linkDiv the created link will be appended to this
 * @param obj NamedNode the link needs to be created for
 *
 * @returns The HTML widget created
 *
 */
// eslint-disable-next-line complexity
var createLinkForURI = function createLinkForURI(dom, linkDiv, obj) {
  var iconLink = linkIcon(dom, obj);
  var anchor = linkDiv.appendChild(iconLink);
  anchor.classList.add('HoverControlHide');
  linkDiv.appendChild(dom.createElement('br'));
};
exports.createLinkForURI = createLinkForURI;
//# sourceMappingURL=iconLinks.js.map