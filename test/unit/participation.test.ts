import * as widgets from '../../src/widgets'
import { JSDOM } from 'jsdom'
import * as participation from '../../src/pad'

const window = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window
const dom = window.document
describe('renderPartipants', () => {
  it('exists', () => {
    expect((participation as any).renderPartipants).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const table = dom.createElement('table')
    const padDoc = null
    // const subject = new RdfLib.NamedNode('test')
    const subject = null
    const me = 'webId'
    const options = {}
    expect(
      (participation as any).renderPartipants(dom, table, padDoc, subject, me, options)
    ).toMatchSnapshot()
  })
  it('returns without crashing when a person is not returned', () => {
    // @@ TODO need to mock kb.any and kb.each - not working for some reason
    // kb is a store
    const table = dom.createElement('table')
    const padDoc = null
    // const subject = new RdfLib.NamedNode('participation')
    const subject = null
    const me = 'webId'
    const options = {}
    expect(
      (participation as any).renderPartipants(dom, table, padDoc, subject, me, options)
    ).toMatchSnapshot()
  })
})
describe('participationObject', () => {
  it('exists', () => {
    expect((participation as any).participationObject).toBeInstanceOf(Function)
  })

  it.skip('runs', () => {
    // TODO: check on arguments

    const subject = null
    const padDoc = null
    const me = null
    expect((participation as any).participationObject(subject, padDoc, me)).resolves.toBe(
      {}
    )
  })
  it.skip('runs 2', () => {
    // TODO: check on arguments
    const spy = jest.spyOn(widgets, 'newThing')
    const subject = null
    const padDoc = document
    const me = 'https://sharonstrats.inrupt.net/profile/card#me'
    expect((participation as any).participationObject(subject, padDoc, me)).resolves.toBe(
      {}
    )
    expect(spy).toBeCalled()
  })
})
describe('recordParticipation', () => {
  it('exists', () => {
    expect((participation as any).recordParticipation).toBeInstanceOf(Function)
  })
  const subject = null
  const padDoc = null
  const refreshable = true
  it('runs', () => {
    expect((participation as any).recordParticipation(subject, padDoc, refreshable)).toBe(
      undefined
    )
  })
})
describe('manageParticipation', () => {
  it('exists', () => {
    expect((participation as any).manageParticipation).toBeInstanceOf(Function)
  })
  const container = dom.createElement('div')
  const padDoc = null
  const subject = null
  const me = null
  const options = {}
  it('runs', () => {
    expect(
      (participation as any).manageParticipation(
        dom,
        container,
        padDoc,
        subject,
        me,
        options
      )
    ).toMatchSnapshot()
  })
})
