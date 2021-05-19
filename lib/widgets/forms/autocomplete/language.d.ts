import { NamedNode, Node } from 'rdflib';
export interface Binding {
    subject: Node;
    name?: Node;
    location?: Node;
    coordinates?: Node;
}
export declare const languageCodeURIBase = "https://www.w3.org/ns/iana/language-code/";
export declare const defaultPreferedLangages: string[];
export declare function getPreferredLanagugesFor(person: NamedNode): Promise<string[] | null>;
export declare function getPreferredLanguages(): Promise<string[]>;
export declare function filterByLanguage(bindings: any, languagePrefs: any): Binding[];
//# sourceMappingURL=language.d.ts.map