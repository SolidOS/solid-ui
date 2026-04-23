import * as __WEBPACK_EXTERNAL_MODULE_solid_logic_bb75353e__ from "solid-logic";
/******/ var __webpack_modules__ = ({

/***/ 1209
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ LoginButton)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6161);
/* harmony import */ var solid_logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3138);
/* harmony import */ var _downArrow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1353);



class LoginButton extends lit__WEBPACK_IMPORTED_MODULE_0__/* .LitElement */ .WF {
  static properties = {
    label: {
      type: String,
      reflect: true
    },
    theme: {
      type: String,
      reflect: true
    },
    issuerUrl: {
      type: String,
      attribute: 'issuer-url',
      reflect: true
    },
    icon: {
      type: String,
      reflect: true
    },
    layout: {
      type: String,
      reflect: true
    },
    _popupOpen: {
      state: true
    },
    _issuerInputValue: {
      state: true
    },
    _dropdownOpen: {
      state: true
    }
  };
  static styles = (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .css */ .AH)`
    :host { // default theme
      display: inline-block;
      position: relative;
      z-index: 400;
      --login-button-background: var(--lavender-900, #7c4cff);
      --login-button-text: var(--color-header-text, #ffffff);
      --popup-background: var(--color-background, #F8F9FB);
      --popup-text: var(--color-text, #1A1A1A);
      --popup-border: var(--color-border, #E5E7EB);
      --popup-shadow: var(--box-shadow-sm, 0 1px 4px rgba(124,77,255,0.12));
      --popup-overlay-background: rgba(0, 0, 0, 0.6);
      --issuer-input-background: var(--color-background, #F8F9FB);
      --issuer-input-text: var(--color-text, #1A1A1A);
      --issuer-input-border: var(--color-text, #1A1A1A);
      --issuer-button-background: var(--color-background, #F8F9FB);
      --issuer-button-text: var(--color-text, #1A1A1A);
      --issuer-button-border: var(--color-border, #E5E7EB);
      --issuer-button-hover-background: var(--lavender-900, #7c4cff);
      --issuer-label-color: var(--grey-purple-700, #1A1A1A);
      --issuer-placeholder-color: var(--grey-purple-700, #5e546d);;
      --error-text-color: var(--color-error, #B00020);
    }

    :host([theme='dark']) {
      display: inline-block;
      position: relative;
      z-index: 900;
      --login-button-background: var(--lavender-900, #7c4cff);
      --login-button-text: var(--color-header-text, #ffffff);
      --popup-background: var(--color-background, #F8F9FB);
      --popup-text: var(--color-text, #1A1A1A);
      --popup-border: var(--color-border, #E5E7EB);
      --popup-shadow: var(--box-shadow-sm, 0 1px 4px rgba(124,77,255,0.12));
      --popup-overlay-background: rgba(0, 0, 0, 0.6);
      --issuer-input-background: var(--color-background, #F8F9FB);
      --issuer-input-text: var(--color-text, #1A1A1A);
      --issuer-input-border: var(--color-text, #1A1A1A);
      --issuer-button-background: var(--color-background, #F8F9FB);
      --issuer-button-text: var(--color-text, #1A1A1A);
      --issuer-button-border: var(--color-text, #1A1A1A);
      --issuer-button-hover-background: var(--lavender-900, #7c4cff);
      --issuer-label-color: var(--grey-purple-700, #1A1A1A);
      --issuer-placeholder-color: var(--grey-purple-700, #5e546d);;
      --error-text-color: var(--color-error, #B00020);
    }

    .login-button {
      display: flex;
      height: 35px;
      padding: var(--spacing-xxs, 0.3125rem) var(--spacing-xs, 0.75rem);
      align-items: center;
      gap: var(--spacing-xxs, 0.3125rem);
      border-radius: var(--border-radius-base, 0.3125rem);
      background: var(--login-button-background);
      border: none;
      color: var(--login-button-text);
      cursor: pointer;
      font: inherit;
      line-height: 1;
      white-space: nowrap;
      text-decoration: none;
      box-sizing: border-box;
      transition: transform 0.2s ease;
    }

    .login-button-icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      object-fit: contain;
    }

    .login-button:active {
      transform: translateY(1px);
    }

    .popup-dialog {
      border: none;
      padding: 0;
      background: transparent;
      outline: none;
      overflow: visible;
      max-height: none;
      max-width: none;
    }

    .popup-dialog::backdrop {
      background: var(--popup-overlay-background, rgba(0, 0, 0, 0.6));
    }

    .popup-box {
      background: var(--popup-background);
      color: var(--popup-text);
      box-shadow: var(--popup-shadow);
      border: 1px solid var(--popup-border);
      border-radius: var(--border-radius-md, 0.5rem);
      min-width: 480px;
      z-index: 1001;
    }

    .popup-top-menu {
      border-bottom: 1px solid #DDD;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 8px;
      margin-bottom: 8px;
      padding: 1rem;
      background: var(--gray-200, #E5E7EB);
    }

    .popup-title {
      font-weight: 800;
    }

    .popup-close {
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 1.25rem;
      line-height: 1;
      padding: 0 0.25rem;
    }

    .issuer-text-section {
      display: flex;
      flex-direction: column;
      padding: 1rem 1rem 1.75rem;
    }

    .issuer-text-label {
      color: var(--issuer-label-color);
      margin-bottom: 6px;
    }

    .issuer-text-row {
      display: flex;
      flex-direction: row;
      gap: 6px;
      align-items: flex-start;
    }

    .issuer-input-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      position: relative;
    }

    .issuer-input-field-row {
      display: flex;
      flex-direction: row;
      position: relative;
    }

    .issuer-text-input {
      flex: 1;
      padding: 0.375rem 2.75rem 0.375rem 0.5rem;
      border: 1px solid var(--issuer-input-border);
      border-radius: var(--border-radius-base, 0.3125rem);
      background: var(--issuer-input-background);
      color: var(--issuer-input-text);
      font: inherit;
      min-width: 0;
    }

    .issuer-text-input::placeholder {
      color: var(--issuer-placeholder-color);
    }

    .issuer-dropdown-toggle {
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
      width: 26px;
      height: 26px;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border-radius: var(--border-radius-base, 0.3125rem);
    }

    .issuer-dropdown-toggle:hover {
      background: var(--color-header-menu-item-hover, #e6dcff);
    }

    .issuer-dropdown-toggle svg {
      width: 14px;
      height: 14px;
      display: block;
    }

    .issuer-dropdown-list {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      right: 0;
      border: 1px solid var(--color-border, #E5E7EB);
      border-top: none;
      border-radius: 0 0 var(--border-radius-base, 0.3125rem) var(--border-radius-base, 0.3125rem);
      background: var(--issuer-input-background);
      overflow: visible;
      z-index: 10;
      box-shadow: 0 4px 12px rgba(124, 77, 255, 0.12);
    }

    .issuer-dropdown-item {
      display: block;
      width: 100%;
      padding: 0.625rem 0.75rem;
      border: none;
      border-bottom: 1px solid var(--color-border, #E5E7EB);
      background: transparent;
      color: var(--issuer-button-text);
      cursor: pointer;
      font: inherit;
      text-align: left;
      box-sizing: border-box;
    }

    .issuer-dropdown-item:last-child {
      border-bottom: none;
    }

    .issuer-dropdown-item:hover {
      background: var(--color-header-menu-item-hover, #e6dcff);
      border-radius: var(--border-radius-base-md, 0.5rem);
    }

    .popup-footer {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 8px;
      padding: 0.75rem 1rem 1rem;
    }

    .popup-footer-hr {
      margin: 0;
      border: none;
      border-top: 1px solid var(--popup-border, #E5E7EB);
    }

    .popup-cancel-button {
      padding: 0.5rem 1.25rem;
      border: 1px solid #C0BFC7;
      border-radius: var(--border-radius-base, 0.3125rem);
      background: var(--popup-background);
      color: #314158;
      cursor: pointer;
      font: inherit;
    }

    .popup-cancel-button:hover {
      background: #D1D5DB;
    }

    .popup-login-button {
      padding: 0.5rem 1.25rem;
      border: none;
      border-radius: var(--border-radius-base, 0.3125rem);
      background: var(--lavender-900, #7c4cff);
      color: #ffffff;
      cursor: pointer;
      font: inherit;
    }

    .popup-login-button:hover {
      background: #6a3de8;
    }

    .popup-login-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .error-msg {
      color: var(--error-text-color);
      font-size: 0.875rem;
      margin-top: 8px;
    }
  `;
  _issuerInputId = `issuer-url-input-${Math.random().toString(36).slice(2, 10)}`;
  _errorMsg = '';
  constructor() {
    super();
    this.label = 'Log In';
    this.theme = 'light';
    this.issuerUrl = '';
    this.icon = '';
    this.layout = 'desktop';
    this._popupOpen = false;
    this._issuerInputValue = '';
    this._dropdownOpen = false;
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  _openPopup() {
    const offline = (0,solid_logic__WEBPACK_IMPORTED_MODULE_1__.offlineTestID)();
    if (offline) {
      this._loginComplete(offline.uri);
      return;
    }
    this._issuerInputValue = typeof localStorage !== 'undefined' && localStorage.getItem('loginIssuer') || this.issuerUrl || '';
    this._errorMsg = '';
    this._popupOpen = true;
  }
  _closePopup() {
    this._popupOpen = false;
  }
  updated() {
    const dialog = this.shadowRoot?.querySelector('dialog');
    if (!dialog) return;
    if (this._popupOpen && !dialog.open) {
      dialog.showModal();
    } else if (!this._popupOpen && dialog.open) {
      dialog.close();
    }
  }
  async _loginToIssuer(issuerUri) {
    if (!issuerUri) return;
    try {
      // clear authorization metadata from store
      ;
      solid_logic__WEBPACK_IMPORTED_MODULE_1__.solidLogicSingleton.store.updater.flagAuthorizationMetadata();
      const preLoginRedirectHash = new URL(window.location.href).hash;
      if (preLoginRedirectHash) {
        window.localStorage.setItem('preLoginRedirectHash', preLoginRedirectHash);
      }
      window.localStorage.setItem('loginIssuer', issuerUri);
      const locationUrl = new URL(window.location.href);
      locationUrl.hash = '';
      await solid_logic__WEBPACK_IMPORTED_MODULE_1__.authSession.login({
        redirectUrl: locationUrl.href,
        oidcIssuer: issuerUri
      });
    } catch (err) {
      this._errorMsg = err.message || String(err);
      this.requestUpdate();
    }
  }
  _loginComplete(webIdUri) {
    solid_logic__WEBPACK_IMPORTED_MODULE_1__.authn.saveUser(webIdUri);
    this.dispatchEvent(new CustomEvent('login-success', {
      detail: {
        webId: webIdUri
      },
      bubbles: true,
      composed: true
    }));
  }
  _handleGoClick() {
    this._dropdownOpen = false;
    this._loginToIssuer(this._issuerInputValue);
  }
  _toggleDropdown() {
    this._dropdownOpen = !this._dropdownOpen;
  }
  _selectIssuerFromDropdown(uri) {
    this._issuerInputValue = uri;
    this._dropdownOpen = false;
  }
  _handleInputChange(e) {
    this._issuerInputValue = e.target.value;
  }
  _handleInputKeydown(e) {
    if (e.key === 'Enter') {
      this._loginToIssuer(this._issuerInputValue);
    }
    if (e.key === 'Escape') {
      this._closePopup();
    }
  }
  _renderPopup() {
    const suggestedIssuers = (0,solid_logic__WEBPACK_IMPORTED_MODULE_1__.getSuggestedIssuers)();
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`
      <div class="popup-box">
          <div class="popup-top-menu">
            <span class="popup-title">Select an identity provider</span>
            <button class="popup-close" type="button" aria-label="Close" @click="${() => this._closePopup()}">&#x2715;</button>
          </div>

          <div class="issuer-text-section">
            <label class="issuer-text-label" for="${this._issuerInputId}">Solid Identity Provider</label>
            <div class="issuer-text-row">
              <div class="issuer-input-wrapper">
                <div class="issuer-input-field-row">
                  <input
                    id="${this._issuerInputId}"
                    class="issuer-text-input"
                    type="text"
                    placeholder="https://example.com"
                    .value="${this._issuerInputValue}"
                    @input="${this._handleInputChange}"
                    @keydown="${this._handleInputKeydown}"
                    autocomplete="url"
                  />
                  ${suggestedIssuers.length ? (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`
                    <button
                      class="issuer-dropdown-toggle"
                      type="button"
                      aria-label="Show identity provider suggestions"
                      aria-expanded="${this._dropdownOpen}"
                      @click="${() => this._toggleDropdown()}"
                    >${_downArrow__WEBPACK_IMPORTED_MODULE_2__/* .phoneIcon */ .S}</button>
                  ` : ''}
                </div>
                ${this._dropdownOpen && suggestedIssuers.length ? (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`
                  <div class="issuer-dropdown-list" role="listbox">
                    ${suggestedIssuers.map(issuerInfo => (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`
                      <button
                        class="issuer-dropdown-item"
                        type="button"
                        role="option"
                        @click="${() => this._selectIssuerFromDropdown(issuerInfo.uri)}"
                      >${issuerInfo.name}</button>
                    `)}
                  </div>
                ` : ''}
              </div>
            </div>
            ${this._errorMsg ? (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`<div class="error-msg">${this._errorMsg}</div>` : ''}
          </div>
          <hr class="popup-footer-hr" />
          <div class="popup-footer">
            <button class="popup-cancel-button" type="button" @click="${() => this._closePopup()}">Cancel</button>
            <button
              class="popup-login-button"
              type="button"
              ?disabled="${!this._issuerInputValue}"
              @click="${() => this._handleGoClick()}"
            >Log In</button>
          </div>
        </div>
    `;
  }
  render() {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`
      <button
        class="login-button"
        type="button"
        part="login-button"
        @click="${() => this._openPopup()}"
      >
        ${this.icon ? (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`<img class="login-button-icon" src="${this.icon}" alt="" aria-hidden="true" part="login-button-icon" />` : ''}
        <slot>${this.label}</slot>
      </button>

      <dialog
        class="popup-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Select an identity provider"
        @cancel="${e => {
      e.preventDefault();
      this._closePopup();
    }}"
        @click="${e => {
      if (e.target === e.currentTarget) this._closePopup();
    }}"
      >
        ${this._popupOpen ? this._renderPopup() : ''}
      </dialog>
    `;
  }
}

/***/ },

/***/ 1353
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ phoneIcon)
/* harmony export */ });
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6752);

const phoneIcon = (0,lit_html__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`
  <svg xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 12 7" 
    fill="none"
  >
    <path d="M0.679688 0.678955L5.50729 5.50656L10.3349 0.678955" stroke="#6A7282" stroke-width="1.35776" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

/***/ },

/***/ 3138
(module, __unused_webpack_exports, __webpack_require__) {

var x = (y) => {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = (x) => (() => (x))
module.exports = x({ ["authSession"]: () => (__WEBPACK_EXTERNAL_MODULE_solid_logic_bb75353e__.authSession), ["authn"]: () => (__WEBPACK_EXTERNAL_MODULE_solid_logic_bb75353e__.authn), ["getSuggestedIssuers"]: () => (__WEBPACK_EXTERNAL_MODULE_solid_logic_bb75353e__.getSuggestedIssuers), ["offlineTestID"]: () => (__WEBPACK_EXTERNAL_MODULE_solid_logic_bb75353e__.offlineTestID), ["solidLogicSingleton"]: () => (__WEBPACK_EXTERNAL_MODULE_solid_logic_bb75353e__.solidLogicSingleton) });

/***/ },

/***/ 3826
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AH: () => (/* binding */ i),
/* harmony export */   Rf: () => (/* binding */ S),
/* harmony export */   sk: () => (/* binding */ c)
/* harmony export */ });
/* unused harmony exports CSSResult, supportsAdoptingStyleSheets, unsafeCSS */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o.set(s,t))}return t}toString(){return this.cssText}}const r=t=>new n("string"==typeof t?t:t+"",void 0,s),i=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n(o,t,s)},S=(s,o)=>{if(e)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o)}},c=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r(e)})(t):t;
//# sourceMappingURL=css-tag.js.map


/***/ },

/***/ 8760
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AH: () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.AH),
/* harmony export */   mN: () => (/* binding */ y)
/* harmony export */ });
/* unused harmony exports defaultConverter, notEqual */
/* harmony import */ var _css_tag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3826);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i,defineProperty:e,getOwnPropertyDescriptor:h,getOwnPropertyNames:r,getOwnPropertySymbols:o,getPrototypeOf:n}=Object,a=globalThis,c=a.trustedTypes,l=c?c.emptyScript:"",p=a.reactiveElementPolyfillSupport,d=(t,s)=>t,u={toAttribute(t,s){switch(s){case Boolean:t=t?l:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},f=(t,s)=>!i(t,s),b={attribute:!0,type:String,converter:u,reflect:!1,useDefault:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),a.litPropertyMetadata??=new WeakMap;class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e(this.prototype,t,h)}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t}};return{get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d("elementProperties")))return;const t=n(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(d("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d("properties"))){const t=this.properties,s=[...r(t),...o(t)];for(const i of s)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift((0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__/* .getCompatibleStyle */ .sk)(s))}else void 0!==s&&i.push((0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__/* .getCompatibleStyle */ .sk)(s));return i}static _$Eu(t,s){const i=s.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return (0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__/* .adoptStyles */ .Rf)(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,s,i){this._$AK(t,i)}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null}}requestUpdate(t,s,i,e=!1,h){if(void 0!==t){const r=this.constructor;if(!1===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),!0!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];!0!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e)}}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(s)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[d("elementProperties")]=new Map,y[d("finalized")]=new Map,p?.({ReactiveElement:y}),(a.reactiveElementVersions??=[]).push("2.1.2");
//# sourceMappingURL=reactive-element.js.map


/***/ },

/***/ 5228
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AH: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.AH),
/* harmony export */   WF: () => (/* binding */ i),
/* harmony export */   qy: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.qy)
/* harmony export */ });
/* unused harmony export _$LE */
/* harmony import */ var _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8760);
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6752);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__/* .ReactiveElement */ .mN{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=(0,lit_html__WEBPACK_IMPORTED_MODULE_1__/* .render */ .XX)(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return lit_html__WEBPACK_IMPORTED_MODULE_1__/* .noChange */ .c0}}i._$litElement$=!0,i["finalized"]=!0,s.litElementHydrateSupport?.({LitElement:i});const o=s.litElementPolyfillSupport;o?.({LitElement:i});const n={_$AK:(t,e,r)=>{t._$AK(e,r)},_$AL:t=>t._$AL};(s.litElementVersions??=[]).push("4.2.2");
//# sourceMappingURL=lit-element.js.map


/***/ },

/***/ 6752
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XX: () => (/* binding */ D),
/* harmony export */   c0: () => (/* binding */ E),
/* harmony export */   qy: () => (/* binding */ b)
/* harmony export */ });
/* unused harmony exports _$LH, mathml, nothing, svg */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t=>t,s=t.trustedTypes,e=s?s.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o=`lit$${Math.random().toFixed(9).slice(2)}$`,n="?"+o,r=`<${n}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),w=x(2),T=x(3),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o+x):s+o+(-2===d?i:x)}return[V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t)}else t.startsWith(o)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o),i=t.length-1;if(i>0){r.textContent=s?s.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c())}}}else if(8===r.nodeType)if(r.data===n)d.push({type:2,index:l});else{let t=-1;for(;-1!==(t=r.data.indexOf(o,t+1));)d.push({type:7,index:l}),t+=o.length-1}l++}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,!0);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n]}o!==r?.index&&(h=P.nextNode(),o++)}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else{const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);t!==this._$AB;){const s=i(t).nextSibling;i(t).remove(),t=s}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r}o&&!e&&this.j(t)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}}class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const j={M:h,P:o,A:n,C:1,L:N,R,D:d,V:M,I:k,H,N:L,U:z,B:I,F:Z},B=t.litHtmlPolyfillSupport;B?.(S,k),(t.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{})}return h._$AI(t),h};
//# sourceMappingURL=lit-html.js.map


/***/ },

/***/ 6161
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AH: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.AH),
/* harmony export */   WF: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.WF),
/* harmony export */   qy: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.qy)
/* harmony export */ });
/* harmony import */ var _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8760);
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6752);
/* harmony import */ var lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5228);

//# sourceMappingURL=index.js.map


/***/ }

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* reexport safe */ _LoginButton__WEBPACK_IMPORTED_MODULE_0__.M)
/* harmony export */ });
/* harmony import */ var _LoginButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1209);


const LOGIN_BUTTON_TAG_NAME = 'solid-ui-login-button';
if (!customElements.get(LOGIN_BUTTON_TAG_NAME)) {
  customElements.define(LOGIN_BUTTON_TAG_NAME, _LoginButton__WEBPACK_IMPORTED_MODULE_0__/* .LoginButton */ .M);
}
const __webpack_exports__LoginButton = __webpack_exports__.M;
export { __webpack_exports__LoginButton as LoginButton };

//# sourceMappingURL=index.esm.js.map