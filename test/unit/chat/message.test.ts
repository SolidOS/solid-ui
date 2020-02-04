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
  it('runs', () => {
    const imageUri = ''
    const options = {
      inlineImageHeightEms: 10
    }
    ;(window as any).$rdf = {
      sym: () => {}
    }
    expect(elementForImageURI(imageUri, options)).toBeInstanceOf(HTMLAnchorElement)
  })
})

describe('creatorAndDate', () => {
  it('exists', () => {
    expect(creatorAndDate).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const td1 = {
      appendChild: () => {}
    }
    const creator = {}
    const date = {}
    const message = ''
    expect(creatorAndDate(td1, creator, date, message)).toEqual(undefined)
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


