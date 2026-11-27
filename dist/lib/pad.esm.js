import { __exportAll as e } from "../_virtual/_rolldown/runtime.esm.js";
import t from "./ns.esm.js";
import { NamedNode as n, Namespace as r, st as i } from "rdflib";
import "../widgets/index.esm.js";
import { beep as a } from "../utils/index.esm.js";
import { log as o } from "./debug.esm.js";
import { errorMessageBlock as s } from "../widgets/error.esm.js";
import { newThing as c } from "../widgets/forms.esm.js";
import { solidLogicSingleton as l } from "solid-logic";
import { style as u } from "./style.esm.js";
import { manageParticipation as d, participationObject as f, recordParticipation as p, renderParticipants as m } from "./participation.esm.js";
// src/lib/pad.ts
var h = /* @__PURE__ */ e({
	getChunks: () => b,
	lightColorHash: () => v,
	manageParticipation: () => d,
	notepad: () => y,
	notepadToHTML: () => S,
	participationObject: () => f,
	recordParticipation: () => p,
	renderParticipants: () => m,
	xmlEncode: () => x
}), g = l.store, _ = r("http://www.w3.org/ns/pim/pad#");
function v(e) {
	return e && e.uri ? "#" + (function(e) {
		return e.split("").reduce(function(e, t) {
			return e = (e << 5) - e + t.charCodeAt(0), e & e;
		}, 0);
	}(e.uri) & 0xffffff | 0xc0c0c0).toString(16) : "#ffffff";
}
function y(e, l, d, f, p) {
	p ||= {};
	let m = p.exists, h = e.createElement("table"), _ = g;
	if (f && !f.uri) throw Error("UI.pad.notepad:  Invalid userid");
	let y = g.updater, b = r("http://www.w3.org/ns/pim/pad#");
	h.setAttribute("style", u.notepadStyle);
	let x = null, S = null;
	if (p.statusArea) {
		let t = p.statusArea.appendChild(e.createElement("table")).appendChild(e.createElement("tr"));
		x = t.appendChild(e.createElement("td")), S = t.appendChild(e.createElement("td")), x && x.setAttribute("style", u.upstreamStatus), S && S.setAttribute("style", u.downstreamStatus);
	}
	let C = function(t, n = !1) {
		o(t), p.statusArea && (n ? x : S).appendChild(s(e, t, "pink"));
	}, w = function(e) {
		p.statusArea && (p.statusArea.innerHTML = "");
	}, T = function(e, n, r) {
		let i = e.subject;
		n ||= "";
		let a = u.baseStyle, o = u.headingCore, s = u.headingStyle, c = _.any(i, t.dc("author"));
		if (!n && c) {
			let e = v(c);
			n = "color: " + (r ? "#888" : "black") + "; background-color: " + e + ";";
		}
		let l = _.any(i, b("indent"));
		l = l ? l.value : 0;
		let d = l >= 0 ? a + "text-indent: " + l * 3 + "em;" : o + s[-1 - l];
		e.setAttribute("style", d + n);
	}, E = function(e) {
		let t = e.subject;
		if (!t) throw Error("No chunk for line to be deleted!");
		let r = _.any(void 0, b("next"), t), s = _.any(t, b("next"));
		if (r.sameTerm(d) && s.sameTerm(d)) {
			o("You can't delete the only line.");
			return;
		}
		let c = _.statementsMatching(t, void 0, void 0, l).concat(_.statementsMatching(void 0, void 0, t, l)), u = [i(r, b("next"), s, l)];
		if (t instanceof n) {
			let e = t.uri.slice(-4);
			o("Deleting line " + e);
		}
		if (!y) throw Error("have no updater");
		y.update(c, u, function(n, r, i, s) {
			if (r) {
				let t = e.parentNode;
				if (t) {
					let e = t.previousSibling;
					t.parentNode && t.parentNode.removeChild(t), e && e.firstChild && e.firstChild.focus();
				}
			} else if (s && s.status === 409) T(e, "color: black;  background-color: #ffd;"), e.state = 0, a(.5, 512), setTimeout(function() {
				I();
			}, 1e3);
			else {
				o("    removePart FAILED " + t + ": " + i), o("    removePart was deleting :'" + c), T(e, "color: black;  background-color: #fdd;");
				let n = s ? s.status : " [no response field] ";
				C("Error " + n + " saving changes: " + String(i));
			}
		});
	}, D = function(e, t, n) {
		let r = _.statementsMatching(t, b("indent")), a = r.length ? Number(r[0].object.value) : 0;
		if (a + n < -3) return;
		let s = a + n, c = i(t, b("indent"), s, l);
		if (!y) throw Error("no updater");
		y.update(r, c, function(t, n, r) {
			n ? T(e) : (o("Indent change FAILED '" + s + "' for " + l + ": " + r), T(e, "color: black;  background-color: #fdd;"), y.requestDownstreamAction(l, I));
		});
	}, O = function(e, n) {
		let r = null;
		e.addEventListener("keydown", function(t) {
			if (!y) throw Error("no updater");
			let r, i;
			switch (t.keyCode) {
				case 13: {
					let a = t.shiftKey;
					if (o("enter"), a ? (i = _.any(void 0, b("next"), n), r = "newlinesAfter") : (i = _.any(n, b("next")), r = "newlinesBefore"), i[r] = i[r] || 0, i[r] += 1, i[r] > 1) {
						o("    queueing newline queue = " + i[r]);
						return;
					}
					o("    go ahead line before " + i[r]), A(e, a);
					break;
				}
				case 8:
					if (e.value.length === 0) switch (o("Delete key line " + n.uri.slice(-4) + " state " + e.state), e.state) {
						case 1:
						case 2:
							e.state = 4;
							return;
						case 3:
						case 4: return;
						case void 0:
						case 0:
							e.state = 3, E(e), t.preventDefault();
							break;
						default: throw Error("pad: Unexpected state " + e);
					}
					break;
				case 9: {
					let r = t.shiftKey ? -1 : 1;
					D(e, n, r), t.preventDefault();
					break;
				}
				case 27:
					o("escape"), y.requestDownstreamAction(l, I), t.preventDefault();
					break;
				case 38:
					e.parentNode.previousSibling && (e.parentNode.previousSibling.firstChild.focus(), t.preventDefault());
					break;
				case 40: e.parentNode.nextSibling && (e.parentNode.nextSibling.firstChild.focus(), t.preventDefault());
			}
		});
		let s = function(e) {
			let n = e.subject;
			T(e, void 0, !0);
			let r = _.any(n, t.sioc("content")).value, c = [i(n, t.sioc("content"), r, l)], u;
			e.value && (u = [i(n, t.sioc("content"), e.value, l)]);
			let d = e.value;
			if (e.lastSent && r !== e.lastSent && console.warn("Out of order, last sent expected '" + r + "' but found '" + e.lastSent + "'"), e.lastSent = d, !y) throw Error("no updater");
			y.update(c, u, function(t, n, i, c) {
				if (n) w(!0), T(e), o("    Patch ok '" + r + "' -> '" + d + "' "), e.state === 4 ? (e.state = 3, E(e)) : e.state === 3 || (e.state === 2 ? (e.state = 1, s(e)) : e.state = 0);
				else if (o("    patch FAILED " + c.status + " for '" + r + "' -> '" + d + "': " + i), c.status === 409) T(e, "color: black;  background-color: #fdd;"), e.state = 0, a(.5, 512), setTimeout(function() {
					y.requestDownstreamAction(l, I);
				}, 1e3);
				else {
					T(e, "color: black;  background-color: #fdd;");
					let t = c?.status;
					!t || t === 502 || t === 503 ? (e.lastSent = void 0, e.state = 0, setTimeout(() => {
						(e.state === 0 || e.state === void 0) && (e.state = 1, s(e));
					}, 2e3)) : (e.state = 0, C("    Error " + t + " sending data: " + i, !0), a(1, 128));
				}
			});
		};
		e.addEventListener("input", function(t) {
			switch (T(e, void 0, !0), o("Input event state " + e.state + " value '" + e.value + "'"), e.state) {
				case 3:
				case 4:
				case 2: return;
				case 1:
					e.state = 2;
					return;
				case 0:
				case void 0: r !== null && clearTimeout(r), r = setTimeout(() => {
					r = null, (e.state === 0 || e.state === void 0) && (e.state = 1, s(e));
				}, 400);
			}
		});
	}, k = function(n, r, i) {
		let a = _.any(r, t.sioc("content"));
		a = a ? a.value : "";
		let s = e.createElement("tr");
		i ? h.insertBefore(s, n) : n && n.nextSibling ? h.insertBefore(s, n.nextSibling) : h.appendChild(s);
		let c = s.appendChild(e.createElement("input"));
		return c.subject = r, c.setAttribute("type", "text"), c.value = a, f ? (T(c, ""), O(c, r)) : (T(c, "color: #222; background-color: #fff"), o("Note can't add listeners - not logged in")), c;
	}, A = function(e, n) {
		let r = g, a = 0, s = null, u, p, m, h, _;
		e ? (e.tagName.toLowerCase() !== "input" && o("return pressed when current document is: " + e.tagName), u = e.subject, a = r.any(u, b("indent")), a = a ? Number(a.value) : 0, n ? (p = r.any(void 0, b("next"), u), m = u, h = p, s = "newlinesAfter") : (p = u, m = r.any(u, b("next")), h = m, s = "newlinesBefore"), _ = e.parentNode) : (p = d, m = d, _ = void 0);
		let v = c(l), x = v.uri.slice(-4), S = [i(p, b("next"), m, l)], C = [
			i(p, b("next"), v, l),
			i(v, b("next"), m, l),
			i(v, t.dc("author"), f, l),
			i(v, t.sioc("content"), "", l)
		];
		if (a > 0 && C.push(i(v, b("indent"), a, l)), o("    Fresh chunk " + x + " proposed"), !y) throw Error("no updater");
		y.update(S, C, function(e, t, r, i) {
			if (!t) o("    ERROR writing new line " + x + ": " + r);
			else {
				let e = k(_, v, n);
				T(e), e.focus(), s && (o("    Fresh chunk " + x + " updated, queue = " + h[s]), --h[s], h[s] > 0 && (o("    Implementing queued newlines = " + m.newLinesBefore), A(e, n)));
			}
		});
	}, j = function() {
		let e = {}, n = 0;
		function r(e) {
			C(e), n++;
		}
		if (!_.the(d, b("next"))) return r("No initial next pointer"), !1;
		let i = d, a;
		for (; a = _.the(i, b("next")), a || r("No next pointer from " + i), !a.sameTerm(d);) {
			i = a;
			let n = a.uri.split("#")[1];
			if (e[a.uri]) return r("Loop!"), !1;
			e[a.uri] = !0;
			let o = _.each(a, b("next")).length;
			o !== 1 && r("Should be 1 not " + o + " next pointer for " + n), o = _.each(a, b("indent")).length, o > 1 && r("Should be 0 or 1 not " + o + " indent for " + n), o = _.each(a, t.sioc("content")).length, o !== 1 && r("Should be 1 not " + o + " contents for " + n), o = _.each(a, t.dc("author")).length, o !== 1 && r("Should be 1 not " + o + " author for " + n), _.statementsMatching(void 0, t.sioc("contents")).forEach(function(t) {
				e[t.subject.value] || r("Loose chunk! " + t.subject.value);
			});
		}
		return !n;
	}, M = function() {
		if (_.each(d, b("next")).length !== 1) {
			let e = "Pad: Inconsistent data - NEXT pointers: " + _.each(d, b("next")).length;
			o(e), p.statusArea && (p.statusArea.textContent += e);
			return;
		}
		let e, n = [];
		for (let e = _.the(d, b("next")); !e.sameTerm(d); e = _.the(e, b("next"))) for (let t = 0; t < h.children.length; t++) {
			let r = h.children[t];
			r.firstChild && r.firstChild.subject.sameTerm(e) && (n[e.uri] = r.firstChild);
		}
		for (let t = h.children.length - 1; t >= 0; t--) e = h.children[t], n[e.firstChild.subject.uri] || h.removeChild(e);
		e = h.firstChild;
		for (let r = _.the(d, b("next")); !r.sameTerm(d); r = _.the(r, b("next"))) {
			let i = _.any(r, t.sioc("content")).value;
			if (e && n[r.uri]) {
				let t = e.firstChild;
				i !== t.value && (t.value = i), T(t), t.state = 0, delete t.lastSent, e = e.nextSibling;
			} else k(e, r, !0);
		}
	}, N = function(e) {
		if (e.refresh) e.refresh();
		else for (let t = 0; t < e.children.length; t++) N(e.children[t]);
	}, P = !1, F = function() {
		o("    reloaded OK"), w(), j() ? N(h) : C("CONSISTENCY CHECK FAILED");
	}, I = function() {
		if (P) {
			o("   Already reloading - stop");
			return;
		}
		P = !0;
		let e = 1e3, t = function() {
			if (o("try reload - timeout = " + e), !y) throw Error("no updater");
			y.reload(y.store, l, function(n, r, i) {
				P = !1, n ? F() : i.status === 0 ? (C("Network error refreshing the pad. Retrying in " + e / 1e3), P = !0, e *= 2, setTimeout(t, e)) : C("Error " + i.status + "refreshing the pad:" + r + ". Stopped. " + l);
			});
		};
		t();
	};
	if (h.refresh = M, h.reloadAndSync = I, f || o("Warning: must be logged in for pad to be edited"), m) o("Existing pad."), j() ? (M(), _.holds(d, b("next"), d) && A()) : o(h.textContent = "Inconsistent data. Abort");
	else {
		o("No pad exists - making new one.");
		let e = [
			i(d, t.rdf("type"), b("Notepad"), l),
			i(d, t.dc("author"), f, l),
			i(d, t.dc("created"), /* @__PURE__ */ new Date(), l),
			i(d, b("next"), d, l)
		];
		if (!y) throw Error("no updater");
		y.update([], e, function(e, t, n) {
			t ? (o("Initial pad created"), A()) : C(n || "");
		});
	}
	return h;
}
function b(e, t) {
	let n = [];
	for (let r = t.the(e, _("next")); !r.sameTerm(e); r = t.the(r, _("next"))) n.push(r);
	return n;
}
function x(e) {
	return e.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
}
function S(e, n) {
	let r = b(e, n), i = "<html>\n  <head>\n", a = n.anyValue(e, t.dct("title"));
	a && (i += `    <title>${x(a)}</title>\n`), i += "  </head>\n  <body>\n";
	let o = 0;
	function s(e) {
		for (; o < e; o++) i += "<ul>\n";
	}
	function c(e) {
		for (; o > e; o--) i += "</ul>\n";
	}
	return r.forEach((e) => {
		let r = n.anyJS(e, _("indent")), a = n.anyJS(e, t.sioc("content"));
		if (!a) return;
		let o = x(a);
		if (r < 0) {
			c(0);
			let e = r >= -3 ? 4 + r : 1;
			i += `\n<h${e}>${o}</h${e}>\n`;
		} else r > 0 ? (c(r), s(r), i += `<li>${o}</li>\n`) : (c(r), i += `<p>${o}</p>\n`);
	}), c(0), i += "  </body>\n</html>\n", i;
}
export { b as getChunks, v as lightColorHash, d as manageParticipation, y as notepad, S as notepadToHTML, h as pad_exports, f as participationObject, p as recordParticipation, m as renderParticipants, x as xmlEncode };

//# sourceMappingURL=pad.esm.js.map