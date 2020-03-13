import { JSDOM } from 'jsdom'

import { errorMessageBlock } from '../../../src/widgets/error'

jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

describe('errorMessageBlock', () => {
  it('exists', () => {
    expect(errorMessageBlock).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(errorMessageBlock(dom, 'my error message', undefined)).toMatchSnapshot()
  })
  it('sets the background color', () => {
    expect(errorMessageBlock(dom, 'my colored message', '#0ff')).toMatchSnapshot()
  })
})
