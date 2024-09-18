import type { User } from '~/domain/entities/user'

export interface UserGateway {
  create(user: User, schoolId: string): Promise<void>
}
