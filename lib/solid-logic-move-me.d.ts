import { NamedNode, Statement, IndexedFomula } from 'rdflib';
export declare const ACL_LINK: any;
export declare class SolidLogic {
    store: IndexedFomula;
    constructor(fetcher: {
        fetch: () => any;
    });
    findAclDocUrl(url: string | NamedNode): Promise<any>;
    loadDoc(profileDocument: NamedNode): Promise<void>;
    loadPreferences(me: NamedNode): Promise<NamedNode>;
    getTypeIndex(me: NamedNode | string, preferencesFile: NamedNode | string, isPublic: boolean): NamedNode[];
    getContainerElements(cont: NamedNode): any;
    getRegistrations(instance: any, theClass: any): any;
    load(doc: NamedNode | string): any;
    createEmptyRdfDoc(doc: NamedNode, comment: string): Promise<void>;
    updatePromise(del: Array<Statement>, ins?: Array<Statement>): Promise<void>;
    clearStore(): void;
}
export declare class UnauthorizedError extends Error {
    constructor(message?: string);
}
export declare class CrossOriginForbiddenError extends Error {
    constructor(message?: string);
}
export declare class SameOriginForbiddenError extends Error {
    constructor(message?: string);
}
export declare class NotFoundError extends Error {
    preferencesFile: string;
    constructor(preferencesFile: string, message?: string);
}
export declare class FetchError extends Error {
    status: number;
    constructor(status: number, message?: string);
}
//# sourceMappingURL=solid-logic-move-me.d.ts.map