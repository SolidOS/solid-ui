export const FILE_EXPLORER_BACK_EVENT = 'solid-ui-file-explorer-back'

export interface FileExplorerBackDetail {
  subjectUri?: string
}

export const FILE_EXPLORER_MANAGE_ACCESS_EVENT = 'solid-ui-file-explorer-manage-access'

export interface FileExplorerManageAccessDetail {
  subjectUri: string
}

export const FILE_EXPLORER_OPEN_PANE_EVENT = 'solid-ui-file-explorer-open-pane'

export interface FileExplorerOpenPaneDetail {
  subjectUri: string
  paneName: string
}
