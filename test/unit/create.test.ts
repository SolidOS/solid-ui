import { describe, expect, it } from 'vitest'
import { silenceDebugMessages } from './helpers/debugger'
import { JSDOM } from 'jsdom'
import { create } from '../../src/create'
import { DataBrowserContext } from 'pane-registry'
import { CreateContext } from '../../src/create/types'

silenceDebugMessages()
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document
const div = dom.createElement('div')

describe('newThingUI', () => {
  it('exists', () => {
    expect(create.newThingUI).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(
      create.newThingUI(
        { dom, div } as unknown as CreateContext,
        { dom } as DataBrowserContext,
        []
      )
    ).toEqual(undefined)
  })
})
