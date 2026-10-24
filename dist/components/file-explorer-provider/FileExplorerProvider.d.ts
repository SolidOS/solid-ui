import { WebComponent } from '../../lib/components';
import { DataBrowserContext, PaneDefinition } from 'pane-registry';
import { FileExplorerContext } from '../../lib/file-explorer/context';
export default class FileExplorerProvider extends WebComponent {
    accessor context: DataBrowserContext | undefined;
    accessor subjectUri: string | undefined;
    accessor pane: PaneDefinition | undefined;
    accessor relevantPanes: PaneDefinition[];
    accessor soloPane: boolean | undefined;
    private accessor editor;
    private accessor isDirty;
    accessor value: FileExplorerContext;
    private registerEditor;
    protected willUpdate(): void;
    render(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=FileExplorerProvider.d.ts.map