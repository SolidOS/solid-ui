import { store } from 'solid-logic'
import { vi } from 'vitest'

const realFetcherLoad = store.fetcher.load.bind(store.fetcher)

export function stubFetcherLoad (): void {
  store.fetcher.load = vi.fn().mockResolvedValue(undefined) as typeof store.fetcher.load
}

export function restoreFetcherLoad (): void {
  store.fetcher.load = realFetcherLoad
}
