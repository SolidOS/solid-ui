import type { DataBrowserContext, PaneDefinition } from 'pane-registry'
import type { NamedNode } from 'rdflib'
import { filterAvailablePanes } from '@/login/login'

export type RelevantPaneOptions = {
  excludedPaneNames?: readonly string[]
  fallbackPaneName?: string
}

/**
 * Returns panes that can represent a subject and are available to the current user.
 *
 * Availability filtering is authoritative: a pane removed by the audience check is
 * not reintroduced as a fallback.
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

  return filterAvailablePanes(relevantPanes)
}
