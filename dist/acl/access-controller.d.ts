/**
 * Contains the [[AccessController]] class
 * @packageDocumentation
 */
import { NamedNode } from 'rdflib';
import { AccessGroups } from './access-groups';
import { DataBrowserContext } from 'pane-registry';
/**
 * Rendered HTML component used in the databrowser's Sharing pane.
 */
export declare class AccessController {
    subject: NamedNode;
    noun: string;
    context: DataBrowserContext;
    private statusElement;
    targetIsProtected: boolean;
    private targetDoc;
    private targetACLDoc;
    private defaultHolder;
    private defaultACLDoc;
    private prospectiveDefaultHolder;
    store: any;
    dom: HTMLDocument;
    mainCombo: AccessGroups;
    defaultsCombo: AccessGroups | null;
    private readonly isContainer;
    private defaultsDiffer;
    private readonly rootElement;
    private isUsingDefaults;
    constructor(subject: NamedNode, noun: string, context: DataBrowserContext, statusElement: HTMLElement, targetIsProtected: boolean, targetDoc: NamedNode, targetACLDoc: NamedNode, defaultHolder: NamedNode | null, defaultACLDoc: NamedNode | null, prospectiveDefaultHolder: NamedNode | undefined, store: any, dom: HTMLDocument);
    get isEditable(): boolean;
    render(): HTMLElement;
    private renderRemoveAclsController;
    private renderAddAclsController;
    private renderAddDefaultsController;
    private renderRemoveDefaultsController;
    renderTemporaryStatus(message: string): void;
    renderStatus(message: string): void;
    private addAcls;
    private addDefaults;
    private removeAcls;
    private removeDefaults;
    save(): Promise<void>;
}
//# sourceMappingURL=access-controller.d.ts.map