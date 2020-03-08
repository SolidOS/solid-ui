import { JSDOM } from 'jsdom'
import * as RdfLib from 'rdflib'
import * as pad from '../../src/pad'

// jest.mock('rdflib')
// jest.mock('solid-auth-client')
const window = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window
const dom = window.document

describe('lightColorHash', () => {
  it('exists', () => {
    expect((pad as any).lightColorHash).toBeInstanceOf(Function)
  })
  it('returns #ffffff when an author is not provided', () => {
    // #ffffff is specifically stated in the code to be returned
    // when there is no author
    expect((pad as any).lightColorHash(null)).toBe('#ffffff')
  })
  it('returns a value when given an author', () => {
    // #dac2dc is the hash of 'https://sharonstrats.inrupt.net/profile/card#me'
    const author = { uri: 'https://sharonstrats.inrupt.net/profile/card#me' }
    expect((pad as any).lightColorHash(author)).toBe('#dac2dc')
  })
})

describe('notepad', () => {
  it('exists', () => {
    expect((pad as any).notepad).toBeInstanceOf(Function)
  })

  it('runs', () => {
    const padDoc = null
    const subject = null
    const me = new RdfLib.NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    const options = {}
    expect((pad as any).notepad(dom, padDoc, subject, me, options))
      .toMatchSnapshot()
  })

  it.skip('should log error that you need to be logged in for pad to be edited', () => {
    const padDoc = null
    const subject = null
    const me = null
    const options = {}
      ; (window as any).console = { log: jest.fn() }
    expect((pad as any).notepad(dom, padDoc, subject, me, options))
      .toMatchSnapshot()
    expect(console.log).toBeCalledWith(
      'Warning: must be logged in for pad to be edited'
    )
  })

  it.skip('status area ...', () => {
    const padDoc = null
    const subject = null
    const me = { uri: 'https://sharonstrats.inrupt.net/profile/card#me' }
    const options = { statusArea: document.createElement('p') }

    expect(
      (pad as any).notepad(dom, padDoc, subject, me, options)
    ).resolves.toMatchSnapshot()
  })

  // @@ TODO the code itself seems to error where it says 'new'
  // need to research further

  it.skip('should throw an error when me is provided but no uri', () => {
    const padDoc = null
    const subject = null
    const me = {}
    const options = {}

    expect(
      (pad as any).notepad(dom, padDoc, subject, me, options)
    ).resolves.toBe({})
  })
})
