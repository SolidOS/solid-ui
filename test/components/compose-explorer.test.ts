// @vitest-environment jsdom

import { describe, expect, it } from 'vitest'
import * as paneRegistry from 'pane-registry'
import type { DataBrowserContext, PaneDefinition } from 'pane-registry'
import { solidLogicSingleton } from 'solid-logic'
import '../../src/components/file-explorer-provider'
import '../../src/components/file-explorer-header'
import { isExplorerEvent } from '../../src/lib/file-explorer/events'
import { composeExplorer } from '../../src/lib/file-explorer/compose-explorer'

const context: DataBrowserContext = {
  dom: document,
  getOutliner: () => undefined,
  session: { paneRegistry, store: solidLogicSingleton.store, logic: solidLogicSingleton }
}
const pane: PaneDefinition = {
  name: 'test',
  icon: '',
  label: () => 'Test',
  render: () => document.createElement('div')
}
const composition = {
  context,
  subjectUri: 'https://example.test/resource',
  pane,
  relevantPanes: [pane],
  header: { paneIcon: '', menuItems: [] }
}

describe('explorer composition', () => {
  it('places the header first and pane content after it, with provider context', () => {
    const provider = document.createElement('solid-ui-file-explorer-provider')
    const paneElement = document.createElement('div')
    composeExplorer(provider, { ...composition, paneElement })

    expect(provider.context).toBe(context)
    expect(provider.subjectUri).toBe(composition.subjectUri)
    expect(provider.pane).toBe(pane)
    expect(provider.relevantPanes).toBe(composition.relevantPanes)
    expect(provider.firstElementChild?.localName).toBe('solid-ui-file-explorer-header')
    expect(provider.lastElementChild).toBe(paneElement)
    expect(paneElement.classList.contains('paneDiv')).toBe(true)
  })

  it('reuses the header and preserves content during a menu-only update', () => {
    const provider = document.createElement('solid-ui-file-explorer-provider')
    const paneElement = document.createElement('div')
    composeExplorer(provider, { ...composition, paneElement })
    const header = provider.firstElementChild
    const menuItems = [{ label: 'Other pane', action: () => {} }]
    composeExplorer(provider, { ...composition, header: { paneIcon: '', menuItems } })

    expect(provider.firstElementChild).toBe(header)
    expect(provider.querySelector('solid-ui-file-explorer-header')?.menuItems).toBe(menuItems)
    expect(provider.lastElementChild).toBe(paneElement)
    expect(provider.children).toHaveLength(2)
  })

  it('hides and restores only the outer header without touching nested explorers', () => {
    const outer = document.createElement('solid-ui-file-explorer-provider')
    const inner = document.createElement('solid-ui-file-explorer-provider')
    composeExplorer(inner, { ...composition, paneElement: document.createElement('div') })
    const innerHeader = inner.firstElementChild
    const content = document.createElement('div')
    content.appendChild(inner)
    composeExplorer(outer, { ...composition, paneElement: content })

    composeExplorer(outer, { ...composition, header: undefined })
    expect(outer.firstElementChild).toBe(content)
    expect(inner.firstElementChild).toBe(innerHeader)

    composeExplorer(outer, composition)
    expect(outer.firstElementChild?.localName).toBe('solid-ui-file-explorer-header')
    expect(outer.lastElementChild).toBe(content)
    expect(inner.firstElementChild).toBe(innerHeader)
  })

  it('replaces only direct pane content even when the current pane is a provider', () => {
    const outer = document.createElement('solid-ui-file-explorer-provider')
    const inner = document.createElement('solid-ui-file-explorer-provider')
    const innerContent = document.createElement('div')
    composeExplorer(inner, { ...composition, paneElement: innerContent })
    composeExplorer(outer, { ...composition, paneElement: inner })

    const replacement = document.createElement('div')
    composeExplorer(outer, { ...composition, paneElement: replacement })
    expect(outer.lastElementChild).toBe(replacement)
    expect(inner.lastElementChild).toBe(innerContent)
    expect(outer.contains(inner)).toBe(false)
  })

  it('identifies the nearest provider for bubbling events', () => {
    const outer = document.createElement('solid-ui-file-explorer-provider')
    const inner = document.createElement('solid-ui-file-explorer-provider')
    const header = document.createElement('div')
    inner.appendChild(header)
    outer.appendChild(inner)
    const owners: boolean[] = []
    inner.addEventListener('test-explorer', event => owners.push(isExplorerEvent(event, inner)))
    outer.addEventListener('test-explorer', event => owners.push(isExplorerEvent(event, outer)))

    header.dispatchEvent(new CustomEvent('test-explorer', { bubbles: true, composed: true }))
    expect(owners).toEqual([true, false])
  })
})
