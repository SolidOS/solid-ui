import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{B as t,P as n}from"./components-BU501MLk.js";import{n as r,r as i,t as a}from"./combobox-option-YNcb5Hme.js";var o,s,c,l,u,d;function f(){return(f=e((()=>{n(),i(),a(),o=r(async e=>{let{data:t}=await(await fetch(`https://beta.pokeapi.co/graphql/v1beta`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({query:`
        query searchPokemon($search: String!) {
          pokemon_v2_pokemon(where: {name: {_ilike: $search}}, limit: 20) {
            id
            name
          }
        }
      `,variables:{search:`%${e}%`}})})).json();return t.pokemon_v2_pokemon.map(e=>({value:e.id.toString(),label:e.name.charAt(0).toUpperCase()+e.name.slice(1)}))}),s={title:`Basic UI/Combobox`,args:{label:`What is the best food?`,options:`Pizza, Ramen, Tacos`,asyncJSOptions:!1,asyncHtmlOptions:!1,srOnlyLabel:!1},argTypes:{label:{control:`text`},options:{control:`text`},asyncJSOptions:{control:`boolean`},asyncHtmlOptions:{control:`boolean`},srOnlyLabel:{control:`boolean`}},render({label:e,options:n,asyncJSOptions:r,asyncHtmlOptions:i,srOnlyLabel:a}){if(r)return t`<solid-ui-combobox label="${e}" .srOnlyLabel=${a} .asyncOptionsProvider=${o}></solid-ui-combobox>`;if(i)return t`
        <solid-ui-combobox
          label=${e}
          .srOnlyLabel=${a}
          async-options-url="https://api.disneyapi.dev/character?name=%search%"
          async-options-results-field="data"
          async-options-label-field="name"
          async-options-value-field="_id"
        ></solid-ui-combobox>
      `;let s=n.split(`,`).map(e=>e.trim());return t`
      <solid-ui-combobox label="${e}" .srOnlyLabel=${a}>
        ${s.map((e,n)=>t`${n===0?``:`        `}<solid-ui-combobox-option value="${e}">${e}</solid-ui-combobox-option>\n`)}
      </solid-ui-combobox>
    `}},c={},l={args:{label:`Who is the best Pokemon?`,asyncJSOptions:!0}},u={args:{label:`Who is the best Disney character?`,asyncHtmlOptions:!0}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Who is the best Pokemon?',
    asyncJSOptions: true
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Who is the best Disney character?',
    asyncHtmlOptions: true
  }
}`,...u.parameters?.docs?.source}}},d=[`Primary`,`AsyncWithJS`,`AsyncWithHtml`]})))()}f();export{u as AsyncWithHtml,l as AsyncWithJS,c as Primary,d as __namedExportsOrder,s as default};