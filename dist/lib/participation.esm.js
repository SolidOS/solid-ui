import { __exportAll as e } from "../_virtual/_rolldown/runtime.esm.js";
import { log as t, warn as n } from "./debug.esm.js";
import { st as r } from "rdflib";
import i from "./ns.esm.js";
import "../widgets/index.esm.js";
import { syncTableToArray as a } from "../utils/index.esm.js";
import { lightColorHash as o } from "./pad.esm.js";
import { errorMessageBlock as s } from "../widgets/error.esm.js";
import { personTR as c } from "../widgets/buttons.esm.js";
import { newThing as l } from "../widgets/forms.esm.js";
import { style as u } from "./style.esm.js";
import d from "./styleConstants.esm.js";
import { authn as f, solidLogicSingleton as p } from "solid-logic";
// src/lib/participation.ts
var m = /* @__PURE__ */ e({
	manageParticipation: () => y,
	participationObject: () => _,
	recordParticipation: () => v,
	renderParticipants: () => g
}), h = p.store;
function g(e, n, r, o, s, l) {
	n.setAttribute("style", u.participantsStyle);
	let f = function(t) {
		let r = h.any(t, i.wf("participant")), a;
		if (!r) return a = e.createElement("tr"), a.textContent = "???", a;
		let o = h.anyValue(t, i.ui("backgroundColor")) || d.participationDefaultBackground, s = e.createElement("div");
		s.setAttribute("style", u.participantsBlock), s.style.backgroundColor = o, a = c(e, null, r, l), n.appendChild(a);
		let f = e.createElement("td");
		return f.setAttribute("style", u.personTableTD), f.appendChild(s), a.insertBefore(f, a.firstChild), a;
	}, p = function() {
		let e = h.each(o, i.wf("participation")).map(function(e) {
			return t("in participants"), [h.anyValue(e, i.cal("dtstart")) || "9999-12-31", e];
		});
		e.sort();
		let r = e.map(function(e) {
			return e[1];
		});
		a(n, r, f);
	};
	return n.refresh = p, p(), n;
}
function _(e, t, a) {
	return new Promise(function(s, c) {
		if (!a) throw Error("No user id");
		let u = h.each(e, i.wf("participation")).filter(function(e) {
			return h.holds(e, i.wf("participant"), a);
		});
		if (u.length > 1) {
			let e = [];
			for (let t of u) {
				let n = h.anyValue(t, i.cal("dtstart"));
				n && e.push([n, t]);
			}
			e.sort(), n("Multiple participation objects, picking earliest, in " + t), s(e[0][1]);
		}
		if (u.length) s(u[0]);
		else {
			let n = l(t), u = [
				r(e, i.wf("participation"), n, t),
				r(n, i.wf("participant"), a, t),
				r(n, i.cal("dtstart"), /* @__PURE__ */ new Date(), t),
				r(n, i.ui("backgroundColor"), o(a), t)
			];
			h.updater.update([], u, function(e, t, r) {
				t ? s(n) : c(/* @__PURE__ */ Error("Error recording your participation: " + r));
			}), s(n);
		}
	});
}
function v(e, n, a) {
	let s = f.currentUser();
	if (!s) return;
	let c = h.each(e, i.wf("participation")).filter(function(e) {
		return h.holds(e, i.wf("participant"), s);
	});
	if (c.length > 1) throw Error("Multiple records of your participation");
	if (c.length) return c[0];
	{
		if (!h.updater.editable(n)) return t("Not recording participation, as no write access as " + s + " to " + n), null;
		let c = l(n), u = [
			r(e, i.wf("participation"), c, n),
			r(c, i.wf("participant"), s, n),
			r(c, i.cal("dtstart"), /* @__PURE__ */ new Date(), n),
			r(c, i.ui("backgroundColor"), o(s), n)
		];
		return h.updater.update([], u, function(e, t, n) {
			if (!t) throw Error("Error recording your participation: " + n);
			a && a.refresh && a.refresh();
		}), c;
	}
}
function y(e, t, n, r, i, a) {
	let o = e.createElement("table");
	t.appendChild(o), g(e, o, n, r, i, a);
	try {
		v(r, n, o);
	} catch (n) {
		t.appendChild(s(e, "Error recording your participation: " + n));
	}
	return o;
}
export { y as manageParticipation, _ as participationObject, m as participation_exports, v as recordParticipation, g as renderParticipants };

//# sourceMappingURL=participation.esm.js.map