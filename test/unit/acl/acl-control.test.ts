import { DataBrowserContext } from 'pane-registry'
import { sym, graph, namedNode } from 'rdflib'
import { JSDOM } from 'jsdom'
import {
  ACLControlBox5,
  preventBrowserDropEvents,
  shortNameForFolder
} from '../../../src/acl/acl-control'

jest.mock('solid-auth-client')
const window = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window
const dom = window.document

describe('ACLControlBox5', () => {
  it('exists', () => {
    expect(ACLControlBox5).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    expect(ACLControlBox5(
      sym('https://test.test'),
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
    expect(shortNameForFolder(sym('https://test.test/uri'))).toEqual('uri')
  })
  it('works with trailing slashes', () => {
    expect(shortNameForFolder(namedNode('http://example.com/some/folder/'))).toEqual('folder')
  })

  it('works without trailing slashes', () => {
    expect(shortNameForFolder(namedNode('http://example.com/some/folder'))).toEqual('folder')
  })

  it('works with domain root with trailing slash', () => {
    expect(shortNameForFolder(namedNode('http://example.com/'))).toEqual('example.com')
  })

  it('works with domain root without trailing slash', () => {
    expect(shortNameForFolder(namedNode('http://example.com'))).toEqual('example.com')
  })

  it('works with protocol root', () => {
    // Note: I'm not certain this is actually by design, it might be
    // that the intended behaviour was that the domain root would get
    // labeled '/'. See https://github.com/solid/solid-ui/issues/196
    expect(shortNameForFolder(namedNode('http://'))).toEqual('/')
  })
})
