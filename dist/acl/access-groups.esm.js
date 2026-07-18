import e from "../lib/ns.esm.js";
import { error as t, log as n } from "../lib/debug.esm.js";
import { ACLbyCombination as r, readACL as i } from "./acl.esm.js";
import { style as a } from "../lib/style.esm.js";
import { makeDropTarget as o } from "../widgets/dragAndDrop.esm.js";
import { personTR as s } from "../widgets/buttons.esm.js";
import "../widgets/index.esm.js";
import { AddAgentButtons as c } from "./add-agent-buttons.esm.js";
import { sym as l } from "rdflib";
//#region src/acl/access-groups.ts
var u = e.acl, d = {
	13: "Owners",
	9: "Owners (write locked)",
	5: "Editors",
	3: "Posters",
	2: "Submitters",
	1: "Viewers"
}, f = {
	13: !0,
	5: !0,
	3: !0,
	2: !0,
	1: !0
}, p = {
	13: "can read, write, and control sharing.",
	9: "can read and control sharing, currently write-locked.",
	5: "can read and change information",
	3: "can add new information, and read but not change existing information",
	2: "can add new information but not read any",
	1: "can read but not change information"
}, m = class {
	doc;
	aclDoc;
	controller;
	_options;
	defaults;
	byCombo;
	aclMap;
	addAgentButton;
	rootElement;
	_store;
	constructor(e, t, n, o, s = {}) {
		this.doc = e, this.aclDoc = t, this.controller = n, this._options = s, this.defaults = this._options.defaults || !1, this._store = o, this.aclMap = i(e, t, o, this.defaults), this.byCombo = r(this.aclMap), this.addAgentButton = new c(this), this.rootElement = this.controller.dom.createElement("div"), this.rootElement.setAttribute("style", a.accessGroupList);
	}
	get store() {
		return this._store;
	}
	set store(e) {
		this._store = e, this.aclMap = i(this.doc, this.aclDoc, e, this.defaults), this.byCombo = r(this.aclMap);
	}
	render() {
		return this.rootElement.innerHTML = "", this.renderGroups().forEach((e) => this.rootElement.appendChild(e)), this.controller.isEditable && this.rootElement.appendChild(this.addAgentButton.render()), this.rootElement;
	}
	renderGroups() {
		let e = [];
		for (let t = 15; t > 0; t--) {
			let n = h(t);
			(this.controller.isEditable && f[t] || this.byCombo[n]) && e.push(this.renderGroup(t, n));
		}
		return e;
	}
	renderGroup(e, t) {
		let n = this.controller.dom.createElement("div");
		return n.setAttribute("style", a.accessGroupListItem), o(n, (e) => this.handleDroppedUris(e, t).then(() => this.controller.render()).catch((e) => this.controller.renderStatus(e))), this.renderGroupElements(e, t).forEach((e) => n.appendChild(e)), n;
	}
	renderGroupElements(e, t) {
		let n = this.controller.dom.createElement("div");
		if (n.setAttribute("style", a.group), this.controller.isEditable) switch (e) {
			case 1:
				n.setAttribute("style", a.group1);
				break;
			case 2:
				n.setAttribute("style", a.group2);
				break;
			case 3:
				n.setAttribute("style", a.group3);
				break;
			case 5:
				n.setAttribute("style", a.group5);
				break;
			case 9:
				n.setAttribute("style", a.group9);
				break;
			case 13:
				n.setAttribute("style", a.group13);
				break;
			default: n.setAttribute("style", a.group);
		}
		n.innerText = d[e] || g(e);
		let r = this.controller.dom.createElement("div");
		if (r.setAttribute("style", a.group), this.controller.isEditable) switch (e) {
			case 1:
				r.setAttribute("style", a.group1);
				break;
			case 2:
				r.setAttribute("style", a.group2);
				break;
			case 3:
				r.setAttribute("style", a.group3);
				break;
			case 5:
				r.setAttribute("style", a.group5);
				break;
			case 9:
				r.setAttribute("style", a.group9);
				break;
			case 13:
				r.setAttribute("style", a.group13);
				break;
			default: r.setAttribute("style", a.group);
		}
		let i = r.appendChild(this.controller.dom.createElement("table"));
		(this.byCombo[t] || []).map(([e, n]) => this.renderAgent(i, t, e, n)).forEach((e) => i.appendChild(e));
		let o = this.controller.dom.createElement("div");
		if (o.setAttribute("style", a.group), this.controller.isEditable) switch (e) {
			case 1:
				o.setAttribute("style", a.group1);
				break;
			case 2:
				o.setAttribute("style", a.group2);
				break;
			case 3:
				o.setAttribute("style", a.group3);
				break;
			case 5:
				o.setAttribute("style", a.group5);
				break;
			case 9:
				o.setAttribute("style", a.group9);
				break;
			case 13:
				o.setAttribute("style", a.group13);
				break;
			default: o.setAttribute("style", a.group);
		}
		return o.innerText = p[e] || "Unusual combination", [
			n,
			r,
			o
		];
	}
	renderAgent(e, t, n, r) {
		let i = s(this.controller.dom, u(n), l(r), this.controller.isEditable ? { deleteFunction: () => this.deleteAgent(t, n, r).then(() => e.removeChild(i)).catch((e) => this.controller.renderStatus(e)) } : {});
		return i;
	}
	async deleteAgent(e, t, n) {
		let r = this.byCombo[e] || [], i = r.find(([e, r]) => e === t && r === n);
		i && r.splice(r.indexOf(i), 1), await this.controller.save();
	}
	async addNewURI(e) {
		await this.handleDroppedUri(e, h(1)), await this.controller.save();
	}
	async handleDroppedUris(e, t) {
		try {
			await Promise.all(e.map((e) => this.handleDroppedUri(e, t))), await this.controller.save();
		} catch (e) {
			return Promise.reject(e);
		}
	}
	async handleDroppedUri(e, r, i = !1) {
		let a = _(e, this.store), o = l(e);
		if (!a && !i) {
			n(`   Not obvious: looking up dropped thing ${o}`);
			try {
				await this._store?.fetcher?.load(o.doc());
			} catch (e) {
				let n = `Ignore error looking up dropped thing: ${e}`;
				return t(n), Promise.reject(Error(n));
			}
			return this.handleDroppedUri(e, r, !0);
		} else if (!a) {
			let n = Object.keys(this.store.findTypeURIs(o)), r = n.length > 0 ? `Detected RDF types: ${n.join(", ")}` : "No RDF type was detected for this URI.", i = `Error: Failed to add access target: ${e} is not a recognized ACL target type. Expected one of: vcard:WebID, vcard:Group, foaf:Person, foaf:Agent, solid:AppProvider, solid:AppProviderClass, or recognized ACL classes. Hint: try dropping a WebID profile URI, a vcard:Group URI, or a web app origin.` + r;
			return t(i), Promise.reject(Error(i));
		}
		this.setACLCombo(r, e, a, this.controller.subject);
	}
	setACLCombo(e, t, r, i) {
		e in this.byCombo || (this.byCombo[e] = []), this.removeAgentFromCombos(t), this.byCombo[e].push([r.pred, r.obj.uri]), n(`ACL: setting access to ${i} by ${r.pred}: ${r.obj}`);
	}
	removeAgentFromCombos(e) {
		for (let t = 0; t < 16; t++) {
			let n = this.byCombo[h(t)];
			if (n) for (let t = 0; t < n.length; t++) for (; t < n.length && n[t][1] === e;) n.splice(t, 1);
		}
	}
};
function h(e) {
	let t = [
		"Read",
		"Append",
		"Write",
		"Control"
	], n = [];
	for (let r = 0; r < 4; r++) e & 1 << r && n.push("http://www.w3.org/ns/auth/acl#" + t[r]);
	return n.sort(), n.join("\n");
}
function g(e) {
	let t = "", n = [
		"Read",
		"Append",
		"Write",
		"Control"
	];
	for (let r = 0; r < 4; r++) e & 1 << r && (t += n[r]);
	return t;
}
function _(t, r) {
	let i = l(t), a = r.findTypeURIs(i);
	for (let e in a) n("    drop object type includes: " + e);
	if (t.startsWith("http") && t.split("/").length === 3) return {
		pred: "origin",
		obj: i
	};
	if (t.startsWith("http") && t.split("/").length === 4 && t.endsWith("/")) return n("Assuming final slash on dragged origin URI was unintended!"), {
		pred: "origin",
		obj: l(t.slice(0, -1))
	};
	if (e.vcard("WebID").uri in a) return {
		pred: "agent",
		obj: i
	};
	if (e.vcard("Group").uri in a) return {
		pred: "agentGroup",
		obj: i
	};
	if (i.sameTerm(e.foaf("Agent")) || i.sameTerm(e.acl("AuthenticatedAgent")) || i.sameTerm(e.rdf("Resource")) || i.sameTerm(e.owl("Thing"))) return {
		pred: "agentClass",
		obj: i
	};
	if (e.vcard("Individual").uri in a || e.foaf("Person").uri in a || e.foaf("Agent").uri in a) {
		let t = r.any(i, e.foaf("preferredURI"));
		return t ? {
			pred: "agent",
			obj: l(t)
		} : {
			pred: "agent",
			obj: i
		};
	}
	return e.solid("AppProvider").uri in a ? {
		pred: "origin",
		obj: i
	} : e.solid("AppProviderClass").uri in a ? {
		pred: "originClass",
		obj: i
	} : (n("    Triage fails for " + t), null);
}
//#endregion
export { m as AccessGroups };

//# sourceMappingURL=access-groups.esm.js.map