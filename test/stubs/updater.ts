import { store } from 'solid-logic'
import { vi, type Mock } from 'vitest'

const realUpdater = store.updater
const realUpdaterEditable = store.updater.editable.bind(store.updater)
const realUpdaterUpdate = store.updater.update.bind(store.updater)
const updaterUpdate = { ok: true }

export function stubUpdaterEditable (isEditable: typeof store.updater.editable): void {
  store.updater.editable = isEditable
}

export function stubUpdaterUpdate (): void {
  store.updater.update = vi.fn(async (_deletes, _inserts, callback) => {
    await callback?.(undefined, updaterUpdate.ok, 'body')
  })
}

export function stubUpdater (
  updateStub: typeof store.updater.update
): Mock<typeof store.updater.update> {
  const update = vi.fn(updateStub)

  store.updater = {
    update,
    requestDownstreamAction: vi.fn(),
    reload: vi.fn(),
    store
  } as unknown as typeof store.updater

  return update
}

export function restoreUpdater (): void {
  store.updater = realUpdater
}

export function restoreUpdaterEditable (): void {
  store.updater.editable = realUpdaterEditable
}

export function restoreUpdaterUpdate (): void {
  store.updater.update = realUpdaterUpdate
}

export function setUpdaterStubUpdateSuccess (success: boolean): void {
  updaterUpdate.ok = success
}
