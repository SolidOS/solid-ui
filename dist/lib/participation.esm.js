import { __exportAll as e } from "../_virtual/_rolldown/runtime.esm.js";
import { log as t, warn as n } from "./debug.esm.js";
import r from "./ns.esm.js";
import "../widgets/index.esm.js";
import { syncTableToArray as i } from "../utils/index.esm.js";
import { lightColorHash as a } from "./pad.esm.js";
import { errorMessageBlock as o } from "../widgets/error.esm.js";
import { personTR as s } from "../widgets/buttons.esm.js";
import { newThing as c } from "../widgets/forms.esm.js";
import { style as l } from "./style.esm.js";
import u from "./styleConstants.esm.js";
import { st as d } from "rdflib";
import { authn as f, solidLogicSingleton as p } from "solid-logic";
// src/lib/participation.ts
var m = /* @__PURE__ */ e({
	manageParticipation: () => y,
	participationObject: () => _,
	recordParticipation: () => v,
	renderParticipants: () => g
}), h = p.store;
function g(e, n, a, o, c, d) {
	n.setAttribute("style", l.participantsStyle);
	let f = function(t) {
		let i = h.any(t, r.wf("participant")), a;
		if (!i) return a = e.createElement("tr"), a.textContent = "???", a;
		let o = h.anyValue(t, r.ui("backgroundColor")) || u.participationDefaultBackground, c = e.createElement("div");
		c.setAttribute("style", l.participantsBlock), c.style.backgroundColor = o, a = s(e, null, i, d), n.appendChild(a);
		let f = e.createElement("td");
		return f.setAttribute("style", l.personTableTD), f.appendChild(c), a.insertBefore(f, a.firstChild), a;
	}, p = function() {
		let e = h.each(o, r.wf("participation")).map(function(e) {
			return t("in participants"), [h.anyValue(e, r.cal("dtstart")) || "9999-12-31", e];
		});
		e.sort();
		let a = e.map(function(e) {
			return e[1];
		});
		i(n, a, f);
	};
	return n.refresh = p, p(), n;
}
function _(e, t, i) {
	return new Promise(function(o, s) {
		if (!i) throw Error("No user id");
		let l = h.each(e, r.wf("participation")).filter(function(e) {
			return h.holds(e, r.wf("participant"), i);
		});
		if (l.length > 1) {
			let e = [];
			for (let t of l) {
				let n = h.anyValue(t, r.cal("dtstart"));
				n && e.push([n, t]);
			}
			e.sort(), n("Multiple participation objects, picking earliest, in " + t), o(e[0][1]);
		}
		if (l.length) o(l[0]);
		else {
			let n = c(t), l = [
				d(e, r.wf("participation"), n, t),
				d(n, r.wf("participant"), i, t),
				d(n, r.cal("dtstart"), /* @__PURE__ */ new Date(), t),
				d(n, r.ui("backgroundColor"), a(i), t)
			];
			h.updater.update([], l, function(e, t, r) {
				t ? o(n) : s(/* @__PURE__ */ Error("Error recording your participation: " + r));
			}), o(n);
		}
	});
}
function v(e, n, i) {
	let o = f.currentUser();
	if (!o) return;
	let s = h.each(e, r.wf("participation")).filter(function(e) {
		return h.holds(e, r.wf("participant"), o);
	});
	if (s.length > 1) throw Error("Multiple records of your participation");
	if (s.length) return s[0];
	{
		if (!h.updater.editable(n)) return t("Not recording participation, as no write access as " + o + " to " + n), null;
		let s = c(n), l = [
			d(e, r.wf("participation"), s, n),
			d(s, r.wf("participant"), o, n),
			d(s, r.cal("dtstart"), /* @__PURE__ */ new Date(), n),
			d(s, r.ui("backgroundColor"), a(o), n)
		];
		return h.updater.update([], l, function(e, t, n) {
			if (!t) throw Error("Error recording your participation: " + n);
			i && i.refresh && i.refresh();
		}), s;
	}
}
function y(e, t, n, r, i, a) {
	let s = e.createElement("table");
	t.appendChild(s), g(e, s, n, r, i, a);
	try {
		v(r, n, s);
	} catch (n) {
		t.appendChild(o(e, "Error recording your participation: " + n));
	}
	return s;
}
export { y as manageParticipation, _ as participationObject, m as participation_exports, v as recordParticipation, g as renderParticipants };

//# sourceMappingURL=participation.esm.js.map