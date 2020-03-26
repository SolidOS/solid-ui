import { IndexedFormula } from 'rdflib';
export declare function toContainGraph(received: IndexedFormula, expected: IndexedFormula): {
    pass: boolean;
    message: () => string;
};
declare global {
    namespace jest {
        interface Matchers<R> {
            toContainGraph(a: IndexedFormula): R;
        }
    }
}
//# sourceMappingURL=toContainGraph.d.ts.map