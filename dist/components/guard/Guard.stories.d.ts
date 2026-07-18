declare const meta: {
    readonly title: "Solid/Guard";
    readonly args: {
        readonly user: "Alice";
    };
    readonly argTypes: {
        readonly user: {
            type: string;
            options: ("Alice" | "Bob" | "Guest" | "Initializing")[];
        };
    };
    readonly render: () => import('lit-html').TemplateResult<1>;
};
export declare const Primary: {};
export declare const Guest: {
    args: {
        user: string;
    };
};
export declare const Initializing: {
    args: {
        user: string;
    };
};
export default meta;
//# sourceMappingURL=Guard.stories.d.ts.map