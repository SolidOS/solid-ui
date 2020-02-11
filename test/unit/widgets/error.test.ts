jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document
const element = dom.createElement('div')

import { errorMessageBlock } from '../../../src/widgets/error'

describe('button', () => {
  it('exists', () => {
    expect(errorMessageBlock).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(errorMessageBlock(dom, '', undefined)).toBeTruthy()
  })
})