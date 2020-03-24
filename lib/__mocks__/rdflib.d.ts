export { BlankNode, Collection, convert, DataFactory, Empty, Formula, Literal, log, NamedNode, Namespace, Node, parse, Query, Statement, term, uri, Util, Variable, NextId, fromNT, graph, lit, st, namedNode as sym, blankNode, defaultGraph, literal, namedNode, quad, triple, variable } from 'rdflib';
export declare function fetcher(store: any): Fetcher;
export declare class Fetcher {
    requested: any;
    constructor();
    load(): void;
    nowOrWhenFetched(): Promise<void>;
}
export declare class UpdateManager {
    updated: boolean;
    reportSuccess: boolean;
    editable(uri: string): boolean;
    put(): Promise<void>;
    update(_deletes: any, _inserts: any, onDone: (uri: string, ok: boolean, body: string) => void): Promise<void>;
}
//# sourceMappingURL=rdflib.d.ts.map