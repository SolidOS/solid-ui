import { silenceDebugMessages } from '../../helpers/setup'
import { JSDOM } from 'jsdom'
import {
  defaultTestUser, // Sync
  filterAvailablePanes, // Async
  logIn,
  loginStatusBox,
  newAppInstance,
  registrationControl,
  registrationList,
  selectWorkspace
} from '../../../src/login/login'
import { sym } from 'rdflib'
import { AppDetails, AuthenticationContext } from 'solid-logic'

silenceDebugMessages()
const window = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window
const dom = window.document

describe('defaultTestUser', () => {
  it('exists', () => {
    expect(defaultTestUser).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    expect(await defaultTestUser()).toEqual(null)
  })
})

describe('filterAvailablePanes', () => {
  it('exists', () => {
    expect(filterAvailablePanes).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    expect(await filterAvailablePanes([])).toEqual([])
  })
})

describe('logIn', () => {
  it('exists', () => {
    expect(logIn).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(logIn({})).toBeInstanceOf(Object)
  })
})

describe('loginStatusBox', () => {
  it('exists', () => {
    expect(loginStatusBox).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(loginStatusBox(dom, () => {}, {})).toBeInstanceOf(Object)
  })
})

describe('newAppInstance', () => {
  it('exists', () => {
    expect(newAppInstance).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(newAppInstance(dom, {} as AppDetails, () => {})).toBeTruthy()
  })
})

describe('registrationControl', () => {
  it('exists', () => {
    expect(registrationControl).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    expect(await registrationControl(
      {} as AuthenticationContext,
      sym('https://test.test#'),
      sym('https://test.test#')
    )).toEqual(undefined)
  })
})

describe('registrationList', () => {
  it('exists', () => {
    expect(registrationList).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    expect(registrationList(
      { dom } as AuthenticationContext,
      {}
    )).toEqual(undefined)
  })
})

describe('selectWorkspace', () => {
  it('exists', () => {
    expect(selectWorkspace).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(selectWorkspace(
      dom,
      {} as AppDetails,
      () => {}
    )).toBeTruthy()
  })
})
