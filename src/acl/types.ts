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

export type ComboList = Array<NamedNode[]>
