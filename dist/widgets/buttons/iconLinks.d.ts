import { NamedNode } from 'rdflib';
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
export declare function linkIcon(dom: HTMLDocument, subject: NamedNode, iconURI?: string): HTMLElement;
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
export declare const createLinkForURI: (dom: HTMLDocument, linkDiv: HTMLDivElement, obj: NamedNode) => void;
//# sourceMappingURL=iconLinks.d.ts.map