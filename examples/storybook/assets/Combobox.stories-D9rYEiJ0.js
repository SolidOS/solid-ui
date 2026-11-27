import{n as e}from"./rolldown-runtime-DUjHZjTj.js";import{B as t,P as n}from"./components-VY_-izNg.js";import{n as r,r as i,t as a}from"./combobox-option-BtSk96YL.js";var o;function s(){return(s=e((()=>{o=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}).innerHTML=`<style>:host { display: inline-flex; }</style><svg viewBox="0 0 24 24" width="100%" height="100%" ><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></g></svg>`}},customElements.get(`icon-lucide-user-round`)||customElements.define(`icon-lucide-user-round`,o)})))()}var c,l,u,d,f,p,m;function h(){return(h=e((()=>{n(),i(),a(),s(),c=r(async e=>{let{data:t}=await(await fetch(`https://beta.pokeapi.co/graphql/v1beta`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({query:`
        query searchPokemon($search: String!) {
          pokemon_v2_pokemon(where: {name: {_ilike: $search}}, limit: 20) {
            id
            name
          }
        }
      `,variables:{search:`%${e}%`}})})).json();return t.pokemon_v2_pokemon.map(e=>({value:e.id.toString(),label:e.name.charAt(0).toUpperCase()+e.name.slice(1)}))}),l={title:`Basic UI/Combobox`,args:{label:`What is the best food?`,options:`Pizza, Ramen, Tacos`,asyncJSOptions:!1,asyncHtmlOptions:!1,srOnlyLabel:!1},argTypes:{label:{control:`text`},options:{control:`text`},asyncJSOptions:{control:`boolean`},asyncHtmlOptions:{control:`boolean`},srOnlyLabel:{control:`boolean`}},render({label:e,options:n,asyncJSOptions:r,asyncHtmlOptions:i,srOnlyLabel:a}){if(r)return t`<solid-ui-combobox label="${e}" .srOnlyLabel=${a} .asyncOptionsProvider=${c}></solid-ui-combobox>`;if(i)return t`
        <solid-ui-combobox
          label=${e}
          .srOnlyLabel=${a}
          async-options-url="https://api.disneyapi.dev/character?name=%search%"
          async-options-results-field="data"
          async-options-label-field="name"
          async-options-value-field="_id"
        ></solid-ui-combobox>
      `;let o=n.split(`,`).map(e=>e.trim());return t`
      <solid-ui-combobox label="${e}" .srOnlyLabel=${a}>
        ${o.map((e,n)=>t`${n===0?``:`        `}<solid-ui-combobox-option value="${e}">${e}</solid-ui-combobox-option>\n`)}
      </solid-ui-combobox>
    `}},u={},d={args:{label:`Who is the best Pokemon?`,asyncJSOptions:!0}},f={args:{label:`Who is the best Disney character?`,asyncHtmlOptions:!0}},p={render:()=>t`
    <solid-ui-combobox
      label="Choose a person"
      .asyncOptionsProvider=${r(async()=>[{value:`alice`,label:`Alice`,icon:t`<icon-lucide-user-round></icon-lucide-user-round>`},{value:`bob`,label:`Bob`}])}
    ></solid-ui-combobox>
  `},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Who is the best Pokemon?',
    asyncJSOptions: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Who is the best Disney character?',
    asyncHtmlOptions: true
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <solid-ui-combobox
      label="Choose a person"
      .asyncOptionsProvider=\${defineAsyncComboboxOptionsProvider(async () => [{
    value: 'alice',
    label: 'Alice',
    icon: html\`<icon-lucide-user-round></icon-lucide-user-round>\`
  }, {
    value: 'bob',
    label: 'Bob'
  }])}
    ></solid-ui-combobox>
  \`
}`,...p.parameters?.docs?.source}}},m=[`Primary`,`AsyncWithJS`,`AsyncWithHtml`,`WithOptionIcons`]})))()}h();export{f as AsyncWithHtml,d as AsyncWithJS,u as Primary,p as WithOptionIcons,m as __namedExportsOrder,l as default};