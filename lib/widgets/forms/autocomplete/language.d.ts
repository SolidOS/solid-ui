import { NamedNode, Node } from 'rdflib';
export interface Binding {
    subject: Node;
    name?: Node;
    location?: Node;
    coordinates?: Node;
}
export declare const languageCodeURIBase = "https://www.w3.org/ns/iana/language-code/";
export declare const defaultPreferredLanguages: string[];
export declare function addDefaults(array: any): any;
export declare function getPreferredLanguagesFor(person: NamedNode): Promise<any>;
export declare function getPreferredLanguages(): Promise<any>;
export declare function filterByLanguage(bindings: any, languagePrefs: any): Binding[];
//# sourceMappingURL=language.d.ts.map