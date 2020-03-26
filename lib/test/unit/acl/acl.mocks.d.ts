export declare const DEFAULT_CONTAINER_DOC: import("rdflib").NamedNode;
export declare const DEFAULT_CONTAINER_ACL: import("rdflib").NamedNode;
export declare const DEFAULT_RESOURCE_DOC: import("rdflib").NamedNode;
export declare const DEFAULT_RESOURCE_ACL: import("rdflib").NamedNode;
export declare const PROFILE: import("rdflib").NamedNode;
export declare const ACL_LINK: import("rdflib").NamedNode;
export declare const mocks: {
    aclWithAllAgents: Promise<string>;
    defaultAcl: Promise<string>;
    defaultAclDuplicate: Promise<string>;
    docAcl: Promise<string>;
};
export declare function getAgentMapForAclWithAllAgents(): {
    agent: {
        [x: string]: {
            [x: number]: import("rdflib").NamedNode;
        };
    };
    agentClass: {
        [x: number]: {
            [x: number]: import("rdflib").NamedNode;
        };
    };
    agentGroup: {
        [x: string]: {
            [x: number]: import("rdflib").NamedNode;
        };
    };
    origin: {
        [x: string]: {
            [x: number]: import("rdflib").NamedNode;
        };
    };
    originClass: {
        [x: string]: {
            [x: number]: import("rdflib").NamedNode;
        };
    };
};
export declare function getAgentMapForAclWithAllAgentsUsingDefaults(): {
    agent: {
        [x: string]: {
            [x: number]: import("rdflib").NamedNode;
        };
    };
    agentClass: {
        [x: number]: {
            [x: number]: import("rdflib").NamedNode;
        };
    };
    agentGroup: {
        [x: string]: {
            [x: number]: import("rdflib").NamedNode;
        };
    };
    origin: {
        [x: string]: {
            [x: number]: import("rdflib").NamedNode;
        };
    };
    originClass: {
        [x: string]: {
            [x: number]: import("rdflib").NamedNode;
        };
    };
};
//# sourceMappingURL=acl.mocks.d.ts.map