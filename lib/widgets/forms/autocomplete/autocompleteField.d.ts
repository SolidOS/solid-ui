import { NamedNode, BlankNode, Variable } from 'rdflib';
/**
  * Render a autocomplete form field
  *
  * The autocomplete form searches for an object in a definitive public database,
  * and allows the user to search for it by name, displaying a list of objects whose names match
  * the input to date, and letting  the user either click on one of the list,
  * or just go on untill there is only one.  The process then returns two values,
  * the URiI of the object and its name.
  *
  * @param dom The HTML Document object aka Document Object Model
  * @param container  If present, the created widget will be appended to this
  * @param already A hash table of (form, subject) kept to prevent recursive forms looping
  * @param subject The thing about which the form displays/edits data
  * @param form The form or field to be rendered
  * @param doc The web document in which the data is
  * @param callbackFunction Called when data is changed so other parts can be refreshed.
  *
  * Form properties:
  * @param ui:property  The property to store the object itself
  * @param ui:labelProperty The property used to store the name of the object
  * @param ui:category The class of objects to be searched, if fixed (else dep on class of subject)
  *
  * @returns The HTML widget created
 */
export declare function autocompleteField(dom: HTMLDocument, container: HTMLElement | undefined, already: any, subject: NamedNode | BlankNode | Variable, form: NamedNode, doc: NamedNode | undefined, callbackFunction: (_ok: boolean, _errorMessage: string) => void): HTMLElement;
//# sourceMappingURL=autocompleteField.d.ts.map