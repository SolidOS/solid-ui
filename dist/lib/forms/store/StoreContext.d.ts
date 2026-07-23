import { LiveStore } from 'rdflib';
import { default as NoopStore } from './NoopStore';
export interface StoreContext {
    store: LiveStore;
}
export declare const DEFAULT_STORE: NoopStore;
export declare const storeContext: {
    __context__: StoreContext;
};
//# sourceMappingURL=StoreContext.d.ts.map