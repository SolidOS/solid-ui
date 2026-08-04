import { __exportAll as e } from "../_virtual/_rolldown/runtime.esm.js";
import t from "./ns.esm.js";
import { syncTableToArray as n } from "../utils/index.esm.js";
import { log as r, warn as i } from "./debug.esm.js";
import a from "./styleConstants.esm.js";
import { style as o } from "./style.esm.js";
import { errorMessageBlock as s } from "../widgets/error.esm.js";
import { personTR as c } from "../widgets/buttons.esm.js";
import { newThing as l } from "../widgets/forms.esm.js";
import "../widgets/index.esm.js";
import { lightColorHash as u } from "./pad.esm.js";
import { st as d } from "rdflib";
import { authn as f, solidLogicSingleton as p } from "solid-logic";
//#region src/lib/participation.ts
var m = /* @__PURE__ */ e({
	manageParticipation: () => y,
	participationObject: () => _,
	recordParticipation: () => v,
	renderParticipants: () => g
}), h = p.store;
function g(e, i, s, l, u, d) {
	i.setAttribute("style", o.participantsStyle);
	let f = function(n) {
		let r = h.any(n, t.wf("participant")), s;
		if (!r) return s = e.createElement("tr"), s.textContent = "???", s;
		let l = h.anyValue(n, t.ui("backgroundColor")) || a.participationDefaultBackground, u = e.createElement("div");
		u.setAttribute("style", o.participantsBlock), u.style.backgroundColor = l, s = c(e, null, r, d), i.appendChild(s);
		let f = e.createElement("td");
		return f.setAttribute("style", o.personTableTD), f.appendChild(u), s.insertBefore(f, s.firstChild), s;
	}, p = function() {
		let e = h.each(l, t.wf("participation")).map(function(e) {
			return r("in participants"), [h.anyValue(e, t.cal("dtstart")) || "9999-12-31", e];
		});
		e.sort();
		let a = e.map(function(e) {
			return e[1];
		});
		n(i, a, f);
	};
	return i.refresh = p, p(), i;
}
function _(e, n, r) {
	return new Promise(function(a, o) {
		if (!r) throw Error("No user id");
		let s = h.each(e, t.wf("participation")).filter(function(e) {
			return h.holds(e, t.wf("participant"), r);
		});
		if (s.length > 1) {
			let e = [];
			for (let n of s) {
				let r = h.anyValue(n, t.cal("dtstart"));
				r && e.push([r, n]);
			}
			e.sort(), i("Multiple participation objects, picking earliest, in " + n), a(e[0][1]);
		}
		if (s.length) a(s[0]);
		else {
			let i = l(n), s = [
				d(e, t.wf("participation"), i, n),
				d(i, t.wf("participant"), r, n),
				d(i, t.cal("dtstart"), /* @__PURE__ */ new Date(), n),
				d(i, t.ui("backgroundColor"), u(r), n)
			];
			h.updater.update([], s, function(e, t, n) {
				t ? a(i) : o(/* @__PURE__ */ Error("Error recording your participation: " + n));
			}), a(i);
		}
	});
}
function v(e, n, i) {
	let a = f.currentUser();
	if (!a) return;
	let o = h.each(e, t.wf("participation")).filter(function(e) {
		return h.holds(e, t.wf("participant"), a);
	});
	if (o.length > 1) throw Error("Multiple records of your participation");
	if (o.length) return o[0];
	{
		if (!h.updater.editable(n)) return r("Not recording participation, as no write access as " + a + " to " + n), null;
		let o = l(n), s = [
			d(e, t.wf("participation"), o, n),
			d(o, t.wf("participant"), a, n),
			d(o, t.cal("dtstart"), /* @__PURE__ */ new Date(), n),
			d(o, t.ui("backgroundColor"), u(a), n)
		];
		return h.updater.update([], s, function(e, t, n) {
			if (!t) throw Error("Error recording your participation: " + n);
			i && i.refresh && i.refresh();
		}), o;
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
//#endregion
export { y as manageParticipation, _ as participationObject, m as participation_exports, v as recordParticipation, g as renderParticipants };

//# sourceMappingURL=participation.esm.js.map