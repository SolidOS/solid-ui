import ns from '../../lib/ns'

export const Mode = {
  Read: 'Read',
  Write: 'Write',
  Append: 'Append',
  Control: 'Control'
} as const

export type ACLMode = (typeof Mode)[keyof typeof Mode]

export const PermissionType = {
  Agent: 'agent',
  AgentClass: 'agentClass',
  AgentGroup: 'agentGroup',
  Origin: 'origin',
  OriginClass: 'originClass'
} as const

export type ACLPermissionType = (typeof PermissionType)[keyof typeof PermissionType]

export const ACL_MODE_TO_PERMISSION: Record<string, ACLMode | undefined> = {
  [ns.acl('Read').uri]: Mode.Read,
  [ns.acl('Write').uri]: Mode.Write,
  [ns.acl('Append').uri]: Mode.Append,
  [ns.acl('Control').uri]: Mode.Control
}

export const ACL_PRED_TO_PERMISSION: Record<string, ACLPermissionType | undefined> = {
  [ns.acl('agent').uri]: PermissionType.Agent,
  [ns.acl('agentClass').uri]: PermissionType.AgentClass,
  [ns.acl('agentGroup').uri]: PermissionType.AgentGroup,
  [ns.acl('origin').uri]: PermissionType.Origin,
  [ns.acl('originClass').uri]: PermissionType.OriginClass
}
