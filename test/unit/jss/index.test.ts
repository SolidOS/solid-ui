jest.mock('rdflib')
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

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


