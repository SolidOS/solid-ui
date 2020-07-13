import { silenceDebugMessages } from '../../helpers/setup'
import { findBookmarkDocument, toggleBookmark, renderBookmarksButton } from '../../../src/chat/bookmarks'
import { NamedNode, Namespace } from 'rdflib'
import store from '../../../src/store'
import { clearStore } from '../helpers/clearStore'
import { ns } from '../../../src/'

const BOOK = Namespace('http://www.w3.org/2002/01/bookmark#')

silenceDebugMessages()
jest.mock('solid-auth-client')

describe('findBookmarkDocument', () => {
  afterEach(clearStore)

  it('exists', () => {
    expect(findBookmarkDocument).toBeInstanceOf(Function)
  })

  // findBookmarkDocument › runs
  //   TypeError: thisIndex.map(...).flat is not a function
  it('runs', async () => {
    const context = {
      index: {}
    }
    window.alert = () => {}

    const result = await findBookmarkDocument(context)
    expect(result).toEqual({
      containers: [],
      index: {
        public: []
      },
      instances: []
    })
  })
  it('complains if you have multiple bookmark docs', async () => {
    const privReg = new NamedNode('http://example.com/privType.ttl#reg1')
    const pubReg1 = new NamedNode('http://example.com/pubType.ttl#reg1')
    const pubReg2 = new NamedNode('http://example.com/pubType.ttl#reg2')
    const bookmarksDoc1 = new NamedNode('http://example.com/bookmarks1.ttl')
    const bookmarksDoc2 = new NamedNode('http://example.com/bookmarks2.ttl')
    const bookmarksDoc3 = new NamedNode('http://example.com/bookmarks3.ttl')
    const context = {
      me: new NamedNode('http://example.com/profile/card#me'),
      publicProfile: new NamedNode('http://example.com/profile/card'),
      preferencesFile: new NamedNode('http://example.com/prefs.ttl'),
      privateTypeIndex: new NamedNode('http://example.com/privType.ttl'),
      publicTypeIndex: new NamedNode('http://example.com/pubType.ttl')
    }

    window.alert = jest.fn()
    store.add(context.me, ns.space('preferencesFile'), context.preferencesFile, context.publicProfile)
    // announce private index in settings:
    store.add(context.me, ns.solid('privateTypeIndex'), context.privateTypeIndex, context.preferencesFile)
    // announce public index in profile:
    store.add(context.me, ns.solid('publicTypeIndex'), context.publicTypeIndex, context.publicProfile)

    store.add(privReg, ns.rdf('type'), ns.solid('TypeRegistration'), context.privateTypeIndex)
    store.add(privReg, ns.solid('forClass'), BOOK('Bookmark'), context.privateTypeIndex)
    store.add(privReg, ns.solid('instance'), bookmarksDoc1, context.privateTypeIndex)

    store.add(pubReg1, ns.rdf('type'), ns.solid('TypeRegistration'), context.publicTypeIndex)
    store.add(pubReg1, ns.solid('forClass'), BOOK('Bookmark'), context.publicTypeIndex)
    store.add(pubReg1, ns.solid('instance'), bookmarksDoc2, context.publicTypeIndex)

    store.add(pubReg2, ns.rdf('type'), ns.solid('TypeRegistration'), context.publicTypeIndex)
    store.add(pubReg2, ns.solid('forClass'), BOOK('Bookmark'), context.publicTypeIndex)
    store.add(pubReg2, ns.solid('instance'), bookmarksDoc3, context.publicTypeIndex)

    const result = await findBookmarkDocument(context)
    expect((window.alert as any).mock.calls.length).toEqual(1)
    expect((window.alert as any).mock.calls[0][0]).toMatchSnapshot()
  })
  it('complains if you have multiple bookmark docs', async () => {
    const privReg = new NamedNode('http://example.com/privType.ttl#reg1')
    const pubReg1 = new NamedNode('http://example.com/pubType.ttl#reg1')
    const pubReg2 = new NamedNode('http://example.com/pubType.ttl#reg2')
    const bookmarksDoc1 = new NamedNode('http://example.com/bookmarks1.ttl')
    const bookmarksDoc2 = new NamedNode('http://example.com/bookmarks2.ttl')
    const bookmarksDoc3 = new NamedNode('http://example.com/bookmarks3.ttl')
    const context = {
      me: new NamedNode('http://example.com/profile/card#me'),
      publicProfile: new NamedNode('http://example.com/profile/card'),
      preferencesFile: new NamedNode('http://example.com/prefs.ttl'),
      privateTypeIndex: new NamedNode('http://example.com/privType.ttl'),
      publicTypeIndex: new NamedNode('http://example.com/pubType.ttl')
    }

    window.alert = jest.fn()
    store.add(context.me, ns.space('preferencesFile'), context.preferencesFile, context.publicProfile)
    // announce private index in settings:
    store.add(context.me, ns.solid('privateTypeIndex'), context.privateTypeIndex, context.preferencesFile)
    // announce public index in profile:
    store.add(context.me, ns.solid('publicTypeIndex'), context.publicTypeIndex, context.publicProfile)

    store.add(privReg, ns.rdf('type'), ns.solid('TypeRegistration'), context.privateTypeIndex)
    store.add(privReg, ns.solid('forClass'), BOOK('Bookmark'), context.privateTypeIndex)
    store.add(privReg, ns.solid('instance'), bookmarksDoc1, context.privateTypeIndex)

    store.add(pubReg1, ns.rdf('type'), ns.solid('TypeRegistration'), context.publicTypeIndex)
    store.add(pubReg1, ns.solid('forClass'), BOOK('Bookmark'), context.publicTypeIndex)
    store.add(pubReg1, ns.solid('instance'), bookmarksDoc2, context.publicTypeIndex)

    store.add(pubReg2, ns.rdf('type'), ns.solid('TypeRegistration'), context.publicTypeIndex)
    store.add(pubReg2, ns.solid('forClass'), BOOK('Bookmark'), context.publicTypeIndex)
    store.add(pubReg2, ns.solid('instance'), bookmarksDoc3, context.publicTypeIndex)

    const result = await findBookmarkDocument(context)
    expect((window.alert as any).mock.calls.length).toEqual(1)
    expect((window.alert as any).mock.calls[0][0]).toMatchSnapshot()
  })
  it('does not complains if you have one bookmark docs', async () => {
    const privReg = new NamedNode('http://example.com/privType.ttl#reg1')
    const pubReg1 = new NamedNode('http://example.com/pubType.ttl#reg1')
    const pubReg2 = new NamedNode('http://example.com/pubType.ttl#reg2')
    const bookmarksDoc1 = new NamedNode('http://example.com/bookmarks1.ttl')
    const bookmarksDoc2 = new NamedNode('http://example.com/bookmarks2.ttl')
    const bookmarksDoc3 = new NamedNode('http://example.com/bookmarks3.ttl')
    const context = {
      me: new NamedNode('http://example.com/profile/card#me'),
      publicProfile: new NamedNode('http://example.com/profile/card'),
      preferencesFile: new NamedNode('http://example.com/prefs.ttl'),
      privateTypeIndex: new NamedNode('http://example.com/privType.ttl'),
      publicTypeIndex: new NamedNode('http://example.com/pubType.ttl')
    }

    window.alert = jest.fn()
    store.add(context.me, ns.space('preferencesFile'), context.preferencesFile, context.publicProfile)
    // announce private index in settings:
    store.add(context.me, ns.solid('privateTypeIndex'), context.privateTypeIndex, context.preferencesFile)
    // announce public index in profile:
    store.add(context.me, ns.solid('publicTypeIndex'), context.publicTypeIndex, context.publicProfile)

    store.add(privReg, ns.rdf('type'), ns.solid('TypeRegistration'), context.privateTypeIndex)
    store.add(privReg, ns.solid('forClass'), BOOK('Bookmark'), context.privateTypeIndex)
    store.add(privReg, ns.solid('instance'), bookmarksDoc1, context.privateTypeIndex)

    store.add(pubReg1, ns.rdf('type'), ns.solid('TypeRegistration'), context.publicTypeIndex)
    store.add(pubReg1, ns.solid('forClass'), BOOK('Bookmark'), context.publicTypeIndex)
    store.add(pubReg1, ns.solid('instance'), bookmarksDoc2, context.publicTypeIndex)

    const result = await findBookmarkDocument(context)
    expect((window.alert as any).mock.calls.length).toEqual(0)
  })
})

describe('toggleBookmark', () => {
  it('exists', () => {
    expect(toggleBookmark).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    const userContext = {
      me: new NamedNode('http://example.com'),
      bookmarkDocument: new NamedNode('http://example.com')
    }
    const target = {}
    const bookmarkButton = {}
    try {
      await toggleBookmark(userContext, target, bookmarkButton)
    } catch (e) {
      expect(e.message).toEqual('Must be logged on to add Bookmark')
    }
  })
})

describe('renderBookmarksButton', () => {
  it('exists', () => {
    expect(renderBookmarksButton).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    const userContext = {
      me: new NamedNode('http://example.com'),
      bookmarkDocument: new NamedNode('http://example.com')
    }
    const target = {}
    const result = await renderBookmarksButton(userContext, target)
    expect(typeof result).toEqual('object')
  })
})
