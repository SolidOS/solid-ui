import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{A as t,M as n,R as r,d as i,i as a,t as o,u as s}from"./components-CIN0lxju.js";import{i as c,n as l,o as u,r as d,t as f}from"./dialog-footer-D0yosSDD.js";import{t as p}from"./button-DLw9L9Az.js";function m(e,t,n){h(e,t),t.set(e,n)}function h(e,t){if(t.has(e))throw TypeError(`Cannot initialize the same private elements twice on an object`)}function g(e,t,n){return e.set(v(e,t),n),n}function _(e,t){return e.get(v(e,t))}function v(e,t,n){if(typeof e==`function`?e===t:e.has(t))return arguments.length<3?t:n;throw TypeError(`Private element is not present on this object`)}function y(e,t,n,r,i,a){function o(e,t,n){return function(r,i){return n&&n(r),e[t].call(r,i)}}function s(e,t){for(var n=0;n<e.length;n++)e[n].call(t);return t}function c(e,t,n,r){if(typeof e!=`function`&&(r||e!==void 0))throw TypeError(t+` must `+(n||`be`)+` a function`+(r?``:` or undefined`));return e}function l(e,t,n,r,i,a,s,l,u,d,f,p,m){function h(e){if(!m(e))throw TypeError(`Attempted to access private element on non-instance`)}var g,_=t[0],v=t[3],y=!l;if(!y){n||Array.isArray(_)||(_=[_]);var b={},x=[],C=i===3?`get`:i===4||p?`set`:`value`;d?(f||p?b={get:S(function(){return v(this)},r,`get`),set:function(e){t[4](this,e)}}:b[C]=v,f||S(b[C],r,i===2?``:C)):f||(b=Object.getOwnPropertyDescriptor(e,r))}for(var w=e,T=_.length-1;T>=0;T-=n?2:1){var E=_[T],D=n?_[T-1]:void 0,O={},k={kind:[`field`,`accessor`,`method`,`getter`,`setter`,`class`][i],name:r,metadata:a,addInitializer:function(e,t){if(e.v)throw Error(`attempted to call addInitializer after decoration was finished`);c(t,`An initializer`,`be`,!0),s.push(t)}.bind(null,O)};try{if(y)(g=c(E.call(D,w,k),`class decorators`,`return`))&&(w=g);else{var A,j;k.static=u,k.private=d,d?i===2?A=function(e){return h(e),b.value}:(i<4&&(A=o(b,`get`,h)),i!==3&&(j=o(b,`set`,h))):(A=function(e){return e[r]},(i<2||i===4)&&(j=function(e,t){e[r]=t}));var M=k.access={has:d?m.bind():function(e){return r in e}};if(A&&(M.get=A),j&&(M.set=j),w=E.call(D,p?{get:b.get,set:b.set}:b[C],k),p){if(typeof w==`object`&&w)(g=c(w.get,`accessor.get`))&&(b.get=g),(g=c(w.set,`accessor.set`))&&(b.set=g),(g=c(w.init,`accessor.init`))&&x.push(g);else if(w!==void 0)throw TypeError(`accessor decorators must return an object with get, set, or init properties or void 0`)}else c(w,(f?`field`:`method`)+` decorators`,`return`)&&(f?x.push(w):b[C]=w)}}finally{O.v=!0}}return(f||p)&&l.push(function(e,t){for(var n=x.length-1;n>=0;n--)t=x[n].call(e,t);return t}),f||y||(d?p?l.push(o(b,`get`),o(b,`set`)):l.push(i===2?b[C]:o.call.bind(b[C])):Object.defineProperty(e,r,b)),w}function u(e,t){return Object.defineProperty(e,Symbol.metadata||Symbol.for(`Symbol.metadata`),{configurable:!0,enumerable:!0,value:t})}if(arguments.length>=6)var d=a[Symbol.metadata||Symbol.for(`Symbol.metadata`)];var f=Object.create(d??null),p=function(e,t,n,r){var i,a,o=[],c=function(t){return C(t)===e},u=new Map;function d(e){e&&o.push(s.bind(null,e))}for(var f=0;f<t.length;f++){var p=t[f];if(Array.isArray(p)){var m=p[1],h=p[2],g=p.length>3,_=16&m,v=!!(8&m),y=(m&=7)==0,x=h+`/`+v;if(!y&&!g){var S=u.get(x);if(!0===S||S===3&&m!==4||S===4&&m!==3)throw Error(`Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: `+h);u.set(x,!(m>2)||m)}l(v?e:e.prototype,p,_,g?`#`+h:b(h),m,r,v?a||=[]:i||=[],o,v,g,y,m===1,v&&g?c:n)}}return d(i),d(a),o}(e,t,i,f);return n.length||u(e,f),{e:p,get c(){var t=[];return n.length&&[u(l(e,[n],r,e.name,5,f,t),f),s.bind(null,t,e)]}}}function b(e){var t=x(e,`string`);return typeof t==`symbol`?t:t+``}function x(e,t){if(typeof e!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function S(e,t,n){typeof t==`symbol`&&(t=(t=t.description)?`[`+t+`]`:``);try{Object.defineProperty(e,"name",{configurable:!0,value:n?n+` `+t:t})}catch{}return e}function C(e){if(Object(e)!==e)throw TypeError(`right-hand side of 'in' should be an object, got `+(e===null?`null`:typeof e));return e}var w,T,E,D,O,k,A,j,M,N;function P(){return(P=e((()=>{o(),n(),a(),p(),d(),l(),f(),D=[t(`solid-ui-sample-modal`)],M=new WeakMap,A=(O=s({type:String}),`message`),N=class extends i{constructor(...e){super(...e),m(this,M,(T(this),k(this,``)))}get[A](){return _(M,this)}set message(e){g(M,this,e)}render(){return r`
        <solid-ui-dialog title="Sample Modal">
            <solid-ui-dialog-content>
                ${this.message}
            </solid-ui-dialog-content>
            <solid-ui-dialog-footer>
                <solid-ui-button @click=${()=>this.close(`red`)}>Red</solid-ui-button>
                <solid-ui-button @click=${()=>this.close(`green`)}>Green</solid-ui-button>
                <solid-ui-button @click=${()=>this.close(`blue`)}>Blue</solid-ui-button>
            </solid-ui-dialog-footer>
        </solid-ui-dialog>
    `}},w=N,{e:[k,T],c:[j,E]}=y(w,[[O,1,`message`]],D,0,void 0,i),E()})))()}var F;function I(){return(I=e((()=>{P(),F=j})))()}var L,R,z;function B(){return(B=e((()=>{n(),c(),p(),I(),L={title:`Advanced/Dialogs`,parameters:{docs:{source:{language:`ts`,code:`
            import { customElement, DialogComponent, showDialog } from 'solid-ui'
            import { html } from 'lit'
            import { property } from 'lit/decorators.js'

            import 'solid-ui/components/button'
            import 'solid-ui/components/dialog'
            import 'solid-ui/components/dialog-content'
            import 'solid-ui/components/dialog-footer'

            @customElement('solid-ui-sample-modal')
            export class SampleModal extends DialogComponent<'red' | 'green' | 'blue'> {
                @property({ type: String })
                accessor message: string = ''

                protected render () {
                    return html\`
                        <solid-ui-dialog title=\${this.title}>
                            <solid-ui-dialog-content>
                                \${this.message}
                            </solid-ui-dialog-content>
                            <solid-ui-dialog-footer>
                                <solid-ui-button @click=\${() => this.close('red')}>Red</solid-ui-button>
                                <solid-ui-button @click=\${() => this.close('green')}>Green</solid-ui-button>
                                <solid-ui-button @click=\${() => this.close('blue')}>Blue</solid-ui-button>
                            </solid-ui-dialog-footer>
                        </solid-ui-dialog>
                    \`
                }
            }

            await showDialog(SampleModal, {
                props: {
                    message: 'Choose your favorite color:',
                },
                onClose: (result) => alert(\`You chose \${result || 'none'}!\`),
            });
        `},description:{component:"Solid UI implements a Dialog System that allows to render dialogs dynamically, instead of declaring them inline.\n\nThis works using `<solid-ui-dialogs-root>` to orchestrate the opening and closing of dialogs under the hood. If\nyou're using `<solid-ui-provider>`, it comes configured out of the box."}}}},R={render:()=>r`
    <solid-ui-button @click=${()=>u(F,{props:{message:`Choose your favorite color:`},onClose:e=>alert(`You chose ${e||`none`}!`)})}>Open Modal</solid-ui-button>
  `},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <solid-ui-button @click=\${() => showDialog(SampleModal, {
    props: {
      message: 'Choose your favorite color:'
    },
    onClose: result => alert(\`You chose \${result || 'none'}!\`)
  })}>Open Modal</solid-ui-button>
  \`
}`,...R.parameters?.docs?.source}}},z=[`Primary`]})))()}B();export{R as Primary,z as __namedExportsOrder,L as default};