import { mkdirSync, writeFileSync } from 'fs'

// Generates thin declaration wrappers under dist/components/ that re-export
// from the tsc output under dist/v2/components/, keeping v2 internal and the
// public package layout clean.

mkdirSync('dist/components/header', { recursive: true })

writeFileSync(
  'dist/components/header/index.d.ts',
  "export * from '../../v2/components/header/index';\n"
)
