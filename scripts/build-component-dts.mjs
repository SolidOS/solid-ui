import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'fs'
import path from 'path'
import { v2Components } from './component-manifest.mjs'

const distDir = path.resolve(process.cwd(), 'dist')
const v2ComponentsDir = path.join(distDir, 'v2', 'components')
const publicComponentsDir = path.join(distDir, 'components')

if (!existsSync(v2ComponentsDir)) {
  throw new Error(`Missing expected directory: ${v2ComponentsDir}`)
}

const manifestComponents = v2Components.map(({ sourceDir, sourcePath = sourceDir }) => ({
  publicDir: sourceDir,
  sourcePath
}))

const fallbackComponentDirs = readdirSync(v2ComponentsDir).filter(name => {
  const fullPath = path.join(v2ComponentsDir, name)
  return statSync(fullPath).isDirectory()
}).map(name => ({
  publicDir: name,
  sourcePath: name
}))

const componentDirs = manifestComponents.length > 0 ? manifestComponents : fallbackComponentDirs

for (const { publicDir, sourcePath } of componentDirs) {
  const sourceIndex = path.join(v2ComponentsDir, sourcePath, 'index.d.ts')
  if (!existsSync(sourceIndex)) {
    continue
  }

  const outputDir = path.join(publicComponentsDir, publicDir)
  mkdirSync(outputDir, { recursive: true })

  const relativePath = path.relative(outputDir, sourceIndex)
    .replace(/\\/g, '/')
    .replace(/\.d\.ts$/, '')

  writeFileSync(
    path.join(outputDir, 'index.d.ts'),
    `export * from '${relativePath}';\n`
  )
}
