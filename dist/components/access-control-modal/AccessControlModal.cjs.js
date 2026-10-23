const e=require("../../utils/label.cjs.js"),t=require("../../lib/debug.cjs.js"),n=require("../../lib/components/decorators.cjs.js"),r=require("../../lib/components/dialog-component/DialogComponent.cjs.js");require("../../lib/components/index.cjs.js"),require("../../_virtual/~icons/lucide/x.cjs.js"),require("../button/index.cjs.js"),require("../dialog/index.cjs.js"),require("../dialog-content/index.cjs.js"),require("../dialog-footer/index.cjs.js"),require("../combobox/index.cjs.js"),require("../combobox-option/index.cjs.js"),require("../../_virtual/~icons/lucide/circle-x.cjs.js"),require("../../_virtual/~icons/lucide/folder.cjs.js"),require("../../_virtual/~icons/lucide/folder-open.cjs.js"),require("./AccessControlSharedAccess.cjs.js"),require("./AccessControlGeneralAccess.cjs.js"),require("./AccessControlErrors.cjs.js");const i=require("./AccessControlModal.styles.cjs.js"),a=require("./accessGrantDrafts.cjs.js"),o=require("./accessTargetResolver.cjs.js"),s=require("./applyAccessChanges.cjs.js"),c=require("./buildAccessChanges.cjs.js");let l=require("rdflib"),u=require("solid-logic"),d=require("lit"),f=require("lit/decorators.js");var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,ee,te,ne,re,ie,ae,oe,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,se,ce,le,ue,de,fe,pe,me,he,ge,_e,ve,ye,be,xe,Se,Ce,we,Te;function J(e,t,n){Ee(e,t),t.set(e,n)}function Ee(e,t){if(t.has(e))throw TypeError(`Cannot initialize the same private elements twice on an object`)}function Y(e,t,n){return e.set(De(e,t),n),n}function X(e,t){return e.get(De(e,t))}function De(e,t,n){if(typeof e==`function`?e===t:e.has(t))return arguments.length<3?t:n;throw TypeError(`Private element is not present on this object`)}function Z(e,t,n){return(t=Q(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Oe(e,t,n,r,i,a){function o(e,t,n){return function(r,i){return n&&n(r),e[t].call(r,i)}}function s(e,t){for(var n=0;n<e.length;n++)e[n].call(t);return t}function c(e,t,n,r){if(typeof e!=`function`&&(r||e!==void 0))throw TypeError(t+` must `+(n||`be`)+` a function`+(r?``:` or undefined`));return e}function l(e,t,n,r,i,a,s,l,u,d,f,p,m){function h(e){if(!m(e))throw TypeError(`Attempted to access private element on non-instance`)}var g,_=t[0],v=t[3],y=!l;if(!y){n||Array.isArray(_)||(_=[_]);var b={},x=[],S=i===3?`get`:i===4||p?`set`:`value`;d?(f||p?b={get:Ae(function(){return v(this)},r,`get`),set:function(e){t[4](this,e)}}:b[S]=v,f||Ae(b[S],r,i===2?``:S)):f||(b=Object.getOwnPropertyDescriptor(e,r))}for(var C=e,w=_.length-1;w>=0;w-=n?2:1){var T=_[w],E=n?_[w-1]:void 0,D={},O={kind:[`field`,`accessor`,`method`,`getter`,`setter`,`class`][i],name:r,metadata:a,addInitializer:function(e,t){if(e.v)throw Error(`attempted to call addInitializer after decoration was finished`);c(t,`An initializer`,`be`,!0),s.push(t)}.bind(null,D)};try{if(y)(g=c(T.call(E,C,O),`class decorators`,`return`))&&(C=g);else{var k,A;O.static=u,O.private=d,d?i===2?k=function(e){return h(e),b.value}:(i<4&&(k=o(b,`get`,h)),i!==3&&(A=o(b,`set`,h))):(k=function(e){return e[r]},(i<2||i===4)&&(A=function(e,t){e[r]=t}));var j=O.access={has:d?m.bind():function(e){return r in e}};if(k&&(j.get=k),A&&(j.set=A),C=T.call(E,p?{get:b.get,set:b.set}:b[S],O),p){if(typeof C==`object`&&C)(g=c(C.get,`accessor.get`))&&(b.get=g),(g=c(C.set,`accessor.set`))&&(b.set=g),(g=c(C.init,`accessor.init`))&&x.push(g);else if(C!==void 0)throw TypeError(`accessor decorators must return an object with get, set, or init properties or void 0`)}else c(C,(f?`field`:`method`)+` decorators`,`return`)&&(f?x.push(C):b[S]=C)}}finally{D.v=!0}}return(f||p)&&l.push(function(e,t){for(var n=x.length-1;n>=0;n--)t=x[n].call(e,t);return t}),f||y||(d?p?l.push(o(b,`get`),o(b,`set`)):l.push(i===2?b[S]:o.call.bind(b[S])):Object.defineProperty(e,r,b)),C}function u(e,t){return Object.defineProperty(e,Symbol.metadata||Symbol.for(`Symbol.metadata`),{configurable:!0,enumerable:!0,value:t})}if(arguments.length>=6)var d=a[Symbol.metadata||Symbol.for(`Symbol.metadata`)];var f=Object.create(d??null),p=function(e,t,n,r){var i,a,o=[],c=function(t){return je(t)===e},u=new Map;function d(e){e&&o.push(s.bind(null,e))}for(var f=0;f<t.length;f++){var p=t[f];if(Array.isArray(p)){var m=p[1],h=p[2],g=p.length>3,_=16&m,v=!!(8&m),y=(m&=7)==0,b=h+`/`+v;if(!y&&!g){var x=u.get(b);if(!0===x||x===3&&m!==4||x===4&&m!==3)throw Error(`Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: `+h);u.set(b,!(m>2)||m)}l(v?e:e.prototype,p,_,g?`#`+h:Q(h),m,r,v?a||=[]:i||=[],o,v,g,y,m===1,v&&g?c:n)}}return d(i),d(a),o}(e,t,i,f);return n.length||u(e,f),{e:p,get c(){var t=[];return n.length&&[u(l(e,[n],r,e.name,5,f,t),f),s.bind(null,t,e)]}}}function Q(e){var t=ke(e,`string`);return typeof t==`symbol`?t:t+``}function ke(e,t){if(typeof e!=`object`||!e)return e;var n;if(typeof Symbol<`u`&&(n=e[Symbol.toPrimitive])!==void 0){var r=n.call(e,t||`default`);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Ae(e,t,n){typeof t==`symbol`&&(t=(t=t.description)?`[`+t+`]`:``);try{Object.defineProperty(e,"name",{configurable:!0,value:n?n+` `+t:t})}catch{}return e}function je(e){if(Object(e)!==e)throw TypeError(`right-hand side of 'in' should be an object, got `+(e===null?`null`:typeof e));return e}function Me(e){return e}function Ne(e){return e!=null}ne=[n.customElement(`solid-ui-access-control-modal`)];var $;new(we=(h=new WeakMap,g=new WeakMap,_=new WeakMap,v=new WeakMap,y=new WeakMap,b=new WeakMap,x=new WeakMap,S=new WeakMap,C=new WeakMap,w=new WeakMap,T=new WeakMap,E=new WeakMap,D=new WeakMap,O=new WeakMap,k=new WeakMap,A=new WeakMap,j=new WeakMap,M=new WeakMap,Te=(re=(0,f.property)({attribute:!1}),ae=(0,f.property)({attribute:!1}),N=(0,f.state)(),F=(0,f.state)(),L=(0,f.state)(),z=(0,f.state)(),V=(0,f.state)(),U=(0,f.state)(),G=(0,f.state)(),q=(0,f.state)(),ce=(0,f.state)(),ue=(0,f.state)(),fe=(0,f.state)(),me=(0,f.state)(),ge=(0,f.state)(),ve=(0,f.state)(),be=(0,f.state)(),Se=(0,f.state)(),`subjectUri`),m=class extends r.default{constructor(...e){super(...e),J(this,h,(ee(this),ie(this,void 0))),J(this,g,oe(this,void 0)),J(this,_,P(this,``)),J(this,v,I(this,`Viewer`)),J(this,y,R(this,`No Access`)),J(this,b,B(this,`No Access`)),J(this,x,H(this,!1)),J(this,S,W(this,[])),J(this,C,K(this,[])),J(this,w,se(this,[])),J(this,T,le(this,!0)),J(this,E,de(this)),J(this,D,pe(this,!1)),J(this,O,he(this,``)),J(this,k,_e(this,!1)),J(this,A,ye(this,`folder+contents`)),J(this,j,xe(this)),J(this,M,Ce(this,!1)),Z(this,`accessGrantLabelRequestVersion`,0),Z(this,`accessContextRequestVersion`,0),Z(this,`accessContextSubjectUri`,void 0)}get[Te](){return X(h,this)}set subjectUri(e){Y(h,this,e)}get accessGrants(){return X(g,this)}set accessGrants(e){Y(g,this,e)}get principalInputValue(){return X(_,this)}set principalInputValue(e){Y(_,this,e)}get addAccessRoleValue(){return X(v,this)}set addAccessRoleValue(e){Y(v,this,e)}get authenticatedAccessRoleValue(){return X(y,this)}set authenticatedAccessRoleValue(e){Y(y,this,e)}get publicAccessRoleValue(){return X(b,this)}set publicAccessRoleValue(e){Y(b,this,e)}get submitting(){return X(x,this)}set submitting(e){Y(x,this,e)}get pendingAccessGrants(){return X(S,this)}set pendingAccessGrants(e){Y(S,this,e)}get accessGrantDrafts(){return X(C,this)}set accessGrantDrafts(e){Y(C,this,e)}get errors(){return X(w,this)}set errors(e){Y(w,this,e)}get successfulChangesRefreshed(){return X(T,this)}set successfulChangesRefreshed(e){Y(T,this,e)}get accessContext(){return X(E,this)}set accessContext(e){Y(E,this,e)}get accessContextLoading(){return X(D,this)}set accessContextLoading(e){Y(D,this,e)}get accessContextError(){return X(O,this)}set accessContextError(e){Y(O,this,e)}get advancedSharingOpen(){return X(k,this)}set advancedSharingOpen(e){Y(k,this,e)}get containerScope(){return X(A,this)}set containerScope(e){Y(A,this,e)}get containerScopeAnalysis(){return X(j,this)}set containerScopeAnalysis(e){Y(j,this,e)}get protectedTarget(){return X(M,this)}set protectedTarget(e){Y(M,this,e)}disconnectedCallback(){this.accessGrantLabelRequestVersion++,this.accessContextRequestVersion++,this.errors=[],super.disconnectedCallback()}get inputError(){return this.errors.find(e=>e.action===`input`)?.message??``}get saveErrors(){return this.errors.filter(e=>e.action!==`input`)}setInputError(e){this.errors=[...this.errors.filter(e=>e.action!==`input`),e]}clearInputError(){this.errors=this.errors.filter(e=>e.action!==`input`)}willUpdate(e){if(super.willUpdate(e),e.has(`accessGrants`)){let e=this.getScopedAccessGrants();this.accessGrantDrafts=a.createAccessGrantDrafts(e),this.authenticatedAccessRoleValue=a.getAuthenticatedAccessRole(e),this.publicAccessRoleValue=a.getPublicAccessRole(e)}}updated(e){super.updated(e),e.has(`subjectUri`)&&this.loadAccessContext().catch(e=>{t.error(`Failed to load access control context`,e)}),e.has(`accessGrants`)&&this.refreshAccessGrantLabels().catch(e=>{t.error(`Failed to refresh access grant labels`,e)}),e.has(`accessContext`)&&!e.has(`subjectUri`)&&this.refreshContainerScopeAnalysis()}refreshContainerScopeAnalysis(){this.isContainer()&&this.accessContext?(this.containerScopeAnalysis=(0,u.analyzeContainerAccessScope)(this.accessContext),this.containerScope=this.containerScopeAnalysis.primaryScope,this.refreshScopedAccessGrantDrafts()):this.containerScopeAnalysis=void 0}async refreshAccessGrantLabels(){let e=++this.accessGrantLabelRequestVersion,t=this.accessGrants,n=this.subjectUri,r=this.getSelectedContainerScope(),i=this.getScopedAccessGrants(r);if(!i.length){this.accessGrantDrafts=[];return}let o=await Promise.all(i.map(async e=>(await Promise.all(e.agentGroup.map(async e=>{try{await u.solidLogicSingleton.store.fetcher.load((0,l.sym)(e).doc())}catch{}})),a.getAuthorizationSubjectLabel(a.getSharedAuthorization(e)))));if(e===this.accessGrantLabelRequestVersion&&this.accessGrants===t&&this.subjectUri===n&&this.getSelectedContainerScope()===r){let e=new Map(a.getAccessGrantIds(i).map((e,t)=>[e,o[t]]));this.accessGrantDrafts=this.accessGrantDrafts.map(t=>({...t,subjectLabel:e.get(t.id)??t.subjectLabel}))}}getDialogTitle(){let t=this.subjectUri?(0,l.sym)(this.subjectUri):void 0,n=t?e.label(t).trim():``;return!n||n===`this resource`?`Manage Access of "this resource"`:`Manage Access of "${n}"`}isContainer(){return!!(this.subjectUri&&new URL(this.subjectUri).pathname.endsWith(`/`))}async loadAccessContext(){let e=++this.accessContextRequestVersion,n=this.subjectUri;if(this.accessContext=void 0,this.accessContextSubjectUri=void 0,this.accessContextError=``,this.accessContextLoading=!!n,!n)this.accessContextLoading=!1;else try{let t=await u.solidLogicSingleton.acl.findEffectiveAcl(n);if(e!==this.accessContextRequestVersion||this.subjectUri!==n)return;this.accessContext=t,this.accessContextSubjectUri=n,this.accessContext?.inherited&&!this.accessGrants?.length&&(this.accessGrants=this.accessContext.authorizations),this.refreshContainerScopeAnalysis(),this.protectedTarget=u.solidLogicSingleton.acl.isProtectedResource(n),this.protectedTarget&&this.refreshScopedAccessGrantDrafts()}catch(r){if(e!==this.accessContextRequestVersion||this.subjectUri!==n)return;this.accessContextError=r instanceof Error&&r.message.trim()?r.message:`Unable to load access settings for this resource.`,t.error(`Failed to load access control context`,r)}finally{e===this.accessContextRequestVersion&&this.subjectUri===n&&(this.accessContextLoading=!1)}}async ensureAccessContext(){return this.subjectUri?!this.isConnected||this.accessContextSubjectUri===this.subjectUri&&this.accessContext&&!this.accessContextError?!0:(await this.loadAccessContext(),this.accessContextSubjectUri===this.subjectUri&&!!this.accessContext&&!this.accessContextError):!1}canMutate(){return!this.isConnected||!this.subjectUri||!(!this.subjectUri||this.accessContextSubjectUri!==this.subjectUri||!this.accessContext||this.accessContextLoading||this.accessContextError)}async retryAccessContext(){await this.loadAccessContext()}renderSharingInformation(){if(!this.accessContext)return d.html``;let t=!this.accessContext.inherited,n=this.accessContext?.effectiveContainer,r=n?e.label((0,l.sym)(n)).trim():``,i=r&&r!==n?d.html`<strong>${r}</strong> (${n})`:d.html`<strong>${n??`the parent container`}</strong>`;return d.html`
      <div class="access-control-sharing-state-panel">
        ${t?d.html`
            <div class="access-control-sharing-state-custom-row">
              <p>This resource has its own sharing settings.</p>
              ${this.protectedTarget?d.html``:d.html`
                  <solid-ui-button
                    type="button"
                    variant="tertiary"
                    aria-label="Reset custom sharing to default"
                    @click=${this.onResetToDefault}
                  >
                    Reset to default
                  </solid-ui-button>
                `}
            </div>
          `:n?d.html`<p>This resource inherits sharing settings from ${i}.</p>`:d.html`<p>This resource inherits sharing settings, but no inherited default is available.</p>`}
        ${this.protectedTarget?d.html`<p class="access-control-sharing-state-protected-message">This is a protected storage resource. Its primary access-control settings cannot be reset here.</p>`:d.html``}
      </div>
    `}renderSharingState(){return!this.accessContext||!this.advancedSharingOpen?d.html``:d.html`
      <section
        class="access-control-sharing-state"
        aria-labelledby="access-control-advanced-sharing-heading"
      >
        ${this.renderSharingInformation()}
        ${this.renderAdvancedSharing()}
      </section>
    `}getSelectedContainerScope(){return this.containerScope}hasMixedContainerPolicy(){return this.isContainer()&&this.containerScopeAnalysis?.mixed===!0}renderAccessContextState(){return this.accessContextLoading?d.html`<p role="status">Loading access settings...</p>`:this.accessContextError?d.html`
        <solid-ui-error-state
          title="Could not load access settings"
          message=${this.accessContextError}
        >
          <solid-ui-button type="button" variant="secondary" @click=${this.retryAccessContext}>
            Retry
          </solid-ui-button>
        </solid-ui-error-state>
      `:this.accessContext?d.html``:d.html`<p role="status">Access settings are not ready yet.</p>`}renderMixedContainerWarning(){return this.hasMixedContainerPolicy()?d.html`
      <div class="access-control-mixed-policy-warning" role="alert">
        <strong>This container has different access settings for the folder and its contents.</strong>
        <span>Changing this mixed policy is an advanced feature. You can still change access for the folder or its contents separately below.</span>
      </div>
    `:d.html``}getScopedAccessGrants(e=this.getSelectedContainerScope()){let t=this.accessGrants??[];return!this.isContainer()||!this.subjectUri||this.protectedTarget?t:(0,u.filterAuthorizationsByContainerScope)(this.subjectUri,t,e,this.accessContext?.inherited??!1)}refreshScopedAccessGrantDrafts(){let e=this.getScopedAccessGrants();this.accessGrantDrafts=a.createAccessGrantDrafts(e),this.authenticatedAccessRoleValue=a.getAuthenticatedAccessRole(e),this.publicAccessRoleValue=a.getPublicAccessRole(e)}selectContainerScope(e){this.containerScope=e,this.refreshScopedAccessGrantDrafts()}renderAdvancedSharing(){return this.advancedSharingOpen?d.html`
      <section
        id="access-control-advanced-sharing"
        class="access-control-advanced-sharing"
        role="group"
        aria-labelledby="access-control-advanced-sharing-heading"
        aria-describedby="access-control-advanced-sharing-description"
      >
        <h2 id="access-control-advanced-sharing-heading">Advanced sharing</h2>
        <p id="access-control-advanced-sharing-description">
          <span class="access-control-advanced-sharing-description-line">Use this option when the folder and its contents have different access requirements.</span>
          <span class="access-control-advanced-sharing-description-line">Choose which access settings to edit.</span>
          <span class="access-control-advanced-sharing-description-line">Save Changes applies your current edits only to that scope.</span>
        </p>
        ${this.isContainer()?d.html`
            <button
              type="button"
              class="access-control-same-access-toggle"
              role="switch"
              aria-checked=${this.containerScope===`folder+contents`?`true`:`false`}
              @click=${()=>{let e=this.containerScope!==`folder+contents`;this.selectContainerScope(e?`folder+contents`:this.containerScope===`contents`?`contents`:`folder`)}}
            >
              <span class="access-control-switch-track" aria-hidden="true">
                <span class="access-control-switch-thumb"></span>
              </span>
              <span>Use the same access for this folder and its contents</span>
            </button>
            <div class="access-control-advanced-sharing-options">
              <solid-ui-button
                type="button"
                variant=${this.containerScope===`folder`?`primary`:`secondary`}
                aria-pressed=${this.containerScope===`folder`?`true`:`false`}
                @click=${()=>{this.selectContainerScope(`folder`)}}
              >
                Folder Only
              </solid-ui-button>
              <solid-ui-button
                type="button"
                variant=${this.containerScope===`contents`?`primary`:`secondary`}
                aria-pressed=${this.containerScope===`contents`?`true`:`false`}
                @click=${()=>{this.selectContainerScope(`contents`)}}
              >
                Contents Only
              </solid-ui-button>
            </div>
          `:d.html``}
        <div class="access-control-advanced-sharing-actions">
          <solid-ui-button
            type="button"
            variant="ghost"
            aria-label="Close advanced sharing"
            title="Close advanced sharing"
            @click=${this.closeAdvancedSharing}
          >
            <icon-lucide-x slot="icon" aria-hidden="true"></icon-lucide-x>
            <span class="sr-only">Close</span>
          </solid-ui-button>
        </div>
      </section>
    `:d.html``}render(){let e=this.getDialogTitle();return d.html`
      <solid-ui-dialog title=${e}>
        <form @submit=${this.onSubmit}>
          <solid-ui-dialog-content>
            ${this.renderAccessContextState()}
            ${this.renderMixedContainerWarning()}
          <solid-ui-access-control-add-access
              .disabled=${!this.canMutate()||this.hasMixedContainerPolicy()}
              .principalInputValue=${this.principalInputValue}
              .addAccessRoleValue=${this.addAccessRoleValue}
              .pendingAccessGrants=${this.pendingAccessGrants}
              .inputError=${this.inputError}
              .asyncOptionsProvider=${o.accessPrincipalOptionsProvider}
              @target-input=${this.onPrincipalInput}
              @target-selected=${this.onPrincipalSelect}
              @role-changed=${this.onAddAccessRoleInput}
              @pending-grant-removed=${this.onPendingGrantRemoved}
            ></solid-ui-access-control-add-access>
            <solid-ui-access-control-shared-access
              .disabled=${!this.canMutate()||this.hasMixedContainerPolicy()}
              .accessGrantViewModels=${a.getAccessGrantViewModels(this.accessGrantDrafts)}
              @access-grant-role-changed=${this.onAccessGrantRoleInput}
            ></solid-ui-access-control-shared-access>
            <solid-ui-access-control-general-access
              .disabled=${!this.canMutate()||this.hasMixedContainerPolicy()}
              .subjectUri=${this.subjectUri}
              .authenticatedAccessRoleValue=${this.authenticatedAccessRoleValue}
              .publicAccessRoleValue=${this.publicAccessRoleValue}
              @authenticated-role-changed=${this.onAuthenticatedAccessRoleInput}
              @public-role-changed=${this.onPublicAccessRoleInput}
            ></solid-ui-access-control-general-access>
            <solid-ui-access-control-errors
              .errors=${this.saveErrors}
              .successfulChangesRefreshed=${this.successfulChangesRefreshed}
              @close=${this.onCancelClick}
            ></solid-ui-access-control-errors>
            ${this.renderSharingState()}
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
                ?disabled=${!this.canMutate()||!this.hasUnsavedChanges()||this.submitting||this.saveErrors.length>0||this.hasMixedContainerPolicy()}
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
    `}async onSubmit(e){e.preventDefault(),this.submitting||this.hasMixedContainerPolicy()||this.isConnected&&!await this.ensureAccessContext()||await this.commitPrincipalFromInputSafely()}async onSaveClick(){if(this.submitting||this.hasMixedContainerPolicy()||this.isConnected&&!await this.ensureAccessContext()||this.principalInputValue.trim()&&!await this.commitPrincipalFromInputSafely())return;let e=this.isContainer()&&!this.protectedTarget?this.getSelectedContainerScope():`file`;await this.saveAccessChanges(e===`folder`?`container`:e)}onCancelClick(){this.close()}closeAdvancedSharing(){this.advancedSharingOpen=!1}async onResetToDefault(){if(this.subjectUri&&this.canMutate()&&this.accessContext&&!this.accessContext.inherited&&!this.submitting&&!this.hasMixedContainerPolicy()){this.submitting=!0,this.errors=this.errors.filter(e=>e.action===`input`);try{await u.solidLogicSingleton.acl.resetToDefault(this.subjectUri),await this.loadAccessContext();let e=await u.solidLogicSingleton.acl.findAccessGrants(this.subjectUri);this.accessGrants=this.accessContext?.inherited?this.accessContext.authorizations:e}catch(e){this.errors=[...this.errors,{action:`reset`,targetUri:this.subjectUri,label:`Custom sharing`,message:e instanceof Error?e.message:`Unable to reset sharing.`}],t.error(`Failed to reset access control`,e)}finally{this.submitting=!1}}}async saveAccessChanges(e=`file`){if(this.submitting||!this.canMutate()||this.hasMixedContainerPolicy())return;let n=a.getChangedAccessGrants(this.accessGrantDrafts),r=this.getGeneralAccessChanges();if((this.pendingAccessGrants.length||n.length||r.length)&&this.subjectUri){this.submitting=!0,this.errors=this.errors.filter(e=>e.action===`input`),this.successfulChangesRefreshed=!0;try{let i=c.buildAccessChanges({pendingAccessGrants:this.pendingAccessGrants,generalAccessChanges:r,changedAccessGrants:n}),a=await s.applyAccessChanges(this.subjectUri,i,{containerScope:e});if(a.length){this.errors=[...this.errors,...a],this.principalInputValue=``,this.pendingAccessGrants=[];try{this.accessGrants=await u.solidLogicSingleton.acl.findAccessGrants(this.subjectUri)}catch(e){this.successfulChangesRefreshed=!1,this.errors=[...this.errors,{action:`save`,targetUri:this.subjectUri,label:`Shared with list`,message:e instanceof Error?e.message:`Unable to refresh the access list.`}],t.error(`Failed to refresh access grants after save errors`,e)}t.error(`Failed to save some access changes`,a);return}this.principalInputValue=``,this.pendingAccessGrants=[],this.close()}catch(e){this.errors=[...this.errors,{action:`save`,targetUri:this.subjectUri??``,label:`Access changes`,message:e instanceof Error?e.message:`Unexpected error while saving access changes.`}]}finally{this.submitting=!1}}}onPrincipalInput(e){this.canMutate()&&!this.hasMixedContainerPolicy()&&(this.principalInputValue=e.detail.value,this.clearInputError())}onPrincipalSelect(e){this.canMutate()&&!this.hasMixedContainerPolicy()&&this.queuePendingPrincipal(e.detail.value,this.addAccessRoleValue,e.detail.label,void 0,e.detail.targetKind)}getGeneralAccessChanges(){if(!this.subjectUri)return[];let e=this.getScopedAccessGrants(),t=a.getAuthenticatedAccessRole(e),n=a.getPublicAccessRole(e);return[this.authenticatedAccessRoleValue===t?void 0:{subject:u.Authenticated,role:this.authenticatedAccessRoleValue,label:`Authenticated users`},this.publicAccessRoleValue===n?void 0:{subject:u.Public,role:this.publicAccessRoleValue,label:`Public`}].filter(Ne)}onAddAccessRoleInput(e){this.canMutate()&&!this.hasMixedContainerPolicy()&&(this.addAccessRoleValue=e.detail.role,this.pendingAccessGrants=this.pendingAccessGrants.map(t=>({...t,role:e.detail.role})))}onAuthenticatedAccessRoleInput(e){this.canMutate()&&!this.hasMixedContainerPolicy()&&(this.authenticatedAccessRoleValue=e.detail.role)}onPublicAccessRoleInput(e){this.canMutate()&&!this.hasMixedContainerPolicy()&&(this.publicAccessRoleValue=e.detail.role)}onAccessGrantRoleInput(e){this.canMutate()&&!this.hasMixedContainerPolicy()&&(this.accessGrantDrafts=this.accessGrantDrafts.map(t=>t.id===e.detail.id?{...t,role:e.detail.role}:t))}onPendingGrantRemoved(e){this.canMutate()&&!this.hasMixedContainerPolicy()&&(this.pendingAccessGrants=this.pendingAccessGrants.filter((t,n)=>n!==e.detail.index))}hasUnsavedChanges(){return!!(this.pendingAccessGrants.length||this.principalInputValue.trim()||a.getChangedAccessGrants(this.accessGrantDrafts).length||this.getGeneralAccessChanges().length)}async commitPrincipalFromInput(){if(!this.canMutate()||this.hasMixedContainerPolicy())return!1;let e=this.principalInputValue.trim();return e?this.queuePendingPrincipal(e,this.addAccessRoleValue,void 0,e):!1}async commitPrincipalFromInputSafely(){let e=this.principalInputValue.trim();try{return await this.commitPrincipalFromInput()}catch(n){return this.principalInputValue.trim()===e?(this.setInputError({action:`input`,label:`Access target`,targetUri:this.principalInputValue.trim(),message:`We could not verify this access target. Check the value and try again.`}),t.error(`Failed to commit pending access grants`,n),!1):(t.error(`Ignored stale access-target validation error`,n),!1)}}async queuePendingPrincipal(e,n=this.addAccessRoleValue,r,i,a){let o=i??this.principalInputValue.trim(),s=await this.createPendingAccessGrant(e,n,r,a);if(`error`in s)return this.principalInputValue.trim()===o&&this.setInputError(s.error),t.error(`Failed to add access grant:`,s.error.message),!1;let c=[...this.pendingAccessGrants,s.grant];return this.pendingAccessGrants=this.dedupePendingAccessGrants(c),this.principalInputValue.trim()===o&&(this.clearInputError(),this.principalInputValue=``),!0}async createPendingAccessGrant(e,t=this.addAccessRoleValue,n,r){try{let i=e.trim(),a=await o.resolveAccessTarget(i,n);return a?{grant:{subjectType:a.subjectType,subjectValue:a.subjectValue,role:t,label:a.label,targetKind:r??a.targetKind}}:{error:{action:`input`,label:`Access target`,targetUri:i,message:`Could not verify this access target`}}}catch(t){return{error:{action:`input`,label:`Access target`,targetUri:e,message:t instanceof Error&&t.message.trim()?t.message:`Could not verify this access target`}}}}dedupePendingAccessGrants(e){let t=new Map;for(let n of e)t.set(`${n.subjectType}:${n.subjectValue}`,n);return[...t.values()]}},{e:[ie,oe,P,I,R,B,H,W,K,se,le,de,pe,he,_e,ye,xe,Ce,ee],c:[$,te]}=Oe(m,[[re,1,`subjectUri`],[ae,1,`accessGrants`],[N,1,`principalInputValue`],[F,1,`addAccessRoleValue`],[L,1,`authenticatedAccessRoleValue`],[z,1,`publicAccessRoleValue`],[V,1,`submitting`],[U,1,`pendingAccessGrants`],[G,1,`accessGrantDrafts`],[q,1,`errors`],[ce,1,`successfulChangesRefreshed`],[ue,1,`accessContext`],[fe,1,`accessContextLoading`],[me,1,`accessContextError`],[ge,1,`advancedSharingOpen`],[ve,1,`containerScope`],[be,1,`containerScopeAnalysis`],[Se,1,`protectedTarget`]],ne,0,void 0,r.default),m),p=class extends Me{constructor(){super($),Z(this,`styles`,i.default),te()}},Z(p,we,void 0),p),Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return $}});
//# sourceMappingURL=AccessControlModal.cjs.js.map