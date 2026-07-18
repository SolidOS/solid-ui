import { LitElement, CSSResultGroup, PropertyValues } from 'lit';
import { WebComponentTrait } from '../traits/WebComponentTrait';
declare const metadataMarker: unique symbol;
export type GetWebComponentMetadata<T> = T extends {
    [metadataMarker]?: infer TMetadata;
} ? TMetadata : {
    nope: keyof T;
};
export type WebComponentConstructor<T extends WebComponent = WebComponent> = {
    new (): T;
};
export default abstract class WebComponent<T extends Record<string, unknown> = Record<string, unknown>> extends LitElement {
    static states?: Record<string, Function>;
    protected static finalizeStyles(componentStyles?: CSSResultGroup): import('lit').CSSResultOrNative[];
    [metadataMarker]?: T;
    protected internals?: ElementInternals;
    protected globalListeners: [type: string, listener: EventListener][];
    protected traits: WebComponentTrait[];
    disconnectedCallback(): void;
    protected addTrait<T extends WebComponentTrait>(trait: T): T;
    protected firstUpdated(): void;
    protected updated(changedProperties: Map<PropertyKey, unknown>): void;
    protected formResetCallback(): void;
    protected willUpdate(changedProperties: PropertyValues<this>): void;
    protected addGlobalEventListener<T extends keyof WindowEventMap>(type: T, listener: (this: Window, ev: WindowEventMap[T]) => any): void;
    protected render(): import('lit-html').TemplateResult<1>;
    protected getInternals(): ElementInternals;
    private static;
    private forwardMethodCall;
}
export {};
//# sourceMappingURL=WebComponent.d.ts.map