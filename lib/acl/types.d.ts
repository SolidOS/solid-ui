/**
 * Contains types for src/acl/
 * @packageDocumentation
 */
import { NamedNode } from 'rdflib';
export declare type AgentMap = {
    [agentUri: string]: {
        [modeUri: string]: NamedNode;
    };
};
export declare type AgentUnion = {
    [agentUri: string]: true | [];
};
export declare type AgentMapMap<T = AgentMap> = {
    agent: T;
    agentClass: T;
    agentGroup: T;
    origin: T;
    originClass: T;
};
export declare type AgentMapUnion = AgentMapMap<AgentUnion>;
export declare type ComboList = {
    [key: string]: Array<string[]>;
};
export declare type PartialAgentTriple = {
    pred: string;
    obj: NamedNode;
};
//# sourceMappingURL=types.d.ts.map