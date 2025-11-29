export declare const utf8Decoder: TextDecoder;
export declare const utf8Encoder: TextEncoder;
export declare const SEC = "https://w3id.org/security#";
export type MsgTemplate = {
    id: string;
    created: string;
    dateDeleted: string;
    content: string;
    maker: string;
    sig: string;
};
export type UnsignedMsg = MsgTemplate & {
    pubkey: string;
};
export type Message = UnsignedMsg & {
    id: string;
    sig: string;
};
export declare function getBlankMsg(): MsgTemplate;
export declare function serializeMsg(msg: UnsignedMsg): string;
export declare function getMsgHash(message: UnsignedMsg): string;
export declare function verifySignature(sig: string, message: Message, pubKey: string): boolean;
export declare function signMsg(message: UnsignedMsg, key: string): string;
//# sourceMappingURL=signature.d.ts.map