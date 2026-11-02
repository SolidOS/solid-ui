import { describe, expect, it, vi } from 'vitest'
import type { DataBrowserContext } from 'pane-registry'
import { sym } from 'rdflib'
import {
  preparePaneMenuItems,
  type PaneIconResolver,
  type PaneMenuPane
} from '../../../src/lib/file-explorer/pane-menu-items'

const subject = sym('https://example.test/resource')
const context = {} as DataBrowserContext

function createPane (name: string, icon: string | PaneIconResolver): PaneMenuPane {
  return {
    name,
    icon,
    label: () => name,
    render: () => document.createElement('div')
  }
}

describe('preparePaneMenuItems', () => {
  it('prepares labeled pane actions in caller-provided order', async () => {
    const openPane = vi.fn()
    const panes = [createPane('first', 'first.svg'), createPane('second', 'second.svg')]

    const items = await preparePaneMenuItems({ subject, context, panes, openPane })

    expect(items.map(item => item.label)).toEqual(['first', 'second'])
    expect(items.map(item => item.icon)).toEqual(['first.svg', 'second.svg'])

    const event = new Event('select')
    items[1].action(event)
    expect(openPane).toHaveBeenCalledWith(subject, 'second', event)
  })

  it('skips panes without labels and resolves function-valued icons', async () => {
    const iconResolver = vi.fn(() => 'resolved.svg')
    const panes = [
      { ...createPane('hidden', 'hidden.svg'), label: () => null },
      { ...createPane('visible', iconResolver), label: () => 'Visible' }
    ]

    const items = await preparePaneMenuItems({
      subject,
      context,
      panes,
      openPane: vi.fn()
    })

    expect(items).toHaveLength(1)
    expect(items[0].label).toBe('Visible')
    expect(items[0].icon).toBe('resolved.svg')
    expect(iconResolver).toHaveBeenCalledWith(subject, context)
  })

  it('uses a host icon override without changing pane ordering', async () => {
    const override = vi.fn(() => 'profile.svg')
    const pane = createPane('profile', 'default.svg')

    const items = await preparePaneMenuItems({
      subject,
      context,
      panes: [pane],
      openPane: vi.fn(),
      iconOverrides: { profile: override }
    })

    expect(items[0].icon).toBe('profile.svg')
    expect(override).toHaveBeenCalledWith(subject, context)
  })
})
