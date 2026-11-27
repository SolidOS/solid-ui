import { label as e } from "../utils/label.esm.js";
import { adoptACLDefault as t, getProspectiveHolder as n, makeACLGraphbyCombo as r, sameACL as i } from "./acl.esm.js";
import { UpdateManager as a, fetcher as o, graph as s } from "rdflib";
import { AccessGroups as c } from "./access-groups.esm.js";
import { shortNameForFolder as l } from "./acl-control.esm.js";
import "../utils/index.esm.js";
import { error as u, log as d, warn as f } from "../lib/debug.esm.js";
import { style as p } from "../lib/style.esm.js";
// src/acl/access-controller.ts
var m = class {
	subject;
	noun;
	context;
	statusElement;
	targetIsProtected;
	targetDoc;
	targetACLDoc;
	defaultHolder;
	defaultACLDoc;
	prospectiveDefaultHolder;
	store;
	dom;
	mainCombo;
	defaultsCombo;
	isContainer;
	defaultsDiffer;
	rootElement;
	isUsingDefaults;
	constructor(e, n, r, a, o, s, l, u, d, f, m, h) {
		if (this.subject = e, this.noun = n, this.context = r, this.statusElement = a, this.targetIsProtected = o, this.targetDoc = s, this.targetACLDoc = l, this.defaultHolder = u, this.defaultACLDoc = d, this.prospectiveDefaultHolder = f, this.store = m, this.dom = h, this.rootElement = h.createElement("div"), this.rootElement.setAttribute("style", p.aclGroupContent), this.isContainer = s.uri.slice(-1) === "/", u && d) {
			this.isUsingDefaults = !0;
			let e = t(this.targetDoc, l, u, d);
			this.mainCombo = new c(s, l, this, e, { defaults: this.isContainer }), this.defaultsCombo = null, this.defaultsDiffer = !1;
		} else this.isUsingDefaults = !1, this.mainCombo = new c(s, l, this, m), this.defaultsCombo = new c(s, l, this, m, { defaults: this.isContainer }), this.defaultsDiffer = !i(this.mainCombo.aclMap, this.defaultsCombo.aclMap);
	}
	get isEditable() {
		return !this.isUsingDefaults;
	}
	render() {
		if (this.rootElement.innerHTML = "", this.isUsingDefaults) {
			if (this.renderStatus(`The sharing for this ${this.noun} is the default for folder `), this.defaultHolder) {
				let e = this.statusElement.appendChild(this.dom.createElement("a"));
				e.href = this.defaultHolder.uri, e.innerText = l(this.defaultHolder);
			}
		} else !this.defaultsDiffer && this.isContainer ? this.renderStatus("This is also the default for things in this folder.") : this.renderStatus("");
		return this.rootElement.appendChild(this.mainCombo.render()), this.defaultsCombo && this.defaultsDiffer ? (this.rootElement.appendChild(this.renderRemoveDefaultsController()), this.rootElement.appendChild(this.defaultsCombo.render())) : this.isEditable && this.isContainer && this.rootElement.appendChild(this.renderAddDefaultsController()), !this.targetIsProtected && this.isUsingDefaults ? this.rootElement.appendChild(this.renderAddAclsController()) : this.targetIsProtected || this.rootElement.appendChild(this.renderRemoveAclsController()), this.rootElement;
	}
	renderRemoveAclsController() {
		let t = this.dom.createElement("button");
		return t.innerText = `Remove custom sharing settings for this ${this.noun} -- just use default${this.prospectiveDefaultHolder ? ` for ${e(this.prospectiveDefaultHolder)}` : ""}`, t.setAttribute("style", p.bigButton), t.addEventListener("click", () => this.removeAcls().then(() => this.render()).catch((e) => this.renderStatus(e))), t;
	}
	renderAddAclsController() {
		let e = this.dom.createElement("button");
		return e.innerText = `Set specific sharing for this ${this.noun}`, e.setAttribute("style", p.bigButton), e.addEventListener("click", () => this.addAcls().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderAddDefaultsController() {
		let e = this.dom.createElement("div");
		e.setAttribute("style", p.defaultsController);
		let t = e.appendChild(this.dom.createElement("div"));
		t.innerText = "Sharing for things within the folder currently tracks sharing for the folder.", t.setAttribute("style", p.defaultsControllerNotice);
		let n = e.appendChild(this.dom.createElement("button"));
		return n.innerText = "Set the sharing of folder contents separately from the sharing for the folder", n.setAttribute("style", p.bigButton), n.addEventListener("click", () => this.addDefaults().then(() => this.render())), e;
	}
	renderRemoveDefaultsController() {
		let e = this.dom.createElement("div");
		e.setAttribute("style", p.defaultsController);
		let t = e.appendChild(this.dom.createElement("div"));
		t.innerText = "Access to things within this folder:", t.setAttribute("style", p.defaultsControllerNotice);
		let n = e.appendChild(this.dom.createElement("button"));
		return n.innerText = "Set default for folder contents to just track the sharing for the folder", n.setAttribute("style", p.bigButton), n.addEventListener("click", () => this.removeDefaults().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderTemporaryStatus(e) {
		this.statusElement.setAttribute("style", p.aclControlBoxStatusRevealed), this.statusElement.innerText = e, this.statusElement.setAttribute("style", p.temporaryStatusInit), setTimeout(() => {
			this.statusElement.setAttribute("style", p.temporaryStatusEnd);
		}), setTimeout(() => {
			this.statusElement.innerText = "";
		}, 5e3);
	}
	renderStatus(e) {
		e || this.statusElement.setAttribute("style", p.aclControlBoxStatusRevealed), this.statusElement.innerText = e;
	}
	async addAcls() {
		if (!this.defaultHolder || !this.defaultACLDoc) {
			let e = "Unable to find defaults to copy";
			return u(e), Promise.reject(e);
		}
		t(this.targetDoc, this.targetACLDoc, this.defaultHolder, this.defaultACLDoc).statements.forEach((e) => this.store.add(e.subject, e.predicate, e.object, this.targetACLDoc));
		try {
			return await this.store.fetcher.putBack(this.targetACLDoc), this.isUsingDefaults = !1, Promise.resolve();
		} catch (e) {
			let t = ` Error writing back access control file! ${e}`;
			return u(t), Promise.reject(t);
		}
	}
	async addDefaults() {
		this.defaultsCombo = new c(this.targetDoc, this.targetACLDoc, this, this.store, { defaults: !0 }), this.defaultsDiffer = !0;
	}
	async removeAcls() {
		try {
			await this.store.fetcher.delete(this.targetACLDoc.uri, {}), this.isUsingDefaults = !0;
			try {
				this.prospectiveDefaultHolder = await n(this.targetDoc.uri);
			} catch (e) {
				f(e);
			}
		} catch (e) {
			let t = `Error deleting access control file: ${this.targetACLDoc}: ${e}`;
			return u(t), Promise.reject(t);
		}
	}
	async removeDefaults() {
		let e = this.defaultsCombo;
		try {
			this.defaultsCombo = null, this.defaultsDiffer = !1, await this.save();
		} catch (t) {
			return this.defaultsCombo = e, this.defaultsDiffer = !0, u(t), Promise.reject(t);
		}
	}
	save() {
		let e = s();
		this.isContainer ? this.defaultsCombo && this.defaultsDiffer ? (r(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0), r(e, this.targetDoc, this.defaultsCombo.byCombo, this.targetACLDoc, !1, !0)) : r(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0, !0) : r(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0), e.fetcher = o(e, { fetch: this.store.fetcher._fetch });
		let t = e.updater || new a(e);
		return new Promise((n, r) => {
			t.put(this.targetACLDoc, e.statementsMatching(void 0, void 0, void 0, this.targetACLDoc), "text/turtle", (t, a, o) => {
				if (!a) return r(/* @__PURE__ */ Error(`ACL file save failed: ${o}`));
				this.store.fetcher.unload(this.targetACLDoc), this.store.add(e.statements), this.store.fetcher.requested[this.targetACLDoc.uri] = "done", this.mainCombo.store = this.store, this.defaultsCombo && (this.defaultsCombo.store = this.store), this.defaultsDiffer = !!this.defaultsCombo && !i(this.mainCombo.aclMap, this.defaultsCombo.aclMap), d("ACL modification: success!"), n();
			});
		});
	}
};
export { m as AccessController };

//# sourceMappingURL=access-controller.esm.js.map