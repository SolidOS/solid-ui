import type { ComboboxOptionData } from '@/components/combobox'

export type StringComboboxOptionData = ComboboxOptionData & { value: string }

export function isHttpUri (possibleUri: string): boolean {
  return possibleUri.startsWith('http://') || possibleUri.startsWith('https://')
}

export function dedupeByKey<T> (items: T[], getKey: (item: T) => string | undefined): T[] {
  const uniqueItems = new Map<string, T>()

  for (const item of items) {
    const key = getKey(item)
    if (key && !uniqueItems.has(key)) {
      uniqueItems.set(key, item)
    }
  }

  return [...uniqueItems.values()]
}

export function dedupeComboboxOptions (options: StringComboboxOptionData[]): StringComboboxOptionData[] {
  return dedupeByKey(options, option => option.value)
}
