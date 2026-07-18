import{i as e}from"./preload-helper-BdFrVu1K.js";import{Kt as t,Yt as n,ft as r}from"./iframe-EzcYZOzL.js";import{n as i,t as a}from"./Menu-DaeUHt1j.js";function o(e,t){let n=e.target,r=n.parentElement.querySelectorAll(`solid-ui-menu-item`);for(let e of r)e.selected=!1;n.selected=!0,alert(t)}var s,c,l;e((()=>{t(),r(),i(),a(),s={title:`Basic UI/Menu`,render:()=>n`
        <solid-ui-menu>
            <solid-ui-button slot="trigger">
                Open Menu
            </solid-ui-button>

            <solid-ui-menu-item @solid-ui-select=${e=>o(e,`Selected One!`)}>One</solid-ui-menu-item>
            <solid-ui-menu-item @solid-ui-select=${e=>o(e,`Selected Two!`)}>Two</solid-ui-menu-item>
            <solid-ui-menu-item href="https://solidproject.org">External Link</solid-ui-menu-item>
        </solid-ui-menu>
    `},c={},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l=[`Primary`]}))();export{c as Primary,l as __namedExportsOrder,s as default};