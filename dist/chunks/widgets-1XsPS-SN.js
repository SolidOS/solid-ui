import { B as e, E as t, F as n, G as r, L as i, N as a, T as o, U as s, W as c, j as l, l as u, t as d, v as f, w as p, z as m } from "./solidLogicSingleton.esm-Dva9_prE.js";
import { a as h, c as g, f as _, i as v, n as y, o as b, p as x, s as S, t as C, u as w } from "./style-CuYGj-Cj.js";
import { n as T, t as E } from "./index.esm-Dla45Mcl.js";
import "./square-arrow-out-up-right-CyTmaQNA.js";
// src/lib/debug.ts
function D(...e) {
	console.log(...e);
}
function O(...e) {
	console.warn(...e);
}
function k(...e) {
	console.error(...e);
}
function A(...e) {
	console.trace(...e);
}
// node_modules/escape-html/index.js
var j = /* @__PURE__ */ s(((e, t) => {
	var n = /["'&<>]/;
	t.exports = r;
	function r(e) {
		var t = "" + e, r = n.exec(t);
		if (!r) return t;
		var i, a = "", o = 0, s = 0;
		for (o = r.index; o < t.length; o++) {
			switch (t.charCodeAt(o)) {
				case 34:
					i = "&quot;";
					break;
				case 38:
					i = "&amp;";
					break;
				case 39:
					i = "&#39;";
					break;
				case 60:
					i = "&lt;";
					break;
				case 62:
					i = "&gt;";
					break;
				default: continue;
			}
			s !== o && (a += t.substring(s, o)), s = o + 1, a += i;
		}
		return s === o ? a : a + t.substring(s, o);
	}
})), M = [];
for (let e = 0; e < 256; ++e) M.push((e + 256).toString(16).slice(1));
function N(e, t = 0) {
	return (M[e[t + 0]] + M[e[t + 1]] + M[e[t + 2]] + M[e[t + 3]] + "-" + M[e[t + 4]] + M[e[t + 5]] + "-" + M[e[t + 6]] + M[e[t + 7]] + "-" + M[e[t + 8]] + M[e[t + 9]] + "-" + M[e[t + 10]] + M[e[t + 11]] + M[e[t + 12]] + M[e[t + 13]] + M[e[t + 14]] + M[e[t + 15]]).toLowerCase();
}
// node_modules/uuid/dist/rng.js
var P = /* @__PURE__ */ new Uint8Array(16);
function ee() {
	return crypto.getRandomValues(P);
}
// node_modules/uuid/dist/v4.js
function te(e, t, n) {
	return !t && !e && crypto.randomUUID ? crypto.randomUUID() : ne(e, t, n);
}
function ne(e, t, n) {
	e ||= {};
	let r = e.random ?? e.rng?.() ?? ee();
	if (r.length < 16) throw Error("Random bytes length must be >= 16");
	if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
		if (n ||= 0, n < 0 || n + 16 > t.length) throw RangeError(`UUID byte range ${n}:${n + 15} is out of buffer bounds`);
		for (let e = 0; e < 16; ++e) t[n + e] = r[e];
		return t;
	}
	return N(r);
}
// src/widgets/dragAndDrop.js
var F = /* @__PURE__ */ r(u());
function I(e, t, n) {
	let r = function(e) {
		return e.split("\n").map((e) => e.trim()).filter((e) => e && e[0] !== "#");
	}, i = function(e) {
		e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy";
	}, a = function(e) {
		e.preventDefault(), e.stopPropagation(), D("dragenter event dropEffect: " + e.dataTransfer.dropEffect), this.localStyle && (this.savedStyle ||= C.dragEvent), e.dataTransfer.dropEffect = "link", D("dragenter event dropEffect 2: " + e.dataTransfer.dropEffect);
	}, o = function(e) {
		e.stopPropagation(), D("dragleave event dropEffect: " + e.dataTransfer.dropEffect), this.localStyle = this.savedStyle ? this.savedStyle : C.dropEvent;
	}, s = function(e) {
		e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), D("Drop event. dropEffect: " + e.dataTransfer.dropEffect), D("Drop event. types: " + (e.dataTransfer.types ? e.dataTransfer.types.join(", ") : "NOPE"));
		let i = null, a;
		if (e.dataTransfer.types) {
			for (let t = 0; t < e.dataTransfer.types.length; t++) {
				let o = e.dataTransfer.types[t];
				if (o === "text/uri-list") i = r(e.dataTransfer.getData(o)), D("Dropped text/uri-list: " + i);
				else if (o === "text/plain") a = e.dataTransfer.getData(o);
				else if (o === "Files" && n) {
					let t = e.dataTransfer.files;
					for (let e = 0; t[e]; e++) {
						let n = t[e];
						D("Filename: " + n.name + ", type: " + (n.type || "n/a") + " size: " + n.size + " bytes, last modified: " + (n.lastModifiedDate ? n.lastModifiedDate.toLocaleDateString() : "n/a"));
					}
					n(t);
				}
			}
			let t = a ? a.trim() : "";
			i === null && t && t.slice(0, 4) === "http" && (i = [t], D("Warning: Poor man's drop: using text for URI"));
		} else i = r(e.dataTransfer.getData("Text")), D("WARNING non-standard drop event: " + i[0]);
		return D("Dropped URI list (2): " + i), i && t(i), this.localStyle = C.restoreStyle, !1;
	};
	(function(e) {
		e || D("@@@ addTargetListeners: ele " + e), e.addEventListener("dragover", i), e.addEventListener("dragenter", a), e.addEventListener("dragleave", o), e.addEventListener("drop", s);
	})(e, t);
}
function re(e, t) {
	e.setAttribute("draggable", "true"), e.addEventListener("dragstart", function(n) {
		e.style.fontWeight = "bold", n.dataTransfer.setData("text/uri-list", t.uri), n.dataTransfer.setData("text/plain", t.uri), n.dataTransfer.setData("text/html", e.outerHTML), D("Dragstart: " + e + " -> " + t + "de: " + n.dataTransfer.dropEffect);
	}, !1), e.addEventListener("drag", function(e) {
		e.preventDefault(), e.stopPropagation();
	}, !1), e.addEventListener("dragend", function(n) {
		e.style.fontWeight = "normal", D("Dragend dropeffect: " + n.dataTransfer.dropEffect), D("Dragend: " + e + " -> " + t);
	}, !1);
}
function ie(e, t, n, r, i) {
	let a = function(e, t) {
		let n = t?.response?.status ?? t?.status, r = t?.message || String(t), i = `Upload failed while putting ${e}`;
		return n === 413 ? `${i}: storage quota was exceeded. ${r}` : n ? `${i} (HTTP ${n}). ${r}` : `${i}. ${r}`;
	};
	for (let o = 0; t[o]; o++) {
		let s = t[o];
		D(" dropped: Filename: " + s.name + ", type: " + (s.type || "n/a") + " size: " + s.size + " bytes, last modified: " + (s.lastModifiedDate ? s.lastModifiedDate.toLocaleDateString() : "n/a"));
		let c = new FileReader();
		c.onload = function(t) {
			return function(o) {
				let s = o.target.result, c = "";
				D(" File read byteLength : " + s.byteLength);
				let l = t.type;
				if (!t.type || t.type === "") {
					if (l = F.lookup(t.name), !l) {
						let e = "Filename needs to have an extension which gives a type we know: " + t.name;
						throw D(e), alert(e), Error(e);
					}
				} else {
					let e = F.extension(t.type);
					e && e !== "false" && !t.name.endsWith("." + e) && t.type !== F.lookup(t.name) && (c = "_." + e);
				}
				let u = t.type.startsWith("image/") && r || n, d = u + (u.endsWith("/") ? "" : "/") + encodeURIComponent(t.name) + c;
				e.webOperation("PUT", d, {
					data: s,
					contentType: l
				}).then((e) => {
					D(" Upload: put OK: " + d), i(t, d);
				}, (e) => {
					let t = a(d, e);
					throw D(t), alert(t), Error(t);
				});
			};
		}(s), c.readAsArrayBuffer(s);
	}
}
// src/widgets/error.ts
function L(e, t, n, r) {
	let i = e.createElement("div"), a = r || t instanceof Error ? t : null;
	return a ? (console.error(`errorMessageBlock: ${a} at: ${a.stack || "??"}`, a), i.textContent = a.message) : i.textContent = t, i.appendChild(W(e, () => {
		i.parentNode && i.parentNode.removeChild(i);
	})).style = C.errorCancelButton, i.setAttribute("style", C.errorMessageBlockStyle), i.style.backgroundColor = n || y.defaultErrorBackgroundColor, i;
}
// src/lib/iconBase.ts
var ae = "https://solidos.github.io/solid-ui/src", R = typeof module < "u" && module.scriptURI ? {
	iconBase: module.scriptURI.slice(0, module.scriptURI.lastIndexOf("/")) + "/icons/",
	originalIconBase: module.scriptURI.slice(0, module.scriptURI.lastIndexOf("/")) + "/originalIcons/"
} : typeof $SolidTestEnvironment < "u" && $SolidTestEnvironment.iconBase ? {
	iconBase: $SolidTestEnvironment.iconBase,
	originalIconBase: $SolidTestEnvironment.originalIconBase
} : {
	iconBase: ae + "/icons/",
	originalIconBase: ae + "/originalIcons/"
};
D("   icons.iconBase is set to : " + R.iconBase);
var oe = R.iconBase;
R.originalIconBase;
// src/widgets/peoplePicker.js
var z = /* @__PURE__ */ r(j()), B = d.store, se = class {
	constructor(e, t, n, r) {
		this.options = r || {}, this.element = e, this.typeIndex = t, this.groupPickedCb = n, this.selectedgroup = this.options.selectedgroup, this.onSelectGroup = this.onSelectGroup.bind(this);
	}
	render() {
		let e = document.createElement("div");
		if (e.style.maxWidth = "350px", e.style.minHeight = "200px", e.style.outline = "1px solid black", e.style.display = "flex", this.selectedgroup) {
			e.style.flexDirection = "column";
			let t = document.createElement("div");
			new le(t, this.selectedgroup).render();
			let n = document.createElement("button");
			n.textContent = (0, z.default)("Change group"), n.addEventListener("click", (e) => {
				this.selectedgroup = null, this.render();
			}), e.appendChild(t), e.appendChild(n);
		} else this.findAddressBook(this.typeIndex).then(({ book: t }) => {
			let n = document.createElement("button");
			n.textContent = (0, z.default)("Pick an existing group"), n.style.margin = "auto", n.addEventListener("click", (n) => {
				new ce(e, t, this.onSelectGroup).render();
			});
			let r = document.createElement("button");
			r.textContent = (0, z.default)("Create a new group"), r.style.margin = "auto", r.addEventListener("click", (e) => {
				this.createNewGroup(t, this.options.defaultNewGroupName).then(({ group: e }) => {
					new ue(this.element, t, e, this.onSelectGroup).render();
				}).catch((e) => {
					this.element.appendChild(L(document, (0, z.default)(`Error creating a new group. (${e})`)));
				});
			}), e.appendChild(n), e.appendChild(r), this.element.innerHTML = "", this.element.appendChild(e);
		}).catch((e) => {
			this.element.appendChild(L(document, (0, z.default)(`Could find your groups. (${e})`)));
		});
		return this.element.innerHTML = "", this.element.appendChild(e), this;
	}
	findAddressBook(e) {
		return new Promise((t, n) => {
			B.fetcher.nowOrWhenFetched(e, (r, i) => {
				if (!r) return n(i);
				let a = B.any(null, f.solid("forClass"), f.vcard("AddressBook"));
				if (!a) return n(/* @__PURE__ */ Error("no address book registered in the solid type index " + e));
				let o = B.any(a, f.solid("instance"));
				if (!o) return n(/* @__PURE__ */ Error("incomplete address book registration"));
				B.fetcher.load(o).then(function(e) {
					return t({ book: o });
				}).catch(function(e) {
					return n(/* @__PURE__ */ Error("Could not load address book " + e));
				});
			});
		});
	}
	createNewGroup(e, n) {
		let { groupIndex: r, groupContainer: i } = me(e), a = o(`${i.uri}${te().slice(0, 8)}.ttl#this`), s = n || "Untitled Group", c = [a.doc(), r].map((n) => {
			let i = t(a, f.rdf("type"), f.vcard("Group"), n), o = t(a, f.vcard("fn"), s, a.doc(), n), c = t(e, f.vcard("includesGroup"), a, n), l = n.equals(r) ? [
				i,
				o,
				c
			] : [i, o];
			return pe(n.uri, { toIns: l }).then(() => {
				l.forEach((e) => {
					B.add(e);
				});
			});
		});
		return Promise.all(c).then(() => ({ group: a })).catch((e) => {
			throw D("Could not create new group.  PATCH failed " + e), Error(`Couldn't create new group.  PATCH failed for (${e.xhr ? e.xhr.responseURL : ""} )`);
		});
	}
	onSelectGroup(e) {
		this.selectedgroup = e, this.groupPickedCb(e), this.render();
	}
}, ce = class {
	constructor(e, t, n) {
		this.element = e, this.book = t, this.onSelectGroup = n;
	}
	render() {
		return this.loadGroups().then((e) => {
			let t = document.createElement("div");
			t.style.display = "flex", t.style.flexDirection = "column", e.forEach((e) => {
				let n = document.createElement("button");
				n.addEventListener("click", this.handleClickGroup(e)), new le(n, e).render(), t.appendChild(n);
			}), this.element.innerHTML = "", this.element.appendChild(t);
		}).catch((e) => {
			this.element.appendChild(L(document, (0, z.default)(`There was an error loading your groups. (${e})`)));
		}), this;
	}
	loadGroups() {
		return new Promise((e, t) => {
			let { groupIndex: n } = me(this.book);
			B.fetcher.nowOrWhenFetched(n, (n, r) => n ? e(B.each(this.book, f.vcard("includesGroup"))) : t(r));
		});
	}
	handleClickGroup(e) {
		return (t) => {
			this.onSelectGroup(e);
		};
	}
}, le = class {
	constructor(e, t) {
		this.element = e, this.group = t;
	}
	render() {
		let e = document.createElement("div");
		return e.textContent = (0, z.default)(fe(this.group, f.vcard("fn"), `[${this.group.value}]`)), this.element.innerHTML = "", this.element.appendChild(e), this;
	}
}, ue = class {
	constructor(e, t, n, r, i) {
		this.element = e, this.book = t, this.group = n, this.onGroupChanged = (e, t, n) => {
			i && i(e, t, n);
		}, this.groupChangedCb = i, this.doneBuildingCb = r;
	}
	refresh() {}
	render() {
		let e = document.createElement("div");
		e.style.maxWidth = "350px", e.style.minHeight = "200px", e.style.outline = "1px solid black", e.style.display = "flex", e.style.flexDirection = "column", I(e, (e) => {
			e.forEach((e) => {
				this.add(e).catch((e) => {
					this.element.appendChild(L(document, (0, z.default)(`Could not add the given WebId. (${e})`)));
				});
			});
		});
		let t = document.createElement("input");
		t.type = "text", t.value = fe(this.group, f.vcard("fn"), "Untitled Group"), t.addEventListener("change", (e) => {
			this.setGroupName(e.target.value).catch((e) => {
				this.element.appendChild(L(document, `Error changing group name. (${e})`));
			});
		});
		let n = document.createElement("label");
		if (n.textContent = (0, z.default)("Group Name:"), n.appendChild(t), e.appendChild(n), B.any(this.group, f.vcard("hasMember"))) B.match(this.group, f.vcard("hasMember")).forEach((t) => {
			let n = t.object, r = document.createElement("div");
			new de(r, n, this.handleRemove(n)).render(), e.appendChild(r);
		});
		else {
			let t = document.createElement("p");
			t.textContent = z.default`
        To add someone to this group, drag and drop their WebID URL onto the box.
      `, e.appendChild(t);
		}
		let r = document.createElement("button");
		return r.textContent = (0, z.default)("Done"), r.addEventListener("click", (e) => {
			this.doneBuildingCb(this.group);
		}), e.appendChild(r), this.element.innerHTML = "", this.element.appendChild(e), this;
	}
	add(e) {
		return new Promise((t, n) => {
			B.fetcher.nowOrWhenFetched(e, (r, i) => {
				if (!r) return this.onGroupChanged(i), n(i);
				let a = o(e), s = B.any(a, f.rdf("type"));
				return !s || !s.equals(f.foaf("Person")) ? n(/* @__PURE__ */ Error(`Only people supported right now. (tried to add something of type ${s.value})`)) : t(a);
			});
		}).then((e) => {
			let n = t(this.group, f.vcard("hasMember"), e);
			return B.holdsStatement(n) ? e : pe(this.group.doc().uri, { toIns: [n] }).then(() => {
				n.why = this.group.doc(), B.add(n), this.onGroupChanged(null, "added", e), this.render();
			});
		});
	}
	handleRemove(e) {
		return (n) => {
			let r = t(this.group, f.vcard("hasMember"), e);
			return pe(this.group.doc().uri, { toDel: [r] }).then(() => (B.remove(r), this.onGroupChanged(null, "removed", e), this.render(), !0)).catch((t) => {
				let n = B.any(e, f.foaf("name")), r = n && n.value ? `Could not remove ${n.value}. (${t})` : `Could not remove ${e.value}. (${t})`;
				throw Error(r);
			});
		};
	}
	setGroupName(e) {
		let { groupIndex: n } = me(this.book), r = [this.group.doc(), n].map((n) => {
			let r = B.match(this.group, f.vcard("fn"), null, n), i = t(this.group, f.vcard("fn"), p(e));
			return pe(n.value, {
				toDel: r,
				toIns: [i]
			}).then((e) => {
				B.removeStatements(r), i.why = n, B.add(i);
			});
		});
		return Promise.all(r);
	}
}, de = class {
	constructor(e, t, n) {
		this.webIdNode = t, this.element = e, this.handleRemove = n;
	}
	render() {
		let e = document.createElement("div");
		e.style.display = "flex";
		let t = fe(this.webIdNode, f.foaf("img"), oe + "noun_15059.svg"), n = document.createElement("img");
		n.src = (0, z.default)(t), n.width = "50", n.height = "50", n.style.margin = "5px";
		let r = fe(this.webIdNode, f.foaf("name"), `[${this.webIdNode}]`), i = document.createElement("span");
		i.innerHTML = (0, z.default)(r), i.style.flexGrow = "1", i.style.margin = "auto 0";
		let a = document.createElement("button");
		return a.textContent = "Remove", a.addEventListener("click", (e) => this.handleRemove().catch((e) => {
			this.element.appendChild(L(document, (0, z.default)(`${e}`)));
		})), a.style.margin = "5px", e.appendChild(n), e.appendChild(i), e.appendChild(a), this.element.innerHTML = "", this.element.appendChild(e), this;
	}
};
function fe(e, t, n) {
	let r = B.any(e, t);
	return r ? r.value : n;
}
function pe(e, { toDel: t, toIns: n }) {
	return new Promise((e, r) => {
		B.updater.update(t, n, (t, n, i) => {
			if (!n) return r(/* @__PURE__ */ Error(`PATCH failed for resource <${t}>: ${i}`));
			e();
		});
	});
}
function me(e) {
	return {
		groupIndex: B.any(e, f.vcard("groupIndex")),
		groupContainer: B.sym(e.dir().uri + "Group/")
	};
}
// src/lib/newperson.js
var he = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjAxNTcgOS4yNzM2M0MxNC4yOTU0IDguMzQwMzEgMTUuMTI4OCA2LjgyOTg0IDE1LjEyODggNS4xMjgyQzE1LjEyODggMi4zMDA1MSAxMi44MjgzIDAgMTAuMDAwNiAwQzcuMTcyODkgMCA0Ljg3MjM4IDIuMzAwNTEgNC44NzIzOCA1LjEyODJDNC44NzIzOCA2LjgyOTg0IDUuNzA1NyA4LjM0MDMxIDYuOTg1NDcgOS4yNzM2M0MzLjgwNDIyIDEwLjQ5MSAxLjUzOTA2IDEzLjU3NTQgMS41MzkwNiAxNy4xNzk1QzEuNTM5MDYgMTguNzM0NyAyLjgwNDM0IDIwIDQuMzU5NTcgMjBIMTUuNjQxNkMxNy4xOTY4IDIwIDE4LjQ2MjEgMTguNzM0NyAxOC40NjIxIDE3LjE3OTVDMTguNDYyMSAxMy41NzU0IDE2LjE5NyAxMC40OTEgMTMuMDE1NyA5LjI3MzYzWk02LjQxMDg2IDUuMTI4MkM2LjQxMDg2IDMuMTQ4ODMgOC4wMjEyMSAxLjUzODQ4IDEwLjAwMDYgMS41Mzg0OEMxMS45OCAxLjUzODQ4IDEzLjU5MDMgMy4xNDg4MyAxMy41OTAzIDUuMTI4MkMxMy41OTAzIDcuMTA3NTggMTEuOTggOC43MTc5NyAxMC4wMDA2IDguNzE3OTdDOC4wMjEyMSA4LjcxNzk3IDYuNDEwODYgNy4xMDc1OCA2LjQxMDg2IDUuMTI4MlpNMTUuNjQxNiAxOC40NjE1SDQuMzU5NTdDMy42NTI2NiAxOC40NjE1IDMuMDc3NTQgMTcuODg2NCAzLjA3NzU0IDE3LjE3OTVDMy4wNzc1NCAxMy4zNjIgNi4xODMxNiAxMC4yNTY0IDEwLjAwMDYgMTAuMjU2NEMxMy44MTgxIDEwLjI1NjQgMTYuOTIzNyAxMy4zNjIgMTYuOTIzNyAxNy4xNzk1QzE2LjkyMzcgMTcuODg2NCAxNi4zNDg2IDE4LjQ2MTUgMTUuNjQxNiAxOC40NjE1WiIgZmlsbD0iIzMxNDE1OCIvPgo8L3N2Zz4K", ge = (e, t, n) => {
	let r = e.createElement("tr");
	return r.appendChild(e.createElement("td")).appendChild(t), r.subject = n, r;
}, _e = (e, t) => {
	e.addEventListener("click", t);
}, ve = (e, t, n) => {
	let r = t.appendChild(e.createElement("div"));
	r.setAttribute("style", C.imageDivStyle), r.appendChild(n), n.setAttribute("draggable", "false");
};
// src/widgets/buttons/iconLinks.ts
function ye(e, t, n) {
	let r = e.createElement("a");
	if (r.setAttribute("href", t.uri), t.uri.startsWith("http") && r.setAttribute("target", "_blank"), n) {
		let t = r.appendChild(e.createElement("img"));
		t.setAttribute("src", n), t.setAttribute("style", "margin: 0.3em;");
	} else {
		r.setAttribute("aria-label", "Open resource");
		let t = r.appendChild(e.createElement("icon-lucide-square-arrow-out-up-right"));
		t.setAttribute("aria-hidden", "true"), t.setAttribute("style", "display: inline-block; width: 1em; height: 1em; margin: 0.2em; color: var(--color-text-secondary, #4A5565);");
	}
	return r;
}
var be = (e, t, n) => {
	let r = ye(e, n);
	t.appendChild(r).classList.add("HoverControlHide"), t.appendChild(e.createElement("br"));
}, { iconBase: V } = R, xe = V + "noun_1180156.svg", Se = V + "noun_1180158.svg";
function Ce(e) {
	let t = e && e.statusArea || e && e.div || null;
	if (t) return t;
	let n = e && e.dom;
	if (!n && typeof document < "u" && (n = document), n) {
		let r = n.getElementsByTagName("body")[0];
		return t = n.createElement("div"), r.insertBefore(t, r.firstElementChild), e && (e.statusArea = t), t;
	}
	return null;
}
function we(e, t) {
	if (!t) return;
	let n = Ce(e);
	D("Complaint: " + t), n ? n.appendChild(L(e && e.dom || document, t)) : alert(t);
}
function Te(e) {
	for (; e.firstChild;) e.removeChild(e.firstChild);
	return e;
}
function Ee(e) {
	let t = e.search(/logFile=/), n = e.search(/&rulesFile=/);
	return e.substring(t + 8, n);
}
function De(e, t) {
	if (!e) return "???";
	let n = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	try {
		let r = (/* @__PURE__ */ new Date()).toISOString();
		return e.slice(0, 10) === r.slice(0, 10) && !t ? e.slice(11, 16) : e.slice(0, 4) === r.slice(0, 4) ? n[parseInt(e.slice(5, 7), 10) - 1] + " " + parseInt(e.slice(8, 10), 10) : e.slice(0, 10);
	} catch (e) {
		return "shortdate:" + e;
	}
}
function Oe(e, t) {
	return t.split("{").map(function(t) {
		let n = t.split("}")[0];
		return t ? ("000" + (e["get" + n]() + ({ Month: 1 }[n] || 0))).slice(-({
			Milliseconds: 3,
			FullYear: 4
		}[n] || 2)) + t.split("}")[1] : "";
	}).join("");
}
function ke() {
	return Oe(/* @__PURE__ */ new Date(), "{FullYear}-{Month}-{Date}T{Hours}:{Minutes}:{Seconds}.{Milliseconds}");
}
function Ae() {
	return Oe(/* @__PURE__ */ new Date(), "{Hours}:{Minutes}:{Seconds}.{Milliseconds}");
}
function je(e, t) {
	let n = E, r = function(e) {
		let t = n.any(e, f.vcard("fn")) || n.any(e, f.foaf("name")) || n.any(e, f.vcard("organization-name"));
		return t ? t.value : null;
	}, i = t.sameTerm(f.foaf("Agent")) ? "Everyone" : r(t);
	if (e.textContent = i || w(t), !i && t.uri) {
		if (!n.fetcher) throw Error("kb has no fetcher");
		n.fetcher.nowOrWhenFetched(t.doc(), void 0, function(n) {
			e.textContent = r(t) || w(t);
		});
	}
}
function Me(e, t) {
	return t.each(e, f.sioc("avatar")).concat(t.each(e, f.foaf("img"))).concat(t.each(e, f.vcard("logo"))).concat(t.each(e, f.vcard("hasPhoto"))).concat(t.each(e, f.vcard("photo"))).concat(t.each(e, f.foaf("depiction")));
}
var Ne = {
	"solid:AppProviderClass": "noun_144.svg",
	"solid:AppProvider": "noun_15177.svg",
	"solid:Pod": "noun_Cabinet_1434380.svg",
	"vcard:Group": "noun_339237.svg",
	"vcard:Organization": "noun_143899.svg",
	"vcard:Individual": he,
	"schema:Person": he,
	"foaf:Person": he,
	"foaf:Agent": "noun_98053.svg",
	"acl:AuthenticatedAgent": "noun_99101.svg",
	"prov:SoftwareAgent": "noun_Robot_849764.svg",
	"vcard:AddressBook": "noun_15695.svg",
	"trip:Trip": "noun_581629.svg",
	"meeting:LongChat": "noun_1689339.svg",
	"meeting:Meeting": "noun_66617.svg",
	"meeting:Project": "noun_1036577.svg",
	"ui:Form": "noun_122196.svg",
	"rdfs:Class": "class-rectangle.svg",
	"rdf:Property": "property-diamond.svg",
	"owl:Ontology": "noun_classification_1479198.svg",
	"wf:Tracker": "noun_122196.svg",
	"wf:Task": "noun_17020_gray-tick.svg",
	"wf:Open": "noun_17020_sans-tick.svg",
	"wf:Closed": "noun_17020.svg"
};
function Pe(e) {
	let t = e.uri.split("#")[0], n = t.indexOf("//");
	if (n < 0) throw Error("This URI does not have a web site part (origin)");
	let r = t.indexOf("/", n + 2);
	return r < 0 ? t.slice(0) + "/" : t.slice(0, r + 1);
}
function Fe(e) {
	let t = V;
	return typeof e != "string" && e.uri ? e.uri.split("/").length === 4 && !e.uri.split("/")[1] && !e.uri.split("/")[3] ? t + "noun_15177.svg" : e.uri.startsWith("message:") || e.uri.startsWith("mid:") ? t + "noun_480183.svg" : e.uri.startsWith("mailto:") ? t + "noun_567486.svg" : e.uri.startsWith("https:") && e.uri.indexOf("#") < 0 ? Pe(e) + "favicon.ico" : null : t + "noun_10636_grey.svg";
}
function Ie(e) {
	let t = E, n = V;
	if (e.sameTerm(f.foaf("Agent")) || e.sameTerm(f.rdf("Resource"))) return n + "noun_98053.svg";
	let r = t.any(e, f.sioc("avatar")) || t.any(e, f.foaf("img")) || t.any(e, f.vcard("logo")) || t.any(e, f.vcard("hasPhoto")) || t.any(e, f.vcard("photo")) || t.any(e, f.foaf("depiction"));
	return r ? r.uri : null;
}
function Le(e, t, n) {
	let r = E, i = Ie(t);
	if (i) return e.setAttribute("src", i), !0;
	let a = n[t.uri];
	if (a) return e.setAttribute("src", a), e.style = C.classIconStyle, !0;
	let o = Fe(t);
	if (o) return e.setAttribute("src", o), !0;
	let s = r.findTypeURIs(t);
	for (let t in s) if (n[t]) return e.setAttribute("src", n[t]), !1;
	return e.setAttribute("src", V + "noun_10636_grey.svg"), !1;
}
function Re(e, t) {
	let n = E, r = {};
	for (let e in Ne) {
		let t = e.split(":")[0], n = e.split(":")[1], a = f[t](n), o = Ne[e];
		o.startsWith("data:") ? r[a.uri] = o : r[a.uri] = i(o, V);
	}
	if (!Le(e, t, r) && t.uri) {
		if (!n.fetcher) throw Error("kb has no fetcher");
		n.fetcher.nowOrWhenFetched(t.doc(), void 0, (n) => {
			n && Le(e, t, r);
		});
	}
}
function ze(e, t) {
	let n = e.createElement("img");
	if (n.style = C.iconStyle, n.setAttribute("src", V + (function(e) {
		if (!e.uri) return !1;
		let t = e.uri.split("/");
		return t.length === 3 || t.length === 4 && t[3] === "";
	}(t) ? "noun_15177.svg" : "noun_681601.svg")), t.uri && t.uri.startsWith("https:") && t.uri.indexOf("#") < 0) {
		let r = e.createElement("object");
		return r.setAttribute("data", Pe(t) + "favicon.ico"), r.setAttribute("type", "image/x-icon"), r.appendChild(n), r;
	}
	return Re(n, t), n;
}
function Be(e, t, n, r, i) {
	function a() {
		t.remove(), i();
	}
	function o() {
		a();
		let e = r();
		if (e && typeof e.then == "function") return e.then(i);
		i();
	}
	let s = e.createElement("div");
	s.style.cssText = C.confirmPopupStyle, s.style.position = "absolute", s.style.top = "-1em", s.style.display = "grid", s.style.gridTemplateColumns = "auto auto";
	let c = e.createElement("div");
	c.style.gridColumn = "1/2", c.style.gridRow = "1";
	let l = e.createElement("div");
	l.style.gridColumn = "1/2", l.style.gridRow = "2";
	let u = W(e, a);
	s.appendChild(u), u.style.gridColumn = "1", u.style.gridRow = "2";
	let d = s.appendChild(e.createElement("button"));
	d.style.cssText = C.buttonStyle, d.style.gridRow = "2", d.style.gridColumn = "2", d.textContent = "Cancel";
	let f = U(e, R.iconBase + "noun_925021.svg", "Delete it");
	s.appendChild(f), f.style.gridRow = "1", f.style.gridColumn = "1";
	let p = s.appendChild(e.createElement("button"));
	return p.style.cssText = C.buttonStyle, p.style.gridRow = "1", p.style.gridColumn = "2", p.textContent = n, s.appendChild(p), f.addEventListener("click", o), p.addEventListener("click", o), d.addEventListener("click", a), s;
}
function H(e, t, n, r, i) {
	function a() {
		let n = "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"])", a = [];
		if (i) for (let e = t; e; e = e.parentElement) {
			let t = Array.from(e.querySelectorAll(n));
			a.push({
				element: e,
				index: t.indexOf(s)
			});
		}
		function o() {
			if (!i) return;
			if (s.isConnected) {
				s.focus();
				return;
			}
			for (let e of a) {
				if (!e.element.isConnected) continue;
				let t = e.element.querySelectorAll(n);
				if (t.length) {
					t[Math.min(Math.max(e.index, 0), t.length - 1)].focus();
					return;
				}
			}
			let e = a.find((e) => e.element.isConnected);
			e && (e.element.tabIndex = -1, e.element.focus());
		}
		let l = e.createElement("div");
		i ? (i.querySelector(":scope > [data-delete-confirmation]")?.remove(), l.setAttribute("data-delete-confirmation", ""), l.setAttribute("role", "dialog"), l.setAttribute("aria-label", c), i.appendChild(l)) : (t.insertBefore(l, s), l.style.position = "relative");
		let u = Be(e, l, c, r, o);
		l.appendChild(u), i && (u.style.position = "static", u.style.top = "", Array.from(u.querySelectorAll("button")).find((e) => e.textContent === "Cancel")?.focus());
	}
	let o = V + "noun_2188_red.svg", s = e.createElement("img");
	s.setAttribute("src", o), s.tabIndex = 0, s.setAttribute("role", "button"), s.setAttribute("style", C.smallButtonStyle), s.style.float = "right";
	let c = "Remove this " + n;
	return s.title = c, s.setAttribute("aria-label", c), s.classList.add("hoverControlHide"), s.addEventListener("click", a), s.addEventListener("keydown", (e) => {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), s.click());
	}), t.classList.add("hoverControl"), t.appendChild(s), s.setAttribute("data-testid", "deleteButtonWithCheck"), s;
}
function U(e, t, n, r, i = {
	buttonColor: "Primary",
	needsBorder: !1
}) {
	let a = e.createElement("button");
	if (a.setAttribute("type", "button"), t) {
		let r = a.appendChild(e.createElement("img"));
		r.setAttribute("src", t), r.setAttribute("style", "width: 2em; height: 2em;"), r.title = n, a.setAttribute("style", C.buttonStyle);
	} else a.textContent = n.toLocaleUpperCase(), a.onmouseover = function() {
		i.buttonColor === "Secondary" ? i.needsBorder ? a.setAttribute("style", C.secondaryButtonNoBorderHover) : a.setAttribute("style", C.secondaryButtonHover) : i.needsBorder ? a.setAttribute("style", C.primaryButtonNoBorderHover) : a.setAttribute("style", C.primaryButtonHover);
	}, a.onmouseout = function() {
		i.buttonColor === "Secondary" ? i.needsBorder ? a.setAttribute("style", C.secondaryButtonNoBorder) : a.setAttribute("style", C.secondaryButton) : i.needsBorder ? a.setAttribute("style", C.primaryButtonNoBorder) : a.setAttribute("style", C.primaryButton);
	}, i.buttonColor === "Secondary" ? i.needsBorder ? a.setAttribute("style", C.secondaryButtonNoBorder) : a.setAttribute("style", C.secondaryButton) : i.needsBorder ? a.setAttribute("style", C.primaryButtonNoBorder) : a.setAttribute("style", C.primaryButton);
	return r && a.addEventListener("click", r, !1), a;
}
function W(e, t) {
	let n = U(e, xe, "Cancel", t);
	return n.firstChild && (n.firstChild.style.opacity = "0.3"), n;
}
function Ve(e, t) {
	return U(e, Se, "Continue", t);
}
function He(e, t, n, r, i, a) {
	return new Promise(function(t, o) {
		let s = e.createElement("div");
		r ||= f.foaf("name"), a ||= i ? w(i) : "  ";
		let c = a + " " + w(r) + ": ";
		s.appendChild(e.createElement("p")).textContent = c;
		let l = e.createElement("input");
		l.setAttribute("type", "text"), l.setAttribute("size", "100"), l.setAttribute("maxLength", "2048"), l.setAttribute("style", C.textInputStyle), l.select(), s.appendChild(l), n.appendChild(s);
		function u() {
			s.parentNode.removeChild(s), t(l.value.trim());
		}
		l.addEventListener("keyup", function(e) {
			e.keyCode === 13 && u();
		}, !1), s.appendChild(e.createElement("br")), s.appendChild(W(e, function(e) {
			s.parentNode.removeChild(s), t(null);
		})), s.appendChild(Ve(e, function(e) {
			u();
		})), l.focus();
	});
}
var Ue = We;
function We(e, t, n, r) {
	let i = e.createElement("tr");
	r ||= {};
	let a = i.appendChild(e.createElement("td")), o = i.appendChild(e.createElement("td")), s = i.appendChild(e.createElement("td")), c = r.image || ze(e, n);
	a.setAttribute("style", "vertical-align: middle; width:2.5em; padding:0.5em; height: 2.5em;"), o.setAttribute("style", "vertical-align: middle; text-align:left;"), s.setAttribute("style", "vertical-align: middle; width:2em; padding:0.5em; height: 4em;"), a.appendChild(c);
	let l = o.appendChild(e.createElement("div")), u = l.appendChild(e.createElement("span"));
	if (r.title ? u.textContent = r.title : je(u, n), typeof r.renderNameSuffix == "function") {
		let t = r.renderNameSuffix(n, e);
		if (t) {
			let n = l.appendChild(e.createElement("span"));
			n.setAttribute("style", "margin-left: 0.4em; opacity: 0.8;"), typeof t == "string" ? n.textContent = t : n.appendChild(t);
		}
	}
	if (typeof r.renderSupportingInfo == "function") {
		let t = r.renderSupportingInfo(n, e);
		if (t) {
			let n = o.appendChild(e.createElement("div"));
			n.setAttribute("style", "font-size: 90%; opacity: 0.8;"), typeof t == "string" ? n.textContent = t : n.appendChild(t);
		}
	}
	return r.deleteFunction && H(e, s, r.noun || "one", r.deleteFunction, r.confirmationContainer), n.uri && (r.link !== !1 && (s.appendChild(ye(e, n)).classList.add("HoverControlHide"), s.appendChild(e.createElement("br"))), r.draggable !== !1 && (c.setAttribute("draggable", "false"), re(i, n))), i.subject = n, i;
}
function Ge(e, t, n, r) {
	let i = t.appendChild(e.createElement("div"));
	n ? i.textContent = n : je(i, r);
}
function Ke(e, t, n, r) {
	let i = t.appendChild(e.createElement("div"));
	i.setAttribute("style", C.linkDivStyle), r.deleteFunction && H(e, i, r.noun || "one", r.deleteFunction, r.confirmationContainer), n.uri && (r.link !== !1 && be(e, i, n), re(t, n));
}
function qe(e, t, n) {
	let r = e.createElement("div");
	return r.setAttribute("style", C.renderAsDivStyle), n ||= {}, ve(e, r, n.image || ze(e, t)), Ge(e, r, n.title, t), Ke(e, r, t, n), n.clickable && n.onClickFunction && _e(r, n.onClickFunction), n.wrapInATR ? ge(e, r, t) : r;
}
function Je(e) {
	if (e.refresh) e.refresh();
	else for (let t = 0; t < e.children.length; t++) Je(e.children[t]);
}
function Ye(e, n, r, i = {}) {
	let a = /* @__PURE__ */ new Set(), s = !!(i.renderSupportingInfo || i.renderNameSuffix), c = i.refreshOnDocumentLoad ?? !0, l = function(e) {
		let r = b.updater;
		if (!r) throw Error("kb has no updater");
		return new Promise((i) => r.update(t(n, v, e, h), [], function(e, t, n, r) {
			t ? d() : we(void 0, "Error deleting one: " + n), i();
		}));
	};
	function u(t) {
		let n = t, r = { noun: y };
		if (r.renderSupportingInfo = i.renderSupportingInfo, r.renderNameSuffix = i.renderNameSuffix, r.confirmationContainer = i.confirmationContainer, s && c && t?.uri && b.fetcher) {
			let e = t.doc(), n = e?.uri ? b.fetcher.requested?.[e.uri] : void 0, r = n !== "done" && n !== "failed";
			e?.uri && r && !a.has(e.uri) && (a.add(e.uri), b.fetcher.nowOrWhenFetched(e, void 0, () => {
				a.delete(e.uri), d();
			}));
		}
		return g && (r.deleteFunction = function() {
			return l(n);
		}), Ue(e, v, t, r);
	}
	let d = function() {
		let e = b.each(n, v);
		e.sort(), S(T, e, u, s ? function(e, t) {
			return u(t);
		} : void 0);
	};
	function p(e) {
		let r = [];
		if (e.forEach(function(e) {
			let i = o(e);
			D("Dropped on attachemnt " + e), r.push(t(n, v, i, h));
		}), !b.updater) throw Error("kb has no updater");
		b.updater.update([], r, function(e, t, n, r) {
			t ? d() : we(void 0, "Error adding one: " + n);
		});
	}
	function m(e) {
		ie(b.fetcher, e, i.uploadFolder?.uri, i.uploadFolder?.uri, function(e, r) {
			let i = [t(n, v, b.sym(r), h)];
			if (!b.updater) throw Error("kb has no updater");
			b.updater.update([], i, function(e, t, n, r) {
				t ? d() : we(void 0, "Error adding link to uploaded file: " + n);
			});
		});
	}
	let h = i.doc || n.doc();
	i.modify === void 0 && (i.modify = !0);
	let g = i.modify, _ = i.promptIcon || V + "noun_748003.svg", v = i.predicate || f.wf("attachment"), y = i.noun || "attachment", b = E, x = r.appendChild(e.createElement("table"));
	x.setAttribute("style", "margin-top: 1em; margin-bottom: 1em;");
	let C = x.appendChild(e.createElement("tr")), w = C.appendChild(e.createElement("td")), T = C.appendChild(e.createElement("td")).appendChild(e.createElement("table"));
	if (T.appendChild(e.createElement("tr")), x.refresh = d, d(), g) {
		let t = U(e, _, "Drop attachments here");
		w.appendChild(t);
		let n = i.uploadFolder ? m : null;
		I(t, p, n);
		let r = t.querySelector("img");
		if (r && I(r, p, n), I(w, p, n), i.uploadFolder) {
			let t = ft(e, m);
			w.appendChild(t);
		}
	}
	return x;
}
function Xe(e) {
	e.preventDefault(), e.stopPropagation();
	let t = h(e).getAttribute("href");
	if (!t) return D("openHrefInOutlineMode: No href found!\n");
	let n = window.document;
	n.outlineManager ? n.outlineManager.GotoSubject(E.sym(t), !0, void 0, !0, void 0) : window && window.panes && window.panes.getOutliner ? window.panes.getOutliner().GotoSubject(E.sym(t), !0, void 0, !0, void 0) : D("ERROR: Can't access outline manager in this config");
}
function Ze(e) {
	if (e.uri === void 0) return;
	let t = e.uri;
	if (t.slice(0, 7) !== "http://") return;
	t = t.slice(7);
	let n = t.indexOf("#");
	if (n >= 0) t = t.slice(0, n);
	else {
		let e = t.lastIndexOf("/");
		if (e < 0) return;
		t = t.slice(0, e);
	}
	return E.sym("http://tabulator.org/wiki/annnotation/" + t);
}
function Qe() {
	let e = {};
	return E.statementsMatching(void 0, f.rdf("type"), void 0).forEach(function(t) {
		t.object.value && (e[t.object.value] = !0);
	}), E.statementsMatching(void 0, f.rdfs("subClassOf"), void 0).forEach(function(t) {
		t.object.value && (e[t.object.value] = !0), t.subject.value && (e[t.subject.value] = !0);
	}), E.each(void 0, f.rdf("type"), f.rdfs("Class")).forEach(function(t) {
		t.value && (e[t.value] = !0);
	}), e;
}
function $e(e) {
	let t = {}, n = {}, r = {}, i = 0, a = 0, o = 0, s = e.predicateIndex;
	for (let e in s) s[e][0].object.termType === "Literal" ? (n[e] = !0, a++) : (r[e] = !0, i++);
	let c = e.each(void 0, f.rdf("type"), f.rdf("Property"));
	for (let e = 0; e < c.length; e++) {
		let t = c[e].toNT();
		!r[t] && !n[t] && (n[t] = !0, r[t] = !0, o++);
	}
	return t.op = r, t.dp = n, x(`propertyTriage: ${i} non-lit, ${a} literal. ${o} unknown.`), t;
}
function et(e, t) {
	let n = e.createElement("button");
	return n.setAttribute("type", "button"), n.textContent = "Goto " + w(t), n.addEventListener("click", function(n) {
		e.outlineManager.GotoSubject(t, !0, void 0, !0, void 0);
	}, !0), n;
}
function tt(e, t) {
	let n = e.createElement("button");
	return n.setAttribute("type", "button"), n.textContent = "✕", n.addEventListener("click", function(e) {
		t.parentNode.removeChild(t);
	}, !0), n;
}
function nt(e, t, n, r, i, a, o, s, c) {
	return rt(e.createElement("div"), e, t, n, r, i, a, o, s, c);
}
function rt(e, t, n, r, i, a, o, s, c, l) {
	let u = "border: 0.1em solid #ddd; border-bottom: none; width: 95%; height: 2em; padding: 0.5em;", d = null;
	e.innerHTML = "";
	let f = function(e, o) {
		let f, p, m = function() {
			let e = a ? n.each(void 0, i, o) : n.each(o, i);
			_.setAttribute("class", e.length === 0 ? "hideTillHover" : ""), p.setAttribute("src", s.connectIcon || V + "noun_25830.svg"), p.setAttribute("title", e.length ? e.length : "attach");
		};
		f = G.twoLine.widgetForClass(r)(t, o), f.setAttribute("style", u);
		let h = t.createElement("div");
		h.setAttribute("class", "hideTillHover"), h.setAttribute("style", "float:right; width:10%");
		let g = t.createElement("a");
		g.setAttribute("href", o.uri), g.setAttribute("style", "float:right"), h.appendChild(g).textContent = ">", e.appendChild(h);
		let _ = t.createElement("div");
		return _.setAttribute("style", (a ? "float:left;" : "float:right;") + " width:30px;"), p = t.createElement("img"), m(), _.appendChild(p), e.appendChild(_), f.addEventListener("click", function(e) {
			d === f ? (f.setAttribute("style", u), d = null) : (d && d.setAttribute("style", u), f.setAttribute("style", u + "background-color: #ccc; color:black;"), d = f), c(o, e, d === f), m();
		}, !1), p.addEventListener("click", function(e) {
			l(o, e, a, m);
		}, !1), e.appendChild(f), e;
	};
	for (let n = 0; n < o.length; n++) {
		let r = t.createElement("div");
		e.appendChild(r), f(r, o[n]);
	}
	return e;
}
var G = {};
function it(e, t) {
	let n = e.createElement("div");
	return n.textContent = w(t), n;
}
function at(e) {
	let t = G.twoLine[e.uri], n = E;
	if (t) return t;
	let r = n.findSuperClassesNT(e);
	for (let e in r) if (t = G.twoLine[n.fromNT(e).uri], t) return t;
	return G.twoLine[""];
}
function ot(e, t) {
	let n = "", r = function(e) {
		let r = E.any(t, f.qu(e));
		return r || (n += "@@ No value for " + e + "! "), r ? v(r.value) : "?";
	}, i = e.createElement("table");
	return i.innerHTML = `
      <tr>
      <td colspan="2"> ${r("payee")}</td>
      < /tr>
      < tr >
      <td>${r("date").slice(0, 10)}</td>
      <td style = "text-align: right;">${r("amount")}</td>
      </tr>`, n && (i.innerHTML = `
      <tr>
        <td><a href="${v(t.uri)}">${v(n)}</a></td>
      </tr>`), i;
}
function st(e, t) {
	let n = function(e) {
		let n = E.any(t, e);
		return n ? v(n.value) : "?";
	}, r = e.createElement("table");
	return r.innerHTML = `
    <tr>
      <td colspan="2">${n(f.dc("title"))}</td>
    </tr>
    <tr style="color: #777">
      <td>${n(f.cal("dtstart"))}</td>
      <td>${n(f.cal("dtend"))}</td>
    </tr>`, r;
}
function ct(e, t) {
	let n = e.querySelectorAll("link");
	for (let e = 0; e < n.length; e++) if ((n[e].getAttribute("rel") || "") === "stylesheet" && (n[e].getAttribute("href") || "") === t) return;
	let r = e.createElement("link");
	r.setAttribute("rel", "stylesheet"), r.setAttribute("type", "text/css"), r.setAttribute("href", t), e.getElementsByTagName("head")[0].appendChild(r);
}
function lt(e) {
	return dt(e, "audio");
}
function ut(e) {
	return dt(e, "video");
}
function dt(e, t) {
	let r = {
		audio: "http://purl.org/dc/dcmitype/Sound",
		image: "http://purl.org/dc/dcmitype/Image",
		video: "http://purl.org/dc/dcmitype/MovingImage"
	}, i = t || "image", a = E.findTypeURIs(e), o = n(i + "/*").uri.split("*")[0];
	for (let e in a) if (e.startsWith(o)) return !0;
	return r[i] in a;
}
function ft(e, t) {
	let n = e.createElement("div"), r = n.appendChild(e.createElement("input"));
	return r.setAttribute("type", "file"), r.setAttribute("multiple", "true"), r.addEventListener("change", (e) => {
		D("File drop event: ", e), e.files ? t(e.files) : e.target && e.target.files ? t(e.target.files) : alert("Sorry no files .. internal error?");
	}, !1), r.style = "display:none", I(n.appendChild(U(e, V + "noun_Upload_76574_000000.svg", "Upload files", (e) => {
		r.click();
	})), null, t), n;
}
G = {
	line: {},
	twoLine: {
		"": it,
		"http://www.w3.org/2000/10/swap/pim/qif#Transaction": ot,
		"http://www.w3.org/ns/pim/trip#Trip": st,
		widgetForClass: at
	}
};
// src/widgets/forms/fieldParams.ts
var pt = {
	[f.ui("ColorField").uri]: {
		size: 9,
		type: "color",
		style: "height: 3em;",
		dt: "color",
		pattern: /^\s*#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]([0-9a-f][0-9a-f])?\s*$/
	},
	[f.ui("DateField").uri]: {
		size: 20,
		type: "date",
		dt: "date",
		pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?Z?\s*$/
	},
	[f.ui("DateTimeField").uri]: {
		size: 20,
		type: "datetime-local",
		dt: "dateTime",
		pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?(T[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?)?Z?\s*$/
	},
	[f.ui("TimeField").uri]: {
		size: 10,
		type: "time",
		dt: "time",
		pattern: /^\s*([0-2]?[0-9]:[0-5][0-9](:[0-5][0-9])?)\s*$/
	},
	[f.ui("IntegerField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "integer",
		pattern: /^\s*-?[0-9]+\s*$/
	},
	[f.ui("DecimalField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "decimal",
		pattern: /^\s*-?[0-9]*(\.[0-9]*)?\s*$/
	},
	[f.ui("FloatField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "float",
		pattern: /^\s*-?[0-9]*(\.[0-9]*)?((e|E)-?[0-9]*)?\s*$/
	},
	[f.ui("SingleLineTextField").uri]: {},
	[f.ui("NamedNodeURIField").uri]: { namedNode: !0 },
	[f.ui("TextField").uri]: {},
	[f.ui("PhoneField").uri]: {
		size: 20,
		uriPrefix: "tel:",
		pattern: /^\+?[\d-]+[\d]*$/
	},
	[f.ui("EmailField").uri]: {
		size: 30,
		uriPrefix: "mailto:",
		pattern: /^\s*.*@.*\..*\s*$/
	},
	[f.ui("Group").uri]: { style: C.formGroupStyle },
	[f.ui("Comment").uri]: {
		element: "p",
		style: C.commentStyle
	},
	[f.ui("Heading").uri]: {
		element: "h3",
		style: C.formHeadingStyle
	}
}, mt = d.store, K = {};
function ht(e) {
	let t = mt, n = t.findTypeURIs(e), r = t.bottomTypeURIs(n), i = [];
	for (let e in r) i.push(e);
	return i[0];
}
function q(e, t) {
	let n = ht(t), r = K[n];
	return _("paneUtils: Going to implement field " + t + " of type " + n), r || function(e, r) {
		let i = L(e, "No handler for field " + t + " of type " + n);
		return r && r.appendChild(i), i;
	};
}
// src/widgets/forms/formStyle.ts
var gt = "https://www.w3.org/ns/css#";
function _t(e, t) {
	let n = pt[ht(t)] || {}, r = E.any(t, f.ui("style"));
	r ? r.termType === "Literal" ? r && e.setAttribute("style", r.value) : E.statementsMatching(r, null, null, t.doc()).forEach((t) => {
		if (t.predicate.uri && t.predicate.uri.startsWith(gt)) {
			let n = t.predicate.uri.slice(26);
			try {
				e.style[n] = t.object.value;
			} catch {
				console.warn(`setFieldStyle: Error setting element style ${n} to "${t.object.value}"`), console.warn(`setFieldStyle:   ... Element tagName was "${e.tagName || "???"}"`);
			}
		}
	}) : n.style && e.setAttribute("style", n.style);
}
// src/widgets/forms/basic.ts
var J = d.store;
function vt(e, t, n, r, i) {
	n.style.display = "flex", n.style.flexDirection = "row";
	let a = n.appendChild(e.createElement("div"));
	a.style.width = y.formFieldNameBoxWidth;
	let o = n.appendChild(e.createElement("div"));
	return a.setAttribute("class", "formFieldName"), a.setAttribute("style", C.formFieldNameBoxStyle), o.setAttribute("class", "formFieldValue"), i ? a.appendChild(e.createTextNode(i)) : t.any(r, f.ui("property")) ? a.appendChild(yt(e, t.any(r, f.ui("property")), r)) : (o.appendChild(L(e, "No property or label given for form field: " + r)), a.appendChild(e.createTextNode("???"))), o;
}
function yt(e, t, n) {
	let r = J.any(n, f.ui("label"));
	if (r ||= w(t, !0), t === void 0) return e.createTextNode("@@Internal error: undefined property");
	let i = e.createElement("a");
	return t.uri && i.setAttribute("href", t.uri), i.setAttribute("style", "color: #3B5998; text-decoration: none;"), i.textContent = r, i;
}
function bt(e, t, n) {
	let r = J.statementsMatching(e, t);
	if (r.length === 0) return n;
	if (!J.updater) throw Error("Store has no updater");
	return r.length > 0 && r[0].why.value && J.updater.editable(r[0].why.value, J) ? J.sym(r[0].why.value) : n;
}
function Y(n, r, i, a, o, s, c) {
	let l = J, u = o.doc ? o.doc() : null, d = n.createElement("div"), p = l.any(o, f.ui("property"));
	if (r && r.appendChild(d), !p) return d.appendChild(L(n, "Error: No property given for text field: " + o));
	let m = vt(n, l, d, o), h = l.anyJS(o, f.ui("suppressEmptyUneditable"), null, u), g = pt[ht(o)];
	g === void 0 && (g = { style: "" });
	let _ = g.style || "", v = C.textInputStyle + _, b = n.createElement("input");
	b.style = v, m.appendChild(b), b.setAttribute("type", g.type ? g.type : "text");
	let x = (b.getAttribute("type") || "").toLowerCase(), S = x === "date" || x === "datetime-local", w = l.anyJS(o, f.ui("size")) || y.textInputSize || 20;
	b.setAttribute("size", w);
	let T = l.any(o, f.ui("maxLength"));
	b.setAttribute("maxLength", T ? "" + T : y.basicMaxLength), s ||= bt(a, p, s);
	let E = l.any(a, p, void 0, s);
	if (E ||= l.any(o, f.ui("default")), E && E.value && g.uriPrefix ? b.value = decodeURIComponent(E.value.replace(g.uriPrefix, "")).replace(/ /g, "") : E && 
	/* istanbul ignore next */
	(b.value = E.value || E.value || ""), b.setAttribute("style", v), !l.updater) throw Error("kb has no updater");
	return l.updater.editable(s.uri) ? (b.addEventListener("keyup", function(e) {
		g.pattern && b.setAttribute("style", v + (b.value.match(g.pattern) ? "color: green;" : "color: red;"));
	}, !0), b.addEventListener("change", function(r) {
		if (S && n.activeElement === b) {
			b.dataset && (b.dataset.deferredChange = "true");
			return;
		}
		if (g.pattern && !b.value.match(g.pattern)) return;
		let i = !S;
		i && (b.disabled = !0), b.setAttribute("style", v + "color: gray;");
		let o = l.statementsMatching(a, p), u;
		g.namedNode ? u = l.sym(b.value) : g.uriPrefix ? (u = encodeURIComponent(b.value.replace(/ /g, "")), u = l.sym(g.uriPrefix + b.value)) : u = g.dt ? new e(b.value.trim(), void 0, f.xsd(g.dt)) : new e(b.value);
		let m = o.map((e) => t(e.subject, e.predicate, u, e.why));
		m.length === 0 && (m = [t(a, p, u, s)]);
		function h(e, t, n) {
			let r = [];
			/* istanbul ignore next */
			if (t.forEach((e) => {
				r.includes(e.why.uri) || r.push(e.why.uri);
			}), e.forEach((e) => {
				/* istanbul ignore next */
				r.includes(e.why.uri) || r.push(e.why.uri);
			}), r.length === 0) throw Error("updateMany has no docs to patch");
			if (!l.updater) throw Error("kb has no updater");
			if (r.length === 1) return l.updater.update(e, t, n);
			let i = r.pop(), a = t.filter((e) => e.why.uri === i), o = t.filter((e) => e.why.uri !== i), s = e.filter((e) => e.why.uri === i), c = e.filter((e) => e.why.uri !== i);
			l.updater.update(s, a, function(e, t, r) {
				t ? h(c, o, n) : n(e, t, r);
			});
		}
		h(o, m, function(e, t, r) {
			t ? (i && (b.disabled = !1), b.setAttribute("style", v)) : d.appendChild(L(n, r)), c(t, r);
		});
	}, !0), b.addEventListener("blur", function(e) {
		if (S && b.dataset && b.dataset.deferredChange === "true") {
			delete b.dataset.deferredChange;
			let e = new Event("change", { bubbles: !0 });
			b.dispatchEvent(e);
		}
	}, !0), d) : (b.readOnly = !0, b.style = C.textInputStyleUneditable + _, h && b.value === "" && (d.style.display = "none"), d);
}
// src/widgets/forms/autocomplete/language.ts
var xt = /* @__PURE__ */ c({
	addDefaults: () => Ct,
	defaultPreferredLanguages: () => X,
	filterByLanguage: () => Et,
	getPreferredLanguages: () => Tt,
	getPreferredLanguagesFor: () => wt,
	languageCodeURIBase: () => St
}), St = "https://www.w3.org/ns/iana/language-code/", X = [
	"en",
	"fr",
	"de",
	"it",
	"ar"
];
function Ct(e) {
	return e ||= [], e.concat(X.filter((t) => !e.includes(t)));
}
async function wt(e) {
	let t = e.doc();
	await E.fetcher?.load(t);
	let n = E.any(e, f.schema("knowsLanguage"), null, t);
	if (!n) return X;
	let r = [];
	return n.elements.forEach((e) => {
		let n = E.any(e, f.solid("publicId"), null, t);
		if (!n) {
			console.warn("getPreferredLanguages: No publiID of language.");
			return;
		}
		if (!n.value.startsWith("https://www.w3.org/ns/iana/language-code/")) {
			console.error(`What should be a language code ${n.value} does not start with ${St}`);
			return;
		}
		let i = n.value.slice(41);
		r.push(i);
	}), r.length > 0 ? (console.log(`     User knows languages with codes: "${r.join(",")}"`), Ct(r)) : null;
}
async function Tt() {
	let e = await T.currentUser();
	if (e) {
		let t = await wt(e);
		if (t) return t;
	}
	if (typeof navigator < "u") {
		if (navigator.languages) return Ct(navigator.languages.map((e) => e.split("-")[0]));
		if (navigator.language) return Ct([navigator.language.split("-")[0]]);
	}
	return X;
}
function Et(e, t) {
	let n = {};
	e.forEach((e) => {
		let t = e.subject.value;
		n[t] = n[t] || [], n[t].push(e);
	});
	let r = t || X;
	r.reverse();
	let i = [];
	for (let e in n) {
		let t = n[e].map((e) => {
			let t = e.name["xml:lang"];
			return [r.indexOf(t), e];
		});
		t.sort(), t.reverse(), i.push(t[0][1]);
	}
	return D(` Filter by language: ${e.length} -> ${i.length}`), i;
}
// src/widgets/forms/autocomplete/publicData.ts
var Dt = /* @__PURE__ */ c({
	AUTOCOMPLETE_LIMIT: () => 200,
	ESCOResultToBindings: () => Vt,
	bindingToTerm: () => zt,
	dbPediaTypeMap: () => Pt,
	dbpediaParameters: () => Nt,
	escoParameters: () => Mt,
	fetcherOptionsJsonPublicData: () => jt,
	getDbpediaDetails: () => Zt,
	getWikidataDetails: () => Jt,
	getWikidataDetailsOld: () => Yt,
	getWikidataLocation: () => Xt,
	instituteDetailsWikidataQuery: () => At,
	loadFromBindings: () => Bt,
	loadPublicDataThing: () => qt,
	queryESCODataByName: () => Ht,
	queryPublicDataByName: () => Wt,
	queryPublicDataConstruct: () => Kt,
	queryPublicDataSelect: () => Gt,
	variableNameToPredicateMap: () => Rt,
	wikidataClasses: () => kt,
	wikidataIncomingClassMap: () => Lt,
	wikidataOutgoingClassMap: () => Ft,
	wikidataParameters: () => It
}), Ot = /\$\(subject\)/g, kt = {
	Corporation: "http://www.wikidata.org/entity/Q6881511",
	EducationalOrganization: "http://www.wikidata.org/entity/Q178706",
	GovernmentOrganization: "http://www.wikidata.org/entity/Q327333",
	MedicalOrganization: "http://www.wikidata.org/entity/Q4287745",
	MusicGroup: "http://www.wikidata.org/entity/Q32178211",
	NGO: "http://www.wikidata.org/entity/Q163740",
	Occupation: "http://www.wikidata.org/entity/Q28640",
	Project: "http://www.wikidata.org/entity/Q170584",
	ResearchOrganization: "http://www.wikidata.org/entity/Q31855",
	SportsOrganization: "http://www.wikidata.org/entity/Q4438121"
}, At = "prefix vcard: <http://www.w3.org/2006/vcard/ns#>\nCONSTRUCT\n{  wd:Q49108 vcard:fn ?itemLabel.\nwd:Q49108 rdf:type ?klass. ?klass rdfs:label ?klassLabel; rdfs:comment ?klassDescription .\nwd:Q49108 schema:logo ?logo;\n   schema:image ?image;\n   schema:logo  ?sealImage;\n   schema:subOrganization  ?subsidiary .\n      ?subsidiary rdfs:label ?subsidiaryLabel .\n ?supersidiary schema:subOrganization wd:Q49108 .\n      ?supersidiary rdfs:label ?supersidiaryLabel .\n  wd:Q49108 schema:location ?location .\n     ?location  schema:elevation  ?elevation .\n     ?location  wdt:P131  ?region .  ?region rdfs:label ?regionLabel .\n     ?location wdt:P625 ?coordinates .\n     ?location  schema:country  ?country . ?country rdfs:label ?countryLabel .\n}\nWHERE\n{  optional {wd:Q49108 rdfs:label ?itemLabel} .\n  optional {wd:Q49108 wdt:P154 ?logo .}\n  optional {wd:Q49108 wdt:P31 ?klass .}\n  optional {wd:Q49108 wdt:P158  ?sealImage .}\n  optional {wd:Q49108 wdt:P18 ?image .}\n\n  optional { wd:Q49108       wdt:P355 ?subsidiary . }\n  optional { ?supersidiary   wdt:P355 wd:Q49108. }\n\n  optional { wd:Q49108 wdt:P276 ?location .\n\n    optional { ?location  schema:eleveation  ?elevation }\n    optional { ?location  wdt:P131  ?region }\n    optional { ?location wdt:P625 ?coordinates }\n    optional {  ?location  wdt:P17  ?country }\n  }\n  SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\". }\n}", jt = {
	credentials: "omit",
	headers: new Headers({ Accept: "application/json" })
}, Mt = {
	label: "ESCO",
	logo: E.sym("https://ec.europa.eu/esco/portal/static_resource2/images/logo/logo_en.gif"),
	searchByNameURI: "https://ec.europa.eu/esco/api/search?language=$(language)&type=occupation&text=$(name)"
}, Nt = {
	label: "DBPedia",
	logo: E.sym("https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/DBpediaLogo.svg/263px-DBpediaLogo.svg.png"),
	searchByNameQuery: "select distinct ?subject, ?name where {\n    ?subject a $(targetClass); rdfs:label ?name\n    FILTER regex(?name, \"$(name)\", \"i\")\n  } LIMIT $(limit)",
	endpoint: "https://dbpedia.org/sparql/"
}, Pt = { AcademicInsitution: "http://umbel.org/umbel/rc/EducationalOrganization" }, Ft = {
	AcademicInsitution: "http://www.wikidata.org/entity/Q4671277",
	Enterprise: "http://www.wikidata.org/entity/Q6881511",
	Business: "http://www.wikidata.org/entity/Q4830453",
	NGO: "http://www.wikidata.org/entity/Q79913",
	CharitableOrganization: "http://www.wikidata.org/entity/Q708676",
	Insitute: "http://www.wikidata.org/entity/Q1664720"
}, It = {
	label: "WikiData",
	limit: 3e3,
	logo: E.sym("https://www.wikimedia.org/static/images/project-logos/wikidatawiki.png"),
	endpoint: "https://query.wikidata.org/sparql",
	searchByNameQuery: "SELECT ?subject ?name\n  WHERE {\n    ?klass wdt:P279* $(targetClass) .\n    ?subject wdt:P31 ?klass .\n    ?subject rdfs:label ?name.\n    FILTER regex(?name, \"$(name)\", \"i\")\n  } LIMIT $(limit) ",
	insitituteDetailsQuery: "CONSTRUCT\n{  wd:Q49108 schema:name ?itemLabel;\n             schema:logo ?logo;\n              schema:logo  ?sealImage;\n             schema:subOrganization  ?subsidiary .\n                 ?subsidiary schema:name ?subsidiaryLabel .\n}\nWHERE\n{\n   wd:Q49108 # rdfs:label ?itemLabel ;\n             wdt:P154 ?logo;\n              wdt:P158  ?sealImage ;\n             wdt:P355  ?subsidiary .\n          #  ?subsidiary rdfs:label ?subsidiaryLabel .\n\n  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE], fr\". }\n}"
}, Lt = {
	"http://www.wikidata.org/entity/Q15936437": f.schema("CollegeOrUniversity"),
	"http://www.wikidata.org/entity/Q1664720": f.schema("EducationalOrganization"),
	"http://www.wikidata.org/entity/Q43229": f.schema("Organization"),
	"http://www.wikidata.org/entity/Q3918": f.schema("CollegeOrUniversity"),
	"http://www.wikidata.org/entity/Q170584": f.schema("Project"),
	"http://www.wikidata.org/entity/Q327333": f.schema("GovernmentOrganization"),
	"http://www.wikidata.org/entity/Q2221906": f.schema("Place"),
	"http://www.wikidata.org/entity/Q167037": f.schema("Corporation")
}, Rt = {
	targetClass: f.rdf("type"),
	sealImage: f.schema("logo"),
	shortName: f.foaf("nick"),
	subsidiary: f.schema("subOrganization"),
	city: f.vcard("locality"),
	state: f.vcard("region"),
	country: f.vcard("country-name"),
	homepage: f.foaf("homepage"),
	lat: f.schema("latitude"),
	long: f.schema("longitude")
};
function zt(t) {
	let n = t.type.toLowerCase();
	if (n === "uri" || n === "iri") return E.sym(t.value);
	if (n === "literal") return t["xml:lang"] ? new e(t.value, t["xml:lang"]) : new e(t.value);
	throw Error(`bindingToTerm: Unexpected type "${t.type}" in sparql binding}`);
}
function Bt(t, n, r, i, a = Rt) {
	let o = {};
	D(`loadFromBindings:  subject: ${n}`), D(`                       doc: ${i}`), r.forEach((e) => {
		for (let t in e) {
			let n = e[t], r = JSON.stringify(n);
			o[t] = o[t] || /* @__PURE__ */ new Set(), o[t].add(r);
		}
	});
	for (let r in o) {
		let s = o[r];
		D(`    results ${r} -> ${s}`), s.forEach((o) => {
			let s = JSON.parse(o), { type: c, value: l } = s, u;
			if (c === "uri") u = t.sym(l);
			else if (c === "literal") u = new e(l, s.language, s.datatype);
			else throw Error(`loadFromBindings:  unexpected type: ${c}`);
			if (r === "type") Lt[l] ? u = Lt[l] : O("Unmapped Wikidata Class: " + l);
			else if (r === "coordinates") {
				D("         @@@ hey a point: " + l);
				let r = /.*\(([-0-9.-]*) ([-0-9.-]*)\)/.exec(l);
				if (r) {
					let a = f.xsd("float"), o = new e(r[1], null, a), s = new e(r[2], null, a);
					t.add(n, f.schema("longitude"), s, i), t.add(n, f.schema("latitude"), o, i);
				} else D("Bad coordinates syntax: " + l);
			} else {
				let e = a[r] || f.schema(r);
				t.add(n, e, u, i), D(`  public data ${e} ${u}.`);
			}
		});
	}
}
function Vt(e) {
	return e._embedded.results.map((e) => {
		let t = e.title, n = e.uri;
		return {
			name: {
				value: t,
				type: "literal"
			},
			subject: {
				type: "IRI",
				value: n
			}
		};
	});
}
async function Ht(e, t, n) {
	if (!n.searchByNameURI) throw Error("Missing queryTarget.searchByNameURI on queryESCODataByName");
	let r = n.limit || 200, i = n.searchByNameURI.replace("$(name)", e).replace("$(limit)", "" + r).replace("$(targetClass)", t.toNT());
	D("Querying ESCO data - uri: " + i);
	let a = (await E.fetcher?.webOperation("GET", i, jt))?.responseText || "";
	if (D("    Query result  text" + a.slice(0, 500) + "..."), a.length === 0) throw Error("Wot no text back from ESCO query " + i);
	let o = JSON.parse(a);
	return D("    ESCO Query result JSON" + JSON.stringify(o, null, 4).slice(0, 500) + "..."), Vt(o);
}
function Ut(e) {
	let t = e.indexOf("SPARQL-QUERY");
	if (t < 0) return e;
	O("  ### Fixing JSON with wikidata error code injection " + e.slice(t, t + 200));
	let n = e.lastIndexOf("}, {");
	return e.slice(0, n) + " } ] } } ";
}
async function Wt(e, t, n, r) {
	function i(n) {
		let i = r.limit || 200;
		return n.replace("$(name)", e).replace("$(limit)", "" + i).replace("$(language)", a).replace("$(targetClass)", t.toNT());
	}
	if (!t) throw Error("queryPublicDataByName: No class provided");
	let a = (await Tt() || X)[0] || "en";
	if (r.searchByNameQuery) {
		let e = i(r.searchByNameQuery);
		return D("Querying public data - sparql: " + e), Gt(e, r);
	}
	if (r.searchByNameURI) {
		let e = i(r.searchByNameURI), t;
		try {
			t = await E.fetcher?.webOperation("GET", e, jt);
		} catch (t) {
			throw Error(`Exception when trying to fetch ${e} \n ${t}`);
		}
		let n = t.responseText || "";
		if (t.status !== 200) throw Error(`HTTP error status ${t.status} trying to fetch ${e} `);
		if (D("    Query result  text" + n.slice(0, 500) + "..."), n.length === 0) throw Error("queryPublicDataByName: No text back from public data query " + e);
		let a = Ut(n), o = JSON.parse(a);
		if (D("    API Query result JSON" + JSON.stringify(o, null, 4).slice(0, 500) + "..."), o._embedded) return D("      Looks like ESCO"), Vt(o);
		throw alert("Code me: unrecognized API return format"), Error(`*** Need to add code to parse unrecognized API JSON return\n${JSON.stringify(o, null, 4)}`);
	}
	throw Error("Query source must have either rest API or SPARQL endpoint.");
}
async function Gt(e, t) {
	if (!t.endpoint) throw Error("Missing queryTarget.endpoint required for queryPublicDataSelect");
	let n = new URL(t.endpoint);
	n.searchParams.append("query", e);
	let r = n.href;
	D(" queryPublicDataSelect uri: " + r);
	let i = new Headers();
	i.append("Accept", "application/json");
	let a = {
		credentials: "omit",
		headers: i
	}, o = (await E.fetcher?.webOperation("GET", r, a))?.responseText || "";
	if (o.length === 0) throw Error("No text back from query " + r);
	let s = Ut(o), c = JSON.parse(s);
	return D("    Query result JSON" + JSON.stringify(c, null, 4).slice(0, 100) + "..."), c.results.bindings;
}
async function Kt(e, t, n) {
	if (D("queryPublicDataConstruct: sparql:", e), !n.endpoint) throw Error("Missing queryTarget.endpoint required for queryPublicDataConstruct");
	let r = new URL(n.endpoint);
	r.searchParams.append("query", e);
	let i = r.href;
	D(" queryPublicDataConstruct uri: " + i);
	let a = new Headers();
	a.append("Accept", "text/turtle");
	let o = {
		credentials: "omit",
		headers: a
	}, s = (await E.fetcher?.webOperation("GET", i, o))?.responseText || "No response text?";
	if (D("    queryPublicDataConstruct result text:" + (s.length > 500 ? s.slice(0, 200) + " ... " + s.slice(-200) : s)), s.length === 0) throw Error("queryPublicDataConstruct: No text back from construct query:" + i);
	l(s, E, t.uri, "text/turtle");
}
async function qt(e, t, n) {
	if (n.uri.startsWith("https://dbpedia.org/resource/")) return Zt(e, t, n);
	if (n.uri.match(/^https?:\/\/www\.wikidata\.org\/entity\/.*/)) await Jt(e, t, n);
	else {
		let t = n.uri.startsWith("http:") ? e.sym("https:" + n.uri.slice(5)) : n, r = new Headers();
		return r.append("Accept", "text/turtle"), e.fetcher.load(t, {
			credentials: "omit",
			headers: r
		});
	}
}
async function Jt(e, t, n) {
	await Kt(At.replace(/wd:Q49108/g, n.toNT()), n, It), D("getWikidataDetails: loaded.", n);
}
async function Yt(e, t, n) {
	Bt(e, n, await Gt("select distinct *  where {\n  optional { $(subject)  wdt:P31  ?targetClass } # instance of\n  optional { $(subject)  wdt:P154  ?logo }\n  optional { $(subject)  wdt:P158  ?sealImage }\n# optional { $(subject)  wdt:P159  ?headquartersLocation }\n\noptional { $(subject)  wdt:P17  ?country }\noptional { $(subject)  wdt:P18  ?image }\noptional { $(subject)  wdt:P1813  ?shortName }\n\noptional { $(subject)  wdt:P355  ?subsidiary }\n# SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\" }\n}".replace(Ot, n.toNT()), It), n.doc());
}
async function Xt(e, t, n) {
	let r = "select distinct *  where {\n\n  $(subject) wdt:P276 ?location .\n\n  optional { ?location  wdt:P2044  ?elevation }\n  optional { ?location  wdt:P131  ?region }\n  optional { ?location wdt:P625 ?coordinates }\noptional {  ?location  wdt:P17  ?country }\n\n# SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\" }\n}".replace(Ot, n.toNT());
	D(" location query sparql:" + r);
	let i = await Gt(r, It);
	D(" location query bindings:", i), Bt(e, n, i, n.doc());
}
async function Zt(e, t, n) {
	Bt(e, n, await Gt(`select distinct ?city, ?state, ?country, ?homepage, ?logo, ?lat, ?long,  WHERE {
    OPTIONAL { <${n}> <http://dbpedia.org/ontology/city> ?city }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/state> ?state }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/country> ?country }
    OPTIONAL { ${n} foaf:homepage ?homepage }
    OPTIONAL { ${n} foaf:lat ?lat; foaf:long ?long }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/country> ?country }
   }`, Nt), n.doc()), D("Finished getDbpediaDetails.");
}
// src/widgets/forms/autocomplete/autocompletePicker.ts
var Qt = 4, $t = 20, en = 40;
function Z(e, t) {
	e.style.display = t ? "" : "none";
}
async function tn(e, t, n, r) {
	function i(t) {
		let n = A.appendChild(e.createElement("tr"));
		D(t);
		let r = Error(t);
		n.appendChild(L(e, r, "pink")), C.setStyle(n, "autocompleteRowStyle"), n.style.padding = "1em";
	}
	function a(e, n) {
		D("Auto complete: finish! " + e), e.termType === "Literal" && t.queryParams.objectURIBase && (e = E.sym(t.queryParams.objectURIBase.value + e.value)), u(), r(e, n);
	}
	async function o(e, t) {
		n.acceptButton ? (n.acceptButton.disbaled = !1, Z(n.acceptButton, !0), M.value = t.value, O = t, k = e, D("Auto complete: name: " + t), D("Auto complete: waiting for accept " + e), u()) : (Z(n.cancelButton, !0), a(e, t));
	}
	async function s(e) {
		O && M.value === O.value && a(k, O);
	}
	async function c(e) {
		D("Auto complete: Canceled by user! "), t.permanent ? h() : T.parentNode && T.parentNode.removeChild(T);
	}
	function l(e, t) {
		let n = e.split(" ");
		for (let e = 0; e < n.length; e++) {
			let r = n[e];
			if (t.toLowerCase().indexOf(r) < 0) return !1;
		}
		return !0;
	}
	function u() {
		for (; A.children.length > 1;) A.removeChild(A.lastChild);
	}
	async function d(e) {
		Z(n.cancelButton, !0), m();
	}
	async function f(e, n) {
		let r;
		try {
			r = await Wt(e, g, n || X, t.queryParams);
		} catch (e) {
			i("Error querying db of organizations: " + e), b = !1;
			return;
		}
		return v = r.length < 200, S = v ? e : void 0, u(), Et(r, n) || [];
	}
	function p(e, t) {
		return (t || []).filter((t) => l(e, t.name.value));
	}
	async function m() {
		function t(t) {
			let n = e.createElement("tr");
			C.setStyle(n, "autocompleteRowStyle"), n.setAttribute("style", "padding: 0.3em;"), n.style.color = x ? "#080" : "#088", n.textContent = t.name.value;
			let r = zt(t.subject), i = zt(t.name);
			return n.addEventListener("click", async (e) => {
				D("       click row textContent: " + n.textContent), D("       click name: " + i.value), r && i && o(r, i);
			}), n;
		}
		function n(e, t) {
			return t.name.value > e.name.value ? 1 : t.name.name < e.name.value ? -1 : 0;
		}
		if (b) {
			D(`Ignoring "${M.value}" because of lock `);
			return;
		}
		D(`Setting lock at "${M.value}"`), b = !0;
		let r = await Tt(), i = M.value.trim().toLowerCase();
		if (i.length < Qt) u(), w = $t;
		else {
			x && S && i.startsWith(S) || (D(`   Querying database at "${i}" cf last "${S}".`), _ = await f(i, r) || []);
			let e = p(i, _);
			v && e.length <= en && (w = e.length), x = v && e.length <= w, D(` Filter:"${i}" lastBindings: ${_.length}, slimmed to ${e.length}; rows: ${w}, Enough? ${v}, All displayed? ${x}`);
			let a = e.slice(0, w);
			a.sort(n), u();
			for (let e of a) A.appendChild(t(e));
			e.length === 1 && o(zt(e[0].subject), zt(e[0].name));
		}
		b = !1;
	}
	function h() {
		t.currentObject ? (M.value = t.currentName ? t.currentName.value : "??? wot no name for " + t.currentObject, O = t.currentName, S = t.currentName ? t.currentName.value : void 0, k = t.currentObject) : (M.value = "", S = void 0, k = void 0), n.deleteButton && Z(n.deleteButton, !!t.currentObject), n.acceptButton && Z(n.acceptButton, !1), n.editButton && Z(n.editButton, !0), n.cancelButton && Z(n.cancelButton, !1), b = !1, u();
	}
	let g = t.targetClass;
	if (!g) throw Error("renderAutoComplete: missing targetClass");
	n.acceptButton && n.acceptButton.addEventListener("click", s, !1), n.cancelButton && n.cancelButton.addEventListener("click", c, !1);
	let _, v = !1, b = !1, x = !1, S, w = $t, T = e.createElement("div"), O, k, A = T.appendChild(e.createElement("table"));
	A.setAttribute("data-testid", "autocomplete-table"), A.setAttribute("style", "max-width: 30em; margin: 0.5em;");
	let j = A.appendChild(e.createElement("tr"));
	C.setStyle(j, "autocompleteRowStyle");
	let M = j.appendChild(e.createElement("td")).appendChild(e.createElement("input"));
	M.setAttribute("type", "text"), h();
	let N = t.size || y.textInputSize || 20;
	M.setAttribute("size", N), M.setAttribute("data-testid", "autocomplete-input");
	let P = C.textInputStyle || "border: 0.1em solid #444; border-radius: 0.5em; width: 100%; font-size: 100%; padding: 0.1em 0.6em";
	return M.setAttribute("style", P), M.addEventListener("keyup", function(e) {
		e.keyCode === 13 && s(e);
	}, !1), M.addEventListener("input", d), T;
}
// src/widgets/forms/autocomplete/autocompleteBar.ts
var nn = "Solid ID", rn = R.iconBase + "noun_34653_green.svg", an = R.iconBase + "noun_Search_875351.svg", on = R.iconBase + "noun_253504.svg";
async function sn(e, t, n, r, i, a) {
	async function o(e, t) {
		return r.permanent ? (Z(_, !0), Z(p, !1), Z(m, !1)) : c(), i(e, t);
	}
	async function s(n) {
		let r = await He(e, E, S, f.vcard("url"), void 0, nn);
		if (r) return i(t, r);
	}
	function c() {
		x &&= (S.removeChild(x), void 0);
	}
	async function l() {
		x = e.createElement("div"), x.setAttribute("style", "display: flex; flex-flow: wrap;"), x.appendChild(await tn(e, r, b, o)), x.appendChild(p), x.appendChild(m), x.appendChild(_), x.appendChild(h), S.appendChild(x);
	}
	async function u(e) {
		x ? (S.removeChild(x), x = void 0) : await l();
	}
	async function d(e) {
		for (let n of e) await i(t, n);
	}
	let p = Ve(e);
	p.setAttribute("data-testid", "accept-button");
	let m = W(e);
	m.setAttribute("data-testid", "cancel-button");
	let h = e.createElement("div"), g = H(e, h, r.targetClass ? w(r.targetClass) : "item", a);
	g.setAttribute("data-testid", "delete-button");
	let _ = U(e, on, "Edit", (e) => {
		v = !v, y();
	});
	_.setAttribute("data-testid", "edit-button");
	let v = !0;
	function y() {
		v ? (Z(_, !1), Z(p, !1), Z(m, !1)) : (Z(_, !0), Z(p, !1), Z(m, !1));
	}
	let b = {
		acceptButton: p,
		cancelButton: m,
		editButton: _,
		deleteButton: g
	}, x, S = e.createElement("div");
	return S.style.display = "flex", S.style.flexDirection = "row", (r.permanent || r.currentObject) && await l(), n.editable && (S.style.width = "100%", n.manualURIEntry && I(S.appendChild(U(e, rn, n.idNoun, s)), d, void 0), n.dbLookup && !r.currentObject && !r.permanent && S.appendChild(U(e, an, n.idNoun, u))), y(), S;
}
// src/lib/style_multiSelect.js
var Q = {
	multiselect__container: "\n        -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n        background-color: #fff;\n        border-radius: 2px;\n        -webkit-box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;\n                box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;\n        -webkit-box-sizing: border-box;\n                box-sizing: border-box;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        min-height: 36px;\n        padding: 4px 8px 0 8px;\n        position: relative;\n        width: 354px;\n        margin-bottom: 5px;\n        font-size: 100%\n    ",
	multiselect__wrapper: "\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n        height: 100%;\n        width: 100%;\n    ",
	multiselect__clear_btn: "\n        cursor: pointer;\n        align-items: center;\n        margin-bottom: 4px;\n        margin-left: 4px;\n    ",
	multiselect__options: "\n        background-color: #f6f6f6;\n        border-radius: 2px;\n        left: 0;\n        max-height: 0;\n        overflow: hidden;\n        position: absolute;\n        top: calc(100% + 3px);\n        z-index: 9999;\n        width: 100%;\n        opacity: 0;\n        transition: max-height 0.1s ease;\n    ",
	multiselect__options_visible: "\n        background-color: #f6f6f6;\n        border-radius: 2px;\n        left: 0;\n        max-height: 0;\n        overflow: hidden;\n        position: absolute;\n        top: calc(100% + 3px);\n        z-index: 9999;\n        width: 100%;\n        opacity: 0;\n        transition: max-height 0.1s ease;\n        max-height: 200px;\n        -webkit-box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;\n        box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;\n        opacity: 1;\n        transition: max-height 0.2s ease;\n    ",
	multiselect__options_ul: "\n        list-style: none;\n        margin: 0;\n        padding: 2px 0;\n        max-height: 200px;\n        overflow: auto;\n    ",
	multiselect__options_ul_li: "\n        cursor: pointer;\n        padding: 4px 8px;\n    ",
	multiselect__options_ul_li_hover: "\n        background-color: #dedede;\n    ",
	multiselect__options_ul_p_multiselect__options_no_results: "\n        margin: 0;\n        padding: 8px;\n        text-align: center;\n    ",
	multiselect__options_ul_p_multiselect__options_no_data: "\n        margin: 0;\n        padding: 8px;\n        text-align: center;\n    ",
	multiselect__options_ul_li_multiselect__options_selected: "\n        background-color: #656565;\n        color: #fff;\n    ",
	multiselect__options_ul_li_multiselect__options_selected_hover: "\n    background-color: #656565;\n    ",
	multiselect__options_ul_li_arrow_selected: "\n        border: 2px solid rgba(101, 101, 101, 0.5);\n    ",
	multiselect__selected: "\n        background-color: #656565;\n        border-radius: 2px;\n        color: #fff;\n        margin-bottom: 4px;\n        margin-right: 4px;\n        padding: 4px 8px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -ms-flex-align: center;\n        align-items: center;\n    ",
	multiselect__selected_multiselect__remove_btn: "\n        cursor: pointer;\n        display: flex;\n        margin-left: 6px;\n    ",
	multiselect__input: "\n        border: none;\n        -ms-flex-preferred-size: 40%;\n            flex-basis: 40%;\n        -webkit-box-flex: 1;\n            -ms-flex-positive: 1;\n                flex-grow: 1;\n        height: 5px;        \n        margin-bottom: 4px;\n        min-width: 40%;\n        outline: none;      \n    "
};
Q.setStyle = function(e, t) {
	e.style = Q[t];
};
// src/widgets/multiSelect.js
var cn = class {
	_data;
	_domElements;
	_event = () => {};
	_itemTemplate;
	_multiselect;
	_noData;
	_noResults;
	_options = [];
	_placeholder;
	_select;
	_selectContainer;
	_selectedOptions = [];
	_tagTemplate;
	_textField;
	_valueField;
	_cross = "\n    <svg\n      width=\"24\"\n      height=\"24\"\n      viewBox=\"0 0 24 24\"\n      fill=\"none\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n    >\n      <path\n        d=\"M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z\"\n        fill=\"currentColor\"\n      />\n    </svg>\n    ";
	constructor({ data: e, itemTemplate: t, noData: n, noResults: r, placeholder: i, select: a, container: o, tagTemplate: s, textField: c, valueField: l }) {
		this._data = e ?? [], this._itemTemplate = t ?? null, this._noData = n ?? "No data found.", this._noResults = r ?? "No results found.", this._placeholder = i ?? "Select...", this._select = a, this._selectContainer = o, this._tagTemplate = s ?? null, this._textField = c ?? null, this._valueField = l ?? null;
	}
	init() {
		if (this._select && this._select.nodeName === "SELECT") {
			if (this._itemTemplate && this._data.length === 0) throw Error("itemTemplate must be initialized with data from the component settings");
			if (this._tagTemplate && this._data.length === 0) throw Error("tagTemplate must be initialized with data from the component settings");
			this._options = this._data.length > 0 ? this._getDataFromSettings() : this._getDataFromSelectTag(), this._renderMultiselect(), this._renderOptionsList(), this._domElements = {
				clear: this._multiselect.querySelector(".multiselect__clear-btn"),
				input: this._multiselect.querySelector(".multiselect__input"),
				optionsContainer: this._multiselect.querySelector(".multiselect__options"),
				optionsContainerList: this._multiselect.querySelector(".multiselect__options > ul"),
				options: {
					list: this._multiselect.querySelectorAll(".multiselect__options > ul > li"),
					find: function(e) {
						for (let t = 0; t < this.list.length; t++) {
							let n = this.list[t];
							if (e(n)) return n;
						}
					},
					some: function(e) {
						for (let t = 0; t < this.list.length; t++) if (e(this.list[t], t)) return !0;
						return !1;
					}
				}
			}, this._enableEventListenners(), this._initSelectedList();
		} else throw Error(`The selector '${this._select}' did not select any valid select tag.`);
	}
	subscribe(e) {
		if (typeof e == "function") this._event = e;
		else throw Error("parameter in the subscribe method is not a function");
	}
	_addOptionToList(e, t) {
		let n = `<span class="multiselect__selected" style="${Q.multiselect__selected}" data-value="${e.value}">${this._tagTemplate ? this._processTemplate(this._tagTemplate, t) : e.text}<span class="multiselect__remove-btn" style="${Q.multiselect__remove_btn}">${this._cross}</span></span>`;
		this._domElements.input.insertAdjacentHTML("beforebegin", n);
		let { lastElementChild: r } = this._multiselect.querySelector(`span[data-value="${e.value}"]`);
		r.addEventListener("click", () => {
			let t = this._domElements.options.find((t) => t.dataset.value === e.value);
			this._handleOption(t);
		});
	}
	_clearSelection() {
		for (let e = 0; e < this._selectedOptions.length; e++) {
			let t = this._selectedOptions[e], n = this._domElements.options.find((e) => e.dataset.value === t.value);
			n.classList.remove("multiselect__options--selected"), n.setAttribute("style", Q.multiselect__options), this._removeOptionFromList(n.dataset.value);
		}
		this._selectedOptions = [], this._handleClearSelectionBtn(), this._handlePlaceholder(), this._dispatchEvent({
			action: "CLEAR_ALL_OPTIONS",
			selection: this._selectedOptions
		});
	}
	_closeList() {
		this._domElements.input.value = "", this._domElements.optionsContainer.classList.remove("visible"), this._domElements.optionsContainer.setAttribute("style", Q.multiselect__options), this._filterOptions(""), this._removeAllArrowSelected();
	}
	_dispatchEvent(e) {
		this._event(e);
	}
	_enableEventListenners() {
		document.addEventListener("mouseup", ({ target: e }) => {
			this._multiselect.contains(e) || (this._filterOptions(""), this._closeList(), this._handlePlaceholder());
		}), this._domElements.clear.addEventListener("click", () => {
			this._clearSelection();
		});
		for (let e = 0; e < this._domElements.options.list.length; e++) this._domElements.options.list[e].addEventListener("click", ({ target: e }) => {
			this._handleOption(e), this._closeList();
		});
		this._domElements.input.addEventListener("focus", () => {
			this._domElements.optionsContainer.classList.add("visible"), this._domElements.optionsContainer.setAttribute("style", Q.multiselect__options_visible);
		}), this._domElements.input.addEventListener("input", ({ target: { value: e } }) => {
			this._domElements.options.list.length > 0 && this._filterOptions(e);
		}), this._domElements.input.addEventListener("keydown", (e) => {
			this._handleArrows(e), this._handleBackspace(e), this._handleEnter(e);
		});
	}
	_filterOptions(e) {
		let t = this._domElements.optionsContainer.classList.contains("visible"), n = e.toLowerCase();
		if (!t && e.length > 0 && (this._domElements.optionsContainer.classList.add("visible"), this._domElements.optionsContainer.setAttribute("style", Q.multiselect__options_visible)), this._domElements.options.list.length > 0) {
			for (let e = 0; e < this._domElements.options.list.length; e++) {
				let t = this._domElements.options.list[e];
				(this._itemTemplate ? this._data[e][this._textField] : t.textContent).toLowerCase().substring(0, n.length) === n ? this._domElements.optionsContainerList.appendChild(t) : t.parentNode && t.parentNode.removeChild(t);
			}
			let e = this._domElements.options.some((e, t) => (this._itemTemplate ? this._data[t][this._textField] : e.textContent).toLowerCase().substring(0, n.length) === n);
			this._showNoResults(!e);
		}
	}
	_generateId(e) {
		let t = "";
		for (let n = 0; n < e; n++) t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62));
		return t;
	}
	_getDataFromSelectTag() {
		let e = [], { options: t } = this._select;
		for (let n = 0; n < t.length; n++) {
			let r = t[n];
			e.push({
				text: r.text,
				value: r.value,
				selected: r.hasAttribute("selected")
			});
		}
		return e;
	}
	_getDataFromSettings() {
		if (this._data.length > 0 && this._valueField && this._textField) {
			let e = typeof this._valueField == "string", t = typeof this._textField == "string", n = [];
			if (!e || !t) throw Error("textField and valueField must be of type string");
			for (let e = 0; e < this._data.length; e++) {
				let t = this._data[e];
				n.push({
					value: t[this._valueField],
					text: t[this._textField],
					selected: typeof t.selected == "boolean" && t.selected
				});
			}
			return n;
		}
		return null;
	}
	_handleArrows(e) {
		if (e.keyCode === 40 || e.keyCode === 38) {
			e.preventDefault();
			let t = this._domElements.optionsContainer.classList.contains("visible"), n = this._multiselect.querySelector(".multiselect__options > ul");
			if (!t) this._domElements.optionsContainer.classList.add("visible"), this._domElements.optionsContainer.setAttribute("style", Q.multiselect__options_visible), n.firstElementChild.classList.add("arrow-selected"), n.firstElementChild.setAttribute("style", Q.multiselect__options_ul_li_arrow_selected), n.firstElementChild.scrollIntoView(!1);
			else {
				let t = this._multiselect.querySelector(".multiselect__options ul li.arrow-selected"), r = {
					ArrowUp: "previous",
					Up: "previous",
					ArrowDown: "next",
					Down: "next"
				};
				if (!t) {
					n.firstElementChild.classList.add("arrow-selected"), n.firstElementChild.setAttribute("style", Q.multiselect__options_ul_li_arrow_selected), n.firstElementChild.scrollIntoView(!1);
					return;
				}
				if (t.classList.remove("arrow-selected"), t.setAttribute("style", Q.multiselect__options_ul_li), t = t[r[e.key] + "ElementSibling"], !t) {
					t = n.children[r[e.key] === "next" ? 0 : n.children.length - 1], t.classList.add("arrow-selected"), t.setAttribute("style", Q.multiselect__options_ul_li_arrow_selected), this._scrollIntoView(n, t);
					return;
				}
				t.classList.add("arrow-selected"), t.setAttribute("style", Q.multiselect__options_ul_li_arrow_selected), this._scrollIntoView(n, t);
			}
		}
	}
	_handleBackspace(e) {
		if (e.keyCode === 8 && e.target.value === "") {
			let e = this._selectedOptions.length > 0 ? this._selectedOptions[this._selectedOptions.length - 1] : null;
			if (e) {
				let t = this._multiselect.querySelector(`li[data-value="${e.value}"]`);
				this._handleOption(t), this._selectedOptions.length === 0 && (this._domElements.optionsContainer.classList.remove("visible"), this._domElements.optionsContainer.setAttribute("style", Q.multiselect__options));
			}
		}
	}
	_handleClearSelectionBtn() {
		this._selectedOptions.length > 0 ? this._domElements.clear.style.display = "flex" : this._domElements.clear.style.display = "none";
	}
	_handleEnter(e) {
		if (e.keyCode === 13) {
			let e = this._multiselect.querySelector(".multiselect__options ul li.arrow-selected");
			e && (this._handleOption(e), this._closeList());
		}
	}
	_handleOption(e, t = !0) {
		for (let n = 0; n < this._selectedOptions.length; n++) if (this._selectedOptions[n].value === e.dataset.value) return e.classList.remove("multiselect__options--selected"), e.setAttribute("style", Q.multiselect__options), this._selectedOptions.splice(n, 1), this._removeOptionFromList(e.dataset.value), this._handleClearSelectionBtn(), this._handlePlaceholder(), t && this._dispatchEvent({
			action: "REMOVE_OPTION",
			value: e.dataset.value,
			selection: this._selectedOptions
		});
		for (let n = 0; n < this._options.length; n++) {
			let r = this._options[n];
			if (r.value === e.dataset.value) return e.classList.add("multiselect__options--selected"), e.setAttribute("style", Q.multiselect__options_selected), this._selectedOptions = [...this._selectedOptions, r], this._addOptionToList(r, n), this._handleClearSelectionBtn(), this._handlePlaceholder(), t && this._dispatchEvent({
				action: "ADD_OPTION",
				value: e.dataset.value,
				selection: this._selectedOptions
			});
		}
	}
	_handlePlaceholder() {
		this._domElements.input.placeholder = this._placeholder;
	}
	_initSelectedList() {
		let e = !1;
		for (let t = 0; t < this._options.length; t++) {
			let n = this._options[t];
			if (n.selected) {
				e = !0;
				let r = this._domElements.options.find((e) => e.dataset.value === n.value);
				r.classList.add("multiselect__options--selected"), r.setAttribute("style", Q.multiselect__options_selected), this._selectedOptions = [...this._selectedOptions, n], this._addOptionToList(n, t);
			}
		}
		e && this._handleClearSelectionBtn(), this._handlePlaceholder();
	}
	_processTemplate(e, t) {
		let n = e, r = e.match(/\$\{(\w+)\}/g).map((e) => e.replace(/\$\{|\}/g, ""));
		for (let e = 0; e < r.length; e++) {
			let i = r[e];
			n = n.replace(`\$\{${i}\}`, this._data[t][i] ?? "");
		}
		return n;
	}
	_removeAllArrowSelected() {
		let e = "arrow-selected", t = this._domElements.options.find((t) => t.classList.contains(e));
		t && t.classList.remove(e) && t.setAttribute("style", Q.multiselect__options_ul_li);
	}
	_removeOptionFromList(e) {
		let t = this._multiselect.querySelector(`span[data-value="${e}"]`);
		t && t.parentNode && t.parentNode.removeChild(t);
	}
	_renderOptionsList() {
		let e = `
        <div class="multiselect__options" style="${Q.multiselect__options}">
          <ul style="${Q.multiselect__options_ul}">
          ${this._options.length > 0 && !this._itemTemplate ? this._options.map((e) => `
              <li data-value="${e.value}" style="${Q.multiselect__options_ul_li}">${e.text}</li>
            `).join("") : ""}

          ${this._options.length > 0 && this._itemTemplate ? this._options.map((e, t) => `
              <li data-value="${e.value}" style="${Q.multiselect__options_ul_li}">${this._processTemplate(this._itemTemplate, t)}</li>
            `).join("") : ""}
          ${this._showNoData(this._options.length === 0)}
          </ul>
        </div>
      `;
		this._multiselect.insertAdjacentHTML("beforeend", e);
	}
	_renderMultiselect() {
		this._select.style.display = "none";
		let e = "iconic-" + this._generateId(20);
		this._multiselect = document.createElement("div"), this._multiselect.setAttribute("id", e), this._multiselect.setAttribute("class", "multiselect__container"), this._multiselect.setAttribute("style", Q.multiselect__container);
		let t = `
        <div class="multiselect__wrapper" style="${Q.multiselect__wrapper}">
          <input class="multiselect__input" style="${Q.multiselect__input}" placeholder="${this._placeholder}" />
        </div>
        <span style="display: none;" class="multiselect__clear-btn" style="${Q.multiselect__clear_btn}">${this._cross}</span>
    `;
		this._multiselect.innerHTML = t, this._selectContainer.appendChild(this._multiselect);
	}
	_scrollIntoView(e, t) {
		let n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
		n.top < r.bottom - t.offsetHeight || (e.scrollTop = t.clientHeight + (t.offsetTop - t.offsetHeight)), n.bottom > r.top + t.offsetHeight || (e.scrollTop = t.clientHeight + (t.offsetTop - t.offsetHeight) - (e.offsetHeight - (t.offsetHeight + (t.offsetHeight - t.clientHeight))));
	}
	_showNoData(e) {
		return e ? `<p class="multiselect__options--no-data" style="${Q.multiselect__options_ul_p_multiselect__options_no_data}">${this._noData}</p>` : "";
	}
	_showNoResults(e) {
		let t = this._multiselect.querySelector(".multiselect__options--no-results");
		if (e) {
			let e = `<p class="multiselect__options--no-results" style="${Q.multiselect__options_ul_p_multiselect__options_no_results}">${this._noResults}</p>`;
			!t && this._domElements.optionsContainerList.insertAdjacentHTML("beforeend", e);
		} else t && t.parentNode && t.parentNode.removeChild(t);
	}
}, ln = "✓", un = "✕", dn = "-", fn = E;
K[f.ui("AutocompleteField").uri] = function(e, n, r, i, a, o, s) {
	async function c(n, r) {
		if (!r) throw Error("autocompleteField:  No name set.");
		let a = u.the(i, g, null, o);
		if (a) {
			let e = u.any(a, _, null, o);
			if (a.equals(n) && e && e.sameTerm(r)) return;
		}
		let c = a ? u.statementsMatching(i, g, a, o).concat(u.statementsMatching(a, _, null, o)) : [], l = [t(i, g, n, o), t(n, _, r, o)];
		try {
			await u.updater?.updateMany(c, l);
		} catch (t) {
			s(!1, t), p.appendChild(L(e, "Autocomplete form data update error:" + t, null, t));
			return;
		}
		s(!0, "");
	}
	async function l(t, n) {
		let r = u.the(i, g, null, o);
		if (!r) {
			s(!1, "NO data to elete"), p.appendChild(L(e, "Autocomplete delete: no old data!"));
			return;
		}
		let a = u.statementsMatching(i, g, r, o).concat(u.statementsMatching(r, _, null, o)), c = [];
		try {
			await u.updater?.updateMany(a, c);
		} catch (t) {
			let n = /* @__PURE__ */ Error("Autocomplete form data delete error:" + t);
			s(!1, t), p.appendChild(L(e, n, null, t));
			return;
		}
		s(!0, "");
	}
	if (i.termType !== "NamedNode") throw Error("Sorry this field only works on NamedNode subjects (for editable)");
	let u = E, d = a.doc ? a.doc() : null, p = e.createElement("div");
	n && n.appendChild(p);
	let m = e.createElement("div");
	m.setAttribute("class", "formFieldName"), m.setAttribute("style", C.formFieldNameBoxStyle), p.appendChild(m);
	let h = e.createElement("div");
	h.setAttribute("class", "formFieldValue"), p.appendChild(h);
	let g = u.any(a, f.ui("property"));
	if (!g) return p.appendChild(L(e, "Error: No property given for autocomplete field: " + a));
	let _ = u.any(a, f.ui("labelProperty")) || f.schema("name"), v = u.any(a, f.ui("dataSource"));
	if (!v) return p.appendChild(L(e, "Error: No data source given for autocomplete field: " + a));
	let y = {
		label: u.anyJS(v, f.schema("name"), null, v.doc()),
		logo: u.any(v, f.schema("logo"), null, v.doc())
	}, b = u.any(a, f.ui("targetClass"), null, a.doc()) || u.any(v, f.ui("targetClass"), null, v.doc());
	b && (y.targetClass = b), y.objectURIBase = u.any(v, f.ui("objectURIBase"), null, v.doc()) || void 0;
	let x = u.anyJS(v, f.ui("endpoint"), null, v.doc());
	if (x) {
		if (y.endpoint = x, y.searchByNameQuery = u.anyJS(v, f.ui("searchByNameQuery"), null, v.doc()), !y.searchByNameQuery) return p.appendChild(L(e, "Error: No searchByNameQuery given for endpoint data Source: " + a));
		y.insitituteDetailsQuery = u.anyJS(v, f.ui("insitituteDetailsQuery"), null, v.doc());
	} else {
		let t = u.anyJS(v, f.ui("searchByNameURI"));
		if (!t) return p.appendChild(L(e, "Error: No searchByNameURI OR sparql endpoint given for dataSource: " + v));
		y.searchByNameURI = t;
	}
	let S = u.anyJS(a, f.ui("suppressEmptyUneditable"), null, d), w = u.updater?.editable(o.uri), T = {
		permanent: !0,
		targetClass: y.targetClass,
		queryParams: y
	};
	T.size = u.anyJS(a, f.ui("size"), null, d) || void 0;
	let D = u.any(i, g, void 0, o);
	if (D) T.currentObject = D, T.currentName = u.any(T.currentObject, _, null, o);
	else if (D = u.any(a, f.ui("default")), D) T.currentObject = D, T.currentName = u.any(T.currentObject, _, null, o);
	else if (S && !w) return p.style.display = "none", p;
	return m.appendChild(yt(e, g, a)), sn(e, i, {
		editable: w,
		dbLookup: !0
	}, T, c, l).then((e) => {
		h.appendChild(e);
	}, (t) => {
		h.appendChild(L(e, `Error rendering autocomplete ${a}: ${t}`, "#fee", t));
	}), p;
};
function pn(e, t, n, r, i, a, o) {
	let s = a.children;
	for (let c = 0; c < o.length; c++) {
		let l = o[c];
		if (ht(l) === f.ui("Options").uri) {
			let o = q(e, l)(e, null, t, n, l, r, i);
			D("Refreshing Options field by replacing it."), a.insertBefore(o, s[c]), a.removeChild(s[c + 1]);
		}
	}
}
K[f.ui("Form").uri] = K[f.ui("Group").uri] = function(e, t, n, r, i, a, o) {
	let s = e.createElement("div"), c = f.ui;
	if (t && t.appendChild(s), !i) return;
	let l = r.toNT() + "|" + i.toNT();
	if (n[l]) return s.appendChild(e.createTextNode("Group: see above " + l)), s;
	let u = {};
	for (let e in n) u[e] = 1;
	u[l] = 1;
	let d = i.doc ? i.doc() : null, p = fn.any(i, c("weight"), null, d), m = p ? Number(p.value) : 1;
	if (m > 3 || m < 0) return s.appendChild(L(e, `Form Group weight ${m} should be 0-3`));
	s.setAttribute("style", C.formGroupStyle[m]), s.style.display = "flex", s.style.flexDirection = "column", s.class = "form-weight-" + m;
	let h = fn.any(i, c("parts"), null, d), g;
	if (h ? g = h.elements : (h = fn.each(i, c("part"), null, d), g = xn(h)), !h) return s.appendChild(L(e, "No parts to form! "));
	for (let t = 0; t < g.length; t++) {
		let i = g[t], c = q(e, i);
		s.appendChild(c(e, null, u, r, i, a, function(t, i) {
			t && i && i.widget && i.widget === "select" && pn(e, n, r, a, o, s, g), o(t, {
				widget: "group",
				change: i
			});
		}));
	}
	return s;
}, K[f.ui("Options").uri] = function(e, t, n, r, i, a, s) {
	let c = E, l = e.createElement("div"), u = i.doc ? i.doc() : null, d = f.ui;
	t && t.appendChild(l);
	let p = c.any(i, d("dependingOn"));
	p ||= f.rdf("type");
	let m = c.each(i, d("case"), null, u);
	m || l.appendChild(L(e, "No cases to Options form. "));
	let h;
	h = p.sameTerm(f.rdf("type")) ? Object.keys(c.findTypeURIs(r)).map((e) => o(e)) : c.each(r, p);
	for (let t = 0; t < m.length; t++) {
		let o = m[t], f = c.each(o, d("for"), null, u), p = !1;
		for (let e = 0; e < f.length; e++) for (let t of h) {
			let n = f[e];
			(t.sameTerm(f) || t.termType === n.termType && t.value === n.value) && (p = !0);
		}
		if (p) {
			let t = c.the(o, d("use"));
			if (t) _n(e, l, n, r, t, a, s);
			else return l.appendChild(L(e, "No \"use\" part for case in form " + i)), l;
			break;
		}
	}
	return l;
}, K[f.ui("Multiple").uri] = function(e, n, r, i, o, s, c) {
	function l(e) {
		return e.map((e) => e.toString().slice(-7)).join(", ");
	}
	async function u() {
		let n = $(s);
		if (C) te(), P.elements.push(n), await ne();
		else {
			let r = O ? [t(n, T, i, s)] : [t(i, T, n, s)];
			try {
				await h.updater.update([], r);
			} catch (t) {
				let n = "Error adding to unordered multiple: " + t;
				y.appendChild(L(e, n)), k(n);
			}
			F();
		}
	}
	function d(n) {
		async function a() {
			if (C) {
				D("pre delete: " + l(P.elements));
				for (let e = 0; e < P.elements.length; e++) if (P.elements[e].sameTerm(n)) {
					P.elements.splice(e, 1), await ne();
					return;
				}
			} else if (h.holds(i, T, n, s)) {
				let r = [t(i, T, n, s)];
				h.updater.update(r, [], function(t, n, r) {
					n ? N.removeChild(d) : N.appendChild(L(e, "Multiple: delete failed: " + r));
				});
			}
		}
		async function o(e, t) {
			D("pre move: " + l(P.elements));
			let r = 0;
			for (; r < P.elements.length && !P.elements[r].sameTerm(n); r++);
			if (r === P.elements.length && alert("list move: not found element for " + n), t) {
				if (r === 0) {
					alert("@@ boop - already at top   -temp message");
					return;
				}
				P.elements.splice(r - 1, 2, P.elements[r], P.elements[r - 1]);
			} else {
				if (r === P.elements.length - 1) {
					alert("@@ boop - already at bottom   -temp message");
					return;
				}
				P.elements.splice(r, 2, P.elements[r + 1], P.elements[r]);
			}
			await ne();
		}
		function u(e, t) {
			D(`Item done callback for item ${n.toString()}`), e || k("  Item done callback: Error: " + t), c(e, t);
		}
		_("Multiple: render object: " + n);
		let d = q(e, M)(e, null, r, n, M, s, u);
		if (d.subject = n, h.updater.editable(s.uri) && (H(e, d, A, a), C)) {
			let t = e.createElement("div");
			t.style.display = "grid", t.style.gridTemplateColumns = "auto 3em", t.style.gridTemplateRows = "50% 50%";
			let n = U(e, R.iconBase + "noun_1369237.svg", "Move Up", async (e) => o(e, !0)), r = U(e, R.iconBase + "noun_1369241.svg", "Move Down", async (e) => o(e, !1)), i = e.createElement("div");
			return i.appendChild(d), t.appendChild(i), t.appendChild(n), t.appendChild(r), n.style.gridColumn = 2, r.style.gridColumn = 2, n.style.gridRow = 1, r.style.padding = "0em", n.style.padding = "0em", r.style.gridRow = 2, i.style.gridColumn = 1, i.style.gridRowStart = "span 2", t;
		}
		return d;
	}
	let p = R.iconBase + "noun_19460_green.svg", h = E, v = o.doc ? o.doc() : null, y = e.createElement("div"), b = y, x = f.ui;
	n && n.appendChild(y);
	let S = h.any(o, x("ordered")), C = S ? a.toJS(S) : !1, T = h.any(o, x("property")), O = h.anyJS(o, x("reverse"), null, v);
	if (!T) return y.appendChild(L(e, "No property to multiple: " + o)), b;
	let A = h.any(o, x("label"));
	A ||= w(T);
	let j = h.any(o, x("min"));
	j = j ? 0 + j.value : 0;
	let M = h.any(o, x("part"));
	if (!M) return y.appendChild(L(e, "No part to multiple: " + o)), b;
	let N = y.appendChild(e.createElement("div"));
	N.style.display = "flex", N.style.flexDirection = "column";
	let P, ee;
	if (ee = O ? h.any(null, T, i, s) : h.any(i, T, null, s), C ? (P = O ? h.any(null, T, i, s) : h.any(i, T, null, s), ee = P ? P.elements : []) : (ee = O ? h.each(null, T, i, s) : h.each(i, T, null, s), P = null), h.updater.editable(s.uri)) {
		let t = y.appendChild(e.createElement("div"));
		t.style.padding = "0.5em";
		let n = t.appendChild(e.createElement("img"));
		n.setAttribute("src", p), n.setAttribute("style", "margin: 0.2em; width: 1.5em; height:1.5em"), n.title = "Click to add another " + A;
		let r = e.createElement("span");
		r.textContent = (ee.length === 0 ? "Add another " : "Add ") + A, t.addEventListener("click", async (e) => {
			await u();
		}, !0), t.appendChild(r);
	}
	function te() {
		P || (P = new m(), O ? h.add(P, T, i, s) : h.add(i, T, P, s));
	}
	async function ne() {
		D("save list: " + l(P.elements)), te();
		try {
			await h.fetcher.putBack(s);
		} catch (t) {
			y.appendChild(L(e, "Error trying to put back a list: " + t));
			return;
		}
		F();
	}
	function F() {
		let e;
		if (C) {
			let t = O ? h.the(null, T, i, s) : h.the(i, T, null, s);
			e = t ? t.elements : [];
		} else e = O ? h.each(null, T, i, s) : h.each(i, T, null, s), e.sort();
		g(N, e, d);
	}
	N.refresh = F, F();
	async function I() {
		let e = j - ee.length;
		if (e > 0) {
			for (let t = 0; t < e; t++) D("Adding extra: min " + j), await u();
			await ne();
		}
	}
	return I().then(() => {
		D(" Multiple render: async stuff ok");
	}, (e) => {
		k(" Multiple render: async stuff fails. #### ", e);
	}), b;
}, K[f.ui("PhoneField").uri] = Y, K[f.ui("EmailField").uri] = Y, K[f.ui("ColorField").uri] = Y, K[f.ui("DateField").uri] = Y, K[f.ui("DateTimeField").uri] = Y, K[f.ui("TimeField").uri] = Y, K[f.ui("NumericField").uri] = Y, K[f.ui("IntegerField").uri] = Y, K[f.ui("DecimalField").uri] = Y, K[f.ui("FloatField").uri] = Y, K[f.ui("TextField").uri] = Y, K[f.ui("SingleLineTextField").uri] = Y, K[f.ui("NamedNodeURIField").uri] = Y, K[f.ui("MultiLineTextField").uri] = function(e, t, n, r, i, a, o) {
	let s = f.ui, c = E, l = i.doc ? i.doc() : null, u = c.any(i, s("property"));
	if (!u) return L(e, "No property to text field: " + i);
	let d = e.createElement("div");
	d.style.display = "flex", d.style.flexDirection = "row";
	let p = d.appendChild(e.createElement("div"));
	p.style.width = y.formFieldNameBoxWidth;
	let m = d.appendChild(e.createElement("div"));
	p.appendChild(yt(e, u, i)), a = bt(r, u, a);
	let h = c.anyJS(r, u, null, a) || "", g = c.updater.editable(a.uri), _ = i && c.anyJS(i, f.ui("suppressEmptyUneditable"), null, l);
	!g && _ && h === "" && (d.style.display = "none");
	let v = Tn(e, c, r, u, a, o);
	return m.appendChild(v), t && t.appendChild(d), d;
};
function mn(e, n, r, i, a, o, s, c) {
	let l = f.ui, u = E, d = u.any(a, l("property"));
	if (!d) {
		let t = L(e, "No property to boolean field: " + a);
		return n && n.appendChild(t), t;
	}
	let p = u.any(a, l("label"));
	p ||= w(d, !0), o = bt(i, d, o);
	let m = u.any(i, d);
	m === void 0 && (m = !1);
	let h = t(i, d, !0, o), g = t(i, d, !1, o), _ = An(e, u, p, g, h, a, o, c);
	return n && n.appendChild(_), _;
}
K[f.ui("BooleanField").uri] = function(e, t, n, r, i, a, o) {
	return mn(e, t, n, r, i, a, o, !1);
}, K[f.ui("TristateField").uri] = function(e, t, n, r, i, a, o) {
	return mn(e, t, n, r, i, a, o, !0);
}, K[f.ui("Classifier").uri] = function(e, t, n, r, i, a, o) {
	let s = E, c = f.ui, l = s.any(i, c("category"));
	if (!l) return L(e, "No category for classifier: " + i);
	_("Classifier: dataDoc=" + a);
	let u = function(e, t) {
		return o(e || e, t);
	}, d = e.createElement("div");
	d.setAttribute("class", "classifierBox");
	let p = e.createElement("div");
	p.setAttribute("class", "formFieldName classifierBox-label"), p.appendChild(yt(e, l, i)), d.appendChild(p);
	let m = e.createElement("div");
	m.setAttribute("class", "formFieldValue classifierBox-selectBox");
	let h = kn(e, s, r, l, a, u);
	if (h && h.querySelectorAll) {
		let e = h.querySelectorAll("select");
		e.length && !s.updater.editable(a.uri) && e.forEach((e) => {
			e.readOnly = !0, e.style = C.textInputStyleUneditable;
		});
	}
	return m.appendChild(h), d.appendChild(m), t && t.appendChild(d), d;
}, K[f.ui("Choice").uri] = function(e, n, r, i, a, s, c) {
	let l = f.ui, u = E, d = a.doc ? a.doc() : null, p, m = e.createElement("div");
	m.setAttribute("class", "choiceBox"), n && n.appendChild(m);
	let h = e.createElement("div");
	h.setAttribute("class", "formFieldName choiceBox-label"), m.appendChild(h);
	let g = e.createElement("div");
	g.setAttribute("class", "formFieldValue choiceBox-selectBox"), m.appendChild(g);
	let _ = u.any(a, l("property"));
	if (!_) return m.appendChild(L(e, "No property for Choice: " + a));
	h.appendChild(yt(e, _, a));
	let v = u.any(a, l("from"));
	if (!v) return L(e, "No 'from' for Choice: " + a);
	let y = u.any(a, l("use")), b = {
		form: a,
		subForm: y,
		disambiguate: !1
	};
	function x(e) {
		let t = [], n;
		t = u.each(void 0, f.rdf("type"), v, d);
		for (let n in Nn(u, v, e)) t.push(u.fromNT(n));
		if (v.sameTerm(f.rdfs("Class"))) for (p in Qe()) t.push(u.sym(p));
		else if (v.sameTerm(f.rdf("Property"))) {
			for (p in n = $e(u), n.op) t.push(u.fromNT(p));
			for (p in n.dp) t.push(u.fromNT(p));
			b.disambiguate = !0;
		} else if (v.sameTerm(f.owl("ObjectProperty"))) {
			for (p in n = $e(u), n.op) t.push(u.fromNT(p));
			b.disambiguate = !0;
		} else if (v.sameTerm(f.owl("DatatypeProperty"))) {
			for (p in n = $e(u), n.dp) t.push(u.fromNT(p));
			b.disambiguate = !0;
		}
		return t;
	}
	u.any(a, l("canMintNew")) && (b.mint = "* Create new *");
	let S = u.any(a, l("multiselect"));
	S && (b.multiSelect = !0);
	let C = u.each(a, l("search-full-store")).length ? null : s, w;
	return g.refresh = function() {
		let n = u.each(i, _, null, s).map((e) => e.value), r = x(C);
		if (r.push(n), r = Sn(r), w = jn(e, g, u, i, _, r, n, v, b, s, c), g.innerHTML = "", g.appendChild(w), S) {
			let r = new cn({
				placeholder: w.selected,
				select: w,
				container: g,
				textField: "textField",
				valueField: "valueField"
			});
			r.init(), r.subscribe(function(r) {
				if (r.action === "REMOVE_OPTION" && (n = n.filter(function(e) {
					return e !== r.value;
				})), r.action === "CLEAR_ALL_OPTIONS" && (n = []), r.action === "ADD_OPTION") {
					if ((r.value + "").includes("Create new")) {
						let r = $(s), a = [];
						a.push(t(i, _, u.sym(r), s)), v && a.push(t(r, f.rdf("type"), u.sym(v), s)), y && hn(e, g, {}, o(r), y, s, function(t, i) {
							t ? (u.updater.update([], a, function(t, n, r) {
								n || g.appendChild(L(e, "Error updating select: " + r));
							}), n.push(r), c && c(t, {
								widget: "select",
								event: "new"
							})) : g.appendChild(L(e, "Error updating data in field of select: " + i));
						});
					} else n.push(r.value);
				}
				w.update(n);
			});
		}
	}, g.refresh(), w && w.refresh && w.refresh(), m;
};
function hn(e, t, n, r, i, a, o) {
	q(e, i)(e, t, n, r, i, a, o);
}
K[f.ui("Comment").uri] = K[f.ui("Heading").uri] = function(e, t, n, r, i, a, o) {
	let s = f.ui, c = E, l = c.any(i, s("contents"));
	l ||= "Error: No contents in comment field.";
	let u = i.doc ? i.doc() : null, d = pt[ht(i)] || {}, p = e.createElement("div");
	t && t.appendChild(p);
	let m = p.appendChild(e.createElement(d.element));
	m.textContent = l, _t(m, i);
	let h = c.anyJS(i, f.ui("suppressIfUneditable"), null, u), g = c.updater.editable(a.uri);
	return h && !g && (p.style.display = "none"), p;
};
function gn(e, t, n, r, i) {
	let a = e.createElement("button");
	return a.setAttribute("type", "button"), a.innerHTML = "Edit " + w(f.ui("Form")), a.addEventListener("click", function(o) {
		_n(e, t, {}, n, f.ui("FormForm"), r, i).setAttribute("style", f.ui("FormForm").sameTerm(n) ? "background-color: #fee;" : "background-color: #ffffe7;"), a.parentNode.removeChild(a);
	}, !0), a;
}
function _n(e, t, n, r, i, a, o) {
	return q(e, i)(e, t, n, r, i, a, o);
}
function vn(e, t) {
	let n = e.each(void 0, f.rdf("range"), t);
	[
		f.rdfs("comment"),
		f.dc("title"),
		f.foaf("name"),
		f.foaf("homepage")
	].forEach(function(e) {
		n.push(e);
	});
	let r = e.each(void 0, f.rdf("type"), t);
	r.length > 60 && (r = r.slice(0, 60));
	let i = {};
	for (let t = 0; t < (r.length > 60 ? 60 : r.length); t++) e.statementsMatching(r[t], void 0, void 0).forEach(function(e) {
		i[e.predicate.uri] = !0;
	});
	n.forEach(function(e) {
		i[e.uri] = !0;
	});
	let a = [];
	for (let t in i) a.push(e.sym(t));
	return a;
}
function yn(e, t, n) {
	let r = [e.sym(t)];
	for (; r.length > 0;) {
		let t = r.shift(), i = e.each(t, n);
		if (_("Lists for " + t + ", " + n + ": " + i.length), i.length !== 0) return i;
		let a = e.each(t, f.rdfs("subClassOf"));
		for (let e = 0; e < a.length; e++) r.push(a[e]), _("findClosest: add super: " + a[e]);
	}
	return [];
}
function bn(e) {
	let t = E;
	_("formsFor: subject=" + e);
	let n = t.findTypeURIs(e), r;
	for (r in n) _("   type: " + r);
	let i = t.bottomTypeURIs(n), a = [];
	for (let e in i) _("candidatesFor: trying bottom type =" + e), a = a.concat(yn(t, e, f.ui("creationForm"))), a = a.concat(yn(t, e, f.ui("annotationForm")));
	return a;
}
function xn(e) {
	let t = e.map(function(e) {
		return [fn.any(e, f.ui("sequence")) || 9999, e];
	});
	return t.sort(function(e, t) {
		return e[0] - t[0];
	}), t.map(function(e) {
		return e[1];
	});
}
function Sn(e) {
	let t = e.map(function(e) {
		return [w(e).toLowerCase(), e];
	});
	return t.sort(), t.map(function(e) {
		return e[1];
	});
}
function Cn(e, t, n, r, i, a, o, s) {
	let c = e.createElement("button");
	return c.setAttribute("type", "button"), c.innerHTML = "New " + w(i), c.addEventListener("click", function(l) {
		c.parentNode.appendChild(wn(e, t, n, r, i, a, o, s));
	}, !1), c;
}
function wn(e, n, r, i, a, o, s, c) {
	let l = e.createElement("form");
	if (!o) {
		let t = yn(n, a.uri, f.ui("creationForm"));
		if (t.length === 0) {
			let t = l.appendChild(e.createElement("p"));
			t.textContent = "I am sorry, you need to provide information about a " + w(a) + " but I don't know enough information about those to ask you.";
			let n = l.appendChild(e.createElement("button"));
			return n.setAttribute("type", "button"), n.setAttribute("style", "float: right;"), n.innerHTML = "Goto " + w(a), n.addEventListener("click", function(t) {
				e.outlineManager.GotoSubject(a, !0, void 0, !0, void 0);
			}, !1), l;
		}
		_("lists[0] is " + t[0]), o = t[0];
	}
	_("form is " + o), l.setAttribute("style", `border: 0.05em solid ${y.formBorderColor}; color: ${y.formBorderColor}`), l.innerHTML = "<h3>New " + w(a) + "</h3>";
	let u = q(e, o), d = $(s), p = !1, m = function(o, u) {
		if (!o) return c(o, u);
		let m = [];
		r && !n.holds(r, i, d, s) && m.push(t(r, i, d, s)), r && !n.holds(d, f.rdf("type"), a, s) && m.push(t(d, f.rdf("type"), a, s)), m.length ? n.updater.update([], m, h) : c(!0, u), p ||= l.appendChild(et(e, d));
	};
	function h(e, t, n) {
		return c(t, n);
	}
	return x("paneUtils Object is " + d), tt(e, u(e, l, {}, d, o, s, m)).setAttribute("style", "float: right;"), l.AJAR_subject = d, l;
}
function Tn(e, n, r, i, a, o) {
	let s = e.createElement("div"), c = n.anyJS(r, i, null, a) || "", l = e.createElement("textarea");
	s.appendChild(l), l.rows = c ? c.split("\n").length + 2 : 2, l.cols = 80, l.setAttribute("style", C.multilineTextInputStyle), c === null ? l.select() : l.value = c, s.refresh = function() {
		let e = n.any(r, i, null, a);
		e && e.value !== l.value && (l.value = e.value);
	};
	function u(c) {
		f.disabled = !0, f.setAttribute("style", "visibility: hidden; float: right;"), l.disabled = !0, l.style.color = y.textInputColorPending;
		let u = n.statementsMatching(r, i, null, a), d = t(r, i, l.value, a);
		n.updater.update(u, d, function(t, n, r) {
			n ? (l.style.color = y.textInputColor, l.disabled = !1) : s.appendChild(L(e, "Error (while saving change to " + a.uri + "): " + r)), o && o(n, r);
		});
	}
	let d = n.updater.editable(a.uri), f;
	return d ? (f = Ve(e, u), f.disabled = !0, f.style.visibility = "hidden", f.style.float = "right", s.appendChild(f), l.addEventListener("keyup", function(e) {
		l.style.color = "green", f && (f.disabled = !1, f.style.visibility = "");
	}, !0), l.addEventListener("change", u, !0)) : (l.disabled = !0, l.style.backgroundColor = y.textInputBackgroundColorUneditable), s;
}
function En(e, n, r, i, a, o, s, c) {
	_("Select list length now " + a.length);
	let l = 0, u = {}, d = n.updater.editable(s.uri);
	for (let e = 0; e < a.length; e++) {
		let t = a[e];
		t.uri || O(`makeSelectForClassifierOptions: option does not have an uri: ${t}, with predicate: ${i}`), !t.uri || t.uri in u || (u[t.uri] = !0, l++);
	}
	if (l === 0 && !o.mint) return L(e, "Can't do selector with no options, subject= " + r + " property = " + i + ".");
	_("makeSelectForClassifierOptions: dataDoc=" + s);
	let p, m = function() {
		return p = {}, i.sameTerm(f.rdf("type")) ? p = n.findTypeURIs(r) : n.each(r, i, null, s).forEach(function(e) {
			p[e.uri] = !0;
		}), p;
	};
	p = m();
	let h = function(a) {
		g.disabled = !0;
		let l = [], u = [], d = function(e) {
			n.holds(r, i, e, s) && l.push(t(r, i, e, s));
		}, f;
		for (let a = 0; a < g.options.length; a++) {
			let l = g.options[a];
			if (l.selected && l.AJAR_mint) {
				if (o.mintClass) {
					let t = wn(e, n, r, i, o.mintClass, null, s, function(e, t) {
						e || c(e, t, { change: "new" });
					});
					g.parentNode.appendChild(t), f = t.AJAR_subject;
				} else f = $(s);
				u.push(t(r, i, f, s)), o.mintStatementsFun && (u = u.concat(o.mintStatementsFun(f)));
			}
			l.AJAR_uri && (l.selected && !(l.AJAR_uri in p) && u.push(t(r, i, n.sym(l.AJAR_uri), s)), !l.selected && l.AJAR_uri in p && d(n.sym(l.AJAR_uri)), l.selected && (g.currentURI = l.AJAR_uri));
		}
		let h = g.subSelect;
		for (; h && h.currentURI;) d(n.sym(h.currentURI)), h = h.subSelect;
		for (h = g.superSelect; h && h.currentURI;) d(n.sym(h.currentURI)), h = h.superSelect;
		function _(e, t) {
			c(e, {
				widget: "select",
				event: "new"
			});
		}
		x("makeSelectForClassifierOptions: data doc = " + s), n.updater.update(l, u, function(t, n, r) {
			if (p = m(), n) g.disabled = !1, f && q(e, o.subForm)(e, g.parentNode, {}, f, o.subForm, s, _);
			else return g.parentNode.appendChild(L(e, "Error updating data in select: " + r));
			c && c(n, {
				widget: "select",
				event: "change"
			});
		});
	}, g = e.createElement("select");
	g.setAttribute("style", C.formSelectStyle), o.multiple && g.setAttribute("multiple", "true"), g.currentURI = null, g.refresh = function() {
		p = m();
		for (let e = 0; e < g.children.length; e++) {
			let t = g.children[e];
			t.AJAR_uri && (t.selected = t.AJAR_uri in p);
		}
		g.disabled = !1;
	};
	for (let t in u) {
		let r = n.sym(t), i = e.createElement("option");
		o.disambiguate ? i.appendChild(e.createTextNode(b(r, !0))) : i.appendChild(e.createTextNode(w(r, !0)));
		let a = n.any(r, n.sym("http://www.w3.org/ns/ui#backgroundColor"));
		a && i.setAttribute("style", "background-color: " + a.value + "; "), i.AJAR_uri = t, t in p && (i.setAttribute("selected", "true"), g.currentURI = t), g.appendChild(i);
	}
	if (d && o.mint) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(o.mint)), t.AJAR_mint = !0, g.insertBefore(t, g.firstChild);
	}
	if (g.currentURI == null && !o.multiple) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(o.nullLabel)), g.insertBefore(t, g.firstChild), t.selected = !0;
	}
	return d && g.addEventListener("change", h, !1), g;
}
function Dn(e, n, r, i, a, o, s, c) {
	_("Select list length now " + a.length);
	let l = 0, u = {}, d = n.updater.editable(s.uri);
	for (let e = 0; e < a.length; e++) {
		let t = a[e];
		t.uri || O(`makeSelectForOptions: option does not have an uri: ${t}, with predicate: ${i}`), !t.uri || t.uri in u || (u[t.uri] = !0, l++);
	}
	if (l === 0) return L(e, "Can't do selector with no options, subject= " + r + " property = " + i + ".");
	_("makeSelectForOptions: dataDoc=" + s);
	let p, m = function() {
		return p = {}, i.sameTerm(f.rdf("type")) ? p = n.findTypeURIs(r) : n.each(r, i, null, s).forEach(function(e) {
			e.uri && (p[e.uri] = !0);
		}), p;
	};
	p = m();
	let h = function(a) {
		g.disabled = !0;
		let o = [], l = [], u = function(e) {
			n.holds(r, i, e, s) && o.push(t(r, i, e, s));
		};
		for (let e = 0; e < g.options.length; e++) {
			let a = g.options[e];
			a.AJAR_uri && (a.selected && !(a.AJAR_uri in p) && l.push(t(r, i, n.sym(a.AJAR_uri), s)), !a.selected && a.AJAR_uri in p && u(n.sym(a.AJAR_uri)), a.selected && (g.currentURI = a.AJAR_uri));
		}
		let d = g.subSelect;
		for (; d && d.currentURI;) u(n.sym(d.currentURI)), d = d.subSelect;
		for (d = g.superSelect; d && d.currentURI;) u(n.sym(d.currentURI)), d = d.superSelect;
		x("selectForOptions: data doc = " + s), n.updater.update(o, l, function(t, n, r) {
			if (p = m(), n) g.disabled = !1;
			else return g.parentNode.appendChild(L(e, "Error updating data in select: " + r));
			c && c(n, {
				widget: "select",
				event: "change"
			});
		});
	}, g = e.createElement("select");
	g.setAttribute("style", C.formSelectStyle), g.currentURI = null, g.refresh = function() {
		p = m();
		for (let e = 0; e < g.children.length; e++) {
			let t = g.children[e];
			t.AJAR_uri && (t.selected = t.AJAR_uri in p);
		}
		g.disabled = !1;
	};
	for (let t in u) {
		let r = n.sym(t), i = e.createElement("option");
		o.disambiguate ? i.appendChild(e.createTextNode(b(r, !0))) : i.appendChild(e.createTextNode(w(r, !0)));
		let a = n.any(r, n.sym("http://www.w3.org/ns/ui#backgroundColor"));
		a && i.setAttribute("style", "background-color: " + a.value + "; "), i.AJAR_uri = t, t in p && (i.setAttribute("selected", "true"), g.currentURI = t), g.appendChild(i);
	}
	if (!g.currentURI) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(o.nullLabel)), g.insertBefore(t, g.firstChild), t.selected = !0;
	}
	return d && g.addEventListener("change", h, !1), g;
}
function On(e, t, n, r, i, a) {
	let o = t.any(r, f.owl("disjointUnionOf")), s, c = !1;
	return o ? s = o.elements : (s = t.each(void 0, f.rdfs("subClassOf"), r), c = !0), _("Select list length " + s.length), s.length === 0 ? L(e, "Can't do " + (c ? "multiple " : "") + "selector with no subclasses of category: " + r) : s.length === 1 ? L(e, "Can't do " + (c ? "multiple " : "") + "selector with only 1 subclass of category: " + r + ":" + s[1]) : En(e, t, n, f.rdf("type"), s, {
		multiple: c,
		nullLabel: "* Select type *"
	}, i, a);
}
function kn(e, t, n, r, i, a) {
	function o() {
		c &&= (s.removeChild(c), null), u.currentURI && t.any(t.sym(u.currentURI), f.owl("disjointUnionOf")) && (c = kn(e, t, n, t.sym(u.currentURI), i, a), u.subSelect = c.firstChild, u.subSelect.superSelect = u, s.appendChild(c));
	}
	let s = e.createElement("span"), c = null;
	function l(e, t) {
		e && o(), a(e, t);
	}
	let u = On(e, t, n, r, i, l);
	return s.appendChild(u), o(), s;
}
function An(e, t, n, r, i, a, o, s) {
	let c = e.createElement("div"), l = vt(e, t, c, a, n), u = t.updater.editable(o.uri), d = e.createElement("button"), p = d;
	d.style = C.checkboxInputStyle, l.appendChild(d);
	function m(e) {
		if (!e) return [];
		if (e.object) return e.why ||= o, [e];
		if (e instanceof Array) return e;
		throw Error("buildCheckboxForm: bad param " + e);
	}
	i = m(i), r = m(r);
	function h(e) {
		return e.filter((e) => !t.holds(e.subject, e.predicate, e.object, e.why)).length === 0;
	}
	function g() {
		let n = h(i), o = n;
		if (r.length) {
			let l = h(r);
			if (n && l) return c.appendChild(L(e, "Inconsistent data in dataDoc!\n" + i + " and\n" + r)), c;
			if (!n && !l) {
				n = null;
				let e = t.any(a, f.ui("default"));
				o = e ? e.value === "1" : s ? null : !1;
			}
		}
		d.state = n, d.textContent = {
			true: ln,
			false: s ? un : " ",
			null: dn
		}[o];
	}
	if (g(), !u) return c;
	let _ = !1;
	return d.addEventListener("click", function(n) {
		if (_) return;
		_ = !0, d.disabled = !0;
		let a = !1, o = function() {
			return !a && (a = !0, _ = !1, d.disabled = !1, !0);
		}, l = function(t) {
			p.style.color = "#000", p.style.backgroundColor = "#fee", c.appendChild(L(e, `Checkbox: Error updating dataDoc from ${d.state} to ${d.newState}:\n\n${t}`));
		};
		p.style.color = "#bbb";
		let u = d.state === !0 ? i : d.state === !1 ? r : [];
		d.newState = d.state === null ? !0 : d.state === !0 ? !1 : !s || null;
		let f = d.newState === !0 ? i : d.newState === !1 ? r : [];
		D(`  Deleting  ${u}`), D(`  Inserting ${f}`);
		try {
			let e = t.updater.update(u, f, function(e, n, r) {
				o() && (n ? (p.style.color = "#000", d.state = d.newState, d.textContent = {
					true: ln,
					false: un,
					null: dn
				}[d.state]) : (u.why && t.holds(u.subject, u.predicate, u.object, u.why) && D(" @@@@@ weird if 409 - does hold statement"), l(r)));
			});
			e && typeof e.then == "function" && e.catch(function(e) {
				o() && l(e instanceof Error ? e.message : e);
			}).finally(function() {
				o();
			});
		} catch (e) {
			throw o(), e;
		}
	}, !1), c;
}
function $(e) {
	let t = /* @__PURE__ */ new Date();
	return o(e.uri + "#id" + t.getTime());
}
function jn(e, n, r, i, a, s, c, l, u, d, p) {
	let m = {}, h = r.updater.editable(d.uri);
	for (let e = 0; e < s.length; e++) {
		let t = s[e];
		!t.uri || t.uri in m || (m[t.uri] = !0);
	}
	if (Object.keys(m).length === 0 && !u.mint) return L(e, "Can't do selector with no options, subject= " + i + " property = " + a + ".");
	_("makeSelectForChoice: dataDoc=" + d);
	function g() {
		let e = "--- choice ---";
		return a && a.termType !== "BlankNode" && (e = "* Select for property: " + w(a) + " *"), i && i.termType !== "BlankNode" && (e = "* Select for " + w(i, !0) + " *"), e;
	}
	function v() {
		let t = e.createElement("option");
		return t.appendChild(e.createTextNode(g())), t.disabled = !0, t.value = !0, t.hidden = !0, t.selected = !0, t;
	}
	let y = function(e) {
		n.removeChild(n.lastChild), S.refresh();
	}, S = e.createElement("select");
	S.setAttribute("style", C.formSelectStyle), S.setAttribute("id", "formSelect"), S.currentURI = null;
	for (let e in m) S.appendChild(T(e));
	if (h && u.mint) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(u.mint)), t.AJAR_mint = !0, S.insertBefore(t, S.firstChild);
	}
	S.children.length === 0 && S.insertBefore(v(), S.firstChild), S.update = function(n) {
		c = n;
		let s = [], u = [], m = function(e) {
			r.holds(i, a, e, d) && s.push(t(i, a, e, d));
		}, h = function(e) {
			r.holds(i, a, e, d) || u.push(t(i, a, e, d)), l && !r.holds(e, f.rdf("type"), r.sym(l), d) && u.push(t(e, f.rdf("type"), r.sym(l), d));
		}, g = r.each(i, a, null, d).map((e) => e.value);
		for (let e of g) Mn(e, c) || m(o(e));
		for (let e of c) e in g || h(o(e));
		r.updater.update(s, u, function(t, n, r) {
			if (!n) return S.parentNode.appendChild(L(e, "Error updating data in select: " + r));
			S.refresh(), p && p(n, {
				widget: "select",
				event: "change"
			});
		});
	}, S.refresh = function() {
		S.disabled = !0;
		let s = [], m;
		for (let n = 0; n < S.options.length; n++) {
			let o = S.options[n];
			if (o.selected && o.AJAR_mint) {
				if (u.mintClass) {
					let t = wn(e, r, i, a, l, u.subForm, d, function(e, t) {
						e || p(e, t, { change: "new" });
					});
					S.parentNode.appendChild(t), m = t.AJAR_subject;
				} else m = $(d);
				s.push(t(i, a, r.sym(m), d)), l && s.push(t(m, f.rdf("type"), r.sym(l), d)), u.mintStatementsFun && (s = s.concat(u.mintStatementsFun(m))), S.currentURI = m;
			}
			o.AJAR_uri && (o.selected && Mn(o.AJAR_uri, c) && (S.currentURI = o.AJAR_uri), Mn(o.AJAR_uri, c) || o.removeAttribute("selected"), Mn(o.AJAR_uri, c) && o.setAttribute("selected", "true"));
		}
		x("selectForOptions: data doc = " + d), S.currentURI && u.subForm && !u.multiSelect && hn(e, n, {}, o(S.currentURI), u.subForm, d, function(t, i) {
			t ? (r.updater.update([], s, function(t, r, i) {
				r || n.appendChild(L(e, "Error updating select: " + i));
			}), p && p(t, {
				widget: "select",
				event: "new"
			})) : n.appendChild(L(e, "Error updating data in field of select: " + i));
		}), S.disabled = !1;
	};
	function T(t) {
		let n = e.createElement("option"), i = r.sym(t), a;
		a = u.disambiguate ? b(i, !0) : w(i, !0), n.appendChild(e.createTextNode(a)), n.setAttribute("value", t);
		let o = r.any(i, r.sym("http://www.w3.org/ns/ui#backgroundColor"));
		return o && n.setAttribute("style", "background-color: " + o.value + "; "), n.AJAR_uri = t, Mn(i.value, c) && n.setAttribute("selected", "true"), n;
	}
	return h && S.addEventListener("change", y, !1), S;
}
function Mn(e, t) {
	let n = 0;
	for (; n < t.length; n++) if (t[n] === e) return !0;
	return !1;
}
function Nn(e, t, n) {
	let r, i, a, o, s, c, l, u, d, f, p, m = {};
	m[t.toNT()] = !0;
	let h = {}, g = e.transitiveClosure(m, e.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#subClassOf"), !0);
	for (let t in g) {
		s = e.statementsMatching(null, e.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), e.fromNT(t), n);
		for (let e = 0, t = s.length; e < t; e++) f = s[e], h[f.subject.toNT()] = f;
		c = e.each(null, e.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#domain"), e.fromNT(t), n);
		for (let t = 0, i = c.length; t < i; t++) for (o = c[t], l = e.statementsMatching(null, o, null, n), a = 0, r = l.length; a < r; a++) f = l[a], h[f.subject.toNT()] = f;
		u = e.each(null, e.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#range"), e.fromNT(t), n);
		for (let t = 0, r = u.length; t < r; t++) for (o = u[t], d = e.statementsMatching(null, o, null, n), p = 0, i = d.length; p < i; p++) f = d[p], h[f.object.toNT()] = f;
	}
	return h;
}
// src/widgets/index.js
var Pn = /* @__PURE__ */ c({
	Group: () => le,
	GroupBuilder: () => ue,
	GroupPicker: () => ce,
	PeoplePicker: () => se,
	Person: () => de,
	addStyleSheet: () => ct,
	allClassURIs: () => Qe,
	appendForm: () => _n,
	askName: () => He,
	attachmentList: () => Ye,
	basicField: () => Y,
	buildCheckboxForm: () => An,
	button: () => U,
	cancelButton: () => W,
	clearElement: () => Te,
	complain: () => we,
	continueButton: () => Ve,
	createLinkDiv: () => Ke,
	createLinkForURI: () => be,
	createNameDiv: () => Ge,
	defaultAnnotationStore: () => Ze,
	deleteButtonWithCheck: () => H,
	editFormButton: () => gn,
	errorMessageBlock: () => L,
	extractLogURI: () => Ee,
	faviconOrDefault: () => ze,
	field: () => K,
	fieldFunction: () => q,
	fieldLabel: () => yt,
	fieldParams: () => pt,
	fieldStore: () => bt,
	fileUploadButtonDiv: () => ft,
	findClosest: () => yn,
	findImage: () => Ie,
	findImageFromURI: () => Fe,
	formatDateTime: () => Oe,
	formsFor: () => bn,
	iconForClass: () => Ne,
	imagesOf: () => Me,
	index: () => G,
	isAudio: () => lt,
	isImage: () => dt,
	isVideo: () => ut,
	linkButton: () => et,
	linkIcon: () => ye,
	makeDescription: () => Tn,
	makeDraggable: () => re,
	makeDropTarget: () => I,
	makeSelectForCategory: () => On,
	makeSelectForChoice: () => jn,
	makeSelectForClassifierOptions: () => En,
	makeSelectForNestedCategory: () => kn,
	makeSelectForOptions: () => Dn,
	mostSpecificClassURI: () => ht,
	newButton: () => Cn,
	newThing: () => $,
	openHrefInOutlineMode: () => Xe,
	personTR: () => Ue,
	promptForNew: () => wn,
	propertiesForClass: () => vn,
	propertyTriage: () => $e,
	publicData: () => Dt,
	refreshTree: () => Je,
	removeButton: () => tt,
	renderAsDiv: () => qe,
	renderAsRow: () => We,
	renderAutoComplete: () => tn,
	renderAutocompleteControl: () => sn,
	renderNameValuePair: () => vt,
	selectorPanel: () => nt,
	selectorPanelRefresh: () => rt,
	setImage: () => Re,
	setName: () => je,
	setVisible: () => Z,
	shortDate: () => De,
	shortTime: () => Ae,
	sortByLabel: () => Sn,
	sortBySequence: () => xn,
	timestamp: () => ke,
	uploadFiles: () => ie
});
export { I as C, A as D, D as E, O, re as S, k as T, Je as _, xt as a, R as b, W as c, Ve as d, H as f, Ue as g, Xe as h, $ as i, Te as l, Ne as m, _n as n, He as o, Ie as p, An as r, U as s, Pn as t, we as u, Re as v, ie as w, L as x, De as y };

//# sourceMappingURL=widgets-1XsPS-SN.js.map