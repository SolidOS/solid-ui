import { WebComponent } from '../../lib/components';
import { PropertyValues } from 'lit';
export default class Provider extends WebComponent {
    accessor signupUrl: string | undefined;
    private accessor auth;
    connectedCallback(): Promise<void>;
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    protected render(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=Provider.d.ts.map