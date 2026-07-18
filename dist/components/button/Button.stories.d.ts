declare const args: {
    readonly text: "Save Changes";
    readonly title: "";
    readonly variant: "primary";
    readonly icon: "None";
    readonly leftIcon: "None";
    readonly rightIcon: "None";
    readonly disabled: false;
    readonly loading: false;
};
declare const meta: {
    readonly title: "Basic UI/Button";
    readonly args: {
        readonly text: "Save Changes";
        readonly title: "";
        readonly variant: "primary";
        readonly icon: "None";
        readonly leftIcon: "None";
        readonly rightIcon: "None";
        readonly disabled: false;
        readonly loading: false;
    };
    readonly argTypes: {
        readonly variant: {
            readonly control: "select";
            readonly options: readonly ["primary", "secondary", "tertiary", "outline", "ghost"];
        };
        readonly title: {
            readonly control: "text";
        };
        readonly icon: {
            type: string;
            options: ("Check" | "Plus" | "Log In" | "Help" | "None")[];
        };
        readonly leftIcon: {
            type: string;
            options: ("Check" | "Plus" | "Log In" | "Help" | "None")[];
        };
        readonly rightIcon: {
            type: string;
            options: ("Check" | "Plus" | "Log In" | "Help" | "None")[];
        };
        readonly text: {
            readonly control: "text";
        };
        readonly disabled: {
            readonly control: "boolean";
        };
        readonly loading: {
            readonly control: "boolean";
        };
    };
    readonly render: ({ icon, leftIcon, rightIcon, variant, disabled, loading, title, text }: typeof args) => import('lit-html').TemplateResult<1>;
};
export declare const Primary: {};
export declare const Secondary: {
    args: {
        text: string;
        variant: string;
    };
};
export declare const Tertiary: {
    args: {
        text: string;
        variant: string;
        leftIcon: string;
    };
};
export declare const Outline: {
    args: {
        text: string;
        variant: string;
        leftIcon: string;
    };
};
export declare const Ghost: {
    args: {
        text: string;
        variant: string;
        icon: string;
        title: string;
    };
};
export default meta;
//# sourceMappingURL=Button.stories.d.ts.map