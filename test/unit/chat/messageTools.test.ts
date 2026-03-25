import { silenceDebugMessages } from '../helpers/debugger'
import {
  sentimentStrip,
  sentimentStripLinked,
  messageToolbar
} from '../../../src/chat/messageTools'

import * as $rdf from 'rdflib'

const message1 = $rdf.sym('https://example.com/chat.ttl#message1')

silenceDebugMessages()

describe('sentimentStrip', () => {
  it('exists', () => {
    expect(sentimentStrip).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    expect(await sentimentStrip(message1)).toBeInstanceOf(Text)
  })
})

describe('sentimentStripLinked', () => {
  it('exists', () => {
    expect(sentimentStripLinked).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    expect(await sentimentStripLinked(message1, message1.doc())).toBeInstanceOf(HTMLSpanElement)
  })
})

describe('messageToolbar', () => {
  it('exists', () => {
    expect(messageToolbar).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    expect(await messageToolbar(message1, document.createElement('tr'), {})).toBeInstanceOf(HTMLDivElement)
  })
})
