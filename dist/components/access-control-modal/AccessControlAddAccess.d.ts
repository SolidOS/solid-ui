import { WebComponent } from '../../lib/components';
import { AccessRole, DirectoryEntry } from 'solid-logic';
import { AsyncComboboxOptionsProvider } from '../combobox';
import { PendingAccessGrant } from './types';
export declare function directoryEntryOptionTemplate(entry: DirectoryEntry): import('lit-html').TemplateResult<1>;
export default class AccessControlAddAccess extends WebComponent {
    static styles: import('lit').CSSResult;
    accessor principalInputValue: string;
    accessor addAccessRoleValue: AccessRole;
    accessor pendingAccessGrants: PendingAccessGrant[];
    accessor inputError: string;
    accessor asyncOptionsProvider: AsyncComboboxOptionsProvider | null;
    private onPrincipalInput;
    private onPrincipalSelect;
    private onRoleChange;
    private onPendingGrantRemove;
    private getEventValue;
    protected render(): import('lit-html').TemplateResult<1>;
    private renderPendingAccessGrants;
}
//# sourceMappingURL=AccessControlAddAccess.d.ts.map