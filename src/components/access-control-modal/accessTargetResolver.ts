import { defineAsyncComboboxOptionsProvider, type AsyncComboboxOptionsProvider, type ComboboxOptionData } from '@/components/combobox'
import { directoryEntryOptionIcon } from './AccessControlAddAccess'
import { label } from '@/utils/label'
import { solidLogicSingleton, type AccessControlSubjectKind, type DirectoryEntry, type DirectorySource } from 'solid-logic'
import { sym } from 'rdflib'
import { html } from 'lit'
import ns from '@/lib/ns'
import '~icons/lucide/globe'
import { dedupeByKey, dedupeComboboxOptions, isAbsoluteHttpUri, isOriginUrl, normalizeOriginInput, type StringComboboxOptionData } from './helpers'

export type ResolvedAccessTarget = {
  subjectType: AccessControlSubjectKind
  subjectValue: string
  label: string
  targetKind?: 'origin' | 'trustedApp'
}

type AccessTargetOption = ComboboxOptionData & {
  targetKind?: 'origin' | 'trustedApp'
}

const ACCESS_DIRECTORY_SOURCES: DirectorySource[] = ['contacts', 'friends', 'groups']

async function classifyAccessTarget (principal: string) {
  const normalizedOrigin = normalizeOriginInput(principal)
  if (normalizedOrigin) {
    return { kind: 'origin' as const, subjectValue: normalizedOrigin }
  }

  if (isOriginUrl(principal)) {
    return { kind: 'origin' as const, subjectValue: new URL(principal).origin }
  }

  return await solidLogicSingleton.acl.classifyAccessControlSubject(principal)
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
    throw new Error('The access target has no usable display label.')
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
    label: resolvedLabel,
    targetKind: resolvedPrincipal.kind === 'origin' ? 'origin' : undefined
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
    icon: directoryEntryOptionIcon(entry)
  }
}

async function getPreferredAccessPrincipalOptions (query: string): Promise<AccessTargetOption[]> {
  const normalizedOrigin = normalizeOriginInput(query)
  if (normalizedOrigin) {
    return [{
      label: `Use origin ${normalizedOrigin}`,
      value: normalizedOrigin,
      targetKind: 'origin',
      icon: html`<icon-lucide-globe></icon-lucide-globe>`
    }]
  }

  if (!isAbsoluteHttpUri(query)) {
    return []
  }

  if (isOriginUrl(query)) {
    return [{
      label: `Use origin ${new URL(query).origin}`,
      value: new URL(query).origin,
      targetKind: 'origin',
      icon: html`<icon-lucide-globe></icon-lucide-globe>`
    }]
  }

  const urlOption = await createUrlOption(query)
  return dedupeComboboxOptions(urlOption ? [urlOption] : [])
}

async function getTrustedAppOptions (query: string): Promise<AccessTargetOption[]> {
  try {
    const me = solidLogicSingleton.authn.currentUser()
    if (!me) return []
    await solidLogicSingleton.profile.loadProfile(me)
    const store = solidLogicSingleton.store
    const apps = store.each(me, ns.acl('trustedApp')) as Array<ReturnType<typeof sym>>
    return apps.flatMap(app => {
      const origin = store.any(app, ns.acl('origin'))
      if (!origin || !isOriginUrl(origin.value)) return []
      const normalizedOrigin = new URL(origin.value).origin
      if (query && !`${normalizedOrigin} trusted app`.toLowerCase().includes(query.toLowerCase())) return []
      return [{
        label: `Trusted app: ${normalizedOrigin}`,
        value: normalizedOrigin,
        targetKind: 'trustedApp' as const,
        icon: html`<icon-lucide-globe></icon-lucide-globe>`
      }]
    })
  } catch {
    return []
  }
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
    const trustedAppOptions = await getTrustedAppOptions(query)

    if (query.length < 2) {
      return dedupeByKey(
        [...preferredOptions, ...trustedAppOptions, ...getShortQueryOptions(preferredOptions)],
        option => {
          const targetOption = option as AccessTargetOption
          return typeof targetOption.value === 'string'
            ? `${targetOption.value}:${targetOption.targetKind ?? 'default'}`
            : undefined
        }
      )
    }

    let entries: DirectoryEntry[] = []

    try {
      entries = await solidLogicSingleton.directory.search({
        query,
        sources: ACCESS_DIRECTORY_SOURCES
      })
    } catch (error) {
      if (!preferredOptions.length && !trustedAppOptions.length) {
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
      [...preferredOptions, ...trustedAppOptions, ...options],
      option => {
        const targetOption = option as AccessTargetOption
        return typeof targetOption.value === 'string'
          ? `${targetOption.value}:${targetOption.targetKind ?? 'default'}`
          : undefined
      }
    )
  })
