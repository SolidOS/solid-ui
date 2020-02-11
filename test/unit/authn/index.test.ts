import * as Authn from '../../../src/authn/authn'
import * as Index from '../../../src/authn/authn'
jest.mock('rdflib')
jest.mock('solid-auth-client')

describe('authn/index', () => {
  it('exports all of authn/authn', () => {
    for (const k in Authn) {
      if (k !== 'default') {
        expect(Index[k]).toEqual(Authn[k])
      }
    }
  })
})
