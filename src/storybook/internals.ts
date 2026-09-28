export type Override<T, TOverrides> = Omit<T, keyof TOverrides> & TOverrides

// @ts-expect-error Allow internal access
export type Internals<TObject, TMethods extends string> = { [K in TMethods]: TObject[K] }

export function internals<T, TMethods extends string> (object: T, methods: TMethods[]): Override<T, Internals<T, TMethods>> {
  return object as Override<T, Internals<T, TMethods>>
}
