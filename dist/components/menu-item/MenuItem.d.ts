import { WebComponent } from '../../lib/components';
export default class MenuItem extends WebComponent {
    static styles: import('lit').CSSResult;
    accessor href: string | undefined;
    accessor selected: boolean;
    private accessor anchor;
    render(): import('lit-html').TemplateResult<1>;
    click(): void;
}
//# sourceMappingURL=MenuItem.d.ts.map