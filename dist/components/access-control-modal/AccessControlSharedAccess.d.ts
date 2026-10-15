import { WebComponent } from '../../lib/components';
import { AccessGrantViewModel } from './types';
export default class AccessControlSharedAccess extends WebComponent {
    static styles: import('lit').CSSResult;
    accessor accessGrantViewModels: AccessGrantViewModel[];
    private accessor searchValue;
    private onSearchInput;
    private onSearchSelect;
    private onAccessGrantRoleChange;
    private getFilteredAccessGrants;
    private renderAccessGrant;
    private renderAuthorizationBadge;
    private getAuthorizationBadge;
    private getInitials;
    private renderAuthorizationRole;
    private renderGrantRoleOptions;
    protected render(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=AccessControlSharedAccess.d.ts.map