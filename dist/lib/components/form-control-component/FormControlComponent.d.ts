import { WebComponent } from '../web-component';
import { default as FormControlTrait, FormControlValue } from '../traits/FormControlTrait';
export default abstract class FormControlComponent<T extends FormControlValue = FormControlValue> extends WebComponent {
    static formAssociated: boolean;
    accessor label: string;
    accessor name: string;
    accessor value: T | null;
    accessor placeholder: string;
    accessor required: boolean;
    accessor disabled: boolean;
    protected controlTrait: FormControlTrait;
    protected abstract controlElement: HTMLInputElement | HTMLSelectElement | null;
    constructor();
}
//# sourceMappingURL=FormControlComponent.d.ts.map