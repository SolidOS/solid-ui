import { AccessGroups } from './access-groups'
import icons from '../iconBase'
import widgets from '../widgets'
import ns from '../ns'
import { logInLoadProfile } from '../authn/authn'
import utils from '../utils'
import { NamedNode } from 'rdflib'
import { AuthenticationContext } from '../authn/types'

export class AddAgentButtons {
  private readonly root: HTMLElement
  private readonly bar: HTMLElement
  private isExpanded: boolean = false

  constructor (private groupList: AccessGroups) {
    this.root = groupList.controller.dom.createElement('div')
    this.bar = groupList.controller.dom.createElement('div')
  }

  public render (): HTMLElement {
    this.root.innerHTML = ''
    this.root.appendChild(this.renderAddButton())
    this.root.appendChild(this.bar)
    return this.root
  }

  private renderAddButton (): HTMLElement {
    return widgets.button(
      this.groupList.controller.dom,
      `${icons.iconBase}noun_34653_green.svg`,
      'Add ...',
      () => {
        this.toggleBar()
        this.renderBar()
      }
    )
  }

  private renderBar (): void {
    this.bar.innerHTML = ''
    if (!this.isExpanded) {
      return
    }
    this.bar.appendChild(this.renderPersonButton())
    this.bar.appendChild(this.renderGroupButton())
    this.bar.appendChild(this.renderPublicButton())
    this.bar.appendChild(this.renderAuthenticatedAgentButton())
    this.bar.appendChild(this.renderBotButton())
    this.bar.appendChild(this.renderAppsButton())
  }

  private renderSimplifiedBar (button: EventTarget | null) {
    Array.from(this.bar.children)
      .filter(element => element !== button)
      .forEach(element => this.bar.removeChild(element))
  }

  private renderPersonButton (): HTMLElement {
    return widgets.button(
      this.groupList.controller.dom,
      icons.iconBase + widgets.iconForClass['vcard:Individual'],
      'Add Person',
      event => {
        this.renderSimplifiedBar(event.target)
        this.renderNameForm(ns.vcard('Individual'), 'person')
          .then(name => this.addPerson(name))
          .then(() => this.renderCleanup())
          .catch(error => this.groupList.controller.setStatus(error))
      }
    )
  }

  private renderGroupButton (): HTMLElement {
    return widgets.button(
      this.groupList.controller.dom,
      icons.iconBase + widgets.iconForClass['vcard:Group'],
      'Add Group',
      event => {
        this.renderSimplifiedBar(event.target)
        this.renderNameForm(ns.vcard('Group'), 'group')
          .then(name => this.addGroup(name))
          .then(() => this.renderCleanup())
          .catch(error => this.groupList.controller.setStatus(error))
      }
    )
  }

  private renderNameForm (type: NamedNode, noun: string): Promise<string | undefined> {
    return widgets.askName(
      this.groupList.controller.dom,
      this.groupList.store,
      this.bar,
      ns.vcard('URI'),
      type,
      noun
    )
  }

  private renderPublicButton (): HTMLElement {
    return widgets.button(
      this.groupList.controller.dom,
      icons.iconBase + widgets.iconForClass['foaf:Agent'],
      'Add Everyone',
      () => this.addAgent(ns.foaf('Agent').uri)
        .then(() => this.groupList.controller.renderTemporaryStatus('Adding the general public to those who can read. Drag the globe to a different level to give them more access.'))
        .then(() => this.renderCleanup()))
  }

  private renderAuthenticatedAgentButton (): HTMLElement {
    return widgets.button(
      this.groupList.controller.dom,
      `${icons.iconBase}noun_99101.svg`,
      'Anyone logged In',
      () => this.addAgent(ns.acl('AuthenticatedAgent').uri)
        .then(() => this.groupList.controller.renderTemporaryStatus('Adding anyone logged in to those who can read. Drag the ID icon to a different level to give them more access.'))
        .then(() => this.renderCleanup()))
  }

  private renderBotButton (): HTMLElement {
    return widgets.button(
      this.groupList.controller.dom,
      icons.iconBase + 'noun_Robot_849764.svg',
      'A Software Agent (bot)',
      event => {
        this.renderSimplifiedBar(event.target)
        this.renderNameForm(ns.schema('Application'), 'bot')
          .then(name => this.addBot(name))
          .then(() => this.renderCleanup())
      })
  }

  private renderAppsButton (): HTMLElement {
    return widgets.button(
      this.groupList.controller.dom,
      `${icons.iconBase}noun_15177.svg`,
      'A Web App (origin)',
      event => {
        this.renderSimplifiedBar(event.target)
        const eventContext = {
          div: this.bar,
          dom: this.groupList.controller.dom
        }
        const existingApps = this.renderAppsTable(eventContext)
          .catch(error => this.groupList.controller.setStatus(error))
        this.renderAppsView()
        const newApp = this.renderNameForm(ns.schema('WebApplication'), 'webapp domain')
          .then(name => this.getOriginFromName(name))
        Promise.race([
          existingApps,
          newApp
        ])
          .then(origin => {
            if (origin) {
              this.groupList.addNewURI(origin)
            }
          })
          .then(() => this.renderCleanup())
      }
    )
  }

  private renderAppsView (): void {
    const trustedApplications = this.groupList.controller.context.session.paneRegistry.byName('trustedApplications')
    if (trustedApplications) {
      const trustedAppControl = trustedApplications.render(null, this.groupList.controller.context)
      trustedAppControl.classList.add(this.groupList.controller.classes.trustedAppController)

      const cancel = widgets.cancelButton(this.groupList.controller.dom, () => this.renderCleanup())
      cancel.classList.add(this.groupList.controller.classes.trustedAppCancelButton)
      trustedAppControl.insertBefore(cancel, trustedAppControl.firstChild)

      this.bar.appendChild(trustedAppControl)
    }
  }

  private async renderAppsTable (eventContext: AuthenticationContext): Promise<string> {
    await logInLoadProfile(eventContext)
    const trustedApps = this.groupList.store.each(eventContext.me, ns.acl('trustedApp'))
    const trustedOrigins = trustedApps.flatMap(app => this.groupList.store.each(app, ns.acl('origin')))

    this.bar.appendChild(this.groupList.controller.dom.createElement('p')).textContent = `You have ${trustedOrigins.length} selected web apps.`
    return new Promise((resolve, reject) => {
      const table = this.bar.appendChild(this.groupList.controller.dom.createElement('table'))
      table.classList.add(this.groupList.controller.classes.trustedAppAddApplicationsTable)
      trustedApps.forEach(app => {
        const origin = this.groupList.store.any(app, ns.acl('origin'))
        if (!origin) {
          reject(new Error(`Unable to pick app: ${app.value}`))
        }
        const thingTR = widgets.personTR(this.groupList.controller.dom, ns.acl('origin'), origin, {})
        const innerTable = this.groupList.controller.dom.createElement('table')
        const innerRow = innerTable.appendChild(this.groupList.controller.dom.createElement('tr'))
        const innerLeft = innerRow.appendChild(this.groupList.controller.dom.createElement('td'))
        const innerMiddle = innerRow.appendChild(this.groupList.controller.dom.createElement('td'))
        const innerRight = innerRow.appendChild(this.groupList.controller.dom.createElement('td'))
        innerLeft.appendChild(thingTR)
        innerMiddle.textContent = `Give access to ${this.groupList.controller.noun} ${utils.label(this.groupList.controller.subject)}?`
        innerRight.appendChild(widgets.continueButton(this.groupList.controller.dom, () => resolve(origin!.value)))
        table.appendChild(innerTable)
      })
    })
  }

  private renderCleanup (): void {
    this.renderBar()
    this.groupList.render()
  }

  private async addPerson (name?: string): Promise<void> {
    if (!name) return this.toggleBar() // user cancelled
    const domainNameRegexp = /^https?:/i
    if (!name.match(domainNameRegexp)) {
      // @@ enforce in user input live like a form element
      return Promise.reject(new Error('Not a http URI'))
    }
    // @@ check it actually is a person and has an owner who agrees they own it
    console.log(`Adding to ACL person: ${name}`)
    await this.groupList.addNewURI(name)
    this.toggleBar()
  }

  private async addGroup (name?: string): Promise<void> {
    if (!name) return this.toggleBar() // user cancelled

    const domainNameRegexp = /^https?:/i
    if (!name.match(domainNameRegexp)) {
      // @@ enforce in user input live like a form element
      return Promise.reject(new Error('Not a http URI'))
    }
    // @@ check it actually is a group and has an owner who agrees they own it
    console.log('Adding to ACL group: ' + name)
    await this.groupList.addNewURI(name)
    this.toggleBar()
  }

  private async addAgent (agentUri: string): Promise<void> {
    await this.groupList.addNewURI(agentUri)
    this.toggleBar()
  }

  private async addBot (name?: string): Promise<void> {
    if (!name) return this.toggleBar() // user cancelled
    const domainNameRegexp = /^https?:/i
    if (!name.match(domainNameRegexp)) {
      // @@ enforce in user input live like a form element
      return Promise.reject(new Error('Not a http URI'))
    }
    // @@ check it actually is a bot and has an owner who agrees they own it
    console.log('Adding to ACL bot: ' + name)
    await this.groupList.addNewURI(name)
    this.toggleBar()
  }

  private async getOriginFromName (name?: string): Promise<string | void> {
    if (!name) return Promise.resolve() // user cancelled
    const domainNameRegexp = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i
    // https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch08s15.html
    if (!name.match(domainNameRegexp)) {
      // @@ enforce in user input live like a form element
      return Promise.reject(new Error('Not a domain name'))
    }
    const origin = 'https://' + name
    console.log('Adding to ACL origin: ' + origin)
    this.toggleBar()
    return origin
  }

  private toggleBar (): void {
    this.isExpanded = !this.isExpanded
  }
}
