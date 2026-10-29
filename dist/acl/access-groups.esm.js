import { ACLbyCombination as e, readACL as t } from "./acl.esm.js";
import "../widgets/index.esm.js";
import n from "../lib/ns.esm.js";
import { AddAgentButtons as r } from "./add-agent-buttons.esm.js";
import { makeDropTarget as i } from "../widgets/dragAndDrop.esm.js";
import { personTR as a } from "../widgets/buttons.esm.js";
import { error as o, log as s } from "../lib/debug.esm.js";
import { style as c } from "../lib/style.esm.js";
import { sym as l } from "rdflib";
// src/acl/access-groups.ts
var u = n.acl, d = {
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
	constructor(n, i, a, o, s = {}) {
		this.doc = n, this.aclDoc = i, this.controller = a, this._options = s, this.defaults = this._options.defaults || !1, this._store = o, this.aclMap = t(n, i, o, this.defaults), this.byCombo = e(this.aclMap), this.addAgentButton = new r(this), this.rootElement = this.controller.dom.createElement("div"), this.rootElement.setAttribute("style", c.accessGroupList);
	}
	get store() {
		return this._store;
	}
	set store(n) {
		this._store = n, this.aclMap = t(this.doc, this.aclDoc, n, this.defaults), this.byCombo = e(this.aclMap);
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
		return n.setAttribute("style", c.accessGroupListItem), i(n, (e) => this.handleDroppedUris(e, t).then(() => this.controller.render()).catch((e) => this.controller.renderStatus(e))), this.renderGroupElements(e, t).forEach((e) => n.appendChild(e)), n;
	}
	renderGroupElements(e, t) {
		let n = this.controller.dom.createElement("div");
		if (n.setAttribute("style", c.group), this.controller.isEditable) switch (e) {
			case 1:
				n.setAttribute("style", c.group1);
				break;
			case 2:
				n.setAttribute("style", c.group2);
				break;
			case 3:
				n.setAttribute("style", c.group3);
				break;
			case 5:
				n.setAttribute("style", c.group5);
				break;
			case 9:
				n.setAttribute("style", c.group9);
				break;
			case 13:
				n.setAttribute("style", c.group13);
				break;
			default: n.setAttribute("style", c.group);
		}
		n.innerText = d[e] || g(e);
		let r = this.controller.dom.createElement("div");
		if (r.setAttribute("style", c.group), this.controller.isEditable) switch (e) {
			case 1:
				r.setAttribute("style", c.group1);
				break;
			case 2:
				r.setAttribute("style", c.group2);
				break;
			case 3:
				r.setAttribute("style", c.group3);
				break;
			case 5:
				r.setAttribute("style", c.group5);
				break;
			case 9:
				r.setAttribute("style", c.group9);
				break;
			case 13:
				r.setAttribute("style", c.group13);
				break;
			default: r.setAttribute("style", c.group);
		}
		let i = r.appendChild(this.controller.dom.createElement("table"));
		(this.byCombo[t] || []).map(([e, n]) => this.renderAgent(i, t, e, n)).forEach((e) => i.appendChild(e));
		let a = this.controller.dom.createElement("div");
		if (a.setAttribute("style", c.group), this.controller.isEditable) switch (e) {
			case 1:
				a.setAttribute("style", c.group1);
				break;
			case 2:
				a.setAttribute("style", c.group2);
				break;
			case 3:
				a.setAttribute("style", c.group3);
				break;
			case 5:
				a.setAttribute("style", c.group5);
				break;
			case 9:
				a.setAttribute("style", c.group9);
				break;
			case 13:
				a.setAttribute("style", c.group13);
				break;
			default: a.setAttribute("style", c.group);
		}
		return a.innerText = p[e] || "Unusual combination", [
			n,
			r,
			a
		];
	}
	renderAgent(e, t, n, r) {
		let i = a(this.controller.dom, u(n), l(r), this.controller.isEditable ? { deleteFunction: () => this.deleteAgent(t, n, r).then(() => e.removeChild(i)).catch((e) => this.controller.renderStatus(e)) } : {});
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
	async handleDroppedUri(e, t, n = !1) {
		let r = _(e, this.store), i = l(e);
		if (!r && !n) {
			s(`   Not obvious: looking up dropped thing ${i}`);
			try {
				await this._store?.fetcher?.load(i.doc());
			} catch (e) {
				let t = `Ignore error looking up dropped thing: ${e}`;
				return o(t), Promise.reject(Error(t));
			}
			return this.handleDroppedUri(e, t, !0);
		}
		if (!r) {
			let t = Object.keys(this.store.findTypeURIs(i)), n = t.length > 0 ? `Detected RDF types: ${t.join(", ")}` : "No RDF type was detected for this URI.", r = `Error: Failed to add access target: ${e} is not a recognized ACL target type. Expected one of: vcard:WebID, vcard:Group, foaf:Person, foaf:Agent, solid:AppProvider, solid:AppProviderClass, or recognized ACL classes. Hint: try dropping a WebID profile URI, a vcard:Group URI, or a web app origin.` + n;
			return o(r), Promise.reject(Error(r));
		}
		this.setACLCombo(t, e, r, this.controller.subject);
	}
	setACLCombo(e, t, n, r) {
		e in this.byCombo || (this.byCombo[e] = []), this.removeAgentFromCombos(t), this.byCombo[e].push([n.pred, n.obj.uri]), s(`ACL: setting access to ${r} by ${n.pred}: ${n.obj}`);
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
function _(e, t) {
	let r = l(e), i = t.findTypeURIs(r);
	for (let e in i) s("    drop object type includes: " + e);
	if (e.startsWith("http") && e.split("/").length === 3) return {
		pred: "origin",
		obj: r
	};
	if (e.startsWith("http") && e.split("/").length === 4 && e.endsWith("/")) return s("Assuming final slash on dragged origin URI was unintended!"), {
		pred: "origin",
		obj: l(e.slice(0, -1))
	};
	if (n.vcard("WebID").uri in i) return {
		pred: "agent",
		obj: r
	};
	if (n.vcard("Group").uri in i) return {
		pred: "agentGroup",
		obj: r
	};
	if (r.sameTerm(n.foaf("Agent")) || r.sameTerm(n.acl("AuthenticatedAgent")) || r.sameTerm(n.rdf("Resource")) || r.sameTerm(n.owl("Thing"))) return {
		pred: "agentClass",
		obj: r
	};
	if (n.vcard("Individual").uri in i || n.foaf("Person").uri in i || n.foaf("Agent").uri in i) {
		let e = t.any(r, n.foaf("preferredURI"));
		return e ? {
			pred: "agent",
			obj: l(e)
		} : {
			pred: "agent",
			obj: r
		};
	}
	return n.solid("AppProvider").uri in i ? {
		pred: "origin",
		obj: r
	} : n.solid("AppProviderClass").uri in i ? {
		pred: "originClass",
		obj: r
	} : (s("    Triage fails for " + e), null);
}
export { m as AccessGroups };

//# sourceMappingURL=access-groups.esm.js.map