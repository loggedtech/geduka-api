import { randomUUID } from 'node:crypto'
import { createId } from '@paralleldrive/cuid2'

export class Identify {
  private constructor() {}

  static cuid2(id?: string) {
    return id ?? createId()
  }

  static uuid(id?: string) {
    return id ?? randomUUID()
  }
}
