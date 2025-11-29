import { BlankNode, NamedNode, Node, Store, Variable } from 'rdflib';
export declare function renderNameValuePair(dom: HTMLDocument, kb: Store, box: HTMLElement, form: NamedNode, label?: string): HTMLElement;
/**
 * Create an anchor element with a label as the anchor text.
 *
 * @param dom The DOM
 * @param property href for the anchor element
 * @param fieldInQuestion field to produce a label for
 *
 * @internal exporting this only for unit tests
 */
export declare function fieldLabel(dom: HTMLDocument, property: NamedNode | undefined, fieldInQuestion: Node): HTMLElement | Text;
/**
 * Returns the document for the first quad that matches
 * the subject and predicate provided, or default if that
 * store is not editable.
 *
 * @param subject Subject about which we want to find an editable RDF document
 * @param predicate Predicate about which we want to find an editable RDF document
 * @param def default RDF document to return if none found
 *
 * @internal exporting this only for unit tests
 */
export declare function fieldStore(subject: NamedNode | BlankNode | Variable, predicate: NamedNode | Variable, def: NamedNode | undefined): NamedNode | undefined;
/**
 * Render a basic form field
 *
 * The same function is used for many similar one-value fields, with different
 * regexps used to validate.
 *
 * @param dom The HTML Document object aka Document Object Model
 * @param container  If present, the created widget will be appended to this
 * @param already A hash table of (form, subject) kept to prevent recursive forms looping
 * @param subject The thing about which the form displays/edits data
 * @param form The form or field to be rendered
 * @param doc The web document in which the data is
 * @param callbackFunction Called when data is changed?
 *
 * @returns The HTML widget created
 */
export declare function basicField(dom: HTMLDocument, container: HTMLElement | undefined, already: any, subject: NamedNode | BlankNode | Variable, form: NamedNode, doc: NamedNode | undefined, callbackFunction: (_ok: boolean, _errorMessage: string) => void): HTMLElement;
//# sourceMappingURL=basic.d.ts.map