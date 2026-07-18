declare const EVENT_NAME: "solid-ui:close-dialog";
export declare class CloseDialogEvent extends Event {
    id: string;
    data?: unknown | undefined;
    static readonly eventName: "solid-ui:close-dialog";
    constructor(id: string, data?: unknown | undefined);
}
declare global {
    interface GlobalEventHandlersEventMap {
        [EVENT_NAME]: CloseDialogEvent;
    }
}
export {};
//# sourceMappingURL=close-dialog.d.ts.map