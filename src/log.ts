import { escapeForXML } from './utils'

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

/* global alert */
class Log {
  public level: number = TERROR + TWARN + TMESG
  public ascending: boolean = false

  public msg (str: string, type: number = TMESG, typestr: string = 'mesg') {
    if (!(this.level & type)) return // bitmask

    if (typeof document !== 'undefined') {
      const logArea = document.getElementById('status')
      if (!logArea) return

      const addendum = document.createElement('span')
      addendum.setAttribute('class', typestr)
      const now = new Date()
      addendum.innerHTML = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} [${typestr}] ${escapeForXML(str)}<br/>`
      if (!this.ascending) {
        logArea.appendChild(addendum)
      } else {
        logArea.insertBefore(addendum, logArea.firstChild)
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
    if (typeof alert !== 'undefined') {
      alert(msg)
    } else {
      this.warn(msg)
    }
  }

  clear (): void {
    const logArea = document.getElementById('status')
    if (!logArea) return
    logArea.innerHTML = ''
  }

  setLevel (level: number): void {
    this.level = TALL
    this.debug('Log level is now ' + level)
    this.level = level
  }

  dumpHTML (): void {
    const level = this.level
    this.level = TALL
    this.debug(document.body.innerHTML)
    this.level = level
  }
}

export const log = new Log()
