import { instantiateAccessController } from '../helpers/instantiateAccessController'
import { AccessController } from '../../../src/acl/access-controller'

describe('AccessController', () => {
  it('exists', () => {
    // FIXME: how can we test that it's actually a constructor?
    expect(AccessController).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(instantiateAccessController()).toBeInstanceOf(AccessController)
  })
})

describe('AccessController#isEditable', () => {
  it('has a getter', () => {
    expect(instantiateAccessController().isEditable).toEqual(false)
  })
})

describe('AccessController#render', () => {
  it('exists', () => {
    expect(instantiateAccessController().render).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(instantiateAccessController().render()).toBeTruthy()
  })
})

describe('AccessController#renderTemporaryStatus', () => {
  it('exists', () => {
    expect(instantiateAccessController().renderTemporaryStatus).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(instantiateAccessController().renderTemporaryStatus('')).toEqual(undefined)
  })
})

describe('AccessController#renderStatus', () => {
  it('exists', () => {
    expect(instantiateAccessController().renderStatus).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(instantiateAccessController().renderStatus('')).toEqual(undefined)
  })
})

describe('AccessController#save', () => {
  it('exists', () => {
    expect(instantiateAccessController().save).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    expect(instantiateAccessController().save()).resolves.toEqual(undefined)
  })
})
