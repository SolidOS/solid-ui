import { WebComponent } from '../../lib/components';
import { default as WaDropdown } from '@awesome.me/webawesome/dist/components/dropdown/dropdown.js';
export default class Menu extends WebComponent {
    static styles: import('lit').CSSResult;
    accessor placement: WaDropdown['placement'];
    accessor distance: number;
    private accessor dropdown;
    private accessor items;
    private observer;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected render(): import('lit-html').TemplateResult<1>;
    private syncItems;
    private onItemClick;
    private onWaSelect;
    private dispatchSelectEvent;
}
//# sourceMappingURL=Menu.d.ts.map