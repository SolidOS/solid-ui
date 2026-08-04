import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{M as t,R as n}from"./components-Ce0BQ65X.js";import{n as r,r as i,t as a}from"./combobox-option-DUWJBNkK.js";var o,s,c,l,u,d;function f(){return(f=e((()=>{t(),i(),a(),o=r(async e=>{let{data:t}=await(await fetch(`https://beta.pokeapi.co/graphql/v1beta`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({query:`
        query searchPokemon($search: String!) {
          pokemon_v2_pokemon(where: {name: {_ilike: $search}}, limit: 20) {
            id
            name
          }
        }
      `,variables:{search:`%${e}%`}})})).json();return t.pokemon_v2_pokemon.map(e=>({value:e.id.toString(),label:e.name.charAt(0).toUpperCase()+e.name.slice(1)}))}),s={title:`Basic UI/Combobox`,args:{label:`What is the best food?`,options:`Pizza, Ramen, Tacos`,asyncJSOptions:!1,asyncHtmlOptions:!1},argTypes:{label:{control:`text`},options:{control:`text`},asyncJSOptions:{control:`boolean`},asyncHtmlOptions:{control:`boolean`}},render({label:e,options:t,asyncJSOptions:r,asyncHtmlOptions:i}){if(r)return n`<solid-ui-combobox label="${e}" .asyncOptionsProvider=${o}></solid-ui-combobox>`;if(i)return n`
        <solid-ui-combobox
          label=${e}
          async-options-url="https://api.disneyapi.dev/character?name=%search%"
          async-options-results-field="data"
          async-options-label-field="name"
          async-options-value-field="_id"
        ></solid-ui-combobox>
      `;let a=t.split(`,`).map(e=>e.trim());return n`
      <solid-ui-combobox label="${e}">
        ${a.map((e,t)=>n`${t===0?``:`        `}<solid-ui-combobox-option value="${e}">${e}</solid-ui-combobox-option>\n`)}
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