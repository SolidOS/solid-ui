import { WebComponent } from '../../lib/components';
import { AccessRole } from 'solid-logic';
export default class AccessControlGeneralAccess extends WebComponent {
    static styles: import('lit').CSSResult;
    accessor subjectUri: string | undefined;
    accessor authenticatedAccessRoleValue: AccessRole;
    accessor publicAccessRoleValue: AccessRole;
    accessor disabled: boolean;
    private onAuthenticatedRoleChange;
    private onPublicRoleChange;
    private dispatchRoleChange;
    private onCopyLinkClick;
    private renderAuthenticatedRoleOptions;
    private renderPublicRoleOptions;
    private renderAuthenticatedModeSelector;
    private renderPublicModeSelector;
    private renderGeneralAccessIcon;
    private renderGeneralShareRow;
    protected render(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=AccessControlGeneralAccess.d.ts.map