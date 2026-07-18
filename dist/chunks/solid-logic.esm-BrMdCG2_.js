import { a as e, r as t, t as n } from "./rolldown-runtime-B1bRi_D7.js";
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/typeof.js
var r = /* @__PURE__ */ e((/* @__PURE__ */ n(((e, t) => {
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
function i(e) {
	"@babel/helpers - typeof";
	return i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, i(e);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function a(e, t) {
	if (i(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (i(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function o(e) {
	var t = a(e, "string");
	return i(t) == "symbol" ? t : t + "";
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/defineProperty.js
function s(e, t, n) {
	return (t = o(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
//#endregion
//#region node_modules/rdflib/esm/class-order.js
var c = {
	Literal: 1,
	Collection: 3,
	Graph: 4,
	NamedNode: 5,
	BlankNode: 6,
	Variable: 7
}, l = class {
	constructor(e) {
		s(this, "termType", void 0), s(this, "classOrder", void 0), s(this, "value", void 0), this.value = e;
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
s(l, "fromValue", void 0), s(l, "toJS", void 0);
//#endregion
//#region node_modules/rdflib/esm/types.js
var u = "NamedNode", d = "BlankNode", f = "Literal", p = "Variable", m = "DefaultGraph", h = "Collection", g = "Empty", _ = "Graph", v = "text/html", y = "application/ld+json", b = "text/n3", x = "application/n3", S = "application/nquads", C = "application/n-quads", w = "application/n-triples", T = "application/rdf+xml", E = "text/turtle", D = "application/x-turtle", O = "application/xhtml+xml", k = class e extends l {
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
		super(e.getId(t)), s(this, "termType", d), s(this, "classOrder", c.BlankNode), s(this, "isBlank", 1), s(this, "isVar", 1);
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
s(k, "nextId", 0), s(k, "NTAnonymousNodePrefix", "_:");
//#endregion
//#region node_modules/rdflib/esm/utils/termValue.js
function ee(e) {
	return typeof e == "string" ? e : e.value;
}
//#endregion
//#region node_modules/rdflib/esm/utils/terms.js
function A(e) {
	return typeof e == "object" && !!e && "subject" in e;
}
function j(e) {
	return typeof e == "object" && !!e && "statements" in e;
}
function te(e) {
	return N(e) && e.termType === "Collection";
}
function ne(e) {
	return e && Object.prototype.hasOwnProperty.call(e, "termType") && (e.termType === "NamedNode" || e.termType === "Variable" || e.termType === "BlankNode" || e.termType === "Collection" || e.termType === "Literal" || e.termType === "Graph");
}
function re(e) {
	return e && Object.prototype.hasOwnProperty.call(e, "termType") && (e.termType === "NamedNode" || e.termType === "Variable" || e.termType === "BlankNode" || e.termType === "Collection" || e.termType === "Literal" || e.termType === "Graph");
}
function ie(e) {
	return N(e) && (e.termType === "NamedNode" || e.termType === "BlankNode" || e.termType === "Variable");
}
function M(e) {
	return N(e) && e.termType === "Variable";
}
function N(e) {
	return typeof e == "object" && !!e && "termType" in e;
}
function ae(e) {
	return e.termType === f;
}
function P(e) {
	return typeof e == "object" && !!e && "subject" in e && "predicate" in e && "object" in e;
}
function F(e) {
	return N(e) && e.termType === "NamedNode";
}
function I(e) {
	return N(e) && "termType" in e && e.termType === "BlankNode";
}
function L(e) {
	return N(e) && (e.termType === "NamedNode" || e.termType === "Variable" || e.termType === "BlankNode");
}
function R(e) {
	return N(e) && (e.termType === "NamedNode" || e.termType === "Variable");
}
function oe(e) {
	return N(e) && (e.termType === "NamedNode" || e.termType === "Variable" || e.termType === "BlankNode" || e.termType === "Literal");
}
function se(e) {
	return N(e) && (e.termType === "NamedNode" || e.termType === "Variable" || e.termType === "BlankNode" || e.termType === "DefaultGraph");
}
//#endregion
//#region node_modules/rdflib/esm/named-node.js
var z = class e extends l {
	constructor(e) {
		if (super(ee(e)), s(this, "termType", u), s(this, "classOrder", c.NamedNode), !this.value) throw Error("Missing IRI for NamedNode");
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
		return t == null || N(t) ? t : new e(t);
	}
}, B = {
	boolean: new z("http://www.w3.org/2001/XMLSchema#boolean"),
	dateTime: new z("http://www.w3.org/2001/XMLSchema#dateTime"),
	decimal: new z("http://www.w3.org/2001/XMLSchema#decimal"),
	double: new z("http://www.w3.org/2001/XMLSchema#double"),
	integer: new z("http://www.w3.org/2001/XMLSchema#integer"),
	langString: new z("http://www.w3.org/1999/02/22-rdf-syntax-ns#langString"),
	string: new z("http://www.w3.org/2001/XMLSchema#string")
}, V = class e extends l {
	constructor(e, t, n) {
		super(e), s(this, "termType", f), s(this, "classOrder", c.Literal), s(this, "datatype", B.string), s(this, "isVar", 0), s(this, "language", ""), t ? (this.language = t, this.datatype = B.langString) : n ? this.datatype = z.fromValue(n) : this.datatype = B.string;
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
		return t = t.replace(/\\/g, "\\\\"), t = t.replace(/\"/g, "\\\""), t = t.replace(/\n/g, "\\n"), t = t.replace(/\r/g, "\\r"), t = "\"" + t + "\"", e.language ? t += "@" + e.language : e.datatype.equals(B.string) || (t += "^^" + e.datatype.toCanonical()), t;
	}
	toString() {
		return "" + this.value;
	}
	static fromBoolean(t) {
		return new e(t ? "1" : "0", null, B.boolean);
	}
	static fromDate(t) {
		if (!(t instanceof Date)) throw TypeError("Invalid argument to Literal.fromDate()");
		let n = function(e) {
			return ("" + (100 + e)).slice(1, 3);
		}, r = "" + t.getUTCFullYear() + "-" + n(t.getUTCMonth() + 1) + "-" + n(t.getUTCDate()) + "T" + n(t.getUTCHours()) + ":" + n(t.getUTCMinutes()) + ":" + n(t.getUTCSeconds()) + "Z";
		return new e(r, null, B.dateTime);
	}
	static fromNumber(t) {
		if (typeof t != "number") throw TypeError("Invalid argument to Literal.fromNumber()");
		let n, r = t.toString();
		return n = r.indexOf("e") < 0 && Math.abs(t) <= 2 ** 53 - 1 ? Number.isInteger(t) ? B.integer : B.decimal : B.double, new e(r, null, n);
	}
	static fromValue(t) {
		if (ae(t)) return t;
		switch (typeof t) {
			case "object": if (t instanceof Date) return e.fromDate(t);
			case "boolean": return e.fromBoolean(t);
			case "number": return e.fromNumber(t);
			case "string": return new e(t);
		}
		throw Error("Can't make literal from " + t + " of type " + typeof t);
	}
};
//#endregion
//#region node_modules/rdflib/esm/collection.js
function ce(e) {
	return e == null || N(e) ? e : Array.isArray(e) ? new le(e) : V.fromValue(e);
}
var le = class e extends l {
	constructor(e) {
		super((k.nextId++).toString()), s(this, "termType", h), s(this, "classOrder", c.Collection), s(this, "closed", !1), s(this, "compareTerm", k.prototype.compareTerm), s(this, "elements", []), s(this, "isVar", 0), e && e.length > 0 && e.forEach((e) => {
			this.elements.push(ce(e));
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
		return k.NTAnonymousNodePrefix + e.id;
	}
	toString() {
		return "(" + this.elements.join(" ") + ")";
	}
	unshift(e) {
		return this.elements.unshift(e);
	}
};
s(le, "termType", h);
//#endregion
//#region node_modules/rdflib/esm/empty.js
var ue = class extends l {
	constructor() {
		super(""), s(this, "termType", g);
	}
	toString() {
		return "()";
	}
}, de = "chrome:theSession";
new z(de);
//#endregion
//#region node_modules/rdflib/esm/default-graph.js
var fe = class extends l {
	constructor() {
		super(""), s(this, "value", ""), s(this, "termType", m), s(this, "uri", de);
	}
	toCanonical() {
		return this.value;
	}
	toString() {
		return "DefaultGraph";
	}
};
function pe(e) {
	return !!e && e.termType === "DefaultGraph";
}
//#endregion
//#region node_modules/rdflib/esm/statement.js
var me = new fe(), he = class e {
	constructor(e, t, n, r) {
		s(this, "subject", void 0), s(this, "predicate", void 0), s(this, "object", void 0), s(this, "graph", void 0), this.subject = l.fromValue(e), this.predicate = l.fromValue(t), this.object = l.fromValue(n), this.graph = r == null ? me : l.fromValue(r);
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
		return new e(this.subject.substitute(t), this.predicate.substitute(t), this.object.substitute(t), pe(this.graph) ? this.graph : this.graph.substitute(t));
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
			pe(this.graph) ? "" : this.graph.toNT()
		].join(" ") + " .";
	}
	toString() {
		return this.toNT();
	}
}, ge = /* @__PURE__ */ t({
	docpart: () => ve,
	document: () => ye,
	hostpart: () => be,
	join: () => xe,
	protocol: () => Se,
	refTo: () => Ce
}), _e = _e || console.log;
function ve(e) {
	var t = e.indexOf("#");
	return t < 0 ? e : e.slice(0, t);
}
function ye(e) {
	return new z(ve(e));
}
function be(e) {
	var t = /[^\/]*\/\/([^\/]*)\//.exec(e);
	return t ? t[1] : "";
}
function xe(e, t) {
	var n, r, i, a, o, s, c = t.indexOf("#");
	if (c > 0 && (t = t.slice(0, c)), e.length === 0) return t;
	if (e.indexOf("#") === 0) return t + e;
	if (a = e.indexOf(":"), a >= 0 || (n = t.indexOf(":"), t.length === 0)) return e;
	if (n < 0) return _e("Invalid base: " + t + " in join with given: " + e), e;
	if (r = t.slice(0, +n + 1 || 9e9), e.indexOf("//") === 0) return r + e;
	if (t.indexOf("//", n) === n + 1) {
		if (i = t.indexOf("/", n + 3), i < 0) return t.length - n - 3 > 0 ? t + "/" + e : r + e;
	} else if (i = t.indexOf("/", n + 1), i < 0) return t.length - n - 1 > 0 ? t + "/" + e : r + e;
	if (e.indexOf("/") === 0) return t.slice(0, i) + e;
	if (s = t.slice(i), o = s.lastIndexOf("/"), o < 0) return r + e;
	for (o >= 0 && o < s.length - 1 && (s = s.slice(0, +o + 1 || 9e9)), s += e; s.match(/[^\/]*\/\.\.\//);) s = s.replace(/[^\/]*\/\.\.\//, "");
	return s = s.replace(/\.\//g, ""), s = s.replace(/\/\.$/, "/"), t.slice(0, i) + s;
}
function Se(e) {
	let t = e.indexOf(":");
	return t < 0 ? null : e.slice(0, t);
}
function Ce(e, t) {
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
//#endregion
//#region node_modules/rdflib/esm/variable.js
var we = class e extends l {
	constructor(e = "") {
		super(e), s(this, "termType", p), s(this, "base", "varid:"), s(this, "classOrder", c.Variable), s(this, "isVar", 1), s(this, "uri", void 0), this.base = "varid:", this.uri = xe(e, this.base);
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
}, Te = /*#__PURE__*/ function(e) {
	return e.collections = "COLLECTIONS", e.defaultGraphType = "DEFAULT_GRAPH_TYPE", e.equalsMethod = "EQUALS_METHOD", e.id = "ID", e.identity = "IDENTITY", e.reversibleId = "REVERSIBLE_ID", e.variableType = "VARIABLE_TYPE", e;
}({}), Ee = new fe(), De = {
	supports: {
		[Te.collections]: !1,
		[Te.defaultGraphType]: !1,
		[Te.equalsMethod]: !0,
		[Te.identity]: !1,
		[Te.id]: !0,
		[Te.reversibleId]: !1,
		[Te.variableType]: !0
	},
	blankNode(e) {
		return new k(e);
	},
	defaultGraph: () => Ee,
	equals(e, t) {
		return e === t || !e || !t ? !0 : P(e) || P(t) ? P(e) && P(t) ? this.equals(e.subject, t.subject) && this.equals(e.predicate, t.predicate) && this.equals(e.object, t.object) && this.equals(e.graph, t.graph) : !1 : N(e) && N(t) ? this.id(e) === this.id(t) : !1;
	},
	id(e) {
		if (!e) return "undefined";
		if (P(e)) return this.quadToNQ(e);
		switch (e.termType) {
			case m: return "defaultGraph";
			case h: return le.toNT(e);
			case p: return we.toString(e);
			default:
				let t = this.termToNQ(e);
				if (t) return t;
				throw Error(`Can't id term with type '${e.termType}'`);
		}
	},
	isQuad(e) {
		return e instanceof he;
	},
	literal(e, t) {
		if (typeof e != "string" && !t) return V.fromValue(e);
		let n = typeof e == "string" ? e : "" + e;
		return typeof t == "string" ? t.indexOf(":") === -1 ? new V(n, t) : new V(n, null, this.namedNode(t)) : new V(n, null, t);
	},
	namedNode(e) {
		return new z(e);
	},
	quad(e, t, n, r) {
		return new he(e, t, n, r || Ee);
	},
	triple(e, t, n, r) {
		return this.quad(e, t, n, r);
	},
	quadToNQ(e) {
		return `${this.termToNQ(e.subject)} ${this.termToNQ(e.predicate)} ${this.termToNQ(e.object)} ${this.termToNQ(e.graph)} .`;
	},
	termToNQ(e) {
		switch (e.termType) {
			case d: return "_:" + e.value;
			case m: return "";
			case g: return "<http://www.w3.org/1999/02/22-rdf-syntax-ns#nil>";
			case f: return V.toNT(e);
			case _:
			case u: return "<" + e.value + ">";
			case h: return "(" + e.elements.map((e) => this.termToNQ(e)).join(" ") + ")";
			default: throw Error(`Can't serialize nonstandard term type (was '${e.termType}')`);
		}
	},
	toNQ(e) {
		return this.isQuad(e) ? this.quadToNQ(e) : this.termToNQ(e);
	},
	variable(e) {
		return new we(e);
	}
}, H = {
	debug(e) {},
	warn(e) {},
	info(e) {},
	error(e) {},
	success(e) {},
	msg(e) {}
};
//#endregion
//#region node_modules/rdflib/esm/namespace.js
function U(e, t) {
	let n = t || { namedNode: (e) => new z(e) };
	return function(t) {
		return n.namedNode(e + (t || ""));
	};
}
//#endregion
//#region node_modules/@frogcat/ttl2jsonld/ttl2jsonld.js
var Oe = /* @__PURE__ */ n(((e, t) => {
	(function(e, n) {
		typeof define == "function" && define.amd ? define([], n) : typeof t == "object" && t.exports ? t.exports = n() : e.ttl2jsonld = n();
	})(e, function() {
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
					var t = "", n;
					for (n = 0; n < e.parts.length; n++) t += e.parts[n] instanceof Array ? a(e.parts[n][0]) + "-" + a(e.parts[n][1]) : a(e.parts[n]);
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
				var t = Array(e.length), n, r;
				for (n = 0; n < e.length; n++) t[n] = o(e[n]);
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
			var r = {}, i = { turtleDoc: tr }, a = tr, o = function(e) {
				var t = Q.toJSON();
				return t["@graph"] = [], e.filter((e) => Array.isArray(e)).forEach((e) => {
					e.forEach((e) => {
						t["@graph"].push(e);
					});
				}), t["@graph"].length === 1 && (Object.assign(t, t["@graph"][0]), delete t["@graph"]), t;
			}, s = "﻿", c = J("﻿", !1), l = ".", u = J(".", !1), d = function(e) {
				return e;
			}, f = "#", p = J("#", !1), m = /^[^\n]/, h = Y(["\n"], !0, !1), g = "\n", _ = J("\n", !1), v = function(e) {
				return e.join("");
			}, y = "@prefix", b = J("@prefix", !1), x = function(e, t) {
				return Q.addPrefix(e === "" ? "0" : e, t), {};
			}, S = "@base", C = J("@base", !1), w = function(e) {
				return Q.addBase(e), {};
			}, T = /^[Bb]/, E = Y(["B", "b"], !1, !1), D = /^[Aa]/, O = Y(["A", "a"], !1, !1), k = /^[Ss]/, ee = Y(["S", "s"], !1, !1), A = /^[Ee]/, j = Y(["E", "e"], !1, !1), te = /^[Pp]/, ne = Y(["P", "p"], !1, !1), re = /^[Rr]/, ie = Y(["R", "r"], !1, !1), M = /^[Ff]/, N = Y(["F", "f"], !1, !1), ae = /^[Ii]/, P = Y(["I", "i"], !1, !1), F = /^[Xx]/, I = Y(["X", "x"], !1, !1), L = function(e, t) {
				var n = {};
				return typeof e == "string" && e !== "[]" ? n["@id"] = e : typeof e == "object" && Object.assign(n, e), t && Object.assign(n, t), [n];
			}, R = function(e, t) {
				var n = {};
				return e && Object.assign(n, e), t && Object.assign(n, t), [n];
			}, oe = ";", se = J(";", !1), z = function(e, t, n, r) {
				var i = {};
				return i[n] = r, i;
			}, B = function(e, t, n) {
				return n;
			}, V = function(e, t, n) {
				var r = {};
				return n.unshift(ti(e, t)), n.forEach((e) => {
					e && Object.keys(e).forEach((t) => {
						e[t].forEach((e) => {
							t === "@type" && e["@id"] !== void 0 && (e = e["@id"]), r[t] === void 0 ? r[t] = e : Array.isArray(r[t]) ? r[t].push(e) : r[t] = [r[t], e];
						});
					});
				}), r;
			}, ce = ",", le = J(",", !1), ue = function(e, t) {
				return t;
			}, de = function(e, t) {
				return t.unshift(e), t;
			}, fe = "a", pe = J("a", !1), me = function() {
				return "@type";
			}, he = function(e) {
				return ni(e, !0);
			}, ge = function(e) {
				return ni(e, !1);
			}, _e = function(e) {
				return e === "[]" ? {} : { "@id": e };
			}, ve = function(e) {
				return { "@id": e };
			}, ye = "[", be = J("[", !1), xe = "]", Se = J("]", !1), Ce = "(", we = J("(", !1), Te = ")", Ee = J(")", !1), De = function(e) {
				return { "@list": e };
			}, H = function(e, t) {
				return {
					"@value": e,
					"@language": t
				};
			}, U = "^^", Oe = J("^^", !1), ke = function(e, t) {
				if (t === "http://www.w3.org/2001/XMLSchema#boolean" && e === "true") return !0;
				if (t === "http://www.w3.org/2001/XMLSchema#boolean" && e === "false") return !1;
				if (t === "http://www.w3.org/2001/XMLSchema#integer") return parseInt(e);
				if (t === "http://www.w3.org/2001/XMLSchema#double") return parseFloat(e);
				let n = Q.resolve(t, !0);
				if (n) {
					let r = t.split(":")[0];
					if (n === "http://www.w3.org/2001/XMLSchema#boolean" && e === "true") return Q.decrement(r), !0;
					if (n === "http://www.w3.org/2001/XMLSchema#boolean" && e === "false") return Q.decrement(r), !1;
					if (n === "http://www.w3.org/2001/XMLSchema#integer") return Q.decrement(r), parseInt(e);
					if (n === "http://www.w3.org/2001/XMLSchema#double") return Q.decrement(r), parseFloat(e);
				}
				return {
					"@value": e,
					"@type": t
				};
			}, Ae = "true", je = J("true", !1), Me = function() {
				return !0;
			}, Ne = "false", Pe = J("false", !1), Fe = function() {
				return !1;
			}, Ie = function(e) {
				return e + ":";
			}, Le = "<", Re = J("<", !1), ze = /^[^\0- <>"{}|\^`\\]/, Be = Y([
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
			], !0, !1), Ve = ">", He = J(">", !1), Ue = function(e) {
				let t = e.map((e) => 65536 <= e.codePointAt(0) && e.codePointAt(0) <= 983039 ? "a" : e.length === 1 ? e : e.length === 6 ? String.fromCharCode("0x" + e.substring(2)) : e.length === 10 ? String.fromCodePoint("0x" + e.substring(2)) : e).join("");
				if (t.match(/^[^\u0000-\u0020<>"{}|^`\\]*$/)) {
					var n = e.join("");
					try {
						return Q.resolve(n);
					} catch {
						Yn("Invalid IRIREF " + n);
					}
				} else Yn("Invalid IRIREF " + e.join("") + " / " + t);
			}, We = ":", Ge = J(":", !1), Ke = function(e) {
				return e ||= "0", Q.hasPrefix(e) === !1 && Yn("undefined prefix " + e), e;
			}, qe = function(e) {
				return e || "";
			}, Je = function(e, t) {
				return Q.increment(e), Q.resolve(e + ":" + t);
			}, Ye = "_:", Xe = J("_:", !1), Ze = /^[0-9]/, Qe = Y([["0", "9"]], !1, !1), $e = "@", et = J("@", !1), tt = /^[a-zA-Z]/, nt = Y([["a", "z"], ["A", "Z"]], !1, !1), rt = "-", it = J("-", !1), at = /^[a-zA-Z0-9]/, ot = Y([
				["a", "z"],
				["A", "Z"],
				["0", "9"]
			], !1, !1), st = function(e, t) {
				return "-" + t.join("");
			}, ct = function(e, t) {
				return e.join("") + t.join("");
			}, lt = /^[+\-]/, ut = Y(["+", "-"], !1, !1), dt = function(e) {
				return e.match(/^[0+][0-9]+$/) ? {
					"@value": e,
					"@type": "http://www.w3.org/2001/XMLSchema#integer"
				} : parseInt(e);
			}, ft = function(e) {
				return {
					"@value": e,
					"@type": "http://www.w3.org/2001/XMLSchema#decimal"
				};
			}, pt = function(e) {
				return {
					"@value": e,
					"@type": "http://www.w3.org/2001/XMLSchema#double"
				};
			}, mt = /^[eE]/, ht = Y(["e", "E"], !1, !1), gt = "\"", _t = J("\"", !1), vt = /^[^"\\\n\r]/, yt = Y([
				"\"",
				"\\",
				"\n",
				"\r"
			], !0, !1), bt = "'", xt = J("'", !1), St = /^[^'\\\n\r]/, Ct = Y([
				"'",
				"\\",
				"\n",
				"\r"
			], !0, !1), wt = "'''", Tt = J("'''", !1), Et = /^[^'\\]/, Dt = Y(["'", "\\"], !0, !1), Ot = "''", kt = J("''", !1), At = function(e, t) {
				return "''" + t.join("");
			}, jt = function(e, t) {
				return "'" + t.join("");
			}, Mt = function(e, t) {
				return e.join("") + t.join("");
			}, Nt = "\"\"\"", Pt = J("\"\"\"", !1), Ft = /^[^"\\]/, It = Y(["\"", "\\"], !0, !1), Lt = "\"\"", Rt = J("\"\"", !1), zt = function(e, t) {
				return "\"\"" + t.join("");
			}, Bt = function(e, t) {
				return "\"" + t.join("");
			}, Vt = "\\U", Ht = J("\\U", !1), Ut = function(e) {
				return String.fromCodePoint(parseInt(e.join(""), 16));
			}, Wt = "\\u", Gt = J("\\u", !1), Kt = function(e) {
				return String.fromCharCode(parseInt(e.join(""), 16));
			}, qt = "\\t", Jt = J("\\t", !1), Yt = function() {
				return "	";
			}, Xt = "\\b", Zt = J("\\b", !1), Qt = function() {
				return "\b";
			}, $t = "\\n", en = J("\\n", !1), tn = function() {
				return "\n";
			}, nn = "\\r", rn = J("\\r", !1), an = function() {
				return "\r";
			}, on = "\\f", sn = J("\\f", !1), cn = function() {
				return "\f";
			}, W = "\\\"", ln = J("\\\"", !1), un = function() {
				return "\"";
			}, dn = "\\'", fn = J("\\'", !1), pn = function() {
				return "'";
			}, mn = "\\\\", hn = J("\\\\", !1), gn = function() {
				return "\\";
			}, _n = /^[ \t\r\n]/, vn = Y([
				" ",
				"	",
				"\r",
				"\n"
			], !1, !1), yn = function() {
				return "[]";
			}, bn = /^[\uD800-\uDBFF]/, xn = Y([["\ud800", "\udbff"]], !1, !1), Sn = /^[\uDC00-\uDFFF]/, Cn = Y([["\udc00", "\udfff"]], !1, !1), wn = function(e, t) {
				return e + t;
			}, Tn = /^[A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, En = Y([
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
			], !1, !1), Dn = "_", On = J("_", !1), kn = "·", An = J("·", !1), jn = /^[\u0300-\u036F]/, Mn = Y([["̀", "ͯ"]], !1, !1), Nn = /^[\u203F-\u2040]/, Pn = Y([["‿", "⁀"]], !1, !1), Fn = function(e, t, n, r) {
				return n.join("") + r.join("");
			}, In = function(e, t, n) {
				return e + t.join("") + n.join("");
			}, Ln = "%", Rn = J("%", !1), zn = /^[0-9A-Fa-f]/, Bn = Y([
				["0", "9"],
				["A", "F"],
				["a", "f"]
			], !1, !1), Vn = "\\", Hn = J("\\", !1), Un = /^[_~.!$&'()*+,;=\/?#@%\-]/, Wn = Y([
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
			], !1, !1), G = 0, K = 0, Gn = [{
				line: 1,
				column: 1
			}], Kn = 0, qn = [], q = 0, Jn;
			if ("startRule" in n) {
				if (!(n.startRule in i)) throw Error("Can't start parsing from rule \"" + n.startRule + "\".");
				a = i[n.startRule];
			}
			function Yn(e, t) {
				throw t = t === void 0 ? Qn(K, G) : t, $n(e, t);
			}
			function J(e, t) {
				return {
					type: "literal",
					text: e,
					ignoreCase: t
				};
			}
			function Y(e, t, n) {
				return {
					type: "class",
					parts: e,
					inverted: t,
					ignoreCase: n
				};
			}
			function Xn() {
				return { type: "end" };
			}
			function Zn(t) {
				var n = Gn[t], r;
				if (n) return n;
				for (r = t - 1; !Gn[r];) r--;
				for (n = Gn[r], n = {
					line: n.line,
					column: n.column
				}; r < t;) e.charCodeAt(r) === 10 ? (n.line++, n.column = 1) : n.column++, r++;
				return Gn[t] = n, n;
			}
			function Qn(e, t) {
				var n = Zn(e), r = Zn(t);
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
			function X(e) {
				G < Kn || (G > Kn && (Kn = G, qn = []), qn.push(e));
			}
			function $n(e, n) {
				return new t(e, null, null, n);
			}
			function er(e, n, r) {
				return new t(t.buildMessage(e, n), e, n, r);
			}
			function tr() {
				for (var e = G, t = [], n = nr(), i, a; n !== r;) t.push(n), n = nr();
				if (t !== r) {
					for (n = [], i = rr(); i !== r;) n.push(i), i = rr();
					if (n !== r) {
						for (i = [], a = Z(); a !== r;) i.push(a), a = Z();
						i === r ? (G = e, e = r) : (K = e, t = o(n), e = t);
					} else G = e, e = r;
				} else G = e, e = r;
				return e;
			}
			function nr() {
				var t;
				return e.charCodeAt(G) === 65279 ? (t = s, G++) : (t = r, q === 0 && X(c)), t;
			}
			function rr() {
				var t = ar(), n, i, a;
				if (t === r) if (t = G, n = ur(), n !== r) {
					for (i = [], a = Z(); a !== r;) i.push(a), a = Z();
					i === r ? (G = t, t = r) : (e.charCodeAt(G) === 46 ? (a = l, G++) : (a = r, q === 0 && X(u)), a === r ? (G = t, t = r) : (K = t, n = d(n), t = n));
				} else G = t, t = r;
				return t;
			}
			function ir() {
				var t = G, n, i, a;
				if (e.charCodeAt(G) === 35 ? (n = f, G++) : (n = r, q === 0 && X(p)), n !== r) {
					for (i = [], m.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(h)); a !== r;) i.push(a), m.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(h));
					i === r ? (G = t, t = r) : (e.charCodeAt(G) === 10 ? (a = g, G++) : (a = r, q === 0 && X(_)), a === r ? (G = t, t = r) : (K = t, n = v(i), t = n));
				} else G = t, t = r;
				return t;
			}
			function Z() {
				var e = Ur();
				return e === r && (e = ir()), e;
			}
			function ar() {
				var e = or();
				return e === r && (e = sr(), e === r && (e = lr(), e === r && (e = cr()))), e;
			}
			function or() {
				for (var t = G, n = [], i = Z(), a, o, s, c, d, f; i !== r;) n.push(i), i = Z();
				if (n !== r) if (e.substr(G, 7) === y ? (i = y, G += 7) : (i = r, q === 0 && X(b)), i !== r) {
					for (a = [], o = Z(); o !== r;) a.push(o), o = Z();
					if (a !== r) if (o = kr(), o !== r) {
						for (s = [], c = Z(); c !== r;) s.push(c), c = Z();
						if (s !== r) if (c = Dr(), c !== r) {
							for (d = [], f = Z(); f !== r;) d.push(f), f = Z();
							d === r ? (G = t, t = r) : (e.charCodeAt(G) === 46 ? (f = l, G++) : (f = r, q === 0 && X(u)), f === r ? (G = t, t = r) : (K = t, n = x(o, c), t = n));
						} else G = t, t = r;
						else G = t, t = r;
					} else G = t, t = r;
					else G = t, t = r;
				} else G = t, t = r;
				else G = t, t = r;
				return t;
			}
			function sr() {
				for (var t = G, n = [], i = Z(), a, o, s, c; i !== r;) n.push(i), i = Z();
				if (n !== r) if (e.substr(G, 5) === S ? (i = S, G += 5) : (i = r, q === 0 && X(C)), i !== r) {
					for (a = [], o = Z(); o !== r;) a.push(o), o = Z();
					if (a !== r) if (o = Dr(), o !== r) {
						for (s = [], c = Z(); c !== r;) s.push(c), c = Z();
						s === r ? (G = t, t = r) : (e.charCodeAt(G) === 46 ? (c = l, G++) : (c = r, q === 0 && X(u)), c === r ? (G = t, t = r) : (K = t, n = w(o), t = n));
					} else G = t, t = r;
					else G = t, t = r;
				} else G = t, t = r;
				else G = t, t = r;
				return t;
			}
			function cr() {
				for (var t = G, n = [], i = Z(), a, o, s, c, l; i !== r;) n.push(i), i = Z();
				if (n !== r) if (T.test(e.charAt(G)) ? (i = e.charAt(G), G++) : (i = r, q === 0 && X(E)), i !== r) if (D.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(O)), a !== r) if (k.test(e.charAt(G)) ? (o = e.charAt(G), G++) : (o = r, q === 0 && X(ee)), o !== r) if (A.test(e.charAt(G)) ? (s = e.charAt(G), G++) : (s = r, q === 0 && X(j)), s !== r) {
					for (c = [], l = Z(); l !== r;) c.push(l), l = Z();
					c === r ? (G = t, t = r) : (l = Dr(), l === r ? (G = t, t = r) : (K = t, n = w(l), t = n));
				} else G = t, t = r;
				else G = t, t = r;
				else G = t, t = r;
				else G = t, t = r;
				else G = t, t = r;
				return t;
			}
			function lr() {
				for (var t = G, n = [], i = Z(), a, o, s, c, l, u, d, f, p; i !== r;) n.push(i), i = Z();
				if (n !== r) if (te.test(e.charAt(G)) ? (i = e.charAt(G), G++) : (i = r, q === 0 && X(ne)), i !== r) if (re.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(ie)), a !== r) if (A.test(e.charAt(G)) ? (o = e.charAt(G), G++) : (o = r, q === 0 && X(j)), o !== r) if (M.test(e.charAt(G)) ? (s = e.charAt(G), G++) : (s = r, q === 0 && X(N)), s !== r) if (ae.test(e.charAt(G)) ? (c = e.charAt(G), G++) : (c = r, q === 0 && X(P)), c !== r) if (F.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(I)), l !== r) {
					for (u = [], d = Z(); d !== r;) u.push(d), d = Z();
					if (u !== r) if (d = kr(), d !== r) {
						for (f = [], p = Z(); p !== r;) f.push(p), p = Z();
						f === r ? (G = t, t = r) : (p = Dr(), p === r ? (G = t, t = r) : (K = t, n = x(d, p), t = n));
					} else G = t, t = r;
					else G = t, t = r;
				} else G = t, t = r;
				else G = t, t = r;
				else G = t, t = r;
				else G = t, t = r;
				else G = t, t = r;
				else G = t, t = r;
				else G = t, t = r;
				return t;
			}
			function ur() {
				var e = G, t = mr(), n;
				return t === r ? (G = e, e = r) : (n = dr(), n === r ? (G = e, e = r) : (K = e, t = L(t, n), e = t)), e === r && (e = G, t = vr(), t === r ? (G = e, e = r) : (n = dr(), n === r && (n = null), n === r ? (G = e, e = r) : (K = e, t = R(t, n), e = t))), e;
			}
			function dr() {
				var t = G, n = pr(), i, a, o, s, c, l, u, d;
				if (n !== r) if (i = fr(), i !== r) {
					for (a = [], o = G, s = [], c = Z(); c !== r;) s.push(c), c = Z();
					for (s === r ? (G = o, o = r) : (e.charCodeAt(G) === 59 ? (c = oe, G++) : (c = r, q === 0 && X(se)), c === r ? (G = o, o = r) : (l = G, u = pr(), u === r ? (G = l, l = r) : (d = fr(), d === r ? (G = l, l = r) : (K = l, u = z(n, i, u, d), l = u)), l === r && (l = null), l === r ? (G = o, o = r) : (K = o, s = B(n, i, l), o = s))); o !== r;) {
						for (a.push(o), o = G, s = [], c = Z(); c !== r;) s.push(c), c = Z();
						s === r ? (G = o, o = r) : (e.charCodeAt(G) === 59 ? (c = oe, G++) : (c = r, q === 0 && X(se)), c === r ? (G = o, o = r) : (l = G, u = pr(), u === r ? (G = l, l = r) : (d = fr(), d === r ? (G = l, l = r) : (K = l, u = z(n, i, u, d), l = u)), l === r && (l = null), l === r ? (G = o, o = r) : (K = o, s = B(n, i, l), o = s)));
					}
					a === r ? (G = t, t = r) : (K = t, n = V(n, i, a), t = n);
				} else G = t, t = r;
				else G = t, t = r;
				return t;
			}
			function fr() {
				var t = G, n = gr(), i, a, o, s, c;
				if (n !== r) {
					for (i = [], a = G, o = [], s = Z(); s !== r;) o.push(s), s = Z();
					for (o === r ? (G = a, a = r) : (e.charCodeAt(G) === 44 ? (s = ce, G++) : (s = r, q === 0 && X(le)), s === r ? (G = a, a = r) : (c = gr(), c === r ? (G = a, a = r) : (K = a, o = ue(n, c), a = o))); a !== r;) {
						for (i.push(a), a = G, o = [], s = Z(); s !== r;) o.push(s), s = Z();
						o === r ? (G = a, a = r) : (e.charCodeAt(G) === 44 ? (s = ce, G++) : (s = r, q === 0 && X(le)), s === r ? (G = a, a = r) : (c = gr(), c === r ? (G = a, a = r) : (K = a, o = ue(n, c), a = o)));
					}
					i === r ? (G = t, t = r) : (K = t, n = de(n, i), t = n);
				} else G = t, t = r;
				return t;
			}
			function pr() {
				var t = G, n = hr(), i;
				if (n !== r && (K = t, n = d(n)), t = n, t === r) {
					for (t = G, n = [], i = Z(); i !== r;) n.push(i), i = Z();
					n === r ? (G = t, t = r) : (e.charCodeAt(G) === 97 ? (i = fe, G++) : (i = r, q === 0 && X(pe)), i === r ? (G = t, t = r) : (K = t, n = me(), t = n));
				}
				return t;
			}
			function mr() {
				var e = G, t = yr();
				return t !== r && (K = e, t = he(t)), e = t, e === r && (e = Er(), e === r && (e = wr())), e;
			}
			function hr() {
				for (var e = G, t = [], n = Z(); n !== r;) t.push(n), n = Z();
				return t === r ? (G = e, e = r) : (n = wr(), n === r ? (G = e, e = r) : (K = e, t = d(n), e = t)), e;
			}
			function gr() {
				var e = _r(), t;
				return e === r && (e = G, t = yr(), t !== r && (K = e, t = ge(t)), e = t, e === r && (e = G, t = Er(), t !== r && (K = e, t = _e(t)), e = t, e === r && (e = G, t = vr(), t !== r && (K = e, t = d(t)), e = t, e === r && (e = G, t = wr(), t !== r && (K = e, t = ve(t)), e = t)))), e;
			}
			function _r() {
				var e = xr();
				return e === r && (e = br(), e === r && (e = Sr())), e;
			}
			function vr() {
				for (var t = G, n = [], i = Z(), a, o, s; i !== r;) n.push(i), i = Z();
				if (n !== r) if (e.charCodeAt(G) === 91 ? (i = ye, G++) : (i = r, q === 0 && X(be)), i !== r) if (a = dr(), a !== r) {
					for (o = [], s = Z(); s !== r;) o.push(s), s = Z();
					o === r ? (G = t, t = r) : (e.charCodeAt(G) === 93 ? (s = xe, G++) : (s = r, q === 0 && X(Se)), s === r ? (G = t, t = r) : (K = t, n = d(a), t = n));
				} else G = t, t = r;
				else G = t, t = r;
				else G = t, t = r;
				return t;
			}
			function yr() {
				for (var t = G, n = [], i = Z(), a, o, s; i !== r;) n.push(i), i = Z();
				if (n !== r) if (e.charCodeAt(G) === 40 ? (i = Ce, G++) : (i = r, q === 0 && X(we)), i !== r) {
					for (a = [], o = gr(); o !== r;) a.push(o), o = gr();
					if (a !== r) {
						for (o = [], s = Z(); s !== r;) o.push(s), s = Z();
						o === r ? (G = t, t = r) : (e.charCodeAt(G) === 41 ? (s = Te, G++) : (s = r, q === 0 && X(Ee)), s === r ? (G = t, t = r) : (K = t, n = De(a), t = n));
					} else G = t, t = r;
				} else G = t, t = r;
				else G = t, t = r;
				return t;
			}
			function br() {
				for (var e = G, t = [], n = Z(); n !== r;) t.push(n), n = Z();
				return t === r ? (G = e, e = r) : (n = Fr(), n === r && (n = Pr(), n === r && (n = Nr())), n === r ? (G = e, e = r) : (K = e, t = d(n), e = t)), e;
			}
			function xr() {
				for (var t = G, n = [], i = Z(), a, o, s, c; i !== r;) n.push(i), i = Z();
				if (n !== r) if (i = Cr(), i !== r) {
					for (a = [], o = Z(); o !== r;) a.push(o), o = Z();
					a === r ? (G = t, t = r) : (o = Mr(), o === r ? (G = t, t = r) : (K = t, n = H(i, o), t = n));
				} else G = t, t = r;
				else G = t, t = r;
				if (t === r) {
					for (t = G, n = [], i = Z(); i !== r;) n.push(i), i = Z();
					if (n !== r) if (i = Cr(), i !== r) {
						for (a = [], o = Z(); o !== r;) a.push(o), o = Z();
						if (a !== r) if (e.substr(G, 2) === U ? (o = U, G += 2) : (o = r, q === 0 && X(Oe)), o !== r) {
							for (s = [], c = Z(); c !== r;) s.push(c), c = Z();
							s === r ? (G = t, t = r) : (c = wr(), c === r ? (G = t, t = r) : (K = t, n = ke(i, c), t = n));
						} else G = t, t = r;
						else G = t, t = r;
					} else G = t, t = r;
					else G = t, t = r;
					if (t === r) {
						for (t = G, n = [], i = Z(); i !== r;) n.push(i), i = Z();
						n === r ? (G = t, t = r) : (i = Cr(), i === r ? (G = t, t = r) : (K = t, n = d(i), t = n));
					}
				}
				return t;
			}
			function Sr() {
				for (var t = G, n = [], i = Z(); i !== r;) n.push(i), i = Z();
				if (n === r ? (G = t, t = r) : (e.substr(G, 4) === Ae ? (i = Ae, G += 4) : (i = r, q === 0 && X(je)), i === r ? (G = t, t = r) : (K = t, n = Me(), t = n)), t === r) {
					for (t = G, n = [], i = Z(); i !== r;) n.push(i), i = Z();
					n === r ? (G = t, t = r) : (e.substr(G, 5) === Ne ? (i = Ne, G += 5) : (i = r, q === 0 && X(Pe)), i === r ? (G = t, t = r) : (K = t, n = Fe(), t = n));
				}
				return t;
			}
			function Cr() {
				for (var e = G, t = [], n = Z(); n !== r;) t.push(n), n = Z();
				return t === r ? (G = e, e = r) : (n = zr(), n === r && (n = Br(), n === r && (n = Rr(), n === r && (n = Lr()))), n === r ? (G = e, e = r) : (K = e, t = d(n), e = t)), e;
			}
			function wr() {
				for (var e = G, t = [], n = Z(); n !== r;) t.push(n), n = Z();
				if (t === r ? (G = e, e = r) : (n = Dr(), n === r ? (G = e, e = r) : (K = e, t = d(n), e = t)), e === r) {
					for (e = G, t = [], n = Z(); n !== r;) t.push(n), n = Z();
					t === r ? (G = e, e = r) : (n = Tr(), n === r ? (G = e, e = r) : (K = e, t = d(n), e = t));
				}
				return e;
			}
			function Tr() {
				var e = Ar(), t;
				return e === r && (e = G, t = Or(), t !== r && (K = e, t = Ie(t)), e = t), e;
			}
			function Er() {
				for (var e = G, t = [], n = Z(); n !== r;) t.push(n), n = Z();
				if (t === r ? (G = e, e = r) : (n = jr(), n === r ? (G = e, e = r) : (K = e, t = d(n), e = t)), e === r) {
					for (e = G, t = [], n = Z(); n !== r;) t.push(n), n = Z();
					t === r ? (G = e, e = r) : (n = Wr(), n === r ? (G = e, e = r) : (K = e, t = d(n), e = t));
				}
				return e;
			}
			function Dr() {
				var t = G, n, i, a;
				if (e.charCodeAt(G) === 60 ? (n = Le, G++) : (n = r, q === 0 && X(Re)), n !== r) {
					for (i = [], ze.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(Be)), a === r && (a = Vr()); a !== r;) i.push(a), ze.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(Be)), a === r && (a = Vr());
					i === r ? (G = t, t = r) : (e.charCodeAt(G) === 62 ? (a = Ve, G++) : (a = r, q === 0 && X(He)), a === r ? (G = t, t = r) : (K = t, n = Ue(i), t = n));
				} else G = t, t = r;
				return t;
			}
			function Or() {
				var t = G, n = Jr(), i;
				return n === r && (n = null), n === r ? (G = t, t = r) : (e.charCodeAt(G) === 58 ? (i = We, G++) : (i = r, q === 0 && X(Ge)), i === r ? (G = t, t = r) : (K = t, n = Ke(n), t = n)), t;
			}
			function kr() {
				var t = G, n = Jr(), i;
				return n === r && (n = null), n === r ? (G = t, t = r) : (e.charCodeAt(G) === 58 ? (i = We, G++) : (i = r, q === 0 && X(Ge)), i === r ? (G = t, t = r) : (K = t, n = qe(n), t = n)), t;
			}
			function Ar() {
				var e = G, t = Or(), n;
				return t === r ? (G = e, e = r) : (n = Yr(), n === r ? (G = e, e = r) : (K = e, t = Je(t, n), e = t)), e;
			}
			function jr() {
				var t = G, n = G, i, a, o, s, c, d, f, p;
				if (e.substr(G, 2) === Ye ? (i = Ye, G += 2) : (i = r, q === 0 && X(Xe)), i !== r) if (a = Kr(), a === r && (Ze.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(Qe))), a !== r) {
					for (o = [], s = qr(); s !== r;) o.push(s), s = qr();
					if (o !== r) {
						if (s = [], c = G, d = [], e.charCodeAt(G) === 46 ? (f = l, G++) : (f = r, q === 0 && X(u)), f !== r) for (; f !== r;) d.push(f), e.charCodeAt(G) === 46 ? (f = l, G++) : (f = r, q === 0 && X(u));
						else d = r;
						if (d !== r) {
							if (f = [], p = qr(), p !== r) for (; p !== r;) f.push(p), p = qr();
							else f = r;
							f === r ? (G = c, c = r) : (d = [d, f], c = d);
						} else G = c, c = r;
						for (; c !== r;) {
							if (s.push(c), c = G, d = [], e.charCodeAt(G) === 46 ? (f = l, G++) : (f = r, q === 0 && X(u)), f !== r) for (; f !== r;) d.push(f), e.charCodeAt(G) === 46 ? (f = l, G++) : (f = r, q === 0 && X(u));
							else d = r;
							if (d !== r) {
								if (f = [], p = qr(), p !== r) for (; p !== r;) f.push(p), p = qr();
								else f = r;
								f === r ? (G = c, c = r) : (d = [d, f], c = d);
							} else G = c, c = r;
						}
						s === r ? (G = n, n = r) : (i = [
							i,
							a,
							o,
							s
						], n = i);
					} else G = n, n = r;
				} else G = n, n = r;
				else G = n, n = r;
				return t = n === r ? n : e.substring(t, G), t;
			}
			function Mr() {
				var t = G, n, i, a, o, s, c, l;
				if (e.charCodeAt(G) === 64 ? (n = $e, G++) : (n = r, q === 0 && X(et)), n !== r) {
					if (i = [], tt.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(nt)), a !== r) for (; a !== r;) i.push(a), tt.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(nt));
					else i = r;
					if (i !== r) {
						if (a = [], o = G, e.charCodeAt(G) === 45 ? (s = rt, G++) : (s = r, q === 0 && X(it)), s !== r) {
							if (c = [], at.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(ot)), l !== r) for (; l !== r;) c.push(l), at.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(ot));
							else c = r;
							c === r ? (G = o, o = r) : (K = o, s = st(i, c), o = s);
						} else G = o, o = r;
						for (; o !== r;) if (a.push(o), o = G, e.charCodeAt(G) === 45 ? (s = rt, G++) : (s = r, q === 0 && X(it)), s !== r) {
							if (c = [], at.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(ot)), l !== r) for (; l !== r;) c.push(l), at.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(ot));
							else c = r;
							c === r ? (G = o, o = r) : (K = o, s = st(i, c), o = s);
						} else G = o, o = r;
						a === r ? (G = t, t = r) : (K = t, n = ct(i, a), t = n);
					} else G = t, t = r;
				} else G = t, t = r;
				return t;
			}
			function Nr() {
				var t = G, n = G, i = G, a, o, s;
				if (lt.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(ut)), a === r && (a = null), a !== r) {
					if (o = [], Ze.test(e.charAt(G)) ? (s = e.charAt(G), G++) : (s = r, q === 0 && X(Qe)), s !== r) for (; s !== r;) o.push(s), Ze.test(e.charAt(G)) ? (s = e.charAt(G), G++) : (s = r, q === 0 && X(Qe));
					else o = r;
					o === r ? (G = i, i = r) : (a = [a, o], i = a);
				} else G = i, i = r;
				return n = i === r ? i : e.substring(n, G), n !== r && (K = t, n = dt(n)), t = n, t;
			}
			function Pr() {
				var t = G, n = G, i = G, a, o, s, c, d;
				if (lt.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(ut)), a === r && (a = null), a !== r) {
					for (o = [], Ze.test(e.charAt(G)) ? (s = e.charAt(G), G++) : (s = r, q === 0 && X(Qe)); s !== r;) o.push(s), Ze.test(e.charAt(G)) ? (s = e.charAt(G), G++) : (s = r, q === 0 && X(Qe));
					if (o !== r) if (e.charCodeAt(G) === 46 ? (s = l, G++) : (s = r, q === 0 && X(u)), s !== r) {
						if (c = [], Ze.test(e.charAt(G)) ? (d = e.charAt(G), G++) : (d = r, q === 0 && X(Qe)), d !== r) for (; d !== r;) c.push(d), Ze.test(e.charAt(G)) ? (d = e.charAt(G), G++) : (d = r, q === 0 && X(Qe));
						else c = r;
						c === r ? (G = i, i = r) : (a = [
							a,
							o,
							s,
							c
						], i = a);
					} else G = i, i = r;
					else G = i, i = r;
				} else G = i, i = r;
				return n = i === r ? i : e.substring(n, G), n !== r && (K = t, n = ft(n)), t = n, t;
			}
			function Fr() {
				var t = G, n = G, i = G, a, o, s, c, d, f;
				if (lt.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(ut)), a === r && (a = null), a !== r) {
					if (o = G, s = [], Ze.test(e.charAt(G)) ? (c = e.charAt(G), G++) : (c = r, q === 0 && X(Qe)), c !== r) for (; c !== r;) s.push(c), Ze.test(e.charAt(G)) ? (c = e.charAt(G), G++) : (c = r, q === 0 && X(Qe));
					else s = r;
					if (s !== r) if (e.charCodeAt(G) === 46 ? (c = l, G++) : (c = r, q === 0 && X(u)), c !== r) {
						for (d = [], Ze.test(e.charAt(G)) ? (f = e.charAt(G), G++) : (f = r, q === 0 && X(Qe)); f !== r;) d.push(f), Ze.test(e.charAt(G)) ? (f = e.charAt(G), G++) : (f = r, q === 0 && X(Qe));
						d === r ? (G = o, o = r) : (f = Ir(), f === r ? (G = o, o = r) : (s = [
							s,
							c,
							d,
							f
						], o = s));
					} else G = o, o = r;
					else G = o, o = r;
					if (o === r) {
						if (o = G, e.charCodeAt(G) === 46 ? (s = l, G++) : (s = r, q === 0 && X(u)), s !== r) {
							if (c = [], Ze.test(e.charAt(G)) ? (d = e.charAt(G), G++) : (d = r, q === 0 && X(Qe)), d !== r) for (; d !== r;) c.push(d), Ze.test(e.charAt(G)) ? (d = e.charAt(G), G++) : (d = r, q === 0 && X(Qe));
							else c = r;
							c === r ? (G = o, o = r) : (d = Ir(), d === r ? (G = o, o = r) : (s = [
								s,
								c,
								d
							], o = s));
						} else G = o, o = r;
						if (o === r) {
							if (o = G, s = [], Ze.test(e.charAt(G)) ? (c = e.charAt(G), G++) : (c = r, q === 0 && X(Qe)), c !== r) for (; c !== r;) s.push(c), Ze.test(e.charAt(G)) ? (c = e.charAt(G), G++) : (c = r, q === 0 && X(Qe));
							else s = r;
							s === r ? (G = o, o = r) : (c = Ir(), c === r ? (G = o, o = r) : (s = [s, c], o = s));
						}
					}
					o === r ? (G = i, i = r) : (a = [a, o], i = a);
				} else G = i, i = r;
				return n = i === r ? i : e.substring(n, G), n !== r && (K = t, n = pt(n)), t = n, t;
			}
			function Ir() {
				var t = G, n = G, i, a, o, s;
				if (mt.test(e.charAt(G)) ? (i = e.charAt(G), G++) : (i = r, q === 0 && X(ht)), i !== r) if (lt.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(ut)), a === r && (a = null), a !== r) {
					if (o = [], Ze.test(e.charAt(G)) ? (s = e.charAt(G), G++) : (s = r, q === 0 && X(Qe)), s !== r) for (; s !== r;) o.push(s), Ze.test(e.charAt(G)) ? (s = e.charAt(G), G++) : (s = r, q === 0 && X(Qe));
					else o = r;
					o === r ? (G = n, n = r) : (i = [
						i,
						a,
						o
					], n = i);
				} else G = n, n = r;
				else G = n, n = r;
				return t = n === r ? n : e.substring(t, G), t;
			}
			function Lr() {
				var t = G, n, i, a;
				if (e.charCodeAt(G) === 34 ? (n = gt, G++) : (n = r, q === 0 && X(_t)), n !== r) {
					for (i = [], vt.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(yt)), a === r && (a = Hr(), a === r && (a = Vr())); a !== r;) i.push(a), vt.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(yt)), a === r && (a = Hr(), a === r && (a = Vr()));
					i === r ? (G = t, t = r) : (e.charCodeAt(G) === 34 ? (a = gt, G++) : (a = r, q === 0 && X(_t)), a === r ? (G = t, t = r) : (K = t, n = v(i), t = n));
				} else G = t, t = r;
				return t;
			}
			function Rr() {
				var t = G, n, i, a;
				if (e.charCodeAt(G) === 39 ? (n = bt, G++) : (n = r, q === 0 && X(xt)), n !== r) {
					for (i = [], St.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(Ct)), a === r && (a = Hr(), a === r && (a = Vr())); a !== r;) i.push(a), St.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(Ct)), a === r && (a = Hr(), a === r && (a = Vr()));
					i === r ? (G = t, t = r) : (e.charCodeAt(G) === 39 ? (a = bt, G++) : (a = r, q === 0 && X(xt)), a === r ? (G = t, t = r) : (K = t, n = v(i), t = n));
				} else G = t, t = r;
				return t;
			}
			function zr() {
				var t = G, n, i, a, o, s, c, l;
				if (e.substr(G, 3) === wt ? (n = wt, G += 3) : (n = r, q === 0 && X(Tt)), n !== r) {
					for (i = [], Et.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(Dt)), a === r && (a = Hr(), a === r && (a = Vr())); a !== r;) i.push(a), Et.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(Dt)), a === r && (a = Hr(), a === r && (a = Vr()));
					if (i !== r) {
						if (a = [], o = G, e.substr(G, 2) === Ot ? (s = Ot, G += 2) : (s = r, q === 0 && X(kt)), s !== r) {
							if (c = [], Et.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(Dt)), l === r && (l = Hr(), l === r && (l = Vr())), l !== r) for (; l !== r;) c.push(l), Et.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(Dt)), l === r && (l = Hr(), l === r && (l = Vr()));
							else c = r;
							c === r ? (G = o, o = r) : (K = o, s = At(i, c), o = s);
						} else G = o, o = r;
						if (o === r) if (o = G, e.charCodeAt(G) === 39 ? (s = bt, G++) : (s = r, q === 0 && X(xt)), s !== r) {
							if (c = [], Et.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(Dt)), l === r && (l = Hr(), l === r && (l = Vr())), l !== r) for (; l !== r;) c.push(l), Et.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(Dt)), l === r && (l = Hr(), l === r && (l = Vr()));
							else c = r;
							c === r ? (G = o, o = r) : (K = o, s = jt(i, c), o = s);
						} else G = o, o = r;
						for (; o !== r;) {
							if (a.push(o), o = G, e.substr(G, 2) === Ot ? (s = Ot, G += 2) : (s = r, q === 0 && X(kt)), s !== r) {
								if (c = [], Et.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(Dt)), l === r && (l = Hr(), l === r && (l = Vr())), l !== r) for (; l !== r;) c.push(l), Et.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(Dt)), l === r && (l = Hr(), l === r && (l = Vr()));
								else c = r;
								c === r ? (G = o, o = r) : (K = o, s = At(i, c), o = s);
							} else G = o, o = r;
							if (o === r) if (o = G, e.charCodeAt(G) === 39 ? (s = bt, G++) : (s = r, q === 0 && X(xt)), s !== r) {
								if (c = [], Et.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(Dt)), l === r && (l = Hr(), l === r && (l = Vr())), l !== r) for (; l !== r;) c.push(l), Et.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(Dt)), l === r && (l = Hr(), l === r && (l = Vr()));
								else c = r;
								c === r ? (G = o, o = r) : (K = o, s = jt(i, c), o = s);
							} else G = o, o = r;
						}
						a === r ? (G = t, t = r) : (e.substr(G, 3) === wt ? (o = wt, G += 3) : (o = r, q === 0 && X(Tt)), o === r ? (G = t, t = r) : (K = t, n = Mt(i, a), t = n));
					} else G = t, t = r;
				} else G = t, t = r;
				return t;
			}
			function Br() {
				var t = G, n, i, a, o, s, c, l;
				if (e.substr(G, 3) === Nt ? (n = Nt, G += 3) : (n = r, q === 0 && X(Pt)), n !== r) {
					for (i = [], Ft.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(It)), a === r && (a = Hr(), a === r && (a = Vr())); a !== r;) i.push(a), Ft.test(e.charAt(G)) ? (a = e.charAt(G), G++) : (a = r, q === 0 && X(It)), a === r && (a = Hr(), a === r && (a = Vr()));
					if (i !== r) {
						if (a = [], o = G, e.substr(G, 2) === Lt ? (s = Lt, G += 2) : (s = r, q === 0 && X(Rt)), s !== r) {
							if (c = [], Ft.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(It)), l === r && (l = Hr(), l === r && (l = Vr())), l !== r) for (; l !== r;) c.push(l), Ft.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(It)), l === r && (l = Hr(), l === r && (l = Vr()));
							else c = r;
							c === r ? (G = o, o = r) : (K = o, s = zt(i, c), o = s);
						} else G = o, o = r;
						if (o === r) if (o = G, e.charCodeAt(G) === 34 ? (s = gt, G++) : (s = r, q === 0 && X(_t)), s !== r) {
							if (c = [], Ft.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(It)), l === r && (l = Hr(), l === r && (l = Vr())), l !== r) for (; l !== r;) c.push(l), Ft.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(It)), l === r && (l = Hr(), l === r && (l = Vr()));
							else c = r;
							c === r ? (G = o, o = r) : (K = o, s = Bt(i, c), o = s);
						} else G = o, o = r;
						for (; o !== r;) {
							if (a.push(o), o = G, e.substr(G, 2) === Lt ? (s = Lt, G += 2) : (s = r, q === 0 && X(Rt)), s !== r) {
								if (c = [], Ft.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(It)), l === r && (l = Hr(), l === r && (l = Vr())), l !== r) for (; l !== r;) c.push(l), Ft.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(It)), l === r && (l = Hr(), l === r && (l = Vr()));
								else c = r;
								c === r ? (G = o, o = r) : (K = o, s = zt(i, c), o = s);
							} else G = o, o = r;
							if (o === r) if (o = G, e.charCodeAt(G) === 34 ? (s = gt, G++) : (s = r, q === 0 && X(_t)), s !== r) {
								if (c = [], Ft.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(It)), l === r && (l = Hr(), l === r && (l = Vr())), l !== r) for (; l !== r;) c.push(l), Ft.test(e.charAt(G)) ? (l = e.charAt(G), G++) : (l = r, q === 0 && X(It)), l === r && (l = Hr(), l === r && (l = Vr()));
								else c = r;
								c === r ? (G = o, o = r) : (K = o, s = Bt(i, c), o = s);
							} else G = o, o = r;
						}
						a === r ? (G = t, t = r) : (e.substr(G, 3) === Nt ? (o = Nt, G += 3) : (o = r, q === 0 && X(Pt)), o === r ? (G = t, t = r) : (K = t, n = Mt(i, a), t = n));
					} else G = t, t = r;
				} else G = t, t = r;
				return t;
			}
			function Vr() {
				var t = G, n, i, a, o, s, c, l, u, d, f;
				return e.substr(G, 2) === Vt ? (n = Vt, G += 2) : (n = r, q === 0 && X(Ht)), n === r ? (G = t, t = r) : (i = G, a = Qr(), a === r ? (G = i, i = r) : (o = Qr(), o === r ? (G = i, i = r) : (s = Qr(), s === r ? (G = i, i = r) : (c = Qr(), c === r ? (G = i, i = r) : (l = Qr(), l === r ? (G = i, i = r) : (u = Qr(), u === r ? (G = i, i = r) : (d = Qr(), d === r ? (G = i, i = r) : (f = Qr(), f === r ? (G = i, i = r) : (a = [
					a,
					o,
					s,
					c,
					l,
					u,
					d,
					f
				], i = a)))))))), i === r ? (G = t, t = r) : (K = t, n = Ut(i), t = n)), t === r && (t = G, e.substr(G, 2) === Wt ? (n = Wt, G += 2) : (n = r, q === 0 && X(Gt)), n === r ? (G = t, t = r) : (i = G, a = Qr(), a === r ? (G = i, i = r) : (o = Qr(), o === r ? (G = i, i = r) : (s = Qr(), s === r ? (G = i, i = r) : (c = Qr(), c === r ? (G = i, i = r) : (a = [
					a,
					o,
					s,
					c
				], i = a)))), i === r ? (G = t, t = r) : (K = t, n = Kt(i), t = n))), t;
			}
			function Hr() {
				var t = G, n;
				return e.substr(G, 2) === qt ? (n = qt, G += 2) : (n = r, q === 0 && X(Jt)), n !== r && (K = t, n = Yt()), t = n, t === r && (t = G, e.substr(G, 2) === Xt ? (n = Xt, G += 2) : (n = r, q === 0 && X(Zt)), n !== r && (K = t, n = Qt()), t = n, t === r && (t = G, e.substr(G, 2) === $t ? (n = $t, G += 2) : (n = r, q === 0 && X(en)), n !== r && (K = t, n = tn()), t = n, t === r && (t = G, e.substr(G, 2) === nn ? (n = nn, G += 2) : (n = r, q === 0 && X(rn)), n !== r && (K = t, n = an()), t = n, t === r && (t = G, e.substr(G, 2) === on ? (n = on, G += 2) : (n = r, q === 0 && X(sn)), n !== r && (K = t, n = cn()), t = n, t === r && (t = G, e.substr(G, 2) === W ? (n = W, G += 2) : (n = r, q === 0 && X(ln)), n !== r && (K = t, n = un()), t = n, t === r && (t = G, e.substr(G, 2) === dn ? (n = dn, G += 2) : (n = r, q === 0 && X(fn)), n !== r && (K = t, n = pn()), t = n, t === r && (t = G, e.substr(G, 2) === mn ? (n = mn, G += 2) : (n = r, q === 0 && X(hn)), n !== r && (K = t, n = gn()), t = n))))))), t;
			}
			function Ur() {
				var t;
				return _n.test(e.charAt(G)) ? (t = e.charAt(G), G++) : (t = r, q === 0 && X(vn)), t;
			}
			function Wr() {
				var t = G, n, i, a;
				if (e.charCodeAt(G) === 91 ? (n = ye, G++) : (n = r, q === 0 && X(be)), n !== r) {
					for (i = [], a = Z(); a !== r;) i.push(a), a = Z();
					i === r ? (G = t, t = r) : (e.charCodeAt(G) === 93 ? (a = xe, G++) : (a = r, q === 0 && X(Se)), a === r ? (G = t, t = r) : (K = t, n = yn(), t = n));
				} else G = t, t = r;
				return t;
			}
			function Gr() {
				var t = G, n, i;
				return bn.test(e.charAt(G)) ? (n = e.charAt(G), G++) : (n = r, q === 0 && X(xn)), n === r ? (G = t, t = r) : (Sn.test(e.charAt(G)) ? (i = e.charAt(G), G++) : (i = r, q === 0 && X(Cn)), i === r ? (G = t, t = r) : (K = t, n = wn(n, i), t = n)), t === r && (Tn.test(e.charAt(G)) ? (t = e.charAt(G), G++) : (t = r, q === 0 && X(En))), t;
			}
			function Kr() {
				var t = Gr();
				return t === r && (e.charCodeAt(G) === 95 ? (t = Dn, G++) : (t = r, q === 0 && X(On))), t;
			}
			function qr() {
				var t = Kr();
				return t === r && (e.charCodeAt(G) === 45 ? (t = rt, G++) : (t = r, q === 0 && X(it)), t === r && (Ze.test(e.charAt(G)) ? (t = e.charAt(G), G++) : (t = r, q === 0 && X(Qe)), t === r && (e.charCodeAt(G) === 183 ? (t = kn, G++) : (t = r, q === 0 && X(An)), t === r && (jn.test(e.charAt(G)) ? (t = e.charAt(G), G++) : (t = r, q === 0 && X(Mn)), t === r && (Nn.test(e.charAt(G)) ? (t = e.charAt(G), G++) : (t = r, q === 0 && X(Pn))))))), t;
			}
			function Jr() {
				var t = G, n = G, i = Gr(), a, o, s, c, d, f;
				if (i !== r) {
					for (a = [], o = qr(); o !== r;) a.push(o), o = qr();
					if (a !== r) {
						if (o = [], s = G, c = [], e.charCodeAt(G) === 46 ? (d = l, G++) : (d = r, q === 0 && X(u)), d !== r) for (; d !== r;) c.push(d), e.charCodeAt(G) === 46 ? (d = l, G++) : (d = r, q === 0 && X(u));
						else c = r;
						if (c !== r) {
							if (d = [], f = qr(), f !== r) for (; f !== r;) d.push(f), f = qr();
							else d = r;
							d === r ? (G = s, s = r) : (c = [c, d], s = c);
						} else G = s, s = r;
						for (; s !== r;) {
							if (o.push(s), s = G, c = [], e.charCodeAt(G) === 46 ? (d = l, G++) : (d = r, q === 0 && X(u)), d !== r) for (; d !== r;) c.push(d), e.charCodeAt(G) === 46 ? (d = l, G++) : (d = r, q === 0 && X(u));
							else c = r;
							if (c !== r) {
								if (d = [], f = qr(), f !== r) for (; f !== r;) d.push(f), f = qr();
								else d = r;
								d === r ? (G = s, s = r) : (c = [c, d], s = c);
							} else G = s, s = r;
						}
						o === r ? (G = n, n = r) : (i = [
							i,
							a,
							o
						], n = i);
					} else G = n, n = r;
				} else G = n, n = r;
				return t = n === r ? n : e.substring(t, G), t;
			}
			function Yr() {
				var t = G, n = Kr(), i, a, o, s, c, d;
				if (n === r && (e.charCodeAt(G) === 58 ? (n = We, G++) : (n = r, q === 0 && X(Ge)), n === r && (Ze.test(e.charAt(G)) ? (n = e.charAt(G), G++) : (n = r, q === 0 && X(Qe)), n === r && (n = Xr()))), n !== r) {
					for (i = [], a = qr(), a === r && (e.charCodeAt(G) === 58 ? (a = We, G++) : (a = r, q === 0 && X(Ge)), a === r && (a = Xr())); a !== r;) i.push(a), a = qr(), a === r && (e.charCodeAt(G) === 58 ? (a = We, G++) : (a = r, q === 0 && X(Ge)), a === r && (a = Xr()));
					if (i !== r) {
						if (a = [], o = G, s = [], e.charCodeAt(G) === 46 ? (c = l, G++) : (c = r, q === 0 && X(u)), c !== r) for (; c !== r;) s.push(c), e.charCodeAt(G) === 46 ? (c = l, G++) : (c = r, q === 0 && X(u));
						else s = r;
						if (s !== r) {
							if (c = [], d = qr(), d === r && (e.charCodeAt(G) === 58 ? (d = We, G++) : (d = r, q === 0 && X(Ge)), d === r && (d = Xr())), d !== r) for (; d !== r;) c.push(d), d = qr(), d === r && (e.charCodeAt(G) === 58 ? (d = We, G++) : (d = r, q === 0 && X(Ge)), d === r && (d = Xr()));
							else c = r;
							c === r ? (G = o, o = r) : (K = o, s = Fn(n, i, s, c), o = s);
						} else G = o, o = r;
						for (; o !== r;) {
							if (a.push(o), o = G, s = [], e.charCodeAt(G) === 46 ? (c = l, G++) : (c = r, q === 0 && X(u)), c !== r) for (; c !== r;) s.push(c), e.charCodeAt(G) === 46 ? (c = l, G++) : (c = r, q === 0 && X(u));
							else s = r;
							if (s !== r) {
								if (c = [], d = qr(), d === r && (e.charCodeAt(G) === 58 ? (d = We, G++) : (d = r, q === 0 && X(Ge)), d === r && (d = Xr())), d !== r) for (; d !== r;) c.push(d), d = qr(), d === r && (e.charCodeAt(G) === 58 ? (d = We, G++) : (d = r, q === 0 && X(Ge)), d === r && (d = Xr()));
								else c = r;
								c === r ? (G = o, o = r) : (K = o, s = Fn(n, i, s, c), o = s);
							} else G = o, o = r;
						}
						a === r ? (G = t, t = r) : (K = t, n = In(n, i, a), t = n);
					} else G = t, t = r;
				} else G = t, t = r;
				return t;
			}
			function Xr() {
				var e = Zr();
				return e === r && (e = $r()), e;
			}
			function Zr() {
				var t = G, n = G, i, a, o;
				return e.charCodeAt(G) === 37 ? (i = Ln, G++) : (i = r, q === 0 && X(Rn)), i === r ? (G = n, n = r) : (a = Qr(), a === r ? (G = n, n = r) : (o = Qr(), o === r ? (G = n, n = r) : (i = [
					i,
					a,
					o
				], n = i))), t = n === r ? n : e.substring(t, G), t;
			}
			function Qr() {
				var t;
				return zn.test(e.charAt(G)) ? (t = e.charAt(G), G++) : (t = r, q === 0 && X(Bn)), t;
			}
			function $r() {
				var t = G, n, i;
				return e.charCodeAt(G) === 92 ? (n = Vn, G++) : (n = r, q === 0 && X(Hn)), n === r ? (G = t, t = r) : (Un.test(e.charAt(G)) ? (i = e.charAt(G), G++) : (i = r, q === 0 && X(Wn)), i === r ? (G = t, t = r) : (K = t, n = d(i), t = n)), t;
			}
			var ei = function(e) {
				return e.match(/^[a-z](.*?):(.+?)/g);
			};
			function ti(e, t) {
				var n = {};
				return n[e] = t, n;
			}
			var Q = {
				base: [],
				data: {},
				addBase: function(e) {
					if (Q.base.length === 0) {
						Q.base.push(e);
						return;
					}
					let t = Q.base[Q.base.length - 1];
					t !== e && Q.base.push(new URL(e, t).toString());
				},
				addPrefix: function(e, t) {
					let n = Q.data[e];
					n === void 0 ? Q.data[e] = [{
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
					let r = Object.keys(Q.data).find((t) => e.indexOf(t + ":") === 0);
					if (r !== void 0) {
						let n = Q.data[r];
						if (n.length === 1 && t !== !0 && ei(n[0].uri)) return e;
						let i = n[n.length - 1].uri;
						return e.replace(r + ":", i);
					} else {
						var i = Q.base.length === 0 ? n.baseIRI : Q.base[Q.base.length - 1];
						return !i || e.match(/^(http:|https:|urn:|file:)/) ? e : e.indexOf("//") === 0 && i ? i.split("//")[0] + e : new URL(e, i).toString();
					}
				},
				increment: function(e) {
					let t = Q.data[e];
					t !== void 0 && t[t.length - 1].count++;
				},
				decrement: function(e) {
					let t = Q.data[e];
					t !== void 0 && t[t.length - 1].count--;
				},
				toJSON: function() {
					let e = {};
					return Q.base.length > 0 && (e["@context"] === void 0 && (e["@context"] = {}), e["@context"]["@base"] = Q.base[0]), Object.keys(Q.data).forEach((t) => {
						let n = Q.data[t][0];
						n.uri === "http://www.w3.org/2001/XMLSchema#" && n.count < 1 || ei(n.uri) && (e["@context"] === void 0 && (e["@context"] = {}), e["@context"][t] = n.uri);
					}), e;
				}
			};
			function ni(e, t) {
				if (e["@list"] === void 0 || !t && !e["@list"].find((e) => e["@list"] !== void 0)) return e;
				if (e["@list"].length === 0) return { "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil" };
				var n = {}, r = null;
				return e["@list"].forEach((e) => {
					r === null ? r = n : (r["http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"] = {}, r = r["http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"]), r["http://www.w3.org/1999/02/22-rdf-syntax-ns#first"] = ni(e, !0), r["http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"] = { "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil" };
				}), n;
			}
			if (Jn = a(), Jn !== r && G === e.length) return Jn;
			throw Jn !== r && G < e.length && X(Xn()), er(qn, Kn < e.length ? e.charAt(Kn) : null, Kn < e.length ? Qn(Kn, Kn + 1) : Qn(Kn, Kn));
		}
		return {
			SyntaxError: t,
			parse: n
		};
	});
})), ke = /* @__PURE__ */ n(((e) => {
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
})), Ae = /* @__PURE__ */ n(((e) => {
	var t = ke();
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
	function f(e, t) {
		this.message = e, this.locator = t, Error.captureStackTrace && Error.captureStackTrace(this, f);
	}
	n(f), e.DOMException = s, e.DOMExceptionName = r, e.ExceptionCode = c, e.ParseError = f;
})), je = /* @__PURE__ */ n(((e) => {
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
		}).join(""), n ? "mu" : "m");
	}
	function o(e) {
		if (arguments.length === 0) throw Error("no parameters provided");
		return a.apply(o, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
	}
	var s = "�", c = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
	n && (c = a("[", r(c), "\\u{10000}-\\u{10FFFF}", "]"));
	var l = RegExp("[^" + r(c) + "]", n ? "u" : ""), u = /[\x20\x09\x0D\x0A]/, d = r(u), f = a(u, "+"), p = a(u, "*"), m = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
	n && (m = a("[", r(m), "\\u{10000}-\\u{10FFFF}", "]"));
	var h = a("[", r(m), r(/[-.0-9\xB7]/), r(/[\u0300-\u036F\u203F-\u2040]/), "]"), g = a(m, h, "*"), _ = a(h, "+"), v = o(a("&", g, ";"), "|", o(/&#[0-9]+;|&#x[0-9a-fA-F]+;/)), y = a("%", g, ";"), b = o(a("\"", o(/[^%&"]/, "|", y, "|", v), "*", "\""), "|", a("'", o(/[^%&']/, "|", y, "|", v), "*", "'")), x = o("\"", o(/[^<&"]/, "|", v), "*", "\"", "|", "'", o(/[^<&']/, "|", v), "*", "'"), S = a(i(m, ":"), i(h, ":"), "*"), C = a(S, o(":", S), "?"), w = a("^", C, "$"), T = a("(", C, ")"), E = o(/"[^"]*"|'[^']*'/), D = a(/^<\?/, "(", g, ")", o(f, "(", c, "*?)"), "?", /\?>/), O = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, k = o("\"", O, "*\"", "|", "'", i(O, "'"), "*'"), ee = "<!--", A = "-->", j = a(ee, o(i(c, "-"), "|", a("-", i(c, "-"))), "*", A), te = "#PCDATA", ne = o("EMPTY", "|", "ANY", "|", o(a(/\(/, p, te, o(p, /\|/, p, C), "*", p, /\)\*/), "|", a(/\(/, p, te, p, /\)/)), "|", a(/\([^>]+\)/, /[?*+]?/)), re = a("<!ELEMENT", f, o(C, "|", y), f, o(ne, "|", y), p, ">"), ie = a("<!ATTLIST", f, g, o(f, g, f, o(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", o(a("NOTATION", f, /\(/, p, g, o(p, /\|/, p, g), "*", p, /\)/), "|", a(/\(/, p, _, o(p, /\|/, p, _), "*", p, /\)/))), f, o(/#REQUIRED|#IMPLIED/, "|", o(o("#FIXED", f), "?", x))), "*", p, ">"), M = "about:legacy-compat", N = o("\"" + M + "\"", "|", "'" + M + "'"), ae = "SYSTEM", P = "PUBLIC", F = o(o(ae, f, E), "|", o(P, f, k, f, E)), I = a("^", o(o(ae, f, "(?<SystemLiteralOnly>", E, ")"), "|", o(P, f, "(?<PubidLiteral>", k, ")", f, "(?<SystemLiteral>", E, ")"))), L = a("^", k, "$"), R = a("^", E, "$"), oe = o(b, "|", o(F, o(f, "NDATA", f, g), "?")), se = "<!ENTITY", z = o(a(se, f, g, f, oe, p, ">"), "|", a(se, f, "%", f, g, f, o(b, "|", F), p, ">")), B = a("<!NOTATION", f, g, f, o(F, "|", a(P, f, k)), p, ">"), V = a(p, "=", p), ce = /1[.]\d+/, le = a(f, "version", V, o("'", ce, "'", "|", "\"", ce, "\"")), ue = /[A-Za-z][-A-Za-z0-9._]*/, de = a(/^<\?xml/, le, o(f, "encoding", V, o("\"", ue, "\"", "|", "'", ue, "'")), "?", o(f, "standalone", V, o("'", o("yes", "|", "no"), "'", "|", "\"", o("yes", "|", "no"), "\"")), "?", p, /\?>/), fe = "<!DOCTYPE", pe = "<![CDATA[", me = "]]>", he = a(/<!\[CDATA\[/, a(c, "*?", /\]\]>/));
	e.chars = r, e.chars_without = i, e.detectUnicodeSupport = t, e.reg = a, e.regg = o, e.ABOUT_LEGACY_COMPAT = M, e.ABOUT_LEGACY_COMPAT_SystemLiteral = N, e.AttlistDecl = ie, e.CDATA_START = pe, e.CDATA_END = me, e.CDSect = he, e.Char = c, e.Comment = j, e.COMMENT_START = ee, e.COMMENT_END = A, e.DOCTYPE_DECL_START = fe, e.elementdecl = re, e.EntityDecl = z, e.EntityValue = b, e.ExternalID = F, e.ExternalID_match = I, e.Name = g, e.NotationDecl = B, e.Reference = v, e.PEReference = y, e.PI = D, e.PUBLIC = P, e.PubidLiteral = k, e.PubidLiteral_match = L, e.QName = C, e.QName_exact = w, e.QName_group = T, e.S = f, e.SChar_s = d, e.S_OPT = p, e.SYSTEM = ae, e.SystemLiteral = E, e.SystemLiteral_match = R, e.InvalidChar = l, e.UNICODE_REPLACEMENT_CHARACTER = s, e.UNICODE_SUPPORT = n, e.XMLDecl = de;
})), Me = /* @__PURE__ */ n(((e) => {
	var t = ke(), n = t.find, r = t.hasDefaultHTMLNamespace, i = t.hasOwn, a = t.isHTMLMimeType, o = t.isHTMLRawTextElement, s = t.isHTMLVoidElement, c = t.MIME_TYPE, l = t.NAMESPACE, u = Symbol(), d = Ae(), f = d.DOMException, p = d.DOMExceptionName, m = je();
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
	var T = {}, E = T.ELEMENT_NODE = 1, D = T.ATTRIBUTE_NODE = 2, O = T.TEXT_NODE = 3, k = T.CDATA_SECTION_NODE = 4, ee = T.ENTITY_REFERENCE_NODE = 5, A = T.ENTITY_NODE = 6, j = T.PROCESSING_INSTRUCTION_NODE = 7, te = T.COMMENT_NODE = 8, ne = T.DOCUMENT_NODE = 9, re = T.DOCUMENT_TYPE_NODE = 10, ie = T.DOCUMENT_FRAGMENT_NODE = 11, M = T.NOTATION_NODE = 12, N = t.freeze({
		DOCUMENT_POSITION_DISCONNECTED: 1,
		DOCUMENT_POSITION_PRECEDING: 2,
		DOCUMENT_POSITION_FOLLOWING: 4,
		DOCUMENT_POSITION_CONTAINS: 8,
		DOCUMENT_POSITION_CONTAINED_BY: 16,
		DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
	});
	function ae(e, t) {
		if (t.length < e.length) return ae(t, e);
		var n = null;
		for (var r in e) {
			if (e[r] !== t[r]) return n;
			n = e[r];
		}
		return n;
	}
	function P(e) {
		return e.guid ||= Math.random(), e.guid;
	}
	function F() {}
	F.prototype = {
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
			}, n = [], r = 0; r < this.length; r++) We(this[r], n, null, t);
			return n.join("");
		},
		filter: function(e) {
			return Array.prototype.filter.call(this, e);
		},
		indexOf: function(e) {
			return Array.prototype.indexOf.call(this, e);
		}
	}, F.prototype[Symbol.iterator] = function() {
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
	function I(e, t) {
		this._node = e, this._refresh = t, L(this);
	}
	function L(e) {
		var t = e._node._inc || e._node.ownerDocument._inc;
		if (e._inc !== t) {
			var n = e._refresh(e._node);
			if (qe(e, "length", n.length), !e.$$length || n.length < e.$$length) for (var r = n.length; r in e; r++) i(e, r) && delete e[r];
			C(n, e), e._inc = t;
		}
	}
	I.prototype.item = function(e) {
		return L(this), this[e] || null;
	}, w(I, F);
	function R() {}
	function oe(e, t) {
		for (var n = 0; n < e.length;) {
			if (e[n] === t) return n;
			n++;
		}
	}
	function se(e, t, n, r) {
		if (r ? t[oe(t, r)] = n : (t[t.length] = n, t.length++), e) {
			n.ownerElement = e;
			var i = e.ownerDocument;
			i && (r && pe(i, e, r), fe(i, e, n));
		}
	}
	function z(e, t, n) {
		var r = oe(t, n);
		if (r >= 0) {
			for (var i = t.length - 1; r <= i;) t[r] = t[++r];
			if (t.length = i, e) {
				var a = e.ownerDocument;
				a && pe(a, e, n), n.ownerElement = null;
			}
		}
	}
	R.prototype = {
		length: 0,
		item: F.prototype.item,
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
			var n = this.getNamedItemNS(e.namespaceURI, e.localName);
			return n === e ? e : (se(this._ownerElement, this, e, n), n);
		},
		setNamedItemNS: function(e) {
			return this.setNamedItem(e);
		},
		removeNamedItem: function(e) {
			var t = this.getNamedItem(e);
			if (!t) throw new f(f.NOT_FOUND_ERR, e);
			return z(this._ownerElement, this, t), t;
		},
		removeNamedItemNS: function(e, t) {
			var n = this.getNamedItemNS(e, t);
			if (!n) throw new f(f.NOT_FOUND_ERR, e ? e + " : " + t : t);
			return z(this._ownerElement, this, n), n;
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
	}, R.prototype[Symbol.iterator] = function() {
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
	function B() {}
	B.prototype = {
		hasFeature: function(e, t) {
			return !0;
		},
		createDocument: function(e, t, n) {
			var r = c.XML_APPLICATION;
			e === l.HTML ? r = c.XML_XHTML_APPLICATION : e === l.SVG && (r = c.XML_SVG_IMAGE);
			var i = new de(u, { contentType: r });
			if (i.implementation = this, i.childNodes = new F(), i.doctype = n || null, n && i.appendChild(n), t) {
				var a = i.createElementNS(e, t);
				i.appendChild(a);
			}
			return i;
		},
		createDocumentType: function(e, t, n, r) {
			x(e);
			var i = new Pe(u);
			return i.name = e, i.nodeName = e, i.publicId = t || "", i.systemId = n || "", i.internalSubset = r || "", i.childNodes = new F(), i;
		},
		createHTMLDocument: function(e) {
			var t = new de(u, { contentType: c.HTML });
			if (t.implementation = this, t.childNodes = new F(), e !== !1) {
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
	function V(e) {
		h(e);
	}
	V.prototype = {
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
					case r.COMMENT_NODE:
						if (r.data !== i.data) return !1;
						break;
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
			return Ee(this, e, t);
		},
		replaceChild: function(e, t) {
			Ee(this, e, t, Te), t && this.removeChild(t);
		},
		removeChild: function(e) {
			return he(this, e);
		},
		appendChild: function(e) {
			return this.insertBefore(e, null);
		},
		hasChildNodes: function() {
			return this.firstChild != null;
		},
		cloneNode: function(e) {
			return Ke(this.ownerDocument || this, this, e);
		},
		normalize: function() {
			ue(this, null, { enter: function(e) {
				for (var t = e.firstChild; t;) {
					var n = t.nextSibling;
					n !== null && n.nodeType === O && t.nodeType === O ? (e.removeChild(n), t.appendData(n.data)) : t = n;
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
			if (t instanceof H && (r = t, t = r.ownerElement), n instanceof H && (i = n, n = i.ownerElement, r && t && n === t)) for (var a = 0, o; o = n.attributes[a]; a++) {
				if (o === r) return N.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + N.DOCUMENT_POSITION_PRECEDING;
				if (o === i) return N.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + N.DOCUMENT_POSITION_FOLLOWING;
			}
			if (!t || !n || n.ownerDocument !== t.ownerDocument) return N.DOCUMENT_POSITION_DISCONNECTED + N.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (P(n.ownerDocument) > P(t.ownerDocument) ? N.DOCUMENT_POSITION_FOLLOWING : N.DOCUMENT_POSITION_PRECEDING);
			if (i && t === n) return N.DOCUMENT_POSITION_CONTAINS + N.DOCUMENT_POSITION_PRECEDING;
			if (r && t === n) return N.DOCUMENT_POSITION_CONTAINED_BY + N.DOCUMENT_POSITION_FOLLOWING;
			for (var s = [], c = t.parentNode; c;) {
				if (!i && c === n) return N.DOCUMENT_POSITION_CONTAINED_BY + N.DOCUMENT_POSITION_FOLLOWING;
				s.push(c), c = c.parentNode;
			}
			s.reverse();
			for (var l = [], u = n.parentNode; u;) {
				if (!r && u === t) return N.DOCUMENT_POSITION_CONTAINS + N.DOCUMENT_POSITION_PRECEDING;
				l.push(u), u = u.parentNode;
			}
			l.reverse();
			var d = ae(s, l);
			for (var f in d.childNodes) {
				var p = d.childNodes[f];
				if (p === n) return N.DOCUMENT_POSITION_FOLLOWING;
				if (p === t) return N.DOCUMENT_POSITION_PRECEDING;
				if (l.indexOf(p) >= 0) return N.DOCUMENT_POSITION_FOLLOWING;
				if (s.indexOf(p) >= 0) return N.DOCUMENT_POSITION_PRECEDING;
			}
			return 0;
		}
	};
	function ce(e) {
		return e == "<" && "&lt;" || e == ">" && "&gt;" || e == "&" && "&amp;" || e == "\"" && "&quot;" || "&#" + e.charCodeAt() + ";";
	}
	C(T, V), C(T, V.prototype), C(N, V), C(N, V.prototype);
	function le(e, t) {
		ue(e, null, { enter: function(e) {
			return !t(e) || ue.STOP;
		} });
	}
	function ue(e, t, n) {
		for (var r = [{
			node: e,
			context: t,
			phase: ue.ENTER
		}]; r.length > 0;) {
			var i = r.pop();
			if (i.phase === ue.ENTER) {
				var a = n.enter(i.node, i.context);
				if (a === ue.STOP) return ue.STOP;
				if (r.push({
					node: i.node,
					context: a,
					phase: ue.EXIT
				}), a == null) continue;
				for (var o = i.node.lastChild; o;) r.push({
					node: o,
					context: a,
					phase: ue.ENTER
				}), o = o.previousSibling;
			} else n.exit && n.exit(i.node, i.context);
		}
	}
	ue.STOP = Symbol("walkDOM.STOP"), ue.ENTER = 0, ue.EXIT = 1;
	function de(e, t) {
		h(e);
		var n = t || {};
		this.ownerDocument = this, this.contentType = n.contentType || c.XML_APPLICATION, this.type = a(this.contentType) ? "html" : "xml";
	}
	function fe(e, t, n) {
		e && e._inc++, n.namespaceURI === l.XMLNS && (t._nsMap[n.prefix ? n.localName : ""] = n.value);
	}
	function pe(e, t, n, r) {
		e && e._inc++, n.namespaceURI === l.XMLNS && delete t._nsMap[n.prefix ? n.localName : ""];
	}
	function me(e, t, n) {
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
	function he(e, t) {
		if (e !== t.parentNode) throw new f(f.NOT_FOUND_ERR, "child's parent is not parent");
		var n = t.previousSibling, r = t.nextSibling;
		return n ? n.nextSibling = r : e.firstChild = r, r ? r.previousSibling = n : e.lastChild = n, me(e.ownerDocument, e), t.parentNode = null, t.previousSibling = null, t.nextSibling = null, t;
	}
	function ge(e) {
		return e && (e.nodeType === V.DOCUMENT_NODE || e.nodeType === V.DOCUMENT_FRAGMENT_NODE || e.nodeType === V.ELEMENT_NODE);
	}
	function _e(e) {
		return e && (e.nodeType === V.CDATA_SECTION_NODE || e.nodeType === V.COMMENT_NODE || e.nodeType === V.DOCUMENT_FRAGMENT_NODE || e.nodeType === V.DOCUMENT_TYPE_NODE || e.nodeType === V.ELEMENT_NODE || e.nodeType === V.PROCESSING_INSTRUCTION_NODE || e.nodeType === V.TEXT_NODE);
	}
	function ve(e) {
		return e && e.nodeType === V.DOCUMENT_TYPE_NODE;
	}
	function ye(e) {
		return e && e.nodeType === V.ELEMENT_NODE;
	}
	function be(e) {
		return e && e.nodeType === V.TEXT_NODE;
	}
	function xe(e, t) {
		var r = e.childNodes || [];
		if (n(r, ye) || ve(t)) return !1;
		var i = n(r, ve);
		return !(t && i && r.indexOf(i) > r.indexOf(t));
	}
	function Se(e, t) {
		var r = e.childNodes || [];
		function i(e) {
			return ye(e) && e !== t;
		}
		if (n(r, i)) return !1;
		var a = n(r, ve);
		return !(t && a && r.indexOf(a) > r.indexOf(t));
	}
	function Ce(e, t, n) {
		if (!ge(e)) throw new f(f.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + e.nodeType);
		if (n && n.parentNode !== e) throw new f(f.NOT_FOUND_ERR, "child not in parent");
		if (!_e(t) || ve(t) && e.nodeType !== V.DOCUMENT_NODE) throw new f(f.HIERARCHY_REQUEST_ERR, "Unexpected node type " + t.nodeType + " for parent node type " + e.nodeType);
	}
	function we(e, t, r) {
		var i = e.childNodes || [], a = t.childNodes || [];
		if (t.nodeType === V.DOCUMENT_FRAGMENT_NODE) {
			var o = a.filter(ye);
			if (o.length > 1 || n(a, be)) throw new f(f.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
			if (o.length === 1 && !xe(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
		}
		if (ye(t) && !xe(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
		if (ve(t)) {
			if (n(i, ve)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
			var s = n(i, ye);
			if (r && i.indexOf(s) < i.indexOf(r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
			if (!r && s) throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
		}
	}
	function Te(e, t, r) {
		var i = e.childNodes || [], a = t.childNodes || [];
		if (t.nodeType === V.DOCUMENT_FRAGMENT_NODE) {
			var o = a.filter(ye);
			if (o.length > 1 || n(a, be)) throw new f(f.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
			if (o.length === 1 && !Se(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
		}
		if (ye(t) && !Se(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
		if (ve(t)) {
			function e(e) {
				return ve(e) && e !== r;
			}
			if (n(i, e)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
			var s = n(i, ye);
			if (r && i.indexOf(s) < i.indexOf(r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
		}
	}
	function Ee(e, t, n, r) {
		Ce(e, t, n), e.nodeType === V.DOCUMENT_NODE && (r || we)(e, t, n);
		var i = t.parentNode;
		if (i && i.removeChild(t), t.nodeType === ie) {
			var a = t.firstChild;
			if (a == null) return t;
			var o = t.lastChild;
		} else a = o = t;
		var s = n ? n.previousSibling : e.lastChild;
		a.previousSibling = s, o.nextSibling = n, s ? s.nextSibling = a : e.firstChild = a, n == null ? e.lastChild = o : n.previousSibling = o;
		do
			a.parentNode = e;
		while (a !== o && (a = a.nextSibling));
		return me(e.ownerDocument || e, e, t), t.nodeType == ie && (t.firstChild = t.lastChild = null), t;
	}
	de.prototype = {
		implementation: null,
		nodeName: "#document",
		nodeType: ne,
		doctype: null,
		documentElement: null,
		_inc: 1,
		insertBefore: function(e, t) {
			if (e.nodeType === ie) {
				for (var n = e.firstChild; n;) {
					var r = n.nextSibling;
					this.insertBefore(n, t), n = r;
				}
				return e;
			}
			return Ee(this, e, t), e.ownerDocument = this, this.documentElement === null && e.nodeType === E && (this.documentElement = e), e;
		},
		removeChild: function(e) {
			var t = he(this, e);
			return t === this.documentElement && (this.documentElement = null), t;
		},
		replaceChild: function(e, t) {
			Ee(this, e, t, Te), e.ownerDocument = this, t && this.removeChild(t), ye(e) && (this.documentElement = e);
		},
		importNode: function(e, t) {
			return Ge(this, e, t);
		},
		getElementById: function(e) {
			var t = null;
			return le(this.documentElement, function(n) {
				if (n.nodeType == E && n.getAttribute("id") == e) return t = n, !0;
			}), t;
		},
		createElement: function(e) {
			var t = new De(u);
			t.ownerDocument = this, this.type === "html" && (e = e.toLowerCase()), r(this.contentType) && (t.namespaceURI = l.HTML), t.nodeName = e, t.tagName = e, t.localName = e, t.childNodes = new F();
			var n = t.attributes = new R();
			return n._ownerElement = t, t;
		},
		createDocumentFragment: function() {
			var e = new Re(u);
			return e.ownerDocument = this, e.childNodes = new F(), e;
		},
		createTextNode: function(e) {
			var t = new Oe(u);
			return t.ownerDocument = this, t.childNodes = new F(), t.appendData(e), t;
		},
		createComment: function(e) {
			var t = new Me(u);
			return t.ownerDocument = this, t.childNodes = new F(), t.appendData(e), t;
		},
		createCDATASection: function(e) {
			if (e.indexOf("]]>") !== -1) throw new f(f.INVALID_CHARACTER_ERR, "data contains \"]]>\"");
			var t = new Ne(u);
			return t.ownerDocument = this, t.childNodes = new F(), t.appendData(e), t;
		},
		createProcessingInstruction: function(e, t) {
			var n = new ze(u);
			return n.ownerDocument = this, n.childNodes = new F(), n.nodeName = n.target = e, n.nodeValue = n.data = t, n;
		},
		createAttribute: function(e) {
			if (!m.QName_exact.test(e)) throw new f(f.INVALID_CHARACTER_ERR, "invalid character in name \"" + e + "\"");
			return this.type === "html" && (e = e.toLowerCase()), this._createAttribute(e);
		},
		_createAttribute: function(e) {
			var t = new H(u);
			return t.ownerDocument = this, t.childNodes = new F(), t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t;
		},
		createEntityReference: function(e) {
			if (!m.Name.test(e)) throw new f(f.INVALID_CHARACTER_ERR, "not a valid xml name \"" + e + "\"");
			if (this.type === "html") throw new f("document is an html document", p.NotSupportedError);
			var t = new Le(u);
			return t.ownerDocument = this, t.childNodes = new F(), t.nodeName = e, t;
		},
		createElementNS: function(e, t) {
			var n = S(e, t), r = new De(u), i = r.attributes = new R();
			return r.childNodes = new F(), r.ownerDocument = this, r.nodeName = t, r.tagName = t, r.namespaceURI = n[0], r.prefix = n[1], r.localName = n[2], i._ownerElement = r, r;
		},
		createAttributeNS: function(e, t) {
			var n = S(e, t), r = new H(u);
			return r.ownerDocument = this, r.childNodes = new F(), r.nodeName = t, r.name = t, r.specified = !0, r.namespaceURI = n[0], r.prefix = n[1], r.localName = n[2], r;
		}
	}, w(de, V);
	function De(e) {
		h(e), this._nsMap = Object.create(null);
	}
	De.prototype = {
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
			return new I(this, function(n) {
				var r = [];
				return t.length > 0 && le(n, function(i) {
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
			var t = (this.nodeType === ne ? this : this.ownerDocument).type === "html", n = e.toLowerCase();
			return new I(this, function(r) {
				var i = [];
				return le(r, function(a) {
					a === r || a.nodeType !== E || (e === "*" || a.getQualifiedName() === (t && a.namespaceURI === l.HTML ? n : e)) && i.push(a);
				}), i;
			});
		},
		getElementsByTagNameNS: function(e, t) {
			return new I(this, function(n) {
				var r = [];
				return le(n, function(i) {
					i !== n && i.nodeType === E && (e === "*" || i.namespaceURI === e) && (t === "*" || i.localName == t) && r.push(i);
				}), r;
			});
		}
	}, de.prototype.getElementsByClassName = De.prototype.getElementsByClassName, de.prototype.getElementsByTagName = De.prototype.getElementsByTagName, de.prototype.getElementsByTagNameNS = De.prototype.getElementsByTagNameNS, w(De, V);
	function H(e) {
		h(e), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
	}
	H.prototype.nodeType = D, w(H, V);
	function U(e) {
		h(e);
	}
	U.prototype = {
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
	}, w(U, V);
	function Oe(e) {
		h(e);
	}
	Oe.prototype = {
		nodeName: "#text",
		nodeType: O,
		splitText: function(e) {
			var t = this.data, n = t.substring(e);
			t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
			var r = this.ownerDocument.createTextNode(n);
			return this.parentNode && this.parentNode.insertBefore(r, this.nextSibling), r;
		}
	}, w(Oe, U);
	function Me(e) {
		h(e);
	}
	Me.prototype = {
		nodeName: "#comment",
		nodeType: te
	}, w(Me, U);
	function Ne(e) {
		h(e);
	}
	Ne.prototype = {
		nodeName: "#cdata-section",
		nodeType: k
	}, w(Ne, Oe);
	function Pe(e) {
		h(e);
	}
	Pe.prototype.nodeType = re, w(Pe, V);
	function Fe(e) {
		h(e);
	}
	Fe.prototype.nodeType = M, w(Fe, V);
	function Ie(e) {
		h(e);
	}
	Ie.prototype.nodeType = A, w(Ie, V);
	function Le(e) {
		h(e);
	}
	Le.prototype.nodeType = ee, w(Le, V);
	function Re(e) {
		h(e);
	}
	Re.prototype.nodeName = "#document-fragment", Re.prototype.nodeType = ie, w(Re, V);
	function ze(e) {
		h(e);
	}
	ze.prototype.nodeType = j, w(ze, U);
	function Be() {}
	Be.prototype.serializeToString = function(e, t) {
		return Ve.call(e, t);
	}, V.prototype.toString = Ve;
	function Ve(e) {
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
		}, n = [], r = this.nodeType === ne && this.documentElement || this, i = r.prefix, a = r.namespaceURI;
		if (a && i == null) {
			var i = r.lookupPrefix(a);
			if (i == null) var o = [{
				namespace: a,
				prefix: null
			}];
		}
		return We(this, n, o, t), n.join("");
	}
	function He(e, t, n) {
		var r = e.prefix || "", i = e.namespaceURI;
		if (!i || r === "xml" && i === l.XML || i === l.XMLNS) return !1;
		for (var a = n.length; a--;) {
			var o = n[a];
			if (o.prefix === r) return o.namespace !== i;
		}
		return !0;
	}
	function Ue(e, t, n) {
		e.push(" ", t, "=\"", n.replace(/[<>&"\t\n\r]/g, ce), "\"");
	}
	function We(e, t, n, r) {
		n ||= [];
		var i = r.nodeFilter, a = r.requireWellFormed, c = r.splitCDATASections, u = (e.nodeType === ne ? e : e.ownerDocument).type === "html";
		ue(e, { ns: n }, {
			enter: function(e, n) {
				var d = n.ns;
				if (i) if (e = i(e), e) {
					if (typeof e == "string") return t.push(e), null;
				} else return null;
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
							if (He(T, u, C)) {
								var A = T.prefix || "", M = T.namespaceURI;
								Ue(t, A ? "xmlns:" + A : "xmlns", M), C.push({
									prefix: A,
									namespace: M
								});
							}
							var N = i ? i(T) : T;
							N && (typeof N == "string" ? t.push(N) : Ue(t, N.name, N.value));
						}
						if (_ === v && He(e, u, C)) {
							var ae = e.prefix || "", M = e.namespaceURI;
							Ue(t, ae ? "xmlns:" + ae : "xmlns", M), C.push({
								prefix: ae,
								namespace: M
							});
						}
						var P = !e.firstChild;
						if (P && (u || e.namespaceURI === l.HTML) && (P = s(_)), P) return t.push("/>"), null;
						if (t.push(">"), u && o(_)) {
							for (var F = e.firstChild; F;) F.data ? t.push(F.data) : We(F, t, C.slice(), r), F = F.nextSibling;
							return t.push("</", v, ">"), null;
						}
						return {
							ns: C,
							tag: v
						};
					case ne:
					case ie:
						if (a && e.nodeType === ne && e.documentElement == null) throw new f("The Document has no documentElement", p.InvalidStateError);
						return { ns: d };
					case D: return Ue(t, e.name, e.value), null;
					case O:
						if (a && m.InvalidChar.test(e.data)) throw new f("The Text node data contains characters outside the XML Char production", p.InvalidStateError);
						return t.push(e.data.replace(/[<&>]/g, ce)), null;
					case k:
						if (a && e.data.indexOf("]]>") !== -1) throw new f("The CDATASection data contains \"]]>\"", p.InvalidStateError);
						return c ? t.push(m.CDATA_START, e.data.replace(/]]>/g, "]]]]><![CDATA[>"), m.CDATA_END) : t.push(m.CDATA_START, e.data, m.CDATA_END), null;
					case te:
						if (a) {
							if (m.InvalidChar.test(e.data)) throw new f("The comment node data contains characters outside the XML Char production", p.InvalidStateError);
							if (e.data.indexOf("--") !== -1 || e.data[e.data.length - 1] === "-") throw new f("The comment node data contains \"--\" or ends with \"-\"", p.InvalidStateError);
						}
						return t.push(m.COMMENT_START, e.data, m.COMMENT_END), null;
					case re:
						var I = e.publicId, L = e.systemId;
						if (a) {
							if (I && !m.PubidLiteral_match.test(I)) throw new f("DocumentType publicId is not a valid PubidLiteral", p.InvalidStateError);
							if (L && L !== "." && !m.SystemLiteral_match.test(L)) throw new f("DocumentType systemId is not a valid SystemLiteral", p.InvalidStateError);
							if (e.internalSubset && e.internalSubset.indexOf("]>") !== -1) throw new f("DocumentType internalSubset contains \"]>\"", p.InvalidStateError);
						}
						return t.push(m.DOCTYPE_DECL_START, " ", e.name), I ? (t.push(" ", m.PUBLIC, " ", I), L && L !== "." && t.push(" ", L)) : L && L !== "." && t.push(" ", m.SYSTEM, " ", L), e.internalSubset && t.push(" [", e.internalSubset, "]"), t.push(">"), null;
					case j:
						if (a) {
							if (e.target.indexOf(":") !== -1 || e.target.toLowerCase() === "xml") throw new f("The ProcessingInstruction target is not well-formed", p.InvalidStateError);
							if (m.InvalidChar.test(e.data)) throw new f("The ProcessingInstruction data contains characters outside the XML Char production", p.InvalidStateError);
							if (e.data.indexOf("?>") !== -1) throw new f("The ProcessingInstruction data contains \"?>\"", p.InvalidStateError);
						}
						return t.push("<?", e.target, " ", e.data, "?>"), null;
					case ee: return t.push("&", e.nodeName, ";"), null;
					default: return t.push("??", e.nodeName), null;
				}
			},
			exit: function(e, n) {
				n && n.tag && t.push("</", n.tag, ">");
			}
		});
	}
	function Ge(e, t, n) {
		var r;
		return ue(t, null, { enter: function(t, i) {
			var a = t.cloneNode(!1);
			return a.ownerDocument = e, a.parentNode = null, i === null ? r = a : i.appendChild(a), t.nodeType === D || n ? a : null;
		} }), r;
	}
	function Ke(e, t, n) {
		var r;
		return ue(t, null, { enter: function(t, a) {
			var o = new t.constructor(u);
			for (var s in t) if (i(t, s)) {
				var c = t[s];
				typeof c != "object" && c != o[s] && (o[s] = c);
			}
			t.childNodes && (o.childNodes = new F()), o.ownerDocument = e;
			var l = n;
			switch (o.nodeType) {
				case E:
					var d = t.attributes, f = o.attributes = new R(), p = d.length;
					f._ownerElement = o;
					for (var m = 0; m < p; m++) o.setAttributeNode(Ke(e, d.item(m), !0));
					break;
				case D: l = !0;
			}
			return a === null ? r = o : a.appendChild(o), l ? o : null;
		} }), r;
	}
	function qe(e, t, n) {
		e[t] = n;
	}
	function Je(e) {
		for (var t = [], n = e.firstChild; n;) n.nodeType === E && t.push(n), n = n.nextSibling;
		return t;
	}
	try {
		Object.defineProperty && (Object.defineProperty(I.prototype, "length", { get: function() {
			return L(this), this.$$length;
		} }), Object.defineProperty(V.prototype, "textContent", {
			get: function() {
				if (this.nodeType === E || this.nodeType === ie) {
					var e = [];
					return ue(this, null, { enter: function(t) {
						if (t.nodeType === E || t.nodeType === ie) return !0;
						if (t.nodeType === j || t.nodeType === te) return null;
						e.push(t.nodeValue);
					} }), e.join("");
				}
				return this.nodeValue;
			},
			set: function(e) {
				switch (this.nodeType) {
					case E:
					case ie:
						for (; this.firstChild;) this.removeChild(this.firstChild);
						(e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
						break;
					default: this.data = e, this.value = e, this.nodeValue = e;
				}
			}
		}), Object.defineProperty(De.prototype, "children", { get: function() {
			return new I(this, Je);
		} }), Object.defineProperty(de.prototype, "children", { get: function() {
			return new I(this, Je);
		} }), Object.defineProperty(Re.prototype, "children", { get: function() {
			return new I(this, Je);
		} }), qe = function(e, t, n) {
			e["$$" + t] = n;
		});
	} catch {}
	e._updateLiveList = L, e.Attr = H, e.CDATASection = Ne, e.CharacterData = U, e.Comment = Me, e.Document = de, e.DocumentFragment = Re, e.DocumentType = Pe, e.DOMImplementation = B, e.Element = De, e.Entity = Ie, e.EntityReference = Le, e.LiveNodeList = I, e.NamedNodeMap = R, e.Node = V, e.NodeList = F, e.Notation = Fe, e.Text = Oe, e.ProcessingInstruction = ze, e.walkDOM = ue, e.XMLSerializer = Be;
})), Ne = /* @__PURE__ */ n(((e) => {
	var t = ke().freeze;
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
})), Pe = /* @__PURE__ */ n(((e) => {
	var t = ke(), n = je(), r = Ae(), i = t.isHTMLEscapableRawTextElement, a = t.isHTMLMimeType, o = t.isHTMLRawTextElement, s = t.hasOwn, c = t.NAMESPACE, l = r.ParseError, u = r.DOMException, d = 0, f = 1, p = 2, m = 3, h = 4, g = 5, _ = 6, v = 7;
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
			} else return String.fromCharCode(e);
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
						var j = o.doc, te = j.createTextNode(e.substring(D));
						if (j.documentElement) return c.error("Extra content at the end of the document");
						j.appendChild(te), o.currentElement = te;
					}
					return;
				}
				if (O > D) {
					var ne = e.substring(D, O);
					!d && E.length === 0 && (ne = ne.replace(new RegExp(n.S_OPT.source, "g"), ""), ne && c.error("Unexpected content outside root element: '" + ne + "'")), m(O);
				}
				switch (e.charAt(O + 1)) {
					case "/":
						var re = e.indexOf(">", O + 2), ie = e.substring(O + 2, re > 0 ? re : void 0);
						if (!ie) return c.fatalError("end tag name missing");
						var M = re > 0 && n.reg("^", n.QName_group, n.S_OPT, "$").exec(ie);
						if (!M) return c.fatalError("end tag name contains invalid characters: \"" + ie + "\"");
						if (!o.currentElement && !o.doc.documentElement) return;
						var N = E[E.length - 1] || o.currentElement.tagName || o.doc.documentElement.tagName || "";
						if (N !== M[1]) {
							var ae = M[1].toLowerCase();
							if (!d || N.toLowerCase() !== ae) return c.fatalError("Opening and ending tag mismatch: \"" + N + "\" != \"" + ie + "\"");
						}
						var P = x.pop();
						E.pop();
						var F = P.localNSMap;
						if (o.endElement(P.uri, P.localName, N), F) for (var I in F) s(F, I) && o.endPrefixMapping(I);
						re++;
						break;
					case "?":
						v && y(O), re = ee(e, O, o, c);
						break;
					case "!":
						v && y(O), re = k(e, O, o, c, d);
						break;
					default:
						v && y(O);
						var L = new A(), R = x[x.length - 1].currentNSMap, re = C(e, O, L, R, p, c, d), oe = L.length;
						if (L.closed || (d && t.isHTMLVoidElement(L.tagName) ? L.closed = !0 : E.push(L.tagName)), v && oe) {
							for (var se = S(v, {}), z = 0; z < oe; z++) {
								var B = L[z];
								y(B.offset), B.locator = S(v, {});
							}
							o.locator = se, w(L, o, R) && x.push(L), o.locator = v;
						} else w(L, o, R) && x.push(L);
						d && !L.closed ? re = T(e, re, L.tagName, p, o) : re++;
				}
			} catch (e) {
				if (e instanceof l) throw e;
				if (e instanceof u) throw new l(e.name + ": " + e.message, o.locator, e);
				c.error("element parse error: " + e), re = -1;
			}
			re > D ? D = re : m(Math.max(O, D) + 1);
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
			switch (S) {
				case "=":
					if (x === f) l = e.slice(t, y), x = m;
					else if (x === p) x = m;
					else throw Error("attribute equal must after attrName");
					break;
				case "'":
				case "\"":
					if (x === m || x === f) if (x === f && (a.warning("attribute value must after \"=\""), l = e.slice(t, y)), t = y + 1, y = e.indexOf(S, t), y > 0) u = e.slice(t, y), c(l, u, t - 1), x = g;
					else throw Error("attribute value no end '" + S + "' match");
					else if (x == h) u = e.slice(t, y), c(l, u, t), a.warning("attribute \"" + l + "\" missed start quot(" + S + ")!!"), t = y + 1, x = g;
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
					case g:
						x = _;
						break;
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
			o.localName = p, m !== !1 && (i ?? (i = Object.create(null), E(n, n = Object.create(null))), n[m] = i[m] = u, o.uri = c.XMLNS, t.startPrefixMapping(m, u));
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
			var c = e.indexOf("</" + n + ">", t), l = e.substring(t + 1, c);
			return s && (l = l.replace(b, r)), a.characters(l, 0, l.length), c;
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
					case "-":
						s = e.getMatch(n.Comment);
						break;
				}
				else if (e.char() === "<" && e.char(1) === "?") s = r(e, t);
				else if (e.char() === "%") s = e.getMatch(n.PEReference);
				else return t.fatalError("Error detected in Markup declaration");
				if (!s) return t.fatalError("Error in internal subset at position " + e.getIndex());
			}
			return t.fatalError("doctype internal subset is not well-formed, missing ]");
		}
	}
	function k(e, t, r, i, a) {
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
	function ee(e, t, r, i) {
		var a = e.substring(t).match(n.PI);
		if (!a) return i.fatalError("Invalid processing instruction starting at position " + t);
		if (a[1].toLowerCase() === "xml") {
			if (t > 0) return i.fatalError("processing instruction at position " + t + " is an xml declaration which is only at the start of the document");
			if (!n.XMLDecl.test(e.substring(t))) return i.fatalError("xml declaration is not well-formed");
		}
		return r.processingInstruction(a[1], a[2]), t + a[0].length;
	}
	function A() {
		this.attributeNames = Object.create(null);
	}
	A.prototype = {
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
	}, e.XMLReader = y, e.parseUtils = D, e.parseDoctypeCommentOrCData = k;
})), Fe = /* @__PURE__ */ n(((e) => {
	var t = ke(), n = Me(), r = Ae(), i = Ne(), a = Pe(), o = n.DOMImplementation, s = t.hasDefaultHTMLNamespace, c = t.isHTMLMimeType, l = t.isValidMimeType, u = t.MIME_TYPE, d = t.NAMESPACE, f = r.ParseError, p = a.XMLReader;
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
		fatalError: function(e) {
			throw this.reportError("fatalError", e), new f(e, this.locator);
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
})), Ie = /* @__PURE__ */ n(((e) => {
	var t = ke();
	e.assign = t.assign, e.hasDefaultHTMLNamespace = t.hasDefaultHTMLNamespace, e.isHTMLMimeType = t.isHTMLMimeType, e.isValidMimeType = t.isValidMimeType, e.MIME_TYPE = t.MIME_TYPE, e.NAMESPACE = t.NAMESPACE;
	var n = Ae();
	e.DOMException = n.DOMException, e.DOMExceptionName = n.DOMExceptionName, e.ExceptionCode = n.ExceptionCode, e.ParseError = n.ParseError;
	var r = Me();
	e.Attr = r.Attr, e.CDATASection = r.CDATASection, e.CharacterData = r.CharacterData, e.Comment = r.Comment, e.Document = r.Document, e.DocumentFragment = r.DocumentFragment, e.DocumentType = r.DocumentType, e.DOMImplementation = r.DOMImplementation, e.Element = r.Element, e.Entity = r.Entity, e.EntityReference = r.EntityReference, e.LiveNodeList = r.LiveNodeList, e.NamedNodeMap = r.NamedNodeMap, e.Node = r.Node, e.NodeList = r.NodeList, e.Notation = r.Notation, e.ProcessingInstruction = r.ProcessingInstruction, e.Text = r.Text, e.XMLSerializer = r.XMLSerializer;
	var i = Fe();
	e.DOMParser = i.DOMParser, e.normalizeLineEndings = i.normalizeLineEndings, e.onErrorStopParsing = i.onErrorStopParsing, e.onWarningStopParsing = i.onWarningStopParsing;
})), Le = /* @__PURE__ */ e(Oe()), Re = /* @__PURE__ */ t({
	DOMParserFactory: () => We,
	RDFArrayRemove: () => Qe,
	callbackify: () => Ue,
	domToString: () => Ge,
	dtstamp: () => qe,
	dumpNode: () => Ke,
	heavyCompare: () => Je,
	heavyCompareSPO: () => Ye,
	linkRelationProperty: () => He,
	log: () => H,
	mediaTypeClass: () => Ve,
	output: () => Xe,
	parseXML: () => Ze,
	stackString: () => tt,
	string: () => Be,
	string_startswith: () => $e,
	uri: () => ge
}), ze = Ie(), Be = { template: et };
function Ve(e) {
	return e = e.split(";")[0].trim(), new z("http://www.w3.org/ns/iana/media-types/" + e + "#Resource");
}
function He(e) {
	return new z("http://www.w3.org/ns/iana/link-relations/relation#" + e.trim());
}
function Ue(e, t) {
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
function We() {
	return window.DOMParser ? new ze.DOMParser() : window.ActiveXObject ? new ActiveXObject("Microsoft.XMLDOM") : !1;
}
function Ge(e, t) {
	t ||= {};
	var n = [];
	t && t.selfClosing && t.selfClosing.split(" ").forEach(function(e) {
		n[e] = !0;
	});
	var r = [];
	return t && t.skipAttributes && t.skipAttributes.split(" ").forEach(function(e) {
		r[e] = !0;
	}), Ke(e, t, n, r);
}
function Ke(e, t, n, r) {
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
				for (a += ">", a += s === "html" ? "\n  " : "", o.push(s === "style" || s === "script"), i = 0; i < e.childNodes.length; i++) a += Ke(e.childNodes[i]);
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
function qe() {
	var e = /* @__PURE__ */ new Date(), t = e.getYear() + 1900, n = e.getMonth() + 1, r = e.getDate(), i = e.getUTCHours(), a = e.getUTCMinutes(), o = e.getSeconds();
	return n < 10 && (n = "0" + n), r < 10 && (r = "0" + r), i < 10 && (i = "0" + i), a < 10 && (a = "0" + a), o < 10 && (o = "0" + o), t + "-" + n + "-" + r + "T" + i + ":" + a + ":" + o + "Z";
}
function Je(e, t, n, r) {
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
function Ye(e, t, n, r) {
	return Je(e.subject, t.subject, n, r) || Je(e.predicate, t.predicate, n, r) || Je(e.object, t.object, n, r);
}
function Xe(e) {
	var t = document.createElement("div");
	t.textContent = e, document.body.appendChild(t);
}
function Ze(e, t) {
	var n;
	return t ||= {}, typeof module < "u" && module && module.exports ? new ze.DOMParser().parseFromString(e, t.contentType || "application/xhtml+xml") : (n = typeof window < "u" && window.DOMParser ? new window.DOMParser() : new ze.DOMParser(), n.parseFromString(e, "application/xml"));
}
function Qe(e, t) {
	for (var n = 0; n < e.length; n++) if (e[n].subject.equals(t.subject) && e[n].predicate.equals(t.predicate) && e[n].object.equals(t.object) && e[n].why.equals(t.why)) {
		e.splice(n, 1);
		return;
	}
	throw Error("RDFArrayRemove: Array did not contain " + t + " " + t.why);
}
function $e(e, t) {
	return e.slice(0, t.length) === t;
}
function et(e, t) {
	for (var n = e.split("%s"), r = "", i = 0; i < t.length; i++) t[i] += "", r += n[i] + t[i];
	return r + n.slice(t.length).join();
}
function tt(e) {
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
//#endregion
//#region node_modules/rdflib/esm/xsd.js
function nt(e = De) {
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
nt(De);
//#endregion
//#region node_modules/rdflib/esm/serializer.js
function rt(e) {
	return new it(e);
}
var it = class e {
	constructor(e) {
		s(this, "_notQNameChars", "	\r\n !\"#$%&'()*,+/;<=>?@[\\]^`{|}~"), s(this, "_notNameChars", this._notQNameChars + ":"), s(this, "validPrefix", /* @__PURE__ */ new RegExp(/^[a-zA-Z][a-zA-Z0-9]*$/)), s(this, "forbidden1", /* @__PURE__ */ new RegExp(/[\\"\b\f\r\v\t\n\u0080-\uffff]/gm)), s(this, "forbidden3", /* @__PURE__ */ new RegExp(/[\\"\b\f\r\v\u0080-\uffff]/gm)), this.flags = "", this.base = null, this.prefixes = [], this.namespaces = [];
		let t = Object.keys((0, r.default)());
		for (let e in t) {
			let n = (0, r.default)()[t[e]](""), i = t[e];
			this.prefixes[n] = i, this.namespaces[i] = n;
		}
		this.suggestPrefix("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#"), this.suggestPrefix("xml", "reserved:reservedForFutureUse"), this.namespacesUsed = [], this.keywords = ["a"], this.prefixchars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", this.incoming = null, this.formulas = [], this.store = e, this.rdfFactory = e.rdfFactory || De, this.xsd = nt(this.rdfFactory);
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
		if (e.slice(0, 7) !== "default" && e.slice(0, 2) !== "ns" && !(!e || !t)) {
			for (let t in this.prefixes) this.prefixes[t] == e && delete this.prefixes[t];
			this.prefixes[t] = e, this.namespaces[e] = t;
		}
	}
	suggestPrefix(e, t) {
		e.slice(0, 7) !== "default" && e.slice(0, 2) !== "ns" && (!e || !t || e in this.namespaces || t in this.prefixes || (this.prefixes[t] = e, this.namespaces[e] = t));
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
			if (u.termType !== "BlankNode" || !t[u] || t[u].length !== 1) {
				c.push(u);
				continue;
			}
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
		return e = this.flags.indexOf("r") < 0 && this.base ? Ce(this.base, e) : this.flags.indexOf("u") >= 0 ? ot(e) : at(decodeURI(e)), "<" + e + ">";
	}
	statementsToNTriples(e) {
		var t = e.slice();
		t.sort();
		for (var n = "", r = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", i = this, a = this.store, o = this.rdfFactory, s = function(e) {
			if (e.termType !== "Collection") return i.atomicTermToN3(e);
			for (var t = e.elements, c = a.sym(r + "nill"), l = t.length - 1; l >= 0; l--) {
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
			return Ye(e, t, n, r);
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
				if (this.defaultNamespace && this.defaultNamespace === i && this.flags.indexOf("d") < 0) return this.flags.indexOf("k") >= 0 && this.keyords.indexOf(r) < 0 ? r : ":" + r;
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
			return c(this.base ? Ce(this.base, e.uri) : e.uri);
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
			for (var d = 0; d < l.length; d++) {
				if (o = l[d], o.predicate.uri === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" && !i && o.object.termType === "NamedNode") {
					i = o.object;
					continue;
				}
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
			return e.termType === "BlankNode" ? (!t.incoming[e] || t.incoming[e].length !== 1) && (v = " rdf:nodeID=\"" + e.toNT().slice(2) + "\"") : v = " rdf:about=\"" + u(e) + "\"", [
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
			var x = this.base && this.flags.includes("z") ? Ce(this.base, b) : b;
			y += "\n xmlns:" + this.prefixes[b] + "=\"" + c(x) + "\"";
		}
		return y += ">", a([
			y,
			v,
			"</rdf:RDF>"
		], -1);
	}
	statementsToJsonld(e) {
		let t = this.statementsToN3(e), n = Le.parse(t);
		return JSON.stringify(n, null, 2);
	}
};
function at(e) {
	return encodeURI(e);
}
function ot(e) {
	for (var t = "", n, r = 0; r < e.length; r++) n = e.charCodeAt(r), n > 65535 ? t += "\\U" + ("00000000" + n.toString(16)).slice(-8) : n > 126 ? t += "\\u" + ("0000" + n.toString(16)).slice(-4) : t += e[r];
	return t;
}
//#endregion
//#region node_modules/rdflib/esm/serialize.js
function st(e, t, n, r, i, a) {
	n ||= e?.value;
	let o = a || {};
	r ||= "text/turtle";
	var s = void 0;
	try {
		var c = rt(t);
		o.flags && c.setFlags(o.flags);
		var l = t.statementsMatching(void 0, void 0, void 0, e);
		switch ("namespaces" in t && c.suggestNamespaces(t.namespaces), o.namespaces && c.setNamespaces(o.namespaces), c.setBase(n), r) {
			case T: return s = c.statementsToXML(l), u(null, s);
			case b:
			case x: return s = c.statementsToN3(l), u(null, s);
			case E:
			case D: return c.setFlags("si" + (o.flags ? " " + o.flags : "")), s = c.statementsToN3(l), u(null, s);
			case w: return c.setFlags("deinprstux"), s = c.statementsToNTriples(l), u(null, s);
			case y: return c.setFlags("si dr" + (o.flags ? " " + o.flags : "")), s = c.statementsToJsonld(l), u(null, s);
			case C:
			case S: return c.setFlags("deinprstux q"), s = c.statementsToNTriples(l), u(null, s);
			default: throw Error("Serialize: Content-type " + r + " not supported for data write.");
		}
	} catch (e) {
		if (i) return i(e, void 0);
		throw e;
	}
	function u(e, t) {
		if (i) {
			i(e, t);
			return;
		} else return t;
	}
}
//#endregion
//#region node_modules/rdflib/esm/utils.js
var ct = [
	"blankNode",
	"defaultGraph",
	"literal",
	"namedNode",
	"quad",
	"variable",
	"supports"
], lt = {
	first: "http://www.w3.org/1999/02/22-rdf-syntax-ns#first",
	rest: "http://www.w3.org/1999/02/22-rdf-syntax-ns#rest",
	nil: "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"
};
function ut(e, t, n) {
	let r = [];
	return n.reduce((t, n, i, a) => {
		r.push(e.quad(t, e.namedNode(lt.first), a[i]));
		let o;
		return i < a.length - 1 ? (o = e.blankNode(), r.push(e.quad(t, e.namedNode(lt.rest), o))) : r.push(e.quad(t, e.namedNode(lt.rest), e.namedNode(lt.nil))), o;
	}, t), r;
}
function dt(e, t, n = 0) {
	var r = e.length;
	for (n < 0 && (n = r + n); n < r; n++) if (e[n] === t) return n;
	return -1;
}
//#endregion
//#region node_modules/rdflib/esm/formula.js
var ft = class e extends l {
	constructor(e = [], t = [], n = [], r = [], i = {}) {
		super(""), this.statements = e, this.constraints = t, this.initBindings = n, this.optional = r, s(this, "termType", _), s(this, "classOrder", c.Graph), s(this, "fetcher", void 0), s(this, "isVar", 0), s(this, "ns", U), s(this, "rdfFactory", void 0), this.rdfFactory = i && i.rdfFactory || De;
		for (let e of ct) this[e] = (...t) => this.rdfFactory[e](...t);
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
		return i ? l.toJS(i) : void 0;
	}
	anyStatementMatching(e, t, n, r) {
		let i = this.statementsMatching(e, t, n, r, !0);
		if (!(!i || i.length === 0)) return i[0];
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
		return new le();
	}
	each(e, t, n, r) {
		let i = [], a = this.statementsMatching(e, t, n, r, !1);
		if (e == null) for (let e = 0, t = a.length; e < t; e++) i.push(a[e].subject);
		else if (t == null) for (let e = 0, t = a.length; e < t; e++) i.push(a[e].predicate);
		else if (n == null) for (let e = 0, t = a.length; e < t; e++) i.push(a[e].object);
		else if (r == null) for (let e = 0, t = a.length; e < t; e++) i.push(new z(a[e].graph.value));
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
				return a[t] ? !1 : (a[t] = !0, !0);
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
				if (r = void 0, t = void 0, n = e.lastIndexOf("\""), n < e.length - 1) if (e[n + 1] === "@") r = e.slice(n + 2);
				else if (e.slice(n + 1, n + 3) === "^^") t = this.fromNT(e.slice(n + 3));
				else throw Error("Can't convert string from NT: " + e);
				return e = e.slice(1, n), e = e.replace(/\\"/g, "\""), e = e.replace(/\\n/g, "\n"), e = e.replace(/\\\\/g, "\\"), this.rdfFactory.literal(e, r || t);
			case "_": return this.rdfFactory.blankNode(e.slice(2));
			case "?": return new we(e.slice(1));
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
			} else if (A(e)) return this.holds(e.subject, e.predicate, e.object, e.graph);
			else if (e.statements) return this.holds(e.statements);
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
		} else {
			let n = t.rdfFactory.blankNode(), r = ut(t.rdfFactory, n, e);
			return t.addAll(r), n;
		}
	}
	NTtoURI(e) {
		let t, n, r = {};
		for (t in e) e.hasOwnProperty(t) && (n = e[t], t[0] === "<" && (r[t.slice(1, -1)] = n));
		return r;
	}
	serialize(e, t, n, r) {
		return st(n, this, e, t, void 0, r);
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
		return i ?? H.error("No value found for the() {" + e + " " + t + " " + n + "}."), i;
	}
	transitiveClosure(e, t, n) {
		let r, i, a, o, s, c, l = {};
		Object.assign(l, e);
		let u = {};
		for (;;) {
			if (c = function() {
				for (let e in l) if (l.hasOwnProperty(e)) return e;
			}(), c == null) return u;
			for (s = n ? this.each(void 0, t, this.fromNT(c)) : this.each(this.fromNT(c), t), i = 0, a = s.length; i < a; i++) r = s[i], o = r.toNT(), !(o in u) && (o in l || (l[o] = l[c]));
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
		return new we(e);
	}
	whether(e, t, n, r) {
		return this.statementsMatching(e, t, n, r, !1).length;
	}
};
//#endregion
//#region node_modules/rdflib/esm/node.js
l.fromValue = ce;
var pt = l, mt = { xsd: U("http://www.w3.org/2001/XMLSchema#") };
l.toJS = function(e) {
	return te(e) ? e.elements.map(l.toJS) : ae(e) ? e.datatype.equals(mt.xsd("boolean")) ? e.value === "1" || e.value === "true" : e.datatype.equals(mt.xsd("dateTime")) || e.datatype.equals(mt.xsd("date")) ? new Date(e.value) : e.datatype.equals(mt.xsd("integer")) || e.datatype.equals(mt.xsd("float")) || e.datatype.equals(mt.xsd("decimal")) ? Number(e.value) : e.value : e;
};
//#endregion
//#region node_modules/rdflib/esm/query.js
var ht = class {
	constructor(e, t) {
		this.pat = new xt(), this.vars = [], this.name = e, this.id = t;
	}
};
function gt(e, t, n, r) {
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
		var e;
		for (e = 0; e < this.branches.length; e++) if (!this.branches[e].done) return;
		H.debug("OPTIONAL BIDNINGS ALL DONE:"), this.doCallBacks(this.branches.length - 1, this.trunkBindings);
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
		this.done = !0, H.info("Mandatory query branch finished.***"), this.onDone !== void 0 && this.onDone();
	};
	var f = function(e) {
		return this.count = 0, this.done = !1, this.results = [], this.junction = e, e.branches.push(this), this;
	};
	f.prototype.reportMatch = function(e) {
		this.results.push(e);
	}, f.prototype.reportDone = function() {
		H.debug("Optional branch finished - results.length = " + this.results.length), this.results.length === 0 && (this.results.push({}), H.debug("Optional branch FAILED - that's OK.")), this.done = !0, this.junction.checkAllDone();
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
			if (!(s.uri && s.uri === "chrome:theSession")) if (s.isVar && n[s] === void 0) t.nvars++;
			else {
				if (s = c(r[a], n), e.redirections[e.id(s)] && (s = e.redirections[e.id(s)]), i = o[a][e.id(s)], !i) return t.index = [], !1;
				(t.index === null || t.index.length > i.length) && (t.index = i);
			}
		}
		return t.index === null && (t.index = e.statements), !0;
	}
	function m(e, t) {
		return e.nvars === t.nvars ? e.index.length - t.index.length : e.nvars - t.nvars;
	}
	var h = 0, g = function(e, n, r, a, o, s, c) {
		H.debug("Match begins, Branch count now: " + c.count + " for " + c.pattern_debug);
		var l = n.statements;
		if (l.length === 0) {
			if (H.debug("FOUND MATCH WITH BINDINGS:" + i(r)), n.optional.length === 0) c.reportMatch(r);
			else {
				H.debug("OPTIONAL: " + n.optional);
				var d = new u(t, r), p = [], m;
				for (m = 0; m < n.optional.length; m++) p[m] = new f(d), p[m].pattern_debug = n.optional[m];
				for (m = 0; m < n.optional.length; m++) p[m].count = p[m].count + 1, g(e, n.optional[m], r, "", o, t, p[m]);
			}
			c.count--, H.debug("Match ends -- success , Branch count now: " + c.count + " for " + c.pattern_debug);
			return;
		}
		var _, y, b = l.length;
		if (o) {
			var x = "match" + h++, S = function(t, i) {
				var l = t.uri.split("#")[0];
				o.nowOrWhenFetched(l, void 0, function(i, l, u) {
					i || console.log("Error following link to <" + t.uri + "> in query: " + l), g(e, n, r, a, o, s, c);
				});
			};
			for (y = 0; y < b; y++) {
				if (_ = l[y], r[_.subject] !== void 0 && r[_.subject].uri && o && o.getState(ve(r[_.subject].uri)) === "unrequested") {
					S(r[_.subject], x);
					return;
				}
				if (r[_.object] !== void 0 && r[_.object].uri && o && o.getState(ve(r[_.object].uri)) === "unrequested") {
					S(r[_.object], x);
					return;
				}
			}
		}
		v(e, n, r, a, o, s, c);
	}, _ = function(e, t) {
		var n = !0, r, i;
		for (r in e) e.hasOwnProperty(r) && t[r] && (i = t[r].test, i && !i(e[r]) && (n = !1));
		return n;
	}, v = function(e, t, n, r, o, c, l) {
		var u = t.statements, d = u.length, f, h, v, y, b, x, S;
		for (f = 0; f < d; f++) S = u[f], p(e, S, n);
		u.sort(m), S = u[0];
		var C = e.formula();
		C.optional = t.optional, C.constraints = t.constraints, C.statements = u.slice(1), H.debug(r + "match2 searching " + S.index.length + " for " + S + "; bindings so far=" + i(n));
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
		], n, e), H.info(r + " From first: " + E.length + ": " + a(E)), v = E.length, h = 0; h < v; h++) if (b = [], x = E[h][0], !_(x, t.constraints)) H.debug("Branch count CS: " + l.count);
		else {
			for (y in x) x.hasOwnProperty(y) && (b[y] = x[y]);
			for (y in n) n.hasOwnProperty(y) && (b[y] = n[y]);
			l.count++, O++, g(e, C, b, r + "  ", o, c, l);
		}
		l.count--, O === 0 && H.debug("Match2 fails completely on " + S), H.debug("Match2 ends, Branch count: " + l.count + " for " + l.pattern_debug), l.count === 0 && (H.debug("Branch finished."), l.reportDone());
	}, y = this;
	H.debug("Query on " + this.statements.length);
	var b = new d(t, r);
	b.count++, e.sync ? g(y, e.pat, e.pat.initBindings, "", n, t, b) : setTimeout(function() {
		g(y, e.pat, e.pat.initBindings, "", n, t, b);
	}, 0);
}
//#endregion
//#region node_modules/rdflib/esm/store.js
var _t = "http://www.w3.org/2002/07/owl#";
function vt(e, t, n, r) {
	var i = e.any(t, n, void 0);
	return i ? (e.equate(i, r), !0) : !1;
}
function yt(e, t, n, r) {
	var i = e.any(void 0, n, r);
	return i ? (e.equate(i, t), !0) : !1;
}
function bt(e, t, n, r, i) {
	e.typeCallback && e.typeCallback(e, r, i);
	var a = e.classActions[e.id(r)], o = !1;
	if (a) for (var s = 0; s < a.length; s++) o ||= a[s](e, t, n, r, i);
	return o;
}
var xt = class e extends ft {
	constructor(e, t = {}) {
		super(void 0, void 0, void 0, void 0, t), s(this, "updater", void 0), s(this, "namespaces", void 0), s(this, "classActions", void 0), s(this, "propertyActions", void 0), s(this, "redirections", void 0), s(this, "aliases", void 0), s(this, "HTTPRedirects", void 0), s(this, "subjectIndex", void 0), s(this, "predicateIndex", void 0), s(this, "objectIndex", void 0), s(this, "whyIndex", void 0), s(this, "index", void 0), s(this, "features", void 0), s(this, "_universalVariables", void 0), s(this, "_existentialVariables", void 0), s(this, "rdfArrayRemove", void 0), s(this, "dataCallbacks", []), s(this, "dataRemovalCallbacks", []), this.propertyActions = {}, this.classActions = {}, this.redirections = [], this.aliases = [], this.HTTPRedirects = [], this.subjectIndex = [], this.predicateIndex = [], this.objectIndex = [], this.whyIndex = [], this.index = [
			this.subjectIndex,
			this.predicateIndex,
			this.objectIndex,
			this.whyIndex
		], this.namespaces = {}, this.features = e || [], this.rdfArrayRemove = t.rdfArrayRemove || Qe, t.dataCallback && (this.dataCallbacks = [t.dataCallback]), t.dataRemovalCallback && (this.dataRemovalCallbacks = [t.dataRemovalCallback]), this.initPropertyActions(this.features);
	}
	static get defaultGraphURI() {
		return de;
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
			var s = new ht("patch");
			s.pat = e.where, s.pat.statements.map(function(e) {
				e.graph = new z(t.value);
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
		this.propertyActions[this.rdfFactory.id(this.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"))] = [bt], dt(e, "sameAs") >= 0 && (this.propertyActions[this.rdfFactory.id(this.rdfFactory.namedNode(`${_t}sameAs`))] = [function(e, t, n, r, i) {
			return e.equate(t, r), !0;
		}]), dt(e, "InverseFunctionalProperty") >= 0 && (this.classActions[this.rdfFactory.id(this.rdfFactory.namedNode(`${_t}InverseFunctionalProperty`))] = [function(e, t, n, r, i) {
			return e.newPropertyAction(t, yt);
		}]), dt(e, "FunctionalProperty") >= 0 && (this.classActions[this.rdfFactory.id(this.rdfFactory.namedNode(`${_t}FunctionalProperty`))] = [function(e, t, n, r, i) {
			return e.newPropertyAction(t, vt);
		}]);
	}
	addStatement(e) {
		return this.add(e.subject, e.predicate, e.object, e.graph), this.statements.length;
	}
	add(e, t, n, r) {
		var i;
		if (arguments.length === 1) {
			if (e instanceof Array) for (i = 0; i < e.length; i++) this.add(e[i]);
			else P(e) ? this.add(e.subject, e.predicate, e.object, e.graph) : j(e) && this.add(e.statements);
			return this;
		}
		var a, o;
		r ||= this.fetcher ? this.fetcher.appNode : this.rdfFactory.defaultGraph(), typeof e == "string" && (e = this.rdfFactory.namedNode(e)), t = pt.fromValue(t);
		let s = pt.fromValue(n);
		if (r = pt.fromValue(r), !re(e)) throw Error("Subject is not a subject type");
		if (!ie(t)) throw Error(`Predicate ${t} is not a predicate type`);
		if (!ne(s)) throw Error(`Object ${s} is not an object type`);
		if (!se(r)) throw Error("Why is not a graph type");
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
			case d: return new k(e.value);
			case h: return e;
			case m: return new fe();
			case g: return e;
			case _: return e;
			case f: return new V(e.value, e.language, e.datatype);
			case u: return new z(e.value);
			case p: return new we(e.value);
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
		return Object.prototype.hasOwnProperty.call(e, "compareTerm") ? e.compareTerm(t) : c[e.termType] < c[t.termType] ? -1 : c[e.termType] > c[t.termType] ? 1 : e.value < t.value ? -1 : +(e.value > t.value);
	}
	copyTo(e, t, n) {
		n ||= [];
		var r = this.statementsMatching(e);
		dt(n, "two-direction") !== -1 && r.concat(this.statementsMatching(void 0, void 0, e));
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
			dt(n, "delete") !== -1 && this.remove(a);
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
		return this.statementsMatching(pt.fromValue(e), pt.fromValue(t), pt.fromValue(n), pt.fromValue(r));
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
		return new we(e);
	}
	nextSymbol(e) {
		for (var t = 0;; t++) {
			var n = e.value + "#n" + t;
			if (!this.mentionsURI(n)) return this.sym(n);
		}
	}
	query(e, t, n, r) {
		return gt.call(this, e, t, n, r);
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
		if (e.sync = !0, gt.call(this, e, n, null, r), !i) throw Error("Sync query should have called done function");
		return t;
	}
	remove(e) {
		if (e instanceof Array) {
			for (var t = 0; t < e.length; t++) this.remove(e[t]);
			return this;
		}
		if (j(e)) return this.remove(e.statements);
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
				i ? e[r] = t.concat(i) : e[r] = t, delete e[n];
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
		if (!(e === "tab" && this.namespaces.tab) && !(e.slice(0, 2) === "ns" || e.slice(0, 7) === "default")) {
			for (let e in this.namespaces) this.namespaces[e] == t && delete this.namespaces[e];
			this.namespaces[e] = t;
		}
	}
	statementsMatching(e, t, n, r, i) {
		var a = [
			e,
			t,
			n,
			r
		], o = [], s = [], c = [], l = [], u, d;
		for (u = 0; u < 4; u++) o[u] = this.canon(pt.fromValue(a[u])), o[u] ? (l.push(u), s[u] = this.id(o[u])) : c.push(u);
		if (l.length === 0) return this.statements;
		if (l.length === 1) return u = l[0], d = this.index[u][s[u]], d && i && d.length > 1 && (d = d.slice(0, 1)), d ||= [], d;
		var f = 1e10, p, m;
		for (m = 0; m < l.length; m++) {
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
		}, st(n, this, e, t, void 0, r);
	}
};
s(xt, "handleRDFType", void 0), xt.handleRDFType = bt;
//#endregion
//#region node_modules/rdflib/esm/lists.js
var St = U("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
function Ct(e, t, n, r) {
	for (let i of e.statementsMatching(n, null, null, r)) {
		let n = new he(t, i.predicate, i.object, r);
		e.remove(i), e.add(n);
	}
	for (let i of e.statementsMatching(null, n, null, r)) e.remove(i), e.add(new he(i.subject, t, i.object, r));
	for (let i of e.statementsMatching(null, null, n, r)) e.remove(i), e.add(new he(i.subject, i.predicate, t, r));
}
function wt(e, t) {
	let n = St("nil");
	for (let r of e.statementsMatching(n, null, null, t)) {
		e.remove(r);
		let n = new le();
		e.add(new he(n, r.predicate, r.object, t));
	}
	for (let r of e.statementsMatching(null, null, n, t)) if (!r.predicate.sameTerm(St("rest"))) {
		e.remove(r);
		let n = new le();
		e.add(new he(r.subject, r.predicate, n, t));
	}
}
function Tt(e, t) {
	function n(r, i, a) {
		let o = e.statementsMatching(r, St("rest"), null, t);
		if (o.length !== 1) throw Error(`Bad list structure: no rest at ${r}`);
		let s = e.statementsMatching(r, St("first"), null, t);
		if (s.length !== 1) throw Error(`Bad list structure: rest but ${s.length} firsts at ${r}`);
		let c = [s[0].object].concat(i), l = a.concat(o).concat(s), u = e.statementsMatching(null, St("rest"), r, t);
		if (u.length === 0) {
			let n = new le(c);
			e.remove(l), Ct(e, n, r, t);
			return;
		}
		if (u.length !== 1) throw Error(`Bad list structure: ${u.length} pres at ${r}`);
		let d = u[0].subject;
		if (d.termType !== "BlankNode") throw Error(`Bad list element node ${d} type: ${d.termType} `);
		n(d, c, l);
	}
	wt(e, t), e.statementsMatching(null, St("rest"), St("nil"), t).forEach((e) => {
		if (e.subject.termType !== "BlankNode") throw Error(`Bad list element node ${e.subject} type: ${e.subject.termType} `);
		n(e.subject, [], []);
	});
}
//#endregion
//#region node_modules/rdflib/esm/n3parser.js
function Et(e) {
	return encodeURI(e);
}
var Dt = {
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
}, Ot = "http://www.w3.org/2000/10/swap/log#", kt = function(e) {
	return e;
}, At = function(e) {
	return e;
}, jt = function(e) {
	if (e.length > 0) throw "missing.js: oops nnonempty dict not imp";
	return [];
}, Mt = function(e) {
	return e.length;
}, Nt = function(e, t, n) {
	if (e.slice === void 0) throw "@@ mising.js: No .slice function for " + e + " of type " + typeof e;
	return n === void 0 || n == null ? e.slice(t) : e.slice(t, n);
}, Pt = Error("dummy error stop iteration"), Ft = function(e) {
	return this.last = 0, this.li = e, this.next = function() {
		if (this.last == this.li.length) throw Pt;
		return this.li[this.last++];
	}, this;
}, It = function(e, t) {
	return e.indexOf(t);
}, Lt = function(e, t) {
	if (!e) throw t ? "python Assertion failed: " + t : "(python) Assertion failed.";
}, Rt = function(e) {
	return String.fromCharCode(e);
};
String.prototype.encode = function(e) {
	if (e != "utf-8") throw "UTF8_converter: can only do utf-8";
	return Dt.encode(this);
}, String.prototype.decode = function(e) {
	if (e != "utf-8") throw "UTF8_converter: can only do utf-8";
	return this;
};
var zt = function(e, t) {
	return xe(t, e);
}, Bt = null, Vt = 0, Ht = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", Ut = "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil", Wt = "http://www.w3.org/2002/07/owl#sameAs", Gt = "#", Kt = "http://www.w3.org/2001/XMLSchema#integer", qt = "http://www.w3.org/2001/XMLSchema#double", Jt = "http://www.w3.org/2001/XMLSchema#decimal", Yt = "http://www.w3.org/2001/XMLSchema#date", Xt = "http://www.w3.org/2001/XMLSchema#dateTime", Zt = "	\r\n !\"#$%&'()*.,+/;<=>?@[\\]^`{|}~", Qt = Zt + ":", $t = /* @__PURE__ */ RegExp("^([-+]?[0-9]+)(\\.[0-9]+)?([eE][-+]?[0-9]+)?", "g"), en = /* @__PURE__ */ RegExp("^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9](T[0-9][0-9]:[0-9][0-9](:[0-9][0-9](\\.[0-9]*)?)?)?Z?"), tn = /* @__PURE__ */ RegExp("[\\s#]"), nn = /* @__PURE__ */ RegExp("[\\\\\\r\\n\\\"]", "g"), rn = /* @__PURE__ */ RegExp("^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*", "g");
function an(e, t) {
	var n = e.charAt(t + 1);
	return n === "" || tn.test(n);
}
function on(e, t, n, r, i, a, o, s) {
	return new sn(e, t, n, r, i, a, o, s);
}
var sn = class {
	constructor(e, t, n, r, i, a, o, s) {
		t === void 0 && (t = null), n === void 0 && (n = ""), r === void 0 && (r = null), i === void 0 && (i = ""), a === void 0 && (a = null), o === void 0 && (o = ""), s === void 0 && (s = null), this._bindings = new jt([]), this._flags = o, n != "" && (Lt(n.indexOf(":") >= 0, "Document URI not absolute: " + n), this._bindings[""] = n + "#"), this._store = e, i && e.setGenPrefix(i), this._thisDoc = n, this.source = e.sym(n), this.lines = 0, this.statementCount = 0, this.hasNil = !1, this.startOfLine = 0, this.previousLine = 0, this._genPrefix = i, this.keywords = new At([
			"a",
			"this",
			"bind",
			"has",
			"is",
			"of",
			"true",
			"false"
		]), this.keywordsSet = 0, this._anonymousNodes = new jt([]), this._variables = new jt([]), this._parentVariables = new jt([]), this._reason = s, this._reason2 = null, r ? this._baseURI = r : n ? this._baseURI = n : this._baseURI = null, Lt(!this._baseURI || this._baseURI.indexOf(":") >= 0), this._genPrefix || (this._thisDoc ? this._genPrefix = this._thisDoc + "#_g" : this._genPrefix = RDFSink_uniqueURI()), t == null ? this._thisDoc ? this._formula = e.formula(n + "#_formula") : this._formula = e.formula() : this._formula = t, this._context = this._formula, this._parentContext = null;
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
			if (n < 0) throw W(this._thisDoc, this.lines, t, r, "expected directive or statement");
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
		else if (dt(this.keywords, e) < 0) return -1;
		var r = n + Mt(e);
		return t.slice(n, r) == e && Zt.indexOf(t.charAt(r)) >= 0 ? r : -1;
	}
	directive(e, t) {
		var n = this.skipSpace(e, t);
		if (n < 0) return n;
		var r = new At([]), n = this.tok("bind", e, t);
		if (n > 0) throw W(this._thisDoc, this.lines, e, t, "keyword bind is obsolete: use @prefix");
		var n = this.tok("keywords", e, t);
		if (n > 0) {
			var t = this.commaSeparatedList(e, n, r, !1);
			if (t < 0) throw W(this._thisDoc, this.lines, e, t, "'@keywords' needs comma separated list of words");
			return this.setKeywords(Nt(r, null, null)), Vt > 80 && this.keywords, t;
		}
		var n = this.tok("forAll", e, t);
		if (n > 0) {
			var t = this.commaSeparatedList(e, n, r, !0);
			if (t < 0) throw W(this._thisDoc, this.lines, e, t, "Bad variable list after @forAll");
			var i = new Ft(r);
			try {
				for (;;) {
					var a = i.next();
					(dt(this._variables, a) < 0 || dt(this._parentVariables, a) >= 0) && (this._variables[a] = this._context.newUniversal(a));
				}
			} catch (e) {
				if (e != Pt) throw e;
			}
			return t;
		}
		var n = this.tok("forSome", e, t);
		if (n > 0) {
			var t = this.commaSeparatedList(e, n, r, this.uri_ref2);
			if (t < 0) throw W(this._thisDoc, this.lines, e, t, "Bad variable list after @forSome");
			var i = new Ft(r);
			try {
				for (;;) {
					var a = i.next();
					this._context.declareExistential(a);
				}
			} catch (e) {
				if (e != Pt) throw e;
			}
			return t;
		}
		var n = this.tok("prefix", e, t);
		if (n >= 0) {
			var o = new At([]), t = this.qname(e, n, o);
			if (t < 0) throw W(this._thisDoc, this.lines, e, n, "expected qname after @prefix");
			var n = this.uri_ref2(e, t, o);
			if (n < 0) throw W(this._thisDoc, this.lines, e, t, "expected <uriref> after @prefix _qname_");
			var s = o[1].uri;
			if (this._baseURI) var s = zt(this._baseURI, s);
			else Lt(s.indexOf(":") >= 0, "With no base URI, cannot handle relative URI for NS");
			return Lt(s.indexOf(":") >= 0), this._bindings[o[0][0]] = s, this.bind(o[0][0], Et(s)), n;
		}
		var n = this.tok("base", e, t);
		if (n >= 0) {
			var o = new At([]), t = this.uri_ref2(e, n, o);
			if (t < 0) throw W(this._thisDoc, this.lines, e, n, "expected <uri> after @base ");
			var s = o[0].uri;
			if (this._baseURI) var s = zt(this._baseURI, s);
			else throw W(this._thisDoc, this.lines, e, n, "With no previous base URI, cannot use relative URI in @base  <" + s + ">");
			return Lt(s.indexOf(":") >= 0), this._baseURI = s, t;
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
		return this.hasNil && this._store.rdfFactory.supports.COLLECTIONS && Tt(this._store, this.source), this._formula;
	}
	makeStatement(e) {
		e[0].add(e[2], e[1], e[3], this.source), (e[2].uri && e[2].uri === Ut || e[3].uri && e[3].uri === Ut) && (this.hasNil = !0), this.statementCount += 1;
	}
	statement(e, t) {
		var n = new At([]), t = this.object(e, t, n);
		if (t < 0) return t;
		var r = this.property_list(e, t, n[0]);
		if (r < 0) throw W(this._thisDoc, this.lines, e, t, "expected propertylist");
		return r;
	}
	subject(e, t, n) {
		return this.item(e, t, n);
	}
	verb(e, t, n) {
		var r = this.skipSpace(e, t);
		if (r < 0) return r;
		var i = new At([]), r = this.tok("has", e, t);
		if (r >= 0) {
			var t = this.prop(e, r, i);
			if (t < 0) throw W(this._thisDoc, this.lines, e, r, "expected property after 'has'");
			return n.push(new kt(["->", i[0]])), t;
		}
		var r = this.tok("is", e, t);
		if (r >= 0) {
			var t = this.prop(e, r, i);
			if (t < 0) throw W(this._thisDoc, this.lines, e, r, "expected <property> after 'is'");
			var r = this.skipSpace(e, t);
			if (r < 0) throw W(this._thisDoc, this.lines, e, t, "End of file found, expected property after 'is'");
			var t = r, r = this.tok("of", e, t);
			if (r < 0) throw W(this._thisDoc, this.lines, e, t, "expected 'of' after 'is' <prop>");
			return n.push(new kt(["<-", i[0]])), r;
		}
		var r = this.tok("a", e, t);
		if (r >= 0) return n.push(new kt(["->", this._store.sym(Ht)])), r;
		if (e.slice(t, t + 2) == "<=") return n.push(new kt(["<-", this._store.sym(Ot + "implies")])), t + 2;
		if (e.slice(t, t + 1) == "=") return e.slice(t + 1, t + 2) == ">" ? (n.push(new kt(["->", this._store.sym(Ot + "implies")])), t + 2) : (n.push(new kt(["->", this._store.sym(Wt)])), t + 1);
		if (e.slice(t, t + 2) == ":=") return n.push(new kt(["->", Ot + "becomes"])), t + 2;
		var r = this.prop(e, t, i);
		if (r >= 0) return n.push(new kt(["->", i[0]])), r;
		if (e.slice(t, t + 2) == ">-" || e.slice(t, t + 2) == "<-") throw W(this._thisDoc, this.lines, e, r, ">- ... -> syntax is obsolete.");
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
			if (i == "." && an(e, r)) break;
			var a = n.pop(), o = this.blankNode(this.here(r)), r = this.node(e, r + 1, n);
			if (r < 0) throw W(this._thisDoc, this.lines, e, r, "EOF found in middle of path syntax");
			var s = n.pop();
			i == "^" ? this.makeStatement(new kt([
				this._context,
				s,
				o,
				a
			])) : this.makeStatement(new kt([
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
			if (a < 0) throw W(this._thisDoc, this.lines, e, t, "EOF after '['");
			if (e.slice(a, a + 1) == "=") {
				var t = a + 1, c = new At([]), a = this.objectList(e, t, c);
				if (a >= 0) {
					var i = c[0];
					if (Mt(c) > 1) {
						var l = new Ft(c);
						try {
							for (;;) {
								var u = l.next();
								this.makeStatement(new kt([
									this._context,
									this._store.sym(Wt),
									i,
									u
								]));
							}
						} catch (e) {
							if (e != Pt) throw e;
						}
					}
					var a = this.skipSpace(e, a);
					if (a < 0) throw W(this._thisDoc, this.lines, e, t, "EOF when objectList expected after [ = ");
					if (e.slice(a, a + 1) == ";") var a = a + 1;
				} else throw W(this._thisDoc, this.lines, e, t, "objectList expected after [= ");
			}
			if (i == null) var i = this.blankNode(s);
			var t = this.property_list(e, a, i);
			if (t < 0) throw W(this._thisDoc, this.lines, e, a, "property_list expected");
			var a = this.skipSpace(e, t);
			if (a < 0) throw W(this._thisDoc, this.lines, e, t, "EOF when ']' expected after [ <propertyList>");
			if (e.slice(a, a + 1) == ".") return n.push(i), a;
			if (e.slice(a, a + 1) != "]") throw W(this._thisDoc, this.lines, e, a, "']' expected");
			return n.push(i), a + 1;
		}
		if (o == "{") {
			var d = e.slice(t + 1, t + 2);
			if (d == "$") {
				t += 1;
				for (var a = t + 1, f = new At([]);;) {
					var t = this.skipSpace(e, a);
					if (t < 0) throw W(this._thisDoc, this.lines, e, t, "needed '$}', found end.");
					if (e.slice(t, t + 2) == "$}") {
						var a = t + 2;
						break;
					}
					if (e.slice(t, t + 1) == ",") t += 1;
					else throw W(this._thisDoc, this.lines, e, t, "expected: ','");
					var p = new At([]), a = this.item(e, t, p);
					if (a < 0) throw W(this._thisDoc, this.lines, e, t, "expected item in set or '$}'");
					f.push(p[0]);
				}
				return n.push(this._store.newSet(f, this._context)), a;
			} else {
				var a = t + 1, m = this._parentContext;
				this._parentContext = this._context;
				var h = this._anonymousNodes, g = this._parentVariables;
				this._parentVariables = this._variables, this._anonymousNodes = new jt([]), this._variables = this._variables.slice();
				var _ = this._reason2;
				if (this._reason2 = Bt, i == null) var i = this._store.formula();
				for (this._context = i;;) {
					var t = this.skipSpace(e, a);
					if (t < 0) throw W(this._thisDoc, this.lines, e, t, "needed '}', found end.");
					if (e.slice(t, t + 1) == "}") {
						var a = t + 1;
						break;
					}
					var a = this.directiveOrStatement(e, t);
					if (a < 0) throw W(this._thisDoc, this.lines, e, t, "expected statement or '}'");
				}
				return this._anonymousNodes = h, this._variables = this._parentVariables, this._parentVariables = g, this._context = this._parentContext, this._reason2 = _, this._parentContext = m, n.push(i.close()), a;
			}
		}
		if (o == "(") {
			var v = this._store.list, d = e.slice(t + 1, t + 2);
			if (d == "$") {
				var v = this._store.newSet;
				t += 1;
			}
			for (var a = t + 1, f = new At([]);;) {
				var t = this.skipSpace(e, a);
				if (t < 0) throw W(this._thisDoc, this.lines, e, t, "needed ')', found end.");
				if (e.slice(t, t + 1) == ")") {
					var a = t + 1;
					break;
				}
				var p = new At([]), a = this.item(e, t, p);
				if (a < 0) throw W(this._thisDoc, this.lines, e, t, "expected item in list or ')'");
				f.push(p[0]);
			}
			return n.push(v(f, this._context)), a;
		}
		var a = this.tok("this", e, t);
		if (a >= 0) throw W(this._thisDoc, this.lines, e, t, "Keyword 'this' was ancient N3. Now use @forSome and @forAll keywords.");
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
			if (r < 0) throw W(this._thisDoc, this.lines, e, t, "EOF found when expected verb in property list");
			if (e.slice(r, r + 2) == ":-") {
				var t = r + 2, i = new At([]), r = this.node(e, t, i, n);
				if (r < 0) throw W(this._thisDoc, this.lines, e, t, "bad {} or () or [] node after :- ");
				var t = r;
				continue;
			}
			var t = r, a = new At([]), r = this.verb(e, t, a);
			if (r <= 0) return t;
			var o = new At([]), t = this.objectList(e, r, o);
			if (t < 0) throw W(this._thisDoc, this.lines, e, r, "objectList expected");
			var s = new Ft(o);
			try {
				for (;;) {
					var c = s.next(), l = a[0], u = l[0], d = l[1];
					u == "->" ? this.makeStatement(new kt([
						this._context,
						d,
						n,
						c
					])) : this.makeStatement(new kt([
						this._context,
						d,
						c,
						n
					]));
				}
			} catch (e) {
				if (e != Pt) throw e;
			}
			var r = this.skipSpace(e, t);
			if (r < 0) throw W(this._thisDoc, this.lines, e, r, "EOF found in list of objects");
			if (e.slice(t, t + 1) != ";") return t;
			var t = t + 1;
		}
	}
	commaSeparatedList(e, t, n, r) {
		var i = this.skipSpace(e, t);
		if (i < 0) throw W(this._thisDoc, this.lines, e, i, "EOF found expecting comma sep list");
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
			if (i < 0) throw W(this._thisDoc, this.lines, e, i, "bad list content");
		}
	}
	objectList(e, t, n) {
		var t = this.object(e, t, n);
		if (t < 0) return -1;
		for (;;) {
			var r = this.skipSpace(e, t);
			if (r < 0) throw W(this._thisDoc, this.lines, e, r, "EOF found after object");
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
		throw W(this._thisDoc, this.lines, e, n, "expected '.' or '}' or ']' at end of statement");
	}
	uri_ref2(e, t, n) {
		var r = new At([]), i = this.qname(e, t, r);
		if (i >= 0) {
			var a = r[0], o = a[0], s = a[1];
			if (o == null) {
				Lt(0, "not used?");
				var c = this._baseURI + Gt;
			} else {
				var c = this._bindings[o];
				if (!c) {
					if (o == "_") return n.push(this.anonymousNode(s)), i;
					throw W(this._thisDoc, this.lines, e, t, "Prefix " + o + " not bound.");
				}
			}
			var l = this._store.sym(c + s);
			return dt(this._variables, l) >= 0 ? n.push(this._variables[l]) : n.push(l), i;
		}
		var t = this.skipSpace(e, t);
		if (t < 0) return -1;
		if (e.charAt(t) == "?") {
			var u = new At([]), i = this.variable(e, t, u);
			return i > 0 ? (n.push(u[0]), i) : -1;
		} else if (e.charAt(t) == "<") {
			for (var t = t + 1, d = t; t < Mt(e);) {
				if (e.charAt(t) == ">") {
					var f = e.slice(d, t);
					if (this._baseURI) var f = zt(this._baseURI, f);
					else Lt(f.indexOf(":") >= 0, "With no base URI, cannot deal with relative URIs");
					if (e.slice(t - 1, t) == "#" && Nt(f, -1, null) != "#") var f = f + "#";
					var l = this._store.sym(f);
					return dt(this._variables, l) >= 0 ? n.push(this._variables[l]) : n.push(l), t + 1;
				}
				var t = t + 1;
			}
			throw W(this._thisDoc, this.lines, e, i, "unterminated URI reference");
		} else if (this.keywordsSet) {
			var u = new At([]), i = this.bareWord(e, t, u);
			if (i < 0) return -1;
			if (dt(this.keywords, u[0]) >= 0) throw W(this._thisDoc, this.lines, e, t, "Keyword \"" + u[0] + "\" not allowed here.");
			return n.push(this._store.sym(this._bindings[""] + u[0])), i;
		} else return -1;
	}
	skipSpace(e, t) {
		for (var n = " \n\r	\f\v\xA0           ​\u2028\u2029　", r = t || 0; r < e.length; r++) {
			var i = e.charAt(r);
			if (n.indexOf(i) < 0) if (e.charAt(r) === "#") for (;; r++) {
				if (r === e.length) return -1;
				if (e.charAt(r) === "\n") {
					this.lines += 1;
					break;
				}
			}
			else return r;
			else e.charAt(r) === "\n" && (this.lines += 1);
		}
		return -1;
	}
	variable(e, t, n) {
		var r = this.skipSpace(e, t);
		if (r < 0 || e.slice(r, r + 1) != "?") return -1;
		var r = r + 1, t = r;
		if ("0123456789-".indexOf(e.charAt(r)) >= 0) throw W(this._thisDoc, this.lines, e, r, "Varible name can't start with '" + e.charAt(r) + "s'");
		for (; t < Mt(e) && Qt.indexOf(e.charAt(t)) < 0;) var t = t + 1;
		if (this._parentContext == null) throw W(this._thisDoc, this.lines, e, r, "Can't use ?xxx syntax for variable in outermost level: " + e.slice(r - 1, t));
		return n.push(this._store.variable(e.slice(r, t))), t;
	}
	bareWord(e, t, n) {
		var r = this.skipSpace(e, t);
		if (r < 0) return -1;
		var i = e.charAt(r);
		if ("0123456789-".indexOf(i) >= 0 || Qt.indexOf(i) >= 0) return -1;
		for (var t = r; t < Mt(e);) {
			var a = e.charAt(t);
			if (a === ".") {
				if (an(e, t)) break;
			} else if (Qt.indexOf(a) >= 0) break;
			var t = t + 1;
		}
		return n.push(e.slice(r, t)), t;
	}
	qname(e, t, n) {
		var t = this.skipSpace(e, t);
		if (t < 0) return -1;
		var r = e.charAt(t);
		if ("0123456789-+".indexOf(r) >= 0) return -1;
		if (Qt.indexOf(r) < 0) for (var i = r, t = t + 1; t < Mt(e);) {
			var r = e.charAt(t);
			if (r === ".") {
				if (an(e, t)) break;
			} else if (Qt.indexOf(r) >= 0) break;
			var i = i + r, t = t + 1;
		}
		else var i = "";
		if (t < Mt(e) && e.charAt(t) == ":") {
			for (var a = i, t = t + 1, i = ""; t < Mt(e);) {
				var r = e.charAt(t);
				if (r === ".") {
					if (an(e, t)) break;
				} else if (Qt.indexOf(r) >= 0) break;
				var i = i + r, t = t + 1;
			}
			return n.push(new kt([a, i])), t;
		} else return i && this.keywordsSet && dt(this.keywords, i) < 0 ? (n.push(new kt(["", i])), t) : -1;
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
				var t = t + Mt(i), a = this.strconst(e, t, i), r = a[0], o = a[1];
				return n.push(this._store.literal(o)), r;
			} else return -1;
		}
	}
	nodeOrLiteral(e, t, n) {
		var r = this.node(e, t, n);
		if (r >= 0) return r;
		var r = this.skipSpace(e, t);
		if (r < 0) return -1;
		var t = r, i = e.charAt(t);
		if ("-+0987654321".indexOf(i) >= 0) {
			en.lastIndex = 0;
			var a = en.exec(e.slice(t));
			if (a != null) {
				var o = a[0];
				r = t + o.length, o.indexOf("T") >= 0 ? n.push(this._store.literal(o, this._store.sym(Xt))) : n.push(this._store.literal(o, this._store.sym(Yt)));
			} else {
				$t.lastIndex = 0;
				var a = $t.exec(e.slice(t));
				if (a == null) throw W(this._thisDoc, this.lines, e, t, "Bad number or date syntax");
				r = t + $t.lastIndex;
				var o = e.slice(t, r);
				o.indexOf("e") >= 0 ? n.push(this._store.literal(parseFloat(o), this._store.sym(qt))) : e.slice(t, r).indexOf(".") >= 0 ? n.push(this._store.literal(parseFloat(o), this._store.sym(Jt))) : n.push(this._store.literal(parseInt(o), this._store.sym(Kt)));
			}
			return r;
		}
		if (e.charAt(t) == "\"") {
			if (e.slice(t, t + 3) == "\"\"\"") var s = "\"\"\"";
			else var s = "\"";
			var t = t + Mt(s), c = null, l = this.strconst(e, t, s), r = l[0], u = l[1], d = null;
			if (e.slice(r, r + 1) == "@") {
				rn.lastIndex = 0;
				var a = rn.exec(e.slice(r + 1));
				if (a == null) throw W(this._thisDoc, startline, e, t, "Bad language code syntax on string literal, after @");
				var t = rn.lastIndex + r + 1, d = e.slice(r + 1, t), r = t;
			}
			if (e.slice(r, r + 2) == "^^") var f = new At([]), r = this.uri_ref2(e, r + 2, f), c = f[0];
			return n.push(this._store.literal(u, d || c)), r;
		} else return -1;
	}
	strconst(e, t, n) {
		for (var r = t, i = "", a = this.lines; r < Mt(e);) {
			var t = r + Mt(n);
			if (e.slice(r, t) == n) return new kt([t, i]);
			if (e.charAt(r) == "\"") {
				var i = i + "\"", r = r + 1;
				continue;
			}
			if (nn.lastIndex = 0, !nn.exec(e.slice(r))) throw W(this._thisDoc, a, e, r, "Closing quote missing in string at ^ in " + e.slice(r - 20, r) + "^" + e.slice(r, r + 20));
			var t = r + nn.lastIndex - 1, i = i + e.slice(r, t), o = e.charAt(t);
			if (o == "\"") {
				var r = t;
				continue;
			} else if (o == "\r") {
				var r = t + 1;
				continue;
			} else if (o == "\n") {
				if (n == "\"") throw W(this._thisDoc, a, e, t, "newline found in string literal");
				this.lines += 1;
				var i = i + o, r = t + 1;
				this.previousLine = this.startOfLine, this.startOfLine = r;
			} else if (o == "\\") {
				var r = t + 1, o = e.slice(r, r + 1);
				if (!o) throw W(this._thisDoc, a, e, t, "unterminated string literal (2)");
				var s = It("abfrtvn\\\"", o);
				if (s >= 0) var i = i + "a\b\f\r	\v\n\\\"".charAt(s), r = r + 1;
				else if (o == "u") var c = this.uEscape(e, r + 1, a), r = c[0], o = c[1], i = i + o;
				else if (o == "U") var c = this.UEscape(e, r + 1, a), r = c[0], o = c[1], i = i + o;
				else throw W(this._thisDoc, this.lines, e, t, "bad escape");
			}
		}
		throw W(this._thisDoc, this.lines, e, t, "unterminated string literal");
	}
	uEscape(e, t, n) {
		for (var r = t, i = 0, a = 0; i < 4;) {
			var o = e.slice(r, r + 1).toLowerCase(), r = r + 1;
			if (o == "") throw W(this._thisDoc, n, e, t, "unterminated string literal(3)");
			var s = It("0123456789abcdef", o);
			if (s < 0) throw W(this._thisDoc, n, e, t, "bad string literal hex escape");
			var a = a * 16 + s, i = i + 1;
		}
		return new kt([r, String.fromCharCode(a)]);
	}
	UEscape(e, t, n) {
		for (var r = t, i = 0, a = "\\U"; i < 8;) {
			var o = e.slice(r, r + 1).toLowerCase(), r = r + 1;
			if (o == "") throw W(this._thisDoc, n, e, t, "unterminated string literal(3)");
			if (It("0123456789abcdef", o) < 0) throw W(this._thisDoc, n, e, t, "bad string literal hex escape");
			var a = a + o, i = i + 1;
		}
		return new kt([r, Rt("0x" + Nt(a, 2, 10) - 0)]);
	}
};
function cn(e, t, n, r, i) {
	this._str = n.encode("utf-8"), this._str = n, this._i = r, this._why = i, this.lines = t, this._uri = e;
}
cn.prototype.toString = function() {
	var e = this._str, t = this._i, n = 0;
	if (t > 60) var r = "...", n = t - 60;
	else var r = "";
	if (Mt(e) - t > 60) var i = "...";
	else var i = "";
	return "Line %i of <%s>: Bad syntax (%s) at ^ in:\n\"%s%s^%s%s\"" % new kt([
		this.lines + 1,
		this._uri,
		this._why,
		r,
		e.slice(n, t),
		e.slice(t, t + 60),
		i
	]);
};
function W(e, t, n, r, i) {
	let a = t + 1, o = "Line " + a + " of <" + e + ">: Bad syntax: " + i + "\nat: \"" + n.slice(r, r + 30) + "\"", s = SyntaxError(o, e, a);
	return s.lineNo = a, s.characterInFile = r, s.syntaxProblem = i, s;
}
//#endregion
//#region node_modules/rdflib/esm/factories/extended-term-factory.js
var ln = {
	...De,
	supports: {
		[Te.collections]: !0,
		[Te.defaultGraphType]: !1,
		[Te.equalsMethod]: !0,
		[Te.identity]: !1,
		[Te.id]: !0,
		[Te.reversibleId]: !1,
		[Te.variableType]: !0
	},
	collection(e) {
		return new le(e);
	},
	id(e) {
		return te(e) ? le.toNT(e) : M(e) ? we.toString(e) : De.id(e);
	},
	termToNQ(e) {
		return e.termType === "Collection" ? le.toNT(e) : De.termToNQ(e);
	}
};
//#endregion
//#region node_modules/rdflib/esm/jsonldparser.js
function un(e, t) {
	return typeof t == "string" ? e.rdfFactory.literal(t) : Object.prototype.hasOwnProperty.call(t, "@list") ? e.rdfFactory.supports.COLLECTIONS === !0 ? fn(e, t["@list"]) : dn(e, t) : Object.prototype.hasOwnProperty.call(t, "@id") ? mn(e, t) : Object.prototype.hasOwnProperty.call(t, "@language") ? e.rdfFactory.literal(t["@value"], t["@language"]) : Object.prototype.hasOwnProperty.call(t, "@type") ? e.rdfFactory.literal(t["@value"], e.rdfFactory.namedNode(t["@type"])) : Object.prototype.hasOwnProperty.call(t, "@value") ? e.rdfFactory.literal(t["@value"]) : e.rdfFactory.literal(t);
}
function dn(e, t) {
	let n = t["@id"] ? mn(e, t) : e.rdfFactory.blankNode(), r = t["@list"].map((t) => un(e, t)), i = ut(e.rdfFactory, n, r);
	return e.addAll(i), n;
}
function fn(e, t) {
	if (!Array.isArray(t)) throw TypeError("Object must be an array");
	return e.rdfFactory.collection(t.map((t) => un(e, t)));
}
async function pn(t, n, r) {
	let i = r && Object.prototype.hasOwnProperty.call(r, "termType") ? r.value : r, a = await import("./jsonld-B61R4iOL.js").then((t) => /* @__PURE__ */ e(t.default));
	return (await (a.default || a).flatten(JSON.parse(t), null, { base: i })).reduce((e, t) => hn(e, r, t), n);
}
function mn(e, t) {
	return t["@id"].startsWith("_:") ? e.rdfFactory.blankNode(t["@id"].substring(2)) : e.rdfFactory.namedNode(t["@id"]);
}
function hn(e, t, n) {
	let r = n["@id"] ? mn(e, n) : e.rdfFactory.blankNode();
	for (let i of Object.keys(n)) {
		if (i === "@id") continue;
		if (i == "@graph") {
			let t = r, a = n[i];
			for (let n = 0; n < a.length; n++) e = hn(e, t, a[n]);
		}
		let a = n[i];
		if (Array.isArray(a)) for (let n = 0; n < a.length; n++) e.addStatement(gn(e, r, i, a[n], t));
		else e.addStatement(gn(e, r, i, a, t));
	}
	return e;
}
function gn(e, t, n, r, i) {
	let a, o;
	return n === "@type" ? (a = e.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), o = e.rdfFactory.namedNode(r)) : (a = e.rdfFactory.namedNode(n), o = un(e, r)), e.rdfFactory.quad(t, a, o, e.rdfFactory.namedNode(i));
}
//#endregion
//#region node_modules/base64-js/index.js
var _n = /* @__PURE__ */ n(((e) => {
	e.byteLength = c, e.toByteArray = u, e.fromByteArray = p;
	for (var t = [], n = [], r = typeof Uint8Array < "u" ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, o = i.length; a < o; ++a) t[a] = i[a], n[i.charCodeAt(a)] = a;
	n[45] = 62, n[95] = 63;
	function s(e) {
		var t = e.length;
		if (t % 4 > 0) throw Error("Invalid string. Length must be a multiple of 4");
		var n = e.indexOf("=");
		n === -1 && (n = t);
		var r = n === t ? 0 : 4 - n % 4;
		return [n, r];
	}
	function c(e) {
		var t = s(e), n = t[0], r = t[1];
		return (n + r) * 3 / 4 - r;
	}
	function l(e, t, n) {
		return (t + n) * 3 / 4 - n;
	}
	function u(e) {
		var t, i = s(e), a = i[0], o = i[1], c = new r(l(e, a, o)), u = 0, d = o > 0 ? a - 4 : a, f;
		for (f = 0; f < d; f += 4) t = n[e.charCodeAt(f)] << 18 | n[e.charCodeAt(f + 1)] << 12 | n[e.charCodeAt(f + 2)] << 6 | n[e.charCodeAt(f + 3)], c[u++] = t >> 16 & 255, c[u++] = t >> 8 & 255, c[u++] = t & 255;
		return o === 2 && (t = n[e.charCodeAt(f)] << 2 | n[e.charCodeAt(f + 1)] >> 4, c[u++] = t & 255), o === 1 && (t = n[e.charCodeAt(f)] << 10 | n[e.charCodeAt(f + 1)] << 4 | n[e.charCodeAt(f + 2)] >> 2, c[u++] = t >> 8 & 255, c[u++] = t & 255), c;
	}
	function d(e) {
		return t[e >> 18 & 63] + t[e >> 12 & 63] + t[e >> 6 & 63] + t[e & 63];
	}
	function f(e, t, n) {
		for (var r, i = [], a = t; a < n; a += 3) r = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (e[a + 2] & 255), i.push(d(r));
		return i.join("");
	}
	function p(e) {
		for (var n, r = e.length, i = r % 3, a = [], o = 16383, s = 0, c = r - i; s < c; s += o) a.push(f(e, s, s + o > c ? c : s + o));
		return i === 1 ? (n = e[r - 1], a.push(t[n >> 2] + t[n << 4 & 63] + "==")) : i === 2 && (n = (e[r - 2] << 8) + e[r - 1], a.push(t[n >> 10] + t[n >> 4 & 63] + t[n << 2 & 63] + "=")), a.join("");
	}
})), vn = /* @__PURE__ */ n(((e) => {
	e.read = function(e, t, n, r, i) {
		var a, o, s = i * 8 - r - 1, c = (1 << s) - 1, l = c >> 1, u = -7, d = n ? i - 1 : 0, f = n ? -1 : 1, p = e[t + d];
		for (d += f, a = p & (1 << -u) - 1, p >>= -u, u += s; u > 0; a = a * 256 + e[t + d], d += f, u -= 8);
		for (o = a & (1 << -u) - 1, a >>= -u, u += r; u > 0; o = o * 256 + e[t + d], d += f, u -= 8);
		if (a === 0) a = 1 - l;
		else if (a === c) return o ? NaN : (p ? -1 : 1) * Infinity;
		else o += 2 ** r, a -= l;
		return (p ? -1 : 1) * o * 2 ** (a - r);
	}, e.write = function(e, t, n, r, i, a) {
		var o, s, c, l = a * 8 - i - 1, u = (1 << l) - 1, d = u >> 1, f = i === 23 ? 2 ** -24 - 2 ** -77 : 0, p = r ? 0 : a - 1, m = r ? 1 : -1, h = +(t < 0 || t === 0 && 1 / t < 0);
		for (t = Math.abs(t), isNaN(t) || t === Infinity ? (s = +!!isNaN(t), o = u) : (o = Math.floor(Math.log(t) / Math.LN2), t * (c = 2 ** -o) < 1 && (o--, c *= 2), o + d >= 1 ? t += f / c : t += f * 2 ** (1 - d), t * c >= 2 && (o++, c /= 2), o + d >= u ? (s = 0, o = u) : o + d >= 1 ? (s = (t * c - 1) * 2 ** i, o += d) : (s = t * 2 ** (d - 1) * 2 ** i, o = 0)); i >= 8; e[n + p] = s & 255, p += m, s /= 256, i -= 8);
		for (o = o << i | s, l += i; l > 0; e[n + p] = o & 255, p += m, o /= 256, l -= 8);
		e[n + p - m] |= h * 128;
	};
})), yn = (/* @__PURE__ */ n(((e) => {
	var t = _n(), n = vn(), r = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
	e.Buffer = s, e.SlowBuffer = v, e.INSPECT_MAX_BYTES = 50;
	var i = 2147483647;
	e.kMaxLength = i, s.TYPED_ARRAY_SUPPORT = a(), !s.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
	function a() {
		try {
			let e = /* @__PURE__ */ new Uint8Array(1), t = { foo: function() {
				return 42;
			} };
			return Object.setPrototypeOf(t, Uint8Array.prototype), Object.setPrototypeOf(e, t), e.foo() === 42;
		} catch {
			return !1;
		}
	}
	Object.defineProperty(s.prototype, "parent", {
		enumerable: !0,
		get: function() {
			if (s.isBuffer(this)) return this.buffer;
		}
	}), Object.defineProperty(s.prototype, "offset", {
		enumerable: !0,
		get: function() {
			if (s.isBuffer(this)) return this.byteOffset;
		}
	});
	function o(e) {
		if (e > i) throw RangeError("The value \"" + e + "\" is invalid for option \"size\"");
		let t = new Uint8Array(e);
		return Object.setPrototypeOf(t, s.prototype), t;
	}
	function s(e, t, n) {
		if (typeof e == "number") {
			if (typeof t == "string") throw TypeError("The \"string\" argument must be of type string. Received type number");
			return d(e);
		}
		return c(e, t, n);
	}
	s.poolSize = 8192;
	function c(e, t, n) {
		if (typeof e == "string") return f(e, t);
		if (ArrayBuffer.isView(e)) return m(e);
		if (e == null) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
		if (ge(e, ArrayBuffer) || e && ge(e.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ge(e, SharedArrayBuffer) || e && ge(e.buffer, SharedArrayBuffer))) return h(e, t, n);
		if (typeof e == "number") throw TypeError("The \"value\" argument must not be of type number. Received type number");
		let r = e.valueOf && e.valueOf();
		if (r != null && r !== e) return s.from(r, t, n);
		let i = g(e);
		if (i) return i;
		if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof e[Symbol.toPrimitive] == "function") return s.from(e[Symbol.toPrimitive]("string"), t, n);
		throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
	}
	s.from = function(e, t, n) {
		return c(e, t, n);
	}, Object.setPrototypeOf(s.prototype, Uint8Array.prototype), Object.setPrototypeOf(s, Uint8Array);
	function l(e) {
		if (typeof e != "number") throw TypeError("\"size\" argument must be of type number");
		if (e < 0) throw RangeError("The value \"" + e + "\" is invalid for option \"size\"");
	}
	function u(e, t, n) {
		return l(e), e <= 0 || t === void 0 ? o(e) : typeof n == "string" ? o(e).fill(t, n) : o(e).fill(t);
	}
	s.alloc = function(e, t, n) {
		return u(e, t, n);
	};
	function d(e) {
		return l(e), o(e < 0 ? 0 : _(e) | 0);
	}
	s.allocUnsafe = function(e) {
		return d(e);
	}, s.allocUnsafeSlow = function(e) {
		return d(e);
	};
	function f(e, t) {
		if ((typeof t != "string" || t === "") && (t = "utf8"), !s.isEncoding(t)) throw TypeError("Unknown encoding: " + t);
		let n = y(e, t) | 0, r = o(n), i = r.write(e, t);
		return i !== n && (r = r.slice(0, i)), r;
	}
	function p(e) {
		let t = e.length < 0 ? 0 : _(e.length) | 0, n = o(t);
		for (let r = 0; r < t; r += 1) n[r] = e[r] & 255;
		return n;
	}
	function m(e) {
		if (ge(e, Uint8Array)) {
			let t = new Uint8Array(e);
			return h(t.buffer, t.byteOffset, t.byteLength);
		}
		return p(e);
	}
	function h(e, t, n) {
		if (t < 0 || e.byteLength < t) throw RangeError("\"offset\" is outside of buffer bounds");
		if (e.byteLength < t + (n || 0)) throw RangeError("\"length\" is outside of buffer bounds");
		let r;
		return r = t === void 0 && n === void 0 ? new Uint8Array(e) : n === void 0 ? new Uint8Array(e, t) : new Uint8Array(e, t, n), Object.setPrototypeOf(r, s.prototype), r;
	}
	function g(e) {
		if (s.isBuffer(e)) {
			let t = _(e.length) | 0, n = o(t);
			return n.length === 0 || e.copy(n, 0, 0, t), n;
		}
		if (e.length !== void 0) return typeof e.length != "number" || _e(e.length) ? o(0) : p(e);
		if (e.type === "Buffer" && Array.isArray(e.data)) return p(e.data);
	}
	function _(e) {
		if (e >= i) throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
		return e | 0;
	}
	function v(e) {
		return +e != e && (e = 0), s.alloc(+e);
	}
	s.isBuffer = function(e) {
		return e != null && e._isBuffer === !0 && e !== s.prototype;
	}, s.compare = function(e, t) {
		if (ge(e, Uint8Array) && (e = s.from(e, e.offset, e.byteLength)), ge(t, Uint8Array) && (t = s.from(t, t.offset, t.byteLength)), !s.isBuffer(e) || !s.isBuffer(t)) throw TypeError("The \"buf1\", \"buf2\" arguments must be one of type Buffer or Uint8Array");
		if (e === t) return 0;
		let n = e.length, r = t.length;
		for (let i = 0, a = Math.min(n, r); i < a; ++i) if (e[i] !== t[i]) {
			n = e[i], r = t[i];
			break;
		}
		return n < r ? -1 : +(r < n);
	}, s.isEncoding = function(e) {
		switch (String(e).toLowerCase()) {
			case "hex":
			case "utf8":
			case "utf-8":
			case "ascii":
			case "latin1":
			case "binary":
			case "base64":
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return !0;
			default: return !1;
		}
	}, s.concat = function(e, t) {
		if (!Array.isArray(e)) throw TypeError("\"list\" argument must be an Array of Buffers");
		if (e.length === 0) return s.alloc(0);
		let n;
		if (t === void 0) for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
		let r = s.allocUnsafe(t), i = 0;
		for (n = 0; n < e.length; ++n) {
			let t = e[n];
			if (ge(t, Uint8Array)) i + t.length > r.length ? (s.isBuffer(t) || (t = s.from(t)), t.copy(r, i)) : Uint8Array.prototype.set.call(r, t, i);
			else if (s.isBuffer(t)) t.copy(r, i);
			else throw TypeError("\"list\" argument must be an Array of Buffers");
			i += t.length;
		}
		return r;
	};
	function y(e, t) {
		if (s.isBuffer(e)) return e.length;
		if (ArrayBuffer.isView(e) || ge(e, ArrayBuffer)) return e.byteLength;
		if (typeof e != "string") throw TypeError("The \"string\" argument must be one of type string, Buffer, or ArrayBuffer. Received type " + typeof e);
		let n = e.length, r = arguments.length > 2 && arguments[2] === !0;
		if (!r && n === 0) return 0;
		let i = !1;
		for (;;) switch (t) {
			case "ascii":
			case "latin1":
			case "binary": return n;
			case "utf8":
			case "utf-8": return de(e).length;
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return n * 2;
			case "hex": return n >>> 1;
			case "base64": return me(e).length;
			default:
				if (i) return r ? -1 : de(e).length;
				t = ("" + t).toLowerCase(), i = !0;
		}
	}
	s.byteLength = y;
	function b(e, t, n) {
		let r = !1;
		if ((t === void 0 || t < 0) && (t = 0), t > this.length || ((n === void 0 || n > this.length) && (n = this.length), n <= 0) || (n >>>= 0, t >>>= 0, n <= t)) return "";
		for (e ||= "utf8";;) switch (e) {
			case "hex": return re(this, t, n);
			case "utf8":
			case "utf-8": return ee(this, t, n);
			case "ascii": return te(this, t, n);
			case "latin1":
			case "binary": return ne(this, t, n);
			case "base64": return k(this, t, n);
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return ie(this, t, n);
			default:
				if (r) throw TypeError("Unknown encoding: " + e);
				e = (e + "").toLowerCase(), r = !0;
		}
	}
	s.prototype._isBuffer = !0;
	function x(e, t, n) {
		let r = e[t];
		e[t] = e[n], e[n] = r;
	}
	s.prototype.swap16 = function() {
		let e = this.length;
		if (e % 2 != 0) throw RangeError("Buffer size must be a multiple of 16-bits");
		for (let t = 0; t < e; t += 2) x(this, t, t + 1);
		return this;
	}, s.prototype.swap32 = function() {
		let e = this.length;
		if (e % 4 != 0) throw RangeError("Buffer size must be a multiple of 32-bits");
		for (let t = 0; t < e; t += 4) x(this, t, t + 3), x(this, t + 1, t + 2);
		return this;
	}, s.prototype.swap64 = function() {
		let e = this.length;
		if (e % 8 != 0) throw RangeError("Buffer size must be a multiple of 64-bits");
		for (let t = 0; t < e; t += 8) x(this, t, t + 7), x(this, t + 1, t + 6), x(this, t + 2, t + 5), x(this, t + 3, t + 4);
		return this;
	}, s.prototype.toString = function() {
		let e = this.length;
		return e === 0 ? "" : arguments.length === 0 ? ee(this, 0, e) : b.apply(this, arguments);
	}, s.prototype.toLocaleString = s.prototype.toString, s.prototype.equals = function(e) {
		if (!s.isBuffer(e)) throw TypeError("Argument must be a Buffer");
		return this === e || s.compare(this, e) === 0;
	}, s.prototype.inspect = function() {
		let t = "", n = e.INSPECT_MAX_BYTES;
		return t = this.toString("hex", 0, n).replace(/(.{2})/g, "$1 ").trim(), this.length > n && (t += " ... "), "<Buffer " + t + ">";
	}, r && (s.prototype[r] = s.prototype.inspect), s.prototype.compare = function(e, t, n, r, i) {
		if (ge(e, Uint8Array) && (e = s.from(e, e.offset, e.byteLength)), !s.isBuffer(e)) throw TypeError("The \"target\" argument must be one of type Buffer or Uint8Array. Received type " + typeof e);
		if (t === void 0 && (t = 0), n === void 0 && (n = e ? e.length : 0), r === void 0 && (r = 0), i === void 0 && (i = this.length), t < 0 || n > e.length || r < 0 || i > this.length) throw RangeError("out of range index");
		if (r >= i && t >= n) return 0;
		if (r >= i) return -1;
		if (t >= n) return 1;
		if (t >>>= 0, n >>>= 0, r >>>= 0, i >>>= 0, this === e) return 0;
		let a = i - r, o = n - t, c = Math.min(a, o), l = this.slice(r, i), u = e.slice(t, n);
		for (let e = 0; e < c; ++e) if (l[e] !== u[e]) {
			a = l[e], o = u[e];
			break;
		}
		return a < o ? -1 : +(o < a);
	};
	function S(e, t, n, r, i) {
		if (e.length === 0) return -1;
		if (typeof n == "string" ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, _e(n) && (n = i ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {
			if (i) return -1;
			n = e.length - 1;
		} else if (n < 0) if (i) n = 0;
		else return -1;
		if (typeof t == "string" && (t = s.from(t, r)), s.isBuffer(t)) return t.length === 0 ? -1 : C(e, t, n, r, i);
		if (typeof t == "number") return t &= 255, typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : C(e, [t], n, r, i);
		throw TypeError("val must be string, number or Buffer");
	}
	function C(e, t, n, r, i) {
		let a = 1, o = e.length, s = t.length;
		if (r !== void 0 && (r = String(r).toLowerCase(), r === "ucs2" || r === "ucs-2" || r === "utf16le" || r === "utf-16le")) {
			if (e.length < 2 || t.length < 2) return -1;
			a = 2, o /= 2, s /= 2, n /= 2;
		}
		function c(e, t) {
			return a === 1 ? e[t] : e.readUInt16BE(t * a);
		}
		let l;
		if (i) {
			let r = -1;
			for (l = n; l < o; l++) if (c(e, l) === c(t, r === -1 ? 0 : l - r)) {
				if (r === -1 && (r = l), l - r + 1 === s) return r * a;
			} else r !== -1 && (l -= l - r), r = -1;
		} else for (n + s > o && (n = o - s), l = n; l >= 0; l--) {
			let n = !0;
			for (let r = 0; r < s; r++) if (c(e, l + r) !== c(t, r)) {
				n = !1;
				break;
			}
			if (n) return l;
		}
		return -1;
	}
	s.prototype.includes = function(e, t, n) {
		return this.indexOf(e, t, n) !== -1;
	}, s.prototype.indexOf = function(e, t, n) {
		return S(this, e, t, n, !0);
	}, s.prototype.lastIndexOf = function(e, t, n) {
		return S(this, e, t, n, !1);
	};
	function w(e, t, n, r) {
		n = Number(n) || 0;
		let i = e.length - n;
		r ? (r = Number(r), r > i && (r = i)) : r = i;
		let a = t.length;
		r > a / 2 && (r = a / 2);
		let o;
		for (o = 0; o < r; ++o) {
			let r = parseInt(t.substr(o * 2, 2), 16);
			if (_e(r)) return o;
			e[n + o] = r;
		}
		return o;
	}
	function T(e, t, n, r) {
		return he(de(t, e.length - n), e, n, r);
	}
	function E(e, t, n, r) {
		return he(fe(t), e, n, r);
	}
	function D(e, t, n, r) {
		return he(me(t), e, n, r);
	}
	function O(e, t, n, r) {
		return he(pe(t, e.length - n), e, n, r);
	}
	s.prototype.write = function(e, t, n, r) {
		if (t === void 0) r = "utf8", n = this.length, t = 0;
		else if (n === void 0 && typeof t == "string") r = t, n = this.length, t = 0;
		else if (isFinite(t)) t >>>= 0, isFinite(n) ? (n >>>= 0, r === void 0 && (r = "utf8")) : (r = n, n = void 0);
		else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
		let i = this.length - t;
		if ((n === void 0 || n > i) && (n = i), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw RangeError("Attempt to write outside buffer bounds");
		r ||= "utf8";
		let a = !1;
		for (;;) switch (r) {
			case "hex": return w(this, e, t, n);
			case "utf8":
			case "utf-8": return T(this, e, t, n);
			case "ascii":
			case "latin1":
			case "binary": return E(this, e, t, n);
			case "base64": return D(this, e, t, n);
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return O(this, e, t, n);
			default:
				if (a) throw TypeError("Unknown encoding: " + r);
				r = ("" + r).toLowerCase(), a = !0;
		}
	}, s.prototype.toJSON = function() {
		return {
			type: "Buffer",
			data: Array.prototype.slice.call(this._arr || this, 0)
		};
	};
	function k(e, n, r) {
		return n === 0 && r === e.length ? t.fromByteArray(e) : t.fromByteArray(e.slice(n, r));
	}
	function ee(e, t, n) {
		n = Math.min(e.length, n);
		let r = [], i = t;
		for (; i < n;) {
			let t = e[i], a = null, o = t > 239 ? 4 : t > 223 ? 3 : t > 191 ? 2 : 1;
			if (i + o <= n) {
				let n, r, s, c;
				switch (o) {
					case 1:
						t < 128 && (a = t);
						break;
					case 2:
						n = e[i + 1], (n & 192) == 128 && (c = (t & 31) << 6 | n & 63, c > 127 && (a = c));
						break;
					case 3:
						n = e[i + 1], r = e[i + 2], (n & 192) == 128 && (r & 192) == 128 && (c = (t & 15) << 12 | (n & 63) << 6 | r & 63, c > 2047 && (c < 55296 || c > 57343) && (a = c));
						break;
					case 4: n = e[i + 1], r = e[i + 2], s = e[i + 3], (n & 192) == 128 && (r & 192) == 128 && (s & 192) == 128 && (c = (t & 15) << 18 | (n & 63) << 12 | (r & 63) << 6 | s & 63, c > 65535 && c < 1114112 && (a = c));
				}
			}
			a === null ? (a = 65533, o = 1) : a > 65535 && (a -= 65536, r.push(a >>> 10 & 1023 | 55296), a = 56320 | a & 1023), r.push(a), i += o;
		}
		return j(r);
	}
	var A = 4096;
	function j(e) {
		let t = e.length;
		if (t <= A) return String.fromCharCode.apply(String, e);
		let n = "", r = 0;
		for (; r < t;) n += String.fromCharCode.apply(String, e.slice(r, r += A));
		return n;
	}
	function te(e, t, n) {
		let r = "";
		n = Math.min(e.length, n);
		for (let i = t; i < n; ++i) r += String.fromCharCode(e[i] & 127);
		return r;
	}
	function ne(e, t, n) {
		let r = "";
		n = Math.min(e.length, n);
		for (let i = t; i < n; ++i) r += String.fromCharCode(e[i]);
		return r;
	}
	function re(e, t, n) {
		let r = e.length;
		(!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
		let i = "";
		for (let r = t; r < n; ++r) i += ve[e[r]];
		return i;
	}
	function ie(e, t, n) {
		let r = e.slice(t, n), i = "";
		for (let e = 0; e < r.length - 1; e += 2) i += String.fromCharCode(r[e] + r[e + 1] * 256);
		return i;
	}
	s.prototype.slice = function(e, t) {
		let n = this.length;
		e = ~~e, t = t === void 0 ? n : ~~t, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), t < e && (t = e);
		let r = this.subarray(e, t);
		return Object.setPrototypeOf(r, s.prototype), r;
	};
	function M(e, t, n) {
		if (e % 1 != 0 || e < 0) throw RangeError("offset is not uint");
		if (e + t > n) throw RangeError("Trying to access beyond buffer length");
	}
	s.prototype.readUintLE = s.prototype.readUIntLE = function(e, t, n) {
		e >>>= 0, t >>>= 0, n || M(e, t, this.length);
		let r = this[e], i = 1, a = 0;
		for (; ++a < t && (i *= 256);) r += this[e + a] * i;
		return r;
	}, s.prototype.readUintBE = s.prototype.readUIntBE = function(e, t, n) {
		e >>>= 0, t >>>= 0, n || M(e, t, this.length);
		let r = this[e + --t], i = 1;
		for (; t > 0 && (i *= 256);) r += this[e + --t] * i;
		return r;
	}, s.prototype.readUint8 = s.prototype.readUInt8 = function(e, t) {
		return e >>>= 0, t || M(e, 1, this.length), this[e];
	}, s.prototype.readUint16LE = s.prototype.readUInt16LE = function(e, t) {
		return e >>>= 0, t || M(e, 2, this.length), this[e] | this[e + 1] << 8;
	}, s.prototype.readUint16BE = s.prototype.readUInt16BE = function(e, t) {
		return e >>>= 0, t || M(e, 2, this.length), this[e] << 8 | this[e + 1];
	}, s.prototype.readUint32LE = s.prototype.readUInt32LE = function(e, t) {
		return e >>>= 0, t || M(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
	}, s.prototype.readUint32BE = s.prototype.readUInt32BE = function(e, t) {
		return e >>>= 0, t || M(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
	}, s.prototype.readBigUInt64LE = ye(function(e) {
		e >>>= 0, V(e, "offset");
		let t = this[e], n = this[e + 7];
		(t === void 0 || n === void 0) && ce(e, this.length - 8);
		let r = t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24, i = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24;
		return BigInt(r) + (BigInt(i) << BigInt(32));
	}), s.prototype.readBigUInt64BE = ye(function(e) {
		e >>>= 0, V(e, "offset");
		let t = this[e], n = this[e + 7];
		(t === void 0 || n === void 0) && ce(e, this.length - 8);
		let r = t * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e], i = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n;
		return (BigInt(r) << BigInt(32)) + BigInt(i);
	}), s.prototype.readIntLE = function(e, t, n) {
		e >>>= 0, t >>>= 0, n || M(e, t, this.length);
		let r = this[e], i = 1, a = 0;
		for (; ++a < t && (i *= 256);) r += this[e + a] * i;
		return i *= 128, r >= i && (r -= 2 ** (8 * t)), r;
	}, s.prototype.readIntBE = function(e, t, n) {
		e >>>= 0, t >>>= 0, n || M(e, t, this.length);
		let r = t, i = 1, a = this[e + --r];
		for (; r > 0 && (i *= 256);) a += this[e + --r] * i;
		return i *= 128, a >= i && (a -= 2 ** (8 * t)), a;
	}, s.prototype.readInt8 = function(e, t) {
		return e >>>= 0, t || M(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
	}, s.prototype.readInt16LE = function(e, t) {
		e >>>= 0, t || M(e, 2, this.length);
		let n = this[e] | this[e + 1] << 8;
		return n & 32768 ? n | 4294901760 : n;
	}, s.prototype.readInt16BE = function(e, t) {
		e >>>= 0, t || M(e, 2, this.length);
		let n = this[e + 1] | this[e] << 8;
		return n & 32768 ? n | 4294901760 : n;
	}, s.prototype.readInt32LE = function(e, t) {
		return e >>>= 0, t || M(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
	}, s.prototype.readInt32BE = function(e, t) {
		return e >>>= 0, t || M(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
	}, s.prototype.readBigInt64LE = ye(function(e) {
		e >>>= 0, V(e, "offset");
		let t = this[e], n = this[e + 7];
		(t === void 0 || n === void 0) && ce(e, this.length - 8);
		let r = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (n << 24);
		return (BigInt(r) << BigInt(32)) + BigInt(t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24);
	}), s.prototype.readBigInt64BE = ye(function(e) {
		e >>>= 0, V(e, "offset");
		let t = this[e], n = this[e + 7];
		(t === void 0 || n === void 0) && ce(e, this.length - 8);
		let r = (t << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
		return (BigInt(r) << BigInt(32)) + BigInt(this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n);
	}), s.prototype.readFloatLE = function(e, t) {
		return e >>>= 0, t || M(e, 4, this.length), n.read(this, e, !0, 23, 4);
	}, s.prototype.readFloatBE = function(e, t) {
		return e >>>= 0, t || M(e, 4, this.length), n.read(this, e, !1, 23, 4);
	}, s.prototype.readDoubleLE = function(e, t) {
		return e >>>= 0, t || M(e, 8, this.length), n.read(this, e, !0, 52, 8);
	}, s.prototype.readDoubleBE = function(e, t) {
		return e >>>= 0, t || M(e, 8, this.length), n.read(this, e, !1, 52, 8);
	};
	function N(e, t, n, r, i, a) {
		if (!s.isBuffer(e)) throw TypeError("\"buffer\" argument must be a Buffer instance");
		if (t > i || t < a) throw RangeError("\"value\" argument is out of bounds");
		if (n + r > e.length) throw RangeError("Index out of range");
	}
	s.prototype.writeUintLE = s.prototype.writeUIntLE = function(e, t, n, r) {
		if (e = +e, t >>>= 0, n >>>= 0, !r) {
			let r = 2 ** (8 * n) - 1;
			N(this, e, t, n, r, 0);
		}
		let i = 1, a = 0;
		for (this[t] = e & 255; ++a < n && (i *= 256);) this[t + a] = e / i & 255;
		return t + n;
	}, s.prototype.writeUintBE = s.prototype.writeUIntBE = function(e, t, n, r) {
		if (e = +e, t >>>= 0, n >>>= 0, !r) {
			let r = 2 ** (8 * n) - 1;
			N(this, e, t, n, r, 0);
		}
		let i = n - 1, a = 1;
		for (this[t + i] = e & 255; --i >= 0 && (a *= 256);) this[t + i] = e / a & 255;
		return t + n;
	}, s.prototype.writeUint8 = s.prototype.writeUInt8 = function(e, t, n) {
		return e = +e, t >>>= 0, n || N(this, e, t, 1, 255, 0), this[t] = e & 255, t + 1;
	}, s.prototype.writeUint16LE = s.prototype.writeUInt16LE = function(e, t, n) {
		return e = +e, t >>>= 0, n || N(this, e, t, 2, 65535, 0), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
	}, s.prototype.writeUint16BE = s.prototype.writeUInt16BE = function(e, t, n) {
		return e = +e, t >>>= 0, n || N(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
	}, s.prototype.writeUint32LE = s.prototype.writeUInt32LE = function(e, t, n) {
		return e = +e, t >>>= 0, n || N(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = e & 255, t + 4;
	}, s.prototype.writeUint32BE = s.prototype.writeUInt32BE = function(e, t, n) {
		return e = +e, t >>>= 0, n || N(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
	};
	function ae(e, t, n, r, i) {
		B(t, r, i, e, n, 7);
		let a = Number(t & BigInt(4294967295));
		e[n++] = a, a >>= 8, e[n++] = a, a >>= 8, e[n++] = a, a >>= 8, e[n++] = a;
		let o = Number(t >> BigInt(32) & BigInt(4294967295));
		return e[n++] = o, o >>= 8, e[n++] = o, o >>= 8, e[n++] = o, o >>= 8, e[n++] = o, n;
	}
	function P(e, t, n, r, i) {
		B(t, r, i, e, n, 7);
		let a = Number(t & BigInt(4294967295));
		e[n + 7] = a, a >>= 8, e[n + 6] = a, a >>= 8, e[n + 5] = a, a >>= 8, e[n + 4] = a;
		let o = Number(t >> BigInt(32) & BigInt(4294967295));
		return e[n + 3] = o, o >>= 8, e[n + 2] = o, o >>= 8, e[n + 1] = o, o >>= 8, e[n] = o, n + 8;
	}
	s.prototype.writeBigUInt64LE = ye(function(e, t = 0) {
		return ae(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
	}), s.prototype.writeBigUInt64BE = ye(function(e, t = 0) {
		return P(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
	}), s.prototype.writeIntLE = function(e, t, n, r) {
		if (e = +e, t >>>= 0, !r) {
			let r = 2 ** (8 * n - 1);
			N(this, e, t, n, r - 1, -r);
		}
		let i = 0, a = 1, o = 0;
		for (this[t] = e & 255; ++i < n && (a *= 256);) e < 0 && o === 0 && this[t + i - 1] !== 0 && (o = 1), this[t + i] = (e / a >> 0) - o & 255;
		return t + n;
	}, s.prototype.writeIntBE = function(e, t, n, r) {
		if (e = +e, t >>>= 0, !r) {
			let r = 2 ** (8 * n - 1);
			N(this, e, t, n, r - 1, -r);
		}
		let i = n - 1, a = 1, o = 0;
		for (this[t + i] = e & 255; --i >= 0 && (a *= 256);) e < 0 && o === 0 && this[t + i + 1] !== 0 && (o = 1), this[t + i] = (e / a >> 0) - o & 255;
		return t + n;
	}, s.prototype.writeInt8 = function(e, t, n) {
		return e = +e, t >>>= 0, n || N(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = e & 255, t + 1;
	}, s.prototype.writeInt16LE = function(e, t, n) {
		return e = +e, t >>>= 0, n || N(this, e, t, 2, 32767, -32768), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
	}, s.prototype.writeInt16BE = function(e, t, n) {
		return e = +e, t >>>= 0, n || N(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
	}, s.prototype.writeInt32LE = function(e, t, n) {
		return e = +e, t >>>= 0, n || N(this, e, t, 4, 2147483647, -2147483648), this[t] = e & 255, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4;
	}, s.prototype.writeInt32BE = function(e, t, n) {
		return e = +e, t >>>= 0, n || N(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
	}, s.prototype.writeBigInt64LE = ye(function(e, t = 0) {
		return ae(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
	}), s.prototype.writeBigInt64BE = ye(function(e, t = 0) {
		return P(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
	});
	function F(e, t, n, r, i, a) {
		if (n + r > e.length || n < 0) throw RangeError("Index out of range");
	}
	function I(e, t, r, i, a) {
		return t = +t, r >>>= 0, a || F(e, t, r, 4, 34028234663852886e22, -34028234663852886e22), n.write(e, t, r, i, 23, 4), r + 4;
	}
	s.prototype.writeFloatLE = function(e, t, n) {
		return I(this, e, t, !0, n);
	}, s.prototype.writeFloatBE = function(e, t, n) {
		return I(this, e, t, !1, n);
	};
	function L(e, t, r, i, a) {
		return t = +t, r >>>= 0, a || F(e, t, r, 8, 17976931348623157e292, -17976931348623157e292), n.write(e, t, r, i, 52, 8), r + 8;
	}
	s.prototype.writeDoubleLE = function(e, t, n) {
		return L(this, e, t, !0, n);
	}, s.prototype.writeDoubleBE = function(e, t, n) {
		return L(this, e, t, !1, n);
	}, s.prototype.copy = function(e, t, n, r) {
		if (!s.isBuffer(e)) throw TypeError("argument should be a Buffer");
		if (n ||= 0, !r && r !== 0 && (r = this.length), t >= e.length && (t = e.length), t ||= 0, r > 0 && r < n && (r = n), r === n || e.length === 0 || this.length === 0) return 0;
		if (t < 0) throw RangeError("targetStart out of bounds");
		if (n < 0 || n >= this.length) throw RangeError("Index out of range");
		if (r < 0) throw RangeError("sourceEnd out of bounds");
		r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);
		let i = r - n;
		return this === e && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, n, r) : Uint8Array.prototype.set.call(e, this.subarray(n, r), t), i;
	}, s.prototype.fill = function(e, t, n, r) {
		if (typeof e == "string") {
			if (typeof t == "string" ? (r = t, t = 0, n = this.length) : typeof n == "string" && (r = n, n = this.length), r !== void 0 && typeof r != "string") throw TypeError("encoding must be a string");
			if (typeof r == "string" && !s.isEncoding(r)) throw TypeError("Unknown encoding: " + r);
			if (e.length === 1) {
				let t = e.charCodeAt(0);
				(r === "utf8" && t < 128 || r === "latin1") && (e = t);
			}
		} else typeof e == "number" ? e &= 255 : typeof e == "boolean" && (e = Number(e));
		if (t < 0 || this.length < t || this.length < n) throw RangeError("Out of range index");
		if (n <= t) return this;
		t >>>= 0, n = n === void 0 ? this.length : n >>> 0, e ||= 0;
		let i;
		if (typeof e == "number") for (i = t; i < n; ++i) this[i] = e;
		else {
			let a = s.isBuffer(e) ? e : s.from(e, r), o = a.length;
			if (o === 0) throw TypeError("The value \"" + e + "\" is invalid for argument \"value\"");
			for (i = 0; i < n - t; ++i) this[i + t] = a[i % o];
		}
		return this;
	};
	var R = {};
	function oe(e, t, n) {
		R[e] = class extends n {
			constructor() {
				super(), Object.defineProperty(this, "message", {
					value: t.apply(this, arguments),
					writable: !0,
					configurable: !0
				}), this.name = `${this.name} [${e}]`, this.stack, delete this.name;
			}
			get code() {
				return e;
			}
			set code(e) {
				Object.defineProperty(this, "code", {
					configurable: !0,
					enumerable: !0,
					value: e,
					writable: !0
				});
			}
			toString() {
				return `${this.name} [${e}]: ${this.message}`;
			}
		};
	}
	oe("ERR_BUFFER_OUT_OF_BOUNDS", function(e) {
		return e ? `${e} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
	}, RangeError), oe("ERR_INVALID_ARG_TYPE", function(e, t) {
		return `The "${e}" argument must be of type number. Received type ${typeof t}`;
	}, TypeError), oe("ERR_OUT_OF_RANGE", function(e, t, n) {
		let r = `The value of "${e}" is out of range.`, i = n;
		return Number.isInteger(n) && Math.abs(n) > 2 ** 32 ? i = se(String(n)) : typeof n == "bigint" && (i = String(n), (n > BigInt(2) ** BigInt(32) || n < -(BigInt(2) ** BigInt(32))) && (i = se(i)), i += "n"), r += ` It must be ${t}. Received ${i}`, r;
	}, RangeError);
	function se(e) {
		let t = "", n = e.length, r = +(e[0] === "-");
		for (; n >= r + 4; n -= 3) t = `_${e.slice(n - 3, n)}${t}`;
		return `${e.slice(0, n)}${t}`;
	}
	function z(e, t, n) {
		V(t, "offset"), (e[t] === void 0 || e[t + n] === void 0) && ce(t, e.length - (n + 1));
	}
	function B(e, t, n, r, i, a) {
		if (e > n || e < t) {
			let r = typeof t == "bigint" ? "n" : "", i;
			throw i = a > 3 ? t === 0 || t === BigInt(0) ? `>= 0${r} and < 2${r} ** ${(a + 1) * 8}${r}` : `>= -(2${r} ** ${(a + 1) * 8 - 1}${r}) and < 2 ** ${(a + 1) * 8 - 1}${r}` : `>= ${t}${r} and <= ${n}${r}`, new R.ERR_OUT_OF_RANGE("value", i, e);
		}
		z(r, i, a);
	}
	function V(e, t) {
		if (typeof e != "number") throw new R.ERR_INVALID_ARG_TYPE(t, "number", e);
	}
	function ce(e, t, n) {
		throw Math.floor(e) === e ? t < 0 ? new R.ERR_BUFFER_OUT_OF_BOUNDS() : new R.ERR_OUT_OF_RANGE(n || "offset", `>= ${+!!n} and <= ${t}`, e) : (V(e, n), new R.ERR_OUT_OF_RANGE(n || "offset", "an integer", e));
	}
	var le = /[^+/0-9A-Za-z-_]/g;
	function ue(e) {
		if (e = e.split("=")[0], e = e.trim().replace(le, ""), e.length < 2) return "";
		for (; e.length % 4 != 0;) e += "=";
		return e;
	}
	function de(e, t) {
		t ||= Infinity;
		let n, r = e.length, i = null, a = [];
		for (let o = 0; o < r; ++o) {
			if (n = e.charCodeAt(o), n > 55295 && n < 57344) {
				if (!i) {
					if (n > 56319) {
						(t -= 3) > -1 && a.push(239, 191, 189);
						continue;
					} else if (o + 1 === r) {
						(t -= 3) > -1 && a.push(239, 191, 189);
						continue;
					}
					i = n;
					continue;
				}
				if (n < 56320) {
					(t -= 3) > -1 && a.push(239, 191, 189), i = n;
					continue;
				}
				n = (i - 55296 << 10 | n - 56320) + 65536;
			} else i && (t -= 3) > -1 && a.push(239, 191, 189);
			if (i = null, n < 128) {
				if (--t < 0) break;
				a.push(n);
			} else if (n < 2048) {
				if ((t -= 2) < 0) break;
				a.push(n >> 6 | 192, n & 63 | 128);
			} else if (n < 65536) {
				if ((t -= 3) < 0) break;
				a.push(n >> 12 | 224, n >> 6 & 63 | 128, n & 63 | 128);
			} else if (n < 1114112) {
				if ((t -= 4) < 0) break;
				a.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, n & 63 | 128);
			} else throw Error("Invalid code point");
		}
		return a;
	}
	function fe(e) {
		let t = [];
		for (let n = 0; n < e.length; ++n) t.push(e.charCodeAt(n) & 255);
		return t;
	}
	function pe(e, t) {
		let n, r, i, a = [];
		for (let o = 0; o < e.length && !((t -= 2) < 0); ++o) n = e.charCodeAt(o), r = n >> 8, i = n % 256, a.push(i), a.push(r);
		return a;
	}
	function me(e) {
		return t.toByteArray(ue(e));
	}
	function he(e, t, n, r) {
		let i;
		for (i = 0; i < r && !(i + n >= t.length || i >= e.length); ++i) t[i + n] = e[i];
		return i;
	}
	function ge(e, t) {
		return e instanceof t || e != null && e.constructor != null && e.constructor.name != null && e.constructor.name === t.name;
	}
	function _e(e) {
		return e !== e;
	}
	var ve = (function() {
		let e = "0123456789abcdef", t = Array(256);
		for (let n = 0; n < 16; ++n) {
			let r = n * 16;
			for (let i = 0; i < 16; ++i) t[r + i] = e[n] + e[i];
		}
		return t;
	})();
	function ye(e) {
		return typeof BigInt > "u" ? be : e;
	}
	function be() {
		throw Error("BigInt not supported");
	}
})))(), bn = "http://www.w3.org/1999/02/22-rdf-syntax-ns#", xn = "http://www.w3.org/2001/XMLSchema#", Sn = "http://www.w3.org/2000/10/swap/", Cn = {
	xsd: {
		decimal: `${xn}decimal`,
		boolean: `${xn}boolean`,
		double: `${xn}double`,
		integer: `${xn}integer`,
		string: `${xn}string`
	},
	rdf: {
		type: `${bn}type`,
		nil: `${bn}nil`,
		first: `${bn}first`,
		rest: `${bn}rest`,
		langString: `${bn}langString`,
		dirLangString: `${bn}dirLangString`,
		reifies: `${bn}reifies`
	},
	owl: { sameAs: "http://www.w3.org/2002/07/owl#sameAs" },
	r: {
		forSome: `${Sn}reify#forSome`,
		forAll: `${Sn}reify#forAll`
	},
	log: {
		implies: `${Sn}log#implies`,
		isImpliedBy: `${Sn}log#isImpliedBy`
	}
}, { xsd: wn } = Cn, Tn = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\([^])/g, En = {
	"\\": "\\",
	"'": "'",
	"\"": "\"",
	n: "\n",
	r: "\r",
	t: "	",
	f: "\f",
	b: "\b",
	_: "_",
	"~": "~",
	".": ".",
	"-": "-",
	"!": "!",
	$: "$",
	"&": "&",
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
}, Dn = /[\x00-\x20<>\\"\{\}\|\^\`]/;
function On(e) {
	return e >= 55296 && e <= 57343;
}
var kn = {
	_iri: !0,
	_unescapedIri: !0,
	_simpleQuotedString: !0,
	_langcode: !0,
	_dircode: !0,
	_blank: !0,
	_newline: !0,
	_comment: !0,
	_whitespace: !0,
	_endOfFile: !0
}, An = /$0^/, jn = class {
	constructor(e) {
		if (this._iri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/, this._unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/, this._simpleQuotedString = /^"([^"\\\r\n]*)"(?=[^"])/, this._simpleApostropheString = /^'([^'\\\r\n]*)'(?=[^'])/, this._langcode = /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9])/i, this._dircode = /^--(ltr)|(rtl)/, this._prefix = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/, this._prefixed = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<>]))/, this._variable = /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<>])/, this._blank = /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<>]))/, this._number = /^[\-+]?(?:(\d+\.\d*|\.?\d+)[eE][\-+]?|\d*(\.)?)\d+(?=\.?[,;:\s#()\[\]\{\}"'<>])/, this._boolean = /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<>])/, this._atKeyword = /^@[a-z]+(?=[\s#<:])/i, this._keyword = /^(?:PREFIX|BASE|VERSION|GRAPH)(?=[\s#<])/i, this._shortPredicates = /^a(?=[\s#()\[\]\{\}"'<>])/, this._newline = /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/, this._comment = /#([^\n\r]*)/, this._whitespace = /^[ \t]+/, this._endOfFile = /^(?:#[^\n\r]*)?$/, e ||= {}, this._isImpliedBy = e.isImpliedBy, this._lineMode = !!e.lineMode) {
			this._n3Mode = !1;
			for (let e in this) !(e in kn) && this[e] instanceof RegExp && (this[e] = An);
		} else this._n3Mode = e.n3 !== !1;
		this.comments = !!e.comments, this._literalClosingPos = 0;
	}
	_tokenizeToEnd(e, t) {
		let n = this._input, r = n.length;
		for (;;) {
			let e, o;
			for (; e = this._newline.exec(n);) this.comments && (o = this._comment.exec(e[0])) && i("comment", o[1], "", this._line, e[0].length), n = n.substr(e[0].length, n.length), r = n.length, this._line++;
			if (!e && (e = this._whitespace.exec(n)) && (n = n.substr(e[0].length, n.length)), this._endOfFile.test(n)) return t && (this.comments && (o = this._comment.exec(n)) && i("comment", o[1], "", this._line, n.length), n = null, i("eof", "", "", this._line, 0)), this._input = n;
			let s = this._line, c = n[0], l = "", u = "", d = "", f = null, p = 0, m = !1;
			switch (c) {
				case "^":
					if (n.length < 3) break;
					if (n[1] === "^") {
						if (this._previousMarker = "^^", n = n.substr(2), n[0] !== "<") {
							m = !0;
							break;
						}
					} else {
						this._n3Mode && (p = 1, l = "^");
						break;
					}
				case "<":
					if (f = this._unescapedIri.exec(n)) l = "IRI", u = f[1];
					else if (f = this._iri.exec(n)) {
						if (u = this._unescape(f[1]), u === null || Dn.test(u)) return a(this);
						l = "IRI";
					} else n.length > 2 && n[1] === "<" && n[2] === "(" ? (l = "<<(", p = 3) : !this._lineMode && n.length > (t ? 1 : 2) && n[1] === "<" ? (l = "<<", p = 2) : this._n3Mode && n.length > 1 && n[1] === "=" && (p = 2, this._isImpliedBy ? (l = "abbreviation", u = "<") : (l = "inverse", u = ">"));
					break;
				case ">":
					n.length > 1 && n[1] === ">" && (l = ">>", p = 2);
					break;
				case "_":
					((f = this._blank.exec(n)) || t && (f = this._blank.exec(`${n} `))) && (l = "blank", d = "_", u = f[1]);
					break;
				case "\"":
					if (f = this._simpleQuotedString.exec(n)) u = f[1];
					else if ({value: u, matchLength: p} = this._parseLiteral(n), u === null) return a(this);
					(f !== null || p !== 0) && (l = "literal", this._literalClosingPos = 0);
					break;
				case "'":
					if (!this._lineMode) {
						if (f = this._simpleApostropheString.exec(n)) u = f[1];
						else if ({value: u, matchLength: p} = this._parseLiteral(n), u === null) return a(this);
						(f !== null || p !== 0) && (l = "literal", this._literalClosingPos = 0);
					}
					break;
				case "?":
					this._n3Mode && (f = this._variable.exec(n)) && (l = "var", u = f[0]);
					break;
				case "@":
					this._previousMarker === "literal" && (f = this._langcode.exec(n)) && f[1] !== "version" ? (l = "langcode", u = f[1]) : (f = this._atKeyword.exec(n)) && (l = f[0]);
					break;
				case ".": if (n.length === 1 ? t : n[1] < "0" || n[1] > "9") {
					l = ".", p = 1;
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
					if (n[1] === "-") {
						this._previousMarker === "langcode" && (f = this._dircode.exec(n)) && (l = "dircode", p = 2, u = f[1] || f[2], p = u.length + 2);
						break;
					}
					(f = this._number.exec(n) || t && (f = this._number.exec(`${n} `))) && (l = "literal", u = f[0], d = typeof f[1] == "string" ? wn.double : typeof f[2] == "string" ? wn.decimal : wn.integer);
					break;
				case "B":
				case "b":
				case "p":
				case "P":
				case "G":
				case "g":
				case "V":
				case "v":
					(f = this._keyword.exec(n)) ? l = f[0].toUpperCase() : m = !0;
					break;
				case "f":
				case "t":
					(f = this._boolean.exec(n)) ? (l = "literal", u = f[0], d = wn.boolean) : m = !0;
					break;
				case "a":
					(f = this._shortPredicates.exec(n)) ? (l = "abbreviation", u = "a") : m = !0;
					break;
				case "=":
					this._n3Mode && n.length > 1 && (l = "abbreviation", n[1] === ">" ? (p = 2, u = ">") : (p = 1, u = "="));
					break;
				case "!": if (!this._n3Mode) break;
				case ")":
					if (!t && (n.length === 1 || n.length === 2 && n[1] === ">")) break;
					if (n.length > 2 && n[1] === ">" && n[2] === ">") {
						l = ")>>", p = 3;
						break;
					}
				case ",":
				case ";":
				case "[":
				case "]":
				case "(":
				case "}":
				case "~":
					this._lineMode || (p = 1, l = c);
					break;
				case "{":
					!this._lineMode && n.length >= 2 && (n[1] === "|" ? (l = "{|", p = 2) : (l = c, p = 1));
					break;
				case "|":
					n.length >= 2 && n[1] === "}" && (l = "|}", p = 2);
					break;
				default: m = !0;
			}
			if (m && ((this._previousMarker === "@prefix" || this._previousMarker === "PREFIX") && (f = this._prefix.exec(n)) ? (l = "prefix", u = f[1] || "") : ((f = this._prefixed.exec(n)) || t && (f = this._prefixed.exec(`${n} `))) && (l = "prefixed", d = f[1] || "", u = this._unescape(f[2]))), this._previousMarker === "^^") switch (l) {
				case "prefixed":
					l = "type";
					break;
				case "IRI":
					l = "typeIRI";
					break;
				default: l = "";
			}
			if (!l) return t || !/^'''|^"""/.test(n) && /\n|\r/.test(n) ? a(this) : this._input = n;
			let h = p || f[0].length, g = i(l, u, d, s, h);
			this.previousToken = g, this._previousMarker = l, n = n.substr(h, n.length);
		}
		function i(t, i, a, o, s) {
			let c = n ? r - n.length : r, l = {
				type: t,
				value: i,
				prefix: a,
				line: o,
				start: c,
				end: c + s
			};
			return e(null, l), l;
		}
		function a(t) {
			e(t._syntaxError(/^\S*/.exec(n)[0]));
		}
	}
	_unescape(e) {
		let t = !1, n = e.replace(Tn, (e, n, r, i) => {
			if (typeof n == "string") {
				let e = Number.parseInt(n, 16);
				return On(e) ? (t = !0, "") : String.fromCharCode(e);
			}
			if (typeof r == "string") {
				let e = Number.parseInt(r, 16);
				return On(e) ? (t = !0, "") : e <= 65535 ? String.fromCharCode(Number.parseInt(r, 16)) : String.fromCharCode(55296 + ((e -= 65536) >> 10), 56320 + (e & 1023));
			}
			return i in En ? En[i] : (t = !0, "");
		});
		return t ? null : n;
	}
	_parseLiteral(e) {
		if (e.length >= 3) {
			let t = e.match(/^(?:"""|"|'''|'|)/)[0], n = t.length, r = Math.max(this._literalClosingPos, n);
			for (; (r = e.indexOf(t, r)) > 0;) {
				let t = 0;
				for (; e[r - t - 1] === "\\";) t++;
				if (t % 2 == 0) {
					let t = e.substring(n, r), i = t.split(/\r\n|\r|\n/).length - 1, a = r + n;
					if (n === 1 && i !== 0 || n === 3 && this._lineMode) break;
					return this._line += i, {
						value: this._unescape(t),
						matchLength: a
					};
				}
				r++;
			}
			this._literalClosingPos = e.length - n + 1;
		}
		return {
			value: "",
			matchLength: 0
		};
	}
	_syntaxError(e) {
		this._input = null;
		let t = /* @__PURE__ */ Error(`Unexpected "${e}" on line ${this._line}.`);
		return t.context = {
			token: void 0,
			line: this._line,
			previousToken: this.previousToken
		}, t;
	}
	_readStartingBom(e) {
		return e.startsWith("﻿") ? e.substr(1) : e;
	}
	tokenize(e, t) {
		if (this._line = 1, typeof e == "string") if (this._input = this._readStartingBom(e), typeof t == "function") queueMicrotask(() => this._tokenizeToEnd(t, !0));
		else {
			let e = [], t;
			if (this._tokenizeToEnd((n, r) => n ? t = n : e.push(r), !0), t) throw t;
			return e;
		}
		else this._pendingBuffer = null, typeof e.setEncoding == "function" && e.setEncoding("utf8"), e.on("data", (e) => {
			this._input !== null && e.length !== 0 && (this._pendingBuffer &&= (e = yn.Buffer.concat([this._pendingBuffer, e]), null), e[e.length - 1] & 128 ? this._pendingBuffer = e : (this._input === void 0 ? this._input = this._readStartingBom(typeof e == "string" ? e : e.toString()) : this._input += e, this._tokenizeToEnd(t, !1)));
		}), e.on("end", () => {
			typeof this._input == "string" && this._tokenizeToEnd(t, !0);
		}), e.on("error", t);
	}
}, { rdf: Mn, xsd: Nn } = Cn, Pn, Fn = 0, In = {
	namedNode: Un,
	blankNode: Wn,
	variable: K,
	literal: G,
	defaultGraph: Gn,
	quad: Kn,
	triple: Kn,
	fromTerm: qn,
	fromQuad: q
}, Ln = class e {
	constructor(e) {
		this.id = e;
	}
	get value() {
		return this.id;
	}
	equals(t) {
		return t instanceof e ? this.id === t.id : !!t && this.termType === t.termType && this.value === t.value;
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
}, Rn = class extends Ln {
	get termType() {
		return "NamedNode";
	}
}, zn = class e extends Ln {
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
		let e = this.id, t = e.lastIndexOf("\""), n = e.lastIndexOf("--");
		return n > t && n + 2 < e.length ? e.substr(n + 2).toLowerCase() : "";
	}
	get datatype() {
		return new Rn(this.datatypeString);
	}
	get datatypeString() {
		let e = this.id, t = e.lastIndexOf("\"") + 1, n = t < e.length ? e[t] : "";
		return n === "^" ? e.substr(t + 2) : n === "@" ? e.indexOf("--", t) > 0 ? Mn.dirLangString : Mn.langString : Nn.string;
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
}, Bn = class extends Ln {
	constructor(e) {
		super(`_:${e}`);
	}
	get termType() {
		return "BlankNode";
	}
	get value() {
		return this.id.substr(2);
	}
}, Vn = class extends Ln {
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
Pn = new class extends Ln {
	constructor() {
		return super(""), Pn || this;
	}
	get termType() {
		return "DefaultGraph";
	}
	equals(e) {
		return this === e || !!e && this.termType === e.termType;
	}
}();
var Hn = class extends Ln {
	constructor(e, t, n, r) {
		super(""), this._subject = e, this._predicate = t, this._object = n, this._graph = r || Pn;
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
function Un(e) {
	return new Rn(e);
}
function Wn(e) {
	return new Bn(e || `n3-${Fn++}`);
}
function G(e, t) {
	if (typeof t == "string") return new zn(`"${e}"@${t.toLowerCase()}`);
	if (t !== void 0 && !("termType" in t)) return new zn(`"${e}"@${t.language.toLowerCase()}${t.direction ? `--${t.direction.toLowerCase()}` : ""}`);
	let n = t ? t.value : "";
	return n === "" && (typeof e == "boolean" ? n = Nn.boolean : typeof e == "number" && (Number.isFinite(e) ? n = Number.isInteger(e) ? Nn.integer : Nn.double : (n = Nn.double, Number.isNaN(e) || (e = e > 0 ? "INF" : "-INF")))), n === "" || n === Nn.string ? new zn(`"${e}"`) : new zn(`"${e}"^^${n}`);
}
function K(e) {
	return new Vn(e);
}
function Gn() {
	return Pn;
}
function Kn(e, t, n, r) {
	return new Hn(e, t, n, r);
}
function qn(e) {
	if (e instanceof Ln) return e;
	switch (e.termType) {
		case "NamedNode": return Un(e.value);
		case "BlankNode": return Wn(e.value);
		case "Variable": return K(e.value);
		case "DefaultGraph": return Pn;
		case "Literal": return G(e.value, e.language || e.datatype);
		case "Quad": return q(e);
		default: throw Error(`Unexpected termType: ${e.termType}`);
	}
}
function q(e) {
	if (e instanceof Hn) return e;
	if (e.termType !== "Quad") throw Error(`Unexpected termType: ${e.termType}`);
	return Kn(qn(e.subject), qn(e.predicate), qn(e.object), qn(e.graph));
}
//#endregion
//#region node_modules/n3/src/N3Parser.js
var Jn = 0, Yn = class e {
	constructor(e) {
		this._contextStack = [], this._graph = null, e ||= {}, this._setBase(e.baseIRI), e.factory && Y(this, e.factory);
		let t = typeof e.format == "string" ? e.format.match(/\w*$/)[0].toLowerCase() : "", n = /turtle/.test(t), r = /trig/.test(t), i = /triple/.test(t), a = /quad/.test(t), o = this._n3Mode = /n3/.test(t), s = i || a;
		(this._supportsNamedGraphs = !(n || o)) || (this._readPredicateOrNamedGraph = this._readPredicate), this._supportsQuads = !(n || r || i || o), this._isImpliedBy = e.isImpliedBy, s && (this._resolveRelativeIRI = (e) => null), this._blankNodePrefix = typeof e.blankNodePrefix == "string" ? e.blankNodePrefix.replace(/^(?!_:)/, "_:") : "", this._lexer = e.lexer || new jn({
			lineMode: s,
			n3: o,
			isImpliedBy: this._isImpliedBy
		}), this._explicitQuantifiers = !!e.explicitQuantifiers, this._parseUnsupportedVersions = !!e.parseUnsupportedVersions, this._version = e.version;
	}
	static _resetBlankNodePrefix() {
		Jn = 0;
	}
	_setBase(e) {
		if (!e) this._base = "", this._basePath = "";
		else {
			let t = e.indexOf("#");
			t >= 0 && (e = e.substr(0, t)), this._base = e, this._basePath = e.indexOf("/") < 0 ? e : e.replace(/[^\/?]*(?:\?.*)?$/, ""), e = e.match(/^(?:([a-z][a-z0-9+.-]*:))?(?:\/\/[^\/]*)?/i), this._baseRoot = e[0], this._baseScheme = e[1];
		}
	}
	_saveContext(e, t, n, r, i) {
		let a = this._n3Mode;
		this._contextStack.push({
			type: e,
			subject: n,
			predicate: r,
			object: i,
			graph: t,
			inverse: a ? this._inversePredicate : !1,
			blankPrefix: a ? this._prefixes._ : "",
			quantified: a ? this._quantified : null
		}), a && (this._inversePredicate = !1, this._prefixes._ = this._graph ? `${this._graph.value}.` : ".", this._quantified = Object.create(this._quantified));
	}
	_restoreContext(e, t) {
		let n = this._contextStack.pop();
		if (!n || n.type !== e) return this._error(`Unexpected ${t.type}`, t);
		this._subject = n.subject, this._predicate = n.predicate, this._object = n.object, this._graph = n.graph, this._n3Mode && (this._inversePredicate = n.inverse, this._prefixes._ = n.blankPrefix, this._quantified = n.quantified);
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
			default: return this._readSubject(e);
		}
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
	_readSubject(e) {
		switch (this._predicate = null, e.type) {
			case "[": return this._saveContext("blank", this._graph, this._subject = this._factory.blankNode(), null, null), this._readBlankNodeHead;
			case "(":
				let t = this._contextStack;
				return (t.length && t[t.length - 1]).type === "<<" ? this._error("Unexpected list in reified triple", e) : (this._saveContext("list", this._graph, this.RDF_NIL, null, null), this._subject = null, this._readListItem);
			case "{": return this._n3Mode ? (this._saveContext("formula", this._graph, this._graph = this._factory.blankNode(), null, null), this._readSubject) : this._error("Unexpected graph", e);
			case "}": return this._readPunctuation(e);
			case "@forSome": return this._n3Mode ? (this._subject = null, this._predicate = this.N3_FORSOME, this._quantifier = "blankNode", this._readQuantifierList) : this._error("Unexpected \"@forSome\"", e);
			case "@forAll": return this._n3Mode ? (this._subject = null, this._predicate = this.N3_FORALL, this._quantifier = "variable", this._readQuantifierList) : this._error("Unexpected \"@forAll\"", e);
			case "literal":
				if (!this._n3Mode) return this._error("Unexpected literal", e);
				if (e.prefix.length === 0) return this._literalValue = e.value, this._completeSubjectLiteral;
				this._subject = this._factory.literal(e.value, this._factory.namedNode(e.prefix));
				break;
			case "<<(": return this._n3Mode ? (this._saveContext("<<(", this._graph, null, null, null), this._graph = null, this._readSubject) : this._error("Disallowed triple term as subject", e);
			case "<<": return this._saveContext("<<", this._graph, null, null, null), this._graph = null, this._readSubject;
			default:
				if ((this._subject = this._readEntity(e)) === void 0) return;
				if (this._n3Mode) return this._getPathReader(this._readPredicateOrNamedGraph);
		}
		return this._readPredicateOrNamedGraph;
	}
	_readPredicate(e) {
		let t = e.type;
		switch (t) {
			case "inverse": this._inversePredicate = !0;
			case "abbreviation":
				this._predicate = this.ABBREVIATIONS[e.value];
				break;
			case ".":
			case "]":
			case "}":
			case "|}": return this._predicate === null ? this._error(`Unexpected ${t}`, e) : (this._subject = null, t === "]" ? this._readBlankNodeTail(e) : this._readPunctuation(e));
			case ";": return this._predicate === null ? this._error("Expected predicate but got ;", e) : this._readPredicate;
			case "[": if (this._n3Mode) return this._saveContext("blank", this._graph, this._subject, this._subject = this._factory.blankNode(), null), this._readBlankNodeHead;
			case "blank": if (!this._n3Mode) return this._error("Disallowed blank node as predicate", e);
			default: if ((this._predicate = this._readEntity(e)) === void 0) return;
		}
		return this._validAnnotation = !0, this._readObject;
	}
	_readObject(e) {
		switch (e.type) {
			case "literal":
				if (e.prefix.length === 0) return this._literalValue = e.value, this._readDataTypeOrLang;
				this._object = this._factory.literal(e.value, this._factory.namedNode(e.prefix));
				break;
			case "[": return this._saveContext("blank", this._graph, this._subject, this._predicate, this._subject = this._factory.blankNode()), this._readBlankNodeHead;
			case "(":
				let t = this._contextStack;
				return (t.length && t[t.length - 1]).type === "<<" ? this._error("Unexpected list in reified triple", e) : (this._saveContext("list", this._graph, this._subject, this._predicate, this.RDF_NIL), this._subject = null, this._readListItem);
			case "{": return this._n3Mode ? (this._saveContext("formula", this._graph, this._subject, this._predicate, this._graph = this._factory.blankNode()), this._readSubject) : this._error("Unexpected graph", e);
			case "<<(": return this._saveContext("<<(", this._graph, this._subject, this._predicate, null), this._graph = null, this._readSubject;
			case "<<": return this._saveContext("<<", this._graph, this._subject, this._predicate, null), this._graph = null, this._readSubject;
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
			return (t.length > 1 && t[t.length - 2]).type === "<<" ? this._error("Unexpected compound blank node expression in reified triple", e) : (this._predicate = null, this._readPredicate(e));
		}
	}
	_readBlankNodeTail(e) {
		if (e.type !== "]") return this._readBlankNodePunctuation(e);
		this._subject !== null && this._emit(this._subject, this._predicate, this._object, this._graph);
		let t = this._predicate === null;
		return this._restoreContext("blank", e), this._object === null ? this._predicate === null ? t ? this._readPredicateOrNamedGraph : this._readPredicateAfterBlank : this._readObject : this._getContextEndReader();
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
				if (this._restoreContext("list", e), a.length !== 0 && a[a.length - 1].type === "list" && this._emit(this._subject, this._predicate, this._object, this._graph), this._predicate === null) {
					if (r = this._readPredicate, this._subject === this.RDF_NIL) return r;
				} else if (r = this._getContextEndReader(), this._object === this.RDF_NIL) return r;
				n = this.RDF_NIL;
				break;
			case "literal":
				e.prefix.length === 0 ? (this._literalValue = e.value, r = this._readListItemDataTypeOrLang) : (t = this._factory.literal(e.value, this._factory.namedNode(e.prefix)), r = this._getContextEndReader());
				break;
			case "{": return this._n3Mode ? (this._saveContext("formula", this._graph, this._subject, this._predicate, this._graph = this._factory.blankNode()), this._readSubject) : this._error("Unexpected graph", e);
			case "<<":
				this._saveContext("<<", this._graph, null, null, null), this._graph = null, r = this._readSubject;
				break;
			default: if ((t = this._readEntity(e)) === void 0) return;
		}
		if (n === null && (this._subject = n = this._factory.blankNode()), e.type === "<<" && (a[a.length - 1].subject = this._subject), i === null ? o.predicate === null ? o.subject = n : o.object = n : this._emit(i, this.RDF_REST, n, this._graph), t !== null) {
			if (this._n3Mode && (e.type === "IRI" || e.type === "prefixed")) return this._saveContext("item", this._graph, n, this.RDF_FIRST, t), this._subject = t, this._predicate = null, this._getPathReader(this._readListItem);
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
		let n = this._factory.literal(this._literalValue), r;
		switch (e.type) {
			case "type":
			case "typeIRI":
				let i = this._readEntity(e);
				if (i === void 0) return;
				if (i.value === Cn.rdf.langString || i.value === Cn.rdf.dirLangString) return this._error("Detected illegal (directional) languaged-tagged string with explicit datatype", e);
				n = this._factory.literal(this._literalValue, i), e = null;
				break;
			case "langcode":
				if (e.value.split("-").some((e) => e.length > 8)) return this._error("Detected language tag with subtag longer than 8 characters", e);
				n = this._factory.literal(this._literalValue, e.value), this._literalLanguage = e.value, e = null, r = this._readDirCode.bind(this, t);
				break;
		}
		return {
			token: e,
			literal: n,
			readCb: r
		};
	}
	_readDirCode(e, t, n) {
		if (n.type === "dircode") {
			let t = this._factory.literal(this._literalValue, {
				language: this._literalLanguage,
				direction: n.value
			});
			e === "subject" ? this._subject = t : this._object = t, this._literalLanguage = void 0, n = null;
		}
		return e === "subject" ? n === null ? this._readPredicateOrNamedGraph : this._readPredicateOrNamedGraph(n) : this._completeObjectLiteralPost(n, t);
	}
	_completeSubjectLiteral(e) {
		let t = this._completeLiteral(e, "subject");
		return this._subject = t.literal, t.readCb ? t.readCb.bind(this, !1) : this._readPredicateOrNamedGraph;
	}
	_completeObjectLiteral(e, t) {
		let n = this._completeLiteral(e, "object");
		if (n) return this._object = n.literal, n.readCb ? n.readCb.bind(this, t) : this._completeObjectLiteralPost(n.token, t);
	}
	_completeObjectLiteralPost(e, t) {
		return t && this._emit(this._subject, this.RDF_FIRST, this._object, this._graph), e === null ? this._getContextEndReader() : (this._readCallback = this._getContextEndReader(), this._readCallback(e));
	}
	_readFormulaTail(e) {
		return e.type === "}" ? (this._subject !== null && this._emit(this._subject, this._predicate, this._object, this._graph), this._restoreContext("formula", e), this._object === null ? this._readPredicate : this._getContextEndReader()) : this._readPunctuation(e);
	}
	_readPunctuation(e) {
		let t, n = this._graph, r = !1, i = this._subject, a = this._inversePredicate;
		switch (e.type) {
			case "}":
				if (this._graph === null) return this._error("Unexpected graph closing", e);
				if (this._n3Mode) return this._readFormulaTail(e);
				this._graph = null;
			case ".":
				this._subject = null, this._tripleTerm = null, t = this._contextStack.length ? this._readSubject : this._readInTopContext, a && (this._inversePredicate = !1);
				break;
			case ";":
				t = this._readPredicate;
				break;
			case ",":
				t = this._readObject;
				break;
			case "~":
				t = this._readReifierInAnnotation, r = !0;
				break;
			case "{|":
				this._subject = this._readTripleTerm(), this._validAnnotation = !1, r = !0, t = this._readPredicate;
				break;
			case "|}":
				if (!this._annotation) return this._error("Unexpected annotation syntax closing", e);
				if (!this._validAnnotation) return this._error("Annotation block can not be empty", e);
				this._subject = null, this._annotation = !1, t = this._readPunctuation;
				break;
			default:
				if (this._supportsQuads && this._graph === null && (n = this._readEntity(e)) !== void 0) {
					t = this._readQuadPunctuation;
					break;
				}
				return this._error(`Expected punctuation to follow "${this._object.id}"`, e);
		}
		if (i !== null && (!r || r && !this._annotation)) {
			let e = this._predicate, t = this._object;
			a ? this._emit(t, e, i, n) : this._emit(i, e, t, n);
		}
		return r && (this._annotation = !0), t;
	}
	_readBlankNodePunctuation(e) {
		let t;
		switch (e.type) {
			case ";":
				t = this._readPredicate;
				break;
			case ",":
				t = this._readObject;
				break;
			default: return this._error(`Expected punctuation to follow "${this._object.id}"`, e);
		}
		return this._emit(this._subject, this._predicate, this._object, this._graph), t;
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
		return this._prefixes[this._prefix] = t.value, this._prefixCallback(this._prefix, t), this._readDeclarationPunctuation;
	}
	_readBaseIRI(e) {
		let t = e.type === "IRI" && this._resolveIRI(e.value);
		return t ? (this._setBase(t), this._readDeclarationPunctuation) : this._error("Expected valid IRI to follow base declaration", e);
	}
	_isValidVersion(t) {
		return this._parseUnsupportedVersions || e.SUPPORTED_VERSIONS.includes(t);
	}
	_readVersion(e) {
		return e.type === "literal" ? e.end - e.start === e.value.length + 2 ? (this._versionCallback(e.value), this._isValidVersion(e.value) ? this._readDeclarationPunctuation : this._error(`Detected unsupported version: "${e.value}"`, e)) : this._error("Version declarations must use single quotes", e) : this._error("Expected literal to follow version declaration", e);
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
		return this._sparqlStyle ? (this._sparqlStyle = !1, this._readInTopContext(e)) : e.type === "." ? this._readInTopContext : this._error("Expected declaration to end with a dot", e);
	}
	_readQuantifierList(e) {
		let t;
		switch (e.type) {
			case "IRI":
			case "prefixed": if ((t = this._readEntity(e, !0)) !== void 0) break;
			default: return this._error(`Unexpected ${e.type}`, e);
		}
		return this._explicitQuantifiers ? (this._subject === null ? this._emit(this._graph || this.DEFAULTGRAPH, this._predicate, this._subject = this._factory.blankNode(), this.QUANTIFIERS_GRAPH) : this._emit(this._subject, this.RDF_REST, this._subject = this._factory.blankNode(), this.QUANTIFIERS_GRAPH), this._emit(this._subject, this.RDF_FIRST, t, this.QUANTIFIERS_GRAPH)) : this._quantified[t.id] = this._factory[this._quantifier](this._factory.blankNode().value), this._readQuantifierPunctuation;
	}
	_readQuantifierPunctuation(e) {
		return e.type === "," ? this._readQuantifierList : (this._explicitQuantifiers && (this._emit(this._subject, this.RDF_REST, this.RDF_NIL, this.QUANTIFIERS_GRAPH), this._subject = null), this._readCallback = this._getContextEndReader(), this._readCallback(e));
	}
	_getPathReader(e) {
		return this._afterPath = e, this._readPath;
	}
	_readPath(e) {
		switch (e.type) {
			case "!": return this._readForwardPath;
			case "^": return this._readBackwardPath;
			default:
				let t = this._contextStack, n = t.length && t[t.length - 1];
				if (n && n.type === "item") {
					let t = this._subject;
					this._restoreContext("item", e), this._emit(this._subject, this.RDF_FIRST, t, this._graph);
				}
				return this._afterPath(e);
		}
	}
	_readForwardPath(e) {
		let t, n, r = this._factory.blankNode();
		if ((n = this._readEntity(e)) !== void 0) return this._predicate === null ? (t = this._subject, this._subject = r) : (t = this._object, this._object = r), this._emit(t, n, r, this._graph), this._readPath;
	}
	_readBackwardPath(e) {
		let t = this._factory.blankNode(), n, r;
		if ((n = this._readEntity(e)) !== void 0) return this._predicate === null ? (r = this._subject, this._subject = t) : (r = this._object, this._object = t), this._emit(t, n, r, this._graph), this._readPath;
	}
	_readTripleTermTail(e) {
		if (e.type !== ")>>") return this._error(`Expected )>> but got ${e.type}`, e);
		let t = this._factory.quad(this._subject, this._predicate, this._object, this._graph || this.DEFAULTGRAPH);
		return this._restoreContext("<<(", e), this._subject === null ? (this._subject = t, this._readPredicate) : (this._object = t, this._getContextEndReader());
	}
	_readReifiedTripleTailOrReifier(e) {
		return e.type === "~" ? this._readReifier : this._readReifiedTripleTail(e);
	}
	_readReifiedTripleTail(e) {
		if (e.type !== ">>") return this._error(`Expected >> but got ${e.type}`, e);
		this._tripleTerm = null;
		let t = this._readTripleTerm();
		this._restoreContext("<<", e);
		let n = this._contextStack, r = n.length && n[n.length - 1];
		return r && r.type === "list" ? (this._emit(this._subject, this.RDF_FIRST, t, this._graph), this._getContextEndReader()) : this._subject === null ? (this._subject = t, this._readPredicateOrReifierTripleEnd) : (this._object = t, this._getContextEndReader());
	}
	_readPredicateOrReifierTripleEnd(e) {
		return e.type === "." ? (this._subject = null, this._readPunctuation(e)) : this._readPredicate(e);
	}
	_readReifier(e) {
		return this._reifier = this._readEntity(e), this._readReifiedTripleTail;
	}
	_readReifierInAnnotation(e) {
		return e.type === "IRI" || e.type === "typeIRI" || e.type === "type" || e.type === "prefixed" || e.type === "blank" || e.type === "var" ? (this._reifier = this._readEntity(e), this._readPunctuation) : (this._readTripleTerm(), this._subject = null, this._readPunctuation(e));
	}
	_readTripleTerm() {
		let e = this._contextStack, t = e.length && e[e.length - 1], n = t ? t.graph : void 0, r = this._reifier || this._factory.blankNode();
		return this._reifier = null, this._tripleTerm = this._tripleTerm || this._factory.quad(this._subject, this._predicate, this._object), this._emit(r, this.RDF_REIFIES, this._tripleTerm, n || this.DEFAULTGRAPH), r;
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
		}
	}
	_emit(e, t, n, r) {
		this._callback(null, this._factory.quad(e, t, n, r || this.DEFAULTGRAPH));
	}
	_error(e, t) {
		let n = /* @__PURE__ */ Error(`${e} on line ${t.line}.`);
		n.context = {
			token: t,
			line: t.line,
			previousToken: this._lexer.previousToken
		}, this._callback(n), this._callback = J;
	}
	_resolveIRI(e) {
		return /^[a-z][a-z0-9+.-]*:/i.test(e) ? e : this._resolveRelativeIRI(e);
	}
	_resolveRelativeIRI(e) {
		if (!e.length) return this._base;
		switch (e[0]) {
			case "#": return this._base + e;
			case "?": return this._base.replace(/(?:\?.*)?$/, e);
			case "/": return (e[1] === "/" ? this._baseScheme : this._baseRoot) + this._removeDotSegments(e);
			default: return /^[^/:]*:/.test(e) ? null : this._removeDotSegments(this._basePath + e);
		}
	}
	_removeDotSegments(e) {
		if (!/(^|\/)\.\.?($|[/#?])/.test(e)) return e;
		let t = e.length, n = "", r = -1, i = -1, a = 0, o = "/";
		for (; r < t;) {
			switch (o) {
				case ":":
					if (i < 0 && e[++r] === "/" && e[++r] === "/") for (; (i = r + 1) < t && e[i] !== "/";) r = i;
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
		let i, a, o, s;
		if (t && (t.onQuad || t.onPrefix || t.onComment || t.onVersion) ? (i = t.onQuad, a = t.onPrefix, o = t.onComment, s = t.onVersion) : (i = t, a = n, s = r), this._readCallback = this._readBeforeTopContext, this._sparqlStyle = !1, this._prefixes = Object.create(null), this._prefixes._ = this._blankNodePrefix ? this._blankNodePrefix.substr(2) : `b${Jn++}_`, this._prefixCallback = a || J, this._versionCallback = s || J, this._inversePredicate = !1, this._quantified = Object.create(null), !i) {
			let t = [], n;
			if (this._callback = (e, r) => {
				e ? n = e : r && t.push(r);
			}, this._lexer.tokenize(e).every((e) => this._readCallback = this._readCallback(e)), n) throw n;
			return t;
		}
		let c = (e, t) => {
			e === null ? this._readCallback &&= this._readCallback(t) : (this._callback(e), this._callback = J);
		};
		o && (this._lexer.comments = !0, c = (e, t) => {
			e === null ? this._readCallback && (t.type === "comment" ? o(t.value) : this._readCallback = this._readCallback(t)) : (this._callback(e), this._callback = J);
		}), this._callback = i, this._lexer.tokenize(e, c);
	}
};
function J() {}
function Y(e, t) {
	e._factory = t, e.DEFAULTGRAPH = t.defaultGraph(), e.RDF_FIRST = t.namedNode(Cn.rdf.first), e.RDF_REST = t.namedNode(Cn.rdf.rest), e.RDF_NIL = t.namedNode(Cn.rdf.nil), e.RDF_REIFIES = t.namedNode(Cn.rdf.reifies), e.N3_FORALL = t.namedNode(Cn.r.forAll), e.N3_FORSOME = t.namedNode(Cn.r.forSome), e.ABBREVIATIONS = {
		a: t.namedNode(Cn.rdf.type),
		"=": t.namedNode(Cn.owl.sameAs),
		">": t.namedNode(Cn.log.implies),
		"<": t.namedNode(Cn.log.isImpliedBy)
	}, e.QUANTIFIERS_GRAPH = t.namedNode("urn:n3:quantifiers");
}
//#endregion
//#region node_modules/rdflib/esm/rdfaparser.js
if (Yn.SUPPORTED_VERSIONS = [
	"1.2",
	"1.2-basic",
	"1.1"
], Y(Yn.prototype, In), Xn === void 0) var Xn = {
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
var Zn = class e {
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
		var i = t === void 0 ? De.namedNode(this.options.base) : this.toRDFNodeObject(t), a, o = this.toRDFNodeObject(n), s;
		a = this.toRDFNodeObject(r), s = De.namedNode(this.options.base), this.kb.add(i, o, a, s);
	}
	ancestorPath(e) {
		for (var t = ""; e && e.nodeType !== Xn.DOCUMENT_NODE;) t = "/" + e.localName + t, e = e.parentNode;
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
		for (var n = this.tokenize(e), r = null, i = 0; i < n.length; i++) n[i][n[i].length - 1] === ":" ? r = n[i].substring(0, n[i].length - 1) : r &&= (t[r] = this.options.base ? xe(n[i], this.options.base) : n[i], null);
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
		t.nodeType === Xn.DOCUMENT_NODE ? (t.baseURI && !n.baseURI && (n.baseURI = t.baseURI), r = t.baseURI, t = t.documentElement, t.baseURI ||= r, this.setContext(t)) : t.parentNode.nodeType === Xn.DOCUMENT_NODE && this.setContext(t);
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
					if (s.length === 0) {
						this.addTriple(o.parent, o.subject, t, {
							type: e.objectURI,
							value: "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil"
						});
						continue;
					}
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
				continue;
			}
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
					h[E] = this.options.base ? xe(D, this.options.base) : D;
				}
			}
			var O = l.getAttributeNode("prefix");
			O && (g ||= (h = this.copyMappings(h), !0), this.parsePrefixMappings(O.value, h));
			var k = null;
			for (let e = 0; !k && e < this.langAttributes.length; e++) k = l.getAttributeNodeNS(this.langAttributes[e].namespaceURI, this.langAttributes[e].localName);
			if (k) {
				let t = e.trim(k.value);
				b = t.length > 0 ? t : null;
			}
			var ee = l.getAttributeNode("rel"), A = l.getAttributeNode("rev"), j = l.getAttributeNode("typeof"), te = l.getAttributeNode("property"), ne = l.getAttributeNode("datatype"), re = this.inHTMLMode ? l.getAttributeNode("datetime") : null, ie = l.getAttributeNode("content"), M = l.getAttributeNode("about"), N = l.getAttributeNode("src"), ae = l.getAttributeNode("resource"), P = l.getAttributeNode("href"), F = l.getAttributeNode("inlist"), I = [], L, R;
			if (ee) {
				R = this.tokenize(ee.value);
				for (let e = 0; e < R.length; e++) L = this.parsePredicate(R[e], x, u.terms, h, r, this.inHTMLMode && te !== null), L && I.push(L);
			}
			var oe = [];
			if (A) {
				R = this.tokenize(A.value);
				for (let e = 0; e < R.length; e++) L = this.parsePredicate(R[e], x, u.terms, h, r, this.inHTMLMode && te), L && oe.push(L);
			}
			if (this.inHTMLMode && (ee || A) && te && (I.length === 0 && (ee = null), oe.length === 0 && (A = null)), ee || A ? (M && (f = this.parseSafeCURIEOrCURIEOrURI(M.value, h, r)), j && (m = f), f || (l.parentNode.nodeType === Xn.DOCUMENT_NODE ? f = a(l.baseURI) : u.parentObject && (f = a(l.parentNode.baseURI) === u.parentObject ? a(l.baseURI) : u.parentObject)), ae && (p = this.parseSafeCURIEOrCURIEOrURI(ae.value, h, r)), p || (P ? p = this.resolveAndNormalize(r, encodeURI(P.value)) : N ? p = this.resolveAndNormalize(r, encodeURI(N.value)) : j && !M && !(this.inXHTMLMode && (l.localName === "head" || l.localName === "body")) && (p = this.newBlankNode())), j && !M && this.inXHTMLMode && (l.localName === "head" || l.localName === "body") ? m = f : j && !M && (m = p)) : te && !ie && !ne ? (M && (f = this.parseSafeCURIEOrCURIEOrURI(M.value, h, r), j && (m = f)), !f && l.parentNode.nodeType === Xn.DOCUMENT_NODE ? (f = a(l.baseURI), j && (m = f)) : !f && u.parentObject && (f = a(l.parentNode.baseURI) === u.parentObject ? a(l.baseURI) : u.parentObject), j && !m && (ae && (m = this.parseSafeCURIEOrCURIEOrURI(ae.value, h, r)), !m && P && (m = this.resolveAndNormalize(r, encodeURI(P.value))), !m && N && (m = this.resolveAndNormalize(r, encodeURI(N.value))), !m && (this.inXHTMLMode || this.inHTMLMode) && (l.localName === "head" || l.localName === "body") && (m = f), m ||= this.newBlankNode(), p = m)) : (M && (f = this.parseSafeCURIEOrCURIEOrURI(M.value, h, r)), !f && ae && (f = this.parseSafeCURIEOrCURIEOrURI(ae.value, h, r)), !f && P && (f = this.resolveAndNormalize(r, encodeURI(P.value))), !f && N && (f = this.resolveAndNormalize(r, encodeURI(N.value))), f || (l.parentNode.nodeType === Xn.DOCUMENT_NODE ? f = a(l.baseURI) : (this.inXHTMLMode || this.inHTMLMode) && (l.localName === "head" || l.localName === "body") ? f = a(l.parentNode.baseURI) === u.parentObject ? a(l.baseURI) : u.parentObject : j ? f = this.newBlankNode() : u.parentObject && (f = a(l.parentNode.baseURI) === u.parentObject ? a(l.baseURI) : u.parentObject, te || (d = !0))), j && (m = f)), f && (M || ae || m)) {
				var se = f;
				j && !M && !ae && p && (se = p), this.newSubjectOrigin(l, se);
			}
			if (m) {
				R = this.tokenize(j.value);
				for (let t = 0; t < R.length; t++) {
					var z = this.parseTermOrCURIEOrAbsURI(R[t], x, u.terms, h, r);
					z && this.addTriple(l, m, e.typeURI, {
						type: e.objectURI,
						value: z
					});
				}
			}
			if (f && f !== u.parentObject && (v = {}, y = !0), p) {
				if (ee && F) for (let t = 0; t < I.length; t++) {
					let n = v[I[t]];
					n || (n = [], v[I[t]] = n), n.push({
						type: e.objectURI,
						value: p
					});
				}
				else if (ee) for (let t = 0; t < I.length; t++) this.addTriple(l, f, I[t], {
					type: e.objectURI,
					value: p
				});
				if (A) for (let t = 0; t < oe.length; t++) this.addTriple(l, p, oe[t], {
					type: e.objectURI,
					value: f
				});
			} else {
				if (f && !p && (ee || A) && (p = this.newBlankNode()), ee && F) for (let e = 0; e < I.length; e++) {
					let t = v[I[e]];
					t || (t = [], v[L] = t), _.push({
						predicate: I[e],
						list: t
					});
				}
				else if (ee) for (let e = 0; e < I.length; e++) _.push({
					predicate: I[e],
					forward: !0
				});
				if (A) for (let e = 0; e < oe.length; e++) _.push({
					predicate: oe[e],
					forward: !1
				});
			}
			if (te) {
				var B = null, V = null;
				ne ? (B = ne.value === "" ? e.PlainLiteralURI : this.parseTermOrCURIEOrAbsURI(ne.value, x, u.terms, h, r), V = re && !ie ? re.value : B === e.XMLLiteralURI || B === e.HTMLLiteralURI ? null : ie ? ie.value : l.textContent) : ie ? (B = e.PlainLiteralURI, V = ie.value) : re ? (V = re.value, B = e.deriveDateTimeType(V), B ||= e.PlainLiteralURI) : !ee && !A && (ae && (V = this.parseSafeCURIEOrCURIEOrURI(ae.value, h, r)), !V && P ? V = this.resolveAndNormalize(r, encodeURI(P.value)) : !V && N && (V = this.resolveAndNormalize(r, encodeURI(N.value))), V && (B = e.objectURI)), B || (j && !M ? (B = e.objectURI, V = m) : (V = l.textContent, this.inHTMLMode && l.localName === "time" && (B = e.deriveDateTimeType(V)), B ||= e.PlainLiteralURI)), R = this.tokenize(te.value);
				for (let t = 0; t < R.length; t++) {
					let n = this.parsePredicate(R[t], x, u.terms, h, r);
					if (n) if (F) {
						let t = v[n];
						t || (t = [], v[n] = t), t.push(B === e.XMLLiteralURI || B === e.HTMLLiteralURI ? {
							type: B,
							value: l.childNodes
						} : {
							type: B || e.PlainLiteralURI,
							value: V,
							language: b
						});
					} else B === e.XMLLiteralURI || B === e.HTMLLiteralURI ? this.addTriple(l, f, n, {
						type: B,
						value: l.childNodes
					}) : this.addTriple(l, f, n, {
						type: B || e.PlainLiteralURI,
						value: V,
						language: b
					});
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
			var ce = null, le = f;
			d ? (ce = this.push(u, u.subject), ce.parentObject = a(l.parentNode.baseURI) === u.parentObject ? a(l.baseURI) : u.parentObject, ce.incomplete = u.incomplete, ce.language = b, ce.prefixes = h, ce.vocabulary = x) : (ce = this.push(u, f), ce.parentObject = p || f || u.subject, ce.prefixes = h, ce.incomplete = _, p && (le = p, v = {}, y = !0), ce.listMapping = v, ce.language = b, ce.vocabulary = x), y && i.unshift({
				parent: l,
				context: u,
				subject: le,
				listMapping: v
			});
			for (var ue = l.lastChild; ue; ue = ue.previousSibling) ue.nodeType === Xn.ELEMENT_NODE && i.unshift({
				current: ue,
				context: ce
			});
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
		return xe(t, e);
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
			if (typeof t == "string") return t.substring(0, 2) === "_:" ? (this.blankNodes[t.substring(2)] === void 0 && (this.blankNodes[t.substring(2)] = new k(t.substring(2))), this.blankNodes[t.substring(2)]) : De.namedNode(t);
			switch (t.type) {
				case e.objectURI: return t.value.substring(0, 2) === "_:" ? (this.blankNodes[t.value.substring(2)] === void 0 && (this.blankNodes[t.value.substring(2)] = new k(t.value.substring(2))), this.blankNodes[t.value.substring(2)]) : De.namedNode(t.value);
				case e.PlainLiteralURI: return new V(t.value, t.language || "");
				case e.XMLLiteralURI:
				case e.HTMLLiteralURI:
					var n = "";
					return Object.keys(t.value).forEach((e) => {
						n += Ge(t.value[e], this.htmlOptions);
					}), new V(n, "", new z(t.type));
				default: return new V(t.value, "", new z(t.type));
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
Zn.XMLLiteralURI = "http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral", Zn.HTMLLiteralURI = "http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML", Zn.PlainLiteralURI = "http://www.w3.org/1999/02/22-rdf-syntax-ns#PlainLiteral", Zn.objectURI = "http://www.w3.org/1999/02/22-rdf-syntax-ns#object", Zn.typeURI = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", Zn.nameChar = "[-A-Z_a-zÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�က0-F.0-9·̀-ͯ‿-⁀]", Zn.nameStartChar = "[A-Za-zÀ-ÖØ-öø-ÿĀ-ıĴ-ľŁ-ňŊ-žƀ-ǃǍ-ǰǴ-ǵǺ-ȗɐ-ʨʻ-ˁΆΈ-ΊΌΎ-ΡΣ-ώϐ-ϖϚϜϞϠϢ-ϳЁ-ЌЎ-яё-ќў-ҁҐ-ӄӇ-ӈӋ-ӌӐ-ӫӮ-ӵӸ-ӹԱ-Ֆՙա-ֆא-תװ-ײء-غف-يٱ-ڷں-ھۀ-ێې-ۓەۥ-ۦअ-हऽक़-ॡঅ-ঌএ-ঐও-নপ-রলশ-হড়-ঢ়য়-ৡৰ-ৱਅ-ਊਏ-ਐਓ-ਨਪ-ਰਲ-ਲ਼ਵ-ਸ਼ਸ-ਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઋઍએ-ઑઓ-નપ-રલ-ળવ-હઽૠଅ-ଌଏ-ଐଓ-ନପ-ରଲ-ଳଶ-ହଽଡ଼-ଢ଼ୟ-ୡஅ-ஊஎ-ஐஒ-கங-சஜஞ-டண-தந-பம-வஷ-ஹఅ-ఌఎ-ఐఒ-నప-ళవ-హౠ-ౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹೞೠ-ೡഅ-ഌഎ-ഐഒ-നപ-ഹൠ-ൡก-ฮะา-ำเ-ๅກ-ຂຄງ-ຈຊຍດ-ທນ-ຟມ-ຣລວສ-ຫອ-ຮະາ-ຳຽເ-ໄཀ-ཇཉ-ཀྵႠ-Ⴥა-ჶᄀᄂ-ᄃᄅ-ᄇᄉᄋ-ᄌᄎ-ᄒᄼᄾᅀᅌᅎᅐᅔ-ᅕᅙᅟ-ᅡᅣᅥᅧᅩᅭ-ᅮᅲ-ᅳᅵᆞᆨᆫᆮ-ᆯᆷ-ᆸᆺᆼ-ᇂᇫᇰᇹḀ-ẛẠ-ỹἀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼΩK-Å℮ↀ-ↂぁ-ゔァ-ヺㄅ-ㄬ가-힣一-龥〇〡-〩_]", Zn.NCNAME = RegExp("^" + Zn.nameStartChar + Zn.nameChar + "*$"), Zn.dateTimeTypes = [
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
var Qn = Zn.parseRDFaDOM, X = class e {
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
				t = xe(t, this.base), this.node = this.store.sym(t), this.nodeType = e;
			},
			loadTriple: function() {
				if (this.parent.parent.collection ? this.parent.parent.node.append(this.node) : this.store.add(this.parent.parent.node, this.parent.node, this.node, this.parser.why), this.parent.rdfid != null) {
					var t = this.store.sym(xe("#" + this.parent.rdfid, this.base));
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
				e == null ? this.node = this.store.bnode() : this.parser.bnodes[e] == null ? this.node = this.parser.bnodes[e] = this.store.bnode() : this.node = this.parser.bnodes[e], this.nodeType = this.NODE, this.isTripleToLoad() && this.loadTriple();
			},
			addArc: function(t) {
				t === e.ns.RDF + "li" && (t = e.ns.RDF + "_" + this.parent.listIndex, this.parent.listIndex++), this.addSymbol(this.ARC, t);
			},
			addLiteral: function(t) {
				this.parent.datatype && this.parent.datatype !== e.ns.RDF + "langString" ? this.node = this.store.literal(t, this.store.sym(this.parent.datatype)) : this.node = this.store.literal(t, this.lang), this.nodeType = this.NODE, this.isTripleToLoad() && this.loadTriple();
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
			else if (r(a) !== e.ns.RDF + "RDF") if (t.parent && t.parent.collection && (t.addCollectionArc(), t = this.buildFrame(t, t.element), t.parent.element = null), !t.parent || !t.parent.nodeType || t.parent.nodeType === t.ARC) {
				var s = this.getAttributeNodeNS(a, e.ns.RDF, "about");
				if (n = this.getAttributeNodeNS(a, e.ns.RDF, "ID"), s && n) throw Error("RDFParser: " + a.nodeName + " has both rdf:id and rdf:about. Halting. Only one of these properties may be specified on a node.");
				if (!s && n) t.addNode("#" + n.nodeValue), a.removeAttributeNode(n);
				else if (s == null && n == null) {
					var c = this.getAttributeNodeNS(a, e.ns.RDF, "nodeID");
					c ? (t.addBNode(c.nodeValue), a.removeAttributeNode(c)) : t.addBNode();
				} else t.addNode(s.nodeValue), a.removeAttributeNode(s);
				var l = this.getAttributeNodeNS(a, e.ns.RDF, "type");
				e.ns.RDF + "Description" !== r(a) && (l = { nodeValue: r(a) }), l != null && (this.store.add(t.node, this.store.sym(e.ns.RDF + "type"), this.store.sym(xe(l.nodeValue, t.base)), this.why), l.nodeName && a.removeAttributeNode(l));
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
				this.base && (c = xe(c, this.base)), this.store.setPrefixForURI(i[s].name.slice(6), c);
			}
			n.removeAttributeNode(i[s]);
		}
		return r;
	}
};
s(X, "ns", {
	RDF: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
	RDFS: "http://www.w3.org/2000/01/rdf-schema#"
}), s(X, "nodeType", {
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
//#endregion
//#region node_modules/rdflib/esm/patch-parser.js
function $n(e, t, n) {
	var r, i, a, o = [
		"INSERT",
		"DELETE",
		"WHERE"
	], s = U("http://www.w3.org/ns/pim/patch#"), c = on(t, t, n, n, null, null, "", null), l = {}, u = function(e, t, n, r, i) {
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
//#endregion
//#region node_modules/rdflib/esm/parse.js
function er(e, t, n, r = "text/turtle", i) {
	r ||= "text/turtle", r = r.split(";")[0];
	try {
		if (r === "text/n3" || r === "text/turtle") on(t, t, n, n, null, null, "", null).loadBuf(e), o();
		else if (r === "application/rdf+xml") new X(t).parse(Ze(e), n, t.sym(n)), o();
		else if (r === "application/xhtml+xml") Qn(Ze(e, { contentType: O }), t, n), o();
		else if (r === "text/html") Qn(Ze(e, { contentType: v }), t, n), o();
		else if (r === "application/sparql-update" || r === "application/sparql-update-single-match") $n(e, t, n), o();
		else if (r === "application/ld+json") pn(e, t, n).then(o).catch(s);
		else if (r === "application/n-quads" || r === "application/nquads") {
			var a = new Yn({ factory: ln });
			c(null, e);
		} else if (r === void 0) throw Error("contentType is undefined");
		else throw Error("Don't know how to parse " + r + " yet");
	} catch (e) {
		s(e);
	}
	er.handled = {
		"text/n3": !0,
		"text/turtle": !0,
		"application/rdf+xml": !0,
		"application/xhtml+xml": !0,
		"text/html": !0,
		"application/sparql-update": !0,
		"application/sparql-update-single-match": !0,
		"application/ld+json": !0,
		"application/nquads": !0,
		"application/n-quads": !0
	};
	function o() {
		if (i) i(null, t);
		else return;
	}
	function s(e) {
		if (r !== "application/ld+json" || r !== "application/n-quads" || r !== "application/nquads") if (i) i(e, t);
		else {
			let t = /* @__PURE__ */ Error("" + e + " while trying to parse <" + n + "> as " + r);
			throw t.cause = e, t;
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
//#endregion
//#region node_modules/rdflib/esm/fetcher.js
var tr = /* @__PURE__ */ e((/* @__PURE__ */ n(((e, t) => {
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
						l.url.indexOf("file://") === 0 && (d.status < 200 || d.status > 599) ? e.status = 200 : e.status = d.status, e.url = "responseURL" in d ? d.responseURL : e.headers.get("X-Request-URL");
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
})))()), nr = {
	"text/n3": !0,
	"text/turtle": !0,
	"application/rdf+xml": !0,
	"application/xhtml+xml": !0,
	"text/html": !0,
	"application/ld+json": !0
}, rr = {
	rdf: T,
	owl: T,
	n3: "text/n3",
	ttl: "text/turtle",
	nt: "text/n3",
	acl: "text/n3",
	html: "text/html",
	xml: "text/xml"
}, ir = (e) => ({
	link: U("http://www.w3.org/2007/ont/link#", e),
	http: U("http://www.w3.org/2007/ont/http#", e),
	httph: U("http://www.w3.org/2007/ont/httph#", e),
	rdf: U("http://www.w3.org/1999/02/22-rdf-syntax-ns#", e),
	rdfs: U("http://www.w3.org/2000/01/rdf-schema#", e),
	dc: U("http://purl.org/dc/elements/1.1/", e),
	ldp: U("http://www.w3.org/ns/ldp#", e)
}), Z = ir(), ar = class {
	constructor(e, t) {
		s(this, "response", void 0), s(this, "dom", void 0), this.response = e, this.dom = t;
	}
};
s(ar, "pattern", void 0);
var or = class extends ar {
	static toString() {
		return "RDFXMLHandler";
	}
	static register(e) {
		e.mediatypes[T] = { q: .9 };
	}
	parse(e, t, n) {
		let r = e.store;
		this.dom ||= Ze(t);
		let i = this.dom.documentElement;
		if (i && i.nodeName === "parsererror") return e.failFetch(n, "Badly formed XML in " + n.resource.value, "parse_error");
		let a = new X(r);
		try {
			a.parse(this.dom, n.original.value, n.original);
		} catch (t) {
			return e.failFetch(n, "Syntax error parsing RDF/XML! " + t, "parse_error");
		}
		return n.noMeta || r.add(n.original, Z.rdf("type"), Z.link("RDFDocument"), e.appNode), e.doneFetch(n, this.response);
	}
};
or.pattern = /* @__PURE__ */ RegExp("application/rdf\\+xml");
var sr = class extends ar {
	static toString() {
		return "XHTMLHandler";
	}
	static register(e) {
		e.mediatypes[O] = { q: .8 };
	}
	parse(e, t, n) {
		let r, i;
		this.dom ||= Ze(t);
		let a = e.store, o = this.dom.getElementsByTagName("title");
		o.length > 0 && a.add(n.resource, Z.dc("title"), a.rdfFactory.literal(o[0].textContent), n.resource);
		let s = this.dom.getElementsByTagName("link");
		for (let t = s.length - 1; t >= 0; t--) r = s[t].getAttribute("rel"), i = !1, r || (r = s[t].getAttribute("rev"), i = !0), r && e.linkData(n.original, r, s[t].getAttribute("href"), n.resource, i);
		let c = this.dom.getElementsByTagName("script");
		for (let e = 0; e < c.length; e++) {
			let t = c[e].getAttribute("type");
			nr[t] && (er(c[e].textContent, a, n.original.value, t), er(c[e].textContent, a, n.original.value, t));
		}
		if (n.noMeta || a.add(n.resource, Z.rdf("type"), Z.link("WebPage"), e.appNode), !n.noRDFa && Qn) try {
			Qn(this.dom, a, n.original.value);
		} catch (t) {
			let r = "Error trying to parse " + n.resource + " as RDFa:\n" + t + ":\n" + t.stack;
			return e.failFetch(n, r, "parse_error");
		}
		return e.doneFetch(n, this.response);
	}
};
sr.pattern = /* @__PURE__ */ RegExp("application/xhtml");
var cr = class e extends ar {
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
		let i = Ze(n);
		for (let a = 0; a < i.childNodes.length; a++) {
			let o = i.childNodes[a];
			if (e.isElement(o)) {
				let e = o.namespaceURI;
				if (e && e === e.rdf) return t.addStatus(r.req, "Has XML root element in the RDF namespace, so assume RDF/XML."), new or(this.response, i).parse(t, n, r);
				break;
			}
		}
		if (i.doctype && i.doctype.name === "html" && i.doctype.publicId.match(/^-\/\/W3C\/\/DTD XHTML/) && i.doctype.systemId.match(/http:\/\/www.w3.org\/TR\/xhtml/)) return t.addStatus(r.req, "Has XHTML DOCTYPE. Switching to XHTML Handler.\n"), new sr(this.response, i).parse(t, n, r);
		let a = i.getElementsByTagName("html")[0];
		if (a) {
			let e = a.getAttribute("xmlns");
			if (e && e.match(/^http:\/\/www.w3.org\/1999\/xhtml/)) return t.addStatus(r.req, "Has a default namespace for XHTML. Switching to XHTMLHandler.\n"), new sr(this.response, i).parse(t, n, r);
		}
		return t.failFetch(r, "Unsupported dialect of XML: not RDF or XHTML namespace, etc.\n" + n.slice(0, 80), 901);
	}
};
cr.pattern = /* @__PURE__ */ RegExp("(text|application)/(.*)xml");
var lr = class extends ar {
	static toString() {
		return "HTMLHandler";
	}
	static register(e) {
		e.mediatypes["text/html"] = { q: .8 };
	}
	parse(e, t, n) {
		let r = e.store;
		if (hr(t)) return e.addStatus(n.req, "Has an XML declaration. We'll assume it's XHTML as the content-type was text/html.\n"), new sr(this.response).parse(e, t, n);
		if (mr(t)) return e.addStatus(n.req, "Has XHTML DOCTYPE. Switching to XHTMLHandler.\n"), new sr(this.response).parse(e, t, n);
		if (gr(t)) return e.addStatus(n.req, "Has default namespace for XHTML, so switching to XHTMLHandler.\n"), new sr(this.response).parse(e, t, n);
		let i = (/* @__PURE__ */ RegExp("<title>([\\s\\S]+?)</title>", "im")).exec(t);
		return i && r.add(n.resource, Z.dc("title"), r.rdfFactory.literal(i[1]), n.resource), r.add(n.resource, Z.rdf("type"), Z.link("WebPage"), e.appNode), e.addStatus(n.req, "non-XML HTML document, not parsed for data."), e.doneFetch(n, this.response);
	}
};
lr.pattern = /* @__PURE__ */ RegExp("text/html");
var ur = class extends ar {
	static toString() {
		return "JsonLdHandler";
	}
	static register(e) {
		e.mediatypes["application/ld+json"] = { q: .9 };
	}
	async parse(e, t, n, r) {
		let i = e.store;
		try {
			return await pn(t, i, n.original.value), e.store.add(n.original, Z.rdf("type"), Z.link("RDFDocument"), e.appNode), e.doneFetch(n, r);
		} catch (t) {
			let i = "Error trying to parse " + n.resource + " as JSON-LD:\n" + t;
			return e.failFetch(n, i, "parse_error", r);
		}
	}
};
ur.pattern = /application\/(ld\+json|activity\+json)/;
var dr = class extends ar {
	static toString() {
		return "TextHandler";
	}
	static register(e) {
		e.mediatypes["text/plain"] = { q: .5 };
	}
	parse(e, t, n) {
		return hr(t) ? (e.addStatus(n.req, "Warning: " + n.resource + " has an XML declaration. We'll assume it's XML but its content-type wasn't XML.\n"), new cr(this.response).parse(e, t, n)) : t.slice(0, 500).match(/xmlns:/) ? (e.addStatus(n.req, "May have an XML namespace. We'll assume it's XML but its content-type wasn't XML.\n"), new cr(this.response).parse(e, t, n)) : (e.addStatus(n.req, "Plain text document, no known RDF semantics."), e.doneFetch(n, this.response));
	}
};
dr.pattern = /* @__PURE__ */ RegExp("text/plain");
var fr = class extends ar {
	static toString() {
		return "N3Handler";
	}
	static register(e) {
		e.mediatypes["text/n3"] = {}, e.mediatypes["text/turtle"] = {};
	}
	parse(e, t, n, r) {
		let i = e.store, a = on(i, i, n.original.value, n.original.value, null, null, "", null);
		try {
			a.loadBuf(t);
		} catch (t) {
			let i = "Error trying to parse " + n.resource + " as Notation3:\n" + t;
			return e.failFetch(n, i, "parse_error", r);
		}
		return e.addStatus(n.req, "N3 parsed: " + a.statementCount + " triples in " + a.lines + " lines."), e.store.add(n.original, Z.rdf("type"), Z.link("RDFDocument"), e.appNode), e.doneFetch(n, this.response);
	}
};
fr.pattern = /* @__PURE__ */ RegExp("(application|text)/(x-)?(rdf\\+)?(n3|turtle)");
var pr = {
	RDFXMLHandler: or,
	XHTMLHandler: sr,
	XMLHandler: cr,
	HTMLHandler: lr,
	TextHandler: dr,
	N3Handler: fr,
	JsonLdHandler: ur
};
function mr(e) {
	let t = e.indexOf("<!DOCTYPE html"), n = e.indexOf(">");
	return t === -1 || n === -1 || t > n ? !1 : e.substr(t, n - t).indexOf("XHTML") !== -1;
}
function hr(e) {
	return !!e.match(/\s*<\?xml\s+version\s*=[^<>]+\?>/);
}
function gr(e) {
	return !!e.match(/[^(<html)]*<html\s+[^<]*xmlns=['"]http:\/\/www.w3.org\/1999\/xhtml["'][^<]*>/);
}
var _r = class e {
	constructor(e, t = {}) {
		s(this, "store", void 0), s(this, "timeout", void 0), s(this, "_fetch", void 0), s(this, "mediatypes", void 0), s(this, "appNode", void 0), s(this, "requested", void 0), s(this, "timeouts", void 0), s(this, "redirectedTo", void 0), s(this, "fetchQueue", void 0), s(this, "fetchCallbacks", void 0), s(this, "nonexistent", void 0), s(this, "lookedUp", void 0), s(this, "handlers", void 0), s(this, "ns", void 0), s(this, "fireCallbacks", void 0), this.store = e || new xt(), this.ns = ir(this.store.rdfFactory), this.timeout = t.timeout || 3e4;
		let n = t.fetch || typeof global < "u" && (global.solidFetcher || global.solidFetch) || typeof window < "u" && (window.solidFetcher || window.solidFetch) || tr.default;
		if (!n) throw Error("No _fetch function available for Fetcher");
		typeof window < "u" && n === window.fetch ? this._fetch = n.bind(window) : typeof global < "u" && n === global.fetch ? this._fetch = n.bind(global) : this._fetch = n, this.appNode = this.store.sym("chrome://TheCurrentSession"), this.store.fetcher = this, this.requested = {}, this.timeouts = {}, this.redirectedTo = {}, this.fetchQueue = {}, this.fetchCallbacks = {}, this.nonexistent = {}, this.lookedUp = {}, this.handlers = [], this.mediatypes = {
			"image/*": { q: .9 },
			"*/*": { q: .1 }
		}, Ue(this, [
			"request",
			"fail",
			"refresh",
			"retract",
			"done"
		]), Object.keys(t.handlers || pr).map((e) => this.addHandler(pr[e]));
	}
	static crossSiteProxy(t) {
		if (e.crossSiteProxyTemplate) return e.crossSiteProxyTemplate.replace("{uri}", encodeURIComponent(t));
	}
	static offlineOverride(e) {
		let t = e;
		var n;
		return typeof window < "u" && window.panes && (n = window.panes.UI) && n.preferences && n.preferences.get("offlineModeUsingLocalhost") && t.slice(0, 7) === "http://" && t.slice(7, 17) !== "localhost/" && (t = "http://localhost/" + t.slice(7), H.warn("Localhost kludge for offline use: actually getting <" + t + ">")), t;
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
		let t = Se(e);
		return t === "tel" || t === "mailto" || t === "urn";
	}
	static setCredentials(e, t = {}) {
		t.credentials === void 0 && (t.withCredentials === void 0 ? t.credentials = "include" : t.credentials = t.withCredentials ? "include" : "omit");
	}
	load(e, t = {}) {
		if (t = Object.assign({}, t), e instanceof Array) return Promise.all(e.map((e) => this.load(e, Object.assign({}, t))));
		let n = ee(e);
		n = n.split("#")[0], t = this.initFetchOptions(n, t);
		let r = this.appNode, i = this.store, a = i.statementsMatching(void 0, this.ns.link("requestedURI"), i.sym(n), r).map((e) => e.subject);
		for (let e of a) {
			let n = i.any(e, this.ns.link("response"), null, r);
			if (n != null) {
				let e = i.statementsMatching(n, this.ns.link("outOfDate"), !0, r);
				i.remove(e), t.force = !0, t.clearPreviousData = !0;
			}
		}
		let o = this.initFetchOptions(n, t);
		return this.pendingFetchPromise(n, o.baseURI, o);
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
		!n.method || n.method.toUpperCase() === "GET" || (n.force = !0), n.resource = r.rdfFactory.namedNode(t), n.baseURI = n.baseURI || t, n.original = r.rdfFactory.namedNode(n.baseURI), n.req = r.bnode(), n.headers = n.headers || {}, n.contentType && (n.headers["content-type"] = n.contentType), n.force && (n.cache = "no-cache");
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
					headers: new tr.Headers(),
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
				headers: new tr.Headers(),
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
		let i = ee(e);
		typeof t == "function" ? n = t : t === void 0 || (F(t) ? r.referringTerm = t : r = t), this.load(i, r).then((e) => {
			if (n) if (e) if (e.ok) n(!0, "OK", e);
			else {
				let t = "HTTP error: Status " + e.status + " (" + e.statusText + ")";
				e.responseText && (t += " " + e.responseText), n(!1, t, e);
			}
			else n(!1, "@@ nowOrWhenFetched:  no response object!");
		}, function(e) {
			var t = e.message || e.statusText;
			t = "Failed to load  <" + i + "> " + t, e.response && e.response.status && (t += " status: " + e.response.status), n(!1, t, e.response);
		});
	}
	addStatus(e, t) {
		let n = /* @__PURE__ */ new Date();
		t = "[" + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds() + "." + n.getMilliseconds() + "] " + t;
		let r = this.store, i = r.the(e, this.ns.link("status"));
		te(i) ? i.append(r.rdfFactory.literal(t)) : H.warn("web.js: No list to add to: " + i + "," + t);
	}
	failFetch(e, t, n, r) {
		this.addStatus(e.req, t), e.noMeta || this.store.add(e.original, this.ns.link("error"), this.store.rdfFactory.literal(t));
		let i = (e.method || "GET").toUpperCase();
		(i === "GET" || i === "HEAD") && (e.resource.equals(e.original), this.requested[ve(e.original.value)] = n, this.fireCallbacks("fail", [e.original.value, t]));
		var a = /* @__PURE__ */ Error("Fetcher: " + t);
		return a.status = n, a.statusText = t, a.response = r, Promise.reject(a);
	}
	linkData(e, t, n, r, i) {
		if (!n) return;
		let a = this.store, o = a.rdfFactory.namedNode(xe(n, e.value)), s;
		if (t === "alternate" || t === "seeAlso" || t === "meta" || t === "describedby") {
			if (o.value === e.value) return;
			s = [a.rdfFactory.namedNode(this.ianaLinkRelation(t)), this.ns.rdfs("seeAlso")];
		} else s = t === "type" ? [a.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type")] : [a.rdfFactory.namedNode(this.ianaLinkRelation(t))];
		a.addAll(s.map((t) => i ? a.rdfFactory.quad(o, t, e, r) : a.rdfFactory.quad(e, t, o, r)));
	}
	ianaLinkRelation(e) {
		return xe(encodeURIComponent(e), "http://www.iana.org/assignments/link-relations/");
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
		let n = ee(e), r = new z(n).doc();
		return t.contentType = t["content-type"] || t["Content-Type"] || t.contentType || "text/turtle", t.contentType === "application/ld+json" ? new Promise((n, i) => {
			st(r, this.store, r.uri, t.contentType, (r, a) => {
				r ? i(r) : (t.data = a, this.webOperation("PUT", e, t).then((e) => n(e)).catch((e) => i(e)));
			});
		}) : (t.data = st(r, this.store, r.value, t.contentType), this.webOperation("PUT", n, t));
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
	async createIfNotExists(e, t = E, n = "") {
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
			} else throw a;
		}
		return i;
	}
	createContainer(e, t, n) {
		let r = {
			"content-type": E,
			link: this.ns.ldp("BasicContainer") + "; rel=\"type\""
		};
		t && (r.slug = t);
		let i = { headers: r };
		return n && (i.body = n), this.webOperation("POST", e, i);
	}
	invalidateCache(e) {
		let t = ee(e), n = this;
		if (n.fetchQueue && n.fetchQueue[t] && (n.fetchQueue[t].PromiseStatus, delete n.fetchQueue[t]), n.requested[t] && n.requested[t] !== "done" && n.requested[t] !== "failed" && n.requested[t] !== 404) {
			let e = `Rdflib: fetcher: Destructive operation on <${n.requested[t]}> file being fetched! ` + t;
			console.error(e);
		} else delete n.requested[t], delete n.nonexistent[t];
	}
	webOperation(t, n, r = {}) {
		let i = ee(n);
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
		return n = n.map((e) => ve(e)), n.forEach((e) => {
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
		this.addStatus(t.req, "Accept: " + t.headers.accept), F(i) && r.add(r.rdfFactory.namedNode(e), this.ns.link("requestedBy"), i, this.appNode), t.original && t.original.value !== e && r.add(n, this.ns.link("orginalURI"), r.rdfFactory.literal(t.original.value), this.appNode);
		let a = /* @__PURE__ */ new Date(), o = "[" + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds() + "] ";
		r.add(n, this.ns.rdfs("label"), r.rdfFactory.literal(o + " Request for " + e), this.appNode), r.add(n, this.ns.link("requestedURI"), r.rdfFactory.literal(e), this.appNode), r.add(n, this.ns.link("status"), r.collection(), this.appNode);
	}
	saveResponseMetadata(e, t) {
		let n = this.store, r = n.bnode();
		return n.add(t.req, this.ns.link("response"), r, this.appNode), n.add(r, this.ns.http("status"), n.rdfFactory.literal(e.status), this.appNode), n.add(r, this.ns.http("statusText"), n.rdfFactory.literal(e.statusText), this.appNode), e.headers.forEach((e, i) => {
			n.add(r, this.ns.httph(i), this.store.rdfFactory.literal(e), this.appNode), i === "content-type" && n.add(t.resource, this.ns.rdf("type"), n.rdfFactory.namedNode(Ve(e).value), this.appNode);
		}), r;
	}
	objectRefresh(e) {
		let t = this.store.uris(e);
		if (t !== void 0) for (let e = 0; e < t.length; e++) this.refresh(this.store.rdfFactory.namedNode(ve(t[e])));
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
		this.store.removeMany(void 0, void 0, void 0, e), e.value && delete this.requested[ve(e.value)], this.fireCallbacks("retract", arguments);
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
		let t = be, n = "" + document.location;
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
		if (c && (u = xe(c, t), u !== t && (l = u)), e.status === 200) {
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
		return rr[e.split(".").pop()];
	}
	normalizedContentType(e, t) {
		if (e.forceContentType) return e.forceContentType;
		let n = t.get("content-type");
		if (!n || n.includes("application/octet-stream")) {
			let t = this.guessContentType(e.resource.value);
			if (t) return t;
		}
		let r = Se(e.resource.value);
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
s(_r, "HANDLERS", void 0), s(_r, "CONTENT_TYPE_BY_EXT", void 0), s(_r, "crossSiteProxyTemplate", void 0), _r.HANDLERS = pr, _r.CONTENT_TYPE_BY_EXT = rr;
//#endregion
//#region node_modules/rdflib/esm/jsonparser.js
var vr = (function() {
	return { parseJSON: function(e, t, n) {
		var r, i, a, o = {}, s = n.sym(t);
		for (var c in e) {
			c.indexOf("_:") === 0 ? o[c] ? r = o[c] : (r = n.bnode(c), o[c] = r) : r = n.sym(c);
			var l = e[c];
			for (var u in l) {
				var d = l[u];
				for (var f in i = n.sym(u), d) {
					var p = d[f];
					if (p.type === "uri") a = n.sym(p.value), n.add(r, i, a, s);
					else if (p.type === "BlankNode") o[p.value] ? a = o[p.value] : (a = n.bnode(p.value), o[p.value] = a), n.add(r, i, a, s);
					else if (p.type === "Literal") a = p.datatype ? n.literal(p.value, void 0, n.sym(p.datatype)) : p.lang ? n.literal(p.value, p.lang) : n.literal(p.value), n.add(r, i, a, s);
					else throw Error("error: unexpected termtype: " + f.type);
				}
			}
		}
	} };
})();
//#endregion
//#region node_modules/rdflib/esm/query-to-sparql.js
function yr(e) {
	var t = 0;
	function n(e) {
		for (var t = s() + "SELECT ", n = 0; n < e.vars.length; n++) t += e.vars[n] + " ";
		return t += "\n", t;
	}
	function r(e) {
		var t = "", n = e.statements;
		for (var r in n) H.debug("Found statement: " + n), t += s() + n[r] + "\n";
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
		for (var n = "", o = 0; o < e.optional.length; o++) H.debug("Found optional query"), n += s() + "OPTIONAL { \n", t++, n += r(e.optional[o]), n += i(e.optional[o]), n += a(e.optional[o]), t--, n += s() + "}\n";
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
//#endregion
//#region node_modules/rdflib/esm/sparql-to-query.js
function br(e, t, n) {
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
		else return H.error("SQARQL QUERY OOPS!"), a;
		a[0] = e.slice(0, s);
		var c = e.slice(s + 1).indexOf(o);
		if (c === -1) return H.error("SPARQL parsing error: no matching parentheses in literal " + e), e;
		var l;
		return e.slice(c + s + 2).match(/^\^\^/) ? (l = e.slice(c + s + 2).indexOf(" "), a[1] = n.literal(e.slice(s + 1, s + 1 + c), n.sym(m(e.slice(s + 4 + c, s + 2 + c + l)))), a = a.concat(h(e.slice(c + s + 3 + l)))) : e.slice(c + s + 2).match(/^@/) ? (l = e.slice(c + s + 2).indexOf(" "), a[1] = n.literal(e.slice(s + 1, s + 1 + c), e.slice(s + 3 + c, s + 2 + c + l), null), a = a.concat(h(e.slice(c + s + 2 + l)))) : (a[1] = n.literal(e.slice(s + 1, s + 1 + c)), H.info("Literal found: " + a[1]), a = a.concat(h(e.slice(c + s + 2)))), a;
	}
	function g(e) {
		e = e.replace(/\(/g, " ( ").replace(/\)/g, " ) ").replace(/</g, " <").replace(/>/g, "> ").replace(/{/g, " { ").replace(/}/g, " } ").replace(/[\t\n\r]/g, " ").replace(/; /g, " ; ").replace(/\. /g, " . ").replace(/, /g, " , "), H.info("New str into spaceDelimit: \n" + e);
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
		for (var t = [], r = 0; r < e.length; r++) {
			if (typeof e[r] != "string") {
				t[r] = e[r];
				continue;
			}
			e[r] = s(e[r]), o(e[r]) ? t[r] = i(e[r].slice(1)) : l(e[r]) ? (H.info(e[r] + " was identified as a bnode."), t[r] = n.bnode()) : c(e[r]) ? (H.info(e[r] + " was identified as a symbol."), t[r] = n.sym(m(e[r]))) : d(e[r]) ? (H.info(e[r] + " was identified as a prefixed symbol"), te[f(e[r])] ? t[r] = n.sym(e[r] = te[f(e[r])] + p(e[r])) : (H.error("SPARQL error: " + e[r] + " with prefix " + f(e[r]) + " does not have a correct prefix entry."), t[r] = e[r])) : t[r] = e[r];
		}
		return t;
	}
	function y(e) {
		var t = h(e), n = [];
		for (var r in t) n = typeof t[r] == "string" ? n.concat(g(t[r])) : n.concat(t[r]);
		return n = _(n), H.info("SPARQL Tokens: " + n), n;
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
		for (var n in H.info("SPARQL vars: " + e), e) if (o(e[n])) {
			H.info("Added " + e[n] + " to query variables from SPARQL");
			var r = i(e[n].slice(1));
			t.vars.push(r), r.label = e[n].slice(1);
		} else H.warn("Incorrect SPARQL variable in SELECT: " + e[n]);
	}
	function C(e) {
		var t = x("PREFIX", e), n = [];
		for (var r in t) {
			var i = e[t[r] + 1], a = e[t[r] + 2];
			if (!u(i)) H.error("Invalid SPARQL prefix: " + i);
			else if (!c(a)) H.error("Invalid SPARQL symbol: " + a);
			else {
				H.info("Prefix found: " + i + " -> " + a);
				var o = f(i);
				n[o] = m(a);
			}
		}
		return n;
	}
	function w(e, t, n) {
		H.info("Looking for a close bracket of type " + n + " in " + e);
		for (var r = 0, i = 0; i < e.length; i++) if (e[i] === t && r++, e[i] === n && r--, r < 0) return i;
		return H.error("Statement had no close parenthesis in SPARQL query"), 0;
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
		e.length === 3 && e[0].termType === "Variable" && (e[2].termType === "NamedNode" || e[2].termType === "Literal") ? e[1] === "=" || e[1] === ">" || e[1] === "<" ? (H.debug("Constraint added: " + e), t.constraints[e[0]] = new T(e[2])) : H.warn("I don't know how to handle the constraint: " + e) : e.length === 6 && typeof e[0] == "string" && e[0].toLowerCase() === "regexp" && e[1] === "(" && e[5] === ")" && e[3] === "," && e[4].termType === "Variable" && e[2].termType === "Literal" && (H.debug("Constraint added: " + e), t.constraints[e[4]] = new E(e[2].value));
	}
	function O(e, t) {
		H.debug("Optional query: " + e + " not yet implemented.");
		var r = n.formula();
		k(e, r), t.optional.push(r);
	}
	function k(e, t) {
		var n = v(e), r;
		H.debug("WHERE: " + n);
		for (var i; b("OPTIONAL", n);) i = b("OPTIONAL", n), H.debug("OPT: " + i + " " + n[i] + " in " + n), n[i + 1] !== "{" && H.warn("Bad optional opening bracket in word " + i), r = w(n.slice(i + 2), "{", "}"), r === -1 ? H.error("No matching bracket in word " + i) : (O(n.slice(i + 2, i + 2 + r), t), i = b("OPTIONAL", n), r = w(n.slice(i + 2), "{", "}"), n.splice(i, r + 3));
		for (H.debug("WHERE after optionals: " + n); b("FILTER", n);) {
			var a = b("FILTER", n);
			n[a + 1] !== "(" && H.warn("Bad filter opening bracket in word " + a), r = w(n.slice(a + 2), "(", ")"), r === -1 ? H.error("No matching bracket in word " + a) : (D(n.slice(a + 2, a + 2 + r), t), a = b("FILTER", n), r = w(n.slice(a + 2), "(", ")"), n.splice(a, r + 3));
		}
		H.debug("WHERE after filters and optionals: " + n), ee(n, t);
	}
	function ee(e, t) {
		var n = [,];
		n[0] = -1;
		for (var r = n.concat(x(".", e)), i = [], a = 0; a < r.length - 1; a++) i[a] = e.slice(r[a] + 1, r[a + 1]);
		for (a in i) {
			H.info("s+p+o " + a + " = " + i[a]);
			var o = i[a][0];
			i[a].splice(0, 1);
			var s = n.concat(x(";", i[a]));
			s.push(i[a].length);
			for (var c = [], l = 0; l < s.length - 1; l++) c[l] = i[a].slice(s[l] + 1, s[l + 1]);
			for (a in c) {
				H.info("p+o " + a + " = " + i[a]);
				var u = c[a][0];
				c[a].splice(0, 1);
				var d = n.concat(x(",", c[a]));
				d.push(c[a].length);
				var f = [];
				for (l = 0; l < d.length - 1; l++) f[l] = c[a].slice(d[l] + 1, d[l + 1]);
				for (a in f) {
					var p = f[a][0];
					H.info("Subj=" + o + " Pred=" + u + " Obj=" + p), t.add(o, u, p);
				}
			}
		}
	}
	H.info("SPARQL input: \n" + e);
	var A = new ht(), j = y(e), te = C(j);
	te.rdf ||= "http://www.w3.org/1999/02/22-rdf-syntax-ns#", te.rdfs ||= "http://www.w3.org/2000/01/rdf-schema#";
	var ne = b("SELECT", j), re = b("WHERE", j);
	if (ne < 0 || re < 0 || ne > re) return H.error("Invalid or nonexistent SELECT and WHERE tags in SPARQL query"), !1;
	if (S(j.slice(ne + 1, re), A), k(j.slice(re + 2, j.length - 1), A.pat), t) return A;
	for (var ie in A.pat.statements) {
		var M = A.pat.statements[ie];
		M.subject.termType === "NamedNode" && n.fetcher && n.fetcher.lookUpThing(M.subject, "sparql:" + M.subject), M.object.termType === "NamedNode" && n.fetcher && n.fetcher.lookUpThing(M.object, "sparql:" + M.object);
	}
	return A;
}
//#endregion
//#region node_modules/rdflib/esm/update-manager.js
var xr = class {
	constructor(e) {
		if (s(this, "store", void 0), s(this, "ifps", void 0), s(this, "fps", void 0), s(this, "patchControl", void 0), s(this, "ns", void 0), e ||= new xt(), e.updater) throw Error("You can't have two UpdateManagers for the same store");
		e.fetcher ||= new _r(e), this.store = e, e.updater = this, this.ifps = {}, this.fps = {}, this.ns = {}, this.ns.link = U("http://www.w3.org/2007/ont/link#"), this.ns.http = U("http://www.w3.org/2007/ont/http#"), this.ns.httph = U("http://www.w3.org/2007/ont/httph#"), this.ns.ldp = U("http://www.w3.org/ns/ldp#"), this.ns.rdf = U("http://www.w3.org/1999/02/22-rdf-syntax-ns#"), this.ns.rdfs = U("http://www.w3.org/2000/01/rdf-schema#"), this.ns.rdf = U("http://www.w3.org/1999/02/22-rdf-syntax-ns#"), this.ns.owl = U("http://www.w3.org/2002/07/owl#"), this.patchControl = [];
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
		if (t ||= this.store, e = ee(e), !this.isHttpUri(e) && t.holds(t.rdfFactory.namedNode(e), t.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), t.rdfFactory.namedNode("http://www.w3.org/2007/ont/link#MachineEditableDocument"))) return "LOCALFILE";
		var n, r = !1;
		let i = t.fetcher?.appNode;
		for (var a = t.each(void 0, this.ns.link("requestedURI"), ve(e), i), o, s = 0; s < a.length; s++) if (n = a[s], n !== void 0) {
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
			return I(e);
		});
	}
	statementArrayBnodes(e) {
		var t = [];
		for (let n = 0; n < e.length; n++) t = t.concat(this.statementBnodes(e[n]));
		t.sort();
		var n = [];
		for (let e = 0; e < t.length; e++) (e === 0 || !t[e].equals(t[e - 1])) && n.push(t[e]);
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
		if (!(e && !e.graph)) {
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
		if (t.reloading) {
			t.outOfDate = !0;
			return;
		}
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
	setRefreshHandler(e, t) {
		let n = this.getUpdatesVia(e);
		var r = t, i = this, a = this, o = 1500, s = 0;
		if (!n) return !1;
		n = xe(n, e.value);
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
			var o = this.store, s = e ? j(e) ? e.statements : e instanceof Array ? e : [e] : [], c = t ? j(t) ? t.statements : t instanceof Array ? t : [t] : [];
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
			} else if (h.indexOf("SPARQL") >= 0 || h.indexOf("N3PATCH") >= 0) {
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
			n(void 0, !1, "Exception in update: " + e + "\n" + tt(e));
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
		for (let e = 0; e < t.length; e++) Qe(l, t[e]);
		for (let e = 0; e < n.length; e++) l.push(n[e]);
		let u = this.serialize(e.value, l, c);
		var d = a.the(s, this.ns.httph("content-location")), f;
		return d && (f = xe(d.value, f)), i.contentType = c, i.noMeta = !0, i.body = u, a.fetcher.webOperation("PUT", f, i).then((i) => {
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
		for (let e = 0; e < t.length; e++) Qe(o, t[e]);
		for (let e = 0; e < n.length; e++) o.push(n[e]);
		var s = e.value.lastIndexOf(".");
		if (s < 1) throw Error("Rewriting file: No filename extension: " + e.value);
		var c = e.value.slice(s + 1);
		let l = _r.CONTENT_TYPE_BY_EXT[c];
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
		var a = rt(r);
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
}, Sr = {
	...ln,
	fetcher(e, t) {
		return new _r(e, t);
	},
	graph(e = void 0, t = void 0) {
		return new xt(e, t || { rdfFactory: ln });
	},
	lit(e, t, n) {
		return this.literal("" + e, t || n);
	},
	st(e, t, n, r) {
		return this.quad(e, t, n, r);
	}
}, Cr = class {
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
}, wr = class {
	constructor(e) {
		this.fetcher = e, this.graph = {}, this.via = {}, this.fetcher.addCallback("headers", this.onHeaders);
	}
	onHeaders(e) {
		var t, n, r;
		return e.headers == null || typeof WebSocket > "u" || WebSocket === null ? !0 : (t = e.headers.etag, r = e.headers["updates-via"], n = e.uri, t && r && (this.graph[n] = {
			etag: t,
			via: r
		}, this.register(r, n)), !0);
	}
	onUpdate(e, t) {
		return this.fetcher.refresh(Sr.namedNode(e));
	}
	register(e, t) {
		return this.via[e] ?? (this.via[e] = new Cr(this, e)), this.via[e].subscribe(t);
	}
}, Tr = /* @__PURE__ */ t({
	BlankNode: () => k,
	Collection: () => le,
	ConnectedStore: () => Hr,
	DataFactory: () => Sr,
	Empty: () => ue,
	Fetcher: () => _r,
	Formula: () => ft,
	IndexedFormula: () => xt,
	Literal: () => V,
	LiveStore: () => Ur,
	N3Parser: () => on,
	NamedNode: () => z,
	Namespace: () => U,
	NextId: () => Vr,
	Node: () => pt,
	Query: () => ht,
	RDFParser: () => X,
	RDFaProcessor: () => Zn,
	SPARQLToQuery: () => br,
	Serializer: () => rt,
	Statement: () => he,
	Store: () => xt,
	UpdateManager: () => xr,
	UpdatesSocket: () => Cr,
	UpdatesVia: () => wr,
	Util: () => Re,
	Variable: () => we,
	blankNode: () => Nr,
	defaultGraph: () => Pr,
	fetcher: () => Dr,
	fromNT: () => zr,
	graph: () => Or,
	isBlankNode: () => I,
	isCollection: () => te,
	isGraph: () => se,
	isLiteral: () => ae,
	isNamedNode: () => F,
	isPredicate: () => R,
	isQuad: () => P,
	isRDFObject: () => oe,
	isRDFlibObject: () => ne,
	isRDFlibPredicate: () => ie,
	isRDFlibSubject: () => re,
	isStatement: () => A,
	isStore: () => j,
	isSubject: () => L,
	isTerm: () => N,
	isVariable: () => M,
	jsonParser: () => vr,
	lit: () => kr,
	literal: () => Fr,
	log: () => H,
	namedNode: () => jr,
	parse: () => er,
	quad: () => Ir,
	queryToSPARQL: () => yr,
	serialize: () => st,
	sparqlUpdateParser: () => $n,
	st: () => Ar,
	sym: () => jr,
	term: () => Br,
	termValue: () => ee,
	triple: () => Lr,
	uri: () => ge,
	variable: () => Mr
}), Er = {};
for (let e in Sr) typeof Sr[e] == "function" && (Er[e] = Sr[e].bind(Sr));
var { fetcher: Dr, graph: Or, lit: kr, st: Ar, namedNode: jr, variable: Mr, blankNode: Nr, defaultGraph: Pr, literal: Fr, quad: Ir, triple: Lr } = Er, Rr = new ft(), zr = (e) => Rr.fromNT(e), Br = pt.fromValue, Vr = k.nextId, Hr = class extends xt {
	constructor(e) {
		super(e), s(this, "fetcher", void 0), this.fetcher = new _r(this, {});
	}
}, Ur = class extends Hr {
	constructor(e) {
		super(e), s(this, "updater", void 0), this.updater = new xr(this);
	}
}, Wr = (0, r.default)(Tr), Gr = crypto, Kr = (e) => e instanceof CryptoKey, qr = async (e, t) => {
	let n = `SHA-${e.slice(-3)}`;
	return new Uint8Array(await Gr.subtle.digest(n, t));
}, Jr = new TextEncoder(), Yr = new TextDecoder();
function Xr(...e) {
	let t = e.reduce((e, { length: t }) => e + t, 0), n = new Uint8Array(t), r = 0;
	for (let t of e) n.set(t, r), r += t.length;
	return n;
}
var Zr = (e) => {
	let t = e;
	typeof t == "string" && (t = Jr.encode(t));
	let n = 32768, r = [];
	for (let e = 0; e < t.length; e += n) r.push(String.fromCharCode.apply(null, t.subarray(e, e + n)));
	return btoa(r.join(""));
}, Qr = (e) => Zr(e).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"), $r = (e) => {
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
	return n;
}, ei = (e) => {
	let t = e;
	t instanceof Uint8Array && (t = Yr.decode(t)), t = t.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
	try {
		return $r(t);
	} catch {
		throw TypeError("The input to be decoded is not correctly encoded.");
	}
}, ti = class extends Error {
	constructor(e, t) {
		super(e, t), this.code = "ERR_JOSE_GENERIC", this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
	}
};
ti.code = "ERR_JOSE_GENERIC";
var Q = class extends ti {
	constructor(e, t, n = "unspecified", r = "unspecified") {
		super(e, { cause: {
			claim: n,
			reason: r,
			payload: t
		} }), this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED", this.claim = n, this.reason = r, this.payload = t;
	}
};
Q.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
var ni = class extends ti {
	constructor(e, t, n = "unspecified", r = "unspecified") {
		super(e, { cause: {
			claim: n,
			reason: r,
			payload: t
		} }), this.code = "ERR_JWT_EXPIRED", this.claim = n, this.reason = r, this.payload = t;
	}
};
ni.code = "ERR_JWT_EXPIRED";
var ri = class extends ti {
	constructor() {
		super(...arguments), this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
	}
};
ri.code = "ERR_JOSE_ALG_NOT_ALLOWED";
var ii = class extends ti {
	constructor() {
		super(...arguments), this.code = "ERR_JOSE_NOT_SUPPORTED";
	}
};
ii.code = "ERR_JOSE_NOT_SUPPORTED";
var ai = class extends ti {
	constructor(e = "decryption operation failed", t) {
		super(e, t), this.code = "ERR_JWE_DECRYPTION_FAILED";
	}
};
ai.code = "ERR_JWE_DECRYPTION_FAILED";
var oi = class extends ti {
	constructor() {
		super(...arguments), this.code = "ERR_JWE_INVALID";
	}
};
oi.code = "ERR_JWE_INVALID";
var si = class extends ti {
	constructor() {
		super(...arguments), this.code = "ERR_JWS_INVALID";
	}
};
si.code = "ERR_JWS_INVALID";
var ci = class extends ti {
	constructor() {
		super(...arguments), this.code = "ERR_JWT_INVALID";
	}
};
ci.code = "ERR_JWT_INVALID";
var li = class extends ti {
	constructor() {
		super(...arguments), this.code = "ERR_JWK_INVALID";
	}
};
li.code = "ERR_JWK_INVALID";
var ui = class extends ti {
	constructor() {
		super(...arguments), this.code = "ERR_JWKS_INVALID";
	}
};
ui.code = "ERR_JWKS_INVALID";
var di = class extends ti {
	constructor(e = "no applicable key found in the JSON Web Key Set", t) {
		super(e, t), this.code = "ERR_JWKS_NO_MATCHING_KEY";
	}
};
di.code = "ERR_JWKS_NO_MATCHING_KEY";
var fi = class extends ti {
	constructor(e = "multiple matching keys found in the JSON Web Key Set", t) {
		super(e, t), this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
	}
};
fi.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
var pi = class extends ti {
	constructor(e = "request timed out", t) {
		super(e, t), this.code = "ERR_JWKS_TIMEOUT";
	}
};
pi.code = "ERR_JWKS_TIMEOUT";
var mi = class extends ti {
	constructor(e = "signature verification failed", t) {
		super(e, t), this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
	}
};
mi.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
function hi(e, t = "algorithm.name") {
	return /* @__PURE__ */ TypeError(`CryptoKey does not support this operation, its ${t} must be ${e}`);
}
function gi(e, t) {
	return e.name === t;
}
function _i(e) {
	return parseInt(e.name.slice(4), 10);
}
function vi(e) {
	switch (e) {
		case "ES256": return "P-256";
		case "ES384": return "P-384";
		case "ES512": return "P-521";
		default: throw Error("unreachable");
	}
}
function yi(e, t) {
	if (t.length && !t.some((t) => e.usages.includes(t))) {
		let e = "CryptoKey does not support this operation, its usages must include ";
		if (t.length > 2) {
			let n = t.pop();
			e += `one of ${t.join(", ")}, or ${n}.`;
		} else t.length === 2 ? e += `one of ${t[0]} or ${t[1]}.` : e += `${t[0]}.`;
		throw TypeError(e);
	}
}
function bi(e, t, ...n) {
	switch (t) {
		case "HS256":
		case "HS384":
		case "HS512": {
			if (!gi(e.algorithm, "HMAC")) throw hi("HMAC");
			let n = parseInt(t.slice(2), 10);
			if (_i(e.algorithm.hash) !== n) throw hi(`SHA-${n}`, "algorithm.hash");
			break;
		}
		case "RS256":
		case "RS384":
		case "RS512": {
			if (!gi(e.algorithm, "RSASSA-PKCS1-v1_5")) throw hi("RSASSA-PKCS1-v1_5");
			let n = parseInt(t.slice(2), 10);
			if (_i(e.algorithm.hash) !== n) throw hi(`SHA-${n}`, "algorithm.hash");
			break;
		}
		case "PS256":
		case "PS384":
		case "PS512": {
			if (!gi(e.algorithm, "RSA-PSS")) throw hi("RSA-PSS");
			let n = parseInt(t.slice(2), 10);
			if (_i(e.algorithm.hash) !== n) throw hi(`SHA-${n}`, "algorithm.hash");
			break;
		}
		case "EdDSA":
			if (e.algorithm.name !== "Ed25519" && e.algorithm.name !== "Ed448") throw hi("Ed25519 or Ed448");
			break;
		case "Ed25519":
			if (!gi(e.algorithm, "Ed25519")) throw hi("Ed25519");
			break;
		case "ES256":
		case "ES384":
		case "ES512": {
			if (!gi(e.algorithm, "ECDSA")) throw hi("ECDSA");
			let n = vi(t);
			if (e.algorithm.namedCurve !== n) throw hi(n, "algorithm.namedCurve");
			break;
		}
		default: throw TypeError("CryptoKey does not support this operation");
	}
	yi(e, n);
}
function xi(e, t, ...n) {
	if (n = n.filter(Boolean), n.length > 2) {
		let t = n.pop();
		e += `one of type ${n.join(", ")}, or ${t}.`;
	} else n.length === 2 ? e += `one of type ${n[0]} or ${n[1]}.` : e += `of type ${n[0]}.`;
	return t == null ? e += ` Received ${t}` : typeof t == "function" && t.name ? e += ` Received function ${t.name}` : typeof t == "object" && t && t.constructor?.name && (e += ` Received an instance of ${t.constructor.name}`), e;
}
var Si = (e, ...t) => xi("Key must be ", e, ...t);
function Ci(e, t, ...n) {
	return xi(`Key for the ${e} algorithm must be `, t, ...n);
}
var wi = (e) => Kr(e) ? !0 : e?.[Symbol.toStringTag] === "KeyObject", Ti = ["CryptoKey"], Ei = (...e) => {
	let t = e.filter(Boolean);
	if (t.length === 0 || t.length === 1) return !0;
	let n;
	for (let e of t) {
		let t = Object.keys(e);
		if (!n || n.size === 0) {
			n = new Set(t);
			continue;
		}
		for (let e of t) {
			if (n.has(e)) return !1;
			n.add(e);
		}
	}
	return !0;
};
function Di(e) {
	return typeof e == "object" && !!e;
}
function Oi(e) {
	if (!Di(e) || Object.prototype.toString.call(e) !== "[object Object]") return !1;
	if (Object.getPrototypeOf(e) === null) return !0;
	let t = e;
	for (; Object.getPrototypeOf(t) !== null;) t = Object.getPrototypeOf(t);
	return Object.getPrototypeOf(e) === t;
}
var ki = (e, t) => {
	if (e.startsWith("RS") || e.startsWith("PS")) {
		let { modulusLength: n } = t.algorithm;
		if (typeof n != "number" || n < 2048) throw TypeError(`${e} requires key modulusLength to be 2048 bits or larger`);
	}
};
function Ai(e) {
	return Oi(e) && typeof e.kty == "string";
}
function ji(e) {
	return e.kty !== "oct" && typeof e.d == "string";
}
function Mi(e) {
	return e.kty !== "oct" && e.d === void 0;
}
function Ni(e) {
	return Ai(e) && e.kty === "oct" && typeof e.k == "string";
}
function Pi(e) {
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
				default: throw new ii("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
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
				default: throw new ii("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
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
				default: throw new ii("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			}
			break;
		default: throw new ii("Invalid or unsupported JWK \"kty\" (Key Type) Parameter value");
	}
	return {
		algorithm: t,
		keyUsages: n
	};
}
var Fi = async (e) => {
	if (!e.alg) throw TypeError("\"alg\" argument is required when \"jwk.alg\" is not present");
	let { algorithm: t, keyUsages: n } = Pi(e), r = [
		t,
		e.ext ?? !1,
		e.key_ops ?? n
	], i = { ...e };
	return delete i.alg, delete i.use, Gr.subtle.importKey("jwk", i, ...r);
}, Ii = (e) => ei(e), Li, Ri, zi = (e) => e?.[Symbol.toStringTag] === "KeyObject", Bi = async (e, t, n, r, i = !1) => {
	let a = e.get(t);
	if (a?.[r]) return a[r];
	let o = await Fi({
		...n,
		alg: r
	});
	return i && Object.freeze(t), a ? a[r] = o : e.set(t, { [r]: o }), o;
}, Vi = {
	normalizePublicKey: (e, t) => {
		if (zi(e)) {
			let n = e.export({ format: "jwk" });
			return delete n.d, delete n.dp, delete n.dq, delete n.p, delete n.q, delete n.qi, n.k ? Ii(n.k) : (Ri ||= /* @__PURE__ */ new WeakMap(), Bi(Ri, e, n, t));
		}
		return Ai(e) ? e.k ? ei(e.k) : (Ri ||= /* @__PURE__ */ new WeakMap(), Bi(Ri, e, e, t, !0)) : e;
	},
	normalizePrivateKey: (e, t) => {
		if (zi(e)) {
			let n = e.export({ format: "jwk" });
			return n.k ? Ii(n.k) : (Li ||= /* @__PURE__ */ new WeakMap(), Bi(Li, e, n, t));
		}
		return Ai(e) ? e.k ? ei(e.k) : (Li ||= /* @__PURE__ */ new WeakMap(), Bi(Li, e, e, t, !0)) : e;
	}
};
async function Hi(e, t) {
	if (!Oi(e)) throw TypeError("JWK must be an object");
	switch (t ||= e.alg, e.kty) {
		case "oct":
			if (typeof e.k != "string" || !e.k) throw TypeError("missing \"k\" (Key Value) Parameter value");
			return ei(e.k);
		case "RSA": if ("oth" in e && e.oth !== void 0) throw new ii("RSA JWK \"oth\" (Other Primes Info) Parameter value is not supported");
		case "EC":
		case "OKP": return Fi({
			...e,
			alg: t
		});
		default: throw new ii("Unsupported \"kty\" (Key Type) Parameter value");
	}
}
var Ui = (e) => e?.[Symbol.toStringTag], Wi = (e, t, n) => {
	if (t.use !== void 0 && t.use !== "sig") throw TypeError("Invalid key for this operation, when present its use must be sig");
	if (t.key_ops !== void 0 && t.key_ops.includes?.(n) !== !0) throw TypeError(`Invalid key for this operation, when present its key_ops must include ${n}`);
	if (t.alg !== void 0 && t.alg !== e) throw TypeError(`Invalid key for this operation, when present its alg must be ${e}`);
	return !0;
}, Gi = (e, t, n, r) => {
	if (!(t instanceof Uint8Array)) {
		if (r && Ai(t)) {
			if (Ni(t) && Wi(e, t, n)) return;
			throw TypeError("JSON Web Key for symmetric algorithms must have JWK \"kty\" (Key Type) equal to \"oct\" and the JWK \"k\" (Key Value) present");
		}
		if (!wi(t)) throw TypeError(Ci(e, t, ...Ti, "Uint8Array", r ? "JSON Web Key" : null));
		if (t.type !== "secret") throw TypeError(`${Ui(t)} instances for symmetric algorithms must be of type "secret"`);
	}
}, Ki = (e, t, n, r) => {
	if (r && Ai(t)) switch (n) {
		case "sign":
			if (ji(t) && Wi(e, t, n)) return;
			throw TypeError("JSON Web Key for this operation be a private JWK");
		case "verify":
			if (Mi(t) && Wi(e, t, n)) return;
			throw TypeError("JSON Web Key for this operation be a public JWK");
	}
	if (!wi(t)) throw TypeError(Ci(e, t, ...Ti, r ? "JSON Web Key" : null));
	if (t.type === "secret") throw TypeError(`${Ui(t)} instances for asymmetric algorithms must not be of type "secret"`);
	if (n === "sign" && t.type === "public") throw TypeError(`${Ui(t)} instances for asymmetric algorithm signing must be of type "private"`);
	if (n === "decrypt" && t.type === "public") throw TypeError(`${Ui(t)} instances for asymmetric algorithm decryption must be of type "private"`);
	if (t.algorithm && n === "verify" && t.type === "private") throw TypeError(`${Ui(t)} instances for asymmetric algorithm verifying must be of type "public"`);
	if (t.algorithm && n === "encrypt" && t.type === "private") throw TypeError(`${Ui(t)} instances for asymmetric algorithm encryption must be of type "public"`);
};
function qi(e, t, n, r) {
	t.startsWith("HS") || t === "dir" || t.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(t) ? Gi(t, n, r, e) : Ki(t, n, r, e);
}
qi.bind(void 0, !1);
var Ji = qi.bind(void 0, !0);
function Yi(e, t, n, r, i) {
	if (i.crit !== void 0 && r?.crit === void 0) throw new e("\"crit\" (Critical) Header Parameter MUST be integrity protected");
	if (!r || r.crit === void 0) return /* @__PURE__ */ new Set();
	if (!Array.isArray(r.crit) || r.crit.length === 0 || r.crit.some((e) => typeof e != "string" || e.length === 0)) throw new e("\"crit\" (Critical) Header Parameter MUST be an array of non-empty strings when present");
	let a;
	a = n === void 0 ? t : new Map([...Object.entries(n), ...t.entries()]);
	for (let t of r.crit) {
		if (!a.has(t)) throw new ii(`Extension Header Parameter "${t}" is not recognized`);
		if (i[t] === void 0) throw new e(`Extension Header Parameter "${t}" is missing`);
		if (a.get(t) && r[t] === void 0) throw new e(`Extension Header Parameter "${t}" MUST be integrity protected`);
	}
	return new Set(r.crit);
}
var Xi = (e, t) => {
	if (t !== void 0 && (!Array.isArray(t) || t.some((e) => typeof e != "string"))) throw TypeError(`"${e}" option must be an array of strings`);
	if (t) return new Set(t);
}, Zi = async (e) => {
	if (e instanceof Uint8Array) return {
		kty: "oct",
		k: Qr(e)
	};
	if (!Kr(e)) throw TypeError(Si(e, ...Ti, "Uint8Array"));
	if (!e.extractable) throw TypeError("non-extractable CryptoKey cannot be exported as a JWK");
	let { ext: t, key_ops: n, alg: r, use: i, ...a } = await Gr.subtle.exportKey("jwk", e);
	return a;
};
async function Qi(e) {
	return Zi(e);
}
function $i(e, t) {
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
		default: throw new ii(`alg ${e} is not supported either by JOSE or your javascript runtime`);
	}
}
async function ea(e, t, n) {
	if (n === "sign" && (t = await Vi.normalizePrivateKey(t, e)), n === "verify" && (t = await Vi.normalizePublicKey(t, e)), Kr(t)) return bi(t, e, n), t;
	if (t instanceof Uint8Array) {
		if (!e.startsWith("HS")) throw TypeError(Si(t, ...Ti));
		return Gr.subtle.importKey("raw", t, {
			hash: `SHA-${e.slice(-3)}`,
			name: "HMAC"
		}, !1, [n]);
	}
	throw TypeError(Si(t, ...Ti, "Uint8Array", "JSON Web Key"));
}
var ta = async (e, t, n, r) => {
	let i = await ea(e, t, "verify");
	ki(e, i);
	let a = $i(e, i.algorithm);
	try {
		return await Gr.subtle.verify(a, i, n, r);
	} catch {
		return !1;
	}
};
async function na(e, t, n) {
	if (!Oi(e)) throw new si("Flattened JWS must be an object");
	if (e.protected === void 0 && e.header === void 0) throw new si("Flattened JWS must have either of the \"protected\" or \"header\" members");
	if (e.protected !== void 0 && typeof e.protected != "string") throw new si("JWS Protected Header incorrect type");
	if (e.payload === void 0) throw new si("JWS Payload missing");
	if (typeof e.signature != "string") throw new si("JWS Signature missing or incorrect type");
	if (e.header !== void 0 && !Oi(e.header)) throw new si("JWS Unprotected Header incorrect type");
	let r = {};
	if (e.protected) try {
		let t = ei(e.protected);
		r = JSON.parse(Yr.decode(t));
	} catch {
		throw new si("JWS Protected Header is invalid");
	}
	if (!Ei(r, e.header)) throw new si("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
	let i = {
		...r,
		...e.header
	}, a = Yi(si, /* @__PURE__ */ new Map([["b64", !0]]), n?.crit, r, i), o = !0;
	if (a.has("b64") && (o = r.b64, typeof o != "boolean")) throw new si("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
	let { alg: s } = i;
	if (typeof s != "string" || !s) throw new si("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
	let c = n && Xi("algorithms", n.algorithms);
	if (c && !c.has(s)) throw new ri("\"alg\" (Algorithm) Header Parameter value not allowed");
	if (o) {
		if (typeof e.payload != "string") throw new si("JWS Payload must be a string");
	} else if (typeof e.payload != "string" && !(e.payload instanceof Uint8Array)) throw new si("JWS Payload must be a string or an Uint8Array instance");
	let l = !1;
	typeof t == "function" ? (t = await t(r, e), l = !0, Ji(s, t, "verify"), Ai(t) && (t = await Hi(t, s))) : Ji(s, t, "verify");
	let u = Xr(Jr.encode(e.protected ?? ""), Jr.encode("."), typeof e.payload == "string" ? Jr.encode(e.payload) : e.payload), d;
	try {
		d = ei(e.signature);
	} catch {
		throw new si("Failed to base64url decode the signature");
	}
	if (!await ta(s, t, d, u)) throw new mi();
	let f;
	if (o) try {
		f = ei(e.payload);
	} catch {
		throw new si("Failed to base64url decode the payload");
	}
	else f = typeof e.payload == "string" ? Jr.encode(e.payload) : e.payload;
	let p = { payload: f };
	return e.protected !== void 0 && (p.protectedHeader = r), e.header !== void 0 && (p.unprotectedHeader = e.header), l ? {
		...p,
		key: t
	} : p;
}
async function ra(e, t, n) {
	if (e instanceof Uint8Array && (e = Yr.decode(e)), typeof e != "string") throw new si("Compact JWS must be a string or Uint8Array");
	let { 0: r, 1: i, 2: a, length: o } = e.split(".");
	if (o !== 3) throw new si("Invalid Compact JWS");
	let s = await na({
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
var ia = (e) => Math.floor(e.getTime() / 1e3), aa = 60, oa = aa * 60, sa = oa * 24, ca = sa * 7, la = sa * 365.25, ua = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, da = (e) => {
	let t = ua.exec(e);
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
			i = Math.round(n * aa);
			break;
		case "hour":
		case "hours":
		case "hr":
		case "hrs":
		case "h":
			i = Math.round(n * oa);
			break;
		case "day":
		case "days":
		case "d":
			i = Math.round(n * sa);
			break;
		case "week":
		case "weeks":
		case "w":
			i = Math.round(n * ca);
			break;
		default:
			i = Math.round(n * la);
			break;
	}
	return t[1] === "-" || t[4] === "ago" ? -i : i;
}, fa = (e) => e.toLowerCase().replace(/^application\//, ""), pa = (e, t) => typeof e == "string" ? t.includes(e) : Array.isArray(e) ? t.some(Set.prototype.has.bind(new Set(e))) : !1, ma = (e, t, n = {}) => {
	let r;
	try {
		r = JSON.parse(Yr.decode(t));
	} catch {}
	if (!Oi(r)) throw new ci("JWT Claims Set must be a top-level JSON object");
	let { typ: i } = n;
	if (i && (typeof e.typ != "string" || fa(e.typ) !== fa(i))) throw new Q("unexpected \"typ\" JWT header value", r, "typ", "check_failed");
	let { requiredClaims: a = [], issuer: o, subject: s, audience: c, maxTokenAge: l } = n, u = [...a];
	l !== void 0 && u.push("iat"), c !== void 0 && u.push("aud"), s !== void 0 && u.push("sub"), o !== void 0 && u.push("iss");
	for (let e of new Set(u.reverse())) if (!(e in r)) throw new Q(`missing required "${e}" claim`, r, e, "missing");
	if (o && !(Array.isArray(o) ? o : [o]).includes(r.iss)) throw new Q("unexpected \"iss\" claim value", r, "iss", "check_failed");
	if (s && r.sub !== s) throw new Q("unexpected \"sub\" claim value", r, "sub", "check_failed");
	if (c && !pa(r.aud, typeof c == "string" ? [c] : c)) throw new Q("unexpected \"aud\" claim value", r, "aud", "check_failed");
	let d;
	switch (typeof n.clockTolerance) {
		case "string":
			d = da(n.clockTolerance);
			break;
		case "number":
			d = n.clockTolerance;
			break;
		case "undefined":
			d = 0;
			break;
		default: throw TypeError("Invalid clockTolerance option type");
	}
	let { currentDate: f } = n, p = ia(f || /* @__PURE__ */ new Date());
	if ((r.iat !== void 0 || l) && typeof r.iat != "number") throw new Q("\"iat\" claim must be a number", r, "iat", "invalid");
	if (r.nbf !== void 0) {
		if (typeof r.nbf != "number") throw new Q("\"nbf\" claim must be a number", r, "nbf", "invalid");
		if (r.nbf > p + d) throw new Q("\"nbf\" claim timestamp check failed", r, "nbf", "check_failed");
	}
	if (r.exp !== void 0) {
		if (typeof r.exp != "number") throw new Q("\"exp\" claim must be a number", r, "exp", "invalid");
		if (r.exp <= p - d) throw new ni("\"exp\" claim timestamp check failed", r, "exp", "check_failed");
	}
	if (l) {
		let e = p - r.iat, t = typeof l == "number" ? l : da(l);
		if (e - d > t) throw new ni("\"iat\" claim timestamp check failed (too far in the past)", r, "iat", "check_failed");
		if (e < 0 - d) throw new Q("\"iat\" claim timestamp check failed (it should be in the past)", r, "iat", "check_failed");
	}
	return r;
};
async function ha(e, t, n) {
	let r = await ra(e, t, n);
	if (r.protectedHeader.crit?.includes("b64") && r.protectedHeader.b64 === !1) throw new ci("JWTs MUST NOT use unencoded payload");
	let i = {
		payload: ma(r.protectedHeader, r.payload, n),
		protectedHeader: r.protectedHeader
	};
	return typeof t == "function" ? {
		...i,
		key: r.key
	} : i;
}
var ga = async (e, t, n) => {
	let r = await ea(e, t, "sign");
	ki(e, r);
	let i = await Gr.subtle.sign($i(e, r.algorithm), r, n);
	return new Uint8Array(i);
}, _a = class {
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
		if (!this._protectedHeader && !this._unprotectedHeader) throw new si("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
		if (!Ei(this._protectedHeader, this._unprotectedHeader)) throw new si("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
		let n = {
			...this._protectedHeader,
			...this._unprotectedHeader
		}, r = Yi(si, /* @__PURE__ */ new Map([["b64", !0]]), t?.crit, this._protectedHeader, n), i = !0;
		if (r.has("b64") && (i = this._protectedHeader.b64, typeof i != "boolean")) throw new si("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
		let { alg: a } = n;
		if (typeof a != "string" || !a) throw new si("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
		Ji(a, e, "sign");
		let o = this._payload;
		i && (o = Jr.encode(Qr(o)));
		let s;
		s = this._protectedHeader ? Jr.encode(Qr(JSON.stringify(this._protectedHeader))) : Jr.encode("");
		let c = {
			signature: Qr(await ga(a, e, Xr(s, Jr.encode("."), o))),
			payload: ""
		};
		return i && (c.payload = Yr.decode(o)), this._unprotectedHeader && (c.header = this._unprotectedHeader), this._protectedHeader && (c.protected = Yr.decode(s)), c;
	}
}, va = class {
	constructor(e) {
		this._flattened = new _a(e);
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
function ya(e, t) {
	if (!Number.isFinite(t)) throw TypeError(`Invalid ${e} input`);
	return t;
}
var ba = class {
	constructor(e = {}) {
		if (!Oi(e)) throw TypeError("JWT Claims Set MUST be an object");
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
		return typeof e == "number" ? this._payload = {
			...this._payload,
			nbf: ya("setNotBefore", e)
		} : e instanceof Date ? this._payload = {
			...this._payload,
			nbf: ya("setNotBefore", ia(e))
		} : this._payload = {
			...this._payload,
			nbf: ia(/* @__PURE__ */ new Date()) + da(e)
		}, this;
	}
	setExpirationTime(e) {
		return typeof e == "number" ? this._payload = {
			...this._payload,
			exp: ya("setExpirationTime", e)
		} : e instanceof Date ? this._payload = {
			...this._payload,
			exp: ya("setExpirationTime", ia(e))
		} : this._payload = {
			...this._payload,
			exp: ia(/* @__PURE__ */ new Date()) + da(e)
		}, this;
	}
	setIssuedAt(e) {
		return e === void 0 ? this._payload = {
			...this._payload,
			iat: ia(/* @__PURE__ */ new Date())
		} : e instanceof Date ? this._payload = {
			...this._payload,
			iat: ya("setIssuedAt", ia(e))
		} : typeof e == "string" ? this._payload = {
			...this._payload,
			iat: ya("setIssuedAt", ia(/* @__PURE__ */ new Date()) + da(e))
		} : this._payload = {
			...this._payload,
			iat: ya("setIssuedAt", e)
		}, this;
	}
}, xa = class extends ba {
	setProtectedHeader(e) {
		return this._protectedHeader = e, this;
	}
	async sign(e, t) {
		let n = new va(Jr.encode(JSON.stringify(this._payload)));
		if (n.setProtectedHeader(this._protectedHeader), Array.isArray(this._protectedHeader?.crit) && this._protectedHeader.crit.includes("b64") && this._protectedHeader.b64 === !1) throw new ci("JWTs MUST NOT use unencoded payload");
		return n.sign(e, t);
	}
}, Sa = (e, t) => {
	if (typeof e != "string" || !e) throw new li(`${t} missing or invalid`);
};
async function Ca(e, t) {
	if (!Oi(e)) throw TypeError("JWK must be an object");
	if (t ??= "sha256", t !== "sha256" && t !== "sha384" && t !== "sha512") throw TypeError("digestAlgorithm must one of \"sha256\", \"sha384\", or \"sha512\"");
	let n;
	switch (e.kty) {
		case "EC":
			Sa(e.crv, "\"crv\" (Curve) Parameter"), Sa(e.x, "\"x\" (X Coordinate) Parameter"), Sa(e.y, "\"y\" (Y Coordinate) Parameter"), n = {
				crv: e.crv,
				kty: e.kty,
				x: e.x,
				y: e.y
			};
			break;
		case "OKP":
			Sa(e.crv, "\"crv\" (Subtype of Key Pair) Parameter"), Sa(e.x, "\"x\" (Public Key) Parameter"), n = {
				crv: e.crv,
				kty: e.kty,
				x: e.x
			};
			break;
		case "RSA":
			Sa(e.e, "\"e\" (Exponent) Parameter"), Sa(e.n, "\"n\" (Modulus) Parameter"), n = {
				e: e.e,
				kty: e.kty,
				n: e.n
			};
			break;
		case "oct":
			Sa(e.k, "\"k\" (Key Value) Parameter"), n = {
				k: e.k,
				kty: e.kty
			};
			break;
		default: throw new ii("\"kty\" (Key Type) Parameter missing or unsupported");
	}
	let r = Jr.encode(JSON.stringify(n));
	return Qr(await qr(t, r));
}
function wa(e) {
	switch (typeof e == "string" && e.slice(0, 2)) {
		case "RS":
		case "PS": return "RSA";
		case "ES": return "EC";
		case "Ed": return "OKP";
		default: throw new ii("Unsupported \"alg\" value for a JSON Web Key Set");
	}
}
function Ta(e) {
	return e && typeof e == "object" && Array.isArray(e.keys) && e.keys.every(Ea);
}
function Ea(e) {
	return Oi(e);
}
function Da(e) {
	return typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}
var Oa = class {
	constructor(e) {
		if (this._cached = /* @__PURE__ */ new WeakMap(), !Ta(e)) throw new ui("JSON Web Key Set malformed");
		this._jwks = Da(e);
	}
	async getKey(e, t) {
		let { alg: n, kid: r } = {
			...e,
			...t?.header
		}, i = wa(n), a = this._jwks.keys.filter((e) => {
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
				case "EdDSA":
					t = e.crv === "Ed25519" || e.crv === "Ed448";
					break;
			}
			return t;
		}), { 0: o, length: s } = a;
		if (s === 0) throw new di();
		if (s !== 1) {
			let e = new fi(), { _cached: t } = this;
			throw e[Symbol.asyncIterator] = async function* () {
				for (let e of a) try {
					yield await ka(t, e, n);
				} catch {}
			}, e;
		}
		return ka(this._cached, o, n);
	}
};
async function ka(e, t, n) {
	let r = e.get(t) || e.set(t, {}).get(t);
	if (r[n] === void 0) {
		let e = await Hi({
			...t,
			ext: !0
		}, n);
		if (e instanceof Uint8Array || e.type !== "public") throw new ui("JSON Web Key Set members must be public keys");
		r[n] = e;
	}
	return r[n];
}
function Aa(e) {
	let t = new Oa(e), n = async (e, n) => t.getKey(e, n);
	return Object.defineProperties(n, { jwks: {
		value: () => Da(t._jwks),
		enumerable: !0,
		configurable: !1,
		writable: !1
	} }), n;
}
var ja = async (e, t, n) => {
	let r, i, a = !1;
	typeof AbortController == "function" && (r = new AbortController(), i = setTimeout(() => {
		a = !0, r.abort();
	}, t));
	let o = await fetch(e.href, {
		signal: r ? r.signal : void 0,
		redirect: "manual",
		headers: n.headers
	}).catch((e) => {
		throw a ? new pi() : e;
	});
	if (i !== void 0 && clearTimeout(i), o.status !== 200) throw new ti("Expected 200 OK from the JSON Web Key Set HTTP response");
	try {
		return await o.json();
	} catch {
		throw new ti("Failed to parse the JSON Web Key Set HTTP response as JSON");
	}
};
function Ma() {
	return typeof WebSocketPair < "u" || typeof navigator < "u" && navigator.userAgent === "Cloudflare-Workers" || typeof EdgeRuntime < "u" && EdgeRuntime === "vercel";
}
var Na;
(typeof navigator > "u" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) && (Na = "jose/v5.10.0");
var Pa = Symbol();
function Fa(e, t) {
	return !(typeof e != "object" || !e || !("uat" in e) || typeof e.uat != "number" || Date.now() - e.uat >= t || !("jwks" in e) || !Oi(e.jwks) || !Array.isArray(e.jwks.keys) || !Array.prototype.every.call(e.jwks.keys, Oi));
}
var Ia = class {
	constructor(e, t) {
		if (!(e instanceof URL)) throw TypeError("url must be an instance of URL");
		this._url = new URL(e.href), this._options = {
			agent: t?.agent,
			headers: t?.headers
		}, this._timeoutDuration = typeof t?.timeoutDuration == "number" ? t?.timeoutDuration : 5e3, this._cooldownDuration = typeof t?.cooldownDuration == "number" ? t?.cooldownDuration : 3e4, this._cacheMaxAge = typeof t?.cacheMaxAge == "number" ? t?.cacheMaxAge : 6e5, t?.[Pa] !== void 0 && (this._cache = t?.[Pa], Fa(t?.[Pa], this._cacheMaxAge) && (this._jwksTimestamp = this._cache.uat, this._local = Aa(this._cache.jwks)));
	}
	coolingDown() {
		return typeof this._jwksTimestamp == "number" && Date.now() < this._jwksTimestamp + this._cooldownDuration;
	}
	fresh() {
		return typeof this._jwksTimestamp == "number" && Date.now() < this._jwksTimestamp + this._cacheMaxAge;
	}
	async getKey(e, t) {
		(!this._local || !this.fresh()) && await this.reload();
		try {
			return await this._local(e, t);
		} catch (n) {
			if (n instanceof di && this.coolingDown() === !1) return await this.reload(), this._local(e, t);
			throw n;
		}
	}
	async reload() {
		this._pendingFetch && Ma() && (this._pendingFetch = void 0);
		let e = new Headers(this._options.headers);
		Na && !e.has("User-Agent") && (e.set("User-Agent", Na), this._options.headers = Object.fromEntries(e.entries())), this._pendingFetch ||= ja(this._url, this._timeoutDuration, this._options).then((e) => {
			this._local = Aa(e), this._cache && (this._cache.uat = Date.now(), this._cache.jwks = e), this._jwksTimestamp = Date.now(), this._pendingFetch = void 0;
		}).catch((e) => {
			throw this._pendingFetch = void 0, e;
		}), await this._pendingFetch;
	}
};
function La(e, t) {
	let n = new Ia(e, t), r = async (e, t) => n.getKey(e, t);
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
var Ra = ei;
function za(e) {
	if (typeof e != "string") throw new ci("JWTs must use Compact JWS serialization, JWT must be a string");
	let { 1: t, length: n } = e.split(".");
	if (n === 5) throw new ci("Only JWTs using Compact JWS serialization can be decoded");
	if (n !== 3) throw new ci("Invalid JWT");
	if (!t) throw new ci("JWTs must contain a payload");
	let r;
	try {
		r = Ra(t);
	} catch {
		throw new ci("Failed to base64url decode the payload");
	}
	let i;
	try {
		i = JSON.parse(Yr.decode(r));
	} catch {
		throw new ci("Failed to parse the decoded payload as JSON");
	}
	if (!Oi(i)) throw new ci("Invalid JWT Claims Set");
	return i;
}
function Ba(e) {
	let t = e?.modulusLength ?? 2048;
	if (typeof t != "number" || t < 2048) throw new ii("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
	return t;
}
async function Va(e, t) {
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
				modulusLength: Ba(t)
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
				modulusLength: Ba(t)
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
				modulusLength: Ba(t)
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
				default: throw new ii("Invalid or unsupported crv option provided");
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
				default: throw new ii("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, X25519, and X448");
			}
			break;
		}
		default: throw new ii("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
	}
	return Gr.subtle.generateKey(n, t?.extractable ?? !1, r);
}
async function Ha(e, t) {
	return Va(e, t);
}
var Ua = async (e, t) => {
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
}, Wa = async (e, t, n) => {
	let r = new URL(t), i = r.origin + r.pathname + r.search, a = new URL(e).origin, o = await fetch(`${a}/.well-known/openid-configuration`).then((e) => {
		if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
		return e.json();
	}), s = o.issuer, c = (e) => e.endsWith("/") ? e.slice(0, -1) : e;
	if (c(e) !== c(s)) throw Error("RFC 9207 - iss !== idp - " + s + " !== " + e);
	sessionStorage.setItem("idp", s), sessionStorage.setItem("token_endpoint", o.token_endpoint), sessionStorage.setItem("jwks_uri", o.jwks_uri);
	let l = n?.client_id;
	if (!l) {
		let e = o.registration_endpoint;
		l = (await Ua(e, n ?? { redirect_uris: [i] }).then((e) => {
			if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
			return e.json();
		})).client_id;
	}
	try {
		new URL(l);
	} catch {
		sessionStorage.setItem("client_id", l);
	}
	let { pkce_code_verifier: u, pkce_code_challenge: d } = await Ga();
	sessionStorage.setItem("pkce_code_verifier", u);
	let f = window.crypto.randomUUID();
	sessionStorage.setItem("csrf_token", f);
	let p = o.authorization_endpoint + `?response_type=code&redirect_uri=${encodeURIComponent(i)}&scope=openid offline_access webid&client_id=${encodeURIComponent(l)}&code_challenge_method=S256&code_challenge=${d}&state=${f}&prompt=consent`;
	window.location.href = p;
}, Ga = async () => {
	let e = window.crypto.randomUUID() + "-" + window.crypto.randomUUID(), t = new Uint8Array(await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(e)));
	return {
		pkce_code_verifier: e,
		pkce_code_challenge: btoa(String.fromCharCode(...t)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
	};
}, Ka = async (e, t) => {
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
	let c = await Ha("ES256"), l = await qa(r, a, n.toString(), o, s, c).then((e) => {
		if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
		return e.json();
	}), u = l.access_token, d = sessionStorage.getItem("jwks_uri");
	if (d === null) throw Error("Access Token validation preparation - Could not find in sessionStorage: jwks_uri");
	let { payload: f } = await ha(u, La(new URL(d)), {
		issuer: i,
		audience: "solid"
	}), p = await Ca(await Qi(c.publicKey));
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
}, qa = async (e, t, n, r, i, a) => {
	let o = await Qi(a.publicKey);
	o.alg = "ES256";
	let s = await new xa({
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
}, Ja = async (e) => {
	try {
		await e.init();
		let t = await e.getItem("client_id"), n = await e.getItem("token_endpoint"), r = await e.getItem("dpop_keypair"), i = await e.getItem("refresh_token");
		if (t === null || n === null || r === null || i === null) throw Error("Could not refresh tokens: details missing from database.");
		let a = await Ya(i, t, n, r).then((e) => {
			if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
			return e.json();
		}), o = a.access_token, s = await e.getItem("idp");
		if (s === null) throw Error("Access Token validation preparation - Could not find in sessionDatabase: idp");
		let c = await e.getItem("jwks_uri");
		if (c === null) throw Error("Access Token validation preparation - Could not find in sessionDatabase: jwks_uri");
		let { payload: l } = await ha(o, La(new URL(c)), {
			issuer: s,
			audience: "solid"
		}), u = await Ca(await Qi(r.publicKey));
		if (l.cnf.jkt !== u) throw Error("Access Token validation failed on `jkt`: jkt !== DPoP thumbprint - " + l.cnf.jkt + " !== " + u);
		if (l.client_id !== t) throw Error("Access Token validation failed on `client_id`: JWT payload !== client_id - " + l.client_id + " !== " + t);
		return await e.setItem("refresh_token", a.refresh_token), {
			...a,
			dpop_key_pair: r
		};
	} finally {
		e.close();
	}
}, Ya = async (e, t, n, r) => {
	let i = await Qi(r.publicKey);
	i.alg = "ES256";
	let a = await new xa({
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
}, Xa;
(function(e) {
	e.STATE_CHANGE = "sessionStateChange", e.EXPIRATION_WARNING = "sessionExpirationWarning", e.EXPIRATION = "sessionExpiration";
})(Xa ||= {});
var Za = class extends EventTarget {
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
		super(), this.authFetch = this.authFetch.bind(this), this.information = { clientDetails: e }, this.database = t?.database, t?.onSessionStateChange && this.addEventListener(Xa.STATE_CHANGE, (e) => t.onSessionStateChange?.(e)), t?.onSessionExpirationWarning && this.addEventListener(Xa.EXPIRATION_WARNING, (e) => t?.onSessionExpirationWarning?.(e)), t?.onSessionExpiration && this.addEventListener(Xa.EXPIRATION, (e) => t?.onSessionExpiration?.(e));
	}
	async login(e, t) {
		await Wa(e, t, this.information.clientDetails);
	}
	async handleRedirectFromLogin() {
		let e = await Ka(this.information.clientDetails, this.database);
		e.tokenDetails && (this.information.clientDetails = e.clientDetails, this.information.idpDetails = e.idpDetails, await this.setTokenDetails(e.tokenDetails), this.dispatchStateChangeEvent());
	}
	async restore() {
		if (!this.database) throw Error("Could not refresh tokens: missing database. Provide database in sessionOption.");
		if (this.refreshPromise) return this.refreshPromise;
		this.refreshPromise = new Promise((e, t) => {
			this.resolveRefresh = e, this.rejectRefresh = t;
		});
		let e = this.isActive;
		return Ja(this.database).then((e) => this.setTokenDetails(e)).then(() => this.resolveRefresh()).catch((e) => {
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
		let t = await Qi(this.information.tokenDetails.dpop_key_pair.publicKey);
		return new xa(e).setIssuedAt().setJti(window.crypto.randomUUID()).setProtectedHeader({
			alg: "ES256",
			typ: "dpop+jwt",
			jwk: t
		}).sign(this.information.tokenDetails.dpop_key_pair.privateKey);
	}
	async _updateSessionDetailsFromToken(e) {
		if (!e) {
			await this.logout();
			return;
		}
		try {
			let t = za(e), n = t.webid;
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
		this.dispatchEvent(new CustomEvent(Xa.STATE_CHANGE, { detail: {
			isActive: this.isActive,
			webId: this.webId
		} }));
	}
	dispatchExpirationWarningEvent() {
		this.dispatchEvent(new CustomEvent(Xa.EXPIRATION_WARNING, { detail: { expires_in: this.getExpiresIn() } }));
	}
	dispatchExpirationEvent() {
		this.dispatchEvent(new CustomEvent(Xa.EXPIRATION));
	}
}, Qa = () => new URL("data:text/javascript;base64,dmFyIGNyeXB0byQxID0gY3J5cHRvOwpjb25zdCBpc0NyeXB0b0tleSA9IChrZXkpID0+IGtleSBpbnN0YW5jZW9mIENyeXB0b0tleTsKCmNvbnN0IGRpZ2VzdCA9IGFzeW5jIChhbGdvcml0aG0sIGRhdGEpID0+IHsKICAgIGNvbnN0IHN1YnRsZURpZ2VzdCA9IGBTSEEtJHthbGdvcml0aG0uc2xpY2UoLTMpfWA7CiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgY3J5cHRvJDEuc3VidGxlLmRpZ2VzdChzdWJ0bGVEaWdlc3QsIGRhdGEpKTsKfTsKdmFyIGRpZ2VzdCQxID0gZGlnZXN0OwoKY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpOwpjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7CmZ1bmN0aW9uIGNvbmNhdCguLi5idWZmZXJzKSB7CiAgICBjb25zdCBzaXplID0gYnVmZmVycy5yZWR1Y2UoKGFjYywgeyBsZW5ndGggfSkgPT4gYWNjICsgbGVuZ3RoLCAwKTsKICAgIGNvbnN0IGJ1ZiA9IG5ldyBVaW50OEFycmF5KHNpemUpOwogICAgbGV0IGkgPSAwOwogICAgZm9yIChjb25zdCBidWZmZXIgb2YgYnVmZmVycykgewogICAgICAgIGJ1Zi5zZXQoYnVmZmVyLCBpKTsKICAgICAgICBpICs9IGJ1ZmZlci5sZW5ndGg7CiAgICB9CiAgICByZXR1cm4gYnVmOwp9Cgpjb25zdCBlbmNvZGVCYXNlNjQgPSAoaW5wdXQpID0+IHsKICAgIGxldCB1bmVuY29kZWQgPSBpbnB1dDsKICAgIGlmICh0eXBlb2YgdW5lbmNvZGVkID09PSAnc3RyaW5nJykgewogICAgICAgIHVuZW5jb2RlZCA9IGVuY29kZXIuZW5jb2RlKHVuZW5jb2RlZCk7CiAgICB9CiAgICBjb25zdCBDSFVOS19TSVpFID0gMHg4MDAwOwogICAgY29uc3QgYXJyID0gW107CiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVuZW5jb2RlZC5sZW5ndGg7IGkgKz0gQ0hVTktfU0laRSkgewogICAgICAgIGFyci5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgdW5lbmNvZGVkLnN1YmFycmF5KGksIGkgKyBDSFVOS19TSVpFKSkpOwogICAgfQogICAgcmV0dXJuIGJ0b2EoYXJyLmpvaW4oJycpKTsKfTsKY29uc3QgZW5jb2RlID0gKGlucHV0KSA9PiB7CiAgICByZXR1cm4gZW5jb2RlQmFzZTY0KGlucHV0KS5yZXBsYWNlKC89L2csICcnKS5yZXBsYWNlKC9cKy9nLCAnLScpLnJlcGxhY2UoL1wvL2csICdfJyk7Cn07CmNvbnN0IGRlY29kZUJhc2U2NCA9IChlbmNvZGVkKSA9PiB7CiAgICBjb25zdCBiaW5hcnkgPSBhdG9iKGVuY29kZWQpOwogICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShiaW5hcnkubGVuZ3RoKTsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluYXJ5Lmxlbmd0aDsgaSsrKSB7CiAgICAgICAgYnl0ZXNbaV0gPSBiaW5hcnkuY2hhckNvZGVBdChpKTsKICAgIH0KICAgIHJldHVybiBieXRlczsKfTsKY29uc3QgZGVjb2RlJDEgPSAoaW5wdXQpID0+IHsKICAgIGxldCBlbmNvZGVkID0gaW5wdXQ7CiAgICBpZiAoZW5jb2RlZCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHsKICAgICAgICBlbmNvZGVkID0gZGVjb2Rlci5kZWNvZGUoZW5jb2RlZCk7CiAgICB9CiAgICBlbmNvZGVkID0gZW5jb2RlZC5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpLnJlcGxhY2UoL1xzL2csICcnKTsKICAgIHRyeSB7CiAgICAgICAgcmV0dXJuIGRlY29kZUJhc2U2NChlbmNvZGVkKTsKICAgIH0KICAgIGNhdGNoIHsKICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgaW5wdXQgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJyk7CiAgICB9Cn07CgpjbGFzcyBKT1NFRXJyb3IgZXh0ZW5kcyBFcnJvciB7CiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBvcHRpb25zKSB7CiAgICAgICAgc3VwZXIobWVzc2FnZSwgb3B0aW9ucyk7CiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KT1NFX0dFTkVSSUMnOwogICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTsKICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZT8uKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpOwogICAgfQp9CkpPU0VFcnJvci5jb2RlID0gJ0VSUl9KT1NFX0dFTkVSSUMnOwpjbGFzcyBKV1RDbGFpbVZhbGlkYXRpb25GYWlsZWQgZXh0ZW5kcyBKT1NFRXJyb3IgewogICAgY29uc3RydWN0b3IobWVzc2FnZSwgcGF5bG9hZCwgY2xhaW0gPSAndW5zcGVjaWZpZWQnLCByZWFzb24gPSAndW5zcGVjaWZpZWQnKSB7CiAgICAgICAgc3VwZXIobWVzc2FnZSwgeyBjYXVzZTogeyBjbGFpbSwgcmVhc29uLCBwYXlsb2FkIH0gfSk7CiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KV1RfQ0xBSU1fVkFMSURBVElPTl9GQUlMRUQnOwogICAgICAgIHRoaXMuY2xhaW0gPSBjbGFpbTsKICAgICAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbjsKICAgICAgICB0aGlzLnBheWxvYWQgPSBwYXlsb2FkOwogICAgfQp9CkpXVENsYWltVmFsaWRhdGlvbkZhaWxlZC5jb2RlID0gJ0VSUl9KV1RfQ0xBSU1fVkFMSURBVElPTl9GQUlMRUQnOwpjbGFzcyBKV1RFeHBpcmVkIGV4dGVuZHMgSk9TRUVycm9yIHsKICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHBheWxvYWQsIGNsYWltID0gJ3Vuc3BlY2lmaWVkJywgcmVhc29uID0gJ3Vuc3BlY2lmaWVkJykgewogICAgICAgIHN1cGVyKG1lc3NhZ2UsIHsgY2F1c2U6IHsgY2xhaW0sIHJlYXNvbiwgcGF5bG9hZCB9IH0pOwogICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldUX0VYUElSRUQnOwogICAgICAgIHRoaXMuY2xhaW0gPSBjbGFpbTsKICAgICAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbjsKICAgICAgICB0aGlzLnBheWxvYWQgPSBwYXlsb2FkOwogICAgfQp9CkpXVEV4cGlyZWQuY29kZSA9ICdFUlJfSldUX0VYUElSRUQnOwpjbGFzcyBKT1NFQWxnTm90QWxsb3dlZCBleHRlbmRzIEpPU0VFcnJvciB7CiAgICBjb25zdHJ1Y3RvcigpIHsKICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpOwogICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSk9TRV9BTEdfTk9UX0FMTE9XRUQnOwogICAgfQp9CkpPU0VBbGdOb3RBbGxvd2VkLmNvZGUgPSAnRVJSX0pPU0VfQUxHX05PVF9BTExPV0VEJzsKY2xhc3MgSk9TRU5vdFN1cHBvcnRlZCBleHRlbmRzIEpPU0VFcnJvciB7CiAgICBjb25zdHJ1Y3RvcigpIHsKICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpOwogICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSk9TRV9OT1RfU1VQUE9SVEVEJzsKICAgIH0KfQpKT1NFTm90U3VwcG9ydGVkLmNvZGUgPSAnRVJSX0pPU0VfTk9UX1NVUFBPUlRFRCc7CmNsYXNzIEpXRURlY3J5cHRpb25GYWlsZWQgZXh0ZW5kcyBKT1NFRXJyb3IgewogICAgY29uc3RydWN0b3IobWVzc2FnZSA9ICdkZWNyeXB0aW9uIG9wZXJhdGlvbiBmYWlsZWQnLCBvcHRpb25zKSB7CiAgICAgICAgc3VwZXIobWVzc2FnZSwgb3B0aW9ucyk7CiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KV0VfREVDUllQVElPTl9GQUlMRUQnOwogICAgfQp9CkpXRURlY3J5cHRpb25GYWlsZWQuY29kZSA9ICdFUlJfSldFX0RFQ1JZUFRJT05fRkFJTEVEJzsKY2xhc3MgSldFSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7CiAgICBjb25zdHJ1Y3RvcigpIHsKICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpOwogICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldFX0lOVkFMSUQnOwogICAgfQp9CkpXRUludmFsaWQuY29kZSA9ICdFUlJfSldFX0lOVkFMSUQnOwpjbGFzcyBKV1NJbnZhbGlkIGV4dGVuZHMgSk9TRUVycm9yIHsKICAgIGNvbnN0cnVjdG9yKCkgewogICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7CiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KV1NfSU5WQUxJRCc7CiAgICB9Cn0KSldTSW52YWxpZC5jb2RlID0gJ0VSUl9KV1NfSU5WQUxJRCc7CmNsYXNzIEpXVEludmFsaWQgZXh0ZW5kcyBKT1NFRXJyb3IgewogICAgY29uc3RydWN0b3IoKSB7CiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTsKICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXVF9JTlZBTElEJzsKICAgIH0KfQpKV1RJbnZhbGlkLmNvZGUgPSAnRVJSX0pXVF9JTlZBTElEJzsKY2xhc3MgSldLSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7CiAgICBjb25zdHJ1Y3RvcigpIHsKICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpOwogICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldLX0lOVkFMSUQnOwogICAgfQp9CkpXS0ludmFsaWQuY29kZSA9ICdFUlJfSldLX0lOVkFMSUQnOwpjbGFzcyBKV0tTSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7CiAgICBjb25zdHJ1Y3RvcigpIHsKICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpOwogICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldLU19JTlZBTElEJzsKICAgIH0KfQpKV0tTSW52YWxpZC5jb2RlID0gJ0VSUl9KV0tTX0lOVkFMSUQnOwpjbGFzcyBKV0tTTm9NYXRjaGluZ0tleSBleHRlbmRzIEpPU0VFcnJvciB7CiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlID0gJ25vIGFwcGxpY2FibGUga2V5IGZvdW5kIGluIHRoZSBKU09OIFdlYiBLZXkgU2V0Jywgb3B0aW9ucykgewogICAgICAgIHN1cGVyKG1lc3NhZ2UsIG9wdGlvbnMpOwogICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldLU19OT19NQVRDSElOR19LRVknOwogICAgfQp9CkpXS1NOb01hdGNoaW5nS2V5LmNvZGUgPSAnRVJSX0pXS1NfTk9fTUFUQ0hJTkdfS0VZJzsKY2xhc3MgSldLU011bHRpcGxlTWF0Y2hpbmdLZXlzIGV4dGVuZHMgSk9TRUVycm9yIHsKICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSAnbXVsdGlwbGUgbWF0Y2hpbmcga2V5cyBmb3VuZCBpbiB0aGUgSlNPTiBXZWIgS2V5IFNldCcsIG9wdGlvbnMpIHsKICAgICAgICBzdXBlcihtZXNzYWdlLCBvcHRpb25zKTsKICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXS1NfTVVMVElQTEVfTUFUQ0hJTkdfS0VZUyc7CiAgICB9Cn0KSldLU011bHRpcGxlTWF0Y2hpbmdLZXlzLmNvZGUgPSAnRVJSX0pXS1NfTVVMVElQTEVfTUFUQ0hJTkdfS0VZUyc7CmNsYXNzIEpXS1NUaW1lb3V0IGV4dGVuZHMgSk9TRUVycm9yIHsKICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSAncmVxdWVzdCB0aW1lZCBvdXQnLCBvcHRpb25zKSB7CiAgICAgICAgc3VwZXIobWVzc2FnZSwgb3B0aW9ucyk7CiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KV0tTX1RJTUVPVVQnOwogICAgfQp9CkpXS1NUaW1lb3V0LmNvZGUgPSAnRVJSX0pXS1NfVElNRU9VVCc7CmNsYXNzIEpXU1NpZ25hdHVyZVZlcmlmaWNhdGlvbkZhaWxlZCBleHRlbmRzIEpPU0VFcnJvciB7CiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlID0gJ3NpZ25hdHVyZSB2ZXJpZmljYXRpb24gZmFpbGVkJywgb3B0aW9ucykgewogICAgICAgIHN1cGVyKG1lc3NhZ2UsIG9wdGlvbnMpOwogICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldTX1NJR05BVFVSRV9WRVJJRklDQVRJT05fRkFJTEVEJzsKICAgIH0KfQpKV1NTaWduYXR1cmVWZXJpZmljYXRpb25GYWlsZWQuY29kZSA9ICdFUlJfSldTX1NJR05BVFVSRV9WRVJJRklDQVRJT05fRkFJTEVEJzsKCmZ1bmN0aW9uIHVudXNhYmxlKG5hbWUsIHByb3AgPSAnYWxnb3JpdGhtLm5hbWUnKSB7CiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihgQ3J5cHRvS2V5IGRvZXMgbm90IHN1cHBvcnQgdGhpcyBvcGVyYXRpb24sIGl0cyAke3Byb3B9IG11c3QgYmUgJHtuYW1lfWApOwp9CmZ1bmN0aW9uIGlzQWxnb3JpdGhtKGFsZ29yaXRobSwgbmFtZSkgewogICAgcmV0dXJuIGFsZ29yaXRobS5uYW1lID09PSBuYW1lOwp9CmZ1bmN0aW9uIGdldEhhc2hMZW5ndGgoaGFzaCkgewogICAgcmV0dXJuIHBhcnNlSW50KGhhc2gubmFtZS5zbGljZSg0KSwgMTApOwp9CmZ1bmN0aW9uIGdldE5hbWVkQ3VydmUoYWxnKSB7CiAgICBzd2l0Y2ggKGFsZykgewogICAgICAgIGNhc2UgJ0VTMjU2JzoKICAgICAgICAgICAgcmV0dXJuICdQLTI1Nic7CiAgICAgICAgY2FzZSAnRVMzODQnOgogICAgICAgICAgICByZXR1cm4gJ1AtMzg0JzsKICAgICAgICBjYXNlICdFUzUxMic6CiAgICAgICAgICAgIHJldHVybiAnUC01MjEnOwogICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWFjaGFibGUnKTsKICAgIH0KfQpmdW5jdGlvbiBjaGVja1VzYWdlKGtleSwgdXNhZ2VzKSB7CiAgICBpZiAodXNhZ2VzLmxlbmd0aCAmJiAhdXNhZ2VzLnNvbWUoKGV4cGVjdGVkKSA9PiBrZXkudXNhZ2VzLmluY2x1ZGVzKGV4cGVjdGVkKSkpIHsKICAgICAgICBsZXQgbXNnID0gJ0NyeXB0b0tleSBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgb3BlcmF0aW9uLCBpdHMgdXNhZ2VzIG11c3QgaW5jbHVkZSAnOwogICAgICAgIGlmICh1c2FnZXMubGVuZ3RoID4gMikgewogICAgICAgICAgICBjb25zdCBsYXN0ID0gdXNhZ2VzLnBvcCgpOwogICAgICAgICAgICBtc2cgKz0gYG9uZSBvZiAke3VzYWdlcy5qb2luKCcsICcpfSwgb3IgJHtsYXN0fS5gOwogICAgICAgIH0KICAgICAgICBlbHNlIGlmICh1c2FnZXMubGVuZ3RoID09PSAyKSB7CiAgICAgICAgICAgIG1zZyArPSBgb25lIG9mICR7dXNhZ2VzWzBdfSBvciAke3VzYWdlc1sxXX0uYDsKICAgICAgICB9CiAgICAgICAgZWxzZSB7CiAgICAgICAgICAgIG1zZyArPSBgJHt1c2FnZXNbMF19LmA7CiAgICAgICAgfQogICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IobXNnKTsKICAgIH0KfQpmdW5jdGlvbiBjaGVja1NpZ0NyeXB0b0tleShrZXksIGFsZywgLi4udXNhZ2VzKSB7CiAgICBzd2l0Y2ggKGFsZykgewogICAgICAgIGNhc2UgJ0hTMjU2JzoKICAgICAgICBjYXNlICdIUzM4NCc6CiAgICAgICAgY2FzZSAnSFM1MTInOiB7CiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ0hNQUMnKSkKICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdITUFDJyk7CiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkID0gcGFyc2VJbnQoYWxnLnNsaWNlKDIpLCAxMCk7CiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGdldEhhc2hMZW5ndGgoa2V5LmFsZ29yaXRobS5oYXNoKTsKICAgICAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpCiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZShgU0hBLSR7ZXhwZWN0ZWR9YCwgJ2FsZ29yaXRobS5oYXNoJyk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgICAgICBjYXNlICdSUzI1Nic6CiAgICAgICAgY2FzZSAnUlMzODQnOgogICAgICAgIGNhc2UgJ1JTNTEyJzogewogICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdSU0FTU0EtUEtDUzEtdjFfNScpKQogICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ1JTQVNTQS1QS0NTMS12MV81Jyk7CiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkID0gcGFyc2VJbnQoYWxnLnNsaWNlKDIpLCAxMCk7CiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGdldEhhc2hMZW5ndGgoa2V5LmFsZ29yaXRobS5oYXNoKTsKICAgICAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpCiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZShgU0hBLSR7ZXhwZWN0ZWR9YCwgJ2FsZ29yaXRobS5oYXNoJyk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgICAgICBjYXNlICdQUzI1Nic6CiAgICAgICAgY2FzZSAnUFMzODQnOgogICAgICAgIGNhc2UgJ1BTNTEyJzogewogICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdSU0EtUFNTJykpCiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnUlNBLVBTUycpOwogICAgICAgICAgICBjb25zdCBleHBlY3RlZCA9IHBhcnNlSW50KGFsZy5zbGljZSgyKSwgMTApOwogICAgICAgICAgICBjb25zdCBhY3R1YWwgPSBnZXRIYXNoTGVuZ3RoKGtleS5hbGdvcml0aG0uaGFzaCk7CiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKQogICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoYFNIQS0ke2V4cGVjdGVkfWAsICdhbGdvcml0aG0uaGFzaCcpOwogICAgICAgICAgICBicmVhazsKICAgICAgICB9CiAgICAgICAgY2FzZSAnRWREU0EnOiB7CiAgICAgICAgICAgIGlmIChrZXkuYWxnb3JpdGhtLm5hbWUgIT09ICdFZDI1NTE5JyAmJiBrZXkuYWxnb3JpdGhtLm5hbWUgIT09ICdFZDQ0OCcpIHsKICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdFZDI1NTE5IG9yIEVkNDQ4Jyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgfQogICAgICAgIGNhc2UgJ0VkMjU1MTknOiB7CiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ0VkMjU1MTknKSkKICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdFZDI1NTE5Jyk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgICAgICBjYXNlICdFUzI1Nic6CiAgICAgICAgY2FzZSAnRVMzODQnOgogICAgICAgIGNhc2UgJ0VTNTEyJzogewogICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdFQ0RTQScpKQogICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ0VDRFNBJyk7CiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkID0gZ2V0TmFtZWRDdXJ2ZShhbGcpOwogICAgICAgICAgICBjb25zdCBhY3R1YWwgPSBrZXkuYWxnb3JpdGhtLm5hbWVkQ3VydmU7CiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKQogICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoZXhwZWN0ZWQsICdhbGdvcml0aG0ubmFtZWRDdXJ2ZScpOwogICAgICAgICAgICBicmVhazsKICAgICAgICB9CiAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ3J5cHRvS2V5IGRvZXMgbm90IHN1cHBvcnQgdGhpcyBvcGVyYXRpb24nKTsKICAgIH0KICAgIGNoZWNrVXNhZ2Uoa2V5LCB1c2FnZXMpOwp9CgpmdW5jdGlvbiBtZXNzYWdlKG1zZywgYWN0dWFsLCAuLi50eXBlcykgewogICAgdHlwZXMgPSB0eXBlcy5maWx0ZXIoQm9vbGVhbik7CiAgICBpZiAodHlwZXMubGVuZ3RoID4gMikgewogICAgICAgIGNvbnN0IGxhc3QgPSB0eXBlcy5wb3AoKTsKICAgICAgICBtc2cgKz0gYG9uZSBvZiB0eXBlICR7dHlwZXMuam9pbignLCAnKX0sIG9yICR7bGFzdH0uYDsKICAgIH0KICAgIGVsc2UgaWYgKHR5cGVzLmxlbmd0aCA9PT0gMikgewogICAgICAgIG1zZyArPSBgb25lIG9mIHR5cGUgJHt0eXBlc1swXX0gb3IgJHt0eXBlc1sxXX0uYDsKICAgIH0KICAgIGVsc2UgewogICAgICAgIG1zZyArPSBgb2YgdHlwZSAke3R5cGVzWzBdfS5gOwogICAgfQogICAgaWYgKGFjdHVhbCA9PSBudWxsKSB7CiAgICAgICAgbXNnICs9IGAgUmVjZWl2ZWQgJHthY3R1YWx9YDsKICAgIH0KICAgIGVsc2UgaWYgKHR5cGVvZiBhY3R1YWwgPT09ICdmdW5jdGlvbicgJiYgYWN0dWFsLm5hbWUpIHsKICAgICAgICBtc2cgKz0gYCBSZWNlaXZlZCBmdW5jdGlvbiAke2FjdHVhbC5uYW1lfWA7CiAgICB9CiAgICBlbHNlIGlmICh0eXBlb2YgYWN0dWFsID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgIT0gbnVsbCkgewogICAgICAgIGlmIChhY3R1YWwuY29uc3RydWN0b3I/Lm5hbWUpIHsKICAgICAgICAgICAgbXNnICs9IGAgUmVjZWl2ZWQgYW4gaW5zdGFuY2Ugb2YgJHthY3R1YWwuY29uc3RydWN0b3IubmFtZX1gOwogICAgICAgIH0KICAgIH0KICAgIHJldHVybiBtc2c7Cn0KdmFyIGludmFsaWRLZXlJbnB1dCA9IChhY3R1YWwsIC4uLnR5cGVzKSA9PiB7CiAgICByZXR1cm4gbWVzc2FnZSgnS2V5IG11c3QgYmUgJywgYWN0dWFsLCAuLi50eXBlcyk7Cn07CmZ1bmN0aW9uIHdpdGhBbGcoYWxnLCBhY3R1YWwsIC4uLnR5cGVzKSB7CiAgICByZXR1cm4gbWVzc2FnZShgS2V5IGZvciB0aGUgJHthbGd9IGFsZ29yaXRobSBtdXN0IGJlIGAsIGFjdHVhbCwgLi4udHlwZXMpOwp9Cgp2YXIgaXNLZXlMaWtlID0gKGtleSkgPT4gewogICAgaWYgKGlzQ3J5cHRvS2V5KGtleSkpIHsKICAgICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KICAgIHJldHVybiBrZXk/LltTeW1ib2wudG9TdHJpbmdUYWddID09PSAnS2V5T2JqZWN0JzsKfTsKY29uc3QgdHlwZXMgPSBbJ0NyeXB0b0tleSddOwoKY29uc3QgaXNEaXNqb2ludCA9ICguLi5oZWFkZXJzKSA9PiB7CiAgICBjb25zdCBzb3VyY2VzID0gaGVhZGVycy5maWx0ZXIoQm9vbGVhbik7CiAgICBpZiAoc291cmNlcy5sZW5ndGggPT09IDAgfHwgc291cmNlcy5sZW5ndGggPT09IDEpIHsKICAgICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KICAgIGxldCBhY2M7CiAgICBmb3IgKGNvbnN0IGhlYWRlciBvZiBzb3VyY2VzKSB7CiAgICAgICAgY29uc3QgcGFyYW1ldGVycyA9IE9iamVjdC5rZXlzKGhlYWRlcik7CiAgICAgICAgaWYgKCFhY2MgfHwgYWNjLnNpemUgPT09IDApIHsKICAgICAgICAgICAgYWNjID0gbmV3IFNldChwYXJhbWV0ZXJzKTsKICAgICAgICAgICAgY29udGludWU7CiAgICAgICAgfQogICAgICAgIGZvciAoY29uc3QgcGFyYW1ldGVyIG9mIHBhcmFtZXRlcnMpIHsKICAgICAgICAgICAgaWYgKGFjYy5oYXMocGFyYW1ldGVyKSkgewogICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGFjYy5hZGQocGFyYW1ldGVyKTsKICAgICAgICB9CiAgICB9CiAgICByZXR1cm4gdHJ1ZTsKfTsKdmFyIGlzRGlzam9pbnQkMSA9IGlzRGlzam9pbnQ7CgpmdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHsKICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsOwp9CmZ1bmN0aW9uIGlzT2JqZWN0KGlucHV0KSB7CiAgICBpZiAoIWlzT2JqZWN0TGlrZShpbnB1dCkgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHsKICAgICAgICByZXR1cm4gZmFsc2U7CiAgICB9CiAgICBpZiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKGlucHV0KSA9PT0gbnVsbCkgewogICAgICAgIHJldHVybiB0cnVlOwogICAgfQogICAgbGV0IHByb3RvID0gaW5wdXQ7CiAgICB3aGlsZSAoT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKSAhPT0gbnVsbCkgewogICAgICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKTsKICAgIH0KICAgIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoaW5wdXQpID09PSBwcm90bzsKfQoKdmFyIGNoZWNrS2V5TGVuZ3RoID0gKGFsZywga2V5KSA9PiB7CiAgICBpZiAoYWxnLnN0YXJ0c1dpdGgoJ1JTJykgfHwgYWxnLnN0YXJ0c1dpdGgoJ1BTJykpIHsKICAgICAgICBjb25zdCB7IG1vZHVsdXNMZW5ndGggfSA9IGtleS5hbGdvcml0aG07CiAgICAgICAgaWYgKHR5cGVvZiBtb2R1bHVzTGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBtb2R1bHVzTGVuZ3RoIDwgMjA0OCkgewogICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2FsZ30gcmVxdWlyZXMga2V5IG1vZHVsdXNMZW5ndGggdG8gYmUgMjA0OCBiaXRzIG9yIGxhcmdlcmApOwogICAgICAgIH0KICAgIH0KfTsKCmZ1bmN0aW9uIGlzSldLKGtleSkgewogICAgcmV0dXJuIGlzT2JqZWN0KGtleSkgJiYgdHlwZW9mIGtleS5rdHkgPT09ICdzdHJpbmcnOwp9CmZ1bmN0aW9uIGlzUHJpdmF0ZUpXSyhrZXkpIHsKICAgIHJldHVybiBrZXkua3R5ICE9PSAnb2N0JyAmJiB0eXBlb2Yga2V5LmQgPT09ICdzdHJpbmcnOwp9CmZ1bmN0aW9uIGlzUHVibGljSldLKGtleSkgewogICAgcmV0dXJuIGtleS5rdHkgIT09ICdvY3QnICYmIHR5cGVvZiBrZXkuZCA9PT0gJ3VuZGVmaW5lZCc7Cn0KZnVuY3Rpb24gaXNTZWNyZXRKV0soa2V5KSB7CiAgICByZXR1cm4gaXNKV0soa2V5KSAmJiBrZXkua3R5ID09PSAnb2N0JyAmJiB0eXBlb2Yga2V5LmsgPT09ICdzdHJpbmcnOwp9CgpmdW5jdGlvbiBzdWJ0bGVNYXBwaW5nKGp3aykgewogICAgbGV0IGFsZ29yaXRobTsKICAgIGxldCBrZXlVc2FnZXM7CiAgICBzd2l0Y2ggKGp3ay5rdHkpIHsKICAgICAgICBjYXNlICdSU0EnOiB7CiAgICAgICAgICAgIHN3aXRjaCAoandrLmFsZykgewogICAgICAgICAgICAgICAgY2FzZSAnUFMyNTYnOgogICAgICAgICAgICAgICAgY2FzZSAnUFMzODQnOgogICAgICAgICAgICAgICAgY2FzZSAnUFM1MTInOgogICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ1JTQS1QU1MnLCBoYXNoOiBgU0hBLSR7andrLmFsZy5zbGljZSgtMyl9YCB9OwogICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IGp3ay5kID8gWydzaWduJ10gOiBbJ3ZlcmlmeSddOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAnUlMyNTYnOgogICAgICAgICAgICAgICAgY2FzZSAnUlMzODQnOgogICAgICAgICAgICAgICAgY2FzZSAnUlM1MTInOgogICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogJ1JTQVNTQS1QS0NTMS12MV81JywgaGFzaDogYFNIQS0ke2p3ay5hbGcuc2xpY2UoLTMpfWAgfTsKICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBqd2suZCA/IFsnc2lnbiddIDogWyd2ZXJpZnknXTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ1JTQS1PQUVQJzoKICAgICAgICAgICAgICAgIGNhc2UgJ1JTQS1PQUVQLTI1Nic6CiAgICAgICAgICAgICAgICBjYXNlICdSU0EtT0FFUC0zODQnOgogICAgICAgICAgICAgICAgY2FzZSAnUlNBLU9BRVAtNTEyJzoKICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG0gPSB7CiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdSU0EtT0FFUCcsCiAgICAgICAgICAgICAgICAgICAgICAgIGhhc2g6IGBTSEEtJHtwYXJzZUludChqd2suYWxnLnNsaWNlKC0zKSwgMTApIHx8IDF9YCwKICAgICAgICAgICAgICAgICAgICB9OwogICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IGp3ay5kID8gWydkZWNyeXB0JywgJ3Vud3JhcEtleSddIDogWydlbmNyeXB0JywgJ3dyYXBLZXknXTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgSldLICJhbGciIChBbGdvcml0aG0pIFBhcmFtZXRlciB2YWx1ZScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgICAgICBjYXNlICdFQyc6IHsKICAgICAgICAgICAgc3dpdGNoIChqd2suYWxnKSB7CiAgICAgICAgICAgICAgICBjYXNlICdFUzI1Nic6CiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC0yNTYnIH07CiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gandrLmQgPyBbJ3NpZ24nXSA6IFsndmVyaWZ5J107CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdFUzM4NCc6CiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC0zODQnIH07CiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gandrLmQgPyBbJ3NpZ24nXSA6IFsndmVyaWZ5J107CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdFUzUxMic6CiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRUNEU0EnLCBuYW1lZEN1cnZlOiAnUC01MjEnIH07CiAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VzID0gandrLmQgPyBbJ3NpZ24nXSA6IFsndmVyaWZ5J107CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlICdFQ0RILUVTJzoKICAgICAgICAgICAgICAgIGNhc2UgJ0VDREgtRVMrQTEyOEtXJzoKICAgICAgICAgICAgICAgIGNhc2UgJ0VDREgtRVMrQTE5MktXJzoKICAgICAgICAgICAgICAgIGNhc2UgJ0VDREgtRVMrQTI1NktXJzoKICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6ICdFQ0RIJywgbmFtZWRDdXJ2ZTogandrLmNydiB9OwogICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IGp3ay5kID8gWydkZXJpdmVCaXRzJ10gOiBbXTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgSldLICJhbGciIChBbGdvcml0aG0pIFBhcmFtZXRlciB2YWx1ZScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgICAgICBjYXNlICdPS1AnOiB7CiAgICAgICAgICAgIHN3aXRjaCAoandrLmFsZykgewogICAgICAgICAgICAgICAgY2FzZSAnRWQyNTUxOSc6CiAgICAgICAgICAgICAgICAgICAgYWxnb3JpdGhtID0geyBuYW1lOiAnRWQyNTUxOScgfTsKICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBqd2suZCA/IFsnc2lnbiddIDogWyd2ZXJpZnknXTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ0VkRFNBJzoKICAgICAgICAgICAgICAgICAgICBhbGdvcml0aG0gPSB7IG5hbWU6IGp3ay5jcnYgfTsKICAgICAgICAgICAgICAgICAgICBrZXlVc2FnZXMgPSBqd2suZCA/IFsnc2lnbiddIDogWyd2ZXJpZnknXTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgJ0VDREgtRVMnOgogICAgICAgICAgICAgICAgY2FzZSAnRUNESC1FUytBMTI4S1cnOgogICAgICAgICAgICAgICAgY2FzZSAnRUNESC1FUytBMTkyS1cnOgogICAgICAgICAgICAgICAgY2FzZSAnRUNESC1FUytBMjU2S1cnOgogICAgICAgICAgICAgICAgICAgIGFsZ29yaXRobSA9IHsgbmFtZTogandrLmNydiB9OwogICAgICAgICAgICAgICAgICAgIGtleVVzYWdlcyA9IGp3ay5kID8gWydkZXJpdmVCaXRzJ10gOiBbXTsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgSldLICJhbGciIChBbGdvcml0aG0pIFBhcmFtZXRlciB2YWx1ZScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBKV0sgImt0eSIgKEtleSBUeXBlKSBQYXJhbWV0ZXIgdmFsdWUnKTsKICAgIH0KICAgIHJldHVybiB7IGFsZ29yaXRobSwga2V5VXNhZ2VzIH07Cn0KY29uc3QgcGFyc2UgPSBhc3luYyAoandrKSA9PiB7CiAgICBpZiAoIWp3ay5hbGcpIHsKICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCciYWxnIiBhcmd1bWVudCBpcyByZXF1aXJlZCB3aGVuICJqd2suYWxnIiBpcyBub3QgcHJlc2VudCcpOwogICAgfQogICAgY29uc3QgeyBhbGdvcml0aG0sIGtleVVzYWdlcyB9ID0gc3VidGxlTWFwcGluZyhqd2spOwogICAgY29uc3QgcmVzdCA9IFsKICAgICAgICBhbGdvcml0aG0sCiAgICAgICAgandrLmV4dCA/PyBmYWxzZSwKICAgICAgICBqd2sua2V5X29wcyA/PyBrZXlVc2FnZXMsCiAgICBdOwogICAgY29uc3Qga2V5RGF0YSA9IHsgLi4uandrIH07CiAgICBkZWxldGUga2V5RGF0YS5hbGc7CiAgICBkZWxldGUga2V5RGF0YS51c2U7CiAgICByZXR1cm4gY3J5cHRvJDEuc3VidGxlLmltcG9ydEtleSgnandrJywga2V5RGF0YSwgLi4ucmVzdCk7Cn07CnZhciBhc0tleU9iamVjdCA9IHBhcnNlOwoKY29uc3QgZXhwb3J0S2V5VmFsdWUgPSAoaykgPT4gZGVjb2RlJDEoayk7CmxldCBwcml2Q2FjaGU7CmxldCBwdWJDYWNoZTsKY29uc3QgaXNLZXlPYmplY3QgPSAoa2V5KSA9PiB7CiAgICByZXR1cm4ga2V5Py5bU3ltYm9sLnRvU3RyaW5nVGFnXSA9PT0gJ0tleU9iamVjdCc7Cn07CmNvbnN0IGltcG9ydEFuZENhY2hlID0gYXN5bmMgKGNhY2hlLCBrZXksIGp3aywgYWxnLCBmcmVlemUgPSBmYWxzZSkgPT4gewogICAgbGV0IGNhY2hlZCA9IGNhY2hlLmdldChrZXkpOwogICAgaWYgKGNhY2hlZD8uW2FsZ10pIHsKICAgICAgICByZXR1cm4gY2FjaGVkW2FsZ107CiAgICB9CiAgICBjb25zdCBjcnlwdG9LZXkgPSBhd2FpdCBhc0tleU9iamVjdCh7IC4uLmp3aywgYWxnIH0pOwogICAgaWYgKGZyZWV6ZSkKICAgICAgICBPYmplY3QuZnJlZXplKGtleSk7CiAgICBpZiAoIWNhY2hlZCkgewogICAgICAgIGNhY2hlLnNldChrZXksIHsgW2FsZ106IGNyeXB0b0tleSB9KTsKICAgIH0KICAgIGVsc2UgewogICAgICAgIGNhY2hlZFthbGddID0gY3J5cHRvS2V5OwogICAgfQogICAgcmV0dXJuIGNyeXB0b0tleTsKfTsKY29uc3Qgbm9ybWFsaXplUHVibGljS2V5ID0gKGtleSwgYWxnKSA9PiB7CiAgICBpZiAoaXNLZXlPYmplY3Qoa2V5KSkgewogICAgICAgIGxldCBqd2sgPSBrZXkuZXhwb3J0KHsgZm9ybWF0OiAnandrJyB9KTsKICAgICAgICBkZWxldGUgandrLmQ7CiAgICAgICAgZGVsZXRlIGp3ay5kcDsKICAgICAgICBkZWxldGUgandrLmRxOwogICAgICAgIGRlbGV0ZSBqd2sucDsKICAgICAgICBkZWxldGUgandrLnE7CiAgICAgICAgZGVsZXRlIGp3ay5xaTsKICAgICAgICBpZiAoandrLmspIHsKICAgICAgICAgICAgcmV0dXJuIGV4cG9ydEtleVZhbHVlKGp3ay5rKTsKICAgICAgICB9CiAgICAgICAgcHViQ2FjaGUgfHwgKHB1YkNhY2hlID0gbmV3IFdlYWtNYXAoKSk7CiAgICAgICAgcmV0dXJuIGltcG9ydEFuZENhY2hlKHB1YkNhY2hlLCBrZXksIGp3aywgYWxnKTsKICAgIH0KICAgIGlmIChpc0pXSyhrZXkpKSB7CiAgICAgICAgaWYgKGtleS5rKQogICAgICAgICAgICByZXR1cm4gZGVjb2RlJDEoa2V5LmspOwogICAgICAgIHB1YkNhY2hlIHx8IChwdWJDYWNoZSA9IG5ldyBXZWFrTWFwKCkpOwogICAgICAgIGNvbnN0IGNyeXB0b0tleSA9IGltcG9ydEFuZENhY2hlKHB1YkNhY2hlLCBrZXksIGtleSwgYWxnLCB0cnVlKTsKICAgICAgICByZXR1cm4gY3J5cHRvS2V5OwogICAgfQogICAgcmV0dXJuIGtleTsKfTsKY29uc3Qgbm9ybWFsaXplUHJpdmF0ZUtleSA9IChrZXksIGFsZykgPT4gewogICAgaWYgKGlzS2V5T2JqZWN0KGtleSkpIHsKICAgICAgICBsZXQgandrID0ga2V5LmV4cG9ydCh7IGZvcm1hdDogJ2p3aycgfSk7CiAgICAgICAgaWYgKGp3ay5rKSB7CiAgICAgICAgICAgIHJldHVybiBleHBvcnRLZXlWYWx1ZShqd2suayk7CiAgICAgICAgfQogICAgICAgIHByaXZDYWNoZSB8fCAocHJpdkNhY2hlID0gbmV3IFdlYWtNYXAoKSk7CiAgICAgICAgcmV0dXJuIGltcG9ydEFuZENhY2hlKHByaXZDYWNoZSwga2V5LCBqd2ssIGFsZyk7CiAgICB9CiAgICBpZiAoaXNKV0soa2V5KSkgewogICAgICAgIGlmIChrZXkuaykKICAgICAgICAgICAgcmV0dXJuIGRlY29kZSQxKGtleS5rKTsKICAgICAgICBwcml2Q2FjaGUgfHwgKHByaXZDYWNoZSA9IG5ldyBXZWFrTWFwKCkpOwogICAgICAgIGNvbnN0IGNyeXB0b0tleSA9IGltcG9ydEFuZENhY2hlKHByaXZDYWNoZSwga2V5LCBrZXksIGFsZywgdHJ1ZSk7CiAgICAgICAgcmV0dXJuIGNyeXB0b0tleTsKICAgIH0KICAgIHJldHVybiBrZXk7Cn07CnZhciBub3JtYWxpemUgPSB7IG5vcm1hbGl6ZVB1YmxpY0tleSwgbm9ybWFsaXplUHJpdmF0ZUtleSB9OwoKYXN5bmMgZnVuY3Rpb24gaW1wb3J0SldLKGp3aywgYWxnKSB7CiAgICBpZiAoIWlzT2JqZWN0KGp3aykpIHsKICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdKV0sgbXVzdCBiZSBhbiBvYmplY3QnKTsKICAgIH0KICAgIGFsZyB8fCAoYWxnID0gandrLmFsZyk7CiAgICBzd2l0Y2ggKGp3ay5rdHkpIHsKICAgICAgICBjYXNlICdvY3QnOgogICAgICAgICAgICBpZiAodHlwZW9mIGp3ay5rICE9PSAnc3RyaW5nJyB8fCAhandrLmspIHsKICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ21pc3NpbmcgImsiIChLZXkgVmFsdWUpIFBhcmFtZXRlciB2YWx1ZScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiBkZWNvZGUkMShqd2suayk7CiAgICAgICAgY2FzZSAnUlNBJzoKICAgICAgICAgICAgaWYgKCdvdGgnIGluIGp3ayAmJiBqd2sub3RoICE9PSB1bmRlZmluZWQpIHsKICAgICAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdSU0EgSldLICJvdGgiIChPdGhlciBQcmltZXMgSW5mbykgUGFyYW1ldGVyIHZhbHVlIGlzIG5vdCBzdXBwb3J0ZWQnKTsKICAgICAgICAgICAgfQogICAgICAgIGNhc2UgJ0VDJzoKICAgICAgICBjYXNlICdPS1AnOgogICAgICAgICAgICByZXR1cm4gYXNLZXlPYmplY3QoeyAuLi5qd2ssIGFsZyB9KTsKICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnVW5zdXBwb3J0ZWQgImt0eSIgKEtleSBUeXBlKSBQYXJhbWV0ZXIgdmFsdWUnKTsKICAgIH0KfQoKY29uc3QgdGFnID0gKGtleSkgPT4ga2V5Py5bU3ltYm9sLnRvU3RyaW5nVGFnXTsKY29uc3QgandrTWF0Y2hlc09wID0gKGFsZywga2V5LCB1c2FnZSkgPT4gewogICAgaWYgKGtleS51c2UgIT09IHVuZGVmaW5lZCAmJiBrZXkudXNlICE9PSAnc2lnJykgewogICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQga2V5IGZvciB0aGlzIG9wZXJhdGlvbiwgd2hlbiBwcmVzZW50IGl0cyB1c2UgbXVzdCBiZSBzaWcnKTsKICAgIH0KICAgIGlmIChrZXkua2V5X29wcyAhPT0gdW5kZWZpbmVkICYmIGtleS5rZXlfb3BzLmluY2x1ZGVzPy4odXNhZ2UpICE9PSB0cnVlKSB7CiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBrZXkgZm9yIHRoaXMgb3BlcmF0aW9uLCB3aGVuIHByZXNlbnQgaXRzIGtleV9vcHMgbXVzdCBpbmNsdWRlICR7dXNhZ2V9YCk7CiAgICB9CiAgICBpZiAoa2V5LmFsZyAhPT0gdW5kZWZpbmVkICYmIGtleS5hbGcgIT09IGFsZykgewogICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQga2V5IGZvciB0aGlzIG9wZXJhdGlvbiwgd2hlbiBwcmVzZW50IGl0cyBhbGcgbXVzdCBiZSAke2FsZ31gKTsKICAgIH0KICAgIHJldHVybiB0cnVlOwp9Owpjb25zdCBzeW1tZXRyaWNUeXBlQ2hlY2sgPSAoYWxnLCBrZXksIHVzYWdlLCBhbGxvd0p3aykgPT4gewogICAgaWYgKGtleSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpCiAgICAgICAgcmV0dXJuOwogICAgaWYgKGFsbG93SndrICYmIGlzSldLKGtleSkpIHsKICAgICAgICBpZiAoaXNTZWNyZXRKV0soa2V5KSAmJiBqd2tNYXRjaGVzT3AoYWxnLCBrZXksIHVzYWdlKSkKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEpTT04gV2ViIEtleSBmb3Igc3ltbWV0cmljIGFsZ29yaXRobXMgbXVzdCBoYXZlIEpXSyAia3R5IiAoS2V5IFR5cGUpIGVxdWFsIHRvICJvY3QiIGFuZCB0aGUgSldLICJrIiAoS2V5IFZhbHVlKSBwcmVzZW50YCk7CiAgICB9CiAgICBpZiAoIWlzS2V5TGlrZShrZXkpKSB7CiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcih3aXRoQWxnKGFsZywga2V5LCAuLi50eXBlcywgJ1VpbnQ4QXJyYXknLCBhbGxvd0p3ayA/ICdKU09OIFdlYiBLZXknIDogbnVsbCkpOwogICAgfQogICAgaWYgKGtleS50eXBlICE9PSAnc2VjcmV0JykgewogICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dGFnKGtleSl9IGluc3RhbmNlcyBmb3Igc3ltbWV0cmljIGFsZ29yaXRobXMgbXVzdCBiZSBvZiB0eXBlICJzZWNyZXQiYCk7CiAgICB9Cn07CmNvbnN0IGFzeW1tZXRyaWNUeXBlQ2hlY2sgPSAoYWxnLCBrZXksIHVzYWdlLCBhbGxvd0p3aykgPT4gewogICAgaWYgKGFsbG93SndrICYmIGlzSldLKGtleSkpIHsKICAgICAgICBzd2l0Y2ggKHVzYWdlKSB7CiAgICAgICAgICAgIGNhc2UgJ3NpZ24nOgogICAgICAgICAgICAgICAgaWYgKGlzUHJpdmF0ZUpXSyhrZXkpICYmIGp3a01hdGNoZXNPcChhbGcsIGtleSwgdXNhZ2UpKQogICAgICAgICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEpTT04gV2ViIEtleSBmb3IgdGhpcyBvcGVyYXRpb24gYmUgYSBwcml2YXRlIEpXS2ApOwogICAgICAgICAgICBjYXNlICd2ZXJpZnknOgogICAgICAgICAgICAgICAgaWYgKGlzUHVibGljSldLKGtleSkgJiYgandrTWF0Y2hlc09wKGFsZywga2V5LCB1c2FnZSkpCiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSlNPTiBXZWIgS2V5IGZvciB0aGlzIG9wZXJhdGlvbiBiZSBhIHB1YmxpYyBKV0tgKTsKICAgICAgICB9CiAgICB9CiAgICBpZiAoIWlzS2V5TGlrZShrZXkpKSB7CiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcih3aXRoQWxnKGFsZywga2V5LCAuLi50eXBlcywgYWxsb3dKd2sgPyAnSlNPTiBXZWIgS2V5JyA6IG51bGwpKTsKICAgIH0KICAgIGlmIChrZXkudHlwZSA9PT0gJ3NlY3JldCcpIHsKICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3RhZyhrZXkpfSBpbnN0YW5jZXMgZm9yIGFzeW1tZXRyaWMgYWxnb3JpdGhtcyBtdXN0IG5vdCBiZSBvZiB0eXBlICJzZWNyZXQiYCk7CiAgICB9CiAgICBpZiAodXNhZ2UgPT09ICdzaWduJyAmJiBrZXkudHlwZSA9PT0gJ3B1YmxpYycpIHsKICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3RhZyhrZXkpfSBpbnN0YW5jZXMgZm9yIGFzeW1tZXRyaWMgYWxnb3JpdGhtIHNpZ25pbmcgbXVzdCBiZSBvZiB0eXBlICJwcml2YXRlImApOwogICAgfQogICAgaWYgKHVzYWdlID09PSAnZGVjcnlwdCcgJiYga2V5LnR5cGUgPT09ICdwdWJsaWMnKSB7CiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0YWcoa2V5KX0gaW5zdGFuY2VzIGZvciBhc3ltbWV0cmljIGFsZ29yaXRobSBkZWNyeXB0aW9uIG11c3QgYmUgb2YgdHlwZSAicHJpdmF0ZSJgKTsKICAgIH0KICAgIGlmIChrZXkuYWxnb3JpdGhtICYmIHVzYWdlID09PSAndmVyaWZ5JyAmJiBrZXkudHlwZSA9PT0gJ3ByaXZhdGUnKSB7CiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0YWcoa2V5KX0gaW5zdGFuY2VzIGZvciBhc3ltbWV0cmljIGFsZ29yaXRobSB2ZXJpZnlpbmcgbXVzdCBiZSBvZiB0eXBlICJwdWJsaWMiYCk7CiAgICB9CiAgICBpZiAoa2V5LmFsZ29yaXRobSAmJiB1c2FnZSA9PT0gJ2VuY3J5cHQnICYmIGtleS50eXBlID09PSAncHJpdmF0ZScpIHsKICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3RhZyhrZXkpfSBpbnN0YW5jZXMgZm9yIGFzeW1tZXRyaWMgYWxnb3JpdGhtIGVuY3J5cHRpb24gbXVzdCBiZSBvZiB0eXBlICJwdWJsaWMiYCk7CiAgICB9Cn07CmZ1bmN0aW9uIGNoZWNrS2V5VHlwZShhbGxvd0p3aywgYWxnLCBrZXksIHVzYWdlKSB7CiAgICBjb25zdCBzeW1tZXRyaWMgPSBhbGcuc3RhcnRzV2l0aCgnSFMnKSB8fAogICAgICAgIGFsZyA9PT0gJ2RpcicgfHwKICAgICAgICBhbGcuc3RhcnRzV2l0aCgnUEJFUzInKSB8fAogICAgICAgIC9eQVxkezN9KD86R0NNKT9LVyQvLnRlc3QoYWxnKTsKICAgIGlmIChzeW1tZXRyaWMpIHsKICAgICAgICBzeW1tZXRyaWNUeXBlQ2hlY2soYWxnLCBrZXksIHVzYWdlLCBhbGxvd0p3ayk7CiAgICB9CiAgICBlbHNlIHsKICAgICAgICBhc3ltbWV0cmljVHlwZUNoZWNrKGFsZywga2V5LCB1c2FnZSwgYWxsb3dKd2spOwogICAgfQp9CmNoZWNrS2V5VHlwZS5iaW5kKHVuZGVmaW5lZCwgZmFsc2UpOwpjb25zdCBjaGVja0tleVR5cGVXaXRoSndrID0gY2hlY2tLZXlUeXBlLmJpbmQodW5kZWZpbmVkLCB0cnVlKTsKCmZ1bmN0aW9uIHZhbGlkYXRlQ3JpdChFcnIsIHJlY29nbml6ZWREZWZhdWx0LCByZWNvZ25pemVkT3B0aW9uLCBwcm90ZWN0ZWRIZWFkZXIsIGpvc2VIZWFkZXIpIHsKICAgIGlmIChqb3NlSGVhZGVyLmNyaXQgIT09IHVuZGVmaW5lZCAmJiBwcm90ZWN0ZWRIZWFkZXI/LmNyaXQgPT09IHVuZGVmaW5lZCkgewogICAgICAgIHRocm93IG5ldyBFcnIoJyJjcml0IiAoQ3JpdGljYWwpIEhlYWRlciBQYXJhbWV0ZXIgTVVTVCBiZSBpbnRlZ3JpdHkgcHJvdGVjdGVkJyk7CiAgICB9CiAgICBpZiAoIXByb3RlY3RlZEhlYWRlciB8fCBwcm90ZWN0ZWRIZWFkZXIuY3JpdCA9PT0gdW5kZWZpbmVkKSB7CiAgICAgICAgcmV0dXJuIG5ldyBTZXQoKTsKICAgIH0KICAgIGlmICghQXJyYXkuaXNBcnJheShwcm90ZWN0ZWRIZWFkZXIuY3JpdCkgfHwKICAgICAgICBwcm90ZWN0ZWRIZWFkZXIuY3JpdC5sZW5ndGggPT09IDAgfHwKICAgICAgICBwcm90ZWN0ZWRIZWFkZXIuY3JpdC5zb21lKChpbnB1dCkgPT4gdHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJyB8fCBpbnB1dC5sZW5ndGggPT09IDApKSB7CiAgICAgICAgdGhyb3cgbmV3IEVycignImNyaXQiIChDcml0aWNhbCkgSGVhZGVyIFBhcmFtZXRlciBNVVNUIGJlIGFuIGFycmF5IG9mIG5vbi1lbXB0eSBzdHJpbmdzIHdoZW4gcHJlc2VudCcpOwogICAgfQogICAgbGV0IHJlY29nbml6ZWQ7CiAgICBpZiAocmVjb2duaXplZE9wdGlvbiAhPT0gdW5kZWZpbmVkKSB7CiAgICAgICAgcmVjb2duaXplZCA9IG5ldyBNYXAoWy4uLk9iamVjdC5lbnRyaWVzKHJlY29nbml6ZWRPcHRpb24pLCAuLi5yZWNvZ25pemVkRGVmYXVsdC5lbnRyaWVzKCldKTsKICAgIH0KICAgIGVsc2UgewogICAgICAgIHJlY29nbml6ZWQgPSByZWNvZ25pemVkRGVmYXVsdDsKICAgIH0KICAgIGZvciAoY29uc3QgcGFyYW1ldGVyIG9mIHByb3RlY3RlZEhlYWRlci5jcml0KSB7CiAgICAgICAgaWYgKCFyZWNvZ25pemVkLmhhcyhwYXJhbWV0ZXIpKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKGBFeHRlbnNpb24gSGVhZGVyIFBhcmFtZXRlciAiJHtwYXJhbWV0ZXJ9IiBpcyBub3QgcmVjb2duaXplZGApOwogICAgICAgIH0KICAgICAgICBpZiAoam9zZUhlYWRlcltwYXJhbWV0ZXJdID09PSB1bmRlZmluZWQpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycihgRXh0ZW5zaW9uIEhlYWRlciBQYXJhbWV0ZXIgIiR7cGFyYW1ldGVyfSIgaXMgbWlzc2luZ2ApOwogICAgICAgIH0KICAgICAgICBpZiAocmVjb2duaXplZC5nZXQocGFyYW1ldGVyKSAmJiBwcm90ZWN0ZWRIZWFkZXJbcGFyYW1ldGVyXSA9PT0gdW5kZWZpbmVkKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnIoYEV4dGVuc2lvbiBIZWFkZXIgUGFyYW1ldGVyICIke3BhcmFtZXRlcn0iIE1VU1QgYmUgaW50ZWdyaXR5IHByb3RlY3RlZGApOwogICAgICAgIH0KICAgIH0KICAgIHJldHVybiBuZXcgU2V0KHByb3RlY3RlZEhlYWRlci5jcml0KTsKfQoKY29uc3QgdmFsaWRhdGVBbGdvcml0aG1zID0gKG9wdGlvbiwgYWxnb3JpdGhtcykgPT4gewogICAgaWYgKGFsZ29yaXRobXMgIT09IHVuZGVmaW5lZCAmJgogICAgICAgICghQXJyYXkuaXNBcnJheShhbGdvcml0aG1zKSB8fCBhbGdvcml0aG1zLnNvbWUoKHMpID0+IHR5cGVvZiBzICE9PSAnc3RyaW5nJykpKSB7CiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgIiR7b3B0aW9ufSIgb3B0aW9uIG11c3QgYmUgYW4gYXJyYXkgb2Ygc3RyaW5nc2ApOwogICAgfQogICAgaWYgKCFhbGdvcml0aG1zKSB7CiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsKICAgIH0KICAgIHJldHVybiBuZXcgU2V0KGFsZ29yaXRobXMpOwp9Owp2YXIgdmFsaWRhdGVBbGdvcml0aG1zJDEgPSB2YWxpZGF0ZUFsZ29yaXRobXM7Cgpjb25zdCBrZXlUb0pXSyA9IGFzeW5jIChrZXkpID0+IHsKICAgIGlmIChrZXkgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7CiAgICAgICAgcmV0dXJuIHsKICAgICAgICAgICAga3R5OiAnb2N0JywKICAgICAgICAgICAgazogZW5jb2RlKGtleSksCiAgICAgICAgfTsKICAgIH0KICAgIGlmICghaXNDcnlwdG9LZXkoa2V5KSkgewogICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoaW52YWxpZEtleUlucHV0KGtleSwgLi4udHlwZXMsICdVaW50OEFycmF5JykpOwogICAgfQogICAgaWYgKCFrZXkuZXh0cmFjdGFibGUpIHsKICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub24tZXh0cmFjdGFibGUgQ3J5cHRvS2V5IGNhbm5vdCBiZSBleHBvcnRlZCBhcyBhIEpXSycpOwogICAgfQogICAgY29uc3QgeyBleHQsIGtleV9vcHMsIGFsZywgdXNlLCAuLi5qd2sgfSA9IGF3YWl0IGNyeXB0byQxLnN1YnRsZS5leHBvcnRLZXkoJ2p3aycsIGtleSk7CiAgICByZXR1cm4gandrOwp9Owp2YXIga2V5VG9KV0skMSA9IGtleVRvSldLOwoKYXN5bmMgZnVuY3Rpb24gZXhwb3J0SldLKGtleSkgewogICAgcmV0dXJuIGtleVRvSldLJDEoa2V5KTsKfQoKZnVuY3Rpb24gc3VidGxlRHNhKGFsZywgYWxnb3JpdGhtKSB7CiAgICBjb25zdCBoYXNoID0gYFNIQS0ke2FsZy5zbGljZSgtMyl9YDsKICAgIHN3aXRjaCAoYWxnKSB7CiAgICAgICAgY2FzZSAnSFMyNTYnOgogICAgICAgIGNhc2UgJ0hTMzg0JzoKICAgICAgICBjYXNlICdIUzUxMic6CiAgICAgICAgICAgIHJldHVybiB7IGhhc2gsIG5hbWU6ICdITUFDJyB9OwogICAgICAgIGNhc2UgJ1BTMjU2JzoKICAgICAgICBjYXNlICdQUzM4NCc6CiAgICAgICAgY2FzZSAnUFM1MTInOgogICAgICAgICAgICByZXR1cm4geyBoYXNoLCBuYW1lOiAnUlNBLVBTUycsIHNhbHRMZW5ndGg6IGFsZy5zbGljZSgtMykgPj4gMyB9OwogICAgICAgIGNhc2UgJ1JTMjU2JzoKICAgICAgICBjYXNlICdSUzM4NCc6CiAgICAgICAgY2FzZSAnUlM1MTInOgogICAgICAgICAgICByZXR1cm4geyBoYXNoLCBuYW1lOiAnUlNBU1NBLVBLQ1MxLXYxXzUnIH07CiAgICAgICAgY2FzZSAnRVMyNTYnOgogICAgICAgIGNhc2UgJ0VTMzg0JzoKICAgICAgICBjYXNlICdFUzUxMic6CiAgICAgICAgICAgIHJldHVybiB7IGhhc2gsIG5hbWU6ICdFQ0RTQScsIG5hbWVkQ3VydmU6IGFsZ29yaXRobS5uYW1lZEN1cnZlIH07CiAgICAgICAgY2FzZSAnRWQyNTUxOSc6CiAgICAgICAgICAgIHJldHVybiB7IG5hbWU6ICdFZDI1NTE5JyB9OwogICAgICAgIGNhc2UgJ0VkRFNBJzoKICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogYWxnb3JpdGhtLm5hbWUgfTsKICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZChgYWxnICR7YWxnfSBpcyBub3Qgc3VwcG9ydGVkIGVpdGhlciBieSBKT1NFIG9yIHlvdXIgamF2YXNjcmlwdCBydW50aW1lYCk7CiAgICB9Cn0KCmFzeW5jIGZ1bmN0aW9uIGdldENyeXB0b0tleShhbGcsIGtleSwgdXNhZ2UpIHsKICAgIGlmICh1c2FnZSA9PT0gJ3NpZ24nKSB7CiAgICAgICAga2V5ID0gYXdhaXQgbm9ybWFsaXplLm5vcm1hbGl6ZVByaXZhdGVLZXkoa2V5LCBhbGcpOwogICAgfQogICAgaWYgKHVzYWdlID09PSAndmVyaWZ5JykgewogICAgICAgIGtleSA9IGF3YWl0IG5vcm1hbGl6ZS5ub3JtYWxpemVQdWJsaWNLZXkoa2V5LCBhbGcpOwogICAgfQogICAgaWYgKGlzQ3J5cHRvS2V5KGtleSkpIHsKICAgICAgICBjaGVja1NpZ0NyeXB0b0tleShrZXksIGFsZywgdXNhZ2UpOwogICAgICAgIHJldHVybiBrZXk7CiAgICB9CiAgICBpZiAoa2V5IGluc3RhbmNlb2YgVWludDhBcnJheSkgewogICAgICAgIGlmICghYWxnLnN0YXJ0c1dpdGgoJ0hTJykpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihpbnZhbGlkS2V5SW5wdXQoa2V5LCAuLi50eXBlcykpOwogICAgICAgIH0KICAgICAgICByZXR1cm4gY3J5cHRvJDEuc3VidGxlLmltcG9ydEtleSgncmF3Jywga2V5LCB7IGhhc2g6IGBTSEEtJHthbGcuc2xpY2UoLTMpfWAsIG5hbWU6ICdITUFDJyB9LCBmYWxzZSwgW3VzYWdlXSk7CiAgICB9CiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGludmFsaWRLZXlJbnB1dChrZXksIC4uLnR5cGVzLCAnVWludDhBcnJheScsICdKU09OIFdlYiBLZXknKSk7Cn0KCmNvbnN0IHZlcmlmeSA9IGFzeW5jIChhbGcsIGtleSwgc2lnbmF0dXJlLCBkYXRhKSA9PiB7CiAgICBjb25zdCBjcnlwdG9LZXkgPSBhd2FpdCBnZXRDcnlwdG9LZXkoYWxnLCBrZXksICd2ZXJpZnknKTsKICAgIGNoZWNrS2V5TGVuZ3RoKGFsZywgY3J5cHRvS2V5KTsKICAgIGNvbnN0IGFsZ29yaXRobSA9IHN1YnRsZURzYShhbGcsIGNyeXB0b0tleS5hbGdvcml0aG0pOwogICAgdHJ5IHsKICAgICAgICByZXR1cm4gYXdhaXQgY3J5cHRvJDEuc3VidGxlLnZlcmlmeShhbGdvcml0aG0sIGNyeXB0b0tleSwgc2lnbmF0dXJlLCBkYXRhKTsKICAgIH0KICAgIGNhdGNoIHsKICAgICAgICByZXR1cm4gZmFsc2U7CiAgICB9Cn07CnZhciB2ZXJpZnkkMSA9IHZlcmlmeTsKCmFzeW5jIGZ1bmN0aW9uIGZsYXR0ZW5lZFZlcmlmeShqd3MsIGtleSwgb3B0aW9ucykgewogICAgaWYgKCFpc09iamVjdChqd3MpKSB7CiAgICAgICAgdGhyb3cgbmV3IEpXU0ludmFsaWQoJ0ZsYXR0ZW5lZCBKV1MgbXVzdCBiZSBhbiBvYmplY3QnKTsKICAgIH0KICAgIGlmIChqd3MucHJvdGVjdGVkID09PSB1bmRlZmluZWQgJiYgandzLmhlYWRlciA9PT0gdW5kZWZpbmVkKSB7CiAgICAgICAgdGhyb3cgbmV3IEpXU0ludmFsaWQoJ0ZsYXR0ZW5lZCBKV1MgbXVzdCBoYXZlIGVpdGhlciBvZiB0aGUgInByb3RlY3RlZCIgb3IgImhlYWRlciIgbWVtYmVycycpOwogICAgfQogICAgaWYgKGp3cy5wcm90ZWN0ZWQgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgandzLnByb3RlY3RlZCAhPT0gJ3N0cmluZycpIHsKICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnSldTIFByb3RlY3RlZCBIZWFkZXIgaW5jb3JyZWN0IHR5cGUnKTsKICAgIH0KICAgIGlmIChqd3MucGF5bG9hZCA9PT0gdW5kZWZpbmVkKSB7CiAgICAgICAgdGhyb3cgbmV3IEpXU0ludmFsaWQoJ0pXUyBQYXlsb2FkIG1pc3NpbmcnKTsKICAgIH0KICAgIGlmICh0eXBlb2YgandzLnNpZ25hdHVyZSAhPT0gJ3N0cmluZycpIHsKICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnSldTIFNpZ25hdHVyZSBtaXNzaW5nIG9yIGluY29ycmVjdCB0eXBlJyk7CiAgICB9CiAgICBpZiAoandzLmhlYWRlciAhPT0gdW5kZWZpbmVkICYmICFpc09iamVjdChqd3MuaGVhZGVyKSkgewogICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdKV1MgVW5wcm90ZWN0ZWQgSGVhZGVyIGluY29ycmVjdCB0eXBlJyk7CiAgICB9CiAgICBsZXQgcGFyc2VkUHJvdCA9IHt9OwogICAgaWYgKGp3cy5wcm90ZWN0ZWQpIHsKICAgICAgICB0cnkgewogICAgICAgICAgICBjb25zdCBwcm90ZWN0ZWRIZWFkZXIgPSBkZWNvZGUkMShqd3MucHJvdGVjdGVkKTsKICAgICAgICAgICAgcGFyc2VkUHJvdCA9IEpTT04ucGFyc2UoZGVjb2Rlci5kZWNvZGUocHJvdGVjdGVkSGVhZGVyKSk7CiAgICAgICAgfQogICAgICAgIGNhdGNoIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXU0ludmFsaWQoJ0pXUyBQcm90ZWN0ZWQgSGVhZGVyIGlzIGludmFsaWQnKTsKICAgICAgICB9CiAgICB9CiAgICBpZiAoIWlzRGlzam9pbnQkMShwYXJzZWRQcm90LCBqd3MuaGVhZGVyKSkgewogICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdKV1MgUHJvdGVjdGVkIGFuZCBKV1MgVW5wcm90ZWN0ZWQgSGVhZGVyIFBhcmFtZXRlciBuYW1lcyBtdXN0IGJlIGRpc2pvaW50Jyk7CiAgICB9CiAgICBjb25zdCBqb3NlSGVhZGVyID0gewogICAgICAgIC4uLnBhcnNlZFByb3QsCiAgICAgICAgLi4uandzLmhlYWRlciwKICAgIH07CiAgICBjb25zdCBleHRlbnNpb25zID0gdmFsaWRhdGVDcml0KEpXU0ludmFsaWQsIG5ldyBNYXAoW1snYjY0JywgdHJ1ZV1dKSwgb3B0aW9ucz8uY3JpdCwgcGFyc2VkUHJvdCwgam9zZUhlYWRlcik7CiAgICBsZXQgYjY0ID0gdHJ1ZTsKICAgIGlmIChleHRlbnNpb25zLmhhcygnYjY0JykpIHsKICAgICAgICBiNjQgPSBwYXJzZWRQcm90LmI2NDsKICAgICAgICBpZiAodHlwZW9mIGI2NCAhPT0gJ2Jvb2xlYW4nKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdUaGUgImI2NCIgKGJhc2U2NHVybC1lbmNvZGUgcGF5bG9hZCkgSGVhZGVyIFBhcmFtZXRlciBtdXN0IGJlIGEgYm9vbGVhbicpOwogICAgICAgIH0KICAgIH0KICAgIGNvbnN0IHsgYWxnIH0gPSBqb3NlSGVhZGVyOwogICAgaWYgKHR5cGVvZiBhbGcgIT09ICdzdHJpbmcnIHx8ICFhbGcpIHsKICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnSldTICJhbGciIChBbGdvcml0aG0pIEhlYWRlciBQYXJhbWV0ZXIgbWlzc2luZyBvciBpbnZhbGlkJyk7CiAgICB9CiAgICBjb25zdCBhbGdvcml0aG1zID0gb3B0aW9ucyAmJiB2YWxpZGF0ZUFsZ29yaXRobXMkMSgnYWxnb3JpdGhtcycsIG9wdGlvbnMuYWxnb3JpdGhtcyk7CiAgICBpZiAoYWxnb3JpdGhtcyAmJiAhYWxnb3JpdGhtcy5oYXMoYWxnKSkgewogICAgICAgIHRocm93IG5ldyBKT1NFQWxnTm90QWxsb3dlZCgnImFsZyIgKEFsZ29yaXRobSkgSGVhZGVyIFBhcmFtZXRlciB2YWx1ZSBub3QgYWxsb3dlZCcpOwogICAgfQogICAgaWYgKGI2NCkgewogICAgICAgIGlmICh0eXBlb2YgandzLnBheWxvYWQgIT09ICdzdHJpbmcnKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdKV1MgUGF5bG9hZCBtdXN0IGJlIGEgc3RyaW5nJyk7CiAgICAgICAgfQogICAgfQogICAgZWxzZSBpZiAodHlwZW9mIGp3cy5wYXlsb2FkICE9PSAnc3RyaW5nJyAmJiAhKGp3cy5wYXlsb2FkIGluc3RhbmNlb2YgVWludDhBcnJheSkpIHsKICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnSldTIFBheWxvYWQgbXVzdCBiZSBhIHN0cmluZyBvciBhbiBVaW50OEFycmF5IGluc3RhbmNlJyk7CiAgICB9CiAgICBsZXQgcmVzb2x2ZWRLZXkgPSBmYWxzZTsKICAgIGlmICh0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nKSB7CiAgICAgICAga2V5ID0gYXdhaXQga2V5KHBhcnNlZFByb3QsIGp3cyk7CiAgICAgICAgcmVzb2x2ZWRLZXkgPSB0cnVlOwogICAgICAgIGNoZWNrS2V5VHlwZVdpdGhKd2soYWxnLCBrZXksICd2ZXJpZnknKTsKICAgICAgICBpZiAoaXNKV0soa2V5KSkgewogICAgICAgICAgICBrZXkgPSBhd2FpdCBpbXBvcnRKV0soa2V5LCBhbGcpOwogICAgICAgIH0KICAgIH0KICAgIGVsc2UgewogICAgICAgIGNoZWNrS2V5VHlwZVdpdGhKd2soYWxnLCBrZXksICd2ZXJpZnknKTsKICAgIH0KICAgIGNvbnN0IGRhdGEgPSBjb25jYXQoZW5jb2Rlci5lbmNvZGUoandzLnByb3RlY3RlZCA/PyAnJyksIGVuY29kZXIuZW5jb2RlKCcuJyksIHR5cGVvZiBqd3MucGF5bG9hZCA9PT0gJ3N0cmluZycgPyBlbmNvZGVyLmVuY29kZShqd3MucGF5bG9hZCkgOiBqd3MucGF5bG9hZCk7CiAgICBsZXQgc2lnbmF0dXJlOwogICAgdHJ5IHsKICAgICAgICBzaWduYXR1cmUgPSBkZWNvZGUkMShqd3Muc2lnbmF0dXJlKTsKICAgIH0KICAgIGNhdGNoIHsKICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnRmFpbGVkIHRvIGJhc2U2NHVybCBkZWNvZGUgdGhlIHNpZ25hdHVyZScpOwogICAgfQogICAgY29uc3QgdmVyaWZpZWQgPSBhd2FpdCB2ZXJpZnkkMShhbGcsIGtleSwgc2lnbmF0dXJlLCBkYXRhKTsKICAgIGlmICghdmVyaWZpZWQpIHsKICAgICAgICB0aHJvdyBuZXcgSldTU2lnbmF0dXJlVmVyaWZpY2F0aW9uRmFpbGVkKCk7CiAgICB9CiAgICBsZXQgcGF5bG9hZDsKICAgIGlmIChiNjQpIHsKICAgICAgICB0cnkgewogICAgICAgICAgICBwYXlsb2FkID0gZGVjb2RlJDEoandzLnBheWxvYWQpOwogICAgICAgIH0KICAgICAgICBjYXRjaCB7CiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdGYWlsZWQgdG8gYmFzZTY0dXJsIGRlY29kZSB0aGUgcGF5bG9hZCcpOwogICAgICAgIH0KICAgIH0KICAgIGVsc2UgaWYgKHR5cGVvZiBqd3MucGF5bG9hZCA9PT0gJ3N0cmluZycpIHsKICAgICAgICBwYXlsb2FkID0gZW5jb2Rlci5lbmNvZGUoandzLnBheWxvYWQpOwogICAgfQogICAgZWxzZSB7CiAgICAgICAgcGF5bG9hZCA9IGp3cy5wYXlsb2FkOwogICAgfQogICAgY29uc3QgcmVzdWx0ID0geyBwYXlsb2FkIH07CiAgICBpZiAoandzLnByb3RlY3RlZCAhPT0gdW5kZWZpbmVkKSB7CiAgICAgICAgcmVzdWx0LnByb3RlY3RlZEhlYWRlciA9IHBhcnNlZFByb3Q7CiAgICB9CiAgICBpZiAoandzLmhlYWRlciAhPT0gdW5kZWZpbmVkKSB7CiAgICAgICAgcmVzdWx0LnVucHJvdGVjdGVkSGVhZGVyID0gandzLmhlYWRlcjsKICAgIH0KICAgIGlmIChyZXNvbHZlZEtleSkgewogICAgICAgIHJldHVybiB7IC4uLnJlc3VsdCwga2V5IH07CiAgICB9CiAgICByZXR1cm4gcmVzdWx0Owp9Cgphc3luYyBmdW5jdGlvbiBjb21wYWN0VmVyaWZ5KGp3cywga2V5LCBvcHRpb25zKSB7CiAgICBpZiAoandzIGluc3RhbmNlb2YgVWludDhBcnJheSkgewogICAgICAgIGp3cyA9IGRlY29kZXIuZGVjb2RlKGp3cyk7CiAgICB9CiAgICBpZiAodHlwZW9mIGp3cyAhPT0gJ3N0cmluZycpIHsKICAgICAgICB0aHJvdyBuZXcgSldTSW52YWxpZCgnQ29tcGFjdCBKV1MgbXVzdCBiZSBhIHN0cmluZyBvciBVaW50OEFycmF5Jyk7CiAgICB9CiAgICBjb25zdCB7IDA6IHByb3RlY3RlZEhlYWRlciwgMTogcGF5bG9hZCwgMjogc2lnbmF0dXJlLCBsZW5ndGggfSA9IGp3cy5zcGxpdCgnLicpOwogICAgaWYgKGxlbmd0aCAhPT0gMykgewogICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdJbnZhbGlkIENvbXBhY3QgSldTJyk7CiAgICB9CiAgICBjb25zdCB2ZXJpZmllZCA9IGF3YWl0IGZsYXR0ZW5lZFZlcmlmeSh7IHBheWxvYWQsIHByb3RlY3RlZDogcHJvdGVjdGVkSGVhZGVyLCBzaWduYXR1cmUgfSwga2V5LCBvcHRpb25zKTsKICAgIGNvbnN0IHJlc3VsdCA9IHsgcGF5bG9hZDogdmVyaWZpZWQucGF5bG9hZCwgcHJvdGVjdGVkSGVhZGVyOiB2ZXJpZmllZC5wcm90ZWN0ZWRIZWFkZXIgfTsKICAgIGlmICh0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgcmV0dXJuIHsgLi4ucmVzdWx0LCBrZXk6IHZlcmlmaWVkLmtleSB9OwogICAgfQogICAgcmV0dXJuIHJlc3VsdDsKfQoKdmFyIGVwb2NoID0gKGRhdGUpID0+IE1hdGguZmxvb3IoZGF0ZS5nZXRUaW1lKCkgLyAxMDAwKTsKCmNvbnN0IG1pbnV0ZSA9IDYwOwpjb25zdCBob3VyID0gbWludXRlICogNjA7CmNvbnN0IGRheSA9IGhvdXIgKiAyNDsKY29uc3Qgd2VlayA9IGRheSAqIDc7CmNvbnN0IHllYXIgPSBkYXkgKiAzNjUuMjU7CmNvbnN0IFJFR0VYID0gL14oXCt8XC0pPyA/KFxkK3xcZCtcLlxkKykgPyhzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHdlZWtzP3x3fHllYXJzP3x5cnM/fHkpKD86IChhZ298ZnJvbSBub3cpKT8kL2k7CnZhciBzZWNzID0gKHN0cikgPT4gewogICAgY29uc3QgbWF0Y2hlZCA9IFJFR0VYLmV4ZWMoc3RyKTsKICAgIGlmICghbWF0Y2hlZCB8fCAobWF0Y2hlZFs0XSAmJiBtYXRjaGVkWzFdKSkgewogICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgdGltZSBwZXJpb2QgZm9ybWF0Jyk7CiAgICB9CiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQobWF0Y2hlZFsyXSk7CiAgICBjb25zdCB1bml0ID0gbWF0Y2hlZFszXS50b0xvd2VyQ2FzZSgpOwogICAgbGV0IG51bWVyaWNEYXRlOwogICAgc3dpdGNoICh1bml0KSB7CiAgICAgICAgY2FzZSAnc2VjJzoKICAgICAgICBjYXNlICdzZWNzJzoKICAgICAgICBjYXNlICdzZWNvbmQnOgogICAgICAgIGNhc2UgJ3NlY29uZHMnOgogICAgICAgIGNhc2UgJ3MnOgogICAgICAgICAgICBudW1lcmljRGF0ZSA9IE1hdGgucm91bmQodmFsdWUpOwogICAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICdtaW51dGUnOgogICAgICAgIGNhc2UgJ21pbnV0ZXMnOgogICAgICAgIGNhc2UgJ21pbic6CiAgICAgICAgY2FzZSAnbWlucyc6CiAgICAgICAgY2FzZSAnbSc6CiAgICAgICAgICAgIG51bWVyaWNEYXRlID0gTWF0aC5yb3VuZCh2YWx1ZSAqIG1pbnV0ZSk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ2hvdXInOgogICAgICAgIGNhc2UgJ2hvdXJzJzoKICAgICAgICBjYXNlICdocic6CiAgICAgICAgY2FzZSAnaHJzJzoKICAgICAgICBjYXNlICdoJzoKICAgICAgICAgICAgbnVtZXJpY0RhdGUgPSBNYXRoLnJvdW5kKHZhbHVlICogaG91cik7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ2RheSc6CiAgICAgICAgY2FzZSAnZGF5cyc6CiAgICAgICAgY2FzZSAnZCc6CiAgICAgICAgICAgIG51bWVyaWNEYXRlID0gTWF0aC5yb3VuZCh2YWx1ZSAqIGRheSk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ3dlZWsnOgogICAgICAgIGNhc2UgJ3dlZWtzJzoKICAgICAgICBjYXNlICd3JzoKICAgICAgICAgICAgbnVtZXJpY0RhdGUgPSBNYXRoLnJvdW5kKHZhbHVlICogd2Vlayk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgIG51bWVyaWNEYXRlID0gTWF0aC5yb3VuZCh2YWx1ZSAqIHllYXIpOwogICAgICAgICAgICBicmVhazsKICAgIH0KICAgIGlmIChtYXRjaGVkWzFdID09PSAnLScgfHwgbWF0Y2hlZFs0XSA9PT0gJ2FnbycpIHsKICAgICAgICByZXR1cm4gLW51bWVyaWNEYXRlOwogICAgfQogICAgcmV0dXJuIG51bWVyaWNEYXRlOwp9OwoKY29uc3Qgbm9ybWFsaXplVHlwID0gKHZhbHVlKSA9PiB2YWx1ZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL15hcHBsaWNhdGlvblwvLywgJycpOwpjb25zdCBjaGVja0F1ZGllbmNlUHJlc2VuY2UgPSAoYXVkUGF5bG9hZCwgYXVkT3B0aW9uKSA9PiB7CiAgICBpZiAodHlwZW9mIGF1ZFBheWxvYWQgPT09ICdzdHJpbmcnKSB7CiAgICAgICAgcmV0dXJuIGF1ZE9wdGlvbi5pbmNsdWRlcyhhdWRQYXlsb2FkKTsKICAgIH0KICAgIGlmIChBcnJheS5pc0FycmF5KGF1ZFBheWxvYWQpKSB7CiAgICAgICAgcmV0dXJuIGF1ZE9wdGlvbi5zb21lKFNldC5wcm90b3R5cGUuaGFzLmJpbmQobmV3IFNldChhdWRQYXlsb2FkKSkpOwogICAgfQogICAgcmV0dXJuIGZhbHNlOwp9Owp2YXIgand0UGF5bG9hZCA9IChwcm90ZWN0ZWRIZWFkZXIsIGVuY29kZWRQYXlsb2FkLCBvcHRpb25zID0ge30pID0+IHsKICAgIGxldCBwYXlsb2FkOwogICAgdHJ5IHsKICAgICAgICBwYXlsb2FkID0gSlNPTi5wYXJzZShkZWNvZGVyLmRlY29kZShlbmNvZGVkUGF5bG9hZCkpOwogICAgfQogICAgY2F0Y2ggewogICAgfQogICAgaWYgKCFpc09iamVjdChwYXlsb2FkKSkgewogICAgICAgIHRocm93IG5ldyBKV1RJbnZhbGlkKCdKV1QgQ2xhaW1zIFNldCBtdXN0IGJlIGEgdG9wLWxldmVsIEpTT04gb2JqZWN0Jyk7CiAgICB9CiAgICBjb25zdCB7IHR5cCB9ID0gb3B0aW9uczsKICAgIGlmICh0eXAgJiYKICAgICAgICAodHlwZW9mIHByb3RlY3RlZEhlYWRlci50eXAgIT09ICdzdHJpbmcnIHx8CiAgICAgICAgICAgIG5vcm1hbGl6ZVR5cChwcm90ZWN0ZWRIZWFkZXIudHlwKSAhPT0gbm9ybWFsaXplVHlwKHR5cCkpKSB7CiAgICAgICAgdGhyb3cgbmV3IEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCgndW5leHBlY3RlZCAidHlwIiBKV1QgaGVhZGVyIHZhbHVlJywgcGF5bG9hZCwgJ3R5cCcsICdjaGVja19mYWlsZWQnKTsKICAgIH0KICAgIGNvbnN0IHsgcmVxdWlyZWRDbGFpbXMgPSBbXSwgaXNzdWVyLCBzdWJqZWN0LCBhdWRpZW5jZSwgbWF4VG9rZW5BZ2UgfSA9IG9wdGlvbnM7CiAgICBjb25zdCBwcmVzZW5jZUNoZWNrID0gWy4uLnJlcXVpcmVkQ2xhaW1zXTsKICAgIGlmIChtYXhUb2tlbkFnZSAhPT0gdW5kZWZpbmVkKQogICAgICAgIHByZXNlbmNlQ2hlY2sucHVzaCgnaWF0Jyk7CiAgICBpZiAoYXVkaWVuY2UgIT09IHVuZGVmaW5lZCkKICAgICAgICBwcmVzZW5jZUNoZWNrLnB1c2goJ2F1ZCcpOwogICAgaWYgKHN1YmplY3QgIT09IHVuZGVmaW5lZCkKICAgICAgICBwcmVzZW5jZUNoZWNrLnB1c2goJ3N1YicpOwogICAgaWYgKGlzc3VlciAhPT0gdW5kZWZpbmVkKQogICAgICAgIHByZXNlbmNlQ2hlY2sucHVzaCgnaXNzJyk7CiAgICBmb3IgKGNvbnN0IGNsYWltIG9mIG5ldyBTZXQocHJlc2VuY2VDaGVjay5yZXZlcnNlKCkpKSB7CiAgICAgICAgaWYgKCEoY2xhaW0gaW4gcGF5bG9hZCkpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZChgbWlzc2luZyByZXF1aXJlZCAiJHtjbGFpbX0iIGNsYWltYCwgcGF5bG9hZCwgY2xhaW0sICdtaXNzaW5nJyk7CiAgICAgICAgfQogICAgfQogICAgaWYgKGlzc3VlciAmJgogICAgICAgICEoQXJyYXkuaXNBcnJheShpc3N1ZXIpID8gaXNzdWVyIDogW2lzc3Vlcl0pLmluY2x1ZGVzKHBheWxvYWQuaXNzKSkgewogICAgICAgIHRocm93IG5ldyBKV1RDbGFpbVZhbGlkYXRpb25GYWlsZWQoJ3VuZXhwZWN0ZWQgImlzcyIgY2xhaW0gdmFsdWUnLCBwYXlsb2FkLCAnaXNzJywgJ2NoZWNrX2ZhaWxlZCcpOwogICAgfQogICAgaWYgKHN1YmplY3QgJiYgcGF5bG9hZC5zdWIgIT09IHN1YmplY3QpIHsKICAgICAgICB0aHJvdyBuZXcgSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkKCd1bmV4cGVjdGVkICJzdWIiIGNsYWltIHZhbHVlJywgcGF5bG9hZCwgJ3N1YicsICdjaGVja19mYWlsZWQnKTsKICAgIH0KICAgIGlmIChhdWRpZW5jZSAmJgogICAgICAgICFjaGVja0F1ZGllbmNlUHJlc2VuY2UocGF5bG9hZC5hdWQsIHR5cGVvZiBhdWRpZW5jZSA9PT0gJ3N0cmluZycgPyBbYXVkaWVuY2VdIDogYXVkaWVuY2UpKSB7CiAgICAgICAgdGhyb3cgbmV3IEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCgndW5leHBlY3RlZCAiYXVkIiBjbGFpbSB2YWx1ZScsIHBheWxvYWQsICdhdWQnLCAnY2hlY2tfZmFpbGVkJyk7CiAgICB9CiAgICBsZXQgdG9sZXJhbmNlOwogICAgc3dpdGNoICh0eXBlb2Ygb3B0aW9ucy5jbG9ja1RvbGVyYW5jZSkgewogICAgICAgIGNhc2UgJ3N0cmluZyc6CiAgICAgICAgICAgIHRvbGVyYW5jZSA9IHNlY3Mob3B0aW9ucy5jbG9ja1RvbGVyYW5jZSk7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ251bWJlcic6CiAgICAgICAgICAgIHRvbGVyYW5jZSA9IG9wdGlvbnMuY2xvY2tUb2xlcmFuY2U7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6CiAgICAgICAgICAgIHRvbGVyYW5jZSA9IDA7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2xvY2tUb2xlcmFuY2Ugb3B0aW9uIHR5cGUnKTsKICAgIH0KICAgIGNvbnN0IHsgY3VycmVudERhdGUgfSA9IG9wdGlvbnM7CiAgICBjb25zdCBub3cgPSBlcG9jaChjdXJyZW50RGF0ZSB8fCBuZXcgRGF0ZSgpKTsKICAgIGlmICgocGF5bG9hZC5pYXQgIT09IHVuZGVmaW5lZCB8fCBtYXhUb2tlbkFnZSkgJiYgdHlwZW9mIHBheWxvYWQuaWF0ICE9PSAnbnVtYmVyJykgewogICAgICAgIHRocm93IG5ldyBKV1RDbGFpbVZhbGlkYXRpb25GYWlsZWQoJyJpYXQiIGNsYWltIG11c3QgYmUgYSBudW1iZXInLCBwYXlsb2FkLCAnaWF0JywgJ2ludmFsaWQnKTsKICAgIH0KICAgIGlmIChwYXlsb2FkLm5iZiAhPT0gdW5kZWZpbmVkKSB7CiAgICAgICAgaWYgKHR5cGVvZiBwYXlsb2FkLm5iZiAhPT0gJ251bWJlcicpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCgnIm5iZiIgY2xhaW0gbXVzdCBiZSBhIG51bWJlcicsIHBheWxvYWQsICduYmYnLCAnaW52YWxpZCcpOwogICAgICAgIH0KICAgICAgICBpZiAocGF5bG9hZC5uYmYgPiBub3cgKyB0b2xlcmFuY2UpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCgnIm5iZiIgY2xhaW0gdGltZXN0YW1wIGNoZWNrIGZhaWxlZCcsIHBheWxvYWQsICduYmYnLCAnY2hlY2tfZmFpbGVkJyk7CiAgICAgICAgfQogICAgfQogICAgaWYgKHBheWxvYWQuZXhwICE9PSB1bmRlZmluZWQpIHsKICAgICAgICBpZiAodHlwZW9mIHBheWxvYWQuZXhwICE9PSAnbnVtYmVyJykgewogICAgICAgICAgICB0aHJvdyBuZXcgSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkKCciZXhwIiBjbGFpbSBtdXN0IGJlIGEgbnVtYmVyJywgcGF5bG9hZCwgJ2V4cCcsICdpbnZhbGlkJyk7CiAgICAgICAgfQogICAgICAgIGlmIChwYXlsb2FkLmV4cCA8PSBub3cgLSB0b2xlcmFuY2UpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXVEV4cGlyZWQoJyJleHAiIGNsYWltIHRpbWVzdGFtcCBjaGVjayBmYWlsZWQnLCBwYXlsb2FkLCAnZXhwJywgJ2NoZWNrX2ZhaWxlZCcpOwogICAgICAgIH0KICAgIH0KICAgIGlmIChtYXhUb2tlbkFnZSkgewogICAgICAgIGNvbnN0IGFnZSA9IG5vdyAtIHBheWxvYWQuaWF0OwogICAgICAgIGNvbnN0IG1heCA9IHR5cGVvZiBtYXhUb2tlbkFnZSA9PT0gJ251bWJlcicgPyBtYXhUb2tlbkFnZSA6IHNlY3MobWF4VG9rZW5BZ2UpOwogICAgICAgIGlmIChhZ2UgLSB0b2xlcmFuY2UgPiBtYXgpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXVEV4cGlyZWQoJyJpYXQiIGNsYWltIHRpbWVzdGFtcCBjaGVjayBmYWlsZWQgKHRvbyBmYXIgaW4gdGhlIHBhc3QpJywgcGF5bG9hZCwgJ2lhdCcsICdjaGVja19mYWlsZWQnKTsKICAgICAgICB9CiAgICAgICAgaWYgKGFnZSA8IDAgLSB0b2xlcmFuY2UpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCgnImlhdCIgY2xhaW0gdGltZXN0YW1wIGNoZWNrIGZhaWxlZCAoaXQgc2hvdWxkIGJlIGluIHRoZSBwYXN0KScsIHBheWxvYWQsICdpYXQnLCAnY2hlY2tfZmFpbGVkJyk7CiAgICAgICAgfQogICAgfQogICAgcmV0dXJuIHBheWxvYWQ7Cn07Cgphc3luYyBmdW5jdGlvbiBqd3RWZXJpZnkoand0LCBrZXksIG9wdGlvbnMpIHsKICAgIGNvbnN0IHZlcmlmaWVkID0gYXdhaXQgY29tcGFjdFZlcmlmeShqd3QsIGtleSwgb3B0aW9ucyk7CiAgICBpZiAodmVyaWZpZWQucHJvdGVjdGVkSGVhZGVyLmNyaXQ/LmluY2x1ZGVzKCdiNjQnKSAmJiB2ZXJpZmllZC5wcm90ZWN0ZWRIZWFkZXIuYjY0ID09PSBmYWxzZSkgewogICAgICAgIHRocm93IG5ldyBKV1RJbnZhbGlkKCdKV1RzIE1VU1QgTk9UIHVzZSB1bmVuY29kZWQgcGF5bG9hZCcpOwogICAgfQogICAgY29uc3QgcGF5bG9hZCA9IGp3dFBheWxvYWQodmVyaWZpZWQucHJvdGVjdGVkSGVhZGVyLCB2ZXJpZmllZC5wYXlsb2FkLCBvcHRpb25zKTsKICAgIGNvbnN0IHJlc3VsdCA9IHsgcGF5bG9hZCwgcHJvdGVjdGVkSGVhZGVyOiB2ZXJpZmllZC5wcm90ZWN0ZWRIZWFkZXIgfTsKICAgIGlmICh0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nKSB7CiAgICAgICAgcmV0dXJuIHsgLi4ucmVzdWx0LCBrZXk6IHZlcmlmaWVkLmtleSB9OwogICAgfQogICAgcmV0dXJuIHJlc3VsdDsKfQoKY29uc3Qgc2lnbiA9IGFzeW5jIChhbGcsIGtleSwgZGF0YSkgPT4gewogICAgY29uc3QgY3J5cHRvS2V5ID0gYXdhaXQgZ2V0Q3J5cHRvS2V5KGFsZywga2V5LCAnc2lnbicpOwogICAgY2hlY2tLZXlMZW5ndGgoYWxnLCBjcnlwdG9LZXkpOwogICAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgY3J5cHRvJDEuc3VidGxlLnNpZ24oc3VidGxlRHNhKGFsZywgY3J5cHRvS2V5LmFsZ29yaXRobSksIGNyeXB0b0tleSwgZGF0YSk7CiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoc2lnbmF0dXJlKTsKfTsKdmFyIHNpZ24kMSA9IHNpZ247CgpjbGFzcyBGbGF0dGVuZWRTaWduIHsKICAgIGNvbnN0cnVjdG9yKHBheWxvYWQpIHsKICAgICAgICBpZiAoIShwYXlsb2FkIGluc3RhbmNlb2YgVWludDhBcnJheSkpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGF5bG9hZCBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIFVpbnQ4QXJyYXknKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHBheWxvYWQ7CiAgICB9CiAgICBzZXRQcm90ZWN0ZWRIZWFkZXIocHJvdGVjdGVkSGVhZGVyKSB7CiAgICAgICAgaWYgKHRoaXMuX3Byb3RlY3RlZEhlYWRlcikgewogICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZXRQcm90ZWN0ZWRIZWFkZXIgY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UnKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyID0gcHJvdGVjdGVkSGVhZGVyOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfQogICAgc2V0VW5wcm90ZWN0ZWRIZWFkZXIodW5wcm90ZWN0ZWRIZWFkZXIpIHsKICAgICAgICBpZiAodGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2V0VW5wcm90ZWN0ZWRIZWFkZXIgY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UnKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIgPSB1bnByb3RlY3RlZEhlYWRlcjsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0KICAgIGFzeW5jIHNpZ24oa2V5LCBvcHRpb25zKSB7CiAgICAgICAgaWYgKCF0aGlzLl9wcm90ZWN0ZWRIZWFkZXIgJiYgIXRoaXMuX3VucHJvdGVjdGVkSGVhZGVyKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdlaXRoZXIgc2V0UHJvdGVjdGVkSGVhZGVyIG9yIHNldFVucHJvdGVjdGVkSGVhZGVyIG11c3QgYmUgY2FsbGVkIGJlZm9yZSAjc2lnbigpJyk7CiAgICAgICAgfQogICAgICAgIGlmICghaXNEaXNqb2ludCQxKHRoaXMuX3Byb3RlY3RlZEhlYWRlciwgdGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIpKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdKV1MgUHJvdGVjdGVkIGFuZCBKV1MgVW5wcm90ZWN0ZWQgSGVhZGVyIFBhcmFtZXRlciBuYW1lcyBtdXN0IGJlIGRpc2pvaW50Jyk7CiAgICAgICAgfQogICAgICAgIGNvbnN0IGpvc2VIZWFkZXIgPSB7CiAgICAgICAgICAgIC4uLnRoaXMuX3Byb3RlY3RlZEhlYWRlciwKICAgICAgICAgICAgLi4udGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIsCiAgICAgICAgfTsKICAgICAgICBjb25zdCBleHRlbnNpb25zID0gdmFsaWRhdGVDcml0KEpXU0ludmFsaWQsIG5ldyBNYXAoW1snYjY0JywgdHJ1ZV1dKSwgb3B0aW9ucz8uY3JpdCwgdGhpcy5fcHJvdGVjdGVkSGVhZGVyLCBqb3NlSGVhZGVyKTsKICAgICAgICBsZXQgYjY0ID0gdHJ1ZTsKICAgICAgICBpZiAoZXh0ZW5zaW9ucy5oYXMoJ2I2NCcpKSB7CiAgICAgICAgICAgIGI2NCA9IHRoaXMuX3Byb3RlY3RlZEhlYWRlci5iNjQ7CiAgICAgICAgICAgIGlmICh0eXBlb2YgYjY0ICE9PSAnYm9vbGVhbicpIHsKICAgICAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdUaGUgImI2NCIgKGJhc2U2NHVybC1lbmNvZGUgcGF5bG9hZCkgSGVhZGVyIFBhcmFtZXRlciBtdXN0IGJlIGEgYm9vbGVhbicpOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIGNvbnN0IHsgYWxnIH0gPSBqb3NlSGVhZGVyOwogICAgICAgIGlmICh0eXBlb2YgYWxnICE9PSAnc3RyaW5nJyB8fCAhYWxnKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBKV1NJbnZhbGlkKCdKV1MgImFsZyIgKEFsZ29yaXRobSkgSGVhZGVyIFBhcmFtZXRlciBtaXNzaW5nIG9yIGludmFsaWQnKTsKICAgICAgICB9CiAgICAgICAgY2hlY2tLZXlUeXBlV2l0aEp3ayhhbGcsIGtleSwgJ3NpZ24nKTsKICAgICAgICBsZXQgcGF5bG9hZCA9IHRoaXMuX3BheWxvYWQ7CiAgICAgICAgaWYgKGI2NCkgewogICAgICAgICAgICBwYXlsb2FkID0gZW5jb2Rlci5lbmNvZGUoZW5jb2RlKHBheWxvYWQpKTsKICAgICAgICB9CiAgICAgICAgbGV0IHByb3RlY3RlZEhlYWRlcjsKICAgICAgICBpZiAodGhpcy5fcHJvdGVjdGVkSGVhZGVyKSB7CiAgICAgICAgICAgIHByb3RlY3RlZEhlYWRlciA9IGVuY29kZXIuZW5jb2RlKGVuY29kZShKU09OLnN0cmluZ2lmeSh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpKSk7CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICBwcm90ZWN0ZWRIZWFkZXIgPSBlbmNvZGVyLmVuY29kZSgnJyk7CiAgICAgICAgfQogICAgICAgIGNvbnN0IGRhdGEgPSBjb25jYXQocHJvdGVjdGVkSGVhZGVyLCBlbmNvZGVyLmVuY29kZSgnLicpLCBwYXlsb2FkKTsKICAgICAgICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCBzaWduJDEoYWxnLCBrZXksIGRhdGEpOwogICAgICAgIGNvbnN0IGp3cyA9IHsKICAgICAgICAgICAgc2lnbmF0dXJlOiBlbmNvZGUoc2lnbmF0dXJlKSwKICAgICAgICAgICAgcGF5bG9hZDogJycsCiAgICAgICAgfTsKICAgICAgICBpZiAoYjY0KSB7CiAgICAgICAgICAgIGp3cy5wYXlsb2FkID0gZGVjb2Rlci5kZWNvZGUocGF5bG9hZCk7CiAgICAgICAgfQogICAgICAgIGlmICh0aGlzLl91bnByb3RlY3RlZEhlYWRlcikgewogICAgICAgICAgICBqd3MuaGVhZGVyID0gdGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXI7CiAgICAgICAgfQogICAgICAgIGlmICh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpIHsKICAgICAgICAgICAgandzLnByb3RlY3RlZCA9IGRlY29kZXIuZGVjb2RlKHByb3RlY3RlZEhlYWRlcik7CiAgICAgICAgfQogICAgICAgIHJldHVybiBqd3M7CiAgICB9Cn0KCmNsYXNzIENvbXBhY3RTaWduIHsKICAgIGNvbnN0cnVjdG9yKHBheWxvYWQpIHsKICAgICAgICB0aGlzLl9mbGF0dGVuZWQgPSBuZXcgRmxhdHRlbmVkU2lnbihwYXlsb2FkKTsKICAgIH0KICAgIHNldFByb3RlY3RlZEhlYWRlcihwcm90ZWN0ZWRIZWFkZXIpIHsKICAgICAgICB0aGlzLl9mbGF0dGVuZWQuc2V0UHJvdGVjdGVkSGVhZGVyKHByb3RlY3RlZEhlYWRlcik7CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9CiAgICBhc3luYyBzaWduKGtleSwgb3B0aW9ucykgewogICAgICAgIGNvbnN0IGp3cyA9IGF3YWl0IHRoaXMuX2ZsYXR0ZW5lZC5zaWduKGtleSwgb3B0aW9ucyk7CiAgICAgICAgaWYgKGp3cy5wYXlsb2FkID09PSB1bmRlZmluZWQpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndXNlIHRoZSBmbGF0dGVuZWQgbW9kdWxlIGZvciBjcmVhdGluZyBKV1Mgd2l0aCBiNjQ6IGZhbHNlJyk7CiAgICAgICAgfQogICAgICAgIHJldHVybiBgJHtqd3MucHJvdGVjdGVkfS4ke2p3cy5wYXlsb2FkfS4ke2p3cy5zaWduYXR1cmV9YDsKICAgIH0KfQoKZnVuY3Rpb24gdmFsaWRhdGVJbnB1dChsYWJlbCwgaW5wdXQpIHsKICAgIGlmICghTnVtYmVyLmlzRmluaXRlKGlucHV0KSkgewogICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgJHtsYWJlbH0gaW5wdXRgKTsKICAgIH0KICAgIHJldHVybiBpbnB1dDsKfQpjbGFzcyBQcm9kdWNlSldUIHsKICAgIGNvbnN0cnVjdG9yKHBheWxvYWQgPSB7fSkgewogICAgICAgIGlmICghaXNPYmplY3QocGF5bG9hZCkpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSldUIENsYWltcyBTZXQgTVVTVCBiZSBhbiBvYmplY3QnKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHBheWxvYWQ7CiAgICB9CiAgICBzZXRJc3N1ZXIoaXNzdWVyKSB7CiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHsgLi4udGhpcy5fcGF5bG9hZCwgaXNzOiBpc3N1ZXIgfTsKICAgICAgICByZXR1cm4gdGhpczsKICAgIH0KICAgIHNldFN1YmplY3Qoc3ViamVjdCkgewogICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIHN1Yjogc3ViamVjdCB9OwogICAgICAgIHJldHVybiB0aGlzOwogICAgfQogICAgc2V0QXVkaWVuY2UoYXVkaWVuY2UpIHsKICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBhdWQ6IGF1ZGllbmNlIH07CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9CiAgICBzZXRKdGkoand0SWQpIHsKICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBqdGk6IGp3dElkIH07CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9CiAgICBzZXROb3RCZWZvcmUoaW5wdXQpIHsKICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykgewogICAgICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBuYmY6IHZhbGlkYXRlSW5wdXQoJ3NldE5vdEJlZm9yZScsIGlucHV0KSB9OwogICAgICAgIH0KICAgICAgICBlbHNlIGlmIChpbnB1dCBpbnN0YW5jZW9mIERhdGUpIHsKICAgICAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHsgLi4udGhpcy5fcGF5bG9hZCwgbmJmOiB2YWxpZGF0ZUlucHV0KCdzZXROb3RCZWZvcmUnLCBlcG9jaChpbnB1dCkpIH07CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBuYmY6IGVwb2NoKG5ldyBEYXRlKCkpICsgc2VjcyhpbnB1dCkgfTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9CiAgICBzZXRFeHBpcmF0aW9uVGltZShpbnB1dCkgewogICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7CiAgICAgICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIGV4cDogdmFsaWRhdGVJbnB1dCgnc2V0RXhwaXJhdGlvblRpbWUnLCBpbnB1dCkgfTsKICAgICAgICB9CiAgICAgICAgZWxzZSBpZiAoaW5wdXQgaW5zdGFuY2VvZiBEYXRlKSB7CiAgICAgICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIGV4cDogdmFsaWRhdGVJbnB1dCgnc2V0RXhwaXJhdGlvblRpbWUnLCBlcG9jaChpbnB1dCkpIH07CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBleHA6IGVwb2NoKG5ldyBEYXRlKCkpICsgc2VjcyhpbnB1dCkgfTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHRoaXM7CiAgICB9CiAgICBzZXRJc3N1ZWRBdChpbnB1dCkgewogICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICd1bmRlZmluZWQnKSB7CiAgICAgICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIGlhdDogZXBvY2gobmV3IERhdGUoKSkgfTsKICAgICAgICB9CiAgICAgICAgZWxzZSBpZiAoaW5wdXQgaW5zdGFuY2VvZiBEYXRlKSB7CiAgICAgICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIGlhdDogdmFsaWRhdGVJbnB1dCgnc2V0SXNzdWVkQXQnLCBlcG9jaChpbnB1dCkpIH07CiAgICAgICAgfQogICAgICAgIGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHsKICAgICAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHsKICAgICAgICAgICAgICAgIC4uLnRoaXMuX3BheWxvYWQsCiAgICAgICAgICAgICAgICBpYXQ6IHZhbGlkYXRlSW5wdXQoJ3NldElzc3VlZEF0JywgZXBvY2gobmV3IERhdGUoKSkgKyBzZWNzKGlucHV0KSksCiAgICAgICAgICAgIH07CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBpYXQ6IHZhbGlkYXRlSW5wdXQoJ3NldElzc3VlZEF0JywgaW5wdXQpIH07CiAgICAgICAgfQogICAgICAgIHJldHVybiB0aGlzOwogICAgfQp9CgpjbGFzcyBTaWduSldUIGV4dGVuZHMgUHJvZHVjZUpXVCB7CiAgICBzZXRQcm90ZWN0ZWRIZWFkZXIocHJvdGVjdGVkSGVhZGVyKSB7CiAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyID0gcHJvdGVjdGVkSGVhZGVyOwogICAgICAgIHJldHVybiB0aGlzOwogICAgfQogICAgYXN5bmMgc2lnbihrZXksIG9wdGlvbnMpIHsKICAgICAgICBjb25zdCBzaWcgPSBuZXcgQ29tcGFjdFNpZ24oZW5jb2Rlci5lbmNvZGUoSlNPTi5zdHJpbmdpZnkodGhpcy5fcGF5bG9hZCkpKTsKICAgICAgICBzaWcuc2V0UHJvdGVjdGVkSGVhZGVyKHRoaXMuX3Byb3RlY3RlZEhlYWRlcik7CiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fcHJvdGVjdGVkSGVhZGVyPy5jcml0KSAmJgogICAgICAgICAgICB0aGlzLl9wcm90ZWN0ZWRIZWFkZXIuY3JpdC5pbmNsdWRlcygnYjY0JykgJiYKICAgICAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyLmI2NCA9PT0gZmFsc2UpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXVEludmFsaWQoJ0pXVHMgTVVTVCBOT1QgdXNlIHVuZW5jb2RlZCBwYXlsb2FkJyk7CiAgICAgICAgfQogICAgICAgIHJldHVybiBzaWcuc2lnbihrZXksIG9wdGlvbnMpOwogICAgfQp9Cgpjb25zdCBjaGVjayA9ICh2YWx1ZSwgZGVzY3JpcHRpb24pID0+IHsKICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8ICF2YWx1ZSkgewogICAgICAgIHRocm93IG5ldyBKV0tJbnZhbGlkKGAke2Rlc2NyaXB0aW9ufSBtaXNzaW5nIG9yIGludmFsaWRgKTsKICAgIH0KfTsKYXN5bmMgZnVuY3Rpb24gY2FsY3VsYXRlSndrVGh1bWJwcmludChqd2ssIGRpZ2VzdEFsZ29yaXRobSkgewogICAgaWYgKCFpc09iamVjdChqd2spKSB7CiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSldLIG11c3QgYmUgYW4gb2JqZWN0Jyk7CiAgICB9CiAgICBkaWdlc3RBbGdvcml0aG0gPz8gKGRpZ2VzdEFsZ29yaXRobSA9ICdzaGEyNTYnKTsKICAgIGlmIChkaWdlc3RBbGdvcml0aG0gIT09ICdzaGEyNTYnICYmCiAgICAgICAgZGlnZXN0QWxnb3JpdGhtICE9PSAnc2hhMzg0JyAmJgogICAgICAgIGRpZ2VzdEFsZ29yaXRobSAhPT0gJ3NoYTUxMicpIHsKICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdkaWdlc3RBbGdvcml0aG0gbXVzdCBvbmUgb2YgInNoYTI1NiIsICJzaGEzODQiLCBvciAic2hhNTEyIicpOwogICAgfQogICAgbGV0IGNvbXBvbmVudHM7CiAgICBzd2l0Y2ggKGp3ay5rdHkpIHsKICAgICAgICBjYXNlICdFQyc6CiAgICAgICAgICAgIGNoZWNrKGp3ay5jcnYsICciY3J2IiAoQ3VydmUpIFBhcmFtZXRlcicpOwogICAgICAgICAgICBjaGVjayhqd2sueCwgJyJ4IiAoWCBDb29yZGluYXRlKSBQYXJhbWV0ZXInKTsKICAgICAgICAgICAgY2hlY2soandrLnksICcieSIgKFkgQ29vcmRpbmF0ZSkgUGFyYW1ldGVyJyk7CiAgICAgICAgICAgIGNvbXBvbmVudHMgPSB7IGNydjogandrLmNydiwga3R5OiBqd2sua3R5LCB4OiBqd2sueCwgeTogandrLnkgfTsKICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAnT0tQJzoKICAgICAgICAgICAgY2hlY2soandrLmNydiwgJyJjcnYiIChTdWJ0eXBlIG9mIEtleSBQYWlyKSBQYXJhbWV0ZXInKTsKICAgICAgICAgICAgY2hlY2soandrLngsICcieCIgKFB1YmxpYyBLZXkpIFBhcmFtZXRlcicpOwogICAgICAgICAgICBjb21wb25lbnRzID0geyBjcnY6IGp3ay5jcnYsIGt0eTogandrLmt0eSwgeDogandrLnggfTsKICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgY2FzZSAnUlNBJzoKICAgICAgICAgICAgY2hlY2soandrLmUsICciZSIgKEV4cG9uZW50KSBQYXJhbWV0ZXInKTsKICAgICAgICAgICAgY2hlY2soandrLm4sICcibiIgKE1vZHVsdXMpIFBhcmFtZXRlcicpOwogICAgICAgICAgICBjb21wb25lbnRzID0geyBlOiBqd2suZSwga3R5OiBqd2sua3R5LCBuOiBqd2subiB9OwogICAgICAgICAgICBicmVhazsKICAgICAgICBjYXNlICdvY3QnOgogICAgICAgICAgICBjaGVjayhqd2suaywgJyJrIiAoS2V5IFZhbHVlKSBQYXJhbWV0ZXInKTsKICAgICAgICAgICAgY29tcG9uZW50cyA9IHsgazogandrLmssIGt0eTogandrLmt0eSB9OwogICAgICAgICAgICBicmVhazsKICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICB0aHJvdyBuZXcgSk9TRU5vdFN1cHBvcnRlZCgnImt0eSIgKEtleSBUeXBlKSBQYXJhbWV0ZXIgbWlzc2luZyBvciB1bnN1cHBvcnRlZCcpOwogICAgfQogICAgY29uc3QgZGF0YSA9IGVuY29kZXIuZW5jb2RlKEpTT04uc3RyaW5naWZ5KGNvbXBvbmVudHMpKTsKICAgIHJldHVybiBlbmNvZGUoYXdhaXQgZGlnZXN0JDEoZGlnZXN0QWxnb3JpdGhtLCBkYXRhKSk7Cn0KCmZ1bmN0aW9uIGdldEt0eUZyb21BbGcoYWxnKSB7CiAgICBzd2l0Y2ggKHR5cGVvZiBhbGcgPT09ICdzdHJpbmcnICYmIGFsZy5zbGljZSgwLCAyKSkgewogICAgICAgIGNhc2UgJ1JTJzoKICAgICAgICBjYXNlICdQUyc6CiAgICAgICAgICAgIHJldHVybiAnUlNBJzsKICAgICAgICBjYXNlICdFUyc6CiAgICAgICAgICAgIHJldHVybiAnRUMnOwogICAgICAgIGNhc2UgJ0VkJzoKICAgICAgICAgICAgcmV0dXJuICdPS1AnOwogICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgIHRocm93IG5ldyBKT1NFTm90U3VwcG9ydGVkKCdVbnN1cHBvcnRlZCAiYWxnIiB2YWx1ZSBmb3IgYSBKU09OIFdlYiBLZXkgU2V0Jyk7CiAgICB9Cn0KZnVuY3Rpb24gaXNKV0tTTGlrZShqd2tzKSB7CiAgICByZXR1cm4gKGp3a3MgJiYKICAgICAgICB0eXBlb2YgandrcyA9PT0gJ29iamVjdCcgJiYKICAgICAgICBBcnJheS5pc0FycmF5KGp3a3Mua2V5cykgJiYKICAgICAgICBqd2tzLmtleXMuZXZlcnkoaXNKV0tMaWtlKSk7Cn0KZnVuY3Rpb24gaXNKV0tMaWtlKGtleSkgewogICAgcmV0dXJuIGlzT2JqZWN0KGtleSk7Cn0KZnVuY3Rpb24gY2xvbmUob2JqKSB7CiAgICBpZiAodHlwZW9mIHN0cnVjdHVyZWRDbG9uZSA9PT0gJ2Z1bmN0aW9uJykgewogICAgICAgIHJldHVybiBzdHJ1Y3R1cmVkQ2xvbmUob2JqKTsKICAgIH0KICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpOwp9CmNsYXNzIExvY2FsSldLU2V0IHsKICAgIGNvbnN0cnVjdG9yKGp3a3MpIHsKICAgICAgICB0aGlzLl9jYWNoZWQgPSBuZXcgV2Vha01hcCgpOwogICAgICAgIGlmICghaXNKV0tTTGlrZShqd2tzKSkgewogICAgICAgICAgICB0aHJvdyBuZXcgSldLU0ludmFsaWQoJ0pTT04gV2ViIEtleSBTZXQgbWFsZm9ybWVkJyk7CiAgICAgICAgfQogICAgICAgIHRoaXMuX2p3a3MgPSBjbG9uZShqd2tzKTsKICAgIH0KICAgIGFzeW5jIGdldEtleShwcm90ZWN0ZWRIZWFkZXIsIHRva2VuKSB7CiAgICAgICAgY29uc3QgeyBhbGcsIGtpZCB9ID0geyAuLi5wcm90ZWN0ZWRIZWFkZXIsIC4uLnRva2VuPy5oZWFkZXIgfTsKICAgICAgICBjb25zdCBrdHkgPSBnZXRLdHlGcm9tQWxnKGFsZyk7CiAgICAgICAgY29uc3QgY2FuZGlkYXRlcyA9IHRoaXMuX2p3a3Mua2V5cy5maWx0ZXIoKGp3aykgPT4gewogICAgICAgICAgICBsZXQgY2FuZGlkYXRlID0ga3R5ID09PSBqd2sua3R5OwogICAgICAgICAgICBpZiAoY2FuZGlkYXRlICYmIHR5cGVvZiBraWQgPT09ICdzdHJpbmcnKSB7CiAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBraWQgPT09IGp3ay5raWQ7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZSAmJiB0eXBlb2YgandrLmFsZyA9PT0gJ3N0cmluZycpIHsKICAgICAgICAgICAgICAgIGNhbmRpZGF0ZSA9IGFsZyA9PT0gandrLmFsZzsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoY2FuZGlkYXRlICYmIHR5cGVvZiBqd2sudXNlID09PSAnc3RyaW5nJykgewogICAgICAgICAgICAgICAgY2FuZGlkYXRlID0gandrLnVzZSA9PT0gJ3NpZyc7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZSAmJiBBcnJheS5pc0FycmF5KGp3ay5rZXlfb3BzKSkgewogICAgICAgICAgICAgICAgY2FuZGlkYXRlID0gandrLmtleV9vcHMuaW5jbHVkZXMoJ3ZlcmlmeScpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChjYW5kaWRhdGUpIHsKICAgICAgICAgICAgICAgIHN3aXRjaCAoYWxnKSB7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAnRVMyNTYnOgogICAgICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBqd2suY3J2ID09PSAnUC0yNTYnOwogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICBjYXNlICdFUzI1NksnOgogICAgICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBqd2suY3J2ID09PSAnc2VjcDI1NmsxJzsKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAnRVMzODQnOgogICAgICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBqd2suY3J2ID09PSAnUC0zODQnOwogICAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICBjYXNlICdFUzUxMic6CiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZSA9IGp3ay5jcnYgPT09ICdQLTUyMSc7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIGNhc2UgJ0VkMjU1MTknOgogICAgICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBqd2suY3J2ID09PSAnRWQyNTUxOSc7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIGNhc2UgJ0VkRFNBJzoKICAgICAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlID0gandrLmNydiA9PT0gJ0VkMjU1MTknIHx8IGp3ay5jcnYgPT09ICdFZDQ0OCc7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiBjYW5kaWRhdGU7CiAgICAgICAgfSk7CiAgICAgICAgY29uc3QgeyAwOiBqd2ssIGxlbmd0aCB9ID0gY2FuZGlkYXRlczsKICAgICAgICBpZiAobGVuZ3RoID09PSAwKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBKV0tTTm9NYXRjaGluZ0tleSgpOwogICAgICAgIH0KICAgICAgICBpZiAobGVuZ3RoICE9PSAxKSB7CiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEpXS1NNdWx0aXBsZU1hdGNoaW5nS2V5cygpOwogICAgICAgICAgICBjb25zdCB7IF9jYWNoZWQgfSA9IHRoaXM7CiAgICAgICAgICAgIGVycm9yW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGFzeW5jIGZ1bmN0aW9uKiAoKSB7CiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGp3ayBvZiBjYW5kaWRhdGVzKSB7CiAgICAgICAgICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgYXdhaXQgaW1wb3J0V2l0aEFsZ0NhY2hlKF9jYWNoZWQsIGp3aywgYWxnKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggeyB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHRocm93IGVycm9yOwogICAgICAgIH0KICAgICAgICByZXR1cm4gaW1wb3J0V2l0aEFsZ0NhY2hlKHRoaXMuX2NhY2hlZCwgandrLCBhbGcpOwogICAgfQp9CmFzeW5jIGZ1bmN0aW9uIGltcG9ydFdpdGhBbGdDYWNoZShjYWNoZSwgandrLCBhbGcpIHsKICAgIGNvbnN0IGNhY2hlZCA9IGNhY2hlLmdldChqd2spIHx8IGNhY2hlLnNldChqd2ssIHt9KS5nZXQoandrKTsKICAgIGlmIChjYWNoZWRbYWxnXSA9PT0gdW5kZWZpbmVkKSB7CiAgICAgICAgY29uc3Qga2V5ID0gYXdhaXQgaW1wb3J0SldLKHsgLi4uandrLCBleHQ6IHRydWUgfSwgYWxnKTsKICAgICAgICBpZiAoa2V5IGluc3RhbmNlb2YgVWludDhBcnJheSB8fCBrZXkudHlwZSAhPT0gJ3B1YmxpYycpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEpXS1NJbnZhbGlkKCdKU09OIFdlYiBLZXkgU2V0IG1lbWJlcnMgbXVzdCBiZSBwdWJsaWMga2V5cycpOwogICAgICAgIH0KICAgICAgICBjYWNoZWRbYWxnXSA9IGtleTsKICAgIH0KICAgIHJldHVybiBjYWNoZWRbYWxnXTsKfQpmdW5jdGlvbiBjcmVhdGVMb2NhbEpXS1NldChqd2tzKSB7CiAgICBjb25zdCBzZXQgPSBuZXcgTG9jYWxKV0tTZXQoandrcyk7CiAgICBjb25zdCBsb2NhbEpXS1NldCA9IGFzeW5jIChwcm90ZWN0ZWRIZWFkZXIsIHRva2VuKSA9PiBzZXQuZ2V0S2V5KHByb3RlY3RlZEhlYWRlciwgdG9rZW4pOwogICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobG9jYWxKV0tTZXQsIHsKICAgICAgICBqd2tzOiB7CiAgICAgICAgICAgIHZhbHVlOiAoKSA9PiBjbG9uZShzZXQuX2p3a3MpLAogICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLAogICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLAogICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsCiAgICAgICAgfSwKICAgIH0pOwogICAgcmV0dXJuIGxvY2FsSldLU2V0Owp9Cgpjb25zdCBmZXRjaEp3a3MgPSBhc3luYyAodXJsLCB0aW1lb3V0LCBvcHRpb25zKSA9PiB7CiAgICBsZXQgY29udHJvbGxlcjsKICAgIGxldCBpZDsKICAgIGxldCB0aW1lZE91dCA9IGZhbHNlOwogICAgaWYgKHR5cGVvZiBBYm9ydENvbnRyb2xsZXIgPT09ICdmdW5jdGlvbicpIHsKICAgICAgICBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpOwogICAgICAgIGlkID0gc2V0VGltZW91dCgoKSA9PiB7CiAgICAgICAgICAgIHRpbWVkT3V0ID0gdHJ1ZTsKICAgICAgICAgICAgY29udHJvbGxlci5hYm9ydCgpOwogICAgICAgIH0sIHRpbWVvdXQpOwogICAgfQogICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwuaHJlZiwgewogICAgICAgIHNpZ25hbDogY29udHJvbGxlciA/IGNvbnRyb2xsZXIuc2lnbmFsIDogdW5kZWZpbmVkLAogICAgICAgIHJlZGlyZWN0OiAnbWFudWFsJywKICAgICAgICBoZWFkZXJzOiBvcHRpb25zLmhlYWRlcnMsCiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7CiAgICAgICAgaWYgKHRpbWVkT3V0KQogICAgICAgICAgICB0aHJvdyBuZXcgSldLU1RpbWVvdXQoKTsKICAgICAgICB0aHJvdyBlcnI7CiAgICB9KTsKICAgIGlmIChpZCAhPT0gdW5kZWZpbmVkKQogICAgICAgIGNsZWFyVGltZW91dChpZCk7CiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHsKICAgICAgICB0aHJvdyBuZXcgSk9TRUVycm9yKCdFeHBlY3RlZCAyMDAgT0sgZnJvbSB0aGUgSlNPTiBXZWIgS2V5IFNldCBIVFRQIHJlc3BvbnNlJyk7CiAgICB9CiAgICB0cnkgewogICAgICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7CiAgICB9CiAgICBjYXRjaCB7CiAgICAgICAgdGhyb3cgbmV3IEpPU0VFcnJvcignRmFpbGVkIHRvIHBhcnNlIHRoZSBKU09OIFdlYiBLZXkgU2V0IEhUVFAgcmVzcG9uc2UgYXMgSlNPTicpOwogICAgfQp9Owp2YXIgZmV0Y2hKd2tzJDEgPSBmZXRjaEp3a3M7CgpmdW5jdGlvbiBpc0Nsb3VkZmxhcmVXb3JrZXJzKCkgewogICAgcmV0dXJuICh0eXBlb2YgV2ViU29ja2V0UGFpciAhPT0gJ3VuZGVmaW5lZCcgfHwKICAgICAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCA9PT0gJ0Nsb3VkZmxhcmUtV29ya2VycycpIHx8CiAgICAgICAgKHR5cGVvZiBFZGdlUnVudGltZSAhPT0gJ3VuZGVmaW5lZCcgJiYgRWRnZVJ1bnRpbWUgPT09ICd2ZXJjZWwnKSk7Cn0KbGV0IFVTRVJfQUdFTlQ7CmlmICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyB8fCAhbmF2aWdhdG9yLnVzZXJBZ2VudD8uc3RhcnRzV2l0aD8uKCdNb3ppbGxhLzUuMCAnKSkgewogICAgY29uc3QgTkFNRSA9ICdqb3NlJzsKICAgIGNvbnN0IFZFUlNJT04gPSAndjUuMTAuMCc7CiAgICBVU0VSX0FHRU5UID0gYCR7TkFNRX0vJHtWRVJTSU9OfWA7Cn0KY29uc3Qgandrc0NhY2hlID0gU3ltYm9sKCk7CmZ1bmN0aW9uIGlzRnJlc2hKd2tzQ2FjaGUoaW5wdXQsIGNhY2hlTWF4QWdlKSB7CiAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnb2JqZWN0JyB8fCBpbnB1dCA9PT0gbnVsbCkgewogICAgICAgIHJldHVybiBmYWxzZTsKICAgIH0KICAgIGlmICghKCd1YXQnIGluIGlucHV0KSB8fCB0eXBlb2YgaW5wdXQudWF0ICE9PSAnbnVtYmVyJyB8fCBEYXRlLm5vdygpIC0gaW5wdXQudWF0ID49IGNhY2hlTWF4QWdlKSB7CiAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgfQogICAgaWYgKCEoJ2p3a3MnIGluIGlucHV0KSB8fAogICAgICAgICFpc09iamVjdChpbnB1dC5qd2tzKSB8fAogICAgICAgICFBcnJheS5pc0FycmF5KGlucHV0Lmp3a3Mua2V5cykgfHwKICAgICAgICAhQXJyYXkucHJvdG90eXBlLmV2ZXJ5LmNhbGwoaW5wdXQuandrcy5rZXlzLCBpc09iamVjdCkpIHsKICAgICAgICByZXR1cm4gZmFsc2U7CiAgICB9CiAgICByZXR1cm4gdHJ1ZTsKfQpjbGFzcyBSZW1vdGVKV0tTZXQgewogICAgY29uc3RydWN0b3IodXJsLCBvcHRpb25zKSB7CiAgICAgICAgaWYgKCEodXJsIGluc3RhbmNlb2YgVVJMKSkgewogICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd1cmwgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBVUkwnKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5fdXJsID0gbmV3IFVSTCh1cmwuaHJlZik7CiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHsgYWdlbnQ6IG9wdGlvbnM/LmFnZW50LCBoZWFkZXJzOiBvcHRpb25zPy5oZWFkZXJzIH07CiAgICAgICAgdGhpcy5fdGltZW91dER1cmF0aW9uID0KICAgICAgICAgICAgdHlwZW9mIG9wdGlvbnM/LnRpbWVvdXREdXJhdGlvbiA9PT0gJ251bWJlcicgPyBvcHRpb25zPy50aW1lb3V0RHVyYXRpb24gOiA1MDAwOwogICAgICAgIHRoaXMuX2Nvb2xkb3duRHVyYXRpb24gPQogICAgICAgICAgICB0eXBlb2Ygb3B0aW9ucz8uY29vbGRvd25EdXJhdGlvbiA9PT0gJ251bWJlcicgPyBvcHRpb25zPy5jb29sZG93bkR1cmF0aW9uIDogMzAwMDA7CiAgICAgICAgdGhpcy5fY2FjaGVNYXhBZ2UgPSB0eXBlb2Ygb3B0aW9ucz8uY2FjaGVNYXhBZ2UgPT09ICdudW1iZXInID8gb3B0aW9ucz8uY2FjaGVNYXhBZ2UgOiA2MDAwMDA7CiAgICAgICAgaWYgKG9wdGlvbnM/Lltqd2tzQ2FjaGVdICE9PSB1bmRlZmluZWQpIHsKICAgICAgICAgICAgdGhpcy5fY2FjaGUgPSBvcHRpb25zPy5bandrc0NhY2hlXTsKICAgICAgICAgICAgaWYgKGlzRnJlc2hKd2tzQ2FjaGUob3B0aW9ucz8uW2p3a3NDYWNoZV0sIHRoaXMuX2NhY2hlTWF4QWdlKSkgewogICAgICAgICAgICAgICAgdGhpcy5fandrc1RpbWVzdGFtcCA9IHRoaXMuX2NhY2hlLnVhdDsKICAgICAgICAgICAgICAgIHRoaXMuX2xvY2FsID0gY3JlYXRlTG9jYWxKV0tTZXQodGhpcy5fY2FjaGUuandrcyk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9CiAgICBjb29saW5nRG93bigpIHsKICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuX2p3a3NUaW1lc3RhbXAgPT09ICdudW1iZXInCiAgICAgICAgICAgID8gRGF0ZS5ub3coKSA8IHRoaXMuX2p3a3NUaW1lc3RhbXAgKyB0aGlzLl9jb29sZG93bkR1cmF0aW9uCiAgICAgICAgICAgIDogZmFsc2U7CiAgICB9CiAgICBmcmVzaCgpIHsKICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuX2p3a3NUaW1lc3RhbXAgPT09ICdudW1iZXInCiAgICAgICAgICAgID8gRGF0ZS5ub3coKSA8IHRoaXMuX2p3a3NUaW1lc3RhbXAgKyB0aGlzLl9jYWNoZU1heEFnZQogICAgICAgICAgICA6IGZhbHNlOwogICAgfQogICAgYXN5bmMgZ2V0S2V5KHByb3RlY3RlZEhlYWRlciwgdG9rZW4pIHsKICAgICAgICBpZiAoIXRoaXMuX2xvY2FsIHx8ICF0aGlzLmZyZXNoKCkpIHsKICAgICAgICAgICAgYXdhaXQgdGhpcy5yZWxvYWQoKTsKICAgICAgICB9CiAgICAgICAgdHJ5IHsKICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2xvY2FsKHByb3RlY3RlZEhlYWRlciwgdG9rZW4pOwogICAgICAgIH0KICAgICAgICBjYXRjaCAoZXJyKSB7CiAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBKV0tTTm9NYXRjaGluZ0tleSkgewogICAgICAgICAgICAgICAgaWYgKHRoaXMuY29vbGluZ0Rvd24oKSA9PT0gZmFsc2UpIHsKICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnJlbG9hZCgpOwogICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2NhbChwcm90ZWN0ZWRIZWFkZXIsIHRva2VuKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICB0aHJvdyBlcnI7CiAgICAgICAgfQogICAgfQogICAgYXN5bmMgcmVsb2FkKCkgewogICAgICAgIGlmICh0aGlzLl9wZW5kaW5nRmV0Y2ggJiYgaXNDbG91ZGZsYXJlV29ya2VycygpKSB7CiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdGZXRjaCA9IHVuZGVmaW5lZDsKICAgICAgICB9CiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHRoaXMuX29wdGlvbnMuaGVhZGVycyk7CiAgICAgICAgaWYgKFVTRVJfQUdFTlQgJiYgIWhlYWRlcnMuaGFzKCdVc2VyLUFnZW50JykpIHsKICAgICAgICAgICAgaGVhZGVycy5zZXQoJ1VzZXItQWdlbnQnLCBVU0VSX0FHRU5UKTsKICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5oZWFkZXJzID0gT2JqZWN0LmZyb21FbnRyaWVzKGhlYWRlcnMuZW50cmllcygpKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5fcGVuZGluZ0ZldGNoIHx8ICh0aGlzLl9wZW5kaW5nRmV0Y2ggPSBmZXRjaEp3a3MkMSh0aGlzLl91cmwsIHRoaXMuX3RpbWVvdXREdXJhdGlvbiwgdGhpcy5fb3B0aW9ucykKICAgICAgICAgICAgLnRoZW4oKGpzb24pID0+IHsKICAgICAgICAgICAgdGhpcy5fbG9jYWwgPSBjcmVhdGVMb2NhbEpXS1NldChqc29uKTsKICAgICAgICAgICAgaWYgKHRoaXMuX2NhY2hlKSB7CiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZS51YXQgPSBEYXRlLm5vdygpOwogICAgICAgICAgICAgICAgdGhpcy5fY2FjaGUuandrcyA9IGpzb247CiAgICAgICAgICAgIH0KICAgICAgICAgICAgdGhpcy5fandrc1RpbWVzdGFtcCA9IERhdGUubm93KCk7CiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdGZXRjaCA9IHVuZGVmaW5lZDsKICAgICAgICB9KQogICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gewogICAgICAgICAgICB0aGlzLl9wZW5kaW5nRmV0Y2ggPSB1bmRlZmluZWQ7CiAgICAgICAgICAgIHRocm93IGVycjsKICAgICAgICB9KSk7CiAgICAgICAgYXdhaXQgdGhpcy5fcGVuZGluZ0ZldGNoOwogICAgfQp9CmZ1bmN0aW9uIGNyZWF0ZVJlbW90ZUpXS1NldCh1cmwsIG9wdGlvbnMpIHsKICAgIGNvbnN0IHNldCA9IG5ldyBSZW1vdGVKV0tTZXQodXJsLCBvcHRpb25zKTsKICAgIGNvbnN0IHJlbW90ZUpXS1NldCA9IGFzeW5jIChwcm90ZWN0ZWRIZWFkZXIsIHRva2VuKSA9PiBzZXQuZ2V0S2V5KHByb3RlY3RlZEhlYWRlciwgdG9rZW4pOwogICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMocmVtb3RlSldLU2V0LCB7CiAgICAgICAgY29vbGluZ0Rvd246IHsKICAgICAgICAgICAgZ2V0OiAoKSA9PiBzZXQuY29vbGluZ0Rvd24oKSwKICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSwKICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSwKICAgICAgICB9LAogICAgICAgIGZyZXNoOiB7CiAgICAgICAgICAgIGdldDogKCkgPT4gc2V0LmZyZXNoKCksCiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsCiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsCiAgICAgICAgfSwKICAgICAgICByZWxvYWQ6IHsKICAgICAgICAgICAgdmFsdWU6ICgpID0+IHNldC5yZWxvYWQoKSwKICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSwKICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSwKICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLAogICAgICAgIH0sCiAgICAgICAgcmVsb2FkaW5nOiB7CiAgICAgICAgICAgIGdldDogKCkgPT4gISFzZXQuX3BlbmRpbmdGZXRjaCwKICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSwKICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSwKICAgICAgICB9LAogICAgICAgIGp3a3M6IHsKICAgICAgICAgICAgdmFsdWU6ICgpID0+IHNldC5fbG9jYWw/Lmp3a3MoKSwKICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSwKICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSwKICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLAogICAgICAgIH0sCiAgICB9KTsKICAgIHJldHVybiByZW1vdGVKV0tTZXQ7Cn0KCmNvbnN0IGRlY29kZSA9IGRlY29kZSQxOwoKZnVuY3Rpb24gZGVjb2RlSnd0KGp3dCkgewogICAgaWYgKHR5cGVvZiBqd3QgIT09ICdzdHJpbmcnKQogICAgICAgIHRocm93IG5ldyBKV1RJbnZhbGlkKCdKV1RzIG11c3QgdXNlIENvbXBhY3QgSldTIHNlcmlhbGl6YXRpb24sIEpXVCBtdXN0IGJlIGEgc3RyaW5nJyk7CiAgICBjb25zdCB7IDE6IHBheWxvYWQsIGxlbmd0aCB9ID0gand0LnNwbGl0KCcuJyk7CiAgICBpZiAobGVuZ3RoID09PSA1KQogICAgICAgIHRocm93IG5ldyBKV1RJbnZhbGlkKCdPbmx5IEpXVHMgdXNpbmcgQ29tcGFjdCBKV1Mgc2VyaWFsaXphdGlvbiBjYW4gYmUgZGVjb2RlZCcpOwogICAgaWYgKGxlbmd0aCAhPT0gMykKICAgICAgICB0aHJvdyBuZXcgSldUSW52YWxpZCgnSW52YWxpZCBKV1QnKTsKICAgIGlmICghcGF5bG9hZCkKICAgICAgICB0aHJvdyBuZXcgSldUSW52YWxpZCgnSldUcyBtdXN0IGNvbnRhaW4gYSBwYXlsb2FkJyk7CiAgICBsZXQgZGVjb2RlZDsKICAgIHRyeSB7CiAgICAgICAgZGVjb2RlZCA9IGRlY29kZShwYXlsb2FkKTsKICAgIH0KICAgIGNhdGNoIHsKICAgICAgICB0aHJvdyBuZXcgSldUSW52YWxpZCgnRmFpbGVkIHRvIGJhc2U2NHVybCBkZWNvZGUgdGhlIHBheWxvYWQnKTsKICAgIH0KICAgIGxldCByZXN1bHQ7CiAgICB0cnkgewogICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UoZGVjb2Rlci5kZWNvZGUoZGVjb2RlZCkpOwogICAgfQogICAgY2F0Y2ggewogICAgICAgIHRocm93IG5ldyBKV1RJbnZhbGlkKCdGYWlsZWQgdG8gcGFyc2UgdGhlIGRlY29kZWQgcGF5bG9hZCBhcyBKU09OJyk7CiAgICB9CiAgICBpZiAoIWlzT2JqZWN0KHJlc3VsdCkpCiAgICAgICAgdGhyb3cgbmV3IEpXVEludmFsaWQoJ0ludmFsaWQgSldUIENsYWltcyBTZXQnKTsKICAgIHJldHVybiByZXN1bHQ7Cn0KCmNvbnN0IHJlbmV3VG9rZW5zID0gYXN5bmMgKHNlc3Npb25EYXRhYmFzZSkgPT4gewogICAgLy8gcmVtZW1iZXIgc2Vzc2lvbiBkZXRhaWxzCiAgICB0cnkgewogICAgICAgIGF3YWl0IHNlc3Npb25EYXRhYmFzZS5pbml0KCk7CiAgICAgICAgY29uc3QgY2xpZW50X2lkID0gYXdhaXQgc2Vzc2lvbkRhdGFiYXNlLmdldEl0ZW0oImNsaWVudF9pZCIpOwogICAgICAgIGNvbnN0IHRva2VuX2VuZHBvaW50ID0gYXdhaXQgc2Vzc2lvbkRhdGFiYXNlLmdldEl0ZW0oInRva2VuX2VuZHBvaW50Iik7CiAgICAgICAgY29uc3Qga2V5X3BhaXIgPSBhd2FpdCBzZXNzaW9uRGF0YWJhc2UuZ2V0SXRlbSgiZHBvcF9rZXlwYWlyIik7CiAgICAgICAgY29uc3QgcmVmcmVzaF90b2tlbiA9IGF3YWl0IHNlc3Npb25EYXRhYmFzZS5nZXRJdGVtKCJyZWZyZXNoX3Rva2VuIik7CiAgICAgICAgaWYgKGNsaWVudF9pZCA9PT0gbnVsbCB8fCB0b2tlbl9lbmRwb2ludCA9PT0gbnVsbCB8fCBrZXlfcGFpciA9PT0gbnVsbCB8fCByZWZyZXNoX3Rva2VuID09PSBudWxsKSB7CiAgICAgICAgICAgIC8vIHdlIGNhbiBub3QgcmVzdG9yZSB0aGUgb2xkIHNlc3Npb24KICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJDb3VsZCBub3QgcmVmcmVzaCB0b2tlbnM6IGRldGFpbHMgbWlzc2luZyBmcm9tIGRhdGFiYXNlLiIpOwogICAgICAgIH0KICAgICAgICBjb25zdCB0b2tlbl9yZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RGcmVzaFRva2VucyhyZWZyZXNoX3Rva2VuLCBjbGllbnRfaWQsIHRva2VuX2VuZHBvaW50LCBrZXlfcGFpcikKICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7CiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHsKICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgU3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpOwogICAgICAgIH0pOwogICAgICAgIC8vIHZlcmlmeSBhY2Nlc3NfdG9rZW4gLy8gISBTb2xpZC1PSURDIHNwZWNpZmljYXRpb24gc2F5cyBpdCBzaG91bGQgYmUgYSBkcG9wLWJvdW5kIGBpZCB0b2tlbmAgYnV0IGltcGxlbWVudGF0aW9ucyBwcm92aWRlIGEgZHBvcC1ib3VuZCBgYWNjZXNzIHRva2VuYAogICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gdG9rZW5fcmVzcG9uc2VbImFjY2Vzc190b2tlbiJdOwogICAgICAgIGNvbnN0IGlkcCA9IGF3YWl0IHNlc3Npb25EYXRhYmFzZS5nZXRJdGVtKCJpZHAiKTsKICAgICAgICBpZiAoaWRwID09PSBudWxsKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiQWNjZXNzIFRva2VuIHZhbGlkYXRpb24gcHJlcGFyYXRpb24gLSBDb3VsZCBub3QgZmluZCBpbiBzZXNzaW9uRGF0YWJhc2U6IGlkcCIpOwogICAgICAgIH0KICAgICAgICBjb25zdCBqd2tzX3VyaSA9IGF3YWl0IHNlc3Npb25EYXRhYmFzZS5nZXRJdGVtKCJqd2tzX3VyaSIpOwogICAgICAgIGlmIChqd2tzX3VyaSA9PT0gbnVsbCkgewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkFjY2VzcyBUb2tlbiB2YWxpZGF0aW9uIHByZXBhcmF0aW9uIC0gQ291bGQgbm90IGZpbmQgaW4gc2Vzc2lvbkRhdGFiYXNlOiBqd2tzX3VyaSIpOwogICAgICAgIH0KICAgICAgICBjb25zdCBqd2tzID0gY3JlYXRlUmVtb3RlSldLU2V0KG5ldyBVUkwoandrc191cmkpKTsKICAgICAgICBjb25zdCB7IHBheWxvYWQgfSA9IGF3YWl0IGp3dFZlcmlmeShhY2Nlc3NUb2tlbiwgandrcywgewogICAgICAgICAgICBpc3N1ZXI6IGlkcCwgLy8gUkZDIDkyMDcKICAgICAgICAgICAgYXVkaWVuY2U6ICJzb2xpZCIsIC8vIFJGQyA3NTE5IC8vICEgInNvbGlkIiBhcyBwZXIgaW1wbGVtZW50YXRpb25zIC4uLgogICAgICAgICAgICAvLyBleHAsIG5iZiwgaWF0IC0gaGFuZGxlZCBhdXRvbWF0aWNhbGx5CiAgICAgICAgfSk7CiAgICAgICAgLy8gY2hlY2sgZHBvcCB0aHVtYnByaW50CiAgICAgICAgY29uc3QgZHBvcFRodW1icHJpbnQgPSBhd2FpdCBjYWxjdWxhdGVKd2tUaHVtYnByaW50KGF3YWl0IGV4cG9ydEpXSyhrZXlfcGFpci5wdWJsaWNLZXkpKTsKICAgICAgICBpZiAocGF5bG9hZFsiY25mIl1bImprdCJdICE9PSBkcG9wVGh1bWJwcmludCkgewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkFjY2VzcyBUb2tlbiB2YWxpZGF0aW9uIGZhaWxlZCBvbiBgamt0YDogamt0ICE9PSBEUG9QIHRodW1icHJpbnQgLSAiICsgcGF5bG9hZFsiY25mIl1bImprdCJdICsgIiAhPT0gIiArIGRwb3BUaHVtYnByaW50KTsKICAgICAgICB9CiAgICAgICAgLy8gY2hlY2sgY2xpZW50X2lkCiAgICAgICAgaWYgKHBheWxvYWRbImNsaWVudF9pZCJdICE9PSBjbGllbnRfaWQpIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJBY2Nlc3MgVG9rZW4gdmFsaWRhdGlvbiBmYWlsZWQgb24gYGNsaWVudF9pZGA6IEpXVCBwYXlsb2FkICE9PSBjbGllbnRfaWQgLSAiICsgcGF5bG9hZFsiY2xpZW50X2lkIl0gKyAiICE9PSAiICsgY2xpZW50X2lkKTsKICAgICAgICB9CiAgICAgICAgLy8gc2V0IG5ldyByZWZyZXNoIHRva2VuIGZvciB0b2tlbiByb3RhdGlvbgogICAgICAgIGF3YWl0IHNlc3Npb25EYXRhYmFzZS5zZXRJdGVtKCJyZWZyZXNoX3Rva2VuIiwgdG9rZW5fcmVzcG9uc2VbInJlZnJlc2hfdG9rZW4iXSk7CiAgICAgICAgcmV0dXJuIHsKICAgICAgICAgICAgLi4udG9rZW5fcmVzcG9uc2UsCiAgICAgICAgICAgIGRwb3Bfa2V5X3BhaXI6IGtleV9wYWlyLAogICAgICAgIH07CiAgICB9CiAgICBmaW5hbGx5IHsKICAgICAgICBzZXNzaW9uRGF0YWJhc2UuY2xvc2UoKTsKICAgIH0KfTsKLyoqCiAqIFJlcXVlc3QgYW4gZHBvcC1ib3VuZCBhY2Nlc3MgdG9rZW4gZnJvbSBhIHRva2VuIGVuZHBvaW50IHVzaW5nIGEgcmVmcmVzaCB0b2tlbgogKiBAcGFyYW0gYXV0aG9yaXphdGlvbl9jb2RlCiAqIEBwYXJhbSBwa2NlX2NvZGVfdmVyaWZpZXIKICogQHBhcmFtIHJlZGlyZWN0X3VyaQogKiBAcGFyYW0gY2xpZW50X2lkCiAqIEBwYXJhbSB0b2tlbl9lbmRwb2ludAogKiBAcGFyYW0ga2V5X3BhaXIKICogQHJldHVybnMKICovCmNvbnN0IHJlcXVlc3RGcmVzaFRva2VucyA9IGFzeW5jIChyZWZyZXNoX3Rva2VuLCBjbGllbnRfaWQsIHRva2VuX2VuZHBvaW50LCBrZXlfcGFpcikgPT4gewogICAgLy8gcHJlcGFyZSBwdWJsaWMga2V5IHRvIGJpbmQgYWNjZXNzIHRva2VuIHRvCiAgICBjb25zdCBqd2tfcHVibGljX2tleSA9IGF3YWl0IGV4cG9ydEpXSyhrZXlfcGFpci5wdWJsaWNLZXkpOwogICAgandrX3B1YmxpY19rZXkuYWxnID0gIkVTMjU2IjsKICAgIC8vIHNpZ24gdGhlIGFjY2VzcyB0b2tlbiByZXF1ZXN0IERQb1AgdG9rZW4KICAgIGNvbnN0IGRwb3AgPSBhd2FpdCBuZXcgU2lnbkpXVCh7CiAgICAgICAgaHR1OiB0b2tlbl9lbmRwb2ludCwKICAgICAgICBodG06ICJQT1NUIiwKICAgIH0pCiAgICAgICAgLnNldElzc3VlZEF0KCkKICAgICAgICAuc2V0SnRpKHNlbGYuY3J5cHRvLnJhbmRvbVVVSUQoKSkKICAgICAgICAuc2V0UHJvdGVjdGVkSGVhZGVyKHsKICAgICAgICBhbGc6ICJFUzI1NiIsCiAgICAgICAgdHlwOiAiZHBvcCtqd3QiLAogICAgICAgIGp3azogandrX3B1YmxpY19rZXksCiAgICB9KQogICAgICAgIC5zaWduKGtleV9wYWlyLnByaXZhdGVLZXkpOwogICAgcmV0dXJuIGZldGNoKHRva2VuX2VuZHBvaW50LCB7CiAgICAgICAgbWV0aG9kOiAiUE9TVCIsCiAgICAgICAgaGVhZGVyczogewogICAgICAgICAgICBkcG9wLAogICAgICAgICAgICAiQ29udGVudC1UeXBlIjogImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCIsCiAgICAgICAgfSwKICAgICAgICBib2R5OiBuZXcgVVJMU2VhcmNoUGFyYW1zKHsKICAgICAgICAgICAgZ3JhbnRfdHlwZTogInJlZnJlc2hfdG9rZW4iLAogICAgICAgICAgICByZWZyZXNoX3Rva2VuLAogICAgICAgICAgICBjbGllbnRfaWQKICAgICAgICB9KSwKICAgIH0pOwp9OwoKLyoqCiAqIEEgc2ltcGxlIEluZGV4ZWREQiB3cmFwcGVyLgogKi8KY2xhc3MgU2Vzc2lvbklEQiB7CiAgICBkYk5hbWU7CiAgICBzdG9yZU5hbWU7CiAgICBkYlZlcnNpb247CiAgICBkYiA9IG51bGw7CiAgICAvKioKICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UKICAgICAqIEBwYXJhbSBkYk5hbWUgVGhlIG5hbWUgb2YgdGhlIEluZGV4ZWREQiBkYXRhYmFzZQogICAgICogQHBhcmFtIHN0b3JlTmFtZSBUaGUgbmFtZSBvZiB0aGUgb2JqZWN0IHN0b3JlCiAgICAgKiBAcGFyYW0gZGJWZXJzaW9uIFRoZSBkYXRhYmFzZSB2ZXJzaW9uCiAgICAgKi8KICAgIGNvbnN0cnVjdG9yKGRiTmFtZSA9ICdzb2lkYycsIHN0b3JlTmFtZSA9ICdzZXNzaW9uJywgZGJWZXJzaW9uID0gMSkgewogICAgICAgIHRoaXMuZGJOYW1lID0gZGJOYW1lOwogICAgICAgIHRoaXMuc3RvcmVOYW1lID0gc3RvcmVOYW1lOwogICAgICAgIHRoaXMuZGJWZXJzaW9uID0gZGJWZXJzaW9uOwogICAgfQogICAgLyoqCiAgICAgKiBJbml0aWFsaXplcyB0aGUgSW5kZXhlZERCIGRhdGFiYXNlCiAgICAgKiBAcmV0dXJucyBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZGF0YWJhc2UgaXMgcmVhZHkKICAgICAqLwogICAgYXN5bmMgaW5pdCgpIHsKICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gewogICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4odGhpcy5kYk5hbWUsIHRoaXMuZGJWZXJzaW9uKTsKICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gKGV2ZW50KSA9PiB7CiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBEYXRhYmFzZSBlcnJvcjogJHtldmVudC50YXJnZXQuZXJyb3J9YCkpOwogICAgICAgICAgICB9OwogICAgICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudCkgPT4gewogICAgICAgICAgICAgICAgdGhpcy5kYiA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7CiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMpOwogICAgICAgICAgICB9OwogICAgICAgICAgICByZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IChldmVudCkgPT4gewogICAgICAgICAgICAgICAgY29uc3QgZGIgPSBldmVudC50YXJnZXQucmVzdWx0OwogICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIG9iamVjdCBzdG9yZSBhbHJlYWR5IGV4aXN0cywgaWYgbm90IGNyZWF0ZSBpdAogICAgICAgICAgICAgICAgaWYgKCFkYi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKHRoaXMuc3RvcmVOYW1lKSkgewogICAgICAgICAgICAgICAgICAgIGRiLmNyZWF0ZU9iamVjdFN0b3JlKHRoaXMuc3RvcmVOYW1lKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfTsKICAgICAgICB9KTsKICAgIH0KICAgIC8qKgogICAgICogU3RvcmVzIGFueSB2YWx1ZSBpbiB0aGUgZGF0YWJhc2Ugd2l0aCB0aGUgZ2l2ZW4gSUQgYXMga2V5CiAgICAgKiBAcGFyYW0gaWQgVGhlIGlkZW50aWZpZXIva2V5IGZvciB0aGUgdmFsdWUKICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gc3RvcmUKICAgICAqLwogICAgYXN5bmMgc2V0SXRlbShpZCwgdmFsdWUpIHsKICAgICAgICBpZiAoIXRoaXMuZGIpIHsKICAgICAgICAgICAgYXdhaXQgdGhpcy5pbml0KCk7CiAgICAgICAgfQogICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7CiAgICAgICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gdGhpcy5kYi50cmFuc2FjdGlvbih0aGlzLnN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpOwogICAgICAgICAgICAvLyBIYW5kbGUgdHJhbnNhdGlvbgogICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmNvbXBsZXRlID0gKCkgPT4gewogICAgICAgICAgICAgICAgcmVzb2x2ZSgpOwogICAgICAgICAgICB9OwogICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmVycm9yID0gKGV2ZW50KSA9PiB7CiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBUcmFuc2FjdGlvbiBlcnJvciBmb3Igc2V0SXRlbSgke2lkfSwuLi4pOiAke2V2ZW50LnRhcmdldC5lcnJvcn1gKSk7CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHRyYW5zYWN0aW9uLm9uYWJvcnQgPSAoZXZlbnQpID0+IHsKICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFRyYW5zYWN0aW9uIGFib3J0ZWQgZm9yIHNldEl0ZW0oJHtpZH0sLi4uKTogJHtldmVudC50YXJnZXQuZXJyb3J9YCkpOwogICAgICAgICAgICB9OwogICAgICAgICAgICAvLyBQZXJmb3JtIHRoZSByZXF1ZXN0IHdpdGhpbiB0aGUgdHJhbnNhY3Rpb24KICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZSh0aGlzLnN0b3JlTmFtZSk7CiAgICAgICAgICAgIHN0b3JlLnB1dCh2YWx1ZSwgaWQpOwogICAgICAgIH0pOwogICAgfQogICAgLyoqCiAgICAgICogUmV0cmlldmVzIGEgdmFsdWUgZnJvbSB0aGUgZGF0YWJhc2UgYnkgSUQKICAgICAgKiBAcGFyYW0gaWQgVGhlIGlkZW50aWZpZXIva2V5IGZvciB0aGUgdmFsdWUKICAgICAgKiBAcmV0dXJucyBUaGUgc3RvcmVkIHZhbHVlIG9yIG51bGwgaWYgbm90IGZvdW5kCiAgICAgICovCiAgICBhc3luYyBnZXRJdGVtKGlkKSB7CiAgICAgICAgaWYgKCF0aGlzLmRiKSB7CiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdCgpOwogICAgICAgIH0KICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gewogICAgICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IHRoaXMuZGIudHJhbnNhY3Rpb24odGhpcy5zdG9yZU5hbWUsICdyZWFkb25seScpOwogICAgICAgICAgICAvLyBIYW5kbGUgdHJhbnNhdGlvbgogICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmVycm9yID0gKGV2ZW50KSA9PiB7CiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBUcmFuc2FjdGlvbiBlcnJvciBmb3IgZ2V0SXRlbSgke2lkfSk6ICR7ZXZlbnQudGFyZ2V0LmVycm9yfWApKTsKICAgICAgICAgICAgfTsKICAgICAgICAgICAgdHJhbnNhY3Rpb24ub25hYm9ydCA9IChldmVudCkgPT4gewogICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVHJhbnNhY3Rpb24gYWJvcnRlZCBmb3IgZ2V0SXRlbSgke2lkfSk6ICR7ZXZlbnQudGFyZ2V0LmVycm9yfWApKTsKICAgICAgICAgICAgfTsKICAgICAgICAgICAgLy8gUGVyZm9ybSB0aGUgcmVxdWVzdCB3aXRoaW4gdGhlIHRyYW5zYWN0aW9uCiAgICAgICAgICAgIGNvbnN0IHN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUodGhpcy5zdG9yZU5hbWUpOwogICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gc3RvcmUuZ2V0KGlkKTsKICAgICAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7CiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcXVlc3QucmVzdWx0IHx8IG51bGwpOwogICAgICAgICAgICB9OwogICAgICAgIH0pOwogICAgfQogICAgLyoqCiAgICAgKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgZGF0YWJhc2UKICAgICAqIEBwYXJhbSBpZCBUaGUgaWRlbnRpZmllciBvZiB0aGUgaXRlbSB0byByZW1vdmUKICAgICAqLwogICAgYXN5bmMgZGVsZXRlSXRlbShpZCkgewogICAgICAgIGlmICghdGhpcy5kYikgewogICAgICAgICAgICBhd2FpdCB0aGlzLmluaXQoKTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHsKICAgICAgICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSB0aGlzLmRiLnRyYW5zYWN0aW9uKHRoaXMuc3RvcmVOYW1lLCAncmVhZHdyaXRlJyk7CiAgICAgICAgICAgIC8vIEhhbmRsZSB0cmFuc2F0aW9uCiAgICAgICAgICAgIHRyYW5zYWN0aW9uLm9uY29tcGxldGUgPSAoKSA9PiB7CiAgICAgICAgICAgICAgICByZXNvbHZlKCk7CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHRyYW5zYWN0aW9uLm9uZXJyb3IgPSAoZXZlbnQpID0+IHsKICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFRyYW5zYWN0aW9uIGVycm9yIGZvciBkZWxldGVJdGVtKCR7aWR9KTogJHtldmVudC50YXJnZXQuZXJyb3J9YCkpOwogICAgICAgICAgICB9OwogICAgICAgICAgICB0cmFuc2FjdGlvbi5vbmFib3J0ID0gKGV2ZW50KSA9PiB7CiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBUcmFuc2FjdGlvbiBhYm9ydGVkIGZvciBkZWxldGVJdGVtKCR7aWR9KTogJHtldmVudC50YXJnZXQuZXJyb3J9YCkpOwogICAgICAgICAgICB9OwogICAgICAgICAgICAvLyBQZXJmb3JtIHRoZSByZXF1ZXN0IHdpdGhpbiB0aGUgdHJhbnNhY3Rpb24KICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZSh0aGlzLnN0b3JlTmFtZSk7CiAgICAgICAgICAgIHN0b3JlLmRlbGV0ZShpZCk7CiAgICAgICAgfSk7CiAgICB9CiAgICAvKioKICAgICAqIENsZWFycyBhbGwgaXRlbXMgZnJvbSB0aGUgZGF0YWJhc2UKICAgICAqLwogICAgYXN5bmMgY2xlYXIoKSB7CiAgICAgICAgaWYgKCF0aGlzLmRiKSB7CiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdCgpOwogICAgICAgIH0KICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gewogICAgICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IHRoaXMuZGIudHJhbnNhY3Rpb24odGhpcy5zdG9yZU5hbWUsICdyZWFkd3JpdGUnKTsKICAgICAgICAgICAgLy8gSGFuZGxlIHRyYW5zYXRpb24KICAgICAgICAgICAgdHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9ICgpID0+IHsKICAgICAgICAgICAgICAgIHJlc29sdmUoKTsKICAgICAgICAgICAgfTsKICAgICAgICAgICAgdHJhbnNhY3Rpb24ub25lcnJvciA9IChldmVudCkgPT4gewogICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVHJhbnNhY3Rpb24gZXJyb3IgZm9yIGNsZWFyKCk6ICR7ZXZlbnQudGFyZ2V0LmVycm9yfWApKTsKICAgICAgICAgICAgfTsKICAgICAgICAgICAgdHJhbnNhY3Rpb24ub25hYm9ydCA9IChldmVudCkgPT4gewogICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgVHJhbnNhY3Rpb24gYWJvcnRlZCBmb3IgY2xlYXIoKTogJHtldmVudC50YXJnZXQuZXJyb3J9YCkpOwogICAgICAgICAgICB9OwogICAgICAgICAgICAvLyBQZXJmb3JtIHRoZSByZXF1ZXN0IHdpdGhpbiB0aGUgdHJhbnNhY3Rpb24KICAgICAgICAgICAgY29uc3Qgc3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZSh0aGlzLnN0b3JlTmFtZSk7CiAgICAgICAgICAgIHN0b3JlLmNsZWFyKCk7CiAgICAgICAgfSk7CiAgICB9CiAgICAvKioKICAgICAqIENsb3NlcyB0aGUgZGF0YWJhc2UgY29ubmVjdGlvbgogICAgICovCiAgICBjbG9zZSgpIHsKICAgICAgICBpZiAodGhpcy5kYikgewogICAgICAgICAgICB0aGlzLmRiLmNsb3NlKCk7CiAgICAgICAgICAgIHRoaXMuZGIgPSBudWxsOwogICAgICAgIH0KICAgIH0KfQoKdmFyIFJlZnJlc2hNZXNzYWdlVHlwZXM7CihmdW5jdGlvbiAoUmVmcmVzaE1lc3NhZ2VUeXBlcykgewogICAgUmVmcmVzaE1lc3NhZ2VUeXBlc1siU0NIRURVTEUiXSA9ICJTQ0hFRFVMRSI7CiAgICBSZWZyZXNoTWVzc2FnZVR5cGVzWyJSRUZSRVNIIl0gPSAiUkVGUkVTSCI7CiAgICBSZWZyZXNoTWVzc2FnZVR5cGVzWyJTVE9QIl0gPSAiU1RPUCI7CiAgICBSZWZyZXNoTWVzc2FnZVR5cGVzWyJESVNDT05ORUNUIl0gPSAiRElTQ09OTkVDVCI7CiAgICBSZWZyZXNoTWVzc2FnZVR5cGVzWyJUT0tFTl9ERVRBSUxTIl0gPSAiVE9LRU5fREVUQUlMUyI7CiAgICBSZWZyZXNoTWVzc2FnZVR5cGVzWyJFUlJPUl9PTl9SRUZSRVNIIl0gPSAiRVJST1JfT05fUkVGUkVTSCI7CiAgICBSZWZyZXNoTWVzc2FnZVR5cGVzWyJFWFBJUkVEIl0gPSAiRVhQSVJFRCI7Cn0pKFJlZnJlc2hNZXNzYWdlVHlwZXMgfHwgKFJlZnJlc2hNZXNzYWdlVHlwZXMgPSB7fSkpOwoKLy8gQSBTZXQgdG8gc3RvcmUgYWxsIGNvbm5lY3RlZCBwb3J0cyAodGFicykKY29uc3QgcG9ydHMgPSBuZXcgU2V0KCk7CmNvbnN0IGJyb2FkY2FzdCA9IChtZXNzYWdlKSA9PiB7CiAgICBmb3IgKGNvbnN0IHAgb2YgcG9ydHMpIHsKICAgICAgICBwLnBvc3RNZXNzYWdlKG1lc3NhZ2UpOwogICAgfQp9OwpsZXQgcmVmcmVzaGVyOwpzZWxmLm9uY29ubmVjdCA9IChldmVudCkgPT4gewogICAgY29uc3QgcG9ydCA9IGV2ZW50LnBvcnRzWzBdOwogICAgcG9ydHMuYWRkKHBvcnQpOwogICAgLy8gbGF6eSBpbml0CiAgICBpZiAoIXJlZnJlc2hlcikgewogICAgICAgIHJlZnJlc2hlciA9IG5ldyBSZWZyZXNoZXIoYnJvYWRjYXN0LCBuZXcgU2Vzc2lvbklEQigpKTsKICAgIH0KICAgIC8vIGhhbmRsZSBtZXNzYWdlcwogICAgcG9ydC5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHsKICAgICAgICBjb25zdCB7IHR5cGUsIHBheWxvYWQgfSA9IGV2ZW50LmRhdGE7CiAgICAgICAgc3dpdGNoICh0eXBlKSB7CiAgICAgICAgICAgIGNhc2UgUmVmcmVzaE1lc3NhZ2VUeXBlcy5TQ0hFRFVMRToKICAgICAgICAgICAgICAgIHJlZnJlc2hlci5oYW5kbGVTY2hlZHVsZShwYXlsb2FkKTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlIFJlZnJlc2hNZXNzYWdlVHlwZXMuUkVGUkVTSDoKICAgICAgICAgICAgICAgIHJlZnJlc2hlci5oYW5kbGVSZWZyZXNoKHBvcnQpOwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGNhc2UgUmVmcmVzaE1lc3NhZ2VUeXBlcy5TVE9QOgogICAgICAgICAgICAgICAgcmVmcmVzaGVyLmhhbmRsZVN0b3AoKTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlIFJlZnJlc2hNZXNzYWdlVHlwZXMuRElTQ09OTkVDVDoKICAgICAgICAgICAgICAgIHBvcnRzLmRlbGV0ZShwb3J0KTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgIH07CiAgICBwb3J0Lm9ubWVzc2FnZWVycm9yID0gKCkgPT4gcG9ydHMuZGVsZXRlKHBvcnQpOwogICAgcG9ydC5zdGFydCgpOwp9OwpjbGFzcyBSZWZyZXNoZXIgewogICAgdG9rZW5EZXRhaWxzOwogICAgZXhwOwogICAgcmVmcmVzaFRpbWVvdXQ7CiAgICBmaW5hbExvZ291dFRpbWVvdXQ7CiAgICB0aW1lcnNBcmVSdW5uaW5nID0gZmFsc2U7CiAgICBicm9hZGNhc3Q7CiAgICBkYXRhYmFzZTsKICAgIHJlZnJlc2hQcm9taXNlOwogICAgY29uc3RydWN0b3IoYnJvYWRjYXN0LCBkYXRhYmFzZSkgewogICAgICAgIHRoaXMuYnJvYWRjYXN0ID0gYnJvYWRjYXN0OwogICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYXRhYmFzZTsKICAgIH0KICAgIGFzeW5jIGhhbmRsZVNjaGVkdWxlKHRva2VuRGV0YWlscykgewogICAgICAgIHRoaXMudG9rZW5EZXRhaWxzID0gdG9rZW5EZXRhaWxzOwogICAgICAgIHRoaXMuZXhwID0gZGVjb2RlSnd0KHRoaXMudG9rZW5EZXRhaWxzLmFjY2Vzc190b2tlbikuZXhwOwogICAgICAgIHRoaXMuYnJvYWRjYXN0KHsKICAgICAgICAgICAgdHlwZTogUmVmcmVzaE1lc3NhZ2VUeXBlcy5UT0tFTl9ERVRBSUxTLAogICAgICAgICAgICBwYXlsb2FkOiB7IHRva2VuRGV0YWlsczogdGhpcy50b2tlbkRldGFpbHMgfQogICAgICAgIH0pOwogICAgICAgIGNvbnNvbGUubG9nKGBbUmVmcmVzaFdvcmtlcl0gU2NoZWR1bGluZyB0aW1lcnMsIGV4cGlyeSBpbiAke3RoaXMudG9rZW5EZXRhaWxzLmV4cGlyZXNfaW59c2ApOwogICAgICAgIHRoaXMuc2NoZWR1bGVUaW1lcnModGhpcy50b2tlbkRldGFpbHMuZXhwaXJlc19pbik7CiAgICAgICAgdGhpcy50aW1lcnNBcmVSdW5uaW5nID0gdHJ1ZTsKICAgIH0KICAgIGFzeW5jIGhhbmRsZVJlZnJlc2gocmVxdWVzdGluZ1BvcnQpIHsKICAgICAgICBpZiAodGhpcy50b2tlbkRldGFpbHMgJiYgdGhpcy5leHAgJiYgIXRoaXMuaXNUb2tlbkV4cGlyZWQodGhpcy5leHApKSB7CiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbUmVmcmVzaFdvcmtlcl0gUHJvdmlkaW5nIGN1cnJlbnQgdG9rZW5zYCk7CiAgICAgICAgICAgIHJlcXVlc3RpbmdQb3J0LnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgIHR5cGU6IFJlZnJlc2hNZXNzYWdlVHlwZXMuVE9LRU5fREVUQUlMUywKICAgICAgICAgICAgICAgIHBheWxvYWQ6IHsgdG9rZW5EZXRhaWxzOiB0aGlzLnRva2VuRGV0YWlscyB9CiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlIHsKICAgICAgICAgICAgY29uc29sZS5sb2coYFtSZWZyZXNoV29ya2VyXSBSZWZyZXNoaW5nIHRva2Vuc2ApOwogICAgICAgICAgICB0aGlzLnBlcmZvcm1SZWZyZXNoKCk7CiAgICAgICAgfQogICAgfQogICAgaGFuZGxlU3RvcCgpIHsKICAgICAgICBpZiAoIXRoaXMudG9rZW5EZXRhaWxzKSB7CiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbUmVmcmVzaFdvcmtlcl0gUmVjZWl2ZWQgU1RPUCwgYmVpbmcgaWRsZScpOwogICAgICAgICAgICByZXR1cm47CiAgICAgICAgfQogICAgICAgIHRoaXMuYnJvYWRjYXN0KHsgdHlwZTogUmVmcmVzaE1lc3NhZ2VUeXBlcy5FWFBJUkVEIH0pOwogICAgICAgIHRoaXMudG9rZW5EZXRhaWxzID0gdW5kZWZpbmVkOwogICAgICAgIHRoaXMuZXhwID0gdW5kZWZpbmVkOwogICAgICAgIHRoaXMucmVmcmVzaFByb21pc2UgPSB1bmRlZmluZWQ7CiAgICAgICAgY29uc29sZS5sb2coJ1tSZWZyZXNoV29ya2VyXSBSZWNlaXZlZCBTVE9QLCBjbGVhcmluZyB0aW1lcnMnKTsKICAgICAgICB0aGlzLmNsZWFyQWxsVGltZXJzKCk7CiAgICB9CiAgICBhc3luYyBwZXJmb3JtUmVmcmVzaCgpIHsKICAgICAgICBpZiAodGhpcy5yZWZyZXNoUHJvbWlzZSkgewogICAgICAgICAgICBjb25zb2xlLmxvZygnW1JlZnJlc2hXb3JrZXJdIFJlZnJlc2ggYWxyZWFkeSBpbiBwcm9ncmVzcywgd2FpdGluZy4uLicpOwogICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZyZXNoUHJvbWlzZTsKICAgICAgICB9CiAgICAgICAgdGhpcy5yZWZyZXNoUHJvbWlzZSA9IHRoaXMuZG9SZWZyZXNoKCk7CiAgICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaFByb21pc2U7CiAgICB9CiAgICBhc3luYyBkb1JlZnJlc2goKSB7CiAgICAgICAgdHJ5IHsKICAgICAgICAgICAgdGhpcy50b2tlbkRldGFpbHMgPSBhd2FpdCByZW5ld1Rva2Vucyh0aGlzLmRhdGFiYXNlKTsKICAgICAgICAgICAgdGhpcy5leHAgPSBkZWNvZGVKd3QodGhpcy50b2tlbkRldGFpbHMuYWNjZXNzX3Rva2VuKS5leHA7CiAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0KHsKICAgICAgICAgICAgICAgIHR5cGU6IFJlZnJlc2hNZXNzYWdlVHlwZXMuVE9LRU5fREVUQUlMUywKICAgICAgICAgICAgICAgIHBheWxvYWQ6IHsgdG9rZW5EZXRhaWxzOiB0aGlzLnRva2VuRGV0YWlscyB9CiAgICAgICAgICAgIH0pOwogICAgICAgICAgICBjb25zb2xlLmxvZyhgW1JlZnJlc2hXb3JrZXJdIFRva2VuIHJlZnJlc2hlZGApOwogICAgICAgICAgICBjb25zb2xlLmxvZyhgW1JlZnJlc2hXb3JrZXJdIFNjaGVkdWxpbmcgdGltZXJzLCBleHBpcnkgaW4gJHt0aGlzLnRva2VuRGV0YWlscy5leHBpcmVzX2lufXNgKTsKICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVRpbWVycyh0aGlzLnRva2VuRGV0YWlscy5leHBpcmVzX2luKTsKICAgICAgICB9CiAgICAgICAgY2F0Y2ggKGVycm9yKSB7CiAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0KHsKICAgICAgICAgICAgICAgIHR5cGU6IFJlZnJlc2hNZXNzYWdlVHlwZXMuRVJST1JfT05fUkVGUkVTSCwKICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvci5tZXNzYWdlCiAgICAgICAgICAgIH0pOwogICAgICAgICAgICBjb25zb2xlLmxvZyhgW1JlZnJlc2hXb3JrZXJdYCwgZXJyb3IubWVzc2FnZSk7CiAgICAgICAgfQogICAgICAgIGZpbmFsbHkgewogICAgICAgICAgICB0aGlzLnJlZnJlc2hQcm9taXNlID0gdW5kZWZpbmVkOwogICAgICAgIH0KICAgIH0KICAgIGNsZWFyQWxsVGltZXJzKCkgewogICAgICAgIGlmICh0aGlzLnJlZnJlc2hUaW1lb3V0KQogICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5yZWZyZXNoVGltZW91dCk7CiAgICAgICAgaWYgKHRoaXMuZmluYWxMb2dvdXRUaW1lb3V0KQogICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5maW5hbExvZ291dFRpbWVvdXQpOwogICAgICAgIHRoaXMudGltZXJzQXJlUnVubmluZyA9IGZhbHNlOwogICAgfQogICAgc2NoZWR1bGVUaW1lcnMoZXhwaXJlc0luKSB7CiAgICAgICAgdGhpcy5jbGVhckFsbFRpbWVycygpOwogICAgICAgIHRoaXMudGltZXJzQXJlUnVubmluZyA9IHRydWU7CiAgICAgICAgY29uc3QgZXhwaXJlc0luTXMgPSBleHBpcmVzSW4gKiAxMDAwOwogICAgICAgIGNvbnN0IFJFRlJFU0hfVEhSRVNIT0xEX1JBVElPID0gMC44OwogICAgICAgIGNvbnN0IE1JTklNVU1fUkVGUkVTSF9CVUZGRVJfTVMgPSAzMCAqIDEwMDA7CiAgICAgICAgY29uc3QgdGltZVVudGlsUmVmcmVzaCA9IFJFRlJFU0hfVEhSRVNIT0xEX1JBVElPICogZXhwaXJlc0luTXM7CiAgICAgICAgaWYgKHRpbWVVbnRpbFJlZnJlc2ggPiBNSU5JTVVNX1JFRlJFU0hfQlVGRkVSX01TKSB7CiAgICAgICAgICAgIHRoaXMucmVmcmVzaFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGVyZm9ybVJlZnJlc2goKSwgdGltZVVudGlsUmVmcmVzaCk7CiAgICAgICAgfQogICAgICAgIGNvbnN0IExPR09VVF9XQVJOSU5HX0JVRkZFUl9NUyA9IDUgKiAxMDAwOwogICAgICAgIGNvbnN0IHRpbWVVbnRpbExvZ291dCA9IGV4cGlyZXNJbk1zIC0gTE9HT1VUX1dBUk5JTkdfQlVGRkVSX01TOwogICAgICAgIHRoaXMuZmluYWxMb2dvdXRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7CiAgICAgICAgICAgIHRoaXMudG9rZW5EZXRhaWxzID0gdW5kZWZpbmVkOwogICAgICAgICAgICB0aGlzLmJyb2FkY2FzdCh7IHR5cGU6IFJlZnJlc2hNZXNzYWdlVHlwZXMuRVhQSVJFRCB9KTsKICAgICAgICB9LCB0aW1lVW50aWxMb2dvdXQpOwogICAgfQogICAgaXNUb2tlbkV4cGlyZWQoZXhwLCBidWZmZXJTZWNvbmRzID0gMCkgewogICAgICAgIGlmICh0eXBlb2YgZXhwICE9PSAnbnVtYmVyJyB8fCBpc05hTihleHApKSB7CiAgICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgIH0KICAgICAgICBjb25zdCBjdXJyZW50VGltZVNlY29uZHMgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTsKICAgICAgICByZXR1cm4gZXhwIDwgKGN1cnJlbnRUaW1lU2Vjb25kcyArIGJ1ZmZlclNlY29uZHMpOwogICAgfQogICAgc2V0VG9rZW5EZXRhaWxzKHRva2VuRGV0YWlscykgewogICAgICAgIHRoaXMudG9rZW5EZXRhaWxzID0gdG9rZW5EZXRhaWxzOwogICAgfQogICAgLy8gRm9yIHRlc3RpbmcKICAgIGdldFRpbWVyc0FyZVJ1bm5pbmcoKSB7IHJldHVybiB0aGlzLnRpbWVyc0FyZVJ1bm5pbmc7IH0KICAgIGdldFRva2VuRGV0YWlscygpIHsgcmV0dXJuIHRoaXMudG9rZW5EZXRhaWxzOyB9Cn0KCmV4cG9ydCB7IFJlZnJlc2hlciB9Owo=", "" + import.meta.url), $a;
(function(e) {
	e.SCHEDULE = "SCHEDULE", e.REFRESH = "REFRESH", e.STOP = "STOP", e.DISCONNECT = "DISCONNECT", e.TOKEN_DETAILS = "TOKEN_DETAILS", e.ERROR_ON_REFRESH = "ERROR_ON_REFRESH", e.EXPIRED = "EXPIRED";
})($a ||= {});
var eo = class {
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
}, to = class extends Za {
	worker;
	constructor(e, t) {
		let n = new eo(), r = {
			...t,
			database: n
		};
		super(e, r);
		let i = t?.workerUrl ?? Qa();
		this.worker = new SharedWorker(i, { type: "module" }), this.worker.port.onmessage = (e) => {
			this.handleWorkerMessage(e.data).catch(console.error);
		}, window.addEventListener("beforeunload", () => {
			this.worker.port.postMessage({ type: $a.DISCONNECT });
		});
	}
	async handleWorkerMessage(e) {
		let { type: t, payload: n, error: r } = e;
		switch (t) {
			case $a.TOKEN_DETAILS:
				let e = this.isActive;
				await this.setTokenDetails(n.tokenDetails), e !== this.isActive && this.dispatchStateChangeEvent(), this.refreshPromise && this.resolveRefresh && (this.resolveRefresh(), this.clearRefreshPromise());
				break;
			case $a.ERROR_ON_REFRESH:
				this.isActive && this.dispatchExpirationWarningEvent(), this.refreshPromise && this.rejectRefresh && (this.isActive ? this.rejectRefresh(Error(r || "Token refresh failed")) : this.rejectRefresh(/* @__PURE__ */ Error("No session to restore")), this.clearRefreshPromise());
				break;
			case $a.EXPIRED:
				this.isActive && (this.dispatchExpirationEvent(), await this.logout()), this.refreshPromise && this.rejectRefresh && (this.rejectRefresh(Error(r || "Token refresh failed")), this.clearRefreshPromise());
				break;
		}
	}
	async handleRedirectFromLogin() {
		await super.handleRedirectFromLogin(), this.isActive && this.worker.port.postMessage({
			type: $a.SCHEDULE,
			payload: {
				...this.getTokenDetails(),
				expires_in: this.getExpiresIn()
			}
		});
	}
	async restore() {
		return this.refreshPromise ? this.refreshPromise : (this.refreshPromise = new Promise((e, t) => {
			this.resolveRefresh = e, this.rejectRefresh = t;
		}), this.worker.port.postMessage({ type: $a.REFRESH }), this.refreshPromise);
	}
	async logout() {
		this.worker.port.postMessage({ type: $a.STOP }), await super.logout();
	}
}, no = /* @__PURE__ */ t({
	SessionCore: () => dc,
	SessionEvents: () => uc
}), ro = crypto, io = (e) => e instanceof CryptoKey, ao = async (e, t) => {
	let n = `SHA-${e.slice(-3)}`;
	return new Uint8Array(await ro.subtle.digest(n, t));
}, oo = new TextEncoder(), so = new TextDecoder();
function co(...e) {
	let t = e.reduce((e, { length: t }) => e + t, 0), n = new Uint8Array(t), r = 0;
	for (let t of e) n.set(t, r), r += t.length;
	return n;
}
var lo = (e) => {
	let t = e;
	typeof t == "string" && (t = oo.encode(t));
	let n = 32768, r = [];
	for (let e = 0; e < t.length; e += n) r.push(String.fromCharCode.apply(null, t.subarray(e, e + n)));
	return btoa(r.join(""));
}, uo = (e) => lo(e).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"), fo = (e) => {
	let t = atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
	return n;
}, po = (e) => {
	let t = e;
	t instanceof Uint8Array && (t = so.decode(t)), t = t.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
	try {
		return fo(t);
	} catch {
		throw TypeError("The input to be decoded is not correctly encoded.");
	}
}, mo = class extends Error {
	constructor(e, t) {
		super(e, t), this.code = "ERR_JOSE_GENERIC", this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
	}
};
mo.code = "ERR_JOSE_GENERIC";
var ho = class extends mo {
	constructor(e, t, n = "unspecified", r = "unspecified") {
		super(e, { cause: {
			claim: n,
			reason: r,
			payload: t
		} }), this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED", this.claim = n, this.reason = r, this.payload = t;
	}
};
ho.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
var go = class extends mo {
	constructor(e, t, n = "unspecified", r = "unspecified") {
		super(e, { cause: {
			claim: n,
			reason: r,
			payload: t
		} }), this.code = "ERR_JWT_EXPIRED", this.claim = n, this.reason = r, this.payload = t;
	}
};
go.code = "ERR_JWT_EXPIRED";
var _o = class extends mo {
	constructor() {
		super(...arguments), this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
	}
};
_o.code = "ERR_JOSE_ALG_NOT_ALLOWED";
var vo = class extends mo {
	constructor() {
		super(...arguments), this.code = "ERR_JOSE_NOT_SUPPORTED";
	}
};
vo.code = "ERR_JOSE_NOT_SUPPORTED";
var yo = class extends mo {
	constructor(e = "decryption operation failed", t) {
		super(e, t), this.code = "ERR_JWE_DECRYPTION_FAILED";
	}
};
yo.code = "ERR_JWE_DECRYPTION_FAILED";
var bo = class extends mo {
	constructor() {
		super(...arguments), this.code = "ERR_JWE_INVALID";
	}
};
bo.code = "ERR_JWE_INVALID";
var xo = class extends mo {
	constructor() {
		super(...arguments), this.code = "ERR_JWS_INVALID";
	}
};
xo.code = "ERR_JWS_INVALID";
var So = class extends mo {
	constructor() {
		super(...arguments), this.code = "ERR_JWT_INVALID";
	}
};
So.code = "ERR_JWT_INVALID";
var Co = class extends mo {
	constructor() {
		super(...arguments), this.code = "ERR_JWK_INVALID";
	}
};
Co.code = "ERR_JWK_INVALID";
var wo = class extends mo {
	constructor() {
		super(...arguments), this.code = "ERR_JWKS_INVALID";
	}
};
wo.code = "ERR_JWKS_INVALID";
var To = class extends mo {
	constructor(e = "no applicable key found in the JSON Web Key Set", t) {
		super(e, t), this.code = "ERR_JWKS_NO_MATCHING_KEY";
	}
};
To.code = "ERR_JWKS_NO_MATCHING_KEY";
var Eo = class extends mo {
	constructor(e = "multiple matching keys found in the JSON Web Key Set", t) {
		super(e, t), this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
	}
};
Eo.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
var Do = class extends mo {
	constructor(e = "request timed out", t) {
		super(e, t), this.code = "ERR_JWKS_TIMEOUT";
	}
};
Do.code = "ERR_JWKS_TIMEOUT";
var Oo = class extends mo {
	constructor(e = "signature verification failed", t) {
		super(e, t), this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
	}
};
Oo.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
function ko(e, t = "algorithm.name") {
	return /* @__PURE__ */ TypeError(`CryptoKey does not support this operation, its ${t} must be ${e}`);
}
function Ao(e, t) {
	return e.name === t;
}
function jo(e) {
	return parseInt(e.name.slice(4), 10);
}
function Mo(e) {
	switch (e) {
		case "ES256": return "P-256";
		case "ES384": return "P-384";
		case "ES512": return "P-521";
		default: throw Error("unreachable");
	}
}
function No(e, t) {
	if (t.length && !t.some((t) => e.usages.includes(t))) {
		let e = "CryptoKey does not support this operation, its usages must include ";
		if (t.length > 2) {
			let n = t.pop();
			e += `one of ${t.join(", ")}, or ${n}.`;
		} else t.length === 2 ? e += `one of ${t[0]} or ${t[1]}.` : e += `${t[0]}.`;
		throw TypeError(e);
	}
}
function Po(e, t, ...n) {
	switch (t) {
		case "HS256":
		case "HS384":
		case "HS512": {
			if (!Ao(e.algorithm, "HMAC")) throw ko("HMAC");
			let n = parseInt(t.slice(2), 10);
			if (jo(e.algorithm.hash) !== n) throw ko(`SHA-${n}`, "algorithm.hash");
			break;
		}
		case "RS256":
		case "RS384":
		case "RS512": {
			if (!Ao(e.algorithm, "RSASSA-PKCS1-v1_5")) throw ko("RSASSA-PKCS1-v1_5");
			let n = parseInt(t.slice(2), 10);
			if (jo(e.algorithm.hash) !== n) throw ko(`SHA-${n}`, "algorithm.hash");
			break;
		}
		case "PS256":
		case "PS384":
		case "PS512": {
			if (!Ao(e.algorithm, "RSA-PSS")) throw ko("RSA-PSS");
			let n = parseInt(t.slice(2), 10);
			if (jo(e.algorithm.hash) !== n) throw ko(`SHA-${n}`, "algorithm.hash");
			break;
		}
		case "EdDSA":
			if (e.algorithm.name !== "Ed25519" && e.algorithm.name !== "Ed448") throw ko("Ed25519 or Ed448");
			break;
		case "Ed25519":
			if (!Ao(e.algorithm, "Ed25519")) throw ko("Ed25519");
			break;
		case "ES256":
		case "ES384":
		case "ES512": {
			if (!Ao(e.algorithm, "ECDSA")) throw ko("ECDSA");
			let n = Mo(t);
			if (e.algorithm.namedCurve !== n) throw ko(n, "algorithm.namedCurve");
			break;
		}
		default: throw TypeError("CryptoKey does not support this operation");
	}
	No(e, n);
}
function Fo(e, t, ...n) {
	if (n = n.filter(Boolean), n.length > 2) {
		let t = n.pop();
		e += `one of type ${n.join(", ")}, or ${t}.`;
	} else n.length === 2 ? e += `one of type ${n[0]} or ${n[1]}.` : e += `of type ${n[0]}.`;
	return t == null ? e += ` Received ${t}` : typeof t == "function" && t.name ? e += ` Received function ${t.name}` : typeof t == "object" && t && t.constructor?.name && (e += ` Received an instance of ${t.constructor.name}`), e;
}
var Io = (e, ...t) => Fo("Key must be ", e, ...t);
function Lo(e, t, ...n) {
	return Fo(`Key for the ${e} algorithm must be `, t, ...n);
}
var Ro = (e) => io(e) ? !0 : e?.[Symbol.toStringTag] === "KeyObject", zo = ["CryptoKey"], Bo = (...e) => {
	let t = e.filter(Boolean);
	if (t.length === 0 || t.length === 1) return !0;
	let n;
	for (let e of t) {
		let t = Object.keys(e);
		if (!n || n.size === 0) {
			n = new Set(t);
			continue;
		}
		for (let e of t) {
			if (n.has(e)) return !1;
			n.add(e);
		}
	}
	return !0;
};
function Vo(e) {
	return typeof e == "object" && !!e;
}
function Ho(e) {
	if (!Vo(e) || Object.prototype.toString.call(e) !== "[object Object]") return !1;
	if (Object.getPrototypeOf(e) === null) return !0;
	let t = e;
	for (; Object.getPrototypeOf(t) !== null;) t = Object.getPrototypeOf(t);
	return Object.getPrototypeOf(e) === t;
}
var Uo = (e, t) => {
	if (e.startsWith("RS") || e.startsWith("PS")) {
		let { modulusLength: n } = t.algorithm;
		if (typeof n != "number" || n < 2048) throw TypeError(`${e} requires key modulusLength to be 2048 bits or larger`);
	}
};
function Wo(e) {
	return Ho(e) && typeof e.kty == "string";
}
function Go(e) {
	return e.kty !== "oct" && typeof e.d == "string";
}
function Ko(e) {
	return e.kty !== "oct" && e.d === void 0;
}
function qo(e) {
	return Wo(e) && e.kty === "oct" && typeof e.k == "string";
}
function Jo(e) {
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
				default: throw new vo("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
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
				default: throw new vo("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
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
				default: throw new vo("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			}
			break;
		default: throw new vo("Invalid or unsupported JWK \"kty\" (Key Type) Parameter value");
	}
	return {
		algorithm: t,
		keyUsages: n
	};
}
var Yo = async (e) => {
	if (!e.alg) throw TypeError("\"alg\" argument is required when \"jwk.alg\" is not present");
	let { algorithm: t, keyUsages: n } = Jo(e), r = [
		t,
		e.ext ?? !1,
		e.key_ops ?? n
	], i = { ...e };
	return delete i.alg, delete i.use, ro.subtle.importKey("jwk", i, ...r);
}, Xo = (e) => po(e), Zo, Qo, $o = (e) => e?.[Symbol.toStringTag] === "KeyObject", es = async (e, t, n, r, i = !1) => {
	let a = e.get(t);
	if (a?.[r]) return a[r];
	let o = await Yo({
		...n,
		alg: r
	});
	return i && Object.freeze(t), a ? a[r] = o : e.set(t, { [r]: o }), o;
}, ts = {
	normalizePublicKey: (e, t) => {
		if ($o(e)) {
			let n = e.export({ format: "jwk" });
			return delete n.d, delete n.dp, delete n.dq, delete n.p, delete n.q, delete n.qi, n.k ? Xo(n.k) : (Qo ||= /* @__PURE__ */ new WeakMap(), es(Qo, e, n, t));
		}
		return Wo(e) ? e.k ? po(e.k) : (Qo ||= /* @__PURE__ */ new WeakMap(), es(Qo, e, e, t, !0)) : e;
	},
	normalizePrivateKey: (e, t) => {
		if ($o(e)) {
			let n = e.export({ format: "jwk" });
			return n.k ? Xo(n.k) : (Zo ||= /* @__PURE__ */ new WeakMap(), es(Zo, e, n, t));
		}
		return Wo(e) ? e.k ? po(e.k) : (Zo ||= /* @__PURE__ */ new WeakMap(), es(Zo, e, e, t, !0)) : e;
	}
};
async function ns(e, t) {
	if (!Ho(e)) throw TypeError("JWK must be an object");
	switch (t ||= e.alg, e.kty) {
		case "oct":
			if (typeof e.k != "string" || !e.k) throw TypeError("missing \"k\" (Key Value) Parameter value");
			return po(e.k);
		case "RSA": if ("oth" in e && e.oth !== void 0) throw new vo("RSA JWK \"oth\" (Other Primes Info) Parameter value is not supported");
		case "EC":
		case "OKP": return Yo({
			...e,
			alg: t
		});
		default: throw new vo("Unsupported \"kty\" (Key Type) Parameter value");
	}
}
var rs = (e) => e?.[Symbol.toStringTag], is = (e, t, n) => {
	if (t.use !== void 0 && t.use !== "sig") throw TypeError("Invalid key for this operation, when present its use must be sig");
	if (t.key_ops !== void 0 && t.key_ops.includes?.(n) !== !0) throw TypeError(`Invalid key for this operation, when present its key_ops must include ${n}`);
	if (t.alg !== void 0 && t.alg !== e) throw TypeError(`Invalid key for this operation, when present its alg must be ${e}`);
	return !0;
}, as = (e, t, n, r) => {
	if (!(t instanceof Uint8Array)) {
		if (r && Wo(t)) {
			if (qo(t) && is(e, t, n)) return;
			throw TypeError("JSON Web Key for symmetric algorithms must have JWK \"kty\" (Key Type) equal to \"oct\" and the JWK \"k\" (Key Value) present");
		}
		if (!Ro(t)) throw TypeError(Lo(e, t, ...zo, "Uint8Array", r ? "JSON Web Key" : null));
		if (t.type !== "secret") throw TypeError(`${rs(t)} instances for symmetric algorithms must be of type "secret"`);
	}
}, os = (e, t, n, r) => {
	if (r && Wo(t)) switch (n) {
		case "sign":
			if (Go(t) && is(e, t, n)) return;
			throw TypeError("JSON Web Key for this operation be a private JWK");
		case "verify":
			if (Ko(t) && is(e, t, n)) return;
			throw TypeError("JSON Web Key for this operation be a public JWK");
	}
	if (!Ro(t)) throw TypeError(Lo(e, t, ...zo, r ? "JSON Web Key" : null));
	if (t.type === "secret") throw TypeError(`${rs(t)} instances for asymmetric algorithms must not be of type "secret"`);
	if (n === "sign" && t.type === "public") throw TypeError(`${rs(t)} instances for asymmetric algorithm signing must be of type "private"`);
	if (n === "decrypt" && t.type === "public") throw TypeError(`${rs(t)} instances for asymmetric algorithm decryption must be of type "private"`);
	if (t.algorithm && n === "verify" && t.type === "private") throw TypeError(`${rs(t)} instances for asymmetric algorithm verifying must be of type "public"`);
	if (t.algorithm && n === "encrypt" && t.type === "private") throw TypeError(`${rs(t)} instances for asymmetric algorithm encryption must be of type "public"`);
};
function ss(e, t, n, r) {
	t.startsWith("HS") || t === "dir" || t.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(t) ? as(t, n, r, e) : os(t, n, r, e);
}
ss.bind(void 0, !1);
var cs = ss.bind(void 0, !0);
function ls(e, t, n, r, i) {
	if (i.crit !== void 0 && r?.crit === void 0) throw new e("\"crit\" (Critical) Header Parameter MUST be integrity protected");
	if (!r || r.crit === void 0) return /* @__PURE__ */ new Set();
	if (!Array.isArray(r.crit) || r.crit.length === 0 || r.crit.some((e) => typeof e != "string" || e.length === 0)) throw new e("\"crit\" (Critical) Header Parameter MUST be an array of non-empty strings when present");
	let a;
	a = n === void 0 ? t : new Map([...Object.entries(n), ...t.entries()]);
	for (let t of r.crit) {
		if (!a.has(t)) throw new vo(`Extension Header Parameter "${t}" is not recognized`);
		if (i[t] === void 0) throw new e(`Extension Header Parameter "${t}" is missing`);
		if (a.get(t) && r[t] === void 0) throw new e(`Extension Header Parameter "${t}" MUST be integrity protected`);
	}
	return new Set(r.crit);
}
var us = (e, t) => {
	if (t !== void 0 && (!Array.isArray(t) || t.some((e) => typeof e != "string"))) throw TypeError(`"${e}" option must be an array of strings`);
	if (t) return new Set(t);
}, ds = async (e) => {
	if (e instanceof Uint8Array) return {
		kty: "oct",
		k: uo(e)
	};
	if (!io(e)) throw TypeError(Io(e, ...zo, "Uint8Array"));
	if (!e.extractable) throw TypeError("non-extractable CryptoKey cannot be exported as a JWK");
	let { ext: t, key_ops: n, alg: r, use: i, ...a } = await ro.subtle.exportKey("jwk", e);
	return a;
};
async function fs(e) {
	return ds(e);
}
function ps(e, t) {
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
		default: throw new vo(`alg ${e} is not supported either by JOSE or your javascript runtime`);
	}
}
async function ms(e, t, n) {
	if (n === "sign" && (t = await ts.normalizePrivateKey(t, e)), n === "verify" && (t = await ts.normalizePublicKey(t, e)), io(t)) return Po(t, e, n), t;
	if (t instanceof Uint8Array) {
		if (!e.startsWith("HS")) throw TypeError(Io(t, ...zo));
		return ro.subtle.importKey("raw", t, {
			hash: `SHA-${e.slice(-3)}`,
			name: "HMAC"
		}, !1, [n]);
	}
	throw TypeError(Io(t, ...zo, "Uint8Array", "JSON Web Key"));
}
var hs = async (e, t, n, r) => {
	let i = await ms(e, t, "verify");
	Uo(e, i);
	let a = ps(e, i.algorithm);
	try {
		return await ro.subtle.verify(a, i, n, r);
	} catch {
		return !1;
	}
};
async function gs(e, t, n) {
	if (!Ho(e)) throw new xo("Flattened JWS must be an object");
	if (e.protected === void 0 && e.header === void 0) throw new xo("Flattened JWS must have either of the \"protected\" or \"header\" members");
	if (e.protected !== void 0 && typeof e.protected != "string") throw new xo("JWS Protected Header incorrect type");
	if (e.payload === void 0) throw new xo("JWS Payload missing");
	if (typeof e.signature != "string") throw new xo("JWS Signature missing or incorrect type");
	if (e.header !== void 0 && !Ho(e.header)) throw new xo("JWS Unprotected Header incorrect type");
	let r = {};
	if (e.protected) try {
		let t = po(e.protected);
		r = JSON.parse(so.decode(t));
	} catch {
		throw new xo("JWS Protected Header is invalid");
	}
	if (!Bo(r, e.header)) throw new xo("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
	let i = {
		...r,
		...e.header
	}, a = ls(xo, /* @__PURE__ */ new Map([["b64", !0]]), n?.crit, r, i), o = !0;
	if (a.has("b64") && (o = r.b64, typeof o != "boolean")) throw new xo("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
	let { alg: s } = i;
	if (typeof s != "string" || !s) throw new xo("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
	let c = n && us("algorithms", n.algorithms);
	if (c && !c.has(s)) throw new _o("\"alg\" (Algorithm) Header Parameter value not allowed");
	if (o) {
		if (typeof e.payload != "string") throw new xo("JWS Payload must be a string");
	} else if (typeof e.payload != "string" && !(e.payload instanceof Uint8Array)) throw new xo("JWS Payload must be a string or an Uint8Array instance");
	let l = !1;
	typeof t == "function" ? (t = await t(r, e), l = !0, cs(s, t, "verify"), Wo(t) && (t = await ns(t, s))) : cs(s, t, "verify");
	let u = co(oo.encode(e.protected ?? ""), oo.encode("."), typeof e.payload == "string" ? oo.encode(e.payload) : e.payload), d;
	try {
		d = po(e.signature);
	} catch {
		throw new xo("Failed to base64url decode the signature");
	}
	if (!await hs(s, t, d, u)) throw new Oo();
	let f;
	if (o) try {
		f = po(e.payload);
	} catch {
		throw new xo("Failed to base64url decode the payload");
	}
	else f = typeof e.payload == "string" ? oo.encode(e.payload) : e.payload;
	let p = { payload: f };
	return e.protected !== void 0 && (p.protectedHeader = r), e.header !== void 0 && (p.unprotectedHeader = e.header), l ? {
		...p,
		key: t
	} : p;
}
async function _s(e, t, n) {
	if (e instanceof Uint8Array && (e = so.decode(e)), typeof e != "string") throw new xo("Compact JWS must be a string or Uint8Array");
	let { 0: r, 1: i, 2: a, length: o } = e.split(".");
	if (o !== 3) throw new xo("Invalid Compact JWS");
	let s = await gs({
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
var vs = (e) => Math.floor(e.getTime() / 1e3), ys = 60, bs = ys * 60, xs = bs * 24, Ss = xs * 7, Cs = xs * 365.25, ws = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, Ts = (e) => {
	let t = ws.exec(e);
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
			i = Math.round(n * ys);
			break;
		case "hour":
		case "hours":
		case "hr":
		case "hrs":
		case "h":
			i = Math.round(n * bs);
			break;
		case "day":
		case "days":
		case "d":
			i = Math.round(n * xs);
			break;
		case "week":
		case "weeks":
		case "w":
			i = Math.round(n * Ss);
			break;
		default:
			i = Math.round(n * Cs);
			break;
	}
	return t[1] === "-" || t[4] === "ago" ? -i : i;
}, Es = (e) => e.toLowerCase().replace(/^application\//, ""), Ds = (e, t) => typeof e == "string" ? t.includes(e) : Array.isArray(e) ? t.some(Set.prototype.has.bind(new Set(e))) : !1, Os = (e, t, n = {}) => {
	let r;
	try {
		r = JSON.parse(so.decode(t));
	} catch {}
	if (!Ho(r)) throw new So("JWT Claims Set must be a top-level JSON object");
	let { typ: i } = n;
	if (i && (typeof e.typ != "string" || Es(e.typ) !== Es(i))) throw new ho("unexpected \"typ\" JWT header value", r, "typ", "check_failed");
	let { requiredClaims: a = [], issuer: o, subject: s, audience: c, maxTokenAge: l } = n, u = [...a];
	l !== void 0 && u.push("iat"), c !== void 0 && u.push("aud"), s !== void 0 && u.push("sub"), o !== void 0 && u.push("iss");
	for (let e of new Set(u.reverse())) if (!(e in r)) throw new ho(`missing required "${e}" claim`, r, e, "missing");
	if (o && !(Array.isArray(o) ? o : [o]).includes(r.iss)) throw new ho("unexpected \"iss\" claim value", r, "iss", "check_failed");
	if (s && r.sub !== s) throw new ho("unexpected \"sub\" claim value", r, "sub", "check_failed");
	if (c && !Ds(r.aud, typeof c == "string" ? [c] : c)) throw new ho("unexpected \"aud\" claim value", r, "aud", "check_failed");
	let d;
	switch (typeof n.clockTolerance) {
		case "string":
			d = Ts(n.clockTolerance);
			break;
		case "number":
			d = n.clockTolerance;
			break;
		case "undefined":
			d = 0;
			break;
		default: throw TypeError("Invalid clockTolerance option type");
	}
	let { currentDate: f } = n, p = vs(f || /* @__PURE__ */ new Date());
	if ((r.iat !== void 0 || l) && typeof r.iat != "number") throw new ho("\"iat\" claim must be a number", r, "iat", "invalid");
	if (r.nbf !== void 0) {
		if (typeof r.nbf != "number") throw new ho("\"nbf\" claim must be a number", r, "nbf", "invalid");
		if (r.nbf > p + d) throw new ho("\"nbf\" claim timestamp check failed", r, "nbf", "check_failed");
	}
	if (r.exp !== void 0) {
		if (typeof r.exp != "number") throw new ho("\"exp\" claim must be a number", r, "exp", "invalid");
		if (r.exp <= p - d) throw new go("\"exp\" claim timestamp check failed", r, "exp", "check_failed");
	}
	if (l) {
		let e = p - r.iat, t = typeof l == "number" ? l : Ts(l);
		if (e - d > t) throw new go("\"iat\" claim timestamp check failed (too far in the past)", r, "iat", "check_failed");
		if (e < 0 - d) throw new ho("\"iat\" claim timestamp check failed (it should be in the past)", r, "iat", "check_failed");
	}
	return r;
};
async function ks(e, t, n) {
	let r = await _s(e, t, n);
	if (r.protectedHeader.crit?.includes("b64") && r.protectedHeader.b64 === !1) throw new So("JWTs MUST NOT use unencoded payload");
	let i = {
		payload: Os(r.protectedHeader, r.payload, n),
		protectedHeader: r.protectedHeader
	};
	return typeof t == "function" ? {
		...i,
		key: r.key
	} : i;
}
var As = async (e, t, n) => {
	let r = await ms(e, t, "sign");
	Uo(e, r);
	let i = await ro.subtle.sign(ps(e, r.algorithm), r, n);
	return new Uint8Array(i);
}, js = class {
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
		if (!this._protectedHeader && !this._unprotectedHeader) throw new xo("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
		if (!Bo(this._protectedHeader, this._unprotectedHeader)) throw new xo("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
		let n = {
			...this._protectedHeader,
			...this._unprotectedHeader
		}, r = ls(xo, /* @__PURE__ */ new Map([["b64", !0]]), t?.crit, this._protectedHeader, n), i = !0;
		if (r.has("b64") && (i = this._protectedHeader.b64, typeof i != "boolean")) throw new xo("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
		let { alg: a } = n;
		if (typeof a != "string" || !a) throw new xo("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
		cs(a, e, "sign");
		let o = this._payload;
		i && (o = oo.encode(uo(o)));
		let s;
		s = this._protectedHeader ? oo.encode(uo(JSON.stringify(this._protectedHeader))) : oo.encode("");
		let c = {
			signature: uo(await As(a, e, co(s, oo.encode("."), o))),
			payload: ""
		};
		return i && (c.payload = so.decode(o)), this._unprotectedHeader && (c.header = this._unprotectedHeader), this._protectedHeader && (c.protected = so.decode(s)), c;
	}
}, Ms = class {
	constructor(e) {
		this._flattened = new js(e);
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
function Ns(e, t) {
	if (!Number.isFinite(t)) throw TypeError(`Invalid ${e} input`);
	return t;
}
var Ps = class {
	constructor(e = {}) {
		if (!Ho(e)) throw TypeError("JWT Claims Set MUST be an object");
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
		return typeof e == "number" ? this._payload = {
			...this._payload,
			nbf: Ns("setNotBefore", e)
		} : e instanceof Date ? this._payload = {
			...this._payload,
			nbf: Ns("setNotBefore", vs(e))
		} : this._payload = {
			...this._payload,
			nbf: vs(/* @__PURE__ */ new Date()) + Ts(e)
		}, this;
	}
	setExpirationTime(e) {
		return typeof e == "number" ? this._payload = {
			...this._payload,
			exp: Ns("setExpirationTime", e)
		} : e instanceof Date ? this._payload = {
			...this._payload,
			exp: Ns("setExpirationTime", vs(e))
		} : this._payload = {
			...this._payload,
			exp: vs(/* @__PURE__ */ new Date()) + Ts(e)
		}, this;
	}
	setIssuedAt(e) {
		return e === void 0 ? this._payload = {
			...this._payload,
			iat: vs(/* @__PURE__ */ new Date())
		} : e instanceof Date ? this._payload = {
			...this._payload,
			iat: Ns("setIssuedAt", vs(e))
		} : typeof e == "string" ? this._payload = {
			...this._payload,
			iat: Ns("setIssuedAt", vs(/* @__PURE__ */ new Date()) + Ts(e))
		} : this._payload = {
			...this._payload,
			iat: Ns("setIssuedAt", e)
		}, this;
	}
}, Fs = class extends Ps {
	setProtectedHeader(e) {
		return this._protectedHeader = e, this;
	}
	async sign(e, t) {
		let n = new Ms(oo.encode(JSON.stringify(this._payload)));
		if (n.setProtectedHeader(this._protectedHeader), Array.isArray(this._protectedHeader?.crit) && this._protectedHeader.crit.includes("b64") && this._protectedHeader.b64 === !1) throw new So("JWTs MUST NOT use unencoded payload");
		return n.sign(e, t);
	}
}, Is = (e, t) => {
	if (typeof e != "string" || !e) throw new Co(`${t} missing or invalid`);
};
async function Ls(e, t) {
	if (!Ho(e)) throw TypeError("JWK must be an object");
	if (t ??= "sha256", t !== "sha256" && t !== "sha384" && t !== "sha512") throw TypeError("digestAlgorithm must one of \"sha256\", \"sha384\", or \"sha512\"");
	let n;
	switch (e.kty) {
		case "EC":
			Is(e.crv, "\"crv\" (Curve) Parameter"), Is(e.x, "\"x\" (X Coordinate) Parameter"), Is(e.y, "\"y\" (Y Coordinate) Parameter"), n = {
				crv: e.crv,
				kty: e.kty,
				x: e.x,
				y: e.y
			};
			break;
		case "OKP":
			Is(e.crv, "\"crv\" (Subtype of Key Pair) Parameter"), Is(e.x, "\"x\" (Public Key) Parameter"), n = {
				crv: e.crv,
				kty: e.kty,
				x: e.x
			};
			break;
		case "RSA":
			Is(e.e, "\"e\" (Exponent) Parameter"), Is(e.n, "\"n\" (Modulus) Parameter"), n = {
				e: e.e,
				kty: e.kty,
				n: e.n
			};
			break;
		case "oct":
			Is(e.k, "\"k\" (Key Value) Parameter"), n = {
				k: e.k,
				kty: e.kty
			};
			break;
		default: throw new vo("\"kty\" (Key Type) Parameter missing or unsupported");
	}
	let r = oo.encode(JSON.stringify(n));
	return uo(await ao(t, r));
}
function Rs(e) {
	switch (typeof e == "string" && e.slice(0, 2)) {
		case "RS":
		case "PS": return "RSA";
		case "ES": return "EC";
		case "Ed": return "OKP";
		default: throw new vo("Unsupported \"alg\" value for a JSON Web Key Set");
	}
}
function zs(e) {
	return e && typeof e == "object" && Array.isArray(e.keys) && e.keys.every(Bs);
}
function Bs(e) {
	return Ho(e);
}
function Vs(e) {
	return typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}
var Hs = class {
	constructor(e) {
		if (this._cached = /* @__PURE__ */ new WeakMap(), !zs(e)) throw new wo("JSON Web Key Set malformed");
		this._jwks = Vs(e);
	}
	async getKey(e, t) {
		let { alg: n, kid: r } = {
			...e,
			...t?.header
		}, i = Rs(n), a = this._jwks.keys.filter((e) => {
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
				case "EdDSA":
					t = e.crv === "Ed25519" || e.crv === "Ed448";
					break;
			}
			return t;
		}), { 0: o, length: s } = a;
		if (s === 0) throw new To();
		if (s !== 1) {
			let e = new Eo(), { _cached: t } = this;
			throw e[Symbol.asyncIterator] = async function* () {
				for (let e of a) try {
					yield await Us(t, e, n);
				} catch {}
			}, e;
		}
		return Us(this._cached, o, n);
	}
};
async function Us(e, t, n) {
	let r = e.get(t) || e.set(t, {}).get(t);
	if (r[n] === void 0) {
		let e = await ns({
			...t,
			ext: !0
		}, n);
		if (e instanceof Uint8Array || e.type !== "public") throw new wo("JSON Web Key Set members must be public keys");
		r[n] = e;
	}
	return r[n];
}
function Ws(e) {
	let t = new Hs(e), n = async (e, n) => t.getKey(e, n);
	return Object.defineProperties(n, { jwks: {
		value: () => Vs(t._jwks),
		enumerable: !0,
		configurable: !1,
		writable: !1
	} }), n;
}
var Gs = async (e, t, n) => {
	let r, i, a = !1;
	typeof AbortController == "function" && (r = new AbortController(), i = setTimeout(() => {
		a = !0, r.abort();
	}, t));
	let o = await fetch(e.href, {
		signal: r ? r.signal : void 0,
		redirect: "manual",
		headers: n.headers
	}).catch((e) => {
		throw a ? new Do() : e;
	});
	if (i !== void 0 && clearTimeout(i), o.status !== 200) throw new mo("Expected 200 OK from the JSON Web Key Set HTTP response");
	try {
		return await o.json();
	} catch {
		throw new mo("Failed to parse the JSON Web Key Set HTTP response as JSON");
	}
};
function Ks() {
	return typeof WebSocketPair < "u" || typeof navigator < "u" && navigator.userAgent === "Cloudflare-Workers" || typeof EdgeRuntime < "u" && EdgeRuntime === "vercel";
}
var qs;
(typeof navigator > "u" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) && (qs = "jose/v5.10.0");
var Js = Symbol();
function Ys(e, t) {
	return !(typeof e != "object" || !e || !("uat" in e) || typeof e.uat != "number" || Date.now() - e.uat >= t || !("jwks" in e) || !Ho(e.jwks) || !Array.isArray(e.jwks.keys) || !Array.prototype.every.call(e.jwks.keys, Ho));
}
var Xs = class {
	constructor(e, t) {
		if (!(e instanceof URL)) throw TypeError("url must be an instance of URL");
		this._url = new URL(e.href), this._options = {
			agent: t?.agent,
			headers: t?.headers
		}, this._timeoutDuration = typeof t?.timeoutDuration == "number" ? t?.timeoutDuration : 5e3, this._cooldownDuration = typeof t?.cooldownDuration == "number" ? t?.cooldownDuration : 3e4, this._cacheMaxAge = typeof t?.cacheMaxAge == "number" ? t?.cacheMaxAge : 6e5, t?.[Js] !== void 0 && (this._cache = t?.[Js], Ys(t?.[Js], this._cacheMaxAge) && (this._jwksTimestamp = this._cache.uat, this._local = Ws(this._cache.jwks)));
	}
	coolingDown() {
		return typeof this._jwksTimestamp == "number" && Date.now() < this._jwksTimestamp + this._cooldownDuration;
	}
	fresh() {
		return typeof this._jwksTimestamp == "number" && Date.now() < this._jwksTimestamp + this._cacheMaxAge;
	}
	async getKey(e, t) {
		(!this._local || !this.fresh()) && await this.reload();
		try {
			return await this._local(e, t);
		} catch (n) {
			if (n instanceof To && this.coolingDown() === !1) return await this.reload(), this._local(e, t);
			throw n;
		}
	}
	async reload() {
		this._pendingFetch && Ks() && (this._pendingFetch = void 0);
		let e = new Headers(this._options.headers);
		qs && !e.has("User-Agent") && (e.set("User-Agent", qs), this._options.headers = Object.fromEntries(e.entries())), this._pendingFetch ||= Gs(this._url, this._timeoutDuration, this._options).then((e) => {
			this._local = Ws(e), this._cache && (this._cache.uat = Date.now(), this._cache.jwks = e), this._jwksTimestamp = Date.now(), this._pendingFetch = void 0;
		}).catch((e) => {
			throw this._pendingFetch = void 0, e;
		}), await this._pendingFetch;
	}
};
function Zs(e, t) {
	let n = new Xs(e, t), r = async (e, t) => n.getKey(e, t);
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
var Qs = po;
function $s(e) {
	if (typeof e != "string") throw new So("JWTs must use Compact JWS serialization, JWT must be a string");
	let { 1: t, length: n } = e.split(".");
	if (n === 5) throw new So("Only JWTs using Compact JWS serialization can be decoded");
	if (n !== 3) throw new So("Invalid JWT");
	if (!t) throw new So("JWTs must contain a payload");
	let r;
	try {
		r = Qs(t);
	} catch {
		throw new So("Failed to base64url decode the payload");
	}
	let i;
	try {
		i = JSON.parse(so.decode(r));
	} catch {
		throw new So("Failed to parse the decoded payload as JSON");
	}
	if (!Ho(i)) throw new So("Invalid JWT Claims Set");
	return i;
}
function ec(e) {
	let t = e?.modulusLength ?? 2048;
	if (typeof t != "number" || t < 2048) throw new vo("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
	return t;
}
async function tc(e, t) {
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
				modulusLength: ec(t)
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
				modulusLength: ec(t)
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
				modulusLength: ec(t)
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
				default: throw new vo("Invalid or unsupported crv option provided");
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
				default: throw new vo("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, X25519, and X448");
			}
			break;
		}
		default: throw new vo("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
	}
	return ro.subtle.generateKey(n, t?.extractable ?? !1, r);
}
async function nc(e, t) {
	return tc(e, t);
}
var rc = async (e, t) => {
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
}, ic = async (e, t, n) => {
	let r = new URL(t), i = r.origin + r.pathname + r.search, a = new URL(e).origin, o = await fetch(`${a}/.well-known/openid-configuration`).then((e) => {
		if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
		return e.json();
	}), s = o.issuer, c = (e) => e.endsWith("/") ? e.slice(0, -1) : e;
	if (c(e) !== c(s)) throw Error("RFC 9207 - iss !== idp - " + s + " !== " + e);
	sessionStorage.setItem("idp", s), sessionStorage.setItem("token_endpoint", o.token_endpoint), sessionStorage.setItem("jwks_uri", o.jwks_uri);
	let l = n?.client_id;
	if (!l) {
		let e = o.registration_endpoint;
		l = (await rc(e, n ?? { redirect_uris: [i] }).then((e) => {
			if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
			return e.json();
		})).client_id;
	}
	try {
		new URL(l);
	} catch {
		sessionStorage.setItem("client_id", l);
	}
	let { pkce_code_verifier: u, pkce_code_challenge: d } = await ac();
	sessionStorage.setItem("pkce_code_verifier", u);
	let f = window.crypto.randomUUID();
	sessionStorage.setItem("csrf_token", f);
	let p = o.authorization_endpoint + `?response_type=code&redirect_uri=${encodeURIComponent(i)}&scope=openid offline_access webid&client_id=${encodeURIComponent(l)}&code_challenge_method=S256&code_challenge=${d}&state=${f}&prompt=consent`;
	window.location.href = p;
}, ac = async () => {
	let e = window.crypto.randomUUID() + "-" + window.crypto.randomUUID(), t = new Uint8Array(await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(e)));
	return {
		pkce_code_verifier: e,
		pkce_code_challenge: btoa(String.fromCharCode(...t)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
	};
}, oc = async (e, t) => {
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
	let c = await nc("ES256"), l = await sc(r, a, n.toString(), o, s, c).then((e) => {
		if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
		return e.json();
	}), u = l.access_token, d = sessionStorage.getItem("jwks_uri");
	if (d === null) throw Error("Access Token validation preparation - Could not find in sessionStorage: jwks_uri");
	let { payload: f } = await ks(u, Zs(new URL(d)), {
		issuer: i,
		audience: "solid"
	}), p = await Ls(await fs(c.publicKey));
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
}, sc = async (e, t, n, r, i, a) => {
	let o = await fs(a.publicKey);
	o.alg = "ES256";
	let s = await new Fs({
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
}, cc = async (e) => {
	try {
		await e.init();
		let t = await e.getItem("client_id"), n = await e.getItem("token_endpoint"), r = await e.getItem("dpop_keypair"), i = await e.getItem("refresh_token");
		if (t === null || n === null || r === null || i === null) throw Error("Could not refresh tokens: details missing from database.");
		let a = await lc(i, t, n, r).then((e) => {
			if (!e.ok) throw Error(`HTTP error! Status: ${e.status}`);
			return e.json();
		}), o = a.access_token, s = await e.getItem("idp");
		if (s === null) throw Error("Access Token validation preparation - Could not find in sessionDatabase: idp");
		let c = await e.getItem("jwks_uri");
		if (c === null) throw Error("Access Token validation preparation - Could not find in sessionDatabase: jwks_uri");
		let { payload: l } = await ks(o, Zs(new URL(c)), {
			issuer: s,
			audience: "solid"
		}), u = await Ls(await fs(r.publicKey));
		if (l.cnf.jkt !== u) throw Error("Access Token validation failed on `jkt`: jkt !== DPoP thumbprint - " + l.cnf.jkt + " !== " + u);
		if (l.client_id !== t) throw Error("Access Token validation failed on `client_id`: JWT payload !== client_id - " + l.client_id + " !== " + t);
		return await e.setItem("refresh_token", a.refresh_token), {
			...a,
			dpop_key_pair: r
		};
	} finally {
		e.close();
	}
}, lc = async (e, t, n, r) => {
	let i = await fs(r.publicKey);
	i.alg = "ES256";
	let a = await new Fs({
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
}, uc;
(function(e) {
	e.STATE_CHANGE = "sessionStateChange", e.EXPIRATION_WARNING = "sessionExpirationWarning", e.EXPIRATION = "sessionExpiration";
})(uc ||= {});
var dc = class extends EventTarget {
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
		super(), this.authFetch = this.authFetch.bind(this), this.information = { clientDetails: e }, this.database = t?.database, t?.onSessionStateChange && this.addEventListener(uc.STATE_CHANGE, (e) => t.onSessionStateChange?.(e)), t?.onSessionExpirationWarning && this.addEventListener(uc.EXPIRATION_WARNING, (e) => t?.onSessionExpirationWarning?.(e)), t?.onSessionExpiration && this.addEventListener(uc.EXPIRATION, (e) => t?.onSessionExpiration?.(e));
	}
	async login(e, t) {
		await ic(e, t, this.information.clientDetails);
	}
	async handleRedirectFromLogin() {
		let e = await oc(this.information.clientDetails, this.database);
		e.tokenDetails && (this.information.clientDetails = e.clientDetails, this.information.idpDetails = e.idpDetails, await this.setTokenDetails(e.tokenDetails), this.dispatchStateChangeEvent());
	}
	async restore() {
		if (!this.database) throw Error("Could not refresh tokens: missing database. Provide database in sessionOption.");
		if (this.refreshPromise) return this.refreshPromise;
		this.refreshPromise = new Promise((e, t) => {
			this.resolveRefresh = e, this.rejectRefresh = t;
		});
		let e = this.isActive;
		return cc(this.database).then((e) => this.setTokenDetails(e)).then(() => this.resolveRefresh()).catch((e) => {
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
		let t = await fs(this.information.tokenDetails.dpop_key_pair.publicKey);
		return new Fs(e).setIssuedAt().setJti(window.crypto.randomUUID()).setProtectedHeader({
			alg: "ES256",
			typ: "dpop+jwt",
			jwk: t
		}).sign(this.information.tokenDetails.dpop_key_pair.privateKey);
	}
	async _updateSessionDetailsFromToken(e) {
		if (!e) {
			await this.logout();
			return;
		}
		try {
			let t = $s(e), n = t.webid;
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
		this.dispatchEvent(new CustomEvent(uc.STATE_CHANGE, { detail: {
			isActive: this.isActive,
			webId: this.webId
		} }));
	}
	dispatchExpirationWarningEvent() {
		this.dispatchEvent(new CustomEvent(uc.EXPIRATION_WARNING, { detail: { expires_in: this.getExpiresIn() } }));
	}
	dispatchExpirationEvent() {
		this.dispatchEvent(new CustomEvent(uc.EXPIRATION));
	}
}, fc = { 386(e) {
	let t = {
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
	function n(e = { namedNode: (e) => e }) {
		let n = {};
		for (let r in t) {
			let i = t[r];
			n[r] = function(t = "") {
				return e.namedNode(i + t);
			};
		}
		return n;
	}
	e.exports = n;
} }, pc = {};
function mc(e) {
	var t = pc[e];
	if (t !== void 0) return t.exports;
	var n = pc[e] = { exports: {} };
	return fc[e](n, n.exports, mc), n.exports;
}
mc.n = (e) => {
	var t = e && e.__esModule ? () => e.default : () => e;
	return mc.d(t, { a: t }), t;
}, mc.d = (e, t) => {
	for (var n in t) mc.o(t, n) && !mc.o(e, n) && Object.defineProperty(e, n, {
		enumerable: !0,
		get: t[n]
	});
}, mc.g = (function() {
	if (typeof globalThis == "object") return globalThis;
	try {
		return this || Function("return this")();
	} catch {
		if (typeof window == "object") return window;
	}
})(), mc.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
function hc(...e) {
	console.log(...e);
}
function gc(...e) {
	console.warn(...e);
}
var _c = no, vc = class {
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
}, yc = class {
	constructor() {
		this.db = null, this.dbName = "soidc", this.storeName = "session", this.dbVersion = 1;
	}
	async shouldPreserveExistingRefreshToken(e, t) {
		if (e !== "refresh_token" || !(t == null || t === "")) return !1;
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
function bc() {
	let e = _c, t = e.SessionCore ?? e.default?.SessionCore ?? e.default;
	return typeof t == "function" ? t : null;
}
var xc = bc();
function Sc() {
	if (typeof window < "u" && (() => {
		let e = window.location.hostname;
		return e === "localhost" || e === "127.0.0.1" || e.endsWith(".localhost");
	})()) return xc ? new xc(void 0, { database: new yc() }) : new to();
	try {
		return new to();
	} catch (e) {
		console.warn("solid-logic: falling back to non-worker auth session:", e);
		try {
			return xc ? new xc(void 0, { database: new yc() }) : new to();
		} catch (e) {
			return console.warn("solid-logic: IndexedDB unavailable, using in-memory session database:", e), xc ? new xc(void 0, { database: new vc() }) : new to();
		}
	}
}
var Cc = Sc();
async function wc(e) {
	try {
		let t = new URL(e), n = new URL("/.well-known/openid-configuration", t.origin), r = await fetch(n.toString(), { credentials: "include" });
		if (!r.ok) return null;
		let i = await r.json();
		return typeof i?.issuer != "string" || !i.issuer ? null : i.issuer.replace(/\/$/, "");
	} catch {
		return null;
	}
}
async function Tc(e) {
	return await wc(e) || e;
}
var Ec = class {
	constructor() {
		this.listeners = /* @__PURE__ */ new Map();
	}
	on(e, t) {
		this.listeners.has(e) || this.listeners.set(e, /* @__PURE__ */ new Set()), this.listeners.get(e).add(t);
	}
	off(e, t) {
		var n;
		(n = this.listeners.get(e)) == null || n.delete(t);
	}
	emit(e, ...t) {
		var n;
		(n = this.listeners.get(e)) == null || n.forEach((e) => e(...t));
	}
}, Dc = Cc, Oc = typeof Dc.login == "function" ? Dc.login.bind(Cc) : void 0;
Oc && (Dc.login = async (e, t) => {
	if (e && typeof e == "object" && !Array.isArray(e)) {
		let t = e.oidcIssuer ?? e.idp ?? e.issuer, n = e.redirectUrl ?? e.redirect_uri ?? e.redirectUri;
		if (typeof t == "string" && typeof n == "string") return Oc(await Tc(t), n);
	}
	return Oc(typeof e == "string" ? await Tc(e) : e, t);
});
var kc = new Ec(), Ac = Cc.isActive ?? !!Cc.webId;
typeof Cc.addEventListener == "function" && Cc.addEventListener("sessionStateChange", () => {
	let e = Cc.isActive ?? !!Cc.webId;
	Ac && !e && kc.emit("logout"), Ac = e;
});
var jc = Object.assign(Cc, { events: kc }), $ = Tr, Mc = mc(386), Nc = (/* @__PURE__ */ mc.n(Mc))()($), Pc = (0, $.sym)("http://www.iana.org/assignments/link-relations/acl");
function Fc(e) {
	let t = Nc;
	async function n(t) {
		await e.fetcher.load(t);
		let n = e.any(t, Pc);
		if (!n) throw Error(`No ACL link discovered for ${t}`);
		return n.value;
	}
	function r(t, n, r) {
		let o = e.any(e.sym(t), Pc);
		return Promise.resolve().then(() => o || i(t).catch((e) => {
			throw Error(`Error fetching rel=ACL header for ${t}: ${e}`);
		})).then((i) => {
			let o = a(t, n, i.uri, r);
			if (!e.fetcher) throw Error("Cannot PUT this, store has no fetcher");
			return e.fetcher.webOperation("PUT", i.uri, {
				data: o,
				contentType: "text/turtle"
			}).then((e) => {
				if (!e.ok) throw Error("Error writing ACL text: " + e.error);
				return i;
			});
		});
	}
	function i(t) {
		let n = e.fetcher;
		if (!n) throw Error("Cannot fetch ACL rel, store has no fetcher");
		return n.load(t).then((n) => {
			if (!n.ok) throw Error("fetchACLRel: While loading:" + n.error);
			let r = e.any(e.sym(t), Pc);
			if (!r) throw Error("fetchACLRel: No Link rel=ACL header for " + t);
			return r;
		});
	}
	function a(e, n, r, i = {}) {
		let a = i.public || [], o = (0, $.graph)(), s = (0, $.Namespace)("http://www.w3.org/ns/auth/acl#"), c = o.sym(`${r}#a1`), l = o.sym(r), u = o.sym(e);
		if (o.add(c, t.rdf("type"), s("Authorization"), l), o.add(c, s("accessTo"), u, l), i.defaultForNew && o.add(c, s("default"), u, l), o.add(c, s("agent"), n, l), o.add(c, s("mode"), s("Read"), l), o.add(c, s("mode"), s("Write"), l), o.add(c, s("mode"), s("Control"), l), a.length) {
			c = o.sym(`${r}#a2`), o.add(c, t.rdf("type"), s("Authorization"), l), o.add(c, s("accessTo"), u, l), o.add(c, s("agentClass"), t.foaf("Agent"), l);
			for (let e = 0; e < a.length; e++) o.add(c, s("mode"), s(a[e]), l);
		}
		return (0, $.serialize)(l, o, r);
	}
	return {
		findAclDocUrl: n,
		setACLUserPublic: r,
		genACLText: a
	};
}
var Ic = () => {
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
function Lc() {
	let { $SolidTestEnvironment: e } = window;
	if (e !== void 0 && e.username) return hc("Assuming the user is " + e.username), (0, $.sym)(e.username);
	if (typeof document < "u" && document.location && ("" + document.location).slice(0, 16) === "http://localhost") {
		let e = document.getElementById("appTarget");
		if (!e) return null;
		let t = e.getAttribute("testID");
		return t ? (hc("Assuming user is " + t), (0, $.sym)(t)) : null;
	}
	return null;
}
var Rc = class {
	constructor(e) {
		this.checkUserInFlight = null, this.sessionRestoreHookAttached = !1, this.fallbackWebId = null, this.session = e;
	}
	get authSession() {
		return this.session;
	}
	currentUser() {
		let e = Ic();
		if (e.viewingNoAuthPage) return (0, $.sym)(e.webId);
		let t = this.session, n = t?.info?.webId, r = t?.webId, i = n || r || this.fallbackWebId, a = t?.info?.isLoggedIn, o = t?.isActive, s = a === !0 || o === !0 || a == null && o == null && !!i || !!this.fallbackWebId;
		return this && this.session && i && s ? (0, $.sym)(i) : Lc();
	}
	async checkUser(e) {
		let t = new URL(window.location.href).hash;
		t && window.localStorage.setItem("preLoginRedirectHash", t);
		let n = this.session;
		!this.sessionRestoreHookAttached && typeof n?.events?.on == "function" && (n.events.on("sessionRestore", (e) => {
			hc(`Session restored to ${e}`), document.location.toString() !== e && history.replaceState(null, "", e);
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
		var e, t;
		let n = this.session, r = new URL(window.location.href);
		if (r.hash = "", typeof n?.handleIncomingRedirect == "function") await n.handleIncomingRedirect({
			restorePreviousSession: !0,
			url: r.href
		});
		else {
			if (typeof n?.restore == "function") {
				let t = n?.isActive ?? !!n?.webId;
				try {
					await n.restore();
				} catch (e) {
					let t = e instanceof Error ? e.message : String(e);
					if (!/no session to restore/i.test(t)) throw e;
					hc("No previous session to restore");
				}
				let r = n?.isActive ?? !!n?.webId;
				!t && r && ((e = n.events) == null || e.emit("sessionRestore", window.location.href));
			}
			if (typeof n?.handleRedirectFromLogin == "function") {
				let e = n?.isActive ?? !!n?.webId;
				await n.handleRedirectFromLogin();
				let r = n?.isActive ?? !!n?.webId;
				!e && r && ((t = n.events) == null || t.emit("login"));
			}
		}
		let i = window.localStorage.getItem("preLoginRedirectHash");
		if (i) {
			let e = new URL(window.location.href);
			e.hash !== i && (history.pushState ? history.pushState(null, document.title, i) : location.hash = i, e.hash = i), window.localStorage.setItem("preLoginRedirectHash", "");
		}
		let a = Lc();
		if (a) return a;
		let o = this.webIdFromSession(n?.info, n);
		return o ||= await this.probeNssCookieBackedWebId(), o ? this.fallbackWebId = o : this.fallbackWebId = null, o && (a = this.saveUser(o)), a && hc(`(Logged in as ${a} by authentication)`), a;
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
			let r = (0, $.namedNode)(n);
			return t && (t.me = r), r;
		}
		return null;
	}
	webIdFromSession(e, t) {
		let n = e?.webId || t?.webId;
		if (!n) return null;
		let r = e?.isLoggedIn, i = t?.isLoggedIn, a = t?.isActive;
		return r === !0 || i === !0 || a === !0 ? n : r === !1 && i === !1 && a === !1 ? null : n;
	}
};
function zc(e) {
	return (0, $.sym)(e.uri + "#id" + ("" + Date.now()));
}
function Bc(e, t) {
	let n = t.getUTCFullYear(), r = ("0" + (t.getUTCMonth() + 1)).slice(-2), i = ("0" + t.getUTCDate()).slice(-2), a = e.split("/"), o = a[a.length - 1];
	return new URL(`./archive/${n}/${r}/${i}/${o}`, e).toString();
}
function Vc(e) {
	return !e || `${window.location.origin}/` !== new URL(e.value).origin;
}
function Hc(e) {
	let t = e.uri.replace("/profile/", "/").replace("/public/", "/").split("/").slice(0, -1).join("/") + "/settings/prefs.ttl";
	return (0, $.sym)(t);
}
function Uc(e, t) {
	let n = new URL(`IndividualChats/${new URL(e.value).host}/`, t.value).toString();
	return new $.NamedNode(n);
}
var Wc = "index.ttl#this";
function Gc(e, t) {
	let n = Nc;
	async function r(t, n, r) {
		await e.fetcher.load(t);
		let i = e.any(t, new $.NamedNode("http://www.iana.org/assignments/link-relations/acl"));
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
		let a = zc(i), o = [
			(0, $.st)(a, n.rdf("type"), n.solid("TypeRegistration"), i.doc()),
			(0, $.st)(a, n.solid("forClass"), n.meeting("LongChat"), i.doc()),
			(0, $.st)(a, n.solid("instance"), t, i.doc())
		];
		await new Promise((t, n) => {
			e.updater.update([], o, function(e, r, i) {
				r ? t(null) : n(Error(i));
			});
		});
	}
	async function a(n) {
		let r = await t.loadMe(), i = Uc(n, await t.getPodRoot(r)), a = !0;
		try {
			await e.fetcher.load(new $.NamedNode(i.value + "index.ttl#this"));
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
		let a = t.newInstance = t.newInstance || r.sym(t.newBase + Wc), o = a.doc();
		return r.add(a, n.rdf("type"), n.meeting("LongChat"), o), r.add(a, n.dc("title"), "Chat channel", o), r.add(a, n.dc("created"), (0, $.term)(new Date(Date.now())), o), t.me && r.add(a, n.dc("author"), t.me, o), new Promise(function(e, n) {
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
		if (c) return new $.NamedNode(s.value + Wc);
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
function Kc(e, t, n, r, i) {
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
		let i = Bc(t, n), a = {
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
var qc = class extends Error {
	constructor(e) {
		super(e), Object.setPrototypeOf(this, new.target.prototype), this.name = new.target.name;
	}
}, Jc = class extends qc {}, Yc = class extends qc {}, Xc = class extends qc {}, Zc = class extends qc {}, Qc = class extends qc {}, $c = class extends qc {
	constructor(e, t) {
		super(t), this.status = e;
	}
};
function el() {
	return [
		"@prefix solid: <http://www.w3.org/ns/solid/terms#>.",
		"<>",
		"    a solid:TypeIndex ;",
		"    a solid:ListedDocument."
	].join("\n");
}
function tl() {
	return [
		"@prefix solid: <http://www.w3.org/ns/solid/terms#>.",
		"<>",
		"    a solid:TypeIndex ;",
		"    a solid:UnlistedDocument."
	].join("\n");
}
function nl(e, t) {
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
function rl() {
	return [
		"@prefix dct: <http://purl.org/dc/terms/>.",
		"@prefix pim: <http://www.w3.org/ns/pim/space#>.",
		"@prefix solid: <http://www.w3.org/ns/solid/terms#>.",
		"<>",
		"    a pim:ConfigurationFile ;",
		"    dct:title \"Preferences file\"."
	].join("\n");
}
function il(e) {
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
function al(e) {
	function t(t) {
		return e.statementsMatching(t, (0, $.sym)("http://www.w3.org/ns/ldp#contains"), void 0).map((e) => e.object);
	}
	function n(e) {
		let t = e.value;
		return t.charAt(t.length - 1) === "/";
	}
	async function r(t) {
		if (!n((0, $.sym)(t))) throw Error(`Not a container URL ${t}`);
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
	async function i(n) {
		return await e.fetcher.load(n), t(n);
	}
	return {
		isContainer: n,
		createContainer: r,
		getContainerElements: t,
		getContainerMembers: i
	};
}
function ol(e, t, n) {
	let r = Nc, i = al(e), a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
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
		return (0, $.sym)(n + t);
	}
	function u(e) {
		if (e?.response?.status === 404) return !0;
		let t = `${e?.message || e || ""}`;
		return t.includes("404") || t.includes("Not Found");
	}
	async function d(t) {
		let n = (0, $.sym)(t);
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
		let i = (0, $.sym)(r), a;
		try {
			await e.fetcher.load(i), a = e.any(i, Pc)?.value;
		} catch (e) {
			if (!u(e)) throw e;
		}
		a ||= `${r}.acl`;
		let o = (0, $.sym)(a);
		try {
			await e.fetcher.load(o);
			return;
		} catch (e) {
			if (!u(e)) throw e;
		}
		await e.fetcher.webOperation("PUT", o.uri, {
			data: il(t.uri),
			contentType: "text/turtle"
		});
	}
	async function p(t, r, i = !1) {
		if (!await n.loadOrCreateWithContentOnCreate(r, el()) && !i) return;
		let a;
		try {
			await e.fetcher.load(r), a = e.any(r, Pc)?.value;
		} catch (e) {
			if (!u(e)) throw e;
		}
		a ||= `${r.uri}.acl`;
		let o = (0, $.sym)(a);
		try {
			await e.fetcher.webOperation("PUT", o.uri, {
				data: nl(t.uri, r.uri),
				contentType: "text/turtle",
				headers: { "If-None-Match": "*" }
			});
		} catch (e) {
			if ((e?.response?.status ?? e?.status) !== 412) throw e;
		}
	}
	async function m(e) {
		await n.loadOrCreateWithContentOnCreate(e, tl());
	}
	async function h(t, i) {
		let a = i.doc(), o = t.doc();
		await e.fetcher.load(a);
		let s = e.any(t, r.solid("publicTypeIndex"), null, o), c = e.any(t, r.solid("publicTypeIndex"), null, a), u = s || c || l(i, "publicTypeIndex.ttl"), d = e.any(t, r.solid("privateTypeIndex"), null, a) || l(i, "privateTypeIndex.ttl"), f = !s;
		f && await n.followOrCreateLinkWithContentOnCreate(t, r.solid("publicTypeIndex"), u, o, el());
		let h = [];
		e.holds(a, r.rdf("type"), r.space("ConfigurationFile"), a) || h.push((0, $.st)(a, r.rdf("type"), r.space("ConfigurationFile"), a)), e.holds(a, r.dct("title"), void 0, a) || h.push((0, $.st)(a, r.dct("title"), (0, $.literal)("Preferences file"), a)), e.holds(t, r.solid("publicTypeIndex"), u, a) || h.push((0, $.st)(t, r.solid("publicTypeIndex"), u, a)), e.holds(t, r.solid("privateTypeIndex"), d, a) || h.push((0, $.st)(t, r.solid("privateTypeIndex"), d, a)), h.length > 0 && (await e.updater.update([], h), await e.fetcher.load(a)), await p(t, u, f), await m(d);
	}
	async function g(e) {
		try {
			return !!await n.loadOrCreateWithContentOnCreate(e, rl());
		} catch (t) {
			throw t.response?.status === 401 ? new Jc() : t.response?.status === 403 ? Vc(e) ? new Yc() : new Xc() : t;
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
			let i = Hc(t), a;
			try {
				a = e.any(t, r.space("preferencesFile"), null, t.doc()) || await n.followOrCreateLink(t, r.space("preferencesFile"), i, t.doc()), await f(t, a), await g(a), await h(t, a);
			} catch (e) {
				throw gc(`User ${t} has no pointer in profile to preferences file.`), e instanceof Zc || e instanceof Qc || e instanceof Jc || e instanceof Yc || e instanceof Xc || e instanceof $c, e;
			}
			try {
				await e.fetcher.load(a);
			} catch (n) {
				let r = `Unable to load preference of user ${t}: ${n}`;
				if (n.response?.status === 404) return await f(t, a), await g(a), await h(t, a), await e.fetcher.load(a), a;
				throw gc(r), n.response.status === 401 ? new Jc() : n.response.status === 403 ? Vc(a) ? new Yc() : new Xc() : Error(r);
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
function sl(e, t, n, r) {
	let i = Nc;
	function a(e) {
		return !!e && (e.startsWith("https://") || e.startsWith("http://"));
	}
	function o(t, n) {
		return e.each(void 0, i.solid("instance"), t).filter((t) => e.holds(t, i.solid("forClass"), n));
	}
	async function s(t) {
		if (!t) throw Error("loadTypeIndexesFor: No user given");
		let a = await n.loadProfile(t), o = null;
		try {
			o = p(t);
		} catch {
			gc(`User ${t} has no usable profile document directory for publicTypeIndex.`);
		}
		let s;
		try {
			s = e.any(t, i.solid("publicTypeIndex"), void 0, a) || (o ? await r.followOrCreateLinkWithContentOnCreate(t, i.solid("publicTypeIndex"), o, a, el()) : null);
		} catch (e) {
			gc(`User ${t} has no pointer in profile to publicTypeIndex file: ${e}`);
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
			try {
				n = m(l);
			} catch {
				gc(`User ${t} has no usable preferences document directory for privateTypeIndex.`);
			}
			let o;
			try {
				o = e.any(t, i.solid("privateTypeIndex"), void 0, a) || (n ? await r.followOrCreateLinkWithContentOnCreate(t, i.solid("privateTypeIndex"), n, l, tl()) : null);
			} catch (e) {
				gc(`User ${t} has no pointer in preference file to privateTypeIndex file: ${e}`);
			}
			u = o ? [{
				label: "private",
				index: o,
				agent: t
			}] : [];
		} else u = [];
		let d = c.concat(u);
		if (d.length === 0) return d;
		let f = d.map((e) => e.index);
		try {
			await e.fetcher.load(f);
		} catch (e) {
			gc("Problems loading type index: ", e);
		}
		return d;
	}
	async function c(t) {
		let r;
		try {
			r = await n.silencedLoadPreferences(t);
		} catch {
			gc(`User ${t} has no pointer in profile to preferences file.`);
		}
		if (r) {
			let n = e.each(t, i.solid("community"), void 0, r).concat(e.each(t, i.solid("community"), void 0, t.doc())), o = [];
			for (let e of n) {
				if (e.termType !== "NamedNode" || !a(e.uri)) {
					gc(`Skipping malformed community node for ${t}: ${e}`);
					continue;
				}
				try {
					o = o.concat(await s(e));
				} catch (t) {
					gc(`Skipping community type indexes for ${e.uri}: ${t}`);
				}
			}
			return o;
		}
		return [];
	}
	async function l(e) {
		return (await s(e)).concat(await c(e));
	}
	async function u(e, t) {
		let n = await l(t), r = [];
		for (let t of n) {
			let n = await _(t, e);
			r = r.concat(n);
		}
		return r;
	}
	async function d(e) {
		let n = t.currentUser();
		if (!n) throw Error("getAppInstances: Must be logged in to find apps.");
		return (await u(e, n)).map((e) => e.instance);
	}
	function f(e) {
		let t = e.doc(), n = t.dir();
		if (n?.uri && a(n.uri)) return n.uri;
		let r = t.uri;
		if (!r || !a(r)) return hc(`docDirUri: missing or non-http(s) doc uri for ${e?.uri}`), null;
		let i = r.split("#")[0], o = i.lastIndexOf("/");
		return o === -1 ? (hc(`docDirUri: no slash in doc uri ${r}`), null) : i.slice(0, o + 1);
	}
	function p(e) {
		let t = f(e);
		if (!t) throw Error(`suggestPublicTypeIndex: Cannot derive directory for ${e.uri}`);
		return (0, $.sym)(t + "publicTypeIndex.ttl");
	}
	function m(e) {
		let t = f(e);
		if (!t) throw Error(`suggestPrivateTypeIndex: Cannot derive directory for ${e.uri}`);
		return (0, $.sym)(t + "privateTypeIndex.ttl");
	}
	async function h(t, n, r) {
		let a = zc(n), o = [
			(0, $.st)(a, i.rdf("type"), i.solid("TypeRegistration"), n),
			(0, $.st)(a, i.solid("forClass"), r, n),
			(0, $.st)(a, i.solid("instance"), t, n)
		];
		try {
			await e.updater.update([], o);
		} catch (e) {
			let r = `Unable to register ${t} in index ${n}: ${e}`;
			return console.warn(r), null;
		}
		return a;
	}
	async function g(t) {
		let n = e.the(null, i.solid("instance"), t.instance, t.scope.index);
		if (!n) throw Error(`deleteTypeIndexRegistration: No registration found for ${t.instance}`);
		let r = e.statementsMatching(n, null, null, t.scope.index);
		await e.updater.update(r, []);
	}
	async function _(t, n) {
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
					instance: (0, $.sym)(n.value),
					type: o,
					scope: t
				});
			}
		}
		return a;
	}
	return {
		registerInTypeIndex: h,
		getRegistrations: o,
		loadTypeIndexesFor: s,
		loadCommunityTypeIndexes: c,
		loadAllTypeIndexes: l,
		getScopedAppInstances: u,
		getAppInstances: d,
		suggestPublicTypeIndex: p,
		suggestPrivateTypeIndex: m,
		deleteTypeIndexRegistration: g,
		getScopedAppsFromIndex: _
	};
}
function cl(e, t, n) {
	async function r(i) {
		try {
			if (n.isContainer(i)) {
				let a = await t.findAclDocUrl(i);
				await e.fetcher._fetch(a, { method: "DELETE" });
				let o = await n.getContainerMembers(i);
				await Promise.all(o.map((e) => r(e)));
			}
			return e.fetcher._fetch(i.value, { method: "DELETE" });
		} catch (e) {
			hc(`Please manually remove ${i.value} from your system.`, e);
		}
	}
	async function i(t) {
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
					if ((e?.response?.status ?? e?.status) !== 412) throw new Qc(`createIfNotExists: PUT FAILED: ${t}: ${e}`);
				}
				return await e.fetcher.load(t);
			}
			if (n?.response?.status === 401) throw new Jc();
			if (n?.response?.status === 403) throw Vc(t) ? new Yc() : new Xc();
			let r = `createIfNotExists doc load error: ${t}: ${n}`;
			throw new $c(n?.status, `${n?.message || ""}${r}`);
		}
	}
	async function a(t, n) {
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
	async function o(t, n, r, a) {
		await e.fetcher.load(a);
		let o = e.any(t, n, null, a);
		if (o) return o;
		if (!e.updater.editable(a)) {
			let e = `followOrCreateLink: cannot edit ${a.value}`;
			throw gc(e), new Zc(e);
		}
		try {
			await e.updater.update([], [(0, $.st)(t, n, r, a)]);
		} catch (e) {
			throw gc(`followOrCreateLink: Error making link in ${a} to ${r}: ${e}`), new Qc(e);
		}
		try {
			await i(r);
		} catch (e) {
			throw gc(`followOrCreateLink: Error loading or saving new linked document: ${r}: ${e}`), e;
		}
		return r;
	}
	async function s(t, n, r, i, o) {
		await e.fetcher.load(i);
		let s = e.any(t, n, null, i);
		if (s) return s;
		if (!e.updater.editable(i)) {
			let e = `followOrCreateLinkWithContentOnCreate: cannot edit ${i.value}`;
			throw gc(e), new Zc(e);
		}
		try {
			await e.updater.update([], [(0, $.st)(t, n, r, i)]);
		} catch (e) {
			let t = `followOrCreateLinkWithContentOnCreate: Error making link in ${i} to ${r}: ${e}`;
			throw gc(t), new Qc(t);
		}
		try {
			await a(r, o);
		} catch (e) {
			throw gc(`followOrCreateLinkWithContentOnCreate: Error loading or saving new linked document: ${r}: ${e}`), e;
		}
		return r;
	}
	async function c(n) {
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
		let i = await t.findAclDocUrl((0, $.sym)(n.target));
		return e.fetcher._fetch(i, {
			method: "PUT",
			body: r,
			headers: [["Content-Type", "text/turtle"]]
		});
	}
	async function l(t, n) {
		await e.fetcher.webOperation("PUT", t.uri, {
			data: `# ${/* @__PURE__ */ new Date()} ${n}\n`,
			contentType: "text/turtle"
		});
	}
	return {
		recursiveDelete: r,
		setSinglePeerAccess: c,
		createEmptyRdfDoc: l,
		followOrCreateLink: o,
		followOrCreateLinkWithContentOnCreate: s,
		loadOrCreateIfNotExists: i,
		loadOrCreateWithContentOnCreate: a
	};
}
function ll(e, t) {
	hc("SolidLogic: Unique instance created.  There should only be one of these.");
	let n = $.graph();
	$.fetcher(n, { fetch: e.fetch }), n.updater = new $.UpdateManager(n), n.features = [];
	let r = new Rc(t), i = Fc(n), a = al(n), o = cl(n, i, a), s = ol(n, r, o), c = Gc(n, s), l = Kc(n, s, o, a, i), u = sl(n, r, s, o);
	hc("SolidAuthnLogic initialized");
	function d(e) {
		return n.fetcher.load(e);
	}
	function f(e, t = []) {
		return new Promise((r, i) => {
			n.updater.update(e, t, function(e, t, n) {
				t ? r() : i(Error(n));
			});
		});
	}
	function p() {
		n.statements.slice().forEach(n.remove.bind(n));
	}
	return {
		store: n,
		authn: r,
		acl: i,
		inbox: l,
		chat: c,
		profile: s,
		typeIndex: u,
		load: d,
		updatePromise: f,
		clearStore: p
	};
}
var ul = async (e, t) => {
	let n = t && t.credentials && t.credentials == "omit", r = jc;
	if ((r?.info?.webId || r?.webId) && !n) {
		let n = typeof r.fetch == "function" ? r.fetch.bind(r) : typeof r.authFetch == "function" ? r.authFetch.bind(r) : null;
		return n ? n(e, t) : window.fetch(e, t);
	} else return window.fetch(e, t);
}, dl = Symbol.for("solid-logic-singleton"), fl = typeof window < "u" ? window : mc.g;
function pl() {
	return fl[dl] ? hc("SolidLogic: Using existing global singleton instance.") : (hc("SolidLogic: Creating new global singleton instance."), fl[dl] = ll({ fetch: ul }, jc), hc("Unique quadstore initialized.")), fl[dl];
}
var ml = pl(), hl = [
	{
		name: "Solid Community",
		uri: "https://solidcommunity.net"
	},
	{
		name: "Solid Web",
		uri: "https://solidweb.org"
	},
	{
		name: "Solid Web ME",
		uri: "https://solidweb.me"
	},
	{
		name: "Inrupt.com",
		uri: "https://login.inrupt.com"
	}
];
function gl() {
	let e = [...hl], { host: t, origin: n } = new URL(location.href);
	return e.map(({ uri: e }) => new URL(e).host).includes(t) || e.unshift({
		name: t,
		uri: n
	}), e;
}
var _l = ml.authn, vl = ml.authn.authSession, yl = ml.store;
//#endregion
export { pt as A, Ar as C, _r as D, xr as E, he as F, le as I, V as L, Ve as M, U as N, er as O, xe as P, z as R, jr as S, Mr as T, Dr as _, Xc as a, kr as b, _l as c, Lc as d, ml as f, Tr as g, Wr as h, Zc as i, st as j, ht as k, sl as l, yl as m, Yc as n, Jc as o, vl as p, $c as r, Qc as s, Pc as t, gl as u, zr as v, Br as w, Fr as x, Or as y, k as z };

//# sourceMappingURL=solid-logic.esm-BrMdCG2_.js.map