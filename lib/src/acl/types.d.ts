/**
 * Contains types for src/acl/
 * @packageDocumentation
 */
import { NamedNode } from 'rdflib';
export declare type AgentMapMap = {
    agent: AgentMap;
    agentClass: AgentMap;
    agentGroup: AgentMap;
    origin: AgentMap;
    originClass: AgentMap;
};
export declare type AgentMap = {
    [agentUri: string]: {
        [modeUri: string]: NamedNode;
    };
};
export declare type ComboList = {
    [key: string]: Array<string[]>;
};
export declare type PartialAgentTriple = {
    pred: string;
    obj: NamedNode;
};
//# sourceMappingURL=types.d.ts.map