import { compareSync, hashSync } from 'bcrypt'

export class Crypt {
  private constructor() {}

  static hash(payload: string) {
    return hashSync(payload, 10)
  }

  static verify(payload: string, hash: string) {
    return compareSync(payload, hash)
  }
}
