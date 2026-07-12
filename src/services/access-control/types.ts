import { NamedNode } from "rdflib"
import { Mode, PermissionType } from './constants'

export type Mode =
  (typeof Mode)[keyof typeof Mode]

export type PermissionType =
  (typeof PermissionType)[keyof typeof PermissionType]

export interface Permission {
  type: PermissionType
  target: NamedNode
  modes: Mode[]
}
