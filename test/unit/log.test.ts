import Logger from '../../src/log'
jest.mock('rdflib')
jest.mock('solid-auth-client')

describe('Logger', () => {
  it('exists', () => {
    expect(Logger).toBeInstanceOf(Object)
  })
})
describe('Logger.msg', () => {
  it('exists', () => {
    expect(Logger.msg).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(Logger.msg('')).toEqual(undefined)
  })
})

describe('Logger.warn', () => {
  it('exists', () => {
    expect(Logger.warn).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(Logger.warn('')).toEqual(undefined)
  })
})

describe('Logger.debug', () => {
  it('exists', () => {
    expect(Logger.debug).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(Logger.debug('')).toEqual(undefined)
  })
})

describe('Logger.info', () => {
  it('exists', () => {
    expect(Logger.info).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(Logger.info('')).toEqual(undefined)
  })
})

describe('Logger.error', () => {
  it('exists', () => {
    expect(Logger.error).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(Logger.error('')).toEqual(undefined)
  })
})

describe('Logger.success', () => {
  it('exists', () => {
    expect(Logger.success).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(Logger.success('')).toEqual(undefined)
  })
})

describe('Logger.clear', () => {
  it('exists', () => {
    expect(Logger.clear).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(Logger.clear()).toEqual(undefined)
  })
})

describe('Logger.setLevel', () => {
  it('exists', () => {
    expect(Logger.setLevel).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(Logger.setLevel('')).toEqual(undefined)
  })
})

describe('Logger.dumpHTML', () => {
  it('exists', () => {
    expect(Logger.dumpHTML).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(Logger.dumpHTML()).toEqual(undefined)
  })
})
