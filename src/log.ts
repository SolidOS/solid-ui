// ///////////////////////  Logging
//
// bitmask levels
// const TNONE = 0
const TERROR = 1
const TWARN = 2
const TMESG = 4
const TSUCCESS = 8
const TINFO = 16
const TDEBUG = 32
const TALL = 63

export enum LogLevel {
  Error = TERROR,
  Warning = TWARN,
  Message = TMESG,
  Success = TSUCCESS,
  Info = TINFO,
  Debug = TDEBUG,
  All = TALL
}

class Log {
  public level: number = TERROR + TWARN + TMESG
  public ascending: boolean = false
  public dom?: HTMLDocument = document // must be able to override for tests
  public window?: Window = window // must be able to override for tests

  public msg (str: string, type: number = TMESG, typestr: string = 'mesg') {
    if (!(this.level & type)) return // bitmask

    if (typeof this.dom !== 'undefined') {
      const logArea = this.dom.getElementById('status')
      if (!logArea) return

      const addendum = this.dom.createElement('span')
      addendum.setAttribute('class', typestr)
      const now = new Date()
      addendum.innerHTML = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} [${typestr}] ${escapeForXML(str)}<br/>`
      if (this.ascending) {
        logArea.insertBefore(addendum, logArea.firstChild)
      } else {
        logArea.appendChild(addendum)
      }
    } else if (typeof console !== 'undefined') {
      console.log(str)
    }
  }

  warn (msg: string): void {
    this.msg(msg, TWARN, 'warn')
  }

  debug (msg: string): void {
    this.msg(msg, TDEBUG, 'dbug')
  }

  info (msg: string): void {
    this.msg(msg, TINFO, 'info')
  }

  error (msg: string): void {
    this.msg(msg, TERROR, 'eror')
  }

  success (msg: string): void {
    this.msg(msg, TSUCCESS, 'good')
  }

  alert (msg: string): void {
    if (this.window && typeof this.window.alert !== 'undefined') {
      this.window.alert(msg)
    } else {
      this.warn(msg)
    }
  }

  clear (): void {
    const logArea = this.dom?.getElementById('status')
    if (!logArea) return
    logArea.innerHTML = ''
  }

  setLevel (level: number): void {
    this.level = TALL
    this.debug('Log level is now ' + level)
    this.level = level
  }

  dumpHTML (): void {
    if (!this.dom) return
    const level = this.level
    this.level = TALL
    this.debug(this.dom?.body?.innerHTML || '')
    this.level = level
  }
}

export function escapeForXML (str: string): string {
  // can be replaced with function utils module when migrating
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export const log = new Log()
