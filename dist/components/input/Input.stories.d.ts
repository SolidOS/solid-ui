declare const args: {
    label: string;
    value: string;
    placeholder: string;
    type: string;
};
declare const meta: {
    readonly title: "Basic UI/Input";
    readonly args: {
        label: string;
        value: string;
        placeholder: string;
        type: string;
    };
    readonly argTypes: {
        readonly label: {
            readonly control: "text";
        };
        readonly value: {
            readonly control: "text";
        };
        readonly placeholder: {
            readonly control: "text";
        };
        readonly type: {
            readonly control: "select";
            readonly options: readonly ["text", "email", "password", "search", "url"];
        };
    };
    readonly render: ({ label, value, placeholder, type }: typeof args) => import('lit-html').TemplateResult<1>;
};
export declare const Primary: {};
export default meta;
//# sourceMappingURL=Input.stories.d.ts.map