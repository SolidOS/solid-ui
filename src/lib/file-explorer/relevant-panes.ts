import type { DataBrowserContext, PaneDefinition } from 'pane-registry'
import type { NamedNode } from 'rdflib'
import { filterAvailablePanes } from '@/login/login'

export type RelevantPaneOptions = {
  excludedPaneNames?: readonly string[]
  fallbackPaneName?: string
}

/**
 * Returns panes that can represent a subject, preserving legacy outliner ordering.
 *
 * Audience filtering narrows the list, but the first relevant pane is retained
 * even when its audience does not match. The legacy outliner deliberately kept
 * this most relevant view available, including when no panes match the audience.
 */
export async function getRelevantPanes (
  subject: NamedNode,
  context: DataBrowserContext,
  options: RelevantPaneOptions = {}
): Promise<PaneDefinition[]> {
  const excludedPaneNames = new Set(options.excludedPaneNames || [])
  const paneRegistry = context.session.paneRegistry
  const relevantPanes = paneRegistry.list.filter(
    pane => !pane.global &&
      !excludedPaneNames.has(pane.name) &&
      pane.label(subject, context)
  )

  if (relevantPanes.length === 0) {
    const fallbackPane = options.fallbackPaneName
      ? paneRegistry.byName(options.fallbackPaneName)
      : undefined
    return fallbackPane ? [fallbackPane] : []
  }

  const filteredPanes = await filterAvailablePanes(relevantPanes)
  if (filteredPanes.length === 0) return [relevantPanes[0]]

  const firstRelevantPaneIndex = paneRegistry.list.indexOf(relevantPanes[0])
  const firstFilteredPaneIndex = paneRegistry.list.indexOf(filteredPanes[0])
  return firstRelevantPaneIndex < firstFilteredPaneIndex
    ? [relevantPanes[0]].concat(filteredPanes)
    : filteredPanes
}
