import { type LiveStore, type NamedNode } from 'rdflib'
import { ACL_LINK } from 'solid-logic'
import ns from '@/lib/ns'
import type { FileExplorerResourceMetadata } from './types'

function parseWacAllowHeader (headerValue: string | null | undefined) {
  const permissions = new Map<string, Set<string>>()
  if (!headerValue) return permissions

  for (const entry of headerValue.split(',')) {
    const match = entry.trim().match(/^([A-Za-z]+)\s*=\s*"([^"]*)"$/)
    if (match) {
      const [, permissionGroup, accessModes] = match
      const modes = accessModes.trim().split(/\s+/).filter(Boolean)
      permissions.set(permissionGroup.toLowerCase(), new Set(modes.map(mode => mode.toLowerCase())))
    }
  }

  return permissions
}

function deriveAccessFlags (wacAllow: string | null | undefined) {
  if (!wacAllow) {
    return { canEdit: false, isPublic: false }
  }

  const permissions = parseWacAllowHeader(wacAllow)
  const userModes = permissions.get('user') ?? new Set<string>()
  const publicModes = permissions.get('public') ?? new Set<string>()

  return {
    canEdit: userModes.has('write'),
    isPublic: publicModes.has('read') || publicModes.has('write')
  }
}

export function getContainerItemCount (store: LiveStore | undefined, subjectUri: string | undefined): number {
  if (!store || !subjectUri) return 0

  const subject = store.sym(subjectUri)
  const seen = new Set<string>()

  for (const item of store.each(subject, ns.ldp('contains'))) {
    if (item.termType === 'NamedNode') {
      const resource = item as NamedNode
      const parent = resource.dir()

      if (parent) {
        const pathEnd = resource.uri.slice(parent.uri.length)
        if (
          !pathEnd.startsWith('.') &&
          !pathEnd.endsWith('.acl') &&
          !pathEnd.endsWith('~')
        ) {
          seen.add(resource.uri)
        }
      }
    }
  }

  return seen.size
}

export function getResponseMetadata (store: LiveStore, subject: NamedNode, response: Response): FileExplorerResourceMetadata {
  let contentType: string | undefined
  let canEdit = false
  let isPublic = false
  let eTag: string | undefined
  let modified: string | undefined

  if (response.headers && response.headers.get('content-type')) {
    contentType = response.headers.get('content-type')?.split(';')[0] ?? undefined
    const accessFlags = deriveAccessFlags(response.headers.get('wac-allow'))

    canEdit = accessFlags.canEdit
    isPublic = accessFlags.isPublic
    eTag = response.headers.get('etag') ?? undefined
    modified = store.anyValue(subject as any, ns.dct('modified')) || store.anyValue(subject as any, ns.dc('modified')) || undefined
  } else {
    const reqs = store.each(
      null,
      store.sym('http://www.w3.org/2007/ont/link#requestedURI'),
      subject
    )

    reqs.forEach((req: any) => {
      const responseNode = store.any(
        req as any,
        store.sym('http://www.w3.org/2007/ont/link#response')
      )

      if (responseNode && responseNode.termType === 'NamedNode') {
        contentType = store.anyValue(responseNode as any, ns.httph('content-type')) || undefined
        const wacAllow = (store.anyValue(responseNode as any, ns.httph('wac-allow')) as string | undefined) ||
          (store.anyValue(responseNode as any, ns.httph('WAC-Allow')) as string | undefined)
        const accessFlags = deriveAccessFlags(wacAllow)
        canEdit = accessFlags.canEdit
        isPublic = accessFlags.isPublic
        eTag = store.anyValue(responseNode as any, ns.httph('etag')) || undefined
        modified = store.anyValue(subject as any, ns.dct('modified')) || store.anyValue(subject as any, ns.dc('modified')) || undefined
      }
    })
  }

  const aclUri = store.any(subject, ACL_LINK)?.value || undefined
  return { contentType, canEdit, isPublic, aclUri, eTag, modified }
}

export async function fetchResourceMetadata (store: LiveStore, subject: NamedNode): Promise<FileExplorerResourceMetadata> {
  const response = await store.fetcher.webOperation('HEAD', subject.uri)

  if (!response.ok) {
    throw new Error(`HEAD request failed with status ${response.status}`)
  }

  const metadata = getResponseMetadata(store, subject, response)
  if (!metadata.contentType) {
    throw new Error('No content-type available!')
  }

  return metadata
}
