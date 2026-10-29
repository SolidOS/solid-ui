import { label as e } from "../utils/label.esm.js";
import { adoptACLDefault as t, getProspectiveHolder as n, makeACLGraphbyCombo as r, sameACL as i } from "./acl.esm.js";
import { AccessGroups as a } from "./access-groups.esm.js";
import { shortNameForFolder as o } from "./acl-control.esm.js";
import "../utils/index.esm.js";
import { error as s, log as c, warn as l } from "../lib/debug.esm.js";
import { style as u } from "../lib/style.esm.js";
import { UpdateManager as d, fetcher as f, graph as p } from "rdflib";
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
	constructor(e, n, r, o, s, c, l, d, f, p, m, h) {
		if (this.subject = e, this.noun = n, this.context = r, this.statusElement = o, this.targetIsProtected = s, this.targetDoc = c, this.targetACLDoc = l, this.defaultHolder = d, this.defaultACLDoc = f, this.prospectiveDefaultHolder = p, this.store = m, this.dom = h, this.rootElement = h.createElement("div"), this.rootElement.setAttribute("style", u.aclGroupContent), this.isContainer = c.uri.slice(-1) === "/", d && f) {
			this.isUsingDefaults = !0;
			let e = t(this.targetDoc, l, d, f);
			this.mainCombo = new a(c, l, this, e, { defaults: this.isContainer }), this.defaultsCombo = null, this.defaultsDiffer = !1;
		} else this.isUsingDefaults = !1, this.mainCombo = new a(c, l, this, m), this.defaultsCombo = new a(c, l, this, m, { defaults: this.isContainer }), this.defaultsDiffer = !i(this.mainCombo.aclMap, this.defaultsCombo.aclMap);
	}
	get isEditable() {
		return !this.isUsingDefaults;
	}
	render() {
		if (this.rootElement.innerHTML = "", this.isUsingDefaults) {
			if (this.renderStatus(`The sharing for this ${this.noun} is the default for folder `), this.defaultHolder) {
				let e = this.statusElement.appendChild(this.dom.createElement("a"));
				e.href = this.defaultHolder.uri, e.innerText = o(this.defaultHolder);
			}
		} else !this.defaultsDiffer && this.isContainer ? this.renderStatus("This is also the default for things in this folder.") : this.renderStatus("");
		return this.rootElement.appendChild(this.mainCombo.render()), this.defaultsCombo && this.defaultsDiffer ? (this.rootElement.appendChild(this.renderRemoveDefaultsController()), this.rootElement.appendChild(this.defaultsCombo.render())) : this.isEditable && this.isContainer && this.rootElement.appendChild(this.renderAddDefaultsController()), !this.targetIsProtected && this.isUsingDefaults ? this.rootElement.appendChild(this.renderAddAclsController()) : this.targetIsProtected || this.rootElement.appendChild(this.renderRemoveAclsController()), this.rootElement;
	}
	renderRemoveAclsController() {
		let t = this.dom.createElement("button");
		return t.innerText = `Remove custom sharing settings for this ${this.noun} -- just use default${this.prospectiveDefaultHolder ? ` for ${e(this.prospectiveDefaultHolder)}` : ""}`, t.setAttribute("style", u.bigButton), t.addEventListener("click", () => this.removeAcls().then(() => this.render()).catch((e) => this.renderStatus(e))), t;
	}
	renderAddAclsController() {
		let e = this.dom.createElement("button");
		return e.innerText = `Set specific sharing for this ${this.noun}`, e.setAttribute("style", u.bigButton), e.addEventListener("click", () => this.addAcls().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderAddDefaultsController() {
		let e = this.dom.createElement("div");
		e.setAttribute("style", u.defaultsController);
		let t = e.appendChild(this.dom.createElement("div"));
		t.innerText = "Sharing for things within the folder currently tracks sharing for the folder.", t.setAttribute("style", u.defaultsControllerNotice);
		let n = e.appendChild(this.dom.createElement("button"));
		return n.innerText = "Set the sharing of folder contents separately from the sharing for the folder", n.setAttribute("style", u.bigButton), n.addEventListener("click", () => this.addDefaults().then(() => this.render())), e;
	}
	renderRemoveDefaultsController() {
		let e = this.dom.createElement("div");
		e.setAttribute("style", u.defaultsController);
		let t = e.appendChild(this.dom.createElement("div"));
		t.innerText = "Access to things within this folder:", t.setAttribute("style", u.defaultsControllerNotice);
		let n = e.appendChild(this.dom.createElement("button"));
		return n.innerText = "Set default for folder contents to just track the sharing for the folder", n.setAttribute("style", u.bigButton), n.addEventListener("click", () => this.removeDefaults().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderTemporaryStatus(e) {
		this.statusElement.setAttribute("style", u.aclControlBoxStatusRevealed), this.statusElement.innerText = e, this.statusElement.setAttribute("style", u.temporaryStatusInit), setTimeout(() => {
			this.statusElement.setAttribute("style", u.temporaryStatusEnd);
		}), setTimeout(() => {
			this.statusElement.innerText = "";
		}, 5e3);
	}
	renderStatus(e) {
		e || this.statusElement.setAttribute("style", u.aclControlBoxStatusRevealed), this.statusElement.innerText = e;
	}
	async addAcls() {
		if (!this.defaultHolder || !this.defaultACLDoc) {
			let e = "Unable to find defaults to copy";
			return s(e), Promise.reject(e);
		}
		t(this.targetDoc, this.targetACLDoc, this.defaultHolder, this.defaultACLDoc).statements.forEach((e) => this.store.add(e.subject, e.predicate, e.object, this.targetACLDoc));
		try {
			return await this.store.fetcher.putBack(this.targetACLDoc), this.isUsingDefaults = !1, Promise.resolve();
		} catch (e) {
			let t = ` Error writing back access control file! ${e}`;
			return s(t), Promise.reject(t);
		}
	}
	async addDefaults() {
		this.defaultsCombo = new a(this.targetDoc, this.targetACLDoc, this, this.store, { defaults: !0 }), this.defaultsDiffer = !0;
	}
	async removeAcls() {
		try {
			await this.store.fetcher.delete(this.targetACLDoc.uri, {}), this.isUsingDefaults = !0;
			try {
				this.prospectiveDefaultHolder = await n(this.targetDoc.uri);
			} catch (e) {
				l(e);
			}
		} catch (e) {
			let t = `Error deleting access control file: ${this.targetACLDoc}: ${e}`;
			return s(t), Promise.reject(t);
		}
	}
	async removeDefaults() {
		let e = this.defaultsCombo;
		try {
			this.defaultsCombo = null, this.defaultsDiffer = !1, await this.save();
		} catch (t) {
			return this.defaultsCombo = e, this.defaultsDiffer = !0, s(t), Promise.reject(t);
		}
	}
	save() {
		let e = p();
		this.isContainer ? this.defaultsCombo && this.defaultsDiffer ? (r(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0), r(e, this.targetDoc, this.defaultsCombo.byCombo, this.targetACLDoc, !1, !0)) : r(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0, !0) : r(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0), e.fetcher = f(e, { fetch: this.store.fetcher._fetch });
		let t = e.updater || new d(e);
		return new Promise((n, r) => {
			t.put(this.targetACLDoc, e.statementsMatching(void 0, void 0, void 0, this.targetACLDoc), "text/turtle", (t, a, o) => {
				if (!a) return r(/* @__PURE__ */ Error(`ACL file save failed: ${o}`));
				this.store.fetcher.unload(this.targetACLDoc), this.store.add(e.statements), this.store.fetcher.requested[this.targetACLDoc.uri] = "done", this.mainCombo.store = this.store, this.defaultsCombo && (this.defaultsCombo.store = this.store), this.defaultsDiffer = !!this.defaultsCombo && !i(this.mainCombo.aclMap, this.defaultsCombo.aclMap), c("ACL modification: success!"), n();
			});
		});
	}
};
export { m as AccessController };

//# sourceMappingURL=access-controller.esm.js.map