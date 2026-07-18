import { DialogConfig } from './Dialog';
import { default as WebComponent, GetWebComponentMetadata, WebComponentConstructor } from '../components/web-component/WebComponent';
export type GetDialogResult<T, TFallback = unknown> = GetWebComponentMetadata<T> extends {
    dialogResult: infer TResult;
} ? TResult : TFallback;
export declare function showDialog<T extends WebComponent>(DialogComponent: WebComponentConstructor<T>, config?: DialogConfig<GetDialogResult<T>> & {
    props?: Partial<T>;
}): T;
//# sourceMappingURL=helpers.d.ts.map