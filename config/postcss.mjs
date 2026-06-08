import PostCSS from 'postcss'
import TailwindCSS from '@tailwindcss/postcss'

const cssProcessor = PostCSS([TailwindCSS()])

export default {
  async transform (css, { filePath }) {
    const result = await cssProcessor.process(css, { from: filePath })

    return result.css
  }
}
