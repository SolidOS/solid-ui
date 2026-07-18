import e from "../lib/ns.esm.js";
import { label as t } from "../utils/label.esm.js";
import "../utils/index.esm.js";
import { log as n } from "../lib/debug.esm.js";
import { style as r } from "../lib/style.esm.js";
import { icons as i } from "../lib/iconBase.esm.js";
import { askName as a, button as o, cancelButton as s, continueButton as c, iconForClass as l, personTR as u } from "../widgets/buttons.esm.js";
import "../widgets/index.esm.js";
import { ensureLoadedProfile as d } from "../login/login.esm.js";
//#region src/acl/add-agent-buttons.ts
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
		return o(this.groupList.controller.dom, `${i.iconBase}noun_34653_green.svg`, "Add ...", () => {
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
		return o(this.groupList.controller.dom, i.iconBase + l["vcard:Individual"], "Add Person", (t) => {
			this.renderSimplifiedBar(t.target), this.renderNameForm(e.vcard("Individual"), "person").then((e) => this.addPerson(e)).then(() => this.renderCleanup()).catch((e) => this.groupList.controller.renderStatus(e));
		});
	}
	renderGroupButton() {
		return o(this.groupList.controller.dom, i.iconBase + l["vcard:Group"], "Add Group", (t) => {
			this.renderSimplifiedBar(t.target), this.renderNameForm(e.vcard("Group"), "group").then((e) => this.addGroup(e)).then(() => this.renderCleanup()).catch((e) => this.groupList.controller.renderStatus(e));
		});
	}
	renderNameForm(t, n) {
		return a(this.groupList.controller.dom, this.groupList.store, this.barElement, e.vcard("URI"), t, n);
	}
	renderPublicButton() {
		return o(this.groupList.controller.dom, i.iconBase + l["foaf:Agent"], "Add Everyone", () => this.addAgent(e.foaf("Agent").uri).then(() => this.groupList.controller.renderTemporaryStatus("Adding the general public to those who can read. Drag the globe to a different level to give them more access.")).then(() => this.renderCleanup()));
	}
	renderAuthenticatedAgentButton() {
		return o(this.groupList.controller.dom, `${i.iconBase}noun_99101.svg`, "Anyone logged In", () => this.addAgent(e.acl("AuthenticatedAgent").uri).then(() => this.groupList.controller.renderTemporaryStatus("Adding anyone logged in to those who can read. Drag the ID icon to a different level to give them more access.")).then(() => this.renderCleanup()));
	}
	renderBotButton() {
		return o(this.groupList.controller.dom, i.iconBase + "noun_Robot_849764.svg", "A Software Agent (bot)", (t) => {
			this.renderSimplifiedBar(t.target), this.renderNameForm(e.schema("Application"), "bot").then((e) => this.addBot(e)).then(() => this.renderCleanup());
		});
	}
	renderAppsButton() {
		return o(this.groupList.controller.dom, `${i.iconBase}noun_15177.svg`, "A Web App (origin)", (t) => {
			this.renderSimplifiedBar(t.target);
			let n = {
				div: this.barElement,
				dom: this.groupList.controller.dom
			}, r = this.renderAppsTable(n).catch((e) => this.groupList.controller.renderStatus(e));
			this.renderAppsView();
			let i = this.renderNameForm(e.schema("WebApplication"), "webapp domain").then((e) => this.getOriginFromName(e));
			Promise.race([r, i]).then((e) => {
				e && this.groupList.addNewURI(e);
			}).then(() => this.renderCleanup());
		});
	}
	renderAppsView() {
		let e = this.groupList.controller.context.session.paneRegistry.byName("trustedApplications");
		if (e) {
			let t = e.render(null, this.groupList.controller.context);
			t.setAttribute("style", r.trustedAppController);
			let n = s(this.groupList.controller.dom, () => this.renderCleanup());
			n.setAttribute("style", r.trustedAppCancelButton), t.insertBefore(n, t.firstChild), this.barElement.appendChild(t);
		}
	}
	async renderAppsTable(n) {
		await d(n);
		let i = this.groupList.store.each(n.me, e.acl("trustedApp")), a = i.flatMap((t) => this.groupList.store.each(t, e.acl("origin")));
		return this.barElement.appendChild(this.groupList.controller.dom.createElement("p")).textContent = `You have ${a.length} selected web apps.`, new Promise((n, a) => {
			let o = this.barElement.appendChild(this.groupList.controller.dom.createElement("table"));
			o.setAttribute("style", r.trustedAppAddApplicationsTable), i.forEach((r) => {
				let i = this.groupList.store.any(r, e.acl("origin"));
				i || a(/* @__PURE__ */ Error(`Unable to pick app: ${r.value}`));
				let s = u(this.groupList.controller.dom, e.acl("origin"), i, {}), l = this.groupList.controller.dom.createElement("table"), d = l.appendChild(this.groupList.controller.dom.createElement("tr"));
				d.appendChild(this.groupList.controller.dom.createElement("td")).appendChild(s);
				let f = d.appendChild(this.groupList.controller.dom.createElement("td"));
				f.textContent = `Give access to ${this.groupList.controller.noun} ${t(this.groupList.controller.subject)}?`, d.appendChild(this.groupList.controller.dom.createElement("td")).appendChild(c(this.groupList.controller.dom, () => n(i.value))), o.appendChild(l);
			});
		});
	}
	renderCleanup() {
		this.renderBar(), this.groupList.render();
	}
	async addPerson(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		n(`Adding to ACL person: ${e}`), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addGroup(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		n("Adding to ACL group: " + e), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addAgent(e) {
		await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addBot(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		n("Adding to ACL bot: " + e), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async getOriginFromName(e) {
		if (!e) return Promise.resolve();
		if (!e.match(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i)) return Promise.reject(/* @__PURE__ */ Error("Not a domain name"));
		let t = "https://" + e;
		return n("Adding to ACL origin: " + t), this.toggleBar(), t;
	}
	toggleBar() {
		this.isExpanded = !this.isExpanded;
	}
};
//#endregion
export { f as AddAgentButtons };

//# sourceMappingURL=add-agent-buttons.esm.js.map