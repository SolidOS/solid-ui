import { default as renderTableViewPane } from '../../src/table'
import { dom } from '../helpers/dom'

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
