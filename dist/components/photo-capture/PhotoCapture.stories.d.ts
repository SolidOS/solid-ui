declare const meta: {
    readonly title: "Advanced/PhotoCapture";
    readonly parameters: {
        readonly docs: {
            readonly source: {
                readonly language: "ts";
                readonly code: "\n            import { customElement, WebComponent } from 'solid-ui'\n            import { html } from 'lit'\n            import { state, query } from 'lit/decorators.js'\n\n            import PhotoCapture from 'solid-ui/components/photo-capture'\n\n            import styles from './PhotoCaptureSandbox.styles.css'\n\n            @customElement('my-photo-capture-sandbox')\n            export default class PhotoCaptureSandbox extends WebComponent {\n                static styles = styles\n\n                @state()\n                private accessor imageUrl: string | null = null\n\n                @query('solid-ui-photo-capture')\n                private accessor photoCapture: PhotoCapture | null = null\n\n                protected render () {\n                    const photoCapture = html`\n                        <solid-ui-photo-capture\n                            heading=\"PhotoCapture Sandbox\"\n                            confirm-label=\"Use the photo\"\n                            @input=${this.onInput}\n                        ></solid-ui-photo-capture>\n                    `\n\n                    if (this.imageUrl) {\n                        return html`\n                            ${photoCapture}\n\n                            <p>The photo you captured:</p>\n                            <img src=${this.imageUrl} alt=\"Captured photo\" />\n                        `\n                    }\n\n                    return html`\n                        <p>Use the following button to capture a photo:</p>\n\n                        ${photoCapture}\n                    `\n                }\n\n                private onInput () {\n                    const file = this.photoCapture?.value ?? null\n\n                    this.imageUrl = file ? URL.createObjectURL(file) : null\n                }\n            }\n        ";
            };
        };
    };
};
export declare const Primary: {
    render: () => import('lit-html').TemplateResult<1>;
};
export default meta;
//# sourceMappingURL=PhotoCapture.stories.d.ts.map