import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{M as t,R as n}from"./components-CIN0lxju.js";import{t as r}from"./storybook-DZVUXtjX.js";import{n as i,r as a}from"./auth-DQyYJWVJ.js";import{i as o,o as s}from"./dialog-footer-D0yosSDD.js";import{t as c}from"./button-DLw9L9Az.js";function l(e,t){return e}var u,d,f,p,m;function h(){return(h=e((()=>{t(),r(),o(),c(),a(),u={title:`Solid/Login Modal`,parameters:{docs:{source:{language:`ts`,code:`
            import { showDialog } from 'solid-ui';
            import LoginModal from 'solid-ui/components/login-modal';

            await showDialog<LoginModal>(html\`<solid-ui-login-modal></solid-ui-login-modal>\`);
        `}}}},d={render:()=>n`
    <solid-ui-button @click=${()=>s(i)}>Open</solid-ui-button>
  `},f={render:()=>n`
    <solid-ui-button @click=${async()=>{let e=l(s(i),[`submitting`]);e.submitting=!0}}>Open</solid-ui-button>
  `},p={render:()=>n`
    <solid-ui-button @click=${async()=>{let e=l(s(i),[`failed`]);e.failed=!0}}>Open</solid-ui-button>
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
}`,...p.parameters?.docs?.source}}},m=[`Primary`,`Loading`,`Failed`]})))()}h();export{p as Failed,f as Loading,d as Primary,m as __namedExportsOrder,u as default};