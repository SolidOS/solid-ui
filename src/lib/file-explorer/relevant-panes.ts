import type { DataBrowserContext, PaneDefinition } from 'pane-registry'
import { filterAvailablePanes } from '../../login/login'
import type { NamedNode } from 'rdflib'

export async function getRelevantPanes (
  subject: NamedNode,
  context: DataBrowserContext,
  panes: Array<PaneDefinition> = context.session.paneRegistry.list
): Promise<Array<PaneDefinition>> {
  const relevantPaneCandidates = panes.filter(
    (pane) => pane.label(subject, context) && !pane.global && pane.name !== 'sharing'
  )

  if (relevantPaneCandidates.length === 0) {
    const internalPane = context.session.paneRegistry.byName('internal')
    return internalPane ? [internalPane] : []
  }

  const filteredPanes = await filterAvailablePanes(relevantPaneCandidates)

  if (filteredPanes.length === 0) {
    return relevantPaneCandidates.length > 0 ? [relevantPaneCandidates[0]] : []
  }

  if (relevantPaneCandidates.length === 0) {
    return filteredPanes
  }

  const firstRelevantPaneIndex = panes.indexOf(relevantPaneCandidates[0])
  const firstFilteredPaneIndex = panes.indexOf(filteredPanes[0])

  return firstRelevantPaneIndex < firstFilteredPaneIndex
    ? [relevantPaneCandidates[0]].concat(filteredPanes)
    : filteredPanes
}

export function getRelevantPane (
  relevantPanes: Array<PaneDefinition>,
  subject: NamedNode
): PaneDefinition | undefined {
  return relevantPanes.find((pane) => pane.shouldGetFocus?.(subject)) || relevantPanes[0]
}
