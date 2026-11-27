const e=require("../../lib/components/decorators.cjs.js"),t=require("../../lib/components/web-component/WebComponent.cjs.js");require("../../lib/components/index.cjs.js");let n=require("lit"),r=require("lit/decorators.js"),i=require("solid-logic");require("../../_virtual/~icons/lucide/book-user.cjs.js"),require("../../_virtual/~icons/lucide/user-round.cjs.js"),require("../../_virtual/~icons/lucide/users.cjs.js"),require("../../_virtual/~icons/lucide/circle-x.cjs.js"),require("../../_virtual/~icons/lucide/globe.cjs.js"),require("../button/index.cjs.js"),require("../combobox/index.cjs.js"),require("../combobox-option/index.cjs.js");const a=require("./AccessControlAddAccess.styles.css.cjs.js");var o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z;function B(e,t,n){V(e,t),t.set(e,n)}function V(e,t){if(t.has(e))throw TypeError(`Cannot initialize the same private elements twice on an object`)}function H(e,t,n){return e.set(W(e,t),n),n}function U(e,t){return e.get(W(e,t))}function W(e,t,n){if(typeof e==`function`?e===t:e.has(t))return arguments.length<3?t:n;throw TypeError(`Private element is not present on this object`)}function G(e,t,n){return(t=q(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function K(e,t,n,r,i,a){function o(e,t,n){return function(r,i){return n&&n(r),e[t].call(r,i)}}function s(e,t){for(var n=0;n<e.length;n++)e[n].call(t);return t}function c(e,t,n,r){if(typeof e!=`function`&&(r||e!==void 0))throw TypeError(t+` must `+(n||`be`)+` a function`+(r?``:` or undefined`));return e}function l(e,t,n,r,i,a,s,l,u,d,f,p,m){function h(e){if(!m(e))throw TypeError(`Attempted to access private element on non-instance`)}var g,_=t[0],v=t[3],y=!l;if(!y){n||Array.isArray(_)||(_=[_]);var b={},x=[],S=i===3?`get`:i===4||p?`set`:`value`;d?(f||p?b={get:Y(function(){return v(this)},r,`get`),set:function(e){t[4](this,e)}}:b[S]=v,f||Y(b[S],r,i===2?``:S)):f||(b=Object.getOwnPropertyDescriptor(e,r))}for(var C=e,w=_.length-1;w>=0;w-=n?2:1){var T=_[w],E=n?_[w-1]:void 0,D={},O={kind:[`field`,`accessor`,`method`,`getter`,`setter`,`class`][i],name:r,metadata:a,addInitializer:function(e,t){if(e.v)throw Error(`attempted to call addInitializer after decoration was finished`);c(t,`An initializer`,`be`,!0),s.push(t)}.bind(null,D)};try{if(y)(g=c(T.call(E,C,O),`class decorators`,`return`))&&(C=g);else{var k,A;O.static=u,O.private=d,d?i===2?k=function(e){return h(e),b.value}:(i<4&&(k=o(b,`get`,h)),i!==3&&(A=o(b,`set`,h))):(k=function(e){return e[r]},(i<2||i===4)&&(A=function(e,t){e[r]=t}));var j=O.access={has:d?m.bind():function(e){return r in e}};if(k&&(j.get=k),A&&(j.set=A),C=T.call(E,p?{get:b.get,set:b.set}:b[S],O),p){if(typeof C==`object`&&C)(g=c(C.get,`accessor.get`))&&(b.get=g),(g=c(C.set,`accessor.set`))&&(b.set=g),(g=c(C.init,`accessor.init`))&&x.push(g);else if(C!==void 0)throw TypeError(`accessor decorators must return an object with get, set, or init properties or void 0`)}else c(C,(f?`field`:`method`)+` decorators`,`return`)&&(f?x.push(C):b[S]=C)}}finally{D.v=!0}}return(f||p)&&l.push(function(e,t){for(var n=x.length-1;n>=0;n--)t=x[n].call(e,t);return t}),f||y||(d?p?l.push(o(b,`get`),o(b,`set`)):l.push(i===2?b[S]:o.call.bind(b[S])):Object.defineProperty(e,r,b)),C}function u(e,t){return Object.defineProperty(e,Symbol.metadata||Symbol.for(`Symbol.metadata`),{configurable:!0,enumerable:!0,value:t})}if(arguments.length>=6)var d=a[Symbol.metadata||Symbol.for(`Symbol.metadata`)];var f=Object.create(d??null),p=function(e,t,n,r){var i,a,o=[],c=function(t){return X(t)===e},u=new Map;function d(e){e&&o.push(s.bind(null,e))}for(var f=0;f<t.length;f++){var p=t[f];if(Array.isArray(p)){var m=p[1],h=p[2],g=p.length>3,_=16&m,v=!!(8&m),y=(m&=7)==0,b=h+`/`+v;if(!y&&!g){var x=u.get(b);if(!0===x||x===3&&m!==4||x===4&&m!==3)throw Error(`Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: `+h);u.set(b,!(m>2)||m)}l(v?e:e.prototype,p,_,g?`#`+h:q(h),m,r,v?a||=[]:i||=[],o,v,g,y,m===1,v&&g?c:n)}}return d(i),d(a),o}(e,t,i,f);return n.length||u(e,f),{e:p,get c(){var t=[];return n.length&&[u(l(e,[n],r,e.name,5,f,t),f),s.bind(null,t,e)]}}}function q(e){var t=J(e,`string`);return typeof t==`symbol`?t:t+``}function J(e,t){if(typeof e!=`object`||!e)return e;var n;if(typeof Symbol<`u`&&(n=e[Symbol.toPrimitive])!==void 0){var r=n.call(e,t||`default`);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Y(e,t,n){typeof t==`symbol`&&(t=(t=t.description)?`[`+t+`]`:``);try{Object.defineProperty(e,"name",{configurable:!0,value:n?n+` `+t:t})}catch{}return e}function X(e){if(Object(e)!==e)throw TypeError(`right-hand side of 'in' should be an object, got `+(e===null?`null`:typeof e));return e}function Z(e){return e}y=[e.customElement(`solid-ui-access-control-add-access`)];var Q;new(R=(c=new WeakMap,l=new WeakMap,u=new WeakMap,d=new WeakMap,f=new WeakMap,p=new WeakMap,m=new WeakMap,h=new WeakMap,g=new WeakMap,z=(b=(0,r.property)({attribute:!1}),S=(0,r.property)({attribute:!1}),w=(0,r.property)({attribute:!1}),E=(0,r.property)({attribute:!1}),O=(0,r.property)({type:Boolean}),A=(0,r.property)({attribute:!1}),M=(0,r.property)({type:Boolean}),P=(0,r.property)({type:Boolean}),I=(0,r.query)(`.access-role-select--top`),`principalInputValue`),s=class extends t{constructor(...e){super(...e),B(this,c,(_(this),x(this,``))),B(this,l,C(this,`No Access`)),B(this,u,T(this,[])),B(this,d,D(this,``)),B(this,f,k(this,!1)),B(this,p,j(this,null)),B(this,m,N(this,!1)),B(this,h,F(this,!1)),B(this,g,L(this,null))}get[z](){return U(c,this)}set principalInputValue(e){H(c,this,e)}get addAccessRoleValue(){return U(l,this)}set addAccessRoleValue(e){H(l,this,e)}get pendingAccessGrants(){return U(u,this)}set pendingAccessGrants(e){H(u,this,e)}get inputError(){return U(d,this)}set inputError(e){H(d,this,e)}get disabled(){return U(f,this)}set disabled(e){H(f,this,e)}get asyncOptionsProvider(){return U(p,this)}set asyncOptionsProvider(e){H(p,this,e)}get showAdvancedToggle(){return U(m,this)}set showAdvancedToggle(e){H(m,this,e)}get advancedSharingOpen(){return U(h,this)}set advancedSharingOpen(e){H(h,this,e)}get roleCombobox(){return U(g,this)}set roleCombobox(e){H(g,this,e)}updated(e){super.updated(e);let t=this.roleCombobox;e.has(`addAccessRoleValue`)&&t&&t.value!==this.addAccessRoleValue&&(t.value=this.addAccessRoleValue)}onAdvancedSharingToggle(){this.dispatchEvent(new CustomEvent(`advanced-sharing-changed`,{detail:{open:!this.advancedSharingOpen},bubbles:!0,composed:!0}))}onPrincipalInput(e){let t=this.getEventValue(e);this.dispatchEvent(new CustomEvent(`target-input`,{detail:{value:t},bubbles:!0,composed:!0}))}onPrincipalSelect(e){let t=e.detail.option;typeof t.value==`string`&&this.dispatchEvent(new CustomEvent(`target-selected`,{detail:{value:t.value,label:t.label,targetKind:t.targetKind},bubbles:!0,composed:!0}))}onRoleChange(e){let t=e.detail.option.value,n=typeof t==`string`?i.ACCESS_ROLES.find(e=>e===t):void 0;if(n&&(this.dispatchEvent(new CustomEvent(`role-changed`,{detail:{role:n},bubbles:!0,composed:!0})),this.roleCombobox)){this.roleCombobox.value=`No Access`;let e=this.roleCombobox.shadowRoot?.querySelector(`input`);e&&(e.value=`No Access`)}}onPendingGrantRemove(e){this.dispatchEvent(new CustomEvent(`pending-grant-removed`,{detail:{index:e},bubbles:!0,composed:!0}))}getEventValue(e){let t=e.currentTarget;return typeof t?.value==`string`?t.value:``}render(){return n.html`
      <section class="access-grants-form" aria-label="Add access">
        <div class="access-grants-form-heading">
          <p>Add person, group or software agent URL.</p>
          ${this.showAdvancedToggle?n.html`
              <button
                type="button"
                class="access-control-advanced-toggle"
                role="switch"
                aria-checked=${this.advancedSharingOpen?`true`:`false`}
                @click=${this.onAdvancedSharingToggle}
              >
                <span class="access-control-switch-track" aria-hidden="true">
                  <span class="access-control-switch-thumb"></span>
                </span>
                <span>Advanced</span>
              </button>
            `:n.nothing}
        </div>
        <div class="access-grants-form-main">
          <div class="access-grants-input">
            <solid-ui-combobox
              class="access-principal-combobox"
              .disabled=${this.disabled}
              label="Add person, group or software agent URL."
              .srOnlyLabel=${!0}
              .value=${this.principalInputValue}
              placeholder="Paste a link or enter a name"
              .asyncOptionsProvider=${this.asyncOptionsProvider}
              @input=${this.onPrincipalInput}
              @change=${this.onPrincipalSelect}
            ></solid-ui-combobox>
            ${this.inputError?n.html`<p class="access-principal-error" role="alert">${this.inputError}</p>`:n.nothing}
            ${this.renderPendingAccessGrants()}
          </div>
          <solid-ui-combobox
            class="access-role-select access-role-select--top"
            label="Access role for added people"
            .srOnlyLabel=${!0}
            .disabled=${this.disabled||!this.pendingAccessGrants.length}
            .value=${this.addAccessRoleValue}
            @change=${this.onRoleChange}
          >
            ${i.ACCESS_ROLES.map(e=>n.html`
                <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
              `)}
          </solid-ui-combobox>
        </div>
      </section>
    `}renderPendingAccessGrants(){return this.pendingAccessGrants.length?n.html`
      <div class="access-grants-pending">
        ${this.pendingAccessGrants.map((e,t)=>n.html`
          <div class="access-grants-pending-item">
            <span class="access-grants-pending-item-label">
              ${e.targetKind===`trustedApp`?n.html`<icon-lucide-globe style="width: 13px; height: 13px; vertical-align: -2px;"></icon-lucide-globe>`:n.nothing}
              ${e.label}
            </span>
            <solid-ui-button
              type="button"
              variant="ghost"
              class="access-grants-pending-item-remove"
              ?disabled=${this.disabled}
              @click=${()=>this.onPendingGrantRemove(t)}
            >
              <span class="sr-only">Remove ${e.label}</span>
              <icon-lucide-circle-x slot="icon"></icon-lucide-circle-x>
            </solid-ui-button>
          </div>
        `)}
      </div>
    `:n.nothing}},{e:[x,C,T,D,k,j,N,F,L,_],c:[Q,v]}=K(s,[[b,1,`principalInputValue`],[S,1,`addAccessRoleValue`],[w,1,`pendingAccessGrants`],[E,1,`inputError`],[O,1,`disabled`],[A,1,`asyncOptionsProvider`],[M,1,`showAdvancedToggle`],[P,1,`advancedSharingOpen`],[I,1,`roleCombobox`]],y,0,void 0,t),s),o=class extends Z{constructor(){super(Q),G(this,`styles`,a),v()}},G(o,R,void 0),o),Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return Q}}),exports.directoryEntryOptionIcon=function(e){if(e.sources.includes(`contacts`)||e.sources.includes(`groups`))return n.html`<icon-lucide-book-user></icon-lucide-book-user>`;if(e.sources.includes(`friends`))return n.html`<icon-lucide-users></icon-lucide-users>`;if(e.sources.includes(`catalog`))return n.html`<icon-lucide-user-round></icon-lucide-user-round>`};
//# sourceMappingURL=AccessControlAddAccess.cjs.js.map