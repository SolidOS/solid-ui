import{i as e}from"./preload-helper-BdFrVu1K.js";import{I as t,J as n,N as r,X as i,Y as a,Z as o,_t as s,cn as c,dn as l,gt as u,ln as d,sn as f,un as p}from"./iframe-DKr4hIT3.js";import{t as m}from"./log-in-DhCXOv_t.js";var h,g,_=e((()=>{l(),i(),h=class extends a{constructor(e){if(super(e),this.it=c,e.type!==o.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===c||e==null)return this._t=void 0,this.it=e;if(e===d)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}},h.directiveName=`unsafeHTML`,h.resultType=1,g=n(h)})),v=e((()=>{_()})),y,b=e((()=>{y=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}).innerHTML=`<style>:host { display: inline-flex; }</style><svg viewBox="0 0 24 24" width="100%" height="100%" ><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"/></svg>`}},customElements.get(`icon-lucide-check`)||customElements.define(`icon-lucide-check`,y)})),x,S=e((()=>{x=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}).innerHTML=`<style>:host { display: inline-flex; }</style><svg viewBox="0 0 24 24" width="100%" height="100%" ><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7v14"/></svg>`}},customElements.get(`icon-lucide-plus`)||customElements.define(`icon-lucide-plus`,x)})),C,w=e((()=>{C=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}).innerHTML=`<style>:host { display: inline-flex; }</style><svg viewBox="0 0 24 24" width="100%" height="100%" ><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01"/></g></svg>`}},customElements.get(`icon-lucide-help-circle`)||customElements.define(`icon-lucide-help-circle`,C)})),T,E,D,O,k,A,j,M;e((()=>{f(),v(),r(),b(),S(),m(),w(),s(),T=t([[`Check`,`check`],[`Plus`,`plus`],[`Log In`,`log-in`],[`Help`,`help-circle`],[`None`,null]]),E={title:`Basic UI/Button`,args:{text:`Save Changes`,title:``,variant:`primary`,icon:`None`,leftIcon:`None`,rightIcon:`None`,disabled:!1,loading:!1},argTypes:{variant:{control:`select`,options:u},title:{control:`text`},icon:T.control,leftIcon:T.control,rightIcon:T.control,text:{control:`text`},disabled:{control:`boolean`},loading:{control:`boolean`}},render({icon:e,leftIcon:t,rightIcon:n,variant:r,disabled:i,loading:a,title:o,text:s}){let l=T.resolve(e),u=T.resolve(t),d=T.resolve(n);return p`
        <solid-ui-button variant="${r}" .disabled=${i} ?loading=${a} title=${o||c}>
            ${u?g(`<icon-lucide-${u} slot="left-icon"></icon-lucide-${u}>`):c}
            ${l?g(`<icon-lucide-${l} slot="icon"></icon-lucide-${l}>`):c}
            ${s}
            ${d?g(`<icon-lucide-${d} slot="right-icon"></icon-lucide-${d}>`):c}
        </solid-ui-button>
    `}},D={},O={args:{text:`Cancel`,variant:`secondary`}},k={args:{text:`Add More`,variant:`tertiary`,leftIcon:`Plus`}},A={args:{text:`Sign Up`,variant:`outline`,leftIcon:`Log In`}},j={args:{text:``,variant:`ghost`,icon:`Help`,title:`Open help`}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Cancel',
    variant: 'secondary'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Add More',
    variant: 'tertiary',
    leftIcon: 'Plus'
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Sign Up',
    variant: 'outline',
    leftIcon: 'Log In'
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    text: '',
    variant: 'ghost',
    icon: 'Help',
    title: 'Open help'
  }
}`,...j.parameters?.docs?.source}}},M=[`Primary`,`Secondary`,`Tertiary`,`Outline`,`Ghost`]}))();export{j as Ghost,A as Outline,D as Primary,O as Secondary,k as Tertiary,M as __namedExportsOrder,E as default};