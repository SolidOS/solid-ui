import { SelectOption } from '../shared/optionTypes'

export interface ComboboxSuggestion extends SelectOption {
  publicId?: string
  meta?: Record<string, unknown>
}
