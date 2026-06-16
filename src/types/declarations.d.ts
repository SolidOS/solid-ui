declare module '*.sparql' {
  const content: string
  export default content
}

// CommonJS `module` global used by iconBase.ts for script URI detection
declare var module: { scriptURI?: string } | undefined
