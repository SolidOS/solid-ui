import { silenceDebugMessages } from '../helpers/setup'
import { solidLogicSingleton } from '../../src/logic'

silenceDebugMessages()
jest.mock('solid-auth-client')

describe('solidLogicSingleton (main global SolidLogic instance)', () => {
  it('exists', () => {
    expect(solidLogicSingleton).toBeInstanceOf(Object)
  })
})

describe('solidLogicSingleton.store', () => {
  it('exists', () => {
    expect(solidLogicSingleton.store).toBeInstanceOf(Object)
  })
})

describe('solidLogicSingleton.store.fetcher', () => {
  it('exists', () => {
    expect(solidLogicSingleton.store.fetcher).toBeInstanceOf(Object)
  })
})

describe('solidLogicSingleton.store.updater', () => {
  it('exists', () => {
    expect(solidLogicSingleton.store.updater).toBeInstanceOf(Object)
  })
})
