import { SelectOption } from "./optionTypes"

/* Move up or down, skip disabled options */
export function getNextEnabledIndex(
  currentIndex: number,
  options: SelectOption[],
  direction: 1 | -1
): number {
  if (!options.length) {
    return -1
  }

  if (options.every(option => option.disabled)) {
    return -1
  }

  const optionsCount = options.length
  let nextIndex = currentIndex

  do {
    nextIndex = (nextIndex + direction + optionsCount) % optionsCount
  } while (options[nextIndex].disabled)

  return nextIndex
}

/* Handle 'Home' and 'End' keys and initial highlight */
export function getFirstEnabledIndex(options: SelectOption[]): number {
  if (!options.length) {
    return -1
  }

  return getNextEnabledIndex(-1, options, 1)
}

export function getLastEnabledIndex(options: SelectOption[]): number {
  if (!options.length) {
    return -1
  }

  return getNextEnabledIndex(options.length, options, -1)
}

/* Sync current value to active index */
export function findOptionIndexByValue(
  options: SelectOption[],
  value?: string
): number {
  if (value === undefined) {
    return -1
  }
  return options.findIndex(option => option.value === value)
}

/* Map keyboard events to actions */
export function getListboxActionFromKey(key: string): 
  | 'open'
  | 'close'
  | 'next'
  | 'previous'
  | 'first'
  | 'last'
  | 'select'
  | 'none' {
  switch (key) {
    case 'ArrowDown':
      return 'next'
    case 'ArrowUp':
      return 'previous'
    case 'Home':
      return 'first'
    case 'End':
      return 'last'
    case 'Enter':
    case ' ':
      return 'select'
    case 'Escape':
      return 'close'
    default:
      return 'none'
  }
} 
