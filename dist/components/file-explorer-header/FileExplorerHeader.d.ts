import { WebComponent } from '../../lib/components';
import { PaneIcon, FileExplorerResourceMetadata } from './types';
export default class FileExplorerHeader extends WebComponent {
    static styles: import('lit').CSSResult;
    private _loadedMetadataForUri;
    private _metadataGeneration;
    accessor fileExplorerContext: import('../../lib/file-explorer/context').FileExplorerContext;
    accessor menuItems: Array<{
        label: string;
        action: (event: Event) => void;
    }>;
    accessor paneIcon: PaneIcon;
    accessor responseMetadata: Pick<FileExplorerResourceMetadata, 'modified' | 'isPublic' | 'canEdit' | 'canManageAccess' | 'aclUri'>;
    private handleBack;
    private getDefaultResponseMetadata;
    protected willUpdate(): void;
    private loadResponseMetadata;
    render(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=FileExplorerHeader.d.ts.map