import { Entity } from '../shared/entity'

export type SchoolProps = {
  name: string
  email: string
  phone: string
  taxId: string
  addressId: string
}

export class School extends Entity<SchoolProps> {
  private constructor(props: SchoolProps, id?: string) {
    super(props, id)
  }

  static instance(props: SchoolProps, id?: string) {
    return new School(props, id)
  }
}
