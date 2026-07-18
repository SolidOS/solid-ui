export type Override<T, TOverrides> = Omit<T, keyof TOverrides> & TOverrides;
export type Internals<TObject, TMethods extends string> = {
    [K in TMethods]: TObject[K];
};
export declare function internals<T, TMethods extends string>(object: T, methods: TMethods[]): Override<T, Internals<T, TMethods>>;
//# sourceMappingURL=internals.d.ts.map