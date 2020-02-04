import { default as thread } from '../../../src/chat/thread'
  
describe('Thread', () => {
  it('exists', () => {
    expect(thread).toBeInstanceOf(Function)
  })

  it('runs', () => {
    const dom = {
      createElement: () => {
        return {
          appendChild: () => {},
          setAttribute: () => {},
        }
      }
    }
    const kb = {
      query: () => {
        return {}
      }
    }
    const subject = ''
    const messageStore = {
      doc: () => {
        return ''
      }
    }
    const options = {}

    // eslint-ignore-next-line: no-unused-vars
    ;(window as any).$rdf = {
      Namespace: () => {
        return () => ''
      },
      Query: function () {
        this.vars = []
        this.pat = {
          add: () => {}
        }
      },
      variable: () => {}
    }
    ;(window as any).alert = () => {}
    expect(thread(dom, kb, subject, messageStore, options)).toBeInstanceOf(Object)
  })
})
