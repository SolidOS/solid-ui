import { NamedNode } from 'rdflib'
import { ACLMode, ACLPermissionType } from './constants'

export interface Permission {
  type: ACLPermissionType
  target: NamedNode
  modes: ACLMode[]
}

export type ACLResult =
  | {
      kind: 'found'
      acl: NamedNode
    }
  | {
      kind: 'missing'
      message: string
    }
  | {
      kind: 'error'
      status?: number
      message: string
    }
