import { findBookmarkDocument, toggleBookmark, renderBookmarksButton } from '../../../src/chat/bookmarks'

describe('findBookmarkDocument', () => {
  it('exists', () => {
    expect(findBookmarkDocument).toBeInstanceOf(Function)
  })
})

describe('toggleBookmark', () => {
  it('exists', () => {
    expect(toggleBookmark).toBeInstanceOf(Function)
  })
})

describe('renderBookmarksButton', () => {
  it('exists', () => {
    expect(renderBookmarksButton).toBeInstanceOf(Function)
  })
})