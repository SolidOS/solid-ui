import { NamedNode } from 'rdflib';
declare type ThrottleOptions = {
    leading?: boolean;
    throttling?: boolean;
    trailing?: boolean;
};
export declare function getPod(): NamedNode;
export declare function throttle(func: Function, wait: number, options?: ThrottleOptions): (...args: any[]) => any;
export {};
//# sourceMappingURL=headerHelpers.d.ts.map