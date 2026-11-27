import e from "escape-html";
import { v4 as t } from "uuid";
import * as n from "rdflib";
import { log as r } from "../lib/debug.esm.js";
import { makeDropTarget as i } from "./dragAndDrop.esm.js";
import { errorMessageBlock as a } from "./error.esm.js";
import { iconBase as o } from "../lib/iconBase.esm.js";
import s from "../lib/ns.esm.js";
import { solidLogicSingleton as c } from "solid-logic";
// src/widgets/peoplePicker.js
var l = c.store, u = class {
	constructor(e, t, n, r) {
		this.options = r || {}, this.element = e, this.typeIndex = t, this.groupPickedCb = n, this.selectedgroup = this.options.selectedgroup, this.onSelectGroup = this.onSelectGroup.bind(this);
	}
	render() {
		let t = document.createElement("div");
		if (t.style.maxWidth = "350px", t.style.minHeight = "200px", t.style.outline = "1px solid black", t.style.display = "flex", this.selectedgroup) {
			t.style.flexDirection = "column";
			let n = document.createElement("div");
			new f(n, this.selectedgroup).render();
			let r = document.createElement("button");
			r.textContent = e("Change group"), r.addEventListener("click", (e) => {
				this.selectedgroup = null, this.render();
			}), t.appendChild(n), t.appendChild(r);
		} else this.findAddressBook(this.typeIndex).then(({ book: n }) => {
			let r = document.createElement("button");
			r.textContent = e("Pick an existing group"), r.style.margin = "auto", r.addEventListener("click", (e) => {
				new d(t, n, this.onSelectGroup).render();
			});
			let i = document.createElement("button");
			i.textContent = e("Create a new group"), i.style.margin = "auto", i.addEventListener("click", (t) => {
				this.createNewGroup(n, this.options.defaultNewGroupName).then(({ group: e }) => {
					new p(this.element, n, e, this.onSelectGroup).render();
				}).catch((t) => {
					this.element.appendChild(a(document, e(`Error creating a new group. (${t})`)));
				});
			}), t.appendChild(r), t.appendChild(i), this.element.innerHTML = "", this.element.appendChild(t);
		}).catch((t) => {
			this.element.appendChild(a(document, e(`Could find your groups. (${t})`)));
		});
		return this.element.innerHTML = "", this.element.appendChild(t), this;
	}
	findAddressBook(e) {
		return new Promise((t, n) => {
			l.fetcher.nowOrWhenFetched(e, (r, i) => {
				if (!r) return n(i);
				let a = l.any(null, s.solid("forClass"), s.vcard("AddressBook"));
				if (!a) return n(/* @__PURE__ */ Error("no address book registered in the solid type index " + e));
				let o = l.any(a, s.solid("instance"));
				if (!o) return n(/* @__PURE__ */ Error("incomplete address book registration"));
				l.fetcher.load(o).then(function(e) {
					return t({ book: o });
				}).catch(function(e) {
					return n(/* @__PURE__ */ Error("Could not load address book " + e));
				});
			});
		});
	}
	createNewGroup(e, i) {
		let { groupIndex: a, groupContainer: o } = _(e), c = n.sym(`${o.uri}${t().slice(0, 8)}.ttl#this`), u = i || "Untitled Group", d = [c.doc(), a].map((t) => {
			let r = n.st(c, s.rdf("type"), s.vcard("Group"), t), i = n.st(c, s.vcard("fn"), u, c.doc(), t), o = n.st(e, s.vcard("includesGroup"), c, t), d = t.equals(a) ? [
				r,
				i,
				o
			] : [r, i];
			return g(t.uri, { toIns: d }).then(() => {
				d.forEach((e) => {
					l.add(e);
				});
			});
		});
		return Promise.all(d).then(() => ({ group: c })).catch((e) => {
			throw r("Could not create new group.  PATCH failed " + e), Error(`Couldn't create new group.  PATCH failed for (${e.xhr ? e.xhr.responseURL : ""} )`);
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
		}).catch((t) => {
			this.element.appendChild(a(document, e(`There was an error loading your groups. (${t})`)));
		}), this;
	}
	loadGroups() {
		return new Promise((e, t) => {
			let { groupIndex: n } = _(this.book);
			l.fetcher.nowOrWhenFetched(n, (n, r) => n ? e(l.each(this.book, s.vcard("includesGroup"))) : t(r));
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
		let t = document.createElement("div");
		return t.textContent = e(h(this.group, s.vcard("fn"), `[${this.group.value}]`)), this.element.innerHTML = "", this.element.appendChild(t), this;
	}
}, p = class {
	constructor(e, t, n, r, i) {
		this.element = e, this.book = t, this.group = n, this.onGroupChanged = (e, t, n) => {
			i && i(e, t, n);
		}, this.groupChangedCb = i, this.doneBuildingCb = r;
	}
	refresh() {}
	render() {
		let t = document.createElement("div");
		t.style.maxWidth = "350px", t.style.minHeight = "200px", t.style.outline = "1px solid black", t.style.display = "flex", t.style.flexDirection = "column", i(t, (t) => {
			t.forEach((t) => {
				this.add(t).catch((t) => {
					this.element.appendChild(a(document, e(`Could not add the given WebId. (${t})`)));
				});
			});
		});
		let n = document.createElement("input");
		n.type = "text", n.value = h(this.group, s.vcard("fn"), "Untitled Group"), n.addEventListener("change", (e) => {
			this.setGroupName(e.target.value).catch((e) => {
				this.element.appendChild(a(document, `Error changing group name. (${e})`));
			});
		});
		let r = document.createElement("label");
		if (r.textContent = e("Group Name:"), r.appendChild(n), t.appendChild(r), l.any(this.group, s.vcard("hasMember"))) l.match(this.group, s.vcard("hasMember")).forEach((e) => {
			let n = e.object, r = document.createElement("div");
			new m(r, n, this.handleRemove(n)).render(), t.appendChild(r);
		});
		else {
			let n = document.createElement("p");
			n.textContent = e`
        To add someone to this group, drag and drop their WebID URL onto the box.
      `, t.appendChild(n);
		}
		let o = document.createElement("button");
		return o.textContent = e("Done"), o.addEventListener("click", (e) => {
			this.doneBuildingCb(this.group);
		}), t.appendChild(o), this.element.innerHTML = "", this.element.appendChild(t), this;
	}
	add(e) {
		return new Promise((t, r) => {
			l.fetcher.nowOrWhenFetched(e, (i, a) => {
				if (!i) return this.onGroupChanged(a), r(a);
				let o = n.namedNode(e), c = l.any(o, s.rdf("type"));
				return !c || !c.equals(s.foaf("Person")) ? r(/* @__PURE__ */ Error(`Only people supported right now. (tried to add something of type ${c.value})`)) : t(o);
			});
		}).then((e) => {
			let t = n.st(this.group, s.vcard("hasMember"), e);
			return l.holdsStatement(t) ? e : g(this.group.doc().uri, { toIns: [t] }).then(() => {
				t.why = this.group.doc(), l.add(t), this.onGroupChanged(null, "added", e), this.render();
			});
		});
	}
	handleRemove(e) {
		return (t) => {
			let r = n.st(this.group, s.vcard("hasMember"), e);
			return g(this.group.doc().uri, { toDel: [r] }).then(() => (l.remove(r), this.onGroupChanged(null, "removed", e), this.render(), !0)).catch((t) => {
				let n = l.any(e, s.foaf("name")), r = n && n.value ? `Could not remove ${n.value}. (${t})` : `Could not remove ${e.value}. (${t})`;
				throw Error(r);
			});
		};
	}
	setGroupName(e) {
		let { groupIndex: t } = _(this.book), r = [this.group.doc(), t].map((t) => {
			let r = l.match(this.group, s.vcard("fn"), null, t), i = n.st(this.group, s.vcard("fn"), n.literal(e));
			return g(t.value, {
				toDel: r,
				toIns: [i]
			}).then((e) => {
				l.removeStatements(r), i.why = t, l.add(i);
			});
		});
		return Promise.all(r);
	}
}, m = class {
	constructor(e, t, n) {
		this.webIdNode = t, this.element = e, this.handleRemove = n;
	}
	render() {
		let t = document.createElement("div");
		t.style.display = "flex";
		let n = h(this.webIdNode, s.foaf("img"), o + "noun_15059.svg"), r = document.createElement("img");
		r.src = e(n), r.width = "50", r.height = "50", r.style.margin = "5px";
		let i = h(this.webIdNode, s.foaf("name"), `[${this.webIdNode}]`), c = document.createElement("span");
		c.innerHTML = e(i), c.style.flexGrow = "1", c.style.margin = "auto 0";
		let l = document.createElement("button");
		return l.textContent = "Remove", l.addEventListener("click", (t) => this.handleRemove().catch((t) => {
			this.element.appendChild(a(document, e(`${t}`)));
		})), l.style.margin = "5px", t.appendChild(r), t.appendChild(c), t.appendChild(l), this.element.innerHTML = "", this.element.appendChild(t), this;
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
		groupIndex: l.any(e, s.vcard("groupIndex")),
		groupContainer: l.sym(e.dir().uri + "Group/")
	};
}
export { f as Group, p as GroupBuilder, d as GroupPicker, u as PeoplePicker, m as Person };

//# sourceMappingURL=peoplePicker.esm.js.map