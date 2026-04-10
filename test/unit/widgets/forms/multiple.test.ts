import { silenceDebugMessages } from '../../helpers/debugger'
import { Collection, literal, namedNode } from 'rdflib'
import ns from '../../../../src/ns'
import { store } from 'solid-logic'
import { field } from '../../../../src/widgets/forms'
import { clearStore } from '../../helpers/clearStore'

silenceDebugMessages()
afterEach(clearStore)

const docUri = 'http://example.com/doc.ttl'
const doc = namedNode(docUri)
const subject = namedNode('http://example.com/#person')
const form = namedNode('http://example.com/#multipleForm')
const subform = namedNode('http://example.com/#subForm')
const property = namedNode('http://schema.org/knowsLanguage')
const xsdBoolean = namedNode('http://www.w3.org/2001/XMLSchema#boolean')

/** Set up the minimum store triples needed for an ordered Multiple field */
function setupOrderedMultipleForm () {
  store.add(form, ns.rdf('type'), ns.ui('Multiple'), doc)
  store.add(form, ns.ui('property'), property, doc)
  // ui:ordered true as a proper xsd:boolean literal
  store.add(form, ns.ui('ordered'), literal('true', null as any, xsdBoolean), doc)
  store.add(form, ns.ui('part'), subform, doc)
  // Subform: an empty Group (no parts)
  store.add(subform, ns.rdf('type'), ns.ui('Group'), doc)
  store.add(subform, ns.ui('parts'), new Collection([]), doc)
}

/** Render the Multiple field and return {box, body} */
function renderMultipleField () {
  const container = document.createElement('div')
  const box = field[ns.ui('Multiple').uri](
    document, container, {}, subject, form, doc, jest.fn()
  ) as HTMLElement
  // body is the first child div of box, and has the refresh method attached
  const body = box.firstChild as HTMLElement & { refresh?: () => void }
  return { box, body, container }
}

describe('Multiple ordered field', () => {
  describe('createListIfNecessary: recovers existing Collection from store', () => {
    it('uses an existing Collection in the store instead of creating a duplicate', () => {
      setupOrderedMultipleForm()

      // Pre-populate the store with an existing Collection as list head
      const existingCollection = new Collection([])
      store.add(subject, property, existingCollection, doc)

      renderMultipleField()

      // After rendering, there should still be exactly ONE list head
      const heads = store.each(subject, property, null as any, doc)
      expect(heads.length).toBe(1)
      expect(heads[0]).toBe(existingCollection)
    })

    it('creates no new list head when no items exist yet (list created lazily on add)', () => {
      setupOrderedMultipleForm()

      renderMultipleField()

      // No list head should exist until the user adds an item
      const heads = store.each(subject, property, null as any, doc)
      expect(heads.length).toBe(0)
    })
  })

  describe('refresh: syncs list variable to store', () => {
    it('exposes a refresh method on the body element for live updates', () => {
      setupOrderedMultipleForm()

      const { body } = renderMultipleField()

      expect(typeof body.refresh).toBe('function')
    })

    it('renders existing list items from a pre-populated Collection', () => {
      setupOrderedMultipleForm()

      const item1 = namedNode('http://example.com/#item1')
      const item2 = namedNode('http://example.com/#item2')
      const col = new Collection([item1, item2])
      store.add(subject, property, col, doc)

      renderMultipleField()

      // The list head should remain intact with the original 2 elements
      const heads = store.each(subject, property, null as any, doc)
      expect(heads.length).toBe(1)
      expect((heads[0] as Collection).elements.length).toBe(2)
    })

    it('keeps the list in sync when refresh is called after a simulated document reload', () => {
      setupOrderedMultipleForm()

      const originalCollection = new Collection([namedNode('http://example.com/#item1')])
      store.add(subject, property, originalCollection, doc)

      const { body } = renderMultipleField()

      // Simulate a document reload: add a SECOND Collection (the bug scenario).
      // This happens when putBack invalidates the fetch cache and a subsequent
      // updateMany triggers a re-fetch, which adds a new Collection to the store
      // without removing the old one.
      const reloadedCollection = new Collection([namedNode('http://example.com/#item1')])
      store.add(subject, property, reloadedCollection, doc)

      expect(store.each(subject, property, null as any, doc).length).toBe(2)

      // After refresh, the field's internal list should be synced to one of the collections.
      // The refresh function itself does not remove duplicates — that happens in saveListThenRefresh.
      body.refresh!()

      // Both heads still exist (removal happens during save)
      expect(store.each(subject, property, null as any, doc).length).toBe(2)
    })
  })

  describe('end-to-end: add button creates a single list head', () => {
    it('clicking add produces exactly one Collection list-head triple in the store', async () => {
      setupOrderedMultipleForm()

      const { box } = renderMultipleField()

      // Initially no list head
      expect(store.each(subject, property, null as any, doc).length).toBe(0)

      // Find and click the add/tail div (second child of box, after body)
      const children = box.children
      const tail = children[children.length - 1] as HTMLElement
      tail.click()

      // Allow async operations (addItem + saveListThenRefresh) to complete
      await new Promise(resolve => setTimeout(resolve, 10))

      // After clicking add, exactly one list head should exist in the store
      const heads = store.each(subject, property, null as any, doc)
      expect(heads.length).toBe(1)
      expect(heads[0].termType).toBe('Collection')
    })

    it('clicking add twice produces one list head with two elements', async () => {
      setupOrderedMultipleForm()

      const { box } = renderMultipleField()

      const children = box.children
      const tail = children[children.length - 1] as HTMLElement

      // Click add twice
      tail.click()
      await new Promise(resolve => setTimeout(resolve, 10))
      tail.click()
      await new Promise(resolve => setTimeout(resolve, 10))

      const heads = store.each(subject, property, null as any, doc)
      expect(heads.length).toBe(1)
      const collection = heads[0] as Collection
      expect(collection.termType).toBe('Collection')
      expect(collection.elements.length).toBe(2)
    })
  })

  describe('saveListThenRefresh: removes duplicate list heads before saving', () => {
    it('after simulated reload, clicking add removes duplicate heads', async () => {
      setupOrderedMultipleForm()

      // Start with one item in an existing collection
      const originalCollection = new Collection([namedNode('http://example.com/#item1')])
      store.add(subject, property, originalCollection, doc)

      const { box } = renderMultipleField()

      // Simulate document reload: inject a SECOND Collection (the bug scenario)
      const reloadedCollection = new Collection([namedNode('http://example.com/#item1')])
      store.add(subject, property, reloadedCollection, doc)

      expect(store.each(subject, property, null as any, doc).length).toBe(2)

      // Click add — this triggers createListIfNecessary (no-op, list already set)
      // and saveListThenRefresh (which should deduplicate)
      const children = box.children
      const tail = children[children.length - 1] as HTMLElement
      tail.click()
      await new Promise(resolve => setTimeout(resolve, 10))

      // After the save, there should be exactly ONE list head
      const heads = store.each(subject, property, null as any, doc)
      expect(heads.length).toBe(1)
      expect(heads[0].termType).toBe('Collection')
    })
  })
})

