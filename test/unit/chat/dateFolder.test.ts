import * as RdfLib from 'rdflib'

import { default as DateFolder } from '../../../src/chat/dateFolder'
jest.mock('rdflib')
jest.mock('solid-auth-client')

describe('DateFolder', () => {
  it('exists', () => {
    expect(new DateFolder({ dir: () => {} })).toBeInstanceOf(DateFolder)
  })
})

describe('DateFolder#leafDocumentFromDate', () => {
  it('exists', () => {
    expect(new DateFolder({ dir: () => {} }).leafDocumentFromDate).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const dateFolder = new DateFolder({
      dir: () => {
        return {
          uri: ''
        }
      }
    })
    const result = dateFolder.leafDocumentFromDate({
      toISOString: () => ''
    })
    expect(result).toBeTruthy()
  })
})

describe('DateFolder#dateFromLeafDocument', () => {
  it('exists', () => {
    expect(new DateFolder({ dir: () => {} }).dateFromLeafDocument).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const dateFolder = new DateFolder({
      dir: () => {
        return {
          uri: ''
        }
      }
    })
    const result = dateFolder.dateFromLeafDocument({
      uri: {
        slice: () => '2020'
      }
    })
    expect(result).toEqual(new Date('2020'))
  })
})

describe('DateFolder#loadPrevious', () => {
  it('exists', () => {
    expect(new DateFolder({ dir: () => {} }).loadPrevious).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    const dateFolder = new DateFolder({
      dir: () => {
        return {
          uri: ''
        }
      }
    })
    const result = await dateFolder.loadPrevious({
      toISOString: () => ''
    })
    expect(result).toEqual(null)
  })
})

describe('DateFolder#firstLeaf', () => {
  it('exists', () => {
    expect(new DateFolder({ dir: () => {} }).firstLeaf).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    const dateFolder = new DateFolder({
      dir: () => {
        return {
          uri: ''
        }
      }
    })
    ;(window as any).$rdf = RdfLib
    await expect(dateFolder.firstLeaf()).rejects.toThrow(' No children to         parent2 [object Object]')
  })
})
