import { WebComponent } from '../../lib/components';
export default class Guard extends WebComponent {
    static states: {
        initializing: (component: Guard) => boolean;
        loggedIn: (component: Guard) => boolean;
    };
    private accessor auth;
    private unsubscribeSessionUpdated?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected render(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=Guard.d.ts.map