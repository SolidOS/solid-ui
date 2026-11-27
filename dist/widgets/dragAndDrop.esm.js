import { log as e } from "../lib/debug.esm.js";
import * as t from "mime-types";
import { style as n } from "../lib/style.esm.js";
// src/widgets/dragAndDrop.js
function r(t, r, i) {
	let a = function(e) {
		return e.split("\n").map((e) => e.trim()).filter((e) => e && e[0] !== "#");
	}, o = function(e) {
		e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy";
	}, s = function(t) {
		t.preventDefault(), t.stopPropagation(), e("dragenter event dropEffect: " + t.dataTransfer.dropEffect), this.localStyle && (this.savedStyle ||= n.dragEvent), t.dataTransfer.dropEffect = "link", e("dragenter event dropEffect 2: " + t.dataTransfer.dropEffect);
	}, c = function(t) {
		t.stopPropagation(), e("dragleave event dropEffect: " + t.dataTransfer.dropEffect), this.localStyle = this.savedStyle ? this.savedStyle : n.dropEvent;
	}, l = function(t) {
		t.preventDefault && t.preventDefault(), t.stopPropagation && t.stopPropagation(), e("Drop event. dropEffect: " + t.dataTransfer.dropEffect), e("Drop event. types: " + (t.dataTransfer.types ? t.dataTransfer.types.join(", ") : "NOPE"));
		let o = null, s;
		if (t.dataTransfer.types) {
			for (let n = 0; n < t.dataTransfer.types.length; n++) {
				let r = t.dataTransfer.types[n];
				if (r === "text/uri-list") o = a(t.dataTransfer.getData(r)), e("Dropped text/uri-list: " + o);
				else if (r === "text/plain") s = t.dataTransfer.getData(r);
				else if (r === "Files" && i) {
					let n = t.dataTransfer.files;
					for (let t = 0; n[t]; t++) {
						let r = n[t];
						e("Filename: " + r.name + ", type: " + (r.type || "n/a") + " size: " + r.size + " bytes, last modified: " + (r.lastModifiedDate ? r.lastModifiedDate.toLocaleDateString() : "n/a"));
					}
					i(n);
				}
			}
			let n = s ? s.trim() : "";
			o === null && n && n.slice(0, 4) === "http" && (o = [n], e("Warning: Poor man's drop: using text for URI"));
		} else o = a(t.dataTransfer.getData("Text")), e("WARNING non-standard drop event: " + o[0]);
		return e("Dropped URI list (2): " + o), o && r(o), this.localStyle = n.restoreStyle, !1;
	};
	(function(t) {
		t || e("@@@ addTargetListeners: ele " + t), t.addEventListener("dragover", o), t.addEventListener("dragenter", s), t.addEventListener("dragleave", c), t.addEventListener("drop", l);
	})(t, r);
}
function i(t, n) {
	t.setAttribute("draggable", "true"), t.addEventListener("dragstart", function(r) {
		t.style.fontWeight = "bold", r.dataTransfer.setData("text/uri-list", n.uri), r.dataTransfer.setData("text/plain", n.uri), r.dataTransfer.setData("text/html", t.outerHTML), e("Dragstart: " + t + " -> " + n + "de: " + r.dataTransfer.dropEffect);
	}, !1), t.addEventListener("drag", function(e) {
		e.preventDefault(), e.stopPropagation();
	}, !1), t.addEventListener("dragend", function(r) {
		t.style.fontWeight = "normal", e("Dragend dropeffect: " + r.dataTransfer.dropEffect), e("Dragend: " + t + " -> " + n);
	}, !1);
}
function a(n, r, i, a, o) {
	let s = function(e, t) {
		let n = t?.response?.status ?? t?.status, r = t?.message || String(t), i = `Upload failed while putting ${e}`;
		return n === 413 ? `${i}: storage quota was exceeded. ${r}` : n ? `${i} (HTTP ${n}). ${r}` : `${i}. ${r}`;
	};
	for (let c = 0; r[c]; c++) {
		let l = r[c];
		e(" dropped: Filename: " + l.name + ", type: " + (l.type || "n/a") + " size: " + l.size + " bytes, last modified: " + (l.lastModifiedDate ? l.lastModifiedDate.toLocaleDateString() : "n/a"));
		let u = new FileReader();
		u.onload = (function(r) {
			return function(c) {
				let l = c.target.result, u = "";
				e(" File read byteLength : " + l.byteLength);
				let d = r.type;
				if (!r.type || r.type === "") {
					if (d = t.lookup(r.name), !d) {
						let t = "Filename needs to have an extension which gives a type we know: " + r.name;
						throw e(t), alert(t), Error(t);
					}
				} else {
					let e = t.extension(r.type);
					e && e !== "false" && !r.name.endsWith("." + e) && r.type !== t.lookup(r.name) && (u = "_." + e);
				}
				let f = r.type.startsWith("image/") && a || i, p = f + (f.endsWith("/") ? "" : "/") + encodeURIComponent(r.name) + u;
				n.webOperation("PUT", p, {
					data: l,
					contentType: d
				}).then((t) => {
					e(" Upload: put OK: " + p), o(r, p);
				}, (t) => {
					let n = s(p, t);
					throw e(n), alert(n), Error(n);
				});
			};
		})(l), u.readAsArrayBuffer(l);
	}
}
export { i as makeDraggable, r as makeDropTarget, a as uploadFiles };

//# sourceMappingURL=dragAndDrop.esm.js.map