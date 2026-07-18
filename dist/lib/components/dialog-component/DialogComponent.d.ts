import { WebComponent } from '../web-component';
export default class DialogComponent<T> extends WebComponent<{
    dialogResult: T;
}> {
    private dialogTrait;
    private accessor context;
    constructor();
    protected close(result?: T): void;
}
//# sourceMappingURL=DialogComponent.d.ts.map