declare const meta: {
    readonly title: "Solid/Avatar";
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
export declare const Fallback: {
    args: {
        user: string;
    };
};
export declare const Guest: {
    args: {
        user: string;
    };
};
export default meta;
//# sourceMappingURL=Avatar.stories.d.ts.map