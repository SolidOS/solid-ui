jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'

import {
  ACLControlBox5,
  preventBrowserDropEvents,
  shortNameForFolder
} from '../../../src/acl/acl-control'

describe('ACLControlBox5', () => {
  it('exists', () => {
    expect(ACLControlBox5).toBeInstanceOf(Function)
  })
})

describe('preventBrowserDropEvents', () => {
  it('exists', () => {
    expect(preventBrowserDropEvents).toBeInstanceOf(Function)
  })
})

describe('shortNameForFolder', () => {
  it('exists', () => {
    expect(shortNameForFolder).toBeInstanceOf(Function)
  })
})