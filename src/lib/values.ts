export function isEmptyValue (value: unknown): boolean {
  return value === null || value === undefined || value === ''
}
