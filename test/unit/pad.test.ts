import { dom } from '../helpers/dom'
const pad = require('../../src/pad')

describe('lightColorHash', () => {
  it('exists', () => {
    expect(pad.lightColorHash).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(pad.lightColorHash(null)).toBe('#ffffff')
  })
})
describe('renderPartipants', () => {
  it('exists', () => {
    expect(pad.renderPartipants).toBeInstanceOf(Function)
  })
  // TODO: need to fix up the arguments
  it('runs', () => {
    const table = null
    const padDoc = null
    const subject = null
    const me = null
    const options = {}
    expect(pad.renderPartipants(dom, table, padDoc, subject, me, options)).toBe(
      null
    )
  })
})
describe('participationObject', () => {
  it('exists', () => {
    expect(pad.participationObject).toBeInstanceOf(Function)
  })
})
describe('manageParticipation', () => {
  it('exists', () => {
    expect(pad.manageParticipation).toBeInstanceOf(Function)
  })
})
describe('notepad', () => {
  it('exists', () => {
    expect(pad.notepad).toBeInstanceOf(Function)
  })
})
