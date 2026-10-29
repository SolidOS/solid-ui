import { __exportAll as e } from "../_virtual/_rolldown/runtime.esm.js";
import { log as t } from "./debug.esm.js";
import { ensureLoadedPreferences as n } from "../login/login.esm.js";
import { errorMessageBlock as r } from "../widgets/error.esm.js";
import { complain as i } from "../widgets/buttons.esm.js";
import { appendForm as a, newThing as o } from "../widgets/forms.esm.js";
import s from "./ns.esm.js";
import { participationObject as c } from "./participation.esm.js";
import "../widgets/index.esm.js";
import * as l from "rdflib";
import { store as u } from "solid-logic";
// src/lib/preferences.js
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
function h(e, n) {
	if (typeof n != "string") throw t("Non-string value of preference " + e + ": " + n), Error("Non-string value of preference " + e + ": " + n);
	this.value[e] = n;
}
function g(e, n) {
	return new Promise(function(r, i) {
		let a = f.any(e, s.ui("sharedPreferences"));
		if (a) n.sharedPreferences = a, r(n);
		else {
			f.updater.editable(e.doc()) || (t(` Cant make shared preferences, may not change ${e.doc}`), r(n));
			let a = l.sym(e.doc().uri + "#SharedPreferences"), o = [l.st(e, s.ui("sharedPreferences"), a, e.doc())];
			t("Creating shared preferences " + a), f.updater.update([], o, function(e, t, o) {
				t ? (n.sharedPreferences = a, r(n)) : i(/* @__PURE__ */ Error("Error creating shared prefs: " + o));
			});
		}
	});
}
function _(e, r) {
	return new Promise(function(i, a) {
		n(r).then((n) => {
			if (!n.preferencesFile) {
				t("Not doing private class preferences as no access to preferences file. " + n.preferencesFileError);
				return;
			}
			let r = f.each(null, s.solid("forClass"), e, n.preferencesFile), c = [], u, d;
			if (r.length) {
				if (r.forEach((e) => {
					u ||= f.any(e, s.solid("personalDefaults"));
				}), u) {
					n.personalDefaults = u, i(n);
					return;
				}
				u = o(n.preferencesFile), d = r[0];
			} else d = o(n.preferencesFile), c = [l.st(d, s.rdf("type"), s.solid("TypeRegistration"), n.preferencesFile), l.st(d, s.solid("forClass"), e, n.preferencesFile)];
			u = o(n.preferencesFile), c.push(l.st(d, s.solid("personalDefaults"), u, n.preferencesFile)), f.updater.update([], c, function(t, r, o) {
				r ? (n.personalDefaults = u, i(n)) : a(/* @__PURE__ */ Error("Setting preferences for " + e + ": " + o));
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
	return e.datatype ? e.datatype.equals(s.xsd("boolean")) ? e.value === "1" : e.datatype.equals(s.xsd("dateTime")) || e.datatype.equals(s.xsd("date")) ? new Date(e.value) : e.datatype.equals(s.xsd("integer")) || e.datatype.equals(s.xsd("float")) || e.datatype.equals(s.xsd("decimal")) ? Number(e.value) : e.value : e;
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
export { m as get, b as getPreferencesForClass, d as preferences_exports, _ as recordPersonalDefaults, g as recordSharedPreferences, v as renderPreferencesForm, h as set, p as value };

//# sourceMappingURL=preferences.esm.js.map