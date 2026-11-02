import { DataBrowserContext, PaneDefinition } from 'pane-registry';
import { NamedNode } from 'rdflib';
export type PaneMenuIcon = string;
export type PaneMenuItem = {
    key?: string;
    label: string;
    icon?: PaneMenuIcon;
    action: (event: Event) => void;
};
export type PaneMenuPane = Omit<PaneDefinition, 'icon'> & {
    icon: string | PaneIconResolver;
};
export type PaneIconResolver = (subject: NamedNode, context: DataBrowserContext) => PaneMenuIcon | undefined | Promise<PaneMenuIcon | undefined>;
export type PaneMenuPreparation = {
    subject: NamedNode;
    context: DataBrowserContext;
    panes: PaneMenuPane[];
    openPane: (subject: NamedNode, paneName: string, event: Event) => void;
    iconOverrides?: Record<string, PaneIconResolver>;
};
export declare function preparePaneMenuItems(input: PaneMenuPreparation): Promise<PaneMenuItem[]>;
//# sourceMappingURL=pane-menu-items.d.ts.map