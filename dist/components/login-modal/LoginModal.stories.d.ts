declare const meta: {
    readonly title: "Solid/Login Modal";
    readonly parameters: {
        readonly docs: {
            readonly source: {
                readonly language: "ts";
                readonly code: "\n            import { showDialog } from 'solid-ui';\n            import LoginModal from 'solid-ui/components/login-modal';\n\n            await showDialog<LoginModal>(html`<solid-ui-login-modal></solid-ui-login-modal>`);\n        ";
            };
        };
    };
};
export declare const Primary: {
    render: () => import('lit-html').TemplateResult<1>;
};
export declare const Loading: {
    render: () => import('lit-html').TemplateResult<1>;
};
export declare const Failed: {
    render: () => import('lit-html').TemplateResult<1>;
};
export default meta;
//# sourceMappingURL=LoginModal.stories.d.ts.map