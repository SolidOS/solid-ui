import { WebComponent } from '../../lib/components';
import { LiveStore } from 'rdflib';
type ResourceActionMenuItem = {
    label: string;
    icon?: HTMLElement | string;
    action?: (event: Event) => void;
};
export default class ResourceActionsMenu extends WebComponent {
    static styles: import('lit').CSSResult;
    accessor store: LiveStore | undefined;
    accessor subjectUri: string | undefined;
    accessor handleAccessClick: (() => void) | undefined;
    accessor handleEditingClick: (() => void) | undefined;
    accessor paneSupportsEditing: boolean;
    accessor canEdit: boolean;
    accessor canManageAccess: boolean;
    accessor isMobile: boolean;
    accessor showAccessInMenu: boolean;
    accessor menuItems: ResourceActionMenuItem[];
    render(): import('lit-html').TemplateResult<1>;
}
export {};
//# sourceMappingURL=ResourceActionsMenu.d.ts.map