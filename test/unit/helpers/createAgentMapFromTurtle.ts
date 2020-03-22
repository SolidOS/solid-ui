import { NamedNode } from 'rdflib'
import { AgentMapMap } from '../../../src/acl/types'
import { createGraphFromTurtle } from './createGraphFromTurtle'
import { readACL } from '../../../src/acl/acl'

export async function createAgentMapFromTurtle (turtle: string, resourceDoc: NamedNode, aclDoc: NamedNode): Promise<AgentMapMap> {
  const store = await createGraphFromTurtle(turtle, aclDoc.uri)
  return readACL(resourceDoc, aclDoc, store)
}
