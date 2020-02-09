const pad = require('../../src/pad')

describe('lightColorHash', () => {
  it('exists', () => {
    expect(pad.lightColorHash).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(pad.lightColorHash(null)).toBe('#ffffff')
  })
})
