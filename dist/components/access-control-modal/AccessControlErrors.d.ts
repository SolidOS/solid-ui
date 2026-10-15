import { WebComponent } from '../../lib/components';
import { AccessSaveError } from './types';
export default class AccessControlErrors extends WebComponent {
    static styles: import('lit').CSSResult;
    accessor errors: AccessSaveError[];
    accessor successfulChangesRefreshed: boolean;
    private onClose;
    protected render(): import('lit-html').TemplateResult<1>;
}
//# sourceMappingURL=AccessControlErrors.d.ts.map