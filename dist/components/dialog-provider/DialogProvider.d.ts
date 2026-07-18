import { WebComponent } from '../../lib/components';
import { PropertyValues } from 'lit';
export default class DialogProvider extends WebComponent {
    accessor dialogId: string | undefined;
    private accessor dialog;
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    protected firstUpdated(): void;
}
//# sourceMappingURL=DialogProvider.d.ts.map