export declare const users: {
    readonly Alice: {
        readonly webId: "https://alice.example/profile/card#me";
        readonly avatarUrl: "https://placecats.com/300/200";
    };
    readonly Bob: {
        readonly webId: "https://bob.example/profile/card#me";
        readonly avatarUrl: undefined;
    };
};
export declare const USER_OPTIONS: {
    control: {
        type: string;
        options: ("Alice" | "Bob" | "Guest" | "Initializing")[];
    };
    resolve(value: "Alice" | "Bob" | "Guest" | "Initializing"): {
        readonly webId: "https://alice.example/profile/card#me";
        readonly avatarUrl: "https://placecats.com/300/200";
    } | {
        readonly webId: "https://bob.example/profile/card#me";
        readonly avatarUrl: undefined;
    } | {
        readonly initialized: true;
    } | {
        readonly initialized: false;
    };
};
//# sourceMappingURL=stubs.d.ts.map