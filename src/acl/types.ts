/**
 * Contains types for src/acl/
 * @packageDocumentation
 */

import { NamedNode } from 'rdflib'

export type AgentMapMap = {
  agent: AgentMap,
  agentClass: AgentMap,
  agentGroup: AgentMap,
  origin: AgentMap,
  originClass: AgentMap
}

export type AgentMap = {
  [agentUri: string]: {
    [modeUri: string]: NamedNode
  }
}

export type ComboList = { [key: string]: Array<string[]> }

export type PartialAgentTriple = {
  pred: string,
  obj: NamedNode
}
