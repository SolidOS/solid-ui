import * as RdfLib from 'rdflib'
import { dom } from '../helpers/dom'
const pad = require('../../src/pad')
import { currentSession } from '../../__mocks__/solid-auth-client'

export async function getMyWebId(): Promise<string | null> {
  return currentSession()
}

describe('lightColorHash', () => {
  it('exists', () => {
    expect(pad.lightColorHash).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(pad.lightColorHash(null)).toBe('#ffffff')
  })
  /* TODO: gives a warning instead of an error...  need to research
  const author = new NamedNode('author')
  console.log('Named node ' + JSON.stringify(author))
  it('should return error that you need to be logged in for pad to be edited', () => {
    expect(pad.lightColorHash(author)).toThrowError()
  })
  */
})
describe('renderPartipants', () => {
  const webId = getMyWebId()

  it('exists', () => {
    expect(pad.renderPartipants).toBeInstanceOf(Function)
  })
  // TODO: need to fix up the arguments
  it('runs', () => {
    const table = dom.createElement()
    const padDoc = null
    const subject = RdfLib.sym('')
    const me = webId
    const options = {}
    expect(
      pad.renderPartipants(dom, table, padDoc, subject, me, options)
    ).toBeTruthy()
  })
})
describe('participationObject', () => {
  it('exists', () => {
    expect(pad.participationObject).toBeInstanceOf(Function)
  })
  // TODO: check on arguments
  const subject = null
  const padDoc = null
  const me = null
  it('runs', () => {
    expect(pad.participationObject(subject, padDoc, me)).resolves.toBe({})
  })
})
describe('recordParticipation', () => {
  it('exists', () => {
    expect(pad.recordParticipation).toBeInstanceOf(Function)
  })
  const subject = null
  const padDoc = null
  const refreshable = true
  it('runs', () => {
    expect(pad.recordParticipation(subject, padDoc, refreshable)).toBe(
      undefined
    )
  })
})
describe('manageParticipation', () => {
  it('exists', () => {
    expect(pad.manageParticipation).toBeInstanceOf(Function)
  })
  const container = dom.createElement()
  const padDoc = null
  const subject = null
  const me = null
  const options = {}
  it('runs', () => {
    expect(
      pad.manageParticipation(dom, container, padDoc, subject, me, options)
    ).toBeTruthy()
  })
})
describe('notepad', () => {
  it('exists', () => {
    expect(pad.notepad).toBeInstanceOf(Function)
  })
  /* TODO: says updater is not a function, need to look into this
  const padDoc = null
  const subject = null
  const me = null
  const options = {}
  it('runs', () => {
    expect(pad.notepad(dom, padDoc, subject, me, options)).toBe(null)
  }) */
})
