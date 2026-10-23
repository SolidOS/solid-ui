import { WebComponent } from '../../lib/components';
export default class FileExplorerHeaderControls extends WebComponent {
    static styles: import('lit').CSSResult;
    private mobileMediaQuery;
    private readonly mobileQuery;
    private readonly handleMobileMediaChange;
    accessor fileExplorerContext: import('../../lib/file-explorer/context').FileExplorerContext;
    accessor menuItems: Array<{
        label: string;
        action: (event: Event) => void;
        icon?: HTMLElement;
    }>;
    accessor canEdit: boolean;
    accessor canManageAccess: boolean;
    accessor isMobile: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private getEditTooltip;
    private handleManageAccess;
    private renderDirtyIndicator;
    render(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=FileExplorerHeaderControls.d.ts.map