import { PropertyValues } from 'lit';
import { WebComponent } from '../../lib/components';
import { LiveStore } from 'rdflib';
export default class RDFForm extends WebComponent {
    private accessor storeContext;
    accessor passedInStore: LiveStore | null;
    private get currentStore();
    private accessor entireDataIsReadonly;
    private accessor _loadVersion;
    private accessor _documentsLoaded;
    accessor formUrl: URL | null;
    accessor subjectUrl: URL | null;
    render(): import('lit-html').TemplateResult<1>;
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    private loadDocumentsIfNeeded;
}
//# sourceMappingURL=RDFForm.d.ts.map