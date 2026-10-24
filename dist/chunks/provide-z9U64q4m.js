import { S as e } from "./components-C8c2Ucm5.js";
// node_modules/@lit/context/lib/value-notifier.js
var t = class {
	get value() {
		return this.o;
	}
	set value(e) {
		this.setValue(e);
	}
	setValue(e, t = !1) {
		let n = t || !Object.is(e, this.o);
		this.o = e, n && this.updateObservers();
	}
	constructor(e) {
		this.subscriptions = /* @__PURE__ */ new Map(), this.updateObservers = () => {
			for (let [e, { disposer: t }] of this.subscriptions) e(this.o, t);
		}, e !== void 0 && (this.value = e);
	}
	addCallback(e, t, n) {
		if (!n) return void e(this.value);
		this.subscriptions.has(e) || this.subscriptions.set(e, {
			disposer: () => {
				this.subscriptions.delete(e);
			},
			consumerHost: t
		});
		let { disposer: r } = this.subscriptions.get(e);
		e(this.value, r);
	}
	clearCallbacks() {
		this.subscriptions.clear();
	}
}, n = class extends Event {
	constructor(e, t) {
		super("context-provider", {
			bubbles: !0,
			composed: !0
		}), this.context = e, this.contextTarget = t;
	}
}, r = class extends t {
	constructor(t, n, r) {
		super(n.context === void 0 ? r : n.initialValue), this.onContextRequest = (e) => {
			if (e.context !== this.context) return;
			let t = e.contextTarget ?? e.composedPath()[0];
			t !== this.host && (e.stopPropagation(), this.addCallback(e.callback, t, e.subscribe));
		}, this.onProviderRequest = (t) => {
			if (t.context !== this.context || (t.contextTarget ?? t.composedPath()[0]) === this.host) return;
			let n = /* @__PURE__ */ new Set();
			for (let [t, { consumerHost: r }] of this.subscriptions) n.has(t) || (n.add(t), r.dispatchEvent(new e(this.context, r, t, !0)));
			t.stopPropagation();
		}, this.host = t, this.context = n.context === void 0 ? n : n.context, this.attachListeners(), this.host.addController?.(this);
	}
	attachListeners() {
		this.host.addEventListener("context-request", this.onContextRequest), this.host.addEventListener("context-provider", this.onProviderRequest);
	}
	hostConnected() {
		this.host.dispatchEvent(new n(this.context, this.host));
	}
};
// node_modules/@lit/context/lib/decorators/provide.js
function i({ context: e }) {
	return (t, n) => {
		let i = /* @__PURE__ */ new WeakMap();
		if (typeof n == "object") return {
			get() {
				return t.get.call(this);
			},
			set(e) {
				return i.get(this).setValue(e), t.set.call(this, e);
			},
			init(t) {
				return i.set(this, new r(this, {
					context: e,
					initialValue: t
				})), t;
			}
		};
		{
			t.constructor.addInitializer(((t) => {
				i.set(t, new r(t, { context: e }));
			}));
			let a = Object.getOwnPropertyDescriptor(t, n), o;
			if (a === void 0) {
				let e = /* @__PURE__ */ new WeakMap();
				o = {
					get() {
						return e.get(this);
					},
					set(t) {
						i.get(this).setValue(t), e.set(this, t);
					},
					configurable: !0,
					enumerable: !0
				};
			} else {
				let e = a.set;
				o = {
					...a,
					set(t) {
						i.get(this).setValue(t), e?.call(this, t);
					}
				};
			}
			Object.defineProperty(t, n, o);
			return;
		}
	};
}
export { i as t };

//# sourceMappingURL=provide-z9U64q4m.js.map