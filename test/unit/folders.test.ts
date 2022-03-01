import { silenceDebugMessages } from '../helpers/setup'
import { JSDOM } from 'jsdom'
import { deleteRecursive, deleteFolder } from '../../src/folders'
import { store } from 'solid-logic'

silenceDebugMessages()
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

describe('deleteRecursive', () => {
  it('exists', () => {
    expect(deleteRecursive).toBeInstanceOf(Function)
  })
  it.skip('runs', async () => {
    expect(await deleteRecursive(store, 'test/')).toEqual(undefined)
  })
})

describe('deleteFolder', () => {
  it('exists', () => {
    expect(deleteFolder).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    expect(await deleteFolder({}, undefined, dom)).toBeTruthy()
  })
})
