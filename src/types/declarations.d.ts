declare module '*.sparql' {
  const content: string
  export default content
}

// unplugin-icons virtual modules — side-effect imports register custom elements
declare module '~icons/lucide/*'
declare module '~icons/svg-spinners/*'
declare module '~icons/*'

// CommonJS `module` global used by iconBase.ts for script URI detection
declare var module: { scriptURI?: string } | undefined
