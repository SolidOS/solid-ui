import { log, warn, error, trace } from '../src/debug'

// We don't want to output debug messages to console as part of the tests
jest.mock('../src/debug')

export function silenceDebugMessages () {
  ;(log as any).mockImplementation(() => null)
  ;(warn as any).mockImplementation(() => null)
  ;(error as any).mockImplementation(() => null)
  ;(trace as any).mockImplementation(() => null)
}
