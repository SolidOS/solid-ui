import { toContainGraph } from '../custom-matchers/toContainGraph'
import { toEqualGraph } from '../custom-matchers/toEqualGraph'
import 'isomorphic-fetch'
import { TextEncoder, TextDecoder } from 'util'

// https://stackoverflow.com/questions/52612122/how-to-use-jest-to-test-functions-using-crypto-or-window-mscrypto
// globalThis.crypto = require('crypto').webcrypto // with node >=16
const nodeCrypto = require('crypto')
global.crypto = {
  getRandomValues: function (buffer) {
    return nodeCrypto.randomFillSync(buffer)
  }
}

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// adding custom matchers
expect.extend({
  toContainGraph,
  toEqualGraph
})
