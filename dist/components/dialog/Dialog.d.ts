import { WebComponent } from '../../lib/components';
export default class Dialog extends WebComponent {
    static styles: import('lit').CSSResult;
    accessor title: string;
    private accessor nativeDialog;
    private accessor context;
    private dialogTrait;
    constructor();
    close(data?: unknown): void;
    protected firstUpdated(): void;
    protected render(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=Dialog.d.ts.map