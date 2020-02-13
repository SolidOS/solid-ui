const tabs = require('../../src/tabs')
const RdfLib = require('rdflib')

describe('tabWidget', () => {
  it('exists', () => {
    expect(tabs.tabWidget).toBeInstanceOf(Function)
  })

  it('runs', () => {
    const options = { dom: document, subject: 'test', predicate: 'test' }
    expect(tabs.tabWidget(options)).toBe(null)
  })
})
