import { LiveStore, NamedNode } from 'rdflib';
import { PaneDefinition } from 'pane-registry';
export interface FileExplorerEdit {
    onEdit?: () => void;
    isDirty?: boolean;
    updateDirtyState?: (dirty: boolean) => void;
}
export interface FileExplorerContext {
    store: LiveStore | undefined;
    subjectUri: string | undefined;
    pane?: PaneDefinition;
    soloPane?: boolean;
    onBack?: () => void;
    openPane?: (subject: NamedNode, paneName: string) => void;
    handleAccessClick?: () => void;
    paneSupportsEditing?: boolean;
    edit?: FileExplorerEdit;
}
export declare const fileExplorerContext: {
    __context__: FileExplorerContext;
};
//# sourceMappingURL=context.d.ts.map