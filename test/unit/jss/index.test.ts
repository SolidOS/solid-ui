jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'

import { getClasses, getStylesheet } from '../../../src/jss/index'

describe('getClasses', () => {
  it('exists', () => {
    expect(getClasses).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const insertionPoint = {} as HTMLElement
    const styles = {}
    expect(getClasses(insertionPoint, styles)).toBeInstanceOf(Object)
  })
})

describe('getStylesheet', () => {
  it('exists', () => {
    expect(getStylesheet).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const insertionPoint = {} as HTMLElement
    expect(getStylesheet(insertionPoint)).toBeInstanceOf(Object)
  })
})


