import { matrixForQuery } from '../../src/matrix'
import { JSDOM } from 'jsdom'

jest.mock('rdflib')
jest.mock('solid-auth-client')
const window = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window
const dom = window.document

describe('matrixForQuery', () => {
  it('exists', () => {
    expect(matrixForQuery).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(matrixForQuery(
      dom,
      '',
      '',
      '',
      '',
      {},
      () => {}
    )).toBeTruthy()
  })
})
