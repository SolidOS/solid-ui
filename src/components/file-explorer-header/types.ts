export type PaneIcon = string | Promise<string> | null | undefined

export type FileExplorerResourceMetadata = {
  contentType: string | undefined
  canEdit: boolean
  isPublic: boolean
  aclUri: string | undefined
  eTag: string | undefined
  modified: string | undefined
}
