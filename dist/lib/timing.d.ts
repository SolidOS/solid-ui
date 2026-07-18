export interface DebouncedFunction<Args extends any[]> {
    (...args: Args): void;
    cancel(): void;
}
export declare function debounce<Args extends any[]>(delay: number, callback: (...args: Args) => unknown): DebouncedFunction<Args>;
//# sourceMappingURL=timing.d.ts.map