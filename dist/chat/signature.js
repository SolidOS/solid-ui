import { schnorr } from '@noble/curves/secp256k1';
import { bytesToHex } from '@noble/hashes/utils';
import { sha256 } from '@noble/hashes/sha256';
// import {utf8Encoder} from './utils'
// import { getPublicKey } from './keys'
export const utf8Decoder = new TextDecoder('utf-8');
export const utf8Encoder = new TextEncoder();
export const SEC = 'https://w3id.org/security#'; // Proof, VerificationMethod
export function getBlankMsg() {
    return {
        id: '',
        created: '',
        dateDeleted: '', // TODO to remove if not used
        content: '',
        maker: '',
        sig: '' // TODO to remove if not used
    };
}
/* export function finishMsg (t: MsgTemplate, privateKey: string): Message {
  // to update to chat message triples
  const message = t as Message
  // message.pubkey = getPublicKey(privateKey)
  message.id = getMsgHash(message)
  message.sig = signMsg(message, privateKey)
  return message
} */
export function serializeMsg(msg) {
    // to update to chat messages triples
    /* if (!validateMsg(msg))
      throw new Error("can't serialize message with wrong or missing properties") */
    return JSON.stringify(msg);
}
export function getMsgHash(message) {
    const msgHash = sha256(utf8Encoder.encode(serializeMsg(message)));
    return bytesToHex(msgHash);
}
// const isRecord = (obj: unknown): obj is Record<string, unknown> => obj instanceof Object
/* export function validateMsg<T> (message: T): message is T & UnsignedMsg {
  if (!isRecord(message)) return false
  if (typeof message.kind !== 'number') return false
  if (typeof message.content !== 'string') return false
  if (typeof message.created_at !== 'number') return false
  if (typeof message.pubkey !== 'string') return false
  if (!message.pubkey.match(/^[a-f0-9]{64}$/)) return false

  if (!Array.isArray(message.tags)) return false
  for (let i = 0; i < message.tags.length; i++) {
    let tag = message.tags[i]
    if (!Array.isArray(tag)) return false
    for (let j = 0; j < tag.length; j++) {
      if (typeof tag[j] === 'object') return false
    }
  }

  return true
} */
export function verifySignature(sig, message, pubKey) {
    return schnorr.verify(sig, getMsgHash(message), pubKey);
}
export function signMsg(message, key) {
    return bytesToHex(schnorr.sign(getMsgHash(message), key));
}
//# sourceMappingURL=signature.js.map