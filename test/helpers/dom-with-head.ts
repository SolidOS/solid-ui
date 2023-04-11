import { JSDOM } from 'jsdom'

export function domWithHead () {
  const window = new JSDOM('<!DOCTYPE html><head></head><body><p>Hello world</p></body>').window
  const dom = window.document
  return {
    head: {},
    createElement: dom.createElement.bind(dom)
  } as unknown as HTMLDocument
}
