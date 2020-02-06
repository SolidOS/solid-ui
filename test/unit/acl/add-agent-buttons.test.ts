jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'

import * as AddAgentButtons from '../../../src/acl/add-agent-buttons'


describe('AddAgentButtons', () => {
  it.skip('exists', () => {
    expect(AddAgentButtons).toBeInstanceOf(Object)
  })
})