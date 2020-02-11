import { JSDOM } from 'jsdom'

import { default as LogWrapper } from '../../src/log'
jest.mock('rdflib')
jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

describe('Log Wrapper', () => {
  it('exists', () => {
    expect(LogWrapper).toBeInstanceOf(Object)
  })
})
