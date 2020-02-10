jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'
import { dom } from '../helpers/dom'

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
