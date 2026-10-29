import { Compartment as e, EditorState as t } from "@codemirror/state";
import { EditorView as n, drawSelection as r, keymap as i, lineNumbers as a } from "@codemirror/view";
import { StreamLanguage as o, defaultHighlightStyle as s, syntaxHighlighting as c } from "@codemirror/language";
import { defaultKeymap as l, history as u, historyKeymap as d, indentWithTab as f } from "@codemirror/commands";
import { css as p } from "@codemirror/lang-css";
import { html as m } from "@codemirror/lang-html";
import { javascript as h } from "@codemirror/lang-javascript";
import { json as g } from "@codemirror/lang-json";
import { markdown as _ } from "@codemirror/lang-markdown";
import { xml as v } from "@codemirror/lang-xml";
import { vscodeDark as y, vscodeLight as b } from "@uiw/codemirror-theme-vscode";
import { turtle as x } from "@codemirror/legacy-modes/mode/turtle";
import { sparql as S } from "@codemirror/legacy-modes/mode/sparql";
import { ntriples as C } from "@codemirror/legacy-modes/mode/ntriples";
// src/lib/code-editor/CodeEditor.ts
var w = class {
	_view = null;
	_languageCompartment = null;
	_editableCompartment = null;
	_onDirtyChange;
	_isDirty = !1;
	async initialize(o, p = "", m = "text/turtle", h = "dark", g) {
		this._view && this._view.destroy(), this._languageCompartment = new e(), this._editableCompartment = new e(), this._onDirtyChange = g, this._isDirty = !1;
		let _ = await this._getLanguageExtension(m), v = t.create({
			doc: p,
			extensions: [
				h === "dark" ? y : b,
				n.theme({ "&": { minHeight: "6lh" } }),
				this._languageCompartment.of(_),
				this._editableCompartment.of(n.editable.of(!0)),
				c(s, { fallback: !0 }),
				a(),
				u(),
				r(),
				n.lineWrapping,
				n.updateListener.of((e) => {
					e.docChanged && !this._isDirty && (this._isDirty = !0, this._onDirtyChange?.(!0));
				}),
				i.of([
					f,
					...l,
					...d
				])
			]
		});
		this._view = new n({
			state: v,
			parent: o
		});
	}
	destroy() {
		this._view?.destroy(), this._view = null, this._isDirty = !1;
	}
	getValue() {
		return this._view ? this._view.state.doc.toString() : "";
	}
	replaceContent(e) {
		this._view && this._view.state.doc.toString() !== e && this._view.dispatch({ changes: {
			from: 0,
			to: this._view.state.doc.length,
			insert: e
		} });
	}
	resetDirtyState() {
		this._isDirty = !1;
	}
	setReadOnly(e) {
		if (!this._view) return;
		let t = this._editableCompartment;
		t && this._view.dispatch({ effects: t.reconfigure(n.editable.of(!e)) });
	}
	focusEditor() {
		this._view?.focus();
	}
	async setLanguage(e) {
		if (!this._view) return;
		let t = this._languageCompartment;
		if (!t) return;
		let n = await this._getLanguageExtension(e);
		this._view.dispatch({ effects: t.reconfigure(n) });
	}
	async _getLanguageExtension(e) {
		switch (e) {
			case "text/turtle":
			case "text/n3": return o.define(x);
			case "application/sparql-update":
			case "application/sparql-query": return o.define(S);
			case "application/nquads":
			case "application/n-quads":
			case "application/n-triples": return o.define(C);
			case "application/json":
			case "application/ld+json": return g();
			case "text/html":
			case "application/xhtml+xml": return m();
			case "text/markdown":
			case "text/x-markdown":
			case "text/md": return _();
			case "application/rdf+xml":
			case "application/xml": return v();
			case "text/css": return p();
			case "text/javascript":
			case "application/javascript":
			case "application/ecmascript": return h();
			default: return [];
		}
	}
};
export { w as CodeEditor };

//# sourceMappingURL=CodeEditor.esm.js.map