import { Entity } from '../shared/entity'
import type { Replace } from '../shared/replace'

export type UserProps = {
  name: string
  email: string
  phone: string
  password: string
  activedAt?: Date
  createdAt: Date
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id)
  }

  static instance(
    props: Replace<UserProps, { createdAt?: Date }>,
    id?: string
  ) {
    return new User({ ...props, createdAt: props.createdAt ?? new Date() }, id)
  }
}
