import { WebComponent } from '../../lib/components';
export default class LoginModal extends WebComponent {
    static styles: import('lit').CSSResult;
    accessor issuerUrl: string;
    private accessor issuerInputValue;
    private accessor failed;
    private accessor submitting;
    private accessor auth;
    private accessor dialog;
    connectedCallback(): void;
    protected render(): import('lit-html').TemplateResult<1>;
    private onIssuerInputChange;
    private onSubmit;
}
//# sourceMappingURL=LoginModal.d.ts.map