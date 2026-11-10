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
    create: vi.fn((config) => ({ ...config })),
    readOnly: {
      of: vi.fn((value) => ({ type: 'readOnly', value }))
    }
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
  EditorView.contentAttributes = {
    of: vi.fn((value) => ({ type: 'contentAttributes', value }))
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
  historyKeymap: [{ key: 'history' }],
  indentWithTab: { key: 'Tab', run: vi.fn() }
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
      effects: [
        { type: 'reconfigure', value: { type: 'editable', value: false } },
        { type: 'reconfigure', value: { type: 'readOnly', value: true } }
      ]
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

  it('keeps Tab in the editor for indentation', async () => {
    const editor = new CodeEditor()
    const container = document.createElement('div')
    document.body.appendChild(container)

    await editor.initialize(container, 'first', 'text/plain')

    const keymapExtension = createdViews[0].state.extensions.find(
      extension => extension.type === 'keymap'
    )
    expect(keymapExtension.value[0]).toMatchObject({ key: 'Tab' })
  })

  it('exposes an accessible name and description on the editing surface', async () => {
    const editor = new CodeEditor()
    const container = document.createElement('div')
    document.body.appendChild(container)

    await editor.initialize(
      container,
      'generated content',
      'text/n3',
      'dark',
      undefined,
      {
        label: 'Generated N3 for https://pod.example/card',
        description: 'Generated N3 serialization. This content is read-only.'
      }
    )

    const attributes = createdViews[0].state.extensions.find(
      extension => extension.type === 'compartment-of' &&
        extension.value.type === 'contentAttributes'
    ).value
    expect(attributes.value).toEqual({
      'aria-label': 'Generated N3 for https://pod.example/card',
      'aria-description': 'Generated N3 serialization. This content is read-only.'
    })
  })

  it('updates the accessible description when editor mode changes', async () => {
      const editor = new CodeEditor()
      const container = document.createElement('div')
      document.body.appendChild(container)

      await editor.initialize(container, 'content', 'text/plain', 'dark', undefined, {
        label: 'Source editor for https://pod.example/file.txt',
        description: 'Read-only source content.'
      })
      editor.setAccessibility({
        label: 'Source editor for https://pod.example/file.txt',
        description: 'Editable source content.'
      })

      expect(createdViews[0].dispatch).toHaveBeenLastCalledWith({
        effects: {
          type: 'reconfigure',
          value: {
            type: 'contentAttributes',
            value: {
              'aria-label': 'Source editor for https://pod.example/file.txt',
              'aria-description': 'Editable source content.'
            }
          }
        }
    })
  })
})
