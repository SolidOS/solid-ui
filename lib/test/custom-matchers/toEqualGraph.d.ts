import { IndexedFormula } from 'rdflib';
export declare function toEqualGraph(received: IndexedFormula, expected: IndexedFormula): {
    pass: boolean;
    message: () => string;
};
declare global {
    namespace jest {
        interface Matchers<R> {
            toEqualGraph(a: IndexedFormula): R;
        }
    }
}
//# sourceMappingURL=toEqualGraph.d.ts.map