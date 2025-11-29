import { Node } from 'rdflib';
export type FieldFunction = (dom: HTMLDocument, // the DOM
container: HTMLElement | undefined, // if defined, the box will be appended to it
already: {}, // used to avoid looping in nested forms
subject: Node, // the thing for which data will be loaded into the form element
form: Node, // the RDF declaration for what the form should have
doc: Node, // the online RDF document for data binding (form input values will be read/saved automatically)
callbackFunction: (ok: boolean, errorMessage: string) => void) => HTMLElement;
export declare const field: {
    [classUri: string]: FieldFunction;
};
/**
 * Which class of field is this? Relies on http://www.w3.org/2000/01/rdf-schema#subClassOf and
 * https://linkeddata.github.io/rdflib.js/doc/classes/formula.html#bottomtypeuris
 * to find the most specific RDF type if there are multiple.
 *
 * @param x a form field, e.g. `namedNode('https://timbl.com/timbl/Public/Test/Forms/individualForm.ttl#fullNameField')`
 * @returns the URI of the most specific known class, e.g. `http://www.w3.org/ns/ui#SingleLineTextField`
 */
export declare function mostSpecificClassURI(x: Node): string;
/**
 * Returns a function that creates a form widget
 * @param dom unused
 * @param fieldInQuestion the field for which to create a form, e.g. namedNode('https://timbl.com/timbl/Public/Test/Forms/individualForm.ttl#fullNameField')
 */
export declare function fieldFunction(dom: any, fieldInQuestion: Node): FieldFunction;
//# sourceMappingURL=fieldFunction.d.ts.map