import { __exportAll as e } from "../_virtual/_rolldown/runtime.esm.js";
import t from "./ns.esm.js";
import { log as n } from "./debug.esm.js";
import { errorMessageBlock as r } from "../widgets/error.esm.js";
import { complain as i } from "../widgets/buttons.esm.js";
import { appendForm as a, newThing as o } from "../widgets/forms.esm.js";
import "../widgets/index.esm.js";
import { ensureLoadedPreferences as s } from "../login/login.esm.js";
import { participationObject as c } from "./participation.esm.js";
import * as l from "rdflib";
import { store as u } from "solid-logic";
//#region src/lib/preferences.js
var d = /* @__PURE__ */ e({
	get: () => m,
	getPreferencesForClass: () => b,
	recordPersonalDefaults: () => _,
	recordSharedPreferences: () => g,
	renderPreferencesForm: () => v,
	set: () => h,
	value: () => p
}), f = u, p = [];
function m(e) {
	return p[e];
}
function h(e, t) {
	if (typeof t != "string") throw n("Non-string value of preference " + e + ": " + t), Error("Non-string value of preference " + e + ": " + t);
	this.value[e] = t;
}
function g(e, r) {
	return new Promise(function(i, a) {
		let o = f.any(e, t.ui("sharedPreferences"));
		if (o) r.sharedPreferences = o, i(r);
		else {
			f.updater.editable(e.doc()) || (n(` Cant make shared preferences, may not change ${e.doc}`), i(r));
			let o = l.sym(e.doc().uri + "#SharedPreferences"), s = [l.st(e, t.ui("sharedPreferences"), o, e.doc())];
			n("Creating shared preferences " + o), f.updater.update([], s, function(e, t, n) {
				t ? (r.sharedPreferences = o, i(r)) : a(/* @__PURE__ */ Error("Error creating shared prefs: " + n));
			});
		}
	});
}
function _(e, r) {
	return new Promise(function(i, a) {
		s(r).then((r) => {
			if (!r.preferencesFile) {
				n("Not doing private class preferences as no access to preferences file. " + r.preferencesFileError);
				return;
			}
			let s = f.each(null, t.solid("forClass"), e, r.preferencesFile), c = [], u, d;
			if (s.length) if (s.forEach((e) => {
				u ||= f.any(e, t.solid("personalDefaults"));
			}), u) {
				r.personalDefaults = u, i(r);
				return;
			} else u = o(r.preferencesFile), d = s[0];
			else d = o(r.preferencesFile), c = [l.st(d, t.rdf("type"), t.solid("TypeRegistration"), r.preferencesFile), l.st(d, t.solid("forClass"), e, r.preferencesFile)];
			u = o(r.preferencesFile), c.push(l.st(d, t.solid("personalDefaults"), u, r.preferencesFile)), f.updater.update([], c, function(t, n, o) {
				n ? (r.personalDefaults = u, i(r)) : a(/* @__PURE__ */ Error("Setting preferences for " + e + ": " + o));
			});
		}, (e) => {
			a(e);
		});
	});
}
function v(e, t, n, o) {
	let s = o.dom.createElement("div");
	return c(e, e.doc(), o.me).then((r) => {
		let c = o.dom;
		function l(e) {
			s.appendChild(c.createElement("h5")).textContent = e;
		}
		l("My view of this " + o.noun), a(c, s, {}, r, n, e.doc(), (e, t) => {
			e || i(o, t);
		}), l("Everyone's  view of this " + o.noun), g(e, o).then((r) => {
			let o = r.sharedPreferences;
			a(c, s, {}, o, n, e.doc(), (e, t) => {
				e || i(r, t);
			}), l("My default view of any " + r.noun), _(t, r).then((e) => {
				a(c, s, {}, e.personalDefaults, n, e.preferencesFile, (t, n) => {
					t || i(e, n);
				});
			}, (e) => {
				i(r, e);
			});
		});
	}, (e) => {
		s.appendChild(r(o.dom, e));
	}), s;
}
function y(e) {
	return e.datatype ? e.datatype.equals(t.xsd("boolean")) ? e.value === "1" : e.datatype.equals(t.xsd("dateTime")) || e.datatype.equals(t.xsd("date")) ? new Date(e.value) : e.datatype.equals(t.xsd("integer")) || e.datatype.equals(t.xsd("float")) || e.datatype.equals(t.xsd("decimal")) ? Number(e.value) : e.value : e;
}
function b(e, t, n, r) {
	return new Promise(function(i, a) {
		g(e, r).then((r) => {
			let o = r.sharedPreferences;
			if (r.me) c(e, e.doc(), r.me).then((e) => {
				_(t, r).then((t) => {
					let r = [], a = t.personalDefaults;
					n.forEach((t) => {
						let n = f.any(e, t) || f.any(o, t) || f.any(a, t);
						n && (r[t.uri] = y(n));
					}), i(r);
				}, a);
			}, a);
			else {
				let e = [];
				n.forEach((t) => {
					let n = f.any(o, t);
					n && (e[t.uri] = y(n));
				}), i(e);
			}
		});
	});
}
//#endregion
export { m as get, b as getPreferencesForClass, d as preferences_exports, _ as recordPersonalDefaults, g as recordSharedPreferences, v as renderPreferencesForm, h as set, p as value };

//# sourceMappingURL=preferences.esm.js.map