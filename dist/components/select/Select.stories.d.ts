declare const args: {
    label: string;
    options: string;
};
declare const meta: {
    readonly title: "Basic UI/Select";
    readonly args: {
        label: string;
        options: string;
    };
    readonly argTypes: {
        readonly label: {
            readonly control: "text";
        };
        readonly options: {
            readonly control: "text";
        };
    };
    readonly render: ({ label, options }: typeof args) => import('lit-html').TemplateResult<1>;
};
export declare const Primary: {};
export default meta;
//# sourceMappingURL=Select.stories.d.ts.map