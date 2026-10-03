declare const args: {
    label: string;
    options: string;
    srOnlyLabel: boolean;
};
declare const meta: {
    readonly title: "Basic UI/Select";
    readonly args: {
        label: string;
        options: string;
        srOnlyLabel: boolean;
    };
    readonly argTypes: {
        readonly label: {
            readonly control: "text";
        };
        readonly options: {
            readonly control: "text";
        };
        readonly srOnlyLabel: {
            readonly control: "boolean";
        };
    };
    readonly render: ({ label, options, srOnlyLabel }: typeof args) => import('lit-html').TemplateResult<1>;
};
export declare const Primary: {};
export default meta;
//# sourceMappingURL=Select.stories.d.ts.map