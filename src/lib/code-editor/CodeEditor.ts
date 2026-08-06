import type { ThemeMode } from 'pane-registry'
import { Compartment, EditorState } from '@codemirror/state'
import { EditorView, drawSelection, keymap, lineNumbers } from '@codemirror/view'
import { defaultHighlightStyle, syntaxHighlighting, StreamLanguage } from '@codemirror/language'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { markdown } from '@codemirror/lang-markdown'
import { xml } from '@codemirror/lang-xml'
import { html as litHtml, render } from 'lit'
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode'
import { turtle } from '@codemirror/legacy-modes/mode/turtle'
import { sparql } from '@codemirror/legacy-modes/mode/sparql'
import { ntriples } from '@codemirror/legacy-modes/mode/ntriples'
import styles from './CodeEditor.styles.css'

export class CodeEditor {
  private _view: EditorView | null = null
  private _languageCompartment: Compartment | null = null
  private _editableCompartment: Compartment | null = null
  private _themeCompartment: Compartment | null = null
  private _onDirtyChange?: (dirty: boolean) => void
  private _isDirty = false
  private _themeMode: ThemeMode = 'dark'
  private _root: HTMLDivElement | null = null
  private _styleElement: HTMLStyleElement | null = null

  async initialize (container: HTMLElement, initialDoc = '', contentType: string = 'text/turtle', theme: ThemeMode = 'dark', onDirtyChange?: (dirty: boolean) => void) {
    if (this._view) {
      this._view.destroy()
    }

    this._languageCompartment = new Compartment()
    this._editableCompartment = new Compartment()
    this._themeCompartment = new Compartment()
    this._onDirtyChange = onDirtyChange
    this._isDirty = false
    this._themeMode = theme

    render(this._renderTemplate(), container)
    this._root = container.firstElementChild as HTMLDivElement | null
    this._attachStyles(container)
    const editorHost = container.querySelector('.code-editor-editor-host') as HTMLDivElement | null
    if (!editorHost) {
      throw new Error('Code editor host was not rendered.')
    }

    const languageExtension = await this._getLanguageExtension(contentType)

    const state = EditorState.create({
      doc: initialDoc,
      extensions: [
        this._themeCompartment.of(this._getThemeExtension(theme)),
        this._languageCompartment.of(languageExtension),
        this._editableCompartment.of(EditorView.editable.of(true)),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        lineNumbers(),
        history(),
        drawSelection(),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged && !this._isDirty) {
            this._isDirty = true
            this._onDirtyChange?.(true)
          }
        }),
        keymap.of([
          ...defaultKeymap,
          ...historyKeymap
        ])
      ]
    })

    this._view = new EditorView({
      state,
      parent: editorHost
    })
  }

  destroy () {
    this._view?.destroy()
    this._view = null
    this._styleElement?.remove()
    this._styleElement = null
    if (this._root?.parentNode) {
      this._root.parentNode.removeChild(this._root)
    }
    this._root = null
    this._themeCompartment = null
    this._isDirty = false
  }

  getValue (): string {
    return this._view ? this._view.state.doc.toString() : ''
  }

  replaceContent (text: string) {
    if (!this._view) return
    const current = this._view.state.doc.toString()
    if (current === text) return
    this._view.dispatch({
      changes: { from: 0, to: this._view.state.doc.length, insert: text }
    })
  }

  resetDirtyState () {
    this._isDirty = false
  }

  setThemeMode (theme: ThemeMode) {
    this._themeMode = theme
    this._updateThemeButtonState()

    if (!this._view) return
    const themeCompartment = this._themeCompartment
    if (!themeCompartment) return

    this._view.dispatch({
      effects: themeCompartment.reconfigure(this._getThemeExtension(theme))
    })
  }

  setReadOnly (readOnly: boolean) {
    if (!this._view) return
    const editableCompartment = this._editableCompartment
    if (!editableCompartment) return
    this._view.dispatch({
      effects: editableCompartment.reconfigure(EditorView.editable.of(!readOnly))
    })
  }

  focusEditor () {
    this._view?.focus()
  }

  async setLanguage (contentType: string) {
    if (!this._view) return
    const languageCompartment = this._languageCompartment
    if (!languageCompartment) return

    const extension = await this._getLanguageExtension(contentType)
    this._view.dispatch({
      effects: languageCompartment.reconfigure(extension)
    })
  }

  private async _getLanguageExtension (contentType: string) {
    switch (contentType) {
      case 'text/turtle':
      case 'text/n3':
        return StreamLanguage.define(turtle)

      case 'application/sparql-update':
      case 'application/sparql-query':
        return StreamLanguage.define(sparql)

      case 'application/nquads':
      case 'application/n-quads':
      case 'application/n-triples':
        return StreamLanguage.define(ntriples)

      case 'application/json':
      case 'application/ld+json':
        return json()

      case 'text/html':
      case 'application/xhtml+xml':
        return html()

      case 'text/markdown':
      case 'text/x-markdown':
      case 'text/md':
        return markdown()

      case 'application/rdf+xml':
      case 'application/xml':
        return xml()

      case 'text/css':
        return css()

      case 'text/javascript':
      case 'application/javascript':
      case 'application/ecmascript':
        return javascript()

      default:
        return []
    }
  }

  private _getThemeExtension (theme: ThemeMode) {
    return theme === 'dark' ? vscodeDark : vscodeLight
  }

  private _renderTemplate () {
    return litHtml`
      <div class="code-editor-shell">
        <div class="code-editor-toolbar">
          <span class="code-editor-toolbar-label">Theme</span>
          <button
            type="button"
            class="code-editor-theme-button"
            data-theme="dark"
            title="Use dark editor theme"
            data-active=${String(this._themeMode === 'dark')}
            aria-pressed=${String(this._themeMode === 'dark')}
            @click=${() => this.setThemeMode('dark')}
          >
            Dark
          </button>
          <button
            type="button"
            class="code-editor-theme-button"
            data-theme="light"
            title="Use light editor theme"
            data-active=${String(this._themeMode !== 'dark')}
            aria-pressed=${String(this._themeMode !== 'dark')}
            @click=${() => this.setThemeMode('light')}
          >
            Light
          </button>
        </div>
        <div class="code-editor-editor-host"></div>
      </div>
    `
  }

  private _updateThemeButtonState () {
    if (!this._root) return
    const darkButton = this._root.querySelector('.code-editor-theme-button[data-theme="dark"]') as HTMLButtonElement | null
    const lightButton = this._root.querySelector('.code-editor-theme-button[data-theme="light"]') as HTMLButtonElement | null
    this._syncThemeButton(darkButton, this._themeMode === 'dark')
    this._syncThemeButton(lightButton, this._themeMode !== 'dark')
  }

  private _syncThemeButton (button: HTMLButtonElement | null, isActive: boolean) {
    if (!button) return
    button.setAttribute('aria-pressed', String(isActive))
    button.dataset.active = String(isActive)
  }

  private _attachStyles (container: HTMLElement) {
    this._styleElement?.remove()

    const styleText = typeof styles === 'string'
      ? styles
      : (styles as { cssText?: string }).cssText ?? ''

    const styleElement = container.ownerDocument.createElement('style')
    styleElement.textContent = styleText
    container.append(styleElement)
    this._styleElement = styleElement
  }
}
