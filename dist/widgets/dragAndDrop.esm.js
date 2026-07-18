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
		n.stopPropagation(), e("dragleave event dropEffect: " + n.dataTransfer.dropEffect), this.savedStyle ? this.localStyle = this.savedStyle : this.localStyle = t.dropEvent;
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
	for (let s = 0; r[s]; s++) {
		let c = r[s];
		e(" dropped: Filename: " + c.name + ", type: " + (c.type || "n/a") + " size: " + c.size + " bytes, last modified: " + (c.lastModifiedDate ? c.lastModifiedDate.toLocaleDateString() : "n/a"));
		let l = new FileReader();
		l.onload = (function(r) {
			return function(s) {
				let c = s.target.result, l = "";
				e(" File read byteLength : " + c.byteLength);
				let u = r.type;
				if (!r.type || r.type === "") {
					if (u = n.lookup(r.name), !u) {
						let t = "Filename needs to have an extension which gives a type we know: " + r.name;
						throw e(t), alert(t), Error(t);
					}
				} else {
					let e = n.extension(r.type);
					e && e !== "false" && !r.name.endsWith("." + e) && r.type !== n.lookup(r.name) && (l = "_." + e);
				}
				let d = r.type.startsWith("image/") && a || i, f = d + (d.endsWith("/") ? "" : "/") + encodeURIComponent(r.name) + l;
				t.webOperation("PUT", f, {
					data: c,
					contentType: u
				}).then((t) => {
					e(" Upload: put OK: " + f), o(r, f);
				}, (t) => {
					let n = " Upload: FAIL " + f + ", Error: " + t;
					throw e(n), alert(n), Error(n);
				});
			};
		})(c), l.readAsArrayBuffer(c);
	}
}
//#endregion
export { i as makeDraggable, r as makeDropTarget, a as uploadFiles };

//# sourceMappingURL=dragAndDrop.esm.js.map