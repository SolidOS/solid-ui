import type { NamedNode } from 'rdflib'
import { solidLogicSingleton } from 'solid-logic'
import ns from '../ns'

export const DEFAULT_DISCOVER_CLASS = ns.owl('Thing')

export type DiscoveryVisibility = 'public' | 'private'

export type DiscoveryState = {
  public: boolean
  private: boolean
}

export async function loadDiscoveryState (subject: NamedNode): Promise<DiscoveryState> {
  const [publicRegistrations, privateRegistrations] = await Promise.all([
    solidLogicSingleton.resource.findTypeIndexRegistrations(subject, 'public'),
    solidLogicSingleton.resource.findTypeIndexRegistrations(subject, 'private')
  ])

  return {
    public: publicRegistrations.length > 0,
    private: privateRegistrations.length > 0
  }
}

export async function toggleDiscoveryState (
  subject: NamedNode,
  discoverClass: NamedNode,
  visibility: DiscoveryVisibility,
  currentState?: DiscoveryState
): Promise<DiscoveryState> {
  const discoveryState = currentState ?? await loadDiscoveryState(subject)
  const isDiscovered = visibility === 'public' ? discoveryState.public : discoveryState.private
  const resolvedDiscoverClass = solidLogicSingleton.resource.isContainer(subject)
    ? await solidLogicSingleton.resource.loadContainerMintClass(subject) ?? discoverClass
    : discoverClass

  if (isDiscovered) {
    await solidLogicSingleton.resource.removeFromTypeIndex(subject, visibility)
  } else {
    await solidLogicSingleton.resource.addToTypeIndex(subject, visibility, resolvedDiscoverClass)
  }

  return loadDiscoveryState(subject)
}