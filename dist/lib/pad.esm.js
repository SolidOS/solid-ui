import { __exportAll as e } from "../_virtual/_rolldown/runtime.esm.js";
import t from "./ns.esm.js";
import { beep as n } from "../utils/index.esm.js";
import { log as r } from "./debug.esm.js";
import { style as i } from "./style.esm.js";
import { errorMessageBlock as a } from "../widgets/error.esm.js";
import { newThing as o } from "../widgets/forms.esm.js";
import "../widgets/index.esm.js";
import { manageParticipation as s, participationObject as c, recordParticipation as l, renderParticipants as u } from "./participation.esm.js";
import { NamedNode as d, Namespace as f, st as p } from "rdflib";
import { solidLogicSingleton as m } from "solid-logic";
//#region src/lib/pad.ts
var h = /* @__PURE__ */ e({
	getChunks: () => b,
	lightColorHash: () => v,
	manageParticipation: () => s,
	notepad: () => y,
	notepadToHTML: () => S,
	participationObject: () => c,
	recordParticipation: () => l,
	renderParticipants: () => u,
	xmlEncode: () => x
}), g = m.store, _ = f("http://www.w3.org/ns/pim/pad#");
function v(e) {
	return e && e.uri ? "#" + (function(e) {
		return e.split("").reduce(function(e, t) {
			return e = (e << 5) - e + t.charCodeAt(0), e & e;
		}, 0);
	}(e.uri) & 16777215 | 12632256).toString(16) : "#ffffff";
}
function y(e, s, c, l, u) {
	u ||= {};
	let m = u.exists, h = e.createElement("table"), _ = g;
	if (l && !l.uri) throw Error("UI.pad.notepad:  Invalid userid");
	let y = g.updater, b = f("http://www.w3.org/ns/pim/pad#");
	h.setAttribute("style", i.notepadStyle);
	let x = null, S = null;
	if (u.statusArea) {
		let t = u.statusArea.appendChild(e.createElement("table")).appendChild(e.createElement("tr"));
		x = t.appendChild(e.createElement("td")), S = t.appendChild(e.createElement("td")), x && x.setAttribute("style", i.upstreamStatus), S && S.setAttribute("style", i.downstreamStatus);
	}
	let C = function(t, n = !1) {
		r(t), u.statusArea && (n ? x : S).appendChild(a(e, t, "pink"));
	}, w = function(e) {
		u.statusArea && (u.statusArea.innerHTML = "");
	}, T = function(e, n, r) {
		let a = e.subject;
		n ||= "";
		let o = i.baseStyle, s = i.headingCore, c = i.headingStyle, l = _.any(a, t.dc("author"));
		if (!n && l) {
			let e = v(l);
			n = "color: " + (r ? "#888" : "black") + "; background-color: " + e + ";";
		}
		let u = _.any(a, b("indent"));
		u = u ? u.value : 0;
		let d = u >= 0 ? o + "text-indent: " + u * 3 + "em;" : s + c[-1 - u];
		e.setAttribute("style", d + n);
	}, E = function(e) {
		let t = e.subject;
		if (!t) throw Error("No chunk for line to be deleted!");
		let i = _.any(void 0, b("next"), t), a = _.any(t, b("next"));
		if (i.sameTerm(c) && a.sameTerm(c)) {
			r("You can't delete the only line.");
			return;
		}
		let o = _.statementsMatching(t, void 0, void 0, s).concat(_.statementsMatching(void 0, void 0, t, s)), l = [p(i, b("next"), a, s)];
		if (t instanceof d) {
			let e = t.uri.slice(-4);
			r("Deleting line " + e);
		}
		if (!y) throw Error("have no updater");
		y.update(o, l, function(i, a, s, c) {
			if (a) {
				let t = e.parentNode;
				if (t) {
					let e = t.previousSibling;
					t.parentNode && t.parentNode.removeChild(t), e && e.firstChild && e.firstChild.focus();
				}
			} else if (c && c.status === 409) T(e, "color: black;  background-color: #ffd;"), e.state = 0, n(.5, 512), setTimeout(function() {
				I();
			}, 1e3);
			else {
				r("    removePart FAILED " + t + ": " + s), r("    removePart was deleting :'" + o), T(e, "color: black;  background-color: #fdd;");
				let n = c ? c.status : " [no response field] ";
				C("Error " + n + " saving changes: " + String(s));
			}
		});
	}, D = function(e, t, n) {
		let i = _.statementsMatching(t, b("indent")), a = i.length ? Number(i[0].object.value) : 0;
		if (a + n < -3) return;
		let o = a + n, c = p(t, b("indent"), o, s);
		if (!y) throw Error("no updater");
		y.update(i, c, function(t, n, i) {
			n ? T(e) : (r("Indent change FAILED '" + o + "' for " + s + ": " + i), T(e, "color: black;  background-color: #fdd;"), y.requestDownstreamAction(s, I));
		});
	}, O = function(e, i) {
		let a = null;
		e.addEventListener("keydown", function(t) {
			if (!y) throw Error("no updater");
			let n, a;
			switch (t.keyCode) {
				case 13: {
					let o = t.shiftKey;
					if (r("enter"), o ? (a = _.any(void 0, b("next"), i), n = "newlinesAfter") : (a = _.any(i, b("next")), n = "newlinesBefore"), a[n] = a[n] || 0, a[n] += 1, a[n] > 1) {
						r("    queueing newline queue = " + a[n]);
						return;
					}
					r("    go ahead line before " + a[n]), A(e, o);
					break;
				}
				case 8:
					if (e.value.length === 0) switch (r("Delete key line " + i.uri.slice(-4) + " state " + e.state), e.state) {
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
					let n = t.shiftKey ? -1 : 1;
					D(e, i, n), t.preventDefault();
					break;
				}
				case 27:
					r("escape"), y.requestDownstreamAction(s, I), t.preventDefault();
					break;
				case 38:
					e.parentNode.previousSibling && (e.parentNode.previousSibling.firstChild.focus(), t.preventDefault());
					break;
				case 40: e.parentNode.nextSibling && (e.parentNode.nextSibling.firstChild.focus(), t.preventDefault());
			}
		});
		let o = function(e) {
			let i = e.subject;
			T(e, void 0, !0);
			let a = _.any(i, t.sioc("content")).value, c = [p(i, t.sioc("content"), a, s)], l;
			e.value && (l = [p(i, t.sioc("content"), e.value, s)]);
			let u = e.value;
			if (e.lastSent && a !== e.lastSent && console.warn("Out of order, last sent expected '" + a + "' but found '" + e.lastSent + "'"), e.lastSent = u, !y) throw Error("no updater");
			y.update(c, l, function(t, i, c, l) {
				if (i) w(!0), T(e), r("    Patch ok '" + a + "' -> '" + u + "' "), e.state === 4 ? (e.state = 3, E(e)) : e.state === 3 || (e.state === 2 ? (e.state = 1, o(e)) : e.state = 0);
				else if (r("    patch FAILED " + l.status + " for '" + a + "' -> '" + u + "': " + c), l.status === 409) T(e, "color: black;  background-color: #fdd;"), e.state = 0, n(.5, 512), setTimeout(function() {
					y.requestDownstreamAction(s, I);
				}, 1e3);
				else {
					T(e, "color: black;  background-color: #fdd;");
					let t = l?.status;
					!t || t === 502 || t === 503 ? (e.lastSent = void 0, e.state = 0, setTimeout(() => {
						(e.state === 0 || e.state === void 0) && (e.state = 1, o(e));
					}, 2e3)) : (e.state = 0, C("    Error " + t + " sending data: " + c, !0), n(1, 128));
				}
			});
		};
		e.addEventListener("input", function(t) {
			switch (T(e, void 0, !0), r("Input event state " + e.state + " value '" + e.value + "'"), e.state) {
				case 3: return;
				case 4: return;
				case 2: return;
				case 1:
					e.state = 2;
					return;
				case 0:
				case void 0: a !== null && clearTimeout(a), a = setTimeout(() => {
					a = null, (e.state === 0 || e.state === void 0) && (e.state = 1, o(e));
				}, 400);
			}
		});
	}, k = function(n, i, a) {
		let o = _.any(i, t.sioc("content"));
		o = o ? o.value : "";
		let s = e.createElement("tr");
		a ? h.insertBefore(s, n) : n && n.nextSibling ? h.insertBefore(s, n.nextSibling) : h.appendChild(s);
		let c = s.appendChild(e.createElement("input"));
		return c.subject = i, c.setAttribute("type", "text"), c.value = o, l ? (T(c, ""), O(c, i)) : (T(c, "color: #222; background-color: #fff"), r("Note can't add listeners - not logged in")), c;
	}, A = function(e, n) {
		let i = g, a = 0, u = null, d, f, m, h, _;
		e ? (e.tagName.toLowerCase() !== "input" && r("return pressed when current document is: " + e.tagName), d = e.subject, a = i.any(d, b("indent")), a = a ? Number(a.value) : 0, n ? (f = i.any(void 0, b("next"), d), m = d, h = f, u = "newlinesAfter") : (f = d, m = i.any(d, b("next")), h = m, u = "newlinesBefore"), _ = e.parentNode) : (f = c, m = c, _ = void 0);
		let v = o(s), x = v.uri.slice(-4), S = [p(f, b("next"), m, s)], C = [
			p(f, b("next"), v, s),
			p(v, b("next"), m, s),
			p(v, t.dc("author"), l, s),
			p(v, t.sioc("content"), "", s)
		];
		if (a > 0 && C.push(p(v, b("indent"), a, s)), r("    Fresh chunk " + x + " proposed"), !y) throw Error("no updater");
		y.update(S, C, function(e, t, i, a) {
			if (!t) r("    ERROR writing new line " + x + ": " + i);
			else {
				let e = k(_, v, n);
				T(e), e.focus(), u && (r("    Fresh chunk " + x + " updated, queue = " + h[u]), --h[u], h[u] > 0 && (r("    Implementing queued newlines = " + m.newLinesBefore), A(e, n)));
			}
		});
	}, j = function() {
		let e = {}, n = 0;
		function r(e) {
			C(e), n++;
		}
		if (!_.the(c, b("next"))) return r("No initial next pointer"), !1;
		let i = c, a;
		for (; a = _.the(i, b("next")), a || r("No next pointer from " + i), !a.sameTerm(c);) {
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
		if (_.each(c, b("next")).length !== 1) {
			let e = "Pad: Inconsistent data - NEXT pointers: " + _.each(c, b("next")).length;
			r(e), u.statusArea && (u.statusArea.textContent += e);
			return;
		}
		let e, n = [];
		for (let e = _.the(c, b("next")); !e.sameTerm(c); e = _.the(e, b("next"))) for (let t = 0; t < h.children.length; t++) {
			let r = h.children[t];
			r.firstChild && r.firstChild.subject.sameTerm(e) && (n[e.uri] = r.firstChild);
		}
		for (let t = h.children.length - 1; t >= 0; t--) e = h.children[t], n[e.firstChild.subject.uri] || h.removeChild(e);
		e = h.firstChild;
		for (let r = _.the(c, b("next")); !r.sameTerm(c); r = _.the(r, b("next"))) {
			let i = _.any(r, t.sioc("content")).value;
			if (e && n[r.uri]) {
				let t = e.firstChild;
				i !== t.value && (t.value = i), T(t), t.state = 0, delete t.lastSent, e = e.nextSibling;
			} else k(e, r, !0);
		}
	}, N = function(e) {
		if (e.refresh) {
			e.refresh();
			return;
		}
		for (let t = 0; t < e.children.length; t++) N(e.children[t]);
	}, P = !1, F = function() {
		r("    reloaded OK"), w(), j() ? N(h) : C("CONSISTENCY CHECK FAILED");
	}, I = function() {
		if (P) {
			r("   Already reloading - stop");
			return;
		}
		P = !0;
		let e = 1e3, t = function() {
			if (r("try reload - timeout = " + e), !y) throw Error("no updater");
			y.reload(y.store, s, function(n, r, i) {
				P = !1, n ? F() : i.status === 0 ? (C("Network error refreshing the pad. Retrying in " + e / 1e3), P = !0, e *= 2, setTimeout(t, e)) : C("Error " + i.status + "refreshing the pad:" + r + ". Stopped. " + s);
			});
		};
		t();
	};
	if (h.refresh = M, h.reloadAndSync = I, l || r("Warning: must be logged in for pad to be edited"), m) r("Existing pad."), j() ? (M(), _.holds(c, b("next"), c) && A()) : r(h.textContent = "Inconsistent data. Abort");
	else {
		r("No pad exists - making new one.");
		let e = [
			p(c, t.rdf("type"), b("Notepad"), s),
			p(c, t.dc("author"), l, s),
			p(c, t.dc("created"), /* @__PURE__ */ new Date(), s),
			p(c, b("next"), c, s)
		];
		if (!y) throw Error("no updater");
		y.update([], e, function(e, t, n) {
			t ? (r("Initial pad created"), A()) : C(n || "");
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
//#endregion
export { b as getChunks, v as lightColorHash, s as manageParticipation, y as notepad, S as notepadToHTML, h as pad_exports, c as participationObject, l as recordParticipation, u as renderParticipants, x as xmlEncode };

//# sourceMappingURL=pad.esm.js.map