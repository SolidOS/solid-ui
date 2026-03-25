import { silenceDebugMessages } from './helpers/debugger'
import { JSDOM } from 'jsdom'
import * as RdfLib from 'rdflib'
import { lightColorHash, notepad } from '../../src/pad'
import { log } from '../../src/debug'
import ns from '../../src/ns'
import { solidLogicSingleton } from 'solid-logic'

silenceDebugMessages()
const window = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window
const dom = window.document

describe('lightColorHash', () => {
  it('to be exposed by the Public API', () => {
    expect(lightColorHash).toBe(lightColorHash)
  })
  it('returns #ffffff when an author is not provided', () => {
    // #ffffff is specifically stated in the code to be returned
    // when there is no author
    expect(lightColorHash()).toBe('#ffffff')
  })
  it('returns a value when given an author', () => {
    // #dac2dc is the hash of 'https://sharonstrats.inrupt.net/profile/card#me'
    const author = new RdfLib.NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    expect(lightColorHash(author)).toBe('#dac2dc')
  })
})

describe('notepad', () => {
  const store: any = solidLogicSingleton.store
  const PAD = RdfLib.Namespace('http://www.w3.org/ns/pim/pad#')
  let originalUpdater: any

  function setupExistingPadFixture () {
    const id = Date.now().toString() + Math.random().toString().slice(2)
    const padDoc = new RdfLib.NamedNode(`https://pad.example/${id}.ttl`)
    const subject = new RdfLib.NamedNode(`https://pad.example/${id}.ttl#pad`)
    const chunk = new RdfLib.NamedNode(`https://pad.example/${id}.ttl#line1`)
    const me = new RdfLib.NamedNode('https://sharonstrats.inrupt.net/profile/card#me')

    store.add(subject, PAD('next'), chunk, padDoc)
    store.add(chunk, PAD('next'), subject, padDoc)
    store.add(chunk, ns.sioc('content'), 'initial', padDoc)
    store.add(chunk, ns.dc('author'), me, padDoc)

    const table = notepad(dom, padDoc, subject, me, { exists: true })
    const part = table.querySelector('input') as any
    if (!part) {
      throw new Error('Expected notepad to render an input part')
    }
    return { padDoc, subject, chunk, me, part }
  }

  beforeEach(() => {
    originalUpdater = store.updater
  })

  afterEach(() => {
    store.updater = originalUpdater
    jest.useRealTimers()
  })

  it('to be exposed by the Public API', () => {
    expect(notepad).toBe(notepad)
  })

  it('runs', () => {
    const padDoc = new RdfLib.NamedNode('https://document#')
    const subject = new RdfLib.NamedNode('https://subject#')
    const me = new RdfLib.NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    const options = {}
    expect(notepad(dom, padDoc, subject, me, options))
      .toMatchSnapshot()
  })
  // Below isn't correct just getting rid of the error for a moment shouldn't provide a me...
  it.skip('should log error that you need to be logged in for pad to be edited', () => {
    const padDoc = new RdfLib.NamedNode('https://document#')
    const subject = new RdfLib.NamedNode('https://subject#')
    const me = new RdfLib.NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    const options = {}

      // use this instead jest.spyOn(window.console, 'log') Arne's PR Comments
      ; (window as any).console = { log: jest.fn() }
    expect(notepad(dom, padDoc, subject, me, options))
      .toMatchSnapshot()
    expect(log).toBeCalledWith(
      'Warning: must be logged in for pad to be edited'
    )
  })

  it('status area ...', () => {
    const padDoc = new RdfLib.NamedNode('https://document#')
    const subject = new RdfLib.NamedNode('https://subject#')
    const me = new RdfLib.NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    const options = { statusArea: dom.createElement('div') }

    expect(notepad(dom, padDoc, subject, me, options)
    ).toMatchSnapshot()
  })

  // @@ TODO the code itself seems to error where it says 'new'
  // need to research further

  it.skip('should throw an error when me is provided but no uri', () => {
    const padDoc = new RdfLib.NamedNode('https://document#')
    const subject = new RdfLib.NamedNode('https://subject#')
    const me = new RdfLib.NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    const options = {}

    expect(notepad(dom, padDoc, subject, me, options)
    ).resolves.toBe({})
  })

  it('debounces rapid input and sends one update after pause', () => {
    jest.useFakeTimers()

    const update = jest.fn((_del, _ins, cb) => cb(null, true, '', { status: 200 }))
    store.updater = {
      update,
      requestDownstreamAction: jest.fn(),
      reload: jest.fn(),
      store
    }

    const { padDoc, subject, chunk, part } = setupExistingPadFixture()

    expect(() => {
      part.value = 'a'
      part.dispatchEvent(new window.Event('input', { bubbles: true }))
      part.value = 'ab'
      part.dispatchEvent(new window.Event('input', { bubbles: true }))
      part.value = 'abc'
      part.dispatchEvent(new window.Event('input', { bubbles: true }))
    }).not.toThrow()

    expect(update).toHaveBeenCalledTimes(0)
    jest.advanceTimersByTime(399)
    expect(update).toHaveBeenCalledTimes(0)
    jest.advanceTimersByTime(1)
    expect(update).toHaveBeenCalledTimes(1)

    // Cleanup this test fixture's statements.
    store.removeMatches(subject, null, null, padDoc)
    store.removeMatches(chunk, null, null, padDoc)
    store.removeMatches(null, null, chunk, padDoc)
  })

  it('retries on transient 503 and keeps state/lastSent coherent', () => {
    jest.useFakeTimers()

    let callCount = 0
    const update = jest.fn((_del, _ins, cb) => {
      callCount += 1
      if (callCount === 1) {
        cb(null, false, 'transient', { status: 503 })
      } else {
        cb(null, true, '', { status: 200 })
      }
    })

    store.updater = {
      update,
      requestDownstreamAction: jest.fn(),
      reload: jest.fn(),
      store
    }

    const { padDoc, subject, chunk, part } = setupExistingPadFixture()
    part.value = 'queued text'

    expect(() => {
      part.dispatchEvent(new window.Event('input', { bubbles: true }))
      jest.advanceTimersByTime(400) // debounce fires first PATCH
    }).not.toThrow()

    expect(update).toHaveBeenCalledTimes(1)
    expect(part.state).toBe(0)
    expect(part.lastSent).toBeUndefined()

    jest.advanceTimersByTime(1999)
    expect(update).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(1)

    expect(update).toHaveBeenCalledTimes(2)
    expect(part.state).toBe(0)
    expect(part.lastSent).toBe('queued text')

    // Cleanup this test fixture's statements.
    store.removeMatches(subject, null, null, padDoc)
    store.removeMatches(chunk, null, null, padDoc)
    store.removeMatches(null, null, chunk, padDoc)
  })
})
