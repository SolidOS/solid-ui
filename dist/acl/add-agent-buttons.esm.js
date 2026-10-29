import { log as e } from "../lib/debug.esm.js";
import { label as t } from "../utils/label.esm.js";
import { icons as n } from "../lib/iconBase.esm.js";
import { ensureLoadedProfile as r } from "../login/login.esm.js";
import i from "../lib/ns.esm.js";
import "../utils/index.esm.js";
import { askName as a, button as o, cancelButton as s, continueButton as c, iconForClass as l, personTR as u } from "../widgets/buttons.esm.js";
import "../widgets/index.esm.js";
import { style as d } from "../lib/style.esm.js";
// src/acl/add-agent-buttons.ts
var f = class {
	groupList;
	rootElement;
	barElement;
	isExpanded = !1;
	constructor(e) {
		this.groupList = e, this.rootElement = e.controller.dom.createElement("div"), this.barElement = e.controller.dom.createElement("div");
	}
	render() {
		return this.rootElement.innerHTML = "", this.rootElement.appendChild(this.renderAddButton()), this.rootElement.appendChild(this.barElement), this.rootElement;
	}
	renderAddButton() {
		return o(this.groupList.controller.dom, `${n.iconBase}noun_34653_green.svg`, "Add ...", () => {
			this.toggleBar(), this.renderBar();
		});
	}
	renderBar() {
		this.barElement.innerHTML = "", this.isExpanded && (this.barElement.appendChild(this.renderPersonButton()), this.barElement.appendChild(this.renderGroupButton()), this.barElement.appendChild(this.renderPublicButton()), this.barElement.appendChild(this.renderAuthenticatedAgentButton()), this.barElement.appendChild(this.renderBotButton()), this.barElement.appendChild(this.renderAppsButton()));
	}
	renderSimplifiedBar(e) {
		Array.from(this.barElement.children).filter((t) => t !== e).forEach((e) => this.barElement.removeChild(e));
	}
	renderPersonButton() {
		return o(this.groupList.controller.dom, n.iconBase + l["vcard:Individual"], "Add Person", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(i.vcard("Individual"), "person").then((e) => this.addPerson(e)).then(() => this.renderCleanup()).catch((e) => this.groupList.controller.renderStatus(e));
		});
	}
	renderGroupButton() {
		return o(this.groupList.controller.dom, n.iconBase + l["vcard:Group"], "Add Group", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(i.vcard("Group"), "group").then((e) => this.addGroup(e)).then(() => this.renderCleanup()).catch((e) => this.groupList.controller.renderStatus(e));
		});
	}
	renderNameForm(e, t) {
		return a(this.groupList.controller.dom, this.groupList.store, this.barElement, i.vcard("URI"), e, t);
	}
	renderPublicButton() {
		return o(this.groupList.controller.dom, n.iconBase + l["foaf:Agent"], "Add Everyone", () => this.addAgent(i.foaf("Agent").uri).then(() => this.groupList.controller.renderTemporaryStatus("Adding the general public to those who can read. Drag the globe to a different level to give them more access.")).then(() => this.renderCleanup()));
	}
	renderAuthenticatedAgentButton() {
		return o(this.groupList.controller.dom, `${n.iconBase}noun_99101.svg`, "Anyone logged In", () => this.addAgent(i.acl("AuthenticatedAgent").uri).then(() => this.groupList.controller.renderTemporaryStatus("Adding anyone logged in to those who can read. Drag the ID icon to a different level to give them more access.")).then(() => this.renderCleanup()));
	}
	renderBotButton() {
		return o(this.groupList.controller.dom, n.iconBase + "noun_Robot_849764.svg", "A Software Agent (bot)", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(i.schema("Application"), "bot").then((e) => this.addBot(e)).then(() => this.renderCleanup());
		});
	}
	renderAppsButton() {
		return o(this.groupList.controller.dom, `${n.iconBase}noun_15177.svg`, "A Web App (origin)", (e) => {
			this.renderSimplifiedBar(e.target);
			let t = {
				div: this.barElement,
				dom: this.groupList.controller.dom
			}, n = this.renderAppsTable(t).catch((e) => this.groupList.controller.renderStatus(e));
			this.renderAppsView();
			let r = this.renderNameForm(i.schema("WebApplication"), "webapp domain").then((e) => this.getOriginFromName(e));
			Promise.race([n, r]).then((e) => {
				e && this.groupList.addNewURI(e);
			}).then(() => this.renderCleanup());
		});
	}
	renderAppsView() {
		let e = this.groupList.controller.context.session.paneRegistry.byName("trustedApplications");
		if (e) {
			let t = e.render(null, this.groupList.controller.context);
			t.setAttribute("style", d.trustedAppController);
			let n = s(this.groupList.controller.dom, () => this.renderCleanup());
			n.setAttribute("style", d.trustedAppCancelButton), t.insertBefore(n, t.firstChild), this.barElement.appendChild(t);
		}
	}
	async renderAppsTable(e) {
		await r(e);
		let n = this.groupList.store.each(e.me, i.acl("trustedApp")), a = n.flatMap((e) => this.groupList.store.each(e, i.acl("origin")));
		return this.barElement.appendChild(this.groupList.controller.dom.createElement("p")).textContent = `You have ${a.length} selected web apps.`, new Promise((e, r) => {
			let a = this.barElement.appendChild(this.groupList.controller.dom.createElement("table"));
			a.setAttribute("style", d.trustedAppAddApplicationsTable), n.forEach((n) => {
				let o = this.groupList.store.any(n, i.acl("origin"));
				o || r(/* @__PURE__ */ Error(`Unable to pick app: ${n.value}`));
				let s = u(this.groupList.controller.dom, i.acl("origin"), o, {}), l = this.groupList.controller.dom.createElement("table"), d = l.appendChild(this.groupList.controller.dom.createElement("tr"));
				d.appendChild(this.groupList.controller.dom.createElement("td")).appendChild(s);
				let f = d.appendChild(this.groupList.controller.dom.createElement("td"));
				f.textContent = `Give access to ${this.groupList.controller.noun} ${t(this.groupList.controller.subject)}?`, d.appendChild(this.groupList.controller.dom.createElement("td")).appendChild(c(this.groupList.controller.dom, () => e(o.value))), a.appendChild(l);
			});
		});
	}
	renderCleanup() {
		this.renderBar(), this.groupList.render();
	}
	async addPerson(t) {
		if (!t) return this.toggleBar();
		if (!t.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		e(`Adding to ACL person: ${t}`), await this.groupList.addNewURI(t), this.toggleBar();
	}
	async addGroup(t) {
		if (!t) return this.toggleBar();
		if (!t.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		e("Adding to ACL group: " + t), await this.groupList.addNewURI(t), this.toggleBar();
	}
	async addAgent(e) {
		await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addBot(t) {
		if (!t) return this.toggleBar();
		if (!t.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		e("Adding to ACL bot: " + t), await this.groupList.addNewURI(t), this.toggleBar();
	}
	async getOriginFromName(t) {
		if (!t) return Promise.resolve();
		if (!t.match(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i)) return Promise.reject(/* @__PURE__ */ Error("Not a domain name"));
		let n = "https://" + t;
		return e("Adding to ACL origin: " + n), this.toggleBar(), n;
	}
	toggleBar() {
		this.isExpanded = !this.isExpanded;
	}
};
export { f as AddAgentButtons };

//# sourceMappingURL=add-agent-buttons.esm.js.map