import DialogTrait from '@/lib/components/traits/DialogTrait'
import { dialogContext } from '@/lib/dialogs/context'
import { WebComponent } from '@/lib/components/web-component'
import { DialogContext, DEFAULT_DIALOG_CONTEXT } from '@/lib/dialogs/context'
import { consume } from '@lit/context'

export default class DialogComponent<T> extends WebComponent<{ dialogResult: T }> {
  private dialogTrait: DialogTrait<DialogComponent<T>>

    @consume({ context: dialogContext, subscribe: true })
    private accessor context: DialogContext = DEFAULT_DIALOG_CONTEXT;

    constructor () {
      super()

      this.dialogTrait = this.addTrait(new DialogTrait(this, { getContext: () => this.context }))
    }

    protected close (result?: T) {
      this.dialogTrait.close(result)
    }
}
