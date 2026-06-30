import { existsSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

const projectRoot = resolve(import.meta.dirname, '..')

export const litDecoratorPaths = [
    'src/components',
    'src/storybook',
]

export const componentsSrcDir = join(projectRoot, 'src/components')

export function discoverComponents(): string[] {
    return readdirSync(componentsSrcDir, { withFileTypes: true })
        .filter(
            (entry) =>
                entry.isDirectory()
                && existsSync(join(componentsSrcDir, entry.name, 'index.ts'))
        )
        .map((entry) => entry.name)
        .sort()
}
