import * as Acl from '../../../src/acl/acl'
import * as AclControl from '../../../src/acl/acl-control'
import { acl, aclControl } from '../../../src/acl/index'
import { JSDOM } from 'jsdom'

jest.mock('rdflib')
jest.mock('solid-auth-client')

describe('acl/index:acl', () => {
  it('exports all of acl/acl', () => {
    for (const k in Acl) {
      if (k !== 'getProspectiveHolder') {
        expect(acl[k]).toEqual(Acl[k])
      }
    }
  })
  it('exports all of acl/acl-control', () => {
    for (const k in AclControl) {
      expect(aclControl[k]).toEqual(AclControl[k])
    }
  })
})
