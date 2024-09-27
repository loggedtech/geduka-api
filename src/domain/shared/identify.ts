import { randomUUID } from 'node:crypto'
import { createId, isCuid } from '@paralleldrive/cuid2'

export type IdentityType = 'UUID' | 'CUID2'

export class Identify {
  private constructor() {}

  static generate(id?: string, type: IdentityType = 'CUID2') {
    if (id) {
      return id
    }

    return type === 'CUID2' ? createId() : randomUUID()
  }
}
