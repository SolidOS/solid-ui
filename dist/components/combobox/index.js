/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

// UNUSED EXPORTS: Combobox

;// ./node_modules/@lit/reactive-element/css-tag.js
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o.set(s,t))}return t}toString(){return this.cssText}}const r=t=>new n("string"==typeof t?t:t+"",void 0,s),i=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n(o,t,s)},S=(s,o)=>{if(e)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o)}},c=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r(e)})(t):t;
//# sourceMappingURL=css-tag.js.map

;// ./node_modules/@lit/reactive-element/reactive-element.js

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:reactive_element_i,defineProperty:reactive_element_e,getOwnPropertyDescriptor:h,getOwnPropertyNames:reactive_element_r,getOwnPropertySymbols:reactive_element_o,getPrototypeOf:reactive_element_n}=Object,a=globalThis,reactive_element_c=a.trustedTypes,l=reactive_element_c?reactive_element_c.emptyScript:"",p=a.reactiveElementPolyfillSupport,d=(t,s)=>t,u={toAttribute(t,s){switch(s){case Boolean:t=t?l:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},f=(t,s)=>!reactive_element_i(t,s),b={attribute:!0,type:String,converter:u,reflect:!1,useDefault:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),a.litPropertyMetadata??=new WeakMap;class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&reactive_element_e(this.prototype,t,h)}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t}};return{get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d("elementProperties")))return;const t=reactive_element_n(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(d("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d("properties"))){const t=this.properties,s=[...reactive_element_r(t),...reactive_element_o(t)];for(const i of s)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c(s))}else void 0!==s&&i.push(c(s));return i}static _$Eu(t,s){const i=s.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,s,i){this._$AK(t,i)}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null}}requestUpdate(t,s,i,e=!1,h){if(void 0!==t){const r=this.constructor;if(!1===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),!0!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];!0!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e)}}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(s)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[d("elementProperties")]=new Map,y[d("finalized")]=new Map,p?.({ReactiveElement:y}),(a.reactiveElementVersions??=[]).push("2.1.2");
//# sourceMappingURL=reactive-element.js.map

;// ./node_modules/lit-html/lit-html.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lit_html_t=globalThis,lit_html_i=t=>t,lit_html_s=lit_html_t.trustedTypes,lit_html_e=lit_html_s?lit_html_s.createPolicy("lit-html",{createHTML:t=>t}):void 0,lit_html_h="$lit$",lit_html_o=`lit$${Math.random().toFixed(9).slice(2)}$`,lit_html_n="?"+lit_html_o,lit_html_r=`<${lit_html_n}>`,lit_html_l=document,lit_html_c=()=>lit_html_l.createComment(""),lit_html_a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,lit_html_u=Array.isArray,lit_html_d=t=>lit_html_u(t)||"function"==typeof t?.[Symbol.iterator],lit_html_f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,lit_html_p=RegExp(`>|${lit_html_f}(?:([^\\s"'>=/]+)(${lit_html_f}*=${lit_html_f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,lit_html_y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),lit_html_b=x(1),w=x(2),T=x(3),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=lit_html_l.createTreeWalker(lit_html_l,129);function V(t,i){if(!lit_html_u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==lit_html_e?lit_html_e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(lit_html_y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=lit_html_p):void 0!==u[3]&&(c=lit_html_p):c===lit_html_p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?lit_html_p:'"'===u[3]?$:g):c===$||c===g?c=lit_html_p:c===_||c===m?c=v:(c=lit_html_p,n=void 0);const x=c===lit_html_p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+lit_html_r:d>=0?(e.push(a),s.slice(0,d)+lit_html_h+s.slice(d)+lit_html_o+x):s+lit_html_o+(-2===d?i:x)}return[V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class lit_html_S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=lit_html_S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(lit_html_h)){const i=v[a++],s=r.getAttribute(t).split(lit_html_o),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t)}else t.startsWith(lit_html_o)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(lit_html_y.test(r.tagName)){const t=r.textContent.split(lit_html_o),i=t.length-1;if(i>0){r.textContent=lit_html_s?lit_html_s.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],lit_html_c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],lit_html_c())}}}else if(8===r.nodeType)if(r.data===lit_html_n)d.push({type:2,index:l});else{let t=-1;for(;-1!==(t=r.data.indexOf(lit_html_o,t+1));)d.push({type:7,index:l}),t+=lit_html_o.length-1}l++}}static createElement(t,i){const s=lit_html_l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=lit_html_a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??lit_html_l).importNode(i,!0);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n]}o!==r?.index&&(h=P.nextNode(),o++)}return P.currentNode=lit_html_l,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),lit_html_a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):lit_html_d(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==A&&lit_html_a(this._$AH)?this._$AA.nextSibling.data=t:this.T(lit_html_l.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=lit_html_S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else{const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new lit_html_S(t)),i}k(t){lit_html_u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(lit_html_c()),this.O(lit_html_c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);t!==this._$AB;){const s=lit_html_i(t).nextSibling;lit_html_i(t).remove(),t=s}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=M(this,t,i,0),o=!lit_html_a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!lit_html_a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r}o&&!e&&this.j(t)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}}class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const j={M:lit_html_h,P:lit_html_o,A:lit_html_n,C:1,L:N,R,D:lit_html_d,V:M,I:k,H,N:L,U:z,B:I,F:Z},B=lit_html_t.litHtmlPolyfillSupport;B?.(lit_html_S,k),(lit_html_t.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(lit_html_c(),t),t,void 0,s??{})}return h._$AI(t),h};
//# sourceMappingURL=lit-html.js.map

;// ./node_modules/lit-element/lit-element.js

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lit_element_s=globalThis;class lit_element_i extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}}lit_element_i._$litElement$=!0,lit_element_i["finalized"]=!0,lit_element_s.litElementHydrateSupport?.({LitElement:lit_element_i});const lit_element_o=lit_element_s.litElementPolyfillSupport;lit_element_o?.({LitElement:lit_element_i});const lit_element_n={_$AK:(t,e,r)=>{t._$AK(e,r)},_$AL:t=>t._$AL};(lit_element_s.litElementVersions??=[]).push("4.2.2");
//# sourceMappingURL=lit-element.js.map

;// ./node_modules/lit/index.js

//# sourceMappingURL=index.js.map

;// ./node_modules/lit/html.js

//# sourceMappingURL=html.js.map

;// ./src/v2/components/forms/shared/downArrow.ts

const downArrowIcon = lit_html_b`
  <svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 7"
    fill="none"
  >
    <path d="M0.679688 0.678955L5.50729 5.50656L10.3349 0.678955" stroke="#6A7282" stroke-width="1.35776" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;
;// ./src/v2/components/forms/shared/listboxStyles.ts

const listboxStyles = i`
  :host { /* default theme */
      --input-background: var(--color-background, #F8F9FB);
      --item-text: var(--color-text-heading, #000000);
      --item-selected-text: var(--color-primary, #7c4dff);
      --item-hover-background: var(--color-header-menu-item-hover, #e6dcff);
      --item-selected-background: var(--color-header-menu-item-selected, #cbb9ff);
      --listbox-z-index: 1;
    }

    :host([theme='dark']) {
      --input-background: var(--color-background, #1A1A1A);
      --item-text: var(--color-text-heading, #F8F9FB);
      --item-selected-text: var(--color-primary, #7c4dff);
      --item-hover-background: var(--color-header-menu-item-hover, #e6dcff);
      --item-selected-background: var(--color-header-menu-item-selected, #cbb9ff);
      --listbox-z-index: 1;
    }

    .listbox {
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      gap: 0.0625rem;
      margin: 0;
      padding: 0;
      list-style: none;
      border: none;
      border-radius: inherit;
      background: var(--input-background);
      background-color: var(--input-background);
      opacity: 1;
      overflow: hidden;
      padding: 0.25rem;
      z-index: var(--listbox-z-index);
      box-shadow: 0 4px 12px rgba(124, 77, 255, 0.12);
    }

    .listbox-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-2xs, 0.625rem);
      width: 100%;
      min-height: calc(var(--font-size-sm, 0.875rem) + 1rem);
      padding: 0.5rem var(--spacing-xs, 0.75rem);
      border: none;
      border-radius: var(--border-radius-sm, 0.2rem);
      background: transparent;
      color: var(--item-text);
      cursor: pointer;
      font: inherit;
      font-size: var(--font-size-sm, 0.875rem);
      font-weight: var(--font-weight-normal, 400);
      line-height: normal;
      text-align: left;
      text-decoration: none;
      box-sizing: border-box;
    }

    .listbox-item:hover {
      background: var(--item-hover-background);
      border-radius: var(--border-radius-sm, 0.2rem);
    }

    .listbox-item:focus {
      background: var(--item-hover-background);
      border-radius: var(--border-radius-sm, 0.2rem);
    }

    .listbox-item-active {
      background: var(--item-selected-background);
      color: var(--item-selected-text);
      border-radius: var(--border-radius-sm, 0.2rem);
      outline: none;
    }

    .listbox-item-active:hover,
    .listbox-item-active:focus {
      color: var(--item-text);
    }

    .listbox-item-disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .listbox-item-disabled:hover {
      background: transparent;
      border-radius: 0;
    }
`;
;// ./src/v2/components/forms/shared/keyboard.ts
/* Move up or down, skip disabled options */
function getNextEnabledIndex(currentIndex, options, direction) {
  if (!options.length) {
    return -1;
  }
  if (options.every(option => option.disabled)) {
    return -1;
  }
  const optionsCount = options.length;
  let nextIndex = currentIndex;
  do {
    nextIndex = (nextIndex + direction + optionsCount) % optionsCount;
  } while (options[nextIndex].disabled);
  return nextIndex;
}

/* Handle 'Home' and 'End' keys and initial highlight */
function getFirstEnabledIndex(options) {
  if (!options.length) {
    return -1;
  }
  return getNextEnabledIndex(-1, options, 1);
}
function getLastEnabledIndex(options) {
  if (!options.length) {
    return -1;
  }
  return getNextEnabledIndex(options.length, options, -1);
}

/* Sync current value to active index */
function findOptionIndexByValue(options, value) {
  if (value === undefined) {
    return -1;
  }
  return options.findIndex(option => option.value === value);
}

/* Map keyboard events to actions */
function getListboxActionFromKey(key) {
  switch (key) {
    case 'ArrowDown':
      return 'next';
    case 'ArrowUp':
      return 'previous';
    case 'Home':
      return 'first';
    case 'End':
      return 'last';
    case 'Enter':
    case ' ':
      return 'select';
    case 'Escape':
      return 'close';
    default:
      return 'none';
  }
}
;// ./src/v2/components/forms/shared/listboxTemplate.ts

function renderListbox(args) {
  const {
    options,
    selectedOption,
    activeOption,
    listboxId,
    getOptionId,
    onOptionSelect
  } = args;
  return lit_html_b`
    <ul
      class="listbox"
      id="${listboxId ?? ''}"
      part="listbox"
      role="listbox"
      aria-orientation="vertical"
    >
      ${options.map((option, index) => {
    const isSelected = option.value === selectedOption?.value;
    const isActive = option.value === activeOption?.value;
    const optionId = getOptionId?.(option, index);
    return lit_html_b`
          <li
            id="${optionId ?? ''}"
            class="listbox-item${isSelected ? ' listbox-item-selected' : ''}${isActive ? ' listbox-item-active' : ''}${option.disabled ? ' listbox-item-disabled' : ''}"
            part="option${isSelected ? ' selected-option' : ''}${isActive ? ' active-option' : ''}${option.disabled ? ' disabled-option' : ''}"
            role="option"
            aria-selected="${isSelected}"
            aria-disabled="${option.disabled ? 'true' : 'false'}"
            @click="${() => {
      if (!option.disabled) {
        onOptionSelect(option);
      }
    }}"
          >
            ${option.label}
          </li>
        `;
  })}
    </ul>
  `;
}
;// ./src/v2/components/forms/combobox/Combobox.ts






class Combobox extends lit_element_i {
  static _nextId = 0;
  _popupPortalHost = null;
  _popupPortalRoot = null;
  _popupPortalContainer = null;
  _handleDocumentPointerDown = event => {
    const eventTarget = event.target;
    if (!this._popupOpen || !(eventTarget instanceof Node)) {
      return;
    }
    const eventPath = 'composedPath' in event ? event.composedPath() : [];
    if (eventPath.includes(this)) {
      return;
    }
    if (this._popupPortalHost && eventPath.includes(this._popupPortalHost) || this._popupPortalRoot && eventPath.includes(this._popupPortalRoot)) {
      return;
    }
    if (!this.contains(eventTarget)) {
      this._closePopup();
    }
  };
  _handleViewportChange = () => {
    if (!this._popupOpen) return;
    this._updatePopupPosition();
  };
  suggestionProvider;
  static properties = {
    label: {
      type: String,
      reflect: true
    },
    placeholder: {
      type: String,
      reflect: true
    },
    theme: {
      type: String,
      reflect: true
    },
    layout: {
      type: String,
      reflect: true
    },
    value: {
      type: String,
      reflect: true
    },
    inputValue: {
      type: String
    },
    options: {
      type: Array,
      attribute: false
    },
    _popupOpen: {
      state: true
    },
    _activeIndex: {
      state: true
    }
  };
  static styles = [listboxStyles, i`
    :host {
      /* default theme */
      display: block;
      width: 100%;
      min-width: 0;
      max-width: 100%;
      position: relative;
      box-sizing: border-box;
      --popup-background: var(--color-background, #F8F9FB);
      --popup-text: var(--color-text, #1A1A1A);
      --popup-border: var(--color-border, #E5E7EB);
      --popup-shadow: var(--box-shadow-sm, 0 1px 4px rgba(124,77,255,0.12));
      --input-background: var(--color-background, #F8F9FB);
      --input-text: var(--color-text, #1A1A1A);
      --input-border: var(--color-border-button-hover, var(--gray-400, #99A1AF));
      --label-color: var(--grey-purple-700, #1A1A1A);
      --placeholder-color: var(--grey-purple-700, #5e546d);
      --combobox-input-height: var(--select-trigger-height, var(--min-touch-target, 44px));
      --combobox-input-inline-padding: var(--select-trigger-inline-padding, var(--spacing-2xs, 0.625rem));
      --combobox-input-block-padding: var(--spacing-xxs, 0.3125rem);
    }

    :host([theme='dark']) {
      display: block;
      width: 100%;
      min-width: 0;
      max-width: 100%;
      position: relative;
      box-sizing: border-box;
      --popup-background: var(--color-background, #F8F9FB);
      --popup-text: var(--color-text, #1A1A1A);
      --popup-border: var(--color-border, #E5E7EB);
      --popup-shadow: var(--box-shadow-sm, 0 1px 4px rgba(124,77,255,0.12));
      --input-background: var(--color-background, #F8F9FB);
      --input-text: var(--color-text, #1A1A1A);
      --input-border: var(--color-border-button-hover, var(--gray-400, #99A1AF));
      --label-color: var(--grey-purple-700, #1A1A1A);
      --placeholder-color: var(--grey-purple-700, #5e546d);
      --combobox-input-height: var(--select-trigger-height, var(--min-touch-target, 44px));
      --combobox-input-inline-padding: var(--select-trigger-inline-padding, var(--spacing-2xs, 0.625rem));
      --combobox-input-block-padding: var(--spacing-xxs, 0.3125rem);
    }

    .popup-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: var(--popup-background);
      color: var(--popup-text);
      box-shadow: var(--popup-shadow);
      border: 1px solid var(--popup-border);
      border-radius: var(--border-radius-md, 0.5rem);
      min-width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      isolation: isolate;
    }

    .select-options-section {
      position: relative;
      background: var(--popup-background);
      border-radius: inherit;
      isolation: isolate;
    }

    .combobox-root {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .text-label {
      color: var(--label-color);
      margin-bottom: 6px;
    }

    .input-field-row {
      display: flex;
      flex-direction: row;
      position: relative;
      width: 100%;
      min-width: 0;
    }

    .text-input {
      display: block;
      flex: 1;
      width: 100%;
      min-width: 0;
      min-height: var(--combobox-input-height);
      height: var(--combobox-input-height);
      padding: var(--combobox-input-block-padding) calc(26px + (var(--combobox-input-inline-padding) * 2) + 6px) var(--combobox-input-block-padding) var(--combobox-input-inline-padding);
      border: 1px solid var(--input-border);
      border-radius: var(--border-radius-base, 0.3125rem);
      background: var(--input-background);
      color: var(--input-text);
      font: inherit;
      font-size: var(--font-size-sm, 0.875rem);
      font-weight: var(--font-weight-md, 500);
      line-height: normal;
      appearance: none;
      -webkit-appearance: none;
      box-sizing: border-box;
    }

    .text-input::placeholder {
      color: var(--placeholder-color);
    }

    .text-input:focus-visible {
      outline: 2px solid var(--color-focus-ring, var(--color-primary, #7C4DFF));
      outline-offset: 2px;
    }

    .dropdown-toggle {
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

    .dropdown-toggle:hover {
      background: var(--color-header-menu-item-hover, #e6dcff);
    }

    .input-field-row:focus-within .dropdown-toggle {
      background: var(--color-header-menu-item-hover, #e6dcff);
    }

    .dropdown-toggle:focus-visible {
      outline: 2px solid var(--color-focus-ring, var(--color-primary, #7C4DFF));
      outline-offset: 2px;
      background: var(--color-header-menu-item-hover, #e6dcff);
    }

    .dropdown-toggle svg {
      width: 14px;
      height: 14px;
      display: block;
    }
  }
  `];
  _inputId = `solid-ui-combobox-input-${Combobox._nextId++}`;
  _listboxId = `solid-ui-combobox-listbox-${Combobox._nextId++}`;
  _suggestionRequestId = 0;
  constructor() {
    super();
    this.label = 'Select an option';
    this.placeholder = 'Type to search';
    this.theme = 'light';
    this.layout = 'desktop';
    this.options = [];
    this.value = '';
    this.inputValue = '';
    this._popupOpen = false;
    this._activeIndex = -1;
  }
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('pointerdown', this._handleDocumentPointerDown);
    window.addEventListener('resize', this._handleViewportChange);
    window.addEventListener('scroll', this._handleViewportChange, true);
  }
  disconnectedCallback() {
    this._detachPopupPortal();
    document.removeEventListener('pointerdown', this._handleDocumentPointerDown);
    window.removeEventListener('resize', this._handleViewportChange);
    window.removeEventListener('scroll', this._handleViewportChange, true);
    super.disconnectedCallback();
  }
  _getPopupPortalContainer() {
    return this.closest('dialog[open]') || document.body;
  }
  _ensurePopupPortal() {
    const nextContainer = this._getPopupPortalContainer();
    if (this._popupPortalHost && this._popupPortalRoot && this._popupPortalContainer === nextContainer) {
      return;
    }
    this._detachPopupPortal();
    this._popupPortalHost = document.createElement('div');
    this._popupPortalHost.setAttribute('data-solid-ui-combobox-portal', '');
    this._popupPortalHost.style.position = 'fixed';
    this._popupPortalHost.style.inset = '0 auto auto 0';
    this._popupPortalHost.style.zIndex = '2147483647';
    this._popupPortalHost.style.pointerEvents = 'none';
    this._popupPortalHost.style.boxSizing = 'border-box';
    this._popupPortalRoot = this._popupPortalHost.attachShadow({
      mode: 'open'
    });
    const styleSheets = (Array.isArray(Combobox.styles) ? Combobox.styles : [Combobox.styles]).map(style => style?.styleSheet).filter(styleSheet => Boolean(styleSheet));
    if (styleSheets.length > 0) {
      this._popupPortalRoot.adoptedStyleSheets = styleSheets;
    }
    nextContainer.appendChild(this._popupPortalHost);
    this._popupPortalContainer = nextContainer;
  }
  _detachPopupPortal() {
    if (this._popupPortalRoot) {
      D(null, this._popupPortalRoot);
    }
    if (this._popupPortalHost?.parentNode) {
      this._popupPortalHost.parentNode.removeChild(this._popupPortalHost);
    }
    this._popupPortalHost = null;
    this._popupPortalRoot = null;
    this._popupPortalContainer = null;
  }
  _updatePopupPosition() {
    this._ensurePopupPortal();
    const rect = this.getBoundingClientRect();
    const maxHeight = Math.min(288, Math.max(120, window.innerHeight - rect.bottom - 12));
    if (this._popupPortalHost) {
      this._popupPortalHost.style.top = `${Math.round(rect.bottom + 2)}px`;
      this._popupPortalHost.style.left = `${Math.round(rect.left)}px`;
      this._popupPortalHost.style.width = `${Math.round(rect.width)}px`;
      this._popupPortalHost.style.maxHeight = `${Math.round(maxHeight)}px`;
      this._popupPortalHost.style.height = '0px';
    }
  }
  _openPopup() {
    const popupOptions = this._getDisplayedOptions();
    this._popupOpen = true;
    this._updatePopupPosition();
    this._activeIndex = findOptionIndexByValue(popupOptions, this.value);
    if (this._activeIndex < 0) {
      this._activeIndex = getFirstEnabledIndex(popupOptions);
    }
  }
  _closePopup() {
    this._popupOpen = false;
    if (this._popupPortalRoot) {
      D(null, this._popupPortalRoot);
    }
  }
  updated(changedProperties) {
    if (this._popupOpen) {
      this._updatePopupPosition();
      if (this._popupPortalRoot) {
        D(this._renderPopup(), this._popupPortalRoot);
      }
    } else if (this._popupPortalRoot) {
      D(null, this._popupPortalRoot);
    }
    if ((changedProperties.has('value') || changedProperties.has('options')) && this.value) {
      const selectedOption = this.options.find(option => option.value === this.value);
      if (selectedOption && this.inputValue !== selectedOption.label) {
        this.inputValue = selectedOption.label;
      }
    }
  }
  _getSelectedIndex() {
    return findOptionIndexByValue(this.options, this.value);
  }
  _getSelectedOption() {
    const selectedIndex = this._getSelectedIndex();
    if (selectedIndex >= 0) {
      return this.options[selectedIndex];
    }
    return this.options[0];
  }
  _getDisplayedOptions() {
    const selectedOption = this._getSelectedOption();
    if (!selectedOption) {
      return this.options;
    }
    return [selectedOption, ...this.options.filter(option => option.value !== selectedOption.value)];
  }
  _getActiveOption() {
    const popupOptions = this._getDisplayedOptions();
    if (this._activeIndex < 0) {
      return undefined;
    }
    return popupOptions[this._activeIndex];
  }
  async _loadSuggestions(query) {
    if (!this.suggestionProvider) {
      this._openPopup();
      return;
    }
    const requestId = ++this._suggestionRequestId;
    const suggestions = await this.suggestionProvider(query);
    if (requestId !== this._suggestionRequestId) {
      return;
    }
    this.options = suggestions;
    this._openPopup();
  }
  async _handleInputChange(e) {
    const query = e.target.value;
    this.inputValue = query;
    this.value = '';
    this.dispatchEvent(new CustomEvent('input', {
      detail: {
        value: query
      },
      bubbles: true,
      composed: true
    }));
    await this._loadSuggestions(query);
  }
  _handleInputKeydown(e) {
    if (e.key === ' ' || e.key === 'Spacebar') {
      return;
    }
    const popupOptions = this._getDisplayedOptions();
    const action = getListboxActionFromKey(e.key);
    if (action === 'none') {
      return;
    }
    e.preventDefault();
    switch (action) {
      case 'close':
        this._closePopup();
        break;
      case 'first':
        if (!this._popupOpen) {
          this._openPopup();
        }
        this._activeIndex = getFirstEnabledIndex(popupOptions);
        break;
      case 'last':
        if (!this._popupOpen) {
          this._openPopup();
        }
        this._activeIndex = getLastEnabledIndex(popupOptions);
        break;
      case 'next':
        if (!this._popupOpen) {
          this._openPopup();
          break;
        }
        this._activeIndex = getNextEnabledIndex(this._activeIndex, popupOptions, 1);
        break;
      case 'previous':
        if (!this._popupOpen) {
          this._openPopup();
          break;
        }
        this._activeIndex = getNextEnabledIndex(this._activeIndex, popupOptions, -1);
        break;
      case 'select':
        if (!this._popupOpen) {
          this._openPopup();
          break;
        }
        this._selectActiveOption();
        break;
      default:
        break;
    }
  }
  _getOptionId(option, index) {
    return `${this._listboxId}-option-${index}-${option.value}`;
  }
  _selectValueFromDropdown(value) {
    const selectedOption = this.options.find(option => option.value === value);
    this.value = value;
    this.inputValue = selectedOption?.label ?? value;
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value,
        label: this.inputValue,
        option: selectedOption
      },
      bubbles: true,
      composed: true
    }));
    this._closePopup();
  }
  _selectActiveOption() {
    const activeOption = this._getActiveOption();
    if (activeOption && !activeOption.disabled) {
      this._selectValueFromDropdown(activeOption.value);
    }
  }
  _renderPopup() {
    const popupOptions = this._getDisplayedOptions();
    const selectedOption = this._getSelectedOption();
    const activeOption = this._activeIndex >= 0 ? popupOptions[this._activeIndex] : undefined;
    return lit_html_b`
      <div class="popup-box" style="pointer-events: auto; max-height: inherit; overflow: auto;">
        <div class="select-options-section">
          ${renderListbox({
      selectedOption,
      activeOption,
      options: popupOptions,
      listboxId: this._listboxId,
      getOptionId: (option, index) => this._getOptionId(option, index),
      onOptionSelect: option => this._selectValueFromDropdown(option.value)
    })}
        </div>
      </div>
    `;
  }
  render() {
    const activeOption = this._getActiveOption();
    const activeDescendant = this._popupOpen && activeOption ? this._getOptionId(activeOption, this._activeIndex) : undefined;
    const ariaLabel = this.label ? A : this.getAttribute('aria-label') || this.placeholder || 'Combobox';
    return lit_html_b`
      <div class="combobox-root">
        ${this.label ? lit_html_b`<label class="text-label" for="${this._inputId}">${this.label}</label>` : null}
        <div class="input-field-row">
          <input
            id="${this._inputId}"
            class="text-input"
            part="input"
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-label="${ariaLabel}"
            aria-expanded="${this._popupOpen}"
            aria-controls="${this._listboxId}"
            aria-activedescendant="${activeDescendant ?? ''}"
            placeholder="${this.placeholder}"
            .value="${this.inputValue}"
            @focus="${() => this._openPopup()}"
            @input="${this._handleInputChange}"
            @keydown="${this._handleInputKeydown}"
          />
          <button
            class="dropdown-toggle"
            type="button"
            aria-label="Show options"
            aria-expanded="${this._popupOpen}"
            @click="${() => this._popupOpen ? this._closePopup() : this._openPopup()}"
          >
            ${downArrowIcon}
          </button>
        </div>
      </div>
    `;
  }
}
;// ./src/v2/components/forms/combobox/index.ts


const COMBOBOX_TAG_NAME = 'solid-ui-combobox';
if (!customElements.get(COMBOBOX_TAG_NAME)) {
  customElements.define(COMBOBOX_TAG_NAME, Combobox);
}
/******/ })()
;
//# sourceMappingURL=index.js.map