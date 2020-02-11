const tabs = require('../../src/tabs')

describe('tabWidget', () => {
  it('exists', () => {
    expect(tabs.tabWidget).toBeInstanceOf(Function)
  })
  /* TODO: check this because it says kb.the is not a function
            this is within the tabs.tabWidget function..
  it('runs', () => {
    const options = { dom, kb: RdfLib.graph() }
    expect(tabs.tabWidget(options)).toBe(null)
  } */
})
