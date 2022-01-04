/**
 * Contains the [[AccessGroups]]
 * and [[AccessGroupsOptions]] classes
 * @packageDocumentation
 */
import { IndexedFormula, NamedNode } from 'rdflib';
import { AccessController } from './access-controller';
import { AgentMapMap, ComboList } from './types';
import { LiveStore } from 'solid-logic';
/**
 * Type for the options parameter of [[AccessGroups]]
 */
export interface AccessGroupsOptions {
    defaults?: boolean;
}
/**
 * Renders the table of Owners, Editors, Posters, Submitters, Viewers
 * for https://github.com/solid/userguide/blob/main/views/sharing/userguide.md
 */
export declare class AccessGroups {
    private doc;
    private aclDoc;
    controller: AccessController;
    private options;
    private readonly defaults;
    byCombo: ComboList;
    aclMap: AgentMapMap;
    private readonly addAgentButton;
    private readonly rootElement;
    private _store;
    constructor(doc: NamedNode, aclDoc: NamedNode, controller: AccessController, store: IndexedFormula, options?: AccessGroupsOptions);
    get store(): LiveStore;
    set store(store: LiveStore);
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