import { Entity } from '../shared/entity'

export type AddressProps = {
  zip: string
  place: string
  number: string
  complement?: string
  district: string
  city: string
  state: string
}

export class Address extends Entity<AddressProps> {
  private constructor(props: AddressProps, id?: string) {
    super(props, id)
  }

  static instance(props: AddressProps, id?: string) {
    return new Address(props, id)
  }
}
