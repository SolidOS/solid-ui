const e=require("../../utils/label.cjs.js"),t=require("../../widgets/buttons.cjs.js");require("../../widgets/index.cjs.js");const n=require("../../lib/components/decorators.cjs.js"),r=require("../../lib/components/web-component/WebComponent.cjs.js");require("../../lib/components/index.cjs.js"),require("../../_virtual/~icons/lucide/chevron-down.cjs.js"),require("../button/index.cjs.js"),require("../dialog/index.cjs.js"),require("../dialog-content/index.cjs.js"),require("../dialog-footer/index.cjs.js");const i=require("../combobox/Combobox.cjs.js");require("../combobox/index.cjs.js"),require("../combobox-option/index.cjs.js"),require("../../_virtual/~icons/lucide/link.cjs.js"),require("../../_virtual/~icons/lucide/globe.cjs.js"),require("../../_virtual/~icons/lucide/book-user.cjs.js"),require("../../_virtual/~icons/lucide/user-round.cjs.js"),require("../../_virtual/~icons/lucide/users.cjs.js"),require("../../_virtual/~icons/lucide/circle-x.cjs.js");const a=require("./AccessControlModal.styles.cjs.js"),o=require("./helpers.cjs.js");let s=require("rdflib"),c=require("solid-logic"),l=require("lit"),u=require("lit/decorators.js");var d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,ee,te,ne,re,ie,ae,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,oe,se,J;function Y(e,t,n){ce(e,t),t.set(e,n)}function ce(e,t){if(t.has(e))throw TypeError(`Cannot initialize the same private elements twice on an object`)}function X(e,t,n){return e.set(le(e,t),n),n}function Z(e,t){return e.get(le(e,t))}function le(e,t,n){if(typeof e==`function`?e===t:e.has(t))return arguments.length<3?t:n;throw TypeError(`Private element is not present on this object`)}function Q(e,t,n){return(t=de(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ue(e,t,n,r,i,a){function o(e,t,n){return function(r,i){return n&&n(r),e[t].call(r,i)}}function s(e,t){for(var n=0;n<e.length;n++)e[n].call(t);return t}function c(e,t,n,r){if(typeof e!=`function`&&(r||e!==void 0))throw TypeError(t+` must `+(n||`be`)+` a function`+(r?``:` or undefined`));return e}function l(e,t,n,r,i,a,s,l,u,d,f,p,m){function h(e){if(!m(e))throw TypeError(`Attempted to access private element on non-instance`)}var g,_=t[0],v=t[3],y=!l;if(!y){n||Array.isArray(_)||(_=[_]);var b={},x=[],S=i===3?`get`:i===4||p?`set`:`value`;d?(f||p?b={get:pe(function(){return v(this)},r,`get`),set:function(e){t[4](this,e)}}:b[S]=v,f||pe(b[S],r,i===2?``:S)):f||(b=Object.getOwnPropertyDescriptor(e,r))}for(var C=e,w=_.length-1;w>=0;w-=n?2:1){var T=_[w],E=n?_[w-1]:void 0,D={},O={kind:[`field`,`accessor`,`method`,`getter`,`setter`,`class`][i],name:r,metadata:a,addInitializer:function(e,t){if(e.v)throw Error(`attempted to call addInitializer after decoration was finished`);c(t,`An initializer`,`be`,!0),s.push(t)}.bind(null,D)};try{if(y)(g=c(T.call(E,C,O),`class decorators`,`return`))&&(C=g);else{var k,A;O.static=u,O.private=d,d?i===2?k=function(e){return h(e),b.value}:(i<4&&(k=o(b,`get`,h)),i!==3&&(A=o(b,`set`,h))):(k=function(e){return e[r]},(i<2||i===4)&&(A=function(e,t){e[r]=t}));var j=O.access={has:d?m.bind():function(e){return r in e}};if(k&&(j.get=k),A&&(j.set=A),C=T.call(E,p?{get:b.get,set:b.set}:b[S],O),p){if(typeof C==`object`&&C)(g=c(C.get,`accessor.get`))&&(b.get=g),(g=c(C.set,`accessor.set`))&&(b.set=g),(g=c(C.init,`accessor.init`))&&x.push(g);else if(C!==void 0)throw TypeError(`accessor decorators must return an object with get, set, or init properties or void 0`)}else c(C,(f?`field`:`method`)+` decorators`,`return`)&&(f?x.push(C):b[S]=C)}}finally{D.v=!0}}return(f||p)&&l.push(function(e,t){for(var n=x.length-1;n>=0;n--)t=x[n].call(e,t);return t}),f||y||(d?p?l.push(o(b,`get`),o(b,`set`)):l.push(i===2?b[S]:o.call.bind(b[S])):Object.defineProperty(e,r,b)),C}function u(e,t){return Object.defineProperty(e,Symbol.metadata||Symbol.for(`Symbol.metadata`),{configurable:!0,enumerable:!0,value:t})}if(arguments.length>=6)var d=a[Symbol.metadata||Symbol.for(`Symbol.metadata`)];var f=Object.create(d??null),p=function(e,t,n,r){var i,a,o=[],c=function(t){return me(t)===e},u=new Map;function d(e){e&&o.push(s.bind(null,e))}for(var f=0;f<t.length;f++){var p=t[f];if(Array.isArray(p)){var m=p[1],h=p[2],g=p.length>3,_=16&m,v=!!(8&m),y=(m&=7)==0,b=h+`/`+v;if(!y&&!g){var x=u.get(b);if(!0===x||x===3&&m!==4||x===4&&m!==3)throw Error(`Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: `+h);u.set(b,!(m>2)||m)}l(v?e:e.prototype,p,_,g?`#`+h:de(h),m,r,v?a||=[]:i||=[],o,v,g,y,m===1,v&&g?c:n)}}return d(i),d(a),o}(e,t,i,f);return n.length||u(e,f),{e:p,get c(){var t=[];return n.length&&[u(l(e,[n],r,e.name,5,f,t),f),s.bind(null,t,e)]}}}function de(e){var t=fe(e,`string`);return typeof t==`symbol`?t:t+``}function fe(e,t){if(typeof e!=`object`||!e)return e;var n;if(typeof Symbol<`u`&&(n=e[Symbol.toPrimitive])!==void 0){var r=n.call(e,t||`default`);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function pe(e,t,n){typeof t==`symbol`&&(t=(t=t.description)?`[`+t+`]`:``);try{Object.defineProperty(e,"name",{configurable:!0,value:n?n+` `+t:t})}catch{}return e}function me(e){if(Object(e)!==e)throw TypeError(`right-hand side of 'in' should be an object, got `+(e===null?`null`:typeof e));return e}function he(e){return e}function ge(e){return e!=null}O=[n.customElement(`solid-ui-access-control-modal`)];var $;new(se=(p=new WeakMap,m=new WeakMap,h=new WeakMap,g=new WeakMap,_=new WeakMap,v=new WeakMap,y=new WeakMap,b=new WeakMap,x=new WeakMap,S=new WeakMap,C=new WeakMap,w=new WeakMap,T=new WeakMap,J=(k=(0,u.property)({attribute:!1}),j=(0,u.property)({attribute:!1}),te=(0,u.state)(),re=(0,u.state)(),ae=(0,u.state)(),N=(0,u.state)(),F=(0,u.state)(),L=(0,u.state)(),z=(0,u.state)(),V=(0,u.state)(),U=(0,u.state)(),G=(0,u.state)(),q=(0,u.query)(`solid-ui-dialog`),`subjectUri`),f=class extends r.default{constructor(...e){super(...e),Y(this,p,(E(this),A(this,void 0))),Y(this,m,ee(this,void 0)),Y(this,h,ne(this,``)),Y(this,g,ie(this,`Viewer`)),Y(this,_,M(this,`No Access`)),Y(this,v,P(this,`No Access`)),Y(this,y,I(this,``)),Y(this,b,R(this,!1)),Y(this,x,B(this,!1)),Y(this,S,H(this,[])),Y(this,C,W(this,[])),Y(this,w,K(this,[])),Y(this,T,oe(this,null)),Q(this,`accessPrincipleOptionsProvider`,i.defineAsyncComboboxOptionsProvider(async e=>{let t=e.trim(),n=await this.getPreferredAccessPrincipleOptions(t);if(t.length<2)return this.getShortQueryOptions(n);let r=[];try{r=await c.solidLogicSingleton.directory.search({query:t,sources:c.DEFAULT_DIRECTORY_SOURCES})}catch(e){if(!n.length)throw e}let i=r.map(e=>this.directoryEntryToOption(e));return[...n,...i]}))}get[J](){return Z(p,this)}set subjectUri(e){X(p,this,e)}get accessGrants(){return Z(m,this)}set accessGrants(e){X(m,this,e)}get principalInputValue(){return Z(h,this)}set principalInputValue(e){X(h,this,e)}get addAccessRoleValue(){return Z(g,this)}set addAccessRoleValue(e){X(g,this,e)}get authenticatedAccessRoleValue(){return Z(_,this)}set authenticatedAccessRoleValue(e){X(_,this,e)}get publicAccessRoleValue(){return Z(v,this)}set publicAccessRoleValue(e){X(v,this,e)}get searchValue(){return Z(y,this)}set searchValue(e){X(y,this,e)}get failed(){return Z(b,this)}set failed(e){X(b,this,e)}get submitting(){return Z(x,this)}set submitting(e){X(x,this,e)}get pendingAccessGrants(){return Z(S,this)}set pendingAccessGrants(e){X(S,this,e)}get accessGrantRoles(){return Z(C,this)}set accessGrantRoles(e){X(C,this,e)}get accessGrantLabels(){return Z(w,this)}set accessGrantLabels(e){X(w,this,e)}get dialog(){return Z(T,this)}set dialog(e){X(T,this,e)}willUpdate(e){super.willUpdate(e),e.has(`accessGrants`)&&(this.accessGrantRoles=this.accessGrants?.map(e=>this.getAuthorizationRole(e))??[],this.authenticatedAccessRoleValue=this.getAuthenticatedAccessRole(),this.publicAccessRoleValue=this.getPublicAccessRole(),this.refreshAccessGrantLabels())}async refreshAccessGrantLabels(){let e=this.accessGrants??[];if(!e.length){this.accessGrantLabels=[];return}let t=await Promise.all(e.map(async e=>{let t=e.agentGroup[0];if(t)try{await c.solidLogicSingleton.store.fetcher.load((0,s.sym)(t).doc())}catch{}return this.getAuthorizationSubjectLabel(this.getSharedAuthorization(e))}));this.accessGrants===e&&(this.accessGrantLabels=t)}getAccessGrantEntries(){return(this.accessGrants??[]).map((e,t)=>{e=this.getSharedAuthorization(e);let n=this.getAccessGrantSubjectLabel(e,t);return{authorization:e,index:t,role:this.accessGrantRoles[t]??this.getAuthorizationRole(e),subjectLabel:n,badge:this.getAuthorizationBadge(e,n)}}).sort((e,t)=>{let n=e.role===`Owner`,r=t.role===`Owner`;return n&&!r?-1:!n&&r?1:e.index-t.index})}getSharedAccessGrantEntries(){return this.getAccessGrantEntries().filter(({authorization:e})=>this.getAuthorizationSubjectIris(e).length>0)}renderAccessGrants(){let e=this.searchValue.trim().toLowerCase(),t=this.getSharedAccessGrantEntries().filter(({subjectLabel:t})=>!e||t.toLowerCase().includes(e));return l.html`
      <ul>
        ${t.length>0?t.map(e=>this.renderAccessGrant(e)):l.html`<li>No access grants</li>`}
      </ul>
    `}renderAccessGrant(e){return l.html`
      <li>
        ${this.renderAuthorizationBadge(e.badge)}
        <h3>${e.subjectLabel}</h3>
        ${this.renderAuthorizationRole(e.role,e.index)}  
      </li>
    `}getAuthorizationBadge(e,n){let r=n??this.getAuthorizationSubjectLabel(e),i=e.agent[0];if(i){let e=t.findImage((0,s.sym)(i));return{kind:`agent`,image:e,text:e?``:this.getInitials(r,2)}}if(e.agentGroup[0])return{kind:`group`,text:this.getInitials(r,1)};let a=e.agentClass[0];if(a){let e=t.findImage((0,s.sym)(a));return{kind:`agentClass`,image:e,text:e?``:this.getInitials(r,2)}}return{kind:`unknown`,text:`?`}}renderAuthorizationBadge(e){return l.html`
      <div class="access-grants-image access-grants-image--${e.kind}">
        ${e.image?l.html`<img src=${e.image} alt="" aria-hidden="true" />`:l.html`<span aria-hidden="true">${e.text}</span>`}
      </div>
    `}getInitials(e,t=2){return(e.split(/\s+/).filter(Boolean).slice(0,t).map(e=>e[0]).join(``)||e.slice(0,t)).toUpperCase()}getAuthorizationSubjectIris(e){return[...e.agent,...e.agentGroup,...e.agentClass]}getAuthorizationSubjectLabel(t){let n=this.getAuthorizationSubjectIris(t);return n.length?n.map(t=>e.label((0,s.sym)(t))).join(`, `):`Unknown access holder`}getAuthorizationRole(e){return c.solidLogicSingleton.acl.roleFromModes(e.mode)}getSharedAuthorization(e){return{...e,agentClass:e.agentClass.filter(e=>e!==c.Authenticated.iri&&e!==c.Public.iri)}}getAuthenticatedAccessRole(){let e=(this.accessGrants??[]).find(e=>e.agentClass.includes(c.Authenticated.iri));return e?this.getAuthorizationRole(e):`No Access`}getPublicAccessRole(){let e=(this.accessGrants??[]).find(e=>e.agentClass.includes(c.Public.iri));return e?c.solidLogicSingleton.acl.publicRoleFromModes(e.mode):`No Access`}getRoleValueFromEvent(e,t=`Viewer`){let n=this.getSelectedComboboxOptionValue(e);if(typeof n==`string`)return n;let r=e.currentTarget;return typeof r?.value==`string`?r.value:t}renderAuthorizationRole(e,t){return l.html`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-grants-role access-grants-role--editable ${e===`Owner`?`access-grants-role--owner`:``}"
        .value=${e}
        @change=${e=>this.onAccessGrantRoleInput(t,e)}
      >
        ${this.renderGrantRoleOptions()}
      </solid-ui-combobox>
    `}renderModeSelector(e=`add`){let t=e===`add`?`access-role-select access-role-select--top`:e===`authenticated`?`access-role-select access-role-select--compact access-role-select--general access-grants-role access-grants-role--editable access-role-select--authenticated`:`access-role-select access-role-select--compact access-role-select--general access-grants-role access-grants-role--editable access-role-select--public`,n=e===`add`?this.addAccessRoleValue:e===`authenticated`?this.authenticatedAccessRoleValue:this.publicAccessRoleValue,r=e===`add`?this.onAddAccessRoleInput:e===`authenticated`?this.onAuthenticatedAccessRoleInput:this.onPublicAccessRoleInput;return l.html`
      <solid-ui-combobox
        class=${t}
        .value=${n}
        @change=${r}
      >
        ${e===`add`?this.renderAddRoleOptions():e===`authenticated`?this.renderAuthenticatedRoleOptions():this.renderPublicRoleOptions()}
      </solid-ui-combobox>
    `}renderAddRoleOptions(){return c.ACCESS_ROLES.filter(e=>e!==`No Access`).map(e=>l.html`
        <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
      `)}renderAuthenticatedRoleOptions(){return c.ACCESS_ROLES.map(e=>l.html`
      <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
    `)}renderPublicRoleOptions(){return c.PUBLIC_ACCESS_ROLES.map(e=>l.html`
      <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
    `)}renderGrantRoleOptions(){return c.ACCESS_ROLES.map(e=>l.html`
      <solid-ui-combobox-option value=${e}>${e===`No Access`?`Remove`:e}</solid-ui-combobox-option>
    `)}renderAddAccessForm(){return l.html`
      <div class="access-grants-form">
        <p>Add person, group or software agent URL.</p>
        <div class="access-grants-form-main">
          <div class="access-grants-input">
            <solid-ui-combobox
              class="access-principal-combobox"
              label="Add person, group or software agent URL."
              .srOnlyLabel=${!0}
              .value=${this.principalInputValue}
              placeholder="Paste a link or enter a name"
              .asyncOptionsProvider=${this.accessPrincipleOptionsProvider}
              @input=${this.onPrincipalInput}
              @change=${this.onPrincipalSelect}
            ></solid-ui-combobox>
            ${this.renderPendingAccessGrants()}
          </div>
          ${this.renderModeSelector(`add`)}
        </div> 
      </div>
    `}renderPendingAccessGrants(){return this.pendingAccessGrants.length?l.html`
      <div class="access-grants-pending">
        ${this.pendingAccessGrants.map((e,t)=>l.html`
          <div class="access-grants-pending-item">
            <span class="access-grants-pending-item-label">${e.label}</span>
            <solid-ui-button
              type="button"
              variant="ghost"
              class="access-grants-pending-item-remove"
              data-pending-grant-index=${t}
              @click=${this.onRemovePendingAccessGrantClick}
            >
              <span class="sr-only">Remove ${e.label}</span>
              <icon-lucide-circle-x slot="icon"></icon-lucide-circle-x>
            </solid-ui-button>
          </div>
        `)}
      </div>
    `:l.nothing}renderAccessGrantsSection(){return l.html`
      <div class="access-grants-header">
        <h2>Share with</h2>
        <solid-ui-combobox
          class="access-grants-search-input"
          label="Search access grants"
          .srOnlyLabel=${!0}
          .value=${this.searchValue}
          placeholder="Search"
          @input=${this.onSearchInput}
          @change=${this.onSearchSelect}
        >
          ${this.getSharedAccessGrantEntries().map(({subjectLabel:e})=>l.html`
            <solid-ui-combobox-option 
              .value=${e}>
              ${e}
            </solid-ui-combobox-option>
          `)}
        </solid-ui-combobox>
      </div>
      <div class="access-grants-list">
        ${this.renderAccessGrants()}
      </div>
    `}renderGeneralAccessSection(){return l.html`
      <div class="access-grants-general">
        <div class="access-grants-general-header">
          <h2>General Access</h2>
          <solid-ui-button
            class="access-grants-copy-link-button"
            variant="tertiary"
            @click=${this.onCopyLinkClick}
          >
            <icon-lucide-link slot="left-icon"></icon-lucide-link>
            <span class="access-grants-copy-link-button-label">Copy Link</span>
          </solid-ui-button>
        </div>
        ${this.renderGeneralShareRow({title:`Share with Anyone Signed In`,description:`Users must sign in to SolidOS to access this shared item using the link.`,variant:`authenticated`})}
        ${this.renderGeneralShareRow({title:`Anyone with the Link`,description:`Anyone on the internet with the link can view.`,variant:`public`})}
      </div>
    `}renderGeneralShareRow(e){return l.html`
      <div class="access-grants-general-share">
        <div class="access-grants-general-share-content">
          ${this.renderGeneralAccessIcon()}
          <div class="access-grants-general-share-text">
            <p class="access-grants-general-share-text-title">${e.title}</p>
            <p class="access-grants-general-share-text-description">${e.description}</p>
          </div>
        </div>
        ${this.renderModeSelector(e.variant)}
      </div>
    `}renderGeneralAccessIcon(){return l.html`
      <div class="access-grants-general-share-icon">
        <div class="access-grants-general-share-icon-inner">
          <icon-lucide-globe class="access-grants-general-share-icon-image"></icon-lucide-globe>
        </div>
      </div>
    `}getRoleModes(e){return c.solidLogicSingleton.acl.modesFromRole(e)}getDialogTitle(){let t=this.subjectUri?(0,s.sym)(this.subjectUri):void 0,n=t?e.label(t).trim():``;return!n||n===`this resource`?`Share this resource`:`Share "${n}"`}render(){let e=this.getDialogTitle();return l.html`
      <solid-ui-dialog title=${e}>
        <form @submit=${this.onSubmit}>
          <solid-ui-dialog-content>
            ${this.renderAddAccessForm()}
            ${this.renderAccessGrantsSection()}
            ${this.renderGeneralAccessSection()}
          </solid-ui-dialog-content>

          <solid-ui-dialog-footer>
            <div class="access-control-footer-actions">
              <solid-ui-button
                variant="secondary"
                @click=${this.onCancelClick}
              >
                Cancel
              </solid-ui-button>
              <solid-ui-button
                ?disabled=${!this.hasUnsavedChanges()||this.submitting}
                ?loading=${this.submitting}
                type="button"
                @click=${this.onSaveClick}
              >
                Save Changes
              </solid-ui-button>
            </div>
          </solid-ui-dialog-footer>
        </form>
      </solid-ui-dialog>
    `}async onSubmit(e){e.preventDefault(),!this.submitting&&await this.commitPrinciplesFromInputSafely()}async onSaveClick(){this.submitting||(!this.principalInputValue.trim()||await this.commitPrinciplesFromInputSafely())&&await this.saveAccessChanges()}onCancelClick(){this.dialog?.close()}async saveAccessChanges(){if(this.submitting)return;let e=this.getChangedAccessGrants(),t=this.getGeneralAccessChanges();if(!this.pendingAccessGrants.length&&!e.length&&!t.length)this.failed=!0;else if(!this.subjectUri)this.failed=!0;else{this.submitting=!0,this.failed=!1;try{let n=[...this.pendingAccessGrants.map(e=>({subject:this.createAccessSubject(e.subjectType,e.subjectValue),role:e.role})),...t,...e.flatMap(({subjects:e,role:t})=>e.map(e=>({subject:e,role:t})))];for(let{subject:e,role:t}of n){let n=t===`No Access`?await c.solidLogicSingleton.acl.planRevoke(this.subjectUri,e):await c.solidLogicSingleton.acl.planGrant(this.subjectUri,e,e.type===`agentClass`&&e.iri===c.Public.iri?c.solidLogicSingleton.acl.modesFromPublicRole(t):this.getRoleModes(t));await c.solidLogicSingleton.acl.applyPlan(n)}this.principalInputValue=``,this.pendingAccessGrants=[],this.dialog?.close()}catch(e){this.failed=!0,console.error(`Failed to save access changes`,e)}finally{this.submitting=!1}}}onPrincipalInput(e){this.principalInputValue=this.getEventValue(e)}onPrincipalSelect(e){let t=this.getSelectedStringComboboxOption(e);t&&this.queuePendingPrinciples([t.value],this.addAccessRoleValue,t.label)}onSearchInput(e){this.searchValue=this.getEventValue(e)}onSearchSelect(e){let t=this.getSelectedComboboxOption(e);t&&(this.searchValue=t.label)}getGeneralAccessChanges(){if(!this.subjectUri)return[];let e=this.getAuthenticatedAccessRole(),t=this.getPublicAccessRole();return[this.authenticatedAccessRoleValue===e?void 0:{subject:c.Authenticated,role:this.authenticatedAccessRoleValue},this.publicAccessRoleValue===t?void 0:{subject:c.Public,role:this.publicAccessRoleValue}].filter(ge)}onAddAccessRoleInput(e){let t=this.getRoleValueFromEvent(e);this.addAccessRoleValue=t,this.pendingAccessGrants=this.pendingAccessGrants.map(e=>({...e,role:t}))}onAuthenticatedAccessRoleInput(e){let t=this.getRoleValueFromEvent(e);this.authenticatedAccessRoleValue=t}onPublicAccessRoleInput(e){let t=this.getRoleValueFromEvent(e,`No Access`);this.publicAccessRoleValue=t}onAccessGrantRoleInput(e,t){let n=this.getRoleValueFromEvent(t);this.accessGrantRoles=this.accessGrantRoles.map((t,r)=>r===e?n:t)}removePendingAccessGrant(e){this.pendingAccessGrants=this.pendingAccessGrants.filter((t,n)=>n!==e)}onRemovePendingAccessGrantClick(e){let t=e.currentTarget?.dataset.pendingGrantIndex;t!==void 0&&this.removePendingAccessGrant(Number.parseInt(t,10))}hasUnsavedChanges(){return!!(this.pendingAccessGrants.length||this.principalInputValue.trim()||this.getChangedAccessGrants().length||this.getGeneralAccessChanges().length)}getAccessGrantSubjectLabel(e,t){return this.accessGrantLabels[t]??this.getAuthorizationSubjectLabel(e)}getChangedAccessGrants(){let e=this.getInitialAccessGrantRoles();return(this.accessGrants??[]).map((t,n)=>{let r=this.accessGrantRoles[n]??this.getAuthorizationRole(t);if(r===(e[n]??this.getAuthorizationRole(t)))return;let i=this.getAuthorizationSubjectEntries(this.getSharedAuthorization(t));if(i.length)return{authorization:t,subjects:i,role:r}}).filter(ge)}getInitialAccessGrantRoles(){return this.accessGrants?.map(e=>this.getAuthorizationRole(e))??[]}getAuthorizationSubjectEntries(e){return[{type:`agent`,iris:e.agent},{type:`agentGroup`,iris:e.agentGroup},{type:`agentClass`,iris:e.agentClass}].flatMap(({type:e,iris:t})=>t.map(t=>({type:e,iri:t})))}createAccessSubject(e,t){return{type:e,iri:t}}getEventValue(e,t=``){let n=e.currentTarget;return typeof n?.value==`string`?n.value:t}getSelectedComboboxOption(e){return e.detail?.option}getSelectedStringComboboxOption(e){let t=this.getSelectedComboboxOption(e);return this.isStringComboboxOptionData(t)?t:void 0}getSelectedComboboxOptionValue(e){return this.getSelectedComboboxOption(e)?.value}isStringComboboxOptionData(e){return typeof e?.value==`string`}async commitPrinciplesFromInput(){let e=this.principalInputValue.trim();return e?this.queuePendingPrinciples([e],this.addAccessRoleValue,void 0,e):!1}async commitPrinciplesFromInputSafely(){try{return await this.commitPrinciplesFromInput()}catch(e){return this.failed=!0,console.error(`Failed to commit pending access grants`,e),!1}}async queuePendingPrinciples(e,t=this.addAccessRoleValue,n,r){let i=r??this.principalInputValue.trim(),a=await Promise.all(e.map(async e=>this.createPendingAccessGrant(e,t,n))),o=a.flatMap(e=>`grant`in e?[e.grant]:[]),s=a.filter(e=>`error`in e).map(e=>`${e.principle} (${e.error})`);if(!o.length)return s.length&&(this.failed=!0),this.logPendingGrantFailures(s,!1),!1;let c=[...this.pendingAccessGrants,...o];return this.pendingAccessGrants=this.dedupePendingAccessGrants(c),s.length&&(this.failed=!0),this.logPendingGrantFailures(s,!0),!s.length&&this.principalInputValue.trim()===i&&(this.principalInputValue=``),s.length===0}async createPendingAccessGrant(e,t=this.addAccessRoleValue,n){try{let r=e.trim(),i=await c.solidLogicSingleton.acl.classifyAccessControlSubject(r),a=this.isHttpUri(e)?`agent`:void 0,o=i?.kind??a,s=i?.subjectValue??r;return o?o===`origin`?{principle:e,error:`Origin access grants are not supported yet`}:{principle:e,grant:{subjectType:o,subjectValue:s,role:t,label:n??await this.resolvePendingAccessGrantLabel(s,e)}}:{principle:e,error:`Could not classify access target`}}catch(t){return{principle:e,error:String(t)}}}logPendingGrantFailures(e,t){e.length&&console.error(t?`Failed to add some access grants:`:`Failed to add access grants:`,e)}async resolvePendingAccessGrantLabel(t,n=t){try{let r=(0,s.sym)(t);return await c.solidLogicSingleton.store.fetcher.load(r.doc()),e.label(r).trim()||n}catch{return e.label((0,s.sym)(t))||n}}dedupePendingAccessGrants(e){return o.dedupeByKey(e,e=>`${e.subjectType}:${e.subjectValue}`)}getShortQueryOptions(e){return e.length?e:[{label:`Type at least 2 characters to search`,value:``,selectable:!1}]}async getPreferredAccessPrincipleOptions(e){if(!o.isHttpUri(e))return[];let t=await this.createUrlOption(e);return o.dedupeComboboxOptions(t?[t]:[])}async createUrlOption(e){try{await c.solidLogicSingleton.store.fetcher.load((0,s.sym)(e).doc())}catch{return}let t=await this.resolvePendingAccessGrantLabel(e);return{label:t===e?`Use ${e}`:t,value:e}}directoryEntryToOption(e){return{label:e.label,value:e.uri,template:this.directoryEntryToOptionTemplate(e)}}directoryEntryToOptionTemplate(e){return l.html`
      <span class="access-grants-directory-entry">
        <!-- This renders inside the combobox shadow DOM, so the modal stylesheet cannot reach these icons.
             If combobox supports a dedicated option icon hook, we can move this sizing there instead. -->
        ${this.renderDirectoryEntryIcon(e)}
        <span>${e.label}</span>
      </span>
    `}renderDirectoryEntryIcon(e){return e.sources.includes(`contacts`)||e.sources.includes(`groups`)?l.html`<icon-lucide-book-user style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-book-user>`:e.sources.includes(`friends`)?l.html`<icon-lucide-users style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-users>`:e.sources.includes(`catalog`)?l.html`<icon-lucide-user-round style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-user-round>`:l.nothing}isHttpUri(e){return e.startsWith(`http://`)||e.startsWith(`https://`)}async onCopyLinkClick(e){if(e.preventDefault(),this.subjectUri)try{await navigator.clipboard.writeText(this.subjectUri)}catch(e){console.error(`Failed to copy resource link`,e)}}},{e:[A,ee,ne,ie,M,P,I,R,B,H,W,K,oe,E],c:[$,D]}=ue(f,[[k,1,`subjectUri`],[j,1,`accessGrants`],[te,1,`principalInputValue`],[re,1,`addAccessRoleValue`],[ae,1,`authenticatedAccessRoleValue`],[N,1,`publicAccessRoleValue`],[F,1,`searchValue`],[L,1,`failed`],[z,1,`submitting`],[V,1,`pendingAccessGrants`],[U,1,`accessGrantRoles`],[G,1,`accessGrantLabels`],[q,1,`dialog`]],O,0,void 0,r.default),f),d=class extends he{constructor(){super($),Q(this,`styles`,a.default),D()}},Q(d,se,void 0),d),Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return $}});
//# sourceMappingURL=AccessControlModal.cjs.js.map