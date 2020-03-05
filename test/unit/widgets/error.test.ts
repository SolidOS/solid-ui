import { JSDOM } from 'jsdom'

import { errorMessageBlock } from '../../../src/widgets/error'

jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

describe('button', () => {
  it('exists', () => {
    expect(errorMessageBlock).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(errorMessageBlock(dom, '', undefined)).toBeTruthy()
  })
})
