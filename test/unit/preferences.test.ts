import { describe, expect, it, vi } from 'vitest'
import { silenceDebugMessages } from './helpers/debugger'
import { JSDOM } from 'jsdom'
vi.mock('../../src/login/login', () => ({
  ensureLoadedPreferences: vi.fn()
}))

import * as loginModule from '../../src/login/login'
import * as Preferences from '../../src/lib/preferences'
import { sym } from 'rdflib'

silenceDebugMessages()
const window = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window
const dom = window.document

describe('Preferences', () => {
  it.skip('exists', () => {
    expect(Preferences).toBeInstanceOf(Function)
  })
})

describe('Preferences.value', () => {
  it('exists', () => {
    expect(Preferences.value).toEqual([])
  })
})

describe('Preferences.get', () => {
  it('exists', () => {
    expect(Preferences.get).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(Preferences.get(10)).toEqual(undefined)
  })
})

describe('Preferences.set', () => {
  it('exists', () => {
    expect(Preferences.set).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(Preferences.set(10, 'a')).toEqual(undefined)
  })
})

describe('Preferences.renderPreferencesForm', () => {
  it('exists', () => {
    expect(Preferences.renderPreferencesForm).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const subject = sym('https://test.test')
    const theClass = {}
    const preferencesForm = {}
    const context = { dom }
    expect(Preferences.renderPreferencesForm(
      subject, theClass, preferencesForm, context
    )).toBeTruthy()
  })
})

describe('Preferences.recordSharedPreferences', () => {
  it('exists', () => {
    expect(Preferences.recordSharedPreferences).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const subject = sym('https://test.test/sub')
    const context = {}
    expect(Preferences.recordSharedPreferences(subject, context)).toBeTruthy()
  })
})

describe('Preferences.recordPersonalDefaults', () => {
  it('does not try to load preferences when there is no logged-in user', async () => {
    const ensureLoadedPreferencesMock = vi.mocked(loginModule.ensureLoadedPreferences)

    const context = { me: null }
    const result = await Preferences.recordPersonalDefaults(sym('https://test.example/class'), context)
    expect(result).toBe(context)
    expect(ensureLoadedPreferencesMock).not.toHaveBeenCalled()
  })
})

describe('Preferences.getPreferencesForClass', () => {
  it('exists', () => {
    expect(Preferences.getPreferencesForClass).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const subject = sym('https://test.test/sub')
    const theClass = sym('https://test.test/class')
    const predicates = [sym('https://test.test/pred')]
    const context = {}
    expect(Preferences.getPreferencesForClass(subject, theClass, predicates, context)).toBeTruthy()
  })
})
