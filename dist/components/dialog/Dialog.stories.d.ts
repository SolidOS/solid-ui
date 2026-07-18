/**
 * Solid UI implements a Dialog System that allows to render dialogs dynamically, instead of declaring them inline.
 *
 * This works using `<solid-ui-dialogs-root>` to orchestrate the opening and closing of dialogs under the hood. If
 * you're using `<solid-ui-provider>`, it comes configured out of the box.
 */
declare const meta: {
    readonly title: "Advanced/Dialogs";
    readonly parameters: {
        readonly docs: {
            readonly source: {
                readonly language: "ts";
                readonly code: "\n            import { customElement, DialogComponent, showDialog } from 'solid-ui'\n            import { html } from 'lit'\n            import { property } from 'lit/decorators.js'\n\n            import 'solid-ui/components/button'\n            import 'solid-ui/components/dialog'\n            import 'solid-ui/components/dialog-content'\n            import 'solid-ui/components/dialog-footer'\n\n            @customElement('solid-ui-sample-modal')\n            export class SampleModal extends DialogComponent<'red' | 'green' | 'blue'> {\n                @property({ type: String })\n                accessor message: string = ''\n\n                protected render () {\n                    return html`\n                        <solid-ui-dialog title=${this.title}>\n                            <solid-ui-dialog-content>\n                                ${this.message}\n                            </solid-ui-dialog-content>\n                            <solid-ui-dialog-footer>\n                                <solid-ui-button @click=${() => this.close('red')}>Red</solid-ui-button>\n                                <solid-ui-button @click=${() => this.close('green')}>Green</solid-ui-button>\n                                <solid-ui-button @click=${() => this.close('blue')}>Blue</solid-ui-button>\n                            </solid-ui-dialog-footer>\n                        </solid-ui-dialog>\n                    `\n                }\n            }\n\n            await showDialog(SampleModal, {\n                props: {\n                    message: 'Choose your favorite color:',\n                },\n                onClose: (result) => alert(`You chose ${result || 'none'}!`),\n            });\n        ";
            };
        };
    };
};
export declare const Primary: {
    render: () => import('lit-html').TemplateResult<1>;
};
export default meta;
//# sourceMappingURL=Dialog.stories.d.ts.map