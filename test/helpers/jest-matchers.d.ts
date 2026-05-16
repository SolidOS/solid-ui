import type { IndexedFormula } from 'rdflib'

declare global {
  namespace jest {
    interface Matchers<R, T = unknown> {
      toContainGraph(expected: IndexedFormula): R
      toEqualGraph(expected: IndexedFormula): R
      toBeCalled(): R
      toBeCalledWith(...args: any[]): R
      toReturn(): R
      toThrowError(error?: any): R
    }
  }
}

export {}