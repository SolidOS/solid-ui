import { WebComponent } from '../../lib/components';
import { PropertyValues } from 'lit';
import { AccessRole, DirectoryEntry } from 'solid-logic';
import { AsyncComboboxOptionsProvider } from '../combobox';
import { PendingAccessGrant } from './types';
export declare function directoryEntryOptionIcon(entry: DirectoryEntry): import('lit-html').TemplateResult<1> | undefined;
export default class AccessControlAddAccess extends WebComponent {
    static styles: import('lit').CSSResult;
    accessor principalInputValue: string;
    accessor addAccessRoleValue: AccessRole;
    accessor pendingAccessGrants: PendingAccessGrant[];
    accessor inputError: string;
    accessor disabled: boolean;
    accessor asyncOptionsProvider: AsyncComboboxOptionsProvider | null;
    accessor showAdvancedToggle: boolean;
    accessor advancedSharingOpen: boolean;
    private accessor roleCombobox;
    protected updated(changedProperties: PropertyValues<this>): void;
    private onAdvancedSharingToggle;
    private onPrincipalInput;
    private onPrincipalSelect;
    private onRoleChange;
    private onPendingGrantRemove;
    private getEventValue;
    protected render(): import('lit-html').TemplateResult<1>;
    private renderPendingAccessGrants;
}
//# sourceMappingURL=AccessControlAddAccess.d.ts.map