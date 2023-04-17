import { schnorr } from '@noble/curves/secp256k1'
import { bytesToHex } from '@noble/hashes/utils'
import { SEC, CERT } from './signature'

export function generatePrivateKey (): string {
  return bytesToHex(schnorr.utils.randomPrivateKey())
}

export function getPublicKey (privateKey: string): string {
  return bytesToHex(schnorr.getPublicKey(privateKey))
}

export function getPrivateKey (webId) {
	// find privateKey
	const url = new URL(webId)
	url.hash = ''
	store.fetcher.load(url.href)
	let publicKey = store.any(store.sym(webId), store.sym(CERT +'publicKey'))
	let privateKeyUrl = url.hostname + '/profile/privateKey.ttl'
	store.fetcher.load(privatKeyUrl)
	const privateKey = store.any(store.sym(webId), store.sym(CERT +'privateKey'))

	// create key pair
	if (!privateKey || !publicKey) {
		del = []
		add = []
		if (privateKey) del.push($rdf.sym(webId), $rdf.sym(CERT +'privateKey'), null, $rdf.sym(privateKeyUrl))
		if (publicKey) del.push($rdf.sym(webId), $rdf.sym(CERT +'publicKey'), null, $rdf.sym(url.href))

		privateKey = store.sym(generatePrivateKey())
		publicKey = store.sym(getPublicKey(privateKey.uri))

		add.push($rdf.sym(webId), $rdf.sym(CERT +'privateKey'), store.literal(privateKey.uri), $rdf.sym(privateKeyUrl))
		add.push($rdf.sym(webId), $rdf.sym(CERT +'publicKey'), store.literal(publicKey.uri), $rdf.sym(url.href))
		await store.updater.updateMany[del, add]
	}
	return privateKey.uri
}

