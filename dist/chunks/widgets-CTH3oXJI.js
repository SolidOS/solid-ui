import { D as e, E as t, F as n, G as r, H as i, K as a, L as o, N as s, O as c, V as l, b as u, q as d, t as f, u as p, z as m } from "./solidLogicSingleton.esm-CKYdvLzf.js";
import { a as h, c as g, f as _, i as v, n as y, o as b, p as x, s as S, t as C, u as w } from "./style-Du-nyh8u.js";
import { n as T, t as E } from "./index.esm-BYrQu5rV.js";
import "./square-arrow-out-up-right-DaALlpHo.js";
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
var j = /* @__PURE__ */ r(((e, t) => {
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
function F() {
	return crypto.getRandomValues(P);
}
// node_modules/uuid/dist/v4.js
function ee(e, t, n) {
	return !t && !e && crypto.randomUUID ? crypto.randomUUID() : te(e, t, n);
}
function te(e, t, n) {
	e ||= {};
	let r = e.random ?? e.rng?.() ?? F();
	if (r.length < 16) throw Error("Random bytes length must be >= 16");
	if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
		if (n ||= 0, n < 0 || n + 16 > t.length) throw RangeError(`UUID byte range ${n}:${n + 15} is out of buffer bounds`);
		for (let e = 0; e < 16; ++e) t[n + e] = r[e];
		return t;
	}
	return N(r);
}
// src/widgets/dragAndDrop.js
var I = /* @__PURE__ */ d(p());
function L(e, t, n) {
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
function ne(e, t) {
	e.setAttribute("draggable", "true"), e.addEventListener("dragstart", function(n) {
		e.style.fontWeight = "bold", n.dataTransfer.setData("text/uri-list", t.uri), n.dataTransfer.setData("text/plain", t.uri), n.dataTransfer.setData("text/html", e.outerHTML), D("Dragstart: " + e + " -> " + t + "de: " + n.dataTransfer.dropEffect);
	}, !1), e.addEventListener("drag", function(e) {
		e.preventDefault(), e.stopPropagation();
	}, !1), e.addEventListener("dragend", function(n) {
		e.style.fontWeight = "normal", D("Dragend dropeffect: " + n.dataTransfer.dropEffect), D("Dragend: " + e + " -> " + t);
	}, !1);
}
function re(e, t, n, r, i) {
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
					if (l = I.lookup(t.name), !l) {
						let e = "Filename needs to have an extension which gives a type we know: " + t.name;
						throw D(e), alert(e), Error(e);
					}
				} else {
					let e = I.extension(t.type);
					e && e !== "false" && !t.name.endsWith("." + e) && t.type !== I.lookup(t.name) && (c = "_." + e);
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
function R(e, t, n, r) {
	let i = e.createElement("div"), a = r || t instanceof Error ? t : null;
	return a ? (console.error(`errorMessageBlock: ${a} at: ${a.stack || "??"}`, a), i.textContent = a.message) : i.textContent = t, i.appendChild(G(e, () => {
		i.parentNode && i.parentNode.removeChild(i);
	})).style = C.errorCancelButton, i.setAttribute("style", C.errorMessageBlockStyle), i.style.backgroundColor = n || y.defaultErrorBackgroundColor, i;
}
// src/lib/iconBase.ts
var ie = "https://solidos.github.io/solid-ui/src", z = typeof module < "u" && module.scriptURI ? {
	iconBase: module.scriptURI.slice(0, module.scriptURI.lastIndexOf("/")) + "/icons/",
	originalIconBase: module.scriptURI.slice(0, module.scriptURI.lastIndexOf("/")) + "/originalIcons/"
} : typeof $SolidTestEnvironment < "u" && $SolidTestEnvironment.iconBase ? {
	iconBase: $SolidTestEnvironment.iconBase,
	originalIconBase: $SolidTestEnvironment.originalIconBase
} : {
	iconBase: ie + "/icons/",
	originalIconBase: ie + "/originalIcons/"
};
D("   icons.iconBase is set to : " + z.iconBase);
var ae = z.iconBase;
z.originalIconBase;
// src/widgets/peoplePicker.js
var B = /* @__PURE__ */ d(j()), V = f.store, oe = class {
	constructor(e, t, n, r) {
		this.options = r || {}, this.element = e, this.typeIndex = t, this.groupPickedCb = n, this.selectedgroup = this.options.selectedgroup, this.onSelectGroup = this.onSelectGroup.bind(this);
	}
	render() {
		let e = document.createElement("div");
		if (e.style.maxWidth = "350px", e.style.minHeight = "200px", e.style.outline = "1px solid black", e.style.display = "flex", this.selectedgroup) {
			e.style.flexDirection = "column";
			let t = document.createElement("div");
			new ce(t, this.selectedgroup).render();
			let n = document.createElement("button");
			n.textContent = (0, B.default)("Change group"), n.addEventListener("click", (e) => {
				this.selectedgroup = null, this.render();
			}), e.appendChild(t), e.appendChild(n);
		} else this.findAddressBook(this.typeIndex).then(({ book: t }) => {
			let n = document.createElement("button");
			n.textContent = (0, B.default)("Pick an existing group"), n.style.margin = "auto", n.addEventListener("click", (n) => {
				new se(e, t, this.onSelectGroup).render();
			});
			let r = document.createElement("button");
			r.textContent = (0, B.default)("Create a new group"), r.style.margin = "auto", r.addEventListener("click", (e) => {
				this.createNewGroup(t, this.options.defaultNewGroupName).then(({ group: e }) => {
					new le(this.element, t, e, this.onSelectGroup).render();
				}).catch((e) => {
					this.element.appendChild(R(document, (0, B.default)(`Error creating a new group. (${e})`)));
				});
			}), e.appendChild(n), e.appendChild(r), this.element.innerHTML = "", this.element.appendChild(e);
		}).catch((e) => {
			this.element.appendChild(R(document, (0, B.default)(`Could find your groups. (${e})`)));
		});
		return this.element.innerHTML = "", this.element.appendChild(e), this;
	}
	findAddressBook(e) {
		return new Promise((t, n) => {
			V.fetcher.nowOrWhenFetched(e, (r, i) => {
				if (!r) return n(i);
				let a = V.any(null, u.solid("forClass"), u.vcard("AddressBook"));
				if (!a) return n(/* @__PURE__ */ Error("no address book registered in the solid type index " + e));
				let o = V.any(a, u.solid("instance"));
				if (!o) return n(/* @__PURE__ */ Error("incomplete address book registration"));
				V.fetcher.load(o).then(function(e) {
					return t({ book: o });
				}).catch(function(e) {
					return n(/* @__PURE__ */ Error("Could not load address book " + e));
				});
			});
		});
	}
	createNewGroup(t, n) {
		let { groupIndex: r, groupContainer: i } = pe(t), a = e(`${i.uri}${ee().slice(0, 8)}.ttl#this`), o = n || "Untitled Group", s = [a.doc(), r].map((e) => {
			let n = c(a, u.rdf("type"), u.vcard("Group"), e), i = c(a, u.vcard("fn"), o, a.doc(), e), s = c(t, u.vcard("includesGroup"), a, e), l = e.equals(r) ? [
				n,
				i,
				s
			] : [n, i];
			return fe(e.uri, { toIns: l }).then(() => {
				l.forEach((e) => {
					V.add(e);
				});
			});
		});
		return Promise.all(s).then(() => ({ group: a })).catch((e) => {
			throw D("Could not create new group.  PATCH failed " + e), Error(`Couldn't create new group.  PATCH failed for (${e.xhr ? e.xhr.responseURL : ""} )`);
		});
	}
	onSelectGroup(e) {
		this.selectedgroup = e, this.groupPickedCb(e), this.render();
	}
}, se = class {
	constructor(e, t, n) {
		this.element = e, this.book = t, this.onSelectGroup = n;
	}
	render() {
		return this.loadGroups().then((e) => {
			let t = document.createElement("div");
			t.style.display = "flex", t.style.flexDirection = "column", e.forEach((e) => {
				let n = document.createElement("button");
				n.addEventListener("click", this.handleClickGroup(e)), new ce(n, e).render(), t.appendChild(n);
			}), this.element.innerHTML = "", this.element.appendChild(t);
		}).catch((e) => {
			this.element.appendChild(R(document, (0, B.default)(`There was an error loading your groups. (${e})`)));
		}), this;
	}
	loadGroups() {
		return new Promise((e, t) => {
			let { groupIndex: n } = pe(this.book);
			V.fetcher.nowOrWhenFetched(n, (n, r) => n ? e(V.each(this.book, u.vcard("includesGroup"))) : t(r));
		});
	}
	handleClickGroup(e) {
		return (t) => {
			this.onSelectGroup(e);
		};
	}
}, ce = class {
	constructor(e, t) {
		this.element = e, this.group = t;
	}
	render() {
		let e = document.createElement("div");
		return e.textContent = (0, B.default)(de(this.group, u.vcard("fn"), `[${this.group.value}]`)), this.element.innerHTML = "", this.element.appendChild(e), this;
	}
}, le = class {
	constructor(e, t, n, r, i) {
		this.element = e, this.book = t, this.group = n, this.onGroupChanged = (e, t, n) => {
			i && i(e, t, n);
		}, this.groupChangedCb = i, this.doneBuildingCb = r;
	}
	refresh() {}
	render() {
		let e = document.createElement("div");
		e.style.maxWidth = "350px", e.style.minHeight = "200px", e.style.outline = "1px solid black", e.style.display = "flex", e.style.flexDirection = "column", L(e, (e) => {
			e.forEach((e) => {
				this.add(e).catch((e) => {
					this.element.appendChild(R(document, (0, B.default)(`Could not add the given WebId. (${e})`)));
				});
			});
		});
		let t = document.createElement("input");
		t.type = "text", t.value = de(this.group, u.vcard("fn"), "Untitled Group"), t.addEventListener("change", (e) => {
			this.setGroupName(e.target.value).catch((e) => {
				this.element.appendChild(R(document, `Error changing group name. (${e})`));
			});
		});
		let n = document.createElement("label");
		if (n.textContent = (0, B.default)("Group Name:"), n.appendChild(t), e.appendChild(n), V.any(this.group, u.vcard("hasMember"))) V.match(this.group, u.vcard("hasMember")).forEach((t) => {
			let n = t.object, r = document.createElement("div");
			new ue(r, n, this.handleRemove(n)).render(), e.appendChild(r);
		});
		else {
			let t = document.createElement("p");
			t.textContent = B.default`
        To add someone to this group, drag and drop their WebID URL onto the box.
      `, e.appendChild(t);
		}
		let r = document.createElement("button");
		return r.textContent = (0, B.default)("Done"), r.addEventListener("click", (e) => {
			this.doneBuildingCb(this.group);
		}), e.appendChild(r), this.element.innerHTML = "", this.element.appendChild(e), this;
	}
	add(t) {
		return new Promise((n, r) => {
			V.fetcher.nowOrWhenFetched(t, (i, a) => {
				if (!i) return this.onGroupChanged(a), r(a);
				let o = e(t), s = V.any(o, u.rdf("type"));
				return !s || !s.equals(u.foaf("Person")) ? r(/* @__PURE__ */ Error(`Only people supported right now. (tried to add something of type ${s.value})`)) : n(o);
			});
		}).then((e) => {
			let t = c(this.group, u.vcard("hasMember"), e);
			return V.holdsStatement(t) ? e : fe(this.group.doc().uri, { toIns: [t] }).then(() => {
				t.why = this.group.doc(), V.add(t), this.onGroupChanged(null, "added", e), this.render();
			});
		});
	}
	handleRemove(e) {
		return (t) => {
			let n = c(this.group, u.vcard("hasMember"), e);
			return fe(this.group.doc().uri, { toDel: [n] }).then(() => (V.remove(n), this.onGroupChanged(null, "removed", e), this.render(), !0)).catch((t) => {
				let n = V.any(e, u.foaf("name")), r = n && n.value ? `Could not remove ${n.value}. (${t})` : `Could not remove ${e.value}. (${t})`;
				throw Error(r);
			});
		};
	}
	setGroupName(e) {
		let { groupIndex: n } = pe(this.book), r = [this.group.doc(), n].map((n) => {
			let r = V.match(this.group, u.vcard("fn"), null, n), i = c(this.group, u.vcard("fn"), t(e));
			return fe(n.value, {
				toDel: r,
				toIns: [i]
			}).then((e) => {
				V.removeStatements(r), i.why = n, V.add(i);
			});
		});
		return Promise.all(r);
	}
}, ue = class {
	constructor(e, t, n) {
		this.webIdNode = t, this.element = e, this.handleRemove = n;
	}
	render() {
		let e = document.createElement("div");
		e.style.display = "flex";
		let t = de(this.webIdNode, u.foaf("img"), ae + "noun_15059.svg"), n = document.createElement("img");
		n.src = (0, B.default)(t), n.width = "50", n.height = "50", n.style.margin = "5px";
		let r = de(this.webIdNode, u.foaf("name"), `[${this.webIdNode}]`), i = document.createElement("span");
		i.innerHTML = (0, B.default)(r), i.style.flexGrow = "1", i.style.margin = "auto 0";
		let a = document.createElement("button");
		return a.textContent = "Remove", a.addEventListener("click", (e) => this.handleRemove().catch((e) => {
			this.element.appendChild(R(document, (0, B.default)(`${e}`)));
		})), a.style.margin = "5px", e.appendChild(n), e.appendChild(i), e.appendChild(a), this.element.innerHTML = "", this.element.appendChild(e), this;
	}
};
function de(e, t, n) {
	let r = V.any(e, t);
	return r ? r.value : n;
}
function fe(e, { toDel: t, toIns: n }) {
	return new Promise((e, r) => {
		V.updater.update(t, n, (t, n, i) => {
			if (!n) return r(/* @__PURE__ */ Error(`PATCH failed for resource <${t}>: ${i}`));
			e();
		});
	});
}
function pe(e) {
	return {
		groupIndex: V.any(e, u.vcard("groupIndex")),
		groupContainer: V.sym(e.dir().uri + "Group/")
	};
}
// src/lib/newperson.js
var me = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjAxNTcgOS4yNzM2M0MxNC4yOTU0IDguMzQwMzEgMTUuMTI4OCA2LjgyOTg0IDE1LjEyODggNS4xMjgyQzE1LjEyODggMi4zMDA1MSAxMi44MjgzIDAgMTAuMDAwNiAwQzcuMTcyODkgMCA0Ljg3MjM4IDIuMzAwNTEgNC44NzIzOCA1LjEyODJDNC44NzIzOCA2LjgyOTg0IDUuNzA1NyA4LjM0MDMxIDYuOTg1NDcgOS4yNzM2M0MzLjgwNDIyIDEwLjQ5MSAxLjUzOTA2IDEzLjU3NTQgMS41MzkwNiAxNy4xNzk1QzEuNTM5MDYgMTguNzM0NyAyLjgwNDM0IDIwIDQuMzU5NTcgMjBIMTUuNjQxNkMxNy4xOTY4IDIwIDE4LjQ2MjEgMTguNzM0NyAxOC40NjIxIDE3LjE3OTVDMTguNDYyMSAxMy41NzU0IDE2LjE5NyAxMC40OTEgMTMuMDE1NyA5LjI3MzYzWk02LjQxMDg2IDUuMTI4MkM2LjQxMDg2IDMuMTQ4ODMgOC4wMjEyMSAxLjUzODQ4IDEwLjAwMDYgMS41Mzg0OEMxMS45OCAxLjUzODQ4IDEzLjU5MDMgMy4xNDg4MyAxMy41OTAzIDUuMTI4MkMxMy41OTAzIDcuMTA3NTggMTEuOTggOC43MTc5NyAxMC4wMDA2IDguNzE3OTdDOC4wMjEyMSA4LjcxNzk3IDYuNDEwODYgNy4xMDc1OCA2LjQxMDg2IDUuMTI4MlpNMTUuNjQxNiAxOC40NjE1SDQuMzU5NTdDMy42NTI2NiAxOC40NjE1IDMuMDc3NTQgMTcuODg2NCAzLjA3NzU0IDE3LjE3OTVDMy4wNzc1NCAxMy4zNjIgNi4xODMxNiAxMC4yNTY0IDEwLjAwMDYgMTAuMjU2NEMxMy44MTgxIDEwLjI1NjQgMTYuOTIzNyAxMy4zNjIgMTYuOTIzNyAxNy4xNzk1QzE2LjkyMzcgMTcuODg2NCAxNi4zNDg2IDE4LjQ2MTUgMTUuNjQxNiAxOC40NjE1WiIgZmlsbD0iIzMxNDE1OCIvPgo8L3N2Zz4K", he = (e, t, n) => {
	let r = e.createElement("tr");
	return r.appendChild(e.createElement("td")).appendChild(t), r.subject = n, r;
}, ge = (e, t) => {
	e.addEventListener("click", t);
}, _e = (e, t, n) => {
	let r = t.appendChild(e.createElement("div"));
	r.setAttribute("style", C.imageDivStyle), r.appendChild(n), n.setAttribute("draggable", "false");
};
// src/widgets/buttons/iconLinks.ts
function ve(e, t, n) {
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
var ye = (e, t, n) => {
	let r = ve(e, n);
	t.appendChild(r).classList.add("HoverControlHide"), t.appendChild(e.createElement("br"));
}, { iconBase: H } = z, be = H + "noun_1180156.svg", xe = H + "noun_1180158.svg";
function Se(e) {
	let t = e && e.statusArea || e && e.div || null;
	if (t) return t;
	let n = e && e.dom;
	if (!n && typeof document < "u" && (n = document), n) {
		let r = n.getElementsByTagName("body")[0];
		return t = n.createElement("div"), r.insertBefore(t, r.firstElementChild), e && (e.statusArea = t), t;
	}
	return null;
}
function Ce(e, t) {
	if (!t) return;
	let n = Se(e);
	D("Complaint: " + t), n ? n.appendChild(R(e && e.dom || document, t)) : alert(t);
}
function we(e) {
	for (; e.firstChild;) e.removeChild(e.firstChild);
	return e;
}
function Te(e) {
	let t = e.search(/logFile=/), n = e.search(/&rulesFile=/);
	return e.substring(t + 8, n);
}
function Ee(e, t) {
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
function De(e, t) {
	return t.split("{").map(function(t) {
		let n = t.split("}")[0];
		return t ? ("000" + (e["get" + n]() + ({ Month: 1 }[n] || 0))).slice(-({
			Milliseconds: 3,
			FullYear: 4
		}[n] || 2)) + t.split("}")[1] : "";
	}).join("");
}
function Oe() {
	return De(/* @__PURE__ */ new Date(), "{FullYear}-{Month}-{Date}T{Hours}:{Minutes}:{Seconds}.{Milliseconds}");
}
function ke() {
	return De(/* @__PURE__ */ new Date(), "{Hours}:{Minutes}:{Seconds}.{Milliseconds}");
}
function Ae(e, t) {
	let n = E, r = function(e) {
		let t = n.any(e, u.vcard("fn")) || n.any(e, u.foaf("name")) || n.any(e, u.vcard("organization-name"));
		return t ? t.value : null;
	}, i = t.sameTerm(u.foaf("Agent")) ? "Everyone" : r(t);
	if (e.textContent = i || w(t), !i && t.uri) {
		if (!n.fetcher) throw Error("kb has no fetcher");
		n.fetcher.nowOrWhenFetched(t.doc(), void 0, function(n) {
			e.textContent = r(t) || w(t);
		});
	}
}
function je(e, t) {
	return t.each(e, u.sioc("avatar")).concat(t.each(e, u.foaf("img"))).concat(t.each(e, u.vcard("logo"))).concat(t.each(e, u.vcard("hasPhoto"))).concat(t.each(e, u.vcard("photo"))).concat(t.each(e, u.foaf("depiction")));
}
var Me = {
	"solid:AppProviderClass": "noun_144.svg",
	"solid:AppProvider": "noun_15177.svg",
	"solid:Pod": "noun_Cabinet_1434380.svg",
	"vcard:Group": "noun_339237.svg",
	"vcard:Organization": "noun_143899.svg",
	"vcard:Individual": me,
	"schema:Person": me,
	"foaf:Person": me,
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
function Ne(e) {
	let t = e.uri.split("#")[0], n = t.indexOf("//");
	if (n < 0) throw Error("This URI does not have a web site part (origin)");
	let r = t.indexOf("/", n + 2);
	return r < 0 ? t.slice(0) + "/" : t.slice(0, r + 1);
}
function Pe(e) {
	let t = H;
	return typeof e != "string" && e.uri ? e.uri.split("/").length === 4 && !e.uri.split("/")[1] && !e.uri.split("/")[3] ? t + "noun_15177.svg" : e.uri.startsWith("message:") || e.uri.startsWith("mid:") ? t + "noun_480183.svg" : e.uri.startsWith("mailto:") ? t + "noun_567486.svg" : e.uri.startsWith("https:") && e.uri.indexOf("#") < 0 ? Ne(e) + "favicon.ico" : null : t + "noun_10636_grey.svg";
}
function Fe(e) {
	let t = E, n = H;
	if (e.sameTerm(u.foaf("Agent")) || e.sameTerm(u.rdf("Resource"))) return n + "noun_98053.svg";
	let r = t.any(e, u.sioc("avatar")) || t.any(e, u.foaf("img")) || t.any(e, u.vcard("logo")) || t.any(e, u.vcard("hasPhoto")) || t.any(e, u.vcard("photo")) || t.any(e, u.foaf("depiction"));
	return r ? r.uri : null;
}
function Ie(e, t, n) {
	let r = E, i = Fe(t);
	if (i) return e.setAttribute("src", i), !0;
	let a = n[t.uri];
	if (a) return e.setAttribute("src", a), e.style = C.classIconStyle, !0;
	let o = Pe(t);
	if (o) return e.setAttribute("src", o), !0;
	let s = r.findTypeURIs(t);
	for (let t in s) if (n[t]) return e.setAttribute("src", n[t]), !1;
	return e.setAttribute("src", H + "noun_10636_grey.svg"), !1;
}
function Le(e, t) {
	let n = E, r = {};
	for (let e in Me) {
		let t = e.split(":")[0], n = e.split(":")[1], i = u[t](n), a = Me[e];
		a.startsWith("data:") ? r[i.uri] = a : r[i.uri] = m(a, H);
	}
	if (!Ie(e, t, r) && t.uri) {
		if (!n.fetcher) throw Error("kb has no fetcher");
		n.fetcher.nowOrWhenFetched(t.doc(), void 0, (n) => {
			n && Ie(e, t, r);
		});
	}
}
function Re(e, t) {
	let n = e.createElement("img");
	if (n.style = C.iconStyle, n.setAttribute("src", H + (function(e) {
		if (!e.uri) return !1;
		let t = e.uri.split("/");
		return t.length === 3 || t.length === 4 && t[3] === "";
	}(t) ? "noun_15177.svg" : "noun_681601.svg")), t.uri && t.uri.startsWith("https:") && t.uri.indexOf("#") < 0) {
		let r = e.createElement("object");
		return r.setAttribute("data", Ne(t) + "favicon.ico"), r.setAttribute("type", "image/x-icon"), r.appendChild(n), r;
	}
	return Le(n, t), n;
}
function ze(e, t, n, r, i) {
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
	let u = G(e, a);
	s.appendChild(u), u.style.gridColumn = "1", u.style.gridRow = "2";
	let d = s.appendChild(e.createElement("button"));
	d.style.cssText = C.buttonStyle, d.style.gridRow = "2", d.style.gridColumn = "2", d.textContent = "Cancel";
	let f = W(e, z.iconBase + "noun_925021.svg", "Delete it");
	s.appendChild(f), f.style.gridRow = "1", f.style.gridColumn = "1";
	let p = s.appendChild(e.createElement("button"));
	return p.style.cssText = C.buttonStyle, p.style.gridRow = "1", p.style.gridColumn = "2", p.textContent = n, s.appendChild(p), f.addEventListener("click", o), p.addEventListener("click", o), d.addEventListener("click", a), s;
}
function U(e, t, n, r, i) {
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
		let u = ze(e, l, c, r, o);
		l.appendChild(u), i && (u.style.position = "static", u.style.top = "", Array.from(u.querySelectorAll("button")).find((e) => e.textContent === "Cancel")?.focus());
	}
	let o = H + "noun_2188_red.svg", s = e.createElement("img");
	s.setAttribute("src", o), s.tabIndex = 0, s.setAttribute("role", "button"), s.setAttribute("style", C.smallButtonStyle), s.style.float = "right";
	let c = "Remove this " + n;
	return s.title = c, s.setAttribute("aria-label", c), s.classList.add("hoverControlHide"), s.addEventListener("click", a), s.addEventListener("keydown", (e) => {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), s.click());
	}), t.classList.add("hoverControl"), t.appendChild(s), s.setAttribute("data-testid", "deleteButtonWithCheck"), s;
}
function W(e, t, n, r, i = {
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
function G(e, t) {
	let n = W(e, be, "Cancel", t);
	return n.firstChild && (n.firstChild.style.opacity = "0.3"), n;
}
function Be(e, t) {
	return W(e, xe, "Continue", t);
}
function Ve(e, t, n, r, i, a) {
	return new Promise(function(t, o) {
		let s = e.createElement("div");
		r ||= u.foaf("name"), a ||= i ? w(i) : "  ";
		let c = a + " " + w(r) + ": ";
		s.appendChild(e.createElement("p")).textContent = c;
		let l = e.createElement("input");
		l.setAttribute("type", "text"), l.setAttribute("size", "100"), l.setAttribute("maxLength", "2048"), l.setAttribute("style", C.textInputStyle), l.select(), s.appendChild(l), n.appendChild(s);
		function d() {
			s.parentNode.removeChild(s), t(l.value.trim());
		}
		l.addEventListener("keyup", function(e) {
			e.keyCode === 13 && d();
		}, !1), s.appendChild(e.createElement("br")), s.appendChild(G(e, function(e) {
			s.parentNode.removeChild(s), t(null);
		})), s.appendChild(Be(e, function(e) {
			d();
		})), l.focus();
	});
}
var He = Ue;
function Ue(e, t, n, r) {
	let i = e.createElement("tr");
	r ||= {};
	let a = i.appendChild(e.createElement("td")), o = i.appendChild(e.createElement("td")), s = i.appendChild(e.createElement("td")), c = r.image || Re(e, n);
	a.setAttribute("style", "vertical-align: middle; width:2.5em; padding:0.5em; height: 2.5em;"), o.setAttribute("style", "vertical-align: middle; text-align:left;"), s.setAttribute("style", "vertical-align: middle; width:2em; padding:0.5em; height: 4em;"), a.appendChild(c);
	let l = o.appendChild(e.createElement("div")), u = l.appendChild(e.createElement("span"));
	if (r.title ? u.textContent = r.title : Ae(u, n), typeof r.renderNameSuffix == "function") {
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
	return r.deleteFunction && U(e, s, r.noun || "one", r.deleteFunction, r.confirmationContainer), n.uri && (r.link !== !1 && (s.appendChild(ve(e, n)).classList.add("HoverControlHide"), s.appendChild(e.createElement("br"))), r.draggable !== !1 && (c.setAttribute("draggable", "false"), ne(i, n))), i.subject = n, i;
}
function We(e, t, n, r) {
	let i = t.appendChild(e.createElement("div"));
	n ? i.textContent = n : Ae(i, r);
}
function Ge(e, t, n, r) {
	let i = t.appendChild(e.createElement("div"));
	i.setAttribute("style", C.linkDivStyle), r.deleteFunction && U(e, i, r.noun || "one", r.deleteFunction, r.confirmationContainer), n.uri && (r.link !== !1 && ye(e, i, n), ne(t, n));
}
function Ke(e, t, n) {
	let r = e.createElement("div");
	return r.setAttribute("style", C.renderAsDivStyle), n ||= {}, _e(e, r, n.image || Re(e, t)), We(e, r, n.title, t), Ge(e, r, t, n), n.clickable && n.onClickFunction && ge(r, n.onClickFunction), n.wrapInATR ? he(e, r, t) : r;
}
function qe(e) {
	if (e.refresh) e.refresh();
	else for (let t = 0; t < e.children.length; t++) qe(e.children[t]);
}
function Je(t, n, r, i = {}) {
	let a = /* @__PURE__ */ new Set(), o = !!(i.renderSupportingInfo || i.renderNameSuffix), s = i.refreshOnDocumentLoad ?? !0, l = function(e) {
		let t = b.updater;
		if (!t) throw Error("kb has no updater");
		return new Promise((r) => t.update(c(n, v, e, h), [], function(e, t, n, i) {
			t ? f() : Ce(void 0, "Error deleting one: " + n), r();
		}));
	};
	function d(e) {
		let n = e, r = { noun: y };
		if (r.renderSupportingInfo = i.renderSupportingInfo, r.renderNameSuffix = i.renderNameSuffix, r.confirmationContainer = i.confirmationContainer, o && s && e?.uri && b.fetcher) {
			let t = e.doc(), n = t?.uri ? b.fetcher.requested?.[t.uri] : void 0, r = n !== "done" && n !== "failed";
			t?.uri && r && !a.has(t.uri) && (a.add(t.uri), b.fetcher.nowOrWhenFetched(t, void 0, () => {
				a.delete(t.uri), f();
			}));
		}
		return g && (r.deleteFunction = function() {
			return l(n);
		}), He(t, v, e, r);
	}
	let f = function() {
		let e = b.each(n, v);
		e.sort(), S(T, e, d, o ? function(e, t) {
			return d(t);
		} : void 0);
	};
	function p(t) {
		let r = [];
		if (t.forEach(function(t) {
			let i = e(t);
			D("Dropped on attachemnt " + t), r.push(c(n, v, i, h));
		}), !b.updater) throw Error("kb has no updater");
		b.updater.update([], r, function(e, t, n, r) {
			t ? f() : Ce(void 0, "Error adding one: " + n);
		});
	}
	function m(e) {
		re(b.fetcher, e, i.uploadFolder?.uri, i.uploadFolder?.uri, function(e, t) {
			let r = [c(n, v, b.sym(t), h)];
			if (!b.updater) throw Error("kb has no updater");
			b.updater.update([], r, function(e, t, n, r) {
				t ? f() : Ce(void 0, "Error adding link to uploaded file: " + n);
			});
		});
	}
	let h = i.doc || n.doc();
	i.modify === void 0 && (i.modify = !0);
	let g = i.modify, _ = i.promptIcon || H + "noun_748003.svg", v = i.predicate || u.wf("attachment"), y = i.noun || "attachment", b = E, x = r.appendChild(t.createElement("table"));
	x.setAttribute("style", "margin-top: 1em; margin-bottom: 1em;");
	let C = x.appendChild(t.createElement("tr")), w = C.appendChild(t.createElement("td")), T = C.appendChild(t.createElement("td")).appendChild(t.createElement("table"));
	if (T.appendChild(t.createElement("tr")), x.refresh = f, f(), g) {
		let e = W(t, _, "Drop attachments here");
		w.appendChild(e);
		let n = i.uploadFolder ? m : null;
		L(e, p, n);
		let r = e.querySelector("img");
		if (r && L(r, p, n), L(w, p, n), i.uploadFolder) {
			let e = ft(t, m);
			w.appendChild(e);
		}
	}
	return x;
}
function Ye(e) {
	e.preventDefault(), e.stopPropagation();
	let t = h(e).getAttribute("href");
	if (!t) return D("openHrefInOutlineMode: No href found!\n");
	let n = window.document;
	n.outlineManager ? n.outlineManager.GotoSubject(E.sym(t), !0, void 0, !0, void 0) : window && window.panes && window.panes.getOutliner ? window.panes.getOutliner().GotoSubject(E.sym(t), !0, void 0, !0, void 0) : D("ERROR: Can't access outline manager in this config");
}
function Xe(e) {
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
function Ze() {
	let e = {};
	return E.statementsMatching(void 0, u.rdf("type"), void 0).forEach(function(t) {
		t.object.value && (e[t.object.value] = !0);
	}), E.statementsMatching(void 0, u.rdfs("subClassOf"), void 0).forEach(function(t) {
		t.object.value && (e[t.object.value] = !0), t.subject.value && (e[t.subject.value] = !0);
	}), E.each(void 0, u.rdf("type"), u.rdfs("Class")).forEach(function(t) {
		t.value && (e[t.value] = !0);
	}), e;
}
function Qe(e) {
	let t = {}, n = {}, r = {}, i = 0, a = 0, o = 0, s = e.predicateIndex;
	for (let e in s) s[e][0].object.termType === "Literal" ? (n[e] = !0, a++) : (r[e] = !0, i++);
	let c = e.each(void 0, u.rdf("type"), u.rdf("Property"));
	for (let e = 0; e < c.length; e++) {
		let t = c[e].toNT();
		!r[t] && !n[t] && (n[t] = !0, r[t] = !0, o++);
	}
	return t.op = r, t.dp = n, x(`propertyTriage: ${i} non-lit, ${a} literal. ${o} unknown.`), t;
}
function $e(e, t) {
	let n = e.createElement("button");
	return n.setAttribute("type", "button"), n.textContent = "Goto " + w(t), n.addEventListener("click", function(n) {
		e.outlineManager.GotoSubject(t, !0, void 0, !0, void 0);
	}, !0), n;
}
function et(e, t) {
	let n = e.createElement("button");
	return n.setAttribute("type", "button"), n.textContent = "✕", n.addEventListener("click", function(e) {
		t.parentNode.removeChild(t);
	}, !0), n;
}
function tt(e, t, n, r, i, a, o, s, c) {
	return nt(e.createElement("div"), e, t, n, r, i, a, o, s, c);
}
function nt(e, t, n, r, i, a, o, s, c, l) {
	let u = "border: 0.1em solid #ddd; border-bottom: none; width: 95%; height: 2em; padding: 0.5em;", d = null;
	e.innerHTML = "";
	let f = function(e, o) {
		let f, p, m = function() {
			let e = a ? n.each(void 0, i, o) : n.each(o, i);
			_.setAttribute("class", e.length === 0 ? "hideTillHover" : ""), p.setAttribute("src", s.connectIcon || H + "noun_25830.svg"), p.setAttribute("title", e.length ? e.length : "attach");
		};
		f = rt.twoLine.widgetForClass(r)(t, o), f.setAttribute("style", u);
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
var rt = {};
function it(e, t) {
	let n = e.createElement("div");
	return n.textContent = w(t), n;
}
function at(e) {
	let t = rt.twoLine[e.uri], n = E;
	if (t) return t;
	let r = n.findSuperClassesNT(e);
	for (let e in r) if (t = rt.twoLine[n.fromNT(e).uri], t) return t;
	return rt.twoLine[""];
}
function ot(e, t) {
	let n = "", r = function(e) {
		let r = E.any(t, u.qu(e));
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
      <td colspan="2">${n(u.dc("title"))}</td>
    </tr>
    <tr style="color: #777">
      <td>${n(u.cal("dtstart"))}</td>
      <td>${n(u.cal("dtend"))}</td>
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
	let n = {
		audio: "http://purl.org/dc/dcmitype/Sound",
		image: "http://purl.org/dc/dcmitype/Image",
		video: "http://purl.org/dc/dcmitype/MovingImage"
	}, r = t || "image", i = E.findTypeURIs(e), a = o(r + "/*").uri.split("*")[0];
	for (let e in i) if (e.startsWith(a)) return !0;
	return n[r] in i;
}
function ft(e, t) {
	let n = e.createElement("div"), r = n.appendChild(e.createElement("input"));
	return r.setAttribute("type", "file"), r.setAttribute("multiple", "true"), r.addEventListener("change", (e) => {
		D("File drop event: ", e), e.files ? t(e.files) : e.target && e.target.files ? t(e.target.files) : alert("Sorry no files .. internal error?");
	}, !1), r.style = "display:none", L(n.appendChild(W(e, H + "noun_Upload_76574_000000.svg", "Upload files", (e) => {
		r.click();
	})), null, t), n;
}
rt = {
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
	[u.ui("ColorField").uri]: {
		size: 9,
		type: "color",
		style: "height: 3em;",
		dt: "color",
		pattern: /^\s*#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]([0-9a-f][0-9a-f])?\s*$/
	},
	[u.ui("DateField").uri]: {
		size: 20,
		type: "date",
		dt: "date",
		pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?Z?\s*$/
	},
	[u.ui("DateTimeField").uri]: {
		size: 20,
		type: "datetime-local",
		dt: "dateTime",
		pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?(T[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?)?Z?\s*$/
	},
	[u.ui("TimeField").uri]: {
		size: 10,
		type: "time",
		dt: "time",
		pattern: /^\s*([0-2]?[0-9]:[0-5][0-9](:[0-5][0-9])?)\s*$/
	},
	[u.ui("IntegerField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "integer",
		pattern: /^\s*-?[0-9]+\s*$/
	},
	[u.ui("DecimalField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "decimal",
		pattern: /^\s*-?[0-9]*(\.[0-9]*)?\s*$/
	},
	[u.ui("FloatField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "float",
		pattern: /^\s*-?[0-9]*(\.[0-9]*)?((e|E)-?[0-9]*)?\s*$/
	},
	[u.ui("SingleLineTextField").uri]: {},
	[u.ui("NamedNodeURIField").uri]: { namedNode: !0 },
	[u.ui("TextField").uri]: {},
	[u.ui("PhoneField").uri]: {
		size: 20,
		uriPrefix: "tel:",
		pattern: /^\+?[\d-]+[\d]*$/
	},
	[u.ui("EmailField").uri]: {
		size: 30,
		uriPrefix: "mailto:",
		pattern: /^\s*.*@.*\..*\s*$/
	},
	[u.ui("Group").uri]: { style: C.formGroupStyle },
	[u.ui("Comment").uri]: {
		element: "p",
		style: C.commentStyle
	},
	[u.ui("Heading").uri]: {
		element: "h3",
		style: C.formHeadingStyle
	}
}, mt = f.store, K = {};
function ht(e) {
	let t = mt, n = t.findTypeURIs(e), r = t.bottomTypeURIs(n), i = [];
	for (let e in r) i.push(e);
	return i[0];
}
function q(e, t) {
	let n = ht(t), r = K[n];
	return _("paneUtils: Going to implement field " + t + " of type " + n), r || function(e, r) {
		let i = R(e, "No handler for field " + t + " of type " + n);
		return r && r.appendChild(i), i;
	};
}
// src/widgets/forms/formStyle.ts
var gt = "https://www.w3.org/ns/css#";
function _t(e, t) {
	let n = pt[ht(t)] || {}, r = E.any(t, u.ui("style"));
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
var J = f.store;
function vt(e, t, n, r, i) {
	n.style.display = "flex", n.style.flexDirection = "row";
	let a = n.appendChild(e.createElement("div"));
	a.style.width = y.formFieldNameBoxWidth;
	let o = n.appendChild(e.createElement("div"));
	return a.setAttribute("class", "formFieldName"), a.setAttribute("style", C.formFieldNameBoxStyle), o.setAttribute("class", "formFieldValue"), i ? a.appendChild(e.createTextNode(i)) : t.any(r, u.ui("property")) ? a.appendChild(yt(e, t.any(r, u.ui("property")), r)) : (o.appendChild(R(e, "No property or label given for form field: " + r)), a.appendChild(e.createTextNode("???"))), o;
}
function yt(e, t, n) {
	let r = J.any(n, u.ui("label"));
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
function Y(e, t, n, r, a, o, s) {
	let l = J, d = a.doc ? a.doc() : null, f = e.createElement("div"), p = l.any(a, u.ui("property"));
	if (t && t.appendChild(f), !p) return f.appendChild(R(e, "Error: No property given for text field: " + a));
	let m = vt(e, l, f, a), h = l.anyJS(a, u.ui("suppressEmptyUneditable"), null, d), g = pt[ht(a)];
	g === void 0 && (g = { style: "" });
	let _ = g.style || "", v = C.textInputStyle + _, b = e.createElement("input");
	b.style = v, m.appendChild(b), b.setAttribute("type", g.type ? g.type : "text");
	let x = (b.getAttribute("type") || "").toLowerCase(), S = x === "date" || x === "datetime-local", w = l.anyJS(a, u.ui("size")) || y.textInputSize || 20;
	b.setAttribute("size", w);
	let T = l.any(a, u.ui("maxLength"));
	b.setAttribute("maxLength", T ? "" + T : y.basicMaxLength), o ||= bt(r, p, o);
	let E = l.any(r, p, void 0, o);
	if (E ||= l.any(a, u.ui("default")), E && E.value && g.uriPrefix ? b.value = decodeURIComponent(E.value.replace(g.uriPrefix, "")).replace(/ /g, "") : E && 
	/* istanbul ignore next */
	(b.value = E.value || E.value || ""), b.setAttribute("style", v), !l.updater) throw Error("kb has no updater");
	return l.updater.editable(o.uri) ? (b.addEventListener("keyup", function(e) {
		g.pattern && b.setAttribute("style", v + (b.value.match(g.pattern) ? "color: green;" : "color: red;"));
	}, !0), b.addEventListener("change", function(t) {
		if (S && e.activeElement === b) {
			b.dataset && (b.dataset.deferredChange = "true");
			return;
		}
		if (g.pattern && !b.value.match(g.pattern)) return;
		let n = !S;
		n && (b.disabled = !0), b.setAttribute("style", v + "color: gray;");
		let a = l.statementsMatching(r, p), d;
		g.namedNode ? d = l.sym(b.value) : g.uriPrefix ? (d = encodeURIComponent(b.value.replace(/ /g, "")), d = l.sym(g.uriPrefix + b.value)) : d = g.dt ? new i(b.value.trim(), void 0, u.xsd(g.dt)) : new i(b.value);
		let m = a.map((e) => c(e.subject, e.predicate, d, e.why));
		m.length === 0 && (m = [c(r, p, d, o)]);
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
		h(a, m, function(t, r, i) {
			r ? (n && (b.disabled = !1), b.setAttribute("style", v)) : f.appendChild(R(e, i)), s(r, i);
		});
	}, !0), b.addEventListener("blur", function(e) {
		if (S && b.dataset && b.dataset.deferredChange === "true") {
			delete b.dataset.deferredChange;
			let e = new Event("change", { bubbles: !0 });
			b.dispatchEvent(e);
		}
	}, !0), f) : (b.readOnly = !0, b.style = C.textInputStyleUneditable + _, h && b.value === "" && (f.style.display = "none"), f);
}
// src/widgets/forms/autocomplete/language.ts
var xt = /* @__PURE__ */ a({
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
	let n = E.any(e, u.schema("knowsLanguage"), null, t);
	if (!n) return X;
	let r = [];
	return n.elements.forEach((e) => {
		let n = E.any(e, u.solid("publicId"), null, t);
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
var Dt = /* @__PURE__ */ a({
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
	"http://www.wikidata.org/entity/Q15936437": u.schema("CollegeOrUniversity"),
	"http://www.wikidata.org/entity/Q1664720": u.schema("EducationalOrganization"),
	"http://www.wikidata.org/entity/Q43229": u.schema("Organization"),
	"http://www.wikidata.org/entity/Q3918": u.schema("CollegeOrUniversity"),
	"http://www.wikidata.org/entity/Q170584": u.schema("Project"),
	"http://www.wikidata.org/entity/Q327333": u.schema("GovernmentOrganization"),
	"http://www.wikidata.org/entity/Q2221906": u.schema("Place"),
	"http://www.wikidata.org/entity/Q167037": u.schema("Corporation")
}, Rt = {
	targetClass: u.rdf("type"),
	sealImage: u.schema("logo"),
	shortName: u.foaf("nick"),
	subsidiary: u.schema("subOrganization"),
	city: u.vcard("locality"),
	state: u.vcard("region"),
	country: u.vcard("country-name"),
	homepage: u.foaf("homepage"),
	lat: u.schema("latitude"),
	long: u.schema("longitude")
};
function zt(e) {
	let t = e.type.toLowerCase();
	if (t === "uri" || t === "iri") return E.sym(e.value);
	if (t === "literal") return e["xml:lang"] ? new i(e.value, e["xml:lang"]) : new i(e.value);
	throw Error(`bindingToTerm: Unexpected type "${e.type}" in sparql binding}`);
}
function Bt(e, t, n, r, a = Rt) {
	let o = {};
	D(`loadFromBindings:  subject: ${t}`), D(`                       doc: ${r}`), n.forEach((e) => {
		for (let t in e) {
			let n = e[t], r = JSON.stringify(n);
			o[t] = o[t] || /* @__PURE__ */ new Set(), o[t].add(r);
		}
	});
	for (let n in o) {
		let s = o[n];
		D(`    results ${n} -> ${s}`), s.forEach((o) => {
			let s = JSON.parse(o), { type: c, value: l } = s, d;
			if (c === "uri") d = e.sym(l);
			else if (c === "literal") d = new i(l, s.language, s.datatype);
			else throw Error(`loadFromBindings:  unexpected type: ${c}`);
			if (n === "type") Lt[l] ? d = Lt[l] : O("Unmapped Wikidata Class: " + l);
			else if (n === "coordinates") {
				D("         @@@ hey a point: " + l);
				let n = /.*\(([-0-9.-]*) ([-0-9.-]*)\)/.exec(l);
				if (n) {
					let a = u.xsd("float"), o = new i(n[1], null, a), s = new i(n[2], null, a);
					e.add(t, u.schema("longitude"), s, r), e.add(t, u.schema("latitude"), o, r);
				} else D("Bad coordinates syntax: " + l);
			} else {
				let i = a[n] || u.schema(n);
				e.add(t, i, d, r), D(`  public data ${i} ${d}.`);
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
	}, c = (await E.fetcher?.webOperation("GET", i, o))?.responseText || "No response text?";
	if (D("    queryPublicDataConstruct result text:" + (c.length > 500 ? c.slice(0, 200) + " ... " + c.slice(-200) : c)), c.length === 0) throw Error("queryPublicDataConstruct: No text back from construct query:" + i);
	s(c, E, t.uri, "text/turtle");
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
		n.appendChild(R(e, r, "pink")), C.setStyle(n, "autocompleteRowStyle"), n.style.padding = "1em";
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
var nn = "Solid ID", rn = z.iconBase + "noun_34653_green.svg", an = z.iconBase + "noun_Search_875351.svg", on = z.iconBase + "noun_253504.svg";
async function sn(e, t, n, r, i, a) {
	async function o(e, t) {
		return r.permanent ? (Z(_, !0), Z(p, !1), Z(m, !1)) : c(), i(e, t);
	}
	async function s(n) {
		let r = await Ve(e, E, S, u.vcard("url"), void 0, nn);
		if (r) return i(t, r);
	}
	function c() {
		x &&= (S.removeChild(x), void 0);
	}
	async function l() {
		x = e.createElement("div"), x.setAttribute("style", "display: flex; flex-flow: wrap;"), x.appendChild(await tn(e, r, b, o)), x.appendChild(p), x.appendChild(m), x.appendChild(_), x.appendChild(h), S.appendChild(x);
	}
	async function d(e) {
		x ? (S.removeChild(x), x = void 0) : await l();
	}
	async function f(e) {
		for (let n of e) await i(t, n);
	}
	let p = Be(e);
	p.setAttribute("data-testid", "accept-button");
	let m = G(e);
	m.setAttribute("data-testid", "cancel-button");
	let h = e.createElement("div"), g = U(e, h, r.targetClass ? w(r.targetClass) : "item", a);
	g.setAttribute("data-testid", "delete-button");
	let _ = W(e, on, "Edit", (e) => {
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
	return S.style.display = "flex", S.style.flexDirection = "row", (r.permanent || r.currentObject) && await l(), n.editable && (S.style.width = "100%", n.manualURIEntry && L(S.appendChild(W(e, rn, n.idNoun, s)), f, void 0), n.dbLookup && !r.currentObject && !r.permanent && S.appendChild(W(e, an, n.idNoun, d))), y(), S;
}
// src/widgets/forms/autocomplete/autocompleteField.ts
function cn(e, t, n, r, i, a, o) {
	async function s(t, n) {
		if (!n) throw Error("autocompleteField:  No name set.");
		let i = d.the(r, g, null, a);
		if (i) {
			let e = d.any(i, _, null, a);
			if (i.equals(t) && e && e.sameTerm(n)) return;
		}
		let s = i ? d.statementsMatching(r, g, i, a).concat(d.statementsMatching(i, _, null, a)) : [], l = [c(r, g, t, a), c(t, _, n, a)];
		try {
			await d.updater?.updateMany(s, l);
		} catch (t) {
			o(!1, t), p.appendChild(R(e, "Autocomplete form data update error:" + t, null, t));
			return;
		}
		o(!0, "");
	}
	async function l(t, n) {
		let i = d.the(r, g, null, a);
		if (!i) {
			o(!1, "NO data to elete"), p.appendChild(R(e, "Autocomplete delete: no old data!"));
			return;
		}
		let s = d.statementsMatching(r, g, i, a).concat(d.statementsMatching(i, _, null, a)), c = [];
		try {
			await d.updater?.updateMany(s, c);
		} catch (t) {
			let n = /* @__PURE__ */ Error("Autocomplete form data delete error:" + t);
			o(!1, t), p.appendChild(R(e, n, null, t));
			return;
		}
		o(!0, "");
	}
	if (r.termType !== "NamedNode") throw Error("Sorry this field only works on NamedNode subjects (for editable)");
	let d = E, f = i.doc ? i.doc() : null, p = e.createElement("div");
	t && t.appendChild(p);
	let m = e.createElement("div");
	m.setAttribute("class", "formFieldName"), m.setAttribute("style", C.formFieldNameBoxStyle), p.appendChild(m);
	let h = e.createElement("div");
	h.setAttribute("class", "formFieldValue"), p.appendChild(h);
	let g = d.any(i, u.ui("property"));
	if (!g) return p.appendChild(R(e, "Error: No property given for autocomplete field: " + i));
	let _ = d.any(i, u.ui("labelProperty")) || u.schema("name"), v = d.any(i, u.ui("dataSource"));
	if (!v) return p.appendChild(R(e, "Error: No data source given for autocomplete field: " + i));
	let y = {
		label: d.anyJS(v, u.schema("name"), null, v.doc()),
		logo: d.any(v, u.schema("logo"), null, v.doc())
	}, b = d.any(i, u.ui("targetClass"), null, i.doc()) || d.any(v, u.ui("targetClass"), null, v.doc());
	b && (y.targetClass = b), y.objectURIBase = d.any(v, u.ui("objectURIBase"), null, v.doc()) || void 0;
	let x = d.anyJS(v, u.ui("endpoint"), null, v.doc());
	if (x) {
		if (y.endpoint = x, y.searchByNameQuery = d.anyJS(v, u.ui("searchByNameQuery"), null, v.doc()), !y.searchByNameQuery) return p.appendChild(R(e, "Error: No searchByNameQuery given for endpoint data Source: " + i));
		y.insitituteDetailsQuery = d.anyJS(v, u.ui("insitituteDetailsQuery"), null, v.doc());
	} else {
		let t = d.anyJS(v, u.ui("searchByNameURI"));
		if (!t) return p.appendChild(R(e, "Error: No searchByNameURI OR sparql endpoint given for dataSource: " + v));
		y.searchByNameURI = t;
	}
	let S = d.anyJS(i, u.ui("suppressEmptyUneditable"), null, f), w = d.updater?.editable(a.uri), T = {
		permanent: !0,
		targetClass: y.targetClass,
		queryParams: y
	};
	T.size = d.anyJS(i, u.ui("size"), null, f) || void 0;
	let D = d.any(r, g, void 0, a);
	if (D) T.currentObject = D, T.currentName = d.any(T.currentObject, _, null, a);
	else if (D = d.any(i, u.ui("default")), D) T.currentObject = D, T.currentName = d.any(T.currentObject, _, null, a);
	else if (S && !w) return p.style.display = "none", p;
	return m.appendChild(yt(e, g, i)), sn(e, r, {
		editable: w,
		dbLookup: !0
	}, T, s, l).then((e) => {
		h.appendChild(e);
	}, (t) => {
		h.appendChild(R(e, `Error rendering autocomplete ${i}: ${t}`, "#fee", t));
	}), p;
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
var ln = class {
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
						for (let t = 0; t < this.list.length; t++) {
							let n = this.list[t];
							if (e(n, t)) return !0;
						}
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
}, un = "✓", dn = "✕", fn = "-", pn = E;
K[u.ui("AutocompleteField").uri] = cn;
function mn(e, t, n, r, i, a, o) {
	let s = a.children;
	for (let c = 0; c < o.length; c++) {
		let l = o[c];
		if (ht(l) === u.ui("Options").uri) {
			let o = q(e, l)(e, null, t, n, l, r, i);
			D("Refreshing Options field by replacing it."), a.insertBefore(o, s[c]), a.removeChild(s[c + 1]);
		}
	}
}
K[u.ui("Form").uri] = K[u.ui("Group").uri] = function(e, t, n, r, i, a, o) {
	let s = e.createElement("div"), c = u.ui;
	if (t && t.appendChild(s), !i) return;
	let l = r.toNT() + "|" + i.toNT();
	if (n[l]) return s.appendChild(e.createTextNode("Group: see above " + l)), s;
	let d = {};
	for (let e in n) d[e] = 1;
	d[l] = 1;
	let f = i.doc ? i.doc() : null, p = pn.any(i, c("weight"), null, f), m = p ? Number(p.value) : 1;
	if (m > 3 || m < 0) return s.appendChild(R(e, `Form Group weight ${m} should be 0-3`));
	s.setAttribute("style", C.formGroupStyle[m]), s.style.display = "flex", s.style.flexDirection = "column", s.class = "form-weight-" + m;
	let h = pn.any(i, c("parts"), null, f), g;
	if (h ? g = h.elements : (h = pn.each(i, c("part"), null, f), g = Sn(h)), !h) return s.appendChild(R(e, "No parts to form! "));
	for (let t = 0; t < g.length; t++) {
		let i = g[t], c = q(e, i);
		s.appendChild(c(e, null, d, r, i, a, function(t, i) {
			t && i && i.widget && i.widget === "select" && mn(e, n, r, a, o, s, g), o(t, {
				widget: "group",
				change: i
			});
		}));
	}
	return s;
}, K[u.ui("Options").uri] = function(t, n, r, i, a, o, s) {
	let c = E, l = t.createElement("div"), d = a.doc ? a.doc() : null, f = u.ui;
	n && n.appendChild(l);
	let p = c.any(a, f("dependingOn"));
	p ||= u.rdf("type");
	let m = c.each(a, f("case"), null, d);
	m || l.appendChild(R(t, "No cases to Options form. "));
	let h;
	h = p.sameTerm(u.rdf("type")) ? Object.keys(c.findTypeURIs(i)).map((t) => e(t)) : c.each(i, p);
	for (let e = 0; e < m.length; e++) {
		let n = m[e], u = c.each(n, f("for"), null, d), p = !1;
		for (let e = 0; e < u.length; e++) for (let t of h) {
			let n = u[e];
			(t.sameTerm(u) || t.termType === n.termType && t.value === n.value) && (p = !0);
		}
		if (p) {
			let e = c.the(n, f("use"));
			if (e) vn(t, l, r, i, e, o, s);
			else return l.appendChild(R(t, "No \"use\" part for case in form " + a)), l;
			break;
		}
	}
	return l;
}, K[u.ui("Multiple").uri] = function(e, t, r, i, a, o, s) {
	function d(e) {
		return e.map((e) => e.toString().slice(-7)).join(", ");
	}
	async function f() {
		let t = $(o);
		if (C) ee(), P.elements.push(t), await te();
		else {
			let n = O ? [c(t, T, i, o)] : [c(i, T, t, o)];
			try {
				await h.updater.update([], n);
			} catch (t) {
				let n = "Error adding to unordered multiple: " + t;
				y.appendChild(R(e, n)), k(n);
			}
			I();
		}
	}
	function p(t) {
		async function n() {
			if (C) {
				D("pre delete: " + d(P.elements));
				for (let e = 0; e < P.elements.length; e++) if (P.elements[e].sameTerm(t)) {
					P.elements.splice(e, 1), await te();
					return;
				}
			} else if (h.holds(i, T, t, o)) {
				let n = [c(i, T, t, o)];
				h.updater.update(n, [], function(t, n, r) {
					n ? N.removeChild(u) : N.appendChild(R(e, "Multiple: delete failed: " + r));
				});
			}
		}
		async function a(e, n) {
			D("pre move: " + d(P.elements));
			let r = 0;
			for (; r < P.elements.length && !P.elements[r].sameTerm(t); r++);
			if (r === P.elements.length && alert("list move: not found element for " + t), n) {
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
			await te();
		}
		function l(e, n) {
			D(`Item done callback for item ${t.toString()}`), e || k("  Item done callback: Error: " + n), s(e, n);
		}
		_("Multiple: render object: " + t);
		let u = q(e, M)(e, null, r, t, M, o, l);
		if (u.subject = t, h.updater.editable(o.uri) && (U(e, u, A, n), C)) {
			let t = e.createElement("div");
			t.style.display = "grid", t.style.gridTemplateColumns = "auto 3em", t.style.gridTemplateRows = "50% 50%";
			let n = W(e, z.iconBase + "noun_1369237.svg", "Move Up", async (e) => a(e, !0)), r = W(e, z.iconBase + "noun_1369241.svg", "Move Down", async (e) => a(e, !1)), i = e.createElement("div");
			return i.appendChild(u), t.appendChild(i), t.appendChild(n), t.appendChild(r), n.style.gridColumn = 2, r.style.gridColumn = 2, n.style.gridRow = 1, r.style.padding = "0em", n.style.padding = "0em", r.style.gridRow = 2, i.style.gridColumn = 1, i.style.gridRowStart = "span 2", t;
		}
		return u;
	}
	let m = z.iconBase + "noun_19460_green.svg", h = E, v = a.doc ? a.doc() : null, y = e.createElement("div"), b = y, x = u.ui;
	t && t.appendChild(y);
	let S = h.any(a, x("ordered")), C = S ? n.toJS(S) : !1, T = h.any(a, x("property")), O = h.anyJS(a, x("reverse"), null, v);
	if (!T) return y.appendChild(R(e, "No property to multiple: " + a)), b;
	let A = h.any(a, x("label"));
	A ||= w(T);
	let j = h.any(a, x("min"));
	j = j ? 0 + j.value : 0;
	let M = h.any(a, x("part"));
	if (!M) return y.appendChild(R(e, "No part to multiple: " + a)), b;
	let N = y.appendChild(e.createElement("div"));
	N.style.display = "flex", N.style.flexDirection = "column";
	let P, F;
	if (F = O ? h.any(null, T, i, o) : h.any(i, T, null, o), C ? (P = O ? h.any(null, T, i, o) : h.any(i, T, null, o), F = P ? P.elements : []) : (F = O ? h.each(null, T, i, o) : h.each(i, T, null, o), P = null), h.updater.editable(o.uri)) {
		let t = y.appendChild(e.createElement("div"));
		t.style.padding = "0.5em";
		let n = t.appendChild(e.createElement("img"));
		n.setAttribute("src", m), n.setAttribute("style", "margin: 0.2em; width: 1.5em; height:1.5em"), n.title = "Click to add another " + A;
		let r = e.createElement("span");
		r.textContent = (F.length === 0 ? "Add another " : "Add ") + A, t.addEventListener("click", async (e) => {
			await f();
		}, !0), t.appendChild(r);
	}
	function ee() {
		P || (P = new l(), O ? h.add(P, T, i, o) : h.add(i, T, P, o));
	}
	async function te() {
		D("save list: " + d(P.elements)), ee();
		try {
			await h.fetcher.putBack(o);
		} catch (t) {
			y.appendChild(R(e, "Error trying to put back a list: " + t));
			return;
		}
		I();
	}
	function I() {
		let e;
		if (C) {
			let t = O ? h.the(null, T, i, o) : h.the(i, T, null, o);
			e = t ? t.elements : [];
		} else e = O ? h.each(null, T, i, o) : h.each(i, T, null, o), e.sort();
		g(N, e, p);
	}
	N.refresh = I, I();
	async function L() {
		let e = j - F.length;
		if (e > 0) {
			for (let t = 0; t < e; t++) D("Adding extra: min " + j), await f();
			await te();
		}
	}
	return L().then(() => {
		D(" Multiple render: async stuff ok");
	}, (e) => {
		k(" Multiple render: async stuff fails. #### ", e);
	}), b;
}, K[u.ui("PhoneField").uri] = Y, K[u.ui("EmailField").uri] = Y, K[u.ui("ColorField").uri] = Y, K[u.ui("DateField").uri] = Y, K[u.ui("DateTimeField").uri] = Y, K[u.ui("TimeField").uri] = Y, K[u.ui("NumericField").uri] = Y, K[u.ui("IntegerField").uri] = Y, K[u.ui("DecimalField").uri] = Y, K[u.ui("FloatField").uri] = Y, K[u.ui("TextField").uri] = Y, K[u.ui("SingleLineTextField").uri] = Y, K[u.ui("NamedNodeURIField").uri] = Y, K[u.ui("MultiLineTextField").uri] = function(e, t, n, r, i, a, o) {
	let s = u.ui, c = E, l = i.doc ? i.doc() : null, d = c.any(i, s("property"));
	if (!d) return R(e, "No property to text field: " + i);
	let f = e.createElement("div");
	f.style.display = "flex", f.style.flexDirection = "row";
	let p = f.appendChild(e.createElement("div"));
	p.style.width = y.formFieldNameBoxWidth;
	let m = f.appendChild(e.createElement("div"));
	p.appendChild(yt(e, d, i)), a = bt(r, d, a);
	let h = c.anyJS(r, d, null, a) || "", g = c.updater.editable(a.uri), _ = i && c.anyJS(i, u.ui("suppressEmptyUneditable"), null, l);
	!g && _ && h === "" && (f.style.display = "none");
	let v = En(e, c, r, d, a, o);
	return m.appendChild(v), t && t.appendChild(f), f;
};
function hn(e, t, n, r, i, a, o, s) {
	let l = u.ui, d = E, f = d.any(i, l("property"));
	if (!f) {
		let n = R(e, "No property to boolean field: " + i);
		return t && t.appendChild(n), n;
	}
	let p = d.any(i, l("label"));
	p ||= w(f, !0), a = bt(r, f, a);
	let m = d.any(r, f);
	m === void 0 && (m = !1);
	let h = c(r, f, !0, a), g = c(r, f, !1, a), _ = jn(e, d, p, g, h, i, a, s);
	return t && t.appendChild(_), _;
}
K[u.ui("BooleanField").uri] = function(e, t, n, r, i, a, o) {
	return hn(e, t, n, r, i, a, o, !1);
}, K[u.ui("TristateField").uri] = function(e, t, n, r, i, a, o) {
	return hn(e, t, n, r, i, a, o, !0);
}, K[u.ui("Classifier").uri] = function(e, t, n, r, i, a, o) {
	let s = E, c = u.ui, l = s.any(i, c("category"));
	if (!l) return R(e, "No category for classifier: " + i);
	_("Classifier: dataDoc=" + a);
	let d = function(e, t) {
		return o(e || e, t);
	}, f = e.createElement("div");
	f.setAttribute("class", "classifierBox");
	let p = e.createElement("div");
	p.setAttribute("class", "formFieldName classifierBox-label"), p.appendChild(yt(e, l, i)), f.appendChild(p);
	let m = e.createElement("div");
	m.setAttribute("class", "formFieldValue classifierBox-selectBox");
	let h = An(e, s, r, l, a, d);
	if (h && h.querySelectorAll) {
		let e = h.querySelectorAll("select");
		e.length && !s.updater.editable(a.uri) && e.forEach((e) => {
			e.readOnly = !0, e.style = C.textInputStyleUneditable;
		});
	}
	return m.appendChild(h), f.appendChild(m), t && t.appendChild(f), f;
}, K[u.ui("Choice").uri] = function(t, n, r, i, a, o, s) {
	let l = u.ui, d = E, f = a.doc ? a.doc() : null, p, m = t.createElement("div");
	m.setAttribute("class", "choiceBox"), n && n.appendChild(m);
	let h = t.createElement("div");
	h.setAttribute("class", "formFieldName choiceBox-label"), m.appendChild(h);
	let g = t.createElement("div");
	g.setAttribute("class", "formFieldValue choiceBox-selectBox"), m.appendChild(g);
	let _ = d.any(a, l("property"));
	if (!_) return m.appendChild(R(t, "No property for Choice: " + a));
	h.appendChild(yt(t, _, a));
	let v = d.any(a, l("from"));
	if (!v) return R(t, "No 'from' for Choice: " + a);
	let y = d.any(a, l("use")), b = {
		form: a,
		subForm: y,
		disambiguate: !1
	};
	function x(e) {
		let t = [], n;
		t = d.each(void 0, u.rdf("type"), v, f);
		for (let n in Pn(d, v, e)) t.push(d.fromNT(n));
		if (v.sameTerm(u.rdfs("Class"))) for (p in Ze()) t.push(d.sym(p));
		else if (v.sameTerm(u.rdf("Property"))) {
			for (p in n = Qe(d), n.op) t.push(d.fromNT(p));
			for (p in n.dp) t.push(d.fromNT(p));
			b.disambiguate = !0;
		} else if (v.sameTerm(u.owl("ObjectProperty"))) {
			for (p in n = Qe(d), n.op) t.push(d.fromNT(p));
			b.disambiguate = !0;
		} else if (v.sameTerm(u.owl("DatatypeProperty"))) {
			for (p in n = Qe(d), n.dp) t.push(d.fromNT(p));
			b.disambiguate = !0;
		}
		return t;
	}
	d.any(a, l("canMintNew")) && (b.mint = "* Create new *");
	let S = d.any(a, l("multiselect"));
	S && (b.multiSelect = !0);
	let C = d.each(a, l("search-full-store")).length ? null : o, w;
	return g.refresh = function() {
		let n = d.each(i, _, null, o).map((e) => e.value), r = x(C);
		if (r.push(n), r = Cn(r), w = Mn(t, g, d, i, _, r, n, v, b, o, s), g.innerHTML = "", g.appendChild(w), S) {
			let r = new ln({
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
						let r = $(o), a = [];
						a.push(c(i, _, d.sym(r), o)), v && a.push(c(r, u.rdf("type"), d.sym(v), o)), y && gn(t, g, {}, e(r), y, o, function(e, i) {
							e ? (d.updater.update([], a, function(e, n, r) {
								n || g.appendChild(R(t, "Error updating select: " + r));
							}), n.push(r), s && s(e, {
								widget: "select",
								event: "new"
							})) : g.appendChild(R(t, "Error updating data in field of select: " + i));
						});
					} else n.push(r.value);
				}
				w.update(n);
			});
		}
	}, g.refresh(), w && w.refresh && w.refresh(), m;
};
function gn(e, t, n, r, i, a, o) {
	q(e, i)(e, t, n, r, i, a, o);
}
K[u.ui("Comment").uri] = K[u.ui("Heading").uri] = function(e, t, n, r, i, a, o) {
	let s = u.ui, c = E, l = c.any(i, s("contents"));
	l ||= "Error: No contents in comment field.";
	let d = i.doc ? i.doc() : null, f = pt[ht(i)] || {}, p = e.createElement("div");
	t && t.appendChild(p);
	let m = p.appendChild(e.createElement(f.element));
	m.textContent = l, _t(m, i);
	let h = c.anyJS(i, u.ui("suppressIfUneditable"), null, d), g = c.updater.editable(a.uri);
	return h && !g && (p.style.display = "none"), p;
};
function _n(e, t, n, r, i) {
	let a = e.createElement("button");
	return a.setAttribute("type", "button"), a.innerHTML = "Edit " + w(u.ui("Form")), a.addEventListener("click", function(o) {
		vn(e, t, {}, n, u.ui("FormForm"), r, i).setAttribute("style", u.ui("FormForm").sameTerm(n) ? "background-color: #fee;" : "background-color: #ffffe7;"), a.parentNode.removeChild(a);
	}, !0), a;
}
function vn(e, t, n, r, i, a, o) {
	return q(e, i)(e, t, n, r, i, a, o);
}
function yn(e, t) {
	let n = e.each(void 0, u.rdf("range"), t);
	[
		u.rdfs("comment"),
		u.dc("title"),
		u.foaf("name"),
		u.foaf("homepage")
	].forEach(function(e) {
		n.push(e);
	});
	let r = e.each(void 0, u.rdf("type"), t);
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
function bn(e, t, n) {
	let r = [e.sym(t)];
	for (; r.length > 0;) {
		let t = r.shift(), i = e.each(t, n);
		if (_("Lists for " + t + ", " + n + ": " + i.length), i.length !== 0) return i;
		let a = e.each(t, u.rdfs("subClassOf"));
		for (let e = 0; e < a.length; e++) r.push(a[e]), _("findClosest: add super: " + a[e]);
	}
	return [];
}
function xn(e) {
	let t = E;
	_("formsFor: subject=" + e);
	let n = t.findTypeURIs(e), r;
	for (r in n) _("   type: " + r);
	let i = t.bottomTypeURIs(n), a = [];
	for (let e in i) _("candidatesFor: trying bottom type =" + e), a = a.concat(bn(t, e, u.ui("creationForm"))), a = a.concat(bn(t, e, u.ui("annotationForm")));
	return a;
}
function Sn(e) {
	let t = e.map(function(e) {
		return [pn.any(e, u.ui("sequence")) || 9999, e];
	});
	return t.sort(function(e, t) {
		return e[0] - t[0];
	}), t.map(function(e) {
		return e[1];
	});
}
function Cn(e) {
	let t = e.map(function(e) {
		return [w(e).toLowerCase(), e];
	});
	return t.sort(), t.map(function(e) {
		return e[1];
	});
}
function wn(e, t, n, r, i, a, o, s) {
	let c = e.createElement("button");
	return c.setAttribute("type", "button"), c.innerHTML = "New " + w(i), c.addEventListener("click", function(l) {
		c.parentNode.appendChild(Tn(e, t, n, r, i, a, o, s));
	}, !1), c;
}
function Tn(e, t, n, r, i, a, o, s) {
	let l = e.createElement("form");
	if (!a) {
		let n = bn(t, i.uri, u.ui("creationForm"));
		if (n.length === 0) {
			let t = l.appendChild(e.createElement("p"));
			t.textContent = "I am sorry, you need to provide information about a " + w(i) + " but I don't know enough information about those to ask you.";
			let n = l.appendChild(e.createElement("button"));
			return n.setAttribute("type", "button"), n.setAttribute("style", "float: right;"), n.innerHTML = "Goto " + w(i), n.addEventListener("click", function(t) {
				e.outlineManager.GotoSubject(i, !0, void 0, !0, void 0);
			}, !1), l;
		}
		_("lists[0] is " + n[0]), a = n[0];
	}
	_("form is " + a), l.setAttribute("style", `border: 0.05em solid ${y.formBorderColor}; color: ${y.formBorderColor}`), l.innerHTML = "<h3>New " + w(i) + "</h3>";
	let d = q(e, a), f = $(o), p = !1, m = function(a, d) {
		if (!a) return s(a, d);
		let m = [];
		n && !t.holds(n, r, f, o) && m.push(c(n, r, f, o)), n && !t.holds(f, u.rdf("type"), i, o) && m.push(c(f, u.rdf("type"), i, o)), m.length ? t.updater.update([], m, h) : s(!0, d), p ||= l.appendChild($e(e, f));
	};
	function h(e, t, n) {
		return s(t, n);
	}
	return x("paneUtils Object is " + f), et(e, d(e, l, {}, f, a, o, m)).setAttribute("style", "float: right;"), l.AJAR_subject = f, l;
}
function En(e, t, n, r, i, a) {
	let o = e.createElement("div"), s = t.anyJS(n, r, null, i) || "", l = e.createElement("textarea");
	o.appendChild(l), l.rows = s ? s.split("\n").length + 2 : 2, l.cols = 80, l.setAttribute("style", C.multilineTextInputStyle), s === null ? l.select() : l.value = s, o.refresh = function() {
		let e = t.any(n, r, null, i);
		e && e.value !== l.value && (l.value = e.value);
	};
	function u(s) {
		f.disabled = !0, f.setAttribute("style", "visibility: hidden; float: right;"), l.disabled = !0, l.style.color = y.textInputColorPending;
		let u = t.statementsMatching(n, r, null, i), d = c(n, r, l.value, i);
		t.updater.update(u, d, function(t, n, r) {
			n ? (l.style.color = y.textInputColor, l.disabled = !1) : o.appendChild(R(e, "Error (while saving change to " + i.uri + "): " + r)), a && a(n, r);
		});
	}
	let d = t.updater.editable(i.uri), f;
	return d ? (f = Be(e, u), f.disabled = !0, f.style.visibility = "hidden", f.style.float = "right", o.appendChild(f), l.addEventListener("keyup", function(e) {
		l.style.color = "green", f && (f.disabled = !1, f.style.visibility = "");
	}, !0), l.addEventListener("change", u, !0)) : (l.disabled = !0, l.style.backgroundColor = y.textInputBackgroundColorUneditable), o;
}
function Dn(e, t, n, r, i, a, o, s) {
	_("Select list length now " + i.length);
	let l = 0, d = {}, f = t.updater.editable(o.uri);
	for (let e = 0; e < i.length; e++) {
		let t = i[e];
		t.uri || O(`makeSelectForClassifierOptions: option does not have an uri: ${t}, with predicate: ${r}`), !t.uri || t.uri in d || (d[t.uri] = !0, l++);
	}
	if (l === 0 && !a.mint) return R(e, "Can't do selector with no options, subject= " + n + " property = " + r + ".");
	_("makeSelectForClassifierOptions: dataDoc=" + o);
	let p, m = function() {
		return p = {}, r.sameTerm(u.rdf("type")) ? p = t.findTypeURIs(n) : t.each(n, r, null, o).forEach(function(e) {
			p[e.uri] = !0;
		}), p;
	};
	p = m();
	let h = function(i) {
		g.disabled = !0;
		let l = [], u = [], d = function(e) {
			t.holds(n, r, e, o) && l.push(c(n, r, e, o));
		}, f;
		for (let i = 0; i < g.options.length; i++) {
			let l = g.options[i];
			if (l.selected && l.AJAR_mint) {
				if (a.mintClass) {
					let i = Tn(e, t, n, r, a.mintClass, null, o, function(e, t) {
						e || s(e, t, { change: "new" });
					});
					g.parentNode.appendChild(i), f = i.AJAR_subject;
				} else f = $(o);
				u.push(c(n, r, f, o)), a.mintStatementsFun && (u = u.concat(a.mintStatementsFun(f)));
			}
			l.AJAR_uri && (l.selected && !(l.AJAR_uri in p) && u.push(c(n, r, t.sym(l.AJAR_uri), o)), !l.selected && l.AJAR_uri in p && d(t.sym(l.AJAR_uri)), l.selected && (g.currentURI = l.AJAR_uri));
		}
		let h = g.subSelect;
		for (; h && h.currentURI;) d(t.sym(h.currentURI)), h = h.subSelect;
		for (h = g.superSelect; h && h.currentURI;) d(t.sym(h.currentURI)), h = h.superSelect;
		function _(e, t) {
			s(e, {
				widget: "select",
				event: "new"
			});
		}
		x("makeSelectForClassifierOptions: data doc = " + o), t.updater.update(l, u, function(t, n, r) {
			if (p = m(), n) g.disabled = !1, f && q(e, a.subForm)(e, g.parentNode, {}, f, a.subForm, o, _);
			else return g.parentNode.appendChild(R(e, "Error updating data in select: " + r));
			s && s(n, {
				widget: "select",
				event: "change"
			});
		});
	}, g = e.createElement("select");
	g.setAttribute("style", C.formSelectStyle), a.multiple && g.setAttribute("multiple", "true"), g.currentURI = null, g.refresh = function() {
		p = m();
		for (let e = 0; e < g.children.length; e++) {
			let t = g.children[e];
			t.AJAR_uri && (t.selected = t.AJAR_uri in p);
		}
		g.disabled = !1;
	};
	for (let n in d) {
		let r = t.sym(n), i = e.createElement("option");
		a.disambiguate ? i.appendChild(e.createTextNode(b(r, !0))) : i.appendChild(e.createTextNode(w(r, !0)));
		let o = t.any(r, t.sym("http://www.w3.org/ns/ui#backgroundColor"));
		o && i.setAttribute("style", "background-color: " + o.value + "; "), i.AJAR_uri = n, n in p && (i.setAttribute("selected", "true"), g.currentURI = n), g.appendChild(i);
	}
	if (f && a.mint) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(a.mint)), t.AJAR_mint = !0, g.insertBefore(t, g.firstChild);
	}
	if (g.currentURI == null && !a.multiple) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(a.nullLabel)), g.insertBefore(t, g.firstChild), t.selected = !0;
	}
	return f && g.addEventListener("change", h, !1), g;
}
function On(e, t, n, r, i, a, o, s) {
	_("Select list length now " + i.length);
	let l = 0, d = {}, f = t.updater.editable(o.uri);
	for (let e = 0; e < i.length; e++) {
		let t = i[e];
		t.uri || O(`makeSelectForOptions: option does not have an uri: ${t}, with predicate: ${r}`), !t.uri || t.uri in d || (d[t.uri] = !0, l++);
	}
	if (l === 0) return R(e, "Can't do selector with no options, subject= " + n + " property = " + r + ".");
	_("makeSelectForOptions: dataDoc=" + o);
	let p, m = function() {
		return p = {}, r.sameTerm(u.rdf("type")) ? p = t.findTypeURIs(n) : t.each(n, r, null, o).forEach(function(e) {
			e.uri && (p[e.uri] = !0);
		}), p;
	};
	p = m();
	let h = function(i) {
		g.disabled = !0;
		let a = [], l = [], u = function(e) {
			t.holds(n, r, e, o) && a.push(c(n, r, e, o));
		};
		for (let e = 0; e < g.options.length; e++) {
			let i = g.options[e];
			i.AJAR_uri && (i.selected && !(i.AJAR_uri in p) && l.push(c(n, r, t.sym(i.AJAR_uri), o)), !i.selected && i.AJAR_uri in p && u(t.sym(i.AJAR_uri)), i.selected && (g.currentURI = i.AJAR_uri));
		}
		let d = g.subSelect;
		for (; d && d.currentURI;) u(t.sym(d.currentURI)), d = d.subSelect;
		for (d = g.superSelect; d && d.currentURI;) u(t.sym(d.currentURI)), d = d.superSelect;
		x("selectForOptions: data doc = " + o), t.updater.update(a, l, function(t, n, r) {
			if (p = m(), n) g.disabled = !1;
			else return g.parentNode.appendChild(R(e, "Error updating data in select: " + r));
			s && s(n, {
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
	for (let n in d) {
		let r = t.sym(n), i = e.createElement("option");
		a.disambiguate ? i.appendChild(e.createTextNode(b(r, !0))) : i.appendChild(e.createTextNode(w(r, !0)));
		let o = t.any(r, t.sym("http://www.w3.org/ns/ui#backgroundColor"));
		o && i.setAttribute("style", "background-color: " + o.value + "; "), i.AJAR_uri = n, n in p && (i.setAttribute("selected", "true"), g.currentURI = n), g.appendChild(i);
	}
	if (!g.currentURI) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(a.nullLabel)), g.insertBefore(t, g.firstChild), t.selected = !0;
	}
	return f && g.addEventListener("change", h, !1), g;
}
function kn(e, t, n, r, i, a) {
	let o = t.any(r, u.owl("disjointUnionOf")), s, c = !1;
	return o ? s = o.elements : (s = t.each(void 0, u.rdfs("subClassOf"), r), c = !0), _("Select list length " + s.length), s.length === 0 ? R(e, "Can't do " + (c ? "multiple " : "") + "selector with no subclasses of category: " + r) : s.length === 1 ? R(e, "Can't do " + (c ? "multiple " : "") + "selector with only 1 subclass of category: " + r + ":" + s[1]) : Dn(e, t, n, u.rdf("type"), s, {
		multiple: c,
		nullLabel: "* Select type *"
	}, i, a);
}
function An(e, t, n, r, i, a) {
	function o() {
		c &&= (s.removeChild(c), null), d.currentURI && t.any(t.sym(d.currentURI), u.owl("disjointUnionOf")) && (c = An(e, t, n, t.sym(d.currentURI), i, a), d.subSelect = c.firstChild, d.subSelect.superSelect = d, s.appendChild(c));
	}
	let s = e.createElement("span"), c = null;
	function l(e, t) {
		e && o(), a(e, t);
	}
	let d = kn(e, t, n, r, i, l);
	return s.appendChild(d), o(), s;
}
function jn(e, t, n, r, i, a, o, s) {
	let c = e.createElement("div"), l = vt(e, t, c, a, n), d = t.updater.editable(o.uri), f = e.createElement("button"), p = f;
	f.style = C.checkboxInputStyle, l.appendChild(f);
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
			if (n && l) return c.appendChild(R(e, "Inconsistent data in dataDoc!\n" + i + " and\n" + r)), c;
			if (!n && !l) {
				n = null;
				let e = t.any(a, u.ui("default"));
				o = e ? e.value === "1" : s ? null : !1;
			}
		}
		f.state = n, f.textContent = {
			true: un,
			false: s ? dn : " ",
			null: fn
		}[o];
	}
	if (g(), !d) return c;
	let _ = !1;
	return f.addEventListener("click", function(n) {
		if (_) return;
		_ = !0, f.disabled = !0;
		let a = !1, o = function() {
			return !a && (a = !0, _ = !1, f.disabled = !1, !0);
		}, l = function(t) {
			p.style.color = "#000", p.style.backgroundColor = "#fee", c.appendChild(R(e, `Checkbox: Error updating dataDoc from ${f.state} to ${f.newState}:\n\n${t}`));
		};
		p.style.color = "#bbb";
		let u = f.state === !0 ? i : f.state === !1 ? r : [];
		f.newState = f.state === null ? !0 : f.state === !0 ? !1 : !s || null;
		let d = f.newState === !0 ? i : f.newState === !1 ? r : [];
		D(`  Deleting  ${u}`), D(`  Inserting ${d}`);
		try {
			let e = t.updater.update(u, d, function(e, n, r) {
				o() && (n ? (p.style.color = "#000", f.state = f.newState, f.textContent = {
					true: un,
					false: dn,
					null: fn
				}[f.state]) : (u.why && t.holds(u.subject, u.predicate, u.object, u.why) && D(" @@@@@ weird if 409 - does hold statement"), l(r)));
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
function $(t) {
	let n = /* @__PURE__ */ new Date();
	return e(t.uri + "#id" + ("" + n.getTime()));
}
function Mn(t, n, r, i, a, o, s, l, d, f, p) {
	let m = {}, h = r.updater.editable(f.uri);
	for (let e = 0; e < o.length; e++) {
		let t = o[e];
		!t.uri || t.uri in m || (m[t.uri] = !0);
	}
	if (Object.keys(m).length === 0 && !d.mint) return R(t, "Can't do selector with no options, subject= " + i + " property = " + a + ".");
	_("makeSelectForChoice: dataDoc=" + f);
	function g() {
		let e = "--- choice ---";
		return a && a.termType !== "BlankNode" && (e = "* Select for property: " + w(a) + " *"), i && i.termType !== "BlankNode" && (e = "* Select for " + w(i, !0) + " *"), e;
	}
	function v() {
		let e = t.createElement("option");
		return e.appendChild(t.createTextNode(g())), e.disabled = !0, e.value = !0, e.hidden = !0, e.selected = !0, e;
	}
	let y = function(e) {
		n.removeChild(n.lastChild), S.refresh();
	}, S = t.createElement("select");
	S.setAttribute("style", C.formSelectStyle), S.setAttribute("id", "formSelect"), S.currentURI = null;
	for (let e in m) S.appendChild(T(e));
	if (h && d.mint) {
		let e = t.createElement("option");
		e.appendChild(t.createTextNode(d.mint)), e.AJAR_mint = !0, S.insertBefore(e, S.firstChild);
	}
	S.children.length === 0 && S.insertBefore(v(), S.firstChild), S.update = function(n) {
		s = n;
		let o = [], d = [], m = function(e) {
			r.holds(i, a, e, f) && o.push(c(i, a, e, f));
		}, h = function(e) {
			r.holds(i, a, e, f) || d.push(c(i, a, e, f)), l && !r.holds(e, u.rdf("type"), r.sym(l), f) && d.push(c(e, u.rdf("type"), r.sym(l), f));
		}, g = r.each(i, a, null, f).map((e) => e.value);
		for (let t of g) Nn(t, s) || m(e(t));
		for (let t of s) t in g || h(e(t));
		r.updater.update(o, d, function(e, n, r) {
			if (!n) return S.parentNode.appendChild(R(t, "Error updating data in select: " + r));
			S.refresh(), p && p(n, {
				widget: "select",
				event: "change"
			});
		});
	}, S.refresh = function() {
		S.disabled = !0;
		let o = [], m;
		for (let e = 0; e < S.options.length; e++) {
			let n = S.options[e];
			if (n.selected && n.AJAR_mint) {
				if (d.mintClass) {
					let e = Tn(t, r, i, a, l, d.subForm, f, function(e, t) {
						e || p(e, t, { change: "new" });
					});
					S.parentNode.appendChild(e), m = e.AJAR_subject;
				} else m = $(f);
				o.push(c(i, a, r.sym(m), f)), l && o.push(c(m, u.rdf("type"), r.sym(l), f)), d.mintStatementsFun && (o = o.concat(d.mintStatementsFun(m))), S.currentURI = m;
			}
			n.AJAR_uri && (n.selected && Nn(n.AJAR_uri, s) && (S.currentURI = n.AJAR_uri), Nn(n.AJAR_uri, s) || n.removeAttribute("selected"), Nn(n.AJAR_uri, s) && n.setAttribute("selected", "true"));
		}
		x("selectForOptions: data doc = " + f), S.currentURI && d.subForm && !d.multiSelect && gn(t, n, {}, e(S.currentURI), d.subForm, f, function(e, i) {
			e ? (r.updater.update([], o, function(e, r, i) {
				r || n.appendChild(R(t, "Error updating select: " + i));
			}), p && p(e, {
				widget: "select",
				event: "new"
			})) : n.appendChild(R(t, "Error updating data in field of select: " + i));
		}), S.disabled = !1;
	};
	function T(e) {
		let n = t.createElement("option"), i = r.sym(e), a;
		a = d.disambiguate ? b(i, !0) : w(i, !0), n.appendChild(t.createTextNode(a)), n.setAttribute("value", e);
		let o = r.any(i, r.sym("http://www.w3.org/ns/ui#backgroundColor"));
		return o && n.setAttribute("style", "background-color: " + o.value + "; "), n.AJAR_uri = e, Nn(i.value, s) && n.setAttribute("selected", "true"), n;
	}
	return h && S.addEventListener("change", y, !1), S;
}
function Nn(e, t) {
	let n = 0;
	for (; n < t.length; n++) if (t[n] === e) return !0;
	return !1;
}
function Pn(e, t, n) {
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
var Fn = /* @__PURE__ */ a({
	Group: () => ce,
	GroupBuilder: () => le,
	GroupPicker: () => se,
	PeoplePicker: () => oe,
	Person: () => ue,
	addStyleSheet: () => ct,
	allClassURIs: () => Ze,
	appendForm: () => vn,
	askName: () => Ve,
	attachmentList: () => Je,
	basicField: () => Y,
	buildCheckboxForm: () => jn,
	button: () => W,
	cancelButton: () => G,
	clearElement: () => we,
	complain: () => Ce,
	continueButton: () => Be,
	createLinkDiv: () => Ge,
	createLinkForURI: () => ye,
	createNameDiv: () => We,
	defaultAnnotationStore: () => Xe,
	deleteButtonWithCheck: () => U,
	editFormButton: () => _n,
	errorMessageBlock: () => R,
	extractLogURI: () => Te,
	faviconOrDefault: () => Re,
	field: () => K,
	fieldFunction: () => q,
	fieldLabel: () => yt,
	fieldParams: () => pt,
	fieldStore: () => bt,
	fileUploadButtonDiv: () => ft,
	findClosest: () => bn,
	findImage: () => Fe,
	findImageFromURI: () => Pe,
	formatDateTime: () => De,
	formsFor: () => xn,
	iconForClass: () => Me,
	imagesOf: () => je,
	index: () => rt,
	isAudio: () => lt,
	isImage: () => dt,
	isVideo: () => ut,
	linkButton: () => $e,
	linkIcon: () => ve,
	makeDescription: () => En,
	makeDraggable: () => ne,
	makeDropTarget: () => L,
	makeSelectForCategory: () => kn,
	makeSelectForChoice: () => Mn,
	makeSelectForClassifierOptions: () => Dn,
	makeSelectForNestedCategory: () => An,
	makeSelectForOptions: () => On,
	mostSpecificClassURI: () => ht,
	newButton: () => wn,
	newThing: () => $,
	openHrefInOutlineMode: () => Ye,
	personTR: () => He,
	promptForNew: () => Tn,
	propertiesForClass: () => yn,
	propertyTriage: () => Qe,
	publicData: () => Dt,
	refreshTree: () => qe,
	removeButton: () => et,
	renderAsDiv: () => Ke,
	renderAsRow: () => Ue,
	renderAutoComplete: () => tn,
	renderAutocompleteControl: () => sn,
	renderNameValuePair: () => vt,
	selectorPanel: () => tt,
	selectorPanelRefresh: () => nt,
	setImage: () => Le,
	setName: () => Ae,
	setVisible: () => Z,
	shortDate: () => Ee,
	shortTime: () => ke,
	sortByLabel: () => Cn,
	sortBySequence: () => Sn,
	timestamp: () => Oe,
	uploadFiles: () => re
});
export { L as C, A as D, D as E, O, ne as S, k as T, qe as _, xt as a, z as b, G as c, Be as d, U as f, He as g, Ye as h, $ as i, we as l, Me as m, vn as n, Ve as o, Fe as p, jn as r, W as s, Fn as t, Ce as u, Le as v, re as w, R as x, Ee as y };

//# sourceMappingURL=widgets-CTH3oXJI.js.map