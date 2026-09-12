import { authSession, solidLogicSingleton } from 'solid-logic'

let restoreListenerRegistered = false

export function registerAuthorizationMetadataInvalidationOnSessionRestore () {
  if (restoreListenerRegistered) {
    return
  }

  authSession.events.on('sessionRestore', () => {
    solidLogicSingleton.store.updater.flagAuthorizationMetadata() as any
  })

  restoreListenerRegistered = true
}