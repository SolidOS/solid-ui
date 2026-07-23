import { LiveStore } from 'rdflib';
import { Term, Quad_Subject, NamedNode } from 'rdflib/lib/tf-types';
export declare function loadDocument(store: LiveStore, documentSource: string, documentName: string, documentURI?: string, preferRemote?: boolean): Promise<void>;
export declare function fetchData(store: LiveStore, documentURI: string): Promise<Response>;
export declare function sortBySequence(store: LiveStore, list: Term[]): Term[];
/**
 * Which class of field is this? Relies on http://www.w3.org/2000/01/rdf-schema#subClassOf and
 * https://linkeddata.github.io/rdflib.js/doc/classes/formula.html#bottomtypeuris
 * to find the most specific RDF type if there are multiple.
 *
 * @param subject a form field, e.g. `namedNode('https://timbl.com/timbl/Public/Test/Forms/individualForm.ttl#fullNameField')`
 * @returns the URI of the most specific known class, e.g. `http://www.w3.org/ns/ui#SingleLineTextField`
 */
export declare function mostSpecificClassURI(store: LiveStore, subject: Quad_Subject): string;
export declare function findForm(store: LiveStore, sourceUri: string): NamedNode | null;
//# sourceMappingURL=rdfFormsHelper.d.ts.map