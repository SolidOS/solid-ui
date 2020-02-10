jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'
import { dom, element } from '../helpers/dom'

import * as pad from '../../src/pad'

describe('lightColorHash', () => {
  it('exists', () => {
    expect((pad as any).lightColorHash).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect((pad as any).lightColorHash(null)).toBe('#ffffff')
  })
})
describe('renderPartipants', () => {
  it('exists', () => {
    expect((pad as any).renderPartipants).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const table = dom.createElement()
    const padDoc = null
    const subject = RdfLib.sym('')
    const me = 'webId'
    const options = {}
    expect(
      (pad as any).renderPartipants(dom, table, padDoc, subject, me, options)
    ).toBeTruthy()
  })
})
describe('participationObject', () => {
  it('exists', () => {
    expect((pad as any).participationObject).toBeInstanceOf(Function)
  })
  // TODO: check on arguments
  const subject = null
  const padDoc = null
  const me = null
  it('runs', () => {
    expect((pad as any).participationObject(subject, padDoc, me)).resolves.toBe({})
  })
})
describe('recordParticipation', () => {
  it('exists', () => {
    expect((pad as any).recordParticipation).toBeInstanceOf(Function)
  })
  const subject = null
  const padDoc = null
  const refreshable = true
  it('runs', () => {
    expect((pad as any).recordParticipation(subject, padDoc, refreshable)).toBe(
      undefined
    )
  })
})
describe('manageParticipation', () => {
  it('exists', () => {
    expect((pad as any).manageParticipation).toBeInstanceOf(Function)
  })
  const container = dom.createElement()
  const padDoc = null
  const subject = null
  const me = null
  const options = {}
  it('runs', () => {
    expect(
      (pad as any).manageParticipation(dom, container, padDoc, subject, me, options)
    ).toBeTruthy()
  })
})
describe('notepad', () => {
  it('exists', () => {
    expect((pad as any).notepad).toBeInstanceOf(Function)
  })

  it('runs', () => {
    const padDoc = null
    const subject = null
    const me = null
    const options = {}
    expect((pad as any).notepad(dom, padDoc, subject, me, options)).toBe(element)
  })
})
