import { Compartment as e, EditorState as t } from "@codemirror/state";
import { EditorView as n, drawSelection as r, keymap as i, lineNumbers as a } from "@codemirror/view";
import { StreamLanguage as o, defaultHighlightStyle as s, syntaxHighlighting as c } from "@codemirror/language";
import { defaultKeymap as l, history as u, historyKeymap as d } from "@codemirror/commands";
import { css as f } from "@codemirror/lang-css";
import { html as p } from "@codemirror/lang-html";
import { javascript as m } from "@codemirror/lang-javascript";
import { json as h } from "@codemirror/lang-json";
import { markdown as g } from "@codemirror/lang-markdown";
import { xml as _ } from "@codemirror/lang-xml";
import { vscodeDark as v, vscodeLight as y } from "@uiw/codemirror-theme-vscode";
import { turtle as b } from "@codemirror/legacy-modes/mode/turtle";
import { sparql as x } from "@codemirror/legacy-modes/mode/sparql";
import { ntriples as S } from "@codemirror/legacy-modes/mode/ntriples";
//#region src/lib/code-editor/CodeEditor.ts
var C = class {
	_view = null;
	_languageCompartment = null;
	_editableCompartment = null;
	_onDirtyChange;
	_isDirty = !1;
	async initialize(o, f = "", p = "text/turtle", m = "dark", h) {
		this._view && this._view.destroy(), this._languageCompartment = new e(), this._editableCompartment = new e(), this._onDirtyChange = h, this._isDirty = !1;
		let g = await this._getLanguageExtension(p), _ = t.create({
			doc: f,
			extensions: [
				m === "dark" ? v : y,
				n.theme({ "&": { minHeight: "6lh" } }),
				this._languageCompartment.of(g),
				this._editableCompartment.of(n.editable.of(!0)),
				c(s, { fallback: !0 }),
				a(),
				u(),
				r(),
				n.lineWrapping,
				n.updateListener.of((e) => {
					e.docChanged && !this._isDirty && (this._isDirty = !0, this._onDirtyChange?.(!0));
				}),
				i.of([...l, ...d])
			]
		});
		this._view = new n({
			state: _,
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
			case "text/n3": return o.define(b);
			case "application/sparql-update":
			case "application/sparql-query": return o.define(x);
			case "application/nquads":
			case "application/n-quads":
			case "application/n-triples": return o.define(S);
			case "application/json":
			case "application/ld+json": return h();
			case "text/html":
			case "application/xhtml+xml": return p();
			case "text/markdown":
			case "text/x-markdown":
			case "text/md": return g();
			case "application/rdf+xml":
			case "application/xml": return _();
			case "text/css": return f();
			case "text/javascript":
			case "application/javascript":
			case "application/ecmascript": return m();
			default: return [];
		}
	}
};
//#endregion
export { C as CodeEditor };

//# sourceMappingURL=CodeEditor.esm.js.map