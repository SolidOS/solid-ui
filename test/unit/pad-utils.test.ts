import { JSDOM } from 'jsdom'
import * as RdfLib from 'rdflib'
import { getChunks } from '../../src/pad-utils'

describe('getChunks', () => {
  it('exists', () => {
    expect(getChunks).toBeInstanceOf(Function)
  })
})
