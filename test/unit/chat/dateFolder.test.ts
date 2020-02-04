import { default as DateFolder } from '../../../src/chat/dateFolder'

describe('DateFolder', () => {
  it('exists', () => {
    expect(new DateFolder({ dir: () => {} })).toBeInstanceOf(DateFolder)
  })
})

describe('DateFolder#leafDocumentFromDate', () => {
  it('exists', () => {
    expect(new DateFolder({ dir: () => {} }).leafDocumentFromDate).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    const dateFolder = new DateFolder({ dir: () => {
      uri: ''
    } });
    const result = dateFolder.leafDocumentFromDate({
      toISOString: () => ''
    })
    expect(result).toEqual({})
  })
})

describe('DateFolder#dateFromLeafDocument', () => {
  it('exists', () => {
    expect(new DateFolder({ dir: () => {} }).dateFromLeafDocument).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    const dateFolder = new DateFolder({ dir: () => {
      uri: ''
    } });
    const result = dateFolder.dateFromLeafDocument({
      toISOString: () => ''
    })
    expect(result).toEqual({})
  })

})

describe('DateFolder#loadPrevious', () => {
  it('exists', () => {
    expect(new DateFolder({ dir: () => {} }).loadPrevious).toBeInstanceOf(Function)
  })
  it.skip('runs', async () => {
    const dateFolder = new DateFolder({ dir: () => {
      uri: ''
    } });
    const result = await dateFolder.loadPrevious({
      toISOString: ''
    })
    expect(result).toEqual({})
  })

})

describe('DateFolder#firstLeaf', () => {
  it('exists', () => {
    expect(new DateFolder({ dir: () => {} }).firstLeaf).toBeInstanceOf(Function)
  })
  it.skip('runs', async () => {
    const dateFolder = new DateFolder({ dir: () => {
      uri: ''
    } });
    ;(window as any).$rdf = {
      graph: () => {},
      Fetcher: function () {}
    }
    const result = await dateFolder.firstLeaf()
    expect(result).toEqual({})
  })
})
