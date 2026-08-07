import { __exportAll as e } from "../_virtual/_rolldown/runtime.esm.js";
//#region src/lib/log.ts
var t = /* @__PURE__ */ e({
	LogLevel: () => l,
	alert: () => x,
	clear: () => S,
	debug: () => _,
	dumpHTML: () => w,
	error: () => y,
	escapeForXML: () => D,
	info: () => v,
	logAscending: () => T,
	logDescending: () => E,
	msg: () => h,
	setInternals: () => O,
	setLevel: () => C,
	success: () => b,
	warn: () => g
}), n = 1, r = 2, i = 4, a = 8, o = 16, s = 32, c = 63, l = /* @__PURE__ */ function(e) {
	return e[e.Error = n] = "Error", e[e.Warning = r] = "Warning", e[e.Message = i] = "Message", e[e.Success = a] = "Success", e[e.Info = o] = "Info", e[e.Debug = s] = "Debug", e[e.All = c] = "All", e;
}({}), u = 7, d = !1, f = document, p = window;
function m(e, t = i, n = "mesg") {
	if (u & t) {
		if (f !== void 0) {
			let t = f.getElementById("status");
			if (!t) return;
			let r = f.createElement("span");
			r.setAttribute("class", n);
			let i = /* @__PURE__ */ new Date();
			r.innerHTML = `${i.getHours()}:${i.getMinutes()}:${i.getSeconds()} [${n}] ${D(e)}<br/>`, d ? t.insertBefore(r, t.firstChild) : t.appendChild(r);
		} else typeof console < "u" && console.log(e);
	}
}
function h(e) {
	m(e);
}
function g(e) {
	m(e, r, "warn");
}
function _(e) {
	m(e, s, "dbug");
}
function v(e) {
	m(e, o, "info");
}
function y(e) {
	m(e, n, "eror");
}
function b(e) {
	m(e, a, "good");
}
function x(e) {
	p && p.alert !== void 0 ? p.alert(e) : g(e);
}
function S() {
	let e = f?.getElementById("status");
	e && (e.innerHTML = "");
}
function C(e) {
	u = c, _("Log level is now " + e), u = e;
}
function w() {
	if (!f) return;
	let e = u;
	u = c, _(f?.body?.innerHTML || ""), u = e;
}
function T() {
	d = !0;
}
function E() {
	d = !1;
}
function D(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function O(e, t) {
	p = e, f = t;
}
//#endregion
export { l as LogLevel, x as alert, S as clear, _ as debug, w as dumpHTML, y as error, D as escapeForXML, v as info, T as logAscending, E as logDescending, t as log_exports, h as msg, O as setInternals, C as setLevel, b as success, g as warn };

//# sourceMappingURL=log.esm.js.map