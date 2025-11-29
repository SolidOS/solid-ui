import { NamedNode } from 'rdflib';
/**
 * @ignore
 */
declare class ContainerElement extends HTMLElement {
    asSettings?: boolean;
}
type TabWidgetOptions = {
    backgroundColor?: string;
    dom?: HTMLDocument;
    items?: Array<NamedNode>;
    onClose?: (event: Event) => void;
    ordered?: boolean;
    orientation?: '0' | '1' | '2' | '3';
    predicate?: NamedNode;
    renderMain?: (bodyMain: HTMLElement, subject: NamedNode) => void;
    renderTab?: (tabDiv: HTMLButtonElement, subject: NamedNode) => void;
    renderTabSettings?: (bodyMain: ContainerElement, subject: NamedNode) => void;
    selectedTab?: NamedNode;
    startEmpty?: boolean;
    subject?: NamedNode;
};
export declare class TabWidgetElement extends HTMLElement {
    bodyContainer?: HTMLElement;
    refresh?: () => void;
    tabContainer?: HTMLElement;
}
export declare function tabWidget(options: TabWidgetOptions): TabWidgetElement;
export {};
//# sourceMappingURL=tabs.d.ts.map