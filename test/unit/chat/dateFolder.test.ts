import * as RdfLib from 'rdflib'
import DateFolder from '../../../src/chat/dateFolder'

jest.mock('solid-auth-client')

describe('DateFolder', () => {
  it('exists', () => {
    expect(new DateFolder(RdfLib.sym('https://domain.tld/dir/'))).toBeInstanceOf(DateFolder)
  })
})

describe('DateFolder#leafDocumentFromDate', () => {
  it('exists', () => {
    expect(new DateFolder(RdfLib.sym('https://domain.tld/dir/')).leafDocumentFromDate).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const dateFolder = new DateFolder(RdfLib.sym('https://domain.tld/dir/'))
    const result = dateFolder.leafDocumentFromDate(new Date(2020, 1, 1))
    expect(result).toBeTruthy()
  })
})

describe('DateFolder#dateFromLeafDocument', () => {
  it('exists', () => {
    expect(new DateFolder(RdfLib.sym('https://domain.tld/dir/')).dateFromLeafDocument).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const dateFolder = new DateFolder(RdfLib.sym('https://domain.tld/dir/'))
    const result = dateFolder.dateFromLeafDocument(RdfLib.sym('https://domain.tld/2020/01'))
    expect(result).toEqual(new Date('2020'))
  })
})

describe('DateFolder#loadPrevious', () => {
  it('exists', () => {
    expect(new DateFolder(RdfLib.sym('https://domain.tld/dir/')).loadPrevious).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    const dateFolder = new DateFolder(RdfLib.sym('https://domain.tld/dir/'))
    const result = await dateFolder.loadPrevious(new Date(2020, 1, 1))
    expect(result).toEqual(null)
  })
})

describe('DateFolder#firstLeaf', () => {
  it('exists', () => {
    expect(new DateFolder(RdfLib.sym('https://domain.tld/dir/')).firstLeaf).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    const dateFolder = new DateFolder(RdfLib.sym('https://domain.tld/dir/'))
    ;(window as any).$rdf = RdfLib
    await expect(dateFolder.firstLeaf()).rejects.toThrow(' @@@  No children to         parent2 <https://domain.tld/>')
  })
})
