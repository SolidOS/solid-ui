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
    classes: Record<string, string>;
    targetIsProtected: boolean;
    private targetDoc;
    private targetACLDoc;
    private defaultHolder;
    private defaultACLDoc;
    private prospectiveDefaultHolder;
    store: any;
    dom: any;
    mainCombo: AccessGroups;
    defaultsCombo: AccessGroups | null;
    private readonly isContainer;
    private defaultsDiffer;
    private readonly rootElement;
    private isUsingDefaults;
    constructor(subject: NamedNode, noun: string, context: DataBrowserContext, statusElement: HTMLElement, classes: Record<string, string>, targetIsProtected: boolean, targetDoc: NamedNode, targetACLDoc: NamedNode, defaultHolder: NamedNode | null, defaultACLDoc: NamedNode | null, prospectiveDefaultHolder: NamedNode | undefined, store: any, dom: any);
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