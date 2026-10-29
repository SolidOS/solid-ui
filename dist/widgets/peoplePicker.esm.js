import { log as e } from "../lib/debug.esm.js";
import { makeDropTarget as t } from "./dragAndDrop.esm.js";
import { errorMessageBlock as n } from "./error.esm.js";
import { iconBase as r } from "../lib/iconBase.esm.js";
import i from "../lib/ns.esm.js";
import * as a from "rdflib";
import { solidLogicSingleton as o } from "solid-logic";
import s from "escape-html";
import { v4 as c } from "uuid";
// src/widgets/peoplePicker.js
var l = o.store, u = class {
	constructor(e, t, n, r) {
		this.options = r || {}, this.element = e, this.typeIndex = t, this.groupPickedCb = n, this.selectedgroup = this.options.selectedgroup, this.onSelectGroup = this.onSelectGroup.bind(this);
	}
	render() {
		let e = document.createElement("div");
		if (e.style.maxWidth = "350px", e.style.minHeight = "200px", e.style.outline = "1px solid black", e.style.display = "flex", this.selectedgroup) {
			e.style.flexDirection = "column";
			let t = document.createElement("div");
			new f(t, this.selectedgroup).render();
			let n = document.createElement("button");
			n.textContent = s("Change group"), n.addEventListener("click", (e) => {
				this.selectedgroup = null, this.render();
			}), e.appendChild(t), e.appendChild(n);
		} else this.findAddressBook(this.typeIndex).then(({ book: t }) => {
			let r = document.createElement("button");
			r.textContent = s("Pick an existing group"), r.style.margin = "auto", r.addEventListener("click", (n) => {
				new d(e, t, this.onSelectGroup).render();
			});
			let i = document.createElement("button");
			i.textContent = s("Create a new group"), i.style.margin = "auto", i.addEventListener("click", (e) => {
				this.createNewGroup(t, this.options.defaultNewGroupName).then(({ group: e }) => {
					new p(this.element, t, e, this.onSelectGroup).render();
				}).catch((e) => {
					this.element.appendChild(n(document, s(`Error creating a new group. (${e})`)));
				});
			}), e.appendChild(r), e.appendChild(i), this.element.innerHTML = "", this.element.appendChild(e);
		}).catch((e) => {
			this.element.appendChild(n(document, s(`Could find your groups. (${e})`)));
		});
		return this.element.innerHTML = "", this.element.appendChild(e), this;
	}
	findAddressBook(e) {
		return new Promise((t, n) => {
			l.fetcher.nowOrWhenFetched(e, (r, a) => {
				if (!r) return n(a);
				let o = l.any(null, i.solid("forClass"), i.vcard("AddressBook"));
				if (!o) return n(/* @__PURE__ */ Error("no address book registered in the solid type index " + e));
				let s = l.any(o, i.solid("instance"));
				if (!s) return n(/* @__PURE__ */ Error("incomplete address book registration"));
				l.fetcher.load(s).then(function(e) {
					return t({ book: s });
				}).catch(function(e) {
					return n(/* @__PURE__ */ Error("Could not load address book " + e));
				});
			});
		});
	}
	createNewGroup(t, n) {
		let { groupIndex: r, groupContainer: o } = _(t), s = a.sym(`${o.uri}${c().slice(0, 8)}.ttl#this`), u = n || "Untitled Group", d = [s.doc(), r].map((e) => {
			let n = a.st(s, i.rdf("type"), i.vcard("Group"), e), o = a.st(s, i.vcard("fn"), u, s.doc(), e), c = a.st(t, i.vcard("includesGroup"), s, e), d = e.equals(r) ? [
				n,
				o,
				c
			] : [n, o];
			return g(e.uri, { toIns: d }).then(() => {
				d.forEach((e) => {
					l.add(e);
				});
			});
		});
		return Promise.all(d).then(() => ({ group: s })).catch((t) => {
			throw e("Could not create new group.  PATCH failed " + t), Error(`Couldn't create new group.  PATCH failed for (${t.xhr ? t.xhr.responseURL : ""} )`);
		});
	}
	onSelectGroup(e) {
		this.selectedgroup = e, this.groupPickedCb(e), this.render();
	}
}, d = class {
	constructor(e, t, n) {
		this.element = e, this.book = t, this.onSelectGroup = n;
	}
	render() {
		return this.loadGroups().then((e) => {
			let t = document.createElement("div");
			t.style.display = "flex", t.style.flexDirection = "column", e.forEach((e) => {
				let n = document.createElement("button");
				n.addEventListener("click", this.handleClickGroup(e)), new f(n, e).render(), t.appendChild(n);
			}), this.element.innerHTML = "", this.element.appendChild(t);
		}).catch((e) => {
			this.element.appendChild(n(document, s(`There was an error loading your groups. (${e})`)));
		}), this;
	}
	loadGroups() {
		return new Promise((e, t) => {
			let { groupIndex: n } = _(this.book);
			l.fetcher.nowOrWhenFetched(n, (n, r) => n ? e(l.each(this.book, i.vcard("includesGroup"))) : t(r));
		});
	}
	handleClickGroup(e) {
		return (t) => {
			this.onSelectGroup(e);
		};
	}
}, f = class {
	constructor(e, t) {
		this.element = e, this.group = t;
	}
	render() {
		let e = document.createElement("div");
		return e.textContent = s(h(this.group, i.vcard("fn"), `[${this.group.value}]`)), this.element.innerHTML = "", this.element.appendChild(e), this;
	}
}, p = class {
	constructor(e, t, n, r, i) {
		this.element = e, this.book = t, this.group = n, this.onGroupChanged = (e, t, n) => {
			i && i(e, t, n);
		}, this.groupChangedCb = i, this.doneBuildingCb = r;
	}
	refresh() {}
	render() {
		let e = document.createElement("div");
		e.style.maxWidth = "350px", e.style.minHeight = "200px", e.style.outline = "1px solid black", e.style.display = "flex", e.style.flexDirection = "column", t(e, (e) => {
			e.forEach((e) => {
				this.add(e).catch((e) => {
					this.element.appendChild(n(document, s(`Could not add the given WebId. (${e})`)));
				});
			});
		});
		let r = document.createElement("input");
		r.type = "text", r.value = h(this.group, i.vcard("fn"), "Untitled Group"), r.addEventListener("change", (e) => {
			this.setGroupName(e.target.value).catch((e) => {
				this.element.appendChild(n(document, `Error changing group name. (${e})`));
			});
		});
		let a = document.createElement("label");
		if (a.textContent = s("Group Name:"), a.appendChild(r), e.appendChild(a), l.any(this.group, i.vcard("hasMember"))) l.match(this.group, i.vcard("hasMember")).forEach((t) => {
			let n = t.object, r = document.createElement("div");
			new m(r, n, this.handleRemove(n)).render(), e.appendChild(r);
		});
		else {
			let t = document.createElement("p");
			t.textContent = s`
        To add someone to this group, drag and drop their WebID URL onto the box.
      `, e.appendChild(t);
		}
		let o = document.createElement("button");
		return o.textContent = s("Done"), o.addEventListener("click", (e) => {
			this.doneBuildingCb(this.group);
		}), e.appendChild(o), this.element.innerHTML = "", this.element.appendChild(e), this;
	}
	add(e) {
		return new Promise((t, n) => {
			l.fetcher.nowOrWhenFetched(e, (r, o) => {
				if (!r) return this.onGroupChanged(o), n(o);
				let s = a.namedNode(e), c = l.any(s, i.rdf("type"));
				return !c || !c.equals(i.foaf("Person")) ? n(/* @__PURE__ */ Error(`Only people supported right now. (tried to add something of type ${c.value})`)) : t(s);
			});
		}).then((e) => {
			let t = a.st(this.group, i.vcard("hasMember"), e);
			return l.holdsStatement(t) ? e : g(this.group.doc().uri, { toIns: [t] }).then(() => {
				t.why = this.group.doc(), l.add(t), this.onGroupChanged(null, "added", e), this.render();
			});
		});
	}
	handleRemove(e) {
		return (t) => {
			let n = a.st(this.group, i.vcard("hasMember"), e);
			return g(this.group.doc().uri, { toDel: [n] }).then(() => (l.remove(n), this.onGroupChanged(null, "removed", e), this.render(), !0)).catch((t) => {
				let n = l.any(e, i.foaf("name")), r = n && n.value ? `Could not remove ${n.value}. (${t})` : `Could not remove ${e.value}. (${t})`;
				throw Error(r);
			});
		};
	}
	setGroupName(e) {
		let { groupIndex: t } = _(this.book), n = [this.group.doc(), t].map((t) => {
			let n = l.match(this.group, i.vcard("fn"), null, t), r = a.st(this.group, i.vcard("fn"), a.literal(e));
			return g(t.value, {
				toDel: n,
				toIns: [r]
			}).then((e) => {
				l.removeStatements(n), r.why = t, l.add(r);
			});
		});
		return Promise.all(n);
	}
}, m = class {
	constructor(e, t, n) {
		this.webIdNode = t, this.element = e, this.handleRemove = n;
	}
	render() {
		let e = document.createElement("div");
		e.style.display = "flex";
		let t = h(this.webIdNode, i.foaf("img"), r + "noun_15059.svg"), a = document.createElement("img");
		a.src = s(t), a.width = "50", a.height = "50", a.style.margin = "5px";
		let o = h(this.webIdNode, i.foaf("name"), `[${this.webIdNode}]`), c = document.createElement("span");
		c.innerHTML = s(o), c.style.flexGrow = "1", c.style.margin = "auto 0";
		let l = document.createElement("button");
		return l.textContent = "Remove", l.addEventListener("click", (e) => this.handleRemove().catch((e) => {
			this.element.appendChild(n(document, s(`${e}`)));
		})), l.style.margin = "5px", e.appendChild(a), e.appendChild(c), e.appendChild(l), this.element.innerHTML = "", this.element.appendChild(e), this;
	}
};
function h(e, t, n) {
	let r = l.any(e, t);
	return r ? r.value : n;
}
function g(e, { toDel: t, toIns: n }) {
	return new Promise((e, r) => {
		l.updater.update(t, n, (t, n, i) => {
			if (!n) return r(/* @__PURE__ */ Error(`PATCH failed for resource <${t}>: ${i}`));
			e();
		});
	});
}
function _(e) {
	return {
		groupIndex: l.any(e, i.vcard("groupIndex")),
		groupContainer: l.sym(e.dir().uri + "Group/")
	};
}
export { f as Group, p as GroupBuilder, d as GroupPicker, u as PeoplePicker, m as Person };

//# sourceMappingURL=peoplePicker.esm.js.map