export interface DialogConfig<T = unknown> {
    onClose?(data?: T): void;
}
export default class Dialog {
    readonly id: string;
    readonly element: HTMLElement;
    readonly config: DialogConfig;
    constructor(element: HTMLElement, config?: DialogConfig);
    closed(data?: unknown): void;
}
//# sourceMappingURL=Dialog.d.ts.map