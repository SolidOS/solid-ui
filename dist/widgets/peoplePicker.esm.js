import e from "../lib/ns.esm.js";
import { log as t } from "../lib/debug.esm.js";
import { makeDropTarget as n } from "./dragAndDrop.esm.js";
import { errorMessageBlock as r } from "./error.esm.js";
import { iconBase as i } from "../lib/iconBase.esm.js";
import * as a from "rdflib";
import { solidLogicSingleton as o } from "solid-logic";
import s from "escape-html";
import { v4 as c } from "uuid";
//#region src/widgets/peoplePicker.js
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
			let n = document.createElement("button");
			n.textContent = s("Pick an existing group"), n.style.margin = "auto", n.addEventListener("click", (n) => {
				new d(e, t, this.onSelectGroup).render();
			});
			let i = document.createElement("button");
			i.textContent = s("Create a new group"), i.style.margin = "auto", i.addEventListener("click", (e) => {
				this.createNewGroup(t, this.options.defaultNewGroupName).then(({ group: e }) => {
					new p(this.element, t, e, this.onSelectGroup).render();
				}).catch((e) => {
					this.element.appendChild(r(document, s(`Error creating a new group. (${e})`)));
				});
			}), e.appendChild(n), e.appendChild(i), this.element.innerHTML = "", this.element.appendChild(e);
		}).catch((e) => {
			this.element.appendChild(r(document, s(`Could find your groups. (${e})`)));
		});
		return this.element.innerHTML = "", this.element.appendChild(e), this;
	}
	findAddressBook(t) {
		return new Promise((n, r) => {
			l.fetcher.nowOrWhenFetched(t, (i, a) => {
				if (!i) return r(a);
				let o = l.any(null, e.solid("forClass"), e.vcard("AddressBook"));
				if (!o) return r(/* @__PURE__ */ Error("no address book registered in the solid type index " + t));
				let s = l.any(o, e.solid("instance"));
				if (!s) return r(/* @__PURE__ */ Error("incomplete address book registration"));
				l.fetcher.load(s).then(function(e) {
					return n({ book: s });
				}).catch(function(e) {
					return r(/* @__PURE__ */ Error("Could not load address book " + e));
				});
			});
		});
	}
	createNewGroup(n, r) {
		let { groupIndex: i, groupContainer: o } = _(n), s = a.sym(`${o.uri}${c().slice(0, 8)}.ttl#this`), u = r || "Untitled Group", d = [s.doc(), i].map((t) => {
			let r = a.st(s, e.rdf("type"), e.vcard("Group"), t), o = a.st(s, e.vcard("fn"), u, s.doc(), t), c = a.st(n, e.vcard("includesGroup"), s, t), d = t.equals(i) ? [
				r,
				o,
				c
			] : [r, o];
			return g(t.uri, { toIns: d }).then(() => {
				d.forEach((e) => {
					l.add(e);
				});
			});
		});
		return Promise.all(d).then(() => ({ group: s })).catch((e) => {
			throw t("Could not create new group.  PATCH failed " + e), Error(`Couldn't create new group.  PATCH failed for (${e.xhr ? e.xhr.responseURL : ""} )`);
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
			this.element.appendChild(r(document, s(`There was an error loading your groups. (${e})`)));
		}), this;
	}
	loadGroups() {
		return new Promise((t, n) => {
			let { groupIndex: r } = _(this.book);
			l.fetcher.nowOrWhenFetched(r, (r, i) => r ? t(l.each(this.book, e.vcard("includesGroup"))) : n(i));
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
		return t.textContent = s(h(this.group, e.vcard("fn"), `[${this.group.value}]`)), this.element.innerHTML = "", this.element.appendChild(t), this;
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
		t.style.maxWidth = "350px", t.style.minHeight = "200px", t.style.outline = "1px solid black", t.style.display = "flex", t.style.flexDirection = "column", n(t, (e) => {
			e.forEach((e) => {
				this.add(e).catch((e) => {
					this.element.appendChild(r(document, s(`Could not add the given WebId. (${e})`)));
				});
			});
		});
		let i = document.createElement("input");
		i.type = "text", i.value = h(this.group, e.vcard("fn"), "Untitled Group"), i.addEventListener("change", (e) => {
			this.setGroupName(e.target.value).catch((e) => {
				this.element.appendChild(r(document, `Error changing group name. (${e})`));
			});
		});
		let a = document.createElement("label");
		if (a.textContent = s("Group Name:"), a.appendChild(i), t.appendChild(a), l.any(this.group, e.vcard("hasMember"))) l.match(this.group, e.vcard("hasMember")).forEach((e) => {
			let n = e.object, r = document.createElement("div");
			new m(r, n, this.handleRemove(n)).render(), t.appendChild(r);
		});
		else {
			let e = document.createElement("p");
			e.textContent = s`
        To add someone to this group, drag and drop their WebID URL onto the box.
      `, t.appendChild(e);
		}
		let o = document.createElement("button");
		return o.textContent = s("Done"), o.addEventListener("click", (e) => {
			this.doneBuildingCb(this.group);
		}), t.appendChild(o), this.element.innerHTML = "", this.element.appendChild(t), this;
	}
	add(t) {
		return new Promise((n, r) => {
			l.fetcher.nowOrWhenFetched(t, (i, o) => {
				if (!i) return this.onGroupChanged(o), r(o);
				let s = a.namedNode(t), c = l.any(s, e.rdf("type"));
				return !c || !c.equals(e.foaf("Person")) ? r(/* @__PURE__ */ Error(`Only people supported right now. (tried to add something of type ${c.value})`)) : n(s);
			});
		}).then((t) => {
			let n = a.st(this.group, e.vcard("hasMember"), t);
			return l.holdsStatement(n) ? t : g(this.group.doc().uri, { toIns: [n] }).then(() => {
				n.why = this.group.doc(), l.add(n), this.onGroupChanged(null, "added", t), this.render();
			});
		});
	}
	handleRemove(t) {
		return (n) => {
			let r = a.st(this.group, e.vcard("hasMember"), t);
			return g(this.group.doc().uri, { toDel: [r] }).then(() => (l.remove(r), this.onGroupChanged(null, "removed", t), this.render(), !0)).catch((n) => {
				let r = l.any(t, e.foaf("name")), i = r && r.value ? `Could not remove ${r.value}. (${n})` : `Could not remove ${t.value}. (${n})`;
				throw Error(i);
			});
		};
	}
	setGroupName(t) {
		let { groupIndex: n } = _(this.book), r = [this.group.doc(), n].map((n) => {
			let r = l.match(this.group, e.vcard("fn"), null, n), i = a.st(this.group, e.vcard("fn"), a.literal(t));
			return g(n.value, {
				toDel: r,
				toIns: [i]
			}).then((e) => {
				l.removeStatements(r), i.why = n, l.add(i);
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
		let n = h(this.webIdNode, e.foaf("img"), i + "noun_15059.svg"), a = document.createElement("img");
		a.src = s(n), a.width = "50", a.height = "50", a.style.margin = "5px";
		let o = h(this.webIdNode, e.foaf("name"), `[${this.webIdNode}]`), c = document.createElement("span");
		c.innerHTML = s(o), c.style.flexGrow = "1", c.style.margin = "auto 0";
		let l = document.createElement("button");
		return l.textContent = "Remove", l.addEventListener("click", (e) => this.handleRemove().catch((e) => {
			this.element.appendChild(r(document, s(`${e}`)));
		})), l.style.margin = "5px", t.appendChild(a), t.appendChild(c), t.appendChild(l), this.element.innerHTML = "", this.element.appendChild(t), this;
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
function _(t) {
	return {
		groupIndex: l.any(t, e.vcard("groupIndex")),
		groupContainer: l.sym(t.dir().uri + "Group/")
	};
}
//#endregion
export { f as Group, p as GroupBuilder, d as GroupPicker, u as PeoplePicker, m as Person };

//# sourceMappingURL=peoplePicker.esm.js.map