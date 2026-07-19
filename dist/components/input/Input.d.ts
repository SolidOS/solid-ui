import { FormControlComponent } from '../../lib/components';
export default class Input extends FormControlComponent {
    static styles: import('lit').CSSResult;
    accessor type: string;
    protected accessor controlElement: HTMLInputElement | null;
    protected render(): import('lit-html').TemplateResult<1>;
    private onKeyDown;
}
//# sourceMappingURL=Input.d.ts.map