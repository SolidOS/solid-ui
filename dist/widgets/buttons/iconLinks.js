import { originalIconBase } from '../../iconBase';
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
export function linkIcon(dom, subject, iconURI) {
    const anchor = dom.createElement('a');
    anchor.setAttribute('href', subject.uri);
    if (subject.uri.startsWith('http')) {
        // If diff web page
        anchor.setAttribute('target', '_blank'); // open in a new tab or window
    } // as mailboxes and mail messages do not need new browser window
    const img = anchor.appendChild(dom.createElement('img'));
    img.setAttribute('src', iconURI || originalIconBase + 'go-to-this.png');
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
export const createLinkForURI = (dom, linkDiv, obj) => {
    const iconLink = linkIcon(dom, obj);
    const anchor = linkDiv.appendChild(iconLink);
    anchor.classList.add('HoverControlHide');
    linkDiv.appendChild(dom.createElement('br'));
};
//# sourceMappingURL=iconLinks.js.map