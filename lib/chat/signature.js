"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SEC = void 0;
exports.getBlankMsg = getBlankMsg;
exports.getMsgHash = getMsgHash;
exports.serializeMsg = serializeMsg;
exports.signMsg = signMsg;
exports.utf8Encoder = exports.utf8Decoder = void 0;
exports.verifySignature = verifySignature;
var _secp256k = require("@noble/curves/secp256k1");
var _utils = require("@noble/hashes/utils");
var _sha = require("@noble/hashes/sha256");
// import {utf8Encoder} from './utils'
// import { getPublicKey } from './keys'

var utf8Decoder = exports.utf8Decoder = new TextDecoder('utf-8');
var utf8Encoder = exports.utf8Encoder = new TextEncoder();
var SEC = exports.SEC = 'https://w3id.org/security#'; // Proof, VerificationMethod
// export const CERT = 'http://www.w3.org/ns/auth/cert#' // PrivateKey, PublicKey, key

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

function getBlankMsg() {
  return {
    id: '',
    created: '',
    dateDeleted: '',
    // TODO to remove if not used
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

function serializeMsg(msg) {
  // to update to chat messages triples
  /* if (!validateMsg(msg))
    throw new Error("can't serialize message with wrong or missing properties") */

  return JSON.stringify(msg);
}
function getMsgHash(message) {
  var msgHash = (0, _sha.sha256)(utf8Encoder.encode(serializeMsg(message)));
  return (0, _utils.bytesToHex)(msgHash);
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

function verifySignature(sig, message, pubKey) {
  return _secp256k.schnorr.verify(sig, getMsgHash(message), pubKey);
}
function signMsg(message, key) {
  return (0, _utils.bytesToHex)(_secp256k.schnorr.sign(getMsgHash(message), key));
}
//# sourceMappingURL=signature.js.map