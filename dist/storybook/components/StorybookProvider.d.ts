import { WebComponent } from '../../lib/components';
import { PropertyValues } from 'lit';
export declare class StorybookProvider extends WebComponent {
    accessor webId: string | undefined;
    accessor avatarUrl: string | undefined;
    accessor initialized: boolean;
    private accessor auth;
    willUpdate(changedProperties: PropertyValues<this>): void;
    protected render(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=StorybookProvider.d.ts.map