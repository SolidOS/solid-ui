import { JSDOM } from 'jsdom'
import renderTableViewPane from '../../src/table'

const window = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window
const dom = window.document

describe('renderTableViewPane', () => {
  it('exists', () => {
    expect(renderTableViewPane).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    const doc = null
    const options = { sourceDocument: null, tableClass: null, query: null }
    expect(renderTableViewPane(dom, options)).toEqual(undefined)
  })
})
