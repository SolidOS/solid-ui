export const rawJsonDecorator = (Story) => {
  return `<pre>${JSON.stringify(Story(), null, 2)}</pre>`
}