import { IndexedFormula, LiveStore, NamedNode } from 'rdflib';
type ThrottleOptions = {
    leading?: boolean;
    throttling?: boolean;
    trailing?: boolean;
};
/**
 * @ignore exporting this only for the unit test
 */
export declare function getPod(): NamedNode;
/**
 */
export declare function getPodOwner(pod: NamedNode, store: LiveStore): Promise<NamedNode | null>;
/**
 * @ignore exporting this only for the unit test
 */
export declare function getName(store: IndexedFormula, user: NamedNode): string;
/**
 * @ignore exporting this only for the unit test
 */
export declare function throttle(func: Function, wait: number, options?: ThrottleOptions): (...args: any[]) => any;
export {};
//# sourceMappingURL=headerFooterHelpers.d.ts.map