import {
  elementForImageURI,
  creatorAndDate,
  creatorAndDateHorizontal,
  renderMessage
} from '../../../src/chat/message'

describe('elementForImageURI', () => {
  it('exists', () => {
    expect(elementForImageURI).toBeInstanceOf(Function)
  })
})

describe('creatorAndDate', () => {
  it('exists', () => {
    expect(creatorAndDate).toBeInstanceOf(Function)
  })
})

describe('creatorAndDateHorizontal', () => {
  it('exists', () => {
    expect(creatorAndDateHorizontal).toBeInstanceOf(Function)
  })
})

describe('renderMessage', () => {
  it('exists', () => {
    expect(renderMessage).toBeInstanceOf(Function)
  })
})


