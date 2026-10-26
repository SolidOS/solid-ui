import { DataBrowserContext, PaneDefinition } from 'pane-registry';
import { NamedNode } from 'rdflib';
export type RelevantPaneOptions = {
    excludedPaneNames?: readonly string[];
    fallbackPaneName?: string;
};
/**
 * Returns panes that can represent a subject, preserving legacy outliner ordering.
 *
 * Audience filtering narrows the list, but the first relevant pane is retained
 * even when its audience does not match. The legacy outliner deliberately kept
 * this most relevant view available, including when no panes match the audience.
 */
export declare function getRelevantPanes(subject: NamedNode, context: DataBrowserContext, options?: RelevantPaneOptions): Promise<PaneDefinition[]>;
/**
 * Chooses the default pane from the relevant panes for a resource.
 *
 * A resource's `ui:mintClass` is an explicit declaration of the pane that
 * created it, so it takes precedence over panes that merely request focus.
 */
export declare function getPreferredPane(subject: NamedNode, context: DataBrowserContext, relevantPanes: PaneDefinition[]): PaneDefinition | undefined;
//# sourceMappingURL=relevant-panes.d.ts.map