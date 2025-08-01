import { IndexedFormula, NamedNode } from 'rdflib';
export type StatusAreaContext = {
    statusArea?: HTMLElement;
    div?: HTMLElement;
    dom?: HTMLDocument;
};
export type ButtonType = 'Primary' | 'Secondary';
export type ButtonWidgetOptions = {
    buttonColor?: ButtonType;
    needsBorder?: boolean;
};
export type RenderAsDivOptions = {
    image?: HTMLImageElement;
    title?: string;
    deleteFunction?: () => void;
    link?: boolean;
    noun?: string;
    draggable?: boolean;
    clickable?: boolean;
    onClickFunction?: () => void;
    wrapInATR?: boolean;
};
/**
 * Display an error message block
 */
export declare function complain(context?: StatusAreaContext, err?: string): void;
/**
 * Remove all the children of an HTML element
 */
export declare function clearElement(ele: HTMLElement): HTMLElement;
/**
 * To figure out the log URI from the full URI used to invoke the reasoner
 */
export declare function extractLogURI(fullURI: any): any;
/**
 * By default, converts e.g. '2020-02-19T19:35:28.557Z' to '19:35'
 * if today is 19 Feb 2020, and to 'Feb 19' if not.
 * @@@ TODO This needs to be changed to local time
 * @param noTime Return a string like 'Feb 19' even if it's today.
 */
export declare function shortDate(str?: string, noTime?: boolean): string;
/**
 * Format a date and time
 * @param date for instance `new Date()`
 * @param format  for instance '{FullYear}-{Month}-{Date}T{Hours}:{Minutes}:{Seconds}.{Milliseconds}'
 * @returns for instance '2000-01-15T23:14:23.002'
 */
export declare function formatDateTime(date: Date, format: string): string;
/**
 * Get a string representation of the current time
 * @returns for instance '2000-01-15T23:14:23.002'
 */
export declare function timestamp(): string;
/**
 * Get a short string representation of the current time
 * @returns for instance '23:14:23.002'
 */
export declare function shortTime(): string;
/**
 * Sets the best name we have and looks up a better one
 */
export declare function setName(element: HTMLElement, x: NamedNode): void;
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
export declare function imagesOf(x: NamedNode | null, kb: IndexedFormula): any[];
/**
 * Best logo or avatar or photo etc to represent someone or some group etc
 */
export declare const iconForClass: {
    'solid:AppProviderClass': string;
    'solid:AppProvider': string;
    'solid:Pod': string;
    'vcard:Group': string;
    'vcard:Organization': string;
    'vcard:Individual': string;
    'schema:Person': string;
    'foaf:Person': string;
    'foaf:Agent': string;
    'acl:AuthenticatedAgent': string;
    'prov:SoftwareAgent': string;
    'vcard:AddressBook': string;
    'trip:Trip': string;
    'meeting:LongChat': string;
    'meeting:Meeting': string;
    'meeting:Project': string;
    'ui:Form': string;
    'rdfs:Class': string;
    'rdf:Property': string;
    'owl:Ontology': string;
    'wf:Tracker': string;
    'wf:Task': string;
    'wf:Open': string;
    'wf:Closed': string;
};
/**
 * Find an image for this thing as a class
 */
export declare function findImageFromURI(x: NamedNode | string): string | null;
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
export declare function findImage(thing: NamedNode): string;
/**
 * ToDo: Also add icons for *properties* like  home, work, email, range, domain, comment,
 */
export declare function setImage(element: HTMLElement, thing: NamedNode): void;
export declare function faviconOrDefault(dom: HTMLDocument, x: NamedNode): HTMLObjectElement | HTMLImageElement;
/**
 * Delete button with a check you really mean it
 * @@ Supress check if command key held down?
 */
export declare function deleteButtonWithCheck(dom: HTMLDocument, container: HTMLElement, noun: string, deleteFunction: () => any): HTMLImageElement;
export declare function button(dom: HTMLDocument, iconURI: string | undefined, text: string, handler?: (_event: any) => void, options?: ButtonWidgetOptions): HTMLButtonElement;
export declare function cancelButton(dom: HTMLDocument, handler: (_event?: any) => void): HTMLButtonElement;
export declare function continueButton(dom: HTMLDocument, handler: (_event: any) => void): HTMLButtonElement;
export declare function askName(dom: HTMLDocument, kb: IndexedFormula, container: HTMLDivElement, predicate?: NamedNode, theClass?: NamedNode, noun?: string): Promise<unknown>;
/**
 * A TR to represent a draggable person, etc in a list
 *
 * pred is unused param at the moment
 */
export declare const personTR: typeof renderAsRow;
export declare function renderAsRow(dom: HTMLDocument, pred: NamedNode, obj: NamedNode, options: any): HTMLTableRowElement;
export declare function createNameDiv(dom: HTMLDocument, div: HTMLDivElement, title: string | undefined, obj: NamedNode): void;
export declare function createLinkDiv(dom: HTMLDocument, div: HTMLDivElement, obj: NamedNode, options: RenderAsDivOptions): void;
/**
 * A Div to represent a draggable person, etc in a list
 * configurable to add an onClick listener
 */
export declare function renderAsDiv(dom: HTMLDocument, obj: NamedNode, options: RenderAsDivOptions): HTMLElement;
/**
 * Refresh a DOM tree recursively
 */
export declare function refreshTree(root: any): void;
/**
 * Options argument for [[attachmentList]] function
 */
export type attachmentListOptions = {
    doc?: NamedNode;
    modify?: boolean;
    promptIcon?: string;
    predicate?: NamedNode;
    uploadFolder?: NamedNode;
    noun?: string;
};
/**
 * Component that displays a list of resources, for instance
 * the attachments of a message, or the various documents related
 * to a meeting.
 * Accepts dropping URLs onto it to add attachments to it.
 */
export declare function attachmentList(dom: HTMLDocument, subject: NamedNode, div: HTMLElement, options?: attachmentListOptions): HTMLTableElement;
/**
 * Event Handler for links within solid apps.
 *
 * Note that native links have constraints in Firefox, they
 * don't work with local files for instance (2011)
 */
export declare function openHrefInOutlineMode(e: Event): void;
/**
 * Make a URI in the Tabulator.org annotation store out of the URI of the thing to be annotated.
 *
 * @@ Todo: make it a personal preference.
 */
export declare function defaultAnnotationStore(subject: NamedNode): NamedNode | undefined;
/**
 * Retrieve all RDF class URIs from solid-ui's RDF store
 * @returns an object `ret` such that `Object.keys(ret)` is
 * the list of all class URIs.
 */
export declare function allClassURIs(): {
    [uri: string]: boolean;
};
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
export declare function propertyTriage(kb: IndexedFormula): any;
/**
 * General purpose widgets
 */
/**
 * A button for jumping
 */
export declare function linkButton(dom: HTMLDocument, object: NamedNode): HTMLElement;
/**
 * A button to remove some other element from the page
 */
export declare function removeButton(dom: HTMLDocument, element: HTMLElement): HTMLButtonElement;
export declare function selectorPanel(dom: HTMLDocument, kb: IndexedFormula, type: NamedNode, predicate: NamedNode, inverse: boolean, possible: NamedNode[], options: {
    connectIcon?: string;
}, callbackFunction: (_x: NamedNode, _e: Event, _selected: boolean) => void, linkCallback: (_x: NamedNode, _e: Event, _inverse: boolean, _setStyleFunction: () => void) => void): HTMLElement;
export declare function selectorPanelRefresh(list: HTMLElement, dom: HTMLDocument, kb: IndexedFormula, type: NamedNode, predicate: NamedNode, inverse: boolean, possible: NamedNode[], options: {
    connectIcon?: string;
}, callbackFunction: (_x: NamedNode, _e: Event, _selected: boolean) => void, linkCallback: (_x: NamedNode, _e: Event, _inverse: boolean, _setStyleFunction: () => void) => void): HTMLElement;
export declare let index: any;
/**
 * Stick a stylesheet link the document if not already there
 */
export declare function addStyleSheet(dom: HTMLDocument, href: string): void;
export declare function isAudio(file?: NamedNode): boolean;
export declare function isVideo(file?: NamedNode): boolean;
/**
 *
 */
export declare function isImage(file?: NamedNode, kind?: string): boolean;
/**
 * File upload button
 * @param dom The DOM aka document
 * @param  droppedFileHandler Same handler function as drop, takes array of file objects
 * @returns {Element} - a div with a button and a inout in it
 * The input is hidden, as it is uglky - the user clicks on the nice icons and fires the input.
 */
export declare function fileUploadButtonDiv(dom: HTMLDocument, droppedFileHandler: (_files: FileList) => void): HTMLDivElement;
//# sourceMappingURL=buttons.d.ts.map