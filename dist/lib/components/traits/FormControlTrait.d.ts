import { WebComponent } from '..';
import { nothing } from 'lit';
import { WebComponentTrait } from './WebComponentTrait';
export type FormControlTraitTarget = WebComponent & {
    name: string;
    label: string;
    required: boolean;
    value: unknown;
};
export interface FormControlTraitConfig {
    getControlElement(): HTMLInputElement | HTMLSelectElement | null;
    getInternals(): ElementInternals;
}
export default class FormControlTrait implements WebComponentTrait {
    controlId: string;
    labelId: string;
    target: FormControlTraitTarget;
    private config;
    constructor(target: FormControlTraitTarget, config: FormControlTraitConfig);
    firstUpdated(): void;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    formResetCallback(): void;
    renderLabel(): import('lit-html').TemplateResult<1> | typeof nothing;
    onInput(): void;
    onSubmit(): void;
    setValue(value: unknown): void;
    private updateValidity;
}
//# sourceMappingURL=FormControlTrait.d.ts.map