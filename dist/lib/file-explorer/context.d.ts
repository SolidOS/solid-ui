import { LiveStore } from 'rdflib';
import { PaneDefinition } from 'pane-registry';
export interface FileExplorerEditor {
    beginEditing(): void;
}
export interface FileExplorerContext {
    readonly store: LiveStore | undefined;
    readonly subjectUri: string | undefined;
    readonly pane: PaneDefinition | undefined;
    readonly isDirty: boolean;
    readonly canEdit: boolean;
    registerEditor(editor: FileExplorerEditor): () => void;
    beginEditing(): void;
    setDirty(dirty: boolean): void;
}
export declare const fileExplorerContext: {
    __context__: FileExplorerContext;
};
export declare const DEFAULT_FILE_EXPLORER_CONTEXT: FileExplorerContext;
//# sourceMappingURL=context.d.ts.map