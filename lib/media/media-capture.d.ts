import { IndexedFormula, NamedNode } from 'rdflib';
/** A control to capture a picture using camera
 * @param {Docuemnt} dom - The Document object
 * @param {IndexedForumla} store - The quadstore to store data in
 * @param {NamedNode} getImageDoc() - NN of the image file to be created
 * @param {function} doneCallback - Called when a picture has been taken
 */
export declare function cameraCaptureControl(dom: HTMLDocument, store: IndexedFormula, getImageDoc: () => NamedNode, doneCallback: (imageDoc: any) => Promise<void>): HTMLDivElement;
/** A button to capture a picture using camera
 * @param {Docuemnt} dom - The Document object
 * @param {IndexedForumla} store - The quadstore to store data in
 * @param {fuunction} getImageDoc - returns NN of the image file to be created
 * @param {function<Node>} doneCallback - called with the image taken
 * @returns {DomElement} - A div element with the button in it
 *
 * This expands the button to a large control when it is pressed
 */
export declare function cameraButton(dom: HTMLDocument, store: IndexedFormula, getImageDoc: () => NamedNode, doneCallback: (imageDoc: any) => Promise<void>): HTMLElement;
//# sourceMappingURL=media-capture.d.ts.map