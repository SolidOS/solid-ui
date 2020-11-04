
import * as rdf from 'rdflib'
import { NamedNode, Statement, IndexedFomula } from 'rdflib'
import solidNamespace from 'solid-namespace'

import * as debug from './debug'

export const ACL_LINK = rdf.sym('http://www.iana.org/assignments/link-relations/acl')

const ns = solidNamespace(rdf)

export class SolidLogic {
  cache: {
    profileDocument: {
      [WebID: string]: NamedNode
    }
    preferencesFile: {
      [WebID: string]: NamedNode
    }
  }

  store: IndexedFomula
  constructor (fetcher: { fetch: () => any }) {
    this.store = rdf.graph() // Make a Quad store
    rdf.fetcher(this.store, fetcher) // Attach a web I/O module, store.fetcher
    this.store.updater = new rdf.UpdateManager(this.store) // Add real-time live updates store.updater
    this.cache = {
      profileDocument: {},
      preferencesFile: {}
    }
  }

  async findAclDocUrl (url: string | NamedNode) {
    const doc = this.store.sym(url)
    await this.store.fetcher.load(doc)
    const docNode = this.store.any(doc, ACL_LINK)
    if (!docNode) {
      throw new Error(`No ACL link discovered for ${url}`)
    }
    return docNode.value
  }

  async loadDoc (profileDocument: NamedNode): Promise<void> {
    // Load the profile into the knowledge base (fetcher.store)
    //   withCredentials: Web arch should let us just load by turning off creds helps CORS
    //   reload: Gets around a specific old Chrome bug caching/origin/cors
    await this.store.fetcher
      .load(profileDocument, { withCredentials: false, cache: 'reload' })
  }

  async loadProfile (me: NamedNode): Promise<NamedNode> {
    if (this.cache.preferencesFile[me]) {
      return this.cache.preferencesFile[me]
    }
    let profileDocument
    try {
      profileDocument = me.doc()
      await this.loadDoc(profileDocument)
      return profileDocument
    } catch (err) {
      const message = `Logged in but cannot load profile ${profileDocument} : ${err}`
      throw new Error(message)
    }
  }

  async loadPreferences (me: NamedNode): Promise<NamedNode> {
    if (this.cache.preferencesFile[me]) {
      return this.cache.preferencesFile[me]
    }
    const preferencesFile = this.store.any(me, ns.space('preferencesFile'))

    /**
     * Are we working cross-origin?
     * Returns True if we are in a webapp at an origin, and the file origin is different
     */
    function differentOrigin (): boolean {
      return `${window.location.origin}/` !== preferencesFile.site().uri
    }

    if (!preferencesFile) {
      throw new Error(`Can't find a preference file pointer in profile ${me.doc()}`)
    }

    // //// Load preference file
    try {
      this.store.fetcher
        .load(preferencesFile, { withCredentials: true })
    } catch (err) {
      // Really important to look at why
      const status = err.status
      debug.log(
        `HTTP status ${status} for preference file ${preferencesFile}`
      )
      if (status === 401) {
        throw new UnauthorizedError()
      }
      if (status === 403) {
        if (differentOrigin()) {
          throw new CrossOriginForbiddenError()
        }
        throw new SameOriginForbiddenError()
      }
      if (status === 404) {
        throw new NotFoundError(preferencesFile)
      }
      throw new FetchError(err.status, err.message)
    }
    return preferencesFile
  }

  getTypeIndex (me: NamedNode | string, preferencesFile: NamedNode | string, isPublic: boolean): NamedNode[] {
    return this.store.each(
      me,
      (isPublic ? ns.solid('publicTypeIndex') : ns.solid('privateTypeIndex')),
      undefined,
      preferencesFile
    )
  }

  getContainerElements (cont: NamedNode) {
    return this.store.each(cont, ns.ldp('contains'))
  }

  getRegistrations (instance, theClass) {
    return this.store
      .each(undefined, ns.solid('instance'), instance)
      .filter((r) => {
        return this.store.holds(r, ns.solid('forClass'), theClass)
      })
  }

  load (doc: NamedNode | string) {
    return this.store.fetcher.load(doc)
  }

  async loadIndexes (
    me: NamedNode | string,
    publicProfile: NamedNode | string | null,
    preferencesFile: NamedNode | string | null,
    onWarning = async (_err: Error) => { return undefined }
  ): Promise<{
    private: any,
    public: any
  }> {
    let privateIndexes
    let publicIndexes
    if (publicProfile) {
      publicIndexes = this.getTypeIndex(me, publicProfile, true)
      try {
        await this.load(publicIndexes)
      } catch (err) {
        onWarning(new Error(`loadIndex: loading public type index(es) ${err}`))
      }
    }
    if (preferencesFile) {
      privateIndexes = this.getTypeIndex(me, preferencesFile, true)
      if (privateIndexes.length === 0) {
        await onWarning(new Error(`Your preference file ${preferencesFile} does not point to a private type index.`))
      } else {
        try {
          await this.load(publicIndexes)
        } catch (err) {
          onWarning(new Error(`loadIndex: loading private type index(es) ${err}`))
        }
      }
    } else {
      debug.log(
        'We know your preference file is not available, so we are not bothering with private type indexes.'
      )
    }

    return {
      private: privateIndexes,
      public: publicIndexes
    }
  }

  async createEmptyRdfDoc (doc: NamedNode, comment: string) {
    await this.store.fetcher.webOperation('PUT', doc.uri, {
      data: `# ${new Date()} ${comment}
`,
      contentType: 'text/turtle'
    })
  }

  // @@@@ use the one in rdflib.js when it is available and delete this
  updatePromise (
    del: Array<Statement>,
    ins: Array<Statement> = []
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.store.updater.update(del, ins, function (_uri, ok, errorBody) {
        if (!ok) {
          reject(new Error(errorBody))
        } else {
          resolve()
        }
      }) // callback
    }) // promise
  }

  clearStore () {
    this.store.statements.slice().forEach(this.store.remove.bind(this.store))
  }
}

export class UnauthorizedError extends Error {
  constructor (message?: string) {
    super(message)
    // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    this.name = UnauthorizedError.name // stack traces display correctly now
  }
}

export class CrossOriginForbiddenError extends Error {
  constructor (message?: string) {
    super(message)
    // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    this.name = CrossOriginForbiddenError.name // stack traces display correctly now
  }
}

export class SameOriginForbiddenError extends Error {
  constructor (message?: string) {
    super(message)
    // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    this.name = SameOriginForbiddenError.name // stack traces display correctly now
  }
}

export class NotFoundError extends Error {
  preferencesFile: string
  constructor (preferencesFile: string, message?: string) {
    super(message)
    // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    this.name = NotFoundError.name // stack traces display correctly now
    this.preferencesFile = preferencesFile
  }
}

export class FetchError extends Error {
  status: number
  constructor (status: number, message?: string) {
    super(message)
    // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    this.name = FetchError.name // stack traces display correctly now
    this.status = status
  }
}
