import { describe, expect, it, vi } from 'vitest'
import { silenceDebugMessages } from '../helpers/debugger'
import { instantiateAccessController } from '../helpers/instantiateAccessController'
import { AccessController } from '../../../src/acl/access-controller'
import { Fetcher } from 'rdflib'
import { JSDOM } from 'jsdom'
import { solidLogicSingleton } from 'solid-logic'

const store = solidLogicSingleton.store

silenceDebugMessages()
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

describe('AccessController', () => {
  it('exists', () => {
    // FIXME: how can we test that it's actually a constructor?
    expect(AccessController).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(instantiateAccessController(dom, store)).toBeInstanceOf(AccessController)
  })
})

describe('AccessController#isEditable', () => {
  it('has a getter', () => {
    expect(instantiateAccessController(dom, store).isEditable).toEqual(false)
  })
})

describe('AccessController#render', () => {
  it('exists', () => {
    expect(instantiateAccessController(dom, store).render).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(instantiateAccessController(dom, store).render()).toBeTruthy()
  })
})

describe('AccessController#renderTemporaryStatus', () => {
  it('exists', () => {
    expect(instantiateAccessController(dom, store).renderTemporaryStatus).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(instantiateAccessController(dom, store).renderTemporaryStatus('')).toEqual(undefined)
  })
})

describe('AccessController#renderStatus', () => {
  it('exists', () => {
    expect(instantiateAccessController(dom, store).renderStatus).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(instantiateAccessController(dom, store).renderStatus('')).toEqual(undefined)
  })
})

describe('AccessController#save', () => {
  it('exists', () => {
    expect(instantiateAccessController(dom, store).save).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    const webOperationSpy = vi.spyOn(Fetcher.prototype, 'webOperation').mockResolvedValue({
      ok: false,
      error: 'ACL file save rejected : no acl:Write'
    } as Awaited<ReturnType<Fetcher['webOperation']>>)
    try {
      await expect(instantiateAccessController(dom, store).save()).rejects.toThrow('ACL file save rejected : no acl:Write')
    } finally {
      webOperationSpy.mockRestore()
    }
  })
})
