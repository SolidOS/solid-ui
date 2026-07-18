import { WebComponent } from '../../lib/components';
export default class Input extends WebComponent {
    static styles: import('lit').CSSResult;
    static formAssociated: boolean;
    accessor label: string;
    accessor name: string;
    accessor value: string;
    accessor type: string;
    accessor placeholder: string;
    accessor required: boolean;
    private accessor inputElement;
    private controlTrait;
    constructor();
    protected render(): import('lit-html').TemplateResult<1>;
    private onKeyDown;
}
//# sourceMappingURL=Input.d.ts.map