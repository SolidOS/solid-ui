import { toContainGraph } from '../custom-matchers/toContainGraph'
import { toEqualGraph } from '../custom-matchers/toEqualGraph'
import { error, log, trace, warn } from '../../src/debug'
import 'isomorphic-fetch'
import { TextEncoder, TextDecoder } from 'util'
import crypto from 'crypto' // should have webcrypto.getRandomValues defined

if (typeof global.crypto !== 'object') {
  global.crypto = crypto
}

if (typeof global.crypto.getRandomValues !== 'function') {
  global.crypto.getRandomValues = getRandomValues
}

function getRandomValues (array) {
  return crypto.webcrypto.getRandomValues(array)
}

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// We don't want to output debug messages to console as part of the tests
jest.mock('../../src/debug')

export function silenceDebugMessages () {
  ;(log as any).mockImplementation(() => null)
  ;(warn as any).mockImplementation(() => null)
  ;(error as any).mockImplementation(() => null)
  ;(trace as any).mockImplementation(() => null)
}

// adding custom matchers
expect.extend({
  toContainGraph,
  toEqualGraph
})
