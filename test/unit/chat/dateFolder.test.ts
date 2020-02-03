import { default as DateFolder } from '../../../src/chat/dateFolder'

describe('DateFolder', () => {
  it('exists', () => {
    expect(new DateFolder({ dir: () => {} })).toBeInstanceOf(DateFolder)
  })
})

describe('DateFolder#leafDocumentFromDate', () => {
  it('exists', () => {
    expect(new DateFolder({ dir: () => {} }).leafDocumentFromDate).toBeInstanceOf(Function)
  })
})

describe('DateFolder#dateFromLeafDocument', () => {
  it('exists', () => {
    expect(new DateFolder({ dir: () => {} }).dateFromLeafDocument).toBeInstanceOf(Function)
  })
})

describe('DateFolder#loadPrevious', () => {
  it('exists', () => {
    expect(new DateFolder({ dir: () => {} }).loadPrevious).toBeInstanceOf(Function)
  })
})

describe('DateFolder#firstLeaf', () => {
  it('exists', () => {
    expect(new DateFolder({ dir: () => {} }).firstLeaf).toBeInstanceOf(Function)
  })
})
