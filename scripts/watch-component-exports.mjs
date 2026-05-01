import { spawn } from 'child_process'
import { existsSync, watch } from 'fs'
import path from 'path'

const scriptsDir = path.resolve(process.cwd(), 'scripts')
const manifestFile = 'component-manifest.mjs'
const syncScript = path.resolve(scriptsDir, 'sync-component-exports.mjs')
let syncTimer = null
let running = false
let rerunRequested = false

const runSync = () => {
  if (running) {
    rerunRequested = true
    return
  }

  running = true
  rerunRequested = false

  const child = spawn(process.execPath, [syncScript], {
    stdio: 'inherit'
  })

  child.on('exit', code => {
    running = false

    if (code !== 0) {
      console.error(`sync-component-exports exited with code ${code}`)
    }

    if (rerunRequested) {
      runSync()
    }
  })
}

const scheduleSync = () => {
  clearTimeout(syncTimer)
  syncTimer = setTimeout(() => {
    runSync()
  }, 150)
}

if (!existsSync(scriptsDir)) {
  throw new Error(`Missing expected directory: ${scriptsDir}`)
}

console.log(`Watching ${path.join(scriptsDir, manifestFile)} for export manifest changes...`)

runSync()

watch(scriptsDir, (eventType, filename) => {
  if (!filename) return
  if (filename === manifestFile) {
    scheduleSync()
  }
})