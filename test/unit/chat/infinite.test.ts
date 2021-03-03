import { silenceDebugMessages } from '../../helpers/setup'
import { JSDOM } from 'jsdom'
import { infiniteMessageArea } from '../../../src/chat/infinite'
import { sym } from 'rdflib'

silenceDebugMessages()
jest.mock('solid-auth-client', () => ({
  currentSession: () => Promise.resolve(),
  trackSession: () => null
}))
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

describe('infiniteMessageArea', () => {
  it('exists', () => {
    expect(infiniteMessageArea).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    const kb = undefined // will default to UI.store
    const chatChannel = sym('https://domain.tld/chat')
    const options = {}
    ;(window as any).alert = () => {}

    const result = await infiniteMessageArea(dom, kb, chatChannel, options)
    expect(result).toBeTruthy()
  })
})
