import { toContainGraph } from '../custom-matchers/toContainGraph'
import { toEqualGraph } from '../custom-matchers/toEqualGraph'
import 'isomorphic-fetch'
import { TextEncoder, TextDecoder } from 'util'
import { TransformStream, ReadableStream, WritableStream } from 'stream/web'

// https://stackoverflow.com/questions/52612122/how-to-use-jest-to-test-functions-using-crypto-or-window-mscrypto

import crypto from 'crypto'
Object.defineProperty(globalThis, 'crypto', {
  value: crypto.webcrypto,
  configurable: true
})

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
global.TransformStream = TransformStream as unknown as typeof globalThis.TransformStream
global.ReadableStream = ReadableStream as unknown as typeof globalThis.ReadableStream
global.WritableStream = WritableStream as unknown as typeof globalThis.WritableStream

// Node provides MessagePort via worker_threads; jsdom/undici expects it in global scope
try {
  const { MessageChannel, MessagePort } = require('worker_threads')
  global.MessageChannel = MessageChannel
  global.MessagePort = MessagePort
} catch (err) {
  // worker_threads not available (older Node), ignore
}

// Mock external dependencies that solid-logic expects
jest.mock('$rdf', () => require('rdflib'), { virtual: true })

// adding custom matchers
expect.extend({
  toContainGraph,
  toEqualGraph
})
