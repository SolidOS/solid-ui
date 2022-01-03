import { IndexedFormula, NamedNode } from 'rdflib';
export declare type FooterOptions = {
    solidProjectUrl?: string;
    solidProjectName?: string;
};
/**
 * Initialize footer component, the footer object returned depends on whether the user is authenticated.
 * @param store the data store
 * @returns the footer
 */
export declare function initFooter(store: IndexedFormula, options?: FooterOptions): Promise<void>;
/**
 * @ignore exporting this only for the unit test
 */
export declare function rebuildFooter(footer: HTMLElement, store: IndexedFormula, pod: NamedNode | null, podOwner: NamedNode | null, options?: FooterOptions): () => Promise<void>;
/**
 * @ignore exporting this only for the unit test
 */
export declare function createControllerInfoBlock(store: IndexedFormula, user: NamedNode | null, pod: NamedNode | null, podOwner: NamedNode | null, options?: FooterOptions): HTMLElement;
//# sourceMappingURL=index.d.ts.map