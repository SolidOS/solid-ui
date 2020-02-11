import { DataBrowserContext } from 'pane-registry'
import { sym, graph } from 'rdflib'
import { JSDOM } from 'jsdom'
import {
  ACLControlBox5,
  preventBrowserDropEvents,
  shortNameForFolder
} from '../../../src/acl/acl-control'

jest.mock('rdflib')
jest.mock('solid-auth-client')
const window = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window
const dom = window.document

describe('ACLControlBox5', () => {
  it('exists', () => {
    expect(ACLControlBox5).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    expect(ACLControlBox5(
      sym(''),
      { dom } as DataBrowserContext,
      {} as any,
      graph())).toBeInstanceOf(HTMLElement)
  })
})

describe('preventBrowserDropEvents', () => {
  it('exists', () => {
    expect(preventBrowserDropEvents).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(preventBrowserDropEvents(dom)).toEqual(undefined)
  })
})

describe('shortNameForFolder', () => {
  it('exists', () => {
    expect(shortNameForFolder).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(shortNameForFolder(sym(''))).toEqual('uri')
  })
})
