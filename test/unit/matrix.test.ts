import { silenceDebugMessages } from '../helpers/setup'
import { matrix } from '../../src/matrix'
import { JSDOM } from 'jsdom'

silenceDebugMessages()
jest.mock('solid-auth-client')
const window = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window
const dom = window.document

describe('matrixForQuery', () => {
  it('exists', () => {
    expect(matrix.matrixForQuery).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(matrix.matrixForQuery(
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
