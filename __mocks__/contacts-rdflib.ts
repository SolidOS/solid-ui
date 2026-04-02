type AddressBookContact = {
  uri: string
  name: string
}

type AddressBook = {
  contacts: AddressBookContact[]
}

type AddressBookList = {
  publicUris: string[]
  privateUris: string[]
}

export default class ContactsModuleRdfLib {
  constructor (_options: unknown) {}

  async listAddressBooks (_webId: string): Promise<AddressBookList> {
    return {
      publicUris: [],
      privateUris: []
    }
  }

  async readAddressBook (_addressBookUri: string): Promise<AddressBook> {
    return {
      contacts: []
    }
  }
}

export type { AddressBook }
