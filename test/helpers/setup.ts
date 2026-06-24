import '@/types/env.d.ts'
import '@/types/polyfills.d.ts'
import '@/types/shims.d.ts'
import '@/types/webawesome.d.ts'

import { expect, vi } from 'vitest'
import { toContainGraph } from '../custom-matchers/toContainGraph'
import { toEqualGraph } from '../custom-matchers/toEqualGraph'
import 'isomorphic-fetch'
import { TextEncoder, TextDecoder } from 'node:util'
import { TransformStream, ReadableStream, WritableStream } from 'node:stream/web'
import crypto from 'node:crypto'
import { stubFetcherLoad } from '../stubs/fetcher'

vi.mock('../../src/lib/debug')

// https://stackoverflow.com/questions/52612122/how-to-use-jest-to-test-functions-using-crypto-or-window-mscrypto
Object.defineProperty(globalThis, 'crypto', {
  value: crypto.webcrypto,
  configurable: true,
})

Object.defineProperty(globalThis, 'TextEncoder', {
  value: TextEncoder,
  configurable: true,
  writable: true,
})
Object.defineProperty(globalThis, 'TextDecoder', {
  value: TextDecoder,
  configurable: true,
  writable: true,
})
globalThis.TransformStream = TransformStream as unknown as typeof globalThis.TransformStream
globalThis.ReadableStream = ReadableStream as unknown as typeof globalThis.ReadableStream
globalThis.WritableStream = WritableStream as unknown as typeof globalThis.WritableStream

// Node provides MessagePort via worker_threads; jsdom/undici expects it in global scope
try {
  const { MessageChannel, MessagePort } = require('node:worker_threads')
  globalThis.MessageChannel = MessageChannel
  globalThis.MessagePort = MessagePort
} catch {
  // worker_threads not available (older Node), ignore
}

stubFetcherLoad()

// adding custom matchers
expect.extend({
  toContainGraph,
  toEqualGraph
})
