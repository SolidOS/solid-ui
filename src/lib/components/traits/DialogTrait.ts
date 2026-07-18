import { WebComponent } from '@/lib/components'
import { CloseDialogEvent } from '@/lib/dialogs/events/close-dialog'
import type { DialogContext } from '@/lib/dialogs/context'
import type { GetDialogResult } from '@/lib/dialogs/helpers'

import { WebComponentTrait } from './WebComponentTrait'

export interface DialogTraitConfig {
  getContext: () => DialogContext
}

export default class DialogTrait<T> implements WebComponentTrait {
  public target: WebComponent
  private config: DialogTraitConfig

  constructor (target: WebComponent, config: DialogTraitConfig) {
    this.target = target
    this.config = config
  }

  close (data?: GetDialogResult<T, T>) {
    window.dispatchEvent(new CloseDialogEvent(this.config.getContext().id, data))
  }
}
