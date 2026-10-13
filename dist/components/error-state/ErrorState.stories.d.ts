declare const args: {
    readonly title: "Something went wrong";
    readonly message: "We could not load this content. Please try again.";
    readonly details: "";
    readonly linkText: "";
    readonly linkHref: "";
};
declare const meta: {
    readonly title: "Basic UI/Error State";
    readonly args: {
        readonly title: "Something went wrong";
        readonly message: "We could not load this content. Please try again.";
        readonly details: "";
        readonly linkText: "";
        readonly linkHref: "";
    };
    readonly argTypes: {
        readonly title: {
            readonly control: "text";
        };
        readonly message: {
            readonly control: "text";
        };
        readonly details: {
            readonly control: "text";
        };
        readonly linkText: {
            readonly control: "text";
        };
        readonly linkHref: {
            readonly control: "text";
        };
    };
    readonly render: ({ title, message, details, linkText, linkHref }: typeof args) => import('lit-html').TemplateResult<1>;
};
export declare const Primary: {};
export declare const Detailed: {
    args: {
        title: string;
        message: string;
        details: string;
    };
};
export declare const WithRecoveryLink: {
    args: {
        title: string;
        message: string;
        linkText: string;
        linkHref: string;
    };
};
export default meta;
//# sourceMappingURL=ErrorState.stories.d.ts.map