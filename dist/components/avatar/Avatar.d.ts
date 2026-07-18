import { WebComponent } from '../../lib/components';
export default class Avatar extends WebComponent {
    static styles: import('lit').CSSResult;
    static states: {
        fallback: (component: Avatar) => boolean;
    };
    private accessor auth;
    private unsubscribeSessionUpdated?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected render(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=Avatar.d.ts.map