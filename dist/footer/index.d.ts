import { LiveStore, NamedNode } from 'rdflib';
export type FooterOptions = {
    solidProjectUrl?: string;
    solidProjectName?: string;
};
/**
 * Initialize footer component, the footer object returned depends on whether the user is authenticated.
 * @param store the data store
 * @returns the footer
 */
export declare function initFooter(store: LiveStore, options?: FooterOptions): Promise<void>;
/**
 * @ignore exporting this only for the unit test
 */
export declare function rebuildFooter(footer: HTMLElement, store: LiveStore, pod: NamedNode | null, podOwner: NamedNode | null, options?: FooterOptions): () => Promise<void>;
/**
 * @ignore exporting this only for the unit test
 */
export declare function createControllerInfoBlock(store: LiveStore, user: NamedNode | null, pod: NamedNode | null, podOwner: NamedNode | null, options?: FooterOptions): HTMLElement;
//# sourceMappingURL=index.d.ts.map