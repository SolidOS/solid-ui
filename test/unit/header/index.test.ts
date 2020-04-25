import { silenceDebugMessages } from '../../helpers/setup'
import { initHeader } from '../../../src/header'
import store from '../../../src/store'
// import { JSDOM } from 'jsdom'

silenceDebugMessages()
// const window = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window
// const dom = window.document

describe('header', () => {
  const options = { menuList: [{ label: 'Testing', url: 'https://reflectechblog.wordpress.com/' }] }
  it('is exposed on public API', async () => {
    expect(await initHeader(store, options)).toMatchSnapshot()
  })
})
