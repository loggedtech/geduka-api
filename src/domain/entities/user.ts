import { Entity } from '../shared/entity'

export type UserProps = {
  name: string
  email: string
  phone: string
  password: string
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id)
  }

  static instance(props: UserProps, id?: string) {
    return new User(props, id)
  }
}
