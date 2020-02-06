jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'
import { dom, element } from '../../helpers/dom'

import { errorMessageBlock } from '../../../src/widgets/error'

describe('button', () => {
  it('exists', () => {
    expect(errorMessageBlock).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(errorMessageBlock(dom, '', undefined)).toEqual(element)
  })
})