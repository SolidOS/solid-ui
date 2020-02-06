jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'

import { errorMessageBlock } from '../../../src/widgets/error'

describe('button', () => {
  it('exists', () => {
    expect(errorMessageBlock).toBeInstanceOf(Function)
  })
})