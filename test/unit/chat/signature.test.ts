import { CER, SEC, getMsgHash, serializeMsg, signMsg, verifySignature } from '../../../src/chat/signature'
import { sha256 } from '@noble/hashes/sha256'

const PRIV_KEY = 'a11bc5d2eee6cdb3b37f5473a712cad905ccfb13fb2ccdbf1be0a1ac4fdc7d2a'
const PUB_KEY = '023a9da707bee1302f66083c9d95673ff969b41607a66f52686fa774d64ceb87'

describe('signature', () => {
  it('serializeMsg', () => {
    const msg = { id: 'test' }
    const res = serializeMsg(msg)
    expect(res).toEqual(JSON.stringify(msg))
  })
  it.skip('sign and verifySignature', () => {
    // worked with jest@25
    // this is a jest issue : TypeError: Expected input type is Uint8Array (got object)
    const msg = { id: 'test' }
    const sign = signMsg(msg, PRIV_KEY)
    const verify = verifySignature(sign, msg, PUB_KEY)
    expect(verify).toEqual(true)
  })
})
