/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 423
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Rm: () => (/* binding */ log)
/* harmony export */ });
/* unused harmony exports warn, error, trace */
function log(...args) {
  console.log(...args);
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  console.error(...args);
}
function trace(...args) {
  console.trace(...args);
}

/***/ },

/***/ 378
(module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pt: () => (/* binding */ icons)
/* harmony export */ });
/* unused harmony exports iconBase, originalIconBase */
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(423);
/* module decorator */ module = __webpack_require__.hmd(module);
// Works in FF extension - what about browserify??
// 2021-04-08 Convert to TS

/* The Firefox case is left for historical record, as we don't currenly
 * have a FF extension for mashlib, but we could.  This is sthepoint to
 * hack the place it can find its icons internally
 *
 * The $SolidTestEnvironment is important and is used for
 * example when testing on localhost to specify a place the icons be found
 * in your test set up.
 *
 * You can also use it if you want to just run a mashlib whhich takes its
 * icons seved by other than github.
 */


// Do not export. Always us this module to find the icons, as they vary
const iconsOnGithub = 'https://solidos.github.io/solid-ui/src'; // changed org 2022-05

const icons = module.scriptURI // Firefox extension
? {
  iconBase: module.scriptURI.slice(0, module.scriptURI.lastIndexOf('/')) + '/icons/',
  originalIconBase: module.scriptURI.slice(0, module.scriptURI.lastIndexOf('/')) + '/originalIcons/'
} : typeof $SolidTestEnvironment !== 'undefined' && $SolidTestEnvironment.iconBase // Test environemnt
? {
  iconBase: $SolidTestEnvironment.iconBase,
  originalIconBase: $SolidTestEnvironment.originalIconBase
} : {
  // Normal case:
  iconBase: iconsOnGithub + '/icons/',
  originalIconBase: iconsOnGithub + '/originalIcons/'
};
(0,_debug__WEBPACK_IMPORTED_MODULE_0__/* .log */ .Rm)('   icons.iconBase is set to : ' + icons.iconBase);

// allow tests etc  named-import this directly from this module
const iconBase = icons.iconBase;
const originalIconBase = icons.originalIconBase;

/***/ },

/***/ 568
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// UNUSED EXPORTS: LoginButton

// EXTERNAL MODULE: ./node_modules/lit/index.js
var lit = __webpack_require__(161);
// EXTERNAL MODULE: external "SolidLogic"
var external_SolidLogic_ = __webpack_require__(892);
// EXTERNAL MODULE: ./node_modules/lit-html/lit-html.js
var lit_html = __webpack_require__(752);
;// ./src/v2/components/loginButton/downArrow.ts

const phoneIcon = (0,lit_html/* html */.qy)`
  <svg xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 12 7" 
    fill="none"
  >
    <path d="M0.679688 0.678955L5.50729 5.50656L10.3349 0.678955" stroke="#6A7282" stroke-width="1.35776" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;
;// ./src/v2/components/loginButton/LoginButton.ts



class LoginButton extends lit/* LitElement */.WF {
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
  static styles = (0,lit/* css */.AH)`
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
    const offline = (0,external_SolidLogic_.offlineTestID)();
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
      external_SolidLogic_.solidLogicSingleton.store.updater.flagAuthorizationMetadata();
      const preLoginRedirectHash = new URL(window.location.href).hash;
      if (preLoginRedirectHash) {
        window.localStorage.setItem('preLoginRedirectHash', preLoginRedirectHash);
      }
      window.localStorage.setItem('loginIssuer', issuerUri);
      const locationUrl = new URL(window.location.href);
      locationUrl.hash = '';
      await external_SolidLogic_.authSession.login({
        redirectUrl: locationUrl.href,
        oidcIssuer: issuerUri
      });
    } catch (err) {
      this._errorMsg = err.message || String(err);
      this.requestUpdate();
    }
  }
  _loginComplete(webIdUri) {
    external_SolidLogic_.authn.saveUser(webIdUri);
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
    const suggestedIssuers = (0,external_SolidLogic_.getSuggestedIssuers)();
    return (0,lit/* html */.qy)`
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
                  ${suggestedIssuers.length ? (0,lit/* html */.qy)`
                    <button
                      class="issuer-dropdown-toggle"
                      type="button"
                      aria-label="Show identity provider suggestions"
                      aria-expanded="${this._dropdownOpen}"
                      @click="${() => this._toggleDropdown()}"
                    >${phoneIcon}</button>
                  ` : ''}
                </div>
                ${this._dropdownOpen && suggestedIssuers.length ? (0,lit/* html */.qy)`
                  <div class="issuer-dropdown-list" role="listbox">
                    ${suggestedIssuers.map(issuerInfo => (0,lit/* html */.qy)`
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
            ${this._errorMsg ? (0,lit/* html */.qy)`<div class="error-msg">${this._errorMsg}</div>` : ''}
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
    return (0,lit/* html */.qy)`
      <button
        class="login-button"
        type="button"
        part="login-button"
        @click="${() => this._openPopup()}"
      >
        ${this.icon ? (0,lit/* html */.qy)`<img class="login-button-icon" src="${this.icon}" alt="" aria-hidden="true" part="login-button-icon" />` : ''}
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
;// ./src/v2/components/loginButton/index.ts


const LOGIN_BUTTON_TAG_NAME = 'solid-ui-login-button';
if (!customElements.get(LOGIN_BUTTON_TAG_NAME)) {
  customElements.define(LOGIN_BUTTON_TAG_NAME, LoginButton);
}

/***/ },

/***/ 765
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// UNUSED EXPORTS: SignupButton

// EXTERNAL MODULE: ./node_modules/lit/index.js
var lit = __webpack_require__(161);
;// ./src/v2/components/signupButton/SignupButton.ts

const DEFAULT_SIGNUP_URL = 'https://solidproject.org/get_a_pod';
class SignupButton extends lit/* LitElement */.WF {
  static properties = {
    label: {
      type: String,
      reflect: true
    },
    theme: {
      type: String,
      reflect: true
    },
    signupUrl: {
      type: String,
      attribute: 'signup-url',
      reflect: true
    },
    icon: {
      type: String,
      reflect: true
    },
    layout: {
      type: String,
      reflect: true
    }
  };
  static styles = (0,lit/* css */.AH)`
    :host {
      display: inline-block;
      --signup-button-background: transparent;
      --signup-button-border: var(--color-border, #E5E7EB);
      --signup-button-text: var(--color-header-text, #ffffff);
    }

    :host([theme='dark']) {
      --signup-button-background: transparent;
      --signup-button-border: var(--color-border, #E5E7EB);
      --signup-button-text: var(--color-header-text, #ffffff);
    }

    .signup-button {
      display: flex;
      height: 35px;
      padding: var(--spacing-xxs, 0.3125rem) var(--spacing-xs, 0.75rem);
      align-items: center;
      gap: var(--spacing-xxs, 0.3125rem);
      border-radius: var(--border-radius-base, 0.3125rem);
      background: var(--signup-button-background);
      border: 1px solid var(--signup-button-border);
      color: var(--signup-button-text);
      cursor: pointer;
      font: inherit;
      line-height: 1;
      white-space: nowrap;
      text-decoration: none;
      box-sizing: border-box;
      transition: transform 0.2s ease;
    }

    :host([layout='mobile']) .signup-button {
      border: none;
    }

    .signup-button-icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      object-fit: contain;
    }

    .signup-button:active {
      transform: translateY(1px);
    }
  `;
  constructor() {
    super();
    this.label = 'Sign Up';
    this.signupUrl = DEFAULT_SIGNUP_URL;
    this.theme = 'light';
    this.icon = '';
    this.layout = 'desktop';
  }
  _handleClick() {
    window.open(this.signupUrl, '_blank', 'noopener,noreferrer');
  }
  render() {
    return (0,lit/* html */.qy)`
      <button
        class="signup-button"
        type="button"
        part="signup-button"
        @click="${() => this._handleClick()}"
      >
        ${this.icon ? (0,lit/* html */.qy)`<img class="signup-button-icon" src="${this.icon}" alt="" aria-hidden="true" part="signup-button-icon" />` : ''}
        <slot>${this.label}</slot>
      </button>
    `;
  }
}
;// ./src/v2/components/signupButton/index.ts


const SIGNUP_BUTTON_TAG_NAME = 'solid-ui-signup-button';
if (!customElements.get(SIGNUP_BUTTON_TAG_NAME)) {
  customElements.define(SIGNUP_BUTTON_TAG_NAME, SignupButton);
}

/***/ },

/***/ 892
(module) {

module.exports = SolidLogic;

/***/ },

/***/ 826
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

/***/ 760
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AH: () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.AH),
/* harmony export */   mN: () => (/* binding */ y)
/* harmony export */ });
/* unused harmony exports defaultConverter, notEqual */
/* harmony import */ var _css_tag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(826);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i,defineProperty:e,getOwnPropertyDescriptor:h,getOwnPropertyNames:r,getOwnPropertySymbols:o,getPrototypeOf:n}=Object,a=globalThis,c=a.trustedTypes,l=c?c.emptyScript:"",p=a.reactiveElementPolyfillSupport,d=(t,s)=>t,u={toAttribute(t,s){switch(s){case Boolean:t=t?l:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},f=(t,s)=>!i(t,s),b={attribute:!0,type:String,converter:u,reflect:!1,useDefault:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),a.litPropertyMetadata??=new WeakMap;class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e(this.prototype,t,h)}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t}};return{get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d("elementProperties")))return;const t=n(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(d("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d("properties"))){const t=this.properties,s=[...r(t),...o(t)];for(const i of s)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift((0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__/* .getCompatibleStyle */ .sk)(s))}else void 0!==s&&i.push((0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__/* .getCompatibleStyle */ .sk)(s));return i}static _$Eu(t,s){const i=s.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return (0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__/* .adoptStyles */ .Rf)(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,s,i){this._$AK(t,i)}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null}}requestUpdate(t,s,i,e=!1,h){if(void 0!==t){const r=this.constructor;if(!1===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),!0!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];!0!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e)}}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(s)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[d("elementProperties")]=new Map,y[d("finalized")]=new Map,p?.({ReactiveElement:y}),(a.reactiveElementVersions??=[]).push("2.1.2");
//# sourceMappingURL=reactive-element.js.map


/***/ },

/***/ 228
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AH: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.AH),
/* harmony export */   WF: () => (/* binding */ i),
/* harmony export */   qy: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.qy)
/* harmony export */ });
/* unused harmony export _$LE */
/* harmony import */ var _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(760);
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(752);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__/* .ReactiveElement */ .mN{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=(0,lit_html__WEBPACK_IMPORTED_MODULE_1__/* .render */ .XX)(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return lit_html__WEBPACK_IMPORTED_MODULE_1__/* .noChange */ .c0}}i._$litElement$=!0,i["finalized"]=!0,s.litElementHydrateSupport?.({LitElement:i});const o=s.litElementPolyfillSupport;o?.({LitElement:i});const n={_$AK:(t,e,r)=>{t._$AK(e,r)},_$AL:t=>t._$AL};(s.litElementVersions??=[]).push("4.2.2");
//# sourceMappingURL=lit-element.js.map


/***/ },

/***/ 752
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XX: () => (/* binding */ D),
/* harmony export */   c0: () => (/* binding */ E),
/* harmony export */   qy: () => (/* binding */ b),
/* harmony export */   s6: () => (/* binding */ A)
/* harmony export */ });
/* unused harmony exports _$LH, mathml, svg */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t=>t,s=t.trustedTypes,e=s?s.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o=`lit$${Math.random().toFixed(9).slice(2)}$`,n="?"+o,r=`<${n}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),w=x(2),T=x(3),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o+x):s+o+(-2===d?i:x)}return[V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t)}else t.startsWith(o)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o),i=t.length-1;if(i>0){r.textContent=s?s.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c())}}}else if(8===r.nodeType)if(r.data===n)d.push({type:2,index:l});else{let t=-1;for(;-1!==(t=r.data.indexOf(o,t+1));)d.push({type:7,index:l}),t+=o.length-1}l++}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,!0);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n]}o!==r?.index&&(h=P.nextNode(),o++)}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else{const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);t!==this._$AB;){const s=i(t).nextSibling;i(t).remove(),t=s}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r}o&&!e&&this.j(t)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}}class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const j={M:h,P:o,A:n,C:1,L:N,R,D:d,V:M,I:k,H,N:L,U:z,B:I,F:Z},B=t.litHtmlPolyfillSupport;B?.(S,k),(t.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{})}return h._$AI(t),h};
//# sourceMappingURL=lit-html.js.map


/***/ },

/***/ 161
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AH: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.AH),
/* harmony export */   WF: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.WF),
/* harmony export */   qy: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.qy)
/* harmony export */ });
/* harmony import */ var _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(760);
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(752);
/* harmony import */ var lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(228);

//# sourceMappingURL=index.js.map


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// UNUSED EXPORTS: Header

// EXTERNAL MODULE: ./node_modules/lit/index.js
var lit = __webpack_require__(161);
// EXTERNAL MODULE: ./src/iconBase.ts
var iconBase = __webpack_require__(378);
// EXTERNAL MODULE: external "SolidLogic"
var external_SolidLogic_ = __webpack_require__(892);
// EXTERNAL MODULE: ./src/v2/components/loginButton/index.ts + 2 modules
var loginButton = __webpack_require__(568);
// EXTERNAL MODULE: ./src/v2/components/signupButton/index.ts + 1 modules
var signupButton = __webpack_require__(765);
// EXTERNAL MODULE: ./node_modules/lit-html/lit-html.js
var lit_html = __webpack_require__(752);
;// ./node_modules/lit-html/directives/if-defined.js

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o=o=>o??lit_html/* nothing */.s6;
//# sourceMappingURL=if-defined.js.map

;// ./node_modules/lit/directives/if-defined.js

//# sourceMappingURL=if-defined.js.map

;// ./src/v2/components/header/Header.ts






const DEFAULT_HELP_MENU_ICON = '';
const DEFAULT_SOLID_ICON_URL = 'https://solidproject.org/assets/img/solid-emblem.svg';
const DEFAULT_SIGNUP_URL = 'https://solidproject.org/get_a_pod';
const DEFAULT_LOGGEDIN_MENU_BUTTON_AVATAR = iconBase/* icons */.Pt.iconBase + 'emptyProfileAvatar.png';
class Header extends lit/* LitElement */.WF {
  static properties = {
    logo: {
      type: String,
      reflect: true
    },
    helpIcon: {
      type: String,
      attribute: 'help-icon',
      reflect: true
    },
    layout: {
      type: String,
      reflect: true
    },
    theme: {
      type: String,
      reflect: true
    },
    brandLink: {
      type: String,
      attribute: 'brand-link',
      reflect: true
    },
    authState: {
      type: String,
      attribute: 'auth-state',
      reflect: true
    },
    loginAction: {
      type: Object,
      attribute: false
    },
    signUpAction: {
      type: Object,
      attribute: false
    },
    accountMenu: {
      type: Array,
      attribute: false
    },
    logoutLabel: {
      type: String,
      attribute: 'logout-label',
      reflect: true
    },
    logoutIcon: {
      type: String,
      attribute: 'logout-icon',
      reflect: true
    },
    accountIcon: {
      type: String,
      attribute: 'account-icon',
      reflect: true
    },
    accountAvatar: {
      type: String,
      attribute: 'account-avatar',
      reflect: true
    },
    accountAvatarFallback: {
      type: String,
      attribute: 'account-avatar-fallback',
      reflect: true
    },
    loginIcon: {
      type: String,
      attribute: 'login-icon',
      reflect: true
    },
    signUpIcon: {
      type: String,
      attribute: 'sign-up-icon',
      reflect: true
    },
    helpMenuList: {
      type: Array
    },
    accountMenuOpen: {
      state: true
    },
    helpMenuOpen: {
      state: true
    },
    hasSlottedAccountMenu: {
      state: true
    },
    hasSlottedHelpMenu: {
      state: true
    }
  };
  static styles = (0,lit/* css */.AH)`
  :host { // default theme
    display: block;
    --header-bg: var(--color-header-row-bg, #332746);
    --header-text: var(--color-header-text, #ffffff);
    --header-border: var(--color-border, #efecf3);
    --header-line: var(--color-header-menu-separator-line, #5e546d);
    --header-link: var(--color-text-heading, #000000);
    --header-menu-item-hover: var(--color-header-menu-item-hover, #e6dcff);
    --header-menu-item-selected: var(--color-header-menu-item-selected, #cbb9ff);
    --header-menu-bg: var(--color-menu-bg, #f6f5f9);
    --header-menu-loggedin-bg: var(--color-header-menu-loggedin-bg, #5e546d);
    --header-menu-text: var(--color-menu-item-text, #654d6c);
    --header-border-radius: var(--border-radius-sm, 0.2rem);
    --header-button-bg: var(--color-menu-bg, #ffffff);
    --header-button-text: var(--color-header-button-text, #0F172B);
    --header-button-detail-text: var(--color-header-button-detail-text, #99A1AF);
    --header-shadow: var(--color-header-shadow, 2px 6px 10px 0 rgba(0, 0, 0, 0.4), 2px 8px 24px 0 rgba(0, 0, 0, 0.19));
    font-family: var(--font-family-base, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif);
  }

  // for now light and dark are the same
  :host([theme='dark']) {
    display: block;
    --header-bg: var(--color-header-row-bg, #332746);
    --header-text: var(--color-header-text, #ffffff);
    --header-border: var(--color-border, #efecf3);
    --header-line: var(--color-header-menu-separator-line, #5e546d);
    --header-link: var(--color-text-heading, #000000);
    --header-menu-item-hover: var(--color-header-menu-item-hover, #e6dcff);
    --header-menu-item-selected: var(--color-header-menu-item-selected, #cbb9ff);
    --header-menu-bg: var(--color-menu-bg, #f6f5f9);
    --header-menu-loggedin-bg: var(--color-header-menu-loggedin-bg, #5e546d);
    --header-menu-text: var(--color-menu-item-text, #654d6c);
    --header-border-radius: var(--border-radius-sm, 0.2rem);
    --header-button-bg: var(--color-menu-bg, #ffffff);
    --header-button-text: var(--color-header-button-text, #0f172a);
    --header-button-detail-text: var(--color-header-button-detail-text, #878192);
    --header-icon-filter: invert(1) brightness(1.3); /* special way to invert SVG color of icons, from white to black */
    --header-shadow: var(--color-header-shadow, 2px 6px 10px 0 rgba(0, 0, 0, 0.4), 2px 8px 24px 0 rgba(0, 0, 0, 0.19));
    font-family: var(--font-family-base, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif);
  }

  :host([layout='mobile']) .headerInner {
    flex-wrap: wrap;
    text-align: center;
    gap: 0.5rem;
  }

  .headerInner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--header-bg);
    color: var(--header-text);
    padding: 0 1.5rem;
    height: 3.75rem;
  }

  ::slotted([slot='navigation-toggle']) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-right: 0.75rem;
  }

  :host([layout='desktop']) ::slotted([slot='navigation-toggle']) {
    display: none !important;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: inherit;
  }

  .brand-not-displayed {
    display: none;
  }

  .brand img {
    height: 50px;
    width: 55px;
    object-fit: contain;
  }

  .menu {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    margin-left: auto;
  }

  .auth-actions {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .auth-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 2.25rem;
    padding: 0.5rem 0.875rem;
    border: 1px solid var(--header-border);
    border-radius: 999px;
    background: var(--header-menu-bg);
    color: var(--header-button-text);
    cursor: pointer;
    font: inherit;
    line-height: 1;
    text-decoration: none;
    box-sizing: border-box;
    transition: border-color 0.2s ease, transform 0.2s ease;
  }

  .auth-button:hover {
    border-color: var(--header-menu-item-hover);
  }

  .auth-button:active {
    transform: translateY(1px);
  }

  .auth-button-sign-up {
    background: color-mix(in srgb, var(--header-menu-bg) 78%, var(--header-menu-item-selected) 22%);
  }

  .header-menu-separator {
    background: var(--header-line);
    width: 1px;
    height: 2.3rem;
  }

  .account-menu-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .account-menu-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    min-height: 2.5rem;
    border: 1px solid var(--header-menu-loggedin-bg);
    border-radius: 999px;
    background: var(--header-menu-loggedin-bg);
    color: var(--header-button-text);
    cursor: pointer;
    font: inherit;
    line-height: 1;
  }

  :host([layout='mobile']) .account-menu-trigger {
    gap: 0;
    min-height: auto;
    padding: 0;
    border: 1.5px solid var(--header-border);
    background: var(--header-menu-loggedin-bg);
  }

  :host([layout='mobile']) .account-menu-trigger-label {
    display: none;
  }

  .account-menu-trigger:disabled {
    cursor: default;
    opacity: 0.7;
  }

  .account-menu-trigger-icon {
    width: 1rem;
    height: 1rem;
    object-fit: contain;
    flex-shrink: 0;
  }

  .account-avatar,
  .account-menu-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    background: color-mix(in srgb, var(--header-bg) 18%, #ded8e7 82%);
    color: var(--header-button-text);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .account-avatar {
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 999px;
    border: 1.5px solid var(--header-border);
  }

  .account-menu-avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
  }

  .account-avatar img,
  .account-menu-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .account-avatar-img {
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 999px;
    object-fit: cover;
    background-color: var(--header-border);
  }

  .account-dropdown {
    position: absolute;
    top: calc(100% + 0.9rem);
    right: 0;
    min-width: 15rem;
    padding: 0.5rem;
    background: var(--header-button-bg);
    border: 1px solid var(--header-border);
    border-radius: var(--header-border-radius);
    box-shadow: var(--header-shadow);
    z-index: 10;
  }

  .account-dropdown[hidden] {
    display: none;
  }

  .account-menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .account-menu-item-link,
  .account-menu-item-button,
  ::slotted([slot='account-menu']) {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    width: 100%;
    box-sizing: border-box;
    color: var(--header-link);
    text-decoration: none;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 0.5rem;
    cursor: pointer;
    font: inherit;
    text-align: left;
  }

  .account-menu-item-link:hover,
  .account-menu-item-button:hover {
    color: var(--header-link);
    background: var(--header-menu-item-hover);
    border-color: var(--header-menu-item-hover);
  }

  .account-menu-item-link:active,
  .account-menu-item-button:active {
    color: var(--header-link);
    background: var(--header-menu-item-selected);
    border-color: var(--header-menu-item-selected);
    transform: translateY(1px);
  }

  .account-switch {
    display: block;
    width: 100%;
    color: var(--header-menu-text);
    text-align: left;
    text-transform: uppercase;
    font-size: 80%;
  }

  .dropdown-menu-separator {
    display: block;
    width: calc(100% + 1rem);
    margin: 0.5rem -0.5rem;
    border: 0;
    border-top: 1px solid var(--header-border);
  }

  .account-menu-copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .account-menu-label {
    color: var(--header-button-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .account-menu-webid {
    color: var(--header-button-detail-text);
    font-size: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .help-menu-container {
    position: relative;
    display: flex;
    align-items: center;
    background: transparent;
  }

  .help-menu-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .help-menu-trigger:disabled {
    cursor: default;
  }

  .help-dropdown {
    position: absolute;
    top: calc(100% + 0.9rem);
    right: 0;
    min-width: 12rem;
    padding: 0.5rem;
    background: var(--header-button-bg);
    border: 1px solid var(--header-border);
    border-radius: var(--header-border-radius);
    box-shadow: var(--header-shadow);
    z-index: 10;
  }

  .help-dropdown[hidden] {
    display: none;
  }

  .help-dropdown-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .help-menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .help-menu-list a,
  .help-menu-list button,
  ::slotted([slot='help-menu']) {
    display: block;
    width: 100%;
    box-sizing: border-box;
    color: var(--header-link);
    text-decoration: none;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 0.375rem 0.5rem;
    cursor: pointer;
    font: inherit;
    text-align: left;
  }

  .help-menu-list a:hover,
  .help-menu-list button:hover {
    color: var(--header-link);
    background: var(--header-menu-item-hover);
    border-color: var(--header-menu-item-hover);
  }

  .help-menu-list a:active,
  .help-menu-list button:active {
    color: var(--header-link);
    background: var(--header-menu-item-selected);
    border-color: var(--header-menu-item-selected);
    transform: translateY(1px);
  }

  ::slotted(a), ::slotted(button) {
    color: var(--header-link);
    text-decoration: none;
    background: var(--header-button-bg);
    border: 1px solid var(--header-border);
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    font: inherit;
  }

  .help-icon {
    width: 35px;
    height: 35px;
    cursor: pointer;
  }

  .help-text {
    color: var(--header-text, #ffffff);
    font: inherit;
  }

  .logout-action-icon {
    width: 16px;
    height: 16px;
    display: inline-block;
    object-fit: contain;
    margin-right: 0.5rem;
  }
  `;
  constructor() {
    super();
    this.logo = DEFAULT_SOLID_ICON_URL;
    this.helpIcon = DEFAULT_HELP_MENU_ICON;
    this.layout = 'desktop';
    this.theme = 'light';
    this.brandLink = '#';
    this.authState = 'logged-out';
    this.loginAction = {
      label: 'Log In',
      action: 'login'
    };
    this.signUpAction = {
      label: 'Sign Up',
      action: 'sign-up',
      url: DEFAULT_SIGNUP_URL
    };
    this.accountMenu = [];
    this.logoutLabel = 'Log Out';
    this.logoutIcon = '';
    this.accountIcon = '▼';
    this.accountAvatar = '';
    this.accountAvatarFallback = '';
    this.loginIcon = '';
    this.signUpIcon = '';
    this.helpMenuList = [];
    this.accountMenuOpen = false;
    this.helpMenuOpen = false;
    this.hasSlottedAccountMenu = false;
    this.hasSlottedHelpMenu = false;
  }
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleDocumentClick);
    window.addEventListener('keydown', this.handleWindowKeydown);
  }
  disconnectedCallback() {
    document.removeEventListener('click', this.handleDocumentClick);
    window.removeEventListener('keydown', this.handleWindowKeydown);
    super.disconnectedCallback();
  }
  handleHelpMenuClick(item, event) {
    event.preventDefault();
    this.helpMenuOpen = false;
    this.dispatchEvent(new CustomEvent('help-menu-select', {
      detail: item,
      bubbles: true,
      composed: true
    }));
    if (item.url) {
      const target = item.target || '_blank';
      const features = target === '_blank' ? 'noopener,noreferrer' : undefined;
      window.open(item.url, target, features);
    }
  }
  handleAccountMenuClick(item) {
    this.accountMenuOpen = false;
    this.dispatchEvent(new CustomEvent('account-menu-select', {
      detail: item,
      bubbles: true,
      composed: true
    }));
  }
  handleDocumentClick = event => {
    if (!event.composedPath().includes(this)) {
      this.accountMenuOpen = false;
      this.helpMenuOpen = false;
    }
  };
  handleWindowKeydown = event => {
    if (event.key === 'Escape' && (this.accountMenuOpen || this.helpMenuOpen)) {
      this.accountMenuOpen = false;
      this.helpMenuOpen = false;
    }
  };
  handleAccountSlotChange(event) {
    const slot = event.target;
    this.hasSlottedAccountMenu = slot.assignedElements({
      flatten: true
    }).length > 0;
  }
  handleHelpSlotChange(event) {
    const slot = event.target;
    this.hasSlottedHelpMenu = slot.assignedElements({
      flatten: true
    }).length > 0;
  }
  toggleAccountMenu(event) {
    event.preventDefault();
    if (!this.hasAccountMenuItems()) return;
    this.helpMenuOpen = false;
    this.accountMenuOpen = !this.accountMenuOpen;
  }
  toggleHelpMenu(event) {
    event.preventDefault();
    if (!this.hasHelpMenuItems()) return;
    this.accountMenuOpen = false;
    this.helpMenuOpen = !this.helpMenuOpen;
  }
  hasAccountMenuItems() {
    return Boolean(this.accountMenu?.length || this.hasSlottedAccountMenu || this.logoutLabel);
  }
  hasHelpMenuItems() {
    return Boolean(this.helpMenuList?.length || this.hasSlottedHelpMenu);
  }
  shouldRenderHelpMenu() {
    return this.layout !== 'mobile' && this.hasHelpMenuItems();
  }
  renderLoggedInAvatar(avatar, wrapperClass = 'account-avatar') {
    const hasAvatar = Boolean(avatar);
    const imageSrc = hasAvatar ? avatar : this.accountAvatarFallback || DEFAULT_LOGGEDIN_MENU_BUTTON_AVATAR;
    const imageAlt = hasAvatar ? 'Profile Avatar' : 'Default Avatar';
    if (this.layout === 'mobile' && wrapperClass === 'account-avatar') {
      return (0,lit/* html */.qy)`<img class="account-avatar-img" src="${imageSrc}" alt="${imageAlt}" />`;
    }
    return (0,lit/* html */.qy)`
      <span class="${wrapperClass}" aria-hidden="true">
        <img src="${imageSrc}" alt="${imageAlt}" />
      </span>
    `;
  }
  renderLoggedOutActions() {
    return (0,lit/* html */.qy)`
      <div class="auth-actions" part="auth-actions">
        <slot name="login-action">
          <solid-ui-login-button
            label="${this.loginAction.label}"
            icon=${o(this.layout !== 'mobile' ? this.loginIcon || this.loginAction.icon : undefined)}
            layout="${this.layout}"
            theme="${this.theme}"
            part="login-action"
            @login-success="${() => this.handleLoginSuccess()}"
          ></solid-ui-login-button>
        </slot>
        <slot name="sign-up-action">
          <solid-ui-signup-button
            label="${this.signUpAction.label}"
            signup-url="${o(this.signUpAction.url)}"
            layout="${this.layout}"
            .icon=${o(this.layout !== 'mobile' ? this.signUpIcon || this.signUpAction.icon : undefined)}
            theme="${this.theme}"
            part="sign-up-action"
          ></solid-ui-signup-button>
        </slot>
      </div>
    `;
  }
  handleLoginSuccess() {
    this.authState = 'logged-in';
    this.dispatchEvent(new CustomEvent('auth-action-select', {
      detail: {
        role: 'login'
      },
      bubbles: true,
      composed: true
    }));
  }
  async handleLogout() {
    this.accountMenuOpen = false;
    try {
      await external_SolidLogic_.authSession.logout();
    } catch (_err) {
      // logout errors are non-fatal — proceed to clear state
    }
    this.authState = 'logged-out';
    this.dispatchEvent(new CustomEvent('logout-select', {
      detail: {
        role: 'logout'
      },
      bubbles: true,
      composed: true
    }));
  }
  renderAccountMenuItem(item) {
    const content = (0,lit/* html */.qy)`
      ${this.renderLoggedInAvatar(item.avatar, 'account-menu-avatar')}
      <span class="account-menu-copy">
        <span class="account-menu-label">${item.label}</span>
        ${item.webid && this.layout !== 'mobile' ? (0,lit/* html */.qy)`<span class="account-menu-webid">${item.webid}</span>` : ''}
      </span>
    `;
    if (item.url) {
      return (0,lit/* html */.qy)`
        <a
          class="account-menu-item-link"
          href="${item.url}"
          @click="${() => this.handleAccountMenuClick(item)}"
          part="account-menu-item"
          role="menuitem"
        >
          ${content}
        </a>
      `;
    }
    return (0,lit/* html */.qy)`
      <button
        class="account-menu-item-button"
        type="button"
        @click="${() => this.handleAccountMenuClick(item)}"
        part="account-menu-item"
        role="menuitem"
      >
        ${content}
      </button>
    `;
  }
  renderLoggedInActions() {
    return (0,lit/* html */.qy)`
      <div class="account-menu-container" part="account-menu-container">
        <slot name="account-trigger">
          <button
            id="accountMenuTrigger"
            class="account-menu-trigger"
            type="button"
            aria-haspopup="menu"
            aria-expanded="${this.accountMenuOpen ? 'true' : 'false'}"
            ?disabled="${!this.hasAccountMenuItems()}"
            @click="${e => this.toggleAccountMenu(e)}"
            part="account-menu-trigger"
          >
            ${this.renderLoggedInAvatar(this.accountAvatar)}
            ${this.layout !== 'mobile' && this.accountIcon ? (0,lit/* html */.qy)`
              <img class="account-menu-trigger-icon" src="${this.accountIcon}" alt="" aria-hidden="true" />` : ''}
          </button>
        </slot>

        <nav
          id="accountMenu"
          class="account-dropdown"
          role="menu"
          ?inert="${!this.accountMenuOpen || !this.hasAccountMenuItems()}"
          ?hidden="${!this.accountMenuOpen || !this.hasAccountMenuItems()}"
          part="account-dropdown"
        >
          <slot name="account-switch" class="account-switch">Switch account</slot>
          <hr class="dropdown-menu-separator" />
          <slot name="account-menu" @slotchange="${e => this.handleAccountSlotChange(e)}"></slot>
          ${this.accountMenu && this.accountMenu.length ? (0,lit/* html */.qy)`
            <ul class="account-menu-list">
              ${this.accountMenu.map(item => (0,lit/* html */.qy)`
                <li>${this.renderAccountMenuItem(item)}</li>
              `)}
            </ul>
          ` : ''}
          ${this.logoutLabel ? (0,lit/* html */.qy)`
            <hr class="dropdown-menu-separator" />
            <button
              class="account-menu-item-button"
              type="button"
              @click="${() => this.handleLogout()}"
              part="logout-action"
              role="menuitem"
            >
              ${this.logoutIcon && this.layout !== 'mobile' ? (0,lit/* html */.qy)`<img class="logout-action-icon" src="${this.logoutIcon}" alt="" aria-hidden="true" part="logout-action-icon" />` : ''}
              ${this.logoutLabel}
            </button>
          ` : ''}
        </nav>
      </div>
    `;
  }
  renderUserArea() {
    if (this.authState === 'logged-out') {
      return this.renderLoggedOutActions();
    }
    return this.renderLoggedInActions();
  }
  firstUpdated() {
    const brandLink = this.shadowRoot?.getElementById('brandLink');
    if (brandLink) {
      brandLink.classList.toggle('brand-not-displayed', this.layout === 'mobile');
    }
  }
  updated(changedProperties) {
    if (changedProperties.has('layout')) {
      const brandLink = this.shadowRoot?.getElementById('brandLink');
      if (brandLink) {
        brandLink.classList.toggle('brand-not-displayed', this.layout === 'mobile');
      }
    }
  }
  render() {
    return (0,lit/* html */.qy)`
      <div class="headerInner">
        <slot name="navigation-toggle"></slot>
        <a
          id="brandLink"
          class="brand"
          href="${this.brandLink}"
          part="brand"
        >
          <img id="brandImg" src="${this.logo}" alt="Logo" part="logo" />
        </a>

        <div class="menu" part="menu">
          ${this.renderUserArea()}

          ${this.shouldRenderHelpMenu() ? (0,lit/* html */.qy)`
            <div class="header-menu-separator" />` : ''}

          ${this.shouldRenderHelpMenu() ? (0,lit/* html */.qy)`
            <div class="help-menu-container" part="help-menu-container">
              <button
                id="helpMenuTrigger"
                class="help-menu-trigger"
                type="button"
                aria-haspopup="menu"
                aria-expanded="${this.helpMenuOpen ? 'true' : 'false'}"
                ?disabled="${!this.hasHelpMenuItems()}"
                @click="${e => this.toggleHelpMenu(e)}"
                part="help-menu-trigger"
              >
                ${this.helpIcon ? (0,lit/* html */.qy)`<img id="helpIcon" class="help-icon" src="${this.helpIcon}" alt="Help" part="help-icon" />` : (0,lit/* html */.qy)`<span class="help-text" part="help-text">Help</span>`}
              </button>

            <nav
              id="helpMenu"
              class="help-dropdown"
              role="menu"
              ?inert="${!this.helpMenuOpen || !this.hasHelpMenuItems()}"
              ?hidden="${!this.helpMenuOpen || !this.hasHelpMenuItems()}"
              part="help-dropdown"
            >
              <div class="help-dropdown-content" @click="${() => {
      this.helpMenuOpen = false;
    }}">
                <slot name="help-menu" @slotchange="${e => this.handleHelpSlotChange(e)}"></slot>
                ${this.helpMenuList && this.helpMenuList.length ? (0,lit/* html */.qy)`
                  <ul class="help-menu-list">
                    ${this.helpMenuList.map(item => (0,lit/* html */.qy)`
                      <li>
                        ${item.url ? (0,lit/* html */.qy)`
                          <a
                            href="${item.url}"
                            target="${item.target || '_blank'}"
                            rel="${o((item.target || '_blank') === '_blank' ? 'noopener noreferrer' : undefined)}"
                            @click="${e => this.handleHelpMenuClick(item, e)}"
                            part="help-menu-item"
                            role="menuitem"
                          >
                            ${item.label}
                          </a>
                        ` : (0,lit/* html */.qy)`
                          <button
                            type="button"
                            @click="${e => this.handleHelpMenuClick(item, e)}"
                            part="help-menu-item"
                            role="menuitem"
                          >
                            ${item.label}
                          </button>
                        `}
                      </li>
                    `)}
                  </ul>
                ` : ''}
              </div>
            </nav>
          </div>` : ''}
        </div>
      </div>
    `;
  }
}
;// ./src/v2/components/header/index.ts


const HEADER_TAG_NAME = 'solid-ui-header';
if (!customElements.get(HEADER_TAG_NAME)) {
  customElements.define(HEADER_TAG_NAME, Header);
}
/******/ })()
;
//# sourceMappingURL=index.js.map