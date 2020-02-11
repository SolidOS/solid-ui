jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

import { default as Store } from '../../src/store'
  
describe('Store', () => {
  it('exists', () => {
    expect(JSON.stringify(Store)).toEqual('{\"fetcher\":{},\"updater\":{}}')
  })
})
