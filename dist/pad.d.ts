/** **************
 *   Notepad Widget
 */
import { NamedNode, IndexedFormula } from 'rdflib';
export { renderParticipants, participationObject, manageParticipation, recordParticipation } from './participation';
type notepadOptions = {
    statusArea?: HTMLDivElement;
    exists?: boolean;
};
/** Figure out a random color from my webid
 *
 * @param {NamedNode} author - The author of text being displayed
 * @returns {String} The CSS color generated, constrained to be light for a background color
 */
export declare function lightColorHash(author?: NamedNode): string;
/**  notepad
 *
 * @param {HTMLDocument} dom - the web page of the browser
 * @param {NamedNode} padDoc - the document in which the participation should be shown
 * @param {NamedNode} subject - the thing in which participation is happening
 * @param {NamedNode} me - person who is logged into the pod
 * @param {notepadOptions} options - the options that can be passed in consist of statusArea, exists
 */
export declare function notepad(dom: HTMLDocument, padDoc: NamedNode, subject: NamedNode, me: NamedNode, options?: notepadOptions): any;
/**
 * Get the chunks of the notepad
 * They are stored in a RDF linked list
 */
export declare function getChunks(subject: NamedNode, kb: IndexedFormula): any[];
/**
 *  Encode content to be put in XML or HTML elements
 */
export declare function xmlEncode(str: any): any;
/**
 * Convert a notepad to HTML
 *   @param { } pad - the notepad
 *   @param {store} pad - the data store
 */
export declare function notepadToHTML(pad: any, kb: IndexedFormula): string;
//# sourceMappingURL=pad.d.ts.map