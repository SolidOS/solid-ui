import { JSDOM } from 'jsdom'
import { Preferences } from '../../src/preferences'
import { sym } from 'rdflib'

jest.mock('solid-auth-client')
const window = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window
const dom = window.document

describe('Preferences', () => {
  it.skip('exists', () => {
    expect(new Preferences()).toBeInstanceOf(Object)
  })
})

describe('Preferences.value', () => {
  it('exists', () => {
    expect(new Preferences().get('t')).toEqual([])
  })
})

describe('Preferences.get', () => {
  it('exists', () => {
    expect(new Preferences().get).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(new Preferences().get(10)).toEqual(undefined)
  })
})

describe('Preferences.set', () => {
  it('exists', () => {
    expect(new Preferences().set).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(new Preferences().set(10, 'a')).toEqual(undefined)
  })
})

describe('Preferences.renderPreferencesForm', () => {
  it('exists', () => {
    expect(new Preferences().renderPreferencesForm).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const subject = sym('https://test.test')
    const theClass = {}
    const preferencesForm = {}
    const context = { dom }
    expect(new Preferences().renderPreferencesForm(
      subject, theClass, preferencesForm, context
    )).toBeTruthy()
  })
})

describe('Preferences.recordSharedPreferences', () => {
  it('exists', () => {
    expect(new Preferences().recordSharedPreferences).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const subject = null
    const context = null
    expect(new Preferences().recordSharedPreferences(subject, context).then())
  })
})

describe('Preferences.getPreferencesForClass', () => {
  it('exists', () => {
    expect(new Preferences().getPreferencesForClass).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const subject = null
    const theClass = null
    const predicates = null
    const context = null
    expect(new Preferences().getPreferencesForClass(subject, theClass, predicates, context)).toBeTruthy()
  })
})
