import { NamedNode } from 'rdflib';
import { PaneDefinition } from 'pane-registry';
export type CreateContext = {
    div: HTMLElement;
    dom: HTMLDocument;
    folder?: NamedNode;
    me: NamedNode;
    refreshTarget?: HTMLTableElement;
    statusArea: HTMLElement;
};
export interface NewAppInstanceOptions {
    appPathSegment?: string;
    event: any;
    folder: NamedNode | null;
    iconEle: HTMLImageElement;
    pane: PaneDefinition;
    noun: string;
    noIndexHTML: boolean;
    div: HTMLElement;
    me: NamedNode;
    dom: HTMLDocument;
    refreshTarget?: HTMLTableElement;
}
//# sourceMappingURL=types.d.ts.map