import { JSDOM } from 'jsdom'

import { default as Store } from '../../src/store'
jest.mock('rdflib')
jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

describe('Store', () => {
  it('exists', () => {
    expect(JSON.stringify(Store)).toEqual('{\"fetcher\":{},\"updater\":{}}')
  })
})
