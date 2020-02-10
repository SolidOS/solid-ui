jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'
import { dom } from '../helpers/dom'

import { default as Store } from '../../src/store'
  
describe('Store', () => {
  it('exists', () => {
    expect(JSON.stringify(Store)).toEqual('{\"fetcher\":{},\"updater\":{}}')
  })
})
