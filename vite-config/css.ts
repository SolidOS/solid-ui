// @ts-ignore - runtime export shape is correct; types are out of sync
import litCss from 'vite-plugin-lit-css'

import tailwindcss from '@tailwindcss/vite'
import type { PluginOption } from 'vite'

export default function (): PluginOption[] {
    return [
        tailwindcss(),
        litCss({ include: /\.styles\.css/ }),
    ]
}
