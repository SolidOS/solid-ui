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
//# sourceMappingURL=relevant-panes.d.ts.map