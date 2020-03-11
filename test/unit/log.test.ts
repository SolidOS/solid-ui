import { log } from '../../src/log'

jest.mock('solid-auth-client')

describe('Logger', () => {
  it('exists', () => {
    expect(log).toBeInstanceOf(Object)
  })
})
describe('Logger.msg', () => {
  it('exists', () => {
    expect(log.msg).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(log.msg('')).toEqual(undefined)
  })
})

describe('Logger.warn', () => {
  it('exists', () => {
    expect(log.warn).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(log.warn('')).toEqual(undefined)
  })
})

describe('Logger.debug', () => {
  it('exists', () => {
    expect(log.debug).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(log.debug('')).toEqual(undefined)
  })
})

describe('Logger.info', () => {
  it('exists', () => {
    expect(log.info).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(log.info('')).toEqual(undefined)
  })
})

describe('Logger.error', () => {
  it('exists', () => {
    expect(log.error).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(log.error('')).toEqual(undefined)
  })
})

describe('Logger.success', () => {
  it('exists', () => {
    expect(log.success).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(log.success('')).toEqual(undefined)
  })
})

describe('Logger.clear', () => {
  it('exists', () => {
    expect(log.clear).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(log.clear()).toEqual(undefined)
  })
})

describe('Logger.setLevel', () => {
  it('exists', () => {
    expect(log.setLevel).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(log.setLevel(2)).toEqual(undefined)
  })
})

describe('Logger.dumpHTML', () => {
  it('exists', () => {
    expect(log.dumpHTML).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(log.dumpHTML()).toEqual(undefined)
  })
})
