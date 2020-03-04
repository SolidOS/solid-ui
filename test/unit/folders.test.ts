import { JSDOM } from 'jsdom'
import { deleteRecursive, deleteFolder } from '../../src/folders'
import * as RdfLib from 'rdflib'

jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

describe('deleteRecursive', () => {
  it('exists', () => {
    expect(deleteRecursive).toBeInstanceOf(Function)
  })
  it.skip('runs', async () => {
    ;(window as any).$rdf = RdfLib
    ;(window as any).$rdf.fetcher = new RdfLib.Fetcher((window as any).$rdf, {})
    expect(await deleteRecursive()).toEqual(undefined)
  })
})

describe('deleteFolder', () => {
  it('exists', () => {
    expect(deleteFolder).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(deleteFolder({}, RdfLib.graph(), dom)).toBeTruthy()
  })
})
