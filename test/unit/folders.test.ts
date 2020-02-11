jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

import { deleteRecursive, deleteFolder } from '../../src/folders'

describe('deleteRecursive', () => {
  it('exists', () => {
    expect(deleteRecursive).toBeInstanceOf(Function)
  })
})

describe('deleteFolder', () => {
  it('exists', () => {
    expect(deleteFolder).toBeInstanceOf(Function)
  })
})
