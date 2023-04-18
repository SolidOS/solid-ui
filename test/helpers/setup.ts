import { toContainGraph } from '../custom-matchers/toContainGraph'
import { toEqualGraph } from '../custom-matchers/toEqualGraph'
import { error, log, trace, warn } from '../../src/debug'
import 'isomorphic-fetch'
import { TextEncoder, TextDecoder } from 'util'

// globalThis.crypto = require('crypto').webcrypto // with node >=16
const nodeCrypto = require('crypto')
global.crypto = {
  getRandomValues: function (buffer) {
    return nodeCrypto.randomFillSync(buffer)
  }
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
