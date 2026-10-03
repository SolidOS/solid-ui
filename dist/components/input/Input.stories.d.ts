declare const args: {
    label: string;
    value: string;
    placeholder: string;
    type: string;
    srOnlyLabel: boolean;
};
declare const meta: {
    readonly title: "Basic UI/Input";
    readonly args: {
        label: string;
        value: string;
        placeholder: string;
        type: string;
        srOnlyLabel: boolean;
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
        readonly srOnlyLabel: {
            readonly control: "boolean";
        };
        readonly type: {
            readonly control: "select";
            readonly options: readonly ["text", "email", "password", "search", "url"];
        };
    };
    readonly render: ({ label, value, placeholder, type, srOnlyLabel }: typeof args) => import('lit-html').TemplateResult<1>;
};
export declare const Primary: {};
export default meta;
//# sourceMappingURL=Input.stories.d.ts.map