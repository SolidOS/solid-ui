const e=require("../../../../utils/headerFooterHelpers.cjs.js");let t=require("solid-logic"),n=require("lit");var r=class extends n.LitElement{static properties={theme:{type:String,reflect:!0},layout:{type:String,reflect:!0},position:{type:String,reflect:!0},top:{type:String,reflect:!0},right:{type:String,reflect:!0},bottom:{type:String,reflect:!0},left:{type:String,reflect:!0},store:{type:Object,attribute:!1},_user:{state:!0}};static styles=n.css`
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
  `;constructor(){super(),this.theme=`light`,this.layout=`desktop`,this.position=`static`,this.top=`auto`,this.right=`auto`,this.bottom=`auto`,this.left=`auto`,this.store=null,this._user=null,this._updateFooter=this._updateFooter.bind(this)}connectedCallback(){super.connectedCallback(),t.authSession.events.on(`login`,this._updateFooter),t.authSession.events.on(`logout`,this._updateFooter),this._updateFooter()}disconnectedCallback(){typeof t.authSession.events.off==`function`&&(t.authSession.events.off(`login`,this._updateFooter),t.authSession.events.off(`logout`,this._updateFooter)),super.disconnectedCallback()}updated(e){(e.has(`position`)||e.has(`top`)||e.has(`right`)||e.has(`bottom`)||e.has(`left`))&&this._updatePositionStyles()}_updatePositionStyles(){this.style.setProperty(`--footer-position`,this.position),this.style.setProperty(`--footer-top`,this.top),this.style.setProperty(`--footer-right`,this.right),this.style.setProperty(`--footer-bottom`,this.bottom),this.style.setProperty(`--footer-left`,this.left)}_updateFooter(){this._user=t.authn.currentUser()}render(){return n.html`
      <footer class="footer">
        ${this._renderFooterContent()}
      </footer>
    `}_renderFooterContent(){if(!this._user)return n.html`
        <div>
          <strong>Public View</strong>
          <div>You are viewing this profile as a guest.</div>
        </div>
      `;let t=this.store?e.getName(this.store,this._user):this._user.uri;return n.html`
      <div>
        <strong>Logged in View</strong>
        <div>
          You are logged in as
          <a href=${this._user.uri} target="_blank" rel="noopener noreferrer">${t}</a>.
        </div>
      </div>
    `}};exports.Footer=r;
//# sourceMappingURL=Footer.cjs.js.map