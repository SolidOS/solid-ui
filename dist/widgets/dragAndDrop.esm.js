import { log as e } from "../lib/debug.esm.js";
import { style as t } from "../lib/style.esm.js";
import * as n from "mime-types";
//#region src/widgets/dragAndDrop.js
function r(n, r, i) {
	let a = function(e) {
		return e.split("\n").map((e) => e.trim()).filter((e) => e && e[0] !== "#");
	}, o = function(e) {
		e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy";
	}, s = function(n) {
		n.preventDefault(), n.stopPropagation(), e("dragenter event dropEffect: " + n.dataTransfer.dropEffect), this.localStyle && (this.savedStyle ||= t.dragEvent), n.dataTransfer.dropEffect = "link", e("dragenter event dropEffect 2: " + n.dataTransfer.dropEffect);
	}, c = function(n) {
		n.stopPropagation(), e("dragleave event dropEffect: " + n.dataTransfer.dropEffect), this.localStyle = this.savedStyle ? this.savedStyle : t.dropEvent;
	}, l = function(n) {
		n.preventDefault && n.preventDefault(), n.stopPropagation && n.stopPropagation(), e("Drop event. dropEffect: " + n.dataTransfer.dropEffect), e("Drop event. types: " + (n.dataTransfer.types ? n.dataTransfer.types.join(", ") : "NOPE"));
		let o = null, s;
		if (n.dataTransfer.types) {
			for (let t = 0; t < n.dataTransfer.types.length; t++) {
				let r = n.dataTransfer.types[t];
				if (r === "text/uri-list") o = a(n.dataTransfer.getData(r)), e("Dropped text/uri-list: " + o);
				else if (r === "text/plain") s = n.dataTransfer.getData(r);
				else if (r === "Files" && i) {
					let t = n.dataTransfer.files;
					for (let n = 0; t[n]; n++) {
						let r = t[n];
						e("Filename: " + r.name + ", type: " + (r.type || "n/a") + " size: " + r.size + " bytes, last modified: " + (r.lastModifiedDate ? r.lastModifiedDate.toLocaleDateString() : "n/a"));
					}
					i(t);
				}
			}
			let t = s ? s.trim() : "";
			o === null && t && t.slice(0, 4) === "http" && (o = [t], e("Warning: Poor man's drop: using text for URI"));
		} else o = a(n.dataTransfer.getData("Text")), e("WARNING non-standard drop event: " + o[0]);
		return e("Dropped URI list (2): " + o), o && r(o), this.localStyle = t.restoreStyle, !1;
	};
	(function(t) {
		t || e("@@@ addTargetListeners: ele " + t), t.addEventListener("dragover", o), t.addEventListener("dragenter", s), t.addEventListener("dragleave", c), t.addEventListener("drop", l);
	})(n, r);
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
function a(t, r, i, a, o) {
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
					if (d = n.lookup(r.name), !d) {
						let t = "Filename needs to have an extension which gives a type we know: " + r.name;
						throw e(t), alert(t), Error(t);
					}
				} else {
					let e = n.extension(r.type);
					e && e !== "false" && !r.name.endsWith("." + e) && r.type !== n.lookup(r.name) && (u = "_." + e);
				}
				let f = r.type.startsWith("image/") && a || i, p = f + (f.endsWith("/") ? "" : "/") + encodeURIComponent(r.name) + u;
				t.webOperation("PUT", p, {
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
//#endregion
export { i as makeDraggable, r as makeDropTarget, a as uploadFiles };

//# sourceMappingURL=dragAndDrop.esm.js.map