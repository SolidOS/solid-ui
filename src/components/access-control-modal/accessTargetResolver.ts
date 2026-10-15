import { defineAsyncComboboxOptionsProvider, type AsyncComboboxOptionsProvider, type ComboboxOptionData } from '@/components/combobox'
import { directoryEntryOptionTemplate } from './AccessControlAddAccess'
import { label } from '@/utils/label'
import { DEFAULT_DIRECTORY_SOURCES, solidLogicSingleton, type AccessControlSubjectKind, type DirectoryEntry } from 'solid-logic'
import { sym } from 'rdflib'
import { dedupeByKey, dedupeComboboxOptions, isAbsoluteHttpUri, isOriginUrl, normalizeOriginInput, type StringComboboxOptionData } from './helpers'

export type ResolvedAccessTarget = {
  subjectType: AccessControlSubjectKind
  subjectValue: string
  label: string
}

async function classifyAccessTarget (principal: string) {
  const normalizedOrigin = normalizeOriginInput(principal)
  return normalizedOrigin
    ? { kind: 'origin' as const, subjectValue: normalizedOrigin }
    : await solidLogicSingleton.acl.classifyAccessControlSubject(principal)
}

async function resolveAccessTargetLabel (
  resolvedPrincipal: Awaited<ReturnType<typeof classifyAccessTarget>>,
  preferredLabel?: string
): Promise<string | undefined> {
  if (!resolvedPrincipal || resolvedPrincipal.kind === 'origin') {
    return resolvedPrincipal?.subjectValue
  }

  const subject = sym(resolvedPrincipal.subjectValue)
  await solidLogicSingleton.store.fetcher.load(subject.doc())
  const resolvedLabel = preferredLabel?.trim() || label(subject).trim()
  if (!resolvedLabel || resolvedLabel === resolvedPrincipal.subjectValue) {
    return undefined
  }

  return resolvedLabel
}

export async function resolveAccessTarget (
  principal: string,
  preferredLabel?: string
): Promise<ResolvedAccessTarget | undefined> {
  const resolvedPrincipal = await classifyAccessTarget(principal)
  if (!resolvedPrincipal) {
    return undefined
  }

  const resolvedLabel = await resolveAccessTargetLabel(resolvedPrincipal, preferredLabel)
  if (!resolvedLabel) {
    return undefined
  }

  return {
    subjectType: resolvedPrincipal.kind,
    subjectValue: resolvedPrincipal.subjectValue,
    label: resolvedLabel
  }
}

async function createUrlOption (uri: string): Promise<StringComboboxOptionData | undefined> {
  const resolved = await resolveAccessTarget(uri)
  return resolved
    ? { label: resolved.label, value: uri }
    : undefined
}

function directoryEntryToOption (entry: DirectoryEntry, labelValue: string): ComboboxOptionData {
  return {
    label: labelValue,
    value: entry.uri,
    template: directoryEntryOptionTemplate({ ...entry, label: labelValue })
  }
}

async function getPreferredAccessPrincipalOptions (query: string): Promise<ComboboxOptionData[]> {
  const normalizedOrigin = normalizeOriginInput(query)
  if (normalizedOrigin) {
    return [{
      label: `Use origin ${normalizedOrigin}`,
      value: normalizedOrigin
    }]
  }

  if (!isAbsoluteHttpUri(query)) {
    return []
  }

  if (isOriginUrl(query)) {
    return [{
      label: `Use origin ${new URL(query).origin}`,
      value: new URL(query).origin
    }]
  }

  const urlOption = await createUrlOption(query)
  return dedupeComboboxOptions(urlOption ? [urlOption] : [])
}

function getShortQueryOptions (preferredOptions: ComboboxOptionData[]): ComboboxOptionData[] {
  if (preferredOptions.length) {
    return preferredOptions
  }

  return [{
    label: 'Type at least 2 characters to search',
    value: '',
    selectable: false
  }]
}

export const accessPrincipalOptionsProvider: AsyncComboboxOptionsProvider =
  defineAsyncComboboxOptionsProvider(async (filter: string) => {
    const query = filter.trim()
    const preferredOptions = await getPreferredAccessPrincipalOptions(query)

    if (query.length < 2) {
      return getShortQueryOptions(preferredOptions)
    }

    let entries: DirectoryEntry[] = []

    try {
      entries = await solidLogicSingleton.directory.search({
        query,
        sources: DEFAULT_DIRECTORY_SOURCES
      })
    } catch (error) {
      if (!preferredOptions.length) {
        throw error
      }
    }

    const verifiedEntries = await Promise.all(entries.map(async entry => {
      try {
        const resolved = await resolveAccessTarget(entry.uri, entry.label)
        return resolved ? { entry, label: resolved.label } : undefined
      } catch {
        return undefined
      }
    }))
    const options = verifiedEntries
      .filter((entry): entry is { entry: DirectoryEntry, label: string } => entry !== undefined)
      .map(({ entry, label: entryLabel }) => directoryEntryToOption(entry, entryLabel))
    return dedupeByKey(
      [...preferredOptions, ...options],
      option => typeof option.value === 'string' ? option.value : undefined
    )
  })
