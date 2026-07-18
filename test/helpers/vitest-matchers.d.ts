import type { IndexedFormula } from 'rdflib'

declare module 'vitest' {
  interface Assertion<T = unknown> {
    toContainGraph(expected: IndexedFormula): T
    toEqualGraph(expected: IndexedFormula): T
  }
  interface AsymmetricMatchersContaining {
    toContainGraph(expected: IndexedFormula): unknown
    toEqualGraph(expected: IndexedFormula): unknown
  }
}

export {}
