jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'

import * as Acl from '../../../src/acl/acl'
import * as AclControl from '../../../src/acl/acl-control'
import { acl, aclControl } from '../../../src/acl/index'

describe('acl/index:acl', () => {
  it('exports all of acl/acl', () => {
    for (let k in Acl) {
      if (k !== 'getProspectiveHolder') {
        expect(acl[k]).toEqual(Acl[k])
      }
    }
  })
  it('exports all of acl/acl-control', () => {
    for (let k in AclControl) {
      expect(aclControl[k]).toEqual(AclControl[k])
    }
  })
})