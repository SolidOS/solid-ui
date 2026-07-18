import { WebComponent } from '..';
import { DialogContext } from '../../dialogs/context';
import { GetDialogResult } from '../../dialogs/helpers';
import { WebComponentTrait } from './WebComponentTrait';
export interface DialogTraitConfig {
    getContext: () => DialogContext;
}
export default class DialogTrait<T> implements WebComponentTrait {
    target: WebComponent;
    private config;
    constructor(target: WebComponent, config: DialogTraitConfig);
    close(data?: GetDialogResult<T, T>): void;
}
//# sourceMappingURL=DialogTrait.d.ts.map