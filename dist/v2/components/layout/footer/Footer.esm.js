import { getName as e } from "../../../../utils/headerFooterHelpers.esm.js";
import { authSession as t, authn as n } from "solid-logic";
import { LitElement as r, css as i, html as a } from "lit";
//#region src/v2/components/layout/footer/Footer.ts
var o = class extends r {
	static properties = {
		theme: {
			type: String,
			reflect: !0
		},
		layout: {
			type: String,
			reflect: !0
		},
		position: {
			type: String,
			reflect: !0
		},
		top: {
			type: String,
			reflect: !0
		},
		right: {
			type: String,
			reflect: !0
		},
		bottom: {
			type: String,
			reflect: !0
		},
		left: {
			type: String,
			reflect: !0
		},
		store: {
			type: Object,
			attribute: !1
		},
		_user: { state: !0 }
	};
	static styles = i`
    :host {
      display: block;
      position: var(--footer-position, static);
      top: var(--footer-top, auto);
      right: var(--footer-right, auto);
      bottom: var(--footer-bottom, auto);
      left: var(--footer-left, auto);
      width: auto;
      max-width: var(--footer-max-width, none);
      margin: var(--footer-margin, 0);
      box-sizing: border-box;
      color: var(--footer-text, #4f4f4f);
      background: transparent;
      border: 1px solid var(--footer-border, rgba(0, 0, 0, 0.12));
      border-radius: var(--footer-border-radius, 1rem);
      box-shadow: var(--footer-box-shadow, 0 1px 6px rgba(0, 0, 0, 0.08));
      font-family: var(--font-family-base, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif);
    }

    .footer {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 0.25rem;
      font-size: 0.75rem;
      line-height: 1.5;
      text-align: left;
    }

    .footer a {
      color: var(--footer-link, #4b32a8);
      text-decoration: none;
      font-weight: 600;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    .footer span {
      color: inherit;
    }

    .footer div > strong {
      display: block;
      margin-bottom: 0.5rem;
    }

    :host([layout='mobile']) {
      border: none;
      box-shadow: none;
      border-radius: 0;
    }
  `;
	constructor() {
		super(), this.theme = "light", this.layout = "desktop", this.position = "static", this.top = "auto", this.right = "auto", this.bottom = "auto", this.left = "auto", this.store = null, this._user = null, this._updateFooter = this._updateFooter.bind(this);
	}
	connectedCallback() {
		super.connectedCallback(), t.events.on("login", this._updateFooter), t.events.on("logout", this._updateFooter), this._updateFooter();
	}
	disconnectedCallback() {
		typeof t.events.off == "function" && (t.events.off("login", this._updateFooter), t.events.off("logout", this._updateFooter)), super.disconnectedCallback();
	}
	updated(e) {
		(e.has("position") || e.has("top") || e.has("right") || e.has("bottom") || e.has("left")) && this._updatePositionStyles();
	}
	_updatePositionStyles() {
		this.style.setProperty("--footer-position", this.position), this.style.setProperty("--footer-top", this.top), this.style.setProperty("--footer-right", this.right), this.style.setProperty("--footer-bottom", this.bottom), this.style.setProperty("--footer-left", this.left);
	}
	_updateFooter() {
		this._user = n.currentUser();
	}
	render() {
		return a`
      <footer class="footer">
        ${this._renderFooterContent()}
      </footer>
    `;
	}
	_renderFooterContent() {
		if (!this._user) return a`
        <div>
          <strong>Public View</strong>
          <div>You are viewing this profile as a guest.</div>
        </div>
      `;
		let t = this.store ? e(this.store, this._user) : this._user.uri;
		return a`
      <div>
        <strong>Logged in View</strong>
        <div>
          You are logged in as
          <a href=${this._user.uri} target="_blank" rel="noopener noreferrer">${t}</a>.
        </div>
      </div>
    `;
	}
};
//#endregion
export { o as Footer };

//# sourceMappingURL=Footer.esm.js.map