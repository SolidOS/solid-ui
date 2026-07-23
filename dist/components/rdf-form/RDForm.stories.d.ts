declare const meta: {
    readonly title: "Design System/RDF Form";
    readonly args: {
        readonly formUrl: "https://solidos.solidcommunity.net/public/2021/solidUiFormTestData/dummyFormTestFile.ttl";
        readonly subjectUrl: "https://solidos.solidcommunity.net/public/2021/alice.ttl#me";
    };
    readonly argTypes: {
        readonly formUrl: {
            readonly control: "text";
        };
        readonly subjectUrl: {
            readonly control: "text";
        };
    };
};
export default meta;
export declare const Primary: {
    render: ({ formUrl, subjectUrl }: typeof meta.args) => import('lit-html').TemplateResult<1>;
};
//# sourceMappingURL=RDForm.stories.d.ts.map