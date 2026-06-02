export type GetObjectKeys<T> = T extends Record<infer Key, any> ? Key : keyof T
export type GetObjectValues<T> = T extends Record<any, infer Value> ? Value : never

export const objectEntries = Object.entries.bind(Object) as <T extends Parameters<typeof Object.entries>[0]>(
  obj: T
) => [GetObjectKeys<T>, GetObjectValues<T>][]
