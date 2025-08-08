// We don't want to output debug messages to console as part of the tests
jest.mock('../../../src/debug')
import * as debug from '../../../src/debug'

export function silenceDebugMessages () {
  jest.spyOn(debug, 'log').mockImplementation(() => {})
  jest.spyOn(debug, 'warn').mockImplementation(() => {})
  jest.spyOn(debug, 'error').mockImplementation(() => {})
  jest.spyOn(debug, 'trace').mockImplementation(() => {})
}