import { sym } from 'rdflib'
import ns from '../../../src/ns'
import { getFileContent } from '../helpers/getFileContent'
import { resolve } from 'path'

export const DEFAULT_CONTAINER_DOC = sym('https://example.com/doc.ttl')
export const DEFAULT_CONTAINER_ACL = sym('https://example.com/doc.ttl.acl')
export const DEFAULT_RESOURCE_DOC = sym('https://example.com/')
export const DEFAULT_RESOURCE_ACL = sym('https://example.com/.acl')
export const PROFILE = sym('https://example.com/profile/card#me')
export const ACL_LINK = sym('http://www.iana.org/assignments/link-relations/acl')

export const mocks = {
  aclWithAllAgents: getFileContent(resolve(__dirname, './mocks/aclWithAllAgents.ttl')),
  defaultAcl: getFileContent(resolve(__dirname, './mocks/defaultAcl.ttl')),
  defaultAclDuplicate: getFileContent(resolve(__dirname, './mocks/defaultAclDuplicate.ttl')),
  docAcl: getFileContent(resolve(__dirname, './mocks/docAcl.ttl'))
}

export function getAgentMapForAclWithAllAgents () {
  return {
    agent: {
      [PROFILE.uri]: {
        [ns.acl('Read').uri]: sym(DEFAULT_RESOURCE_ACL.uri + '#1')
      }
    },
    agentClass: {
      [ns.foaf('Agent').uri]: {
        [ns.acl('Read').uri]: sym(DEFAULT_RESOURCE_ACL.uri + '#2a')
      }
    },
    agentGroup: {
      [DEFAULT_RESOURCE_DOC.uri + '#group']: {
        [ns.acl('Read').uri]: sym(DEFAULT_RESOURCE_ACL.uri + '#3a')
      }
    },
    origin: {
      [DEFAULT_RESOURCE_DOC.uri + '#origin']: {
        [ns.acl('Read').uri]: sym(DEFAULT_RESOURCE_ACL.uri + '#4')
      }
    },
    originClass: {
      [DEFAULT_RESOURCE_DOC.uri + '#originClass']: {
        [ns.acl('Read').uri]: sym(DEFAULT_RESOURCE_ACL.uri + '#5')
      }
    }
  }
}

export function getAgentMapForAclWithAllAgentsUsingDefaults () {
  return {
    agent: {
      [PROFILE.uri]: {
        [ns.acl('Read').uri]: sym(DEFAULT_RESOURCE_ACL.uri + '#1')
      }
    },
    agentClass: {
      [ns.foaf('Agent').uri]: {
        [ns.acl('Read').uri]: sym(DEFAULT_RESOURCE_ACL.uri + '#2b')
      }
    },
    agentGroup: {
      [DEFAULT_RESOURCE_DOC.uri + '#group']: {
        [ns.acl('Read').uri]: sym(DEFAULT_RESOURCE_ACL.uri + '#3b')
      }
    },
    origin: {
      [DEFAULT_RESOURCE_DOC.uri + '#origin']: {
        [ns.acl('Read').uri]: sym(DEFAULT_RESOURCE_ACL.uri + '#4')
      }
    },
    originClass: {
      [DEFAULT_RESOURCE_DOC.uri + '#originClass']: {
        [ns.acl('Read').uri]: sym(DEFAULT_RESOURCE_ACL.uri + '#5')
      }
    }
  }
}
