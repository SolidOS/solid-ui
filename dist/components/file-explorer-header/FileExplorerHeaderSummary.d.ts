import { WebComponent } from '../../lib/components';
import { PropertyValues } from 'lit';
import { PaneIcon, FileExplorerResourceMetadata } from './types';
export default class FileExplorerHeaderSummary extends WebComponent {
    static styles: import('lit').CSSResult;
    private _draggableSubjectUri;
    private _paneIconGeneration;
    accessor fileExplorerContext: import('../../lib/file-explorer/context').FileExplorerContext;
    accessor paneIcon: PaneIcon | undefined;
    accessor onBackClick: (() => void) | undefined;
    accessor responseMetadata: Pick<FileExplorerResourceMetadata, 'modified' | 'isPublic'>;
    accessor resolvedPaneIcon: string | undefined;
    private accessor titleHeading;
    private formatModifiedDate;
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    protected updated(): void;
    private resolvePaneIcon;
    private renderContainerResourceHeader;
    private renderResourceHeader;
    render(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=FileExplorerHeaderSummary.d.ts.map