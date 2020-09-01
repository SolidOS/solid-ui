import { NamedNode } from 'rdflib';
declare type ThrottleOptions = {
    leading?: boolean;
    throttling?: boolean;
    trailing?: boolean;
};
/**
 * @ignore exporting this only for the unit test
 */
export declare function addStyleClassToElement(element: any, styleClasses: string[]): void;
/**
 * @ignore exporting this only for the unit test
 */
export declare function getPod(): NamedNode;
/**
 * @ignore exporting this only for the unit test
 */
export declare function throttle(func: Function, wait: number, options?: ThrottleOptions): (...args: any[]) => any;
export {};
//# sourceMappingURL=headerHelpers.d.ts.map