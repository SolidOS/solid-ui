import { WebComponent } from '@/lib/components'

export type WebComponentTraitMethodKey = NonNullable<{
  [K in keyof WebComponentTrait]: NonNullable<WebComponentTrait[K]> extends (...args: any[]) => any ? K : never
}[keyof WebComponentTrait]>

export interface WebComponentTrait {
  target: WebComponent
  firstUpdated?(): void;
  updated?(changedProperties: Map<PropertyKey, unknown>): void;
  formResetCallback?(): void;
}
