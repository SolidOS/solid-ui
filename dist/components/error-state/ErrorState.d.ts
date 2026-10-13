import { WebComponent } from '../../lib/components';
export default class ErrorState extends WebComponent {
    static styles: import('lit').CSSResult;
    accessor title: string;
    accessor message: string;
    render(): import('lit-html').TemplateResult<1>;
    private onClose;
}
//# sourceMappingURL=ErrorState.d.ts.map