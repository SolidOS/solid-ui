import type { ComboboxOptionData } from '@/components/combobox'

export type StringComboboxOptionData = ComboboxOptionData & { value: string }

export function isAbsoluteHttpUri (value: string): boolean {
  try {
    const url = new URL(value)
    return (url.protocol === 'http:' || url.protocol === 'https:') && Boolean(url.hostname)
  } catch {
    return false
  }
}

export function isOriginUrl (value: string): boolean {
  if (!isAbsoluteHttpUri(value)) {
    return false
  }

  const url = new URL(value)
  return url.pathname === '/' &&
    !url.search &&
    !url.hash &&
    !url.username &&
    !url.password
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
