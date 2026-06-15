import { describe, expect, it, vi } from 'vitest'
import { silenceDebugMessages } from './helpers/debugger'
import { matrix } from '../../src/matrix'
import { JSDOM } from 'jsdom'
import { Query, variable } from 'rdflib'
import { store } from 'solid-logic'

silenceDebugMessages()
const window = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window
const dom = window.document

describe('matrixForQuery', () => {
  it('exists', () => {
    expect(matrix.matrixForQuery).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const query = new Query('matrix-smoke-test', 'matrix-smoke-test')
    const vx = variable('x')
    const vy = variable('y')
    const vvalue = variable('value')
    const querySpy = vi.spyOn(store, 'query').mockImplementation((_q, _onResult, _fetcher, onDone) => onDone?.())

    try {
      let done = false
      const result = matrix.matrixForQuery(
        dom,
        query,
        vx,
        vy,
        vvalue,
        { set_x: [], set_y: [] },
        () => { done = true }
      )

      expect(result).toBeTruthy()
      expect(result.tagName).toBe('TABLE')
      expect(done).toBe(true)
      expect(querySpy).toHaveBeenCalled()
    } finally {
      querySpy.mockRestore()
    }
  })
})
