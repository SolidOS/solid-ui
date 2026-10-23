import { default as FileExplorerProvider } from '../../components/file-explorer-provider/FileExplorerProvider';
import { default as FileExplorerHeader } from '../../components/file-explorer-header/FileExplorerHeader';
import { DataBrowserContext, PaneDefinition } from 'pane-registry';
export type ExplorerComposition = {
    context: DataBrowserContext;
    subjectUri: string;
    pane: PaneDefinition | undefined;
    relevantPanes: PaneDefinition[];
    header?: Pick<FileExplorerHeader, 'paneIcon' | 'menuItems'>;
    paneElement?: HTMLElement;
};
/**
 * Composes one explorer without touching nested explorers or owning navigation.
 * Callers register the provider/header components and render the pane content.
 */
export declare function composeExplorer(provider: FileExplorerProvider, composition: ExplorerComposition): void;
//# sourceMappingURL=compose-explorer.d.ts.map