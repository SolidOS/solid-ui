import kb from '../../src/store'

jest.mock('solid-auth-client')

describe('kb (main global IndexedFormula instance)', () => {
  it('exists', () => {
    expect(kb).toBeInstanceOf(Object)
  })
})

describe('kb.fetcher', () => {
  it('exists', () => {
    expect((kb as any).fetcher).toBeInstanceOf(Object)
  })
})

describe('kb.updater', () => {
  it('exists', () => {
    expect((kb as any).updater).toBeInstanceOf(Object)
  })
})
