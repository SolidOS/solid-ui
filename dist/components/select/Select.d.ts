import { FormControlComponent } from '../../lib/components';
export type SelectOptionData = {
    value: unknown;
    label: string;
};
export type SelectChangeEvent = CustomEvent<{
    option: SelectOptionData;
}>;
export default class Select extends FormControlComponent {
    static styles: import('lit').CSSResult;
    set options(value: SelectOptionData[] | null);
    get options(): SelectOptionData[];
    protected accessor controlElement: HTMLSelectElement | null;
    private accessor _options;
    protected render(): import('lit-html').TemplateResult<1>;
    private onChange;
}
//# sourceMappingURL=Select.d.ts.map