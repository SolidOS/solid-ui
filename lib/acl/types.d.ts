/**
 * Contains types for src/acl/
 * @packageDocumentation
 */
import { NamedNode } from 'rdflib';
export type AgentMap = {
    [agentUri: string]: {
        [modeUri: string]: NamedNode;
    };
};
export type AgentUnion = {
    [agentUri: string]: true | [];
};
export type AgentMapMap<T = AgentMap> = {
    agent: T;
    agentClass: T;
    agentGroup: T;
    origin: T;
    originClass: T;
};
export type AgentMapUnion = AgentMapMap<AgentUnion>;
export type ComboList = {
    [key: string]: Array<string[]>;
};
export type PartialAgentTriple = {
    pred: string;
    obj: NamedNode;
};
//# sourceMappingURL=types.d.ts.map