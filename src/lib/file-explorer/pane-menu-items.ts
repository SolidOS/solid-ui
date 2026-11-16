import type { DataBrowserContext, PaneDefinition } from 'pane-registry'
import type { NamedNode } from 'rdflib'

export type PaneMenuIcon = string

export type PaneMenuItem = {
  key?: string
  label: string
  icon?: PaneMenuIcon
  action: (event: Event) => void
}

export type PaneMenuPane = Omit<PaneDefinition, 'icon'> & {
  icon: string | PaneIconResolver
}

export type PaneIconResolver = (
  subject: NamedNode,
  context: DataBrowserContext
) => PaneMenuIcon | undefined | Promise<PaneMenuIcon | undefined>

export type PaneMenuPreparation = {
  subject: NamedNode
  context: DataBrowserContext
  panes: PaneMenuPane[]
  openPane: (subject: NamedNode, paneName: string, event: Event) => void
  iconOverrides?: Record<string, PaneIconResolver>
}

async function resolvePaneIcon (
  pane: PaneMenuPane,
  subject: NamedNode,
  context: DataBrowserContext,
  override: PaneIconResolver | undefined
) {
  if (override) return override(subject, context)
  return typeof pane.icon === 'function'
    ? pane.icon(subject, context)
    : pane.icon
}

export async function preparePaneMenuItems (
  input: PaneMenuPreparation
): Promise<PaneMenuItem[]> {
  const items: Array<PaneMenuItem | undefined> = await Promise.all(input.panes.map(async pane => {
    const label = pane.label(input.subject, input.context)
    if (!label) return undefined

    const icon = await resolvePaneIcon(
      pane,
      input.subject,
      input.context,
      input.iconOverrides?.[pane.name]
    )

    const item: PaneMenuItem = {
      key: pane.name,
      label,
      ...(icon ? { icon } : {}),
      action: (event: Event) => input.openPane(input.subject, pane.name, event)
    }
    return item
  }))

  return items.filter((item): item is PaneMenuItem => item !== undefined)
}
