import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'fs'
import path from 'path'

const distDir = path.resolve(process.cwd(), 'dist')
const v2ComponentsDir = path.join(distDir, 'v2', 'components')
const publicComponentsDir = path.join(distDir, 'components')

if (!existsSync(v2ComponentsDir)) {
  throw new Error(`Missing expected directory: ${v2ComponentsDir}`)
}

const componentDirs = readdirSync(v2ComponentsDir).filter(name => {
  const fullPath = path.join(v2ComponentsDir, name)
  return statSync(fullPath).isDirectory()
})

for (const componentDir of componentDirs) {
  const sourceIndex = path.join(v2ComponentsDir, componentDir, 'index.d.ts')
  if (!existsSync(sourceIndex)) {
    continue
  }

  const outputDir = path.join(publicComponentsDir, componentDir)
  mkdirSync(outputDir, { recursive: true })

  const relativePath = path.relative(outputDir, path.join(v2ComponentsDir, componentDir, 'index.d.ts'))
    .replace(/\\/g, '/')
    .replace(/\.d\.ts$/, '')

  writeFileSync(
    path.join(outputDir, 'index.d.ts'),
    `export * from '${relativePath}';\n`
  )
}
