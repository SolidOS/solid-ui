import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { componentExports } from './component-manifest.mjs'

const packageJsonPath = path.resolve(process.cwd(), 'package.json')
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))

const preservedExports = Object.fromEntries(
  Object.entries(packageJson.exports || {}).filter(([subpath]) => !subpath.startsWith('./components/'))
)

packageJson.exports = {
  ...preservedExports,
  ...componentExports
}

writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)