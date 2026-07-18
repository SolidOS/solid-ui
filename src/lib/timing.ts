export interface DebouncedFunction<Args extends any[]> {
  (...args: Args): void;
  cancel(): void;
}

export function debounce<Args extends any[]> (
  delay: number,
  callback: (...args: Args) => unknown
): DebouncedFunction<Args> {
  let timeout: ReturnType<typeof setTimeout> | null = null

  const debouncedCallback: DebouncedFunction<Args> = (...args: Args) => {
    debouncedCallback.cancel()
    timeout = setTimeout(() => callback(...args), delay)
  }

  debouncedCallback.cancel = () => {
    if (timeout === null) {
      return
    }

    clearTimeout(timeout)
    timeout = null
  }

  return debouncedCallback
}
