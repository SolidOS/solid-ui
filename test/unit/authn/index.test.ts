jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'

import * as Authn from '../../../src/authn/authn'
import * as Index from '../../../src/authn/authn'

describe('authn/index', () => {
  it('exports all of authn/authn', () => {
    for (let k in Authn) {
      if (k !== 'default') {
        expect(Index[k]).toEqual(Authn[k])
      }
    }
  })
})