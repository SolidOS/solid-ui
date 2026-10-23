export declare const FILE_EXPLORER_BACK_EVENT = "solid-ui-file-explorer-back";
export interface FileExplorerBackDetail {
    subjectUri?: string;
}
export declare const FILE_EXPLORER_MANAGE_ACCESS_EVENT = "solid-ui-file-explorer-manage-access";
export interface FileExplorerManageAccessDetail {
    subjectUri: string;
}
export declare const FILE_EXPLORER_OPEN_PANE_EVENT = "solid-ui-file-explorer-open-pane";
export interface FileExplorerOpenPaneDetail {
    subjectUri: string;
    paneName: string;
}
/** Whether an event belongs to this explorer rather than a nested one. */
export declare function isExplorerEvent(event: Event, provider: HTMLElement): boolean;
//# sourceMappingURL=events.d.ts.map