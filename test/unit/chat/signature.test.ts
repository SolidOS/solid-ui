import { describe, expect, it } from 'vitest'
import { serializeMsg, signMsg, UnsignedMsg, verifySignature } from '../../../src/chat/signature'

const PRIV_KEY = 'a11bc5d2eee6cdb3b37f5473a712cad905ccfb13fb2ccdbf1be0a1ac4fdc7d2a'
const PUB_KEY = '023a9da707bee1302f66083c9d95673ff969b41607a66f52686fa774d64ceb87'

describe('signature', () => {
  it('serializeMsg', () => {
    const msg = { id: 'test' } as any as UnsignedMsg
    const res = serializeMsg(msg)
    expect(res).toEqual(JSON.stringify(msg))
  })
  it('sign and verifySignature', () => {
    const msg = { id: 'test' } as any as UnsignedMsg
    const sign = signMsg(msg, PRIV_KEY)
    const verify = verifySignature(sign, msg, PUB_KEY)
    expect(verify).toEqual(true)
  })
})
