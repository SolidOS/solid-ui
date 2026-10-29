import { log as e } from "../lib/debug.esm.js";
import { icons as t } from "../lib/iconBase.esm.js";
import { style as n } from "../lib/style.esm.js";
import { button as r, cancelButton as i, continueButton as a } from "../widgets/buttons.esm.js";
import "../widgets/index.esm.js";
// src/media/media-capture.ts
var o = t.iconBase + "noun_Camera_1618446_000000.svg", s = t.iconBase + "noun_479395.svg", c = "image/png";
function l(o, l, u, d) {
	let f = o.createElement("div"), p, m, h, g, _ = f.appendChild(o.createElement("table")), v = _.appendChild(o.createElement("tr")).appendChild(o.createElement("td"));
	v.setAttribute("colspan", "4");
	let y = _.appendChild(o.createElement("tr"));
	y.appendChild(o.createElement("td")).appendChild(i(o)).addEventListener("click", (e) => {
		O(), d(null);
	});
	let b = y.appendChild(o.createElement("td")).appendChild(r(o, s, "Retake"));
	b.addEventListener("click", (e) => {
		T();
	}), b.style.visibility = "collapse";
	let x = y.appendChild(o.createElement("td")).appendChild(r(o, t.iconBase + "noun_10636.svg", "Snap"));
	x.addEventListener("click", E), x.style.visibility = "collapse";
	let S = y.appendChild(o.createElement("td")).appendChild(a(o));
	S.addEventListener("click", (e) => {
		k(m, p);
	}), S.style.visibility = "collapse";
	function C() {
		if (h = v.appendChild(o.createElement("video")), h.setAttribute("controls", "1"), h.setAttribute("autoplay", "1"), h.setAttribute("style", n.controlStyle), !navigator.mediaDevices) throw Error("navigator.mediaDevices not available");
		navigator.mediaDevices.getUserMedia(w).then((e) => {
			h.srcObject = e, x.style.visibility = "visible", S.style.visibility = "collapse", b.style.visibility = "collapse";
		});
	}
	let w = { video: !0 };
	function T() {
		v.removeChild(g), C();
	}
	function E() {
		g = o.createElement("canvas"), g.setAttribute("width", n.canvasWidth), g.setAttribute("height", n.canvasHeight), g.setAttribute("style", n.controlStyle), v.appendChild(g), g.getContext("2d").drawImage(h, 0, 0, g.width, g.height), h.parentNode.removeChild(h), g.toBlob((t) => {
			let n = `got blob type ${t.type} size ${t.size}`;
			e(n), p = u(), m = t, D();
		}, c);
	}
	function D() {
		S.style.visibility = "visible", b.style.visibility = "visible", x.style.visibility = "collapse";
	}
	function O() {
		h && h.srcObject && h.srcObject.getVideoTracks().forEach((e) => e.stop());
	}
	function k(t, n) {
		let r = t.type;
		e("Putting " + t.size + " bytes of " + r + " to " + n), l.fetcher.webOperation("PUT", n.uri, {
			data: t,
			contentType: r
		}).then((t) => {
			e("ok saved " + n), O(), d(n);
		}, (e) => {
			O(), alert(e);
		});
	}
	return C(), f;
}
function u(e, t, n, i) {
	let a = e.createElement("div"), s = r(e, o, "Take picture"), c;
	async function u(e) {
		a.removeChild(c), a.appendChild(s), i(e);
	}
	return a.appendChild(s), s.addEventListener("click", (r) => {
		a.removeChild(s), c = l(e, t, n, u), a.appendChild(c);
	}), a;
}
export { u as cameraButton, l as cameraCaptureControl };

//# sourceMappingURL=media-capture.esm.js.map