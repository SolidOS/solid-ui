import { NamedNode } from 'rdflib';
type ParticipationOptions = {
    deleteFunction?: () => {};
    link?: string;
    draggable?: boolean;
};
declare class ParticipationTableElement extends HTMLTableElement {
    refresh?: () => void;
}
/**  Manage participation in this session
*
*  @param {Document} dom - the web page loaded into the browser
*  @param {HTMLTableElement} table - the table element
*  @param {NamedNode} unused1/document - the document to render (this argument is no longer used, but left in for backwards compatibility)
*  @param {NamedNode} subject - the thing in which the participation is happening
*  @param {NamedNode} unused2/me - user that is logged into the pod (this argument is no longer used, but left in for backwards compatibility)
*  @param {ParticipationOptions} options - the options that can be passed in are deleteFunction, link, and draggable; these are used by the personTR button
*/
export declare function renderParticipants(dom: HTMLDocument, table: ParticipationTableElement, unused1: NamedNode, subject: NamedNode, unused2: NamedNode, options: ParticipationOptions): ParticipationTableElement;
/** Record, or find old, Participation object
 *
 * A participation object is a place to record things specifically about
 * subject and the user, such as preferences, start of membership, etc
 * @param {NamedNode} subject - the thing in which the participation is happening
 * @param {NamedNode} document -  where to record the data
 * @param {NamedNode} me - the logged in user
 *
 */
export declare function participationObject(subject: NamedNode, padDoc: NamedNode, me: NamedNode): Promise<unknown>;
/** Record my participation and display participants
 *
 * @param {NamedNode} subject - the thing in which participation is happening
 * @param {NamedNode} padDoc - the document into which the participation should be recorded
 * @param {DOMNode} refreshable - a DOM element whose refresh() is to be called if the change works
 *
 */
export declare function recordParticipation(subject: NamedNode, padDoc: NamedNode, refreshable: any): any;
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
export declare function manageParticipation(dom: Document, container: HTMLDivElement, padDoc: NamedNode, subject: NamedNode, me: NamedNode, options: ParticipationOptions): HTMLTableElement;
export {};
//# sourceMappingURL=participation.d.ts.map