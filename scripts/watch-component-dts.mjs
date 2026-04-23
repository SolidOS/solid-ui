import { spawn } from 'child_process'
import { existsSync, watch } from 'fs'
import path from 'path'

const componentDir = path.resolve(process.cwd(), 'dist/v2/components')
const scriptPath = path.resolve(process.cwd(), 'scripts/build-component-dts.mjs')
let buildTimer = null
let running = false
let waiting = false

const runBuild = () => {
  if (running) return
  running = true
  const child = spawn(process.execPath, [scriptPath], {
    stdio: 'inherit'
  })

  child.on('exit', code => {
    running = false
    if (code !== 0) {
      console.error(`build-component-dts exited with code ${code}`)
    }
  })
}

const scheduleBuild = () => {
  clearTimeout(buildTimer)
  buildTimer = setTimeout(() => {
    if (existsSync(componentDir)) {
      runBuild()
    }
  }, 150)
}

const startWatcher = () => {
  if (!existsSync(componentDir)) {
    if (!waiting) {
      console.log(`Waiting for ${componentDir} to exist before watching component declarations...`)
      waiting = true
    }
    setTimeout(startWatcher, 250)
    return
  }

  if (waiting) {
    console.log(`${componentDir} exists; starting watch...`)
  } else {
    console.log(`Watching ${componentDir} for component declaration changes...`)
  }

  watch(componentDir, { recursive: true }, (eventType, filename) => {
    if (!filename) return
    if (filename.endsWith('.d.ts') || filename.endsWith('.js') || filename.endsWith('.map')) {
      scheduleBuild()
    }
  })
}

runBuild()
startWatcher()
