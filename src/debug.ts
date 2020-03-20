export const debug = {
  log (...args: any[]) {
    // eslint-disable-next-line no-console
    console.log(...args)
  },
  warn (...args: any[]) {
    // eslint-disable-next-line no-console
    console.warn(...args)
  },
  error (...args: any[]) {
    // eslint-disable-next-line no-console
    console.error(...args)
  },
  trace (...args: any[]) {
    // eslint-disable-next-line no-console
    console.trace(...args)
  }
}
