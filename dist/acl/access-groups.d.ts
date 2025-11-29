/**
 * Contains the [[AccessGroups]]
 * and [[AccessGroupsOptions]] classes
 * @packageDocumentation
 */
import { NamedNode, Store } from 'rdflib';
import { AccessController } from './access-controller';
import { AgentMapMap, ComboList } from './types';
/**
 * Type for the options parameter of [[AccessGroups]]
 */
export interface AccessGroupsOptions {
    defaults?: boolean;
}
/**
 * Renders the table of Owners, Editors, Posters, Submitters, Viewers
 * for https://github.com/solidos/userguide/blob/main/views/sharing/userguide.md
 */
export declare class AccessGroups {
    private doc;
    private aclDoc;
    controller: AccessController;
    private _options;
    private readonly defaults;
    byCombo: ComboList;
    aclMap: AgentMapMap;
    private readonly addAgentButton;
    private readonly rootElement;
    private _store;
    constructor(doc: NamedNode, aclDoc: NamedNode, controller: AccessController, store: Store, // @@ was LiveStore
    _options?: AccessGroupsOptions);
    get store(): Store;
    set store(store: Store);
    render(): HTMLElement;
    private renderGroups;
    private renderGroup;
    private renderGroupElements;
    private renderAgent;
    private deleteAgent;
    addNewURI(uri: string): Promise<void>;
    private handleDroppedUris;
    private handleDroppedUri;
    private setACLCombo;
    private removeAgentFromCombos;
}
//# sourceMappingURL=access-groups.d.ts.map