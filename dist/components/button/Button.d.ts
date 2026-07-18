import { WebComponent } from '../../lib/components';
export declare const BUTTON_VARIANTS: readonly ["primary", "secondary", "tertiary", "outline", "ghost"];
export type ButtonVariant = typeof BUTTON_VARIANTS[number];
export default class Button extends WebComponent {
    static styles: import('lit').CSSResult;
    static formAssociated: boolean;
    accessor variant: ButtonVariant;
    accessor type: string;
    accessor disabled: boolean | undefined;
    accessor loading: boolean;
    render(): import('lit-html').TemplateResult<1>;
    private onIconSlotChange;
    private onClick;
}
//# sourceMappingURL=Button.d.ts.map