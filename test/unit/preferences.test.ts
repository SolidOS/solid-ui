import Preferences from '../../src/preferences'
jest.mock('rdflib')
jest.mock('solid-auth-client')

describe('Preferences', () => {
  it('exists', () => {
    expect(Preferences).toBeInstanceOf(Object)
  })
})

describe('Preferences.get', () => {
  it('exists', () => {
    expect(Preferences.get).toBeInstanceOf(Function)
  })
})

describe('Preferences.set', () => {
  it('exists', () => {
    expect(Preferences.set).toBeInstanceOf(Function)
  })
})

describe('Preferences.renderPreferencesForm', () => {
  it('exists', () => {
    expect(Preferences.renderPreferencesForm).toBeInstanceOf(Function)
  })
})

describe('Preferences.recordSharedPreferences', () => {
  it('exists', () => {
    expect(Preferences.recordSharedPreferences).toBeInstanceOf(Function)
  })
})

describe('Preferences.getPreferencesForClass', () => {
  it('exists', () => {
    expect(Preferences.getPreferencesForClass).toBeInstanceOf(Function)
  })
})
