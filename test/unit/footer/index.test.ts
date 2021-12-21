import { silenceDebugMessages } from '../../helpers/setup'
import {
  initFooter,
  rebuildFooter,
  createControllerInfoBlock
} from '../../../src/footer'
import { NamedNode } from 'rdflib'
// @ts-ignore
import { solidLogicSingleton } from '../../../src/logic'

const store = solidLogicSingleton.store

silenceDebugMessages()

describe('footer', () => {
  it('is exposed on public API', async () => {
    expect(await initFooter(store)).toMatchSnapshot()
  })
})
describe('rebuildFooter', () => {
  it('creates a link', () => {
    const footer = document.createElement('div')
    const pod = new NamedNode('https://test.com')
    const podOwner = new NamedNode('https://test2.com')
    expect(rebuildFooter(footer, store, pod, podOwner)).toMatchSnapshot()
  })
  it('does NOT creates a link in the footer', () => {
    const footer = document.createElement('div')
    const pod = new NamedNode('https://test.com')
    const podOwner = new NamedNode('https://test.com')
    expect(rebuildFooter(footer, store, pod, podOwner)).toMatchSnapshot()
  })
})
describe('createControllerInfoBlock', () => {
  it('runs createControllerInfoBlock', async () => {
    const pod = new NamedNode('https://test.com')
    const podOwner = new NamedNode('https://test.com')
    const user = new NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    expect(createControllerInfoBlock(store, user, pod, podOwner)).toMatchSnapshot()
  })
  it('assigns class to footer', async () => {
    const pod = new NamedNode('https://test.com')
    const podOwner = new NamedNode('https://test.com')
    const user = new NamedNode('https://sharonstrats.inrupt.net/profile/card#me')
    const footer = createControllerInfoBlock(store, user, pod, podOwner)
    expect(footer.className).toContain('footer-pod-info')
    expect(footer.className).toContain('footer')
  })
})
