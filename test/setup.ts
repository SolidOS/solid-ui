// We don't want to output debug messages to console as part of the tests
jest.mock('../src/debug')
const debug = require('../src/debug')
debug.log.mockImplementation(() => null)
debug.warn.mockImplementation(() => null)
debug.error.mockImplementation(() => null)
debug.trace.mockImplementation(() => null)
