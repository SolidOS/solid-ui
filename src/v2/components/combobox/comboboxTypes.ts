import { SelectOption } from '../selectShared/optionTypes'

export interface ComboboxSuggestion extends SelectOption {
  publicId?: string
  meta?: Record<string, unknown>
}
