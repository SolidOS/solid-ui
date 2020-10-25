import { silenceDebugMessages } from '../helpers/setup'
import kb from '../../src/store'

silenceDebugMessages()
jest.mock('solid-auth-client')

describe('kb (main global IndexedFormula instance)', () => {
  it('exists', () => {
    expect(kb).toBeInstanceOf(Object)
  })
})

describe('kb.fetcher', () => {
  it('exists', () => {
    expect(kb.fetcher).toBeInstanceOf(Object)
  })
})

describe('kb.updater', () => {
  it('exists', () => {
    expect(kb.updater).toBeInstanceOf(Object)
  })
})
