export const element = {
  appendChild: () => {},
  setAttribute: () => {},
}

export const dom = {
  createElement() {
    return element
  },
  // setAttribute() {
  // },
  querySelectorAll() {
    return {}
  },
  getElementsByTagName: () => [
    element
  ]
}