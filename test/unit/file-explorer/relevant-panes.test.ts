import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { DataBrowserContext, PaneDefinition } from 'pane-registry'
import { sym } from 'rdflib'
import { solidLogicSingleton } from 'solid-logic'
import { filterAvailablePanes } from '../../../src/login/login'
import ns from '../../../src/lib/ns'
import { getPreferredPane, getRelevantPanes } from '../../../src/lib/file-explorer/relevant-panes'

vi.mock('../../../src/login/login', () => ({
  filterAvailablePanes: vi.fn()
}))

const subject = sym('https://example.test/resource')

function createPane (name: string, properties: Partial<PaneDefinition> = {}): PaneDefinition {
  return {
    name,
    icon: '',
    label: () => name,
    render: () => document.createElement('div'),
    ...properties
  }
}

function createContext (panes: PaneDefinition[]): DataBrowserContext {
  return {
    dom: document,
    getOutliner: () => undefined,
    session: {
      logic: solidLogicSingleton,
      store: solidLogicSingleton.store,
      paneRegistry: {
        list: panes,
        paneForIcon: {},
        paneForPredicate: {},
        register: vi.fn(),
        byName: name => panes.find(pane => pane.name === name) || null
      }
    }
  }
}

describe('getRelevantPanes', () => {
  beforeEach(() => {
    vi.mocked(filterAvailablePanes).mockReset()
    vi.mocked(filterAvailablePanes).mockImplementation(async panes => panes)
  })

  it('preserves registry order when all relevant panes are available', async () => {
    const panes = [createPane('first'), createPane('second')]

    expect(await getRelevantPanes(subject, createContext(panes))).toEqual(panes)
    expect(filterAvailablePanes).toHaveBeenCalledWith(panes)
  })

  it('preserves the first relevant pane when audience filtering removes every pane', async () => {
    const first = createPane('first')
    const second = createPane('second')
    const fallback = createPane('internal', { label: () => null })
    vi.mocked(filterAvailablePanes).mockResolvedValue([])

    expect(await getRelevantPanes(subject, createContext([first, second, fallback]), {
      fallbackPaneName: 'internal'
    })).toEqual([first])
  })

  it('prepends the first relevant pane when audience filtering removes it', async () => {
    const first = createPane('first')
    const second = createPane('second')
    const third = createPane('third')
    vi.mocked(filterAvailablePanes).mockResolvedValue([second, third])

    expect(await getRelevantPanes(subject, createContext([first, second, third]))).toEqual([
      first, second, third
    ])
  })

  it('does not restore other audience-filtered panes or duplicate the first pane', async () => {
    const first = createPane('first')
    const second = createPane('second')
    const third = createPane('third')
    vi.mocked(filterAvailablePanes).mockResolvedValue([first, third])

    expect(await getRelevantPanes(subject, createContext([first, second, third]))).toEqual([
      first, third
    ])
  })

  it('does not restore global, excluded, or nonmatching panes as the first relevant pane', async () => {
    const global = createPane('global', { global: true })
    const excluded = createPane('sharing')
    const nonmatching = createPane('nonmatching', { label: () => null })
    const first = createPane('first')
    const second = createPane('second')
    const context = createContext([global, excluded, nonmatching, first, second])
    vi.mocked(filterAvailablePanes).mockResolvedValue([])

    expect(await getRelevantPanes(subject, context, {
      excludedPaneNames: ['sharing']
    })).toEqual([first])
    expect(filterAvailablePanes).toHaveBeenCalledWith([first, second])
  })

  it('uses the configured fallback without audience filtering when no pane is relevant', async () => {
    const fallback = createPane('internal', { label: () => null })

    expect(await getRelevantPanes(subject, createContext([fallback]), {
      fallbackPaneName: 'internal'
    })).toEqual([fallback])
    expect(filterAvailablePanes).not.toHaveBeenCalled()
  })

  it('returns an empty list when no pane is relevant and no fallback is configured', async () => {
    expect(await getRelevantPanes(subject, createContext([]))).toEqual([])
    expect(filterAvailablePanes).not.toHaveBeenCalled()
  })

  it('returns an empty list when the configured fallback is not registered', async () => {
    expect(await getRelevantPanes(subject, createContext([]), {
      fallbackPaneName: 'missing'
    })).toEqual([])
    expect(filterAvailablePanes).not.toHaveBeenCalled()
  })

  it('propagates audience-filtering errors instead of hiding them with a fallback', async () => {
    const error = new Error('Unable to load audience roles')
    vi.mocked(filterAvailablePanes).mockRejectedValue(error)

    await expect(getRelevantPanes(subject, createContext([createPane('first')]))).rejects.toBe(error)
  })
})

describe('getPreferredPane', () => {
  function contextWithMintClass (mintClass?: string): DataBrowserContext {
    const store = Object.create(solidLogicSingleton.store)
    store.any = vi.fn((candidate, predicate) => {
      if (mintClass && candidate.sameTerm(subject) && predicate.sameTerm(ns.ui('mintClass'))) {
        return sym(mintClass)
      }
      return undefined
    })
    return {
      dom: document,
      getOutliner: () => undefined,
      session: {
        logic: solidLogicSingleton,
        store,
        paneRegistry: {
          list: [],
          paneForIcon: {},
          paneForPredicate: {},
          register: vi.fn(),
          byName: () => null
        }
      }
    }
  }

  it('prefers the pane matching a resource mint class over a focus request', () => {
    const mintClass = sym('https://schema.example/PhotoAlbum')
    const focus = createPane('focus', { shouldGetFocus: () => true })
    const minted = createPane('album', { mintClass })

    expect(getPreferredPane(subject, contextWithMintClass(mintClass.uri), [focus, minted])).toBe(minted)
  })

  it('uses a focus request when no relevant pane matches the mint class', () => {
    const focus = createPane('focus', { shouldGetFocus: () => true })
    const other = createPane('other', { mintClass: sym('https://schema.example/Other') })

    expect(getPreferredPane(subject, contextWithMintClass('https://schema.example/PhotoAlbum'), [other, focus])).toBe(focus)
  })

  it('falls back to registry order when no pane requests focus', () => {
    const first = createPane('first')
    const second = createPane('second')

    expect(getPreferredPane(subject, contextWithMintClass(), [first, second])).toBe(first)
  })
})
