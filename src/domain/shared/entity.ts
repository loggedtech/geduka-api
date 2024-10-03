import { Identify } from './identify'

export abstract class Entity<P> {
  protected _id: string
  public props: P

  constructor(props: P, id?: string) {
    this._id = Identify.generate(id)
    this.props = props
  }

  get id() {
    return this._id
  }

  public equals(object?: Entity<P>): boolean {
    if (object === null || object === undefined) {
      return false
    }

    if (!(object instanceof Entity)) {
      return false
    }

    if (this === object) {
      return true
    }

    return this._id === object._id
  }
}
