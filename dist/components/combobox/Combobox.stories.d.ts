declare const meta: {
    readonly title: "Basic UI/Combobox";
    readonly args: {
        readonly label: "What is the best food?";
        readonly options: "Pizza, Ramen, Tacos";
        readonly asyncJSOptions: false;
        readonly asyncHtmlOptions: false;
    };
    readonly argTypes: {
        readonly label: {
            readonly control: "text";
        };
        readonly options: {
            readonly control: "text";
        };
        readonly asyncJSOptions: {
            readonly control: "boolean";
        };
        readonly asyncHtmlOptions: {
            readonly control: "boolean";
        };
    };
    readonly render: ({ label, options, asyncJSOptions, asyncHtmlOptions }: {
        label: any;
        options: any;
        asyncJSOptions: any;
        asyncHtmlOptions: any;
    }) => import('lit-html').TemplateResult<1>;
};
export declare const Primary: {};
export declare const AsyncWithJS: {
    args: {
        label: string;
        asyncJSOptions: boolean;
    };
};
export declare const AsyncWithHtml: {
    args: {
        label: string;
        asyncHtmlOptions: boolean;
    };
};
export default meta;
//# sourceMappingURL=Combobox.stories.d.ts.map