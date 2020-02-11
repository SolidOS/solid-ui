import { JSDOM } from 'jsdom'

import { getClasses, getStylesheet } from '../../../src/jss/index'
jest.mock('rdflib')
jest.mock('solid-auth-client')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

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
