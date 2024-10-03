import type { User } from '~/domain/entities/user'

import type { Role } from '../shared/role'

export interface UserGateway {
  findByPhone(phone: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(user: User, schoolId: string, role: Role): Promise<void>
}
