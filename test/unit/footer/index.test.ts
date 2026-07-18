import { describe, expect, it } from 'vitest'
import { silenceDebugMessages } from '../helpers/debugger'
import {
  initFooter,
  rebuildFooter,
  createControllerInfoBlock
} from '../../../src/footer'
import { NamedNode } from 'rdflib'
// @ts-ignore
import { solidLogicSingleton } from 'solid-logic'

const store = solidLogicSingleton.store

silenceDebugMessages()

describe('footer', () => {
  it('is exposed on public API', async () => {
    const options = { solidProjectUrl: 'https://solid.com/', solidProjectName: 'Solid Project' }
    expect(await initFooter(store, options)).toBeUndefined()
  })
})
describe('rebuildFooter', () => {
  it('creates a link', async () => {
    const footer = document.createElement('div')
    const pod = new NamedNode('https://test.com')
    const podOwner = new NamedNode('https://test2.com')
    const options = { solidProjectUrl: 'https://solid.com/', solidProjectName: 'Solid Project' }

    expect(await rebuildFooter(footer, store, pod, podOwner, options)).toMatchSnapshot()
  })
  it('does NOT creates a link in the footer', async () => {
    const footer = document.createElement('div')
    const pod = new NamedNode('https://test.com')
    const podOwner = new NamedNode('https://test.com')
    expect(await rebuildFooter(footer, store, pod, podOwner)).toMatchSnapshot()
  })
})
describe('createControllerInfoBlock', () => {
  it('runs createControllerInfoBlock', async () => {
    const pod = new NamedNode('https://test.com')
    const podOwner = new NamedNode('https://test.com')
    const user = new NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    expect(createControllerInfoBlock(store, user, pod, podOwner)).toMatchSnapshot()
  })
  it('makes use of options', async () => {
    const pod = new NamedNode('https://test.com')
    const podOwner = new NamedNode('https://test.com')
    const user = new NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    const options = { solidProjectUrl: 'https://solid.com/', solidProjectName: 'Solid Project' }
    expect(createControllerInfoBlock(store, user, pod, podOwner, options)).toMatchSnapshot()
  })
})
