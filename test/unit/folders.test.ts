import { deleteRecursive, deleteFolder } from '../../src/folders'
jest.mock('rdflib')
jest.mock('solid-auth-client')

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
