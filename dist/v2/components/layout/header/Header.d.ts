import { LitElement } from 'lit';
import '../../auth/loginButton/index';
import '../../auth/signupButton/index';
export type HeaderAuthState = 'logged-out' | 'logged-in';
export type HeaderMenuItem = {
    label: string;
    url?: string;
    target?: string;
    action?: string;
    icon?: string;
};
export type HeaderAccountMenuItem = HeaderMenuItem & {
    avatar?: string;
    webid?: string;
};
export declare class Header extends LitElement {
    static properties: {
        logo: {
            type: StringConstructor;
            reflect: boolean;
        };
        helpIcon: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        layout: {
            type: StringConstructor;
            reflect: boolean;
        };
        theme: {
            type: StringConstructor;
            reflect: boolean;
        };
        brandLink: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        authState: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        loginAction: {
            type: ObjectConstructor;
            attribute: boolean;
        };
        signUpAction: {
            type: ObjectConstructor;
            attribute: boolean;
        };
        accountMenu: {
            type: ArrayConstructor;
            attribute: boolean;
        };
        logoutLabel: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        logoutIcon: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        accountIcon: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        accountAvatar: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        accountAvatarFallback: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        loginIcon: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        signUpIcon: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        helpMenuList: {
            type: ArrayConstructor;
        };
        accountMenuOpen: {
            state: boolean;
        };
        helpMenuOpen: {
            state: boolean;
        };
        hasSlottedAccountMenu: {
            state: boolean;
        };
        hasSlottedHelpMenu: {
            state: boolean;
        };
    };
    static styles: import("lit").CSSResult;
    logo: string;
    helpIcon: string;
    layout: 'desktop' | 'mobile';
    theme: 'light' | 'dark';
    brandLink: string;
    authState: HeaderAuthState;
    loginAction: HeaderMenuItem;
    signUpAction: HeaderMenuItem;
    accountMenu: HeaderAccountMenuItem[];
    logoutLabel: string | null;
    logoutIcon: string;
    accountIcon: string;
    accountAvatar: string;
    accountAvatarFallback: string;
    loginIcon: string;
    signUpIcon: string;
    helpMenuList: HeaderMenuItem[];
    accountMenuOpen: boolean;
    helpMenuOpen: boolean;
    hasSlottedAccountMenu: boolean;
    hasSlottedHelpMenu: boolean;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleHelpMenuClick;
    private handleAccountMenuClick;
    private readonly handleDocumentClick;
    private readonly handleWindowKeydown;
    private handleAccountSlotChange;
    private handleHelpSlotChange;
    private toggleAccountMenu;
    private toggleHelpMenu;
    private hasAccountMenuItems;
    private hasHelpMenuItems;
    private shouldRenderHelpMenu;
    private renderLoggedInAvatar;
    private renderLoggedOutActions;
    private handleLoginSuccess;
    private handleLogout;
    private renderAccountMenuItem;
    private renderLoggedInActions;
    private renderUserArea;
    protected firstUpdated(): void;
    protected updated(changedProperties: Map<string, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=Header.d.ts.map