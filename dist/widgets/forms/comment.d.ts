/**
 * A [[FieldFunction]] for a simple comment box. It will look for
 * the first (form, ns.ui('contents'), ?) triple it can find in
 * store and use the value of the object of that triple as
 * the comment text.
 *
 * @param dom The DOM
 * @param container If set, the result will be appended to it as a child
 * @param already Unused
 * @param subject Unused
 * @param form RDF node with `ns.ui('contents')` attribute
 * @param _doc Unused
 * @param _callbackFunction Unused
 *
 * @returns a DOM element containing the comment.
 */
export declare function commentField(dom: HTMLDocument, container: HTMLElement | undefined, already: any, subject: any, form: any, _doc: any, _callbackFunction: any): HTMLDivElement;
//# sourceMappingURL=comment.d.ts.map