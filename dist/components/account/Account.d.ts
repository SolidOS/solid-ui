import { TemplateResult } from 'lit';
import { WebComponent } from '../../lib/components';
export interface AccountMenuItem {
    label: string | TemplateResult;
    href?: string;
    selected?: boolean;
    onSelected?(): void;
}
export default class Account extends WebComponent {
    static styles: import('lit').CSSResult;
    static states: {
        initializing: (component: Account) => boolean;
        loggedIn: (component: Account) => boolean;
    };
    accessor menuItems: AccountMenuItem[];
    private accessor auth;
    private unsubscribeSessionUpdated?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected render(): TemplateResult<1>;
}
//# sourceMappingURL=Account.d.ts.map