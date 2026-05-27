import type { SelectOption } from './optionTypes';
export interface RenderListboxArgs {
    options: SelectOption[];
    selectedOption?: SelectOption;
    activeOption?: SelectOption;
    listboxId?: string;
    getOptionId?: (option: SelectOption, index: number) => string;
    onOptionSelect: (option: SelectOption) => void;
}
export declare function renderListbox(args: RenderListboxArgs): import("lit-html").TemplateResult<1>;
//# sourceMappingURL=listboxTemplate.d.ts.map