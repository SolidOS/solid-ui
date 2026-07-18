import { WebComponent } from '../../lib/components';
export type SelectOptionData = {
    value: unknown;
    label: string;
};
export type SelectChangeEvent = CustomEvent<{
    option: SelectOptionData;
}>;
export default class Select extends WebComponent {
    static styles: import('lit').CSSResult;
    static formAssociated: boolean;
    accessor label: string;
    accessor name: string;
    accessor value: string;
    accessor required: boolean;
    set options(value: SelectOptionData[] | null);
    get options(): SelectOptionData[];
    accessor inputElement: HTMLSelectElement | null;
    private accessor _options;
    private controlTrait;
    constructor();
    protected render(): import('lit-html').TemplateResult<1>;
    private onChange;
}
//# sourceMappingURL=Select.d.ts.map