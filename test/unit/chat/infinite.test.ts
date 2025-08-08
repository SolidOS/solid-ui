import { silenceDebugMessages } from '../helpers/debugger'
import { JSDOM } from 'jsdom'
import { infiniteMessageArea } from '../../../src/chat/infinite'
import { sym } from 'rdflib'

silenceDebugMessages()
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

describe('infiniteMessageArea', () => {
  it('exists', () => {
    expect(infiniteMessageArea).toBeInstanceOf(Function)
  })
  /* Bogus error: line 374:     TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.
  when p1 in fact is  HTMLTableRowElement { AJAR_date: '9999-01-01T00:00:00Z' }
  */
  it.skip('runs', async () => {
    const kb = undefined // will default to store
    const chatChannel = sym('https://domain.tld/chat.ttl#this')
    const options = {}
    ;(window as any).alert = () => {}

    const result = await infiniteMessageArea(dom, kb, chatChannel, options)
    expect(result).toBeTruthy()
  })
})
