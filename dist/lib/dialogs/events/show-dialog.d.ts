import { default as Dialog } from '../Dialog';
declare const EVENT_NAME: "solid-ui:show-dialog";
export declare class ShowDialogEvent extends Event {
    dialog: Dialog;
    static readonly eventName: "solid-ui:show-dialog";
    constructor(dialog: Dialog);
}
declare global {
    interface GlobalEventHandlersEventMap {
        [EVENT_NAME]: ShowDialogEvent;
    }
}
export {};
//# sourceMappingURL=show-dialog.d.ts.map