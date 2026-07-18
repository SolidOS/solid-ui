import { label as e } from "../utils/label.esm.js";
import "../utils/index.esm.js";
import { error as t, log as n, warn as r } from "../lib/debug.esm.js";
import { adoptACLDefault as i, getProspectiveHolder as a, makeACLGraphbyCombo as o, sameACL as s } from "./acl.esm.js";
import { style as c } from "../lib/style.esm.js";
import { AccessGroups as l } from "./access-groups.esm.js";
import { shortNameForFolder as u } from "./acl-control.esm.js";
import { UpdateManager as d, fetcher as f, graph as p } from "rdflib";
//#region src/acl/access-controller.ts
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
	constructor(e, t, n, r, a, o, u, d, f, p, m, h) {
		if (this.subject = e, this.noun = t, this.context = n, this.statusElement = r, this.targetIsProtected = a, this.targetDoc = o, this.targetACLDoc = u, this.defaultHolder = d, this.defaultACLDoc = f, this.prospectiveDefaultHolder = p, this.store = m, this.dom = h, this.rootElement = h.createElement("div"), this.rootElement.setAttribute("style", c.aclGroupContent), this.isContainer = o.uri.slice(-1) === "/", d && f) {
			this.isUsingDefaults = !0;
			let e = i(this.targetDoc, u, d, f);
			this.mainCombo = new l(o, u, this, e, { defaults: this.isContainer }), this.defaultsCombo = null, this.defaultsDiffer = !1;
		} else this.isUsingDefaults = !1, this.mainCombo = new l(o, u, this, m), this.defaultsCombo = new l(o, u, this, m, { defaults: this.isContainer }), this.defaultsDiffer = !s(this.mainCombo.aclMap, this.defaultsCombo.aclMap);
	}
	get isEditable() {
		return !this.isUsingDefaults;
	}
	render() {
		if (this.rootElement.innerHTML = "", this.isUsingDefaults) {
			if (this.renderStatus(`The sharing for this ${this.noun} is the default for folder `), this.defaultHolder) {
				let e = this.statusElement.appendChild(this.dom.createElement("a"));
				e.href = this.defaultHolder.uri, e.innerText = u(this.defaultHolder);
			}
		} else !this.defaultsDiffer && this.isContainer ? this.renderStatus("This is also the default for things in this folder.") : this.renderStatus("");
		return this.rootElement.appendChild(this.mainCombo.render()), this.defaultsCombo && this.defaultsDiffer ? (this.rootElement.appendChild(this.renderRemoveDefaultsController()), this.rootElement.appendChild(this.defaultsCombo.render())) : this.isEditable && this.isContainer && this.rootElement.appendChild(this.renderAddDefaultsController()), !this.targetIsProtected && this.isUsingDefaults ? this.rootElement.appendChild(this.renderAddAclsController()) : this.targetIsProtected || this.rootElement.appendChild(this.renderRemoveAclsController()), this.rootElement;
	}
	renderRemoveAclsController() {
		let t = this.dom.createElement("button");
		return t.innerText = `Remove custom sharing settings for this ${this.noun} -- just use default${this.prospectiveDefaultHolder ? ` for ${e(this.prospectiveDefaultHolder)}` : ""}`, t.setAttribute("style", c.bigButton), t.addEventListener("click", () => this.removeAcls().then(() => this.render()).catch((e) => this.renderStatus(e))), t;
	}
	renderAddAclsController() {
		let e = this.dom.createElement("button");
		return e.innerText = `Set specific sharing for this ${this.noun}`, e.setAttribute("style", c.bigButton), e.addEventListener("click", () => this.addAcls().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderAddDefaultsController() {
		let e = this.dom.createElement("div");
		e.setAttribute("style", c.defaultsController);
		let t = e.appendChild(this.dom.createElement("div"));
		t.innerText = "Sharing for things within the folder currently tracks sharing for the folder.", t.setAttribute("style", c.defaultsControllerNotice);
		let n = e.appendChild(this.dom.createElement("button"));
		return n.innerText = "Set the sharing of folder contents separately from the sharing for the folder", n.setAttribute("style", c.bigButton), n.addEventListener("click", () => this.addDefaults().then(() => this.render())), e;
	}
	renderRemoveDefaultsController() {
		let e = this.dom.createElement("div");
		e.setAttribute("style", c.defaultsController);
		let t = e.appendChild(this.dom.createElement("div"));
		t.innerText = "Access to things within this folder:", t.setAttribute("style", c.defaultsControllerNotice);
		let n = e.appendChild(this.dom.createElement("button"));
		return n.innerText = "Set default for folder contents to just track the sharing for the folder", n.setAttribute("style", c.bigButton), n.addEventListener("click", () => this.removeDefaults().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderTemporaryStatus(e) {
		this.statusElement.setAttribute("style", c.aclControlBoxStatusRevealed), this.statusElement.innerText = e, this.statusElement.setAttribute("style", c.temporaryStatusInit), setTimeout(() => {
			this.statusElement.setAttribute("style", c.temporaryStatusEnd);
		}), setTimeout(() => {
			this.statusElement.innerText = "";
		}, 5e3);
	}
	renderStatus(e) {
		e || this.statusElement.setAttribute("style", c.aclControlBoxStatusRevealed), this.statusElement.innerText = e;
	}
	async addAcls() {
		if (!this.defaultHolder || !this.defaultACLDoc) {
			let e = "Unable to find defaults to copy";
			return t(e), Promise.reject(e);
		}
		i(this.targetDoc, this.targetACLDoc, this.defaultHolder, this.defaultACLDoc).statements.forEach((e) => this.store.add(e.subject, e.predicate, e.object, this.targetACLDoc));
		try {
			return await this.store.fetcher.putBack(this.targetACLDoc), this.isUsingDefaults = !1, Promise.resolve();
		} catch (e) {
			let n = ` Error writing back access control file! ${e}`;
			return t(n), Promise.reject(n);
		}
	}
	async addDefaults() {
		this.defaultsCombo = new l(this.targetDoc, this.targetACLDoc, this, this.store, { defaults: !0 }), this.defaultsDiffer = !0;
	}
	async removeAcls() {
		try {
			await this.store.fetcher.delete(this.targetACLDoc.uri, {}), this.isUsingDefaults = !0;
			try {
				this.prospectiveDefaultHolder = await a(this.targetDoc.uri);
			} catch (e) {
				r(e);
			}
		} catch (e) {
			let n = `Error deleting access control file: ${this.targetACLDoc}: ${e}`;
			return t(n), Promise.reject(n);
		}
	}
	async removeDefaults() {
		let e = this.defaultsCombo;
		try {
			this.defaultsCombo = null, this.defaultsDiffer = !1, await this.save();
		} catch (n) {
			return this.defaultsCombo = e, this.defaultsDiffer = !0, t(n), Promise.reject(n);
		}
	}
	save() {
		let e = p();
		this.isContainer ? this.defaultsCombo && this.defaultsDiffer ? (o(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0), o(e, this.targetDoc, this.defaultsCombo.byCombo, this.targetACLDoc, !1, !0)) : o(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0, !0) : o(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0), e.fetcher = f(e, { fetch: this.store.fetcher._fetch });
		let t = e.updater || new d(e);
		return new Promise((r, i) => {
			t.put(this.targetACLDoc, e.statementsMatching(void 0, void 0, void 0, this.targetACLDoc), "text/turtle", (t, a, o) => {
				if (!a) return i(/* @__PURE__ */ Error(`ACL file save failed: ${o}`));
				this.store.fetcher.unload(this.targetACLDoc), this.store.add(e.statements), this.store.fetcher.requested[this.targetACLDoc.uri] = "done", this.mainCombo.store = this.store, this.defaultsCombo && (this.defaultsCombo.store = this.store), this.defaultsDiffer = !!this.defaultsCombo && !s(this.mainCombo.aclMap, this.defaultsCombo.aclMap), n("ACL modification: success!"), r();
			});
		});
	}
};
//#endregion
export { m as AccessController };

//# sourceMappingURL=access-controller.esm.js.map