import { __exportAll as e } from "../_virtual/_rolldown/runtime.esm.js";
import * as t from "rdflib";
import { store as n } from "solid-logic";
import { log as r } from "./debug.esm.js";
import { ensureLoadedPreferences as i } from "../login/login.esm.js";
import { errorMessageBlock as a } from "../widgets/error.esm.js";
import { complain as o } from "../widgets/buttons.esm.js";
import { appendForm as s, newThing as c } from "../widgets/forms.esm.js";
import l from "./ns.esm.js";
import { participationObject as u } from "./participation.esm.js";
import "../widgets/index.esm.js";
// src/lib/preferences.js
var d = /* @__PURE__ */ e({
	get: () => m,
	getPreferencesForClass: () => b,
	recordPersonalDefaults: () => _,
	recordSharedPreferences: () => g,
	renderPreferencesForm: () => v,
	set: () => h,
	value: () => p
}), f = n, p = [];
function m(e) {
	return p[e];
}
function h(e, t) {
	if (typeof t != "string") throw r("Non-string value of preference " + e + ": " + t), Error("Non-string value of preference " + e + ": " + t);
	this.value[e] = t;
}
function g(e, n) {
	return new Promise(function(i, a) {
		let o = f.any(e, l.ui("sharedPreferences"));
		if (o) n.sharedPreferences = o, i(n);
		else {
			f.updater.editable(e.doc()) || (r(` Cant make shared preferences, may not change ${e.doc}`), i(n));
			let o = t.sym(e.doc().uri + "#SharedPreferences"), s = [t.st(e, l.ui("sharedPreferences"), o, e.doc())];
			r("Creating shared preferences " + o), f.updater.update([], s, function(e, t, r) {
				t ? (n.sharedPreferences = o, i(n)) : a(/* @__PURE__ */ Error("Error creating shared prefs: " + r));
			});
		}
	});
}
function _(e, n) {
	return new Promise(function(a, o) {
		i(n).then((n) => {
			if (!n.preferencesFile) {
				r("Not doing private class preferences as no access to preferences file. " + n.preferencesFileError);
				return;
			}
			let i = f.each(null, l.solid("forClass"), e, n.preferencesFile), s = [], u, d;
			if (i.length) {
				if (i.forEach((e) => {
					u ||= f.any(e, l.solid("personalDefaults"));
				}), u) {
					n.personalDefaults = u, a(n);
					return;
				}
				u = c(n.preferencesFile), d = i[0];
			} else d = c(n.preferencesFile), s = [t.st(d, l.rdf("type"), l.solid("TypeRegistration"), n.preferencesFile), t.st(d, l.solid("forClass"), e, n.preferencesFile)];
			u = c(n.preferencesFile), s.push(t.st(d, l.solid("personalDefaults"), u, n.preferencesFile)), f.updater.update([], s, function(t, r, i) {
				r ? (n.personalDefaults = u, a(n)) : o(/* @__PURE__ */ Error("Setting preferences for " + e + ": " + i));
			});
		}, (e) => {
			o(e);
		});
	});
}
function v(e, t, n, r) {
	let i = r.dom.createElement("div");
	return u(e, e.doc(), r.me).then((a) => {
		let c = r.dom;
		function l(e) {
			i.appendChild(c.createElement("h5")).textContent = e;
		}
		l("My view of this " + r.noun), s(c, i, {}, a, n, e.doc(), (e, t) => {
			e || o(r, t);
		}), l("Everyone's  view of this " + r.noun), g(e, r).then((r) => {
			let a = r.sharedPreferences;
			s(c, i, {}, a, n, e.doc(), (e, t) => {
				e || o(r, t);
			}), l("My default view of any " + r.noun), _(t, r).then((e) => {
				s(c, i, {}, e.personalDefaults, n, e.preferencesFile, (t, n) => {
					t || o(e, n);
				});
			}, (e) => {
				o(r, e);
			});
		});
	}, (e) => {
		i.appendChild(a(r.dom, e));
	}), i;
}
function y(e) {
	return e.datatype ? e.datatype.equals(l.xsd("boolean")) ? e.value === "1" : e.datatype.equals(l.xsd("dateTime")) || e.datatype.equals(l.xsd("date")) ? new Date(e.value) : e.datatype.equals(l.xsd("integer")) || e.datatype.equals(l.xsd("float")) || e.datatype.equals(l.xsd("decimal")) ? Number(e.value) : e.value : e;
}
function b(e, t, n, r) {
	return new Promise(function(i, a) {
		g(e, r).then((r) => {
			let o = r.sharedPreferences;
			if (r.me) u(e, e.doc(), r.me).then((e) => {
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