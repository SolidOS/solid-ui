import { WebComponent } from '../../lib/components';
import { NamedNode } from 'rdflib';
export default class RDFInput extends WebComponent {
    private accessor storeContext;
    accessor formSubject: NamedNode | null;
    accessor dataSubject: NamedNode | null;
    accessor storeVersion: number;
    private accessor localInputValue;
    private _updateInFlight;
    private _pendingUpdateValue;
    accessor readonly: boolean;
    constructor();
    render(): import('lit-html').TemplateResult<1>;
    private getDocument;
    private getFormProperty;
    private getInputLabel;
    private getReadOnly;
    private getSelectedTerm;
    private termToInputValue;
    private defaultInputValue;
    private updateData;
    private runPendingUpdate;
}
//# sourceMappingURL=RDFInput.d.ts.map