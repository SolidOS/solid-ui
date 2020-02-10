export const element = {
  appendChild: (x: any) => x,
  removeChild: () => {},
  getAttribute: () => {},
  setAttribute: () => {},
  addEventListener: () => {},
  select: () => {},
  focus: () => {},
  classList: {
    add: () => {},
    toggle: () => {}
  },
  children: [],
  firstChild: {}
}

export const event = {
  preventDefault: () => {},
  stopPropagation: () => {},
  target: element
}

export const dom = {
  createElement() {
    return element
  },
  createTextNode() {
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