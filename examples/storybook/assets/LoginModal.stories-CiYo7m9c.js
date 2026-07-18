import{i as e}from"./preload-helper-BdFrVu1K.js";import{B as t,F as n,Kt as r,N as i,Yt as a,_t as o,ft as s,yt as c,z as l}from"./iframe-EzcYZOzL.js";var u,d,f,p,m;e((()=>{r(),i(),o(),s(),t(),u={title:`Solid/Login Modal`,parameters:{docs:{source:{language:`ts`,code:`
            import { showDialog } from 'solid-ui';
            import LoginModal from 'solid-ui/components/login-modal';

            await showDialog<LoginModal>(html\`<solid-ui-login-modal></solid-ui-login-modal>\`);
        `}}}},d={render:()=>a`
    <solid-ui-button @click=${()=>c(l)}>Open</solid-ui-button>
  `},f={render:()=>a`
    <solid-ui-button @click=${async()=>{let e=n(c(l),[`submitting`]);e.submitting=!0}}>Open</solid-ui-button>
  `},p={render:()=>a`
    <solid-ui-button @click=${async()=>{let e=n(c(l),[`failed`]);e.failed=!0}}>Open</solid-ui-button>
  `},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <solid-ui-button @click=\${() => showDialog(LoginModal)}>Open</solid-ui-button>
  \`
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <solid-ui-button @click=\${async () => {
    const dialog = showDialog(LoginModal);
    const dialogInternals = internals(dialog, ['submitting']);
    dialogInternals.submitting = true;
  }}>Open</solid-ui-button>
  \`
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <solid-ui-button @click=\${async () => {
    const dialog = showDialog(LoginModal);
    const dialogInternals = internals(dialog, ['failed']);
    dialogInternals.failed = true;
  }}>Open</solid-ui-button>
  \`
}`,...p.parameters?.docs?.source}}},m=[`Primary`,`Loading`,`Failed`]}))();export{p as Failed,f as Loading,d as Primary,m as __namedExportsOrder,u as default};