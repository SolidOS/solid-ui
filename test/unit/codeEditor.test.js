import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@codemirror/state', () => {
  class Compartment {
    of (value) {
      return { type: 'compartment-of', value }
    }

    reconfigure (value) {
      return { type: 'reconfigure', value }
    }
  }

  const EditorState = {
    create: vi.fn((config) => ({ ...config }))
  }

  return { Compartment, EditorState }
})

const { createdViews, updateListenerOf } = vi.hoisted(() => ({
  createdViews: [],
  updateListenerOf: vi.fn((listener) => ({ type: 'updateListener', listener }))
}))

vi.mock('@codemirror/view', () => {
  class EditorView {
    constructor ({ state, parent }) {
      this.state = state
      this.parent = parent
      this.dom = globalThis.document.createElement('div')
      this.dispatch = vi.fn((transaction) => {
        this.lastTransaction = transaction
        if (transaction.changes) {
          this.state.doc = transaction.changes.insert
        }
      })
      this.focus = vi.fn()
      this.destroy = vi.fn()
      createdViews.push(this)
      if (parent) {
        parent.appendChild(this.dom)
      }
    }
  }

  EditorView.editable = {
    of: vi.fn((value) => ({ type: 'editable', value }))
  }
  EditorView.theme = vi.fn((spec, options) => ({ type: 'theme', spec, options }))
  EditorView.lineWrapping = { type: 'lineWrapping' }
  EditorView.updateListener = {
    of: updateListenerOf
  }

  return {
    EditorView,
    drawSelection: vi.fn(() => ({ type: 'drawSelection' })),
    keymap: {
      of: vi.fn((value) => ({ type: 'keymap', value }))
    },
    lineNumbers: vi.fn(() => ({ type: 'lineNumbers' }))
  }
})

vi.mock('@codemirror/language', () => ({
  defaultHighlightStyle: { name: 'defaultHighlightStyle' },
  syntaxHighlighting: vi.fn((style, options) => ({ type: 'syntaxHighlighting', style, options })),
  HighlightStyle: {
    define: vi.fn(() => ({ type: 'highlightStyle' }))
  },
  StreamLanguage: class {
    static define (mode) {
      return { type: 'stream-language', mode }
    }
  }
}))

vi.mock('@codemirror/commands', () => ({
  defaultKeymap: [{ key: 'default' }],
  history: vi.fn(() => ({ type: 'history' })),
  historyKeymap: [{ key: 'history' }]
}))

vi.mock('@codemirror/lang-css', () => ({
  css: vi.fn(() => ({ type: 'css' }))
}))

vi.mock('@codemirror/lang-html', () => ({
  html: vi.fn(() => ({ type: 'html' }))
}))

vi.mock('@codemirror/lang-javascript', () => ({
  javascript: vi.fn(() => ({ type: 'javascript' }))
}))

vi.mock('@codemirror/lang-json', () => ({
  json: vi.fn(() => ({ type: 'json' }))
}))

vi.mock('@codemirror/lang-markdown', () => ({
  markdown: vi.fn(() => ({ type: 'markdown' }))
}))

vi.mock('@codemirror/lang-xml', () => ({
  xml: vi.fn(() => ({ type: 'xml' }))
}))

vi.mock('@codemirror/legacy-modes/mode/turtle', () => ({
  turtle: { name: 'turtle' }
}))

vi.mock('@codemirror/legacy-modes/mode/sparql', () => ({
  sparql: { name: 'sparql' }
}))

vi.mock('@codemirror/legacy-modes/mode/ntriples', () => ({
  ntriples: { name: 'ntriples' }
}))

vi.mock('@uiw/codemirror-theme-vscode', () => ({
  vscodeDark: [{ type: 'darkTheme' }],
  vscodeLight: [{ type: 'lightTheme' }]
}))

import { CodeEditor } from '../../src/lib/code-editor'

describe('CodeEditor', () => {
  beforeEach(() => {
    createdViews.length = 0
    document.body.innerHTML = ''
    vi.clearAllMocks()
  })

  it('initializes with the provided document text', async () => {
    const editor = new CodeEditor()
    const container = document.createElement('div')
    document.body.appendChild(container)

    await editor.initialize(container, 'hello world', 'text/plain')

    expect(editor.getValue()).toBe('hello world')
    expect(createdViews).toHaveLength(1)
    expect(createdViews[0].state.doc).toBe('hello world')
    expect(createdViews[0].parent).toBe(container)
  })

  it('replaces content and toggles read only state', async () => {
    const editor = new CodeEditor()
    const container = document.createElement('div')
    document.body.appendChild(container)

    await editor.initialize(container, 'first', 'text/plain')
    const view = createdViews[0]

    editor.replaceContent('second')
    expect(editor.getValue()).toBe('second')
    expect(view.dispatch).toHaveBeenCalledWith({
      changes: { from: 0, to: 5, insert: 'second' }
    })

    editor.setReadOnly(true)
    expect(view.dispatch).toHaveBeenLastCalledWith({
      effects: { type: 'reconfigure', value: { type: 'editable', value: false } }
    })

    editor.focusEditor()
    expect(view.focus).toHaveBeenCalled()
  })

  it('reports dirty state once when the document first changes', async () => {
    const editor = new CodeEditor()
    const container = document.createElement('div')
    const onDirtyChange = vi.fn()

    document.body.appendChild(container)

    await editor.initialize(container, 'first', 'text/plain', 'dark', onDirtyChange)

    const updateListener = updateListenerOf.mock.calls[0]?.[0]
    expect(updateListener).toBeInstanceOf(Function)

    updateListener({ docChanged: true })
    updateListener({ docChanged: true })
    updateListener({ docChanged: false })

    expect(onDirtyChange).toHaveBeenCalledTimes(1)
    expect(onDirtyChange).toHaveBeenCalledWith(true)
  })
})
