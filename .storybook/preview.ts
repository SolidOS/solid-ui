import { withProvider } from '@/storybook'

import '@/styles/theme.css'

export const tags = ['autodocs']
export const decorators = [withProvider]
export const parameters = {
    docs: {
        source: {
            excludeDecorators: true,
        }
    }
}
