import { schnorr } from '@noble/curves/secp256k1'
import { sha256 } from '@noble/hashes/sha256'
import { bytesToHex } from '@noble/hashes/utils'

// import {utf8Encoder} from './utils'
// import { getPublicKey } from './keys'

export const utf8Decoder = new TextDecoder('utf-8')
export const utf8Encoder = new TextEncoder()

export const SEC = 'https://w3id.org/security#' // Proof, VerificationMethod
export const CERT = 'http://www.w3.org/ns/auth/cert#' // PrivatKey, PublicKey

/* eslint-disable no-unused-vars */
/* export enum Kind {
  Metadata = 0,
  Text = 1,
  RecommendRelay = 2,
  Contacts = 3,
  EncryptedDirectMessage = 4,
  EventDeletion = 5,
  Reaction = 7,
  BadgeAward = 8,
  ChannelCreation = 40,
  ChannelMetadata = 41,
  ChannelMessage = 42,
  ChannelHideMessage = 43,
  ChannelMuteUser = 44,
  Report = 1984,
  ZapRequest = 9734,
  Zap = 9735,
  RelayList = 10002,
  ClientAuth = 22242,
  BadgeDefinition = 30008,
  ProfileBadge = 30009,
  Article = 30023
} */

export type MsgTemplate = {
  id: string
  created: string
  content: string
  dateDeleted: string
  content: string
  maker: string
  sig: string
}

export type UnsignedMsg = MsgTemplate & {
  pubkey: string
}

export type Message = UnsignedMsg & {
  id: string
  sig: string
}

export function getBlankMsg (): MsgTemplate {
  return {
    id: '',
    created: '',
    dateDeleted: '',
    content: '',
    maker: '',
    sig: ''
  }
}

export function finishMsg (t: MsgTemplate, privateKey: string): Message {
  // to update to chat message triples
  const message = t as Message
  // message.pubkey = getPublicKey(privateKey)
  message.id = getMsgHash(message)
  message.sig = signMsg(message, privateKey)
  return message
}

export function serializeMsg (msg: UnsignedMsg): string {
  // to update to chat messages triples
  /* if (!validateMsg(msg))
    throw new Error("can't serialize message with wrong or missing properties") */

  return JSON.stringify(msg)
}

export function getMsgHash (message: UnsignedMsg): string {
  const msgHash = sha256(utf8Encoder.encode(serializeMsg(message)))
  return bytesToHex(msgHash)
}

const isRecord = (obj: unknown): obj is Record<string, unknown> => obj instanceof Object

export function validateMsg<T> (message: T): message is T & UnsignedMsg {
  /* if (!isRecord(message)) return false
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
  } */

  return true
}

export function verifySignature (sig: string, message: Message, pubKey: string): boolean {
  return schnorr.verify(
    sig,
    getMsgHash(message),
    pubKey
  )
}

export function signMsg (message: UnsignedMsg, key: string): string {
  return bytesToHex(
    schnorr.sign(getMsgHash(message), key)
  )
}
