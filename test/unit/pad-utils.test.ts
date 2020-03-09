import { JSDOM } from 'jsdom'
import * as RdfLib from 'rdflib'
import { getChunks, notepadToHTML } from '../../src/pad-utils'

describe('getChunks', () => {
  it('exists', () => {
    expect(getChunks).toBeInstanceOf(Function)
  })
})

describe('notepadToHTML', () => {
  it('exists', () => {
    expect(notepadToHTML).toBeInstanceOf(Function)
  })
})