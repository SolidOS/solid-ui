import { mkdirSync, writeFileSync } from 'fs'

// Generates thin declaration wrappers under dist/components/ that re-export
// from the tsc output under dist/v2/components/, keeping v2 internal and the
// public package layout clean.

const componentWrappers = [
  {
    outputDir: 'header',
    exportPath: '../../v2/components/header/index'
  },
  {
    outputDir: 'loginButton',
    exportPath: '../../v2/components/loginButton/index'
  },
  {
    outputDir: 'signupButton',
    exportPath: '../../v2/components/signupButton/index'
  }
]

for (const { outputDir, exportPath } of componentWrappers) {
  mkdirSync(`dist/components/${outputDir}`, { recursive: true })

  writeFileSync(
    `dist/components/${outputDir}/index.d.ts`,
    `export * from '${exportPath}';\n`
  )
}
