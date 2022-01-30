import { silenceDebugMessages } from '../../helpers/setup'
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
  it('runs', () => {
    expect(sentimentStrip(message1)).toBeInstanceOf(Text)
  })
})

describe('sentimentStripLinked', () => {
  it('exists', () => {
    expect(sentimentStripLinked).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(sentimentStripLinked(message1, message1.doc())).toBeInstanceOf(HTMLSpanElement)
  })
})

describe('messageToolbar', () => {
  it('exists', () => {
    expect(messageToolbar).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(messageToolbar(message1, document.createElement('tr'), {})).toBeInstanceOf(HTMLDivElement)
  })
})
