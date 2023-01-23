import { NamedNode, Literal } from 'rdflib';
import { QueryParameters } from './publicData';
export type AutocompleteDecoration = {
    acceptButton?: HTMLElement;
    cancelButton: HTMLElement;
    editButton?: HTMLElement;
    deleteButton?: HTMLElement;
};
export type AutocompleteOptions = {
    targetClass?: NamedNode;
    currentObject?: NamedNode;
    currentName?: Literal;
    queryParams: QueryParameters;
    size?: number;
    permanent?: boolean;
};
interface Callback1 {
    (_subject: NamedNode, _name: Literal): any;
}
export declare function setVisible(element: HTMLElement, visible: boolean): void;
export declare function renderAutoComplete(dom: HTMLDocument, acOptions: AutocompleteOptions, decoration: AutocompleteDecoration, callback: Callback1): Promise<HTMLDivElement>;
export {};
//# sourceMappingURL=autocompletePicker.d.ts.map