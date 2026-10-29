// \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, s = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), c = (e, n) => {
	let r = {};
	for (var i in e) t(r, i, {
		get: e[i],
		enumerable: !0
	});
	return n || t(r, Symbol.toStringTag, { value: "Module" }), r;
}, l = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, u = (n, r, o) => (o = n == null ? {} : e(i(n)), l(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), d = (e) => a.call(e, "module.exports") ? e["module.exports"] : l(t({}, "__esModule", { value: !0 }), e), f = /* @__PURE__ */ u((/* @__PURE__ */ s(((e, t) => {
	var n = {
		acl: "http://www.w3.org/ns/auth/acl#",
		arg: "http://www.w3.org/ns/pim/arg#",
		as: "https://www.w3.org/ns/activitystreams#",
		bookmark: "http://www.w3.org/2002/01/bookmark#",
		cal: "http://www.w3.org/2002/12/cal/ical#",
		cco: "http://www.ontologyrepository.com/CommonCoreOntologies/",
		cert: "http://www.w3.org/ns/auth/cert#",
		contact: "http://www.w3.org/2000/10/swap/pim/contact#",
		dc: "http://purl.org/dc/elements/1.1/",
		dct: "http://purl.org/dc/terms/",
		doap: "http://usefulinc.com/ns/doap#",
		foaf: "http://xmlns.com/foaf/0.1/",
		geo: "http://www.w3.org/2003/01/geo/wgs84_pos#",
		gpx: "http://www.w3.org/ns/pim/gpx#",
		gr: "http://purl.org/goodrelations/v1#",
		http: "http://www.w3.org/2007/ont/http#",
		httph: "http://www.w3.org/2007/ont/httph#",
		icalTZ: "http://www.w3.org/2002/12/cal/icaltzd#",
		ldp: "http://www.w3.org/ns/ldp#",
		link: "http://www.w3.org/2007/ont/link#",
		log: "http://www.w3.org/2000/10/swap/log#",
		meeting: "http://www.w3.org/ns/pim/meeting#",
		mo: "http://purl.org/ontology/mo/",
		org: "http://www.w3.org/ns/org#",
		owl: "http://www.w3.org/2002/07/owl#",
		pad: "http://www.w3.org/ns/pim/pad#",
		patch: "http://www.w3.org/ns/pim/patch#",
		prov: "http://www.w3.org/ns/prov#",
		pto: "http://www.productontology.org/id/",
		qu: "http://www.w3.org/2000/10/swap/pim/qif#",
		trip: "http://www.w3.org/ns/pim/trip#",
		rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
		rdfs: "http://www.w3.org/2000/01/rdf-schema#",
		rss: "http://purl.org/rss/1.0/",
		sched: "http://www.w3.org/ns/pim/schedule#",
		schema: "http://schema.org/",
		sioc: "http://rdfs.org/sioc/ns#",
		skos: "http://www.w3.org/2004/02/skos/core#",
		solid: "http://www.w3.org/ns/solid/terms#",
		space: "http://www.w3.org/ns/pim/space#",
		stat: "http://www.w3.org/ns/posix/stat#",
		tab: "http://www.w3.org/2007/ont/link#",
		tabont: "http://www.w3.org/2007/ont/link#",
		ui: "http://www.w3.org/ns/ui#",
		vann: "http://purl.org/vocab/vann/",
		vcard: "http://www.w3.org/2006/vcard/ns#",
		wf: "http://www.w3.org/2005/01/wf/flow#",
		xsd: "http://www.w3.org/2001/XMLSchema#"
	};
	function r(e = { namedNode: (e) => e }) {
		let t = {};
		for (let r in n) {
			let i = n[r];
			t[r] = function(t = "") {
				return e.namedNode(i + t);
			};
		}
		return t;
	}
	t.exports = r;
})))());
function p(e) {
	"@babel/helpers - typeof";
	return p = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, p(e);
}
// node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function m(e, t) {
	if (p(e) != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (p(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
// node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function h(e) {
	var t = m(e, "string");
	return p(t) == "symbol" ? t : t + "";
}
// node_modules/@babel/runtime/helpers/esm/defineProperty.js
function g(e, t, n) {
	return (t = h(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
// node_modules/rdflib/esm/class-order.js
var _ = {
	Literal: 1,
	Collection: 3,
	Graph: 4,
	NamedNode: 5,
	BlankNode: 6,
	Variable: 7
}, v = class {
	constructor(e) {
		g(this, "termType", void 0), g(this, "classOrder", void 0), g(this, "value", void 0), this.value = e;
	}
	substitute(e) {
		return this;
	}
	compareTerm(e) {
		return this.classOrder < e.classOrder ? -1 : this.classOrder > e.classOrder ? 1 : this.value < e.value ? -1 : +(this.value > e.value);
	}
	equals(e) {
		return e ? this.termType === e.termType && this.value === e.value : !1;
	}
	hashString() {
		return this.toCanonical();
	}
	sameTerm(e) {
		return this.equals(e);
	}
	toCanonical() {
		return this.toNT();
	}
	toNT() {
		return this.toString();
	}
	toNQ() {
		return this.toNT();
	}
	toString() {
		throw Error("Node.toString() is abstract - see the subclasses instead");
	}
};
g(v, "fromValue", void 0), g(v, "toJS", void 0);
// node_modules/rdflib/esm/types.js
var y = "NamedNode", b = "BlankNode", x = "Literal", S = "Variable", C = "DefaultGraph", w = "Collection", T = "Empty", E = "Graph", D = "text/html", O = "application/ld+json", ee = "text/n3", te = "application/n3", k = "application/nquads", A = "application/n-quads", ne = "application/n-triples", re = "application/rdf+xml", ie = "text/turtle", ae = "application/x-turtle", j = "application/xhtml+xml", M = class e extends v {
	static getId(t) {
		if (t) {
			if (typeof t != "string") throw Error("Bad id argument to new blank node: " + t);
			if (t.includes("#")) {
				let e = t.split("#");
				return e[e.length - 1];
			}
			return t;
		}
		return "n" + e.nextId++;
	}
	constructor(t) {
		super(e.getId(t)), g(this, "termType", b), g(this, "classOrder", _.BlankNode), g(this, "isBlank", 1), g(this, "isVar", 1);
	}
	get id() {
		return this.value;
	}
	set id(e) {
		this.value = e;
	}
	compareTerm(e) {
		return this.classOrder < e.classOrder ? -1 : this.classOrder > e.classOrder ? 1 : this.id < e.id ? -1 : +(this.id > e.id);
	}
	copy(t) {
		var n = new e();
		return t.copyTo(this, n), n;
	}
	toCanonical() {
		return e.NTAnonymousNodePrefix + this.value;
	}
	toString() {
		return e.NTAnonymousNodePrefix + this.id;
	}
};
g(M, "nextId", 0), g(M, "NTAnonymousNodePrefix", "_:");
// node_modules/rdflib/esm/utils/termValue.js
function N(e) {
	return typeof e == "string" ? e : e.value;
}
// node_modules/rdflib/esm/utils/terms.js
function oe(e) {
	return typeof e == "object" && !!e && "subject" in e;
}
function P(e) {
	return typeof e == "object" && !!e && "statements" in e;
}
function F(e) {
	return ue(e) && e.termType === "Collection";
}
function I(e) {
	return e && Object.prototype.hasOwnProperty.call(e, "termType") && (e.termType === "NamedNode" || e.termType === "Variable" || e.termType === "BlankNode" || e.termType === "Collection" || e.termType === "Literal" || e.termType === "Graph");
}
function se(e) {
	return e && Object.prototype.hasOwnProperty.call(e, "termType") && (e.termType === "NamedNode" || e.termType === "Variable" || e.termType === "BlankNode" || e.termType === "Collection" || e.termType === "Literal" || e.termType === "Graph");
}
function ce(e) {
	return ue(e) && (e.termType === "NamedNode" || e.termType === "BlankNode" || e.termType === "Variable");
}
function le(e) {
	return ue(e) && e.termType === "Variable";
}
function ue(e) {
	return typeof e == "object" && !!e && "termType" in e;
}
function de(e) {
	return e.termType === x;
}
function fe(e) {
	return typeof e == "object" && !!e && "subject" in e && "predicate" in e && "object" in e;
}
function pe(e) {
	return ue(e) && e.termType === "NamedNode";
}
function me(e) {
	return ue(e) && "termType" in e && e.termType === "BlankNode";
}
function he(e) {
	return ue(e) && (e.termType === "NamedNode" || e.termType === "Variable" || e.termType === "BlankNode");
}
function L(e) {
	return ue(e) && (e.termType === "NamedNode" || e.termType === "Variable");
}
function ge(e) {
	return ue(e) && (e.termType === "NamedNode" || e.termType === "Variable" || e.termType === "BlankNode" || e.termType === "Literal");
}
function _e(e) {
	return ue(e) && (e.termType === "NamedNode" || e.termType === "Variable" || e.termType === "BlankNode" || e.termType === "DefaultGraph");
}
// node_modules/rdflib/esm/named-node.js
var R = class e extends v {
	constructor(e) {
		if (super(N(e)), g(this, "termType", y), g(this, "classOrder", _.NamedNode), !this.value) throw Error("Missing IRI for NamedNode");
		if (!this.value.includes(":")) throw Error("NamedNode IRI \"" + e + "\" must be absolute.");
		if (this.value.includes(" ")) {
			var t = "Error: NamedNode IRI \"" + e + "\" must not contain unencoded spaces.";
			throw Error(t);
		}
	}
	dir() {
		var t = this.value.split("#")[0], n = t.slice(0, -1).lastIndexOf("/"), r = t.indexOf("//");
		return r >= 0 && n < r + 2 || n < 0 ? null : new e(t.slice(0, n + 1));
	}
	site() {
		var t = this.value.split("#")[0], n = t.indexOf("//");
		if (n < 0) throw Error("This URI does not have a web site part (origin)");
		var r = t.indexOf("/", n + 2);
		return r < 0 ? new e(t.slice(0) + "/") : new e(t.slice(0, r + 1));
	}
	doc() {
		return this.value.indexOf("#") < 0 ? this : new e(this.value.split("#")[0]);
	}
	toString() {
		return "<" + this.value + ">";
	}
	id() {
		return this.value.split("#")[1];
	}
	get uri() {
		return this.value;
	}
	set uri(e) {
		this.value = e;
	}
	static fromValue(t) {
		return t == null || ue(t) ? t : new e(t);
	}
}, ve = {
	boolean: new R("http://www.w3.org/2001/XMLSchema#boolean"),
	dateTime: new R("http://www.w3.org/2001/XMLSchema#dateTime"),
	decimal: new R("http://www.w3.org/2001/XMLSchema#decimal"),
	double: new R("http://www.w3.org/2001/XMLSchema#double"),
	integer: new R("http://www.w3.org/2001/XMLSchema#integer"),
	langString: new R("http://www.w3.org/1999/02/22-rdf-syntax-ns#langString"),
	string: new R("http://www.w3.org/2001/XMLSchema#string")
}, ye = class e extends v {
	constructor(e, t, n) {
		super(e), g(this, "termType", x), g(this, "classOrder", _.Literal), g(this, "datatype", ve.string), g(this, "isVar", 0), g(this, "language", ""), t ? (this.language = t, this.datatype = ve.langString) : this.datatype = n ? R.fromValue(n) : ve.string;
	}
	copy() {
		return new e(this.value, this.lang, this.datatype);
	}
	equals(e) {
		return e ? this.termType === e.termType && this.value === e.value && this.language === e.language && (!this.datatype && !e.datatype || this.datatype && this.datatype.equals(e.datatype)) : !1;
	}
	get lang() {
		return this.language;
	}
	set lang(e) {
		this.language = e || "";
	}
	toNT() {
		return e.toNT(this);
	}
	static toNT(e) {
		if (typeof e.value == "number") return "" + e.value;
		if (typeof e.value != "string") throw Error("Value of RDF literal is not string or number: " + e.value);
		var t = e.value;
		return t = t.replace(/\\/g, "\\\\"), t = t.replace(/\"/g, "\\\""), t = t.replace(/\n/g, "\\n"), t = t.replace(/\r/g, "\\r"), t = "\"" + t + "\"", e.language ? t += "@" + e.language : e.datatype.equals(ve.string) || (t += "^^" + e.datatype.toCanonical()), t;
	}
	toString() {
		return "" + this.value;
	}
	static fromBoolean(t) {
		return new e(t ? "1" : "0", null, ve.boolean);
	}
	static fromDate(t) {
		if (!(t instanceof Date)) throw TypeError("Invalid argument to Literal.fromDate()");
		let n = function(e) {
			return ("" + (100 + e)).slice(1, 3);
		}, r = "" + t.getUTCFullYear() + "-" + n(t.getUTCMonth() + 1) + "-" + n(t.getUTCDate()) + "T" + n(t.getUTCHours()) + ":" + n(t.getUTCMinutes()) + ":" + n(t.getUTCSeconds()) + "Z";
		return new e(r, null, ve.dateTime);
	}
	static fromNumber(t) {
		if (typeof t != "number") throw TypeError("Invalid argument to Literal.fromNumber()");
		let n, r = t.toString();
		return n = r.indexOf("e") < 0 && Math.abs(t) <= 2 ** 53 - 1 ? Number.isInteger(t) ? ve.integer : ve.decimal : ve.double, new e(r, null, n);
	}
	static fromValue(t) {
		if (de(t)) return t;
		switch (typeof t) {
			case "object": if (t instanceof Date) return e.fromDate(t);
			case "boolean": return e.fromBoolean(t);
			case "number": return e.fromNumber(t);
			case "string": return new e(t);
		}
		throw Error("Can't make literal from " + t + " of type " + typeof t);
	}
};
// node_modules/rdflib/esm/collection.js
function be(e) {
	return e == null || ue(e) ? e : Array.isArray(e) ? new xe(e) : ye.fromValue(e);
}
var xe = class e extends v {
	constructor(e) {
		super((M.nextId++).toString()), g(this, "termType", w), g(this, "classOrder", _.Collection), g(this, "closed", !1), g(this, "compareTerm", M.prototype.compareTerm), g(this, "elements", []), g(this, "isVar", 0), e && e.length > 0 && e.forEach((e) => {
			this.elements.push(be(e));
		});
	}
	get id() {
		return this.value;
	}
	set id(e) {
		this.value = e;
	}
	append(e) {
		return this.elements.push(e);
	}
	close() {
		return this.closed = !0, this.closed;
	}
	shift() {
		return this.elements.shift();
	}
	substitute(t) {
		let n = this.elements.map((e) => e.substitute(t));
		return new e(n);
	}
	toNT() {
		return e.toNT(this);
	}
	static toNT(e) {
		return M.NTAnonymousNodePrefix + e.id;
	}
	toString() {
		return "(" + this.elements.join(" ") + ")";
	}
	unshift(e) {
		return this.elements.unshift(e);
	}
};
g(xe, "termType", w);
// node_modules/rdflib/esm/empty.js
var Se = class extends v {
	constructor() {
		super(""), g(this, "termType", T);
	}
	toString() {
		return "()";
	}
}, Ce = "chrome:theSession";
new R(Ce);
// node_modules/rdflib/esm/default-graph.js
var we = class extends v {
	constructor() {
		super(""), g(this, "value", ""), g(this, "termType", C), g(this, "uri", Ce);
	}
	toCanonical() {
		return this.value;
	}
	toString() {
		return "DefaultGraph";
	}
};
function Te(e) {
	return !!e && e.termType === "DefaultGraph";
}
// node_modules/rdflib/esm/statement.js
var Ee = new we(), De = class e {
	constructor(e, t, n, r) {
		g(this, "subject", void 0), g(this, "predicate", void 0), g(this, "object", void 0), g(this, "graph", void 0), this.subject = v.fromValue(e), this.predicate = v.fromValue(t), this.object = v.fromValue(n), this.graph = r == null ? Ee : v.fromValue(r);
	}
	get why() {
		return this.graph;
	}
	set why(e) {
		this.graph = e;
	}
	equals(e) {
		return e.subject.equals(this.subject) && e.predicate.equals(this.predicate) && e.object.equals(this.object) && e.graph.equals(this.graph);
	}
	substitute(t) {
		return new e(this.subject.substitute(t), this.predicate.substitute(t), this.object.substitute(t), Te(this.graph) ? this.graph : this.graph.substitute(t));
	}
	toCanonical() {
		let e = [
			this.subject.toCanonical(),
			this.predicate.toCanonical(),
			this.object.toCanonical()
		];
		return this.graph && this.graph.termType !== "DefaultGraph" && e.push(this.graph.toCanonical()), e.join(" ") + " .";
	}
	toNT() {
		return [
			this.subject.toNT(),
			this.predicate.toNT(),
			this.object.toNT()
		].join(" ") + " .";
	}
	toNQ() {
		return [
			this.subject.toNT(),
			this.predicate.toNT(),
			this.object.toNT(),
			Te(this.graph) ? "" : this.graph.toNT()
		].join(" ") + " .";
	}
	toString() {
		return this.toNT();
	}
}, Oe = /* @__PURE__ */ c({
	docpart: () => Ae,
	document: () => je,
	hostpart: () => Me,
	join: () => Ne,
	protocol: () => Pe,
	refTo: () => Fe
}), ke = ke || console.log;
function Ae(e) {
	var t = e.indexOf("#");
	return t < 0 ? e : e.slice(0, t);
}
function je(e) {
	return new R(Ae(e));
}
function Me(e) {
	var t = /[^\/]*\/\/([^\/]*)\//.exec(e);
	return t ? t[1] : "";
}
function Ne(e, t) {
	var n, r, i, a, o, s, c = t.indexOf("#");
	if (c > 0 && (t = t.slice(0, c)), e.length === 0) return t;
	if (e.indexOf("#") === 0) return t + e;
	if (a = e.indexOf(":"), a >= 0 || (n = t.indexOf(":"), t.length === 0)) return e;
	if (n < 0) return ke("Invalid base: " + t + " in join with given: " + e), e;
	if (r = t.slice(0, +n + 1 || 9e9), e.indexOf("//") === 0) return r + e;
	if (t.indexOf("//", n) === n + 1) {
		if (i = t.indexOf("/", n + 3), i < 0) return t.length - n - 3 > 0 ? t + "/" + e : r + e;
	} else if (i = t.indexOf("/", n + 1), i < 0) return t.length - n - 1 > 0 ? t + "/" + e : r + e;
	if (e.indexOf("/") === 0) return t.slice(0, i) + e;
	if (s = t.slice(i), o = s.lastIndexOf("/"), o < 0) return r + e;
	for (o >= 0 && o < s.length - 1 && (s = s.slice(0, +o + 1 || 9e9)), s += e; s.match(/[^\/]*\/\.\.\//);) s = s.replace(/[^\/]*\/\.\.\//, "");
	return s = s.replace(/\.\//g, ""), s = s.replace(/\/\.$/, "/"), t.slice(0, i) + s;
}
function Pe(e) {
	let t = e.indexOf(":");
	return t < 0 ? null : e.slice(0, t);
}
function Fe(e, t) {
	var n, r, i, a, o, s, c, l, u, d, f, p, m, h = /* @__PURE__ */ RegExp("^[-_a-zA-Z0-9.]+:(//[^/]*)?/[^/]*$");
	if (!e) return t;
	if (e === t) return "";
	for (r = l = 0, o = t.length; l < o && t[r] === e[r]; r = ++l);
	if (e.slice(0, r).match(h) && (i = t.indexOf("//"), i < 0 && (i = -2), a = t.indexOf("/", i + 2), t[a + 1] !== "/" && e[a + 1] !== "/" && t.slice(0, a) === e.slice(0, a))) return t.slice(a);
	if (t[r] === "#" && e.length === r) return t.slice(r);
	for (; r > 0 && t[r - 1] !== "/";) r--;
	if (r < 3 || e.indexOf("//", r - 2) > 0 || t.indexOf("//", r - 2) > 0 || e.indexOf(":", r) > 0) return t;
	for (c = 0, f = e.slice(r), u = 0, s = f.length; u < s; u++) n = f[u], n === "/" && c++;
	if (c === 0 && r < t.length && t[r] === "#") return "./" + t.slice(r);
	if (c === 0 && r === t.length) return "./";
	if (m = "", c > 0) for (d = 1, p = c; p >= 1 ? d <= p : d >= p; p >= 1 ? ++d : --d) m += "../";
	return m + t.slice(r);
}
// node_modules/rdflib/esm/variable.js
var Ie = class e extends v {
	constructor(e = "") {
		super(e), g(this, "termType", S), g(this, "base", "varid:"), g(this, "classOrder", _.Variable), g(this, "isVar", 1), g(this, "uri", void 0), this.base = "varid:", this.uri = Ne(e, this.base);
	}
	equals(e) {
		return e ? this.termType === e.termType && this.value === e.value : !1;
	}
	hashString() {
		return this.toString();
	}
	substitute(e) {
		return e[this.toNT()] ?? this;
	}
	toString() {
		return e.toString(this);
	}
	static toString(e) {
		return e.uri.slice(0, e.base.length) === e.base ? `?${e.uri.slice(e.base.length)}` : `?${e.uri}`;
	}
}, Le = /*#__PURE__*/ function(e) {
	return e.collections = "COLLECTIONS", e.defaultGraphType = "DEFAULT_GRAPH_TYPE", e.equalsMethod = "EQUALS_METHOD", e.id = "ID", e.identity = "IDENTITY", e.reversibleId = "REVERSIBLE_ID", e.variableType = "VARIABLE_TYPE", e;
}({}), Re = new we(), ze = {
	supports: {
		[Le.collections]: !1,
		[Le.defaultGraphType]: !1,
		[Le.equalsMethod]: !0,
		[Le.identity]: !1,
		[Le.id]: !0,
		[Le.reversibleId]: !1,
		[Le.variableType]: !0
	},
	blankNode(e) {
		return new M(e);
	},
	defaultGraph: () => Re,
	equals(e, t) {
		return e === t || !e || !t ? !0 : fe(e) || fe(t) ? fe(e) && fe(t) ? this.equals(e.subject, t.subject) && this.equals(e.predicate, t.predicate) && this.equals(e.object, t.object) && this.equals(e.graph, t.graph) : !1 : ue(e) && ue(t) ? this.id(e) === this.id(t) : !1;
	},
	id(e) {
		if (!e) return "undefined";
		if (fe(e)) return this.quadToNQ(e);
		switch (e.termType) {
			case C: return "defaultGraph";
			case w: return xe.toNT(e);
			case S: return Ie.toString(e);
			default:
				let t = this.termToNQ(e);
				if (t) return t;
				throw Error(`Can't id term with type '${e.termType}'`);
		}
	},
	isQuad(e) {
		return e instanceof De;
	},
	literal(e, t) {
		if (typeof e != "string" && !t) return ye.fromValue(e);
		let n = typeof e == "string" ? e : "" + e;
		return typeof t == "string" ? t.indexOf(":") === -1 ? new ye(n, t) : new ye(n, null, this.namedNode(t)) : new ye(n, null, t);
	},
	namedNode(e) {
		return new R(e);
	},
	quad(e, t, n, r) {
		return new De(e, t, n, r || Re);
	},
	triple(e, t, n, r) {
		return this.quad(e, t, n, r);
	},
	quadToNQ(e) {
		return `${this.termToNQ(e.subject)} ${this.termToNQ(e.predicate)} ${this.termToNQ(e.object)} ${this.termToNQ(e.graph)} .`;
	},
	termToNQ(e) {
		switch (e.termType) {
			case b: return "_:" + e.value;
			case C: return "";
			case T: return "<http://www.w3.org/1999/02/22-rdf-syntax-ns#nil>";
			case x: return ye.toNT(e);
			case E:
			case y: return "<" + e.value + ">";
			case w: return "(" + e.elements.map((e) => this.termToNQ(e)).join(" ") + ")";
			default: throw Error(`Can't serialize nonstandard term type (was '${e.termType}')`);
		}
	},
	toNQ(e) {
		return this.isQuad(e) ? this.quadToNQ(e) : this.termToNQ(e);
	},
	variable(e) {
		return new Ie(e);
	}
}, z = {
	debug(e) {},
	warn(e) {},
	info(e) {},
	error(e) {},
	success(e) {},
	msg(e) {}
};
// node_modules/rdflib/esm/namespace.js
function Be(e, t) {
	let n = t || { namedNode: (e) => new R(e) };
	return function(t) {
		return n.namedNode(e + (t || ""));
	};
}
// node_modules/@frogcat/ttl2jsonld/ttl2jsonld.js
var Ve = /* @__PURE__ */ s(((e, t, n) => {
	(function(e, n) {
		typeof define == "function" && define.amd ? define([], n) : typeof t == "object" && t.exports ? t.exports = n() : e.ttl2jsonld = n();
	})(n, function() {
		function e(e, t) {
			function n() {
				this.constructor = e;
			}
			n.prototype = t.prototype, e.prototype = new n();
		}
		function t(e, n, r, i) {
			this.message = e, this.expected = n, this.found = r, this.location = i, this.name = "SyntaxError", typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, t);
		}
		e(t, Error), t.buildMessage = function(e, t) {
			var n = {
				literal: function(e) {
					return "\"" + i(e.text) + "\"";
				},
				class: function(e) {
					for (var t = "", n = 0; n < e.parts.length; n++) t += e.parts[n] instanceof Array ? a(e.parts[n][0]) + "-" + a(e.parts[n][1]) : a(e.parts[n]);
					return "[" + (e.inverted ? "^" : "") + t + "]";
				},
				any: function(e) {
					return "any character";
				},
				end: function(e) {
					return "end of input";
				},
				other: function(e) {
					return e.description;
				}
			};
			function r(e) {
				return e.charCodeAt(0).toString(16).toUpperCase();
			}
			function i(e) {
				return e.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(e) {
					return "\\x0" + r(e);
				}).replace(/[\x10-\x1F\x7F-\x9F]/g, function(e) {
					return "\\x" + r(e);
				});
			}
			function a(e) {
				return e.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(e) {
					return "\\x0" + r(e);
				}).replace(/[\x10-\x1F\x7F-\x9F]/g, function(e) {
					return "\\x" + r(e);
				});
			}
			function o(e) {
				return n[e.type](e);
			}
			function s(e) {
				for (var t = Array(e.length), n = 0, r; n < e.length; n++) t[n] = o(e[n]);
				if (t.sort(), t.length > 0) {
					for (n = 1, r = 1; n < t.length; n++) t[n - 1] !== t[n] && (t[r] = t[n], r++);
					t.length = r;
				}
				switch (t.length) {
					case 1: return t[0];
					case 2: return t[0] + " or " + t[1];
					default: return t.slice(0, -1).join(", ") + ", or " + t[t.length - 1];
				}
			}
			function c(e) {
				return e ? "\"" + i(e) + "\"" : "end of input";
			}
			return "Expected " + s(e) + " but " + c(t) + " found.";
		};
		function n(e, n) {
			n = n === void 0 ? {} : n;
			var r = {}, i = { turtleDoc: ar }, a = ar, o = function(e) {
				var t = Y.toJSON();
				return t["@graph"] = [], e.filter((e) => Array.isArray(e)).forEach((e) => {
					e.forEach((e) => {
						t["@graph"].push(e);
					});
				}), t["@graph"].length === 1 && (Object.assign(t, t["@graph"][0]), delete t["@graph"]), t;
			}, s = "﻿", c = W("﻿", !1), l = ".", u = W(".", !1), d = function(e) {
				return e;
			}, f = "#", p = W("#", !1), m = /^[^\n]/, h = G(["\n"], !0, !1), g = "\n", _ = W("\n", !1), v = function(e) {
				return e.join("");
			}, y = "@prefix", b = W("@prefix", !1), x = function(e, t) {
				return Y.addPrefix(e === "" ? "0" : e, t), {};
			}, S = "@base", C = W("@base", !1), w = function(e) {
				return Y.addBase(e), {};
			}, T = /^[Bb]/, E = G(["B", "b"], !1, !1), D = /^[Aa]/, O = G(["A", "a"], !1, !1), ee = /^[Ss]/, te = G(["S", "s"], !1, !1), k = /^[Ee]/, A = G(["E", "e"], !1, !1), ne = /^[Pp]/, re = G(["P", "p"], !1, !1), ie = /^[Rr]/, ae = G(["R", "r"], !1, !1), j = /^[Ff]/, M = G(["F", "f"], !1, !1), N = /^[Ii]/, oe = G(["I", "i"], !1, !1), P = /^[Xx]/, F = G(["X", "x"], !1, !1), I = function(e, t) {
				var n = {};
				return typeof e == "string" && e !== "[]" ? n["@id"] = e : typeof e == "object" && Object.assign(n, e), t && Object.assign(n, t), [n];
			}, se = function(e, t) {
				var n = {};
				return e && Object.assign(n, e), t && Object.assign(n, t), [n];
			}, ce = ";", le = W(";", !1), ue = function(e, t, n, r) {
				var i = {};
				return i[n] = r, i;
			}, de = function(e, t, n) {
				return n;
			}, fe = function(e, t, n) {
				var r = {};
				return n.unshift(ii(e, t)), n.forEach((e) => {
					e && Object.keys(e).forEach((t) => {
						e[t].forEach((e) => {
							t === "@type" && e["@id"] !== void 0 && (e = e["@id"]), r[t] === void 0 ? r[t] = e : Array.isArray(r[t]) ? r[t].push(e) : r[t] = [r[t], e];
						});
					});
				}), r;
			}, pe = ",", me = W(",", !1), he = function(e, t) {
				return t;
			}, L = function(e, t) {
				return t.unshift(e), t;
			}, ge = "a", _e = W("a", !1), R = function() {
				return "@type";
			}, ve = function(e) {
				return ai(e, !0);
			}, ye = function(e) {
				return ai(e, !1);
			}, be = function(e) {
				return e === "[]" ? {} : { "@id": e };
			}, xe = function(e) {
				return { "@id": e };
			}, Se = "[", Ce = W("[", !1), we = "]", Te = W("]", !1), Ee = "(", De = W("(", !1), Oe = ")", ke = W(")", !1), Ae = function(e) {
				return { "@list": e };
			}, je = function(e, t) {
				return {
					"@value": e,
					"@language": t
				};
			}, Me = "^^", Ne = W("^^", !1), Pe = function(e, t) {
				if (t === "http://www.w3.org/2001/XMLSchema#boolean" && e === "true") return !0;
				if (t === "http://www.w3.org/2001/XMLSchema#boolean" && e === "false") return !1;
				if (t === "http://www.w3.org/2001/XMLSchema#integer") return parseInt(e);
				if (t === "http://www.w3.org/2001/XMLSchema#double") return parseFloat(e);
				let n = Y.resolve(t, !0);
				if (n) {
					let r = t.split(":")[0];
					if (n === "http://www.w3.org/2001/XMLSchema#boolean" && e === "true") return Y.decrement(r), !0;
					if (n === "http://www.w3.org/2001/XMLSchema#boolean" && e === "false") return Y.decrement(r), !1;
					if (n === "http://www.w3.org/2001/XMLSchema#integer") return Y.decrement(r), parseInt(e);
					if (n === "http://www.w3.org/2001/XMLSchema#double") return Y.decrement(r), parseFloat(e);
				}
				return {
					"@value": e,
					"@type": t
				};
			}, Fe = "true", Ie = W("true", !1), Le = function() {
				return !0;
			}, Re = "false", ze = W("false", !1), z = function() {
				return !1;
			}, Be = function(e) {
				return e + ":";
			}, Ve = "<", He = W("<", !1), Ue = /^[^\0- <>"{}|\^`\\]/, We = G([
				["\0", " "],
				"<",
				">",
				"\"",
				"{",
				"}",
				"|",
				"^",
				"`",
				"\\"
			], !0, !1), Ge = ">", Ke = W(">", !1), qe = function(e) {
				let t = e.map((e) => 65536 <= e.codePointAt(0) && e.codePointAt(0) <= 983039 ? "a" : e.length === 1 ? e : e.length === 6 ? String.fromCharCode("0x" + e.substring(2)) : e.length === 10 ? String.fromCodePoint("0x" + e.substring(2)) : e).join("");
				if (t.match(/^[^\u0000-\u0020<>"{}|^`\\]*$/)) {
					var n = e.join("");
					try {
						return Y.resolve(n);
					} catch {
						$n("Invalid IRIREF " + n);
					}
				} else $n("Invalid IRIREF " + e.join("") + " / " + t);
			}, Je = ":", Ye = W(":", !1), Xe = function(e) {
				return e ||= "0", Y.hasPrefix(e) === !1 && $n("undefined prefix " + e), e;
			}, Ze = function(e) {
				return e || "";
			}, Qe = function(e, t) {
				return Y.increment(e), Y.resolve(e + ":" + t);
			}, $e = "_:", et = W("_:", !1), tt = /^[0-9]/, nt = G([["0", "9"]], !1, !1), rt = "@", it = W("@", !1), at = /^[a-zA-Z]/, ot = G([["a", "z"], ["A", "Z"]], !1, !1), st = "-", ct = W("-", !1), lt = /^[a-zA-Z0-9]/, ut = G([
				["a", "z"],
				["A", "Z"],
				["0", "9"]
			], !1, !1), dt = function(e, t) {
				return "-" + t.join("");
			}, ft = function(e, t) {
				return e.join("") + t.join("");
			}, pt = /^[+\-]/, mt = G(["+", "-"], !1, !1), ht = function(e) {
				return e.match(/^[0+][0-9]+$/) ? {
					"@value": e,
					"@type": "http://www.w3.org/2001/XMLSchema#integer"
				} : parseInt(e);
			}, gt = function(e) {
				return {
					"@value": e,
					"@type": "http://www.w3.org/2001/XMLSchema#decimal"
				};
			}, _t = function(e) {
				return {
					"@value": e,
					"@type": "http://www.w3.org/2001/XMLSchema#double"
				};
			}, vt = /^[eE]/, yt = G(["e", "E"], !1, !1), bt = "\"", xt = W("\"", !1), St = /^[^"\\\n\r]/, Ct = G([
				"\"",
				"\\",
				"\n",
				"\r"
			], !0, !1), wt = "'", Tt = W("'", !1), Et = /^[^'\\\n\r]/, Dt = G([
				"'",
				"\\",
				"\n",
				"\r"
			], !0, !1), Ot = "'''", kt = W("'''", !1), At = /^[^'\\]/, jt = G(["'", "\\"], !0, !1), Mt = "''", Nt = W("''", !1), Pt = function(e, t) {
				return "''" + t.join("");
			}, Ft = function(e, t) {
				return "'" + t.join("");
			}, It = function(e, t) {
				return e.join("") + t.join("");
			}, Lt = "\"\"\"", Rt = W("\"\"\"", !1), zt = /^[^"\\]/, Bt = G(["\"", "\\"], !0, !1), Vt = "\"\"", Ht = W("\"\"", !1), Ut = function(e, t) {
				return "\"\"" + t.join("");
			}, Wt = function(e, t) {
				return "\"" + t.join("");
			}, Gt = "\\U", Kt = W("\\U", !1), qt = function(e) {
				return String.fromCodePoint(parseInt(e.join(""), 16));
			}, Jt = "\\u", Yt = W("\\u", !1), Xt = function(e) {
				return String.fromCharCode(parseInt(e.join(""), 16));
			}, Zt = "\\t", Qt = W("\\t", !1), $t = function() {
				return "	";
			}, en = "\\b", tn = W("\\b", !1), nn = function() {
				return "\b";
			}, rn = "\\n", an = W("\\n", !1), on = function() {
				return "\n";
			}, sn = "\\r", cn = W("\\r", !1), ln = function() {
				return "\r";
			}, un = "\\f", dn = W("\\f", !1), fn = function() {
				return "\f";
			}, pn = "\\\"", mn = W("\\\"", !1), hn = function() {
				return "\"";
			}, gn = "\\'", _n = W("\\'", !1), vn = function() {
				return "'";
			}, yn = "\\\\", bn = W("\\\\", !1), xn = function() {
				return "\\";
			}, B = /^[ \t\r\n]/, Sn = G([
				" ",
				"	",
				"\r",
				"\n"
			], !1, !1), Cn = function() {
				return "[]";
			}, wn = /^[\uD800-\uDBFF]/, Tn = G([["\ud800", "\udbff"]], !1, !1), En = /^[\uDC00-\uDFFF]/, Dn = G([["\udc00", "\udfff"]], !1, !1), On = function(e, t) {
				return e + t;
			}, kn = /^[A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, An = G([
				["A", "Z"],
				["a", "z"],
				["À", "Ö"],
				["Ø", "ö"],
				["ø", "˿"],
				["Ͱ", "ͽ"],
				["Ϳ", "῿"],
				["‌", "‍"],
				["⁰", "↏"],
				["Ⰰ", "⿯"],
				["、", "퟿"],
				["豈", "﷏"],
				["ﷰ", "�"]
			], !1, !1), jn = "_", Mn = W("_", !1), Nn = "·", Pn = W("·", !1), Fn = /^[\u0300-\u036F]/, In = G([["̀", "ͯ"]], !1, !1), Ln = /^[\u203F-\u2040]/, Rn = G([["‿", "⁀"]], !1, !1), zn = function(e, t, n, r) {
				return n.join("") + r.join("");
			}, Bn = function(e, t, n) {
				return e + t.join("") + n.join("");
			}, Vn = "%", Hn = W("%", !1), Un = /^[0-9A-Fa-f]/, Wn = G([
				["0", "9"],
				["A", "F"],
				["a", "f"]
			], !1, !1), Gn = "\\", Kn = W("\\", !1), qn = /^[_~.!$&'()*+,;=\/?#@%\-]/, Jn = G([
				"_",
				"~",
				".",
				"!",
				"$",
				"&",
				"'",
				"(",
				")",
				"*",
				"+",
				",",
				";",
				"=",
				"/",
				"?",
				"#",
				"@",
				"%",
				"-"
			], !1, !1), V = 0, H = 0, Yn = [{
				line: 1,
				column: 1
			}], Xn = 0, Zn = [], U = 0, Qn;
			if ("startRule" in n) {
				if (!(n.startRule in i)) throw Error("Can't start parsing from rule \"" + n.startRule + "\".");
				a = i[n.startRule];
			}
			function $n(e, t) {
				throw t = t === void 0 ? nr(H, V) : t, rr(e, t);
			}
			function W(e, t) {
				return {
					type: "literal",
					text: e,
					ignoreCase: t
				};
			}
			function G(e, t, n) {
				return {
					type: "class",
					parts: e,
					inverted: t,
					ignoreCase: n
				};
			}
			function er() {
				return { type: "end" };
			}
			function tr(t) {
				var n = Yn[t], r;
				if (n) return n;
				for (r = t - 1; !Yn[r];) r--;
				for (n = Yn[r], n = {
					line: n.line,
					column: n.column
				}; r < t;) e.charCodeAt(r) === 10 ? (n.line++, n.column = 1) : n.column++, r++;
				return Yn[t] = n, n;
			}
			function nr(e, t) {
				var n = tr(e), r = tr(t);
				return {
					start: {
						offset: e,
						line: n.line,
						column: n.column
					},
					end: {
						offset: t,
						line: r.line,
						column: r.column
					}
				};
			}
			function K(e) {
				V < Xn || (V > Xn && (Xn = V, Zn = []), Zn.push(e));
			}
			function rr(e, n) {
				return new t(e, null, null, n);
			}
			function ir(e, n, r) {
				return new t(t.buildMessage(e, n), e, n, r);
			}
			function ar() {
				for (var e = V, t = [], n = or(), i, a; n !== r;) t.push(n), n = or();
				if (t !== r) {
					for (n = [], i = sr(); i !== r;) n.push(i), i = sr();
					if (n !== r) {
						for (i = [], a = q(); a !== r;) i.push(a), a = q();
						i === r ? (V = e, e = r) : (H = e, t = o(n), e = t);
					} else V = e, e = r;
				} else V = e, e = r;
				return e;
			}
			function or() {
				var t;
				return e.charCodeAt(V) === 65279 ? (t = s, V++) : (t = r, U === 0 && K(c)), t;
			}
			function sr() {
				var t = lr(), n, i, a;
				if (t === r) {
					if (t = V, n = mr(), n !== r) {
						for (i = [], a = q(); a !== r;) i.push(a), a = q();
						i === r ? (V = t, t = r) : (e.charCodeAt(V) === 46 ? (a = l, V++) : (a = r, U === 0 && K(u)), a === r ? (V = t, t = r) : (H = t, n = d(n), t = n));
					} else V = t, t = r;
				}
				return t;
			}
			function cr() {
				var t = V, n, i, a;
				if (e.charCodeAt(V) === 35 ? (n = f, V++) : (n = r, U === 0 && K(p)), n !== r) {
					for (i = [], m.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(h)); a !== r;) i.push(a), m.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(h));
					i === r ? (V = t, t = r) : (e.charCodeAt(V) === 10 ? (a = g, V++) : (a = r, U === 0 && K(_)), a === r ? (V = t, t = r) : (H = t, n = v(i), t = n));
				} else V = t, t = r;
				return t;
			}
			function q() {
				var e = Kr();
				return e === r && (e = cr()), e;
			}
			function lr() {
				var e = ur();
				return e === r && (e = dr(), e === r && (e = pr(), e === r && (e = fr()))), e;
			}
			function ur() {
				for (var t = V, n = [], i = q(), a, o, s, c, d, f; i !== r;) n.push(i), i = q();
				if (n !== r) {
					if (e.substr(V, 7) === y ? (i = y, V += 7) : (i = r, U === 0 && K(b)), i !== r) {
						for (a = [], o = q(); o !== r;) a.push(o), o = q();
						if (a !== r) {
							if (o = Nr(), o !== r) {
								for (s = [], c = q(); c !== r;) s.push(c), c = q();
								if (s !== r) {
									if (c = jr(), c !== r) {
										for (d = [], f = q(); f !== r;) d.push(f), f = q();
										d === r ? (V = t, t = r) : (e.charCodeAt(V) === 46 ? (f = l, V++) : (f = r, U === 0 && K(u)), f === r ? (V = t, t = r) : (H = t, n = x(o, c), t = n));
									} else V = t, t = r;
								} else V = t, t = r;
							} else V = t, t = r;
						} else V = t, t = r;
					} else V = t, t = r;
				} else V = t, t = r;
				return t;
			}
			function dr() {
				for (var t = V, n = [], i = q(), a, o, s, c; i !== r;) n.push(i), i = q();
				if (n !== r) {
					if (e.substr(V, 5) === S ? (i = S, V += 5) : (i = r, U === 0 && K(C)), i !== r) {
						for (a = [], o = q(); o !== r;) a.push(o), o = q();
						if (a !== r) {
							if (o = jr(), o !== r) {
								for (s = [], c = q(); c !== r;) s.push(c), c = q();
								s === r ? (V = t, t = r) : (e.charCodeAt(V) === 46 ? (c = l, V++) : (c = r, U === 0 && K(u)), c === r ? (V = t, t = r) : (H = t, n = w(o), t = n));
							} else V = t, t = r;
						} else V = t, t = r;
					} else V = t, t = r;
				} else V = t, t = r;
				return t;
			}
			function fr() {
				for (var t = V, n = [], i = q(), a, o, s, c, l; i !== r;) n.push(i), i = q();
				if (n !== r) {
					if (T.test(e.charAt(V)) ? (i = e.charAt(V), V++) : (i = r, U === 0 && K(E)), i !== r) {
						if (D.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(O)), a !== r) {
							if (ee.test(e.charAt(V)) ? (o = e.charAt(V), V++) : (o = r, U === 0 && K(te)), o !== r) {
								if (k.test(e.charAt(V)) ? (s = e.charAt(V), V++) : (s = r, U === 0 && K(A)), s !== r) {
									for (c = [], l = q(); l !== r;) c.push(l), l = q();
									c === r ? (V = t, t = r) : (l = jr(), l === r ? (V = t, t = r) : (H = t, n = w(l), t = n));
								} else V = t, t = r;
							} else V = t, t = r;
						} else V = t, t = r;
					} else V = t, t = r;
				} else V = t, t = r;
				return t;
			}
			function pr() {
				for (var t = V, n = [], i = q(), a, o, s, c, l, u, d, f, p; i !== r;) n.push(i), i = q();
				if (n !== r) {
					if (ne.test(e.charAt(V)) ? (i = e.charAt(V), V++) : (i = r, U === 0 && K(re)), i !== r) {
						if (ie.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(ae)), a !== r) {
							if (k.test(e.charAt(V)) ? (o = e.charAt(V), V++) : (o = r, U === 0 && K(A)), o !== r) {
								if (j.test(e.charAt(V)) ? (s = e.charAt(V), V++) : (s = r, U === 0 && K(M)), s !== r) {
									if (N.test(e.charAt(V)) ? (c = e.charAt(V), V++) : (c = r, U === 0 && K(oe)), c !== r) {
										if (P.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(F)), l !== r) {
											for (u = [], d = q(); d !== r;) u.push(d), d = q();
											if (u !== r) {
												if (d = Nr(), d !== r) {
													for (f = [], p = q(); p !== r;) f.push(p), p = q();
													f === r ? (V = t, t = r) : (p = jr(), p === r ? (V = t, t = r) : (H = t, n = x(d, p), t = n));
												} else V = t, t = r;
											} else V = t, t = r;
										} else V = t, t = r;
									} else V = t, t = r;
								} else V = t, t = r;
							} else V = t, t = r;
						} else V = t, t = r;
					} else V = t, t = r;
				} else V = t, t = r;
				return t;
			}
			function mr() {
				var e = V, t = vr(), n;
				return t === r ? (V = e, e = r) : (n = hr(), n === r ? (V = e, e = r) : (H = e, t = I(t, n), e = t)), e === r && (e = V, t = Sr(), t === r ? (V = e, e = r) : (n = hr(), n === r && (n = null), n === r ? (V = e, e = r) : (H = e, t = se(t, n), e = t))), e;
			}
			function hr() {
				var t = V, n = _r(), i, a, o, s, c, l, u, d;
				if (n !== r) {
					if (i = gr(), i !== r) {
						for (a = [], o = V, s = [], c = q(); c !== r;) s.push(c), c = q();
						for (s === r ? (V = o, o = r) : (e.charCodeAt(V) === 59 ? (c = ce, V++) : (c = r, U === 0 && K(le)), c === r ? (V = o, o = r) : (l = V, u = _r(), u === r ? (V = l, l = r) : (d = gr(), d === r ? (V = l, l = r) : (H = l, u = ue(n, i, u, d), l = u)), l === r && (l = null), l === r ? (V = o, o = r) : (H = o, s = de(n, i, l), o = s))); o !== r;) {
							for (a.push(o), o = V, s = [], c = q(); c !== r;) s.push(c), c = q();
							s === r ? (V = o, o = r) : (e.charCodeAt(V) === 59 ? (c = ce, V++) : (c = r, U === 0 && K(le)), c === r ? (V = o, o = r) : (l = V, u = _r(), u === r ? (V = l, l = r) : (d = gr(), d === r ? (V = l, l = r) : (H = l, u = ue(n, i, u, d), l = u)), l === r && (l = null), l === r ? (V = o, o = r) : (H = o, s = de(n, i, l), o = s)));
						}
						a === r ? (V = t, t = r) : (H = t, n = fe(n, i, a), t = n);
					} else V = t, t = r;
				} else V = t, t = r;
				return t;
			}
			function gr() {
				var t = V, n = br(), i, a, o, s, c;
				if (n !== r) {
					for (i = [], a = V, o = [], s = q(); s !== r;) o.push(s), s = q();
					for (o === r ? (V = a, a = r) : (e.charCodeAt(V) === 44 ? (s = pe, V++) : (s = r, U === 0 && K(me)), s === r ? (V = a, a = r) : (c = br(), c === r ? (V = a, a = r) : (H = a, o = he(n, c), a = o))); a !== r;) {
						for (i.push(a), a = V, o = [], s = q(); s !== r;) o.push(s), s = q();
						o === r ? (V = a, a = r) : (e.charCodeAt(V) === 44 ? (s = pe, V++) : (s = r, U === 0 && K(me)), s === r ? (V = a, a = r) : (c = br(), c === r ? (V = a, a = r) : (H = a, o = he(n, c), a = o)));
					}
					i === r ? (V = t, t = r) : (H = t, n = L(n, i), t = n);
				} else V = t, t = r;
				return t;
			}
			function _r() {
				var t = V, n = yr(), i;
				if (n !== r && (H = t, n = d(n)), t = n, t === r) {
					for (t = V, n = [], i = q(); i !== r;) n.push(i), i = q();
					n === r ? (V = t, t = r) : (e.charCodeAt(V) === 97 ? (i = ge, V++) : (i = r, U === 0 && K(_e)), i === r ? (V = t, t = r) : (H = t, n = R(), t = n));
				}
				return t;
			}
			function vr() {
				var e = V, t = Cr();
				return t !== r && (H = e, t = ve(t)), e = t, e === r && (e = Ar(), e === r && (e = Or())), e;
			}
			function yr() {
				for (var e = V, t = [], n = q(); n !== r;) t.push(n), n = q();
				return t === r ? (V = e, e = r) : (n = Or(), n === r ? (V = e, e = r) : (H = e, t = d(n), e = t)), e;
			}
			function br() {
				var e = xr(), t;
				return e === r && (e = V, t = Cr(), t !== r && (H = e, t = ye(t)), e = t, e === r && (e = V, t = Ar(), t !== r && (H = e, t = be(t)), e = t, e === r && (e = V, t = Sr(), t !== r && (H = e, t = d(t)), e = t, e === r && (e = V, t = Or(), t !== r && (H = e, t = xe(t)), e = t)))), e;
			}
			function xr() {
				var e = Tr();
				return e === r && (e = wr(), e === r && (e = Er())), e;
			}
			function Sr() {
				for (var t = V, n = [], i = q(), a, o, s; i !== r;) n.push(i), i = q();
				if (n !== r) {
					if (e.charCodeAt(V) === 91 ? (i = Se, V++) : (i = r, U === 0 && K(Ce)), i !== r) {
						if (a = hr(), a !== r) {
							for (o = [], s = q(); s !== r;) o.push(s), s = q();
							o === r ? (V = t, t = r) : (e.charCodeAt(V) === 93 ? (s = we, V++) : (s = r, U === 0 && K(Te)), s === r ? (V = t, t = r) : (H = t, n = d(a), t = n));
						} else V = t, t = r;
					} else V = t, t = r;
				} else V = t, t = r;
				return t;
			}
			function Cr() {
				for (var t = V, n = [], i = q(), a, o, s; i !== r;) n.push(i), i = q();
				if (n !== r) {
					if (e.charCodeAt(V) === 40 ? (i = Ee, V++) : (i = r, U === 0 && K(De)), i !== r) {
						for (a = [], o = br(); o !== r;) a.push(o), o = br();
						if (a !== r) {
							for (o = [], s = q(); s !== r;) o.push(s), s = q();
							o === r ? (V = t, t = r) : (e.charCodeAt(V) === 41 ? (s = Oe, V++) : (s = r, U === 0 && K(ke)), s === r ? (V = t, t = r) : (H = t, n = Ae(a), t = n));
						} else V = t, t = r;
					} else V = t, t = r;
				} else V = t, t = r;
				return t;
			}
			function wr() {
				for (var e = V, t = [], n = q(); n !== r;) t.push(n), n = q();
				return t === r ? (V = e, e = r) : (n = zr(), n === r && (n = Rr(), n === r && (n = Lr())), n === r ? (V = e, e = r) : (H = e, t = d(n), e = t)), e;
			}
			function Tr() {
				for (var t = V, n = [], i = q(), a, o, s, c; i !== r;) n.push(i), i = q();
				if (n !== r) {
					if (i = Dr(), i !== r) {
						for (a = [], o = q(); o !== r;) a.push(o), o = q();
						a === r ? (V = t, t = r) : (o = Ir(), o === r ? (V = t, t = r) : (H = t, n = je(i, o), t = n));
					} else V = t, t = r;
				} else V = t, t = r;
				if (t === r) {
					for (t = V, n = [], i = q(); i !== r;) n.push(i), i = q();
					if (n !== r) {
						if (i = Dr(), i !== r) {
							for (a = [], o = q(); o !== r;) a.push(o), o = q();
							if (a !== r) {
								if (e.substr(V, 2) === Me ? (o = Me, V += 2) : (o = r, U === 0 && K(Ne)), o !== r) {
									for (s = [], c = q(); c !== r;) s.push(c), c = q();
									s === r ? (V = t, t = r) : (c = Or(), c === r ? (V = t, t = r) : (H = t, n = Pe(i, c), t = n));
								} else V = t, t = r;
							} else V = t, t = r;
						} else V = t, t = r;
					} else V = t, t = r;
					if (t === r) {
						for (t = V, n = [], i = q(); i !== r;) n.push(i), i = q();
						n === r ? (V = t, t = r) : (i = Dr(), i === r ? (V = t, t = r) : (H = t, n = d(i), t = n));
					}
				}
				return t;
			}
			function Er() {
				for (var t = V, n = [], i = q(); i !== r;) n.push(i), i = q();
				if (n === r ? (V = t, t = r) : (e.substr(V, 4) === Fe ? (i = Fe, V += 4) : (i = r, U === 0 && K(Ie)), i === r ? (V = t, t = r) : (H = t, n = Le(), t = n)), t === r) {
					for (t = V, n = [], i = q(); i !== r;) n.push(i), i = q();
					n === r ? (V = t, t = r) : (e.substr(V, 5) === Re ? (i = Re, V += 5) : (i = r, U === 0 && K(ze)), i === r ? (V = t, t = r) : (H = t, n = z(), t = n));
				}
				return t;
			}
			function Dr() {
				for (var e = V, t = [], n = q(); n !== r;) t.push(n), n = q();
				return t === r ? (V = e, e = r) : (n = Ur(), n === r && (n = Wr(), n === r && (n = Hr(), n === r && (n = Vr()))), n === r ? (V = e, e = r) : (H = e, t = d(n), e = t)), e;
			}
			function Or() {
				for (var e = V, t = [], n = q(); n !== r;) t.push(n), n = q();
				if (t === r ? (V = e, e = r) : (n = jr(), n === r ? (V = e, e = r) : (H = e, t = d(n), e = t)), e === r) {
					for (e = V, t = [], n = q(); n !== r;) t.push(n), n = q();
					t === r ? (V = e, e = r) : (n = kr(), n === r ? (V = e, e = r) : (H = e, t = d(n), e = t));
				}
				return e;
			}
			function kr() {
				var e = Pr(), t;
				return e === r && (e = V, t = Mr(), t !== r && (H = e, t = Be(t)), e = t), e;
			}
			function Ar() {
				for (var e = V, t = [], n = q(); n !== r;) t.push(n), n = q();
				if (t === r ? (V = e, e = r) : (n = Fr(), n === r ? (V = e, e = r) : (H = e, t = d(n), e = t)), e === r) {
					for (e = V, t = [], n = q(); n !== r;) t.push(n), n = q();
					t === r ? (V = e, e = r) : (n = qr(), n === r ? (V = e, e = r) : (H = e, t = d(n), e = t));
				}
				return e;
			}
			function jr() {
				var t = V, n, i, a;
				if (e.charCodeAt(V) === 60 ? (n = Ve, V++) : (n = r, U === 0 && K(He)), n !== r) {
					for (i = [], Ue.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(We)), a === r && (a = J()); a !== r;) i.push(a), Ue.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(We)), a === r && (a = J());
					i === r ? (V = t, t = r) : (e.charCodeAt(V) === 62 ? (a = Ge, V++) : (a = r, U === 0 && K(Ke)), a === r ? (V = t, t = r) : (H = t, n = qe(i), t = n));
				} else V = t, t = r;
				return t;
			}
			function Mr() {
				var t = V, n = Zr(), i;
				return n === r && (n = null), n === r ? (V = t, t = r) : (e.charCodeAt(V) === 58 ? (i = Je, V++) : (i = r, U === 0 && K(Ye)), i === r ? (V = t, t = r) : (H = t, n = Xe(n), t = n)), t;
			}
			function Nr() {
				var t = V, n = Zr(), i;
				return n === r && (n = null), n === r ? (V = t, t = r) : (e.charCodeAt(V) === 58 ? (i = Je, V++) : (i = r, U === 0 && K(Ye)), i === r ? (V = t, t = r) : (H = t, n = Ze(n), t = n)), t;
			}
			function Pr() {
				var e = V, t = Mr(), n;
				return t === r ? (V = e, e = r) : (n = Qr(), n === r ? (V = e, e = r) : (H = e, t = Qe(t, n), e = t)), e;
			}
			function Fr() {
				var t = V, n = V, i, a, o, s, c, d, f, p;
				if (e.substr(V, 2) === $e ? (i = $e, V += 2) : (i = r, U === 0 && K(et)), i !== r) {
					if (a = Yr(), a === r && (tt.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(nt))), a !== r) {
						for (o = [], s = Xr(); s !== r;) o.push(s), s = Xr();
						if (o !== r) {
							if (s = [], c = V, d = [], e.charCodeAt(V) === 46 ? (f = l, V++) : (f = r, U === 0 && K(u)), f !== r) for (; f !== r;) d.push(f), e.charCodeAt(V) === 46 ? (f = l, V++) : (f = r, U === 0 && K(u));
							else d = r;
							if (d !== r) {
								if (f = [], p = Xr(), p !== r) for (; p !== r;) f.push(p), p = Xr();
								else f = r;
								f === r ? (V = c, c = r) : (d = [d, f], c = d);
							} else V = c, c = r;
							for (; c !== r;) {
								if (s.push(c), c = V, d = [], e.charCodeAt(V) === 46 ? (f = l, V++) : (f = r, U === 0 && K(u)), f !== r) for (; f !== r;) d.push(f), e.charCodeAt(V) === 46 ? (f = l, V++) : (f = r, U === 0 && K(u));
								else d = r;
								if (d !== r) {
									if (f = [], p = Xr(), p !== r) for (; p !== r;) f.push(p), p = Xr();
									else f = r;
									f === r ? (V = c, c = r) : (d = [d, f], c = d);
								} else V = c, c = r;
							}
							s === r ? (V = n, n = r) : (i = [
								i,
								a,
								o,
								s
							], n = i);
						} else V = n, n = r;
					} else V = n, n = r;
				} else V = n, n = r;
				return t = n === r ? n : e.substring(t, V), t;
			}
			function Ir() {
				var t = V, n, i, a, o, s, c, l;
				if (e.charCodeAt(V) === 64 ? (n = rt, V++) : (n = r, U === 0 && K(it)), n !== r) {
					if (i = [], at.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(ot)), a !== r) for (; a !== r;) i.push(a), at.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(ot));
					else i = r;
					if (i !== r) {
						if (a = [], o = V, e.charCodeAt(V) === 45 ? (s = st, V++) : (s = r, U === 0 && K(ct)), s !== r) {
							if (c = [], lt.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(ut)), l !== r) for (; l !== r;) c.push(l), lt.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(ut));
							else c = r;
							c === r ? (V = o, o = r) : (H = o, s = dt(i, c), o = s);
						} else V = o, o = r;
						for (; o !== r;) if (a.push(o), o = V, e.charCodeAt(V) === 45 ? (s = st, V++) : (s = r, U === 0 && K(ct)), s !== r) {
							if (c = [], lt.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(ut)), l !== r) for (; l !== r;) c.push(l), lt.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(ut));
							else c = r;
							c === r ? (V = o, o = r) : (H = o, s = dt(i, c), o = s);
						} else V = o, o = r;
						a === r ? (V = t, t = r) : (H = t, n = ft(i, a), t = n);
					} else V = t, t = r;
				} else V = t, t = r;
				return t;
			}
			function Lr() {
				var t = V, n = V, i = V, a, o, s;
				if (pt.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(mt)), a === r && (a = null), a !== r) {
					if (o = [], tt.test(e.charAt(V)) ? (s = e.charAt(V), V++) : (s = r, U === 0 && K(nt)), s !== r) for (; s !== r;) o.push(s), tt.test(e.charAt(V)) ? (s = e.charAt(V), V++) : (s = r, U === 0 && K(nt));
					else o = r;
					o === r ? (V = i, i = r) : (a = [a, o], i = a);
				} else V = i, i = r;
				return n = i === r ? i : e.substring(n, V), n !== r && (H = t, n = ht(n)), t = n, t;
			}
			function Rr() {
				var t = V, n = V, i = V, a, o, s, c, d;
				if (pt.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(mt)), a === r && (a = null), a !== r) {
					for (o = [], tt.test(e.charAt(V)) ? (s = e.charAt(V), V++) : (s = r, U === 0 && K(nt)); s !== r;) o.push(s), tt.test(e.charAt(V)) ? (s = e.charAt(V), V++) : (s = r, U === 0 && K(nt));
					if (o !== r) {
						if (e.charCodeAt(V) === 46 ? (s = l, V++) : (s = r, U === 0 && K(u)), s !== r) {
							if (c = [], tt.test(e.charAt(V)) ? (d = e.charAt(V), V++) : (d = r, U === 0 && K(nt)), d !== r) for (; d !== r;) c.push(d), tt.test(e.charAt(V)) ? (d = e.charAt(V), V++) : (d = r, U === 0 && K(nt));
							else c = r;
							c === r ? (V = i, i = r) : (a = [
								a,
								o,
								s,
								c
							], i = a);
						} else V = i, i = r;
					} else V = i, i = r;
				} else V = i, i = r;
				return n = i === r ? i : e.substring(n, V), n !== r && (H = t, n = gt(n)), t = n, t;
			}
			function zr() {
				var t = V, n = V, i = V, a, o, s, c, d, f;
				if (pt.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(mt)), a === r && (a = null), a !== r) {
					if (o = V, s = [], tt.test(e.charAt(V)) ? (c = e.charAt(V), V++) : (c = r, U === 0 && K(nt)), c !== r) for (; c !== r;) s.push(c), tt.test(e.charAt(V)) ? (c = e.charAt(V), V++) : (c = r, U === 0 && K(nt));
					else s = r;
					if (s !== r) {
						if (e.charCodeAt(V) === 46 ? (c = l, V++) : (c = r, U === 0 && K(u)), c !== r) {
							for (d = [], tt.test(e.charAt(V)) ? (f = e.charAt(V), V++) : (f = r, U === 0 && K(nt)); f !== r;) d.push(f), tt.test(e.charAt(V)) ? (f = e.charAt(V), V++) : (f = r, U === 0 && K(nt));
							d === r ? (V = o, o = r) : (f = Br(), f === r ? (V = o, o = r) : (s = [
								s,
								c,
								d,
								f
							], o = s));
						} else V = o, o = r;
					} else V = o, o = r;
					if (o === r) {
						if (o = V, e.charCodeAt(V) === 46 ? (s = l, V++) : (s = r, U === 0 && K(u)), s !== r) {
							if (c = [], tt.test(e.charAt(V)) ? (d = e.charAt(V), V++) : (d = r, U === 0 && K(nt)), d !== r) for (; d !== r;) c.push(d), tt.test(e.charAt(V)) ? (d = e.charAt(V), V++) : (d = r, U === 0 && K(nt));
							else c = r;
							c === r ? (V = o, o = r) : (d = Br(), d === r ? (V = o, o = r) : (s = [
								s,
								c,
								d
							], o = s));
						} else V = o, o = r;
						if (o === r) {
							if (o = V, s = [], tt.test(e.charAt(V)) ? (c = e.charAt(V), V++) : (c = r, U === 0 && K(nt)), c !== r) for (; c !== r;) s.push(c), tt.test(e.charAt(V)) ? (c = e.charAt(V), V++) : (c = r, U === 0 && K(nt));
							else s = r;
							s === r ? (V = o, o = r) : (c = Br(), c === r ? (V = o, o = r) : (s = [s, c], o = s));
						}
					}
					o === r ? (V = i, i = r) : (a = [a, o], i = a);
				} else V = i, i = r;
				return n = i === r ? i : e.substring(n, V), n !== r && (H = t, n = _t(n)), t = n, t;
			}
			function Br() {
				var t = V, n = V, i, a, o, s;
				if (vt.test(e.charAt(V)) ? (i = e.charAt(V), V++) : (i = r, U === 0 && K(yt)), i !== r) {
					if (pt.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(mt)), a === r && (a = null), a !== r) {
						if (o = [], tt.test(e.charAt(V)) ? (s = e.charAt(V), V++) : (s = r, U === 0 && K(nt)), s !== r) for (; s !== r;) o.push(s), tt.test(e.charAt(V)) ? (s = e.charAt(V), V++) : (s = r, U === 0 && K(nt));
						else o = r;
						o === r ? (V = n, n = r) : (i = [
							i,
							a,
							o
						], n = i);
					} else V = n, n = r;
				} else V = n, n = r;
				return t = n === r ? n : e.substring(t, V), t;
			}
			function Vr() {
				var t = V, n, i, a;
				if (e.charCodeAt(V) === 34 ? (n = bt, V++) : (n = r, U === 0 && K(xt)), n !== r) {
					for (i = [], St.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(Ct)), a === r && (a = Gr(), a === r && (a = J())); a !== r;) i.push(a), St.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(Ct)), a === r && (a = Gr(), a === r && (a = J()));
					i === r ? (V = t, t = r) : (e.charCodeAt(V) === 34 ? (a = bt, V++) : (a = r, U === 0 && K(xt)), a === r ? (V = t, t = r) : (H = t, n = v(i), t = n));
				} else V = t, t = r;
				return t;
			}
			function Hr() {
				var t = V, n, i, a;
				if (e.charCodeAt(V) === 39 ? (n = wt, V++) : (n = r, U === 0 && K(Tt)), n !== r) {
					for (i = [], Et.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(Dt)), a === r && (a = Gr(), a === r && (a = J())); a !== r;) i.push(a), Et.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(Dt)), a === r && (a = Gr(), a === r && (a = J()));
					i === r ? (V = t, t = r) : (e.charCodeAt(V) === 39 ? (a = wt, V++) : (a = r, U === 0 && K(Tt)), a === r ? (V = t, t = r) : (H = t, n = v(i), t = n));
				} else V = t, t = r;
				return t;
			}
			function Ur() {
				var t = V, n, i, a, o, s, c, l;
				if (e.substr(V, 3) === Ot ? (n = Ot, V += 3) : (n = r, U === 0 && K(kt)), n !== r) {
					for (i = [], At.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(jt)), a === r && (a = Gr(), a === r && (a = J())); a !== r;) i.push(a), At.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(jt)), a === r && (a = Gr(), a === r && (a = J()));
					if (i !== r) {
						if (a = [], o = V, e.substr(V, 2) === Mt ? (s = Mt, V += 2) : (s = r, U === 0 && K(Nt)), s !== r) {
							if (c = [], At.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(jt)), l === r && (l = Gr(), l === r && (l = J())), l !== r) for (; l !== r;) c.push(l), At.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(jt)), l === r && (l = Gr(), l === r && (l = J()));
							else c = r;
							c === r ? (V = o, o = r) : (H = o, s = Pt(i, c), o = s);
						} else V = o, o = r;
						if (o === r) {
							if (o = V, e.charCodeAt(V) === 39 ? (s = wt, V++) : (s = r, U === 0 && K(Tt)), s !== r) {
								if (c = [], At.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(jt)), l === r && (l = Gr(), l === r && (l = J())), l !== r) for (; l !== r;) c.push(l), At.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(jt)), l === r && (l = Gr(), l === r && (l = J()));
								else c = r;
								c === r ? (V = o, o = r) : (H = o, s = Ft(i, c), o = s);
							} else V = o, o = r;
						}
						for (; o !== r;) {
							if (a.push(o), o = V, e.substr(V, 2) === Mt ? (s = Mt, V += 2) : (s = r, U === 0 && K(Nt)), s !== r) {
								if (c = [], At.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(jt)), l === r && (l = Gr(), l === r && (l = J())), l !== r) for (; l !== r;) c.push(l), At.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(jt)), l === r && (l = Gr(), l === r && (l = J()));
								else c = r;
								c === r ? (V = o, o = r) : (H = o, s = Pt(i, c), o = s);
							} else V = o, o = r;
							if (o === r) {
								if (o = V, e.charCodeAt(V) === 39 ? (s = wt, V++) : (s = r, U === 0 && K(Tt)), s !== r) {
									if (c = [], At.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(jt)), l === r && (l = Gr(), l === r && (l = J())), l !== r) for (; l !== r;) c.push(l), At.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(jt)), l === r && (l = Gr(), l === r && (l = J()));
									else c = r;
									c === r ? (V = o, o = r) : (H = o, s = Ft(i, c), o = s);
								} else V = o, o = r;
							}
						}
						a === r ? (V = t, t = r) : (e.substr(V, 3) === Ot ? (o = Ot, V += 3) : (o = r, U === 0 && K(kt)), o === r ? (V = t, t = r) : (H = t, n = It(i, a), t = n));
					} else V = t, t = r;
				} else V = t, t = r;
				return t;
			}
			function Wr() {
				var t = V, n, i, a, o, s, c, l;
				if (e.substr(V, 3) === Lt ? (n = Lt, V += 3) : (n = r, U === 0 && K(Rt)), n !== r) {
					for (i = [], zt.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(Bt)), a === r && (a = Gr(), a === r && (a = J())); a !== r;) i.push(a), zt.test(e.charAt(V)) ? (a = e.charAt(V), V++) : (a = r, U === 0 && K(Bt)), a === r && (a = Gr(), a === r && (a = J()));
					if (i !== r) {
						if (a = [], o = V, e.substr(V, 2) === Vt ? (s = Vt, V += 2) : (s = r, U === 0 && K(Ht)), s !== r) {
							if (c = [], zt.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(Bt)), l === r && (l = Gr(), l === r && (l = J())), l !== r) for (; l !== r;) c.push(l), zt.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(Bt)), l === r && (l = Gr(), l === r && (l = J()));
							else c = r;
							c === r ? (V = o, o = r) : (H = o, s = Ut(i, c), o = s);
						} else V = o, o = r;
						if (o === r) {
							if (o = V, e.charCodeAt(V) === 34 ? (s = bt, V++) : (s = r, U === 0 && K(xt)), s !== r) {
								if (c = [], zt.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(Bt)), l === r && (l = Gr(), l === r && (l = J())), l !== r) for (; l !== r;) c.push(l), zt.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(Bt)), l === r && (l = Gr(), l === r && (l = J()));
								else c = r;
								c === r ? (V = o, o = r) : (H = o, s = Wt(i, c), o = s);
							} else V = o, o = r;
						}
						for (; o !== r;) {
							if (a.push(o), o = V, e.substr(V, 2) === Vt ? (s = Vt, V += 2) : (s = r, U === 0 && K(Ht)), s !== r) {
								if (c = [], zt.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(Bt)), l === r && (l = Gr(), l === r && (l = J())), l !== r) for (; l !== r;) c.push(l), zt.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(Bt)), l === r && (l = Gr(), l === r && (l = J()));
								else c = r;
								c === r ? (V = o, o = r) : (H = o, s = Ut(i, c), o = s);
							} else V = o, o = r;
							if (o === r) {
								if (o = V, e.charCodeAt(V) === 34 ? (s = bt, V++) : (s = r, U === 0 && K(xt)), s !== r) {
									if (c = [], zt.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(Bt)), l === r && (l = Gr(), l === r && (l = J())), l !== r) for (; l !== r;) c.push(l), zt.test(e.charAt(V)) ? (l = e.charAt(V), V++) : (l = r, U === 0 && K(Bt)), l === r && (l = Gr(), l === r && (l = J()));
									else c = r;
									c === r ? (V = o, o = r) : (H = o, s = Wt(i, c), o = s);
								} else V = o, o = r;
							}
						}
						a === r ? (V = t, t = r) : (e.substr(V, 3) === Lt ? (o = Lt, V += 3) : (o = r, U === 0 && K(Rt)), o === r ? (V = t, t = r) : (H = t, n = It(i, a), t = n));
					} else V = t, t = r;
				} else V = t, t = r;
				return t;
			}
			function J() {
				var t = V, n, i, a, o, s, c, l, u, d, f;
				return e.substr(V, 2) === Gt ? (n = Gt, V += 2) : (n = r, U === 0 && K(Kt)), n === r ? (V = t, t = r) : (i = V, a = ti(), a === r ? (V = i, i = r) : (o = ti(), o === r ? (V = i, i = r) : (s = ti(), s === r ? (V = i, i = r) : (c = ti(), c === r ? (V = i, i = r) : (l = ti(), l === r ? (V = i, i = r) : (u = ti(), u === r ? (V = i, i = r) : (d = ti(), d === r ? (V = i, i = r) : (f = ti(), f === r ? (V = i, i = r) : (a = [
					a,
					o,
					s,
					c,
					l,
					u,
					d,
					f
				], i = a)))))))), i === r ? (V = t, t = r) : (H = t, n = qt(i), t = n)), t === r && (t = V, e.substr(V, 2) === Jt ? (n = Jt, V += 2) : (n = r, U === 0 && K(Yt)), n === r ? (V = t, t = r) : (i = V, a = ti(), a === r ? (V = i, i = r) : (o = ti(), o === r ? (V = i, i = r) : (s = ti(), s === r ? (V = i, i = r) : (c = ti(), c === r ? (V = i, i = r) : (a = [
					a,
					o,
					s,
					c
				], i = a)))), i === r ? (V = t, t = r) : (H = t, n = Xt(i), t = n))), t;
			}
			function Gr() {
				var t = V, n;
				return e.substr(V, 2) === Zt ? (n = Zt, V += 2) : (n = r, U === 0 && K(Qt)), n !== r && (H = t, n = $t()), t = n, t === r && (t = V, e.substr(V, 2) === en ? (n = en, V += 2) : (n = r, U === 0 && K(tn)), n !== r && (H = t, n = nn()), t = n, t === r && (t = V, e.substr(V, 2) === rn ? (n = rn, V += 2) : (n = r, U === 0 && K(an)), n !== r && (H = t, n = on()), t = n, t === r && (t = V, e.substr(V, 2) === sn ? (n = sn, V += 2) : (n = r, U === 0 && K(cn)), n !== r && (H = t, n = ln()), t = n, t === r && (t = V, e.substr(V, 2) === un ? (n = un, V += 2) : (n = r, U === 0 && K(dn)), n !== r && (H = t, n = fn()), t = n, t === r && (t = V, e.substr(V, 2) === pn ? (n = pn, V += 2) : (n = r, U === 0 && K(mn)), n !== r && (H = t, n = hn()), t = n, t === r && (t = V, e.substr(V, 2) === gn ? (n = gn, V += 2) : (n = r, U === 0 && K(_n)), n !== r && (H = t, n = vn()), t = n, t === r && (t = V, e.substr(V, 2) === yn ? (n = yn, V += 2) : (n = r, U === 0 && K(bn)), n !== r && (H = t, n = xn()), t = n))))))), t;
			}
			function Kr() {
				var t;
				return B.test(e.charAt(V)) ? (t = e.charAt(V), V++) : (t = r, U === 0 && K(Sn)), t;
			}
			function qr() {
				var t = V, n, i, a;
				if (e.charCodeAt(V) === 91 ? (n = Se, V++) : (n = r, U === 0 && K(Ce)), n !== r) {
					for (i = [], a = q(); a !== r;) i.push(a), a = q();
					i === r ? (V = t, t = r) : (e.charCodeAt(V) === 93 ? (a = we, V++) : (a = r, U === 0 && K(Te)), a === r ? (V = t, t = r) : (H = t, n = Cn(), t = n));
				} else V = t, t = r;
				return t;
			}
			function Jr() {
				var t = V, n, i;
				return wn.test(e.charAt(V)) ? (n = e.charAt(V), V++) : (n = r, U === 0 && K(Tn)), n === r ? (V = t, t = r) : (En.test(e.charAt(V)) ? (i = e.charAt(V), V++) : (i = r, U === 0 && K(Dn)), i === r ? (V = t, t = r) : (H = t, n = On(n, i), t = n)), t === r && (kn.test(e.charAt(V)) ? (t = e.charAt(V), V++) : (t = r, U === 0 && K(An))), t;
			}
			function Yr() {
				var t = Jr();
				return t === r && (e.charCodeAt(V) === 95 ? (t = jn, V++) : (t = r, U === 0 && K(Mn))), t;
			}
			function Xr() {
				var t = Yr();
				return t === r && (e.charCodeAt(V) === 45 ? (t = st, V++) : (t = r, U === 0 && K(ct)), t === r && (tt.test(e.charAt(V)) ? (t = e.charAt(V), V++) : (t = r, U === 0 && K(nt)), t === r && (e.charCodeAt(V) === 183 ? (t = Nn, V++) : (t = r, U === 0 && K(Pn)), t === r && (Fn.test(e.charAt(V)) ? (t = e.charAt(V), V++) : (t = r, U === 0 && K(In)), t === r && (Ln.test(e.charAt(V)) ? (t = e.charAt(V), V++) : (t = r, U === 0 && K(Rn))))))), t;
			}
			function Zr() {
				var t = V, n = V, i = Jr(), a, o, s, c, d, f;
				if (i !== r) {
					for (a = [], o = Xr(); o !== r;) a.push(o), o = Xr();
					if (a !== r) {
						if (o = [], s = V, c = [], e.charCodeAt(V) === 46 ? (d = l, V++) : (d = r, U === 0 && K(u)), d !== r) for (; d !== r;) c.push(d), e.charCodeAt(V) === 46 ? (d = l, V++) : (d = r, U === 0 && K(u));
						else c = r;
						if (c !== r) {
							if (d = [], f = Xr(), f !== r) for (; f !== r;) d.push(f), f = Xr();
							else d = r;
							d === r ? (V = s, s = r) : (c = [c, d], s = c);
						} else V = s, s = r;
						for (; s !== r;) {
							if (o.push(s), s = V, c = [], e.charCodeAt(V) === 46 ? (d = l, V++) : (d = r, U === 0 && K(u)), d !== r) for (; d !== r;) c.push(d), e.charCodeAt(V) === 46 ? (d = l, V++) : (d = r, U === 0 && K(u));
							else c = r;
							if (c !== r) {
								if (d = [], f = Xr(), f !== r) for (; f !== r;) d.push(f), f = Xr();
								else d = r;
								d === r ? (V = s, s = r) : (c = [c, d], s = c);
							} else V = s, s = r;
						}
						o === r ? (V = n, n = r) : (i = [
							i,
							a,
							o
						], n = i);
					} else V = n, n = r;
				} else V = n, n = r;
				return t = n === r ? n : e.substring(t, V), t;
			}
			function Qr() {
				var t = V, n = Yr(), i, a, o, s, c, d;
				if (n === r && (e.charCodeAt(V) === 58 ? (n = Je, V++) : (n = r, U === 0 && K(Ye)), n === r && (tt.test(e.charAt(V)) ? (n = e.charAt(V), V++) : (n = r, U === 0 && K(nt)), n === r && (n = $r()))), n !== r) {
					for (i = [], a = Xr(), a === r && (e.charCodeAt(V) === 58 ? (a = Je, V++) : (a = r, U === 0 && K(Ye)), a === r && (a = $r())); a !== r;) i.push(a), a = Xr(), a === r && (e.charCodeAt(V) === 58 ? (a = Je, V++) : (a = r, U === 0 && K(Ye)), a === r && (a = $r()));
					if (i !== r) {
						if (a = [], o = V, s = [], e.charCodeAt(V) === 46 ? (c = l, V++) : (c = r, U === 0 && K(u)), c !== r) for (; c !== r;) s.push(c), e.charCodeAt(V) === 46 ? (c = l, V++) : (c = r, U === 0 && K(u));
						else s = r;
						if (s !== r) {
							if (c = [], d = Xr(), d === r && (e.charCodeAt(V) === 58 ? (d = Je, V++) : (d = r, U === 0 && K(Ye)), d === r && (d = $r())), d !== r) for (; d !== r;) c.push(d), d = Xr(), d === r && (e.charCodeAt(V) === 58 ? (d = Je, V++) : (d = r, U === 0 && K(Ye)), d === r && (d = $r()));
							else c = r;
							c === r ? (V = o, o = r) : (H = o, s = zn(n, i, s, c), o = s);
						} else V = o, o = r;
						for (; o !== r;) {
							if (a.push(o), o = V, s = [], e.charCodeAt(V) === 46 ? (c = l, V++) : (c = r, U === 0 && K(u)), c !== r) for (; c !== r;) s.push(c), e.charCodeAt(V) === 46 ? (c = l, V++) : (c = r, U === 0 && K(u));
							else s = r;
							if (s !== r) {
								if (c = [], d = Xr(), d === r && (e.charCodeAt(V) === 58 ? (d = Je, V++) : (d = r, U === 0 && K(Ye)), d === r && (d = $r())), d !== r) for (; d !== r;) c.push(d), d = Xr(), d === r && (e.charCodeAt(V) === 58 ? (d = Je, V++) : (d = r, U === 0 && K(Ye)), d === r && (d = $r()));
								else c = r;
								c === r ? (V = o, o = r) : (H = o, s = zn(n, i, s, c), o = s);
							} else V = o, o = r;
						}
						a === r ? (V = t, t = r) : (H = t, n = Bn(n, i, a), t = n);
					} else V = t, t = r;
				} else V = t, t = r;
				return t;
			}
			function $r() {
				var e = ei();
				return e === r && (e = ni()), e;
			}
			function ei() {
				var t = V, n = V, i, a, o;
				return e.charCodeAt(V) === 37 ? (i = Vn, V++) : (i = r, U === 0 && K(Hn)), i === r ? (V = n, n = r) : (a = ti(), a === r ? (V = n, n = r) : (o = ti(), o === r ? (V = n, n = r) : (i = [
					i,
					a,
					o
				], n = i))), t = n === r ? n : e.substring(t, V), t;
			}
			function ti() {
				var t;
				return Un.test(e.charAt(V)) ? (t = e.charAt(V), V++) : (t = r, U === 0 && K(Wn)), t;
			}
			function ni() {
				var t = V, n, i;
				return e.charCodeAt(V) === 92 ? (n = Gn, V++) : (n = r, U === 0 && K(Kn)), n === r ? (V = t, t = r) : (qn.test(e.charAt(V)) ? (i = e.charAt(V), V++) : (i = r, U === 0 && K(Jn)), i === r ? (V = t, t = r) : (H = t, n = d(i), t = n)), t;
			}
			var ri = function(e) {
				return e.match(/^[a-z](.*?):(.+?)/g);
			};
			function ii(e, t) {
				var n = {};
				return n[e] = t, n;
			}
			var Y = {
				base: [],
				data: {},
				addBase: function(e) {
					if (Y.base.length === 0) {
						Y.base.push(e);
						return;
					}
					let t = Y.base[Y.base.length - 1];
					t !== e && Y.base.push(new URL(e, t).toString());
				},
				addPrefix: function(e, t) {
					let n = Y.data[e];
					n === void 0 ? Y.data[e] = [{
						uri: t,
						count: 0
					}] : n[n.length - 1].uri !== t && n.push({
						uri: t,
						count: 0
					});
				},
				hasPrefix: function(e) {
					return this.data[e] !== void 0;
				},
				resolve: function(e, t) {
					let r = Object.keys(Y.data).find((t) => e.indexOf(t + ":") === 0);
					if (r !== void 0) {
						let n = Y.data[r];
						if (n.length === 1 && t !== !0 && ri(n[0].uri)) return e;
						let i = n[n.length - 1].uri;
						return e.replace(r + ":", i);
					}
					var i = Y.base.length === 0 ? n.baseIRI : Y.base[Y.base.length - 1];
					return !i || e.match(/^(http:|https:|urn:|file:)/) ? e : e.indexOf("//") === 0 && i ? i.split("//")[0] + e : new URL(e, i).toString();
				},
				increment: function(e) {
					let t = Y.data[e];
					t !== void 0 && t[t.length - 1].count++;
				},
				decrement: function(e) {
					let t = Y.data[e];
					t !== void 0 && t[t.length - 1].count--;
				},
				toJSON: function() {
					let e = {};
					return Y.base.length > 0 && (e["@context"] === void 0 && (e["@context"] = {}), e["@context"]["@base"] = Y.base[0]), Object.keys(Y.data).forEach((t) => {
						let n = Y.data[t][0];
						n.uri === "http://www.w3.org/2001/XMLSchema#" && n.count < 1 || ri(n.uri) && (e["@context"] === void 0 && (e["@context"] = {}), e["@context"][t] = n.uri);
					}), e;
				}
			};
			function ai(e, t) {
				if (e["@list"] === void 0 || !t && !e["@list"].find((e) => e["@list"] !== void 0)) return e;
				if (e["@list"].length === 0) return { "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil" };
				var n = {}, r = null;
				return e["@list"].forEach((e) => {
					r === null ? r = n : (r["http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"] = {}, r = r["http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"]), r["http://www.w3.org/1999/02/22-rdf-syntax-ns#first"] = ai(e, !0), r["http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"] = { "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil" };
				}), n;
			}
			if (Qn = a(), Qn !== r && V === e.length) return Qn;
			throw Qn !== r && V < e.length && K(er()), ir(Zn, Xn < e.length ? e.charAt(Xn) : null, Xn < e.length ? nr(Xn, Xn + 1) : nr(Xn, Xn));
		}
		return {
			SyntaxError: t,
			parse: n
		};
	});
})), He = /* @__PURE__ */ s(((e) => {
	function t(e, t, n) {
		if (n === void 0 && (n = Array.prototype), e && typeof n.find == "function") return n.find.call(e, t);
		for (var i = 0; i < e.length; i++) if (r(e, i)) {
			var a = e[i];
			if (t.call(void 0, a, i, e)) return a;
		}
	}
	function n(e, t) {
		return t === void 0 && (t = Object), t && typeof t.getOwnPropertyDescriptors == "function" && (e = t.create(null, t.getOwnPropertyDescriptors(e))), t && typeof t.freeze == "function" ? t.freeze(e) : e;
	}
	function r(e, t) {
		return Object.prototype.hasOwnProperty.call(e, t);
	}
	function i(e, t) {
		if (typeof e != "object" || !e) throw TypeError("target is not an object");
		for (var n in t) r(t, n) && (e[n] = t[n]);
		return e;
	}
	var a = n({
		allowfullscreen: !0,
		async: !0,
		autofocus: !0,
		autoplay: !0,
		checked: !0,
		controls: !0,
		default: !0,
		defer: !0,
		disabled: !0,
		formnovalidate: !0,
		hidden: !0,
		ismap: !0,
		itemscope: !0,
		loop: !0,
		multiple: !0,
		muted: !0,
		nomodule: !0,
		novalidate: !0,
		open: !0,
		playsinline: !0,
		readonly: !0,
		required: !0,
		reversed: !0,
		selected: !0
	});
	function o(e) {
		return r(a, e.toLowerCase());
	}
	var s = n({
		area: !0,
		base: !0,
		br: !0,
		col: !0,
		embed: !0,
		hr: !0,
		img: !0,
		input: !0,
		link: !0,
		meta: !0,
		param: !0,
		source: !0,
		track: !0,
		wbr: !0
	});
	function c(e) {
		return r(s, e.toLowerCase());
	}
	var l = n({
		script: !1,
		style: !1,
		textarea: !0,
		title: !0
	});
	function u(e) {
		var t = e.toLowerCase();
		return r(l, t) && !l[t];
	}
	function d(e) {
		var t = e.toLowerCase();
		return r(l, t) && l[t];
	}
	function f(e) {
		return e === m.HTML;
	}
	function p(e) {
		return f(e) || e === m.XML_XHTML_APPLICATION;
	}
	var m = n({
		HTML: "text/html",
		XML_APPLICATION: "application/xml",
		XML_TEXT: "text/xml",
		XML_XHTML_APPLICATION: "application/xhtml+xml",
		XML_SVG_IMAGE: "image/svg+xml"
	}), h = Object.keys(m).map(function(e) {
		return m[e];
	});
	function g(e) {
		return h.indexOf(e) > -1;
	}
	var _ = n({
		HTML: "http://www.w3.org/1999/xhtml",
		SVG: "http://www.w3.org/2000/svg",
		XML: "http://www.w3.org/XML/1998/namespace",
		XMLNS: "http://www.w3.org/2000/xmlns/"
	});
	e.assign = i, e.find = t, e.freeze = n, e.HTML_BOOLEAN_ATTRIBUTES = a, e.HTML_RAW_TEXT_ELEMENTS = l, e.HTML_VOID_ELEMENTS = s, e.hasDefaultHTMLNamespace = p, e.hasOwn = r, e.isHTMLBooleanAttribute = o, e.isHTMLRawTextElement = u, e.isHTMLEscapableRawTextElement = d, e.isHTMLMimeType = f, e.isHTMLVoidElement = c, e.isValidMimeType = g, e.MIME_TYPE = m, e.NAMESPACE = _;
})), Ue = /* @__PURE__ */ s(((e) => {
	var t = He();
	function n(e, t) {
		e.prototype = Object.create(Error.prototype, {
			constructor: { value: e },
			name: {
				value: e.name,
				enumerable: !0,
				writable: t
			}
		});
	}
	var r = t.freeze({
		Error: "Error",
		IndexSizeError: "IndexSizeError",
		DomstringSizeError: "DomstringSizeError",
		HierarchyRequestError: "HierarchyRequestError",
		WrongDocumentError: "WrongDocumentError",
		InvalidCharacterError: "InvalidCharacterError",
		NoDataAllowedError: "NoDataAllowedError",
		NoModificationAllowedError: "NoModificationAllowedError",
		NotFoundError: "NotFoundError",
		NotSupportedError: "NotSupportedError",
		InUseAttributeError: "InUseAttributeError",
		InvalidStateError: "InvalidStateError",
		SyntaxError: "SyntaxError",
		InvalidModificationError: "InvalidModificationError",
		NamespaceError: "NamespaceError",
		InvalidAccessError: "InvalidAccessError",
		ValidationError: "ValidationError",
		TypeMismatchError: "TypeMismatchError",
		SecurityError: "SecurityError",
		NetworkError: "NetworkError",
		AbortError: "AbortError",
		URLMismatchError: "URLMismatchError",
		QuotaExceededError: "QuotaExceededError",
		TimeoutError: "TimeoutError",
		InvalidNodeTypeError: "InvalidNodeTypeError",
		DataCloneError: "DataCloneError",
		EncodingError: "EncodingError",
		NotReadableError: "NotReadableError",
		UnknownError: "UnknownError",
		ConstraintError: "ConstraintError",
		DataError: "DataError",
		TransactionInactiveError: "TransactionInactiveError",
		ReadOnlyError: "ReadOnlyError",
		VersionError: "VersionError",
		OperationError: "OperationError",
		NotAllowedError: "NotAllowedError",
		OptOutError: "OptOutError"
	}), i = Object.keys(r);
	function a(e) {
		return typeof e == "number" && e >= 1 && e <= 25;
	}
	function o(e) {
		return typeof e == "string" && e.substring(e.length - r.Error.length) === r.Error;
	}
	function s(e, t) {
		a(e) ? (this.name = i[e], this.message = t || "") : (this.message = e, this.name = o(t) ? t : r.Error), Error.captureStackTrace && Error.captureStackTrace(this, s);
	}
	n(s, !0), Object.defineProperties(s.prototype, { code: {
		enumerable: !0,
		get: function() {
			var e = i.indexOf(this.name);
			return a(e) ? e : 0;
		}
	} });
	for (var c = {
		INDEX_SIZE_ERR: 1,
		DOMSTRING_SIZE_ERR: 2,
		HIERARCHY_REQUEST_ERR: 3,
		WRONG_DOCUMENT_ERR: 4,
		INVALID_CHARACTER_ERR: 5,
		NO_DATA_ALLOWED_ERR: 6,
		NO_MODIFICATION_ALLOWED_ERR: 7,
		NOT_FOUND_ERR: 8,
		NOT_SUPPORTED_ERR: 9,
		INUSE_ATTRIBUTE_ERR: 10,
		INVALID_STATE_ERR: 11,
		SYNTAX_ERR: 12,
		INVALID_MODIFICATION_ERR: 13,
		NAMESPACE_ERR: 14,
		INVALID_ACCESS_ERR: 15,
		VALIDATION_ERR: 16,
		TYPE_MISMATCH_ERR: 17,
		SECURITY_ERR: 18,
		NETWORK_ERR: 19,
		ABORT_ERR: 20,
		URL_MISMATCH_ERR: 21,
		QUOTA_EXCEEDED_ERR: 22,
		TIMEOUT_ERR: 23,
		INVALID_NODE_TYPE_ERR: 24,
		DATA_CLONE_ERR: 25
	}, l = Object.entries(c), u = 0; u < l.length; u++) {
		var d = l[u][0];
		s[d] = l[u][1];
	}
	function f(e, t, n) {
		this.message = e, this.locator = t, this.cause = n, Error.captureStackTrace && Error.captureStackTrace(this, f);
	}
	n(f), e.DOMException = s, e.DOMExceptionName = r, e.ExceptionCode = c, e.ParseError = f;
})), We = /* @__PURE__ */ s(((e) => {
	function t(e) {
		try {
			typeof e != "function" && (e = RegExp);
			var t = new e("𝌆", "u").exec("𝌆");
			return !!t && t[0].length === 2;
		} catch {}
		return !1;
	}
	var n = t();
	function r(e) {
		if (e.source[0] !== "[") throw Error(e + " can not be used with chars");
		return e.source.slice(1, e.source.lastIndexOf("]"));
	}
	function i(e, t) {
		if (e.source[0] !== "[") throw Error("/" + e.source + "/ can not be used with chars_without");
		if (!t || typeof t != "string") throw Error(JSON.stringify(t) + " is not a valid search");
		if (e.source.indexOf(t) === -1) throw Error("\"" + t + "\" is not is /" + e.source + "/");
		if (t === "-" && e.source.indexOf(t) !== 1) throw Error("\"" + t + "\" is not at the first postion of /" + e.source + "/");
		return new RegExp(e.source.replace(t, ""), n ? "u" : "");
	}
	function a(e) {
		var t = this;
		return new RegExp(Array.prototype.slice.call(arguments).map(function(e) {
			var n = typeof e == "string";
			if (n && t === void 0 && e === "|") throw Error("use regg instead of reg to wrap expressions with `|`!");
			return n ? e : e.source;
		}).join(""), n ? "u" : "");
	}
	function o(e) {
		if (arguments.length === 0) throw Error("no parameters provided");
		return a.apply(o, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
	}
	var s = "�", c = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
	n && (c = a("[", r(c), "\\u{10000}-\\u{10FFFF}", "]"));
	var l = RegExp("[^" + r(c) + "]", n ? "u" : ""), u = /[\x20\x09\x0D\x0A]/, d = r(u), f = a(u, "+"), p = a(u, "*"), m = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
	n && (m = a("[", r(m), "\\u{10000}-\\u{10FFFF}", "]"));
	var h = a("[", r(m), r(/[-.0-9\xB7]/), r(/[\u0300-\u036F\u203F-\u2040]/), "]"), g = a(m, h, "*"), _ = a("^", g, "$"), v = a(h, "+"), y = o(a("&", g, ";"), "|", o(/&#[0-9]+;|&#x[0-9a-fA-F]+;/)), b = a("%", g, ";"), x = o(a("\"", o(/[^%&"]/, "|", b, "|", y), "*", "\""), "|", a("'", o(/[^%&']/, "|", b, "|", y), "*", "'")), S = o("\"", o(/[^<&"]/, "|", y), "*", "\"", "|", "'", o(/[^<&']/, "|", y), "*", "'"), C = a(i(m, ":"), i(h, ":"), "*"), w = a("^", C, "$"), T = a(C, o(":", C), "?"), E = a("^", T, "$"), D = a("(", T, ")"), O = o(/"[^"]*"|'[^']*'/), ee = a(/^<\?/, "(", g, ")", o(f, "(?!", u, ")(", c, "*?)"), "?", /\?>/), te = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, k = o("\"", te, "*\"", "|", "'", i(te, "'"), "*'"), A = "<!--", ne = "-->", re = a(A, o(i(c, "-"), "|", a("-", i(c, "-"))), "*", ne), ie = "#PCDATA", ae = o("EMPTY", "|", "ANY", "|", o(a(/\(/, p, ie, o(p, /\|/, p, T), "*", p, /\)\*/), "|", a(/\(/, p, ie, p, /\)/)), "|", a(/\([^>]+\)/, /[?*+]?/)), j = a("<!ELEMENT", f, o(T, "|", b), f, o(ae, "|", b), p, ">"), M = a("<!ATTLIST", f, g, o(f, g, f, o(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", o(a("NOTATION", f, /\(/, p, g, o(p, /\|/, p, g), "*", p, /\)/), "|", a(/\(/, p, v, o(p, /\|/, p, v), "*", p, /\)/))), f, o(/#REQUIRED|#IMPLIED/, "|", o(o("#FIXED", f), "?", S))), "*", p, ">"), N = "about:legacy-compat", oe = o("\"" + N + "\"", "|", "'" + N + "'"), P = "SYSTEM", F = "PUBLIC", I = o(o(P, f, O), "|", o(F, f, k, f, O)), se = a("^", o(o(P, f, "(?<SystemLiteralOnly>", O, ")"), "|", o(F, f, "(?<PubidLiteral>", k, ")", f, "(?<SystemLiteral>", O, ")"))), ce = a("^", k, "$"), le = a("^", O, "$"), ue = o(x, "|", o(I, o(f, "NDATA", f, g), "?")), de = "<!ENTITY", fe = o(a(de, f, g, f, ue, p, ">"), "|", a(de, f, "%", f, g, f, o(x, "|", I), p, ">")), pe = a("<!NOTATION", f, g, f, o(I, "|", a(F, f, k)), p, ">"), me = a(p, "=", p), he = /1[.]\d+/, L = a(f, "version", me, o("'", he, "'", "|", "\"", he, "\"")), ge = /[A-Za-z][-A-Za-z0-9._]*/, _e = a(/^<\?xml/, L, o(f, "encoding", me, o("\"", ge, "\"", "|", "'", ge, "'")), "?", o(f, "standalone", me, o("'", o("yes", "|", "no"), "'", "|", "\"", o("yes", "|", "no"), "\"")), "?", p, /\?>/), R = "<!DOCTYPE", ve = "<![CDATA[", ye = "]]>", be = a(/<!\[CDATA\[/, a(c, "*?", /\]\]>/));
	e.chars = r, e.chars_without = i, e.detectUnicodeSupport = t, e.reg = a, e.regg = o, e.ABOUT_LEGACY_COMPAT = N, e.ABOUT_LEGACY_COMPAT_SystemLiteral = oe, e.AttlistDecl = M, e.CDATA_START = ve, e.CDATA_END = ye, e.CDSect = be, e.Char = c, e.Comment = re, e.COMMENT_START = A, e.COMMENT_END = ne, e.DOCTYPE_DECL_START = R, e.elementdecl = j, e.EntityDecl = fe, e.EntityValue = x, e.ExternalID = I, e.ExternalID_match = se, e.Name = g, e.Name_exact = _, e.NCName_exact = w, e.NotationDecl = pe, e.Reference = y, e.PEReference = b, e.PI = ee, e.PUBLIC = F, e.PubidLiteral = k, e.PubidLiteral_match = ce, e.QName = T, e.QName_exact = E, e.QName_group = D, e.S = f, e.SChar_s = d, e.S_OPT = p, e.SYSTEM = P, e.SystemLiteral = O, e.SystemLiteral_match = le, e.InvalidChar = l, e.UNICODE_REPLACEMENT_CHARACTER = s, e.UNICODE_SUPPORT = n, e.XMLDecl = _e;
})), Ge = /* @__PURE__ */ s(((e) => {
	var t = He(), n = t.find, r = t.hasDefaultHTMLNamespace, i = t.hasOwn, a = t.isHTMLMimeType, o = t.isHTMLRawTextElement, s = t.isHTMLVoidElement, c = t.MIME_TYPE, l = t.NAMESPACE, u = Symbol(), d = Ue(), f = d.DOMException, p = d.DOMExceptionName, m = We();
	function h(e) {
		if (e !== u) throw TypeError("Illegal constructor");
	}
	function g(e) {
		return e !== "";
	}
	function _(e) {
		return e ? e.split(/[\t\n\f\r ]+/).filter(g) : [];
	}
	function v(e, t) {
		return i(e, t) || (e[t] = !0), e;
	}
	function y(e) {
		if (!e) return [];
		var t = _(e);
		return Object.keys(t.reduce(v, {}));
	}
	function b(e) {
		return function(t) {
			return e && e.indexOf(t) !== -1;
		};
	}
	function x(e) {
		if (!m.QName_exact.test(e)) throw new f(f.INVALID_CHARACTER_ERR, "invalid character in qualified name \"" + e + "\"");
	}
	function S(e, n) {
		x(n), e ||= null;
		var r = null, i = n;
		if (n.indexOf(":") >= 0) {
			var a = n.split(":");
			r = a[0], i = a[1];
		}
		if (r !== null && e === null) throw new f(f.NAMESPACE_ERR, "prefix is non-null and namespace is null");
		if (r === "xml" && e !== t.NAMESPACE.XML) throw new f(f.NAMESPACE_ERR, "prefix is \"xml\" and namespace is not the XML namespace");
		if ((r === "xmlns" || n === "xmlns") && e !== t.NAMESPACE.XMLNS) throw new f(f.NAMESPACE_ERR, "either qualifiedName or prefix is \"xmlns\" and namespace is not the XMLNS namespace");
		if (e === t.NAMESPACE.XMLNS && r !== "xmlns" && n !== "xmlns") throw new f(f.NAMESPACE_ERR, "namespace is the XMLNS namespace and neither qualifiedName nor prefix is \"xmlns\"");
		return [
			e,
			r,
			i
		];
	}
	function C(e, t) {
		for (var n in e) i(e, n) && (t[n] = e[n]);
	}
	function w(e, t) {
		var n = e.prototype;
		if (!(n instanceof t)) {
			function r() {}
			r.prototype = t.prototype, r = new r(), C(n, r), e.prototype = n = r;
		}
		n.constructor != e && (typeof e != "function" && console.error("unknown Class:" + e), n.constructor = e);
	}
	var T = {}, E = T.ELEMENT_NODE = 1, D = T.ATTRIBUTE_NODE = 2, O = T.TEXT_NODE = 3, ee = T.CDATA_SECTION_NODE = 4, te = T.ENTITY_REFERENCE_NODE = 5, k = T.ENTITY_NODE = 6, A = T.PROCESSING_INSTRUCTION_NODE = 7, ne = T.COMMENT_NODE = 8, re = T.DOCUMENT_NODE = 9, ie = T.DOCUMENT_TYPE_NODE = 10, ae = T.DOCUMENT_FRAGMENT_NODE = 11, j = T.NOTATION_NODE = 12, M = t.freeze({
		DOCUMENT_POSITION_DISCONNECTED: 1,
		DOCUMENT_POSITION_PRECEDING: 2,
		DOCUMENT_POSITION_FOLLOWING: 4,
		DOCUMENT_POSITION_CONTAINS: 8,
		DOCUMENT_POSITION_CONTAINED_BY: 16,
		DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
	});
	function N(e, t) {
		if (t.length < e.length) return N(t, e);
		var n = null;
		for (var r in e) {
			if (e[r] !== t[r]) return n;
			n = e[r];
		}
		return n;
	}
	function oe(e) {
		return e.guid ||= Math.random(), e.guid;
	}
	function P() {}
	P.prototype = {
		length: 0,
		item: function(e) {
			return e >= 0 && e < this.length ? this[e] : null;
		},
		toString: function(e) {
			for (var t = typeof e == "function" ? {
				requireWellFormed: !1,
				splitCDATASections: !0,
				nodeFilter: e
			} : e ? {
				requireWellFormed: !!e.requireWellFormed,
				splitCDATASections: e.splitCDATASections !== !1,
				nodeFilter: e.nodeFilter || null
			} : {
				requireWellFormed: !1,
				splitCDATASections: !0,
				nodeFilter: null
			}, n = [], r = 0; r < this.length; r++) Qe(this[r], n, null, t);
			return n.join("");
		},
		filter: function(e) {
			return Array.prototype.filter.call(this, e);
		},
		indexOf: function(e) {
			return Array.prototype.indexOf.call(this, e);
		}
	}, P.prototype[Symbol.iterator] = function() {
		var e = this, t = 0;
		return {
			next: function() {
				return t < e.length ? {
					value: e[t++],
					done: !1
				} : { done: !0 };
			},
			return: function() {
				return { done: !0 };
			}
		};
	};
	function F(e, t) {
		this._node = e, this._refresh = t, I(this);
	}
	function I(e) {
		var t = e._node._inc || e._node.ownerDocument._inc;
		if (e._inc !== t) {
			var n = e._refresh(e._node);
			if (tt(e, "length", n.length), !e.$$length || n.length < e.$$length) for (var r = n.length; r in e; r++) i(e, r) && delete e[r];
			C(n, e), e._inc = t;
		}
	}
	F.prototype.item = function(e) {
		return I(this), this[e] || null;
	}, w(F, P);
	function se() {
		this._nsIndex = Object.create(null), this._noNsIndex = Object.create(null);
	}
	function ce(e, t) {
		for (var n = 0; n < e.length;) {
			if (e[n] === t) return n;
			n++;
		}
	}
	function le(e, t, n) {
		if (!t) return e._noNsIndex;
		var r = e._nsIndex[t];
		return !r && n && (r = e._nsIndex[t] = Object.create(null)), r;
	}
	function ue(e, t, n) {
		var r = le(e, t, !1);
		return r && r[n] || null;
	}
	function de(e, t) {
		le(e, t.namespaceURI, !0)[t.localName] = t;
	}
	function fe(e, t) {
		var n = le(e, t.namespaceURI, !1);
		n && delete n[t.localName];
	}
	function pe(e, t, n, r) {
		if (r ? t[ce(t, r)] = n : (t[t.length] = n, t.length++), de(t, n), e) {
			n.ownerElement = e;
			var i = e.ownerDocument;
			i && (r && be(i, e, r), ye(i, e, n));
		}
	}
	function me(e, t, n) {
		var r = ce(t, n);
		if (r >= 0) {
			for (var i = t.length - 1; r <= i;) t[r] = t[++r];
			if (t.length = i, fe(t, n), e) {
				var a = e.ownerDocument;
				a && be(a, e, n), n.ownerElement = null;
			}
		}
	}
	se.prototype = {
		length: 0,
		item: P.prototype.item,
		getNamedItem: function(e) {
			this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace() && (e = e.toLowerCase());
			for (var t = 0; t < this.length;) {
				var n = this[t];
				if (n.nodeName === e) return n;
				t++;
			}
			return null;
		},
		setNamedItem: function(e) {
			var t = e.ownerElement;
			if (t && t !== this._ownerElement) throw new f(f.INUSE_ATTRIBUTE_ERR);
			var n = ue(this, e.namespaceURI, e.localName);
			return n === e ? e : (pe(this._ownerElement, this, e, n), n);
		},
		setNamedItemNS: function(e) {
			return this.setNamedItem(e);
		},
		removeNamedItem: function(e) {
			var t = this.getNamedItem(e);
			if (!t) throw new f(f.NOT_FOUND_ERR, e);
			return me(this._ownerElement, this, t), t;
		},
		removeNamedItemNS: function(e, t) {
			var n = this.getNamedItemNS(e, t);
			if (!n) throw new f(f.NOT_FOUND_ERR, e ? e + " : " + t : t);
			return me(this._ownerElement, this, n), n;
		},
		getNamedItemNS: function(e, t) {
			e ||= null;
			for (var n = 0; n < this.length;) {
				var r = this[n];
				if (r.localName === t && r.namespaceURI === e) return r;
				n++;
			}
			return null;
		}
	}, se.prototype[Symbol.iterator] = function() {
		var e = this, t = 0;
		return {
			next: function() {
				return t < e.length ? {
					value: e[t++],
					done: !1
				} : { done: !0 };
			},
			return: function() {
				return { done: !0 };
			}
		};
	};
	function he() {}
	he.prototype = {
		hasFeature: function(e, t) {
			return !0;
		},
		createDocument: function(e, t, n) {
			var r = c.XML_APPLICATION;
			e === l.HTML ? r = c.XML_XHTML_APPLICATION : e === l.SVG && (r = c.XML_SVG_IMAGE);
			var i = new ve(u, { contentType: r });
			if (i.implementation = this, i.childNodes = new P(), i.doctype = n || null, n && i.appendChild(n), t) {
				var a = i.createElementNS(e, t);
				i.appendChild(a);
			}
			return i;
		},
		createDocumentType: function(e, t, n, r) {
			x(e);
			var i = new z(u);
			return i.name = e, i.nodeName = e, i.publicId = t || "", i.systemId = n || "", i.internalSubset = r || "", i.childNodes = new P(), i;
		},
		createHTMLDocument: function(e) {
			var t = new ve(u, { contentType: c.HTML });
			if (t.implementation = this, t.childNodes = new P(), e !== !1) {
				t.doctype = this.createDocumentType("html"), t.doctype.ownerDocument = t, t.appendChild(t.doctype);
				var n = t.createElement("html");
				t.appendChild(n);
				var r = t.createElement("head");
				if (n.appendChild(r), typeof e == "string") {
					var i = t.createElement("title");
					i.appendChild(t.createTextNode(e)), r.appendChild(i);
				}
				n.appendChild(t.createElement("body"));
			}
			return t;
		}
	};
	function L(e) {
		h(e);
	}
	L.prototype = {
		firstChild: null,
		lastChild: null,
		previousSibling: null,
		nextSibling: null,
		parentNode: null,
		get parentElement() {
			return this.parentNode && this.parentNode.nodeType === this.ELEMENT_NODE ? this.parentNode : null;
		},
		childNodes: null,
		ownerDocument: null,
		nodeValue: null,
		namespaceURI: null,
		prefix: null,
		localName: null,
		baseURI: "about:blank",
		get isConnected() {
			var e = this.getRootNode();
			return e && e.nodeType === e.DOCUMENT_NODE;
		},
		contains: function(e) {
			if (!e) return !1;
			var t = e;
			do {
				if (this === t) return !0;
				t = t.parentNode;
			} while (t);
			return !1;
		},
		getRootNode: function(e) {
			var t = this;
			do {
				if (!t.parentNode) return t;
				t = t.parentNode;
			} while (t);
		},
		isEqualNode: function(e) {
			if (!e) return !1;
			for (var t = [{
				node: this,
				other: e
			}]; t.length > 0;) {
				var n = t.pop(), r = n.node, i = n.other;
				if (r.nodeType !== i.nodeType) return !1;
				switch (r.nodeType) {
					case r.DOCUMENT_TYPE_NODE:
						if (r.name !== i.name || r.publicId !== i.publicId || r.systemId !== i.systemId) return !1;
						break;
					case r.ELEMENT_NODE:
						if (r.namespaceURI !== i.namespaceURI || r.prefix !== i.prefix || r.localName !== i.localName || r.attributes.length !== i.attributes.length) return !1;
						for (var a = 0; a < r.attributes.length; a++) {
							var o = r.attributes.item(a), s = i.getAttributeNodeNS(o.namespaceURI, o.localName);
							if (!s) return !1;
							t.push({
								node: o,
								other: s
							});
						}
						break;
					case r.ATTRIBUTE_NODE:
						if (r.namespaceURI !== i.namespaceURI || r.localName !== i.localName || r.value !== i.value) return !1;
						break;
					case r.PROCESSING_INSTRUCTION_NODE:
						if (r.target !== i.target || r.data !== i.data) return !1;
						break;
					case r.TEXT_NODE:
					case r.CDATA_SECTION_NODE:
					case r.COMMENT_NODE: if (r.data !== i.data) return !1;
				}
				if (r.childNodes.length !== i.childNodes.length) return !1;
				for (var a = r.childNodes.length - 1; a >= 0; a--) t.push({
					node: r.childNodes[a],
					other: i.childNodes[a]
				});
			}
			return !0;
		},
		isSameNode: function(e) {
			return this === e;
		},
		insertBefore: function(e, t) {
			return Ne(this, e, t);
		},
		replaceChild: function(e, t) {
			Ne(this, e, t, Me), t && this.removeChild(t);
		},
		removeChild: function(e) {
			return Se(this, e);
		},
		appendChild: function(e) {
			return this.insertBefore(e, null);
		},
		hasChildNodes: function() {
			return this.firstChild != null;
		},
		cloneNode: function(e) {
			return et(this.ownerDocument || this, this, e);
		},
		normalize: function() {
			R(this, null, { enter: function(e) {
				for (var t = e.firstChild; t;) {
					var n = t.nextSibling;
					if (n !== null && n.nodeType === O && t.nodeType === O) {
						for (var r = [], i = n; i !== null && i.nodeType === O;) r.push(i.data), i = i.nextSibling;
						for (var a = t.nextSibling; a !== i;) {
							var o = a.nextSibling;
							a.parentNode = null, a.previousSibling = null, a.nextSibling = null, a = o;
						}
						t.nextSibling = i, i === null ? e.lastChild = t : i.previousSibling = t, t.appendData(r.join("")), xe(e.ownerDocument, e), t = i;
					} else t = n;
				}
				return !0;
			} });
		},
		isSupported: function(e, t) {
			return this.ownerDocument.implementation.hasFeature(e, t);
		},
		lookupPrefix: function(e) {
			for (var t = this; t;) {
				var n = t._nsMap;
				if (n) {
					for (var r in n) if (i(n, r) && n[r] === e) return r;
				}
				t = t.nodeType == D ? t.ownerDocument : t.parentNode;
			}
			return null;
		},
		lookupNamespaceURI: function(e) {
			for (var t = this; t;) {
				var n = t._nsMap;
				if (n && i(n, e)) return n[e];
				t = t.nodeType == D ? t.ownerDocument : t.parentNode;
			}
			return null;
		},
		isDefaultNamespace: function(e) {
			return this.lookupPrefix(e) == null;
		},
		compareDocumentPosition: function(e) {
			if (this === e) return 0;
			var t = e, n = this, r = null, i = null;
			if (t instanceof Fe && (r = t, t = r.ownerElement), n instanceof Fe && (i = n, n = i.ownerElement, r && t && n === t)) for (var a = 0, o; o = n.attributes[a]; a++) {
				if (o === r) return M.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + M.DOCUMENT_POSITION_PRECEDING;
				if (o === i) return M.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + M.DOCUMENT_POSITION_FOLLOWING;
			}
			if (!t || !n || n.ownerDocument !== t.ownerDocument) return M.DOCUMENT_POSITION_DISCONNECTED + M.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (oe(n.ownerDocument) > oe(t.ownerDocument) ? M.DOCUMENT_POSITION_FOLLOWING : M.DOCUMENT_POSITION_PRECEDING);
			if (i && t === n) return M.DOCUMENT_POSITION_CONTAINS + M.DOCUMENT_POSITION_PRECEDING;
			if (r && t === n) return M.DOCUMENT_POSITION_CONTAINED_BY + M.DOCUMENT_POSITION_FOLLOWING;
			for (var s = [], c = t.parentNode; c;) {
				if (!i && c === n) return M.DOCUMENT_POSITION_CONTAINED_BY + M.DOCUMENT_POSITION_FOLLOWING;
				s.push(c), c = c.parentNode;
			}
			s.reverse();
			for (var l = [], u = n.parentNode; u;) {
				if (!r && u === t) return M.DOCUMENT_POSITION_CONTAINS + M.DOCUMENT_POSITION_PRECEDING;
				l.push(u), u = u.parentNode;
			}
			l.reverse();
			var d = N(s, l);
			for (var f in d.childNodes) {
				var p = d.childNodes[f];
				if (p === n) return M.DOCUMENT_POSITION_FOLLOWING;
				if (p === t) return M.DOCUMENT_POSITION_PRECEDING;
				if (l.indexOf(p) >= 0) return M.DOCUMENT_POSITION_FOLLOWING;
				if (s.indexOf(p) >= 0) return M.DOCUMENT_POSITION_PRECEDING;
			}
			return 0;
		}
	};
	function ge(e) {
		return e == "<" && "&lt;" || e == ">" && "&gt;" || e == "&" && "&amp;" || e == "\"" && "&quot;" || "&#" + e.charCodeAt() + ";";
	}
	C(T, L), C(T, L.prototype), C(M, L), C(M, L.prototype);
	function _e(e, t) {
		R(e, null, { enter: function(e) {
			return !t(e) || R.STOP;
		} });
	}
	function R(e, t, n) {
		for (var r = [{
			node: e,
			context: t,
			phase: R.ENTER
		}]; r.length > 0;) {
			var i = r.pop();
			if (i.phase === R.ENTER) {
				var a = n.enter(i.node, i.context);
				if (a === R.STOP) return R.STOP;
				if (r.push({
					node: i.node,
					context: a,
					phase: R.EXIT
				}), a == null) continue;
				for (var o = i.node.lastChild; o;) r.push({
					node: o,
					context: a,
					phase: R.ENTER
				}), o = o.previousSibling;
			} else n.exit && n.exit(i.node, i.context);
		}
	}
	R.STOP = Symbol("walkDOM.STOP"), R.ENTER = 0, R.EXIT = 1;
	function ve(e, t) {
		h(e);
		var n = t || {};
		this.ownerDocument = this, this.contentType = n.contentType || c.XML_APPLICATION, this.type = a(this.contentType) ? "html" : "xml";
	}
	function ye(e, t, n) {
		e && e._inc++, n.namespaceURI === l.XMLNS && (t._nsMap[n.prefix ? n.localName : ""] = n.value);
	}
	function be(e, t, n, r) {
		e && e._inc++, n.namespaceURI === l.XMLNS && delete t._nsMap[n.prefix ? n.localName : ""];
	}
	function xe(e, t, n) {
		if (e && e._inc) {
			e._inc++;
			var r = t.childNodes;
			if (n && !n.nextSibling) r[r.length++] = n;
			else {
				for (var i = t.firstChild, a = 0; i;) r[a++] = i, i = i.nextSibling;
				r.length = a, delete r[r.length];
			}
		}
	}
	function Se(e, t) {
		if (e !== t.parentNode) throw new f(f.NOT_FOUND_ERR, "child's parent is not parent");
		var n = t.previousSibling, r = t.nextSibling;
		return n ? n.nextSibling = r : e.firstChild = r, r ? r.previousSibling = n : e.lastChild = n, xe(e.ownerDocument, e), t.parentNode = null, t.previousSibling = null, t.nextSibling = null, t;
	}
	function Ce(e) {
		return e && (e.nodeType === L.DOCUMENT_NODE || e.nodeType === L.DOCUMENT_FRAGMENT_NODE || e.nodeType === L.ELEMENT_NODE);
	}
	function we(e) {
		return e && (e.nodeType === L.CDATA_SECTION_NODE || e.nodeType === L.COMMENT_NODE || e.nodeType === L.DOCUMENT_FRAGMENT_NODE || e.nodeType === L.DOCUMENT_TYPE_NODE || e.nodeType === L.ELEMENT_NODE || e.nodeType === L.PROCESSING_INSTRUCTION_NODE || e.nodeType === L.TEXT_NODE);
	}
	function Te(e) {
		return e && e.nodeType === L.DOCUMENT_TYPE_NODE;
	}
	function Ee(e) {
		return e && e.nodeType === L.ELEMENT_NODE;
	}
	function De(e) {
		return e && e.nodeType === L.TEXT_NODE;
	}
	function Oe(e, t) {
		var r = e.childNodes || [];
		if (n(r, Ee) || Te(t)) return !1;
		var i = n(r, Te);
		return !(t && i && r.indexOf(i) > r.indexOf(t));
	}
	function ke(e, t) {
		var r = e.childNodes || [];
		function i(e) {
			return Ee(e) && e !== t;
		}
		if (n(r, i)) return !1;
		var a = n(r, Te);
		return !(t && a && r.indexOf(a) > r.indexOf(t));
	}
	function Ae(e, t, n) {
		if (!Ce(e)) throw new f(f.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + e.nodeType);
		if (n && n.parentNode !== e) throw new f(f.NOT_FOUND_ERR, "child not in parent");
		if (!we(t) || Te(t) && e.nodeType !== L.DOCUMENT_NODE) throw new f(f.HIERARCHY_REQUEST_ERR, "Unexpected node type " + t.nodeType + " for parent node type " + e.nodeType);
	}
	function je(e, t, r) {
		var i = e.childNodes || [], a = t.childNodes || [];
		if (t.nodeType === L.DOCUMENT_FRAGMENT_NODE) {
			var o = a.filter(Ee);
			if (o.length > 1 || n(a, De)) throw new f(f.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
			if (o.length === 1 && !Oe(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
		}
		if (Ee(t) && !Oe(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
		if (Te(t)) {
			if (n(i, Te)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
			var s = n(i, Ee);
			if (r && i.indexOf(s) < i.indexOf(r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
			if (!r && s) throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
		}
	}
	function Me(e, t, r) {
		var i = e.childNodes || [], a = t.childNodes || [];
		if (t.nodeType === L.DOCUMENT_FRAGMENT_NODE) {
			var o = a.filter(Ee);
			if (o.length > 1 || n(a, De)) throw new f(f.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
			if (o.length === 1 && !ke(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
		}
		if (Ee(t) && !ke(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
		if (Te(t)) {
			function e(e) {
				return Te(e) && e !== r;
			}
			if (n(i, e)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
			var s = n(i, Ee);
			if (r && i.indexOf(s) < i.indexOf(r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
		}
	}
	function Ne(e, t, n, r) {
		Ae(e, t, n), e.nodeType === L.DOCUMENT_NODE && (r || je)(e, t, n);
		var i = t.parentNode;
		if (i && i.removeChild(t), t.nodeType === ae) {
			var a = t.firstChild;
			if (a == null) return t;
			var o = t.lastChild;
		} else a = o = t;
		var s = n ? n.previousSibling : e.lastChild;
		a.previousSibling = s, o.nextSibling = n, s ? s.nextSibling = a : e.firstChild = a, n == null ? e.lastChild = o : n.previousSibling = o;
		do
			a.parentNode = e;
		while (a !== o && (a = a.nextSibling));
		return xe(e.ownerDocument || e, e, t), t.nodeType == ae && (t.firstChild = t.lastChild = null), t;
	}
	ve.prototype = {
		implementation: null,
		nodeName: "#document",
		nodeType: re,
		doctype: null,
		documentElement: null,
		_inc: 1,
		insertBefore: function(e, t) {
			if (e.nodeType === ae) {
				for (var n = e.firstChild; n;) {
					var r = n.nextSibling;
					this.insertBefore(n, t), n = r;
				}
				return e;
			}
			return Ne(this, e, t), e.ownerDocument = this, this.documentElement === null && e.nodeType === E && (this.documentElement = e), e;
		},
		removeChild: function(e) {
			var t = Se(this, e);
			return t === this.documentElement && (this.documentElement = null), t;
		},
		replaceChild: function(e, t) {
			Ne(this, e, t, Me), e.ownerDocument = this, t && this.removeChild(t), Ee(e) && (this.documentElement = e);
		},
		importNode: function(e, t) {
			return $e(this, e, t);
		},
		getElementById: function(e) {
			var t = null;
			return _e(this.documentElement, function(n) {
				if (n.nodeType == E && n.getAttribute("id") == e) return t = n, !0;
			}), t;
		},
		createElement: function(e) {
			var t = new Pe(u);
			t.ownerDocument = this, this.type === "html" && (e = e.toLowerCase()), r(this.contentType) && (t.namespaceURI = l.HTML), t.nodeName = e, t.tagName = e, t.localName = e, t.childNodes = new P();
			var n = t.attributes = new se();
			return n._ownerElement = t, t;
		},
		createDocumentFragment: function() {
			var e = new Ke(u);
			return e.ownerDocument = this, e.childNodes = new P(), e;
		},
		createTextNode: function(e) {
			var t = new Le(u);
			return t.ownerDocument = this, t.childNodes = new P(), t.appendData(e), t;
		},
		createComment: function(e) {
			var t = new Re(u);
			return t.ownerDocument = this, t.childNodes = new P(), t.appendData(e), t;
		},
		createCDATASection: function(e) {
			if (e.indexOf("]]>") !== -1) throw new f(f.INVALID_CHARACTER_ERR, "data contains \"]]>\"");
			var t = new ze(u);
			return t.ownerDocument = this, t.childNodes = new P(), t.appendData(e), t;
		},
		createProcessingInstruction: function(e, t) {
			var n = new qe(u);
			return n.ownerDocument = this, n.childNodes = new P(), n.nodeName = n.target = e, n.nodeValue = n.data = t, n;
		},
		createAttribute: function(e) {
			if (!m.QName_exact.test(e)) throw new f(f.INVALID_CHARACTER_ERR, "invalid character in name \"" + e + "\"");
			return this.type === "html" && (e = e.toLowerCase()), this._createAttribute(e);
		},
		_createAttribute: function(e) {
			var t = new Fe(u);
			return t.ownerDocument = this, t.childNodes = new P(), t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t;
		},
		createEntityReference: function(e) {
			if (!m.Name_exact.test(e)) throw new f(f.INVALID_CHARACTER_ERR, "not a valid xml name \"" + e + "\"");
			if (this.type === "html") throw new f("document is an html document", p.NotSupportedError);
			var t = new Ge(u);
			return t.ownerDocument = this, t.childNodes = new P(), t.nodeName = e, t;
		},
		createElementNS: function(e, t) {
			var n = S(e, t), r = new Pe(u), i = r.attributes = new se();
			return r.childNodes = new P(), r.ownerDocument = this, r.nodeName = t, r.tagName = t, r.namespaceURI = n[0], r.prefix = n[1], r.localName = n[2], i._ownerElement = r, r;
		},
		createAttributeNS: function(e, t) {
			var n = S(e, t), r = new Fe(u);
			return r.ownerDocument = this, r.childNodes = new P(), r.nodeName = t, r.name = t, r.specified = !0, r.namespaceURI = n[0], r.prefix = n[1], r.localName = n[2], r;
		}
	}, w(ve, L);
	function Pe(e) {
		h(e), this._nsMap = Object.create(null);
	}
	Pe.prototype = {
		nodeType: E,
		attributes: null,
		getQualifiedName: function() {
			return this.prefix ? this.prefix + ":" + this.localName : this.localName;
		},
		_isInHTMLDocumentAndNamespace: function() {
			return this.ownerDocument.type === "html" && this.namespaceURI === l.HTML;
		},
		hasAttributes: function() {
			return !!(this.attributes && this.attributes.length);
		},
		hasAttribute: function(e) {
			return !!this.getAttributeNode(e);
		},
		getAttribute: function(e) {
			var t = this.getAttributeNode(e);
			return t ? t.value : null;
		},
		getAttributeNode: function(e) {
			return this._isInHTMLDocumentAndNamespace() && (e = e.toLowerCase()), this.attributes.getNamedItem(e);
		},
		setAttribute: function(e, t) {
			this._isInHTMLDocumentAndNamespace() && (e = e.toLowerCase());
			var n = this.getAttributeNode(e);
			n ? n.value = n.nodeValue = "" + t : (n = this.ownerDocument._createAttribute(e), n.value = n.nodeValue = "" + t, this.setAttributeNode(n));
		},
		removeAttribute: function(e) {
			var t = this.getAttributeNode(e);
			t && this.removeAttributeNode(t);
		},
		setAttributeNode: function(e) {
			return this.attributes.setNamedItem(e);
		},
		setAttributeNodeNS: function(e) {
			return this.attributes.setNamedItemNS(e);
		},
		removeAttributeNode: function(e) {
			return this.attributes.removeNamedItem(e.nodeName);
		},
		removeAttributeNS: function(e, t) {
			var n = this.getAttributeNodeNS(e, t);
			n && this.removeAttributeNode(n);
		},
		hasAttributeNS: function(e, t) {
			return this.getAttributeNodeNS(e, t) != null;
		},
		getAttributeNS: function(e, t) {
			var n = this.getAttributeNodeNS(e, t);
			return n ? n.value : null;
		},
		setAttributeNS: function(e, t, n) {
			var r = S(e, t)[2], i = this.getAttributeNodeNS(e, r);
			i ? i.value = i.nodeValue = "" + n : (i = this.ownerDocument.createAttributeNS(e, t), i.value = i.nodeValue = "" + n, this.setAttributeNode(i));
		},
		getAttributeNodeNS: function(e, t) {
			return this.attributes.getNamedItemNS(e, t);
		},
		getElementsByClassName: function(e) {
			var t = y(e);
			return new F(this, function(n) {
				var r = [];
				return t.length > 0 && _e(n, function(i) {
					if (i !== n && i.nodeType === E) {
						var a = i.getAttribute("class");
						if (a) {
							var o = e === a;
							if (!o) {
								var s = y(a);
								o = t.every(b(s));
							}
							o && r.push(i);
						}
					}
				}), r;
			});
		},
		getElementsByTagName: function(e) {
			var t = (this.nodeType === re ? this : this.ownerDocument).type === "html", n = e.toLowerCase();
			return new F(this, function(r) {
				var i = [];
				return _e(r, function(a) {
					a !== r && a.nodeType === E && (e === "*" || a.getQualifiedName() === (t && a.namespaceURI === l.HTML ? n : e)) && i.push(a);
				}), i;
			});
		},
		getElementsByTagNameNS: function(e, t) {
			return new F(this, function(n) {
				var r = [];
				return _e(n, function(i) {
					i === n || i.nodeType !== E || e !== "*" && i.namespaceURI !== e || t !== "*" && i.localName != t || r.push(i);
				}), r;
			});
		}
	}, ve.prototype.getElementsByClassName = Pe.prototype.getElementsByClassName, ve.prototype.getElementsByTagName = Pe.prototype.getElementsByTagName, ve.prototype.getElementsByTagNameNS = Pe.prototype.getElementsByTagNameNS, w(Pe, L);
	function Fe(e) {
		h(e), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
	}
	Fe.prototype.nodeType = D, w(Fe, L);
	function Ie(e) {
		h(e);
	}
	Ie.prototype = {
		data: "",
		substringData: function(e, t) {
			return this.data.substring(e, e + t);
		},
		appendData: function(e) {
			e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;
		},
		insertData: function(e, t) {
			this.replaceData(e, 0, t);
		},
		deleteData: function(e, t) {
			this.replaceData(e, t, "");
		},
		replaceData: function(e, t, n) {
			var r = this.data.substring(0, e), i = this.data.substring(e + t);
			n = r + n + i, this.nodeValue = this.data = n, this.length = n.length;
		}
	}, w(Ie, L);
	function Le(e) {
		h(e);
	}
	Le.prototype = {
		nodeName: "#text",
		nodeType: O,
		splitText: function(e) {
			var t = this.data, n = t.substring(e);
			t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
			var r = this.ownerDocument.createTextNode(n);
			return this.parentNode && this.parentNode.insertBefore(r, this.nextSibling), r;
		}
	}, w(Le, Ie);
	function Re(e) {
		h(e);
	}
	Re.prototype = {
		nodeName: "#comment",
		nodeType: ne
	}, w(Re, Ie);
	function ze(e) {
		h(e);
	}
	ze.prototype = {
		nodeName: "#cdata-section",
		nodeType: ee
	}, w(ze, Le);
	function z(e) {
		h(e);
	}
	z.prototype.nodeType = ie, w(z, L);
	function Be(e) {
		h(e);
	}
	Be.prototype.nodeType = j, w(Be, L);
	function Ve(e) {
		h(e);
	}
	Ve.prototype.nodeType = k, w(Ve, L);
	function Ge(e) {
		h(e);
	}
	Ge.prototype.nodeType = te, w(Ge, L);
	function Ke(e) {
		h(e);
	}
	Ke.prototype.nodeName = "#document-fragment", Ke.prototype.nodeType = ae, w(Ke, L);
	function qe(e) {
		h(e);
	}
	qe.prototype.nodeType = A, w(qe, Ie);
	function Je() {}
	Je.prototype.serializeToString = function(e, t) {
		return Ye.call(e, t);
	}, L.prototype.toString = Ye;
	function Ye(e) {
		var t = typeof e == "function" ? {
			requireWellFormed: !1,
			splitCDATASections: !0,
			nodeFilter: e
		} : e == null ? {
			requireWellFormed: !1,
			splitCDATASections: !0,
			nodeFilter: null
		} : {
			requireWellFormed: !!e.requireWellFormed,
			splitCDATASections: e.splitCDATASections !== !1,
			nodeFilter: e.nodeFilter || null
		}, n = [], r = this.nodeType === re && this.documentElement || this, i = r.prefix, a = r.namespaceURI;
		if (a && i == null) {
			var i = r.lookupPrefix(a);
			if (i == null) var o = [{
				namespace: a,
				prefix: null
			}];
		}
		return Qe(this, n, o, t), n.join("");
	}
	function Xe(e, t, n) {
		var r = e.prefix || "", i = e.namespaceURI;
		if (!i || r === "xml" && i === l.XML || i === l.XMLNS) return !1;
		for (var a = n.length; a--;) {
			var o = n[a];
			if (o.prefix === r) return o.namespace !== i;
		}
		return !0;
	}
	function Ze(e, t, n, r) {
		if (r && !m.QName_exact.test(t)) throw new f("The attribute name \"" + t + "\" is not a valid XML QName", p.InvalidStateError);
		e.push(" ", t, "=\"", n.replace(/[<>&"\t\n\r]/g, ge), "\"");
	}
	function Qe(e, t, n, r) {
		n ||= [];
		var i = r.nodeFilter, a = r.requireWellFormed, c = r.splitCDATASections, u = (e.nodeType === re ? e : e.ownerDocument).type === "html";
		R(e, { ns: n }, {
			enter: function(e, n) {
				var d = n.ns;
				if (i) {
					if (e = i(e), e) {
						if (typeof e == "string") return t.push(e), null;
					} else return null;
				}
				switch (e.nodeType) {
					case E:
						var h = e.attributes, g = h.length, _ = e.tagName, v = _;
						if (!u && !e.prefix && e.namespaceURI) {
							for (var y, b = 0; b < h.length; b++) if (h.item(b).name === "xmlns") {
								y = h.item(b).value;
								break;
							}
							if (!y) for (var x = d.length - 1; x >= 0; x--) {
								var S = d[x];
								if (S.prefix === "" && S.namespace === e.namespaceURI) {
									y = S.namespace;
									break;
								}
							}
							if (y !== e.namespaceURI) for (var x = d.length - 1; x >= 0; x--) {
								var S = d[x];
								if (S.namespace === e.namespaceURI) {
									S.prefix && (v = S.prefix + ":" + _);
									break;
								}
							}
						}
						if (a && !m.QName_exact.test(v)) throw new f("The element name \"" + v + "\" is not a valid XML QName", p.InvalidStateError);
						t.push("<", v);
						for (var C = d.slice(), w = 0; w < g; w++) {
							var T = h.item(w);
							T.prefix == "xmlns" ? C.push({
								prefix: T.localName,
								namespace: T.value
							}) : T.nodeName == "xmlns" && C.push({
								prefix: "",
								namespace: T.value
							});
						}
						for (var w = 0; w < g; w++) {
							var T = h.item(w);
							if (Xe(T, u, C)) {
								var k = T.prefix || "", j = T.namespaceURI;
								Ze(t, k ? "xmlns:" + k : "xmlns", j, a), C.push({
									prefix: k,
									namespace: j
								});
							}
							var M = i ? i(T) : T;
							M && (typeof M == "string" ? t.push(M) : Ze(t, M.name, M.value, a));
						}
						if (_ === v && Xe(e, u, C)) {
							var N = e.prefix || "", j = e.namespaceURI;
							Ze(t, N ? "xmlns:" + N : "xmlns", j, a), C.push({
								prefix: N,
								namespace: j
							});
						}
						var oe = !e.firstChild;
						if (oe && (u || e.namespaceURI === l.HTML) && (oe = s(_)), oe) return t.push("/>"), null;
						if (t.push(">"), u && o(_)) {
							for (var P = e.firstChild; P;) P.data ? t.push(P.data) : Qe(P, t, C.slice(), r), P = P.nextSibling;
							return t.push("</", v, ">"), null;
						}
						return {
							ns: C,
							tag: v
						};
					case re:
					case ae:
						if (a && e.nodeType === re && e.documentElement == null) throw new f("The Document has no documentElement", p.InvalidStateError);
						return { ns: d };
					case D: return Ze(t, e.name, e.value, a), null;
					case O:
						if (a && m.InvalidChar.test(e.data)) throw new f("The Text node data contains characters outside the XML Char production", p.InvalidStateError);
						return t.push(e.data.replace(/[<&>]/g, ge)), null;
					case ee:
						if (a && e.data.indexOf("]]>") !== -1) throw new f("The CDATASection data contains \"]]>\"", p.InvalidStateError);
						return c ? t.push(m.CDATA_START, e.data.replace(/]]>/g, "]]]]><![CDATA[>"), m.CDATA_END) : t.push(m.CDATA_START, e.data, m.CDATA_END), null;
					case ne:
						if (a) {
							if (m.InvalidChar.test(e.data)) throw new f("The comment node data contains characters outside the XML Char production", p.InvalidStateError);
							if (e.data.indexOf("--") !== -1 || e.data[e.data.length - 1] === "-") throw new f("The comment node data contains \"--\" or ends with \"-\"", p.InvalidStateError);
						}
						return t.push(m.COMMENT_START, e.data, m.COMMENT_END), null;
					case ie:
						var F = e.publicId, I = e.systemId;
						if (a) {
							if (!m.Name_exact.test(e.name)) throw new f("The doctype name \"" + e.name + "\" is not a valid XML Name", p.InvalidStateError);
							if (F && !m.PubidLiteral_match.test(F)) throw new f("DocumentType publicId is not a valid PubidLiteral", p.InvalidStateError);
							if (I && I !== "." && !m.SystemLiteral_match.test(I)) throw new f("DocumentType systemId is not a valid SystemLiteral", p.InvalidStateError);
							if (e.internalSubset && e.internalSubset.indexOf("]>") !== -1) throw new f("DocumentType internalSubset contains \"]>\"", p.InvalidStateError);
						}
						return t.push(m.DOCTYPE_DECL_START, " ", e.name), F ? (t.push(" ", m.PUBLIC, " ", F), I && I !== "." && t.push(" ", I)) : I && I !== "." && t.push(" ", m.SYSTEM, " ", I), e.internalSubset && t.push(" [", e.internalSubset, "]"), t.push(">"), null;
					case A:
						if (a) {
							if (!m.NCName_exact.test(e.target) || e.target.toLowerCase() === "xml") throw new f("The processing instruction target \"" + e.target + "\" is not a valid XML NCName or is reserved", p.InvalidStateError);
							if (m.InvalidChar.test(e.data)) throw new f("The ProcessingInstruction data contains characters outside the XML Char production", p.InvalidStateError);
							if (e.data.indexOf("?>") !== -1) throw new f("The ProcessingInstruction data contains \"?>\"", p.InvalidStateError);
						}
						return t.push("<?", e.target, " ", e.data, "?>"), null;
					case te:
						if (a && !m.Name_exact.test(e.nodeName)) throw new f("The entity reference name \"" + e.nodeName + "\" is not a valid XML Name", p.InvalidStateError);
						return t.push("&", e.nodeName, ";"), null;
					default: return t.push("??", e.nodeName), null;
				}
			},
			exit: function(e, n) {
				n && n.tag && t.push("</", n.tag, ">");
			}
		});
	}
	function $e(e, t, n) {
		var r;
		return R(t, null, { enter: function(t, i) {
			var a = t.cloneNode(!1);
			return a.ownerDocument = e, a.parentNode = null, i === null ? r = a : i.appendChild(a), t.nodeType === D || n ? a : null;
		} }), r;
	}
	function et(e, t, n) {
		var r;
		return R(t, null, { enter: function(t, a) {
			var o = new t.constructor(u);
			for (var s in t) if (i(t, s)) {
				var c = t[s];
				typeof c != "object" && c != o[s] && (o[s] = c);
			}
			t.childNodes && (o.childNodes = new P()), o.ownerDocument = e;
			var l = n;
			switch (o.nodeType) {
				case E:
					var d = t.attributes, f = o.attributes = new se(), p = d.length;
					f._ownerElement = o;
					for (var m = 0; m < p; m++) o.setAttributeNode(et(e, d.item(m), !0));
					break;
				case D: l = !0;
			}
			return a === null ? r = o : a.appendChild(o), l ? o : null;
		} }), r;
	}
	function tt(e, t, n) {
		e[t] = n;
	}
	function nt(e) {
		for (var t = [], n = e.firstChild; n;) n.nodeType === E && t.push(n), n = n.nextSibling;
		return t;
	}
	try {
		Object.defineProperty && (Object.defineProperty(F.prototype, "length", { get: function() {
			return I(this), this.$$length;
		} }), Object.defineProperty(L.prototype, "textContent", {
			get: function() {
				if (this.nodeType === E || this.nodeType === ae) {
					var e = [];
					return R(this, null, { enter: function(t) {
						if (t.nodeType === E || t.nodeType === ae) return !0;
						if (t.nodeType === A || t.nodeType === ne) return null;
						e.push(t.nodeValue);
					} }), e.join("");
				}
				return this.nodeValue;
			},
			set: function(e) {
				switch (this.nodeType) {
					case E:
					case ae:
						for (; this.firstChild;) this.removeChild(this.firstChild);
						(e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
						break;
					default: this.data = e, this.value = e, this.nodeValue = e;
				}
			}
		}), Object.defineProperty(Ie.prototype, "data", {
			get: function() {
				return this._data == null ? "" : this._data;
			},
			set: function(e) {
				this._data = e, this.length = typeof e == "string" ? e.length : 0;
			}
		}), Object.defineProperty(Ie.prototype, "nodeValue", {
			get: function() {
				return this.data;
			},
			set: function(e) {
				this.data = e;
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(Pe.prototype, "children", { get: function() {
			return new F(this, nt);
		} }), Object.defineProperty(ve.prototype, "children", { get: function() {
			return new F(this, nt);
		} }), Object.defineProperty(Ke.prototype, "children", { get: function() {
			return new F(this, nt);
		} }), tt = function(e, t, n) {
			e["$$" + t] = n;
		});
	} catch {}
	e._updateLiveList = I, e.Attr = Fe, e.CDATASection = ze, e.CharacterData = Ie, e.Comment = Re, e.Document = ve, e.DocumentFragment = Ke, e.DocumentType = z, e.DOMImplementation = he, e.Element = Pe, e.Entity = Ve, e.EntityReference = Ge, e.LiveNodeList = F, e.NamedNodeMap = se, e.Node = L, e.NodeList = P, e.Notation = Be, e.Text = Le, e.ProcessingInstruction = qe, e.walkDOM = R, e.XMLSerializer = Je;
})), Ke = /* @__PURE__ */ s(((e) => {
	var t = He().freeze;
	e.XML_ENTITIES = t({
		amp: "&",
		apos: "'",
		gt: ">",
		lt: "<",
		quot: "\""
	}), e.HTML_ENTITIES = t({
		Aacute: "Á",
		aacute: "á",
		Abreve: "Ă",
		abreve: "ă",
		ac: "∾",
		acd: "∿",
		acE: "∾̳",
		Acirc: "Â",
		acirc: "â",
		acute: "´",
		Acy: "А",
		acy: "а",
		AElig: "Æ",
		aelig: "æ",
		af: "⁡",
		Afr: "𝔄",
		afr: "𝔞",
		Agrave: "À",
		agrave: "à",
		alefsym: "ℵ",
		aleph: "ℵ",
		Alpha: "Α",
		alpha: "α",
		Amacr: "Ā",
		amacr: "ā",
		amalg: "⨿",
		AMP: "&",
		amp: "&",
		And: "⩓",
		and: "∧",
		andand: "⩕",
		andd: "⩜",
		andslope: "⩘",
		andv: "⩚",
		ang: "∠",
		ange: "⦤",
		angle: "∠",
		angmsd: "∡",
		angmsdaa: "⦨",
		angmsdab: "⦩",
		angmsdac: "⦪",
		angmsdad: "⦫",
		angmsdae: "⦬",
		angmsdaf: "⦭",
		angmsdag: "⦮",
		angmsdah: "⦯",
		angrt: "∟",
		angrtvb: "⊾",
		angrtvbd: "⦝",
		angsph: "∢",
		angst: "Å",
		angzarr: "⍼",
		Aogon: "Ą",
		aogon: "ą",
		Aopf: "𝔸",
		aopf: "𝕒",
		ap: "≈",
		apacir: "⩯",
		apE: "⩰",
		ape: "≊",
		apid: "≋",
		apos: "'",
		ApplyFunction: "⁡",
		approx: "≈",
		approxeq: "≊",
		Aring: "Å",
		aring: "å",
		Ascr: "𝒜",
		ascr: "𝒶",
		Assign: "≔",
		ast: "*",
		asymp: "≈",
		asympeq: "≍",
		Atilde: "Ã",
		atilde: "ã",
		Auml: "Ä",
		auml: "ä",
		awconint: "∳",
		awint: "⨑",
		backcong: "≌",
		backepsilon: "϶",
		backprime: "‵",
		backsim: "∽",
		backsimeq: "⋍",
		Backslash: "∖",
		Barv: "⫧",
		barvee: "⊽",
		Barwed: "⌆",
		barwed: "⌅",
		barwedge: "⌅",
		bbrk: "⎵",
		bbrktbrk: "⎶",
		bcong: "≌",
		Bcy: "Б",
		bcy: "б",
		bdquo: "„",
		becaus: "∵",
		Because: "∵",
		because: "∵",
		bemptyv: "⦰",
		bepsi: "϶",
		bernou: "ℬ",
		Bernoullis: "ℬ",
		Beta: "Β",
		beta: "β",
		beth: "ℶ",
		between: "≬",
		Bfr: "𝔅",
		bfr: "𝔟",
		bigcap: "⋂",
		bigcirc: "◯",
		bigcup: "⋃",
		bigodot: "⨀",
		bigoplus: "⨁",
		bigotimes: "⨂",
		bigsqcup: "⨆",
		bigstar: "★",
		bigtriangledown: "▽",
		bigtriangleup: "△",
		biguplus: "⨄",
		bigvee: "⋁",
		bigwedge: "⋀",
		bkarow: "⤍",
		blacklozenge: "⧫",
		blacksquare: "▪",
		blacktriangle: "▴",
		blacktriangledown: "▾",
		blacktriangleleft: "◂",
		blacktriangleright: "▸",
		blank: "␣",
		blk12: "▒",
		blk14: "░",
		blk34: "▓",
		block: "█",
		bne: "=⃥",
		bnequiv: "≡⃥",
		bNot: "⫭",
		bnot: "⌐",
		Bopf: "𝔹",
		bopf: "𝕓",
		bot: "⊥",
		bottom: "⊥",
		bowtie: "⋈",
		boxbox: "⧉",
		boxDL: "╗",
		boxDl: "╖",
		boxdL: "╕",
		boxdl: "┐",
		boxDR: "╔",
		boxDr: "╓",
		boxdR: "╒",
		boxdr: "┌",
		boxH: "═",
		boxh: "─",
		boxHD: "╦",
		boxHd: "╤",
		boxhD: "╥",
		boxhd: "┬",
		boxHU: "╩",
		boxHu: "╧",
		boxhU: "╨",
		boxhu: "┴",
		boxminus: "⊟",
		boxplus: "⊞",
		boxtimes: "⊠",
		boxUL: "╝",
		boxUl: "╜",
		boxuL: "╛",
		boxul: "┘",
		boxUR: "╚",
		boxUr: "╙",
		boxuR: "╘",
		boxur: "└",
		boxV: "║",
		boxv: "│",
		boxVH: "╬",
		boxVh: "╫",
		boxvH: "╪",
		boxvh: "┼",
		boxVL: "╣",
		boxVl: "╢",
		boxvL: "╡",
		boxvl: "┤",
		boxVR: "╠",
		boxVr: "╟",
		boxvR: "╞",
		boxvr: "├",
		bprime: "‵",
		Breve: "˘",
		breve: "˘",
		brvbar: "¦",
		Bscr: "ℬ",
		bscr: "𝒷",
		bsemi: "⁏",
		bsim: "∽",
		bsime: "⋍",
		bsol: "\\",
		bsolb: "⧅",
		bsolhsub: "⟈",
		bull: "•",
		bullet: "•",
		bump: "≎",
		bumpE: "⪮",
		bumpe: "≏",
		Bumpeq: "≎",
		bumpeq: "≏",
		Cacute: "Ć",
		cacute: "ć",
		Cap: "⋒",
		cap: "∩",
		capand: "⩄",
		capbrcup: "⩉",
		capcap: "⩋",
		capcup: "⩇",
		capdot: "⩀",
		CapitalDifferentialD: "ⅅ",
		caps: "∩︀",
		caret: "⁁",
		caron: "ˇ",
		Cayleys: "ℭ",
		ccaps: "⩍",
		Ccaron: "Č",
		ccaron: "č",
		Ccedil: "Ç",
		ccedil: "ç",
		Ccirc: "Ĉ",
		ccirc: "ĉ",
		Cconint: "∰",
		ccups: "⩌",
		ccupssm: "⩐",
		Cdot: "Ċ",
		cdot: "ċ",
		cedil: "¸",
		Cedilla: "¸",
		cemptyv: "⦲",
		cent: "¢",
		CenterDot: "·",
		centerdot: "·",
		Cfr: "ℭ",
		cfr: "𝔠",
		CHcy: "Ч",
		chcy: "ч",
		check: "✓",
		checkmark: "✓",
		Chi: "Χ",
		chi: "χ",
		cir: "○",
		circ: "ˆ",
		circeq: "≗",
		circlearrowleft: "↺",
		circlearrowright: "↻",
		circledast: "⊛",
		circledcirc: "⊚",
		circleddash: "⊝",
		CircleDot: "⊙",
		circledR: "®",
		circledS: "Ⓢ",
		CircleMinus: "⊖",
		CirclePlus: "⊕",
		CircleTimes: "⊗",
		cirE: "⧃",
		cire: "≗",
		cirfnint: "⨐",
		cirmid: "⫯",
		cirscir: "⧂",
		ClockwiseContourIntegral: "∲",
		CloseCurlyDoubleQuote: "”",
		CloseCurlyQuote: "’",
		clubs: "♣",
		clubsuit: "♣",
		Colon: "∷",
		colon: ":",
		Colone: "⩴",
		colone: "≔",
		coloneq: "≔",
		comma: ",",
		commat: "@",
		comp: "∁",
		compfn: "∘",
		complement: "∁",
		complexes: "ℂ",
		cong: "≅",
		congdot: "⩭",
		Congruent: "≡",
		Conint: "∯",
		conint: "∮",
		ContourIntegral: "∮",
		Copf: "ℂ",
		copf: "𝕔",
		coprod: "∐",
		Coproduct: "∐",
		COPY: "©",
		copy: "©",
		copysr: "℗",
		CounterClockwiseContourIntegral: "∳",
		crarr: "↵",
		Cross: "⨯",
		cross: "✗",
		Cscr: "𝒞",
		cscr: "𝒸",
		csub: "⫏",
		csube: "⫑",
		csup: "⫐",
		csupe: "⫒",
		ctdot: "⋯",
		cudarrl: "⤸",
		cudarrr: "⤵",
		cuepr: "⋞",
		cuesc: "⋟",
		cularr: "↶",
		cularrp: "⤽",
		Cup: "⋓",
		cup: "∪",
		cupbrcap: "⩈",
		CupCap: "≍",
		cupcap: "⩆",
		cupcup: "⩊",
		cupdot: "⊍",
		cupor: "⩅",
		cups: "∪︀",
		curarr: "↷",
		curarrm: "⤼",
		curlyeqprec: "⋞",
		curlyeqsucc: "⋟",
		curlyvee: "⋎",
		curlywedge: "⋏",
		curren: "¤",
		curvearrowleft: "↶",
		curvearrowright: "↷",
		cuvee: "⋎",
		cuwed: "⋏",
		cwconint: "∲",
		cwint: "∱",
		cylcty: "⌭",
		Dagger: "‡",
		dagger: "†",
		daleth: "ℸ",
		Darr: "↡",
		dArr: "⇓",
		darr: "↓",
		dash: "‐",
		Dashv: "⫤",
		dashv: "⊣",
		dbkarow: "⤏",
		dblac: "˝",
		Dcaron: "Ď",
		dcaron: "ď",
		Dcy: "Д",
		dcy: "д",
		DD: "ⅅ",
		dd: "ⅆ",
		ddagger: "‡",
		ddarr: "⇊",
		DDotrahd: "⤑",
		ddotseq: "⩷",
		deg: "°",
		Del: "∇",
		Delta: "Δ",
		delta: "δ",
		demptyv: "⦱",
		dfisht: "⥿",
		Dfr: "𝔇",
		dfr: "𝔡",
		dHar: "⥥",
		dharl: "⇃",
		dharr: "⇂",
		DiacriticalAcute: "´",
		DiacriticalDot: "˙",
		DiacriticalDoubleAcute: "˝",
		DiacriticalGrave: "`",
		DiacriticalTilde: "˜",
		diam: "⋄",
		Diamond: "⋄",
		diamond: "⋄",
		diamondsuit: "♦",
		diams: "♦",
		die: "¨",
		DifferentialD: "ⅆ",
		digamma: "ϝ",
		disin: "⋲",
		div: "÷",
		divide: "÷",
		divideontimes: "⋇",
		divonx: "⋇",
		DJcy: "Ђ",
		djcy: "ђ",
		dlcorn: "⌞",
		dlcrop: "⌍",
		dollar: "$",
		Dopf: "𝔻",
		dopf: "𝕕",
		Dot: "¨",
		dot: "˙",
		DotDot: "⃜",
		doteq: "≐",
		doteqdot: "≑",
		DotEqual: "≐",
		dotminus: "∸",
		dotplus: "∔",
		dotsquare: "⊡",
		doublebarwedge: "⌆",
		DoubleContourIntegral: "∯",
		DoubleDot: "¨",
		DoubleDownArrow: "⇓",
		DoubleLeftArrow: "⇐",
		DoubleLeftRightArrow: "⇔",
		DoubleLeftTee: "⫤",
		DoubleLongLeftArrow: "⟸",
		DoubleLongLeftRightArrow: "⟺",
		DoubleLongRightArrow: "⟹",
		DoubleRightArrow: "⇒",
		DoubleRightTee: "⊨",
		DoubleUpArrow: "⇑",
		DoubleUpDownArrow: "⇕",
		DoubleVerticalBar: "∥",
		DownArrow: "↓",
		Downarrow: "⇓",
		downarrow: "↓",
		DownArrowBar: "⤓",
		DownArrowUpArrow: "⇵",
		DownBreve: "̑",
		downdownarrows: "⇊",
		downharpoonleft: "⇃",
		downharpoonright: "⇂",
		DownLeftRightVector: "⥐",
		DownLeftTeeVector: "⥞",
		DownLeftVector: "↽",
		DownLeftVectorBar: "⥖",
		DownRightTeeVector: "⥟",
		DownRightVector: "⇁",
		DownRightVectorBar: "⥗",
		DownTee: "⊤",
		DownTeeArrow: "↧",
		drbkarow: "⤐",
		drcorn: "⌟",
		drcrop: "⌌",
		Dscr: "𝒟",
		dscr: "𝒹",
		DScy: "Ѕ",
		dscy: "ѕ",
		dsol: "⧶",
		Dstrok: "Đ",
		dstrok: "đ",
		dtdot: "⋱",
		dtri: "▿",
		dtrif: "▾",
		duarr: "⇵",
		duhar: "⥯",
		dwangle: "⦦",
		DZcy: "Џ",
		dzcy: "џ",
		dzigrarr: "⟿",
		Eacute: "É",
		eacute: "é",
		easter: "⩮",
		Ecaron: "Ě",
		ecaron: "ě",
		ecir: "≖",
		Ecirc: "Ê",
		ecirc: "ê",
		ecolon: "≕",
		Ecy: "Э",
		ecy: "э",
		eDDot: "⩷",
		Edot: "Ė",
		eDot: "≑",
		edot: "ė",
		ee: "ⅇ",
		efDot: "≒",
		Efr: "𝔈",
		efr: "𝔢",
		eg: "⪚",
		Egrave: "È",
		egrave: "è",
		egs: "⪖",
		egsdot: "⪘",
		el: "⪙",
		Element: "∈",
		elinters: "⏧",
		ell: "ℓ",
		els: "⪕",
		elsdot: "⪗",
		Emacr: "Ē",
		emacr: "ē",
		empty: "∅",
		emptyset: "∅",
		EmptySmallSquare: "◻",
		emptyv: "∅",
		EmptyVerySmallSquare: "▫",
		emsp: " ",
		emsp13: " ",
		emsp14: " ",
		ENG: "Ŋ",
		eng: "ŋ",
		ensp: " ",
		Eogon: "Ę",
		eogon: "ę",
		Eopf: "𝔼",
		eopf: "𝕖",
		epar: "⋕",
		eparsl: "⧣",
		eplus: "⩱",
		epsi: "ε",
		Epsilon: "Ε",
		epsilon: "ε",
		epsiv: "ϵ",
		eqcirc: "≖",
		eqcolon: "≕",
		eqsim: "≂",
		eqslantgtr: "⪖",
		eqslantless: "⪕",
		Equal: "⩵",
		equals: "=",
		EqualTilde: "≂",
		equest: "≟",
		Equilibrium: "⇌",
		equiv: "≡",
		equivDD: "⩸",
		eqvparsl: "⧥",
		erarr: "⥱",
		erDot: "≓",
		Escr: "ℰ",
		escr: "ℯ",
		esdot: "≐",
		Esim: "⩳",
		esim: "≂",
		Eta: "Η",
		eta: "η",
		ETH: "Ð",
		eth: "ð",
		Euml: "Ë",
		euml: "ë",
		euro: "€",
		excl: "!",
		exist: "∃",
		Exists: "∃",
		expectation: "ℰ",
		ExponentialE: "ⅇ",
		exponentiale: "ⅇ",
		fallingdotseq: "≒",
		Fcy: "Ф",
		fcy: "ф",
		female: "♀",
		ffilig: "ﬃ",
		fflig: "ﬀ",
		ffllig: "ﬄ",
		Ffr: "𝔉",
		ffr: "𝔣",
		filig: "ﬁ",
		FilledSmallSquare: "◼",
		FilledVerySmallSquare: "▪",
		fjlig: "fj",
		flat: "♭",
		fllig: "ﬂ",
		fltns: "▱",
		fnof: "ƒ",
		Fopf: "𝔽",
		fopf: "𝕗",
		ForAll: "∀",
		forall: "∀",
		fork: "⋔",
		forkv: "⫙",
		Fouriertrf: "ℱ",
		fpartint: "⨍",
		frac12: "½",
		frac13: "⅓",
		frac14: "¼",
		frac15: "⅕",
		frac16: "⅙",
		frac18: "⅛",
		frac23: "⅔",
		frac25: "⅖",
		frac34: "¾",
		frac35: "⅗",
		frac38: "⅜",
		frac45: "⅘",
		frac56: "⅚",
		frac58: "⅝",
		frac78: "⅞",
		frasl: "⁄",
		frown: "⌢",
		Fscr: "ℱ",
		fscr: "𝒻",
		gacute: "ǵ",
		Gamma: "Γ",
		gamma: "γ",
		Gammad: "Ϝ",
		gammad: "ϝ",
		gap: "⪆",
		Gbreve: "Ğ",
		gbreve: "ğ",
		Gcedil: "Ģ",
		Gcirc: "Ĝ",
		gcirc: "ĝ",
		Gcy: "Г",
		gcy: "г",
		Gdot: "Ġ",
		gdot: "ġ",
		gE: "≧",
		ge: "≥",
		gEl: "⪌",
		gel: "⋛",
		geq: "≥",
		geqq: "≧",
		geqslant: "⩾",
		ges: "⩾",
		gescc: "⪩",
		gesdot: "⪀",
		gesdoto: "⪂",
		gesdotol: "⪄",
		gesl: "⋛︀",
		gesles: "⪔",
		Gfr: "𝔊",
		gfr: "𝔤",
		Gg: "⋙",
		gg: "≫",
		ggg: "⋙",
		gimel: "ℷ",
		GJcy: "Ѓ",
		gjcy: "ѓ",
		gl: "≷",
		gla: "⪥",
		glE: "⪒",
		glj: "⪤",
		gnap: "⪊",
		gnapprox: "⪊",
		gnE: "≩",
		gne: "⪈",
		gneq: "⪈",
		gneqq: "≩",
		gnsim: "⋧",
		Gopf: "𝔾",
		gopf: "𝕘",
		grave: "`",
		GreaterEqual: "≥",
		GreaterEqualLess: "⋛",
		GreaterFullEqual: "≧",
		GreaterGreater: "⪢",
		GreaterLess: "≷",
		GreaterSlantEqual: "⩾",
		GreaterTilde: "≳",
		Gscr: "𝒢",
		gscr: "ℊ",
		gsim: "≳",
		gsime: "⪎",
		gsiml: "⪐",
		Gt: "≫",
		GT: ">",
		gt: ">",
		gtcc: "⪧",
		gtcir: "⩺",
		gtdot: "⋗",
		gtlPar: "⦕",
		gtquest: "⩼",
		gtrapprox: "⪆",
		gtrarr: "⥸",
		gtrdot: "⋗",
		gtreqless: "⋛",
		gtreqqless: "⪌",
		gtrless: "≷",
		gtrsim: "≳",
		gvertneqq: "≩︀",
		gvnE: "≩︀",
		Hacek: "ˇ",
		hairsp: " ",
		half: "½",
		hamilt: "ℋ",
		HARDcy: "Ъ",
		hardcy: "ъ",
		hArr: "⇔",
		harr: "↔",
		harrcir: "⥈",
		harrw: "↭",
		Hat: "^",
		hbar: "ℏ",
		Hcirc: "Ĥ",
		hcirc: "ĥ",
		hearts: "♥",
		heartsuit: "♥",
		hellip: "…",
		hercon: "⊹",
		Hfr: "ℌ",
		hfr: "𝔥",
		HilbertSpace: "ℋ",
		hksearow: "⤥",
		hkswarow: "⤦",
		hoarr: "⇿",
		homtht: "∻",
		hookleftarrow: "↩",
		hookrightarrow: "↪",
		Hopf: "ℍ",
		hopf: "𝕙",
		horbar: "―",
		HorizontalLine: "─",
		Hscr: "ℋ",
		hscr: "𝒽",
		hslash: "ℏ",
		Hstrok: "Ħ",
		hstrok: "ħ",
		HumpDownHump: "≎",
		HumpEqual: "≏",
		hybull: "⁃",
		hyphen: "‐",
		Iacute: "Í",
		iacute: "í",
		ic: "⁣",
		Icirc: "Î",
		icirc: "î",
		Icy: "И",
		icy: "и",
		Idot: "İ",
		IEcy: "Е",
		iecy: "е",
		iexcl: "¡",
		iff: "⇔",
		Ifr: "ℑ",
		ifr: "𝔦",
		Igrave: "Ì",
		igrave: "ì",
		ii: "ⅈ",
		iiiint: "⨌",
		iiint: "∭",
		iinfin: "⧜",
		iiota: "℩",
		IJlig: "Ĳ",
		ijlig: "ĳ",
		Im: "ℑ",
		Imacr: "Ī",
		imacr: "ī",
		image: "ℑ",
		ImaginaryI: "ⅈ",
		imagline: "ℐ",
		imagpart: "ℑ",
		imath: "ı",
		imof: "⊷",
		imped: "Ƶ",
		Implies: "⇒",
		in: "∈",
		incare: "℅",
		infin: "∞",
		infintie: "⧝",
		inodot: "ı",
		Int: "∬",
		int: "∫",
		intcal: "⊺",
		integers: "ℤ",
		Integral: "∫",
		intercal: "⊺",
		Intersection: "⋂",
		intlarhk: "⨗",
		intprod: "⨼",
		InvisibleComma: "⁣",
		InvisibleTimes: "⁢",
		IOcy: "Ё",
		iocy: "ё",
		Iogon: "Į",
		iogon: "į",
		Iopf: "𝕀",
		iopf: "𝕚",
		Iota: "Ι",
		iota: "ι",
		iprod: "⨼",
		iquest: "¿",
		Iscr: "ℐ",
		iscr: "𝒾",
		isin: "∈",
		isindot: "⋵",
		isinE: "⋹",
		isins: "⋴",
		isinsv: "⋳",
		isinv: "∈",
		it: "⁢",
		Itilde: "Ĩ",
		itilde: "ĩ",
		Iukcy: "І",
		iukcy: "і",
		Iuml: "Ï",
		iuml: "ï",
		Jcirc: "Ĵ",
		jcirc: "ĵ",
		Jcy: "Й",
		jcy: "й",
		Jfr: "𝔍",
		jfr: "𝔧",
		jmath: "ȷ",
		Jopf: "𝕁",
		jopf: "𝕛",
		Jscr: "𝒥",
		jscr: "𝒿",
		Jsercy: "Ј",
		jsercy: "ј",
		Jukcy: "Є",
		jukcy: "є",
		Kappa: "Κ",
		kappa: "κ",
		kappav: "ϰ",
		Kcedil: "Ķ",
		kcedil: "ķ",
		Kcy: "К",
		kcy: "к",
		Kfr: "𝔎",
		kfr: "𝔨",
		kgreen: "ĸ",
		KHcy: "Х",
		khcy: "х",
		KJcy: "Ќ",
		kjcy: "ќ",
		Kopf: "𝕂",
		kopf: "𝕜",
		Kscr: "𝒦",
		kscr: "𝓀",
		lAarr: "⇚",
		Lacute: "Ĺ",
		lacute: "ĺ",
		laemptyv: "⦴",
		lagran: "ℒ",
		Lambda: "Λ",
		lambda: "λ",
		Lang: "⟪",
		lang: "⟨",
		langd: "⦑",
		langle: "⟨",
		lap: "⪅",
		Laplacetrf: "ℒ",
		laquo: "«",
		Larr: "↞",
		lArr: "⇐",
		larr: "←",
		larrb: "⇤",
		larrbfs: "⤟",
		larrfs: "⤝",
		larrhk: "↩",
		larrlp: "↫",
		larrpl: "⤹",
		larrsim: "⥳",
		larrtl: "↢",
		lat: "⪫",
		lAtail: "⤛",
		latail: "⤙",
		late: "⪭",
		lates: "⪭︀",
		lBarr: "⤎",
		lbarr: "⤌",
		lbbrk: "❲",
		lbrace: "{",
		lbrack: "[",
		lbrke: "⦋",
		lbrksld: "⦏",
		lbrkslu: "⦍",
		Lcaron: "Ľ",
		lcaron: "ľ",
		Lcedil: "Ļ",
		lcedil: "ļ",
		lceil: "⌈",
		lcub: "{",
		Lcy: "Л",
		lcy: "л",
		ldca: "⤶",
		ldquo: "“",
		ldquor: "„",
		ldrdhar: "⥧",
		ldrushar: "⥋",
		ldsh: "↲",
		lE: "≦",
		le: "≤",
		LeftAngleBracket: "⟨",
		LeftArrow: "←",
		Leftarrow: "⇐",
		leftarrow: "←",
		LeftArrowBar: "⇤",
		LeftArrowRightArrow: "⇆",
		leftarrowtail: "↢",
		LeftCeiling: "⌈",
		LeftDoubleBracket: "⟦",
		LeftDownTeeVector: "⥡",
		LeftDownVector: "⇃",
		LeftDownVectorBar: "⥙",
		LeftFloor: "⌊",
		leftharpoondown: "↽",
		leftharpoonup: "↼",
		leftleftarrows: "⇇",
		LeftRightArrow: "↔",
		Leftrightarrow: "⇔",
		leftrightarrow: "↔",
		leftrightarrows: "⇆",
		leftrightharpoons: "⇋",
		leftrightsquigarrow: "↭",
		LeftRightVector: "⥎",
		LeftTee: "⊣",
		LeftTeeArrow: "↤",
		LeftTeeVector: "⥚",
		leftthreetimes: "⋋",
		LeftTriangle: "⊲",
		LeftTriangleBar: "⧏",
		LeftTriangleEqual: "⊴",
		LeftUpDownVector: "⥑",
		LeftUpTeeVector: "⥠",
		LeftUpVector: "↿",
		LeftUpVectorBar: "⥘",
		LeftVector: "↼",
		LeftVectorBar: "⥒",
		lEg: "⪋",
		leg: "⋚",
		leq: "≤",
		leqq: "≦",
		leqslant: "⩽",
		les: "⩽",
		lescc: "⪨",
		lesdot: "⩿",
		lesdoto: "⪁",
		lesdotor: "⪃",
		lesg: "⋚︀",
		lesges: "⪓",
		lessapprox: "⪅",
		lessdot: "⋖",
		lesseqgtr: "⋚",
		lesseqqgtr: "⪋",
		LessEqualGreater: "⋚",
		LessFullEqual: "≦",
		LessGreater: "≶",
		lessgtr: "≶",
		LessLess: "⪡",
		lesssim: "≲",
		LessSlantEqual: "⩽",
		LessTilde: "≲",
		lfisht: "⥼",
		lfloor: "⌊",
		Lfr: "𝔏",
		lfr: "𝔩",
		lg: "≶",
		lgE: "⪑",
		lHar: "⥢",
		lhard: "↽",
		lharu: "↼",
		lharul: "⥪",
		lhblk: "▄",
		LJcy: "Љ",
		ljcy: "љ",
		Ll: "⋘",
		ll: "≪",
		llarr: "⇇",
		llcorner: "⌞",
		Lleftarrow: "⇚",
		llhard: "⥫",
		lltri: "◺",
		Lmidot: "Ŀ",
		lmidot: "ŀ",
		lmoust: "⎰",
		lmoustache: "⎰",
		lnap: "⪉",
		lnapprox: "⪉",
		lnE: "≨",
		lne: "⪇",
		lneq: "⪇",
		lneqq: "≨",
		lnsim: "⋦",
		loang: "⟬",
		loarr: "⇽",
		lobrk: "⟦",
		LongLeftArrow: "⟵",
		Longleftarrow: "⟸",
		longleftarrow: "⟵",
		LongLeftRightArrow: "⟷",
		Longleftrightarrow: "⟺",
		longleftrightarrow: "⟷",
		longmapsto: "⟼",
		LongRightArrow: "⟶",
		Longrightarrow: "⟹",
		longrightarrow: "⟶",
		looparrowleft: "↫",
		looparrowright: "↬",
		lopar: "⦅",
		Lopf: "𝕃",
		lopf: "𝕝",
		loplus: "⨭",
		lotimes: "⨴",
		lowast: "∗",
		lowbar: "_",
		LowerLeftArrow: "↙",
		LowerRightArrow: "↘",
		loz: "◊",
		lozenge: "◊",
		lozf: "⧫",
		lpar: "(",
		lparlt: "⦓",
		lrarr: "⇆",
		lrcorner: "⌟",
		lrhar: "⇋",
		lrhard: "⥭",
		lrm: "‎",
		lrtri: "⊿",
		lsaquo: "‹",
		Lscr: "ℒ",
		lscr: "𝓁",
		Lsh: "↰",
		lsh: "↰",
		lsim: "≲",
		lsime: "⪍",
		lsimg: "⪏",
		lsqb: "[",
		lsquo: "‘",
		lsquor: "‚",
		Lstrok: "Ł",
		lstrok: "ł",
		Lt: "≪",
		LT: "<",
		lt: "<",
		ltcc: "⪦",
		ltcir: "⩹",
		ltdot: "⋖",
		lthree: "⋋",
		ltimes: "⋉",
		ltlarr: "⥶",
		ltquest: "⩻",
		ltri: "◃",
		ltrie: "⊴",
		ltrif: "◂",
		ltrPar: "⦖",
		lurdshar: "⥊",
		luruhar: "⥦",
		lvertneqq: "≨︀",
		lvnE: "≨︀",
		macr: "¯",
		male: "♂",
		malt: "✠",
		maltese: "✠",
		Map: "⤅",
		map: "↦",
		mapsto: "↦",
		mapstodown: "↧",
		mapstoleft: "↤",
		mapstoup: "↥",
		marker: "▮",
		mcomma: "⨩",
		Mcy: "М",
		mcy: "м",
		mdash: "—",
		mDDot: "∺",
		measuredangle: "∡",
		MediumSpace: " ",
		Mellintrf: "ℳ",
		Mfr: "𝔐",
		mfr: "𝔪",
		mho: "℧",
		micro: "µ",
		mid: "∣",
		midast: "*",
		midcir: "⫰",
		middot: "·",
		minus: "−",
		minusb: "⊟",
		minusd: "∸",
		minusdu: "⨪",
		MinusPlus: "∓",
		mlcp: "⫛",
		mldr: "…",
		mnplus: "∓",
		models: "⊧",
		Mopf: "𝕄",
		mopf: "𝕞",
		mp: "∓",
		Mscr: "ℳ",
		mscr: "𝓂",
		mstpos: "∾",
		Mu: "Μ",
		mu: "μ",
		multimap: "⊸",
		mumap: "⊸",
		nabla: "∇",
		Nacute: "Ń",
		nacute: "ń",
		nang: "∠⃒",
		nap: "≉",
		napE: "⩰̸",
		napid: "≋̸",
		napos: "ŉ",
		napprox: "≉",
		natur: "♮",
		natural: "♮",
		naturals: "ℕ",
		nbsp: "\xA0",
		nbump: "≎̸",
		nbumpe: "≏̸",
		ncap: "⩃",
		Ncaron: "Ň",
		ncaron: "ň",
		Ncedil: "Ņ",
		ncedil: "ņ",
		ncong: "≇",
		ncongdot: "⩭̸",
		ncup: "⩂",
		Ncy: "Н",
		ncy: "н",
		ndash: "–",
		ne: "≠",
		nearhk: "⤤",
		neArr: "⇗",
		nearr: "↗",
		nearrow: "↗",
		nedot: "≐̸",
		NegativeMediumSpace: "​",
		NegativeThickSpace: "​",
		NegativeThinSpace: "​",
		NegativeVeryThinSpace: "​",
		nequiv: "≢",
		nesear: "⤨",
		nesim: "≂̸",
		NestedGreaterGreater: "≫",
		NestedLessLess: "≪",
		NewLine: "\n",
		nexist: "∄",
		nexists: "∄",
		Nfr: "𝔑",
		nfr: "𝔫",
		ngE: "≧̸",
		nge: "≱",
		ngeq: "≱",
		ngeqq: "≧̸",
		ngeqslant: "⩾̸",
		nges: "⩾̸",
		nGg: "⋙̸",
		ngsim: "≵",
		nGt: "≫⃒",
		ngt: "≯",
		ngtr: "≯",
		nGtv: "≫̸",
		nhArr: "⇎",
		nharr: "↮",
		nhpar: "⫲",
		ni: "∋",
		nis: "⋼",
		nisd: "⋺",
		niv: "∋",
		NJcy: "Њ",
		njcy: "њ",
		nlArr: "⇍",
		nlarr: "↚",
		nldr: "‥",
		nlE: "≦̸",
		nle: "≰",
		nLeftarrow: "⇍",
		nleftarrow: "↚",
		nLeftrightarrow: "⇎",
		nleftrightarrow: "↮",
		nleq: "≰",
		nleqq: "≦̸",
		nleqslant: "⩽̸",
		nles: "⩽̸",
		nless: "≮",
		nLl: "⋘̸",
		nlsim: "≴",
		nLt: "≪⃒",
		nlt: "≮",
		nltri: "⋪",
		nltrie: "⋬",
		nLtv: "≪̸",
		nmid: "∤",
		NoBreak: "⁠",
		NonBreakingSpace: "\xA0",
		Nopf: "ℕ",
		nopf: "𝕟",
		Not: "⫬",
		not: "¬",
		NotCongruent: "≢",
		NotCupCap: "≭",
		NotDoubleVerticalBar: "∦",
		NotElement: "∉",
		NotEqual: "≠",
		NotEqualTilde: "≂̸",
		NotExists: "∄",
		NotGreater: "≯",
		NotGreaterEqual: "≱",
		NotGreaterFullEqual: "≧̸",
		NotGreaterGreater: "≫̸",
		NotGreaterLess: "≹",
		NotGreaterSlantEqual: "⩾̸",
		NotGreaterTilde: "≵",
		NotHumpDownHump: "≎̸",
		NotHumpEqual: "≏̸",
		notin: "∉",
		notindot: "⋵̸",
		notinE: "⋹̸",
		notinva: "∉",
		notinvb: "⋷",
		notinvc: "⋶",
		NotLeftTriangle: "⋪",
		NotLeftTriangleBar: "⧏̸",
		NotLeftTriangleEqual: "⋬",
		NotLess: "≮",
		NotLessEqual: "≰",
		NotLessGreater: "≸",
		NotLessLess: "≪̸",
		NotLessSlantEqual: "⩽̸",
		NotLessTilde: "≴",
		NotNestedGreaterGreater: "⪢̸",
		NotNestedLessLess: "⪡̸",
		notni: "∌",
		notniva: "∌",
		notnivb: "⋾",
		notnivc: "⋽",
		NotPrecedes: "⊀",
		NotPrecedesEqual: "⪯̸",
		NotPrecedesSlantEqual: "⋠",
		NotReverseElement: "∌",
		NotRightTriangle: "⋫",
		NotRightTriangleBar: "⧐̸",
		NotRightTriangleEqual: "⋭",
		NotSquareSubset: "⊏̸",
		NotSquareSubsetEqual: "⋢",
		NotSquareSuperset: "⊐̸",
		NotSquareSupersetEqual: "⋣",
		NotSubset: "⊂⃒",
		NotSubsetEqual: "⊈",
		NotSucceeds: "⊁",
		NotSucceedsEqual: "⪰̸",
		NotSucceedsSlantEqual: "⋡",
		NotSucceedsTilde: "≿̸",
		NotSuperset: "⊃⃒",
		NotSupersetEqual: "⊉",
		NotTilde: "≁",
		NotTildeEqual: "≄",
		NotTildeFullEqual: "≇",
		NotTildeTilde: "≉",
		NotVerticalBar: "∤",
		npar: "∦",
		nparallel: "∦",
		nparsl: "⫽⃥",
		npart: "∂̸",
		npolint: "⨔",
		npr: "⊀",
		nprcue: "⋠",
		npre: "⪯̸",
		nprec: "⊀",
		npreceq: "⪯̸",
		nrArr: "⇏",
		nrarr: "↛",
		nrarrc: "⤳̸",
		nrarrw: "↝̸",
		nRightarrow: "⇏",
		nrightarrow: "↛",
		nrtri: "⋫",
		nrtrie: "⋭",
		nsc: "⊁",
		nsccue: "⋡",
		nsce: "⪰̸",
		Nscr: "𝒩",
		nscr: "𝓃",
		nshortmid: "∤",
		nshortparallel: "∦",
		nsim: "≁",
		nsime: "≄",
		nsimeq: "≄",
		nsmid: "∤",
		nspar: "∦",
		nsqsube: "⋢",
		nsqsupe: "⋣",
		nsub: "⊄",
		nsubE: "⫅̸",
		nsube: "⊈",
		nsubset: "⊂⃒",
		nsubseteq: "⊈",
		nsubseteqq: "⫅̸",
		nsucc: "⊁",
		nsucceq: "⪰̸",
		nsup: "⊅",
		nsupE: "⫆̸",
		nsupe: "⊉",
		nsupset: "⊃⃒",
		nsupseteq: "⊉",
		nsupseteqq: "⫆̸",
		ntgl: "≹",
		Ntilde: "Ñ",
		ntilde: "ñ",
		ntlg: "≸",
		ntriangleleft: "⋪",
		ntrianglelefteq: "⋬",
		ntriangleright: "⋫",
		ntrianglerighteq: "⋭",
		Nu: "Ν",
		nu: "ν",
		num: "#",
		numero: "№",
		numsp: " ",
		nvap: "≍⃒",
		nVDash: "⊯",
		nVdash: "⊮",
		nvDash: "⊭",
		nvdash: "⊬",
		nvge: "≥⃒",
		nvgt: ">⃒",
		nvHarr: "⤄",
		nvinfin: "⧞",
		nvlArr: "⤂",
		nvle: "≤⃒",
		nvlt: "<⃒",
		nvltrie: "⊴⃒",
		nvrArr: "⤃",
		nvrtrie: "⊵⃒",
		nvsim: "∼⃒",
		nwarhk: "⤣",
		nwArr: "⇖",
		nwarr: "↖",
		nwarrow: "↖",
		nwnear: "⤧",
		Oacute: "Ó",
		oacute: "ó",
		oast: "⊛",
		ocir: "⊚",
		Ocirc: "Ô",
		ocirc: "ô",
		Ocy: "О",
		ocy: "о",
		odash: "⊝",
		Odblac: "Ő",
		odblac: "ő",
		odiv: "⨸",
		odot: "⊙",
		odsold: "⦼",
		OElig: "Œ",
		oelig: "œ",
		ofcir: "⦿",
		Ofr: "𝔒",
		ofr: "𝔬",
		ogon: "˛",
		Ograve: "Ò",
		ograve: "ò",
		ogt: "⧁",
		ohbar: "⦵",
		ohm: "Ω",
		oint: "∮",
		olarr: "↺",
		olcir: "⦾",
		olcross: "⦻",
		oline: "‾",
		olt: "⧀",
		Omacr: "Ō",
		omacr: "ō",
		Omega: "Ω",
		omega: "ω",
		Omicron: "Ο",
		omicron: "ο",
		omid: "⦶",
		ominus: "⊖",
		Oopf: "𝕆",
		oopf: "𝕠",
		opar: "⦷",
		OpenCurlyDoubleQuote: "“",
		OpenCurlyQuote: "‘",
		operp: "⦹",
		oplus: "⊕",
		Or: "⩔",
		or: "∨",
		orarr: "↻",
		ord: "⩝",
		order: "ℴ",
		orderof: "ℴ",
		ordf: "ª",
		ordm: "º",
		origof: "⊶",
		oror: "⩖",
		orslope: "⩗",
		orv: "⩛",
		oS: "Ⓢ",
		Oscr: "𝒪",
		oscr: "ℴ",
		Oslash: "Ø",
		oslash: "ø",
		osol: "⊘",
		Otilde: "Õ",
		otilde: "õ",
		Otimes: "⨷",
		otimes: "⊗",
		otimesas: "⨶",
		Ouml: "Ö",
		ouml: "ö",
		ovbar: "⌽",
		OverBar: "‾",
		OverBrace: "⏞",
		OverBracket: "⎴",
		OverParenthesis: "⏜",
		par: "∥",
		para: "¶",
		parallel: "∥",
		parsim: "⫳",
		parsl: "⫽",
		part: "∂",
		PartialD: "∂",
		Pcy: "П",
		pcy: "п",
		percnt: "%",
		period: ".",
		permil: "‰",
		perp: "⊥",
		pertenk: "‱",
		Pfr: "𝔓",
		pfr: "𝔭",
		Phi: "Φ",
		phi: "φ",
		phiv: "ϕ",
		phmmat: "ℳ",
		phone: "☎",
		Pi: "Π",
		pi: "π",
		pitchfork: "⋔",
		piv: "ϖ",
		planck: "ℏ",
		planckh: "ℎ",
		plankv: "ℏ",
		plus: "+",
		plusacir: "⨣",
		plusb: "⊞",
		pluscir: "⨢",
		plusdo: "∔",
		plusdu: "⨥",
		pluse: "⩲",
		PlusMinus: "±",
		plusmn: "±",
		plussim: "⨦",
		plustwo: "⨧",
		pm: "±",
		Poincareplane: "ℌ",
		pointint: "⨕",
		Popf: "ℙ",
		popf: "𝕡",
		pound: "£",
		Pr: "⪻",
		pr: "≺",
		prap: "⪷",
		prcue: "≼",
		prE: "⪳",
		pre: "⪯",
		prec: "≺",
		precapprox: "⪷",
		preccurlyeq: "≼",
		Precedes: "≺",
		PrecedesEqual: "⪯",
		PrecedesSlantEqual: "≼",
		PrecedesTilde: "≾",
		preceq: "⪯",
		precnapprox: "⪹",
		precneqq: "⪵",
		precnsim: "⋨",
		precsim: "≾",
		Prime: "″",
		prime: "′",
		primes: "ℙ",
		prnap: "⪹",
		prnE: "⪵",
		prnsim: "⋨",
		prod: "∏",
		Product: "∏",
		profalar: "⌮",
		profline: "⌒",
		profsurf: "⌓",
		prop: "∝",
		Proportion: "∷",
		Proportional: "∝",
		propto: "∝",
		prsim: "≾",
		prurel: "⊰",
		Pscr: "𝒫",
		pscr: "𝓅",
		Psi: "Ψ",
		psi: "ψ",
		puncsp: " ",
		Qfr: "𝔔",
		qfr: "𝔮",
		qint: "⨌",
		Qopf: "ℚ",
		qopf: "𝕢",
		qprime: "⁗",
		Qscr: "𝒬",
		qscr: "𝓆",
		quaternions: "ℍ",
		quatint: "⨖",
		quest: "?",
		questeq: "≟",
		QUOT: "\"",
		quot: "\"",
		rAarr: "⇛",
		race: "∽̱",
		Racute: "Ŕ",
		racute: "ŕ",
		radic: "√",
		raemptyv: "⦳",
		Rang: "⟫",
		rang: "⟩",
		rangd: "⦒",
		range: "⦥",
		rangle: "⟩",
		raquo: "»",
		Rarr: "↠",
		rArr: "⇒",
		rarr: "→",
		rarrap: "⥵",
		rarrb: "⇥",
		rarrbfs: "⤠",
		rarrc: "⤳",
		rarrfs: "⤞",
		rarrhk: "↪",
		rarrlp: "↬",
		rarrpl: "⥅",
		rarrsim: "⥴",
		Rarrtl: "⤖",
		rarrtl: "↣",
		rarrw: "↝",
		rAtail: "⤜",
		ratail: "⤚",
		ratio: "∶",
		rationals: "ℚ",
		RBarr: "⤐",
		rBarr: "⤏",
		rbarr: "⤍",
		rbbrk: "❳",
		rbrace: "}",
		rbrack: "]",
		rbrke: "⦌",
		rbrksld: "⦎",
		rbrkslu: "⦐",
		Rcaron: "Ř",
		rcaron: "ř",
		Rcedil: "Ŗ",
		rcedil: "ŗ",
		rceil: "⌉",
		rcub: "}",
		Rcy: "Р",
		rcy: "р",
		rdca: "⤷",
		rdldhar: "⥩",
		rdquo: "”",
		rdquor: "”",
		rdsh: "↳",
		Re: "ℜ",
		real: "ℜ",
		realine: "ℛ",
		realpart: "ℜ",
		reals: "ℝ",
		rect: "▭",
		REG: "®",
		reg: "®",
		ReverseElement: "∋",
		ReverseEquilibrium: "⇋",
		ReverseUpEquilibrium: "⥯",
		rfisht: "⥽",
		rfloor: "⌋",
		Rfr: "ℜ",
		rfr: "𝔯",
		rHar: "⥤",
		rhard: "⇁",
		rharu: "⇀",
		rharul: "⥬",
		Rho: "Ρ",
		rho: "ρ",
		rhov: "ϱ",
		RightAngleBracket: "⟩",
		RightArrow: "→",
		Rightarrow: "⇒",
		rightarrow: "→",
		RightArrowBar: "⇥",
		RightArrowLeftArrow: "⇄",
		rightarrowtail: "↣",
		RightCeiling: "⌉",
		RightDoubleBracket: "⟧",
		RightDownTeeVector: "⥝",
		RightDownVector: "⇂",
		RightDownVectorBar: "⥕",
		RightFloor: "⌋",
		rightharpoondown: "⇁",
		rightharpoonup: "⇀",
		rightleftarrows: "⇄",
		rightleftharpoons: "⇌",
		rightrightarrows: "⇉",
		rightsquigarrow: "↝",
		RightTee: "⊢",
		RightTeeArrow: "↦",
		RightTeeVector: "⥛",
		rightthreetimes: "⋌",
		RightTriangle: "⊳",
		RightTriangleBar: "⧐",
		RightTriangleEqual: "⊵",
		RightUpDownVector: "⥏",
		RightUpTeeVector: "⥜",
		RightUpVector: "↾",
		RightUpVectorBar: "⥔",
		RightVector: "⇀",
		RightVectorBar: "⥓",
		ring: "˚",
		risingdotseq: "≓",
		rlarr: "⇄",
		rlhar: "⇌",
		rlm: "‏",
		rmoust: "⎱",
		rmoustache: "⎱",
		rnmid: "⫮",
		roang: "⟭",
		roarr: "⇾",
		robrk: "⟧",
		ropar: "⦆",
		Ropf: "ℝ",
		ropf: "𝕣",
		roplus: "⨮",
		rotimes: "⨵",
		RoundImplies: "⥰",
		rpar: ")",
		rpargt: "⦔",
		rppolint: "⨒",
		rrarr: "⇉",
		Rrightarrow: "⇛",
		rsaquo: "›",
		Rscr: "ℛ",
		rscr: "𝓇",
		Rsh: "↱",
		rsh: "↱",
		rsqb: "]",
		rsquo: "’",
		rsquor: "’",
		rthree: "⋌",
		rtimes: "⋊",
		rtri: "▹",
		rtrie: "⊵",
		rtrif: "▸",
		rtriltri: "⧎",
		RuleDelayed: "⧴",
		ruluhar: "⥨",
		rx: "℞",
		Sacute: "Ś",
		sacute: "ś",
		sbquo: "‚",
		Sc: "⪼",
		sc: "≻",
		scap: "⪸",
		Scaron: "Š",
		scaron: "š",
		sccue: "≽",
		scE: "⪴",
		sce: "⪰",
		Scedil: "Ş",
		scedil: "ş",
		Scirc: "Ŝ",
		scirc: "ŝ",
		scnap: "⪺",
		scnE: "⪶",
		scnsim: "⋩",
		scpolint: "⨓",
		scsim: "≿",
		Scy: "С",
		scy: "с",
		sdot: "⋅",
		sdotb: "⊡",
		sdote: "⩦",
		searhk: "⤥",
		seArr: "⇘",
		searr: "↘",
		searrow: "↘",
		sect: "§",
		semi: ";",
		seswar: "⤩",
		setminus: "∖",
		setmn: "∖",
		sext: "✶",
		Sfr: "𝔖",
		sfr: "𝔰",
		sfrown: "⌢",
		sharp: "♯",
		SHCHcy: "Щ",
		shchcy: "щ",
		SHcy: "Ш",
		shcy: "ш",
		ShortDownArrow: "↓",
		ShortLeftArrow: "←",
		shortmid: "∣",
		shortparallel: "∥",
		ShortRightArrow: "→",
		ShortUpArrow: "↑",
		shy: "­",
		Sigma: "Σ",
		sigma: "σ",
		sigmaf: "ς",
		sigmav: "ς",
		sim: "∼",
		simdot: "⩪",
		sime: "≃",
		simeq: "≃",
		simg: "⪞",
		simgE: "⪠",
		siml: "⪝",
		simlE: "⪟",
		simne: "≆",
		simplus: "⨤",
		simrarr: "⥲",
		slarr: "←",
		SmallCircle: "∘",
		smallsetminus: "∖",
		smashp: "⨳",
		smeparsl: "⧤",
		smid: "∣",
		smile: "⌣",
		smt: "⪪",
		smte: "⪬",
		smtes: "⪬︀",
		SOFTcy: "Ь",
		softcy: "ь",
		sol: "/",
		solb: "⧄",
		solbar: "⌿",
		Sopf: "𝕊",
		sopf: "𝕤",
		spades: "♠",
		spadesuit: "♠",
		spar: "∥",
		sqcap: "⊓",
		sqcaps: "⊓︀",
		sqcup: "⊔",
		sqcups: "⊔︀",
		Sqrt: "√",
		sqsub: "⊏",
		sqsube: "⊑",
		sqsubset: "⊏",
		sqsubseteq: "⊑",
		sqsup: "⊐",
		sqsupe: "⊒",
		sqsupset: "⊐",
		sqsupseteq: "⊒",
		squ: "□",
		Square: "□",
		square: "□",
		SquareIntersection: "⊓",
		SquareSubset: "⊏",
		SquareSubsetEqual: "⊑",
		SquareSuperset: "⊐",
		SquareSupersetEqual: "⊒",
		SquareUnion: "⊔",
		squarf: "▪",
		squf: "▪",
		srarr: "→",
		Sscr: "𝒮",
		sscr: "𝓈",
		ssetmn: "∖",
		ssmile: "⌣",
		sstarf: "⋆",
		Star: "⋆",
		star: "☆",
		starf: "★",
		straightepsilon: "ϵ",
		straightphi: "ϕ",
		strns: "¯",
		Sub: "⋐",
		sub: "⊂",
		subdot: "⪽",
		subE: "⫅",
		sube: "⊆",
		subedot: "⫃",
		submult: "⫁",
		subnE: "⫋",
		subne: "⊊",
		subplus: "⪿",
		subrarr: "⥹",
		Subset: "⋐",
		subset: "⊂",
		subseteq: "⊆",
		subseteqq: "⫅",
		SubsetEqual: "⊆",
		subsetneq: "⊊",
		subsetneqq: "⫋",
		subsim: "⫇",
		subsub: "⫕",
		subsup: "⫓",
		succ: "≻",
		succapprox: "⪸",
		succcurlyeq: "≽",
		Succeeds: "≻",
		SucceedsEqual: "⪰",
		SucceedsSlantEqual: "≽",
		SucceedsTilde: "≿",
		succeq: "⪰",
		succnapprox: "⪺",
		succneqq: "⪶",
		succnsim: "⋩",
		succsim: "≿",
		SuchThat: "∋",
		Sum: "∑",
		sum: "∑",
		sung: "♪",
		Sup: "⋑",
		sup: "⊃",
		sup1: "¹",
		sup2: "²",
		sup3: "³",
		supdot: "⪾",
		supdsub: "⫘",
		supE: "⫆",
		supe: "⊇",
		supedot: "⫄",
		Superset: "⊃",
		SupersetEqual: "⊇",
		suphsol: "⟉",
		suphsub: "⫗",
		suplarr: "⥻",
		supmult: "⫂",
		supnE: "⫌",
		supne: "⊋",
		supplus: "⫀",
		Supset: "⋑",
		supset: "⊃",
		supseteq: "⊇",
		supseteqq: "⫆",
		supsetneq: "⊋",
		supsetneqq: "⫌",
		supsim: "⫈",
		supsub: "⫔",
		supsup: "⫖",
		swarhk: "⤦",
		swArr: "⇙",
		swarr: "↙",
		swarrow: "↙",
		swnwar: "⤪",
		szlig: "ß",
		Tab: "	",
		target: "⌖",
		Tau: "Τ",
		tau: "τ",
		tbrk: "⎴",
		Tcaron: "Ť",
		tcaron: "ť",
		Tcedil: "Ţ",
		tcedil: "ţ",
		Tcy: "Т",
		tcy: "т",
		tdot: "⃛",
		telrec: "⌕",
		Tfr: "𝔗",
		tfr: "𝔱",
		there4: "∴",
		Therefore: "∴",
		therefore: "∴",
		Theta: "Θ",
		theta: "θ",
		thetasym: "ϑ",
		thetav: "ϑ",
		thickapprox: "≈",
		thicksim: "∼",
		ThickSpace: "  ",
		thinsp: " ",
		ThinSpace: " ",
		thkap: "≈",
		thksim: "∼",
		THORN: "Þ",
		thorn: "þ",
		Tilde: "∼",
		tilde: "˜",
		TildeEqual: "≃",
		TildeFullEqual: "≅",
		TildeTilde: "≈",
		times: "×",
		timesb: "⊠",
		timesbar: "⨱",
		timesd: "⨰",
		tint: "∭",
		toea: "⤨",
		top: "⊤",
		topbot: "⌶",
		topcir: "⫱",
		Topf: "𝕋",
		topf: "𝕥",
		topfork: "⫚",
		tosa: "⤩",
		tprime: "‴",
		TRADE: "™",
		trade: "™",
		triangle: "▵",
		triangledown: "▿",
		triangleleft: "◃",
		trianglelefteq: "⊴",
		triangleq: "≜",
		triangleright: "▹",
		trianglerighteq: "⊵",
		tridot: "◬",
		trie: "≜",
		triminus: "⨺",
		TripleDot: "⃛",
		triplus: "⨹",
		trisb: "⧍",
		tritime: "⨻",
		trpezium: "⏢",
		Tscr: "𝒯",
		tscr: "𝓉",
		TScy: "Ц",
		tscy: "ц",
		TSHcy: "Ћ",
		tshcy: "ћ",
		Tstrok: "Ŧ",
		tstrok: "ŧ",
		twixt: "≬",
		twoheadleftarrow: "↞",
		twoheadrightarrow: "↠",
		Uacute: "Ú",
		uacute: "ú",
		Uarr: "↟",
		uArr: "⇑",
		uarr: "↑",
		Uarrocir: "⥉",
		Ubrcy: "Ў",
		ubrcy: "ў",
		Ubreve: "Ŭ",
		ubreve: "ŭ",
		Ucirc: "Û",
		ucirc: "û",
		Ucy: "У",
		ucy: "у",
		udarr: "⇅",
		Udblac: "Ű",
		udblac: "ű",
		udhar: "⥮",
		ufisht: "⥾",
		Ufr: "𝔘",
		ufr: "𝔲",
		Ugrave: "Ù",
		ugrave: "ù",
		uHar: "⥣",
		uharl: "↿",
		uharr: "↾",
		uhblk: "▀",
		ulcorn: "⌜",
		ulcorner: "⌜",
		ulcrop: "⌏",
		ultri: "◸",
		Umacr: "Ū",
		umacr: "ū",
		uml: "¨",
		UnderBar: "_",
		UnderBrace: "⏟",
		UnderBracket: "⎵",
		UnderParenthesis: "⏝",
		Union: "⋃",
		UnionPlus: "⊎",
		Uogon: "Ų",
		uogon: "ų",
		Uopf: "𝕌",
		uopf: "𝕦",
		UpArrow: "↑",
		Uparrow: "⇑",
		uparrow: "↑",
		UpArrowBar: "⤒",
		UpArrowDownArrow: "⇅",
		UpDownArrow: "↕",
		Updownarrow: "⇕",
		updownarrow: "↕",
		UpEquilibrium: "⥮",
		upharpoonleft: "↿",
		upharpoonright: "↾",
		uplus: "⊎",
		UpperLeftArrow: "↖",
		UpperRightArrow: "↗",
		Upsi: "ϒ",
		upsi: "υ",
		upsih: "ϒ",
		Upsilon: "Υ",
		upsilon: "υ",
		UpTee: "⊥",
		UpTeeArrow: "↥",
		upuparrows: "⇈",
		urcorn: "⌝",
		urcorner: "⌝",
		urcrop: "⌎",
		Uring: "Ů",
		uring: "ů",
		urtri: "◹",
		Uscr: "𝒰",
		uscr: "𝓊",
		utdot: "⋰",
		Utilde: "Ũ",
		utilde: "ũ",
		utri: "▵",
		utrif: "▴",
		uuarr: "⇈",
		Uuml: "Ü",
		uuml: "ü",
		uwangle: "⦧",
		vangrt: "⦜",
		varepsilon: "ϵ",
		varkappa: "ϰ",
		varnothing: "∅",
		varphi: "ϕ",
		varpi: "ϖ",
		varpropto: "∝",
		vArr: "⇕",
		varr: "↕",
		varrho: "ϱ",
		varsigma: "ς",
		varsubsetneq: "⊊︀",
		varsubsetneqq: "⫋︀",
		varsupsetneq: "⊋︀",
		varsupsetneqq: "⫌︀",
		vartheta: "ϑ",
		vartriangleleft: "⊲",
		vartriangleright: "⊳",
		Vbar: "⫫",
		vBar: "⫨",
		vBarv: "⫩",
		Vcy: "В",
		vcy: "в",
		VDash: "⊫",
		Vdash: "⊩",
		vDash: "⊨",
		vdash: "⊢",
		Vdashl: "⫦",
		Vee: "⋁",
		vee: "∨",
		veebar: "⊻",
		veeeq: "≚",
		vellip: "⋮",
		Verbar: "‖",
		verbar: "|",
		Vert: "‖",
		vert: "|",
		VerticalBar: "∣",
		VerticalLine: "|",
		VerticalSeparator: "❘",
		VerticalTilde: "≀",
		VeryThinSpace: " ",
		Vfr: "𝔙",
		vfr: "𝔳",
		vltri: "⊲",
		vnsub: "⊂⃒",
		vnsup: "⊃⃒",
		Vopf: "𝕍",
		vopf: "𝕧",
		vprop: "∝",
		vrtri: "⊳",
		Vscr: "𝒱",
		vscr: "𝓋",
		vsubnE: "⫋︀",
		vsubne: "⊊︀",
		vsupnE: "⫌︀",
		vsupne: "⊋︀",
		Vvdash: "⊪",
		vzigzag: "⦚",
		Wcirc: "Ŵ",
		wcirc: "ŵ",
		wedbar: "⩟",
		Wedge: "⋀",
		wedge: "∧",
		wedgeq: "≙",
		weierp: "℘",
		Wfr: "𝔚",
		wfr: "𝔴",
		Wopf: "𝕎",
		wopf: "𝕨",
		wp: "℘",
		wr: "≀",
		wreath: "≀",
		Wscr: "𝒲",
		wscr: "𝓌",
		xcap: "⋂",
		xcirc: "◯",
		xcup: "⋃",
		xdtri: "▽",
		Xfr: "𝔛",
		xfr: "𝔵",
		xhArr: "⟺",
		xharr: "⟷",
		Xi: "Ξ",
		xi: "ξ",
		xlArr: "⟸",
		xlarr: "⟵",
		xmap: "⟼",
		xnis: "⋻",
		xodot: "⨀",
		Xopf: "𝕏",
		xopf: "𝕩",
		xoplus: "⨁",
		xotime: "⨂",
		xrArr: "⟹",
		xrarr: "⟶",
		Xscr: "𝒳",
		xscr: "𝓍",
		xsqcup: "⨆",
		xuplus: "⨄",
		xutri: "△",
		xvee: "⋁",
		xwedge: "⋀",
		Yacute: "Ý",
		yacute: "ý",
		YAcy: "Я",
		yacy: "я",
		Ycirc: "Ŷ",
		ycirc: "ŷ",
		Ycy: "Ы",
		ycy: "ы",
		yen: "¥",
		Yfr: "𝔜",
		yfr: "𝔶",
		YIcy: "Ї",
		yicy: "ї",
		Yopf: "𝕐",
		yopf: "𝕪",
		Yscr: "𝒴",
		yscr: "𝓎",
		YUcy: "Ю",
		yucy: "ю",
		Yuml: "Ÿ",
		yuml: "ÿ",
		Zacute: "Ź",
		zacute: "ź",
		Zcaron: "Ž",
		zcaron: "ž",
		Zcy: "З",
		zcy: "з",
		Zdot: "Ż",
		zdot: "ż",
		zeetrf: "ℨ",
		ZeroWidthSpace: "​",
		Zeta: "Ζ",
		zeta: "ζ",
		Zfr: "ℨ",
		zfr: "𝔷",
		ZHcy: "Ж",
		zhcy: "ж",
		zigrarr: "⇝",
		Zopf: "ℤ",
		zopf: "𝕫",
		Zscr: "𝒵",
		zscr: "𝓏",
		zwj: "‍",
		zwnj: "‌"
	}), e.entityMap = e.HTML_ENTITIES;
})), qe = /* @__PURE__ */ s(((e) => {
	var t = He(), n = We(), r = Ue(), i = t.isHTMLEscapableRawTextElement, a = t.isHTMLMimeType, o = t.isHTMLRawTextElement, s = t.hasOwn, c = t.NAMESPACE, l = r.ParseError, u = r.DOMException, d = 0, f = 1, p = 2, m = 3, h = 4, g = 5, _ = 6, v = 7;
	function y() {}
	y.prototype = { parse: function(e, t, n) {
		var r = this.domBuilder;
		r.startDocument(), E(t, t = Object.create(null)), x(e, t, n, r, this.errorHandler), r.endDocument();
	} };
	var b = /&#?\w+;?/g;
	function x(e, r, i, o, c) {
		var d = a(o.mimeType);
		e.indexOf(n.UNICODE_REPLACEMENT_CHARACTER) >= 0 && c.warning("Unicode replacement character detected, source encoding issues?");
		function f(e) {
			if (e > 65535) {
				e -= 65536;
				var t = 55296 + (e >> 10), n = 56320 + (e & 1023);
				return String.fromCharCode(t, n);
			}
			return String.fromCharCode(e);
		}
		function p(e) {
			var t = e[e.length - 1] === ";" ? e : e + ";";
			if (!d && t !== e) return c.error("EntityRef: expecting ;"), e;
			var r = n.Reference.exec(t);
			if (!r || r[0].length !== t.length) return c.error("entity not matching Reference production: " + e), e;
			var a = t.slice(1, -1);
			return s(i, a) ? i[a] : a.charAt(0) === "#" ? f(parseInt(a.substring(1).replace("x", "0x"))) : (c.error("entity not found:" + e), e);
		}
		function m(t) {
			if (t > D) {
				var n = e.substring(D, t).replace(b, p);
				v && y(D), o.characters(n, 0, t - D), D = t;
			}
		}
		var h = 0, g = 0, _ = /\r\n?|\n|$/g, v = o.locator;
		function y(t, n) {
			for (; t >= g && (n = _.exec(e));) h = g, g = n.index + n[0].length, v.lineNumber++;
			v.columnNumber = t - h + 1;
		}
		for (var x = [{ currentNSMap: r }], E = [], D = 0;;) {
			try {
				var O = e.indexOf("<", D);
				if (O < 0) {
					if (!d && E.length > 0) return c.fatalError("unclosed xml tag(s): " + E.join(", "));
					if (!e.substring(D).match(/^\s*$/)) {
						var A = o.doc, ne = A.createTextNode(e.substring(D));
						if (A.documentElement) return c.error("Extra content at the end of the document");
						A.appendChild(ne), o.currentElement = ne;
					}
					return;
				}
				if (O > D) {
					var re = e.substring(D, O);
					!d && E.length === 0 && (re = re.replace(new RegExp(n.S_OPT.source, "g"), ""), re && c.error("Unexpected content outside root element: '" + re + "'")), m(O);
				}
				switch (e.charAt(O + 1)) {
					case "/":
						var ie = e.indexOf(">", O + 2), ae = e.substring(O + 2, ie > 0 ? ie : void 0);
						if (!ae) return c.fatalError("end tag name missing");
						var j = n.reg("^", n.QName_group, n.S_OPT, "$"), M = ie > 0 && j.exec(ae);
						if (!M) {
							var N = ie > 0 && n.reg("^", n.QName_group).exec(ae);
							if (d && N) c.warning("end tag name contains invalid trailing characters: \"" + ae + "\""), M = N;
							else if (N && new RegExp(j.source, j.flags + "m").test(ae)) c.error("end tag name is followed by a line break and trailing content: \"" + ae + "\""), M = N;
							else return c.fatalError("end tag name contains invalid characters: \"" + ae + "\"");
						}
						if (!o.currentElement && !o.doc.documentElement) return;
						var oe = E[E.length - 1] || o.currentElement.tagName || o.doc.documentElement.tagName || "";
						if (oe !== M[1]) {
							var P = M[1].toLowerCase();
							if (!d || oe.toLowerCase() !== P) return c.fatalError("Opening and ending tag mismatch: \"" + oe + "\" != \"" + ae + "\"");
						}
						var F = x.pop();
						E.pop();
						var I = F.localNSMap;
						if (o.endElement(F.uri, F.localName, oe), I) for (var se in I) s(I, se) && o.endPrefixMapping(se);
						ie++;
						break;
					case "?":
						v && y(O), ie = te(e, O, o, c);
						break;
					case "!":
						v && y(O), ie = ee(e, O, o, c, d);
						break;
					default:
						v && y(O);
						var ce = new k(), le = x[x.length - 1].currentNSMap, ie = C(e, O, ce, le, p, c, d), ue = ce.length;
						if (ce.closed || (d && t.isHTMLVoidElement(ce.tagName) ? ce.closed = !0 : E.push(ce.tagName)), v && ue) {
							for (var de = S(v, {}), fe = 0; fe < ue; fe++) {
								var pe = ce[fe];
								y(pe.offset), pe.locator = S(v, {});
							}
							o.locator = de, w(ce, o, le) && x.push(ce), o.locator = v;
						} else w(ce, o, le) && x.push(ce);
						d && !ce.closed ? ie = T(e, ie, ce.tagName, p, o) : ie++;
				}
			} catch (e) {
				if (e instanceof l) throw e;
				if (e instanceof u) return c.fatalError("Error constructing the DOM: " + e.name + ": " + e.message, e);
				c.error("element parse error: " + e), ie = -1;
			}
			ie > D ? D = ie : m(Math.max(O, D) + 1);
		}
	}
	function S(e, t) {
		return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
	}
	function C(e, t, n, r, i, a, o) {
		function c(e, t, r) {
			if (s(n.attributeNames, e)) return a.fatalError("Attribute " + e + " redefined");
			if (!o && t.indexOf("<") >= 0) return a.fatalError("Unescaped '<' not allowed in attributes values");
			n.addValue(e, t.replace(/[\t\n\r]/g, " ").replace(b, i), r);
		}
		for (var l, u, y = ++t, x = d;;) {
			var S = e.charAt(y);
			if (x === d && S === "<") throw Error("unexpected < in tag name: " + e.slice(t, y));
			switch (S) {
				case "=":
					if (x === f) l = e.slice(t, y), x = m;
					else if (x === p) x = m;
					else throw Error("attribute equal must after attrName");
					break;
				case "'":
				case "\"":
					if (x === m || x === f) {
						if (x === f && (a.warning("attribute value must after \"=\""), l = e.slice(t, y)), t = y + 1, y = e.indexOf(S, t), y > 0) u = e.slice(t, y), c(l, u, t - 1), x = g;
						else throw Error("attribute value no end '" + S + "' match");
					} else if (x == h) u = e.slice(t, y), c(l, u, t), a.warning("attribute \"" + l + "\" missed start quot(" + S + ")!!"), t = y + 1, x = g;
					else throw Error("attribute value must after \"=\"");
					break;
				case "/":
					switch (x) {
						case d: n.setTagName(e.slice(t, y));
						case g:
						case _:
						case v: x = v, n.closed = !0;
						case h:
						case f: break;
						case p:
							n.closed = !0;
							break;
						default: throw Error("attribute invalid close char('/')");
					}
					break;
				case "": return a.error("unexpected end of input"), x == d && n.setTagName(e.slice(t, y)), y;
				case ">":
					switch (x) {
						case d: n.setTagName(e.slice(t, y));
						case g:
						case _:
						case v: break;
						case h:
						case f: u = e.slice(t, y), u.slice(-1) === "/" && (n.closed = !0, u = u.slice(0, -1));
						case p:
							x === p && (u = l), x == h ? (a.warning("attribute \"" + u + "\" missed quot(\")!"), c(l, u, t)) : (o || a.warning("attribute \"" + u + "\" missed value!! \"" + u + "\" instead!!"), c(u, u, t));
							break;
						case m: if (!o) return a.fatalError("AttValue: ' or \" expected");
					}
					return y;
				case "": S = " ";
				default: if (S <= " ") switch (x) {
					case d:
						n.setTagName(e.slice(t, y)), x = _;
						break;
					case f:
						l = e.slice(t, y), x = p;
						break;
					case h:
						var u = e.slice(t, y);
						a.warning("attribute \"" + u + "\" missed quot(\")!!"), c(l, u, t);
					case g: x = _;
				}
				else switch (x) {
					case p:
						o || a.warning("attribute \"" + l + "\" missed value!! \"" + l + "\" instead2!!"), c(l, l, t), t = y, x = f;
						break;
					case g: a.warning("attribute space is required\"" + l + "\"!!");
					case _:
						x = f, t = y;
						break;
					case m:
						x = h, t = y;
						break;
					case v: throw Error("elements closed character '/' and '>' must be connected to");
				}
			}
			y++;
		}
	}
	function w(e, t, n) {
		for (var r = e.tagName, i = null, a = e.length; a--;) {
			var o = e[a], l = o.qName, u = o.value, d = l.indexOf(":");
			if (d > 0) var f = o.prefix = l.slice(0, d), p = l.slice(d + 1), m = f === "xmlns" && p;
			else p = l, f = null, m = l === "xmlns" && "";
			o.localName = p, m !== !1 && (i ?? (i = Object.create(null), n = Object.create(n)), n[m] = i[m] = u, o.uri = c.XMLNS, t.startPrefixMapping(m, u));
		}
		for (var a = e.length; a--;) o = e[a], o.prefix && (o.prefix === "xml" && (o.uri = c.XML), o.prefix !== "xmlns" && (o.uri = n[o.prefix]));
		var d = r.indexOf(":");
		d > 0 ? (f = e.prefix = r.slice(0, d), p = e.localName = r.slice(d + 1)) : (f = null, p = e.localName = r);
		var h = e.uri = n[f || ""];
		if (t.startElement(h, p, r, e), e.closed) {
			if (t.endElement(h, p, r), i) for (f in i) s(i, f) && t.endPrefixMapping(f);
		} else return e.currentNSMap = n, e.localNSMap = i, !0;
	}
	function T(e, t, n, r, a) {
		var s = i(n);
		if (s || o(n)) {
			var c = RegExp("</" + n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ">", "ig");
			c.lastIndex = t;
			var l = c.exec(e), u = l ? l.index : -1;
			if (u < 0) return t + 1;
			var d = e.substring(t + 1, u);
			return s && (d = d.replace(b, r)), a.characters(d, 0, d.length), u;
		}
		return t + 1;
	}
	function E(e, t) {
		for (var n in e) s(e, n) && (t[n] = e[n]);
	}
	function D(e, t) {
		var r = t;
		function i(t) {
			return t ||= 0, e.charAt(r + t);
		}
		function a(e) {
			e ||= 1, r += e;
		}
		function o() {
			for (var t = 0; r < e.length;) {
				var n = i();
				if (n !== " " && n !== "\n" && n !== "	" && n !== "\r") return t;
				t++, a();
			}
			return -1;
		}
		function s() {
			return e.substring(r);
		}
		function c(t) {
			return e.substring(r, r + t.length) === t;
		}
		function l(t) {
			return e.substring(r, r + t.length).toUpperCase() === t.toUpperCase();
		}
		function u(e) {
			var t = n.reg("^", e).exec(s());
			return t ? (a(t[0].length), t[0]) : null;
		}
		return {
			char: i,
			getIndex: function() {
				return r;
			},
			getMatch: u,
			getSource: function() {
				return e;
			},
			skip: a,
			skipBlanks: o,
			substringFromIndex: s,
			substringStartsWith: c,
			substringStartsWithCaseInsensitive: l
		};
	}
	function O(e, t) {
		function r(e, t) {
			var r = n.PI.exec(e.substringFromIndex());
			return r ? r[1].toLowerCase() === "xml" ? t.fatalError("xml declaration is only allowed at the start of the document, but found at position " + e.getIndex()) : (e.skip(r[0].length), r[0]) : t.fatalError("processing instruction is not well-formed at position " + e.getIndex());
		}
		var i = e.getSource();
		if (e.char() === "[") {
			e.skip(1);
			for (var a = e.getIndex(); e.getIndex() < i.length;) {
				if (e.skipBlanks(), e.char() === "]") {
					var o = i.substring(a, e.getIndex());
					return e.skip(1), o;
				}
				var s = null;
				if (e.char() === "<" && e.char(1) === "!") switch (e.char(2)) {
					case "E":
						e.char(3) === "L" ? s = e.getMatch(n.elementdecl) : e.char(3) === "N" && (s = e.getMatch(n.EntityDecl));
						break;
					case "A":
						s = e.getMatch(n.AttlistDecl);
						break;
					case "N":
						s = e.getMatch(n.NotationDecl);
						break;
					case "-": s = e.getMatch(n.Comment);
				}
				else if (e.char() === "<" && e.char(1) === "?") s = r(e, t);
				else if (e.char() === "%") s = e.getMatch(n.PEReference);
				else return t.fatalError("Error detected in Markup declaration");
				if (!s) return t.fatalError("Error in internal subset at position " + e.getIndex());
			}
			return t.fatalError("doctype internal subset is not well-formed, missing ]");
		}
	}
	function ee(e, t, r, i, a) {
		var o = D(e, t);
		switch (a ? o.char(2).toUpperCase() : o.char(2)) {
			case "-":
				var s = o.getMatch(n.Comment);
				return s ? (r.comment(s, n.COMMENT_START.length, s.length - n.COMMENT_START.length - n.COMMENT_END.length), o.getIndex()) : i.fatalError("comment is not well-formed at position " + o.getIndex());
			case "[":
				var c = o.getMatch(n.CDSect);
				return c ? !a && !r.currentElement ? i.fatalError("CDATA outside of element") : (r.startCDATA(), r.characters(c, n.CDATA_START.length, c.length - n.CDATA_START.length - n.CDATA_END.length), r.endCDATA(), o.getIndex()) : i.fatalError("Invalid CDATA starting at position " + t);
			case "D":
				if (r.doc && r.doc.documentElement) return i.fatalError("Doctype not allowed inside or after documentElement at position " + o.getIndex());
				if (a ? !o.substringStartsWithCaseInsensitive(n.DOCTYPE_DECL_START) : !o.substringStartsWith(n.DOCTYPE_DECL_START)) return i.fatalError("Expected " + n.DOCTYPE_DECL_START + " at position " + o.getIndex());
				if (o.skip(n.DOCTYPE_DECL_START.length), o.skipBlanks() < 1) return i.fatalError("Expected whitespace after " + n.DOCTYPE_DECL_START + " at position " + o.getIndex());
				var l = {
					name: void 0,
					publicId: void 0,
					systemId: void 0,
					internalSubset: void 0
				};
				if (l.name = o.getMatch(n.Name), !l.name) return i.fatalError("doctype name missing or contains unexpected characters at position " + o.getIndex());
				if (a && l.name.toLowerCase() !== "html" && i.warning("Unexpected DOCTYPE in HTML document at position " + o.getIndex()), o.skipBlanks(), o.substringStartsWith(n.PUBLIC) || o.substringStartsWith(n.SYSTEM)) {
					var u = n.ExternalID_match.exec(o.substringFromIndex());
					if (!u) return i.fatalError("doctype external id is not well-formed at position " + o.getIndex());
					u.groups.SystemLiteralOnly === void 0 ? (l.systemId = u.groups.SystemLiteral, l.publicId = u.groups.PubidLiteral) : l.systemId = u.groups.SystemLiteralOnly, o.skip(u[0].length);
				} else if (a && o.substringStartsWithCaseInsensitive(n.SYSTEM)) {
					if (o.skip(n.SYSTEM.length), o.skipBlanks() < 1) return i.fatalError("Expected whitespace after " + n.SYSTEM + " at position " + o.getIndex());
					if (l.systemId = o.getMatch(n.ABOUT_LEGACY_COMPAT_SystemLiteral), !l.systemId) return i.fatalError("Expected " + n.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + n.SYSTEM + " at position " + o.getIndex());
				}
				return a && l.systemId && !n.ABOUT_LEGACY_COMPAT_SystemLiteral.test(l.systemId) && i.warning("Unexpected doctype.systemId in HTML document at position " + o.getIndex()), a || (o.skipBlanks(), l.internalSubset = O(o, i)), o.skipBlanks(), o.char() === ">" ? (o.skip(1), r.startDTD(l.name, l.publicId, l.systemId, l.internalSubset), r.endDTD(), o.getIndex()) : i.fatalError("doctype not terminated with > at position " + o.getIndex());
			default: return i.fatalError("Not well-formed XML starting with \"<!\" at position " + t);
		}
	}
	function te(e, t, r, i) {
		var a = e.substring(t).match(n.PI);
		if (!a) return i.fatalError("Invalid processing instruction starting at position " + t);
		if (a[1].toLowerCase() === "xml") {
			if (t > 0) return i.fatalError("processing instruction at position " + t + " is an xml declaration which is only at the start of the document");
			if (!n.XMLDecl.test(e.substring(t))) return i.fatalError("xml declaration is not well-formed");
		}
		return r.processingInstruction(a[1], a[2]), t + a[0].length;
	}
	function k() {
		this.attributeNames = Object.create(null);
	}
	k.prototype = {
		setTagName: function(e) {
			if (!n.QName_exact.test(e)) throw Error("invalid tagName:" + e);
			this.tagName = e;
		},
		addValue: function(e, t, r) {
			if (!n.QName_exact.test(e)) throw Error("invalid attribute:" + e);
			this.attributeNames[e] = this.length, this[this.length++] = {
				qName: e,
				value: t,
				offset: r
			};
		},
		length: 0,
		getLocalName: function(e) {
			return this[e].localName;
		},
		getLocator: function(e) {
			return this[e].locator;
		},
		getQName: function(e) {
			return this[e].qName;
		},
		getURI: function(e) {
			return this[e].uri;
		},
		getValue: function(e) {
			return this[e].value;
		}
	}, e.XMLReader = y, e.parseUtils = D, e.parseDoctypeCommentOrCData = ee;
})), Je = /* @__PURE__ */ s(((e) => {
	var t = He(), n = Ge(), r = Ue(), i = Ke(), a = qe(), o = n.DOMImplementation, s = t.hasDefaultHTMLNamespace, c = t.isHTMLMimeType, l = t.isValidMimeType, u = t.MIME_TYPE, d = t.NAMESPACE, f = r.ParseError, p = a.XMLReader;
	function m(e) {
		return e.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028\u2029]/g, "\n");
	}
	function h(e) {
		if (e ||= {}, e.locator === void 0 && (e.locator = !0), this.assign = e.assign || t.assign, this.domHandler = e.domHandler || g, this.onError = e.onError || e.errorHandler, e.errorHandler && typeof e.errorHandler != "function") throw TypeError("errorHandler object is no longer supported, switch to onError!");
		e.errorHandler && e.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this), this.normalizeLineEndings = e.normalizeLineEndings || m, this.locator = !!e.locator, this.xmlns = this.assign(Object.create(null), e.xmlns);
	}
	h.prototype.parseFromString = function(e, n) {
		if (!l(n)) throw TypeError("DOMParser.parseFromString: the provided mimeType \"" + n + "\" is not valid.");
		var r = this.assign(Object.create(null), this.xmlns), a = i.XML_ENTITIES, o = r[""] || null;
		s(n) ? (a = i.HTML_ENTITIES, o = d.HTML) : n === u.XML_SVG_IMAGE && (o = d.SVG), r[""] = o, r.xml = r.xml || d.XML;
		var c = new this.domHandler({
			mimeType: n,
			defaultNamespace: o,
			onError: this.onError
		}), f = this.locator ? {} : void 0;
		this.locator && c.setDocumentLocator(f);
		var m = new p();
		return m.errorHandler = c, m.domBuilder = c, !t.isHTMLMimeType(n) && typeof e != "string" && m.errorHandler.fatalError("source is not a string"), m.parse(this.normalizeLineEndings(String(e)), r, a), c.doc.documentElement || m.errorHandler.fatalError("missing root element"), c.doc;
	};
	function g(e) {
		var t = e || {};
		this.mimeType = t.mimeType || u.XML_APPLICATION, this.defaultNamespace = t.defaultNamespace || null, this.cdata = !1, this.currentElement = void 0, this.doc = void 0, this.locator = void 0, this.onError = t.onError;
	}
	function _(e, t) {
		t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber;
	}
	g.prototype = {
		startDocument: function() {
			var e = new o();
			this.doc = c(this.mimeType) ? e.createHTMLDocument(!1) : e.createDocument(this.defaultNamespace, "");
		},
		startElement: function(e, t, n, r) {
			var i = this.doc, a = i.createElementNS(e, n || t), o = r.length;
			b(this, a), this.currentElement = a, this.locator && _(this.locator, a);
			for (var s = 0; s < o; s++) {
				var e = r.getURI(s), c = r.getValue(s), n = r.getQName(s), l = i.createAttributeNS(e, n);
				this.locator && _(r.getLocator(s), l), l.value = l.nodeValue = c, a.setAttributeNode(l);
			}
		},
		endElement: function(e, t, n) {
			this.currentElement = this.currentElement.parentNode;
		},
		startPrefixMapping: function(e, t) {},
		endPrefixMapping: function(e) {},
		processingInstruction: function(e, t) {
			var n = this.doc.createProcessingInstruction(e, t);
			this.locator && _(this.locator, n), b(this, n);
		},
		ignorableWhitespace: function(e, t, n) {},
		characters: function(e, t, n) {
			if (e = y.apply(this, arguments), e) {
				if (this.cdata) var r = this.doc.createCDATASection(e);
				else var r = this.doc.createTextNode(e);
				this.currentElement ? this.currentElement.appendChild(r) : /^\s*$/.test(e) && this.doc.appendChild(r), this.locator && _(this.locator, r);
			}
		},
		skippedEntity: function(e) {},
		endDocument: function() {
			this.doc.normalize();
		},
		setDocumentLocator: function(e) {
			e && (e.lineNumber = 0), this.locator = e;
		},
		comment: function(e, t, n) {
			e = y.apply(this, arguments);
			var r = this.doc.createComment(e);
			this.locator && _(this.locator, r), b(this, r);
		},
		startCDATA: function() {
			this.cdata = !0;
		},
		endCDATA: function() {
			this.cdata = !1;
		},
		startDTD: function(e, t, n, r) {
			var i = this.doc.implementation;
			if (i && i.createDocumentType) {
				var a = i.createDocumentType(e, t, n, r);
				this.locator && _(this.locator, a), b(this, a), this.doc.doctype = a;
			}
		},
		reportError: function(e, t) {
			if (typeof this.onError == "function") try {
				this.onError(e, t, this);
			} catch (n) {
				throw new f("Reporting " + e + " \"" + t + "\" caused " + n, this.locator);
			}
			else console.error("[xmldom " + e + "]	" + t, v(this.locator));
		},
		warning: function(e) {
			this.reportError("warning", e);
		},
		error: function(e) {
			this.reportError("error", e);
		},
		fatalError: function(e, t) {
			throw this.reportError("fatalError", e), new f(e, this.locator, t);
		}
	};
	function v(e) {
		if (e) return "\n@#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]";
	}
	function y(e, t, n) {
		return typeof e == "string" ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e, t, n) + "" : e;
	}
	"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(e) {
		g.prototype[e] = function() {
			return null;
		};
	});
	function b(e, t) {
		e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
	}
	function x(e) {
		if (e === "error") throw "onErrorStopParsing";
	}
	function S() {
		throw "onWarningStopParsing";
	}
	e.__DOMHandler = g, e.DOMParser = h, e.normalizeLineEndings = m, e.onErrorStopParsing = x, e.onWarningStopParsing = S;
})), Ye = /* @__PURE__ */ s(((e) => {
	var t = He();
	e.assign = t.assign, e.hasDefaultHTMLNamespace = t.hasDefaultHTMLNamespace, e.isHTMLMimeType = t.isHTMLMimeType, e.isValidMimeType = t.isValidMimeType, e.MIME_TYPE = t.MIME_TYPE, e.NAMESPACE = t.NAMESPACE;
	var n = Ue();
	e.DOMException = n.DOMException, e.DOMExceptionName = n.DOMExceptionName, e.ExceptionCode = n.ExceptionCode, e.ParseError = n.ParseError;
	var r = Ge();
	e.Attr = r.Attr, e.CDATASection = r.CDATASection, e.CharacterData = r.CharacterData, e.Comment = r.Comment, e.Document = r.Document, e.DocumentFragment = r.DocumentFragment, e.DocumentType = r.DocumentType, e.DOMImplementation = r.DOMImplementation, e.Element = r.Element, e.Entity = r.Entity, e.EntityReference = r.EntityReference, e.LiveNodeList = r.LiveNodeList, e.NamedNodeMap = r.NamedNodeMap, e.Node = r.Node, e.NodeList = r.NodeList, e.Notation = r.Notation, e.ProcessingInstruction = r.ProcessingInstruction, e.Text = r.Text, e.XMLSerializer = r.XMLSerializer;
	var i = Je();
	e.DOMParser = i.DOMParser, e.normalizeLineEndings = i.normalizeLineEndings, e.onErrorStopParsing = i.onErrorStopParsing, e.onWarningStopParsing = i.onWarningStopParsing;
})), Xe = /* @__PURE__ */ u(Ve()), Ze = /* @__PURE__ */ c({
	DOMParserFactory: () => rt,
	RDFArrayRemove: () => dt,
	callbackify: () => nt,
	domToString: () => it,
	dtstamp: () => ot,
	dumpNode: () => at,
	heavyCompare: () => st,
	heavyCompareSPO: () => ct,
	linkRelationProperty: () => tt,
	log: () => z,
	mediaTypeClass: () => et,
	output: () => lt,
	parseXML: () => ut,
	stackString: () => mt,
	string: () => $e,
	string_startswith: () => ft,
	uri: () => Oe
}), Qe = Ye(), $e = { template: pt };
function et(e) {
	return e = e.split(";")[0].trim(), new R("http://www.w3.org/ns/iana/media-types/" + e + "#Resource");
}
function tt(e) {
	return new R("http://www.w3.org/ns/iana/link-relations/relation#" + e.trim());
}
function nt(e, t) {
	e.callbacks = {};
	for (var n = t.length - 1; n >= 0; n--) e.callbacks[t[n]] = [];
	e.addHook = function(t) {
		e.callbacks[t] || (e.callbacks[t] = []);
	}, e.addCallback = function(t, n) {
		e.callbacks[t].push(n);
	}, e.removeCallback = function(t, n) {
		for (var r = 0; r < e.callbacks[t].length; r++) if (e.callbacks[t][r].name === n) return e.callbacks[t].splice(r, 1), !0;
		return !1;
	}, e.insertCallback = function(t, n) {
		e.callbacks[t].unshift(n);
	}, e.fireCallbacks = function(t, n) {
		var r = [], i = [], a = e.callbacks[t].length, o;
		let s;
		for (o = a - 1; o >= 0; o--) s = e.callbacks[t][o], s && s.apply(e, n) && r.push(s);
		for (o = r.length - 1; o >= 0; o--) i.push(r[o]);
		for (o = a; o < e.callbacks[t].length; o++) i.push(e.callbacks[t][o]);
		e.callbacks[t] = i;
	};
}
function rt() {
	return window.DOMParser ? new Qe.DOMParser() : window.ActiveXObject ? new ActiveXObject("Microsoft.XMLDOM") : !1;
}
function it(e, t) {
	t ||= {};
	var n = [];
	t && t.selfClosing && t.selfClosing.split(" ").forEach(function(e) {
		n[e] = !0;
	});
	var r = [];
	return t && t.skipAttributes && t.skipAttributes.split(" ").forEach(function(e) {
		r[e] = !0;
	}), at(e, t, n, r);
}
function at(e, t, n, r) {
	var i, a = "", o = [!1];
	if (e.nodeType === void 0) return a;
	if (e.nodeType === 1) {
		if (e.hasAttribute("class") && t && t.classWithChildText && e.matches(t.classWithChildText.class)) a += e.querySelector(t.classWithChildText.element).textContent;
		else if (!(t && t.skipNodeWithClass && e.matches("." + t.skipNodeWithClass))) {
			var s = e.nodeName.toLowerCase();
			a += "<" + s;
			var c = [];
			for (i = e.attributes.length - 1; i >= 0; i--) {
				var l = e.attributes[i];
				if (!(r && r.length > 0 && r[l.name]) && !/^\d+$/.test(l.name)) {
					if (l.name === "class" && t && t.replaceClassItemWith && l.value.split(" ").indexOf(t.replaceClassItemWith.source) > -1) {
						var u = new RegExp(t.replaceClassItemWith.source, "g");
						l.value = l.value.replace(u, t.replaceClassItemWith.target).trim();
					}
					l.name === "class" && t && t.skipClassWithValue && t.skipClassWithValue === l.value || c.push(l.name + "='" + l.value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&quot;") + "'");
				}
			}
			if (c.length > 0 && (t && t.sortAttributes && c.sort(function(e, t) {
				return e.toLowerCase().localeCompare(t.toLowerCase());
			}), a += " " + c.join(" ")), n && n.ename) a += " />";
			else {
				for (a += ">", a += s === "html" ? "\n  " : "", o.push(s === "style" || s === "script"), i = 0; i < e.childNodes.length; i++) a += at(e.childNodes[i]);
				o.pop(), a += s === "body" ? "</" + s + ">\n" : "</" + s + ">";
			}
		}
	} else if (e.nodeType === 8) a += "<!--" + e.nodeValue + "-->";
	else if (e.nodeType === 3 || e.nodeType === 4) {
		var d = e.nodeValue.replace(/\n+$/, "");
		a += o[o.length - 1] ? d : d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	} else console.log("Warning; Cannot handle serialising nodes of type: " + e.nodeType), console.log(e);
	return a;
}
function ot() {
	var e = /* @__PURE__ */ new Date(), t = e.getYear() + 1900, n = e.getMonth() + 1, r = e.getDate(), i = e.getUTCHours(), a = e.getUTCMinutes(), o = e.getSeconds();
	return n < 10 && (n = "0" + n), r < 10 && (r = "0" + r), i < 10 && (i = "0" + i), a < 10 && (a = "0" + a), o < 10 && (o = "0" + o), t + "-" + n + "-" + r + "T" + i + ":" + a + ":" + o + "Z";
}
function st(e, t, n, r) {
	var i = function(e) {
		return e.termType === "BlankNode" ? null : e;
	}, a = function(e) {
		var t = n.statementsMatching(e).map(function(e) {
			return "" + i(e.subject) + " " + i(e.predicate) + " " + i(e.object);
		}).concat(n.statementsMatching(void 0, void 0, e).map(function(e) {
			return "" + i(e.subject) + " " + i(e.predicate) + " " + i(e.object);
		}));
		return t.sort(), t.join("\n");
	};
	let o = Object.prototype.hasOwnProperty.call(n, "compareTerms") ? n.compareTerms(e, t) : e.compareTerm(t);
	return e.termType === "BlankNode" && t.termType === "BlankNode" ? o === 0 ? 0 : a(e) > a(t) ? 1 : a(e) < a(t) ? -1 : o : r && e.uri && t.uri ? (r[e.uri] || e.uri).localeCompare(r[t.uri] || t.uri) : o;
}
function ct(e, t, n, r) {
	return st(e.subject, t.subject, n, r) || st(e.predicate, t.predicate, n, r) || st(e.object, t.object, n, r);
}
function lt(e) {
	var t = document.createElement("div");
	t.textContent = e, document.body.appendChild(t);
}
function ut(e, t) {
	var n;
	return t ||= {}, typeof module < "u" && module && module.exports ? new Qe.DOMParser().parseFromString(e, t.contentType || "application/xhtml+xml") : (n = typeof window < "u" && window.DOMParser ? new window.DOMParser() : new Qe.DOMParser(), n.parseFromString(e, "application/xml"));
}
function dt(e, t) {
	for (var n = 0; n < e.length; n++) if (e[n].subject.equals(t.subject) && e[n].predicate.equals(t.predicate) && e[n].object.equals(t.object) && e[n].why.equals(t.why)) {
		e.splice(n, 1);
		return;
	}
	throw Error("RDFArrayRemove: Array did not contain " + t + " " + t.why);
}
function ft(e, t) {
	return e.slice(0, t.length) === t;
}
function pt(e, t) {
	for (var n = e.split("%s"), r = "", i = 0; i < t.length; i++) t[i] += "", r += n[i] + t[i];
	return r + n.slice(t.length).join();
}
function mt(e) {
	var t = "" + e + "\n";
	if (!e.stack) return t + "No stack available.\n";
	for (var n = e.stack.toString().split("\n"), r = [], i = 0; i < n.length; i++) {
		var a = n[i];
		if (a.indexOf("ecmaunit.js") > -1) break;
		a.charAt(0) == "(" && (a = "function" + a);
		var o = a.split("@");
		r.push(o);
	}
	for (var i = 0; i < r.length; i++) t += "  " + r[i][1] + "\n    " + r[i][0];
	return t;
}
// node_modules/rdflib/esm/xsd.js
function ht(e = ze) {
	return {
		boolean: e.namedNode("http://www.w3.org/2001/XMLSchema#boolean"),
		dateTime: e.namedNode("http://www.w3.org/2001/XMLSchema#dateTime"),
		decimal: e.namedNode("http://www.w3.org/2001/XMLSchema#decimal"),
		double: e.namedNode("http://www.w3.org/2001/XMLSchema#double"),
		integer: e.namedNode("http://www.w3.org/2001/XMLSchema#integer"),
		langString: e.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#langString"),
		string: e.namedNode("http://www.w3.org/2001/XMLSchema#string")
	};
}
ht(ze);
// node_modules/rdflib/esm/serializer.js
function gt(e) {
	return new _t(e);
}
var _t = class e {
	constructor(e) {
		g(this, "_notQNameChars", "	\r\n !\"#$%&'()*,+/;<=>?@[\\]^`{|}~"), g(this, "_notNameChars", this._notQNameChars + ":"), g(this, "validPrefix", /* @__PURE__ */ new RegExp(/^[a-zA-Z][a-zA-Z0-9]*$/)), g(this, "forbidden1", /* @__PURE__ */ new RegExp(/[\\"\b\f\r\v\t\n\u0080-\uffff]/gm)), g(this, "forbidden3", /* @__PURE__ */ new RegExp(/[\\"\b\f\r\v\u0080-\uffff]/gm)), this.flags = "", this.base = null, this.prefixes = [], this.namespaces = [];
		let t = Object.keys((0, f.default)());
		for (let e in t) {
			let n = (0, f.default)()[t[e]](""), r = t[e];
			this.prefixes[n] = r, this.namespaces[r] = n;
		}
		this.suggestPrefix("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#"), this.suggestPrefix("xml", "reserved:reservedForFutureUse"), this.namespacesUsed = [], this.keywords = ["a"], this.prefixchars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", this.incoming = null, this.formulas = [], this.store = e, this.rdfFactory = e.rdfFactory || ze, this.xsd = ht(this.rdfFactory);
	}
	setBase(e) {
		return this.base = e, this;
	}
	setFlags(e) {
		return this.flags = e || "", this;
	}
	toStr(e) {
		var t = e.toNT();
		return e.termType === "Graph" && (this.formulas[t] = e), t;
	}
	fromStr(e) {
		if (e[0] === "{") {
			var t = this.formulas[e];
			return t || console.log("No formula object for " + e), t;
		}
		return this.store.fromNT(e);
	}
	setNamespaces(e) {
		for (var t in e) this.setPrefix(t, e[t]);
		return this;
	}
	setPrefix(e, t) {
		if (e.slice(0, 7) !== "default" && e.slice(0, 2) !== "ns" && e && t) {
			for (let t in this.prefixes) this.prefixes[t] == e && delete this.prefixes[t];
			this.prefixes[t] = e, this.namespaces[e] = t;
		}
	}
	suggestPrefix(e, t) {
		e.slice(0, 7) !== "default" && e.slice(0, 2) !== "ns" && e && t && (e in this.namespaces || t in this.prefixes || (this.prefixes[t] = e, this.namespaces[e] = t));
	}
	suggestNamespaces(e) {
		for (var t in e) this.suggestPrefix(t, e[t]);
		return this;
	}
	checkIntegrity() {
		var e, t;
		for (e in this.namespaces) if (this.prefixes[this.namespaces[e]] !== e) throw Error("Serializer integity error 1: " + e + ", " + this.namespaces[e] + ", " + this.prefixes[this.namespaces[e]] + "!");
		for (t in this.prefixes) if (this.namespaces[this.prefixes[t]] !== t) throw Error("Serializer integity error 2: " + t + ", " + this.prefixs[t] + ", " + this.namespaces[this.prefixes[t]] + "!");
	}
	makeUpPrefix(e) {
		var t = e;
		function n(t) {
			return !this.validPrefix.test(t) || t === "ns" || t in this.namespaces ? !1 : (this.prefixes[e] = t, this.namespaces[t] = e, t);
		}
		var r = n.bind(this);
		"#/".indexOf(t[t.length - 1]) >= 0 && (t = t.slice(0, -1));
		var i = t.lastIndexOf("/");
		i >= 0 && (t = t.slice(i + 1));
		for (var a = 0; a < t.length && this.prefixchars.indexOf(t[a]) >= 0;) a++;
		if (t = t.slice(0, a), t.length < 6 && r(t)) return t;
		if (r(t.slice(0, 3))) return t.slice(0, 3);
		if (r(t.slice(0, 2))) return t.slice(0, 2);
		if (r(t.slice(0, 4))) return t.slice(0, 4);
		if (r(t.slice(0, 1))) return t.slice(0, 1);
		if (r(t.slice(0, 5))) return t.slice(0, 5);
		this.validPrefix.test(t) || (t = "n");
		for (var o = 0;; o++) if (r(t.slice(0, 3) + o)) return t.slice(0, 3) + o;
	}
	rootSubjects(e) {
		for (var t = {}, n = {}, r = {}, i = 0; i < e.length; i++) {
			var a = e[i], o = function(e) {
				t.hasOwnProperty(e) || (t[e] = []), t[e].push(a.subject);
			};
			[
				a.subject,
				a.predicate,
				a.object
			].map(function(e) {
				e.termType === "BlankNode" ? r[e.toNT()] = !0 : e.termType === "Collection" && e.elements.forEach(function(e) {
					o(e);
				});
			}), o(e[i].object);
			var s = n[this.toStr(a.subject)];
			s ||= [], s.push(a), n[this.toStr(a.subject)] = s;
		}
		var c = [];
		for (var l in n) if (n.hasOwnProperty(l)) {
			var u = this.fromStr(l);
			u.termType === "BlankNode" && t[u] && t[u].length === 1 || c.push(u);
		}
		this.incoming = t;
		for (var d = {}, f = 0; f < c.length; f++) d[c[f].toNT()] = !0;
		return {
			roots: c,
			subjects: n,
			rootsHash: d,
			incoming: t
		};
	}
	toN3(e) {
		return this.statementsToN3(e.statements);
	}
	isValidPNLocal(e) {
		if (e.length === 0) return !0;
		if (e[e.length - 1] === ".") return !1;
		for (var t = 0; t < e.length; t++) {
			var n = e[t];
			if (n !== "." && this._notNameChars.indexOf(n) >= 0) return !1;
		}
		return !0;
	}
	explicitURI(e) {
		return e = this.flags.indexOf("r") < 0 && this.base ? Fe(this.base, e) : this.flags.indexOf("u") >= 0 ? yt(e) : vt(decodeURI(e)), "<" + e + ">";
	}
	statementsToNTriples(e) {
		var t = e.slice();
		t.sort();
		for (var n = "", r = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", i = this, a = this.store, o = this.rdfFactory, s = function(e) {
			if (e.termType !== "Collection") return i.atomicTermToN3(e);
			for (var t = e.elements, c = a.sym(r + "nil"), l = t.length - 1; l >= 0; l--) {
				var u = o.blankNode();
				n += s(u) + " " + s(a.sym(r + "first")) + " " + s(t[l]) + ".\n", n += s(u) + " " + s(a.sym(r + "rest")) + " " + s(c) + ".\n", c = u;
			}
			return i.atomicTermToN3(c);
		}, c = 0; c < t.length; c++) {
			var l = t[c], u = "";
			u += s(l.subject) + " ", u += s(l.predicate) + " ", u += s(l.object) + " ", this.flags.indexOf("q") >= 0 && (u += s(l.why) + " "), u += ".\n", n += u;
		}
		return n;
	}
	statementsToN3(t) {
		var n = this.store, r = { "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": "aaa:00" };
		t.sort(function(e, t) {
			return ct(e, t, n, r);
		}), this.base && !this.defaultNamespace && (this.defaultNamespace = this.base + "#");
		var i = {};
		this.flags.indexOf("s") < 0 && (i["http://www.w3.org/2002/07/owl#sameAs"] = "="), this.flags.indexOf("t") < 0 && (i["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"] = "a"), this.flags.indexOf("i") < 0 && (i["http://www.w3.org/2000/10/swap/log#implies"] = "=>");
		var a = function(e) {
			for (var t = "", n = 0; n < e; n++) t += " ";
			return t;
		}, o = function(e) {
			for (var t = "", n = 0; n < e.length; n++) {
				var r = e[n], i = typeof r == "string" ? r : o(r);
				if (n !== 0) {
					var a = t.slice(-1) || " ";
					i === "," || i === ";" || i === "." && !"0123456789.:".includes(a) || (t += " ");
				}
				t += i;
			}
			return t;
		}, s = function(e, t) {
			var n = "", r = 1e5;
			t === void 0 && (t = -1);
			for (var i = 0; i < e.length; i++) {
				var c = e[i];
				if (typeof c != "string") {
					var l = s(c, t + 1);
					if (l.length < 10 * (80 - 4 * t) && l.indexOf("\"\"\"") < 0) {
						var u = o(c);
						u.length < 80 - 4 * t && (c = u, l = "");
					}
					l && (r = 1e4), n += l;
				}
				if (typeof c == "string") {
					if (c.length === 1 && n.slice(-1) === "\n" && ",.;".indexOf(c) >= 0) {
						n = n.slice(0, -1), c == "." && "0123456789.:".includes(n.charAt(n.length - 1)) && (n += " ", r += 1), n += c + "\n", r += 1;
						continue;
					}
					if (r < 4 * t + 4 || r + c.length + 1 < 80 && ";.".indexOf(n[n.length - 2]) < 0) n = n.slice(0, -1) + " " + c + "\n", r += c.length + 1;
					else {
						let e = a(4 * t) + c;
						n += e + "\n", r = e.length, t < 0 && (n += "\n", r = 1e5);
					}
				}
			}
			return n;
		};
		function c(e) {
			for (var t = this.rootSubjects(e), n = t.roots, r = [], i = 0; i < n.length; i++) {
				var a = n[i];
				r.push(u(a, t));
			}
			return r;
		}
		var l = c.bind(this);
		function u(e, t) {
			return e.termType === "BlankNode" && !t.incoming[e] ? m(e, t, !0).concat(["."]) : [
				g(e, t),
				f(e, t),
				"."
			];
		}
		function d(e, t) {
			var n = [], r = null, a = t.subjects[this.toStr(e)] || [];
			if (a === void 0) throw Error("Cant find statements for " + e);
			for (var o = [], s = 0; s < a.length; s++) {
				var c = a[s];
				c.predicate.uri === r ? o.push(",") : (r && (n = n.concat([o]).concat([";"]), o = []), n.push(i[c.predicate.uri] ? i[c.predicate.uri] : g(c.predicate, t))), r = c.predicate.uri, o.push(m(c.object, t));
			}
			return n = n.concat([o]), n;
		}
		var f = d.bind(this);
		function p(e, t, n) {
			return e.termType === "BlankNode" && (n || t.rootsHash[e.toNT()] === void 0) ? t.subjects[this.toStr(e)] ? [
				"[",
				f(e, t),
				"]"
			] : "[]" : g(e, t);
		}
		var m = p.bind(this);
		function h(e, t) {
			var n, r;
			switch (e.termType) {
				case "Graph": return r = ["{"], r = r.concat(l(e.statements)), r.concat(["}"]);
				case "Collection":
					for (r = ["("], n = 0; n < e.elements.length; n++) r.push([m(e.elements[n], t)]);
					return r.push(")"), r;
				default: return this.atomicTermToN3(e);
			}
		}
		e.prototype.termToN3 = g;
		var g = h.bind(this);
		function _() {
			var e = "";
			for (var t in this.flags.indexOf("d") < 0 && this.defaultNamespace && (e += "@prefix : " + this.explicitURI(this.defaultNamespace) + ".\n"), this.prefixes) this.prefixes.hasOwnProperty(t) && this.namespacesUsed[t] && (e += "@prefix " + this.prefixes[t] + ": " + this.explicitURI(t) + ".\n");
			return e + "\n";
		}
		var v = _.bind(this), y = l(t);
		return v() + s(y);
	}
	atomicTermToN3(e, t) {
		switch (e.termType) {
			case "BlankNode":
			case "Variable": return e.toNT();
			case "Literal":
				var n = e.value;
				if (typeof n != "string") throw TypeError("Value of RDF literal node must be a string");
				if (e.datatype && this.flags.indexOf("x") < 0) switch (e.datatype.uri) {
					case "http://www.w3.org/2001/XMLSchema#integer": return n;
					case "http://www.w3.org/2001/XMLSchema#decimal": return n.indexOf(".") < 0 && (n += ".0"), n;
					case "http://www.w3.org/2001/XMLSchema#double": {
						let e = n.toLowerCase().indexOf("e") > 0;
						return n.indexOf(".") < 0 && !e && (n += ".0"), e || (n += "e0"), n;
					}
					case "http://www.w3.org/2001/XMLSchema#boolean": return e.value === "1" ? "true" : "false";
				}
				var r = this.stringToN3(e.value, this.flags);
				return e.language ? r += "@" + e.language : e.datatype.equals(this.xsd.string) || (r += "^^" + this.atomicTermToN3(e.datatype, t)), r;
			case "NamedNode": return this.symbolToN3(e);
			case "DefaultGraph": return "";
			default: throw Error("Internal: atomicTermToN3 cannot handle " + e + " of termType: " + e.termType);
		}
	}
	stringToN3(e, t) {
		t ||= "e";
		var n = "", r, i, a, o, s;
		for (e.length > 20 && e.slice(-1) !== "\"" && t.indexOf("n") < 0 && (e.indexOf("\n") > 0 || e.indexOf("\"") > 0) ? (o = "\"\"\"", s = this.forbidden3) : (o = "\"", s = this.forbidden1), r = 0; r < e.length && (s.lastIndex = 0, s.exec(e.slice(r)) != null);) {
			i = r + s.lastIndex - 1, n += e.slice(r, i);
			var c = e[i];
			c === "\"" && o === "\"\"\"" && e.slice(i, i + 3) !== "\"\"\"" ? n += c : (a = "\b\f\r	\v\n\\\"".indexOf(c), a >= 0 ? n += "\\" + "bfrtvn\\\""[a] : t.indexOf("e") >= 0 ? n += "\\u" + ("000" + c.charCodeAt(0).toString(16).toLowerCase()).slice(-4) : n += c), r = i + 1;
		}
		return o + n + e.slice(r) + o;
	}
	symbolToN3(e) {
		var t = e.uri, n = t.indexOf("#");
		if (n < 0 && this.flags.indexOf("/") < 0 && (n = t.lastIndexOf("/")), n >= 0 && this.flags.indexOf("p") < 0 && (t.indexOf("http") === 0 || t.indexOf("ws") === 0 || t.indexOf("file") === 0)) {
			var r = t.slice(n + 1), i = t.slice(0, n + 1), a = t.indexOf("://") + 4, o = this.base ? this.base.slice(0, Math.max(this.base.lastIndexOf("/"), this.base.lastIndexOf("#")) + 1) : null, s = o && i === o, c = this.flags.indexOf("o") >= 0 && r.indexOf(".") >= 0;
			if (!s && !c && i.length > a && this.isValidPNLocal(r)) {
				if (this.defaultNamespace && this.defaultNamespace === i && this.flags.indexOf("d") < 0) return this.flags.indexOf("k") >= 0 && this.keywords.indexOf(r) < 0 ? r : ":" + r;
				var l = this.prefixes[i];
				if (l ||= this.makeUpPrefix(i), l) return this.namespacesUsed[i] = !0, l + ":" + r;
			}
		}
		return this.explicitURI(t);
	}
	writeStore(e) {
		var t = this.store, n = t.fetcher, r = n && n.appNode;
		for (var i in this.store.index[3]) {
			var a = t.fromNT(i);
			r && a.equals(r) || e("\n" + this.atomicTermToN3(a) + " " + this.atomicTermToN3(t.sym("http://www.w3.org/2000/10/swap/log#semantics")) + " { " + this.statementsToN3(t.statementsMatching(void 0, void 0, void 0, a)) + " }.\n");
		}
		t.statementsMatching(void 0, t.sym("http://www.w3.org/2007/ont/link#requestedURI")).map(function(n) {
			e("\n<" + n.object.value + "> log:metadata {\n");
			var r = t.statementsMatching(void 0, void 0, void 0, n.subject);
			e(this.statementsToN3(this.statementsToN3(r))), e("}.\n");
		});
		var o = [];
		r && o.push(r);
		var s = [];
		o.map(function(e) {
			s = s.concat(t.statementsMatching(void 0, void 0, void 0, e));
		}), e(this.statementsToN3(s));
	}
	statementsToXML(e) {
		var t = [];
		t["http://www.w3.org/1999/02/22-rdf-syntax-ns#"] = !0;
		var n = "http://www.w3.org/1999/02/22-rdf-syntax-ns#_", r = function(e) {
			for (var t = "", n = 0; n < e; n++) t += " ";
			return t;
		}, i = function(e) {
			for (var t = "", n = 0; n < e.length; n++) {
				var r = e[n], a = typeof r == "string" ? r : i(r);
				t += a;
			}
			return t;
		}, a = function(e, t) {
			var n = "", o, s = 1e5;
			t ||= 0;
			for (var c = 0; c < e.length; c++) {
				var l = e[c];
				if (typeof l != "string") {
					var u = a(l, t + 1);
					u.length < 10 * (80 - 4 * t) && u.indexOf("\"\"\"") < 0 && (o = i(l), o.length < 80 - 4 * t && (l = "   " + o, u = "")), u && (s = 1e4), n += u;
				}
				typeof l == "string" && (s < 4 * t + 4 ? (n = n.slice(0, -1) + " " + l + "\n", s += l.length + 1) : (o = r(4 * t) + l, n += o + "\n", s = o.length));
			}
			return n;
		};
		function o(e) {
			this.suggestPrefix("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
			for (var t = this.rootSubjects(e), n = t.roots, r = [], i = 0; i < n.length; i++) {
				var a = n[i];
				r.push(f(a, t));
			}
			return r;
		}
		var s = o.bind(this);
		function c(e) {
			return e === void 0 ? "@@@undefined@@@@" : e.replace(/[&<"]/g, function(e) {
				switch (e[0]) {
					case "&": return "&amp;";
					case "<": return "&lt;";
					case "\"": return "&quot;";
				}
			});
		}
		function l(e) {
			return c(this.base ? Fe(this.base, e.uri) : e.uri);
		}
		var u = l.bind(this);
		function d(e, t) {
			var r = [], i, a, o, s, l = t.subjects[this.toStr(e)];
			if (l === void 0) return h(e, t);
			l.sort(function(e, t) {
				var r = e.predicate.uri, i = t.predicate.uri;
				if (r.substring(0, n.length) === n || i.substring(0, n.length) === n) return r.localeCompare(i);
				var a = r.substring(n.length), o = i.substring(n.length), s = parseInt(a, 10), c = parseInt(o, 10);
				return isNaN(s) || isNaN(c) || s !== a || c !== o ? r.localeCompare(i) : s - c;
			});
			for (var d = 0; d < l.length; d++) if (o = l[d], o.predicate.uri === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" && !i && o.object.termType === "NamedNode") i = o.object;
			else {
				if (s = o.predicate, s.uri.substr(0, n.length) === n) {
					var m = s.uri.substr(n.length);
					m === parseInt(m, 10).toString() && (s = this.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#li"));
				}
				switch (a = _(s), o.object.termType) {
					case "BlankNode":
						r = t.incoming[o.object].length === 1 ? r.concat([
							"<" + a + " rdf:parseType=\"Resource\">",
							f(o.object, t),
							"</" + a + ">"
						]) : r.concat(["<" + a + " rdf:nodeID=\"" + o.object.toNT().slice(2) + "\"/>"]);
						break;
					case "NamedNode":
						r = r.concat(["<" + a + " rdf:resource=\"" + u(o.object) + "\"/>"]);
						break;
					case "Literal":
						r = r.concat(["<" + a + (o.object.language ? " xml:lang=\"" + o.object.language + "\"" : o.object.datatype.equals(this.xsd.string) ? "" : " rdf:datatype=\"" + c(o.object.datatype.uri) + "\"") + ">" + c(o.object.value) + "</" + a + ">"]);
						break;
					case "Collection":
						r = r.concat([
							"<" + a + " rdf:parseType=\"Collection\">",
							p(o.object, t),
							"</" + a + ">"
						]);
						break;
					default: throw Error("Can't serialize object of type " + o.object.termType + " into XML");
				}
			}
			var g = i ? _(i) : "rdf:Description", v = "";
			return e.termType === "BlankNode" ? t.incoming[e] && t.incoming[e].length === 1 || (v = " rdf:nodeID=\"" + e.toNT().slice(2) + "\"") : v = " rdf:about=\"" + u(e) + "\"", [
				"<" + g + v + ">",
				r,
				"</" + g + ">"
			];
		}
		var f = d.bind(this);
		function p(e, t) {
			for (var n = [], r = 0; r < e.elements.length; r++) n.push(f(e.elements[r], t));
			return n;
		}
		function m(e, t) {
			var n = [], r = t.subjects[this.toStr(e)];
			if (!r) return n;
			r.sort();
			for (var i = 0; i < r.length; i++) {
				var a = r[i];
				switch (a.object.termType) {
					case "BlankNode":
						n = t.rootsHash[a.object.toNT()] ? n.concat(["<" + _(a.predicate) + " rdf:nodeID=\"" + a.object.toNT().slice(2) + "\">", "</" + _(a.predicate) + ">"]) : n.concat([
							"<" + _(a.predicate) + " rdf:parseType=\"Resource\">",
							h(a.object, t),
							"</" + _(a.predicate) + ">"
						]);
						break;
					case "NamedNode":
						n = n.concat(["<" + _(a.predicate) + " rdf:resource=\"" + u(a.object) + "\"/>"]);
						break;
					case "Literal":
						n = n.concat(["<" + _(a.predicate) + (a.object.language ? " xml:lang=\"" + a.object.language + "\"" : a.object.datatype.equals(this.xsd.string) ? "" : " rdf:datatype=\"" + c(a.object.datatype.value) + "\"") + ">" + c(a.object.value) + "</" + _(a.predicate) + ">"]);
						break;
					case "Collection":
						n = n.concat([
							"<" + _(a.predicate) + " rdf:parseType=\"Collection\">",
							p(a.object, t),
							"</" + _(a.predicate) + ">"
						]);
						break;
					default: throw Error("Can't serialize object of type " + a.object.termType + " into XML");
				}
			}
			return n;
		}
		var h = m.bind(this);
		function g(e) {
			var n = e.uri, r = n.indexOf("#");
			if (r < 0 && this.flags.indexOf("/") < 0 && (r = n.lastIndexOf("/")), r < 0) throw Error("Cannot make qname out of <" + n + ">");
			for (var i = r + 1; i < n.length; i++) if (this._notNameChars.indexOf(n[i]) >= 0) throw Error("Invalid character \"" + n[i] + "\" cannot be in XML qname for URI: " + n);
			var a = n.slice(r + 1), o = n.slice(0, r + 1);
			if (this.defaultNamespace && this.defaultNamespace === o && this.flags.indexOf("d") < 0) return a;
			var s = this.prefixes[o];
			return s ||= this.makeUpPrefix(o), t[o] = !0, s + ":" + a;
		}
		var _ = g.bind(this), v = s(e), y = "<rdf:RDF";
		for (var b in this.defaultNamespace && (y += " xmlns=\"" + c(this.defaultNamespace) + "\""), t) if (t.hasOwnProperty(b)) {
			var x = this.base && this.flags.includes("z") ? Fe(this.base, b) : b;
			y += "\n xmlns:" + this.prefixes[b] + "=\"" + c(x) + "\"";
		}
		return y += ">", a([
			y,
			v,
			"</rdf:RDF>"
		], -1);
	}
	statementsToJsonld(e) {
		let t = this.statementsToN3(e), n = Xe.parse(t);
		return JSON.stringify(n, null, 2);
	}
};
function vt(e) {
	return encodeURI(e);
}
function yt(e) {
	for (var t = "", n, r = 0; r < e.length; r++) n = e.charCodeAt(r), t += n > 65535 ? "\\U" + ("00000000" + n.toString(16)).slice(-8) : n > 126 ? "\\u" + ("0000" + n.toString(16)).slice(-4) : e[r];
	return t;
}
// node_modules/rdflib/esm/serialize.js
function bt(e, t, n, r, i, a) {
	n ||= e?.value;
	let o = a || {};
	r ||= "text/turtle";
	var s = void 0;
	try {
		var c = gt(t);
		o.flags && c.setFlags(o.flags);
		var l = t.statementsMatching(void 0, void 0, void 0, e);
		switch ("namespaces" in t && c.suggestNamespaces(t.namespaces), o.namespaces && c.setNamespaces(o.namespaces), c.setBase(n), r) {
			case re: return s = c.statementsToXML(l), u(null, s);
			case ee:
			case te: return s = c.statementsToN3(l), u(null, s);
			case ie:
			case ae: return c.setFlags("si" + (o.flags ? " " + o.flags : "")), s = c.statementsToN3(l), u(null, s);
			case ne: return c.setFlags("deinprstux"), s = c.statementsToNTriples(l), u(null, s);
			case O: return c.setFlags("si dr" + (o.flags ? " " + o.flags : "")), s = c.statementsToJsonld(l), u(null, s);
			case A:
			case k: return c.setFlags("deinprstux q"), s = c.statementsToNTriples(l), u(null, s);
			default: throw Error("Serialize: Content-type " + r + " not supported for data write.");
		}
	} catch (e) {
		if (i) return i(e, void 0);
		throw e;
	}
	function u(e, t) {
		if (i) i(e, t);
		else return t;
	}
}
// node_modules/rdflib/esm/utils.js
var xt = [
	"blankNode",
	"defaultGraph",
	"literal",
	"namedNode",
	"quad",
	"variable",
	"supports"
], St = {
	first: "http://www.w3.org/1999/02/22-rdf-syntax-ns#first",
	rest: "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest",
	nil: "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"
};
function Ct(e, t, n) {
	let r = [];
	return n.reduce((t, n, i, a) => {
		r.push(e.quad(t, e.namedNode(St.first), a[i]));
		let o;
		return i < a.length - 1 ? (o = e.blankNode(), r.push(e.quad(t, e.namedNode(St.rest), o))) : r.push(e.quad(t, e.namedNode(St.rest), e.namedNode(St.nil))), o;
	}, t), r;
}
function wt(e, t, n = 0) {
	var r = e.length;
	for (n < 0 && (n = r + n); n < r; n++) if (e[n] === t) return n;
	return -1;
}
// node_modules/rdflib/esm/formula.js
var Tt = class e extends v {
	constructor(e = [], t = [], n = [], r = [], i = {}) {
		super(""), this.statements = e, this.constraints = t, this.initBindings = n, this.optional = r, g(this, "termType", E), g(this, "classOrder", _.Graph), g(this, "fetcher", void 0), g(this, "isVar", 0), g(this, "ns", Be), g(this, "rdfFactory", void 0), this.rdfFactory = i && i.rdfFactory || ze;
		for (let e of xt) this[e] = (...t) => this.rdfFactory[e](...t);
	}
	add(e, t, n, r) {
		return arguments.length === 1 && e.forEach((e) => this.add(e.subject, e.predicate, e.object, e.graph)), this.statements.push(this.rdfFactory.quad(e, t, n, r));
	}
	addStatement(e) {
		return this.add(e);
	}
	bnode(e) {
		return this.rdfFactory.blankNode(e);
	}
	addAll(e) {
		e.forEach((e) => {
			this.add(e.subject, e.predicate, e.object, e.graph);
		});
	}
	any(e, t, n, r) {
		let i = this.anyStatementMatching(e, t, n, r);
		return i == null ? null : e == null ? i.subject : t == null ? i.predicate : n == null ? i.object : null;
	}
	anyValue(e, t, n, r) {
		let i = this.any(e, t, n, r);
		return i ? i.value : void 0;
	}
	anyJS(e, t, n, r) {
		let i = this.any(e, t, n, r);
		return i ? v.toJS(i) : void 0;
	}
	anyStatementMatching(e, t, n, r) {
		let i = this.statementsMatching(e, t, n, r, !0);
		if (i && i.length !== 0) return i[0];
	}
	id(e) {
		return this.rdfFactory.id(e);
	}
	statementsMatching(e, t, n, r, i) {
		let a = this.statements.filter((i) => (!e || e.equals(i.subject)) && (!t || t.equals(i.predicate)) && (!n || n.equals(i.object)) && (!r || r.equals(i.graph)));
		return i ? a.length === 0 ? [] : [a[0]] : a;
	}
	bottomTypeURIs(e) {
		let t, n, r, i, a, o, s, c;
		t = [];
		for (let l in e) if (e.hasOwnProperty(l)) {
			for (c = e[l], s = this.each(void 0, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#subClassOf"), this.rdfFactory.namedNode(l)), n = !0, i = 0, a = s.length; i < a; i++) if (r = s[i], o = r.uri, o in e) {
				n = !1;
				break;
			}
			n && (t[l] = c);
		}
		return t;
	}
	collection() {
		return new xe();
	}
	each(e, t, n, r) {
		let i = [], a = this.statementsMatching(e, t, n, r, !1);
		if (e == null) for (let e = 0, t = a.length; e < t; e++) i.push(a[e].subject);
		else if (t == null) for (let e = 0, t = a.length; e < t; e++) i.push(a[e].predicate);
		else if (n == null) for (let e = 0, t = a.length; e < t; e++) i.push(a[e].object);
		else if (r == null) for (let e = 0, t = a.length; e < t; e++) i.push(new R(a[e].graph.value));
		return i;
	}
	equals(e) {
		return e ? this.hashString() === e.hashString() : !1;
	}
	findMembersNT(e) {
		let t, n, r, i, a, o, s, c, l, u, d, f, p, m;
		f = {}, f[e.toNT()] = !0, i = {}, o = this.transitiveClosure(f, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#subClassOf"), !0);
		for (let e in o) if (o.hasOwnProperty(e)) {
			s = this.statementsMatching(void 0, this.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), this.fromNT(e));
			for (let e = 0, t = s.length; e < t; e++) p = s[e], i[p.subject.toNT()] = p;
			c = this.each(void 0, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#domain"), this.fromNT(e));
			for (let e = 0, n = c.length; e < n; e++) for (a = c[e], l = this.statementsMatching(void 0, a), r = 0, t = l.length; r < t; r++) p = l[r], i[p.subject.toNT()] = p;
			u = this.each(void 0, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#range"), this.fromNT(e));
			for (let e = 0, t = u.length; e < t; e++) for (a = u[e], d = this.statementsMatching(void 0, a), m = 0, n = d.length; m < n; m++) p = d[m], i[p.object.toNT()] = p;
		}
		return i;
	}
	findMemberURIs(e) {
		return this.NTtoURI(this.findMembersNT(e));
	}
	findSubClassesNT(e) {
		let t = {};
		return t[e.toNT()] = !0, this.transitiveClosure(t, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#subClassOf"), !0);
	}
	findSuperClassesNT(e) {
		let t = {};
		return t[e.toNT()] = !0, this.transitiveClosure(t, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#subClassOf"), !1);
	}
	findTypesNT(e) {
		let t, n, r, i, a, o, s, c, l;
		r = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", l = [], i = this.statementsMatching(e, void 0, void 0);
		for (let e = 0, t = i.length; e < t; e++) if (c = i[e], c.predicate.uri === r) l[c.object.toNT()] = c;
		else {
			a = this.each(c.predicate, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#domain"));
			for (let e = 0, t = a.length; e < t; e++) n = a[e], l[n.toNT()] = c;
		}
		o = this.statementsMatching(void 0, void 0, e);
		for (let e = 0, n = o.length; e < n; e++) {
			c = o[e], s = this.each(c.predicate, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#range"));
			for (let e = 0, n = s.length; e < n; e++) t = s[e], l[t.toNT()] = c;
		}
		return this.transitiveClosure(l, this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#subClassOf"), !1);
	}
	findTypeURIs(e) {
		return this.NTtoURI(this.findTypesNT(e));
	}
	connectedStatements(e, t, n) {
		n ||= [];
		let r = [e], i = {}, a = {}, o = [], s = this, c = function(e) {
			let c = function(e) {
				e.termType === "BlankNode" && !i[e.value] && (i[e.value] = !0, r.push(e));
			}, l = s.statementsMatching(null, null, e, t).concat(s.statementsMatching(e, null, null, t));
			l = l.filter(function(e) {
				if (n[e.predicate.value]) return !1;
				let t = e.toNT();
				return !a[t] && (a[t] = !0, !0);
			}), l.forEach(function(e) {
				c(e.subject), c(e.object);
			}), o = o.concat(l);
		};
		for (; r.length;) c(r.shift());
		return o;
	}
	formula(t) {
		return new e();
	}
	fromNT(e) {
		let t, n, r;
		switch (e[0]) {
			case "<": return this.sym(e.slice(1, -1));
			case "\"":
				if (r = void 0, t = void 0, n = e.lastIndexOf("\""), n < e.length - 1) {
					if (e[n + 1] === "@") r = e.slice(n + 2);
					else if (e.slice(n + 1, n + 3) === "^^") t = this.fromNT(e.slice(n + 3));
					else throw Error("Can't convert string from NT: " + e);
				}
				return e = e.slice(1, n), e = e.replace(/\\"/g, "\""), e = e.replace(/\\n/g, "\n"), e = e.replace(/\\\\/g, "\\"), this.rdfFactory.literal(e, r || t);
			case "_": return this.rdfFactory.blankNode(e.slice(2));
			case "?": return new Ie(e.slice(1));
		}
		throw Error("Can't convert from NT: " + e);
	}
	holds(e, t, n, r) {
		let i;
		if (arguments.length === 1) {
			if (!e) return !0;
			if (e instanceof Array) {
				for (i = 0; i < e.length; i++) if (!this.holds(e[i])) return !1;
				return !0;
			}
			if (oe(e)) return this.holds(e.subject, e.predicate, e.object, e.graph);
			if (e.statements) return this.holds(e.statements);
		}
		return this.anyStatementMatching(e, t, n, r) != null;
	}
	holdsStatement(e) {
		return this.holds(e.subject, e.predicate, e.object, e.graph);
	}
	list(e, t) {
		if (t.rdfFactory.supports.COLLECTIONS) {
			let n = t.rdfFactory.collection();
			return e.forEach(function(e) {
				n.append(e);
			}), n;
		}
		{
			let n = t.rdfFactory.blankNode(), r = Ct(t.rdfFactory, n, e);
			return t.addAll(r), n;
		}
	}
	NTtoURI(e) {
		let t, n, r = {};
		for (t in e) e.hasOwnProperty(t) && (n = e[t], t[0] === "<" && (r[t.slice(1, -1)] = n));
		return r;
	}
	serialize(e, t, n, r) {
		return bt(n, this, e, t, void 0, r);
	}
	substitute(t) {
		let n = this.statements.map(function(e) {
			return e.substitute(t);
		}), r = new e();
		return r.addAll(n), r;
	}
	sym(e, t) {
		if (t) throw Error("This feature (kb.sym with 2 args) is removed. Do not assume prefix mappings.");
		return this.rdfFactory.namedNode(e);
	}
	the(e, t, n, r) {
		let i = this.any(e, t, n, r);
		return i ?? z.error("No value found for the() {" + e + " " + t + " " + n + "}."), i;
	}
	transitiveClosure(e, t, n) {
		let r, i, a, o, s, c, l = {};
		Object.assign(l, e);
		let u = {};
		for (;;) {
			if (c = function() {
				for (let e in l) if (l.hasOwnProperty(e)) return e;
			}(), c == null) return u;
			for (s = n ? this.each(void 0, t, this.fromNT(c)) : this.each(this.fromNT(c), t), i = 0, a = s.length; i < a; i++) r = s[i], o = r.toNT(), o in u || o in l || (l[o] = l[c]);
			u[c] = l[c], delete l[c];
		}
	}
	topTypeURIs(e) {
		let t, n, r, i, a, o, s, c;
		for (r in s = [], e) if (e.hasOwnProperty(r)) {
			for (c = e[r], a = 0, o = this.each(this.rdfFactory.namedNode(r), this.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#subClassOf")), t = 0, i = o.length; t < i; t++) if (n = o[t], n.uri !== "http://www.w3.org/2000/01/rdf-schema#Resource") {
				a++;
				break;
			}
			a || (s[r] = c);
		}
		return s["http://www.w3.org/2000/01/rdf-schema#Resource"] && delete s["http://www.w3.org/2000/01/rdf-schema#Resource"], s["http://www.w3.org/2002/07/owl#Thing"] && delete s["http://www.w3.org/2002/07/owl#Thing"], s;
	}
	toString() {
		return "{" + this.statements.join("\n") + "}";
	}
	variable(e) {
		return new Ie(e);
	}
	whether(e, t, n, r) {
		return this.statementsMatching(e, t, n, r, !1).length;
	}
};
// node_modules/rdflib/esm/node.js
v.fromValue = be;
var Et = v, Dt = { xsd: Be("http://www.w3.org/2001/XMLSchema#") };
v.toJS = function(e) {
	return F(e) ? e.elements.map(v.toJS) : de(e) ? e.datatype.equals(Dt.xsd("boolean")) ? e.value === "1" || e.value === "true" : e.datatype.equals(Dt.xsd("dateTime")) || e.datatype.equals(Dt.xsd("date")) ? new Date(e.value) : e.datatype.equals(Dt.xsd("integer")) || e.datatype.equals(Dt.xsd("float")) || e.datatype.equals(Dt.xsd("decimal")) ? Number(e.value) : e.value : e;
};
// node_modules/rdflib/esm/query.js
var Ot = class {
	constructor(e, t) {
		this.pat = new Pt(), this.vars = [], this.name = e, this.id = t;
	}
};
function kt(e, t, n, r) {
	function i(e) {
		var t = "", n;
		for (n in e) e.hasOwnProperty(n) && (t += "    " + n + " -> " + e[n]);
		return t;
	}
	function a(e) {
		var t = "Bindings: ", n, r = e.length;
		for (n = 0; n < r; n++) t += i(e[n][0]) + ";\n	";
		return t;
	}
	function o(e, t, n, r) {
		var i = n[e];
		if (i === void 0) {
			if (e.isVar) {
				var a = [];
				return a[e] = t, [[a, null]];
			}
			i = e;
		}
		if (!i.complexType) return r.redirections[i] && (i = r.redirections[i]), r.redirections[t] && (t = r.redirections[t]), i.equals(t) || i.uri && i.uri === "chrome:theSession" ? [[[], null]] : [];
		if (e instanceof Array) return t instanceof Array ? s(e, t, n) : [];
		throw Error("query.js: oops - code not written yet");
	}
	function s(e, t, n, r) {
		var i;
		if (e.length !== t.length) return [];
		if (!e.length) return [[[], null]];
		var a = o(e[0], t[0], n, r);
		if (a.length === 0) return a;
		var c = [], l, u = a.length, d, f, p, m, h, g;
		for (l = 0; l < u; l++) {
			for (m in d = a[l][0], g = [], d) d.hasOwnProperty(m) && (g[m] = d[m]);
			for (m in n) n.hasOwnProperty(m) && (g[m] = n[m]);
			for (i = s(e.slice(1), t.slice(1), g, r), p = i.length, f = 0; f < p; f++) {
				for (m in h = i[f][0], d) d.hasOwnProperty(m) && (h[m] = d[m]);
				c.push([h, null]);
			}
		}
		return c;
	}
	function c(e, t) {
		var n = t[e];
		return n === void 0 ? e : n;
	}
	function l(e, t) {
		var n = {}, r;
		for (r in e) e.hasOwnProperty(r) && (n[r] = e[r]);
		for (r in t) t.hasOwnProperty(r) && (n[r] = t[r]);
		return n;
	}
	function u(e, t) {
		return this.trunkBindings = t, this.originalCallback = e, this.branches = [], this;
	}
	u.prototype.checkAllDone = function() {
		for (var e = 0; e < this.branches.length; e++) if (!this.branches[e].done) return;
		z.debug("OPTIONAL BIDNINGS ALL DONE:"), this.doCallBacks(this.branches.length - 1, this.trunkBindings);
	}, u.prototype.doCallBacks = function(e, t) {
		var n;
		if (e < 0) return this.originalCallback(t);
		for (n = 0; n < this.branches[e].results.length; n++) this.doCallBacks(e - 1, l(t, this.branches[e].results[n]));
	};
	function d(e, t) {
		return this.count = 0, this.success = !1, this.done = !1, this.callback = e, this.onDone = t, this;
	}
	d.prototype.reportMatch = function(e) {
		this.callback(e), this.success = !0;
	}, d.prototype.reportDone = function() {
		this.done = !0, z.info("Mandatory query branch finished.***"), this.onDone !== void 0 && this.onDone();
	};
	var f = function(e) {
		return this.count = 0, this.done = !1, this.results = [], this.junction = e, e.branches.push(this), this;
	};
	f.prototype.reportMatch = function(e) {
		this.results.push(e);
	}, f.prototype.reportDone = function() {
		z.debug("Optional branch finished - results.length = " + this.results.length), this.results.length === 0 && (this.results.push({}), z.debug("Optional branch FAILED - that's OK.")), this.done = !0, this.junction.checkAllDone();
	};
	function p(e, t, n) {
		var r, i, a, o;
		for (t.nvars = 0, t.index = null, r = [
			t.subject,
			t.predicate,
			t.object,
			t.why
		], o = [
			e.subjectIndex,
			e.predicateIndex,
			e.objectIndex,
			e.whyIndex
		], a = 0; a < 4; a++) {
			let s = r[a];
			if (!(s.uri && s.uri === "chrome:theSession")) {
				if (s.isVar && n[s] === void 0) t.nvars++;
				else {
					if (s = c(r[a], n), e.redirections[e.id(s)] && (s = e.redirections[e.id(s)]), i = o[a][e.id(s)], !i) return t.index = [], !1;
					(t.index === null || t.index.length > i.length) && (t.index = i);
				}
			}
		}
		return t.index === null && (t.index = e.statements), !0;
	}
	function m(e, t) {
		return e.nvars === t.nvars ? e.index.length - t.index.length : e.nvars - t.nvars;
	}
	var h = 0, g = function(e, n, r, a, o, s, c) {
		z.debug("Match begins, Branch count now: " + c.count + " for " + c.pattern_debug);
		var l = n.statements;
		if (l.length === 0) {
			if (z.debug("FOUND MATCH WITH BINDINGS:" + i(r)), n.optional.length === 0) c.reportMatch(r);
			else {
				z.debug("OPTIONAL: " + n.optional);
				for (var d = new u(t, r), p = [], m = 0; m < n.optional.length; m++) p[m] = new f(d), p[m].pattern_debug = n.optional[m];
				for (m = 0; m < n.optional.length; m++) p[m].count = p[m].count + 1, g(e, n.optional[m], r, "", o, t, p[m]);
			}
			c.count--, z.debug("Match ends -- success , Branch count now: " + c.count + " for " + c.pattern_debug);
		} else {
			var _, y, b = l.length;
			if (o) {
				var x = "match" + h++, S = function(t, i) {
					var l = t.uri.split("#")[0];
					o.nowOrWhenFetched(l, void 0, function(i, l, u) {
						i || console.log("Error following link to <" + t.uri + "> in query: " + l), g(e, n, r, a, o, s, c);
					});
				};
				for (y = 0; y < b; y++) {
					if (_ = l[y], r[_.subject] !== void 0 && r[_.subject].uri && o && o.getState(Ae(r[_.subject].uri)) === "unrequested") {
						S(r[_.subject], x);
						return;
					}
					if (r[_.object] !== void 0 && r[_.object].uri && o && o.getState(Ae(r[_.object].uri)) === "unrequested") {
						S(r[_.object], x);
						return;
					}
				}
			}
			v(e, n, r, a, o, s, c);
		}
	}, _ = function(e, t) {
		var n = !0, r, i;
		for (r in e) e.hasOwnProperty(r) && t[r] && (i = t[r].test, i && !i(e[r]) && (n = !1));
		return n;
	}, v = function(e, t, n, r, o, c, l) {
		for (var u = t.statements, d = u.length, f = 0, h, v, y, b, x, S; f < d; f++) S = u[f], p(e, S, n);
		u.sort(m), S = u[0];
		var C = e.formula();
		C.optional = t.optional, C.constraints = t.constraints, C.statements = u.slice(1), z.debug(r + "match2 searching " + S.index.length + " for " + S + "; bindings so far=" + i(n));
		var w, T = S.index.length, E, D, O = 0;
		for (w = 0; w < T; w++) for (D = S.index[w], E = s([
			S.subject,
			S.predicate,
			S.object,
			S.why
		], [
			D.subject,
			D.predicate,
			D.object,
			D.why
		], n, e), z.info(r + " From first: " + E.length + ": " + a(E)), v = E.length, h = 0; h < v; h++) if (b = [], x = E[h][0], !_(x, t.constraints)) z.debug("Branch count CS: " + l.count);
		else {
			for (y in x) x.hasOwnProperty(y) && (b[y] = x[y]);
			for (y in n) n.hasOwnProperty(y) && (b[y] = n[y]);
			l.count++, O++, g(e, C, b, r + "  ", o, c, l);
		}
		l.count--, O === 0 && z.debug("Match2 fails completely on " + S), z.debug("Match2 ends, Branch count: " + l.count + " for " + l.pattern_debug), l.count === 0 && (z.debug("Branch finished."), l.reportDone());
	}, y = this;
	z.debug("Query on " + this.statements.length);
	var b = new d(t, r);
	b.count++, e.sync ? g(y, e.pat, e.pat.initBindings, "", n, t, b) : setTimeout(function() {
		g(y, e.pat, e.pat.initBindings, "", n, t, b);
	}, 0);
}
// node_modules/rdflib/esm/store.js
var At = "http://www.w3.org/2002/07/owl#";
function jt(e, t, n, r) {
	var i = e.any(t, n, void 0);
	return i ? (e.equate(i, r), !0) : !1;
}
function Mt(e, t, n, r) {
	var i = e.any(void 0, n, r);
	return i ? (e.equate(i, t), !0) : !1;
}
function Nt(e, t, n, r, i) {
	e.typeCallback && e.typeCallback(e, r, i);
	var a = e.classActions[e.id(r)], o = !1;
	if (a) for (var s = 0; s < a.length; s++) o ||= a[s](e, t, n, r, i);
	return o;
}
var Pt = class e extends Tt {
	constructor(e, t = {}) {
		super(void 0, void 0, void 0, void 0, t), g(this, "updater", void 0), g(this, "namespaces", void 0), g(this, "classActions", void 0), g(this, "propertyActions", void 0), g(this, "redirections", void 0), g(this, "aliases", void 0), g(this, "HTTPRedirects", void 0), g(this, "subjectIndex", void 0), g(this, "predicateIndex", void 0), g(this, "objectIndex", void 0), g(this, "whyIndex", void 0), g(this, "index", void 0), g(this, "features", void 0), g(this, "_universalVariables", void 0), g(this, "_existentialVariables", void 0), g(this, "rdfArrayRemove", void 0), g(this, "dataCallbacks", []), g(this, "dataRemovalCallbacks", []), this.propertyActions = {}, this.classActions = {}, this.redirections = [], this.aliases = [], this.HTTPRedirects = [], this.subjectIndex = [], this.predicateIndex = [], this.objectIndex = [], this.whyIndex = [], this.index = [
			this.subjectIndex,
			this.predicateIndex,
			this.objectIndex,
			this.whyIndex
		], this.namespaces = {}, this.features = e || [], this.rdfArrayRemove = t.rdfArrayRemove || dt, t.dataCallback && (this.dataCallbacks = [t.dataCallback]), t.dataRemovalCallback && (this.dataRemovalCallbacks = [t.dataRemovalCallback]), this.initPropertyActions(this.features);
	}
	static get defaultGraphURI() {
		return Ce;
	}
	substitute(t) {
		var n = this.statements.map(function(e) {
			return e.substitute(t);
		}), r = new e();
		return r.add(n), r;
	}
	addDataCallback(e) {
		this.dataCallbacks.push(e);
	}
	addDataRemovalCallback(e) {
		this.dataRemovalCallbacks.push(e);
	}
	applyPatch(e, t, n) {
		var r = this, i, a = null;
		function o(o) {
			if (e.delete) {
				i = e.delete, a && (i = i.substitute(a)), i = i.statements;
				var s = [], c = i.map(function(e) {
					var n = r.statementsMatching(e.subject, e.predicate, e.object, t);
					return n.length === 0 ? (s.push(e), null) : n[0];
				});
				if (s.length) return n("Could not find to delete: " + s.join("\n or "));
				c.map(function(e) {
					r.remove(e);
				});
			}
			e.insert && (i = e.insert, a && (i = i.substitute(a)), i = i.statements, i.map(function(e) {
				e.graph = t, r.add(e.subject, e.predicate, e.object, e.graph);
			})), o();
		}
		if (e.where) {
			var s = new Ot("patch");
			s.pat = e.where, s.pat.statements.map(function(e) {
				e.graph = new R(t.value);
			}), s.sync = !0;
			var c = [];
			r.query(s, function(e) {
				c.push(e);
			}, r.fetcher, function() {
				if (c.length === 0) return n("No match found to be patched:" + e.where);
				if (c.length > 1) return n("Patch ambiguous. No patch done.");
				a = c[0], o(n);
			});
		} else o(n);
	}
	declareExistential(e) {
		return this._existentialVariables ||= [], this._existentialVariables.push(e), e;
	}
	initPropertyActions(e) {
		this.propertyActions[this.rdfFactory.id(this.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"))] = [Nt], wt(e, "sameAs") >= 0 && (this.propertyActions[this.rdfFactory.id(this.rdfFactory.namedNode(`${At}sameAs`))] = [function(e, t, n, r, i) {
			return e.equate(t, r), !0;
		}]), wt(e, "InverseFunctionalProperty") >= 0 && (this.classActions[this.rdfFactory.id(this.rdfFactory.namedNode(`${At}InverseFunctionalProperty`))] = [function(e, t, n, r, i) {
			return e.newPropertyAction(t, Mt);
		}]), wt(e, "FunctionalProperty") >= 0 && (this.classActions[this.rdfFactory.id(this.rdfFactory.namedNode(`${At}FunctionalProperty`))] = [function(e, t, n, r, i) {
			return e.newPropertyAction(t, jt);
		}]);
	}
	addStatement(e) {
		return this.add(e.subject, e.predicate, e.object, e.graph), this.statements.length;
	}
	add(e, t, n, r) {
		var i;
		if (arguments.length === 1) {
			if (e instanceof Array) for (i = 0; i < e.length; i++) this.add(e[i]);
			else fe(e) ? this.add(e.subject, e.predicate, e.object, e.graph) : P(e) && this.add(e.statements);
			return this;
		}
		var a, o;
		r ||= this.fetcher ? this.fetcher.appNode : this.rdfFactory.defaultGraph(), typeof e == "string" && (e = this.rdfFactory.namedNode(e)), t = Et.fromValue(t);
		let s = Et.fromValue(n);
		if (r = Et.fromValue(r), !se(e)) throw Error("Subject is not a subject type");
		if (!ce(t)) throw Error(`Predicate ${t} is not a predicate type`);
		if (!I(s)) throw Error(`Object ${s} is not an object type`);
		if (!_e(r)) throw Error("Why is not a graph type");
		this.predicateCallback && this.predicateCallback(this, t, r);
		var c = this.id(this.canon(t));
		a = this.propertyActions[c];
		var l = !1;
		if (a) for (i = 0; i < a.length; i++) l ||= a[i](this, e, t, s, r);
		if (this.holds(e, t, s, r)) return null;
		var u = [
			this.id(this.canon(e)),
			c,
			this.id(this.canon(s)),
			this.id(this.canon(r))
		];
		for (o = this.rdfFactory.quad(e, t, s, r), i = 0; i < 4; i++) {
			var d = this.index[i], f = u[i];
			d[f] || (d[f] = []), d[f].push(o);
		}
		this.statements.push(o);
		for (let e of this.dataCallbacks) e(o);
		return o;
	}
	canon(e) {
		if (!e) return e;
		let t = this.redirections[this.id(e)];
		if (t) return t;
		switch (e.termType) {
			case b: return new M(e.value);
			case w: return e;
			case C: return new we();
			case T: return e;
			case E: return e;
			case x: return new ye(e.value, e.language, e.datatype);
			case y: return new R(e.value);
			case S: return new Ie(e.value);
			default: throw Error(`Term Type not recognized for canonization: ${e.termType}`);
		}
	}
	check() {
		this.checkStatementList(this.statements);
		for (var e = 0; e < 4; e++) {
			var t = this.index[e];
			for (var n in t) t.hasOwnProperty(n) && this.checkStatementList(t[n], e);
		}
	}
	checkStatementList(e, t) {
		t === void 0 && (t = 0);
		for (var n = " found in " + [
			"subject",
			"predicate",
			"object",
			"why"
		][t] + " index.", r, i = 0; i < e.length; i++) {
			r = e[i];
			for (var a = [
				r.subject,
				r.predicate,
				r.object,
				r.graph
			], o = function(e, t) {
				for (var n = 0; n < e.length; n++) if (e[n].subject.equals(t.subject) && e[n].predicate.equals(t.predicate) && e[n].object.equals(t.object) && e[n].why.equals(t.graph)) return !0;
			}, s = 0; s < 4; s++) {
				var c = this.canon(a[s]), l = this.id(c);
				this.index[s][l] && o(this.index[s][l], r);
			}
			if (!o(this.statements, r)) throw Error("Statement list does not statement " + r + "@" + r.graph + n);
		}
	}
	close() {
		return this;
	}
	compareTerms(e, t) {
		return Object.prototype.hasOwnProperty.call(e, "compareTerm") ? e.compareTerm(t) : _[e.termType] < _[t.termType] ? -1 : _[e.termType] > _[t.termType] ? 1 : e.value < t.value ? -1 : +(e.value > t.value);
	}
	copyTo(e, t, n) {
		n ||= [];
		var r = this.statementsMatching(e);
		wt(n, "two-direction") !== -1 && r.concat(this.statementsMatching(void 0, void 0, e));
		for (var i = 0; i < r.length; i++) {
			var a = r[i];
			switch (a.object.termType) {
				case "NamedNode":
					this.add(t, a.predicate, a.object);
					break;
				case "Literal":
				case "BlankNode":
				case "Collection": this.add(t, a.predicate, a.object.copy(this));
			}
			wt(n, "delete") !== -1 && this.remove(a);
		}
	}
	equate(e, t) {
		let n = this.canon(e), r = this.canon(t);
		var i = this.compareTerms(n, r);
		return i ? i < 0 ? this.replaceWith(r, n) : this.replaceWith(n, r) : !0;
	}
	formula(t) {
		return new e(t);
	}
	get length() {
		return this.statements.length;
	}
	match(e, t, n, r) {
		return this.statementsMatching(Et.fromValue(e), Et.fromValue(t), Et.fromValue(n), Et.fromValue(r));
	}
	mentionsURI(e) {
		var t = "<" + e + ">";
		return !!this.subjectIndex[t] || !!this.objectIndex[t] || !!this.predicateIndex[t];
	}
	newExistential(e) {
		if (!e) return this.bnode();
		var t = this.sym(e);
		return this.declareExistential(t);
	}
	newPropertyAction(e, t) {
		var n = this.id(e);
		this.propertyActions[n] || (this.propertyActions[n] = []), this.propertyActions[n].push(t);
		for (var r = this.statementsMatching(void 0, e, void 0), i = !1, a = 0; a < r.length; a++) i ||= t(this, r[a].subject, e, r[a].object);
		return i;
	}
	newUniversal(e) {
		var t = this.sym(e);
		return this._universalVariables ||= [], this._universalVariables.push(t), t;
	}
	variable(e) {
		return new Ie(e);
	}
	nextSymbol(e) {
		for (var t = 0;; t++) {
			var n = e.value + "#n" + t;
			if (!this.mentionsURI(n)) return this.sym(n);
		}
	}
	query(e, t, n, r) {
		return kt.call(this, e, t, n, r);
	}
	querySync(e) {
		var t = [];
		function n(e) {
			t.push(e);
		}
		function r() {
			i = !0;
		}
		var i = !1;
		if (e.sync = !0, kt.call(this, e, n, null, r), !i) throw Error("Sync query should have called done function");
		return t;
	}
	remove(e) {
		if (e instanceof Array) {
			for (var t = 0; t < e.length; t++) this.remove(e[t]);
			return this;
		}
		if (P(e)) return this.remove(e.statements);
		var n = this.statementsMatching(e.subject, e.predicate, e.object, e.graph);
		if (!n.length) throw Error("Statement to be removed is not on store: " + e);
		return this.removeStatement(n[0]), this;
	}
	removeDocument(e) {
		this.removeMetadata(e);
		for (var t = this.statementsMatching(void 0, void 0, void 0, e).slice(), n = 0; n < t.length; n++) this.removeStatement(t[n]);
		return this.removeMatches(e, null, null), this;
	}
	removeMetadata(e) {
		let t = this.sym("chrome://TheCurrentSession"), n = "http://www.w3.org/2007/ont/link#", r = this.statementsMatching(void 0, this.sym(`${n}requestedURI`), this.rdfFactory.literal(e.value), t).map((e) => e.subject);
		for (var i = 0; i < r.length; i++) {
			let e = r[i];
			if (e != null) {
				let r, i = this.any(e, this.sym(`${n}status`), null, t);
				if (i != null) {
					r = this.statementsMatching(i, this.sym(`${n}status`), null, t).slice();
					for (var a = 0; a < r.length; a++) this.removeStatement(r[a]);
				}
				let o = this.any(e, this.sym(`${n}response`), null, t);
				if (o != null) {
					r = this.statementsMatching(o, null, null, t).slice();
					for (var a = 0; a < r.length; a++) this.removeStatement(r[a]);
				}
				r = this.statementsMatching(e, null, null, t).slice();
				for (var a = 0; a < r.length; a++) this.removeStatement(r[a]);
			}
		}
		return this.removeMatches(this.sym(e.value), null, null, t), this;
	}
	removeMany(e, t, n, r, i) {
		for (var a = this.statementsMatching(e, t, n, r, !1), o = [], s = 0; s < a.length; s++) o.push(a[s]);
		for (i && (o = o.slice(0, i)), s = 0; s < o.length; s++) this.remove(o[s]);
	}
	removeMatches(e, t, n, r) {
		return this.removeMany(e, t, n, r), this;
	}
	removeStatement(e) {
		for (var t = [
			e.subject,
			e.predicate,
			e.object,
			e.graph
		], n = 0; n < 4; n++) {
			var r = this.canon(t[n]), i = this.id(r);
			this.index[n][i] && this.rdfArrayRemove(this.index[n][i], e);
		}
		this.rdfArrayRemove(this.statements, e);
		for (let t of this.dataRemovalCallbacks) t(e);
		return this;
	}
	removeStatements(e) {
		for (var t = 0; t < e.length; t++) this.remove(e[t]);
		return this;
	}
	replaceWith(e, t) {
		for (var n = this.id(e), r = this.id(t), i = function(e) {
			var t = e[n];
			if (t) {
				var i = e[r];
				e[r] = i ? t.concat(i) : t, delete e[n];
			}
		}, a = 0; a < 4; a++) i(this.index[a]);
		if (this.redirections[n] = t, e.value) {
			if (this.aliases[r] || (this.aliases[r] = []), this.aliases[r].push(e), this.aliases[n]) for (a = 0; a < this.aliases[n].length; a++) this.redirections[this.id(this.aliases[n][a])] = t, this.aliases[r].push(this.aliases[n][a]);
			this.add(t, this.sym("http://www.w3.org/2007/ont/link#uri"), e), this.fetcher && this.fetcher.nowKnownAs(e, t);
		}
		return i(this.classActions), i(this.propertyActions), !0;
	}
	allAliases(e) {
		var t = this.aliases[this.id(this.canon(e))] || [];
		return t.push(this.canon(e)), t;
	}
	sameThings(e, t) {
		if (e.equals(t)) return !0;
		var n = this.canon(e);
		if (!n) return !1;
		var r = this.canon(t);
		return r ? n.value === r.value : !1;
	}
	setPrefixForURI(e, t) {
		if (!(e === "tab" && this.namespaces.tab) && e.slice(0, 2) !== "ns" && e.slice(0, 7) !== "default") {
			for (let e in this.namespaces) this.namespaces[e] == t && delete this.namespaces[e];
			this.namespaces[e] = t;
		}
	}
	statementsMatching(e, t, n, r, i) {
		for (var a = [
			e,
			t,
			n,
			r
		], o = [], s = [], c = [], l = [], u = 0, d; u < 4; u++) o[u] = this.canon(Et.fromValue(a[u])), o[u] ? (l.push(u), s[u] = this.id(o[u])) : c.push(u);
		if (l.length === 0) return this.statements;
		if (l.length === 1) return u = l[0], d = this.index[u][s[u]], d && i && d.length > 1 && (d = d.slice(0, 1)), d ||= [], d;
		for (var f = 1e10, p, m = 0; m < l.length; m++) {
			if (u = l[m], d = this.index[u][s[u]], !d) return [];
			d.length < f && (f = d.length, p = m);
		}
		for (var h = l[p], g = this.index[h][s[h]], _ = l.slice(0, p).concat(l.slice(p + 1)), v = [], y = [
			"subject",
			"predicate",
			"object",
			"why"
		], b = 0; b < g.length; b++) {
			var x = g[b];
			for (m = 0; m < _.length; m++) if (u = _[m], !this.canon(x[y[u]]).equals(o[u])) {
				x = null;
				break;
			}
			if (x != null && (v.push(x), i)) break;
		}
		return v;
	}
	uris(e) {
		var t = this.canon(e), n = this.aliases[this.id(t)];
		if (!t.value) return [];
		var r = [t.value];
		if (n) for (var i = 0; i < n.length; i++) r.push(n[i].uri);
		return r;
	}
	serialize(e, t, n, r) {
		let i = r?.namespaces ? {
			...this.namespaces,
			...r.namespaces
		} : { ...this.namespaces };
		return r = {
			...r || {},
			namespaces: i
		}, bt(n, this, e, t, void 0, r);
	}
};
g(Pt, "handleRDFType", void 0), Pt.handleRDFType = Nt;
// node_modules/rdflib/esm/lists.js
var Ft = Be("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
function It(e, t, n, r) {
	for (let i of e.statementsMatching(n, null, null, r)) {
		let n = new De(t, i.predicate, i.object, r);
		e.remove(i), e.add(n);
	}
	for (let i of e.statementsMatching(null, n, null, r)) e.remove(i), e.add(new De(i.subject, t, i.object, r));
	for (let i of e.statementsMatching(null, null, n, r)) e.remove(i), e.add(new De(i.subject, i.predicate, t, r));
}
function Lt(e, t) {
	let n = Ft("nil");
	for (let r of e.statementsMatching(n, null, null, t)) {
		e.remove(r);
		let n = new xe();
		e.add(new De(n, r.predicate, r.object, t));
	}
	for (let r of e.statementsMatching(null, null, n, t)) if (!r.predicate.sameTerm(Ft("rest"))) {
		e.remove(r);
		let n = new xe();
		e.add(new De(r.subject, r.predicate, n, t));
	}
}
function Rt(e, t) {
	function n(r, i, a) {
		let o = e.statementsMatching(r, Ft("rest"), null, t);
		if (o.length !== 1) throw Error(`Bad list structure: no rest at ${r}`);
		let s = e.statementsMatching(r, Ft("first"), null, t);
		if (s.length !== 1) throw Error(`Bad list structure: rest but ${s.length} firsts at ${r}`);
		let c = [s[0].object].concat(i), l = a.concat(o).concat(s), u = e.statementsMatching(null, Ft("rest"), r, t);
		if (u.length === 0) {
			let n = new xe(c);
			e.remove(l), It(e, n, r, t);
			return;
		}
		if (u.length !== 1) throw Error(`Bad list structure: ${u.length} pres at ${r}`);
		let d = u[0].subject;
		if (d.termType !== "BlankNode") throw Error(`Bad list element node ${d} type: ${d.termType} `);
		n(d, c, l);
	}
	Lt(e, t), e.statementsMatching(null, Ft("rest"), Ft("nil"), t).forEach((e) => {
		if (e.subject.termType !== "BlankNode") throw Error(`Bad list element node ${e.subject} type: ${e.subject.termType} `);
		n(e.subject, [], []);
	});
}
// node_modules/rdflib/esm/n3parser.js
function zt(e) {
	return encodeURI(e);
}
var Bt = {
	encode: function(e) {
		e = e.replace(/\r\n/g, "\n");
		for (var t = "", n = 0; n < e.length; n++) {
			var r = e.charCodeAt(n);
			r < 128 ? t += String.fromCharCode(r) : r > 127 && r < 2048 ? (t += String.fromCharCode(r >> 6 | 192), t += String.fromCharCode(r & 63 | 128)) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128), t += String.fromCharCode(r & 63 | 128));
		}
		return t;
	},
	decode: function(e) {
		for (var t = "", n = 0; n < e.length;) {
			var r = e.charCodeAt(n);
			r < 128 ? (t += String.fromCharCode(r), n++) : r > 191 && r < 224 ? (t += String.fromCharCode((r & 31) << 6 | e.charCodeAt(n + 1) & 63), n += 2) : (t += String.fromCharCode((r & 15) << 12 | (e.charCodeAt(n + 1) & 63) << 6 | e.charCodeAt(n + 2) & 63), n += 3);
		}
		return t;
	}
}, Vt = "http://www.w3.org/2000/10/swap/log#", Ht = function(e) {
	return e;
}, Ut = function(e) {
	return e;
}, Wt = function(e) {
	if (e.length > 0) throw "missing.js: oops nnonempty dict not imp";
	return [];
}, Gt = function(e) {
	return e.length;
}, Kt = function(e, t, n) {
	if (e.slice === void 0) throw "@@ mising.js: No .slice function for " + e + " of type " + typeof e;
	return n === void 0 || n == null ? e.slice(t) : e.slice(t, n);
}, qt = Error("dummy error stop iteration"), Jt = function(e) {
	return this.last = 0, this.li = e, this.next = function() {
		if (this.last == this.li.length) throw qt;
		return this.li[this.last++];
	}, this;
}, Yt = function(e, t) {
	return e.indexOf(t);
}, Xt = function(e, t) {
	if (!e) throw t ? "python Assertion failed: " + t : "(python) Assertion failed.";
}, Zt = function(e) {
	return String.fromCharCode(e);
};
String.prototype.encode = function(e) {
	if (e != "utf-8") throw "UTF8_converter: can only do utf-8";
	return Bt.encode(this);
}, String.prototype.decode = function(e) {
	if (e != "utf-8") throw "UTF8_converter: can only do utf-8";
	return this;
};
var Qt = function(e, t) {
	return Ne(t, e);
}, $t = null, en = 0, tn = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", nn = "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil", rn = "http://www.w3.org/2002/07/owl#sameAs", an = "#", on = "http://www.w3.org/2001/XMLSchema#integer", sn = "http://www.w3.org/2001/XMLSchema#double", cn = "http://www.w3.org/2001/XMLSchema#decimal", ln = "http://www.w3.org/2001/XMLSchema#date", un = "http://www.w3.org/2001/XMLSchema#dateTime", dn = "	\r\n !\"#$%&'()*.,+/;<=>?@[\\]^`{|}~", fn = dn + ":", pn = /* @__PURE__ */ RegExp("^([-+]?[0-9]+)(\\.[0-9]+)?([eE][-+]?[0-9]+)?", "g"), mn = /* @__PURE__ */ RegExp("^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9](T[0-9][0-9]:[0-9][0-9](:[0-9][0-9](\\.[0-9]*)?)?)?Z?"), hn = /* @__PURE__ */ RegExp("[\\s#]"), gn = /* @__PURE__ */ RegExp("[\\\\\\r\\n\\\"]", "g"), _n = /* @__PURE__ */ RegExp("^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*", "g");
function vn(e, t) {
	var n = e.charAt(t + 1);
	return n === "" || hn.test(n);
}
function yn(e, t, n, r, i, a, o, s) {
	return new bn(e, t, n, r, i, a, o, s);
}
var bn = class {
	constructor(e, t, n, r, i, a, o, s) {
		t === void 0 && (t = null), n === void 0 && (n = ""), r === void 0 && (r = null), i === void 0 && (i = ""), a === void 0 && (a = null), o === void 0 && (o = ""), s === void 0 && (s = null), this._bindings = new Wt([]), this._flags = o, n != "" && (Xt(n.indexOf(":") >= 0, "Document URI not absolute: " + n), this._bindings[""] = n + "#"), this._store = e, i && e.setGenPrefix(i), this._thisDoc = n, this.source = e.sym(n), this.lines = 0, this.statementCount = 0, this.hasNil = !1, this.startOfLine = 0, this.previousLine = 0, this._genPrefix = i, this.keywords = new Ut([
			"a",
			"this",
			"bind",
			"has",
			"is",
			"of",
			"true",
			"false"
		]), this.keywordsSet = 0, this._anonymousNodes = new Wt([]), this._variables = new Wt([]), this._parentVariables = new Wt([]), this._reason = s, this._reason2 = null, this._baseURI = r || n || null, Xt(!this._baseURI || this._baseURI.indexOf(":") >= 0), this._genPrefix ||= this._thisDoc ? this._thisDoc + "#_g" : RDFSink_uniqueURI(), this._formula = t ?? (this._thisDoc ? e.formula(n + "#_formula") : e.formula()), this._context = this._formula, this._parentContext = null;
	}
	here(e) {
		return this._genPrefix + "_L" + this.lines + "C" + (e - this.startOfLine + 1);
	}
	formula() {
		return this._formula;
	}
	loadStream(e) {
		return this.loadBuf(e.read());
	}
	loadBuf(e) {
		return this.startDoc(), this.feed(e), this.endDoc();
	}
	feed(e) {
		for (var t = e.decode("utf-8"), n = 0; n >= 0;) {
			var r = this.skipSpace(t, n);
			if (r < 0) return;
			var n = this.directiveOrStatement(t, r);
			if (n < 0) throw B(this._thisDoc, this.lines, t, r, "expected directive or statement");
		}
	}
	directiveOrStatement(e, t) {
		var n = this.skipSpace(e, t);
		if (n < 0) return n;
		var r = this.directive(e, n);
		if (r >= 0) return this.checkDot(e, r);
		var r = this.statement(e, n);
		return r >= 0 ? this.checkDot(e, r) : r;
	}
	tok(e, t, n) {
		if (t.slice(n, n + 1) == "@") var n = n + 1;
		else if (wt(this.keywords, e) < 0) return -1;
		var r = n + Gt(e);
		return t.slice(n, r) == e && dn.indexOf(t.charAt(r)) >= 0 ? r : -1;
	}
	directive(e, t) {
		var n = this.skipSpace(e, t);
		if (n < 0) return n;
		var r = new Ut([]), n = this.tok("bind", e, t);
		if (n > 0) throw B(this._thisDoc, this.lines, e, t, "keyword bind is obsolete: use @prefix");
		var n = this.tok("keywords", e, t);
		if (n > 0) {
			var t = this.commaSeparatedList(e, n, r, !1);
			if (t < 0) throw B(this._thisDoc, this.lines, e, t, "'@keywords' needs comma separated list of words");
			return this.setKeywords(Kt(r, null, null)), en > 80 && this.keywords, t;
		}
		var n = this.tok("forAll", e, t);
		if (n > 0) {
			var t = this.commaSeparatedList(e, n, r, !0);
			if (t < 0) throw B(this._thisDoc, this.lines, e, t, "Bad variable list after @forAll");
			var i = new Jt(r);
			try {
				for (;;) {
					var a = i.next();
					(wt(this._variables, a) < 0 || wt(this._parentVariables, a) >= 0) && (this._variables[a] = this._context.newUniversal(a));
				}
			} catch (e) {
				if (e != qt) throw e;
			}
			return t;
		}
		var n = this.tok("forSome", e, t);
		if (n > 0) {
			var t = this.commaSeparatedList(e, n, r, this.uri_ref2);
			if (t < 0) throw B(this._thisDoc, this.lines, e, t, "Bad variable list after @forSome");
			var i = new Jt(r);
			try {
				for (;;) {
					var a = i.next();
					this._context.declareExistential(a);
				}
			} catch (e) {
				if (e != qt) throw e;
			}
			return t;
		}
		var n = this.tok("prefix", e, t);
		if (n >= 0) {
			var o = new Ut([]), t = this.qname(e, n, o);
			if (t < 0) throw B(this._thisDoc, this.lines, e, n, "expected qname after @prefix");
			var n = this.uri_ref2(e, t, o);
			if (n < 0) throw B(this._thisDoc, this.lines, e, t, "expected <uriref> after @prefix _qname_");
			var s = o[1].uri;
			if (this._baseURI) var s = Qt(this._baseURI, s);
			else Xt(s.indexOf(":") >= 0, "With no base URI, cannot handle relative URI for NS");
			return Xt(s.indexOf(":") >= 0), this._bindings[o[0][0]] = s, this.bind(o[0][0], zt(s)), n;
		}
		var n = this.tok("base", e, t);
		if (n >= 0) {
			var o = new Ut([]), t = this.uri_ref2(e, n, o);
			if (t < 0) throw B(this._thisDoc, this.lines, e, n, "expected <uri> after @base ");
			var s = o[0].uri;
			if (this._baseURI) var s = Qt(this._baseURI, s);
			else throw B(this._thisDoc, this.lines, e, n, "With no previous base URI, cannot use relative URI in @base  <" + s + ">");
			return Xt(s.indexOf(":") >= 0), this._baseURI = s, t;
		}
		return -1;
	}
	bind(e, t) {
		e == "" || this._store.setPrefixForURI(e, t);
	}
	setKeywords(e) {
		e == null ? this.keywordsSet = 0 : (this.keywords = e, this.keywordsSet = 1);
	}
	startDoc() {}
	endDoc() {
		return this.hasNil && this._store.rdfFactory.supports.COLLECTIONS && Rt(this._store, this.source), this._formula;
	}
	makeStatement(e) {
		e[0].add(e[2], e[1], e[3], this.source), (e[2].uri && e[2].uri === nn || e[3].uri && e[3].uri === nn) && (this.hasNil = !0), this.statementCount += 1;
	}
	statement(e, t) {
		var n = new Ut([]), t = this.object(e, t, n);
		if (t < 0) return t;
		var r = this.property_list(e, t, n[0]);
		if (r < 0) throw B(this._thisDoc, this.lines, e, t, "expected propertylist");
		return r;
	}
	subject(e, t, n) {
		return this.item(e, t, n);
	}
	verb(e, t, n) {
		var r = this.skipSpace(e, t);
		if (r < 0) return r;
		var i = new Ut([]), r = this.tok("has", e, t);
		if (r >= 0) {
			var t = this.prop(e, r, i);
			if (t < 0) throw B(this._thisDoc, this.lines, e, r, "expected property after 'has'");
			return n.push(new Ht(["->", i[0]])), t;
		}
		var r = this.tok("is", e, t);
		if (r >= 0) {
			var t = this.prop(e, r, i);
			if (t < 0) throw B(this._thisDoc, this.lines, e, r, "expected <property> after 'is'");
			var r = this.skipSpace(e, t);
			if (r < 0) throw B(this._thisDoc, this.lines, e, t, "End of file found, expected property after 'is'");
			var t = r, r = this.tok("of", e, t);
			if (r < 0) throw B(this._thisDoc, this.lines, e, t, "expected 'of' after 'is' <prop>");
			return n.push(new Ht(["<-", i[0]])), r;
		}
		var r = this.tok("a", e, t);
		if (r >= 0) return n.push(new Ht(["->", this._store.sym(tn)])), r;
		if (e.slice(t, t + 2) == "<=") return n.push(new Ht(["<-", this._store.sym(Vt + "implies")])), t + 2;
		if (e.slice(t, t + 1) == "=") return e.slice(t + 1, t + 2) == ">" ? (n.push(new Ht(["->", this._store.sym(Vt + "implies")])), t + 2) : (n.push(new Ht(["->", this._store.sym(rn)])), t + 1);
		if (e.slice(t, t + 2) == ":=") return n.push(new Ht(["->", Vt + "becomes"])), t + 2;
		var r = this.prop(e, t, i);
		if (r >= 0) return n.push(new Ht(["->", i[0]])), r;
		if (e.slice(t, t + 2) == ">-" || e.slice(t, t + 2) == "<-") throw B(this._thisDoc, this.lines, e, r, ">- ... -> syntax is obsolete.");
		return -1;
	}
	prop(e, t, n) {
		return this.item(e, t, n);
	}
	item(e, t, n) {
		return this.path(e, t, n);
	}
	blankNode(e) {
		return this._context.bnode(e, this._reason2);
	}
	path(e, t, n) {
		var r = this.nodeOrLiteral(e, t, n);
		if (r < 0) return r;
		for (; "!^.".indexOf(e.slice(r, r + 1)) >= 0;) {
			var i = e.slice(r, r + 1);
			if (i == "." && vn(e, r)) break;
			var a = n.pop(), o = this.blankNode(this.here(r)), r = this.node(e, r + 1, n);
			if (r < 0) throw B(this._thisDoc, this.lines, e, r, "EOF found in middle of path syntax");
			var s = n.pop();
			i == "^" ? this.makeStatement(new Ht([
				this._context,
				s,
				o,
				a
			])) : this.makeStatement(new Ht([
				this._context,
				s,
				a,
				o
			])), n.push(o);
		}
		return r;
	}
	anonymousNode(e) {
		var t = this._anonymousNodes[e];
		if (t) return t;
		var t = this._store.bnode(e);
		return this._anonymousNodes[e] = t, t;
	}
	node(e, t, n, r) {
		r === void 0 && (r = null);
		var i = r, a = this.skipSpace(e, t);
		if (a < 0) return a;
		var t = a, o = e.slice(t, t + 1);
		if (o == "[") {
			var s = this.here(t), a = this.skipSpace(e, t + 1);
			if (a < 0) throw B(this._thisDoc, this.lines, e, t, "EOF after '['");
			if (e.slice(a, a + 1) == "=") {
				var t = a + 1, c = new Ut([]), a = this.objectList(e, t, c);
				if (a >= 0) {
					var i = c[0];
					if (Gt(c) > 1) {
						var l = new Jt(c);
						try {
							for (;;) {
								var u = l.next();
								this.makeStatement(new Ht([
									this._context,
									this._store.sym(rn),
									i,
									u
								]));
							}
						} catch (e) {
							if (e != qt) throw e;
						}
					}
					var a = this.skipSpace(e, a);
					if (a < 0) throw B(this._thisDoc, this.lines, e, t, "EOF when objectList expected after [ = ");
					if (e.slice(a, a + 1) == ";") var a = a + 1;
				} else throw B(this._thisDoc, this.lines, e, t, "objectList expected after [= ");
			}
			if (i == null) var i = this.blankNode(s);
			var t = this.property_list(e, a, i);
			if (t < 0) throw B(this._thisDoc, this.lines, e, a, "property_list expected");
			var a = this.skipSpace(e, t);
			if (a < 0) throw B(this._thisDoc, this.lines, e, t, "EOF when ']' expected after [ <propertyList>");
			if (e.slice(a, a + 1) == ".") return n.push(i), a;
			if (e.slice(a, a + 1) != "]") throw B(this._thisDoc, this.lines, e, a, "']' expected");
			return n.push(i), a + 1;
		}
		if (o == "{") {
			var d = e.slice(t + 1, t + 2);
			if (d == "$") {
				t += 1;
				for (var a = t + 1, f = new Ut([]), p = !0;;) {
					var t = this.skipSpace(e, a);
					if (t < 0) throw B(this._thisDoc, this.lines, e, t, "needed '$}', found end.");
					if (e.slice(t, t + 2) == "$}") {
						var a = t + 2;
						break;
					}
					if (p) var p = !1;
					else if (e.slice(t, t + 1) == ",") t += 1;
					else throw B(this._thisDoc, this.lines, e, t, "expected: ','");
					var m = new Ut([]), a = this.item(e, t, m);
					if (a < 0) throw B(this._thisDoc, this.lines, e, t, "expected item in set or '$}'");
					f.push(m[0]);
				}
				return n.push(this._store.newSet(f, this._context)), a;
			}
			var a = t + 1, h = this._parentContext;
			this._parentContext = this._context;
			var g = this._anonymousNodes, _ = this._parentVariables;
			this._parentVariables = this._variables, this._anonymousNodes = new Wt([]), this._variables = this._variables.slice();
			var v = this._reason2;
			if (this._reason2 = $t, i == null) var i = this._store.formula();
			for (this._context = i;;) {
				var t = this.skipSpace(e, a);
				if (t < 0) throw B(this._thisDoc, this.lines, e, t, "needed '}', found end.");
				if (e.slice(t, t + 1) == "}") {
					var a = t + 1;
					break;
				}
				var a = this.directiveOrStatement(e, t);
				if (a < 0) throw B(this._thisDoc, this.lines, e, t, "expected statement or '}'");
			}
			return this._anonymousNodes = g, this._variables = this._parentVariables, this._parentVariables = _, this._context = this._parentContext, this._reason2 = v, this._parentContext = h, n.push(i.close()), a;
		}
		if (o == "(") {
			var y = this._store.list, d = e.slice(t + 1, t + 2);
			if (d == "$") {
				var y = this._store.newSet;
				t += 1;
			}
			for (var a = t + 1, f = new Ut([]);;) {
				var t = this.skipSpace(e, a);
				if (t < 0) throw B(this._thisDoc, this.lines, e, t, "needed ')', found end.");
				if (e.slice(t, t + 1) == ")") {
					var a = t + 1;
					break;
				}
				var m = new Ut([]), a = this.item(e, t, m);
				if (a < 0) throw B(this._thisDoc, this.lines, e, t, "expected item in list or ')'");
				f.push(m[0]);
			}
			return n.push(y(f, this._context)), a;
		}
		var a = this.tok("this", e, t);
		if (a >= 0) throw B(this._thisDoc, this.lines, e, t, "Keyword 'this' was ancient N3. Now use @forSome and @forAll keywords.");
		var a = this.tok("true", e, t);
		if (a >= 0) return n.push(!0), a;
		var a = this.tok("false", e, t);
		if (a >= 0) return n.push(!1), a;
		if (i == null) {
			var a = this.uri_ref2(e, t, n);
			if (a >= 0) return a;
		}
		return -1;
	}
	property_list(e, t, n) {
		for (;;) {
			var r = this.skipSpace(e, t);
			if (r < 0) throw B(this._thisDoc, this.lines, e, t, "EOF found when expected verb in property list");
			if (e.slice(r, r + 2) == ":-") {
				var t = r + 2, i = new Ut([]), r = this.node(e, t, i, n);
				if (r < 0) throw B(this._thisDoc, this.lines, e, t, "bad {} or () or [] node after :- ");
				var t = r;
			} else {
				var t = r, a = new Ut([]), r = this.verb(e, t, a);
				if (r <= 0) return t;
				var o = new Ut([]), t = this.objectList(e, r, o);
				if (t < 0) throw B(this._thisDoc, this.lines, e, r, "objectList expected");
				var s = new Jt(o);
				try {
					for (;;) {
						var c = s.next(), l = a[0], u = l[0], d = l[1];
						u == "->" ? this.makeStatement(new Ht([
							this._context,
							d,
							n,
							c
						])) : this.makeStatement(new Ht([
							this._context,
							d,
							c,
							n
						]));
					}
				} catch (e) {
					if (e != qt) throw e;
				}
				var r = this.skipSpace(e, t);
				if (r < 0) throw B(this._thisDoc, this.lines, e, r, "EOF found in list of objects");
				if (e.slice(t, t + 1) != ";") return t;
				var t = t + 1;
			}
		}
	}
	commaSeparatedList(e, t, n, r) {
		var i = this.skipSpace(e, t);
		if (i < 0) throw B(this._thisDoc, this.lines, e, i, "EOF found expecting comma sep list");
		if (e.charAt(i) == ".") return t;
		if (r) var i = this.uri_ref2(e, i, n);
		else var i = this.bareWord(e, i, n);
		if (i < 0) return -1;
		for (;;) {
			var t = this.skipSpace(e, i);
			if (t < 0) return t;
			var a = e.slice(t, t + 1);
			if (a != ",") return a == "." ? t : -1;
			if (r) var i = this.uri_ref2(e, t + 1, n);
			else var i = this.bareWord(e, t + 1, n);
			if (i < 0) throw B(this._thisDoc, this.lines, e, i, "bad list content");
		}
	}
	objectList(e, t, n) {
		var t = this.object(e, t, n);
		if (t < 0) return -1;
		for (;;) {
			var r = this.skipSpace(e, t);
			if (r < 0) throw B(this._thisDoc, this.lines, e, r, "EOF found after object");
			if (e.slice(r, r + 1) != ",") return r;
			var t = this.object(e, r + 1, n);
			if (t < 0) return t;
		}
	}
	checkDot(e, t) {
		var n = this.skipSpace(e, t);
		if (n < 0) return n;
		if (e.slice(n, n + 1) == ".") return n + 1;
		if (e.slice(n, n + 1) == "}" || e.slice(n, n + 1) == "]") return n;
		throw B(this._thisDoc, this.lines, e, n, "expected '.' or '}' or ']' at end of statement");
	}
	uri_ref2(e, t, n) {
		var r = new Ut([]), i = this.qname(e, t, r);
		if (i >= 0) {
			var a = r[0], o = a[0], s = a[1];
			if (o == null) {
				Xt(0, "not used?");
				var c = this._baseURI + an;
			} else {
				var c = this._bindings[o];
				if (!c) {
					if (o == "_") return n.push(this.anonymousNode(s)), i;
					throw B(this._thisDoc, this.lines, e, t, "Prefix " + o + " not bound.");
				}
			}
			var l = this._store.sym(c + s);
			return wt(this._variables, l) >= 0 ? n.push(this._variables[l]) : n.push(l), i;
		}
		var t = this.skipSpace(e, t);
		if (t < 0) return -1;
		if (e.charAt(t) == "?") {
			var u = new Ut([]), i = this.variable(e, t, u);
			return i > 0 ? (n.push(u[0]), i) : -1;
		}
		if (e.charAt(t) == "<") {
			for (var t = t + 1, d = t; t < Gt(e);) {
				if (e.charAt(t) == ">") {
					var f = e.slice(d, t);
					if (this._baseURI) var f = Qt(this._baseURI, f);
					else Xt(f.indexOf(":") >= 0, "With no base URI, cannot deal with relative URIs");
					if (e.slice(t - 1, t) == "#" && Kt(f, -1, null) != "#") var f = f + "#";
					var l = this._store.sym(f);
					return wt(this._variables, l) >= 0 ? n.push(this._variables[l]) : n.push(l), t + 1;
				}
				var t = t + 1;
			}
			throw B(this._thisDoc, this.lines, e, i, "unterminated URI reference");
		}
		if (this.keywordsSet) {
			var u = new Ut([]), i = this.bareWord(e, t, u);
			if (i < 0) return -1;
			if (wt(this.keywords, u[0]) >= 0) throw B(this._thisDoc, this.lines, e, t, "Keyword \"" + u[0] + "\" not allowed here.");
			return n.push(this._store.sym(this._bindings[""] + u[0])), i;
		}
		return -1;
	}
	skipSpace(e, t) {
		for (var n = " \n\r	\f\v\xA0           ​\u2028\u2029　", r = t || 0; r < e.length; r++) {
			var i = e.charAt(r);
			if (n.indexOf(i) < 0) {
				if (e.charAt(r) === "#") for (;; r++) {
					if (r === e.length) return -1;
					if (e.charAt(r) === "\n") {
						this.lines += 1;
						break;
					}
				}
				else return r;
			} else e.charAt(r) === "\n" && (this.lines += 1);
		}
		return -1;
	}
	variable(e, t, n) {
		var r = this.skipSpace(e, t);
		if (r < 0 || e.slice(r, r + 1) != "?") return -1;
		var r = r + 1, t = r;
		if ("0123456789-".indexOf(e.charAt(r)) >= 0) throw B(this._thisDoc, this.lines, e, r, "Varible name can't start with '" + e.charAt(r) + "s'");
		for (; t < Gt(e) && fn.indexOf(e.charAt(t)) < 0;) var t = t + 1;
		if (this._parentContext == null) throw B(this._thisDoc, this.lines, e, r, "Can't use ?xxx syntax for variable in outermost level: " + e.slice(r - 1, t));
		return n.push(this._store.variable(e.slice(r, t))), t;
	}
	bareWord(e, t, n) {
		var r = this.skipSpace(e, t);
		if (r < 0) return -1;
		var i = e.charAt(r);
		if ("0123456789-".indexOf(i) >= 0 || fn.indexOf(i) >= 0) return -1;
		for (var t = r; t < Gt(e);) {
			var a = e.charAt(t);
			if (a === ".") {
				if (vn(e, t)) break;
			} else if (fn.indexOf(a) >= 0) break;
			var t = t + 1;
		}
		return n.push(e.slice(r, t)), t;
	}
	qname(e, t, n) {
		var t = this.skipSpace(e, t);
		if (t < 0) return -1;
		var r = e.charAt(t);
		if ("0123456789-+".indexOf(r) >= 0) return -1;
		if (fn.indexOf(r) < 0) for (var i = r, t = t + 1; t < Gt(e);) {
			var r = e.charAt(t);
			if (r === ".") {
				if (vn(e, t)) break;
			} else if (fn.indexOf(r) >= 0) break;
			var i = i + r, t = t + 1;
		}
		else var i = "";
		if (t < Gt(e) && e.charAt(t) == ":") {
			for (var a = i, t = t + 1, i = ""; t < Gt(e);) {
				var r = e.charAt(t);
				if (r === ".") {
					if (vn(e, t)) break;
				} else if (fn.indexOf(r) >= 0) break;
				var i = i + r, t = t + 1;
			}
			return n.push(new Ht([a, i])), t;
		}
		return i && this.keywordsSet && wt(this.keywords, i) < 0 ? (n.push(new Ht(["", i])), t) : -1;
	}
	object(e, t, n) {
		var r = this.subject(e, t, n);
		if (r >= 0) return r;
		{
			var r = this.skipSpace(e, t);
			if (r < 0) return -1;
			var t = r, i = null;
			let s = e.charAt(t);
			if (s == "\"" || s == "'") {
				i = e.slice(t, t + 3 == s + s) ? s + s + s : s;
				var t = t + Gt(i), a = this.strconst(e, t, i), r = a[0], o = a[1];
				return n.push(this._store.literal(o)), r;
			}
			return -1;
		}
	}
	nodeOrLiteral(e, t, n) {
		var r = this.node(e, t, n);
		if (r >= 0) return r;
		var r = this.skipSpace(e, t);
		if (r < 0) return -1;
		var t = r, i = e.charAt(t);
		if ("-+0987654321".indexOf(i) >= 0) {
			mn.lastIndex = 0;
			var a = mn.exec(e.slice(t));
			if (a != null) {
				var o = a[0];
				r = t + o.length, o.indexOf("T") >= 0 ? n.push(this._store.literal(o, this._store.sym(un))) : n.push(this._store.literal(o, this._store.sym(ln)));
			} else {
				pn.lastIndex = 0;
				var a = pn.exec(e.slice(t));
				if (a == null) throw B(this._thisDoc, this.lines, e, t, "Bad number or date syntax");
				r = t + pn.lastIndex;
				var o = e.slice(t, r);
				o.indexOf("e") >= 0 ? n.push(this._store.literal(parseFloat(o), this._store.sym(sn))) : e.slice(t, r).indexOf(".") >= 0 ? n.push(this._store.literal(parseFloat(o), this._store.sym(cn))) : n.push(this._store.literal(parseInt(o), this._store.sym(on)));
			}
			return r;
		}
		if (e.charAt(t) == "\"") {
			if (e.slice(t, t + 3) == "\"\"\"") var s = "\"\"\"";
			else var s = "\"";
			var t = t + Gt(s), c = null, l = this.strconst(e, t, s), r = l[0], u = l[1], d = null;
			if (e.slice(r, r + 1) == "@") {
				_n.lastIndex = 0;
				var a = _n.exec(e.slice(r + 1));
				if (a == null) throw B(this._thisDoc, startline, e, t, "Bad language code syntax on string literal, after @");
				var t = _n.lastIndex + r + 1, d = e.slice(r + 1, t), r = t;
			}
			if (e.slice(r, r + 2) == "^^") var f = new Ut([]), r = this.uri_ref2(e, r + 2, f), c = f[0];
			return n.push(this._store.literal(u, d || c)), r;
		}
		return -1;
	}
	strconst(e, t, n) {
		for (var r = t, i = "", a = this.lines; r < Gt(e);) {
			var t = r + Gt(n);
			if (e.slice(r, t) == n) return new Ht([t, i]);
			if (e.charAt(r) == "\"") var i = i + "\"", r = r + 1;
			else {
				if (gn.lastIndex = 0, !gn.exec(e.slice(r))) throw B(this._thisDoc, a, e, r, "Closing quote missing in string at ^ in " + e.slice(r - 20, r) + "^" + e.slice(r, r + 20));
				var t = r + gn.lastIndex - 1, i = i + e.slice(r, t), o = e.charAt(t);
				if (o == "\"") var r = t;
				else if (o == "\r") var r = t + 1;
				else if (o == "\n") {
					if (n == "\"") throw B(this._thisDoc, a, e, t, "newline found in string literal");
					this.lines += 1;
					var i = i + o, r = t + 1;
					this.previousLine = this.startOfLine, this.startOfLine = r;
				} else if (o == "\\") {
					var r = t + 1, o = e.slice(r, r + 1);
					if (!o) throw B(this._thisDoc, a, e, t, "unterminated string literal (2)");
					var s = Yt("abfrtvn\\\"", o);
					if (s >= 0) var i = i + "a\b\f\r	\v\n\\\"".charAt(s), r = r + 1;
					else if (o == "u") var c = this.uEscape(e, r + 1, a), r = c[0], o = c[1], i = i + o;
					else if (o == "U") var c = this.UEscape(e, r + 1, a), r = c[0], o = c[1], i = i + o;
					else throw B(this._thisDoc, this.lines, e, t, "bad escape");
				}
			}
		}
		throw B(this._thisDoc, this.lines, e, t, "unterminated string literal");
	}
	uEscape(e, t, n) {
		for (var r = t, i = 0, a = 0; i < 4;) {
			var o = e.slice(r, r + 1).toLowerCase(), r = r + 1;
			if (o == "") throw B(this._thisDoc, n, e, t, "unterminated string literal(3)");
			var s = Yt("0123456789abcdef", o);
			if (s < 0) throw B(this._thisDoc, n, e, t, "bad string literal hex escape");
			var a = a * 16 + s, i = i + 1;
		}
		return new Ht([r, String.fromCharCode(a)]);
	}
	UEscape(e, t, n) {
		for (var r = t, i = 0, a = "\\U"; i < 8;) {
			var o = e.slice(r, r + 1).toLowerCase(), r = r + 1;
			if (o == "") throw B(this._thisDoc, n, e, t, "unterminated string literal(3)");
			if (Yt("0123456789abcdef", o) < 0) throw B(this._thisDoc, n, e, t, "bad string literal hex escape");
			var a = a + o, i = i + 1;
		}
		return new Ht([r, Zt("0x" + Kt(a, 2, 10) - 0)]);
	}
};
function xn(e, t, n, r, i) {
	this._str = n.encode("utf-8"), this._str = n, this._i = r, this._why = i, this.lines = t, this._uri = e;
}
xn.prototype.toString = function() {
	var e = this._str, t = this._i, n = 0;
	if (t > 60) var r = "...", n = t - 60;
	else var r = "";
	if (Gt(e) - t > 60) var i = "...";
	else var i = "";
	return "Line %i of <%s>: Bad syntax (%s) at ^ in:\n\"%s%s^%s%s\"" % new Ht([
		this.lines + 1,
		this._uri,
		this._why,
		r,
		e.slice(n, t),
		e.slice(t, t + 60),
		i
	]);
};
function B(e, t, n, r, i) {
	let a = t + 1, o = "Line " + a + " of <" + e + ">: Bad syntax: " + i + "\nat: \"" + n.slice(r, r + 30) + "\"", s = SyntaxError(o, e, a);
	return s.lineNo = a, s.characterInFile = r, s.syntaxProblem = i, s;
}
// node_modules/rdflib/esm/factories/extended-term-factory.js
var Sn = {
	...ze,
	supports: {
		[Le.collections]: !0,
		[Le.defaultGraphType]: !1,
		[Le.equalsMethod]: !0,
		[Le.identity]: !1,
		[Le.id]: !0,
		[Le.reversibleId]: !1,
		[Le.variableType]: !0
	},
	collection(e) {
		return new xe(e);
	},
	id(e) {
		return F(e) ? xe.toNT(e) : le(e) ? Ie.toString(e) : ze.id(e);
	},
	termToNQ(e) {
		return e.termType === "Collection" ? xe.toNT(e) : ze.termToNQ(e);
	}
};
// node_modules/rdflib/esm/jsonldparser.js
function Cn(e, t) {
	return typeof t == "string" ? e.rdfFactory.literal(t) : Object.prototype.hasOwnProperty.call(t, "@list") ? e.rdfFactory.supports.COLLECTIONS === !0 ? Tn(e, t["@list"]) : wn(e, t) : Object.prototype.hasOwnProperty.call(t, "@id") ? Dn(e, t) : Object.prototype.hasOwnProperty.call(t, "@language") ? e.rdfFactory.literal(t["@value"], t["@language"]) : Object.prototype.hasOwnProperty.call(t, "@type") ? e.rdfFactory.literal(t["@value"], e.rdfFactory.namedNode(t["@type"])) : Object.prototype.hasOwnProperty.call(t, "@value") ? e.rdfFactory.literal(t["@value"]) : e.rdfFactory.literal(t);
}
function wn(e, t) {
	let n = t["@id"] ? Dn(e, t) : e.rdfFactory.blankNode(), r = t["@list"].map((t) => Cn(e, t)), i = Ct(e.rdfFactory, n, r);
	return e.addAll(i), n;
}
function Tn(e, t) {
	if (!Array.isArray(t)) throw TypeError("Object must be an array");
	return e.rdfFactory.collection(t.map((t) => Cn(e, t)));
}
async function En(e, t, n) {
	let r = n && Object.prototype.hasOwnProperty.call(n, "termType") ? n.value : n, i = await import("./jsonld-C6IOQ1Tg.js").then((e) => /* @__PURE__ */ u(e.default));
	return (await (i.default || i).flatten(JSON.parse(e), null, { base: r })).reduce((e, t) => On(e, n, t), t);
}
function Dn(e, t) {
	return t["@id"].startsWith("_:") ? e.rdfFactory.blankNode(t["@id"].substring(2)) : e.rdfFactory.namedNode(t["@id"]);
}
function On(e, t, n) {
	let r = n["@id"] ? Dn(e, n) : e.rdfFactory.blankNode();
	for (let i of Object.keys(n)) {
		if (i === "@id") continue;
		if (i == "@graph") {
			let t = r, a = n[i];
			for (let n = 0; n < a.length; n++) e = On(e, t, a[n]);
		}
		let a = n[i];
		if (Array.isArray(a)) for (let n = 0; n < a.length; n++) e.addStatement(kn(e, r, i, a[n], t));
		else e.addStatement(kn(e, r, i, a, t));
	}
	return e;
}
function kn(e, t, n, r, i) {
	let a, o;
	return n === "@type" ? (a = e.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), o = e.rdfFactory.namedNode(r)) : (a = e.rdfFactory.namedNode(n), o = Cn(e, r)), e.rdfFactory.quad(t, a, o, e.rdfFactory.namedNode(i));
}
// node_modules/n3/src/IRIs.js
var An = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", jn = "http://www.w3.org/2001/XMLSchema#", Mn = "http://www.w3.org/2000/10/swap/", Nn = {
	xsd: {
		decimal: `${jn}decimal`,
		boolean: `${jn}boolean`,
		dateTime: `${jn}dateTime`,
		double: `${jn}double`,
		integer: `${jn}integer`,
		string: `${jn}string`
	},
	rdf: {
		type: `${An}type`,
		nil: `${An}nil`,
		first: `${An}first`,
		rest: `${An}rest`,
		langString: `${An}langString`,
		dirLangString: `${An}dirLangString`,
		reifies: `${An}reifies`
	},
	owl: { sameAs: "http://www.w3.org/2002/07/owl#sameAs" },
	r: {
		forSome: `${Mn}reify#forSome`,
		forAll: `${Mn}reify#forAll`
	},
	log: {
		implies: `${Mn}log#implies`,
		isImpliedBy: `${Mn}log#isImpliedBy`
	}
}, { xsd: Pn } = Nn, Fn = 32, In = 9, Ln = 10, Rn = 13, zn = 35, Bn = 46, Vn = 58, Hn = 48, Un = 57, Wn = 37, Gn = 92;
function Kn(e) {
	return e === Fn || e >= In && e <= Rn || e >= 160 && (e === 160 || e === 5760 || e >= 8192 && e <= 8202 || e === 8232 || e === 8233 || e === 8239 || e === 8287 || e === 12288 || e === 65279);
}
var qn = /* @__PURE__ */ new Uint8Array(128);
for (let e of ",;!^#()[]{}\"'<> 	\n\v\f\r") qn[e.charCodeAt(0)] = 1;
function Jn(e) {
	return e < 128 ? qn[e] === 1 : Kn(e);
}
function V(e, t, n) {
	let r = e.charCodeAt(t);
	return r === Bn && (r = e.charCodeAt(++t)), t >= e.length ? n : Jn(r);
}
var H = {
	"\\": "\\",
	"'": "'",
	"\"": "\"",
	n: "\n",
	r: "\r",
	t: "	",
	f: "\f",
	b: "\b"
}, Yn = {
	_: "_",
	"~": "~",
	".": ".",
	"-": "-",
	"!": "!",
	$: "$",
	"&": "&",
	"'": "'",
	"(": "(",
	")": ")",
	"*": "*",
	"+": "+",
	",": ",",
	";": ";",
	"=": "=",
	"/": "/",
	"?": "?",
	"#": "#",
	"@": "@",
	"%": "%"
}, Xn = /[\x00-\x20<>\\"\{\}\|\^\`]/, Zn = 1, U = 2, Qn = 4, $n = 8, W = 16, G = /* @__PURE__ */ new Uint8Array(128);
for (let e = 0; e < 128; e++) {
	let t = String.fromCharCode(e), n = t >= "A" && t <= "Z" || t >= "a" && t <= "z", r = n || t === "_" || t === "-" || t >= "0" && t <= "9";
	G[e] = (n ? Zn : 0) | (r && t !== "-" || t === ":" ? U : 0) | (r ? Qn : 0) | (r || t === ":" ? $n : 0) | (t in Yn ? W : 0);
}
function er(e, t, n) {
	let r = e.charCodeAt(t);
	if (r < 128) return (G[r] & n) === 0 ? 0 : 1;
	if (r >= 55296 && r <= 56191) {
		let n = e.charCodeAt(t + 1);
		return n >= 56320 && n <= 57343 ? 2 : 0;
	}
	return n >= Qn && (r === 183 || r >= 768 && r <= 879 || r === 8255 || r === 8256) ? 1 : +(r >= 192 && r <= 8191 && r !== 215 && r !== 247 && (r < 768 || r >= 880 && r !== 894) || r >= 8204 && r <= 8205 || r >= 8304 && r <= 8591 || r >= 11264 && r <= 12271 || r >= 12289 && r <= 55295 || r >= 63744 && r <= 64975 || r >= 65008 && r <= 65533);
}
function tr(e) {
	return e < 128 && (G[e] & W) !== 0;
}
function nr(e) {
	return e >= Hn && e <= Un || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function K(e, t) {
	let n = er(e, t, Zn);
	for (; n !== 0;) {
		t += n;
		let r = e.charCodeAt(t) === Bn ? t + 1 : t, i = e.charCodeAt(r);
		n = i < 128 ? (G[i] & Qn) === 0 ? 0 : 1 : er(e, r, Qn), n !== 0 && (t = r);
	}
	return t;
}
function rr(e, t) {
	let n = t, r = U;
	for (;;) {
		let i = e.charCodeAt(t), a = i < 128 ? (G[i] & r) === 0 ? 0 : 1 : er(e, t, r);
		if (a === 0 && i === Wn && nr(e.charCodeAt(t + 1)) && nr(e.charCodeAt(t + 2)) ? a = 3 : a === 0 && i === Gn && tr(e.charCodeAt(t + 1)) && (a = 2), a !== 0) n = t += a, r = $n;
		else if (i === Bn && r === $n) t++;
		else return n;
	}
}
function ir(e, t, n) {
	let r = K(e, t);
	if (e.charCodeAt(r) !== Vn) return -1;
	let i = rr(e, r + 1);
	return V(e, i, n) ? i : -1;
}
function ar(e) {
	return e <= 1114111 && (e < 55296 || e > 57343);
}
var or = {
	_iri: !0,
	_unescapedIri: !0,
	_simpleQuotedString: !0,
	_langcode: !0,
	_blank: !0,
	_commentLine: !0,
	_whitespace: !0
}, sr = /$0^/, cr = /\S*/y;
function q(e, t, n) {
	return e.lastIndex = n, e.exec(t);
}
function lr(e, t, n) {
	return e.lastIndex = n, e.test(t);
}
function ur(e, t, n) {
	return e.lastIndex = 0, e.exec(`${t.slice(n)} `);
}
function dr(e) {
	return e === Fn || e === In || e === Ln || e === Rn || e === zn;
}
var fr = /^(?:prefix|base|version|graph|forsome|forall|iri|a|true|false|has|is|of|id)$/i, pr = 1024, mr = class {
	constructor(e) {
		if (this._iri = /<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/y, this._unescapedIri = /<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/y, this._simpleQuotedString = /"([^"\\\r\n]*)"(?=[^"])/y, this._simpleApostropheString = /'([^'\\\r\n]*)'(?=[^'])/y, this._langcode = /@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9])/iy, this._variable = /\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-9:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<>])/y, this._blank = /_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:!\^\s#()\[\]\{\}"'<>]))/y, this._number = /[\-+]?(?:(\d+\.\d*|\.?\d+)[eE][\-+]?\d+|(?=\.?\d)\d*(?:(\.)\d+)?)(?=\.?[,;:!\^\s#()\[\]\{\}"'<>])/y, this._boolean = /(?:true|false)(?=[.,;!\^\s#()\[\]\{\}"'<>])/y, this._atKeyword = /@[a-z]+(?=[\s#<:"'.])/iy, this._keyword = /(?:PREFIX|BASE|VERSION|GRAPH)(?=[\s#<"'])/iy, this._n3Verb = /(?:has|is|of)(?=[\s#()\[\]\{\}"'<>?_+\-0-9])/y, this._n3Id = /id(?=[\s#<])/y, this._shortPredicates = /a(?=[\s#()\[\]\{\}"'<>])/y, this._commentLine = /[ \t]*#([^\n\r]*)(?:\r\n|\n|\r)([ \t]*)/y, this._whitespace = /[ \t]+/y, e ||= {}, this._isImpliedBy = e.isImpliedBy, this._lineMode = !!e.lineMode) {
			this._n3Mode = !1;
			for (let e in this) !(e in or) && this[e] instanceof RegExp && (this[e] = sr);
			this._keyword = /VERSION(?=[\s#<"])/y;
		} else this._n3Mode = e.n3 !== !1;
		if (this._directive = null, e.directives && e.directives.length !== 0) {
			for (let t of e.directives) if (!/^[a-z]+$/i.test(t) || fr.test(t)) throw Error(`Invalid directive name: "${t}"`);
			this._directive = RegExp(`(?:${e.directives.join("|")})(?=[\\s#<])`, "iy"), this._directiveMaxLength = Math.max(...e.directives.map((e) => e.length)), this._directiveStarts = e.directives.map((e) => e[0].toLowerCase() + e[0].toUpperCase()).join("");
		}
		this.comments = !!e.comments, this._literalClosingPos = 0;
	}
	_tokenizeToEnd(e, t) {
		let n = this._input, r = 0, i = this._linePosition + n.length;
		for (;;) {
			for (;;) {
				let e = n.charCodeAt(r), o = 0;
				if (e === Fn || e === In) {
					let t = n.charCodeAt(r + 1);
					o = t === Fn || t === In ? q(this._whitespace, n, r)[0].length : 1, e = n.charCodeAt(r + o);
				}
				if (e === zn) {
					let e = q(this._commentLine, n, r);
					if (e) {
						let s = e[0].length;
						if (!t && r + s === n.length && n.charCodeAt(n.length - 1) === Rn) return this._suspend(n, r, i);
						this.comments && a(e[1], this._line, i - (n.length - r) + o), r += s, i = n.length - r + e[2].length, this._line++;
					} else {
						if (r += o, !t) return this._suspend(n, r, i);
						this.comments && a(n.slice(r + 1), this._line, i - (n.length - r)), r = n.length;
						break;
					}
				} else if (e === Ln || e === Rn) {
					if (!t && e === Rn && r + o + 1 === n.length) return this._suspend(n, r, i);
					o += e === Rn && n.charCodeAt(r + o + 1) === Ln ? 2 : 1;
					let a = 0, s = n.charCodeAt(r + o);
					if (s === Fn || s === In) {
						let e = n.charCodeAt(r + o + 1);
						a = e === Fn || e === In ? q(this._whitespace, n, r + o)[0].length : 1;
					}
					r += o + a, i = n.length - r + a, this._line++;
				} else {
					r += o;
					break;
				}
			}
			if (r >= n.length) return t && this._previousMarker === "^^" ? s(this, n, r) : (this._linePosition = i, t ? (o("eof", "", "", this._line, i, 0), this._input = null) : this._input = "");
			let c = this._line, l = n[r], u = "", d = "", f = "", p = null, m = 0, h = 0, g = 0, _ = !1, v = !1;
			switch (l) {
				case "^":
					if (this._previousMarker === "^^") return s(this, n, r);
					if (n.length - r < 3) break;
					if (n[r + 1] === "^") {
						if (this._previousMarker = "^^", r += 2, n[r] !== "<") {
							if (dr(n.charCodeAt(r))) continue;
							_ = !0;
							break;
						}
					} else {
						this._n3Mode && (m = 1, u = "^");
						break;
					}
				case "<":
					if (p = q(this._unescapedIri, n, r)) u = "IRI", d = p[1], h = p[1].length + 2;
					else if (p = q(this._iri, n, r)) {
						if (d = this._unescape(p[1], H), d === null || Xn.test(d)) return s(this, n, r);
						u = "IRI", h = p[1].length + 2;
					} else n.length - r > 2 && n[r + 1] === "<" && n[r + 2] === "(" ? (u = "<<(", m = 3) : !this._lineMode && n.length - r > (t ? 1 : 2) && n[r + 1] === "<" ? (u = "<<", m = 2) : this._n3Mode && n.length - r > 1 && n[r + 1] === "=" ? (m = 2, this._isImpliedBy ? (u = "abbreviation", d = "<") : (u = "inverse", d = ">")) : this._n3Mode && n.length - r > 1 && n[r + 1] === "-" && (u = "inversePredicate", m = 2);
					break;
				case ">":
					n.length - r > 1 && n[r + 1] === ">" && (u = ">>", m = 2);
					break;
				case "_":
					((p = q(this._blank, n, r)) || t && (p = ur(this._blank, n, r))) && (u = "blank", f = "_", d = p[1], h = p[1].length + 2);
					break;
				case "\"":
					if (p = q(this._simpleQuotedString, n, r)) d = p[1];
					else if ({value: d, matchLength: m, finalLineLength: g, tripleQuoted: v} = this._parseLiteral(n, r), d === null) return s(this, n, r);
					(p !== null || m !== 0) && (u = "literal", this._literalClosingPos = 0);
					break;
				case "'":
					if (!this._lineMode) {
						if (p = q(this._simpleApostropheString, n, r)) d = p[1];
						else if ({value: d, matchLength: m, finalLineLength: g, tripleQuoted: v} = this._parseLiteral(n, r), d === null) return s(this, n, r);
						(p !== null || m !== 0) && (u = "literal", this._literalClosingPos = 0);
					}
					break;
				case "?":
					this._n3Mode && (p = q(this._variable, n, r)) && (u = "var", d = p[0]);
					break;
				case "@":
					if (this._previousMarker === "literal" && (p = q(this._langcode, n, r)) && p[1] !== "version") {
						let e = r + p[0].length;
						!t && n[e] === "-" && n[e + 1] !== "-" ? p = null : (u = "langcode", d = p[1]);
					} else (p = q(this._atKeyword, n, r)) && (u = p[0]);
					break;
				case ".": if (n.length - r === 1 ? t : n[r + 1] < "0" || n[r + 1] > "9") {
					u = ".", m = 1;
					break;
				}
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
				case "+":
				case "-":
					if (n[r + 1] === "-") {
						this._previousMarker === "langcode" && (n.startsWith("--ltr", r) ? (u = "dircode", d = "ltr", m = 5) : n.startsWith("--rtl", r) && (u = "dircode", d = "rtl", m = 5));
						break;
					}
					(p = q(this._number, n, r) || t && (p = ur(this._number, n, r))) && (u = "literal", d = p[0], f = typeof p[1] == "string" ? Pn.double : typeof p[2] == "string" ? Pn.decimal : Pn.integer);
					break;
				case "B":
				case "b":
				case "p":
				case "P":
				case "G":
				case "g":
				case "V":
				case "v":
					(p = q(this._keyword, n, r)) ? u = p[0].toUpperCase() : _ = !0;
					break;
				case "f":
				case "t":
					lr(this._boolean, n, r) ? (u = "literal", d = l === "t" ? "true" : "false", f = Pn.boolean, m = d.length) : _ = !0;
					break;
				case "a":
					lr(this._shortPredicates, n, r) ? (u = "abbreviation", d = "a", m = 1) : _ = !0;
					break;
				case "h":
				case "o":
					this._n3Mode && (p = this._matchN3Verb(n, r, t)) ? u = p[0] : _ = !0;
					break;
				case "i":
					this._n3Mode && lr(this._n3Id, n, r) ? (u = "id", m = 2) : this._n3Mode && (p = this._matchN3Verb(n, r, t)) ? u = p[0] : _ = !0;
					break;
				case "=":
					this._n3Mode && n.length - r > 1 && (u = "abbreviation", n[r + 1] === ">" ? (m = 2, d = ">") : (m = 1, d = "="));
					break;
				case "!": if (!this._n3Mode) break;
				case ")":
					if (!t && (n.length - r === 1 || n.length - r === 2 && n[r + 1] === ">")) break;
					if (n.length - r > 2 && n[r + 1] === ">" && n[r + 2] === ">") {
						u = ")>>", m = 3;
						break;
					}
				case ",":
				case ";":
				case "[":
				case "]":
				case "(":
				case "}":
				case "~":
					this._lineMode || (m = 1, u = l);
					break;
				case "{":
					!this._lineMode && n.length - r >= 2 && (n[r + 1] === "|" ? (u = "{|", m = 2) : (u = l, m = 1));
					break;
				case "|":
					n.length - r >= 2 && n[r + 1] === "}" && (u = "|}", m = 2);
					break;
				default: _ = !0;
			}
			if (_) {
				let e;
				if ((this._previousMarker === "@prefix" || this._previousMarker === "PREFIX") && n.charCodeAt(e = K(n, r)) === Vn && e + 1 < n.length && (n[e + 1] === "#" || n[e + 1] === "<" || Kn(n.charCodeAt(e + 1)))) u = "prefix", d = n.slice(r, e), m = e + 1 - r;
				else if (this._directive !== null && this._directiveStarts.includes(l) && ((p = q(this._directive, n, r)) || t && n.length - r <= this._directiveMaxLength && (p = ur(this._directive, n, r)))) u = p[0].toUpperCase();
				else if (!this._lineMode && (e = ir(n, r, t)) >= 0) {
					let t = n.indexOf(":", r);
					u = "prefixed", f = n.slice(r, t), d = this._unescape(n.slice(t + 1, e), Yn), m = e - r;
				}
			}
			if (this._previousMarker === "^^") switch (u) {
				case "prefixed":
					u = "type";
					break;
				case "IRI":
					u = "typeIRI";
					break;
				default: u = "";
			}
			if (!u) return t || !n.startsWith("'''", r) && !n.startsWith("\"\"\"", r) && /\n|\r/.test(n.slice(r)) ? s(this, n, r) : this._suspend(n, r, i);
			let y = m || p[0].length, b = i - (n.length - r), x;
			g ? (x = {
				type: u,
				value: d,
				prefix: f,
				line: c,
				start: b,
				end: g,
				endLine: this._line,
				tripleQuoted: v
			}, e(null, x)) : v ? (x = {
				type: u,
				value: d,
				prefix: f,
				line: c,
				start: b,
				end: b + y,
				tripleQuoted: v
			}, e(null, x)) : x = o(u, d, f, c, b, h || y), this.previousToken = x, this._previousMarker = u === "literal" && (this._previousMarker === "VERSION" || this._previousMarker === "@version") ? "version" : u, r = Math.min(r + y, n.length), g && (i = n.length - r + g);
		}
		function a(t, n, r) {
			e(null, {
				type: "comment",
				value: t,
				prefix: "",
				line: n,
				start: r,
				end: r + t.length + 1
			});
		}
		function o(t, n, r, i, a, o) {
			let s = {
				type: t,
				value: n,
				prefix: r,
				line: i,
				start: a,
				end: a + o
			};
			return e(null, s), s;
		}
		function s(t, n, r) {
			e(t._syntaxError(q(cr, n, r)[0]));
		}
	}
	_suspend(e, t, n) {
		return this._linePosition = n - (e.length - t), this._input = e.slice(t);
	}
	_matchN3Verb(e, t, n) {
		let r = q(this._n3Verb, e, t);
		if (!r) return null;
		let i = e[t + r[0].length];
		return i !== "-" && i !== "_" && (i < "0" || i > "9") && i !== " " && i !== "﻿" ? r : ir(e, t, !0) >= 0 || !n && K(e, t) === e.length ? null : r;
	}
	_unescape(e, t) {
		let n = e.indexOf("\\");
		if (n < 0) return e;
		let r = "", i = 0;
		for (; n >= 0 && n + 1 < e.length;) {
			let a = e[n + 1], o = n + 2, s;
			if (a === "u" || a === "U") {
				if (o += a === "u" ? 4 : 8, o > e.length) return null;
				let t = 0;
				for (let r = n + 2; r < o; r++) {
					let n = e.charCodeAt(r);
					if (n >= 48 && n <= 57) n -= 48;
					else if (n >= 65 && n <= 70) n -= 55;
					else if (n >= 97 && n <= 102) n -= 87;
					else return null;
					t = t * 16 + n;
				}
				if (!ar(t)) return null;
				s = String.fromCodePoint(t);
			} else {
				if (!(a in t)) return null;
				s = t[a];
			}
			r += e.slice(i, n) + s, i = o, n = e.indexOf("\\", i);
		}
		return r + e.slice(i);
	}
	_parseLiteral(e, t) {
		if (e.length - t >= 3) {
			let n = e[t], r = e[t + 1] === n && e[t + 2] === n ? 3 : 1, i = n;
			r === 3 && (i = n === "\"" ? "\"\"\"" : "'''");
			let a = t + Math.max(this._literalClosingPos, r);
			for (; (a = e.indexOf(i, a)) > t;) {
				let n = 0;
				for (; e[a - n - 1] === "\\";) n++;
				if (n % 2 == 0) {
					let n = e.substring(t + r, a), i = n.split(/\r\n|\r|\n/), o = i.length - 1, s = a - t + r;
					if (r === 1 && o !== 0 || r === 3 && this._lineMode) break;
					this._line += o;
					let c = o === 0 ? 0 : i[i.length - 1].length + r;
					return {
						value: this._unescape(n, H),
						matchLength: s,
						finalLineLength: c,
						tripleQuoted: r === 3
					};
				}
				a++;
			}
			this._literalClosingPos = e.length - t - r + 1;
		}
		return {
			value: "",
			matchLength: 0,
			finalLineLength: 0,
			tripleQuoted: !1
		};
	}
	_tryTokenizeToEnd(e, t) {
		let n;
		try {
			this._tokenizeToEnd((t, r) => {
				try {
					return e(t, r);
				} catch (e) {
					throw n = e;
				}
			}, t);
		} catch (t) {
			if (t === n || !(t instanceof RangeError)) throw t;
			e(this._syntaxError(null, `Token too long on line ${this._line}.`));
		}
	}
	_syntaxError(e, t = `Unexpected "${e}" on line ${this._line}.`) {
		this._input = null;
		let n = Error(t);
		return n.context = {
			token: void 0,
			line: this._line,
			previousToken: this.previousToken
		}, n;
	}
	_startTokenization() {
		return this._line = 1, this._linePosition = 0, this._previousMarker = void 0, this.previousToken = void 0, this._literalClosingPos = 0, this._input = void 0, this._tokenization = {};
	}
	_tokenizeString(e, t) {
		this._startTokenization(), this._input = this._readStartingBom(e), this._tryTokenizeToEnd(t, !0);
	}
	_readStartingBom(e) {
		return e.startsWith("﻿") ? (this._linePosition = 1, e.slice(1)) : e;
	}
	tokenize(e, t) {
		let n = this._startTokenization();
		if (typeof e == "string") {
			if (this._input = this._readStartingBom(e), typeof t == "function") queueMicrotask(() => {
				this._tokenization === n && this._tryTokenizeToEnd(t, !0);
			});
			else {
				let e = [], t;
				if (this._tryTokenizeToEnd((n, r) => n ? t = n : e.push(r), !0), t) throw t;
				return e;
			}
		} else {
			let r, i = 0;
			typeof e.setEncoding == "function" && e.setEncoding("utf8"), e.on("data", (e) => {
				if (this._tokenization === n && this._input !== null && e.length !== 0) {
					if (typeof e != "string" && (r ||= new TextDecoder("utf-8", { ignoreBOM: !0 }), !(e = r.decode(e, { stream: !0 })))) return;
					this._input === void 0 ? this._input = this._readStartingBom(e) : this._input += e, this._input.length >= i && (this._tryTokenizeToEnd(t, !1), i = this._input !== null && this._input.length > pr ? 2 * this._input.length : 0);
				}
			}), e.on("end", () => {
				if (this._tokenization === n && this._input !== null) {
					let e = r ? r.decode() : "";
					e && (this._input = typeof this._input == "string" ? this._input + e : e), typeof this._input == "string" && this._tryTokenizeToEnd(t, !0);
				}
			}), e.on("error", (e) => {
				this._tokenization === n && t(e);
			});
		}
	}
}, { rdf: hr, xsd: gr } = Nn, _r, vr = 0, yr = "<>", br = {
	namedNode: Dr,
	blankNode: Or,
	variable: Ar,
	literal: kr,
	defaultGraph: jr,
	quad: Mr,
	triple: Mr,
	fromTerm: Nr,
	fromQuad: Pr
}, xr = class e {
	constructor(e) {
		this.id = e;
	}
	get value() {
		return this.id;
	}
	equals(t) {
		return t instanceof e ? this.id === t.id && this.termType === t.termType : !!t && this.termType === t.termType && this.value === t.value;
	}
	hashCode() {
		return 0;
	}
	toJSON() {
		return {
			termType: this.termType,
			value: this.value
		};
	}
}, Sr = class extends xr {
	constructor(e) {
		e === "" ? (super(yr), Object.defineProperty(this, "value", { value: "" })) : super(e);
	}
	get termType() {
		return "NamedNode";
	}
}, Cr = class e extends xr {
	constructor(e) {
		super(e);
	}
	get termType() {
		return "Literal";
	}
	get value() {
		return this.id.substring(1, this.id.lastIndexOf("\""));
	}
	get language() {
		let e = this.id, t = e.lastIndexOf("\"") + 1, n = e.lastIndexOf("--");
		return t < e.length && e[t++] === "@" ? (n > t ? e.substr(0, n) : e).substr(t).toLowerCase() : "";
	}
	get direction() {
		let e = this.id, t = e.lastIndexOf("\""), n = e[t + 1] === "@" ? e.lastIndexOf("--") : -1;
		return n > t && n + 2 < e.length ? e.substr(n + 2).toLowerCase() : "";
	}
	get datatype() {
		return new Sr(this.datatypeString);
	}
	get datatypeString() {
		let e = this.id, t = e.lastIndexOf("\"") + 1, n = t < e.length ? e[t] : "";
		return n === "^" ? e.substr(t + 2) : n === "@" ? e.indexOf("--", t) > 0 ? hr.dirLangString : hr.langString : gr.string;
	}
	equals(t) {
		return t instanceof e ? this.id === t.id : !!t && !!t.datatype && this.termType === t.termType && this.value === t.value && this.language === t.language && (this.direction === t.direction || this.direction === "" && !t.direction) && this.datatype.value === t.datatype.value;
	}
	toJSON() {
		return {
			termType: this.termType,
			value: this.value,
			language: this.language,
			direction: this.direction,
			datatype: {
				termType: "NamedNode",
				value: this.datatypeString
			}
		};
	}
}, wr = class extends xr {
	constructor(e) {
		super(`_:${e}`);
	}
	get termType() {
		return "BlankNode";
	}
	get value() {
		return this.id.substr(2);
	}
}, Tr = class extends xr {
	constructor(e) {
		super(`?${e}`);
	}
	get termType() {
		return "Variable";
	}
	get value() {
		return this.id.substr(1);
	}
};
_r = new class extends xr {
	constructor() {
		return super(""), _r || this;
	}
	get termType() {
		return "DefaultGraph";
	}
	equals(e) {
		return this === e || !!e && this.termType === e.termType;
	}
}();
var Er = class extends xr {
	constructor(e, t, n, r) {
		super(""), this._subject = e, this._predicate = t, this._object = n, this._graph = r || _r;
	}
	get termType() {
		return "Quad";
	}
	get subject() {
		return this._subject;
	}
	get predicate() {
		return this._predicate;
	}
	get object() {
		return this._object;
	}
	get graph() {
		return this._graph;
	}
	toJSON() {
		return {
			termType: this.termType,
			subject: this._subject.toJSON(),
			predicate: this._predicate.toJSON(),
			object: this._object.toJSON(),
			graph: this._graph.toJSON()
		};
	}
	equals(e) {
		return !!e && this._subject.equals(e.subject) && this._predicate.equals(e.predicate) && this._object.equals(e.object) && this._graph.equals(e.graph);
	}
};
function Dr(e) {
	return new Sr(e);
}
function Or(e) {
	return new wr(e || `n3-${vr++}`);
}
function kr(e, t) {
	if (typeof t == "string") return new Cr(`"${e}"@${t.toLowerCase()}`);
	if (t !== void 0 && !("termType" in t)) return new Cr(`"${e}"@${t.language.toLowerCase()}${t.direction ? `--${t.direction.toLowerCase()}` : ""}`);
	let n = t ? t.value : "";
	return n === "" && (typeof e == "boolean" ? n = gr.boolean : typeof e == "number" ? Number.isFinite(e) ? n = Number.isInteger(e) && Math.abs(e) < 1e21 ? gr.integer : gr.double : (n = gr.double, Number.isNaN(e) || (e = e > 0 ? "INF" : "-INF")) : typeof e == "bigint" ? n = gr.integer : e instanceof Date && !Number.isNaN(e.getTime()) && (n = gr.dateTime, e = e.toISOString())), n === "" || n === gr.string ? new Cr(`"${e}"`) : new Cr(`"${e}"^^${n}`);
}
function Ar(e) {
	return new Tr(e);
}
function jr() {
	return _r;
}
function Mr(e, t, n, r) {
	return new Er(e, t, n, r);
}
function Nr(e) {
	if (e instanceof xr) return e;
	switch (e.termType) {
		case "NamedNode": return Dr(e.value);
		case "BlankNode": return Or(e.value);
		case "Variable": return Ar(e.value);
		case "DefaultGraph": return _r;
		case "Literal": return kr(e.value, e.language ? e.direction ? {
			language: e.language,
			direction: e.direction
		} : e.language : e.datatype);
		case "Quad": return Pr(e);
		default: throw Error(`Unexpected termType: ${e.termType}`);
	}
}
function Pr(e) {
	if (e instanceof Er) return e;
	if (e.termType !== "Quad") throw Error(`Unexpected termType: ${e.termType}`);
	return Mr(Nr(e.subject), Nr(e.predicate), Nr(e.object), Nr(e.graph));
}
// node_modules/n3/src/N3Parser.js
var Fr = 0, Ir = /(^|\/)\.\.?($|[/#?])/, Lr = /^[^?#]*(?:^|\/)\.\.?(?:$|[/#?])/, Rr = class e {
	constructor(e) {
		this._contextStack = [], this._graph = null, e ||= {}, this._setBase(e.baseIRI), e.factory && Vr(this, e.factory);
		let t = typeof e.format == "string" ? e.format.match(/(?:^|\W)(\w*)$/)[1].toLowerCase() : "", n = /turtle/.test(t), r = /trig/.test(t), i = /triple/.test(t), a = /quad/.test(t), o = this._n3Mode = /n3/.test(t), s = i || a;
		if (this._emitCurrent = this._emit, o && (this._createQuad = this._createQuadInDirection, this._emit = this._emitInDirection, this._emitCurrent = this._emitCurrentInDirection), (this._supportsNamedGraphs = !(n || o)) || (this._readPredicateOrNamedGraph = this._readPredicate), this._supportsQuads = !(n || r || i || o), this._isImpliedBy = e.isImpliedBy, this._implicitEmptyPrefix = !!e.implicitEmptyPrefix, this._emptyFormulaAsTrue = !!e.emptyFormulaAsTrue, s && (this._resolveRelativeIRI = (e) => null), this._blankNodePrefix = typeof e.blankNodePrefix == "string" ? e.blankNodePrefix.replace(/^(?!_:)/, "_:") : "", this._directives = null, e.directives) {
			this._directives = Object.create(null);
			for (let t of e.directives) this._directives[`@${t.toLowerCase()}`] = this._directives[t.toUpperCase()] = t;
		}
		this._lexer = e.lexer || new mr({
			lineMode: s,
			n3: o,
			isImpliedBy: this._isImpliedBy,
			directives: e.directives
		}), this._explicitQuantifiers = !!e.explicitQuantifiers, this._formulaScopedBlankNodes = !!e.formulaScopedBlankNodes, this._parseUnsupportedVersions = !!e.parseUnsupportedVersions, this._version = e.version;
		let c = e.maxTripleTermDepth;
		this._maxTripleTermDepth = c === Infinity || Number.isInteger(c) && c >= 0 ? c : 1024;
	}
	static _resetBlankNodePrefix() {
		Fr = 0;
	}
	_setBase(e) {
		if (!e) this._base = "", this._basePath = "", this._basePathHasDotSegments = !1;
		else {
			let t = e.indexOf("#");
			t >= 0 && (e = e.substr(0, t)), this._base = e;
			let n = e.indexOf("?"), r = n < 0 ? e : e.substr(0, n);
			this._basePath = e.indexOf("/") < 0 ? e : r.substr(0, r.lastIndexOf("/") + 1);
			let i = e;
			e = e.match(/^(?:([a-z][a-z0-9+.-]*:))?(\/\/[^\/?#]*)?/i), this._baseRoot = e[0], this._baseScheme = e[1], e[2] !== void 0 && (i.length === this._baseRoot.length || i[this._baseRoot.length] === "?") && (this._basePath = `${this._baseRoot}/`), this._basePathHasDotSegments = Ir.test(this._basePath);
		}
	}
	_enterTripleTerm(e, t, n, r) {
		return this._tripleTermDepth >= this._maxTripleTermDepth ? (this._error(`Triple terms nested deeper than ${this._maxTripleTermDepth} level${this._maxTripleTermDepth === 1 ? "" : "s"}`, r), !1) : (this._tripleTermDepth++, this._saveContext(e, this._graph, t, n, null), this._graph = null, !0);
	}
	_saveContext(e, t, n, r, i) {
		if (!this._n3Mode) {
			this._contextStack.push({
				type: e,
				subject: n,
				predicate: r,
				object: i,
				graph: t
			});
			return;
		}
		let a = {
			type: e,
			subject: n,
			predicate: r,
			object: i,
			graph: t,
			inverse: this._inversePredicate,
			expectOf: this._expectOf,
			blankPrefix: this._prefixes._,
			prefixChanges: this._prefixChanges,
			quantifiedChanges: this._quantifiedChanges,
			emptyFormula: this._emptyFormula
		};
		e === "formula" && (a.base = [
			this._base,
			this._basePath,
			this._baseRoot,
			this._baseScheme,
			this._basePathHasDotSegments
		], this._prefixChanges = []), this._contextStack.push(a), this._inversePredicate = !1, this._expectOf = !1, this._formulaScopedBlankNodes && e !== "formula" || (this._prefixes._ = this._graph ? `${this._graph.value}.` : ".", this._quantifiedChanges = []), e === "formula" && (this._subject = null, this._emptyFormula = !0);
	}
	_restoreContext(e, t) {
		let n = this._contextStack.pop();
		if (!n || n.type !== e) return this._error(`Unexpected ${t.type}`, t);
		this._subject = n.subject, this._predicate = n.predicate, this._object = n.object, this._graph = n.graph, this._n3Mode && (this._inversePredicate = n.inverse, this._expectOf = n.expectOf, e === "formula" && ([this._base, this._basePath, this._baseRoot, this._baseScheme, this._basePathHasDotSegments] = n.base), this._prefixChanges !== n.prefixChanges && (zr(this._prefixes, this._prefixChanges), this._prefixChanges = n.prefixChanges), this._prefixes._ = n.blankPrefix, this._quantifiedChanges !== n.quantifiedChanges && (zr(this._quantified, this._quantifiedChanges), this._quantifiedChanges = n.quantifiedChanges), this._emptyFormula = n.emptyFormula);
	}
	_readBeforeTopContext(e) {
		return this._version && !this._isValidVersion(this._version) ? this._error(`Detected unsupported version as media type parameter: "${this._version}"`, e) : this._readInTopContext(e);
	}
	_readInTopContext(e) {
		switch (e.type) {
			case "eof": return this._graph === null ? (delete this._prefixes._, this._callback(null, null, this._prefixes)) : this._error("Unclosed graph", e);
			case "PREFIX": this._sparqlStyle = !0;
			case "@prefix": return this._readPrefix;
			case "BASE": this._sparqlStyle = !0;
			case "@base": return this._readBaseIRI;
			case "VERSION": this._sparqlStyle = !0;
			case "@version": return this._readVersion;
			case "{": if (this._supportsNamedGraphs) return this._graph = "", this._subject = null, this._readSubject;
			case "GRAPH": if (this._supportsNamedGraphs) return this._readNamedGraphLabel;
			default: return this._directives !== null && e.type in this._directives && this._graph === null ? (this._sparqlStyle = e.type[0] !== "@", this._directiveCallback(this._directives[e.type]), this._readDeclarationPunctuation) : this._readSubject(e);
		}
	}
	_readInFormulaContext(e) {
		switch (e.type) {
			case "PREFIX": this._sparqlStyle = !0;
			case "@prefix": return this._readPrefix;
			case "BASE": this._sparqlStyle = !0;
			case "@base": return this._readBaseIRI;
			default: return this._readSubject(e);
		}
	}
	_getStatementReader() {
		let e = this._contextStack[this._contextStack.length - 1];
		return e && e.type === "formula" ? this._readInFormulaContext : this._readInTopContext;
	}
	_readEntity(e, t) {
		let n;
		switch (e.type) {
			case "IRI":
			case "typeIRI":
				let t = this._resolveIRI(e.value);
				if (t === null) return this._error("Invalid IRI", e);
				n = this._factory.namedNode(t);
				break;
			case "type":
			case "prefixed":
				let r = this._prefixes[e.prefix];
				if (r === void 0) return this._error(`Undefined prefix "${e.prefix}:"`, e);
				n = this._factory.namedNode(r + e.value);
				break;
			case "blank":
				n = this._factory.blankNode(this._prefixes[e.prefix] + e.value);
				break;
			case "var":
				n = this._factory.variable(e.value.substr(1));
				break;
			default: return this._error(`Expected entity but got ${e.type}`, e);
		}
		return !t && this._n3Mode && n.id in this._quantified && (n = this._quantified[n.id]), n;
	}
	_readList(e, t, n, r) {
		let i = this._contextStack;
		return (i.length && i[i.length - 1]).type === "<<" ? this._error("Unexpected list in reified triple", e) : (this._saveContext("list", this._graph, t, n, r), this._subject = null, this._readListItem);
	}
	_readSubject(e) {
		switch (this._predicate = null, e.type !== "}" && (this._emptyFormula = !1), e.type) {
			case "[": return this._saveContext("blank", this._graph, this._subject = this._factory.blankNode(), null, null), this._readBlankNodeHead;
			case "(": return this._readList(e, this.RDF_NIL, null, null);
			case "{": return this._n3Mode ? (this._saveContext("formula", this._graph, this._graph = this._factory.blankNode(), null, null), this._readInFormulaContext) : this._error("Unexpected graph", e);
			case "}": return this._readPunctuation(e);
			case "@forSome": return this._n3Mode ? (this._subject = null, this._predicate = this.N3_FORSOME, this._quantifier = "blankNode", this._readQuantifierList) : this._error("Unexpected \"@forSome\"", e);
			case "@forAll": return this._n3Mode ? (this._subject = null, this._predicate = this.N3_FORALL, this._quantifier = "variable", this._readQuantifierList) : this._error("Unexpected \"@forAll\"", e);
			case "literal": return this._n3Mode ? e.prefix.length === 0 ? (this._literalValue = e.value, this._completeSubjectLiteral) : (this._subject = this._factory.literal(e.value, this._factory.namedNode(e.prefix)), this._getPathReader(this._readPredicateOrNamedGraph)) : this._error("Unexpected literal", e);
			case "<<(": return this._n3Mode ? this._enterTripleTerm("<<(", null, null, e) && this._readSubject : this._error("Disallowed triple term as subject", e);
			case "<<": return this._enterTripleTerm("<<", null, null, e) && this._readSubject;
			default:
				if ((this._subject = this._readEntity(e)) === void 0) return;
				if (this._n3Mode) return this._getPathReader(this._readPredicateOrNamedGraph);
		}
		return this._readPredicateOrNamedGraph;
	}
	_readPredicate(e) {
		let t = e.type, n = !1;
		switch (t) {
			case "inverse": this._inversePredicate = !0;
			case "abbreviation":
				this._predicate = this.ABBREVIATIONS[e.value];
				break;
			case "has": return this._readPredicateAfterVerb;
			case "is": return this._inversePredicate = !0, this._expectOf = !0, this._readPredicateAfterVerb;
			case "inversePredicate": return this._inversePredicate = !0, this._readPredicateAfterVerb;
			case "|}": return this._subject = null, this._readAnnotationBlockPunctuation(e);
			case ".":
			case "]":
			case "}": return this._predicate === null && !this._n3Mode ? this._error(`Unexpected ${t}`, e) : (this._subject = null, t === "]" ? this._readBlankNodeTail(e) : this._readPunctuation(e));
			case ";": return this._predicate === null ? this._error("Expected predicate but got ;", e) : this._readPredicate;
			case "literal":
				if (!this._n3Mode) return this._error("Unexpected literal", e);
				if (e.prefix.length === 0) return this._literalValue = e.value, this._completePredicateLiteral;
				this._predicate = this._factory.literal(e.value, this._factory.namedNode(e.prefix)), n = !0;
				break;
			case "(": return this._n3Mode ? this._readList(e, this._subject, this.RDF_NIL, null) : this._error(`Expected entity but got ${t}`, e);
			case "[": return this._n3Mode ? (this._saveContext("blank", this._graph, this._subject, this._subject = this._factory.blankNode(), null), this._readBlankNodeHead) : this._error("Disallowed blank node as predicate", e);
			case "{": return this._n3Mode ? (this._saveContext("formula", this._graph, this._subject, this._graph = this._factory.blankNode(), null), this._readSubject) : this._readEntity(e);
			case "blank": if (!this._n3Mode) return this._error("Disallowed blank node as predicate", e);
			default:
				if ((this._predicate = this._readEntity(e)) === void 0) return;
				n = this._n3Mode;
		}
		return this._validAnnotation = !0, n ? this._getPathReader(this._readObject, "predicate") : this._readObject;
	}
	_readPredicateAfterVerb(e) {
		return e.type === "has" || e.type === "is" || e.type === "of" || e.type === "inversePredicate" ? this._error(`Expected expression but got ${e.type}`, e) : this._readPredicate(e);
	}
	_readObject(e) {
		if (this._expectOf) return e.type === "of" ? (this._expectOf = !1, this._readObject) : this._error(`Expected of but got ${e.type}`, e);
		switch (e.type) {
			case "literal":
				if (e.prefix.length === 0) return this._literalValue = e.value, this._readDataTypeOrLang;
				if (this._object = this._factory.literal(e.value, this._factory.namedNode(e.prefix)), this._n3Mode) return this._getPathReader(this._getContextEndReader());
				break;
			case "[": return this._saveContext("blank", this._graph, this._subject, this._predicate, this._subject = this._factory.blankNode()), this._readBlankNodeHead;
			case "(": return this._readList(e, this._subject, this._predicate, this.RDF_NIL);
			case "{": return this._n3Mode ? (this._saveContext("formula", this._graph, this._subject, this._predicate, this._graph = this._factory.blankNode()), this._readInFormulaContext) : this._error("Unexpected graph", e);
			case "<<(": return this._enterTripleTerm("<<(", this._subject, this._predicate, e) && this._readSubject;
			case "<<": return this._enterTripleTerm("<<", this._subject, this._predicate, e) && this._readSubject;
			default:
				if ((this._object = this._readEntity(e)) === void 0) return;
				if (this._n3Mode) return this._getPathReader(this._getContextEndReader());
		}
		return this._getContextEndReader();
	}
	_readPredicateOrNamedGraph(e) {
		return e.type === "{" ? this._readGraph(e) : this._readPredicate(e);
	}
	_readGraph(e) {
		return e.type === "{" ? (this._graph = this._subject, this._subject = null, this._readSubject) : this._error(`Expected graph but got ${e.type}`, e);
	}
	_readBlankNodeHead(e) {
		if (e.type === "]") return this._subject = null, this._readBlankNodeTail(e);
		{
			let t = this._contextStack;
			return (t.length > 1 && t[t.length - 2]).type === "<<" ? this._error("Unexpected compound blank node expression in reified triple", e) : e.type === "id" ? this._readIriPropertyListId : (this._predicate = null, this._readPredicate(e));
		}
	}
	_readIriPropertyListId(e) {
		let t = this._readEntity(e);
		if (t === void 0) return;
		if (t.termType !== "NamedNode") return this._error(`Expected IRI after id but got ${e.type}`, e);
		let n = this._subject;
		this._subject = t;
		let r = this._contextStack[this._contextStack.length - 1];
		return r.subject === n && (r.subject = t), r.predicate === n && (r.predicate = t), r.object === n && (r.object = t), this._predicate = null, this._readIriPropertyListPredicate;
	}
	_readIriPropertyListPredicate(e) {
		return e.type === ";" || e.type === "]" || e.type === "." || e.type === "}" ? this._error(`Expected predicate but got ${e.type}`, e) : this._readPredicate(e);
	}
	_readBlankNodeTail(e) {
		if (e.type !== "]") return this._readBlankNodePunctuation(e);
		this._subject !== null && this._emitCurrent(this._subject, this._predicate, this._object, this._graph);
		let t = this._predicate === null;
		return this._restoreContext("blank", e), this._object === null ? this._predicate === null ? t ? this._readPredicateOrNamedGraph : this._readPredicateAfterBlank : this._getPathReader(this._readObject, "predicate") : this._getContextEndReader();
	}
	_readPredicateAfterBlank(e) {
		switch (e.type) {
			case ".":
			case "}": return this._subject = null, this._readPunctuation(e);
			default: return this._readPredicate(e);
		}
	}
	_readListItem(e) {
		let t = null, n = null, r = this._readListItem, i = this._subject, a = this._contextStack, o = a[a.length - 1];
		switch (e.type) {
			case "[":
				this._saveContext("blank", this._graph, n = this._factory.blankNode(), this.RDF_FIRST, this._subject = t = this._factory.blankNode()), r = this._readBlankNodeHead;
				break;
			case "(":
				this._saveContext("list", this._graph, n = this._factory.blankNode(), this.RDF_FIRST, this.RDF_NIL), this._subject = null;
				break;
			case ")":
				if (this._restoreContext("list", e), a.length !== 0 && a[a.length - 1].type === "list") {
					if (this._n3Mode) return i !== null && this._emit(i, this.RDF_REST, this.RDF_NIL, this._graph), this._saveContext("item", this._graph, this._subject, this._predicate, this._object), this._subject = this._object, this._predicate = null, this._getPathReader(this._readListItem);
					this._emit(this._subject, this._predicate, this._object, this._graph);
				}
				if (this._predicate === null) {
					if (r = this._n3Mode ? this._getPathReader(this._readPredicate) : this._readPredicate, this._subject === this.RDF_NIL) return r;
				} else if (this._object === null) {
					if (r = this._getPathReader(this._readObject, "predicate"), this._predicate === this.RDF_NIL) return r;
				} else if (r = this._getContextEndReader(), this._n3Mode && (r = this._getPathReader(r)), this._object === this.RDF_NIL) return r;
				n = this.RDF_NIL;
				break;
			case "literal":
				e.prefix.length === 0 ? (this._literalValue = e.value, r = this._readListItemDataTypeOrLang) : (t = this._factory.literal(e.value, this._factory.namedNode(e.prefix)), r = this._getContextEndReader());
				break;
			case "{": return this._n3Mode ? (n = this._factory.blankNode(), t = this._factory.blankNode(), i === null ? o.predicate === null ? o.subject = n : o.object = n : this._emit(i, this.RDF_REST, n, this._graph), this._emit(n, this.RDF_FIRST, t, this._graph), this._saveContext("formula", this._graph, n, this.RDF_FIRST, this._graph = t), this._subject = null, this._readInFormulaContext) : this._error("Unexpected graph", e);
			case "<<(":
			case "<<":
				if (!this._enterTripleTerm(e.type, null, null, e)) return;
				r = this._readSubject;
				break;
			default: if ((t = this._readEntity(e)) === void 0) return;
		}
		if (n === null && (this._subject = n = this._factory.blankNode()), (e.type === "<<" || e.type === "<<(") && (a[a.length - 1].subject = this._subject), i === null ? o.predicate === null ? o.subject = n : o.object === null ? o.predicate = n : o.object = n : this._emit(i, this.RDF_REST, n, this._graph), t !== null) {
			if (this._n3Mode && (e.type === "IRI" || e.type === "prefixed" || e.type === "var" || e.type === "blank" || e.type === "literal")) return this._saveContext("item", this._graph, n, this.RDF_FIRST, t), this._subject = t, this._predicate = null, this._getPathReader(this._readListItem);
			this._emit(n, this.RDF_FIRST, t, this._graph);
		}
		return r;
	}
	_readDataTypeOrLang(e) {
		return this._completeObjectLiteral(e, !1);
	}
	_readListItemDataTypeOrLang(e) {
		return this._completeObjectLiteral(e, !0);
	}
	_completeLiteral(e, t) {
		let n, r = !1;
		switch (e.type) {
			case "type":
			case "typeIRI":
				let i = this._readEntity(e);
				if (i === void 0) return;
				if (i.value === Nn.rdf.langString || i.value === Nn.rdf.dirLangString) return this._error("Detected illegal (directional) languaged-tagged string with explicit datatype", e);
				n = this._factory.literal(this._literalValue, i), e = null;
				break;
			case "langcode":
				if (e.value.split("-").some((e) => e.length > 8)) return this._error("Detected language tag with subtag longer than 8 characters", e);
				n = this._factory.literal(this._literalValue, e.value), this._literalLanguage = e.value, e = null, this._literalComponent = t, r = !0;
				break;
			default: n = this._factory.literal(this._literalValue);
		}
		return {
			token: e,
			literal: n,
			readCb: r
		};
	}
	_readDirCode(e) {
		let t = this._literalComponent, n = this._literalListItem;
		if (e.type === "dircode") {
			let n = this._factory.literal(this._literalValue, {
				language: this._literalLanguage,
				direction: e.value
			});
			t === "subject" ? this._subject = n : t === "predicate" ? this._predicate = n : this._object = n, this._literalLanguage = void 0, e = null;
		}
		if (t === "subject" || t === "predicate") {
			let n = t === "subject" ? this._readPredicateOrNamedGraph : this._readObject;
			return this._getPathEndReader(e, n, t) || n.call(this, e);
		}
		return this._completeObjectLiteralPost(e, n);
	}
	_completeTermLiteral(e, t) {
		let n = this._completeLiteral(e, t);
		if (!n) return;
		let r;
		return t === "subject" ? (this._subject = n.literal, r = this._readPredicateOrNamedGraph) : (this._predicate = n.literal, this._validAnnotation = !0, r = this._readObject), n.readCb ? (this._literalListItem = !1, this._readDirCode) : this._getPathEndReader(n.token, r, t) || r.call(this, n.token);
	}
	_completeSubjectLiteral(e) {
		return this._completeTermLiteral(e, "subject");
	}
	_completePredicateLiteral(e) {
		return this._completeTermLiteral(e, "predicate");
	}
	_completeObjectLiteral(e, t) {
		let n = this._completeLiteral(e, "object");
		if (n) return this._object = n.literal, n.readCb ? (this._literalListItem = t, this._readDirCode) : this._completeObjectLiteralPost(n.token, t);
	}
	_completeObjectLiteralPost(e, t) {
		return this._n3Mode && (e === null || e.type === "!" || e.type === "^") ? t ? (this._saveContext("item", this._graph, this._subject, this.RDF_FIRST, this._object), this._subject = this._object, this._predicate = null, this._getPathEndReader(e, this._readListItem)) : this._getPathEndReader(e, this._getContextEndReader()) : (t && this._emit(this._subject, this.RDF_FIRST, this._object, this._graph), e === null ? this._getContextEndReader() : (this._readCallback = this._getContextEndReader(), this._readCallback(e)));
	}
	_readFormulaTail(e) {
		if (e.type !== "}") return this._readPunctuation(e);
		this._subject !== null && this._emitCurrent(this._subject, this._predicate, this._object, this._graph);
		let t = this._graph, n = this._emptyFormula;
		return this._restoreContext("formula", e), n && this._emptyFormulaAsTrue && (this._subject === t ? this._subject = this.N3_TRUE : this._predicate === t ? this._predicate = this.N3_TRUE : this._object = this.N3_TRUE), this._object === null ? this._predicate === null ? this._getPathReader(this._readPredicate, "subject") : this._getPathReader(this._readObject, "predicate") : this._getPathReader(this._getContextEndReader(), "object");
	}
	_readPunctuation(e) {
		let t, n = this._graph, r = this._subject, i = this._inversePredicate;
		switch (e.type) {
			case "}":
				if (this._graph === null) return this._error("Unexpected graph closing", e);
				if (this._n3Mode) return this._readFormulaTail(e);
				this._graph = null;
			case ".":
				this._subject = null, this._tripleTerm = null, t = this._getStatementReader(), i && (this._inversePredicate = !1);
				break;
			case ";":
				i && (this._inversePredicate = !1), t = this._readPredicate;
				break;
			case ",":
				t = this._readObject;
				break;
			case "~":
			case "{|": return this._readAnnotationStart(e);
			case "|}": return this._error("Unexpected annotation syntax closing", e);
			default:
				if (this._supportsQuads && this._graph === null && (n = this._readEntity(e)) !== void 0) {
					t = this._readQuadPunctuation;
					break;
				}
				return this._error(`Expected punctuation to follow "${this._object.id}"`, e);
		}
		if (r !== null) {
			let e = this._predicate, t = this._object;
			this._emit(r, e, t, n, i);
		}
		return t;
	}
	_readBlankNodePunctuation(e) {
		let t, n = !1;
		switch (e.type) {
			case ";":
				n = this._inversePredicate, t = this._readPredicate;
				break;
			case ",":
				t = this._readObject;
				break;
			case "~":
			case "{|": return this._readAnnotationStart(e);
			case "|}": return this._error("Unexpected annotation syntax closing", e);
			default: return this._error(`Expected punctuation to follow "${this._object.id}"`, e);
		}
		return this._emitCurrent(this._subject, this._predicate, this._object, this._graph), n && (this._inversePredicate = !1), t;
	}
	_readQuadPunctuation(e) {
		return e.type === "." ? this._readInTopContext : this._error("Expected dot to follow quad", e);
	}
	_readPrefix(e) {
		return e.type === "prefix" ? (this._prefix = e.value, this._readPrefixIRI) : this._error("Expected prefix to follow @prefix", e);
	}
	_readPrefixIRI(e) {
		if (e.type !== "IRI") return this._error(`Expected IRI to follow prefix "${this._prefix}:"`, e);
		let t = this._readEntity(e);
		return this._prefixChanges !== null && this._prefixChanges.push(this._prefix, this._prefixes[this._prefix]), this._prefixes[this._prefix] = t.value, this._prefixCallback(this._prefix, t), this._readDeclarationPunctuation;
	}
	_readBaseIRI(e) {
		let t = e.type === "IRI" && this._resolveIRI(e.value);
		return t ? (this._setBase(t), this._readDeclarationPunctuation) : this._error("Expected valid IRI to follow base declaration", e);
	}
	_isValidVersion(t) {
		return this._parseUnsupportedVersions || e.SUPPORTED_VERSIONS.includes(t);
	}
	_readVersion(e) {
		return e.type === "literal" ? e.prefix !== "" || e.tripleQuoted ? this._error("Version declarations must use single quotes", e) : (this._versionCallback(e.value), this._isValidVersion(e.value) ? this._readDeclarationPunctuation : this._error(`Detected unsupported version: "${e.value}"`, e)) : this._error("Expected literal to follow version declaration", e);
	}
	_readNamedGraphLabel(e) {
		switch (e.type) {
			case "IRI":
			case "blank":
			case "prefixed": return this._readSubject(e), this._readGraph;
			case "[": return this._readNamedGraphBlankLabel;
			default: return this._error("Invalid graph label", e);
		}
	}
	_readNamedGraphBlankLabel(e) {
		return e.type === "]" ? (this._subject = this._factory.blankNode(), this._readGraph) : this._error("Invalid graph label", e);
	}
	_readDeclarationPunctuation(e) {
		return this._sparqlStyle ? (this._sparqlStyle = !1, this._getStatementReader().call(this, e)) : e.type === "." ? this._getStatementReader() : this._error("Expected declaration to end with a dot", e);
	}
	_readQuantifierList(e) {
		let t;
		switch (e.type) {
			case "IRI":
			case "prefixed": if ((t = this._readEntity(e, !0)) !== void 0) break;
			default: return this._error(`Unexpected ${e.type}`, e);
		}
		return this._explicitQuantifiers ? (this._subject === null ? this._emit(this._graph || this.DEFAULTGRAPH, this._predicate, this._subject = this._factory.blankNode(), this.QUANTIFIERS_GRAPH) : this._emit(this._subject, this.RDF_REST, this._subject = this._factory.blankNode(), this.QUANTIFIERS_GRAPH), this._emit(this._subject, this.RDF_FIRST, t, this.QUANTIFIERS_GRAPH)) : (this._quantifiedChanges !== null && this._quantifiedChanges.push(t.id, this._quantified[t.id]), this._quantified[t.id] = this._factory[this._quantifier](this._factory.blankNode().value)), this._readQuantifierPunctuation;
	}
	_readQuantifierPunctuation(e) {
		return e.type === "," ? this._readQuantifierList : (this._explicitQuantifiers && (this._emit(this._subject, this.RDF_REST, this.RDF_NIL, this.QUANTIFIERS_GRAPH), this._subject = null), this._readCallback = this._getContextEndReader(), this._readCallback(e));
	}
	_getPathReader(e, t) {
		return this._afterPath = e, this._pathPosition = t || (this._predicate === null ? "subject" : "object"), this._readPath;
	}
	_getPathEndReader(e, t, n) {
		if (e !== null && e.type !== "!" && e.type !== "^") return null;
		let r = this._getPathReader(t, n);
		return e === null ? r : r.call(this, e);
	}
	_readPath(e) {
		switch (e.type) {
			case "!": return this._readForwardPath;
			case "^": return this._readBackwardPath;
			default:
				let t = this._afterPath, n = this._contextStack, r = n.length && n[n.length - 1];
				if (r && r.type === "item") {
					let t = this._subject;
					this._restoreContext("item", e), this._emit(this._subject, this.RDF_FIRST, t, this._graph);
				}
				return this._afterPath = null, this._pathPosition = null, t.call(this, e);
		}
	}
	_readForwardPath(e) {
		let t, n, r = this._factory.blankNode();
		if ((n = this._readEntity(e)) !== void 0) return this._pathPosition === "subject" ? (t = this._subject, this._subject = r) : this._pathPosition === "predicate" ? (t = this._predicate, this._predicate = r) : (t = this._object, this._object = r), this._emit(t, n, r, this._graph), this._readPath;
	}
	_readBackwardPath(e) {
		let t = this._factory.blankNode(), n, r;
		if ((n = this._readEntity(e)) !== void 0) return this._pathPosition === "subject" ? (r = this._subject, this._subject = t) : this._pathPosition === "predicate" ? (r = this._predicate, this._predicate = t) : (r = this._object, this._object = t), this._emit(t, n, r, this._graph), this._readPath;
	}
	_readTripleTermTail(e) {
		if (e.type !== ")>>") return this._error(`Expected )>> but got ${e.type}`, e);
		let t = this._createQuad(this._subject, this._predicate, this._object, this._graph, this._inversePredicate);
		this._restoreContext("<<(", e), this._tripleTermDepth--;
		let n = this._contextStack, r = n.length && n[n.length - 1];
		return r && r.type === "list" ? (this._emit(this._subject, this.RDF_FIRST, t, this._graph), this._getContextEndReader()) : this._subject === null ? (this._subject = t, this._readPredicate) : (this._object = t, this._getContextEndReader());
	}
	_readReifiedTripleTailOrReifier(e) {
		return e.type === "~" ? this._readReifier : this._readReifiedTripleTail(e);
	}
	_readReifiedTripleTail(e) {
		if (e.type !== ">>") return this._error(`Expected >> but got ${e.type}`, e);
		this._tripleTerm = null;
		let t = this._readTripleTerm();
		this._restoreContext("<<", e), this._tripleTermDepth--;
		let n = this._contextStack, r = n.length && n[n.length - 1];
		return r && r.type === "list" ? (this._emit(this._subject, this.RDF_FIRST, t, this._graph), this._getContextEndReader()) : this._subject === null ? (this._subject = t, this._readPredicateOrReifierTripleEnd) : (this._object = t, this._getContextEndReader());
	}
	_readPredicateOrReifierTripleEnd(e) {
		return e.type === "." ? (this._subject = null, this._readPunctuation(e)) : this._readPredicate(e);
	}
	_readReifier(e) {
		return e.type === ">>" ? this._readReifiedTripleTail(e) : (this._reifier = this._readEntity(e), this._readReifiedTripleTail);
	}
	_readAnnotationStart(e) {
		return this._emitCurrent(this._subject, this._predicate, this._object, this._graph), this._tripleTerm = null, this._readAnnotation(e);
	}
	_readAnnotation(e) {
		switch (e.type) {
			case "~": return this._readReifierInAnnotation;
			case "{|": return this._readAnnotationBlockHead(e);
		}
		switch (this._tripleTerm = null, e.type) {
			case ";": return this._inversePredicate = !1, this._readPredicate;
			case ",": return this._readObject;
			default: return this._subject = null, this._getContextEndReader().call(this, e);
		}
	}
	_readReifierInAnnotation(e) {
		switch (e.type) {
			case "IRI":
			case "typeIRI":
			case "type":
			case "prefixed":
			case "blank":
			case "var": return this._reifier = this._readEntity(e), this._readAnnotationBlockOrReifier;
		}
		return this._reifier = this._factory.blankNode(), this._readAnnotationBlockOrReifier(e);
	}
	_readAnnotationBlockOrReifier(e) {
		return e.type === "{|" ? this._readAnnotationBlockHead(e) : (this._readTripleTerm(), this._readAnnotation(e));
	}
	_readAnnotationBlockHead(e) {
		let t = this._readTripleTerm();
		return this._saveContext("annotation", this._graph, this._subject, this._predicate, this._object), this._contextStack[this._contextStack.length - 1].tripleTerm = this._tripleTerm, this._subject = t, this._predicate = this._object = this._tripleTerm = null, this._inversePredicate = !1, this._validAnnotation = !1, this._readPredicate;
	}
	_readAnnotationBlockPunctuation(e) {
		let t = this._contextStack;
		if (e.type === "|}") {
			if (!t.length || t[t.length - 1].type !== "annotation") return this._error("Unexpected annotation syntax closing", e);
			if (!this._validAnnotation) return this._error("Annotation block can not be empty", e);
			this._subject !== null && this._emitCurrent(this._subject, this._predicate, this._object, this._graph);
			let { tripleTerm: n } = t[t.length - 1];
			return this._restoreContext("annotation", e), this._tripleTerm = n, this._readAnnotation;
		}
		return this._readBlankNodePunctuation(e);
	}
	_readTripleTerm() {
		let e = this._contextStack, t = e.length && e[e.length - 1], n = t ? t.graph : void 0, r = this._reifier || this._factory.blankNode();
		return this._reifier = null, this._tripleTerm = this._tripleTerm || this._createQuad(this._subject, this._predicate, this._object, null, this._inversePredicate), this._emit(r, this.RDF_REIFIES, this._tripleTerm, n || this._graph || this.DEFAULTGRAPH), r;
	}
	_getContextEndReader() {
		let e = this._contextStack;
		if (!e.length) return this._readPunctuation;
		switch (e[e.length - 1].type) {
			case "blank": return this._readBlankNodeTail;
			case "list": return this._readListItem;
			case "formula": return this._readFormulaTail;
			case "<<(": return this._readTripleTermTail;
			case "<<": return this._readReifiedTripleTailOrReifier;
			case "annotation": return this._readAnnotationBlockPunctuation;
		}
	}
	_createQuad(e, t, n, r) {
		return this._factory.quad(e, t, n, r || this.DEFAULTGRAPH);
	}
	_createQuadInDirection(e, t, n, r, i) {
		return i ? this._factory.quad(n, t, e, r || this.DEFAULTGRAPH) : this._factory.quad(e, t, n, r || this.DEFAULTGRAPH);
	}
	_emitInDirection(e, t, n, r, i) {
		this._callback(null, this._createQuad(e, t, n, r, i));
	}
	_emitCurrentInDirection(e, t, n, r) {
		this._callback(null, this._createQuad(e, t, n, r, this._inversePredicate));
	}
	_emit(e, t, n, r) {
		this._callback(null, this._factory.quad(e, t, n, r || this.DEFAULTGRAPH));
	}
	_error(e, t) {
		let n = ` on line ${t.line}.`;
		e.length + n.length > 200 && (e = `${e.slice(0, 199 - n.length)}…`);
		let r = /* @__PURE__ */ Error(`${e}${n}`);
		r.context = {
			token: t,
			line: t.line,
			previousToken: this._lexer.previousToken
		}, this._callback(r), this._callback = Br;
	}
	_resolveIRI(e) {
		return /^[a-z][a-z0-9+.-]*:/i.test(e) ? e : this._resolveRelativeIRI(e);
	}
	_resolveRelativeIRI(e) {
		if (!e.length) return this._base;
		switch (e[0]) {
			case "#": return this._base + e;
			case "?": {
				let t = this._base.indexOf("?");
				return (t < 0 ? this._base : this._base.substr(0, t)) + e;
			}
			case "/": return e[1] === "/" ? this._baseScheme ? this._removeDotSegments(this._baseScheme + e) : this._removeDotSegments(`:${e}`).substr(1) : this._baseRoot + this._removeDotSegments(e);
			default: return /^[^/:]*:/.test(e) ? null : this._basePathHasDotSegments || Lr.test(e) ? this._removeDotSegments(this._basePath + e) : this._basePath + e;
		}
	}
	_removeDotSegments(e) {
		if (!Ir.test(e)) return e;
		let t = e.length, n = "", r = -1, i = -1, a = 0, o = "/";
		for (; r < t;) {
			switch (o) {
				case ":":
					if (i < 0 && e[++r] === "/" && e[++r] === "/") for (; (i = r + 1) < t && e[i] !== "/" && e[i] !== "?" && e[i] !== "#";) r = i;
					break;
				case "?":
				case "#":
					r = t;
					break;
				case "/": if (e[r + 1] === ".") switch (o = e[++r + 1], o) {
					case "/":
						n += e.substring(a, r - 1), a = r + 1;
						break;
					case void 0:
					case "?":
					case "#": return n + e.substring(a, r) + e.substr(r + 1);
					case ".": if (o = e[++r + 1], o === void 0 || o === "/" || o === "?" || o === "#") {
						if (n += e.substring(a, r - 2), (a = n.lastIndexOf("/")) >= i && (n = n.substr(0, a)), o !== "/") return `${n}/${e.substr(r + 1)}`;
						a = r + 1;
					}
				}
			}
			o = e[++r];
		}
		return n + e.substring(a);
	}
	parse(e, t, n, r) {
		let i, a, o, s, c, l, u;
		t && (t.onQuad || t.onPrefix || t.onComment || t.onVersion || t.onDirective || t.onToken || t.onTokenEnd) ? (i = t.onQuad, a = t.onPrefix, o = t.onComment, s = t.onVersion, c = t.onDirective, l = t.onToken, u = t.onTokenEnd) : (i = t, a = n, s = r), this._readCallback = this._readBeforeTopContext, this._contextStack = [], this._graph = this._subject = this._predicate = this._object = null, this._tripleTerm = this._reifier = null, this._sparqlStyle = !1, this._prefixes = Object.create(null), this._prefixes._ = this._blankNodePrefix ? this._blankNodePrefix.substr(2) : `b${Fr++}_`, this._n3Mode && this._implicitEmptyPrefix && this._base && (this._prefixes[""] = this._resolveIRI("#")), this._prefixCallback = a || Br, this._versionCallback = s || Br, this._directiveCallback = c || Br, this._inversePredicate = !1, this._expectOf = !1, this._quantified = Object.create(null), this._prefixChanges = null, this._quantifiedChanges = null, this._emptyFormula = !1, this._tripleTermDepth = 0;
		let d = (e) => this._readCallback = this._readCallback(e), f = d;
		if ((o || this._lexer.comments) && (this._lexer.comments = !0, f = (e) => e.type === "comment" ? (o && o(e.value), this._readCallback) : d(e)), l || u) {
			let e = f;
			f = (t) => {
				try {
					try {
						return l && l(t), e(t);
					} finally {
						u && u(t);
					}
				} catch (e) {
					throw this._readCallback = null, e;
				}
			};
		}
		if (!i) {
			let t = [], n;
			this._callback = (e, r) => {
				e ? n = e : r && t.push(r);
			};
			let r = this._lexer;
			if (!a && !s && !c && !o && !l && !u && r.tokenize === mr.prototype.tokenize && typeof r._tokenizeString == "function") {
				let t = [
					this._base,
					this._basePath,
					this._baseRoot,
					this._baseScheme
				];
				r._tokenizeString(e, (e, n) => {
					e ? ([this._base, this._basePath, this._baseRoot, this._baseScheme] = t, this._callback(e), this._callback = Br) : this._readCallback && f(n);
				});
			} else r.tokenize(e).every(f);
			if (n) throw n;
			return t;
		}
		let p = (e, t) => {
			e === null ? this._readCallback && f(t) : (this._callback(e), this._callback = Br);
		};
		this._callback = i, this._lexer.tokenize(e, p);
	}
};
function zr(e, t) {
	for (let n = t.length - 2; n >= 0; n -= 2) t[n + 1] === void 0 ? delete e[t[n]] : e[t[n]] = t[n + 1];
}
function Br() {}
function Vr(e, t) {
	e._factory = t, e.DEFAULTGRAPH = t.defaultGraph(), e.RDF_FIRST = t.namedNode(Nn.rdf.first), e.RDF_REST = t.namedNode(Nn.rdf.rest), e.RDF_NIL = t.namedNode(Nn.rdf.nil), e.RDF_REIFIES = t.namedNode(Nn.rdf.reifies), e.N3_FORALL = t.namedNode(Nn.r.forAll), e.N3_FORSOME = t.namedNode(Nn.r.forSome), e.N3_TRUE = t.literal("true", t.namedNode(Nn.xsd.boolean)), e.ABBREVIATIONS = {
		a: t.namedNode(Nn.rdf.type),
		"=": t.namedNode(Nn.owl.sameAs),
		">": t.namedNode(Nn.log.implies),
		"<": t.namedNode(Nn.log.isImpliedBy)
	}, e.QUANTIFIERS_GRAPH = t.namedNode("urn:n3:quantifiers");
}
// node_modules/rdflib/esm/rdfaparser.js
if (Rr.SUPPORTED_VERSIONS = [
	"1.2",
	"1.2-basic",
	"1.1"
], Vr(Rr.prototype, br), Hr === void 0) var Hr = {
	ELEMENT_NODE: 1,
	ATTRIBUTE_NODE: 2,
	TEXT_NODE: 3,
	CDATA_SECTION_NODE: 4,
	ENTITY_REFERENCE_NODE: 5,
	ENTITY_NODE: 6,
	PROCESSING_INSTRUCTION_NODE: 7,
	COMMENT_NODE: 8,
	DOCUMENT_NODE: 9,
	DOCUMENT_TYPE_NODE: 10,
	DOCUMENT_FRAGMENT_NODE: 11,
	NOTATION_NODE: 12
};
var Ur = class e {
	constructor(e, t) {
		this.options = t || {}, this.kb = e, this.target = t.target || { graph: {
			subjects: {},
			prefixes: {},
			terms: {}
		} }, this.blankNodes = [], this.htmlOptions = { selfClosing: "br img input area base basefont col colgroup source wbr isindex link meta param hr" }, this.theOne = "_:" + (/* @__PURE__ */ new Date()).getTime(), this.language = null, this.vocabulary = null, this.blankCounter = 0, this.langAttributes = [{
			namespaceURI: "http://www.w3.org/XML/1998/namespace",
			localName: "lang"
		}], this.inXHTMLMode = !1, this.absURIRE = /[\w\_\-]+:\S+/, this.finishedHandlers = [], this.init();
	}
	addTriple(e, t, n, r) {
		var i = t === void 0 ? ze.namedNode(this.options.base) : this.toRDFNodeObject(t), a, o = this.toRDFNodeObject(n), s;
		a = this.toRDFNodeObject(r), s = ze.namedNode(this.options.base), this.kb.add(i, o, a, s);
	}
	ancestorPath(e) {
		for (var t = ""; e && e.nodeType !== Hr.DOCUMENT_NODE;) t = "/" + e.localName + t, e = e.parentNode;
		return t;
	}
	copyMappings(e) {
		var t = {};
		for (var n in e) t[n] = e[n];
		return t;
	}
	copyProperties() {}
	deriveDateTimeType(t) {
		for (var n = 0; n < e.dateTimeTypes.length; n++) {
			var r = e.dateTimeTypes[n].pattern.exec(t);
			if (r && r[0].length === t.length) return e.dateTimeTypes[n].type;
		}
		return null;
	}
	init() {}
	newBlankNode() {
		return this.blankCounter++, "_:" + this.blankCounter;
	}
	newSubjectOrigin(e, t) {}
	parseCURIE(t, n, r) {
		var i = t.indexOf(":"), a;
		if (i >= 0) {
			var o = t.substring(0, i);
			if (o === "") return a = n[""], a ? a + t.substring(i + 1) : null;
			if (o === "_") return "_:" + t.substring(i + 1);
			if (e.NCNAME.test(o) && (a = n[o], a)) return a + t.substring(i + 1);
		}
		return null;
	}
	parseCURIEOrURI(e, t, n) {
		return this.parseCURIE(e, t, n) || this.resolveAndNormalize(n, e);
	}
	parsePredicate(e, t, n, r, i, a) {
		if (e === "") return null;
		var o = this.parseTermOrCURIEOrAbsURI(e, t, a ? null : n, r, i);
		return o && o.indexOf("_:") === 0 ? null : o;
	}
	parsePrefixMappings(e, t) {
		for (var n = this.tokenize(e), r = null, i = 0; i < n.length; i++) n[i][n[i].length - 1] === ":" ? r = n[i].substring(0, n[i].length - 1) : r &&= (t[r] = this.options.base ? Ne(n[i], this.options.base) : n[i], null);
	}
	static parseRDFaDOM(t, n, r) {
		var i = new e(n, { base: r });
		t.baseURI ||= r, i.process(t, { baseURI: r });
	}
	parseSafeCURIEOrCURIEOrURI(e, t, n) {
		return e = this.trim(e), e.charAt(0) === "[" && e.charAt(e.length - 1) === "]" ? (e = e.substring(1, e.length - 1), e = e.trim(e), e.length === 0 ? null : e === "_:" ? this.theOne : this.parseCURIE(e, t, n)) : this.parseCURIEOrURI(e, t, n);
	}
	parseTermOrCURIEOrAbsURI(e, t, n, r, i) {
		e = this.trim(e);
		var a = this.parseCURIE(e, r, i);
		if (a) return a;
		if (n) {
			if (t && !this.absURIRE.exec(e)) return t + e;
			var o = n[e];
			if (o || (o = n[e.toLowerCase()], o)) return o;
		}
		return this.absURIRE.exec(e) ? this.resolveAndNormalize(i, e) : null;
	}
	parseTermOrCURIEOrURI(e, t, n, r, i) {
		e = this.trim(e);
		var a = this.parseCURIE(e, r, i);
		if (a) return a;
		var o = n[e];
		return o || (o = n[e.toLowerCase()], o) ? o : t && !this.absURIRE.exec(e) ? t + e : this.resolveAndNormalize(i, e);
	}
	parseURI(e) {
		return e;
	}
	process(t, n) {
		n ||= {};
		var r;
		t.nodeType === Hr.DOCUMENT_NODE ? (t.baseURI && !n.baseURI && (n.baseURI = t.baseURI), r = t.baseURI, t = t.documentElement, t.baseURI || (t.baseURI = r), this.setContext(t)) : t.parentNode.nodeType === Hr.DOCUMENT_NODE && this.setContext(t);
		var i = [], a = function(e) {
			if ((!e || e === "about:blank") && n && n.baseURI) return n.baseURI;
			var t = e.indexOf("#");
			return t >= 0 && (e = e.substring(0, t)), n && n.baseURIMap && (e = n.baseURIMap(e)), e;
		};
		for (i.push({
			current: t,
			context: this.push(null, a(t.baseURI))
		}); i.length > 0;) {
			var o = i.shift();
			if (o.parent) {
				if (o.context.parent && o.context.parent.listMapping === o.listMapping) continue;
				for (let t in o.listMapping) {
					var s = o.listMapping[t];
					if (s.length === 0) this.addTriple(o.parent, o.subject, t, {
						type: e.objectURI,
						value: "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"
					});
					else {
						var c = [];
						for (let e = 0; e < s.length; e++) c.push(this.newBlankNode());
						for (let t = 0; t < c.length; t++) this.addTriple(o.parent, c[t], "http://www.w3.org/1999/02/22-rdf-syntax-ns#first", s[t]), this.addTriple(o.parent, c[t], "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest", {
							type: e.objectURI,
							value: t + 1 < c.length ? c[t + 1] : "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"
						});
						this.addTriple(o.parent, o.subject, t, {
							type: e.objectURI,
							value: c[0]
						});
					}
				}
			} else {
				var l = o.current, u = o.context, d = !1, f = null, p = null, m = null, h = u.prefixes, g = !1, _ = [], v = u.listMapping, y = !u.parent, b = u.language, x = u.vocabulary;
				r = this.parseURI(a(l.baseURI)), l.item = null;
				var S = l.getAttributeNode("vocab");
				if (S) {
					let t = this.trim(S.value);
					if (t.length > 0) {
						x = t;
						var C = r.spec;
						this.addTriple(l, C, "http://www.w3.org/ns/rdfa#usesVocabulary", {
							type: e.objectURI,
							value: x
						});
					} else x = this.vocabulary;
				}
				for (var w = 0; w < l.attributes.length; w++) {
					var T = l.attributes[w];
					if (T.nodeName.charAt(0) === "x" && T.nodeName.indexOf("xmlns:") === 0) {
						g ||= (h = this.copyMappings(h), !0);
						var E = T.nodeName.substring(6), D = e.trim(T.value);
						h[E] = this.options.base ? Ne(D, this.options.base) : D;
					}
				}
				var O = l.getAttributeNode("prefix");
				O && (g ||= (h = this.copyMappings(h), !0), this.parsePrefixMappings(O.value, h));
				var ee = null;
				for (let e = 0; !ee && e < this.langAttributes.length; e++) ee = l.getAttributeNodeNS(this.langAttributes[e].namespaceURI, this.langAttributes[e].localName);
				if (ee) {
					let t = e.trim(ee.value);
					b = t.length > 0 ? t : null;
				}
				var te = l.getAttributeNode("rel"), k = l.getAttributeNode("rev"), A = l.getAttributeNode("typeof"), ne = l.getAttributeNode("property"), re = l.getAttributeNode("datatype"), ie = this.inHTMLMode ? l.getAttributeNode("datetime") : null, ae = l.getAttributeNode("content"), j = l.getAttributeNode("about"), M = l.getAttributeNode("src"), N = l.getAttributeNode("resource"), oe = l.getAttributeNode("href"), P = l.getAttributeNode("inlist"), F = [], I, se;
				if (te) {
					se = this.tokenize(te.value);
					for (let e = 0; e < se.length; e++) I = this.parsePredicate(se[e], x, u.terms, h, r, this.inHTMLMode && ne !== null), I && F.push(I);
				}
				var ce = [];
				if (k) {
					se = this.tokenize(k.value);
					for (let e = 0; e < se.length; e++) I = this.parsePredicate(se[e], x, u.terms, h, r, this.inHTMLMode && ne), I && ce.push(I);
				}
				if (this.inHTMLMode && (te || k) && ne && (F.length === 0 && (te = null), ce.length === 0 && (k = null)), te || k ? (j && (f = this.parseSafeCURIEOrCURIEOrURI(j.value, h, r)), A && (m = f), f || (l.parentNode.nodeType === Hr.DOCUMENT_NODE ? f = a(l.baseURI) : u.parentObject && (f = a(l.parentNode.baseURI) === u.parentObject ? a(l.baseURI) : u.parentObject)), N && (p = this.parseSafeCURIEOrCURIEOrURI(N.value, h, r)), p || (oe ? p = this.resolveAndNormalize(r, encodeURI(oe.value)) : M ? p = this.resolveAndNormalize(r, encodeURI(M.value)) : A && !j && (!this.inXHTMLMode || l.localName !== "head" && l.localName !== "body") && (p = this.newBlankNode())), A && !j && this.inXHTMLMode && (l.localName === "head" || l.localName === "body") ? m = f : A && !j && (m = p)) : ne && !ae && !re ? (j && (f = this.parseSafeCURIEOrCURIEOrURI(j.value, h, r), A && (m = f)), !f && l.parentNode.nodeType === Hr.DOCUMENT_NODE ? (f = a(l.baseURI), A && (m = f)) : !f && u.parentObject && (f = a(l.parentNode.baseURI) === u.parentObject ? a(l.baseURI) : u.parentObject), A && !m && (N && (m = this.parseSafeCURIEOrCURIEOrURI(N.value, h, r)), !m && oe && (m = this.resolveAndNormalize(r, encodeURI(oe.value))), !m && M && (m = this.resolveAndNormalize(r, encodeURI(M.value))), m || !this.inXHTMLMode && !this.inHTMLMode || l.localName !== "head" && l.localName !== "body" || (m = f), m ||= this.newBlankNode(), p = m)) : (j && (f = this.parseSafeCURIEOrCURIEOrURI(j.value, h, r)), !f && N && (f = this.parseSafeCURIEOrCURIEOrURI(N.value, h, r)), !f && oe && (f = this.resolveAndNormalize(r, encodeURI(oe.value))), !f && M && (f = this.resolveAndNormalize(r, encodeURI(M.value))), f || (l.parentNode.nodeType === Hr.DOCUMENT_NODE ? f = a(l.baseURI) : (this.inXHTMLMode || this.inHTMLMode) && (l.localName === "head" || l.localName === "body") ? f = a(l.parentNode.baseURI) === u.parentObject ? a(l.baseURI) : u.parentObject : A ? f = this.newBlankNode() : u.parentObject && (f = a(l.parentNode.baseURI) === u.parentObject ? a(l.baseURI) : u.parentObject, ne || (d = !0))), A && (m = f)), f && (j || N || m)) {
					var le = f;
					A && !j && !N && p && (le = p), this.newSubjectOrigin(l, le);
				}
				if (m) {
					se = this.tokenize(A.value);
					for (let t = 0; t < se.length; t++) {
						var ue = this.parseTermOrCURIEOrAbsURI(se[t], x, u.terms, h, r);
						ue && this.addTriple(l, m, e.typeURI, {
							type: e.objectURI,
							value: ue
						});
					}
				}
				if (f && f !== u.parentObject && (v = {}, y = !0), p) {
					if (te && P) for (let t = 0; t < F.length; t++) {
						let n = v[F[t]];
						n || (n = [], v[F[t]] = n), n.push({
							type: e.objectURI,
							value: p
						});
					}
					else if (te) for (let t = 0; t < F.length; t++) this.addTriple(l, f, F[t], {
						type: e.objectURI,
						value: p
					});
					if (k) for (let t = 0; t < ce.length; t++) this.addTriple(l, p, ce[t], {
						type: e.objectURI,
						value: f
					});
				} else {
					if (f && !p && (te || k) && (p = this.newBlankNode()), te && P) for (let e = 0; e < F.length; e++) {
						let t = v[F[e]];
						t || (t = [], v[I] = t), _.push({
							predicate: F[e],
							list: t
						});
					}
					else if (te) for (let e = 0; e < F.length; e++) _.push({
						predicate: F[e],
						forward: !0
					});
					if (k) for (let e = 0; e < ce.length; e++) _.push({
						predicate: ce[e],
						forward: !1
					});
				}
				if (ne) {
					var de = null, fe = null;
					re ? (de = re.value === "" ? e.PlainLiteralURI : this.parseTermOrCURIEOrAbsURI(re.value, x, u.terms, h, r), fe = ie && !ae ? ie.value : de === e.XMLLiteralURI || de === e.HTMLLiteralURI ? null : ae ? ae.value : l.textContent) : ae ? (de = e.PlainLiteralURI, fe = ae.value) : ie ? (fe = ie.value, de = e.deriveDateTimeType(fe), de ||= e.PlainLiteralURI) : !te && !k && (N && (fe = this.parseSafeCURIEOrCURIEOrURI(N.value, h, r)), !fe && oe ? fe = this.resolveAndNormalize(r, encodeURI(oe.value)) : !fe && M && (fe = this.resolveAndNormalize(r, encodeURI(M.value))), fe && (de = e.objectURI)), de || (A && !j ? (de = e.objectURI, fe = m) : (fe = l.textContent, this.inHTMLMode && l.localName === "time" && (de = e.deriveDateTimeType(fe)), de ||= e.PlainLiteralURI)), se = this.tokenize(ne.value);
					for (let t = 0; t < se.length; t++) {
						let n = this.parsePredicate(se[t], x, u.terms, h, r);
						if (n) {
							if (P) {
								let t = v[n];
								t || (t = [], v[n] = t), t.push(de === e.XMLLiteralURI || de === e.HTMLLiteralURI ? {
									type: de,
									value: l.childNodes
								} : {
									type: de || e.PlainLiteralURI,
									value: fe,
									language: b
								});
							} else de === e.XMLLiteralURI || de === e.HTMLLiteralURI ? this.addTriple(l, f, n, {
								type: de,
								value: l.childNodes
							}) : this.addTriple(l, f, n, {
								type: de || e.PlainLiteralURI,
								value: fe,
								language: b
							});
						}
					}
				}
				if (f && !d) for (let t = 0; t < u.incomplete.length; t++) u.incomplete[t].list ? u.incomplete[t].list.push({
					type: e.objectURI,
					value: f
				}) : u.incomplete[t].forward ? this.addTriple(l, u.subject, u.incomplete[t].predicate, {
					type: e.objectURI,
					value: f
				}) : this.addTriple(l, f, u.incomplete[t].predicate, {
					type: e.objectURI,
					value: u.subject
				});
				var pe = null, me = f;
				d ? (pe = this.push(u, u.subject), pe.parentObject = a(l.parentNode.baseURI) === u.parentObject ? a(l.baseURI) : u.parentObject, pe.incomplete = u.incomplete, pe.language = b, pe.prefixes = h, pe.vocabulary = x) : (pe = this.push(u, f), pe.parentObject = p || f || u.subject, pe.prefixes = h, pe.incomplete = _, p && (me = p, v = {}, y = !0), pe.listMapping = v, pe.language = b, pe.vocabulary = x), y && i.unshift({
					parent: l,
					context: u,
					subject: me,
					listMapping: v
				});
				for (var he = l.lastChild; he; he = he.previousSibling) he.nodeType === Hr.ELEMENT_NODE && i.unshift({
					current: he,
					context: pe
				});
			}
		}
		this.inHTMLMode && this.copyProperties();
		for (let e = 0; e < this.finishedHandlers.length; e++) this.finishedHandlers[e](t);
	}
	push(e, t) {
		return {
			parent: e,
			subject: t || (e ? e.subject : null),
			parentObject: null,
			incomplete: [],
			listMapping: e ? e.listMapping : {},
			language: e ? e.language : this.language,
			prefixes: e ? e.prefixes : this.target.graph.prefixes,
			terms: e ? e.terms : this.target.graph.terms,
			vocabulary: e ? e.vocabulary : this.vocabulary
		};
	}
	resolveAndNormalize(e, t) {
		return Ne(t, e);
	}
	setContext(e) {
		e.localName === "html" && e.getAttribute("version") === "XHTML+RDFa 1.1" ? this.setXHTMLContext() : e.localName === "html" || e.namespaceURI === "http://www.w3.org/1999/xhtml" ? typeof document < "u" && document.doctype ? document.doctype.publicId === "-//W3C//DTD XHTML+RDFa 1.0//EN" && document.doctype.systemId === "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd" ? (console.log("WARNING: RDF 1.0 is not supported.  Defaulting to HTML5 mode."), this.setHTMLContext()) : document.doctype.publicId === "-//W3C//DTD XHTML+RDFa 1.1//EN" && document.doctype.systemId === "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-2.dtd" ? this.setXHTMLContext() : this.setHTMLContext() : this.setHTMLContext() : this.setXMLContext();
	}
	setHTMLContext() {
		this.setInitialContext(), this.langAttributes = [{
			namespaceURI: "http://www.w3.org/XML/1998/namespace",
			localName: "lang"
		}, {
			namespaceURI: null,
			localName: "lang"
		}], this.inXHTMLMode = !1, this.inHTMLMode = !0;
	}
	setInitialContext() {
		this.vocabulary = null, this.langAttributes = [{
			namespaceURI: "http://www.w3.org/XML/1998/namespace",
			localName: "lang"
		}];
	}
	setXHTMLContext() {
		this.setInitialContext(), this.inXHTMLMode = !0, this.inHTMLMode = !1, this.langAttributes = [{
			namespaceURI: "http://www.w3.org/XML/1998/namespace",
			localName: "lang"
		}, {
			namespaceURI: null,
			localName: "lang"
		}], this.target.graph.terms.alternate = "http://www.w3.org/1999/xhtml/vocab#alternate", this.target.graph.terms.appendix = "http://www.w3.org/1999/xhtml/vocab#appendix", this.target.graph.terms.bookmark = "http://www.w3.org/1999/xhtml/vocab#bookmark", this.target.graph.terms.cite = "http://www.w3.org/1999/xhtml/vocab#cite", this.target.graph.terms.chapter = "http://www.w3.org/1999/xhtml/vocab#chapter", this.target.graph.terms.contents = "http://www.w3.org/1999/xhtml/vocab#contents", this.target.graph.terms.copyright = "http://www.w3.org/1999/xhtml/vocab#copyright", this.target.graph.terms.first = "http://www.w3.org/1999/xhtml/vocab#first", this.target.graph.terms.glossary = "http://www.w3.org/1999/xhtml/vocab#glossary", this.target.graph.terms.help = "http://www.w3.org/1999/xhtml/vocab#help", this.target.graph.terms.icon = "http://www.w3.org/1999/xhtml/vocab#icon", this.target.graph.terms.index = "http://www.w3.org/1999/xhtml/vocab#index", this.target.graph.terms.last = "http://www.w3.org/1999/xhtml/vocab#last", this.target.graph.terms.license = "http://www.w3.org/1999/xhtml/vocab#license", this.target.graph.terms.meta = "http://www.w3.org/1999/xhtml/vocab#meta", this.target.graph.terms.next = "http://www.w3.org/1999/xhtml/vocab#next", this.target.graph.terms.prev = "http://www.w3.org/1999/xhtml/vocab#prev", this.target.graph.terms.previous = "http://www.w3.org/1999/xhtml/vocab#previous", this.target.graph.terms.section = "http://www.w3.org/1999/xhtml/vocab#section", this.target.graph.terms.stylesheet = "http://www.w3.org/1999/xhtml/vocab#stylesheet", this.target.graph.terms.subsection = "http://www.w3.org/1999/xhtml/vocab#subsection", this.target.graph.terms.start = "http://www.w3.org/1999/xhtml/vocab#start", this.target.graph.terms.top = "http://www.w3.org/1999/xhtml/vocab#top", this.target.graph.terms.up = "http://www.w3.org/1999/xhtml/vocab#up", this.target.graph.terms.p3pv1 = "http://www.w3.org/1999/xhtml/vocab#p3pv1", this.target.graph.terms.related = "http://www.w3.org/1999/xhtml/vocab#related", this.target.graph.terms.role = "http://www.w3.org/1999/xhtml/vocab#role", this.target.graph.terms.transformation = "http://www.w3.org/1999/xhtml/vocab#transformation";
	}
	setXMLContext() {
		this.setInitialContext(), this.inXHTMLMode = !1, this.inHTMLMode = !1;
	}
	tokenize(e) {
		return this.trim(e).split(/\s+/);
	}
	static tokenize(e) {
		return this.trim(e).split(/\s+/);
	}
	toRDFNodeObject(t) {
		if (t !== void 0) {
			if (typeof t == "string") return t.substring(0, 2) === "_:" ? (this.blankNodes[t.substring(2)] === void 0 && (this.blankNodes[t.substring(2)] = new M(t.substring(2))), this.blankNodes[t.substring(2)]) : ze.namedNode(t);
			switch (t.type) {
				case e.objectURI: return t.value.substring(0, 2) === "_:" ? (this.blankNodes[t.value.substring(2)] === void 0 && (this.blankNodes[t.value.substring(2)] = new M(t.value.substring(2))), this.blankNodes[t.value.substring(2)]) : ze.namedNode(t.value);
				case e.PlainLiteralURI: return new ye(t.value, t.language || "");
				case e.XMLLiteralURI:
				case e.HTMLLiteralURI:
					var n = "";
					return Object.keys(t.value).forEach((e) => {
						n += it(t.value[e], this.htmlOptions);
					}), new ye(n, "", new R(t.type));
				default: return new ye(t.value, "", new R(t.type));
			}
		}
	}
	trim(e) {
		return e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
	}
	static trim(e) {
		return e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
	}
};
Ur.XMLLiteralURI = "http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral", Ur.HTMLLiteralURI = "http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML", Ur.PlainLiteralURI = "http://www.w3.org/1999/02/22-rdf-syntax-ns#PlainLiteral", Ur.objectURI = "http://www.w3.org/1999/02/22-rdf-syntax-ns#object", Ur.typeURI = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", Ur.nameChar = "[-A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�က0-F.0-9·̀-ͯ‿-⁀]", Ur.nameStartChar = "[A-Za-zÀ-ÖØ-öø-ÿĀ-ıĴ-ľŁ-ňŊ-žƀ-ǃǍ-ǰǴ-ǵǺ-ȗɐ-ʨʻ-ˁΆΈ-ΊΌΎ-ΡΣ-ώϐ-ϖϚϜϞϠϢ-ϳЁ-ЌЎ-яё-ќў-ҁҐ-ӄӇ-ӈӋ-ӌӐ-ӫӮ-ӵӸ-ӹԱ-Ֆՙա-ֆא-תװ-ײء-غف-يٱ-ڷں-ھۀ-ێې-ۓەۥ-ۦअ-हऽक़-ॡঅ-ঌএ-ঐও-নপ-রলশ-হড়-ঢ়য়-ৡৰ-ৱਅ-ਊਏ-ਐਓ-ਨਪ-ਰਲ-ਲ਼ਵ-ਸ਼ਸ-ਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઋઍએ-ઑઓ-નપ-રલ-ળવ-હઽૠଅ-ଌଏ-ଐଓ-ନପ-ରଲ-ଳଶ-ହଽଡ଼-ଢ଼ୟ-ୡஅ-ஊஎ-ஐஒ-கங-சஜஞ-டண-தந-பம-வஷ-ஹఅ-ఌఎ-ఐఒ-నప-ళవ-హౠ-ౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹೞೠ-ೡഅ-ഌഎ-ഐഒ-നപ-ഹൠ-ൡก-ฮะา-ำเ-ๅກ-ຂຄງ-ຈຊຍດ-ທນ-ຟມ-ຣລວສ-ຫອ-ຮະາ-ຳຽເ-ໄཀ-ཇཉ-ཀྵႠ-Ⴥა-ჶᄀᄂ-ᄃᄅ-ᄇᄉᄋ-ᄌᄎ-ᄒᄼᄾᅀᅌᅎᅐᅔ-ᅕᅙᅟ-ᅡᅣᅥᅧᅩᅭ-ᅮᅲ-ᅳᅵᆞᆨᆫᆮ-ᆯᆷ-ᆸᆺᆼ-ᇂᇫᇰᇹḀ-ẛẠ-ỹἀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼΩK-Å℮ↀ-ↂぁ-ゔァ-ヺㄅ-ㄬ가-힣一-龥〇〡-〩_]", Ur.NCNAME = RegExp("^" + Ur.nameStartChar + Ur.nameChar + "*$"), Ur.dateTimeTypes = [
	{
		pattern: /-?P(?:[0-9]+Y)?(?:[0-9]+M)?(?:[0-9]+D)?(?:T(?:[0-9]+H)?(?:[0-9]+M)?(?:[0-9]+(?:\.[0-9]+)?S)?)?/,
		type: "http://www.w3.org/2001/XMLSchema#duration"
	},
	{
		pattern: /-?(?:[1-9][0-9][0-9][0-9]|0[1-9][0-9][0-9]|00[1-9][0-9]|000[1-9])-[0-9][0-9]-[0-9][0-9]T(?:[0-1][0-9]|2[0-4]):[0-5][0-9]:[0-5][0-9](?:\.[0-9]+)?(?:Z|[+\-][0-9][0-9]:[0-9][0-9])?/,
		type: "http://www.w3.org/2001/XMLSchema#dateTime"
	},
	{
		pattern: /-?(?:[1-9][0-9][0-9][0-9]|0[1-9][0-9][0-9]|00[1-9][0-9]|000[1-9])-[0-9][0-9]-[0-9][0-9](?:Z|[+\-][0-9][0-9]:[0-9][0-9])?/,
		type: "http://www.w3.org/2001/XMLSchema#date"
	},
	{
		pattern: /(?:[0-1][0-9]|2[0-4]):[0-5][0-9]:[0-5][0-9](?:\.[0-9]+)?(?:Z|[+\-][0-9][0-9]:[0-9][0-9])?/,
		type: "http://www.w3.org/2001/XMLSchema#time"
	},
	{
		pattern: /-?(?:[1-9][0-9][0-9][0-9]|0[1-9][0-9][0-9]|00[1-9][0-9]|000[1-9])-[0-9][0-9]/,
		type: "http://www.w3.org/2001/XMLSchema#gYearMonth"
	},
	{
		pattern: /-?[1-9][0-9][0-9][0-9]|0[1-9][0-9][0-9]|00[1-9][0-9]|000[1-9]/,
		type: "http://www.w3.org/2001/XMLSchema#gYear"
	}
];
var Wr = Ur.parseRDFaDOM, J = class e {
	constructor(e) {
		this.store = e, this.bnodes = {}, this.why = null, this.reify = !1;
	}
	frameFactory(t, n, r) {
		return {
			NODE: 1,
			ARC: 2,
			parent: n,
			parser: t,
			store: t.store,
			element: r,
			lastChild: 0,
			base: null,
			lang: null,
			node: null,
			nodeType: null,
			listIndex: 1,
			rdfid: null,
			datatype: null,
			collection: !1,
			terminateFrame: function() {
				this.collection && this.node.close();
			},
			addSymbol: function(e, t) {
				t = Ne(t, this.base), this.node = this.store.sym(t), this.nodeType = e;
			},
			loadTriple: function() {
				if (this.parent.parent.collection ? this.parent.parent.node.append(this.node) : this.store.add(this.parent.parent.node, this.parent.node, this.node, this.parser.why), this.parent.rdfid != null) {
					var t = this.store.sym(Ne("#" + this.parent.rdfid, this.base));
					this.store.add(t, this.store.sym(e.ns.RDF + "type"), this.store.sym(e.ns.RDF + "Statement"), this.parser.why), this.store.add(t, this.store.sym(e.ns.RDF + "subject"), this.parent.parent.node, this.parser.why), this.store.add(t, this.store.sym(e.ns.RDF + "predicate"), this.parent.node, this.parser.why), this.store.add(t, this.store.sym(e.ns.RDF + "object"), this.node, this.parser.why);
				}
			},
			isTripleToLoad: function() {
				return this.parent != null && this.parent.parent != null && this.nodeType === this.NODE && this.parent.nodeType === this.ARC && this.parent.parent.nodeType === this.NODE;
			},
			addNode: function(e) {
				this.addSymbol(this.NODE, e), this.isTripleToLoad() && this.loadTriple();
			},
			addCollection: function() {
				this.nodeType = this.NODE, this.node = this.store.collection(), this.collection = !0, this.isTripleToLoad() && this.loadTriple();
			},
			addCollectionArc: function() {
				this.nodeType = this.ARC;
			},
			addBNode: function(e) {
				this.node = e == null ? this.store.bnode() : this.parser.bnodes[e] == null ? this.parser.bnodes[e] = this.store.bnode() : this.parser.bnodes[e], this.nodeType = this.NODE, this.isTripleToLoad() && this.loadTriple();
			},
			addArc: function(t) {
				t === e.ns.RDF + "li" && (t = e.ns.RDF + "_" + this.parent.listIndex, this.parent.listIndex++), this.addSymbol(this.ARC, t);
			},
			addLiteral: function(t) {
				this.node = this.parent.datatype && this.parent.datatype !== e.ns.RDF + "langString" ? this.store.literal(t, this.store.sym(this.parent.datatype)) : this.store.literal(t, this.lang), this.nodeType = this.NODE, this.isTripleToLoad() && this.loadTriple();
			}
		};
	}
	getAttributeNodeNS(e, t, n) {
		var r = null;
		if (e.getAttributeNodeNS) r = e.getAttributeNodeNS(t, n);
		else for (var i = e.attributes, a, o, s = 0; s < i.length; ++s) if (a = i[s], a.namespaceURI === t && (o = a.prefix ? a.prefix + ":" + n : n, o === a.nodeName)) {
			r = a;
			break;
		}
		return r;
	}
	parse(t, n, r) {
		var i = t.childNodes;
		this.cleanParser();
		var a;
		if (t.nodeType === e.nodeType.DOCUMENT) {
			for (var o = 0; o < i.length; o++) if (i[o].nodeType === e.nodeType.ELEMENT) {
				a = i[o];
				break;
			}
		} else if (t.nodeType === e.nodeType.ELEMENT) a = t;
		else throw Error("RDFParser: can't find root in " + n + ". Halting. ");
		this.why = r;
		var s = this.frameFactory(this);
		return this.base = n, s.base = n, s.lang = null, this.parseDOM(this.buildFrame(s, a)), !0;
	}
	parseDOM(t) {
		for (var n, r = function(e) {
			var t = "";
			if (e.namespaceURI == null) throw Error("RDF/XML syntax error: No namespace for " + e.localName + " in " + this.base);
			return e.namespaceURI && (t += e.namespaceURI), e.localName ? t += e.localName : e.nodeName && (e.nodeName.indexOf(":") >= 0 ? t += e.nodeName.split(":")[1] : t += e.nodeName), t;
		}.bind(this), i = !0; t.parent;) {
			var a = t.element, o = a.attributes;
			if (a.nodeType === e.nodeType.TEXT || a.nodeType === e.nodeType.CDATA_SECTION) t.parent.nodeType === t.NODE && (t.addArc(e.ns.RDF + "value"), t = this.buildFrame(t)), t.addLiteral(a.nodeValue);
			else if (r(a) !== e.ns.RDF + "RDF") {
				if (t.parent && t.parent.collection && (t.addCollectionArc(), t = this.buildFrame(t, t.element), t.parent.element = null), !t.parent || !t.parent.nodeType || t.parent.nodeType === t.ARC) {
					var s = this.getAttributeNodeNS(a, e.ns.RDF, "about");
					if (n = this.getAttributeNodeNS(a, e.ns.RDF, "ID"), s && n) throw Error("RDFParser: " + a.nodeName + " has both rdf:id and rdf:about. Halting. Only one of these properties may be specified on a node.");
					if (!s && n) t.addNode("#" + n.nodeValue), a.removeAttributeNode(n);
					else if (s == null && n == null) {
						var c = this.getAttributeNodeNS(a, e.ns.RDF, "nodeID");
						c ? (t.addBNode(c.nodeValue), a.removeAttributeNode(c)) : t.addBNode();
					} else t.addNode(s.nodeValue), a.removeAttributeNode(s);
					var l = this.getAttributeNodeNS(a, e.ns.RDF, "type");
					e.ns.RDF + "Description" !== r(a) && (l = { nodeValue: r(a) }), l != null && (this.store.add(t.node, this.store.sym(e.ns.RDF + "type"), this.store.sym(Ne(l.nodeValue, t.base)), this.why), l.nodeName && a.removeAttributeNode(l));
					for (var u = o.length - 1; u >= 0; u--) this.store.add(t.node, this.store.sym(r(o[u])), this.store.literal(o[u].nodeValue, t.lang), this.why);
				} else {
					t.addArc(r(a)), this.reify && (n = this.getAttributeNodeNS(a, e.ns.RDF, "ID"), n && (t.rdfid = n.nodeValue, a.removeAttributeNode(n)));
					var d = this.getAttributeNodeNS(a, e.ns.RDF, "parseType"), f = this.getAttributeNodeNS(a, e.ns.RDF, "datatype");
					if (f && (t.datatype = f.nodeValue, a.removeAttributeNode(f)), d) {
						var p = d.nodeValue;
						p === "Literal" ? (t.datatype = e.ns.RDF + "XMLLiteral", t = this.buildFrame(t), t.addLiteral(a.innerHTML || a.childNodes), i = !1) : p === "Resource" ? (t = this.buildFrame(t, t.element), t.parent.element = null, t.addBNode()) : p === "Collection" && (t = this.buildFrame(t, t.element), t.parent.element = null, t.addCollection()), a.removeAttributeNode(d);
					}
					if (o.length !== 0) {
						var m = this.getAttributeNodeNS(a, e.ns.RDF, "resource"), h = this.getAttributeNodeNS(a, e.ns.RDF, "nodeID");
						t = this.buildFrame(t), m ? (t.addNode(m.nodeValue), a.removeAttributeNode(m)) : h ? (t.addBNode(h.nodeValue), a.removeAttributeNode(h)) : t.addBNode();
						for (var g = o.length - 1; g >= 0; g--) {
							var _ = this.buildFrame(t);
							_.addArc(r(o[g])), r(o[g]) === e.ns.RDF + "type" ? this.buildFrame(_).addNode(o[g].nodeValue) : this.buildFrame(_).addLiteral(o[g].nodeValue);
						}
					} else a.childNodes.length === 0 && this.buildFrame(t).addLiteral("");
				}
			}
			for (a = t.element; t.parent;) {
				for (var v = t; a == null;) t = t.parent, a = t.element;
				var y = a.childNodes && a.childNodes[t.lastChild];
				if (!y || !i) {
					if (t.terminateFrame(), !(t = t.parent)) break;
					a = t.element, i = !0;
				} else if (y.nodeType !== e.nodeType.ELEMENT && y.nodeType !== e.nodeType.TEXT && y.nodeType !== e.nodeType.CDATA_SECTION || (y.nodeType === e.nodeType.TEXT || y.nodeType === e.nodeType.CDATA_SECTION) && a.childNodes.length !== 1) t.lastChild++;
				else {
					t.lastChild++, t = this.buildFrame(v, a.childNodes[t.lastChild - 1]);
					break;
				}
			}
		}
	}
	cleanParser() {
		this.bnodes = {}, this.why = null;
	}
	buildFrame(t, n) {
		var r = this.frameFactory(this, t, n);
		if (t && (r.base = t.base, r.lang = t.lang), !n || n.nodeType === e.nodeType.TEXT || n.nodeType === e.nodeType.CDATA_SECTION) return r;
		var i = n.attributes, a = n.getAttributeNode("xml:base");
		a != null && (r.base = a.nodeValue, n.removeAttribute("xml:base"));
		var o = n.getAttributeNode("xml:lang");
		o != null && (r.lang = o.nodeValue, n.removeAttribute("xml:lang"));
		for (var s = i.length - 1; s >= 0; s--) if (i[s].nodeName.substr(0, 3) === "xml") {
			if (i[s].name.slice(0, 6) === "xmlns:") {
				var c = i[s].nodeValue;
				this.base && (c = Ne(c, this.base)), this.store.setPrefixForURI(i[s].name.slice(6), c);
			}
			n.removeAttributeNode(i[s]);
		}
		return r;
	}
};
g(J, "ns", {
	RDF: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
	RDFS: "http://www.w3.org/2000/01/rdf-schema#"
}), g(J, "nodeType", {
	ELEMENT: 1,
	ATTRIBUTE: 2,
	TEXT: 3,
	CDATA_SECTION: 4,
	ENTITY_REFERENCE: 5,
	ENTITY: 6,
	PROCESSING_INSTRUCTION: 7,
	COMMENT: 8,
	DOCUMENT: 9,
	DOCUMENT_TYPE: 10,
	DOCUMENT_FRAGMENT: 11,
	NOTATION: 12
});
// node_modules/rdflib/esm/patch-parser.js
function Gr(e, t, n) {
	var r, i, a, o = [
		"INSERT",
		"DELETE",
		"WHERE"
	], s = Be("http://www.w3.org/ns/pim/patch#"), c = yn(t, t, n, n, null, null, "", null), l = {}, u = function(e, t, n, r, i) {
		return "Line " + (t + 1) + " of <" + e + ">: Bad syntax:\n   " + i + "\n   at: \"" + n.slice(r, r + 30) + "\"";
	};
	r = 0;
	var d = t.sym(n + "#query");
	for (l.query = d;;) {
		if (i = c.skipSpace(e, r), i < 0) return l;
		if (e[i] === ";") {
			if (r = c.skipSpace(e, i + 1), r < 0) return l;
			i = r;
		}
		var f = !1;
		for (a = 0; a < o.length; a++) {
			var p = o[a];
			if (e.slice(i, i + p.length) === p) {
				if (r = c.skipSpace(e, i + p.length), r < 0) throw u(c._thisDoc, c.lines, e, i + p.length, "found EOF, needed {...} after " + p);
				if ((p === "INSERT" || p === "DELETE") && e.slice(r, r + 4) === "DATA") {
					if (i = c.skipSpace(e, r + 4), i < 0) throw u(c._thisDoc, c.lines, e, r + 4, "needed {...} after INSERT DATA " + p);
					r = i;
				}
				var m = [];
				if (i = c.node(e, r, m), i < 0) throw u(c._thisDoc, c.lines, e, r, "bad syntax or EOF in {...} after " + p);
				l[p.toLowerCase()] = m[0], t.add(d, s(p.toLowerCase()), m[0]), f = !0, r = i;
			}
		}
		if (!f && e.slice(i, i + 7) === "@prefix") {
			if (r = c.directive(e, i), r < 0) throw u(c._thisDoc, c.lines, e, r, "bad syntax or EOF after @prefix ");
			r = c.checkDot(e, r), f = !0;
		}
		if (!f) throw u(c._thisDoc, c.lines, e, i, "Unknown syntax at start of statememt: '" + e.slice(i).slice(0, 20) + "'");
	}
}
// node_modules/rdflib/esm/parse.js
function Kr(e, t, n, r = "text/turtle", i) {
	r ||= "text/turtle", r = r.split(";")[0];
	try {
		if (r === "text/n3" || r === "text/turtle" || r === "application/n-triples") yn(t, t, n, n, null, null, "", null).loadBuf(e), o();
		else if (r === "application/rdf+xml") new J(t).parse(ut(e), n, t.sym(n)), o();
		else if (r === "application/xhtml+xml") Wr(ut(e, { contentType: j }), t, n), o();
		else if (r === "text/html") Wr(ut(e, { contentType: D }), t, n), o();
		else if (r === "application/sparql-update" || r === "application/sparql-update-single-match") Gr(e, t, n), o();
		else if (r === "application/ld+json") En(e, t, n).then(o).catch(s);
		else if (r === "application/n-quads" || r === "application/nquads") {
			var a = new Rr({ factory: Sn });
			c(null, e);
		} else if (r === void 0) throw Error("contentType is undefined");
		else throw Error("Don't know how to parse " + r + " yet");
	} catch (e) {
		s(e);
	}
	Kr.handled = {
		"text/n3": !0,
		"text/turtle": !0,
		"application/rdf+xml": !0,
		"application/xhtml+xml": !0,
		"text/html": !0,
		"application/sparql-update": !0,
		"application/sparql-update-single-match": !0,
		"application/ld+json": !0,
		"application/nquads": !0,
		"application/n-quads": !0,
		"application/n-triples": !0
	};
	function o() {
		if (i) i(null, t);
		else return;
	}
	function s(e) {
		if (r !== "application/ld+json" || r !== "application/n-quads" || r !== "application/nquads") {
			if (i) i(e, t);
			else {
				let t = /* @__PURE__ */ Error("" + e + " while trying to parse <" + n + "> as " + r);
				throw t.cause = e, t;
			}
		}
	}
	function c(e, n) {
		e && i(e, t);
		try {
			a.parse(n, l);
		} catch (e) {
			i(e, t);
		}
	}
	function l(e, n) {
		n ? t.add(n.subject, n.predicate, n.object, n.graph) : i(e, t);
	}
}
// node_modules/rdflib/esm/fetcher.js
var qr = /* @__PURE__ */ u((/* @__PURE__ */ s(((e, t) => {
	var n = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof global < "u" && global, r = (function() {
		function e() {
			this.fetch = !1, this.DOMException = n.DOMException;
		}
		return e.prototype = n, new e();
	})();
	(function(e) {
		(function(t) {
			var n = e !== void 0 && e || typeof self < "u" && self || typeof global < "u" && global || {}, r = {
				searchParams: "URLSearchParams" in n,
				iterable: "Symbol" in n && "iterator" in Symbol,
				blob: "FileReader" in n && "Blob" in n && (function() {
					try {
						return new Blob(), !0;
					} catch {
						return !1;
					}
				})(),
				formData: "FormData" in n,
				arrayBuffer: "ArrayBuffer" in n
			};
			function i(e) {
				return e && DataView.prototype.isPrototypeOf(e);
			}
			if (r.arrayBuffer) var a = [
				"[object Int8Array]",
				"[object Uint8Array]",
				"[object Uint8ClampedArray]",
				"[object Int16Array]",
				"[object Uint16Array]",
				"[object Int32Array]",
				"[object Uint32Array]",
				"[object Float32Array]",
				"[object Float64Array]"
			], o = ArrayBuffer.isView || function(e) {
				return e && a.indexOf(Object.prototype.toString.call(e)) > -1;
			};
			function s(e) {
				if (typeof e != "string" && (e = String(e)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || e === "") throw TypeError("Invalid character in header field name: \"" + e + "\"");
				return e.toLowerCase();
			}
			function c(e) {
				return typeof e != "string" && (e = String(e)), e;
			}
			function l(e) {
				var t = { next: function() {
					var t = e.shift();
					return {
						done: t === void 0,
						value: t
					};
				} };
				return r.iterable && (t[Symbol.iterator] = function() {
					return t;
				}), t;
			}
			function u(e) {
				this.map = {}, e instanceof u ? e.forEach(function(e, t) {
					this.append(t, e);
				}, this) : Array.isArray(e) ? e.forEach(function(e) {
					if (e.length != 2) throw TypeError("Headers constructor: expected name/value pair to be length 2, found" + e.length);
					this.append(e[0], e[1]);
				}, this) : e && Object.getOwnPropertyNames(e).forEach(function(t) {
					this.append(t, e[t]);
				}, this);
			}
			u.prototype.append = function(e, t) {
				e = s(e), t = c(t);
				var n = this.map[e];
				this.map[e] = n ? n + ", " + t : t;
			}, u.prototype.delete = function(e) {
				delete this.map[s(e)];
			}, u.prototype.get = function(e) {
				return e = s(e), this.has(e) ? this.map[e] : null;
			}, u.prototype.has = function(e) {
				return this.map.hasOwnProperty(s(e));
			}, u.prototype.set = function(e, t) {
				this.map[s(e)] = c(t);
			}, u.prototype.forEach = function(e, t) {
				for (var n in this.map) this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this);
			}, u.prototype.keys = function() {
				var e = [];
				return this.forEach(function(t, n) {
					e.push(n);
				}), l(e);
			}, u.prototype.values = function() {
				var e = [];
				return this.forEach(function(t) {
					e.push(t);
				}), l(e);
			}, u.prototype.entries = function() {
				var e = [];
				return this.forEach(function(t, n) {
					e.push([n, t]);
				}), l(e);
			}, r.iterable && (u.prototype[Symbol.iterator] = u.prototype.entries);
			function d(e) {
				if (!e._noBody) {
					if (e.bodyUsed) return Promise.reject(/* @__PURE__ */ TypeError("Already read"));
					e.bodyUsed = !0;
				}
			}
			function f(e) {
				return new Promise(function(t, n) {
					e.onload = function() {
						t(e.result);
					}, e.onerror = function() {
						n(e.error);
					};
				});
			}
			function p(e) {
				var t = new FileReader(), n = f(t);
				return t.readAsArrayBuffer(e), n;
			}
			function m(e) {
				var t = new FileReader(), n = f(t), r = /charset=([A-Za-z0-9_-]+)/.exec(e.type), i = r ? r[1] : "utf-8";
				return t.readAsText(e, i), n;
			}
			function h(e) {
				for (var t = new Uint8Array(e), n = Array(t.length), r = 0; r < t.length; r++) n[r] = String.fromCharCode(t[r]);
				return n.join("");
			}
			function g(e) {
				if (e.slice) return e.slice(0);
				var t = new Uint8Array(e.byteLength);
				return t.set(new Uint8Array(e)), t.buffer;
			}
			function _() {
				return this.bodyUsed = !1, this._initBody = function(e) {
					this.bodyUsed = this.bodyUsed, this._bodyInit = e, e ? typeof e == "string" ? this._bodyText = e : r.blob && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : r.formData && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : r.searchParams && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : r.arrayBuffer && r.blob && i(e) ? (this._bodyArrayBuffer = g(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : r.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(e) || o(e)) ? this._bodyArrayBuffer = g(e) : this._bodyText = e = Object.prototype.toString.call(e) : (this._noBody = !0, this._bodyText = ""), this.headers.get("content-type") || (typeof e == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : r.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
				}, r.blob && (this.blob = function() {
					var e = d(this);
					if (e) return e;
					if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
					if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
					if (this._bodyFormData) throw Error("could not read FormData body as blob");
					return Promise.resolve(new Blob([this._bodyText]));
				}), this.arrayBuffer = function() {
					if (this._bodyArrayBuffer) return d(this) || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength)) : Promise.resolve(this._bodyArrayBuffer));
					if (r.blob) return this.blob().then(p);
					throw Error("could not read as ArrayBuffer");
				}, this.text = function() {
					var e = d(this);
					if (e) return e;
					if (this._bodyBlob) return m(this._bodyBlob);
					if (this._bodyArrayBuffer) return Promise.resolve(h(this._bodyArrayBuffer));
					if (this._bodyFormData) throw Error("could not read FormData body as text");
					return Promise.resolve(this._bodyText);
				}, r.formData && (this.formData = function() {
					return this.text().then(x);
				}), this.json = function() {
					return this.text().then(JSON.parse);
				}, this;
			}
			var v = [
				"CONNECT",
				"DELETE",
				"GET",
				"HEAD",
				"OPTIONS",
				"PATCH",
				"POST",
				"PUT",
				"TRACE"
			];
			function y(e) {
				var t = e.toUpperCase();
				return v.indexOf(t) > -1 ? t : e;
			}
			function b(e, t) {
				if (!(this instanceof b)) throw TypeError("Please use the \"new\" operator, this DOM object constructor cannot be called as a function.");
				t ||= {};
				var r = t.body;
				if (e instanceof b) {
					if (e.bodyUsed) throw TypeError("Already read");
					this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new u(e.headers)), this.method = e.method, this.mode = e.mode, this.signal = e.signal, !r && e._bodyInit != null && (r = e._bodyInit, e.bodyUsed = !0);
				} else this.url = String(e);
				if (this.credentials = t.credentials || this.credentials || "same-origin", (t.headers || !this.headers) && (this.headers = new u(t.headers)), this.method = y(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.signal = t.signal || this.signal || function() {
					if ("AbortController" in n) return new AbortController().signal;
				}(), this.referrer = null, (this.method === "GET" || this.method === "HEAD") && r) throw TypeError("Body not allowed for GET or HEAD requests");
				if (this._initBody(r), (this.method === "GET" || this.method === "HEAD") && (t.cache === "no-store" || t.cache === "no-cache")) {
					var i = /([?&])_=[^&]*/;
					if (i.test(this.url)) this.url = this.url.replace(i, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
					else {
						var a = /\?/;
						this.url += (a.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
					}
				}
			}
			b.prototype.clone = function() {
				return new b(this, { body: this._bodyInit });
			};
			function x(e) {
				var t = new FormData();
				return e.trim().split("&").forEach(function(e) {
					if (e) {
						var n = e.split("="), r = n.shift().replace(/\+/g, " "), i = n.join("=").replace(/\+/g, " ");
						t.append(decodeURIComponent(r), decodeURIComponent(i));
					}
				}), t;
			}
			function S(e) {
				var t = new u();
				return e.replace(/\r?\n[\t ]+/g, " ").split("\r").map(function(e) {
					return e.indexOf("\n") === 0 ? e.substr(1, e.length) : e;
				}).forEach(function(e) {
					var n = e.split(":"), r = n.shift().trim();
					if (r) {
						var i = n.join(":").trim();
						try {
							t.append(r, i);
						} catch (e) {
							console.warn("Response " + e.message);
						}
					}
				}), t;
			}
			_.call(b.prototype);
			function C(e, t) {
				if (!(this instanceof C)) throw TypeError("Please use the \"new\" operator, this DOM object constructor cannot be called as a function.");
				if (t ||= {}, this.type = "default", this.status = t.status === void 0 ? 200 : t.status, this.status < 200 || this.status > 599) throw RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
				this.ok = this.status >= 200 && this.status < 300, this.statusText = t.statusText === void 0 ? "" : "" + t.statusText, this.headers = new u(t.headers), this.url = t.url || "", this._initBody(e);
			}
			_.call(C.prototype), C.prototype.clone = function() {
				return new C(this._bodyInit, {
					status: this.status,
					statusText: this.statusText,
					headers: new u(this.headers),
					url: this.url
				});
			}, C.error = function() {
				var e = new C(null, {
					status: 200,
					statusText: ""
				});
				return e.ok = !1, e.status = 0, e.type = "error", e;
			};
			var w = [
				301,
				302,
				303,
				307,
				308
			];
			C.redirect = function(e, t) {
				if (w.indexOf(t) === -1) throw RangeError("Invalid status code");
				return new C(null, {
					status: t,
					headers: { location: e }
				});
			}, t.DOMException = n.DOMException;
			try {
				new t.DOMException();
			} catch {
				t.DOMException = function(e, t) {
					this.message = e, this.name = t;
					var n = Error(e);
					this.stack = n.stack;
				}, t.DOMException.prototype = Object.create(Error.prototype), t.DOMException.prototype.constructor = t.DOMException;
			}
			function T(e, i) {
				return new Promise(function(a, o) {
					var l = new b(e, i);
					if (l.signal && l.signal.aborted) return o(new t.DOMException("Aborted", "AbortError"));
					var d = new XMLHttpRequest();
					function f() {
						d.abort();
					}
					d.onload = function() {
						var e = {
							statusText: d.statusText,
							headers: S(d.getAllResponseHeaders() || "")
						};
						e.status = l.url.indexOf("file://") === 0 && (d.status < 200 || d.status > 599) ? 200 : d.status, e.url = "responseURL" in d ? d.responseURL : e.headers.get("X-Request-URL");
						var t = "response" in d ? d.response : d.responseText;
						setTimeout(function() {
							a(new C(t, e));
						}, 0);
					}, d.onerror = function() {
						setTimeout(function() {
							o(/* @__PURE__ */ TypeError("Network request failed"));
						}, 0);
					}, d.ontimeout = function() {
						setTimeout(function() {
							o(/* @__PURE__ */ TypeError("Network request timed out"));
						}, 0);
					}, d.onabort = function() {
						setTimeout(function() {
							o(new t.DOMException("Aborted", "AbortError"));
						}, 0);
					};
					function p(e) {
						try {
							return e === "" && n.location.href ? n.location.href : e;
						} catch {
							return e;
						}
					}
					if (d.open(l.method, p(l.url), !0), l.credentials === "include" ? d.withCredentials = !0 : l.credentials === "omit" && (d.withCredentials = !1), "responseType" in d && (r.blob ? d.responseType = "blob" : r.arrayBuffer && (d.responseType = "arraybuffer")), i && typeof i.headers == "object" && !(i.headers instanceof u || n.Headers && i.headers instanceof n.Headers)) {
						var m = [];
						Object.getOwnPropertyNames(i.headers).forEach(function(e) {
							m.push(s(e)), d.setRequestHeader(e, c(i.headers[e]));
						}), l.headers.forEach(function(e, t) {
							m.indexOf(t) === -1 && d.setRequestHeader(t, e);
						});
					} else l.headers.forEach(function(e, t) {
						d.setRequestHeader(t, e);
					});
					l.signal && (l.signal.addEventListener("abort", f), d.onreadystatechange = function() {
						d.readyState === 4 && l.signal.removeEventListener("abort", f);
					}), d.send(l._bodyInit === void 0 ? null : l._bodyInit);
				});
			}
			return T.polyfill = !0, n.fetch || (n.fetch = T, n.Headers = u, n.Request = b, n.Response = C), t.Headers = u, t.Request = b, t.Response = C, t.fetch = T, t;
		})({});
	})(r), r.fetch.ponyfill = !0, delete r.fetch.polyfill;
	var i = n.fetch ? n : r;
	e = i.fetch, e.default = i.fetch, e.fetch = i.fetch, e.Headers = i.Headers, e.Request = i.Request, e.Response = i.Response, t.exports = e;
})))()), Jr = {
	"text/n3": !0,
	"text/turtle": !0,
	"application/rdf+xml": !0,
	"application/xhtml+xml": !0,
	"text/html": !0,
	"application/ld+json": !0
}, Yr = {
	rdf: re,
	owl: re,
	n3: "text/n3",
	ttl: "text/turtle",
	nt: "text/n3",
	acl: "text/n3",
	html: "text/html",
	xml: "text/xml"
}, Xr = (e) => ({
	link: Be("http://www.w3.org/2007/ont/link#", e),
	http: Be("http://www.w3.org/2007/ont/http#", e),
	httph: Be("http://www.w3.org/2007/ont/httph#", e),
	rdf: Be("http://www.w3.org/1999/02/22-rdf-syntax-ns#", e),
	rdfs: Be("http://www.w3.org/2000/01/rdf-schema#", e),
	dc: Be("http://purl.org/dc/elements/1.1/", e),
	ldp: Be("http://www.w3.org/ns/ldp#", e)
}), Zr = Xr(), Qr = class {
	constructor(e, t) {
		g(this, "response", void 0), g(this, "dom", void 0), this.response = e, this.dom = t;
	}
};
g(Qr, "pattern", void 0);
var $r = class extends Qr {
	static toString() {
		return "RDFXMLHandler";
	}
	static register(e) {
		e.mediatypes[re] = { q: .9 };
	}
	parse(e, t, n) {
		let r = e.store;
		this.dom ||= ut(t);
		let i = this.dom.documentElement;
		if (i && i.nodeName === "parsererror") return e.failFetch(n, "Badly formed XML in " + n.resource.value, "parse_error");
		let a = new J(r);
		try {
			a.parse(this.dom, n.original.value, n.original);
		} catch (t) {
			return e.failFetch(n, "Syntax error parsing RDF/XML! " + t, "parse_error");
		}
		return n.noMeta || r.add(n.original, Zr.rdf("type"), Zr.link("RDFDocument"), e.appNode), e.doneFetch(n, this.response);
	}
};
$r.pattern = /* @__PURE__ */ RegExp("application/rdf\\+xml");
var ei = class extends Qr {
	static toString() {
		return "XHTMLHandler";
	}
	static register(e) {
		e.mediatypes[j] = { q: .8 };
	}
	parse(e, t, n) {
		let r, i;
		this.dom ||= ut(t);
		let a = e.store, o = this.dom.getElementsByTagName("title");
		o.length > 0 && a.add(n.resource, Zr.dc("title"), a.rdfFactory.literal(o[0].textContent), n.resource);
		let s = this.dom.getElementsByTagName("link");
		for (let t = s.length - 1; t >= 0; t--) r = s[t].getAttribute("rel"), i = !1, r || (r = s[t].getAttribute("rev"), i = !0), r && e.linkData(n.original, r, s[t].getAttribute("href"), n.resource, i);
		let c = this.dom.getElementsByTagName("script");
		for (let e = 0; e < c.length; e++) {
			let t = c[e].getAttribute("type");
			Jr[t] && (Kr(c[e].textContent, a, n.original.value, t), Kr(c[e].textContent, a, n.original.value, t));
		}
		if (n.noMeta || a.add(n.resource, Zr.rdf("type"), Zr.link("WebPage"), e.appNode), !n.noRDFa && Wr) try {
			Wr(this.dom, a, n.original.value);
		} catch (t) {
			let r = "Error trying to parse " + n.resource + " as RDFa:\n" + t + ":\n" + t.stack;
			return e.failFetch(n, r, "parse_error");
		}
		return e.doneFetch(n, this.response);
	}
};
ei.pattern = /* @__PURE__ */ RegExp("application/xhtml");
var ti = class e extends Qr {
	static toString() {
		return "XMLHandler";
	}
	static register(e) {
		e.mediatypes["text/xml"] = { q: .5 }, e.mediatypes["application/xml"] = { q: .5 };
	}
	static isElement(e) {
		return e.nodeType === Node.ELEMENT_NODE;
	}
	parse(t, n, r) {
		let i = ut(n);
		for (let a = 0; a < i.childNodes.length; a++) {
			let o = i.childNodes[a];
			if (e.isElement(o)) {
				let e = o.namespaceURI;
				if (e && e === e.rdf) return t.addStatus(r.req, "Has XML root element in the RDF namespace, so assume RDF/XML."), new $r(this.response, i).parse(t, n, r);
				break;
			}
		}
		if (i.doctype && i.doctype.name === "html" && i.doctype.publicId.match(/^-\/\/W3C\/\/DTD XHTML/) && i.doctype.systemId.match(/http:\/\/www.w3.org\/TR\/xhtml/)) return t.addStatus(r.req, "Has XHTML DOCTYPE. Switching to XHTML Handler.\n"), new ei(this.response, i).parse(t, n, r);
		let a = i.getElementsByTagName("html")[0];
		if (a) {
			let e = a.getAttribute("xmlns");
			if (e && e.match(/^http:\/\/www.w3.org\/1999\/xhtml/)) return t.addStatus(r.req, "Has a default namespace for XHTML. Switching to XHTMLHandler.\n"), new ei(this.response, i).parse(t, n, r);
		}
		return t.failFetch(r, "Unsupported dialect of XML: not RDF or XHTML namespace, etc.\n" + n.slice(0, 80), 901);
	}
};
ti.pattern = /* @__PURE__ */ RegExp("(text|application)/(.*)xml");
var ni = class extends Qr {
	static toString() {
		return "HTMLHandler";
	}
	static register(e) {
		e.mediatypes["text/html"] = { q: .8 };
	}
	parse(e, t, n) {
		let r = e.store;
		if (si(t)) return e.addStatus(n.req, "Has an XML declaration. We'll assume it's XHTML as the content-type was text/html.\n"), new ei(this.response).parse(e, t, n);
		if (oi(t)) return e.addStatus(n.req, "Has XHTML DOCTYPE. Switching to XHTMLHandler.\n"), new ei(this.response).parse(e, t, n);
		if (ci(t)) return e.addStatus(n.req, "Has default namespace for XHTML, so switching to XHTMLHandler.\n"), new ei(this.response).parse(e, t, n);
		let i = (/* @__PURE__ */ RegExp("<title>([\\s\\S]+?)</title>", "im")).exec(t);
		return i && r.add(n.resource, Zr.dc("title"), r.rdfFactory.literal(i[1]), n.resource), r.add(n.resource, Zr.rdf("type"), Zr.link("WebPage"), e.appNode), e.addStatus(n.req, "non-XML HTML document, not parsed for data."), e.doneFetch(n, this.response);
	}
};
ni.pattern = /* @__PURE__ */ RegExp("text/html");
var ri = class extends Qr {
	static toString() {
		return "JsonLdHandler";
	}
	static register(e) {
		e.mediatypes["application/ld+json"] = { q: .9 };
	}
	async parse(e, t, n, r) {
		let i = e.store;
		try {
			return await En(t, i, n.original.value), e.store.add(n.original, Zr.rdf("type"), Zr.link("RDFDocument"), e.appNode), e.doneFetch(n, r);
		} catch (t) {
			let i = "Error trying to parse " + n.resource + " as JSON-LD:\n" + t;
			return e.failFetch(n, i, "parse_error", r);
		}
	}
};
ri.pattern = /application\/(ld\+json|activity\+json)/;
var ii = class extends Qr {
	static toString() {
		return "TextHandler";
	}
	static register(e) {
		e.mediatypes["text/plain"] = { q: .5 };
	}
	parse(e, t, n) {
		return si(t) ? (e.addStatus(n.req, "Warning: " + n.resource + " has an XML declaration. We'll assume it's XML but its content-type wasn't XML.\n"), new ti(this.response).parse(e, t, n)) : t.slice(0, 500).match(/xmlns:/) ? (e.addStatus(n.req, "May have an XML namespace. We'll assume it's XML but its content-type wasn't XML.\n"), new ti(this.response).parse(e, t, n)) : (e.addStatus(n.req, "Plain text document, no known RDF semantics."), e.doneFetch(n, this.response));
	}
};
ii.pattern = /* @__PURE__ */ RegExp("text/plain");
var Y = class extends Qr {
	static toString() {
		return "N3Handler";
	}
	static register(e) {
		e.mediatypes["text/n3"] = {}, e.mediatypes["text/turtle"] = {};
	}
	parse(e, t, n, r) {
		let i = e.store, a = yn(i, i, n.original.value, n.original.value, null, null, "", null);
		try {
			a.loadBuf(t);
		} catch (t) {
			let i = "Error trying to parse " + n.resource + " as Notation3:\n" + t;
			return e.failFetch(n, i, "parse_error", r);
		}
		return e.addStatus(n.req, "N3 parsed: " + a.statementCount + " triples in " + a.lines + " lines."), e.store.add(n.original, Zr.rdf("type"), Zr.link("RDFDocument"), e.appNode), e.doneFetch(n, this.response);
	}
};
Y.pattern = /* @__PURE__ */ RegExp("(application|text)/(x-)?(rdf\\+)?(n3|turtle)");
var ai = {
	RDFXMLHandler: $r,
	XHTMLHandler: ei,
	XMLHandler: ti,
	HTMLHandler: ni,
	TextHandler: ii,
	N3Handler: Y,
	JsonLdHandler: ri
};
function oi(e) {
	let t = e.indexOf("<!DOCTYPE html"), n = e.indexOf(">");
	return t === -1 || n === -1 || t > n ? !1 : e.substr(t, n - t).indexOf("XHTML") !== -1;
}
function si(e) {
	return !!e.match(/\s*<\?xml\s+version\s*=[^<>]+\?>/);
}
function ci(e) {
	return !!e.match(/[^(<html)]*<html\s+[^<]*xmlns=['"]http:\/\/www.w3.org\/1999\/xhtml["'][^<]*>/);
}
var li = class e {
	constructor(e, t = {}) {
		g(this, "store", void 0), g(this, "timeout", void 0), g(this, "_fetch", void 0), g(this, "mediatypes", void 0), g(this, "appNode", void 0), g(this, "requested", void 0), g(this, "timeouts", void 0), g(this, "redirectedTo", void 0), g(this, "fetchQueue", void 0), g(this, "fetchCallbacks", void 0), g(this, "nonexistent", void 0), g(this, "lookedUp", void 0), g(this, "handlers", void 0), g(this, "ns", void 0), g(this, "fireCallbacks", void 0), this.store = e || new Pt(), this.ns = Xr(this.store.rdfFactory), this.timeout = t.timeout || 3e4;
		let n = t.fetch || typeof global < "u" && (global.solidFetcher || global.solidFetch) || typeof window < "u" && (window.solidFetcher || window.solidFetch) || qr.default;
		if (!n) throw Error("No _fetch function available for Fetcher");
		this._fetch = typeof window < "u" && n === window.fetch ? n.bind(window) : typeof global < "u" && n === global.fetch ? n.bind(global) : n, this.appNode = this.store.sym("chrome://TheCurrentSession"), this.store.fetcher = this, this.requested = {}, this.timeouts = {}, this.redirectedTo = {}, this.fetchQueue = {}, this.fetchCallbacks = {}, this.nonexistent = {}, this.lookedUp = {}, this.handlers = [], this.mediatypes = {
			"image/*": { q: .9 },
			"*/*": { q: .1 }
		}, nt(this, [
			"request",
			"fail",
			"refresh",
			"retract",
			"done"
		]), Object.keys(t.handlers || ai).map((e) => this.addHandler(ai[e]));
	}
	static crossSiteProxy(t) {
		if (e.crossSiteProxyTemplate) return e.crossSiteProxyTemplate.replace("{uri}", encodeURIComponent(t));
	}
	static offlineOverride(e) {
		let t = e;
		var n;
		return typeof window < "u" && window.panes && (n = window.panes.UI) && n.preferences && n.preferences.get("offlineModeUsingLocalhost") && t.slice(0, 7) === "http://" && t.slice(7, 17) !== "localhost/" && (t = "http://localhost/" + t.slice(7), z.warn("Localhost kludge for offline use: actually getting <" + t + ">")), t;
	}
	static proxyIfNecessary(t) {
		var n;
		if (typeof window < "u" && window.panes && (n = window.panes.UI) && n.isExtension) return t;
		if (typeof $SolidTestEnvironment < "u" && $SolidTestEnvironment.localSiteMap) {
			let e = t.split("/").slice(2), n = (e, t) => {
				let r = t[e.shift()];
				return r ? typeof r == "string" ? r + e.join("/") : e ? n(e, r) : null : null;
			}, r = n(e, $SolidTestEnvironment.localSiteMap);
			if (r) return r;
		}
		return e.crossSiteProxyTemplate && typeof document < "u" && document.location && ("" + document.location).slice(0, 6) === "https:" && t.slice(0, 5) === "http:" ? e.crossSiteProxyTemplate.replace("{uri}", encodeURIComponent(t)) : t;
	}
	static unsupportedProtocol(e) {
		let t = Pe(e);
		return t === "tel" || t === "mailto" || t === "urn";
	}
	static setCredentials(e, t = {}) {
		t.credentials === void 0 && (t.credentials = t.withCredentials === void 0 || t.withCredentials ? "include" : "omit");
	}
	load(e, t = {}) {
		if (t = Object.assign({}, t), e instanceof Array) return Promise.all(e.map((e) => this.load(e, Object.assign({}, t))));
		let n = N(e);
		n = n.split("#")[0], t = this.initFetchOptions(n, t);
		let r = this.appNode, i = this.store, a = i.statementsMatching(void 0, this.ns.link("requestedURI"), i.rdfFactory.literal(n), r).map((e) => e.subject), o = !1, s = !1;
		for (let e of a) {
			let t = i.any(e, this.ns.link("response"), null, r);
			if (t != null && (o = !0, !i.anyJS(t, this.ns.link("outOfDate"), null, r))) {
				s = !0;
				break;
			}
		}
		o && !s && (t.force = !0, t.clearPreviousData = !0);
		let c = this.initFetchOptions(n, t);
		return this.pendingFetchPromise(n, c.baseURI, c);
	}
	async pendingFetchPromise(e, t, n) {
		let r;
		return !n.force && await this.fetchQueue[t] ? r = this.fetchQueue[t] : (r = Promise.race([this.setRequestTimeout(e, n), this.fetchUri(e, n)]), this.fetchQueue[t] = r, this.cleanupFetchRequest(t, void 0, this.timeout)), r.then((t) => (e in this.timeouts && (this.timeouts[e].forEach(clearTimeout), delete this.timeouts[e]), t));
	}
	cleanupFetchRequest(e, t, n) {
		t !== void 0 && console.warn("_options is deprecated"), this.timeouts[e] = (this.timeouts[e] || []).concat(setTimeout(() => {
			this.isPending(e) || delete this.fetchQueue[e];
		}, n));
	}
	initFetchOptions(t, n) {
		let r = this.store;
		n.method && n.method.toUpperCase() !== "GET" && (n.force = !0), n.resource = r.rdfFactory.namedNode(t), n.baseURI = n.baseURI || t, n.original = r.rdfFactory.namedNode(n.baseURI), n.req = r.bnode(), n.headers = n.headers || {}, n.contentType && (n.headers["content-type"] = n.contentType), n.force && (n.cache = "no-cache");
		let i = this.acceptString();
		n.headers.accept = i;
		let a = e.offlineOverride(t);
		n.requestedURI = a, e.setCredentials(a, n);
		let o = e.proxyIfNecessary(a);
		return a !== o && (n.proxyUsed = !0), n.actualProxyURI = o, n;
	}
	fetchUri(t, n) {
		if (!t) return Promise.reject(/* @__PURE__ */ Error("Cannot fetch an empty uri"));
		if (e.unsupportedProtocol(t)) return this.failFetch(n, "fetcher: Unsupported protocol", "unsupported_protocol");
		let r = this.getState(t);
		if (n.force) delete this.nonexistent[t];
		else {
			if (r === "fetched") return Promise.resolve(this.doneFetch(n, {
				status: 200,
				ok: !0,
				statusText: "Already loaded into quadstore."
			}));
			if (r === "failed" && this.requested[t] === 404) {
				let e = "Previously failed: " + this.requested[t], r = {
					url: t,
					status: this.requested[t],
					statusText: e,
					responseText: e,
					headers: new qr.Headers(),
					ok: !1,
					body: null,
					bodyUsed: !1,
					size: 0,
					timeout: 0
				};
				return this.failFetch(n, e, this.requested[t], r);
			}
		}
		this.fireCallbacks("request", [t]), this.requested[t] = !0, n.noMeta || this.saveRequestMetadata(t, n);
		let { actualProxyURI: i } = n;
		return this._fetch(i, n).then((e) => this.handleResponse(e, t, n), (e) => {
			let r = {
				url: i,
				status: 999,
				statusText: (e.name || "network failure") + ": " + (e.errno || e.code || e.type),
				responseText: e.message,
				headers: new qr.Headers(),
				ok: !1,
				body: null,
				bodyUsed: !1,
				size: 0,
				timeout: 0
			};
			return this.handleError(r, t, n);
		});
	}
	nowOrWhenFetched(e, t, n, r = {}) {
		let i = N(e);
		typeof t == "function" ? n = t : t === void 0 || (pe(t) ? r.referringTerm = t : r = t), this.load(i, r).then((e) => {
			if (n) {
				if (e) {
					if (e.ok) n(!0, "OK", e);
					else {
						let t = "HTTP error: Status " + e.status + " (" + e.statusText + ")";
						e.responseText && (t += " " + e.responseText), n(!1, t, e);
					}
				} else n(!1, "@@ nowOrWhenFetched:  no response object!");
			}
		}, function(e) {
			var t = e.message || e.statusText;
			t = "Failed to load  <" + i + "> " + t, e.response && e.response.status && (t += " status: " + e.response.status), n(!1, t, e.response);
		});
	}
	addStatus(e, t) {
		let n = /* @__PURE__ */ new Date();
		t = "[" + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds() + "." + n.getMilliseconds() + "] " + t;
		let r = this.store, i = r.the(e, this.ns.link("status"));
		F(i) ? i.append(r.rdfFactory.literal(t)) : z.warn("web.js: No list to add to: " + i + "," + t);
	}
	failFetch(e, t, n, r) {
		this.addStatus(e.req, t), e.noMeta || this.store.add(e.original, this.ns.link("error"), this.store.rdfFactory.literal(t));
		let i = (e.method || "GET").toUpperCase();
		(i === "GET" || i === "HEAD") && (e.resource.equals(e.original), this.requested[Ae(e.original.value)] = n, this.fireCallbacks("fail", [e.original.value, t]));
		var a = /* @__PURE__ */ Error("Fetcher: " + t);
		return a.status = n, a.statusText = t, a.response = r, Promise.reject(a);
	}
	linkData(e, t, n, r, i) {
		if (!n) return;
		let a = this.store, o = a.rdfFactory.namedNode(Ne(n, e.value)), s;
		if (t === "alternate" || t === "seeAlso" || t === "meta" || t === "describedby") {
			if (o.value === e.value) return;
			s = [a.rdfFactory.namedNode(this.ianaLinkRelation(t)), this.ns.rdfs("seeAlso")];
		} else s = t === "type" ? [a.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type")] : [a.rdfFactory.namedNode(this.ianaLinkRelation(t))];
		a.addAll(s.map((t) => i ? a.rdfFactory.quad(o, t, e, r) : a.rdfFactory.quad(e, t, o, r)));
	}
	ianaLinkRelation(e) {
		return Ne(encodeURIComponent(e), "http://www.iana.org/assignments/link-relations/");
	}
	parseLinkHeader(e, t, n) {
		if (!e) return;
		let r = /<[^>]*>\s*(\s*;\s*[^()<>@,;:"/[\]?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g, i = /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g, a = e.match(r);
		if (a != null) for (let e = 0; e < a.length; e++) {
			let r = a[e].split(">"), o = r[0].substring(1), s = r[1].match(i);
			if (s == null) return;
			for (let e = 0; e < s.length; e++) {
				let r = s[e].split("=")[1].replace(/["']/g, "");
				this.linkData(t, r, o, n);
			}
		}
	}
	doneFetch(e, t) {
		return this.addStatus(e.req, "Done."), this.requested[e.original.value] = "done", this.fireCallbacks("done", [e.original.value]), t.req = e.req, t;
	}
	nowKnownAs(e, t) {
		this.lookedUp[e.value] ? this.lookedUp[t.value] || this.lookUpThing(t, e) : this.lookedUp[t.value] && (this.lookedUp[e.value] || this.lookUpThing(e, t));
	}
	putBack(e, t = {}) {
		let n = N(e), r = new R(n).doc();
		return t.contentType = t["content-type"] || t["Content-Type"] || t.contentType || "text/turtle", t.contentType === "application/ld+json" ? new Promise((n, i) => {
			bt(r, this.store, r.uri, t.contentType, (r, a) => {
				r ? i(r) : (t.data = a, this.webOperation("PUT", e, t).then((e) => n(e)).catch((e) => i(e)));
			});
		}) : (t.data = bt(r, this.store, r.value, t.contentType), this.webOperation("PUT", n, t));
	}
	webCopy(e, t, n) {
		return this.webOperation("GET", e).then((e) => this.webOperation("PUT", t, {
			data: e.responseText,
			contentType: n
		}));
	}
	delete(e, t) {
		return this.webOperation("DELETE", e, t).then((t) => (this.requested[e] = 404, this.nonexistent[e] = !0, this.unload(this.store.rdfFactory.namedNode(e)), t));
	}
	async createIfNotExists(e, t = ie, n = "") {
		let r = this;
		try {
			var i = await r.load(e);
		} catch (a) {
			if (a.response.status === 404) {
				try {
					i = await r.webOperation("PUT", e.value, {
						data: n,
						contentType: t
					});
				} catch (e) {
					throw e;
				}
				return delete r.requested[e.value], i;
			}
			throw a;
		}
		return i;
	}
	createContainer(e, t, n) {
		let r = {
			"content-type": ie,
			link: this.ns.ldp("BasicContainer") + "; rel=\"type\""
		};
		t && (r.slug = t);
		let i = { headers: r };
		return n && (i.body = n), this.webOperation("POST", e, i);
	}
	invalidateCache(e) {
		let t = N(e), n = this;
		if (n.fetchQueue && n.fetchQueue[t] && (n.fetchQueue[t].PromiseStatus, delete n.fetchQueue[t]), n.requested[t] && n.requested[t] !== "done" && n.requested[t] !== "failed" && n.requested[t] !== 404) {
			let e = `Rdflib: fetcher: Destructive operation on <${n.requested[t]}> file being fetched! ` + t;
			console.error(e);
		} else delete n.requested[t], delete n.nonexistent[t];
	}
	webOperation(t, n, r = {}) {
		let i = N(n);
		r.method = t, r.body = r.data || r.body, r.force = !0;
		let a = this;
		if (r.body && !r.contentType) throw Error("Web operation sending data must have a defined contentType.");
		return r.contentType && (r.headers = r.headers || {}, r.headers["content-type"] = r.contentType), e.setCredentials(i, r), new Promise(function(e, n) {
			a._fetch(i, r).then((r) => {
				if (r.ok) (t === "PUT" || t === "PATCH" || t === "POST" || t === "DELETE") && a.invalidateCache(i), r.text ? r.text().then((t) => {
					r.responseText = t, e(r);
				}) : e(r);
				else {
					let e = "Web error: " + r.status;
					r.statusText && (e += " (" + r.statusText + ")"), e += " on " + t + " of <" + i + ">", r.responseText && (e += ": " + r.responseText);
					let a = Error(e);
					a.response = r, n(a);
				}
			}, (e) => {
				let r = "Fetch error for " + t + " of <" + i + ">:" + e;
				n(Error(r));
			});
		});
	}
	lookUpThing(e, t) {
		let n = this.store.uris(e);
		return n = n.map((e) => Ae(e)), n.forEach((e) => {
			this.lookedUp[e] = !0;
		}), this.load(n, { referringTerm: t });
	}
	getHeader(e, t) {
		let n = this.store, r = e.value, i = n.each(void 0, this.ns.link("requestedURI"), n.rdfFactory.literal(r));
		for (let e = 0; e < i.length; e++) {
			let r = i[e];
			if (r !== void 0) {
				let e = n.any(r, this.ns.link("response"));
				if (e !== void 0 && n.anyValue(e, this.ns.http("status")) && n.anyValue(e, this.ns.http("status")).startsWith("2")) {
					let r = n.each(e, this.ns.httph(t.toLowerCase()));
					return r.length ? r.map((e) => e.value) : [];
				}
			}
		}
	}
	saveRequestMetadata(e, t) {
		let n = t.req, r = this.store, i = t.referringTerm;
		this.addStatus(t.req, "Accept: " + t.headers.accept), pe(i) && r.add(r.rdfFactory.namedNode(e), this.ns.link("requestedBy"), i, this.appNode), t.original && t.original.value !== e && r.add(n, this.ns.link("orginalURI"), r.rdfFactory.literal(t.original.value), this.appNode);
		let a = /* @__PURE__ */ new Date(), o = "[" + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds() + "] ";
		r.add(n, this.ns.rdfs("label"), r.rdfFactory.literal(o + " Request for " + e), this.appNode), r.add(n, this.ns.link("requestedURI"), r.rdfFactory.literal(e), this.appNode), r.add(n, this.ns.link("status"), r.collection(), this.appNode);
	}
	saveResponseMetadata(e, t) {
		let n = this.store, r = n.bnode();
		return n.add(t.req, this.ns.link("response"), r, this.appNode), n.add(r, this.ns.http("status"), n.rdfFactory.literal(e.status), this.appNode), n.add(r, this.ns.http("statusText"), n.rdfFactory.literal(e.statusText), this.appNode), e.headers.forEach((e, i) => {
			n.add(r, this.ns.httph(i), this.store.rdfFactory.literal(e), this.appNode), i === "content-type" && n.add(t.resource, this.ns.rdf("type"), n.rdfFactory.namedNode(et(e).value), this.appNode);
		}), r;
	}
	objectRefresh(e) {
		let t = this.store.uris(e);
		if (t !== void 0) for (let e = 0; e < t.length; e++) this.refresh(this.store.rdfFactory.namedNode(Ae(t[e])));
	}
	refresh(e, t) {
		this.fireCallbacks("refresh", arguments), this.nowOrWhenFetched(e, {
			force: !0,
			clearPreviousData: !0
		}, t);
	}
	refreshIfExpired(e, t) {
		let n = this.getHeader(e, "Expires");
		!n || new Date(n[0]).getTime() <= (/* @__PURE__ */ new Date()).getTime() ? this.refresh(e, t) : t(!0, "Not expired", {});
	}
	retract(e) {
		this.store.removeMany(void 0, void 0, void 0, e), e.value && delete this.requested[Ae(e.value)], this.fireCallbacks("retract", arguments);
	}
	getState(e) {
		return this.requested[e] === void 0 ? "unrequested" : this.requested[e] === !0 ? "requested" : this.requested[e] === "done" ? "fetched" : this.requested[e] === "redirected" ? this.getState(this.redirectedTo[e]) : "failed";
	}
	isPending(e) {
		return this.requested[e] === !0;
	}
	unload(e) {
		this.store.removeDocument(e), delete this.requested[e.value];
	}
	addHandler(e) {
		this.handlers.push(e), e.register(this);
	}
	retryNoCredentials(e, t) {
		t.retriedWithNoCredentials = !0, delete this.requested[e], delete this.fetchQueue[e];
		let n = Object.assign({}, t, { credentials: "omit" });
		return this.addStatus(t.req, "Abort: Will retry with credentials SUPPRESSED to see if that helps"), this.load(e, n);
	}
	isCrossSite(e) {
		if (typeof document > "u" || !document.location) return !1;
		let t = Me, n = "" + document.location;
		return (t(n) && t(e) && t(n)) !== t(e);
	}
	handleError(t, n, r) {
		if (this.isCrossSite(n)) {
			if (r.credentials && r.credentials === "include" && !r.retriedWithNoCredentials) return this.retryNoCredentials(n, r);
			let t = e.crossSiteProxy(n);
			if (t && !r.proxyUsed) return this.redirectToProxy(t, r);
		}
		var i;
		return t instanceof Error ? i = "Fetch error: " + t.message : (i = t.statusText, t.responseText && (i += ` ${t.responseText}`)), this.failFetch(r, i, t.status || 998, t);
	}
	addType(e, t, n, r) {
		let i = t;
		if (r) {
			var a = n.any(i, this.ns.link("requestedURI"));
			a && a.value !== r && n.add(n.rdfFactory.namedNode(r), this.ns.rdf("type"), e, this.appNode);
		}
		for (;;) {
			let t = n.any(i, this.ns.link("requestedURI"));
			if (t && t.value && n.add(n.rdfFactory.namedNode(t.value), this.ns.rdf("type"), e, this.appNode), i = n.any(void 0, n.rdfFactory.namedNode("http://www.w3.org/2007/ont/link#redirectedRequest"), i), !i) break;
			var o = n.any(i, n.rdfFactory.namedNode("http://www.w3.org/2007/ont/link#response"));
			if (!o) break;
			var s = n.any(o, n.rdfFactory.namedNode("http://www.w3.org/2007/ont/http#status"));
			if (!s || s !== "301" && s !== "302") break;
		}
	}
	handleResponse(e, t, n) {
		let r = this.store, i = e.headers, a = n.req, o = this.saveResponseMetadata(e, n), s = this.normalizedContentType(n, i) || "", c = i.get("content-location");
		if (e.status === 0) return this.handleError(e, t, n);
		if (e.status >= 400) return e.status === 404 && (this.nonexistent[n.original.value] = !0, this.nonexistent[t] = !0), this.saveErrorResponse(e, o).then(() => {
			let t = n.resource + " " + e.statusText;
			return this.failFetch(n, t, e.status, e);
		});
		var l = null, u = null;
		if (c && (u = Ne(c, t), u !== t && (l = u)), e.status === 200) {
			if (this.addType(this.ns.link("Document"), a, r, t), l && this.addType(this.ns.link("Document"), a, r, l), n.clearPreviousData) {
				let e = r.statementsMatching(void 0, void 0, void 0, n.resource).slice();
				for (let t = 0; t < e.length; t++) r.removeStatement(e[t]);
			}
			let e = s.includes("image/") || s.includes("application/pdf");
			s && e && (this.addType(r.rdfFactory.namedNode("http://purl.org/dc/terms/Image"), a, r, t), l && this.addType(r.rdfFactory.namedNode("http://purl.org/dc/terms/Image"), a, r, l));
		}
		if (c) {
			if (!n.force && l && this.requested[u] === "done") return this.doneFetch(n, e);
			this.requested[u] = !0;
		}
		this.parseLinkHeader(i.get("link"), n.original, a);
		let d = this.handlerForContentType(s, e);
		return d ? e.text().then((t) => (e.responseText = t, d.parse(this, t, n, e))) : (this.addStatus(a, "Fetch over. No data handled."), this.doneFetch(n, e));
	}
	saveErrorResponse(e, t) {
		let n = this.store;
		return e.text().then((e) => {
			e.length > 10 && n.add(t, this.ns.http("content"), n.rdfFactory.literal(e), t);
		});
	}
	handlerForContentType(e, t) {
		if (!e) return null;
		let n = this.handlers.find((t) => e.match(t.pattern));
		return n ? new n(t) : null;
	}
	guessContentType(e) {
		return Yr[e.split(".").pop()];
	}
	normalizedContentType(e, t) {
		if (e.forceContentType) return e.forceContentType;
		let n = t.get("content-type");
		if (!n || n.includes("application/octet-stream")) {
			let t = this.guessContentType(e.resource.value);
			if (t) return t;
		}
		let r = Pe(e.resource.value);
		return !n && ["file", "chrome"].includes(r) ? "text/xml" : n;
	}
	redirectToProxy(e, t) {
		this.addStatus(t.req, "BLOCKED -> Cross-site Proxy to <" + e + ">"), t.proxyUsed = !0;
		let n = this.store, r = t.req;
		t.noMeta || (n.add(r, this.ns.link("redirectedTo"), n.rdfFactory.namedNode(e), r), this.addStatus(r, "redirected to new request")), this.requested[t.resource.value] = "redirected", this.redirectedTo[t.resource.value] = e;
		let i = Object.assign({}, t);
		return i.baseURI = t.resource.value, this.fetchUri(e, i).then((e) => (i.noMeta || n.add(r, this.ns.link("redirectedRequest"), i.req, this.appNode), e));
	}
	setRequestTimeout(e, t) {
		return new Promise((n) => {
			this.timeouts[e] = (this.timeouts[e] || []).concat(setTimeout(() => {
				this.isPending(e) && !t.retriedWithNoCredentials && !t.proxyUsed && n(this.failFetch(t, `Request to ${e} timed out`, "timeout"));
			}, this.timeout));
		});
	}
	addFetchCallback(e, t) {
		this.fetchCallbacks[e] ? this.fetchCallbacks[e].push(t) : this.fetchCallbacks[e] = [t];
	}
	acceptString() {
		let e = "";
		for (let t in this.mediatypes) {
			e !== "" && (e += ", "), e += t;
			for (let n in this.mediatypes[t]) e += ";" + n + "=" + this.mediatypes[t][n];
		}
		return e;
	}
};
g(li, "HANDLERS", void 0), g(li, "CONTENT_TYPE_BY_EXT", void 0), g(li, "crossSiteProxyTemplate", void 0), li.HANDLERS = ai, li.CONTENT_TYPE_BY_EXT = Yr;
// node_modules/rdflib/esm/query-to-sparql.js
function ui(e) {
	var t = 0;
	function n(e) {
		for (var t = s() + "SELECT ", n = 0; n < e.vars.length; n++) t += e.vars[n] + " ";
		return t += "\n", t;
	}
	function r(e) {
		var t = "", n = e.statements;
		for (var r in n) z.debug("Found statement: " + n), t += s() + n[r] + "\n";
		return t;
	}
	function i(e) {
		var t = "";
		for (var n in e.constraints) {
			var r = e.constraints[n];
			t += s() + "FILTER ( " + r.describe(n) + " ) \n";
		}
		return t;
	}
	function a(e) {
		for (var n = "", o = 0; o < e.optional.length; o++) z.debug("Found optional query"), n += s() + "OPTIONAL { \n", t++, n += r(e.optional[o]), n += i(e.optional[o]), n += a(e.optional[o]), t--, n += s() + "}\n";
		return n;
	}
	function o(e) {
		var n = s() + "WHERE \n{ \n";
		return t++, n += r(e), n += i(e), n += a(e), t--, n += "}", n;
	}
	function s() {
		for (var e = "", n = 0; n < t; n++) e += "    ";
		return e;
	}
	function c(e) {
		return n(e) + o(e.pat);
	}
	return c(e);
}
// node_modules/rdflib/esm/sparql-to-query.js
function di(e, t, n) {
	var r = [];
	function i(e) {
		if (r[e]) return r[e];
		var t = n.variable(e);
		return r[e] = t, t;
	}
	function a(e) {
		return typeof e == "string" && e.match(/[^ \n\t]/);
	}
	function o(e) {
		return typeof e == "string" && e.match(/^[\?\$]/);
	}
	function s(e) {
		return typeof e == "string" ? e.replace(/^&lt;/, "<").replace(/&gt;$/, ">") : e;
	}
	function c(e) {
		return typeof e == "string" && e.match(/^<[^>]*>$/);
	}
	function l(e) {
		return typeof e == "string" && (e.match(/^_:/) || e.match(/^$/));
	}
	function u(e) {
		return typeof e == "string" && e.match(/:$/);
	}
	function d(e) {
		return typeof e == "string" && e.match(/^:|^[^_][^:]*:/);
	}
	function f(e) {
		return e.split(":")[0];
	}
	function p(e) {
		return e.split(":")[1];
	}
	function m(e) {
		return c(e) ? e.slice(1, e.length - 1) : e;
	}
	function h(e) {
		var t = e.indexOf("'") === -1 ? null : e.indexOf("'"), r = e.indexOf("\"") === -1 ? null : e.indexOf("\"");
		if (!t && !r) {
			var i = [,];
			return i[0] = e, i;
		}
		var a = [, ,], o, s;
		if (!t || r && r < t) o = "\"", s = r;
		else if (!r || t && t < r) o = "'", s = t;
		else return z.error("SQARQL QUERY OOPS!"), a;
		a[0] = e.slice(0, s);
		var c = e.slice(s + 1).indexOf(o);
		if (c === -1) return z.error("SPARQL parsing error: no matching parentheses in literal " + e), e;
		var l;
		return e.slice(c + s + 2).match(/^\^\^/) ? (l = e.slice(c + s + 2).indexOf(" "), a[1] = n.literal(e.slice(s + 1, s + 1 + c), n.sym(m(e.slice(s + 4 + c, s + 2 + c + l)))), a = a.concat(h(e.slice(c + s + 3 + l)))) : e.slice(c + s + 2).match(/^@/) ? (l = e.slice(c + s + 2).indexOf(" "), a[1] = n.literal(e.slice(s + 1, s + 1 + c), e.slice(s + 3 + c, s + 2 + c + l), null), a = a.concat(h(e.slice(c + s + 2 + l)))) : (a[1] = n.literal(e.slice(s + 1, s + 1 + c)), z.info("Literal found: " + a[1]), a = a.concat(h(e.slice(c + s + 2)))), a;
	}
	function g(e) {
		e = e.replace(/\(/g, " ( ").replace(/\)/g, " ) ").replace(/</g, " <").replace(/>/g, "> ").replace(/{/g, " { ").replace(/}/g, " } ").replace(/[\t\n\r]/g, " ").replace(/; /g, " ; ").replace(/\. /g, " . ").replace(/, /g, " , "), z.info("New str into spaceDelimit: \n" + e);
		var t = [], n = e.split(" ");
		for (var r in n) a(n[r]) && (t = t.concat(n[r]));
		return t;
	}
	function _(e) {
		for (var t = e, n = 0; n < t.length; n++) if (t[n] === "a" && (t[n] = "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>"), t[n] === "is" && t[n + 2] === "of") {
			t.splice(n, 1), t.splice(n + 1, 1);
			var r = t[n - 1];
			t[n - 1] = t[n + 1], t[n + 1] = r;
		}
		return t;
	}
	function v(e) {
		for (var t = [], r = 0; r < e.length; r++) typeof e[r] == "string" ? (e[r] = s(e[r]), o(e[r]) ? t[r] = i(e[r].slice(1)) : l(e[r]) ? (z.info(e[r] + " was identified as a bnode."), t[r] = n.bnode()) : c(e[r]) ? (z.info(e[r] + " was identified as a symbol."), t[r] = n.sym(m(e[r]))) : d(e[r]) ? (z.info(e[r] + " was identified as a prefixed symbol"), ne[f(e[r])] ? t[r] = n.sym(e[r] = ne[f(e[r])] + p(e[r])) : (z.error("SPARQL error: " + e[r] + " with prefix " + f(e[r]) + " does not have a correct prefix entry."), t[r] = e[r])) : t[r] = e[r]) : t[r] = e[r];
		return t;
	}
	function y(e) {
		var t = h(e), n = [];
		for (var r in t) n = typeof t[r] == "string" ? n.concat(g(t[r])) : n.concat(t[r]);
		return n = _(n), z.info("SPARQL Tokens: " + n), n;
	}
	function b(e, t) {
		for (var n = 0; n < t.length; n++) if (typeof t[n] == "string" && t[n].toLowerCase() === e.toLowerCase()) return n;
		return null;
	}
	function x(e, t) {
		for (var n = [], r = 0; r < t.length; r++) typeof t[r] == "string" && t[r].toLowerCase() === e.toLowerCase() && n.push(r);
		return n;
	}
	function S(e, t) {
		for (var n in z.info("SPARQL vars: " + e), e) if (o(e[n])) {
			z.info("Added " + e[n] + " to query variables from SPARQL");
			var r = i(e[n].slice(1));
			t.vars.push(r), r.label = e[n].slice(1);
		} else z.warn("Incorrect SPARQL variable in SELECT: " + e[n]);
	}
	function C(e) {
		var t = x("PREFIX", e), n = [];
		for (var r in t) {
			var i = e[t[r] + 1], a = e[t[r] + 2];
			if (!u(i)) z.error("Invalid SPARQL prefix: " + i);
			else if (!c(a)) z.error("Invalid SPARQL symbol: " + a);
			else {
				z.info("Prefix found: " + i + " -> " + a);
				var o = f(i);
				n[o] = m(a);
			}
		}
		return n;
	}
	function w(e, t, n) {
		z.info("Looking for a close bracket of type " + n + " in " + e);
		for (var r = 0, i = 0; i < e.length; i++) if (e[i] === t && r++, e[i] === n && r--, r < 0) return i;
		return z.error("Statement had no close parenthesis in SPARQL query"), 0;
	}
	function T(e) {
		return this.describe = function(t) {
			return t + " = " + e.toNT();
		}, this.test = function(t) {
			return e.equals(t);
		}, this;
	}
	function E(e) {
		this.describe = function(t) {
			return "REGEXP( '" + e + "' , " + t + " )";
		}, this.test = function(t) {
			var n = new RegExp(e);
			return t.value ? n.test(t.value) : !1;
		};
	}
	function D(e, t) {
		e.length === 3 && e[0].termType === "Variable" && (e[2].termType === "NamedNode" || e[2].termType === "Literal") ? e[1] === "=" || e[1] === ">" || e[1] === "<" ? (z.debug("Constraint added: " + e), t.constraints[e[0]] = new T(e[2])) : z.warn("I don't know how to handle the constraint: " + e) : e.length === 6 && typeof e[0] == "string" && e[0].toLowerCase() === "regexp" && e[1] === "(" && e[5] === ")" && e[3] === "," && e[4].termType === "Variable" && e[2].termType === "Literal" && (z.debug("Constraint added: " + e), t.constraints[e[4]] = new E(e[2].value));
	}
	function O(e, t) {
		z.debug("Optional query: " + e + " not yet implemented.");
		var r = n.formula();
		ee(e, r), t.optional.push(r);
	}
	function ee(e, t) {
		var n = v(e), r;
		z.debug("WHERE: " + n);
		for (var i; b("OPTIONAL", n);) i = b("OPTIONAL", n), z.debug("OPT: " + i + " " + n[i] + " in " + n), n[i + 1] !== "{" && z.warn("Bad optional opening bracket in word " + i), r = w(n.slice(i + 2), "{", "}"), r === -1 ? z.error("No matching bracket in word " + i) : (O(n.slice(i + 2, i + 2 + r), t), i = b("OPTIONAL", n), r = w(n.slice(i + 2), "{", "}"), n.splice(i, r + 3));
		for (z.debug("WHERE after optionals: " + n); b("FILTER", n);) {
			var a = b("FILTER", n);
			n[a + 1] !== "(" && z.warn("Bad filter opening bracket in word " + a), r = w(n.slice(a + 2), "(", ")"), r === -1 ? z.error("No matching bracket in word " + a) : (D(n.slice(a + 2, a + 2 + r), t), a = b("FILTER", n), r = w(n.slice(a + 2), "(", ")"), n.splice(a, r + 3));
		}
		z.debug("WHERE after filters and optionals: " + n), te(n, t);
	}
	function te(e, t) {
		var n = [,];
		n[0] = -1;
		for (var r = n.concat(x(".", e)), i = [], a = 0; a < r.length - 1; a++) i[a] = e.slice(r[a] + 1, r[a + 1]);
		for (a in i) {
			z.info("s+p+o " + a + " = " + i[a]);
			var o = i[a][0];
			i[a].splice(0, 1);
			var s = n.concat(x(";", i[a]));
			s.push(i[a].length);
			for (var c = [], l = 0; l < s.length - 1; l++) c[l] = i[a].slice(s[l] + 1, s[l + 1]);
			for (a in c) {
				z.info("p+o " + a + " = " + i[a]);
				var u = c[a][0];
				c[a].splice(0, 1);
				var d = n.concat(x(",", c[a]));
				d.push(c[a].length);
				var f = [];
				for (l = 0; l < d.length - 1; l++) f[l] = c[a].slice(d[l] + 1, d[l + 1]);
				for (a in f) {
					var p = f[a][0];
					z.info("Subj=" + o + " Pred=" + u + " Obj=" + p), t.add(o, u, p);
				}
			}
		}
	}
	z.info("SPARQL input: \n" + e);
	var k = new Ot(), A = y(e), ne = C(A);
	ne.rdf ||= "http://www.w3.org/1999/02/22-rdf-syntax-ns#", ne.rdfs ||= "http://www.w3.org/2000/01/rdf-schema#";
	var re = b("SELECT", A), ie = b("WHERE", A);
	if (re < 0 || ie < 0 || re > ie) return z.error("Invalid or nonexistent SELECT and WHERE tags in SPARQL query"), !1;
	if (S(A.slice(re + 1, ie), k), ee(A.slice(ie + 2, A.length - 1), k.pat), t) return k;
	for (var ae in k.pat.statements) {
		var j = k.pat.statements[ae];
		j.subject.termType === "NamedNode" && n.fetcher && n.fetcher.lookUpThing(j.subject, "sparql:" + j.subject), j.object.termType === "NamedNode" && n.fetcher && n.fetcher.lookUpThing(j.object, "sparql:" + j.object);
	}
	return k;
}
// node_modules/rdflib/esm/update-manager.js
var fi = class {
	constructor(e) {
		if (g(this, "store", void 0), g(this, "ifps", void 0), g(this, "fps", void 0), g(this, "patchControl", void 0), g(this, "ns", void 0), e ||= new Pt(), e.updater) throw Error("You can't have two UpdateManagers for the same store");
		e.fetcher || (e.fetcher = new li(e)), this.store = e, e.updater = this, this.ifps = {}, this.fps = {}, this.ns = {}, this.ns.link = Be("http://www.w3.org/2007/ont/link#"), this.ns.http = Be("http://www.w3.org/2007/ont/http#"), this.ns.httph = Be("http://www.w3.org/2007/ont/httph#"), this.ns.ldp = Be("http://www.w3.org/ns/ldp#"), this.ns.rdf = Be("http://www.w3.org/1999/02/22-rdf-syntax-ns#"), this.ns.rdfs = Be("http://www.w3.org/2000/01/rdf-schema#"), this.ns.rdf = Be("http://www.w3.org/1999/02/22-rdf-syntax-ns#"), this.ns.owl = Be("http://www.w3.org/2002/07/owl#"), this.patchControl = [];
	}
	patchControlFor(e) {
		return this.patchControl[e.value] || (this.patchControl[e.value] = []), this.patchControl[e.value];
	}
	isHttpUri(e) {
		return e.slice(0, 4) === "http";
	}
	flagAuthorizationMetadata(e) {
		e ||= this.store;
		let t = e.fetcher?.appNode, n = e.statementsMatching(void 0, this.ns.link("requestedURI"), void 0, t).map((e) => e.subject);
		for (let r of n) {
			let n = e.any(r, this.ns.link("response"), null, t);
			n != null && e.add(n, this.ns.link("outOfDate"), !0, t);
		}
	}
	async checkEditable(e, t) {
		if (!e) return !1;
		t ||= this.store;
		let n = this.editable(e, t);
		return n === void 0 ? (await t.fetcher?.load(e), this.editable(e, t)) : n;
	}
	editable(e, t) {
		if (!e) return !1;
		if (t ||= this.store, e = N(e), !this.isHttpUri(e) && t.holds(t.rdfFactory.namedNode(e), t.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), t.rdfFactory.namedNode("http://www.w3.org/2007/ont/link#MachineEditableDocument"))) return "LOCALFILE";
		var n, r = !1;
		let i = t.fetcher?.appNode;
		for (var a = t.each(void 0, this.ns.link("requestedURI"), Ae(e), i), o, s = 0; s < a.length; s++) if (n = a[s], n !== void 0) {
			let a = t.any(n, this.ns.link("response"), null, i);
			if (a !== void 0) {
				if (t.anyJS(a, this.ns.link("outOfDate"), null, i)) continue;
				var c = t.anyValue(a, this.ns.httph("wac-allow"));
				if (c) for (var l of c.split(",")) {
					var u = l.split("=");
					if (u[0].includes("user") && !u[1].includes("write") && !u[1].includes("append")) return !1;
				}
				var d = t.each(a, this.ns.httph("accept-patch"));
				if (d.length) for (let e = 0; e < d.length; e++) {
					if (o = d[e].value.trim(), o.indexOf("application/sparql-update") >= 0 || o.indexOf("application/sparql-update-single-match") >= 0) return "SPARQL";
					if (o.indexOf("text/n3") >= 0) return "N3PATCH";
				}
				var f = t.each(a, this.ns.httph("ms-author-via"));
				if (f.length) for (let e = 0; e < f.length; e++) {
					if (o = f[e].value.trim(), o.indexOf("SPARQL") >= 0) return "SPARQL";
					if (o.indexOf("DAV") >= 0) return "DAV";
				}
				if (!this.isHttpUri(e)) return c ? "LOCALFILE" : !1;
				var p = t.each(a, this.ns.http("status"));
				if (p.length) for (let e = 0; e < p.length; e++) (p[e] === 200 || p[e] === 404) && (r = !0);
			}
		}
		if (a.length !== 0 && r) return !1;
	}
	anonymize(e) {
		return e.toNT().substr(0, 2) === "_:" && this.mentioned(e) ? "?" + e.toNT().substr(2) : e.toNT();
	}
	anonymizeNT(e) {
		return this.anonymize(e.subject) + " " + this.anonymize(e.predicate) + " " + this.anonymize(e.object) + " .";
	}
	nTriples(e) {
		return `${e.subject.toNT()} ${e.predicate.toNT()} ${e.object.toNT()} .`;
	}
	statementBnodes(e) {
		return [
			e.subject,
			e.predicate,
			e.object
		].filter(function(e) {
			return me(e);
		});
	}
	statementArrayBnodes(e) {
		var t = [];
		for (let n = 0; n < e.length; n++) t = t.concat(this.statementBnodes(e[n]));
		t.sort();
		var n = [];
		for (let e = 0; e < t.length; e++) e !== 0 && t[e].equals(t[e - 1]) || n.push(t[e]);
		return n;
	}
	cacheIfps() {
		this.ifps = {};
		var e = this.store.each(void 0, this.ns.rdf("type"), this.ns.owl("InverseFunctionalProperty"));
		for (let t = 0; t < e.length; t++) this.ifps[e[t].value] = !0;
		this.fps = {}, e = this.store.each(void 0, this.ns.rdf("type"), this.ns.owl("FunctionalProperty"));
		for (let t = 0; t < e.length; t++) this.fps[e[t].value] = !0;
	}
	bnodeContext2(e, t, n) {
		var r = this.store.statementsMatching(void 0, void 0, e, t), i, a;
		for (let e = 0; e < r.length; e++) if (this.fps[r[e].predicate.value]) {
			if (i = r[e].subject, !i.isBlank) return [r[e]];
			if (n && (a = this.bnodeContext2(i, t, n - 1), a)) return a.concat([r[e]]);
		}
		r = this.store.statementsMatching(e, void 0, void 0, t);
		for (let e = 0; e < r.length; e++) if (this.ifps[r[e].predicate.value]) {
			if (i = r[e].object, !i.isBlank) return [r[e]];
			if (n && (a = this.bnodeContext2(i, t, n - 1), a)) return a.concat([r[e]]);
		}
		return null;
	}
	bnodeContext1(e, t) {
		for (var n = 0; n < 3; n++) {
			var r = this.bnodeContext2(e, t, n);
			if (r !== null) return r;
		}
		return this.store.connectedStatements(e, t);
	}
	mentioned(e) {
		return this.store.statementsMatching(e, null, null, null).length !== 0 || this.store.statementsMatching(null, e).length !== 0 || this.store.statementsMatching(null, null, e).length !== 0;
	}
	bnodeContext(e, t) {
		var n = [];
		if (e.length) {
			this.cacheIfps();
			for (let i = 0; i < e.length; i++) {
				var r = e[i];
				this.mentioned(r) && (n = n.concat(this.bnodeContext1(r, t)));
			}
		}
		return n;
	}
	statementContext(e) {
		var t = this.statementBnodes(e);
		return this.bnodeContext(t, e.graph);
	}
	contextWhere(e) {
		var t = this;
		return !e || e.length === 0 ? "" : "WHERE { " + e.map(function(e) {
			return t.anonymizeNT(e);
		}).join("\n") + " }\n";
	}
	fire(e, t, n, r = {}) {
		return Promise.resolve().then(() => {
			if (!e) throw Error("No URI given for remote editing operation: " + t);
			return r.noMeta = !0, r.contentType = r.contentType || "application/sparql-update", r.body = t, this.store.fetcher.webOperation("PATCH", e, r);
		}).then((r) => {
			if (!r.ok) {
				let n = "UpdateManager: update failed for <" + e + "> status=" + r.status + ", " + r.statusText + "\n   for query: " + t;
				throw Error(n);
			}
			n(e, r.ok, r.responseText, r);
		}).catch((t) => {
			n(e, !1, t.message, t);
		});
	}
	update_statement(e) {
		if (!e || e.graph) {
			var t = this, n = this.statementContext(e);
			return {
				statement: e ? [
					e.subject,
					e.predicate,
					e.object,
					e.graph
				] : void 0,
				statementNT: e ? this.anonymizeNT(e) : void 0,
				where: t.contextWhere(n),
				set_object: function(e, n) {
					var r = this.where;
					r += "DELETE DATA { " + this.statementNT + " } ;\n", r += "INSERT DATA { " + this.anonymize(this.statement[0]) + " " + this.anonymize(this.statement[1]) + " " + this.anonymize(e) + "  . }\n", t.fire(this.statement[3].value, r, n);
				}
			};
		}
	}
	insert_statement(e, t) {
		var n = e instanceof Array ? e[0] : e, r = this.contextWhere(this.statementContext(n));
		if (e instanceof Array) {
			var i = "";
			for (let t = 0; t < e.length; t++) i += e[t] + "\n";
			r += "INSERT DATA { " + i + " }\n";
		} else r += "INSERT DATA { " + this.anonymize(e.subject) + " " + this.anonymize(e.predicate) + " " + this.anonymize(e.object) + "  . }\n";
		this.fire(n.graph.value, r, t);
	}
	delete_statement(e, t) {
		var n = e instanceof Array ? e[0] : e, r = this.contextWhere(this.statementContext(n));
		if (e instanceof Array) {
			var i = "";
			for (let t = 0; t < e.length; t++) i += e[t] + "\n";
			r += "DELETE DATA { " + i + " }\n";
		} else r += "DELETE DATA { " + this.anonymize(e.subject) + " " + this.anonymize(e.predicate) + " " + this.anonymize(e.object) + "  . }\n";
		this.fire(n.graph.value, r, t);
	}
	requestDownstreamAction(e, t) {
		var n = this.patchControlFor(e);
		if (!n.pendingUpstream) t(e);
		else if (n.downstreamAction) {
			if ("" + n.downstreamAction != "" + t) throw Error("Can't wait for > 1 different downstream actions");
		} else n.downstreamAction = t;
	}
	clearUpstreamCount(e) {
		var t = this.patchControlFor(e);
		t.upstreamCount = 0;
	}
	getUpdatesVia(e) {
		var t = this.store.fetcher.getHeader(e, "updates-via");
		return !t || !t.length ? null : t[0].trim();
	}
	addDownstreamChangeListener(e, t) {
		var n = this.patchControlFor(e);
		n.downstreamChangeListeners ||= [], n.downstreamChangeListeners.push(t), this.setRefreshHandler(e, (e) => {
			this.reloadAndSync(e);
		});
	}
	reloadAndSync(e) {
		var t = this.patchControlFor(e), n = this;
		if (t.reloading) t.outOfDate = !0;
		else {
			t.reloading = !0;
			var r = 1e3, i = function() {
				n.reload(n.store, e, function(e, n, a) {
					if (e) {
						if (t.downstreamChangeListeners) for (let e = 0; e < t.downstreamChangeListeners.length; e++) t.downstreamChangeListeners[e]();
						t.reloading = !1, t.outOfDate && (t.outOfDate = !1, i());
					} else t.reloading = !1, a && a.status === 0 && (t.reloading = !0, r *= 2, setTimeout(i, r));
				});
			};
			i();
		}
	}
	setRefreshHandler(e, t) {
		let n = this.getUpdatesVia(e);
		var r = t, i = this, a = this, o = 1500, s = 0;
		if (!n) return !1;
		n = Ne(n, e.value);
		let c = n.replace(/^http:/, "ws:").replace(/^https:/, "wss:");
		var l = function() {
			var t;
			if (typeof WebSocket < "u") t = new WebSocket(c);
			else if (typeof window < "u" && window.WebSocket) t = window.WebSocket(c);
			else return;
			t.onopen = function() {
				o = 1500, this.send("sub " + e.value), s && a.requestDownstreamAction(e, r);
			};
			var n = i.patchControlFor(e);
			n.upstreamCount = 0, t.onerror = function(e) {}, t.onclose = function(e) {
				o *= 2, s += 1, setTimeout(function() {
					l();
				}, o);
			}, t.onmessage = function(t) {
				if (t.data && t.data.slice(0, 3) === "pub") {
					if ("upstreamCount" in n && (--n.upstreamCount, n.upstreamCount >= 0)) return;
					n.upstreamCount = 0, i.requestDownstreamAction(e, r);
				}
			};
		};
		return l(), !0;
	}
	updateMany(e, t = []) {
		let n = e.concat(t).map((e) => e.why), r = this, i = [];
		n.forEach((e) => {
			i.find((t) => t.equals(e)) || i.push(e);
		});
		let a = i.map((n) => r.update(e.filter((e) => e.why.equals(n)), t.filter((e) => e.why.equals(n))));
		return a.length, Promise.all(a);
	}
	constructSparqlUpdateQuery(e, t, n) {
		var r = this.contextWhere(n), i = "";
		if (r.length) {
			if (e.length) {
				i += "DELETE { ";
				for (let t = 0; t < e.length; t++) i += this.anonymizeNT(e[t]) + "\n";
				i += " }\n";
			}
			if (t.length) {
				i += "INSERT { ";
				for (let e = 0; e < t.length; e++) i += this.anonymizeNT(t[e]) + "\n";
				i += " }\n";
			}
			i += r;
		} else {
			if (e.length) {
				i += "DELETE DATA { ";
				for (let t = 0; t < e.length; t++) i += this.anonymizeNT(e[t]) + "\n";
				i += " } \n";
			}
			if (t.length) {
				e.length && (i += " ; "), i += "INSERT DATA { ";
				for (let e = 0; e < t.length; e++) i += this.nTriples(t[e]) + "\n";
				i += " }\n";
			}
		}
		return i;
	}
	constructN3PatchQuery(e, t, n) {
		var r = "\n@prefix solid: <http://www.w3.org/ns/solid/terms#>.\n@prefix ex: <http://www.example.org/terms#>.\n\n_:patch\n";
		return n && n.length > 0 && (r += `
      solid:where {
        ${n.map((e) => this.anonymizeNT(e)).join("\n        ")}
      };`), e.length > 0 && (r += `
      solid:deletes {
        ${e.map((e) => this.anonymizeNT(e)).join("\n        ")}
      };`), t.length > 0 && (r += `
      solid:inserts {
        ${t.map((e) => this.anonymizeNT(e)).join("\n        ")}
      };`), r += "   a solid:InsertDeletePatch .\n", r;
	}
	update(e, t, n, r, i = {}) {
		if (!n) {
			var a = this;
			return new Promise(function(n, o) {
				a.update(e, t, function(e, t, r) {
					t ? n() : o(Error(r));
				}, r, i);
			});
		}
		try {
			var o = this.store, s = e ? P(e) ? e.statements : e instanceof Array ? e : [e] : [], c = t ? P(t) ? t.statements : t instanceof Array ? t : [t] : [];
			if (!(s instanceof Array)) throw Error("Type Error " + typeof s + ": " + s);
			if (!(c instanceof Array)) throw Error("Type Error " + typeof c + ": " + c);
			if (s.length === 0 && c.length === 0) return n(null, !0);
			var l = s.length ? s[0].graph : c[0].graph;
			if (!l) {
				let e = "Error patching: statement does not specify which document to patch:" + s[0] + ", " + c[0];
				throw Error(e);
			}
			if (l.termType !== "NamedNode") {
				let e = "Error patching: document not a NamedNode:" + s[0] + ", " + c[0];
				throw Error(e);
			}
			var u = this.patchControlFor(l), d = Date.now(), f = [
				"subject",
				"predicate",
				"object",
				"why"
			], p = ["insert", "delete"], m = {
				delete: s,
				insert: c
			};
			p.map(function(e) {
				m[e].map(function(e) {
					if (!l.equals(e.graph)) throw Error("update: destination " + l + " inconsistent with delete quad " + e.graph);
					f.map(function(t) {
						if (e[t] === void 0) throw Error("update: undefined " + t + " of statement.");
					});
				});
			});
			var h = this.editable(l.value, o);
			if (h === !1) throw Error("Update: Can't make changes in uneditable " + l);
			if (h === void 0) {
				if (r) throw Error("Update: Loaded " + l + "but still can't figure out what editing protocol it supports.");
				this.store.fetcher.load(l).then((r) => {
					this.update(e, t, n, !0, i);
				}, (r) => {
					if (r.response.status === 404) this.update(e, t, n, !0, i);
					else throw Error(`Update: Can't get updatability status ${l} before patching: ${r}`);
				});
				return;
			}
			if (h.indexOf("SPARQL") >= 0 || h.indexOf("N3PATCH") >= 0) {
				var g = h.indexOf("SPARQL") >= 0, _ = [];
				s.length && (_ = this.statementArrayBnodes(s)), c.length && (_ = _.concat(this.statementArrayBnodes(c)));
				var v = this.bnodeContext(_, l), y = g ? this.constructSparqlUpdateQuery(s, c, v) : this.constructN3PatchQuery(s, c, v);
				i.contentType = g ? "application/sparql-update" : "text/n3", u.pendingUpstream = u.pendingUpstream ? u.pendingUpstream + 1 : 1, "upstreamCount" in u && (u.upstreamCount += 1), this.fire(l.value, y, (e, t, r, i) => {
					if (i.elapsedTimeMs = Date.now() - d, t) {
						try {
							o.remove(s);
						} catch (e) {
							t = !1, r = "Remote Ok BUT error deleting " + s.length + " from store!!! " + e;
						}
						for (let e = 0; e < c.length; e++) o.add(c[e].subject, c[e].predicate, c[e].object, l);
					}
					if (n(e, t, r, i), --u.pendingUpstream, u.pendingUpstream === 0 && u.downstreamAction) {
						var a = u.downstreamAction;
						delete u.downstreamAction, a(l);
					}
				}, i);
			} else if (h.indexOf("DAV") >= 0) this.updateDav(l, s, c, n, i);
			else if (h.indexOf("LOCALFILE") >= 0) try {
				this.updateLocalFile(l, s, c, n, i);
			} catch {
				n(l.value, !1, "Exception trying to write back file <" + l.value + ">\n");
			}
			else throw Error("Unhandled edit method: '" + h + "' for " + l);
		} catch (e) {
			n(void 0, !1, "Exception in update: " + e + "\n" + mt(e));
		}
	}
	updateDav(e, t, n, r, i = {}) {
		let a = this.store;
		var o = a.any(e, this.ns.link("request"));
		if (!o) throw Error("No record of our HTTP GET request for document: " + e);
		var s = a.any(o, this.ns.link("response"));
		if (!s) return null;
		var c = a.the(s, this.ns.httph("content-type")).value;
		let l = a.statementsMatching(void 0, void 0, void 0, e).slice();
		for (let e = 0; e < t.length; e++) dt(l, t[e]);
		for (let e = 0; e < n.length; e++) l.push(n[e]);
		let u = this.serialize(e.value, l, c);
		var d = a.the(s, this.ns.httph("content-location")), f;
		return d && (f = Ne(d.value, f)), i.contentType = c, i.noMeta = !0, i.body = u, a.fetcher.webOperation("PUT", f, i).then((i) => {
			if (!i.ok) throw Error(i.error);
			for (let e = 0; e < t.length; e++) a.remove(t[e]);
			for (let t = 0; t < n.length; t++) a.add(n[t].subject, n[t].predicate, n[t].object, e);
			r(e.value, i.ok, i.responseText, i);
		}).catch((t) => {
			r(e.value, !1, t.message, t);
		});
	}
	updateLocalFile(e, t, n, r, i = {}) {
		let a = this.store, o = a.statementsMatching(void 0, void 0, void 0, e).slice();
		for (let e = 0; e < t.length; e++) dt(o, t[e]);
		for (let e = 0; e < n.length; e++) o.push(n[e]);
		var s = e.value.lastIndexOf(".");
		if (s < 1) throw Error("Rewriting file: No filename extension: " + e.value);
		var c = e.value.slice(s + 1);
		let l = li.CONTENT_TYPE_BY_EXT[c];
		if (!l) throw Error("File extension ." + c + " not supported for data write");
		i.body = this.serialize(e.value, o, l), i.contentType = l, a.fetcher.webOperation("PUT", e.value, i).then((i) => {
			if (!i.ok) return r(e.value, !1, i.error);
			for (let e = 0; e < t.length; e++) a.remove(t[e]);
			for (let t = 0; t < n.length; t++) a.add(n[t].subject, n[t].predicate, n[t].object, e);
			r(e.value, !0, "");
		});
	}
	serialize(e, t, n) {
		let r = this.store, i;
		if (typeof t == "string") return t;
		var a = gt(r);
		switch (a.suggestNamespaces(r.namespaces), a.setBase(e), n) {
			case "text/xml":
			case "application/rdf+xml":
				i = a.statementsToXML(t);
				break;
			case "text/n3":
			case "text/turtle":
			case "application/x-turtle":
			case "application/n3":
				i = a.statementsToN3(t);
				break;
			default: throw Error("Content-type " + n + " not supported for data serialization");
		}
		return i;
	}
	put(e, t, n, r) {
		let i = this.store, a;
		return Promise.resolve().then(() => (a = this.serialize(e.value, t, n), i.fetcher.webOperation("PUT", e.value, {
			contentType: n,
			body: a
		}))).then((n) => {
			if (!n.ok) return r(e.value, n.ok, n.error, n);
			delete i.fetcher.nonexistent[e.value], delete i.fetcher.requested[e.value], typeof t != "string" && t.map((e) => {
				i.addStatement(e);
			}), r(e.value, n.ok, "", n);
		}).catch((t) => {
			r(e.value, !1, t.message);
		});
	}
	reload(e, t, n) {
		var r = Date.now();
		e.fetcher.nowOrWhenFetched(t.value, {
			force: !0,
			noMeta: !0,
			clearPreviousData: !0
		}, function(e, i, a) {
			if (!e) n(!1, "Error reloading data: " + i, a);
			else if (a.onErrorWasCalled || a.status !== 200) n(!1, "Non-HTTP error reloading data: " + i, a);
			else {
				var o = Date.now() - r;
				t.reloadTimeTotal ||= 0, t.reloadTimeCount ||= 0, t.reloadTimeTotal += o, t.reloadTimeCount += 1, n(!0);
			}
		});
	}
}, pi = {
	...Sn,
	fetcher(e, t) {
		return new li(e, t);
	},
	graph(e = void 0, t = void 0) {
		return new Pt(e, t || { rdfFactory: Sn });
	},
	lit(e, t, n) {
		return this.literal("" + e, t || n);
	},
	st(e, t, n, r) {
		return this.quad(e, t, n, r);
	}
}, mi = class {
	constructor(e, t) {
		this.parent = e, this.via = t, this.connected = !1, this.pending = {}, this.subscribed = {}, this.socket = {};
		try {
			this.socket = new WebSocket(t), this.socket.onopen = this.onOpen, this.socket.onclose = this.onClose, this.socket.onmessage = this.onMessage, this.socket.onerror = this.onError;
		} catch (e) {
			this.onError(e);
		}
	}
	_decode(e) {
		var t, n, r, i = {}, a = function() {
			var n, r, i = e.split("&"), a = [];
			for (n = 0, r = i.length; n < r; n++) t = i[n], a.push(t.split("="));
			return a;
		}(), o, s;
		for (n in a) t = a[n], o = [decodeURIComponent(t[0]), decodeURIComponent(t[1])], r = o[0], s = o[1], i[r] ?? (i[r] = []), i[r].push(s);
		return i;
	}
	_send(e, t, n) {
		var r, i = [
			e,
			t,
			n
		].join(" ");
		return typeof (r = this.socket).send == "function" ? r.send(i) : void 0;
	}
	_subscribe(e) {
		return this._send("sub", e, ""), this.subscribed[e] = !0, this.subscribed[e];
	}
	onClose(e) {
		for (var t in this.connected = !1, this.subscribed) this.pending[t] = !0;
		return this.subscribed = {}, this.subscribed;
	}
	onError(e) {
		throw Error("onError" + e);
	}
	onMessage(e) {
		var t, n = e.data.split(" ");
		if (n[0] === "ping") return typeof (t = this.socket).send == "function" ? t.send("pong " + n.slice(1).join(" ")) : void 0;
		if (n[0] === "pub") return this.parent.onUpdate(n[1], this._decode(n[2]));
	}
	onOpen(e) {
		var t, n;
		for (n in this.connected = !0, t = [], this.pending) delete this.pending[n], t.push(this._subscribe(n));
		return t;
	}
	subscribe(e) {
		return this.connected ? this._subscribe(e) : (this.pending[e] = !0, this.pending[e]);
	}
}, hi = class {
	constructor(e) {
		this.fetcher = e, this.graph = {}, this.via = {}, this.fetcher.addCallback("headers", this.onHeaders);
	}
	onHeaders(e) {
		var t, n, r;
		return e.headers == null || typeof WebSocket > "u" || WebSocket === null || (t = e.headers.etag, r = e.headers["updates-via"], n = e.uri, t && r && (this.graph[n] = {
			etag: t,
			via: r
		}, this.register(r, n))), !0;
	}
	onUpdate(e, t) {
		return this.fetcher.refresh(pi.namedNode(e));
	}
	register(e, t) {
		return this.via[e] ?? (this.via[e] = new mi(this, e)), this.via[e].subscribe(t);
	}
}, gi = /* @__PURE__ */ c({
	BlankNode: () => M,
	Collection: () => xe,
	ConnectedStore: () => Ni,
	DataFactory: () => pi,
	Empty: () => Se,
	Fetcher: () => li,
	Formula: () => Tt,
	IndexedFormula: () => Pt,
	Literal: () => ye,
	LiveStore: () => Pi,
	N3Parser: () => yn,
	NamedNode: () => R,
	Namespace: () => Be,
	NextId: () => Mi,
	Node: () => Et,
	Query: () => Ot,
	RDFParser: () => J,
	RDFaProcessor: () => Ur,
	SPARQLToQuery: () => di,
	Serializer: () => gt,
	Statement: () => De,
	Store: () => Pt,
	UpdateManager: () => fi,
	UpdatesSocket: () => mi,
	UpdatesVia: () => hi,
	Util: () => Ze,
	Variable: () => Ie,
	blankNode: () => wi,
	defaultGraph: () => Ti,
	fetcher: () => vi,
	fromNT: () => Ai,
	graph: () => yi,
	isBlankNode: () => me,
	isCollection: () => F,
	isGraph: () => _e,
	isLiteral: () => de,
	isNamedNode: () => pe,
	isPredicate: () => L,
	isQuad: () => fe,
	isRDFObject: () => ge,
	isRDFlibObject: () => I,
	isRDFlibPredicate: () => ce,
	isRDFlibSubject: () => se,
	isStatement: () => oe,
	isStore: () => P,
	isSubject: () => he,
	isTerm: () => ue,
	isVariable: () => le,
	lit: () => bi,
	literal: () => Ei,
	log: () => z,
	namedNode: () => Si,
	parse: () => Kr,
	quad: () => Di,
	queryToSPARQL: () => ui,
	serialize: () => bt,
	sparqlUpdateParser: () => Gr,
	st: () => xi,
	sym: () => Si,
	term: () => ji,
	termValue: () => N,
	triple: () => Oi,
	uri: () => Oe,
	variable: () => Ci
}), _i = {};
for (let e in pi) typeof pi[e] == "function" && (_i[e] = pi[e].bind(pi));
var { fetcher: vi, graph: yi, lit: bi, st: xi, namedNode: Si, variable: Ci, blankNode: wi, defaultGraph: Ti, literal: Ei, quad: Di, triple: Oi } = _i, ki = new Tt(), Ai = (e) => ki.fromNT(e), ji = Et.fromValue, Mi = M.nextId, Ni = class extends Pt {
	constructor(e) {
		super(e), g(this, "fetcher", void 0), this.fetcher = new li(this, {});
	}
}, Pi = class extends Ni {
	constructor(e) {
		super(e), g(this, "updater", void 0), this.updater = new fi(this);
	}
}, Fi = (0, f.default)(gi);
// node_modules/solid-logic/dist/authSession/identityState.esm.js
function Ii(e, t) {
	return e.isActive === t.isActive ? t.webId === e.webId ? null : "sessionChange" : t.isActive ? "sessionChange" : "logout";
}
function Li(e, t) {
	return e.webId === void 0 || !e.isActive ? !1 : t.webId !== e.webId || !t.isActive;
}
var Ri = (e) => e.isActive === !0 || e.isActive === void 0 && !!e.webId, zi = 2e3, Bi = /* @__PURE__ */ new WeakMap(), Vi = /* @__PURE__ */ new WeakMap(), Hi = (e) => {
	if (typeof e != "object" || !e) return;
	let t = Bi.get(e);
	return t || (t = {
		session: e,
		raw: { isActive: !1 },
		cleared: !1,
		cookieWebId: null,
		version: 0,
		attemptId: 0,
		subscribers: /* @__PURE__ */ new Set(),
		listenerAttached: !1,
		watchingTokenUpdates: !1
	}, t.raw = Ki(t), Bi.set(e, t)), t;
};
function Ui(e) {
	return typeof e != "object" || !e ? !1 : Bi.get(e)?.cleared === !0;
}
function Wi(e) {
	return Ui(e) ? !0 : e?.isActive === !1 || e?.info?.isLoggedIn === !1;
}
function Gi(e) {
	return !Wi(e) && Ri(e);
}
var Ki = (e) => e.cleared ? { isActive: !1 } : {
	isActive: Ri(e.session),
	webId: e.session.webId
};
function qi(e) {
	let t = Hi(e);
	return t ? Gi(e) ? e.webId === void 0 ? { source: "none" } : {
		webId: e.webId,
		source: "session"
	} : t.cookieWebId === null ? { source: "none" } : {
		webId: t.cookieWebId,
		source: "cookie"
	} : { source: "none" };
}
function Ji(e) {
	return Ui(e) ? {
		webId: void 0,
		isLoggedIn: !1
	} : {
		webId: e.webId,
		isLoggedIn: Ri(e)
	};
}
function Yi(e) {
	let t = e?.restore;
	if (typeof t != "function" || typeof e != "object" || !e) return;
	let n = e, r = Vi.get(n);
	if (r) return r;
	let i = Promise.resolve().then(() => t.call(e)).finally(() => {
		Vi.delete(n);
	});
	return Vi.set(n, i), i;
}
var Xi = (e, t) => {
	e.subscribers.forEach((e) => e.onTransition?.(t)), e.subscribers.forEach((e) => {
		t.forEach((t) => e.onEvent?.(t));
	});
};
function Zi(e) {
	e.cleared && Ri(e.session) && (e.cleared = !1), Gi(e.session) && (e.cookieWebId = null);
	let t = Ki(e), n = Ii(e.raw, t), r = Li(e.raw, t), i = n !== null || r;
	if (e.raw = t, !i) return;
	e.version += 1;
	let a = [];
	n && a.push(n), r && a.push("identityReplaced"), Xi(e, a);
}
function Qi(e) {
	if (e.cleared) return;
	let t = e.raw.isActive, n = e.raw.webId !== void 0;
	!t || !n ? (e.raw = Ki(e), t && (e.version += 1, Xi(e, ["logout"]))) : (e.cleared = !0, e.raw = Ki(e), e.version += 1, Xi(e, ["logout", "identityReplaced"]));
}
function $i(e, t) {
	if (e.attempt) return e.attempt;
	let n = {
		id: ++e.attemptId,
		version: e.version,
		raw: {
			isActive: Ri(e.session),
			webId: e.session.webId
		},
		promise: Promise.resolve().then(t).finally(() => {
			e.attempt === n && (e.attempt = void 0);
		})
	};
	return e.attempt = n, n;
}
async function ea(e) {
	let t = ta(e);
	if (typeof t != "function") {
		Zi(e);
		return;
	}
	let n = t, r = $i(e, () => n()), i = () => r.id !== e.attemptId || e.version !== r.version, a = () => Ri(e.session) === r.raw.isActive && e.session.webId === r.raw.webId, o, s = !1, c = r.promise.then((e) => {
		o = e, s = !0;
	}, () => {
		s = !0;
	}), l = () => {
		i() || (o === "cleared" ? a() && Qi(e) : Zi(e));
	}, u, d = new Promise((e) => {
		u = setTimeout(e, zi);
	});
	try {
		await Promise.race([c, d]);
	} finally {
		u !== void 0 && clearTimeout(u);
	}
	s ? l() : (Zi(e), c.then(l));
}
function ta(e) {
	let t;
	for (let n of e.subscribers) n.resync && (t = n.resync);
	return t;
}
function na(e) {
	let t = e.session, n = t.setTokenDetails;
	typeof n != "function" || e.watchingTokenUpdates || (e.watchingTokenUpdates = !0, t.setTokenDetails = (...r) => {
		let i = Ki(e), a = () => {
			let t = Ki(e);
			return t.webId !== i.webId || t.isActive !== i.isActive;
		}, o;
		try {
			o = n.apply(t, r);
		} catch (t) {
			throw a() && Zi(e), t;
		}
		return o && typeof o.then == "function" ? o.then((t) => (a() && Zi(e), t), (t) => {
			throw a() && Zi(e), t;
		}) : (a() && Zi(e), o);
	});
}
function ra(e, t = {}) {
	let n = Hi(e);
	if (!n) return {
		reportCookieIdentity: () => void 0,
		unsubscribe: () => void 0
	};
	let r = { ...t };
	n.subscribers.add(r), n.listenerAttached || (n.listenerAttached = !0, typeof e.addEventListener == "function" && e.addEventListener("sessionStateChange", () => Zi(n)), na(n));
	let i = typeof document > "u" ? void 0 : document;
	if (n.subscribers.size === 1 && i && typeof i.addEventListener == "function") {
		let e = () => {
			i.visibilityState === "visible" && (ea(n), n.subscribers.forEach((e) => {
				e.onRefocus?.();
			}));
		};
		i.addEventListener("visibilitychange", e), n.detachDocument = () => i.removeEventListener?.("visibilitychange", e);
	}
	let a = !1;
	return {
		reportCookieIdentity: (e) => {
			a || ia(n, e);
		},
		unsubscribe: () => {
			a || (a = !0, n.subscribers.delete(r), n.subscribers.size === 0 && (n.detachDocument?.(), n.detachDocument = void 0));
		}
	};
}
function ia(e, t) {
	if (e.cookieWebId === t || Gi(e.session)) return;
	let n = e.cookieWebId !== null;
	e.cookieWebId = t;
	let r = ["sessionChange"];
	n && r.push("identityReplaced"), Xi(e, r);
}
function aa(e, t = () => {
	typeof window < "u" && window.location.reload();
}) {
	e && typeof e.on == "function" && e.on("identityReplaced", t);
}
// node_modules/solid-logic/dist/util/ns.esm.js
var X = (0, f.default)(gi);
// node_modules/solid-logic/dist/util/debug.esm.js
function oa(...e) {
	console.log(...e);
}
function sa(...e) {
	console.warn(...e);
}
function ca(...e) {
	console.error(...e);
}
// node_modules/solid-logic/dist/acl/accessControlSubjects.esm.js
var la = {
	agentClass: [
		X.foaf("Agent"),
		X.acl("AuthenticatedAgent"),
		X.rdf("Resource"),
		X.owl("Thing")
	],
	agent: [
		X.vcard("WebID"),
		X.vcard("Individual"),
		X.foaf("Person"),
		X.foaf("Agent")
	],
	agentGroup: [X.vcard("Group")],
	origin: [X.solid("AppProvider"), X.solid("AppProviderClass")]
};
function ua(e) {
	return Object.keys(e).length > 0;
}
function da(e) {
	return e.startsWith("http://") || e.startsWith("https://");
}
function fa(e) {
	try {
		let t = new URL(e);
		return (t.protocol === "http:" || t.protocol === "https:") && !!t.hostname && t.pathname === "/" && !t.search && !t.hash && !t.username && !t.password;
	} catch {
		return !1;
	}
}
function pa(e) {
	try {
		let t = new URL(e);
		if ((t.protocol === "http:" || t.protocol === "https:") && t.hostname && t.pathname === "/" && !t.search && !t.hash && !t.username && !t.password) return `${t.protocol}//${t.host}`;
	} catch {}
	return e;
}
async function ma(e, t) {
	let n = Si(t), r = e.findTypeURIs(n);
	if (fa(t)) return {
		kind: "origin",
		subjectValue: pa(t)
	};
	if (!ua(r) && da(t)) {
		try {
			await e.fetcher.load(n.doc());
		} catch (e) {
			ca(`Failed to load access target ${t}`, e);
		}
		r = e.findTypeURIs(n);
	}
	if (la.origin.some((e) => e.uri in r)) return {
		kind: "origin",
		subjectValue: t
	};
	if (la.agent.some((e) => e.uri in r)) return {
		kind: "agent",
		subjectValue: e.any(n, X.foaf("preferredURI"))?.value ?? t
	};
	if (la.agentGroup.some((e) => e.uri in r)) return {
		kind: "agentGroup",
		subjectValue: t
	};
	if (la.agentClass.some((e) => n.sameTerm(e))) return {
		kind: "agentClass",
		subjectValue: t
	};
}
// node_modules/@rdfjs/data-model/lib/BlankNode.js
var ha = class {
	constructor(e) {
		this.value = e;
	}
	equals(e) {
		return !!e && e.termType === this.termType && e.value === this.value;
	}
};
ha.prototype.termType = "BlankNode";
// node_modules/@rdfjs/data-model/lib/DefaultGraph.js
var ga = class {
	equals(e) {
		return !!e && e.termType === this.termType;
	}
};
ga.prototype.termType = "DefaultGraph", ga.prototype.value = "";
// node_modules/@rdfjs/data-model/lib/fromTerm.js
function _a(e, t) {
	if (!t) return null;
	if (t.termType === "BlankNode") return e.blankNode(t.value);
	if (t.termType === "DefaultGraph") return e.defaultGraph();
	if (t.termType === "Literal") return e.literal(t.value, t.language ? {
		language: t.language,
		direction: t.direction
	} : e.namedNode(t.datatype.value));
	if (t.termType === "NamedNode") return e.namedNode(t.value);
	if (t.termType === "Quad") {
		let n = e.fromTerm(t.subject), r = e.fromTerm(t.predicate), i = e.fromTerm(t.object), a = e.fromTerm(t.graph);
		return e.quad(n, r, i, a);
	}
	if (t.termType === "Variable") return e.variable(t.value);
	throw Error(`unknown termType ${t.termType}`);
}
// node_modules/@rdfjs/data-model/lib/Literal.js
var va = class {
	constructor(e, t, n, r = "") {
		this.value = e, this.language = t, this.datatype = n, this.direction = r;
	}
	equals(e) {
		return !!e && e.termType === this.termType && e.value === this.value && e.language === this.language && e.datatype.equals(this.datatype) && (e.direction || "") === this.direction;
	}
};
va.prototype.termType = "Literal";
// node_modules/@rdfjs/data-model/lib/NamedNode.js
var ya = class {
	constructor(e) {
		this.value = e;
	}
	equals(e) {
		return !!e && e.termType === this.termType && e.value === this.value;
	}
};
ya.prototype.termType = "NamedNode";
// node_modules/@rdfjs/data-model/lib/Quad.js
var ba = class {
	constructor(e, t, n, r) {
		this.subject = e, this.predicate = t, this.object = n, this.graph = r;
	}
	equals(e) {
		return !!e && (e.termType === "Quad" || !e.termType) && e.subject.equals(this.subject) && e.predicate.equals(this.predicate) && e.object.equals(this.object) && e.graph.equals(this.graph);
	}
};
ba.prototype.termType = "Quad", ba.prototype.value = "";
// node_modules/@rdfjs/data-model/lib/Variable.js
var xa = class {
	constructor(e) {
		this.value = e;
	}
	equals(e) {
		return !!e && e.termType === this.termType && e.value === this.value;
	}
};
xa.prototype.termType = "Variable";
// node_modules/@rdfjs/data-model/Factory.js
var Sa = new ya("http://www.w3.org/1999/02/22-rdf-syntax-ns#dirLangString"), Ca = new ya("http://www.w3.org/1999/02/22-rdf-syntax-ns#langString"), wa = new ya("http://www.w3.org/2001/XMLSchema#string"), Ta = class {
	constructor() {
		this.init();
	}
	init() {
		this._data = {
			blankNodeCounter: 0,
			defaultGraph: new ga()
		};
	}
	namedNode(e) {
		return new ya(e);
	}
	blankNode(e) {
		return e ||= "b" + ++this._data.blankNodeCounter, new ha(e);
	}
	literal(e, t) {
		return typeof t == "string" ? new va(e, t, Ca) : typeof t?.language == "string" ? new va(e, t.language, t.direction ? Sa : Ca, t.direction) : new va(e, "", t || wa);
	}
	variable(e) {
		return new xa(e);
	}
	defaultGraph() {
		return this._data.defaultGraph;
	}
	quad(e, t, n, r = this.defaultGraph()) {
		return new ba(e, t, n, r);
	}
	fromTerm(e) {
		return _a(this, e);
	}
	fromQuad(e) {
		return _a(this, e);
	}
};
Ta.exports = [
	"blankNode",
	"defaultGraph",
	"fromQuad",
	"fromTerm",
	"literal",
	"namedNode",
	"quad",
	"variable"
];
// node_modules/@rdfjs/data-model/index.js
var Ea = new Ta(), Z = "http://www.w3.org/ns/auth/acl#", Da = "http://xmlns.com/foaf/0.1/", Oa = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", ka = {
	type: "agentClass",
	iri: "http://xmlns.com/foaf/0.1/Agent"
}, Aa = {
	type: "agentClass",
	iri: Z + "AuthenticatedAgent"
}, ja = [
	"Read",
	"Write",
	"Append",
	"Control"
];
function Ma(e) {
	return Z + e;
}
function Na(e) {
	if (!e.startsWith("http://www.w3.org/ns/auth/acl#")) return;
	let t = e.slice(30);
	return ja.includes(t) ? t : void 0;
}
function Q(e) {
	return Ea.namedNode(e);
}
function $(e, t, n) {
	return Ea.quad(e, t, n);
}
// node_modules/@dokieli/web-access-control/dist/errors.js
var Pa = class extends Error {
	constructor(e, t) {
		super(e), this.name = "WACError", this.iri = t?.iri, this.cause = t?.cause;
	}
}, Fa = class extends Pa {
	constructor(e, t) {
		super(e, t), this.name = "ACLNotDeterminedError";
	}
}, Ia = class extends Pa {
	constructor(e, t) {
		super(e, t), this.status = 403, this.name = "ACLAccessDeniedError", this.iri = t.iri;
	}
}, La = class extends Pa {
	constructor(e, t) {
		super(e, t), this.name = "ACLFetchError", this.iri = t.iri, this.status = t.status;
	}
}, Ra = class extends Pa {
	constructor(e, t) {
		super(e, t), this.name = "PatchApplyError", this.iri = t.iri, this.status = t.status;
	}
}, za = /<([^>]*)>((?:\s*;\s*[\w*-]+\s*=\s*(?:"[^"]*"|[^,;]+))*)/g, Ba = /;\s*([\w*-]+)\s*=\s*(?:"([^"]*)"|([^,;\s]+))/g;
function Va(e) {
	let t = [];
	for (let n of e.matchAll(za)) {
		let e = {};
		for (let t of n[2].matchAll(Ba)) {
			let n = t[1].toLowerCase();
			n in e || (e[n] = t[2] ?? t[3] ?? "");
		}
		t.push({
			target: n[1],
			params: e
		});
	}
	return t;
}
function Ha(e, t, n) {
	if (!e) return [];
	let r = [], i = t.toLowerCase();
	for (let t of Va(e)) (t.params.rel ?? "").toLowerCase().split(/\s+/).includes(i) && r.push(new URL(t.target, n).href);
	return r;
}
// node_modules/@dokieli/web-access-control/dist/authorizations.js
function Ua(e) {
	return e.termType + ":" + e.value;
}
function Wa(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = Ua(n.subject), r = t.get(e);
		r || (r = {
			term: n.subject,
			properties: /* @__PURE__ */ new Map()
		}, t.set(e, r));
		let i = r.properties.get(n.predicate.value);
		i || (i = [], r.properties.set(n.predicate.value, i)), i.push(n.object);
	}
	return t;
}
function Ga(e, t) {
	return (e?.properties.get(t) ?? []).map((e) => e.value);
}
function Ka(e, t) {
	let n = {}, r = e.get(Ua(t));
	if (r) for (let [e, t] of r.properties) n[e] = t.map((e) => e.value);
	return {
		id: t.value,
		blankNode: t.termType === "BlankNode",
		properties: n
	};
}
function qa(e, t) {
	let n = Wa(e), r = [];
	for (let e of n.values()) {
		if (!Ga(e, "http://www.w3.org/1999/02/22-rdf-syntax-ns#type").includes("http://www.w3.org/ns/auth/acl#Authorization") || !Object.entries(t).every(([t, n]) => n === void 0 || Ga(e, "http://www.w3.org/ns/auth/acl#" + t).includes(n))) continue;
		let i = [];
		for (let t of Ga(e, Z + "mode")) {
			let e = Na(t);
			e && !i.includes(e) && i.push(e);
		}
		r.push({
			id: e.term.value,
			blankNode: e.term.termType === "BlankNode",
			accessTo: Ga(e, Z + "accessTo"),
			default: Ga(e, Z + "default"),
			agent: Ga(e, Z + "agent"),
			agentClass: Ga(e, Z + "agentClass"),
			agentGroup: Ga(e, Z + "agentGroup"),
			mode: i,
			origin: Ga(e, Z + "origin"),
			condition: (e.properties.get("http://www.w3.org/ns/auth/acl#condition") ?? []).map((e) => Ka(n, e))
		});
	}
	return r;
}
function Ja(e) {
	let t = e.defaultACLResource !== e.effectiveACLResource;
	if (t && e.effectiveContainer === void 0) throw new Pa("effectiveContainer is required when the effective ACL resource is inherited", { iri: e.resource });
	let n = t ? { default: e.effectiveContainer } : { accessTo: e.resource };
	return {
		resource: e.resource,
		defaultACLResource: e.defaultACLResource,
		effectiveACLResource: e.effectiveACLResource,
		effectiveContainer: e.effectiveContainer,
		inherited: t,
		conditions: e.conditions ?? [],
		authorizations: qa(e.dataset, n),
		dataset: e.dataset
	};
}
// node_modules/@dokieli/web-access-control/dist/parse.js
var Ya = [
	"text/turtle",
	"application/trig",
	"application/n-triples",
	"application/n-quads",
	"text/n3"
];
function Xa(e) {
	return Ya.includes(e);
}
var Za = (e, { baseIRI: t, contentType: n }) => {
	let r = n.split(";")[0].trim().toLowerCase();
	if (!Xa(r)) throw new Pa(`The built-in parser reads ${Ya.join(", ")}, not ${r}; pass a parse function that does`, { iri: t });
	try {
		return new Rr({
			baseIRI: t,
			format: r
		}).parse(e);
	} catch (e) {
		throw new Pa(`Failed to parse ${r} from ${t}`, {
			iri: t,
			cause: e
		});
	}
}, Qa = "Effective ACL resource not determined. https://solidproject.org/TR/wac#effective-acl-resource-algorithm";
async function $a(e, t) {
	let n = {
		targets: [],
		method: "HEAD",
		status: 0
	};
	for (let r of ["HEAD", "GET"]) {
		let i;
		try {
			i = await t(e, { method: r });
		} catch (t) {
			throw new La(`Failed to ${r} ${e}`, {
				iri: e,
				cause: t
			});
		}
		let a = Ha(i.headers.get("Link"), "acl", e);
		if (r === "GET" && i.body?.cancel().catch(() => {}), n = {
			targets: a,
			method: r,
			status: i.status
		}, a.length) return n;
	}
	return n;
}
function eo(e) {
	let t = new URL(e);
	if (t.pathname === "/" || t.pathname === "") return;
	let n = t.pathname.endsWith("/") ? t.pathname.slice(0, -1) : t.pathname;
	return t.origin + n.slice(0, n.lastIndexOf("/") + 1);
}
async function to(e, t) {
	let { fetch: n = globalThis.fetch, parse: r = Za, accept: i = "text/turtle" } = t, a = new URL(e).href, o = a, s = t.aclResource === void 0 ? void 0 : new URL(t.aclResource, a).href, c, l;
	for (;;) {
		let e;
		if (s === void 0) {
			let t = await $a(o, n);
			if (t.targets.length === 0) throw new Fa(`No Link rel="acl" on ${o}; neither HEAD nor GET advertised one (${t.method} answered ${t.status}). ${Qa}`, { iri: o });
			e = t.targets[0];
		} else e = s, s = void 0;
		c ??= e;
		let t;
		try {
			t = await n(e, { headers: { Accept: i } });
		} catch (t) {
			throw new La(`Failed to fetch ${e}`, {
				iri: e,
				cause: t
			});
		}
		if (t.status === 404) {
			let e = eo(o);
			if (e === void 0) throw new Fa(Qa, { iri: a });
			l = e, o = e;
			continue;
		}
		if (t.status === 403) throw new Ia(`Access to candidate ACL resource ${e} is forbidden. Stopping effective ACL resource search.`, { iri: e });
		if (!t.ok) throw new La(`Failed to fetch ${e}: ${t.status}`, {
			iri: e,
			status: t.status
		});
		let u = t.headers.get("Content-Type") ?? i, d = await r(await t.text(), {
			baseIRI: e,
			contentType: u
		}), f = Ha(t.headers.get("Link"), Z + "condition", e);
		return Ja({
			resource: a,
			defaultACLResource: c,
			effectiveACLResource: e,
			effectiveContainer: l,
			conditions: f,
			dataset: d
		});
	}
}
// node_modules/@dokieli/web-access-control/dist/plan.js
var no = [
	"agent",
	"agentClass",
	"agentGroup",
	"origin"
], ro = {
	type: "ClientCondition",
	property: "clientClass",
	iri: Da + "Agent"
};
function io() {
	return "authorization-" + (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 10));
}
function ao(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.dataset) n.subject.termType === "NamedNode" && t.add(n.subject.value);
	return t;
}
function oo(e, t, n) {
	let r = e + "#" + n(), i = 0;
	for (; t.has(r);) i += 1, r = e + "#" + n() + "-" + i;
	return t.add(r), r;
}
function so(e) {
	try {
		return new URL(e).origin === e;
	} catch {
		return !1;
	}
}
function co(e) {
	return no.reduce((t, n) => t + e[n].length, 0);
}
function lo(e, t, n) {
	return e.dataset.filter((e) => e.subject.termType === "NamedNode" && e.subject.value === t && (n === void 0 || e.predicate.value === n) && e.object.termType !== "BlankNode");
}
function uo(e) {
	let t = Q(e.id), n = [$(t, Q(Oa), Q(Z + "Authorization"))];
	n.push($(t, Q(Z + "accessTo"), Q(e.resource)));
	for (let r of e.modes) n.push($(t, Q(Z + "mode"), Q(Ma(r))));
	for (let r of e.agent) n.push($(t, Q(Z + "agent"), Q(r)));
	for (let r of e.agentClass) n.push($(t, Q(Z + "agentClass"), Q(r)));
	for (let r of e.agentGroup) n.push($(t, Q(Z + "agentGroup"), Q(r)));
	for (let r of e.origin) n.push($(t, Q(Z + "origin"), Q(r)));
	return n;
}
function fo(e, t, n) {
	let r = Q(t), i = [$(Q(e), Q(Z + "condition"), r), $(r, Q(Oa), Q(Z + n.type))];
	return n.property && n.iri && i.push($(r, Q(Z + n.property), Q(n.iri))), i;
}
function po(e, t) {
	return t || (e.conditions.length ? [ro] : []);
}
function mo(e, t) {
	let n = lo(e, t.id, Z + "condition");
	for (let r of t.condition) r.blankNode || e.authorizations.some((e) => e.id !== t.id && e.condition.some(({ id: e }) => e === r.id)) || n.push(...lo(e, r.id));
	return n;
}
function ho(e, t, n) {
	let r = Q(t), i = [$(Q(e), Q(Z + "condition"), r)];
	for (let [e, t] of Object.entries(n.properties)) for (let n of t) i.push($(r, Q(e), Q(n)));
	return i;
}
function go(e) {
	let { ctx: t, taken: n, newId: r, subject: i, modes: a, origin: o } = e, s = oo(t.defaultACLResource, n, r), c = uo({
		id: s,
		resource: t.resource,
		modes: a,
		agent: i.type === "agent" ? [i.iri] : [],
		agentClass: i.type === "agentClass" ? [i.iri] : [],
		agentGroup: i.type === "agentGroup" ? [i.iri] : [],
		origin: i.type === "origin" && !o.includes(i.iri) ? [i.iri, ...o] : o
	});
	for (let i of po(t, e.conditions)) c.push(...fo(s, oo(t.defaultACLResource, n, r), i));
	return c;
}
function _o(e) {
	let { ctx: t, taken: n, newId: r, authorization: i, modes: a, without: o } = e, s = oo(t.defaultACLResource, n, r), c = {
		agent: [...i.agent],
		agentClass: [...i.agentClass],
		agentGroup: [...i.agentGroup],
		origin: [...i.origin]
	};
	o && (c[o.type] = c[o.type].filter((e) => e !== o.iri));
	let l = uo({
		id: s,
		resource: t.resource,
		modes: a ?? i.mode,
		...c
	});
	if (e.conditions) for (let i of e.conditions) l.push(...fo(s, oo(t.defaultACLResource, n, r), i));
	else for (let e of i.condition) l.push(...ho(s, oo(t.defaultACLResource, n, r), e));
	return l;
}
function vo(e, t, n, r) {
	if (!n.length) throw new Pa("planGrant requires at least one mode; use planRevoke to remove access", { iri: e.resource });
	if (t.type === "origin" && !so(t.iri)) throw new Pa(`${t.iri} is not an origin, expected scheme://host[:port]`, { iri: e.resource });
	let i = r?.newId ?? io, a = r?.origin ?? [], o = r?.conditions;
	if (o?.length && !e.conditions.length) throw new Pa("The ACL resource does not advertise condition support (Link rel=acl:condition); a server without it would evaluate the authorization without its conditions", { iri: e.defaultACLResource });
	let s = e.defaultACLResource, c = ao(e), l = [], u = [];
	if (!e.inherited) {
		let r = !1;
		for (let a of e.authorizations) if (a[t.type].includes(t.iri) && !a.blankNode) {
			if (co(a) === 1) {
				l.push(...lo(e, a.id, Z + "mode"));
				for (let e of n) u.push($(Q(a.id), Q(Z + "mode"), Q(Ma(e))));
				if (o) {
					l.push(...mo(e, a));
					for (let e of o) u.push(...fo(a.id, oo(s, c, i), e));
				}
				r = !0;
			} else l.push($(Q(a.id), Q(Z + t.type), Q(t.iri)));
		}
		return r || u.push(...go({
			ctx: e,
			taken: c,
			newId: i,
			subject: t,
			modes: n,
			origin: a,
			conditions: o
		})), {
			target: s,
			deletes: l,
			inserts: u
		};
	}
	let d = !1;
	for (let r of e.authorizations) {
		let a = r[t.type].includes(t.iri);
		a && co(r) === 1 ? (u.push(..._o({
			ctx: e,
			taken: c,
			newId: i,
			authorization: r,
			modes: n,
			conditions: o
		})), d = !0) : a ? u.push(..._o({
			ctx: e,
			taken: c,
			newId: i,
			authorization: r,
			without: t
		})) : u.push(..._o({
			ctx: e,
			taken: c,
			newId: i,
			authorization: r
		}));
	}
	return d || u.push(...go({
		ctx: e,
		taken: c,
		newId: i,
		subject: t,
		modes: n,
		origin: a,
		conditions: o
	})), {
		target: s,
		deletes: [],
		inserts: u
	};
}
function yo(e, t, n) {
	let r = n?.newId ?? io, i = e.defaultACLResource;
	if (!e.inherited) {
		let n = [];
		for (let r of e.authorizations) if (r[t.type].includes(t.iri) && !r.blankNode) {
			if (co(r) === 1) {
				n.push(...lo(e, r.id));
				for (let t of r.condition) t.blankNode || n.push(...lo(e, t.id));
			} else n.push($(Q(r.id), Q(Z + t.type), Q(t.iri)));
		}
		if (!n.length) throw new Pa(`No authorization found granting access to ${t.iri}`, { iri: e.resource });
		return {
			target: i,
			deletes: n,
			inserts: []
		};
	}
	let a = ao(e), o = [];
	for (let n of e.authorizations) {
		let i = n[t.type].includes(t.iri);
		i && co(n) === 1 || o.push(..._o({
			ctx: e,
			taken: a,
			newId: r,
			authorization: n,
			without: i ? t : void 0
		}));
	}
	return {
		target: i,
		deletes: [],
		inserts: o
	};
}
function bo(e, t, n) {
	return t ? vo(e, ka, ["Read"], n) : yo(e, ka, n);
}
// node_modules/@dokieli/web-access-control/dist/serialize.js
var xo = "http://www.w3.org/2001/XMLSchema#string", So = "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString";
function Co(e) {
	switch (e.termType) {
		case "NamedNode": return "<" + e.value + ">";
		case "BlankNode": return "_:" + e.value;
		case "Literal": {
			let t = "\"" + e.value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\n/g, "\\n").replace(/\r/g, "\\r") + "\"";
			return e.language ? t += "@" + e.language : e.datatype && e.datatype.value !== xo && e.datatype.value !== So && (t += "^^<" + e.datatype.value + ">"), t;
		}
		case "Variable": return "?" + e.value;
		default: throw new Pa(`Cannot serialize a ${e.termType} term`);
	}
}
function wo(e) {
	return e.map((e) => Co(e.subject) + " " + Co(e.predicate) + " " + Co(e.object) + " .").join("\n");
}
function To(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) for (let e of [
		n.subject,
		n.predicate,
		n.object
	]) e.termType === "Variable" && t.add(e.value);
	return t;
}
function Eo(e) {
	return e.some((e) => e.subject.termType === "BlankNode" || e.object.termType === "BlankNode");
}
function Do(e) {
	let t = e.where ?? [];
	if (Eo(e.deletes)) throw new Pa("A patch cannot delete triples containing blank nodes", { iri: e.target });
	if (Eo(t)) throw new Pa("Use variables rather than blank nodes in a where clause", { iri: e.target });
	let n = To(t);
	for (let t of To([...e.deletes, ...e.inserts])) if (!n.has(t)) throw new Pa(`Variable ?${t} in the patch does not occur in the where clause`, { iri: e.target });
}
function Oo(e) {
	if (Do(e), e.where?.length) {
		let t = [];
		return e.deletes.length && t.push("DELETE {\n" + wo(e.deletes) + "\n}"), e.inserts.length && t.push("INSERT {\n" + wo(e.inserts) + "\n}"), t.length ? t.join("\n") + "\nWHERE {\n" + wo(e.where) + "\n}" : "";
	}
	let t = [];
	return e.deletes.length && t.push("DELETE DATA {\n" + wo(e.deletes) + "\n}"), e.inserts.length && t.push("INSERT DATA {\n" + wo(e.inserts) + "\n}"), t.join(";\n");
}
function ko(e) {
	if (Do(e), Eo(e.inserts)) throw new Pa("N3 Patch formulae cannot contain blank nodes; use IRIs", { iri: e.target });
	let t = [];
	return e.where?.length && t.push("solid:where {\n" + wo(e.where) + "\n}"), e.deletes.length && t.push("solid:deletes {\n" + wo(e.deletes) + "\n}"), e.inserts.length && t.push("solid:inserts {\n" + wo(e.inserts) + "\n}"), "@prefix solid: <http://www.w3.org/ns/solid/terms#>.\n" + ("_:" + (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 10))) + " a solid:InsertDeletePatch" + (t.length ? ";\n" + t.join(";\n") : "") + ".\n";
}
// node_modules/@dokieli/web-access-control/dist/apply.js
async function Ao(e, t) {
	let { fetch: n = globalThis.fetch } = t ?? {}, r = null;
	try {
		r = (await n(e, { method: "OPTIONS" })).headers.get("Accept-Patch");
	} catch {
		return "text/n3";
	}
	if (!r) return "text/n3";
	let i = r.split(",").map((e) => e.split(";")[0].trim().toLowerCase());
	if (i.includes("text/n3") || i.includes("*/*")) return "text/n3";
	if (i.includes("application/sparql-update")) return "application/sparql-update";
	throw new Ra(`PATCH media type not supported: ${e} accepts ${r}`, { iri: e });
}
async function jo(e, t) {
	let { fetch: n = globalThis.fetch } = t ?? {}, r = t?.contentType ?? await Ao(e.target, { fetch: n }), i = r === "text/n3" ? ko(e) : Oo(e), a;
	try {
		a = await n(e.target, {
			method: "PATCH",
			headers: { "Content-Type": r },
			body: i
		});
	} catch (t) {
		throw new Ra(`Failed to PATCH ${e.target}`, {
			iri: e.target,
			cause: t
		});
	}
	if (!a.ok) throw new Ra(`Failed to PATCH ${e.target}: ${a.status}`, {
		iri: e.target,
		status: a.status
	});
	return a;
}
// node_modules/solid-logic/dist/acl/aclLogic.esm.js
var Mo = [
	"Owner",
	"Editor",
	"No Access",
	"Viewer",
	"Poster",
	"Submitter"
], No = ["No Access", "Viewer"], Po = "Owner (write locked)";
function Fo(e, t, n = !1) {
	let r = n && (t.default?.length ?? 0) > 0, i = r || (t.accessTo?.includes(e) ?? !1), a = r || (t.default?.includes(e) ?? !1);
	if (i && a) return "folder+contents";
	if (i) return "folder";
	if (a) return "contents";
}
function Io(e, t, n, r = !1) {
	return t.filter((t) => Fo(e, t, r) === n);
}
function Lo(e) {
	return Ro(e).primaryScope;
}
function Ro(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e.authorizations ?? []) {
		let r = Fo(e.resource, n, e.inherited);
		r && t.add(r);
	}
	if (!t.size) {
		let n = /* @__PURE__ */ new Map();
		for (let t of e.dataset ?? []) {
			if (t.object.value !== e.resource || t.predicate.value !== "http://www.w3.org/ns/auth/acl#accessTo" && t.predicate.value !== "http://www.w3.org/ns/auth/acl#default") continue;
			let r = n.get(t.subject.value) ?? {
				accessTo: !1,
				default: !1
			};
			r.accessTo ||= t.predicate.value === Z + "accessTo", r.default ||= t.predicate.value === Z + "default", n.set(t.subject.value, r);
		}
		for (let e of n.values()) e.accessTo && e.default ? t.add("folder+contents") : e.accessTo ? t.add("folder") : e.default && t.add("contents");
	}
	let n = [...t];
	return {
		distinctScopes: n,
		primaryScope: n.includes("folder+contents") ? "folder+contents" : n.includes("contents") ? "contents" : n.includes("folder") ? "folder" : "folder+contents",
		mixed: n.length > 1
	};
}
var zo = Si("http://www.iana.org/assignments/link-relations/acl");
function Bo(e) {
	let t = X, n = [
		{
			label: "Owner",
			modes: [
				"Read",
				"Write",
				"Control"
			]
		},
		{
			label: Po,
			modes: ["Read", "Control"]
		},
		{
			label: "Editor",
			modes: ["Read", "Write"]
		},
		{
			label: "Poster",
			modes: ["Append", "Read"]
		},
		{
			label: "Submitter",
			modes: ["Append"]
		},
		{
			label: "Viewer",
			modes: ["Read"]
		},
		{
			label: "No Access",
			modes: []
		}
	], r = [{
		label: "Viewer",
		modes: ["Read"]
	}, {
		label: "No Access",
		modes: []
	}];
	function i(e) {
		let t = new Set(e);
		return n.find((e) => e.modes.length === t.size && e.modes.every((e) => t.has(e)))?.label ?? "No Access";
	}
	function a(e) {
		return [...n.find((t) => t.label === e)?.modes ?? []];
	}
	function o(e) {
		let t = new Set(e);
		return r.find((e) => e.label !== "No Access" && e.modes.every((e) => t.has(e)))?.label ?? "No Access";
	}
	function s(e) {
		return [...r.find((t) => t.label === e)?.modes ?? []];
	}
	function c() {
		let t = e.fetcher, n = t?._fetch ?? t?.fetch;
		if (!n) throw Error("Cannot find effective ACL, store has no fetcher");
		return n.bind(t);
	}
	async function l(t) {
		await e.fetcher.load(t);
		let n = e.any(t, zo);
		if (!n) throw Error(`No ACL link discovered for ${t}`);
		return n.value;
	}
	async function u(e) {
		return to(typeof e == "string" ? e : e.value, { fetch: c() });
	}
	async function d(e) {
		return (await u(e)).authorizations;
	}
	function f(e) {
		return Lo(e);
	}
	function p(n) {
		let r = Si(typeof n == "string" ? n : n.value);
		return r.value === r.site().value || typeof e.holds == "function" && e.holds(r, t.rdf("type"), t.space("Storage"), r.doc());
	}
	function m(e, t) {
		return t[{
			agent: "agent",
			agentGroup: "agentGroup",
			agentClass: "agentClass",
			origin: "origin"
		}[e.type]]?.includes(e.iri) ?? !1;
	}
	function h(e, t) {
		if (!p(e.resource)) return;
		let n = new Set(t.deletes.map((e) => e.subject.value)), r = /* @__PURE__ */ new Map();
		for (let e of t.inserts) {
			let t = r.get(e.subject.value) ?? {
				modes: [],
				accessTo: []
			};
			e.predicate.value === "http://www.w3.org/ns/auth/acl#mode" ? t.modes.push(e.object.value) : e.predicate.value === "http://www.w3.org/ns/auth/acl#accessTo" && t.accessTo.push(e.object.value), r.set(e.subject.value, t);
		}
		if (!(!e.inherited && e.authorizations.some((t) => !n.has(t.id) && t.mode.includes("Control") && t.accessTo.includes(e.resource)) || [...r.values()].some((t) => t.modes.includes("http://www.w3.org/ns/auth/acl#Control") && t.accessTo.includes(e.resource)))) throw Error("The protected storage resource must retain at least one Control authorization.");
	}
	function g(e, t) {
		if (!new URL(e.resource).pathname.endsWith("/")) return t;
		let n = t.inserts.filter((t) => t.predicate.value === "http://www.w3.org/ns/auth/acl#accessTo" && t.object.value === e.resource).filter((n) => !t.inserts.some((t) => t.subject.equals(n.subject) && t.predicate.value === "http://www.w3.org/ns/auth/acl#default" && t.object.value === e.resource)).map((e) => $(e.subject, Q(Z + "default"), e.object));
		return {
			...t,
			inserts: [...t.inserts, ...n]
		};
	}
	async function _(e, t, n) {
		let r = await u(e);
		if (r.inherited && new URL(r.resource).pathname.endsWith("/")) {
			let e = T(r, t, n, "folder");
			return h(r, e), e;
		}
		let i = vo(r, t, n);
		return h(r, i), i;
	}
	function v(e) {
		if (!new URL(e.resource).pathname.endsWith("/")) throw Error(`Expected a container URL ending in "/": ${e.resource}`);
	}
	let y = [
		"agent",
		"agentClass",
		"agentGroup",
		"origin"
	], b = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", x = /* @__PURE__ */ new Set([
		b,
		Z + "client",
		Z + "clientClass",
		Z + "clientGroup",
		Z + "issuer",
		Z + "issuerClass",
		Z + "issuerGroup",
		Z + "description",
		Z + "ClientCondition",
		Z + "IssuerCondition"
	]), S = /* @__PURE__ */ new Set([Z + "ClientCondition", Z + "IssuerCondition"]);
	function C(e) {
		let t = /* @__PURE__ */ new Set([...(e.dataset ?? []).map((e) => e.subject.value), ...e.authorizations.flatMap((e) => [e.id, ...(e.condition ?? []).map((e) => e.id)])]);
		return (e) => {
			let n = e, r = 1;
			for (; t.has(n);) n = `${e}-${r++}`;
			return t.add(n), n;
		};
	}
	function w(e) {
		for (let t of e.authorizations) for (let e of t.condition ?? []) {
			let t = e.properties[b] ?? [];
			if (t.length > 1 || t.length === 1 && !S.has(t[0])) throw Error(`Unsupported ACL condition type on ${e.id}`);
			for (let t of Object.keys(e.properties)) if (!x.has(t)) throw Error(`Unsupported ACL condition property: ${t}`);
		}
	}
	function T(e, t, n, r, i = !1) {
		let a = [], o = t.type, s = C(e);
		w(e);
		let c = (t, n, r, i) => {
			let o = y.flatMap((e) => t[e].map((t) => ({
				key: e,
				iri: t
			})));
			if (!o.length || !r.accessTo && !r.default) return;
			let c = s(n), l = Q(c);
			a.push($(l, Q(b), Q(Z + "Authorization")), ...r.accessTo ? [$(l, Q(Z + "accessTo"), Q(e.resource))] : [], ...r.default ? [$(l, Q(Z + "default"), Q(e.resource))] : [], ...(i ?? t.mode).map((e) => $(l, Q(Z + "mode"), Q(`http://www.w3.org/ns/auth/acl#${e}`))), ...o.map(({ key: e, iri: t }) => $(l, Q(Z + e), Q(t))), ...(t.condition ?? []).flatMap((t) => {
				let n = Q(s(`${c}-condition`)), r = e.dataset.filter((e) => e.subject.value === t.id).map((e) => $(n, e.predicate, e.object));
				return [$(l, Q(Z + "condition"), n), ...r];
			}));
		}, l = (e) => ({
			...e,
			[o]: e[o].filter((e) => e !== t.iri)
		}), u = (e) => ({
			...e,
			agent: [],
			agentClass: [],
			agentGroup: [],
			origin: [],
			[o]: [t.iri]
		});
		if (e.authorizations.forEach((n, i) => {
			let a = `${e.defaultACLResource}#inherited-${i + 1}`, s = (n.default?.length ?? 0) > 0, d = {
				accessTo: s || n.accessTo.includes(e.resource),
				default: s
			};
			n[o]?.includes(t.iri) ?? !1 ? (c(l(n), a, d), c(u(n), `${a}-retained`, {
				accessTo: d.accessTo && r === "contents",
				default: d.default && r === "folder"
			})) : c(n, a, d);
		}), !i) {
			let i = e.authorizations.find((e) => e[o]?.includes(t.iri) && (e.default?.length ?? 0) > 0);
			c(u({
				id: `${e.defaultACLResource}#inherited-new-source`,
				blankNode: !1,
				accessTo: [],
				default: [],
				agent: [],
				agentClass: [],
				agentGroup: [],
				origin: [],
				mode: [],
				condition: i?.condition ?? []
			}), `${e.defaultACLResource}#inherited-new`, {
				accessTo: r !== "contents",
				default: r !== "folder"
			}, n ?? []);
		}
		return {
			target: e.defaultACLResource,
			deletes: [],
			inserts: a
		};
	}
	async function E(e, t, n) {
		let r = await u(e);
		v(r);
		let i = r.inherited ? T(r, t, n, "folder") : vo(r, t, n);
		return h(r, i), i;
	}
	async function D(e, t, n) {
		let r = await u(e);
		v(r);
		let i = r.inherited ? T(r, t, n, "folder+contents") : g(r, vo(r, t, n));
		return h(r, i), i;
	}
	async function O(e, t, n) {
		let r = await u(e);
		if (v(r), p(r.resource)) throw Error("Applying access to the contents of a protected storage resource is not allowed.");
		if (r.inherited) return T(r, t, n, "contents");
		let i = r.authorizations.filter((e) => e.default?.includes(r.resource) && m(t, e));
		if (i.length) return te(r, i, t, n);
		let a = t.type, o = Q(C(r)(`${r.defaultACLResource}#contents-1`)), s = $(o, Q(Z + a), Q(t.iri)), c = [
			$(o, Q(b), Q(Z + "Authorization")),
			$(o, Q(Z + "default"), Q(r.resource)),
			...n.map((e) => $(o, Q(Z + "mode"), Q(`http://www.w3.org/ns/auth/acl#${e}`))),
			s
		];
		return {
			target: r.defaultACLResource,
			deletes: [],
			inserts: c
		};
	}
	async function ee(e, t) {
		let n = await u(e);
		if (v(n), p(n.resource)) throw Error("Removing access from the contents of a protected storage resource is not allowed.");
		let r = Z + "default";
		if (!n.inherited) {
			let e = n.authorizations.filter((e) => e.default?.includes(n.resource) && m(t, e));
			if (e.length) return te(n, e, t);
			let i = n.dataset.filter((e) => e.predicate.value === r && e.object.value === n.resource && n.authorizations.some((n) => n.id === e.subject.value && n[t.type].includes(t.iri)));
			if (!i.length) throw Error(`No default authorization found for ${t.iri}`);
			return {
				target: n.defaultACLResource,
				deletes: i,
				inserts: []
			};
		}
		if (!n.authorizations.some((e) => e.default?.includes(n.resource) && m(t, e))) throw Error(`No default authorization found for ${t.iri}`);
		return T(n, t, void 0, "contents", !0);
	}
	function te(e, t, n, r) {
		let i = C(e), a = [], o = (e, t, n, r, i, o) => {
			t.length && (r.length || i.length) && a.push($(e, Q("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), Q("http://www.w3.org/ns/auth/acl#Authorization")), ...r.map((t) => $(e, Q("http://www.w3.org/ns/auth/acl#accessTo"), Q(t))), ...i.map((t) => $(e, Q("http://www.w3.org/ns/auth/acl#default"), Q(t))), ...n.map((t) => $(e, Q("http://www.w3.org/ns/auth/acl#mode"), Q(`http://www.w3.org/ns/auth/acl#${t}`))), ...o.map((t) => $(e, Q("http://www.w3.org/ns/auth/acl#condition"), Q(t))), ...t.map(({ key: t, iri: n }) => $(e, Q("http://www.w3.org/ns/auth/acl#" + t), Q(n))));
		}, s = [];
		return t.forEach((t, a) => {
			let c = y.flatMap((e) => t[e].map((t) => ({
				key: e,
				iri: t
			}))), l = c.filter(({ key: e, iri: t }) => e !== n.type || t !== n.iri), u = `${e.defaultACLResource}#split-${a + 1}`;
			if (!r && c.length === 1 && l.length === 0) {
				s.push(...e.dataset.filter((n) => n.subject.value === t.id && n.predicate.value === "http://www.w3.org/ns/auth/acl#default" && n.object.value === e.resource));
				return;
			}
			s.push(...e.dataset.filter((e) => e.subject.value === t.id));
			let d = (t.condition ?? []).map((e) => e.id);
			o(Q(i(`${e.defaultACLResource}#retained-${a + 1}`)), l, t.mode, t.accessTo, t.default, d);
			let f = t.default.filter((t) => t !== e.resource);
			(t.accessTo.length || f.length) && o(Q(i(`${u}-retained`)), [{
				key: n.type,
				iri: n.iri
			}], t.mode, t.accessTo, f, d), r && o(Q(i(`${u}`)), [{
				key: n.type,
				iri: n.iri
			}], r, [], t.default.filter((t) => t === e.resource), d);
		}), {
			target: e.defaultACLResource,
			deletes: s,
			inserts: a
		};
	}
	async function k(e, t) {
		let n = await u(e);
		if (n.inherited && new URL(n.resource).pathname.endsWith("/")) {
			let e = T(n, t, void 0, "folder+contents", !0);
			return h(n, e), e;
		}
		let r = g(n, yo(n, t));
		return h(n, r), r;
	}
	async function A(e, t) {
		return bo(await u(e), t);
	}
	async function ne(e) {
		let t = await u(e);
		if (p(t.resource)) throw Error("The protected storage resource cannot be reset to a default ACL.");
		let n = await c()(t.defaultACLResource, { method: "DELETE" });
		if (!n.ok && n.status !== 404) throw Error(`Unable to remove ACL ${t.defaultACLResource}: HTTP ${n.status}`);
		return n;
	}
	async function re(e) {
		return jo(e, { fetch: c() });
	}
	async function ie(t) {
		return ma(e, t);
	}
	function ae(t, n, r) {
		let i = e.any(e.sym(t), zo);
		return Promise.resolve().then(() => i || j(t).catch((e) => {
			throw Error(`Error fetching rel=ACL header for ${t}: ${e}`);
		})).then((i) => {
			let a = M(t, n, i.uri, r);
			if (!e.fetcher) throw Error("Cannot PUT this, store has no fetcher");
			return e.fetcher.webOperation("PUT", i.uri, {
				data: a,
				contentType: "text/turtle"
			}).then((e) => {
				if (!e.ok) throw Error("Error writing ACL text: " + e.error);
				return i;
			});
		});
	}
	function j(t) {
		let n = e.fetcher;
		if (!n) throw Error("Cannot fetch ACL rel, store has no fetcher");
		return n.load(t).then((n) => {
			if (!n.ok) throw Error("fetchACLRel: While loading:" + n.error);
			let r = e.any(e.sym(t), zo);
			if (!r) throw Error("fetchACLRel: No Link rel=ACL header for " + t);
			return r;
		});
	}
	function M(e, n, r, i = {}) {
		let a = i.public || [], o = yi(), s = Be("http://www.w3.org/ns/auth/acl#"), c = o.sym(`${r}#a1`), l = o.sym(r), u = o.sym(e);
		if (o.add(c, t.rdf("type"), s("Authorization"), l), o.add(c, s("accessTo"), u, l), i.defaultForNew && o.add(c, s("default"), u, l), o.add(c, s("agent"), n, l), o.add(c, s("mode"), s("Read"), l), o.add(c, s("mode"), s("Write"), l), o.add(c, s("mode"), s("Control"), l), a.length) {
			c = o.sym(`${r}#a2`), o.add(c, t.rdf("type"), s("Authorization"), l), o.add(c, s("accessTo"), u, l), o.add(c, s("agentClass"), t.foaf("Agent"), l);
			for (let e = 0; e < a.length; e++) o.add(c, s("mode"), s(a[e]), l);
		}
		return bt(l, o, r);
	}
	return {
		findAclDocUrl: l,
		findEffectiveAcl: u,
		findAccessGrants: d,
		classifyContainerScope: f,
		isProtectedResource: p,
		roleFromModes: i,
		modesFromRole: a,
		publicRoleFromModes: o,
		modesFromPublicRole: s,
		planGrant: _,
		planGrantContainer: E,
		planGrantContainerAndContents: D,
		planGrantContainerContents: O,
		planRevokeContainerContents: ee,
		planRevoke: k,
		planPublicRead: A,
		resetToDefault: ne,
		applyPlan: re,
		classifyAccessControlSubject: ie,
		setACLUserPublic: ae,
		genACLText: M,
		Authenticated: Aa,
		Public: ka,
		PUBLIC_ACCESS_ROLES: No
	};
}
// node_modules/solid-logic/dist/authn/authUtil.esm.js
var Vo = () => {
	let { SolidAppContext: e } = window;
	if (e ||= {}, e.viewingNoAuthPage = !1, e.noAuth && window.document && window.document.location.href.startsWith(e.noAuth)) {
		e.viewingNoAuthPage = !0;
		let t = new URLSearchParams(window.document.location.search);
		if (t) {
			let n = e.viewedPage = t.get("uri") || null;
			if (n && (n = decodeURI(n), !n.startsWith(e.noAuth))) {
				let t = n.split(/\//);
				e.idp = t[0] + "//" + t[2], e.viewingNoAuthPage = !1;
			}
		}
	}
	return e;
};
function Ho() {
	let { $SolidTestEnvironment: e } = window;
	if (e !== void 0 && e.username) return oa("Assuming the user is " + e.username), Si(e.username);
	if (typeof document < "u" && document.location && ("" + document.location).slice(0, 16) === "http://localhost") {
		let e = document.getElementById("appTarget");
		if (!e) return null;
		let t = e.getAttribute("testID");
		return t ? (oa("Assuming user is " + t), Si(t)) : null;
	}
	return null;
}
// node_modules/solid-logic/dist/logic/CustomError.esm.js
var Uo = class extends Error {
	constructor(e) {
		super(e), Object.setPrototypeOf(this, new.target.prototype), this.name = new.target.name;
	}
}, Wo = class extends Uo {}, Go = class extends Uo {}, Ko = class extends Uo {}, qo = class extends Uo {}, Jo = class extends Uo {}, Yo = class extends Uo {
	constructor(e, t) {
		super(t), this.status = e;
	}
};
// node_modules/solid-logic/dist/util/utils.esm.js
function Xo(e) {
	return Si(e.uri + "#id" + ("" + Date.now()));
}
function Zo(e, t) {
	let n = t.getUTCFullYear(), r = ("0" + (t.getUTCMonth() + 1)).slice(-2), i = ("0" + t.getUTCDate()).slice(-2), a = e.split("/"), o = a[a.length - 1];
	return new URL(`./archive/${n}/${r}/${i}/${o}`, e).toString();
}
function Qo(e) {
	return !e || `${window.location.origin}/` !== new URL(e.value).origin;
}
function $o(e) {
	return Si(e.uri.replace("/profile/", "/").replace("/public/", "/").split("/").slice(0, -1).join("/") + "/settings/prefs.ttl");
}
function es(e, t) {
	return new R(new URL(`IndividualChats/${new URL(e.value).host}/`, t.value).toString());
}
// node_modules/solid-logic/dist/typeIndex/typeIndexDocuments.esm.js
function ts() {
	return "@prefix solid: <http://www.w3.org/ns/solid/terms#>.\n<>\n    a solid:TypeIndex ;\n    a solid:ListedDocument.";
}
function ns() {
	return "@prefix solid: <http://www.w3.org/ns/solid/terms#>.\n<>\n    a solid:TypeIndex ;\n    a solid:UnlistedDocument.";
}
// node_modules/solid-logic/dist/typeIndex/typeIndexLogic.esm.js
function rs(e, t, n, r) {
	let i = X;
	function a(e) {
		return !!e && (e.startsWith("https://") || e.startsWith("http://"));
	}
	function o(t, n) {
		return e.each(void 0, i.solid("instance"), t).filter((t) => e.holds(t, i.solid("forClass"), n));
	}
	async function s(t, a) {
		if (!t) throw Error("loadTypeIndexesFor: No user given");
		let o = await n.loadProfile(t), s = null;
		try {
			let n = e.any(t, i.solid("publicTypeIndex"), void 0, o);
			if (n) s = n;
			else if (a) {
				let e = null;
				try {
					e = h(t);
				} catch {
					sa(`User ${t} has no usable profile document directory for publicTypeIndex.`);
				}
				e && (s = await r.followOrCreateLinkWithContentOnCreate(t, i.solid("publicTypeIndex"), e, o, ts()));
			}
		} catch (e) {
			sa(`User ${t} has no pointer in profile to publicTypeIndex file: ${e}`);
		}
		let c = s ? [{
			label: "public",
			index: s,
			agent: t
		}] : [], l;
		try {
			l = await n.silencedLoadPreferences(t);
		} catch {
			l = null;
		}
		let u;
		if (l) {
			let n = null;
			if (a) try {
				n = g(l);
			} catch {
				sa(`User ${t} has no usable preferences document directory for privateTypeIndex.`);
			}
			let s = null;
			try {
				let c = e.any(t, i.solid("privateTypeIndex"), void 0, o);
				c ? s = c : a && n && (s = await r.followOrCreateLinkWithContentOnCreate(t, i.solid("privateTypeIndex"), n, l, ns()));
			} catch (e) {
				sa(`User ${t} has no pointer in preference file to privateTypeIndex file: ${e}`);
			}
			u = s ? [{
				label: "private",
				index: s,
				agent: t
			}] : [];
		} else u = [];
		let d = c.concat(u);
		if (d.length === 0) return d;
		let f = d.map((e) => e.index);
		try {
			await e.fetcher.load(f);
		} catch (e) {
			sa("Problems loading type index: ", e);
		}
		return d;
	}
	async function c(e) {
		return s(e, !0);
	}
	async function l(e) {
		return s(e, !1);
	}
	async function u(t) {
		let r;
		try {
			r = await n.silencedLoadPreferences(t);
		} catch {
			sa(`User ${t} has no pointer in profile to preferences file.`);
		}
		if (r) {
			let n = e.each(t, i.solid("community"), void 0, r).concat(e.each(t, i.solid("community"), void 0, t.doc())), o = [];
			for (let e of n) if (e.termType !== "NamedNode" || !a(e.uri)) sa(`Skipping malformed community node for ${t}: ${e}`);
			else try {
				o = o.concat(await c(e));
			} catch (t) {
				sa(`Skipping community type indexes for ${e.uri}: ${t}`);
			}
			return o;
		}
		return [];
	}
	async function d(e) {
		return (await c(e)).concat(await u(e));
	}
	async function f(e, t) {
		let n = await d(t), r = [];
		for (let t of n) {
			let n = await b(t, e);
			r = r.concat(n);
		}
		return r;
	}
	async function p(e) {
		let n = t.currentUser();
		if (!n) throw Error("getAppInstances: Must be logged in to find apps.");
		return (await f(e, n)).map((e) => e.instance);
	}
	function m(e) {
		let t = e.doc(), n = t.dir();
		if (n?.uri && a(n.uri)) return n.uri;
		let r = t.uri;
		if (!r || !a(r)) return oa(`docDirUri: missing or non-http(s) doc uri for ${e?.uri}`), null;
		let i = r.split("#")[0], o = i.lastIndexOf("/");
		return o === -1 ? (oa(`docDirUri: no slash in doc uri ${r}`), null) : i.slice(0, o + 1);
	}
	function h(e) {
		let t = m(e);
		if (!t) throw Error(`suggestPublicTypeIndex: Cannot derive directory for ${e.uri}`);
		return Si(t + "publicTypeIndex.ttl");
	}
	function g(e) {
		let t = m(e);
		if (!t) throw Error(`suggestPrivateTypeIndex: Cannot derive directory for ${e.uri}`);
		return Si(t + "privateTypeIndex.ttl");
	}
	async function _(t, n, r) {
		let a = Xo(n), o = [
			xi(a, i.rdf("type"), i.solid("TypeRegistration"), n),
			xi(a, i.solid("forClass"), r, n),
			xi(a, i.solid("instance"), t, n)
		];
		try {
			await e.updater.update([], o);
		} catch (e) {
			let r = `Unable to register ${t} in index ${n}: ${e}`;
			return console.warn(r), null;
		}
		return a;
	}
	async function v(t) {
		let n = e.the(null, i.solid("instance"), t.instance, t.scope.index);
		if (!n) throw Error(`deleteTypeIndexRegistration: No registration found for ${t.instance}`);
		let r = e.statementsMatching(n, null, null, t.scope.index);
		await e.updater.update(r, []);
	}
	async function y(t, n) {
		let r = (await l(n)).flatMap((n) => {
			let r = e.statementsMatching(null, i.solid("instance"), t, n.index).concat(e.statementsMatching(null, i.solid("instanceContainer"), t, n.index)).map((e) => e.subject);
			return [...new Map(r.map((e) => [e.value, e])).values()].flatMap((t) => {
				let r = e.statementsMatching(t, null, null, n.index);
				return r.length ? [{
					scope: n,
					statements: r
				}] : [];
			});
		});
		return await Promise.all(r.map(({ statements: t }) => e.updater.update(t, []))), r.length > 0;
	}
	async function b(t, n) {
		let r = t.index, a = [], o = e.statementsMatching(null, i.solid("instance"), null, r).concat(e.statementsMatching(null, i.solid("instanceContainer"), null, r)).map((e) => e.subject);
		for (let s of o) {
			let o = e.any(s, i.solid("forClass"), null, r);
			if (!n || o.sameTerm(n)) {
				let n = e.each(s, i.solid("instance"), null, r);
				for (let e of n) a.push({
					instance: e,
					type: o,
					scope: t
				});
				let c = e.each(s, i.solid("instanceContainer"), null, r);
				for (let n of c) await e.fetcher.load(n), a.push({
					instance: Si(n.value),
					type: o,
					scope: t
				});
			}
		}
		return a;
	}
	return {
		registerInTypeIndex: _,
		getRegistrations: o,
		loadTypeIndexesFor: c,
		loadCommunityTypeIndexes: u,
		loadAllTypeIndexes: d,
		getScopedAppInstances: f,
		getAppInstances: p,
		suggestPublicTypeIndex: h,
		suggestPrivateTypeIndex: g,
		deleteTypeIndexRegistration: v,
		deleteTypeIndexRegistrationForResource: y,
		getScopedAppsFromIndex: b
	};
}
// node_modules/solid-logic/dist/directory/directoryHelpers.esm.js
var is = [
	"contacts",
	"groups",
	"friends",
	"catalog"
];
function as(e) {
	return e.toLowerCase().trim().split(/\s+/).filter(Boolean);
}
function os(e, t) {
	let n = as(t);
	if (n.length === 0) return !0;
	let r = e.flatMap((e) => as(e)), i = e.join(" ").toLowerCase();
	return n.every((e) => r.some((t) => t.includes(e)) || i.includes(e));
}
function ss(e) {
	return Array.from(e).sort((e, t) => e.label.localeCompare(t.label, void 0, { sensitivity: "base" }));
}
function cs(e, t) {
	let n = ms(t), r = e.get(n);
	if (r) {
		let i = ls(r, t), a = fs(i.label, [...r.searchableLabels ?? [r.label], ...t.searchableLabels ?? [t.label]]), o = {
			...r,
			label: i.label,
			relationshipLabel: ps(r.relationshipLabel, t.relationshipLabel),
			sources: ds([...r.sources, ...t.sources]),
			searchableLabels: a
		};
		return e.set(n, o), o;
	}
	let i = {
		...t,
		sources: ds(t.sources),
		searchableLabels: t.searchableLabels ?? [t.label]
	};
	return e.set(n, i), i;
}
function ls(e, t) {
	return us(t) < us(e) ? t : e;
}
function us(e) {
	let t = e.sources.map((e) => is.indexOf(e));
	return t.length ? Math.min(...t) : is.length;
}
function ds(e) {
	return is.filter((t) => e.includes(t));
}
function fs(e, t) {
	return gs(t).sort((t, n) => t === e ? -1 : n === e ? 1 : t.localeCompare(n, void 0, { sensitivity: "base" }));
}
function ps(e, t) {
	return e === "Contact" || t === "Contact" ? "Contact" : e === "Friend" || t === "Friend" ? "Friend" : e === "Group" || t === "Group" ? "Group" : "People";
}
function ms(e) {
	return `${e.kind}:${e.uri}`;
}
function hs(e) {
	let t = /* @__PURE__ */ new Set();
	return e.filter((e) => !t.has(e.value) && (t.add(e.value), !0));
}
function gs(e) {
	return [...new Set(e)];
}
function _s(e) {
	return !!e && (e.startsWith("https://") || e.startsWith("http://"));
}
function vs(e) {
	let t = e.split("#")[0], n = e.includes("#") ? e.slice(e.indexOf("#") + 1) : "", r = n && n !== "this" && n !== "me" ? n : t.slice(t.lastIndexOf("/") + 1);
	return decodeURIComponent(r || e).replace(/[_-]+/g, " ");
}
function ys(e, t) {
	return e.anyValue(t, X.vcard("fn")) || e.anyValue(t, X.foaf("name")) || e.anyValue(t, X.schema("name")) || e.anyValue(t, X.rdfs("label")) || null;
}
function bs(e, t) {
	return ys(e, t) || vs(t.value);
}
async function xs(e, t) {
	try {
		return await e.fetcher.load(t.doc()), !0;
	} catch {
		return !1;
	}
}
// node_modules/solid-logic/dist/directory/contactsDirectory.esm.js
var Ss = 8;
function Cs(e, t) {
	let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
	async function i(e) {
		let r = n.get(e.value);
		if (r) return r;
		let i = (async () => {
			let n = await t.loadTypeIndexesFor(e), r = [];
			for (let e of n) {
				let n = await t.getScopedAppsFromIndex(e, X.vcard("AddressBook"));
				r = r.concat(n);
			}
			return hs(r.map((e) => e.instance));
		})().catch((t) => {
			throw n.delete(e.value), t;
		});
		return n.set(e.value, i), i;
	}
	async function a(t) {
		let n = r.get(t.value);
		if (n) return n;
		let i = (async () => {
			if (!await xs(e, t)) return null;
			let n = e.each(t, X.vcard("url"), null, t.doc());
			for (let e of n) {
				let n = o(e, t.doc());
				if (n) return n;
			}
			return null;
		})().catch((e) => {
			throw r.delete(t.value), e;
		});
		return r.set(t.value, i), i;
	}
	function o(t, n) {
		if (!e.holds(t, X.rdf("type"), X.vcard("WebID"), n)) return null;
		let r = e.any(t, X.vcard("value"), null, n)?.value || "";
		return _s(r) ? r : null;
	}
	async function s(t, n) {
		let r = await i(t);
		for (let t of r) if (await xs(e, t)) {
			let r = e.any(t, X.vcard("nameEmailIndex"), null, t.doc());
			if (r && await xs(e, r)) {
				let i = e.each(void 0, X.vcard("inAddressBook"), t, r);
				for (let t = 0; t < i.length; t += Ss) {
					let o = i.slice(t, t + Ss), s = await Promise.all(o.map(async (t) => {
						let n = await a(t);
						return n ? {
							kind: "person",
							uri: n,
							label: e.anyValue(t, X.vcard("fn"), null, r) || bs(e, t),
							subjectType: "agent",
							relationshipLabel: "Contact",
							sources: ["contacts"]
						} : null;
					}));
					for (let e of s.filter((e) => !!e)) await n(e);
				}
			}
		}
	}
	async function c(t, n) {
		let r = await i(t);
		for (let t of r) if (await xs(e, t)) {
			let r = e.any(t, X.vcard("groupIndex"), null, t.doc());
			if (r && await xs(e, r)) {
				let i = hs([...e.each(t, X.vcard("includesGroup"), null, r), ...e.each(t, X.vcard("includesGroup"), null, t.doc())]);
				for (let t of i) await xs(e, t), await n({
					kind: "group",
					uri: t.value,
					label: bs(e, t),
					subjectType: "agentGroup",
					relationshipLabel: "Group",
					sources: ["groups"]
				});
			}
		}
	}
	return {
		discoverAddressBookContacts: s,
		discoverAddressBookGroups: c
	};
}
// node_modules/solid-logic/dist/directory/friendsDirectory.esm.js
var ws = 6;
function Ts(e) {
	function t(e) {
		return e === 1 ? "Friend" : "People";
	}
	async function n(n, r, i) {
		let a = ys(e, n);
		a && await i({
			kind: "person",
			uri: n.value,
			label: a,
			subjectType: "agent",
			relationshipLabel: t(r),
			sources: ["friends"]
		});
	}
	async function r(t, r, i) {
		let a = /* @__PURE__ */ new Set([t.value]), o = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), c = [{
			person: t,
			depth: 0
		}], l = async (c) => {
			let { person: l, depth: u } = c, d = l.doc().value;
			if (s.has(d) || (s.add(d), await xs(e, l)), l.value !== t.value && (o.has(l.value) || (o.add(l.value), await n(l, u, i))), u >= r) return [];
			let f = [], p = e.each(l, X.foaf("knows"));
			for (let n of p) if (n.termType === "NamedNode") {
				let r = ys(e, n);
				n.value !== t.value && r && !o.has(n.value) && (o.add(n.value), await i({
					kind: "person",
					uri: n.value,
					label: r,
					subjectType: "agent",
					relationshipLabel: u === 0 ? "Friend" : "People",
					sources: ["friends"]
				})), a.has(n.value) || (a.add(n.value), f.push({
					person: n,
					depth: u + 1
				}));
			}
			return f;
		};
		for (; c.length > 0;) {
			let e = [];
			for (let t = 0; t < c.length; t += ws) {
				let n = c.slice(t, t + ws);
				(await Promise.all(n.map(l))).forEach((t) => e.push(...t));
			}
			c = e;
		}
	}
	return { discoverFoafPeople: r };
}
// node_modules/solid-logic/dist/directory/catalogDirectory.esm.js
var Es = "http://example.org#";
function Ds() {
	let e = /* @__PURE__ */ new Map();
	async function t(e, t) {
		let r = await n(e);
		for (let e of r) await t(e);
	}
	async function n(t) {
		let n = e.get(t);
		if (n) return n;
		let i = r(t).catch((n) => {
			throw e.delete(t), n;
		});
		e.set(t, i);
		try {
			return await i;
		} catch (e) {
			return sa("[Directory] Error fetching directory catalog:", e), [];
		}
	}
	async function r(e) {
		if (typeof fetch != "function") throw Error("Fetch API is unavailable");
		let t = await fetch(e, { headers: { accept: "text/turtle" } });
		if (!t.ok) throw Error(`Failed to fetch ${e}: ${t.status}`);
		let n = await t.text(), r = yi();
		Kr(n, r, e, "text/turtle");
		let i = new R(`${Es}Person`), a = new R(`${Es}webid`), o = new R(`${Es}name`), s = /* @__PURE__ */ new Map(), c = r.statementsMatching(void 0, X.rdf("type"), i);
		for (let e of c) {
			let t = e.subject, n = r.any(t, a);
			if (n && n.termType === "NamedNode") {
				let e = n.value, i = r.anyValue(t, o);
				_s(e) && i && s.set(e, {
					kind: "person",
					uri: e,
					label: i,
					subjectType: "agent",
					relationshipLabel: "People",
					sources: ["catalog"]
				});
			}
		}
		return Array.from(s.values());
	}
	return { discoverCatalogEntries: t };
}
// node_modules/solid-logic/dist/directory/directoryLogic.esm.js
var Os = 3, ks = [
	"contacts",
	"friends",
	"catalog",
	"groups"
];
function As(e, t, n) {
	let r = Cs(e, n), i = Ts(e), a = Ds();
	async function o(e) {
		let t = /* @__PURE__ */ new Map(), n = [], o = (e) => {
			cs(t, e);
		};
		if (e.sources.includes("catalog") && n.push(a.discoverCatalogEntries(e.catalogUrl, o)), e.user && (e.sources.includes("contacts") && n.push(r.discoverAddressBookContacts(e.user, o)), e.sources.includes("groups") && n.push(r.discoverAddressBookGroups(e.user, o)), e.sources.includes("friends") && n.push(i.discoverFoafPeople(e.user, e.maxFoafDistance, o))), !n.length) return [];
		if ((await Promise.allSettled(n)).every((e) => e.status === "rejected")) throw Error("Unable to load directory entries.");
		return ss(t.values());
	}
	async function s(e = {}) {
		let t = c(e);
		return (await o(t)).filter((e) => os([e.label, ...e.searchableLabels ?? []], t.query));
	}
	return { search: s };
	function c(e = {}) {
		let n = e.sources === void 0 ? [...ks] : [...e.sources];
		return {
			query: e.query ?? "",
			sources: n,
			catalogUrl: e.catalogUrl ?? "https://raw.githubusercontent.com/solid/catalog/refs/heads/main/catalog-data.ttl",
			user: e.user ?? t.currentUser(),
			maxFoafDistance: e.maxFoafDistance ?? Os
		};
	}
}
// node_modules/@uvdsl/solid-oidc-client-browser/dist/esm/web/index.js
var js = crypto, Ms = (e) => e instanceof CryptoKey, Ns = async (e, t) => {
	let n = `SHA-${e.slice(-3)}`;
	return new Uint8Array(await js.subtle.digest(n, t));
}, Ps = new TextEncoder(), Fs = new TextDecoder();
function Is(...e) {
	let t = e.reduce((e, { length: t }) => e + t, 0), n = new Uint8Array(t), r = 0;
	for (let t of e) n.set(t, r), r += t.length;
	return n;
}
var Ls = (e) => {
	let t = e;
	typeof t == "string" && (t = Ps.encode(t));
	let n = 32768, r = [];
	for (let e = 0; e < t.length; e += n) r.push(String.fromCharCode.apply(null, t.subarray(e, e + n)));
	return btoa(r.join(""));
}, Rs = (e) => Ls(e).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"), zs = (e) => {
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
	return n;
}, Bs = (e) => {
	let t = e;
	t instanceof Uint8Array && (t = Fs.decode(t)), t = t.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
	try {
		return zs(t);
	} catch {
		throw TypeError("The input to be decoded is not correctly encoded.");
	}
}, Vs = class extends Error {
	constructor(e, t) {
		super(e, t), this.code = "ERR_JOSE_GENERIC", this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
	}
};
Vs.code = "ERR_JOSE_GENERIC";
var Hs = class extends Vs {
	constructor(e, t, n = "unspecified", r = "unspecified") {
		super(e, { cause: {
			claim: n,
			reason: r,
			payload: t
		} }), this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED", this.claim = n, this.reason = r, this.payload = t;
	}
};
Hs.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
var Us = class extends Vs {
	constructor(e, t, n = "unspecified", r = "unspecified") {
		super(e, { cause: {
			claim: n,
			reason: r,
			payload: t
		} }), this.code = "ERR_JWT_EXPIRED", this.claim = n, this.reason = r, this.payload = t;
	}
};
Us.code = "ERR_JWT_EXPIRED";
var Ws = class extends Vs {
	constructor() {
		super(...arguments), this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
	}
};
Ws.code = "ERR_JOSE_ALG_NOT_ALLOWED";
var Gs = class extends Vs {
	constructor() {
		super(...arguments), this.code = "ERR_JOSE_NOT_SUPPORTED";
	}
};
Gs.code = "ERR_JOSE_NOT_SUPPORTED";
var Ks = class extends Vs {
	constructor(e = "decryption operation failed", t) {
		super(e, t), this.code = "ERR_JWE_DECRYPTION_FAILED";
	}
};
Ks.code = "ERR_JWE_DECRYPTION_FAILED";
var qs = class extends Vs {
	constructor() {
		super(...arguments), this.code = "ERR_JWE_INVALID";
	}
};
qs.code = "ERR_JWE_INVALID";
var Js = class extends Vs {
	constructor() {
		super(...arguments), this.code = "ERR_JWS_INVALID";
	}
};
Js.code = "ERR_JWS_INVALID";
var Ys = class extends Vs {
	constructor() {
		super(...arguments), this.code = "ERR_JWT_INVALID";
	}
};
Ys.code = "ERR_JWT_INVALID";
var Xs = class extends Vs {
	constructor() {
		super(...arguments), this.code = "ERR_JWK_INVALID";
	}
};
Xs.code = "ERR_JWK_INVALID";
var Zs = class extends Vs {
	constructor() {
		super(...arguments), this.code = "ERR_JWKS_INVALID";
	}
};
Zs.code = "ERR_JWKS_INVALID";
var Qs = class extends Vs {
	constructor(e = "no applicable key found in the JSON Web Key Set", t) {
		super(e, t), this.code = "ERR_JWKS_NO_MATCHING_KEY";
	}
};
Qs.code = "ERR_JWKS_NO_MATCHING_KEY";
var $s = class extends Vs {
	constructor(e = "multiple matching keys found in the JSON Web Key Set", t) {
		super(e, t), this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
	}
};
$s.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
var ec = class extends Vs {
	constructor(e = "request timed out", t) {
		super(e, t), this.code = "ERR_JWKS_TIMEOUT";
	}
};
ec.code = "ERR_JWKS_TIMEOUT";
var tc = class extends Vs {
	constructor(e = "signature verification failed", t) {
		super(e, t), this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
	}
};
tc.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
function nc(e, t = "algorithm.name") {
	return /* @__PURE__ */ TypeError(`CryptoKey does not support this operation, its ${t} must be ${e}`);
}
function rc(e, t) {
	return e.name === t;
}
function ic(e) {
	return parseInt(e.name.slice(4), 10);
}
function ac(e) {
	switch (e) {
		case "ES256": return "P-256";
		case "ES384": return "P-384";
		case "ES512": return "P-521";
		default: throw Error("unreachable");
	}
}
function oc(e, t) {
	if (t.length && !t.some((t) => e.usages.includes(t))) {
		let e = "CryptoKey does not support this operation, its usages must include ";
		if (t.length > 2) {
			let n = t.pop();
			e += `one of ${t.join(", ")}, or ${n}.`;
		} else t.length === 2 ? e += `one of ${t[0]} or ${t[1]}.` : e += `${t[0]}.`;
		throw TypeError(e);
	}
}
function sc(e, t, ...n) {
	switch (t) {
		case "HS256":
		case "HS384":
		case "HS512": {
			if (!rc(e.algorithm, "HMAC")) throw nc("HMAC");
			let n = parseInt(t.slice(2), 10);
			if (ic(e.algorithm.hash) !== n) throw nc(`SHA-${n}`, "algorithm.hash");
			break;
		}
		case "RS256":
		case "RS384":
		case "RS512": {
			if (!rc(e.algorithm, "RSASSA-PKCS1-v1_5")) throw nc("RSASSA-PKCS1-v1_5");
			let n = parseInt(t.slice(2), 10);
			if (ic(e.algorithm.hash) !== n) throw nc(`SHA-${n}`, "algorithm.hash");
			break;
		}
		case "PS256":
		case "PS384":
		case "PS512": {
			if (!rc(e.algorithm, "RSA-PSS")) throw nc("RSA-PSS");
			let n = parseInt(t.slice(2), 10);
			if (ic(e.algorithm.hash) !== n) throw nc(`SHA-${n}`, "algorithm.hash");
			break;
		}
		case "EdDSA":
			if (e.algorithm.name !== "Ed25519" && e.algorithm.name !== "Ed448") throw nc("Ed25519 or Ed448");
			break;
		case "Ed25519":
			if (!rc(e.algorithm, "Ed25519")) throw nc("Ed25519");
			break;
		case "ES256":
		case "ES384":
		case "ES512": {
			if (!rc(e.algorithm, "ECDSA")) throw nc("ECDSA");
			let n = ac(t);
			if (e.algorithm.namedCurve !== n) throw nc(n, "algorithm.namedCurve");
			break;
		}
		default: throw TypeError("CryptoKey does not support this operation");
	}
	oc(e, n);
}
function cc(e, t, ...n) {
	if (n = n.filter(Boolean), n.length > 2) {
		let t = n.pop();
		e += `one of type ${n.join(", ")}, or ${t}.`;
	} else n.length === 2 ? e += `one of type ${n[0]} or ${n[1]}.` : e += `of type ${n[0]}.`;
	return t == null ? e += ` Received ${t}` : typeof t == "function" && t.name ? e += ` Received function ${t.name}` : typeof t == "object" && t && t.constructor?.name && (e += ` Received an instance of ${t.constructor.name}`), e;
}
var lc = (e, ...t) => cc("Key must be ", e, ...t);
function uc(e, t, ...n) {
	return cc(`Key for the ${e} algorithm must be `, t, ...n);
}
var dc = (e) => Ms(e) ? !0 : e?.[Symbol.toStringTag] === "KeyObject", fc = ["CryptoKey"], pc = (...e) => {
	let t = e.filter(Boolean);
	if (t.length === 0 || t.length === 1) return !0;
	let n;
	for (let e of t) {
		let t = Object.keys(e);
		if (!n || n.size === 0) n = new Set(t);
		else for (let e of t) {
			if (n.has(e)) return !1;
			n.add(e);
		}
	}
	return !0;
};
function mc(e) {
	return typeof e == "object" && !!e;
}
function hc(e) {
	if (!mc(e) || Object.prototype.toString.call(e) !== "[object Object]") return !1;
	if (Object.getPrototypeOf(e) === null) return !0;
	let t = e;
	for (; Object.getPrototypeOf(t) !== null;) t = Object.getPrototypeOf(t);
	return Object.getPrototypeOf(e) === t;
}
var gc = (e, t) => {
	if (e.startsWith("RS") || e.startsWith("PS")) {
		let { modulusLength: n } = t.algorithm;
		if (typeof n != "number" || n < 2048) throw TypeError(`${e} requires key modulusLength to be 2048 bits or larger`);
	}
};
function _c(e) {
	return hc(e) && typeof e.kty == "string";
}
function vc(e) {
	return e.kty !== "oct" && typeof e.d == "string";
}
function yc(e) {
	return e.kty !== "oct" && e.d === void 0;
}
function bc(e) {
	return _c(e) && e.kty === "oct" && typeof e.k == "string";
}
function xc(e) {
	let t, n;
	switch (e.kty) {
		case "RSA":
			switch (e.alg) {
				case "PS256":
				case "PS384":
				case "PS512":
					t = {
						name: "RSA-PSS",
						hash: `SHA-${e.alg.slice(-3)}`
					}, n = e.d ? ["sign"] : ["verify"];
					break;
				case "RS256":
				case "RS384":
				case "RS512":
					t = {
						name: "RSASSA-PKCS1-v1_5",
						hash: `SHA-${e.alg.slice(-3)}`
					}, n = e.d ? ["sign"] : ["verify"];
					break;
				case "RSA-OAEP":
				case "RSA-OAEP-256":
				case "RSA-OAEP-384":
				case "RSA-OAEP-512":
					t = {
						name: "RSA-OAEP",
						hash: `SHA-${parseInt(e.alg.slice(-3), 10) || 1}`
					}, n = e.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
					break;
				default: throw new Gs("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			}
			break;
		case "EC":
			switch (e.alg) {
				case "ES256":
					t = {
						name: "ECDSA",
						namedCurve: "P-256"
					}, n = e.d ? ["sign"] : ["verify"];
					break;
				case "ES384":
					t = {
						name: "ECDSA",
						namedCurve: "P-384"
					}, n = e.d ? ["sign"] : ["verify"];
					break;
				case "ES512":
					t = {
						name: "ECDSA",
						namedCurve: "P-521"
					}, n = e.d ? ["sign"] : ["verify"];
					break;
				case "ECDH-ES":
				case "ECDH-ES+A128KW":
				case "ECDH-ES+A192KW":
				case "ECDH-ES+A256KW":
					t = {
						name: "ECDH",
						namedCurve: e.crv
					}, n = e.d ? ["deriveBits"] : [];
					break;
				default: throw new Gs("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			}
			break;
		case "OKP":
			switch (e.alg) {
				case "Ed25519":
					t = { name: "Ed25519" }, n = e.d ? ["sign"] : ["verify"];
					break;
				case "EdDSA":
					t = { name: e.crv }, n = e.d ? ["sign"] : ["verify"];
					break;
				case "ECDH-ES":
				case "ECDH-ES+A128KW":
				case "ECDH-ES+A192KW":
				case "ECDH-ES+A256KW":
					t = { name: e.crv }, n = e.d ? ["deriveBits"] : [];
					break;
				default: throw new Gs("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			}
			break;
		default: throw new Gs("Invalid or unsupported JWK \"kty\" (Key Type) Parameter value");
	}
	return {
		algorithm: t,
		keyUsages: n
	};
}
var Sc = async (e) => {
	if (!e.alg) throw TypeError("\"alg\" argument is required when \"jwk.alg\" is not present");
	let { algorithm: t, keyUsages: n } = xc(e), r = [
		t,
		e.ext ?? !1,
		e.key_ops ?? n
	], i = { ...e };
	return delete i.alg, delete i.use, js.subtle.importKey("jwk", i, ...r);
}, Cc = (e) => Bs(e), wc, Tc, Ec = (e) => e?.[Symbol.toStringTag] === "KeyObject", Dc = async (e, t, n, r, i = !1) => {
	let a = e.get(t);
	if (a?.[r]) return a[r];
	let o = await Sc({
		...n,
		alg: r
	});
	return i && Object.freeze(t), a ? a[r] = o : e.set(t, { [r]: o }), o;
}, Oc = {
	normalizePublicKey: (e, t) => {
		if (Ec(e)) {
			let n = e.export({ format: "jwk" });
			return delete n.d, delete n.dp, delete n.dq, delete n.p, delete n.q, delete n.qi, n.k ? Cc(n.k) : (Tc ||= /* @__PURE__ */ new WeakMap(), Dc(Tc, e, n, t));
		}
		return _c(e) ? e.k ? Bs(e.k) : (Tc ||= /* @__PURE__ */ new WeakMap(), Dc(Tc, e, e, t, !0)) : e;
	},
	normalizePrivateKey: (e, t) => {
		if (Ec(e)) {
			let n = e.export({ format: "jwk" });
			return n.k ? Cc(n.k) : (wc ||= /* @__PURE__ */ new WeakMap(), Dc(wc, e, n, t));
		}
		return _c(e) ? e.k ? Bs(e.k) : (wc ||= /* @__PURE__ */ new WeakMap(), Dc(wc, e, e, t, !0)) : e;
	}
};
async function kc(e, t) {
	if (!hc(e)) throw TypeError("JWK must be an object");
	switch (t ||= e.alg, e.kty) {
		case "oct":
			if (typeof e.k != "string" || !e.k) throw TypeError("missing \"k\" (Key Value) Parameter value");
			return Bs(e.k);
		case "RSA": if ("oth" in e && e.oth !== void 0) throw new Gs("RSA JWK \"oth\" (Other Primes Info) Parameter value is not supported");
		case "EC":
		case "OKP": return Sc({
			...e,
			alg: t
		});
		default: throw new Gs("Unsupported \"kty\" (Key Type) Parameter value");
	}
}
var Ac = (e) => e?.[Symbol.toStringTag], jc = (e, t, n) => {
	if (t.use !== void 0 && t.use !== "sig") throw TypeError("Invalid key for this operation, when present its use must be sig");
	if (t.key_ops !== void 0 && t.key_ops.includes?.(n) !== !0) throw TypeError(`Invalid key for this operation, when present its key_ops must include ${n}`);
	if (t.alg !== void 0 && t.alg !== e) throw TypeError(`Invalid key for this operation, when present its alg must be ${e}`);
	return !0;
}, Mc = (e, t, n, r) => {
	if (!(t instanceof Uint8Array)) {
		if (r && _c(t)) {
			if (bc(t) && jc(e, t, n)) return;
			throw TypeError("JSON Web Key for symmetric algorithms must have JWK \"kty\" (Key Type) equal to \"oct\" and the JWK \"k\" (Key Value) present");
		}
		if (!dc(t)) throw TypeError(uc(e, t, ...fc, "Uint8Array", r ? "JSON Web Key" : null));
		if (t.type !== "secret") throw TypeError(`${Ac(t)} instances for symmetric algorithms must be of type "secret"`);
	}
}, Nc = (e, t, n, r) => {
	if (r && _c(t)) switch (n) {
		case "sign":
			if (vc(t) && jc(e, t, n)) return;
			throw TypeError("JSON Web Key for this operation be a private JWK");
		case "verify":
			if (yc(t) && jc(e, t, n)) return;
			throw TypeError("JSON Web Key for this operation be a public JWK");
	}
	if (!dc(t)) throw TypeError(uc(e, t, ...fc, r ? "JSON Web Key" : null));
	if (t.type === "secret") throw TypeError(`${Ac(t)} instances for asymmetric algorithms must not be of type "secret"`);
	if (n === "sign" && t.type === "public") throw TypeError(`${Ac(t)} instances for asymmetric algorithm signing must be of type "private"`);
	if (n === "decrypt" && t.type === "public") throw TypeError(`${Ac(t)} instances for asymmetric algorithm decryption must be of type "private"`);
	if (t.algorithm && n === "verify" && t.type === "private") throw TypeError(`${Ac(t)} instances for asymmetric algorithm verifying must be of type "public"`);
	if (t.algorithm && n === "encrypt" && t.type === "private") throw TypeError(`${Ac(t)} instances for asymmetric algorithm encryption must be of type "public"`);
};
function Pc(e, t, n, r) {
	t.startsWith("HS") || t === "dir" || t.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(t) ? Mc(t, n, r, e) : Nc(t, n, r, e);
}
Pc.bind(void 0, !1);
var Fc = Pc.bind(void 0, !0);
function Ic(e, t, n, r, i) {
	if (i.crit !== void 0 && r?.crit === void 0) throw new e("\"crit\" (Critical) Header Parameter MUST be integrity protected");
	if (!r || r.crit === void 0) return /* @__PURE__ */ new Set();
	if (!Array.isArray(r.crit) || r.crit.length === 0 || r.crit.some((e) => typeof e != "string" || e.length === 0)) throw new e("\"crit\" (Critical) Header Parameter MUST be an array of non-empty strings when present");
	let a;
	a = n === void 0 ? t : new Map([...Object.entries(n), ...t.entries()]);
	for (let t of r.crit) {
		if (!a.has(t)) throw new Gs(`Extension Header Parameter "${t}" is not recognized`);
		if (i[t] === void 0) throw new e(`Extension Header Parameter "${t}" is missing`);
		if (a.get(t) && r[t] === void 0) throw new e(`Extension Header Parameter "${t}" MUST be integrity protected`);
	}
	return new Set(r.crit);
}
var Lc = (e, t) => {
	if (t !== void 0 && (!Array.isArray(t) || t.some((e) => typeof e != "string"))) throw TypeError(`"${e}" option must be an array of strings`);
	if (t) return new Set(t);
}, Rc = async (e) => {
	if (e instanceof Uint8Array) return {
		kty: "oct",
		k: Rs(e)
	};
	if (!Ms(e)) throw TypeError(lc(e, ...fc, "Uint8Array"));
	if (!e.extractable) throw TypeError("non-extractable CryptoKey cannot be exported as a JWK");
	let { ext: t, key_ops: n, alg: r, use: i, ...a } = await js.subtle.exportKey("jwk", e);
	return a;
};
async function zc(e) {
	return Rc(e);
}
function Bc(e, t) {
	let n = `SHA-${e.slice(-3)}`;
	switch (e) {
		case "HS256":
		case "HS384":
		case "HS512": return {
			hash: n,
			name: "HMAC"
		};
		case "PS256":
		case "PS384":
		case "PS512": return {
			hash: n,
			name: "RSA-PSS",
			saltLength: e.slice(-3) >> 3
		};
		case "RS256":
		case "RS384":
		case "RS512": return {
			hash: n,
			name: "RSASSA-PKCS1-v1_5"
		};
		case "ES256":
		case "ES384":
		case "ES512": return {
			hash: n,
			name: "ECDSA",
			namedCurve: t.namedCurve
		};
		case "Ed25519": return { name: "Ed25519" };
		case "EdDSA": return { name: t.name };
		default: throw new Gs(`alg ${e} is not supported either by JOSE or your javascript runtime`);
	}
}
async function Vc(e, t, n) {
	if (n === "sign" && (t = await Oc.normalizePrivateKey(t, e)), n === "verify" && (t = await Oc.normalizePublicKey(t, e)), Ms(t)) return sc(t, e, n), t;
	if (t instanceof Uint8Array) {
		if (!e.startsWith("HS")) throw TypeError(lc(t, ...fc));
		return js.subtle.importKey("raw", t, {
			hash: `SHA-${e.slice(-3)}`,
			name: "HMAC"
		}, !1, [n]);
	}
	throw TypeError(lc(t, ...fc, "Uint8Array", "JSON Web Key"));
}
var Hc = async (e, t, n, r) => {
	let i = await Vc(e, t, "verify");
	gc(e, i);
	let a = Bc(e, i.algorithm);
	try {
		return await js.subtle.verify(a, i, n, r);
	} catch {
		return !1;
	}
};
async function Uc(e, t, n) {
	if (!hc(e)) throw new Js("Flattened JWS must be an object");
	if (e.protected === void 0 && e.header === void 0) throw new Js("Flattened JWS must have either of the \"protected\" or \"header\" members");
	if (e.protected !== void 0 && typeof e.protected != "string") throw new Js("JWS Protected Header incorrect type");
	if (e.payload === void 0) throw new Js("JWS Payload missing");
	if (typeof e.signature != "string") throw new Js("JWS Signature missing or incorrect type");
	if (e.header !== void 0 && !hc(e.header)) throw new Js("JWS Unprotected Header incorrect type");
	let r = {};
	if (e.protected) try {
		let t = Bs(e.protected);
		r = JSON.parse(Fs.decode(t));
	} catch {
		throw new Js("JWS Protected Header is invalid");
	}
	if (!pc(r, e.header)) throw new Js("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
	let i = {
		...r,
		...e.header
	}, a = Ic(Js, /* @__PURE__ */ new Map([["b64", !0]]), n?.crit, r, i), o = !0;
	if (a.has("b64") && (o = r.b64, typeof o != "boolean")) throw new Js("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
	let { alg: s } = i;
	if (typeof s != "string" || !s) throw new Js("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
	let c = n && Lc("algorithms", n.algorithms);
	if (c && !c.has(s)) throw new Ws("\"alg\" (Algorithm) Header Parameter value not allowed");
	if (o) {
		if (typeof e.payload != "string") throw new Js("JWS Payload must be a string");
	} else if (typeof e.payload != "string" && !(e.payload instanceof Uint8Array)) throw new Js("JWS Payload must be a string or an Uint8Array instance");
	let l = !1;
	typeof t == "function" ? (t = await t(r, e), l = !0, Fc(s, t, "verify"), _c(t) && (t = await kc(t, s))) : Fc(s, t, "verify");
	let u = Is(Ps.encode(e.protected ?? ""), Ps.encode("."), typeof e.payload == "string" ? Ps.encode(e.payload) : e.payload), d;
	try {
		d = Bs(e.signature);
	} catch {
		throw new Js("Failed to base64url decode the signature");
	}
	if (!await Hc(s, t, d, u)) throw new tc();
	let f;
	if (o) try {
		f = Bs(e.payload);
	} catch {
		throw new Js("Failed to base64url decode the payload");
	}
	else f = typeof e.payload == "string" ? Ps.encode(e.payload) : e.payload;
	let p = { payload: f };
	return e.protected !== void 0 && (p.protectedHeader = r), e.header !== void 0 && (p.unprotectedHeader = e.header), l ? {
		...p,
		key: t
	} : p;
}
async function Wc(e, t, n) {
	if (e instanceof Uint8Array && (e = Fs.decode(e)), typeof e != "string") throw new Js("Compact JWS must be a string or Uint8Array");
	let { 0: r, 1: i, 2: a, length: o } = e.split(".");
	if (o !== 3) throw new Js("Invalid Compact JWS");
	let s = await Uc({
		payload: i,
		protected: r,
		signature: a
	}, t, n), c = {
		payload: s.payload,
		protectedHeader: s.protectedHeader
	};
	return typeof t == "function" ? {
		...c,
		key: s.key
	} : c;
}
var Gc = (e) => Math.floor(e.getTime() / 1e3), Kc = 60, qc = 3600, Jc = qc * 24, Yc = Jc * 7, Xc = Jc * 365.25, Zc = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, Qc = (e) => {
	let t = Zc.exec(e);
	if (!t || t[4] && t[1]) throw TypeError("Invalid time period format");
	let n = parseFloat(t[2]), r = t[3].toLowerCase(), i;
	switch (r) {
		case "sec":
		case "secs":
		case "second":
		case "seconds":
		case "s":
			i = Math.round(n);
			break;
		case "minute":
		case "minutes":
		case "min":
		case "mins":
		case "m":
			i = Math.round(n * Kc);
			break;
		case "hour":
		case "hours":
		case "hr":
		case "hrs":
		case "h":
			i = Math.round(n * qc);
			break;
		case "day":
		case "days":
		case "d":
			i = Math.round(n * Jc);
			break;
		case "week":
		case "weeks":
		case "w":
			i = Math.round(n * Yc);
			break;
		default: i = Math.round(n * Xc);
	}
	return t[1] === "-" || t[4] === "ago" ? -i : i;
}, $c = (e) => e.toLowerCase().replace(/^application\//, ""), el = (e, t) => typeof e == "string" ? t.includes(e) : Array.isArray(e) ? t.some(Set.prototype.has.bind(new Set(e))) : !1, tl = (e, t, n = {}) => {
	let r;
	try {
		r = JSON.parse(Fs.decode(t));
	} catch {}
	if (!hc(r)) throw new Ys("JWT Claims Set must be a top-level JSON object");
	let { typ: i } = n;
	if (i && (typeof e.typ != "string" || $c(e.typ) !== $c(i))) throw new Hs("unexpected \"typ\" JWT header value", r, "typ", "check_failed");
	let { requiredClaims: a = [], issuer: o, subject: s, audience: c, maxTokenAge: l } = n, u = [...a];
	l !== void 0 && u.push("iat"), c !== void 0 && u.push("aud"), s !== void 0 && u.push("sub"), o !== void 0 && u.push("iss");
	for (let e of new Set(u.reverse())) if (!(e in r)) throw new Hs(`missing required "${e}" claim`, r, e, "missing");
	if (o && !(Array.isArray(o) ? o : [o]).includes(r.iss)) throw new Hs("unexpected \"iss\" claim value", r, "iss", "check_failed");
	if (s && r.sub !== s) throw new Hs("unexpected \"sub\" claim value", r, "sub", "check_failed");
	if (c && !el(r.aud, typeof c == "string" ? [c] : c)) throw new Hs("unexpected \"aud\" claim value", r, "aud", "check_failed");
	let d;
	switch (typeof n.clockTolerance) {
		case "string":
			d = Qc(n.clockTolerance);
			break;
		case "number":
			d = n.clockTolerance;
			break;
		case "undefined":
			d = 0;
			break;
		default: throw TypeError("Invalid clockTolerance option type");
	}
	let { currentDate: f } = n, p = Gc(f || /* @__PURE__ */ new Date());
	if ((r.iat !== void 0 || l) && typeof r.iat != "number") throw new Hs("\"iat\" claim must be a number", r, "iat", "invalid");
	if (r.nbf !== void 0) {
		if (typeof r.nbf != "number") throw new Hs("\"nbf\" claim must be a number", r, "nbf", "invalid");
		if (r.nbf > p + d) throw new Hs("\"nbf\" claim timestamp check failed", r, "nbf", "check_failed");
	}
	if (r.exp !== void 0) {
		if (typeof r.exp != "number") throw new Hs("\"exp\" claim must be a number", r, "exp", "invalid");
		if (r.exp <= p - d) throw new Us("\"exp\" claim timestamp check failed", r, "exp", "check_failed");
	}
	if (l) {
		let e = p - r.iat, t = typeof l == "number" ? l : Qc(l);
		if (e - d > t) throw new Us("\"iat\" claim timestamp check failed (too far in the past)", r, "iat", "check_failed");
		if (e < 0 - d) throw new Hs("\"iat\" claim timestamp check failed (it should be in the past)", r, "iat", "check_failed");
	}
	return r;
};
async function nl(e, t, n) {
	let r = await Wc(e, t, n);
	if (r.protectedHeader.crit?.includes("b64") && r.protectedHeader.b64 === !1) throw new Ys("JWTs MUST NOT use unencoded payload");
	let i = {
		payload: tl(r.protectedHeader, r.payload, n),
		protectedHeader: r.protectedHeader
	};
	return typeof t == "function" ? {
		...i,
		key: r.key
	} : i;
}
var rl = async (e, t, n) => {
	let r = await Vc(e, t, "sign");
	gc(e, r);
	let i = await js.subtle.sign(Bc(e, r.algorithm), r, n);
	return new Uint8Array(i);
}, il = class {
	constructor(e) {
		if (!(e instanceof Uint8Array)) throw TypeError("payload must be an instance of Uint8Array");
		this._payload = e;
	}
	setProtectedHeader(e) {
		if (this._protectedHeader) throw TypeError("setProtectedHeader can only be called once");
		return this._protectedHeader = e, this;
	}
	setUnprotectedHeader(e) {
		if (this._unprotectedHeader) throw TypeError("setUnprotectedHeader can only be called once");
		return this._unprotectedHeader = e, this;
	}
	async sign(e, t) {
		if (!this._protectedHeader && !this._unprotectedHeader) throw new Js("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
		if (!pc(this._protectedHeader, this._unprotectedHeader)) throw new Js("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
		let n = {
			...this._protectedHeader,
			...this._unprotectedHeader
		}, r = Ic(Js, /* @__PURE__ */ new Map([["b64", !0]]), t?.crit, this._protectedHeader, n), i = !0;
		if (r.has("b64") && (i = this._protectedHeader.b64, typeof i != "boolean")) throw new Js("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
		let { alg: a } = n;
		if (typeof a != "string" || !a) throw new Js("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
		Fc(a, e, "sign");
		let o = this._payload;
		i && (o = Ps.encode(Rs(o)));
		let s;
		s = this._protectedHeader ? Ps.encode(Rs(JSON.stringify(this._protectedHeader))) : Ps.encode("");
		let c = {
			signature: Rs(await rl(a, e, Is(s, Ps.encode("."), o))),
			payload: ""
		};
		return i && (c.payload = Fs.decode(o)), this._unprotectedHeader && (c.header = this._unprotectedHeader), this._protectedHeader && (c.protected = Fs.decode(s)), c;
	}
}, al = class {
	constructor(e) {
		this._flattened = new il(e);
	}
	setProtectedHeader(e) {
		return this._flattened.setProtectedHeader(e), this;
	}
	async sign(e, t) {
		let n = await this._flattened.sign(e, t);
		if (n.payload === void 0) throw TypeError("use the flattened module for creating JWS with b64: false");
		return `${n.protected}.${n.payload}.${n.signature}`;
	}
};
function ol(e, t) {
	if (!Number.isFinite(t)) throw TypeError(`Invalid ${e} input`);
	return t;
}
var sl = class {
	constructor(e = {}) {
		if (!hc(e)) throw TypeError("JWT Claims Set MUST be an object");
		this._payload = e;
	}
	setIssuer(e) {
		return this._payload = {
			...this._payload,
			iss: e
		}, this;
	}
	setSubject(e) {
		return this._payload = {
			...this._payload,
			sub: e
		}, this;
	}
	setAudience(e) {
		return this._payload = {
			...this._payload,
			aud: e
		}, this;
	}
	setJti(e) {
		return this._payload = {
			...this._payload,
			jti: e
		}, this;
	}
	setNotBefore(e) {
		return this._payload = typeof e == "number" ? {
			...this._payload,
			nbf: ol("setNotBefore", e)
		} : e instanceof Date ? {
			...this._payload,
			nbf: ol("setNotBefore", Gc(e))
		} : {
			...this._payload,
			nbf: Gc(/* @__PURE__ */ new Date()) + Qc(e)
		}, this;
	}
	setExpirationTime(e) {
		return this._payload = typeof e == "number" ? {
			...this._payload,
			exp: ol("setExpirationTime", e)
		} : e instanceof Date ? {
			...this._payload,
			exp: ol("setExpirationTime", Gc(e))
		} : {
			...this._payload,
			exp: Gc(/* @__PURE__ */ new Date()) + Qc(e)
		}, this;
	}
	setIssuedAt(e) {
		return this._payload = e === void 0 ? {
			...this._payload,
			iat: Gc(/* @__PURE__ */ new Date())
		} : e instanceof Date ? {
			...this._payload,
			iat: ol("setIssuedAt", Gc(e))
		} : typeof e == "string" ? {
			...this._payload,
			iat: ol("setIssuedAt", Gc(/* @__PURE__ */ new Date()) + Qc(e))
		} : {
			...this._payload,
			iat: ol("setIssuedAt", e)
		}, this;
	}
}, cl = class extends sl {
	setProtectedHeader(e) {
		return this._protectedHeader = e, this;
	}
	async sign(e, t) {
		let n = new al(Ps.encode(JSON.stringify(this._payload)));
		if (n.setProtectedHeader(this._protectedHeader), Array.isArray(this._protectedHeader?.crit) && this._protectedHeader.crit.includes("b64") && this._protectedHeader.b64 === !1) throw new Ys("JWTs MUST NOT use unencoded payload");
		return n.sign(e, t);
	}
}, ll = (e, t) => {
	if (typeof e != "string" || !e) throw new Xs(`${t} missing or invalid`);
};
async function ul(e, t) {
	if (!hc(e)) throw TypeError("JWK must be an object");
	if (t ??= "sha256", t !== "sha256" && t !== "sha384" && t !== "sha512") throw TypeError("digestAlgorithm must one of \"sha256\", \"sha384\", or \"sha512\"");
	let n;
	switch (e.kty) {
		case "EC":
			ll(e.crv, "\"crv\" (Curve) Parameter"), ll(e.x, "\"x\" (X Coordinate) Parameter"), ll(e.y, "\"y\" (Y Coordinate) Parameter"), n = {
				crv: e.crv,
				kty: e.kty,
				x: e.x,
				y: e.y
			};
			break;
		case "OKP":
			ll(e.crv, "\"crv\" (Subtype of Key Pair) Parameter"), ll(e.x, "\"x\" (Public Key) Parameter"), n = {
				crv: e.crv,
				kty: e.kty,
				x: e.x
			};
			break;
		case "RSA":
			ll(e.e, "\"e\" (Exponent) Parameter"), ll(e.n, "\"n\" (Modulus) Parameter"), n = {
				e: e.e,
				kty: e.kty,
				n: e.n
			};
			break;
		case "oct":
			ll(e.k, "\"k\" (Key Value) Parameter"), n = {
				k: e.k,
				kty: e.kty
			};
			break;
		default: throw new Gs("\"kty\" (Key Type) Parameter missing or unsupported");
	}
	let r = Ps.encode(JSON.stringify(n));
	return Rs(await Ns(t, r));
}
function dl(e) {
	switch (typeof e == "string" && e.slice(0, 2)) {
		case "RS":
		case "PS": return "RSA";
		case "ES": return "EC";
		case "Ed": return "OKP";
		default: throw new Gs("Unsupported \"alg\" value for a JSON Web Key Set");
	}
}
function fl(e) {
	return e && typeof e == "object" && Array.isArray(e.keys) && e.keys.every(pl);
}
function pl(e) {
	return hc(e);
}
function ml(e) {
	return typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}
var hl = class {
	constructor(e) {
		if (this._cached = /* @__PURE__ */ new WeakMap(), !fl(e)) throw new Zs("JSON Web Key Set malformed");
		this._jwks = ml(e);
	}
	async getKey(e, t) {
		let { alg: n, kid: r } = {
			...e,
			...t?.header
		}, i = dl(n), a = this._jwks.keys.filter((e) => {
			let t = i === e.kty;
			if (t && typeof r == "string" && (t = r === e.kid), t && typeof e.alg == "string" && (t = n === e.alg), t && typeof e.use == "string" && (t = e.use === "sig"), t && Array.isArray(e.key_ops) && (t = e.key_ops.includes("verify")), t) switch (n) {
				case "ES256":
					t = e.crv === "P-256";
					break;
				case "ES256K":
					t = e.crv === "secp256k1";
					break;
				case "ES384":
					t = e.crv === "P-384";
					break;
				case "ES512":
					t = e.crv === "P-521";
					break;
				case "Ed25519":
					t = e.crv === "Ed25519";
					break;
				case "EdDSA": t = e.crv === "Ed25519" || e.crv === "Ed448";
			}
			return t;
		}), { 0: o, length: s } = a;
		if (s === 0) throw new Qs();
		if (s !== 1) {
			let e = new $s(), { _cached: t } = this;
			throw e[Symbol.asyncIterator] = async function* () {
				for (let e of a) try {
					yield await gl(t, e, n);
				} catch {}
			}, e;
		}
		return gl(this._cached, o, n);
	}
};
async function gl(e, t, n) {
	let r = e.get(t) || e.set(t, {}).get(t);
	if (r[n] === void 0) {
		let e = await kc({
			...t,
			ext: !0
		}, n);
		if (e instanceof Uint8Array || e.type !== "public") throw new Zs("JSON Web Key Set members must be public keys");
		r[n] = e;
	}
	return r[n];
}
function _l(e) {
	let t = new hl(e), n = async (e, n) => t.getKey(e, n);
	return Object.defineProperties(n, { jwks: {
		value: () => ml(t._jwks),
		enumerable: !0,
		configurable: !1,
		writable: !1
	} }), n;
}
var vl = async (e, t, n) => {
	let r, i, a = !1;
	typeof AbortController == "function" && (r = new AbortController(), i = setTimeout(() => {
		a = !0, r.abort();
	}, t));
	let o = await fetch(e.href, {
		signal: r ? r.signal : void 0,
		redirect: "manual",
		headers: n.headers
	}).catch((e) => {
		throw a ? new ec() : e;
	});
	if (i !== void 0 && clearTimeout(i), o.status !== 200) throw new Vs("Expected 200 OK from the JSON Web Key Set HTTP response");
	try {
		return await o.json();
	} catch {
		throw new Vs("Failed to parse the JSON Web Key Set HTTP response as JSON");
	}
};
function yl() {
	return typeof WebSocketPair < "u" || typeof navigator < "u" && navigator.userAgent === "Cloudflare-Workers" || typeof EdgeRuntime < "u" && EdgeRuntime === "vercel";
}
var bl;
typeof navigator < "u" && navigator.userAgent?.startsWith?.("Mozilla/5.0 ") || (bl = "jose/v5.10.0");
var xl = Symbol();
function Sl(e, t) {
	return !(typeof e != "object" || !e || !("uat" in e) || typeof e.uat != "number" || Date.now() - e.uat >= t || !("jwks" in e) || !hc(e.jwks) || !Array.isArray(e.jwks.keys) || !Array.prototype.every.call(e.jwks.keys, hc));
}
var Cl = class {
	constructor(e, t) {
		if (!(e instanceof URL)) throw TypeError("url must be an instance of URL");
		this._url = new URL(e.href), this._options = {
			agent: t?.agent,
			headers: t?.headers
		}, this._timeoutDuration = typeof t?.timeoutDuration == "number" ? t?.timeoutDuration : 5e3, this._cooldownDuration = typeof t?.cooldownDuration == "number" ? t?.cooldownDuration : 3e4, this._cacheMaxAge = typeof t?.cacheMaxAge == "number" ? t?.cacheMaxAge : 6e5, t?.[xl] !== void 0 && (this._cache = t?.[xl], Sl(t?.[xl], this._cacheMaxAge) && (this._jwksTimestamp = this._cache.uat, this._local = _l(this._cache.jwks)));
	}
	coolingDown() {
		return typeof this._jwksTimestamp == "number" && Date.now() < this._jwksTimestamp + this._cooldownDuration;
	}
	fresh() {
		return typeof this._jwksTimestamp == "number" && Date.now() < this._jwksTimestamp + this._cacheMaxAge;
	}
	async getKey(e, t) {
		this._local && this.fresh() || await this.reload();
		try {
			return await this._local(e, t);
		} catch (n) {
			if (n instanceof Qs && this.coolingDown() === !1) return await this.reload(), this._local(e, t);
			throw n;
		}
	}
	async reload() {
		this._pendingFetch && yl() && (this._pendingFetch = void 0);
		let e = new Headers(this._options.headers);
		bl && !e.has("User-Agent") && (e.set("User-Agent", bl), this._options.headers = Object.fromEntries(e.entries())), this._pendingFetch ||= vl(this._url, this._timeoutDuration, this._options).then((e) => {
			this._local = _l(e), this._cache && (this._cache.uat = Date.now(), this._cache.jwks = e), this._jwksTimestamp = Date.now(), this._pendingFetch = void 0;
		}).catch((e) => {
			throw this._pendingFetch = void 0, e;
		}), await this._pendingFetch;
	}
};
function wl(e, t) {
	let n = new Cl(e, t), r = async (e, t) => n.getKey(e, t);
	return Object.defineProperties(r, {
		coolingDown: {
			get: () => n.coolingDown(),
			enumerable: !0,
			configurable: !1
		},
		fresh: {
			get: () => n.fresh(),
			enumerable: !0,
			configurable: !1
		},
		reload: {
			value: () => n.reload(),
			enumerable: !0,
			configurable: !1,
			writable: !1
		},
		reloading: {
			get: () => !!n._pendingFetch,
			enumerable: !0,
			configurable: !1
		},
		jwks: {
			value: () => n._local?.jwks(),
			enumerable: !0,
			configurable: !1,
			writable: !1
		}
	}), r;
}
var Tl = Bs;
function El(e) {
	if (typeof e != "string") throw new Ys("JWTs must use Compact JWS serialization, JWT must be a string");
	let { 1: t, length: n } = e.split(".");
	if (n === 5) throw new Ys("Only JWTs using Compact JWS serialization can be decoded");
	if (n !== 3) throw new Ys("Invalid JWT");
	if (!t) throw new Ys("JWTs must contain a payload");
	let r;
	try {
		r = Tl(t);
	} catch {
		throw new Ys("Failed to base64url decode the payload");
	}
	let i;
	try {
		i = JSON.parse(Fs.decode(r));
	} catch {
		throw new Ys("Failed to parse the decoded payload as JSON");
	}
	if (!hc(i)) throw new Ys("Invalid JWT Claims Set");
	return i;
}
function Dl(e) {
	let t = e?.modulusLength ?? 2048;
	if (typeof t != "number" || t < 2048) throw new Gs("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
	return t;
}
async function Ol(e, t) {
	let n, r;
	switch (e) {
		case "PS256":
		case "PS384":
		case "PS512":
			n = {
				name: "RSA-PSS",
				hash: `SHA-${e.slice(-3)}`,
				publicExponent: new Uint8Array([
					1,
					0,
					1
				]),
				modulusLength: Dl(t)
			}, r = ["sign", "verify"];
			break;
		case "RS256":
		case "RS384":
		case "RS512":
			n = {
				name: "RSASSA-PKCS1-v1_5",
				hash: `SHA-${e.slice(-3)}`,
				publicExponent: new Uint8Array([
					1,
					0,
					1
				]),
				modulusLength: Dl(t)
			}, r = ["sign", "verify"];
			break;
		case "RSA-OAEP":
		case "RSA-OAEP-256":
		case "RSA-OAEP-384":
		case "RSA-OAEP-512":
			n = {
				name: "RSA-OAEP",
				hash: `SHA-${parseInt(e.slice(-3), 10) || 1}`,
				publicExponent: new Uint8Array([
					1,
					0,
					1
				]),
				modulusLength: Dl(t)
			}, r = [
				"decrypt",
				"unwrapKey",
				"encrypt",
				"wrapKey"
			];
			break;
		case "ES256":
			n = {
				name: "ECDSA",
				namedCurve: "P-256"
			}, r = ["sign", "verify"];
			break;
		case "ES384":
			n = {
				name: "ECDSA",
				namedCurve: "P-384"
			}, r = ["sign", "verify"];
			break;
		case "ES512":
			n = {
				name: "ECDSA",
				namedCurve: "P-521"
			}, r = ["sign", "verify"];
			break;
		case "Ed25519":
			n = { name: "Ed25519" }, r = ["sign", "verify"];
			break;
		case "EdDSA": {
			r = ["sign", "verify"];
			let e = t?.crv ?? "Ed25519";
			switch (e) {
				case "Ed25519":
				case "Ed448":
					n = { name: e };
					break;
				default: throw new Gs("Invalid or unsupported crv option provided");
			}
			break;
		}
		case "ECDH-ES":
		case "ECDH-ES+A128KW":
		case "ECDH-ES+A192KW":
		case "ECDH-ES+A256KW": {
			r = ["deriveKey", "deriveBits"];
			let e = t?.crv ?? "P-256";
			switch (e) {
				case "P-256":
				case "P-384":
				case "P-521":
					n = {
						name: "ECDH",
						namedCurve: e
					};
					break;
				case "X25519":
				case "X448":
					n = { name: e };
					break;
				default: throw new Gs("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, X25519, and X448");
			}
			break;
		}
		default: throw new Gs("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
	}
	return js.subtle.generateKey(n, t?.extractable ?? !1, r);
}
async function kl(e, t) {
	return Ol(e, t);
}
var Al = async (e, t) => {
	let n = {
		...t,
		grant_types: ["authorization_code", "refresh_token"],
		token_endpoint_auth_method: "none",
		application_type: "web",
		subject_type: "public"
	};
	return fetch(e, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(n)
	});
}, jl = async (e, t, n) => {
	let r = new URL(t), i = r.origin + r.pathname + r.search, a = new URL(e).origin, o = await fetch(`${a}/.well-known/openid-configuration`).then((e) => {
		if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
		return e.json();
	}), s = o.issuer, c = (e) => e.endsWith("/") ? e.slice(0, -1) : e;
	if (c(e) !== c(s)) throw Error("RFC 9207 - iss !== idp - " + s + " !== " + e);
	sessionStorage.setItem("idp", s), sessionStorage.setItem("token_endpoint", o.token_endpoint), sessionStorage.setItem("jwks_uri", o.jwks_uri);
	let l = n?.client_id;
	if (!l) {
		let e = o.registration_endpoint;
		l = (await Al(e, n ?? { redirect_uris: [i] }).then((e) => {
			if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
			return e.json();
		})).client_id;
	}
	try {
		new URL(l);
	} catch {
		sessionStorage.setItem("client_id", l);
	}
	let { pkce_code_verifier: u, pkce_code_challenge: d } = await Ml();
	sessionStorage.setItem("pkce_code_verifier", u);
	let f = window.crypto.randomUUID();
	sessionStorage.setItem("csrf_token", f);
	let p = o.authorization_endpoint + `?response_type=code&redirect_uri=${encodeURIComponent(i)}&scope=openid offline_access webid&client_id=${encodeURIComponent(l)}&code_challenge_method=S256&code_challenge=${d}&state=${f}&prompt=consent`;
	window.location.href = p;
}, Ml = async () => {
	let e = window.crypto.randomUUID() + "-" + window.crypto.randomUUID(), t = new Uint8Array(await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(e)));
	return {
		pkce_code_verifier: e,
		pkce_code_challenge: btoa(String.fromCharCode(...t)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
	};
}, Nl = async (e, t) => {
	let n = new URL(window.location.href), r = n.searchParams.get("code");
	if (r === null) return { clientDetails: e };
	let i = sessionStorage.getItem("idp");
	if (i === null || n.searchParams.get("iss") !== i) throw Error("RFC 9207 - iss !== idp - " + n.searchParams.get("iss") + " !== " + i);
	if (n.searchParams.get("state") !== sessionStorage.getItem("csrf_token")) throw Error("RFC 6749 - state !== csrf_token - " + n.searchParams.get("state") + " !== " + sessionStorage.getItem("csrf_token"));
	n.searchParams.delete("iss"), n.searchParams.delete("state"), n.searchParams.delete("code"), window.history.pushState({}, document.title, n.toString());
	let a = sessionStorage.getItem("pkce_code_verifier");
	if (a === null) throw Error("Access Token Request preparation - Could not find in sessionStorage: pkce_code_verifier");
	let o = e?.client_id || sessionStorage.getItem("client_id");
	if (!o) throw Error("Access Token Request preparation - Could not find in sessionStorage: client_id (dynamic registration)");
	let s = sessionStorage.getItem("token_endpoint");
	if (s === null) throw Error("Access Token Request preparation - Could not find in sessionStorage: token_endpoint");
	let c = await kl("ES256"), l = await Pl(r, a, n.toString(), o, s, c).then((e) => {
		if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
		return e.json();
	}), u = l.access_token, d = sessionStorage.getItem("jwks_uri");
	if (d === null) throw Error("Access Token validation preparation - Could not find in sessionStorage: jwks_uri");
	let { payload: f } = await nl(u, wl(new URL(d)), {
		issuer: i,
		audience: "solid"
	}), p = await ul(await zc(c.publicKey));
	if (f.cnf.jkt !== p) throw Error("Access Token validation failed on `jkt`: jkt !== DPoP thumbprint - " + f.cnf.jkt + " !== " + p);
	if (f.client_id !== o) throw Error("Access Token validation failed on `client_id`: JWT payload !== client_id - " + f.client_id + " !== " + o);
	let m = {
		...l,
		dpop_key_pair: c
	}, h = {
		idp: i,
		jwks_uri: d,
		token_endpoint: s
	};
	return e ||= { redirect_uris: [n.toString()] }, e.client_id = o, t && (await t.init(), await Promise.all([
		t.setItem("idp", i),
		t.setItem("jwks_uri", d),
		t.setItem("token_endpoint", s),
		t.setItem("client_id", o),
		t.setItem("dpop_keypair", c),
		t.setItem("refresh_token", l.refresh_token)
	]), t.close()), sessionStorage.removeItem("csrf_token"), sessionStorage.removeItem("pkce_code_verifier"), sessionStorage.removeItem("idp"), sessionStorage.removeItem("jwks_uri"), sessionStorage.removeItem("token_endpoint"), sessionStorage.removeItem("client_id"), {
		clientDetails: e,
		idpDetails: h,
		tokenDetails: m
	};
}, Pl = async (e, t, n, r, i, a) => {
	let o = await zc(a.publicKey);
	o.alg = "ES256";
	let s = await new cl({
		htu: i,
		htm: "POST"
	}).setIssuedAt().setJti(window.crypto.randomUUID()).setProtectedHeader({
		alg: "ES256",
		typ: "dpop+jwt",
		jwk: o
	}).sign(a.privateKey);
	return fetch(i, {
		method: "POST",
		headers: {
			dpop: s,
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams({
			grant_type: "authorization_code",
			code: e,
			code_verifier: t,
			redirect_uri: n,
			client_id: r
		})
	});
}, Fl = async (e) => {
	try {
		await e.init();
		let t = await e.getItem("client_id"), n = await e.getItem("token_endpoint"), r = await e.getItem("dpop_keypair"), i = await e.getItem("refresh_token");
		if (t === null || n === null || r === null || i === null) throw Error("Could not refresh tokens: details missing from database.");
		let a = await Il(i, t, n, r).then((e) => {
			if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
			return e.json();
		}), o = a.access_token, s = await e.getItem("idp");
		if (s === null) throw Error("Access Token validation preparation - Could not find in sessionDatabase: idp");
		let c = await e.getItem("jwks_uri");
		if (c === null) throw Error("Access Token validation preparation - Could not find in sessionDatabase: jwks_uri");
		let { payload: l } = await nl(o, wl(new URL(c)), {
			issuer: s,
			audience: "solid"
		}), u = await ul(await zc(r.publicKey));
		if (l.cnf.jkt !== u) throw Error("Access Token validation failed on `jkt`: jkt !== DPoP thumbprint - " + l.cnf.jkt + " !== " + u);
		if (l.client_id !== t) throw Error("Access Token validation failed on `client_id`: JWT payload !== client_id - " + l.client_id + " !== " + t);
		return await e.setItem("refresh_token", a.refresh_token), {
			...a,
			dpop_key_pair: r
		};
	} finally {
		e.close();
	}
}, Il = async (e, t, n, r) => {
	let i = await zc(r.publicKey);
	i.alg = "ES256";
	let a = await new cl({
		htu: n,
		htm: "POST"
	}).setIssuedAt().setJti(self.crypto.randomUUID()).setProtectedHeader({
		alg: "ES256",
		typ: "dpop+jwt",
		jwk: i
	}).sign(r.privateKey);
	return fetch(n, {
		method: "POST",
		headers: {
			dpop: a,
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: e,
			client_id: t
		})
	});
}, Ll;
(function(e) {
	e.STATE_CHANGE = "sessionStateChange", e.EXPIRATION_WARNING = "sessionExpirationWarning", e.EXPIRATION = "sessionExpiration";
})(Ll ||= {});
var Rl = class extends EventTarget {
	isActive_ = !1;
	exp_;
	webId_ = void 0;
	currentAth_ = void 0;
	information;
	database;
	refreshPromise;
	resolveRefresh;
	rejectRefresh;
	constructor(e, t) {
		super(), this.authFetch = this.authFetch.bind(this), this.information = { clientDetails: e }, this.database = t?.database, t?.onSessionStateChange && this.addEventListener(Ll.STATE_CHANGE, (e) => t.onSessionStateChange?.(e)), t?.onSessionExpirationWarning && this.addEventListener(Ll.EXPIRATION_WARNING, (e) => t?.onSessionExpirationWarning?.(e)), t?.onSessionExpiration && this.addEventListener(Ll.EXPIRATION, (e) => t?.onSessionExpiration?.(e));
	}
	async login(e, t) {
		await jl(e, t, this.information.clientDetails);
	}
	async handleRedirectFromLogin() {
		let e = await Nl(this.information.clientDetails, this.database);
		e.tokenDetails && (this.information.clientDetails = e.clientDetails, this.information.idpDetails = e.idpDetails, await this.setTokenDetails(e.tokenDetails), this.dispatchStateChangeEvent());
	}
	async restore() {
		if (!this.database) throw Error("Could not refresh tokens: missing database. Provide database in sessionOption.");
		if (this.refreshPromise) return this.refreshPromise;
		this.refreshPromise = new Promise((e, t) => {
			this.resolveRefresh = e, this.rejectRefresh = t;
		});
		let e = this.isActive;
		return Fl(this.database).then((e) => this.setTokenDetails(e)).then(() => this.resolveRefresh()).catch((e) => {
			this.isActive ? (this.rejectRefresh(Error(e || "Token refresh failed")), this.isExpired() ? this.dispatchExpirationEvent() : this.dispatchExpirationWarningEvent()) : this.rejectRefresh(/* @__PURE__ */ Error("No session to restore."));
		}).finally(() => {
			this.clearRefreshPromise(), e !== this.isActive && this.dispatchStateChangeEvent();
		}), this.refreshPromise;
	}
	async logout() {
		this.isActive_ = !1, this.exp_ = void 0, this.webId_ = void 0, this.currentAth_ = void 0, this.information.idpDetails = void 0, this.information.tokenDetails = void 0, this.refreshPromise && this.rejectRefresh && (this.rejectRefresh(/* @__PURE__ */ Error("Logout during token refresh.")), this.clearRefreshPromise()), this.database && (await this.database.init(), await this.database.clear(), this.database.close()), this.dispatchStateChangeEvent();
	}
	async authFetch(e, t, n) {
		if (!this.isActive) return fetch(e, t);
		let r, i, a;
		e instanceof Request ? (r = new URL(e.url), i = t?.method || e?.method || "GET", a = new Headers(e.headers)) : (t ||= {}, r = new URL(e.toString()), i = t.method || "GET", a = t.headers ? new Headers(t.headers) : new Headers()), await this._renewTokensIfExpired(), n ??= {
			htu: `${r.origin}${r.pathname}`,
			htm: i.toUpperCase()
		};
		let o = await this._createSignedDPoPToken(n);
		return a.set("dpop", o), a.set("authorization", `DPoP ${this.information.tokenDetails.access_token}`), e instanceof Request ? fetch(new Request(e, {
			...t,
			headers: a
		})) : fetch(r, {
			...t,
			headers: a
		});
	}
	async setTokenDetails(e) {
		this.information.tokenDetails = e, await this._updateSessionDetailsFromToken(e.access_token);
	}
	clearRefreshPromise() {
		this.refreshPromise = void 0, this.resolveRefresh = void 0, this.rejectRefresh = void 0;
	}
	get isActive() {
		return this.isActive_;
	}
	get webId() {
		return this.webId_;
	}
	isExpired() {
		return !this.exp_ || this._isTokenExpired(this.exp_);
	}
	getExpiresIn() {
		return this.exp_ ? this._getTokenTTL(this.exp_) : -1;
	}
	getTokenDetails() {
		return this.information.tokenDetails;
	}
	async _renewTokensIfExpired() {
		this.isExpired() && (this.refreshPromise ? await this.refreshPromise : await this.restore());
	}
	async _computeAth(e) {
		let t = new TextEncoder().encode(e), n = await crypto.subtle.digest("SHA-256", t), r = Array.from(new Uint8Array(n));
		return btoa(String.fromCharCode(...r)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
	}
	async _createSignedDPoPToken(e) {
		if (!this.information.tokenDetails || !this.currentAth_) throw Error("Session not established.");
		e.ath = this.currentAth_;
		let t = await zc(this.information.tokenDetails.dpop_key_pair.publicKey);
		return new cl(e).setIssuedAt().setJti(window.crypto.randomUUID()).setProtectedHeader({
			alg: "ES256",
			typ: "dpop+jwt",
			jwk: t
		}).sign(this.information.tokenDetails.dpop_key_pair.privateKey);
	}
	async _updateSessionDetailsFromToken(e) {
		if (!e) await this.logout();
		else try {
			let t = El(e), n = t.webid;
			if (!n) throw Error("Missing webid claim in access token");
			let r = t.exp;
			if (!r) throw Error("Missing exp claim in access token");
			this.currentAth_ = await this._computeAth(e), this.webId_ = n, this.exp_ = r, this.isActive_ = !0;
		} catch {
			await this.logout();
		}
	}
	_isTokenExpired(e, t = 0) {
		return typeof e != "number" || isNaN(e) ? !0 : this._getTokenTTL(e, t) < 0;
	}
	_getTokenTTL(e, t = 0) {
		return e - (Math.floor(Date.now() / 1e3) + t);
	}
	dispatchStateChangeEvent() {
		this.dispatchEvent(new CustomEvent(Ll.STATE_CHANGE, { detail: {
			isActive: this.isActive,
			webId: this.webId
		} }));
	}
	dispatchExpirationWarningEvent() {
		this.dispatchEvent(new CustomEvent(Ll.EXPIRATION_WARNING, { detail: { expires_in: this.getExpiresIn() } }));
	}
	dispatchExpirationEvent() {
		this.dispatchEvent(new CustomEvent(Ll.EXPIRATION));
	}
}, zl = () => new URL("data:text/javascript;base64,dmFyIGNyeXB0byQxID0gY3J5cHRvOwpjb25zdCBpc0NyeXB0b0tleSA9IChrZXkpID0+IGtleSBpbnN0YW5jZW9mIENyeXB0b0tleTsKCmNvbnN0IGRpZ2VzdCA9IGFzeW5jIChhbGdvcml0aG0sIGRhdGEpID0+IHsKICAgIGNvbnN0IHN1YnRsZURpZ2VzdCA9IGBTSEEtJHthbGdvcml0aG0uc2xpY2UoLTMpfWA7CiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgY3J5cHRvJDEuc3VidGxlLmRpZ2VzdChzdWJ0bGVEaWdlc3QsIGRhdGEpKTsKfTsKdmFyIGRpZ2VzdCQxID0gZGlnZXN0OwoKY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpOwpjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7CmZ1bmN0aW9uIGNvbmNhdCguLi5idWZmZXJzKSB7CiAgICBjb25zdCBzaXplID0gYnVmZmVycy5yZWR1Y2UoKGFjYywgeyBsZW5ndGggfSkgPT4gYWNjICsgbGVuZ3RoLCAwKTsKICAgIGNvbnN0IGJ1ZiA9IG5ldyBVaW50OEFycmF5KHNpemUpOwogICAgbGV0IGkgPSAwOwogICAgZm9yIChjb25zdCBidWZmZXIgb2YgYnVmZmVycykgewogICAgICAgIGJ1Zi5zZXQoYnVmZmVyLCBpKTsKICAgICAgICBpICs9IGJ1ZmZlci5sZW5ndGg7CiAgICB9CiAgICByZXR1cm4gYnVmOwp9Cgpjb25zdCBlbmNvZGVCYXNlNjQgPSAoaW5wdXQpID0+IHsKICAgIGxldCB1bmVuY29kZWQgPSBpbnB1dDsKICAgIGlmICh0eXBlb2YgdW5lbmNvZGVkID09PSAnc3RyaW5nJykgewogICAgICAgIHVuZW5jb2RlZCA9IGVuY29kZXIuZW5jb2RlKHVuZW5jb2RlZCk7CiAgICB9CiAgICBjb25zdCBDSFVOS19TSVpFID0gMHg4MDAwOwogICAgY29uc3QgYXJyID0gW107CiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVuZW5jb2RlZC5sZW5ndGg7IGkgKz0gQ0hVTktfU0laRSkgewogICAgICAgIGFyci5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgdW5lbmNvZGVkLnN1YmFycmF5KGksIGkgKyBDSFVOS19TSVpFKSkpOwogICAgfQogICAgcmV0dXJuIGJ0b2EoYXJyLmpvaW4oJycpKTsKfTsKY29uc3QgZW5jb2RlID0gKGlucHV0KSA9PiB7CiAgICByZXR1cm4gZW5jb2RlQmFzZTY0KGlucHV0KS5yZXBsYWNlKC89L2csICcnKS5yZXBsYWNlKC9cKy9nLCAnLScpLnJlcGxhY2UoL1wvL2csICdfJyk7Cn07CmNvbnN0IGRlY29kZUJhc2U2NCA9IChlbmNvZGVkKSA9PiB7CiAgICBjb25zdCBiaW5hcnkgPSBhdG9iKGVuY29kZWQpOwogICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShiaW5hcnkubGVuZ3RoKTsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluYXJ5Lmxlbmd0aDsgaSsrKSB7CiAgICAgICAgYnl0ZXNbaV0gPSBiaW5hcnkuY2hhckNvZGVBdChpKTsKICAgIH0KICAgIHJldHVybiBieXRlczsKfTsKY29uc3QgZGVjb2RlJDEgPSAoaW5wdXQpID0+IHsKICAgIGxldCBlbmNvZGVkID0gaW5wdXQ7CiAgICBpZiAoZW5jb2RlZCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHsKICAgICAgICBlbmNvZGVkID0gZGVjb2Rlci5kZWNvZGUoZW5jb2RlZCk7CiAgICB9CiAgICBlbmNvZGVkID0gZW5jb2RlZC5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpLnJlcGxhY2UoL1xzL2csICcnKTsKICAgIHRyeSB7CiAgICAgICAgcmV0dXJuIGRlY29kZUJhc2U2NChlbmNvZGVkKTsKICAgIH0KICAgIGNhdGNoIHsKICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgaW5wdXQgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJyk7CiAgICB9Cn07CgpjbGFzcyBKT1NFRXJyb3IgZXh0ZW5kcyBFcnJvciB7CiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBvcHRpb25zKSB7CiAgICAgICAgc3VwZXIobWVzc2FnZSwgb3B0aW9ucyk7CiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KT1NFX0dFTkVSSUMnOwogICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTsKICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZT8uKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpOwogICAgfQp9CkpPU0VFcnJvci5jb2RlID0gJ0VSUl9KT1NFX0dFTkVSSUMnOwpjbGFzcyBKV1RDbGFpbVZhbGlkYXRpb25GYWlsZWQgZXh0ZW5kcyBKT1NFRXJyb3IgewogICAgY29uc3RydWN0b3IobWVzc2FnZSwgcGF5bG9hZCwgY2xhaW0gPSAndW5zcGVjaWZpZWQnLCByZWFzb24gPSAndW5zcGVjaWZpZWQnKSB7CiAgICAgICAgc3VwZXIobWVzc2FnZSwgeyBjYXVzZTogeyBjbGFpbSwgcmVhc29uLCBwYXlsb2FkIH0gfSk7CiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KV1RfQ0xBSU1fVkFMSURBVElPTl9GQUlMRUQnOwogICAgICAgIHRoaXMuY2xhaW0gPSBjbGFpbTsKICAgICAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbjsKICAgICAgICB0aGlzLnBheWxvYWQgPSBwYXlsb2FkOwogICAgfQp9CkpXVENsYWltVmFsaWRhdGlvbkZhaWxlZC5jb2RlID0gJ0VSUl9KV1RfQ0xBSU1fVkFMSURBVElPTl9GQUlMRUQnOwpjbGFzcyBKV1RFeHBpcmVkIGV4dGVuZHMgSk9TRUVycm9yIHsKICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHBheWxvYWQsIGNsYWltID0gJ3Vuc3BlY2lmaWVkJywgcmVhc29uID0gJ3Vuc3BlY2lmaWVkJykgewogICAgICAgIHN1cGVyKG1lc3NhZ2UsIHsgY2F1c2U6IHsgY2xhaW0sIHJlYXNvbiwgcGF5bG9hZCB9IH0pOwogICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldUX0VYUElSRUQnOwogICAgICAgIHRoaXMuY2xhaW0gPSBjbGFpbTsKICAgICAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbjsKICAgICAgICB0aGlzLnBheWxvYWQgPSBwYXlsb2FkOwogICAgfQp9CkpXVEV4cGlyZWQuY29kZSA9ICdFUlJfSldUX0VYUElSRUQnOwpjbGFzcyBKT1NFQWxnTm90QWxsb3dlZCBleHRlbmRzIEpPU0VFcnJvciB7CiAgICBjb25zdHJ1Y3RvcigpIHsKICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpOwogICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSk9TRV9BTEdfTk9UX0FMTE9XRUQnOwogICAgfQp9CkpPU0VBbGdOb3RBbGxvd2VkLmNvZGUgPSAnRVJSX0pPU0VfQUxHX05PVF9BTExPV0VEJzsKY2xhc3MgSk9TRU5vdFN1cHBvcnRlZCBleHRlbmRzIEpPU0VFcnJvciB7CiAgICBjb25zdHJ1Y3RvcigpIHsKICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpOwogICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSk9TRV9OT1RfU1VQUE9SVEVEJzsKICAgIH0KfQpKT1NFTm90U3VwcG9ydGVkLmNvZGUgPSAnRVJSX0pPU0VfTk9UX1NVUFBPUlRFRCc7CmNsYXNzIEpXRURlY3J5cHRpb25GYWlsZWQgZXh0ZW5kcyBKT1NFRXJyb3IgewogICAgY29uc3RydWN0b3IobWVzc2FnZSA9ICdkZWNyeXB0aW9uIG9wZXJhdGlvbiBmYWlsZWQnLCBvcHRpb25zKSB7CiAgICAgICAgc3VwZXIobWVzc2FnZSwgb3B0aW9ucyk7CiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KV0VfREVDUllQVElPTl9GQUlMRUQnOwogICAgfQp9CkpXRURlY3J5cHRpb25GYWlsZWQuY29kZSA9ICdFUlJfSldFX0RFQ1JZUFRJT05fRkFJTEVEJzsKY2xhc3MgSldFSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7CiAgICBjb25zdHJ1Y3RvcigpIHsKICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpOwogICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldFX0lOVkFMSUQnOwogICAgfQp9CkpXRUludmFsaWQuY29kZSA9ICdFUlJfSldFX0lOVkFMSUQnOwpjbGFzcyBKV1NJbnZhbGlkIGV4dGVuZHMgSk9TRUVycm9yIHsKICAgIGNvbnN0cnVjdG9yKCkgewogICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7CiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KV1NfSU5WQUxJRCc7CiAgICB9Cn0KSldTSW52YWxpZC5jb2RlID0gJ0VSUl9KV1NfSU5WQUxJRCc7CmNsYXNzIEpXVEludmFsaWQgZXh0ZW5kcyBKT1NFRXJyb3IgewogICAgY29uc3RydWN0b3IoKSB7CiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTsKICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXVF9JTlZBTElEJzsKICAgIH0KfQpKV1RJbnZhbGlkLmNvZGUgPSAnRVJSX0pXVF9JTlZBTElEJzsKY2xhc3MgSldLSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7CiAgICBjb25zdHJ1Y3RvcigpIHsKICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpOwogICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldLX0lOVkFMSUQnOwogICAgfQp9CkpXS0ludmFsaWQuY29kZSA9ICdFUlJfSldLX0lOVkFMSUQnOwpjbGFzcyBKV0tTSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7CiAgICBjb25zdHJ1Y3RvcigpIHsKICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpOwogICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldLU19JTlZBTElEJzsKICAgIH0KfQpKV0tTSW52YWxpZC5jb2RlID0gJ0VSUl9KV0tTX0lOVkFMSUQnOwpjbGFzcyBKV0tTTm9NYXRjaGluZ0tleSBleHRlbmRzIEpPU0VFcnJvciB7CiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlID0gJ25vIGFwcGxpY2FibGUga2V5IGZvdW5kIGluIHRoZSBKU09OIFdlYiBLZXkgU2V0Jywgb3B0aW9ucykgewogICAgICAgIHN1cGVyKG1lc3NhZ2UsIG9wdGlvbnMpOwogICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldLU19OT19NQVRDSElOR19LRVknOwogICAgfQp9CkpXS1NOb01hdGNoaW5nS2V5LmNvZGUgPSAnRVJSX0pXS1NfTk9fTUFUQ0hJTkdfS0VZJzsKY2xhc3MgSldLU011bHRpcGxlTWF0Y2hpbmdLZXlzIGV4dGVuZHMgSk9TRUVycm9yIHsKICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSAnbXVsdGlwbGUgbWF0Y2hpbmcga2V5cyBmb3VuZCBpbiB0aGUgSlNPTiBXZWIgS2V5IFNldCcsIG9wdGlvbnMpIHsKICAgICAgICBzdXBlcihtZXNzYWdlLCBvcHRpb25zKTsKICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXS1NfTVVMVElQTEVfTUFUQ0hJTkdfS0VZUyc7CiAgICB9Cn0KSldLU011bHRpcGxlTWF0Y2hpbmdLZXlzLmNvZGUgPSAnRVJSX0pXS1NfTVVMVElQTEVfTUFUQ0hJTkdfS0VZUyc7CmNsYXNzIEpXS1NUaW1lb3V0IGV4dGVuZHMgSk9TRUVycm9yIHsKICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSAncmVxdWVzdCB0aW1lZCBvdXQnLCBvcHRpb25zKSB7CiAgICAgICAgc3VwZXIobWVzc2FnZSwgb3B0aW9ucyk7CiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KV0tTX1RJTUVPVVQnOwogICAgfQp9CkpXS1NUaW1lb3V0LmNvZGUgPSAnRVJSX0pXS1NfVElNRU9VVCc7CmNsYXNzIEpXU1NpZ25hdHVyZVZlcmlmaWNhdGlvbkZhaWxlZCBleHRlbmRzIEpPU0VFcnJvciB7CiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlID0gJ3NpZ25hdHVyZSB2ZXJpZmljYXRpb24gZmFpbGVkJywgb3B0aW9ucykgewogICAgICAgIHN1cGVyKG1lc3NhZ2UsIG9wdGlvbnMpOwogICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldTX1NJR05BVFVSRV9WRVJJRklDQVRJT05fRkFJTEVEJzsKICAgIH0KfQpKV1NTaWduYXR1cmVWZXJpZmljYXRpb25GYWlsZWQuY29kZSA9ICdFUlJfSldTX1NJR05BVFVSRV9WRVJJRklDQVRJT05fRkFJTEVEJzsKCmZ1bmN0aW9uIHVudXNhYmxlKG5hbWUsIHByb3AgPSAnYWxnb3JpdGhtLm5hbWUnKSB7CiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihgQ3J5cHRvS2V5IGRvZXMgbm90IHN1cHBvcnQgdGhpcyBvcGVyYXRpb24sIGl0cyAke3Byb3B9IG11c3QgYmUgJHtuYW1lfWApOwp9CmZ1bmN0aW9uIGlzQWxnb3JpdGhtKGFsZ29yaXRobSwgbmFtZSkgewogICAgcmV0dXJuIGFsZ29yaXRobS5uYW1lID09PSBuYW1lOwp9CmZ1bmN0aW9uIGdldEhhc2hMZW5ndGgoaGFzaCkgewogICAgcmV0dXJuIHBhcnNlSW50KGhhc2gubmFtZS5zbGljZSg0KSwgMTApOwp9CmZ1bmN0aW9uIGdldE5hbWVkQ3VydmUoYWxnKSB7CiAgICBzd2l0Y2ggKGFsZykgewogICAgICAgIGNhc2UgJ0VTMjU2JzoKICAgICAgICAgICAgcmV0dXJuICdQLTI1Nic7CiAgICAgICAgY2FzZSAnRVMzODQnOgogICAgICAgICAgICByZXR1cm4gJ1AtMzg0JzsKICAgICAgICBjYXNlICdFUzUxMic6CiAgICAgICAgICAgIHJldHVybiAnUC01MjEnOwogICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWFjaGFibGUnKTsKICAgIH0KfQpmdW5jdGlvbiBjaGVja1VzYWdlKGtleSwgdXNhZ2VzKSB7CiAgICBpZiAodXNhZ2VzLmxlbmd0aCAmJiAhdXNhZ2VzLnNvbWUoKGV4cGVjdGVkKSA9PiBrZXkudXNhZ2VzLmluY2x1ZGVzKGV4cGVjdGVkKSkpIHsKICAgICAgICBsZXQgbXNnID0gJ0NyeXB0b0tleSBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgb3BlcmF0aW9uLCBpdHMgdXNhZ2VzIG11c3QgaW5jbHVkZSAnOwogICAgICAgIGlmICh1c2FnZXMubGVuZ3RoID4gMikgewogICAgICAgICAgICBjb25zdCBsYXN0ID0gdXNhZ2VzLnBvcCgpOwogICAgICAgICAgICBtc2cgKz0gYG9uZSBvZiAke3VzYWdlcy5qb2luKCcsICcpfSwgb3IgJHtsYXN0fS5gOwogICAgICAgIH0KICAgICAgICBlbHNlIGlmICh1c2FnZXMubGVuZ3RoID09PSAyKSB7CiAgICAgICAgICAgIG1zZyArPSBgb25lIG9mICR7dXNhZ2VzWzBdfSBvciAke3VzYWdlc1sxXX0uYDsKICAgICAgICB9CiAgICAgICAgZWxzZSB7CiAgICAgICAgICAgIG1zZyArPSBgJHt1c2FnZXNbMF19LmA7CiAgICAgICAgfQogICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IobXNnKTsKICAgIH0KfQpmdW5jdGlvbiBjaGVja1NpZ0NyeXB0b0tleShrZXksIGFsZywgLi4udXNhZ2VzKSB7CiAgICBzd2l0Y2ggKGFsZykgewogICAgICAgIGNhc2UgJ0hTMjU2JzoKICAgICAgICBjYXNlICdIUzM4NCc6CiAgICAgICAgY2FzZSAnSFM1MTInOiB7CiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ0hNQUMnKSkKICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdITUFDJyk7CiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkID0gcGFyc2VJbnQoYWxnLnNsaWNlKDIpLCAxMCk7CiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGdldEhhc2hMZW5ndGgoa2V5LmFsZ29yaXRobS5oYXNoKTsKICAgICAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpCiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZShgU0hBLSR7ZXhwZWN0ZWR9YCwgJ2FsZ29yaXRobS5oYXNoJyk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgICAgICBjYXNlICdSUzI1Nic6CiAgICAgICAgY2FzZSAnUlMzODQnOgogICAgICAgIGNhc2UgJ1JTNTEyJzogewogICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdSU0FTU0EtUEtDUzEtdjFfNScpKQogICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ1JTQVNTQS1QS0NTMS12MV81Jyk7CiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkID0gcGFyc2VJbnQoYWxnLnNsaWNlKDIpLCAxMCk7CiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGdldEhhc2hMZW5ndGgoa2V5LmFsZ29yaXRobS5oYXNoKTsKICAgICAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpCiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZShgU0hBLSR7ZXhwZWN0ZWR9YCwgJ2FsZ29yaXRobS5oYXNoJyk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgICAgICBjYXNlICdQUzI1Nic6CiAgICAgICAgY2FzZSAnUFMzODQnOgogICAgICAgIGNhc2UgJ1BTNTEyJzogewogICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdSU0EtUFNTJykpCiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnUlNBLVBTUycpOwogICAgICAgICAgICBjb25zdCBleHBlY3RlZCA9IHBhcnNlSW50KGFsZy5zbGljZSgyKSwgMTApOwogICAgICAgICAgICBjb25zdCBhY3R1YWwgPSBnZXRIYXNoTGVuZ3RoKGtleS5hbGdvcml0aG0uaGFzaCk7CiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKQogICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoYFNIQS0ke2V4cGVjdGVkfWAsICdhbGdvcml0aG0uaGFzaCcpOwogICAgICAgICAgICBicmVhazsKICAgICAgICB9CiAgICAgICAgY2FzZSAnRWREU0EnOiB7CiAgICAgICAgICAgIGlmIChrZXkuYWxnb3JpdGhtLm5hbWUgIT09ICdFZDI1NTE5JyAmJiBrZXkuYWxnb3JpdGhtLm5hbWUgIT09ICdFZDQ0OCcpIHsKICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdFZDI1NTE5IG9yIEVkNDQ4Jyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgfQogICAgICAgIGNhc2UgJ0VkMjU1MTknOiB7CiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ0VkMjU1MTknKSkKICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdFZDI1NTE5Jyk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgICAgICBjYXNlICdFUzI1Nic6CiAgICAgICAgY2FzZSAnRVMzODQnOgogICAgICAgIGNhc2UgJ0VTNTEyJzogewogICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdFQ0RTQScpKQogICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ0VDRFNBJyk7CiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkID0gZ2V0TmFtZWRDdXJ2ZShhbGcpOwogICAgICAgICAgICBjb25zdCBhY3R1YWwgPSBrZXkuYWxnb3JpdGhtLm5hbWVkQ3VydmU7CiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKQogICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoZXhwZWN0ZWQsICdhbGdvcml0aG0ubmFtZWRDdXJ2ZScpOwogICAgICAgICAgICBicmVhazsKICAgICAgICB9CiAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ3J5cHRvS2V5IGRvZXMgbm90IHN1cHBvcnQgdGhpcyBvcGVyYXRpb24nKTsKICAgIH0KICAgIGNoZWNrVXNhZ2Uoa2V5LCB1c2FnZXMpOwp9CgpmdW5jdGlvbiBtZXNzYWdlKG1zZywgYWN0dWFsLCAuLi50eXBlcykgewogICAgdHlwZXMgPSB0eXBlcy5maWx0ZXIoQm9vbGVhbik7CiAgICBpZiAodHlwZXMubGVuZ3RoID4gMikgewogICAgICAgIGNvbnN0IGxhc3QgPSB0eXBlcy5wb3AoKTsKICAgICAgICBtc2cgKz0gYG9uZSBvZiB0eXBlICR7dHlwZXMuam9pbignLCAnKX0sIG9yICR7bGFzdH0uYDsKICAgIH0KICAgIGVsc2UgaWYgKHR5cGVzLmxlbmd0aCA9PT0gMikgewogICAgICAgIG1zZyArPSBgb25lIG9mIHR5cGUgJHt0eXBlc1swXX0gb3IgJHt0eXBlc1sxXX0uYDsKICAgIH0KICAgIGVsc2UgewogICAgICAgIG1zZyArPSBgb2YgdHlwZSAke3R5cGVzWzBdfS5gOwogICAgfQogICAgaWYgKGFjdHVhbCA9PSBudWxsKSB7CiAgICAgICAgbXNnICs9IGAgUmVjZWl2ZWQgJHthY3R1YWx9YDsKICAgIH0KICAgIGVsc2UgaWYgKHR5cGVvZiBhY3R1YWwgPT09ICdmdW5jdGlvbicgJiYgYWN0dWFsLm5hbWUpIHsKICAgICAgICBtc2cgKz0gYCBSZWNlaXZlZCBmdW5jdGlvbiAke2FjdHVhbC5uYW1lfWA7CiAgICB9CiAgICBlbHNlIGlmICh0eXBlb2YgYWN0dWFsID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgIT0gbnVsbCkgewogICAgICAgIGlmIChhY3R1YWwuY29uc3RydWN0b3I/Lm5hbWUpIHsKICAgICAgICAgICAgbXNnICs9IGAgUmVjZWl2ZWQgYW4gaW5zdGFuY2Ugb2YgJHthY3R1YWwuY29uc3RydWN0b3IubmFtZX1gOwogICAgICAgIH0KICAgIH0KICAgIHJldHVybiBtc2c7Cn0KdmFyIGludmFsaWRLZXlJbnB1dCA9IChhY3R1YWwsIC4uLnR5cGVzKSA9PiB7CiAgICByZXR1cm4gbWVzc2FnZSgnS2V5IG11c3QgYmUgJywgYWN0dWFsLCAuLi50eXBlcyk7Cn07CmZ1bmN0aW9uIHdpdGhBbGcoYWxnLCBhY3R1YWwsIC4uLnR5cGVzKSB7CiAgICByZXR1cm4gbWVzc2FnZShgS2V5IGZvciB0aGUgJHthbGd9IGFsZ29yaXRobSBtdXN0IGJlIGAsIGFjdHVhbCwgLi4udHlwZXMpOwp9Cgp2YXIgaXNLZXlMaWtlID0gKGtleSkgPT4gewogICAgaWYgKGlzQ3J5cHRvS2V5KGtleSkpIHsKICAgICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KICAgIHJldHVybiBrZXk/LltTeW1ib2wudG9TdHJpbmdUYWddID09PSAnS2V5T2JqZWN0JzsKfTsKY29uc3QgdHlwZXMgPSBbJ0NyeXB0b0tleSddOwoKY29uc3QgaXNEaXNqb2ludCA9ICguLi5oZWFkZXJzKSA9PiB7CiAgICBjb25zdCBzb3VyY2VzID0gaGVhZGVycy5maWx0ZXIoQm9vbGVhbik7CiAgICBpZiAoc291cmNlcy5sZW5ndGggPT09IDAgfHwgc291cmNlcy5sZW5ndGggPT09IDEpIHsKICAgICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KICAgIGxldCBhY2M7CiAgICBmb3IgKGNvbnN0IGhlYWRlciBvZiBzb3VyY2VzKSB7CiAgICAgICAgY29uc3QgcGFyYW1ldGVycyA9IE9iamVjdC5rZXlzKGhlYWRlcik7CiAgICAgICAgaWYgKCFhY2MgfHwgYWNjLnNpemUgPT09IDApIHsKICAgICAgICAgICAgYWNjID0gbmV3IFNldChwYXJhbWV0ZXJzKTsKICAgICAgICAgICAgY29udGludWU7CiAgICAgICAgfQogICAgICAgIGZvciAoY29uc3QgcGFyYW1ldGVyIG9mIHBhcmFtZXRlcnMpIHsKICAgICAgICAgICAgaWYgKGFjYy5oYXMocGFyYW1ldGVyKSkgewogICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGFjYy5hZGQocGFyYW1ldGVyKTsKICAgICAgICB9CiAgICB9CiAgICByZXR1cm4gdHJ1ZTsKfTsKdmFyIGlzRGlzam9pbnQkMSA9IGlzRGlzam9pbnQ7CgpmdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHsKICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsOwp9CmZ1bmN0aW9uIGlzT2JqZWN0KGlucHV0KSB7CiAgICBpZiAoIWlzT2JqZWN0TGlrZShpbnB1dCkgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHsKICAgICAgICByZXR1cm4gZmFsc2U7CiAgICB9CiAgICBpZiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKGlucHV0KSA9PT0gbnVsbCkgewogICAgICAgIHJldHVybiB0cnVlOwogICAgfQogICAgbGV0IHByb3RvID0gaW5wdXQ7CiAgICB3aGlsZSAoT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKSAhPT0gbnVsbCkgewogICAgICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKTsKICAgIH0KICAgIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoaW5wdXQpID09PSBwcm90bzsKfQoKdmFyIGNoZWNrS2V5TGVuZ3RoID0gKGFsZywga2V5KSA9PiB7CiAgICBpZiAoYWxnLnN0YXJ0c1dpdGgoJ1JTJykgfHwgYWxnLnN0YXJ0c1dpdGgoJ1BTJykpIHsKICAgICAgICBjb25zdCB7IG1vZHVsdXNMZW5ndGggfSA9IGtleS5hbGdvcml0aG07CiAgICAgICAgaWYgKHR5cGVvZiBtb2R1bHVzTGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBtb2R1bHVzTGVuZ3RoIDwgMjA0OCkgewogICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2FsZ30gcmVxdWlyZXMga2V5IG1vZHVsdXNMZW5ndGggdG8gYmUgMjA0OCBiaXRzIG9yIGxhcmdlcmApOwogICAgICAgIH0KICAgIH0KfTsKCmZ1bmN0aW9uIGlzSldLKGtleSkgewogICAgcmV0dXJuIGlzT2JqZWN0KGtleSkgJiYgdHlwZW9mIGtleS5rdHkgPT09ICdzdHJpbmcnOwp9CmZ1bmN0aW9uIGlzUHJpdmF0ZUpXSyhrZXkpIHsKICAgIHJldHVybiBrZXkua3R5ICE9PSAnb2N0JyAmJiB0eXBlb2Yga2V5LmQgPT09ICdzdHJpbmcnOwp9CmZ1bmN0aW9uIGlzUHVibGljSldLKGtleSkgewogICAgcmV0dXJuIGtleS5rdHkgIT09ICdvY3QnICYmIHR5cGVvZiBrZXkuZCA9PT0gJ3VuZGVmaW5lZCc7Cn0KZnVuY3Rpb24gaXNTZWNyZXRKV0soa2V5KSB7CiAgICByZXR1cm4gaXNKV0soa2V5KSAmJiBrZXkua3R5ID09PSAnb2N0JyAmJiB0eXBlb2Yga2V5LmsgPT09ICdzdHJpbmcnOwp9CgpmdW5jdGlvbiBzdWJ0bGVNYXBwaW5nKGp3aykgewogICAgbGV0IGFsZ29yaXRobTsKICAgIGxldCBrZXlVc2FnZXM7CiAgICBzd2l0Y2ggKGp3ay5rdHkpIHsKICAgICAgICBjYXNlICdSU0EnOiB7CiAgICAgICAgICAgIHN3aXRjaCAoandrLmFsZykgewogICAgICAgICAgICAgICAgY2FzZSAnUFMyNTYnOgogICAgICAgICAgICAgICAgY2FzZSAnUFMzODQnOgogICAgICAgICAgICAgICAgY2FzZSAnUFM1MTInOgogICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ1JTQS1QU1MnLCBoYXNoOiBgU0hBLSR7andrLmFsZy5zbGljZSgtMyl9YCB9OwogICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IGp3ay5kID8gWydzaWduJ10gOiBbJ3ZlcmlmeSddOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAnUlMyNTYnOgogICAgICAgICAgICAgICAgY2FzZSAnUlMzODQnOgogICAgICAgICAgICAgICAgY2FzZSAnUlM1MTInOgogICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ1JTQVNTQS1QS0NTMS12MV81JywgaGFzaDogYFNIQS0ke2p3ay5hbGcuc2xpY2UoLTMpfWAgfTsKICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBqd2suZCA/IFsnc2lnbiddIDogWyd2ZXJpZnknXTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ1JTQS1PQUVQJzoKICAgICAgICAgICAgICAgIGNhc2UgJ1JTQS1PQUVQLTI1Nic6CiAgICAgICAgICAgICAgICBjYXNlICdSU0EtT0FFUC0zODQnOgogICAgICAgICAgICAgICAgY2FzZSAnUlNBLU9BRVAtNTEyJzoKICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG0gPSB7CiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdSU0EtT0FFUCcsCiAgICAgICAgICAgICAgICAgICAgICAgIGhhc2g6IGBTSEEtJHtwYXJzZUludChqd2suYWxnLnNsaWNlKC0zKSwgMTApIHx8IDF9YCwKICAgICAgICAgICAgICAgICAgICB9OwogICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IGp3ay5kID8gWydkZWNyeXB0JywgJ3Vud3JhcEtleSddIDogWydlbmNyeXB0JywgJ3dyYXBLZXknXTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgSldLICJhbGciIChBbGdvcml0aG0pIFBhcmFtZXRlciB2YWx1ZScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgICAgICBjYXNlICdFQyc6IHsKICAgICAgICAgICAgc3dpdGNoIChqd2suYWxnKSB7CiAgICAgICAgICAgICAgICBjYXNlICdFUzI1Nic6CiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC0yNTYnIH07CiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gandrLmQgPyBbJ3NpZ24nXSA6IFsndmVyaWZ5J107CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdFUzM4NCc6CiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC0zODQnIH07CiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gandrLmQgPyBbJ3NpZ24nXSA6IFsndmVyaWZ5J107CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdFUzUxMic6CiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC01MjEnIH07CiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gandrLmQgPyBbJ3NpZ24nXSA6IFsndmVyaWZ5J107CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdFQ0RILUVTJzoKICAgICAgICAgICAgICAgIGNhc2UgJ0VDREgtRVMrQTEyOEtXJzoKICAgICAgICAgICAgICAgIGNhc2UgJ0VDREgtRVMrQTE5MktXJzoKICAgICAgICAgICAgICAgIGNhc2UgJ0VDREgtRVMrQTI1NktXJzoKICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdFQ0RIJywgbmFtZWRDdXJ2ZTogandrLmNydiB9OwogICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IGp3ay5kID8gWydkZXJpdmVCaXRzJ10gOiBbXTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgSldLICJhbGciIChBbGdvcml0aG0pIFBhcmFtZXRlciB2YWx1ZScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgICAgICBjYXNlICdPS1AnOiB7CiAgICAgICAgICAgIHN3aXRjaCAoandrLmFsZykgewogICAgICAgICAgICAgICAgY2FzZSAnRWQyNTUxOSc6CiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRWQyNTUxOScgfTsKICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBqd2suZCA/IFsnc2lnbiddIDogWyd2ZXJpZnknXTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ0VkRFNBJzoKICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6IGp3ay5jcnYgfTsKICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBqd2suZCA/IFsnc2lnbiddIDogWyd2ZXJpZnknXTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ0VDREgtRVMnOgogICAgICAgICAgICAgICAgY2FzZSAnRUNESC1FUytBMTI4S1cnOgogICAgICAgICAgICAgICAgY2FzZSAnRUNESC1FUytBMTkyS1cnOgogICAgICAgICAgICAgICAgY2FzZSAnRUNESC1FUytBMjU2S1cnOgogICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogandrLmNydiB9OwogICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IGp3ay5kID8gWydkZXJpdmVCaXRzJ10gOiBbXTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgSldLICJhbGciIChBbGdvcml0aG0pIFBhcmFtZXRlciB2YWx1ZScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBKV0sgImt0eSIgKEtleSBUeXBlKSBQYXJhbWV0ZXIgdmFsdWUnKTsKICAgIH0KICAgIHJldHVybiB7IGFsZ29yaXRobSwga2V5VXNhZ2VzIH07Cn0KY29uc3QgcGFyc2UgPSBhc3luYyAoandrKSA9PiB7CiAgICBpZiAoIWp3ay5hbGcpIHsKICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCciYWxnIiBhcmd1bWVudCBpcyByZXF1aXJlZCB3aGVuICJqd2suYWxnIiBpcyBub3QgcHJlc2VudCcpOwogICAgfQogICAgY29uc3QgeyBhbGdvcml0aG0sIGtleVVzYWdlcyB9ID0gc3VidGxlTWFwcGluZyhqd2spOwogICAgY29uc3QgcmVzdCA9IFsKICAgICAgICBhbGdvcml0aG0sCiAgICAgICAgandrLmV4dCA/PyBmYWxzZSwKICAgICAgICBqd2sua2V5X29wcyA/PyBrZXlVc2FnZXMsCiAgICBdOwogICAgY29uc3Qga2V5RGF0YSA9IHsgLi4uandrIH07CiAgICBkZWxldGUga2V5RGF0YS5hbGc7CiAgICBkZWxldGUga2V5RGF0YS51c2U7CiAgICByZXR1cm4gY3J5cHRvJDEuc3VidGxlLmltcG9ydEtleSgnandrJywga2V5RGF0YSwgLi4ucmVzdCk7Cn07CnZhciBhc0tleU9iamVjdCA9IHBhcnNlOwoKY29uc3QgZXhwb3J0S2V5VmFsdWUgPSAoaykgPT4gZGVjb2RlJDEoayk7CmxldCBwcml2Q2FjaGU7CmxldCBwdWJDYWNoZTsKY29uc3QgaXNLZXlPYmplY3QgPSAoa2V5KSA9PiB7CiAgICByZXR1cm4ga2V5Py5bU3ltYm9sLnRvU3RyaW5nVGFnXSA9PT0gJ0tleU9iamVjdCc7Cn07CmNvbnN0IGltcG9ydEFuZENhY2hlID0gYXN5bmMgKGNhY2hlLCBrZXksIGp3aywgYWxnLCBmcmVlemUgPSBmYWxzZSkgPT4gewogICAgbGV0IGNhY2hlZCA9IGNhY2hlLmdldChrZXkpOwogICAgaWYgKGNhY2hlZD8uW2FsZ10pIHsKICAgICAgICByZXR1cm4gY2FjaGVkW2FsZ107CiAgICB9CiAgICBjb25zdCBjcnlwdG9LZXkgPSBhd2FpdCBhc0tleU9iamVjdCh7IC4uLmp3aywgYWxnIH0pOwogICAgaWYgKGZyZWV6ZSkKICAgICAgICBPYmplY3QuZnJlZXplKGtleSk7CiAgICBpZiAoIWNhY2hlZCkgewogICAgICAgIGNhY2hlLnNldChrZXksIHsgW2FsZ106IGNyeXB0b0tleSB9KTsKICAgIH0KICAgIGVsc2UgewogICAgICAgIGNhY2hlZFthbGddID0gY3J5cHRvS2V5OwogICAgfQogICAgcmV0dXJuIGNyeXB0b0tleTsKfTsKY29uc3Qgbm9ybWFsaXplUHVibGljS2V5ID0gKGtleSwgYWxnKSA9PiB7CiAgICBpZiAoaXNLZXlPYmplY3Qoa2V5KSkgewogICAgICAgIGxldCBqd2sgPSBrZXkuZXhwb3J0KHsgZm9ybWF0OiAnandrJyB9KTsKICAgICAgICBkZWxldGUgandrLmQ7CiAgICAgICAgZGVsZXRlIGp3ay5kcDsKICAgICAgICBkZWxldGUgandrLmRxOwogICAgICAgIGRlbGV0ZSBqd2sucDsKICAgICAgICBkZWxldGUgandrLnE7CiAgICAgICAgZGVsZXRlIGp3ay5xaTsKICAgICAgICBpZiAoandrLmspIHsKICAgICAgICAgICAgcmV0dXJuIGV4cG9ydEtleVZhbHVlKGp3ay5rKTsKICAgICAgICB9CiAgICAgICAgcHViQ2FjaGUgfHwgKHB1YkNhY2hlID0gbmV3IFdlYWtNYXAoKSk7CiAgICAgICAgcmV0dXJuIGltcG9ydEFuZENhY2hlKHB1YkNhY2hlLCBrZXksIGp3aywgYWxnKTsKICAgIH0KICAgIGlmIChpc0pXSyhrZXkpKSB7CiAgICAgICAgaWYgKGtleS5rKQogICAgICAgICAgICByZXR1cm4gZGVjb2RlJDEoa2V5LmspOwogICAgICAgIHB1YkNhY2hlIHx8IChwdWJDYWNoZSA9IG5ldyBXZWFrTWFwKCkpOwogICAgICAgIGNvbnN0IGNyeXB0b0tleSA9IGltcG9ydEFuZENhY2hlKHB1YkNhY2hlLCBrZXksIGtleSwgYWxnLCB0cnVlKTsKICAgICAgICByZXR1cm4gY3J5cHRvS2V5OwogICAgfQogICAgcmV0dXJuIGtleTsKfTsKY29uc3Qgbm9ybWFsaXplUHJpdmF0ZUtleSA9IChrZXksIGFsZykgPT4gewogICAgaWYgKGlzS2V5T2JqZWN0KGtleSkpIHsKICAgICAgICBsZXQgandrID0ga2V5LmV4cG9ydCh7IGZvcm1hdDogJ2p3aycgfSk7CiAgICAgICAgaWYgKGp3ay5rKSB7CiAgICAgICAgICAgIHJldHVybiBleHBvcnRLZXlWYWx1ZShqd2suayk7CiAgICAgICAgfQogICAgICAgIHByaXZDYWNoZSB8fCAocHJpdkNhY2hlID0gbmV3IFdlYWtNYXAoKSk7CiAgICAgICAgcmV0dXJuIGltcG9ydEFuZENhY2hlKHByaXZDYWNoZSwga2V5LCBqd2ssIGFsZyk7CiAgICB9CiAgICBpZiAoaXNKV0soa2V5KSkgewogICAgICAgIGlmIChrZXkuaykKICAgICAgICAgICAgcmV0dXJuIGRlY29kZSQxKGtleS5rKTsKICAgICAgICBwcml2Q2FjaGUgfHwgKHByaXZDYWNoZSA9IG5ldyBXZWFrTWFwKCkpOwogICAgICAgIGNvbnN0IGNyeXB0b0tleSA9IGltcG9ydEFuZENhY2hlKHByaXZDYWNoZSwga2V5LCBrZXksIGFsZywgdHJ1ZSk7CiAgICAgICAgcmV0dXJuIGNyeXB0b0tleTsKICAgIH0KICAgIHJldHVybiBrZXk7Cn07CnZhciBub3JtYWxpemUgPSB7IG5vcm1hbGl6ZVB1YmxpY0tleSwgbm9ybWFsaXplUHJpdmF0ZUtleSB9OwoKYXN5bmMgZnVuY3Rpb24gaW1wb3J0SldLKGp3aywgYWxnKSB7CiAgICBpZiAoIWlzT2JqZWN0KGp3aykpIHsKICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdKV0sgbXVzdCBiZSBhbiBvYmplY3QnKTsKICAgIH0KICAgIGFsZyB8fCAoYWxnID0gandrLmFsZyk7CiAgICBzd2l0Y2ggKGp3ay5rdHkpIHsKICAgICAgICBjYXNlICdvY3QnOgogICAgICAgICAgICBpZiAodHlwZW9mIGp3ay5rICE9PSAnc3RyaW5nJyB8fCAhandrLmspIHsKICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ21pc3NpbmcgImsiIChLZXkgVmFsdWUpIFBhcmFtZXRlciB2YWx1ZScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiBkZWNvZGUkMShqd2suayk7CiAgICAgICAgY2FzZSAnUlNBJzoKICAgICAgICAgICAgaWYgKCdvdGgnIGluIGp3ayAmJiBqd2sub3RoICE9PSB1bmRlZmluZWQpIHsKICAgICAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdSU0EgSldLICJvdGgiIChPdGhlciBQcmltZXMgSW5mbykgUGFyYW1ldGVyIHZhbHVlIGlzIG5vdCBzdXBwb3J0ZWQnKTsKICAgICAgICAgICAgfQogICAgICAgIGNhc2UgJ0VDJzoKICAgICAgICBjYXNlICdPS1AnOgogICAgICAgICAgICByZXR1cm4gYXNLZXlPYmplY3QoeyAuLi5qd2ssIGFsZyB9KTsKICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnVW5zdXBwb3J0ZWQgImt0eSIgKEtleSBUeXBlKSBQYXJhbWV0ZXIgdmFsdWUnKTsKICAgIH0KfQoKY29uc3QgdGFnID0gKGtleSkgPT4ga2V5Py5bU3ltYm9sLnRvU3RyaW5nVGFnXTsKY29uc3QgandrTWF0Y2hlc09wID0gKGFsZywga2V5LCB1c2FnZSkgPT4gewogICAgaWYgKGtleS51c2UgIT09IHVuZGVmaW5lZCAmJiBrZXkudXNlICE9PSAnc2lnJykgewogICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQga2V5IGZvciB0aGlzIG9wZXJhdGlvbiwgd2hlbiBwcmVzZW50IGl0cyB1c2UgbXVzdCBiZSBzaWcnKTsKICAgIH0KICAgIGlmIChrZXkua2V5X29wcyAhPT0gdW5kZWZpbmVkICYmIGtleS5rZXlfb3BzLmluY2x1ZGVzPy4odXNhZ2UpICE9PSB0cnVlKSB7CiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBrZXkgZm9yIHRoaXMgb3BlcmF0aW9uLCB3aGVuIHByZXNlbnQgaXRzIGtleV9vcHMgbXVzdCBpbmNsdWRlICR7dXNhZ2V9YCk7CiAgICB9CiAgICBpZiAoa2V5LmFsZyAhPT0gdW5kZWZpbmVkICYmIGtleS5hbGcgIT09IGFsZykgewogICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQga2V5IGZvciB0aGlzIG9wZXJhdGlvbiwgd2hlbiBwcmVzZW50IGl0cyBhbGcgbXVzdCBiZSAke2FsZ31gKTsKICAgIH0KICAgIHJldHVybiB0cnVlOwp9Owpjb25zdCBzeW1tZXRyaWNUeXBlQ2hlY2sgPSAoYWxnLCBrZXksIHVzYWdlLCBhbGxvd0p3aykgPT4gewogICAgaWYgKGtleSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpCiAgICAgICAgcmV0dXJuOwogICAgaWYgKGFsbG93SndrICYmIGlzSldLKGtleSkpIHsKICAgICAgICBpZiAoaXNTZWNyZXRKV0soa2V5KSAmJiBqd2tNYXRjaGVzT3AoYWxnLCBrZXksIHVzYWdlKSkKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEpTT04gV2ViIEtleSBmb3Igc3ltbWV0cmljIGFsZ29yaXRobXMgbXVzdCBoYXZlIEpXSyAia3R5IiAoS2V5IFR5cGUpIGVxdWFsIHRvICJvY3QiIGFuZCB0aGUgSldLICJrIiAoS2V5IFZhbHVlKSBwcmVzZW50YCk7CiAgICB9CiAgICBpZiAoIWlzS2V5TGlrZShrZXkpKSB7CiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcih3aXRoQWxnKGFsZywga2V5LCAuLi50eXBlcywgJ1VpbnQ4QXJyYXknLCBhbGxvd0p3ayA/ICdKU09OIFdlYiBLZXknIDogbnVsbCkpOwogICAgfQogICAgaWYgKGtleS50eXBlICE9PSAnc2VjcmV0JykgewogICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dGFnKGtleSl9IGluc3RhbmNlcyBmb3Igc3ltbWV0cmljIGFsZ29yaXRobXMgbXVzdCBiZSBvZiB0eXBlICJzZWNyZXQiYCk7CiAgICB9Cn07CmNvbnN0IGFzeW1tZXRyaWNUeXBlQ2hlY2sgPSAoYWxnLCBrZXksIHVzYWdlLCBhbGxvd0p3aykgPT4gewogICAgaWYgKGFsbG93SndrICYmIGlzSldLKGtleSkpIHsKICAgICAgICBzd2l0Y2ggKHVzYWdlKSB7CiAgICAgICAgICAgIGNhc2UgJ3NpZ24nOgogICAgICAgICAgICAgICAgaWYgKGlzUHJpdmF0ZUpXSyhrZXkpICYmIGp3a01hdGNoZXNPcChhbGcsIGtleSwgdXNhZ2UpKQogICAgICAgICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEpTT04gV2ViIEtleSBmb3IgdGhpcyBvcGVyYXRpb24gYmUgYSBwcml2YXRlIEpXS2ApOwogICAgICAgICAgICBjYXNlICd2ZXJpZnknOgogICAgICAgICAgICAgICAgaWYgKGlzUHVibGljSldLKGtleSkgJiYgandrTWF0Y2hlc09wKGFsZywga2V5LCB1c2FnZSkpCiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSlNPTiBXZWIgS2V5IGZvciB0aGlzIG9wZXJhdGlvbiBiZSBhIHB1YmxpYyBKV0tgKTsKICAgICAgICB9CiAgICB9CiAgICBpZiAoIWlzS2V5TGlrZShrZXkpKSB7CiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcih3aXRoQWxnKGFsZywga2V5LCAuLi50eXBlcywgYWxsb3dKd2sgPyAnSlNPTiBXZWIgS2V5JyA6IG51bGwpKTsKICAgIH0KICAgIGlmIChrZXkudHlwZSA9PT0gJ3NlY3JldCcpIHsKICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3RhZyhrZXkpfSBpbnN0YW5jZXMgZm9yIGFzeW1tZXRyaWMgYWxnb3JpdGhtcyBtdXN0IG5vdCBiZSBvZiB0eXBlICJzZWNyZXQiYCk7CiAgICB9CiAgICBpZiAodXNhZ2UgPT09ICdzaWduJyAmJiBrZXkudHlwZSA9PT0gJ3B1YmxpYycpIHsKICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3RhZyhrZXkpfSBpbnN0YW5jZXMgZm9yIGFzeW1tZXRyaWMgYWxnb3JpdGhtIHNpZ25pbmcgbXVzdCBiZSBvZiB0eXBlICJwcml2YXRlImApOwogICAgfQogICAgaWYgKHVzYWdlID09PSAnZGVjcnlwdCcgJiYga2V5LnR5cGUgPT09ICdwdWJsaWMnKSB7CiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0YWcoa2V5KX0gaW5zdGFuY2VzIGZvciBhc3ltbWV0cmljIGFsZ29yaXRobSBkZWNyeXB0aW9uIG11c3QgYmUgb2YgdHlwZSAicHJpdmF0ZSJgKTsKICAgIH0KICAgIGlmIChrZXkuYWxnb3JpdGhtICYmIHVzYWdlID09PSAndmVyaWZ5JyAmJiBrZXkudHlwZSA9PT0gJ3ByaXZhdGUnKSB7CiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0YWcoa2V5KX0gaW5zdGFuY2VzIGZvciBhc3ltbWV0cmljIGFsZ29yaXRobSB2ZXJpZnlpbmcgbXVzdCBiZSBvZiB0eXBlICJwdWJsaWMiYCk7CiAgICB9CiAgICBpZiAoa2V5LmFsZ29yaXRobSAmJiB1c2FnZSA9PT0gJ2VuY3J5cHQnICYmIGtleS50eXBlID09PSAncHJpdmF0ZScpIHsKICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3RhZyhrZXkpfSBpbnN0YW5jZXMgZm9yIGFzeW1tZXRyaWMgYWxnb3JpdGhtIGVuY3J5cHRpb24gbXVzdCBiZSBvZiB0eXBlICJwdWJsaWMiYCk7CiAgICB9Cn07CmZ1bmN0aW9uIGNoZWNrS2V5VHlwZShhbGxvd0p3aywgYWxnLCBrZXksIHVzYWdlKSB7CiAgICBjb25zdCBzeW1tZXRyaWMgPSBhbGcuc3RhcnRzV2l0aCgnSFMnKSB8fAogICAgICAgIGFsZyA9PT0gJ2RpcicgfHwKICAgICAgICBhbGcuc3RhcnRzV2l0aCgnUEJFUzInKSB8fAogICAgICAgIC9eQVxkezN9KD86R0NNKT9LVyQvLnRlc3QoYWxnKTsKICAgIGlmIChzeW1tZXRyaWMpIHsKICAgICAgICBzeW1tZXRyaWNUeXBlQ2hlY2soYWxnLCBrZXksIHVzYWdlLCBhbGxvd0p3ayk7CiAgICB9CiAgICBlbHNlIHsKICAgICAgICBhc3ltbWV0cmljVHlwZUNoZWNrKGFsZywga2V5LCB1c2FnZSwgYWxsb3dKd2spOwogICAgfQp9CmNoZWNrS2V5VHlwZS5iaW5kKHVuZGVmaW5lZCwgZmFsc2UpOwpjb25zdCBjaGVja0tleVR5cGVXaXRoSndrID0gY2hlY2tLZXlUeXBlLmJpbmQodW5kZWZpbmVkLCB0cnVlKTsKCmZ1bmN0aW9uIHZhbGlkYXRlQ3JpdChFcnIsIHJlY29nbml6ZWREZWZhdWx0LCByZWNvZ25pemVkT3B0aW9uLCBwcm90ZWN0ZWRIZWFkZXIsIGpvc2VIZWFkZXIpIHsKICAgIGlmIChqb3NlSGVhZGVyLmNyaXQgIT09IHVuZGVmaW5lZCAmJiBwcm90ZWN0ZWRIZWFkZXI/LmNyaXQgPT09IHVuZGVmaW5lZCkgewogICAgICAgIHRocm93IG5ldyBFcnIoJyJjcml0IiAoQ3JpdGljYWwpIEhlYWRlciBQYXJhbWV0ZXIgTVVTVCBiZSBpbnRlZ3JpdHkgcHJvdGVjdGVkJyk7CiAgICB9CiAgICBpZiAoIXByb3RlY3RlZEhlYWRlciB8fCBwcm90ZWN0ZWRIZWFkZXIuY3JpdCA9PT0gdW5kZWZpbmVkKSB7CiAgICAgICAgcmV0dXJuIG5ldyBTZXQoKTsKICAgIH0KICAgIGlmICghQXJyYXkuaXNBcnJheShwcm90ZWN0ZWRIZWFkZXIuY3JpdCkgfHwKICAgICAgICBwcm90ZWN0ZWRIZWFkZXIuY3JpdC5sZW5ndGggPT09IDAgfHwKICAgICAgICBwcm90ZWN0ZWRIZWFkZXIuY3JpdC5zb21lKChpbnB1dCkgPT4gdHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJyB8fCBpbnB1dC5sZW5ndGggPT09IDApKSB7CiAgICAgICAgdGhyb3cgbmV3IEVycignImNyaXQiIChDcml0aWNhbCkgSGVhZGVyIFBhcmFtZXRlciBNVVNUIGJlIGFuIGFycmF5IG9mIG5vbi1lbXB0eSBzdHJpbmdzIHdoZW4gcHJlc2VudCcpOwogICAgfQogICAgbGV0IHJlY29nbml6ZWQ7CiAgICBpZiAocmVjb2duaXplZE9wdGlvbiAhPT0gdW5kZWZpbmVkKSB7CiAgICAgICAgcmVjb2duaXplZCA9IG5ldyBNYXAoWy4uLk9iamVjdC5lbnRyaWVzKHJlY29nbml6ZWRPcHRpb24pLCAuLi5yZWNvZ25pemVkRGVmYXVsdC5lbnRyaWVzKCldKTsKICAgIH0KICAgIGVsc2UgewogICAgICAgIHJlY29nbml6ZWQgPSByZWNvZ25pemVkRGVmYXVsdDsKICAgIH0KICAgIGZvciAoY29uc3QgcGFyYW1ldGVyIG9mIHByb3RlY3RlZEhlYWRlci5jcml0KSB7CiAgICAgICAgaWYgKCFyZWNvZ25pemVkLmhhcyhwYXJhbWV0ZXIpKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKGBFeHRlbnNpb24gSGVhZGVyIFBhcmFtZXRlciAiJHtwYXJhbWV0ZXJ9IiBpcyBub3QgcmVjb2duaXplZGApOwogICAgICAgIH0KICAgICAgICBpZiAoam9zZUhlYWRlcltwYXJhbWV0ZXJdID09PSB1bmRlZmluZWQpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycihgRXh0ZW5zaW9uIEhlYWRlciBQYXJhbWV0ZXIgIiR7cGFyYW1ldGVyfSIgaXMgbWlzc2luZ2ApOwogICAgICAgIH0KICAgICAgICBpZiAocmVjb2duaXplZC5nZXQocGFyYW1ldGVyKSAmJiBwcm90ZWN0ZWRIZWFkZXJbcGFyYW1ldGVyXSA9PT0gdW5kZWZpbmVkKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnIoYEV4dGVuc2lvbiBIZWFkZXIgUGFyYW1ldGVyICIke3BhcmFtZXRlcn0iIE1VU1QgYmUgaW50ZWdyaXR5IHByb3RlY3RlZGApOwogICAgICAgIH0KICAgIH0KICAgIHJldHVybiBuZXcgU2V0KHByb3RlY3RlZEhlYWRlci5jcml0KTsKfQoKY29uc3QgdmFsaWRhdGVBbGdvcml0aG1zID0gKG9wdGlvbiwgYWxnb3JpdGhtcykgPT4gewogICAgaWYgKGFsZ29yaXRobXMgIT09IHVuZGVmaW5lZCAmJgogICAgICAgICghQXJyYXkuaXNBcnJheShhbGdvcml0aG1zKSB8fCBhbGdvcml0aG1zLnNvbWUoKHMpID0+IHR5cGVvZiBzICE9PSAnc3RyaW5nJykpKSB7CiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgIiR7b3B0aW9ufSIgb3B0aW9uIG11c3QgYmUgYW4gYXJyYXkgb2Ygc3RyaW5nc2ApOwogICAgfQogICAgaWYgKCFhbGdvcml0aG1zKSB7CiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsKICAgIH0KICAgIHJldHVybiBuZXcgU2V0KGFsZ29yaXRobXMpOwp9Owp2YXIgdmFsaWRhdGVBbGdvcml0aG1zJDEgPSB2YWxpZGF0ZUFsZ29yaXRobXM7Cgpjb25zdCBrZXlUb0pXSyA9IGFzeW5jIChrZXkpID0+IHsKICAgIGlmIChrZXkgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7CiAgICAgICAgcmV0dXJuIHsKICAgICAgICAgICAga3R5OiAnb2N0JywKICAgICAgICAgICAgazogZW5jb2RlKGtleSksCiAgICAgICAgfTsKICAgIH0KICAgIGlmICghaXNDcnlwdG9LZXkoa2V5KSkgewogICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoaW52YWxpZEtleUlucHV0KGtleSwgLi4udHlwZXMsICdVaW50OEFycmF5JykpOwogICAgfQogICAgaWYgKCFrZXkuZXh0cmFjdGFibGUpIHsKICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub24tZXh0cmFjdGFibGUgQ3J5cHRvS2V5IGNhbm5vdCBiZSBleHBvcnRlZCBhcyBhIEpXSycpOwogICAgfQogICAgY29uc3QgeyBleHQsIGtleV9vcHMsIGFsZywgdXNlLCAuLi5qd2sgfSA9IGF3YWl0IGNyeXB0byQxLnN1YnRsZS5leHBvcnRLZXkoJ2p3aycsIGtleSk7CiAgICByZXR1cm4gandrOwp9Owp2YXIga2V5VG9KV0skMSA9IGtleVRvSldLOwoKYXN5bmMgZnVuY3Rpb24gZXhwb3J0SldLKGtleSkgewogICAgcmV0dXJuIGtleVRvSldLJDEoa2V5KTsKfQoKZnVuY3Rpb24gc3VidGxlRHNhKGFsZywgYWxnb3JpdGhtKSB7CiAgICBjb25zdCBoYXNoID0gYFNIQS0ke2FsZy5zbGljZSgtMyl9YDsKICAgIHN3aXRjaCAoYWxnKSB7CiAgICAgICAgY2FzZSAnSFMyNTYnOgogICAgICAgIGNhc2UgJ0hTMzg0JzoKICAgICAgICBjYXNlICdIUzUxMic6CiAgICAgICAgICAgIHJldHVybiB7IGhhc2gsIG5hbWU6ICdITUFDJyB9OwogICAgICAgIGNhc2UgJ1BTMjU2JzoKICAgICAgICBjYXNlICdQUzM4NCc6CiAgICAgICAgY2FzZSAnUFM1MTInOgogICAgICAgICAgICByZXR1cm4geyBoYXNoLCBuYW1lOiAnUlNBLVBTUycsIHNhbHRMZW5ndGg6IGFsZy5zbGljZSgtMykgPj4gMyB9OwogICAgICAgIGNhc2UgJ1JTMjU2JzoKICAgICAgICBjYXNlICdSUzM4NCc6CiAgICAgICAgY2FzZSAnUlM1MTInOgogICAgICAgICAgICByZXR1cm4geyBoYXNoLCBuYW1lOiAnUlNBU1NBLVBLQ1MxLXYxXzUnIH07CiAgICAgICAgY2FzZSAnRVMyNTYnOgogICAgICAgIGNhc2UgJ0VTMzg0JzoKICAgICAgICBjYXNlICdFUzUxMic6CiAgICAgICAgICAgIHJldHVybiB7IGhhc2gsIG5hbWU6ICdFQ0RTQScsIG5hbWVkQ3VydmU6IGFsZ29yaXRobS5uYW1lZEN1cnZlIH07CiAgICAgICAgY2FzZSAnRWQyNTUxOSc6CiAgICAgICAgICAgIHJldHVybiB7IG5hbWU6ICdFZDI1NTE5JyB9OwogICAgICAgIGNhc2UgJ0VkRFNBJzoKICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogYWxnb3JpdGhtLm5hbWUgfTsKICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZChgYWxnICR7YWxnfSBpcyBub3Qgc3VwcG9ydGVkIGVpdGhlciBieSBKT1NFIG9yIHlvdXIgamF2YXNjcmlwdCBydW50aW1lYCk7CiAgICB9Cn0KCmFzeW5jIGZ1bmN0aW9uIGdldENyeXB0b0tleShhbGcsIGtleSwgdXNhZ2UpIHsKICAgIGlmICh1c2FnZSA9PT0gJ3NpZ24nKSB7CiAgICAgICAga2V5ID0gYXdhaXQgbm9ybWFsaXplLm5vcm1hbGl6ZVByaXZhdGVLZXkoa2V5LCBhbGcpOwogICAgfQogICAgaWYgKHVzYWdlID09PSAndmVyaWZ5JykgewogICAgICAgIGtleSA9IGF3YWl0IG5vcm1hbGl6ZS5ub3JtYWxpemVQdWJsaWNLZXkoa2V5LCBhbGcpOwogICAgfQogICAgaWYgKGlzQ3J5cHRvS2V5KGtleSkpIHsKICAgICAgICBjaGVja1NpZ0NyeXB0b0tleShrZXksIGFsZywgdXNhZ2UpOwogICAgICAgIHJldHVybiBrZXk7CiAgICB9CiAgICBpZiAoa2V5IGluc3RhbmNlb2YgVWludDhBcnJheSkgewogICAgICAgIGlmICghYWxnLnN0YXJ0c1dpdGgoJ0hTJykpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihpbnZhbGlkS2V5SW5wdXQoa2V5LCAuLi50eXBlcykpOwogICAgICAgIH0KICAgICAgICByZXR1cm4gY3J5cHRvJDEuc3VidGxlLmltcG9ydEtleSgncmF3Jywga2V5LCB7IGhhc2g6IGBTSEEtJHthbGcuc2xpY2UoLTMpfWAsIG5hbWU6ICdITUFDJyB9LCBmYWxzZSwgW3VzYWdlXSk7CiAgICB9CiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGludmFsaWRLZXlJbnB1dChrZXksIC4uLnR5cGVzLCAnVWludDhBcnJheScsICdKU09OIFdlYiBLZXknKSk7Cn0KCmNvbnN0IHZlcmlmeSA9IGFzeW5jIChhbGcsIGtleSwgc2lnbmF0dXJlLCBkYXRhKSA9PiB7CiAgICBjb25zdCBjcnlwdG9LZXkgPSBhd2FpdCBnZXRDcnlwdG9LZXkoYWxnLCBrZXksICd2ZXJpZnknKTsKICAgIGNoZWNrS2V5TGVuZ3RoKGFsZywgY3J5cHRvS2V5KTsKICAgIGNvbnN0IGFsZ29yaXRobSA9IHN1YnRsZURzYShhbGcsIGNyeXB0b0tleS5hbGdvcml0aG0pOwogICAgdHJ5IHsKICAgICAgICByZXR1cm4gYXdhaXQgY3J5cHRvJDEuc3VidGxlLnZlcmlmeShhbGdvcml0aG0sIGNyeXB0b0tleSwgc2lnbmF0dXJlLCBkYXRhKTsKICAgIH0KICAgIGNhdGNoIHsKICAgICAgICByZXR1cm4gZmFsc2U7CiAgICB9Cn07CnZhciB2ZXJpZnkkMSA9IHZlcmlmeTsKCmFzeW5jIGZ1bmN0aW9uIGZsYXR0ZW5lZFZlcmlmeShqd3MsIGtleSwgb3B0aW9ucykgewogICAgaWYgKCFpc09iamVjdChqd3MpKSB7CiAgICAgICAgdGhyb3cgbmV3IEpXU0ludmFsaWQoJ0ZsYXR0ZW5lZCBKV1MgbXVzdCBiZSBhbiBvYmplY3QnKTsKICAgIH0KICAgIGlmIChqd3MucHJvdGVjdGVkID09PSB1bmRlZmluZWQgJiYgandzLmhlYWRlciA9PT0gdW5kZWZpbmVkKSB7CiAgICAgICAgdGhyb3cgbmV3IEpXU0ludmFsaWQoJ0ZsYXR0ZW5lZCBKV1MgbXVzdCBoYXZlIGVpdGhlciBvZiB0aGUgInByb3RlY3RlZCIgb3IgImhlYWRlciIgbWVtYmVycycpOwogICAgfQogICAgaWYgKGp3cy5wcm90ZWN0ZWQgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgandzLnByb3RlY3RlZCAhPT0gJ3N0cmluZycpIHsKICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnSldTIFByb3RlY3RlZCBIZWFkZXIgaW5jb3JyZWN0IHR5cGUnKTsKICAgIH0KICAgIGlmIChqd3MucGF5bG9hZCA9PT0gdW5kZWZpbmVkKSB7CiAgICAgICAgdGhyb3cgbmV3IEpXU0ludmFsaWQoJ0pXUyBQYXlsb2FkIG1pc3NpbmcnKTsKICAgIH0KICAgIGlmICh0eXBlb2YgandzLnNpZ25hdHVyZSAhPT0gJ3N0cmluZycpIHsKICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnSldTIFNpZ25hdHVyZSBtaXNzaW5nIG9yIGluY29ycmVjdCB0eXBlJyk7CiAgICB9CiAgICBpZiAoandzLmhlYWRlciAhPT0gdW5kZWZpbmVkICYmICFpc09iamVjdChqd3MuaGVhZGVyKSkgewogICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdKV1MgVW5wcm90ZWN0ZWQgSGVhZGVyIGluY29ycmVjdCB0eXBlJyk7CiAgICB9CiAgICBsZXQgcGFyc2VkUHJvdCA9IHt9OwogICAgaWYgKGp3cy5wcm90ZWN0ZWQpIHsKICAgICAgICB0cnkgewogICAgICAgICAgICBjb25zdCBwcm90ZWN0ZWRIZWFkZXIgPSBkZWNvZGUkMShqd3MucHJvdGVjdGVkKTsKICAgICAgICAgICAgcGFyc2VkUHJvdCA9IEpTT04ucGFyc2UoZGVjb2Rlci5kZWNvZGUocHJvdGVjdGVkSGVhZGVyKSk7CiAgICAgICAgfQogICAgICAgIGNhdGNoIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXU0ludmFsaWQoJ0pXUyBQcm90ZWN0ZWQgSGVhZGVyIGlzIGludmFsaWQnKTsKICAgICAgICB9CiAgICB9CiAgICBpZiAoIWlzRGlzam9pbnQkMShwYXJzZWRQcm90LCBqd3MuaGVhZGVyKSkgewogICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdKV1MgUHJvdGVjdGVkIGFuZCBKV1MgVW5wcm90ZWN0ZWQgSGVhZGVyIFBhcmFtZXRlciBuYW1lcyBtdXN0IGJlIGRpc2pvaW50Jyk7CiAgICB9CiAgICBjb25zdCBqb3NlSGVhZGVyID0gewogICAgICAgIC4uLnBhcnNlZFByb3QsCiAgICAgICAgLi4uandzLmhlYWRlciwKICAgIH07CiAgICBjb25zdCBleHRlbnNpb25zID0gdmFsaWRhdGVDcml0KEpXU0ludmFsaWQsIG5ldyBNYXAoW1snYjY0JywgdHJ1ZV1dKSwgb3B0aW9ucz8uY3JpdCwgcGFyc2VkUHJvdCwgam9zZUhlYWRlcik7CiAgICBsZXQgYjY0ID0gdHJ1ZTsKICAgIGlmIChleHRlbnNpb25zLmhhcygnYjY0JykpIHsKICAgICAgICBiNjQgPSBwYXJzZWRQcm90LmI2NDsKICAgICAgICBpZiAodHlwZW9mIGI2NCAhPT0gJ2Jvb2xlYW4nKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdUaGUgImI2NCIgKGJhc2U2NHVybC1lbmNvZGUgcGF5bG9hZCkgSGVhZGVyIFBhcmFtZXRlciBtdXN0IGJlIGEgYm9vbGVhbicpOwogICAgICAgIH0KICAgIH0KICAgIGNvbnN0IHsgYWxnIH0gPSBqb3NlSGVhZGVyOwogICAgaWYgKHR5cGVvZiBhbGcgIT09ICdzdHJpbmcnIHx8ICFhbGcpIHsKICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnSldTICJhbGciIChBbGdvcml0aG0pIEhlYWRlciBQYXJhbWV0ZXIgbWlzc2luZyBvciBpbnZhbGlkJyk7CiAgICB9CiAgICBjb25zdCBhbGdvcml0aG1zID0gb3B0aW9ucyAmJiB2YWxpZGF0ZUFsZ29yaXRobXMkMSgnYWxnb3JpdGhtcycsIG9wdGlvbnMuYWxnb3JpdGhtcyk7CiAgICBpZiAoYWxnb3JpdGhtcyAmJiAhYWxnb3JpdGhtcy5oYXMoYWxnKSkgewogICAgICAgIHRocm93IG5ldyBKT1NFQWxnTm90QWxsb3dlZCgnImFsZyIgKEFsZ29yaXRobSkgSGVhZGVyIFBhcmFtZXRlciB2YWx1ZSBub3QgYWxsb3dlZCcpOwogICAgfQogICAgaWYgKGI2NCkgewogICAgICAgIGlmICh0eXBlb2YgandzLnBheWxvYWQgIT09ICdzdHJpbmcnKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdKV1MgUGF5bG9hZCBtdXN0IGJlIGEgc3RyaW5nJyk7CiAgICAgICAgfQogICAgfQogICAgZWxzZSBpZiAodHlwZW9mIGp3cy5wYXlsb2FkICE9PSAnc3RyaW5nJyAmJiAhKGp3cy5wYXlsb2FkIGluc3RhbmNlb2YgVWludDhBcnJheSkpIHsKICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnSldTIFBheWxvYWQgbXVzdCBiZSBhIHN0cmluZyBvciBhbiBVaW50OEFycmF5IGluc3RhbmNlJyk7CiAgICB9CiAgICBsZXQgcmVzb2x2ZWRLZXkgPSBmYWxzZTsKICAgIGlmICh0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nKSB7CiAgICAgICAga2V5ID0gYXdhaXQga2V5KHBhcnNlZFByb3QsIGp3cyk7CiAgICAgICAgcmVzb2x2ZWRLZXkgPSB0cnVlOwogICAgICAgIGNoZWNrS2V5VHlwZVdpdGhKd2soYWxnLCBrZXksICd2ZXJpZnknKTsKICAgICAgICBpZiAoaXNKV0soa2V5KSkgewogICAgICAgICAgICBrZXkgPSBhd2FpdCBpbXBvcnRKV0soa2V5LCBhbGcpOwogICAgICAgIH0KICAgIH0KICAgIGVsc2UgewogICAgICAgIGNoZWNrS2V5VHlwZVdpdGhKd2soYWxnLCBrZXksICd2ZXJpZnknKTsKICAgIH0KICAgIGNvbnN0IGRhdGEgPSBjb25jYXQoZW5jb2Rlci5lbmNvZGUoandzLnByb3RlY3RlZCA/PyAnJyksIGVuY29kZXIuZW5jb2RlKCcuJyksIHR5cGVvZiBqd3MucGF5bG9hZCA9PT0gJ3N0cmluZycgPyBlbmNvZGVyLmVuY29kZShqd3MucGF5bG9hZCkgOiBqd3MucGF5bG9hZCk7CiAgICBsZXQgc2lnbmF0dXJlOwogICAgdHJ5IHsKICAgICAgICBzaWduYXR1cmUgPSBkZWNvZGUkMShqd3Muc2lnbmF0dXJlKTsKICAgIH0KICAgIGNhdGNoIHsKICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnRmFpbGVkIHRvIGJhc2U2NHVybCBkZWNvZGUgdGhlIHNpZ25hdHVyZScpOwogICAgfQogICAgY29uc3QgdmVyaWZpZWQgPSBhd2FpdCB2ZXJpZnkkMShhbGcsIGtleSwgc2lnbmF0dXJlLCBkYXRhKTsKICAgIGlmICghdmVyaWZpZWQpIHsKICAgICAgICB0aHJvdyBuZXcgSldTU2lnbmF0dXJlVmVyaWZpY2F0aW9uRmFpbGVkKCk7CiAgICB9CiAgICBsZXQgcGF5bG9hZDsKICAgIGlmIChiNjQpIHsKICAgICAgICB0cnkgewogICAgICAgICAgICBwYXlsb2FkID0gZGVjb2RlJDEoandzLnBheWxvYWQpOwogICAgICAgIH0KICAgICAgICBjYXRjaCB7CiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdGYWlsZWQgdG8gYmFzZTY0dXJsIGRlY29kZSB0aGUgcGF5bG9hZCcpOwogICAgICAgIH0KICAgIH0KICAgIGVsc2UgaWYgKHR5cGVvZiBqd3MucGF5bG9hZCA9PT0gJ3N0cmluZycpIHsKICAgICAgICBwYXlsb2FkID0gZW5jb2Rlci5lbmNvZGUoandzLnBheWxvYWQpOwogICAgfQogICAgZWxzZSB7CiAgICAgICAgcGF5bG9hZCA9IGp3cy5wYXlsb2FkOwogICAgfQogICAgY29uc3QgcmVzdWx0ID0geyBwYXlsb2FkIH07CiAgICBpZiAoandzLnByb3RlY3RlZCAhPT0gdW5kZWZpbmVkKSB7CiAgICAgICAgcmVzdWx0LnByb3RlY3RlZEhlYWRlciA9IHBhcnNlZFByb3Q7CiAgICB9CiAgICBpZiAoandzLmhlYWRlciAhPT0gdW5kZWZpbmVkKSB7CiAgICAgICAgcmVzdWx0LnVucHJvdGVjdGVkSGVhZGVyID0gandzLmhlYWRlcjsKICAgIH0KICAgIGlmIChyZXNvbHZlZEtleSkgewogICAgICAgIHJldHVybiB7IC4uLnJlc3VsdCwga2V5IH07CiAgICB9CiAgICByZXR1cm4gcmVzdWx0Owp9Cgphc3luYyBmdW5jdGlvbiBjb21wYWN0VmVyaWZ5KGp3cywga2V5LCBvcHRpb25zKSB7CiAgICBpZiAoandzIGluc3RhbmNlb2YgVWludDhBcnJheSkgewogICAgICAgIGp3cyA9IGRlY29kZXIuZGVjb2RlKGp3cyk7CiAgICB9CiAgICBpZiAodHlwZW9mIGp3cyAhPT0gJ3N0cmluZycpIHsKICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnQ29tcGFjdCBKV1MgbXVzdCBiZSBhIHN0cmluZyBvciBVaW50OEFycmF5Jyk7CiAgICB9CiAgICBjb25zdCB7IDA6IHByb3RlY3RlZEhlYWRlciwgMTogcGF5bG9hZCwgMjogc2lnbmF0dXJlLCBsZW5ndGggfSA9IGp3cy5zcGxpdCgnLicpOwogICAgaWYgKGxlbmd0aCAhPT0gMykgewogICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdJbnZhbGlkIENvbXBhY3QgSldTJyk7CiAgICB9CiAgICBjb25zdCB2ZXJpZmllZCA9IGF3YWl0IGZsYXR0ZW5lZFZlcmlmeSh7IHBheWxvYWQsIHByb3RlY3RlZDogcHJvdGVjdGVkSGVhZGVyLCBzaWduYXR1cmUgfSwga2V5LCBvcHRpb25zKTsKICAgIGNvbnN0IHJlc3VsdCA9IHsgcGF5bG9hZDogdmVyaWZpZWQucGF5bG9hZCwgcHJvdGVjdGVkSGVhZGVyOiB2ZXJpZmllZC5wcm90ZWN0ZWRIZWFkZXIgfTsKICAgIGlmICh0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgcmV0dXJuIHsgLi4ucmVzdWx0LCBrZXk6IHZlcmlmaWVkLmtleSB9OwogICAgfQogICAgcmV0dXJuIHJlc3VsdDsKfQoKdmFyIGVwb2NoID0gKGRhdGUpID0+IE1hdGguZmxvb3IoZGF0ZS5nZXRUaW1lKCkgLyAxMDAwKTsKCmNvbnN0IG1pbnV0ZSA9IDYwOwpjb25zdCBob3VyID0gbWludXRlICogNjA7CmNvbnN0IGRheSA9IGhvdXIgKiAyNDsKY29uc3Qgd2VlayA9IGRheSAqIDc7CmNvbnN0IHllYXIgPSBkYXkgKiAzNjUuMjU7CmNvbnN0IFJFR0VYID0gL14oXCt8XC0pPyA/KFxkK3xcZCtcLlxkKykgPyhzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHdlZWtzP3x3fHllYXJzP3x5cnM/fHkpKD86IChhZ298ZnJvbSBub3cpKT8kL2k7CnZhciBzZWNzID0gKHN0cikgPT4gewogICAgY29uc3QgbWF0Y2hlZCA9IFJFR0VYLmV4ZWMoc3RyKTsKICAgIGlmICghbWF0Y2hlZCB8fCAobWF0Y2hlZFs0XSAmJiBtYXRjaGVkWzFdKSkgewogICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgdGltZSBwZXJpb2QgZm9ybWF0Jyk7CiAgICB9CiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQobWF0Y2hlZFsyXSk7CiAgICBjb25zdCB1bml0ID0gbWF0Y2hlZFszXS50b0xvd2VyQ2FzZSgpOwogICAgbGV0IG51bWVyaWNEYXRlOwogICAgc3dpdGNoICh1bml0KSB7CiAgICAgICAgY2FzZSAnc2VjJzoKICAgICAgICBjYXNlICdzZWNzJzoKICAgICAgICBjYXNlICdzZWNvbmQnOgogICAgICAgIGNhc2UgJ3NlY29uZHMnOgogICAgICAgIGNhc2UgJ3MnOgogICAgICAgICAgICBudW1lcmljRGF0ZSA9IE1hdGgucm91bmQodmFsdWUpOwogICAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICdtaW51dGUnOgogICAgICAgIGNhc2UgJ21pbnV0ZXMnOgogICAgICAgIGNhc2UgJ21pbic6CiAgICAgICAgY2FzZSAnbWlucyc6CiAgICAgICAgY2FzZSAnbSc6CiAgICAgICAgICAgIG51bWVyaWNEYXRlID0gTWF0aC5yb3VuZCh2YWx1ZSAqIG1pbnV0ZSk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ2hvdXInOgogICAgICAgIGNhc2UgJ2hvdXJzJzoKICAgICAgICBjYXNlICdocic6CiAgICAgICAgY2FzZSAnaHJzJzoKICAgICAgICBjYXNlICdoJzoKICAgICAgICAgICAgbnVtZXJpY0RhdGUgPSBNYXRoLnJvdW5kKHZhbHVlICogaG91cik7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ2RheSc6CiAgICAgICAgY2FzZSAnZGF5cyc6CiAgICAgICAgY2FzZSAnZCc6CiAgICAgICAgICAgIG51bWVyaWNEYXRlID0gTWF0aC5yb3VuZCh2YWx1ZSAqIGRheSk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ3dlZWsnOgogICAgICAgIGNhc2UgJ3dlZWtzJzoKICAgICAgICBjYXNlICd3JzoKICAgICAgICAgICAgbnVtZXJpY0RhdGUgPSBNYXRoLnJvdW5kKHZhbHVlICogd2Vlayk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgIG51bWVyaWNEYXRlID0gTWF0aC5yb3VuZCh2YWx1ZSAqIHllYXIpOwogICAgICAgICAgICBicmVhazsKICAgIH0KICAgIGlmIChtYXRjaGVkWzFdID09PSAnLScgfHwgbWF0Y2hlZFs0XSA9PT0gJ2FnbycpIHsKICAgICAgICByZXR1cm4gLW51bWVyaWNEYXRlOwogICAgfQogICAgcmV0dXJuIG51bWVyaWNEYXRlOwp9OwoKY29uc3Qgbm9ybWFsaXplVHlwID0gKHZhbHVlKSA9PiB2YWx1ZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL15hcHBsaWNhdGlvblwvLywgJycpOwpjb25zdCBjaGVja0F1ZGllbmNlUHJlc2VuY2UgPSAoYXVkUGF5bG9hZCwgYXVkT3B0aW9uKSA9PiB7CiAgICBpZiAodHlwZW9mIGF1ZFBheWxvYWQgPT09ICdzdHJpbmcnKSB7CiAgICAgICAgcmV0dXJuIGF1ZE9wdGlvbi5pbmNsdWRlcyhhdWRQYXlsb2FkKTsKICAgIH0KICAgIGlmIChBcnJheS5pc0FycmF5KGF1ZFBheWxvYWQpKSB7CiAgICAgICAgcmV0dXJuIGF1ZE9wdGlvbi5zb21lKFNldC5wcm90b3R5cGUuaGFzLmJpbmQobmV3IFNldChhdWRQYXlsb2FkKSkpOwogICAgfQogICAgcmV0dXJuIGZhbHNlOwp9Owp2YXIgand0UGF5bG9hZCA9IChwcm90ZWN0ZWRIZWFkZXIsIGVuY29kZWRQYXlsb2FkLCBvcHRpb25zID0ge30pID0+IHsKICAgIGxldCBwYXlsb2FkOwogICAgdHJ5IHsKICAgICAgICBwYXlsb2FkID0gSlNPTi5wYXJzZShkZWNvZGVyLmRlY29kZShlbmNvZGVkUGF5bG9hZCkpOwogICAgfQogICAgY2F0Y2ggewogICAgfQogICAgaWYgKCFpc09iamVjdChwYXlsb2FkKSkgewogICAgICAgIHRocm93IG5ldyBKV1RJbnZhbGlkKCdKV1QgQ2xhaW1zIFNldCBtdXN0IGJlIGEgdG9wLWxldmVsIEpTT04gb2JqZWN0Jyk7CiAgICB9CiAgICBjb25zdCB7IHR5cCB9ID0gb3B0aW9uczsKICAgIGlmICh0eXAgJiYKICAgICAgICAodHlwZW9mIHByb3RlY3RlZEhlYWRlci50eXAgIT09ICdzdHJpbmcnIHx8CiAgICAgICAgICAgIG5vcm1hbGl6ZVR5cChwcm90ZWN0ZWRIZWFkZXIudHlwKSAhPT0gbm9ybWFsaXplVHlwKHR5cCkpKSB7CiAgICAgICAgdGhyb3cgbmV3IEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCgndW5leHBlY3RlZCAidHlwIiBKV1QgaGVhZGVyIHZhbHVlJywgcGF5bG9hZCwgJ3R5cCcsICdjaGVja19mYWlsZWQnKTsKICAgIH0KICAgIGNvbnN0IHsgcmVxdWlyZWRDbGFpbXMgPSBbXSwgaXNzdWVyLCBzdWJqZWN0LCBhdWRpZW5jZSwgbWF4VG9rZW5BZ2UgfSA9IG9wdGlvbnM7CiAgICBjb25zdCBwcmVzZW5jZUNoZWNrID0gWy4uLnJlcXVpcmVkQ2xhaW1zXTsKICAgIGlmIChtYXhUb2tlbkFnZSAhPT0gdW5kZWZpbmVkKQogICAgICAgIHByZXNlbmNlQ2hlY2sucHVzaCgnaWF0Jyk7CiAgICBpZiAoYXVkaWVuY2UgIT09IHVuZGVmaW5lZCkKICAgICAgICBwcmVzZW5jZUNoZWNrLnB1c2goJ2F1ZCcpOwogICAgaWYgKHN1YmplY3QgIT09IHVuZGVmaW5lZCkKICAgICAgICBwcmVzZW5jZUNoZWNrLnB1c2goJ3N1YicpOwogICAgaWYgKGlzc3VlciAhPT0gdW5kZWZpbmVkKQogICAgICAgIHByZXNlbmNlQ2hlY2sucHVzaCgnaXNzJyk7CiAgICBmb3IgKGNvbnN0IGNsYWltIG9mIG5ldyBTZXQocHJlc2VuY2VDaGVjay5yZXZlcnNlKCkpKSB7CiAgICAgICAgaWYgKCEoY2xhaW0gaW4gcGF5bG9hZCkpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZChgbWlzc2luZyByZXF1aXJlZCAiJHtjbGFpbX0iIGNsYWltYCwgcGF5bG9hZCwgY2xhaW0sICdtaXNzaW5nJyk7CiAgICAgICAgfQogICAgfQogICAgaWYgKGlzc3VlciAmJgogICAgICAgICEoQXJyYXkuaXNBcnJheShpc3N1ZXIpID8gaXNzdWVyIDogW2lzc3Vlcl0pLmluY2x1ZGVzKHBheWxvYWQuaXNzKSkgewogICAgICAgIHRocm93IG5ldyBKV1RDbGFpbVZhbGlkYXRpb25GYWlsZWQoJ3VuZXhwZWN0ZWQgImlzcyIgY2xhaW0gdmFsdWUnLCBwYXlsb2FkLCAnaXNzJywgJ2NoZWNrX2ZhaWxlZCcpOwogICAgfQogICAgaWYgKHN1YmplY3QgJiYgcGF5bG9hZC5zdWIgIT09IHN1YmplY3QpIHsKICAgICAgICB0aHJvdyBuZXcgSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkKCd1bmV4cGVjdGVkICJzdWIiIGNsYWltIHZhbHVlJywgcGF5bG9hZCwgJ3N1YicsICdjaGVja19mYWlsZWQnKTsKICAgIH0KICAgIGlmIChhdWRpZW5jZSAmJgogICAgICAgICFjaGVja0F1ZGllbmNlUHJlc2VuY2UocGF5bG9hZC5hdWQsIHR5cGVvZiBhdWRpZW5jZSA9PT0gJ3N0cmluZycgPyBbYXVkaWVuY2VdIDogYXVkaWVuY2UpKSB7CiAgICAgICAgdGhyb3cgbmV3IEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCgndW5leHBlY3RlZCAiYXVkIiBjbGFpbSB2YWx1ZScsIHBheWxvYWQsICdhdWQnLCAnY2hlY2tfZmFpbGVkJyk7CiAgICB9CiAgICBsZXQgdG9sZXJhbmNlOwogICAgc3dpdGNoICh0eXBlb2Ygb3B0aW9ucy5jbG9ja1RvbGVyYW5jZSkgewogICAgICAgIGNhc2UgJ3N0cmluZyc6CiAgICAgICAgICAgIHRvbGVyYW5jZSA9IHNlY3Mob3B0aW9ucy5jbG9ja1RvbGVyYW5jZSk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ251bWJlcic6CiAgICAgICAgICAgIHRvbGVyYW5jZSA9IG9wdGlvbnMuY2xvY2tUb2xlcmFuY2U7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6CiAgICAgICAgICAgIHRvbGVyYW5jZSA9IDA7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2xvY2tUb2xlcmFuY2Ugb3B0aW9uIHR5cGUnKTsKICAgIH0KICAgIGNvbnN0IHsgY3VycmVudERhdGUgfSA9IG9wdGlvbnM7CiAgICBjb25zdCBub3cgPSBlcG9jaChjdXJyZW50RGF0ZSB8fCBuZXcgRGF0ZSgpKTsKICAgIGlmICgocGF5bG9hZC5pYXQgIT09IHVuZGVmaW5lZCB8fCBtYXhUb2tlbkFnZSkgJiYgdHlwZW9mIHBheWxvYWQuaWF0ICE9PSAnbnVtYmVyJykgewogICAgICAgIHRocm93IG5ldyBKV1RDbGFpbVZhbGlkYXRpb25GYWlsZWQoJyJpYXQiIGNsYWltIG11c3QgYmUgYSBudW1iZXInLCBwYXlsb2FkLCAnaWF0JywgJ2ludmFsaWQnKTsKICAgIH0KICAgIGlmIChwYXlsb2FkLm5iZiAhPT0gdW5kZWZpbmVkKSB7CiAgICAgICAgaWYgKHR5cGVvZiBwYXlsb2FkLm5iZiAhPT0gJ251bWJlcicpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCgnIm5iZiIgY2xhaW0gbXVzdCBiZSBhIG51bWJlcicsIHBheWxvYWQsICduYmYnLCAnaW52YWxpZCcpOwogICAgICAgIH0KICAgICAgICBpZiAocGF5bG9hZC5uYmYgPiBub3cgKyB0b2xlcmFuY2UpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCgnIm5iZiIgY2xhaW0gdGltZXN0YW1wIGNoZWNrIGZhaWxlZCcsIHBheWxvYWQsICduYmYnLCAnY2hlY2tfZmFpbGVkJyk7CiAgICAgICAgfQogICAgfQogICAgaWYgKHBheWxvYWQuZXhwICE9PSB1bmRlZmluZWQpIHsKICAgICAgICBpZiAodHlwZW9mIHBheWxvYWQuZXhwICE9PSAnbnVtYmVyJykgewogICAgICAgICAgICB0aHJvdyBuZXcgSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkKCciZXhwIiBjbGFpbSBtdXN0IGJlIGEgbnVtYmVyJywgcGF5bG9hZCwgJ2V4cCcsICdpbnZhbGlkJyk7CiAgICAgICAgfQogICAgICAgIGlmIChwYXlsb2FkLmV4cCA8PSBub3cgLSB0b2xlcmFuY2UpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXVEV4cGlyZWQoJyJleHAiIGNsYWltIHRpbWVzdGFtcCBjaGVjayBmYWlsZWQnLCBwYXlsb2FkLCAnZXhwJywgJ2NoZWNrX2ZhaWxlZCcpOwogICAgICAgIH0KICAgIH0KICAgIGlmIChtYXhUb2tlbkFnZSkgewogICAgICAgIGNvbnN0IGFnZSA9IG5vdyAtIHBheWxvYWQuaWF0OwogICAgICAgIGNvbnN0IG1heCA9IHR5cGVvZiBtYXhUb2tlbkFnZSA9PT0gJ251bWJlcicgPyBtYXhUb2tlbkFnZSA6IHNlY3MobWF4VG9rZW5BZ2UpOwogICAgICAgIGlmIChhZ2UgLSB0b2xlcmFuY2UgPiBtYXgpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXVEV4cGlyZWQoJyJpYXQiIGNsYWltIHRpbWVzdGFtcCBjaGVjayBmYWlsZWQgKHRvbyBmYXIgaW4gdGhlIHBhc3QpJywgcGF5bG9hZCwgJ2lhdCcsICdjaGVja19mYWlsZWQnKTsKICAgICAgICB9CiAgICAgICAgaWYgKGFnZSA8IDAgLSB0b2xlcmFuY2UpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCgnImlhdCIgY2xhaW0gdGltZXN0YW1wIGNoZWNrIGZhaWxlZCAoaXQgc2hvdWxkIGJlIGluIHRoZSBwYXN0KScsIHBheWxvYWQsICdpYXQnLCAnY2hlY2tfZmFpbGVkJyk7CiAgICAgICAgfQogICAgfQogICAgcmV0dXJuIHBheWxvYWQ7Cn07Cgphc3luYyBmdW5jdGlvbiBqd3RWZXJpZnkoand0LCBrZXksIG9wdGlvbnMpIHsKICAgIGNvbnN0IHZlcmlmaWVkID0gYXdhaXQgY29tcGFjdFZlcmlmeShqd3QsIGtleSwgb3B0aW9ucyk7CiAgICBpZiAodmVyaWZpZWQucHJvdGVjdGVkSGVhZGVyLmNyaXQ/LmluY2x1ZGVzKCdiNjQnKSAmJiB2ZXJpZmllZC5wcm90ZWN0ZWRIZWFkZXIuYjY0ID09PSBmYWxzZSkgewogICAgICAgIHRocm93IG5ldyBKV1RJbnZhbGlkKCdKV1RzIE1VU1QgTk9UIHVzZSB1bmVuY29kZWQgcGF5bG9hZCcpOwogICAgfQogICAgY29uc3QgcGF5bG9hZCA9IGp3dFBheWxvYWQodmVyaWZpZWQucHJvdGVjdGVkSGVhZGVyLCB2ZXJpZmllZC5wYXlsb2FkLCBvcHRpb25zKTsKICAgIGNvbnN0IHJlc3VsdCA9IHsgcGF5bG9hZCwgcHJvdGVjdGVkSGVhZGVyOiB2ZXJpZmllZC5wcm90ZWN0ZWRIZWFkZXIgfTsKICAgIGlmICh0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgcmV0dXJuIHsgLi4ucmVzdWx0LCBrZXk6IHZlcmlmaWVkLmtleSB9OwogICAgfQogICAgcmV0dXJuIHJlc3VsdDsKfQoKY29uc3Qgc2lnbiA9IGFzeW5jIChhbGcsIGtleSwgZGF0YSkgPT4gewogICAgY29uc3QgY3J5cHRvS2V5ID0gYXdhaXQgZ2V0Q3J5cHRvS2V5KGFsZywga2V5LCAnc2lnbicpOwogICAgY2hlY2tLZXlMZW5ndGgoYWxnLCBjcnlwdG9LZXkpOwogICAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgY3J5cHRvJDEuc3VidGxlLnNpZ24oc3VidGxlRHNhKGFsZywgY3J5cHRvS2V5LmFsZ29yaXRobSksIGNyeXB0b0tleSwgZGF0YSk7CiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoc2lnbmF0dXJlKTsKfTsKdmFyIHNpZ24kMSA9IHNpZ247CgpjbGFzcyBGbGF0dGVuZWRTaWduIHsKICAgIGNvbnN0cnVjdG9yKHBheWxvYWQpIHsKICAgICAgICBpZiAoIShwYXlsb2FkIGluc3RhbmNlb2YgVWludDhBcnJheSkpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGF5bG9hZCBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIFVpbnQ4QXJyYXknKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHBheWxvYWQ7CiAgICB9CiAgICBzZXRQcm90ZWN0ZWRIZWFkZXIocHJvdGVjdGVkSGVhZGVyKSB7CiAgICAgICAgaWYgKHRoaXMuX3Byb3RlY3RlZEhlYWRlcikgewogICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZXRQcm90ZWN0ZWRIZWFkZXIgY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UnKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyID0gcHJvdGVjdGVkSGVhZGVyOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfQogICAgc2V0VW5wcm90ZWN0ZWRIZWFkZXIodW5wcm90ZWN0ZWRIZWFkZXIpIHsKICAgICAgICBpZiAodGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2V0VW5wcm90ZWN0ZWRIZWFkZXIgY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UnKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIgPSB1bnByb3RlY3RlZEhlYWRlcjsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0KICAgIGFzeW5jIHNpZ24oa2V5LCBvcHRpb25zKSB7CiAgICAgICAgaWYgKCF0aGlzLl9wcm90ZWN0ZWRIZWFkZXIgJiYgIXRoaXMuX3VucHJvdGVjdGVkSGVhZGVyKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdlaXRoZXIgc2V0UHJvdGVjdGVkSGVhZGVyIG9yIHNldFVucHJvdGVjdGVkSGVhZGVyIG11c3QgYmUgY2FsbGVkIGJlZm9yZSAjc2lnbigpJyk7CiAgICAgICAgfQogICAgICAgIGlmICghaXNEaXNqb2ludCQxKHRoaXMuX3Byb3RlY3RlZEhlYWRlciwgdGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIpKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdKV1MgUHJvdGVjdGVkIGFuZCBKV1MgVW5wcm90ZWN0ZWQgSGVhZGVyIFBhcmFtZXRlciBuYW1lcyBtdXN0IGJlIGRpc2pvaW50Jyk7CiAgICAgICAgfQogICAgICAgIGNvbnN0IGpvc2VIZWFkZXIgPSB7CiAgICAgICAgICAgIC4uLnRoaXMuX3Byb3RlY3RlZEhlYWRlciwKICAgICAgICAgICAgLi4udGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIsCiAgICAgICAgfTsKICAgICAgICBjb25zdCBleHRlbnNpb25zID0gdmFsaWRhdGVDcml0KEpXU0ludmFsaWQsIG5ldyBNYXAoW1snYjY0JywgdHJ1ZV1dKSwgb3B0aW9ucz8uY3JpdCwgdGhpcy5fcHJvdGVjdGVkSGVhZGVyLCBqb3NlSGVhZGVyKTsKICAgICAgICBsZXQgYjY0ID0gdHJ1ZTsKICAgICAgICBpZiAoZXh0ZW5zaW9ucy5oYXMoJ2I2NCcpKSB7CiAgICAgICAgICAgIGI2NCA9IHRoaXMuX3Byb3RlY3RlZEhlYWRlci5iNjQ7CiAgICAgICAgICAgIGlmICh0eXBlb2YgYjY0ICE9PSAnYm9vbGVhbicpIHsKICAgICAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdUaGUgImI2NCIgKGJhc2U2NHVybC1lbmNvZGUgcGF5bG9hZCkgSGVhZGVyIFBhcmFtZXRlciBtdXN0IGJlIGEgYm9vbGVhbicpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIGNvbnN0IHsgYWxnIH0gPSBqb3NlSGVhZGVyOwogICAgICAgIGlmICh0eXBlb2YgYWxnICE9PSAnc3RyaW5nJyB8fCAhYWxnKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdKV1MgImFsZyIgKEFsZ29yaXRobSkgSGVhZGVyIFBhcmFtZXRlciBtaXNzaW5nIG9yIGludmFsaWQnKTsKICAgICAgICB9CiAgICAgICAgY2hlY2tLZXlUeXBlV2l0aEp3ayhhbGcsIGtleSwgJ3NpZ24nKTsKICAgICAgICBsZXQgcGF5bG9hZCA9IHRoaXMuX3BheWxvYWQ7CiAgICAgICAgaWYgKGI2NCkgewogICAgICAgICAgICBwYXlsb2FkID0gZW5jb2Rlci5lbmNvZGUoZW5jb2RlKHBheWxvYWQpKTsKICAgICAgICB9CiAgICAgICAgbGV0IHByb3RlY3RlZEhlYWRlcjsKICAgICAgICBpZiAodGhpcy5fcHJvdGVjdGVkSGVhZGVyKSB7CiAgICAgICAgICAgIHByb3RlY3RlZEhlYWRlciA9IGVuY29kZXIuZW5jb2RlKGVuY29kZShKU09OLnN0cmluZ2lmeSh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpKSk7CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICBwcm90ZWN0ZWRIZWFkZXIgPSBlbmNvZGVyLmVuY29kZSgnJyk7CiAgICAgICAgfQogICAgICAgIGNvbnN0IGRhdGEgPSBjb25jYXQocHJvdGVjdGVkSGVhZGVyLCBlbmNvZGVyLmVuY29kZSgnLicpLCBwYXlsb2FkKTsKICAgICAgICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCBzaWduJDEoYWxnLCBrZXksIGRhdGEpOwogICAgICAgIGNvbnN0IGp3cyA9IHsKICAgICAgICAgICAgc2lnbmF0dXJlOiBlbmNvZGUoc2lnbmF0dXJlKSwKICAgICAgICAgICAgcGF5bG9hZDogJycsCiAgICAgICAgfTsKICAgICAgICBpZiAoYjY0KSB7CiAgICAgICAgICAgIGp3cy5wYXlsb2FkID0gZGVjb2Rlci5kZWNvZGUocGF5bG9hZCk7CiAgICAgICAgfQogICAgICAgIGlmICh0aGlzLl91bnByb3RlY3RlZEhlYWRlcikgewogICAgICAgICAgICBqd3MuaGVhZGVyID0gdGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXI7CiAgICAgICAgfQogICAgICAgIGlmICh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpIHsKICAgICAgICAgICAgandzLnByb3RlY3RlZCA9IGRlY29kZXIuZGVjb2RlKHByb3RlY3RlZEhlYWRlcik7CiAgICAgICAgfQogICAgICAgIHJldHVybiBqd3M7CiAgICB9Cn0KCmNsYXNzIENvbXBhY3RTaWduIHsKICAgIGNvbnN0cnVjdG9yKHBheWxvYWQpIHsKICAgICAgICB0aGlzLl9mbGF0dGVuZWQgPSBuZXcgRmxhdHRlbmVkU2lnbihwYXlsb2FkKTsKICAgIH0KICAgIHNldFByb3RlY3RlZEhlYWRlcihwcm90ZWN0ZWRIZWFkZXIpIHsKICAgICAgICB0aGlzLl9mbGF0dGVuZWQuc2V0UHJvdGVjdGVkSGVhZGVyKHByb3RlY3RlZEhlYWRlcik7CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9CiAgICBhc3luYyBzaWduKGtleSwgb3B0aW9ucykgewogICAgICAgIGNvbnN0IGp3cyA9IGF3YWl0IHRoaXMuX2ZsYXR0ZW5lZC5zaWduKGtleSwgb3B0aW9ucyk7CiAgICAgICAgaWYgKGp3cy5wYXlsb2FkID09PSB1bmRlZmluZWQpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndXNlIHRoZSBmbGF0dGVuZWQgbW9kdWxlIGZvciBjcmVhdGluZyBKV1Mgd2l0aCBiNjQ6IGZhbHNlJyk7CiAgICAgICAgfQogICAgICAgIHJldHVybiBgJHtqd3MucHJvdGVjdGVkfS4ke2p3cy5wYXlsb2FkfS4ke2p3cy5zaWduYXR1cmV9YDsKICAgIH0KfQoKZnVuY3Rpb24gdmFsaWRhdGVJbnB1dChsYWJlbCwgaW5wdXQpIHsKICAgIGlmICghTnVtYmVyLmlzRmluaXRlKGlucHV0KSkgewogICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgJHtsYWJlbH0gaW5wdXRgKTsKICAgIH0KICAgIHJldHVybiBpbnB1dDsKfQpjbGFzcyBQcm9kdWNlSldUIHsKICAgIGNvbnN0cnVjdG9yKHBheWxvYWQgPSB7fSkgewogICAgICAgIGlmICghaXNPYmplY3QocGF5bG9hZCkpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSldUIENsYWltcyBTZXQgTVVTVCBiZSBhbiBvYmplY3QnKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHBheWxvYWQ7CiAgICB9CiAgICBzZXRJc3N1ZXIoaXNzdWVyKSB7CiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHsgLi4udGhpcy5fcGF5bG9hZCwgaXNzOiBpc3N1ZXIgfTsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0KICAgIHNldFN1YmplY3Qoc3ViamVjdCkgewogICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIHN1Yjogc3ViamVjdCB9OwogICAgICAgIHJldHVybiB0aGlzOwogICAgfQogICAgc2V0QXVkaWVuY2UoYXVkaWVuY2UpIHsKICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBhdWQ6IGF1ZGllbmNlIH07CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9CiAgICBzZXRKdGkoand0SWQpIHsKICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBqdGk6IGp3dElkIH07CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9CiAgICBzZXROb3RCZWZvcmUoaW5wdXQpIHsKICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykgewogICAgICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBuYmY6IHZhbGlkYXRlSW5wdXQoJ3NldE5vdEJlZm9yZScsIGlucHV0KSB9OwogICAgICAgIH0KICAgICAgICBlbHNlIGlmIChpbnB1dCBpbnN0YW5jZW9mIERhdGUpIHsKICAgICAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHsgLi4udGhpcy5fcGF5bG9hZCwgbmJmOiB2YWxpZGF0ZUlucHV0KCdzZXROb3RCZWZvcmUnLCBlcG9jaChpbnB1dCkpIH07CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBuYmY6IGVwb2NoKG5ldyBEYXRlKCkpICsgc2VjcyhpbnB1dCkgfTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9CiAgICBzZXRFeHBpcmF0aW9uVGltZShpbnB1dCkgewogICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7CiAgICAgICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIGV4cDogdmFsaWRhdGVJbnB1dCgnc2V0RXhwaXJhdGlvblRpbWUnLCBpbnB1dCkgfTsKICAgICAgICB9CiAgICAgICAgZWxzZSBpZiAoaW5wdXQgaW5zdGFuY2VvZiBEYXRlKSB7CiAgICAgICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIGV4cDogdmFsaWRhdGVJbnB1dCgnc2V0RXhwaXJhdGlvblRpbWUnLCBlcG9jaChpbnB1dCkpIH07CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBleHA6IGVwb2NoKG5ldyBEYXRlKCkpICsgc2VjcyhpbnB1dCkgfTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9CiAgICBzZXRJc3N1ZWRBdChpbnB1dCkgewogICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICd1bmRlZmluZWQnKSB7CiAgICAgICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIGlhdDogZXBvY2gobmV3IERhdGUoKSkgfTsKICAgICAgICB9CiAgICAgICAgZWxzZSBpZiAoaW5wdXQgaW5zdGFuY2VvZiBEYXRlKSB7CiAgICAgICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIGlhdDogdmFsaWRhdGVJbnB1dCgnc2V0SXNzdWVkQXQnLCBlcG9jaChpbnB1dCkpIH07CiAgICAgICAgfQogICAgICAgIGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHsKICAgICAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHsKICAgICAgICAgICAgICAgIC4uLnRoaXMuX3BheWxvYWQsCiAgICAgICAgICAgICAgICBpYXQ6IHZhbGlkYXRlSW5wdXQoJ3NldElzc3VlZEF0JywgZXBvY2gobmV3IERhdGUoKSkgKyBzZWNzKGlucHV0KSksCiAgICAgICAgICAgIH07CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBpYXQ6IHZhbGlkYXRlSW5wdXQoJ3NldElzc3VlZEF0JywgaW5wdXQpIH07CiAgICAgICAgfQogICAgICAgIHJldHVybiB0aGlzOwogICAgfQp9CgpjbGFzcyBTaWduSldUIGV4dGVuZHMgUHJvZHVjZUpXVCB7CiAgICBzZXRQcm90ZWN0ZWRIZWFkZXIocHJvdGVjdGVkSGVhZGVyKSB7CiAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyID0gcHJvdGVjdGVkSGVhZGVyOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfQogICAgYXN5bmMgc2lnbihrZXksIG9wdGlvbnMpIHsKICAgICAgICBjb25zdCBzaWcgPSBuZXcgQ29tcGFjdFNpZ24oZW5jb2Rlci5lbmNvZGUoSlNPTi5zdHJpbmdpZnkodGhpcy5fcGF5bG9hZCkpKTsKICAgICAgICBzaWcuc2V0UHJvdGVjdGVkSGVhZGVyKHRoaXMuX3Byb3RlY3RlZEhlYWRlcik7CiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fcHJvdGVjdGVkSGVhZGVyPy5jcml0KSAmJgogICAgICAgICAgICB0aGlzLl9wcm90ZWN0ZWRIZWFkZXIuY3JpdC5pbmNsdWRlcygnYjY0JykgJiYKICAgICAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyLmI2NCA9PT0gZmFsc2UpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXVEludmFsaWQoJ0pXVHMgTVVTVCBOT1QgdXNlIHVuZW5jb2RlZCBwYXlsb2FkJyk7CiAgICAgICAgfQogICAgICAgIHJldHVybiBzaWcuc2lnbihrZXksIG9wdGlvbnMpOwogICAgfQp9Cgpjb25zdCBjaGVjayA9ICh2YWx1ZSwgZGVzY3JpcHRpb24pID0+IHsKICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8ICF2YWx1ZSkgewogICAgICAgIHRocm93IG5ldyBKV0tJbnZhbGlkKGAke2Rlc2NyaXB0aW9ufSBtaXNzaW5nIG9yIGludmFsaWRgKTsKICAgIH0KfTsKYXN5bmMgZnVuY3Rpb24gY2FsY3VsYXRlSndrVGh1bWJwcmludChqd2ssIGRpZ2VzdEFsZ29yaXRobSkgewogICAgaWYgKCFpc09iamVjdChqd2spKSB7CiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSldLIG11c3QgYmUgYW4gb2JqZWN0Jyk7CiAgICB9CiAgICBkaWdlc3RBbGdvcml0aG0gPz8gKGRpZ2VzdEFsZ29yaXRobSA9ICdzaGEyNTYnKTsKICAgIGlmIChkaWdlc3RBbGdvcml0aG0gIT09ICdzaGEyNTYnICYmCiAgICAgICAgZGlnZXN0QWxnb3JpdGhtICE9PSAnc2hhMzg0JyAmJgogICAgICAgIGRpZ2VzdEFsZ29yaXRobSAhPT0gJ3NoYTUxMicpIHsKICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdkaWdlc3RBbGdvcml0aG0gbXVzdCBvbmUgb2YgInNoYTI1NiIsICJzaGEzODQiLCBvciAic2hhNTEyIicpOwogICAgfQogICAgbGV0IGNvbXBvbmVudHM7CiAgICBzd2l0Y2ggKGp3ay5rdHkpIHsKICAgICAgICBjYXNlICdFQyc6CiAgICAgICAgICAgIGNoZWNrKGp3ay5jcnYsICciY3J2IiAoQ3VydmUpIFBhcmFtZXRlcicpOwogICAgICAgICAgICBjaGVjayhqd2sueCwgJyJ4IiAoWCBDb29yZGluYXRlKSBQYXJhbWV0ZXInKTsKICAgICAgICAgICAgY2hlY2soandrLnksICcieSIgKFkgQ29vcmRpbmF0ZSkgUGFyYW1ldGVyJyk7CiAgICAgICAgICAgIGNvbXBvbmVudHMgPSB7IGNydjogandrLmNydiwga3R5OiBqd2sua3R5LCB4OiBqd2sueCwgeTogandrLnkgfTsKICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAnT0tQJzoKICAgICAgICAgICAgY2hlY2soandrLmNydiwgJyJjcnYiIChTdWJ0eXBlIG9mIEtleSBQYWlyKSBQYXJhbWV0ZXInKTsKICAgICAgICAgICAgY2hlY2soandrLngsICcieCIgKFB1YmxpYyBLZXkpIFBhcmFtZXRlcicpOwogICAgICAgICAgICBjb21wb25lbnRzID0geyBjcnY6IGp3ay5jcnYsIGt0eTogandrLmt0eSwgeDogandrLnggfTsKICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAnUlNBJzoKICAgICAgICAgICAgY2hlY2soandrLmUsICciZSIgKEV4cG9uZW50KSBQYXJhbWV0ZXInKTsKICAgICAgICAgICAgY2hlY2soandrLm4sICcibiIgKE1vZHVsdXMpIFBhcmFtZXRlcicpOwogICAgICAgICAgICBjb21wb25lbnRzID0geyBlOiBqd2suZSwga3R5OiBqd2sua3R5LCBuOiBqd2subiB9OwogICAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICdvY3QnOgogICAgICAgICAgICBjaGVjayhqd2suaywgJyJrIiAoS2V5IFZhbHVlKSBQYXJhbWV0ZXInKTsKICAgICAgICAgICAgY29tcG9uZW50cyA9IHsgazogandrLmssIGt0eTogandrLmt0eSB9OwogICAgICAgICAgICBicmVhazsKICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnImt0eSIgKEtleSBUeXBlKSBQYXJhbWV0ZXIgbWlzc2luZyBvciB1bnN1cHBvcnRlZCcpOwogICAgfQogICAgY29uc3QgZGF0YSA9IGVuY29kZXIuZW5jb2RlKEpTT04uc3RyaW5naWZ5KGNvbXBvbmVudHMpKTsKICAgIHJldHVybiBlbmNvZGUoYXdhaXQgZGlnZXN0JDEoZGlnZXN0QWxnb3JpdGhtLCBkYXRhKSk7Cn0KCmZ1bmN0aW9uIGdldEt0eUZyb21BbGcoYWxnKSB7CiAgICBzd2l0Y2ggKHR5cGVvZiBhbGcgPT09ICdzdHJpbmcnICYmIGFsZy5zbGljZSgwLCAyKSkgewogICAgICAgIGNhc2UgJ1JTJzoKICAgICAgICBjYXNlICdQUyc6CiAgICAgICAgICAgIHJldHVybiAnUlNBJzsKICAgICAgICBjYXNlICdFUyc6CiAgICAgICAgICAgIHJldHVybiAnRUMnOwogICAgICAgIGNhc2UgJ0VkJzoKICAgICAgICAgICAgcmV0dXJuICdPS1AnOwogICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdVbnN1cHBvcnRlZCAiYWxnIiB2YWx1ZSBmb3IgYSBKU09OIFdlYiBLZXkgU2V0Jyk7CiAgICB9Cn0KZnVuY3Rpb24gaXNKV0tTTGlrZShqd2tzKSB7CiAgICByZXR1cm4gKGp3a3MgJiYKICAgICAgICB0eXBlb2YgandrcyA9PT0gJ29iamVjdCcgJiYKICAgICAgICBBcnJheS5pc0FycmF5KGp3a3Mua2V5cykgJiYKICAgICAgICBqd2tzLmtleXMuZXZlcnkoaXNKV0tMaWtlKSk7Cn0KZnVuY3Rpb24gaXNKV0tMaWtlKGtleSkgewogICAgcmV0dXJuIGlzT2JqZWN0KGtleSk7Cn0KZnVuY3Rpb24gY2xvbmUob2JqKSB7CiAgICBpZiAodHlwZW9mIHN0cnVjdHVyZWRDbG9uZSA9PT0gJ2Z1bmN0aW9uJykgewogICAgICAgIHJldHVybiBzdHJ1Y3R1cmVkQ2xvbmUob2JqKTsKICAgIH0KICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpOwp9CmNsYXNzIExvY2FsSldLU2V0IHsKICAgIGNvbnN0cnVjdG9yKGp3a3MpIHsKICAgICAgICB0aGlzLl9jYWNoZWQgPSBuZXcgV2Vha01hcCgpOwogICAgICAgIGlmICghaXNKV0tTTGlrZShqd2tzKSkgewogICAgICAgICAgICB0aHJvdyBuZXcgSldLU0ludmFsaWQoJ0pTT04gV2ViIEtleSBTZXQgbWFsZm9ybWVkJyk7CiAgICAgICAgfQogICAgICAgIHRoaXMuX2p3a3MgPSBjbG9uZShqd2tzKTsKICAgIH0KICAgIGFzeW5jIGdldEtleShwcm90ZWN0ZWRIZWFkZXIsIHRva2VuKSB7CiAgICAgICAgY29uc3QgeyBhbGcsIGtpZCB9ID0geyAuLi5wcm90ZWN0ZWRIZWFkZXIsIC4uLnRva2VuPy5oZWFkZXIgfTsKICAgICAgICBjb25zdCBrdHkgPSBnZXRLdHlGcm9tQWxnKGFsZyk7CiAgICAgICAgY29uc3QgY2FuZGlkYXRlcyA9IHRoaXMuX2p3a3Mua2V5cy5maWx0ZXIoKGp3aykgPT4gewogICAgICAgICAgICBsZXQgY2FuZGlkYXRlID0ga3R5ID09PSBqd2sua3R5OwogICAgICAgICAgICBpZiAoY2FuZGlkYXRlICYmIHR5cGVvZiBraWQgPT09ICdzdHJpbmcnKSB7CiAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBraWQgPT09IGp3ay5raWQ7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZSAmJiB0eXBlb2YgandrLmFsZyA9PT0gJ3N0cmluZycpIHsKICAgICAgICAgICAgICAgIGNhbmRpZGF0ZSA9IGFsZyA9PT0gandrLmFsZzsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoY2FuZGlkYXRlICYmIHR5cGVvZiBqd2sudXNlID09PSAnc3RyaW5nJykgewogICAgICAgICAgICAgICAgY2FuZGlkYXRlID0gandrLnVzZSA9PT0gJ3NpZyc7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZSAmJiBBcnJheS5pc0FycmF5KGp3ay5rZXlfb3BzKSkgewogICAgICAgICAgICAgICAgY2FuZGlkYXRlID0gandrLmtleV9vcHMuaW5jbHVkZXMoJ3ZlcmlmeScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChjYW5kaWRhdGUpIHsKICAgICAgICAgICAgICAgIHN3aXRjaCAoYWxnKSB7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAnRVMyNTYnOgogICAgICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBqd2suY3J2ID09PSAnUC0yNTYnOwogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICBjYXNlICdFUzI1NksnOgogICAgICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBqd2suY3J2ID09PSAnc2VjcDI1NmsxJzsKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAnRVMzODQnOgogICAgICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBqd2suY3J2ID09PSAnUC0zODQnOwogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICBjYXNlICdFUzUxMic6CiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZSA9IGp3ay5jcnYgPT09ICdQLTUyMSc7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIGNhc2UgJ0VkMjU1MTknOgogICAgICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBqd2suY3J2ID09PSAnRWQyNTUxOSc7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIGNhc2UgJ0VkRFNBJzoKICAgICAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlID0gandrLmNydiA9PT0gJ0VkMjU1MTknIHx8IGp3ay5jcnYgPT09ICdFZDQ0OCc7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiBjYW5kaWRhdGU7CiAgICAgICAgfSk7CiAgICAgICAgY29uc3QgeyAwOiBqd2ssIGxlbmd0aCB9ID0gY2FuZGlkYXRlczsKICAgICAgICBpZiAobGVuZ3RoID09PSAwKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBKV0tTTm9NYXRjaGluZ0tleSgpOwogICAgICAgIH0KICAgICAgICBpZiAobGVuZ3RoICE9PSAxKSB7CiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEpXS1NNdWx0aXBsZU1hdGNoaW5nS2V5cygpOwogICAgICAgICAgICBjb25zdCB7IF9jYWNoZWQgfSA9IHRoaXM7CiAgICAgICAgICAgIGVycm9yW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGFzeW5jIGZ1bmN0aW9uKiAoKSB7CiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGp3ayBvZiBjYW5kaWRhdGVzKSB7CiAgICAgICAgICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgYXdhaXQgaW1wb3J0V2l0aEFsZ0NhY2hlKF9jYWNoZWQsIGp3aywgYWxnKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggeyB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHRocm93IGVycm9yOwogICAgICAgIH0KICAgICAgICByZXR1cm4gaW1wb3J0V2l0aEFsZ0NhY2hlKHRoaXMuX2NhY2hlZCwgandrLCBhbGcpOwogICAgfQp9CmFzeW5jIGZ1bmN0aW9uIGltcG9ydFdpdGhBbGdDYWNoZShjYWNoZSwgandrLCBhbGcpIHsKICAgIGNvbnN0IGNhY2hlZCA9IGNhY2hlLmdldChqd2spIHx8IGNhY2hlLnNldChqd2ssIHt9KS5nZXQoandrKTsKICAgIGlmIChjYWNoZWRbYWxnXSA9PT0gdW5kZWZpbmVkKSB7CiAgICAgICAgY29uc3Qga2V5ID0gYXdhaXQgaW1wb3J0SldLKHsgLi4uandrLCBleHQ6IHRydWUgfSwgYWxnKTsKICAgICAgICBpZiAoa2V5IGluc3RhbmNlb2YgVWludDhBcnJheSB8fCBrZXkudHlwZSAhPT0gJ3B1YmxpYycpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXS1NJbnZhbGlkKCdKU09OIFdlYiBLZXkgU2V0IG1lbWJlcnMgbXVzdCBiZSBwdWJsaWMga2V5cycpOwogICAgICAgIH0KICAgICAgICBjYWNoZWRbYWxnXSA9IGtleTsKICAgIH0KICAgIHJldHVybiBjYWNoZWRbYWxnXTsKfQpmdW5jdGlvbiBjcmVhdGVMb2NhbEpXS1NldChqd2tzKSB7CiAgICBjb25zdCBzZXQgPSBuZXcgTG9jYWxKV0tTZXQoandrcyk7CiAgICBjb25zdCBsb2NhbEpXS1NldCA9IGFzeW5jIChwcm90ZWN0ZWRIZWFkZXIsIHRva2VuKSA9PiBzZXQuZ2V0S2V5KHByb3RlY3RlZEhlYWRlciwgdG9rZW4pOwogICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobG9jYWxKV0tTZXQsIHsKICAgICAgICBqd2tzOiB7CiAgICAgICAgICAgIHZhbHVlOiAoKSA9PiBjbG9uZShzZXQuX2p3a3MpLAogICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLAogICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLAogICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsCiAgICAgICAgfSwKICAgIH0pOwogICAgcmV0dXJuIGxvY2FsSldLU2V0Owp9Cgpjb25zdCBmZXRjaEp3a3MgPSBhc3luYyAodXJsLCB0aW1lb3V0LCBvcHRpb25zKSA9PiB7CiAgICBsZXQgY29udHJvbGxlcjsKICAgIGxldCBpZDsKICAgIGxldCB0aW1lZE91dCA9IGZhbHNlOwogICAgaWYgKHR5cGVvZiBBYm9ydENvbnRyb2xsZXIgPT09ICdmdW5jdGlvbicpIHsKICAgICAgICBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpOwogICAgICAgIGlkID0gc2V0VGltZW91dCgoKSA9PiB7CiAgICAgICAgICAgIHRpbWVkT3V0ID0gdHJ1ZTsKICAgICAgICAgICAgY29udHJvbGxlci5hYm9ydCgpOwogICAgICAgIH0sIHRpbWVvdXQpOwogICAgfQogICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwuaHJlZiwgewogICAgICAgIHNpZ25hbDogY29udHJvbGxlciA/IGNvbnRyb2xsZXIuc2lnbmFsIDogdW5kZWZpbmVkLAogICAgICAgIHJlZGlyZWN0OiAnbWFudWFsJywKICAgICAgICBoZWFkZXJzOiBvcHRpb25zLmhlYWRlcnMsCiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7CiAgICAgICAgaWYgKHRpbWVkT3V0KQogICAgICAgICAgICB0aHJvdyBuZXcgSldLU1RpbWVvdXQoKTsKICAgICAgICB0aHJvdyBlcnI7CiAgICB9KTsKICAgIGlmIChpZCAhPT0gdW5kZWZpbmVkKQogICAgICAgIGNsZWFyVGltZW91dChpZCk7CiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHsKICAgICAgICB0aHJvdyBuZXcgSk9TRUVycm9yKCdFeHBlY3RlZCAyMDAgT0sgZnJvbSB0aGUgSlNPTiBXZWIgS2V5IFNldCBIVFRQIHJlc3BvbnNlJyk7CiAgICB9CiAgICB0cnkgewogICAgICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7CiAgICB9CiAgICBjYXRjaCB7CiAgICAgICAgdGhyb3cgbmV3IEpPU0VFcnJvcignRmFpbGVkIHRvIHBhcnNlIHRoZSBKU09OIFdlYiBLZXkgU2V0IEhUVFAgcmVzcG9uc2UgYXMgSlNPTicpOwogICAgfQp9Owp2YXIgZmV0Y2hKd2tzJDEgPSBmZXRjaEp3a3M7CgpmdW5jdGlvbiBpc0Nsb3VkZmxhcmVXb3JrZXJzKCkgewogICAgcmV0dXJuICh0eXBlb2YgV2ViU29ja2V0UGFpciAhPT0gJ3VuZGVmaW5lZCcgfHwKICAgICAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCA9PT0gJ0Nsb3VkZmxhcmUtV29ya2VycycpIHx8CiAgICAgICAgKHR5cGVvZiBFZGdlUnVudGltZSAhPT0gJ3VuZGVmaW5lZCcgJiYgRWRnZVJ1bnRpbWUgPT09ICd2ZXJjZWwnKSk7Cn0KbGV0IFVTRVJfQUdFTlQ7CmlmICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyB8fCAhbmF2aWdhdG9yLnVzZXJBZ2VudD8uc3RhcnRzV2l0aD8uKCdNb3ppbGxhLzUuMCAnKSkgewogICAgY29uc3QgTkFNRSA9ICdqb3NlJzsKICAgIGNvbnN0IFZFUlNJT04gPSAndjUuMTAuMCc7CiAgICBVU0VSX0FHRU5UID0gYCR7TkFNRX0vJHtWRVJTSU9OfWA7Cn0KY29uc3Qgandrc0NhY2hlID0gU3ltYm9sKCk7CmZ1bmN0aW9uIGlzRnJlc2hKd2tzQ2FjaGUoaW5wdXQsIGNhY2hlTWF4QWdlKSB7CiAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnb2JqZWN0JyB8fCBpbnB1dCA9PT0gbnVsbCkgewogICAgICAgIHJldHVybiBmYWxzZTsKICAgIH0KICAgIGlmICghKCd1YXQnIGluIGlucHV0KSB8fCB0eXBlb2YgaW5wdXQudWF0ICE9PSAnbnVtYmVyJyB8fCBEYXRlLm5vdygpIC0gaW5wdXQudWF0ID49IGNhY2hlTWF4QWdlKSB7CiAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgfQogICAgaWYgKCEoJ2p3a3MnIGluIGlucHV0KSB8fAogICAgICAgICFpc09iamVjdChpbnB1dC5qd2tzKSB8fAogICAgICAgICFBcnJheS5pc0FycmF5KGlucHV0Lmp3a3Mua2V5cykgfHwKICAgICAgICAhQXJyYXkucHJvdG90eXBlLmV2ZXJ5LmNhbGwoaW5wdXQuandrcy5rZXlzLCBpc09iamVjdCkpIHsKICAgICAgICByZXR1cm4gZmFsc2U7CiAgICB9CiAgICByZXR1cm4gdHJ1ZTsKfQpjbGFzcyBSZW1vdGVKV0tTZXQgewogICAgY29uc3RydWN0b3IodXJsLCBvcHRpb25zKSB7CiAgICAgICAgaWYgKCEodXJsIGluc3RhbmNlb2YgVVJMKSkgewogICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd1cmwgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBVUkwnKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5fdXJsID0gbmV3IFVSTCh1cmwuaHJlZik7CiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHsgYWdlbnQ6IG9wdGlvbnM/LmFnZW50LCBoZWFkZXJzOiBvcHRpb25zPy5oZWFkZXJzIH07CiAgICAgICAgdGhpcy5fdGltZW91dER1cmF0aW9uID0KICAgICAgICAgICAgdHlwZW9mIG9wdGlvbnM/LnRpbWVvdXREdXJhdGlvbiA9PT0gJ251bWJlcicgPyBvcHRpb25zPy50aW1lb3V0RHVyYXRpb24gOiA1MDAwOwogICAgICAgIHRoaXMuX2Nvb2xkb3duRHVyYXRpb24gPQogICAgICAgICAgICB0eXBlb2Ygb3B0aW9ucz8uY29vbGRvd25EdXJhdGlvbiA9PT0gJ251bWJlcicgPyBvcHRpb25zPy5jb29sZG93bkR1cmF0aW9uIDogMzAwMDA7CiAgICAgICAgdGhpcy5fY2FjaGVNYXhBZ2UgPSB0eXBlb2Ygb3B0aW9ucz8uY2FjaGVNYXhBZ2UgPT09ICdudW1iZXInID8gb3B0aW9ucz8uY2FjaGVNYXhBZ2UgOiA2MDAwMDA7CiAgICAgICAgaWYgKG9wdGlvbnM/Lltqd2tzQ2FjaGVdICE9PSB1bmRlZmluZWQpIHsKICAgICAgICAgICAgdGhpcy5fY2FjaGUgPSBvcHRpb25zPy5bandrc0NhY2hlXTsKICAgICAgICAgICAgaWYgKGlzRnJlc2hKd2tzQ2FjaGUob3B0aW9ucz8uW2p3a3NDYWNoZV0sIHRoaXMuX2NhY2hlTWF4QWdlKSkgewogICAgICAgICAgICAgICAgdGhpcy5fandrc1RpbWVzdGFtcCA9IHRoaXMuX2NhY2hlLnVhdDsKICAgICAgICAgICAgICAgIHRoaXMuX2xvY2FsID0gY3JlYXRlTG9jYWxKV0tTZXQodGhpcy5fY2FjaGUuandrcyk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9CiAgICBjb29saW5nRG93bigpIHsKICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuX2p3a3NUaW1lc3RhbXAgPT09ICdudW1iZXInCiAgICAgICAgICAgID8gRGF0ZS5ub3coKSA8IHRoaXMuX2p3a3NUaW1lc3RhbXAgKyB0aGlzLl9jb29sZG93bkR1cmF0aW9uCiAgICAgICAgICAgIDogZmFsc2U7CiAgICB9CiAgICBmcmVzaCgpIHsKICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuX2p3a3NUaW1lc3RhbXAgPT09ICdudW1iZXInCiAgICAgICAgICAgID8gRGF0ZS5ub3coKSA8IHRoaXMuX2p3a3NUaW1lc3RhbXAgKyB0aGlzLl9jYWNoZU1heEFnZQogICAgICAgICAgICA6IGZhbHNlOwogICAgfQogICAgYXN5bmMgZ2V0S2V5KHByb3RlY3RlZEhlYWRlciwgdG9rZW4pIHsKICAgICAgICBpZiAoIXRoaXMuX2xvY2FsIHx8ICF0aGlzLmZyZXNoKCkpIHsKICAgICAgICAgICAgYXdhaXQgdGhpcy5yZWxvYWQoKTsKICAgICAgICB9CiAgICAgICAgdHJ5IHsKICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2xvY2FsKHByb3RlY3RlZEhlYWRlciwgdG9rZW4pOwogICAgICAgIH0KICAgICAgICBjYXRjaCAoZXJyKSB7CiAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBKV0tTTm9NYXRjaGluZ0tleSkgewogICAgICAgICAgICAgICAgaWYgKHRoaXMuY29vbGluZ0Rvd24oKSA9PT0gZmFsc2UpIHsKICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnJlbG9hZCgpOwogICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2NhbChwcm90ZWN0ZWRIZWFkZXIsIHRva2VuKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICB0aHJvdyBlcnI7CiAgICAgICAgfQogICAgfQogICAgYXN5bmMgcmVsb2FkKCkgewogICAgICAgIGlmICh0aGlzLl9wZW5kaW5nRmV0Y2ggJiYgaXNDbG91ZGZsYXJlV29ya2VycygpKSB7CiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdGZXRjaCA9IHVuZGVmaW5lZDsKICAgICAgICB9CiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHRoaXMuX29wdGlvbnMuaGVhZGVycyk7CiAgICAgICAgaWYgKFVTRVJfQUdFTlQgJiYgIWhlYWRlcnMuaGFzKCdVc2VyLUFnZW50JykpIHsKICAgICAgICAgICAgaGVhZGVycy5zZXQoJ1VzZXItQWdlbnQnLCBVU0VSX0FHRU5UKTsKICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5oZWFkZXJzID0gT2JqZWN0LmZyb21FbnRyaWVzKGhlYWRlcnMuZW50cmllcygpKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5fcGVuZGluZ0ZldGNoIHx8ICh0aGlzLl9wZW5kaW5nRmV0Y2ggPSBmZXRjaEp3a3MkMSh0aGlzLl91cmwsIHRoaXMuX3RpbWVvdXREdXJhdGlvbiwgdGhpcy5fb3B0aW9ucykKICAgICAgICAgICAgLnRoZW4oKGpzb24pID0+IHsKICAgICAgICAgICAgdGhpcy5fbG9jYWwgPSBjcmVhdGVMb2NhbEpXS1NldChqc29uKTsKICAgICAgICAgICAgaWYgKHRoaXMuX2NhY2hlKSB7CiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZS51YXQgPSBEYXRlLm5vdygpOwogICAgICAgICAgICAgICAgdGhpcy5fY2FjaGUuandrcyA9IGpzb247CiAgICAgICAgICAgIH0KICAgICAgICAgICAgdGhpcy5fandrc1RpbWVzdGFtcCA9IERhdGUubm93KCk7CiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdGZXRjaCA9IHVuZGVmaW5lZDsKICAgICAgICB9KQogICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gewogICAgICAgICAgICB0aGlzLl9wZW5kaW5nRmV0Y2ggPSB1bmRlZmluZWQ7CiAgICAgICAgICAgIHRocm93IGVycjsKICAgICAgICB9KSk7CiAgICAgICAgYXdhaXQgdGhpcy5fcGVuZGluZ0ZldGNoOwogICAgfQp9CmZ1bmN0aW9uIGNyZWF0ZVJlbW90ZUpXS1NldCh1cmwsIG9wdGlvbnMpIHsKICAgIGNvbnN0IHNldCA9IG5ldyBSZW1vdGVKV0tTZXQodXJsLCBvcHRpb25zKTsKICAgIGNvbnN0IHJlbW90ZUpXS1NldCA9IGFzeW5jIChwcm90ZWN0ZWRIZWFkZXIsIHRva2VuKSA9PiBzZXQuZ2V0S2V5KHByb3RlY3RlZEhlYWRlciwgdG9rZW4pOwogICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMocmVtb3RlSldLU2V0LCB7CiAgICAgICAgY29vbGluZ0Rvd246IHsKICAgICAgICAgICAgZ2V0OiAoKSA9PiBzZXQuY29vbGluZ0Rvd24oKSwKICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSwKICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSwKICAgICAgICB9LAogICAgICAgIGZyZXNoOiB7CiAgICAgICAgICAgIGdldDogKCkgPT4gc2V0LmZyZXNoKCksCiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsCiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsCiAgICAgICAgfSwKICAgICAgICByZWxvYWQ6IHsKICAgICAgICAgICAgdmFsdWU6ICgpID0+IHNldC5yZWxvYWQoKSwKICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSwKICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSwKICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLAogICAgICAgIH0sCiAgICAgICAgcmVsb2FkaW5nOiB7CiAgICAgICAgICAgIGdldDogKCkgPT4gISFzZXQuX3BlbmRpbmdGZXRjaCwKICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSwKICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSwKICAgICAgICB9LAogICAgICAgIGp3a3M6IHsKICAgICAgICAgICAgdmFsdWU6ICgpID0+IHNldC5fbG9jYWw/Lmp3a3MoKSwKICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSwKICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSwKICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLAogICAgICAgIH0sCiAgICB9KTsKICAgIHJldHVybiByZW1vdGVKV0tTZXQ7Cn0KCmNvbnN0IGRlY29kZSA9IGRlY29kZSQxOwoKZnVuY3Rpb24gZGVjb2RlSnd0KGp3dCkgewogICAgaWYgKHR5cGVvZiBqd3QgIT09ICdzdHJpbmcnKQogICAgICAgIHRocm93IG5ldyBKV1RJbnZhbGlkKCdKV1RzIG11c3QgdXNlIENvbXBhY3QgSldTIHNlcmlhbGl6YXRpb24sIEpXVCBtdXN0IGJlIGEgc3RyaW5nJyk7CiAgICBjb25zdCB7IDE6IHBheWxvYWQsIGxlbmd0aCB9ID0gand0LnNwbGl0KCcuJyk7CiAgICBpZiAobGVuZ3RoID09PSA1KQogICAgICAgIHRocm93IG5ldyBKV1RJbnZhbGlkKCdPbmx5IEpXVHMgdXNpbmcgQ29tcGFjdCBKV1Mgc2VyaWFsaXphdGlvbiBjYW4gYmUgZGVjb2RlZCcpOwogICAgaWYgKGxlbmd0aCAhPT0gMykKICAgICAgICB0aHJvdyBuZXcgSldUSW52YWxpZCgnSW52YWxpZCBKV1QnKTsKICAgIGlmICghcGF5bG9hZCkKICAgICAgICB0aHJvdyBuZXcgSldUSW52YWxpZCgnSldUcyBtdXN0IGNvbnRhaW4gYSBwYXlsb2FkJyk7CiAgICBsZXQgZGVjb2RlZDsKICAgIHRyeSB7CiAgICAgICAgZGVjb2RlZCA9IGRlY29kZShwYXlsb2FkKTsKICAgIH0KICAgIGNhdGNoIHsKICAgICAgICB0aHJvdyBuZXcgSldUSW52YWxpZCgnRmFpbGVkIHRvIGJhc2U2NHVybCBkZWNvZGUgdGhlIHBheWxvYWQnKTsKICAgIH0KICAgIGxldCByZXN1bHQ7CiAgICB0cnkgewogICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UoZGVjb2Rlci5kZWNvZGUoZGVjb2RlZCkpOwogICAgfQogICAgY2F0Y2ggewogICAgICAgIHRocm93IG5ldyBKV1RJbnZhbGlkKCdGYWlsZWQgdG8gcGFyc2UgdGhlIGRlY29kZWQgcGF5bG9hZCBhcyBKU09OJyk7CiAgICB9CiAgICBpZiAoIWlzT2JqZWN0KHJlc3VsdCkpCiAgICAgICAgdGhyb3cgbmV3IEpXVEludmFsaWQoJ0ludmFsaWQgSldUIENsYWltcyBTZXQnKTsKICAgIHJldHVybiByZXN1bHQ7Cn0KCmNvbnN0IHJlbmV3VG9rZW5zID0gYXN5bmMgKHNlc3Npb25EYXRhYmFzZSkgPT4gewogICAgLy8gcmVtZW1iZXIgc2Vzc2lvbiBkZXRhaWxzCiAgICB0cnkgewogICAgICAgIGF3YWl0IHNlc3Npb25EYXRhYmFzZS5pbml0KCk7CiAgICAgICAgY29uc3QgY2xpZW50X2lkID0gYXdhaXQgc2Vzc2lvbkRhdGFiYXNlLmdldEl0ZW0oImNsaWVudF9pZCIpOwogICAgICAgIGNvbnN0IHRva2VuX2VuZHBvaW50ID0gYXdhaXQgc2Vzc2lvbkRhdGFiYXNlLmdldEl0ZW0oInRva2VuX2VuZHBvaW50Iik7CiAgICAgICAgY29uc3Qga2V5X3BhaXIgPSBhd2FpdCBzZXNzaW9uRGF0YWJhc2UuZ2V0SXRlbSgiZHBvcF9rZXlwYWlyIik7CiAgICAgICAgY29uc3QgcmVmcmVzaF90b2tlbiA9IGF3YWl0IHNlc3Npb25EYXRhYmFzZS5nZXRJdGVtKCJyZWZyZXNoX3Rva2VuIik7CiAgICAgICAgaWYgKGNsaWVudF9pZCA9PT0gbnVsbCB8fCB0b2tlbl9lbmRwb2ludCA9PT0gbnVsbCB8fCBrZXlfcGFpciA9PT0gbnVsbCB8fCByZWZyZXNoX3Rva2VuID09PSBudWxsKSB7CiAgICAgICAgICAgIC8vIHdlIGNhbiBub3QgcmVzdG9yZSB0aGUgb2xkIHNlc3Npb24KICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJDb3VsZCBub3QgcmVmcmVzaCB0b2tlbnM6IGRldGFpbHMgbWlzc2luZyBmcm9tIGRhdGFiYXNlLiIpOwogICAgICAgIH0KICAgICAgICBjb25zdCB0b2tlbl9yZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RGcmVzaFRva2VucyhyZWZyZXNoX3Rva2VuLCBjbGllbnRfaWQsIHRva2VuX2VuZHBvaW50LCBrZXlfcGFpcikKICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7CiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHsKICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgU3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpOwogICAgICAgIH0pOwogICAgICAgIC8vIHZlcmlmeSBhY2Nlc3NfdG9rZW4gLy8gISBTb2xpZC1PSURDIHNwZWNpZmljYXRpb24gc2F5cyBpdCBzaG91bGQgYmUgYSBkcG9wLWJvdW5kIGBpZCB0b2tlbmAgYnV0IGltcGxlbWVudGF0aW9ucyBwcm92aWRlIGEgZHBvcC1ib3VuZCBgYWNjZXNzIHRva2VuYAogICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gdG9rZW5fcmVzcG9uc2VbImFjY2Vzc190b2tlbiJdOwogICAgICAgIGNvbnN0IGlkcCA9IGF3YWl0IHNlc3Npb25EYXRhYmFzZS5nZXRJdGVtKCJpZHAiKTsKICAgICAgICBpZiAoaWRwID09PSBudWxsKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiQWNjZXNzIFRva2VuIHZhbGlkYXRpb24gcHJlcGFyYXRpb24gLSBDb3VsZCBub3QgZmluZCBpbiBzZXNzaW9uRGF0YWJhc2U6IGlkcCIpOwogICAgICAgIH0KICAgICAgICBjb25zdCBqd2tzX3VyaSA9IGF3YWl0IHNlc3Npb25EYXRhYmFzZS5nZXRJdGVtKCJqd2tzX3VyaSIpOwogICAgICAgIGlmIChqd2tzX3VyaSA9PT0gbnVsbCkgewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkFjY2VzcyBUb2tlbiB2YWxpZGF0aW9uIHByZXBhcmF0aW9uIC0gQ291bGQgbm90IGZpbmQgaW4gc2Vzc2lvbkRhdGFiYXNlOiBqd2tzX3VyaSIpOwogICAgICAgIH0KICAgICAgICBjb25zdCBqd2tzID0gY3JlYXRlUmVtb3RlSldLU2V0KG5ldyBVUkwoandrc191cmkpKTsKICAgICAgICBjb25zdCB7IHBheWxvYWQgfSA9IGF3YWl0IGp3dFZlcmlmeShhY2Nlc3NUb2tlbiwgandrcywgewogICAgICAgICAgICBpc3N1ZXI6IGlkcCwgLy8gUkZDIDkyMDcKICAgICAgICAgICAgYXVkaWVuY2U6ICJzb2xpZCIsIC8vIFJGQyA3NTE5IC8vICEgInNvbGlkIiBhcyBwZXIgaW1wbGVtZW50YXRpb25zIC4uLgogICAgICAgICAgICAvLyBleHAsIG5iZiwgaWF0IC0gaGFuZGxlZCBhdXRvbWF0aWNhbGx5CiAgICAgICAgfSk7CiAgICAgICAgLy8gY2hlY2sgZHBvcCB0aHVtYnByaW50CiAgICAgICAgY29uc3QgZHBvcFRodW1icHJpbnQgPSBhd2FpdCBjYWxjdWxhdGVKd2tUaHVtYnByaW50KGF3YWl0IGV4cG9ydEpXSyhrZXlfcGFpci5wdWJsaWNLZXkpKTsKICAgICAgICBpZiAocGF5bG9hZFsiY25mIl1bImprdCJdICE9PSBkcG9wVGh1bWJwcmludCkgewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkFjY2VzcyBUb2tlbiB2YWxpZGF0aW9uIGZhaWxlZCBvbiBgamt0YDogamt0ICE9PSBEUG9QIHRodW1icHJpbnQgLSAiICsgcGF5bG9hZFsiY25mIl1bImprdCJdICsgIiAhPT0gIiArIGRwb3BUaHVtYnByaW50KTsKICAgICAgICB9CiAgICAgICAgLy8gY2hlY2sgY2xpZW50X2lkCiAgICAgICAgaWYgKHBheWxvYWRbImNsaWVudF9pZCJdICE9PSBjbGllbnRfaWQpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJBY2Nlc3MgVG9rZW4gdmFsaWRhdGlvbiBmYWlsZWQgb24gYGNsaWVudF9pZGA6IEpXVCBwYXlsb2FkICE9PSBjbGllbnRfaWQgLSAiICsgcGF5bG9hZFsiY2xpZW50X2lkIl0gKyAiICE9PSAiICsgY2xpZW50X2lkKTsKICAgICAgICB9CiAgICAgICAgLy8gc2V0IG5ldyByZWZyZXNoIHRva2VuIGZvciB0b2tlbiByb3RhdGlvbgogICAgICAgIGF3YWl0IHNlc3Npb25EYXRhYmFzZS5zZXRJdGVtKCJyZWZyZXNoX3Rva2VuIiwgdG9rZW5fcmVzcG9uc2VbInJlZnJlc2hfdG9rZW4iXSk7CiAgICAgICAgcmV0dXJuIHsKICAgICAgICAgICAgLi4udG9rZW5fcmVzcG9uc2UsCiAgICAgICAgICAgIGRwb3Bfa2V5X3BhaXI6IGtleV9wYWlyLAogICAgICAgIH07CiAgICB9CiAgICBmaW5hbGx5IHsKICAgICAgICBzZXNzaW9uRGF0YWJhc2UuY2xvc2UoKTsKICAgIH0KfTsKLyoqCiAqIFJlcXVlc3QgYW4gZHBvcC1ib3VuZCBhY2Nlc3MgdG9rZW4gZnJvbSBhIHRva2VuIGVuZHBvaW50IHVzaW5nIGEgcmVmcmVzaCB0b2tlbgogKiBAcGFyYW0gYXV0aG9yaXphdGlvbl9jb2RlCiAqIEBwYXJhbSBwa2NlX2NvZGVfdmVyaWZpZXIKICogQHBhcmFtIHJlZGlyZWN0X3VyaQogKiBAcGFyYW0gY2xpZW50X2lkCiAqIEBwYXJhbSB0b2tlbl9lbmRwb2ludAogKiBAcGFyYW0ga2V5X3BhaXIKICogQHJldHVybnMKICovCmNvbnN0IHJlcXVlc3RGcmVzaFRva2VucyA9IGFzeW5jIChyZWZyZXNoX3Rva2VuLCBjbGllbnRfaWQsIHRva2VuX2VuZHBvaW50LCBrZXlfcGFpcikgPT4gewogICAgLy8gcHJlcGFyZSBwdWJsaWMga2V5IHRvIGJpbmQgYWNjZXNzIHRva2VuIHRvCiAgICBjb25zdCBqd2tfcHVibGljX2tleSA9IGF3YWl0IGV4cG9ydEpXSyhrZXlfcGFpci5wdWJsaWNLZXkpOwogICAgandrX3B1YmxpY19rZXkuYWxnID0gIkVTMjU2IjsKICAgIC8vIHNpZ24gdGhlIGFjY2VzcyB0b2tlbiByZXF1ZXN0IERQb1AgdG9rZW4KICAgIGNvbnN0IGRwb3AgPSBhd2FpdCBuZXcgU2lnbkpXVCh7CiAgICAgICAgaHR1OiB0b2tlbl9lbmRwb2ludCwKICAgICAgICBodG06ICJQT1NUIiwKICAgIH0pCiAgICAgICAgLnNldElzc3VlZEF0KCkKICAgICAgICAuc2V0SnRpKHNlbGYuY3J5cHRvLnJhbmRvbVVVSUQoKSkKICAgICAgICAuc2V0UHJvdGVjdGVkSGVhZGVyKHsKICAgICAgICBhbGc6ICJFUzI1NiIsCiAgICAgICAgdHlwOiAiZHBvcCtqd3QiLAogICAgICAgIGp3azogandrX3B1YmxpY19rZXksCiAgICB9KQogICAgICAgIC5zaWduKGtleV9wYWlyLnByaXZhdGVLZXkpOwogICAgcmV0dXJuIGZldGNoKHRva2VuX2VuZHBvaW50LCB7CiAgICAgICAgbWV0aG9kOiAiUE9TVCIsCiAgICAgICAgaGVhZGVyczogewogICAgICAgICAgICBkcG9wLAogICAgICAgICAgICAiQ29udGVudC1UeXBlIjogImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCIsCiAgICAgICAgfSwKICAgICAgICBib2R5OiBuZXcgVVJMU2VhcmNoUGFyYW1zKHsKICAgICAgICAgICAgZ3JhbnRfdHlwZTogInJlZnJlc2hfdG9rZW4iLAogICAgICAgICAgICByZWZyZXNoX3Rva2VuLAogICAgICAgICAgICBjbGllbnRfaWQKICAgICAgICB9KSwKICAgIH0pOwp9OwoKLyoqCiAqIEEgc2ltcGxlIEluZGV4ZWREQiB3cmFwcGVyLgogKi8KY2xhc3MgU2Vzc2lvbklEQiB7CiAgICBkYk5hbWU7CiAgICBzdG9yZU5hbWU7CiAgICBkYlZlcnNpb247CiAgICBkYiA9IG51bGw7CiAgICAvKioKICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UKICAgICAqIEBwYXJhbSBkYk5hbWUgVGhlIG5hbWUgb2YgdGhlIEluZGV4ZWREQiBkYXRhYmFzZQogICAgICogQHBhcmFtIHN0b3JlTmFtZSBUaGUgbmFtZSBvZiB0aGUgb2JqZWN0IHN0b3JlCiAgICAgKiBAcGFyYW0gZGJWZXJzaW9uIFRoZSBkYXRhYmFzZSB2ZXJzaW9uCiAgICAgKi8KICAgIGNvbnN0cnVjdG9yKGRiTmFtZSA9ICdzb2lkYycsIHN0b3JlTmFtZSA9ICdzZXNzaW9uJywgZGJWZXJzaW9uID0gMSkgewogICAgICAgIHRoaXMuZGJOYW1lID0gZGJOYW1lOwogICAgICAgIHRoaXMuc3RvcmVOYW1lID0gc3RvcmVOYW1lOwogICAgICAgIHRoaXMuZGJWZXJzaW9uID0gZGJWZXJzaW9uOwogICAgfQogICAgLyoqCiAgICAgKiBJbml0aWFsaXplcyB0aGUgSW5kZXhlZERCIGRhdGFiYXNlCiAgICAgKiBAcmV0dXJucyBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZGF0YWJhc2UgaXMgcmVhZHkKICAgICAqLwogICAgYXN5bmMgaW5pdCgpIHsKICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gewogICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4odGhpcy5kYk5hbWUsIHRoaXMuZGJWZXJzaW9uKTsKICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gKGV2ZW50KSA9PiB7CiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBEYXRhYmFzZSBlcnJvcjogJHtldmVudC50YXJnZXQuZXJyb3J9YCkpOwogICAgICAgICAgICB9OwogICAgICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudCkgPT4gewogICAgICAgICAgICAgICAgdGhpcy5kYiA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7CiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMpOwogICAgICAgICAgICB9OwogICAgICAgICAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IChldmVudCkgPT4gewogICAgICAgICAgICAgICAgY29uc3QgZGIgPSBldmVudC50YXJnZXQucmVzdWx0OwogICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIG9iamVjdCBzdG9yZSBhbHJlYWR5IGV4aXN0cywgaWYgbm90IGNyZWF0ZSBpdAogICAgICAgICAgICAgICAgaWYgKCFkYi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKHRoaXMuc3RvcmVOYW1lKSkgewogICAgICAgICAgICAgICAgICAgIGRiLmNyZWF0ZU9iamVjdFN0b3JlKHRoaXMuc3RvcmVOYW1lKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfTsKICAgICAgICB9KTsKICAgIH0KICAgIC8qKgogICAgICogU3RvcmVzIGFueSB2YWx1ZSBpbiB0aGUgZGF0YWJhc2Ugd2l0aCB0aGUgZ2l2ZW4gSUQgYXMga2V5CiAgICAgKiBAcGFyYW0gaWQgVGhlIGlkZW50aWZpZXIva2V5IGZvciB0aGUgdmFsdWUKICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gc3RvcmUKICAgICAqLwogICAgYXN5bmMgc2V0SXRlbShpZCwgdmFsdWUpIHsKICAgICAgICBpZiAoIXRoaXMuZGIpIHsKICAgICAgICAgICAgYXdhaXQgdGhpcy5pbml0KCk7CiAgICAgICAgfQogICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7CiAgICAgICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gdGhpcy5kYi50cmFuc2FjdGlvbih0aGlzLnN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpOwogICAgICAgICAgICAvLyBIYW5kbGUgdHJhbnNhdGlvbgogICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmNvbXBsZXRlID0gKCkgPT4gewogICAgICAgICAgICAgICAgcmVzb2x2ZSgpOwogICAgICAgICAgICB9OwogICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmVycm9yID0gKGV2ZW50KSA9PiB7CiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBUcmFuc2FjdGlvbiBlcnJvciBmb3Igc2V0SXRlbSgke2lkfSwuLi4pOiAke2V2ZW50LnRhcmdldC5lcnJvcn1gKSk7CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHRyYW5zYWN0aW9uLm9uYWJvcnQgPSAoZXZlbnQpID0+IHsKICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFRyYW5zYWN0aW9uIGFib3J0ZWQgZm9yIHNldEl0ZW0oJHtpZH0sLi4uKTogJHtldmVudC50YXJnZXQuZXJyb3J9YCkpOwogICAgICAgICAgICB9OwogICAgICAgICAgICAvLyBQZXJmb3JtIHRoZSByZXF1ZXN0IHdpdGhpbiB0aGUgdHJhbnNhY3Rpb24KICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZSh0aGlzLnN0b3JlTmFtZSk7CiAgICAgICAgICAgIHN0b3JlLnB1dCh2YWx1ZSwgaWQpOwogICAgICAgIH0pOwogICAgfQogICAgLyoqCiAgICAgICogUmV0cmlldmVzIGEgdmFsdWUgZnJvbSB0aGUgZGF0YWJhc2UgYnkgSUQKICAgICAgKiBAcGFyYW0gaWQgVGhlIGlkZW50aWZpZXIva2V5IGZvciB0aGUgdmFsdWUKICAgICAgKiBAcmV0dXJucyBUaGUgc3RvcmVkIHZhbHVlIG9yIG51bGwgaWYgbm90IGZvdW5kCiAgICAgICovCiAgICBhc3luYyBnZXRJdGVtKGlkKSB7CiAgICAgICAgaWYgKCF0aGlzLmRiKSB7CiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdCgpOwogICAgICAgIH0KICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gewogICAgICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IHRoaXMuZGIudHJhbnNhY3Rpb24odGhpcy5zdG9yZU5hbWUsICdyZWFkb25seScpOwogICAgICAgICAgICAvLyBIYW5kbGUgdHJhbnNhdGlvbgogICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmVycm9yID0gKGV2ZW50KSA9PiB7CiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBUcmFuc2FjdGlvbiBlcnJvciBmb3IgZ2V0SXRlbSgke2lkfSk6ICR7ZXZlbnQudGFyZ2V0LmVycm9yfWApKTsKICAgICAgICAgICAgfTsKICAgICAgICAgICAgdHJhbnNhY3Rpb24ub25hYm9ydCA9IChldmVudCkgPT4gewogICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVHJhbnNhY3Rpb24gYWJvcnRlZCBmb3IgZ2V0SXRlbSgke2lkfSk6ICR7ZXZlbnQudGFyZ2V0LmVycm9yfWApKTsKICAgICAgICAgICAgfTsKICAgICAgICAgICAgLy8gUGVyZm9ybSB0aGUgcmVxdWVzdCB3aXRoaW4gdGhlIHRyYW5zYWN0aW9uCiAgICAgICAgICAgIGNvbnN0IHN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUodGhpcy5zdG9yZU5hbWUpOwogICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gc3RvcmUuZ2V0KGlkKTsKICAgICAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7CiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcXVlc3QucmVzdWx0IHx8IG51bGwpOwogICAgICAgICAgICB9OwogICAgICAgIH0pOwogICAgfQogICAgLyoqCiAgICAgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgZGF0YWJhc2UKICAgICAqIEBwYXJhbSBpZCBUaGUgaWRlbnRpZmllciBvZiB0aGUgaXRlbSB0byByZW1vdmUKICAgICAqLwogICAgYXN5bmMgZGVsZXRlSXRlbShpZCkgewogICAgICAgIGlmICghdGhpcy5kYikgewogICAgICAgICAgICBhd2FpdCB0aGlzLmluaXQoKTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHsKICAgICAgICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSB0aGlzLmRiLnRyYW5zYWN0aW9uKHRoaXMuc3RvcmVOYW1lLCAncmVhZHdyaXRlJyk7CiAgICAgICAgICAgIC8vIEhhbmRsZSB0cmFuc2F0aW9uCiAgICAgICAgICAgIHRyYW5zYWN0aW9uLm9uY29tcGxldGUgPSAoKSA9PiB7CiAgICAgICAgICAgICAgICByZXNvbHZlKCk7CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHRyYW5zYWN0aW9uLm9uZXJyb3IgPSAoZXZlbnQpID0+IHsKICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFRyYW5zYWN0aW9uIGVycm9yIGZvciBkZWxldGVJdGVtKCR7aWR9KTogJHtldmVudC50YXJnZXQuZXJyb3J9YCkpOwogICAgICAgICAgICB9OwogICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmFib3J0ID0gKGV2ZW50KSA9PiB7CiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBUcmFuc2FjdGlvbiBhYm9ydGVkIGZvciBkZWxldGVJdGVtKCR7aWR9KTogJHtldmVudC50YXJnZXQuZXJyb3J9YCkpOwogICAgICAgICAgICB9OwogICAgICAgICAgICAvLyBQZXJmb3JtIHRoZSByZXF1ZXN0IHdpdGhpbiB0aGUgdHJhbnNhY3Rpb24KICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZSh0aGlzLnN0b3JlTmFtZSk7CiAgICAgICAgICAgIHN0b3JlLmRlbGV0ZShpZCk7CiAgICAgICAgfSk7CiAgICB9CiAgICAvKioKICAgICAqIENsZWFycyBhbGwgaXRlbXMgZnJvbSB0aGUgZGF0YWJhc2UKICAgICAqLwogICAgYXN5bmMgY2xlYXIoKSB7CiAgICAgICAgaWYgKCF0aGlzLmRiKSB7CiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdCgpOwogICAgICAgIH0KICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gewogICAgICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IHRoaXMuZGIudHJhbnNhY3Rpb24odGhpcy5zdG9yZU5hbWUsICdyZWFkd3JpdGUnKTsKICAgICAgICAgICAgLy8gSGFuZGxlIHRyYW5zYXRpb24KICAgICAgICAgICAgdHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9ICgpID0+IHsKICAgICAgICAgICAgICAgIHJlc29sdmUoKTsKICAgICAgICAgICAgfTsKICAgICAgICAgICAgdHJhbnNhY3Rpb24ub25lcnJvciA9IChldmVudCkgPT4gewogICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVHJhbnNhY3Rpb24gZXJyb3IgZm9yIGNsZWFyKCk6ICR7ZXZlbnQudGFyZ2V0LmVycm9yfWApKTsKICAgICAgICAgICAgfTsKICAgICAgICAgICAgdHJhbnNhY3Rpb24ub25hYm9ydCA9IChldmVudCkgPT4gewogICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVHJhbnNhY3Rpb24gYWJvcnRlZCBmb3IgY2xlYXIoKTogJHtldmVudC50YXJnZXQuZXJyb3J9YCkpOwogICAgICAgICAgICB9OwogICAgICAgICAgICAvLyBQZXJmb3JtIHRoZSByZXF1ZXN0IHdpdGhpbiB0aGUgdHJhbnNhY3Rpb24KICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZSh0aGlzLnN0b3JlTmFtZSk7CiAgICAgICAgICAgIHN0b3JlLmNsZWFyKCk7CiAgICAgICAgfSk7CiAgICB9CiAgICAvKioKICAgICAqIENsb3NlcyB0aGUgZGF0YWJhc2UgY29ubmVjdGlvbgogICAgICovCiAgICBjbG9zZSgpIHsKICAgICAgICBpZiAodGhpcy5kYikgewogICAgICAgICAgICB0aGlzLmRiLmNsb3NlKCk7CiAgICAgICAgICAgIHRoaXMuZGIgPSBudWxsOwogICAgICAgIH0KICAgIH0KfQoKdmFyIFJlZnJlc2hNZXNzYWdlVHlwZXM7CihmdW5jdGlvbiAoUmVmcmVzaE1lc3NhZ2VUeXBlcykgewogICAgUmVmcmVzaE1lc3NhZ2VUeXBlc1siU0NIRURVTEUiXSA9ICJTQ0hFRFVMRSI7CiAgICBSZWZyZXNoTWVzc2FnZVR5cGVzWyJSRUZSRVNIIl0gPSAiUkVGUkVTSCI7CiAgICBSZWZyZXNoTWVzc2FnZVR5cGVzWyJTVE9QIl0gPSAiU1RPUCI7CiAgICBSZWZyZXNoTWVzc2FnZVR5cGVzWyJESVNDT05ORUNUIl0gPSAiRElTQ09OTkVDVCI7CiAgICBSZWZyZXNoTWVzc2FnZVR5cGVzWyJUT0tFTl9ERVRBSUxTIl0gPSAiVE9LRU5fREVUQUlMUyI7CiAgICBSZWZyZXNoTWVzc2FnZVR5cGVzWyJFUlJPUl9PTl9SRUZSRVNIIl0gPSAiRVJST1JfT05fUkVGUkVTSCI7CiAgICBSZWZyZXNoTWVzc2FnZVR5cGVzWyJFWFBJUkVEIl0gPSAiRVhQSVJFRCI7Cn0pKFJlZnJlc2hNZXNzYWdlVHlwZXMgfHwgKFJlZnJlc2hNZXNzYWdlVHlwZXMgPSB7fSkpOwoKLy8gQSBTZXQgdG8gc3RvcmUgYWxsIGNvbm5lY3RlZCBwb3J0cyAodGFicykKY29uc3QgcG9ydHMgPSBuZXcgU2V0KCk7CmNvbnN0IGJyb2FkY2FzdCA9IChtZXNzYWdlKSA9PiB7CiAgICBmb3IgKGNvbnN0IHAgb2YgcG9ydHMpIHsKICAgICAgICBwLnBvc3RNZXNzYWdlKG1lc3NhZ2UpOwogICAgfQp9OwpsZXQgcmVmcmVzaGVyOwpzZWxmLm9uY29ubmVjdCA9IChldmVudCkgPT4gewogICAgY29uc3QgcG9ydCA9IGV2ZW50LnBvcnRzWzBdOwogICAgcG9ydHMuYWRkKHBvcnQpOwogICAgLy8gbGF6eSBpbml0CiAgICBpZiAoIXJlZnJlc2hlcikgewogICAgICAgIHJlZnJlc2hlciA9IG5ldyBSZWZyZXNoZXIoYnJvYWRjYXN0LCBuZXcgU2Vzc2lvbklEQigpKTsKICAgIH0KICAgIC8vIGhhbmRsZSBtZXNzYWdlcwogICAgcG9ydC5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHsKICAgICAgICBjb25zdCB7IHR5cGUsIHBheWxvYWQgfSA9IGV2ZW50LmRhdGE7CiAgICAgICAgc3dpdGNoICh0eXBlKSB7CiAgICAgICAgICAgIGNhc2UgUmVmcmVzaE1lc3NhZ2VUeXBlcy5TQ0hFRFVMRToKICAgICAgICAgICAgICAgIHJlZnJlc2hlci5oYW5kbGVTY2hlZHVsZShwYXlsb2FkKTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlIFJlZnJlc2hNZXNzYWdlVHlwZXMuUkVGUkVTSDoKICAgICAgICAgICAgICAgIHJlZnJlc2hlci5oYW5kbGVSZWZyZXNoKHBvcnQpOwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGNhc2UgUmVmcmVzaE1lc3NhZ2VUeXBlcy5TVE9QOgogICAgICAgICAgICAgICAgcmVmcmVzaGVyLmhhbmRsZVN0b3AoKTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlIFJlZnJlc2hNZXNzYWdlVHlwZXMuRElTQ09OTkVDVDoKICAgICAgICAgICAgICAgIHBvcnRzLmRlbGV0ZShwb3J0KTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgIH07CiAgICBwb3J0Lm9ubWVzc2FnZWVycm9yID0gKCkgPT4gcG9ydHMuZGVsZXRlKHBvcnQpOwogICAgcG9ydC5zdGFydCgpOwp9OwpjbGFzcyBSZWZyZXNoZXIgewogICAgdG9rZW5EZXRhaWxzOwogICAgZXhwOwogICAgcmVmcmVzaFRpbWVvdXQ7CiAgICBmaW5hbExvZ291dFRpbWVvdXQ7CiAgICB0aW1lcnNBcmVSdW5uaW5nID0gZmFsc2U7CiAgICBicm9hZGNhc3Q7CiAgICBkYXRhYmFzZTsKICAgIHJlZnJlc2hQcm9taXNlOwogICAgY29uc3RydWN0b3IoYnJvYWRjYXN0LCBkYXRhYmFzZSkgewogICAgICAgIHRoaXMuYnJvYWRjYXN0ID0gYnJvYWRjYXN0OwogICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYXRhYmFzZTsKICAgIH0KICAgIGFzeW5jIGhhbmRsZVNjaGVkdWxlKHRva2VuRGV0YWlscykgewogICAgICAgIHRoaXMudG9rZW5EZXRhaWxzID0gdG9rZW5EZXRhaWxzOwogICAgICAgIHRoaXMuZXhwID0gZGVjb2RlSnd0KHRoaXMudG9rZW5EZXRhaWxzLmFjY2Vzc190b2tlbikuZXhwOwogICAgICAgIHRoaXMuYnJvYWRjYXN0KHsKICAgICAgICAgICAgdHlwZTogUmVmcmVzaE1lc3NhZ2VUeXBlcy5UT0tFTl9ERVRBSUxTLAogICAgICAgICAgICBwYXlsb2FkOiB7IHRva2VuRGV0YWlsczogdGhpcy50b2tlbkRldGFpbHMgfQogICAgICAgIH0pOwogICAgICAgIGNvbnNvbGUubG9nKGBbUmVmcmVzaFdvcmtlcl0gU2NoZWR1bGluZyB0aW1lcnMsIGV4cGlyeSBpbiAke3RoaXMudG9rZW5EZXRhaWxzLmV4cGlyZXNfaW59c2ApOwogICAgICAgIHRoaXMuc2NoZWR1bGVUaW1lcnModGhpcy50b2tlbkRldGFpbHMuZXhwaXJlc19pbik7CiAgICAgICAgdGhpcy50aW1lcnNBcmVSdW5uaW5nID0gdHJ1ZTsKICAgIH0KICAgIGFzeW5jIGhhbmRsZVJlZnJlc2gocmVxdWVzdGluZ1BvcnQpIHsKICAgICAgICBpZiAodGhpcy50b2tlbkRldGFpbHMgJiYgdGhpcy5leHAgJiYgIXRoaXMuaXNUb2tlbkV4cGlyZWQodGhpcy5leHApKSB7CiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbUmVmcmVzaFdvcmtlcl0gUHJvdmlkaW5nIGN1cnJlbnQgdG9rZW5zYCk7CiAgICAgICAgICAgIHJlcXVlc3RpbmdQb3J0LnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgIHR5cGU6IFJlZnJlc2hNZXNzYWdlVHlwZXMuVE9LRU5fREVUQUlMUywKICAgICAgICAgICAgICAgIHBheWxvYWQ6IHsgdG9rZW5EZXRhaWxzOiB0aGlzLnRva2VuRGV0YWlscyB9CiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlIHsKICAgICAgICAgICAgY29uc29sZS5sb2coYFtSZWZyZXNoV29ya2VyXSBSZWZyZXNoaW5nIHRva2Vuc2ApOwogICAgICAgICAgICB0aGlzLnBlcmZvcm1SZWZyZXNoKCk7CiAgICAgICAgfQogICAgfQogICAgaGFuZGxlU3RvcCgpIHsKICAgICAgICBpZiAoIXRoaXMudG9rZW5EZXRhaWxzKSB7CiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbUmVmcmVzaFdvcmtlcl0gUmVjZWl2ZWQgU1RPUCwgYmVpbmcgaWRsZScpOwogICAgICAgICAgICByZXR1cm47CiAgICAgICAgfQogICAgICAgIHRoaXMuYnJvYWRjYXN0KHsgdHlwZTogUmVmcmVzaE1lc3NhZ2VUeXBlcy5FWFBJUkVEIH0pOwogICAgICAgIHRoaXMudG9rZW5EZXRhaWxzID0gdW5kZWZpbmVkOwogICAgICAgIHRoaXMuZXhwID0gdW5kZWZpbmVkOwogICAgICAgIHRoaXMucmVmcmVzaFByb21pc2UgPSB1bmRlZmluZWQ7CiAgICAgICAgY29uc29sZS5sb2coJ1tSZWZyZXNoV29ya2VyXSBSZWNlaXZlZCBTVE9QLCBjbGVhcmluZyB0aW1lcnMnKTsKICAgICAgICB0aGlzLmNsZWFyQWxsVGltZXJzKCk7CiAgICB9CiAgICBhc3luYyBwZXJmb3JtUmVmcmVzaCgpIHsKICAgICAgICBpZiAodGhpcy5yZWZyZXNoUHJvbWlzZSkgewogICAgICAgICAgICBjb25zb2xlLmxvZygnW1JlZnJlc2hXb3JrZXJdIFJlZnJlc2ggYWxyZWFkeSBpbiBwcm9ncmVzcywgd2FpdGluZy4uLicpOwogICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZyZXNoUHJvbWlzZTsKICAgICAgICB9CiAgICAgICAgdGhpcy5yZWZyZXNoUHJvbWlzZSA9IHRoaXMuZG9SZWZyZXNoKCk7CiAgICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaFByb21pc2U7CiAgICB9CiAgICBhc3luYyBkb1JlZnJlc2goKSB7CiAgICAgICAgdHJ5IHsKICAgICAgICAgICAgdGhpcy50b2tlbkRldGFpbHMgPSBhd2FpdCByZW5ld1Rva2Vucyh0aGlzLmRhdGFiYXNlKTsKICAgICAgICAgICAgdGhpcy5leHAgPSBkZWNvZGVKd3QodGhpcy50b2tlbkRldGFpbHMuYWNjZXNzX3Rva2VuKS5leHA7CiAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0KHsKICAgICAgICAgICAgICAgIHR5cGU6IFJlZnJlc2hNZXNzYWdlVHlwZXMuVE9LRU5fREVUQUlMUywKICAgICAgICAgICAgICAgIHBheWxvYWQ6IHsgdG9rZW5EZXRhaWxzOiB0aGlzLnRva2VuRGV0YWlscyB9CiAgICAgICAgICAgIH0pOwogICAgICAgICAgICBjb25zb2xlLmxvZyhgW1JlZnJlc2hXb3JrZXJdIFRva2VuIHJlZnJlc2hlZGApOwogICAgICAgICAgICBjb25zb2xlLmxvZyhgW1JlZnJlc2hXb3JrZXJdIFNjaGVkdWxpbmcgdGltZXJzLCBleHBpcnkgaW4gJHt0aGlzLnRva2VuRGV0YWlscy5leHBpcmVzX2lufXNgKTsKICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVRpbWVycyh0aGlzLnRva2VuRGV0YWlscy5leHBpcmVzX2luKTsKICAgICAgICB9CiAgICAgICAgY2F0Y2ggKGVycm9yKSB7CiAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0KHsKICAgICAgICAgICAgICAgIHR5cGU6IFJlZnJlc2hNZXNzYWdlVHlwZXMuRVJST1JfT05fUkVGUkVTSCwKICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlCiAgICAgICAgICAgIH0pOwogICAgICAgICAgICBjb25zb2xlLmxvZyhgW1JlZnJlc2hXb3JrZXJdYCwgZXJyb3IubWVzc2FnZSk7CiAgICAgICAgfQogICAgICAgIGZpbmFsbHkgewogICAgICAgICAgICB0aGlzLnJlZnJlc2hQcm9taXNlID0gdW5kZWZpbmVkOwogICAgICAgIH0KICAgIH0KICAgIGNsZWFyQWxsVGltZXJzKCkgewogICAgICAgIGlmICh0aGlzLnJlZnJlc2hUaW1lb3V0KQogICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5yZWZyZXNoVGltZW91dCk7CiAgICAgICAgaWYgKHRoaXMuZmluYWxMb2dvdXRUaW1lb3V0KQogICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5maW5hbExvZ291dFRpbWVvdXQpOwogICAgICAgIHRoaXMudGltZXJzQXJlUnVubmluZyA9IGZhbHNlOwogICAgfQogICAgc2NoZWR1bGVUaW1lcnMoZXhwaXJlc0luKSB7CiAgICAgICAgdGhpcy5jbGVhckFsbFRpbWVycygpOwogICAgICAgIHRoaXMudGltZXJzQXJlUnVubmluZyA9IHRydWU7CiAgICAgICAgY29uc3QgZXhwaXJlc0luTXMgPSBleHBpcmVzSW4gKiAxMDAwOwogICAgICAgIGNvbnN0IFJFRlJFU0hfVEhSRVNIT0xEX1JBVElPID0gMC44OwogICAgICAgIGNvbnN0IE1JTklNVU1fUkVGUkVTSF9CVUZGRVJfTVMgPSAzMCAqIDEwMDA7CiAgICAgICAgY29uc3QgdGltZVVudGlsUmVmcmVzaCA9IFJFRlJFU0hfVEhSRVNIT0xEX1JBVElPICogZXhwaXJlc0luTXM7CiAgICAgICAgaWYgKHRpbWVVbnRpbFJlZnJlc2ggPiBNSU5JTVVNX1JFRlJFU0hfQlVGRkVSX01TKSB7CiAgICAgICAgICAgIHRoaXMucmVmcmVzaFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGVyZm9ybVJlZnJlc2goKSwgdGltZVVudGlsUmVmcmVzaCk7CiAgICAgICAgfQogICAgICAgIGNvbnN0IExPR09VVF9XQVJOSU5HX0JVRkZFUl9NUyA9IDUgKiAxMDAwOwogICAgICAgIGNvbnN0IHRpbWVVbnRpbExvZ291dCA9IGV4cGlyZXNJbk1zIC0gTE9HT1VUX1dBUk5JTkdfQlVGRkVSX01TOwogICAgICAgIHRoaXMuZmluYWxMb2dvdXRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7CiAgICAgICAgICAgIHRoaXMudG9rZW5EZXRhaWxzID0gdW5kZWZpbmVkOwogICAgICAgICAgICB0aGlzLmJyb2FkY2FzdCh7IHR5cGU6IFJlZnJlc2hNZXNzYWdlVHlwZXMuRVhQSVJFRCB9KTsKICAgICAgICB9LCB0aW1lVW50aWxMb2dvdXQpOwogICAgfQogICAgaXNUb2tlbkV4cGlyZWQoZXhwLCBidWZmZXJTZWNvbmRzID0gMCkgewogICAgICAgIGlmICh0eXBlb2YgZXhwICE9PSAnbnVtYmVyJyB8fCBpc05hTihleHApKSB7CiAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgIH0KICAgICAgICBjb25zdCBjdXJyZW50VGltZVNlY29uZHMgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTsKICAgICAgICByZXR1cm4gZXhwIDwgKGN1cnJlbnRUaW1lU2Vjb25kcyArIGJ1ZmZlclNlY29uZHMpOwogICAgfQogICAgc2V0VG9rZW5EZXRhaWxzKHRva2VuRGV0YWlscykgewogICAgICAgIHRoaXMudG9rZW5EZXRhaWxzID0gdG9rZW5EZXRhaWxzOwogICAgfQogICAgLy8gRm9yIHRlc3RpbmcKICAgIGdldFRpbWVyc0FyZVJ1bm5pbmcoKSB7IHJldHVybiB0aGlzLnRpbWVyc0FyZVJ1bm5pbmc7IH0KICAgIGdldFRva2VuRGV0YWlscygpIHsgcmV0dXJuIHRoaXMudG9rZW5EZXRhaWxzOyB9Cn0KCmV4cG9ydCB7IFJlZnJlc2hlciB9Owo=", "" + import.meta.url), Bl;
(function(e) {
	e.SCHEDULE = "SCHEDULE", e.REFRESH = "REFRESH", e.STOP = "STOP", e.DISCONNECT = "DISCONNECT", e.TOKEN_DETAILS = "TOKEN_DETAILS", e.ERROR_ON_REFRESH = "ERROR_ON_REFRESH", e.EXPIRED = "EXPIRED";
})(Bl ||= {});
var Vl = class {
	dbName;
	storeName;
	dbVersion;
	db = null;
	constructor(e = "soidc", t = "session", n = 1) {
		this.dbName = e, this.storeName = t, this.dbVersion = n;
	}
	async init() {
		return new Promise((e, t) => {
			let n = indexedDB.open(this.dbName, this.dbVersion);
			n.onerror = (e) => {
				t(/* @__PURE__ */ Error(`Database error: ${e.target.error}`));
			}, n.onsuccess = (t) => {
				this.db = t.target.result, e(this);
			}, n.onupgradeneeded = (e) => {
				let t = e.target.result;
				t.objectStoreNames.contains(this.storeName) || t.createObjectStore(this.storeName);
			};
		});
	}
	async setItem(e, t) {
		return this.db || await this.init(), new Promise((n, r) => {
			let i = this.db.transaction(this.storeName, "readwrite");
			i.oncomplete = () => {
				n();
			}, i.onerror = (t) => {
				r(/* @__PURE__ */ Error(`Transaction error for setItem(${e},...): ${t.target.error}`));
			}, i.onabort = (t) => {
				r(/* @__PURE__ */ Error(`Transaction aborted for setItem(${e},...): ${t.target.error}`));
			}, i.objectStore(this.storeName).put(t, e);
		});
	}
	async getItem(e) {
		return this.db || await this.init(), new Promise((t, n) => {
			let r = this.db.transaction(this.storeName, "readonly");
			r.onerror = (t) => {
				n(/* @__PURE__ */ Error(`Transaction error for getItem(${e}): ${t.target.error}`));
			}, r.onabort = (t) => {
				n(/* @__PURE__ */ Error(`Transaction aborted for getItem(${e}): ${t.target.error}`));
			};
			let i = r.objectStore(this.storeName).get(e);
			i.onsuccess = () => {
				t(i.result || null);
			};
		});
	}
	async deleteItem(e) {
		return this.db || await this.init(), new Promise((t, n) => {
			let r = this.db.transaction(this.storeName, "readwrite");
			r.oncomplete = () => {
				t();
			}, r.onerror = (t) => {
				n(/* @__PURE__ */ Error(`Transaction error for deleteItem(${e}): ${t.target.error}`));
			}, r.onabort = (t) => {
				n(/* @__PURE__ */ Error(`Transaction aborted for deleteItem(${e}): ${t.target.error}`));
			}, r.objectStore(this.storeName).delete(e);
		});
	}
	async clear() {
		return this.db || await this.init(), new Promise((e, t) => {
			let n = this.db.transaction(this.storeName, "readwrite");
			n.oncomplete = () => {
				e();
			}, n.onerror = (e) => {
				t(/* @__PURE__ */ Error(`Transaction error for clear(): ${e.target.error}`));
			}, n.onabort = (e) => {
				t(/* @__PURE__ */ Error(`Transaction aborted for clear(): ${e.target.error}`));
			}, n.objectStore(this.storeName).clear();
		});
	}
	close() {
		this.db &&= (this.db.close(), null);
	}
}, Hl = class extends Rl {
	worker;
	constructor(e, t) {
		let n = new Vl(), r = {
			...t,
			database: n
		};
		super(e, r);
		let i = t?.workerUrl ?? zl();
		this.worker = new SharedWorker(i, { type: "module" }), this.worker.port.onmessage = (e) => {
			this.handleWorkerMessage(e.data).catch(console.error);
		}, window.addEventListener("beforeunload", () => {
			this.worker.port.postMessage({ type: Bl.DISCONNECT });
		});
	}
	async handleWorkerMessage(e) {
		let { type: t, payload: n, error: r } = e;
		switch (t) {
			case Bl.TOKEN_DETAILS:
				let e = this.isActive;
				await this.setTokenDetails(n.tokenDetails), e !== this.isActive && this.dispatchStateChangeEvent(), this.refreshPromise && this.resolveRefresh && (this.resolveRefresh(), this.clearRefreshPromise());
				break;
			case Bl.ERROR_ON_REFRESH:
				this.isActive && this.dispatchExpirationWarningEvent(), this.refreshPromise && this.rejectRefresh && (this.isActive ? this.rejectRefresh(Error(r || "Token refresh failed")) : this.rejectRefresh(/* @__PURE__ */ Error("No session to restore")), this.clearRefreshPromise());
				break;
			case Bl.EXPIRED: this.isActive && (this.dispatchExpirationEvent(), await this.logout()), this.refreshPromise && this.rejectRefresh && (this.rejectRefresh(Error(r || "Token refresh failed")), this.clearRefreshPromise());
		}
	}
	async handleRedirectFromLogin() {
		await super.handleRedirectFromLogin(), this.isActive && this.worker.port.postMessage({
			type: Bl.SCHEDULE,
			payload: {
				...this.getTokenDetails(),
				expires_in: this.getExpiresIn()
			}
		});
	}
	async restore() {
		return this.refreshPromise || (this.refreshPromise = new Promise((e, t) => {
			this.resolveRefresh = e, this.rejectRefresh = t;
		}), this.worker.port.postMessage({ type: Bl.REFRESH })), this.refreshPromise;
	}
	async logout() {
		this.worker.port.postMessage({ type: Bl.STOP }), await super.logout();
	}
}, Ul = /* @__PURE__ */ c({
	SessionCore: () => Zd,
	SessionEvents: () => Xd
}), Wl = crypto, Gl = (e) => e instanceof CryptoKey, Kl = async (e, t) => {
	let n = `SHA-${e.slice(-3)}`;
	return new Uint8Array(await Wl.subtle.digest(n, t));
}, ql = new TextEncoder(), Jl = new TextDecoder();
function Yl(...e) {
	let t = e.reduce((e, { length: t }) => e + t, 0), n = new Uint8Array(t), r = 0;
	for (let t of e) n.set(t, r), r += t.length;
	return n;
}
var Xl = (e) => {
	let t = e;
	typeof t == "string" && (t = ql.encode(t));
	let n = 32768, r = [];
	for (let e = 0; e < t.length; e += n) r.push(String.fromCharCode.apply(null, t.subarray(e, e + n)));
	return btoa(r.join(""));
}, Zl = (e) => Xl(e).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"), Ql = (e) => {
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
	return n;
}, $l = (e) => {
	let t = e;
	t instanceof Uint8Array && (t = Jl.decode(t)), t = t.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
	try {
		return Ql(t);
	} catch {
		throw TypeError("The input to be decoded is not correctly encoded.");
	}
}, eu = class extends Error {
	constructor(e, t) {
		super(e, t), this.code = "ERR_JOSE_GENERIC", this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
	}
};
eu.code = "ERR_JOSE_GENERIC";
var tu = class extends eu {
	constructor(e, t, n = "unspecified", r = "unspecified") {
		super(e, { cause: {
			claim: n,
			reason: r,
			payload: t
		} }), this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED", this.claim = n, this.reason = r, this.payload = t;
	}
};
tu.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
var nu = class extends eu {
	constructor(e, t, n = "unspecified", r = "unspecified") {
		super(e, { cause: {
			claim: n,
			reason: r,
			payload: t
		} }), this.code = "ERR_JWT_EXPIRED", this.claim = n, this.reason = r, this.payload = t;
	}
};
nu.code = "ERR_JWT_EXPIRED";
var ru = class extends eu {
	constructor() {
		super(...arguments), this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
	}
};
ru.code = "ERR_JOSE_ALG_NOT_ALLOWED";
var iu = class extends eu {
	constructor() {
		super(...arguments), this.code = "ERR_JOSE_NOT_SUPPORTED";
	}
};
iu.code = "ERR_JOSE_NOT_SUPPORTED";
var au = class extends eu {
	constructor(e = "decryption operation failed", t) {
		super(e, t), this.code = "ERR_JWE_DECRYPTION_FAILED";
	}
};
au.code = "ERR_JWE_DECRYPTION_FAILED";
var ou = class extends eu {
	constructor() {
		super(...arguments), this.code = "ERR_JWE_INVALID";
	}
};
ou.code = "ERR_JWE_INVALID";
var su = class extends eu {
	constructor() {
		super(...arguments), this.code = "ERR_JWS_INVALID";
	}
};
su.code = "ERR_JWS_INVALID";
var cu = class extends eu {
	constructor() {
		super(...arguments), this.code = "ERR_JWT_INVALID";
	}
};
cu.code = "ERR_JWT_INVALID";
var lu = class extends eu {
	constructor() {
		super(...arguments), this.code = "ERR_JWK_INVALID";
	}
};
lu.code = "ERR_JWK_INVALID";
var uu = class extends eu {
	constructor() {
		super(...arguments), this.code = "ERR_JWKS_INVALID";
	}
};
uu.code = "ERR_JWKS_INVALID";
var du = class extends eu {
	constructor(e = "no applicable key found in the JSON Web Key Set", t) {
		super(e, t), this.code = "ERR_JWKS_NO_MATCHING_KEY";
	}
};
du.code = "ERR_JWKS_NO_MATCHING_KEY";
var fu = class extends eu {
	constructor(e = "multiple matching keys found in the JSON Web Key Set", t) {
		super(e, t), this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
	}
};
fu.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
var pu = class extends eu {
	constructor(e = "request timed out", t) {
		super(e, t), this.code = "ERR_JWKS_TIMEOUT";
	}
};
pu.code = "ERR_JWKS_TIMEOUT";
var mu = class extends eu {
	constructor(e = "signature verification failed", t) {
		super(e, t), this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
	}
};
mu.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
function hu(e, t = "algorithm.name") {
	return /* @__PURE__ */ TypeError(`CryptoKey does not support this operation, its ${t} must be ${e}`);
}
function gu(e, t) {
	return e.name === t;
}
function _u(e) {
	return parseInt(e.name.slice(4), 10);
}
function vu(e) {
	switch (e) {
		case "ES256": return "P-256";
		case "ES384": return "P-384";
		case "ES512": return "P-521";
		default: throw Error("unreachable");
	}
}
function yu(e, t) {
	if (t.length && !t.some((t) => e.usages.includes(t))) {
		let e = "CryptoKey does not support this operation, its usages must include ";
		if (t.length > 2) {
			let n = t.pop();
			e += `one of ${t.join(", ")}, or ${n}.`;
		} else t.length === 2 ? e += `one of ${t[0]} or ${t[1]}.` : e += `${t[0]}.`;
		throw TypeError(e);
	}
}
function bu(e, t, ...n) {
	switch (t) {
		case "HS256":
		case "HS384":
		case "HS512": {
			if (!gu(e.algorithm, "HMAC")) throw hu("HMAC");
			let n = parseInt(t.slice(2), 10);
			if (_u(e.algorithm.hash) !== n) throw hu(`SHA-${n}`, "algorithm.hash");
			break;
		}
		case "RS256":
		case "RS384":
		case "RS512": {
			if (!gu(e.algorithm, "RSASSA-PKCS1-v1_5")) throw hu("RSASSA-PKCS1-v1_5");
			let n = parseInt(t.slice(2), 10);
			if (_u(e.algorithm.hash) !== n) throw hu(`SHA-${n}`, "algorithm.hash");
			break;
		}
		case "PS256":
		case "PS384":
		case "PS512": {
			if (!gu(e.algorithm, "RSA-PSS")) throw hu("RSA-PSS");
			let n = parseInt(t.slice(2), 10);
			if (_u(e.algorithm.hash) !== n) throw hu(`SHA-${n}`, "algorithm.hash");
			break;
		}
		case "EdDSA":
			if (e.algorithm.name !== "Ed25519" && e.algorithm.name !== "Ed448") throw hu("Ed25519 or Ed448");
			break;
		case "Ed25519":
			if (!gu(e.algorithm, "Ed25519")) throw hu("Ed25519");
			break;
		case "ES256":
		case "ES384":
		case "ES512": {
			if (!gu(e.algorithm, "ECDSA")) throw hu("ECDSA");
			let n = vu(t);
			if (e.algorithm.namedCurve !== n) throw hu(n, "algorithm.namedCurve");
			break;
		}
		default: throw TypeError("CryptoKey does not support this operation");
	}
	yu(e, n);
}
function xu(e, t, ...n) {
	if (n = n.filter(Boolean), n.length > 2) {
		let t = n.pop();
		e += `one of type ${n.join(", ")}, or ${t}.`;
	} else n.length === 2 ? e += `one of type ${n[0]} or ${n[1]}.` : e += `of type ${n[0]}.`;
	return t == null ? e += ` Received ${t}` : typeof t == "function" && t.name ? e += ` Received function ${t.name}` : typeof t == "object" && t && t.constructor?.name && (e += ` Received an instance of ${t.constructor.name}`), e;
}
var Su = (e, ...t) => xu("Key must be ", e, ...t);
function Cu(e, t, ...n) {
	return xu(`Key for the ${e} algorithm must be `, t, ...n);
}
var wu = (e) => Gl(e) ? !0 : e?.[Symbol.toStringTag] === "KeyObject", Tu = ["CryptoKey"], Eu = (...e) => {
	let t = e.filter(Boolean);
	if (t.length === 0 || t.length === 1) return !0;
	let n;
	for (let e of t) {
		let t = Object.keys(e);
		if (!n || n.size === 0) n = new Set(t);
		else for (let e of t) {
			if (n.has(e)) return !1;
			n.add(e);
		}
	}
	return !0;
};
function Du(e) {
	return typeof e == "object" && !!e;
}
function Ou(e) {
	if (!Du(e) || Object.prototype.toString.call(e) !== "[object Object]") return !1;
	if (Object.getPrototypeOf(e) === null) return !0;
	let t = e;
	for (; Object.getPrototypeOf(t) !== null;) t = Object.getPrototypeOf(t);
	return Object.getPrototypeOf(e) === t;
}
var ku = (e, t) => {
	if (e.startsWith("RS") || e.startsWith("PS")) {
		let { modulusLength: n } = t.algorithm;
		if (typeof n != "number" || n < 2048) throw TypeError(`${e} requires key modulusLength to be 2048 bits or larger`);
	}
};
function Au(e) {
	return Ou(e) && typeof e.kty == "string";
}
function ju(e) {
	return e.kty !== "oct" && typeof e.d == "string";
}
function Mu(e) {
	return e.kty !== "oct" && e.d === void 0;
}
function Nu(e) {
	return Au(e) && e.kty === "oct" && typeof e.k == "string";
}
function Pu(e) {
	let t, n;
	switch (e.kty) {
		case "RSA":
			switch (e.alg) {
				case "PS256":
				case "PS384":
				case "PS512":
					t = {
						name: "RSA-PSS",
						hash: `SHA-${e.alg.slice(-3)}`
					}, n = e.d ? ["sign"] : ["verify"];
					break;
				case "RS256":
				case "RS384":
				case "RS512":
					t = {
						name: "RSASSA-PKCS1-v1_5",
						hash: `SHA-${e.alg.slice(-3)}`
					}, n = e.d ? ["sign"] : ["verify"];
					break;
				case "RSA-OAEP":
				case "RSA-OAEP-256":
				case "RSA-OAEP-384":
				case "RSA-OAEP-512":
					t = {
						name: "RSA-OAEP",
						hash: `SHA-${parseInt(e.alg.slice(-3), 10) || 1}`
					}, n = e.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
					break;
				default: throw new iu("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			}
			break;
		case "EC":
			switch (e.alg) {
				case "ES256":
					t = {
						name: "ECDSA",
						namedCurve: "P-256"
					}, n = e.d ? ["sign"] : ["verify"];
					break;
				case "ES384":
					t = {
						name: "ECDSA",
						namedCurve: "P-384"
					}, n = e.d ? ["sign"] : ["verify"];
					break;
				case "ES512":
					t = {
						name: "ECDSA",
						namedCurve: "P-521"
					}, n = e.d ? ["sign"] : ["verify"];
					break;
				case "ECDH-ES":
				case "ECDH-ES+A128KW":
				case "ECDH-ES+A192KW":
				case "ECDH-ES+A256KW":
					t = {
						name: "ECDH",
						namedCurve: e.crv
					}, n = e.d ? ["deriveBits"] : [];
					break;
				default: throw new iu("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			}
			break;
		case "OKP":
			switch (e.alg) {
				case "Ed25519":
					t = { name: "Ed25519" }, n = e.d ? ["sign"] : ["verify"];
					break;
				case "EdDSA":
					t = { name: e.crv }, n = e.d ? ["sign"] : ["verify"];
					break;
				case "ECDH-ES":
				case "ECDH-ES+A128KW":
				case "ECDH-ES+A192KW":
				case "ECDH-ES+A256KW":
					t = { name: e.crv }, n = e.d ? ["deriveBits"] : [];
					break;
				default: throw new iu("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			}
			break;
		default: throw new iu("Invalid or unsupported JWK \"kty\" (Key Type) Parameter value");
	}
	return {
		algorithm: t,
		keyUsages: n
	};
}
var Fu = async (e) => {
	if (!e.alg) throw TypeError("\"alg\" argument is required when \"jwk.alg\" is not present");
	let { algorithm: t, keyUsages: n } = Pu(e), r = [
		t,
		e.ext ?? !1,
		e.key_ops ?? n
	], i = { ...e };
	return delete i.alg, delete i.use, Wl.subtle.importKey("jwk", i, ...r);
}, Iu = (e) => $l(e), Lu, Ru, zu = (e) => e?.[Symbol.toStringTag] === "KeyObject", Bu = async (e, t, n, r, i = !1) => {
	let a = e.get(t);
	if (a?.[r]) return a[r];
	let o = await Fu({
		...n,
		alg: r
	});
	return i && Object.freeze(t), a ? a[r] = o : e.set(t, { [r]: o }), o;
}, Vu = {
	normalizePublicKey: (e, t) => {
		if (zu(e)) {
			let n = e.export({ format: "jwk" });
			return delete n.d, delete n.dp, delete n.dq, delete n.p, delete n.q, delete n.qi, n.k ? Iu(n.k) : (Ru ||= /* @__PURE__ */ new WeakMap(), Bu(Ru, e, n, t));
		}
		return Au(e) ? e.k ? $l(e.k) : (Ru ||= /* @__PURE__ */ new WeakMap(), Bu(Ru, e, e, t, !0)) : e;
	},
	normalizePrivateKey: (e, t) => {
		if (zu(e)) {
			let n = e.export({ format: "jwk" });
			return n.k ? Iu(n.k) : (Lu ||= /* @__PURE__ */ new WeakMap(), Bu(Lu, e, n, t));
		}
		return Au(e) ? e.k ? $l(e.k) : (Lu ||= /* @__PURE__ */ new WeakMap(), Bu(Lu, e, e, t, !0)) : e;
	}
};
async function Hu(e, t) {
	if (!Ou(e)) throw TypeError("JWK must be an object");
	switch (t ||= e.alg, e.kty) {
		case "oct":
			if (typeof e.k != "string" || !e.k) throw TypeError("missing \"k\" (Key Value) Parameter value");
			return $l(e.k);
		case "RSA": if ("oth" in e && e.oth !== void 0) throw new iu("RSA JWK \"oth\" (Other Primes Info) Parameter value is not supported");
		case "EC":
		case "OKP": return Fu({
			...e,
			alg: t
		});
		default: throw new iu("Unsupported \"kty\" (Key Type) Parameter value");
	}
}
var Uu = (e) => e?.[Symbol.toStringTag], Wu = (e, t, n) => {
	if (t.use !== void 0 && t.use !== "sig") throw TypeError("Invalid key for this operation, when present its use must be sig");
	if (t.key_ops !== void 0 && t.key_ops.includes?.(n) !== !0) throw TypeError(`Invalid key for this operation, when present its key_ops must include ${n}`);
	if (t.alg !== void 0 && t.alg !== e) throw TypeError(`Invalid key for this operation, when present its alg must be ${e}`);
	return !0;
}, Gu = (e, t, n, r) => {
	if (!(t instanceof Uint8Array)) {
		if (r && Au(t)) {
			if (Nu(t) && Wu(e, t, n)) return;
			throw TypeError("JSON Web Key for symmetric algorithms must have JWK \"kty\" (Key Type) equal to \"oct\" and the JWK \"k\" (Key Value) present");
		}
		if (!wu(t)) throw TypeError(Cu(e, t, ...Tu, "Uint8Array", r ? "JSON Web Key" : null));
		if (t.type !== "secret") throw TypeError(`${Uu(t)} instances for symmetric algorithms must be of type "secret"`);
	}
}, Ku = (e, t, n, r) => {
	if (r && Au(t)) switch (n) {
		case "sign":
			if (ju(t) && Wu(e, t, n)) return;
			throw TypeError("JSON Web Key for this operation be a private JWK");
		case "verify":
			if (Mu(t) && Wu(e, t, n)) return;
			throw TypeError("JSON Web Key for this operation be a public JWK");
	}
	if (!wu(t)) throw TypeError(Cu(e, t, ...Tu, r ? "JSON Web Key" : null));
	if (t.type === "secret") throw TypeError(`${Uu(t)} instances for asymmetric algorithms must not be of type "secret"`);
	if (n === "sign" && t.type === "public") throw TypeError(`${Uu(t)} instances for asymmetric algorithm signing must be of type "private"`);
	if (n === "decrypt" && t.type === "public") throw TypeError(`${Uu(t)} instances for asymmetric algorithm decryption must be of type "private"`);
	if (t.algorithm && n === "verify" && t.type === "private") throw TypeError(`${Uu(t)} instances for asymmetric algorithm verifying must be of type "public"`);
	if (t.algorithm && n === "encrypt" && t.type === "private") throw TypeError(`${Uu(t)} instances for asymmetric algorithm encryption must be of type "public"`);
};
function qu(e, t, n, r) {
	t.startsWith("HS") || t === "dir" || t.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(t) ? Gu(t, n, r, e) : Ku(t, n, r, e);
}
qu.bind(void 0, !1);
var Ju = qu.bind(void 0, !0);
function Yu(e, t, n, r, i) {
	if (i.crit !== void 0 && r?.crit === void 0) throw new e("\"crit\" (Critical) Header Parameter MUST be integrity protected");
	if (!r || r.crit === void 0) return /* @__PURE__ */ new Set();
	if (!Array.isArray(r.crit) || r.crit.length === 0 || r.crit.some((e) => typeof e != "string" || e.length === 0)) throw new e("\"crit\" (Critical) Header Parameter MUST be an array of non-empty strings when present");
	let a;
	a = n === void 0 ? t : new Map([...Object.entries(n), ...t.entries()]);
	for (let t of r.crit) {
		if (!a.has(t)) throw new iu(`Extension Header Parameter "${t}" is not recognized`);
		if (i[t] === void 0) throw new e(`Extension Header Parameter "${t}" is missing`);
		if (a.get(t) && r[t] === void 0) throw new e(`Extension Header Parameter "${t}" MUST be integrity protected`);
	}
	return new Set(r.crit);
}
var Xu = (e, t) => {
	if (t !== void 0 && (!Array.isArray(t) || t.some((e) => typeof e != "string"))) throw TypeError(`"${e}" option must be an array of strings`);
	if (t) return new Set(t);
}, Zu = async (e) => {
	if (e instanceof Uint8Array) return {
		kty: "oct",
		k: Zl(e)
	};
	if (!Gl(e)) throw TypeError(Su(e, ...Tu, "Uint8Array"));
	if (!e.extractable) throw TypeError("non-extractable CryptoKey cannot be exported as a JWK");
	let { ext: t, key_ops: n, alg: r, use: i, ...a } = await Wl.subtle.exportKey("jwk", e);
	return a;
};
async function Qu(e) {
	return Zu(e);
}
function $u(e, t) {
	let n = `SHA-${e.slice(-3)}`;
	switch (e) {
		case "HS256":
		case "HS384":
		case "HS512": return {
			hash: n,
			name: "HMAC"
		};
		case "PS256":
		case "PS384":
		case "PS512": return {
			hash: n,
			name: "RSA-PSS",
			saltLength: e.slice(-3) >> 3
		};
		case "RS256":
		case "RS384":
		case "RS512": return {
			hash: n,
			name: "RSASSA-PKCS1-v1_5"
		};
		case "ES256":
		case "ES384":
		case "ES512": return {
			hash: n,
			name: "ECDSA",
			namedCurve: t.namedCurve
		};
		case "Ed25519": return { name: "Ed25519" };
		case "EdDSA": return { name: t.name };
		default: throw new iu(`alg ${e} is not supported either by JOSE or your javascript runtime`);
	}
}
async function ed(e, t, n) {
	if (n === "sign" && (t = await Vu.normalizePrivateKey(t, e)), n === "verify" && (t = await Vu.normalizePublicKey(t, e)), Gl(t)) return bu(t, e, n), t;
	if (t instanceof Uint8Array) {
		if (!e.startsWith("HS")) throw TypeError(Su(t, ...Tu));
		return Wl.subtle.importKey("raw", t, {
			hash: `SHA-${e.slice(-3)}`,
			name: "HMAC"
		}, !1, [n]);
	}
	throw TypeError(Su(t, ...Tu, "Uint8Array", "JSON Web Key"));
}
var td = async (e, t, n, r) => {
	let i = await ed(e, t, "verify");
	ku(e, i);
	let a = $u(e, i.algorithm);
	try {
		return await Wl.subtle.verify(a, i, n, r);
	} catch {
		return !1;
	}
};
async function nd(e, t, n) {
	if (!Ou(e)) throw new su("Flattened JWS must be an object");
	if (e.protected === void 0 && e.header === void 0) throw new su("Flattened JWS must have either of the \"protected\" or \"header\" members");
	if (e.protected !== void 0 && typeof e.protected != "string") throw new su("JWS Protected Header incorrect type");
	if (e.payload === void 0) throw new su("JWS Payload missing");
	if (typeof e.signature != "string") throw new su("JWS Signature missing or incorrect type");
	if (e.header !== void 0 && !Ou(e.header)) throw new su("JWS Unprotected Header incorrect type");
	let r = {};
	if (e.protected) try {
		let t = $l(e.protected);
		r = JSON.parse(Jl.decode(t));
	} catch {
		throw new su("JWS Protected Header is invalid");
	}
	if (!Eu(r, e.header)) throw new su("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
	let i = {
		...r,
		...e.header
	}, a = Yu(su, /* @__PURE__ */ new Map([["b64", !0]]), n?.crit, r, i), o = !0;
	if (a.has("b64") && (o = r.b64, typeof o != "boolean")) throw new su("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
	let { alg: s } = i;
	if (typeof s != "string" || !s) throw new su("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
	let c = n && Xu("algorithms", n.algorithms);
	if (c && !c.has(s)) throw new ru("\"alg\" (Algorithm) Header Parameter value not allowed");
	if (o) {
		if (typeof e.payload != "string") throw new su("JWS Payload must be a string");
	} else if (typeof e.payload != "string" && !(e.payload instanceof Uint8Array)) throw new su("JWS Payload must be a string or an Uint8Array instance");
	let l = !1;
	typeof t == "function" ? (t = await t(r, e), l = !0, Ju(s, t, "verify"), Au(t) && (t = await Hu(t, s))) : Ju(s, t, "verify");
	let u = Yl(ql.encode(e.protected ?? ""), ql.encode("."), typeof e.payload == "string" ? ql.encode(e.payload) : e.payload), d;
	try {
		d = $l(e.signature);
	} catch {
		throw new su("Failed to base64url decode the signature");
	}
	if (!await td(s, t, d, u)) throw new mu();
	let f;
	if (o) try {
		f = $l(e.payload);
	} catch {
		throw new su("Failed to base64url decode the payload");
	}
	else f = typeof e.payload == "string" ? ql.encode(e.payload) : e.payload;
	let p = { payload: f };
	return e.protected !== void 0 && (p.protectedHeader = r), e.header !== void 0 && (p.unprotectedHeader = e.header), l ? {
		...p,
		key: t
	} : p;
}
async function rd(e, t, n) {
	if (e instanceof Uint8Array && (e = Jl.decode(e)), typeof e != "string") throw new su("Compact JWS must be a string or Uint8Array");
	let { 0: r, 1: i, 2: a, length: o } = e.split(".");
	if (o !== 3) throw new su("Invalid Compact JWS");
	let s = await nd({
		payload: i,
		protected: r,
		signature: a
	}, t, n), c = {
		payload: s.payload,
		protectedHeader: s.protectedHeader
	};
	return typeof t == "function" ? {
		...c,
		key: s.key
	} : c;
}
var id = (e) => Math.floor(e.getTime() / 1e3), ad = 60, od = 3600, sd = od * 24, cd = sd * 7, ld = sd * 365.25, ud = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, dd = (e) => {
	let t = ud.exec(e);
	if (!t || t[4] && t[1]) throw TypeError("Invalid time period format");
	let n = parseFloat(t[2]), r = t[3].toLowerCase(), i;
	switch (r) {
		case "sec":
		case "secs":
		case "second":
		case "seconds":
		case "s":
			i = Math.round(n);
			break;
		case "minute":
		case "minutes":
		case "min":
		case "mins":
		case "m":
			i = Math.round(n * ad);
			break;
		case "hour":
		case "hours":
		case "hr":
		case "hrs":
		case "h":
			i = Math.round(n * od);
			break;
		case "day":
		case "days":
		case "d":
			i = Math.round(n * sd);
			break;
		case "week":
		case "weeks":
		case "w":
			i = Math.round(n * cd);
			break;
		default: i = Math.round(n * ld);
	}
	return t[1] === "-" || t[4] === "ago" ? -i : i;
}, fd = (e) => e.toLowerCase().replace(/^application\//, ""), pd = (e, t) => typeof e == "string" ? t.includes(e) : Array.isArray(e) ? t.some(Set.prototype.has.bind(new Set(e))) : !1, md = (e, t, n = {}) => {
	let r;
	try {
		r = JSON.parse(Jl.decode(t));
	} catch {}
	if (!Ou(r)) throw new cu("JWT Claims Set must be a top-level JSON object");
	let { typ: i } = n;
	if (i && (typeof e.typ != "string" || fd(e.typ) !== fd(i))) throw new tu("unexpected \"typ\" JWT header value", r, "typ", "check_failed");
	let { requiredClaims: a = [], issuer: o, subject: s, audience: c, maxTokenAge: l } = n, u = [...a];
	l !== void 0 && u.push("iat"), c !== void 0 && u.push("aud"), s !== void 0 && u.push("sub"), o !== void 0 && u.push("iss");
	for (let e of new Set(u.reverse())) if (!(e in r)) throw new tu(`missing required "${e}" claim`, r, e, "missing");
	if (o && !(Array.isArray(o) ? o : [o]).includes(r.iss)) throw new tu("unexpected \"iss\" claim value", r, "iss", "check_failed");
	if (s && r.sub !== s) throw new tu("unexpected \"sub\" claim value", r, "sub", "check_failed");
	if (c && !pd(r.aud, typeof c == "string" ? [c] : c)) throw new tu("unexpected \"aud\" claim value", r, "aud", "check_failed");
	let d;
	switch (typeof n.clockTolerance) {
		case "string":
			d = dd(n.clockTolerance);
			break;
		case "number":
			d = n.clockTolerance;
			break;
		case "undefined":
			d = 0;
			break;
		default: throw TypeError("Invalid clockTolerance option type");
	}
	let { currentDate: f } = n, p = id(f || /* @__PURE__ */ new Date());
	if ((r.iat !== void 0 || l) && typeof r.iat != "number") throw new tu("\"iat\" claim must be a number", r, "iat", "invalid");
	if (r.nbf !== void 0) {
		if (typeof r.nbf != "number") throw new tu("\"nbf\" claim must be a number", r, "nbf", "invalid");
		if (r.nbf > p + d) throw new tu("\"nbf\" claim timestamp check failed", r, "nbf", "check_failed");
	}
	if (r.exp !== void 0) {
		if (typeof r.exp != "number") throw new tu("\"exp\" claim must be a number", r, "exp", "invalid");
		if (r.exp <= p - d) throw new nu("\"exp\" claim timestamp check failed", r, "exp", "check_failed");
	}
	if (l) {
		let e = p - r.iat, t = typeof l == "number" ? l : dd(l);
		if (e - d > t) throw new nu("\"iat\" claim timestamp check failed (too far in the past)", r, "iat", "check_failed");
		if (e < 0 - d) throw new tu("\"iat\" claim timestamp check failed (it should be in the past)", r, "iat", "check_failed");
	}
	return r;
};
async function hd(e, t, n) {
	let r = await rd(e, t, n);
	if (r.protectedHeader.crit?.includes("b64") && r.protectedHeader.b64 === !1) throw new cu("JWTs MUST NOT use unencoded payload");
	let i = {
		payload: md(r.protectedHeader, r.payload, n),
		protectedHeader: r.protectedHeader
	};
	return typeof t == "function" ? {
		...i,
		key: r.key
	} : i;
}
var gd = async (e, t, n) => {
	let r = await ed(e, t, "sign");
	ku(e, r);
	let i = await Wl.subtle.sign($u(e, r.algorithm), r, n);
	return new Uint8Array(i);
}, _d = class {
	constructor(e) {
		if (!(e instanceof Uint8Array)) throw TypeError("payload must be an instance of Uint8Array");
		this._payload = e;
	}
	setProtectedHeader(e) {
		if (this._protectedHeader) throw TypeError("setProtectedHeader can only be called once");
		return this._protectedHeader = e, this;
	}
	setUnprotectedHeader(e) {
		if (this._unprotectedHeader) throw TypeError("setUnprotectedHeader can only be called once");
		return this._unprotectedHeader = e, this;
	}
	async sign(e, t) {
		if (!this._protectedHeader && !this._unprotectedHeader) throw new su("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
		if (!Eu(this._protectedHeader, this._unprotectedHeader)) throw new su("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
		let n = {
			...this._protectedHeader,
			...this._unprotectedHeader
		}, r = Yu(su, /* @__PURE__ */ new Map([["b64", !0]]), t?.crit, this._protectedHeader, n), i = !0;
		if (r.has("b64") && (i = this._protectedHeader.b64, typeof i != "boolean")) throw new su("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
		let { alg: a } = n;
		if (typeof a != "string" || !a) throw new su("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
		Ju(a, e, "sign");
		let o = this._payload;
		i && (o = ql.encode(Zl(o)));
		let s;
		s = this._protectedHeader ? ql.encode(Zl(JSON.stringify(this._protectedHeader))) : ql.encode("");
		let c = {
			signature: Zl(await gd(a, e, Yl(s, ql.encode("."), o))),
			payload: ""
		};
		return i && (c.payload = Jl.decode(o)), this._unprotectedHeader && (c.header = this._unprotectedHeader), this._protectedHeader && (c.protected = Jl.decode(s)), c;
	}
}, vd = class {
	constructor(e) {
		this._flattened = new _d(e);
	}
	setProtectedHeader(e) {
		return this._flattened.setProtectedHeader(e), this;
	}
	async sign(e, t) {
		let n = await this._flattened.sign(e, t);
		if (n.payload === void 0) throw TypeError("use the flattened module for creating JWS with b64: false");
		return `${n.protected}.${n.payload}.${n.signature}`;
	}
};
function yd(e, t) {
	if (!Number.isFinite(t)) throw TypeError(`Invalid ${e} input`);
	return t;
}
var bd = class {
	constructor(e = {}) {
		if (!Ou(e)) throw TypeError("JWT Claims Set MUST be an object");
		this._payload = e;
	}
	setIssuer(e) {
		return this._payload = {
			...this._payload,
			iss: e
		}, this;
	}
	setSubject(e) {
		return this._payload = {
			...this._payload,
			sub: e
		}, this;
	}
	setAudience(e) {
		return this._payload = {
			...this._payload,
			aud: e
		}, this;
	}
	setJti(e) {
		return this._payload = {
			...this._payload,
			jti: e
		}, this;
	}
	setNotBefore(e) {
		return this._payload = typeof e == "number" ? {
			...this._payload,
			nbf: yd("setNotBefore", e)
		} : e instanceof Date ? {
			...this._payload,
			nbf: yd("setNotBefore", id(e))
		} : {
			...this._payload,
			nbf: id(/* @__PURE__ */ new Date()) + dd(e)
		}, this;
	}
	setExpirationTime(e) {
		return this._payload = typeof e == "number" ? {
			...this._payload,
			exp: yd("setExpirationTime", e)
		} : e instanceof Date ? {
			...this._payload,
			exp: yd("setExpirationTime", id(e))
		} : {
			...this._payload,
			exp: id(/* @__PURE__ */ new Date()) + dd(e)
		}, this;
	}
	setIssuedAt(e) {
		return this._payload = e === void 0 ? {
			...this._payload,
			iat: id(/* @__PURE__ */ new Date())
		} : e instanceof Date ? {
			...this._payload,
			iat: yd("setIssuedAt", id(e))
		} : typeof e == "string" ? {
			...this._payload,
			iat: yd("setIssuedAt", id(/* @__PURE__ */ new Date()) + dd(e))
		} : {
			...this._payload,
			iat: yd("setIssuedAt", e)
		}, this;
	}
}, xd = class extends bd {
	setProtectedHeader(e) {
		return this._protectedHeader = e, this;
	}
	async sign(e, t) {
		let n = new vd(ql.encode(JSON.stringify(this._payload)));
		if (n.setProtectedHeader(this._protectedHeader), Array.isArray(this._protectedHeader?.crit) && this._protectedHeader.crit.includes("b64") && this._protectedHeader.b64 === !1) throw new cu("JWTs MUST NOT use unencoded payload");
		return n.sign(e, t);
	}
}, Sd = (e, t) => {
	if (typeof e != "string" || !e) throw new lu(`${t} missing or invalid`);
};
async function Cd(e, t) {
	if (!Ou(e)) throw TypeError("JWK must be an object");
	if (t ??= "sha256", t !== "sha256" && t !== "sha384" && t !== "sha512") throw TypeError("digestAlgorithm must one of \"sha256\", \"sha384\", or \"sha512\"");
	let n;
	switch (e.kty) {
		case "EC":
			Sd(e.crv, "\"crv\" (Curve) Parameter"), Sd(e.x, "\"x\" (X Coordinate) Parameter"), Sd(e.y, "\"y\" (Y Coordinate) Parameter"), n = {
				crv: e.crv,
				kty: e.kty,
				x: e.x,
				y: e.y
			};
			break;
		case "OKP":
			Sd(e.crv, "\"crv\" (Subtype of Key Pair) Parameter"), Sd(e.x, "\"x\" (Public Key) Parameter"), n = {
				crv: e.crv,
				kty: e.kty,
				x: e.x
			};
			break;
		case "RSA":
			Sd(e.e, "\"e\" (Exponent) Parameter"), Sd(e.n, "\"n\" (Modulus) Parameter"), n = {
				e: e.e,
				kty: e.kty,
				n: e.n
			};
			break;
		case "oct":
			Sd(e.k, "\"k\" (Key Value) Parameter"), n = {
				k: e.k,
				kty: e.kty
			};
			break;
		default: throw new iu("\"kty\" (Key Type) Parameter missing or unsupported");
	}
	let r = ql.encode(JSON.stringify(n));
	return Zl(await Kl(t, r));
}
function wd(e) {
	switch (typeof e == "string" && e.slice(0, 2)) {
		case "RS":
		case "PS": return "RSA";
		case "ES": return "EC";
		case "Ed": return "OKP";
		default: throw new iu("Unsupported \"alg\" value for a JSON Web Key Set");
	}
}
function Td(e) {
	return e && typeof e == "object" && Array.isArray(e.keys) && e.keys.every(Ed);
}
function Ed(e) {
	return Ou(e);
}
function Dd(e) {
	return typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}
var Od = class {
	constructor(e) {
		if (this._cached = /* @__PURE__ */ new WeakMap(), !Td(e)) throw new uu("JSON Web Key Set malformed");
		this._jwks = Dd(e);
	}
	async getKey(e, t) {
		let { alg: n, kid: r } = {
			...e,
			...t?.header
		}, i = wd(n), a = this._jwks.keys.filter((e) => {
			let t = i === e.kty;
			if (t && typeof r == "string" && (t = r === e.kid), t && typeof e.alg == "string" && (t = n === e.alg), t && typeof e.use == "string" && (t = e.use === "sig"), t && Array.isArray(e.key_ops) && (t = e.key_ops.includes("verify")), t) switch (n) {
				case "ES256":
					t = e.crv === "P-256";
					break;
				case "ES256K":
					t = e.crv === "secp256k1";
					break;
				case "ES384":
					t = e.crv === "P-384";
					break;
				case "ES512":
					t = e.crv === "P-521";
					break;
				case "Ed25519":
					t = e.crv === "Ed25519";
					break;
				case "EdDSA": t = e.crv === "Ed25519" || e.crv === "Ed448";
			}
			return t;
		}), { 0: o, length: s } = a;
		if (s === 0) throw new du();
		if (s !== 1) {
			let e = new fu(), { _cached: t } = this;
			throw e[Symbol.asyncIterator] = async function* () {
				for (let e of a) try {
					yield await kd(t, e, n);
				} catch {}
			}, e;
		}
		return kd(this._cached, o, n);
	}
};
async function kd(e, t, n) {
	let r = e.get(t) || e.set(t, {}).get(t);
	if (r[n] === void 0) {
		let e = await Hu({
			...t,
			ext: !0
		}, n);
		if (e instanceof Uint8Array || e.type !== "public") throw new uu("JSON Web Key Set members must be public keys");
		r[n] = e;
	}
	return r[n];
}
function Ad(e) {
	let t = new Od(e), n = async (e, n) => t.getKey(e, n);
	return Object.defineProperties(n, { jwks: {
		value: () => Dd(t._jwks),
		enumerable: !0,
		configurable: !1,
		writable: !1
	} }), n;
}
var jd = async (e, t, n) => {
	let r, i, a = !1;
	typeof AbortController == "function" && (r = new AbortController(), i = setTimeout(() => {
		a = !0, r.abort();
	}, t));
	let o = await fetch(e.href, {
		signal: r ? r.signal : void 0,
		redirect: "manual",
		headers: n.headers
	}).catch((e) => {
		throw a ? new pu() : e;
	});
	if (i !== void 0 && clearTimeout(i), o.status !== 200) throw new eu("Expected 200 OK from the JSON Web Key Set HTTP response");
	try {
		return await o.json();
	} catch {
		throw new eu("Failed to parse the JSON Web Key Set HTTP response as JSON");
	}
};
function Md() {
	return typeof WebSocketPair < "u" || typeof navigator < "u" && navigator.userAgent === "Cloudflare-Workers" || typeof EdgeRuntime < "u" && EdgeRuntime === "vercel";
}
var Nd;
typeof navigator < "u" && navigator.userAgent?.startsWith?.("Mozilla/5.0 ") || (Nd = "jose/v5.10.0");
var Pd = Symbol();
function Fd(e, t) {
	return !(typeof e != "object" || !e || !("uat" in e) || typeof e.uat != "number" || Date.now() - e.uat >= t || !("jwks" in e) || !Ou(e.jwks) || !Array.isArray(e.jwks.keys) || !Array.prototype.every.call(e.jwks.keys, Ou));
}
var Id = class {
	constructor(e, t) {
		if (!(e instanceof URL)) throw TypeError("url must be an instance of URL");
		this._url = new URL(e.href), this._options = {
			agent: t?.agent,
			headers: t?.headers
		}, this._timeoutDuration = typeof t?.timeoutDuration == "number" ? t?.timeoutDuration : 5e3, this._cooldownDuration = typeof t?.cooldownDuration == "number" ? t?.cooldownDuration : 3e4, this._cacheMaxAge = typeof t?.cacheMaxAge == "number" ? t?.cacheMaxAge : 6e5, t?.[Pd] !== void 0 && (this._cache = t?.[Pd], Fd(t?.[Pd], this._cacheMaxAge) && (this._jwksTimestamp = this._cache.uat, this._local = Ad(this._cache.jwks)));
	}
	coolingDown() {
		return typeof this._jwksTimestamp == "number" && Date.now() < this._jwksTimestamp + this._cooldownDuration;
	}
	fresh() {
		return typeof this._jwksTimestamp == "number" && Date.now() < this._jwksTimestamp + this._cacheMaxAge;
	}
	async getKey(e, t) {
		this._local && this.fresh() || await this.reload();
		try {
			return await this._local(e, t);
		} catch (n) {
			if (n instanceof du && this.coolingDown() === !1) return await this.reload(), this._local(e, t);
			throw n;
		}
	}
	async reload() {
		this._pendingFetch && Md() && (this._pendingFetch = void 0);
		let e = new Headers(this._options.headers);
		Nd && !e.has("User-Agent") && (e.set("User-Agent", Nd), this._options.headers = Object.fromEntries(e.entries())), this._pendingFetch ||= jd(this._url, this._timeoutDuration, this._options).then((e) => {
			this._local = Ad(e), this._cache && (this._cache.uat = Date.now(), this._cache.jwks = e), this._jwksTimestamp = Date.now(), this._pendingFetch = void 0;
		}).catch((e) => {
			throw this._pendingFetch = void 0, e;
		}), await this._pendingFetch;
	}
};
function Ld(e, t) {
	let n = new Id(e, t), r = async (e, t) => n.getKey(e, t);
	return Object.defineProperties(r, {
		coolingDown: {
			get: () => n.coolingDown(),
			enumerable: !0,
			configurable: !1
		},
		fresh: {
			get: () => n.fresh(),
			enumerable: !0,
			configurable: !1
		},
		reload: {
			value: () => n.reload(),
			enumerable: !0,
			configurable: !1,
			writable: !1
		},
		reloading: {
			get: () => !!n._pendingFetch,
			enumerable: !0,
			configurable: !1
		},
		jwks: {
			value: () => n._local?.jwks(),
			enumerable: !0,
			configurable: !1,
			writable: !1
		}
	}), r;
}
var Rd = $l;
function zd(e) {
	if (typeof e != "string") throw new cu("JWTs must use Compact JWS serialization, JWT must be a string");
	let { 1: t, length: n } = e.split(".");
	if (n === 5) throw new cu("Only JWTs using Compact JWS serialization can be decoded");
	if (n !== 3) throw new cu("Invalid JWT");
	if (!t) throw new cu("JWTs must contain a payload");
	let r;
	try {
		r = Rd(t);
	} catch {
		throw new cu("Failed to base64url decode the payload");
	}
	let i;
	try {
		i = JSON.parse(Jl.decode(r));
	} catch {
		throw new cu("Failed to parse the decoded payload as JSON");
	}
	if (!Ou(i)) throw new cu("Invalid JWT Claims Set");
	return i;
}
function Bd(e) {
	let t = e?.modulusLength ?? 2048;
	if (typeof t != "number" || t < 2048) throw new iu("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
	return t;
}
async function Vd(e, t) {
	let n, r;
	switch (e) {
		case "PS256":
		case "PS384":
		case "PS512":
			n = {
				name: "RSA-PSS",
				hash: `SHA-${e.slice(-3)}`,
				publicExponent: new Uint8Array([
					1,
					0,
					1
				]),
				modulusLength: Bd(t)
			}, r = ["sign", "verify"];
			break;
		case "RS256":
		case "RS384":
		case "RS512":
			n = {
				name: "RSASSA-PKCS1-v1_5",
				hash: `SHA-${e.slice(-3)}`,
				publicExponent: new Uint8Array([
					1,
					0,
					1
				]),
				modulusLength: Bd(t)
			}, r = ["sign", "verify"];
			break;
		case "RSA-OAEP":
		case "RSA-OAEP-256":
		case "RSA-OAEP-384":
		case "RSA-OAEP-512":
			n = {
				name: "RSA-OAEP",
				hash: `SHA-${parseInt(e.slice(-3), 10) || 1}`,
				publicExponent: new Uint8Array([
					1,
					0,
					1
				]),
				modulusLength: Bd(t)
			}, r = [
				"decrypt",
				"unwrapKey",
				"encrypt",
				"wrapKey"
			];
			break;
		case "ES256":
			n = {
				name: "ECDSA",
				namedCurve: "P-256"
			}, r = ["sign", "verify"];
			break;
		case "ES384":
			n = {
				name: "ECDSA",
				namedCurve: "P-384"
			}, r = ["sign", "verify"];
			break;
		case "ES512":
			n = {
				name: "ECDSA",
				namedCurve: "P-521"
			}, r = ["sign", "verify"];
			break;
		case "Ed25519":
			n = { name: "Ed25519" }, r = ["sign", "verify"];
			break;
		case "EdDSA": {
			r = ["sign", "verify"];
			let e = t?.crv ?? "Ed25519";
			switch (e) {
				case "Ed25519":
				case "Ed448":
					n = { name: e };
					break;
				default: throw new iu("Invalid or unsupported crv option provided");
			}
			break;
		}
		case "ECDH-ES":
		case "ECDH-ES+A128KW":
		case "ECDH-ES+A192KW":
		case "ECDH-ES+A256KW": {
			r = ["deriveKey", "deriveBits"];
			let e = t?.crv ?? "P-256";
			switch (e) {
				case "P-256":
				case "P-384":
				case "P-521":
					n = {
						name: "ECDH",
						namedCurve: e
					};
					break;
				case "X25519":
				case "X448":
					n = { name: e };
					break;
				default: throw new iu("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, X25519, and X448");
			}
			break;
		}
		default: throw new iu("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
	}
	return Wl.subtle.generateKey(n, t?.extractable ?? !1, r);
}
async function Hd(e, t) {
	return Vd(e, t);
}
var Ud = async (e, t) => {
	let n = {
		...t,
		grant_types: ["authorization_code", "refresh_token"],
		token_endpoint_auth_method: "none",
		application_type: "web",
		subject_type: "public"
	};
	return fetch(e, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(n)
	});
}, Wd = async (e, t, n) => {
	let r = new URL(t), i = r.origin + r.pathname + r.search, a = new URL(e).origin, o = await fetch(`${a}/.well-known/openid-configuration`).then((e) => {
		if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
		return e.json();
	}), s = o.issuer, c = (e) => e.endsWith("/") ? e.slice(0, -1) : e;
	if (c(e) !== c(s)) throw Error("RFC 9207 - iss !== idp - " + s + " !== " + e);
	sessionStorage.setItem("idp", s), sessionStorage.setItem("token_endpoint", o.token_endpoint), sessionStorage.setItem("jwks_uri", o.jwks_uri);
	let l = n?.client_id;
	if (!l) {
		let e = o.registration_endpoint;
		l = (await Ud(e, n ?? { redirect_uris: [i] }).then((e) => {
			if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
			return e.json();
		})).client_id;
	}
	try {
		new URL(l);
	} catch {
		sessionStorage.setItem("client_id", l);
	}
	let { pkce_code_verifier: u, pkce_code_challenge: d } = await Gd();
	sessionStorage.setItem("pkce_code_verifier", u);
	let f = window.crypto.randomUUID();
	sessionStorage.setItem("csrf_token", f);
	let p = o.authorization_endpoint + `?response_type=code&redirect_uri=${encodeURIComponent(i)}&scope=openid offline_access webid&client_id=${encodeURIComponent(l)}&code_challenge_method=S256&code_challenge=${d}&state=${f}&prompt=consent`;
	window.location.href = p;
}, Gd = async () => {
	let e = window.crypto.randomUUID() + "-" + window.crypto.randomUUID(), t = new Uint8Array(await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(e)));
	return {
		pkce_code_verifier: e,
		pkce_code_challenge: btoa(String.fromCharCode(...t)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
	};
}, Kd = async (e, t) => {
	let n = new URL(window.location.href), r = n.searchParams.get("code");
	if (r === null) return { clientDetails: e };
	let i = sessionStorage.getItem("idp");
	if (i === null || n.searchParams.get("iss") !== i) throw Error("RFC 9207 - iss !== idp - " + n.searchParams.get("iss") + " !== " + i);
	if (n.searchParams.get("state") !== sessionStorage.getItem("csrf_token")) throw Error("RFC 6749 - state !== csrf_token - " + n.searchParams.get("state") + " !== " + sessionStorage.getItem("csrf_token"));
	n.searchParams.delete("iss"), n.searchParams.delete("state"), n.searchParams.delete("code"), window.history.pushState({}, document.title, n.toString());
	let a = sessionStorage.getItem("pkce_code_verifier");
	if (a === null) throw Error("Access Token Request preparation - Could not find in sessionStorage: pkce_code_verifier");
	let o = e?.client_id || sessionStorage.getItem("client_id");
	if (!o) throw Error("Access Token Request preparation - Could not find in sessionStorage: client_id (dynamic registration)");
	let s = sessionStorage.getItem("token_endpoint");
	if (s === null) throw Error("Access Token Request preparation - Could not find in sessionStorage: token_endpoint");
	let c = await Hd("ES256"), l = await qd(r, a, n.toString(), o, s, c).then((e) => {
		if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
		return e.json();
	}), u = l.access_token, d = sessionStorage.getItem("jwks_uri");
	if (d === null) throw Error("Access Token validation preparation - Could not find in sessionStorage: jwks_uri");
	let { payload: f } = await hd(u, Ld(new URL(d)), {
		issuer: i,
		audience: "solid"
	}), p = await Cd(await Qu(c.publicKey));
	if (f.cnf.jkt !== p) throw Error("Access Token validation failed on `jkt`: jkt !== DPoP thumbprint - " + f.cnf.jkt + " !== " + p);
	if (f.client_id !== o) throw Error("Access Token validation failed on `client_id`: JWT payload !== client_id - " + f.client_id + " !== " + o);
	let m = {
		...l,
		dpop_key_pair: c
	}, h = {
		idp: i,
		jwks_uri: d,
		token_endpoint: s
	};
	return e ||= { redirect_uris: [n.toString()] }, e.client_id = o, t && (await t.init(), await Promise.all([
		t.setItem("idp", i),
		t.setItem("jwks_uri", d),
		t.setItem("token_endpoint", s),
		t.setItem("client_id", o),
		t.setItem("dpop_keypair", c),
		t.setItem("refresh_token", l.refresh_token)
	]), t.close()), sessionStorage.removeItem("csrf_token"), sessionStorage.removeItem("pkce_code_verifier"), sessionStorage.removeItem("idp"), sessionStorage.removeItem("jwks_uri"), sessionStorage.removeItem("token_endpoint"), sessionStorage.removeItem("client_id"), {
		clientDetails: e,
		idpDetails: h,
		tokenDetails: m
	};
}, qd = async (e, t, n, r, i, a) => {
	let o = await Qu(a.publicKey);
	o.alg = "ES256";
	let s = await new xd({
		htu: i,
		htm: "POST"
	}).setIssuedAt().setJti(window.crypto.randomUUID()).setProtectedHeader({
		alg: "ES256",
		typ: "dpop+jwt",
		jwk: o
	}).sign(a.privateKey);
	return fetch(i, {
		method: "POST",
		headers: {
			dpop: s,
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams({
			grant_type: "authorization_code",
			code: e,
			code_verifier: t,
			redirect_uri: n,
			client_id: r
		})
	});
}, Jd = async (e) => {
	try {
		await e.init();
		let t = await e.getItem("client_id"), n = await e.getItem("token_endpoint"), r = await e.getItem("dpop_keypair"), i = await e.getItem("refresh_token");
		if (t === null || n === null || r === null || i === null) throw Error("Could not refresh tokens: details missing from database.");
		let a = await Yd(i, t, n, r).then((e) => {
			if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
			return e.json();
		}), o = a.access_token, s = await e.getItem("idp");
		if (s === null) throw Error("Access Token validation preparation - Could not find in sessionDatabase: idp");
		let c = await e.getItem("jwks_uri");
		if (c === null) throw Error("Access Token validation preparation - Could not find in sessionDatabase: jwks_uri");
		let { payload: l } = await hd(o, Ld(new URL(c)), {
			issuer: s,
			audience: "solid"
		}), u = await Cd(await Qu(r.publicKey));
		if (l.cnf.jkt !== u) throw Error("Access Token validation failed on `jkt`: jkt !== DPoP thumbprint - " + l.cnf.jkt + " !== " + u);
		if (l.client_id !== t) throw Error("Access Token validation failed on `client_id`: JWT payload !== client_id - " + l.client_id + " !== " + t);
		return await e.setItem("refresh_token", a.refresh_token), {
			...a,
			dpop_key_pair: r
		};
	} finally {
		e.close();
	}
}, Yd = async (e, t, n, r) => {
	let i = await Qu(r.publicKey);
	i.alg = "ES256";
	let a = await new xd({
		htu: n,
		htm: "POST"
	}).setIssuedAt().setJti(self.crypto.randomUUID()).setProtectedHeader({
		alg: "ES256",
		typ: "dpop+jwt",
		jwk: i
	}).sign(r.privateKey);
	return fetch(n, {
		method: "POST",
		headers: {
			dpop: a,
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: e,
			client_id: t
		})
	});
}, Xd;
(function(e) {
	e.STATE_CHANGE = "sessionStateChange", e.EXPIRATION_WARNING = "sessionExpirationWarning", e.EXPIRATION = "sessionExpiration";
})(Xd ||= {});
var Zd = class extends EventTarget {
	isActive_ = !1;
	exp_;
	webId_ = void 0;
	currentAth_ = void 0;
	information;
	database;
	refreshPromise;
	resolveRefresh;
	rejectRefresh;
	constructor(e, t) {
		super(), this.authFetch = this.authFetch.bind(this), this.information = { clientDetails: e }, this.database = t?.database, t?.onSessionStateChange && this.addEventListener(Xd.STATE_CHANGE, (e) => t.onSessionStateChange?.(e)), t?.onSessionExpirationWarning && this.addEventListener(Xd.EXPIRATION_WARNING, (e) => t?.onSessionExpirationWarning?.(e)), t?.onSessionExpiration && this.addEventListener(Xd.EXPIRATION, (e) => t?.onSessionExpiration?.(e));
	}
	async login(e, t) {
		await Wd(e, t, this.information.clientDetails);
	}
	async handleRedirectFromLogin() {
		let e = await Kd(this.information.clientDetails, this.database);
		e.tokenDetails && (this.information.clientDetails = e.clientDetails, this.information.idpDetails = e.idpDetails, await this.setTokenDetails(e.tokenDetails), this.dispatchStateChangeEvent());
	}
	async restore() {
		if (!this.database) throw Error("Could not refresh tokens: missing database. Provide database in sessionOption.");
		if (this.refreshPromise) return this.refreshPromise;
		this.refreshPromise = new Promise((e, t) => {
			this.resolveRefresh = e, this.rejectRefresh = t;
		});
		let e = this.isActive;
		return Jd(this.database).then((e) => this.setTokenDetails(e)).then(() => this.resolveRefresh()).catch((e) => {
			this.isActive ? (this.rejectRefresh(Error(e || "Token refresh failed")), this.isExpired() ? this.dispatchExpirationEvent() : this.dispatchExpirationWarningEvent()) : this.rejectRefresh(/* @__PURE__ */ Error("No session to restore."));
		}).finally(() => {
			this.clearRefreshPromise(), e !== this.isActive && this.dispatchStateChangeEvent();
		}), this.refreshPromise;
	}
	async logout() {
		this.isActive_ = !1, this.exp_ = void 0, this.webId_ = void 0, this.currentAth_ = void 0, this.information.idpDetails = void 0, this.information.tokenDetails = void 0, this.refreshPromise && this.rejectRefresh && (this.rejectRefresh(/* @__PURE__ */ Error("Logout during token refresh.")), this.clearRefreshPromise()), this.database && (await this.database.init(), await this.database.clear(), this.database.close()), this.dispatchStateChangeEvent();
	}
	async authFetch(e, t, n) {
		if (!this.isActive) return fetch(e, t);
		let r, i, a;
		e instanceof Request ? (r = new URL(e.url), i = t?.method || e?.method || "GET", a = new Headers(e.headers)) : (t ||= {}, r = new URL(e.toString()), i = t.method || "GET", a = t.headers ? new Headers(t.headers) : new Headers()), await this._renewTokensIfExpired(), n ??= {
			htu: `${r.origin}${r.pathname}`,
			htm: i.toUpperCase()
		};
		let o = await this._createSignedDPoPToken(n);
		return a.set("dpop", o), a.set("authorization", `DPoP ${this.information.tokenDetails.access_token}`), e instanceof Request ? fetch(new Request(e, {
			...t,
			headers: a
		})) : fetch(r, {
			...t,
			headers: a
		});
	}
	async setTokenDetails(e) {
		this.information.tokenDetails = e, await this._updateSessionDetailsFromToken(e.access_token);
	}
	clearRefreshPromise() {
		this.refreshPromise = void 0, this.resolveRefresh = void 0, this.rejectRefresh = void 0;
	}
	get isActive() {
		return this.isActive_;
	}
	get webId() {
		return this.webId_;
	}
	isExpired() {
		return !this.exp_ || this._isTokenExpired(this.exp_);
	}
	getExpiresIn() {
		return this.exp_ ? this._getTokenTTL(this.exp_) : -1;
	}
	getTokenDetails() {
		return this.information.tokenDetails;
	}
	async _renewTokensIfExpired() {
		this.isExpired() && (this.refreshPromise ? await this.refreshPromise : await this.restore());
	}
	async _computeAth(e) {
		let t = new TextEncoder().encode(e), n = await crypto.subtle.digest("SHA-256", t), r = Array.from(new Uint8Array(n));
		return btoa(String.fromCharCode(...r)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
	}
	async _createSignedDPoPToken(e) {
		if (!this.information.tokenDetails || !this.currentAth_) throw Error("Session not established.");
		e.ath = this.currentAth_;
		let t = await Qu(this.information.tokenDetails.dpop_key_pair.publicKey);
		return new xd(e).setIssuedAt().setJti(window.crypto.randomUUID()).setProtectedHeader({
			alg: "ES256",
			typ: "dpop+jwt",
			jwk: t
		}).sign(this.information.tokenDetails.dpop_key_pair.privateKey);
	}
	async _updateSessionDetailsFromToken(e) {
		if (!e) await this.logout();
		else try {
			let t = zd(e), n = t.webid;
			if (!n) throw Error("Missing webid claim in access token");
			let r = t.exp;
			if (!r) throw Error("Missing exp claim in access token");
			this.currentAth_ = await this._computeAth(e), this.webId_ = n, this.exp_ = r, this.isActive_ = !0;
		} catch {
			await this.logout();
		}
	}
	_isTokenExpired(e, t = 0) {
		return typeof e != "number" || isNaN(e) ? !0 : this._getTokenTTL(e, t) < 0;
	}
	_getTokenTTL(e, t = 0) {
		return e - (Math.floor(Date.now() / 1e3) + t);
	}
	dispatchStateChangeEvent() {
		this.dispatchEvent(new CustomEvent(Xd.STATE_CHANGE, { detail: {
			isActive: this.isActive,
			webId: this.webId
		} }));
	}
	dispatchExpirationWarningEvent() {
		this.dispatchEvent(new CustomEvent(Xd.EXPIRATION_WARNING, { detail: { expires_in: this.getExpiresIn() } }));
	}
	dispatchExpirationEvent() {
		this.dispatchEvent(new CustomEvent(Xd.EXPIRATION));
	}
}, Qd = class {
	constructor() {
		this.map = /* @__PURE__ */ new Map();
	}
	shouldPreserveExistingRefreshToken(e, t) {
		return e === "refresh_token" && (t == null || t === "") && this.map.has(e);
	}
	async init() {
		return this;
	}
	async setItem(e, t) {
		this.shouldPreserveExistingRefreshToken(e, t) || this.map.set(e, t);
	}
	async getItem(e) {
		return this.map.has(e) ? this.map.get(e) : null;
	}
	async deleteItem(e) {
		this.map.delete(e);
	}
	async clear() {
		this.map.clear();
	}
	close() {}
}, $d = class {
	constructor() {
		this.db = null, this.dbName = "soidc", this.storeName = "session", this.dbVersion = 1;
	}
	async shouldPreserveExistingRefreshToken(e, t) {
		if (e !== "refresh_token" || t != null && t !== "") return !1;
		let n = await this.getItem(e);
		return n != null && n !== "";
	}
	async init() {
		if (this.db) return this;
		if (typeof indexedDB > "u") throw Error("IndexedDB is not available in this environment");
		return await new Promise((e, t) => {
			let n = indexedDB.open(this.dbName, this.dbVersion);
			n.onerror = () => t(n.error), n.onsuccess = () => {
				this.db = n.result, e();
			}, n.onupgradeneeded = () => {
				let e = n.result;
				e.objectStoreNames.contains(this.storeName) || e.createObjectStore(this.storeName);
			};
		}), this;
	}
	async setItem(e, t) {
		await this.init(), !await this.shouldPreserveExistingRefreshToken(e, t) && await this.withStore("readwrite", (n) => n.put(t, e));
	}
	async getItem(e) {
		return await this.init(), this.withStore("readonly", (t) => t.get(e));
	}
	async deleteItem(e) {
		await this.init(), await this.withStore("readwrite", (t) => t.delete(e));
	}
	async clear() {
		await this.init(), await this.withStore("readwrite", (e) => e.clear());
	}
	close() {
		this.db &&= (this.db.close(), null);
	}
	withStore(e, t) {
		return new Promise((n, r) => {
			if (!this.db) {
				r(/* @__PURE__ */ Error("Session database not initialized"));
				return;
			}
			let i = this.db.transaction(this.storeName, e), a = t(i.objectStore(this.storeName)), o = null;
			i.onerror = () => r(i.error ?? a.error), i.onabort = () => r(i.error ?? a.error ?? /* @__PURE__ */ Error("IndexedDB transaction aborted")), i.oncomplete = () => n(o), a.onerror = () => r(a.error), a.onsuccess = () => {
				o = a.result ?? null;
			};
		});
	}
};
function ef() {
	let e = Ul, t = e.SessionCore ?? e.default?.SessionCore ?? e.default;
	return typeof t == "function" ? t : null;
}
var tf = ef();
function nf() {
	if (typeof window < "u" && (() => {
		let e = window.location.hostname;
		return e === "localhost" || e === "127.0.0.1" || e.endsWith(".localhost");
	})()) return tf ? new tf(void 0, { database: new $d() }) : new Hl();
	try {
		return new Hl();
	} catch (e) {
		console.warn("solid-logic: falling back to non-worker auth session:", e);
		try {
			return tf ? new tf(void 0, { database: new $d() }) : new Hl();
		} catch (e) {
			return console.warn("solid-logic: IndexedDB unavailable, using in-memory session database:", e), tf ? new tf(void 0, { database: new Qd() }) : new Hl();
		}
	}
}
var rf = nf();
// node_modules/solid-logic/dist/authSession/issuer.esm.js
async function af(e) {
	try {
		let t = new URL(e), n = new URL("/.well-known/openid-configuration", t.origin), r = await fetch(n.toString(), { credentials: "include" });
		if (!r.ok) return null;
		let i = await r.json();
		return typeof i?.issuer != "string" || !i.issuer ? null : i.issuer.replace(/\/$/, "");
	} catch {
		return null;
	}
}
async function of(e) {
	return await af(e) || e;
}
// node_modules/solid-logic/dist/authSession/events.esm.js
var sf = class {
	constructor() {
		this.listeners = /* @__PURE__ */ new Map();
	}
	on(e, t) {
		this.listeners.has(e) || this.listeners.set(e, /* @__PURE__ */ new Set()), this.listeners.get(e).add(t);
	}
	off(e, t) {
		this.listeners.get(e)?.delete(t);
	}
	emit(e, ...t) {
		this.listeners.get(e)?.forEach((e) => e(...t));
	}
}, cf = rf, lf = typeof cf.login == "function" ? cf.login.bind(rf) : void 0;
lf && (cf.login = async (e, t) => {
	if (e && typeof e == "object" && !Array.isArray(e)) {
		let t = e.oidcIssuer ?? e.idp ?? e.issuer, n = e.redirectUrl ?? e.redirect_uri ?? e.redirectUri;
		if (typeof t == "string" && typeof n == "string") return lf(await of(t), n);
	}
	return lf(typeof e == "string" ? await of(e) : e, t);
});
var uf = new sf();
ra(rf, {
	onEvent: (e) => uf.emit(e),
	resync: () => {
		let e = Yi(rf);
		if (e) return e.then(() => "changed", (e) => {
			let t = e instanceof Error ? e.message : String(e);
			return /no session to restore/i.test(t) ? "cleared" : "changed";
		});
	}
});
var df = Object.assign(rf, { events: uf });
Object.defineProperty(df, "info", {
	enumerable: !0,
	configurable: !0,
	get() {
		return Ji(rf);
	},
	set(e) {}
});
// node_modules/solid-logic/dist/authn/SolidAuthnLogic.esm.js
var ff = 5e3;
async function pf(e) {
	if (e === null) return;
	let t, n = new Promise((e) => {
		t = setTimeout(() => e(void 0), ff);
	});
	try {
		return await Promise.race([e, n]);
	} finally {
		t !== void 0 && clearTimeout(t);
	}
}
var mf = class {
	constructor(e) {
		this.checkUserInFlight = null, this.sessionRestoreHookAttached = !1, this.session = e, this.identity = ra(e, { onRefocus: () => this.refreshCookieBackedFallback() });
	}
	dispose() {
		this.identity.unsubscribe();
	}
	async refreshCookieBackedFallback() {
		Gi(this.session) || this.identity.reportCookieIdentity(await this.probeNssCookieBackedWebId());
	}
	get authSession() {
		return this.session;
	}
	currentUser() {
		let e = Vo();
		if (e.viewingNoAuthPage) return Si(e.webId);
		let { webId: t } = qi(this.session);
		return t ? Si(t) : Ho();
	}
	async checkUser(e) {
		let t = new URL(window.location.href).hash;
		t && window.localStorage.setItem("preLoginRedirectHash", t);
		let n = this.session;
		!this.sessionRestoreHookAttached && typeof n?.events?.on == "function" && (n.events.on("sessionRestore", (e) => {
			oa(`Session restored to ${e}`), document.location.toString() !== e && history.replaceState(null, "", e);
		}), this.sessionRestoreHookAttached = !0), this.checkUserInFlight ||= this.resolveCurrentUser();
		let r = this.checkUserInFlight, i;
		try {
			i = await r;
		} finally {
			this.checkUserInFlight === r && (this.checkUserInFlight = null);
		}
		return Promise.resolve(e ? e(i) : i);
	}
	async resolveCurrentUser() {
		let e = this.session, t = new URL(window.location.href);
		if (t.hash = "", typeof e?.handleIncomingRedirect == "function") await e.handleIncomingRedirect({
			restorePreviousSession: !0,
			url: t.href
		});
		else {
			let t = e?.isActive ?? !!e?.webId, n = Yi(e);
			if (n) {
				try {
					await pf(n);
				} catch (t) {
					let n = t instanceof Error ? t.message : String(t);
					if ((e?.isActive ?? !!e?.webId) && !/no session to restore/i.test(n)) throw t;
					oa(`Session restore failed, continuing logged-out: ${n}`);
				}
				let r = e?.isActive ?? !!e?.webId;
				!t && r && e.events?.emit("sessionRestore", window.location.href);
			}
			if (typeof e?.handleRedirectFromLogin == "function") {
				let t = e?.isActive ?? !!e?.webId;
				await e.handleRedirectFromLogin();
				let n = e?.isActive ?? !!e?.webId;
				!t && n && e.events?.emit("login");
			}
		}
		let n = window.localStorage.getItem("preLoginRedirectHash");
		if (n) {
			let e = new URL(window.location.href);
			e.hash !== n && (history.pushState ? history.pushState(null, document.title, n) : location.hash = n, e.hash = n), window.localStorage.setItem("preLoginRedirectHash", "");
		}
		let r = Ho();
		if (r) return r;
		let i = this.webIdFromSession(e?.info, e);
		return i ||= (this.identity.reportCookieIdentity(await this.probeNssCookieBackedWebId()), qi(e).webId ?? null), i && (r = this.saveUser(i)), r && oa(`(Logged in as ${r} by authentication)`), r;
	}
	async probeNssCookieBackedWebId() {
		if (typeof window > "u") return null;
		let { hostname: e, port: t, protocol: n } = window.location;
		if (!e.endsWith(".localhost")) return null;
		let r = e.slice(0, -10);
		if (!r || r === "localhost" || r.includes(".")) return null;
		try {
			return (await fetch("/account/password/change", {
				credentials: "include",
				redirect: "manual",
				cache: "no-store"
			})).status === 403 ? `${`${n}//${e}${t ? `:${t}` : ""}`}/profile/card#me` : null;
		} catch {
			return null;
		}
	}
	saveUser(e, t) {
		let n;
		if (e) {
			n = typeof e == "string" ? e : e.uri;
			let r = Si(n);
			return t && (t.me = r), r;
		}
		return null;
	}
	webIdFromSession(e, t) {
		let n = e?.webId || t?.webId;
		if (!n) return null;
		let r = e?.isLoggedIn, i = t?.isLoggedIn, a = t?.isActive;
		return Ui(t) || r === !1 || i === !1 || a === !1 ? null : n;
	}
};
// node_modules/solid-logic/dist/authSession/flagAuthorizationOnTransitions.esm.js
function hf(e) {
	try {
		let t = e.updater?.flagAuthorizationMetadata;
		if (typeof t != "function") throw Error("flagAuthorizationMetadata is unavailable");
		return t.call(e.updater), !0;
	} catch (e) {
		return sa(`Could not flag authorization metadata: ${String(e)}`), !1;
	}
}
function gf(e, t) {
	let n = ra(t, { onTransition: () => {
		let t = yf(e);
		t.generation += 1, t.invalidationFailed = !hf(e);
	} });
	return () => n.unsubscribe();
}
var _f = /* @__PURE__ */ new WeakMap(), vf = {
	generation: 0,
	invalidationFailed: !1
};
function yf(e) {
	if (typeof e != "object" || !e) return vf;
	let t = _f.get(e);
	return t || (t = {
		generation: 0,
		invalidationFailed: !1
	}, _f.set(e, t)), t;
}
var bf = 3;
async function xf(e, t) {
	let n = yf(e), r = e.fetcher?.load;
	if (typeof r == "function") for (let i = 0; i < bf; i++) {
		let i = n.generation;
		if (!hf(e)) return;
		n.invalidationFailed = !1;
		try {
			await r.call(e.fetcher, t);
		} catch (e) {
			sa(`Could not reload ${String(t)}: ${String(e)}`);
			return;
		}
		if (i === n.generation) return e.updater?.editable?.(t);
	}
}
async function Sf(e, t) {
	return !yf(e).invalidationFailed && e.updater?.editable?.(t) !== void 0 || await xf(e, t) !== void 0;
}
async function Cf(e, t) {
	let n = yf(e), r = n.generation, i = e.fetcher?.load;
	if (typeof i != "function") throw Error("fetcher.load is unavailable");
	return await i.call(e.fetcher, t), r === n.generation ? Sf(e, t) : await xf(e, t) !== void 0;
}
// node_modules/solid-logic/dist/chat/chatLogic.esm.js
var wf = "index.ttl#this";
function Tf(e, t) {
	let n = X;
	async function r(t, n, r) {
		await e.fetcher.load(t);
		let i = e.any(t, new R("http://www.iana.org/assignments/link-relations/acl"));
		if (!i) throw Error("Chat ACL doc not found!");
		let a = `
            @prefix acl: <http://www.w3.org/ns/auth/acl#>.
            <#owner>
            a acl:Authorization;
            acl:agent <${n.value}>;
            acl:accessTo <.>;
            acl:default <.>;
            acl:mode
                acl:Read, acl:Write, acl:Control.
            <#invitee>
            a acl:Authorization;
            acl:agent <${r.value}>;
            acl:accessTo <.>;
            acl:default <.>;
            acl:mode
                acl:Read, acl:Append.
            `;
		await e.fetcher.webOperation("PUT", i.value, {
			data: a,
			contentType: "text/turtle"
		});
	}
	async function i(t, r) {
		let i = e.any(r, n.solid("privateTypeIndex"));
		if (!i) throw Error("Private type index not found!");
		await e.fetcher.load(i);
		let a = Xo(i), o = [
			xi(a, n.rdf("type"), n.solid("TypeRegistration"), i.doc()),
			xi(a, n.solid("forClass"), n.meeting("LongChat"), i.doc()),
			xi(a, n.solid("instance"), t, i.doc())
		];
		await new Promise((t, n) => {
			e.updater.update([], o, function(e, r, i) {
				r ? t(null) : n(Error(i));
			});
		});
	}
	async function a(n) {
		let r = await t.loadMe(), i = es(n, await t.getPodRoot(r)), a = !0;
		try {
			await e.fetcher.load(new R(i.value + "index.ttl#this"));
		} catch {
			a = !1;
		}
		return {
			me: r,
			chatContainer: i,
			exists: a
		};
	}
	async function o(e, t) {
		return (await s({
			me: t,
			newBase: e.value
		})).newInstance;
	}
	function s(t) {
		let r = e, i = r.updater;
		if (t.me && !t.me.uri) throw Error("chat mintNew:  Invalid userid " + t.me);
		let a = t.newInstance = t.newInstance || r.sym(t.newBase + wf), o = a.doc();
		return r.add(a, n.rdf("type"), n.meeting("LongChat"), o), r.add(a, n.dc("title"), "Chat channel", o), r.add(a, n.dc("created"), ji(new Date(Date.now())), o), t.me && r.add(a, n.dc("author"), t.me, o), new Promise(function(e, n) {
			i?.put(o, r.statementsMatching(void 0, void 0, void 0, o), "text/turtle", function(r, i, o) {
				i ? e({
					...t,
					newInstance: a
				}) : n(/* @__PURE__ */ Error("FAILED to save new chat channel at: " + r + " : " + o));
			});
		});
	}
	async function c(e, t = !0) {
		let { me: n, chatContainer: s, exists: c } = await a(e);
		if (c) return new R(s.value + wf);
		if (t) {
			let t = await o(s, n);
			return await l(e, t), await r(s, n, e), await i(t, n), t;
		}
		return null;
	}
	async function l(t, r) {
		await e.fetcher.load(t.doc());
		let i = e.any(t, n.ldp("inbox"), void 0, t.doc());
		if (!i) throw Error(`Invitee inbox not found! ${t.value}`);
		let a = `
        <> a <http://www.w3.org/ns/pim/meeting#LongChatInvite> ;
        ${n.rdf("seeAlso")} <${r.value}> .
        `, o = await e.fetcher?.webOperation("POST", i.value, {
			data: a,
			contentType: "text/turtle"
		});
		if (!o?.headers.get("location")) throw Error(`Invite sending returned a ${o?.status}`);
	}
	return {
		setAcl: r,
		addToPrivateTypeIndex: i,
		findChat: a,
		createChatThing: o,
		getChat: c,
		sendInvite: l,
		mintNew: s
	};
}
// node_modules/solid-logic/dist/inbox/inboxLogic.esm.js
function Ef(e, t, n, r, i) {
	async function a(e, i) {
		let a = await t.loadMe(), o = `${(await t.getPodRoot(a)).value}p2p-inboxes/${encodeURIComponent(i)}/`;
		return await r.createContainer(o), await n.setSinglePeerAccess({
			ownerWebId: a.value,
			peerWebId: e,
			accessToModes: "acl:Append",
			target: o
		}), o;
	}
	async function o(e) {
		e ||= await t.loadMe();
		let n = await t.getMainInbox(e);
		return (await r.getContainerMembers(n)).filter((e) => !r.isContainer(e));
	}
	async function s(t, n) {
		let r = await e.fetcher._fetch(t);
		if (r.status !== 200) throw Error(`Not OK! ${t}`);
		let i = Zo(t, n), a = {
			method: "PUT",
			body: await r.text(),
			headers: [["Content-Type", r.headers.get("Content-Type") || "application/octet-stream"]]
		};
		(await e.fetcher._fetch(i, a)).status.toString()[0] === "2" && await e.fetcher._fetch(t, { method: "DELETE" });
	}
	return {
		createInboxFor: a,
		getNewMessages: o,
		markAsRead: s
	};
}
// node_modules/solid-logic/dist/resource/resourceHttp.esm.js
function Df(e) {
	return e?.status ?? e?.response?.status;
}
function Of(e) {
	return e === 404 || e === 410;
}
function kf(e, t, n = {}) {
	if (e.ok || n.allowNotFound && Of(e.status)) return;
	let r = e.status === 412 ? "Error: File changed by someone else" : `HTTP error on ${t}! Status: ${e.status}`;
	throw Error(r);
}
function Af(e) {
	if (Of(Df(e))) return !0;
	let t = `${e?.message || e || ""}`;
	return t.includes("404") || t.includes("Not Found");
}
// node_modules/solid-logic/dist/resource/resourceMetadata.esm.js
function jf(e) {
	let t = /* @__PURE__ */ new Map();
	if (!e) return t;
	for (let n of e.split(",")) {
		let e = n.trim().match(/^([A-Za-z]+)\s*=\s*"([^"]*)"$/);
		if (e) {
			let [, n, r] = e, i = r.trim().split(/\s+/).filter(Boolean);
			t.set(n.toLowerCase(), new Set(i.map((e) => e.toLowerCase())));
		}
	}
	return t;
}
function Mf(e) {
	if (!e) return {
		canEdit: !1,
		canManageAccess: !1,
		isPublic: !1,
		isPublicKnown: !1
	};
	let t = jf(e), n = t.get("user") ?? /* @__PURE__ */ new Set(), r = t.get("public") ?? /* @__PURE__ */ new Set();
	return {
		canEdit: n.has("write"),
		canManageAccess: n.has("control"),
		isPublic: r.has("read") || r.has("write"),
		isPublicKnown: !0
	};
}
// node_modules/solid-logic/dist/resource/resourceLogic.esm.js
function Nf(e, t, n, r) {
	function i(e) {
		return n.createContainer(e);
	}
	function a(e) {
		return n.isContainer(e);
	}
	function o(e) {
		return n.getContainerMemberCount(e);
	}
	function s(e) {
		return n.getContainerElements(e);
	}
	function c(t) {
		let n = t.uri.endsWith("/") ? t.uri : `${t.uri}/`;
		return e.sym(`${n}index.ttl#this`);
	}
	function l(t) {
		return e.holds(t, X.ldp("contains"), c(t).doc());
	}
	function u(t) {
		return e.holds(t, X.rdf("type"), X.space("Storage"), t.doc());
	}
	function d(e) {
		let t = e.dir();
		if (!t) return !1;
		let n = e.uri.slice(t.uri.length);
		return n.startsWith(".") || n.endsWith(".acl") || n.endsWith(".meta") || n.endsWith("~");
	}
	function f(t, n) {
		let r = e.findTypeURIs(t), i = n.toLowerCase(), a = et(`${i}/*`).uri.split("*")[0];
		return Object.keys(r).some((e) => e.startsWith(a)) || {
			audio: "http://purl.org/dc/dcmitype/Sound",
			image: "http://purl.org/dc/dcmitype/Image",
			video: "http://purl.org/dc/dcmitype/MovingImage"
		}[i] in r ? !0 : (e.fetcher.getHeader(t, "content-type") || []).some((e) => e.split(";", 1)[0].trim().toLowerCase().startsWith(`${i}/`));
	}
	function p(e) {
		return f(e, "image");
	}
	function m(e) {
		return f(e, "audio");
	}
	function h(e) {
		return f(e, "video");
	}
	function g(e) {
		let t = typeof e == "string" ? e : e.value;
		try {
			let e = new URL(t);
			return e.hash === "#me" && /\/profile\/card\.ttl$/.test(e.pathname);
		} catch {
			return !1;
		}
	}
	function _(t, n) {
		let r, i = !1, a = !1, o = !1, s = !1, c, l;
		if (n.headers) {
			r = n.headers.get("content-type")?.split(";")[0] ?? void 0;
			let u = Mf(n.headers.get("wac-allow"));
			i = u.canEdit, a = u.canManageAccess, o = u.isPublic, s = u.isPublicKnown, c = n.headers.get("etag") ?? void 0, l = e.anyValue(t, X.dct("modified")) || e.anyValue(t, X.dc("modified")) || void 0;
		}
		n.headers && n.headers.get("content-type") || n.headers && n.headers.get("wac-allow") && n.headers.get("etag") || e.each(null, e.sym("http://www.w3.org/2007/ont/link#requestedURI"), t).map((n) => {
			let u = e.any(n, e.sym("http://www.w3.org/2007/ont/link#response"));
			if (u && u.termType === "NamedNode") {
				let n = e.anyValue(u, X.httph("content-type")) || void 0;
				r === void 0 && (r = n);
				let d = Mf(e.anyValue(u, X.httph("wac-allow")) || e.anyValue(u, X.httph("WAC-Allow")));
				i ||= d.canEdit, a ||= d.canManageAccess, o ||= d.isPublic, s ||= d.isPublicKnown;
				let f = e.anyValue(u, X.httph("etag")) || void 0;
				c === void 0 && (c = f), l = e.anyValue(t, X.dct("modified")) || e.anyValue(t, X.dc("modified")) || void 0;
			}
		});
		let u = e.any(t, zo)?.value || void 0;
		return {
			contentType: r,
			access: {
				canEdit: i,
				canManageAccess: a,
				isPublic: o,
				isPublicKnown: s
			},
			aclUri: u,
			eTag: c,
			modified: l
		};
	}
	async function v(t) {
		let n = await e.fetcher.webOperation("HEAD", t.uri);
		return kf(n, "HEAD"), _(t, n);
	}
	async function y(t) {
		let n = e.any(t, X.ldp("contains")) || t.dir();
		if (!n || n.termType !== "NamedNode") return !1;
		try {
			return (await v(n)).access.canEdit;
		} catch {
			return !1;
		}
	}
	async function b(e) {
		return y(e);
	}
	async function x(e) {
		return v(e);
	}
	async function S(t) {
		try {
			let n = await e.fetcher.webOperation("GET", t.uri);
			kf(n, "GET");
			let r = n.responseText;
			if (r === void 0) throw Error("No text in response object");
			let i = _(t, n);
			if (!i.contentType) throw Error("No content-type available");
			return {
				content: r,
				metadata: i
			};
		} catch (e) {
			throw Error(`Error reading file: ${e instanceof Error ? e.message : String(e)}`);
		}
	}
	async function C(e) {
		let t;
		try {
			t = await v(e);
		} catch {
			t = {
				contentType: void 0,
				access: {
					canEdit: !1,
					canManageAccess: !1,
					isPublic: !1
				},
				aclUri: void 0,
				eTag: void 0,
				modified: void 0
			};
		}
		let n = await b(e), r = {
			canEdit: t.access?.canEdit ?? !1,
			canManageAccess: t.access?.canManageAccess ?? !1,
			isPublic: t.access?.isPublic ?? !1,
			isPublicKnown: t.access?.isPublicKnown ?? !1,
			canDelete: n
		};
		return {
			...t,
			access: r
		};
	}
	async function w(e, t) {
		if (t) try {
			await r.deleteTypeIndexRegistrationForResource(e, t);
		} catch {}
	}
	async function T(t, r = {}) {
		let i = t.dir();
		if (a(t)) {
			let e = await n.getContainerMembers(t);
			await Promise.all(e.map((e) => T(Si(e), r)));
		}
		let o;
		try {
			o = await e.fetcher._fetch(t.value, { method: "DELETE" }), kf(o, "DELETE", { allowNotFound: !0 });
		} catch (e) {
			if (!Af(e)) throw e;
		}
		return r.deleteTypeIndexes && await w(t, r.user), i && e.removeMatches(i, X.ldp("contains"), t, i.doc()), e.removeDocument(t), e.fetcher.unload(t.doc()), o;
	}
	async function E(e, t) {
		await T(e, {
			deleteTypeIndexes: !0,
			user: t
		});
	}
	return {
		recursiveDelete: T,
		deleteResourceAndTypeIndexIfExists: E,
		fetchMetadata: x,
		fetchMetadataWithDelete: C,
		fetchContentAndMetadata: S,
		createContainer: i,
		isContainer: a,
		getContainerMembers: s,
		getContainerMemberCount: o,
		getContainerIndexThing: c,
		containerHasIndexDocument: l,
		isStorageRoot: u,
		isHiddenFile: d,
		isMediaType: f,
		isImage: p,
		isAudio: m,
		isVideo: h,
		isWebId: g
	};
}
// node_modules/solid-logic/dist/util/containerLogic.esm.js
function Pf(e) {
	function t(t) {
		return e.statementsMatching(t, Si("http://www.w3.org/ns/ldp#contains"), void 0).map((e) => e.object);
	}
	function n(t) {
		let n = e.findTypeURIs(t);
		return !!(t.value.charAt(t.value.length - 1) === "/" || n[X.ldp("Container").uri] || n[X.ldp("BasicContainer").uri]);
	}
	function r(e) {
		return t(e).length;
	}
	async function i(t) {
		if (!n(Si(t))) throw Error(`Not a container URL ${t}`);
		let r = await e.fetcher._fetch(t, {
			method: "PUT",
			headers: {
				"Content-Type": "text/turtle",
				"If-None-Match": "*",
				Link: "<http://www.w3.org/ns/ldp#BasicContainer>; rel=\"type\""
			},
			body: " "
		});
		if (r.status !== 409 && r.status.toString()[0] !== "2") throw Error(`Not OK: got ${r.status} response while creating container at ${t}`);
	}
	async function a(n) {
		return await e.fetcher.load(n), t(n);
	}
	return {
		isContainer: n,
		createContainer: i,
		getContainerElements: t,
		getContainerMembers: a,
		getContainerMemberCount: r
	};
}
// node_modules/solid-logic/dist/typeIndex/typeIndexAclDocuments.esm.js
function Ff(e, t) {
	let n = new URL(t).pathname.split("/").pop() || "publicTypeIndex.ttl";
	return [
		"# ACL resource for the Public Type Index",
		"",
		"@prefix acl: <http://www.w3.org/ns/auth/acl#>.",
		"@prefix foaf: <http://xmlns.com/foaf/0.1/>.",
		"",
		"<#owner>",
		"    a acl:Authorization;",
		"",
		"    acl:agent",
		`        <${e}>;`,
		"",
		`    acl:accessTo <./${n}>;`,
		"",
		"    acl:mode",
		"        acl:Read, acl:Write, acl:Control.",
		"",
		"# Public-readable",
		"<#public>",
		"    a acl:Authorization;",
		"",
		"    acl:agentClass foaf:Agent;",
		"",
		`    acl:accessTo <./${n}>;`,
		"",
		"    acl:mode acl:Read."
	].join("\n");
}
// node_modules/solid-logic/dist/profile/profileDocuments.esm.js
function If() {
	return "@prefix dct: <http://purl.org/dc/terms/>.\n@prefix pim: <http://www.w3.org/ns/pim/space#>.\n@prefix solid: <http://www.w3.org/ns/solid/terms#>.\n<>\n    a pim:ConfigurationFile ;\n    dct:title \"Preferences file\".";
}
// node_modules/solid-logic/dist/profile/profileAclDocuments.esm.js
function Lf(e) {
	return [
		"@prefix acl: <http://www.w3.org/ns/auth/acl#>.",
		"",
		"<#owner>",
		"a acl:Authorization;",
		`acl:agent <${e}>;`,
		"acl:accessTo <./>;",
		"acl:default <./>;",
		"acl:mode acl:Read, acl:Write, acl:Control."
	].join("\n");
}
// node_modules/solid-logic/dist/profile/profileLogic.esm.js
function Rf(e, t, n) {
	let r = X, i = Pf(e), a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
	function s(e) {
		return !!e && (e.startsWith("https://") || e.startsWith("http://"));
	}
	function c(e) {
		let t = e.doc(), n = t.dir();
		if (n?.uri && s(n.uri)) return n.uri;
		let r = t.uri;
		if (!r || !s(r)) return null;
		let i = r.split("#")[0], a = i.lastIndexOf("/");
		return a === -1 ? null : i.slice(0, a + 1);
	}
	function l(e, t) {
		let n = c(e);
		if (!n) throw Error(`Cannot derive directory for preferences file ${e.uri}`);
		return Si(n + t);
	}
	function u(e) {
		if (e?.response?.status === 404) return !0;
		let t = `${e?.message || e || ""}`;
		return t.includes("404") || t.includes("Not Found");
	}
	async function d(t) {
		let n = Si(t);
		try {
			await e.fetcher.load(n);
			return;
		} catch (e) {
			if (!u(e)) throw e;
		}
		await i.createContainer(t);
	}
	async function f(t, n) {
		let r = c(n);
		if (!r) throw Error(`Cannot derive settings directory from ${n.uri}`);
		await d(r);
		let i = Si(r), a;
		try {
			await e.fetcher.load(i), a = e.any(i, zo)?.value;
		} catch (e) {
			if (!u(e)) throw e;
		}
		a ||= `${r}.acl`;
		let o = Si(a);
		try {
			await e.fetcher.load(o);
			return;
		} catch (e) {
			if (!u(e)) throw e;
		}
		await e.fetcher.webOperation("PUT", o.uri, {
			data: Lf(t.uri),
			contentType: "text/turtle"
		});
	}
	async function p(t, r, i = !1) {
		if (!await n.loadOrCreateWithContentOnCreate(r, ts()) && !i) return;
		let a;
		try {
			await e.fetcher.load(r), a = e.any(r, zo)?.value;
		} catch (e) {
			if (!u(e)) throw e;
		}
		a ||= `${r.uri}.acl`;
		let o = Si(a);
		try {
			await e.fetcher.webOperation("PUT", o.uri, {
				data: Ff(t.uri, r.uri),
				contentType: "text/turtle",
				headers: { "If-None-Match": "*" }
			});
		} catch (e) {
			if ((e?.response?.status ?? e?.status) !== 412) throw e;
		}
	}
	async function m(e) {
		await n.loadOrCreateWithContentOnCreate(e, ns());
	}
	async function h(t, i) {
		let a = i.doc(), o = t.doc();
		await e.fetcher.load(a);
		let s = e.any(t, r.solid("publicTypeIndex"), null, o), c = e.any(t, r.solid("publicTypeIndex"), null, a), u = s || c || l(i, "publicTypeIndex.ttl"), d = e.any(t, r.solid("privateTypeIndex"), null, a) || l(i, "privateTypeIndex.ttl"), f = !s;
		f && await n.followOrCreateLinkWithContentOnCreate(t, r.solid("publicTypeIndex"), u, o, ts());
		let h = [];
		e.holds(a, r.rdf("type"), r.space("ConfigurationFile"), a) || h.push(xi(a, r.rdf("type"), r.space("ConfigurationFile"), a)), e.holds(a, r.dct("title"), void 0, a) || h.push(xi(a, r.dct("title"), Ei("Preferences file"), a)), e.holds(t, r.solid("publicTypeIndex"), u, a) || h.push(xi(t, r.solid("publicTypeIndex"), u, a)), e.holds(t, r.solid("privateTypeIndex"), d, a) || h.push(xi(t, r.solid("privateTypeIndex"), d, a)), h.length > 0 && (await e.updater.update([], h), await e.fetcher.load(a)), await p(t, u, f), await m(d);
	}
	async function g(e) {
		try {
			return !!await n.loadOrCreateWithContentOnCreate(e, If());
		} catch (t) {
			throw t.response?.status === 401 ? new Wo() : t.response?.status === 403 ? Qo(e) ? new Go() : new Ko() : t;
		}
	}
	async function _(e) {
		try {
			return await v(e);
		} catch {
			return;
		}
	}
	async function v(t) {
		let i = o.get(t.uri);
		if (i) return i;
		let s = a.get(t.uri);
		if (s) return s;
		let c = (async () => {
			await y(t);
			let i = $o(t), a;
			try {
				a = e.any(t, r.space("preferencesFile"), null, t.doc()) || await n.followOrCreateLink(t, r.space("preferencesFile"), i, t.doc()), await f(t, a), await g(a), await h(t, a);
			} catch (e) {
				throw sa(`User ${t} has no pointer in profile to preferences file.`), e instanceof qo || e instanceof Jo || e instanceof Wo || e instanceof Go || e instanceof Ko || e instanceof Yo, e;
			}
			try {
				await e.fetcher.load(a);
			} catch (n) {
				let r = `Unable to load preference of user ${t}: ${n}`;
				if (n.response?.status === 404) return await f(t, a), await g(a), await h(t, a), await e.fetcher.load(a), a;
				throw sa(r), n.response.status === 401 ? new Wo() : n.response.status === 403 ? Qo(a) ? new Go() : new Ko() : Error(r);
			}
			return o.set(t.uri, a), a;
		})();
		a.set(t.uri, c);
		try {
			return await c;
		} finally {
			a.get(t.uri) === c && a.delete(t.uri);
		}
	}
	async function y(t) {
		if (!t) throw Error("loadProfile: no user given.");
		try {
			await e.fetcher.load(t.doc());
		} catch (e) {
			throw Error(`Unable to load profile of user ${t}: ${e}`);
		}
		return t.doc();
	}
	async function b() {
		let n = t.currentUser();
		if (n === null) throw Error("Current user not found! Not logged in?");
		return await e.fetcher.load(n.doc()), n;
	}
	function x(e) {
		let t = C(e);
		if (!t) throw Error("User pod root not found!");
		return t;
	}
	async function S(t) {
		await e.fetcher.load(t);
		let n = e.any(t, r.ldp("inbox"), void 0, t.doc());
		if (!n) throw Error("User main inbox not found!");
		return n;
	}
	function C(t) {
		return e.any(t, r.space("storage"), void 0, t.doc());
	}
	return {
		loadMe: b,
		getPodRoot: x,
		getMainInbox: S,
		findStorage: C,
		loadPreferences: v,
		loadProfile: y,
		silencedLoadPreferences: _
	};
}
// node_modules/solid-logic/dist/util/utilityLogic.esm.js
function zf(e, t, n) {
	async function r(t) {
		try {
			return await e.fetcher.load(t);
		} catch (n) {
			if (n?.response?.status === 404) {
				try {
					await e.fetcher.webOperation("PUT", t.uri, {
						data: "",
						contentType: "text/turtle",
						headers: { "If-None-Match": "*" }
					});
				} catch (e) {
					if ((e?.response?.status ?? e?.status) !== 412) throw new Jo(`createIfNotExists: PUT FAILED: ${t}: ${e}`);
				}
				return await e.fetcher.load(t);
			}
			if (n?.response?.status === 401) throw new Wo();
			if (n?.response?.status === 403) throw Qo(t) ? new Go() : new Ko();
			let r = `createIfNotExists doc load error: ${t}: ${n}`;
			throw new Yo(n?.status, `${n?.message || ""}${r}`);
		}
	}
	async function i(t, n) {
		try {
			return await e.fetcher.load(t), !1;
		} catch (e) {
			if ((e?.response?.status ?? e?.status) !== 404) throw e;
		}
		try {
			return await e.fetcher.webOperation("PUT", t.uri, {
				data: n,
				contentType: "text/turtle",
				headers: { "If-None-Match": "*" }
			}), !0;
		} catch (e) {
			if ((e?.response?.status ?? e?.status) === 412) return !1;
			throw e;
		}
	}
	async function a(t, n, i, a) {
		if (!await Cf(e, a)) {
			let e = `followOrCreateLink: cannot establish the authorization of ${a.value}`;
			throw sa(e), new qo(e);
		}
		let o = e.any(t, n, null, a);
		if (o) return o;
		if (!e.updater.editable(a)) {
			let e = `followOrCreateLink: cannot edit ${a.value}`;
			throw sa(e), new qo(e);
		}
		try {
			await e.updater.update([], [xi(t, n, i, a)]);
		} catch (e) {
			throw sa(`followOrCreateLink: Error making link in ${a} to ${i}: ${e}`), new Jo(e);
		}
		try {
			await r(i);
		} catch (e) {
			throw sa(`followOrCreateLink: Error loading or saving new linked document: ${i}: ${e}`), e;
		}
		return i;
	}
	async function o(t, n, r, a, o) {
		if (!await Cf(e, a)) {
			let e = `followOrCreateLinkWithContentOnCreate: cannot establish the authorization of ${a.value}`;
			throw sa(e), new qo(e);
		}
		let s = e.any(t, n, null, a);
		if (s) return s;
		if (!e.updater.editable(a)) {
			let e = `followOrCreateLinkWithContentOnCreate: cannot edit ${a.value}`;
			throw sa(e), new qo(e);
		}
		try {
			await e.updater.update([], [xi(t, n, r, a)]);
		} catch (e) {
			let t = `followOrCreateLinkWithContentOnCreate: Error making link in ${a} to ${r}: ${e}`;
			throw sa(t), new Jo(t);
		}
		try {
			await i(r, o);
		} catch (e) {
			throw sa(`followOrCreateLinkWithContentOnCreate: Error loading or saving new linked document: ${r}: ${e}`), e;
		}
		return r;
	}
	async function s(n) {
		let r = [
			"@prefix acl: <http://www.w3.org/ns/auth/acl#>.",
			"",
			"<#alice> a acl:Authorization;\n  acl:agent <" + n.ownerWebId + ">;",
			`  acl:accessTo <${n.target}>;`,
			`  acl:default <${n.target}>;`,
			"  acl:mode acl:Read, acl:Write, acl:Control.",
			""
		].join("\n");
		n.accessToModes && (r += [
			"<#bobAccessTo> a acl:Authorization;",
			`  acl:agent <${n.peerWebId}>;`,
			`  acl:accessTo <${n.target}>;`,
			`  acl:mode ${n.accessToModes}.`,
			""
		].join("\n")), n.defaultModes && (r += [
			"<#bobDefault> a acl:Authorization;",
			`  acl:agent <${n.peerWebId}>;`,
			`  acl:default <${n.target}>;`,
			`  acl:mode ${n.defaultModes}.`,
			""
		].join("\n"));
		let i = await t.findAclDocUrl(Si(n.target));
		return e.fetcher._fetch(i, {
			method: "PUT",
			body: r,
			headers: [["Content-Type", "text/turtle"]]
		});
	}
	async function c(t, n) {
		await e.fetcher.webOperation("PUT", t.uri, {
			data: `# ${/* @__PURE__ */ new Date()} ${n}\n`,
			contentType: "text/turtle"
		});
	}
	return {
		setSinglePeerAccess: s,
		createEmptyRdfDoc: c,
		followOrCreateLink: a,
		followOrCreateLinkWithContentOnCreate: o,
		loadOrCreateIfNotExists: r,
		loadOrCreateWithContentOnCreate: i
	};
}
// node_modules/solid-logic/dist/logic/solidLogic.esm.js
function Bf(e, t) {
	oa("SolidLogic: Unique instance created.  There should only be one of these.");
	let n = yi();
	vi(n, { fetch: e.fetch }), n.updater = new fi(n), n.features = [];
	let r = gf(n, t), i = new mf(t), a = i.dispose?.bind(i);
	i.dispose = () => {
		r(), a?.();
	};
	let o = Bo(n), s = Pf(n), c = zf(n, o, s), l = Rf(n, i, c), u = Tf(n, l), d = Ef(n, l, c, s, o), f = rs(n, i, l, c), p = As(n, i, f), m = Nf(n, o, s, f);
	oa("SolidAuthnLogic initialized");
	function h(e) {
		return n.fetcher.load(e);
	}
	function g(e, t = []) {
		return new Promise((r, i) => {
			n.updater.update(e, t, function(e, t, n) {
				t ? r() : i(Error(n));
			});
		});
	}
	function _() {
		n.statements.slice().forEach(n.remove.bind(n));
	}
	return {
		store: n,
		authn: i,
		acl: o,
		resource: m,
		inbox: d,
		chat: u,
		profile: l,
		typeIndex: f,
		directory: p,
		load: h,
		updatePromise: g,
		clearStore: _
	};
}
// node_modules/solid-logic/dist/logic/solidLogicSingleton.esm.js
var Vf = async (e, t) => {
	let n = t && t.credentials && t.credentials == "omit", r = df;
	if (!Wi(r) && (r?.info?.webId || r?.webId) && !n) {
		let n = typeof r.authFetch == "function" ? r.authFetch.bind(r) : typeof r.fetch == "function" ? r.fetch.bind(r) : null;
		return n ? n(e, t) : window.fetch(e, t);
	}
	return window.fetch(e, t);
}, Hf = Symbol.for("solid-logic-singleton"), Uf = typeof window < "u" ? window : global;
function Wf() {
	return Uf[Hf] ? oa("SolidLogic: Using existing global singleton instance.") : (oa("SolidLogic: Creating new global singleton instance."), Uf[Hf] = Bf({ fetch: Vf }, df), oa("Unique quadstore initialized.")), Uf[Hf];
}
var Gf = Wf();
export { fi as A, xe as B, yi as C, xi as D, Si as E, bt as F, o as G, R as H, et as I, u as J, c as K, Be as L, Kr as M, Ot as N, ji as O, Et as P, Ne as R, Ai as S, Ei as T, M as U, ye as V, s as W, ka as _, Go as a, gi as b, Yo as c, Io as d, zo as f, Aa as g, No as h, qo as i, li as j, Ci as k, Wo as l, Ro as m, ks as n, Jo as o, Mo as p, d as q, rs as r, Ko as s, Gf as t, Ho as u, aa as v, bi as w, vi as x, Fi as y, De as z };

//# sourceMappingURL=solidLogicSingleton.esm-Bvt7E7Vl.js.map