const compiler = {
  compiler (svg, collection, icon) {
    const id = `icon-${collection}-${icon}`
    const className = id.replace(/-/g, '')

    return `
        export default class ${className} extends HTMLElement {
            constructor() {
                super()
                this.attachShadow({ mode: 'open' }).innerHTML = ${JSON.stringify('<style>:host { display: inline-flex; }</style>' + svg)}
            }
        }

        customElements.define('${id}', ${className})
    `
  },
}

/** @type {import('unplugin-icons').Options} */
export default {
  scale: 1,
  compiler,
  iconCustomizer (_, __, props) {
    props.width = '100%'
    props.height = '100%'
  }
}
